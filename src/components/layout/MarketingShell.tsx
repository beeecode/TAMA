import { Outlet } from "react-router-dom";

/**
 * The public pages carry their own nav and footer, so this is a pass-through
 * for now. Shared marketing chrome would go here.
 */
export function MarketingShell() {
  return <Outlet />;
}

export default MarketingShell;
