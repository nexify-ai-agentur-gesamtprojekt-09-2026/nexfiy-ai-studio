/**
 * /api/chat — Gegenstelle für den KI-Chat der öffentlichen Website (B-159).
 *
 * Warum vor dem Framework (in `src/server.ts`): der SSR-Wrapper reicht die Bindings nicht an
 * Framework-Routen durch; der Worker-Entry bekommt sie als zweites Argument.
 *
 * Vertrag:
 *   POST     { message: string (2..1500), session_id?: string, frage_id?: string }   (JSON)
 *            `frage_id` kennzeichnet eine Frage; „Erneut senden“ schickt dieselbe Kennung.
 *   Antwort  ohne `accept: text/event-stream`:
 *            200 { ok: true, antwort, session_id, hinweis }
 *            mit `accept: text/event-stream` (so ruft die Oberfläche auf): 200 als Ereignisstrom
 *            event: start    data: { session_id }
 *            event: delta    data: { t }            Textstück der Antwort
 *            event: ersetzen data: { t }            bisherige Ausgabe verwerfen, diesen Text zeigen
 *            event: ende     data: { hinweis, gespeichert }
 *            event: fehler   data: { fehler }       Anbieterfehler nach Beginn des Stroms
 *   Fehler   immer JSON { ok: false, fehler, … }:
 *            400 ungueltiges_json | feld_fehlt | zu_lang     403 fremde_herkunft
 *            405 methode_nicht_erlaubt                        413 zu_gross
 *            415 falscher_inhaltstyp
 *            429 zu_viele_anfragen | sitzungslimit_erreicht | tageslimit_erreicht  (+ retry-after)
 *            502 upstream_fehler | upstream_unvollstaendig (Anbieter-Strom riss vor seinem Ende ab)
 *            504 upstream_zeit        499 besucher_abbruch
 *            Ein gestarteter Anbieteraufruf zählt immer gegen die Limits; erstattet wird nur,
 *            wenn der Anbieter mit Fehlerstatus abgelehnt hat, bevor er eine Antwort begann.
 *            503 chat_abgeschaltet | chat_not_configured (fail-closed)
 *   GET      200 { ok: true, aktiv, grund }   Zustand für die Oberfläche, ohne Modellaufruf
 *
 * Schalter: Der Chat ist AUS, solange das Binding `CHAT_AKTIV` nicht ausdrücklich `an`, `1`, `true`
 * oder `on` lautet. Einschalten erst, wenn der Inhaber die Rechtstexte (Datenschutz, KI-Hinweise)
 * zum Chat freigegeben hat.
 *
 * Nötige Bindings, sonst 503 `chat_not_configured` und nichts wird gespeichert:
 *   DB (D1, mit migrations/0002 und 0003) · NINEROUTER_API_KEY · CHAT_IP_SCHLUESSEL (Geheimnis für
 *   den IP-Kurzwert, mindestens 16 Zeichen). Optional: CHAT_BASE_URL (https), CHAT_TAGESLIMIT,
 *   CHAT_AUFBEWAHRUNG_TAGE.
 *
 * Modell: ausschließlich das Policy-Modell `CHAT_MODELL` mit Reasoning `high` über den 9Router,
 * gesendet unter dessen Routernamen `CHAT_MODELL_ROUTERNAME`. Die Antwort muss eine der Kennungen
 * aus `CHAT_MODELL_ERLAUBT` ausweisen, sonst wird sie verworfen. Es gibt keinen Ersatz und keine
 * zweite Anfrage: fällt der Anbieter aus, erfährt der Besucher das.
 * Leitplanken auf der Antwort: src/lib/chat-leitplanken.ts (Beträge, Menschenbehauptung, Blöcke)
 * und `enthaeltRegelwerk` (Wiedergabe des Regelwerks).
 *
 * Datenschutz: keine Roh-IP. Gespeichert wird ein HMAC-SHA-256 über die IP (IPv6 auf /64 gekürzt)
 * mit `CHAT_IP_SCHLUESSEL`, dazu Frage und Antwort mit Sitzungskennung und Zeit – für den
 * Gesprächsverlauf und die Begrenzung von Missbrauch.
 * Aufbewahrung: siehe `raeumeChatAuf` und migrations/0003-chat-aufbewahrung.sql.
 */
import { createOutputGuard, visitorAmounts, type GuidanceTurn } from "@/lib/chat-leitplanken";
import { ersetzeKontaktPlatzhalter } from "@/lib/chat-platzhalter";
import { kontaktAntwort } from "@/lib/chat-kontakt";
import {
  CHAT_ERSATZANTWORT,
  CHAT_LEERANTWORT,
  CHAT_MODELL_ERLAUBT,
  CHAT_MODELL_ROUTERNAME,
  CHAT_REASONING,
  CHAT_SYSTEMPROMPT,
  enthaeltRegelwerk,
} from "@/lib/chat-wissen.server";

const TENANT = "nexifyai-platform";
const BASIS_STANDARD = "https://ai-router.nexifyai.cloud";

export const CHAT_MAX_ZEICHEN = 1500;
export const CHAT_MIN_ZEICHEN = 2;
/** Rumpfgrenze: 1500 Zeichen sind höchstens 6000 Byte UTF-8, dazu Sitzungskennung und JSON-Hülle. */
export const CHAT_MAX_BYTES = 8 * 1024;
export const CHAT_LIMITS = {
  jeIpProMinute: 8,
  jeIpProStunde: 60,
  jeIpProTag: 150,
  jeSitzungProTag: 60,
  /** Kostenbremse über alle Besucher; per Binding `CHAT_TAGESLIMIT` ohne Codeänderung anpassbar. */
  gesamtProTag: 1500,
} as const;
const VERLAUF_NACHRICHTEN = 6;
const VERLAUF_FENSTER_MS = 2 * 60 * 60 * 1000;
const MAX_ANTWORT_TOKENS = 1200;
const MAX_ANTWORT_ZEICHEN = 4000;
/** Zeitgrenzen zum Anbieter: erste Antwort, Stille im Strom, Gesamtdauer. */
const ZEIT_ERSTANTWORT_MS = 30_000;
const ZEIT_LEERLAUF_MS = 30_000;
const ZEIT_GESAMT_MS = 60_000;

export const CHAT_HINWEIS =
  "KI-generierte Antwort (Art. 50 KI-VO). Kann Fehler enthalten; keine Rechtsberatung, kein Angebot, keine Preis- oder Terminzusage.";

type D1Stmt = {
  bind(...values: unknown[]): D1Stmt;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
  all<T>(): Promise<{ results?: T[] }>;
};
type D1 = { prepare(sql: string): D1Stmt };

export interface ChatBindings {
  DB?: D1;
  NINEROUTER_API_KEY?: string;
  /** Geheimnis für den IP-Kurzwert (HMAC). Fehlt es, bleibt der Chat geschlossen. */
  CHAT_IP_SCHLUESSEL?: string;
  CHAT_BASE_URL?: string;
  /** Schalter ohne Deploy: nur `an`, `1`, `true` oder `on` schaltet ein. Standard: aus. */
  CHAT_AKTIV?: string;
  CHAT_TAGESLIMIT?: string;
  CHAT_AUFBEWAHRUNG_TAGE?: string;
}

export function chatBindings(argument?: ChatBindings): ChatBindings {
  if (argument && argument.DB) return argument;
  const ausGlobal = (globalThis as { __env__?: ChatBindings }).__env__;
  return ausGlobal ?? argument ?? {};
}

function json(
  inhalt: Record<string, unknown>,
  status: number,
  extra: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(inhalt), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });
}

/**
 * Adresse, über die der Kurzwert gebildet wird. IPv6 wird auf das /64-Präfix gekürzt: ein Anschluss
 * verfügt meist über ein ganzes /64 und könnte die Limits sonst mit jeder Anfrage neu beginnen.
 */
export function ipFuerKurzwert(roh: string | null): string {
  const ip = (roh ?? "").trim().toLowerCase();
  if (!ip) return "0.0.0.0";
  const eingebettet = /^(?:::ffff:)?(\d{1,3}(?:\.\d{1,3}){3})$/.exec(ip);
  if (eingebettet?.[1]) return eingebettet[1];
  if (!ip.includes(":")) return ip;
  const [vorn = "", hinten] = ip.replace(/%.*$/, "").split("::");
  const links = vorn ? vorn.split(":") : [];
  const rechts = hinten ? hinten.split(":") : [];
  const gruppen =
    hinten === undefined
      ? links
      : [...links, ...Array(Math.max(0, 8 - links.length - rechts.length)).fill("0"), ...rechts];
  const praefix = gruppen
    .slice(0, 4)
    .map((gruppe: string) => gruppe.replace(/^0+(?=.)/, "") || "0")
    .join(":");
  return `${praefix}::/64`;
}

/** HMAC statt bloßem Hash: Ohne das Geheimnis lässt sich der Kurzwert nicht durch Ausprobieren aller Adressen umkehren. */
export async function ipKurzwert(request: Request, geheimnis: string): Promise<string> {
  const kodierer = new TextEncoder();
  const schluessel = await crypto.subtle.importKey(
    "raw",
    kodierer.encode(geheimnis),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const ip = ipFuerKurzwert(request.headers.get("cf-connecting-ip"));
  const mac = await crypto.subtle.sign("HMAC", schluessel, kodierer.encode(`${TENANT}|${ip}`));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const KENNUNG = /^[A-Za-z0-9_-]{8,64}$/;

function sitzungswert(roh: unknown): string {
  if (typeof roh === "string" && roh.length >= 16 && KENNUNG.test(roh)) return roh;
  return crypto.randomUUID();
}

/** Liest den Rumpf mit harter Obergrenze, auch wenn `content-length` fehlt oder lügt. */
async function liesRumpf(request: Request): Promise<string | null> {
  const angekuendigt = Number(request.headers.get("content-length") ?? "0");
  if (angekuendigt > CHAT_MAX_BYTES) return null;
  if (!request.body) return "";
  const leser = request.body.getReader();
  const dekoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  for (;;) {
    const { done, value } = await leser.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > CHAT_MAX_BYTES) {
      await leser.cancel().catch(() => {});
      return null;
    }
    text += dekoder.decode(value, { stream: true });
  }
  return text + dekoder.decode();
}

function basisUrl(roh: string | undefined): string | null {
  try {
    const url = new URL(roh ?? BASIS_STANDARD);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return null;
  }
}

function ganzzahl(roh: string | undefined, standard: number, max: number): number {
  const wert = Number(roh);
  return Number.isInteger(wert) && wert > 0 && wert <= max ? wert : standard;
}

type Grenze = { fehler: string; warten: number };

/** Gezählt werden Anbieteraufrufe (`versuche`), nicht Zeilen: jede Frage steht nur einmal in der Tabelle. */
const ZAEHLE =
  "SELECT COALESCE(SUM(versuche), 0) FROM chat_nachrichten WHERE tenant = ?2 AND rolle = 'user'";

/**
 * Prüfen und Reservieren in EINER Anweisung: Die Zeile entsteht nur, wenn alle Fenster noch Platz
 * haben. D1 führt eine Anweisung atomar aus – gleichzeitige Anfragen können die Limits deshalb
 * nicht gemeinsam überschreiten (bei „erst zählen, dann schreiben“ könnten sie es).
 * Dieselbe Frage erneut (gleiche Kennung) erhöht `versuche`, statt eine zweite Zeile anzulegen.
 */
const RESERVIERE = `
INSERT INTO chat_nachrichten (id, tenant, session_id, rolle, inhalt, ip_hash, created_at, versuche)
SELECT ?1, ?2, ?3, 'user', ?4, ?5, ?6, 1
WHERE (${ZAEHLE} AND created_at > ?7) < ?8
  AND (${ZAEHLE} AND ip_hash = ?5 AND created_at > ?7) < ?9
  AND (${ZAEHLE} AND ip_hash = ?5 AND created_at > ?10) < ?11
  AND (${ZAEHLE} AND ip_hash = ?5 AND created_at > ?12) < ?13
  AND (${ZAEHLE} AND session_id = ?3 AND created_at > ?7) < ?14
ON CONFLICT(id) DO UPDATE SET
  versuche = versuche + 1, inhalt = excluded.inhalt, created_at = excluded.created_at
  WHERE chat_nachrichten.rolle = 'user' AND chat_nachrichten.ip_hash = excluded.ip_hash`;

function aenderungen(ergebnis: unknown): number | null {
  const e = ergebnis as { changes?: unknown; meta?: { changes?: unknown } } | null;
  const wert = e?.meta?.changes ?? e?.changes;
  return typeof wert === "number" ? wert : null;
}

type Fenster = { vorMinute: string; vorStunde: string; vorTag: string; gesamtProTag: number };

function fenster(gesamtProTag: number, jetzt = Date.now()): Fenster {
  return {
    vorMinute: new Date(jetzt - 60_000).toISOString(),
    vorStunde: new Date(jetzt - 3_600_000).toISOString(),
    vorTag: new Date(jetzt - 86_400_000).toISOString(),
    gesamtProTag,
  };
}

/** true: reserviert. false: ein Limit ist erreicht. Wirft, wenn die Datenbank nicht antwortet. */
async function reserviere(
  db: D1,
  zeile: { id: string; sessionId: string; nachricht: string; hash: string },
  f: Fenster,
): Promise<boolean> {
  const ergebnis = await db
    .prepare(RESERVIERE)
    .bind(
      zeile.id,
      TENANT,
      zeile.sessionId,
      zeile.nachricht,
      zeile.hash,
      new Date().toISOString(),
      f.vorTag,
      f.gesamtProTag,
      CHAT_LIMITS.jeIpProTag,
      f.vorStunde,
      CHAT_LIMITS.jeIpProStunde,
      f.vorMinute,
      CHAT_LIMITS.jeIpProMinute,
      CHAT_LIMITS.jeSitzungProTag,
    )
    .run();
  const anzahl = aenderungen(ergebnis);
  // Ohne Rückmeldung über die Zeilenzahl lässt sich das Limit nicht belegen: dann lieber kein Chat.
  if (anzahl === null) throw new Error("chat_db_ohne_aenderungszahl");
  return anzahl > 0;
}

type Zaehler = {
  ip_minute: number | null;
  ip_stunde: number | null;
  ip_tag: number | null;
  sitzung_tag: number | null;
  gesamt_tag: number | null;
};

/** Nur für die Meldung nach einer abgelehnten Reservierung: welches Fenster ist voll? */
async function nenneGrenze(db: D1, hash: string, sessionId: string, f: Fenster): Promise<Grenze> {
  const z = await db
    .prepare(
      `SELECT
         SUM(CASE WHEN ip_hash = ? AND created_at > ? THEN versuche ELSE 0 END) AS ip_minute,
         SUM(CASE WHEN ip_hash = ? AND created_at > ? THEN versuche ELSE 0 END) AS ip_stunde,
         SUM(CASE WHEN ip_hash = ? THEN versuche ELSE 0 END) AS ip_tag,
         SUM(CASE WHEN session_id = ? THEN versuche ELSE 0 END) AS sitzung_tag,
         SUM(versuche) AS gesamt_tag
       FROM chat_nachrichten
       WHERE tenant = ? AND rolle = 'user' AND created_at > ?`,
    )
    .bind(hash, f.vorMinute, hash, f.vorStunde, hash, sessionId, TENANT, f.vorTag)
    .first<Zaehler>();
  if ((z?.gesamt_tag ?? 0) >= f.gesamtProTag)
    return { fehler: "tageslimit_erreicht", warten: 3600 };
  if ((z?.ip_tag ?? 0) >= CHAT_LIMITS.jeIpProTag)
    return { fehler: "tageslimit_erreicht", warten: 3600 };
  if ((z?.sitzung_tag ?? 0) >= CHAT_LIMITS.jeSitzungProTag)
    return { fehler: "sitzungslimit_erreicht", warten: 3600 };
  if ((z?.ip_stunde ?? 0) >= CHAT_LIMITS.jeIpProStunde)
    return { fehler: "zu_viele_anfragen", warten: 900 };
  return { fehler: "zu_viele_anfragen", warten: 60 };
}

/**
 * Gibt eine Reservierung zurück – ausschließlich, wenn der Anbieter die Anfrage mit Fehlerstatus
 * abgelehnt hat (siehe `AnbieterFehler.erstattbar`): Die Frage zählt dann nicht, und es bleibt
 * keine unbeantwortete Zeile liegen.
 */
async function gibFrei(db: D1, id: string): Promise<void> {
  await db
    .prepare("DELETE FROM chat_nachrichten WHERE id = ? AND rolle = 'user' AND versuche <= 1")
    .bind(id)
    .run();
  await db
    .prepare(
      "UPDATE chat_nachrichten SET versuche = versuche - 1 WHERE id = ? AND rolle = 'user' AND versuche > 1",
    )
    .bind(id)
    .run();
}

type Nachricht = { role: "system" | "user" | "assistant"; content: string };

/**
 * Verlauf kommt ausschließlich aus der Datenbank (der Client kann keine Assistentenzeilen
 * unterschieben) und nur für dieselbe Sitzung UND denselben IP-Kurzwert: Wer eine fremde
 * Sitzungskennung kennt, bekommt deren Gespräch nicht als Kontext. Fragen ohne Antwort
 * (abgebrochen, Zeitlimit) werden nicht weitergegeben.
 */
async function ladeVerlauf(
  db: D1,
  sessionId: string,
  hash: string,
  ohneId: string,
): Promise<GuidanceTurn[]> {
  const seit = new Date(Date.now() - VERLAUF_FENSTER_MS).toISOString();
  const { results } = await db
    .prepare(
      "SELECT rolle, inhalt FROM chat_nachrichten WHERE tenant = ? AND session_id = ? AND ip_hash = ? AND created_at > ? AND id <> ? AND id <> ? ORDER BY created_at DESC, rolle DESC LIMIT ?",
    )
    .bind(TENANT, sessionId, hash, seit, ohneId, `${ohneId}.a`, VERLAUF_NACHRICHTEN * 2)
    .all<{ rolle: string; inhalt: string }>();
  const zeilen = (results ?? []).reverse();
  const paare: GuidanceTurn[] = [];
  for (let index = 0; index < zeilen.length - 1; index++) {
    const frage = zeilen[index];
    const antwort = zeilen[index + 1];
    if (frage?.rolle !== "user" || antwort?.rolle !== "assistant") continue;
    paare.push(
      { role: "user", content: String(frage.inhalt).slice(0, CHAT_MAX_ZEICHEN) },
      { role: "assistant", content: String(antwort.inhalt).slice(0, CHAT_MAX_ZEICHEN) },
    );
    index++;
  }
  return paare.slice(-VERLAUF_NACHRICHTEN);
}

/** Die Antwort gehört zur Frage (`<id>.a`); eine erneut gestellte Frage ersetzt ihre alte Antwort. */
function speichereAntwort(
  db: D1,
  frageId: string,
  sessionId: string,
  inhalt: string,
  hash: string,
) {
  return db
    .prepare(
      "INSERT OR REPLACE INTO chat_nachrichten (id, tenant, session_id, rolle, inhalt, ip_hash, created_at, versuche) VALUES (?, ?, ?, 'assistant', ?, ?, ?, 1)",
    )
    .bind(`${frageId}.a`, TENANT, sessionId, inhalt, hash, new Date().toISOString())
    .run();
}

/**
 * Vorschlag für die Aufbewahrungsfrist. Die Frist ist eine Inhaberentscheidung: mit dem Binding
 * `CHAT_AUFBEWAHRUNG_TAGE` (1..3650) wird sie ohne Codeänderung gesetzt.
 */
export const CHAT_AUFBEWAHRUNG_STANDARD_TAGE = 30;

/**
 * Löscht Chatnachrichten, die älter als `tage` sind. Es ist kein Cron eingerichtet, deshalb läuft
 * das Aufräumen bei jeder gespeicherten Frage mit (ein indiziertes DELETE). Von Hand: siehe
 * migrations/0003-chat-aufbewahrung.sql.
 */
export async function raeumeChatAuf(db: D1, tage: number, jetzt: Date = new Date()) {
  const grenze = new Date(jetzt.getTime() - tage * 86_400_000).toISOString();
  await db
    .prepare("DELETE FROM chat_nachrichten WHERE tenant = ? AND created_at < ?")
    .bind(TENANT, grenze)
    .run();
}

/**
 * `erstattbar` ist nur der eine Fall, in dem der Anbieter die Anfrage mit einem Fehlerstatus
 * abgelehnt hat, bevor er eine Antwort begann. Alles andere – Besucherabbruch, Zeitlimit,
 * Netzfehler, Fehler im laufenden Strom, Modellabweichung, leere Antwort – zählt als
 * gestarteter Anbieteraufruf und bleibt auf die Limits angerechnet.
 */
class AnbieterFehler extends Error {
  constructor(
    readonly art:
      "upstream_fehler" | "upstream_zeit" | "upstream_unvollstaendig" | "besucher_abbruch",
    readonly erstattbar = false,
  ) {
    super(art);
  }
}

/**
 * Der Router muss in seiner Antwort das Policy-Modell ausweisen. Meldet er ein anderes oder keines,
 * wird abgebrochen – nie stillschweigend mit einem Ersatzmodell weitergearbeitet. Protokolliert
 * wird nur die gemeldete Kennung, kein Inhalt.
 */
function pruefeModell(gemeldet: unknown): void {
  if (typeof gemeldet === "string" && CHAT_MODELL_ERLAUBT.includes(gemeldet)) return;
  console.error("chat_modell_abweichung", {
    erwartet: CHAT_MODELL_ERLAUBT,
    gemeldet: typeof gemeldet === "string" ? gemeldet.slice(0, 120) : null,
  });
  throw new AnbieterFehler("upstream_fehler");
}

type AnbieterTeil = {
  error?: unknown;
  model?: unknown;
  choices?: Array<{
    delta?: { content?: unknown };
    message?: { content?: unknown };
    finish_reason?: unknown;
  }>;
};

/**
 * Liest die Antwort des Routers als Strom und meldet jedes Textstück. Versteht beide Formen, die
 * der Router liefert: Ereignisstrom (`data: {…}`) und einen JSON-Rumpf, an den er ein
 * `data: [DONE]` hängt. Denkschritte des Modells (`reasoning`) werden nie weitergegeben.
 * Text wird erst gemeldet, nachdem das Modell der Antwort geprüft ist.
 */
async function leseAnbieter(
  antwort: Response,
  melde: (text: string) => void,
  leerlauf: () => void,
): Promise<void> {
  if (!antwort.body) throw new AnbieterFehler("upstream_fehler");
  const leser = antwort.body.getReader();
  const dekoder = new TextDecoder();
  let puffer = "";
  let form: "json" | "sse" | null = null;
  let modellGeprueft = false;
  /** Der Anbieter hat sein Ende gemeldet: `data: [DONE]` oder ein Stück mit `finish_reason`. */
  let abgeschlossen = false;
  const zeile = (roh: string) => {
    const text = roh.trim();
    if (!text.startsWith("data:")) return;
    const nutzlast = text.slice(5).trim();
    if (nutzlast === "[DONE]") abgeschlossen = true;
    if (!nutzlast || nutzlast === "[DONE]") return;
    let teil: AnbieterTeil;
    try {
      teil = JSON.parse(nutzlast) as AnbieterTeil;
    } catch {
      return;
    }
    if (teil.error) throw new AnbieterFehler("upstream_fehler");
    if (teil.model !== undefined) {
      pruefeModell(teil.model);
      modellGeprueft = true;
    }
    if (teil.choices?.[0]?.finish_reason) abgeschlossen = true;
    const stueck = teil.choices?.[0]?.delta?.content ?? teil.choices?.[0]?.message?.content;
    if (typeof stueck !== "string" || !stueck) return;
    if (!modellGeprueft) pruefeModell(undefined);
    melde(stueck);
  };
  for (;;) {
    const { done, value } = await leser.read();
    if (done) break;
    leerlauf();
    puffer += dekoder.decode(value, { stream: true });
    if (form === null) {
      const anfang = puffer.trimStart();
      if (!anfang) continue;
      form = anfang.startsWith("{") ? "json" : "sse";
    }
    if (form === "sse") {
      const zeilen = puffer.split("\n");
      puffer = zeilen.pop() ?? "";
      zeilen.forEach(zeile);
    }
  }
  puffer += dekoder.decode();
  if (form === "sse") {
    zeile(puffer);
    // Reißt der Strom ab, bevor der Anbieter sein Ende gemeldet hat, ist die Antwort ein Bruchstück:
    // Sie wird nicht als fertig gemeldet und nicht als Kontext für Folgefragen gespeichert.
    if (!abgeschlossen) throw new AnbieterFehler("upstream_unvollstaendig");
    return;
  }
  const marker = puffer.indexOf("\ndata:");
  const kern = (marker >= 0 ? puffer.slice(0, marker) : puffer).trim();
  let ergebnis: AnbieterTeil;
  try {
    ergebnis = JSON.parse(kern) as AnbieterTeil;
  } catch {
    throw new AnbieterFehler("upstream_fehler");
  }
  const text = ergebnis.choices?.[0]?.message?.content;
  if (ergebnis.error || typeof text !== "string") throw new AnbieterFehler("upstream_fehler");
  pruefeModell(ergebnis.model);
  melde(text);
}

type Lauf = {
  /** Liefert den vollständigen, geprüften Antworttext; `melde` bekommt Textstücke bzw. den Ersatz. */
  lies(melde: (ereignis: "delta" | "ersetzen", text: string) => void): Promise<string>;
  abbrechen(): void;
};

/** So viel Rohtext wird mit jedem neuen Stück erneut auf das Regelwerk geprüft (statt der ganzen Antwort). */
const REGELWERK_FENSTER = 320;

/** Ein einziger Aufruf an den Anbieter – kein Wiederholen, kein anderes Modell. */
async function rufeAnbieter(
  basis: string,
  schluessel: string,
  nachrichten: Nachricht[],
  strom: boolean,
  erlaubteBetraege: ReadonlySet<string>,
  besucher: AbortSignal | undefined,
): Promise<Lauf> {
  const steuerung = new AbortController();
  let grund: "upstream_zeit" | null = null;
  const zeitAus = () => {
    grund = "upstream_zeit";
    steuerung.abort();
  };
  const gesamt = setTimeout(zeitAus, ZEIT_GESAMT_MS);
  let stille = setTimeout(zeitAus, ZEIT_ERSTANTWORT_MS);
  const leerlauf = () => {
    clearTimeout(stille);
    stille = setTimeout(zeitAus, ZEIT_LEERLAUF_MS);
  };
  // Verlässt der Besucher die Seite, endet auch der Aufruf beim Anbieter.
  let besucherAbbruch = false;
  const besucherWeg = () => {
    besucherAbbruch = true;
    steuerung.abort();
  };
  if (besucher?.aborted) besucherWeg();
  else besucher?.addEventListener("abort", besucherWeg, { once: true });
  /** Beendet den Anbieteraufruf in jedem Fall: Zeitgeber aus, Verbindung zu. */
  const beende = () => {
    clearTimeout(gesamt);
    clearTimeout(stille);
    besucher?.removeEventListener("abort", besucherWeg);
    steuerung.abort();
  };
  // Zeitlimit und Besucherabbruch sind eigene Ursachen; beide sind nie erstattbar.
  const fehler = () =>
    new AnbieterFehler(grund ?? (besucherAbbruch ? "besucher_abbruch" : "upstream_fehler"));

  let antwort: Response;
  try {
    antwort = await fetch(`${basis}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${schluessel}` },
      body: JSON.stringify({
        model: CHAT_MODELL_ROUTERNAME,
        reasoning: CHAT_REASONING,
        messages: nachrichten,
        max_tokens: MAX_ANTWORT_TOKENS,
        temperature: 0.2,
        stream: strom,
      }),
      // Nie mit dem Serverschlüssel einer Weiterleitung folgen.
      // Workers kennt nur "follow" | "manual": "error" wirft sofort (TypeError). "manual" plus
      // ausdrückliche 3xx-Prüfung darunter leistet dasselbe — nie mit dem Serverschlüssel folgen.
      redirect: "manual",
      signal: steuerung.signal,
    });
  } catch (e) {
    beende();
    // Diagnose: Name und Kurztext des Wurfs, kein Inhalt und kein Schlüssel.
    console.error("chat_anbieter_wurf", {
      name: e && typeof e === "object" && "name" in e ? String((e as { name?: unknown }).name) : null,
      text: String(e).slice(0, 200),
    });
    throw fehler();
  }
  if (!antwort.ok || (antwort.status >= 300 && antwort.status < 400)) {
    beende();
    // Nur Status und Herkunft, kein Inhalt: macht 401/403/1042 unterscheidbar.
    console.error("chat_upstream_status", {
      status: antwort.status,
      server: antwort.headers.get("server"),
      mit: antwort.headers.get("cf-mitigated"),
      ray: antwort.headers.get("cf-ray") ? "ja" : null,
    });
    // Der Anbieter hat mit Fehlerstatus abgelehnt, ohne eine Antwort zu beginnen: der einzige
    // Fall, in dem die Reservierung zurückgegeben wird. Ein Abbruch oder Zeitlimit, das zufällig
    // gleichzeitig eintrat, geht vor.
    throw grund || besucherAbbruch ? fehler() : new AnbieterFehler("upstream_fehler", true);
  }
  leerlauf();

  return {
    abbrechen() {
      besucherAbbruch = true;
      beende();
    },
    async lies(melde) {
      // Rohtext des Modells; sichtbar wird nur, was die Leitplanken satzweise freigeben.
      let rohLaenge = 0;
      let rohEnde = "";
      let inhalt = false;
      let ersetzt = false;
      const leitplanke = createOutputGuard({
        allowedAmounts: erlaubteBetraege,
        repair: ersetzeKontaktPlatzhalter,
      });
      try {
        await leseAnbieter(
          antwort,
          (stueck) => {
            if (ersetzt || rohLaenge >= MAX_ANTWORT_ZEICHEN) return;
            const neu = stueck.slice(0, MAX_ANTWORT_ZEICHEN - rohLaenge);
            rohLaenge += neu.length;
            inhalt ||= /\S/u.test(neu);
            const pruefen = rohEnde + neu;
            rohEnde = pruefen.slice(-REGELWERK_FENSTER);
            if (enthaeltRegelwerk(pruefen)) {
              ersetzt = true;
              melde("ersetzen", CHAT_ERSATZANTWORT);
              steuerung.abort();
              return;
            }
            const frei = leitplanke.push(neu);
            if (frei) melde("delta", frei);
          },
          leerlauf,
        );
      } catch (ursache) {
        if (!ersetzt) throw ursache instanceof AnbieterFehler && !grund ? ursache : fehler();
      } finally {
        // Auch nach einem Fehlerereignis oder einer Modellabweichung läuft beim Anbieter nichts weiter.
        beende();
      }
      if (ersetzt) return CHAT_ERSATZANTWORT;
      const rest = leitplanke.finish();
      if (rest) melde("delta", rest);
      const fertig = leitplanke.text.trim();
      if (fertig) return fertig;
      // Das Modell hat nichts oder nur Leerraum geliefert: ein Anbieterfehler.
      if (!inhalt) throw new AnbieterFehler("upstream_fehler");
      // Es hat geliefert, aber nichts davon darf gezeigt werden (z. B. nur ein Datenblock).
      melde("delta", CHAT_LEERANTWORT);
      return CHAT_LEERANTWORT;
    },
  };
}

function ereignis(name: string, daten: Record<string, unknown>): Uint8Array {
  return new TextEncoder().encode(`event: ${name}\ndata: ${JSON.stringify(daten)}\n\n`);
}

/** Eingeschaltet ist der Chat nur auf ausdrückliche Anweisung; alles andere – auch kein Wert – heißt aus. */
function eingeschaltet(b: ChatBindings): boolean {
  return ["an", "1", "true", "on"].includes((b.CHAT_AKTIV ?? "").trim().toLowerCase());
}

function eingerichtet(b: ChatBindings): boolean {
  return Boolean(
    b.DB &&
    b.NINEROUTER_API_KEY &&
    (b.CHAT_IP_SCHLUESSEL ?? "").length >= 16 &&
    basisUrl(b.CHAT_BASE_URL),
  );
}

/**
 * Prüfergebnis „Tabelle hat die Spalte `versuche`“ (Migration 0003) je Datenbank und Isolate.
 * Ein Treffer gilt für die Lebensdauer des Isolates; ein Fehlschlag nur kurz, damit eine eben
 * angewendete Migration ohne neuen Deploy wirkt.
 */
const SCHEMA_FEHLT_MS = 60_000;
const schemaGeprueft = new WeakMap<D1, { ok: boolean; zeit: number }>();

async function schemaBereit(db: D1): Promise<boolean> {
  const bekannt = schemaGeprueft.get(db);
  if (bekannt && (bekannt.ok || Date.now() - bekannt.zeit < SCHEMA_FEHLT_MS)) return bekannt.ok;
  let ok: boolean;
  try {
    // Liest keine Zeile, scheitert aber, solange es Tabelle oder Spalte nicht gibt.
    await db.prepare("SELECT versuche FROM chat_nachrichten LIMIT 0").all();
    ok = true;
  } catch {
    ok = false;
  }
  schemaGeprueft.set(db, { ok, zeit: Date.now() });
  return ok;
}

export type ChatZustandGrund = "abgeschaltet" | "nicht_eingerichtet";

/**
 * Ob der Chat Fragen annimmt: eingeschaltet, eingerichtet und Datenbank auf dem Stand von
 * Migration 0003. Ohne Modellaufruf, ohne Besucherdaten; die Datenbank wird nur gefragt, wenn der
 * Chat eingeschaltet ist. Grundlage für `GET /api/chat` und den Schalterzustand im Seiten-HTML.
 */
export async function ermittleChatZustand(
  argument?: ChatBindings,
): Promise<{ aktiv: boolean; grund: ChatZustandGrund | null }> {
  const b = chatBindings(argument);
  if (!eingeschaltet(b)) return { aktiv: false, grund: "abgeschaltet" };
  if (!eingerichtet(b) || !b.DB || !(await schemaBereit(b.DB)))
    return { aktiv: false, grund: "nicht_eingerichtet" };
  return { aktiv: true, grund: null };
}

export async function handleChat(request: Request, argument?: ChatBindings): Promise<Response> {
  // GET: Zustand für die Oberfläche (kein Modellaufruf, keine Speicherung, keine Besucherdaten).
  if (request.method === "GET" || request.method === "HEAD") {
    const { aktiv, grund } = await ermittleChatZustand(argument);
    return json({ ok: true, aktiv, grund }, 200);
  }
  if (request.method !== "POST")
    return json({ ok: false, fehler: "methode_nicht_erlaubt" }, 405, { allow: "GET, POST" });

  const url = new URL(request.url);
  const herkunft = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if ((herkunft && herkunft !== url.origin) || fetchSite === "cross-site")
    return json({ ok: false, fehler: "fremde_herkunft" }, 403);
  if (!(request.headers.get("content-type") ?? "").toLowerCase().includes("application/json"))
    return json({ ok: false, fehler: "falscher_inhaltstyp" }, 415);

  const rumpf = await liesRumpf(request);
  if (rumpf === null) return json({ ok: false, fehler: "zu_gross" }, 413);

  const b = chatBindings(argument);
  if (!eingeschaltet(b)) return json({ ok: false, fehler: "chat_abgeschaltet" }, 503);
  const basis = basisUrl(b.CHAT_BASE_URL);
  const schluessel = b.NINEROUTER_API_KEY;
  const ipGeheimnis = b.CHAT_IP_SCHLUESSEL;
  // Fail-closed und vor jeder Speicherung: ohne Datenbank, Schlüssel, IP-Geheimnis oder gültige Route kein Chat.
  if (!b.DB || !schluessel || !basis || !ipGeheimnis || !eingerichtet(b))
    return json({ ok: false, fehler: "chat_not_configured" }, 503);
  const db = b.DB;

  let koerper: unknown;
  try {
    koerper = JSON.parse(rumpf);
  } catch {
    return json({ ok: false, fehler: "ungueltiges_json" }, 400);
  }
  // Nur `message`, `session_id` und `frage_id` zählen; `model`, `messages`, `system` o. Ä. werden ignoriert.
  const daten = (koerper && typeof koerper === "object" ? koerper : {}) as {
    message?: unknown;
    session_id?: unknown;
    frage_id?: unknown;
  };
  const nachricht = typeof daten.message === "string" ? daten.message.trim() : "";
  if (nachricht.length < CHAT_MIN_ZEICHEN) {
    return json(
      { ok: false, fehler: "feld_fehlt", felder: { message: "Bitte eine Nachricht eingeben." } },
      400,
    );
  }
  if (nachricht.length > CHAT_MAX_ZEICHEN) {
    return json(
      { ok: false, fehler: "zu_lang", felder: { message: `Maximal ${CHAT_MAX_ZEICHEN} Zeichen.` } },
      400,
    );
  }
  const sessionId = sitzungswert(daten.session_id);
  const frageKennung =
    typeof daten.frage_id === "string" && KENNUNG.test(daten.frage_id)
      ? daten.frage_id
      : crypto.randomUUID();
  const frageId = `${sessionId}.${frageKennung}`;

  let hash: string;
  let verlauf: GuidanceTurn[];
  try {
    hash = await ipKurzwert(request, ipGeheimnis);
    const f = fenster(ganzzahl(b.CHAT_TAGESLIMIT, CHAT_LIMITS.gesamtProTag, 100_000));
    if (!(await reserviere(db, { id: frageId, sessionId, nachricht, hash }, f))) {
      const grenze = await nenneGrenze(db, hash, sessionId, f);
      return json({ ok: false, fehler: grenze.fehler, warten: grenze.warten }, 429, {
        "retry-after": String(grenze.warten),
      });
    }
    verlauf = await ladeVerlauf(db, sessionId, hash, frageId);
    const tage = ganzzahl(b.CHAT_AUFBEWAHRUNG_TAGE, CHAT_AUFBEWAHRUNG_STANDARD_TAGE, 3650);
    // Ein Fehler beim Aufräumen darf die Antwort nicht verhindern.
    await raeumeChatAuf(db, tage).catch(() => {});
  } catch {
    return json({ ok: false, fehler: "chat_not_configured" }, 503);
  }

  // Kontaktfragen deterministisch beantworten: Adresse und Rufnummer sind öffentlich, das Modell
  // sieht sie wegen der Maskierung des Routers aber nicht (siehe chat-kontakt.ts). Die Antwort
  // wird wie jede andere gespeichert, damit der Verlauf für Folgefragen vollständig bleibt.
  const kontakt = kontaktAntwort(nachricht);
  if (kontakt) {
    const gespeichert = await speichereAntwort(db, frageId, sessionId, kontakt, hash)
      .then(() => true)
      .catch(() => false);
    const alsEreignisstrom = (request.headers.get("accept") ?? "").includes("text/event-stream");
    if (!alsEreignisstrom) {
      return json(
        {
          ok: true,
          antwort: kontakt,
          session_id: sessionId,
          hinweis: CHAT_HINWEIS,
          ...(gespeichert ? {} : { speicherung: "fehlgeschlagen" }),
        },
        200,
      );
    }
    const strom = new ReadableStream<Uint8Array>({
      start(steuerung) {
        steuerung.enqueue(ereignis("start", { session_id: sessionId }));
        steuerung.enqueue(ereignis("delta", { t: kontakt }));
        steuerung.enqueue(ereignis("ende", { hinweis: CHAT_HINWEIS, gespeichert }));
        steuerung.close();
      },
    });
    return new Response(strom, {
      status: 200,
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-store, no-transform",
        "x-accel-buffering": "no",
      },
    });
  }

  const nachrichten: Nachricht[] = [
    { role: "system", content: CHAT_SYSTEMPROMPT },
    ...verlauf,
    { role: "user", content: nachricht },
  ];
  const alsStrom = (request.headers.get("accept") ?? "").includes("text/event-stream");
  const fehlerAntwort = (ursache: unknown) => {
    const art = ursache instanceof AnbieterFehler ? ursache.art : "upstream_fehler";
    // 499: Der Besucher hat die Anfrage selbst beendet; die Antwort erreicht ihn in der Regel nicht.
    const status = art === "upstream_zeit" ? 504 : art === "besucher_abbruch" ? 499 : 502;
    return json({ ok: false, fehler: art, session_id: sessionId }, status);
  };
  /**
   * Ein gestarteter Anbieteraufruf zählt immer gegen die Limits. Zurückgegeben wird die
   * Reservierung nur, wenn der Anbieter die Anfrage mit Fehlerstatus abgelehnt hat
   * (`erstattbar`) – nie bei Besucherabbruch, Zeitlimit, Netzfehler oder nach Beginn der Antwort.
   * Sonst ließen sich die Limits durch Abbrechen und Wiederholen umgehen.
   */
  const erstatteFallsAbgelehnt = async (ursache: unknown) => {
    if (ursache instanceof AnbieterFehler && ursache.erstattbar)
      await gibFrei(db, frageId).catch(() => {});
  };

  let lauf: Lauf;
  try {
    lauf = await rufeAnbieter(
      basis,
      schluessel,
      nachrichten,
      alsStrom,
      visitorAmounts(verlauf, nachricht),
      // Ein bereits abgebrochenes Signal sagt nichts über einen künftigen Abbruch: durchreichen
      // hieße, den Anbieteraufruf sofort zu verwerfen (Worker-Adapter liefern das gelegentlich).
      request.signal?.aborted ? undefined : request.signal,
    );
  } catch (ursache) {
    await erstatteFallsAbgelehnt(ursache);
    return fehlerAntwort(ursache);
  }

  const ablegen = async (text: string) => {
    try {
      await speichereAntwort(db, frageId, sessionId, text, hash);
      return true;
    } catch {
      // Die Antwort ist erzeugt; eine fehlgeschlagene Ablage wird gemeldet, nicht verschwiegen.
      return false;
    }
  };

  if (!alsStrom) {
    try {
      const text = await lauf.lies(() => {});
      const gespeichert = await ablegen(text);
      return json(
        {
          ok: true,
          antwort: text,
          session_id: sessionId,
          hinweis: CHAT_HINWEIS,
          ...(gespeichert ? {} : { speicherung: "fehlgeschlagen" }),
        },
        200,
      );
    } catch (ursache) {
      // Die Antwort hatte begonnen: keine Erstattung, gleich aus welchem Grund sie endete.
      return fehlerAntwort(ursache);
    }
  }

  let beendet = false;
  const strom = new ReadableStream<Uint8Array>({
    async start(steuerung) {
      steuerung.enqueue(ereignis("start", { session_id: sessionId }));
      try {
        const text = await lauf.lies((name, stueck) => {
          if (!beendet) steuerung.enqueue(ereignis(name, { t: stueck }));
        });
        const gespeichert = await ablegen(text);
        if (!beendet) steuerung.enqueue(ereignis("ende", { hinweis: CHAT_HINWEIS, gespeichert }));
      } catch (ursache) {
        // Die Antwort hatte begonnen: keine Erstattung, gleich aus welchem Grund sie endete.
        const art = ursache instanceof AnbieterFehler ? ursache.art : "upstream_fehler";
        if (!beendet) steuerung.enqueue(ereignis("fehler", { fehler: art }));
      }
      if (!beendet) {
        beendet = true;
        steuerung.close();
      }
    },
    cancel() {
      // Besucher hat abgebrochen oder die Seite verlassen: den Anbieteraufruf sofort beenden.
      beendet = true;
      lauf.abbrechen();
    },
  });
  return new Response(strom, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
