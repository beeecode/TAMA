import { Avatar } from "@/components/basics/Avatar";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";


interface TaskDetailProps {
  onClose: () => void;
}

const SUBTASKS = [
  { title: 'Brief stakeholders on new brand direction', done: true },
  { title: 'Compile competitor analysis deck', done: true },
  { title: 'Draft campaign messaging hierarchy', done: false },
  { title: 'Review with creative director', done: false },
  { title: 'Final sign-off from CMO', done: false },
];

const ACTIVITY = [
  { type: 'human', actor: 'Courtney Webb', avatar: 'CW', color: '#16161D', action: 'moved this from Backlog to In Progress', time: '2h ago' },
  { type: 'ai', action: 'Detected that two similar tasks exist in Atlas CRM Revamp. Linked as related work.', time: '3h ago' },
  { type: 'human', actor: 'Alex Mora', avatar: 'AM', color: '#EC4899', action: 'added 2 attachments', time: '1d ago' },
  { type: 'ai', action: 'Status updated from "blocked" to "in progress" based on Slack activity in #vega-brand.', time: '1d ago' },
  { type: 'human', actor: 'Rachel Kim', avatar: 'RK', color: '#8B5CF6', action: 'commented on this task', time: '2d ago' },
];

export function TaskDetailPanel({ onClose }: TaskDetailProps) {
  const done = SUBTASKS.filter(t => t.done).length;
  const pct = (done / SUBTASKS.length) * 100;

  return (
    <div
      className="fixed right-0 top-0 h-full flex flex-col bg-surface animate-slide-in-right overflow-y-auto"
      style={{
        width: 560,
        borderLeft: '1px solid #EAEAEF',
        boxShadow: '-16px 0 48px rgba(22,22,29,0.12)',
        zIndex: 50,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: '1px solid #EAEAEF', minHeight: 72 }}>
        <span className="text-text-tertiary" style={{ fontSize: 12 }}>Workspace / Tasks / Vega Brand Refresh</span>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
            <Icon name="grid" size={16} color="#9494A3" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
            <Icon name="close" size={16} color="#9494A3" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Project + title */}
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded" style={{ width: 10, height: 10, background: '#8B5CF6', borderRadius: 3 }} />
          <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>
            Vega Brand Refresh
          </span>
        </div>
        <h2
          className="text-text-primary mb-5"
          style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: '0 0 20px' }}
        >
          Finalize campaign brief for summer launch
        </h2>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5" style={{ fontSize: 13 }}>
          {[
            { label: 'Status', value: <span className="px-2 py-0.5 rounded-lg bg-action-subtle text-action font-medium" style={{ fontSize: 12 }}>In Progress</span> },
            { label: 'Assignee', value: <div className="flex items-center gap-2"><Avatar initials="CW" color="#16161D" size={20} /><span className="text-text-primary">Courtney Webb</span></div> },
            { label: 'Due date', value: <span className="text-text-primary" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>28 Mar 2026</span> },
            { label: 'Priority', value: <span className="px-2 py-0.5 rounded-lg bg-at-risk/10 text-at-risk font-medium" style={{ fontSize: 12, background: '#FDF5E3', color: '#E0A32E' }}>High</span> },
            { label: 'Estimate', value: <span className="text-text-primary" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>6 hours</span> },
            { label: 'Project', value: <span className="text-text-primary">Vega Brand Refresh</span> },
            { label: 'Labels', value: <div className="flex gap-1"><span className="px-2 py-0.5 rounded-full bg-surface-sunk text-text-secondary" style={{ fontSize: 11 }}>Marketing</span><span className="px-2 py-0.5 rounded-full bg-surface-sunk text-text-secondary" style={{ fontSize: 11 }}>Q3</span></div> },
            { label: 'Dependencies', value: <span className="text-ai-strong" style={{ fontSize: 12 }}>2 tasks</span> },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>{label}</span>
              {value}
            </div>
          ))}
        </div>

        {/* Forecast block */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <SparkleIcon size={14} />
            <span className="text-ai-strong font-medium" style={{ fontSize: 13 }}>Forecast</span>
          </div>
          <ConfidenceBar
            p50Label="14 Mar"
            p85Label="19 Mar"
            p95Label="24 Mar"
            targetPosition={0.75}
            p50Position={0.30}
            p85Position={0.62}
            height={10}
            compact={false}
          />
          <p className="text-ai-strong mt-4" style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>
            P85 · 19 Mar · 4 days later than committed
          </p>
        </div>

        {/* Description */}
        <div className="mb-5">
          <h4 className="text-text-secondary mb-2 uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Description</h4>
          {/* AI summary */}
          <div
            className="rounded-xl p-3 mb-3 flex gap-2"
            style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
          >
            <SparkleIcon size={14} />
            <div>
              <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Generated from 12 messages</span>
              <p className="text-text-secondary mt-1" style={{ fontSize: 13, lineHeight: '20px' }}>
                This task covers writing and finalizing the Q3 summer campaign brief. The brief should include messaging hierarchy, target audience definition, channel strategy, and KPI targets. Sign-off required from CMO before handoff to creative.
              </p>
            </div>
          </div>
          <p className="text-text-secondary" style={{ fontSize: 13, lineHeight: '22px' }}>
            The campaign brief needs to be comprehensive enough for both the creative agency and internal design team to execute. Include brand guidelines references, tone of voice examples, and competitive context from the Q2 audit.
          </p>
        </div>

        {/* Subtasks */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-text-secondary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Subtasks</h4>
            <span className="text-text-tertiary" style={{ fontSize: 12 }}>{done}/{SUBTASKS.length}</span>
          </div>
          <div className="w-full h-1 rounded-full mb-3" style={{ background: '#EAEAEF' }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#2F9E6B' }} />
          </div>
          {SUBTASKS.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2" style={{ borderTop: i > 0 ? '1px solid #EAEAEF' : 'none' }}>
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 16, height: 16, border: `1.5px solid ${t.done ? '#2F9E6B' : '#D5D5DE'}`, borderRadius: 4, background: t.done ? '#2F9E6B' : 'transparent' }}
              >
                {t.done && (
                  <Icon name="check" size={10} weight="bold" color="#FFFFFF" />
                )}
              </div>
              <span style={{ fontSize: 13, color: t.done ? '#9494A3' : '#16161D', textDecoration: t.done ? 'line-through' : 'none' }}>
                {t.title}
              </span>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="mb-20">
          <h4 className="text-text-secondary uppercase mb-3" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Activity</h4>
          <div className="flex flex-col gap-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                {a.type === 'human' ? (
                  <Avatar initials={a.avatar!} color={a.color!} size={24} />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 24, height: 24, background: '#EEEFFC', border: '2px solid white' }}
                  >
                    <SparkleIcon size={12} />
                  </div>
                )}
                <div className="flex-1">
                  {a.type === 'human' ? (
                    <span className="text-text-primary" style={{ fontSize: 13 }}>
                      <span className="font-medium">{a.actor}</span> {a.action}
                    </span>
                  ) : (
                    <span className="text-text-secondary italic" style={{ fontSize: 13 }}>{a.action}</span>
                  )}
                  <div className="text-text-tertiary mt-0.5" style={{ fontSize: 11 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment composer */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderTop: '1px solid #EAEAEF', background: '#FFFFFF', position: 'sticky', bottom: 0 }}
      >
        <Avatar initials="CW" color="#16161D" size={32} />
        <div
          className="flex-1 flex items-center px-3 rounded-lg"
          style={{ height: 40, border: '1px solid #D5D5DE', background: '#FFFFFF', fontSize: 13, color: '#9494A3' }}
        >
          Add a comment...
        </div>
        <button
          className="flex items-center justify-center rounded-lg transition-colors cursor-pointer"
          style={{ width: 36, height: 36, background: '#16161D', border: 'none' }}
        >
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskDetailPanel;
