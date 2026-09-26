import { Icon } from "@/components/basics/Icon";
import { useNavigate } from "react-router-dom";
import { ONBOARDING_STEPS } from "@/data/navigation";

export interface StepProgressProps {
  /** 1-based. */
  step: number;
  total?: number;
}

/**
 * A labelled rail rather than anonymous dots — at a glance you can see what
 * the remaining steps actually are. Completed segments are clickable, which
 * is the only way back through the flow.
 */
export function StepProgress({ step, total = ONBOARDING_STEPS.length }: StepProgressProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-12" style={{ maxWidth: 520 }}>
      <div className="flex items-end gap-2">
        {ONBOARDING_STEPS.slice(0, total).map((entry, index) => {
          const number = index + 1;
          const done = number < step;
          const current = number === step;

          return (
            <button
              key={entry.path}
              onClick={() => done && navigate(entry.path)}
              disabled={!done}
              aria-current={current ? "step" : undefined}
              className="flex-1 text-left group"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: done ? "pointer" : "default",
              }}
            >
              <div
                className="flex items-center gap-1.5 mb-2 transition-colors"
                style={{
                  fontSize: 11,
                  fontWeight: current ? 600 : 500,
                  color: current ? "#5F63C9" : done ? "#62626F" : "#9494A3",
                }}
              >
                {done ? (
                  <Icon className="draw-check" name="check" size={12} color="#5F63C9" />
                ) : (
                  <span
                    style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
                  >
                    {number}
                  </span>
                )}
                {entry.label}
              </div>
              <div
                className="rounded-full overflow-hidden"
                style={{ height: 3, background: "#EAEAEF" }}
              >
                <div
                  style={{
                    height: "100%",
                    width: done ? "100%" : current ? "50%" : "0%",
                    background: "#5F63C9",
                    transition: "width 0.5s var(--ease-out)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StepProgress;
