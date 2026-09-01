import assert from "node:assert/strict";
import test from "node:test";
import { parseRsvpPayload } from "../src/lib/rsvp";

test("rejects malformed RSVP payloads", () => {
  assert.deepEqual(parseRsvpPayload(null), {
    ok: false,
    message: "La información enviada no es válida.",
  });
});

test("requires a full name and attendance choice", () => {
  assert.equal(parseRsvpPayload({ guestName: "D", attending: "yes" }).ok, false);
  assert.equal(parseRsvpPayload({ guestName: "Daniela Samperio", attending: "" }).ok, false);
});

test("accepts and sanitizes an attending party of up to four guests", () => {
  const result = parseRsvpPayload({
    guestName: "  Daniela   Samperio  ",
    attending: "yes",
    guestCount: "4",
    dietaryRestrictions: "  Sin   nueces ",
    message: "  Nos vemos   pronto ",
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      guestName: "Daniela Samperio",
      attending: "yes",
      guestCount: 4,
      dietaryRestrictions: "Sin nueces",
      message: "Nos vemos pronto",
    },
  });
});

test("removes guest-only fields when the guest declines", () => {
  const result = parseRsvpPayload({
    guestName: "Rodrigo Hevia",
    attending: "no",
    guestCount: "2",
    dietaryRestrictions: "Vegetariano",
    message: "Un abrazo",
  });

  assert.deepEqual(result, {
    ok: true,
    data: {
      guestName: "Rodrigo Hevia",
      attending: "no",
      guestCount: null,
      dietaryRestrictions: null,
      message: "Un abrazo",
    },
  });
});

test("rejects guest counts outside the invitation range", () => {
  assert.equal(parseRsvpPayload({ guestName: "Daniela Samperio", attending: "yes", guestCount: "0" }).ok, false);
  assert.equal(parseRsvpPayload({ guestName: "Daniela Samperio", attending: "yes", guestCount: "5" }).ok, false);
});
