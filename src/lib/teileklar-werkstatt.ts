export type Ort = [plz: string, name: string, land: string, lat: number, lon: number];
export type Werkstatt = [id: string, name: string, lat: number, lon: number];
export type WerkstattSuche = { q: string; radius: number };
export type WerkstattErgebnis =
  | { status: "invalid" | "unknown" }
  | { status: "ambiguous"; options: string[] }
  | { status: "ok"; total: number; items: { id: string; name: string; distanceKm: number }[] };

const label = ([plz, name, land]: Ort) => `${plz} ${name}${land ? ` (${land})` : ""}`;
const normalize = (s: string) => s.trim().replace(/\s+/g, " ").normalize("NFC").toLowerCase();
const rad = Math.PI / 180;

function entfernung(lat: number, lon: number, a: number, b: number) {
  const x =
    Math.sin(((a - lat) * rad) / 2) ** 2 +
    Math.cos(lat * rad) * Math.cos(a * rad) * Math.sin(((b - lon) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(Math.min(1, x)));
}

export function sucheWerkstaetten(
  { q, radius }: WerkstattSuche,
  orte: readonly Ort[],
  betriebe: readonly Werkstatt[],
): WerkstattErgebnis {
  if (typeof q !== "string" || q.length > 80 || ![10, 25, 50, 100].includes(radius))
    return { status: "invalid" };
  const key = normalize(q);
  if (key.length < 2 || (/^\d+$/.test(key) && !/^\d{5}$/.test(key))) return { status: "invalid" };
  const postal = /^\d{5}$/.test(key);
  const place = orte.filter((o) =>
    postal ? o[0] === key : normalize(o[1]) === key || normalize(label(o)) === key,
  );
  if (!place.length) return { status: "unknown" };
  if (!postal && new Set(place.map((o) => o[2])).size > 1) {
    return { status: "ambiguous", options: [...new Set(place.map(label))].sort().slice(0, 12) };
  }
  // For one ZIP/city use the centre of its distinct known GeoNames points.
  const unique = [...new Map(place.map((o) => [`${o[3]},${o[4]}`, o])).values()];
  const lat = unique.reduce((n, o) => n + o[3], 0) / unique.length;
  const lon = unique.reduce((n, o) => n + o[4], 0) / unique.length;
  if (!postal && unique.some((o) => entfernung(lat, lon, o[3], o[4]) > 25)) {
    return { status: "ambiguous", options: [...new Set(place.map(label))].sort().slice(0, 12) };
  }
  const hits = betriebe
    .map(([id, name, a, b]) => ({ id, name, distanceKm: entfernung(lat, lon, a, b) }))
    .filter((w) => w.distanceKm <= radius)
    .sort((a, b) => a.distanceKm - b.distanceKm || a.id.localeCompare(b.id));
  return {
    status: "ok",
    total: hits.length,
    items: hits
      .slice(0, 30)
      .map((item) => ({ ...item, distanceKm: Math.round(item.distanceKm * 10) / 10 })),
  };
}
