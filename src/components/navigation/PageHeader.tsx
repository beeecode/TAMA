import type { ReactNode } from "react";

export interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  /** One line saying what this screen is for, in plain language. */
  description?: string;
  children?: ReactNode;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  children,
  tabs,
  activeTab,
  onTabChange,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="text-text-tertiary mb-1" style={{ fontSize: 12 }}>
            {breadcrumb}
          </div>
          <h1
            className="text-text-primary"
            style={{
              fontSize: 34,
              fontWeight: 600,
              lineHeight: "40px",
              fontFamily: "var(--font-tight)",
              letterSpacing: "-0.005em",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-text-secondary"
              style={{ fontSize: 14.5, margin: "6px 0 0", maxWidth: 560 }}
            >
              {description}
            </p>
          )}
        </div>
        {children && <div className="flex items-center gap-2 mt-2">{children}</div>}
      </div>
      {tabs && (
        <div
          className="flex items-center gap-6 mt-4"
          style={{ borderBottom: "1px solid #EAEAEF" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className="pb-3 transition-colors cursor-pointer"
              style={{
                fontSize: 13,
                fontWeight: activeTab === tab ? 500 : 400,
                color: activeTab === tab ? "#16161D" : "#62626F",
                marginBottom: -1,
                background: "none",
                border: "none",
                borderBottomWidth: 2,
                borderBottomStyle: "solid",
                borderBottomColor: activeTab === tab ? "#16161D" : "transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
