/** This independent site copy has no chat backend. Never imply that a message was sent. */
export function ChatUnavailable() {
  return (
    <div className="chat-availability">
      <p className="connection-note orientation-status" role="status">
        Der KI-Chat ist hier noch nicht angebunden. Es werden keine Chat-Nachrichten gesendet.
        Nutzen Sie für Ihr Anliegen bitte das Kontaktformular. Es öffnet Ihr E-Mail-Programm.
      </p>
      <a className="hc-text-link" href="/kontakt#anfrage">
        Anliegen persönlich besprechen
      </a>
    </div>
  );
}
