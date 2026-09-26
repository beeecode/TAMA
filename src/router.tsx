import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppShell } from "@/components/layout/AppShell";
import { Icon } from "@/components/basics/Icon";
import { RouteErrorState } from "@/components/states/ErrorState";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { OnboardingShell } from "@/components/layout/OnboardingShell";

import { LandingPage } from "@/pages/landing/LandingPage";
import { SignUpPage } from "@/pages/sign-up/SignUpPage";
import { SignInPage } from "@/pages/sign-up/SignInPage";

import { WorkspaceStepPage } from "@/pages/onboarding/WorkspaceStepPage";
import { ConnectStepPage } from "@/pages/onboarding/ConnectStepPage";
import { BuildingStepPage } from "@/pages/onboarding/BuildingStepPage";
import { ReviewStepPage } from "@/pages/onboarding/ReviewStepPage";

import { HomePage } from "@/pages/home/HomePage";
import { TasksOverviewPage } from "@/pages/tasks/TasksOverviewPage";
import { TasksBoardPage } from "@/pages/tasks/TasksBoardPage";
import { TasksTimelinePage } from "@/pages/tasks/TasksTimelinePage";
import { TasksListPage } from "@/pages/tasks/TasksListPage";
import { TasksFilesPage } from "@/pages/tasks/TasksFilesPage";
import { ForecastPage } from "@/pages/forecast/ForecastPage";
import { InboxPage } from "@/pages/inbox/InboxPage";
import { TeamPage } from "@/pages/team/TeamPage";
import { DocumentsPage } from "@/pages/documents/DocumentsPage";
import { DocumentReaderPage } from "@/pages/documents/DocumentReaderPage";
import { AutomationsPage } from "@/pages/automations/AutomationsPage";
import { ReportingPage } from "@/pages/reporting/ReportingPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { AskPage } from "@/pages/ask/AskPage";

/** The design ships Calendar as a promise rather than a screen. */
function CalendarPlaceholder() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full text-center"
      style={{ minHeight: 400 }}
    >
      <span
        className="flex items-center justify-center rounded-2xl mb-4"
        style={{ width: 48, height: 48, background: "#F7F7F9" }}
      >
        <Icon name="calendar" size={22} className="text-text-tertiary" />
      </span>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          fontFamily: "var(--font-tight)",
          margin: "0 0 8px",
          color: "#16161D",
        }}
      >
        Calendar
      </h2>
      <p className="text-text-secondary" style={{ fontSize: 14 }}>
        Calendar view coming soon. Events from Google Calendar are already
        informing your forecasts.
      </p>
    </div>
  );
}

/**
 * Three route groups, each with its own shell:
 *   /             marketing
 *   /onboarding   first-run setup
 *   /app          the signed-in product
 */
export const router = createBrowserRouter([
  {
    element: <MarketingShell />,
    errorElement: <RouteErrorState />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/sign-in", element: <SignInPage /> },
  {
    path: "/onboarding",
    element: <OnboardingShell />,
    errorElement: <RouteErrorState />,
    children: [
      { index: true, element: <Navigate to="workspace" replace /> },
      { path: "workspace", element: <WorkspaceStepPage /> },
      { path: "connect", element: <ConnectStepPage /> },
      { path: "building", element: <BuildingStepPage /> },
      { path: "review", element: <ReviewStepPage /> },
    ],
  },
  {
    path: "/app",
    element: <AppShell />,
    errorElement: <RouteErrorState />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tasks", element: <TasksOverviewPage /> },
      { path: "tasks/board", element: <TasksBoardPage /> },
      { path: "tasks/timeline", element: <TasksTimelinePage /> },
      { path: "tasks/list", element: <TasksListPage /> },
      { path: "tasks/files", element: <TasksFilesPage /> },
      { path: "forecast", element: <ForecastPage /> },
      { path: "projects/:projectId", element: <ForecastPage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "team", element: <TeamPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "documents/:documentId", element: <DocumentReaderPage /> },
      { path: "automations", element: <AutomationsPage /> },
      { path: "reporting", element: <ReportingPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "calendar", element: <CalendarPlaceholder /> },
      { path: "ask", element: <AskPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export default router;
