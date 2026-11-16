import { SiteFilm } from "@/components/SiteFilm";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.nex-agentic-aifly.css?url";

export const Route = createFileRoute("/produkte_/nex-agentic-aifly")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "NeX Agentic AIFly. Der Agent, der ausführt. · NeXify AI" }, { name: "description", content: "NeX Agentic AIFly unterstützt bei benannten Arbeitsschritten und der Ausführung von Aufgaben." }, { property: "og:title", content: "NeX Agentic AIFly. Der Agent, der ausführt. · NeXify AI" }, { property: "og:description", content: "NeX Agentic AIFly unterstützt bei benannten Arbeitsschritten und der Ausführung von Aufgaben." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-nex-agentic layout-company context-nexify"}>
              <ImportedSectionNeXAgenticAIFlyDer />
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-nex-agentic-nex-1-0">Ausführen statt nur beraten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-nex-agentic-nex-2-1">Was bei Ihnen bleibt<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-nex-agentic-nex-3-2">So setzen Sie NeX ein<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-nex-agentic-nex-1-0" tabIndex={-1} aria-labelledby="content-nex-agentic-nex-1-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 03</span>
                    <h2 id="content-nex-agentic-nex-1-0-title">Ausführen statt nur beraten</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Vor jedem Einsatz steht fest, was entstehen soll, welche Quellen und Werkzeuge NeX verwenden darf und wer das Ergebnis prüft. Dann arbeitet NeX die Schritte ab.</p>
                    <p>Ob ein Schritt ausgeführt ist, sehen Sie am Ergebnis – nicht an einer Behauptung.</p>
                    <div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>NeX · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/produkte/skills-mcp">Skills und MCP ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-nex-agentic-nex-2-1" tabIndex={-1} aria-labelledby="content-nex-agentic-nex-2-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 03</span>
                    <h2 id="content-nex-agentic-nex-2-1-title">Was bei Ihnen bleibt</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Nachrichten nach außen, verbindliche Angebote und Zahlungen bleiben Ihre Entscheidung. Ein Entwurf ist noch kein Versand und kein Vertrag.</p>
                    <p>Ihre Daten bleiben Ihrem Projekt zugeordnet. Wie Ergebnisse geprüft und Änderungen nachvollzogen werden, legen wir vor dem Einsatz fest.</p>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-nex-agentic-nex-3-2" tabIndex={-1} aria-labelledby="content-nex-agentic-nex-3-2-title">
                  <div>
                    <span className={"hc-kicker"}>03 / 03</span>
                    <h2 id="content-nex-agentic-nex-3-2-title">So setzen Sie NeX ein</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>NeX arbeitet in Aufträgen, die wir mit Ihnen vereinbaren. Schildern Sie die Aufgabe und die beteiligten Systeme.</p>
                    <p>Wir prüfen Voraussetzungen und Rechte und nennen im Angebot, welche Schritte NeX für Sie übernimmt.</p>
                  </div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container"} aria-labelledby="finish-title-nex-agentic">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Im Detail</span>
                  <h2 id="finish-title-nex-agentic">Wie möchten Sie fortfahren?</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/produkte/skills-mcp">Skills und MCP ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/produkte/aifly-oracle">AIFly ORACLE kennenlernen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/kontakt">Vorhaben schildern<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <button type="button" className={"hc-text-link"}>Angebot anfragen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
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
          <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen</span>
          <h1 id="page-title-nex-agentic">NeX Agentic AIFly. Der Agent, der ausführt.</h1>
          <p className={"identity-body"}>NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.</p>
          <div className={"identity-links"}>
            <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/produkte/skills-mcp">
              <span>Skills und MCP ansehen</span>
              <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
            </a>
            <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/produkte/aifly-oracle">AIFly ORACLE kennenlernen</a>
          </div>
        </div>
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <SiteFilm film="fertigung" eager />
          </figure>
        </div>
      </div>
    </section>
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
          <div className={"pc-guide-controls"}>
            <label id="bb-customSelect-jt4z9-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-jt4z9-panel" aria-activedescendant="bb-customSelect-jt4z9-selectedOption" aria-labelledby="bb-customSelect-jt4z9-label" tabIndex={0}><span>Markenstart</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-jt4z9-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-jt4z9-selectedOption">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option"} role="option">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
            <button type="button" aria-pressed="false">Begleitung starten</button>
          </div>
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-nex-agentic">
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
            <a href="/produkte/skills-mcp">Skills und MCP. Ihre Werkzeuge, angebunden.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Ein Skill ist eine Arbeitsweise, die ein Agent wiederholt anwenden kann. MCP ist der Standard, über den Agenten Ihre Systeme nutzen. Beides macht KI-Arbeit wiederholbar und kontrollierbar.</p>
          <a aria-label="Skills und MCP. Ihre Werkzeuge, angebunden. – Seite ansehen" className={"hc-text-link"} href="/produkte/skills-mcp">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/produkte/aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>AIFly ORACLE ist das KI-System, das Aufgaben ordnet und Ihnen im Chat dieser Website antwortet. Schildern Sie Ihr Vorhaben – es zeigt Ihnen den passenden nächsten Schritt.</p>
          <a aria-label="AIFly ORACLE. Erst ordnen, dann handeln. – Seite ansehen" className={"hc-text-link"} href="/produkte/aifly-oracle">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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

