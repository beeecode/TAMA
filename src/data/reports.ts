import type { AccuracyPoint, MetricSeries, PortfolioLine, SeriesPoint } from "@/types";

/** Did the work land inside the band we promised, and by how much did we miss? */
export const forecastAccuracy: AccuracyPoint[] = [
  { label: "Apr", withinBand: 0.52, errorDays: 6.4 },
  { label: "May", withinBand: 0.58, errorDays: 5.7 },
  { label: "Jun", withinBand: 0.64, errorDays: 4.9 },
  { label: "Jul", withinBand: 0.71, errorDays: 3.8 },
  { label: "Aug", withinBand: 0.76, errorDays: 3.1 },
  { label: "Sep", withinBand: 0.79, errorDays: 2.6 },
];

/** Cycle time, split by the part of it people can actually act on. */
export const cycleTime: MetricSeries[] = [
  {
    id: "cy-active",
    label: "Active work",
    color: "var(--series-1)",
    points: [
      { label: "W31", value: 2.8 },
      { label: "W32", value: 3.1 },
      { label: "W33", value: 2.9 },
      { label: "W34", value: 3.4 },
      { label: "W35", value: 3.2 },
      { label: "W36", value: 3.6 },
      { label: "W37", value: 3.3 },
      { label: "W38", value: 3.1 },
    ],
  },
  {
    id: "cy-waiting",
    label: "Waiting",
    color: "var(--series-4)",
    points: [
      { label: "W31", value: 0.9 },
      { label: "W32", value: 1.1 },
      { label: "W33", value: 1.4 },
      { label: "W34", value: 1.8 },
      { label: "W35", value: 2.1 },
      { label: "W36", value: 2.4 },
      { label: "W37", value: 2.6 },
      { label: "W38", value: 2.4 },
    ],
  },
];

/** Tasks closed per week, for the throughput chart. */
export const weeklyThroughput: SeriesPoint[] = [
  { label: "W31", value: 14 },
  { label: "W32", value: 17 },
  { label: "W33", value: 12 },
  { label: "W34", value: 19 },
  { label: "W35", value: 16 },
  { label: "W36", value: 11 },
  { label: "W37", value: 15 },
  { label: "W38", value: 13 },
];

/** Committed-date confidence per delivery, for the portfolio panel. */
export const portfolioLines: PortfolioLine[] = [
  {
    projectId: "pr-atlas",
    name: "Atlas billing migration",
    confidence: 0.41,
    targetDate: "2026-10-09",
    forecastDate: "2026-10-16",
    trend: [0.78, 0.76, 0.71, 0.69, 0.62, 0.55, 0.41],
  },
  {
    projectId: "pr-vault",
    name: "Vault audit logging",
    confidence: 0.23,
    targetDate: "2026-09-25",
    forecastDate: "2026-10-13",
    trend: [0.64, 0.58, 0.49, 0.44, 0.38, 0.32, 0.23],
  },
  {
    projectId: "pr-relay",
    name: "Relay notifications",
    confidence: 0.82,
    targetDate: "2026-11-06",
    forecastDate: "2026-11-03",
    trend: [0.61, 0.66, 0.71, 0.74, 0.78, 0.8, 0.82],
  },
  {
    projectId: "pr-orbit",
    name: "Orbit onboarding",
    confidence: 0.76,
    targetDate: "2026-10-30",
    forecastDate: "2026-10-27",
    trend: [0.68, 0.7, 0.69, 0.72, 0.74, 0.75, 0.76],
  },
  {
    projectId: "pr-signal",
    name: "Signal mobile beta",
    confidence: 0.69,
    targetDate: "2026-12-11",
    forecastDate: "2026-12-08",
    trend: [0.72, 0.71, 0.7, 0.7, 0.69, 0.69, 0.69],
  },
];

/** Delivery confidence for the tasks page header chart. */
export const deliveryConfidence: SeriesPoint[] = [
  { label: "W31", value: 0.74 },
  { label: "W32", value: 0.72 },
  { label: "W33", value: 0.7 },
  { label: "W34", value: 0.66 },
  { label: "W35", value: 0.61 },
  { label: "W36", value: 0.57 },
  { label: "W37", value: 0.52 },
  { label: "W38", value: 0.48 },
];

/** Headline numbers on the reporting page. */
export const reportingSummary = {
  deliveriesInQuarter: 12,
  deliveredOnCommitment: 9,
  medianSlipDays: 2.4,
  proposalsAccepted: 23,
  proposalsOffered: 31,
  daysRecovered: 34,
};
