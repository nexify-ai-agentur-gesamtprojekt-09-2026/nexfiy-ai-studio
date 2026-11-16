import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/ki-hinweise.css?url";

export const Route = createFileRoute("/ki-hinweise")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "KI mit klarer Verantwortung. · NeXify AI" },
      {
        name: "description",
        content: "Hinweise zu KI-Inhalten, Verantwortlichkeiten und Grenzen bei NeXify AI.",
      },
      { property: "og:title", content: "KI mit klarer Verantwortung. · NeXify AI" },
      {
        property: "og:description",
        content: "Hinweise zu KI-Inhalten, Verantwortlichkeiten und Grenzen bei NeXify AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <div className={"home-concept page-concept page-ai-notice layout-document context-nexify"}>
        <section className={"identity-hero is-text-only"} aria-labelledby="page-title-ai-notice">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">KI mit klarer Verantwortung.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht
              </span>
              <h1 id="page-title-ai-notice">KI mit klarer Verantwortung.</h1>
              <p className={"identity-body"}>
                NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit.
                Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine
                KI-Ausgabe ist keine automatische Entscheidung oder Zusage.
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
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-ai-notice-ueberblick-0">
            Der Assistent auf dieser Website
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
          <a href="#content-ai-notice-ki-transparenz-1">
            Bildwelt und Entwürfe einordnen
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
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-ai-notice-ueberblick-0"
            tabIndex={-1}
            aria-labelledby="content-ai-notice-ueberblick-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-ai-notice-ueberblick-0-title">Der Assistent auf dieser Website</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                AIFly ORACLE beantwortet Fragen zu Suite und API mit einem KI-Modell über AI
                Gateway. Grundlage sind die öffentlichen Produktinformationen. Die Beratung greift
                nicht auf Ihr Konto, Kundenprojekte oder private Dokumente zu. Antworten können
                Fehler enthalten; maßgeblich sind die Angaben auf den verlinkten Produktseiten.
              </p>
              <p>
                Der Chat schließt keine Verträge, bucht keine Termine und löst keine Zahlungen aus.
                Verbindliche Schritte werden gesondert bestätigt.
              </p>

              <h3>Eine hilfreiche Orientierung, keine verbindliche Entscheidung</h3>
              <p>
                Beschreiben Sie das gewünschte Ergebnis: Zusammenarbeit an Dokumenten, Organisation
                von Aufgaben oder KI in einer eigenen Anwendung. ORACLE ordnet diese Frage ein.
                Zugang, aktuelle Tarife und verbindliche Bedingungen prüfen Sie auf der jeweiligen
                Einstiegsseite.
              </p>
              <h3>Website-Beratung und Produktnutzung sind nicht dasselbe</h3>
              <p>
                Die öffentliche Beratung vergleicht zwei Produktwege: Die Suite ist ein eigener
                KI-Arbeitsbereich; die API bindet KI in Ihre eigene Software ein. Eine Empfehlung
                aktiviert weder das Produkt noch dessen Werkzeuge. Der Chat prüft keine Guthaben,
                Kontoberechtigungen oder privaten Quellen.
              </p>
              <h3>Agenten, Skills und MCP im konkreten Einsatz</h3>
              <p>
                NeX, AIFly ORACLE und wiederverwendbare Skills können in einem gesondert
                beschriebenen Einsatz unterschiedliche Aufgaben übernehmen. Ein Skill beschreibt
                eine Methode, MCP einen Werkzeugzugang. Beides erteilt keine zusätzlichen
                Datenrechte und keine pauschale Freigabe zum Versenden, Veröffentlichen oder
                Bezahlen.
              </p>
              <p>
                Die Agentenwerkzeuge dieses Auftritts geben nach Anmeldung und Autorisierung
                öffentliche Seiten- und Kontaktinformationen zurück. Sie sind keine Verbindung zum
                Suite-Arbeitsbereich und kein Zugang zu vertraulichen Projekten. Ein KI-Ergebnis ist
                vor fachlicher oder folgenreicher Verwendung zu prüfen.
              </p>
              <h3>TEILEKLAR: Information statt Passungsentscheidung</h3>
              <p>
                Die TEILEKLAR-Hilfe verweist auf Themen und bereitet eine Anfrage vor. Der
                Reifenrechner vergleicht rechnerische Nennmaße; er prüft keine Fahrzeugfreigabe oder
                rechtliche Zulässigkeit. Teileauswahl, Einbau und Terminbestätigung benötigen eine
                eigene fachliche Prüfung.
              </p>
              <nav className="legal-scope-links" aria-label="Produkte und Einsatzgrenzen">
                <a href="/produkte/nex2fly">Suite</a>
                <a href="/produkte/api">API</a>
                <a href="/produkte/skills-mcp">Skills und MCP</a>
                <a href="/datenschutz">Datenverarbeitung</a>
              </nav>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
                <a className={"hc-text-link"} href="/kontakt">
                  Ihr Projekt an die Factory
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
            id="content-ai-notice-ki-transparenz-1"
            tabIndex={-1}
            aria-labelledby="content-ai-notice-ki-transparenz-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-ai-notice-ki-transparenz-1-title">Bildwelt und Entwürfe einordnen</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Die Bildwelt enthält KI-gestützte Bearbeitungen und animierte Kompositionen. Sie
                zeigt die gestalterische Ausrichtung, keine Kundenreferenzen oder
                Leistungsnachweise. Fachliche Aussagen und folgenreiche Handlungen benötigen ihre
                eigene Prüfung.
              </p>

              <h3>Bilder zeigen die Marke, nicht einen Leistungsnachweis</h3>
              <p>
                Die Figuren und inszenierten Arbeitsräume vermitteln den Markenauftritt. Sie belegen
                weder abgeschlossene Kundenprojekte noch die Größe eines menschlichen Teams. Für die
                Bewertung eines Angebots zählen der vereinbarte Umfang und überprüfbare Ergebnisse.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container is-plain"}
          aria-labelledby="finish-title-ai-notice"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="finish-title-ai-notice">Weiterführende Seiten</h2>
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
                  {...({ focusable: "false" } as any)}
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
            Hier finden Sie unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich
            auch direkt öffnen.
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
      aria-labelledby="related-title-ai-notice"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-ai-notice">Passende Themen</h2>
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
                {...({ focusable: "false" } as any)}
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
              {...({ focusable: "false" } as any)}
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
                {...({ focusable: "false" } as any)}
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
              {...({ focusable: "false" } as any)}
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
                {...({ focusable: "false" } as any)}
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
      </ol>
    </section>
  );
}
