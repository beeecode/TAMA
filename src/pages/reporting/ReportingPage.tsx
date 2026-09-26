import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Button } from "@/components/basics/Button";
import { KPICard } from "@/components/cards/StatCard";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";
import { SectionCard } from "@/components/layout/SectionBlock";

const ACCURACY_DATA = [
  { week: 'Jan W1', predicted: 18, actual: 15 },
  { week: 'Jan W2', predicted: 22, actual: 20 },
  { week: 'Jan W3', predicted: 25, actual: 28 },
  { week: 'Jan W4', predicted: 30, actual: 27 },
  { week: 'Feb W1', predicted: 28, actual: 32 },
  { week: 'Feb W2', predicted: 35, actual: 33 },
  { week: 'Feb W3', predicted: 40, actual: 38 },
  { week: 'Feb W4', predicted: 38, actual: 42 },
  { week: 'Mar W1', predicted: 45, actual: 44 },
  { week: 'Mar W2', predicted: 50, actual: 48 },
];

const THROUGHPUT_DATA = [
  { team: 'Design', 'Q1': 42, 'Q2': 58, 'Q3': 51 },
  { team: 'Eng', 'Q1': 88, 'Q2': 104, 'Q3': 96 },
  { team: 'Ops', 'Q1': 31, 'Q2': 44, 'Q3': 39 },
  { team: 'Marketing', 'Q1': 28, 'Q2': 35, 'Q3': 33 },
  { team: 'Product', 'Q1': 55, 'Q2': 68, 'Q3': 62 },
];

const BLOCKED_DATA = [
  { week: 'Jan', hours: 42 },
  { week: 'Feb', hours: 38 },
  { week: 'Mar W1', hours: 55 },
  { week: 'Mar W2', hours: 61 },
  { week: 'Mar W3', hours: 48 },
  { week: 'Mar W4', hours: 52 },
];

const PORTFOLIO_PROJECTS = [
  { name: 'Atlas CRM Revamp', color: '#22C55E', p50: '20 Mar', p85: '28 Mar', p95: '5 Apr', targetPos: 0.62, p50Pos: 0.38, p85Pos: 0.68, status: 'on-track' },
  { name: 'Nimbus Dashboard', color: '#0D9488', p50: '14 Mar', p85: '22 Mar', p95: '30 Mar', targetPos: 0.55, p50Pos: 0.33, p85Pos: 0.64, status: 'on-track' },
  { name: 'Orion API Gateway', color: '#3B82F6', p50: '1 Apr', p85: '12 Apr', p95: '22 Apr', targetPos: 0.48, p50Pos: 0.42, p85Pos: 0.72, status: 'on-track' },
  { name: 'Helio Task System', color: '#EC4899', p50: '18 Mar', p85: '28 Mar', p95: '8 Apr', targetPos: 0.68, p50Pos: 0.35, p85Pos: 0.66, status: 'at-risk' },
  { name: 'Vega Brand Refresh', color: '#8B5CF6', p50: '14 Mar', p85: '2 Apr', p95: '12 Apr', targetPos: 0.72, p50Pos: 0.30, p85Pos: 0.68, status: 'at-risk' },
];

export function ReportingPage() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
          <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Reporting</h1>
        
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            How often TAMA was right, and where delivery time actually goes.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="secondary" size="sm">Jan – Mar 2026</Button>
          <Button variant="secondary" size="sm">Export</Button>
          <Button variant="primary" size="sm">New report</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="flex gap-5 mb-6">
        <KPICard label="Throughput" value="234" description="Tasks completed this quarter" footerText="+18% vs last quarter" footerColor="#2F9E6B" />
        <KPICard label="Avg Cycle Time" value="2.4d" description="Per task, all projects" footerText="−0.3d vs last quarter" footerColor="#2F9E6B" />
        <KPICard label="Forecast Accuracy" value="84%" description="Predicted vs actual within P85" footerText="+7% vs last quarter" footerColor="#2F9E6B" />
        <KPICard label="On-time Rate" value="71%" description="Committed dates met" footerText="−4% vs last quarter" footerColor="#D64545" />
      </div>

      {/* Charts grid */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Forecast accuracy */}
        <SectionCard style={{ padding: 20 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Forecast accuracy over time</h3>
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>Predicted vs actual completion</span>
            </div>
            <div className="flex items-center gap-4">
              {[{ label: 'Predicted', color: '#5F63C9' }, { label: 'Actual', color: '#16161D' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
                  <span className="text-text-tertiary" style={{ fontSize: 11 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={ACCURACY_DATA}>
              <defs>
                <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EEEFFC" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#EEEFFC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#16161D', border: 'none', borderRadius: 8, fontSize: 11, color: '#B9BCF0' }} />
              <Line type="monotone" dataKey="predicted" stroke="#5F63C9" strokeWidth={2} dot={{ r: 3, fill: '#5F63C9', stroke: 'white', strokeWidth: 1.5 }} />
              <Line type="monotone" dataKey="actual" stroke="#16161D" strokeWidth={2} dot={{ r: 3, fill: '#16161D', stroke: 'white', strokeWidth: 1.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Throughput by team */}
        <SectionCard style={{ padding: 20 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Throughput by team</h3>
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>Tasks completed per quarter</span>
            </div>
            <div className="flex items-center gap-4">
              {[{ label: 'Q1', color: '#DCDDF8' }, { label: 'Q2', color: '#8B8FE8' }, { label: 'Q3', color: '#5F63C9' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
                  <span className="text-text-tertiary" style={{ fontSize: 11 }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={THROUGHPUT_DATA} barSize={14} barGap={4}>
              <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
              <XAxis dataKey="team" tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#16161D', border: 'none', borderRadius: 8, fontSize: 11, color: '#B9BCF0' }} />
              <Bar dataKey="Q1" fill="#DCDDF8" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Q2" fill="#8B8FE8" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Q3" fill="#5F63C9" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Where time goes */}
        <SectionCard style={{ padding: 20 }}>
          <h3 className="mb-4" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 16px' }}>
            Where time goes
          </h3>
          <div
            className="flex w-full rounded-full overflow-hidden mb-4"
            style={{ height: 16 }}
          >
            {[
              { label: 'Active work', pct: 38, color: '#5F63C9' },
              { label: 'Reviews', pct: 18, color: '#8B8FE8' },
              { label: 'Meetings', pct: 22, color: '#B9BCF0' },
              { label: 'Blocked', pct: 11, color: '#E0A32E' },
              { label: 'Admin', pct: 7, color: '#DCDDF8' },
              { label: 'Other', pct: 4, color: '#EAEAEF' },
            ].map(seg => (
              <div key={seg.label} style={{ width: `${seg.pct}%`, background: seg.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: 'Active work', pct: '38%', color: '#5F63C9' },
              { label: 'Reviews', pct: '18%', color: '#8B8FE8' },
              { label: 'Meetings', pct: '22%', color: '#B9BCF0' },
              { label: 'Blocked', pct: '11%', color: '#E0A32E' },
              { label: 'Admin', pct: '7%', color: '#DCDDF8' },
              { label: 'Other', pct: '4%', color: '#EAEAEF' },
            ].map(seg => (
              <div key={seg.label} className="flex items-center gap-1.5">
                <div className="rounded-full" style={{ width: 8, height: 8, background: seg.color }} />
                <span className="text-text-tertiary" style={{ fontSize: 11 }}>{seg.label}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#62626F', fontWeight: 500 }}>{seg.pct}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Blocked time */}
        <SectionCard style={{ padding: 20 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Blocked time</h3>
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>Hours lost to blockers per week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={BLOCKED_DATA}>
              <defs>
                <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E0A32E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E0A32E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#9494A3' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#16161D', border: 'none', borderRadius: 8, fontSize: 11, color: '#B9BCF0' }} />
              <Area type="monotone" dataKey="hours" stroke="#E0A32E" strokeWidth={2} fill="url(#blockedGrad)" dot={{ r: 3, fill: '#E0A32E', stroke: 'white', strokeWidth: 1.5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Portfolio confidence — full width */}
      <SectionCard style={{ padding: 20, marginTop: 20 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Portfolio confidence</h3>
            <span className="text-text-tertiary" style={{ fontSize: 12 }}>Every commitment, every probability, one glance</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {PORTFOLIO_PROJECTS.map(p => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="flex items-center gap-2" style={{ width: 200, flexShrink: 0 }}>
                <div className="rounded" style={{ width: 10, height: 10, background: p.color, borderRadius: 3 }} />
                <span className="text-text-primary font-medium" style={{ fontSize: 13 }}>{p.name}</span>
              </div>
              <div className="flex-1">
                <ConfidenceBar
                  p50Label={p.p50}
                  p85Label={p.p85}
                  p95Label={p.p95}
                  targetPosition={p.targetPos}
                  p50Position={p.p50Pos}
                  p85Position={p.p85Pos}
                  height={10}
                />
              </div>
              <div style={{ width: 70, flexShrink: 0 }}>
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{
                    fontSize: 11,
                    background: p.status === 'at-risk' ? '#FDF5E3' : '#E8F7F1',
                    color: p.status === 'at-risk' ? '#E0A32E' : '#2F9E6B',
                  }}
                >
                  {p.status === 'at-risk' ? 'At risk' : 'On track'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export default ReportingPage;
