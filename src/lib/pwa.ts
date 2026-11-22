import abschaltWorker from "./pwa/abschalt-worker.js?raw";
import workerSource from "./pwa/service-worker.js?raw";
import { renderOfflinePage } from "./offline-page";
import { PWA_AKTIV } from "./pwa-config";

/**
 * Serverseite der installierbaren Web-App: die Antworten für `/sw.js` und `/offline`.
 * Reine Funktionen ohne Framework-Import, damit sie im Testlauf ohne Worker-Runtime prüfbar sind.
 */

declare const __NEXIFY_BUILD_ID__: string | undefined;

export const SW_VERSION_MARK = "__NEXIFY_SW_VERSION__";

/** Kennung des Builds (vite.config.ts); im Testlauf und im Dev-Server ein fester Platzhalter. */
export function buildId(): string {
  return typeof __NEXIFY_BUILD_ID__ === "string" && __NEXIFY_BUILD_ID__
    ? __NEXIFY_BUILD_ID__
    : "dev";
}

/** Worker-Quelltext mit eigenen Cache-Namen je Build: ein neuer Build ersetzt die alten Caches. */
export function serviceWorkerScript(version: string = buildId()): string {
  if (!workerSource.includes(SW_VERSION_MARK)) throw new Error("service worker version mark fehlt");
  return workerSource.replaceAll(SW_VERSION_MARK, version.replace(/[^A-Za-z0-9._-]/g, ""));
}

export const ABSCHALT_WORKER: string = abschaltWorker;

export type PwaBindings = { PWA_ABSCHALTEN?: string };

/**
 * Abgeschaltet per Build-Schalter oder per Worker-Variable (ohne neuen Build).
 * Im ausgelieferten Worker ist das `env`-Argument des Einstiegs leer; die Laufzeit legt die
 * Bindings als `globalThis.__env__` ab (gleiches Muster wie in anfrage-api.ts und chat-api.ts).
 */
export function pwaAbgeschaltet(env?: PwaBindings | null): boolean {
  const ausGlobal = (globalThis as { __env__?: PwaBindings }).__env__;
  const wert = String(env?.PWA_ABSCHALTEN ?? ausGlobal?.PWA_ABSCHALTEN ?? "")
    .trim()
    .toLowerCase();
  return !PWA_AKTIV || ["1", "true", "ja", "an", "on"].includes(wert);
}

/**
 * `/sw.js`: immer frisch geprüft (`no-cache`), damit eine neue Version oder der Abschalt-Worker
 * beim nächsten Seitenaufruf ankommt. Kein `Service-Worker-Allowed`: die Datei liegt in der
 * Wurzel, ihr größter Geltungsbereich ist ohnehin `/`.
 */
export function serviceWorkerResponse(
  env?: PwaBindings | null,
  aktiv = !pwaAbgeschaltet(env),
): Response {
  return new Response(aktiv ? serviceWorkerScript() : ABSCHALT_WORKER, {
    headers: {
      "content-type": "text/javascript; charset=utf-8",
      "cache-control": "no-cache",
      "x-robots-tag": "noindex",
    },
  });
}

/** `/offline`: fertige Seite ohne Skripte, nicht für den Suchindex. */
export function offlineResponse(): Response {
  return new Response(renderOfflinePage(), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
      "x-robots-tag": "noindex",
    },
  });
}
