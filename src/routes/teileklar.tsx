import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { SiteFilm } from "@/components/SiteFilm";
import capturedCSS from "../styles/pages/teileklar.css?url";

export const Route = createFileRoute("/teileklar")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }, { rel: "preload", as: "image", href: "/site-assets/506495187c091a6f.webp", fetchPriority: "high" }],
    meta: [
      { title: "TEILEKLAR.shop – Zubehör für Auto & Motorrad" },
      { name: "description", content: "Passende Teile und Zubehör für Auto und Motorrad – mit klaren Angaben zu Fahrzeug, Passung und Werkstatt." },
      { property: "og:title", content: "TEILEKLAR.shop – Zubehör für Auto & Motorrad" },
      { property: "og:description", content: "Passende Teile und Zubehör für Auto und Motorrad – mit klaren Angaben zu Fahrzeug, Passung und Werkstatt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "de", "data-theme": "dark", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero"} aria-labelledby="storefront-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <span className={"hc-kicker"}>TEILEKLAR.shop<span aria-hidden="true"> / </span>AUTO &amp; MOTORRAD</span>
            <h1 id="storefront-title">
              <span>Für Ihr Auto. </span>
              <span className={"identity-title-accent"}>Klar gefunden.</span>
            </h1>
            <p className={"identity-body"}>Vom praktischen Zubehör bis zur Pflege: Entdecken Sie unser Sortiment. Mit Originalfotos, nachvollziehbaren Preisen und klaren Produktangaben.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="#sortiment">
                <span>Sortiment entdecken</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/fahrzeug-und-passung">Passt der Artikel zu meinem Fahrzeug?</a>
            </div>
          </div>
          <div className={"identity-media"}>
            <figure className={"identity-hero-photo"}>
<SiteFilm film="teileklar" eager />
</figure>
          </div>
        </div>
      </section>
      <section className={"hc-container tk-shopping-points"} aria-label="Einkaufsinformationen">
        <div>
          <span>01</span>
          <p>
            <strong>Preise inklusive MwSt.</strong>
          </p>
          <p className={"hc-caption"}>Versandkosten vor Bestellabschluss</p>
        </div>
        <div>
          <span>02</span>
          <p>
            <strong>Sichere Zahlungsseite</strong>
          </p>
          <p className={"hc-caption"}>Bezahlung über Revolut</p>
        </div>
        <div>
          <span>03</span>
          <p>
            <strong>Erst prüfen, dann bestellen</strong>
          </p>
          <p className={"hc-caption"}>Keine ungeprüfte Passformzusage</p>
        </div>
      </section>
      <section className={"hc-section hc-container tk-window-selection"} id="sortiment">
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Aus dem Sortiment</span>
          <h2>Artikel im Schaufenster</h2>
        </header>
        <div className={"tk-empty"} role="status">
          <p>Das Schaufenster wird gerade neu bestückt. Bis dahin finden Sie hier die passende Werkstatt oder schreiben uns direkt, welches Teil Sie suchen.</p>
          <div className={"identity-links"}>
            <a className={"nexify-control primary-button"} data-variant="primary" href="/teileklar/werkstatt">Werkstatt finden</a>
            <a className={"nexify-control secondary-button"} data-variant="secondary" href="/kontakt">Teil anfragen</a>
          </div>
        </div>
      </section>
      <section className={"hc-section hc-budget hc-container"}>
        <div className={"hc-budget-story"}>
          <header className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Vor dem Kauf</span>
            <h2>Gut informiert.<br />Klar entschieden.</h2>
            <p>Vergleichen Sie Artikelnummer und Herstellerangaben. Ein Produktfoto allein bestätigt keine Fahrzeugpassung.</p>
            <a className={"hc-text-link"} href="/teileklar/fahrzeug-und-passung">Zur Passform-Checkliste<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </header>
          <div className={"hc-costs"}>
            <div>
              <h3>So bestellen Sie</h3>
              <div className={"hc-service-body"}>
                <ol>
                  <li>Artikel auswählen und Angaben prüfen</li>
                  <li>Menge festlegen und zum Warenkorb hinzufügen</li>
                  <li>Lieferadresse, Versand und Gesamtpreis prüfen</li>
                  <li>Bestellung bestätigen und sicher bezahlen</li>
                </ol>
                <a className={"hc-text-link"} href="/teileklar/rechtliches">Versand, Widerruf und Bedingungen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <details className={"hc-container tk-source-disclosure"}>
        <summary>Datenstand und Lieferanteninformationen</summary>
      </details>
    </div>
  </NexifyShell>;
}
