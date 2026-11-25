/**
 * NeXify AI Consulting — eine Quelle für Preis, Leistungsumfang, Ablauf und Antworten.
 *
 * Warum als Datentabelle: Preis und Umfang stehen auf der Landingpage, in der Startseiten-Sektion,
 * im Formular und später im Angebot. Weicht eine Stelle ab, entsteht ein Preisversprechen, das
 * niemand einhalten kann. Deshalb kommt 449 überall aus dieser Datei.
 *
 * Vorgabe Pascal 25.11.2026: 449 EUR netto pro Beratungstag, Tag = 8 Stunden inklusive
 * Vorbereitung, gemeinsamer Arbeitszeit, Auswertung und Dokumentation.
 */

export const BERATUNG_NAME = "NeXify AI Consulting";
export const BERATUNG_PREIS_NETTO = 449;
export const BERATUNG_TAG_STUNDEN = 8;
export const BERATUNG_PFAD = "/ki-beratung";

/** Vier Bausteine des Tages; Summe = 8 Stunden. */
export const BERATUNG_TAGESTEILE = [
  {
    titel: "Vorbereitung",
    minuten: 60,
    text: "Unternehmen, Ausgangssituation, Ziele und vorhandene Systeme erfassen.",
  },
  {
    titel: "Analyse",
    minuten: 120,
    text: "Geschäftsprozesse, Arbeitsabläufe und Herausforderungen gemeinsam untersuchen.",
  },
  {
    titel: "KI-Workshop",
    minuten: 120,
    text: "Konkrete Einsatzmöglichkeiten, geeignete Werkzeuge und praxisnahe Beispiele.",
  },
  {
    titel: "Strategie und Maßnahmenplanung",
    minuten: 120,
    text: "Potenziale bewerten, Prioritäten setzen und die nächsten Schritte festlegen.",
  },
  {
    titel: "Dokumentation",
    minuten: 60,
    text: "Ergebnisse, Handlungsempfehlungen und individuelle Maßnahmenübersicht erstellen.",
  },
] as const;

export const BERATUNG_BEREICHE = [
  { titel: "KI-Strategieberatung", nutzen: "Klarheit über sinnvolle Einsatzmöglichkeiten." },
  {
    titel: "Unternehmens- und Prozessanalyse",
    nutzen: "Manuelle Arbeit, Medienbrüche und Engpässe erkennen.",
  },
  { titel: "KI-Coaching", nutzen: "Geschäftsführung und Mitarbeitende befähigen." },
  { titel: "Automatisierungsberatung", nutzen: "Wiederkehrende Aufgaben gezielt vereinfachen." },
  {
    titel: "Software- und Toolberatung",
    nutzen: "Geeignete Lösungen auswählen und Fehlkäufe vermeiden.",
  },
  {
    titel: "KI-Roadmap",
    nutzen: "Konkrete Maßnahmen nach Nutzen, Aufwand und Risiko priorisieren.",
  },
  { titel: "Umsetzungsbegleitung", nutzen: "Einführung, Integration und Akzeptanz unterstützen." },
  {
    titel: "Datenschutz und Sicherheit",
    nutzen: "Risiken identifizieren und geeignete Maßnahmen vorbereiten.",
  },
] as const;

/** Auswahl im Formular — dieselben Bezeichnungen wie auf der Seite. */
export const BERATUNG_AUSWAHL = BERATUNG_BEREICHE.map((b) => b.titel);

export const BERATUNG_ABLAUF = [
  {
    titel: "Ausgangssituation und Ziele verstehen",
    text: "Wir klären, wo Ihr Unternehmen heute steht und was Sie erreichen möchten.",
  },
  {
    titel: "Prozesse und Systeme gemeinsam analysieren",
    text: "Bestehende Abläufe, Werkzeuge und Schnittstellen werden aufgenommen.",
  },
  {
    titel: "KI-Anwendungsfälle identifizieren",
    text: "Wo entsteht echter Nutzen, wo wäre KI nur ein Etikett?",
  },
  {
    titel: "Möglichkeiten praktisch erläutern und bewerten",
    text: "Beispiele aus Ihrem Alltag statt allgemeiner Technikfolien.",
  },
  {
    titel: "Maßnahmen, Prioritäten und nächste Schritte festlegen",
    text: "Was zuerst, was später, was bleibt besser wie es ist.",
  },
  {
    titel: "Individuelle Ergebnisdokumentation erstellen",
    text: "Zum Nachlesen und Weiterarbeiten, nicht als Gedächtnisprotokoll.",
  },
] as const;

export const BERATUNG_ERGEBNISSE = [
  "Dokumentierte Zusammenfassung des untersuchten Bereichs",
  "Priorisierte Empfehlungen nach Nutzen und Aufwand",
  "Relevante KI-Anwendungsfälle für Ihr Unternehmen",
  "Qualitative Aufwand- und Nutzenbewertung",
  "Notwendige Voraussetzungen für die Umsetzung",
  "Roadmap für die nächsten Schritte",
] as const;

/**
 * Antworten, die sich aus dem Angebot selbst ergeben. Nichts davon verspricht Reaktionszeiten,
 * Erfolge oder Kapazitäten, die nicht zugesagt sind.
 */
export const BERATUNG_FAQS = [
  {
    frage: "Benötige ich bereits Kenntnisse über künstliche Intelligenz?",
    antwort:
      "Nein. Der Beratungstag setzt kein Vorwissen voraus. Wir beginnen bei Ihren Abläufen und erklären die technischen Möglichkeiten dort, wo sie für Ihre Entscheidung relevant werden.",
  },
  {
    frage: "Ist die Beratung auch für kleine Unternehmen geeignet?",
    antwort:
      "Ja. Der Umfang richtet sich nach dem untersuchten Bereich, nicht nach der Mitarbeiterzahl. Bei kleinen Unternehmen lässt sich ein Tag auf einen Ausschnitt konzentrieren, etwa Angebotserstellung oder Kundenkommunikation.",
  },
  {
    frage: "Können bereits bestehende Softwarelösungen berücksichtigt werden?",
    antwort:
      "Ja. Vorhandene Systeme werden einbezogen. Ein Ergebnis kann ausdrücklich lauten, dass eine bestehende Lösung ausreicht und keine neue Software nötig ist.",
  },
  {
    frage: "Kann mein Team am Coaching teilnehmen?",
    antwort:
      "Ja. Der Beratungstag ist für Ihre Mitarbeitenden offen. Je mehr Beteiligte aus dem betroffenen Bereich dabei sind, desto belastbarer wird die Analyse.",
  },
  {
    frage: "Was erhalte ich nach dem Beratungstag?",
    antwort:
      "Eine Ergebnisdokumentation mit priorisierten Empfehlungen, möglichen KI-Anwendungsfällen, einer Einschätzung von Aufwand und Nutzen sowie einer Roadmap für den untersuchten Bereich.",
  },
  {
    frage: "Kann ich weitere Beratungstage buchen?",
    antwort:
      "Ja, jeder weitere Tag wird separat zum selben Tagessatz vereinbart. Auch Schulungen, regelmäßiges Coaching und Umsetzungsprojekte lassen sich anschließen.",
  },
  {
    frage: "Ist eine spätere Umsetzung durch NeXify möglich?",
    antwort:
      "Ja, wenn Sie das möchten. Die Beratung ist dafür aber keine Voraussetzung und begründet keine Verpflichtung.",
  },
  {
    frage: "Muss ich nach der Beratung einen Entwicklungsauftrag erteilen?",
    antwort:
      "Nein. Der Beratungstag ist ein eigenständiges Angebot. Sie entscheiden anschließend frei, ob und mit wem Sie umsetzen.",
  },
  {
    frage: "Wie werden vertrauliche Unternehmensinformationen behandelt?",
    antwort:
      "Unterlagen und Gesprächsinhalte werden ausschließlich für die Beratung verwendet, mandantenbezogen getrennt und nicht an Dritte weitergegeben. Auf Wunsch wird vorab eine Vertraulichkeitsvereinbarung geschlossen.",
  },
  {
    frage: "Sind Online- und Vor-Ort-Termine möglich?",
    antwort:
      "Beides ist möglich. Bei Vor-Ort-Terminen werden Reiseaufwand und Kosten vor der Beauftragung abgestimmt, damit keine Position später überrascht.",
  },
] as const;

/** Preisangabe für Fließtext: 449 € netto pro Beratungstag. */
export function preisText(): string {
  return `${BERATUNG_PREIS_NETTO} € netto pro Beratungstag`;
}

export interface BeratungAngaben {
  bereiche: string[];
  format: string;
  zeitraum: string;
  tage: string;
  branche: string;
  groesse: string;
  telefon: string;
  systeme: string;
  werbung: boolean;
}

export const BERATUNG_LEER: BeratungAngaben = {
  bereiche: [],
  format: "",
  zeitraum: "",
  tage: "1",
  branche: "",
  groesse: "",
  telefon: "",
  systeme: "",
  werbung: false,
};

export const BERATUNG_FORMATE = ["Vor Ort", "Online", "Noch offen"] as const;
export const BERATUNG_GROESSEN = ["1–9", "10–49", "50–249", "250 und mehr"] as const;

/**
 * Baut die Nachricht, die im Anfrage-Eingang landet. Die Zusatzangaben stehen als Block über dem
 * freien Text, damit sie in jeder Mail lesbar und später maschinell auswertbar sind.
 */
export function beratungNachricht(ziel: string, angaben: BeratungAngaben): string {
  const zeilen = [
    "[KI-Beratung]",
    `Bereiche: ${angaben.bereiche.join(", ") || "—"}`,
    `Format: ${angaben.format || "—"}`,
    `Zeitraum: ${angaben.zeitraum || "—"}`,
    `Beratungstage: ${angaben.tage || "1"}`,
    `Branche: ${angaben.branche || "—"}`,
    `Unternehmensgröße: ${angaben.groesse || "—"}`,
    `Telefon: ${angaben.telefon || "—"}`,
    `Bereits eingesetzte Systeme: ${angaben.systeme || "—"}`,
    `Werbeeinwilligung: ${angaben.werbung ? "ja" : "nein"}`,
    "",
    "Ziele und Herausforderungen:",
    ziel.trim(),
  ];
  return zeilen.join("\n");
}

/** Pflichtfelder des Beratungsformulars; Rückgabe wie bei `validateInquiry` (Feld → Meldung). */
export function pruefeBeratung(ziel: string, angaben: BeratungAngaben): Record<string, string> {
  const fehler: Record<string, string> = {};
  if (angaben.bereiche.length === 0)
    fehler["bereiche"] = "Bitte wählen Sie mindestens einen Beratungsbereich.";
  if (!ziel.trim()) fehler["ziel"] = "Bitte beschreiben Sie kurz Ihre Ziele und Herausforderungen.";
  else if (ziel.trim().length < 20)
    fehler["ziel"] = "Ein, zwei Sätze genügen – bitte etwas ausführlicher.";
  else if (ziel.length > 2000)
    fehler["ziel"] = "Bitte kürzen Sie Ihre Schilderung auf höchstens 2000 Zeichen.";
  if (angaben.telefon && !/^[+0-9()/\s-]{6,30}$/.test(angaben.telefon))
    fehler["telefon"] = "Bitte prüfen Sie die Telefonnummer.";
  return fehler;
}
