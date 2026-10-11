import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { SparkleIcon } from "@/components/basics/Icon";
import { SectionCard } from "@/components/layout/SectionBlock";
import { PageHeader } from "@/components/navigation/PageHeader";
import { TASK_TABS, TASK_TAB_ROUTES, type TaskTab } from "@/data/navigation";
import { projects } from "@/data/projects";

interface FileRow {
  id: string;
  name: string;
  kind: string;
  projectId: string;
  size: string;
  source: string;
  addedBy: string;
  addedByColor: string;
  added: string;
  /** Files TAMA pulled in itself while reading a source. */
  auto?: boolean;
}

const FILES: FileRow[] = [
  { id: "f1", name: "Summer campaign brief.pdf", kind: "PDF", projectId: "vega", size: "2.4 MB", source: "Google Drive", addedBy: "CW", addedByColor: "#16161D", added: "2h ago" },
  { id: "f2", name: "Auth flow — gateway spec.fig", kind: "FIG", projectId: "orion", size: "8.1 MB", source: "Figma", addedBy: "TK", addedByColor: "#22C55E", added: "1d ago" },
  { id: "f3", name: "CRM field mapping.xlsx", kind: "XLS", projectId: "atlas", size: "640 KB", source: "Google Drive", addedBy: "SP", addedByColor: "#0D9488", added: "2d ago" },
  { id: "f4", name: "Migration readiness checklist.md", kind: "DOC", projectId: "atlas", size: "18 KB", source: "Notion", addedBy: "SP", addedByColor: "#0D9488", added: "3d ago", auto: true },
  { id: "f5", name: "Brand direction — round 2.pdf", kind: "PDF", projectId: "vega", size: "12.8 MB", source: "Google Drive", addedBy: "AM", addedByColor: "#EC4899", added: "4d ago" },
  { id: "f6", name: "Q2 delivery post-mortem.docx", kind: "DOC", projectId: "orion", size: "84 KB", source: "Google Drive", addedBy: "RK", addedByColor: "#8B5CF6", added: "1w ago", auto: true },
  { id: "f7", name: "Onboarding wireframes.fig", kind: "FIG", projectId: "nimbus", size: "5.2 MB", source: "Figma", addedBy: "SP", addedByColor: "#0D9488", added: "1w ago" },
  { id: "f8", name: "Token audit results.csv", kind: "CSV", projectId: "helio", size: "112 KB", source: "Google Drive", addedBy: "AM", addedByColor: "#EC4899", added: "2w ago" },
];

const KIND_COLOR: Record<string, string> = {
  PDF: "#D64545",
  FIG: "#8B5CF6",
  XLS: "#2F9E6B",
  DOC: "#3B82F6",
  CSV: "#E0A32E",
};

export function TasksFilesPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Workspace / Tasks"
        title="Tasks"
        description="Files from the tools you connected, linked to the work they belong to."
        tabs={[...TASK_TABS]}
        activeTab="Files"
        onTabChange={(next) => navigate(TASK_TAB_ROUTES[next as TaskTab])}
      >
        <Button variant="secondary" size="sm">Filter</Button>
        <Button variant="primary" size="sm">Upload</Button>
      </PageHeader>

      {/* Files arrive from the same sources the forecast reads. */}
      <div
        className="flex items-start gap-3 rounded-xl p-4 mb-6"
        style={{ background: "#EEEFFC", border: "1px solid #DCDDF8" }}
      >
        <SparkleIcon size={16} />
        <div>
          <div className="text-ai-strong font-medium mb-0.5" style={{ fontSize: 13 }}>
            Two files linked automatically
          </div>
          <div className="text-text-secondary" style={{ fontSize: 13 }}>
            TAMA attached files referenced in Slack and Notion to the projects
            they belong to. Linked files count as signal when they move.
          </div>
        </div>
      </div>

      <SectionCard>
        <div
          className="flex items-center gap-3 px-5"
          style={{ height: 36, borderBottom: "1px solid #EAEAEF", background: "#F7F7F9" }}
        >
          <span
            className="text-text-tertiary uppercase flex-1"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
          >
            Name
          </span>
          <span
            className="text-text-tertiary uppercase"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 150 }}
          >
            Project
          </span>
          <span
            className="text-text-tertiary uppercase"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 110 }}
          >
            Source
          </span>
          <span
            className="text-text-tertiary uppercase"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 72 }}
          >
            Size
          </span>
          <span
            className="text-text-tertiary uppercase"
            style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 84 }}
          >
            Added
          </span>
          <span style={{ width: 24 }} />
        </div>

        {FILES.map((file, index) => {
          const project = projects.find((p) => p.id === file.projectId);
          return (
            <div
              key={file.id}
              className="flex items-center gap-3 px-5 hover:bg-surface-hover transition-colors cursor-pointer"
              style={{ height: 52, borderTop: index > 0 ? "1px solid #EAEAEF" : "none" }}
            >
              <div
                className="flex items-center justify-center rounded flex-shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: "#F7F7F9",
                  border: "1px solid #EAEAEF",
                  fontSize: 8,
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  color: KIND_COLOR[file.kind] ?? "#62626F",
                }}
              >
                {file.kind}
              </div>
              <span className="flex-1 text-text-primary truncate" style={{ fontSize: 13 }}>
                {file.name}
              </span>
              {file.auto && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "#EEEFFC", fontSize: 10, color: "#5F63C9", fontWeight: 500 }}
                >
                  <SparkleIcon size={10} />
                  Linked
                </span>
              )}
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
              <span className="text-text-secondary" style={{ fontSize: 12, width: 110 }}>
                {file.source}
              </span>
              <span
                className="text-text-tertiary"
                style={{ fontSize: 12, fontFamily: "var(--font-mono)", width: 72 }}
              >
                {file.size}
              </span>
              <span className="text-text-tertiary" style={{ fontSize: 12, width: 84 }}>
                {file.added}
              </span>
              <Avatar initials={file.addedBy} color={file.addedByColor} size={24} />
            </div>
          );
        })}
      </SectionCard>
    </div>
  );
}

export default TasksFilesPage;
