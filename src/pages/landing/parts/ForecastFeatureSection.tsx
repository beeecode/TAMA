import { Icon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";

const READINGS = [
  { label: "P50", meaning: "A coin flip. Useful internally, never in a room with a client.", tint: "#8B8FE8" },
  { label: "P85", meaning: "The date to commit to. Most teams should be quoting this one.", tint: "#B9BCF0" },
  { label: "P95", meaning: "Safe to promise. The date you can put in a contract.", tint: "#DCDDF8" },
];

export function ForecastFeatureSection() {
  return (
    <section className="px-8 py-28">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: "0.95fr 1.05fr" }}>
          {/* Copy */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-tight)",
                fontWeight: 600,
                fontSize: 46,
                lineHeight: "1.08",
                letterSpacing: "-0.016em",
                color: "#16161D",
                margin: "0 0 18px",
              }}
            >
              A due date tells you nothing.
              <br />
              A <span className="accent">distribution</span> tells you everything.
            </h2>
            <p
              className="text-text-secondary mb-9"
              style={{ fontSize: 17, lineHeight: "27px", maxWidth: 440 }}
            >
              TAMA replaces single-point deadlines with a range built from your
              team's real delivery history — and tells you what each end of it
              is worth.
            </p>

            <div className="flex flex-col gap-4">
              {READINGS.map((reading, index) => (
                <div
                  key={reading.label}
                  className="flex items-start gap-3.5 rise"
                  style={{ ["--i" as string]: index }}
                >
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{ width: 10, height: 10, background: reading.tint, marginTop: 6 }}
                  />
                  <div>
                    <span
                      className="text-text-primary"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 14,
                        fontWeight: 500,
                        marginRight: 10,
                      }}
                    >
                      {reading.label}
                    </span>
                    <span className="text-text-secondary" style={{ fontSize: 14 }}>
                      {reading.meaning}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The forecast itself */}
          <div
            className="rounded-3xl p-9"
            style={{
              background: "#FFFFFF",
              border: "1px solid #EAEAEF",
              boxShadow: "0 24px 64px rgba(22,22,29,0.10), 0 2px 8px rgba(22,22,29,0.04)",
            }}
          >
            <div
              className="text-text-tertiary mb-5"
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Probability of hitting your committed date
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span
                className="text-at-risk"
                style={{
                  fontSize: 68,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1,
                }}
              >
                68%
              </span>
              <span className="text-text-secondary" style={{ fontSize: 14 }}>
                Committed 28 March
                <br />
                P85 lands 2 April
              </span>
            </div>

            <ConfidenceBar
              p50Label="14 Mar"
              p85Label="2 Apr"
              p95Label="12 Apr"
              targetLabel="28 Mar"
              targetPosition={0.72}
              p50Position={0.32}
              p85Position={0.68}
              height={14}
            />

            <div
              className="flex items-start gap-3 rounded-2xl p-4 mt-8"
              style={{ background: "#F7F7F9" }}
            >
              <Icon name="alert" size={16} className="text-at-risk" weight="fill" />
              <div>
                <div className="text-text-primary" style={{ fontSize: 13, fontWeight: 500 }}>
                  Three factors explain 87% of the drift
                </div>
                <div className="text-text-secondary mt-0.5" style={{ fontSize: 12.5, lineHeight: "19px" }}>
                  Two approvals blocked six days · a microsite added to scope ·
                  cycle time up from 2.1 to 2.8 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForecastFeatureSection;
