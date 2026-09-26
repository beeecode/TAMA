import { useState } from 'react';
import { Button } from "@/components/basics/Button";
import { SectionCard } from "@/components/layout/SectionBlock";
import { GeneralPanel } from "./parts/GeneralPanel";
import { MembersPanel } from "./parts/MembersPanel";
import { IntegrationsPanel } from "./parts/IntegrationsPanel";
import { NotificationsPanel } from "./parts/NotificationsPanel";
import { SecurityPanel } from "./parts/SecurityPanel";

const NAV_ITEMS = ['General', 'Members', 'Integrations', 'Forecasting', 'Notifications', 'Billing', 'Security'];

const PROJECTS = [
  { name: 'Atlas CRM Revamp', color: '#22C55E', signals: 47, status: 'ready' },
  { name: 'Nimbus Dashboard', color: '#0D9488', signals: 38, status: 'ready' },
  { name: 'Orion API Gateway', color: '#3B82F6', signals: 11, status: 'learning' },
  { name: 'Helio Task System', color: '#EC4899', signals: 31, status: 'ready' },
  { name: 'Vega Brand Refresh', color: '#8B5CF6', signals: 22, status: 'ready' },
];

const INVOICES = [
  { date: 'Mar 1, 2026', amount: '$336', seats: 24, status: 'Paid' },
  { date: 'Feb 1, 2026', amount: '$336', seats: 24, status: 'Paid' },
  { date: 'Jan 1, 2026', amount: '$308', seats: 22, status: 'Paid' },
  { date: 'Dec 1, 2025', amount: '$280', seats: 20, status: 'Paid' },
];

export function SettingsPage() {
  const [activeNav, setActiveNav] = useState('Forecasting');
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  const [simWindow, setSimWindow] = useState('8 weeks');
  const [showCones, setShowCones] = useState(true);

  return (
    <div>
      <div className="mb-6">
        <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>Workspace</div>
        <h1 style={{ fontSize: 34, fontWeight: 600, fontFamily: 'var(--font-tight)', letterSpacing: '-0.005em', margin: 0, color: '#16161D' }}>Settings</h1>
      
          <p className="text-text-secondary" style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}>
            How this workspace behaves, and what the forecast is allowed to see.
          </p>
        </div>

      <div className="flex gap-6">
        {/* Secondary nav */}
        <div style={{ width: 200, flexShrink: 0 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className="w-full text-left px-3 rounded-lg mb-0.5 transition-colors cursor-pointer"
              style={{
                height: 36,
                background: activeNav === item ? '#F3F3F6' : 'transparent',
                fontSize: 13,
                color: activeNav === item ? '#16161D' : '#62626F',
                fontWeight: activeNav === item ? 500 : 400,
                border: 'none',
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeNav === 'Forecasting' && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px', color: '#16161D' }}>Forecast settings</h2>
                <p className="text-text-secondary" style={{ fontSize: 13 }}>Control how TAMA generates and displays probability forecasts.</p>
              </div>

              <SectionCard style={{ padding: 24 }}>
                <h3 className="mb-1" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px' }}>Default confidence level</h3>
                <p className="text-text-secondary mb-6" style={{ fontSize: 13 }}>The percentile shown by default when viewing forecasts and Confidence Chips.</p>

                <div className="relative mb-3">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={confidenceLevel}
                    onChange={e => setConfidenceLevel(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: '#5F63C9' }}
                  />
                  <div className="flex justify-between mt-2">
                    {[50, 65, 75, 85, 95].map(v => (
                      <span
                        key={v}
                        style={{
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 500,
                          color: v === confidenceLevel ? '#5F63C9' : '#9494A3',
                        }}
                      >
                        P{v}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-ai-strong" style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  Currently showing: P{confidenceLevel}
                </p>
              </SectionCard>

              <SectionCard style={{ padding: 24 }}>
                <h3 className="mb-1" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px' }}>Simulation window</h3>
                <p className="text-text-secondary mb-4" style={{ fontSize: 13 }}>How much historical data TAMA uses to simulate future delivery.</p>
                <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #D5D5DE', width: 'fit-content' }}>
                  {['4 weeks', '8 weeks', '12 weeks'].map(option => (
                    <button
                      key={option}
                      onClick={() => setSimWindow(option)}
                      className="px-5 py-2 cursor-pointer transition-colors"
                      style={{
                        fontSize: 13,
                        background: simWindow === option ? '#16161D' : '#FFFFFF',
                        color: simWindow === option ? '#FFFFFF' : '#62626F',
                        border: 'none',
                        borderRight: option !== '12 weeks' ? '1px solid #D5D5DE' : 'none',
                        fontWeight: simWindow === option ? 500 : 400,
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard style={{ padding: 24 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px' }}>Uncertainty cones on timelines</h3>
                    <p className="text-text-secondary" style={{ fontSize: 13 }}>Show widening uncertainty bands on forecasted task bars in Timeline view.</p>
                  </div>
                  <div
                    className="rounded-full cursor-pointer flex-shrink-0"
                    onClick={() => setShowCones(!showCones)}
                    style={{
                      width: 44,
                      height: 24,
                      background: showCones ? '#16161D' : '#D5D5DE',
                      position: 'relative',
                      transition: 'background 0.18s',
                    }}
                  >
                    <div
                      className="absolute top-1 rounded-full bg-white"
                      style={{ width: 16, height: 16, left: showCones ? 24 : 4, transition: 'left 0.18s' }}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Data maturity */}
              <SectionCard style={{ padding: 24 }}>
                <h3 className="mb-1" style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px' }}>Signal maturity by project</h3>
                <p className="text-text-secondary mb-5" style={{ fontSize: 13 }}>TAMA needs at least 20 completed items to produce reliable forecasts.</p>
                <div className="flex flex-col gap-4">
                  {PROJECTS.map(p => {
                    const pct = Math.min((p.signals / 20) * 100, 100);
                    return (
                      <div key={p.name} className="flex items-center gap-4">
                        <div className="flex items-center gap-2" style={{ width: 200, flexShrink: 0 }}>
                          <div className="rounded" style={{ width: 10, height: 10, background: p.color, borderRadius: 3 }} />
                          <span className="text-text-primary" style={{ fontSize: 13 }}>{p.name}</span>
                        </div>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#EAEAEF' }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.status === 'ready' ? '#2F9E6B' : '#8B8FE8' }} />
                        </div>
                        <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#62626F', width: 60 }}>
                          {p.signals} / 20
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5"
                          style={{ fontSize: 10, fontWeight: 500, background: p.status === 'ready' ? '#E8F7F1' : '#EEEFFC', color: p.status === 'ready' ? '#2F9E6B' : '#5F63C9' }}
                        >
                          {p.status === 'ready' ? 'Ready' : 'Learning'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>
          )}

          {activeNav === 'Billing' && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '0 0 4px', color: '#16161D' }}>Billing</h2>
              </div>

              {/* Current plan */}
              <SectionCard style={{ padding: 24, border: '2px solid #8B8FE8' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em' }}>Current plan</span>
                    <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: '4px 0 0' }}>Team</h3>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{ background: '#EEEFFC', fontSize: 12, fontWeight: 500, color: '#5F63C9' }}
                  >
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #EAEAEF' }}>
                  <span className="text-text-secondary" style={{ fontSize: 13 }}>Seats</span>
                  <span className="text-text-primary font-medium" style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>24 of 50</span>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #EAEAEF' }}>
                  <span className="text-text-secondary" style={{ fontSize: 13 }}>Monthly cost</span>
                  <span className="text-text-primary font-medium" style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>$336 / month</span>
                </div>
                <div className="flex items-center justify-between py-3" style={{ borderTop: '1px solid #EAEAEF' }}>
                  <span className="text-text-secondary" style={{ fontSize: 13 }}>Payment method</span>
                  <span className="text-text-primary" style={{ fontSize: 13 }}>Visa •••• 4291</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button variant="secondary" size="sm">Manage seats</Button>
                  <Button variant="ghost" size="sm">Upgrade to Scale</Button>
                </div>
              </SectionCard>

              {/* Invoices */}
              <SectionCard className="overflow-hidden">
                <div className="px-5 py-4" style={{ borderBottom: '1px solid #EAEAEF' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Invoices</h3>
                </div>
                {INVOICES.map((inv, i) => (
                  <div
                    key={i}
                    className="flex items-center px-5 hover:bg-surface-hover transition-colors"
                    style={{ height: 52, borderTop: i > 0 ? '1px solid #EAEAEF' : 'none' }}
                  >
                    <span className="flex-1 text-text-primary" style={{ fontSize: 13 }}>{inv.date}</span>
                    <span className="text-text-secondary mr-8" style={{ fontSize: 13 }}>{inv.seats} seats</span>
                    <span className="text-text-primary font-medium mr-8" style={{ fontSize: 13, fontFamily: 'var(--font-mono)' }}>{inv.amount}</span>
                    <span className="text-on-track mr-6" style={{ fontSize: 12, fontWeight: 500 }}>{inv.status}</span>
                    <button className="text-text-tertiary hover:text-text-secondary cursor-pointer" style={{ background: 'none', border: 'none', fontSize: 12 }}>Download PDF</button>
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {activeNav === 'General' && <GeneralPanel />}
          {activeNav === 'Members' && <MembersPanel />}
          {activeNav === 'Integrations' && <IntegrationsPanel />}
          {activeNav === 'Notifications' && <NotificationsPanel />}
          {activeNav === 'Security' && <SecurityPanel />}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
