import { MARKENZUSATZ, SEITEN, seitenTitel, type Seite } from "./seo-pages";
import { KONTAKT, SITE_NAME, SITE_ORIGIN, UNTERNEHMEN } from "./site-facts";

// 2026-11-19 21:00 (Europe/Berlin): Kanonische URL zentral, damit jede Seite genau eine
// canonical-Angabe bekommt. Grund: der Audit gegen www.nexifyai.de fand 0/43 Seiten mit
// canonical; ohne sie konkurrieren .de, www-Variante und alte .cloud-Links in der Suche.
export { SITE_ORIGIN };
export { MARKENZUSATZ, SEITEN, seitenTitel, type Seite };

export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "/" : "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  return SITE_ORIGIN + clean;
}

export function canonicalLink(path: string) {
  return { rel: "canonical", href: canonicalUrl(path) };
}

export const ORGANISATION_ID = `${SITE_ORIGIN}/#organisation`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
/** Sprache der Inhalte. Es gibt genau eine Sprachfassung, deshalb setzt keine Seite hreflang. */
export const SPRACHE = "de";

export function seite(pfad: string): Seite {
  const gefunden = SEITEN.find((eintrag) => eintrag.pfad === pfad);
  if (!gefunden) throw new Error(`Seite ${pfad} fehlt in src/lib/seo-pages.ts`);
  return gefunden;
}

type JsonLd = Record<string, unknown>;

const zielLaender = () =>
  UNTERNEHMEN.zielLaender.map((code) => ({
    "@type": "Country",
    name: UNTERNEHMEN.zielLaenderNamen[code],
    identifier: code,
  }));

/**
 * Organisation und Website, auf jeder Seite gleich (src/routes/__root.tsx). Alle Angaben stehen
 * sichtbar im Impressum; `geo`, Bewertungen, Preise und Auszeichnungen gibt es bewusst nicht.
 * `ProfessionalService` zusätzlich zu `Organization`: ein Dienstleister mit Geschäftsanschrift.
 */
export function siteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORGANISATION_ID,
        name: UNTERNEHMEN.name,
        legalName: UNTERNEHMEN.firma,
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/icons/icon-512.png`,
        image: `${SITE_ORIGIN}/og/nexify-ai.png`,
        email: KONTAKT.email,
        telephone: KONTAKT.telefon,
        vatID: UNTERNEHMEN.ustId,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "KvK",
          name: UNTERNEHMEN.register,
          value: UNTERNEHMEN.kvkNummer,
        },
        founder: { "@type": "Person", name: UNTERNEHMEN.inhaber },
        address: {
          "@type": "PostalAddress",
          streetAddress: UNTERNEHMEN.strasse,
          postalCode: UNTERNEHMEN.plz,
          addressLocality: UNTERNEHMEN.ort,
          addressCountry: UNTERNEHMEN.land,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: KONTAKT.telefon,
          email: KONTAKT.email,
          url: canonicalUrl("/kontakt"),
          availableLanguage: [SPRACHE],
        },
        areaServed: zielLaender(),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        inLanguage: SPRACHE,
        publisher: { "@id": ORGANISATION_ID },
      },
    ],
  };
}

/** Pfad einer Seite von der Startseite an, für BreadcrumbList. */
export function seitenPfad(eintrag: Seite): Seite[] {
  const kette = [eintrag];
  let aktuell = eintrag;
  while (aktuell.pfad !== "/") {
    aktuell = seite(aktuell.eltern ?? "/");
    kette.unshift(aktuell);
  }
  return kette;
}

const SEITEN_TYP: Partial<Record<Seite["typ"], string>> = {
  kontakt: "ContactPage",
  unternehmen: "AboutPage",
};

/**
 * Strukturierte Daten einer Seite: die Seite selbst, ihr Pfad (außer auf der Startseite) und auf
 * Leistungsseiten die Leistung. `FAQPage` entsteht nicht hier, sondern dort, wo Fragen und
 * Antworten sichtbar auf der Seite stehen (Startseite, src/routes/index.tsx).
 */
export function pageJsonLd(pfad: string): JsonLd {
  const eintrag = seite(pfad);
  const url = canonicalUrl(pfad);
  const kette = seitenPfad(eintrag);
  const graph: JsonLd[] = [
    {
      "@type": SEITEN_TYP[eintrag.typ] ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: eintrag.titel,
      description: eintrag.beschreibung,
      inLanguage: SPRACHE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANISATION_ID },
      ...(kette.length > 1 ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
      // Regionalseiten: das Gebiet, von dem die Seite handelt. Bewusst kein LocalBusiness und
      // keine Anschrift im Land: NeXify AI hat dort keinen Standort.
      ...(eintrag.region
        ? {
            spatialCoverage: {
              "@type": "AdministrativeArea",
              name: eintrag.region.name,
              identifier: eintrag.region.code,
              containedInPlace: { "@type": "Country", name: "Deutschland", identifier: "DE" },
            },
          }
        : {}),
    },
  ];
  if (kette.length > 1)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: kette.map((glied, stelle) => ({
        "@type": "ListItem",
        position: stelle + 1,
        name: glied.kurz,
        item: canonicalUrl(glied.pfad),
      })),
    });
  if (eintrag.leistung)
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: eintrag.leistung.name,
      serviceType: eintrag.leistung.art,
      description: eintrag.beschreibung,
      url,
      provider: { "@id": ORGANISATION_ID },
      areaServed: zielLaender(),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}

type HeadLink = Record<string, string>;

/**
 * Seitenkopf einer Route: Titel, Beschreibung, kanonische Adresse, Vorschaukarte und
 * strukturierte Daten aus src/lib/seo-pages.ts. `links` sind die eigenen Verweise der Route
 * (Stylesheet, Vorabladen); die kanonische Adresse kommt dahinter.
 * Bild der Vorschaukarte, `og:site_name`, `og:locale` und `twitter:card` setzt die Wurzel
 * (src/routes/__root.tsx) für alle Seiten gleich.
 */
export function pageHead(pfad: string, optionen: { links?: HeadLink[] } = {}) {
  const eintrag = seite(pfad);
  const url = canonicalUrl(pfad);
  return {
    links: [...(optionen.links ?? []), canonicalLink(pfad)],
    meta: [
      { title: seitenTitel(eintrag) },
      { name: "description", content: eintrag.beschreibung },
      ...(eintrag.index ? [] : [{ name: "robots", content: "noindex, follow" }]),
      { property: "og:title", content: eintrag.titel },
      { property: "og:description", content: eintrag.beschreibung },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: eintrag.titel },
      { name: "twitter:description", content: eintrag.beschreibung },
      { "script:ld+json": pageJsonLd(pfad) },
    ],
  };
}
