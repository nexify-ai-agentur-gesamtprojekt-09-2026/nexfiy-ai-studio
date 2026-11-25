import { useId, useRef, useState } from "react";
import formsCSS from "../../styles/site-forms.css?url";
import { KOEDER_FELD, sendeAnfrage } from "@/lib/anfrage";
import { validateInquiry } from "@/lib/inquiry";
import {
  BERATUNG_AUSWAHL,
  BERATUNG_FORMATE,
  BERATUNG_GROESSEN,
  BERATUNG_LEER,
  beratungNachricht,
  pruefeBeratung,
  type BeratungAngaben,
} from "@/lib/beratung";

const ERROR_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </svg>
);

type Feld =
  "company" | "vorname" | "nachname" | "email" | "ziel" | "bereiche" | "telefon" | "consent";

const REIHENFOLGE: Feld[] = [
  "company",
  "vorname",
  "nachname",
  "email",
  "bereiche",
  "ziel",
  "telefon",
  "consent",
];

/**
 * Beratungsanfrage. Nutzt denselben Eingang wie das Kontaktformular (`/api/anfrage`), damit keine
 * zweite Zustellstrecke mit eigenen Fehlerwegen entsteht. Die Zusatzangaben werden als lesbarer
 * Block über den freien Text gesetzt (siehe `beratungNachricht`).
 */
export function BeratungForm({ privacyHref = "/datenschutz" }: { privacyHref?: string }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [werte, setWerte] = useState({
    company: "",
    vorname: "",
    nachname: "",
    email: "",
    consent: false,
  });
  const [angaben, setAngaben] = useState<BeratungAngaben>(BERATUNG_LEER);
  const [ziel, setZiel] = useState("");
  const [fehler, setFehler] = useState<Partial<Record<Feld, string>>>({});
  const [laeuft, setLaeuft] = useState(false);
  const [nummer, setNummer] = useState<string | null>(null);
  const [gesamt, setGesamt] = useState<string | null>(null);
  const koeder = useRef<HTMLInputElement>(null);
  const zusammenfassung = useRef<HTMLDivElement>(null);

  const setze = (feld: keyof typeof werte) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setWerte((w) => ({
      ...w,
      [feld]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const setzeAngabe = <K extends keyof BeratungAngaben>(feld: K, wert: BeratungAngaben[K]) =>
    setAngaben((a) => ({ ...a, [feld]: wert }));

  const bereichUmschalten = (titel: string) =>
    setAngaben((a) => ({
      ...a,
      bereiche: a.bereiche.includes(titel)
        ? a.bereiche.filter((b) => b !== titel)
        : [...a.bereiche, titel],
    }));

  async function absenden(e: React.FormEvent) {
    e.preventDefault();
    setGesamt(null);
    const name = `${werte.vorname.trim()} ${werte.nachname.trim()}`.trim();
    const nachricht = beratungNachricht(ziel, angaben);

    const eigene: Partial<Record<Feld, string>> = {};
    if (!werte.vorname.trim()) eigene.vorname = "Bitte geben Sie Ihren Vornamen an.";
    if (!werte.nachname.trim()) eigene.nachname = "Bitte geben Sie Ihren Nachnamen an.";
    if (!werte.company.trim()) eigene.company = "Bitte geben Sie Ihr Unternehmen an.";
    Object.assign(eigene, pruefeBeratung(ziel, angaben) as Partial<Record<Feld, string>>);

    const gemeinsam = validateInquiry("beratung", {
      name,
      email: werte.email,
      company: werte.company,
      message: nachricht,
      consent: werte.consent,
    }) as Partial<Record<Feld, string>>;
    const alle: Partial<Record<Feld, string>> = { ...gemeinsam, ...eigene };
    // Reihenfolge: erst das oberste fehlende Feld melden, nicht alle gleichzeitig anspringen.
    const erstes = REIHENFOLGE.find((f) => alle[f]);
    if (erstes) {
      setFehler(alle);
      setGesamt("Bitte prüfen Sie die markierten Felder.");
      const zielEl =
        document.getElementById(id(erstes)) ?? document.getElementById(id("bereiche-feld"));
      zielEl?.focus();
      return;
    }

    setFehler({});
    setLaeuft(true);
    const ergebnis = await sendeAnfrage(
      "beratung",
      {
        name,
        email: werte.email,
        company: werte.company,
        message: nachricht,
        consent: werte.consent,
      },
      12_000,
      koeder.current?.value ?? "",
    );
    setLaeuft(false);
    if (ergebnis.nummer) setNummer(ergebnis.nummer);
    else setGesamt(ergebnis.fehler ?? "Die Anfrage konnte gerade nicht angenommen werden.");
  }

  if (nummer) {
    return (
      <div className="tk-form tk-form-erfolg" role="status" aria-live="polite">
        <h3 className="tk-form-title">Vielen Dank für Ihre Beratungsanfrage.</h3>
        <p>
          Wir prüfen Ihre Angaben und stimmen die passende Beratung sowie einen Termin persönlich
          mit Ihnen ab.
        </p>
        <p className="tk-form-nummer">
          Ihre Anfragenummer: <strong>{nummer}</strong>
        </p>
        <p className="tk-form-hinweis">
          Bitte notieren Sie die Nummer. Sie erhalten zusätzlich eine Bestätigung per E-Mail.
        </p>
      </div>
    );
  }

  const feldFehler = (f: Feld) =>
    fehler[f] ? (
      <span id={id(`${f}-fehler`)} className="tk-field-error">
        {ERROR_ICON}
        {fehler[f]}
      </span>
    ) : null;
  const aria = (f: Feld) => ({
    "aria-invalid": fehler[f] ? true : undefined,
    "aria-describedby": fehler[f] ? id(`${f}-fehler`) : undefined,
  });

  return (
    <form className="tk-form" onSubmit={absenden} noValidate>
      <link rel="stylesheet" href={formsCSS} />
      <h3 className="tk-form-title">Beratungstag anfragen</h3>
      <p className="tk-form-intro">
        Je genauer Sie Ihre Ausgangslage schildern, desto konkreter kann der Tag geplant werden.
        Pflichtfelder sind mit * markiert.
      </p>

      {gesamt ? (
        <div className="tk-form-fehler" role="alert">
          <p>{gesamt}</p>
        </div>
      ) : null}

      <div className="tk-grid">
        <div className="tk-field">
          <label htmlFor={id("company")} className="tk-field-label">
            Unternehmen *
          </label>
          <input
            id={id("company")}
            className="tk-input"
            value={werte.company}
            onChange={setze("company")}
            autoComplete="organization"
            {...aria("company")}
          />
          {feldFehler("company")}
        </div>
        <div className="tk-field">
          <label htmlFor={id("vorname")} className="tk-field-label">
            Vorname *
          </label>
          <input
            id={id("vorname")}
            className="tk-input"
            value={werte.vorname}
            onChange={setze("vorname")}
            autoComplete="given-name"
            {...aria("vorname")}
          />
          {feldFehler("vorname")}
        </div>
        <div className="tk-field">
          <label htmlFor={id("nachname")} className="tk-field-label">
            Nachname *
          </label>
          <input
            id={id("nachname")}
            className="tk-input"
            value={werte.nachname}
            onChange={setze("nachname")}
            autoComplete="family-name"
            {...aria("nachname")}
          />
          {feldFehler("nachname")}
        </div>
        <div className="tk-field">
          <label htmlFor={id("email")} className="tk-field-label">
            Geschäftliche E-Mail-Adresse *
          </label>
          <input
            id={id("email")}
            className="tk-input"
            type="email"
            value={werte.email}
            onChange={setze("email")}
            autoComplete="email"
            inputMode="email"
            {...aria("email")}
          />
          {feldFehler("email")}
        </div>
        <div className="tk-field">
          <label htmlFor={id("telefon")} className="tk-field-label">
            Telefon (optional)
          </label>
          <input
            id={id("telefon")}
            className="tk-input"
            type="tel"
            value={angaben.telefon}
            onChange={(e) => setzeAngabe("telefon", e.target.value)}
            autoComplete="tel"
            {...aria("telefon")}
          />
          {feldFehler("telefon")}
        </div>
        <div className="tk-field">
          <label htmlFor={id("branche")} className="tk-field-label">
            Branche (optional)
          </label>
          <input
            id={id("branche")}
            className="tk-input"
            value={angaben.branche}
            onChange={(e) => setzeAngabe("branche", e.target.value)}
          />
        </div>
        <div className="tk-field">
          <label htmlFor={id("groesse")} className="tk-field-label">
            Unternehmensgröße (optional)
          </label>
          <select
            id={id("groesse")}
            className="tk-input"
            value={angaben.groesse}
            onChange={(e) => setzeAngabe("groesse", e.target.value)}
          >
            <option value="">Keine Angabe</option>
            {BERATUNG_GROESSEN.map((g) => (
              <option key={g} value={`${g} Mitarbeitende`}>
                {g} Mitarbeitende
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset
        id={id("bereiche-feld")}
        className="tk-field"
        aria-describedby={fehler.bereiche ? id("bereiche-fehler") : undefined}
      >
        <legend className="tk-field-label">Gewünschte Beratungsbereiche *</legend>
        <div className="tk-check grid">
          {BERATUNG_AUSWAHL.map((titel) => (
            <label key={titel} className="tk-check-label">
              <input
                type="checkbox"
                checked={angaben.bereiche.includes(titel)}
                onChange={() => bereichUmschalten(titel)}
              />
              <span>{titel}</span>
            </label>
          ))}
        </div>
        {fehler.bereiche ? (
          <span id={id("bereiche-fehler")} className="tk-field-error">
            {ERROR_ICON}
            {fehler.bereiche}
          </span>
        ) : null}
      </fieldset>

      <div className="tk-field">
        <label htmlFor={id("ziel")} className="tk-field-label">
          Ihre Ziele und Herausforderungen *
        </label>
        <textarea
          id={id("ziel")}
          className="tk-input"
          rows={5}
          maxLength={2000}
          value={ziel}
          onChange={(e) => setZiel(e.target.value)}
          {...aria("ziel")}
        />
        <span className="tk-field-hinweis">{ziel.length}/2000 Zeichen</span>
        {feldFehler("ziel")}
      </div>

      <div className="tk-field">
        <label htmlFor={id("systeme")} className="tk-field-label">
          Bereits eingesetzte KI- oder Softwaresysteme (optional)
        </label>
        <input
          id={id("systeme")}
          className="tk-input"
          value={angaben.systeme}
          onChange={(e) => setzeAngabe("systeme", e.target.value)}
        />
      </div>

      <div className="tk-grid">
        <fieldset className="tk-field">
          <legend className="tk-field-label">Bevorzugtes Format</legend>
          <div className="tk-check">
            {BERATUNG_FORMATE.map((f) => (
              <label key={f} className="tk-check-label">
                <input
                  type="radio"
                  name={id("format")}
                  checked={angaben.format === f}
                  onChange={() => setzeAngabe("format", f)}
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="tk-field">
          <label htmlFor={id("zeitraum")} className="tk-field-label">
            Gewünschter Zeitraum (optional)
          </label>
          <input
            id={id("zeitraum")}
            className="tk-input"
            placeholder="z. B. Januar oder Q1 2027"
            value={angaben.zeitraum}
            onChange={(e) => setzeAngabe("zeitraum", e.target.value)}
          />
        </div>
        <div className="tk-field">
          <label htmlFor={id("tage")} className="tk-field-label">
            Gewünschte Beratungstage
          </label>
          <select
            id={id("tage")}
            className="tk-input"
            value={angaben.tage}
            onChange={(e) => setzeAngabe("tage", e.target.value)}
          >
            {["1", "2", "3", "4", "5"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value="mehr als 5">mehr als 5</option>
          </select>
        </div>
      </div>

      <div className="tk-field">
        <input
          type="checkbox"
          name={KOEDER_FELD}
          ref={koeder}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="tk-koeder"
        />
      </div>

      <label className="tk-check-label tk-consent">
        <input
          id={id("consent")}
          type="checkbox"
          checked={werte.consent}
          onChange={setze("consent")}
          {...aria("consent")}
        />
        <span>
          Ich habe die <a href={privacyHref}>Datenschutzhinweise</a> gelesen und bin mit der
          Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden. *
        </span>
      </label>
      {feldFehler("consent")}

      <label className="tk-check-label tk-consent">
        <input
          type="checkbox"
          checked={angaben.werbung}
          onChange={(e) => setzeAngabe("werbung", e.target.checked)}
        />
        <span>
          Ich möchte künftig Informationen zu KI-Themen von NeXify AI erhalten (freiwillig,
          jederzeit widerruflich).
        </span>
      </label>

      <button className="nexify-control primary-button tk-submit" type="submit" disabled={laeuft}>
        <span>{laeuft ? "Wird gesendet …" : "Beratungstag anfragen"}</span>
        <span aria-hidden="true">→</span>
      </button>
      <p className="tk-form-hinweis">
        Der Beratungstag kostet {""}
        <strong>449 € netto</strong>, zuzüglich gegebenenfalls anwendbarer Umsatzsteuer. Weitere
        Tage werden separat vereinbart.
      </p>
      <div ref={zusammenfassung} aria-live="polite" className="visually-hidden" />
    </form>
  );
}
