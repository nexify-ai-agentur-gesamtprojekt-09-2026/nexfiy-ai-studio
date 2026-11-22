import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { buildId, buildKennung, KENNUNGS_DATEIEN } from "./build-id";

describe("Build-Kennung des Service Workers", () => {
  it("hängt am Inhalt, nicht an der Uhrzeit", async () => {
    const erste = buildId();
    await new Promise((fertig) => setTimeout(fertig, 5));
    expect(buildId()).toBe(erste);
    expect(erste).toMatch(/^[0-9a-f]{12}$/);
  });

  it("ändert sich mit dem Commit und mit jedem Dateiinhalt, auch bei verschobenen Grenzen", () => {
    const basis = buildKennung(["abc", "worker", "seite"]);
    expect(buildKennung(["abc", "worker", "seite"])).toBe(basis);
    expect(buildKennung(["abd", "worker", "seite"])).not.toBe(basis);
    expect(buildKennung(["abc", "worker ", "seite"])).not.toBe(basis);
    expect(buildKennung(["abc", "work", "erseite"])).not.toBe(basis);
  });

  it("alle Dateien der Kennung gibt es, und die Konfiguration nutzt keine Uhrzeit mehr", async () => {
    for (const datei of KENNUNGS_DATEIEN)
      expect(existsSync(path.join(process.cwd(), datei)), datei).toBe(true);
    const { readFileSync } = await import("node:fs");
    const konfiguration = readFileSync(path.join(process.cwd(), "vite.config.ts"), "utf8");
    expect(konfiguration).toContain("buildId()");
    expect(konfiguration).not.toMatch(/__NEXIFY_BUILD_ID__[^\n]*Date\.now/);
  });
});
