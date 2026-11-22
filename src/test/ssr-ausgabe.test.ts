// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * Serverseitig gerendertes HTML aller Seiten aus dem gebauten Worker (`npm run build`), so wie es
 * ausgeliefert wird. Ohne Build übersprungen; `src/components/site/NexifyShell.test.tsx` prüft
 * dieselben Zustände an der Komponente.
 *
 *  - Chat aus (Standard): kein Auslöser, kein Panel, kein Chat-Skript; „Vorhaben schildern“ ist ein
 *    Link auf /kontakt.
 *  - Chat an (eingeschaltet, eingerichtet, Migration 0003): Auslöser wie bisher.
 *  - Keine Seite verlinkt frühere Shop-Adressen oder nennt die stillgelegten Angebote (Kopfmenü,
 *    Telefonmenü, Megamenü, Fußzeile, Inhalte).
 */
const SERVER = join(process.cwd(), ".output", "server", "index.mjs");
const SITEMAP = join(process.cwd(), ".output", "public", "sitemap.xml");
const GEBAUT = existsSync(SERVER) && existsSync(SITEMAP);

type Worker = { fetch(r: Request, env: unknown, ctx: unknown): Promise<Response> };
let worker: Worker;

const ctx = { waitUntil() {}, passThroughOnException() {} };
const ASSETS = { fetch: async () => new Response("not found", { status: 404 }) };
const DB = {
  prepare() {
    const stmt = {
      bind: () => stmt,
      all: async () => ({ results: [] }),
      first: async () => null,
      run: async () => ({ meta: { changes: 0 } }),
    };
    return stmt;
  },
};
const AUS = { ASSETS };
const AN = {
  ASSETS,
  DB,
  CHAT_AKTIV: "an",
  NINEROUTER_API_KEY: "test-schluessel",
  CHAT_IP_SCHLUESSEL: "test-ip-schluessel-0123456789",
};

async function seite(pfad: string, env: unknown) {
  const antwort = await worker.fetch(new Request(`https://www.nexifyai.de${pfad}`), env, ctx);
  return { status: antwort.status, html: await antwort.text(), antwort };
}

function pfade(): string[] {
  const xml = readFileSync(SITEMAP, "utf8");
  return [...xml.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
}

/** Sichtbare Spuren der stillgelegten Angebote im HTML (Links und Text). */
export function altangebote(html: string): string[] {
  return [
    ...html.matchAll(/href="\/teileklar[^"]*"/gi),
    ...html.matchAll(/.{0,30}(?:teileklar|werkstattprofil|werkstattpartner).{0,30}/gi),
  ].map((m) => m[0]);
}

describe("altangebote", () => {
  it("findet Links und Nennungen", () => {
    expect(altangebote('<a href="/teileklar/shop">x</a>')).not.toEqual([]);
    expect(altangebote("<li>TEILEKLAR</li>")).not.toEqual([]);
    expect(altangebote("<p>Werkstattprofile ansehen</p>")).not.toEqual([]);
    expect(altangebote("<p>Unsere Werkstattpartner</p>")).not.toEqual([]);
    expect(altangebote('<a href="/kontakt">Kontakt</a>')).toEqual([]);
  });
});

describe.skipIf(!GEBAUT)("Gebauter Worker: Seiten-HTML", () => {
  beforeAll(async () => {
    worker = (await import(/* @vite-ignore */ pathToFileURL(SERVER).href)).default as Worker;
  }, 60_000);

  it("rendert ohne eingeschalteten Chat keinen Chat und führt die Startseite zu /kontakt", async () => {
    const { status, html } = await seite("/", AUS);
    expect(status).toBe(200);
    expect(html).toMatch(/<html[^>]*data-nxc-chat="aus"/);
    expect(html).not.toContain('id="nexify-chat-ausloeser"');
    expect(html).not.toContain('id="nexify-chat"');
    expect(html).not.toContain("Frage stellen");
    expect(html).not.toContain("nexify-chat-v1");
    expect(html).not.toContain('aria-controls="nexify-chat"');
    const knoepfe = [
      ...html.matchAll(/<a[^>]*href="\/kontakt"[^>]*>(?:(?!<\/a>).)*Vorhaben schildern/gs),
    ];
    expect(knoepfe).toHaveLength(2);
    expect(html).toContain("Ein paar Sätze im Kontaktformular genügen für den Anfang.");
  });

  it("rendert den Chat-Auslöser nur, wenn der Chat eingeschaltet und eingerichtet ist", async () => {
    const { html } = await seite("/", AN);
    expect(html).toMatch(/<html[^>]*data-nxc-chat="an"/);
    expect(html).toContain('id="nexify-chat-ausloeser"');
    expect(html.match(/aria-controls="nexify-chat"/g)?.length).toBeGreaterThanOrEqual(3);
    // Eingeschaltet, aber ohne Datenbank: aus.
    const halb = await seite("/", { ...AN, DB: undefined });
    expect(halb.html).toMatch(/<html[^>]*data-nxc-chat="aus"/);
    expect(halb.html).not.toContain('id="nexify-chat-ausloeser"');
    // Zurück auf aus, damit die folgenden Prüfungen den Standard sehen.
    await seite("/", AUS);
  });

  it("keine Seite verlinkt oder nennt die stillgelegten Angebote", async () => {
    const alle = pfade();
    expect(alle.length).toBeGreaterThan(20);
    const funde: string[] = [];
    for (const pfad of alle) {
      for (const env of [AUS, AN]) {
        const { status, html } = await seite(pfad, env);
        expect(status, pfad).toBe(200);
        for (const fund of altangebote(html)) funde.push(`${pfad}: ${fund}`);
      }
    }
    expect(funde).toEqual([]);
  }, 120_000);

  it("frühere Shop-Adressen sind in jeder Schreibweise 404 und noindex", async () => {
    for (const pfad of ["/teileklar", "/TEILEKLAR/shop", "/Teileklar/werkstatt"]) {
      const { status, antwort } = await seite(pfad, AUS);
      expect(status, pfad).toBe(404);
      expect(antwort.headers.get("x-robots-tag"), pfad).toContain("noindex");
    }
  });
});
