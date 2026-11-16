import { GuideNavigation } from "@/components/site/GuideNavigation";
import { SiteFilm } from "../components/SiteFilm";
import { InquiryForm } from "../components/forms/InquiryForm";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/kontakt.css?url";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    links: [
      { rel: "stylesheet", href: capturedCSS },
      {
        rel: "preload",
        as: "image",
        href: "/site-assets/05c51cdebbdd2aa6.webp",
        fetchPriority: "high",
      },
    ],
    meta: [
      { title: "Schildern Sie Ihr Vorhaben. · NeXify AI" },
      {
        name: "description",
        content:
          "Beschreiben Sie Ihr Vorhaben in wenigen Sätzen – Pascal meldet sich persönlich mit einem klaren nächsten Schritt.",
      },
      { property: "og:title", content: "Schildern Sie Ihr Vorhaben. · NeXify AI" },
      {
        property: "og:description",
        content:
          "Beschreiben Sie Ihr Vorhaben in wenigen Sätzen – Pascal meldet sich persönlich mit einem klaren nächsten Schritt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  validateSearch: (search: Record<string, unknown>): { anliegen?: string } =>
    typeof search["anliegen"] === "string" ? { anliegen: search["anliegen"].slice(0, 1000) } : {},
  component: Index,
});

function Index() {
  const { anliegen } = Route.useSearch();
  return (
    <NexifyShell>
      <div className={"home-concept page-concept page-contact layout-company context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-contact">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Schildern Sie Ihr Vorhaben.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen
              </span>
              <h1 id="page-title-contact">Schildern Sie Ihr Vorhaben.</h1>
              <p className={"identity-body"}>
                Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein
                paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der
                nächste Schritt aussieht.
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
                <button
                  type="button"
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                >
                  Angebot anfragen
                </button>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <SiteFilm film="studio" eager />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-contact-contact-customer-1-0">
            Das genügt für den Anfang
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
              {...({ focusable: "false" } as any)}
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
          <a href="#content-contact-contact-customer-2-1">
            Was nach Ihrer Anfrage passiert
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
              {...({ focusable: "false" } as any)}
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
        </nav>
        <section className={"hc-container pc-supplement"} id="anfrage" tabIndex={-1}>
          <InquiryForm
            kind="contact"
            title="Ihre Anfrage senden"
            companyLabel="Unternehmen"
            privacyHref="/datenschutz"
            initialMessage={anliegen ?? ""}
          />
        </section>
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-contact-contact-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-contact-contact-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-contact-contact-customer-1-0-title">Das genügt für den Anfang</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Sie brauchen kein fertiges Konzept. Diese vier Angaben reichen, damit das erste
                Gespräch konkret wird:
              </p>
              <ul className={"contact-checklist"} role="list">
                <li>
                  <strong>Ihr Angebot</strong>
                  <span>Was Ihr Unternehmen anbietet und für wen.</span>
                </li>
                <li>
                  <strong>Der Engpass</strong>
                  <span>Wo es heute hakt oder Zeit verloren geht.</span>
                </li>
                <li>
                  <strong>Das Ziel</strong>
                  <span>Was sich danach spürbar ändern soll.</span>
                </li>
                <li>
                  <strong>Rahmen, falls bekannt</strong>
                  <span>Ungefährer Zeitpunkt, Budget, vorhandene Unterlagen.</span>
                </li>
              </ul>
              <p className={"contact-note"}>
                Ein typischer Vorgang hilft mehr als eine lange Wunschliste. Zugangsdaten oder
                vertrauliche Unterlagen gehören nicht in das öffentliche Formular.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  Pascal<span aria-hidden="true"> · </span>Ihr nächster Schritt
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
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-contact-contact-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-contact-contact-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-contact-contact-customer-2-1-title">
                Was nach Ihrer Anfrage passiert
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <ol className={"contact-steps"} role="list">
                <li>
                  <span className={"contact-step-index"} aria-hidden="true">
                    1
                  </span>
                  <div>
                    <strong>Ihre Anfrage geht direkt ein</strong>
                    <span>
                      Das Formular prüft Ihre Angaben, speichert sie und meldet sie Pascal Courbois.
                      Sie erhalten sofort eine Vorgangsnummer.
                    </span>
                  </div>
                </li>
                <li>
                  <span className={"contact-step-index"} aria-hidden="true">
                    2
                  </span>
                  <div>
                    <strong>Pascal klärt offene Punkte</strong>
                    <span>
                      Persönlich, per E-Mail oder im Gespräch – mit Blick auf den passenden Umfang.
                    </span>
                  </div>
                </li>
                <li>
                  <span className={"contact-step-index"} aria-hidden="true">
                    3
                  </span>
                  <div>
                    <strong>Sie erhalten ein Angebot</strong>
                    <span>
                      Mit benannten Leistungen und Kosten. Erst wenn Sie es annehmen, entsteht ein
                      Auftrag.
                    </span>
                  </div>
                </li>
              </ol>
              <p className={"contact-note"}>
                Kann die Anfrage ausnahmsweise nicht gespeichert werden, zeigt das Formular das an
                und bietet Ihnen eine vorbereitete E-Mail als Alternative.
              </p>
            </div>
          </section>
        </div>
        <section
          className={"hc-section hc-container hc-budget"}
          aria-labelledby="contact-title-contact"
        >
          <div className={"hc-budget-story"}>
            <header className={"hc-section-heading"}>
              <span className={"hc-kicker"}>NEXIFY AI</span>
              <h2 id="contact-title-contact">Direkter Kontakt</h2>
            </header>
            <div className={"hc-costs"}>
              <div className={"pc-channel"}>
                <h3>E-Mail schreiben</h3>
                <p className={"contact-note"}>
                  Lieber ohne Formular? Schreiben Sie direkt an Pascal Courbois, NeXify AI in Venlo.
                </p>
                <a href="mailto:mail@nexifyai.cloud">
                  mail@nexifyai.cloud
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
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-contact"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Im Detail</span>
            <h2 id="finish-title-contact">Wie möchten Sie fortfahren?</h2>
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
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
              <button type="button" className={"hc-text-link"}>
                Angebot anfragen
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
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"hc-text-link"}>
                Terminwunsch nennen
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
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
              <button type="button" className={"hc-text-link"}>
                Kampagne besprechen
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
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
              <a className={"hc-text-link"} href="/datenschutz">
                Datenschutz lesen
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
                  {...({ focusable: "false" } as any)}
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
            Hier finden Sie unsere Leistungen, Produkte und Projektwege. Sie können
            jeden Bereich auch direkt öffnen.
          </p>
          <GuideNavigation initial="business-website" />
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby="related-title-contact"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-contact">Passende Themen</h2>
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
                {...({ focusable: "false" } as any)}
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
              {...({ focusable: "false" } as any)}
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/datenschutz">
              Ihre Daten. Ein klarer Zweck.
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
                {...({ focusable: "false" } as any)}
              >
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>
          </h3>
          <p>
            Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen und
            Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt auszuweisen.
            Die vollständige Datenschutzerklärung ist noch in Prüfung.
          </p>
          <a
            aria-label="Ihre Daten. Ein klarer Zweck. – Seite ansehen"
            className={"hc-text-link"}
            href="/datenschutz"
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
              {...({ focusable: "false" } as any)}
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/unternehmen">
              Ein Ansprechpartner. Ein Agententeam.
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
                {...({ focusable: "false" } as any)}
              >
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>
          </h3>
          <p>
            NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und
            Richtung vor; die KI-Agenten NeX und AIFly ORACLE arbeiten aus. Wir nennen das AI
            FACTORY.
          </p>
          <a
            aria-label="Ein Ansprechpartner. Ein Agententeam. – Seite ansehen"
            className={"hc-text-link"}
            href="/unternehmen"
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
              {...({ focusable: "false" } as any)}
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </li>
      </ol>
    </section>
  );
}
