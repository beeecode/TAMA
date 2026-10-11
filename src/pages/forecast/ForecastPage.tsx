import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '@/data/projects';
import { LearningState } from '@/components/forecast/LearningState';
import { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, ReferenceLine,
} from 'recharts';
import { StatusPill } from "@/components/basics/Badge";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { ConfidenceBar } from "@/components/forecast/ConfidenceBar";
import { SectionCard } from "@/components/layout/SectionBlock";

// Histogram data for distribution
const HISTOGRAM_DATA = Array.from({ length: 38 }, (_, i) => {
  const center = 18;
  const spread = 8;
  const x = i - center;
  const y = Math.round(400 * Math.exp(-(x * x) / (2 * spread * spread)) * (1 + (i > center ? 0.3 : -0.1)));
  return {
    date: `Mar ${5 + Math.floor(i * 0.7)}`,
    count: Math.max(0, y + Math.round((Math.random() - 0.5) * 60)),
    zone: i < 13 ? 'p50' : i < 24 ? 'p85' : 'p95',
  };
});

// P85 history
const HISTORY_DATA = [
  { week: 'Jan 13', p85: 'Mar 15', days: -13 },
  { week: 'Jan 20', p85: 'Mar 17', days: -11 },
  { week: 'Jan 27', p85: 'Mar 18', days: -10 },
  { week: 'Feb 3', p85: 'Mar 20', days: -8 },
  { week: 'Feb 10', p85: 'Mar 23', days: -5 },
  { week: 'Feb 17', p85: 'Mar 27', days: -1 },
  { week: 'Feb 24', p85: 'Mar 30', days: 2 },
  { week: 'Mar 3', p85: 'Apr 2', days: 5 },
].map(d => ({ ...d, committed: 0 }));

const FACTORS = [
  { label: 'Cycle time rising', value: '+4d', dir: 'up', icon: '↑' },
  { label: 'Two blocked approvals', value: '+3d', dir: 'up', icon: '↑' },
  { label: 'Scope added last cycle', value: '+6d', dir: 'up', icon: '↑' },
  { label: 'Team capacity down', value: '+2d', dir: 'up', icon: '↑' },
  { label: 'Velocity stable', value: '−1d', dir: 'down', icon: '↓' },
];

const PROPOSALS_MINI = [
  { title: 'Move two approvals to Sam', effect: 'recovers 3 days', actionLabel: 'Apply' },
  { title: 'Cut the microsite from scope', effect: 'recovers 6 days', actionLabel: 'Apply' },
  { title: 'Extend commitment to 4 April', effect: 'reaches P85', actionLabel: 'Apply' },
];

function DistributionBar({ datum }: { datum: typeof HISTOGRAM_DATA[0] }) {
  const colors = { p50: '#8B8FE8', p85: '#B9BCF0', p95: '#DCDDF8' };
  return (
    <div
      style={{
        flex: 1,
        background: colors[datum.zone as keyof typeof colors],
        height: `${Math.max(4, datum.count / 4)}px`,
        alignSelf: 'flex-end',
        borderRadius: '2px 2px 0 0',
        minHeight: 2,
      }}
    />
  );
}

export function ForecastPage() {
  const { projectId } = useParams<{ projectId?: string }>();
  const project = getProject(projectId);

  // A project under the signal threshold opens in its learning state; the
  // toggle is an override on top of that, reset whenever the project changes.
  const [override, setOverride] = useState<boolean | null>(null);
  useEffect(() => setOverride(null), [projectId]);
  const isLearning = override ?? project.maturity === "learning";
  const setIsLearning = (next: boolean) => setOverride(next);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace / Forecast</div>
          <div className="flex items-center gap-3">
            <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>
              {project.name}
            </h1>
            {/* A project still learning has no delivery verdict to give yet. */}
            <StatusPill status={isLearning ? "pending" : "at-risk"} />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => setIsLearning(!isLearning)}
            className="px-3 py-1.5 rounded-lg text-text-secondary transition-colors cursor-pointer"
            style={{ fontSize: 12, border: '1px solid #D5D5DE', background: '#FFFFFF' }}
          >
            {isLearning ? 'Switch to full data' : 'Preview learning state'}
          </button>
          <Button variant="secondary" size="sm">
            <Icon name="grid" size={14} />
            {project.name}
          </Button>
          <Button variant="secondary" size="sm">14 Mar – 12 Apr</Button>
          <Button variant="secondary" size="sm">Share forecast</Button>
        </div>
      </div>

      {/* Hero band */}
      <div
        className="rounded-2xl p-8"
        style={{
          background: isLearning ? '#EEEFFC' : '#FFFFFF',
          border: '1px solid #EAEAEF',
          boxShadow: '0 1px 2px rgba(22,22,29,0.04)',
        }}
      >
        {isLearning ? (
          <LearningState signals={project.signals} />
        ) : (
          /* Full data state */
          <div className="flex gap-12 items-start">
            <div style={{ minWidth: 240 }}>
              <div className="text-text-tertiary uppercase mb-4" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>
                Probability of hitting your committed date
              </div>
              <div style={{ fontSize: 72, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#E0A32E', lineHeight: 1, marginBottom: 8 }}>
                68%
              </div>
              <div className="text-text-secondary" style={{ fontSize: 13 }}>
                Committed 28 March · P85 lands 2 April
              </div>
            </div>
            <div className="flex-1">
              <ConfidenceBar
                p50Label="14 Mar"
                p85Label="2 Apr"
                p95Label="12 Apr"
                targetLabel="28 Mar"
                targetPosition={0.72}
                p50Position={0.32}
                p85Position={0.68}
                height={14}
              />
              <div className="flex items-center gap-6 mt-6" style={{ fontSize: 12 }}>
                <div className="flex items-center gap-2"><div className="rounded-full w-3 h-3" style={{ background: '#8B8FE8' }} /><span className="text-text-tertiary">P50 — optimistic</span></div>
                <div className="flex items-center gap-2"><div className="rounded-full w-3 h-3" style={{ background: '#B9BCF0' }} /><span className="text-text-tertiary">P85 — realistic</span></div>
                <div className="flex items-center gap-2"><div className="rounded-full w-3 h-3" style={{ background: '#DCDDF8' }} /><span className="text-text-tertiary">P95 — conservative</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-0.5" style={{ background: '#16161D' }} /><span className="text-text-tertiary">Committed date</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Distribution chart */}
      <SectionCard style={{ padding: 20 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Completion distribution</h3>
            <span className="text-text-tertiary" style={{ fontSize: 12 }}>(10,000 simulations)</span>
          </div>
          <div className="flex items-center gap-4">
            {[{ label: 'Before P50', color: '#8B8FE8' }, { label: 'P50–P85', color: '#B9BCF0' }, { label: 'P85–P95', color: '#DCDDF8' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
                <span className="text-text-tertiary" style={{ fontSize: 11 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-0.5" style={{ height: 160, position: 'relative' }}>
          {HISTOGRAM_DATA.map((d, i) => (
            <DistributionBar key={i} datum={d} />
          ))}
          {/* P50 marker */}
          <div className="absolute top-0 h-full" style={{ left: `${(13 / 38) * 100}%`, borderLeft: '1.5px dashed #8B8FE8' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#5F63C9', fontWeight: 500, position: 'absolute', top: 2, left: 4 }}>P50</span>
          </div>
          {/* P85 marker */}
          <div className="absolute top-0 h-full" style={{ left: `${(24 / 38) * 100}%`, borderLeft: '1.5px dashed #B9BCF0' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#5F63C9', fontWeight: 500, position: 'absolute', top: 2, left: 4 }}>P85</span>
          </div>
          {/* P95 marker */}
          <div className="absolute top-0 h-full" style={{ left: `${(34 / 38) * 100}%`, borderLeft: '1.5px dashed #DCDDF8' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#9494A3', fontWeight: 500, position: 'absolute', top: 2, left: 4 }}>P95</span>
          </div>
          {/* Committed date */}
          <div className="absolute top-0 h-full" style={{ left: '72%', borderLeft: '2px solid #16161D' }}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#16161D', fontWeight: 500, position: 'absolute', top: 2, left: 4 }}>28 Mar</span>
          </div>
        </div>
      </SectionCard>

      {/* Three-column detail */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {/* Factors */}
        <SectionCard style={{ padding: 20 }}>
          <h3 className="mb-4" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 16px' }}>
            What's driving the forecast
          </h3>
          <div className="flex flex-col gap-3">
            {FACTORS.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ width: 28, height: 28, background: f.dir === 'up' ? '#FBECEC' : '#E8F7F1' }}
                >
                  <Icon name="arrowUp" size={14} />
                </div>
                <span className="flex-1 text-text-primary" style={{ fontSize: 13 }}>{f.label}</span>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    color: f.dir === 'up' ? '#D64545' : '#2F9E6B',
                  }}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* History */}
        <SectionCard style={{ padding: 20 }}>
          <h3 className="mb-4" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 16px' }}>
            P85 date history
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={HISTORY_DATA}>
              <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fontSize: 9, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} domain={[-15, 10]} />
              <ReferenceLine y={0} stroke="#16161D" strokeWidth={1.5} strokeDasharray="4 4" label={{ value: 'Committed', position: 'right', fill: '#16161D', fontSize: 9 }} />
              <Line type="monotone" dataKey="days" stroke="#5F63C9" strokeWidth={2} dot={{ r: 3, fill: '#5F63C9', stroke: '#FFFFFF', strokeWidth: 1.5 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-text-tertiary mt-2" style={{ fontSize: 11 }}>
            P85 date has slipped 5 days over 8 weeks.
          </p>
        </SectionCard>

        {/* What would fix it */}
        <SectionCard style={{ padding: 20 }}>
          <div className="flex items-center gap-2 mb-4">
            <SparkleIcon size={14} />
            <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>
              What would fix it
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {PROPOSALS_MINI.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{ background: '#EEEFFC', border: '1px solid #DCDDF8' }}
              >
                <div className="text-text-primary font-medium mb-1" style={{ fontSize: 12 }}>{p.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-on-track" style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                    {p.effect}
                  </span>
                  <button
                    className="px-2 py-1 rounded text-ai-strong cursor-pointer"
                    style={{ fontSize: 11, background: 'none', border: '1px solid #B9BCF0' }}
                  >
                    {p.actionLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default ForecastPage;
