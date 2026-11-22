import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.nex-agentic-aifly.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/produkte_/nex-agentic-aifly")({
  head: () => pageHead("/produkte/nex-agentic-aifly", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-nex-agentic layout-company context-nexify"}>
        <ImportedSectionNeXAgenticAIFlyDer />
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-nex-agentic-nex-1-0">
            Ausführen statt nur beraten
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
          <a href="#content-nex-agentic-nex-2-1">
            Was bei Ihnen bleibt
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
          <a href="#content-nex-agentic-nex-3-2">
            So setzen Sie NeX ein
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
            id="content-nex-agentic-nex-1-0"
            tabIndex={-1}
            aria-labelledby="content-nex-agentic-nex-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 03</span>
              <h2 id="content-nex-agentic-nex-1-0-title">Ausführen statt nur beraten</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Vor jedem Einsatz steht fest, was entstehen soll, welche Quellen und Werkzeuge NeX
                verwenden darf und wer das Ergebnis prüft. Dann arbeitet NeX die Schritte ab.
              </p>
              <p>
                Ob ein Schritt ausgeführt ist, sehen Sie am Ergebnis – nicht an einer Behauptung.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
                <a className={"hc-text-link"} href="/produkte/skills-mcp">
                  Skills und MCP ansehen
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
            id="content-nex-agentic-nex-2-1"
            tabIndex={-1}
            aria-labelledby="content-nex-agentic-nex-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 03</span>
              <h2 id="content-nex-agentic-nex-2-1-title">Was bei Ihnen bleibt</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Nachrichten nach außen, verbindliche Angebote und Zahlungen bleiben Ihre
                Entscheidung. Ein Entwurf ist noch kein Versand und kein Vertrag.
              </p>
              <p>
                Ihre Daten bleiben Ihrem Projekt zugeordnet. Wie Ergebnisse geprüft und Änderungen
                nachvollzogen werden, legen wir vor dem Einsatz fest.
              </p>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-nex-agentic-nex-3-2"
            tabIndex={-1}
            aria-labelledby="content-nex-agentic-nex-3-2-title"
          >
            <div>
              <span className={"hc-kicker"}>03 / 03</span>
              <h2 id="content-nex-agentic-nex-3-2-title">So setzen Sie NeX ein</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                NeX arbeitet in Aufträgen, die wir mit Ihnen vereinbaren. Schildern Sie die Aufgabe
                und die beteiligten Systeme.
              </p>
              <p>
                Wir prüfen Voraussetzungen und Rechte und nennen im Angebot, welche Schritte NeX für
                Sie übernimmt.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-nex-agentic"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Im Detail</span>
            <h2 id="finish-title-nex-agentic">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/produkte/skills-mcp">
                Skills und MCP ansehen
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
              <a className={"hc-text-link"} href="/produkte/aifly-oracle">
                AIFly ORACLE kennenlernen
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
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}

function ImportedSectionNeXAgenticAIFlyDer() {
  return (
    <section className={"identity-hero"} aria-labelledby="page-title-nex-agentic">
      <div className={"identity-scene"}>
        <div className={"identity-copy"}>
          <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
            <ol>
              <li>
                <a href="/">Startseite</a>
              </li>
              <li className={"visually-hidden"}>
                <span aria-current="page">NeX Agentic AIFly. Der Agent, der ausführt.</span>
              </li>
            </ol>
          </nav>
          <span className={"hc-kicker"}>
            NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen
          </span>
          <h1 id="page-title-nex-agentic">NeX Agentic AIFly. Der Agent, der ausführt.</h1>
          <p className={"identity-body"}>
            NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende
            Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.
          </p>
          <div className={"identity-links"}>
            <a
              className={"nexify-control primary-button identity-primary-link"}
              data-variant="primary"
              href="/produkte/skills-mcp"
            >
              <span>Skills und MCP ansehen</span>
              <span aria-hidden="true" className={"identity-primary-arrow"}>
                →
              </span>
            </a>
            <a
              className={"nexify-control secondary-button identity-secondary-link"}
              data-variant="secondary"
              href="/produkte/aifly-oracle"
            >
              AIFly ORACLE kennenlernen
            </a>
          </div>
        </div>
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img
                  className={"atelier-film-fallback"}
                  alt="Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage; NeX und AIFly ORACLE sind dabei"
                  aria-hidden="false"
                  width="1280"
                  height="720"
                  fetchPriority="high"
                  src="/site-assets/15fa9607b63661b1.webp"
                />
                <video
                  src="/site-assets/8b4870140b46d3f8.mp4"
                  poster="/site-assets/15fa9607b63661b1.webp"
                  width="1280"
                  height="720"
                  preload="metadata"
                  playsInline
                  aria-label="Markenszene mit Pascal, NeX und AIFly ORACLE"
                  muted
                />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg
                      className={"atelier-playback-icon"}
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg
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
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_r_4_-volume">
                        Lautstärke
                        <input
                          id="_r_4_-volume"
                          min="0"
                          max="1"
                          step="0.05"
                          type="range"
                          defaultValue="0.8"
                        />
                      </label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} data-site-import-responsive="464" />
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
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
      aria-labelledby="related-title-nex-agentic"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-nex-agentic">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/skills-mcp">
              Skills und MCP. Ihre Werkzeuge, angebunden.
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
            Ein Skill ist eine Arbeitsweise, die ein Agent wiederholt anwenden kann. MCP ist der
            Standard, über den Agenten Ihre Systeme nutzen. Beides macht KI-Arbeit wiederholbar und
            kontrollierbar.
          </p>
          <a
            aria-label="Skills und MCP. Ihre Werkzeuge, angebunden. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/skills-mcp"
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
            <a href="/produkte/aifly-oracle">
              AIFly ORACLE. Erst ordnen, dann handeln.
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
            AIFly ORACLE ist das KI-System, das Aufgaben ordnet und Ihnen im Chat dieser Website
            antwortet. Schildern Sie Ihr Vorhaben – es zeigt Ihnen den passenden nächsten Schritt.
          </p>
          <a
            aria-label="AIFly ORACLE. Erst ordnen, dann handeln. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/aifly-oracle"
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
