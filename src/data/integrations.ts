import type { Integration } from "@/types";

/**
 * Sources TAMA reads. Each one carries the reason it matters to a forecast —
 * onboarding shows that line rather than a bare list of logos.
 */
export const integrations: Integration[] = [
  {
    id: "in-github",
    name: "GitHub",
    category: "code",
    description: "Commits, pull requests and review timing across your repositories.",
    status: "connected",
    logoText: "GH",
    lastSyncAt: "2026-09-19T05:40:00.000Z",
    itemsSynced: 4128,
    signal: "Review wait time is the second-largest driver of slip on this team.",
  },
  {
    id: "in-slack",
    name: "Slack",
    category: "chat",
    description: "Channel activity on project channels — volume only, never message text.",
    status: "connected",
    logoText: "SL",
    lastSyncAt: "2026-09-19T05:55:00.000Z",
    itemsSynced: 872,
    signal: "A spike in channel traffic reliably precedes a task being marked blocked.",
  },
  {
    id: "in-calendar",
    name: "Google Calendar",
    category: "calendar",
    description: "Working hours, holidays and how much of the week is already spoken for.",
    status: "connected",
    logoText: "GC",
    lastSyncAt: "2026-09-19T04:10:00.000Z",
    itemsSynced: 316,
    signal: "Meeting load explains most of the gap between planned and actual capacity.",
  },
  {
    id: "in-linear",
    name: "Linear",
    category: "issues",
    description: "Two-way sync of issues, states and estimates.",
    status: "error",
    logoText: "LN",
    lastSyncAt: "2026-09-16T22:15:00.000Z",
    itemsSynced: 1204,
    signal: "Token expired on 16 September. Estimates are three days stale.",
  },
  {
    id: "in-jira",
    name: "Jira",
    category: "issues",
    description: "Import boards, sprints and issue history.",
    status: "available",
    logoText: "JR",
    signal: "Closed-issue history is what the model calibrates its first forecast on.",
  },
  {
    id: "in-notion",
    name: "Notion",
    category: "docs",
    description: "Specs and decision records, linked to the work they describe.",
    status: "available",
    logoText: "NO",
    signal: "Tasks with a linked spec finish with half the variance of those without.",
  },
  {
    id: "in-figma",
    name: "Figma",
    category: "design",
    description: "File activity and handoff state for design-dependent work.",
    status: "available",
    logoText: "FG",
    signal: "Design handoff timing is the usual cause of front-end work starting late.",
  },
  {
    id: "in-gitlab",
    name: "GitLab",
    category: "code",
    description: "Merge requests, pipelines and review timing.",
    status: "available",
    logoText: "GL",
    signal: "Pipeline duration feeds the deploy step of every forecast.",
  },
];

export const connectedIntegrations = integrations.filter(
  (integration) => integration.status === "connected",
);

/** Offered during onboarding, best signal first. */
export const onboardingIntegrations = integrations.filter(
  (integration) => integration.category !== "design",
);

export const INTEGRATION_CATEGORY_LABELS: Record<Integration["category"], string> = {
  code: "Code",
  chat: "Chat",
  calendar: "Calendar",
  docs: "Docs",
  issues: "Issues",
  design: "Design",
};
