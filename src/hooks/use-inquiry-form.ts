import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  INQUIRY_FIELD_ORDER,
  buildInquiryMail,
  firstInvalidField,
  isInquiryFieldRequired,
  readInquiryForm,
  validateInquiry,
  validateInquiryField,
  type InquiryErrors,
  type InquiryField,
  type InquiryKind,
  type InquiryMail,
  type InquiryValues,
} from "@/lib/inquiry";
import { submitInquiry } from "@/lib/inquiry.functions";

export type InquiryPhase = "editing" | "sending" | "sent" | "failed";

/**
 * State for an inquiry form: validates locally, submits to the stored inquiry inbox and, only when the
 * server cannot accept it, offers the e-mail draft as an explicit alternative.
 */
export function useInquiryForm(kind: InquiryKind) {
  const baseId = useId();
  const send = useServerFn(submitInquiry);
  const formRef = useRef<HTMLFormElement>(null);
  const handoffRef = useRef<HTMLHeadingElement>(null);
  const failureRef = useRef<HTMLParagraphElement>(null);
  const focusTarget = useRef<InquiryField | "handoff" | "failure" | null>(null);
  const lastValues = useRef<InquiryValues | null>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [attempts, setAttempts] = useState(0);
  const [phase, setPhase] = useState<InquiryPhase>("editing");
  const [reference, setReference] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [allowMailFallback, setAllowMailFallback] = useState(true);
  const [mail, setMail] = useState<InquiryMail | null>(null);

  useEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    if (target === "handoff") handoffRef.current?.focus();
    else if (target === "failure") failureRef.current?.focus();
    else if (target) (formRef.current?.elements.namedItem(target) as HTMLElement | null)?.focus();
  });

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const values = readInquiryForm(form);
      const next = validateInquiry(kind, values);
      setAttempts((count) => count + 1);
      setErrors(next);
      setFailure(null);
      setAllowMailFallback(true);
      const first = firstInvalidField(next);
      if (first) {
        focusTarget.current = first;
        return;
      }
      lastValues.current = values;
      setPhase("sending");
      try {
        const trap = new FormData(form).get("website");
        const result = await send({
          data: {
            kind,
            ...values,
            sourcePath: window.location.pathname,
            website: typeof trap === "string" ? trap : "",
          },
        });
        if (result.ok) {
          setReference(result.reference);
          setPhase("sent");
          focusTarget.current = "handoff";
          return;
        }
        if (result.errors && Object.values(result.errors).some(Boolean)) {
          setErrors(result.errors);
          setPhase("editing");
          focusTarget.current = firstInvalidField(result.errors) ?? null;
          return;
        }
        setAllowMailFallback(result.reason !== "duplicate" && result.reason !== "rate_limited");
        setFailure(result.error ?? "Ihre Anfrage konnte nicht gespeichert werden.");
      } catch (error) {
        console.error("inquiry submit failed", error);
        setFailure("Die Verbindung ist fehlgeschlagen. Ihre Angaben sind noch im Formular.");
      }
      setPhase("failed");
      focusTarget.current = "failure";
    },
    [kind, send],
  );

  /** After the first attempt, each edit re-checks just that field so messages clear as soon as it is fixed. */
  const onChange = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (attempts === 0) return;
      const field = (event.target as HTMLInputElement).name as InquiryField;
      if (!INQUIRY_FIELD_ORDER.includes(field)) return;
      const message = validateInquiryField(kind, field, readInquiryForm(event.currentTarget));
      setErrors((current) => {
        if (current[field] === message) return current;
        const next = { ...current };
        if (message) next[field] = message;
        else delete next[field];
        return next;
      });
    },
    [attempts, kind],
  );

  /** Explicit alternative after a failed submission: the visitor sends the prepared e-mail themselves. */
  const prepareMail = useCallback(() => {
    const values =
      lastValues.current ?? (formRef.current ? readInquiryForm(formRef.current) : null);
    if (!values) return;
    const built = buildInquiryMail(kind, values);
    focusTarget.current = "handoff";
    setMail(built);
    // Lange Texte bleiben zunächst sichtbar, damit kein unvollständiger Entwurf unbemerkt versendet wird.
    if (!built.shortened) window.location.href = built.href;
  }, [kind]);

  const editAgain = useCallback(() => {
    focusTarget.current = "name";
    setMail(null);
    setPhase("editing");
  }, []);

  const errorId = useCallback((field: InquiryField) => `${baseId}-${field}-error`, [baseId]);
  const inputId = useCallback((field: InquiryField) => `${baseId}-${field}`, [baseId]);

  const fieldProps = useCallback(
    (field: InquiryField) => ({
      id: inputId(field),
      name: field,
      disabled: phase === "sending",
      "aria-invalid": errors[field] ? ("true" as const) : ("false" as const),
      "aria-required": isInquiryFieldRequired(kind, field) || undefined,
      "aria-describedby": errors[field] ? errorId(field) : undefined,
    }),
    [errors, errorId, inputId, kind, phase],
  );

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  return {
    formRef,
    handoffRef,
    failureRef,
    errors,
    hasErrors,
    attempts,
    phase,
    reference,
    failure,
    allowMailFallback,
    mail,
    submittedEmail: lastValues.current?.email ?? "",
    onSubmit,
    onChange,
    prepareMail,
    editAgain,
    fieldProps,
    errorId,
    inputId,
  };
}
