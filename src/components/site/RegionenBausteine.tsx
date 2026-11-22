import type { ReactNode } from "react";

/**
 * Bausteine der Regionalseiten (/regionen und /regionen/<land>). Sie nutzen die vorhandenen
 * Klassen der übernommenen Seiten (hc-, pc-) für Kopf, Abschnitte, Themenkarten und Abschluss;
 * nur die Länderliste und die Faktenblöcke haben eigene Stile in src/styles/site-regionen.css
 * (Präfix nxr-).
 */

export function Pfeil({ richtung }: { richtung: "rechts" | "unten" | "schraeg" }) {
  const pfad =
    richtung === "rechts"
      ? "M4 12h16M13 5l7 7-7 7"
      : richtung === "unten"
        ? "M12 4v16M5 13l7 7 7-7"
        : "M5 19 19 5M5 5h14v14";
  return (
    <svg
      className={"hc-arrow"}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={pfad} />
    </svg>
  );
}

export function Abschnitt({
  id,
  nummer,
  titel,
  children,
}: {
  id: string;
  nummer: string;
  titel: string;
  children: ReactNode;
}) {
  return (
    <section
      className={"hc-intro hc-container pc-section"}
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-titel`}
    >
      <div>
        <span className={"hc-kicker"}>{nummer}</span>
        <h2 id={`${id}-titel`}>{titel}</h2>
      </div>
      <div className={"pc-section-body"}>{children}</div>
    </section>
  );
}

const LEISTUNGEN = [
  {
    href: "/leistungen/websites",
    titel: "Eine Website, die Ihr Angebot erklärt.",
    text: "Seitenstruktur, Texte, Gestaltung und Technik aus einem Konzept – mit einem klaren Weg zur Anfrage.",
  },
  {
    href: "/leistungen/agenten-automatisierung",
    titel: "Routine abgeben. Kontrolle behalten.",
    text: "KI übernimmt einen benannten Schritt in Ihrem Ablauf, etwa Anfragen zuordnen oder Entwürfe schreiben. Entscheidungen bleiben bei Ihnen.",
  },
  {
    href: "/leistungen/apps-portale",
    titel: "Portale und Apps für Ihren Ablauf.",
    text: "Kundenportal, interne Anwendung oder Partnerbereich: ein Ort für den Vorgang statt Postfach, Telefon und Listen.",
  },
];

export function PassendeLeistungen({ id }: { id: string }) {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby={`${id}-titel`}
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Leistungen</span>
          <h2 id={`${id}-titel`}>Woran wir mit Ihnen arbeiten</h2>
        </div>
        <p>Dieselben Leistungen, egal in welchem Bundesland Ihr Unternehmen sitzt.</p>
      </header>
      <ol>
        {LEISTUNGEN.map((leistung) => (
          <li key={leistung.href}>
            <span className={"hc-kicker"}>NeXify AI</span>
            <h3>
              <a href={leistung.href}>
                {leistung.titel}
                <Pfeil richtung="schraeg" />
              </a>
            </h3>
            <p>{leistung.text}</p>
            <a
              aria-label={`${leistung.titel} – Seite ansehen`}
              className={"hc-text-link"}
              href={leistung.href}
            >
              Seite ansehen
              <Pfeil richtung="rechts" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Abschluss({ id }: { id: string }) {
  return (
    <section className={"hc-section hc-finish hc-container"} aria-labelledby={`${id}-titel`}>
      <div className={"hc-finish-heading"}>
        <span className={"hc-kicker"}>Ihr nächster Schritt</span>
        <h2 id={`${id}-titel`}>Wie möchten Sie fortfahren?</h2>
      </div>
      <div className={"hc-finish-next"}>
        <p>
          Beschreiben Sie Ihr Vorhaben in wenigen Sätzen. Pascal meldet sich persönlich mit einem
          klaren nächsten Schritt.
        </p>
        <div className={"hc-finish-actions"}>
          <a className={"hc-finish-primary"} href="/kontakt">
            Vorhaben schildern
            <Pfeil richtung="rechts" />
          </a>
          <a className={"hc-text-link"} href="/preise-ablauf">
            Preise und Ablauf
            <Pfeil richtung="rechts" />
          </a>
        </div>
      </div>
    </section>
  );
}
