import { z } from "zod";
import { INQUIRY_STATUSES, type InquiryStatus } from "./inquiry-inbox";

// Feste Zuordnung des am 16.11. geprüften Arbeitsbereichs; Namen allein erteilen keine Rechte.
export const SLACK_WORKSPACE = {
  team: "T0AR7LG3V7U",
  owner: "U0AR48HJR0D",
  oracle: "U0CCZ68UDA9",
  hermes: "U0CF9GKNCJE",
  oracleApp: "A0CD49EMU9Y",
  inbox: "C0CDW3K4KDY",
  operations: "C0C7GG39P0S",
  decisions: "C0C8Y1NU812",
  externalRelay: "C0CH7V0TZSM",
} as const;

export const SLACK_FLOWS = [
  { id: "inquiry", label: "Anfragen", trigger: "Kontakt · Partner · Termin · Gutschein · Teile", returnPath: "Slack-Status → bestehender Vorgang", state: "Website-Ausgang vorhanden" },
  { id: "catalog", label: "Katalogabgleich", trigger: "Bestehender nächtlicher Abgleich", returnPath: "Abschluss / Fehler → Slack-Beleg", state: "Zeitplan bleibt unverändert" },
  { id: "images", label: "Produktfotos", trigger: "Fotokopie · Freistellung", returnPath: "Ergebnis / Fehler → Slack-Beleg", state: "Kein zusätzlicher Import" },
  { id: "monitoring", label: "Überwachung", trigger: "Ausfall · Entwarnung · Lagebericht", returnPath: "ACK getrennt vom Ergebnis", state: "Bestehender Serverauftrag" },
  { id: "oracle", label: "ORACLE / Hermes", trigger: "Expliziter Auftrag im Ursprungsthread", returnPath: "Empfang → Ergebnis → Gegenprüfung", state: "Empfängerbestätigung offen" },
  { id: "approval", label: "Inhaberentscheidungen", trigger: "Konkrete Freigabeanfrage", returnPath: "Entscheidung mit Vorgangsbezug", state: "Keine Freigabe durch Reaktion" },
] as const;

export const slackInputSchema = z.object({
  key: z.string().min(1).max(200),
  team: z.string().min(1).max(40),
  actor: z.string().min(1).max(40),
  channel: z.string().min(1).max(40),
  thread: z.string().max(40).optional(),
  kind: z.enum(["message", "command", "interaction"]),
  text: z.string().max(4000),
  bot: z.boolean().default(false),
  action: z.object({ id: z.string().uuid(), status: z.enum(INQUIRY_STATUSES) }).optional(),
});
export type SlackInput = z.infer<typeof slackInputSchema>;
export type SlackDecision =
  | { kind: "ignore"; reason: string }
  | { kind: "blocked"; reason: string }
  | { kind: "overview" }
  | { kind: "ack" | "result" }
  | { kind: "status"; id: string; status: InquiryStatus };

export function decideSlackInput(input: SlackInput): SlackDecision {
  if (input.team !== SLACK_WORKSPACE.team) return { kind: "ignore", reason: "wrong_team" };
  // Der extern geteilte Relay ist absichtlich nicht Teil der Website-Datenwege.
  if (input.channel !== SLACK_WORKSPACE.inbox && !input.channel.startsWith("D"))
    return { kind: "ignore", reason: "channel_not_allowed" };
  if (input.bot) {
    if (![SLACK_WORKSPACE.oracle, SLACK_WORKSPACE.hermes].some((id) => id === input.actor))
      return { kind: "ignore", reason: "bot_loop" };
    if (!input.thread) return { kind: "ignore", reason: "thread_required" };
    if (/^ACK\b/i.test(input.text.trim())) return { kind: "ack" };
    if (/^RESULT\b/i.test(input.text.trim())) return { kind: "result" };
    return { kind: "ignore", reason: "no_receipt" };
  }
  if (input.actor !== SLACK_WORKSPACE.owner) return { kind: "ignore", reason: "owner_required" };
  if (input.action) return { kind: "status", ...input.action };
  const text = input.text.replace(/<@[A-Z0-9]+>/g, "").trim();
  if (/^(status|abläufe|flows)$/i.test(text)) return { kind: "overview" };
  const match = /^status\s+([0-9a-f-]{36})\s+(neu|in_bearbeitung|erledigt|archiviert)$/i.exec(text);
  if (match) {
    const parsed = z.object({ id: z.string().uuid(), status: z.enum(INQUIRY_STATUSES) })
      .safeParse({ id: match[1], status: match[2]?.toLowerCase() });
    if (parsed.success) return { kind: "status", ...parsed.data };
  }
  return { kind: "blocked", reason: "explicit_supported_action_required" };
}

export function slackOverviewText(): string {
  return SLACK_FLOWS.map((flow) => `${flow.label}: ${flow.state}`).join("\n");
}