import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import capturedCSS from "../styles/pages/teileklar.gutscheine.css?url";

export const Route = createFileRoute("/teileklar_/gutscheine")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Gutscheine gibt es noch nicht. · TEILEKLAR.shop" }, { name: "description", content: "Der aktuelle Stand zu Gutscheinen und Gutscheinbedingungen bei TEILEKLAR." }, { property: "og:title", content: "Gutscheine gibt es noch nicht. · TEILEKLAR.shop" }, { property: "og:description", content: "Der aktuelle Stand zu Gutscheinen und Gutscheinbedingungen bei TEILEKLAR." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept page-tk-vouchers layout-commerce context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-vouchers">
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
                  <span aria-current="page">Gutscheine gibt es noch nicht.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Teile, Fahrzeug und nächste Schritte</span>
            <h1 id="page-title-tk-vouchers">Gutscheine gibt es noch nicht.</h1>
            <p className={"identity-body"}>Bei TEILEKLAR können Sie zurzeit keine Gutscheine kaufen oder einlösen. Wenn Sie eine Frage zu einem Gutschein haben, schreiben Sie uns.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar">
                <span>Zu TEILEKLAR</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/rechtliches">Rechtliches lesen</a>
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
        <a href="#content-tk-vouchers-tk-vouchers-customer-1-0">Woran Sie einen Gutschein erkennen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-vouchers-tk-vouchers-customer-2-1">Einlösen beim Aussteller<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <InquiryForm kind="voucher" title="Gutscheinfrage vorbereiten" companyLabel="Unternehmen" privacyHref="/datenschutz" messageLabel="Aussteller, Leistung und Ihre Frage" />
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-vouchers-tk-vouchers-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-vouchers-tk-vouchers-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-vouchers-tk-vouchers-customer-1-0-title">Woran Sie einen Gutschein erkennen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Zu jedem Gutschein gehören Leistung, Gültigkeit und Einlösebedingungen. Ein Code ohne diese Angaben ist kein Anspruch.</p>
            
<h3>Diese Angaben vor der Nutzung klären</h3>
<p>Wer stellt den Gutschein aus? Für welche Leistung gilt er, bis wann und mit welchen Ausschlüssen? Lassen Sie unklare Angaben beim Aussteller bestätigen. Auf dieser Seite wird weder ein Guthaben geführt noch ein Gutscheinverkauf ausgelöst.</p>
<div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>TEILEKLAR Hilfe<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-vouchers-tk-vouchers-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-vouchers-tk-vouchers-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-vouchers-tk-vouchers-customer-2-1-title">Einlösen beim Aussteller</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Ob ein Gutschein gültig oder schon eingelöst ist, weiß sein Aussteller. Diese Seite zeigt keinen Stand zu einem Guthaben.</p>
          
<h3>Eine Frage zum Gutschein vorbereiten</h3>
<p>Nennen Sie Aussteller, Leistung und Ihre offene Frage. Vollständige Zahlungsdaten oder andere vertrauliche Angaben sind dafür nicht nötig. Die Anfrage wird als E-Mail vorbereitet; sie löst keine Einlösung oder Buchung aus.</p>
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
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-vouchers">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-vouchers">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
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
              <a href="/teileklar/rechtliches">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Handel und Werkstattservice brauchen eigene Anbieter-, Datenschutz- und Kaufunterlagen. Deren vollständige Freigabe steht aus; diese Übersicht bestätigt keine bereits geltenden Kaufbedingungen.</p>
            <a aria-label="TEILEKLAR. Bedingungen mit eindeutiger Zuordnung. – Seite ansehen" className={"hc-text-link"} href="/teileklar/rechtliches">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>NEXIFY AI</span>
            <h3>
              <a href="/anmelden">Anmelden und weiterarbeiten.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Die Anmeldung gilt für das NeXify-Websitekonto. Sie schaltet weder Suite noch TEILEKLAR-Bestellungen oder Partnerfunktionen frei.</p>
            <a aria-label="Anmelden und weiterarbeiten. – Seite ansehen" className={"hc-text-link"} href="/anmelden">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-vouchers">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-vouchers">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar">Zu TEILEKLAR<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/rechtliches">Rechtliches lesen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/anmelden">Anmelden<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
