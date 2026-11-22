import { createFileRoute, notFound } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import {
  Abschluss,
  Abschnitt,
  PassendeLeistungen,
  Pfeil,
} from "@/components/site/RegionenBausteine";
import capturedCSS from "../styles/pages/wissen.projekt-vorbereiten.css?url";
import regionenCSS from "../styles/site-regionen.css?url";
import { datumText, heuteInDeutschland, naechsterTermin } from "@/lib/feiertage";
import { BUNDESLAENDER, FEIERTAG_NAMEN, type Bundesland } from "@/lib/regionen-daten";
import { pageHead } from "@/lib/seo";

/**
 * Eine Vorlage für die 16 Länderseiten. Inhalt kommt ausschließlich aus der Datentabelle
 * src/lib/regionen-daten.ts; ein unbekannter Adressteil ergibt 404 (keine Seite für erfundene
 * Orte, keine Weiterleitung).
 */
export const Route = createFileRoute("/regionen_/$land")({
  loader: ({ params }) => {
    const land = BUNDESLAENDER.find((eintrag) => eintrag.slug === params.land);
    if (!land) throw notFound();
    // Der Tag kommt vom Server mit, damit Browser und Server dieselben Termine zeigen.
    return { slug: land.slug, heute: heuteInDeutschland() };
  },
  head: ({ params }) =>
    BUNDESLAENDER.some((eintrag) => eintrag.slug === params.land)
      ? pageHead(`/regionen/${params.land}`, {
          links: [
            { rel: "stylesheet", href: capturedCSS },
            { rel: "stylesheet", href: regionenCSS },
          ],
        })
      : {},
  staticData: {
    importedDocument: {
      html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties },
      body: {},
    },
  },
  component: Land,
});

function Land() {
  const { slug, heute } = Route.useLoaderData();
  const land = BUNDESLAENDER.find((eintrag) => eintrag.slug === slug) as Bundesland;
  const termine = land.feiertage
    .map((tag) => ({ ...tag, datum: naechsterTermin(tag.id, heute) }))
    .sort((a, b) => a.datum.getTime() - b.datum.getTime());
  const teilweise = land.feiertage.filter((tag) => tag.teilweise);
  const im = `in ${land.name}`;
  return (
    <NexifyShell>
      <div className={"home-concept page-concept layout-article context-nexify nxr-seite"}>
        <section className={"identity-hero"} aria-labelledby="land-titel">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <a href="/regionen">Regionen</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">{land.name}</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Regionen
                <span aria-hidden="true"> / </span>
                {land.name}
              </span>
              <h1 id="land-titel">Websites und KI für Unternehmen {im}.</h1>
              <p className={"identity-body"}>
                Die Zusammenarbeit mit NeXify AI läuft überwiegend online. Hier stehen Feiertage und
                Datenschutzaufsicht {im} für Ihr Projekt.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/kontakt"
                >
                  <span>Vorhaben schildern</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/regionen"
                >
                  Alle Bundesländer
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={"pc-sections"}>
          <Abschnitt
            id="land-feiertage"
            nummer="01 / 02"
            titel={`Feiertage ${im}, die Ihre Abläufe betreffen`}
          >
            <p>
              Zusätzlich zu den bundesweiten Feiertagen{" "}
              {land.feiertage.length === 1 ? "gilt" : "gelten"} {im}{" "}
              {land.feiertage.length === 1
                ? "ein weiterer Tag"
                : `${land.feiertage.length} weitere Tage`}
              . Die nächsten Termine:
            </p>
            <ul className={"nxr-fakten"}>
              {termine.map((tag) => (
                <li key={tag.id}>
                  <span className={"nxr-fakt-name"}>{FEIERTAG_NAMEN[tag.id]}</span>
                  <span className={"nxr-fakt-wert"}>
                    <time dateTime={tag.datum.toISOString().slice(0, 10)}>
                      {datumText(tag.datum)}
                    </time>
                    {tag.teilweise ? ` – ${tag.teilweise}` : ""}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              Eine Online-Terminbuchung, automatische Erinnerungen oder eine Antwortfrist, die diese
              Tage nicht kennt, bietet Termine an freien Tagen an oder rechnet Fristen falsch. In
              Projekten mit Terminen oder Fristen hinterlegen wir deshalb die Feiertage des Landes,
              in dem Ihr Betrieb arbeitet
              {teilweise.length
                ? `; Tage, die nur in einem Teil des Landes gelten (${teilweise.map((tag) => FEIERTAG_NAMEN[tag.id]).join(", ")}), stimmen wir auf Ihre Gemeinde ab.`
                : "."}
            </p>
            <div className={"hc-service-detail pc-module"}>
              <a className={"hc-text-link"} href="/leistungen/agenten-automatisierung">
                Automatisierung mit KI ansehen
                <Pfeil richtung="rechts" />
              </a>
            </div>
          </Abschnitt>
          <Abschnitt
            id="land-aufsicht"
            nummer="02 / 02"
            titel={`Datenschutzaufsicht für Unternehmen ${im}`}
          >
            <p>
              Zuständige Aufsichtsbehörde für Unternehmen mit Sitz {im}:{" "}
              <strong>{land.aufsicht.name}</strong> ({land.aufsicht.kurz}). Sie ist Ansprechstelle
              für Fragen zu Kontaktformularen, Kundendaten und dem Einsatz von KI in Ihrem Betrieb.
            </p>
            <p>
              <a className={"hc-text-link"} href={land.aufsicht.url} rel="noopener">
                Zur Website der Behörde ({land.aufsicht.kurz})
                <Pfeil richtung="schraeg" />
              </a>
            </p>
            <p>
              Wie NeXify AI selbst mit Daten umgeht, steht in der{" "}
              <a href="/datenschutz">Datenschutzerklärung</a>; wie wir KI einsetzen, in den{" "}
              <a href="/ki-hinweise">KI-Hinweisen</a>. Eine Rechtsberatung ersetzt beides nicht.
            </p>
          </Abschnitt>
        </div>
        <PassendeLeistungen id="land-leistungen" />
        <Abschluss id="land-abschluss" />
      </div>
    </NexifyShell>
  );
}
