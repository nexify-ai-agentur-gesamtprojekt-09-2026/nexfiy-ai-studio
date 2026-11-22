import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { SiteFilm } from "@/components/SiteFilm";
import capturedCSS from "../styles/pages/leistungen.websites.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/leistungen_/websites")({
  head: () =>
    pageHead("/leistungen/websites", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-websites layout-service context-nexify"}>
        <ImportedSectionEineWebsiteDieIhr />
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-websites-websites-customer-1-0">
            Was Sie mit Markenstart bekommen
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
          <a href="#content-websites-websites-customer-2-1">
            Was dazukommen kann
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
            id="content-websites-websites-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-websites-websites-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-websites-websites-customer-1-0-title">
                Was Sie mit Markenstart bekommen
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Eine Seitenstruktur, die den Fragen Ihrer Kunden folgt. Texte, die Ihr Angebot in
                klaren Sätzen sagen. Eine Gestaltung, die eigens für Ihr Unternehmen entworfen wird,
                und ein Kontaktweg ohne Umwege.
              </p>
              <p>
                Im Angebot steht, welche Seiten und Inhalte entstehen, wer welches Material liefert
                und wie wir die Darstellung auf Telefon und Bildschirm prüfen und übergeben.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
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
            id="content-websites-websites-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-websites-websites-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-websites-websites-customer-2-1-title">Was dazukommen kann</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Weitere Sprachen, Foto und Video, ein Shop oder eigene Zielseiten für Kampagnen.
                Jede Erweiterung hat ihren eigenen Umfang, damit Sie sehen, was zum Start gehört und
                was später folgt.
              </p>
              <p>
                Nach der Übergabe können Sie Betreuung und Weiterentwicklung mit NeXify Care
                ergänzen.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
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
        <ImportedSectionKlarheitVorDemErsten />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-websites"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-websites">Wie möchten Sie fortfahren?</h2>
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
              <a className={"hc-text-link"} href="/leistungsumfang">
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
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}

function ImportedSectionEineWebsiteDieIhr() {
  return (
    <section className={"identity-hero"} aria-labelledby="page-title-websites">
      <div className={"identity-scene"}>
        <div className={"identity-copy"}>
          <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
            <ol>
              <li>
                <a href="/">Startseite</a>
                <span aria-hidden="true">/</span>
              </li>
              <li>
                <a href="/leistungen">Leistungen</a>
              </li>
              <li className={"visually-hidden"}>
                <span aria-current="page">Eine Website, die Ihr Angebot erklärt.</span>
              </li>
            </ol>
          </nav>
          <span className={"hc-kicker"}>
            NeXify AI<span aria-hidden="true"> / </span>Leistungen
          </span>
          <h1 id="page-title-websites">Eine Website, die Ihr Angebot erklärt.</h1>
          <p className={"identity-body"}>
            Besucher sollen verstehen, was Sie anbieten, und wissen, wie sie anfragen. Mit dem Paket
            Markenstart entstehen Gestaltung, Texte und Technik aus einem Konzept.
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
              href="/leistungsumfang"
            >
              Pakete vergleichen
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
                Für Unternehmen, deren Angebot online verständlicher werden soll – beim ersten
                Auftritt oder bei der Überarbeitung einer bestehenden Website.
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
                Ihre Besucher erkennen, was Sie anbieten und wie sie Sie erreichen. Seitenstruktur,
                Texte und Gestaltung führen zu einem nachvollziehbaren nächsten Schritt.
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
                Sie bringen Informationen zu Angebot, Zielgruppe und vorhandener Marke mit. Inhalte
                und Nutzungsrechte werden vor Veröffentlichung geklärt. Ein bestimmtes
                Suchmaschinenranking wird nicht zugesagt.
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
      aria-labelledby="related-title-websites"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-websites">Passende Themen</h2>
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
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/leistungen">
              Website, System, Kampagne. Aus einer Hand.
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
            Drei Leistungsfelder, ein Ansprechpartner: Wir bauen Ihren Auftritt, entlasten Ihre
            Abläufe und bringen Ihr Angebot zu den richtigen Kunden. Sie wählen, wo wir anfangen.
          </p>
          <a
            aria-label="Website, System, Kampagne. Aus einer Hand. – Seite ansehen"
            className={"hc-text-link"}
            href="/leistungen"
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
      </ol>
    </section>
  );
}
