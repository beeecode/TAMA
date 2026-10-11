import type { CSSProperties, ReactNode } from "react";

export interface SectionCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * The standard raised panel every section sits in.
 *
 * The generous corner radius is deliberate: on a screen that is mostly dense
 * numbers, softness has to come from the containers, because the data itself
 * cannot afford any.
 */
export function SectionCard({
  children,
  className = "",
  style = {},
}: SectionCardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl ${className}`}
      style={{
        border: "1px solid #EAEAEF",
        boxShadow: "var(--shadow-el1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default SectionCard;
