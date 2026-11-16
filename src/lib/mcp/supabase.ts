import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

type RuntimeGlobals = typeof globalThis & { process?: { env?: Record<string, string | undefined> } };

function env(names: readonly string[]): string {
  const runtime = globalThis as RuntimeGlobals;
  for (const name of names) {
    const value = runtime.process?.env?.[name]?.trim();
    if (value) return value;
  }
  throw new Error(`${names[0]} is required`);
}

/** Client mit der Anmeldung des Aufrufers: Die Datenbank (RLS, Admin-Rolle) entscheidet, was sichtbar ist. */
export async function supabaseForUser(ctx: ToolContext) {
  const token = ctx.getToken();
  if (!token) throw new Error("Not authenticated");
  return createClient(
    env(["SUPABASE_URL", "VITE_SUPABASE_URL"]),
    env(["SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"]),
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    },
  );
}
