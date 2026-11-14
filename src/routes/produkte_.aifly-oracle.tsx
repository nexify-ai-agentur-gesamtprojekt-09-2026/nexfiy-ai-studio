import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/produkte.aifly-oracle.css?raw";

export const Route = createFileRoute("/produkte_/aifly-oracle")({
  head: () => ({ meta: [{ title: "AIFly ORACLE. Erst ordnen, dann handeln. · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const isMobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 767px)").matches, () => false);
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
            <div className={"home-concept page-concept page-aifly-oracle layout-company context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-aifly-oracle">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">AIFly ORACLE. Erst ordnen, dann handeln.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen</span>
                    <h1 id="page-title-aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.</h1>
                    <p className={"identity-body"}>AIFly ORACLE ist das KI-System, das Aufgaben ordnet und Ihnen im Chat dieser Website antwortet. Schildern Sie Ihr Vorhaben – es zeigt Ihnen den passenden nächsten Schritt.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/ki-hinweise">
                        <span>KI-Hinweise lesen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/produkte/nex-agentic-aifly">NeX Agentic AIFly kennenlernen</a>
                    </div>
                  </div>
                  <div className={"identity-media"}>
                    <figure className={"identity-hero-photo"}>
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal geht mit NeX und AIFly ORACLE an einer Wand mit gerahmten Entwürfen entlang" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/969916e616ebcc07.webp 800w, /site-assets/9638e03a7436afda.webp 1280w, /site-assets/e15257db84b63793.webp 1920w" src="/site-assets/e15257db84b63793.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-aifly-oracle-oracle-1-0">Ordnung vor der Arbeit<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-aifly-oracle-oracle-2-1">Wer entscheidet was<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-aifly-oracle-oracle-3-2">Was Sie heute auf der Website erleben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-aifly-oracle-oracle-1-0" tabIndex={-1} aria-labelledby="content-aifly-oracle-oracle-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 03</span>
                    <h2 id="content-aifly-oracle-oracle-1-0-title">Ordnung vor der Arbeit</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>AIFly ORACLE zerlegt ein Vorhaben in Aufgaben, ordnet Zuständigkeiten zu und macht sichtbar, was wovon abhängt. So ist klar, was als Nächstes dran ist und wer es erledigt.</p>
                    <p>In Kundenprojekten vereinbaren wir vorab, welche Werkzeuge und Verbindungen AIFly ORACLE nutzt.</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/ki-hinweise">KI-Hinweise lesen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-aifly-oracle-oracle-2-1" tabIndex={-1} aria-labelledby="content-aifly-oracle-oracle-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 03</span>
                    <h2 id="content-aifly-oracle-oracle-2-1-title">Wer entscheidet was</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Fachliche Entscheidungen, technische Änderungen und verbindliche Zusagen haben jeweils eine benannte verantwortliche Person. Das legen wir vor dem Einsatz fest.</p>
                    <p>Verträge, Zahlungen und Zusagen entscheiden Menschen. AIFly ORACLE bereitet vor und ordnet.</p>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-aifly-oracle-oracle-3-2" tabIndex={-1} aria-labelledby="content-aifly-oracle-oracle-3-2-title">
                  <div>
                    <span className={"hc-kicker"}>03 / 03</span>
                    <h2 id="content-aifly-oracle-oracle-3-2-title">Was Sie heute auf der Website erleben</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Im Chat hilft Ihnen AIFly ORACLE, Leistungen und passende Seiten zu finden und Ihre Anfrage vorzubereiten. Es ist ein KI-System, kein Mensch, und kann sich irren.</p>
                    <p>Der Chat schließt keine Verträge, bucht keine Termine und löst keine Zahlungen aus. Ihre Anfrage senden Sie selbst ab.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-aifly-oracle">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-aifly-oracle">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/ki-hinweise">KI-Hinweise lesen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/produkte/nex-agentic-aifly">NeX Agentic AIFly kennenlernen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <button type="button" className={"hc-text-link"}>Terminwunsch nennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                  </div>
                </div>
              </section>
            </div>
          </main>
          <ImportedFooterLassenSieUnsBer />
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
                <a href="/wissen/projekt-vorbereiten">
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
            <a href="/wissen/projekt-vorbereiten">
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
        <label className={"visually-hidden"} htmlFor="locale" id="bb-customSelect-iEy4j-label">Sprache</label>
        <div className={"bb-custom-select-container bb-customSelect bb-is-disabled"}>
          <span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-iEy4j-panel" aria-activedescendant="bb-customSelect-iEy4j-selectedOption" aria-labelledby="bb-customSelect-iEy4j-label">
            <span>DE</span>
          </span>
          <select id="locale" aria-describedby="locale-hint" defaultValue="de">
            <option value="de">DE</option>
            <option value="nl">NL</option>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <div id="bb-customSelect-iEy4j-panel" className={"bb-custom-select-panel"} role="listbox">
            <div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-iEy4j-selectedOption">DE</div>
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
            <label id="bb-customSelect-nX0Xd-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-nX0Xd-panel" aria-activedescendant="bb-customSelect-nX0Xd-selectedOption" aria-labelledby="bb-customSelect-nX0Xd-label" tabIndex={0}><span>Markenstart</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-nX0Xd-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-nX0Xd-selectedOption">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option"} role="option">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
            <button type="button" aria-pressed="false">Begleitung starten</button>
          </div>
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-aifly-oracle">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-aifly-oracle">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/ki-hinweise">KI mit klarer Verantwortung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit. Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine KI-Ausgabe ist keine automatische Entscheidung oder Zusage.</p>
          <a aria-label="KI mit klarer Verantwortung. – Seite ansehen" className={"hc-text-link"} href="/ki-hinweise">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.</p>
          <a aria-label="NeX Agentic AIFly. Der Agent, der ausführt. – Seite ansehen" className={"hc-text-link"} href="/produkte/nex-agentic-aifly">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
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
            <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und Richtung vor; die KI-Agenten NeX und AIFly ORACLE arbeiten aus. Wir nennen das AI FACTORY.</p>
          <a aria-label="Ein Ansprechpartner. Ein Agententeam. – Seite ansehen" className={"hc-text-link"} href="/unternehmen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

function ImportedFooterLassenSieUnsBer() {
  return (
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
                  <a href="#">AIFly ORACLE. Erst ordnen, dann handeln.</a>
                  <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.</a>
                  <a href="/produkte/skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.</a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Wissen und Unternehmen</h3>
                  <a href="/">Ein Gespräch. Ein Projekt, das passt.</a>
                  <a href="/wissen">So arbeiten wir.</a>
                  <a href="/wissen/projekt-vorbereiten">Ihr Briefing in fünf Fragen.</a>
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
  );
}

function ImportedAsideAIFlyORACLE() {
  return (
    <aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties} data-site-import-responsive="239">
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
        <section className={"public-orientation"} aria-label="Was planen Sie?" style={{ "--ca-fuss": "128px" } as CSSProperties} data-site-import-responsive="247">
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
