import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
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
} from "@/lib/inquiry";
import { sendeAnfrage } from "@/lib/anfrage";
import { copyText } from "@/lib/clipboard";

/**
 * State for an inquiry form: validates on submit, re-checks edited fields after the first attempt and
 * sends a valid inquiry to the server ingress (`/api/anfrage`). Only when that path is unavailable does
 * it fall back to the visitor's e-mail program — the page must never get worse than before.
 */
export function useInquiryForm(kind: InquiryKind) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const handoffRef = useRef<HTMLHeadingElement>(null);
  const focusTarget = useRef<InquiryField | "handoff" | "fehler" | null>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [attempts, setAttempts] = useState(0);
  const [mail, setMail] = useState<InquiryMail | null>(null);
  const [nummer, setNummer] = useState<string | null>(null);
  const [senden, setSenden] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  useEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    if (target === "handoff") handoffRef.current?.focus();
    else if (target === "fehler") handoffRef.current?.focus();
    else if (target) (formRef.current?.elements.namedItem(target) as HTMLElement | null)?.focus();
  });

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const values = readInquiryForm(event.currentTarget);
      const next = validateInquiry(kind, values);
      setAttempts((count) => count + 1);
      setErrors(next);
      const first = firstInvalidField(next);
      if (first) {
        focusTarget.current = first;
        return;
      }

      setFehler(null);
      setSenden(true);
      const ergebnis = await sendeAnfrage(kind, values);
      setSenden(false);

      if (ergebnis.nummer) {
        setNummer(ergebnis.nummer);
        focusTarget.current = "handoff";
        return;
      }

      // Rueckfall: der Serverpfad ist nicht erreichbar. Der Besucher behaelt einen Weg zum Ziel.
      const built = buildInquiryMail(kind, values);
      if (built.shortened) void copyText(built.body);
      setMail(built);
      setFehler(
        ergebnis.fehler
          ? `${ergebnis.fehler} Sie können die Anfrage weiterhin per E-Mail senden.`
          : "Der direkte Versand war nicht möglich. Sie können die Anfrage per E-Mail senden.",
      );
      focusTarget.current = "fehler";
    },
    [kind],
  );

  /** After the first attempt, each edit re-checks just that field so messages clear as soon as it is fixed. */
  const onChange = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (attempts === 0) return;
      const field = (event.target as HTMLInputElement).name as InquiryField;
      if (!INQUIRY_FIELD_ORDER.includes(field)) return;
      const message = validateInquiryField(kind, field, readInquiryForm(event.currentTarget));
      setErrors((current) =>
        current[field] === message ? current : { ...current, [field]: message },
      );
    },
    [attempts, kind],
  );

  const editAgain = useCallback(() => {
    focusTarget.current = "name";
    setMail(null);
    setNummer(null);
    setFehler(null);
  }, []);

  const errorId = useCallback((field: InquiryField) => `${baseId}-${field}-error`, [baseId]);
  const inputId = useCallback((field: InquiryField) => `${baseId}-${field}`, [baseId]);

  const fieldProps = useCallback(
    (field: InquiryField) => ({
      id: inputId(field),
      name: field,
      "aria-invalid": errors[field] ? ("true" as const) : ("false" as const),
      "aria-required": isInquiryFieldRequired(kind, field) || undefined,
      "aria-describedby": errors[field] ? errorId(field) : undefined,
    }),
    [errors, errorId, inputId, kind],
  );

  const hasErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  return {
    formRef,
    handoffRef,
    errors,
    hasErrors,
    attempts,
    mail,
    nummer,
    senden,
    fehler,
    onSubmit,
    onChange,
    editAgain,
    fieldProps,
    errorId,
    inputId,
  };
}
