import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/loesungen.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/loesungen")({
  head: () => pageHead("/loesungen", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
  staticData: {
    importedDocument: {
      html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties },
      body: {},
    },
  },
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
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Leistungen
              </span>
              <h1 id="page-title-solutions">Kampagne und Zielseite aus einem Guss.</h1>
              <p className={"identity-body"}>
                Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige
                verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem
                Ziel, das Sie benennen.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/leistungsumfang"
                >
                  <span>Pakete ansehen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/kontakt"
                >
                  Vorhaben schildern
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal bespricht ein gedrucktes Layout mit einer Gesprächspartnerin im Atelier"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/8568fb99abef6900.webp 800w, /site-assets/66f090cb933250a4.webp 1280w, /site-assets/c819e2179bacd10d.webp 1920w"
                  src="/site-assets/c819e2179bacd10d.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-solutions-solutions-customer-1-0">
            Was das Paket Wachstum enthält
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
          <a href="#content-solutions-solutions-customer-2-1">
            Budget und Auswertung
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
        </nav>
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-solutions-solutions-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-solutions-solutions-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-solutions-solutions-customer-1-0-title">
                Was das Paket Wachstum enthält
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Das Paket umfasst Kampagnenkonzept, Texte, Bild- oder Videomotive und die Zielseite.
                Am Anfang stehen Ihr Angebot, Ihre Zielgruppe und die Reaktion, die Sie erreichen
                wollen, etwa mehr passende Anfragen.
              </p>
              <p>
                Der Auftrag nennt Kanäle, Formate und Lieferumfang. Weitere Varianten wählen Sie als
                Option dazu.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
                <a className={"hc-text-link"} href="/leistungsumfang">
                  Pakete ansehen
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-solutions-solutions-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-solutions-solutions-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-solutions-solutions-customer-2-1-title">Budget und Auswertung</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Medienbudget, Gestaltung und Kampagnenbetreuung vereinbaren Sie getrennt, damit Sie
                sehen, wohin Ihr Geld geht. Anzeigen starten erst nach Ihrer Freigabe.
              </p>
              <p>
                Welche Messung zulässig und sinnvoll ist, legen wir vor dem Start fest. Ergebnisse
                hängen von Angebot, Zielgruppe, Wettbewerb und Budget ab. Einen bestimmten Erfolg
                sagen wir deshalb nicht zu.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDerPassendeEinstieg />
        <ImportedSectionKlarheitVorDemErsten />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-solutions"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-solutions">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/leistungsumfang">
                Pakete ansehen
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
              <a className={"hc-text-link"} href="/kontakt">
                Vorhaben schildern
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}

function ImportedSectionDerPassendeEinstieg() {
  return (
    <section
      className={"hc-section hc-container hc-product-story"}
      aria-labelledby="page-showcase-title"
    >
      <header className={"hc-section-heading"}>
        <div>
          <span className={"hc-kicker"}>Ihr nächster Schritt</span>
          <h2 id="page-showcase-title">Der passende Einstieg.</h2>
        </div>
        <p>Jede Seite beschreibt Umfang, Ablauf und den nächsten Schritt für ihren Bereich.</p>
      </header>
      <nav className={"hc-gallery"} aria-label="Der passende Einstieg.">
        <a className={"hc-gallery-card"} href="/produkte/nex2fly">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/5764558ff1c73ead.webp 800w, /site-assets/fba47bfd29e56755.webp 1280w, /site-assets/4b45951db0b51136.webp 1920w"
              src="/site-assets/4b45951db0b51136.webp"
            />
          </figure>
          <h3>
            NeX AIFly Suite. Ihr KI-Arbeitsbereich.
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </h3>
          <p>
            Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen
            Bereich. Den Zugang richten wir persönlich mit Ihnen ein.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
        <a className={"hc-gallery-card"} href="/produkte/one">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal im Gespräch mit einer Person in Hygienekleidung an einer Produktionsanlage"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/4651eb82c8a87835.webp 800w, /site-assets/62994bb0701a3e15.webp 1280w, /site-assets/a28276c0cb67aeef.webp 1920w"
              src="/site-assets/a28276c0cb67aeef.webp"
            />
          </figure>
          <h3>
            Zwei Agenten. Eine klare Aufgabe.
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </h3>
          <p>
            AIFly ORACLE ordnet, NeX führt aus: Zusammen übernehmen sie in Ihrem Auftrag benannte
            Arbeitsschritte – von der Recherche bis zum geprüften Entwurf.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
        <a className={"hc-gallery-card"} href="/produkte/api">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w"
              src="/site-assets/df162c342bb041e0.webp"
            />
          </figure>
          <h3>
            NeXify API. KI in Ihrer Anwendung.
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </h3>
          <p>
            Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die
            Schnittstelle nach Ihrem Datenfluss. Den Zugang erhalten Sie im Rahmen eines Projekts.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </nav>
    </section>
  );
}

function ImportedSectionKlarheitVorDemErsten() {
  return (
    <section
      className={"hc-section hc-container hc-service-story"}
      aria-labelledby="page-questions-title"
    >
      <div className={"hc-service-layout"}>
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Sechs Fragen zu Ihrem Vorhaben</span>
          <h2 id="page-questions-title">Klarheit vor dem ersten Schritt.</h2>
          <p>Kurze Antworten zu Eignung, Ablauf, Kosten und Grenzen.</p>
          <a className={"hc-text-link"} href="/kontakt">
            Vorhaben beschreiben
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </header>
        <div className={"hc-service-list"}>
          <details className={"hc-service-detail"} open>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Für wen ist es geeignet?</strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Für Unternehmen, die eine Kampagne auf ein konkretes Angebot und eine passende
                Zielseite ausrichten möchten.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Welchen Nutzen haben Sie?</strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Anzeige und Zielseite sagen dasselbe. Gestaltung, Betreuung und Medienbudget sehen
                Sie dabei getrennt.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Wie läuft es ab?</strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Sie schildern Ihr Vorhaben, Pascal klärt mit Ihnen Ziel, Grundlagen und Umfang.
                Danach erhalten Sie ein Angebot. Nach Ihrer Freigabe setzen wir um, prüfen das
                Ergebnis und übergeben es. Betreuung danach vereinbaren wir separat.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was kostet es?</strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Die Kosten stehen im Angebot, bevor Sie zusagen. Hosting, Software, KI-Nutzung und
                ein etwaiges Werbebudget weisen wir getrennt aus.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>
                  Welche Voraussetzungen und Grenzen gelten?
                </strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Nötig sind ein klares Angebot, freigegebene Inhalte und vereinbarte Kanäle. Anzeigen
                starten erst nach Ihrer Freigabe. Reichweite, Anfragen oder Umsatz garantieren wir
                nicht.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was können Sie jetzt tun?</strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Schildern Sie Ihr Vorhaben im Kontaktformular: Ihr Ziel, was schon vorhanden ist,
                und Ihre wichtigste Frage. Sie erhalten eine Anfrage-Nummer. Ein Auftrag entsteht
                dadurch noch nicht.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
