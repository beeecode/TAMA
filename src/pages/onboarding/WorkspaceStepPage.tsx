import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/basics/Button";
import { Icon } from "@/components/basics/Icon";
import { StepProgress } from "./parts/StepProgress";

const TEAM_SIZES = ["1–10", "11–25", "26–50", "50+"];

const WORK_TYPES: { id: string; label: string; icon: "board" | "sparkle" | "chart" | "grid" }[] = [
  { id: "product", label: "Product", icon: "board" },
  { id: "marketing", label: "Marketing", icon: "sparkle" },
  { id: "platform", label: "Platform", icon: "grid" },
  { id: "agency", label: "Client work", icon: "chart" },
];

/** "Meridian Ops" -> "meridian-ops" */
function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 32);
}

/**
 * Step 1 — name the workspace. Three questions, because the promise on the
 * landing page is a working workspace in ninety seconds.
 */
export function WorkspaceStepPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [size, setSize] = useState(TEAM_SIZES[1]);
  const [types, setTypes] = useState<string[]>(["product"]);

  const slug = toSlug(name);
  const ready = name.trim().length > 1;

  const toggleType = (id: string) =>
    setTypes((current) =>
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id],
    );

  return (
    <>
      <StepProgress step={1} />

      <div style={{ width: "100%", maxWidth: 520 }}>
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
          Let's set up your <span className="accent">workspace</span>
        </h1>
        <p
          className="text-text-secondary rise mb-10"
          style={{ fontSize: 15, lineHeight: "24px", ["--i" as string]: 1 }}
        >
          Three quick answers. TAMA works out the rest from the tools you
          already use.
        </p>

        {/* Name + live address */}
        <div className="rise mb-8" style={{ ["--i" as string]: 2 }}>
          <label
            className="text-text-tertiary uppercase mb-2 block"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
            htmlFor="workspace-name"
          >
            Workspace name
          </label>
          <input
            id="workspace-name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Meridian Ops"
            className="w-full rounded-xl px-4 outline-none text-text-primary transition-colors"
            style={{
              height: 52,
              border: "1px solid #D5D5DE",
              background: "#FFFFFF",
              fontSize: 17,
              fontFamily: "var(--font-tight)",
              fontWeight: 500,
            }}
          />
          <div
            className="flex items-center gap-1.5 mt-2"
            style={{ fontSize: 12, color: "#9494A3", fontFamily: "var(--font-mono)" }}
          >
            <Icon name="link" size={12} />
            tama.app/
            <span style={{ color: slug ? "#5F63C9" : "#9494A3" }}>
              {slug || "your-workspace"}
            </span>
          </div>
        </div>

        {/* Team size */}
        <div className="rise mb-8" style={{ ["--i" as string]: 3 }}>
          <div
            className="text-text-tertiary uppercase mb-2"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
          >
            How many people deliver work here?
          </div>
          <div className="flex gap-2">
            {TEAM_SIZES.map((option) => {
              const selected = option === size;
              return (
                <button
                  key={option}
                  onClick={() => setSize(option)}
                  className="flex-1 rounded-xl transition-all press"
                  style={{
                    height: 44,
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: selected ? "#FFFFFF" : "#62626F",
                    background: selected ? "#16161D" : "#FFFFFF",
                    border: `1px solid ${selected ? "#16161D" : "#EAEAEF"}`,
                    cursor: "pointer",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="text-text-tertiary mt-2" style={{ fontSize: 11 }}>
            Used to size the simulation, not to bill you.
          </p>
        </div>

        {/* What kind of work */}
        <div className="rise mb-10" style={{ ["--i" as string]: 4 }}>
          <div
            className="text-text-tertiary uppercase mb-2"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
          >
            What kind of work? Pick any.
          </div>
          <div className="flex flex-wrap gap-2">
            {WORK_TYPES.map((type) => {
              const selected = types.includes(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className="flex items-center gap-2 rounded-full transition-all press"
                  style={{
                    height: 38,
                    padding: "0 16px",
                    fontSize: 13,
                    color: selected ? "#5F63C9" : "#62626F",
                    background: selected ? "#EEEFFC" : "#FFFFFF",
                    border: `1px solid ${selected ? "#B9BCF0" : "#EAEAEF"}`,
                    cursor: "pointer",
                  }}
                >
                  <Icon name={type.icon} size={14} />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between rise" style={{ ["--i" as string]: 5 }}>
          <span className="text-text-tertiary" style={{ fontSize: 13 }}>
            You can change all of this later.
          </span>
          <Button
            variant="primary"
            size="lg"
            disabled={!ready}
            onClick={() => navigate("/onboarding/connect")}
          >
            Continue
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default WorkspaceStepPage;
