import type { ComponentType } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  ArrowSquareOut,
  ArrowUp,
  Bell,
  ChatCircle,
  BookOpen,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChartBar,
  ChatCircleDots,
  Check,
  CheckSquare,
  Clock,
  CreditCard,
  DotsThree,
  FileText,
  Flag,
  Folder,
  FunnelSimple,
  House,
  Info,
  Kanban,
  Lightning,
  LinkSimple,
  ListBullets,
  Lock,
  MagnifyingGlass,
  Minus,
  Moon,
  PaperPlaneTilt,
  Paperclip,
  Pause,
  Play,
  Plus,
  PushPin,
  Rows,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  Sun,
  Target,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Tray,
  TrendUp,
  User,
  UsersThree,
  Warning,
  X,
  type IconProps as PhosphorProps,
  type IconWeight,
} from "@phosphor-icons/react";
import {
  SiAsana,
  SiFigma,
  SiGmail,
  SiGooglecalendar,
  SiGoogledrive,
  SiJira,
  SiNotion,
} from "@icons-pack/react-simple-icons";

import type { IconName } from "@/types";
import { joinClasses } from "@/helpers/joinClasses";

/**
 * The icon set is Phosphor. Everything routes through this one component, so
 * the whole product can change weight or library in a single file — and so no
 * screen has to hand-draw an SVG path again.
 */
const GLYPHS: Record<IconName, ComponentType<PhosphorProps>> = {
  home: House,
  tasks: CheckSquare,
  forecast: TrendUp,
  inbox: Tray,
  team: UsersThree,
  documents: FileText,
  automations: Lightning,
  reporting: ChartBar,
  settings: SlidersHorizontal,
  ask: Sparkle,
  search: MagnifyingGlass,
  plus: Plus,
  close: X,
  check: Check,
  minus: Minus,
  chevronDown: CaretDown,
  chevronRight: CaretRight,
  chevronLeft: CaretLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  bell: Bell,
  calendar: CalendarBlank,
  clock: Clock,
  filter: FunnelSimple,
  alert: Warning,
  info: Info,
  sparkle: Sparkle,
  user: User,
  link: LinkSimple,
  refresh: ArrowsClockwise,
  play: Play,
  pause: Pause,
  more: DotsThree,
  external: ArrowSquareOut,
  trash: Trash,
  lock: Lock,
  card: CreditCard,
  board: Kanban,
  list: ListBullets,
  timeline: Rows,
  grid: SquaresFour,
  flag: Flag,
  target: Target,
  book: BookOpen,
  shield: ShieldCheck,
  zap: Lightning,
  moon: Moon,
  sun: Sun,
  send: PaperPlaneTilt,
  folder: Folder,
  chart: ChartBar,
  pin: PushPin,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  comment: ChatCircle,
  attachment: Paperclip,
};

export interface IconProps {
  name: IconName;
  /** Pixel size for both axes. */
  size?: number;
  className?: string;
  /** Phosphor weight. `fill` and `duotone` are reserved for emphasis. */
  weight?: IconWeight;
  /** Legacy escape hatch: anything 2.2 or above renders bold. */
  strokeWidth?: number;
  /** Explicit colour. Omit it and the icon inherits currentColor. */
  color?: string;
  /** Give the icon a label only when it carries meaning on its own. */
  title?: string;
}

export function Icon({
  name,
  size = 18,
  className,
  weight,
  strokeWidth,
  color,
  title,
}: IconProps) {
  const Glyph = GLYPHS[name];
  const resolved: IconWeight =
    weight ?? (strokeWidth !== undefined && strokeWidth >= 2.2 ? "bold" : "regular");

  return (
    <Glyph
      size={size}
      weight={resolved}
      color={color}
      className={joinClasses("icon", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    />
  );
}

/**
 * The one mark that means "TAMA generated this". Filled rather than stroked so
 * it reads as a token, not as another control icon.
 */
export function SparkleIcon({
  size = 16,
  color = "var(--color-ai-strong)",
}: {
  size?: number;
  color?: string;
}) {
  return <Sparkle size={size} color={color} weight="fill" aria-hidden="true" />;
}

/* -------------------------------------------------------------------------
   Source marks — the real brand logos, from Simple Icons.
------------------------------------------------------------------------- */

export type SourceName =
  | "Google Calendar"
  | "Slack"
  | "Google Drive"
  | "Notion"
  | "Gmail"
  | "Asana"
  | "Jira"
  | "Figma";

interface SourceMark {
  Glyph: ComponentType<{ size?: number; color?: string; title?: string }>;
  /** The brand's own colour. */
  tint: string;
}

/**
 * Simple Icons dropped Slack's logo over trademark policy, so this is a
 * generic chat mark in Slack's aubergine rather than the real wordmark.
 */
function SlackMark({ size = 20, color = "#4A154B" }: { size?: number; color?: string }) {
  return <ChatCircleDots size={size} color={color} weight="fill" aria-hidden="true" />;
}

const SOURCE_MARKS: Record<SourceName, SourceMark> = {
  "Google Calendar": { Glyph: SiGooglecalendar, tint: "#4285F4" },
  Slack: { Glyph: SlackMark, tint: "#4A154B" },
  "Google Drive": { Glyph: SiGoogledrive, tint: "#4285F4" },
  Notion: { Glyph: SiNotion, tint: "#16161D" },
  Gmail: { Glyph: SiGmail, tint: "#EA4335" },
  Asana: { Glyph: SiAsana, tint: "#F06A6A" },
  Jira: { Glyph: SiJira, tint: "#0052CC" },
  Figma: { Glyph: SiFigma, tint: "#A259FF" },
};

export interface SourceIconProps {
  name: SourceName;
  size?: number;
  /** Draws the tinted tile behind the mark. */
  tile?: boolean;
  /** Renders in ink instead of the brand colour. */
  monochrome?: boolean;
}

export function SourceIcon({
  name,
  size = 20,
  tile = false,
  monochrome = false,
}: SourceIconProps) {
  const { Glyph, tint } = SOURCE_MARKS[name];
  const colour = monochrome ? "#16161D" : tint;
  const glyph = <Glyph size={size} color={colour} />;

  if (!tile) return glyph;

  return (
    <span
      className="flex items-center justify-center rounded-xl flex-shrink-0"
      style={{
        width: size * 2,
        height: size * 2,
        background: `color-mix(in srgb, ${colour} 10%, transparent)`,
      }}
    >
      {glyph}
    </span>
  );
}

export default Icon;
