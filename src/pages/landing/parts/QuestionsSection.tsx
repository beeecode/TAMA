import { useState } from "react";
import { Icon } from "@/components/basics/Icon";

const QUESTIONS = [
  {
    q: "How does TAMA calculate confidence levels?",
    a: "Monte Carlo simulation over your team's historical cycle times — how long similar work actually took, not how long anyone said it would. It needs about 20 completed items per workstream before the odds mean anything, and until then it says so rather than bluffing.",
  },
  {
    q: "What data does TAMA need to connect?",
    a: "Two sources minimum: a calendar and one task tool. More connections narrow the band, but two is enough for a working forecast on day one.",
  },
  {
    q: "Will TAMA replace our project management tool?",
    a: "No. It reads from the tools you already have and adds a probability layer on top. Your team keeps working exactly where they work now.",
  },
  {
    q: "How is this different from AI that estimates tasks for you?",
    a: "An assistant guesses the future from assumptions. TAMA measures your past and simulates forward from it. That is the difference between an opinion and actuarial maths.",
  },
  {
    q: "Can managers see individual employee data?",
    a: "Workload and capacity, yes. Raw activity logs, no — those are not surfaced to managers by default, and admins control the granularity. TAMA never scores a person.",
  },
  {
    q: "What happens when the forecast is wrong?",
    a: "It gets recorded. Reporting shows how often deliveries landed inside the band we promised, month by month. A forecasting tool that hides its own accuracy is not worth having.",
  },
];

export function QuestionsSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="questions" className="px-8 py-24">
      <div className="mx-auto grid gap-16" style={{ maxWidth: 1180, gridTemplateColumns: "0.8fr 1.2fr" }}>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-tight)",
              fontWeight: 600,
              fontSize: 42,
              lineHeight: "1.1",
              letterSpacing: "-0.016em",
              color: "#16161D",
              margin: "0 0 14px",
            }}
          >
            Questions people <span className="accent">actually ask</span>
          </h2>
          <p className="text-text-secondary" style={{ fontSize: 15, lineHeight: "24px" }}>
            Mostly on the first call, usually in this order.
          </p>
        </div>

        <div>
          {QUESTIONS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                style={{ borderBottom: "1px solid #EAEAEF" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 text-left cursor-pointer"
                  style={{ background: "none", border: "none", padding: "22px 0" }}
                >
                  <span
                    className="text-text-primary"
                    style={{
                      fontSize: 16.5,
                      fontWeight: 500,
                      fontFamily: "var(--font-tight)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex flex-shrink-0"
                    style={{
                      marginTop: 2,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.22s var(--ease-out)",
                    }}
                  >
                    <Icon name="plus" size={17} className="text-text-tertiary" />
                  </span>
                </button>
                {isOpen && (
                  <p
                    className="text-text-secondary rise"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      margin: "0 0 24px",
                      maxWidth: 560,
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuestionsSection;
