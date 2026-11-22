/**
 * POST /api/chat — Gegenstelle für den KI-Chat der öffentlichen Website (B-159).
 *
 * Warum vor dem Framework (in `src/server.ts`): der SSR-Wrapper reicht die Bindings nicht an
 * Framework-Routen durch; der Worker-Entry bekommt sie als zweites Argument.
 *
 * Vertrag:
 *   Anfrage  { message: string (2..1500), session_id?: string }      content-type: application/json
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
 *            502 upstream_fehler      504 upstream_zeit
 *            503 chat_not_configured (fail-closed) | chat_abgeschaltet (Binding CHAT_AKTIV=aus)
 *   GET      200 { ok: true, aktiv, grund }   Zustand für die Oberfläche, ohne Modellaufruf
 *
 * Modell: ausschließlich das Policy-Modell `CHAT_MODELL` mit Reasoning `high` über den 9Router,
 * gesendet unter dessen Routernamen `CHAT_MODELL_ROUTERNAME`. Es gibt keinen Ersatz und keine
 * zweite Anfrage: fällt der Anbieter aus, erfährt der Besucher das.
 * Leitplanken auf der Antwort: src/lib/chat-leitplanken.ts (Beträge, Menschenbehauptung, Blöcke)
 * und `enthaeltRegelwerk` (Wiedergabe des Regelwerks).
 *
 * Datenschutz: keine Roh-IP, nur SHA-256(IP|Tenant). Gespeichert werden Frage und Antwort mit
 * Sitzungskennung und Zeit – für den Gesprächsverlauf und die Begrenzung von Missbrauch.
 * Aufbewahrung: siehe `raeumeChatAuf` und migrations/0003-chat-aufbewahrung.sql.
 */
import { createOutputGuard, visitorAmounts, type GuidanceTurn } from "@/lib/chat-leitplanken";
import {
  CHAT_ERSATZANTWORT,
  CHAT_MODELL_ROUTERNAME,
  CHAT_REASONING,
  CHAT_SYSTEMPROMPT,
  enthaeltRegelwerk,
} from "@/lib/chat-wissen";

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
  CHAT_BASE_URL?: string;
  /** Schalter ohne Deploy: "aus", "0", "false" oder "off" schaltet den Chat ab. Standard: an. */
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

async function ipHash(request: Request): Promise<string> {
  const ip = request.headers.get("cf-connecting-ip") ?? "0.0.0.0";
  const daten = new TextEncoder().encode(`${ip}|${TENANT}`);
  const digest = await crypto.subtle.digest("SHA-256", daten);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sitzungswert(roh: unknown): string {
  if (typeof roh === "string" && /^[A-Za-z0-9_-]{16,64}$/.test(roh)) return roh;
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

type Zaehler = {
  ip_minute: number | null;
  ip_stunde: number | null;
  ip_tag: number | null;
  sitzung_tag: number | null;
  gesamt_tag: number | null;
};

type Grenze = { fehler: string; warten: number } | null;

async function pruefeGrenzen(
  db: D1,
  hash: string,
  sessionId: string,
  gesamtProTag: number,
): Promise<Grenze> {
  const vorMinute = new Date(Date.now() - 60_000).toISOString();
  const vorStunde = new Date(Date.now() - 3_600_000).toISOString();
  const vorTag = new Date(Date.now() - 86_400_000).toISOString();
  const z = await db
    .prepare(
      `SELECT
         SUM(CASE WHEN ip_hash = ? AND created_at > ? THEN 1 ELSE 0 END) AS ip_minute,
         SUM(CASE WHEN ip_hash = ? AND created_at > ? THEN 1 ELSE 0 END) AS ip_stunde,
         SUM(CASE WHEN ip_hash = ? THEN 1 ELSE 0 END) AS ip_tag,
         SUM(CASE WHEN session_id = ? THEN 1 ELSE 0 END) AS sitzung_tag,
         COUNT(*) AS gesamt_tag
       FROM chat_nachrichten
       WHERE tenant = ? AND rolle = 'user' AND created_at > ?`,
    )
    .bind(hash, vorMinute, hash, vorStunde, hash, sessionId, TENANT, vorTag)
    .first<Zaehler>();
  if (!z) return null;
  if ((z.gesamt_tag ?? 0) >= gesamtProTag) return { fehler: "tageslimit_erreicht", warten: 3600 };
  if ((z.ip_tag ?? 0) >= CHAT_LIMITS.jeIpProTag)
    return { fehler: "tageslimit_erreicht", warten: 3600 };
  if ((z.sitzung_tag ?? 0) >= CHAT_LIMITS.jeSitzungProTag)
    return { fehler: "sitzungslimit_erreicht", warten: 3600 };
  if ((z.ip_stunde ?? 0) >= CHAT_LIMITS.jeIpProStunde)
    return { fehler: "zu_viele_anfragen", warten: 900 };
  if ((z.ip_minute ?? 0) >= CHAT_LIMITS.jeIpProMinute)
    return { fehler: "zu_viele_anfragen", warten: 60 };
  return null;
}

type Nachricht = { role: "system" | "user" | "assistant"; content: string };

/** Verlauf kommt ausschließlich aus der Datenbank: der Client kann keine Assistentenzeilen unterschieben. */
async function ladeVerlauf(db: D1, sessionId: string): Promise<GuidanceTurn[]> {
  const seit = new Date(Date.now() - VERLAUF_FENSTER_MS).toISOString();
  const { results } = await db
    .prepare(
      "SELECT rolle, inhalt FROM chat_nachrichten WHERE tenant = ? AND session_id = ? AND created_at > ? ORDER BY created_at DESC LIMIT ?",
    )
    .bind(TENANT, sessionId, seit, VERLAUF_NACHRICHTEN)
    .all<{ rolle: string; inhalt: string }>();
  return (results ?? [])
    .reverse()
    .filter((zeile) => zeile.rolle === "user" || zeile.rolle === "assistant")
    .map((zeile) => ({
      role: zeile.rolle as "user" | "assistant",
      content: String(zeile.inhalt).slice(0, CHAT_MAX_ZEICHEN),
    }));
}

function speichere(db: D1, sessionId: string, rolle: string, inhalt: string, hash: string) {
  return db
    .prepare(
      `INSERT INTO chat_nachrichten (id, tenant, session_id, rolle, inhalt, ip_hash, created_at) VALUES (?, ?, ?, '${rolle === "user" ? "user" : "assistant"}', ?, ?, ?)`,
    )
    .bind(crypto.randomUUID(), TENANT, sessionId, inhalt, hash, new Date().toISOString())
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

class AnbieterFehler extends Error {
  constructor(readonly art: "upstream_fehler" | "upstream_zeit") {
    super(art);
  }
}

/**
 * Liest die Antwort des Routers als Strom und meldet jedes Textstück. Versteht beide Formen, die
 * der Router liefert: Ereignisstrom (`data: {…}`) und einen JSON-Rumpf, an den er ein
 * `data: [DONE]` hängt. Denkschritte des Modells (`reasoning`) werden nie weitergegeben.
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
  const zeile = (roh: string) => {
    const text = roh.trim();
    if (!text.startsWith("data:")) return;
    const nutzlast = text.slice(5).trim();
    if (!nutzlast || nutzlast === "[DONE]") return;
    let teil: {
      error?: unknown;
      choices?: Array<{ delta?: { content?: unknown }; message?: { content?: unknown } }>;
    };
    try {
      teil = JSON.parse(nutzlast);
    } catch {
      return;
    }
    if (teil.error) throw new AnbieterFehler("upstream_fehler");
    const stueck = teil.choices?.[0]?.delta?.content ?? teil.choices?.[0]?.message?.content;
    if (typeof stueck === "string" && stueck) melde(stueck);
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
    return;
  }
  const marker = puffer.indexOf("\ndata:");
  const kern = (marker >= 0 ? puffer.slice(0, marker) : puffer).trim();
  let ergebnis: { error?: unknown; choices?: Array<{ message?: { content?: unknown } }> };
  try {
    ergebnis = JSON.parse(kern);
  } catch {
    throw new AnbieterFehler("upstream_fehler");
  }
  const text = ergebnis.choices?.[0]?.message?.content;
  if (ergebnis.error || typeof text !== "string") throw new AnbieterFehler("upstream_fehler");
  melde(text);
}

type Lauf = {
  /** Liefert den vollständigen, geprüften Antworttext; `melde` bekommt Textstücke bzw. den Ersatz. */
  lies(melde: (ereignis: "delta" | "ersetzen", text: string) => void): Promise<string>;
  abbrechen(): void;
};

/** Ein einziger Aufruf an den Anbieter – kein Wiederholen, kein anderes Modell. */
async function rufeAnbieter(
  basis: string,
  schluessel: string,
  nachrichten: Nachricht[],
  strom: boolean,
  erlaubteBetraege: ReadonlySet<string>,
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
  const aufraeumen = () => {
    clearTimeout(gesamt);
    clearTimeout(stille);
  };
  const fehler = () => new AnbieterFehler(grund ?? "upstream_fehler");

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
      redirect: "error",
      signal: steuerung.signal,
    });
  } catch {
    aufraeumen();
    throw fehler();
  }
  if (!antwort.ok) {
    aufraeumen();
    steuerung.abort();
    throw fehler();
  }
  leerlauf();

  return {
    abbrechen() {
      aufraeumen();
      steuerung.abort();
    },
    async lies(melde) {
      // Rohtext des Modells; sichtbar wird nur, was die Leitplanken satzweise freigeben.
      let roh = "";
      let ersetzt = false;
      const leitplanke = createOutputGuard({ allowedAmounts: erlaubteBetraege });
      try {
        await leseAnbieter(
          antwort,
          (stueck) => {
            if (ersetzt || roh.length >= MAX_ANTWORT_ZEICHEN) return;
            const neu = stueck.slice(0, MAX_ANTWORT_ZEICHEN - roh.length);
            roh += neu;
            if (enthaeltRegelwerk(roh)) {
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
        aufraeumen();
      }
      if (ersetzt) return CHAT_ERSATZANTWORT;
      const rest = leitplanke.finish();
      if (rest) melde("delta", rest);
      const fertig = leitplanke.text.trim();
      if (!fertig) throw new AnbieterFehler("upstream_fehler");
      return fertig;
    },
  };
}

function ereignis(name: string, daten: Record<string, unknown>): Uint8Array {
  return new TextEncoder().encode(`event: ${name}\ndata: ${JSON.stringify(daten)}\n\n`);
}

function abgeschaltet(b: ChatBindings): boolean {
  return ["aus", "0", "false", "off", "nein"].includes((b.CHAT_AKTIV ?? "").trim().toLowerCase());
}

export async function handleChat(request: Request, argument?: ChatBindings): Promise<Response> {
  // GET: Zustand für die Oberfläche (kein Modellaufruf, keine Speicherung, keine Besucherdaten).
  if (request.method === "GET" || request.method === "HEAD") {
    const b = chatBindings(argument);
    const bereit = Boolean(b.DB && b.NINEROUTER_API_KEY && basisUrl(b.CHAT_BASE_URL));
    const aktiv = bereit && !abgeschaltet(b);
    return json(
      { ok: true, aktiv, grund: aktiv ? null : bereit ? "abgeschaltet" : "nicht_eingerichtet" },
      200,
    );
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
  if (abgeschaltet(b)) return json({ ok: false, fehler: "chat_abgeschaltet" }, 503);
  const basis = basisUrl(b.CHAT_BASE_URL);
  const schluessel = b.NINEROUTER_API_KEY;
  // Fail-closed und vor jeder Speicherung: ohne Datenbank, Schlüssel oder gültige Route kein Chat.
  if (!b.DB || !schluessel || !basis)
    return json({ ok: false, fehler: "chat_not_configured" }, 503);
  const db = b.DB;

  let koerper: unknown;
  try {
    koerper = JSON.parse(rumpf);
  } catch {
    return json({ ok: false, fehler: "ungueltiges_json" }, 400);
  }
  // Nur `message` und `session_id` zählen; `model`, `messages`, `system` o. Ä. werden ignoriert.
  const daten = (koerper && typeof koerper === "object" ? koerper : {}) as {
    message?: unknown;
    session_id?: unknown;
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
  const hash = await ipHash(request);

  let verlauf: GuidanceTurn[];
  try {
    const grenze = await pruefeGrenzen(
      db,
      hash,
      sessionId,
      ganzzahl(b.CHAT_TAGESLIMIT, CHAT_LIMITS.gesamtProTag, 100_000),
    );
    if (grenze) {
      return json({ ok: false, fehler: grenze.fehler, warten: grenze.warten }, 429, {
        "retry-after": String(grenze.warten),
      });
    }
    verlauf = await ladeVerlauf(db, sessionId);
    await speichere(db, sessionId, "user", nachricht, hash);
    const tage = ganzzahl(b.CHAT_AUFBEWAHRUNG_TAGE, CHAT_AUFBEWAHRUNG_STANDARD_TAGE, 3650);
    // Ein Fehler beim Aufräumen darf die Antwort nicht verhindern.
    await raeumeChatAuf(db, tage).catch(() => {});
  } catch {
    return json({ ok: false, fehler: "chat_not_configured" }, 503);
  }

  const nachrichten: Nachricht[] = [
    { role: "system", content: CHAT_SYSTEMPROMPT },
    ...verlauf,
    { role: "user", content: nachricht },
  ];
  const alsStrom = (request.headers.get("accept") ?? "").includes("text/event-stream");

  let lauf: Lauf;
  try {
    lauf = await rufeAnbieter(
      basis,
      schluessel,
      nachrichten,
      alsStrom,
      visitorAmounts(verlauf, nachricht),
    );
  } catch (ursache) {
    const art = ursache instanceof AnbieterFehler ? ursache.art : "upstream_fehler";
    return json(
      { ok: false, fehler: art, session_id: sessionId },
      art === "upstream_zeit" ? 504 : 502,
    );
  }

  const ablegen = async (text: string) => {
    try {
      await speichere(db, sessionId, "assistant", text, hash);
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
      const art = ursache instanceof AnbieterFehler ? ursache.art : "upstream_fehler";
      return json(
        { ok: false, fehler: art, session_id: sessionId },
        art === "upstream_zeit" ? 504 : 502,
      );
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
