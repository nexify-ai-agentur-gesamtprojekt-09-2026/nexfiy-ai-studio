import { useState } from "react";

const AREAS = [
  ["business-website", "Markenstart", "/leistungen/websites"],
  ["business-automation", "KI im Betrieb", "/leistungen/agenten-automatisierung"],
  ["business-growth", "Wachstum & Kampagnen", "/loesungen"],
  ["business-apps", "Digitale Arbeitsräume", "/leistungen/apps-portale"],
  ["business-api", "Agentische KI & Integrationen", "/produkte/api"],
  ["knowledge-to-project", "Ihr Projektbriefing", "/wissen/projekt-vorbereiten"],
  ["teileklar-selection", "Ihr Fahrzeug. Die passende Anfrage.", "/teileklar/fahrzeug-und-passung"],
  ["teileklar-workshop", "Werkstatt & Zusammenarbeit", "/teileklar/werkstatt"],
  ["teileklar-vouchers", "Gutschein & Bedingungen", "/teileklar/gutscheine"],
  ["existing-client", "Zusammenarbeit mit der FACTORY", "/kontakt#anfrage"],
  ["nex2fly-trial", "NeX AIFly Suite · Ihr eigener Bereich", "/produkte/nex2fly"],
] as const;

/** Navigate to the selected area, without promising an unavailable guided AI tour. */
export function SiteGuide({ initialArea = AREAS[0][0] }: { initialArea?: string }) {
  const [selected, setSelected] = useState<string>(initialArea);
  const destination = AREAS.find(([value]) => value === selected)?.[2] ?? AREAS[0][2];
  return (
    <div className="pc-guide-controls">
      <label>
        Welchen Bereich möchten Sie erkunden?
        <select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {AREAS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <a className="hc-text-link" href={destination}>
        Bereich öffnen
      </a>
    </div>
  );
}
