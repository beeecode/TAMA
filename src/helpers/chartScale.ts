/**
 * Small scale and path helpers for the hand-rolled SVG charts.
 * Nothing here knows about React — charts pass numbers in and get numbers or
 * path strings back.
 */

export interface Point {
  x: number;
  y: number;
}

export type Scale = (value: number) => number;

export interface Extent {
  min: number;
  max: number;
}

/** Maps a value from `domain` onto `range`, clamping nothing. */
export function createScale(
  domain: [number, number],
  range: [number, number],
): Scale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0;
  if (span === 0) return () => (r0 + r1) / 2;
  return (value: number) => r0 + ((value - d0) / span) * (r1 - r0);
}

export function extent(values: number[]): Extent {
  if (values.length === 0) return { min: 0, max: 1 };
  let min = values[0];
  let max = values[0];
  for (const value of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return { min, max };
}

/**
 * Pads a domain so lines never graze the frame, and keeps zero as the floor
 * when every value is positive — bar charts lie otherwise.
 */
export function niceDomain(
  values: number[],
  options: { zeroBased?: boolean; padding?: number } = {},
): [number, number] {
  const { zeroBased = false, padding = 0.1 } = options;
  const { min, max } = extent(values);
  if (min === max) {
    const bump = Math.abs(min) * 0.2 || 1;
    return [zeroBased ? 0 : min - bump, max + bump];
  }
  const pad = (max - min) * padding;
  const lower = zeroBased ? 0 : min - pad;
  return [lower, max + pad];
}

/** Round tick values covering `[min, max]`, roughly `count` of them. */
export function niceTicks(min: number, max: number, count = 4): number[] {
  if (min === max) return [min];
  const rawStep = (max - min) / Math.max(1, count);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const residual = rawStep / magnitude;
  const step =
    (residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1) * magnitude;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let value = start; value <= max + step * 0.001; value += step) {
    // Guard against binary drift producing values like 0.30000000000000004.
    ticks.push(Number(value.toFixed(10)));
  }
  return ticks;
}

/** Evenly spaced band centres, the way a column chart wants them. */
export function bandCentres(
  count: number,
  width: number,
  paddingRatio = 0.28,
): { centres: number[]; bandWidth: number } {
  if (count <= 0) return { centres: [], bandWidth: 0 };
  const slot = width / count;
  const bandWidth = slot * (1 - paddingRatio);
  const centres = Array.from({ length: count }, (_, i) => slot * (i + 0.5));
  return { centres, bandWidth };
}

export function toPoints(
  values: number[],
  xScale: Scale,
  yScale: Scale,
): Point[] {
  return values.map((value, index) => ({
    x: xScale(index),
    y: yScale(value),
  }));
}

/** Straight-segment path. */
export function linePath(points: Point[]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${round(p.x)} ${round(p.y)}`)
    .join(" ");
}

/**
 * Cardinal-spline path. Smoothing is kept low (0.18) so a curve never invents
 * a peak the data does not have.
 */
export function smoothPath(points: Point[], tension = 0.18): string {
  if (points.length < 3) return linePath(points);
  let d = `M${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) * tension;
    const c1y = p1.y + (p2.y - p0.y) * tension;
    const c2x = p2.x - (p3.x - p1.x) * tension;
    const c2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(
      p2.x,
    )} ${round(p2.y)}`;
  }
  return d;
}

/** Closes a line down to `baseline` so it can be filled. */
export function areaPath(
  points: Point[],
  baseline: number,
  smooth = false,
): string {
  if (points.length === 0) return "";
  const top = smooth ? smoothPath(points) : linePath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${top} L${round(last.x)} ${round(baseline)} L${round(first.x)} ${round(
    baseline,
  )} Z`;
}

/** A band between an upper and lower series — the uncertainty cone. */
export function bandPath(upper: Point[], lower: Point[], smooth = true): string {
  if (upper.length === 0 || lower.length === 0) return "";
  const top = smooth ? smoothPath(upper) : linePath(upper);
  const reversed = [...lower].reverse();
  const bottom = reversed
    .map((p, i) => `${i === 0 ? "L" : "L"}${round(p.x)} ${round(p.y)}`)
    .join(" ");
  return `${top} ${bottom} Z`;
}

/** Nearest data index for a pointer position — used for chart hovers. */
export function indexAtPosition(
  x: number,
  count: number,
  width: number,
): number {
  if (count <= 1) return 0;
  const step = width / (count - 1);
  return Math.max(0, Math.min(count - 1, Math.round(x / step)));
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
