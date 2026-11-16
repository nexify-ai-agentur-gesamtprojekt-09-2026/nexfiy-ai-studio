import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestIP, setResponseHeader } from "@tanstack/react-start/server";
import { normalizeInquiry, validateInquiry, type InquiryErrors, type InquiryKind } from "./inquiry";

const KINDS: InquiryKind[] = ["contact", "partner", "appointment", "voucher"];

export type InquirySubmitResult =
  { ok: true; reference: string } | { ok: false; errors?: InquiryErrors; error?: string; reason?: "duplicate" | "rate_limited" | "unavailable"; retryAfterSeconds?: number };

/** Öffentlicher Eingang: prüft serverseitig, speichert mit Dienstrolle und meldet in Slack. Besucher lesen nie gespeicherte Daten. */
export const submitInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Ungültige Anfrage.");
    const raw = input as Record<string, unknown>;
    const kind = KINDS.find((candidate) => candidate === raw["kind"]);
    if (!kind) throw new Error("Unbekannte Anfrageart.");
    const sourcePath =
      typeof raw["sourcePath"] === "string" && raw["sourcePath"].startsWith("/")
        ? raw["sourcePath"].slice(0, 200)
        : "";
    return {
      kind,
      sourcePath,
      trap: typeof raw["website"] === "string" ? raw["website"] : "",
      values: normalizeInquiry({
        name: raw["name"],
        email: raw["email"],
        company: raw["company"],
        message: raw["message"],
        consent: raw["consent"],
      }),
    };
  })
  .handler(async ({ data }): Promise<InquirySubmitResult> => {
    setResponseHeader("Cache-Control", "no-store");
    if (data.trap) return { ok: false, error: "Die Anfrage konnte nicht angenommen werden." };
    const errors = validateInquiry(data.kind, data.values);
    if (Object.values(errors).some(Boolean)) return { ok: false, errors };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { buildInquiryNotice, inquiryReference } = await import("./inquiry-notification");
    const { resolveInquiryIp } = await import("./inquiry-guard.server");
    const { acceptInquiry } = await import("./inquiry-intake.server");
    const ip = resolveInquiryIp(getRequest(), getRequestIP(), import.meta.env.DEV);
    if (!ip) return { ok: false, reason: "unavailable", error: "Ihre Anfrage konnte nicht sicher angenommen werden. Ihre Angaben bleiben im Formular. Bitte versuchen Sie es später erneut." };
    let accepted;
    try {
      accepted = await acceptInquiry(supabaseAdmin, ip, data.kind, data.sourcePath, data.values);
    } catch {
      console.error("inquiry guarded intake unavailable");
      return { ok: false, reason: "unavailable", error: "Ihre Anfrage konnte nicht sicher gespeichert werden. Ihre Angaben bleiben im Formular. Bitte versuchen Sie es später erneut." };
    }
    if (accepted.outcome === "duplicate") return { ok: false, reason: "duplicate", error: "Eine Anfrage mit derselben E-Mail-Adresse und Nachricht ist bereits eingegangen. Sie wurde nicht erneut gespeichert oder gemeldet. Ihre Angaben bleiben im Formular." };
    if (accepted.outcome === "rate_limited") return { ok: false, reason: "rate_limited", retryAfterSeconds: accepted.retryAfterSeconds, error: "Über diesen Internetanschluss sind bereits fünf Anfragen innerhalb einer Stunde eingegangen. Bitte warten Sie vor einer weiteren Anfrage. Ihre Angaben bleiben im Formular." };
    const id = accepted.id;
    const row = data.values;
    const { deliverInquiryNotice, workspaceUrl } = await import("./inquiry-delivery.server");
    await deliverInquiryNotice(
      "inquiries",
      id,
      buildInquiryNotice({
        kind: data.kind,
        id,
        name: row.name,
        company: row.company,
        sourcePath: data.sourcePath,
        workspaceUrl: await workspaceUrl(),
      }),
    );
    return { ok: true, reference: inquiryReference(id) };
  });
