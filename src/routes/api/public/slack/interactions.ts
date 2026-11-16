import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/public/slack/interactions")({ server: { handlers: {
  POST: async ({ request }) => {
    const { receiveSlack } = await import("@/lib/slack-webhook.server");
    return receiveSlack(request, "interactions");
  },
} } });