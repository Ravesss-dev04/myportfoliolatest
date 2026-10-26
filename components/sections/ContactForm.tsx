"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, LoaderCircle, Send, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import {
  initialContactState,
  readContactForm,
  validateContact,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/contact-schema";

const TOAST_MS = 5000;

const noopSubscribe = () => () => {};

function BodyPortal({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return isClient ? createPortal(children, document.body) : null;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);
  const [dismissedAt, setDismissedAt] = useState(0);

  const errors = clientErrors ?? state.fieldErrors;
  const toastVisible = state.status === "success" && state.submittedAt > dismissedAt;

  useEffect(() => {
    if (state.status !== "success") return;
    formRef.current?.reset();
    const timer = window.setTimeout(() => setDismissedAt(state.submittedAt), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [state.status, state.submittedAt]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { fieldErrors } = validateContact(readContactForm(new FormData(event.currentTarget)));
    const firstInvalid = (Object.keys(fieldErrors) as ContactField[])[0];
    if (firstInvalid) {
      event.preventDefault();
      setClientErrors(fieldErrors);
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setClientErrors(null);
  };

  const clearFieldError = (field: ContactField) => {
    if (clientErrors?.[field]) setClientErrors({ ...clientErrors, [field]: undefined });
  };

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="contact-form-status"
        className="pf-card relative w-full p-6 text-left shadow-panel sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="contact-name" name="name" label="Name" error={errors.name} onInput={() => clearFieldError("name")}>
            {(props) => <input {...props} type="text" autoComplete="name" placeholder="Your name" className="pf-input" />}
          </Field>
          <Field id="contact-email" name="email" label="Email" error={errors.email} onInput={() => clearFieldError("email")}>
            {(props) => (
              <input {...props} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" className="pf-input" />
            )}
          </Field>
        </div>
        <div className="mt-5">
          <Field id="contact-message" name="message" label="Message" error={errors.message} onInput={() => clearFieldError("message")}>
            {(props) => (
              <textarea {...props} rows={5} placeholder="What are you building, and where could I help?" className="pf-textarea" />
            )}
          </Field>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p id="contact-form-status" role="status" aria-live="polite" className="text-xs text-white/50">
            {state.status === "error" && !clientErrors ? state.message : "I usually reply within two working days."}
          </p>
          <Button type="submit" disabled={pending} className="sm:min-w-40">
            {pending ? (
              <LoaderCircle size={15} strokeWidth={1.8} aria-hidden="true" className="animate-spin" />
            ) : (
              <Send size={15} strokeWidth={1.6} aria-hidden="true" />
            )}
            {pending ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>

      <BodyPortal>
      <AnimatePresence>
        {toastVisible ? (
          <motion.div
            key={state.submittedAt}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--pf-success)_55%,transparent)] bg-pf-surface-raised p-4 text-left shadow-modal"
          >
            <CircleCheck size={18} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0 text-[#4db8a6]" />
            <p className="text-sm leading-relaxed text-pf-text-secondary">{state.message}</p>
            <button
              type="button"
              onClick={() => setDismissedAt(state.submittedAt)}
              aria-label="Dismiss notification"
              className="-m-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-white/40 transition-colors duration-180 hover:text-white"
            >
              <X size={15} strokeWidth={1.6} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </BodyPortal>
    </>
  );
}

interface FieldControlProps {
  id: string;
  name: string;
  required: true;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  onInput: () => void;
}

interface FieldProps {
  id: string;
  name: ContactField;
  label: string;
  error?: string;
  onInput: () => void;
  children: (props: FieldControlProps) => ReactNode;
}

function Field({ id, name, label, error, onInput, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-pf-accent/60">
        {label}
      </label>
      {children({
        id,
        name,
        required: true,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
        onInput,
      })}
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-[#c05050]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
