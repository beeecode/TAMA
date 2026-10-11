import type { ReactNode } from "react";

export interface SettingsRowProps {
  label: string;
  help?: string;
  children?: ReactNode;
  /** Last row in a card, so it drops the divider. */
  last?: boolean;
}

/** One setting: what it is on the left, the control on the right. */
export function SettingsRow({ label, help, children, last = false }: SettingsRowProps) {
  return (
    <div
      className="flex items-center justify-between gap-6 px-5"
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: last ? "none" : "1px solid #EAEAEF",
      }}
    >
      <div style={{ maxWidth: 420 }}>
        <div className="text-text-primary" style={{ fontSize: 13, fontWeight: 500 }}>
          {label}
        </div>
        {help && (
          <div className="text-text-secondary mt-0.5" style={{ fontSize: 12, lineHeight: "18px" }}>
            {help}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">{children}</div>
    </div>
  );
}

export interface SettingsToggleProps {
  on: boolean;
  onChange: (next: boolean) => void;
  label?: string;
}

/** The pill switch used throughout settings. */
export function SettingsToggle({ on, onChange, label }: SettingsToggleProps) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className="rounded-full transition-colors cursor-pointer relative"
      style={{
        width: 40,
        height: 22,
        background: on ? "#16161D" : "#D5D5DE",
        border: "none",
        flexShrink: 0,
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          width: 16,
          height: 16,
          background: "#FFFFFF",
          top: 3,
          left: on ? 21 : 3,
          transition: "left 0.18s cubic-bezier(0.2,0,0,1)",
        }}
      />
    </button>
  );
}

export interface SettingsSelectProps {
  value: string;
  options: string[];
  onChange: (next: string) => void;
  width?: number;
}

export function SettingsSelect({ value, options, onChange, width = 160 }: SettingsSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg px-3 cursor-pointer outline-none"
      style={{
        height: 34,
        width,
        border: "1px solid #D5D5DE",
        background: "#FFFFFF",
        fontSize: 13,
        color: "#16161D",
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SettingsRow;
