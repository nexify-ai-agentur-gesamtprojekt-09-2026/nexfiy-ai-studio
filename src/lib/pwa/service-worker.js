/* Service Worker der NeXify-Agenturseite, ausgeliefert unter /sw.js (src/server.ts).
   Klein und von Hand geschrieben; die Grenzen prüft src/lib/pwa.test.ts.

   Gespeichert wird nur eines: die Offline-Seite /offline samt Markenzeichen und Schriften,
   einmal beim Installieren. Es gibt kein Zwischenspeichern zur Laufzeit.

   Beantwortet wird nur zweierlei, beides zuerst aus dem Netz:
   1. Seitenaufrufe (Navigation); nur ohne Netz erscheint die Offline-Seite.
   2. Die drei Dateien der Offline-Seite; nur ohne Netz kommen sie aus dem Speicher.
   Alles andere – Skripte, Stile, Bilder, Filme, /api/**, Konto- und Kundencenter-Adressen,
   /.well-known/**, alles außer GET, fremde Ursprünge, Bereichsanfragen – fasst der Worker nicht
   an. Ein Fehler im Cache-Speicher kann deshalb nie eine Antwort aus dem Netz verhindern.
   Keine Push-Benachrichtigungen, keine Hintergrund-Synchronisierung, keine Nachrichten. */
const VERSION = "__NEXIFY_SW_VERSION__";
const PREFIX = "nexify-pwa-";
const STATIC = PREFIX + "static-" + VERSION;
const OFFLINE = PREFIX + "offline-" + VERSION;
const OFFLINE_URL = "/offline";
// Was die Offline-Seite zum Aufbau braucht: Markenzeichen und die beiden Schriften.
const OFFLINE_FILES = [
  "/site-assets/9176c58a16ff634a.png",
  "/site-assets/0848630eef4b593d.woff2",
  "/site-assets/f7f6e92afae6f3df.woff2",
];
// Adressen mit Anmeldung, Konto oder Schnittstelle. Der Worker beantwortet sie nicht einmal.
const PRIVATE_PREFIXES = [
  "/api",
  "/.well-known",
  "/kundencenter",
  "/kundenportal",
  "/konto",
  "/login",
  "/anmelden",
  "/registrieren",
  "/passwort-vergessen",
];

const under = (path, prefix) => path === prefix || path.startsWith(prefix + "/");
const isPrivate = (path) => PRIVATE_PREFIXES.some((prefix) => under(path, prefix));
// Nur vollständige, eigene, nicht umgeleitete 200-Antworten ohne no-store/private.
function storable(response) {
  if (!response || response.status !== 200 || response.type !== "basic" || response.redirected)
    return false;
  const control = (response.headers.get("cache-control") || "").toLowerCase();
  return !/\b(?:no-store|private)\b/.test(control);
}

// Beim Installieren: Offline-Seite und ihre Dateien, ohne Cookies. Schlägt etwas fehl, wird der
// Worker nicht installiert; es bleibt dann beim bisherigen Stand.
async function precache() {
  const page = await fetch(OFFLINE_URL, {
    credentials: "omit",
    cache: "no-store",
    redirect: "error",
  });
  const type = page.headers.get("content-type") || "";
  if (page.status !== 200 || !type.includes("text/html"))
    throw new Error("offline page unavailable");
  const html = await page.text();
  const offline = await caches.open(OFFLINE);
  await offline.put(
    OFFLINE_URL,
    new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } }),
  );
  const assets = await caches.open(STATIC);
  await Promise.all(
    OFFLINE_FILES.map(async (path) => {
      const response = await fetch(path, { credentials: "omit" });
      if (!storable(response)) throw new Error("static file unavailable");
      await assets.put(path, response);
    }),
  );
}

// Eine Datei der Offline-Seite: immer zuerst das Netz. Nur wenn das Netz fehlt, kommt die beim
// Installieren gespeicherte Fassung; fehlt auch sie oder streikt der Speicher, bleibt der
// ursprüngliche Netzfehler stehen.
async function offlineFile(request, path) {
  try {
    return await fetch(request);
  } catch (netzfehler) {
    try {
      const cache = await caches.open(STATIC);
      const hit = await cache.match(path);
      if (hit) return hit;
    } catch {
      // Speicher nicht erreichbar: es bleibt beim Netzfehler.
    }
    throw netzfehler;
  }
}

// Rückfall, falls die gespeicherte Offline-Seite fehlt. Nur fester Text.
function plainNotice() {
  const html =
    '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Sie sind offline · NeXify AI</title></head><body><h1>Sie sind offline.</h1><p>Diese Seite ist ohne Internetverbindung nicht erreichbar.</p><p><a href="">Erneut versuchen</a></p></body></html>';
  return new Response(html, {
    status: 503,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

// 503, damit nichts die Offline-Seite für die angefragte Seite hält; nie zwischenspeichern.
async function offlineNotice() {
  try {
    const cache = await caches.open(OFFLINE);
    const page = await cache.match(OFFLINE_URL);
    if (page)
      return new Response(page.body, {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
      });
  } catch {
    // Speicher nicht erreichbar: der schlichte Hinweis genügt.
  }
  return plainNotice();
}

// Eine neue Version wartet nicht auf das Schließen aller Fenster: Seiten kommen ohnehin immer
// aus dem Netz, der Worker hält keine Fassung einer Seite fest.
self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

// Eigene Caches früherer Versionen entfernen, fremde nie.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(PREFIX) && key !== STATIC && key !== OFFLINE)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (
    url.origin !== self.location.origin ||
    isPrivate(url.pathname) ||
    request.headers.has("range")
  )
    return;
  if (OFFLINE_FILES.includes(url.pathname)) {
    event.respondWith(offlineFile(request, url.pathname));
    return;
  }
  if (request.mode !== "navigate") return;
  event.respondWith(fetch(request).catch(() => offlineNotice()));
});
