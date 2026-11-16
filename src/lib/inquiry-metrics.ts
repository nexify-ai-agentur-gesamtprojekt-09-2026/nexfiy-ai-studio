import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type InquiryWeek = { start: string; end: string; contact: number; teileklar: number };

/** Nur exakte Kopfzählung unter den bestehenden Rechten, niemals Posteingangslisten laden. */
export async function countInquiryWeek(client: SupabaseClient<Database>, end = new Date()): Promise<InquiryWeek> {
  const endIso = end.toISOString();
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [contact, generalParts, parts] = await Promise.all([
    client.from("inquiries").select("id", { count: "exact", head: true }).eq("kind", "contact").gte("created_at", start).lt("created_at", endIso),
    client.from("inquiries").select("id", { count: "exact", head: true }).in("kind", ["partner", "appointment", "voucher"]).gte("created_at", start).lt("created_at", endIso),
    client.from("teileklar_part_inquiries").select("id", { count: "exact", head: true }).gte("created_at", start).lt("created_at", endIso),
  ]);
  if (contact.error || generalParts.error || parts.error || contact.count === null || generalParts.count === null || parts.count === null) throw new Error("Die Wochenzahlen konnten nicht geladen werden.");
  return { start, end: endIso, contact: contact.count, teileklar: generalParts.count + parts.count };
}