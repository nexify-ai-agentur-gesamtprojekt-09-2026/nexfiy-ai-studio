import { describe, expect, it } from "vitest";
import { ladeKatalog, katalogSuche } from "./teileklar-katalog";

const artikel = { id: "A123", name: "Bremsbelag", sku: "TK-123", price: "29,90 €", image: "" };

function antwort(data: unknown, status = 200) {
  return Response.json(data, { status });
}

describe("TEILEKLAR-Katalog", () => {
  it("liest nur öffentliche Felder und bindet Suche und Seite an den festen Anbieter", async () => {
    const seite = await ladeKatalog(
      katalogSuche({ q: " Bremsbelag ", seite: "2" }),
      async (url, init) => {
        expect(new URL(url instanceof Request ? url.url : url).origin).toBe(
          "https://teileklar.shop",
        );
        expect(new URL(url instanceof Request ? url.url : url).searchParams.get("q")).toBe(
          "Bremsbelag",
        );
        expect(new URL(url instanceof Request ? url.url : url).searchParams.get("offset")).toBe(
          "24",
        );
        expect(init?.redirect).toBe("manual");
        return antwort({ total: 25, items: [{ ...artikel, source: "nicht veröffentlichen" }] });
      },
    );
    expect(seite).toEqual({
      status: "bereit",
      gesamt: 25,
      artikel: [{ id: "A123", name: "Bremsbelag", sku: "TK-123", preis: 29.9 }],
    });
  });
  it("unterscheidet leere Treffer von HTTP- und Vertragsfehlern", async () => {
    const suche = katalogSuche({});
    expect(await ladeKatalog(suche, async () => antwort({ total: 0, items: [] }))).toEqual({
      status: "bereit",
      gesamt: 0,
      artikel: [],
    });
    for (const response of [
      antwort({}, 503),
      antwort({ total: 1, items: [{ name: "kein ID" }] }),
    ]) {
      expect(await ladeKatalog(suche, async () => response)).toEqual({
        status: "nicht-verfuegbar",
      });
    }
  });
  it("begrenzt ungültige Eingaben und erfindet keine Preise", async () => {
    const suche = katalogSuche({ q: "x".repeat(250), seite: "-50" });
    expect(suche).toEqual({ q: "x".repeat(120), seite: 1 });
    const result = await ladeKatalog(suche, async () =>
      antwort({ total: 1, items: [{ ...artikel, price: "unbekannt" }] }),
    );
    expect(result).toMatchObject({ status: "bereit", artikel: [{ preis: null }] });
  });
});
