import { useCallback, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adviseOracle } from "./oracle.functions";
import type { OracleAnswer, OracleInput } from "./oracle-products";

export interface OracleMessage {
  role: "user" | "assistant";
  content: string;
  links?: { label: string; path: string }[];
  /** Validated catalog classification of an answer; drives the entry links and the contact handoff. */
  recommendation?: OracleAnswer["recommendation"];
}

export function useOracleAdvice() {
  const requestAdvice = useServerFn(adviseOracle);
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  const send = useCallback(
    async (value: string) => {
      const content = value.trim();
      if (!content || content.length > 1000 || inFlight.current) return;
      inFlight.current = true;
      setBusy(true);
      setError("");
      setDraft("");
      const next: OracleMessage[] = [...messages, { role: "user", content }];
      setMessages(next);
      // Keep five complete previous turns; the newest request is always retained.
      const history: OracleInput["messages"] = next
        .slice(-11)
        .map(({ role, content }) => ({ role, content }));
      try {
        const result = await requestAdvice({ data: { messages: history } });
        if (!result.ok) {
          setError(result.error);
          setMessages(messages);
          setDraft(content);
          return;
        }
        setMessages([
          ...next,
          {
            role: "assistant",
            content: result.advice.answer,
            links: result.links,
            recommendation: result.advice.recommendation,
          },
        ]);
      } catch {
        setError(
          "Die Verbindung wurde unterbrochen. Ihre Eingabe bleibt erhalten. Bitte versuchen Sie es später erneut.",
        );
        setMessages(messages);
        setDraft(content);
      } finally {
        inFlight.current = false;
        setBusy(false);
      }
    },
    [messages, requestAdvice],
  );

  const reset = () => {
    if (inFlight.current) return;
    setMessages([]);
    setDraft("");
    setError("");
  };
  return { messages, draft, setDraft, busy, error, send, reset };
}
