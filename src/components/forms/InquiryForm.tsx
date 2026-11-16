import { useId, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useInquiryForm } from "@/hooks/use-inquiry-form";
import { CopyButton } from "@/components/system/CopyButton";
import { INQUIRY_LIMITS, INQUIRY_RECIPIENT, errorSummary, isInquiryFieldRequired, type InquiryField, type InquiryKind } from "@/lib/inquiry";

const ERROR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" focusable="false">
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
  initialMessage?: string;
}

/**
 * Inquiry form in the captured TEILEKLAR/NeXify markup (tk-form, tk-field, tk-check). Valid inquiries open the
 * visitor's e-mail program with the finished message to the NeXify inbox; this copy has no own form backend.
 */
export function InquiryForm({
  kind,
  title,
  companyLabel,
  privacyHref,
  messageLabel = "Ihr Anliegen",
  submitLabel = "E-Mail vorbereiten",
  successTitle = "Ihre Anfrage ist vorbereitet.",
  successBody,
  initialMessage = "",
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
      <form
        ref={form.formRef}
        onSubmit={form.onSubmit}
        onChange={form.onChange}
        className="tk-form"
        method="post"
        noValidate
        aria-labelledby={titleId}
        hidden={form.mail !== null}
      >
        <header className="inquiry-form-heading"><h2 id={titleId}>{title}</h2>
        <p className="tk-meta">Pflichtfelder sind mit * markiert.</p></header>
        {form.hasErrors ? <div role="status" aria-live="polite">
            <p className="inquiry-summary">
              {ERROR_ICON}
              {errorSummary(form.errors)}
            </p>
        </div> : null}
        <div className="tk-form-grid">
          <div className="tk-field">
            {label("name", "Name")}
            <input {...form.fieldProps("name")} required autoComplete="name" maxLength={INQUIRY_LIMITS.name} />
            {error("name")}
          </div>
          <div className="tk-field">
            {label("email", "E-Mail")}
            <input {...form.fieldProps("email")} required type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={INQUIRY_LIMITS.email} />
            {error("email")}
          </div>
          <div className="tk-field">
            {label("company", companyLabel)}
            <input {...form.fieldProps("company")} required={isInquiryFieldRequired(kind, "company")} autoComplete="organization" maxLength={INQUIRY_LIMITS.company} />
            {error("company")}
          </div>
          <div className="tk-field is-wide">
            {label("message", messageLabel)}
            <textarea {...form.fieldProps("message")} required rows={6} maxLength={INQUIRY_LIMITS.message} defaultValue={initialMessage} />
            {error("message")}
          </div>
        </div>
        <div className="tk-consent">
          <label className="tk-check">
            <input {...form.fieldProps("consent")} required type="checkbox" />
            <span>
              Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner E-Mail-Anfrage verwendet werden. Details in der{" "}
              <a href={privacyHref}>Datenschutzerklärung</a>. *
            </span>
          </label>
          {error("consent")}
        </div>
        <div className="tk-actions">
          <Button variant="brand" type="submit" className="nexify-control primary-button hc-finish-primary" data-variant="primary" aria-describedby={hintId}>
            {submitLabel}
          </Button>
          <p id={hintId} className="inquiry-hint">
            Öffnet Ihr E-Mail-Programm mit der fertigen Anfrage an {INQUIRY_RECIPIENT}.
          </p>
        </div>
      </form>

      {form.mail ? (
        <section className="tk-success inquiry-handoff" aria-labelledby={handoffTitleId}>
          <span className="inquiry-handoff-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
              <path d="M4 5h16v14H4zM4 5l8 7 8-7" />
            </svg>
          </span>
          <h2 id={handoffTitleId} ref={form.handoffRef} tabIndex={-1}>
            {successTitle}
          </h2>
          <p>
            {form.mail.shortened ? "Kopieren Sie zuerst den vollständigen Text. Öffnen Sie anschließend die E-Mail und ersetzen Sie dort den gekürzten Inhalt." : successBody ?? (
              <>
                Der Link zu Ihrem E-Mail-Programm wurde geöffnet. Prüfen und versenden Sie die Nachricht dort selbst.
              </>
            )}
          </p>
          <p className="tk-meta">Diese Website hat nichts versendet. Empfänger: {INQUIRY_RECIPIENT}.</p>
          <details className="inquiry-preview" open={form.mail.shortened || undefined}>
            <summary>Vollständigen E-Mail-Entwurf ansehen</summary>
            <label htmlFor={`${titleId}-draft`}>Anfrageentwurf</label>
            <textarea id={`${titleId}-draft`} readOnly rows={8} value={`An: ${INQUIRY_RECIPIENT}\nBetreff: ${form.mail.subject}\n\n${form.mail.body}`} onFocus={(event) => event.currentTarget.select()} />
          </details>
          <div className="tk-actions">
            <Button variant="brand" asChild><a className="nexify-control primary-button hc-finish-primary" data-variant="primary" href={form.mail.href}>
              E-Mail öffnen
            </a></Button>
            <CopyButton className="hc-text-link" text={`An: ${INQUIRY_RECIPIENT}\nBetreff: ${form.mail.subject}\n\n${form.mail.body}`} />
            <Button variant="ghost" type="button" className="hc-text-link" onClick={form.editAgain}>
              Angaben bearbeiten
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}
