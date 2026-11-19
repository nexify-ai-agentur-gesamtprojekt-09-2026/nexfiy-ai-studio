import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/impressum.css?url";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/impressum")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }, canonicalLink("/impressum") ], meta: [{ title: "Impressum · NeXify AI by NeXify · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-imprint layout-document context-nexify"}>
              <section className={"identity-hero is-text-only"} aria-labelledby="page-title-imprint">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Impressum · NeXify AI by NeXify</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht</span>
                    <h1 id="page-title-imprint">Impressum · NeXify AI by NeXify</h1>
                    <p className={"identity-body"}>Anbieter dieser Website ist NeXify AI by NeXify, Inhaber Pascal Courbois, eine Eenmanszaak nach niederländischem Recht mit Anschrift in Venlo.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/kontakt">
                        <span>Mit NeXify Kontakt aufnehmen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/vertragsgrundlagen">Vereinbarung und Leistungsumfang</a>
                    </div>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-imprint-ueberblick-0">Diensteanbieter<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-imprint-betreiber-1">Kontakt<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-imprint-registerangaben-2">Registerangaben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-imprint-ueberblick-0" tabIndex={-1} aria-labelledby="content-imprint-ueberblick-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 03</span>
                    <h2 id="content-imprint-ueberblick-0-title">Diensteanbieter</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>NeXify AI by NeXify, Inhaber Pascal Courbois, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande. Rechtsform: Eenmanszaak nach niederländischem Recht.</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/kontakt">Ihr Projekt an die Factory<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-imprint-betreiber-1" tabIndex={-1} aria-labelledby="content-imprint-betreiber-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 03</span>
                    <h2 id="content-imprint-betreiber-1-title">Kontakt</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>E-Mail: hello@nexifyai.cloud. Telefon: +31 6 133 188 56. Web: www.nexifyai.de.</p>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-imprint-registerangaben-2" tabIndex={-1} aria-labelledby="content-imprint-registerangaben-2-title">
                  <div>
                    <span className={"hc-kicker"}>03 / 03</span>
                    <h2 id="content-imprint-registerangaben-2-title">Registerangaben</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Handelsregister: Kamer van Koophandel, KvK-Nummer 90483944. Umsatzsteuer-Identifikationsnummer: NL865786276B01. Inhaber und verantwortlich: Pascal Courbois.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container is-plain"} aria-labelledby="finish-title-imprint">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Weiterführende Seiten</span>
                  <h2 id="finish-title-imprint">Weiterführende Seiten</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/kontakt">Mit NeXify Kontakt aufnehmen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/vertragsgrundlagen">Vereinbarung und Leistungsumfang<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                  </div>
                </div>
              </section>
            </div>
    </NexifyShell>
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
            <label id="bb-customSelect-qyf6P-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-qyf6P-panel" aria-activedescendant="bb-customSelect-qyf6P-selectedOption" aria-labelledby="bb-customSelect-qyf6P-label" tabIndex={0}><span>Markenstart</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-qyf6P-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-qyf6P-selectedOption">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option"} role="option">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
            <button type="button" aria-pressed="false">Begleitung starten</button>
          </div>
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-imprint">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-imprint">Passende Themen</h2>
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
            <a href="/vertragsgrundlagen">Gute Zusammenarbeit hat klare Grundlagen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Marke, Website, KI und Betreuung gehören zu einem abgestimmten Auftrag. Den verbindlichen Umfang legt die bestätigte Vereinbarung fest. Die Vertragsunterlagen bleiben bis zur gesonderten Endprüfung Entwürfe.</p>
          <a aria-label="Gute Zusammenarbeit hat klare Grundlagen. – Seite ansehen" className={"hc-text-link"} href="/vertragsgrundlagen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/datenschutz">Ihre Daten. Ein klarer Zweck.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen und Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt auszuweisen. Die vollständige Datenschutzerklärung ist noch in Prüfung.</p>
          <a aria-label="Ihre Daten. Ein klarer Zweck. – Seite ansehen" className={"hc-text-link"} href="/datenschutz">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/ki-hinweise">KI mit klarer Verantwortung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit. Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine KI-Ausgabe ist keine automatische Entscheidung oder Zusage.</p>
          <a aria-label="KI mit klarer Verantwortung. – Seite ansehen" className={"hc-text-link"} href="/ki-hinweise">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

