import { Button } from "@/components/basics/Button";
import { SparkleIcon } from "@/components/basics/Icon";
import { ProposalCard } from "@/components/cards/ProposalCard";
import { EmptyState } from "@/components/states/EmptyState";
import { ToastStack, useToasts } from "@/components/states/Toast";
import {
  allProposals,
  resetProposals,
  resolveProposals,
  restoreProposals,
  useOpenProposals,
} from "@/data/proposals";

export function InboxPage() {
  const open = useOpenProposals();
  const { toasts, push, dismiss } = useToasts();

  /** Nothing here is worth a confirm dialog, so everything offers undo. */
  const resolve = (ids: string[], verb: "Approved" | "Dismissed") => {
    const previous = resolveProposals(ids);
    push({
      text: `${verb} ${ids.length === 1 ? "1 suggestion" : `${ids.length} suggestions`}`,
      tone: verb === "Approved" ? "success" : "info",
      actionLabel: "Undo",
      onAction: () => restoreProposals(previous),
    });
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
          <div className="flex items-center gap-3">
            <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Inbox</h1>
            {open.length > 0 && (
              <span
                className="rounded-full text-white flex items-center justify-center"
                style={{ background: '#8B8FE8', fontSize: 12, fontWeight: 600, minWidth: 22, height: 22, padding: '0 6px', fontFamily: 'var(--font-mono)' }}
              >
                {open.length}
              </span>
            )}
          </div>
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            Only the things that moved a date. Everything else waits.
          </p>
        </div>
        {open.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => resolve(open.map((p) => p.id), "Approved")}
            >
              Approve all
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => resolve(open.map((p) => p.id), "Dismissed")}
            >
              Dismiss all
            </Button>
          </div>
        )}
      </div>

      {/* AI context banner */}
      <div
        className="flex items-start gap-3 rounded-xl p-4 mb-6"
        style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
      >
        <SparkleIcon size={16} />
        <div>
          <div className="text-ai-strong font-medium mb-0.5" style={{ fontSize: 13 }}>TAMA reviewed your workspace</div>
          <div className="text-text-secondary" style={{ fontSize: 13 }}>
            Scanned 48 Slack messages, 6 calendar events, and 12 task updates from the past 48 hours. Found {allProposals.length} items that may need your attention.
          </div>
        </div>
      </div>

      {open.length === 0 ? (
        <EmptyState
          title="Inbox"
          titleAccent="clear"
          body="Nothing needs you right now. TAMA keeps reading your sources and will put anything that moves a date here."
          icon={<SparkleIcon size={28} />}
          actionLabel="Restore suggestions"
          onAction={resetProposals}
        />
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {open.map((proposal, index) => (
            <div
              key={proposal.id}
              className="rise"
              style={{ ["--i" as string]: Math.min(index, 8) }}
            >
            <ProposalCard
              title={proposal.title}
              rationale={proposal.rationale}
              source={proposal.source}
              onApprove={() => resolve([proposal.id], "Approved")}
              onDismiss={() => resolve([proposal.id], "Dismissed")}
            />
            </div>
          ))}
        </div>
      )}

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}

export default InboxPage;
