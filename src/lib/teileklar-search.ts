import { contactDraftPath } from "./site-navigation";
export function partInquiryPath(query: string) {
  return contactDraftPath(
    `Ich suche folgendes Teil: ${query.trim().slice(0, 120)}\nFahrzeug und weitere Angaben: `,
  );
}
export function workshopMapsUrl(place: string): string | null {
  const normalized = place.trim().slice(0, 80);
  return normalized
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Kfz Werkstatt ${normalized}`)}`
    : null;
}
