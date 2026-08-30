import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { saveRsvpSubmission } from "../src/lib/rsvpStorage";

test("stores complete RSVP submissions in a readable CSV file", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "boda-rsvp-"));
  const storagePath = path.join(directory, "confirmaciones.csv");

  try {
    await saveRsvpSubmission(
      {
        id: "rsvp-1",
        submittedAt: "2026-08-29T12:00:00.000Z",
        guestName: "Daniela Samperio",
        attending: "yes",
        guestCount: 2,
        dietaryRestrictions: "Sin nueces",
        message: "Nos vemos pronto",
        source: "prueba",
      },
      storagePath,
    );

    const csv = await readFile(storagePath, "utf8");
    assert.match(csv, /nombre completo/);
    assert.match(csv, /Daniela Samperio/);
    assert.match(csv, /Sin nueces/);
    assert.match(csv, /Nos vemos pronto/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
