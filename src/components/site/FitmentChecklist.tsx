import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  return <section className="tk-form" aria-labelledby="fit-title"><h2 id="fit-title">Passung prüfen: Worauf es ankommt</h2><p className="tk-meta">Keine automatische Prüfung gegen einen Fahrzeugkatalog. Im Zweifel Hersteller oder Werkstatt fragen.</p><div className="tk-actions" role="group" aria-label="Kategorie wählen">{(Object.keys(CHECKS) as (keyof typeof CHECKS)[]).map((value) => <Button key={value} variant={value === category ? "brand" : "glass"} aria-pressed={value === category} onClick={() => setCategory(value)}>{value}</Button>)}</div><div aria-live="polite"><h3>{category}</h3><ul className="tk-checklist">{CHECKS[category].map((check) => <li key={check}>{check}</li>)}</ul></div></section>;
}