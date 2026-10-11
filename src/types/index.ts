/**
 * Domain types for the TAMA UI.
 *
 * TAMA tracks work like any task tool, but every date it shows carries a
 * probability. That is why most entities hang on to both a committed date
 * (what the team promised) and a forecast date (what the model expects).
 */

export type ID = string;
/** ISO-8601 date, `YYYY-MM-DD`. */
export type ISODate = string;
/** ISO-8601 timestamp. */
export type ISODateTime = string;

export type Tone = "neutral" | "accent" | "positive" | "caution" | "critical";
export type Size = "sm" | "md" | "lg";

/* -- People ---------------------------------------------------------------- */

export type PresenceStatus = "online" | "busy" | "away" | "offline";

export interface Person {
  id: ID;
  name: string;
  initials: string;
  role: string;
  email: string;
  timezone: string;
  presence: PresenceStatus;
  /** Planned working hours in the current week. */
  capacityHours: number;
  /** Hours already committed to assigned work this week. */
  committedHours: number;
  /** Days of focus time lost to meetings, as observed over the last 4 weeks. */
  meetingLoadDays: number;
}

/* -- Projects -------------------------------------------------------------- */

export type DeliveryStatus = "on_track" | "at_risk" | "off_track" | "done";

export interface Project {
  id: ID;
  name: string;
  key: string;
  description: string;
  color: string;
  status: DeliveryStatus;
  ownerId: ID;
  memberIds: ID[];
  startDate: ISODate;
  /** The date the team committed to. */
  targetDate: ISODate;
  /** The median date the model expects. */
  forecastDate: ISODate;
  /** Probability of hitting `targetDate`, 0–1. */
  confidence: number;
  /** Share of scope complete, 0–1. */
  progress: number;
  taskCount: number;
  openTaskCount: number;
}

/* -- Tasks ----------------------------------------------------------------- */

export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "review"
  | "blocked"
  | "done";

export type Priority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: ID;
  key: string;
  title: string;
  description: string;
  projectId: ID;
  status: TaskStatus;
  priority: Priority;
  assigneeId: ID | null;
  estimateHours: number;
  spentHours: number;
  startDate: ISODate;
  /** The date on the plan. */
  dueDate: ISODate;
  /** Where the model thinks it will actually land. */
  forecastDate: ISODate;
  /** Probability of finishing by `dueDate`, 0–1. */
  confidence: number;
  blockedByIds: ID[];
  labels: string[];
  subtaskCount: number;
  subtasksDone: number;
  commentCount: number;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
  /** One line on why the forecast slipped, when it has. */
  riskNote?: string;
}

/* -- Forecasting ----------------------------------------------------------- */

export type ConfidenceLevel = "high" | "medium" | "low";

export type ForecastScope = "task" | "project" | "portfolio";

/**
 * One step of the uncertainty cone — a burnup with a fan on the front.
 * Values are percent of scope complete (0–100) projected for that date; the
 * cone crossing 100 before the target line is what "on track" looks like.
 */
export interface ConePoint {
  date: ISODate;
  p10: number;
  p50: number;
  p90: number;
  /** What actually shipped. Present only up to today. */
  actual?: number;
}

/** One bucket of the finish-date histogram. */
export interface DistributionBin {
  date: ISODate;
  /** Probability mass in this bucket, 0–1. */
  probability: number;
}

/** A single input the model weighed, with its effect in days. */
export interface ForecastFactor {
  id: ID;
  label: string;
  detail: string;
  /** Signed: positive pushes the date out, negative pulls it in. */
  impactDays: number;
  /** Share of the total movement this factor explains, 0–1. */
  weight: number;
  evidence: string;
}

/** A change the model believes would buy back time. */
export interface ForecastFix {
  id: ID;
  title: string;
  detail: string;
  gainDays: number;
  /** Confidence points gained if applied, 0–1. */
  confidenceGain: number;
  effort: "low" | "medium" | "high";
}

/** How the forecast for a scope has moved over time. */
export interface ForecastHistoryPoint {
  observedOn: ISODate;
  forecastDate: ISODate;
  confidence: number;
}

export interface Forecast {
  id: ID;
  scope: ForecastScope;
  scopeId: ID;
  scopeName: string;
  generatedAt: ISODateTime;
  targetDate: ISODate;
  p10Date: ISODate;
  p50Date: ISODate;
  p90Date: ISODate;
  /** Probability of delivering by `targetDate`, 0–1. */
  confidence: number;
  /** Change in confidence since last week, in points (0–1 scale). */
  confidenceDelta: number;
  cone: ConePoint[];
  distribution: DistributionBin[];
  factors: ForecastFactor[];
  fixes: ForecastFix[];
  history: ForecastHistoryPoint[];
  /** How much history the model has, 0–1. Low values warrant a caveat. */
  modelMaturity: number;
  sampleSize: number;
}

/* -- Proposals ------------------------------------------------------------- */

export type ProposalKind =
  | "rebalance"
  | "resequence"
  | "scope"
  | "staffing"
  | "deadline";

export type ProposalStatus = "open" | "accepted" | "dismissed";

export interface Proposal {
  id: ID;
  kind: ProposalKind;
  headline: string;
  /** The model's reason, in the team's own vocabulary. */
  because: string;
  currentState: string;
  proposedState: string;
  /** Days pulled back in if accepted. */
  gainDays: number;
  confidenceGain: number;
  relatedTaskIds: ID[];
  createdAt: ISODateTime;
  status: ProposalStatus;
}

/* -- Activity and inbox ---------------------------------------------------- */

export type ActivityKind =
  | "forecast_moved"
  | "proposal"
  | "mention"
  | "blocked"
  | "completed"
  | "assigned"
  | "integration";

export interface ActivityEvent {
  id: ID;
  kind: ActivityKind;
  /** `null` when TAMA itself is the actor. */
  actorId: ID | null;
  title: string;
  body: string;
  target?: string;
  targetKey?: string;
  timestamp: ISODateTime;
  unread: boolean;
  tone: Tone;
}

/* -- Integrations ---------------------------------------------------------- */

export type IntegrationStatus = "connected" | "available" | "error";

export interface Integration {
  id: ID;
  name: string;
  category: "code" | "chat" | "calendar" | "docs" | "issues" | "design";
  description: string;
  status: IntegrationStatus;
  logoText: string;
  lastSyncAt?: ISODateTime;
  itemsSynced?: number;
  /** Why this source improves the forecast. */
  signal: string;
}

/* -- Documents ------------------------------------------------------------- */

export type DocumentKind = "spec" | "brief" | "decision" | "retro" | "note";

export interface DocumentSection {
  id: ID;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface DocumentItem {
  id: ID;
  title: string;
  kind: DocumentKind;
  excerpt: string;
  projectId?: ID;
  authorId: ID;
  updatedAt: ISODateTime;
  readMinutes: number;
  tags: string[];
  sections: DocumentSection[];
}

/* -- Automations ----------------------------------------------------------- */

export interface AutomationRule {
  id: ID;
  name: string;
  /** Rendered as a sentence: when <trigger>, if <condition>, then <action>. */
  trigger: string;
  condition: string;
  action: string;
  enabled: boolean;
  runsThisWeek: number;
  lastRunAt: ISODateTime;
}

export interface AutomationAgent {
  id: ID;
  name: string;
  purpose: string;
  status: "active" | "paused";
  actionsTaken: number;
  /** Share of its suggestions people kept, 0–1. */
  acceptedRate: number;
  lastActiveAt: ISODateTime;
  scopes: string[];
}

export interface AutomationRun {
  id: ID;
  ruleId: ID;
  ruleName: string;
  startedAt: ISODateTime;
  status: "success" | "skipped" | "failed";
  summary: string;
  durationMs: number;
}

/* -- Reporting ------------------------------------------------------------- */

export interface SeriesPoint {
  label: string;
  value: number;
}

export interface MetricSeries {
  id: ID;
  label: string;
  /** A `--series-*` token name, e.g. `var(--series-1)`. */
  color: string;
  points: SeriesPoint[];
}

/** Forecast accuracy: what the model promised vs what shipped. */
export interface AccuracyPoint {
  label: string;
  /** Share of deliveries that landed inside the p10–p90 band, 0–1. */
  withinBand: number;
  /** Mean absolute error in days. */
  errorDays: number;
}

export interface PortfolioLine {
  projectId: ID;
  name: string;
  confidence: number;
  targetDate: ISODate;
  forecastDate: ISODate;
  trend: number[];
}

/* -- Marketing ------------------------------------------------------------- */

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: ID;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  featured: boolean;
  ctaLabel: string;
  features: PricingFeature[];
}

/* -- Navigation ------------------------------------------------------------ */

export interface NavItem {
  id: ID;
  label: string;
  to: string;
  icon: IconName;
  count?: number;
  dot?: boolean;
  /** Match the route exactly rather than by prefix. */
  end?: boolean;
}

export interface NavSection {
  id: ID;
  title?: string;
  items: NavItem[];
}

export interface CommandItem {
  id: ID;
  label: string;
  group: string;
  icon: IconName;
  to?: string;
  hint?: string;
}

/** Keys of the icon registry in `components/basics/Icon.tsx`. */
export type IconName =
  | "home"
  | "tasks"
  | "forecast"
  | "inbox"
  | "team"
  | "documents"
  | "automations"
  | "reporting"
  | "settings"
  | "ask"
  | "search"
  | "plus"
  | "close"
  | "check"
  | "minus"
  | "chevronDown"
  | "chevronRight"
  | "chevronLeft"
  | "arrowRight"
  | "arrowUp"
  | "arrowDown"
  | "bell"
  | "calendar"
  | "clock"
  | "filter"
  | "alert"
  | "info"
  | "sparkle"
  | "user"
  | "link"
  | "refresh"
  | "play"
  | "pause"
  | "more"
  | "external"
  | "trash"
  | "lock"
  | "card"
  | "board"
  | "list"
  | "timeline"
  | "grid"
  | "flag"
  | "target"
  | "book"
  | "shield"
  | "zap"
  | "moon"
  | "sun"
  | "send"
  | "folder"
  | "chart"
  | "pin"
  | "thumbsUp"
  | "thumbsDown"
  | "comment"
  | "attachment";
