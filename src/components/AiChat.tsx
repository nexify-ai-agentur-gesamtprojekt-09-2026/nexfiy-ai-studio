/**
 * Website-Chat mit echter Gegenstelle.
 *
 * Warum: Die importierten Panels zeigten nur Attrappen-Markup; auf dem Telefon war der
 * Chat transparent und praktisch unsichtbar. Dieses Widget ist der EINE Chat der Website:
 * deckend, mobil als Vollflaeche, mit echten Antworten aus `chatReply` (9Router).
 *
 * 2026-11-19 22:12 (Europe/Berlin) — angelegt.
 */
import { useEffect, useRef, useState } from "react";
import { chatReply, type ChatTurn } from "@/lib/chat-server";
import "@/styles/ai-chat.css";

const GREETING: ChatTurn = {
  role: "assistant",
  content:
    "Hallo! Ich bin die KI von NeXify AI. Frag mich zu Websites, KI-Agenten, Shops oder TEILEKLAR — ich antworte direkt hier.",
};

const QUICK = [
  "Was macht NeXify AI?",
  "Website neu aufsetzen — wie läuft das?",
  "Was ist TEILEKLAR?",
];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [turns, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // 2026-11-19 22:55 (Europe/Berlin): Bei offenem Chat darf die Seite dahinter nicht
  // mitscrollen — auf dem Telefon deckt das Panel den ganzen Bildschirm ab.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  async function send(text: string) {
    const message = text.trim().slice(0, 1000);
    if (!message || busy) return;
    const next = [...turns, { role: "user" as const, content: message }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    try {
      const result = await chatReply({ data: { messages: next.slice(-6) } });
      setTurns((current) => [...current, { role: "assistant", content: result.reply }]);
    } catch {
      setTurns((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Ich komme gerade nicht durch. Schreib uns bitte an mail@nexifyai.cloud — dann antwortet Pascal persönlich.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="nx-chat">
      {open && (
        <section className="nx-chat__panel" id="nx-chat-panel" aria-label="Chat mit NeXify AI">
          <header className="nx-chat__head">
            <div>
              <h2 className="nx-chat__title">NeXify AI</h2>
              <p className="nx-chat__note">KI-Assistent · Antworten können Fehler enthalten</p>
            </div>
            <button
              type="button"
              className="nx-chat__close"
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
            >
              ✕
            </button>
          </header>

          <div className="nx-chat__log" ref={logRef} role="log" aria-live="polite">
            {turns.map((turn, index) => (
              <p
                key={index}
                className={`nx-chat__msg nx-chat__msg--${turn.role === "user" ? "user" : "bot"}`}
              >
                {turn.content}
              </p>
            ))}
            {busy && <p className="nx-chat__msg nx-chat__msg--bot">…</p>}
          </div>

          {turns.length <= 1 && (
            <div className="nx-chat__quick">
              {QUICK.map((question) => (
                <button key={question} type="button" onClick={() => void send(question)}>
                  {question}
                </button>
              ))}
            </div>
          )}

          <form
            className="nx-chat__form"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label className="sr-only" htmlFor="nx-chat-input">
              Nachricht an NeXify AI
            </label>
            <textarea
              id="nx-chat-input"
              ref={inputRef}
              value={draft}
              maxLength={1000}
              rows={1}
              placeholder="Deine Frage…"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(draft);
                }
              }}
            />
            <button type="submit" className="nx-chat__send" disabled={busy || !draft.trim()}>
              Senden
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="nx-chat__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="nx-chat-panel"
      >
        {open ? "Chat schließen" : "Chat öffnen"}
      </button>
    </div>
  );
}
