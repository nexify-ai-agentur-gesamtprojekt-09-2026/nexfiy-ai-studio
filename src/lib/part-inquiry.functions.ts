import { createServerFn } from "@tanstack/react-start";
import { normalizePartInquiry, validatePartInquiry, type PartInquiryErrors } from "./part-inquiry";

export type PartInquiryResult = { ok: true; reference: string } | { ok: false; errors?: PartInquiryErrors; error?: string };

/** Public endpoint: validates on the server and writes with service role; visitors can never read stored inquiries. */
export const submitPartInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!(input instanceof FormData)) throw new Error("Ungültige Anfrage.");
    const file = input.get("attachment");
    return { values: normalizePartInquiry(Object.fromEntries(input.entries())), file: file instanceof File && file.size > 0 ? file : null };
  })
  .handler(async ({ data }): Promise<PartInquiryResult> => {
    const errors = validatePartInquiry(data.values, data.file);
    if (Object.keys(errors).length) return { ok: false, errors };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    let attachment: { path: string; name: string; type: string; size: number } | null = null;
    if (data.file) {
      const ext = (data.file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5);
      const path = `${id}/anhang.${ext || "bin"}`;
      const up = await supabaseAdmin.storage.from("teileklar-attachments").upload(path, data.file, { contentType: data.file.type, upsert: false });
      if (up.error) { console.error("part inquiry upload failed", up.error); return { ok: false, error: "Der Anhang konnte nicht gespeichert werden. Bitte erneut versuchen." }; }
      attachment = { path, name: data.file.name.slice(0, 160), type: data.file.type, size: data.file.size };
    }
    const { consent: _consent, ...row } = data.values;
    const ins = await supabaseAdmin.from("teileklar_part_inquiries").insert({
      id, ...row,
      attachment_path: attachment?.path ?? null, attachment_name: attachment?.name ?? null,
      attachment_type: attachment?.type ?? null, attachment_size: attachment?.size ?? null,
    });
    if (ins.error) { console.error("part inquiry insert failed", ins.error); return { ok: false, error: "Ihre Teilefrage konnte nicht gespeichert werden. Bitte erneut versuchen." }; }
    const { buildInquiryNotice, inquiryReference } = await import("./inquiry-notification");
    const { deliverInquiryNotice, workspaceUrl } = await import("./inquiry-delivery.server");
    await deliverInquiryNotice("teileklar_part_inquiries", id, buildInquiryNotice({
      kind: "part", id, name: row.name, company: row.vehicle, sourcePath: "/teileklar/suche", hasAttachment: attachment !== null, workspaceUrl: await workspaceUrl(),
    }));
    return { ok: true, reference: inquiryReference(id) };
  });
