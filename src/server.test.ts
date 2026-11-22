import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

// Das Framework wird ersetzt: bekannte Seiten antworten mit 200, alles andere mit der 404-Seite.
// So prüft der Test genau die Schicht, die dieses Repo selbst verantwortet (src/server.ts).
const BEKANNT = new Set(["/", "/portale", "/kontakt", "/anmelden"]);
const gesehen = vi.hoisted(() => [] as string[]);
vi.mock("@tanstack/react-start/server-entry", () => ({
  default: {
    fetch: (request: Request) => {
      const { pathname, search } = new URL(request.url);
      // Wie das echte Framework: Schrägstrich am Ende wird samt Querystring weitergeleitet.
      if (pathname.length > 1 && pathname.endsWith("/"))
        return new Response(null, {
          status: 307,
          headers: { location: `${pathname.replace(/\/+$/, "")}${search}` },
        });
      gesehen.push(`${pathname}${search}`);
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
    "/teileklar/kasse/?utm_source=x&q=y",
    "//teileklar",
    "//teileklar/kasse?utm_source=x&q=y",
    "///teileklar//kasse/?utm_source=x",
    "/TEILEKLAR/shop",
  ];

  it.each(ALTPFADE)("%s antwortet mit 404, noindex-Header und ohne Weiterleitung", async (pfad) => {
    const antwort = await abruf(pfad);
    expect(antwort.status).toBe(404);
    expect(antwort.headers.get("x-robots-tag")).toBe("noindex");
    expect(antwort.headers.get("location")).toBeNull();
    expect(antwort.headers.get("refresh")).toBeNull();
  });

  it("reicht weder Querystring noch Schrägstrich-Variante an die Seitenausgabe weiter", async () => {
    gesehen.length = 0;
    await abruf("/teileklar/kasse/?utm_source=x&email=erika%40firma.de");
    expect(gesehen).toEqual(["/teileklar/kasse"]);
    gesehen.length = 0;
    await abruf("//teileklar//kasse?utm_source=x&q=y");
    expect(gesehen).toEqual(["/teileklar/kasse"]);
  });

  it("setzt den noindex-Header auf jede 404-Antwort, nicht auf gefundene Seiten", async () => {
    expect((await abruf("/gibt-es-nicht")).headers.get("x-robots-tag")).toBe("noindex");
    const start = await abruf("/");
    expect(start.status).toBe(200);
    expect(start.headers.get("x-robots-tag")).toBeNull();
  });

  it("kennt keine Weiterleitungsregel mehr, weder im Worker noch in public/_redirects", async () => {
    const { PERMANENT_REDIRECTS, TEMPORARY_REDIRECTS } = await import("./lib/server-routing");
    const alle = { ...PERMANENT_REDIRECTS, ...TEMPORARY_REDIRECTS };
    for (const [quelle, ziel] of Object.entries(alle)) {
      expect(quelle).not.toMatch(/teileklar/i);
      // Nur Ziele derselben Domain: ein Pfad, kein Schema, kein Host.
      expect(ziel).toMatch(/^\/[a-z0-9/-]*$/);
    }
    const regeln = readFileSync(path.resolve(__dirname, "../public/_redirects"), "utf8")
      .split("\n")
      .filter((zeile) => zeile.trim() && !zeile.trim().startsWith("#"));
    expect(regeln).toEqual([]);
  });

  it("führt /kundencenter nicht in der dauerhaften Tabelle", async () => {
    const { PERMANENT_REDIRECTS } = await import("./lib/server-routing");
    expect(Object.keys(PERMANENT_REDIRECTS)).not.toContain("/kundencenter");
    expect(Object.keys(PERMANENT_REDIRECTS)).not.toContain("/kundencenter/");
  });
});

describe("Kurzadressen des Kundencenters", () => {
  it.each(["/kundencenter", "/kundencenter/"])(
    "%s leitet vorläufig (302) auf /portale, damit der Pfad später frei bleibt",
    async (pfad) => {
      const antwort = await abruf(pfad);
      expect(antwort.status).toBe(302);
      expect(antwort.headers.get("location")).toBe("https://www.nexifyai.de/portale");
    },
  );

  it.each(["/kundenportal", "/kundenportal/"])(
    "%s leitet dauerhaft (301) auf /portale derselben Domain",
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

describe("installierbare Web-App: /sw.js und /offline", () => {
  it("/sw.js kommt vom Worker selbst: JavaScript, immer frisch geprüft, mit fetch-Ereignis", async () => {
    gesehen.length = 0;
    const antwort = await abruf("/sw.js");
    expect(antwort.status).toBe(200);
    expect(antwort.headers.get("content-type")).toContain("text/javascript");
    expect(antwort.headers.get("cache-control")).toBe("no-cache");
    // Wurzel-Scope ohne Zusatzheader: die Datei liegt in der Wurzel.
    expect(antwort.headers.get("service-worker-allowed")).toBeNull();
    expect(antwort.headers.get("x-content-type-options")).toBe("nosniff");
    const skript = await antwort.text();
    expect(skript).toContain('addEventListener("fetch"');
    expect(skript).not.toContain("__NEXIFY_SW_VERSION__");
    expect(gesehen).toEqual([]);
  });

  it("Rückbau ohne neuen Build: die Worker-Variable PWA_ABSCHALTEN liefert den Abschalt-Worker", async () => {
    const antwort = await server.fetch(
      new Request("https://www.nexifyai.de/sw.js"),
      { PWA_ABSCHALTEN: "1" },
      {},
    );
    const skript = await antwort.text();
    expect(antwort.headers.get("cache-control")).toBe("no-cache");
    expect(skript).toContain("registration.unregister()");
    expect(skript).toContain("caches.delete");
    expect(skript).not.toContain('addEventListener("fetch"');
  });

  it("/offline ist eine fertige Seite mit noindex, ohne Umweg über die Seitenausgabe", async () => {
    gesehen.length = 0;
    const antwort = await abruf("/offline");
    expect(antwort.status).toBe(200);
    expect(antwort.headers.get("content-type")).toContain("text/html");
    expect(antwort.headers.get("x-robots-tag")).toBe("noindex");
    expect(await antwort.text()).toContain("Sie sind offline.");
    expect(gesehen).toEqual([]);
  });

  it("die Sicherheitsrichtlinie erlaubt Worker und Manifest nur vom eigenen Ursprung", async () => {
    const csp = (await abruf("/")).headers.get("content-security-policy") ?? "";
    expect(csp).toContain("worker-src 'self'");
    expect(csp).toContain("manifest-src 'self'");
    expect(csp).toContain("connect-src 'self'");
  });

  it("/sw.js und das Manifest bleiben ohne langes Zwischenspeichern", () => {
    const regeln = readFileSync(path.resolve(__dirname, "../public/_headers"), "utf8");
    expect(regeln).toMatch(/\/manifest\.webmanifest\n\s+cache-control: no-cache/);
    expect(regeln).not.toMatch(/^\/sw\.js/m);
  });
});
