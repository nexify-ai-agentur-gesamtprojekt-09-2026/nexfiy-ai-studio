import { createServerFn } from "@tanstack/react-start";
import { normalizeInquiry, validateInquiry, type InquiryErrors, type InquiryKind } from "./inquiry";

const KINDS: InquiryKind[] = ["contact", "partner", "appointment", "voucher"];

export type InquirySubmitResult =
  { ok: true; reference: string } | { ok: false; errors?: InquiryErrors; error?: string };

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
    if (data.trap) return { ok: false, error: "Die Anfrage konnte nicht angenommen werden." };
    const errors = validateInquiry(data.kind, data.values);
    if (Object.values(errors).some(Boolean)) return { ok: false, errors };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { buildInquiryNotice, inquiryReference } = await import("./inquiry-notification");
    const { deliverInquiryNotice, workspaceUrl } = await import("./inquiry-delivery.server");
    const id = crypto.randomUUID();
    const { consent: _consent, ...row } = data.values;
    const insert = await supabaseAdmin
      .from("inquiries")
      .insert({ id, kind: data.kind, source_path: data.sourcePath, ...row });
    if (insert.error) {
      console.error("inquiry insert failed", insert.error);
      return {
        ok: false,
        error:
          "Ihre Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut oder senden Sie sie per E-Mail.",
      };
    }
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
