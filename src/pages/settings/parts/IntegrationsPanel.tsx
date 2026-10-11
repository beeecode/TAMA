import { useState } from "react";
import { Button } from "@/components/basics/Button";
import { SourceIcon, SparkleIcon, type SourceName } from "@/components/basics/Icon";
import { SectionCard } from "@/components/layout/SectionBlock";

interface Integration {
  name: SourceName;
  category: string;
  connected: boolean;
  /** What this source actually contributes to a forecast. */
  signal: string;
  lastSync?: string;
}

const INTEGRATIONS: Integration[] = [
  {
    name: "Google Calendar",
    category: "Calendar",
    connected: true,
    signal: "Real working hours, holidays and how much of the week is already committed.",
    lastSync: "4 min ago",
  },
  {
    name: "Slack",
    category: "Messaging",
    connected: true,
    signal: "Channel volume around a project. A spike reliably precedes a task being marked blocked.",
    lastSync: "2 min ago",
  },
  {
    name: "Asana",
    category: "Tasks",
    connected: true,
    signal: "Completed work and its real cycle times — the history every forecast is calibrated on.",
    lastSync: "9 min ago",
  },
  {
    name: "Google Drive",
    category: "Storage",
    connected: false,
    signal: "Document activity on project files, used to spot scope arriving before it reaches a task.",
  },
  {
    name: "Notion",
    category: "Docs",
    connected: false,
    signal: "Specs and decision records. Tasks with a linked spec finish with about half the variance.",
  },
  {
    name: "Gmail",
    category: "Email",
    connected: false,
    signal: "External dependencies — approvals and client replies that hold work up.",
  },
  {
    name: "Jira",
    category: "Tasks",
    connected: false,
    signal: "Closed-issue history, which shortens the time TAMA spends learning.",
  },
  {
    name: "Figma",
    category: "Design",
    connected: false,
    signal: "Handoff timing — the usual reason front-end work starts later than planned.",
  },
];

export function IntegrationsPanel() {
  const [sources, setSources] = useState(INTEGRATIONS);
  const connectedCount = sources.filter((source) => source.connected).length;

  const toggle = (name: string) =>
    setSources((current) =>
      current.map((source) =>
        source.name === name ? { ...source, connected: !source.connected } : source,
      ),
    );

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex items-start gap-3 rounded-xl p-4"
        style={{ background: "#EEEFFC", border: "1px solid #DCDDF8" }}
      >
        <SparkleIcon size={16} />
        <div>
          <div className="text-ai-strong font-medium mb-0.5" style={{ fontSize: 13 }}>
            {connectedCount} sources connected
          </div>
          <div className="text-text-secondary" style={{ fontSize: 13 }}>
            Every source narrows the band. TAMA reads activity and timing only —
            never message content, and never anything it cannot show you on the
            drivers list.
          </div>
        </div>
      </div>

      <SectionCard>
        {sources.map((source, index) => (
          <div
            key={source.name}
            className="flex items-start gap-4 px-5"
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              borderTop: index > 0 ? "1px solid #EAEAEF" : "none",
            }}
          >
            <SourceIcon name={source.name} size={20} tile />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-semibold" style={{ fontSize: 13 }}>
                  {source.name}
                </span>
                <span className="text-text-tertiary" style={{ fontSize: 11 }}>
                  {source.category}
                </span>
                {source.connected && source.lastSync && (
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ background: "#E8F7F1", fontSize: 10, color: "#2F9E6B", fontWeight: 500 }}
                  >
                    Synced {source.lastSync}
                  </span>
                )}
              </div>
              <p
                className="text-text-secondary mt-1"
                style={{ fontSize: 12, lineHeight: "18px", margin: "4px 0 0", maxWidth: 460 }}
              >
                {source.signal}
              </p>
            </div>
            <Button
              variant={source.connected ? "ghost" : "secondary"}
              size="sm"
              onClick={() => toggle(source.name)}
            >
              {source.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

export default IntegrationsPanel;
