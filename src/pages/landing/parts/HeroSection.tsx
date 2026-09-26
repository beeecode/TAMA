import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";
import { featuredPeople } from "@/data/people";

export interface HeroSectionProps {
  onNavigate: (screen: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="bloom px-8 pt-24 pb-20">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: "1.05fr 0.95fr" }}>
          {/* Copy */}
          <div className="flex flex-col rise">
            <div
              className="inline-flex items-center gap-2 rounded-full mb-7 self-start"
              style={{ background: "#EEEFFC", padding: "6px 14px" }}
            >
              <SparkleIcon size={12} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "#5F63C9",
                  textTransform: "uppercase",
                }}
              >
                Forecasting, not deadlines
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-tight)",
                fontWeight: 600,
                fontSize: 62,
                lineHeight: "1.04",
                color: "#16161D",
                letterSpacing: "-0.018em",
                maxWidth: 600,
                margin: "0 0 22px",
              }}
            >
              Stop promising dates.
              <br />
              Start quoting <span className="accent">odds</span>.
            </h1>

            <p
              className="text-text-secondary mb-8"
              style={{ fontSize: 18, lineHeight: "29px", maxWidth: 480 }}
            >
              TAMA reads how your team actually delivers, then tells you the
              probability of hitting any date — before you commit to it in a
              room full of people.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <Button variant="primary" size="lg" onClick={() => onNavigate("signup")}>
                Start free
                <Icon name="arrowRight" size={16} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate("home")}>
                <Icon name="play" size={15} weight="fill" />
                See a live forecast
              </Button>
            </div>

            {/* Proof, with people attached to it */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {featuredPeople.slice(0, 4).map((person) => (
                  <Avatar
                    key={person.id}
                    initials={person.initials}
                    color={person.color}
                    src={person.photo}
                    name={person.name}
                    size={30}
                  />
                ))}
              </div>
              <span className="text-text-secondary" style={{ fontSize: 13 }}>
                <strong style={{ color: "#16161D", fontWeight: 600 }}>1,400+</strong>{" "}
                operators stopped guessing
              </span>
            </div>
          </div>

          {/* The product, shown rather than described */}
          <div className="relative rise" style={{ ["--i" as string]: 2 }}>
            <div
              className="rounded-3xl p-7"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAEAEF",
                boxShadow: "0 24px 64px rgba(22,22,29,0.13), 0 2px 8px rgba(22,22,29,0.05)",
              }}
            >
              <div
                className="text-text-tertiary mb-2"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Q3 Campaign Launch · Vega Brand Refresh
              </div>
              <div
                className="text-text-primary font-semibold mb-7"
                style={{ fontSize: 17, fontFamily: "var(--font-tight)" }}
              >
                Summer Campaign Go-live
              </div>

              <ConfidenceBar
                p50Label="14 Mar"
                p85Label="22 Mar"
                p95Label="28 Mar"
                targetLabel="28 Mar"
                targetPosition={0.91}
                p50Position={0.35}
                p85Position={0.7}
                height={12}
              />

              <div className="flex items-end justify-between mt-8">
                <div>
                  <div
                    className="text-at-risk"
                    style={{
                      fontSize: 42,
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1,
                    }}
                  >
                    68%
                  </div>
                  <div className="text-text-tertiary mt-1.5" style={{ fontSize: 12 }}>
                    chance of hitting 28 March
                  </div>
                </div>
                <div
                  className="text-text-tertiary text-right"
                  style={{ fontSize: 11, lineHeight: "16px" }}
                >
                  Based on 312 completed
                  <br />
                  tasks · 10,000 simulations
                </div>
              </div>
            </div>

            {/* A second card, tucked under — depth without a screenshot */}
            <div
              className="absolute rounded-2xl px-4 py-3 tilt-right pop"
              style={{
                right: -18,
                bottom: -26,
                background: "#16161D",
                boxShadow: "0 16px 40px rgba(22,22,29,0.22)",
                ["--i" as string]: 4,
              }}
            >
              <div className="flex items-center gap-2.5">
                <SparkleIcon size={14} color="#B9BCF0" />
                <div>
                  <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 500 }}>
                    Move two approvals to Sam
                  </div>
                  <div style={{ fontSize: 11, color: "#9494A3" }}>
                    recovers 3 days · 68% → 81%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
