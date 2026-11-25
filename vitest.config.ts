import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // Ohne URL hat jsdom keinen localStorage (opake Origin); die PWA-Tests lesen/schreiben ihn.
    environmentOptions: { jsdom: { url: "https://www.nexifyai.de/" } },
    // Der Host laeuft mit NODE_ENV=production; dann laedt React den Produktionsbuild ohne
    // React.act und jede Komponentensuite faellt mit "React.act is not a function".
    env: { NODE_ENV: "test" },
    // Drei Suiten booten den gebauten Worker; 5 s Standard reichen dafuer nicht.
    testTimeout: 20_000,
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Abdeckung nur für eigenen Quellcode (nicht .output/ oder Bibliotheken aus dem Build).
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.{test,spec}.{ts,tsx}", "src/test/**", "src/routeTree.gen.ts"],
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
