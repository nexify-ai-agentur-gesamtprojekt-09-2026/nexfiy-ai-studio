/** Arbeitsplatz-Posteingang: vereinheitlicht Kontakt- und Teilefragen, Statusregeln und Filter – rein und testbar. */
import { inquiryReference, type NoticeKind } from "./inquiry-notification";

export const INQUIRY_STATUSES = ["neu", "in_bearbeitung", "erledigt", "archiviert"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
export type InboxFilter = InquiryStatus | "offen" | "alle";

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
  erledigt: "Erledigt",
  archiviert: "Archiviert",
};

export const KIND_LABELS: Record<NoticeKind, string> = {
  contact: "Projektanfrage",
  partner: "Partneranfrage",
  appointment: "Terminwunsch",
  voucher: "Gutscheinfrage",
  part: "Teilefrage",
};

export interface GeneralInquiryRow {
  id: string;
  created_at: string;
  kind: string;
  name: string;
  email: string;
  company: string;
  message: string;
  source_path: string;
  status: string;
  slack_notified_at: string | null;
  slack_error: string | null;
}
export interface PartInquiryRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  vehicle: string;
  part: string;
  message: string;
  status: string;
  slack_notified_at: string | null;
  slack_error: string | null;
  attachment_path: string | null;
  attachment_name: string | null;
  attachment_size: number | null;
}

export interface InboxItem {
  id: string;
  table: "inquiries" | "teileklar_part_inquiries";
  reference: string;
  kind: NoticeKind;
  createdAt: string;
  status: InquiryStatus;
  name: string;
  email: string;
  details: { label: string; value: string }[];
  message: string;
  slack: { state: "gemeldet" | "fehler" | "offen"; error?: string };
  attachment: { path: string; name: string; size: number } | null;
}

const KINDS: NoticeKind[] = ["contact", "partner", "appointment", "voucher"];

export function asStatus(value: string): InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value) ? (value as InquiryStatus) : "neu";
}

function slackState(row: {
  slack_notified_at: string | null;
  slack_error: string | null;
}): InboxItem["slack"] {
  if (row.slack_notified_at) return { state: "gemeldet" };
  if (row.slack_error) return { state: "fehler", error: row.slack_error };
  return { state: "offen" };
}

export function toInboxItems(general: GeneralInquiryRow[], parts: PartInquiryRow[]): InboxItem[] {
  const items: InboxItem[] = [
    ...general.map((row): InboxItem => ({
      id: row.id,
      table: "inquiries",
      reference: inquiryReference(row.id),
      kind: KINDS.find((kind) => kind === row.kind) ?? "contact",
      createdAt: row.created_at,
      status: asStatus(row.status),
      name: row.name,
      email: row.email,
      details: [
        ...(row.company
          ? [{ label: row.kind === "partner" ? "Betrieb" : "Unternehmen", value: row.company }]
          : []),
        ...(row.source_path ? [{ label: "Gesendet von", value: row.source_path }] : []),
      ],
      message: row.message,
      slack: slackState(row),
      attachment: null,
    })),
    ...parts.map((row): InboxItem => ({
      id: row.id,
      table: "teileklar_part_inquiries",
      reference: inquiryReference(row.id),
      kind: "part",
      createdAt: row.created_at,
      status: asStatus(row.status),
      name: row.name,
      email: row.email,
      details: [
        { label: "Fahrzeug", value: row.vehicle },
        { label: "Gesuchtes Teil", value: row.part },
      ],
      message: row.message,
      slack: slackState(row),
      attachment: row.attachment_path
        ? {
            path: row.attachment_path,
            name: row.attachment_name ?? "Anhang",
            size: row.attachment_size ?? 0,
          }
        : null,
    })),
  ];
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function matchesFilter(item: InboxItem, filter: InboxFilter): boolean {
  if (filter === "alle") return true;
  if (filter === "offen") return item.status === "neu" || item.status === "in_bearbeitung";
  return item.status === filter;
}

export function countByFilter(items: InboxItem[]): Record<InboxFilter, number> {
  const filters: InboxFilter[] = ["offen", ...INQUIRY_STATUSES, "alle"];
  return Object.fromEntries(
    filters.map((filter) => [filter, items.filter((item) => matchesFilter(item, filter)).length]),
  ) as Record<InboxFilter, number>;
}

export function replyHref(item: InboxItem): string {
  const subject = `Ihre ${KIND_LABELS[item.kind]} · Vorgang ${item.reference}`;
  return `mailto:${item.email}?subject=${encodeURIComponent(subject)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toLocaleString("de-DE", { maximumFractionDigits: 1 })} MB`;
}
