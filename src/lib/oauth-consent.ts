export type OAuthDetails = {
  client?: { id?: string; name?: string; redirect_uri?: string } | null;
  user?: { email?: string } | null;
  scope?: string;
  redirect_uri?: string;
  redirect_url?: string;
  redirect_to?: string;
};

type OAuthResult = { data: OAuthDetails | null; error: { message: string; code?: string } | null };
export type ConsentOAuth = {
  getAuthorizationDetails(id: string): Promise<OAuthResult>;
  approveAuthorization(id: string): Promise<OAuthResult>;
  denyAuthorization(id: string): Promise<OAuthResult>;
};

export function identityPermissions(scope: string | undefined): { scope: string; label: string }[] {
  const labels: Record<string, string> = {
    openid: "Ihre Kontoidentität bestätigen",
    email: "Ihre E-Mail-Adresse teilen",
    profile: "Ihr Basisprofil teilen",
  };
  return [...new Set(scope?.split(/\s+/).filter(Boolean) ?? [])].map(
    (value) => ({ scope: value, label: labels[value] ?? `Zusätzliche Berechtigung angefordert: ${value}` }),
  );
}

export class OAuthConsentError extends Error {
  constructor(public readonly kind: "origin" | "expired" | "provider" | "missing_id" | "missing_callback", message: string) {
    super(message);
  }
}

function consentFailure(failure: unknown): OAuthConsentError {
  const message = failure instanceof Error
    ? failure.message
    : failure && typeof failure === "object" && "message" in failure
      ? String(failure.message)
      : "";
  if (/unauthorized request origin/i.test(message))
    return new OAuthConsentError("origin", "Diese Website-Adresse ist für die Zustimmung nicht zugelassen. Starten Sie die Verbindung über nexifyai.de erneut.");
  if (/expired|not found|invalid.*authorization|authorization.*invalid/i.test(message))
    return new OAuthConsentError("expired", "Diese Verbindungsanfrage ist ungültig oder abgelaufen. Starten Sie sie in Ihrem KI-Assistenten erneut.");
  return new OAuthConsentError("provider", "Die Verbindung konnte nicht bestätigt werden. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
}

export async function loadOAuthConsent(oauth: ConsentOAuth, id: string) {
  if (!id) throw new OAuthConsentError("missing_id", "Der Verbindungsanfrage fehlt die Kennung. Starten Sie sie in Ihrem KI-Assistenten erneut.");
  try {
    const { data, error } = await oauth.getAuthorizationDetails(id);
    if (error) throw consentFailure(error);
    if (!data) throw new OAuthConsentError("expired", "Diese Verbindungsanfrage ist ungültig oder abgelaufen.");
    return data;
  } catch (failure) {
    if (failure instanceof OAuthConsentError) throw failure;
    throw consentFailure(failure);
  }
}

export async function decideOAuthConsent(oauth: ConsentOAuth, id: string, approve: boolean) {
  let result: OAuthResult;
  try {
    result = approve ? await oauth.approveAuthorization(id) : await oauth.denyAuthorization(id);
  } catch (failure) {
    throw consentFailure(failure);
  }
  if (result.error) throw consentFailure(result.error);
  const target = result.data?.redirect_url ?? result.data?.redirect_to;
  if (!target) throw new OAuthConsentError("missing_callback", "Es wurde keine Rückleitungsadresse bestätigt. Starten Sie die Verbindung in Ihrem KI-Assistenten erneut.");
  return target;
}