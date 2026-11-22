/**
 * Schalter und feste Adressen der installierbaren Web-App. Ohne weitere Importe, damit Browser-
 * und Servercode dieselben Werte lesen, ohne dass der Worker-Quelltext im Seitenbündel landet.
 *
 * Rückbau: `PWA_AKTIV` auf `false` setzen und ausliefern. Dann liefert `/sw.js` den
 * Abschalt-Worker (löscht die eigenen Caches und entfernt die Registrierung), und die Seite
 * registriert nichts mehr, sondern räumt beim nächsten Aufruf selbst auf. Ohne neuen Build geht
 * dasselbe über die Worker-Variable `PWA_ABSCHALTEN=1` (siehe docs/pwa-seo-geo.md).
 */
export const PWA_AKTIV = true;
export const SW_PATH = "/sw.js";
export const OFFLINE_PATH = "/offline";
export const MANIFEST_PATH = "/manifest.webmanifest";
/** Alle Caches des Workers beginnen so; nur diese werden beim Rückbau gelöscht. */
export const CACHE_PREFIX = "nexify-pwa-";
