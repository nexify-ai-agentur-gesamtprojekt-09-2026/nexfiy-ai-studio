import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { INQUIRY_CONSENT_VERSION } from "./inquiry-consent";
import { inquiryGuardHashes } from "./inquiry-guard.server";
import type { InquiryKind, InquiryValues } from "./inquiry";

export async function acceptInquiry(client: SupabaseClient<Database>, ip: string | null, kind: InquiryKind, sourcePath: string, values: InquiryValues) {
  const salt = await client.rpc("get_inquiry_guard_salt");
  if (salt.error || typeof salt.data !== "string") throw new Error("Anfrageschutz nicht verfügbar.");
  const hashes = await inquiryGuardHashes(salt.data, ip, values.email, values.message);
  const result = await client.rpc("accept_guarded_inquiry", {
    p_ip_hash: hashes.ipHash ?? "", p_fingerprint: hashes.fingerprint,
    p_kind: kind, p_source_path: sourcePath, p_name: values.name,
    p_email: values.email, p_company: values.company, p_message: values.message,
    p_consent: values.consent, p_consent_version: INQUIRY_CONSENT_VERSION,
  });
  if (result.error || result.data?.length !== 1) throw new Error("Anfrage konnte nicht sicher angenommen werden.");
  const row = result.data[0];
  if (!row) throw new Error("Anfrage konnte nicht sicher angenommen werden.");
  if (row.outcome === "duplicate") return { outcome: "duplicate" as const };
  if (row.outcome === "rate_limited") return { outcome: "rate_limited" as const, retryAfterSeconds: row.retry_after_seconds };
  if (row.outcome !== "accepted" || !z.uuid().safeParse(row.inquiry_id).success) throw new Error("Anfrage konnte nicht sicher angenommen werden.");
  return { outcome: "accepted" as const, id: row.inquiry_id };
}