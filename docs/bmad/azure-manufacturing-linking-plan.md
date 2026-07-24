# BMAD Plan — Internal Linking Pass for `/azure-for-manufacturing/`

Branch: `claude/azure-manufacturing-linking-d9plpk` (designated by harness)
Status: **AWAITING USER APPROVAL of the link table (checkpoint before any edit)**
Last updated: 2026-07-24

---

## ANALYST — what I actually found (quoted from the real files)

### How internal links work on these pages (no guessing — read from source)
There is **no inline mid-paragraph link** mechanism in this data model. Two data-only
levers exist, both driven by `content-kit/content-links.json`:

1. **"Explore More Services" related-services nav** — `getPageLinks(url)` in
   `src/lib/content.ts:185` reads the page's OWN key in `content-links.json` and the
   renderer prints a card grid:
   > `OrderedRenderer.tsx:728` — `if (moreLinks.length >= 2) out.push(<section> …Explore More Services…`
   This is **per-page** (reads only the `azure_for_manufacturing` map) → zero effect on
   any other page. Renders with `<Reveal animation="fadeInUp">` (animated). Each card is
   an `h3` + "Explore →" arrow — **no card icon needed**.

2. **Whole card-TITLE links** — `getContentLink(title)` in `src/lib/content.ts:167` is
   **GLOBAL**: it links any card whose title matches a key, but only if that key maps to
   ONE consistent target across every page. Risk: a key can affect cards on OTHER pages.

### Current state of the manufacturing page's link map
`content-kit/content-links.json` → key `azure_for_manufacturing`:
```
{"read more": "/city-university-azure/"}
```
Only **1** link → below the `>= 2` threshold → **the "Explore More Services" section does
not render at all today.** The page's other links are CTAs to `#pgForm`/`/contact-us/`
and two case-study "Read More" links (`/savills/`, `/city-university-azure/`).
=> The manufacturing page currently links out to almost no other service/industry pages.

### Inbound-link graph (which relevant targets are orphans / under-linked)
Counted inbound references across all `content-links.json` maps:

| Target (all verified to resolve on THIS branch) | # inbound | status |
|---|---|---|
| `/azure-data-analytics/manufacturing-data-analytics/` | 0 | **ORPHAN** — perfect topical match |
| `/azure-data-analytics/supply-chain-analytics/` | 0 | **ORPHAN** — core page theme |
| `/power-bi-services/` | 0 | **ORPHAN** |
| `/microsoft-power-platform-services/` | 0 | **ORPHAN** |
| `/azure-for-logistics-and-transport/` | 0 | **ORPHAN** — sibling industry |
| `/azure-for-construction/` | 0 | **ORPHAN** — sibling industry |
| `/azure-managed-services/` | 2 | under-linked |
| `/data-integration-as-a-service/` | 2 | under-linked |
| `/microsoft-fabric-services/` | 3 | ok |
| `/data-science-ai/` | 4 | ok |
| `/azure-cloud-service/` | 4 | ok |

### Collision check for proposed anchor keys (against `getContentLink` global effect)
Scanned every page's headings for my candidate keys:
- `azure cloud services` — **collides**: appears as an `h3` card on `/services/`
  (services.json). Adding this key would ALSO turn that card into a link to
  `/azure-cloud-service/` (a correct link, but a side effect on another page).
- `microsoft fabric services`, `azure managed services` — already resolve globally to
  their correct targets, so adding them changes nothing elsewhere (safe).
- `manufacturing data analytics`, `supply chain analytics`, `power bi services`,
  `data science and ai`, `azure for logistics and transport` — no heading collisions
  anywhere (safe; affect only the manufacturing nav).

### Render-contract compliance
- Only editing `content-links.json` (data). Page JSON untouched → hero image/animation,
  items[] stream, cards, FAQ all unaffected.
- Adding ≥2 links satisfies the `>= 2` rule so the section renders.
- No card-icons.json changes needed (nav cards use the built-in arrow, not icons).

---

## PM — goal & acceptance criteria

**Goal:** Give `/azure-for-manufacturing/` a curated set of in-site links to its most
relevant, currently orphan/under-linked service & industry pages — improving the internal
link graph and passing link equity to orphan pages — WITHOUT touching component code, the
home page, or the page's own content JSON.

**Acceptance criteria:**
1. The "Explore More Services" section renders on `/azure-for-manufacturing/` with the
   approved links, animated, no duplicate section.
2. Every new link resolves (HTTP 200 / valid route) on THIS branch — no 404s.
3. Priority given to orphan pages (0 inbound) that are topically relevant.
4. No change to the home page or any page's rendering beyond what's disclosed & approved.
5. `npm run build` passes; page verified in a real browser (counts, not a text dump).
6. Link density stays natural (one curated related-services nav, ≤ ~9 cards).

---

## ARCHITECT — smallest change that satisfies it

Edit ONE file, surgically (single-line minified JSON), adding entries to the existing
`azure_for_manufacturing` key. No component code. No other content files.

---

## PROPOSED LINK TABLE (CHECKPOINT — needs approval before edit)

Source page: `/azure-for-manufacturing/`. Placement: new **"Explore More Services"** nav
(auto-rendered after the FAQ / before the contact form). Anchor text = the card label.

| # | Anchor text (card label) | Target | Why (relevance) | Target status |
|---|---|---|---|---|
| 1 | Manufacturing Data Analytics | `/azure-data-analytics/manufacturing-data-analytics/` | Manufacturing-specific analytics — the single most on-topic page | **ORPHAN** |
| 2 | Supply Chain Analytics | `/azure-data-analytics/supply-chain-analytics/` | Page has a whole "Supply Chain Optimization" block | **ORPHAN** |
| 3 | Power BI Services | `/power-bi-services/` | Page sells "Real-Time Insights" / dashboards | **ORPHAN** |
| 4 | Azure for Logistics & Transport | `/azure-for-logistics-and-transport/` | Sibling industry; supply-chain adjacency | **ORPHAN** |
| 5 | Data Science & AI | `/data-science-ai/` | Predictive maintenance & anomaly detection = AI/ML | ok (4) |
| 6 | Microsoft Fabric Services | `/microsoft-fabric-services/` | "Unified Data Management" theme; safe global key | ok (3) |
| 7 | Azure Managed Services | `/azure-managed-services/` | Named in the page's "Folio3 Approach" section; safe global key | under-linked (2) |
| 8 | Azure Cloud Services | `/azure-cloud-service/` | Core Azure delivery | ok (4) — **side effect: also links the "Azure Cloud Services" card on `/services/`** |

Notes for approval:
- The page's pre-existing `"read more" → /city-university-azure/` entry will also appear
  as a 9th card ("City University Azure", a case study). I can keep or drop it — say which.
- Row 8 (Azure Cloud Services) is the only one with a cross-page side effect (adds a
  correct link on `/services/`). If you'd rather I keep the change strictly to the
  manufacturing page, I'll **drop row 8** (leaving 7 new links). Default: drop it unless
  you say keep.

---

## SM — stories
- **S1**: Add approved link entries to `azure_for_manufacturing` in `content-links.json`.
- **S2**: Build + browser-verify the manufacturing page (section renders, links 200, no
  console errors, no duplicate section, hero intact).

## DEV / QA — DONE
- [x] S1 implement — added 7 links to `azure_for_manufacturing` in `content-links.json`
      (single-line surgical edit; JSON valid; 39 keys intact; no other entry touched).
- [x] S2 verify — `npm run build` passed; Playwright browser check on the real rendered page:
  - "Explore More Services" heading renders exactly once (no duplicate section).
  - 7 cards render with the correct labels and hrefs.
  - All 7 targets return HTTP 200 on THIS branch (no 404s).
  - Hero image present and inside its `<Reveal>` wrapper.
  - 0 console errors; 0 fallback checkmarks in the section.

## Decisions log
- Approved: Rows 1–7 (dropped Row 8 "Azure Cloud Services" to avoid the cross-page side
  effect on `/services/`; change now strictly scoped to the manufacturing page).
- Approved: dropped the pre-existing `"read more" → /city-university-azure/` entry so the
  section is a clean, uniform grid of 7 service links (the page's own case-study cards,
  rendered from the page JSON, are untouched).
- Note: two anchor labels titleCase to "Azure For Logistics And Transport" and "Data
  Science And AI" (the renderer capitalizes every word) — consistent with how every other
  "Explore More Services" nav on the site renders. No functional impact.
