import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/wissen.projekt-vorbereiten.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wissen_/projekt-vorbereiten")({
  head: () => pageHead("/wissen/projekt-vorbereiten", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div
        className={"home-concept page-concept page-knowledge-start layout-article context-nexify"}
      >
        <section className={"identity-hero"} aria-labelledby="page-title-knowledge-start">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <a href="/wissen">So arbeiten wir.</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Ihr Briefing in fünf Fragen.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>Wissen und Orientierung
              </span>
              <h1 id="page-title-knowledge-start">Ihr Briefing in fünf Fragen.</h1>
              <p className={"identity-body"}>
                Sie brauchen kein fertiges Konzept. Fünf Antworten genügen, damit aus Ihrer Idee ein
                Angebot werden kann.
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
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal bespricht ein Dokument mit einer Gesprächspartnerin im Empfangsbereich"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/1a5734bbeb80a90b.webp 800w, /site-assets/855bb0082f7bbaf6.webp 1280w, /site-assets/7ab67fba9fccf952.webp 1920w"
                  src="/site-assets/7ab67fba9fccf952.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-knowledge-start-knowledge-start-customer-1-0">
            Die fünf Fragen
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
          <a href="#content-knowledge-start-knowledge-start-customer-2-1">
            Wenn Technik im Spiel ist
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
            id="content-knowledge-start-knowledge-start-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-knowledge-start-knowledge-start-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-knowledge-start-knowledge-start-customer-1-0-title">
                Die fünf Fragen
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>1. Was bieten Sie an, und für wen?</p>
              <p>
                2. Was soll sich ändern – mehr Anfragen, weniger Handarbeit, ein neuer Auftritt?
              </p>
              <p>3. Was funktioniert heute gut, und wo springen Kunden ab?</p>
              <p>4. Welche Unterlagen, Inhalte und Beispiele gibt es schon?</p>
              <p>5. Welchen Rahmen haben Sie für Budget und Termin?</p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
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
            id="content-knowledge-start-knowledge-start-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-knowledge-start-knowledge-start-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-knowledge-start-knowledge-start-customer-2-1-title">
                Wenn Technik im Spiel ist
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Nennen Sie die Systeme, die Sie nutzen – Website, Shopsoftware, Schnittstellen – und
                die Personen, die mitentscheiden. Schreiben Sie dazu, welche Aufgabe künftig
                leichter werden soll.
              </p>
              <p>
                Zugangsdaten gehören nicht in die Anfrage. Dafür vereinbaren wir einen sicheren Weg.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-knowledge-start"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Im Detail</span>
            <h2 id="finish-title-knowledge-start">Wie möchten Sie fortfahren?</h2>
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
                  focusable="false"
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
                  focusable="false"
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
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

function ImportedSectionPassendeThemen() {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby="related-title-knowledge-start"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-knowledge-start">Passende Themen</h2>
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
            <a href="/wissen">
              So arbeiten wir.
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
            Vom ersten Gespräch bis zur Übergabe: Sie sehen früh, welche Richtung entsteht, was
            enthalten ist und welche Entscheidung als Nächstes ansteht.
          </p>
          <a
            aria-label="So arbeiten wir. – Seite ansehen"
            className={"hc-text-link"}
            href="/wissen"
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

function ImportedNavSeitenBersicht() {
  return (
    <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
      <div className={"footer-overview-group"}>
        <h3>Leistungen</h3>
        <a href="/leistungen">Website, System, Kampagne. Aus einer Hand.</a>
        <a href="/leistungen/websites">Eine Website, die Ihr Angebot erklärt.</a>
        <a href="/leistungen/agenten-automatisierung">Routine abgeben. Kontrolle behalten.</a>
        <a href="/leistungen/apps-portale">Portale und Apps für Ihren Ablauf.</a>
        <a href="/leistungsumfang">Drei Pakete. Ein klarer Umfang.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Produkte</h3>
        <a href="/loesungen">Kampagne und Zielseite aus einem Guss.</a>
        <a href="/preise-ablauf">Sie kennen die Kosten vor dem Start.</a>
        <a href="/produkte/nex2fly">NeX AIFly Suite. Ihr KI-Arbeitsbereich.</a>
        <a href="/produkte/one">Zwei Agenten. Eine klare Aufgabe.</a>
        <a href="/produkte/api">NeXify API. KI in Ihrer Anwendung.</a>
        <a href="/produkte/aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.</a>
        <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.</a>
        <a href="/produkte/skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Wissen und Unternehmen</h3>
        <a href="/">Ein Gespräch. Ein Projekt, das passt.</a>
        <a href="/wissen">So arbeiten wir.</a>
        <a href="/wissen/projekt-vorbereiten" aria-current="page">
          Ihr Briefing in fünf Fragen.
        </a>
        <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.</a>
        <a href="/kontakt">Schildern Sie Ihr Vorhaben.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Kundencenter</h3>
        <a href="/portale">Stand des Kundencenters.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Rechtliches</h3>
        <a href="/impressum">Impressum · NeXify AI by NeXify</a>
        <a href="/datenschutz">Ihre Daten. Ein klarer Zweck.</a>
        <a href="/vertragsgrundlagen">Gute Zusammenarbeit hat klare Grundlagen.</a>
        <a href="/ki-hinweise">KI mit klarer Verantwortung.</a>
        <a href="/barrierefreiheit">Qualität soll zugänglich sein.</a>
        <a href="/cookies">Sie wählen, was zusätzlich aktiv wird.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Weitere Seiten</h3>
        <a href="/portale">Portale. Ihr Zugang, Ihr Bereich.</a>
      </div>
    </nav>
  );
}
