import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSlackDeliveryStatus, sendSlackDeliveryTest } from "@/lib/slack-admin.functions";
import { SLACK_FLOWS, SLACK_WORKSPACE, decideSlackInput, type SlackDecision } from "@/lib/slack-flows";

export function SlackWorkflowPanel() {
  const getStatus = useServerFn(getSlackDeliveryStatus);
  const sendTest = useServerFn(sendSlackDeliveryTest);
  const status = useQuery({ queryKey: ["slack-delivery-status"], queryFn: () => getStatus() });
  const deliveryTest = useMutation({ mutationFn: () => sendTest(), onSuccess: () => status.refetch() });
  const [text, setText] = useState("status");
  const [actor, setActor] = useState<string>(SLACK_WORKSPACE.owner);
  const [result, setResult] = useState<SlackDecision | null>(null);
  const labels: Record<SlackDecision["kind"], string> = { ignore: "Ignoriert", blocked: "Keine Aktion ausgelöst",
    overview: "Ablaufstatus angefordert", ack: "Empfangsbeleg", result: "Ergebnisbeleg", status: "Statusänderung vorgesehen" };
  return <section className="ws-slack-workflows" aria-labelledby="slack-workflows-title">
    <header className="ws-heading"><h2 id="slack-workflows-title">Slack &amp; ORACLE</h2>
      <p>Empfang und Ergebnis bleiben getrennte Belege.</p></header>
    {status.isPending ? <p role="status">Belege werden geladen …</p> : null}
    {status.isError ? <p className="ws-alert" role="alert">{status.error.message}</p> : null}
    {status.data ? <p className="ws-meta">Slack-Empfang: {status.data.inboundConfigured ? "Schlüssel hinterlegt · Ende-zu-Ende-Prüfung ausstehend" : "Einrichtung ausstehend"} · ORACLE-Empfang: {status.data.oracleConfirmed ? "Beleg vorhanden" : "nicht bestätigt"}</p> : null}
    <dl className="ws-slack-flow-list">{SLACK_FLOWS.map(flow => <div key={flow.id}>
      <dt>{flow.label}</dt><dd>{flow.trigger}<br />{flow.returnPath}<br /><span className="ws-meta">{flow.state}</span></dd>
    </div>)}</dl>
    <div className="ws-slack-simulator">
      <h3>Simulation</h3>
      <form onSubmit={event => { event.preventDefault(); setResult(decideSlackInput({ key: "simulation",
        team: SLACK_WORKSPACE.team, actor, channel: SLACK_WORKSPACE.inbox, thread: "simulation-thread",
        kind: "message", text, bot: actor !== SLACK_WORKSPACE.owner && actor !== "other" })); }}>
        <label>Absender<select value={actor} onChange={event => setActor(event.target.value)}>
          <option value={SLACK_WORKSPACE.owner}>Inhaber</option><option value={SLACK_WORKSPACE.oracle}>AIFly ORACLE</option>
          <option value={SLACK_WORKSPACE.hermes}>Hermes</option><option value="other">Nicht freigegebener Nutzer</option>
        </select></label>
        <label>Nachricht<textarea value={text} maxLength={4000} onChange={event => setText(event.target.value)} rows={3} /></label>
        <Button type="submit" variant="glass" size="xl"><Play aria-hidden="true" />Prüfen</Button>
      </form>
      {result ? <p role="status">{labels[result.kind]} · Simulation, kein Versand und keine gespeicherte Änderung.</p> : null}
    </div>
    <header className="ws-slack-receipt-heading"><h3>Zustell- und Rückmeldebelege</h3>
      <Button variant="ghost" size="icon" className="min-h-11 min-w-11" aria-label="Slack-Belege aktualisieren" title="Belege aktualisieren" onClick={() => status.refetch()} disabled={status.isFetching}><RefreshCw aria-hidden="true" /></Button></header>
    <div><Button variant="glass" size="xl" onClick={() => deliveryTest.mutate()} disabled={deliveryTest.isPending}><Send aria-hidden="true" />{deliveryTest.isPending ? "Sendet …" : "Testmeldung senden"}</Button></div>
    {deliveryTest.isSuccess ? <p role="status">Slack hat die Testmeldung angenommen. Zustellbeleg gespeichert; ORACLE-Empfang bleibt separat.</p> : null}
    {deliveryTest.isError ? <p role="alert" className="ws-alert">{deliveryTest.error.message}</p> : null}
    {status.data?.receipts.length ? <ol className="ws-slack-receipts">{status.data.receipts.map(row => <li key={row.id}>
      <time dateTime={row.created_at}>{new Date(row.created_at).toLocaleString("de-DE", { timeZone: "Europe/Amsterdam" })}</time>
      <span>{SLACK_FLOWS.find(flow => flow.id === row.flow_id)?.label ?? row.flow_id}</span>
      <strong>{row.outcome === "ack" ? "Empfang" : row.outcome === "result" ? "Ergebnis" : row.outcome === "failed" ? "Fehler" : row.outcome === "ignored" ? "Keine Aktion" : "Angenommen"}</strong>
      {row.error_code ? <span className="ws-alert-inline">{row.error_code}</span> : null}
    </li>)}</ol> : status.data ? <p className="ws-meta">Noch keine Zustell- oder Rückmeldebelege.</p> : null}
  </section>;
}