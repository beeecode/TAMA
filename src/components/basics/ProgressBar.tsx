import type { Tone } from "@/types";
import { joinClasses } from "@/helpers/joinClasses";
import { clamp01, formatPercent } from "@/helpers/formatNumber";

export interface ProgressBarProps {
  /** 0–1. */
  value: number;
  label?: string;
  /** Right-hand caption. Defaults to the value as a percentage. */
  valueLabel?: string;
  tone?: Extract<Tone, "accent" | "positive" | "caution" | "critical">;
  size?: "sm" | "md" | "lg";
  showMeta?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  label,
  valueLabel,
  tone = "accent",
  size = "md",
  showMeta = true,
  className,
}: ProgressBarProps) {
  const ratio = clamp01(value);
  const meta = showMeta && (label || valueLabel !== undefined);

  return (
    <div
      className={joinClasses(
        "progress",
        size !== "md" && `progress-${size}`,
        tone !== "accent" && `progress-${tone}`,
        className,
      )}
    >
      {meta ? (
        <div className="progress-meta">
          {label ? <span>{label}</span> : <span />}
          <span className="progress-value">{valueLabel ?? formatPercent(ratio)}</span>
        </div>
      ) : null}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div className="progress-fill" style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
