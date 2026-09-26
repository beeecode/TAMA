import { SparkleIcon } from "@/components/basics/Icon";
import { SIGNALS_REQUIRED } from "@/data/projects";

export interface LearningStateProps {
  /** Completed items TAMA has learned from so far. */
  signals: number;
  required?: number;
  label?: string;
}

/**
 * What TAMA shows instead of a number it has not earned.
 *
 * Below the signal threshold there is no probability here at all — an em dash
 * and a count. A confident-looking figure built on nine data points is worse
 * than no figure, and the hatching says the same thing visually.
 */
export function LearningState({
  signals,
  required = SIGNALS_REQUIRED,
  label = "Probability of hitting your committed date",
}: LearningStateProps) {
  const remaining = Math.max(0, required - signals);
  const progress = Math.min(1, signals / required);

  return (
    <div className="flex gap-12 items-start">
      <div>
        <div
          className="text-text-tertiary uppercase mb-4"
          style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
        >
          {label}
        </div>
        <div className="flex items-center gap-4 mb-2">
          <span
            style={{
              fontSize: 72,
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              color: "#9494A3",
              lineHeight: 1,
            }}
          >
            —
          </span>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "#DCDDF8", border: "1px solid #B9BCF0" }}
          >
            <SparkleIcon size={14} color="#8B8FE8" />
            <span
              style={{
                fontSize: 11,
                color: "#5F63C9",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Learning · {signals} of {required} signals
            </span>
          </div>
        </div>
        <div className="text-text-secondary" style={{ fontSize: 14 }}>
          {remaining === 0
            ? "Enough history now — the forecast appears on the next update."
            : `TAMA needs ${remaining} more completed ${
                remaining === 1 ? "task" : "tasks"
              } before it will quote odds.`}
        </div>
      </div>
      <div className="flex-1 mt-2">
        <div className="relative">
          <div
            className="w-full rounded-full overflow-hidden relative"
            style={{ height: 14, background: "#EAEAEF" }}
          >
            <div className="absolute inset-0 hatch-overlay" />
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                background: "rgba(139,143,232,0.4)",
                transition: "width 0.6s cubic-bezier(0.2,0,0,1)",
              }}
            />
          </div>
        </div>
        <div className="text-text-tertiary mt-3" style={{ fontSize: 12 }}>
          Connect more completed work to improve signal quality.
        </div>
      </div>
    </div>
  );
}

export default LearningState;
