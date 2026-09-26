import { Icon } from "@/components/basics/Icon";
import { useNavigate } from 'react-router-dom';
import { TASK_TABS, TASK_TAB_ROUTES, type TaskTab } from '@/data/navigation';
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { ConfidenceChip } from "@/components/forecast/ConfidenceChip";
import { PageHeader } from "@/components/navigation/PageHeader";

const COLUMNS = [
  {
    id: 'backlog',
    label: 'Backlog',
    dot: '#9494A3',
    tasks: [
      { title: 'Define Q4 OKR framework', project: 'Nimbus Dashboard', pColor: '#0D9488', chip: 'P85 · 8 Apr', assignees: [{ i: 'SP', c: '#0D9488' }], ai: false, comments: 3, attachments: 1 },
      { title: 'Audit legacy API endpoints', project: 'Orion API Gateway', pColor: '#3B82F6', chip: 'P95 · 15 Apr', assignees: [{ i: 'TK', c: '#22C55E' }], ai: true, comments: 0, attachments: 2 },
      { title: 'Research competitive positioning', project: 'Vega Brand Refresh', pColor: '#8B5CF6', chip: 'P85 · 12 Apr', assignees: [{ i: 'RK', c: '#8B5CF6' }, { i: 'CW', c: '#16161D' }], ai: false, comments: 5, attachments: 0 },
      { title: 'Set up staging environment', project: 'Atlas CRM Revamp', pColor: '#22C55E', chip: 'P50 · 5 Apr', assignees: [{ i: 'AM', c: '#EC4899' }], ai: true, comments: 1, attachments: 3 },
    ],
  },
  {
    id: 'inprogress',
    label: 'In Progress',
    dot: '#16161D',
    tasks: [
      { title: 'Finalize campaign brief for summer launch', project: 'Vega Brand Refresh', pColor: '#8B5CF6', chip: 'P85 · 22 Mar', assignees: [{ i: 'CW', c: '#16161D' }, { i: 'AM', c: '#EC4899' }], ai: false, comments: 8, attachments: 2 },
      { title: 'Implement OAuth2 token refresh', project: 'Orion API Gateway', pColor: '#3B82F6', chip: 'P85 · 18 Mar', assignees: [{ i: 'TK', c: '#22C55E' }], ai: true, comments: 4, attachments: 1 },
      { title: 'Migrate contact data to new schema', project: 'Atlas CRM Revamp', pColor: '#22C55E', chip: 'P50 · 15 Mar', assignees: [{ i: 'SP', c: '#0D9488' }], ai: false, comments: 12, attachments: 5 },
    ],
  },
  {
    id: 'review',
    label: 'In Review',
    dot: '#E0A32E',
    tasks: [
      { title: 'Stakeholder presentation deck', project: 'Nimbus Dashboard', pColor: '#0D9488', chip: 'P85 · 25 Mar', assignees: [{ i: 'AM', c: '#EC4899' }, { i: 'RK', c: '#8B5CF6' }], ai: false, comments: 6, attachments: 4 },
      { title: 'API rate limiting specification', project: 'Orion API Gateway', pColor: '#3B82F6', chip: 'P50 · 20 Mar', assignees: [{ i: 'TK', c: '#22C55E' }], ai: true, comments: 2, attachments: 1 },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    dot: '#2F9E6B',
    tasks: [
      { title: 'Design system token audit', project: 'Helio Task System', pColor: '#EC4899', chip: 'P50 · 10 Mar', assignees: [{ i: 'CW', c: '#16161D' }], ai: false, comments: 3, attachments: 0 },
      { title: 'User interview synthesis report', project: 'Atlas CRM Revamp', pColor: '#22C55E', chip: 'P85 · 12 Mar', assignees: [{ i: 'RK', c: '#8B5CF6' }, { i: 'SP', c: '#0D9488' }], ai: true, comments: 9, attachments: 6 },
      { title: 'Onboarding flow wireframes', project: 'Nimbus Dashboard', pColor: '#0D9488', chip: 'P85 · 8 Mar', assignees: [{ i: 'AM', c: '#EC4899' }], ai: false, comments: 14, attachments: 7 },
    ],
  },
];

function MiniConfidenceBar() {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: '#EAEAEF' }}>
      <div className="h-full" style={{ width: '35%', background: '#8B8FE8' }} />
      <div className="h-full" style={{ position: 'relative', top: -6, left: '35%', width: '30%', background: '#B9BCF0' }} />
      <div className="h-full" style={{ position: 'relative', top: -12, left: '65%', width: '35%', background: 'linear-gradient(to right, #DCDDF8, transparent)' }} />
    </div>
  );
}

function TaskCard({ task, lifted = false }: { task: typeof COLUMNS[0]['tasks'][0]; lifted?: boolean }) {
  return (
    <div
      className="bg-surface rounded-xl p-4 relative cursor-pointer transition-shadow"
      style={{
        border: `1px solid ${task.ai ? '#8B8FE8' : '#EAEAEF'}`,
        borderLeft: task.ai ? '3px solid #8B8FE8' : '1px solid #EAEAEF',
        boxShadow: lifted ? '0 16px 48px rgba(22,22,29,0.12)' : '0 1px 2px rgba(22,22,29,0.04)',
        transform: lifted ? 'rotate(2deg)' : 'none',
      }}
    >
      {task.ai && (
        <div className="absolute top-3 right-3">
          <Icon name="sparkle" size={12} />
        </div>
      )}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="rounded" style={{ width: 8, height: 8, background: task.pColor, borderRadius: 2 }} />
        <span className="text-text-tertiary" style={{ fontSize: 11, fontWeight: 500 }}>{task.project}</span>
      </div>
      <div className="text-text-primary mb-3 leading-snug" style={{ fontSize: 13, fontWeight: 500, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.title}
      </div>
      {/* Mini confidence bar */}
      <div className="mb-3">
        <MiniConfidenceBar />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {task.assignees.map((a, i) => (
            <Avatar key={i} initials={a.i} color={a.c} size={22} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <Icon name="comment" size={12} color="#9494A3" />
              <span className="text-text-tertiary" style={{ fontSize: 11 }}>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Icon name="attachment" size={12} color="#9494A3" />
              <span className="text-text-tertiary" style={{ fontSize: 11 }}>{task.attachments}</span>
            </div>
          )}
          <ConfidenceChip label={task.chip} />
        </div>
      </div>
    </div>
  );
}

export function TasksBoardPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" style={{ height: '100%' }}>
      <PageHeader
        breadcrumb="Workspace / Tasks"
        title="Tasks"
        description="Drag work across the board. Every card carries the odds it will land on time."
        tabs={[...TASK_TABS]}
        activeTab="Board"
        onTabChange={(next) => navigate(TASK_TAB_ROUTES[next as TaskTab])}
      >
        <Button variant="secondary" size="sm">Status: All</Button>
        <Button variant="primary" size="sm">
          <Icon name="plus" size={14} />
          New task
        </Button>
      </PageHeader>

      <div className="flex gap-5 overflow-x-auto pb-4 flex-1" style={{ minHeight: 0 }}>
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="flex flex-col rounded-xl"
            style={{ width: 320, flexShrink: 0, background: '#F7F7F9', padding: 12 }}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="rounded-full" style={{ width: 8, height: 8, background: col.dot }} />
                <span className="text-text-primary font-semibold" style={{ fontSize: 14, fontFamily: 'var(--font-tight)' }}>{col.label}</span>
                <span className="text-text-tertiary" style={{ fontSize: 12 }}>{col.tasks.length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1 rounded hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
                  <Icon name="plus" size={14} color="#9494A3" />
                </button>
                <button className="p-1 rounded hover:bg-surface-hover transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
                  <Icon name="more" size={14} color="#9494A3" />
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 overflow-y-auto flex-1">
              {col.tasks.map((task, i) => (
                <TaskCard key={i} task={task} lifted={col.id === 'inprogress' && i === 0} />
              ))}

              {/* Drop placeholder (shown in In Progress column) */}
              {col.id === 'inprogress' && (
                <div
                  className="rounded-xl"
                  style={{
                    height: 80,
                    border: '1.5px dashed #D5D5DE',
                    background: 'transparent',
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksBoardPage;
