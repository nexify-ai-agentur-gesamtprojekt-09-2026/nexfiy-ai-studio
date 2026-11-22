import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import chatCSS from "../../styles/site-chat.css?url";
import {
  CHAT_FEHLERTEXT,
  CHAT_MAX_ZEICHEN,
  CHAT_WIEDERHOLBAR,
  chat,
  useChat,
  type ChatEintrag,
} from "@/lib/chat-client";
import {
  CHAT_EINGABE_ID,
  CHAT_EINSTIEGE,
  CHAT_PANEL_ID,
  CHAT_VORLIEBE_SKRIPT,
  type ChatDockZustand,
} from "@/lib/chat-dock";
import { ChatText } from "./ChatText";

/** Kleines WebP wie in Kopf und Fuß (192 px); das 152-kB-PNG wird hier nicht geladen. */
const AVATAR = "/site-assets/9176c58a16ff634a-192.webp";

function abonniereNetz(melde: () => void) {
  window.addEventListener("online", melde);
  window.addEventListener("offline", melde);
  return () => {
    window.removeEventListener("online", melde);
    window.removeEventListener("offline", melde);
  };
}

function Symbol({ pfad, groesse = 20 }: { pfad: string; groesse?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={groesse}
      height={groesse}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={pfad} />
    </svg>
  );
}

const PFEIL = "M5 12h14m-6-6 6 6-6 6";
const KREUZ = "M6 6l12 12M18 6 6 18";
const EINKLAPPEN = "M9 6l6 6-6 6";
const NEU = "M12 5v14M5 12h14";
const STOPP = "M7 7h10v10H7z";

function Hinweis() {
  return (
    <div className="nxc-hinweis">
      <span className="nxc-marke">KI</span>
      <p>
        Sie schreiben mit einem <strong>KI-Assistenten</strong>, nicht mit einem Menschen. Antworten
        können fehlerhaft sein und sind keine verbindliche Zusage. Ihre Nachrichten werden zur
        Beantwortung an einen KI-Dienst übermittelt und gespeichert – bitte keine sensiblen Daten
        eingeben. <a href="/ki-hinweise">KI-Hinweise</a> · <a href="/datenschutz">Datenschutz</a>
      </p>
    </div>
  );
}

function Eintrag({
  eintrag,
  letzter,
  beschaeftigt,
}: {
  eintrag: ChatEintrag;
  letzter: boolean;
  beschaeftigt: boolean;
}) {
  if (eintrag.rolle === "user") {
    return (
      <li className="nxc-n nxc-n-user">
        <span className="nxc-sr">Sie: </span>
        <p>{eintrag.text}</p>
      </li>
    );
  }
  const wartet = eintrag.status === "laeuft" && !eintrag.text;
  const unvollstaendig = eintrag.status === "abgebrochen";
  // Ohne Text gibt es keine Antwort zu zeigen: dann steht nur die Meldung, nicht die Antwortkarte.
  const ohneAntwort = eintrag.status === "fehler" || (unvollstaendig && !eintrag.text);
  const wiederholbar =
    letzter && !beschaeftigt && (!eintrag.fehler || CHAT_WIEDERHOLBAR.has(eintrag.fehler));
  return (
    <li
      className={ohneAntwort ? "nxc-n nxc-n-stoerung" : "nxc-n nxc-n-ki"}
      data-status={eintrag.status}
    >
      {!ohneAntwort && (
        <p className="nxc-absender">
          AIFly ORACLE <span>· KI-Antwort</span>
        </p>
      )}
      {wartet && (
        <p className="nxc-wartet">
          <span className="nxc-punkte" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          Antwort wird erstellt …
        </p>
      )}
      {eintrag.text && (
        <div className="nxc-text">
          <ChatText text={eintrag.text} />
        </div>
      )}
      {(ohneAntwort || unvollstaendig) && (
        <div className="nxc-stoerung">
          <p>
            {unvollstaendig && (
              <strong>
                {eintrag.text
                  ? "Die Antwort ist unvollständig. "
                  : "Die Antwort wurde abgebrochen. "}
              </strong>
            )}
            {eintrag.fehler ? CHAT_FEHLERTEXT[eintrag.fehler] : null}{" "}
            {ohneAntwort && "Ihre Frage erreicht uns auch direkt über das Kontaktformular."}
          </p>
          <div className="nxc-aktionen">
            {wiederholbar && (
              <button type="button" className="nxc-knopf" onClick={() => chat.wiederhole()}>
                Erneut senden
              </button>
            )}
            {letzter && eintrag.fehler === "limit_sitzung" && (
              <button type="button" className="nxc-knopf" onClick={() => chat.leere()}>
                Neues Gespräch
              </button>
            )}
            <a className="nxc-knopf nxc-knopf-leise" href="/kontakt">
              Zum Kontaktformular
            </a>
          </div>
        </div>
      )}
    </li>
  );
}

export function ChatDock({ dock }: { dock: ChatDockZustand }) {
  const { offen, breit, oeffne, schliesse, ausloeser } = dock;
  const { eintraege, beschaeftigt, aktiv } = useChat();
  const online = useSyncExternalStore(
    abonniereNetz,
    () => navigator.onLine !== false,
    () => true,
  );
  const [entwurf, setEntwurf] = useState("");
  const [ansage, setAnsage] = useState("");
  const panel = useRef<HTMLElement>(null);
  const verlauf = useRef<HTMLDivElement>(null);
  const eingabe = useRef<HTMLTextAreaElement>(null);
  const amEnde = useRef(true);
  const dialog = offen === true && breit === false;
  const letzter = eintraege.at(-1);

  // Schalterzustand erst abfragen, wenn das Panel wirklich offen ist.
  useEffect(() => {
    if (offen) void chat.pruefeZustand();
  }, [offen]);

  // Dialog: Seite dahinter stilllegen, Hintergrund nicht mitrollen, Höhe an die Bildschirmtastatur anpassen.
  useEffect(() => {
    if (!dialog) return;
    const seite = document.querySelector<HTMLElement>("#atelier > .website");
    seite?.setAttribute("inert", "");
    document.documentElement.classList.add("nxc-gesperrt");
    const sicht = window.visualViewport;
    const passeAn = () => {
      if (!sicht || !panel.current) return;
      panel.current.style.setProperty("--nxc-sicht-hoehe", `${Math.round(sicht.height)}px`);
      panel.current.style.setProperty("--nxc-sicht-oben", `${Math.round(sicht.offsetTop)}px`);
    };
    passeAn();
    sicht?.addEventListener("resize", passeAn);
    sicht?.addEventListener("scroll", passeAn);
    const element = panel.current;
    return () => {
      seite?.removeAttribute("inert");
      document.documentElement.classList.remove("nxc-gesperrt");
      sicht?.removeEventListener("resize", passeAn);
      sicht?.removeEventListener("scroll", passeAn);
      element?.style.removeProperty("--nxc-sicht-hoehe");
      element?.style.removeProperty("--nxc-sicht-oben");
    };
  }, [dialog]);

  // Escape schließt nur den Dialog. Die angedockte Spalte ist kein Dialog: dort klappt Escape
  // (etwa beim Tippen im Eingabefeld) nichts ein.
  useEffect(() => {
    if (!dialog) return;
    const beiTaste = (ereignis: KeyboardEvent) => {
      if (ereignis.key !== "Escape") return;
      if (document.querySelector(".site-header details[open]")) return;
      schliesse();
    };
    window.addEventListener("keydown", beiTaste);
    return () => window.removeEventListener("keydown", beiTaste);
  }, [dialog, schliesse]);

  // Fokusfalle nur im Dialog.
  const beiPanelTaste = (ereignis: ReactKeyboardEvent<HTMLElement>) => {
    if (!dialog || ereignis.key !== "Tab" || !panel.current) return;
    const ziele = Array.from(
      panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      ),
    ).filter((element) => element.offsetParent !== null || element === document.activeElement);
    const erstes = ziele[0];
    const letztes = ziele.at(-1);
    if (!erstes || !letztes) return;
    const fokus = document.activeElement;
    if (ereignis.shiftKey && (fokus === erstes || fokus === panel.current)) {
      ereignis.preventDefault();
      letztes.focus();
    } else if (!ereignis.shiftKey && fokus === letztes) {
      ereignis.preventDefault();
      erstes.focus();
    }
  };

  // Eingabefeld wächst mit dem Text bis zur Obergrenze aus dem Stylesheet.
  useLayoutEffect(() => {
    const feld = eingabe.current;
    if (!feld) return;
    feld.style.height = "auto";
    feld.style.height = `${feld.scrollHeight}px`;
  }, [entwurf, offen]);

  // Dem Gespräch folgen, solange der Besucher nicht selbst nach oben gerollt hat.
  useLayoutEffect(() => {
    const liste = verlauf.current;
    if (!liste) return;
    // Leeres Gespräch: oben beginnen, damit der KI-Hinweis als Erstes zu sehen ist.
    if (eintraege.length === 0) liste.scrollTop = 0;
    else if (amEnde.current) liste.scrollTop = liste.scrollHeight;
  }, [eintraege, offen]);

  // Ansage für Screenreader: Beginn, fertige Antwort oder Störung – nicht jedes Textstück.
  const letzterStatus = letzter ? `${letzter.id}:${letzter.status}` : "";
  useEffect(() => {
    if (!letzter || letzter.rolle !== "assistant") return;
    if (letzter.status === "laeuft") setAnsage("Frage gesendet. Die Antwort wird erstellt.");
    else if (letzter.status === "fertig") setAnsage(`Antwort des KI-Assistenten: ${letzter.text}`);
    else if (letzter.fehler) setAnsage(CHAT_FEHLERTEXT[letzter.fehler]);
    else setAnsage("Die Antwort wurde abgebrochen.");
    // Nur der Statuswechsel zählt, nicht jedes eintreffende Textstück.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letzterStatus]);

  const sende = (text: string) => {
    amEnde.current = true;
    if (chat.sende(text)) setEntwurf("");
  };
  const beiAbsenden = (ereignis: FormEvent) => {
    ereignis.preventDefault();
    if (beschaeftigt) return;
    sende(entwurf);
  };
  const beiEingabeTaste = (ereignis: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (ereignis.key !== "Enter" || ereignis.shiftKey || ereignis.nativeEvent.isComposing) return;
    ereignis.preventDefault();
    if (!beschaeftigt) sende(entwurf);
  };

  const abgeschaltet = aktiv === false;
  const leer = eintraege.length === 0;
  const kannSenden = entwurf.trim().length >= 2 && !beschaeftigt && online;

  return (
    <>
      <link rel="stylesheet" href={chatCSS} precedence="site-chat" />
      <script dangerouslySetInnerHTML={{ __html: CHAT_VORLIEBE_SKRIPT }} />
      {offen !== true && (
        <button
          ref={ausloeser}
          type="button"
          id="nexify-chat-ausloeser"
          className="nxc-ausloeser"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls={CHAT_PANEL_ID}
          onClick={oeffne}
        >
          <span className="nxc-ausloeser-bild" aria-hidden="true">
            <img src={AVATAR} alt="" width="40" height="40" decoding="async" />
          </span>
          <span className="nxc-ausloeser-text">
            <strong>Frage stellen</strong>
            <small>KI-Assistent</small>
          </span>
          <span className="nxc-sr"> öffnen</span>
        </button>
      )}
      {dialog && <div className="nxc-schleier" onClick={schliesse} aria-hidden="true" />}
      <aside
        ref={panel}
        id={CHAT_PANEL_ID}
        className="nxc"
        hidden={offen === false}
        role={dialog ? "dialog" : "complementary"}
        aria-modal={dialog ? true : undefined}
        aria-labelledby="nexify-chat-titel"
        tabIndex={-1}
        onKeyDown={beiPanelTaste}
      >
        <header className="nxc-kopf">
          <span className="nxc-avatar" aria-hidden="true">
            <img src={AVATAR} alt="" width="44" height="44" decoding="async" />
          </span>
          <div className="nxc-kopf-text">
            <h2 id="nexify-chat-titel">AIFly ORACLE</h2>
            <p>
              <span className="nxc-marke">KI</span> Assistent von NeXify AI
            </p>
          </div>
          {!leer && (
            <button
              type="button"
              className="nxc-rund"
              aria-label="Neues Gespräch beginnen und Verlauf in diesem Tab leeren"
              title="Neues Gespräch"
              onClick={() => {
                chat.leere();
                eingabe.current?.focus();
              }}
            >
              <Symbol pfad={NEU} />
            </button>
          )}
          <button
            type="button"
            className="nxc-rund"
            aria-label="Chat schließen"
            title="Chat schließen"
            onClick={schliesse}
          >
            <span className="nxc-nur-dialog">
              <Symbol pfad={KREUZ} />
            </span>
            <span className="nxc-nur-spalte">
              <Symbol pfad={EINKLAPPEN} />
            </span>
          </button>
        </header>

        <div
          ref={verlauf}
          className="nxc-verlauf"
          tabIndex={0}
          role="group"
          aria-label="Gesprächsverlauf"
          onScroll={(ereignis) => {
            const liste = ereignis.currentTarget;
            amEnde.current = liste.scrollHeight - liste.scrollTop - liste.clientHeight < 48;
          }}
        >
          {/* Abgeschaltet wird nichts übermittelt: dann steht hier auch kein Hinweis darauf. */}
          {!abgeschaltet && <Hinweis />}
          {leer && !abgeschaltet && (
            <div className="nxc-start">
              <h3>Womit kann ich Ihnen weiterhelfen?</h3>
              <p>
                Orientierung zu Leistungen, Paketen und Ablauf bei NeXify AI. Verbindliches klärt
                Pascal Courbois persönlich.
              </p>
              <ul className="nxc-einstiege" aria-label="Einstiegsfragen">
                {CHAT_EINSTIEGE.map((frage) => (
                  <li key={frage}>
                    <button
                      type="button"
                      disabled={beschaeftigt || !online}
                      onClick={() => sende(frage)}
                    >
                      <span>{frage}</span>
                      <Symbol pfad={PFEIL} groesse={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!leer && (
            <ol className="nxc-liste" aria-busy={beschaeftigt}>
              {eintraege.map((eintrag, index) => (
                <Eintrag
                  key={eintrag.id}
                  eintrag={eintrag}
                  letzter={index === eintraege.length - 1}
                  beschaeftigt={beschaeftigt}
                />
              ))}
            </ol>
          )}
        </div>

        <div className="nxc-fuss">
          {!online && (
            <p className="nxc-band" role="status">
              Sie sind offline. Senden ist erst wieder mit Verbindung möglich.
            </p>
          )}
          {abgeschaltet ? (
            <div className="nxc-aus" role="status">
              <p>
                <strong>Der Assistent ist derzeit nicht verfügbar.</strong> Ihre Frage erreicht uns
                direkt über das Kontaktformular.
              </p>
              <a className="nxc-knopf" href="/kontakt">
                Zum Kontaktformular
              </a>
            </div>
          ) : (
            <form className="nxc-eingabe" onSubmit={beiAbsenden}>
              <label className="nxc-sr" htmlFor={CHAT_EINGABE_ID}>
                Ihre Frage an den KI-Assistenten
              </label>
              <textarea
                ref={eingabe}
                id={CHAT_EINGABE_ID}
                rows={1}
                maxLength={CHAT_MAX_ZEICHEN}
                placeholder="Ihre Frage …"
                value={entwurf}
                enterKeyHint="send"
                aria-describedby="nexify-chat-tasten"
                onChange={(ereignis) => setEntwurf(ereignis.target.value)}
                onKeyDown={beiEingabeTaste}
              />
              {beschaeftigt ? (
                <button
                  type="button"
                  className="nxc-senden nxc-stopp"
                  aria-label="Antwort abbrechen"
                  title="Antwort abbrechen"
                  onClick={() => chat.stoppe()}
                >
                  <Symbol pfad={STOPP} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="nxc-senden"
                  aria-label="Frage senden"
                  title="Frage senden"
                  disabled={!kannSenden}
                >
                  <Symbol pfad={PFEIL} />
                </button>
              )}
              <span id="nexify-chat-tasten" className="nxc-sr">
                Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.
              </span>
              {entwurf.length > CHAT_MAX_ZEICHEN - 300 && (
                <span className="nxc-zaehler" aria-live="polite">
                  {entwurf.length}/{CHAT_MAX_ZEICHEN}
                </span>
              )}
            </form>
          )}
          {!abgeschaltet && (
            <p className="nxc-recht">
              KI-Antworten können Fehler enthalten und sind unverbindlich. Keine sensiblen Daten
              eingeben. <a href="/ki-hinweise">KI-Hinweise</a> ·{" "}
              <a href="/datenschutz">Datenschutz</a> · <a href="/kontakt">Kontakt</a>
            </p>
          )}
        </div>
        <p className="nxc-sr" role="status" aria-live="polite">
          {ansage}
        </p>
      </aside>
    </>
  );
}
