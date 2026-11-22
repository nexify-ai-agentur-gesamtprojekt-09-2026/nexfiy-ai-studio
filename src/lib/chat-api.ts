/**
 * POST /api/chat — Gegenstelle fuer den KI-Chat der oeffentlichen Website (B-159).
 *
 * Warum vor dem Framework (in `src/server.ts`): der SSR-Wrapper reicht die Bindings nicht an
 * Framework-Routen durch; der Worker-Entry bekommt sie als zweites Argument.
 *
 * Vertrag:
 *   Anfrage  { message: string (2..1500), session_id?: string }
 *   Antwort  200 { ok: true, antwort, session_id, hinweis }
 *            400 { ok: false, fehler, felder? }
 *            429 { ok: false, fehler: "zu_viele_anfragen" }
 *            503 { ok: false, fehler: "chat_not_configured" }   (fail-closed, ohne DB/Modellroute)
 *            502 { ok: false, fehler: "upstream_fehler" }
 *
 * Datenschutz: keine Roh-IP, nur SHA-256(IP|Tenant); Inhalte dienen der Beantwortung und der
 * Aufbewahrungsregel. KI-Kennzeichnung nach Art. 50 KI-VO ist Teil jeder Antwort.
 */

const TENANT = "nexifyai-platform";
const MAX_ZEICHEN = 1500;
const MIN_ZEICHEN = 2;
const MAX_PRO_MINUTE = 8;
const MODELL_STANDARD = "nexifyai-cheap-first";
const BASIS_STANDARD = "https://ai-router.nexifyai.cloud";
const SYSTEM =
  "Du bist der KI-Assistent von NeXify AI (Chat it. Automate it.). Antworte auf Deutsch, knapp und " +
  "sachlich. Erfinde keine Fakten, keine Preise, keine Termine und keine Zusagen. Bei Unsicherheit " +
  "verweise auf das Kontaktformular unter /kontakt oder mail@nexifyai.cloud. Keine Rechtsberatung.";

type D1Stmt = {
  bind(...values: unknown[]): D1Stmt;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
  all<T>(): Promise<{ results?: T[] }>;
};

export interface ChatBindings {
  DB?: { prepare(sql: string): D1Stmt };
  NINEROUTER_API_KEY?: string;
  CHAT_BASE_URL?: string;
  CHAT_MODEL?: string;
}

export function chatBindings(argument?: ChatBindings): ChatBindings {
  if (argument && argument.DB) return argument;
  const ausGlobal = (globalThis as { __env__?: ChatBindings }).__env__;
  return ausGlobal ?? argument ?? {};
}

function json(inhalt: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(inhalt), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

async function ipHash(request: Request): Promise<string> {
  const ip = request.headers.get("cf-connecting-ip") ?? "0.0.0.0";
  const daten = new TextEncoder().encode(`${ip}|${TENANT}`);
  const digest = await crypto.subtle.digest("SHA-256", daten);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sitzungswert(roh: unknown): string {
  if (typeof roh === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(roh)) return roh;
  return crypto.randomUUID();
}

export async function handleChat(request: Request, argument?: ChatBindings): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, fehler: "methode_nicht_erlaubt" }, 405);

  const b = chatBindings(argument);
  if (!b.DB) return json({ ok: false, fehler: "chat_not_configured" }, 503);

  let koerper: unknown;
  try {
    koerper = await request.json();
  } catch {
    return json({ ok: false, fehler: "ungueltiges_json" }, 400);
  }
  const daten = (koerper ?? {}) as { message?: unknown; session_id?: unknown };
  const nachricht = typeof daten.message === "string" ? daten.message.trim() : "";
  if (nachricht.length < MIN_ZEICHEN) {
    return json(
      { ok: false, fehler: "feld_fehlt", felder: { message: "Bitte eine Nachricht eingeben." } },
      400,
    );
  }
  if (nachricht.length > MAX_ZEICHEN) {
    return json(
      { ok: false, fehler: "zu_lang", felder: { message: `Maximal ${MAX_ZEICHEN} Zeichen.` } },
      400,
    );
  }
  const sessionId = sitzungswert(daten.session_id);
  const hash = await ipHash(request);
  const jetzt = new Date().toISOString();

  try {
    const zaehler = await b.DB.prepare(
      "SELECT COUNT(*) AS n FROM chat_nachrichten WHERE ip_hash = ? AND rolle = 'user' AND created_at > ?",
    )
      .bind(hash, new Date(Date.now() - 60_000).toISOString())
      .first<{ n: number }>();
    if ((zaehler?.n ?? 0) >= MAX_PRO_MINUTE) {
      return json({ ok: false, fehler: "zu_viele_anfragen" }, 429);
    }
    await b.DB.prepare(
      "INSERT INTO chat_nachrichten (id, tenant, session_id, rolle, inhalt, ip_hash, created_at) VALUES (?, ?, ?, 'user', ?, ?, ?)",
    )
      .bind(crypto.randomUUID(), TENANT, sessionId, nachricht, hash, jetzt)
      .run();
  } catch {
    return json({ ok: false, fehler: "chat_not_configured" }, 503);
  }

  const schluessel = b.NINEROUTER_API_KEY;
  if (!schluessel) return json({ ok: false, fehler: "chat_not_configured" }, 503);

  const basis = (b.CHAT_BASE_URL ?? BASIS_STANDARD).replace(/\/+$/, "");
  const modell = b.CHAT_MODEL ?? MODELL_STANDARD;
  let antwortText = "";
  try {
    const antwort = await fetch(`${basis}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${schluessel}` },
      body: JSON.stringify({
        model: modell,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: nachricht },
        ],
        max_tokens: 400,
        temperature: 0.3,
        stream: false,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!antwort.ok) return json({ ok: false, fehler: "upstream_fehler" }, 502);
    // Der Router haengt an den JSON-Rumpf ein SSE-Ende (`data: [DONE]`) an; ein direktes
    // antwort.json() scheitert daran. Deshalb Text lesen und den JSON-Kern bis zum Marker parsen.
    const roh = await antwort.text();
    const marker = roh.indexOf("\ndata:");
    const kern = (marker >= 0 ? roh.slice(0, marker) : roh).trim();
    let ergebnis: { choices?: Array<{ message?: { content?: string } }> } = {};
    try {
      ergebnis = JSON.parse(kern);
    } catch {
      return json({ ok: false, fehler: "upstream_fehler" }, 502);
    }
    antwortText = ergebnis.choices?.[0]?.message?.content?.trim() ?? "";
  } catch {
    return json({ ok: false, fehler: "upstream_fehler" }, 502);
  }
  if (!antwortText) return json({ ok: false, fehler: "upstream_fehler" }, 502);

  try {
    await b.DB.prepare(
      "INSERT INTO chat_nachrichten (id, tenant, session_id, rolle, inhalt, ip_hash, created_at) VALUES (?, ?, ?, 'assistant', ?, ?, ?)",
    )
      .bind(
        crypto.randomUUID(),
        TENANT,
        sessionId,
        antwortText.slice(0, 4000),
        hash,
        new Date().toISOString(),
      )
      .run();
  } catch {
    // Die Antwort ist bereits erzeugt; die Speicherung ist fuer den Betrieb nicht kritisch,
    // wird aber nicht stillschweigend als Erfolg gemeldet.
    return json(
      {
        ok: true,
        antwort: antwortText,
        session_id: sessionId,
        hinweis: "KI-generierte Antwort",
        speicherung: "fehlgeschlagen",
      },
      200,
    );
  }

  return json(
    {
      ok: true,
      antwort: antwortText,
      session_id: sessionId,
      hinweis:
        "KI-generierte Antwort (Art. 50 KI-VO). Keine Rechtsberatung, keine Preis- oder Terminzusage.",
    },
    200,
  );
}
