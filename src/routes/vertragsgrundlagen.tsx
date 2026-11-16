import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/vertragsgrundlagen.css?url";

export const Route = createFileRoute("/vertragsgrundlagen")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Gute Zusammenarbeit hat klare Grundlagen. · NeXify AI" },
      {
        name: "description",
        content:
          "Die Grundlagen der Zusammenarbeit mit NeXify: Umfang, Mitwirkung, Freigaben und Übergabe.",
      },
      { property: "og:title", content: "Gute Zusammenarbeit hat klare Grundlagen. · NeXify AI" },
      {
        property: "og:description",
        content:
          "Die Grundlagen der Zusammenarbeit mit NeXify: Umfang, Mitwirkung, Freigaben und Übergabe.",
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
      <div className={"home-concept page-concept page-terms layout-document context-nexify"}>
        <section className={"identity-hero is-text-only"} aria-labelledby="page-title-terms">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Gute Zusammenarbeit hat klare Grundlagen.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht
              </span>
              <h1 id="page-title-terms">Gute Zusammenarbeit hat klare Grundlagen.</h1>
              <p className={"identity-body"}>
                Bei Agenturprojekten legt die bestätigte Vereinbarung fest, welche Leistungen und
                welche Betreuung beauftragt sind. Die Vertragsunterlagen sind noch Entwürfe und
                nicht abschließend geprüft.
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
                  href="/datenschutz"
                >
                  Zum Umgang mit Ihren Daten
                </a>
              </div>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-terms-ueberblick-0">
            Umfang, Ergebnis und Zuständigkeit
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
          <a href="#content-terms-freigabestand-1">
            Kosten sauber aufteilen
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
            id="content-terms-ueberblick-0"
            tabIndex={-1}
            aria-labelledby="content-terms-ueberblick-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-terms-ueberblick-0-title">Umfang, Ergebnis und Zuständigkeit</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Ein Angebot beschreibt Leistungen, Ergebnisse, Mitwirkung und Abnahme. Änderungen
                werden ausdrücklich abgestimmt. Ein Gespräch oder ein vom Assistenten vorbereiteter
                Entwurf ist noch keine bestätigte Beauftragung.
              </p>

              <h3>Ein Angebot muss die Entscheidung erleichtern</h3>
              <p>
                Prüfen Sie, welches Ergebnis enthalten ist, welche Materialien Sie bereitstellen und
                was als eigener Posten hinzukommt. Abnahme und Änderungen müssen zum vereinbarten
                Auftrag passen. Diese Übersicht erteilt keine zusätzliche Vertrags- oder
                Rechtsfreigabe.
              </p>
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
            id="content-terms-freigabestand-1"
            tabIndex={-1}
            aria-labelledby="content-terms-freigabestand-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-terms-freigabestand-1-title">Kosten sauber aufteilen</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Umsetzung, optionale NeXify Care und variabler Modellverbrauch werden getrennt
                vereinbart. Maßgeblich sind die freigegebenen Konditionen Ihres Angebots;
                Beispielpakete und Chattexte setzen keine eigenen Preise oder Garantien.
              </p>
              <p>
                Für eigenständige Produkte gelten die jeweils freigegebenen Produktbedingungen.
                Diese Übersicht legt keine zusätzlichen Suite- oder API-Tarife fest.
              </p>

              <h3>Produktbedingungen bleiben eigenständig</h3>
              <p>
                Ein Agenturauftrag, die Nutzung einer Suite und API-Aufrufe haben unterschiedliche
                Voraussetzungen. Die freigegebenen Bedingungen des konkreten Angebots sind
                maßgeblich. Öffentlich beschriebene Beispielpakete ersetzen weder ein Angebot noch
                einen bestätigten Produkttarif.
              </p>
              <h3>Agenturleistung: Ergebnis und Mitwirkung</h3>
              <p>
                Bei Websites, Apps, Portalen, Automatisierungen und Kampagnen sind Lieferumfang,
                bereitgestellte Materialien, Zugriffe, Prüfschritte und Übergabe dem Auftrag
                zuzuordnen. Optionale Betreuung, Hosting, Fremdsoftware, Modellverbrauch und
                Medienbudget sind keine automatisch enthaltenen Leistungen.
              </p>
              <h3>Suite: Arbeitsbereich und Produktbedingungen</h3>
              <p>
                Die Suite ist unabhängig von einem Agenturauftrag. Die öffentliche Beschreibung
                nennt einen selbst gestarteten 24-Stunden-Test nach Aktivierung sowie ein getrenntes
                Modellbudget. Ein Website-Konto bestätigt diese Aktivierung nicht. Tarif, verfügbare
                Werkzeuge und verbindliche Nutzungsbedingungen müssen vor der Produktnutzung
                feststehen; diese Übersicht setzt keine Laufzeit, Kündigungsfrist oder automatische
                Verlängerung fest.
              </p>
              <h3>API: Aufrufverbrauch und Integrationsarbeit</h3>
              <p>
                Die API ist für KI innerhalb eigener Software beschrieben. Prepaid-Guthaben betrifft
                Aufrufe; die individuelle Einrichtung einer Verbindung ist davon getrennt. Der
                Zugang wird derzeit im Rahmen eines Projekts eingerichtet, eine direkte
                Freischaltung fehlt auf diesem Auftritt. Nutzbare Endpunkte, Limits und freigegebene
                Tarife sind vor dem Einsatz zu klären. Es werden hier keine Guthabenerstattung,
                Verfügbarkeit oder Servicegarantie zugesagt.
              </p>
              <h3>Agenten und angebundene Werkzeuge</h3>
              <p>
                Ein Agentenauftrag benennt Quellen, erlaubte Werkzeuge und überprüfbare Ergebnisse.
                Recherche, Entwurf und tatsächliche Ausführung bleiben getrennte Schritte. Ein
                Kontozugang, ein Skill oder eine MCP-Verbindung ersetzt keine auftragsbezogene
                Freigabe für Datenzugriffe oder Handlungen.
              </p>
              <h3>TEILEKLAR und noch nicht freigegebene Unterlagen</h3>
              <p>
                Teilehandel und Werkstattleistungen benötigen eine eigene Anbieter- und
                Vertragszuordnung. Dieser Auftritt bietet derzeit keinen Onlinekauf. Anfrageentwürfe
                sind keine Bestellung, bestätigten Termine oder Passungszusage. Die importierten
                Kauftexte sind nicht als aktuelle Verkaufsbedingungen freigegeben.
              </p>
              <nav className="legal-scope-links" aria-label="Zum jeweiligen Angebot">
                <a href="/leistungen">Agenturleistungen</a>
                <a href="/produkte/nex2fly">Suite</a>
                <a href="/produkte/api">API</a>
                <a href="/teileklar/rechtliches">TEILEKLAR-Unterlagen</a>
              </nav>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container is-plain"}
          aria-labelledby="finish-title-terms"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="finish-title-terms">Weiterführende Seiten</h2>
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
              <a className={"hc-text-link"} href="/datenschutz">
                Zum Umgang mit Ihren Daten
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
      aria-labelledby="related-title-terms"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-terms">Passende Themen</h2>
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
            <a href="/ki-hinweise">
              KI mit klarer Verantwortung.
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
            NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit.
            Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine
            KI-Ausgabe ist keine automatische Entscheidung oder Zusage.
          </p>
          <a
            aria-label="KI mit klarer Verantwortung. – Seite ansehen"
            className={"hc-text-link"}
            href="/ki-hinweise"
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
