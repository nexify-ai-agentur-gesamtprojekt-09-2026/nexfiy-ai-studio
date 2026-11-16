import { useId, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { submitPartInquiry } from "@/lib/part-inquiry.functions";
import { PART_LIMITS, normalizePartInquiry, validatePartInquiry, type PartInquiryErrors, type PartInquiryField } from "@/lib/part-inquiry";

export function PartInquiryForm({ initialPart = "" }: { initialPart?: string }) {
  const id = useId();
  const submit = useServerFn(submitPartInquiry);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<PartInquiryErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const file = fd.get("attachment");
    const meta = file instanceof File && file.size > 0 ? { size: file.size, type: file.type } : null;
    const local = validatePartInquiry(normalizePartInquiry(Object.fromEntries(fd.entries())), meta);
    setErrors(local); setFailure(null);
    if (Object.keys(local).length) { formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus(); return; }
    setPending(true);
    try {
      const result = await submit({ data: fd });
      if (result.ok) setReference(result.reference);
      else { setErrors(result.errors ?? {}); setFailure(result.error ?? null); }
    } catch (error) {
      console.error(error);
      setFailure("Die Verbindung ist fehlgeschlagen. Ihre Angaben sind noch im Formular.");
    } finally { setPending(false); }
  }

  const f = (name: PartInquiryField) => ({ id: `${id}-${name}`, name, "aria-invalid": errors[name] ? true : undefined, "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined, disabled: pending });
  const err = (name: PartInquiryField) => errors[name] ? <p className="tk-field-error" id={`${id}-${name}-error`}>{errors[name]}</p> : null;

  if (reference) return <section className="tk-success inquiry-handoff" aria-live="polite">
    <h2>Ihre Teilefrage ist eingegangen.</h2>
    <p>Vorgangsnummer <strong>{reference}</strong>. Wir prüfen Ihre Angaben und melden uns per E-Mail. Eine Verfügbarkeit oder Passung ist damit noch nicht bestätigt.</p>
  </section>;

  return <form ref={formRef} className="tk-form" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
    <header className="inquiry-form-heading"><h2 id={`${id}-title`}>Teilefrage senden</h2><p className="tk-meta">Pflichtfelder sind mit * markiert.</p></header>
    {failure ? <p className="inquiry-summary" role="alert">{failure}</p> : null}
    <div className="tk-form-grid">
      <div className="tk-field"><label htmlFor={`${id}-name`}>Name *</label><input {...f("name")} required autoComplete="name" maxLength={PART_LIMITS.name} />{err("name")}</div>
      <div className="tk-field"><label htmlFor={`${id}-email`}>E-Mail *</label><input {...f("email")} required type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={PART_LIMITS.email} />{err("email")}</div>
      <div className="tk-field"><label htmlFor={`${id}-vehicle`}>Fahrzeug (Marke, Modell, Baujahr) *</label><input {...f("vehicle")} required maxLength={PART_LIMITS.vehicle} />{err("vehicle")}</div>
      <div className="tk-field"><label htmlFor={`${id}-part`}>Gesuchtes Teil oder Nummer *</label><input {...f("part")} required maxLength={PART_LIMITS.part} defaultValue={initialPart.slice(0, PART_LIMITS.part)} />{err("part")}</div>
      <div className="tk-field is-wide"><label htmlFor={`${id}-message`}>Weitere Angaben</label><textarea {...f("message")} rows={4} maxLength={PART_LIMITS.message} />{err("message")}</div>
      <div className="tk-field is-wide"><label htmlFor={`${id}-attachment`}>Foto oder Dokument (optional, bis 10 MB)</label><input {...f("attachment")} type="file" accept="image/jpeg,image/png,image/webp,image/heic,application/pdf" /><p className="tk-meta">JPG, PNG, WebP, HEIC oder PDF, z. B. Fahrzeugschein ohne persönliche Daten oder ein Foto des Teils.</p>{err("attachment")}</div>
    </div>
    <div className="tk-consent"><label className="tk-check"><input {...f("consent")} required type="checkbox" /><span>Ich bin einverstanden, dass meine Angaben und der Anhang zur Bearbeitung meiner Teilefrage gespeichert werden. Details in der <a href="/datenschutz">Datenschutzerklärung</a>. *</span></label>{err("consent")}</div>
    <div className="tk-actions"><Button variant="brand" type="submit" className="nexify-control primary-button hc-finish-primary" data-variant="primary" disabled={pending}>{pending ? "Wird gesendet …" : "Teilefrage senden"}</Button></div>
  </form>;
}
