import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ProposalCard } from "@/components/cards/ProposalCard";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";
import { ConfidenceChip } from "@/components/forecast/ConfidenceChip";
import { SectionCard } from "@/components/layout/SectionBlock";


const TASKS = [
  { id: 1, title: 'Finalize campaign brief', project: 'Vega Brand Refresh', projectColor: '#8B5CF6', chip: 'P85 · 22 Mar', assignee: 'CW', assigneeColor: '#16161D' },
  { id: 2, title: 'Review API gateway auth spec', project: 'Orion API Gateway', projectColor: '#3B82F6', chip: 'P85 · 18 Mar', assignee: 'TK', assigneeColor: '#22C55E' },
  { id: 3, title: 'Update CRM migration runbook', project: 'Atlas CRM Revamp', projectColor: '#22C55E', chip: 'P50 · 15 Mar', assignee: 'SP', assigneeColor: '#0D9488' },
  { id: 4, title: 'Stakeholder sign-off on designs', project: 'Nimbus Dashboard', projectColor: '#0D9488', chip: 'P85 · 25 Mar', assignee: 'AM', assigneeColor: '#EC4899' },
  { id: 5, title: 'Write release notes for v2.4', project: 'Helio Task System', projectColor: '#EC4899', chip: 'P95 · 20 Mar', assignee: 'CW', assigneeColor: '#16161D' },
  { id: 6, title: 'Conduct user interviews — round 2', project: 'Atlas CRM Revamp', projectColor: '#22C55E', chip: 'P85 · 24 Mar', assignee: 'RK', assigneeColor: '#8B5CF6' },
];

const INBOX_PROPOSALS = [
  { title: 'Draft Q3 campaign kickoff task', rationale: '8 Slack messages reference campaign planning this week', source: 'FROM SLACK' },
  { title: 'Schedule API security review', rationale: 'Auth spec meeting ran 45 min over — follow-up likely needed', source: 'FROM CALENDAR' },
  { title: 'Create CRM data migration checklist', rationale: '14 messages and 3 docs reference migration readiness', source: 'FROM SLACK' },
];

const TEAM_LOAD = [
  { name: 'Courtney Webb', initials: 'CW', color: '#16161D', pct: 87, status: 'on-track' },
  { name: 'Tom Keller', initials: 'TK', color: '#22C55E', pct: 124, status: 'slipping' },
  { name: 'Sara Park', initials: 'SP', color: '#0D9488', pct: 72, status: 'on-track' },
  { name: 'Alex Mora', initials: 'AM', color: '#EC4899', pct: 95, status: 'at-risk' },
  { name: 'Rachel Kim', initials: 'RK', color: '#8B5CF6', pct: 68, status: 'on-track' },
];

const PROJECTS_FORECAST = [
  { name: 'Atlas CRM Revamp', color: '#22C55E', p50: '20 Mar', p85: '28 Mar', p95: '5 Apr', targetPos: 0.62, p50Pos: 0.38, p85Pos: 0.68 },
  { name: 'Nimbus Dashboard', color: '#0D9488', p50: '14 Mar', p85: '22 Mar', p95: '30 Mar', targetPos: 0.55, p50Pos: 0.33, p85Pos: 0.64 },
  { name: 'Vega Brand Refresh', color: '#8B5CF6', p50: '14 Mar', p85: '2 Apr', p95: '12 Apr', targetPos: 0.72, p50Pos: 0.30, p85Pos: 0.68 },
];

/** Reads the actual clock, so the greeting is true rather than decorative. */
function greeting(now = new Date()): string {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function todayLabel(now = new Date()): string {
  return now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export function HomePage() {
  const loadColor = (status: string) => {
    if (status === 'slipping') return '#D64545';
    if (status === 'at-risk') return '#E0A32E';
    return '#2F9E6B';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* The one place the product greets you by name. */}
      <div className="rise">
        <div className="text-text-tertiary mb-1.5" style={{ fontSize: 12.5 }}>
          {todayLabel()}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-tight)',
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: '-0.015em',
            margin: 0,
            color: '#16161D',
          }}
        >
          {greeting()}, Courtney
        </h1>
        <p className="text-text-secondary mt-1.5" style={{ fontSize: 15 }}>
          One commitment needs a decision today. Everything else is holding.
        </p>
      </div>

      {/* Attention strip */}
      <SectionCard style={{ borderLeft: '3px solid #E0A32E', padding: 20 }}>
        <div className="flex items-center gap-3">
          <Icon name="alert" size={20} color="#E0A32E" />
          <div className="flex-1">
            <div className="text-text-primary font-semibold" style={{ fontSize: 14, fontFamily: 'var(--font-tight)' }}>
              Vega Brand Refresh is drifting
            </div>
            <div className="text-text-secondary" style={{ fontSize: 13 }}>
              Your committed date now sits at P92. Two weeks ago it was P60.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">See forecast</Button>
            <button className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
              <Icon name="close" size={16} color="#9494A3" />
            </button>
          </div>
        </div>
      </SectionCard>

      {/* My work + Inbox */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* My work */}
        <SectionCard>
          <div className="flex items-center justify-between px-5 pt-5 mb-4">
            <h2 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>My work today</h2>
            <div className="flex gap-4">
              {['Today', 'Tomorrow', 'Upcoming'].map((t, i) => (
                <span
                  key={t}
                  className="cursor-pointer"
                  style={{
                    fontSize: 13,
                    color: i === 0 ? '#16161D' : '#62626F',
                    fontWeight: i === 0 ? 500 : 400,
                    paddingBottom: 2,
                    borderBottom: i === 0 ? '2px solid #16161D' : '2px solid transparent',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            {TASKS.map((task, i) => (
              <div
                key={task.id}
                className="flex items-center gap-3 px-5 hover:bg-surface-hover transition-colors cursor-pointer"
                style={{ height: 52, borderTop: i > 0 ? '1px solid #EAEAEF' : 'none' }}
              >
                <div className="w-4.5 h-4.5 rounded flex items-center justify-center flex-shrink-0" style={{ width: 18, height: 18, border: '1.5px solid #D5D5DE', borderRadius: 5 }} />
                <span className="flex-1 text-text-primary truncate" style={{ fontSize: 13 }}>{task.title}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="rounded" style={{ width: 8, height: 8, background: task.projectColor, borderRadius: 2 }} />
                  <span className="text-text-tertiary" style={{ fontSize: 12 }}>{task.project}</span>
                </div>
                <ConfidenceChip label={task.chip} />
                <Avatar initials={task.assignee} color={task.assigneeColor} size={24} />
              </div>
            ))}
          </div>
          <div className="px-5 py-3" style={{ borderTop: '1px solid #EAEAEF' }}>
            <button className="text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer" style={{ fontSize: 13, background: 'none', border: 'none', padding: 0 }}>
              3 more tasks ↓
            </button>
          </div>
        </SectionCard>

        {/* Inbox */}
        <SectionCard>
          <div
            className="flex items-center justify-between px-5 py-4 rounded-t-xl"
            style={{ background: '#EEEFFC', borderBottom: '1px solid #DCDDF8' }}
          >
            <div className="flex items-center gap-2">
              <SparkleIcon size={16} />
              <h2 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0, color: '#5F63C9' }}>Inbox</h2>
            </div>
            <span
              className="rounded-full text-white flex items-center justify-center"
              style={{ background: '#8B8FE8', fontSize: 11, fontWeight: 600, minWidth: 20, height: 20, padding: '0 6px', fontFamily: 'var(--font-mono)' }}
            >
              11
            </span>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {INBOX_PROPOSALS.map((p, i) => (
              <ProposalCard key={i} {...p} compact />
            ))}
          </div>
          <div className="px-5 py-3" style={{ borderTop: '1px solid #EAEAEF' }}>
            <button className="text-ai-strong hover:text-ai-strong/80 transition-colors cursor-pointer" style={{ fontSize: 13, background: 'none', border: 'none', padding: 0 }}>
              View all 11 proposals →
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Forecast + Team load */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Forecast */}
        <SectionCard style={{ padding: 20 }}>
          <h2 className="mb-5" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 20px' }}>
            This week's forecast
          </h2>
          <div className="flex flex-col gap-5">
            {PROJECTS_FORECAST.map(p => (
              <div key={p.name}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded" style={{ width: 10, height: 10, background: p.color, borderRadius: 3 }} />
                  <span className="text-text-primary font-medium" style={{ fontSize: 13 }}>{p.name}</span>
                </div>
                <ConfidenceBar
                  p50Label={p.p50}
                  p85Label={p.p85}
                  p95Label={p.p95}
                  targetPosition={p.targetPos}
                  p50Position={p.p50Pos}
                  p85Position={p.p85Pos}
                  height={8}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Team load */}
        <SectionCard style={{ padding: 20 }}>
          <h2 className="mb-5" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 20px' }}>
            Team load
          </h2>
          <div className="flex flex-col gap-4">
            {TEAM_LOAD.map(member => (
              <div key={member.name} className="flex items-center gap-3">
                <Avatar initials={member.initials} color={member.color} size={28} />
                <span className="text-text-primary w-32 truncate" style={{ fontSize: 13 }}>{member.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAEAEF' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(member.pct, 100)}%`,
                      background: loadColor(member.status),
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    color: loadColor(member.status),
                    width: 40,
                    textAlign: 'right',
                  }}
                >
                  {member.pct}%
                </span>
                {member.status === 'slipping' && (
                  <Icon name="alert" size={14} color="#D64545" />
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default HomePage;
