/** Signaturprüfung arbeitet auf den unveränderten Bytes, nie auf erneut erzeugtem JSON. */
export async function verifySlackSignature(secret: string, timestamp: string | null, signature: string | null,
  body: string, nowSeconds = Math.floor(Date.now() / 1000)): Promise<boolean> {
  if (!timestamp || !/^\d+$/.test(timestamp) || !signature || !/^v0=[0-9a-f]{64}$/.test(signature)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`v0:${timestamp}:${body}`)));
  const expected = `v0=${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return mismatch === 0;
}