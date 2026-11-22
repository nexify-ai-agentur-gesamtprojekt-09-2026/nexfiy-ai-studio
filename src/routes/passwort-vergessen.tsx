import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { KundencenterHinweis } from "@/components/site/KundencenterHinweis";
import capturedCSS from "../styles/pages/passwort-vergessen.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/passwort-vergessen")({
  head: () =>
    pageHead("/passwort-vergessen", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept nx-konto-rahmen nx-konto"}>
        <ImportedSectionPasswortVergessen />
      </div>
    </NexifyShell>
  );
}

function ImportedSectionPasswortVergessen() {
  return (
    <section className={"hc-container nx-konto-buehne"} aria-labelledby="auth-forgot-title">
      <div className={"nx-konto-blatt"}>
        <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
          <ol>
            <li>
              <a href="/">Startseite</a>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span aria-current="page">Kundencenter</span>
            </li>
          </ol>
        </nav>
        <h1 id="auth-forgot-title">Kundencenter</h1>
        <KundencenterHinweis />
      </div>
      <aside className={"nx-konto-szene"} aria-labelledby="auth-forgot-szene">
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            {/* Standbild statt Film: die Hinweisseite braucht keine 1,3 MB Bewegtbild. */}
            <img
              alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie"
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
              src="/site-assets/4b45951db0b51136.webp"
            />
          </figure>
        </div>
        <div className={"nx-konto-nutzen"}>
          <span className={"hc-kicker"} id="auth-forgot-szene">
            NeXify AI<span aria-hidden="true"> / </span>Geplant im Kundencenter
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
                focusable="false"
              >
                <path d="M3.5 6.5h17v11h-17zM4 7l8 6.5L20 7" />
              </svg>
              Persönliche Vorgänge
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
                focusable="false"
              >
                <path d="M3.5 7.5v10h17v-8h-8l-2-2z" />
              </svg>
              Unterlagen
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
