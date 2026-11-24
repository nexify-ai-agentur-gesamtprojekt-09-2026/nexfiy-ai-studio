// @vitest-environment node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  MARKENZUSATZ,
  SEITEN,
  SITE_ORIGIN,
  canonicalUrl,
  pageHead,
  pageJsonLd,
  seitenTitel,
  siteJsonLd,
} from "./seo";
import { KONTAKT, UNTERNEHMEN } from "./site-facts";

const REPO = path.resolve(__dirname, "../..");
const lies = (...teile: string[]) => readFileSync(path.join(REPO, ...teile), "utf8");
const ROUTEN_DATEIEN = readdirSync(path.join(REPO, "src/routes")).filter(
  (datei) => datei.endsWith(".tsx") && !datei.startsWith("__"),
);
const INDEXIERBAR = SEITEN.filter((seite) => seite.index);
const VERBOTEN =
  /AggregateRating|"aggregateRating"|"review"|"offers"|"price|"award"|"geo"|GeoCoordinates/;

type Knoten = Record<string, unknown>;
const graph = (ld: Knoten) => ld["@graph"] as Knoten[];
const meta = (pfad: string) => pageHead(pfad).meta as Array<Record<string, unknown>>;
const wert = (pfad: string, schluessel: "name" | "property", name: string) =>
  meta(pfad)
    .filter((eintrag) => eintrag[schluessel] === name)
    .map((eintrag) => eintrag["content"]);

describe("Seitentabelle und Routen", () => {
  it("jede Routendatei hat einen Eintrag und umgekehrt; mehrere nur für eine Vorlage mit $", () => {
    expect([...new Set(SEITEN.map((seite) => seite.datei))].sort()).toEqual(
      [...ROUTEN_DATEIEN].sort(),
    );
    for (const datei of ROUTEN_DATEIEN)
      if (!datei.includes("$"))
        expect(
          SEITEN.filter((seite) => seite.datei === datei),
          datei,
        ).toHaveLength(1);
    expect(new Set(SEITEN.map((seite) => seite.pfad)).size).toBe(SEITEN.length);
  });

  it.each(SEITEN)("$pfad: die Route nutzt ihren eigenen Eintrag", ({ pfad, datei }) => {
    const quelle = lies("src/routes", datei);
    // Kennung der Route, wie der Router sie aus dem Dateinamen bildet ("a_.b.tsx" -> "/a_/b").
    const kennung =
      datei === "index.tsx" ? "/" : "/" + datei.replace(/\.tsx$/, "").replace(/\./g, "/");
    expect(quelle).toContain(`createFileRoute("${kennung}")`);
    if (datei.includes("$")) {
      // Vorlage: der Pfad füllt den Platzhalter mit einem kleinen Adressteil ohne Umlaute.
      const muster = new RegExp(
        "^" + kennung.replace(/_\//g, "/").replace(/\$[a-z]+/g, "[a-z0-9-]+") + "$",
      );
      expect(pfad).toMatch(muster);
      expect(quelle).toMatch(/pageHead\(`\/regionen\/\$\{params\.land\}`/);
    } else {
      expect(kennung.replace(/_\//g, "/")).toBe(pfad);
      expect(quelle).toContain(`pageHead("${pfad}"`);
    }
    // Semantik: genau eine Hauptüberschrift, Sprache Deutsch.
    expect(quelle.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(quelle).toContain('lang: "de"');
  });
});

describe("Titel und Beschreibungen", () => {
  it("kommen je genau einmal vor", () => {
    expect(new Set(SEITEN.map(seitenTitel)).size).toBe(SEITEN.length);
    expect(new Set(SEITEN.map((seite) => seite.beschreibung)).size).toBe(SEITEN.length);
  });

  it.each(SEITEN)("$pfad: Längen und vollständiger Satz", (seite) => {
    const titel = seitenTitel(seite);
    expect(titel.length).toBeGreaterThanOrEqual(10);
    expect(titel.length).toBeLessThanOrEqual(60);
    expect(seite.beschreibung.length).toBeGreaterThanOrEqual(70);
    expect(seite.beschreibung.length).toBeLessThanOrEqual(160);
    // Keine abgeschnittenen Sätze wie „… greifen. Die."
    expect(seite.beschreibung).toMatch(/[.!?]$/);
    expect(seite.beschreibung).not.toMatch(/\.\s+\p{Lu}\p{L}{0,5}\.$/u);
  });
});

describe("Seitenkopf je Route", () => {
  it.each(SEITEN)("$pfad: Titel, Beschreibung, kanonische Adresse und Vorschaukarte", (seite) => {
    const kopf = pageHead(seite.pfad, { links: [{ rel: "stylesheet", href: "/x.css" }] });
    const url = seite.pfad === "/" ? `${SITE_ORIGIN}/` : SITE_ORIGIN + seite.pfad;
    expect(kopf.links).toEqual([
      { rel: "stylesheet", href: "/x.css" },
      { rel: "canonical", href: url },
    ]);
    expect(meta(seite.pfad).filter((eintrag) => "title" in eintrag)).toEqual([
      { title: seitenTitel(seite) },
    ]);
    expect(wert(seite.pfad, "name", "description")).toEqual([seite.beschreibung]);
    expect(wert(seite.pfad, "property", "og:title")).toEqual([seite.titel]);
    expect(wert(seite.pfad, "property", "og:description")).toEqual([seite.beschreibung]);
    expect(wert(seite.pfad, "property", "og:url")).toEqual([url]);
    expect(wert(seite.pfad, "property", "og:type")).toEqual(["website"]);
    expect(wert(seite.pfad, "name", "twitter:title")).toEqual([seite.titel]);
    expect(wert(seite.pfad, "name", "robots")).toEqual(seite.index ? [] : ["noindex, follow"]);
    // Eine Sprachfassung: kein hreflang, auch kein x-default.
    expect(JSON.stringify(kopf)).not.toMatch(/hreflang|x-default/i);
  });

  it("Bild der Vorschaukarte und twitter:card setzt die Wurzel für alle Seiten", () => {
    const wurzel = lies("src/routes/__root.tsx");
    expect(wurzel).toContain(
      '{ property: "og:image", content: "https://www.nexifyai.de/og/nexify-ai.png" }',
    );
    expect(wurzel).toContain('{ name: "twitter:card", content: "summary_large_image" }');
    expect(wurzel).toContain('{ name: "theme-color", content: "#1b1e1d" }');
    expect(wurzel).toContain('{ rel: "manifest", href: "/manifest.webmanifest" }');
    expect(wurzel).toContain('{ rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" }');
    expect(existsSync(path.join(REPO, "public/og/nexify-ai.png"))).toBe(true);
    expect(wurzel).not.toMatch(/hreflang/i);
  });
});

describe("Strukturierte Daten", () => {
  it("Organisation und Website: Pflichtfelder, wortgleich zum Impressum", () => {
    const ld = siteJsonLd();
    expect(JSON.parse(JSON.stringify(ld))).toEqual(ld);
    const [organisation, website] = graph(ld) as [Knoten, Knoten];
    expect(organisation["@type"]).toEqual(["Organization", "ProfessionalService"]);
    for (const feld of ["name", "url", "logo", "telephone", "email", "address", "contactPoint"])
      expect(organisation[feld], feld).toBeTruthy();
    expect(website).toMatchObject({
      "@type": "WebSite",
      name: "NeXify AI",
      url: `${SITE_ORIGIN}/`,
      inLanguage: "de",
    });
    expect(existsSync(path.join(REPO, "public/icons/icon-512.png"))).toBe(true);

    const impressum = lies("src/routes/impressum.tsx").replace(/\s+/g, " ");
    for (const angabe of [
      UNTERNEHMEN.firma,
      UNTERNEHMEN.inhaber,
      UNTERNEHMEN.strasse,
      `${UNTERNEHMEN.plz} ${UNTERNEHMEN.ort}`,
      UNTERNEHMEN.rechtsform,
      UNTERNEHMEN.register,
      `KvK-Nummer ${UNTERNEHMEN.kvkNummer}`,
      UNTERNEHMEN.ustId,
      KONTAKT.telefon,
      KONTAKT.email,
    ])
      expect(impressum, angabe).toContain(angabe);
    expect(KONTAKT.telefonLink).toBe("tel:" + KONTAKT.telefon.replace(/\s/g, ""));
    expect(impressum).toContain("Niederlande");
    expect(UNTERNEHMEN.land).toBe("NL");
  });

  it("Zielgebiet: nur Länder, die die Startseite sichtbar nennt", () => {
    expect(lies("src/routes/index.tsx")).toContain(
      "Unternehmen in Deutschland, den Niederlanden, Österreich und der Schweiz",
    );
    expect([...UNTERNEHMEN.zielLaender]).toEqual(["DE", "NL", "AT", "CH"]);
    const [organisation] = graph(siteJsonLd()) as [Knoten];
    // Ländernamen statt Kürzel; das Kürzel steht zusätzlich als Kennung dabei.
    expect(organisation["areaServed"]).toEqual([
      { "@type": "Country", name: "Deutschland", identifier: "DE" },
      { "@type": "Country", name: "Niederlande", identifier: "NL" },
      { "@type": "Country", name: "Österreich", identifier: "AT" },
      { "@type": "Country", name: "Schweiz", identifier: "CH" },
    ]);
  });

  it("nichts Unbelegtes: keine Bewertungen, Preise, Auszeichnungen oder Koordinaten", () => {
    expect(JSON.stringify(siteJsonLd())).not.toMatch(VERBOTEN);
    for (const seite of SEITEN)
      expect(JSON.stringify(pageJsonLd(seite.pfad)), seite.pfad).not.toMatch(VERBOTEN);
  });

  it.each(SEITEN)("$pfad: Seite, Pfad und Leistung", (seite) => {
    const eintrag = meta(seite.pfad).filter((m) => "script:ld+json" in m);
    expect(eintrag).toHaveLength(1);
    const ld = JSON.parse(JSON.stringify(eintrag[0]?.["script:ld+json"])) as Knoten;
    expect(ld["@context"]).toBe("https://schema.org");
    const knoten = graph(ld);
    const typen = knoten.map((k) => k["@type"]);
    const url = canonicalUrl(seite.pfad);

    const webseite = knoten[0] as Knoten;
    expect(webseite["@type"]).toBe(
      seite.typ === "kontakt"
        ? "ContactPage"
        : seite.typ === "unternehmen"
          ? "AboutPage"
          : "WebPage",
    );
    expect(webseite).toMatchObject({
      url,
      name: seite.titel,
      description: seite.beschreibung,
      inLanguage: "de",
    });

    if (seite.pfad === "/") expect(typen).not.toContain("BreadcrumbList");
    else {
      const pfad = knoten.find((k) => k["@type"] === "BreadcrumbList") as Knoten;
      const glieder = pfad["itemListElement"] as Knoten[];
      expect(glieder.length).toBeGreaterThanOrEqual(2);
      expect(glieder.map((g) => g["position"])).toEqual(glieder.map((_, i) => i + 1));
      expect(glieder[0]).toMatchObject({ name: "Startseite", item: `${SITE_ORIGIN}/` });
      expect(glieder.at(-1)).toMatchObject({ name: seite.kurz, item: url });
      // Jedes Glied ist eine vorhandene Seite; keine erfundenen Zwischenadressen wie /produkte.
      const bekannt = new Set(SEITEN.map((s) => canonicalUrl(s.pfad)));
      for (const glied of glieder)
        expect(bekannt.has(String(glied["item"])), String(glied["item"])).toBe(true);
    }

    const leistungen = knoten.filter((k) => k["@type"] === "Service");
    expect(leistungen).toHaveLength(seite.pfad.startsWith("/leistungen/") ? 1 : 0);
    for (const leistung of leistungen) {
      for (const feld of ["name", "serviceType", "description", "url", "provider", "areaServed"])
        expect(leistung[feld], feld).toBeTruthy();
      expect(leistung["provider"]).toEqual({ "@id": `${SITE_ORIGIN}/#organisation` });
    }
  });

  it("FAQPage steht nur dort, wo Fragen und Antworten sichtbar sind: auf der Startseite", () => {
    const mitFaq = ROUTEN_DATEIEN.filter((datei) => lies("src/routes", datei).includes("FAQPage"));
    expect(mitFaq).toEqual(["index.tsx"]);
    const start = lies("src/routes/index.tsx");
    // Dieselbe Liste speist die sichtbaren Überschriften und Absätze und das Markup.
    expect(start).toMatch(/mainEntity: HOME_FAQ\.map/);
    expect(start).toMatch(
      /\{HOME_FAQ\.map\(\(\{ q, a \}\) => \(\s*<li[^>]*>\s*<h3>\{q\}<\/h3>\s*<p>\{a\}<\/p>/,
    );
    for (const seite of SEITEN)
      expect(JSON.stringify(pageJsonLd(seite.pfad))).not.toContain("FAQPage");
  });
});

describe("Sitemap, robots.txt und llms.txt", () => {
  const sitemap = lies("public/sitemap.xml");
  const eintraege = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(
    ([, loc, lastmod]) => ({ loc: loc ?? "", lastmod: lastmod ?? "" }),
  );

  it("die Sitemap nennt genau die indexierbaren Seiten mit kanonischer Adresse", () => {
    expect(eintraege.map((e) => e.loc)).toEqual(
      INDEXIERBAR.map((seite) => canonicalUrl(seite.pfad)),
    );
    expect(sitemap.match(/<url>/g)).toHaveLength(INDEXIERBAR.length);
    for (const verboten of [
      "/anmelden",
      "/registrieren",
      "/passwort-vergessen",
      "/offline",
      "/api/",
      "teileklar",
    ])
      expect(sitemap).not.toContain(verboten);
  });

  it("jedes Änderungsdatum ist ein Datum, nicht in der Zukunft und nicht älter als der Stand in Git", () => {
    const heute = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    for (const [stelle, seite] of INDEXIERBAR.entries()) {
      const lastmod = eintraege[stelle]?.lastmod ?? "";
      expect(lastmod, seite.pfad).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(lastmod <= heute, `${seite.pfad}: ${lastmod}`).toBe(true);
      let git = "";
      try {
        git = execFileSync(
          "git",
          ["log", "-1", "--format=%cs", "--", `src/routes/${seite.datei}`],
          {
            cwd: REPO,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
          },
        ).trim();
      } catch {
        git = ""; // Ohne Git (Paket ohne Historie) entfällt der Vergleich.
      }
      if (git)
        expect(
          lastmod >= git,
          `${seite.pfad}: Sitemap ${lastmod}, Git ${git} – node tools/generate-sitemap.mjs`,
        ).toBe(true);
    }
  });

  it("robots.txt: Sitemap-Verweis, nur /api/ gesperrt, KI-Crawler in derselben Gruppe erlaubt", () => {
    const robots = lies("public/robots.txt");
    const zeilen = robots
      .split("\n")
      .map((z) => z.trim())
      .filter((z) => z && !z.startsWith("#"));
    expect(zeilen).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
    expect(zeilen.filter((z) => z.startsWith("Disallow:"))).toEqual(["Disallow: /api/"]);
    expect(zeilen).toContain("Allow: /");
    // Eine einzige Gruppe: Die Sperre von /api/ gilt damit auch für die namentlich Genannten.
    const agenten = zeilen
      .filter((z) => z.startsWith("User-agent:"))
      .map((z) => z.slice(11).trim());
    expect(agenten).toEqual(["*", "GPTBot", "ClaudeBot", "PerplexityBot"]);
    expect(zeilen.findIndex((z) => z.startsWith("Allow:"))).toBe(agenten.length);
  });

  it("llms.txt: nur vorhandene, indexierbare Adressen und die Angaben aus dem Impressum", () => {
    const llms = lies("public/llms.txt");
    const adressen = [...llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((m) => m[1] ?? "");
    const erlaubt = new Set(INDEXIERBAR.map((seite) => canonicalUrl(seite.pfad)));
    expect(adressen.length).toBeGreaterThan(15);
    for (const adresse of adressen) expect(erlaubt.has(adresse), adresse).toBe(true);
    expect(new Set(adressen).size).toBe(adressen.length);
    expect(llms).not.toMatch(/teileklar|shop|werkstatt/i);
    expect(llms).toContain("Kundencenter ist in Einrichtung");
    for (const angabe of [
      KONTAKT.telefon,
      KONTAKT.email,
      UNTERNEHMEN.strasse,
      UNTERNEHMEN.kvkNummer,
      UNTERNEHMEN.inhaber,
    ])
      expect(llms).toContain(angabe);
  });
});

it("Markenzusatz steht höchstens einmal im Titel", () => {
  for (const seite of SEITEN)
    expect(seitenTitel(seite).split(MARKENZUSATZ).length - 1).toBeLessThanOrEqual(1);
});

describe("Chat: keine Verfügbarkeitsbehauptung, solange er abgeschaltet ausgeliefert wird", () => {
  const stellen = [
    "public/llms.txt",
    "public/manifest.webmanifest",
    "src/lib/seo-pages.ts",
    "src/routes/produkte_.aifly-oracle.tsx",
    "src/routes/produkte_.nex-agentic-aifly.tsx",
  ];
  it.each(stellen)("%s behauptet nicht, ORACLE antworte im Chat dieser Website", (datei) => {
    const text = lies(datei).replace(/\s+/g, " ");
    expect(text).not.toMatch(/im Chat dieser Website antwortet/);
    expect(text).not.toMatch(/gibt es als Chat auf dieser Website/);
    expect(text).not.toMatch(/Im Chat hilft Ihnen/);
    expect(text).not.toMatch(/mit dem KI-Assistenten AIFly ORACLE"/);
  });
  it("die ORACLE-Seite nennt den Chat ausdrücklich als in Vorbereitung", () => {
    expect(lies("src/routes/produkte_.aifly-oracle.tsx").replace(/\s+/g, " ")).toMatch(
      /Der Chat auf dieser Website ist in Vorbereitung/,
    );
  });
});
