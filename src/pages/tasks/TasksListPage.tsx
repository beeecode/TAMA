import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { ConfidenceChip } from "@/components/forecast/ConfidenceChip";
import { SectionCard } from "@/components/layout/SectionBlock";
import { PageHeader } from "@/components/navigation/PageHeader";
import { EmptyState } from "@/components/states/EmptyState";
import { TASK_TABS, TASK_TAB_ROUTES, type TaskTab } from "@/data/navigation";
import { projects } from "@/data/projects";

interface TaskRow {
  id: string;
  title: string;
  projectId: string;
  /** The forecast, at the percentile worth committing to. */
  chip: string;
  assignee: string;
  assigneeColor: string;
  status: "In progress" | "Blocked" | "Not started" | "In review";
}

const TASKS: TaskRow[] = [
  { id: "t1", title: "Finalize campaign brief for summer launch", projectId: "vega", chip: "P85 · 22 Mar", assignee: "CW", assigneeColor: "#16161D", status: "In progress" },
  { id: "t2", title: "Review API gateway auth spec", projectId: "orion", chip: "P85 · 18 Mar", assignee: "TK", assigneeColor: "#22C55E", status: "In review" },
  { id: "t3", title: "Update CRM migration runbook", projectId: "atlas", chip: "P50 · 15 Mar", assignee: "SP", assigneeColor: "#0D9488", status: "In progress" },
  { id: "t4", title: "Stakeholder sign-off on designs", projectId: "nimbus", chip: "P85 · 25 Mar", assignee: "AM", assigneeColor: "#EC4899", status: "Blocked" },
  { id: "t5", title: "Write release notes for v2.4", projectId: "helio", chip: "P95 · 20 Mar", assignee: "CW", assigneeColor: "#16161D", status: "Not started" },
  { id: "t6", title: "Conduct user interviews — round 2", projectId: "atlas", chip: "P85 · 24 Mar", assignee: "RK", assigneeColor: "#8B5CF6", status: "In progress" },
  { id: "t7", title: "Design system token audit", projectId: "helio", chip: "P50 · 10 Mar", assignee: "AM", assigneeColor: "#EC4899", status: "In review" },
  { id: "t8", title: "Migrate contact data to new schema", projectId: "atlas", chip: "P50 · 15 Mar", assignee: "TK", assigneeColor: "#22C55E", status: "Blocked" },
  { id: "t9", title: "Onboarding flow wireframes", projectId: "nimbus", chip: "P85 · 8 Mar", assignee: "SP", assigneeColor: "#0D9488", status: "In progress" },
  { id: "t10", title: "Define Q4 OKR framework", projectId: "nimbus", chip: "P85 · 8 Apr", assignee: "RK", assigneeColor: "#8B5CF6", status: "Not started" },
];

const STATUS_COLOR: Record<TaskRow["status"], string> = {
  "In progress": "#2F9E6B",
  "In review": "#8B8FE8",
  Blocked: "#D64545",
  "Not started": "#A0A0AE",
};

const FILTERS = ["All", "Mine", "Blocked"] as const;
type Filter = (typeof FILTERS)[number];

export function TasksListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("All");

  const rows = TASKS.filter((task) => {
    if (filter === "Mine") return task.assignee === "CW";
    if (filter === "Blocked") return task.status === "Blocked";
    return true;
  });

  return (
    <div>
      <PageHeader
        breadcrumb="Workspace / Tasks"
        title="Tasks"
        description="Everything open, with the forecast attached to each row."
        tabs={[...TASK_TABS]}
        activeTab="Lists"
        onTabChange={(next) => navigate(TASK_TAB_ROUTES[next as TaskTab])}
      >
        <Button variant="secondary" size="sm">Filter</Button>
        <Button variant="primary" size="sm">New task</Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {FILTERS.map((option) => {
          const selected = option === filter;
          return (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className="rounded-lg px-3 transition-colors cursor-pointer"
              style={{
                height: 30,
                fontSize: 12,
                color: selected ? "#16161D" : "#62626F",
                background: selected ? "#F3F3F6" : "#FFFFFF",
                border: `1px solid ${selected ? "#16161D" : "#D5D5DE"}`,
              }}
            >
              {option}
            </button>
          );
        })}
        <span className="text-text-tertiary ml-auto" style={{ fontSize: 12 }}>
          {rows.length} of {TASKS.length} tasks
        </span>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="Nothing matches that filter"
          body="No tasks in this workspace are blocked right now."
          actionLabel="Show all tasks"
          onAction={() => setFilter("All")}
          compact
        />
      ) : (
        <SectionCard>
          {/* Column headings */}
          <div
            className="flex items-center gap-3 px-5"
            style={{ height: 36, borderBottom: "1px solid #EAEAEF", background: "#F7F7F9" }}
          >
            <span
              className="text-text-tertiary uppercase flex-1"
              style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
            >
              Task
            </span>
            <span
              className="text-text-tertiary uppercase"
              style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 150 }}
            >
              Project
            </span>
            <span
              className="text-text-tertiary uppercase"
              style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 92 }}
            >
              Status
            </span>
            <span
              className="text-text-tertiary uppercase"
              style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 104 }}
            >
              Forecast
            </span>
            <span style={{ width: 24 }} />
          </div>

          {rows.map((task, index) => {
            const project = projects.find((p) => p.id === task.projectId);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 px-5 hover:bg-surface-hover transition-colors cursor-pointer"
                style={{
                  height: 52,
                  borderTop: index > 0 ? "1px solid #EAEAEF" : "none",
                }}
              >
                <div
                  className="flex-shrink-0"
                  style={{ width: 18, height: 18, border: "1.5px solid #D5D5DE", borderRadius: 5 }}
                />
                <span className="flex-1 text-text-primary truncate" style={{ fontSize: 13 }}>
                  {task.title}
                </span>
                <div className="flex items-center gap-1.5" style={{ width: 150 }}>
                  <div
                    className="rounded flex-shrink-0"
                    style={{
                      width: 8,
                      height: 8,
                      background: project?.color ?? "#A0A0AE",
                      borderRadius: 2,
                    }}
                  />
                  <span className="text-text-tertiary truncate" style={{ fontSize: 12 }}>
                    {project?.name ?? "No project"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5" style={{ width: 92 }}>
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 6, height: 6, background: STATUS_COLOR[task.status] }}
                  />
                  <span className="text-text-secondary" style={{ fontSize: 12 }}>
                    {task.status}
                  </span>
                </div>
                <div style={{ width: 104 }}>
                  <ConfidenceChip label={task.chip} />
                </div>
                <Avatar initials={task.assignee} color={task.assigneeColor} size={24} />
              </div>
            );
          })}
        </SectionCard>
      )}
    </div>
  );
}

export default TasksListPage;
