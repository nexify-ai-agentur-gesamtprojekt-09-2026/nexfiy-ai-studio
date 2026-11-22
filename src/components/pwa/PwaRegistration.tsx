import { useEffect } from "react";

import { registerServiceWorker, retireServiceWorker } from "@/lib/pwa-client";
import { PWA_AKTIV } from "@/lib/pwa-config";

/**
 * Meldet den Service Worker an: nur im Produktions-Build, erst nach dem Laden der Seite und
 * nicht im Datensparmodus. Ist die Installation abgeschaltet (`PWA_AKTIV`), räumt derselbe
 * Aufruf eine frühere Registrierung samt Caches wieder ab. Rendert nichts.
 */
export function PwaRegistration() {
  useEffect(() => {
    if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
    if (!PWA_AKTIV) {
      void retireServiceWorker(
        navigator.serviceWorker,
        "caches" in window ? window.caches : undefined,
        window.location.origin,
      );
      return;
    }
    const verbindung = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (verbindung?.saveData === true) return;
    let warten = 0;
    const anmelden = () => {
      warten = window.setTimeout(() => void registerServiceWorker(navigator.serviceWorker), 1500);
    };
    if (document.readyState === "complete") anmelden();
    else window.addEventListener("load", anmelden, { once: true });
    return () => {
      window.removeEventListener("load", anmelden);
      window.clearTimeout(warten);
    };
  }, []);
  return null;
}
