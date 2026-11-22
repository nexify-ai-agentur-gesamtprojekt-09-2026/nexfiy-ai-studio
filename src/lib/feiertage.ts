import type { FeiertagId } from "./regionen-daten";

/**
 * Datum eines landesspezifischen Feiertags in einem Jahr, berechnet statt abgeschrieben: feste
 * Tage stehen im Gesetz mit Tag und Monat, Fronleichnam liegt 60 Tage nach Ostersonntag, der
 * Buß- und Bettag ist der Mittwoch vor dem 23. November. Alle Daten in UTC, damit Server und
 * Browser denselben Kalendertag sehen.
 */

/** Ostersonntag im gregorianischen Kalender (Anonymer Gregorianischer Algorithmus). */
export function ostersonntag(jahr: number): Date {
  const a = jahr % 19;
  const b = Math.floor(jahr / 100);
  const c = jahr % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31);
  const tag = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(jahr, monat - 1, tag));
}

const FEST: Partial<Record<FeiertagId, [monat: number, tag: number]>> = {
  "heilige-drei-koenige": [1, 6],
  frauentag: [3, 8],
  "augsburger-friedensfest": [8, 8],
  "mariae-himmelfahrt": [8, 15],
  weltkindertag: [9, 20],
  reformationstag: [10, 31],
  allerheiligen: [11, 1],
};

const TAG_MS = 86_400_000;

export function feiertagImJahr(id: FeiertagId, jahr: number): Date {
  const fest = FEST[id];
  if (fest) return new Date(Date.UTC(jahr, fest[0] - 1, fest[1]));
  if (id === "fronleichnam") return new Date(ostersonntag(jahr).getTime() + 60 * TAG_MS);
  // Buß- und Bettag: der letzte Mittwoch vor dem 23. November.
  const vor = new Date(Date.UTC(jahr, 10, 22));
  const zurueck = (vor.getUTCDay() - 3 + 7) % 7;
  return new Date(vor.getTime() - zurueck * TAG_MS);
}

/** Nächster Termin ab einem Kalendertag (JJJJ-MM-TT, einschließlich). */
export function naechsterTermin(id: FeiertagId, abTag: string): Date {
  const ab = new Date(`${abTag}T00:00:00Z`);
  const diesesJahr = feiertagImJahr(id, ab.getUTCFullYear());
  return diesesJahr.getTime() >= ab.getTime()
    ? diesesJahr
    : feiertagImJahr(id, ab.getUTCFullYear() + 1);
}

const FORMAT = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function datumText(datum: Date): string {
  return FORMAT.format(datum);
}

/** Heutiger Kalendertag in Deutschland (JJJJ-MM-TT). */
export function heuteInDeutschland(jetzt: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(jetzt);
}
