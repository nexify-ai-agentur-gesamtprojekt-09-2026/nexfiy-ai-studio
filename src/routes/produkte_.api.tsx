import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.api.css?url";

export const Route = createFileRoute("/produkte_/api")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "NeXify API. KI in Ihrer Anwendung. · NeXify AI" }, { name: "description", content: "Informationen zur NeXify API und zur Einbindung von KI-Funktionen in Ihre eigene Anwendung." }, { property: "og:title", content: "NeXify API. KI in Ihrer Anwendung. · NeXify AI" }, { property: "og:description", content: "Informationen zur NeXify API und zur Einbindung von KI-Funktionen in Ihre eigene Anwendung." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-api layout-product context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-api">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">NeXify API. KI in Ihrer Anwendung.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Produkte und Lösungen</span>
                    <h1 id="page-title-api">NeXify API. KI in Ihrer Anwendung.</h1>
                    <p className={"identity-body"}>Ergänzen Sie Ihre eigene Software um KI-Funktionen. Die NeXify API verbindet Ihre Anwendung mit diesen Funktionen; die Nutzung wird über vorab aufgeladenes Guthaben abgerechnet.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/kontakt">
                        <span>API-Anbindung anfragen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/produkte/nex2fly">NeX AIFly Suite ansehen</a>
                    </div>
                  </div>
                  <div className={"identity-media"}>
                    <figure className={"identity-hero-photo"}>
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" src="/site-assets/df162c342bb041e0.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-api-api-customer-1-0">Eine Schnittstelle nach Ihrem Datenfluss<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-api-api-customer-2-1">Nutzung und Kosten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-api-api-customer-1-0" tabIndex={-1} aria-labelledby="content-api-api-customer-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-api-api-customer-1-0-title">Eine Schnittstelle nach Ihrem Datenfluss</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Welche Anwendung sendet welche Anfrage, welches Ergebnis brauchen Sie, und wer darf zugreifen? Daraus beschreiben wir die Schnittstelle mit Datenformaten und Fehlerfällen.</p>
                    <p>Zugang, Berechtigungen und ein nachvollziehbarer Test werden für Ihre Verbindung eingerichtet. Der API-Zugang wird derzeit im Rahmen eines Projekts eingerichtet; diese Seite bietet keine direkte Freischaltung.</p>
                    
<h3>Für eine eigene Anwendung gedacht</h3>
<p>Wenn Ihre Software eine KI-Anfrage auslösen und das Ergebnis weiterverarbeiten soll, ist die API der passende Themenbereich. Dazu gehören Eingabeformat, Rückgabe und der Umgang mit Fehlern. Die öffentliche Beratung erklärt den Einstieg, schaltet aber keinen API-Zugang frei.</p>
<div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-api-api-customer-2-1" tabIndex={-1} aria-labelledby="content-api-api-customer-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-api-api-customer-2-1-title">Nutzung und Kosten</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Die API nutzt Prepaid-Guthaben: Sie laden es vorab auf und verbrauchen es mit Ihren Aufrufen. Ohne ausreichendes Guthaben wird keine API-Anfrage ausgeführt.</p>
                    <p>Die Tarife stehen noch zur Freigabe. Vor der Nutzung vereinbaren wir erwartete Aufrufe, Grenzen und Abrechnung mit Ihnen.</p>
                  
<h3>Verbrauch nicht mit Projektaufwand verwechseln</h3>
<p>Die Einrichtung einer Verbindung und der spätere Modellverbrauch sind unterschiedliche Kostenarten. Prepaid-Guthaben betrifft die Nutzung der API. Die aktuellen Freischaltungsbedingungen und freigegebenen Tarife müssen vor dem produktiven Einsatz geklärt sein.</p>
</div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionKlarheitVorDemErsten />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-api">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-api">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/produkte/nex2fly">NeX AIFly Suite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <button type="button" className={"hc-text-link"}>Angebot anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                    <button type="button" className={"hc-text-link"}>Terminwunsch nennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                    <a className={"hc-text-link"} href="/vertragsgrundlagen">Vertragsgrundlagen lesen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
          <GuideNavigation initial="business-api" />
        </div>
      </details>
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
              <p>Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die Schnittstelle nach Ihrem Datenfluss; genutzt wird über ein Guthaben, das Sie vorab aufladen.</p>
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
              <p>Für Unternehmen mit einer eigenen Anwendung und einer technischen Ansprechperson für Datenformate, Berechtigungen und Integration.</p>
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
              <p>NeXify-Funktionen können gezielt in Ihren Datenfluss eingeordnet werden. Ein definierter Schnittstellenvertrag macht Eingaben, Ergebnisse und Fehlerwege nachvollziehbar.</p>
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
              <p>Welche Anwendung sendet welche Anfrage, welches Ergebnis brauchen Sie, und wer darf zugreifen? Daraus beschreiben wir die Schnittstelle mit Datenformaten und Fehlerfällen.

    Zugang, Berechtigungen und ein nachvollziehbarer Test werden für Ihre Verbindung eingerichtet. Den Zugang erhalten Sie im Rahmen eines Projekts, nicht über diese Seite. Die API ist als Prepaid-Angebot angelegt: Sie laden Guthaben auf und verbrauchen es mit Ihren Aufrufen. Ohne Deckung wird keine Anfrage ausgeführt, damit keine Kosten entstehen, die Sie nicht erwarten.

    Die Tarife stehen noch zur Freigabe. Vor der Nutzung vereinbaren wir erwartete Aufrufe, Grenzen und Abrechnung mit Ihnen.</p>
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
              <p>Zugang, Umfang und Verbrauch stehen in Ihrem Produktangebot; die Tarife stehen noch zur Freigabe. Individuelle Integrationsarbeit bieten wir nach dem vereinbarten Umfang an.</p>
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
              <p>Zugang, nutzbare Endpunkte, Limits und Abrechnung werden separat vereinbart. Die öffentliche Produktseite ist kein Nachweis, dass jede beschriebene Funktion bereits als API verfügbar ist.</p>
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
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-api">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-api">Passende Themen</h2>
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
            <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen Bereich. Lernen Sie die Suite in einem Test über 24 Stunden kennen.</p>
          <a aria-label="NeX AIFly Suite. Ihr KI-Arbeitsbereich. – Seite ansehen" className={"hc-text-link"} href="/produkte/nex2fly">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
            <a href="/loesungen">Kampagne und Zielseite aus einem Guss.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem Ziel, das Sie benennen.</p>
          <a aria-label="Kampagne und Zielseite aus einem Guss. – Seite ansehen" className={"hc-text-link"} href="/loesungen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

