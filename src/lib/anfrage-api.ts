/**
 * POST /api/anfrage — serverseitiger Eingang der Anfrageformulare (A-36).
 *
 * Warum vor dem Framework (in `src/server.ts`): der Nitro-Wrapper reicht die Bindings nicht an
 * Framework-Routen durch, der Worker-Entry bekommt sie aber als zweites Argument. Deshalb nimmt
 * dieser Handler sie explizit entgegen — kein `cloudflare:workers`-Import, der den Vite-Build bricht.
 * Ablauf: pruefen -> speichern -> benachrichtigen.
 * Fail-closed: ohne Speicherbindung 503 statt scheinbar angenommener Anfrage.
 */
import {
  ANFRAGE_FENSTER_SEKUNDEN,
  ANFRAGE_MAX_JE_FENSTER,
  anfrageArt,
  anfrageDedupKey,
  anfrageNummer,
  anfrageSchluesselAusHeader,
  liesAnfrageBody,
  pruefeAnfrage,
} from "@/lib/anfrage";
import type { InquiryKind, InquiryValues } from "@/lib/inquiry";

const TENANT = "nexifyai-platform";

type D1Stmt = {
  bind(...values: unknown[]): D1Stmt;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
};

export interface AnfrageBindings {
  DB?: { prepare(sql: string): D1Stmt };
  RESEND_API_KEY?: string;
  SENDER_EMAIL?: string;
  ANFRAGE_TO?: string;
}

/**
 * Bindings beschaffen. Der Nitro-Cloudflare-Handler ruft den SSR-Dienst nur mit `request` auf —
 * das `env`-Argument ist dort leer. Er legt die Bindings aber als `globalThis.__env__` ab
 * (nachgemessen im generierten `.output/server/index.mjs`), darum ist das der zweite Weg.
 */
export function anfrageBindings(argument?: AnfrageBindings): AnfrageBindings {
  if (argument && argument.DB) return argument;
  const ausGlobal = (globalThis as { __env__?: AnfrageBindings }).__env__;
  return ausGlobal ?? argument ?? {};
}

interface Antwort {
  ok?: boolean;
  nummer?: string;
  status?: string;
  doppelt?: boolean;
  fehler?: string;
  felder?: Record<string, string>;
}

function json(inhalt: Antwort, status: number, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(inhalt), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });
}

function seite(titel: string, rumpf: string, status: number): Response {
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${titel} — NeXify AI</title>
<meta name="robots" content="noindex">
<style>:root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;
background:#101210;color:#f2f4ef;font:16px/1.6 system-ui,sans-serif;padding:24px}
main{max-width:34rem}h1{font-size:1.5rem;line-height:1.25;margin:0 0 .75rem}
a{color:#c0ee38}code{color:#c0ee38;font-size:1.05em}p{margin:.5rem 0}</style></head>
<body><main><h1>${titel}</h1>${rumpf}<p><a href="/kontakt">Zurück zur Kontaktseite</a></p></main></body></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

function fehlerAntwort(
  alsJson: boolean,
  inhalt: Antwort,
  status: number,
  extra: Record<string, string> = {},
) {
  if (alsJson) return json(inhalt, status, extra);
  const felder = inhalt.felder
    ? `<ul>${Object.values(inhalt.felder)
        .map((meldung) => `<li>${meldung}</li>`)
        .join("")}</ul>`
    : "";
  return seite(
    "Anfrage nicht gesendet",
    `<p>${inhalt.fehler ?? "Die Anfrage konnte nicht angenommen werden."}</p>${felder}
     <p>Alternativ direkt per E-Mail an <a href="mailto:mail@nexifyai.cloud">mail@nexifyai.cloud</a>.</p>`,
    status,
  );
}

function erfolgAntwort(alsJson: boolean, nummer: string, doppelt: boolean) {
  if (alsJson) return json({ ok: true, nummer, status: "eingegangen", doppelt }, 200);
  return seite(
    "Anfrage eingegangen",
    `<p>Ihre Anfrage liegt bei uns unter der Nummer <code>${nummer}</code>.</p>
     <p>Wir melden uns persönlich. Eine Kopie geht zusätzlich per E-Mail ein.</p>`,
    200,
  );
}

function mailText(art: InquiryKind, werte: InquiryValues, nummer: string, zeit: string): string {
  const kopf =
    art === "partner" ? "TEILEKLAR-Partneranfrage" : "Projektanfrage über das Kontaktformular";
  return [
    `${kopf} ${nummer}`,
    `Eingang: ${zeit}`,
    "",
    `Name: ${werte.name}`,
    `E-Mail: ${werte.email}`,
    `Unternehmen: ${werte.company || "—"}`,
    "",
    "Nachricht:",
    werte.message,
    "",
    "— automatisch erzeugt vom Anfrage-Eingang nexfiy-ai-studio (A-36)",
  ].join("\n");
}

async function benachrichtige(
  art: InquiryKind,
  werte: InquiryValues,
  nummer: string,
  zeit: string,
  bindings: AnfrageBindings,
): Promise<{ status: string; id: string | null }> {
  const schluessel = bindings.RESEND_API_KEY;
  const absender = bindings.SENDER_EMAIL;
  const empfaenger = bindings.ANFRAGE_TO;
  if (!schluessel || !absender || !empfaenger) return { status: "nicht_konfiguriert", id: null };

  const betreff =
    art === "partner"
      ? `TEILEKLAR Partneranfrage: ${werte.company || werte.name}`
      : `Projektanfrage von ${werte.name}${werte.company ? ` (${werte.company})` : ""}`;

  try {
    const antwort = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${schluessel}`,
        "content-type": "application/json",
        "user-agent": "NeXify-Anfrage/1.0",
      },
      body: JSON.stringify({
        from: `NeXify Anfrage <${absender}>`,
        to: [empfaenger],
        reply_to: werte.email,
        subject: `[${nummer}] ${betreff}`,
        text: mailText(art, werte, nummer, zeit),
      }),
    });
    if (!antwort.ok) return { status: `fehler_${antwort.status}`, id: null };
    const daten = (await antwort.json()) as { id?: string };
    return { status: "gesendet", id: daten.id ?? null };
  } catch {
    return { status: "netzfehler", id: null };
  }
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function handleAnfrage(
  request: Request,
  argument?: AnfrageBindings,
): Promise<Response> {
  const bindings = anfrageBindings(argument);
  const url = new URL(request.url);
  if (request.method !== "POST") {
    return new Response("Methode nicht erlaubt — Anfragen gehen per POST.", {
      status: 405,
      headers: { allow: "POST", "content-type": "text/plain; charset=utf-8" },
    });
  }

  const herkunft = request.headers.get("origin");
  if (herkunft && herkunft !== url.origin) {
    return fehlerAntwort(true, { fehler: "Fremde Herkunft." }, 403);
  }

  const typ = (request.headers.get("content-type") ?? "").toLowerCase();
  const alsJson =
    typ.includes("application/json") ||
    (request.headers.get("accept") ?? "").includes("application/json");

  const body = await liesAnfrageBody(request);
  if (!body.ok) {
    return body.grund === "zu_gross"
      ? fehlerAntwort(alsJson, { fehler: "Die Anfrage ist zu groß." }, 413)
      : fehlerAntwort(alsJson, { fehler: "Die Anfrage war nicht lesbar." }, 400);
  }

  const art = anfrageArt(body.daten);
  const { werte, felder } = pruefeAnfrage(art, body.daten);
  if (Object.keys(felder).length > 0) {
    return fehlerAntwort(
      alsJson,
      { fehler: "Bitte prüfen Sie die markierten Felder.", felder },
      422,
    );
  }

  const db = bindings.DB;
  if (!db) {
    return fehlerAntwort(
      alsJson,
      { fehler: "Der Anfrage-Eingang ist nicht mit dem Speicher verbunden." },
      503,
    );
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const ipHash = ip ? (await sha256Hex(`${ip}|${TENANT}`)).slice(0, 24) : null;

  if (ipHash) {
    const seit = new Date(Date.now() - ANFRAGE_FENSTER_SEKUNDEN * 1000).toISOString();
    const zeile = await db
      .prepare("SELECT COUNT(*) AS anzahl FROM anfragen WHERE ip_hash = ? AND empfangen_am > ?")
      .bind(ipHash, seit)
      .first<{ anzahl: number }>();
    if ((zeile?.anzahl ?? 0) >= ANFRAGE_MAX_JE_FENSTER) {
      return fehlerAntwort(
        alsJson,
        { fehler: "Zu viele Anfragen in kurzer Zeit. Bitte später erneut versuchen." },
        429,
        { "retry-after": String(ANFRAGE_FENSTER_SEKUNDEN) },
      );
    }
  }

  const schluessel =
    anfrageSchluesselAusHeader(request.headers.get("idempotency-key")) ??
    (await anfrageDedupKey(art, werte));

  const bekannt = await db
    .prepare("SELECT nummer FROM anfragen WHERE dedup_key = ?")
    .bind(schluessel)
    .first<{ nummer: string }>();
  if (bekannt) return erfolgAntwort(alsJson, bekannt.nummer, true);

  const nummer = anfrageNummer();
  const zeit = new Date().toISOString();
  try {
    await db
      .prepare(
        `INSERT INTO anfragen (nummer, tenant, art, dedup_key, name, email, unternehmen, nachricht,
           ip_hash, herkunft, notification_status, empfangen_am)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        nummer,
        TENANT,
        art,
        schluessel,
        werte.name,
        werte.email,
        werte.company || null,
        werte.message,
        ipHash,
        url.origin,
        "ausstehend",
        zeit,
      )
      .run();
  } catch {
    // Zwei gleichzeitige Abgaben desselben Schluessels: der erste Datensatz gilt.
    const erneut = await db
      .prepare("SELECT nummer FROM anfragen WHERE dedup_key = ?")
      .bind(schluessel)
      .first<{ nummer: string }>();
    if (erneut) return erfolgAntwort(alsJson, erneut.nummer, true);
    return fehlerAntwort(alsJson, { fehler: "Die Anfrage konnte nicht gespeichert werden." }, 500);
  }

  const benachrichtigung = await benachrichtige(art, werte, nummer, zeit, bindings);
  await db
    .prepare("UPDATE anfragen SET notification_status = ?, notification_id = ? WHERE nummer = ?")
    .bind(benachrichtigung.status, benachrichtigung.id, nummer)
    .run();

  return erfolgAntwort(alsJson, nummer, false);
}
