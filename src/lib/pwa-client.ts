import { CACHE_PREFIX, SW_PATH } from "./pwa-config";

/**
 * Browserseite der installierbaren Web-App: Anmelden und Rückbau des Service Workers sowie die
 * Erkennung, ob ein Installationshinweis sinnvoll ist. Ohne React, damit die Regeln einzeln
 * prüfbar sind (src/lib/pwa-client.test.ts). Nichts hiervon setzt Cookies oder Kennungen.
 */

type WorkerLike = { scriptURL: string };
type RegistrationLike = {
  active?: WorkerLike | null;
  waiting?: WorkerLike | null;
  installing?: WorkerLike | null;
  unregister: () => Promise<boolean>;
};
export type ServiceWorkerHost = {
  register: (url: string, options?: { scope?: string }) => Promise<unknown>;
  getRegistrations: () => Promise<readonly RegistrationLike[]>;
};
export type CacheHost = {
  keys: () => Promise<string[]>;
  delete: (key: string) => Promise<boolean>;
};

/** Meldet den Worker für die ganze Website an. Fehler bleiben folgenlos: die Seite läuft ohne ihn. */
export async function registerServiceWorker(host: ServiceWorkerHost | undefined): Promise<boolean> {
  if (!host) return false;
  try {
    await host.register(SW_PATH, { scope: "/" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Rückbau: entfernt nur die eigene Registrierung (Skript `/sw.js`) und nur die eigenen Caches.
 * Läuft bei abgeschalteter Installation bei jedem Seitenaufruf und ist ohne Fund wirkungslos.
 */
export async function retireServiceWorker(
  host: ServiceWorkerHost | undefined,
  caches: CacheHost | undefined,
  origin: string,
): Promise<{ registrations: number; caches: number }> {
  const ergebnis = { registrations: 0, caches: 0 };
  try {
    for (const registration of (await host?.getRegistrations()) ?? []) {
      const worker = registration.active ?? registration.waiting ?? registration.installing;
      if (!worker) continue;
      const url = new URL(worker.scriptURL, origin);
      if (url.origin === origin && url.pathname === SW_PATH && (await registration.unregister()))
        ergebnis.registrations += 1;
    }
    for (const key of (await caches?.keys()) ?? [])
      if (key.startsWith(CACHE_PREFIX) && (await caches?.delete(key))) ergebnis.caches += 1;
  } catch {
    // Ohne Zugriff bleibt alles, wie es ist.
  }
  return ergebnis;
}

/** Läuft die Seite schon als installierte Web-App (eigenes Fenster bzw. Home-Bildschirm)? */
export function runningStandalone(env: {
  matchMedia?: (query: string) => { matches: boolean };
  navigator?: { standalone?: boolean };
}): boolean {
  try {
    if (env.matchMedia?.("(display-mode: standalone)").matches) return true;
    return env.navigator?.standalone === true;
  } catch {
    return false;
  }
}

/** Safari auf iPhone/iPad kennt kein `beforeinstallprompt`; dort führt der Weg über „Teilen". */
export function isIosSafari(userAgent: string, maxTouchPoints = 0): boolean {
  const ios =
    /iphone|ipad|ipod/i.test(userAgent) || (/macintosh/i.test(userAgent) && maxTouchPoints > 1);
  const andereEngine = /crios|fxios|edgios|opios|android/i.test(userAgent);
  return ios && /safari/i.test(userAgent) && !andereEngine;
}

/** Merkt die Ablehnung nur auf dem Gerät; kein Wert verlässt den Browser. */
export const HINWEIS_SCHLUESSEL = "nexify-install-hinweis-geschlossen";

/**
 * Holt den Gerätespeicher, ohne zu werfen. Bei gesperrter Datenspeicherung wirft schon der
 * Zugriff auf `window.localStorage` einen SecurityError; dann gibt es schlicht keinen Speicher.
 */
export function sichererSpeicher<T>(holen: () => T): T | undefined {
  try {
    return holen() ?? undefined;
  } catch {
    return undefined;
  }
}

export function hinweisGeschlossen(storage: Pick<Storage, "getItem"> | undefined): boolean {
  try {
    return storage?.getItem(HINWEIS_SCHLUESSEL) === "1";
  } catch {
    return false;
  }
}

export function hinweisSchliessen(storage: Pick<Storage, "setItem"> | undefined): void {
  try {
    storage?.setItem(HINWEIS_SCHLUESSEL, "1");
  } catch {
    // Ohne Speicher gilt die Ablehnung für diesen Seitenaufruf.
  }
}
