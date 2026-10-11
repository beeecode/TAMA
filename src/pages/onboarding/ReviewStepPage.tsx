import { useNavigate } from "react-router-dom";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";
import {
  forecastedProjects,
  learningProjects,
  SIGNALS_REQUIRED,
} from "@/data/projects";
import { StepProgress } from "./parts/StepProgress";

const PERCENTILES = [
  { label: "P50", meaning: "a coin flip", tint: "#8B8FE8" },
  { label: "P85", meaning: "commit to this", tint: "#B9BCF0" },
  { label: "P95", meaning: "safe to promise", tint: "#DCDDF8" },
];

/**
 * Step 4 — the first forecast. It arrives with what it is based on, and with
 * the projects TAMA will not yet quote odds on named out loud. A forecast
 * without that is a number nobody believes.
 */
export function ReviewStepPage() {
  const navigate = useNavigate();

  return (
    <>
      <StepProgress step={4} />

      <div style={{ width: "100%", maxWidth: 640 }}>
        <div className="flex items-center gap-2 mb-5">
          <span
            className="flex items-center justify-center rounded-full pop"
            style={{ width: 28, height: 28, background: "#E8F7F1" }}
          >
            <Icon name="check" size={15} strokeWidth={2.4} className="text-on-track" />
          </span>
          <span
            style={{
              fontSize: 11,
              color: "#2F9E6B",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Workspace ready
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
          Your <span className="accent">first</span> forecast
        </h1>
        <p
          className="text-text-secondary rise mb-6"
          style={{ fontSize: 15, lineHeight: "24px", ["--i" as string]: 1 }}
        >
          Every date is now three dates. This is the whole idea — pick the one
          whose odds you can defend.
        </p>

        {/* The key, once, before the bars mean anything */}
        <div className="flex gap-2 mb-6 rise" style={{ ["--i" as string]: 2 }}>
          {PERCENTILES.map((p) => (
            <div
              key={p.label}
              className="flex-1 rounded-xl px-3 py-2.5"
              style={{ background: "#FFFFFF", border: "1px solid #EAEAEF" }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full"
                  style={{ width: 8, height: 8, background: p.tint }}
                />
                <span
                  className="text-text-primary"
                  style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 500 }}
                >
                  {p.label}
                </span>
              </div>
              <div className="text-text-tertiary mt-0.5" style={{ fontSize: 11 }}>
                {p.meaning}
              </div>
            </div>
          ))}
        </div>

        {/* Forecasts */}
        <div className="flex flex-col gap-3 mb-4">
          {forecastedProjects.map((project, index) => (
            <div
              key={project.id}
              className="rounded-2xl p-5 rise lift"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAEAEF",
                boxShadow: "0 1px 2px rgba(22,22,29,0.05)",
                ["--i" as string]: index + 3,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded flex-shrink-0"
                  style={{
                    width: 8,
                    height: 8,
                    background: project.color,
                    borderRadius: 2,
                  }}
                />
                <span
                  className="text-text-primary font-medium"
                  style={{ fontSize: 13, fontFamily: "var(--font-tight)" }}
                >
                  {project.name}
                </span>
                <span
                  className="text-text-tertiary ml-auto"
                  style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
                >
                  {project.signals} signals
                </span>
              </div>
              <ConfidenceBar
                p50Label={project.forecast!.p50}
                p85Label={project.forecast!.p85}
                p95Label={project.forecast!.p95}
                p50Position={project.forecast!.p50Pos}
                p85Position={project.forecast!.p85Pos}
                height={10}
              />
            </div>
          ))}
        </div>

        {/* What TAMA will not guess at */}
        {learningProjects.length > 0 && (
          <div
            className="rounded-2xl p-4 mb-8 rise"
            style={{
              background: "#EEEFFC",
              border: "1px solid #DCDDF8",
              ["--i" as string]: forecastedProjects.length + 3,
            }}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">
                <SparkleIcon size={14} />
              </div>
              <div>
                <div className="text-ai-strong font-medium mb-1" style={{ fontSize: 12 }}>
                  Still learning ·{" "}
                  {learningProjects.map((project) => project.name).join(", ")}
                </div>
                <div className="text-text-secondary" style={{ fontSize: 12, lineHeight: "18px" }}>
                  Under {SIGNALS_REQUIRED} completed items the odds would be
                  guesswork, so TAMA shows none. These start forecasting on
                  their own as work closes.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-text-tertiary" style={{ fontSize: 13 }}>
            Forecasts update every time work moves.
          </span>
          <Button variant="primary" size="lg" onClick={() => navigate("/app")}>
            Go to workspace
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ReviewStepPage;
