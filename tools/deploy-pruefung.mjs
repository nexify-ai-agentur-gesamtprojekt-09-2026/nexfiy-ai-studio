#!/usr/bin/env node
// 2026-11-23 (Europe/Berlin): Prüf- und Entscheidungslogik der automatischen Auslieferung
// (.github/workflows/deploy-live.yml). Ohne Abhängigkeiten, nur Node-Bordmittel, damit der
// Deploy-Job keinen Anwendungscode und kein node_modules braucht. Getestet in
// src/test/deploy-pruefung.test.ts.
//
// Befehle:
//   aktive-version              liest die Antwort von GET .../workers/scripts/<name>/deployments
//                               (Cloudflare-API) von stdin und gibt die Version-ID aus, die im
//                               neuesten Deployment den größten Anteil hat. Exit 1, wenn keine.
//   smoke [--base=URL]          (Standard: $LIVE_BASE, sonst www.nexifyai.de) ruft die Hauptpfade ab: 200 erwartet für die öffentlichen Seiten,
//                               404 + X-Robots-Tag noindex ohne Location für /teileklar.
//                               Mit --commit=<10 Zeichen> zusätzlich Readback des Build-Stempels.
//                               Mit --markdown Ausgabe als Tabelle für die Job-Zusammenfassung.
//                               Exit 1 bei einem Fehler.
//   entscheidung --vorher=ID --aktuell=ID --ergebnis=ok|fehler
//                               gibt genau ein Wort aus: "keiner" (alles gut oder nichts
//                               verändert), "rollback" (neue Version ist live und fehlerhaft,
//                               vorige Version bekannt) oder "unmoeglich" (fehlerhaft, aber keine
//                               vorige Version bekannt).
// Gibt nie Zugangsdaten aus; die Befehle bekommen keine.

import { pathToFileURL } from "node:url";

export const SMOKE_PFADE = [
  "/",
  "/leistungen",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/regionen",
];
export const STILLGELEGT = ["/teileklar"];
const VERSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Aktive Version aus der Deployments-Antwort der Cloudflare-API, sonst null. */
export function aktiveVersion(antwort) {
  const liste = antwort?.result?.deployments;
  if (!Array.isArray(liste) || liste.length === 0) return null;
  const neuestes = [...liste].sort((a, b) =>
    String(b?.created_on ?? "").localeCompare(String(a?.created_on ?? "")),
  )[0];
  const versionen = Array.isArray(neuestes?.versions) ? neuestes.versions : [];
  const beste = [...versionen].sort(
    (a, b) => Number(b?.percentage ?? 0) - Number(a?.percentage ?? 0),
  )[0];
  const id = beste?.version_id;
  return typeof id === "string" && VERSION_ID.test(id) ? id : null;
}

/**
 * Rollback-Entscheidung nach einem Deploy.
 * ergebnis: "ok", wenn Deploy, Binding-Prüfung, Readback und Smoke-Test bestanden sind.
 */
export function entscheidung({ vorher, aktuell, ergebnis }) {
  if (ergebnis === "ok") return "keiner";
  const vorherGueltig = typeof vorher === "string" && VERSION_ID.test(vorher);
  // Aktive Version unverändert: der Deploy hat nichts ausgeliefert, live ist noch der alte Stand.
  if (vorherGueltig && aktuell === vorher) return "keiner";
  if (!vorherGueltig) return "unmoeglich";
  return "rollback";
}

/** Prüft eine Antwort gegen die Erwartung; gibt null oder eine Fehlerbeschreibung zurück. */
export function bewerte(pfad, { status, location, robots }) {
  if (STILLGELEGT.includes(pfad)) {
    const noindex = /noindex/i.test(robots || "");
    if (status === 404 && !location && noindex) return null;
    return `erwartet 404 + noindex ohne Location, erhalten ${status} · location=${location || "-"} · x-robots-tag=${robots || "-"}`;
  }
  if (status === 200) return null;
  return `erwartet 200, erhalten ${status}${location ? ` → ${location}` : ""}`;
}

async function abrufen(url) {
  const res = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
    headers: { "user-agent": "nexify-deploy-smoke", "cache-control": "no-cache" },
  });
  const text = await res.text();
  return {
    status: res.status,
    location: res.headers.get("location") || "",
    robots: res.headers.get("x-robots-tag") || "",
    text,
  };
}

export async function smoke(base, { commit = "", versuche = 3, pause = 3000 } = {}) {
  const ergebnisse = [];
  const pfade = [...SMOKE_PFADE, ...STILLGELEGT];
  for (const pfad of pfade) {
    let fehler = "";
    let status = 0;
    for (let i = 0; i < versuche; i++) {
      try {
        const r = await abrufen(base + pfad);
        status = r.status;
        fehler = bewerte(pfad, r) || "";
      } catch (e) {
        fehler = `nicht erreichbar (${e?.name || "Fehler"})`;
      }
      if (!fehler) break;
      if (i < versuche - 1) await new Promise((ok) => setTimeout(ok, pause));
    }
    ergebnisse.push({ pruefung: pfad, status, ok: !fehler, detail: fehler });
  }
  if (commit) {
    let live = "";
    for (let i = 0; i < versuche; i++) {
      try {
        const r = await abrufen(base + "/.well-known/nexify-build.json");
        live = String(JSON.parse(r.text)?.commit_short ?? "");
      } catch {
        live = "";
      }
      if (live === commit) break;
      if (i < versuche - 1) await new Promise((ok) => setTimeout(ok, pause));
    }
    ergebnisse.push({
      pruefung: "Readback Stempel",
      status: live || "-",
      ok: live === commit,
      detail: live === commit ? "" : `live=${live || "unbekannt"} erwartet=${commit}`,
    });
  }
  return ergebnisse;
}

function argument(argv, name) {
  const a = argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : "";
}

async function stdinLesen() {
  let daten = "";
  for await (const teil of process.stdin) daten += teil;
  return daten;
}

async function main(argv) {
  const befehl = argv[0];
  if (befehl === "aktive-version") {
    let json;
    try {
      json = JSON.parse(await stdinLesen());
    } catch {
      console.error("VERSION FAIL: Antwort ist kein JSON");
      return 1;
    }
    if (json && json.success === false) {
      const codes = (json.errors || []).map((e) => e?.code);
      console.error(`VERSION FAIL: Cloudflare-API meldet Fehler ${JSON.stringify(codes)}`);
      return 1;
    }
    const id = aktiveVersion(json);
    if (!id) {
      console.error("VERSION FAIL: keine aktive Version gefunden");
      return 1;
    }
    console.log(id);
    return 0;
  }
  if (befehl === "smoke") {
    const base = (
      argument(argv, "base") ||
      process.env.LIVE_BASE ||
      "https://www.nexifyai.de"
    ).replace(/\/$/, "");
    const commit = argument(argv, "commit");
    const versuche = Number(argument(argv, "versuche") || process.env.SMOKE_VERSUCHE || 3);
    const pause = Number(argument(argv, "pause") || process.env.SMOKE_PAUSE_MS || 3000);
    const ergebnisse = await smoke(base, { commit, versuche, pause });
    if (argv.includes("--markdown")) {
      console.log("| Prüfung | Status | Ergebnis |");
      console.log("| --- | --- | --- |");
      for (const e of ergebnisse)
        console.log(
          `| \`${e.pruefung}\` | ${e.status} | ${e.ok ? "OK" : `FEHLER: ${e.detail.replace(/\|/g, "\\|")}`} |`,
        );
    } else {
      for (const e of ergebnisse)
        console.log(`${e.ok ? "SMOKE OK  " : "SMOKE FAIL"} ${e.pruefung} ${e.status} ${e.detail}`);
    }
    return ergebnisse.every((e) => e.ok) ? 0 : 1;
  }
  if (befehl === "entscheidung") {
    const ergebnis = argument(argv, "ergebnis");
    if (ergebnis !== "ok" && ergebnis !== "fehler") {
      console.error("FEHLER: --ergebnis=ok|fehler erwartet");
      return 2;
    }
    console.log(
      entscheidung({
        vorher: argument(argv, "vorher"),
        aktuell: argument(argv, "aktuell"),
        ergebnis,
      }),
    );
    return 0;
  }
  console.error(
    "Nutzung: deploy-pruefung.mjs aktive-version | smoke [--base=URL] | entscheidung …",
  );
  return 2;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2));
}
