import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StatusPage } from "@/components/system/StatusPage";
import { Button } from "@/components/ui/button";

type Details = { client?: { name?: string; redirect_uri?: string } | null; scope?: string; redirect_url?: string; redirect_to?: string } | null;
type Res = { data: Details; error: { message: string } | null };
const oauth = (supabase.auth as unknown as { oauth: {
  getAuthorizationDetails(id: string): Promise<Res>;
  approveAuthorization(id: string): Promise<Res>;
  denyAuthorization(id: string): Promise<Res>;
} }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  head: () => ({ meta: [{ title: "Verbindung erlauben · NeXify AI" }, { name: "description", content: "Prüfen und bestätigen Sie die Verbindung eines KI-Assistenten mit Ihrem NeXify-Konto." }, { property: "og:title", content: "Verbindung erlauben · NeXify AI" }, { property: "og:description", content: "Prüfen und bestätigen Sie die Verbindung eines KI-Assistenten mit Ihrem NeXify-Konto." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "" }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Die Anfrage ist unvollständig oder abgelaufen.");
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/anmelden", search: { next: location.pathname + location.searchStr } });
  },
  loader: async ({ location }) => {
    const id = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth.getAuthorizationDetails(id);
    if (error) throw new Error("Diese Anfrage ist ungültig oder abgelaufen.");
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <StatusPage tone="alert" kicker="NeXify AI · Verbindung" title="Verbindung nicht möglich"
      description={<p>{error instanceof Error ? error.message : "Unbekannter Fehler."}</p>}
      actions={<Button asChild variant="glass"><a href="/">Zur Startseite</a></Button>} />
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = details?.client?.name ?? "Eine Anwendung";
  async function decide(approve: boolean) {
    setBusy(true); setError(null);
    const { data, error } = approve ? await oauth.approveAuthorization(authorization_id) : await oauth.denyAuthorization(authorization_id);
    const target = data?.redirect_url ?? data?.redirect_to;
    if (error || !target) { setBusy(false); setError("Das hat nicht geklappt. Bitte versuchen Sie es erneut."); return; }
    window.location.href = target;
  }
  return (
    <StatusPage kicker="NeXify AI · Verbindung" title={`${name} mit NeXify AI verbinden`} description={<>
      <p>{name} kann die Werkzeuge dieser App in Ihrem Namen nutzen, solange Sie angemeldet sind.</p>
      {details?.client?.redirect_uri && <p><small>Rückleitung an: {details.client.redirect_uri}</small></p>}
      <ul><li>Ihr Basisprofil teilen</li><li>Ihre E-Mail-Adresse teilen</li></ul>
      <p><small>Die Berechtigungen der App gelten weiterhin unverändert.</small></p>
      </>} actions={<>
        <Button variant="brand" disabled={busy} onClick={() => decide(true)}>Erlauben</Button>
        <Button variant="glass" disabled={busy} onClick={() => decide(false)}>Verbindung abbrechen</Button>
      </>}>
        {error && <p role="alert" className="status-detail mt-6 text-destructive">{error}</p>}
    </StatusPage>
  );
}
