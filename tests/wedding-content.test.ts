import assert from "node:assert/strict";
import test from "node:test";
import { weddingContent } from "../src/data/wedding";

test("puts RSVP immediately after Inicio", () => {
  assert.deepEqual(
    weddingContent.navigation.slice(0, 3).map((item) => [item.id, item.label]),
    [["home", "Inicio"], ["rsvp", "RSVP"], ["us", "Nosotros"]],
  );
});

test("uses the final gift registry options from the invitation", () => {
  assert.deepEqual(weddingContent.giftRegistry.registries.map((registry) => registry.name), ["Liverpool", "Amazon"]);
  assert.equal(weddingContent.giftRegistry.bankTransfer.title, "Fondo Costco");
});

test("uses the final invitation wording for the shared album", () => {
  assert.equal(weddingContent.photoAlbum.title, "Queremos vivir este día también desde tus ojos");
});
