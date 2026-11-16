// @vitest-environment node
import { describe, expect, it } from "vitest";
import { inquiryGuardHashes, resolveInquiryIp } from "./inquiry-guard.server";

describe("NX-LEAD-01 Prüfsummen", () => {
  it("erzeugt getrennte gesalzene SHA-256-Prüfsummen ohne Klartext-IP", async () => {
    const hashes = await inquiryGuardHashes("a".repeat(64), "192.0.2.1", "test@example.test", "Ein neues Vorhaben.");
    expect(hashes.ipHash).toMatch(/^[0-9a-f]{64}$/);
    expect(hashes.fingerprint).not.toBe(hashes.ipHash);
    expect(JSON.stringify(hashes)).not.toContain("192.0.2.1");
    const second = await inquiryGuardHashes("b".repeat(64), "192.0.2.1", "test@example.test", "Ein neues Vorhaben.");
    expect(second.ipHash).not.toBe(hashes.ipHash);
  });
  it("schützt Dubletten auch bei verschiedenen IPs", async () => {
    const first = await inquiryGuardHashes("a".repeat(64), "192.0.2.1", "test@example.test", "Ein neues Vorhaben.");
    const second = await inquiryGuardHashes("a".repeat(64), "192.0.2.2", "test@example.test", "Ein neues Vorhaben.");
    expect(first.fingerprint).toBe(second.fingerprint);
    expect(first.ipHash).not.toBe(second.ipHash);
  });
  it("nimmt keine beliebigen Proxy-Kopfzeilen oder fehlende IP an", () => {
    const req = new Request("https://nexifyai.de/kontakt", { headers: { "cf-connecting-ip": "192.0.2.1", "x-forwarded-for": "192.0.2.2" } });
    expect(resolveInquiryIp(req)).toBeNull();
    expect(resolveInquiryIp(req, undefined, true)).toBeNull();
    expect(resolveInquiryIp(new Request("http://localhost/kontakt"), undefined, true)).toBeNull();
  });
  it("erlaubt nur kontrollierte lokale Testheader und kanonisiert IPv6", () => {
    const req = new Request("http://localhost/kontakt", { headers: { "cf-connecting-ip": "192.0.2.1" } });
    expect(resolveInquiryIp(req, undefined, true)).toBe("192.0.2.1");
    expect(resolveInquiryIp(req, undefined, false)).toBeNull();
    expect(resolveInquiryIp(req, "2001:0db8:0:0:0:0:0:1")).toBe("2001:db8::1");
    expect(resolveInquiryIp(req, "192.0.2.1, 192.0.2.2")).toBeNull();
  });
  it("weist ungültiges Salz ab statt ungesalzen zu speichern", async () => {
    await expect(inquiryGuardHashes("", "192.0.2.1", "test@example.test", "Vorhaben")).rejects.toThrow();
  });
});