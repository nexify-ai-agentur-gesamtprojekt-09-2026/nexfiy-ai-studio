/**
 * Unternehmensangaben an einer Stelle, wortgleich zum Impressum (src/routes/impressum.tsx).
 * Strukturierte Daten, Offline-Seite und llms.txt lesen von hier; der Test in seo.test.ts
 * vergleicht jede Angabe mit dem sichtbaren Impressumstext. Wer das Impressum ändert, ändert
 * diese Datei mit.
 */
export const SITE_ORIGIN = "https://www.nexifyai.de";
export const SITE_NAME = "NeXify AI";

export const KONTAKT = {
  telefon: "+31 6 133 188 56",
  telefonLink: "tel:+31613318856",
  email: "mail@nexifyai.cloud",
} as const;

export const UNTERNEHMEN = {
  name: SITE_NAME,
  firma: "NeXify AI by NeXify",
  inhaber: "Pascal Courbois",
  rechtsform: "Eenmanszaak nach niederländischem Recht",
  strasse: "Graaf van Loonstraat 1E",
  plz: "5921 JA",
  ort: "Venlo",
  land: "NL",
  register: "Kamer van Koophandel",
  kvkNummer: "90483944",
  ustId: "NL865786276B01",
  /**
   * Länder, die die Website selbst als Zielgebiet nennt (Startseite, Abschnitt „Häufige Fragen":
   * „Unternehmen in Deutschland, den Niederlanden, Österreich und der Schweiz"). Kein weiteres
   * Land ohne sichtbare Nennung; Koordinaten stehen nirgends, deshalb gibt es kein `geo`.
   */
  zielLaender: ["DE", "NL", "AT", "CH"],
} as const;

/**
 * Markenzeichen für Kopf- und Fußzeile: 192 px als WebP (rund 10 kB) statt der 512er PNG
 * (152 kB), die für 40 bis 96 px Darstellung auf jeder Seite geladen wurde. Die große Datei
 * bleibt für Stellen, die sie brauchen (Offline-Seite, Web-App-Hinweis).
 */
export const LOGO_KLEIN = "/site-assets/9176c58a16ff634a-192.webp";
