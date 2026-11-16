import { expect, it } from "vitest";
import { verifySlackSignature } from "./slack-signature";
it("akzeptiert nur frische Signaturen über die exakten Originalbytes", async () => {
  const secret = "synthetic-test-only"; const timestamp = "1000"; const body = '{"x":1}';
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const raw = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`v0:${timestamp}:${body}`)));
  const signature = `v0=${Array.from(raw, x => x.toString(16).padStart(2,"0")).join("")}`;
  expect(await verifySlackSignature(secret, timestamp, signature, body, 1000)).toBe(true);
  expect(await verifySlackSignature(secret, timestamp, signature, '{ "x":1}', 1000)).toBe(false);
  expect(await verifySlackSignature(secret, timestamp, signature, body, 1301)).toBe(false);
});