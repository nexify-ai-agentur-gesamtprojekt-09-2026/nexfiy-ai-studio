import { describe, expect, it } from "vitest";
import { oauthReturnPath } from "./oauth-return-path";

describe("OAuth login return boundary", () => {
  it("preserves a complete local consent request with query and fragment", () => {
    expect(oauthReturnPath("/.lovable/oauth/consent?authorization_id=NX-MCP-01#decision")).toBe("/.lovable/oauth/consent?authorization_id=NX-MCP-01#decision");
  });
  for (const value of ["//outside.example/", "/\\outside.example/", "/\noutside.example", "https://outside.example/", "/..//outside.example/"]) {
    it(`rejects a noncanonical or external return ${JSON.stringify(value)}`, () => {
      expect(oauthReturnPath(value)).toBe("/");
    });
  }
});