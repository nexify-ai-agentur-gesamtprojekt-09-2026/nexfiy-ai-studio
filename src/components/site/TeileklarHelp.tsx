import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/system/CopyButton";
import {
  CONTACT_FORM_ANCHOR,
  CONTACT_FORM_PATH,
  writeContactHandoff,
} from "@/lib/contact-handoff";

/** Public topic navigation and an explicit contact handoff, not a parts-matching AI. */
export function TeileklarHelp({
  open,
  mobile,
  onClose,
}: {
  open: boolean;
  mobile: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");
  const [handoffFailed, setHandoffFailed] = useState(false);
  return (
    <aside
      id="aifly-panel"
      className="aifly-panel oracle-advice"
      aria-label="TEILEKLAR Hilfe"
      role={mobile ? "dialog" : undefined}
      aria-modal={mobile && open ? true : undefined}
      hidden={!open}
    >
      <div className="oracle-heading">
        <div className="oracle-heading-copy">
          <div className="oracle-identity">
            <span className="oracle-companion">
              <img
                src="/site-assets/9176c58a16ff634a.png"
                alt=""
                aria-hidden="true"
                width="40"
                height="40"
              />
            </span>
            <h2>
              <strong>TEILEKLAR Hilfe</strong>
              <span>Fahrzeug · Teile · Werkstatt</span>
            </h2>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Beratung einklappen"
          title="Hilfe schließen"
          onClick={onClose}
        >
          <ChevronDown aria-hidden="true" />
        </Button>
      </div>
      <div className="oracle-body">
        <section className="oracle-layout" aria-label="Ihr nächster Schritt">
          <div className="tk-help-content">
            <div className="oracle-intro">
              <h3>Worum geht es?</h3>
              <p>
                Fahrzeugdaten und eine vorhandene Teilenummer helfen bei Ihrer Anfrage. Diese Hilfe
                bestätigt weder Passung noch Termine; dafür sind Hersteller oder die gewählte
                Werkstatt zuständig.
              </p>
            </div>
            <nav className="oracle-starters" aria-label="Hilfe auswählen">
              {[
                ["Fahrzeug & Teil", "/teileklar/fahrzeug-und-passung"],
                ["Werkstatt-Anfrage", "/teileklar/termine"],
                ["Zusammenarbeit", "/teileklar/partner-werden"],
              ].map(([title, path]) => (
                <Button key={path} variant="ghost" className="oracle-starter" asChild>
                  <a href={path}>
                    <span>{title}</span>
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </nav>
          </div>
          <form
            className="tk-help-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.trim()) return;
              // Free text stays out of the address bar; the contact page reads it once from this tab.
              try {
                writeContactHandoff(window.sessionStorage, "teileklar-help", draft);
              } catch (error) {
                console.error("teileklar help handoff could not be stored", error);
                setHandoffFailed(true);
                return;
              }
              setHandoffFailed(false);
              void navigate({ to: CONTACT_FORM_PATH, hash: CONTACT_FORM_ANCHOR });
            }}
          >
            <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
            <Textarea
              id="orientation-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={1000}
              rows={4}
              required
              placeholder="Fahrzeug, Teilenummer und Frage"
            />
            <Button variant="glass" type="submit" disabled={!draft.trim()}>
              Anfrage vorbereiten
              <ArrowRight aria-hidden="true" />
            </Button>
            {handoffFailed ? (
              <div className="tk-help-failure" role="alert">
                <p>
                  Ihr Browser lässt die Übergabe an das Formular hier nicht zu. Kopieren Sie den Text
                  und fügen Sie ihn im Kontaktformular ein.
                </p>
                <CopyButton text={draft.trim()} label="Text kopieren" />
                <a href={`${CONTACT_FORM_PATH}#${CONTACT_FORM_ANCHOR}`}>Zum Kontaktformular</a>
              </div>
            ) : null}
          </form>
          <p className="oracle-note">
            Keine automatische Teileprüfung. Keine Passwörter oder Zahlungsdaten eingeben.{" "}
            <a href="/datenschutz">Datenschutz</a>
          </p>
        </section>
      </div>
    </aside>
  );
}
