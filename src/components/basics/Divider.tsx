import { joinClasses } from "@/helpers/joinClasses";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  /** Renders as a centred caption between two rules, e.g. "or". */
  label?: string;
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className,
}: DividerProps) {
  if (label) {
    return (
      <div className={joinClasses("divider-labelled", className)} role="separator">
        {label}
      </div>
    );
  }

  return (
    <hr
      className={joinClasses("divider", `divider-${orientation}`, className)}
      aria-orientation={orientation}
    />
  );
}

export default Divider;
