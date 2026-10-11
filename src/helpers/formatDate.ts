import type { ISODate, ISODateTime } from "@/types";

/**
 * The demo runs against a fixed "now" so every forecast, countdown and
 * relative timestamp stays stable no matter when the app is opened.
 */
export const TODAY: ISODate = "2026-09-19";
export const NOW: ISODateTime = "2026-09-19T09:30:00.000Z";

const MS_PER_DAY = 86_400_000;

/** Parses `YYYY-MM-DD` as local midnight — never as UTC, which shifts the day. */
export function parseISODate(date: ISODate): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function toISODate(date: Date): ISODate {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function addDays(date: ISODate, days: number): ISODate {
  const next = parseISODate(date);
  next.setDate(next.getDate() + days);
  return toISODate(next);
}

/** Whole days from `from` to `to`; negative when `to` is earlier. */
export function daysBetween(from: ISODate, to: ISODate): number {
  return Math.round(
    (parseISODate(to).getTime() - parseISODate(from).getTime()) / MS_PER_DAY,
  );
}

export function isWeekend(date: ISODate): boolean {
  const day = parseISODate(date).getDay();
  return day === 0 || day === 6;
}

/** Working days between two dates, ignoring holidays. */
export function workingDaysBetween(from: ISODate, to: ISODate): number {
  const total = daysBetween(from, to);
  const step = total >= 0 ? 1 : -1;
  let cursor = from;
  let count = 0;
  for (let i = 0; i < Math.abs(total); i += 1) {
    cursor = addDays(cursor, step);
    if (!isWeekend(cursor)) count += step;
  }
  return count;
}

export type DateStyle = "short" | "medium" | "long" | "weekday" | "dayMonth";

const FORMATS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { day: "numeric", month: "short" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
  weekday: { weekday: "short", day: "numeric", month: "short" },
  dayMonth: { day: "2-digit", month: "short" },
};

export function formatDate(date: ISODate, style: DateStyle = "short"): string {
  return new Intl.DateTimeFormat("en-GB", FORMATS[style]).format(
    parseISODate(date),
  );
}

/** "8 – 14 Oct", collapsing the month when both ends share one. */
export function formatDateRange(from: ISODate, to: ISODate): string {
  const start = parseISODate(from);
  const end = parseISODate(to);
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();
  const startPart = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    ...(sameMonth ? {} : { month: "short" }),
  }).format(start);
  return `${startPart} – ${formatDate(to, "short")}`;
}

export function formatWeekday(date: ISODate): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
    parseISODate(date),
  );
}

export function formatMonthYear(date: ISODate): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(parseISODate(date));
}

export function formatTime(timestamp: ISODateTime): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

/** "just now", "12m ago", "3h ago", "2d ago", then a plain date. */
export function formatRelativeTime(
  timestamp: ISODateTime,
  now: ISODateTime = NOW,
): string {
  const diffMs = new Date(now).getTime() - new Date(timestamp).getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp.slice(0, 10), "short");
}

/** "in 3 days", "today", "4 days ago" — relative to the fixed demo today. */
export function formatRelativeDate(date: ISODate, from: ISODate = TODAY): string {
  const days = daysBetween(from, date);
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/** "+4 days late", "3 days early", "on the day" — for forecast vs target. */
export function formatSlip(days: number): string {
  if (days === 0) return "on the day";
  const unit = Math.abs(days) === 1 ? "day" : "days";
  return days > 0 ? `${days} ${unit} late` : `${Math.abs(days)} ${unit} early`;
}

/** The Monday of the week containing `date`. */
export function startOfWeek(date: ISODate): ISODate {
  const parsed = parseISODate(date);
  const offset = (parsed.getDay() + 6) % 7;
  return addDays(date, -offset);
}

/** Five working days starting from the Monday of `date`'s week. */
export function weekDays(date: ISODate = TODAY): ISODate[] {
  const monday = startOfWeek(date);
  return [0, 1, 2, 3, 4].map((index) => addDays(monday, index));
}
