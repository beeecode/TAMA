import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { EmptyState } from "@/components/states/EmptyState";
import { getDocument } from "@/data/documents";
import { projects } from "@/data/projects";

/** Reading width — prose gets a column, not the full page. */
const READING_WIDTH = 680;

export function DocumentReaderPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const doc = getDocument(documentId);

  if (!doc) {
    return (
      <EmptyState
        title="That document does not exist"
        body="It may have been deleted, or the link may be out of date."
        actionLabel="Back to docs"
        onAction={() => navigate("/app/documents")}
      />
    );
  }

  const project = projects.find((p) => p.id === doc.projectId);

  return (
    <div>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate("/app/documents")}
        className="flex items-center gap-1.5 mb-6 cursor-pointer text-text-tertiary hover:text-text-secondary transition-colors"
        style={{ background: "none", border: "none", padding: 0, fontSize: 12 }}
      >
        <Icon name="chevronLeft" size={12} />
        Workspace / Docs
      </button>

      <div style={{ maxWidth: READING_WIDTH }}>
        <div className="flex items-start justify-between gap-6 mb-4">
          <h1
            style={{
              fontSize: 34,
              fontWeight: 600,
              fontFamily: "var(--font-tight)",
              letterSpacing: "-0.005em",
              margin: 0,
              color: "#16161D",
            }}
          >
            {doc.title}
          </h1>
          <div className="flex items-center gap-2 flex-shrink-0 mt-2">
            <Button variant="secondary" size="sm">Share</Button>
            <Button variant="secondary" size="sm">Edit</Button>
          </div>
        </div>

        {/* Meta */}
        <div
          className="flex items-center gap-3 pb-6 mb-8"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          <div className="flex -space-x-1.5">
            {doc.authors.map((author) => (
              <Avatar
                key={author.initials}
                initials={author.initials}
                color={author.color}
                size={22}
              />
            ))}
          </div>
          <span className="text-text-tertiary" style={{ fontSize: 12 }}>
            Edited {doc.edited} · {doc.readMinutes} min read
          </span>
          {project && (
            <span className="flex items-center gap-1.5 ml-1">
              <span
                className="rounded"
                style={{ width: 8, height: 8, background: project.color, borderRadius: 2 }}
              />
              <span className="text-text-tertiary" style={{ fontSize: 12 }}>
                {project.name}
              </span>
            </span>
          )}
          {doc.auto && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full ml-auto"
              style={{ background: "#EEEFFC", fontSize: 10, color: "#5F63C9", fontWeight: 500 }}
            >
              <SparkleIcon size={10} />
              Auto-synced
            </span>
          )}
        </div>

        {/* Lede */}
        <p
          className="text-text-secondary mb-8"
          style={{ fontSize: 16, lineHeight: "26px", margin: "0 0 32px" }}
        >
          {doc.excerpt}
        </p>

        {/* Body */}
        {doc.sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2
              className="text-text-primary"
              style={{
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "var(--font-tight)",
                margin: "0 0 12px",
              }}
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-text-primary"
                style={{ fontSize: 15, lineHeight: "26px", margin: "0 0 16px" }}
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="flex flex-col gap-2 mt-2" style={{ paddingLeft: 0, listStyle: "none" }}>
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{ width: 5, height: 5, background: "#D5D5DE", marginTop: 10 }}
                    />
                    <span
                      className="text-text-primary"
                      style={{ fontSize: 15, lineHeight: "26px" }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {doc.auto && (
          <div
            className="flex items-start gap-3 rounded-xl p-4 mt-10 mb-16"
            style={{ background: "#EEEFFC", border: "1px solid #DCDDF8" }}
          >
            <SparkleIcon size={16} />
            <div>
              <div className="text-ai-strong font-medium mb-0.5" style={{ fontSize: 13 }}>
                TAMA keeps this document in sync
              </div>
              <div className="text-text-secondary" style={{ fontSize: 13 }}>
                Changes in the connected source appear here. TAMA flags a
                section when the plan it describes no longer matches the work.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentReaderPage;
