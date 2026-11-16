import { INQUIRY_LIMITS } from "./inquiry";
import { ORACLE_PRODUCTS, type OracleAnswer } from "./oracle-products";

/**
 * Explicit visitor handoff from a site chat into the contact form. The draft travels only through this tab's
 * sessionStorage – never the address bar, the server or analytics – and is read exactly once. Storing the
 * inquiry still requires the visitor to complete and submit the form themselves.
 */
export type ContactHandoffOrigin = "oracle" | "teileklar-help";

export interface ContactHandoff {
  origin: ContactHandoffOrigin;
  text: string;
  createdAt: number;
}

export interface HandoffMessage {
  role: "user" | "assistant";
  content: string;
  recommendation?: OracleAnswer["recommendation"];
}

export const CONTACT_HANDOFF_KEY = "nexify:contact-handoff:v1";
export const CONTACT_HANDOFF_EVENT = "nexify:contact-handoff";
/** A draft older than this is discarded, so a forgotten tab does not prefill a later, unrelated visit. */
export const CONTACT_HANDOFF_MAX_AGE_MS = 30 * 60 * 1000;
/** Tolerated clock difference between writing and reading in the same tab. */
const CLOCK_SKEW_MS = 60 * 1000;
export const CONTACT_FORM_PATH = "/kontakt";
export const CONTACT_FORM_ANCHOR = "anfrage";
export const ORACLE_HANDOFF_HEADING = "Aus meiner Beratung mit AIFly ORACLE:";
export const HANDOFF_OMISSION = "[…]";
const ORIGINS: readonly ContactHandoffOrigin[] = ["oracle", "teileklar-help"];

/** Catalog-owned names of the suggested entry; the model's wording never enters the draft. */
export function oracleRecommendationLine(recommendation?: OracleAnswer["recommendation"]): string {
  if (!recommendation || recommendation === "clarify") return "";
  const names =
    recommendation === "both"
      ? [ORACLE_PRODUCTS.suite.name, ORACLE_PRODUCTS.api.name]
      : [ORACLE_PRODUCTS[recommendation].name];
  return `Vorgeschlagener Einstieg aus der Beratung: ${names.join(" und ")}`;
}

/**
 * Draft for the contact form from an ORACLE conversation: only the visitor's own messages plus the catalog name
 * of the latest suggestion. When it exceeds the form limit, the opening description and the newest messages
 * are kept and the omission is marked.
 */
export function composeOracleHandoff(
  messages: readonly HandoffMessage[],
  limit: number = INQUIRY_LIMITS.message,
): string {
  const visitor = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim())
    .filter(Boolean);
  if (!visitor.length) return "";
  const latestAnswer = [...messages].reverse().find((message) => message.role === "assistant");
  const footer = oracleRecommendationLine(latestAnswer?.recommendation);
  const build = (parts: string[]) =>
    [ORACLE_HANDOFF_HEADING, ...parts, ...(footer ? [footer] : [])].join("\n\n");
  const full = build(visitor);
  if (full.length <= limit) return full;
  const [first = "", ...rest] = visitor;
  const kept: string[] = [];
  for (const message of [...rest].reverse()) {
    if (build([first, HANDOFF_OMISSION, message, ...kept]).length > limit) break;
    kept.unshift(message);
  }
  const text = build([first, HANDOFF_OMISSION, ...kept]);
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

/** Stores the confirmed draft for the contact form. Throws when the browser refuses storage. */
export function writeContactHandoff(
  storage: Pick<Storage, "setItem">,
  origin: ContactHandoffOrigin,
  text: string,
  now: number = Date.now(),
): ContactHandoff {
  const value = text.trim().slice(0, INQUIRY_LIMITS.message);
  if (!value) throw new Error("Contact handoff needs text.");
  const handoff: ContactHandoff = { origin, text: value, createdAt: now };
  storage.setItem(CONTACT_HANDOFF_KEY, JSON.stringify(handoff));
  return handoff;
}

/** Reads and always removes the pending draft; invalid or expired entries are discarded. */
export function takeContactHandoff(
  storage: Pick<Storage, "getItem" | "removeItem">,
  now: number = Date.now(),
): ContactHandoff | null {
  const raw = storage.getItem(CONTACT_HANDOFF_KEY);
  if (raw === null) return null;
  storage.removeItem(CONTACT_HANDOFF_KEY);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const { origin, text, createdAt } = parsed as Record<string, unknown>;
  if (!ORIGINS.includes(origin as ContactHandoffOrigin)) return null;
  if (typeof text !== "string" || !text.trim() || text.length > INQUIRY_LIMITS.message) return null;
  if (typeof createdAt !== "number" || !Number.isFinite(createdAt)) return null;
  const age = now - createdAt;
  if (age < -CLOCK_SKEW_MS || age > CONTACT_HANDOFF_MAX_AGE_MS) return null;
  return { origin: origin as ContactHandoffOrigin, text, createdAt };
}

/** Adds the draft to text the visitor already typed instead of replacing it. */
export function mergeHandoffText(
  existing: string,
  incoming: string,
  limit: number = INQUIRY_LIMITS.message,
): string {
  const current = existing.trim();
  if (!current) return incoming.slice(0, limit);
  if (current.includes(incoming.trim())) return existing;
  return `${current}\n\n${incoming}`.slice(0, limit);
}

export function contactHandoffNotice(origin: ContactHandoffOrigin): string {
  const source = origin === "oracle" ? "Ihrer Beratung mit AIFly ORACLE" : "der TEILEKLAR Hilfe";
  return `Entwurf aus ${source} übernommen. Prüfen und ergänzen Sie den Text, tragen Sie Name und E-Mail ein und senden Sie die Anfrage selbst ab – vorher wird nichts übermittelt.`;
}
