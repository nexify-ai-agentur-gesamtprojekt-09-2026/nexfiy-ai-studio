import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { handleAnfrage, type AnfrageBindings } from "./lib/anfrage-api";
import { handleChat, type ChatBindings } from "./lib/chat-api";
import { renderErrorPage } from "./lib/error-page";
import { PERMANENT_REDIRECTS, withNoindexOnNotFound } from "./lib/server-routing";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
// 2026-11-22 03:35 (Europe/Berlin): CSP fehlte auf www.nexifyai.de — die Nachtwache
// (nexifyai-live-acceptance) meldete deshalb jede Nacht "LUECKE csp=nein" und der Dienst
// endete mit Exit 1. Gemessen: HTML laedt ausschliesslich first-party Assets; Hydration und
// JSON-LD kommen als Inline-Skript, daher 'unsafe-inline' fuer script/style. Alles andere
// bleibt auf 'self' — object-src/frame-ancestors dicht.
const SECURITY_HEADERS: Record<string, string> = {
  "content-security-policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS))
    if (!headers.has(name)) headers.set(name, value);
  // 204/304/101 duerfen keinen Body tragen, sonst wirft der Konstruktor.
  const nullBody = [101, 204, 205, 304].includes(response.status);
  return new Response(nullBody ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      // 2026-11-22: Anfrage-Eingang vor dem Framework beantworten (A-36). Der Entry bekommt die
      // Bindings vom Worker-Runtime; Framework-Routen sehen sie nicht.
      if (url.pathname === "/api/anfrage") {
        return withSecurityHeaders(await handleAnfrage(request, env as AnfrageBindings));
      }
      // 2026-11-22 06:38 (Europe/Berlin): Gegenstelle fuer den KI-Chat (B-159). Vor dem Framework,
      // die Bindings (DB, Secret) nicht ankommen; Vertrag und Fehlercodes in src/lib/chat-api.ts.
      if (url.pathname === "/api/chat") {
        return withSecurityHeaders(await handleChat(request, env as ChatBindings));
      }
      const target = PERMANENT_REDIRECTS[url.pathname];
      if (target)
        return withSecurityHeaders(
          Response.redirect(new URL(`${target}${url.search}`, url.origin).toString(), 301),
        );
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(
        withNoindexOnNotFound(await normalizeCatastrophicSsrResponse(response)),
      );
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
