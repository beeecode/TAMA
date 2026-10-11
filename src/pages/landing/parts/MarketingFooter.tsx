const COLUMNS = [
  {
    title: "Product",
    links: ["Forecasting", "Tasks", "Automations", "Reporting", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Changelog", "Contact"],
  },
  {
    title: "Resources",
    links: ["How forecasting works", "Security", "Status", "Privacy"],
  },
];

export function MarketingFooter() {
  return (
    <footer className="px-8 pb-14" style={{ borderTop: "1px solid #EAEAEF", paddingTop: 64 }}>
      <div className="mx-auto" style={{ maxWidth: 1180 }}>
        <div className="grid gap-12 mb-16" style={{ gridTemplateColumns: "1.5fr repeat(3, 1fr)" }}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center justify-center rounded-lg text-white font-bold"
                style={{
                  width: 26,
                  height: 26,
                  background: "#5F63C9",
                  fontFamily: "var(--font-tight)",
                  fontSize: 13,
                }}
              >
                T
              </div>
              <span
                style={{
                  fontFamily: "var(--font-tight)",
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.014em",
                  color: "#16161D",
                }}
              >
                TAMA
              </span>
            </div>
            <p
              className="text-text-secondary"
              style={{ fontSize: 13.5, lineHeight: "22px", maxWidth: 260, margin: 0 }}
            >
              Probability-native work management for teams who would rather know
              than hope.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <div
                className="text-text-tertiary mb-4"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {column.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                    style={{ fontSize: 13.5 }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between"
          style={{ borderTop: "1px solid #EAEAEF", paddingTop: 24 }}
        >
          <span className="text-text-tertiary" style={{ fontSize: 12.5 }}>
            © 2026 TAMA
          </span>
          <span className="flex items-center gap-2 text-text-tertiary" style={{ fontSize: 12.5 }}>
            <span
              className="rounded-full"
              style={{ width: 6, height: 6, background: "#2F9E6B" }}
            />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
