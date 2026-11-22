import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleAnfrage, type AnfrageBindings } from "@/lib/anfrage-api";

type Aufruf = { sql: string; args: unknown[] };

/** Leere Datenbank: kein früherer Eintrag, jede Schreiboperation wird mitgeschrieben. */
function fakeDb(aufrufe: Aufruf[]) {
  return {
    prepare(sql: string) {
      let args: unknown[] = [];
      const stmt = {
        bind(...werte: unknown[]) {
          args = werte;
          return stmt;
        },
        async first<T>(): Promise<T | null> {
          return null;
        },
        async run() {
          aufrufe.push({ sql, args });
          return { success: true };
        },
      };
      return stmt;
    },
  };
}

const gueltig = {
  name: "Erika Muster",
  email: "erika@firma.de",
  company: "Muster GmbH",
  message: "Wir möchten unser Vorhaben mit Ihnen besprechen.",
  consent: true,
};

function anfrage(rumpf: unknown): Request {
  return new Request("https://www.nexifyai.de/api/anfrage", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "idempotency-key": "test-key-0001",
    },
    body: JSON.stringify(rumpf),
  });
}

function bindings(aufrufe: Aufruf[]): AnfrageBindings {
  return {
    DB: fakeDb(aufrufe),
    RESEND_API_KEY: "test-key",
    SENDER_EMAIL: "absender@example.test",
    ANFRAGE_TO: "eingang@example.test",
  };
}

let mails: { subject: string; text: string }[] = [];

beforeEach(() => {
  mails = [];
  // jsdom liefert kein WebCrypto.subtle; Nummer und Schlüssel brauchen es.
  vi.stubGlobal("crypto", {
    getRandomValues: (feld: Uint8Array) => feld.fill(0xab),
    subtle: { digest: async () => new Uint8Array(32).buffer },
  });
  // Keine echte Zustellung: der Versandaufruf wird abgefangen und mitgeschrieben.
  vi.stubGlobal("fetch", async (_ziel: unknown, init?: RequestInit) => {
    mails.push(JSON.parse(String(init?.body)) as { subject: string; text: string });
    return new Response(JSON.stringify({ id: "mail-1" }), { status: 200 });
  });
});

afterEach(() => vi.unstubAllGlobals());

describe("handleAnfrage", () => {
  it("nimmt die Kontaktanfrage an, speichert sie und benachrichtigt", async () => {
    const aufrufe: Aufruf[] = [];
    const antwort = await handleAnfrage(
      anfrage({ ...gueltig, kind: "contact" }),
      bindings(aufrufe),
    );
    expect(antwort.status).toBe(200);
    expect(await antwort.json()).toMatchObject({ ok: true, status: "eingegangen", doppelt: false });
    const eintrag = aufrufe.find((aufruf) => aufruf.sql.includes("INSERT INTO anfragen"));
    expect(eintrag?.args[2]).toBe("contact");
    expect(eintrag?.args[3]).toBe("test-key-0001");
    expect(mails).toHaveLength(1);
    expect(mails[0]?.subject).toContain("Projektanfrage von Erika Muster (Muster GmbH)");
  });

  it("behandelt einen alten Client mit kind=partner als normale Kontaktanfrage", async () => {
    const aufrufe: Aufruf[] = [];
    const antwort = await handleAnfrage(
      anfrage({ ...gueltig, company: "", kind: "partner" }),
      bindings(aufrufe),
    );
    // Ohne Unternehmensangabe gültig: die frühere Pflicht der Partneranfrage gilt nicht mehr.
    expect(antwort.status).toBe(200);
    const eintrag = aufrufe.find((aufruf) => aufruf.sql.includes("INSERT INTO anfragen"));
    expect(eintrag?.args[2]).toBe("contact");
    expect(mails).toHaveLength(1);
    const versandt = `${mails[0]?.subject}\n${mails[0]?.text}`;
    expect(versandt).toContain("Projektanfrage");
    expect(versandt).not.toMatch(/teileklar|partner|werkstatt/i);
  });

  it("meldet fehlende Pflichtfelder weiterhin mit 422", async () => {
    const antwort = await handleAnfrage(anfrage({ name: "Erika Muster" }), bindings([]));
    expect(antwort.status).toBe(422);
  });

  it("ist ohne Speicherbindung fail-closed", async () => {
    const antwort = await handleAnfrage(anfrage(gueltig), {});
    expect(antwort.status).toBe(503);
    // Keine Technik an Besucher: kein „Speicher“, kein „Eingang“, kein Statuscode im Text.
    const { fehler } = (await antwort.json()) as { fehler: string };
    expect(fehler).toBe("Die Anfrage konnte gerade nicht angenommen werden.");
    expect(fehler).not.toMatch(/speicher|verbunden|eingang|503/i);
  });

  it("speichert und versendet nichts, wenn das Köderfeld gefüllt ist", async () => {
    const aufrufe: Aufruf[] = [];
    const antwort = await handleAnfrage(
      anfrage({ ...gueltig, website: "https://spam.example" }),
      bindings(aufrufe),
    );
    expect(antwort.status).toBe(422);
    expect(aufrufe).toHaveLength(0);
    expect(mails).toHaveLength(0);
    // Ein leeres Köderfeld (so sendet es das echte Formular) ändert nichts am Erfolg.
    const normal = await handleAnfrage(anfrage({ ...gueltig, website: "" }), bindings(aufrufe));
    expect(normal.status).toBe(200);
  });

  it("verspricht auf der Erfolgsseite ohne JavaScript keine Kopie per E-Mail", async () => {
    const formular = new Request("https://www.nexifyai.de/api/anfrage", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ...gueltig, consent: "on" }).toString(),
    });
    const antwort = await handleAnfrage(formular, bindings([]));
    expect(antwort.status).toBe(200);
    const html = await antwort.text();
    expect(html).toContain("Wir melden uns persönlich unter der angegebenen E-Mail-Adresse.");
    expect(html).not.toMatch(/Kopie/);
  });
});
