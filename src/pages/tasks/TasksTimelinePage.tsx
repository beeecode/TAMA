import { useNavigate } from 'react-router-dom';
import { TASK_TABS, TASK_TAB_ROUTES, type TaskTab } from '@/data/navigation';
import { useState } from 'react';
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { PageHeader } from "@/components/navigation/PageHeader";

const PROJECTS_DATA = [
  {
    name: 'Atlas CRM Revamp',
    color: '#22C55E',
    tasks: [
      { title: 'Data migration', start: 0, elapsedWidth: 3, totalWidth: 6, forecasted: true, assignee: { i: 'SP', c: '#0D9488' } },
      { title: 'API integration', start: 2, elapsedWidth: 2, totalWidth: 5, forecasted: true, assignee: { i: 'TK', c: '#22C55E' } },
      { title: 'User testing', start: 5, elapsedWidth: 0, totalWidth: 4, forecasted: true, assignee: { i: 'CW', c: '#16161D' } },
    ],
  },
  {
    name: 'Nimbus Dashboard',
    color: '#0D9488',
    tasks: [
      { title: 'UI Design', start: 1, elapsedWidth: 3, totalWidth: 5, forecasted: true, assignee: { i: 'AM', c: '#EC4899' } },
      { title: 'Frontend build', start: 4, elapsedWidth: 0, totalWidth: 6, forecasted: true, assignee: { i: 'TK', c: '#22C55E' } },
    ],
  },
  {
    name: 'Vega Brand Refresh',
    color: '#8B5CF6',
    tasks: [
      { title: 'Campaign brief', start: 0, elapsedWidth: 2, totalWidth: 4, forecasted: false, assignee: { i: 'CW', c: '#16161D' } },
      { title: 'Creative direction', start: 2, elapsedWidth: 1, totalWidth: 5, forecasted: true, assignee: { i: 'RK', c: '#8B5CF6' } },
      { title: 'Production', start: 6, elapsedWidth: 0, totalWidth: 5, forecasted: true, assignee: { i: 'AM', c: '#EC4899' } },
    ],
  },
  {
    name: 'Orion API Gateway',
    color: '#3B82F6',
    tasks: [
      { title: 'Auth spec', start: 1, elapsedWidth: 2, totalWidth: 4, forecasted: false, assignee: { i: 'TK', c: '#22C55E' } },
      { title: 'Rate limiting', start: 4, elapsedWidth: 0, totalWidth: 4, forecasted: true, assignee: { i: 'DP', c: '#22C55E' } },
    ],
  },
];

const DATES = ['Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16', 'Mar 17', 'Mar 18', 'Mar 19', 'Mar 20'];
const TODAY_COL = 4;

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  task: string;
}

export function TasksTimelinePage() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, task: '' });
  const colWidth = 80;

  return (
    <div>
      <PageHeader
        breadcrumb="Workspace / Tasks"
        title="Tasks"
        description="Bars are wide where TAMA is unsure. The wide ones are the ones to watch."
        tabs={[...TASK_TABS]}
        activeTab="Timeline"
        onTabChange={(next) => navigate(TASK_TAB_ROUTES[next as TaskTab])}
      >
        <Button variant="secondary" size="sm">Status: All</Button>
      </PageHeader>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #D5D5DE' }}>
          {['Week', 'Month', 'Quarter'].map((z, i) => (
            <button
              key={z}
              className="px-4 py-1.5 cursor-pointer transition-colors"
              style={{
                fontSize: 13,
                background: z === 'Week' ? '#16161D' : '#FFFFFF',
                color: z === 'Week' ? '#FFFFFF' : '#62626F',
                border: 'none',
                borderRight: i < 2 ? '1px solid #D5D5DE' : 'none',
              }}
            >
              {z}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div
            className="rounded-full flex-shrink-0"
            style={{ width: 10, height: 10, background: 'linear-gradient(to right, #DCDDF8, transparent)' }}
          />
          <span className="text-text-secondary" style={{ fontSize: 13 }}>Uncertainty bands on</span>
        </div>
        <div className="flex items-center gap-4" style={{ marginLeft: 'auto' }}>
          {[{ label: 'Completed', color: '#22C55E' }, { label: 'Forecasted', color: '#8B8FE8' }, { label: 'Milestone', color: '#16161D' }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline grid */}
      <div
        className="bg-surface rounded-xl overflow-hidden"
        style={{ border: '1px solid #EAEAEF', boxShadow: '0 1px 2px rgba(22,22,29,0.04)' }}
      >
        <div className="flex">
          {/* Left column */}
          <div style={{ width: 240, flexShrink: 0, borderRight: '1px solid #EAEAEF' }}>
            <div style={{ height: 48, borderBottom: '1px solid #EAEAEF', background: '#F7F7F9' }} />
            {PROJECTS_DATA.map(project => (
              <div key={project.name}>
                {/* Project row */}
                <div
                  className="flex items-center gap-2 px-4"
                  style={{ height: 40, borderBottom: '1px solid #EAEAEF', background: '#FFFFFF' }}
                >
                  <div className="rounded" style={{ width: 10, height: 10, background: project.color, borderRadius: 3 }} />
                  <span className="text-text-primary font-medium" style={{ fontSize: 12, fontFamily: 'var(--font-tight)' }}>{project.name}</span>
                </div>
                {/* Task rows */}
                {project.tasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center px-6"
                    style={{ height: 44, borderBottom: '1px solid #EAEAEF' }}
                  >
                    <span className="text-text-secondary truncate" style={{ fontSize: 12 }}>{task.title}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Right grid */}
          <div className="flex-1 overflow-x-auto">
            {/* Date headers */}
            <div className="flex" style={{ height: 48, background: '#F7F7F9', borderBottom: '1px solid #EAEAEF', minWidth: DATES.length * colWidth }}>
              {DATES.map((date, i) => (
                <div
                  key={date}
                  className="flex flex-col items-center justify-center"
                  style={{
                    width: colWidth,
                    flexShrink: 0,
                    borderRight: '1px solid #EAEAEF',
                    background: i === TODAY_COL ? '#F3F3F6' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: 10, color: '#9494A3', fontFamily: 'var(--font-sans)' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7]}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: i === TODAY_COL ? '#16161D' : '#9494A3', fontWeight: i === TODAY_COL ? 600 : 400 }}>
                    {date.split(' ')[1]}
                  </span>
                </div>
              ))}
            </div>

            {/* Task bars */}
            {PROJECTS_DATA.map(project => (
              <div key={project.name} style={{ minWidth: DATES.length * colWidth }}>
                {/* Project spacer */}
                <div
                  className="relative"
                  style={{ height: 40, borderBottom: '1px solid #EAEAEF', background: '#FFFFFF' }}
                >
                  {/* Vertical gridlines */}
                  {DATES.map((_, i) => (
                    <div key={i} className="absolute top-0 h-full" style={{ left: i * colWidth, width: colWidth, borderRight: '1px solid #EAEAEF' }} />
                  ))}
                  {/* Today line */}
                  <div
                    className="absolute top-0 h-full z-10"
                    style={{ left: TODAY_COL * colWidth, width: 2, background: '#16161D' }}
                  />
                </div>

                {/* Task rows */}
                {project.tasks.map((task) => (
                  <div
                    key={task.title}
                    className="relative flex items-center"
                    style={{ height: 44, borderBottom: '1px solid #EAEAEF' }}
                  >
                    {/* Gridlines */}
                    {DATES.map((_, i) => (
                      <div key={i} className="absolute top-0 h-full" style={{ left: i * colWidth, width: colWidth, borderRight: '1px dashed #EAEAEF' }} />
                    ))}
                    {/* Today line */}
                    <div className="absolute top-0 h-full z-10" style={{ left: TODAY_COL * colWidth, width: 2, background: '#16161D', opacity: 0.6 }} />

                    {/* Bar */}
                    {task.forecasted ? (
                      <>
                        {/* Elapsed portion */}
                        {task.elapsedWidth > 0 && (
                          <div
                            className="absolute rounded-l-lg flex items-center z-20"
                            style={{
                              left: task.start * colWidth + 4,
                              width: task.elapsedWidth * colWidth - 4,
                              height: 32,
                              background: project.color,
                            }}
                          />
                        )}
                        {/* Forecasted uncertainty cone */}
                        <div
                          className="absolute flex items-center justify-between px-2 z-20 overflow-hidden"
                          onMouseEnter={(e) => {
                            const rect = (e.target as Element).getBoundingClientRect();
                            setTooltip({ visible: true, x: rect.left, y: rect.top - 80, task: task.title });
                          }}
                          onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
                          style={{
                            left: (task.start + task.elapsedWidth) * colWidth + 4,
                            width: (task.totalWidth - task.elapsedWidth) * colWidth - 8,
                            height: 32,
                            background: 'linear-gradient(to right, #B9BCF0, rgba(220,221,248,0.2))',
                            border: '1px solid rgba(139,143,232,0.3)',
                            borderRadius: task.elapsedWidth > 0 ? '0 8px 8px 0' : 8,
                          }}
                        >
                          <span className="text-ai-strong truncate" style={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}>
                            forecast
                          </span>
                          <Avatar initials={task.assignee.i} color={task.assignee.c} size={20} />
                        </div>
                      </>
                    ) : (
                      <div
                        className="absolute flex items-center justify-between px-2 rounded-lg z-20"
                        style={{
                          left: task.start * colWidth + 4,
                          width: task.totalWidth * colWidth - 8,
                          height: 32,
                          background: project.color,
                        }}
                      >
                        <span className="text-white truncate" style={{ fontSize: 10 }}>{task.title}</span>
                        <Avatar initials={task.assignee.i} color={task.assignee.c} size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 rounded-lg p-3 pointer-events-none"
          style={{ top: tooltip.y, left: tooltip.x, background: '#16161D', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        >
          <div className="text-white font-medium mb-2" style={{ fontSize: 12 }}>{tooltip.task}</div>
          {[{ label: 'P50', date: '14 Mar' }, { label: 'P85', date: '19 Mar' }, { label: 'P95', date: '24 Mar' }].map(r => (
            <div key={r.label} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#B9BCF0' }}>
              {r.label} · {r.date}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksTimelinePage;
