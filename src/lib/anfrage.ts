/**
 * Anfrage-Eingang: geteilte Regeln fuer Browser und Worker.
 * Warum hier: die Feldregeln stehen schon in `inquiry.ts`; dieser Modul ergaenzt nur das, was der
 * Serverpfad zusaetzlich braucht (Body lesen, Nummer, Dedup-Schluessel, Client-Aufruf).
 * Kein `cloudflare:workers`-Import — damit im Testlauf ohne Worker-Runtime nutzbar.
 */
import {
  normalizeInquiry,
  validateInquiry,
  type InquiryKind,
  type InquiryValues,
} from "@/lib/inquiry";

export const ANFRAGE_PFAD = "/api/anfrage";
export const ANFRAGE_MAX_BYTES = 16 * 1024;
export const ANFRAGE_FENSTER_SEKUNDEN = 10 * 60;
export const ANFRAGE_MAX_JE_FENSTER = 5;

export type AnfrageRoh = Record<string, unknown>;

export interface AnfrageAntwort {
  ok?: boolean;
  nummer?: string;
  status?: string;
  doppelt?: boolean;
  fehler?: string;
  felder?: Record<string, string>;
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** Nummer im Vertrag `NX-<JJJJMMTT>-<6 Hex>`; Zufall injizierbar, damit der Test reproduzierbar ist. */
export function anfrageNummer(jetzt: Date = new Date(), zufall?: Uint8Array): string {
  const tag = jetzt.toISOString().slice(0, 10).replace(/-/g, "");
  const bytes = zufall ?? crypto.getRandomValues(new Uint8Array(3));
  const teil = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `NX-${tag}-${teil}`;
}

/**
 * Schluessel gegen Doppelabgabe: ein Zeitfenster statt eines Zeitstempels, damit ein zweiter Klick
 * und ein Reload dieselbe Nummer liefern. Der Client-Key (`Idempotency-Key`) hat Vorrang.
 */
export async function anfrageDedupKey(
  art: InquiryKind,
  werte: InquiryValues,
  jetzt: Date = new Date(),
): Promise<string> {
  const fenster = Math.floor(jetzt.getTime() / (ANFRAGE_FENSTER_SEKUNDEN * 1000));
  const roh = [art, werte.email, werte.message, String(fenster)].join("\u0000");
  return `auto-${(await sha256Hex(roh)).slice(0, 40)}`;
}

/** Header-Werte sind nicht vertrauenswuerdig: nur ein brauchbar langer, sichtbarer Key wird benutzt. */
export function anfrageSchluesselAusHeader(wert: string | null): string | null {
  if (!wert) return null;
  const sauber = wert.trim();
  return /^[A-Za-z0-9._:-]{8,128}$/.test(sauber) ? sauber : null;
}

export type BodyErgebnis =
  { ok: true; daten: AnfrageRoh } | { ok: false; grund: "zu_gross" | "unlesbar" };

/**
 * Liest `application/json` (JS-Weg) und `application/x-www-form-urlencoded` (Formular ohne JS).
 * Andere Typen gelten als unlesbar: ein Formular mit Datei-Upload gibt es hier nicht.
 */
export async function liesAnfrageBody(request: Request): Promise<BodyErgebnis> {
  const typ = (request.headers.get("content-type") ?? "").toLowerCase();
  const text = await request.text();
  if (text.length > ANFRAGE_MAX_BYTES) return { ok: false, grund: "zu_gross" };
  if (typ.includes("application/json")) {
    try {
      const wert: unknown = JSON.parse(text);
      if (wert && typeof wert === "object" && !Array.isArray(wert)) {
        return { ok: true, daten: wert as AnfrageRoh };
      }
      return { ok: false, grund: "unlesbar" };
    } catch {
      return { ok: false, grund: "unlesbar" };
    }
  }
  if (typ.includes("application/x-www-form-urlencoded")) {
    const daten: AnfrageRoh = {};
    for (const [feld, wert] of new URLSearchParams(text)) daten[feld] = wert;
    return { ok: true, daten };
  }
  return { ok: false, grund: "unlesbar" };
}

/** Art aus dem Rumpf; alles ausser `partner` bleibt die Kontaktanfrage. */
export function anfrageArt(daten: AnfrageRoh): InquiryKind {
  return daten["kind"] === "partner" ? "partner" : "contact";
}

/** Normalisiert + prueft in einem Schritt und liefert die Feldmeldungen des Formulars. */
export function pruefeAnfrage(
  art: InquiryKind,
  daten: AnfrageRoh,
): {
  werte: InquiryValues;
  felder: Record<string, string>;
} {
  const werte = normalizeInquiry(daten);
  return { werte, felder: validateInquiry(art, werte) as Record<string, string> };
}

export interface AnfrageErgebnis {
  nummer: string | null;
  fehler: string | null;
}

/**
 * Browser-Aufruf. Kein Werfen nach aussen: bei Netz- oder Serverfehler bleibt `nummer` leer und der
 * Aufrufer faellt auf den bisherigen E-Mail-Weg zurueck, statt den Besucher mit einem Fehler zu lassen.
 */
export async function sendeAnfrage(
  art: InquiryKind,
  werte: InquiryValues,
  timeoutMs = 12_000,
): Promise<AnfrageErgebnis> {
  try {
    const antwort = await fetch(ANFRAGE_PFAD, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "idempotency-key": crypto.randomUUID(),
      },
      body: JSON.stringify({ ...werte, consent: werte.consent, kind: art }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    const daten = (await antwort.json().catch(() => ({}))) as AnfrageAntwort;
    if (antwort.ok && daten.nummer) return { nummer: daten.nummer, fehler: null };
    return { nummer: null, fehler: daten.fehler ?? `Eingang antwortete mit ${antwort.status}.` };
  } catch {
    return { nummer: null, fehler: null };
  }
}
