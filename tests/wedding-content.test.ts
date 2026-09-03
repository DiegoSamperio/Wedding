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

test("separates location and accommodation in the primary navigation", () => {
  assert.deepEqual(
    weddingContent.navigation
      .filter((item) => item.id === "location" || item.id === "accommodation")
      .map((item) => [item.id, item.label]),
    [["location", "Ubicación"], ["accommodation", "Hospedaje"]],
  );
});

test("configures only the two requested photo galleries", () => {
  assert.deepEqual(
    weddingContent.galleries.map((gallery) => gallery.title),
    ["Propuesta de matrimonio", "Pedida de mano"],
  );
  assert.ok(weddingContent.galleries.every((gallery) => gallery.images.length > 0));
});

test("keeps an existing image for every accommodation option", () => {
  assert.ok(weddingContent.accommodation.hotels.every((hotel) => hotel.imageSrc.startsWith("/images/hotels/")));
});
