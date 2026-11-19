import type { CSSProperties } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/teileklar.reifenrechner.css?raw";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/teileklar_/reifenrechner")({
  head: () => ({
    links: [canonicalLink("/teileklar/reifenrechner")], meta: [{ title: "Reifengrößen vergleichen. · TEILEKLAR.shop" }, { name: "description", content: "Breite, Querschnitt und Felgendurchmesser gehören zusammen. Der Reifenrechner zeigt, wie sich eine andere Größe auf den Durchmesser auswirkt" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const [activeSlide0, setActiveSlide0] = useState(0);
  const carouselContent0 = (<>
{activeSlide0 === 0 && <Fragment key={0}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" focusable="false">
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
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-reifenrechner layout-commerce context-teileklar"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="page-title-tk-reifenrechner">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">Reifengrößen vergleichen.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-reifenrechner">Reifengrößen vergleichen.</h1>
            <p className={"identity-body"}>Breite, Querschnitt und Felgendurchmesser gehören zusammen. Der Reifenrechner zeigt, wie sich eine andere Größe auf den Durchmesser auswirkt.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/fahrzeug-und-passung">
                <span>Passung prüfen</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/suche">Teile suchen</a>
            </div>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-1-0">Drei Zahlen, ein Reifen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-2-1">Erlaubt ist, was in den Papieren steht<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">Drei Zahlen, ein Reifen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Breite und Querschnitt bestimmen die Höhe der Flanke, der Felgendurchmesser die Größe. Ändern Sie eine Zahl, ändert sich der Abrollumfang – das ist mehr als eine Frage der Optik.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-reifenrechner-tk-reifenrechner-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-reifenrechner-tk-reifenrechner-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-reifenrechner-tk-reifenrechner-customer-2-1-title">Erlaubt ist, was in den Papieren steht</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Der Rechner vergleicht Größen; er erteilt keine Freigabe. Welche Größen Sie fahren dürfen, steht in den Fahrzeugpapieren. Den Rechner finden Sie bei der Passungsprüfung.</p>
          </div>
        </section>
      </div>
      <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
        <details className={"hc-service-detail"}>
          <summary>
            <span>
              <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
            </span>
            <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </summary>
          <div className={"hc-service-body"}>
            <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
                      <a className={"hc-text-link"} href="/kontakt">Passenden Einstieg wählen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </div>
      </details>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-reifenrechner">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-reifenrechner">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <a aria-label="Passt das Teil? So prüfen Sie es. – Seite ansehen" className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Am sichersten finden Sie Ihr Teil über eine Nummer: Herstellernummer, EAN oder Artikelnummer. Sie können auch nach Bezeichnung oder Marke suchen.</p>
            <a aria-label="Teil, Marke oder Nummer suchen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Sie wissen, was Sie brauchen, aber nicht, wie es heißt? Stöbern Sie nach Teileart – von Zubehör bis Pflege.</p>
            <a aria-label="Alle Kategorien auf einen Blick. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-reifenrechner">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-reifenrechner">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/fahrzeug-und-passung">Passung prüfen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/suche">Teile suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
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
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
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
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_3_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_3_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner" aria-current="page">Reifengrößen vergleichen.</a>
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
          <summary aria-expanded="false" aria-controls="_r_2_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_2_">
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
<button onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(index => (index + 1 + 2) % 2); }} aria-expanded="false" aria-controls="aifly-panel" type="button" className={"nexify-control secondary-button reopen-chat"} data-variant="secondary"><span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true"><img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" /></span>TEILEKLAR Hilfe</button>
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" hidden>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
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
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
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
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
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
</Fragment>}
{activeSlide0 === 1 && <Fragment key={1}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" focusable="false">
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
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-reifenrechner layout-commerce context-teileklar"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="page-title-tk-reifenrechner">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">Reifengrößen vergleichen.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-reifenrechner">Reifengrößen vergleichen.</h1>
            <p className={"identity-body"}>Breite, Querschnitt und Felgendurchmesser gehören zusammen. Der Reifenrechner zeigt, wie sich eine andere Größe auf den Durchmesser auswirkt.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/fahrzeug-und-passung">
                <span>Passung prüfen</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/suche">Teile suchen</a>
            </div>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-1-0">Drei Zahlen, ein Reifen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-2-1">Erlaubt ist, was in den Papieren steht<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">Drei Zahlen, ein Reifen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Breite und Querschnitt bestimmen die Höhe der Flanke, der Felgendurchmesser die Größe. Ändern Sie eine Zahl, ändert sich der Abrollumfang – das ist mehr als eine Frage der Optik.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-reifenrechner-tk-reifenrechner-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-reifenrechner-tk-reifenrechner-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-reifenrechner-tk-reifenrechner-customer-2-1-title">Erlaubt ist, was in den Papieren steht</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Der Rechner vergleicht Größen; er erteilt keine Freigabe. Welche Größen Sie fahren dürfen, steht in den Fahrzeugpapieren. Den Rechner finden Sie bei der Passungsprüfung.</p>
          </div>
        </section>
      </div>
      <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
        <details className={"hc-service-detail"}>
          <summary>
            <span>
              <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
            </span>
            <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </summary>
          <div className={"hc-service-body"}>
            <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
                      <a className={"hc-text-link"} href="/kontakt">Passenden Einstieg wählen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </div>
      </details>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-reifenrechner">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-reifenrechner">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <a aria-label="Passt das Teil? So prüfen Sie es. – Seite ansehen" className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Am sichersten finden Sie Ihr Teil über eine Nummer: Herstellernummer, EAN oder Artikelnummer. Sie können auch nach Bezeichnung oder Marke suchen.</p>
            <a aria-label="Teil, Marke oder Nummer suchen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Sie wissen, was Sie brauchen, aber nicht, wie es heißt? Stöbern Sie nach Teileart – von Zubehör bis Pflege.</p>
            <a aria-label="Alle Kategorien auf einen Blick. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-reifenrechner">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-reifenrechner">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/fahrzeug-und-passung">Passung prüfen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/suche">Teile suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
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
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
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
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_3_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_3_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner" aria-current="page">Reifengrößen vergleichen.</a>
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
          <summary aria-expanded="false" aria-controls="_r_2_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_2_">
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
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties}>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
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
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
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
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
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
</Fragment>}
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div id="atelier" className={"workspace-shell site-teileklar is-closed"} data-site-import-carousel-root="0">{carouselContent0}</div>

    </>
  );
}
