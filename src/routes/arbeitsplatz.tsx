import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { NexifyShell } from "@/components/site/NexifyShell";
import { InquiryInbox } from "@/components/workspace/InquiryInbox";
import { SlackWorkflowPanel } from "@/components/workspace/SlackWorkflowPanel";
import accountCSS from "../styles/pages/anmelden.css?url";
import workspaceCSS from "../styles/pages/arbeitsplatz.css?url";

export const Route = createFileRoute("/arbeitsplatz")({
  ssr: false,
  head: () => ({
    links: [
      { rel: "stylesheet", href: accountCSS },
      { rel: "stylesheet", href: workspaceCSS },
    ],
    meta: [
      { title: "Arbeitsplatz · Anfragen · NeXify AI" },
      {
        name: "description",
        content: "Geschützter Posteingang für Website- und TEILEKLAR-Anfragen von NeXify AI.",
      },
      { property: "og:title", content: "Arbeitsplatz · Anfragen · NeXify AI" },
      {
        property: "og:description",
        content: "Geschützter Posteingang für Website- und TEILEKLAR-Anfragen von NeXify AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
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

type Access =
  | { state: "loading" }
  | { state: "denied"; email: string }
  | { state: "admin"; email: string }
  | { state: "error"; message: string };

function Page() {
  const navigate = useNavigate();
  const [access, setAccess] = useState<Access>({ state: "loading" });

  useEffect(() => {
    let active = true;
    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.replace("/anmelden?next=%2Farbeitsplatz");
        return;
      }
      const { data: isAdmin, error } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "admin",
      });
      if (!active) return;
      if (error)
        setAccess({
          state: "error",
          message: `Berechtigung konnte nicht geprüft werden: ${error.message}`,
        });
      else setAccess({ state: isAdmin ? "admin" : "denied", email: data.user.email ?? "" });
    }
    void check();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") window.location.replace("/anmelden?next=%2Farbeitsplatz");
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <NexifyShell>
      <div className="home-concept page-concept tk-shop nx-konto ws-page">
        <section
          className="hc-container ws-stage"
          aria-labelledby="ws-title"
          aria-busy={access.state === "loading"}
        >
          <header className="ws-heading">
            <span className="hc-kicker">
              NeXify AI<span aria-hidden="true"> / </span>Arbeitsplatz
            </span>
            <h1 id="ws-title">Anfragen</h1>
            {access.state === "admin" ? (
              <p className="nx-konto-lead">
                Kontakt-, Partner-, Termin-, Gutschein- und Teilefragen an einem Ort. Angemeldet als{" "}
                <strong>{access.email}</strong>.
              </p>
            ) : null}
          </header>
          {access.state === "loading" ? (
            <p className="nx-konto-lead" role="status">
              Zugang wird geprüft …
            </p>
          ) : null}
          {access.state === "error" ? (
            <p className="ws-alert" role="alert">
              {access.message}
            </p>
          ) : null}
          {access.state === "denied" ? (
            <div className="ws-denied">
              <p className="nx-konto-lead">
                Dieser Bereich ist dem Inhaberkonto von NeXify AI vorbehalten. Das Konto{" "}
                <strong>{access.email}</strong> ist dafür nicht freigeschaltet.
              </p>
              <p>
                <a className="hc-text-link" href="/konto">
                  Zum eigenen Konto
                </a>
              </p>
            </div>
          ) : null}
          {access.state === "admin" ? <><InquiryInbox /><SlackWorkflowPanel /></> : null}
        </section>
      </div>
    </NexifyShell>
  );
}
