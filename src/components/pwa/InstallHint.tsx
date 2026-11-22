import { useEffect, useState } from "react";

import {
  hinweisGeschlossen,
  hinweisSchliessen,
  isIosSafari,
  runningStandalone,
  sichererSpeicher,
} from "@/lib/pwa-client";
import { PWA_AKTIV } from "@/lib/pwa-config";
import hintCSS from "../../styles/site-install.css?url";

/**
 * Dezenter Hinweis auf die installierbare Web-App, im Seitenfluss unter der Fußzeile: er liegt
 * über nichts und berührt das Chat-Panel nicht. Er erscheint nur, wenn der Browser die
 * Installation tatsächlich anbietet (`beforeinstallprompt`) oder auf iPhone/iPad in Safari, wo
 * der Weg über „Teilen" führt. Wer ihn schließt, sieht ihn auf diesem Gerät nicht wieder.
 * Es ist eine Web-App aus dem Browser, keine App aus einem App-Store – so steht es auch im Text.
 */

type InstallPromptEvent = Event & {
  prompt?: () => Promise<unknown>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
};

// Das Ereignis kann vor dem Einhängen der Komponente kommen; deshalb auf Modulebene merken.
let angebot: InstallPromptEvent | null = null;
const zuhoerer = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    angebot = event as InstallPromptEvent;
    for (const melden of zuhoerer) melden();
  });
  window.addEventListener("appinstalled", () => {
    angebot = null;
    for (const melden of zuhoerer) melden();
  });
}

export function InstallHint() {
  const [, neuZeichnen] = useState(0);
  const [bereit, setBereit] = useState(false);
  const [geschlossen, setGeschlossen] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setGeschlossen(
      hinweisGeschlossen(sichererSpeicher(() => window.localStorage)) ||
        runningStandalone({
          matchMedia: (query) => window.matchMedia(query),
          navigator: navigator as Navigator & { standalone?: boolean },
        }),
    );
    setIos(isIosSafari(navigator.userAgent, navigator.maxTouchPoints));
    setBereit(true);
    const melden = () => neuZeichnen((wert) => wert + 1);
    zuhoerer.add(melden);
    return () => {
      zuhoerer.delete(melden);
    };
  }, []);

  if (!PWA_AKTIV || !bereit || geschlossen || (!angebot && !ios)) return null;

  async function installieren() {
    const ereignis = angebot;
    angebot = null;
    try {
      await ereignis?.prompt?.();
      await ereignis?.userChoice;
    } catch {
      // Das Ergebnis gehört dem Browser und dem Besucher.
    }
    setGeschlossen(true);
  }

  function schliessen() {
    hinweisSchliessen(sichererSpeicher(() => window.localStorage));
    setGeschlossen(true);
  }

  return (
    <aside
      className="nx-install"
      aria-labelledby="nx-install-titel"
      data-modus={angebot ? "angebot" : "ios"}
    >
      <link rel="stylesheet" href={hintCSS} precedence="site-install" />
      <img
        className="nx-install-zeichen"
        src="/site-assets/9176c58a16ff634a-192.webp"
        alt=""
        width="40"
        height="40"
        decoding="async"
      />
      <div className="nx-install-text">
        <h2 id="nx-install-titel">NeXify AI als Web-App</h2>
        <p>
          {angebot
            ? "Legen Sie diese Website als Web-App auf Ihrem Gerät ab – sie startet dann wie eine App im eigenen Fenster."
            : "Auf iPhone und iPad: in Safari „Teilen“ antippen und „Zum Home-Bildschirm“ wählen."}{" "}
          <span>Eine Web-App aus dem Browser, keine App aus einem App-Store.</span>
        </p>
      </div>
      <div className="nx-install-aktionen">
        {angebot ? (
          <button type="button" className="nx-install-knopf is-haupt" onClick={installieren}>
            Installieren
          </button>
        ) : null}
        <button type="button" className="nx-install-knopf" onClick={schliessen}>
          {angebot ? "Nicht jetzt" : "Schließen"}
        </button>
      </div>
    </aside>
  );
}
