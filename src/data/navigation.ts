/**
 * The bridge between the design's screen ids and the app's routes.
 *
 * The screens came out of Figma Make calling each other by name ('home',
 * 'board', 'signup'). Rather than rewrite every call site, the ported pages
 * keep that vocabulary and translate through `routeFor` at the edge.
 */
export const ROUTES: Record<string, string> = {
  landing: "/",
  signup: "/sign-up",
  signin: "/sign-in",
  onboarding: "/onboarding",

  home: "/app",
  tasks: "/app/tasks",
  board: "/app/tasks/board",
  timeline: "/app/tasks/timeline",
  list: "/app/tasks/list",
  forecast: "/app/forecast",
  inbox: "/app/inbox",
  team: "/app/team",
  docs: "/app/documents",
  automations: "/app/automations",
  reporting: "/app/reporting",
  settings: "/app/settings",
  ask: "/app/ask",
  // The design shows Calendar in the sidebar but has no screen for it yet.
  calendar: "/app/calendar",
};

/** Sidebar projects address themselves as `project:<id>`. */
const PROJECT_PREFIX = "project:";

export function routeFor(screen: string): string {
  if (screen.startsWith(PROJECT_PREFIX)) {
    return `/app/projects/${screen.slice(PROJECT_PREFIX.length)}`;
  }
  return ROUTES[screen] ?? "/app";
}

/**
 * The tabs across the top of every Tasks view. The design drew these five and
 * held their state locally, so the underline moved but nothing navigated;
 * here each one is a route.
 */
/** The setup flow, in order. Step numbers are 1-based. */
export const ONBOARDING_STEPS: { label: string; path: string }[] = [
  { label: "Workspace", path: "/onboarding/workspace" },
  { label: "Connect", path: "/onboarding/connect" },
  { label: "Learn", path: "/onboarding/building" },
  { label: "Forecast", path: "/onboarding/review" },
];

export const TASK_TABS = ["Overview", "Lists", "Board", "Timeline", "Files"] as const;

export type TaskTab = (typeof TASK_TABS)[number];

export const TASK_TAB_ROUTES: Record<TaskTab, string> = {
  Overview: "/app/tasks",
  Lists: "/app/tasks/list",
  Board: "/app/tasks/board",
  Timeline: "/app/tasks/timeline",
  Files: "/app/tasks/files",
};

/** Reverse lookup, so the sidebar can mark the current item active. */
export function screenFor(pathname: string): string {
  const project = pathname.match(/^\/app\/projects\/([^/]+)/);
  if (project) return `${PROJECT_PREFIX}${project[1]}`;

  const matches = Object.entries(ROUTES)
    .filter(([, path]) => pathname === path || pathname.startsWith(`${path}/`))
    // Longest path wins, so /app/tasks/board beats /app/tasks.
    .sort(([, a], [, b]) => b.length - a.length);
  return matches[0]?.[0] ?? "home";
}

/** Workspaces in the switcher. */
export const workspaces: { id: string; name: string; initials: string; meta: string }[] = [
  { id: "ws-meridian", name: "Meridian Ops", initials: "T", meta: "Team · 24 members" },
];
