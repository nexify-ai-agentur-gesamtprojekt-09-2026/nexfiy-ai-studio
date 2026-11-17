import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/preise-ablauf.css?url";
import impeccableCSS from "../styles/impeccable.css?url";

export const Route = createFileRoute("/preise-ablauf")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }, { rel: "stylesheet", href: impeccableCSS }], meta: [{ title: "Sie kennen die Kosten vor dem Start. · NeXify AI" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-pricing layout-product context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-pricing">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Sie kennen die Kosten vor dem Start.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Produkte und Lösungen</span>
                    <h1 id="page-title-pricing">Sie kennen die Kosten vor dem Start.</h1>
                    <p className={"identity-body"}>Vor jedem Auftrag steht ein Angebot mit abgegrenztem Umfang. Entwicklung, Betreuung danach und externe Kosten sind getrennt ausgewiesen.</p>
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
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal erläutert Unterlagen am Besprechungstisch, begleitet von NeX und AIFly ORACLE" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/473f72e3022cee69.webp 800w, /site-assets/51e21ce2ea9575ee.webp 1280w, /site-assets/9c2f1ce694c2ed13.webp 1920w" src="/site-assets/9c2f1ce694c2ed13.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-pricing-pricing-customer-1-0">Drei Kostenarten, klar getrennt<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-pricing-pricing-customer-2-1">Ihr Budget bestimmt den Einstieg<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-pricing-pricing-customer-1-0" tabIndex={-1} aria-labelledby="content-pricing-pricing-customer-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-pricing-pricing-customer-1-0-title">Drei Kostenarten, klar getrennt</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Entwicklung: Konzept, Texte, Gestaltung und Technik für das vereinbarte Ergebnis – einmalig.</p>
                    <p>Betreuung danach: Pflege und Weiterentwicklung, wenn Sie sie wünschen.</p>
                    <p>Externe Kosten: Hosting, Software, KI-Nutzung und Werbebudget, offen ausgewiesen statt im Projektpreis versteckt.</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>Pascal<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-pricing-pricing-customer-2-1" tabIndex={-1} aria-labelledby="content-pricing-pricing-customer-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-pricing-pricing-customer-2-1-title">Ihr Budget bestimmt den Einstieg</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Sind Budget oder Zeit begrenzt, legen wir gemeinsam fest, welches Ergebnis Sie zuerst brauchen. Daraus wird ein abgegrenzter Einstieg; alles Weitere steht als Option daneben.</p>
                    <p>Sie entscheiden auf Grundlage des Angebots. Zusätzliche Arbeit stimmen wir mit Ihnen ab, bevor sie entsteht.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionDerPassendeEinstieg />
              <ImportedSectionKlarheitVorDemErsten />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-pricing">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-pricing">Wie möchten Sie fortfahren?</h2>
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
            <label id="bb-customSelect-EfmHf-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-EfmHf-panel" aria-activedescendant="bb-customSelect-EfmHf-selectedOption" aria-labelledby="bb-customSelect-EfmHf-label" tabIndex={0}><span>Markenstart</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-EfmHf-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-EfmHf-selectedOption">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option"} role="option">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
            <button type="button" aria-pressed="false">Begleitung starten</button>
          </div>
        </div>
      </details>
    </section>
  );
}

function ImportedSectionDerPassendeEinstieg() {
  return (
    <section className={"hc-section hc-container hc-product-story"} aria-labelledby="page-showcase-title">
      <header className={"hc-section-heading"}>
        <div>
          <span className={"hc-kicker"}>Ihr nächster Schritt</span>
          <h2 id="page-showcase-title">Der passende Einstieg.</h2>
        </div>
        <p>Wählen Sie den Bereich, der zu Ihrem Vorhaben passt. Umfang, Ablauf und nächste Schritte finden Sie auf der jeweiligen Seite.</p>
      </header>
      <nav className={"hc-gallery"} aria-label="Der passende Einstieg.">
        <a className={"hc-gallery-card"} href="/leistungsumfang">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal hört einer Person am Besprechungstisch zu; NeX und AIFly ORACLE begleiten das Gespräch" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/70809ce466d6c39a.webp 800w, /site-assets/1870403fa2b90dde.webp 1280w, /site-assets/3c8726341a94b928.webp 1920w" src="/site-assets/3c8726341a94b928.webp" />
          </figure>
          <h3>Drei Pakete. Ein klarer Umfang.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit benannten Ergebnissen, wählbaren Optionen und Kosten, die Sie vor dem Start kennen.</p>
          <span className={"hc-text-link"}>Mehr erfahren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
        <a className={"hc-gallery-card"} href="/leistungen">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal mit Layouttafeln, Modellen, NeX und AIFly ORACLE im Atelier" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/05d4134e5686af4f.webp 800w, /site-assets/55d521535e5fc86c.webp 1280w, /site-assets/5b8e74b98d950c05.webp 1920w" src="/site-assets/5b8e74b98d950c05.webp" />
          </figure>
          <h3>Website, System, Kampagne. Aus einer Hand.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Drei Leistungsfelder, ein Ansprechpartner: Wir bauen Ihren Auftritt, entlasten Ihre Abläufe und bringen Ihr Angebot zu den richtigen Kunden. Sie wählen, wo wir anfangen.</p>
          <span className={"hc-text-link"}>Mehr erfahren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
        <a className={"hc-gallery-card"} href="/kontakt">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/ccf9a769cd5529fd.webp 800w, /site-assets/5815f36894bbd987.webp 1280w, /site-assets/05c51cdebbdd2aa6.webp 1920w" src="/site-assets/05c51cdebbdd2aa6.webp" />
          </figure>
          <h3>Schildern Sie Ihr Vorhaben.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste Schritt aussieht.</p>
          <span className={"hc-text-link"}>Mehr erfahren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
      </nav>
    </section>
  );
}

function ImportedSectionKlarheitVorDemErsten() {
  return (
    <section className={"hc-section hc-container hc-service-story"} aria-labelledby="page-questions-title">
      <div className={"hc-service-layout"}>
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Acht Fragen zu Ihrem Vorhaben</span>
          <h2 id="page-questions-title">Klarheit vor dem ersten Schritt.</h2>
          <p>Die Antworten beschreiben Umfang, Ablauf und Grenzen – damit Sie Ihr Vorhaben sicher einordnen können.</p>
          <a className={"hc-text-link"} href="/kontakt">Vorhaben beschreiben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </header>
        <div className={"hc-service-list"}>
          <details className={"hc-service-detail"} open>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was ist es?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Vor jedem Auftrag steht ein Angebot mit abgegrenztem Umfang. Entwicklung, Betreuung danach und externe Kosten sind getrennt ausgewiesen.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Für wen ist es geeignet?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Für Unternehmen, die ein Vorhaben planen und Projektkosten von laufender Betreuung und Verbrauch trennen möchten.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Welchen Nutzen haben Sie?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Sie können den Einstieg priorisieren und Erweiterungen bewusst wählen. Externe Kosten werden nicht als Bestandteil eines unklaren Pauschalpreises versteckt.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was gehört dazu?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Entwicklung: Konzept, Texte, Gestaltung und Technik für das vereinbarte Ergebnis – einmalig.

    Betreuung danach: Pflege und Weiterentwicklung, wenn Sie sie wünschen.

    Externe Kosten: Hosting, Software, KI-Nutzung und Werbebudget, offen ausgewiesen statt im Projektpreis versteckt. Sind Budget oder Zeit begrenzt, legen wir gemeinsam fest, welches Ergebnis Sie zuerst brauchen. Daraus wird ein abgegrenzter Einstieg; alles Weitere steht als Option daneben.

    Sie entscheiden auf Grundlage des Angebots. Zusätzliche Arbeit stimmen wir mit Ihnen ab, bevor sie entsteht.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Wie läuft es ab?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Sie beschreiben Ihr Vorhaben. Pascal klärt Ziel, vorhandene Grundlagen und Umfang mit Ihnen. Danach folgen Angebot, Ihre Freigabe, Umsetzung, Prüfung und Übergabe. Laufende Betreuung wird separat vereinbart.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was kostet es?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Der Aufwand und die Kosten werden für Ihr Vorhaben im Angebot festgelegt. Hosting, Software, KI-Verbrauch und gegebenenfalls Medienbudget werden separat ausgewiesen.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Welche Voraussetzungen und Grenzen gelten?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Der Tagessatz ist kein Gesamtpreis. Benötigte Tage, Fremdkosten, Steuern und laufende Leistungen werden im konkreten Angebot ausgewiesen.</p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was können Sie jetzt tun?</strong>
              </span>
              <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>Beschreiben Sie Ihr Vorhaben über das Kontaktformular. Nennen Sie Ziel, vorhandene Systeme und Ihre wichtigste Frage. Sie erhalten eine Vorgangsnummer; die Anfrage ist noch keine Beauftragung.</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-pricing">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-pricing">Passende Themen</h2>
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
            <a href="/loesungen">Kampagne und Zielseite aus einem Guss.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem Ziel, das Sie benennen.</p>
          <a aria-label="Kampagne und Zielseite aus einem Guss. – Seite ansehen" className={"hc-text-link"} href="/loesungen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen Bereich. Lernen Sie die Suite in einem Test über 24 Stunden kennen.</p>
          <a aria-label="NeX AIFly Suite. Ihr KI-Arbeitsbereich. – Seite ansehen" className={"hc-text-link"} href="/produkte/nex2fly">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

