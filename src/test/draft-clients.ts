import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { randomUUID } from "node:crypto";
import type { Database } from "@/integrations/supabase/types";

/** Ausschließlich Testlauf gegen den isolierten Entwurf, niemals aus Anwendungscode importieren. */
export function draftService(): SupabaseClient<Database> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key || !["localhost", "127.0.0.1"].includes(new URL(url).hostname)) throw new Error("Isolierter Testzugang fehlt.");
  return createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false, storageKey: `nx-test-service-${randomUUID()}` } });
}

export async function draftAdmin(): Promise<SupabaseClient<Database>> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key || !["localhost", "127.0.0.1"].includes(new URL(url).hostname)) throw new Error("Isolierte Testanmeldung fehlt.");
  const minted = JSON.parse(await readFile(`${homedir()}/.cache/lovable-auth/session.json`, "utf8"));
  const client = createClient<Database>(url, key, { global: { headers: { Authorization: `Bearer ${minted.session.access_token}` } }, auth: { persistSession: false, autoRefreshToken: false, storageKey: `nx-test-admin-${randomUUID()}` } });
  const role = await client.rpc("has_role", { _user_id: minted.session.user.id, _role: "admin" });
  if (role.error || role.data !== true) throw new Error("Echte Admin-Testanmeldung erforderlich.");
  return client;
}