import { SourceIcon, type SourceName } from "@/components/basics/Icon";
import { scenes } from "@/data/people";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    body: "Point TAMA at the tools your team already uses. No migration, no setup ceremony, no asking anyone to change how they work.",
    aside: ["Google Calendar", "Slack", "Asana"] as SourceName[],
  },
  {
    n: "02",
    title: "Learn",
    body: "TAMA reads completed work and measures your real cycle times. No story points. No estimation sessions. Nobody has to guess in a meeting.",
    aside: null,
  },
  {
    n: "03",
    title: "Forecast",
    body: "Every date becomes a probability. Every commitment becomes a decision you can defend with data instead of optimism.",
    aside: null,
  },
];

export function HowItWorksSection() {
  return (
    <section className="px-8 py-24">
      <div
        className="mx-auto rounded-3xl px-14 py-16"
        style={{ maxWidth: 1180, background: "var(--color-wash-sand)" }}
      >
        <h2
          className="mb-14"
          style={{
            fontFamily: "var(--font-tight)",
            fontWeight: 600,
            fontSize: 46,
            lineHeight: "1.08",
            letterSpacing: "-0.016em",
            color: "#16161D",
            margin: "0 0 56px",
            maxWidth: 520,
          }}
        >
          Three steps. <span className="accent">Ninety seconds.</span>
        </h2>

        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {STEPS.map((step, index) => (
            <div key={step.n} className="rise" style={{ ["--i" as string]: index }}>
              <div
                className="mb-5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "#5F63C9",
                  letterSpacing: "0.08em",
                }}
              >
                {step.n}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-tight)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#16161D",
                  margin: "0 0 10px",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-text-secondary"
                style={{ fontSize: 15, lineHeight: "25px", margin: 0 }}
              >
                {step.body}
              </p>

              {step.aside && (
                <div className="flex items-center gap-2 mt-6">
                  {step.aside.map((source) => (
                    <span
                      key={source}
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: 40,
                        height: 40,
                        background: "#FFFFFF",
                        border: "1px solid #EAEAEF",
                      }}
                    >
                      <SourceIcon name={source} size={19} />
                    </span>
                  ))}
                  <span className="text-text-tertiary ml-1" style={{ fontSize: 12 }}>
                    +5 more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <img
          src={scenes.bright}
          alt="An operations team reviewing their week together"
          loading="lazy"
          className="w-full rounded-2xl mt-14"
          style={{ height: 320, objectFit: "cover", objectPosition: "center 35%" }}
        />
      </div>
    </section>
  );
}

export default HowItWorksSection;
