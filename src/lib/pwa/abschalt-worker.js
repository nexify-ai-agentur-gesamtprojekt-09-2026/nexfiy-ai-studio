/* Abschalt-Worker der NeXify-Agenturseite. /sw.js liefert ihn statt des normalen Workers, sobald
   die Installation abgeschaltet ist (src/lib/pwa.ts). Der Browser holt /sw.js bei jedem
   Seitenaufruf neu, findet den geänderten Inhalt und führt ihn ohne Zutun des Besuchers aus:
   eigene Caches löschen, Registrierung entfernen. Kein fetch-Ereignis: er beantwortet nichts. */
const PREFIX = "nexify-pwa-";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key.startsWith(PREFIX)).map((key) => caches.delete(key))),
      )
      .then(() => self.registration.unregister()),
  );
});
