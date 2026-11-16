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

export function identityPermissions(scope: string | undefined): string[] {
  const labels: Record<string, string> = {
    openid: "Ihre Kontoidentität bestätigen",
    email: "Ihre E-Mail-Adresse teilen",
    profile: "Ihr Basisprofil teilen",
  };
  return [...new Set(scope?.split(/\s+/).filter(Boolean) ?? [])].map(
    (value) => labels[value] ?? `Zusätzliche Berechtigung angefordert: ${value}`,
  );
}

function consentFailure(failure: unknown): Error {
  const message = failure instanceof Error
    ? failure.message
    : failure && typeof failure === "object" && "message" in failure
      ? String(failure.message)
      : "";
  if (/unauthorized request origin/i.test(message))
    return new Error("Diese Website-Adresse ist für die Zustimmung nicht zugelassen. Starten Sie die Verbindung über nexifyai.de erneut.");
  if (/expired|not found|invalid.*authorization|authorization.*invalid/i.test(message))
    return new Error("Diese Verbindungsanfrage ist ungültig oder abgelaufen. Starten Sie sie in Ihrem KI-Assistenten erneut.");
  return new Error("Die Verbindung konnte nicht bestätigt werden. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
}

export async function loadOAuthConsent(oauth: ConsentOAuth, id: string) {
  if (!id) throw new Error("Der Verbindungsanfrage fehlt die Kennung. Starten Sie sie in Ihrem KI-Assistenten erneut.");
  try {
    const { data, error } = await oauth.getAuthorizationDetails(id);
    if (error) throw consentFailure(error);
    if (!data) throw new Error("Diese Verbindungsanfrage ist ungültig oder abgelaufen.");
    return data;
  } catch (failure) {
    if (failure instanceof Error && /^(Diese |Die Verbindung konnte)/.test(failure.message)) throw failure;
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
  if (!target) throw new Error("Es wurde keine Rückleitungsadresse bestätigt. Starten Sie die Verbindung in Ihrem KI-Assistenten erneut.");
  return target;
}