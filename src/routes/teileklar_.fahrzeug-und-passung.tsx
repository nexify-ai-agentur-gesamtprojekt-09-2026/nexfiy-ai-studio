import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import { FitmentChecklist } from "@/components/site/FitmentChecklist";
import { TyreCalculator } from "@/components/site/TyreCalculator";
import capturedCSS from "../styles/pages/teileklar.fahrzeug-und-passung.css?url";

export const Route = createFileRoute("/teileklar_/fahrzeug-und-passung")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Passt das Teil? So prüfen Sie es. · TEILEKLAR.shop" }, { name: "description", content: "Welche Angaben Sie benötigen, um die Passung eines Fahrzeugteils zu prüfen." }, { property: "og:title", content: "Passt das Teil? So prüfen Sie es. · TEILEKLAR.shop" }, { property: "og:description", content: "Welche Angaben Sie benötigen, um die Passung eines Fahrzeugteils zu prüfen." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept page-tk-fitment layout-commerce context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-fitment">
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
                  <span aria-current="page">Passt das Teil? So prüfen Sie es.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-fitment">Passt das Teil? So prüfen Sie es.</h1>
            <p className={"identity-body"}>Der Modellname allein reicht nicht. Mit Schlüsselnummern, Baujahr und Motor finden Sie heraus, worauf es bei Ihrem Teil ankommt.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar/suche">
                <span>Teilefrage vorbereiten</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/produkt">Artikelangaben vorbereiten</a>
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
        <a href="#content-tk-fitment-tk-fitment-customer-1-0">Ihr Fahrzeug genau benennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-fitment-tk-fitment-customer-2-1">Was die Checkliste leistet<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <FitmentChecklist />
        <TyreCalculator />
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-1-0-title">Ihr Fahrzeug genau benennen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Halten Sie HSN und TSN aus dem Fahrzeugschein bereit, oder Modell, Motor und Baujahr. Eine Herstellernummer vom alten Teil hilft zusätzlich.</p>
            
<h3>Ähnliche Modellnamen reichen nicht</h3>
<p>Motorisierung, Bauzeitraum und Ausführung können unterschiedliche Teile benötigen. Eine Nummer am vorhandenen Bauteil hilft beim Vergleich, muss aber ebenfalls zum Fahrzeug passen. Die Checkliste strukturiert Ihre Angaben und bestätigt keine Kompatibilität.</p>
<div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>TEILEKLAR Hilfe<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/suche">Teil, Marke oder Nummer benennen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-fitment-tk-fitment-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-fitment-tk-fitment-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-fitment-tk-fitment-customer-2-1-title">Was die Checkliste leistet</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Sie zeigt je Teileart, welche Angaben entscheiden und wo der häufigste Irrtum liegt. Eine automatische Prüfung gegen einen Fahrzeugkatalog gibt es noch nicht; im Zweifel fragen Sie eine Werkstatt.</p>
          
<h3>Was der Rechner berechnet</h3>
<p>Der Reifenrechner vergleicht Nennmaße und zeigt Durchmesser, Umfang und Größenänderung. Er prüft weder Tragfähigkeit noch Freigängigkeit oder Zulässigkeit. Die geometrische Rechnung und die Prüfung am konkreten Fahrzeug bleiben getrennte Schritte.</p>
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
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-fitment">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-fitment">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/suche">Teil, Marke oder Nummer benennen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Eine Hersteller-, EAN- oder Artikelnummer hilft bei Ihrer Teilefrage. Halten Sie Fahrzeugdaten bereit; Artikel und Verfügbarkeiten können hier noch nicht abgerufen werden.</p>
            <a aria-label="Teil, Marke oder Nummer benennen. – Seite ansehen" className={"hc-text-link"} href="/teileklar/suche">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/produkt">Angaben für Ihre Teilefrage.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Halten Sie Teilenummer, Fahrzeugausführung und Ihre offene Frage bereit. Diese Seite zeigt keine aktuellen Artikel-, Preis- oder Lieferdaten.</p>
            <a aria-label="Angaben für Ihre Teilefrage. – Seite ansehen" className={"hc-text-link"} href="/teileklar/produkt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Fahrzeug- und Teilehinweise, Reifenvergleich und Anfragevorbereitung. Warenkatalog und Onlinekauf sind hier noch nicht angebunden.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/kategorien">Prüfhinweise nach Teileart.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Wählen Sie eine Teileart für die zugehörigen Prüfhinweise. Die Übersicht ist kein Warenkatalog.</p>
            <a aria-label="Prüfhinweise nach Teileart. – Seite ansehen" className={"hc-text-link"} href="/teileklar/kategorien">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-fitment">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-fitment">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar/suche">Teilefrage vorbereiten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/produkt">Artikelangaben vorbereiten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
