import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export type AuthMode = "login" | "signup" | "forgot" | "reset";

const LABELS: Record<AuthMode, string> = {
  login: "Anmelden",
  signup: "Konto erstellen",
  forgot: "Link zum Zurücksetzen senden",
  reset: "Neues Passwort speichern",
};

function germanError(message: string) {
  if (/invalid login/i.test(message)) return "E-Mail-Adresse oder Passwort stimmen nicht.";
  if (/email not confirmed/i.test(message)) return "Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse über den Link in Ihrem Postfach.";
  if (/already registered/i.test(message)) return "Zu dieser E-Mail-Adresse gibt es bereits ein Konto.";
  if (/password/i.test(message) && /(short|least|weak|pwned|leaked)/i.test(message)) return "Bitte wählen Sie ein sichereres Passwort (mindestens 8 Zeichen).";
  if (/rate limit/i.test(message)) return "Zu viele Versuche. Bitte warten Sie einen Moment.";
  return "Das hat nicht geklappt. Bitte versuchen Sie es erneut.";
}

/** Shared sign-in / sign-up / password forms, styled with the imported tk-form classes. */
export function AuthForm({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const needsEmail = mode !== "reset";
  const needsPassword = mode !== "forgot";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (needsEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    if (needsPassword && password.length < (mode === "login" ? 1 : 8)) return setError(mode === "login" ? "Bitte geben Sie Ihr Passwort ein." : "Das Passwort braucht mindestens 8 Zeichen.");
    setPending(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        await navigate({ to: "/konto" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/konto` } });
        if (error) throw error;
        setDone("Fast geschafft: Wir haben Ihnen eine E-Mail geschickt. Bestätigen Sie den Link darin, dann können Sie sich anmelden.");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/passwort-neu` });
        if (error) throw error;
        setDone("Wenn ein Konto zu dieser Adresse existiert, ist ein Link zum Zurücksetzen unterwegs.");
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        await navigate({ to: "/konto" });
      }
    } catch (failure) {
      setError(germanError(failure instanceof Error ? failure.message : String(failure)));
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="tk-form tk-auth">
        <p className="tk-success" role="status">{done}</p>
        <div className="tk-actions"><p><a href="/anmelden">Zur Anmeldung</a></p></div>
      </div>
    );
  }

  return (
    <form className="tk-form tk-auth" noValidate onSubmit={onSubmit} aria-busy={pending}>
      {needsEmail && (
        <div className="tk-field is-wide">
          <label htmlFor="auth-email">E-Mail-Adresse</label>
          <input id="auth-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={error ? "true" : "false"} aria-describedby={error ? "auth-error" : undefined} required />
        </div>
      )}
      {needsPassword && (
        <div className="tk-field is-wide">
          <label htmlFor="auth-password">{mode === "reset" ? "Neues Passwort" : "Passwort"}</label>
          <span className="nx-feld">
            <input id="auth-password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={error ? "true" : "false"} aria-describedby={error ? "auth-error" : undefined} required />
            <button type="button" className="nx-feld-schalter" aria-pressed={showPassword} aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"} title={showPassword ? "Passwort verbergen" : "Passwort anzeigen"} onClick={() => setShowPassword((v) => !v)}>
              <svg className="nx-zeichen" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12zM12 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z" />
                {showPassword && <path d="M4 4l16 16" />}
              </svg>
            </button>
          </span>
        </div>
      )}
      {error && <p id="auth-error" className="tk-alert" role="alert">{error}</p>}
      <button type="submit" className="nexify-control primary-button hc-finish-primary tk-cta" data-variant="primary" disabled={pending}>
        {pending ? "Einen Moment …" : LABELS[mode]}
      </button>
      <div className="tk-actions">
        {mode !== "login" && <p><a href="/anmelden">Ich habe schon ein Konto</a></p>}
        {mode !== "signup" && <p><a href="/registrieren">Neues Konto erstellen</a></p>}
        {mode === "login" && <p><a href="/passwort-vergessen">Passwort vergessen?</a></p>}
        <p className="nx-konto-hinweis"><a href="/datenschutz">Datenschutz</a></p>
      </div>
    </form>
  );
}
