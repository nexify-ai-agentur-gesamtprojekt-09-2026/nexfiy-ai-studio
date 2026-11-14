import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SITE_PAGES } from "../pages";

export default defineTool({
  name: "list_pages",
  title: "Seiten auflisten",
  description: "List the public pages of the NeXify AI and TEILEKLAR website, optionally filtered by brand.",
  inputSchema: { brand: z.enum(["NeXify AI", "TEILEKLAR"]).optional().describe("Only pages of this brand.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ brand }) => {
    const pages = SITE_PAGES.filter((p) => !brand || p.brand === brand).map((p) => ({ path: p.path, title: p.title, brand: p.brand }));
    return { content: [{ type: "text", text: pages.map((p) => `${p.path} — ${p.title}`).join("\n") }], structuredContent: { pages } };
  },
});
