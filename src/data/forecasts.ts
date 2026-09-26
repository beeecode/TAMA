import type {
  ConePoint,
  DistributionBin,
  Forecast,
  ID,
  ISODate,
} from "@/types";
import { addDays, daysBetween, TODAY } from "@/helpers/formatDate";
import { clamp01 } from "@/helpers/formatNumber";

/* -- Builders -------------------------------------------------------------- */

/**
 * Builds a burnup cone: real progress up to today, then a fan that reaches
 * 100% on the p10 / p50 / p90 dates.
 */
function buildCone(options: {
  startDate: ISODate;
  endDate: ISODate;
  progressToday: number;
  p10Date: ISODate;
  p50Date: ISODate;
  p90Date: ISODate;
  /** Small deterministic wobble so the actual line is not a ruler. */
  wobble?: number[];
}): ConePoint[] {
  const {
    startDate,
    endDate,
    progressToday,
    p10Date,
    p50Date,
    p90Date,
    wobble = [0, -1.5, 1, -0.5, 2, -2, 0.5, 1.5, -1, 0],
  } = options;

  const span = daysBetween(startDate, endDate);
  const points: ConePoint[] = [];
  const elapsed = daysBetween(startDate, TODAY);

  for (let offset = 0; offset <= span; offset += 7) {
    const date = addDays(startDate, offset);
    const isPast = offset <= elapsed;

    if (isPast) {
      const share = elapsed === 0 ? 1 : offset / elapsed;
      const base = progressToday * share ** 0.92;
      const nudge = wobble[(offset / 7) % wobble.length] ?? 0;
      const value = Math.max(0, Math.min(progressToday, base + nudge));
      points.push({ date, actual: value, p10: value, p50: value, p90: value });
      continue;
    }

    points.push({
      date,
      p10: projected(date, progressToday, p10Date),
      p50: projected(date, progressToday, p50Date),
      p90: projected(date, progressToday, p90Date),
    });
  }

  // Always finish on the last date so the cone meets the frame edge.
  const last = points[points.length - 1];
  if (last && last.date !== endDate) {
    points.push({
      date: endDate,
      p10: projected(endDate, progressToday, p10Date),
      p50: projected(endDate, progressToday, p50Date),
      p90: projected(endDate, progressToday, p90Date),
    });
  }

  return points;
}

/** Straight line from today's progress to 100% on `finishDate`. */
function projected(
  date: ISODate,
  progressToday: number,
  finishDate: ISODate,
): number {
  const total = daysBetween(TODAY, finishDate);
  const elapsed = daysBetween(TODAY, date);
  if (total <= 0) return 100;
  const value = progressToday + ((100 - progressToday) * elapsed) / total;
  return Math.max(0, Math.min(100, Number(value.toFixed(1))));
}

/**
 * A right-skewed finish-date histogram. Delivery dates are never symmetric —
 * work can always run later than planned, rarely much earlier.
 */
function buildDistribution(
  firstDate: ISODate,
  weights: number[],
  stepDays = 2,
): DistributionBin[] {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return weights.map((weight, index) => ({
    date: addDays(firstDate, index * stepDays),
    probability: Number((weight / total).toFixed(4)),
  }));
}

/* -- Forecasts ------------------------------------------------------------- */

export const forecasts: Forecast[] = [
  {
    id: "fc-atlas",
    scope: "project",
    scopeId: "pr-atlas",
    scopeName: "Atlas billing migration",
    generatedAt: "2026-09-19T06:00:00.000Z",
    targetDate: "2026-10-09",
    p10Date: "2026-10-09",
    p50Date: "2026-10-16",
    p90Date: "2026-10-30",
    confidence: 0.41,
    confidenceDelta: -0.14,
    modelMaturity: 0.82,
    sampleSize: 214,
    cone: buildCone({
      startDate: "2026-07-06",
      endDate: "2026-11-06",
      progressToday: 62,
      p10Date: "2026-10-09",
      p50Date: "2026-10-16",
      p90Date: "2026-10-30",
    }),
    distribution: buildDistribution(
      "2026-10-05",
      [2, 5, 9, 14, 17, 15, 11, 8, 6, 4, 3, 2, 2, 1, 1],
    ),
    factors: [
      {
        id: "f-atlas-1",
        label: "Invoice reconciliation is hand-worked",
        detail:
          "41 mismatched line items have each needed manual repair; the rate has not improved in two weeks.",
        impactDays: 5.5,
        weight: 0.38,
        evidence: "ATL-142 · 19h logged against a 24h estimate, 4 of 6 subtasks done",
      },
      {
        id: "f-atlas-2",
        label: "Backfill is blocked on dual-write",
        detail:
          "The backfill cannot start until dual-write totals agree, and it sits on the critical path.",
        impactDays: 3.2,
        weight: 0.22,
        evidence: "ATL-147 blocked by ATL-142 since 16 Sep",
      },
      {
        id: "f-atlas-3",
        label: "Review queue is slow this month",
        detail:
          "Changes wait 2.4 days for review on average, up from 0.9 days in August.",
        impactDays: 2.4,
        weight: 0.16,
        evidence: "14 merged changes across the project since 1 Sep",
      },
      {
        id: "f-atlas-4",
        label: "Inés is over capacity",
        detail:
          "41 hours committed against 36 available, across two projects that both need her this week.",
        impactDays: 1.8,
        weight: 0.12,
        evidence: "Assigned to ATL-142 and VLT-61 in the same week",
      },
      {
        id: "f-atlas-5",
        label: "Schema work landed early",
        detail: "The ledger schema shipped two days ahead and has needed no rework since.",
        impactDays: -1.5,
        weight: 0.08,
        evidence: "ATL-128 closed 28 Aug, zero follow-up changes",
      },
      {
        id: "f-atlas-6",
        label: "Cutover weekend is fixed",
        detail:
          "The vendor contract ends 31 October, so the cutover cannot move right without the whole plan moving.",
        impactDays: 0.8,
        weight: 0.04,
        evidence: "Contract end date, from the Atlas brief",
      },
    ],
    fixes: [
      {
        id: "fix-atlas-1",
        title: "Script the reconciliation repairs",
        detail:
          "The 41 mismatches fall into three shapes. Scripting them clears the queue in a day instead of five.",
        gainDays: 4,
        confidenceGain: 0.18,
        effort: "medium",
      },
      {
        id: "fix-atlas-2",
        title: "Move Inés off Vault this week",
        detail:
          "Hand VLT-61 to Jonas and Atlas gets her full week back — Vault slips two days, Atlas gains three.",
        gainDays: 3,
        confidenceGain: 0.12,
        effort: "low",
      },
      {
        id: "fix-atlas-3",
        title: "Pair on review for billing changes",
        detail:
          "A standing review slot each morning takes the queue from 2.4 days back to under one.",
        gainDays: 2,
        confidenceGain: 0.07,
        effort: "low",
      },
      {
        id: "fix-atlas-4",
        title: "Cut the load test from the cutover gate",
        detail:
          "ATL-155 can run after cutover behind the flag. It is the only backlog item still on the critical path.",
        gainDays: 2,
        confidenceGain: 0.05,
        effort: "low",
      },
    ],
    history: [
      { observedOn: "2026-08-07", forecastDate: "2026-10-02", confidence: 0.78 },
      { observedOn: "2026-08-14", forecastDate: "2026-10-02", confidence: 0.76 },
      { observedOn: "2026-08-21", forecastDate: "2026-10-05", confidence: 0.71 },
      { observedOn: "2026-08-28", forecastDate: "2026-10-06", confidence: 0.69 },
      { observedOn: "2026-09-04", forecastDate: "2026-10-09", confidence: 0.62 },
      { observedOn: "2026-09-11", forecastDate: "2026-10-13", confidence: 0.55 },
      { observedOn: "2026-09-18", forecastDate: "2026-10-16", confidence: 0.41 },
    ],
  },
  {
    id: "fc-vault",
    scope: "project",
    scopeId: "pr-vault",
    scopeName: "Vault audit logging",
    generatedAt: "2026-09-19T06:00:00.000Z",
    targetDate: "2026-09-25",
    p10Date: "2026-10-06",
    p50Date: "2026-10-13",
    p90Date: "2026-10-27",
    confidence: 0.23,
    confidenceDelta: -0.09,
    modelMaturity: 0.74,
    sampleSize: 96,
    cone: buildCone({
      startDate: "2026-07-20",
      endDate: "2026-11-02",
      progressToday: 55,
      p10Date: "2026-10-06",
      p50Date: "2026-10-13",
      p90Date: "2026-10-27",
    }),
    distribution: buildDistribution(
      "2026-10-02",
      [1, 3, 7, 12, 16, 16, 13, 10, 7, 5, 4, 3, 2, 1],
    ),
    factors: [
      {
        id: "f-vault-1",
        label: "Hash chain rewritten twice",
        detail:
          "Two full rewrites after the security review, and the verification step is still unspecified.",
        impactDays: 8.5,
        weight: 0.46,
        evidence: "VLT-61 · 21h logged against an 18h estimate",
      },
      {
        id: "f-vault-2",
        label: "Reviewer availability is a hard gate",
        detail:
          "The external reviewer's next window is 6 October. Missing it costs eight days, not one.",
        impactDays: 5,
        weight: 0.27,
        evidence: "VLT-72, blocked by VLT-61 and VLT-64",
      },
      {
        id: "f-vault-3",
        label: "Retention work has sat in review",
        detail: "Six days in review — the longest queue time on the board.",
        impactDays: 2.5,
        weight: 0.15,
        evidence: "VLT-58 in review since 12 Sep",
      },
      {
        id: "f-vault-4",
        label: "Two people on a four-person plan",
        detail: "Vault was staffed for four. Two of them moved to Atlas in August.",
        impactDays: 2,
        weight: 0.12,
        evidence: "Team change on 24 Aug",
      },
    ],
    fixes: [
      {
        id: "fix-vault-1",
        title: "Specify the verification step before writing more",
        detail:
          "Half a day writing down what 'verified' means ends the rewrite loop. Every rewrite so far started here.",
        gainDays: 5,
        confidenceGain: 0.21,
        effort: "low",
      },
      {
        id: "fix-vault-2",
        title: "Book the reviewer for 6 October now",
        detail:
          "Holding the slot turns a hard gate into a soft one even if the work lands a day late.",
        gainDays: 6,
        confidenceGain: 0.16,
        effort: "low",
      },
      {
        id: "fix-vault-3",
        title: "Split the export off the release",
        detail:
          "S3 and GCS export does not block the audit trail itself. Shipping it a week later unblocks sign-off.",
        gainDays: 4,
        confidenceGain: 0.11,
        effort: "medium",
      },
    ],
    history: [
      { observedOn: "2026-08-07", forecastDate: "2026-09-22", confidence: 0.64 },
      { observedOn: "2026-08-14", forecastDate: "2026-09-24", confidence: 0.58 },
      { observedOn: "2026-08-21", forecastDate: "2026-09-28", confidence: 0.49 },
      { observedOn: "2026-08-28", forecastDate: "2026-10-01", confidence: 0.44 },
      { observedOn: "2026-09-04", forecastDate: "2026-10-05", confidence: 0.38 },
      { observedOn: "2026-09-11", forecastDate: "2026-10-09", confidence: 0.32 },
      { observedOn: "2026-09-18", forecastDate: "2026-10-13", confidence: 0.23 },
    ],
  },
  {
    id: "fc-relay",
    scope: "project",
    scopeId: "pr-relay",
    scopeName: "Relay notifications",
    generatedAt: "2026-09-19T06:00:00.000Z",
    targetDate: "2026-11-06",
    p10Date: "2026-10-28",
    p50Date: "2026-11-03",
    p90Date: "2026-11-13",
    confidence: 0.82,
    confidenceDelta: 0.04,
    modelMaturity: 0.66,
    sampleSize: 61,
    cone: buildCone({
      startDate: "2026-08-03",
      endDate: "2026-11-20",
      progressToday: 38,
      p10Date: "2026-10-28",
      p50Date: "2026-11-03",
      p90Date: "2026-11-13",
    }),
    distribution: buildDistribution(
      "2026-10-26",
      [3, 8, 13, 18, 17, 13, 9, 6, 4, 3, 2, 2, 1, 1],
    ),
    factors: [
      {
        id: "f-relay-1",
        label: "Adapter contract landed clean",
        detail: "The conformance suite caught the transport bugs before integration did.",
        impactDays: -3,
        weight: 0.34,
        evidence: "REL-18 closed a day early, no follow-up changes",
      },
      {
        id: "f-relay-2",
        label: "Devansh is splitting time with Atlas",
        detail: "Roughly a day a week goes to billing questions he is the only one who can answer.",
        impactDays: 2.5,
        weight: 0.3,
        evidence: "Assigned on both ATL-147 and REL-22",
      },
      {
        id: "f-relay-3",
        label: "Scope is well specified",
        detail: "Every open task has an estimate and an owner, which historically halves variance.",
        impactDays: -1.5,
        weight: 0.22,
        evidence: "19 open tasks, 19 estimated",
      },
      {
        id: "f-relay-4",
        label: "Notification settings touch two surfaces",
        detail: "Backend and frontend in one task tends to run 20% over on this team.",
        impactDays: 1.2,
        weight: 0.14,
        evidence: "REL-27 · labelled backend and frontend",
      },
    ],
    fixes: [
      {
        id: "fix-relay-1",
        title: "Split REL-27 by surface",
        detail: "Separate backend and frontend tasks land more predictably than one combined task.",
        gainDays: 2,
        confidenceGain: 0.05,
        effort: "low",
      },
      {
        id: "fix-relay-2",
        title: "Write down the billing answers Devansh keeps giving",
        detail: "A page of notes buys back most of the day a week he loses to Atlas questions.",
        gainDays: 3,
        confidenceGain: 0.06,
        effort: "medium",
      },
    ],
    history: [
      { observedOn: "2026-08-14", forecastDate: "2026-11-10", confidence: 0.61 },
      { observedOn: "2026-08-21", forecastDate: "2026-11-09", confidence: 0.66 },
      { observedOn: "2026-08-28", forecastDate: "2026-11-06", confidence: 0.71 },
      { observedOn: "2026-09-04", forecastDate: "2026-11-05", confidence: 0.74 },
      { observedOn: "2026-09-11", forecastDate: "2026-11-04", confidence: 0.78 },
      { observedOn: "2026-09-18", forecastDate: "2026-11-03", confidence: 0.82 },
    ],
  },
];

const byScope = new Map<ID, Forecast>(
  forecasts.map((forecast) => [forecast.scopeId, forecast]),
);

export function getForecast(scopeId: ID | null | undefined): Forecast | undefined {
  if (!scopeId) return undefined;
  return byScope.get(scopeId);
}

/** The forecast the app opens on. */
export const primaryForecast: Forecast = forecasts[0];

/** Confidence for the whole portfolio, week by week, for reporting. */
export const portfolioTrend: { label: string; value: number }[] = [
  { label: "W31", value: 0.74 },
  { label: "W32", value: 0.72 },
  { label: "W33", value: 0.69 },
  { label: "W34", value: 0.66 },
  { label: "W35", value: 0.63 },
  { label: "W36", value: 0.59 },
  { label: "W37", value: 0.57 },
  { label: "W38", value: 0.58 },
];

/** Probability of delivering everything currently committed this quarter. */
export const portfolioConfidenceNow = clamp01(0.58);
