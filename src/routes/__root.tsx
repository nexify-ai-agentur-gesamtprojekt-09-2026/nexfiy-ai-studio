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
import { displayPath, siteAreaFor, suggestionsFor } from "@/lib/system-pages";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PwaInstallProvider } from "@/lib/use-pwa-install";

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
  const area = siteAreaFor(pathname);
  useDocumentTitle("Seite nicht gefunden · NeXify AI");
  return (
    <>
      <meta name="robots" content="noindex" />
      <StatusPage
        code="404"
        kicker={area === "teileklar" ? "TEILEKLAR.shop · Fehler 404" : "NeXify AI · Fehler 404"}
        title="Diese Seite gibt es hier nicht."
        description={
          <p>
            Vielleicht wurde die Adresse falsch eingegeben, oder die Seite ist umgezogen. Von hier aus geht es direkt
            weiter – oder Sie schreiben uns, was Sie gesucht haben.
          </p>
        }
        detail={
          <p>
            Angefragte Adresse:{" "}
            <code className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-label text-[13px] text-foreground break-all">
              {displayPath(pathname)}
            </code>
          </p>
        }
        actions={
          <>
            <Button asChild variant="brand" size="xl">
              <Link to={area === "teileklar" ? "/teileklar" : "/"}>
                {area === "teileklar" ? "Zum Schaufenster" : "Zur Startseite"}
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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  useDocumentTitle("Kurze Störung · NeXify AI");

  return (
    <StatusPage
      tone="alert"
      kicker="NeXify AI · Kurze Störung"
      title="Diese Seite hat gerade nicht geladen."
      description={
        <p>
          Das liegt an uns, nicht an Ihnen. Meist hilft ein zweiter Versuch. Klappt es dann noch nicht, erreichen Sie uns
          jederzeit per E-Mail.
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
          <summary className="cursor-pointer font-label text-xs uppercase tracking-[0.18em]">Technische Details (nur Vorschau)</summary>
          <pre className="mt-3 whitespace-pre-wrap break-words font-label text-[12px] leading-relaxed text-foreground">{error.message}</pre>
        </details>
      ) : null}
    </StatusPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
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
      { name: "description", content: "NeXify AI – Websites, Apps, Shops und KI für Ihr Unternehmen." },
      { name: "author", content: "NeXify AI" },
      { property: "og:title", content: "NeXify AI" },
      { property: "og:description", content: "NeXify AI – Websites, Apps, Shops und KI für Ihr Unternehmen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      { rel: "preload", href: "/site-assets/0848630eef4b593d.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/site-assets/f7f6e92afae6f3df.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
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
  const importedDocument = useImportedMatches({ select: matches => matches.at(-1)?.staticData.importedDocument });
  return (
    <html lang="de" {...importedDocument?.html}>
      <head>
        <style href="site-import-inline" precedence="imported-inline">{"@layer imported-inline;"}</style>
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
      <PwaInstallProvider>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      </PwaInstallProvider>
    </QueryClientProvider>
  );
}
