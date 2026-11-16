import { describe, expect, it, vi } from "vitest";
import { decideOAuthConsent, identityPermissions, loadOAuthConsent, type ConsentOAuth } from "./oauth-consent";

function provider(): ConsentOAuth {
  return {
    getAuthorizationDetails: vi.fn().mockResolvedValue({ data: { client: { name: "NX-MCP-01" }, redirect_uri: "https://claude.ai/api/mcp/auth_callback", scope: "openid email" }, error: null }),
    approveAuthorization: vi.fn().mockResolvedValue({ data: { redirect_url: "https://client.example/callback?code=test" }, error: null }),
    denyAuthorization: vi.fn().mockResolvedValue({ data: { redirect_to: "https://client.example/callback?error=access_denied" }, error: null }),
  };
}

describe("NX-MCP-01 consent", () => {
  it("keeps the registered Claude callback from the provider's actual top-level field", async () => {
    expect((await loadOAuthConsent(provider(), "request-1")).redirect_uri).toBe("https://claude.ai/api/mcp/auth_callback");
  });
  it("does not imply profile access when only identity and email were requested", () => {
    expect(identityPermissions("openid email")).toEqual(["Ihre Kontoidentität bestätigen", "Ihre E-Mail-Adresse teilen"]);
  });
  it("does not invent identity permissions for an empty scope", () => {
    expect(identityPermissions(undefined)).toEqual([]);
  });
  it("retains unknown permissions instead of hiding them", () => {
    expect(identityPermissions("custom.read")).toEqual(["Zusätzliche Berechtigung angefordert: custom.read"]);
  });
  it("distinguishes an untrusted origin from expired authorization", async () => {
    const oauth = provider();
    vi.mocked(oauth.getAuthorizationDetails).mockResolvedValue({ data: null, error: { message: "unauthorized request origin" } });
    await expect(loadOAuthConsent(oauth, "request-1")).rejects.toThrow("Website-Adresse");
  });
  it("rejects a missing authorization without a provider call", async () => {
    const oauth = provider();
    await expect(loadOAuthConsent(oauth, "")).rejects.toThrow("Kennung");
    expect(oauth.getAuthorizationDetails).not.toHaveBeenCalled();
  });
  it("approves only through the provider approval method", async () => {
    const oauth = provider();
    expect(await decideOAuthConsent(oauth, "request-1", true)).toBe("https://client.example/callback?code=test");
    expect(oauth.approveAuthorization).toHaveBeenCalledWith("request-1");
    expect(oauth.denyAuthorization).not.toHaveBeenCalled();
  });
  it("denies only through the provider denial method", async () => {
    const oauth = provider();
    expect(await decideOAuthConsent(oauth, "request-1", false)).toBe("https://client.example/callback?error=access_denied");
    expect(oauth.denyAuthorization).toHaveBeenCalledWith("request-1");
    expect(oauth.approveAuthorization).not.toHaveBeenCalled();
  });
  for (const approve of [true, false]) {
    it(`surfaces network failure for ${approve ? "approval" : "denial"}`, async () => {
      const oauth = provider();
      vi.mocked(approve ? oauth.approveAuthorization : oauth.denyAuthorization).mockRejectedValue(new TypeError("Failed to fetch"));
      await expect(decideOAuthConsent(oauth, "request-1", approve)).rejects.toThrow("Internetverbindung");
    });
  }
  it("never navigates when the provider returned no callback", async () => {
    const oauth = provider();
    vi.mocked(oauth.approveAuthorization).mockResolvedValue({ data: {}, error: null });
    await expect(decideOAuthConsent(oauth, "request-1", true)).rejects.toThrow("Rückleitungsadresse");
  });
});