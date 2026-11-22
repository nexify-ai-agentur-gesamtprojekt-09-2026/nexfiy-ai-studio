import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

import {
  ABSCHALT_WORKER,
  SW_VERSION_MARK,
  offlineResponse,
  pwaAbgeschaltet,
  serviceWorkerResponse,
  serviceWorkerScript,
} from "./pwa";
import { CACHE_PREFIX, OFFLINE_PATH, PWA_AKTIV } from "./pwa-config";
import rawWorker from "./pwa/service-worker.js?raw";

// Der Worker läuft hier ohne Browser in einer nachgestellten Umgebung (Ereignisse, CacheStorage,
// fetch). Den Lauf im echten Browser beschreibt docs/pwa-seo-geo.md.
const ORIGIN = "https://www.nexifyai.de";
const LOGO = "/site-assets/9176c58a16ff634a.png";
const SCHRIFTEN = ["/site-assets/0848630eef4b593d.woff2", "/site-assets/f7f6e92afae6f3df.woff2"];
const IMMUTABLE = { "cache-control": "public, max-age=31536000, immutable" };

type Antwort = () => Response;
function antwort(
  body: string,
  {
    status = 200,
    type = "basic",
    redirected = false,
    headers = {},
  }: {
    status?: number;
    type?: string;
    redirected?: boolean;
    headers?: Record<string, string>;
  } = {},
): Response {
  const response = new Response(body, { status, headers });
  Object.defineProperties(response, { type: { value: type }, redirected: { value: redirected } });
  return response;
}

function aufbau({
  version = "v1",
  online = true,
  routes = {} as Record<string, Antwort>,
  vorhanden = {} as Record<string, string[]>,
  quelle = serviceWorkerScript(version),
} = {}) {
  const ereignisse: Record<string, (event: unknown) => void> = {};
  const stores = new Map<string, Map<string, Response>>(
    Object.entries(vorhanden).map(([name, keys]) => [
      name,
      new Map(keys.map((key) => [key, new Response("alt")])),
    ]),
  );
  const abrufe: Array<{ key: string; init: RequestInit }> = [];
  const zustand = { online, skipWaiting: 0, unregister: 0, cacheFehler: "" };
  const schluessel = (key: string | { url: string }) => {
    const url = new URL(typeof key === "string" ? key : key.url, ORIGIN);
    return url.pathname + url.search;
  };
  const caches = {
    async open(name: string) {
      if (zustand.cacheFehler === "open") throw new Error("QuotaExceededError");
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name)!;
      return {
        async match(key: string) {
          if (zustand.cacheFehler === "match") throw new Error("UnknownError");
          return store.get(schluessel(key))?.clone();
        },
        async put(key: string, response: Response) {
          if (zustand.cacheFehler === "put") throw new Error("QuotaExceededError");
          store.set(schluessel(key), response);
        },
      };
    },
    async keys() {
      return [...stores.keys()];
    },
    async delete(name: string) {
      return stores.delete(name);
    },
  };
  const fetch = async (input: string | { url: string }, init: RequestInit = {}) => {
    const key = schluessel(input);
    abrufe.push({ key, init });
    if (!zustand.online) throw new TypeError("offline");
    if (routes[key]) return routes[key]();
    if (key === OFFLINE_PATH)
      return antwort("<h1>Sie sind offline.</h1>", {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      });
    if (/^\/(?:assets|site-assets)\//.test(key))
      return antwort("datei " + key, { headers: IMMUTABLE });
    return antwort("seite " + key, { headers: { "content-type": "text/html; charset=utf-8" } });
  };
  runInNewContext(quelle, {
    self: {
      location: new URL(ORIGIN),
      addEventListener: (name: string, callback: (event: unknown) => void) => {
        ereignisse[name] = callback;
      },
      skipWaiting: async () => {
        zustand.skipWaiting += 1;
      },
      registration: {
        unregister: async () => {
          zustand.unregister += 1;
          return true;
        },
      },
    },
    caches,
    fetch,
    URL,
    Response,
    Promise,
    Error,
  });
  const lebenszyklus = async (name: string) => {
    let wartet: unknown;
    ereignisse[name]?.({
      waitUntil(value: unknown) {
        wartet = value;
      },
    });
    await wartet;
  };
  const anfrage = async (
    pfad: string,
    {
      method = "GET",
      mode = "navigate",
      headers = {},
    }: { method?: string; mode?: string; headers?: Record<string, string> } = {},
  ): Promise<Response | null> => {
    let beantwortet: unknown;
    ereignisse["fetch"]?.({
      request: {
        url: pfad.startsWith("http") ? pfad : ORIGIN + pfad,
        method,
        mode,
        headers: new Headers(headers),
      },
      respondWith(value: unknown) {
        beantwortet = value;
      },
    });
    return beantwortet === undefined ? null : ((await beantwortet) as Response);
  };
  return {
    ereignisse,
    abrufe,
    zustand,
    lebenszyklus,
    anfrage,
    namen: () => [...stores.keys()].sort(),
    eintraege: (name: string) => [...(stores.get(name)?.keys() ?? [])].sort(),
  };
}

const STATIC = `${CACHE_PREFIX}static-v1`;
const OFFLINE = `${CACHE_PREFIX}offline-v1`;

describe("Service Worker: Umfang", () => {
  it("kennt nur install, activate und fetch – kein Push, kein Hintergrund-Sync, keine Nachrichten", () => {
    const namen = [...rawWorker.matchAll(/addEventListener\(\s*"([a-z]+)"/g)].map((m) => m[1]);
    expect(namen.sort()).toEqual(["activate", "fetch", "install"]);
    expect(rawWorker).not.toMatch(
      /\bclients\s*\.\s*claim\s*\(|importScripts\s*\(|\bindexedDB\b|\blocalStorage\b|\bcookieStore\b|PushManager|showNotification/,
    );
  });

  it("jeder Build bekommt eigene Cache-Namen", () => {
    expect(rawWorker).toContain(SW_VERSION_MARK);
    const a = serviceWorkerScript("build-a");
    const b = serviceWorkerScript("build-b");
    expect(a).not.toContain(SW_VERSION_MARK);
    expect(a).not.toBe(b);
    expect(a).toContain('const VERSION = "build-a"');
    // Die Kennung landet in einem Zeichenkettenliteral: nichts, was es verlassen könnte.
    expect(serviceWorkerScript('x";alert(1)//')).toContain('const VERSION = "xalert1"');
  });
});

describe("Service Worker: Installieren und Aktualisieren", () => {
  it("speichert beim Installieren nur die Offline-Seite und ihre drei Dateien, ohne Cookies", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    expect(w.namen()).toEqual([OFFLINE, STATIC].sort());
    expect(w.eintraege(OFFLINE)).toEqual([OFFLINE_PATH]);
    expect(w.eintraege(STATIC)).toEqual([LOGO, ...SCHRIFTEN].sort());
    expect(w.abrufe.every((abruf) => abruf.init.credentials === "omit")).toBe(true);
    expect(w.zustand.skipWaiting).toBe(1);
  });

  it("installiert sich nicht halb: fehlt die Offline-Seite oder eine Datei, schlägt es fehl", async () => {
    const kaputt: Array<Record<string, Antwort>> = [
      { [OFFLINE_PATH]: () => antwort("fehler", { status: 500 }) },
      { [OFFLINE_PATH]: () => antwort("{}", { headers: { "content-type": "application/json" } }) },
      { [LOGO]: () => antwort("fehlt", { status: 404 }) },
    ];
    for (const routes of kaputt) {
      const w = aufbau({ routes });
      await expect(w.lebenszyklus("install")).rejects.toThrow();
      expect(w.zustand.skipWaiting).toBe(0);
    }
    await expect(aufbau({ online: false }).lebenszyklus("install")).rejects.toThrow();
  });

  it("löscht beim Aktivieren die eigenen Caches älterer Versionen, fremde nie", async () => {
    const w = aufbau({
      version: "v2",
      vorhanden: {
        [`${CACHE_PREFIX}static-v1`]: ["/assets/alt.js"],
        [`${CACHE_PREFIX}offline-v1`]: [OFFLINE_PATH],
        "fremder-cache": ["/x"],
      },
    });
    await w.lebenszyklus("install");
    await w.lebenszyklus("activate");
    expect(w.namen()).toEqual(
      ["fremder-cache", `${CACHE_PREFIX}offline-v2`, `${CACHE_PREFIX}static-v2`].sort(),
    );
  });
});

describe("Service Worker: was er nie anfasst", () => {
  const PRIVAT = [
    "/api",
    "/api/chat",
    "/api/anfrage",
    "/.well-known/nexify-build.json",
    "/kundencenter",
    "/kundencenter/vorgaenge/7",
    "/kundenportal",
    "/konto",
    "/login",
    "/anmelden",
    "/registrieren",
    "/passwort-vergessen",
  ];

  it.each(PRIVAT)("%s beantwortet er in keinem Modus – auch offline nicht", async (pfad) => {
    const w = aufbau();
    await w.lebenszyklus("install");
    const vorher = w.abrufe.length;
    for (const mode of ["navigate", "cors", "same-origin", "no-cors"])
      expect(await w.anfrage(pfad, { mode })).toBeNull();
    w.zustand.online = false;
    expect(await w.anfrage(pfad)).toBeNull();
    expect(w.abrufe.length).toBe(vorher);
    expect(w.eintraege(STATIC)).toHaveLength(3);
  });

  it("lässt alles außer GET, fremde Ursprünge, Bereichsanfragen und Filme durch", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    for (const method of ["POST", "PUT", "DELETE", "HEAD"])
      expect(await w.anfrage("/kontakt", { method })).toBeNull();
    expect(await w.anfrage("/api/anfrage", { method: "POST", mode: "cors" })).toBeNull();
    expect(await w.anfrage("https://beispiel.example/assets/a.js", { mode: "cors" })).toBeNull();
    expect(
      await w.anfrage("/site-assets/8b4870140b46d3f8.mp4", {
        mode: "no-cors",
        headers: { range: "bytes=0-" },
      }),
    ).toBeNull();
    expect(await w.anfrage("/site-assets/8b4870140b46d3f8.mp4", { mode: "no-cors" })).toBeNull();
    // Dateien ohne Inhalts-Hash, Manifest, Worker-Skript und Daten bleiben beim Browser.
    for (const pfad of ["/manifest.webmanifest", "/sw.js", "/sitemap.xml", "/icons/icon-192.png"])
      expect(await w.anfrage(pfad, { mode: "no-cors" })).toBeNull();
  });
});

describe("Service Worker: Cache-Regeln", () => {
  it("kein Zwischenspeichern zur Laufzeit: Skripte, Stile und Bilder fasst der Worker nicht an", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    const vorher = w.abrufe.length;
    for (const pfad of [
      "/assets/index-abc123.js",
      "/assets/styles-abc123.css",
      "/site-assets/5c592a5dc791fcc3.webp",
      "/site-assets/9176c58a16ff634a-192.webp",
    ]) {
      for (const mode of ["no-cors", "cors", "same-origin"])
        expect(await w.anfrage(pfad, { mode }), pfad).toBeNull();
    }
    // Nichts abgerufen, nichts dazugekommen: es bleibt bei den drei Dateien der Offline-Seite.
    expect(w.abrufe.length).toBe(vorher);
    expect(w.eintraege(STATIC)).toEqual([LOGO, ...SCHRIFTEN].sort());
  });

  it("Dateien der Offline-Seite: zuerst das Netz, nur ohne Netz die gespeicherte Fassung", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    const vorher = w.abrufe.length;
    const online = await w.anfrage(LOGO, { mode: "no-cors" });
    expect(await online?.text()).toBe("datei " + LOGO);
    expect(w.abrufe.length).toBe(vorher + 1);
    w.zustand.online = false;
    const offline = await w.anfrage(LOGO, { mode: "no-cors" });
    expect(await offline?.text()).toBe("datei " + LOGO);
  });

  it("ein werfender Cache-Speicher blockiert keine Anfrage", async () => {
    for (const fehler of ["open", "match", "put"]) {
      const w = aufbau();
      await w.lebenszyklus("install");
      w.zustand.cacheFehler = fehler;
      // Seiten und die Dateien der Offline-Seite kommen weiter aus dem Netz.
      expect(await (await w.anfrage("/kontakt"))?.text(), fehler).toBe("seite /kontakt");
      expect(await (await w.anfrage(LOGO, { mode: "no-cors" }))?.text(), fehler).toBe(
        "datei " + LOGO,
      );
      expect(await w.anfrage("/assets/index-abc123.js", { mode: "no-cors" })).toBeNull();
      // Ohne Netz und ohne Speicher bleibt der schlichte Hinweis statt eines Absturzes.
      w.zustand.online = false;
      const seite = await w.anfrage("/kontakt");
      expect(seite?.status, fehler).toBe(503);
      expect(await seite?.text()).toContain("Sie sind offline.");
      // Die Datei meldet dann den Netzfehler – wie ohne Worker.
      if (fehler !== "put")
        await expect(w.anfrage(LOGO, { mode: "no-cors" })).rejects.toThrow("offline");
    }
  });

  it("die Dateien der Offline-Seite gibt es wirklich (Quelle und, falls gebaut, Auslieferung)", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const quelle = serviceWorkerScript("v1");
    const liste = /const OFFLINE_FILES = \[([^\]]+)\]/.exec(quelle)?.[1] ?? "";
    const dateien = [...liste.matchAll(/"([^"]+)"/g)].map((m) => m[1] ?? "");
    expect(dateien.sort()).toEqual([LOGO, ...SCHRIFTEN].sort());
    for (const datei of dateien) {
      expect(existsSync(join(process.cwd(), "public", datei)), datei).toBe(true);
      const gebaut = join(process.cwd(), ".output", "public");
      if (existsSync(gebaut)) expect(existsSync(join(gebaut, datei)), "Build: " + datei).toBe(true);
    }
  });

  it("Seiten kommen immer aus dem Netz und werden nie gespeichert", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    for (const pfad of ["/", "/kontakt", "/leistungen/websites", "/portale", "/gibt-es-nicht"]) {
      const response = await w.anfrage(pfad);
      expect(await response?.text()).toBe("seite " + pfad);
    }
    expect(w.eintraege(OFFLINE)).toEqual([OFFLINE_PATH]);
    expect(w.eintraege(STATIC)).toHaveLength(3);
    // Andere Abrufe derselben Adressen (Daten, Vorabladen) fasst der Worker nicht an.
    expect(await w.anfrage("/kontakt", { mode: "cors" })).toBeNull();
  });

  it("ohne Netz erscheint die Offline-Seite: 503, nicht speicherbar", async () => {
    const w = aufbau();
    await w.lebenszyklus("install");
    w.zustand.online = false;
    const response = await w.anfrage("/kontakt");
    expect(response?.status).toBe(503);
    expect(response?.headers.get("cache-control")).toBe("no-store");
    expect(await response?.text()).toContain("Sie sind offline.");
  });

  it("fehlt die gespeicherte Offline-Seite, bleibt ein schlichter Hinweis", async () => {
    const w = aufbau();
    w.zustand.online = false;
    const response = await w.anfrage("/kontakt");
    expect(response?.status).toBe(503);
    const html = (await response?.text()) ?? "";
    expect(html).toContain("Sie sind offline.");
    expect(html).toContain('name="robots" content="noindex"');
  });
});

describe("Rückbau: Abschalt-Worker", () => {
  it("löscht die eigenen Caches, entfernt die Registrierung und beantwortet nichts", async () => {
    const w = aufbau({
      quelle: ABSCHALT_WORKER,
      vorhanden: {
        [`${CACHE_PREFIX}static-v1`]: ["/assets/a.js"],
        [`${CACHE_PREFIX}offline-v1`]: [OFFLINE_PATH],
        "fremder-cache": ["/x"],
      },
    });
    expect(Object.keys(w.ereignisse).sort()).toEqual(["activate", "install"]);
    await w.lebenszyklus("install");
    expect(w.zustand.skipWaiting).toBe(1);
    await w.lebenszyklus("activate");
    expect(w.namen()).toEqual(["fremder-cache"]);
    expect(w.zustand.unregister).toBe(1);
    expect(w.abrufe).toHaveLength(0);
  });

  it("der Schalter entscheidet, welches Skript /sw.js liefert", async () => {
    expect(PWA_AKTIV).toBe(true);
    expect(pwaAbgeschaltet({})).toBe(false);
    expect(pwaAbgeschaltet({ PWA_ABSCHALTEN: "0" })).toBe(false);
    for (const wert of ["1", "true", "ja", " AN "])
      expect(pwaAbgeschaltet({ PWA_ABSCHALTEN: wert })).toBe(true);

    // Im ausgelieferten Worker kommen die Bindings über globalThis.__env__ (env ist dort leer).
    const global = globalThis as { __env__?: { PWA_ABSCHALTEN?: string } };
    global.__env__ = { PWA_ABSCHALTEN: "1" };
    expect(pwaAbgeschaltet(undefined)).toBe(true);
    expect(await serviceWorkerResponse(undefined).text()).toBe(ABSCHALT_WORKER);
    delete global.__env__;
    expect(pwaAbgeschaltet(undefined)).toBe(false);

    const aktiv = serviceWorkerResponse({});
    expect(await aktiv.text()).toContain('addEventListener("fetch"');
    const aus = serviceWorkerResponse({ PWA_ABSCHALTEN: "1" });
    const skript = await aus.text();
    expect(skript).toBe(ABSCHALT_WORKER);
    expect(skript).not.toContain('addEventListener("fetch"');
    // Build-Schalter aus: dasselbe Ergebnis ohne Worker-Variable.
    expect(await serviceWorkerResponse({}, false).text()).toBe(ABSCHALT_WORKER);
    for (const response of [aktiv, aus]) {
      expect(response.headers.get("cache-control")).toBe("no-cache");
      expect(response.headers.get("content-type")).toContain("text/javascript");
      expect(response.headers.get("service-worker-allowed")).toBeNull();
    }
  });
});

describe("Offline-Seite", () => {
  it("ist eine fertige Seite ohne Skripte, mit noindex und der Telefonnummer aus dem Impressum", async () => {
    const response = offlineResponse();
    expect(response.status).toBe(200);
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("cache-control")).toBe("no-cache");
    const html = await response.text();
    expect(html).toContain('<html lang="de">');
    expect(html).toContain('<meta name="robots" content="noindex" />');
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain("Sie sind offline.");
    expect(html).toContain("+31 6 133 188 56");
    expect(html).toContain('href="tel:+31613318856"');
    expect(html).not.toMatch(/<script/i);
    // Alles, was sie nachlädt, speichert der Worker beim Installieren mit.
    const dateien = [
      ...html.matchAll(/(?:src|url\()\s*=?\s*["(]?"?(\/site-assets\/[^")\s]+)/g),
    ].map((m) => m[1]);
    expect([...new Set(dateien)].sort()).toEqual([LOGO, ...SCHRIFTEN].sort());
  });
});
