import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StatusPage } from "@/components/system/StatusPage";
import { Button } from "@/components/ui/button";
import { decideOAuthConsent, identityPermissions, loadOAuthConsent, type ConsentOAuth } from "@/lib/oauth-consent";

const oauth = (
  supabase.auth as unknown as { oauth: ConsentOAuth }
).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Verbindung erlauben · NeXify AI" },
      {
        name: "description",
        content:
          "Prüfen und bestätigen Sie die Verbindung eines KI-Assistenten mit Ihrem NeXify-Konto.",
      },
      { property: "og:title", content: "Verbindung erlauben · NeXify AI" },
      {
        property: "og:description",
        content:
          "Prüfen und bestätigen Sie die Verbindung eines KI-Assistenten mit Ihrem NeXify-Konto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Der Verbindungsanfrage fehlt die Kennung. Starten Sie sie in Ihrem KI-Assistenten erneut.");
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error("Ihre Anmeldung konnte nicht geprüft werden. Melden Sie sich erneut an.");
    if (!data.session)
      throw redirect({ to: "/anmelden", search: { next: location.pathname + location.searchStr + location.hash } });
    return { accountEmail: data.session.user.email };
  },
  loader: async ({ location, context }) => {
    const id = new URLSearchParams(location.search).get("authorization_id") ?? "";
    const details = await loadOAuthConsent(oauth, id);
    const immediate = details.redirect_url ?? details.redirect_to;
    if (immediate && !details.client) throw redirect({ href: immediate });
    return { details, accountEmail: context.accountEmail };
  },
  pendingComponent: () => (
    <StatusPage kicker="NeXify AI · Verbindung" title="Verbindungsanfrage prüfen" description={<p role="status">Einen Moment …</p>} actions={null} />
  ),
  component: Consent,
  errorComponent: ({ error }) => (
    <StatusPage
      tone="alert"
      kicker="NeXify AI · Verbindung"
      title="Verbindung nicht möglich"
      description={<p>{error instanceof Error ? error.message : "Unbekannter Fehler."}</p>}
      actions={
        <Button asChild variant="glass">
          <a href="/">Zur Startseite</a>
        </Button>
      }
    />
  ),
});

function Consent() {
  const { details, accountEmail } = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = details.client?.name ?? "Eine Anwendung";
  const permissions = identityPermissions(details.scope);
  const callback = details.redirect_uri ?? details.client?.redirect_uri;
  async function decide(approve: boolean) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const target = await decideOAuthConsent(oauth, authorization_id, approve);
      window.location.assign(target);
    } catch (failure) {
      setBusy(false);
      setError(failure instanceof Error ? failure.message : "Die Verbindung konnte nicht bestätigt werden.");
    }
  }
  return (
    <StatusPage
      kicker="NeXify AI · Verbindung"
      title={`${name} mit NeXify AI verbinden`}
      description={
        <>
          <p>
            {name} erhält lesenden Zugriff auf die unten genannten Werkzeuge in Ihrem Namen.
          </p>
          <dl className="mt-6 space-y-4">
            <div><dt className="font-medium text-foreground">Angemeldetes Konto</dt><dd className="break-all">{accountEmail ?? details.user?.email ?? "Ihr NeXify-Konto"}</dd></div>
            {callback && <div><dt className="font-medium text-foreground">Rückleitung an den Client</dt><dd className="break-all">{callback}</dd></div>}
          </dl>
          {permissions.length > 0 && <><h2 className="mt-8 font-heading text-lg text-foreground">Angeforderte Kontodaten</h2><ul>{permissions.map(({ scope, label }) => <li key={scope}>{label}</li>)}</ul></>}
          <h2 className="mt-8 font-heading text-lg text-foreground">Lesender Zugriff</h2>
          <ul><li>Öffentliche Seiten auflisten und durchsuchen</li><li>Öffentliche Kontaktdaten abrufen</li><li>Eingegangene Website- und Teileanfragen lesen – ausschließlich mit bestehender Admin-Berechtigung</li></ul>
          <p>
            <small>Keine Änderungen, Zahlungen, Löschungen oder Nachrichten. Bestehende Kontorechte und Datenschutzregeln bleiben unverändert.</small>
          </p>
        </>
      }
      actions={
        <>
          <Button variant="brand" className="min-h-11" disabled={busy} onClick={() => decide(true)}>
            Zulassen
          </Button>
          <Button variant="glass" className="min-h-11" disabled={busy} onClick={() => decide(false)}>
            Ablehnen
          </Button>
        </>
      }
    >
      {busy && <p role="status" className="status-detail mt-6 text-muted-foreground">Ihre Entscheidung wird bestätigt …</p>}
      {error && (
        <p role="alert" className="status-detail mt-6 text-destructive">
          {error}
        </p>
      )}
    </StatusPage>
  );
}
