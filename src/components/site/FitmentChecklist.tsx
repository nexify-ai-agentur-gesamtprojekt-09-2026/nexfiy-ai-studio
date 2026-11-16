import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactDraftPath } from "@/lib/site-navigation";

const CHECKS = {
  Bremsen: ["Fahrzeug, Motor und Baujahr", "Herstellernummer und Maße des vorhandenen Teils", "Einbau und Prüfung durch eine fachkundige Werkstatt"],
  Batterie: ["Kapazität, Bauform und Polanordnung", "Start-Stopp-Technologie: EFB oder AGM", "Mit der Werkstatt klären, ob eine Anmeldung nötig ist"],
  Beleuchtung: ["Fahrzeug und genaue Ausführung", "Herstellernummer und Anschlüsse", "Herstellerfreigabe prüfen"],
  Filter: ["Motor, Baujahr und Schlüsselnummern", "Herstellernummer des vorhandenen Filters", "Abmessungen und Anschlüsse vergleichen"],
  Fahrwerk: ["Fahrzeugausführung und Schlüsselnummern", "Herstellernummer und Ausführung des vorhandenen Teils", "Fachkundige Prüfung vor dem Einbau"],
  Reifen: ["Zulassungsbescheinigung oder CoC", "Tragfähigkeits- und Geschwindigkeitsindex", "Felgenbreite und Freigängigkeit"],
} as const;
export function FitmentChecklist() {
  const [category, setCategory] = useState<keyof typeof CHECKS>("Bremsen");
  const id = useId();
  return <section className="tk-form" aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>Passung: Angaben vorbereiten</h2><p className="tk-meta">Keine automatische Fahrzeugprüfung. Im Zweifel Hersteller oder Werkstatt fragen.</p><div className="tk-field"><label htmlFor={`${id}-category`}>Teileart</label><Select value={category} onValueChange={(value) => { if (value in CHECKS) setCategory(value as keyof typeof CHECKS); }}><SelectTrigger id={`${id}-category`} aria-label="Teileart"><SelectValue /></SelectTrigger><SelectContent>{Object.keys(CHECKS).map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div><div aria-live="polite"><h3>{category}</h3><ul className="tk-checklist">{CHECKS[category].map((check) => <li key={check}>{check}</li>)}</ul></div><div className="tk-actions"><Button variant="glass" asChild><a href={contactDraftPath(`Meine Frage zu ${category}: \nFahrzeug, Baujahr und Motor: \nVorhandene Teilenummer: `)}>Frage zu {category} vorbereiten</a></Button></div></section>;
}