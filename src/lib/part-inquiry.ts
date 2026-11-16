/** TEILEKLAR part inquiries: pure field and attachment rules shared by form and server. */
export const PART_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;
export const PART_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
] as const;
export const PART_LIMITS = {
  name: 100,
  email: 160,
  vehicle: 160,
  part: 160,
  message: 2000,
} as const;

export interface PartInquiryValues {
  name: string;
  email: string;
  vehicle: string;
  part: string;
  message: string;
  consent: boolean;
}
export type PartInquiryField = keyof PartInquiryValues | "attachment";
export type PartInquiryErrors = Partial<Record<PartInquiryField, string>>;
export interface AttachmentMeta {
  size: number;
  type: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function normalizePartInquiry(raw: Record<string, unknown>): PartInquiryValues {
  return {
    name: text(raw["name"]).replace(/\s+/g, " "),
    email: text(raw["email"]).toLowerCase(),
    vehicle: text(raw["vehicle"]),
    part: text(raw["part"]),
    message: text(raw["message"]),
    consent: raw["consent"] === true || raw["consent"] === "on" || raw["consent"] === "true",
  };
}

export function validateAttachment(file: AttachmentMeta | null): string | undefined {
  if (!file || file.size === 0) return undefined;
  if (file.size > PART_ATTACHMENT_MAX_BYTES) return "Die Datei ist größer als 10 MB.";
  if (!(PART_ATTACHMENT_TYPES as readonly string[]).includes(file.type))
    return "Erlaubt sind JPG, PNG, WebP, HEIC oder PDF.";
  return undefined;
}

export function validatePartInquiry(
  v: PartInquiryValues,
  file: AttachmentMeta | null,
): PartInquiryErrors {
  const e: PartInquiryErrors = {};
  if (!v.name) e.name = "Bitte geben Sie Ihren Namen an.";
  else if (v.name.length > PART_LIMITS.name) e.name = "Der Name ist zu lang.";
  if (!EMAIL.test(v.email) || v.email.length > PART_LIMITS.email)
    e.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (v.vehicle.length < 3 || v.vehicle.length > PART_LIMITS.vehicle)
    e.vehicle = "Bitte nennen Sie Marke, Modell und Baujahr.";
  if (v.part.length < 2 || v.part.length > PART_LIMITS.part)
    e.part = "Bitte nennen Sie das gesuchte Teil.";
  if (v.message.length > PART_LIMITS.message) e.message = "Die Nachricht ist zu lang.";
  if (!v.consent) e.consent = "Bitte bestätigen Sie die Einwilligung.";
  const a = validateAttachment(file);
  if (a) e.attachment = a;
  return e;
}
