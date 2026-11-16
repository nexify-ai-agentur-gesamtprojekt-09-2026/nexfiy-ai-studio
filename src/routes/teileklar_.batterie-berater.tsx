import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import capturedCSS from "../styles/pages/teileklar.batterie-berater.css?url";

export const Route = createFileRoute("/teileklar_/batterie-berater")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Die passende Batterie finden. · TEILEKLAR.shop" }, { name: "description", content: "Informationen zur passenden Fahrzeugbatterie und den benötigten Fahrzeugangaben bei TEILEKLAR." }, { property: "og:title", content: "Die passende Batterie finden. · TEILEKLAR.shop" }, { property: "og:description", content: "Informationen zur passenden Fahrzeugbatterie und den benötigten Fahrzeugangaben bei TEILEKLAR." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept page-tk-batterie layout-commerce context-teileklar"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="page-title-tk-batterie">
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
                  <span aria-current="page">Die passende Batterie finden.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-batterie">Die passende Batterie finden.</h1>
            <p className={"identity-body"}>Eine Starterbatterie muss zur Technik Ihres Fahrzeugs passen: Kapazität, Bauform und – bei Start-Stopp – die richtige Technologie.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/fahrzeug-und-passung">
                <span>Passung prüfen</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/termine">Termin anfragen</a>
            </div>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-batterie-tk-batterie-customer-1-0">Mehr als Startstrom<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-batterie-tk-batterie-customer-2-1">Den Wechsel vorbereiten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-batterie-tk-batterie-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-batterie-tk-batterie-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-batterie-tk-batterie-customer-1-0-title">Mehr als Startstrom</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Maße, Befestigung und Lage der Pole müssen stimmen. Fahrzeuge mit Start-Stopp brauchen eine EFB- oder AGM-Batterie; eine Batterie mit falscher Technologie kann vorzeitig altern.</p>
            
<h3>Vor dem Vergleich die vorhandenen Angaben prüfen</h3>
<p>Notieren Sie die Daten der vorhandenen Batterie und die Fahrzeugausführung. Kapazität allein reicht nicht: Bauform, Pole und Technologie müssen zusammenpassen. Die Hinweise dieser Seite ersetzen keine fahrzeugspezifische Herstellerfreigabe.</p>
<div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>TEILEKLAR Hilfe<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-batterie-tk-batterie-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-batterie-tk-batterie-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-batterie-tk-batterie-customer-2-1-title">Den Wechsel vorbereiten</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Bei manchen Fahrzeugen muss die neue Batterie angemeldet werden. Klären Sie das mit einer Werkstatt, bevor Sie bestellen. Einen Batterie-Berater gibt es bei TEILEKLAR noch nicht; die Checkliste zur Passung zeigt, welche Angaben zählen.</p>
          
<h3>Einbau und Anmeldung getrennt klären</h3>
<p>Ob eine neue Batterie am Fahrzeug angemeldet werden muss, hängt von der konkreten Ausführung ab. Beschreiben Sie Fahrzeug und Batterie in Ihrer Werkstattanfrage. Eine automatische Batterieauswahl steht hier nicht bereit.</p>
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
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-batterie">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-batterie">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <a aria-label="Passt das Teil? So prüfen Sie es. – Seite ansehen" className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Online-Terminbuchung gibt es bei TEILEKLAR noch nicht. Sie finden eine Werkstatt in Ihrer Nähe und vereinbaren den Termin direkt – oder nennen uns Ihren Wunsch.</p>
            <a aria-label="Termin? Direkt bei der Werkstatt. – Seite ansehen" className={"hc-text-link"} href="/teileklar/termine">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Katalog für Auto und Motorrad, Prüfhinweise, Reifenvergleich und Teileanfrage. Bestellung und Bezahlung sind hier noch nicht freigeschaltet.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer benennen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Eine Hersteller-, EAN- oder Artikelnummer hilft bei Ihrer Teilefrage. Halten Sie Fahrzeugdaten bereit; Artikel und Verfügbarkeiten können hier noch nicht abgerufen werden.</p>
            <a aria-label="Teil, Marke oder Nummer benennen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-batterie">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-batterie">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/fahrzeug-und-passung">Passung prüfen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/termine">Termin anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
