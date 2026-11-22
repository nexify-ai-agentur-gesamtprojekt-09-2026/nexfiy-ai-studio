import { SiteFilm } from "../components/SiteFilm";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/leistungen.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/leistungen")({
  head: () =>
    pageHead("/leistungen", {
      links: [
        { rel: "stylesheet", href: capturedCSS },
        {
          rel: "preload",
          as: "image",
          href: "/site-assets/5c592a5dc791fcc3.webp",
          fetchPriority: "high",
        },
      ],
    }),
  staticData: {
    importedDocument: {
      html: {
        lang: "de",
        "data-theme": "dark",
        style: { colorScheme: "dark" } as import("react").CSSProperties,
      },
      body: {},
    },
  },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
      <div className={"home-concept page-concept page-services layout-service context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-services">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Website, System, Kampagne. Aus einer Hand.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>Leistungen
              </span>
              <h1 id="page-title-services">Website, System, Kampagne. Aus einer Hand.</h1>
              <p className={"identity-body"}>
                Drei Leistungsfelder, ein Ansprechpartner: Wir bauen Ihren Auftritt, entlasten Ihre
                Abläufe und bringen Ihr Angebot zu den richtigen Kunden. Sie wählen, wo wir
                anfangen.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/leistungsumfang"
                >
                  <span>Pakete vergleichen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/leistungen/websites"
                >
                  Websites &amp; Marke
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <SiteFilm film="angebot" eager />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-services-services-customer-1-0">
            Marke &amp; Web
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
          <a href="#content-services-services-customer-2-1">
            Systeme &amp; KI
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
          <a href="#content-services-services-customer-3-2">
            Wachstum &amp; Kampagnen
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
            id="content-services-services-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-services-services-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 03</span>
              <h2 id="content-services-services-customer-1-0-title">Marke &amp; Web</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Ihre Kunden verstehen auf den ersten Blick, was Sie anbieten und wie sie Sie
                erreichen. Positionierung, Gestaltung, Texte und Website entstehen zusammen.
              </p>
              <p>
                Das Paket Markenstart bündelt die Markenbasis und den Webauftritt. Weitere Seiten,
                Inhalte und Sprachen kommen als Optionen dazu.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
                <a className={"hc-text-link"} href="/leistungsumfang">
                  Drei Pakete. Ein klarer Umfang.
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
            id="content-services-services-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-services-services-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 03</span>
              <h2 id="content-services-services-customer-2-1-title">Systeme &amp; KI</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Wiederkehrende Arbeit kostet Zeit: Anfragen sortieren, Unterlagen zusammensuchen,
                Stände nachfragen. Wir bauen Apps, Portale und Schnittstellen und setzen KI dort
                ein, wo sie einen benannten Schritt übernimmt.
              </p>
              <p>
                Das Paket KI im Betrieb beginnt mit einem Ablauf – mit den Quellen und Rechten, die
                Sie dafür zulassen.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  Pascal<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
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
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-services-services-customer-3-2"
            tabIndex={-1}
            aria-labelledby="content-services-services-customer-3-2-title"
          >
            <div>
              <span className={"hc-kicker"}>03 / 03</span>
              <h2 id="content-services-services-customer-3-2-title">Wachstum &amp; Kampagnen</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Anzeige und Zielseite sollten dasselbe versprechen. Das Paket Wachstum verbindet
                Kampagnenidee, Werbemittel und Zielseite in einem Plan.
              </p>
              <p>
                Medienbudget und Kanäle legen Sie gesondert fest. Welche Auswertung möglich ist,
                steht im Angebot.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionDerPassendeEinstieg />
        <ImportedSectionKlarheitVorDemErsten />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-services"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Im Detail</span>
            <h2 id="finish-title-services">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/leistungsumfang">
                Pakete vergleichen
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
              <a className={"hc-text-link"} href="/leistungen/websites">
                Websites &amp; Marke
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
              <a className={"hc-text-link"} href="/leistungen/agenten-automatisierung">
                KI &amp; Automatisierung
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
              <a className={"hc-text-link"} href="/leistungen/apps-portale">
                Apps &amp; Portale
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

function ImportedSectionDieFACTORYEntdeckenMit() {
  return (
    <section
      className={"hc-container pc-guide"}
      aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE"
    >
      <details className={"hc-service-detail"}>
        <summary>
          <span>
            <strong className={"hc-service-name"}>
              Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE
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
            Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können
            jeden Bereich auch direkt öffnen.
          </p>
          <a className={"hc-text-link"} href="/kontakt">
            Passenden Einstieg wählen
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
      </details>
    </section>
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
        <p>
          Wählen Sie den Bereich, der zu Ihrem Vorhaben passt. Umfang, Ablauf und nächste Schritte
          finden Sie auf der jeweiligen Seite.
        </p>
      </header>
      <nav className={"hc-gallery"} aria-label="Der passende Einstieg.">
        <a className={"hc-gallery-card"} href="/leistungen/websites">
          <figure className={"hc-art"}>
            <img
              src="/site-assets/5c592a5dc791fcc3.webp"
              srcSet="/site-assets/b4c1010258293e22.webp 800w, /site-assets/55ecd78d79c41c10.webp 1280w, /site-assets/5c592a5dc791fcc3.webp 1920w"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <h3>
            Eine Website, die Ihr Angebot erklärt.
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
            Besucher sollen verstehen, was Sie anbieten, und wissen, wie sie anfragen. Mit dem Paket
            Markenstart entstehen Gestaltung, Texte und Technik aus einem Konzept.
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
        <a className={"hc-gallery-card"} href="/leistungen/agenten-automatisierung">
          <figure className={"hc-art"}>
            <img
              src="/site-assets/15fa9607b63661b1.webp"
              srcSet="/site-assets/b1c49cd9be2fd13d.webp 800w, /site-assets/28c1aab4293b944a.webp 1280w, /site-assets/15fa9607b63661b1.webp 1920w"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage; NeX und AIFly ORACLE sind dabei"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <h3>
            Routine abgeben. Kontrolle behalten.
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
            KI übernimmt bei uns einen benannten Schritt in Ihrem Ablauf: Anfragen zuordnen,
            Unterlagen vorbereiten, Entwürfe schreiben. Entscheidungen bleiben bei Ihnen.
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
        <a className={"hc-gallery-card"} href="/leistungen/apps-portale">
          <figure className={"hc-art"}>
            <img
              src="/site-assets/4b45951db0b51136.webp"
              srcSet="/site-assets/5764558ff1c73ead.webp 800w, /site-assets/fba47bfd29e56755.webp 1280w, /site-assets/4b45951db0b51136.webp 1920w"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <h3>
            Portale und Apps für Ihren Ablauf.
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
            Kundenportal, interne Anwendung oder Partnerbereich: ein Ort für den Vorgang, statt
            Postfach, Telefon und Listen. Jeder sieht, was er sehen soll.
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
          <span className={"hc-kicker"}>Acht Fragen zu Ihrem Vorhaben</span>
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
                <strong className={"hc-service-name"}>Was ist es?</strong>
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
                Drei Leistungsfelder, ein Ansprechpartner: Wir bauen Ihren Auftritt, entlasten Ihre
                Abläufe und bringen Ihr Angebot zu den richtigen Kunden. Sie wählen, wo wir
                anfangen.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
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
                Für Unternehmen, die Marke, Website und digitale Abläufe nicht getrennt beauftragen
                möchten. Sie können mit einem klar abgegrenzten Vorhaben beginnen.
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
                Ein Ansprechpartner hält Gestaltung, Umsetzung und Vermarktung zusammen. Sie
                erhalten einen abgestimmten Lieferumfang statt einzelner, unverbundener Maßnahmen.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was gehört dazu?</strong>
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
                Ihre Kunden verstehen auf den ersten Blick, was Sie anbieten und wie sie Sie
                erreichen. Positionierung, Gestaltung, Texte und Website entstehen zusammen. Das
                Paket Markenstart bündelt die Markenbasis und den Webauftritt. Weitere Seiten,
                Inhalte und Sprachen kommen als Optionen dazu. Wiederkehrende Arbeit kostet Zeit:
                Anfragen sortieren, Unterlagen zusammensuchen, Stände nachfragen. Wir bauen Apps,
                Portale und Schnittstellen und setzen KI dort ein, wo sie einen benannten Schritt
                übernimmt. Das Paket KI im Betrieb beginnt mit einem Ablauf – mit den Quellen und
                Rechten, die Sie dafür zulassen. Anzeige und Zielseite sollten dasselbe versprechen.
                Das Paket Wachstum verbindet Kampagnenidee, Werbemittel und Zielseite in einem Plan.
                Medienbudget und Kanäle legen Sie gesondert fest. Welche Auswertung möglich ist,
                steht im Angebot.
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
                Der Aufwand und die Kosten werden für Ihr Vorhaben im Angebot festgelegt. Hosting,
                Software, KI-Verbrauch und gegebenenfalls Medienbudget werden separat ausgewiesen.
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
                Benötigt werden Ihr Ziel, bestehende Unterlagen und eine entscheidungsberechtigte
                Kontaktperson. Nicht jede Erweiterung gehört automatisch zum ersten Auftrag.
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
                Systeme und Ihre wichtigste Frage. Sie erhalten eine Vorgangsnummer; die Anfrage ist
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
      aria-labelledby="related-title-services"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-services">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/leistungsumfang">
              Drei Pakete. Ein klarer Umfang.
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
            Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit benannten
            Ergebnissen, wählbaren Optionen und Kosten, die Sie vor dem Start kennen.
          </p>
          <a
            aria-label="Drei Pakete. Ein klarer Umfang. – Seite ansehen"
            className={"hc-text-link"}
            href="/leistungsumfang"
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
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/leistungen/websites">
              Eine Website, die Ihr Angebot erklärt.
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
            Besucher sollen verstehen, was Sie anbieten, und wissen, wie sie anfragen. Mit dem Paket
            Markenstart entstehen Gestaltung, Texte und Technik aus einem Konzept.
          </p>
          <a
            aria-label="Eine Website, die Ihr Angebot erklärt. – Seite ansehen"
            className={"hc-text-link"}
            href="/leistungen/websites"
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
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/leistungen/agenten-automatisierung">
              Routine abgeben. Kontrolle behalten.
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
            KI übernimmt bei uns einen benannten Schritt in Ihrem Ablauf: Anfragen zuordnen,
            Unterlagen vorbereiten, Entwürfe schreiben. Entscheidungen bleiben bei Ihnen.
          </p>
          <a
            aria-label="Routine abgeben. Kontrolle behalten. – Seite ansehen"
            className={"hc-text-link"}
            href="/leistungen/agenten-automatisierung"
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
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/leistungen/apps-portale">
              Portale und Apps für Ihren Ablauf.
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
            Kundenportal, interne Anwendung oder Partnerbereich: ein Ort für den Vorgang, statt
            Postfach, Telefon und Listen. Jeder sieht, was er sehen soll.
          </p>
          <a
            aria-label="Portale und Apps für Ihren Ablauf. – Seite ansehen"
            className={"hc-text-link"}
            href="/leistungen/apps-portale"
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
