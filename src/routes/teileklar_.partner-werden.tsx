import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { SiteFilm } from "@/components/SiteFilm";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import capturedCSS from "../styles/pages/teileklar.partner-werden.css?url";

export const Route = createFileRoute("/teileklar_/partner-werden")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }, { rel: "preload", as: "image", href: "/site-assets/15fa9607b63661b1.webp", fetchPriority: "high" }],
    meta: [
      { title: "Werkstatt? Werden Sie Partner. · TEILEKLAR.shop" },
      { name: "description", content: "Werden Sie TEILEKLAR-Werkstattpartner und erhalten Sie vollständige Aufträge mit Fahrzeug, geprüftem Teil und Kontaktdaten." },
      { property: "og:title", content: "Werkstatt? Werden Sie Partner. · TEILEKLAR.shop" },
      { property: "og:description", content: "Werden Sie TEILEKLAR-Werkstattpartner und erhalten Sie vollständige Aufträge mit Fahrzeug, geprüftem Teil und Kontaktdaten." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "lang": "de", "data-theme": "dark", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept page-tk-partner layout-workshop context-teileklar"}>
      <section className={"identity-hero"} aria-labelledby="page-title-tk-partner">
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
                  <span aria-current="page">Werkstatt? Werden Sie Partner.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Werkstatt und Zusammenarbeit</span>
            <h1 id="page-title-tk-partner">Werkstatt? Werden Sie Partner.</h1>
            <p className={"identity-body"}>Kunden kaufen das Teil bei TEILEKLAR und suchen jemanden für den Einbau. Stellen Sie Ihren Betrieb vor – wir besprechen, wie eine Zusammenarbeit aussieht.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/kontakt">
                <span>Pascal schreiben</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/teileklar/werkstatt">Werkstatt finden</a>
            </div>
          </div>
          <div className={"identity-media"}>
            <figure className={"identity-hero-photo"}>
<SiteFilm film="fertigung" eager />
</figure>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-partner-tk-partner-customer-1-0">Ihr Betrieb, klar vorgestellt<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-partner-tk-partner-customer-2-1">Erst sprechen, dann vereinbaren<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <section className={"hc-container pc-supplement"}>
        <div className={"tk-partner-journey"}>
          <section className={"tk-partner-intro"}>
            <span className={"hc-kicker"}>TEILEKLAR Werkstattnetz</span>
            <h2>Der Kunde bringt das geprüfte Teil. Sie bekommen den passenden Auftrag.</h2>
            <p>TEILEKLAR verbindet Teilekauf und Einbau. Werkstätten erhalten verständlich vorbereitete Anfragen, statt Fahrzeugdaten, Teilenummern und Rückfragen selbst zusammensuchen zu müssen.</p>
          </section>
          <ol className={"tk-partner-steps"}>
            <li>
              <span>01</span>
              <h3>Betrieb vorstellen</h3>
              <p>Leistungen, Standort, Ansprechpartner und Kapazitäten ergeben ein belastbares Werkstattprofil.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Zusammenarbeit vereinbaren</h3>
              <p>Anfragen, Zusagen, Konditionen und Abrechnung werden vor dem ersten Auftrag gemeinsam festgelegt.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Aufträge vollständig erhalten</h3>
              <p>Fahrzeug, geprüftes Teil, Kontaktdaten und offene Fragen kommen gebündelt in der Partnerfläche an.</p>
            </li>
          </ol>
          <section className={"tk-portal-preview"}>
            <div>
              <span className={"hc-kicker"}>Geschütztes Partnerportal</span>
              <h2>Ein Arbeitsplatz für den Werkstattalltag.</h2>
              <p>Das Portal ist nach Anmeldung und bestätigter Partnerschaft erreichbar. Öffentliche Besucher sehen keine Betriebs-, Kunden- oder Abrechnungsdaten.</p>
            </div>
            <div className={"tk-portal-grid"}>
              <article>
                <h3>Termine</h3>
                <p>Anfragen annehmen, verschieben oder ablehnen – mit Fahrzeug und Anliegen an einer Stelle.</p>
              </article>
              <article>
                <h3>Gutscheine</h3>
                <p>Bestellungen und Einlösungen nachvollziehen, ohne Listen oder parallele Nachrichten.</p>
              </article>
              <article>
                <h3>Profil &amp; Landingpage</h3>
                <p>Leistungen, Öffnungszeiten und Ansprechpartner pflegen; daraus entsteht der öffentliche Werkstattauftritt.</p>
              </article>
              <article>
                <h3>Abrechnung</h3>
                <p>Vereinbarte Leistungen und fällige Abrechnungen transparent im Blick behalten.</p>
              </article>
              <article>
                <h3>Dokumente</h3>
                <p>Partnerunterlagen, Vereinbarungen und freigegebene Vorlagen zentral abrufen.</p>
              </article>
              <article>
                <h3>Zusatzleistungen</h3>
                <p>Weitere Leistungen gezielt beauftragen, sobald Umfang und Preis bestätigt sind.</p>
              </article>
            </div>
            <div className={"tk-actions"}>
              <a className={"nexify-control primary-button hc-finish-primary"} data-variant="primary" href="/anmelden">Partnerzugang</a>
              <a className={"hc-text-link"} href="/teileklar/werkstatt">Werkstätten finden<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </section>
        </div>
        <InquiryForm kind="partner" title="Als Partnerwerkstatt anfragen" companyLabel="Werkstatt / Betrieb" privacyHref="/teileklar/rechtliches" successBody={<>Ihr E-Mail-Programm öffnet sich mit der fertigen Partneranfrage an mail@nexifyai.cloud. Bitte dort nur noch auf „Senden“ tippen – wir melden uns für ein erstes Gespräch.</>} />
      </section>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-partner-tk-partner-customer-1-0" tabIndex={-1} aria-labelledby="content-tk-partner-tk-partner-customer-1-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-partner-tk-partner-customer-1-0-title">Ihr Betrieb, klar vorgestellt</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Leistungen, Standort und Ansprechpartner zeigen Kunden, wofür Sie stehen. Partner wird Ihr Betrieb mit einer Vereinbarung, nicht schon durch einen Eintrag im Verzeichnis.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>Pascal<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-partner-tk-partner-customer-2-1" tabIndex={-1} aria-labelledby="content-tk-partner-tk-partner-customer-2-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-partner-tk-partner-customer-2-1-title">Erst sprechen, dann vereinbaren</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Wie Anfragen ankommen, wie Sie zusagen und was abgerechnet wird, legen wir vor dem ersten Auftrag gemeinsam fest. Ihre Anfrage ist der Anfang dieses Gesprächs.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/anmelden">Anmelden und weiterarbeiten.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
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
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-partner">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-partner">Passende Themen</h2>
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
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Suchen Sie nach Postleitzahl oder Ort. Die Liste zeigt Betriebe aus einem Werkstattverzeichnis, sortiert nach Entfernung.</p>
            <a aria-label="Eine Werkstatt in Ihrer Nähe. – Seite ansehen" className={"hc-text-link"} href="/teileklar/werkstatt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Online-Terminbuchung gibt es bei TEILEKLAR noch nicht. Sie finden eine Werkstatt in Ihrer Nähe und vereinbaren den Termin direkt – oder nennen uns Ihren Wunsch.</p>
            <a aria-label="Termin? Direkt bei der Werkstatt. – Seite ansehen" className={"hc-text-link"} href="/teileklar/termine">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
        </ol>
      </section>
      <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-tk-partner">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Im Detail</span>
          <h2 id="finish-title-tk-partner">Wie möchten Sie fortfahren?</h2>
        </div>
        <div className={"hc-finish-next"}>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/kontakt">Pascal schreiben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/werkstatt">Werkstatt finden<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/teileklar/termine">Termin anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Frage stellen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </NexifyShell>;
}
