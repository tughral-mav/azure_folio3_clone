# BMAD Plan — Comparison Page: Folio3 vs Velosio

**Task slug:** `folio3-vs-velosio`
**Branch:** `claude/folio3-velosio-comparison-hqys80` (cut from `master`; never commit to master)
**Target URL:** `/compare/folio3-vs-velosio/`
**Status:** Analyst + PM + Architect complete → **awaiting framework approval (CHECKPOINT)** before Dev.

> Re-read this file after any branch switch, long tool run, or uncertainty. The plan is the source of truth, not memory.

---

## ANALYST — what I actually found (quoted from the real files)

### Routing & rendering
- Marketing pages are served by the catch-all `src/app/[...slug]/page.tsx` with `dynamicParams = false` +
  `generateStaticParams()` = `getMarketingSlugs()`. Unknown paths 404, so the page only exists once its JSON is present.
- `getMarketingSlugs()` (content.ts:370) reads every `content-kit/content/*.json`, recovers the real URL from the
  JSON's `url` field, and splits it into slug segments. So the **`url` field in the JSON drives the route**.
- File naming: `slugToFile(slug)` = lowercase, non-alphanumerics → `_`. So URL `/compare/folio3-vs-velosio/`
  ⇒ file **`content-kit/content/compare_folio3_vs_velosio.json`** and slugOfRoute **`compare_folio3_vs_velosio`**.
- `CapturedRenderer.tsx:66`: a page whose sections have a non-empty `items[]` renders through **OrderedRenderer**
  (modern, animated). Without `items[]` it silently downgrades to the legacy renderer. ⇒ **author with `items[]`**.

### Schema / metadata — auto-generated, NO component change needed
- `[...slug]/page.tsx` auto-emits **WebPage + BreadcrumbList** JSON-LD and derives title/description/canonical/OG
  from the JSON `meta` block.
- `Accordion.tsx:35` auto-emits **FAQPage** JSON-LD for any accordion it renders. ⇒ rendering the FAQ through the
  normal path gives us FAQ schema for free.

### The comparison-table renderer already exists (OrderedRenderer.tsx:359–385)
Triggers when a section has **exactly two** h3/h4 units, **each with ≥2 paragraphs**, AND the text of
`heading + the two column titles` matches `/\bvs\.?\b|versus|\bwins\b|traditional/i`. It renders two labelled
columns: the "traditional/legacy/other/…" one grey, the other **blue (highlighted)**. Column order in the JSON is
preserved. ⇒ Put **Velosio first (grey), Folio3 second (blue)**; give both columns the **same ordered set of
dimensions** so rows read as aligned.

### Card icons (OrderedRenderer generic grid + content.ts:153)
- Icons come from `content-kit/card-icons.json`, keyed by the **URL path** `"compare/folio3-vs-velosio"`
  (the ONLY sidecar keyed this way; all others use the underscored slug).
- Icon slug = card title lowercased, `&`→`and`, non-alphanumerics→`-`, **truncated to 50 chars**.
- A card with no manifest entry silently renders a generic checkmark. ⇒ add an entry for **every** card, reusing
  from the 322 existing SVGs in `public/icons/`.
- `card-icons.json` is **minified single-line** — add keys surgically, never pretty-print.

### FAQ sidecar
- `getFaqFull()` reads `content-kit/faq-full.json`, keyed by slugOfRoute `compare_folio3_vs_velosio`, shape
  `{ "heading": "...", "items": [{ "q": "...", "a": "..." }] }`. Needs **≥2 items** or the accordion returns null.

### Render-contract landmines that apply here
1. Every `img` item needs **true on-disk pixel `w`/`h`**; the hero illustration must be the first img with **w ≥ 180**
   or the hero image + entrance + float animation all silently vanish.
2. Hero subhead + every section intro must be a **paragraph** (`{"t":"p"}`), never a heading.
3. Cards show **only their first paragraph**; never put a closing line after the last card.
4. Minimum counts: trust band ≥2 logos, FAQ ≥2, "Explore More" ≥2, flip cards ≥2.

### Competitor & keyword research
- Competitor facts: gathered by a dedicated sourced-research pass (see `## RESEARCH` below). **Legal rule: only
  sourced, current, date-stamped claims; no disparagement; nothing unsourced ships.**
- Ahrefs (US, accessed 2026-07-24): branded space is small/low-difficulty —
  `velosio` 800 vol / KD 4; `velosio reviews` / `velosio competitors` / `velosio vs hitachi solutions` /
  `is velosio a good microsoft partner` all long-tail (10–20 vol). Category terms:
  `microsoft dynamics partner` 500 / KD 1, `dynamics 365 business central partner` 450 / KD 3,
  `business central implementation partner` 100. ⇒ bottom-funnel comparison intent; target branded "velosio" +
  vs/alternative/review terms, with Business-Central-partner category as secondary. Parent topic:
  "dynamics 365 implementation partner".

---

## PM — goal & acceptance criteria

**Goal:** Publish an honest, legally-safe `/compare/folio3-vs-velosio/` page that helps a buyer already evaluating
Velosio understand where Velosio is genuinely strong and where Folio3 differentiates, and converts them to a call.

**Acceptance criteria**
- Renders through OrderedRenderer (animated), not the legacy fallback.
- Hero image present with its Reveal wrapper; every image HTTP 200; zero console errors; no duplicated CTA band.
- Every heading/paragraph in the JSON appears in the rendered HTML (no dropped cards); 0 fallback checkmarks.
- Comparison concedes real Velosio strengths and wins only where Folio3 genuinely differentiates.
- Every competitor claim is sourced + current; no disparagement; no fabricated Folio3 stats.
- FAQ (≥2), FAQ schema, WebPage/Breadcrumb schema, meta title/description/canonical/OG, and image alt text all present.
- Lives under `/compare/`; internal links resolve on THIS branch.

## ARCHITECT — smallest change that satisfies it
Data-only. **No component/TS changes.** Three JSON edits:
1. `content-kit/content/compare_folio3_vs_velosio.json` — the page (with `items[]`).
2. `content-kit/faq-full.json` — add `compare_folio3_vs_velosio` FAQ entry.
3. `content-kit/card-icons.json` — add `compare/folio3-vs-velosio` icon map (surgical, minified).

## SM — stories (one section/file per story)
- **S1** Page scaffold + meta + hero (h1, paragraph subhead, CTA, real hero image w≥180).
- **S2** "At a glance" intro + honest positioning paragraph.
- **S3** Comparison table section (2-col vs renderer): Velosio (grey) vs Folio3 (blue), aligned dimensions.
- **S4** "Where Velosio is strong" concede card grid (sourced) + card-icons.
- **S5** "Where Folio3 differentiates" card grid + card-icons.
- **S6** FAQ (objection-led vs/alternative Qs) via faq-full.json.
- **S7** Closing CTA band → #pgForm (lead form auto-appended by renderer).
- **S8** QA: build + Playwright visual verification per the render contract.

## DECISIONS TAKEN ON THE MARKETER'S BEHALF (to confirm)
- URL `/compare/folio3-vs-velosio/`; single page under the `/compare/` hub (no separate hub index yet — thin with
  one page; cross-linking activates as more comparison pages are added).
- Use the existing 2-column comparison renderer rather than a new feature-matrix component (avoids component code).

## RESEARCH (sourced competitor facts) — accessed 2026-07-24

**Legal handling:** publish only the sourced, current facts below. Self-reported stats are labelled "per Velosio".
Flagged-stale or unverified items (below) are BANNED from the page.

**Positioning (their words):** "Empowering Innovation"; "Embrace Modern Technology with Confidence";
"Velosio partners with innovative companies to drive growth, efficiency, and digital transformation";
"30+ years of experience". [velosio.com, velosio.com/about-us/]

**Service scope:** Microsoft Dynamics 365 (Finance, SCM, Sales, Customer Service, Business Central, Field Service,
Project Operations); **Oracle NetSuite ERP** (a non-Microsoft ERP line); Power Platform; Azure; Microsoft 365;
legacy Dynamics AX/GP/NAV/SL. [velosio.com; corroborated g2.com/sellers/velosio]

**Company facts (own site):** team of **450** professionals; **10,000+** successful projects; HQ **Atlanta, GA**
(per their About page — do NOT cite Ohio); Microsoft **Solutions Partner** across all six designations; **Direct CSP
Tier 1**; **Inner Circle 2025–2026** member; **2023** Dynamics 365 Business Central US Partner of the Year.
[velosio.com/about-us/; Inner Circle 2025-2026 blog]

**Industries:** Professional Services, Agribusiness/Horticulture, Cannabis, Distribution, Manufacturing, Field
Services, Medical devices, Consulting. [velosio.com]

**Pricing:** No public pricing (quote-based). Clutch-listed indicative ranges: $100–$149/hr, $10,000+ min project
(Clutch's figures, not Velosio-published). [clutch.co/profile/velosio-0]

**Genuine strengths to CONCEDE:** full-Microsoft-stack breadth + NetSuite; top-tier Microsoft recognition (Inner
Circle, 2023 BC Partner of the Year); Clutch review themes = responsiveness, MS-ecosystem depth, project
management, value. [velosio.com; clutch.co/profile/velosio-0]

**Third-party ratings:** Clutch **4.8/5 (6 reviews)**; G2 **4.0/5 (only 2 reviews — always cite the count)**;
**no Gartner Peer Insights profile found**. [clutch.co; g2.com/sellers/velosio]

**BANNED from page (unverified/stale):** founding year 1984, CEO name, Ohio HQ, Sage offering, aggregator employee
counts (337), and the March-2023 self-reported "96% retention / NPS" stats unless explicitly attributed + dated.

## QA LOG (S8) — verified 2026-07-24

**Build:** `npm run build` ✓ (194/194 static pages). Both pages generated:
`.next/server/app/compare.html`, `.next/server/app/compare/folio3-vs-velosio.html`.

**Static HTML assertions (SSG DOM):**
- Every JSON heading + paragraph + FAQ Q/A present in rendered HTML → **0 missing**.
- Real card icons: 30 refs / **0 fallback checkmarks**.
- Comparison table columns: **Velosio = grey**, **Folio3 = blue** (correct concede/highlight).
- Single lead form (`<form>`=1; "Schedule a 1:1" count matches known-good page → no duplicate band).
- All 4 referenced upload images exist on disk.

**Playwright (live, prod server):**
- `/compare/` → 200, `/compare/folio3-vs-velosio/` → 200.
- **Zero console errors, zero 4xx responses** on both pages (the earlier `/compare/` breadcrumb 404 is fixed by the hub).
- Hero image found and inside a Reveal wrapper; 0 broken images.
- After full scroll + wait, **all 18 Reveals at opacity 1** (comparison columns + all cards visible).
- Cross-links resolve: hub → `/compare/folio3-vs-velosio/`; comparison breadcrumb → `/compare/`.
- Visual screenshots confirm table, both card grids (with icons), which-fits split, FAQ accordion, CTA band,
  lead form + Folio3 stat counters (5000+/700+/1000+/20+), footer.

**Defect found & fixed during QA:** auto-generated breadcrumb linked to `/compare/` which 404'd (no hub). Fixed by
adding the `/compare/` hub index page (data-only, no component change).

## FILES CHANGED (data-only, no component/TS edits)
- `azure-clone-next/content-kit/content/compare_folio3_vs_velosio.json` (new — the comparison page)
- `azure-clone-next/content-kit/content/compare.json` (new — the `/compare/` hub index)
- `azure-clone-next/content-kit/faq-full.json` (add `compare_folio3_vs_velosio` FAQ entry)
- `azure-clone-next/content-kit/card-icons.json` (add `compare/folio3-vs-velosio` icon map, surgical/minified)
- `docs/bmad/folio3-vs-velosio-plan.md` (this plan)
