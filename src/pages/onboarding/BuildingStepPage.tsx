import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/basics/Button";
import { Icon, SourceIcon, SparkleIcon, type SourceName } from "@/components/basics/Icon";
import { projects, SIGNALS_REQUIRED } from "@/data/projects";
import { StepProgress } from "./parts/StepProgress";

interface ReadSource {
  name: SourceName;
  /** What TAMA found in it, counted up as it reads. */
  count: number;
  unit: string;
}

const SOURCES: ReadSource[] = [
  { name: "Google Calendar", count: 316, unit: "events" },
  { name: "Slack", count: 872, unit: "messages" },
  { name: "Asana", count: 1204, unit: "completed tasks" },
];

const STEP_MS = 850;

/** Counts from zero to `target` once `run` turns true. */
function useCountUp(target: number, run: boolean, duration = 700) {
  const [value, setValue] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease out, so it decelerates into the final number.
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, run, duration]);

  return value;
}

function SourceRow({ source, read, index }: { source: ReadSource; read: boolean; index: number }) {
  const count = useCountUp(source.count, read);

  return (
    <div
      className="flex items-center gap-3 px-5 rise"
      style={{
        height: 60,
        borderTop: index > 0 ? "1px solid #EAEAEF" : "none",
        ["--i" as string]: index,
      }}
    >
      <SourceIcon name={source.name} size={18} tile />
      <span className="flex-1 text-text-primary" style={{ fontSize: 13 }}>
        {source.name}
      </span>
      {read ? (
        <span
          className="text-text-secondary"
          style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
        >
          {count.toLocaleString()} {source.unit}
        </span>
      ) : (
        <span className="text-text-tertiary" style={{ fontSize: 12 }}>
          reading…
        </span>
      )}
      {read ? (
        <span
          className="flex items-center justify-center rounded-full flex-shrink-0 pop"
          style={{ width: 20, height: 20, background: "#E8F7F1" }}
        >
          <Icon name="check" size={11} strokeWidth={2.4} className="text-on-track" />
        </span>
      ) : (
        <span
          className="rounded-full flex-shrink-0 animate-spin-slow"
          style={{
            width: 20,
            height: 20,
            border: "2px solid #DCDDF8",
            borderTopColor: "#5F63C9",
          }}
        />
      )}
    </div>
  );
}

/**
 * Step 3 — the Learn half of "Connect · Learn · Forecast". TAMA measures real
 * cycle times from completed work, and says out loud which projects have
 * enough history to be worth a number.
 */
export function BuildingStepPage() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  const totalTicks = SOURCES.length + projects.length;
  const done = tick >= totalTicks;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setTick((value) => value + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [tick, done]);

  return (
    <>
      <StepProgress step={3} />

      <div style={{ width: "100%", maxWidth: 640 }}>
        <div className="flex items-center gap-2 mb-5">
          <span
            className={`flex items-center justify-center rounded-full ${done ? "" : "pulse-ring"}`}
            style={{ width: 28, height: 28, background: "#EEEFFC" }}
          >
            <SparkleIcon size={15} />
          </span>
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
            {done ? "Calibrated" : "Reading your history"}
          </span>
        </div>

        <h1
          className="rise"
          style={{
            fontFamily: "var(--font-tight)",
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: "-0.014em",
            margin: "0 0 8px",
            color: "#16161D",
          }}
        >
          Measuring how you <span className="accent">actually</span> deliver
        </h1>
        <p
          className="text-text-secondary rise mb-8"
          style={{ fontSize: 15, lineHeight: "24px", ["--i" as string]: 1 }}
        >
          No story points, no estimation session. TAMA reads completed work and
          measures your real cycle times.
        </p>

        {/* Sources */}
        <div
          className="rounded-2xl mb-4"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAEAEF",
            boxShadow: "0 1px 2px rgba(22,22,29,0.05)",
          }}
        >
          {SOURCES.map((source, index) => (
            <SourceRow
              key={source.name}
              source={source}
              index={index}
              read={tick > index}
            />
          ))}
        </div>

        {/* Per-project signal counts */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EAEAEF",
            boxShadow: "0 1px 2px rgba(22,22,29,0.05)",
          }}
        >
          <div
            className="text-text-tertiary uppercase mb-4"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
          >
            Signals found per project
          </div>
          {projects.map((project, index) => {
            const counted = tick > SOURCES.length + index;
            const ratio = Math.min(1, project.signals / SIGNALS_REQUIRED);
            const learning = project.maturity === "learning";
            return (
              <div key={project.id} className="flex items-center gap-3 mb-3 last:mb-0">
                <div
                  className="flex-shrink-0 rounded"
                  style={{ width: 10, height: 10, background: project.color, borderRadius: 3 }}
                />
                <span
                  className="text-text-primary truncate"
                  style={{ fontSize: 13, width: 160 }}
                >
                  {project.name}
                </span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 6, background: "#EAEAEF" }}
                >
                  <div
                    style={{
                      width: counted ? `${ratio * 100}%` : 0,
                      height: "100%",
                      background: learning ? "#B9BCF0" : "#8B8FE8",
                      transition: "width 0.7s var(--ease-out)",
                    }}
                  />
                </div>
                {counted ? (
                  <span
                    className="pop"
                    style={{
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      color: learning ? "#5F63C9" : "#9494A3",
                      width: 104,
                      textAlign: "right",
                    }}
                  >
                    {learning
                      ? `learning · ${project.signals}/${SIGNALS_REQUIRED}`
                      : `${project.signals} signals`}
                  </span>
                ) : (
                  <span style={{ width: 104 }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-tertiary" style={{ fontSize: 13 }}>
            {done
              ? `Projects under ${SIGNALS_REQUIRED} signals will say so instead of guessing.`
              : "This usually takes under a minute."}
          </span>
          <Button
            variant="primary"
            size="lg"
            disabled={!done}
            onClick={() => navigate("/onboarding/review")}
          >
            {done ? "See your first forecast" : "Working…"}
            {done && <Icon name="arrowRight" size={16} />}
          </Button>
        </div>
      </div>
    </>
  );
}

export default BuildingStepPage;
