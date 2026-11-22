#!/usr/bin/env node
// 2026-11-21 01:35 (Europe/Berlin): Live-Pruefung der oeffentlichen Seiten (AT-P0-003).
// Warum: Der Pruefbefehl "node tools/live-check.mjs" war in der Autotask-Definition
//   vorgesehen, existierte aber nicht; der Vorgaenger stuerzte an .hc-gallery-card ab
//   (Selektor nicht auf jeder Seite vorhanden, Zugriff ohne Null-Pruefung).
// Was: Routen aus src/routes ableiten, live abrufen und vier Dinge messen —
//   1) HTTP 200, 2) canonical, 3) H1, 4) Struktur-Anker (hc-/nx-/tk-Klassen) gegen die
//   Referenz-Aufnahme in .site-import/pages/<slug>/clone.marked.html.
//   Zusaetzlich: Kontoseiten (Stand des Kundencenters), Kurzadressen und fruehere Shop-Adressen.
// Ausgabe: je Seite eine Zeile, danach Summe. Exit 1 bei Fehlern oder kritischem Drift.
// ponytail: Regex statt DOM-Parser und keine Pixel-Diffs — Deckung ueber Klassentoken.
//   Aufstiegspfad: bei Bedarf parse5 + Screenshot-Diff je Referenz-PNG.
import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const ROUTE_DIR = path.join(REPO, "src", "routes");
const REF_DIR = path.join(REPO, ".site-import", "pages");
const argBase = process.argv.find((a) => a.startsWith("--base="));
const BASE = (
  argBase ? argBase.slice(7) : process.env.LIVE_BASE || "https://www.nexifyai.de"
).replace(/\/$/, "");

// 2026-11-22 (Europe/Berlin): Die Kontoseiten zeigen den Stand des Kundencenters statt
// Formularen ohne Gegenstelle. Geprueft wird deshalb das Gegenteil von frueher: kein <form>,
// kein Submit-Button, dafuer der Hinweis und der Weg zur Kontaktseite.
const AUTH_PAGES = ["/anmelden", "/registrieren", "/passwort-vergessen"];
const AUTH_NOTICE = "Das NeXify-Kundencenter wird derzeit eingerichtet.";
// Die Referenz-Aufnahmen dieser Seiten zeigen noch die frueheren Formulare. Deren Anker
// zaehlen nicht mehr als Soll, sonst meldet der Check den gewollten Umbau als Design-Drift.
const AUTH_RETIRED_TOKENS = [
  "tk-field",
  "nx-feld",
  "nx-feld-schalter",
  "nx-konto-oder",
  "hc-text-link",
];
// 2026-11-22 (Europe/Berlin): Keine erwarteten Weiterleitungen auf fremde Domains mehr.
// Inhaberentscheidung vom 22.11.2026: die Agenturseite leitet nicht in einen Shop um.
// Jede Fremd-Domain als Ziel ist damit ein Fehler. Die Zuordnung bleibt als leere Tabelle,
// damit eine kuenftige, bewusst entschiedene Ausnahme an genau einer Stelle steht.
const EXPECTED_EXTERNAL = {};
// Fruehere Shop-Adressen: 404 mit "X-Robots-Tag: noindex", ohne Location — auch mit Querystring.
const RETIRED_PATHS = ["/teileklar", "/teileklar/shop", "/teileklar/kasse?utm_source=x&q=y"];

// Gilt fuer die Strecke selbst und alle Unterpfade (/teileklar/shop usw.).
function expectedExternalHost(route) {
  const key = Object.keys(EXPECTED_EXTERNAL)
    .filter((k) => route === k || route.startsWith(k + "/"))
    .sort((a, b) => b.length - a.length)[0];
  return key ? EXPECTED_EXTERNAL[key] : null;
}
const DRIFT_FLOOR = 0.9; // unter 90 % Ankerdeckung = kritischer Drift
const DRIFT_MIN_TOKENS = 10; // Seiten mit weniger Referenz-Ankern werden nicht bewertet

// Route-Datei -> URL, identisch zur Regel im Deploy-Smoke-Test.
function toUrl(file) {
  const stem = path.basename(file, ".tsx");
  if (stem === "__root" || stem === "index") return "/";
  return "/" + stem.replace(/_\./g, "/").replace(/\./g, "/");
}

function refSlug(file) {
  return path.basename(file, ".tsx").replace(/\./g, ".");
}

function tokens(html) {
  const set = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const t of m[1].split(/\s+/)) {
      if (t.startsWith("hc-") || t.startsWith("nx-") || t.startsWith("tk-")) set.add(t);
    }
  }
  return set;
}

function countClass(html, name) {
  return (html.match(new RegExp(`(?:^|[\\s"'])${name}(?=[\\s"'])`, "g")) || []).length;
}

async function get(url, opts = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(url, {
      redirect: opts.redirect ?? "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "nexify-live-check/1.0", accept: "text/html" },
    });
    const body = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    return {
      status: res.status,
      location: res.headers.get("location"),
      robots: res.headers.get("x-robots-tag"),
      body,
      finalUrl: res.url,
    };
  } catch (err) {
    return { status: `FEHLER ${err.name}`, location: null, robots: null, body: "" };
  } finally {
    clearTimeout(timer);
  }
}

const files = (await readdir(ROUTE_DIR)).filter(
  (f) => f.endsWith(".tsx") && !f.startsWith("__root"),
);
const routes = [...new Set(files.map(toUrl))].sort();

const problems = []; // {route, kind, detail}
const drifts = []; // {route, coverage, missing}
const rows = [];
const BASE_HOST = new URL(BASE).host;

for (const route of routes) {
  const file = files.find((f) => toUrl(f) === route);
  const { status, body, finalUrl } = await get(BASE + route);
  // Marken-Weiterleitung erkennen: fremder Host = anderer Auftritt, andere CI.
  let external = null;
  try {
    const host = new URL(finalUrl).host;
    if (host && host !== BASE_HOST) external = host;
  } catch {
    external = null;
  }
  if (external && expectedExternalHost(route) !== external) {
    problems.push({
      route,
      kind: "Weiterleitung",
      detail: `unerwartet extern -> ${external}`,
    });
  }
  const hasH1 = /<h1[\s>]/i.test(body);
  const hasCanonical = /<link[^>]+rel=["']canonical/i.test(body);
  const live = tokens(body);

  const slug = file ? refSlug(file) : "";
  const refFile = slug ? path.join(REF_DIR, slug, "clone.marked.html") : "";
  let coverage = null;
  let missing = [];
  if (!external && refFile && existsSync(refFile)) {
    const ref = tokens(readFileSync(refFile, "utf8"));
    if (AUTH_PAGES.includes(route)) for (const t of AUTH_RETIRED_TOKENS) ref.delete(t);
    if (ref.size >= DRIFT_MIN_TOKENS) {
      missing = [...ref].filter((t) => !live.has(t));
      coverage = (ref.size - missing.length) / ref.size;
      if (coverage < DRIFT_FLOOR) drifts.push({ route, coverage, missing });
    }
    // Der historische Absturzpunkt: nur pruefen, wenn die Referenz den Anker kennt.
    if (ref.has("hc-gallery-card") && !live.has("hc-gallery-card")) {
      problems.push({
        route,
        kind: "Drift",
        detail: ".hc-gallery-card fehlt (in Referenz vorhanden)",
      });
    }
  }

  if (status !== 200) problems.push({ route, kind: "HTTP", detail: String(status) });
  // Bei erwarteter Marken-Weiterleitung gilt der Zielauftritt; canonical/H1 dort
  // sind Sache der Marke, nicht des NeXify-Vertrags.
  if (status === 200 && !external && !hasCanonical)
    problems.push({ route, kind: "SEO", detail: "canonical fehlt" });
  if (status === 200 && !external && !hasH1)
    problems.push({ route, kind: "A11y", detail: "H1 fehlt" });

  if (AUTH_PAGES.includes(route) && status === 200) {
    const main = body.split(/<footer[\s>]/i)[0];
    if (/<form[\s>]/i.test(main))
      problems.push({ route, kind: "Auth", detail: "Formular ohne Gegenstelle vorhanden" });
    if (/<button[^>]+type=["']submit["']/i.test(main))
      problems.push({ route, kind: "Auth", detail: "Submit-Button ohne Gegenstelle vorhanden" });
    if (!body.includes(AUTH_NOTICE))
      problems.push({ route, kind: "Auth", detail: "Hinweis zum Kundencenter fehlt" });
    if (!/href=["']\/kontakt["']/i.test(main))
      problems.push({ route, kind: "Auth", detail: "Link zur Kontaktseite fehlt" });
  }

  rows.push({
    route,
    status,
    canonical: hasCanonical,
    h1: hasH1,
    coverage: external
      ? `extern:${external}`
      : coverage === null
        ? "—"
        : (coverage * 100).toFixed(1) + "%",
    missing: missing.length,
  });
}

// Kurzadresse /login: www.nexifyai.cloud leitet dorthin weiter — sie darf nicht ins Leere laufen.
const login = await get(BASE + "/login", { redirect: "manual" });
const loginOk =
  login.status === 301 ||
  login.status === 302 ||
  login.status === 303 ||
  login.status === 307 ||
  login.status === 308
    ? String(login.location || "").includes("/anmelden")
    : login.status === 200;
if (!loginOk)
  problems.push({
    route: "/login",
    kind: "Weiterleitung",
    detail: `${login.status} -> ${login.location || "-"}`,
  });

for (const alt of RETIRED_PATHS) {
  const res = await get(BASE + alt, { redirect: "manual" });
  const noindex = String(res.robots || "")
    .toLowerCase()
    .includes("noindex");
  if (res.status !== 404 || res.location || !noindex)
    problems.push({
      route: alt,
      kind: "Altpfad",
      detail: `erwartet 404 + noindex ohne Location, erhalten ${res.status} · location=${res.location || "-"} · x-robots-tag=${res.robots || "-"}`,
    });
}

// Kurzadressen des Kundencenters auf /portale derselben Domain. /kundencenter nur vorlaeufig
// (302): der Pfad wird spaeter der geschuetzte Einstieg; ein 301 bliebe im Browser haengen.
for (const [kurz, code] of [
  ["/kundencenter", 302],
  ["/kundenportal", 301],
]) {
  const res = await get(BASE + kurz, { redirect: "manual" });
  let ziel = "";
  try {
    ziel = new URL(res.location || "", BASE).pathname;
  } catch {
    ziel = "";
  }
  if (res.status !== code || ziel !== "/portale")
    problems.push({
      route: kurz,
      kind: "Weiterleitung",
      detail: `erwartet ${code} -> /portale, erhalten ${res.status} -> ${res.location || "-"}`,
    });
}

console.log(`Live-Check ${BASE} · ${routes.length} Routen · ${new Date().toISOString()}`);
console.log(
  `  ${"Route".padEnd(34)} ${"Code".padStart(5)} ${"canon".padStart(6)} ${"H1".padStart(3)} ${"Anker".padStart(7)} ${"fehlt".padStart(6)}`,
);
for (const r of rows) {
  const flag = r.status === 200 && r.canonical && r.h1 ? " " : "!";
  console.log(
    `${flag} ${r.route.padEnd(34)} ${String(r.status).padStart(5)} ${String(r.canonical).padStart(6)} ${String(r.h1).padStart(3)} ${String(r.coverage).padStart(7)} ${String(r.missing).padStart(6)}`,
  );
}
console.log(
  `  ${"/login".padEnd(34)} ${String(login.status).padStart(5)} -> ${login.location || "-"}`,
);

console.log(`\nFehler: ${problems.length} · kritische Design-Drifts: ${drifts.length}`);
for (const p of problems) console.log(`  [${p.kind}] ${p.route}: ${p.detail}`);
for (const d of drifts) {
  console.log(
    `  [Drift] ${d.route}: Deckung ${(d.coverage * 100).toFixed(1)} % — fehlt u.a. ${d.missing.slice(0, 5).join(", ")}`,
  );
}
process.exit(problems.length === 0 && drifts.length === 0 ? 0 : 1);
