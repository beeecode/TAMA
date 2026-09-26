import { Icon } from "@/components/basics/Icon";
import { useNavigate } from 'react-router-dom';
import { TASK_TABS, TASK_TAB_ROUTES, type TaskTab } from '@/data/navigation';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { KPICard } from "@/components/cards/StatCard";
import { SectionCard } from "@/components/layout/SectionBlock";
import { PageHeader } from "@/components/navigation/PageHeader";

const DELIVERY_DATA = [
  { month: 'Apr', completed: 22, inprogress: 14, pending: 8 },
  { month: 'May', completed: 28, inprogress: 18, pending: 10 },
  { month: 'Jun', completed: 19, inprogress: 12, pending: 9 },
  { month: 'Jul', completed: 33, inprogress: 20, pending: 11 },
  { month: 'Aug', completed: 25, inprogress: 16, pending: 7 },
  { month: 'Sep', completed: 30, inprogress: 19, pending: 9 },
  { month: 'Oct', completed: 27, inprogress: 17, pending: 8 },
  { month: 'Nov', completed: 35, inprogress: 21, pending: 6 },
  { month: 'Dec', completed: 22, inprogress: 14, pending: 10 },
  { month: 'Jan', completed: 38, inprogress: 24, pending: 8 },
  { month: 'Feb', completed: 42, inprogress: 26, pending: 9 },
  { month: 'Mar', completed: 50, inprogress: 18, pending: 10 },
];

const THROUGHPUT_DATA = [
  { day: 'Sun', completed: 12 },
  { day: 'Mon', completed: 28 },
  { day: 'Tue', completed: 35 },
  { day: 'Wed', completed: 50 },
  { day: 'Thu', completed: 38 },
  { day: 'Fri', completed: 42 },
  { day: 'Sat', completed: 18 },
];

const MY_TASKS = [
  { title: 'Research competitor positioning', duration: 'About 4 hours', pct: 35, assignees: [{ i: 'CW', c: '#16161D' }], forecasted: false },
  { title: 'Wireframe campaign landing page', duration: 'About 6 hours', pct: 55, assignees: [{ i: 'CW', c: '#16161D' }, { i: 'AM', c: '#EC4899' }], forecasted: true },
  { title: 'UI Design — full fidelity', duration: 'About 2 days', pct: 75, assignees: [{ i: 'CW', c: '#16161D' }], forecasted: true },
  { title: 'Design handoff to engineering', duration: 'About 3 hours', pct: 88, assignees: [{ i: 'CW', c: '#16161D' }, { i: 'TK', c: '#22C55E' }], forecasted: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg p-3"
        style={{ background: '#16161D', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="text-white font-medium mb-1" style={{ fontSize: 12 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#B9BCF0' }}>
            {p.dataKey === 'completed' ? 'Completed' : p.dataKey === 'inprogress' ? 'In Progress' : 'Pending'}: {p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ThroughputTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg p-3" style={{ background: '#16161D' }}>
        <div className="text-white mb-1" style={{ fontSize: 12 }}>{label}</div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#B9BCF0' }}>Completed: {payload[0]?.value}</div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#B9BCF0' }}>Cycle time: 2.4d</div>
      </div>
    );
  }
  return null;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function TasksOverviewPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Workspace / Tasks"
        title="Tasks"
        description="Where your delivery stands this week, and what moved it."
        tabs={[...TASK_TABS]}
        activeTab="Overview"
        onTabChange={(next) => navigate(TASK_TAB_ROUTES[next as TaskTab])}
      >
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex">
              <Icon name="search" size={14} color="#9494A3" />
            </span>
          <input
            className="rounded-lg pl-9 pr-3"
            style={{ width: 280, height: 36, border: '1px solid #D5D5DE', background: '#FFFFFF', fontSize: 13, outline: 'none', color: '#16161D' }}
            placeholder="Search tasks..."
          />
        </div>
        <Button variant="secondary" size="sm">
          <Icon name="filter" size={14} />
          Status: All
        </Button>
        <Button variant="secondary" size="sm">Sort</Button>
        <Button variant="secondary" size="sm">
          <Icon name="grid" size={14} />
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-6">
        {/* Task Overview KPIs */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="check" size={16} color="#62626F" />
            <h2 style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Task Overview</h2>
            <span className="text-text-tertiary" style={{ fontSize: 13 }}>(147 total)</span>
          </div>
          <div className="flex gap-5">
            <KPICard label="Total Tasks" value="147" description="Across 5 active projects" footerText="+15% from last week" footerColor="#2F9E6B" />
            <KPICard label="Completed" value="89" description="Finished this cycle" footerText="+10% from last week" footerColor="#2F9E6B" />
            <KPICard label="In Progress" value="42" description="Currently being worked on" footerText="−3% from last week" footerColor="#D64545" />
            <KPICard label="Awaiting Approval" value="16" description="Blocked on a reviewer" footerText="+4% from last week" footerColor="#E0A32E" />
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-5" style={{ gridTemplateColumns: '7fr 5fr' }}>
          {/* Delivery Confidence */}
          <SectionCard style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Delivery Confidence</h3>
                <span className="text-text-tertiary" style={{ fontSize: 12 }}>(12 months)</span>
              </div>
              <div className="flex items-center gap-4">
                {[{ label: 'Completed', color: '#DCDDF8' }, { label: 'In Progress', color: '#16161D' }, { label: 'Pending', color: '#A0A0AE' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="rounded-full" style={{ width: 8, height: 8, background: l.color }} />
                    <span className="text-text-tertiary" style={{ fontSize: 11 }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DELIVERY_DATA} barSize={22} barGap={2}>
                <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F3F6' }} />
                <Bar dataKey="completed" stackId="a" fill="#DCDDF8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="inprogress" stackId="a" fill="#16161D" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending" stackId="a" fill="#A0A0AE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          {/* Weekly Throughput */}
          <SectionCard style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>Weekly Throughput</h3>
                <span className="text-text-tertiary" style={{ fontSize: 12 }}>(tasks completed)</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={THROUGHPUT_DATA}>
                <defs>
                  <linearGradient id="throughputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16161D" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#16161D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#EAEAEF" strokeDasharray="3 0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9494A3', fontFamily: 'var(--font-sans)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ThroughputTooltip />} cursor={{ stroke: '#EAEAEF', strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="completed" stroke="#16161D" strokeWidth={2} fill="url(#throughputGrad)" dot={{ r: 4, fill: '#16161D', stroke: '#FFFFFF', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* My Tasks mini gantt */}
        <SectionCard style={{ padding: 20 }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-tight)', margin: 0 }}>My Tasks</h3>
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>(4)</span>
            </div>
            <div className="flex items-center gap-3">
              {['Today', 'Tomorrow', 'Upcoming'].map((t, i) => (
                <span key={t} className="cursor-pointer" style={{ fontSize: 13, color: i === 0 ? '#16161D' : '#62626F', fontWeight: i === 0 ? 500 : 400 }}>{t}</span>
              ))}
              <button className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: '#F7F7F9', border: '1px solid #EAEAEF', cursor: 'pointer' }}>
                <Icon name="plus" size={14} color="#62626F" />
              </button>
            </div>
          </div>

          {/* Mini Gantt */}
          <div className="flex" style={{ minHeight: 200 }}>
            {/* Labels */}
            <div style={{ width: 200, flexShrink: 0 }}>
              <div style={{ height: 36, borderBottom: '1px solid #EAEAEF' }} />
              {MY_TASKS.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center"
                  style={{ height: 44, borderBottom: '1px solid #EAEAEF', borderRight: '1px solid #EAEAEF' }}
                >
                  <span className="text-text-primary truncate px-3" style={{ fontSize: 13 }}>{task.title}</span>
                </div>
              ))}
            </div>
            {/* Grid */}
            <div className="flex-1 relative overflow-hidden">
              {/* Header */}
              <div className="flex" style={{ height: 36, borderBottom: '1px solid #EAEAEF', background: '#F7F7F9' }}>
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center flex-1"
                    style={{ borderRight: '1px dashed #EAEAEF', fontSize: 11, color: '#9494A3', fontFamily: 'var(--font-sans)' }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {/* Bars */}
              {MY_TASKS.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center relative"
                  style={{ height: 44, borderBottom: '1px solid #EAEAEF' }}
                >
                  {/* Vertical grid lines */}
                  {DAYS.map((d, j) => (
                    <div key={d} className="absolute top-0 h-full" style={{ left: `${(j / 7) * 100}%`, borderRight: '1px dashed #EAEAEF', width: 0 }} />
                  ))}
                  {/* Task bar */}
                  <div
                    className="absolute flex items-center justify-between px-3 rounded-lg"
                    style={{
                      left: `${task.pct * 0.5}%`,
                      width: `${(100 - task.pct * 0.5) * 0.55}%`,
                      height: 36,
                      background: task.forecasted
                        ? 'linear-gradient(to right, #DCDDF8, rgba(220,221,248,0.3))'
                        : '#FFFFFF',
                      border: `1px solid ${task.forecasted ? '#B9BCF0' : '#EAEAEF'}`,
                    }}
                  >
                    <span className="text-text-secondary truncate" style={{ fontSize: 11 }}>{task.duration}</span>
                    <div className="flex -space-x-1">
                      {task.assignees.map((a, ai) => (
                        <Avatar key={ai} initials={a.i} color={a.c} size={20} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default TasksOverviewPage;
