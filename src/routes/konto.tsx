import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/anmelden.css?url";

export const Route = createFileRoute("/konto")({
  ssr: false,
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Mein Konto · NeXify AI" },
      { name: "description", content: "Ihr persönlicher Bereich bei NeXify AI." },
      { property: "og:title", content: "Mein Konto · NeXify AI" },
      { property: "og:description", content: "Ihr persönlicher Bereich bei NeXify AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  staticData: { importedDocument: { html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties }, body: {} } },
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate({ to: "/anmelden", replace: true });
      else setEmail(data.user.email ?? "");
    });
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate({ to: "/anmelden", replace: true });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  return (
    <NexifyShell>
      <div className="home-concept page-concept tk-shop nx-konto">
        <section className="hc-container nx-konto-buehne" aria-labelledby="konto-title" aria-busy={email === undefined}>
          <div className="nx-konto-blatt">
            <h1 id="konto-title">Mein Konto</h1>
            {email === undefined ? (
              <p className="nx-konto-lead" role="status">Konto wird geladen …</p>
            ) : (
              <>
                <p className="nx-konto-lead">Angemeldet als <strong>{email}</strong>.</p>
                <div className="tk-form tk-auth">
                  <button type="button" className="nexify-control secondary-button tk-cta" data-variant="secondary" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/anmelden", replace: true }); }}>
                    Abmelden
                  </button>
                  <div className="tk-actions"><p><a href="/passwort-neu">Passwort ändern</a></p></div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
