/**
 * Freigestellte Produktfotos: reine Regeln für Annahme, Ablagepfad und Gültigkeit.
 * Das Original bleibt immer gespeichert; die freigestellte Fassung gilt nur für genau das Original, aus dem sie entstand.
 */
export const MAX_CUTOUT_BYTES = 2 * 1024 * 1024;

/** WebP-Datei erkennen (RIFF-Container mit WEBP-Kennung); andere Formate werden abgelehnt. */
export function isWebpImage(bytes: Uint8Array): boolean {
  if (bytes.length < 16) return false;
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.subarray(from, to));
  return ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
}

/** Ablagepfad neben dem Original; die Prüfsumme dient wie beim Original als Versionsparameter. */
export function cutoutStoragePath(articleId: string, sha256Hex: string): string {
  return `${articleId}/cutout-${sha256Hex.slice(0, 16)}.webp`;
}

/** Freigestellte Fassung nur, wenn sie zum aktuell gespeicherten Original gehört. */
export function activeCutout(row: {
  image_path: string;
  image_cutout_path: string;
  image_cutout_of: string;
}): string {
  return row.image_cutout_path && row.image_path && row.image_cutout_of === row.image_path
    ? row.image_cutout_path
    : "";
}
