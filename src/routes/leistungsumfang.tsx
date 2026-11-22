import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/leistungsumfang.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/leistungsumfang")({
  head: () => pageHead("/leistungsumfang", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-scope layout-service context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-scope">
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
                    <span aria-current="page">Drei Pakete. Ein klarer Umfang.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Leistungen
              </span>
              <h1 id="page-title-scope">Drei Pakete. Ein klarer Umfang.</h1>
              <p className={"identity-body"}>
                Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit
                benannten Ergebnissen, wählbaren Optionen und Kosten, die Sie vor dem Start kennen.
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
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal hört einer Person am Besprechungstisch zu; NeX und AIFly ORACLE begleiten das Gespräch"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/70809ce466d6c39a.webp 800w, /site-assets/1870403fa2b90dde.webp 1280w, /site-assets/3c8726341a94b928.webp 1920w"
                  src="/site-assets/3c8726341a94b928.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-scope-scope-customer-1-0">
            Welches Paket zu Ihnen passt
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
          <a href="#content-scope-scope-customer-2-1">
            Optionen, die Sie einzeln wählen
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
            id="content-scope-scope-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-scope-scope-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-scope-scope-customer-1-0-title">Welches Paket zu Ihnen passt</h2>
            </div>
            <div className={"pc-section-body"}>
              <ul>
                <li>
                  <strong>Markenstart</strong> baut Ihren Marken- und Webauftritt.
                </li>
                <li>
                  <strong>KI im Betrieb</strong> entlastet einen ausgewählten Ablauf.
                </li>
                <li>
                  <strong>Wachstum</strong> verbindet Kampagne und Zielseite.
                </li>
              </ul>
              <p>
                Im Gespräch klären wir, welcher Einstieg zu Ihrer Lage passt und was schon vorhanden
                ist. Das Angebot nennt Ergebnisse, Ihre Mitwirkung, den Zeitrahmen und die Kosten,
                bevor Sie entscheiden.
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
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-scope-scope-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-scope-scope-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-scope-scope-customer-2-1-title">Optionen, die Sie einzeln wählen</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Zusätzliche Inhalte, Sprachen, Anbindungen, Anzeigen und die Betreuung mit
                NeXify&nbsp;Care stehen als eigene Posten im Angebot. So sehen Sie, was zum Start
                gehört, was Sie später ergänzen können und welche laufenden Kosten entstehen.
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
        <ImportedSectionDerPassendeEinstieg />
        <ImportedSectionKlarheitVorDemErsten />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-scope"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-scope">Wie möchten Sie fortfahren?</h2>
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
        <a className={"hc-gallery-card"} href="/leistungen/websites">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/b4c1010258293e22.webp 800w, /site-assets/55ecd78d79c41c10.webp 1280w, /site-assets/5c592a5dc791fcc3.webp 1920w"
              src="/site-assets/5c592a5dc791fcc3.webp"
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
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage; NeX und AIFly ORACLE sind dabei"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/b1c49cd9be2fd13d.webp 800w, /site-assets/28c1aab4293b944a.webp 1280w, /site-assets/15fa9607b63661b1.webp 1920w"
              src="/site-assets/15fa9607b63661b1.webp"
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
                Für Unternehmen, die vor dem Auftrag wissen wollen, welche Leistungen, Optionen und
                Kosten auf sie zukommen.
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
                Sie erkennen, was Sie zum Start erhalten, was zusätzlich beauftragt werden kann und
                wie sich Änderungen auf den Aufwand auswirken.
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
                Ein Paket umfasst nicht beliebig viele Leistungen. Verbindlich ist das abgestimmte
                Angebot mit Umfang, Abnahme und Kosten.
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
