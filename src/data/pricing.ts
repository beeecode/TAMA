import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan-team",
    name: "Team",
    tagline: "For one product team that wants dates it can defend.",
    monthly: 14,
    annual: 11,
    featured: false,
    ctaLabel: "Start free trial",
    features: [
      { text: "Up to 20 people", included: true },
      { text: "Delivery forecasts with drivers", included: true },
      { text: "GitHub, Slack and calendar sources", included: true },
      { text: "Board, timeline and list views", included: true },
      { text: "Attention inbox", included: true },
      { text: "Portfolio reporting", included: false },
      { text: "Custom agents", included: false },
      { text: "SAML and audit export", included: false },
    ],
  },
  {
    id: "plan-company",
    name: "Company",
    tagline: "For several teams delivering against the same roadmap.",
    monthly: 26,
    annual: 21,
    featured: true,
    ctaLabel: "Start free trial",
    features: [
      { text: "Unlimited people", included: true },
      { text: "Everything in Team", included: true },
      { text: "Portfolio reporting and accuracy tracking", included: true },
      { text: "Automations and custom agents", included: true },
      { text: "Jira, Linear and Notion sources", included: true },
      { text: "Forecast history and model tuning", included: true },
      { text: "SAML and audit export", included: false },
      { text: "Dedicated support", included: false },
    ],
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    tagline: "For organisations with procurement, auditors and a security team.",
    monthly: 0,
    annual: 0,
    featured: false,
    ctaLabel: "Talk to us",
    features: [
      { text: "Everything in Company", included: true },
      { text: "SAML, SCIM and audit export", included: true },
      { text: "Data residency options", included: true },
      { text: "Private model tuning on your history", included: true },
      { text: "Custom retention policies", included: true },
      { text: "Dedicated support and onboarding", included: true },
      { text: "Annual security review", included: true },
      { text: "99.9% uptime commitment", included: true },
    ],
  },
];

export const pricingQuestions: { id: string; question: string; answer: string }[] = [
  {
    id: "q-accuracy",
    question: "How accurate is a forecast in the first month?",
    answer:
      "Honest answer: wide. With under about six weeks of history the model says it is still calibrating and shows a wider band rather than a confident-looking number. Importing closed issues from Jira or Linear shortens that considerably, because the calibration runs on history rather than on the weeks you spend waiting.",
  },
  {
    id: "q-surveillance",
    question: "Is this a surveillance tool for managers?",
    answer:
      "No, and it is built so it cannot quietly become one. TAMA never scores individuals, never reads message content, and never uses a signal a person cannot see for themselves in the product. Every factor behind a forecast appears on the drivers list with the evidence it came from.",
  },
  {
    id: "q-estimates",
    question: "Do we still have to estimate everything?",
    answer:
      "Estimates help, but they are one input among four. Teams that estimate nothing still get forecasts from throughput history, dependency structure and queue times — the band is simply wider. Most teams find their estimates improve once they can see where they drift.",
  },
  {
    id: "q-switch",
    question: "We already use Jira. Do we have to move?",
    answer:
      "No. TAMA reads Jira and Linear two ways, so the board of record can stay where it is. Plenty of teams run TAMA purely as the forecasting and attention layer over the tracker they already have.",
  },
  {
    id: "q-wrong",
    question: "What happens when the forecast is wrong?",
    answer:
      "It gets recorded. The reporting page shows how often deliveries landed inside the band TAMA promised and the mean error in days, month by month. A forecasting tool that hides its own accuracy is not worth having.",
  },
  {
    id: "q-data",
    question: "Where does our data live, and who can see it?",
    answer:
      "In your region, on infrastructure we run. Your history trains your workspace's model and nothing else. Enterprise plans add residency options, SCIM provisioning and an audit export that covers every read of forecast data.",
  },
];

/** Logos on the landing strip. Fictional companies for the demo. */
export const customerLogos: string[] = [
  "Northwind",
  "Halyard",
  "Meridian",
  "Kestrel",
  "Ferrous",
  "Lantern",
];
