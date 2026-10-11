/**
 * The workspace's projects.
 *
 * Assembled from the design's own lists: the sidebar supplied names and
 * colours, and Settings → Forecasting supplied the signal counts that decide
 * whether a project's forecast is trustworthy yet.
 */

/** Below 20 signals TAMA will not quote odds — it says it is still learning. */
export const SIGNALS_REQUIRED = 20;

export type ProjectMaturity = "ready" | "learning";

/**
 * A delivery forecast: three dates rather than one, and where each falls
 * along the bar. Only projects past the signal threshold have one.
 */
export interface ProjectForecast {
  p50: string;
  p85: string;
  p95: string;
  /** Fractions along the bar, 0–1. */
  targetPos: number;
  p50Pos: number;
  p85Pos: number;
}

export interface Project {
  id: string;
  name: string;
  /** The swatch this project is known by across the whole product. */
  color: string;
  /** Completed items TAMA has learned from. */
  signals: number;
  maturity: ProjectMaturity;
  forecast?: ProjectForecast;
}

export const projects: Project[] = [
  {
    id: "atlas",
    name: "Atlas CRM Revamp",
    color: "#22C55E",
    signals: 47,
    maturity: "ready",
    forecast: { p50: "20 Mar", p85: "28 Mar", p95: "5 Apr", targetPos: 0.62, p50Pos: 0.38, p85Pos: 0.68 },
  },
  {
    id: "nimbus",
    name: "Nimbus Dashboard",
    color: "#0D9488",
    signals: 38,
    maturity: "ready",
    forecast: { p50: "14 Mar", p85: "22 Mar", p95: "30 Mar", targetPos: 0.55, p50Pos: 0.33, p85Pos: 0.64 },
  },
  { id: "orion", name: "Orion API Gateway", color: "#3B82F6", signals: 11, maturity: "learning" },
  { id: "helio", name: "Helio Task System", color: "#EC4899", signals: 31, maturity: "ready" },
  {
    id: "vega",
    name: "Vega Brand Refresh",
    color: "#8B5CF6",
    signals: 22,
    maturity: "ready",
    forecast: { p50: "14 Mar", p85: "2 Apr", p95: "12 Apr", targetPos: 0.72, p50Pos: 0.3, p85Pos: 0.68 },
  },
];

/** Projects TAMA can already quote odds on. */
export const forecastedProjects = projects.filter((project) => project.forecast);

/** Projects still under the signal threshold. */
export const learningProjects = projects.filter(
  (project) => project.maturity === "learning",
);

/** The project the forecast page opens on when no project is named. */
export const DEFAULT_PROJECT_ID = "vega";

export function getProject(id: string | undefined): Project {
  return projects.find((project) => project.id === id) ?? defaultProject;
}

export const defaultProject: Project =
  projects.find((project) => project.id === DEFAULT_PROJECT_ID) ?? projects[0];

export function projectRoute(id: string): string {
  return `/app/projects/${id}`;
}
