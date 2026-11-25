import { describe, expect, it } from "vitest";
import {
  anfrageArt,
  anfrageDedupKey,
  anfrageNummer,
  anfrageSchluesselAusHeader,
  liesAnfrageBody,
  pruefeAnfrage,
} from "@/lib/anfrage";

const gueltig = {
  name: "Erika Muster",
  email: "erika@firma.de",
  company: "Muster GmbH",
  message: "Wir brauchen einen neuen Portalzugang für Kunden.",
  consent: "on",
};

function formRequest(rumpf: string): Request {
  return new Request("https://www.nexifyai.de/api/anfrage", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: rumpf,
  });
}

describe("anfrageNummer", () => {
  it("bildet NX-JJJJMMTT-Hex aus Datum und Zufall", () => {
    expect(
      anfrageNummer(new Date("2026-11-22T09:00:00Z"), new Uint8Array([0xaa, 0xbb, 0xcc])),
    ).toBe("NX-20261122-AABBCC");
  });
});

describe("anfrageDedupKey", () => {
  it("ist im selben Zeitfenster stabil und im naechsten verschieden", async () => {
    const werte = { ...gueltig, consent: true };
    const frueh = new Date("2026-11-22T09:01:00Z");
    const spaet = new Date("2026-11-22T09:09:00Z");
    const danach = new Date("2026-11-22T09:21:00Z");
    const a = await anfrageDedupKey("contact", werte, frueh);
    const b = await anfrageDedupKey("contact", werte, spaet);
    const c = await anfrageDedupKey("contact", werte, danach);
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });
});

describe("liesAnfrageBody", () => {
  it("liest das native Formular und akzeptiert die Einwilligung", async () => {
    const body = await liesAnfrageBody(formRequest(new URLSearchParams(gueltig).toString()));
    expect(body.ok).toBe(true);
    if (!body.ok) return;
    const { werte, felder } = pruefeAnfrage("contact", body.daten);
    expect(felder).toEqual({});
    expect(werte.consent).toBe(true);
    expect(werte.email).toBe("erika@firma.de");
  });

  it("meldet fehlende Pflichtfelder feldweise", async () => {
    const body = await liesAnfrageBody(formRequest("name=Erika&email=erika%40firma.de"));
    expect(body.ok).toBe(true);
    if (!body.ok) return;
    const { felder } = pruefeAnfrage("contact", body.daten);
    expect(Object.keys(felder).sort()).toEqual(["consent", "message"]);
  });

  it("lehnt fremde Inhaltstypen ab, statt sie still zu deuten", async () => {
    const anfrage = new Request("https://www.nexifyai.de/api/anfrage", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "hallo",
    });
    expect((await liesAnfrageBody(anfrage)).ok).toBe(false);
  });
});

describe("anfrageSchluesselAusHeader", () => {
  it("nimmt einen brauchbaren Key und verwirft zu kurze Werte", () => {
    expect(anfrageSchluesselAusHeader("4f1c2b7e-1a2b-4c3d-9e8f-0a1b2c3d4e5f")).toBe(
      "4f1c2b7e-1a2b-4c3d-9e8f-0a1b2c3d4e5f",
    );
    expect(anfrageSchluesselAusHeader("kurz")).toBeNull();
    expect(anfrageSchluesselAusHeader(null)).toBeNull();
  });
});

describe("anfrageArt", () => {
  it("erkennt die Beratungsanfrage und lässt fremde Werte nicht durch", () => {
    expect(anfrageArt({ art: "beratung" })).toBe("beratung");
    expect(anfrageArt({ art: "contact" })).toBe("contact");
    expect(anfrageArt({ art: "admin" })).toBe("contact");
    expect(anfrageArt({})).toBe("contact");
  });
});
