/**
 * Darf der Hero-Film sofort nach dem Laden starten?
 *
 * Warum es diese Regel gibt (Messung 25.11.2026, Mobil 390×844, CPU ×4, langsames 4G):
 * Startseite LCP 5 120 ms, /leistungen 5 296 ms, /kontakt 5 492 ms. Der Film ist 1,3–1,7 MB groß
 * und begann sofort zu laden; das Standbild des Hero-Bereichs musste sich dieselbe Leitung teilen.
 * Wurden die MP4-Dateien im Versuch blockiert, sank der LCP um 688–1 060 ms.
 *
 * Deshalb: bei reduzierter Bewegung, bei Daten-Sparmodus und in langsamen Netzen startet der Film
 * nicht von selbst — das Standbild bleibt, der Abspielknopf funktioniert weiterhin sofort.
 * Unbekannte Angaben (kein `navigator.connection`) gelten als ungebremst, damit sich am Desktop
 * nichts ändert.
 */
export interface Netzlage {
  reduzierteBewegung: boolean;
  datensparmodus?: boolean | undefined;
  netztyp?: string | undefined;
}

const LANGSAME_NETZE = new Set(["slow-2g", "2g", "3g"]);

export function heroFilmSofortStarten(lage: Netzlage): boolean {
  if (lage.reduzierteBewegung) return false;
  if (lage.datensparmodus === true) return false;
  if (lage.netztyp && LANGSAME_NETZE.has(lage.netztyp)) return false;
  return true;
}
