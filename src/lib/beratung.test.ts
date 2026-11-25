import { describe, expect, it } from "vitest";
import {
  BERATUNG_AUSWAHL,
  BERATUNG_BEREICHE,
  BERATUNG_FAQS,
  BERATUNG_PREIS_NETTO,
  BERATUNG_TAGESTEILE,
  BERATUNG_TAG_STUNDEN,
  beratungNachricht,
  preisText,
  pruefeBeratung,
  BERATUNG_LEER,
} from "./beratung";

describe("Beratungsangebot", () => {
  it("hält den vereinbarten Tagessatz", () => {
    expect(BERATUNG_PREIS_NETTO).toBe(449);
    expect(preisText()).toBe("449 € netto pro Beratungstag");
  });

  it("teilt den Tag so auf, dass die Summe acht Stunden ergibt", () => {
    const summe = BERATUNG_TAGESTEILE.reduce((s, t) => s + t.minuten, 0);
    expect(summe).toBe(BERATUNG_TAG_STUNDEN * 60);
  });

  it("führt acht Beratungsbereiche mit je einem Nutzen", () => {
    expect(BERATUNG_BEREICHE).toHaveLength(8);
    for (const b of BERATUNG_BEREICHE) expect(b.nutzen.length).toBeGreaterThan(10);
    expect(BERATUNG_AUSWAHL).toEqual(BERATUNG_BEREICHE.map((b) => b.titel));
  });

  it("beantwortet die zehn Fragen des Auftrags, ohne Reaktionszeiten zu versprechen", () => {
    expect(BERATUNG_FAQS).toHaveLength(10);
    for (const f of BERATUNG_FAQS) expect(f.antwort.length).toBeGreaterThan(40);
    const alle = BERATUNG_FAQS.map((f) => f.antwort).join(" ");
    expect(alle).not.toMatch(/innerhalb von \d+ (Stunden|Werktagen)/i);
    expect(alle).not.toMatch(/garantiert/i);
  });

  it("stellt die Zusatzangaben über den freien Text", () => {
    const text = beratungNachricht("Wir wollen Angebote schneller schreiben.", {
      ...BERATUNG_LEER,
      bereiche: ["KI-Strategieberatung", "Automatisierungsberatung"],
      format: "Online",
      tage: "2",
      telefon: "+49 241 123456",
      werbung: true,
    });
    expect(text.startsWith("[KI-Beratung]")).toBe(true);
    expect(text).toContain("Bereiche: KI-Strategieberatung, Automatisierungsberatung");
    expect(text).toContain("Beratungstage: 2");
    expect(text).toContain("Werbeeinwilligung: ja");
    expect(text.trim().endsWith("Wir wollen Angebote schneller schreiben.")).toBe(true);
  });

  it("verlangt mindestens einen Bereich und eine brauchbare Schilderung", () => {
    const leer = pruefeBeratung("", BERATUNG_LEER);
    expect(leer["bereiche"]).toMatch(/mindestens einen Beratungsbereich/);
    expect(leer["ziel"]).toMatch(/Ziele und Herausforderungen/);

    const kurz = pruefeBeratung("Zu kurz", { ...BERATUNG_LEER, bereiche: ["KI-Coaching"] });
    expect(kurz["ziel"]).toMatch(/ausführlicher/);

    const zuLang = pruefeBeratung("x".repeat(2001), {
      ...BERATUNG_LEER,
      bereiche: ["KI-Coaching"],
    });
    expect(zuLang["ziel"]).toMatch(/höchstens 2000/);

    const telefon = pruefeBeratung("Wir möchten unsere Abläufe verbessern.", {
      ...BERATUNG_LEER,
      bereiche: ["KI-Roadmap"],
      telefon: "abc",
    });
    expect(telefon["telefon"]).toMatch(/Telefonnummer/);
  });

  it("lässt eine vollständige Anfrage ohne Beanstandung durch", () => {
    const fehler = pruefeBeratung("Wir möchten unsere Angebotserstellung beschleunigen.", {
      ...BERATUNG_LEER,
      bereiche: ["Automatisierungsberatung"],
      telefon: "+49 (0)241 12 34 56",
    });
    expect(fehler).toEqual({});
  });
});
