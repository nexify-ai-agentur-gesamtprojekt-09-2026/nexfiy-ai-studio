import { useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { Button } from "@/components/ui/button";

type CopyState = "idle" | "copied" | "failed";

/** Button that copies text and confirms it in place (announced politely to screen readers). */
export function CopyButton({
  text,
  label = "Text kopieren",
  copiedLabel = "Kopiert",
  failedLabel = "Kopieren nicht möglich",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
  className?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onClick = async () => {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  };
  return (
    <Button variant="ghost" type="button" className={className} data-state={state} onClick={onClick}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {state === "copied" ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" /></>}
      </svg>
      <span aria-live="polite">{state === "copied" ? copiedLabel : state === "failed" ? failedLabel : label}</span>
    </Button>
  );
}
