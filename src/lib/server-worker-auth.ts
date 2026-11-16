/**
 * Prüft den Zugangsschlüssel der Server-Aufträge auf Server 1.
 * Der Schlüssel entsteht und bleibt auf dem Server; die App kennt nur seinen SHA-256-Wert
 * (SERVER_WORKER_TOKEN_SHA256), damit kein Geheimnis übertragen werden muss.
 */
export async function isServerWorker(request: Request): Promise<boolean> {
  const expected = (process.env["SERVER_WORKER_TOKEN_SHA256"] ?? "").trim().toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(expected)) return false;
  const match = /^Bearer ([A-Za-z0-9_-]{32,128})$/.exec(request.headers.get("authorization") ?? "");
  if (!match) return false;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(match[1]));
  const actual = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  let diff = 0;
  for (let i = 0; i < 64; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
