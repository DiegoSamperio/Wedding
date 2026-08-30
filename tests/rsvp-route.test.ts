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
          guestCount: "2",
          dietaryRestrictions: "Vegetariana",
          message: "Mensaje de prueba",
        }),
      }),
    );

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      message: "Gracias. Recibimos y guardamos tu confirmación.",
    });

    const csv = await readFile(storagePath, "utf8");
    assert.match(csv, /Invitada de prueba/);
    assert.match(csv, /"2"/);
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
