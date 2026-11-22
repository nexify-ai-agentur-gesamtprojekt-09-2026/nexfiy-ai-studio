import { useId, type ReactNode } from "react";
import formsCSS from "../../styles/site-forms.css?url";
import { useInquiryForm } from "@/hooks/use-inquiry-form";
import { CopyButton } from "@/components/system/CopyButton";
import {
  INQUIRY_RECIPIENT,
  errorSummary,
  isInquiryFieldRequired,
  type InquiryField,
  type InquiryKind,
} from "@/lib/inquiry";

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

export interface InquiryFormProps {
  kind: InquiryKind;
  title: string;
  companyLabel: string;
  privacyHref: string;
  messageLabel?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: ReactNode;
}

/**
 * Inquiry form in the captured NeXify markup (tk-form, tk-field, tk-check). Valid inquiries open the
 * visitor's e-mail program with the finished message to the NeXify inbox; this copy has no own form backend.
 */
export function InquiryForm({
  kind,
  title,
  companyLabel,
  privacyHref,
  messageLabel = "Ihr Anliegen",
  submitLabel = "Anfrage senden",
  // Der Versand geht an den Server; "Fast geschafft." war die Copy des E-Mail-Handoffs und ist
  // nach dem belegten Eingang falsch.
  successTitle = "Anfrage eingegangen.",
  successBody,
}: InquiryFormProps) {
  const form = useInquiryForm(kind);
  const titleId = useId();
  const handoffTitleId = useId();
  const hintId = useId();
  const label = (field: InquiryField, text: string) => (
    <label htmlFor={form.inputId(field)} className="tk-field-label">
      {text}
      {isInquiryFieldRequired(kind, field) ? " *" : ""}
    </label>
  );
  const error = (field: InquiryField) =>
    form.errors[field] ? (
      <span id={form.errorId(field)} className="tk-field-error">
        {ERROR_ICON}
        {form.errors[field]}
      </span>
    ) : null;

  return (
    <>
      <link rel="stylesheet" href={formsCSS} precedence="site-forms" />
      <form
        ref={form.formRef}
        onSubmit={form.onSubmit}
        onChange={form.onChange}
        className="tk-form"
        action="/api/anfrage"
        method="post"
        noValidate
        aria-labelledby={titleId}
        hidden={form.mail !== null || form.nummer !== null}
      >
        <h2 id={titleId}>{title}</h2>
        <p className="tk-meta">Pflichtfelder sind mit * markiert.</p>
        {/* Der Serverpfad braucht die Art im Rumpf; ohne JS greift genau dieses Feld. */}
        <input type="hidden" name="kind" value={kind} />
        <div role="status" aria-live="polite">
          {form.hasErrors ? (
            <p className="inquiry-summary">
              {ERROR_ICON}
              {errorSummary(form.errors)}
            </p>
          ) : null}
        </div>
        <div className="tk-form-grid">
          <div className="tk-field">
            {label("name", "Name")}
            <input {...form.fieldProps("name")} autoComplete="name" maxLength={100} />
            {error("name")}
          </div>
          <div className="tk-field">
            {label("email", "E-Mail")}
            <input
              {...form.fieldProps("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={160}
            />
            {error("email")}
          </div>
          <div className="tk-field">
            {label("company", companyLabel)}
            <input {...form.fieldProps("company")} autoComplete="organization" maxLength={120} />
            {error("company")}
          </div>
          <div className="tk-field is-wide">
            {label("message", messageLabel)}
            <textarea {...form.fieldProps("message")} rows={5} maxLength={4000} />
            {error("message")}
          </div>
        </div>
        <div className="tk-consent">
          <label className="tk-check">
            <input {...form.fieldProps("consent")} type="checkbox" />
            <span>
              Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert
              werden. Details in der <a href={privacyHref}>Datenschutzerklärung</a>. *
            </span>
          </label>
          {error("consent")}
        </div>
        <div className="tk-actions">
          <button
            type="submit"
            className="nexify-control primary-button hc-finish-primary"
            data-variant="primary"
            aria-describedby={hintId}
            disabled={form.senden}
          >
            {form.senden ? "Wird gesendet …" : submitLabel}
          </button>
          <p id={hintId} className="inquiry-hint">
            Ihre Anfrage geht direkt bei uns ein. Sie erhalten sofort eine Anfrage-Nummer.
          </p>
        </div>
      </form>

      {form.nummer ? (
        <section className="tk-success inquiry-handoff" aria-labelledby={handoffTitleId}>
          <span className="inquiry-handoff-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h2 id={handoffTitleId} ref={form.handoffRef} tabIndex={-1}>
            {successTitle}
          </h2>
          <p>
            Ihre Anfrage ist bei uns eingegangen. Die Nummer lautet{" "}
            <strong className="inquiry-nummer">{form.nummer}</strong>. Wir melden uns persönlich.
          </p>
          <div className="tk-actions">
            <button type="button" className="hc-text-link" onClick={form.editAgain}>
              Weitere Anfrage stellen
            </button>
          </div>
        </section>
      ) : null}

      {form.fehler ? (
        <p className="inquiry-summary" role="alert">
          {ERROR_ICON}
          {form.fehler}
          {form.mail ? (
            <>
              {" "}
              <a className="hc-text-link" href={form.mail.href}>
                E-Mail jetzt öffnen
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      {form.mail && !form.fehler ? (
        <section className="tk-success inquiry-handoff" aria-labelledby={handoffTitleId}>
          <span className="inquiry-handoff-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h2 id={handoffTitleId} ref={form.handoffRef} tabIndex={-1}>
            {successTitle}
          </h2>
          <p>
            {successBody ?? (
              <>
                Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage an {INQUIRY_RECIPIENT}.
                Bitte dort nur noch auf „Senden“ tippen – wir melden uns persönlich.
              </>
            )}
          </p>
          {form.mail.shortened ? (
            <p className="tk-meta">
              Ihre Nachricht war für den direkten Weg zu lang. Der vollständige Text liegt in Ihrer
              Zwischenablage – bitte in die E-Mail einfügen.
            </p>
          ) : null}
          <p className="tk-meta">
            Kein E-Mail-Programm zur Hand? Kopieren Sie den Text und senden Sie ihn an{" "}
            {INQUIRY_RECIPIENT}.
          </p>
          <div className="tk-actions">
            <a
              className="nexify-control primary-button hc-finish-primary"
              data-variant="primary"
              href={form.mail.href}
            >
              E-Mail erneut öffnen
            </a>
            <CopyButton
              className="hc-text-link"
              text={`An: ${INQUIRY_RECIPIENT}\nBetreff: ${form.mail.subject}\n\n${form.mail.body}`}
            />
            <button type="button" className="hc-text-link" onClick={form.editAgain}>
              Angaben bearbeiten
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
