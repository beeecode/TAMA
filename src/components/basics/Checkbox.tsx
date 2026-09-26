import { useId } from "react";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  /** Header checkboxes that stand for a partly selected set. */
  indeterminate?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled = false,
  ariaLabel,
  className,
}: CheckboxProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={joinClasses(
        "checkbox",
        checked && !indeterminate && "checkbox-checked",
        indeterminate && "checkbox-indeterminate",
        disabled && "checkbox-disabled",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="visually-hidden"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
        aria-label={ariaLabel ?? (label ? undefined : "Select")}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="checkbox-box" aria-hidden="true">
        <Icon name={indeterminate ? "minus" : "check"} size={12} strokeWidth={2.6} />
      </span>
      {label ? <span className="checkbox-label">{label}</span> : null}
    </label>
  );
}

export default Checkbox;
