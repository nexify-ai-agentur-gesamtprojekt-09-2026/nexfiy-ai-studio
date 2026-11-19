import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.skills-mcp.css?url";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/produkte_/skills-mcp")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }, canonicalLink("/produkte/skills-mcp") ], meta: [{ title: "Skills und MCP. Ihre Werkzeuge, angebunden. · NeXify AI" }, { name: "description", content: "Ein Skill ist eine Arbeitsweise, die ein Agent wiederholt anwenden kann. MCP ist der Standard, über den Agenten Ihre Systeme nutzen. Beides macht KI-Arbeit." }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-skills-mcp layout-company context-nexify"}>
              <section className={"identity-hero"} aria-labelledby="page-title-skills-mcp">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Skills und MCP. Ihre Werkzeuge, angebunden.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen</span>
                    <h1 id="page-title-skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.</h1>
                    <p className={"identity-body"}>Ein Skill ist eine Arbeitsweise, die ein Agent wiederholt anwenden kann. MCP ist der Standard, über den Agenten Ihre Systeme nutzen. Beides macht KI-Arbeit wiederholbar und kontrollierbar.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/produkte/api">
                        <span>NeXify API ansehen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/produkte/nex-agentic-aifly">NeX Agentic AIFly kennenlernen</a>
                    </div>
                  </div>
                  <div className={"identity-media"}>
                    <figure className={"identity-hero-photo"}>
                      <img sizes="(max-width: 820px) 100vw, 60vw" alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch" width="2000" height="1125" loading="eager" fetchPriority="high" decoding="async" srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w" src="/site-assets/df162c342bb041e0.webp" />
                    </figure>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-skills-mcp-skills-1-0">Skills: Methoden, die bleiben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-skills-mcp-skills-2-1">MCP: ein Zugang mit klaren Regeln<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-skills-mcp-skills-3-2">So kommen Sie zu Ihrer Anbindung<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-skills-mcp-skills-1-0" tabIndex={-1} aria-labelledby="content-skills-mcp-skills-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 03</span>
                    <h2 id="content-skills-mcp-skills-1-0-title">Skills: Methoden, die bleiben</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Wie wird eine Anfrage strukturiert, wie ein Ergebnis geprüft? Ein Skill hält das einmal fest, damit ein Agent es jedes Mal gleich macht. Vor dem Einsatz prüfen wir Herkunft, Eignung und Version.</p>
                    <p>Die fachliche Verantwortung bleibt bei Ihnen, Ihre Daten bleiben in Ihrem Projekt.</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/produkte/api">NeXify API ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-skills-mcp-skills-2-1" tabIndex={-1} aria-labelledby="content-skills-mcp-skills-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 03</span>
                    <h2 id="content-skills-mcp-skills-2-1-title">MCP: ein Zugang mit klaren Regeln</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Über das Model Context Protocol (MCP) nutzt ein Agent zugelassene Werkzeuge und Fachsysteme auf einem einheitlichen Weg. Für jede Verbindung steht fest, wer sie betreibt, wozu sie dient und was sie darf.</p>
                    <p>Welche Verbindungen wir für Ihr Projekt einrichten, hängt von Ihren Systemen ab und steht im Angebot.</p>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-skills-mcp-skills-3-2" tabIndex={-1} aria-labelledby="content-skills-mcp-skills-3-2-title">
                  <div>
                    <span className={"hc-kicker"}>03 / 03</span>
                    <h2 id="content-skills-mcp-skills-3-2-title">So kommen Sie zu Ihrer Anbindung</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Beschreiben Sie das System und die Aufgabe. Wir sehen uns die vorhandene Schnittstelle, die nötigen Rechte und den Nutzen an.</p>
                    <p>Danach erhalten Sie ein Angebot mit Aufwand und nächstem Schritt.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-skills-mcp">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-skills-mcp">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/produkte/api">NeXify API ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/produkte/nex-agentic-aifly">NeX Agentic AIFly kennenlernen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <button type="button" className={"hc-text-link"}>Angebot anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
                  </div>
                </div>
              </section>
            </div>
    </NexifyShell>
  );
}

function ImportedSectionDieFACTORYEntdeckenMit() {
  return (
    <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
      <details className={"hc-service-detail"}>
        <summary>
          <span>
            <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
          </span>
          <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 12h14m-7-7v14" />
          </svg>
        </summary>
        <div className={"hc-service-body"}>
          <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
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
              {...({ focusable: "false" } as any)}
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
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-skills-mcp">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-skills-mcp">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/api">NeXify API. KI in Ihrer Anwendung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die Schnittstelle nach Ihrem Datenfluss; genutzt wird über ein Guthaben, das Sie vorab aufladen.</p>
          <a aria-label="NeXify API. KI in Ihrer Anwendung. – Seite ansehen" className={"hc-text-link"} href="/produkte/api">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/nex-agentic-aifly">NeX Agentic AIFly. Der Agent, der ausführt.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.</p>
          <a aria-label="NeX Agentic AIFly. Der Agent, der ausführt. – Seite ansehen" className={"hc-text-link"} href="/produkte/nex-agentic-aifly">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/kontakt">Schildern Sie Ihr Vorhaben.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste Schritt aussieht.</p>
          <a aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen" className={"hc-text-link"} href="/kontakt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und Richtung vor; die KI-Agenten NeX und AIFly ORACLE arbeiten aus. Wir nennen das AI FACTORY.</p>
          <a aria-label="Ein Ansprechpartner. Ein Agententeam. – Seite ansehen" className={"hc-text-link"} href="/unternehmen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

