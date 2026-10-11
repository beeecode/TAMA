import { useId } from "react";
import { joinClasses } from "@/helpers/joinClasses";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: "sm" | "md";
  disabled?: boolean;
  /** Use when the label sits elsewhere on the page. */
  ariaLabel?: string;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  size = "md",
  disabled = false,
  ariaLabel,
  className,
}: ToggleProps) {
  const id = useId();

  return (
    <label
      className={joinClasses(
        "toggle",
        checked && "toggle-on",
        size === "sm" && "toggle-sm",
        disabled && "toggle-disabled",
        className,
      )}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        className="visually-hidden"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel ?? (label ? undefined : "Toggle")}
        aria-describedby={description ? `${id}-desc` : undefined}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      {label || description ? (
        <span className="toggle-text">
          {label ? <span className="toggle-label">{label}</span> : null}
          {description ? (
            <span className="toggle-desc" id={`${id}-desc`}>
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}

export default Toggle;
