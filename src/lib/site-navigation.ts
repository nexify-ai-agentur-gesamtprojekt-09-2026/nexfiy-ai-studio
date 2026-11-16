/** Fixed public destinations; no model-generated or user-supplied URLs. */
export const GUIDE_DESTINATIONS = [
  { value: "business-website", label: "Markenstart", path: "/leistungen/websites" },
  { value: "business-automation", label: "KI im Betrieb", path: "/leistungen/agenten-automatisierung" },
  { value: "business-growth", label: "Wachstum & Kampagnen", path: "/loesungen" },
  { value: "business-apps", label: "Digitale Arbeitsräume", path: "/leistungen/apps-portale" },
  { value: "business-api", label: "API & Integrationen", path: "/produkte/api" },
  { value: "knowledge-to-project", label: "Ihr Projektbriefing", path: "/wissen/projekt-vorbereiten" },
  { value: "teileklar-selection", label: "Fahrzeug & Passung", path: "/teileklar/fahrzeug-und-passung" },
  { value: "teileklar-workshop", label: "Werkstatt & Zusammenarbeit", path: "/teileklar/werkstatt" },
  { value: "teileklar-vouchers", label: "Gutschein & Bedingungen", path: "/teileklar/gutscheine" },
  { value: "existing-client", label: "Ihr Konto", path: "/konto" },
  { value: "nex2fly-trial", label: "NeX AIFly Suite", path: "/produkte/nex2fly" },
] as const;

export function guideDestination(value: string) {
  return GUIDE_DESTINATIONS.find((entry) => entry.value === value)?.path ?? "/leistungen";
}

export function contactDraftPath(draft: string) {
  return `/kontakt?anliegen=${encodeURIComponent(draft.trim().slice(0, 1000))}#anfrage`;
}