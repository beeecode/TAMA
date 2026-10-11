import { Avatar } from "@/components/basics/Avatar";
import { getFeaturedPerson, scenes } from "@/data/people";

/**
 * One quote, said like a person, with a name and a face attached. A page full
 * of anonymous praise reads as marketing; one specific story reads as true.
 */
const QUOTE =
  "I stopped walking into the Monday review with a date I'd made up on Friday. Now I bring odds, and the argument is about what to change rather than whether I'm sandbagging.";

const NUMBERS = [
  { value: "6 days", label: "average slip caught before it happened" },
  { value: "2×", label: "fewer missed commitments in a quarter" },
  { value: "90 sec", label: "from signing up to a working forecast" },
];

export function QuoteSection() {
  const rosa = getFeaturedPerson("rosa");

  return (
    <section className="px-8 py-24">
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div
          className="rounded-3xl overflow-hidden"
          style={{ border: "1px solid #EAEAEF" }}
        >
          <div className="grid" style={{ gridTemplateColumns: "1.15fr 0.85fr" }}>
            {/* The quote */}
            <div
              className="px-14 py-16 flex flex-col justify-center"
              style={{ background: "var(--color-wash-cool)" }}
            >
              <figure className="m-0">
                <blockquote
                  className="m-0 mb-8"
                  style={{
                    fontFamily: "var(--font-tight)",
                    fontSize: 29,
                    lineHeight: "1.34",
                    letterSpacing: "-0.014em",
                    color: "#16161D",
                  }}
                >
                  “{QUOTE}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar
                    initials={rosa.initials}
                    color={rosa.color}
                    src={rosa.photo}
                    name={rosa.name}
                    size={48}
                    ring={false}
                  />
                  <div>
                    <div
                      className="text-text-primary"
                      style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                        fontFamily: "var(--font-tight)",
                      }}
                    >
                      {rosa.name}
                    </div>
                    <div className="text-text-secondary" style={{ fontSize: 13 }}>
                      {rosa.role}
                    </div>
                  </div>
                </figcaption>
              </figure>

              <div
                className="grid gap-6 mt-12 pt-10"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  borderTop: "1px solid #DCDDF8",
                }}
              >
                {NUMBERS.map((item, index) => (
                  <div key={item.value} className="rise" style={{ ["--i" as string]: index }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 26,
                        fontWeight: 600,
                        color: "#5F63C9",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      className="text-text-secondary"
                      style={{ fontSize: 12.5, lineHeight: "19px" }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The room it was said in */}
            <img
              src={scenes.pair}
              alt="Two operations leads reviewing a delivery forecast together"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ minHeight: 520 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteSection;
