import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

// Das Framework wird ersetzt: bekannte Seiten antworten mit 200, alles andere mit der 404-Seite.
// So prüft der Test genau die Schicht, die dieses Repo selbst verantwortet (src/server.ts).
const BEKANNT = new Set(["/", "/portale", "/kontakt", "/anmelden"]);
vi.mock("@tanstack/react-start/server-entry", () => ({
  default: {
    fetch: (request: Request) => {
      const { pathname } = new URL(request.url);
      const gefunden = BEKANNT.has(pathname);
      return new Response(gefunden ? "<h1>Seite</h1>" : "<h1>Seite nicht gefunden</h1>", {
        status: gefunden ? 200 : 404,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    },
  },
}));

const { default: server } = await import("./server");

function abruf(adresse: string): Promise<Response> {
  return Promise.resolve(
    server.fetch(new Request(`https://www.nexifyai.de${adresse}`, { redirect: "manual" }), {}, {}),
  );
}

describe("frühere Shop-Adressen (Inhaberentscheidung 22.11.2026)", () => {
  const ALTPFADE = [
    "/teileklar",
    "/teileklar/",
    "/teileklar/shop",
    "/teileklar/werkstatt",
    "/teileklar/partner-werden",
    "/teileklar/kasse?x=1",
    "/teileklar/kasse?utm_source=x&q=y",
    "/teileklar/bestellungen?email=erika%40firma.de",
  ];

  it.each(ALTPFADE)("%s antwortet mit 404, noindex-Header und ohne Weiterleitung", async (pfad) => {
    const antwort = await abruf(pfad);
    expect(antwort.status).toBe(404);
    expect(antwort.headers.get("x-robots-tag")).toBe("noindex");
    expect(antwort.headers.get("location")).toBeNull();
    expect(antwort.headers.get("refresh")).toBeNull();
  });

  it("setzt den noindex-Header auf jede 404-Antwort, nicht auf gefundene Seiten", async () => {
    expect((await abruf("/gibt-es-nicht")).headers.get("x-robots-tag")).toBe("noindex");
    const start = await abruf("/");
    expect(start.status).toBe(200);
    expect(start.headers.get("x-robots-tag")).toBeNull();
  });

  it("kennt keine Weiterleitungsregel mehr, weder im Worker noch in public/_redirects", async () => {
    const { PERMANENT_REDIRECTS } = await import("./lib/server-routing");
    for (const [quelle, ziel] of Object.entries(PERMANENT_REDIRECTS)) {
      expect(quelle).not.toMatch(/teileklar/i);
      // Nur Ziele derselben Domain: ein Pfad, kein Schema, kein Host.
      expect(ziel).toMatch(/^\/[a-z0-9/-]*$/);
    }
    const regeln = readFileSync(path.resolve(__dirname, "../public/_redirects"), "utf8")
      .split("\n")
      .filter((zeile) => zeile.trim() && !zeile.trim().startsWith("#"));
    expect(regeln).toEqual([]);
  });
});

describe("Kurzadressen des Kundencenters", () => {
  it.each(["/kundencenter", "/kundencenter/", "/kundenportal", "/kundenportal/"])(
    "%s leitet dauerhaft auf /portale derselben Domain",
    async (pfad) => {
      const antwort = await abruf(pfad);
      expect(antwort.status).toBe(301);
      expect(antwort.headers.get("location")).toBe("https://www.nexifyai.de/portale");
    },
  );

  it("lässt die bestehenden Kurzadressen unverändert", async () => {
    expect((await abruf("/login")).headers.get("location")).toBe(
      "https://www.nexifyai.de/anmelden",
    );
    expect((await abruf("/konto")).headers.get("location")).toBe("https://www.nexifyai.de/portale");
    expect((await abruf("/preise")).headers.get("location")).toBe(
      "https://www.nexifyai.de/preise-ablauf",
    );
  });
});
