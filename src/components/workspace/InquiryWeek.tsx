import { RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { getInquiryWeek } from "@/lib/inquiry-metrics.functions";

const time = new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Berlin" });

export function InquiryWeek() {
  const load = useServerFn(getInquiryWeek);
  const result = useQuery({ queryKey: ["workspace-inquiry-week"], queryFn: () => load(), staleTime: 0 });
  return <section className="ws-week" aria-labelledby="ws-week-title" aria-busy={result.isFetching}>
    <div className="ws-week-heading"><h2 id="ws-week-title">Anfragen · letzte 7 Tage</h2>
      <Button variant="ghost" size="icon" aria-label="Wochenzahlen aktualisieren" title="Wochenzahlen aktualisieren" disabled={result.isFetching} onClick={() => void result.refetch()}><RefreshCw aria-hidden="true" /></Button>
    </div>
    {result.isPending ? <p role="status">Wochenzahlen werden geladen …</p> : result.isError ? <p role="alert" className="ws-alert">Die Wochenzahlen konnten nicht geladen werden.</p> : <>
      <p className="ws-meta"><time dateTime={result.data.start}>{time.format(new Date(result.data.start))}</time> – <time dateTime={result.data.end}>{time.format(new Date(result.data.end))}</time> · Europe/Berlin</p>
      <dl className="ws-week-counts"><div><dt>Projektanfragen / Kontakt</dt><dd>{result.data.contact}</dd></div><div><dt>TEILEKLAR-Anfragen</dt><dd>{result.data.teileklar}</dd></div></dl>
    </>}
  </section>;
}