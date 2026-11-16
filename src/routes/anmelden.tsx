import { SiteFilm } from "@/components/SiteFilm";
import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth/AuthForm";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/anmelden.css?url";

export const Route = createFileRoute("/anmelden")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Anmelden und weiterarbeiten. · NeXify AI" },
      {
        name: "description",
        content:
          "Melden Sie sich mit Ihrem NeXify-Konto an und arbeiten Sie in Ihrem persönlichen Bereich weiter.",
      },
      { property: "og:title", content: "Anmelden und weiterarbeiten. · NeXify AI" },
      {
        property: "og:description",
        content:
          "Melden Sie sich mit Ihrem NeXify-Konto an und arbeiten Sie in Ihrem persönlichen Bereich weiter.",
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
  validateSearch: (s: Record<string, unknown>): { next?: string } =>
    typeof s["next"] === "string" ? { next: s["next"] } : {},
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
      <div className={"home-concept page-concept tk-shop nx-konto"}>
        <ImportedSectionAnmelden />
      </div>
    </NexifyShell>
  );
}

function ImportedSectionAnmelden() {
  return (
    <section className={"hc-container nx-konto-buehne"} aria-labelledby="auth-login-title">
      <div className={"nx-konto-blatt"}>
        <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
          <ol>
            <li>
              <a href="/">Startseite</a>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span aria-current="page">Anmelden</span>
            </li>
          </ol>
        </nav>
        <h1 id="auth-login-title">Anmelden</h1>
        <p className={"nx-konto-lead"}>
          Ihr NeXify-Websitekonto. Suite, Partnerportal und Shop-Bestellungen sind damit nicht
          automatisch verfügbar.
        </p>
        <AuthForm mode="login" />
      </div>
      <aside className={"nx-konto-szene"} aria-labelledby="auth-login-szene">
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <SiteFilm film="arbeitsbereich" eager />
          </figure>
        </div>
        <div className={"nx-konto-nutzen"}>
          <span className={"hc-kicker"} id="auth-login-szene">
            NEXIFY AI<span aria-hidden="true"> / </span>Ihr NeXify-Konto
          </span>
          <ul>
            <li>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                {...({ focusable: "false" } as any)}
              >
                <path d="M3.5 6.5h17v11h-17zM4 7l8 6.5L20 7" />
              </svg>
              Websitekonto
            </li>
            <li>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                {...({ focusable: "false" } as any)}
              >
                <path d="M3.5 7.5v10h17v-8h-8l-2-2z" />
              </svg>
              Kontoverwaltung
            </li>
            <li>
              <svg
                className={"nx-zeichen"}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                {...({ focusable: "false" } as any)}
              >
                <path d="M6.5 10.5h11v9h-11zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
              </svg>
              Produkte separat klären
            </li>
          </ul>
          <p>Ein Konto bestätigt keine Produkt-, Partner- oder Shopfreischaltung.</p>
        </div>
      </aside>
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
        <a href="/wissen/projekt-vorbereiten">Ihr Briefing in fünf Fragen.</a>
        <a href="/unternehmen">Ein Ansprechpartner. Ein Agententeam.</a>
        <a href="/kontakt">Schildern Sie Ihr Vorhaben.</a>
      </div>
      <div className={"footer-overview-group"}>
        <h3>Konto</h3>
        <a href="/anmelden" aria-current="page">
          Anmelden und weiterarbeiten.
        </a>
        <a href="/registrieren">NeXify-Websitekonto erstellen.</a>
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
