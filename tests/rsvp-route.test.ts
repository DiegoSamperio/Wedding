import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { POST } from "../src/app/api/rsvp/route";

test("the RSVP endpoint saves every form field when no external webhook is configured", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "boda-rsvp-route-"));
  const storagePath = path.join(directory, "confirmaciones.csv");
  const previousStoragePath = process.env.RSVP_STORAGE_PATH;
  const previousWebhookUrl = process.env.RSVP_WEBHOOK_URL;
  process.env.RSVP_STORAGE_PATH = storagePath;
  delete process.env.RSVP_WEBHOOK_URL;

  try {
    const response = await POST(
      new Request("http://localhost/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: "Invitada de prueba",
          attending: "yes",
          guestCount: "4",
          dietaryRestrictions: "Vegetariana",
          message: "Mensaje de prueba",
        }),
      }),
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      action: "created",
      message: "Gracias. Recibimos y guardamos tu confirmación.",
    });

    const csv = await readFile(storagePath, "utf8");
    assert.match(csv, /Invitada de prueba/);
    assert.match(csv, /"4"/);
    assert.match(csv, /Vegetariana/);
    assert.match(csv, /Mensaje de prueba/);
  } finally {
    if (previousStoragePath === undefined) delete process.env.RSVP_STORAGE_PATH;
    else process.env.RSVP_STORAGE_PATH = previousStoragePath;

    if (previousWebhookUrl === undefined) delete process.env.RSVP_WEBHOOK_URL;
    else process.env.RSVP_WEBHOOK_URL = previousWebhookUrl;

    await rm(directory, { recursive: true, force: true });
  }
});

test("the RSVP endpoint forwards every field and reports a duplicate-name update", async () => {
  const previousWebhookUrl = process.env.RSVP_WEBHOOK_URL;
  const previousWebhookSecret = process.env.RSVP_WEBHOOK_SECRET;
  const previousFetch = globalThis.fetch;
  process.env.RSVP_WEBHOOK_URL = "https://example.test/rsvp";
  process.env.RSVP_WEBHOOK_SECRET = "test-secret";

  let forwardedBody: Record<string, unknown> | null = null;
  globalThis.fetch = async (_input, init) => {
    forwardedBody = JSON.parse(String(init?.body));
    return Response.json({ ok: true, action: "updated" });
  };

  try {
    const response = await POST(
      new Request("http://localhost/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: "Invitada Repetida",
          attending: "yes",
          guestCount: "4",
          dietaryRestrictions: "Alergia a nueces",
          message: "Datos corregidos",
        }),
      }),
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      action: "updated",
      message: "Ya teníamos una confirmación con ese nombre. Actualizamos tus datos.",
    });
    assert.equal(forwardedBody?.guestName, "Invitada Repetida");
    assert.equal(forwardedBody?.guestCount, 4);
    assert.equal(forwardedBody?.dietaryRestrictions, "Alergia a nueces");
    assert.equal(forwardedBody?.message, "Datos corregidos");
    assert.equal(forwardedBody?.secret, "test-secret");
  } finally {
    globalThis.fetch = previousFetch;

    if (previousWebhookUrl === undefined) delete process.env.RSVP_WEBHOOK_URL;
    else process.env.RSVP_WEBHOOK_URL = previousWebhookUrl;

    if (previousWebhookSecret === undefined) delete process.env.RSVP_WEBHOOK_SECRET;
    else process.env.RSVP_WEBHOOK_SECRET = previousWebhookSecret;
  }
});

test("the RSVP endpoint does not confirm a submission rejected by the spreadsheet", async () => {
  const previousWebhookUrl = process.env.RSVP_WEBHOOK_URL;
  const previousFetch = globalThis.fetch;
  process.env.RSVP_WEBHOOK_URL = "https://example.test/rsvp";
  globalThis.fetch = async () => Response.json({ ok: false, error: "Invalid payload" });

  try {
    const response = await POST(
      new Request("http://localhost/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: "Invitada de prueba",
          attending: "no",
          message: "No podré asistir",
        }),
      }),
    );

    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      message: "No pudimos guardar tu confirmación. Inténtalo nuevamente en unos minutos.",
    });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousWebhookUrl === undefined) delete process.env.RSVP_WEBHOOK_URL;
    else process.env.RSVP_WEBHOOK_URL = previousWebhookUrl;
  }
});
