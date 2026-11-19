import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/cookies.css?url";
import { canonicalLink } from "@/lib/seo";
import { LegalSections } from "@/components/site/LegalSections";
import { cookiesSections } from "@/lib/legal/cookies";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }, canonicalLink("/cookies")],
    meta: [
      { title: "Sie wählen, was zusätzlich aktiv wird. · NeXify AI" },
      {
        name: "description",
        content:
          "Notwendige Funktionen und optionale Messung haben unterschiedliche Aufgaben. Verständliche Einstellungen sollen vor optionaler Verarbeitung greifen. Die.",
      },
    ],
  }),
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
      <div className={"home-concept page-concept page-cookies layout-document context-nexify"}>
        <section className={"identity-hero is-text-only"} aria-labelledby="page-title-cookies">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Sie wählen, was zusätzlich aktiv wird.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht
              </span>
              <h1 id="page-title-cookies">Sie wählen, was zusätzlich aktiv wird.</h1>
              <p className={"identity-body"}>
                Notwendige Funktionen und optionale Messung haben unterschiedliche Aufgaben.
                Verständliche Einstellungen sollen vor optionaler Verarbeitung greifen. Was
                gespeichert wird und was nicht, steht vollständig auf dieser Seite.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/kontakt"
                >
                  <span>Mit NeXify Kontakt aufnehmen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/vertragsgrundlagen"
                >
                  Vereinbarung und Leistungsumfang
                </a>
              </div>
            </div>
          </div>
        </section>
        <LegalSections sections={cookiesSections} />
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
        <section
          className={"hc-section hc-container hc-process pc-related"}
          aria-labelledby="related-title-cookies"
        >
          <header className={"hc-section-heading hc-process-heading"}>
            <div>
              <span className={"hc-kicker"}>Weiterführende Seiten</span>
              <h2 id="related-title-cookies">Passende Themen</h2>
            </div>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
          </header>
          <ol>
            <li>
              <span className={"hc-kicker"}>NEXIFY AI</span>
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
                Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein
                paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der
                nächste Schritt aussieht.
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
              <span className={"hc-kicker"}>NEXIFY AI</span>
              <h3>
                <a href="/vertragsgrundlagen">
                  Gute Zusammenarbeit hat klare Grundlagen.
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
                Marke, Website, KI und Betreuung gehören zu einem abgestimmten Auftrag. Den
                verbindlichen Umfang legt die bestätigte Vereinbarung fest. Die Vertragsunterlagen
                bleiben bis zur gesonderten Endprüfung Entwürfe.
              </p>
              <a
                aria-label="Gute Zusammenarbeit hat klare Grundlagen. – Seite ansehen"
                className={"hc-text-link"}
                href="/vertragsgrundlagen"
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
                <a href="/impressum">
                  Impressum · NeXify AI by NeXify
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
                Anbieter dieser Website ist NeXify AI by NeXify, Inhaber Pascal Courbois, eine
                Eenmanszaak nach niederländischem Recht mit Anschrift in Venlo.
              </p>
              <a
                aria-label="Impressum · NeXify AI by NeXify – Seite ansehen"
                className={"hc-text-link"}
                href="/impressum"
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
                Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen
                und Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt
                auszuweisen. Verantwortlicher, Zwecke, Rechtsgrundlagen und Fristen stehen in der
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
          </ol>
        </section>
        <section
          className={"hc-section hc-finish hc-container is-plain"}
          aria-labelledby="finish-title-cookies"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="finish-title-cookies">Weiterführende Seiten</h2>
          </div>
          <div className={"hc-finish-next"}>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/kontakt">
                Mit NeXify Kontakt aufnehmen
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
              <a className={"hc-text-link"} href="/vertragsgrundlagen">
                Vereinbarung und Leistungsumfang
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
