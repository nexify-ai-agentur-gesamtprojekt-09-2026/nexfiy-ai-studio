import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { handleAnfrage, type AnfrageBindings } from "./lib/anfrage-api";
import { ermittleChatZustand, handleChat, type ChatBindings } from "./lib/chat-api";
import { setzeChatSchalter } from "./lib/chat-schalter";
import { renderErrorPage } from "./lib/error-page";
import { offlineResponse, serviceWorkerResponse, type PwaBindings } from "./lib/pwa";
import { OFFLINE_PATH, SW_PATH } from "./lib/pwa-config";
import { SEITEN } from "./lib/seo";
import {
  asRetiredResponse,
  retiredPathUrl,
  legacyWeiterleitungFuer,
  pfadNormalisierung,
  weiterleitungFuer,
  withNoindexOnNotFound,
} from "./lib/server-routing";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

/**
 * Alle ausgelieferten Seitenadressen in einer Schreibweise. Grundlage ist die Seitentabelle, damit
 * eine neue Seite automatisch mitgezählt wird und keine zweite Liste gepflegt werden muss.
 */
// Nur Seiten, die im Suchindex stehen. Die 16 Bundeslandseiten sind bewusst noindex und sollen
// unter abweichender Schreibweise 404 liefern, nicht 301.
const BEKANNTE_SEITEN = new Set<string>(
  SEITEN.filter((seite) => seite.index).map((seite) => seite.pfad.toLowerCase()),
);

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
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS))
    if (!headers.has(name)) headers.set(name, value);
  // Seiten tragen sonst gar keine Cache-Angabe; Browser und Zwischenspeicher raten dann. Mit
  // `no-cache` wird jede Seite vor dem Anzeigen neu geprüft – ein neuer Stand kommt sofort an.
  if (!headers.has("cache-control") && (headers.get("content-type") ?? "").includes("text/html"))
    headers.set("cache-control", "no-cache");
  // 204/304/101 duerfen keinen Body tragen, sonst wirft der Konstruktor.
  const nullBody = [101, 204, 205, 304].includes(response.status);
  return new Response(nullBody ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const LOKALE_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      // 2026-11-22 12:55 (Europe/Berlin): http://www.nexifyai.de lieferte 200 statt TLS-Weiterleitung.
      // Der Worker ist die letzte Instanz vor der Antwort; hier dauerhaft auf https umleiten.
      // Merge 22.11.2026: lokale Prüfgerüste (localhost, 127.0.0.1, ::1) bleiben auf http, sonst
      // liefe jede lokale Abnahme in eine Umleitung auf einen Host ohne TLS.
      if (url.protocol === "http:" && !LOKALE_HOSTS.has(url.hostname)) {
        url.protocol = "https:";
        return Response.redirect(url.toString(), 301);
      }
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
      // 2026-11-22 (Europe/Berlin): Installierbare Web-App. Service Worker und Offline-Seite
      // beantwortet der Worker selbst (Regeln, Rückbau-Schalter und Tests: src/lib/pwa.ts).
      if (url.pathname === SW_PATH)
        return withSecurityHeaders(serviceWorkerResponse(env as PwaBindings));
      if (url.pathname === OFFLINE_PATH) return withSecurityHeaders(offlineResponse());
      // Kurzadressen in jeder Schreibweise (/ANMELDEN, /Registrieren): src/lib/server-routing.ts.
      const weiter = weiterleitungFuer(url.pathname) ?? legacyWeiterleitungFuer(url.pathname);
      if (weiter)
        return withSecurityHeaders(
          Response.redirect(
            new URL(`${weiter.ziel}${url.search}`, url.origin).toString(),
            weiter.status,
          ),
        );
      // Alte Shop- und Studienadressen antworten 404 (Inhaberentscheidung 22.11.2026). Sie werden
      // weder normalisiert noch weitergeleitet — sonst verlöre die Sperre ihre Wirkung.
      const retired = retiredPathUrl(url);
      if (!retired && (request.method === "GET" || request.method === "HEAD")) {
        // Eine Schreibweise je Seite: /LEISTUNGEN und /leistungen/ führen dauerhaft auf /leistungen.
        // Nur lesende Abrufe — ein POST auf eine andere Schreibweise darf seinen Rumpf nicht verlieren.
        const normal = pfadNormalisierung(url.pathname, BEKANNTE_SEITEN);
        if (normal)
          return withSecurityHeaders(
            Response.redirect(
              new URL(`${normal.ziel}${url.search}`, url.origin).toString(),
              normal.status,
            ),
          );
      }
      const handler = await getServerEntry();
      // Chat-Schalter fürs Seiten-HTML (src/lib/chat-schalter.ts): vor dem Rendern ermittelt, damit
      // die Seite ohne Zusatzanfrage weiß, ob es einen Chat gibt. Im Zweifel aus.
      setzeChatSchalter(
        await ermittleChatZustand(env as ChatBindings).then(
          (zustand) => zustand.aktiv,
          () => false,
        ),
      );
      if (retired) {
        const response = await handler.fetch(
          new Request(retired, { method: "GET", headers: request.headers }),
          env,
          ctx,
        );
        return withSecurityHeaders(
          asRetiredResponse(await normalizeCatastrophicSsrResponse(response)),
        );
      }
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
