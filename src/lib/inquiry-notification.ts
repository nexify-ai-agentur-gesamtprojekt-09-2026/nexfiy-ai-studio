/**
 * Slack-Meldung zu neuen Anfragen: reine Textbausteine, damit die Datensparsamkeit testbar bleibt.
 * Bewusst ohne E-Mail-Adresse und Nachrichtentext – die vollständige Anfrage liegt nur im geschützten Arbeitsplatz.
 */
export type NoticeKind = "contact" | "partner" | "appointment" | "voucher" | "part";

/** Slack-Ziel: Pascals eigener Direktkanal, bis ein eigener privater Anfragekanal freigegeben ist. */
export const INQUIRY_SLACK_CHANNEL = "U0AR48HJR0D";

const KIND_LABELS: Record<NoticeKind, string> = {
  contact: "Projektanfrage (Kontakt)",
  partner: "TEILEKLAR Partneranfrage",
  appointment: "TEILEKLAR Terminwunsch",
  voucher: "TEILEKLAR Gutscheinfrage",
  part: "TEILEKLAR Teilefrage",
};

export function inquiryReference(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export interface InquiryNoticeInput {
  kind: NoticeKind;
  id: string;
  name: string;
  company?: string;
  sourcePath?: string;
  hasAttachment?: boolean;
  workspaceUrl: string;
}

/** Slack-mrkdwn: Steuerzeichen aus Besucherangaben entfernen, damit keine Erwähnungen oder Links entstehen. */
export function slackSafe(value: string): string {
  return value.replace(/[<>&*_~`|]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
}

export function buildInquiryNotice(input: InquiryNoticeInput): string {
  const lines = [
    `Neue ${KIND_LABELS[input.kind]} · Vorgang ${inquiryReference(input.id)}`,
    `Von: ${slackSafe(input.name)}${input.company ? ` (${slackSafe(input.company)})` : ""}`,
  ];
  if (input.sourcePath) lines.push(`Seite: ${slackSafe(input.sourcePath)}`);
  if (input.hasAttachment) lines.push("Mit Anhang");
  lines.push(`Vollständige Angaben im Arbeitsplatz: ${input.workspaceUrl}`);
  return lines.join("\n");
}
