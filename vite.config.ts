// Build- und Dev-Konfiguration der NeXify-Agenturseite (TanStack Start, Auslieferung als
// Cloudflare Worker über tools/deploy-live.sh).
//
// Regeln, die hier gelten:
// - Kein ssr.external und kein resolve.external: der Worker löst zur Laufzeit keine Module auf,
//   der Build bräche.
// - Keine Kompression (compressPublicAssets, vite-plugin-compression): die Auslieferung
//   komprimiert bereits an der Kante, doppelt kodierte Antworten kämen unlesbar an.
// - Die Reihenfolge der Plugins ist Absicht: Tailwind und Pfadauflösung vor TanStack Start,
//   React zuletzt.
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Servercode darf nicht in das Browser-Bündel geraten.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Der Server-Einstieg ist src/server.ts (Adressregeln, Fehlerseite, Sicherheits-Header).
      server: { entry: "server" },
    }),
    // Nur im Build: erzeugt .output/ als Cloudflare-Worker samt wrangler.json.
    ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
    viteReact(),
  ],
  css: { transformer: "lightningcss" },
  // Kennung des Builds für den Service Worker: jeder Build bekommt eigene Cache-Namen, alte
  // Caches räumt der Worker beim Aktivieren ab (src/lib/pwa.ts).
  define: { __NEXIFY_BUILD_ID__: JSON.stringify(Date.now().toString(36)) },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  // 2026-11-19 20:46 (Europe/Berlin): Dev-Port fest auf 5173. `hermes verify` wartet auf 5173;
  // ein ausweichender Port meldete dauerhaft readiness=false (falsches Rot).
  server: { host: "::", port: 5173, strictPort: true },
}));
