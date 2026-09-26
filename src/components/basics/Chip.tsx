import type { ReactNode } from "react";
import type { IconName } from "@/types";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

export interface ChipProps {
  children: ReactNode;
  icon?: IconName;
  /** A coloured dot, e.g. a project swatch. Pass any CSS colour. */
  dotColor?: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

/**
 * A small pill. Static by default; becomes a button when given `onClick`,
 * which is how filter rows are built.
 */
export function Chip({
  children,
  icon,
  dotColor,
  count,
  selected = false,
  onClick,
  onRemove,
  className,
}: ChipProps) {
  const content = (
    <>
      {dotColor ? (
        <span
          className="chip-dot"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
      ) : null}
      {icon ? <Icon name={icon} size={13} /> : null}
      <span>{children}</span>
      {typeof count === "number" ? (
        <span className="chip-count">{count}</span>
      ) : null}
    </>
  );

  const classes = joinClasses(
    "chip",
    onClick && "chip-button",
    selected && "chip-selected",
    className,
  );

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} aria-pressed={selected}>
        {content}
      </button>
    );
  }

  return (
    <span className={classes}>
      {content}
      {onRemove ? (
        <button
          type="button"
          className="chip-remove"
          aria-label="Remove"
          onClick={onRemove}
        >
          <Icon name="close" size={12} />
        </button>
      ) : null}
    </span>
  );
}

export default Chip;
