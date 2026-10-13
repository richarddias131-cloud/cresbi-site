import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type Base = { label: string; help?: ReactNode; error?: string; id: string };

function Wrap({ label, help, error, id, children }: Base & { children: ReactNode }) {
  const msg = error ?? help;
  return (
    <label className={`cr-field${error ? " cr-field--error" : ""}`} htmlFor={id}>
      <span className="cr-field__label">{label}</span>
      {children}
      {msg ? (
        <span className="cr-field__help" id={`${id}-help`} aria-live={error ? "polite" : undefined}>
          {msg}
        </span>
      ) : null}
    </label>
  );
}

const a11y = (id: string, error?: string, help?: ReactNode) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error || help ? `${id}-help` : undefined,
});

/** Campo de texto do design system (.cr-field). */
export function Input({ label, help, error, id, className = "", ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap label={label} help={help} error={error} id={id}>
      <input className={`cr-field__input ${className}`.trim()} {...a11y(id, error, help)} {...rest} />
    </Wrap>
  );
}

export function Select({ label, help, error, id, className = "", children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap label={label} help={help} error={error} id={id}>
      <select className={`cr-field__input ${className}`.trim()} {...a11y(id, error, help)} {...rest}>
        {children}
      </select>
    </Wrap>
  );
}

export function Textarea({ label, help, error, id, className = "", ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap label={label} help={help} error={error} id={id}>
      <textarea className={`cr-field__input ${className}`.trim()} {...a11y(id, error, help)} {...rest} />
    </Wrap>
  );
}
