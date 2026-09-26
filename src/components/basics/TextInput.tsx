import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { IconName } from "@/types";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

interface FieldShellProps {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div className="field">
      {label ? (
        <label className="field-label" htmlFor={id}>
          {label}
          {optional ? <span className="field-optional"> · optional</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  icon?: IconName;
  suffix?: ReactNode;
}

export function TextInput({
  label,
  hint,
  error,
  optional,
  icon,
  suffix,
  className,
  id,
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
    >
      <div className={joinClasses("input-shell", !icon && "input-shell-plain")}>
        {icon ? (
          <span className="input-icon">
            <Icon name={icon} size={16} />
          </span>
        ) : null}
        <input
          id={inputId}
          className={joinClasses("input", error && "input-invalid", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {suffix ? <span className="input-suffix">{suffix}</span> : null}
      </div>
    </FieldShell>
  );
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  className,
  id,
  rows = 4,
  ...rest
}: TextAreaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      optional={optional}
    >
      <textarea
        id={inputId}
        rows={rows}
        className={joinClasses(
          "input input-textarea",
          error && "input-invalid",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
    </FieldShell>
  );
}

export default TextInput;
