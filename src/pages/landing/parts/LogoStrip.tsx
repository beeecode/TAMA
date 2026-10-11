const COMPANIES = [
  "Meridian",
  "Solstice",
  "Arcform",
  "Northline",
  "Kestrel",
  "Harbour",
  "Lantern",
];

/** Two copies of the row, so the drift loops without a visible seam. */
export function LogoStrip() {
  return (
    <section className="py-14">
      <p
        className="text-text-tertiary text-center mb-8"
        style={{ fontSize: 12, letterSpacing: "0.04em" }}
      >
        Trusted by operations teams at
      </p>
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {COMPANIES.map((name) => (
                <span
                  key={name}
                  className="text-text-tertiary"
                  style={{
                    fontFamily: "var(--font-tight)",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.014em",
                    padding: "0 40px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoStrip;
