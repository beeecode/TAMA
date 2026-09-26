import { useNavigate } from "react-router-dom";
import { Button } from "@/components/basics/Button";
import { routeFor } from "@/data/navigation";

import { HeroSection } from "./parts/HeroSection";
import { LogoStrip } from "./parts/LogoStrip";
import { ProblemSection } from "./parts/ProblemSection";
import { HowItWorksSection } from "./parts/HowItWorksSection";
import { ForecastFeatureSection } from "./parts/ForecastFeatureSection";
import { SecondaryFeaturesSection } from "./parts/SecondaryFeaturesSection";
import { QuoteSection } from "./parts/QuoteSection";
import { PricingSection } from "./parts/PricingSection";
import { QuestionsSection } from "./parts/QuestionsSection";
import { ClosingSection } from "./parts/ClosingSection";
import { MarketingFooter } from "./parts/MarketingFooter";

const NAV_LINKS = [
  { label: "Forecasting", href: "#forecasting" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#questions" },
  { label: "Docs", href: "#" },
];

export function LandingPage() {
  const routerNavigate = useNavigate();
  const onNavigate = (screen: string) => routerNavigate(routeFor(screen));

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <nav
        className="sticky top-0 z-50 px-8"
        style={{
          height: 68,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          className="mx-auto h-full flex items-center justify-between"
          style={{ maxWidth: 1180 }}
        >
          <div className="flex items-center gap-9">
            <button
              onClick={() => onNavigate("landing")}
              className="flex items-center gap-2 cursor-pointer press"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <div
                className="flex items-center justify-center rounded-lg text-white font-bold"
                style={{
                  width: 28,
                  height: 28,
                  background: "#5F63C9",
                  fontFamily: "var(--font-tight)",
                  fontSize: 14,
                }}
              >
                T
              </div>
              <span
                style={{
                  fontFamily: "var(--font-tight)",
                  fontWeight: 600,
                  fontSize: 21,
                  letterSpacing: "-0.016em",
                  color: "#16161D",
                }}
              >
                TAMA
              </span>
            </button>

            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontSize: 14 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("signin")}>
              Sign in
            </Button>
            <Button variant="primary" size="sm" onClick={() => onNavigate("signup")}>
              Start free
            </Button>
          </div>
        </div>
      </nav>

      <HeroSection onNavigate={onNavigate} />
      <LogoStrip />
      <ProblemSection />
      <HowItWorksSection />
      <div id="forecasting">
        <ForecastFeatureSection />
      </div>
      <SecondaryFeaturesSection />
      <QuoteSection />
      <PricingSection onNavigate={onNavigate} />
      <QuestionsSection />
      <ClosingSection onNavigate={onNavigate} />
      <MarketingFooter />
    </div>
  );
}

export default LandingPage;
