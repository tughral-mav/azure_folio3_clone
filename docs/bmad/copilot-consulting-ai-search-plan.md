# BMAD Plan — Optimise `/data-science-ai/microsoft-copilot-consulting/` for AI Search / Answer Engines

**Task slug:** copilot-consulting-ai-search
**Branch:** `claude/copilot-consulting-ai-search-amcfjj` (working tree clean at start; nobody else's changes present)
**Target page file:** `azure-clone-next/content-kit/content/data_science_ai_microsoft_copilot_consulting.json`
**Live URL:** https://azure.folio3.com/data-science-ai/microsoft-copilot-consulting/
**Page route slug (for sidecars keyed by slugOfRoute):** `data_science_ai_microsoft_copilot_consulting`
**Card-icon manifest key (hyphen/slash form):** `data-science-ai/microsoft-copilot-consulting`

---

## ANALYST — what is actually on disk (quoted, not assumed)

### How this page renders (verified in code)
- `CapturedRenderer.tsx:66` dispatches to **OrderedRenderer** when *any* section has a non-empty
  `items[]`. This page's sections DO carry per-section `items[]`, so **it already renders through the
  modern OrderedRenderer** (not the legacy renderer). Render-contract #2's "no items[] = legacy" refers
  to the top-level stream; the real dispatch is per-section and this page passes it. Good — no downgrade risk.
- The page JSON top-level keys are `url / meta / sections / images / bgImages`. Each `section` has
  `items / headings / paragraphs / listItems / ctas / images`. When `items[]` exists the other arrays are
  legacy duplicates and ignored (per contract).

### Current section inventory (13 sections)
1. Nav mega-menu (chrome — filtered by `isChrome()`).
2. **Hero** — h1 "Accelerate Productivity & Enterprise Transformation With Copilot AI", h2 subhead,
   CTA "SCHEDULE AI CONSULTATION TODAY", hero image `microsoft-dynamics-365-copilot-ipad-screen.webp` (w=737 ✓ ≥180).
3. Breadcrumb paragraph.
4. Client-logo strip (6 logos, all w<320 → clean centered strip).
5. "Automate Your Business Workflows…" — h2 + intro para + CTA + feature image.
6. "Empowering Business Leaders In Solving Core Challenges" — h2 + 6 h3 challenge cards → card grid.
7. "Transform Data Into Decisions…" — h2 + h2 subhead + CTA + image (blue CTA band).
8. "Our Comprehensive Microsoft Copilot Services" — h2 + 8 h3 service cards → card grid.
9. "Why Choose Folio3 For Microsoft 365 Copilot Services?" — h2 + 3 h3 + image.
10. "Microsoft Copilot In Action" — h2 + 8 h3 app cards → card grid.
11. "Awards & Recognization" — 15 cert SVGs → awards band.
12. "Real Results, Real Impact" — case-study cards (Savills, Food Verification).
13. "Schedule a 1:1 Call Today" — lead form band. + Footer (chrome).

### Typo found in live content (do NOT silently fix unless in scope)
- Section 7 heading: "Transform Data Into Decisions With Microsoft **Coplitot** Consulting" (sic).
- Section 11 heading: "Awards & **Recognization**" (sic — but the renderer's awards band hard-codes this word).
- These mirror the live site. Not touching unless the marketer asks.

### AEO machinery already present (verified)
- **FAQ accordion** (`Accordion.tsx`) **auto-emits `FAQPage` JSON-LD**. Rendered by OrderedRenderer from
  `faq-full.json` keyed by route slug; `getFaqFull()` needs **≥2 items** or returns null. If no section
  heading matches, OrderedRenderer renders the FAQ as a **fallback block just before the lead-form CTA**
  (`OrderedRenderer.tsx:718`). → We can add a FAQ with **zero page-JSON edits and zero code edits.**
- **Site-wide schema** (`layout.tsx`): `Organization` + `WebSite` (@graph).
- **Per-page schema** (`[...slug]/page.tsx`): `WebPage` + `BreadcrumbList`.
- **No `Service` / `ProfessionalService` schema** exists for service pages (would be a code change to the
  shared catch-all route → out of scope unless approved).
- **`llms.txt`** already exists and **already lists this page** (line 50). Entry is thin — can be enriched.
- **Counters** (`counters.json`) render animated stat numbers but have **no source/citation field** —
  so "stat callouts WITH sources" belong in FAQ answers / body text, not the counter widget.

### This page currently has NO FAQ (verified: no key in faq.json or faq-full.json).

---

## PM — goal & acceptance criteria

**Goal:** Make this page maximally citable by AI answer engines (ChatGPT, Perplexity, Google AI
Overviews, Copilot) for "Microsoft Copilot consulting / implementation / adoption" questions — without
touching component code, the home page, or the locked production areas, and without breaking any render contract.

**Acceptance criteria**
1. A **question-format FAQ** renders on the page as an animated accordion AND emits `FAQPage` JSON-LD.
2. FAQ answers are self-contained, extractable, and **every statistic has a real, named source**.
3. `llms.txt` entry for this page is enriched (still one clean line or a short curated block).
4. No render-contract violation; `npm run build` passes; page verified visually via Playwright:
   all headings/paragraphs present, 0 fallback checkmarks where icons expected, hero image + Reveal
   present, 0 console errors, no duplicated CTA band, internal links resolve on THIS branch.
5. Home page untouched; `vercel.json`, env, `api/lead/`, analytics untouched.

**Decisions requiring the marketer's approval (CHECKPOINT before editing):**
- Whether to also add sourced **stat callouts as visible body content** (a new "By the numbers" card
  grid section in the page JSON) — higher visibility but edits the page JSON. Default proposal: **put
  sourced stats inside FAQ answers only** (safest), and optionally one small card grid if approved.
- Whether to add a `Service`/`ProfessionalService` JSON-LD (needs a code change — default: **skip**).

---

## ARCHITECT — smallest change that satisfies it

**Chosen approach: sidecar-only, no page-JSON edit, no code edit.**
- **Story A — FAQ:** add one keyed entry to `content-kit/faq-full.json` (route-slug key,
  heading + 6–8 Q&A). This is the highest-AEO-value, lowest-risk change: gives question-format content,
  an accordion, and `FAQPage` schema, and appends cleanly before the lead form. No page-JSON risk.
- **Story B — llms.txt:** enrich the existing Copilot Consulting line (and optionally add a short
  "key facts" note) in `public/llms.txt`. Static file, no render risk.
- **(Optional, approval-gated) Story C — visible sourced stats:** add ONE card-grid section to the page
  JSON (`sections[].items` as `[h2, p, then h3+p cards]`) with sourced numbers, + card-icons.json entries.
  Only if the marketer wants the stats visible on-page, not just in the FAQ.

Rejected (and why): editing the shared catch-all route for `Service` schema (touches all 200+ pages,
code change, explicitly gated); using `counters.json` for sourced stats (no source field renders).

---

## SM — stories (one file per story)

- **Story A:** `content-kit/faq-full.json` — add `data_science_ai_microsoft_copilot_consulting`.
- **Story B:** `public/llms.txt` — enrich the page entry.
- **Story C (optional):** `content-kit/content/data_science_ai_microsoft_copilot_consulting.json`
  (+ `content-kit/card-icons.json`) — sourced stat card grid.

## DEV / QA — status log
- [x] Analyst reads complete (renderer, content.ts, layout, route, Accordion, llms.txt).
- [x] Research complete: Ahrefs (Folio3 NOT cited for Copilot-consulting; competitors Ntiva/Centric/
      Avantiico/Collectiv ARE; 10 target buyer questions) + sourced Copilot stats (Microsoft WTI 2023,
      2024 WTI, Forrester TEI 2024). Note: Ahrefs Brand Radar AI addon not on the plan, so citation
      share was inferred from the live AI Overview + SERP for the head term, stated plainly in the report.
- [x] CHECKPOINT answered by marketer: stats in FAQ answers only; ADD Service schema (code change approved).
- [x] Story A (FAQ): added `faq_full` key `data_science_ai_microsoft_copilot_consulting`, 8 Q&As targeting
      the Ahrefs gap questions, sourced stats in answers. Renders as accordion + auto FAQPage JSON-LD.
- [x] Story B (llms.txt): enriched the Copilot Consulting entry with full service coverage + entity signals.
- [x] Story C→ replaced by approved Service schema: `[...slug]/page.tsx` emits `Service` + `OfferCatalog`
      (8 sub-services), scoped by slug map so no other page is affected. Stats stayed FAQ-only (as approved).
- [x] Build passes (192 static pages). Playwright verify PASS: HTTP 200; JSON-LD = Organization/WebSite/
      WebPage/BreadcrumbList/Service(8 offers)/FAQPage(8 Q); 8 accordion Qs in DOM; hero image present;
      #pgForm appears once (no duplicate CTA); 60/60 images HTTP 200; 0 console errors; sourced stats render.
- [ ] Commit + push to `claude/copilot-consulting-ai-search-amcfjj`; Vercel preview link.

### Files changed
- `azure-clone-next/content-kit/faq-full.json` (data — new FAQ key, minified insert as first key)
- `azure-clone-next/public/llms.txt` (static — enriched entry)
- `azure-clone-next/src/app/[...slug]/page.tsx` (code — approved Service JSON-LD, slug-scoped)
- `docs/bmad/copilot-consulting-ai-search-plan.md` (this plan)

### Render-contract watch-list for whatever we ship
- FAQ needs **≥2 items** (we'll ship 6–8).
- If Story C: hero rule N/A (not the hero); cards show only FIRST paragraph; no closing line after last
  card; card titles → icon slugs (lowercase, &→and, non-alnum→-, truncate 50) must exist in card-icons.json
  or they render a generic checkmark; card-icons.json edited surgically (single line, minified).
