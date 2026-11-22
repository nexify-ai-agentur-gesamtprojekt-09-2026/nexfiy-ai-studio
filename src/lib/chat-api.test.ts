import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleChat, type ChatBindings } from "@/lib/chat-api";

type Aufruf = { sql: string; args: unknown[] };

function fakeDb(aufrufe: Aufruf[]) {
  return {
    prepare(sql: string) {
      let args: unknown[] = [];
      const stmt = {
        bind(...werte: unknown[]) {
          args = werte;
          return stmt;
        },
        async first() {
          return { n: 0 };
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

function anfrage(rumpf: unknown, methode = "POST"): Request {
  return new Request("https://www.nexifyai.de/api/chat", {
    method: methode,
    headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.7" },
    body: methode === "GET" ? undefined : JSON.stringify(rumpf),
  });
}

const bindings = (db?: ReturnType<typeof fakeDb>): ChatBindings => ({
  DB: db,
  NINEROUTER_API_KEY: "test-key",
});

afterEach(() => vi.unstubAllGlobals());

beforeEach(() => {
  // jsdom liefert kein WebCrypto.subtle; der Handler hasht die IP damit.
  vi.stubGlobal("crypto", {
    randomUUID: () => "11111111-1111-4111-8111-111111111111",
    subtle: { digest: async () => new Uint8Array(32).buffer },
  });
});

describe("handleChat", () => {
  it("weist andere Methoden ab", async () => {
    const res = await handleChat(anfrage({}, "GET"), bindings(fakeDb([])));
    expect(res.status).toBe(405);
  });

  it("ist ohne Datenbank fail-closed", async () => {
    const res = await handleChat(anfrage({ message: "Hallo" }), { NINEROUTER_API_KEY: "k" });
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ fehler: "chat_not_configured" });
  });

  it("verlangt eine Nachricht", async () => {
    const res = await handleChat(anfrage({}), bindings(fakeDb([])));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ fehler: "feld_fehlt" });
  });

  it("begrenzt die Laenge", async () => {
    const res = await handleChat(anfrage({ message: "x".repeat(1600) }), bindings(fakeDb([])));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ fehler: "zu_lang" });
  });

  it("speichert und antwortet mit KI-Kennzeichnung", async () => {
    const aufrufe: Aufruf[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ choices: [{ message: { content: "Antwort" } }] }), {
            status: 200,
          }),
      ),
    );
    const res = await handleChat(
      anfrage({ message: "Was bietet NeXify AI?" }),
      bindings(fakeDb(aufrufe)),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, antwort: "Antwort" });
    expect(aufrufe).toHaveLength(2);
    expect(aufrufe[0].sql).toContain("'user'");
    expect(aufrufe[1].sql).toContain("'assistant'");
    const [url, init] = (
      globalThis.fetch as unknown as { mock: { calls: [string, RequestInit][] } }
    ).mock.calls[0];
    expect(url).toContain("/v1/chat/completions");
    expect(String(init.body)).toContain("Was bietet NeXify AI?");
  });

  it("meldet einen Modellfehler als 502", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("kaputt", { status: 500 })),
    );
    const res = await handleChat(anfrage({ message: "Hallo" }), bindings(fakeDb([])));
    expect(res.status).toBe(502);
    expect(await res.json()).toMatchObject({ fehler: "upstream_fehler" });
  });
});
