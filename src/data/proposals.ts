import { useSyncExternalStore } from "react";

/**
 * Suggestions TAMA has raised, and which of them are still open.
 *
 * This is shared state rather than page state: the sidebar badge, the top-bar
 * bell and the inbox all show the same count, so clearing the inbox has to
 * clear them too.
 */
export interface Proposal {
  id: string;
  title: string;
  /** The because line. A suggestion never appears without its reason. */
  rationale: string;
  source: string;
}

export const allProposals: Proposal[] = [
  { id: 'p1', title: 'Draft Q3 campaign kickoff task', rationale: '8 Slack messages reference campaign planning in #vega-brand this week', source: 'FROM SLACK' },
  { id: 'p2', title: 'Schedule API security review', rationale: 'Auth spec meeting ran 45 min over — follow-up likely needed', source: 'FROM CALENDAR' },
  { id: 'p3', title: 'Create CRM data migration checklist', rationale: '14 messages and 3 docs reference migration readiness', source: 'FROM SLACK' },
  { id: 'p4', title: 'Brief stakeholders on new brand direction', rationale: 'Decision log shows 6 unanswered questions from last review', source: 'FROM TAMA' },
  { id: 'p5', title: 'Set up weekly throughput review meeting', rationale: 'Forecast accuracy improves 12% for teams with weekly reviews', source: 'FROM TAMA' },
  { id: 'p6', title: 'Update Nimbus Dashboard roadmap', rationale: '3 scope changes logged since last roadmap update 2 weeks ago', source: 'FROM TAMA' },
  { id: 'p7', title: 'Sync with Tom on API gateway blockers', rationale: 'Tom has 2 tasks blocked for 3+ days. A sync typically unblocks within 1 day.', source: 'FROM TAMA' },
  { id: 'p8', title: 'Write post-mortem for Q2 delivery slip', rationale: 'Orion API Gateway slipped by 8 days. Decision log has full context.', source: 'FROM TAMA' },
  { id: 'p9', title: 'Review and close 5 stale tasks', rationale: '5 tasks have had no activity in 14+ days across 3 projects', source: 'FROM TAMA' },
  { id: 'p10', title: 'Update project description for Helio', rationale: 'Description hasn\'t been updated since project start — 4 members added since', source: 'FROM TAMA' },
  { id: 'p11', title: 'Send monthly forecast summary to leadership', rationale: 'Last sent 6 weeks ago. Q1 summary typically sent in week 2.', source: 'FROM TAMA' },
];

/* -- Store ---------------------------------------------------------------- */

let openIds: string[] = allProposals.map((proposal) => proposal.id);
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

/** Stable reference while nothing changes, as useSyncExternalStore requires. */
function getOpenIds() {
  return openIds;
}

function getOpenCount() {
  return openIds.length;
}

/** Resolving is always reversible — pass the returned ids back to restore. */
export function resolveProposals(ids: string[]): string[] {
  const previous = openIds;
  openIds = openIds.filter((id) => !ids.includes(id));
  emit();
  return previous;
}

export function restoreProposals(ids: string[]) {
  openIds = ids;
  emit();
}

export function resetProposals() {
  openIds = allProposals.map((proposal) => proposal.id);
  emit();
}

export function useOpenProposals(): Proposal[] {
  const ids = useSyncExternalStore(subscribe, getOpenIds, getOpenIds);
  return allProposals.filter((proposal) => ids.includes(proposal.id));
}

export function useOpenProposalCount(): number {
  return useSyncExternalStore(subscribe, getOpenCount, getOpenCount);
}
