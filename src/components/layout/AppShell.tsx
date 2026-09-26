import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Sidebar } from "@/components/navigation/Sidebar";
import { Icon, SparkleIcon } from "@/components/basics/Icon";
import { TaskDetailPanel } from "@/pages/tasks/TaskDetailPanel";
import { routeFor, screenFor } from "@/data/navigation";
import { useOpenProposalCount } from "@/data/proposals";

/**
 * Chrome around every signed-in page: sidebar, top bar, and the task
 * slide-over. Ported from the design's App.tsx, with its screen switch
 * replaced by the router.
 */
export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const inboxCount = useOpenProposalCount();

  const active = screenFor(location.pathname);
  const onNavigate = (screen: string) => navigate(routeFor(screen));

  // ⌘K / Ctrl-K opens Ask TAMA. The top bar has always advertised the
  // shortcut; this is what makes it true.
  const onAsk = active === "ask";
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (!onAsk) navigate(routeFor("ask"));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, onAsk]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FFFFFF" }}>
      <Sidebar active={active} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: 52, borderBottom: "1px solid #EAEAEF", background: "#FFFFFF" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("ask")}
              className="flex items-center gap-2 px-3 rounded-lg transition-colors cursor-pointer hover:bg-surface-hover"
              style={{
                height: 36,
                background: "#EEEFFC",
                border: "1px solid #DCDDF8",
                fontSize: 13,
              }}
            >
              <SparkleIcon size={14} />
              <span className="text-ai-strong">Ask TAMA</span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "#8B8FE8",
                  padding: "1px 5px",
                  background: "#DCDDF8",
                  borderRadius: 4,
                }}
              >
                ⌘K
              </span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("inbox")}
              aria-label="Inbox"
              className="relative p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
              style={{ background: "none", border: "none" }}
            >
              <Icon name="inbox" size={18} color="#62626F" />
              {inboxCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 rounded-full text-white flex items-center justify-center"
                  style={{
                    width: 15,
                    height: 15,
                    background: "#8B8FE8",
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {inboxCount}
                </span>
              )}
            </button>
            <div
              className="flex items-center justify-center rounded-full text-white font-semibold cursor-pointer"
              style={{
                width: 32,
                height: 32,
                background: "#16161D",
                fontSize: 12,
                fontFamily: "var(--font-tight)",
              }}
            >
              CW
            </div>
          </div>
        </div>

        {/* Main content. Keyed on the path so each page animates in. */}
        <div className="flex-1 overflow-y-auto p-8">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Task detail slide-over */}
      {showTaskDetail && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: "rgba(22,22,29,0.2)" }}
            onClick={() => setShowTaskDetail(false)}
          />
          <TaskDetailPanel onClose={() => setShowTaskDetail(false)} />
        </>
      )}

      {/* The design's own affordance for reaching the task detail panel. */}
      <button
        onClick={() => setShowTaskDetail(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full shadow-lg cursor-pointer z-30 transition-all hover:scale-105"
        style={{
          background: "#16161D",
          border: "none",
          color: "white",
          padding: "10px 18px",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        <Icon name="list" size={14} />
        Open task detail
      </button>
    </div>
  );
}

export default AppShell;
