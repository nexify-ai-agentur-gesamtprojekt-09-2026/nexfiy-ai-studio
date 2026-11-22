/**
 * Datentabelle der Regionalseiten (/regionen und /regionen/<land>): die 16 deutschen
 * Bundesländer mit den Angaben, die je Land tatsächlich verschieden sind. Eine Routenvorlage
 * (src/routes/regionen_.$land.tsx) rendert daraus jede Seite; die Seitentabelle
 * (src/lib/seo-pages.ts) und die Sitemap lesen dieselben Einträge.
 *
 * Was hier steht und warum nur das:
 *  - NeXify AI arbeitet von Venlo (NL) aus für Unternehmen in Deutschland, den Niederlanden,
 *    Österreich und der Schweiz. Es gibt keine Büros, Adressen, Ansprechpartner, Referenzen,
 *    Bewertungen oder Preise je Land – deshalb steht nichts davon in dieser Tabelle.
 *  - `feiertage`: gesetzliche Feiertage, die zusätzlich zu den bundesweiten im Land gelten und
 *    auf einen Werktag fallen können (Oster- und Pfingstsonntag bleiben weg). Quelle: das
 *    Feiertagsgesetz des jeweiligen Landes, Stand 22.11.2026. `teilweise`: gilt nicht im ganzen
 *    Land, sondern nur in benannten Gemeinden.
 *  - `aufsicht`: die für nichtöffentliche Stellen (Unternehmen) im Land zuständige
 *    Datenschutzaufsicht. Name und Adresse von der Website der Behörde, abgerufen am 22.11.2026
 *    (Bremen: Website verweigerte den automatischen Abruf, Name und Adresse nach bekanntem Stand).
 *  - `grenzeZu`: Nachbarstaaten des Landes, die zugleich Zielländer von NeXify AI sind
 *    (src/lib/site-facts.ts, `zielLaender`). Andere Nachbarstaaten bleiben weg, weil NeXify AI
 *    dort nicht arbeitet.
 *
 * Planungsgrundlage: Governance-Repository, docs/09-final/11-seo-kampagne-und-wettbewerb.md (K8
 * Local) und config/pseo.json („Städteseiten ohne Partner (Doorway)" verboten), Recherche
 * docs/research/keyword-local-seo-sources.md (keine Ortsseite ohne eigenständigen Nutzen, vor
 * Indexierung Keyword-Messung und fachlicher Review). Diese Datei bleibt ohne Importe und ohne
 * Laufzeit-TypeScript, damit Node sie über seo-pages.ts für die Sitemap direkt lesen kann.
 */

/**
 * Inhaberfreigabe für den Suchindex. Solange `false`, sind die 16 Länderseiten erreichbar und
 * verlinkt, tragen aber `noindex, follow` und stehen nicht in Sitemap und llms.txt. Auf `true`
 * erst, wenn die Freigabe laut config/seo-workflow.json vorliegt (Keyword-Messung, Seitenzweck,
 * fachlicher Review); danach `node tools/generate-sitemap.mjs` ausführen.
 */
export const LAENDERSEITEN_INDEXIERT = false;

export type FeiertagId =
  | "heilige-drei-koenige"
  | "frauentag"
  | "fronleichnam"
  | "augsburger-friedensfest"
  | "mariae-himmelfahrt"
  | "weltkindertag"
  | "reformationstag"
  | "allerheiligen"
  | "buss-und-bettag";

export interface LandFeiertag {
  id: FeiertagId;
  /** Nur gesetzt, wenn der Tag nicht im ganzen Land gilt: wo er gilt. */
  teilweise?: string;
}

export type Zielland = "NL" | "AT" | "CH";

export interface Bundesland {
  /** Adressteil unter /regionen/, klein und ohne Umlaute. */
  slug: string;
  name: string;
  /** ISO 3166-2 */
  code: string;
  hauptstadt: string;
  stadtstaat: boolean;
  feiertage: LandFeiertag[];
  aufsicht: { name: string; kurz: string; url: string };
  grenzeZu: Zielland[];
}

export const BUNDESLAENDER: Bundesland[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    code: "DE-BW",
    hauptstadt: "Stuttgart",
    stadtstaat: false,
    feiertage: [{ id: "heilige-drei-koenige" }, { id: "fronleichnam" }, { id: "allerheiligen" }],
    aufsicht: {
      name: "Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg",
      kurz: "LfDI Baden-Württemberg",
      url: "https://www.baden-wuerttemberg.datenschutz.de/",
    },
    grenzeZu: ["CH"],
  },
  {
    slug: "bayern",
    name: "Bayern",
    code: "DE-BY",
    hauptstadt: "München",
    stadtstaat: false,
    feiertage: [
      { id: "heilige-drei-koenige" },
      { id: "fronleichnam" },
      { id: "augsburger-friedensfest", teilweise: "nur im Stadtgebiet Augsburg" },
      {
        id: "mariae-himmelfahrt",
        teilweise: "in Gemeinden mit überwiegend katholischer Bevölkerung",
      },
      { id: "allerheiligen" },
    ],
    aufsicht: {
      name: "Bayerisches Landesamt für Datenschutzaufsicht",
      kurz: "BayLDA",
      url: "https://www.lda.bayern.de/",
    },
    grenzeZu: ["AT"],
  },
  {
    slug: "berlin",
    name: "Berlin",
    code: "DE-BE",
    hauptstadt: "Berlin",
    stadtstaat: true,
    feiertage: [{ id: "frauentag" }],
    aufsicht: {
      name: "Berliner Beauftragte für Datenschutz und Informationsfreiheit",
      kurz: "BlnBDI",
      url: "https://www.datenschutz-berlin.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    code: "DE-BB",
    hauptstadt: "Potsdam",
    stadtstaat: false,
    feiertage: [{ id: "reformationstag" }],
    aufsicht: {
      name: "Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg",
      kurz: "LDA Brandenburg",
      url: "https://www.lda.brandenburg.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "bremen",
    name: "Bremen",
    code: "DE-HB",
    hauptstadt: "Bremen",
    stadtstaat: true,
    feiertage: [{ id: "reformationstag" }],
    aufsicht: {
      name: "Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen",
      kurz: "LfDI Bremen",
      url: "https://www.datenschutz.bremen.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    code: "DE-HH",
    hauptstadt: "Hamburg",
    stadtstaat: true,
    feiertage: [{ id: "reformationstag" }],
    aufsicht: {
      name: "Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit",
      kurz: "HmbBfDI",
      url: "https://datenschutz-hamburg.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "hessen",
    name: "Hessen",
    code: "DE-HE",
    hauptstadt: "Wiesbaden",
    stadtstaat: false,
    feiertage: [{ id: "fronleichnam" }],
    aufsicht: {
      name: "Hessischer Beauftragter für Datenschutz und Informationsfreiheit",
      kurz: "HBDI",
      url: "https://datenschutz.hessen.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    code: "DE-MV",
    hauptstadt: "Schwerin",
    stadtstaat: false,
    feiertage: [{ id: "frauentag" }, { id: "reformationstag" }],
    aufsicht: {
      name: "Landesbeauftragte für Datenschutz und Informationsfreiheit Mecklenburg-Vorpommern",
      kurz: "LfDI Mecklenburg-Vorpommern",
      url: "https://www.datenschutz-mv.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    code: "DE-NI",
    hauptstadt: "Hannover",
    stadtstaat: false,
    feiertage: [{ id: "reformationstag" }],
    aufsicht: {
      name: "Landesbeauftragter für den Datenschutz Niedersachsen",
      kurz: "LfD Niedersachsen",
      url: "https://www.lfd.niedersachsen.de/",
    },
    grenzeZu: ["NL"],
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    code: "DE-NW",
    hauptstadt: "Düsseldorf",
    stadtstaat: false,
    feiertage: [{ id: "fronleichnam" }, { id: "allerheiligen" }],
    aufsicht: {
      name: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
      kurz: "LDI NRW",
      url: "https://www.ldi.nrw.de/",
    },
    grenzeZu: ["NL"],
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    code: "DE-RP",
    hauptstadt: "Mainz",
    stadtstaat: false,
    feiertage: [{ id: "fronleichnam" }, { id: "allerheiligen" }],
    aufsicht: {
      name: "Landesbeauftragter für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz",
      kurz: "LfDI Rheinland-Pfalz",
      url: "https://www.datenschutz.rlp.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "saarland",
    name: "Saarland",
    code: "DE-SL",
    hauptstadt: "Saarbrücken",
    stadtstaat: false,
    feiertage: [{ id: "fronleichnam" }, { id: "mariae-himmelfahrt" }, { id: "allerheiligen" }],
    aufsicht: {
      name: "Unabhängiges Datenschutzzentrum Saarland",
      kurz: "UDZ Saarland",
      url: "https://www.datenschutz.saarland.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    code: "DE-SN",
    hauptstadt: "Dresden",
    stadtstaat: false,
    feiertage: [
      {
        id: "fronleichnam",
        teilweise: "in bestimmten Gemeinden, vor allem im sorbischen Siedlungsgebiet",
      },
      { id: "reformationstag" },
      { id: "buss-und-bettag" },
    ],
    aufsicht: {
      name: "Sächsische Datenschutz- und Transparenzbeauftragte",
      kurz: "SDTB",
      url: "https://www.datenschutz.sachsen.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    code: "DE-ST",
    hauptstadt: "Magdeburg",
    stadtstaat: false,
    feiertage: [{ id: "heilige-drei-koenige" }, { id: "reformationstag" }],
    aufsicht: {
      name: "Landesbeauftragte für den Datenschutz Sachsen-Anhalt",
      kurz: "LfD Sachsen-Anhalt",
      url: "https://datenschutz.sachsen-anhalt.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    code: "DE-SH",
    hauptstadt: "Kiel",
    stadtstaat: false,
    feiertage: [{ id: "reformationstag" }],
    aufsicht: {
      name: "Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein",
      kurz: "ULD",
      url: "https://www.datenschutzzentrum.de/",
    },
    grenzeZu: [],
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    code: "DE-TH",
    hauptstadt: "Erfurt",
    stadtstaat: false,
    feiertage: [
      {
        id: "fronleichnam",
        teilweise:
          "in bestimmten Gemeinden mit überwiegend katholischer Bevölkerung, vor allem im Eichsfeld",
      },
      { id: "weltkindertag" },
      { id: "reformationstag" },
    ],
    aufsicht: {
      name: "Thüringer Landesbeauftragter für den Datenschutz und die Informationsfreiheit",
      kurz: "TLfDI",
      url: "https://www.tlfdi.de/",
    },
    grenzeZu: [],
  },
];

export const FEIERTAG_NAMEN: Record<FeiertagId, string> = {
  "heilige-drei-koenige": "Heilige Drei Könige",
  frauentag: "Internationaler Frauentag",
  fronleichnam: "Fronleichnam",
  "augsburger-friedensfest": "Augsburger Hohes Friedensfest",
  "mariae-himmelfahrt": "Mariä Himmelfahrt",
  weltkindertag: "Weltkindertag",
  reformationstag: "Reformationstag",
  allerheiligen: "Allerheiligen",
  "buss-und-bettag": "Buß- und Bettag",
};

/** Titel ohne Markenzusatz; mit „ · NeXify AI" höchstens 60 Zeichen (geprüft in seo.test.ts). */
export function landTitel(land: Bundesland): string {
  return `Websites und KI für ${land.name}`;
}

/** Beschreibung aus dem sichtbaren Einleitungstext der Länderseite. */
export function landBeschreibung(land: Bundesland): string {
  return `NeXify AI begleitet Unternehmen in ${land.name} aus Venlo, ohne Anfahrt. Diese Seite nennt die Feiertage und die Datenschutzaufsicht für Ihr Projekt.`;
}
