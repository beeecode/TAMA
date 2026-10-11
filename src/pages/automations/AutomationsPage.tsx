import { useState } from 'react';
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { SectionCard } from "@/components/layout/SectionBlock";

const RULES = [
  {
    when: 'Task status changes to "Blocked"',
    then: 'Notify assignee and team lead · Create follow-up task',
    runs: 142,
    enabled: true,
  },
  {
    when: 'New Slack message in #campaign with "brief" or "deadline"',
    then: 'Draft task in Vega Brand Refresh · Route to Courtney for approval',
    runs: 38,
    enabled: true,
  },
  {
    when: 'Calendar event created with 3+ attendees',
    then: 'Generate meeting prep checklist · Add to Inbox for review',
    runs: 91,
    enabled: false,
  },
  {
    when: 'Task due date passes without completion',
    then: 'Update forecast · Flag in weekly digest · Notify PM',
    runs: 27,
    enabled: true,
  },
];

const AGENTS = [
  {
    name: 'Triage',
    desc: 'Monitors incoming signals from Slack, email, and calendar. Drafts tasks for your Inbox. Runs continuously.',
    status: 'Active',
    lastActed: 'Drafted 3 tasks from this morning\'s all-hands · 2h ago',
    trend: [2, 4, 3, 5, 3, 6, 4, 5],
  },
  {
    name: 'Forecast Watch',
    desc: 'Monitors committed dates and alerts you when confidence drops below thresholds you configure.',
    status: 'Active',
    lastActed: 'Flagged Vega Brand Refresh drift · 4h ago',
    trend: [1, 1, 2, 1, 3, 2, 1, 2],
  },
  {
    name: 'Unblock',
    desc: 'Detects blocked tasks and proposes reassignments, scope changes, or dependency resolutions.',
    status: 'Paused',
    lastActed: 'Proposed 2 reassignments last Monday · 5d ago',
    trend: [3, 2, 1, 0, 0, 0, 0, 0],
  },
];

const HISTORY = [
  { time: '09:42 · Mar 14', name: 'Triage', result: 'success', item: 'Created "Campaign brief draft" in Vega Brand Refresh' },
  { time: '08:31 · Mar 14', name: 'Forecast Watch', result: 'alert', item: 'Flagged Vega Brand Refresh — confidence dropped 8pts' },
  { time: '11:15 · Mar 13', name: 'Triage', result: 'success', item: 'Created "API security review" in Orion API Gateway' },
  { time: '09:00 · Mar 13', name: 'Unblock', result: 'proposed', item: 'Proposed reassignment: API rate limiting from Tom to Sara' },
  { time: '16:44 · Mar 12', name: 'Triage', result: 'success', item: 'Drafted "Q3 OKR framework kickoff" from calendar event' },
  { time: '14:20 · Mar 12', name: 'Forecast Watch', result: 'success', item: 'Vega Brand Refresh back within target range (no action needed)' },
];

function MiniAgentSparkline({ data, active }: { data: number[]; active: boolean }) {
  const max = Math.max(...data, 1);
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={active ? '#8B8FE8' : '#D5D5DE'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AutomationsPage() {
  const [activeTab, setActiveTab] = useState('Rules');

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
          <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Automations</h1>
        
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            Rules and agents that watch the forecast so nobody has to.
          </p>
        </div>
        <div className="mt-2">
          <Button variant="primary" size="sm">
            <Icon name="plus" size={14} />
            New automation
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6" style={{ borderBottom: '1px solid #EAEAEF' }}>
        {['Rules', 'Agents', 'History'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="pb-3 cursor-pointer"
            style={{
              fontSize: 13,
              fontWeight: activeTab === tab ? 500 : 400,
              color: activeTab === tab ? '#16161D' : '#62626F',
              borderBottom: `2px solid ${activeTab === tab ? '#16161D' : 'transparent'}`,
              marginBottom: -1,
              background: 'none',
              border: 'none',
              borderBottomWidth: 2,
              borderBottomStyle: 'solid',
              borderBottomColor: activeTab === tab ? '#16161D' : 'transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Rules' && (
        <div className="flex flex-col gap-4">
          {RULES.map((rule, i) => (
            <SectionCard key={i} style={{ padding: 20 }}>
              <div className="flex items-start justify-between gap-8">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center gap-2 flex-wrap flex-1">
                    <span
                      className="px-2.5 py-1 rounded-lg"
                      style={{ background: '#F7F7F9', fontSize: 12, fontWeight: 500, color: '#62626F' }}
                    >
                      WHEN
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-lg"
                      style={{ background: '#EEEFFC', fontSize: 12, fontWeight: 500, color: '#5F63C9', border: '1px solid #DCDDF8' }}
                    >
                      {rule.when}
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-lg"
                      style={{ background: '#F7F7F9', fontSize: 12, fontWeight: 500, color: '#62626F' }}
                    >
                      THEN
                    </span>
                    {rule.then.split(' · ').map((action, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 rounded-lg"
                        style={{ background: '#F0F0F4', fontSize: 12, fontWeight: 500, color: '#16161D', border: '1px solid #D5D5DE' }}
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-text-tertiary" style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                    {rule.runs} runs
                  </span>
                  {/* Toggle */}
                  <div
                    className="rounded-full cursor-pointer flex-shrink-0"
                    style={{
                      width: 36,
                      height: 20,
                      background: rule.enabled ? '#16161D' : '#D5D5DE',
                      position: 'relative',
                      transition: 'background 0.18s',
                    }}
                  >
                    <div
                      className="absolute top-1 rounded-full bg-white"
                      style={{
                        width: 12,
                        height: 12,
                        left: rule.enabled ? 20 : 4,
                        transition: 'left 0.18s',
                      }}
                    />
                  </div>
                  <button className="p-1.5 rounded hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
                    <Icon name="more" size={14} color="#9494A3" />
                  </button>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {activeTab === 'Agents' && (
        <div className="grid grid-cols-3 gap-5">
          {AGENTS.map((agent, i) => (
            <SectionCard key={i} style={{ padding: 24 }}>
              <div
                className="flex items-center justify-center rounded-2xl mb-4"
                style={{ width: 48, height: 48, background: '#EEEFFC' }}
              >
                <SparkleIcon size={24} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 8px', color: '#16161D' }}>{agent.name}</h3>
              <p className="text-text-secondary mb-4" style={{ fontSize: 13, lineHeight: '20px' }}>{agent.desc}</p>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-1 rounded-full font-medium"
                  style={{
                    fontSize: 11,
                    background: agent.status === 'Active' ? '#E8F7F1' : '#F7F7F9',
                    color: agent.status === 'Active' ? '#2F9E6B' : '#9494A3',
                  }}
                >
                  {agent.status}
                </span>
                <MiniAgentSparkline data={agent.trend} active={agent.status === 'Active'} />
              </div>
              <div className="pt-3" style={{ borderTop: '1px solid #EAEAEF' }}>
                <p className="text-text-tertiary" style={{ fontSize: 11, lineHeight: '16px' }}>{agent.lastActed}</p>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {activeTab === 'History' && (
        <SectionCard className="overflow-hidden">
          <div
            className="grid px-5 py-3"
            style={{ gridTemplateColumns: '1.5fr 1fr 80px 3fr', background: '#F7F7F9', borderBottom: '1px solid #EAEAEF' }}
          >
            {['Timestamp', 'Automation', 'Result', 'Affected item'].map(h => (
              <span key={h} className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>
          {HISTORY.map((row, i) => {
            const resultColors = { success: '#2F9E6B', alert: '#E0A32E', proposed: '#8B8FE8' };
            const resultBg = { success: '#E8F7F1', alert: '#FDF5E3', proposed: '#EEEFFC' };
            return (
              <div
                key={i}
                className="grid px-5 items-center hover:bg-surface-hover transition-colors"
                style={{ gridTemplateColumns: '1.5fr 1fr 80px 3fr', height: 52, borderTop: i > 0 ? '1px solid #EAEAEF' : 'none' }}
              >
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#9494A3' }}>{row.time}</span>
                <span className="text-text-primary font-medium" style={{ fontSize: 13 }}>{row.name}</span>
                <span
                  className="inline-flex items-center rounded-full"
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    background: resultBg[row.result as keyof typeof resultBg],
                    color: resultColors[row.result as keyof typeof resultColors],
                    textTransform: 'capitalize',
                  }}
                >
                  {row.result}
                </span>
                <span className="text-text-secondary truncate" style={{ fontSize: 13 }}>{row.item}</span>
              </div>
            );
          })}
        </SectionCard>
      )}
    </div>
  );
}

export default AutomationsPage;
