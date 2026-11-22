import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.one.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/produkte_/one")({
  head: () => pageHead("/produkte/one", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-one layout-product context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-one">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Zwei Agenten. Eine klare Aufgabe.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Produkte
              </span>
              <h1 id="page-title-one">Zwei Agenten. Eine klare Aufgabe.</h1>
              <p className={"identity-body"}>
                AIFly ORACLE ordnet, NeX führt aus: Zusammen übernehmen sie in Ihrem Auftrag
                benannte Arbeitsschritte – von der Recherche bis zum geprüften Entwurf.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/kontakt"
                >
                  <span>Vorhaben schildern</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/produkte/nex2fly"
                >
                  NeX AIFly Suite ansehen
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal im Gespräch mit einer Person in Hygienekleidung an einer Produktionsanlage"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/4651eb82c8a87835.webp 800w, /site-assets/62994bb0701a3e15.webp 1280w, /site-assets/a28276c0cb67aeef.webp 1920w"
                  src="/site-assets/a28276c0cb67aeef.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-one-one-customer-1-0">
            Von der Aufgabe zum Arbeitsschritt
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
          <a href="#content-one-one-customer-2-1">
            Sie sehen, was geschehen ist
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
            id="content-one-one-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-one-one-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-one-one-customer-1-0-title">Von der Aufgabe zum Arbeitsschritt</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Am Anfang steht eine konkrete Aufgabe, etwa: Informationen für ein Projekt ordnen
                oder einen Entwurf vorbereiten. Wir beschreiben, was hineingeht, welche Werkzeuge
                erlaubt sind und was herauskommen soll.
              </p>
              <p>
                Recherche, Entwurf, Prüfung und Ausführung sind getrennte Schritte. Welche davon die
                Agenten für Sie übernehmen, steht im Angebot.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
                <a className={"hc-text-link"} href="/produkte/api">
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
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-one-one-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-one-one-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-one-one-customer-2-1-title">Sie sehen, was geschehen ist</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                AIFly ORACLE ist dafür da, Zuständigkeiten und Abhängigkeiten zu ordnen. Ein
                Arbeitsstand zeigt, ob etwas vorbereitet, geprüft oder ausgeführt ist.
              </p>
              <p>
                Veröffentlichen und Versenden bleiben Ihre Entscheidung. Ein Entwurf ist noch kein
                versendetes Ergebnis.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionKlarheitVorDemErsten />
        <ImportedSectionPassendeThemen />
        <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-one">
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-one">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/kontakt">
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
              <a className={"hc-text-link"} href="/produkte/nex2fly">
                NeX AIFly Suite ansehen
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
              <a className={"hc-text-link"} href="/produkte/api">
                NeXify API ansehen
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
          <p>
            Die Antworten beschreiben Umfang, Ablauf und Grenzen – damit Sie Ihr Vorhaben sicher
            einordnen können.
          </p>
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
                Für Unternehmen, die NeX und AIFly ORACLE für einen klar beschriebenen
                Anwendungsfall einsetzen möchten – nicht als unkontrollierten Autopiloten.
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
                Aufgaben werden in prüfbare Schritte zerlegt. Sie unterscheiden Recherche, Entwurf,
                Freigabe und tatsächliche Ausführung.
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
                Sie beschreiben Ihr Vorhaben. Pascal klärt Ziel, vorhandene Grundlagen und Umfang
                mit Ihnen. Danach folgen Angebot, Ihre Freigabe, Umsetzung, Prüfung und Übergabe.
                Laufende Betreuung wird separat vereinbart.
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
                Zugang, Umfang und Verbrauch stehen in Ihrem Produktangebot; die Tarife stehen noch
                zur Freigabe. Individuelle Integrationsarbeit bieten wir nach dem vereinbarten
                Umfang an.
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
                Die Produktbeschreibung ist keine pauschale Ausführungsvollmacht. Werkzeuge,
                Datenzugriffe und Budgets müssen freigegeben sein; ein Entwurf ist keine ausgeführte
                Aktion.
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
                Beschreiben Sie Ihr Vorhaben über das Kontaktformular. Nennen Sie Ziel, vorhandene
                Systeme und Ihre wichtigste Frage. Sie erhalten eine Anfrage-Nummer; die Anfrage ist
                noch keine Beauftragung.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby="related-title-one"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-one">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/kontakt">
              Schildern Sie Ihr Vorhaben.
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
            </a>
          </h3>
          <p>
            Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar
            Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste
            Schritt aussieht.
          </p>
          <a
            aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen"
            className={"hc-text-link"}
            href="/kontakt"
          >
            Seite ansehen
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
        </li>
        <li>
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/produkte/nex2fly">
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
            </a>
          </h3>
          <p>
            Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen
            Bereich. Den Zugang richten wir persönlich mit Ihnen ein.
          </p>
          <a
            aria-label="NeX AIFly Suite. Ihr KI-Arbeitsbereich. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/nex2fly"
          >
            Seite ansehen
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
        </li>
        <li>
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/produkte/api">
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
            </a>
          </h3>
          <p>
            Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die
            Schnittstelle nach Ihrem Datenfluss. Den Zugang erhalten Sie im Rahmen eines Projekts.
          </p>
          <a
            aria-label="NeXify API. KI in Ihrer Anwendung. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/api"
          >
            Seite ansehen
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
        </li>
        <li>
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/loesungen">
              Kampagne und Zielseite aus einem Guss.
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
            </a>
          </h3>
          <p>
            Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht.
            Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen – mit einem Ziel, das Sie
            benennen.
          </p>
          <a
            aria-label="Kampagne und Zielseite aus einem Guss. – Seite ansehen"
            className={"hc-text-link"}
            href="/loesungen"
          >
            Seite ansehen
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
        </li>
      </ol>
    </section>
  );
}
