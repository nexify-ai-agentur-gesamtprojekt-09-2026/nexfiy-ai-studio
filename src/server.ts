import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

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

// 2026-11-19 19:45 (Europe/Berlin): Dauerhafte Weiterleitungen für kurze Adressen.
// Warum: /preise ist laut Kanalvorgabe der Einstieg für Angebotsanfragen (SOUL §0c), die Seite
//   selbst heißt /preise-ablauf — /preise lief deshalb ins Leere (404). Ein 301 hält gesetzte
//   Links und den Suchindex zusammen, ohne eine zweite Preisseite zu pflegen.
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/preise": "/preise-ablauf",
  "/preise/": "/preise-ablauf",
  // 2026-11-21 01:40 (Europe/Berlin): www.nexifyai.cloud/login leitet auf /login um; die Seite
  // heisst hier /anmelden. Ohne diese Zeile endete der Kanal-Link (SOUL §0c) in einem 404.
  "/login": "/anmelden",
  "/login/": "/anmelden",
};

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const target = PERMANENT_REDIRECTS[url.pathname];
      if (target)
        return Response.redirect(new URL(`${target}${url.search}`, url.origin).toString(), 301);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
