import type { ReactNode } from "react";
import { Button } from "@/components/basics/Button";

export interface EmptyStateProps {
  title: string;
  /** Trailing words rendered in the italic accent — the product's own voice. */
  titleAccent?: string;
  body?: string;
  /** Usually a glyph or small illustration. */
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

/** Nothing here — said in a way that tells you whether that is good news. */
export function EmptyState({
  title,
  titleAccent,
  body,
  icon,
  actionLabel,
  onAction,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-xl"
      style={{
        padding: compact ? "32px 24px" : "64px 24px",
        background: "#FFFFFF",
        border: "1px dashed #EAEAEF",
      }}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h3
        className="text-text-primary"
        style={{
          fontSize: compact ? 15 : 17,
          fontWeight: 600,
          fontFamily: "var(--font-tight)",
          margin: "0 0 6px",
        }}
      >
        {title}
        {titleAccent && <> <span className="accent">{titleAccent}</span></>}
      </h3>
      {body && (
        <p
          className="text-text-secondary"
          style={{ fontSize: 13, margin: 0, maxWidth: 380, lineHeight: "20px" }}
        >
          {body}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
