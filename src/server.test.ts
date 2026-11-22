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
    "/TeileKlar",
    "/TEILEKLAR/Werkstatt?x=1",
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
    const login = await abruf("/login");
    expect(login.status).toBe(301);
    expect(login.headers.get("location")).toBe("https://www.nexifyai.de/portale");
    expect((await abruf("/konto")).headers.get("location")).toBe("https://www.nexifyai.de/portale");
    expect((await abruf("/preise")).headers.get("location")).toBe(
      "https://www.nexifyai.de/preise-ablauf",
    );
  });
});

describe("Kontoadressen und /produkte", () => {
  it.each([
    "/anmelden",
    "/anmelden/",
    "/registrieren",
    "/registrieren/",
    "/passwort-vergessen",
    "/passwort-vergessen/",
  ])(
    "%s leitet vorläufig (302) auf /portale, statt denselben Hinweis zu wiederholen",
    async (pfad) => {
      gesehen.length = 0;
      const antwort = await abruf(pfad);
      expect(antwort.status).toBe(302);
      expect(antwort.headers.get("location")).toBe("https://www.nexifyai.de/portale");
      // Die Seitenausgabe wird für diese Adressen nicht mehr gefragt.
      expect(gesehen).toEqual([]);
    },
  );

  it.each(["/produkte", "/produkte/"])("%s leitet vorläufig (302) auf die Suite", async (pfad) => {
    const antwort = await abruf(pfad);
    expect(antwort.status).toBe(302);
    expect(antwort.headers.get("location")).toBe("https://www.nexifyai.de/produkte/nex2fly");
  });

  it("lässt die Produktseiten selbst und den Querystring in Ruhe", async () => {
    gesehen.length = 0;
    await abruf("/produkte/nex2fly");
    expect(gesehen).toEqual(["/produkte/nex2fly"]);
    expect((await abruf("/anmelden?von=mail")).headers.get("location")).toBe(
      "https://www.nexifyai.de/portale?von=mail",
    );
  });

  it.each([
    ["/ANMELDEN", 302, "/portale"],
    ["/Registrieren", 302, "/portale"],
    ["/Passwort-Vergessen/", 302, "/portale"],
    ["/PRODUKTE", 302, "/produkte/nex2fly"],
    ["/Preise", 301, "/preise-ablauf"],
    ["/KONTO/", 301, "/portale"],
  ] as const)("%s leitet unabhängig von der Schreibweise weiter", async (pfad, status, ziel) => {
    gesehen.length = 0;
    const antwort = await abruf(`${pfad}?von=mail`);
    expect(antwort.status).toBe(status);
    expect(antwort.headers.get("location")).toBe(`https://www.nexifyai.de${ziel}?von=mail`);
    expect(gesehen).toEqual([]);
  });

  it("alle Schlüssel der Weiterleitungstabellen sind klein geschrieben", async () => {
    const { PERMANENT_REDIRECTS, TEMPORARY_REDIRECTS } = await import("./lib/server-routing");
    for (const quelle of Object.keys({ ...PERMANENT_REDIRECTS, ...TEMPORARY_REDIRECTS }))
      expect(quelle).toBe(quelle.toLowerCase());
  });

  it("keine Weiterleitung zeigt auf eine Adresse, die selbst weiterleitet", async () => {
    const { PERMANENT_REDIRECTS, TEMPORARY_REDIRECTS } = await import("./lib/server-routing");
    const alle: Record<string, string> = { ...PERMANENT_REDIRECTS, ...TEMPORARY_REDIRECTS };
    for (const [quelle, ziel] of Object.entries(alle)) expect(alle[ziel], quelle).toBeUndefined();
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

  it("jede Direktive der Sicherheitsrichtlinie ist eng: kein eval, kein Stern, keine fremde Quelle", async () => {
    const csp = (await abruf("/")).headers.get("content-security-policy") ?? "";
    const direktiven = new Map(
      csp
        .split(";")
        .map((teil) => teil.trim().split(/\s+/))
        .filter((teile) => teile[0])
        .map((teile) => [teile[0] as string, teile.slice(1)]),
    );
    expect(direktiven.get("default-src")).toEqual(["'self'"]);
    expect(direktiven.get("object-src")).toEqual(["'none'"]);
    expect(direktiven.get("frame-ancestors")).toEqual(["'none'"]);
    expect(direktiven.get("base-uri")).toEqual(["'self'"]);
    expect(direktiven.get("form-action")).toEqual(["'self'"]);
    expect(direktiven.has("upgrade-insecure-requests")).toBe(true);
    const erlaubt = new Set(["'self'", "'none'", "'unsafe-inline'", "data:", "blob:"]);
    for (const [name, quellen] of direktiven) {
      for (const quelle of quellen) {
        expect(erlaubt.has(quelle), `${name}: ${quelle}`).toBe(true);
        expect(quelle, name).not.toMatch(/unsafe-eval|\*|^https?:/);
      }
    }
    // data: und blob: nur dort, wo Bilder, Schriften und Worker sie brauchen – nie für Skripte.
    expect(direktiven.get("script-src")).toEqual(["'self'", "'unsafe-inline'"]);
    expect(direktiven.get("connect-src")).toEqual(["'self'"]);
    // Dieselbe Richtlinie auf Fehlerseite, Weiterleitung und Schnittstelle.
    for (const pfad of ["/gibt-es-nicht", "/login", "/api/anfrage", "/sw.js"])
      expect((await abruf(pfad)).headers.get("content-security-policy"), pfad).toBe(csp);
  });

  it("Seiten werden vor dem Anzeigen neu geprüft (no-cache), gesetzte Angaben bleiben", async () => {
    expect((await abruf("/")).headers.get("cache-control")).toBe("no-cache");
    expect((await abruf("/gibt-es-nicht")).headers.get("cache-control")).toBe("no-cache");
    // Die Schnittstelle setzt ihre eigene Angabe; sie wird nicht überschrieben.
    const api = await server.fetch(
      new Request("https://www.nexifyai.de/api/anfrage", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: "{}",
      }),
      {},
      {},
    );
    expect(api.headers.get("cache-control")).toBe("no-store");
  });

  it("/sw.js und das Manifest bleiben ohne langes Zwischenspeichern", () => {
    const regeln = readFileSync(path.resolve(__dirname, "../public/_headers"), "utf8");
    expect(regeln).toMatch(/\/manifest\.webmanifest\n\s+cache-control: no-cache/);
    expect(regeln).not.toMatch(/^\/sw\.js/m);
  });
});

describe("http auf https (aus main, 2026-11-22)", () => {
  it("leitet http-Abrufe der Domain dauerhaft auf https um", async () => {
    const antwort = await server.fetch(
      new Request("http://www.nexifyai.de/kontakt?x=1", { redirect: "manual" }),
      {},
      {},
    );
    expect(antwort.status).toBe(301);
    expect(antwort.headers.get("location")).toBe("https://www.nexifyai.de/kontakt?x=1");
  });

  it("bleibt bei einer früheren Shop-Adresse auf derselben Domain", async () => {
    const antwort = await server.fetch(
      new Request("http://www.nexifyai.de/teileklar?utm_source=x", { redirect: "manual" }),
      {},
      {},
    );
    expect(new URL(antwort.headers.get("location") ?? "").host).toBe("www.nexifyai.de");
  });

  it.each(["localhost", "127.0.0.1", "[::1]"])(
    "lässt lokales Prüfgerüst %s auf http",
    async (host) => {
      const antwort = await server.fetch(
        new Request(`http://${host}:8788/teileklar`, { redirect: "manual" }),
        {},
        {},
      );
      expect(antwort.status).toBe(404);
      expect(antwort.headers.get("location")).toBeNull();
    },
  );
});
