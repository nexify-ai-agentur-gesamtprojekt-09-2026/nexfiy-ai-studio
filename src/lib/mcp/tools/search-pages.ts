import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SITE_PAGES } from "../pages";

export default defineTool({
  name: "search_pages",
  title: "Seiten suchen",
  description: "Find public website pages whose title or path matches a search term (e.g. 'API', 'Preise', 'Werkstatt').",
  inputSchema: { query: z.string().min(1).max(100).describe("Search term.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query.toLowerCase();
    const pages = SITE_PAGES.filter((p) => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q)).map((p) => ({ path: p.path, title: p.title, brand: p.brand }));
    return { content: [{ type: "text", text: pages.length ? pages.map((p) => `${p.path} — ${p.title}`).join("\n") : "Keine passende Seite gefunden." }], structuredContent: { pages } };
  },
});
