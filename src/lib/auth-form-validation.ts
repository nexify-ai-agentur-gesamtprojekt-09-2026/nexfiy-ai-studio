export type AuthMode = "login" | "signup" | "forgot" | "reset";
export type AuthField = "email" | "password";
export function validateAuthInput(
  mode: AuthMode,
  email: string,
  password: string,
): Partial<Record<AuthField, string>> {
  const errors: Partial<Record<AuthField, string>> = {};
  if (mode !== "reset" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  if (mode !== "forgot" && password.length < (mode === "login" ? 1 : 8))
    errors.password =
      mode === "login"
        ? "Bitte geben Sie Ihr Passwort ein."
        : "Das Passwort braucht mindestens 8 Zeichen.";
  return errors;
}
