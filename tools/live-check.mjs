#!/usr/bin/env node
// 2026-11-21 01:35 (Europe/Berlin): Live-Pruefung der oeffentlichen Seiten (AT-P0-003).
// Warum: Der Pruefbefehl "node tools/live-check.mjs" war in der Autotask-Definition
//   vorgesehen, existierte aber nicht; der Vorgaenger stuerzte an .hc-gallery-card ab
//   (Selektor nicht auf jeder Seite vorhanden, Zugriff ohne Null-Pruefung).
// Was: Routen aus src/routes ableiten, live abrufen und vier Dinge messen —
//   1) HTTP 200, 2) canonical, 3) H1, 4) Struktur-Anker (hc-/nx-/tk-Klassen) gegen die
//   Referenz-Aufnahme in .site-import/pages/<slug>/clone.marked.html.
//   Zusaetzlich: Kontoseiten (Stand des Kundencenters), Kurzadressen und fruehere Shop-Adressen.
//   2026-11-22: dazu je Route Titel, Beschreibung, kanonische Adresse, Vorschaukarte und
//   strukturierte Daten gegen die Seitentabelle (src/lib/seo-pages.ts) sowie die Dateien der
//   installierbaren Web-App (Manifest, /sw.js, /offline) und Sitemap, robots.txt, llms.txt.
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

// 2026-11-22 (Europe/Berlin): Die Kontoadressen leiten vorlaeufig (302) auf /portale, weil sie
// denselben Hinweis zeigten. Geprueft wird die Weiterleitung. Liefert eine der Adressen doch
// wieder eine Seite (200), gilt weiter: kein <form>, kein Submit-Button, dafuer der Hinweis und
// der Weg zur Kontaktseite.
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
// 2026-11-22 (Europe/Berlin): Bewusst gestrichene Bausteine der Referenz-Aufnahmen: das
// Aufklappmodul „Die FACTORY entdecken" (Fuelltext ohne Gegenstueck), der zweite Linkblock
// „Passende Themen" neben „Der passende Einstieg." und die Filmsteuerung der Kontoseiten.
// Ihre Klassen zaehlen nicht mehr als Soll, wenn die Seite sie nicht mehr traegt; sonst meldet
// der Check den gewollten Rueckbau als Design-Drift. Seiten, die diese Klassen fuer andere
// Inhalte weiter nutzen (Fragen, Themenkarten), werden unveraendert daran gemessen.
const REMOVED_MODULE_TOKENS = [
  "pc-guide",
  "hc-service-detail",
  "hc-service-name",
  "hc-service-body",
  "hc-disclosure-icon",
  "hc-caption",
  "pc-related",
  "hc-process",
  "hc-process-heading",
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
// Soll je Seite: Titel, Beschreibung, Indexierbarkeit. Node liest die TypeScript-Datei direkt.
const { SEITEN, seitenTitel } = await import(path.join(REPO, "src", "lib", "seo-pages.ts"));
const CANONICAL_ORIGIN = "https://www.nexifyai.de";
const sollAdresse = (pfad) => CANONICAL_ORIGIN + pfad;

function entschluesseln(text) {
  return String(text ?? "")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
// Alle Werte eines Meta-Tags; mehr als einer ist ein Fehler (doppelte Angabe).
function metaWerte(html, schluessel, name) {
  const treffer = [];
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    if (!new RegExp(`\\b${schluessel}=["']${name}["']`, "i").test(tag)) continue;
    const inhalt = tag.match(/\bcontent=["']([^"']*)["']/i);
    treffer.push(entschluesseln(inhalt ? inhalt[1] : ""));
  }
  return treffer;
}
function jsonLdKnoten(html) {
  const knoten = [];
  let kaputt = 0;
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const daten = JSON.parse(m[1]);
      knoten.push(...(Array.isArray(daten["@graph"]) ? daten["@graph"] : [daten]));
    } catch {
      kaputt += 1;
    }
  }
  return { knoten, kaputt };
}
const hatTyp = (knoten, typ) => [].concat(knoten["@type"] ?? []).includes(typ);

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
      headers: { "user-agent": "nexify-live-check/1.0", accept: opts.raw ? "*/*" : "text/html" },
    });
    const type = res.headers.get("content-type") || "";
    const body = type.includes("text/html") || opts.raw ? await res.text() : "";
    return {
      status: res.status,
      location: res.headers.get("location"),
      robots: res.headers.get("x-robots-tag"),
      type,
      cache: res.headers.get("cache-control"),
      swAllowed: res.headers.get("service-worker-allowed"),
      csp: res.headers.get("content-security-policy"),
      body,
      finalUrl: res.url,
    };
  } catch (err) {
    return { status: `FEHLER ${err.name}`, location: null, robots: null, type: "", body: "" };
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
  if (AUTH_PAGES.includes(route)) {
    const direkt = await get(BASE + route, { redirect: "manual" });
    if (direkt.status !== 200) {
      let ziel = "";
      try {
        ziel = new URL(direkt.location || "", BASE).pathname;
      } catch {
        ziel = "";
      }
      if (direkt.status !== 302 || ziel !== "/portale")
        problems.push({
          route,
          kind: "Weiterleitung",
          detail: `erwartet 302 -> /portale, erhalten ${direkt.status} -> ${direkt.location || "-"}`,
        });
      rows.push({
        route,
        status: direkt.status,
        canonical: true,
        h1: true,
        coverage: "-> /portale",
        missing: 0,
      });
      continue;
    }
  }
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
    for (const t of REMOVED_MODULE_TOKENS) if (!live.has(t)) ref.delete(t);
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

  // Seitenkopf gegen die Seitentabelle: genau ein Titel, eine Beschreibung, eine kanonische
  // Adresse, vollständige Vorschaukarte, lesbare strukturierte Daten, Sprache Deutsch, eine H1.
  const soll = SEITEN.find((seite) => seite.pfad === route);
  if (!soll) problems.push({ route, kind: "SEO", detail: "fehlt in src/lib/seo-pages.ts" });
  if (soll && status === 200 && !external) {
    const seo = (detail) => problems.push({ route, kind: "SEO", detail });
    const titel = [...body.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) =>
      entschluesseln(m[1]),
    );
    if (titel.length !== 1 || titel[0] !== seitenTitel(soll))
      seo(`Titel: erwartet "${seitenTitel(soll)}", erhalten ${JSON.stringify(titel)}`);
    const einmal = (schluessel, name, erwartet) => {
      const werte = metaWerte(body, schluessel, name);
      if (werte.length !== 1 || (erwartet !== undefined && werte[0] !== erwartet))
        seo(
          `${name}: erwartet ${erwartet === undefined ? "genau einen Wert" : JSON.stringify(erwartet)}, erhalten ${JSON.stringify(werte)}`,
        );
    };
    einmal("name", "description", soll.beschreibung);
    einmal("property", "og:title", soll.titel);
    einmal("property", "og:description", soll.beschreibung);
    einmal("property", "og:url", sollAdresse(soll.pfad));
    einmal("property", "og:type", "website");
    einmal("property", "og:image", `${CANONICAL_ORIGIN}/og/nexify-ai.png`);
    einmal("name", "twitter:card", "summary_large_image");
    const kanonisch = [...body.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map(
      (m) => (m[0].match(/href=["']([^"']*)["']/i) || [])[1],
    );
    if (kanonisch.length !== 1 || kanonisch[0] !== sollAdresse(soll.pfad))
      seo(`canonical: erwartet ${sollAdresse(soll.pfad)}, erhalten ${JSON.stringify(kanonisch)}`);
    const robotsMeta = metaWerte(body, "name", "robots").join(",");
    if (soll.index && /noindex/i.test(robotsMeta)) seo("indexierbare Seite trägt noindex");
    if (!soll.index && !/noindex/i.test(robotsMeta)) seo("noindex fehlt");
    if (/hreflang=/i.test(body)) seo("hreflang gesetzt, obwohl es nur eine Sprachfassung gibt");
    if (!/<html[^>]+lang=["']de["']/i.test(body)) seo('lang="de" fehlt');
    const h1 = (body.match(/<h1[\s>]/gi) || []).length;
    if (h1 !== 1) seo(`${h1} H1 statt genau einer`);
    const { knoten, kaputt } = jsonLdKnoten(body);
    if (kaputt) seo(`${kaputt} JSON-LD-Block nicht lesbar`);
    const organisation = knoten.find((k) => hatTyp(k, "Organization"));
    if (!organisation || !organisation.name || !organisation.url || !organisation.address)
      seo("JSON-LD: Organization mit name, url, address fehlt");
    if (!knoten.some((k) => hatTyp(k, "WebSite"))) seo("JSON-LD: WebSite fehlt");
    const seite = knoten.find(
      (k) => k.url === sollAdresse(soll.pfad) && /Page$/.test(String(k["@type"])),
    );
    if (!seite || !seite.name) seo("JSON-LD: Seite (WebPage) fehlt");
    const pfad = knoten.find((k) => hatTyp(k, "BreadcrumbList"));
    if (
      route !== "/" &&
      !(pfad && Array.isArray(pfad.itemListElement) && pfad.itemListElement.length >= 2)
    )
      seo("JSON-LD: BreadcrumbList fehlt");
    const leistung = knoten.filter((k) => hatTyp(k, "Service"));
    if (soll.leistung && (leistung.length !== 1 || !leistung[0].name || !leistung[0].provider))
      seo("JSON-LD: Service fehlt oder unvollständig");
    if (!soll.leistung && leistung.length) seo("JSON-LD: Service auf einer Seite ohne Leistung");
    if (/AggregateRating|"offers"|"price|"award"|GeoCoordinates/.test(JSON.stringify(knoten)))
      seo("JSON-LD: unbelegte Angabe (Bewertung, Preis, Auszeichnung oder Koordinaten)");
  }

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
    ? String(login.location || "").includes("/portale")
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
for (const [kurz, code, soll = "/portale"] of [
  ["/kundencenter", 302],
  ["/kundenportal", 301],
  ["/login", 301],
  ["/produkte", 302, "/produkte/nex2fly"],
]) {
  const res = await get(BASE + kurz, { redirect: "manual" });
  let ziel = "";
  try {
    ziel = new URL(res.location || "", BASE).pathname;
  } catch {
    ziel = "";
  }
  if (res.status !== code || ziel !== soll)
    problems.push({
      route: kurz,
      kind: "Weiterleitung",
      detail: `erwartet ${code} -> ${soll}, erhalten ${res.status} -> ${res.location || "-"}`,
    });
}

// Seitentabelle und Routendateien müssen sich decken.
for (const seite of SEITEN)
  if (!routes.includes(seite.pfad))
    problems.push({
      route: seite.pfad,
      kind: "SEO",
      detail: "steht in seo-pages.ts, aber ohne Route",
    });

// Installierbare Web-App: Manifest, Icons, Service Worker, Offline-Seite.
const pwaRows = [];
const pwa = (route, detail) => problems.push({ route, kind: "PWA", detail });
const manifestRes = await get(BASE + "/manifest.webmanifest", { raw: true });
let manifest = null;
try {
  manifest = JSON.parse(manifestRes.body);
} catch {
  manifest = null;
}
if (manifestRes.status !== 200 || !manifest)
  pwa("/manifest.webmanifest", `nicht lesbar (${manifestRes.status})`);
else {
  for (const feld of [
    "name",
    "short_name",
    "description",
    "start_url",
    "scope",
    "theme_color",
    "background_color",
  ])
    if (!manifest[feld]) pwa("/manifest.webmanifest", `${feld} fehlt`);
  if (manifest.lang !== "de")
    pwa("/manifest.webmanifest", `lang ist ${manifest.lang}, erwartet de`);
  if (manifest.display !== "standalone")
    pwa("/manifest.webmanifest", "display ist nicht standalone");
  const icons = Array.isArray(manifest.icons) ? manifest.icons : [];
  for (const [groesse, zweck] of [
    ["192x192", "any"],
    ["512x512", "any"],
    ["512x512", "maskable"],
  ])
    if (!icons.some((icon) => icon.sizes === groesse && (icon.purpose || "any") === zweck))
      pwa("/manifest.webmanifest", `Icon ${groesse} (${zweck}) fehlt`);
  const dateien = [
    ...icons,
    ...(manifest.screenshots || []),
    ...(manifest.shortcuts || []).flatMap((s) => s.icons || []),
  ];
  for (const src of new Set(dateien.map((eintrag) => eintrag.src))) {
    const res = await get(BASE + src, { raw: true });
    if (res.status !== 200 || !/^image\//.test(res.type))
      pwa(src, `Bild nicht abrufbar (${res.status}, ${res.type})`);
  }
  for (const kurz of manifest.shortcuts || []) {
    const res = await get(new URL(kurz.url, BASE).toString());
    if (res.status !== 200) pwa(kurz.url, `Kurzbefehl antwortet mit ${res.status}`);
  }
  const start = await get(new URL(manifest.start_url, BASE).toString());
  if (start.status !== 200) pwa(manifest.start_url, `start_url antwortet mit ${start.status}`);
  if (!/<link[^>]+rel=["']manifest["'][^>]+href=["']\/manifest\.webmanifest["']/i.test(start.body))
    pwa(manifest.start_url, "Verweis auf das Manifest fehlt im Seitenkopf");
  if (metaWerte(start.body, "name", "theme-color")[0] !== manifest.theme_color)
    pwa(manifest.start_url, "theme-color im Seitenkopf weicht vom Manifest ab");
  if (!/<link[^>]+rel=["']apple-touch-icon["']/i.test(start.body))
    pwa(manifest.start_url, "apple-touch-icon fehlt");
  if (start.csp && !/worker-src[^;]*'self'/.test(start.csp))
    pwa(manifest.start_url, "CSP erlaubt keinen eigenen Worker");
}
pwaRows.push([
  "/manifest.webmanifest",
  manifestRes.status,
  manifest ? `${(manifest.icons || []).length} Icons` : "-",
]);

const sw = await get(BASE + "/sw.js", { raw: true });
if (sw.status !== 200) pwa("/sw.js", `HTTP ${sw.status}`);
else {
  if (!/javascript/.test(sw.type)) pwa("/sw.js", `content-type ${sw.type}`);
  if (!/\bno-cache\b/.test(sw.cache || ""))
    pwa("/sw.js", `cache-control ist "${sw.cache}", erwartet no-cache`);
  if (sw.swAllowed) pwa("/sw.js", "Service-Worker-Allowed gesetzt, obwohl nicht nötig");
  // Bei abgeschalteter Installation liefert /sw.js den Abschalt-Worker ohne fetch-Ereignis.
  const abgeschaltet = /registration\.unregister\(\)/.test(sw.body);
  if (!abgeschaltet && !/addEventListener\(\s*["']fetch["']/.test(sw.body))
    pwa("/sw.js", "kein fetch-Ereignis");
  if (/__NEXIFY_SW_VERSION__/.test(sw.body)) pwa("/sw.js", "Versionsmarke nicht ersetzt");
  pwaRows.push(["/sw.js", sw.status, abgeschaltet ? "Abschalt-Worker" : `aktiv, ${sw.cache}`]);
}

const offline = await get(BASE + "/offline");
if (offline.status !== 200) pwa("/offline", `HTTP ${offline.status}`);
else {
  const noindex =
    /noindex/i.test(offline.robots || "") &&
    /noindex/i.test(metaWerte(offline.body, "name", "robots").join(","));
  if (!noindex) pwa("/offline", "noindex fehlt (Header und Meta-Tag)");
  if (!offline.body.includes("Sie sind offline.")) pwa("/offline", "Hinweistext fehlt");
  if ((offline.body.match(/<h1[\s>]/gi) || []).length !== 1) pwa("/offline", "nicht genau eine H1");
  if (/<script/i.test(offline.body)) pwa("/offline", "enthält Skripte");
}
pwaRows.push(["/offline", offline.status, offline.robots || "-"]);

// Sitemap, robots.txt, llms.txt: nur indexierbare Seiten, die auch antworten.
const sollSitemap = SEITEN.filter((seite) => seite.index).map((seite) => sollAdresse(seite.pfad));
const sitemap = await get(BASE + "/sitemap.xml", { raw: true });
const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (sitemap.status !== 200 || JSON.stringify(locs) !== JSON.stringify(sollSitemap))
  problems.push({
    route: "/sitemap.xml",
    kind: "SEO",
    detail: `Adressen weichen ab: zu viel ${JSON.stringify(locs.filter((l) => !sollSitemap.includes(l)))}, es fehlt ${JSON.stringify(sollSitemap.filter((l) => !locs.includes(l)))}`,
  });
if ((sitemap.body.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) || []).length !== locs.length)
  problems.push({
    route: "/sitemap.xml",
    kind: "SEO",
    detail: "lastmod fehlt oder ist kein Datum",
  });
const robotsTxt = await get(BASE + "/robots.txt", { raw: true });
if (
  robotsTxt.status !== 200 ||
  !robotsTxt.body.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`)
)
  problems.push({ route: "/robots.txt", kind: "SEO", detail: "Verweis auf die Sitemap fehlt" });
for (const zeile of robotsTxt.body.split("\n").filter((z) => /^Disallow:/i.test(z.trim()))) {
  const gesperrt = zeile.split(":")[1].trim();
  const betroffen = SEITEN.filter((seite) => gesperrt && seite.pfad.startsWith(gesperrt));
  if (betroffen.length)
    problems.push({
      route: "/robots.txt",
      kind: "SEO",
      detail: `"${zeile.trim()}" sperrt ${betroffen.map((b) => b.pfad).join(", ")}`,
    });
}
const llms = await get(BASE + "/llms.txt", { raw: true });
const llmsAdressen = [...llms.body.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((m) => m[1]);
if (llms.status !== 200 || llmsAdressen.length === 0)
  problems.push({ route: "/llms.txt", kind: "GEO", detail: `nicht lesbar (${llms.status})` });
for (const adresse of llmsAdressen)
  if (!sollSitemap.includes(adresse))
    problems.push({
      route: "/llms.txt",
      kind: "GEO",
      detail: `${adresse} ist keine indexierbare Seite`,
    });
if (/teileklar/i.test(llms.body))
  problems.push({ route: "/llms.txt", kind: "GEO", detail: "nennt TEILEKLAR" });

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

for (const [name, code, detail] of pwaRows)
  console.log(`  ${name.padEnd(34)} ${String(code).padStart(5)}    ${detail}`);
console.log(
  `  ${"/sitemap.xml".padEnd(34)} ${String(sitemap.status).padStart(5)}    ${locs.length} Adressen · llms.txt ${llmsAdressen.length} Verweise`,
);

console.log(`\nFehler: ${problems.length} · kritische Design-Drifts: ${drifts.length}`);
for (const p of problems) console.log(`  [${p.kind}] ${p.route}: ${p.detail}`);
for (const d of drifts) {
  console.log(
    `  [Drift] ${d.route}: Deckung ${(d.coverage * 100).toFixed(1)} % — fehlt u.a. ${d.missing.slice(0, 5).join(", ")}`,
  );
}
process.exit(problems.length === 0 && drifts.length === 0 ? 0 : 1);
