import type { CSSProperties } from "react";
import { useEffect } from "react";
import { useSyncExternalStore } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/passwort-vergessen.css?raw";

export const Route = createFileRoute("/passwort-vergessen")({
  head: () => ({ meta: [{ title: "Passwort vergessen · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const [activeSlide0, setActiveSlide0] = useState(0);
  const isMobile = useSyncExternalStore(subscribeMobile, () => matchMedia("(max-width: 767px)").matches, () => false);
  useImportedLayout();
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
            <div className={"home-concept page-concept tk-shop nx-konto"}>
              <ImportedSectionPasswortVergessen />
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
                        <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" draggable="false" />
                      </span>
                      <span className={"nx-logo-wort"}>
                        <span className={"nx-logo-name"}>Ne<span className={"nx-logo-x"}>X</span>ify AI</span>
                        <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
                      </span>
                    </span>
                  </a>
                  <p>Websites, digitale Abläufe und Kampagnen für Ihr Unternehmen. Persönlich begleitet von Pascal Courbois.</p>
                  <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Ihr Projekt mit NeXify besprechen{" "}<span aria-hidden="true">→</span></a>
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
                <span className={"footer-claim"}>NeXify AI{" "}<span aria-hidden="true">·</span>{" "}Chat it. Automate it.</span>
                <a className={"footer-crosslink"} href="/teileklar">TEILEKLAR{" "}<span aria-hidden="true">→</span></a>
                <details className={"footer-overview"}>
                  <summary aria-expanded="false" aria-controls="_R_8lbH1_">
                    <span>Seitenübersicht</span>
                    <span className={"footer-overview-marker"} aria-hidden="true">+</span>
                  </summary>
                  <div className={"footer-overview-panel"} id="_R_8lbH1_">
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
                  <summary aria-expanded="false" aria-controls="_R_8lb_">Hinweise zu den Rechtsdokumenten</summary>
                  <div id="_R_8lb_">
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
            <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" draggable="false" />
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
          <summary aria-expanded="false" aria-controls="_R_14lb_-products">Produkte<span className={"navigation-chevron"} aria-hidden="true">⌄</span></summary>
          <div className={"product-navigation-menu"} id="_R_14lb_-products">
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
        <summary aria-label="Menü" aria-expanded="false" aria-controls="_R_14lb_-mobile">
          <span className={"mobile-menu-mark"} aria-hidden="true">
            <i />
            <i />
          </span>
        </summary>
        <nav className={"mobile-navigation-panel"} id="_R_14lb_-mobile" aria-label="Hauptnavigation">
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
        <label className={"visually-hidden"} htmlFor="locale" id="bb-customSelect-sVTt2-label">Sprache</label>
        <div className={"bb-custom-select-container bb-customSelect bb-is-disabled"}>
          <span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-sVTt2-panel" aria-activedescendant="bb-customSelect-sVTt2-selectedOption" aria-labelledby="bb-customSelect-sVTt2-label">
            <span>DE</span>
          </span>
          <select id="locale" aria-describedby="locale-hint" defaultValue="de">
            <option value="de" selected>DE</option>
            <option value="nl">NL</option>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <div id="bb-customSelect-sVTt2-panel" className={"bb-custom-select-panel"} role="listbox">
            <div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-sVTt2-selectedOption">DE</div>
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

function ImportedSectionPasswortVergessen() {
  return (
    <section className={"hc-container nx-konto-buehne"} aria-labelledby="auth-forgot-title">
      <div className={"nx-konto-blatt"}>
        <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
          <ol>
            <li>
              <a href="/">Startseite</a>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span aria-current="page">Passwort vergessen</span>
            </li>
          </ol>
        </nav>
        <h1 id="auth-forgot-title">Passwort vergessen</h1>
        <p className={"nx-konto-lead"}>Ihr Zugang zu persönlichen Vorgängen, Unterlagen und Shop-Bestellungen.</p>
        <form className={"tk-form tk-auth"} noValidate method="post">
          <div className={"tk-field is-wide"}>
            <label htmlFor="auth-email">E-Mail-Adresse</label>
            <input id="auth-email" type="email" autoComplete="email" aria-invalid="false" defaultValue="" />
          </div>
          <button type="submit" className={"nexify-control primary-button hc-finish-primary tk-cta"} data-variant="primary">Link anfordern</button>
          <div className={"tk-actions"}>
            <p><span>Bereits ein Konto?</span> <a href="/anmelden">Zur Anmeldung</a></p>
            <p>
              <a href="/registrieren">Neues Konto erstellen</a>
            </p>
            <p className={"nx-konto-hinweis"}>
              <a href="/datenschutz">Datenschutz</a>
            </p>
          </div>
        </form>
      </div>
      <aside className={"nx-konto-szene"} aria-labelledby="auth-forgot-szene">
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} src="/site-assets/4b45951db0b51136.webp" alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie" aria-hidden="false" width="1280" height="720" />
                <video src="/site-assets/b82843cf77d572df.mp4" poster="/site-assets/4b45951db0b51136.webp" width="1280" height="720" preload="auto" playsInline muted aria-label="Markenszene mit Pascal, NeX und AIFly ORACLE" />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_R_pbsnmlb_-volume">Lautstärke<input id="_R_pbsnmlb_-volume" type="range" min="0" max="1" step="0.05" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className={"nx-konto-nutzen"}>
          <span className={"hc-kicker"} id="auth-forgot-szene">NEXIFY AI<span aria-hidden="true"> / </span>Ihr NeXify-Konto</span>
          <ul>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M3.5 6.5h17v11h-17zM4 7l8 6.5L20 7" /></svg>Persönliche Vorgänge</li>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M3.5 7.5v10h17v-8h-8l-2-2z" /></svg>Unterlagen</li>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M6.5 10.5h11v9h-11zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></svg>Shop-Bestellungen</li>
          </ul>
          <p>Zusätzliche Produkt- und Partnerberechtigungen werden separat freigeschaltet.</p>
        </div>
      </aside>
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
  );
}

function ImportedAsideAIFlyORACLE() {
  return (
    <aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties} data-site-import-responsive="181">
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
        <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className={"sdk-orientation-view"}>
        <section className={"public-orientation"} aria-label="Was planen Sie?" style={{ "--ca-fuss": "128px" } as CSSProperties} data-site-import-responsive="189">
          <div className={"orientation-content"}>
            <div className={"orientation-intro"}>
              <div className={"orientation-host"}>
                <span className={"orientation-host-figure"} aria-hidden="true">
                  <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" />
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


function useImportedLayout() {
  useEffect(() => {
    const loopingVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[loop]:not([autoplay]):not([controls])"),
    )
      .filter((video) => video.muted && !video.closest("[data-site-import-carousel-store]"))
      .slice(0, 32);
    const videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      }
    });
    loopingVideos.forEach((video) => videoObserver.observe(video));
    return () => {
      videoObserver.disconnect();
      loopingVideos.forEach((video) => video.pause());
    };
  }, []);
}

function subscribeMobile(onChange: () => void) {
  const query = matchMedia("(max-width: 767px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
