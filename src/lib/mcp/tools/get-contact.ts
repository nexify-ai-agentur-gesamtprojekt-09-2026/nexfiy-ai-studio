import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Kontakt abrufen",
  description: "Return the public contact channel of NeXify AI for project inquiries.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: "E-Mail: mail@nexifyai.cloud · Kontaktseite: /kontakt" }],
    structuredContent: { email: "mail@nexifyai.cloud", contactPage: "/kontakt" },
  }),
});
