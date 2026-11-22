import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import {
  Abschluss,
  Abschnitt,
  PassendeLeistungen,
  Pfeil,
} from "@/components/site/RegionenBausteine";
import capturedCSS from "../styles/pages/wissen.projekt-vorbereiten.css?url";
import regionenCSS from "../styles/site-regionen.css?url";
import { BUNDESLAENDER, feiertagKurz } from "@/lib/regionen-daten";
import { pageHead, seite } from "@/lib/seo";

export const Route = createFileRoute("/regionen")({
  head: () =>
    pageHead("/regionen", {
      links: [
        { rel: "stylesheet", href: capturedCSS },
        { rel: "stylesheet", href: regionenCSS },
      ],
    }),
  staticData: {
    importedDocument: {
      html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties },
      body: {},
    },
  },
  component: Regionen,
});

function Regionen() {
  return (
    <NexifyShell>
      <div className={"home-concept page-concept layout-article context-nexify nxr-seite"}>
        <section className={"identity-hero"} aria-labelledby="regionen-titel">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Regionen</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Regionen
              </span>
              <h1 id="regionen-titel">Feiertage und Datenschutzaufsicht je Bundesland.</h1>
              <p className={"identity-body"}>{seite("/regionen").beschreibung}</p>
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
                  href="#regionen-laender"
                >
                  Bundesland wählen
                </a>
              </div>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#regionen-zusammenarbeit">
            So läuft die Zusammenarbeit
            <Pfeil richtung="unten" />
          </a>
          <a href="#regionen-laender">
            Die 16 Bundesländer
            <Pfeil richtung="unten" />
          </a>
          <a href="#regionen-quellen">
            Quellen und Stand
            <Pfeil richtung="unten" />
          </a>
        </nav>
        <div className={"pc-sections"}>
          <Abschnitt
            id="regionen-zusammenarbeit"
            nummer="01 / 03"
            titel="So läuft die Zusammenarbeit"
          >
            <p>
              NeXify AI ist die Agentur von Pascal Courbois in Venlo, Niederlande. Eine weitere
              Geschäftsadresse gibt es nicht – weder in Deutschland noch anderswo. Die
              Zusammenarbeit läuft deshalb überwiegend online.
            </p>
            <ol className={"nxr-schritte"}>
              <li>
                <strong>Anfrage.</strong> Über das Kontaktformular, per E-Mail oder telefonisch.
              </li>
              <li>
                <strong>Erstgespräch.</strong> Am Telefon oder im Videogespräch: Was soll sich
                ändern, und was ist der Rahmen?
              </li>
              <li>
                <strong>Angebot.</strong> Vor dem Start steht ein Angebot mit abgegrenztem Umfang;
                externe Kosten sind getrennt ausgewiesen.
              </li>
              <li>
                <strong>Umsetzung und Übergabe.</strong> Sie sehen Entwürfe früh, geben frei und
                erhalten am Ende die Übergabe.
              </li>
            </ol>
            <div className={"hc-service-detail pc-module"}>
              <a className={"hc-text-link"} href="/wissen">
                So arbeiten wir – vom Gespräch bis zur Übergabe
                <Pfeil richtung="rechts" />
              </a>
            </div>
          </Abschnitt>
          <Abschnitt
            id="regionen-laender"
            nummer="02 / 03"
            titel="Was je Bundesland verschieden ist"
          >
            <p>
              Zwei Dinge unterscheiden sich von Land zu Land und spielen in Website- und
              KI-Projekten eine Rolle: die gesetzlichen Feiertage – wichtig für Terminbuchung,
              Erinnerungen und Fristen – und die Datenschutzaufsicht, die für Unternehmen im Land
              zuständig ist. Die Seite Ihres Bundeslands nennt beides mit den nächsten Terminen.
            </p>
            <ul className={"nxr-laender"} aria-label="Bundesländer">
              {BUNDESLAENDER.map((land) => (
                <li key={land.slug}>
                  <a className={"nxr-land"} href={`/regionen/${land.slug}`}>
                    <span className={"nxr-land-name"}>{land.name}</span>
                    <span className={"nxr-land-fakt"}>
                      Zusätzlich frei: {land.feiertage.map(feiertagKurz).join(", ")}
                    </span>
                    <span className={"nxr-land-fakt"}>Aufsicht: {land.aufsicht.kurz}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Abschnitt>
          <Abschnitt id="regionen-quellen" nummer="03 / 03" titel="Quellen und Stand">
            <p>
              Feiertage: Feiertagsgesetze der Länder, Stand 22. November 2026. Genannt sind nur
              Tage, die zusätzlich zu den bundesweiten Feiertagen gelten und auf einen Werktag
              fallen können. Datenschutzaufsicht: Websites der Behörden, abgerufen am 22. November
              2026.
            </p>
            <p>
              „(teilweise)“ heißt: Der Tag gilt nicht im ganzen Land, sondern nur in bestimmten
              Gemeinden. Wo genau, steht auf der Seite des Landes.
            </p>
            <p>
              Diese Angaben helfen bei der Planung und ersetzen keine Rechtsberatung. Verbindlich
              sind die Gesetze und Bekanntmachungen des jeweiligen Landes.
            </p>
          </Abschnitt>
        </div>
        <PassendeLeistungen id="regionen-leistungen" />
        <Abschluss id="regionen-abschluss" />
      </div>
    </NexifyShell>
  );
}
