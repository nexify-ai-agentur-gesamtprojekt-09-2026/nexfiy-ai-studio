/**
 * Alle Seiten der Website mit dem, was Suchmaschinen und Vorschaukarten von ihnen sehen:
 * Titel, Beschreibung, Seitentyp, Platz im Pfad. Eine Quelle für den Seitenkopf jeder Route
 * (src/lib/seo.ts), die Sitemap (tools/generate-sitemap.mjs) und die Prüfungen
 * (src/lib/seo.test.ts, tools/live-check.mjs).
 *
 * Regeln für die Texte: Jeder Titel und jede Beschreibung kommt genau einmal vor. Eine
 * Beschreibung ist ein vollständiger Satz aus dem sichtbaren Einleitungstext der Seite und
 * verspricht nichts, was dort nicht steht. Titel höchstens 60 Zeichen (mit Markenzusatz),
 * Beschreibung höchstens 160.
 *
 * Diese Datei bleibt ohne Laufzeit-TypeScript und importiert nur die Datentabelle der
 * Regionalseiten (ebenfalls ohne Importe), damit Node sie für die Sitemap direkt lesen kann.
 */

import {
  BUNDESLAENDER,
  LAENDERSEITEN_INDEXIERT,
  landBeschreibung,
  landTitel,
} from "./regionen-daten.ts";

export type SeitenTyp =
  "start" | "leistung" | "produkt" | "info" | "kontakt" | "unternehmen" | "recht" | "konto";

export interface Seite {
  /** Adresse ohne Ursprung, ohne Schrägstrich am Ende. */
  pfad: string;
  /** Routendatei unter src/routes; daraus liest die Sitemap das Änderungsdatum. */
  datei: string;
  /** Titel ohne Markenzusatz; so steht er auch in Vorschaukarten (og:title). */
  titel: string;
  /** Kurzer Name für den Pfad (BreadcrumbList) und für llms.txt. */
  kurz: string;
  beschreibung: string;
  typ: SeitenTyp;
  /** false: Seite soll nicht in den Suchindex (noindex) und steht nicht in der Sitemap. */
  index: boolean;
  /** Übergeordnete Seite im Pfad; ohne Angabe die Startseite. */
  eltern?: string;
  /** Nur Leistungsseiten: Angaben für die Service-Auszeichnung. */
  leistung?: { name: string; art: string };
  /** Nur Regionalseiten: das Gebiet, um das es auf der Seite geht (kein Firmenstandort). */
  region?: { name: string; code: string };
}

export const MARKENZUSATZ = " · NeXify AI";

export const SEITEN: Seite[] = [
  {
    pfad: "/",
    datei: "index.tsx",
    titel: "NeXify AI – Websites, Apps, Shops und KI für Ihr Unternehmen",
    kurz: "Startseite",
    beschreibung:
      "Websites, Apps, Shops und KI – aus dem, was Ihr Unternehmen wirklich braucht. Umfang und Kosten stehen vor dem Start fest.",
    typ: "start",
    index: true,
  },
  {
    pfad: "/leistungen",
    datei: "leistungen.tsx",
    titel: "Leistungen: Website, System, Kampagne",
    kurz: "Leistungen",
    beschreibung:
      "Websites, Automatisierung mit KI und Kampagnen aus einer Hand – mit klarem Umfang und persönlicher Begleitung durch Pascal.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/leistungen/websites",
    datei: "leistungen_.websites.tsx",
    titel: "Websites – eine Website, die Ihr Angebot erklärt",
    kurz: "Websites",
    beschreibung:
      "Besucher sollen verstehen, was Sie anbieten, und wissen, wie sie anfragen. Mit dem Paket Markenstart entstehen Gestaltung, Texte und Technik aus einem Konzept.",
    typ: "leistung",
    index: true,
    eltern: "/leistungen",
    leistung: { name: "Websites & Markenauftritt", art: "Webdesign und Website-Entwicklung" },
  },
  {
    pfad: "/leistungen/apps-portale",
    datei: "leistungen_.apps-portale.tsx",
    titel: "Portale und Apps für Ihren Ablauf",
    kurz: "Apps und Portale",
    beschreibung:
      "Kundenportal, interne Anwendung oder Partnerbereich: ein Ort für den Vorgang, statt Postfach, Telefon und Listen. Jeder sieht, was er sehen soll.",
    typ: "leistung",
    index: true,
    eltern: "/leistungen",
    leistung: { name: "Apps & Portale", art: "Softwareentwicklung für Web-Apps und Portale" },
  },
  {
    pfad: "/leistungen/agenten-automatisierung",
    datei: "leistungen_.agenten-automatisierung.tsx",
    titel: "KI-Agenten: Routine abgeben, Kontrolle behalten",
    kurz: "Agenten und Automatisierung",
    beschreibung:
      "KI übernimmt einen benannten Schritt in Ihrem Ablauf: Anfragen zuordnen, Unterlagen vorbereiten, Entwürfe schreiben. Entscheidungen bleiben bei Ihnen.",
    typ: "leistung",
    index: true,
    eltern: "/leistungen",
    leistung: { name: "Automatisierung & KI", art: "KI-Agenten und Prozessautomatisierung" },
  },
  {
    pfad: "/leistungsumfang",
    datei: "leistungsumfang.tsx",
    titel: "Leistungsumfang – drei Pakete, ein klarer Umfang",
    kurz: "Leistungsumfang",
    beschreibung:
      "Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit benannten Ergebnissen, wählbaren Optionen und Kosten, die Sie vorab kennen.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/loesungen",
    datei: "loesungen.tsx",
    titel: "Kampagne und Zielseite aus einem Guss",
    kurz: "Kampagnen",
    beschreibung:
      "Wer auf Ihre Anzeige klickt, soll auf der Zielseite finden, was die Anzeige verspricht. Wir entwickeln Botschaft, Werbemittel und Zielseite zusammen.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/preise-ablauf",
    datei: "preise-ablauf.tsx",
    titel: "Preise und Ablauf – Kosten kennen vor dem Start",
    kurz: "Preise und Ablauf",
    beschreibung:
      "Vor jedem Auftrag steht ein Angebot mit abgegrenztem Umfang. Entwicklung, Betreuung danach und externe Kosten sind getrennt ausgewiesen.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/produkte/nex2fly",
    datei: "produkte_.nex2fly.tsx",
    titel: "NeX AIFly Suite – Ihr KI-Arbeitsbereich",
    kurz: "NeX AIFly Suite",
    beschreibung:
      "Die NeX AIFly Suite hält Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort zusammen – in Ihrem eigenen Bereich.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/produkte/one",
    datei: "produkte_.one.tsx",
    titel: "NeX Agentic AI: zwei Agenten, eine klare Aufgabe",
    kurz: "NeX Agentic AI",
    beschreibung:
      "AIFly ORACLE ordnet, NeX führt aus: Zusammen übernehmen sie in Ihrem Auftrag benannte Arbeitsschritte – von der Recherche bis zum geprüften Entwurf.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/produkte/aifly-oracle",
    datei: "produkte_.aifly-oracle.tsx",
    titel: "AIFly ORACLE – erst ordnen, dann handeln",
    kurz: "AIFly ORACLE",
    beschreibung:
      "AIFly ORACLE ist das KI-System, das Aufgaben ordnet. Der Chat auf dieser Website ist noch nicht aktiv.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/produkte/nex-agentic-aifly",
    datei: "produkte_.nex-agentic-aifly.tsx",
    titel: "NeX Agentic AIFly – der Agent, der ausführt",
    kurz: "NeX Agentic AIFly",
    beschreibung:
      "NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/produkte/api",
    datei: "produkte_.api.tsx",
    titel: "NeXify API – KI in Ihrer Anwendung",
    kurz: "NeXify API",
    beschreibung:
      "Binden Sie KI-Funktionen von NeXify in Ihre eigene Software ein. Wir beschreiben die Schnittstelle nach Ihrem Datenfluss.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/produkte/skills-mcp",
    datei: "produkte_.skills-mcp.tsx",
    titel: "Skills und MCP – Ihre Werkzeuge, angebunden",
    kurz: "Skills und MCP",
    beschreibung:
      "Ein Skill ist eine Arbeitsweise, die ein Agent wiederholt anwenden kann. MCP ist der Standard, über den Agenten Ihre Systeme nutzen.",
    typ: "produkt",
    index: true,
  },
  {
    pfad: "/portale",
    datei: "portale.tsx",
    titel: "Kundencenter – in Einrichtung",
    kurz: "Kundencenter",
    beschreibung:
      "Kunden und Partner sollen je einen eigenen, geschützten Bereich erhalten. Das NeXify-Kundencenter wird derzeit eingerichtet; Zugänge vergeben wir persönlich.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/wissen",
    datei: "wissen.tsx",
    titel: "So arbeiten wir – vom Gespräch bis zur Übergabe",
    kurz: "So arbeiten wir",
    beschreibung:
      "Vom ersten Gespräch bis zur Übergabe: Sie sehen früh, welche Richtung entsteht, was enthalten ist und welche Entscheidung als Nächstes ansteht.",
    typ: "info",
    index: true,
  },
  {
    pfad: "/wissen/projekt-vorbereiten",
    datei: "wissen_.projekt-vorbereiten.tsx",
    titel: "Projekt vorbereiten: Ihr Briefing in fünf Fragen",
    kurz: "Projekt vorbereiten",
    beschreibung:
      "Sie brauchen kein fertiges Konzept. Fünf Antworten genügen, damit aus Ihrer Idee ein Angebot werden kann.",
    typ: "info",
    index: true,
    eltern: "/wissen",
  },
  {
    pfad: "/unternehmen",
    datei: "unternehmen.tsx",
    titel: "Über uns: ein Ansprechpartner, ein Agententeam",
    kurz: "Unternehmen",
    beschreibung:
      "NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und Richtung vor; die KI-Agenten NeX und AIFly ORACLE arbeiten aus.",
    typ: "unternehmen",
    index: true,
  },
  {
    pfad: "/kontakt",
    datei: "kontakt.tsx",
    titel: "Kontakt – schildern Sie Ihr Vorhaben",
    kurz: "Kontakt",
    beschreibung:
      "Beschreiben Sie Ihr Vorhaben in wenigen Sätzen – Pascal meldet sich persönlich mit einem klaren nächsten Schritt.",
    typ: "kontakt",
    index: true,
  },
  {
    pfad: "/vertragsgrundlagen",
    datei: "vertragsgrundlagen.tsx",
    titel: "Vertragsgrundlagen der Zusammenarbeit",
    kurz: "Vertragsgrundlagen",
    beschreibung:
      "Marke, Website, KI und Betreuung gehören zu einem abgestimmten Auftrag. Den verbindlichen Umfang legt die bestätigte Vereinbarung fest.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/impressum",
    datei: "impressum.tsx",
    titel: "Impressum",
    kurz: "Impressum",
    beschreibung:
      "Anbieter dieser Website ist NeXify AI by NeXify, Inhaber Pascal Courbois, eine Eenmanszaak nach niederländischem Recht mit Anschrift in Venlo.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/datenschutz",
    datei: "datenschutz.tsx",
    titel: "Datenschutz – Ihre Daten, ein klarer Zweck",
    kurz: "Datenschutz",
    beschreibung:
      "Verantwortlicher, Zwecke, Rechtsgrundlagen und Fristen: So geht NeXify AI auf dieser Website, bei Anfragen und in Arbeitsbereichen mit Ihren Daten um.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/cookies",
    datei: "cookies.tsx",
    titel: "Cookies – Sie wählen, was zusätzlich aktiv wird",
    kurz: "Cookies",
    beschreibung:
      "Diese Website verwendet keine Cookies für Analyse, Werbung oder Profilbildung. Was gespeichert wird und was nicht, steht vollständig auf dieser Seite.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/ki-hinweise",
    datei: "ki-hinweise.tsx",
    titel: "KI-Hinweise – KI mit klarer Verantwortung",
    kurz: "KI-Hinweise",
    beschreibung:
      "NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit. Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/barrierefreiheit",
    datei: "barrierefreiheit.tsx",
    titel: "Barrierefreiheit – Qualität soll zugänglich sein",
    kurz: "Barrierefreiheit",
    beschreibung:
      "Gutes Design trägt auch bei Tastaturbedienung, größerem Text und reduzierter Bewegung. Umgesetzte Maßnahmen, bekannte Einschränkungen und Rückmeldeweg.",
    typ: "recht",
    index: true,
  },
  {
    pfad: "/regionen",
    datei: "regionen.tsx",
    titel: "Regionen: Zusammenarbeit in ganz Deutschland",
    kurz: "Regionen",
    beschreibung:
      "NeXify AI arbeitet von Venlo aus für Unternehmen in allen 16 Bundesländern. Für jedes Land stehen hier die Feiertage und die Datenschutzaufsicht.",
    typ: "info",
    index: true,
  },
  // Eine Seite je Bundesland aus einer Routenvorlage und der Datentabelle
  // src/lib/regionen-daten.ts. Indexierung erst nach Inhaberfreigabe (LAENDERSEITEN_INDEXIERT).
  ...BUNDESLAENDER.map((land): Seite => ({
    pfad: `/regionen/${land.slug}`,
    datei: "regionen_.$land.tsx",
    titel: landTitel(land),
    kurz: land.name,
    beschreibung: landBeschreibung(land),
    typ: "info",
    index: LAENDERSEITEN_INDEXIERT,
    eltern: "/regionen",
    region: { name: land.name, code: land.code },
  })),
  // Kontoseiten: Das Kundencenter wird eingerichtet. Die drei Seiten erklären nur den Stand und
  // gehören weder in den Suchindex noch in die Sitemap.
  {
    pfad: "/anmelden",
    datei: "anmelden.tsx",
    titel: "Anmelden – Kundencenter in Einrichtung",
    kurz: "Anmelden",
    beschreibung:
      "Anmeldung: Das NeXify-Kundencenter wird derzeit eingerichtet; Zugänge vergeben wir persönlich je Kunde.",
    typ: "konto",
    index: false,
  },
  {
    pfad: "/registrieren",
    datei: "registrieren.tsx",
    titel: "Registrieren – Kundencenter in Einrichtung",
    kurz: "Registrieren",
    beschreibung:
      "Registrierung: Das NeXify-Kundencenter wird derzeit eingerichtet; Zugänge vergeben wir persönlich je Kunde.",
    typ: "konto",
    index: false,
  },
  {
    pfad: "/passwort-vergessen",
    datei: "passwort-vergessen.tsx",
    titel: "Passwort vergessen – Kundencenter in Einrichtung",
    kurz: "Passwort vergessen",
    beschreibung:
      "Passwort zurücksetzen: Das NeXify-Kundencenter wird derzeit eingerichtet; Zugänge vergeben wir persönlich je Kunde.",
    typ: "konto",
    index: false,
  },
];

/** Vollständiger `<title>`: die Startseite führt die Marke schon im Titel. */
export function seitenTitel(seite: Seite): string {
  return seite.pfad === "/" ? seite.titel : seite.titel + MARKENZUSATZ;
}
