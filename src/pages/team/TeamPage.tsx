import { Icon } from "@/components/basics/Icon";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { ProposalCard } from "@/components/cards/ProposalCard";
import { KPICard } from "@/components/cards/StatCard";
import { SectionCard } from "@/components/layout/SectionBlock";


const MEMBERS = [
  { name: 'Courtney Webb', role: 'Operations Lead', initials: 'CW', color: '#16161D', projects: ['#8B5CF6', '#22C55E'], alloc: 87, tasks: 12, cycle: '2.4d', trend: [82, 85, 87, 84, 87], status: 'ok' },
  { name: 'Tom Keller', role: 'Engineering Lead', initials: 'TK', color: '#22C55E', projects: ['#3B82F6', '#EC4899'], alloc: 124, tasks: 18, cycle: '3.1d', trend: [100, 108, 112, 119, 124], status: 'over' },
  { name: 'Sara Park', role: 'Product Designer', initials: 'SP', color: '#0D9488', projects: ['#22C55E', '#0D9488'], alloc: 72, tasks: 8, cycle: '1.8d', trend: [75, 70, 68, 72, 72], status: 'ok' },
  { name: 'Alex Mora', role: 'Product Manager', initials: 'AM', color: '#EC4899', projects: ['#0D9488', '#8B5CF6'], alloc: 95, tasks: 14, cycle: '2.9d', trend: [88, 90, 93, 94, 95], status: 'risk' },
  { name: 'Rachel Kim', role: 'Operations Analyst', initials: 'RK', color: '#8B5CF6', projects: ['#22C55E', '#3B82F6'], alloc: 68, tasks: 9, cycle: '2.2d', trend: [72, 70, 68, 67, 68], status: 'ok' },
  { name: 'James Liu', role: 'Marketing Manager', initials: 'JL', color: '#3B82F6', projects: ['#8B5CF6'], alloc: 88, tasks: 11, cycle: '2.6d', trend: [80, 84, 86, 87, 88], status: 'ok' },
  { name: 'Nina Torres', role: 'Content Strategist', initials: 'NT', color: '#0D9488', projects: ['#8B5CF6', '#0D9488'], alloc: 79, tasks: 7, cycle: '1.9d', trend: [76, 77, 78, 79, 79], status: 'ok' },
  { name: 'David Park', role: 'Backend Engineer', initials: 'DP', color: '#22C55E', projects: ['#3B82F6'], alloc: 105, tasks: 15, cycle: '3.5d', trend: [95, 98, 101, 103, 105], status: 'over' },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const REBALANCE = [
  { title: 'Move "API security review" from Tom to Rachel', effect: 'Tom: 124% → 108% · Rachel: 68% → 79%', source: 'FROM TAMA' },
  { title: 'Reassign microsite build from Tom to David', effect: 'Tom: 124% → 101% · David: 105% → 122%', source: 'FROM TAMA' },
  { title: 'Defer Q4 OKR framework to next sprint', effect: 'Tom: 124% → 96% · Frees 4 days', source: 'FROM TAMA' },
];

export function TeamPage() {
  const allocColor = (status: string) => status === 'over' ? '#D64545' : status === 'risk' ? '#E0A32E' : '#2F9E6B';
  const statusBorder = (status: string) => status === 'over' ? '3px solid #D64545' : 'none';

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
          <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Team</h1>
        
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            Who is carrying what this week, and who has room.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="secondary" size="sm">
            <Icon name="filter" size={14} />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Icon name="plus" size={14} />
            Invite
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="flex gap-5 mb-6">
        <KPICard label="Total Capacity" value="24" description="Active team members" footerText="Across 5 projects" footerColor="#62626F" />
        <KPICard label="Allocated" value="87%" description="Average allocation" footerText="+4% from last week" footerColor="#E0A32E" />
        <KPICard label="Available" value="6" description="Members under 80%" footerText="−2 from last week" footerColor="#D64545" />
        <KPICard label="Over-allocated" value="2" description="Members above 100%" footerText="+1 from last week" footerColor="#D64545" />
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <SectionCard className="flex-1 overflow-hidden">
          {/* Header */}
          <div
            className="grid px-5 py-3"
            style={{
              gridTemplateColumns: '2fr 1fr 1.5fr 80px 100px 60px',
              background: '#F7F7F9',
              borderBottom: '1px solid #EAEAEF',
            }}
          >
            {['Member', 'Projects', 'Allocation', 'Tasks', 'Avg cycle', 'Trend'].map(h => (
              <span key={h} className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>

          {MEMBERS.map((m, i) => (
            <div
              key={m.name}
              className="grid px-5 hover:bg-surface-hover transition-colors items-center"
              style={{
                gridTemplateColumns: '2fr 1fr 1.5fr 80px 100px 60px',
                height: 64,
                borderTop: i > 0 ? '1px solid #EAEAEF' : 'none',
                borderLeft: statusBorder(m.status),
              }}
            >
              {/* Member */}
              <div className="flex items-center gap-3">
                <Avatar initials={m.initials} color={m.color} size={32} />
                <div>
                  <div className="text-text-primary font-semibold" style={{ fontSize: 13 }}>{m.name}</div>
                  <div className="text-text-tertiary" style={{ fontSize: 11 }}>{m.role}</div>
                </div>
              </div>

              {/* Projects */}
              <div className="flex -space-x-1">
                {m.projects.map((c, j) => (
                  <div key={j} className="rounded" style={{ width: 14, height: 14, background: c, borderRadius: 3, border: '1.5px solid white' }} />
                ))}
              </div>

              {/* Allocation */}
              <div className="flex items-center gap-3 pr-4">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAEAEF' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(m.alloc, 100)}%`,
                      background: allocColor(m.status),
                    }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 500, color: allocColor(m.status), width: 36, textAlign: 'right' }}>
                    {m.alloc}%
                  </span>
                  {m.status === 'over' && (
                    <Icon name="alert" size={12} color="#D64545" />
                  )}
                </div>
              </div>

              {/* Tasks */}
              <span className="text-text-primary" style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{m.tasks}</span>

              {/* Avg cycle */}
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#62626F' }}>{m.cycle}</span>

              {/* Trend */}
              <MiniSparkline data={m.trend} color={allocColor(m.status)} />
            </div>
          ))}
        </SectionCard>

        {/* Right rail */}
        <div style={{ width: 320, flexShrink: 0 }}>
          <div
            className="rounded-xl p-4"
            style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name="sparkle" size={16} />
              <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0, color: '#5F63C9' }}>
                Rebalance suggestions
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {REBALANCE.map((p, i) => (
                <ProposalCard key={i} title={p.title} rationale={p.effect} source={p.source} compact />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
