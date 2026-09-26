/**
 * Workspace documents. Titles and excerpts come from the design's Docs screen;
 * the bodies are written out here so the reader has something to read.
 *
 * `auto` marks a document TAMA keeps in sync from a connected source — those
 * carry the periwinkle treatment wherever they appear.
 */

export interface DocumentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface WorkspaceDocument {
  id: string;
  title: string;
  excerpt: string;
  edited: string;
  auto: boolean;
  projectId?: string;
  authors: { initials: string; color: string }[];
  readMinutes: number;
  sections: DocumentSection[];
}

export const documents: WorkspaceDocument[] = [
  {
    id: "q3-campaign-strategy",
    title: "Q3 Campaign Strategy",
    excerpt:
      "This document outlines the strategic direction for our Q3 summer campaign, including messaging hierarchy and channel strategy...",
    edited: "2h ago",
    auto: true,
    projectId: "vega",
    authors: [
      { initials: "CW", color: "#16161D" },
      { initials: "AM", color: "#EC4899" },
    ],
    readMinutes: 6,
    sections: [
      {
        heading: "What we are saying",
        paragraphs: [
          "One claim, carried across every channel: the summer range is built for people who did not plan ahead. Everything else is supporting evidence for that sentence.",
          "Messaging hierarchy runs claim, proof, offer — in that order, on every surface. Where a channel cannot carry all three, it carries the claim and drops the rest.",
        ],
      },
      {
        heading: "Channels and sequencing",
        paragraphs: [
          "Paid social opens two weeks ahead of the range going live, email follows at launch, and retail collateral lands the same week.",
        ],
        bullets: [
          "Paid social — 12 May, awareness only, no offer",
          "Email — 26 May, full hierarchy, segmented by last purchase",
          "Retail — 26 May, claim and proof on print, offer at till",
        ],
      },
      {
        heading: "What would change our minds",
        paragraphs: [
          "If paid social click-through sits under 1.2% after the first week, the claim is not landing and we rewrite rather than spend more. That decision belongs to the week of 19 May, not to launch week.",
        ],
      },
    ],
  },
  {
    id: "orion-api-gateway-spec",
    title: "Orion API Gateway Spec",
    excerpt:
      "Technical specification for the Orion API Gateway project. Includes auth requirements, rate limiting approach, and endpoint definitions...",
    edited: "1d ago",
    auto: false,
    projectId: "orion",
    authors: [{ initials: "TK", color: "#22C55E" }],
    readMinutes: 11,
    sections: [
      {
        heading: "Authentication",
        paragraphs: [
          "Every request carries a workspace-scoped token. Tokens are opaque to clients, rotate on a 90-day cycle, and a rotation never invalidates the outgoing token before the incoming one has been seen in use.",
          "Service-to-service calls use the same path. There is no second auth mechanism, because two mechanisms means one of them is the one nobody tests.",
        ],
      },
      {
        heading: "Rate limiting",
        paragraphs: [
          "A token bucket per workspace, refilled continuously rather than on a window boundary, so a burst at the turn of a minute cannot double the effective limit.",
        ],
        bullets: [
          "Read endpoints — 600 requests per minute",
          "Write endpoints — 120 requests per minute",
          "Exports — 5 concurrent, queued beyond that",
        ],
      },
      {
        heading: "Open questions",
        paragraphs: [
          "Whether the gateway owns retries or hands them back to callers is still unresolved, and it is the single biggest influence on the endpoint contract. It needs deciding before the auth work is considered done.",
        ],
      },
    ],
  },
  {
    id: "vega-brand-guidelines",
    title: "Vega Brand Guidelines",
    excerpt:
      "Brand guidelines for the Vega Brand Refresh project. Color tokens, typography scales, and usage rules...",
    edited: "3d ago",
    auto: true,
    projectId: "vega",
    authors: [{ initials: "AM", color: "#EC4899" }],
    readMinutes: 8,
    sections: [
      {
        heading: "Colour",
        paragraphs: [
          "The palette is deliberately narrow: one ink, one accent, three status colours. Status colours are reserved — they only ever mean on track, at risk or slipping, and never appear as decoration.",
        ],
      },
      {
        heading: "Typography",
        paragraphs: [
          "Bricolage Grotesque for anything that acts as a heading, Rubik for everything a person reads at length, and a monospace face for figures that need to line up in a column.",
          "Numbers that update in place always use tabular figures, so a forecast changing from 68% to 71% does not make the row jump.",
        ],
      },
    ],
  },
  {
    id: "q1-retrospective",
    title: "Q1 Retrospective",
    excerpt:
      "Key outcomes and learnings from Q1 2026. Delivered 3 of 5 major initiatives on time. Two projects slipped by an average of 6 days...",
    edited: "1w ago",
    auto: false,
    authors: [
      { initials: "CW", color: "#16161D" },
      { initials: "RK", color: "#8B5CF6" },
    ],
    readMinutes: 5,
    sections: [
      {
        heading: "What happened",
        paragraphs: [
          "Three of five initiatives landed on the committed date. The two that slipped did so by six days on average, and in both cases the forecast had been under P50 for more than a fortnight before anyone acted on it.",
        ],
      },
      {
        heading: "The pattern worth naming",
        paragraphs: [
          "The forecast was not wrong. It moved early, it moved visibly, and it was read as pessimism rather than as information. Both slips were predicted with a fortnight to spare.",
          "The fix is not a better model. It is agreeing in advance what we do when a commitment drops below P50 — which is now an automation rather than a habit.",
        ],
      },
    ],
  },
  {
    id: "team-onboarding-guide",
    title: "Team Onboarding Guide",
    excerpt:
      "Getting started with TAMA for new team members. Setting up integrations, understanding your first forecast...",
    edited: "2w ago",
    auto: false,
    authors: [{ initials: "SP", color: "#0D9488" }],
    readMinutes: 4,
    sections: [
      {
        heading: "Reading a forecast",
        paragraphs: [
          "Three dates, not one. P50 is a coin flip. P85 is the date to commit to externally. P95 is the date you can promise and expect to keep.",
          "A probability against a committed date is the honest version of a status colour — 68% means roughly two in three runs of this quarter finish in time, not that someone is behind.",
        ],
      },
      {
        heading: "When TAMA says it is learning",
        paragraphs: [
          "Under twenty completed items on a project, there is no forecast at all — an em dash and a count of signals so far. That is deliberate. A number built on nine data points would be worse than no number.",
        ],
      },
    ],
  },
  {
    id: "atlas-crm-migration-plan",
    title: "Atlas CRM Migration Plan",
    excerpt:
      "Runbook for migrating the contact database to the new Atlas CRM schema. Includes rollback procedures and data validation steps...",
    edited: "3d ago",
    auto: true,
    projectId: "atlas",
    authors: [{ initials: "SP", color: "#0D9488" }],
    readMinutes: 9,
    sections: [
      {
        heading: "The gate",
        paragraphs: [
          "Migration is a weekend, not a moment. The gate is that both schemas agree on every contact record, to the field, for two consecutive validation runs.",
        ],
        bullets: [
          "Dual-write running for 14 days with no unexplained mismatches",
          "Historical records backfilled and reconciled",
          "Rollback rehearsed end to end, not merely written down",
        ],
      },
      {
        heading: "Rollback",
        paragraphs: [
          "Rollback is a documented, rehearsed procedure that returns reads to the legacy schema within fifteen minutes. If it has not been rehearsed in the two weeks before cutover, it does not count as a rollback plan.",
        ],
      },
    ],
  },
];

export function getDocument(id: string | undefined): WorkspaceDocument | undefined {
  return documents.find((document) => document.id === id);
}
