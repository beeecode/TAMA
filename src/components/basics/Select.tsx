import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "children"> {
  options: SelectOption[];
  label?: string;
  hint?: string;
  size?: "sm" | "md";
  /** Placeholder row, rendered as a disabled first option. */
  placeholder?: string;
}

export function Select({
  options,
  label,
  hint,
  size = "md",
  placeholder,
  className,
  id,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const control = (
    <div className="select-shell">
      <select
        id={selectId}
        className={joinClasses("select", size === "sm" && "select-sm", className)}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select-caret">
        <Icon name="chevronDown" size={14} />
      </span>
    </div>
  );

  if (!label && !hint) return control;

  return (
    <div className="field">
      {label ? (
        <label className="field-label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      {control}
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}

export default Select;
