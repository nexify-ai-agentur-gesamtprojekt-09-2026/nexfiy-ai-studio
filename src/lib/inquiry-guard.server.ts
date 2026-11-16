import { z } from "zod";

const ipSchema = z.union([z.ipv4(), z.ipv6()]);

/** Nur Laufzeit-IP oder nachweislich vom Edge gesetzte Kopfzeile; keine Besucher-IP aus dem Formular. */
export function resolveInquiryIp(request: Request, nativeIp?: string, localTest = false): string | null {
  const cf = (request as Request & { cf?: { colo?: unknown; asn?: unknown } }).cf;
  const trustedEdge = typeof cf?.colo === "string" && typeof cf?.asn === "number";
  const localHost = new URL(request.url).hostname === "localhost";
  const edgeIp = (trustedEdge || (localTest && localHost)) ? request.headers.get("cf-connecting-ip") : null;
  // Cloudflare kennt die Besucher-IP; die native Adresse kann die eines vorgeschalteten Proxys sein.
  for (const candidate of [edgeIp, nativeIp]) {
    const parsed = ipSchema.safeParse(candidate);
    if (!parsed.success) continue;
    const ip = parsed.data;
    if (!ip.includes(":")) return ip;
    return new URL(`http://[${ip}]/`).hostname.slice(1, -1).toLowerCase();
  }
  return null;
}

/** Domain-getrennte Prüfsummen; Klartext bleibt nur bis zur Berechnung im Arbeitsspeicher. */
export async function inquiryGuardHashes(salt: string, ip: string | null, email: string, message: string) {
  if (!/^[0-9a-f]{64}$/.test(salt)) throw new Error("Anfrageschutz nicht verfügbar.");
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(salt), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const hash = async (value: string) => {
    const result = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
    return Array.from(new Uint8Array(result), byte => byte.toString(16).padStart(2, "0")).join("");
  };
  return { ipHash: ip === null ? null : await hash(JSON.stringify(["ip", ip])), fingerprint: await hash(JSON.stringify(["duplicate", email, message])) };
}