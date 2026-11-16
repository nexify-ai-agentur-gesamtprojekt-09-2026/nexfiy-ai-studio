import { describe, expect, it } from "vitest";
import { catalogArea, FALLBACK_AREA } from "./teileklar-areas";

describe("catalogArea", () => {
  it("ordnet Artikel nach Name statt nach der fehlerhaften Lieferantenkategorie ein", () => {
    expect(catalogArea("Luftfilter K&N 33-2992")).toBe("Filter & Ansaugung");
    expect(catalogArea("Scheibenbremsen Black Diamond K1398CD Solide Gebohrt Frontal")).toBe(
      "Bremsen",
    );
    expect(catalogArea("Autoglühbirne Osram H7")).toBe("Beleuchtung & Elektrik");
    expect(catalogArea("Auto-Fußmatten-Set OCC Motorsport OCCRT0036BL 5 Stücke")).toBe(
      "Innenraum & Komfort",
    );
  });

  it("lässt spezifische Muster vor allgemeinen greifen", () => {
    expect(catalogArea("Bremsenreiniger Holts 500 ml")).toBe("Pflege & Reinigung");
    expect(catalogArea("Ölfilter-Schlüssel KUKKO")).toBe("Werkstatt & Pannenhilfe");
    expect(catalogArea("Reifenreiniger Sonax Beast 1 L")).toBe("Pflege & Reinigung");
    expect(catalogArea("3 in 1 Teleskop-Eiskratzer Removice InnovaGoods")).toBe(
      "Karosserie & Sicht",
    );
  });

  it("liest „Black“ nicht als Lack und Öl nur als eigenes Wort", () => {
    expect(catalogArea("Bremsbeläge Black Diamond BDKBD1385G12")).toBe("Bremsen");
    expect(catalogArea("Ausgabegerät Bensontools Öl 250 ml")).toBe("Öle & Additive");
    expect(catalogArea("Ölfilter K&N HP-2006")).toBe("Filter & Ansaugung");
    expect(catalogArea("Motoröl Castrol GTX Diesel 5W30 C4 5 L")).toBe("Öle & Additive");
  });

  it("fällt bei unbekannten Artikeln auf den Sammelbereich zurück", () => {
    expect(catalogArea("Regulierungsbehörde Mota a223")).toBe(FALLBACK_AREA);
  });
});
