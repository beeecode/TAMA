/** Number formatting. Everything here returns display strings, never values. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Clamps a probability-like value into 0–1. */
export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function formatNumber(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** 0.82 → "82%" */
export function formatPercent(fraction: number, digits = 0): string {
  return `${formatNumber(clamp01(fraction) * 100, digits)}%`;
}

/** A change in probability, expressed in points: 0.06 → "+6 pts". */
export function formatPoints(delta: number, digits = 0): string {
  const points = delta * 100;
  const sign = points > 0 ? "+" : points < 0 ? "−" : "";
  return `${sign}${formatNumber(Math.abs(points), digits)} pts`;
}

/** 12400 → "12.4k" */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

/** Always shows the direction: 3 → "+3", −2 → "−2", 0 → "0". */
export function formatSigned(value: number, digits = 0): string {
  if (value === 0) return formatNumber(0, digits);
  const sign = value > 0 ? "+" : "−";
  return `${sign}${formatNumber(Math.abs(value), digits)}`;
}

/** 6.5 → "6h 30m", 8 → "8h", 0.5 → "30m" */
export function formatHours(hours: number): string {
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (whole === 0) return `${minutes}m`;
  if (minutes === 0) return `${whole}h`;
  return `${whole}h ${minutes}m`;
}

/** Signed day counts for forecast movement: 4 → "+4d", −1 → "−1d". */
export function formatDays(days: number): string {
  return `${formatSigned(days)}d`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${formatNumber(seconds, seconds < 10 ? 1 : 0)}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${Math.round(seconds % 60)}s`;
}

/** Ratio of two numbers as a percentage string, guarding divide-by-zero. */
export function formatRatio(part: number, whole: number): string {
  if (whole === 0) return "—";
  return formatPercent(part / whole);
}

export function pluralise(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${formatNumber(count)} ${word}`;
}
