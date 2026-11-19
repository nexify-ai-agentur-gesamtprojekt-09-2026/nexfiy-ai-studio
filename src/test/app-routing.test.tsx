import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

// Native inquiry and guide links must reach real pages, not the generic 404.
describe("frontend request and guide destinations", () => {
  it.each([
    "/kontakt",
    "/leistungen/websites",
    "/leistungen/agenten-automatisierung",
    "/leistungen/apps-portale",
    "/loesungen",
    "/produkte/api",
    "/wissen/projekt-vorbereiten",
    "/teileklar/fahrzeug-und-passung",
    "/teileklar/werkstatt",
    "/teileklar/gutscheine",
    "/produkte/nex2fly",
    "/teileklar/partner-werden",
    "/datenschutz",
  ])("matches %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
