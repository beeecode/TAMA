import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

/**
 * The frame every setup step sits in. Each step supplies its own
 * StepProgress and content; the shell owns the wordmark and the escape hatch.
 */
export function OnboardingShell() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8" style={{ height: 72 }}>
        <Link to="/" className="flex items-center gap-2 press">
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
              fontSize: 20,
              letterSpacing: "-0.014em",
              color: "#16161D",
            }}
          >
            TAMA
          </span>
        </Link>

        <button
          onClick={() => navigate("/app")}
          className="press transition-colors cursor-pointer text-text-tertiary hover:text-text-secondary"
          style={{ background: "none", border: "none", fontSize: 13 }}
        >
          Skip setup
        </button>
      </div>

      {/* Steps. Keyed on the path so each step animates in on its own. */}
      <div
        key={location.pathname}
        className="flex-1 flex flex-col items-center px-6 pt-4 pb-20 page-enter"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default OnboardingShell;
