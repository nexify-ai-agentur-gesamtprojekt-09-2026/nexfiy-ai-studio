import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import { TyreCalculator } from "@/components/site/TyreCalculator";
import capturedCSS from "../styles/pages/teileklar.reifenrechner.css?url";

export const Route = createFileRoute("/teileklar_/reifenrechner")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Reifengrößen vergleichen. · TEILEKLAR.shop" }, { name: "description", content: "Informationen zum Vergleich von Reifengrößen bei TEILEKLAR." }, { property: "og:title", content: "Reifengrößen vergleichen. · TEILEKLAR.shop" }, { property: "og:description", content: "Informationen zum Vergleich von Reifengrößen bei TEILEKLAR." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
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
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-1-0">Drei Zahlen, ein Reifen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-reifenrechner-tk-reifenrechner-customer-2-1">Erlaubt ist, was in den Papieren steht<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className="hc-container pc-supplement"><TyreCalculator /></section>
<div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-reifenrechner-tk-reifenrechner-customer-1-0-title">Drei Zahlen, ein Reifen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Breite und Querschnitt bestimmen die Höhe der Flanke, der Felgendurchmesser die Größe. Ändern Sie eine Zahl, ändert sich der Abrollumfang – das ist mehr als eine Frage der Optik.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>TEILEKLAR Hilfe<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
            <GuideNavigation />
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
              <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <a aria-label="Passt das Teil? So prüfen Sie es. – Seite ansehen" className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Am sichersten finden Sie Ihr Teil über eine Nummer: Herstellernummer, EAN oder Artikelnummer. Sie können auch nach Bezeichnung oder Marke suchen.</p>
            <a aria-label="Teil, Marke oder Nummer suchen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Sie wissen, was Sie brauchen, aber nicht, wie es heißt? Stöbern Sie nach Teileart – von Zubehör bis Pflege.</p>
            <a aria-label="Alle Kategorien auf einen Blick. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
            <a className={"hc-finish-primary"} href="/teileklar/fahrzeug-und-passung">Passung prüfen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/suche">Teile suchen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
