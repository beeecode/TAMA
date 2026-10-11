# TAMA

Task tracking where every date carries a probability. TAMA reads how a team
actually delivers, then quotes the odds of hitting a date — before anyone
commits to it.

Front end only: Vite + React + TypeScript + Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, then build to dist/
npm run typecheck
```

## Stack

| | |
|---|---|
| Framework | React 19, react-router-dom 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file) |
| Charts | Recharts |
| Icons | Phosphor, plus Simple Icons for brand marks |
| Build | Vite 5, TypeScript 5.7 |

### Voice

**Bricolage Grotesque** sets every heading, **Rubik** everything read at
length, and **Geist Mono** the figures. Both text faces are variable, and
optical sizing is left on `auto` so Bricolage adjusts its contrast between a
13px label and a 62px headline by itself.

Headlines emphasise one or two words with Rubik's true italic at a light
weight — `<span className="accent">odds</span>`. Against Bricolage's upright
that contrast carries the emphasis without a third typeface. It is reserved
for headlines: never body copy, never UI labels.

The families load from a `<link>` in `index.html` with preconnect, not a CSS
`@import`, so the request starts before the stylesheet has parsed.

The page background stays white. Warmth comes from inset panels using
`--color-wash-warm`, `--color-wash-sand` and `--color-wash-cool`, and from the
`.bloom` class, which puts a soft periwinkle-and-sand glow behind the hero. Kill
`.bloom` and drop the washes and the page is pure white again.

**Inside the app, voice goes in the chrome and never in the data.** Page
headers, greetings, empty states and microcopy are where TAMA sounds like a
person. Forecast numbers, bars, tables and charts stay flat and literal —
softening those would cost legibility, which is the one thing this product
cannot trade.

### Icons

Everything goes through `components/basics/Icon.tsx`. Screens never draw an SVG
path — they name a glyph:

```tsx
<Icon name="forecast" size={18} weight="fill" />
```

That one file maps ~54 names onto Phosphor components, so the whole product can
change weight or swap icon library without touching a screen. `weight="fill"`
is reserved for emphasis: active navigation, confirmations, and the AI sparkle.

`SourceIcon` renders the connected tools as real brand logos in their own
colours. Two caveats worth knowing:

- Simple Icons **dropped Slack's logo** over trademark policy, so Slack falls
  back to a chat mark in its aubergine. It is the one source that is not an
  authentic logo.
- Real brand colours reintroduce orange (Asana's coral, Gmail's red). Pass
  `monochrome` to `SourceIcon`, or flip its default, to render every mark in
  ink instead.

The only inline SVGs left in the codebase are the sparklines in
`AutomationsPage` and `TeamPage` — those draw polylines from data and are
charts, not iconography.

## Layout

```
src/
  design/       base.css (the CSS entry) · tokens.css (@theme) · fonts.css
  types/        domain types (tasks, forecasts, proposals, people…)
  helpers/      dates, numbers, chart scales, forecast maths
  data/         fixture data + the screen-id→route map
  components/   basics · forecast · charts · cards · navigation · layout · states
  pages/        one folder per route
  router.tsx    marketing, onboarding and app route groups
```

## Where the UI came from

The interface was designed in Figma Make and ported into this structure. The
design's 15 screens became pages, its flat `ui.tsx` was split across the
component folders, and its `useState` screen switch was replaced by the router.
Screens still call each other by the design's names (`'home'`, `'board'`,
`'signup'`); `routeFor()` in `data/navigation.ts` translates at the edge.

### Colour

The design shipped with an orange action colour. That has been replaced
throughout with the ink black already used for text:

```
--color-action: #16161d   --color-action-hover: #000000
--color-action-subtle: #f0f0f4
```

The design's second orange was categorical, not brand — a project swatch
sitting alongside green, violet, pink and blue. Black would have read as the
brand colour and destroyed the "different project" signal, so it became teal
`#0D9488`.

Amber `--color-at-risk: #e0a32e` is untouched. It is one of three semantic
delivery-status colours (green / amber / red) and means something; changing it
would break the status vocabulary.

Anything TAMA inferred or generated is marked in periwinkle
(`--color-ai-strong`). That hue means "not written by a person" and is not used
decoratively.

### Built on top of the design

The design covered 15 screens. These extend it in the same language:

- **Setup steps 1, 3 and 4** — the design only drew *connect*. The flow is now
  workspace → connect → building → review, following the landing page's own
  "Connect · Learn · Forecast" story.
- **Tasks Lists and Files** — two of the five tab names had no screen behind
  them.
- **Document reader** at `/app/documents/:documentId`.
- **Per-project forecasts** at `/app/projects/:projectId`. A project under the
  signal threshold opens in its learning state automatically.
- **Settings** — General, Members, Integrations, Notifications and Security
  (Forecasting and Billing came from the design).
- **States** — `LearningState`, `EmptyState`, `ErrorState`, `Toast`. The inbox
  now actually resolves suggestions, with undo.

### Not built

- **Calendar** — the design deliberately ships a "coming soon" panel. Left as
  the designer left it.
- **`LoadingSkeleton`** — nothing in the app loads asynchronously yet, so it
  would be dead code.
- Most `parts/` folders are still placeholders. `landing/parts` is the
  exception — all eleven sections are real. Elsewhere the UI exists inline in
  each page; pulling it out is cleanup to do when touching a page, not a job of
  its own.

### Conventions

- `@/` resolves to `src/`.
- Colour, type and elevation live in `design/tokens.css` as `@theme` tokens, so
  every name is also a utility: `--color-action` gives `bg-action`,
  `text-action`, `border-action`.
- The domain layer under `types/`, `helpers/` and `data/` is wired for the app
  but the ported screens still carry the design's own inline fixture data.
  Replacing that is the next step.
