/**
 * Schalterzustand des KI-Chats im Seiten-HTML (serverseitig gerendert, ohne Zusatzanfrage).
 *
 * Der Worker-Einstieg (`src/server.ts`) ermittelt vor dem Rendern einer Seite mit
 * `ermittleChatZustand` (src/lib/chat-api.ts), ob der Chat Fragen annimmt, und legt nur das
 * Ergebnis „an/aus“ hier ab. Die Hülle schreibt es als `<html data-nxc-chat="an|aus">` in die
 * Seite; im Browser wird es von dort gelesen. Keine Bindings, kein Geheimnis: nur ein Wahrheitswert.
 *
 * Fehlt die Angabe (Testlauf, Fehler beim Ermitteln), gilt „aus“: dann zeigt die Seite keinen
 * Chat-Auslöser, und die Knöpfe „Vorhaben schildern“ führen zum Kontaktformular.
 */
export const CHAT_SCHALTER_ATTRIBUT = "data-nxc-chat";

const ABLAGE = "__nexifyChatAn";

/** Nur im Worker vor dem Rendern: Ergebnis von `ermittleChatZustand` für dieses Isolate. */
export function setzeChatSchalter(an: boolean): void {
  (globalThis as Record<string, unknown>)[ABLAGE] = an;
}

/** true nur, wenn der Server den Chat für diese Seite ausdrücklich als eingeschaltet gerendert hat. */
export function chatSchalterAn(): boolean {
  if (typeof document !== "undefined")
    return document.documentElement.getAttribute(CHAT_SCHALTER_ATTRIBUT) === "an";
  return (globalThis as Record<string, unknown>)[ABLAGE] === true;
}
