import { afterEach, describe, expect, it } from "vitest";
import { isServerWorker } from "./server-worker-auth";

const token = "a".repeat(40);
const sha = async (v: string) =>
  [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
const req = (auth?: string) =>
  new Request("https://x.test", { headers: auth ? { authorization: auth } : {} });

describe("isServerWorker", () => {
  afterEach(() => delete process.env["SERVER_WORKER_TOKEN_SHA256"]);
  it("akzeptiert nur den Schlüssel mit passendem Hash", async () => {
    process.env["SERVER_WORKER_TOKEN_SHA256"] = await sha(token);
    expect(await isServerWorker(req(`Bearer ${token}`))).toBe(true);
    expect(await isServerWorker(req(`Bearer ${"b".repeat(40)}`))).toBe(false);
    expect(await isServerWorker(req())).toBe(false);
  });
  it("lehnt ab, wenn kein Hash hinterlegt ist", async () => {
    expect(await isServerWorker(req(`Bearer ${token}`))).toBe(false);
  });
});
