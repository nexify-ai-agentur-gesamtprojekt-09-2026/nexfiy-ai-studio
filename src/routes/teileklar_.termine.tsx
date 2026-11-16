import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import capturedCSS from "../styles/pages/teileklar.termine.css?url";

export const Route = createFileRoute("/teileklar_/termine")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Termin? Direkt bei der Werkstatt. · TEILEKLAR.shop" }, { name: "description", content: "Informationen zur direkten Terminvereinbarung mit Ihrer Werkstatt." }, { property: "og:title", content: "Termin? Direkt bei der Werkstatt. · TEILEKLAR.shop" }, { property: "og:description", content: "Informationen zur direkten Terminvereinbarung mit Ihrer Werkstatt." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept page-tk-appointments layout-workshop context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-appointments">
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
                  <span aria-current="page">Termin? Direkt bei der Werkstatt.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Werkstatt und Zusammenarbeit</span>
            <h1 id="page-title-tk-appointments">Termin? Direkt bei der Werkstatt.</h1>
            <p className={"identity-body"}>Online-Terminbuchung gibt es bei TEILEKLAR noch nicht. Sie finden eine Werkstatt in Ihrer Nähe und vereinbaren den Termin direkt – oder nennen uns Ihren Wunsch.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/werkstatt">
                <span>Werkstatt finden</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/partner-werden">Partner werden</a>
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
        <a href="#content-tk-appointments-tk-appointments-customer-1-0">Das braucht die Werkstatt von Ihnen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-appointments-tk-appointments-customer-2-1">Den Termin bestätigt der Betrieb<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <InquiryForm kind="appointment" title="Terminwunsch senden" companyLabel="Unternehmen" privacyHref="/datenschutz" messageLabel="Fahrzeug, gewünschte Arbeit und Zeitraum" successTitle="Ihr Terminwunsch ist eingegangen." successBody="Ihre Angaben sind gespeichert. Das ist noch keine Buchung: Werkstatt, Umfang, Preis und Zeitpunkt werden Ihnen erst nach Rücksprache bestätigt." initialMessage="Fahrzeug, Baujahr und Motor: 
Gewünschte Arbeit: 
Ort und möglicher Zeitraum: 
Vorhandenes Teil und offene Fragen: " />
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-appointments-tk-appointments-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-appointments-tk-appointments-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-appointments-tk-appointments-customer-1-0-title">Das braucht die Werkstatt von Ihnen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Welche Arbeit, welches Fahrzeug, welcher Zeitraum? Nennen Sie auch das Teil, wenn Sie es schon haben. Je genauer die Anfrage, desto weniger Rückfragen.</p>
            
<h3>Die Anfrage möglichst eindeutig vorbereiten</h3>
<p>Nennen Sie Fahrzeug, gewünschte Arbeit und einen Zeitraum. Teilen Sie mit, ob Sie bereits ein Ersatzteil haben und welche Frage vor dem Termin offen ist. Das Formular bereitet eine Nachricht vor; es reserviert keinen Werkstatttermin.</p>
<div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>Pascal<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-appointments-tk-appointments-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-appointments-tk-appointments-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-appointments-tk-appointments-customer-2-1-title">Den Termin bestätigt der Betrieb</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Umfang, Preis und Termin vereinbaren Sie mit der Werkstatt. Verbindlich ist ihre Zusage.</p>
          
<h3>Was verbindlich werden muss</h3>
<p>Werkstatt, Leistungsumfang, Preis und Zeitpunkt müssen vom Betrieb bestätigt werden. Ein gesendeter Terminwunsch ist keine Terminbestätigung. Ein Werkstattverzeichnis ist hier noch nicht angebunden; die Suche kann Ihnen stattdessen den Weg zu einer externen Kartensuche öffnen.</p>
</div>
        </section>
      </div>
      <section className={"hc-container pc-guide"} aria-label="TEILEKLAR · Fahrzeug, Werkstatt und Hinweise">
        <details className={"hc-service-detail"}>
          <summary>
            <span>
              <strong className={"hc-service-name"}>TEILEKLAR · Fahrzeug, Werkstatt und Hinweise</strong>
            </span>
            <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12h14m-7-7v14" />
            </svg>
          </summary>
          <div className={"hc-service-body"}>
            <p>Fahrzeugangaben, Werkstattsuche und Gutschein-Hinweise bleiben getrennte Themen.</p>
            <GuideNavigation brand="teileklar" />
          </div>
        </details>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-appointments">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-appointments">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Bereiten Sie eine externe Kartensuche mit PLZ oder Ort vor. Ein eigenes Werkstattverzeichnis ist hier nicht angebunden.</p>
            <a aria-label="Eine Werkstatt in Ihrer Nähe. – Seite ansehen" className={"hc-text-link"} href="/teileklar/werkstatt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Stellen Sie Ihren Betrieb und Ihre Leistungen vor, um eine mögliche Zusammenarbeit zu besprechen. Die Anfrage aktiviert keinen Partnerzugang und vermittelt keine Aufträge.</p>
            <a aria-label="Werkstatt? Werden Sie Partner. – Seite ansehen" className={"hc-text-link"} href="/teileklar/partner-werden">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-appointments">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-appointments">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/werkstatt">Werkstatt finden<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/partner-werden">Partner werden<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Terminwunsch nennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
