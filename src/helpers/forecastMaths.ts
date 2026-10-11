import type {
  ConfidenceLevel,
  DistributionBin,
  Forecast,
  ForecastFactor,
  ISODate,
  Task,
  Tone,
} from "@/types";
import { daysBetween, TODAY } from "./formatDate";
import { clamp01 } from "./formatNumber";

/**
 * Thresholds for turning a probability into a word. They live here rather than
 * in each component so the whole product draws the line in the same place.
 */
export const CONFIDENCE_THRESHOLDS = {
  high: 0.75,
  medium: 0.5,
} as const;

export function confidenceLevel(probability: number): ConfidenceLevel {
  if (probability >= CONFIDENCE_THRESHOLDS.high) return "high";
  if (probability >= CONFIDENCE_THRESHOLDS.medium) return "medium";
  return "low";
}

export function confidenceTone(probability: number): Tone {
  const level = confidenceLevel(probability);
  if (level === "high") return "positive";
  if (level === "medium") return "caution";
  return "critical";
}

export function confidenceColor(probability: number): string {
  return `var(--confidence-${confidenceLevel(probability)})`;
}

/** Plain-language verdict used in headings and summaries. */
export function confidenceVerdict(probability: number): string {
  const level = confidenceLevel(probability);
  if (level === "high") return "On track";
  if (level === "medium") return "At risk";
  return "Off track";
}

/* -- Descriptive statistics ------------------------------------------------ */

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function median(values: number[]): number {
  return percentile(values, 0.5);
}

/** Linear-interpolated percentile; `p` is 0–1. Input need not be sorted. */
export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const position = clamp01(p) * (sorted.length - 1);
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

export function standardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const average = mean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - average) ** 2, 0) /
    (values.length - 1);
  return Math.sqrt(variance);
}

/* -- Distributions --------------------------------------------------------- */

/** Running total of a finish-date histogram, so it can be read as "by X, Y%". */
export function cumulative(bins: DistributionBin[]): number[] {
  let total = 0;
  return bins.map((bin) => {
    total += bin.probability;
    return clamp01(total);
  });
}

/** Probability the work is done on or before `date`. */
export function probabilityBy(bins: DistributionBin[], date: ISODate): number {
  const totals = cumulative(bins);
  let result = 0;
  bins.forEach((bin, index) => {
    if (daysBetween(bin.date, date) >= 0) result = totals[index];
  });
  return result;
}

/** The first bucket where the cumulative probability crosses `p`. */
export function dateAtProbability(
  bins: DistributionBin[],
  p: number,
): ISODate | null {
  const totals = cumulative(bins);
  for (let index = 0; index < bins.length; index += 1) {
    if (totals[index] >= p) return bins[index].date;
  }
  return bins.length > 0 ? bins[bins.length - 1].date : null;
}

/** Tallest bucket — the single most likely finish date. */
export function modalBin(bins: DistributionBin[]): DistributionBin | null {
  if (bins.length === 0) return null;
  return bins.reduce((best, bin) =>
    bin.probability > best.probability ? bin : best,
  );
}

/* -- Forecast shape -------------------------------------------------------- */

/** Days between the committed date and the median forecast. Positive = late. */
export function slipDays(forecast: Pick<Forecast, "targetDate" | "p50Date">): number {
  return daysBetween(forecast.targetDate, forecast.p50Date);
}

/** Width of the p10–p90 band in days: how undecided the model still is. */
export function spreadDays(forecast: Pick<Forecast, "p10Date" | "p90Date">): number {
  return daysBetween(forecast.p10Date, forecast.p90Date);
}

/** Factors sorted by how much of the movement they explain. */
export function rankFactors(factors: ForecastFactor[]): ForecastFactor[] {
  return [...factors].sort(
    (a, b) => Math.abs(b.impactDays) - Math.abs(a.impactDays),
  );
}

/** Net effect of every factor, in days. */
export function netFactorDays(factors: ForecastFactor[]): number {
  return factors.reduce((sum, factor) => sum + factor.impactDays, 0);
}

/**
 * Rolls per-project confidence up to a portfolio number. Deliveries share
 * people and dependencies, so a plain product would be far too pessimistic —
 * this leans on the weakest item and softens the rest.
 */
export function portfolioConfidence(confidences: number[]): number {
  if (confidences.length === 0) return 0;
  const weakest = Math.min(...confidences);
  return clamp01(weakest * 0.6 + mean(confidences) * 0.4);
}

/**
 * A 0–1 risk score for sorting task lists by what deserves attention:
 * low confidence, an overdue forecast and being blocked all push it up.
 */
export function taskRiskScore(task: Task, today: ISODate = TODAY): number {
  const confidenceRisk = 1 - clamp01(task.confidence);
  const slip = daysBetween(task.dueDate, task.forecastDate);
  const slipRisk = clamp01(slip / 10);
  const overdueRisk = clamp01(daysBetween(task.dueDate, today) / 7);
  const blockedRisk = task.blockedByIds.length > 0 ? 0.2 : 0;
  const priorityRisk = task.priority === "urgent" ? 0.15 : task.priority === "high" ? 0.08 : 0;
  return clamp01(
    confidenceRisk * 0.45 +
      slipRisk * 0.25 +
      overdueRisk * 0.15 +
      blockedRisk +
      priorityRisk,
  );
}

/** Capacity used this week, where 1 is exactly full. */
export function loadRatio(committedHours: number, capacityHours: number): number {
  if (capacityHours <= 0) return 0;
  return committedHours / capacityHours;
}

export function loadState(ratio: number): "ok" | "near" | "over" {
  if (ratio > 1) return "over";
  if (ratio > 0.85) return "near";
  return "ok";
}

/**
 * How seriously to take a forecast. Below ~6 weeks of history the model is
 * still calibrating and the UI says so rather than quietly showing a number.
 */
export function isModelCalibrating(forecast: Pick<Forecast, "modelMaturity">): boolean {
  return forecast.modelMaturity < 0.6;
}
