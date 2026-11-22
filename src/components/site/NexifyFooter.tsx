import { useCurrentPage } from "@/hooks/use-current-page";
import { LOGO_KLEIN } from "@/lib/site-facts";
import korrekturenCSS from "../../styles/site-korrekturen.css?url";

/** NeXify site footer, shared by every NeXify page; the link to the current page is marked for assistive tech. */
export function NexifyFooter() {
  const here = useCurrentPage();
  return (
    <footer className={"site-footer structured-footer footer-refined"}>
      <link rel="stylesheet" href={korrekturenCSS} precedence="site-korrekturen" />
      <div className={"footer-inner"}>
        <div className={"footer-invitation"}>
          <div>
            <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
            <p>
              Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden
              nächsten Schritt.
            </p>
          </div>
          <a
            className={"nexify-control primary-button "}
            data-variant="primary"
            href="/kontakt"
            {...here("/kontakt")}
          >
            Projekt besprechen
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </a>
        </div>
        <div className={"footer-main"}>
          <div className={"footer-brand-block"}>
            <a aria-label="Zur Startseite" className={"brand"} href="/" {...here("/")}>
              <span className={"nx-logo"} data-groesse="s">
                <span className={"nx-logo-figur"} aria-hidden="true">
                  <img
                    src={LOGO_KLEIN}
                    alt=""
                    width="192"
                    height="192"
                    decoding="async"
                    draggable="false"
                  />
                </span>
                <span className={"nx-logo-wort"}>
                  <span className={"nx-logo-name"}>
                    Ne<span className={"nx-logo-x"}>X</span>ify AI
                  </span>
                  <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
                </span>
              </span>
            </a>
            <p>
              Websites, digitale Abläufe und Kampagnen für Ihr Unternehmen. Persönlich begleitet von
              Pascal Courbois.
            </p>
            <a
              className={"nexify-control  footer-contact"}
              data-variant="text"
              href="/kontakt"
              {...here("/kontakt")}
            >
              Ihr Projekt mit NeXify besprechen <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className={"footer-link-groups "}>
            <nav aria-label={"Produkte & Arbeitsbereiche"}>
              <h2>Produkte &amp; Arbeitsbereiche</h2>
              <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
                NeX AIFly Suite
              </a>
              <a href="/produkte/one" {...here("/produkte/one")}>
                NeX Agentic AI
              </a>
              <a href="/produkte/api" {...here("/produkte/api")}>
                NeXify API
              </a>
              <a href="/produkte/aifly-oracle" {...here("/produkte/aifly-oracle")}>
                AIFly ORACLE
              </a>
              <a href="/produkte/nex-agentic-aifly" {...here("/produkte/nex-agentic-aifly")}>
                NeX Agentic AIFly
              </a>
              <a href="/produkte/skills-mcp" {...here("/produkte/skills-mcp")}>
                Skills und MCP
              </a>
            </nav>
            <nav aria-label={"Leistungen & Zusammenarbeit"}>
              <h2>Leistungen &amp; Zusammenarbeit</h2>
              <a href="/leistungen/websites" {...here("/leistungen/websites")}>
                Websites &amp; Markenauftritt
              </a>
              <a
                href="/leistungen/agenten-automatisierung"
                {...here("/leistungen/agenten-automatisierung")}
              >
                Automatisierung &amp; KI
              </a>
              <a href="/leistungen/apps-portale" {...here("/leistungen/apps-portale")}>
                Apps &amp; Portale
              </a>
              <a href="/loesungen" {...here("/loesungen")}>
                Landingpages &amp; Kampagnen
              </a>
              <a href="/preise-ablauf" {...here("/preise-ablauf")}>
                Preise &amp; Ablauf
              </a>
            </nav>
            <nav aria-label="NeXify AI">
              <h2>NeXify AI</h2>
              <a href="/unternehmen" {...here("/unternehmen")}>
                Über NeXify
              </a>
              <a href="/kontakt" {...here("/kontakt")}>
                Kontakt
              </a>
              <a href="/portale" {...here("/portale")}>
                Kundencenter
              </a>
            </nav>
            <nav aria-label="Rechtliches">
              <h2>Rechtliches</h2>
              <a href="/impressum" {...here("/impressum")}>
                Impressum
              </a>
              <a href="/datenschutz" {...here("/datenschutz")}>
                Datenschutz
              </a>
              <a href="/vertragsgrundlagen" {...here("/vertragsgrundlagen")}>
                Vertragsgrundlagen
              </a>
              <a href="/ki-hinweise" {...here("/ki-hinweise")}>
                KI-Hinweise
              </a>
              <a href="/barrierefreiheit" {...here("/barrierefreiheit")}>
                Barrierefreiheit
              </a>
              <a href="/cookies" {...here("/cookies")}>
                Cookies &amp; Speicherung
              </a>
            </nav>
          </div>
        </div>
        <div className={"footer-bottom"}>
          <span className={"footer-claim"}>
            NeXify AI <span aria-hidden="true">·</span> Chat it. Automate it.
          </span>
          <details className={"footer-overview"}>
            <summary>
              <span>Seitenübersicht</span>
              <span className={"footer-overview-marker"} aria-hidden="true">
                +
              </span>
            </summary>
            <div className={"footer-overview-panel"} id="_R_8lbH1_">
              <p className={"footer-overview-hint"}>
                Alle Seiten dieses Bereichs, nach Themen geordnet
              </p>
              <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
                <div className={"footer-overview-group"}>
                  <h3>Leistungen</h3>
                  <a href="/leistungen" {...here("/leistungen")}>
                    Website, System, Kampagne. Aus einer Hand.
                  </a>
                  <a href="/leistungen/websites" {...here("/leistungen/websites")}>
                    Eine Website, die Ihr Angebot erklärt.
                  </a>
                  <a
                    href="/leistungen/agenten-automatisierung"
                    {...here("/leistungen/agenten-automatisierung")}
                  >
                    Routine abgeben. Kontrolle behalten.
                  </a>
                  <a href="/leistungen/apps-portale" {...here("/leistungen/apps-portale")}>
                    Portale und Apps für Ihren Ablauf.
                  </a>
                  <a href="/leistungsumfang" {...here("/leistungsumfang")}>
                    Drei Pakete. Ein klarer Umfang.
                  </a>
                  <a href="/loesungen" {...here("/loesungen")}>
                    Kampagne und Zielseite aus einem Guss.
                  </a>
                  <a href="/preise-ablauf" {...here("/preise-ablauf")}>
                    Sie kennen die Kosten vor dem Start.
                  </a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Produkte</h3>
                  <a href="/produkte/nex2fly" {...here("/produkte/nex2fly")}>
                    NeX AIFly Suite. Ihr KI-Arbeitsbereich.
                  </a>
                  <a href="/produkte/one" {...here("/produkte/one")}>
                    Zwei Agenten. Eine klare Aufgabe.
                  </a>
                  <a href="/produkte/api" {...here("/produkte/api")}>
                    NeXify API. KI in Ihrer Anwendung.
                  </a>
                  <a href="/produkte/aifly-oracle" {...here("/produkte/aifly-oracle")}>
                    AIFly ORACLE. Erst ordnen, dann handeln.
                  </a>
                  <a href="/produkte/nex-agentic-aifly" {...here("/produkte/nex-agentic-aifly")}>
                    NeX Agentic AIFly. Der Agent, der ausführt.
                  </a>
                  <a href="/produkte/skills-mcp" {...here("/produkte/skills-mcp")}>
                    Skills und MCP. Ihre Werkzeuge, angebunden.
                  </a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Wissen und Unternehmen</h3>
                  <a href="/" {...here("/")}>
                    Ein Gespräch. Ein Projekt, das passt.
                  </a>
                  <a href="/wissen" {...here("/wissen")}>
                    So arbeiten wir.
                  </a>
                  <a href="/wissen/projekt-vorbereiten" {...here("/wissen/projekt-vorbereiten")}>
                    Ihr Briefing in fünf Fragen.
                  </a>
                  <a href="/unternehmen" {...here("/unternehmen")}>
                    Ein Ansprechpartner. Ein Agententeam.
                  </a>
                  <a href="/kontakt" {...here("/kontakt")}>
                    Schildern Sie Ihr Vorhaben.
                  </a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Kundencenter</h3>
                  <a href="/portale" {...here("/portale")}>
                    Stand des Kundencenters.
                  </a>
                </div>
                <div className={"footer-overview-group"}>
                  <h3>Rechtliches</h3>
                  <a href="/impressum" {...here("/impressum")}>
                    Impressum · NeXify AI by NeXify
                  </a>
                  <a href="/datenschutz" {...here("/datenschutz")}>
                    Ihre Daten. Ein klarer Zweck.
                  </a>
                  <a href="/vertragsgrundlagen" {...here("/vertragsgrundlagen")}>
                    Gute Zusammenarbeit hat klare Grundlagen.
                  </a>
                  <a href="/ki-hinweise" {...here("/ki-hinweise")}>
                    KI mit klarer Verantwortung.
                  </a>
                  <a href="/barrierefreiheit" {...here("/barrierefreiheit")}>
                    Qualität soll zugänglich sein.
                  </a>
                  <a href="/cookies" {...here("/cookies")}>
                    Cookies und Speicherung
                  </a>
                </div>
              </nav>
            </div>
          </details>
        </div>
        <div className={"footer-legal"}>
          <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
            <a href="/impressum" {...here("/impressum")}>
              Impressum
            </a>
            <a href="/datenschutz" {...here("/datenschutz")}>
              Datenschutz
            </a>
          </nav>
          <p className={"footer-ai-note"}>
            <a href="/ki-hinweise" {...here("/ki-hinweise")}>
              Markeninszenierung · KI-generiert
            </a>
            {/* 2026-11-22 03:03 (Europe/Berlin): B2B-Hinweis nach § 14 BGB. */}
            <span>Angebot für Unternehmer gemäß § 14 BGB (B2B).</span>
          </p>
          <details className={"footer-legal-details"}>
            <summary>Hinweise zu den Rechtsdokumenten</summary>
            <div id="_R_8lb_">
              <p>
                Die Seiten zu Anbieterinformationen und Datenschutz sind direkt erreichbar.
                Vollständige Pflichtangaben und Rechtstexte stehen noch zur Prüfung und Freigabe.
              </p>
              <p>
                Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch
                nicht verfügbar.
              </p>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}
