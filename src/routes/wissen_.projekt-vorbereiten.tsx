import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/wissen.projekt-vorbereiten.css?raw";

export const Route = createFileRoute("/wissen_/projekt-vorbereiten")({
  head: () => ({ meta: [{ title: "Ihr Briefing in fünf Fragen. · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const [activeSlide0, setActiveSlide0] = useState(0);
  const isMobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 767px)").matches, () => false);
  const carouselContent0 = (<>
{activeSlide0 === 0 && <Fragment key={0}>
<section className={"install-invitation"} aria-labelledby="install-invitation-title">
  <span className={"nx-logo install-invitation-mark"} data-groesse="s">
    <span className={"nx-logo-figur"} aria-hidden="true">
      <img alt="" width="512" height="512" decoding="async" draggable="false" src="/site-assets/9176c58a16ff634a.png" />
    </span>
  </span>
  <div className={"install-invitation-copy"}>
    <h2 id="install-invitation-title">NeXify AI als App installieren</h2>
    <p>Installiere NeXify AI für einen schnellen Start direkt vom Startbildschirm.</p>
    <p className={"install-invitation-note"}>Verfügbarkeit und Installation hängen vom Browser ab. Für die Nutzung ist eine Internetverbindung erforderlich.</p>
  </div>
  <div className={"install-invitation-actions"}>
    <button type="button" className={"primary-button"}>Installieren</button>
    <button onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(index => (index + 1 + 2) % 2); }} type="button" className={"\x74ext-button"}>Nicht jetzt</button>
  </div>
</section>
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
</Fragment>}
{activeSlide0 === 1 && <Fragment key={1}>
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
</Fragment>}
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div className={isMobile ? "workspace-shell site-nexify is-closed" : "workspace-shell site-nexify is-open"} id="atelier">
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
          <ImportedHeaderNeXifyAI />
          <main id="page-content" tabIndex={-1}>
            <div className={"home-concept page-concept page-knowledge-start layout-article context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-knowledge-start">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                          <span aria-hidden="true">/</span>
                        </li>
                        <li>
                          <a href="/wissen">So arbeiten wir.</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Ihr Briefing in fünf Fragen.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Wissen und Orientierung</span>
                    <h1 id="page-title-knowledge-start">Ihr Briefing in fünf Fragen.</h1>
                    <p className={"identity-body"}>Sie brauchen kein fertiges Konzept. Fünf Antworten genügen, damit aus Ihrer Idee ein Angebot werden kann.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/kontakt">
                        <span>Vorhaben schildern</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/leistungsumfang">Pakete vergleichen</a>
                    </div>
                  </div>
                  <div className={"identity-media"}>
                    <figure className={"identity-hero-photo"}>
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal bespricht ein Dokument mit einer Gesprächspartnerin im Empfangsbereich" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/1a5734bbeb80a90b.webp 800w, /site-assets/855bb0082f7bbaf6.webp 1280w, /site-assets/7ab67fba9fccf952.webp 1920w" src="/site-assets/7ab67fba9fccf952.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-knowledge-start-knowledge-start-customer-1-0">Die fünf Fragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-knowledge-start-knowledge-start-customer-2-1">Wenn Technik im Spiel ist<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-knowledge-start-knowledge-start-customer-1-0" tabIndex={-1} aria-labelledby="content-knowledge-start-knowledge-start-customer-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-knowledge-start-knowledge-start-customer-1-0-title">Die fünf Fragen</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>1. Was bieten Sie an, und für wen?</p>
                    <p>2. Was soll sich ändern – mehr Anfragen, weniger Handarbeit, ein neuer Auftritt?</p>
                    <p>3. Was funktioniert heute gut, und wo springen Kunden ab?</p>
                    <p>4. Welche Unterlagen, Inhalte und Beispiele gibt es schon?</p>
                    <p>5. Welchen Rahmen haben Sie für Budget und Termin?</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-knowledge-start-knowledge-start-customer-2-1" tabIndex={-1} aria-labelledby="content-knowledge-start-knowledge-start-customer-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-knowledge-start-knowledge-start-customer-2-1-title">Wenn Technik im Spiel ist</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Nennen Sie die Systeme, die Sie nutzen – Website, Shopsoftware, Schnittstellen – und die Personen, die mitentscheiden. Schreiben Sie dazu, welche Aufgabe künftig leichter werden soll.</p>
                    <p>Zugangsdaten gehören nicht in die Anfrage. Dafür vereinbaren wir einen sicheren Weg.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-knowledge-start">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-knowledge-start">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/leistungsumfang">Pakete vergleichen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <button type="button" className={"hc-text-link"}>Angebot anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                    <button type="button" className={"hc-text-link"}>Terminwunsch nennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
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
                  <a aria-label="Zur Startseite" className={"brand"} href="/">
                    <span className={"nx-logo"} data-groesse="s">
                      <span className={"nx-logo-figur"} aria-hidden="true">
                        <img alt="" width="512" height="512" decoding="async" draggable="false" src="/site-assets/9176c58a16ff634a.png" />
                      </span>
                      <span className={"nx-logo-wort"}>
                        <span className={"nx-logo-name"}>Ne<span className={"nx-logo-x"}>X</span>ify AI</span>
                        <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
                      </span>
                    </span>
                  </a>
                  <p>Websites, digitale Abläufe und Kampagnen für Ihr Unternehmen. Persönlich begleitet von Pascal Courbois.</p>
                  <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Ihr Projekt mit NeXify besprechen <span aria-hidden="true">→</span></a>
                </div>
                <div className={"footer-link-groups "}>
                  <nav aria-label={"Produkte & Arbeitsbereiche"}>
                    <h2>Produkte &amp; Arbeitsbereiche</h2>
                    <a href="/produkte/nex2fly">NeX AIFly Suite</a>
                    <a href="/produkte/one">NeX Agentic AI</a>
                    <a href="/produkte/api">NeXify API</a>
                    <a href="/teileklar">TEILEKLAR</a>
                    <a href="/teileklar/partner-werden">Partner werden</a>
                  </nav>
                  <nav aria-label={"Leistungen & Zusammenarbeit"}>
                    <h2>Leistungen &amp; Zusammenarbeit</h2>
                    <a href="/leistungen/websites">Websites &amp; Markenauftritt</a>
                    <a href="/leistungen/agenten-automatisierung">Automatisierung &amp; KI</a>
                    <a href="/leistungen/apps-portale">Apps &amp; Portale</a>
                    <a href="/loesungen">Landingpages &amp; Kampagnen</a>
                    <a href="/preise-ablauf">Preise &amp; Zusammenarbeit</a>
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
                    <a href="/impressum">Impressum</a>
                    <a href="/datenschutz">Datenschutz</a>
                    <a href="/vertragsgrundlagen">Vertragsgrundlagen</a>
                    <a href="/ki-hinweise">KI-Hinweise</a>
                    <a href="/barrierefreiheit">Barrierefreiheit</a>
                    <a href="/cookies">Datenschutzeinstellungen</a>
                  </nav>
                </div>
              </div>
              <div className={"footer-bottom"}>
                <span className={"footer-claim"}>NeXify AI <span aria-hidden="true">·</span> Chat it. Automate it.</span>
                <a className={"footer-crosslink"} href="/teileklar">TEILEKLAR <span aria-hidden="true">→</span></a>
                <details className={"footer-overview"}>
                  <summary aria-expanded="false" aria-controls="_r_5_">
                    <span>Seitenübersicht</span>
                    <span className={"footer-overview-marker"} aria-hidden="true">+</span>
                  </summary>
                  <div className={"footer-overview-panel"} id="_r_5_">
                    <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
                    <ImportedNavSeitenBersicht />
                  </div>
                </details>
              </div>
              <div className={"footer-legal"}>
                <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
                  <a href="/impressum">Impressum</a>
                  <a href="/datenschutz">Datenschutz</a>
                </nav>
                <p className={"footer-ai-note"}>
                  <a href="/ki-hinweise">Markeninszenierung · KI-generiert</a>
                </p>
                <details className={"footer-legal-details"}>
                  <summary aria-expanded="false" aria-controls="_r_4_">Hinweise zu den Rechtsdokumenten</summary>
                  <div id="_r_4_">
                    <p>Die Seiten zu Anbieterinformationen und Datenschutz sind direkt erreichbar. Vollständige Pflichtangaben und Rechtstexte stehen noch zur Prüfung und Freigabe.</p>
                    <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
                  </div>
                </details>
              </div>
            </div>
            <div className={"footer-utilities"} data-site-import-carousel-root="0">{carouselContent0}</div>
          </footer>
        </div>
        <ImportedAsideAIFlyORACLE />
      </div>

    </>
  );
}

function ImportedHeaderNeXifyAI() {
  return (
    <header className={"site-header"}>
      <a aria-label="NeXify AI · Startseite" className={"brand"} href="/">
        <span className={"nx-logo"}>
          <span className={"nx-logo-figur"} aria-hidden="true">
            <img alt="" width="512" height="512" decoding="async" draggable="false" src="/site-assets/9176c58a16ff634a.png" />
          </span>
          <span className={"nx-logo-wort"}>
            <span className={"nx-logo-name"}>Ne<span className={"nx-logo-x"}>X</span>ify AI</span>
            <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
          </span>
        </span>
      </a>
      <nav className={"main-navigation"} aria-label="Hauptnavigation">
        <a href="/leistungen">Leistungen</a>
        <details className={"product-navigation"}>
          <summary aria-expanded="false" aria-controls="_r_0_-products">Produkte<span className={"navigation-chevron"} aria-hidden="true">⌄</span></summary>
          <div className={"product-navigation-menu"} id="_r_0_-products">
            <div className={"megamenu-heading"}>
              <p>Marke, Systeme und Wachstum – verbunden durch die FACTORY.</p>
              <a href="/leistungen">Leistungen der FACTORY<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
            <div className={"megamenu-columns"}>
              <div className={"megamenu-group"}>
                <h2>NeXify AI</h2>
                <a href="/produkte/nex2fly">
                  <span>NeX AIFly Suite</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/one">
                  <span>NeX Agentic AI</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/produkte/api">
                  <span>API &amp; Integrationen</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>TEILEKLAR</h2>
                <a href="/teileklar">
                  <span>TEILEKLAR entdecken</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/werkstatt">
                  <span>Werkstattprofile</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/teileklar/partner-werden">
                  <span>Werkstattpartner werden</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
              <div className={"megamenu-group"}>
                <h2>Projekt &amp; Wachstum</h2>
                <a href="/loesungen">
                  <span>Kampagne und Zielseite aus einem Guss.</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/preise-ablauf">
                  <span>Preise &amp; Ablauf</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/leistungsumfang">
                  <span>Projektstart</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a aria-current="page" href="#">
                  <span>Projekt vorbereiten</span>
                  <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={"megamenu-bottom"}>
              <span>Ihr Projekt verdient einen klaren Rahmen.</span>
              <a href="/leistungsumfang">Projektumfang festlegen<svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            </div>
          </div>
        </details>
        <a href="/wissen">Arbeitsweise</a>
        <a href="/kontakt">Kontakt</a>
      </nav>
      <details className={"mobile-navigation"}>
        <summary aria-label="Menü" aria-expanded="false" aria-controls="_r_0_-mobile">
          <span className={"mobile-menu-mark"} aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <nav className={"mobile-navigation-panel"} id="_r_0_-mobile" aria-label="Hauptnavigation">
          <div className={"mobile-primary-links"}>
            <a href="/leistungen">Leistungen</a>
            <a href="/wissen">Arbeitsweise</a>
            <a href="/kontakt">Kontakt</a>
          </div>
          <div className={"megamenu-group"}>
            <h2>NeXify AI</h2>
            <a href="/produkte/nex2fly">
              <span>NeX AIFly Suite</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/one">
              <span>NeX Agentic AI</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/produkte/api">
              <span>API &amp; Integrationen</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>TEILEKLAR</h2>
            <a href="/teileklar">
              <span>TEILEKLAR entdecken</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/werkstatt">
              <span>Werkstattprofile</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/teileklar/partner-werden">
              <span>Werkstattpartner werden</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Projekt &amp; Wachstum</h2>
            <a href="/loesungen">
              <span>Kampagne und Zielseite aus einem Guss.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/preise-ablauf">
              <span>Preise &amp; Ablauf</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/leistungsumfang">
              <span>Projektstart</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a aria-current="page" href="#">
              <span>Projekt vorbereiten</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className={"megamenu-group"}>
            <h2>Ihr Konto</h2>
            <a href="/anmelden">
              <span>Anmelden und weiterarbeiten.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/registrieren">
              <span>NeX AIFly Suite. In Ruhe testen.</span>
              <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <button type="button" className={"nexify-control  "} data-variant="quiet">Menü schließen</button>
        </nav>
      </details>
      <div className={"header-actions"}>
        <label className={"visually-hidden"} htmlFor="locale" id="bb-customSelect-LOWp6-label">Sprache</label>
        <div className={"bb-custom-select-container bb-customSelect bb-is-disabled"}>
          <span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-LOWp6-panel" aria-activedescendant="bb-customSelect-LOWp6-selectedOption" aria-labelledby="bb-customSelect-LOWp6-label">
            <span>DE</span>
          </span>
          <select id="locale" aria-describedby="locale-hint" defaultValue="de">
            <option value="de">DE</option>
            <option value="nl">NL</option>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <div id="bb-customSelect-LOWp6-panel" className={"bb-custom-select-panel"} role="listbox">
            <div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-LOWp6-selectedOption">DE</div>
            <div className={"bb-custom-select-option"} role="option">NL</div>
            <div className={"bb-custom-select-option"} role="option">FR</div>
            <div className={"bb-custom-select-option"} role="option">EN</div>
          </div>
        </div>
        <span id="locale-hint" className={"visually-hidden"}>Auswahl mit der Eingabetaste bestätigen.</span>
        <button type="button" className={"theme-switch"} role="switch" aria-checked="false" aria-label="Helle Ansicht" title="Helle Ansicht">
          <svg className={"theme-sun"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
          <svg className={"theme-moon"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </button>
        <a className={"header-cta"} href="/kontakt"><span aria-hidden="true" />Projektgespräch anfragen</a>
      </div>
    </header>
  );
}

function ImportedSectionDieFACTORYEntdeckenMit() {
  return (
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
          <div className={"pc-guide-controls"}>
            <label id="bb-customSelect-BCJ2c-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-BCJ2c-panel" aria-activedescendant="bb-customSelect-BCJ2c-selectedOption" aria-labelledby="bb-customSelect-BCJ2c-label" tabIndex={0}><span>Ihr Projektbriefing</span></span><select tabIndex={-1} defaultValue="knowledge-to-project"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-BCJ2c-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-BCJ2c-selectedOption">Ihr Projektbriefing</div><div className={"bb-custom-select-option"} role="option">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
            <button type="button" aria-pressed="false">Begleitung starten</button>
          </div>
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-knowledge-start">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-knowledge-start">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/kontakt">Schildern Sie Ihr Vorhaben.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste Schritt aussieht.</p>
          <a aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen" className={"hc-text-link"} href="/kontakt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit benannten Ergebnissen, wählbaren Optionen und Kosten, die Sie vor dem Start kennen.</p>
          <a aria-label="Drei Pakete. Ein klarer Umfang. – Seite ansehen" className={"hc-text-link"} href="/leistungsumfang">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/wissen">So arbeiten wir.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Vom ersten Gespräch bis zur Übergabe: Sie sehen früh, welche Richtung entsteht, was enthalten ist und welche Entscheidung als Nächstes ansteht.</p>
          <a aria-label="So arbeiten wir. – Seite ansehen" className={"hc-text-link"} href="/wissen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

function ImportedNavSeitenBersicht() {
  return (
    <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
      <div className={"footer-overview-group"}>
        <h3>Leistungen</h3>
        <a href="/leistungen">Website, System, Kampagne. Aus einer Hand.</a>
        <a href="/leistungen/websites">Eine Website, die Ihr Angebot erklärt.</a>
        <a href="/leistungen/agenten-automatisierung">Routine abgeben. Kontrolle behalten.</a>
        <a href="/leistungen/apps-portale">Portale und Apps für Ihren Ablauf.</a>
        <a href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Produkte</h3>
        <a href="/loesungen">Kampagne und Zielseite aus einem Guss.</a>
        <a href="/preise-ablauf">Sie kennen die Kosten vor dem Start.</a>
        <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.</a>
        <a href="/produkte/one">Zwei Agenten. Eine klare Aufgabe.</a>
        <a href="/produkte/api">NeXify API. KI in Ihrer Anwendung.</a>
        <a href="/produkte/aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.</a>
        <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.</a>
        <a href="/produkte/skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Wissen und Unternehmen</h3>
        <a href="/">Ein Gespräch. Ein Projekt, das passt.</a>
        <a href="/wissen">So arbeiten wir.</a>
        <a href="#">Ihr Briefing in fünf Fragen.</a>
        <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.</a>
        <a href="/kontakt">Schildern Sie Ihr Vorhaben.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Konto</h3>
        <a href="/anmelden">Anmelden und weiterarbeiten.</a>
        <a href="/registrieren">NeX AIFly Suite. In Ruhe testen.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Rechtliches</h3>
        <a href="/impressum">Impressum · NeXify AI by NeXify</a>
        <a href="/datenschutz">Ihre Daten. Ein klarer Zweck.</a>
        <a href="/vertragsgrundlagen">Gute Zusammenarbeit hat klare Grundlagen.</a>
        <a href="/ki-hinweise">KI mit klarer Verantwortung.</a>
        <a href="/barrierefreiheit">Qualität soll zugänglich sein.</a>
        <a href="/cookies">Sie wählen, was zusätzlich aktiv wird.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Weitere Seiten</h3>
        <a href="/portale">Portale. Ihr Zugang, Ihr Bereich.</a>
      </div>
    </nav>
  );
}

function ImportedAsideAIFlyORACLE() {
  return (
    <aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties} data-site-import-responsive="236">
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
        <section className={"public-orientation"} aria-label="Was planen Sie?" style={{ "--ca-fuss": "128px" } as CSSProperties} data-site-import-responsive="244">
          <div className={"orientation-content"}>
            <div className={"orientation-intro"}>
              <div className={"orientation-host"}>
                <span className={"orientation-host-figure"} aria-hidden="true">
                  <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
                </span>
                <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
              </div>
              <h3>Was planen Sie?</h3>
              <p className={"orientation-intro-body"}>Erzählen Sie mir von Ihrem Unternehmen und Ihrem Vorhaben. Ich helfe Ihnen, passende Leistungen zu finden und Ihr Gespräch mit Pascal vorzubereiten.</p>
            </div>
            <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
            <div className={"orientation-starters"} role="group" aria-label="Wobei können wir Ihnen helfen?">
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">01</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Marke &amp; Web</strong>
                  <small>Auftritt, Website oder Shop gestalten.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">02</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Systeme &amp; KI</strong>
                  <small>Abläufe verbinden und Arbeit erleichtern.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"orientation-starter"} aria-pressed="false">
                <span className={"orientation-starter-index"} aria-hidden="true">03</span>
                <span className={"orientation-starter-copy"}>
                  <strong>Ads &amp; Marketing</strong>
                  <small>Menschen erreichen und Nachfrage gewinnen.</small>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12h16m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
            <ol className={"orientation-path orientation-path-quiet"} aria-label="Aus einer Idee wird ein klarer nächster Schritt.">
              <li data-state="open"><small>01</small>Vorhaben einordnen</li>
              <li data-state="open"><small>02</small>Passenden Weg finden</li>
              <li data-state="open"><small>03</small>Persönlich vertiefen</li>
            </ol>
          </div>
          <form className={"orientation-composer"}>
            <label htmlFor="orientation-message">Wobei können wir Ihnen helfen?</label>
            <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Wobei können wir Ihnen helfen?" aria-describedby="orientation-keys" required style={{ height: "48px" }} {...({ enterkeyhint: "send" } as any)} />
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
          <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/datenschutz">Datenschutz</a></p>
        </section>
      </div>
    </aside>
  );
}

function subscribeMobile(onChange: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
