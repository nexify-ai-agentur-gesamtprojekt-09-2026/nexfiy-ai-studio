// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

import { feiertagImJahr, naechsterTermin, ostersonntag } from "./feiertage";
import {
  BUNDESLAENDER,
  FEIERTAG_NAMEN,
  LAENDERSEITEN_INDEXIERT,
  TEILWEISE_ZUSATZ,
  feiertagKurz,
  type FeiertagId,
} from "./regionen-daten";
import { SEITEN, canonicalUrl, pageJsonLd, seitenTitel } from "./seo";
import { KONTAKT, UNTERNEHMEN } from "./site-facts";

/**
 * Regionalseiten: Datentabelle, Feiertagsrechnung, Seitentabelle und Sitemap, und – vor allem –
 * nichts, was eine Ortsseite einer Agentur ohne Ortspräsenz nicht sagen darf (Google-Richtlinien
 * „Doorway pages" und „Scaled content abuse"; Governance config/pseo.json und
 * config/seo-workflow.json): keine Büros, Adressen, Ansprechpartner vor Ort, Referenzen, Kunden,
 * Bewertungen oder Preise je Land, kein LocalBusiness.
 */
const REPO = path.resolve(__dirname, "../..");
const lies = (...teile: string[]) => readFileSync(path.join(REPO, ...teile), "utf8");
const tag = (datum: Date) => datum.toISOString().slice(0, 10);

const REGIONEN = SEITEN.filter((seite) => seite.pfad.startsWith("/regionen"));
const LAENDER = REGIONEN.filter((seite) => seite.pfad !== "/regionen");

/** Aussagen, die eine Seite ohne Ortspräsenz nicht machen darf. */
export const VERBOTENE_BEHAUPTUNGEN: RegExp[] = [
  /Büros? in/i,
  /vor Ort/i,
  /Niederlassung/i,
  /Filiale/i,
  /Standort(e)? in/i,
  /Ansprechpartner(in)? (in|für) /i,
  /Kunden (aus|in) /i,
  /Referenz/i,
  /Bewertung/i,
  /Sterne/i,
  /\d\s?€|€\s?\d|\bEUR\b/,
  /aus der Region/i,
  /in Ihrer Nähe/i,
  /LocalBusiness/,
];

export function verboteneBehauptungen(text: string): string[] {
  return VERBOTENE_BEHAUPTUNGEN.flatMap((muster) => {
    const treffer = text.match(new RegExp(`.{0,40}${muster.source}.{0,40}`, muster.flags));
    return treffer ? [treffer[0]] : [];
  });
}

/** Telefonnummern im Text, außer der aus dem Impressum. */
export function fremdeTelefonnummern(text: string): string[] {
  return [...text.matchAll(/(?:\+|\b0)\d[\d /-]{6,}\d/g)]
    .map((m) => m[0])
    .filter((nummer) => nummer.replace(/\D/g, "") !== KONTAKT.telefon.replace(/\D/g, ""));
}

describe("Prüfhilfen", () => {
  it("finden verbotene Behauptungen und fremde Telefonnummern", () => {
    expect(verboteneBehauptungen("Unser Büro in Köln")).toHaveLength(1);
    expect(verboteneBehauptungen("Termin vor Ort in München")).toHaveLength(1);
    expect(verboteneBehauptungen("Kunden aus Bayern vertrauen uns")).toHaveLength(1);
    expect(verboteneBehauptungen("ab 449 € pro Tag")).toHaveLength(1);
    expect(verboteneBehauptungen("Ihr Ansprechpartner für München")).toHaveLength(1);
    expect(verboteneBehauptungen("NeXify AI ist die Agentur in Venlo.")).toEqual([]);
    expect(fremdeTelefonnummern("Rufen Sie 0221 123 4567 an")).toHaveLength(1);
    expect(fremdeTelefonnummern(`Telefon ${KONTAKT.telefon}`)).toEqual([]);
  });
});

describe("Datentabelle der Bundesländer", () => {
  it("genau die 16 Länder, eindeutig und in Adressform", () => {
    expect(BUNDESLAENDER).toHaveLength(16);
    expect(new Set(BUNDESLAENDER.map((land) => land.code))).toEqual(
      new Set(
        [
          "BW",
          "BY",
          "BE",
          "BB",
          "HB",
          "HH",
          "HE",
          "MV",
          "NI",
          "NW",
          "RP",
          "SL",
          "SN",
          "ST",
          "SH",
          "TH",
        ].map((k) => `DE-${k}`),
      ),
    );
    for (const feld of ["slug", "name", "code"] as const)
      expect(new Set(BUNDESLAENDER.map((land) => land[feld])).size, feld).toBe(16);
    for (const land of BUNDESLAENDER) expect(land.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
    expect(BUNDESLAENDER.filter((land) => land.stadtstaat).map((land) => land.name)).toEqual([
      "Berlin",
      "Bremen",
      "Hamburg",
    ]);
  });

  it("Feiertage: bekannte Kennungen, keine doppelt, Teilgeltung als Satzteil", () => {
    const bekannt = new Set(Object.keys(FEIERTAG_NAMEN));
    for (const land of BUNDESLAENDER) {
      expect(land.feiertage.length, land.name).toBeGreaterThanOrEqual(1);
      const ids = land.feiertage.map((t) => t.id);
      expect(new Set(ids).size, land.name).toBe(ids.length);
      for (const t of land.feiertage) {
        expect(bekannt.has(t.id), `${land.name}: ${t.id}`).toBe(true);
        if (t.teilweise) expect(t.teilweise).toMatch(/^(nur |in )/);
      }
    }
    // Stichproben gegen die Landesgesetze.
    const von = (code: string) =>
      BUNDESLAENDER.find((land) => land.code === code)?.feiertage.map((t) => t.id);
    expect(von("DE-BE")).toEqual(["frauentag"]);
    expect(von("DE-SN")).toContain("buss-und-bettag");
    expect(von("DE-TH")).toContain("weltkindertag");
    expect(von("DE-HE")).toEqual(["fronleichnam"]);
    expect(von("DE-NW")).toEqual(["fronleichnam", "allerheiligen"]);
  });

  it("Kurzform kennzeichnet jede Teilgeltung, landesweite Tage bleiben ohne Zusatz", () => {
    const teilweise = BUNDESLAENDER.flatMap((land) => land.feiertage.filter((t) => t.teilweise));
    expect(teilweise.length).toBeGreaterThanOrEqual(4); // BY ×2, SN, TH
    for (const land of BUNDESLAENDER)
      for (const t of land.feiertage)
        expect(feiertagKurz(t).endsWith(TEILWEISE_ZUSATZ), `${land.name}: ${t.id}`).toBe(
          Boolean(t.teilweise),
        );
  });

  it("die Übersicht nennt Feiertage nur über die Kurzform, nie den bloßen Namen", () => {
    const quelle = lies("src/routes/regionen.tsx");
    expect(quelle).toContain("land.feiertage.map(feiertagKurz)");
    expect(quelle).not.toMatch(/FEIERTAG_NAMEN/);
  });

  it("Datenschutzaufsicht: eigene Behörde je Land mit HTTPS-Adresse", () => {
    expect(new Set(BUNDESLAENDER.map((land) => land.aufsicht.url)).size).toBe(16);
    expect(new Set(BUNDESLAENDER.map((land) => land.aufsicht.kurz)).size).toBe(16);
    for (const land of BUNDESLAENDER)
      expect(land.aufsicht.url).toMatch(/^https:\/\/[a-z0-9.-]+\/$/);
  });

  it("Grenzländer nur aus den Zielländern der Website", () => {
    for (const land of BUNDESLAENDER)
      for (const code of land.grenzeZu)
        expect((UNTERNEHMEN.zielLaender as readonly string[]).includes(code)).toBe(true);
  });

  it("enthält keine verbotenen Behauptungen und keine Telefonnummern", () => {
    const text = JSON.stringify(BUNDESLAENDER);
    expect(verboteneBehauptungen(text)).toEqual([]);
    expect(fremdeTelefonnummern(text)).toEqual([]);
  });
});

describe("Feiertagsrechnung", () => {
  it("Ostersonntag, Fronleichnam und Buß- und Bettag", () => {
    expect(["2024", "2025", "2026", "2027", "2028"].map((j) => tag(ostersonntag(+j)))).toEqual([
      "2024-03-31",
      "2025-04-20",
      "2026-04-05",
      "2027-03-28",
      "2028-04-16",
    ]);
    expect(tag(feiertagImJahr("fronleichnam", 2026))).toBe("2026-06-04");
    expect(tag(feiertagImJahr("fronleichnam", 2027))).toBe("2027-05-27");
    expect(tag(feiertagImJahr("buss-und-bettag", 2025))).toBe("2025-11-19");
    expect(tag(feiertagImJahr("buss-und-bettag", 2026))).toBe("2026-11-18");
    expect(tag(feiertagImJahr("buss-und-bettag", 2027))).toBe("2027-11-17");
    expect(tag(feiertagImJahr("buss-und-bettag", 2028))).toBe("2028-11-22");
  });

  it("nächster Termin: der Tag selbst zählt, danach das Folgejahr", () => {
    const id: FeiertagId = "reformationstag";
    expect(tag(naechsterTermin(id, "2026-10-31"))).toBe("2026-10-31");
    expect(tag(naechsterTermin(id, "2026-11-01"))).toBe("2027-10-31");
    expect(tag(naechsterTermin("heilige-drei-koenige", "2026-11-22"))).toBe("2027-01-06");
  });
});

describe("Seitentabelle, Sitemap und llms.txt", () => {
  it("Übersicht und eine Seite je Land, im Pfad unter /regionen", () => {
    expect(REGIONEN.map((s) => s.pfad)).toEqual([
      "/regionen",
      ...BUNDESLAENDER.map((land) => `/regionen/${land.slug}`),
    ]);
    for (const seite of LAENDER) {
      expect(seite.eltern).toBe("/regionen");
      expect(seite.datei).toBe("regionen_.$land.tsx");
      expect(seite.index).toBe(LAENDERSEITEN_INDEXIERT);
      expect(seitenTitel(seite).length).toBeLessThanOrEqual(60);
    }
    expect(SEITEN.find((s) => s.pfad === "/regionen")?.index).toBe(true);
  });

  it("die Sitemap führt die Übersicht und Länderseiten genau dann, wenn freigegeben", () => {
    const sitemap = lies("public/sitemap.xml");
    expect(sitemap).toContain(`<loc>${canonicalUrl("/regionen")}</loc>`);
    for (const seite of LAENDER)
      expect(sitemap.includes(`<loc>${canonicalUrl(seite.pfad)}</loc>`), seite.pfad).toBe(
        LAENDERSEITEN_INDEXIERT,
      );
    const llms = lies("public/llms.txt");
    expect(llms).toContain(`(${canonicalUrl("/regionen")})`);
    for (const seite of LAENDER)
      expect(llms.includes(`(${canonicalUrl(seite.pfad)})`)).toBe(LAENDERSEITEN_INDEXIERT);
  });

  it("strukturierte Daten: WebPage mit Gebiet und Pfad, kein LocalBusiness, keine Anschrift", () => {
    for (const seite of LAENDER) {
      const ld = JSON.stringify(pageJsonLd(seite.pfad));
      expect(ld).not.toMatch(/LocalBusiness|PostalAddress|"address"|"geo"|"telephone"/);
      const [webseite, pfad] =
        (pageJsonLd(seite.pfad)["@graph"] as Record<string, unknown>[]) ?? [];
      expect(webseite?.["@type"]).toBe("WebPage");
      expect(webseite?.["spatialCoverage"]).toMatchObject({
        "@type": "AdministrativeArea",
        name: seite.kurz,
      });
      expect(pfad?.["@type"]).toBe("BreadcrumbList");
      expect((pfad?.["itemListElement"] as { name: string }[]).map((glied) => glied.name)).toEqual([
        "Startseite",
        "Regionen",
        seite.kurz,
      ]);
    }
  });

  it("die Quellen der Seiten enthalten keine verbotenen Behauptungen", () => {
    for (const datei of [
      "src/routes/regionen.tsx",
      "src/routes/regionen_.$land.tsx",
      "src/components/site/RegionenBausteine.tsx",
      "src/lib/regionen-daten.ts",
    ]) {
      // Kommentare dürfen die Regeln nennen; geprüft wird der Code ohne Kommentare.
      const code = lies(datei)
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      expect(verboteneBehauptungen(code), datei).toEqual([]);
      expect(fremdeTelefonnummern(code), datei).toEqual([]);
    }
  });
});

/**
 * Gerendertes HTML aus dem gebauten Worker (`npm run build`), wie es ausgeliefert wird. Ohne
 * Build übersprungen.
 */
const SERVER = path.join(REPO, ".output", "server", "index.mjs");
type Worker = { fetch(r: Request, env: unknown, ctx: unknown): Promise<Response> };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const env = { ASSETS: { fetch: async () => new Response("not found", { status: 404 }) } };

/** Sichtbarer Text der Hauptfläche: ohne Skripte, Stile, Kopf und Fußzeile. */
function hauptText(html: string): string {
  const ohne = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  return ohne
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

describe.skipIf(!existsSync(SERVER))("Gebauter Worker: Regionalseiten", () => {
  let worker: Worker;
  const abruf = async (pfad: string) => {
    const antwort = await worker.fetch(new Request(`https://www.nexifyai.de${pfad}`), env, ctx);
    return { status: antwort.status, html: await antwort.text(), antwort };
  };
  beforeAll(async () => {
    worker = (await import(/* @vite-ignore */ pathToFileURL(SERVER).href)).default as Worker;
  }, 60_000);

  it.each(REGIONEN)(
    "$pfad: 200, eine H1, Kopf aus der Seitentabelle, nichts Unbelegtes",
    async (seite) => {
      const { status, html } = await abruf(seite.pfad);
      expect(status).toBe(200);
      expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
      expect(html).toContain(`<link rel="canonical" href="${canonicalUrl(seite.pfad)}"`);
      expect(html).toContain(`<title>${seitenTitel(seite)}</title>`);
      expect(/<meta name="robots" content="noindex, follow"/.test(html)).toBe(!seite.index);
      const text = hauptText(html);
      expect(text).toContain(seite.beschreibung);
      expect(verboteneBehauptungen(text)).toEqual([]);
      expect(fremdeTelefonnummern(text)).toEqual([]);
      expect(html).not.toContain("LocalBusiness");
    },
  );

  it("jede Länderseite nennt ihre eigenen Feiertage, Termine und ihre Aufsicht", async () => {
    for (const land of BUNDESLAENDER) {
      const text = hauptText((await abruf(`/regionen/${land.slug}`)).html);
      for (const t of land.feiertage) expect(text, land.name).toContain(FEIERTAG_NAMEN[t.id]);
      expect(text).toContain(land.aufsicht.name);
      expect(text).toMatch(
        /\b(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag), \d{1,2}\. \S+ 20\d\d\b/,
      );
      // Keine Feiertage anderer Länder, die hier nicht gelten.
      for (const [id, name] of Object.entries(FEIERTAG_NAMEN))
        if (!land.feiertage.some((t) => t.id === id))
          expect(text, `${land.name}: ${name}`).not.toContain(name);
    }
  });

  it("die Übersicht kennzeichnet Feiertage mit Teilgeltung als „(teilweise)“", async () => {
    const text = hauptText((await abruf("/regionen")).html);
    for (const land of BUNDESLAENDER)
      for (const t of land.feiertage) {
        const name = FEIERTAG_NAMEN[t.id];
        // Ausschnitt der Karte dieses Landes: vom Ländernamen bis „Aufsicht:".
        const karte =
          text.slice(text.indexOf(`${land.name} Zusätzlich frei:`)).split("Aufsicht:")[0] ?? "";
        expect(karte, land.name).toContain(name);
        expect(karte.includes(name + TEILWEISE_ZUSATZ), `${land.name}: ${name}`).toBe(
          Boolean(t.teilweise),
        );
      }
  });

  it("die Übersicht verlinkt alle 16 Länder, unbekannte Länder sind 404 mit noindex", async () => {
    const { html } = await abruf("/regionen");
    for (const land of BUNDESLAENDER) expect(html).toContain(`href="/regionen/${land.slug}"`);
    for (const pfad of ["/regionen/koeln", "/regionen/Bayern", "/regionen/oesterreich"]) {
      const { status, antwort } = await abruf(pfad);
      expect(status, pfad).toBe(404);
      expect(antwort.headers.get("x-robots-tag"), pfad).toBe("noindex");
    }
  });

  it("die Fußzeile jeder Seite verlinkt die Übersicht", async () => {
    const { html } = await abruf("/kontakt");
    expect(html).toContain('href="/regionen"');
  });
});
