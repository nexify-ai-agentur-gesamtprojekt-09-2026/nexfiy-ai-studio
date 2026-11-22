/* Service Worker der NeXify-Agenturseite, ausgeliefert unter /sw.js (src/server.ts).
   Klein und von Hand geschrieben; die Grenzen prüft src/lib/pwa.test.ts.

   Gespeichert wird nur zweierlei:
   1. Die Offline-Seite /offline samt Markenzeichen und Schriften (beim Installieren).
   2. Statische Dateien mit Inhalts-Hash im Namen (/assets/**, /site-assets/**), Cache-zuerst.

   Nie gespeichert und nie beantwortet: /api/**, Konto- und Kundencenter-Adressen,
   /.well-known/**, alles außer GET, fremde Ursprünge, Bereichsanfragen und Filme.
   Seiten (Navigation) kommen immer aus dem Netz; nur ohne Netz erscheint die Offline-Seite.
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
const STATIC_PREFIXES = ["/assets/", "/site-assets/"];
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
const isStatic = (path) =>
  !isPrivate(path) &&
  !path.endsWith(".mp4") &&
  STATIC_PREFIXES.some((prefix) => path.startsWith(prefix));

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

async function cacheFirst(request) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(request.url, { ignoreVary: true });
  if (hit) return hit;
  const response = await fetch(request);
  if (storable(response)) await cache.put(request.url, response.clone());
  return response;
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
  const cache = await caches.open(OFFLINE);
  const page = await cache.match(OFFLINE_URL);
  if (!page) return plainNotice();
  return new Response(page.body, {
    status: 503,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
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
  if (isStatic(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (request.mode !== "navigate") return;
  event.respondWith(fetch(request).catch(() => offlineNotice()));
});
