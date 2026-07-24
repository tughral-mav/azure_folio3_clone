# BMAD Plan — Burq × Dynamics 365 Business Central Integration Hub

Status: **AWAITING PM CONFIRMATION** (do not start Dev until the marketer approves the 3 answers below).

Slug (task): `burq-business-central-integration`

---

## ANALYST — what I actually read (quoted, not assumed)

Renderer contract verified against source, not the brief:

- `src/components/CapturedRenderer.tsx:66` — dispatch: a page where **any section has a non-empty
  `items[]`** renders through `OrderedRenderer`; otherwise the legacy path. Structure is
  `sections` = object/array of sections, **each section carries its own `items[]`** (confirmed by
  dumping `data_integration_as_a_service.json`: `sections["0".."17"]`, each `{items:[…]}`).
- `OrderedRenderer.tsx:144` — hero illustration = first image in the hero section's stream with
  `w >= 180`; `:181` gates the `<Reveal zoomIn>` visual on it.
- `OrderedRenderer.tsx:133-181` — hero: eyebrow = **page `title` prop**, which
  `[...slug]/page.tsx:41` computes as `titleFromSlug` (last URL segment, title-cased). The JSON
  cannot override the eyebrow. If the h1 text is ALL-CAPS and an h2 exists, the h2 becomes the
  visible headline and the h1 is dropped from view.
- Contract #4 confirmed live: `data_integration_as_a_service.json` hero is `[h1, h2(subhead), cta,
  img]` — the h2 subhead is an h2, so `h1u.paras[0]` is empty and **the subhead does not render**.
  => our hero subhead MUST be a `{"t":"p"}` in the h1 unit.
- Tabbed grid = `SectionTabs.tsx` fed by `content.ts:getPageTabs` → `content-kit/tabs-content.json`
  keyed by underscored slug; matched to a page section **by heading** (`OrderedRenderer.tsx:245`).
  A tab with no `img` renders the icon+title+body **list** layout — a perfect fit for
  "Platform / What syncs".
- Counters come ONLY from `content-kit/counters.json` (`content.ts:247`), matched to a section by
  heading; rendered in the single-block path (`OrderedRenderer.tsx:1171`). Not authored in page JSON.
- FAQ: `getFaqFull` → `faq-full.json` (paired Q&A, preferred, `content.ts:303`) OR `getFaq` →
  `faq.json` questions + answers pulled from the page JSON paragraphs (`OrderedRenderer.tsx:674`).
  The `faq.json` path uses `paras[0]` as a subtitle and **drops it from the answer list**, so it
  needs an intro line or the first answer is lost (verified against
  `data_integration_as_a_service` §15, which ships an intro paragraph before its 5 answers).
- Card icons: `content.ts:154 getCardIcon(slug,title)` → `card-icons.json[urlPath][iconSlug]`,
  `iconSlug` = lowercase, `&`→`and`, non-alnum→`-`, **sliced to 50 chars** (`content.ts:153`).
  No entry → generic checkmark. 302 SVGs on disk under `public/icons/<page>/`.
- Case-study photo-card path triggers on `/real results|success stories|client success|case stud/i`
  (`OrderedRenderer.tsx:651`) and needs images; a heading that avoids those words renders a normal
  icon card grid instead.
- `getMarketingSlugs` (`content.ts:370`) derives the route from each file's `url` field; single
  segment → no parent breadcrumb.

## PM — goal & acceptance criteria

Goal: publish the Burq × Business Central integration hub page as content-kit JSON served by the
existing catch-all renderer, matching the site theme, using ONLY the brief copy.

Acceptance:
- Renders through `OrderedRenderer` (items[] present), hero image + Reveal present, 0 console errors.
- Every heading/paragraph in the copy appears in the rendered HTML.
- 0 fallback checkmark card icons (every card has a real reused SVG) — or each exception reported.
- All images HTTP 200; all internal links resolve on THIS branch (no 404s).
- FAQ pairs correctly (6 Q ↔ 6 A); tabbed grid shows 4 tabs with correct rows.
- No duplicated CTA band; #pgForm lead form present (hero CTAs resolve).

## URL / model / gaps — see chat message to marketer (the 3 required answers).

## ARCHITECT — smallest change

Data-only. New files / surgical edits, NO component code:
1. `content-kit/content/dynamics_365_business_central_integration.json` (new page, items[] model).
2. `content-kit/tabs-content.json` — add key `dynamics_365_business_central_integration` (integrations tabs).
3. `content-kit/counters.json` — add key (3 social-proof stats).
4. `content-kit/faq-full.json` — add key (6 paired Q&A).  + `faq.json` add questions (compliance).
5. `content-kit/card-icons.json` — add key with one entry per card (surgical, single-line, minified).

## SM — stories (one section/file per story)
- S1 hero  · S2 problem 3-card · S3 solution band · S4 integrations tabs (+tabs-content)
- S5 what-syncs 8-card · S6 why 4-card · S7 stats counters (+counters.json) · S8 case-study 3-card
- S9 FAQ (+faq-full/faq) · S10 closing CTA band · S11 card-icons for all cards
- S12 build · S13 Playwright visual verify

## Decisions taken on the marketer's behalf (confirm)
- Page URL on our clone: `/dynamics-365-business-central-integration/`.
- "What Syncs" table → 8-card grid (object = title; direction + meaning = body).
- Social-proof numbers → animated counters under a neutral heading "By the Numbers".
- Customer logo grid (Zippo, Polyco Healthline, RDX, Britax, AXON, Bioworld, HandsFree Health,
  Franklin Creative, Montana Silversmiths, Iovate) → **DROPPED** (no logo assets on our site).
- Case studies → 3 plain text cards; "See all case studies →" link dropped (no index → would 404).
- All CTAs (incl. "See All Integrations") → on-page lead form `#pgForm` (no separate pages exist).
- FAQ answers via `faq-full.json` for reliable pairing; questions also mirrored into `faq.json`.
