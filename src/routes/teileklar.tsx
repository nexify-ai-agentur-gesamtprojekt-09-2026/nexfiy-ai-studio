import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { fitComposer, useChatPanel, useComposerFit, useShellSignals } from "../lib/imported-site";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/teileklar.css?raw";

export const Route = createFileRoute("/teileklar")({
  head: () => ({
    meta: [
      { title: "TEILEKLAR.shop – Zubehör für Auto & Motorrad" },
      { name: "description", content: "Passende Teile und Zubehör für Auto und Motorrad – mit klaren Angaben zu Fahrzeug, Passung und Werkstatt." },
      { property: "og:title", content: "TEILEKLAR.shop – Zubehör für Auto & Motorrad" },
      { property: "og:description", content: "Passende Teile und Zubehör für Auto und Motorrad – mit klaren Angaben zu Fahrzeug, Passung und Werkstatt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "de", "data-theme": "dark", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const isMobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 767px)").matches, () => false);
  const { chatOpen, openChat, closeChat, reopenRef } = useChatPanel(false);
  const { scrolled, footerVisible, viewportHeight } = useShellSignals();
  const composerRef = useComposerFit(chatOpen, isMobile, viewportHeight);
  const pageContent = (<>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" {...({ focusable: "false" } as any)}>
  <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "36", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-leiste.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "30", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-front.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "44", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
</svg>
<div className={"website"}>
  <a className={"skip-link"} href="#page-content">Zum Inhalt</a>
  <header className={"tk-commerce-header"}>
    <div className={"tk-service-strip"}>
      <span>Auto &amp; Motorrad · Alle Preise inkl. MwSt.</span>
      <a href="/teileklar/rechtliches">Versand &amp; Rückgabe</a>
      <a href="/kontakt">Persönlicher Kontakt</a>
    </div>
    <div className={"tk-commerce-main"}>
      <a className={"tk-wordmark"} href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form role="search" className={"tk-header-search"} method="get">
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" type="search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a aria-current="page" href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero"} aria-labelledby="storefront-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <span className={"hc-kicker"}>TEILEKLAR.shop<span aria-hidden="true"> / </span>AUTO &amp; MOTORRAD</span>
            <h1 id="storefront-title">
              <span>Für Ihr Auto. </span>
              <span className={"identity-title-accent"}>Klar gefunden.</span>
            </h1>
            <p className={"identity-body"}>Vom praktischen Zubehör bis zur Pflege: Entdecken Sie unser Sortiment. Mit Originalfotos, nachvollziehbaren Preisen und klaren Produktangaben.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="#sortiment">
                <span>Sortiment entdecken</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/fahrzeug-und-passung">Passt der Artikel zu meinem Fahrzeug?</a>
            </div>
          </div>
          <div className={"identity-media"}>
            <div className={"tk-window-products"} aria-label="Einblicke ins Sortiment">
              <div className={"tk-window-loading"} role="status">Sortiment momentan nicht erreichbar</div>
            </div>
          </div>
        </div>
      </section>
      <section className={"hc-container tk-shopping-points"} aria-label="Einkaufsinformationen">
        <div>
          <span>01</span>
          <p>
            <strong>Preise inklusive MwSt.</strong>
          </p>
          <p className={"hc-caption"}>Versandkosten vor Bestellabschluss</p>
        </div>
        <div>
          <span>02</span>
          <p>
            <strong>Sichere Zahlungsseite</strong>
          </p>
          <p className={"hc-caption"}>Bezahlung über Revolut</p>
        </div>
        <div>
          <span>03</span>
          <p>
            <strong>Erst prüfen, dann bestellen</strong>
          </p>
          <p className={"hc-caption"}>Keine ungeprüfte Passformzusage</p>
        </div>
      </section>
      <section className={"hc-section hc-container tk-window-categories"}>
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Ihr Einstieg</span>
          <h2>Was suchen Sie?</h2>
          <a className={"hc-text-link"} href="/teileklar/kategorien">Alle Kategorien<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </header>
        <div className={"tk-category-tiles"} />
      </section>
      <section className={"hc-section hc-container tk-window-selection"} id="sortiment">
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Aus dem Sortiment</span>
          <h2>Artikel im Schaufenster</h2>
          <a className={"hc-text-link"} href="/teileklar/shop">Alle Artikel ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </header>
        <div className={"tk-empty"} role="alert">
          <p>Das Sortiment konnte nicht geladen werden.</p>
          <button type="button" className={"nexify-control secondary-button hc-text-link"} data-variant="secondary">Erneut versuchen</button>
        </div>
      </section>
      <section className={"hc-section hc-budget hc-container"}>
        <div className={"hc-budget-story"}>
          <header className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Vor dem Kauf</span>
            <h2>Gut informiert.<br />Klar entschieden.</h2>
            <p>Vergleichen Sie Artikelnummer und Herstellerangaben. Ein Produktfoto allein bestätigt keine Fahrzeugpassung.</p>
            <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Zur Passform-Checkliste<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </header>
          <div className={"hc-costs"}>
            <div>
              <h3>So bestellen Sie</h3>
              <div className={"hc-service-body"}>
                <ol>
                  <li>Artikel auswählen und Angaben prüfen</li>
                  <li>Menge festlegen und zum Warenkorb hinzufügen</li>
                  <li>Lieferadresse, Versand und Gesamtpreis prüfen</li>
                  <li>Bestellung bestätigen und sicher bezahlen</li>
                </ol>
                <a className={"hc-text-link"} href="/teileklar/rechtliches">Versand, Widerruf und Bedingungen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <details className={"hc-container tk-source-disclosure"}>
        <summary>Datenstand und Lieferanteninformationen</summary>
      </details>
    </div>
  </main>
  <footer className={"site-footer structured-footer footer-refined"}>
    <div className={"footer-inner"}>
      <div className={"footer-invitation"}>
        <div>
          <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
          <p>Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden nächsten Schritt.</p>
        </div>
        <a className={"nexify-control primary-button "} data-variant="primary" href="/kontakt">Projekt besprechen<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
      </div>
      <div className={"footer-main"}>
        <div className={"footer-brand-block"}>
          <a aria-label="Zur Startseite" className={"brand"} href="/teileklar">
            <span className={"nx-logo"} data-groesse="s">
              <span className={"nx-logo-wort"}>
                <span className={"nx-logo-name"}>TEILE<span className={"nx-logo-x"}>KLAR</span></span>
                <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
              </span>
            </span>
          </a>
          <p>Teile, Fahrzeugfragen und Werkstattkontakte. Beschreiben Sie, was Sie benötigen.</p>
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben{" "}<span aria-hidden="true">→</span></a>
        </div>
        <div className={"footer-link-groups "}>
          <nav aria-label={"Produkte & Arbeitsbereiche"}>
            <h2>Produkte &amp; Arbeitsbereiche</h2>
            <a href="/teileklar">TEILEKLAR</a>
            <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
            <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
            <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
            <a href="/teileklar/partner-werden">Partner werden</a>
            <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
          </nav>
          <nav aria-label={"Leistungen & Zusammenarbeit"}>
            <h2>Leistungen &amp; Zusammenarbeit</h2>
            <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
            <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
            <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
          </nav>
          <nav aria-label="NeXify AI">
            <h2>NeXify AI</h2>
            <a href="/unternehmen">Über NeXify</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/anmelden">Anmelden</a>
            <a href="/registrieren">Registrieren</a>
          </nav>
          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
            <a href="/ki-hinweise">KI-Hinweise</a>
            <a href="/barrierefreiheit">Barrierefreiheit</a>
            <a href="/cookies">Datenschutzeinstellungen</a>
          </nav>
        </div>
      </div>
      <div className={"footer-bottom"}>
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR!{" "}<span aria-hidden="true">·</span>{" "}Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI{" "}<span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_R_8lbH1_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_R_8lbH1_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/kategorie">Ähnliche Teile sicher unterscheiden.</a>
                <a href="/teileklar/produkt">Alles zum Artikel. Vor dem Kauf.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner">Reifengrößen vergleichen.</a>
                <a href="/teileklar/batterie-berater">Die passende Batterie finden.</a>
              </div>
              <div className={"footer-overview-group"}>
                <h3>Rechtliches</h3>
                <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
              </div>
            </nav>
          </div>
        </details>
      </div>
      <div className={"footer-legal"}>
        <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
          <a href="/teileklar/rechtliches">TEILEKLAR: Anbieterinformationen und Datenschutz</a>
        </nav>
        <details className={"footer-legal-details"}>
          <summary aria-expanded="false" aria-controls="_R_8lb_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_R_8lb_">
            <p>Die Rechtsinformationen für TEILEKLAR sind direkt erreichbar. Vollständige Angaben zum Anbieter, Datenschutz und Verbraucherrechten im Shop stehen noch zur Prüfung und Freigabe.</p>
            <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
          </div>
        </details>
      </div>
    </div>
    <div className={"footer-utilities"}>
      <details className={"diagnostic-consent"}>
        <summary>Fehlerdiagnose-Einstellungen</summary>
        <div className={"diagnostic-consent-content"}>
          <p>Optional: Fehlerdiagnose mit PostHog. Mit Ihrer Zustimmung können technische Fehlerstellen, Fehlertyp und App-Version übermittelt werden. Eingaben und Fehlertexte werden entfernt. Keine Marketing- oder Klickerfassung und keine Sitzungsaufzeichnung.</p>
          <p>Bei einer Übertragung erhält der Dienst Netzwerkdaten wie Ihre IP-Adresse.</p>
          <p>Ihre Auswahl gilt nur bis zum Neuladen und wird nicht gespeichert. Ablehnen schränkt die Seitenfunktionen nicht ein.</p>
          <p className={"diagnostic-consent-status"} role="status" aria-live="polite">Aus · noch keine Auswahl</p>
          <div className={"diagnostic-consent-actions"} role="group" aria-label="Fehlerdiagnose-Einstellungen">
            <button type="button" className={"\x6futline-button"}>Zulassen</button>
            <button type="button" className={"\x6futline-button"}>Ablehnen</button>
          </div>
          <a href="/datenschutz">Datenschutzhinweise</a>
        </div>
      </details>
    </div>
  </footer>
</div>
{!chatOpen && <button ref={reopenRef} onClick={openChat} aria-expanded="false" aria-controls="aifly-panel" type="button" className={"nexify-control secondary-button reopen-chat"} data-variant="secondary"><span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true"><img src="/site-assets/9176c58a16ff634a.png" alt="" width="34" height="34" decoding="async" /></span>TEILEKLAR Hilfe</button>}
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" role={isMobile ? "dialog" : undefined} hidden={!chatOpen} style={!chatOpen || isMobile || viewportHeight === null ? undefined : ({ "--chat-viewport-height": viewportHeight + "px", "--chat-viewport-top": "0px" } as CSSProperties)}>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img src="/site-assets/9176c58a16ff634a.png" alt="" width="34" height="34" decoding="async" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon" onClick={closeChat}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
  <div className={"sdk-orientation-view"}>
    <section className={"public-orientation"} aria-label="Willkommen bei TEILEKLAR" style={{ "--ca-fuss": "0px" } as CSSProperties}>
      <div className={"orientation-content"}>
        <div className={"orientation-intro"}>
          <div className={"orientation-host"}>
            <span className={"orientation-host-figure"} aria-hidden="true">
              <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" />
            </span>
            <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
          </div>
          <h3>Willkommen bei TEILEKLAR</h3>
          <p className={"orientation-intro-body"}>Willkommen bei TEILEKLAR. Worum geht es bei Ihnen: ein Ersatzteil, ein Werkstattbesuch oder eine Zusammenarbeit? Bei einer Teile- oder Werkstattfrage nennen Sie bitte Ihr Fahrzeug und beschreiben Sie Ihr Anliegen. Eine vorhandene Teilenummer hilft bei der Zuordnung.</p>
        </div>
        <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
        <div className={"orientation-starters"} role="group" aria-label="Ihr Fahrzeug-/Teile-Anliegen">
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">01</span>
            <span className={"orientation-starter-copy"}>
              <strong>Fahrzeug &amp; Teil</strong>
              <small>Mit Fahrzeugdaten und vorhandenem Hinweis zum passenden Teil starten.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">02</span>
            <span className={"orientation-starter-copy"}>
              <strong>Werkstatt-Anfrage</strong>
              <small>Leistung, Fahrzeug und Standort für die Werkstattsuche einordnen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">03</span>
            <span className={"orientation-starter-copy"}>
              <strong>Zusammenarbeit</strong>
              <small>Werkstattprofil, Zusammenarbeit und gemeinsamen Serviceweg besprechen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
        <ol className={"orientation-path orientation-path-quiet"} aria-label="Vom Anliegen zur passenden Anlaufstelle.">
          <li data-state="open"><small>01</small>Fahrzeug nennen</li>
          <li data-state="open"><small>02</small>Anliegen eingrenzen</li>
          <li data-state="open"><small>03</small>Nächsten Weg wählen</li>
        </ol>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea ref={composerRef} onInput={(event) => fitComposer(event.currentTarget)} id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required enterKeyHint="send" />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <p className={"connection-note orientation-status"} role="status" />
      <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches">Datenschutz</a></p>
    </section>
  </div>
</aside>
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div id="atelier" className={chatOpen ? "workspace-shell site-teileklar is-open" : "workspace-shell site-teileklar is-closed"} data-scrolled={scrolled ? "true" : "false"} data-footer-visible={footerVisible ? "true" : "false"}>{pageContent}</div>

    </>
  );
}

function subscribeMobile(onChange: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
