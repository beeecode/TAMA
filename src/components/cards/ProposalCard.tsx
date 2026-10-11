import { SparkleIcon } from "@/components/basics/Icon";

export interface ProposalCardProps {
  title: string;
  /** The because line. A proposal never appears without its reason. */
  rationale: string;
  source: string;
  onApprove?: () => void;
  onDismiss?: () => void;
  compact?: boolean;
}

export function ProposalCard({
  title,
  rationale,
  source,
  onApprove,
  onDismiss,
  compact = false,
}: ProposalCardProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "#EEEFFC", border: "1px solid #DCDDF8" }}
    >
      <div className="flex items-start gap-2 mb-2">
        <SparkleIcon size={14} />
        <span
          className="text-text-tertiary uppercase"
          style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
        >
          {source}
        </span>
      </div>
      <div
        className="text-text-primary font-medium mb-1"
        style={{ fontSize: compact ? 12 : 13 }}
      >
        {title}
      </div>
      <div className="text-text-secondary mb-3" style={{ fontSize: 12 }}>
        {rationale}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onApprove}
          className="px-3 py-1 rounded-lg text-white font-medium transition-colors cursor-pointer"
          style={{ fontSize: 12, background: "var(--color-action)", border: "none" }}
        >
          Approve
        </button>
        <button
          onClick={onDismiss}
          className="px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer"
          style={{
            fontSize: 12,
            background: "transparent",
            color: "#62626F",
            border: "1px solid #D5D5DE",
          }}
        >
          Dismiss
        </button>
        {!compact && (
          <button
            className="px-2 py-1 text-ai-strong cursor-pointer"
            style={{ fontSize: 12, background: "none", border: "none" }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProposalCard;
