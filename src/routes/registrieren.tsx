import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/registrieren.css?url";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/registrieren")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }, canonicalLink("/registrieren") ], meta: [{ title: "NeX AIFly Suite. In Ruhe testen. · NeXify AI" }, { name: "description", content: "Ihr Zugang zu persönlichen Vorgängen, Unterlagen und Shop-Bestellungen" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept tk-shop nx-konto"}>
              <ImportedSectionKontoErstellen />
            </div>
    </NexifyShell>
  );
}

function ImportedSectionKontoErstellen() {
  return (
    <section className={"hc-container nx-konto-buehne"} aria-labelledby="auth-register-title">
      <div className={"nx-konto-blatt"}>
        <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
          <ol>
            <li>
              <a href="/">Startseite</a>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span aria-current="page">Konto erstellen</span>
            </li>
          </ol>
        </nav>
        <h1 id="auth-register-title">Konto erstellen</h1>
        <p className={"nx-konto-lead"}>Ihr Zugang zu persönlichen Vorgängen, Unterlagen und Shop-Bestellungen.</p>
        <form className={"tk-form tk-auth"} method="post" noValidate>
          <div className={"tk-field is-wide"}>
            <label htmlFor="auth-name">Name (optional)</label>
            <input id="auth-name" autoComplete="name" aria-invalid="false" type="text" defaultValue="" />
          </div>
          <div className={"tk-field is-wide"}>
            <label htmlFor="auth-email">E-Mail-Adresse</label>
            <input id="auth-email" autoComplete="email" aria-invalid="false" type="email" defaultValue="" />
          </div>
          <div className={"tk-field is-wide"}>
            <label htmlFor="auth-password">Passwort (mindestens 10 Zeichen)</label>
            <span className={"nx-feld"}>
              <input id="auth-password" autoComplete="new-password" aria-invalid="false" type="password" defaultValue="" />
              <button type="button" className={"nx-feld-schalter"} aria-pressed="false" aria-label="Passwort anzeigen" title="Passwort anzeigen">
                <svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                  <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12zM12 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
                </svg>
              </button>
            </span>
          </div>
          <button type="submit" className={"nexify-control primary-button hc-finish-primary tk-cta"} data-variant="primary">Konto erstellen</button>
          <span className={"nx-konto-oder"} aria-hidden="true">oder</span>
          <button type="button" className={"nexify-control secondary-button hc-text-link tk-cta"} data-variant="secondary"><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 12.2c0 4.9-3.4 8.3-8.4 8.3a8.5 8.5 0 1 1 5.7-14.8M12.3 12.2h8.2" /></svg>Mit Google anmelden</button>
          <div className={"tk-actions"}>
            <p><span>Bereits ein Konto?</span> <a href="/anmelden">Zur Anmeldung</a></p>
            <p className={"nx-konto-hinweis"}>
              <a href="/datenschutz">Datenschutz</a>
            </p>
          </div>
        </form>
      </div>
      <aside className={"nx-konto-szene"} aria-labelledby="auth-register-szene">
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <div className={"atelier-film atelier-film-hero"}>
              <div className={"atelier-film-picture"}>
                <img className={"atelier-film-fallback"} alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie" aria-hidden="false" width="1280" height="720" src="/site-assets/4b45951db0b51136.webp" />
                <video src="/site-assets/b82843cf77d572df.mp4" poster="/site-assets/4b45951db0b51136.webp" width="1280" height="720" preload="metadata" playsInline aria-label="Markenszene mit Pascal, NeX und AIFly ORACLE" muted />
                <div className={"atelier-film-controls"}>
                  <button type="button" aria-label="Film abspielen">
                    <svg className={"atelier-playback-icon"} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M6 3.8a.7.7 0 0 1 1.05-.6l9.2 6.2a.7.7 0 0 1 0 1.2l-9.2 6.2A.7.7 0 0 1 6 16.2Z" />
                    </svg>
                    <span>Abspielen</span>
                  </button>
                  <button type="button" aria-label="Film mit Ton starten">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
                      <path d="M4 9h4l5-4v14l-5-4H4Z" />
                      <path d="m17 9 5 6m0-6-5 6" />
                    </svg>
                    <span>Ton an</span>
                  </button>
                  <details className={"atelier-volume"}>
                    <summary aria-label="Lautstärke">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...({ focusable: "false" } as any)}>
                        <path d="M3 12h8m6 0h4" strokeLinecap="round" />
                        <circle cx="14" cy="12" r="3" />
                      </svg>
                      <span className={"visually-hidden"}>Lautstärke</span>
                    </summary>
                    <div>
                      <label htmlFor="_r_4_-volume">Lautstärke<input id="_r_4_-volume" min="0" max="1" step="0.05" type="range" defaultValue="0.8" /></label>
                    </div>
                  </details>
                </div>
                <div className={"atelier-film-progress"} aria-hidden="true">
                  <span style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className={"nx-konto-nutzen"}>
          <span className={"hc-kicker"} id="auth-register-szene">NEXIFY AI<span aria-hidden="true"> / </span>Ihr NeXify-Konto</span>
          <ul>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M3.5 6.5h17v11h-17zM4 7l8 6.5L20 7" /></svg>Persönliche Vorgänge</li>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M3.5 7.5v10h17v-8h-8l-2-2z" /></svg>Unterlagen</li>
            <li><svg className={"nx-zeichen"} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M6.5 10.5h11v9h-11zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></svg>Shop-Bestellungen</li>
          </ul>
          <p>Zusätzliche Produkt- und Partnerberechtigungen werden separat freigeschaltet.</p>
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
        <a href="/anmelden">Anmelden und weiterarbeiten.</a>
        <a href="/registrieren" aria-current="page">NeX AIFly Suite. In Ruhe testen.</a>
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

