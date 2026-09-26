import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/basics/Button";
import { Icon, SourceIcon, type SourceName } from "@/components/basics/Icon";
import { StepProgress } from "./parts/StepProgress";

/** TAMA cannot build a forecast from fewer than two sources. */
const MINIMUM = 2;

interface Source {
  name: SourceName;
  category: string;
  /** What this source actually contributes to a forecast. */
  signal: string;
}

const SOURCES: Source[] = [
  { name: "Google Calendar", category: "Calendar", signal: "Real working hours and holidays" },
  { name: "Slack", category: "Messaging", signal: "Early warning on blockers" },
  { name: "Asana", category: "Tasks", signal: "Completed work and cycle times" },
  { name: "Jira", category: "Tasks", signal: "Closed-issue history" },
  { name: "Notion", category: "Docs", signal: "Specs linked to the work" },
  { name: "Google Drive", category: "Storage", signal: "Scope arriving before it lands" },
  { name: "Gmail", category: "Email", signal: "External approvals and replies" },
  { name: "Figma", category: "Design", signal: "Design handoff timing" },
];

export function ConnectStepPage() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState<SourceName[]>(["Google Calendar", "Slack"]);

  const enough = connected.length >= MINIMUM;

  const toggle = (name: SourceName) =>
    setConnected((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );

  return (
    <>
      <StepProgress step={2} />

      <div style={{ width: "100%", maxWidth: 640 }}>
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
          Connect where work <span className="accent">already happens</span>
        </h1>
        <p
          className="text-text-secondary rise mb-8"
          style={{ fontSize: 15, lineHeight: "24px", ["--i" as string]: 1 }}
        >
          Two sources is the minimum. Each one you add narrows the forecast —
          TAMA reads activity and timing, never message content.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {SOURCES.map((source, index) => {
            const isOn = connected.includes(source.name);
            return (
              <button
                key={source.name}
                onClick={() => toggle(source.name)}
                aria-pressed={isOn}
                className="flex items-center gap-3 rounded-2xl px-4 text-left lift press rise"
                style={{
                  height: 80,
                  background: isOn ? "#EEEFFC" : "#FFFFFF",
                  border: `1px solid ${isOn ? "#B9BCF0" : "#EAEAEF"}`,
                  boxShadow: "0 1px 2px rgba(22,22,29,0.05)",
                  cursor: "pointer",
                  ["--i" as string]: index + 2,
                }}
              >
                <SourceIcon name={source.name} size={20} tile />
                <div className="flex-1 min-w-0">
                  <div className="text-text-primary font-semibold" style={{ fontSize: 13 }}>
                    {source.name}
                  </div>
                  <div className="text-text-tertiary truncate" style={{ fontSize: 11 }}>
                    {isOn ? source.signal : source.category}
                  </div>
                </div>
                {isOn ? (
                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0 pop"
                    style={{ width: 24, height: 24, background: "#5F63C9" }}
                  >
                    <Icon className="draw-check" name="check" size={12} weight="bold" color="#FFFFFF" />
                  </span>
                ) : (
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{ width: 24, height: 24, border: "1.5px solid #D5D5DE" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 22,
                height: 22,
                background: enough ? "#E8F7F1" : "#F7F7F9",
              }}
            >
              <Icon
                name={enough ? "check" : "alert"}
                size={13}
                strokeWidth={2}
                className={enough ? "text-on-track" : "text-text-tertiary"}
              />
            </span>
            <span className="text-text-secondary" style={{ fontSize: 13 }}>
              <span
                className="tick-in"
                key={connected.length}
                style={{ fontFamily: "var(--font-mono)", color: "#16161D" }}
              >
                {connected.length}
              </span>{" "}
              of {MINIMUM} minimum connected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/onboarding/building")}>
              Skip for now
            </Button>
            <Button
              variant="primary"
              size="lg"
              disabled={!enough}
              onClick={() => navigate("/onboarding/building")}
            >
              Continue
              <Icon name="arrowRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectStepPage;
