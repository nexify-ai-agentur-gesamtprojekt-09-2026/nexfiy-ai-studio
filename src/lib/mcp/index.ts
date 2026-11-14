import { auth, defineMcp } from "@lovable.dev/mcp-js";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";
import listPages from "./tools/list-pages";
import searchPages from "./tools/search-pages";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "nexfiy-ai-studio",
  title: "Nexfiy Ai Studio",
  version: "0.1.0",
  instructions: "Public information about the NeXify AI and TEILEKLAR website: list or search its pages and get the contact channel.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
    requireOAuthClientClaim: true,
  }),
  tools: [listPages, searchPages, getContact],
});
