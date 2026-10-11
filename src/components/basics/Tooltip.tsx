import { useId, useState } from "react";
import type { ReactNode } from "react";
import { joinClasses } from "@/helpers/joinClasses";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  className?: string;
}

/**
 * Hover and focus tooltip. Deliberately unpositioned beyond four simple
 * placements — anything that needs collision handling should be a popover.
 */
export function Tooltip({
  content,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={joinClasses("tooltip-anchor", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? id : undefined}
    >
      {children}
      {open ? (
        <span className={joinClasses("tooltip-bubble", `tooltip-${placement}`)} id={id} role="tooltip">
          {content}
        </span>
      ) : null}
    </span>
  );
}

export default Tooltip;
