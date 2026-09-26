import type { InputHTMLAttributes } from "react";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size"> {
  value: string;
  onValueChange: (value: string) => void;
  /** Shown on the right when the field is empty, e.g. "⌘K". */
  shortcut?: string;
  label?: string;
}

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search",
  shortcut,
  label = "Search",
  className,
  ...rest
}: SearchInputProps) {
  return (
    <div className={joinClasses("search", className)}>
      <span className="input-icon">
        <Icon name="search" size={16} />
      </span>
      <input
        type="search"
        className="input"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        {...rest}
      />
      {value ? (
        <button
          type="button"
          className="search-clear"
          aria-label="Clear search"
          onClick={() => onValueChange("")}
        >
          <Icon name="close" size={14} />
        </button>
      ) : shortcut ? (
        <span className="search-clear" aria-hidden="true">
          <kbd className="kbd">{shortcut}</kbd>
        </span>
      ) : null}
    </div>
  );
}

export default SearchInput;
