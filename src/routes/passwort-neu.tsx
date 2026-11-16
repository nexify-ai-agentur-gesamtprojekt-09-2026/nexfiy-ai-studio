import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth/AuthForm";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/passwort-vergessen.css?url";

export const Route = createFileRoute("/passwort-neu")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Neues Passwort festlegen · NeXify AI" },
      { name: "description", content: "Legen Sie ein neues Passwort für Ihr NeXify-Konto fest." },
      { property: "og:title", content: "Neues Passwort festlegen · NeXify AI" },
      {
        property: "og:description",
        content: "Legen Sie ein neues Passwort für Ihr NeXify-Konto fest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  staticData: {
    importedDocument: {
      html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties },
      body: {},
    },
  },
  component: Page,
});

function Page() {
  return (
    <NexifyShell>
      <div className="home-concept page-concept tk-shop nx-konto">
        <section className="hc-container nx-konto-buehne" aria-labelledby="auth-reset-title">
          <div className="nx-konto-blatt">
            <h1 id="auth-reset-title">Neues Passwort festlegen</h1>
            <p className="nx-konto-lead">Wählen Sie ein Passwort mit mindestens 8 Zeichen.</p>
            <AuthForm mode="reset" />
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
