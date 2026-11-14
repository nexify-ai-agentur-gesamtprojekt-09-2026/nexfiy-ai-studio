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
import { copyText } from "@/lib/clipboard";

/**
 * State for an inquiry form: validates on submit, re-checks edited fields after the first attempt,
 * focuses the first problem and hands a valid inquiry to the visitor's e-mail program.
 */
export function useInquiryForm(kind: InquiryKind) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const handoffRef = useRef<HTMLHeadingElement>(null);
  const focusTarget = useRef<InquiryField | "handoff" | null>(null);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [attempts, setAttempts] = useState(0);
  const [mail, setMail] = useState<InquiryMail | null>(null);

  useEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    if (target === "handoff") handoffRef.current?.focus();
    else if (target) (formRef.current?.elements.namedItem(target) as HTMLElement | null)?.focus();
  });

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
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
      const built = buildInquiryMail(kind, values);
      if (built.shortened) void copyText(built.body);
      focusTarget.current = "handoff";
      setMail(built);
      window.location.href = built.href;
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
      setErrors((current) => (current[field] === message ? current : { ...current, [field]: message }));
    },
    [attempts, kind],
  );

  const editAgain = useCallback(() => {
    focusTarget.current = "name";
    setMail(null);
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
    onSubmit,
    onChange,
    editAgain,
    fieldProps,
    errorId,
    inputId,
  };
}
