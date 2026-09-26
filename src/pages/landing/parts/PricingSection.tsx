import { Button } from "@/components/basics/Button";
import { Icon } from "@/components/basics/Icon";

interface Plan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "0",
    desc: "For small teams working out whether odds beat guesses.",
    features: [
      "Up to 10 people",
      "2 active projects",
      "Basic forecasting",
      "14-day history",
      "Google Calendar",
      "Community support",
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Team",
    price: "14",
    desc: "Full confidence forecasting for a team that ships.",
    features: [
      "Unlimited projects",
      "Full confidence forecasting",
      "Proposal inbox",
      "All integrations",
      "Decision log",
      "Email support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Scale",
    price: "28",
    desc: "Portfolio-level certainty when procurement gets involved.",
    features: [
      "Portfolio forecasting",
      "SSO & SAML",
      "Audit log",
      "Custom integrations",
      "SLA & uptime guarantee",
      "Priority support",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export interface PricingSectionProps {
  onNavigate: (screen: string) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  return (
    <section id="pricing" className="px-8 py-28">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div className="text-center mb-14">
          <h2
            style={{
              fontFamily: "var(--font-tight)",
              fontWeight: 600,
              fontSize: 46,
              lineHeight: "1.08",
              letterSpacing: "-0.016em",
              color: "#16161D",
              margin: "0 0 14px",
            }}
          >
            Priced per seat. <span className="accent">Never per credit.</span>
          </h2>
          <p className="text-text-secondary" style={{ fontSize: 17 }}>
            No AI credits, no metered surprises, no invoice you have to explain.
          </p>
        </div>

        <div className="grid gap-6 items-start" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {PLANS.map((plan, index) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-3xl p-8 rise lift"
              style={{
                background: plan.featured ? "#16161D" : "#FFFFFF",
                border: plan.featured ? "1px solid #16161D" : "1px solid #EAEAEF",
                boxShadow: plan.featured
                  ? "0 24px 60px rgba(22,22,29,0.20)"
                  : "0 1px 2px rgba(22,22,29,0.05)",
                position: "relative",
                ["--i" as string]: index,
              }}
            >
              {plan.featured && (
                <span
                  className="absolute rounded-full px-3 py-1"
                  style={{
                    top: -11,
                    left: 32,
                    background: "#8B8FE8",
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Most teams pick this
                </span>
              )}

              <div
                style={{
                  fontFamily: "var(--font-tight)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: plan.featured ? "#FFFFFF" : "#16161D",
                  marginBottom: 10,
                }}
              >
                {plan.name}
              </div>

              <div className="flex items-baseline gap-1.5 mb-4">
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                    color: plan.featured ? "#FFFFFF" : "#16161D",
                    lineHeight: 1,
                  }}
                >
                  {plan.price === "0" ? "Free" : `$${plan.price}`}
                </span>
                {plan.price !== "0" && (
                  <span
                    style={{ fontSize: 13, color: plan.featured ? "#9494A3" : "#62626F" }}
                  >
                    per seat / month
                  </span>
                )}
              </div>

              <p
                style={{
                  fontSize: 13.5,
                  lineHeight: "21px",
                  color: plan.featured ? "#9494A3" : "#62626F",
                  margin: "0 0 26px",
                }}
              >
                {plan.desc}
              </p>

              <div className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <Icon
                      name="check"
                      size={15}
                      weight="bold"
                      color={plan.featured ? "#8B8FE8" : "#2F9E6B"}
                    />
                    <span
                      style={{
                        fontSize: 13.5,
                        color: plan.featured ? "#EAEAEF" : "#62626F",
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.featured ? "ai" : "secondary"}
                size="md"
                className="w-full justify-center"
                onClick={() => onNavigate("signup")}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
