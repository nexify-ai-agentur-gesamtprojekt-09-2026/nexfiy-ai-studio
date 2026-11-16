import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/system/CopyButton";
import {
  CONTACT_FORM_ANCHOR,
  CONTACT_FORM_PATH,
  CONTACT_HANDOFF_EVENT,
  composeOracleHandoff,
  writeContactHandoff,
} from "@/lib/contact-handoff";
import type { OracleMessage } from "@/lib/use-oracle-advice";

type Stage = "offer" | "review" | "failed";

/**
 * Offer to continue an ORACLE conversation as a project inquiry. The visitor first reviews exactly what is
 * transferred and then confirms; the draft only prefills the contact form and is never submitted from here.
 */
export function OracleHandoff({
  messages,
  onTransferred,
}: {
  messages: readonly OracleMessage[];
  /** Called after a confirmed transfer, e.g. to close the phone dialog so the form is visible. */
  onTransferred?: () => void;
}) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("offer");
  const titleId = useId();
  const noteId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const offerRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef<"heading" | "offer" | null>(null);
  const text = useMemo(() => composeOracleHandoff(messages), [messages]);

  useEffect(() => {
    const target = moveFocus.current;
    moveFocus.current = null;
    if (target === "heading") headingRef.current?.focus();
    else if (target === "offer") offerRef.current?.focus();
  }, [stage]);

  if (!text) return null;

  const open = (next: Stage, focus: "heading" | "offer") => {
    moveFocus.current = focus;
    setStage(next);
  };

  const transfer = () => {
    try {
      writeContactHandoff(window.sessionStorage, "oracle", text);
    } catch (error) {
      console.error("oracle handoff could not be stored", error);
      open("failed", "heading");
      return;
    }
    setStage("offer");
    onTransferred?.();
    if (window.location.pathname === CONTACT_FORM_PATH) {
      window.dispatchEvent(new Event(CONTACT_HANDOFF_EVENT));
    } else {
      void navigate({ to: CONTACT_FORM_PATH, hash: CONTACT_FORM_ANCHOR });
    }
  };

  return (
    <section className="oracle-handoff" aria-labelledby={titleId} data-stage={stage}>
      {stage === "offer" ? (
        <>
          <h3 id={titleId}>Mit Pascal weitersprechen</h3>
          <p>
            Übernehmen Sie Ihre Angaben aus dieser Beratung als Entwurf in das Kontaktformular.
            Gesendet wird nur, was Sie dort selbst abschicken.
          </p>
          <Button
            ref={offerRef}
            variant="outline"
            type="button"
            className="oracle-handoff-action"
            onClick={() => open("review", "heading")}
          >
            Als Projektanfrage vorbereiten
            <ArrowRight aria-hidden="true" />
          </Button>
        </>
      ) : null}
      {stage === "review" ? (
        <>
          <h3 id={titleId} ref={headingRef} tabIndex={-1}>
            Diesen Entwurf übernehmen?
          </h3>
          <p id={noteId}>
            Übernommen werden nur Ihre eigenen Nachrichten und der vorgeschlagene Einstieg, keine
            Antworttexte von ORACLE. Name und E-Mail ergänzen Sie im Formular.
          </p>
          <div
            className="oracle-handoff-preview"
            role="region"
            aria-label="Vorschau des Entwurfs"
            aria-describedby={noteId}
            tabIndex={0}
          >
            {text}
          </div>
          <p className="oracle-handoff-meta">
            Der Entwurf bleibt bis zum Absenden in diesem Browserfenster und wird nicht automatisch
            übermittelt.
          </p>
          <div className="oracle-handoff-actions">
            <Button
              variant="brand"
              type="button"
              className="oracle-handoff-confirm"
              onClick={transfer}
            >
              In Kontaktformular übernehmen
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="oracle-handoff-back"
              onClick={() => open("offer", "offer")}
            >
              Zurück
            </Button>
          </div>
        </>
      ) : null}
      {stage === "failed" ? (
        <div role="alert">
          <h3 id={titleId} ref={headingRef} tabIndex={-1}>
            Übernahme nicht möglich
          </h3>
          <p>
            Ihr Browser lässt die Übergabe an das Formular hier nicht zu. Kopieren Sie den Entwurf
            und fügen Sie ihn im Kontaktformular ein.
          </p>
          <div className="oracle-handoff-preview" role="region" aria-label="Entwurf" tabIndex={0}>
            {text}
          </div>
          <div className="oracle-handoff-actions">
            <CopyButton text={text} label="Entwurf kopieren" />
            <Button variant="outline" asChild>
              <a href={`${CONTACT_FORM_PATH}#${CONTACT_FORM_ANCHOR}`}>
                Zum Kontaktformular
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
