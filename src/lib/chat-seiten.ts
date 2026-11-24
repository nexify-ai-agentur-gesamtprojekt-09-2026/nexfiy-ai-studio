/**
 * Öffentliche Angaben zum Chat, die Server und Browser teilen: die Seiten, auf die verwiesen werden
 * darf, und die Kontaktadresse. Bewusst ohne Systemvorgabe – die steht nur in `chat-wissen.server.ts`.
 */

/** Seiten, auf die der Assistent verweisen darf; die Oberfläche verlinkt ausschließlich diese Pfade. */
export const CHAT_SEITEN: Record<string, string> = {
  "/": "Startseite",
  "/leistungen": "Leistungen im Überblick",
  "/leistungen/websites": "Websites & Marke",
  "/leistungen/agenten-automatisierung": "KI & Automatisierung",
  "/leistungen/apps-portale": "Apps & Portale",
  "/leistungsumfang": "Pakete und Leistungsumfang",
  "/loesungen": "Kampagne und Zielseite",
  "/preise-ablauf": "Preise & Ablauf",
  "/wissen": "Arbeitsweise",
  "/wissen/projekt-vorbereiten": "Projekt vorbereiten",
  "/unternehmen": "Über NeXify AI",
  "/portale": "Portale und Kundencenter",
  "/produkte/nex2fly": "NeX AIFly Suite",
  "/produkte/one": "Agenten NeX und AIFly ORACLE",
  "/produkte/aifly-oracle": "AIFly ORACLE",
  "/produkte/nex-agentic-aifly": "NeX Agentic AIFly",
  "/produkte/api": "NeXify API",
  "/produkte/skills-mcp": "Skills und MCP",
  "/kontakt": "Kontakt",
  "/ki-hinweise": "KI-Hinweise",
  "/datenschutz": "Datenschutz",
  "/vertragsgrundlagen": "Vertragsgrundlagen",
  "/impressum": "Impressum",
  "/barrierefreiheit": "Barrierefreiheit",
};

export const CHAT_KONTAKT_MAIL = "mail@nexifyai.cloud";

/** Im Impressum veröffentlichte Rufnummer; nur für die Kontaktauskunft im Chat. */
export const CHAT_KONTAKT_TEL = "+31 6 133 188 56";
