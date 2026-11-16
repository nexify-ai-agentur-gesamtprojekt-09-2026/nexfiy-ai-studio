import { useEffect, useState } from "react";
import {
  CONTACT_FORM_ANCHOR,
  CONTACT_HANDOFF_EVENT,
  mergeHandoffText,
  takeContactHandoff,
  type ContactHandoff,
} from "./contact-handoff";

/** Sets an uncontrolled field through the native setter so React's form change handler sees the edit. */
function setFieldValue(field: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  if (setter) setter.call(field, value);
  else field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

/**
 * Receives a confirmed chat draft on the contact page: once on arrival and again whenever a chat on this page
 * hands one over. Text the visitor already typed is kept; a form that was already sent is reset with the draft.
 */
export function useContactHandoff(anchorId: string = CONTACT_FORM_ANCHOR) {
  const [handoff, setHandoff] = useState<ContactHandoff | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    const take = () => {
      let next: ContactHandoff | null;
      try {
        next = takeContactHandoff(window.sessionStorage);
      } catch (error) {
        console.error("contact handoff could not be read", error);
        return;
      }
      if (!next) return;
      const field = document
        .getElementById(anchorId)
        ?.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
      if (field && !field.disabled) {
        setFieldValue(field, mergeHandoffText(field.value, next.text));
      } else {
        setInitialMessage(next.text);
        setFormKey((key) => key + 1);
      }
      setHandoff(next);
    };
    take();
    window.addEventListener(CONTACT_HANDOFF_EVENT, take);
    return () => window.removeEventListener(CONTACT_HANDOFF_EVENT, take);
  }, [anchorId]);

  // Bring the form into view and continue with the first empty contact field.
  useEffect(() => {
    if (!handoff) return;
    const section = document.getElementById(anchorId);
    if (!section) return;
    const target =
      ["name", "email"]
        .map((name) => section.querySelector<HTMLInputElement>(`input[name="${name}"]`))
        .find((input) => input && !input.value.trim()) ??
      section.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
    section.scrollIntoView({ block: "start" });
    target?.focus({ preventScroll: true });
  }, [anchorId, formKey, handoff]);

  return { handoff, formKey, initialMessage };
}
