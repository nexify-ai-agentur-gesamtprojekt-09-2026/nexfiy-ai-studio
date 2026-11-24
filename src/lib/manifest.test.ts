// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { SEITEN, SITE_ORIGIN } from "./seo";

const REPO = path.resolve(__dirname, "../..");
const lies = (...teile: string[]) => readFileSync(path.join(REPO, ...teile), "utf8");
const INDEXIERBAR = SEITEN.filter((seite) => seite.index);

describe("Manifest der Web-App", () => {
  const manifest = JSON.parse(lies("public/manifest.webmanifest")) as {
    [schluessel: string]: unknown;
    icons: Array<{ src: string; sizes: string; type: string; purpose?: string }>;
    shortcuts: Array<{ name: string; url: string }>;
    screenshots?: Array<{
      src: string;
      sizes: string;
      type: string;
      form_factor?: string;
      label?: string;
    }>;
  };
  /** Breite und Höhe aus dem PNG-Kopf (IHDR). */
  const pngGroesse = (datei: string) => {
    const bytes = readFileSync(path.join(REPO, "public", datei));
    expect(bytes.subarray(1, 4).toString("latin1")).toBe("PNG");
    return `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`;
  };

  it("trägt die Pflichtangaben für die Installation", () => {
    expect(manifest).toMatchObject({
      name: "NeXify AI",
      short_name: "NeXify",
      lang: "de",
      scope: "/",
      display: "standalone",
      theme_color: "#1b1e1d",
      background_color: "#1b1e1d",
    });
    expect(String(manifest["description"]).length).toBeGreaterThan(20);
    expect(manifest["start_url"]).toBe("/?source=pwa");
    // Die Farben sind die Marken-Tokens (--color-dunkel-grund) und stehen so im Seitenkopf.
    expect(lies("src/styles.css")).toContain("--color-dunkel-grund: #1b1e1d;");
  });

  it("Icons 192 und 512, je normal und maskierbar, in der angegebenen Größe", () => {
    const erwartet = ["192x192 any", "512x512 any", "192x192 maskable", "512x512 maskable"];
    expect(manifest.icons.map((icon) => `${icon.sizes} ${icon.purpose}`)).toEqual(erwartet);
    for (const icon of manifest.icons) {
      expect(icon.type).toBe("image/png");
      expect(pngGroesse(icon.src), icon.src).toBe(icon.sizes);
    }
    expect(pngGroesse("/icons/apple-touch-icon.png")).toBe("180x180");
  });

  it("Kurzbefehle und Bildschirmfotos zeigen auf Vorhandenes", () => {
    const pfade = new Set(INDEXIERBAR.map((seite) => seite.pfad));
    expect(manifest.shortcuts.map((s) => s.name)).toEqual(["Kontakt", "Leistungen"]);
    for (const kurz of manifest.shortcuts)
      expect(pfade.has(new URL(kurz.url, SITE_ORIGIN).pathname)).toBe(true);
    for (const bild of manifest.screenshots ?? []) {
      expect(existsSync(path.join(REPO, "public", bild.src)), bild.src).toBe(true);
      expect(bild.label, bild.src).toBeTruthy();
    }
  });
});
