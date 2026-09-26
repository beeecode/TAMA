/**
 * The problem, told as three things people actually say out loud. Quoting the
 * reader back to themselves does more than a list of pain points.
 */
const OVERHEARD = [
  {
    quote: "It should be done by the 14th.",
    who: "Every status meeting",
    tell: "No number attached. Nobody knows if that is a hope or a plan.",
  },
  {
    quote: "We're about 80% there.",
    who: "A project, last four weeks running",
    tell: "80% of what? The last 20% is where the whole estimate breaks.",
  },
  {
    quote: "It slipped again.",
    who: "Two days before the deadline",
    tell: "The forecast moved six weeks ago. Nobody was looking at it.",
  },
];

export function ProblemSection() {
  return (
    <section className="px-8 py-28">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div className="mb-14" style={{ maxWidth: 620 }}>
          <h2
            style={{
              fontFamily: "var(--font-tight)",
              fontWeight: 600,
              fontSize: 46,
              lineHeight: "1.08",
              letterSpacing: "-0.016em",
              color: "#16161D",
              margin: "0 0 16px",
            }}
          >
            Every deadline in your workspace is a <span className="accent">guess</span>.
          </h2>
          <p className="text-text-secondary" style={{ fontSize: 17, lineHeight: "27px" }}>
            Faster tools didn't fix planning. They just made the guessing
            quicker.
          </p>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {OVERHEARD.map((item, index) => (
            <figure
              key={item.quote}
              className="rounded-2xl p-7 m-0 rise lift"
              style={{
                background: index === 1 ? "var(--color-wash-warm)" : "#FFFFFF",
                border: "1px solid #EAEAEF",
                ["--i" as string]: index,
              }}
            >
              <blockquote
                className="m-0 mb-5"
                style={{
                  fontFamily: "var(--font-tight)",
                  fontSize: 27,
                  lineHeight: "1.25",
                  color: "#16161D",
                }}
              >
                “{item.quote}”
              </blockquote>
              <figcaption>
                <div
                  className="text-text-tertiary mb-3"
                  style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}
                >
                  {item.who}
                </div>
                <div className="text-text-secondary" style={{ fontSize: 13, lineHeight: "21px" }}>
                  {item.tell}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
