import { Button } from "@/components/basics/Button";
import { Icon } from "@/components/basics/Icon";
import { scenes } from "@/data/people";

export interface ClosingSectionProps {
  onNavigate: (screen: string) => void;
}

export function ClosingSection({ onNavigate }: ClosingSectionProps) {
  return (
    <section className="px-8 pb-24">
      <div
        className="mx-auto rounded-3xl px-14 text-center relative overflow-hidden"
        style={{
          maxWidth: 1180,
          background: "#16161D",
          paddingTop: 88,
          paddingBottom: 88,
        }}
      >
        {/* A room behind the ask, dimmed hard so the type stays the subject. */}
        <img
          src={scenes.cheer}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 30%, rgba(139,143,232,0.28), transparent 70%), linear-gradient(180deg, rgba(22,22,29,0.55), rgba(22,22,29,0.88))",
            pointerEvents: "none",
          }}
        />

        <div className="relative">
          <h2
            style={{
              fontFamily: "var(--font-tight)",
              fontWeight: 600,
              fontSize: 48,
              lineHeight: "1.08",
              letterSpacing: "-0.018em",
              color: "#FFFFFF",
              margin: "0 auto 18px",
              maxWidth: 620,
            }}
          >
            Know the odds before you <span className="accent">promise</span>.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: "27px",
              color: "#9494A3",
              margin: "0 auto 34px",
              maxWidth: 480,
            }}
          >
            Connect two tools and you will have a forecast you believe before
            this meeting is over.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="!bg-white !text-[#16161D]"
              onClick={() => onNavigate("signup")}
            >
              Start free
              <Icon name="arrowRight" size={16} />
            </Button>
            <Button variant="ghost" size="lg" className="!text-[#EAEAEF]">
              Talk to us
            </Button>
          </div>

          <p style={{ fontSize: 13, color: "#62626F", marginTop: 26 }}>
            No credit card. No sales call before you have seen it work.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ClosingSection;
