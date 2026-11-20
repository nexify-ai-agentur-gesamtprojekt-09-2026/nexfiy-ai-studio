import type { CSSProperties } from "react";
import { fitComposer, useComposerFit } from "@/lib/imported-site";

/** AIFly ORACLE side panel of the NeXify pages (desktop column, phone dialog). */
export function OracleAside({
  open,
  isMobile,
  viewportHeight,
  onClose,
}: {
  open: boolean;
  isMobile: boolean;
  viewportHeight: number | null;
  onClose: () => void;
}) {
  const composerRef = useComposerFit(open, isMobile, viewportHeight);
  return (
    <aside
      id="aifly-panel"
      className={"aifly-panel"}
      aria-label="AIFly ORACLE"
      role={isMobile ? "dialog" : undefined}
      hidden={!open}
      style={
        isMobile || viewportHeight === null
          ? undefined
          : ({
              "--chat-viewport-height": viewportHeight + "px",
              "--chat-viewport-top": "0px",
            } as CSSProperties)
      }
    >
      <div
        className={"chat-resize-handle"}
        role="separator"
        aria-orientation="vertical"
        aria-label="Chatbreite anpassen"
        tabIndex={0}
        aria-valuemin={360}
        aria-valuemax={952}
        aria-valuenow={360}
      />
      <div className={"panel-heading"}>
        <div className={"panel-heading-copy"}>
          <div className={"panel-identity"}>
            <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
              <img
                src="/site-assets/9176c58a16ff634a.png"
                alt=""
                width="34"
                height="34"
                decoding="async"
              />
            </span>
            <h2 className={"nx-oracle-name panel-brandline"}>
              <strong>AIFly ORACLE</strong>{" "}
              <span className={"panel-identity-subtitle"}>
                with NeXify AI Intelligence by NeXify
              </span>
            </h2>
          </div>
        </div>
        <button
          aria-label="Beratung einklappen"
          title="Beratung einklappen"
          type="button"
          className={"nexify-control icon-button panel-minimize"}
          data-variant="icon"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={"sdk-orientation-view"}>
        <section
          className={"public-orientation"}
          aria-label="Was planen Sie?"
          style={{ "--ca-fuss": "128px" } as CSSProperties}
        >
          <div className={"orientation-content"}>
            <div className={"orientation-intro"}>
              <div className={"orientation-host"}>
                <span className={"orientation-host-figure"} aria-hidden="true">
                  <img
                    src="/site-assets/9176c58a16ff634a.png"
                    alt=""
                    width="512"
                    height="512"
                    decoding="async"
                  />
                </span>
                <p className={"nx-oracle-name orientation-host-name"}>
                  <strong>AIFly ORACLE</strong>{" "}
                  <span className={"panel-identity-subtitle"}>
                    with NeXify AI Intelligence by NeXify
                  </span>
                </p>
              </div>
              <h3>Was planen Sie?</h3>
              <p className={"orientation-intro-body"}>
                Erzählen Sie mir von Ihrem Unternehmen und Ihrem Vorhaben. Ich helfe Ihnen, passende
                Leistungen zu finden und Ihr Gespräch mit Pascal vorzubereiten.
              </p>
            </div>
            <div
              className={"orientation-history"}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-busy="false"
            />
            <div
              className={"orientation-starters"}
              role="group"
              aria-label="Wobei können wir Ihnen helfen?"
            >
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">
                  01
                </span>
                <span className={"orientation-starter-copy"}>
                  <strong>Marke &amp; Web</strong>
                  <small>Auftritt, Website oder Shop gestalten.</small>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">
                  02
                </span>
                <span className={"orientation-starter-copy"}>
                  <strong>Systeme &amp; KI</strong>
                  <small>Abläufe verbinden und Arbeit erleichtern.</small>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">
                  03
                </span>
                <span className={"orientation-starter-copy"}>
                  <strong>Ads &amp; Marketing</strong>
                  <small>Menschen erreichen und Nachfrage gewinnen.</small>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
            <ol
              className={"orientation-path orientation-path-quiet"}
              aria-label="Aus einer Idee wird ein klarer nächster Schritt."
            >
              <li data-state="open">
                <small>01</small>Vorhaben einordnen
              </li>
              <li data-state="open">
                <small>02</small>Passenden Weg finden
              </li>
              <li data-state="open">
                <small>03</small>Persönlich vertiefen
              </li>
            </ol>
          </div>
          {/* 2026-11-20 21:45 (Europe/Berlin): KI-Offenlegung nach Art. 50 KI-VO ergaenzt — Panel war ohne Hinweis auf KI-Interaktion ausgeliefert (Befund B-159, Ebene B). Bestehende Klasse connection-note, keine Gestaltungsaenderung. */}
          <p className={"connection-note"}>
            Sie schreiben hier mit einem KI-Assistenten (NeX); Antworten werden maschinell erzeugt.
          </p>
          <form onSubmit={(event) => event.preventDefault()} className={"orientation-composer"}>
            <label htmlFor="orientation-message">Wobei können wir Ihnen helfen?</label>
            <textarea
              ref={composerRef}
              onInput={(event) => fitComposer(event.currentTarget)}
              id="orientation-message"
              maxLength={1000}
              rows={1}
              placeholder="Wobei können wir Ihnen helfen?"
              aria-describedby="orientation-keys"
              required
              enterKeyHint="send"
            />
            <span id="orientation-keys" className={"visually-hidden"}>
              Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.
            </span>
            <div className={"orientation-composer-actions"}>
              <button className={"primary-button"} disabled aria-label="Nachricht senden">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
          <p className={"connection-note orientation-status"} role="status" />
          <p className={"connection-note"}>
            Bitte keine Passwörter oder Zahlungsdaten eingeben.{" "}
            <a href="/datenschutz">Datenschutz</a>
          </p>
        </section>
      </div>
    </aside>
  );
}
