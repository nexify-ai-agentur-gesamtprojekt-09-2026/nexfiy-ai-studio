/**
 * Stand des Kundencenters auf /anmelden, /registrieren und /passwort-vergessen.
 * Warum: Die Seiten zeigten Formulare ohne Gegenstelle. Solange es keine Anmeldung gibt, steht hier
 * der tatsächliche Stand mit den Kontaktwegen aus /kontakt und /impressum – ein Baustein für alle
 * drei Seiten, damit der Wortlaut nicht auseinanderläuft.
 */
export function KundencenterHinweis() {
  return (
    <div className={"tk-form tk-auth"}>
      <p className={"nx-konto-lead"}>
        Das NeXify-Kundencenter wird derzeit eingerichtet. Zugänge vergeben wir persönlich je Kunde.
        Bis dahin erreichen Sie uns direkt.
      </p>
      <a
        className={"nexify-control primary-button hc-finish-primary tk-cta"}
        data-variant="primary"
        href="/kontakt"
      >
        Zur Kontaktseite
      </a>
      <div className={"tk-actions"}>
        <p>
          <span>E-Mail:</span> <a href="mailto:mail@nexifyai.cloud">mail@nexifyai.cloud</a>
        </p>
        <p>
          <span>Telefon:</span> <a href="tel:+31613318856">+31 6 133 188 56</a>
        </p>
        <p className={"nx-konto-hinweis"}>
          <a href="/datenschutz">Datenschutz</a>
        </p>
      </div>
    </div>
  );
}
