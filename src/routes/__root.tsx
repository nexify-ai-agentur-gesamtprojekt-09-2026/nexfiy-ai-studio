import { useMatches as useImportedMatches } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useLocation,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { ArrowRight, RotateCcw } from "lucide-react";

import appCss from "../styles.css?url";
import { StatusPage } from "@/components/system/StatusPage";
import { Button } from "@/components/ui/button";
import { PwaRegistration } from "@/components/pwa/PwaRegistration";
import { siteJsonLd } from "@/lib/seo";
import { CHAT_SCHALTER_ATTRIBUT, chatSchalterAn } from "@/lib/chat-schalter";
import { displayPath, isRetiredPath, suggestionsFor } from "@/lib/system-pages";

function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

function NotFoundComponent() {
  const pathname = useLocation({ select: (location) => location.pathname });
  useDocumentTitle("Seite nicht gefunden · NeXify AI");
  return (
    <>
      <meta name="robots" content="noindex" />
      <StatusPage
        code="404"
        kicker="NeXify AI · Fehler 404"
        title="Diese Seite gibt es hier nicht."
        description={
          <p>
            Vielleicht wurde die Adresse falsch eingegeben, oder die Seite ist umgezogen. Von hier
            aus geht es direkt weiter – oder Sie schreiben uns, was Sie gesucht haben.
          </p>
        }
        detail={
          // Frühere Shop-Adressen werden nicht wiederholt: die Seite nennt sie nicht mehr.
          isRetiredPath(pathname) ? undefined : (
            <p>
              Angefragte Adresse:{" "}
              <code className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-label text-[13px] text-foreground break-all">
                {displayPath(pathname)}
              </code>
            </p>
          )
        }
        actions={
          <>
            <Button asChild variant="brand" size="xl">
              <Link to="/">
                Zur Startseite
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/kontakt">Uns schreiben</Link>
            </Button>
          </>
        }
        suggestions={suggestionsFor(pathname)}
      />
    </>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useDocumentTitle("Kurze Störung · NeXify AI");

  return (
    <StatusPage
      tone="alert"
      kicker="NeXify AI · Kurze Störung"
      title="Diese Seite hat gerade nicht geladen."
      description={
        <p>
          Das liegt an uns, nicht an Ihnen. Meist hilft ein zweiter Versuch. Klappt es dann noch
          nicht, erreichen Sie uns jederzeit per E-Mail.
        </p>
      }
      actions={
        <>
          <Button
            variant="brand"
            size="xl"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RotateCcw aria-hidden="true" />
            Erneut versuchen
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="/">Zur Startseite</a>
          </Button>
        </>
      }
    >
      {import.meta.env.DEV && error instanceof Error ? (
        <details className="mt-10 max-w-xl rounded-[14px] border border-border bg-secondary/60 p-4 text-sm text-muted-foreground">
          <summary className="cursor-pointer font-label text-xs uppercase tracking-[0.18em]">
            Technische Details (nur Vorschau)
          </summary>
          <pre className="mt-3 whitespace-pre-wrap break-words font-label text-[12px] leading-relaxed text-foreground">
            {error.message}
          </pre>
        </details>
      ) : null}
    </StatusPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // 2026-11-20 00:15 (Europe/Berlin): og:image/twitter:image bewusst HIER als Marken-Default.
    // Vorher fehlten sie auf allen 43 Seiten (Messung: 0 Vorkommen), Social-Previews blieben leer.
    // Eine Route darf sie in ihrem eigenen head() ueberschreiben.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1b1e1d" },
      { name: "color-scheme", content: "dark" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "NeXify" },
      { name: "format-detection", content: "telephone=no" },
      { title: "NeXify AI" },
      {
        name: "description",
        content: "NeXify AI – Websites, Apps, Shops und KI für Ihr Unternehmen.",
      },
      { name: "author", content: "NeXify AI" },
      { property: "og:title", content: "NeXify AI" },
      {
        property: "og:description",
        content: "NeXify AI – Websites, Apps, Shops und KI für Ihr Unternehmen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://www.nexifyai.de/og/nexify-ai.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NeXify AI – Websites, Apps, Shops und KI" },
      { property: "og:site_name", content: "NeXify AI" },
      { property: "og:locale", content: "de_DE" },
      { name: "twitter:image", content: "https://www.nexifyai.de/og/nexify-ai.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // 2026-11-22 (Europe/Berlin): /favicon.ico ist das Originalzeichen des NeXify-Auftritts
      // (16, 32 und 48 px), dieselbe Datei wie public/site-assets/6515657575db596f.ico.
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    importedDocument?: {
      html?: import("react").HTMLAttributes<HTMLHtmlElement> & Record<`data-${string}`, string>;
      body?: import("react").HTMLAttributes<HTMLBodyElement> & Record<`data-${string}`, string>;
    };
  }
}

function RootShell({ children }: { children: ReactNode }) {
  const importedDocument = useImportedMatches({
    select: (matches) => matches.at(-1)?.staticData.importedDocument,
  });
  return (
    <html
      lang="de"
      // Chat an oder aus, vom Server gerendert (src/lib/chat-schalter.ts); im Browser von hier gelesen.
      {...{ [CHAT_SCHALTER_ATTRIBUT]: chatSchalterAn() ? "an" : "aus" }}
      {...importedDocument?.html}
    >
      <head>
        <style href="site-import-inline" precedence="imported-inline">
          {"@layer imported-inline;"}
        </style>
        <script
          type="application/ld+json"
          // Organisation und Website, auf jeder Seite gleich. Angaben und Regeln stehen in
          // src/lib/seo.ts (siteJsonLd); Seite, Pfad und Leistung liefert jede Route selbst.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        <HeadContent />
      </head>
      <body {...importedDocument?.body}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* Installierbare Web-App: meldet nach dem Laden den Service Worker an (nur Produktion). */}
      <PwaRegistration />
    </QueryClientProvider>
  );
}
