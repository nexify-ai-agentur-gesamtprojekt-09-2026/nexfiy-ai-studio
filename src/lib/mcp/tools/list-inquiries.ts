import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

/** Nur lesend. Sichtbar sind Anfragen ausschließlich für Konten mit Admin-Rolle (RLS über has_role). */
export default defineTool({
  name: "list_inquiries",
  title: "Anfragen lesen",
  description:
    "List recent website inquiries and TEILEKLAR part inquiries. Read-only; only returns rows for accounts with the admin role.",
  inputSchema: {
    status: z.enum(["neu", "in_bearbeitung", "erledigt"]).optional().describe("Optional status filter"),
    limit: z.number().int().min(1).max(100).default(25),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = await supabaseForUser(ctx);
    let general = supabase
      .from("inquiries")
      .select("id, created_at, kind, name, email, company, message, source_path, status")
      .order("created_at", { ascending: false })
      .limit(limit);
    let parts = supabase
      .from("teileklar_part_inquiries")
      .select("id, created_at, name, email, vehicle, part, message, status, attachment_name")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (status) {
      general = general.eq("status", status);
      parts = parts.eq("status", status);
    }
    const [g, p] = await Promise.all([general, parts]);
    if (g.error || p.error)
      return { content: [{ type: "text", text: (g.error ?? p.error)!.message }], isError: true };
    const result = { inquiries: g.data ?? [], partInquiries: p.data ?? [] };
    return { content: [{ type: "text", text: JSON.stringify(result) }], structuredContent: result };
  },
});
