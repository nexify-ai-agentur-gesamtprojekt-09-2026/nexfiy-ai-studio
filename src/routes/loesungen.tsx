import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/loesungen.css?url";

export const Route = createFileRoute("/loesungen")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Kampagne und Zielseite aus einem Guss. · NeXify AI" }, { name: "description", content: "Kampagnenkonzept, Werbemittel und Zielseite gemeinsam entwickeln – mit klarem Budget und vereinbartem Ziel." }, { property: "og:title", content: "Kampagne und Zielseite aus einem Guss. · NeXify AI" }, { property: "og:description", content: "Kampagnenkonzept, Werbemittel und Zielseite gemeinsam entwickeln – mit klarem Budget und vereinbartem Ziel." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-solutions layout-product context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-solutions">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Kampagne und Zielseite aus einem Guss.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Produkte und Lösungen</span>
                    <h1 id="page-title-solutions">Kampagne und Zielseite aus einem Guss.</h1>
                    <p className={"identity-body"}>Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem Ziel, das Sie benennen.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/leistungsumfang">
                        <span>Pakete vergleichen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/kontakt">Vorhaben schildern</a>
                    </div>
                  </div>
                  <div className={"identity-media"}>
                    <figure className={"identity-hero-photo"}>
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal bespricht ein gedrucktes Layout mit einer Gesprächspartnerin im Atelier" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/8568fb99abef6900.webp 800w, /site-assets/66f090cb933250a4.webp 1280w, /site-assets/c819e2179bacd10d.webp 1920w" src="/site-assets/c819e2179bacd10d.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-solutions-solutions-customer-1-0">Was das Paket Wachstum enthält<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-solutions-solutions-customer-2-1">Budget und Auswertung<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-solutions-solutions-customer-1-0" tabIndex={-1} aria-labelledby="content-solutions-solutions-customer-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-solutions-solutions-customer-1-0-title">Was das Paket Wachstum enthält</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Kampagnenkonzept, Texte, Bild- oder Videomotive und die Zielseite. Am Anfang stehen Ihr Angebot, Ihre Zielgruppe und die Reaktion, die Sie erreichen wollen – etwa mehr passende Anfragen.</p>
                    <p>Der Auftrag nennt Kanäle, Formate und Lieferumfang. Weitere Varianten sind Optionen.</p>
                    
<h3>Vom Angebot zur passenden Reaktion</h3>
<p>Soll ein Interessent eine Frage stellen, einen Terminwunsch nennen oder Informationen anfordern? Diese Entscheidung prägt Texte, Motiv und Kontaktweg. Ein klarer Schwerpunkt ist hilfreicher als mehrere konkurrierende Aufforderungen auf derselben Zielseite.</p>
<div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-solutions-solutions-customer-2-1" tabIndex={-1} aria-labelledby="content-solutions-solutions-customer-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-solutions-solutions-customer-2-1-title">Budget und Auswertung</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Medienbudget, Gestaltung und Kampagnenbetreuung vereinbaren Sie getrennt, damit Sie sehen, wohin Ihr Geld geht. Anzeigen starten erst nach Ihrer Freigabe.</p>
                    <p>Welche Messung zulässig und sinnvoll ist, legen wir vor dem Start fest. Ergebnisse hängen von Angebot, Zielgruppe, Wettbewerb und Budget ab; einen bestimmten Erfolg sagen wir nicht zu.</p>
                  
<h3>Ergebnisse im richtigen Zusammenhang lesen</h3>
<p>Anzeigenwerte allein zeigen nicht, ob eine Anfrage zu Ihrem Angebot passt. Angebot, Zielgruppe, Kanal und Budget beeinflussen das Ergebnis gemeinsam. Welche Daten erhoben und wie sie beurteilt werden, muss zum vereinbarten und zulässigen Messumfang passen.</p>
</div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionDerPassendeEinstieg />
              <ImportedSectionKlarheitVorDemErsten />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-solutions">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-solutions">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/leistungsumfang">Pakete vergleichen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
          <GuideNavigation initial="business-growth" />
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
        <a className={"hc-gallery-card"} href="/produkte/nex2fly">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/5764558ff1c73ead.webp 800w, /site-assets/fba47bfd29e56755.webp 1280w, /site-assets/4b45951db0b51136.webp 1920w" src="/site-assets/4b45951db0b51136.webp" />
          </figure>
          <h3>NeX AIFly Suite. Ihr KI-Arbeitsbereich.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen Bereich. Lernen Sie die Suite in einem Test über 24 Stunden kennen.</p>
          <span className={"hc-text-link"}>Mehr erfahren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
        <a className={"hc-gallery-card"} href="/produkte/one">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal im Gespräch mit einer Person in Hygienekleidung an einer Produktionsanlage" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/4651eb82c8a87835.webp 800w, /site-assets/62994bb0701a3e15.webp 1280w, /site-assets/a28276c0cb67aeef.webp 1920w" src="/site-assets/a28276c0cb67aeef.webp" />
          </figure>
          <h3>Zwei Agenten. Eine klare Aufgabe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>AIFly ORACLE ordnet, NeX führt aus: Zusammen übernehmen sie in Ihrem Auftrag benannte Arbeitsschritte – von der Recherche bis zum geprüften Entwurf.</p>
          <span className={"hc-text-link"}>Mehr erfahren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></span>
        </a>
        <a className={"hc-gallery-card"} href="/produkte/api">
          <figure className={"hc-art"}>
            <img sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" width="2000" height="1125" loading="lazy" decoding="async" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" src="/site-assets/df162c342bb041e0.webp" />
          </figure>
          <h3>NeXify API. KI in Ihrer Anwendung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></h3>
          <p>Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die Schnittstelle nach Ihrem Datenfluss; genutzt wird über ein Guthaben, das Sie vorab aufladen.</p>
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
              <p>Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem Ziel, das Sie benennen.</p>
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
              <p>Für Unternehmen, die eine Kampagne auf ein konkretes Angebot und eine passende Zielseite ausrichten möchten.</p>
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
              <p>Botschaft, Werbemittel und Zielseite erzählen dieselbe Geschichte. Gestaltung, Betreuung und Medienbudget bleiben dabei getrennt nachvollziehbar.</p>
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
              <p>Kampagnenkonzept, Texte, Bild- oder Videomotive und die Zielseite. Am Anfang stehen Ihr Angebot, Ihre Zielgruppe und die Reaktion, die Sie erreichen wollen – etwa mehr passende Anfragen.

    Der Auftrag nennt Kanäle, Formate und Lieferumfang. Weitere Varianten sind Optionen. Medienbudget, Gestaltung und Kampagnenbetreuung vereinbaren Sie getrennt, damit Sie sehen, wohin Ihr Geld geht. Anzeigen starten erst nach Ihrer Freigabe.

    Welche Messung zulässig und sinnvoll ist, legen wir vor dem Start fest. Ergebnisse hängen von Angebot, Zielgruppe, Wettbewerb und Budget ab; einen bestimmten Erfolg sagen wir nicht zu.</p>
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
              <p>Benötigt werden ein klares Angebot, freigegebene Inhalte und vereinbarte Kanäle. Anzeigen starten erst nach Freigabe. Reichweite, Anfragen oder Umsatz werden nicht garantiert.</p>
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
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-solutions">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-solutions">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
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
            <a href="/kontakt">Schildern Sie Ihr Vorhaben.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste Schritt aussieht.</p>
          <a aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen" className={"hc-text-link"} href="/kontakt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen Bereich. Lernen Sie die Suite in einem Test über 24 Stunden kennen.</p>
          <a aria-label="NeX AIFly Suite. Ihr KI-Arbeitsbereich. – Seite ansehen" className={"hc-text-link"} href="/produkte/nex2fly">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/one">Zwei Agenten. Eine klare Aufgabe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>AIFly ORACLE ordnet, NeX führt aus: Zusammen übernehmen sie in Ihrem Auftrag benannte Arbeitsschritte – von der Recherche bis zum geprüften Entwurf.</p>
          <a aria-label="Zwei Agenten. Eine klare Aufgabe. – Seite ansehen" className={"hc-text-link"} href="/produkte/one">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

