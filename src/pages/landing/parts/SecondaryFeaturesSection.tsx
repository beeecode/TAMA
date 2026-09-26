import { Icon } from "@/components/basics/Icon";
import type { IconName } from "@/types";

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "inbox",
    title: "An inbox that earns the interruption",
    body: "TAMA only pings you when something moves a date. Everything else waits until you go looking for it.",
  },
  {
    icon: "team",
    title: "Capacity you can actually see",
    body: "Real working hours, minus the meetings. Nobody gets handed a fifth project on a week they were already underwater.",
  },
  {
    icon: "automations",
    title: "Rules instead of nagging",
    body: "When a commitment drops below a coin flip, someone finds out the same morning — not the week before it ships.",
  },
  {
    icon: "timeline",
    title: "Timelines with the doubt drawn in",
    body: "Every bar carries its uncertainty. The wide ones are the ones to worry about, and you can see them from across the room.",
  },
  {
    icon: "documents",
    title: "Docs that notice when they go stale",
    body: "TAMA flags the section of a plan that no longer matches the work, rather than letting it quietly rot.",
  },
  {
    icon: "shield",
    title: "No scoring of people",
    body: "Workload is visible. Individual activity is not. Every factor behind a forecast is one you can see for yourself.",
  },
];

export function SecondaryFeaturesSection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <h2
          style={{
            fontFamily: "var(--font-tight)",
            fontWeight: 600,
            fontSize: 46,
            lineHeight: "1.08",
            letterSpacing: "-0.016em",
            color: "#16161D",
            margin: "0 0 56px",
            maxWidth: 560,
          }}
        >
          Everything else, handled <span className="accent">quietly</span>.
        </h2>

        <div className="grid gap-x-12 gap-y-12" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {FEATURES.map((feature, index) => (
            <div key={feature.title} className="rise" style={{ ["--i" as string]: index }}>
              <span
                className="flex items-center justify-center rounded-2xl mb-4"
                style={{ width: 44, height: 44, background: "#EEEFFC" }}
              >
                <Icon name={feature.icon} size={21} color="#5F63C9" weight="duotone" />
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-tight)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#16161D",
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-text-secondary"
                style={{ fontSize: 14.5, lineHeight: "24px", margin: 0 }}
              >
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SecondaryFeaturesSection;
