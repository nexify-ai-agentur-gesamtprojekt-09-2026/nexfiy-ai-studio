import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { contactDraftPath } from "@/lib/site-navigation";
import oracleCSS from "../../styles/oracle-advice.css?url";

/** Public topic navigation and an explicit contact handoff, not a parts-matching AI. */
export function TeileklarHelp({ open, mobile, onClose }: { open: boolean; mobile: boolean; onClose: () => void }) {
  const [draft, setDraft] = useState("");
  return <aside id="aifly-panel" className="aifly-panel oracle-advice" aria-label="TEILEKLAR Hilfe" role={mobile ? "dialog" : undefined} aria-modal={mobile && open ? true : undefined} hidden={!open}>
    <link rel="stylesheet" href={oracleCSS} precedence="oracle-advice" />
    <div className="oracle-heading"><div className="oracle-heading-copy"><div className="oracle-identity"><span className="oracle-companion"><img src="/site-assets/9176c58a16ff634a.png" alt="" width="40" height="40" /></span><h2><strong>TEILEKLAR Hilfe</strong><span>Fahrzeug · Teile · Werkstatt</span></h2></div></div><Button variant="ghost" size="icon" aria-label="Beratung einklappen" title="Hilfe schließen" onClick={onClose}><ChevronDown aria-hidden="true" /></Button></div>
    <div className="oracle-body"><section className="oracle-layout" aria-label="Ihr nächster Schritt"><div className="tk-help-content"><div className="oracle-intro"><h3>Worum geht es?</h3><p>Für eine Teilefrage helfen Fahrzeugdaten und eine vorhandene Teilenummer. Eine Passungszusage oder Terminbestätigung erhalten Sie nur nach Prüfung.</p></div>
      <nav className="oracle-starters" aria-label="Hilfe auswählen">{[["Fahrzeug & Teil", "/teileklar/fahrzeug-und-passung"], ["Werkstatt-Anfrage", "/teileklar/termine"], ["Zusammenarbeit", "/teileklar/partner-werden"]].map(([title, path]) => <Button key={path} variant="ghost" className="oracle-starter" asChild><a href={path}><span>{title}</span><ArrowRight aria-hidden="true" /></a></Button>)}</nav>
    </div><form className="tk-help-form" onSubmit={(event) => { event.preventDefault(); if (draft.trim()) window.location.assign(contactDraftPath(draft)); }}><label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label><Textarea id="orientation-message" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={1000} rows={4} required placeholder="Fahrzeug, Teilenummer und Frage" /><Button variant="glass" type="submit" disabled={!draft.trim()}>Anfrage vorbereiten<ArrowRight aria-hidden="true" /></Button></form><p className="oracle-note">Keine automatische Teileprüfung. Keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches">Datenschutz</a></p></section></div>
  </aside>;
}