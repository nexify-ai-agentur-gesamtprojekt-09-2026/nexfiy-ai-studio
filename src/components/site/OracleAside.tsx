import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOracleAdvice } from "@/lib/use-oracle-advice";
import oracleCSS from "../../styles/oracle-advice.css?url";
import { fitComposer, useComposerFit } from "@/lib/imported-site";

/** AIFly ORACLE side panel of the NeXify pages (desktop column, phone dialog). */
export function OracleAside({ open, isMobile, viewportHeight, onClose }: { open: boolean; isMobile: boolean; viewportHeight: number | null; onClose: () => void }) {
  const composerRef = useComposerFit(open, isMobile, viewportHeight);
  const { messages, draft, setDraft, busy, error, send, reset } = useOracleAdvice();
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && (messages.length || error)) endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy, error, open]);
  useEffect(() => {
    if (composerRef.current) fitComposer(composerRef.current);
  }, [draft, composerRef]);
  return (
    <aside id="aifly-panel" className={"aifly-panel oracle-advice"} aria-label="AIFly ORACLE" role={isMobile ? "dialog" : undefined} hidden={!open} style={isMobile || viewportHeight === null ? undefined : ({ "--chat-viewport-height": viewportHeight + "px", "--chat-viewport-top": "0px" } as CSSProperties)}>
      <link rel="stylesheet" href={oracleCSS} precedence="oracle-advice" />
      <div className={"panel-heading"}>
        <div className={"panel-heading-copy"}>
          <div className={"panel-identity"}>
            <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
              <img src="/site-assets/9176c58a16ff634a.png" alt="" width="34" height="34" decoding="async" />
            </span>
            <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
          </div>
        </div>
        {messages.length > 0 && <Button variant="ghost" size="icon" aria-label="Neue Beratung" title="Neue Beratung" disabled={busy} onClick={reset}><RotateCcw aria-hidden="true" /></Button>}
        <Button variant="ghost" size="icon" aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon" onClick={onClose}><ChevronDown aria-hidden="true" /></Button>
      </div>
      <div className={"sdk-orientation-view"}>
        <section className={"public-orientation"} aria-label="Was planen Sie?" style={{ "--ca-fuss": "128px" } as CSSProperties}>
          <div className={"orientation-content"}>
            <div className={"orientation-intro"}>
              <div className={"orientation-host"}>
                <span className={"orientation-host-figure"} aria-hidden="true">
                  <img src="/site-assets/9176c58a16ff634a.png" alt="" width="512" height="512" decoding="async" />
                </span>
                <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
              </div>
              <h3>Suite oder API?</h3>
              <p className={"orientation-intro-body"}>Was möchten Sie umsetzen? Ich ordne Ihr Vorhaben anhand unserer öffentlichen Produktinformationen ein und zeige Ihnen den passenden Einstieg.</p>
            </div>
            {messages.length === 0 && <div className="orientation-starters" role="group" aria-label="Vorhaben auswählen">
              {[
                { title: "KI im Arbeitsalltag", detail: "Dokumente, Aufgaben und Wissen bündeln.", prompt: "Ich möchte mit meinem Team Dokumente bearbeiten, Aufgaben organisieren und unser Projektwissen mit KI nutzen. Passt die Suite?" },
                { title: "KI in eigener Software", detail: "Eine bestehende Anwendung erweitern.", prompt: "Ich entwickle eine eigene Anwendung und möchte KI-Funktionen über eine Schnittstelle integrieren. Passt die API?" },
                { title: "Den passenden Weg finden", detail: "Suite und API für mein Vorhaben vergleichen.", prompt: "Ich möchte KI selbst einsetzen. Worin unterscheiden sich Suite und API und was muss ich für meine Entscheidung klären?" },
              ].map((starter, index) => <Button key={starter.title} variant="ghost" className="orientation-starter" disabled={busy} onClick={() => void send(starter.prompt)}>
                <span className="orientation-starter-index" aria-hidden="true">0{index + 1}</span>
                <span className="orientation-starter-copy"><strong>{starter.title}</strong><small>{starter.detail}</small></span>
                <ArrowRight aria-hidden="true" />
              </Button>)}
            </div>}
            <div className="orientation-history" role="log" aria-label="Produktberatung" aria-live="polite" aria-relevant="additions" aria-busy={busy}>
              {messages.map((message, index) => <div className="oracle-message" data-role={message.role} key={index}>
                <span className="oracle-message-author">{message.role === "user" ? "Sie" : "AIFly ORACLE · KI-Beratung"}</span>
                <p>{message.content}</p>
                {message.links && <nav className="oracle-entry-links" aria-label="Passender Einstieg">{message.links.map((link) => <Button variant="outline" asChild key={link.path}><a href={link.path}>{link.label}<ArrowRight aria-hidden="true" /></a></Button>)}</nav>}
              </div>)}
              {busy && <p className="oracle-pending" role="status">ORACLE ordnet Ihr Vorhaben ein…</p>}
            </div>
            {error && <div className="oracle-error" role="alert"><p>{error}</p><nav className="oracle-entry-links" aria-label="Produktinformationen"><a href="/produkte/nex2fly">Suite ansehen</a><a href="/produkte/api">API ansehen</a></nav></div>}
            <div ref={endRef} />
          </div>
          <form onSubmit={(event) => { event.preventDefault(); void send(draft); }} className={"orientation-composer"}>
            <label htmlFor="orientation-message">Ihr Vorhaben</label>
            <Textarea ref={composerRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(draft); } }} id="orientation-message" maxLength={1000} rows={1} placeholder="Was möchten Sie mit KI umsetzen?" aria-describedby="orientation-keys" required enterKeyHint="send" disabled={busy} />
            <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
            <div className={"orientation-composer-actions"}>
              <Button type="submit" className="primary-button" size="icon" disabled={busy || !draft.trim()} aria-label="Nachricht senden"><ArrowRight aria-hidden="true" /></Button>
            </div>
          </form>
          <p className={"connection-note"}>KI-Beratung · Angaben bitte auf der Produktseite prüfen. Keine vertraulichen Daten eingeben. <a href="/datenschutz">Datenschutz</a></p>
        </section>
      </div>
    </aside>
  );
}
