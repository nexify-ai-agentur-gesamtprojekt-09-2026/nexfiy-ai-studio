/**
 * Inquiry forms (contact, TEILEKLAR partner): field rules, German error messages and the e-mail hand-off.
 * Pure functions only, so the rules are testable and the page markup stays a thin view.
 */
export type InquiryKind = "contact" | "partner";

export interface InquiryValues {
  name: string;
  email: string;
  company: string;
  message: string;
  consent: boolean;
}

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

/** Order in which fields appear in the form; the first invalid one receives focus. */
export const INQUIRY_FIELD_ORDER: InquiryField[] = ["name", "email", "company", "message", "consent"];

export const INQUIRY_RECIPIENT = "mail@nexifyai.cloud";

interface InquiryProfile {
  companyRequired: boolean;
  companyLabel: string;
  subject: (values: InquiryValues) => string;
  intro: string;
}

const PROFILES: Record<InquiryKind, InquiryProfile> = {
  contact: {
    companyRequired: false,
    companyLabel: "Unternehmen",
    subject: (values) => `Projektanfrage von ${values.name}${values.company ? ` (${values.company})` : ""}`,
    intro: "Guten Tag Pascal,\n\nich möchte mein Vorhaben mit Ihnen besprechen.",
  },
  partner: {
    companyRequired: true,
    companyLabel: "Werkstatt / Betrieb",
    subject: (values) => `TEILEKLAR Partneranfrage: ${values.company || values.name}`,
    intro: "Guten Tag,\n\nwir möchten TEILEKLAR-Partnerwerkstatt werden.",
  },
};

export function isInquiryFieldRequired(kind: InquiryKind, field: InquiryField): boolean {
  return field === "company" ? PROFILES[kind].companyRequired : true;
}

export const MIN_MESSAGE_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeInquiry(raw: Partial<Record<InquiryField, unknown>>): InquiryValues {
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  return {
    name: text(raw.name).replace(/\s+/g, " "),
    email: text(raw.email).toLowerCase(),
    company: text(raw.company).replace(/\s+/g, " "),
    message: text(raw.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function readInquiryForm(form: HTMLFormElement): InquiryValues {
  const data = new FormData(form);
  return normalizeInquiry({
    name: data.get("name"),
    email: data.get("email"),
    company: data.get("company"),
    message: data.get("message"),
    consent: data.get("consent"),
  });
}

export function validateInquiryField(kind: InquiryKind, field: InquiryField, values: InquiryValues): string | undefined {
  switch (field) {
    case "name":
      if (!values.name) return "Bitte geben Sie Ihren Namen an.";
      if (values.name.length < 2) return "Bitte geben Sie Ihren vollständigen Namen an.";
      return undefined;
    case "email":
      if (!values.email) return "Bitte geben Sie Ihre E-Mail-Adresse an.";
      if (!EMAIL_PATTERN.test(values.email)) return "Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@firma.de.";
      return undefined;
    case "company":
      if (PROFILES[kind].companyRequired && !values.company) return "Bitte nennen Sie Ihre Werkstatt oder Ihren Betrieb.";
      return undefined;
    case "message":
      if (!values.message) return "Bitte beschreiben Sie kurz Ihr Anliegen.";
      if (values.message.length < MIN_MESSAGE_LENGTH) return "Ein, zwei Sätze genügen – bitte etwas ausführlicher.";
      return undefined;
    case "consent":
      if (!values.consent) return "Bitte stimmen Sie zu, damit wir Ihre Anfrage bearbeiten dürfen.";
      return undefined;
  }
}

export function validateInquiry(kind: InquiryKind, values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  for (const field of INQUIRY_FIELD_ORDER) {
    const message = validateInquiryField(kind, field, values);
    if (message) errors[field] = message;
  }
  return errors;
}

export function firstInvalidField(errors: InquiryErrors): InquiryField | undefined {
  return INQUIRY_FIELD_ORDER.find((field) => errors[field]);
}

export function errorSummary(errors: InquiryErrors): string {
  const count = Object.keys(errors).length;
  return count === 1 ? "Bitte prüfen Sie eine Angabe." : `Bitte prüfen Sie ${count} Angaben.`;
}

export interface InquiryMail {
  subject: string;
  body: string;
  href: string;
  /** True when the message was too long for a mail link and the full text must be pasted from the clipboard. */
  shortened: boolean;
}

/** Mail links longer than this fail in some mail programs; longer bodies are shortened with a hint. */
export const MAX_MAILTO_LENGTH = 1900;

export function composeInquiryText(kind: InquiryKind, values: InquiryValues): string {
  const profile = PROFILES[kind];
  const lines = [profile.intro, "", values.message, "", "—", `Name: ${values.name}`, `E-Mail: ${values.email}`];
  if (values.company) lines.push(`${profile.companyLabel}: ${values.company}`);
  lines.push("", "Einwilligung zur Bearbeitung der Anfrage: erteilt");
  return lines.join("\n");
}

export function buildInquiryMail(kind: InquiryKind, values: InquiryValues): InquiryMail {
  const subject = PROFILES[kind].subject(values);
  const body = composeInquiryText(kind, values);
  const link = (text: string) =>
    `mailto:${INQUIRY_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  let href = link(body);
  if (href.length <= MAX_MAILTO_LENGTH) return { subject, body, href, shortened: false };
  const note = "\n\n[Nachricht gekürzt – bitte den vollständigen Text aus der Zwischenablage einfügen.]";
  let cut = body.length;
  while (cut > 0 && link(body.slice(0, cut) + "…" + note).length > MAX_MAILTO_LENGTH) cut -= 50;
  href = link(body.slice(0, Math.max(0, cut)) + "…" + note);
  return { subject, body, href, shortened: true };
}
