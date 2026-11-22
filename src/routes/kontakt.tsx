import { SiteFilm } from "../components/SiteFilm";
import { InquiryForm } from "../components/forms/InquiryForm";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/kontakt.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  head: () =>
    pageHead("/kontakt", {
      links: [
        { rel: "stylesheet", href: capturedCSS },
        {
          rel: "preload",
          as: "image",
          href: "/site-assets/05c51cdebbdd2aa6.webp",
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
                NeXify AI<span aria-hidden="true"> / </span>NeXify kennenlernen
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
                  href="#anfrage"
                >
                  <span>Anfrage schreiben</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/leistungsumfang"
                >
                  Pakete ansehen
                </a>
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
              focusable="false"
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
              focusable="false"
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
        </nav>
        <section className={"hc-container pc-supplement"} id="anfrage">
          <InquiryForm
            kind="contact"
            title="Anfrage senden"
            companyLabel="Unternehmen"
            privacyHref="/datenschutz"
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
                Was bietet Ihr Unternehmen an, wen wollen Sie erreichen, und was soll sich ändern?
                Sie können auch einfach beschreiben, wo es heute hakt.
              </p>
              <p>
                Ein ungefährer Zeit- und Budgetrahmen und vorhandene Unterlagen helfen, sind aber
                kein Muss. Was fehlt, klären wir im Gespräch.
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
              <p>
                Wir klären offene Punkte und den passenden Umfang. Dann erhalten Sie ein Angebot mit
                Leistungen und Kosten. Erst wenn Sie es annehmen, entsteht ein Auftrag.
              </p>
              <p>
                Nach dem Absenden erhalten Sie eine Anfrage-Nummer. Sie können uns auch direkt
                schreiben.
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
              <span className={"hc-kicker"}>Ohne Formular</span>
              <h2 id="contact-title-contact">Direkter Kontakt</h2>
            </header>
            <div className={"hc-costs"}>
              <div className={"pc-channel"}>
                <h3>E-Mail schreiben</h3>
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
                    focusable="false"
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-contact"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-contact">Wie möchten Sie fortfahren?</h2>
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
              <a className={"hc-text-link"} href="#anfrage">
                Anfrage schreiben
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
        <p>Diese Seiten führen das Thema weiter.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>Leistungen</span>
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
          <span className={"hc-kicker"}>Rechtliches</span>
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
                focusable="false"
              >
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>
          </h3>
          <p>
            Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen und
            Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt auszuweisen.
            Verantwortlicher, Zwecke, Rechtsgrundlagen und Fristen stehen in der
            Datenschutzerklärung.
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
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </li>
        <li>
          <span className={"hc-kicker"}>Unternehmen</span>
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
                focusable="false"
              >
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>
          </h3>
          <p>
            NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und
            Richtung vor. Die KI-Agenten NeX und AIFly ORACLE arbeiten aus.
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
