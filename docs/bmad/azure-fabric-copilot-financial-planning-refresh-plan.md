# BMAD Plan — Refresh "How Azure Fabric and Copilot Enable AI-Driven Financial Planning"

- **Target page:** `/blog/how-azure-fabric-and-copilot-enable-ai-driven-financial-planning/`
- **Content file:** `azure-clone-next/content-kit/content/blog_how_azure_fabric_and_copilot_enable_ai_driven_financial_planning.json`
- **Branch:** `claude/azure-fabric-blog-refresh-gm63yh` (designated; cut from master)
- **Date started:** 2026-07-24
- **Status:** Analyst + PM done → awaiting user confirmation before Dev

---

## ANALYST — what is actually there (quoted from the real files)

**Render path (verified in code):** Blog posts do NOT use the `items[]` marketing
renderer. `src/app/blog/[slug]/page.tsx` renders the article from **`bodyHtml`**
(raw HTML via `dangerouslySetInnerHTML`), plus `title` (the h1 in `sections`),
`description` (`meta.description`), `heroImage` (`meta.ogImage`), and `related[]`.
=> **None of the OrderedRenderer / items[] / card-icon / hero-w>=180 contract rules
apply here.** This is a raw-HTML blog body. Confirmed by reading `getBlogPost()`
in `src/lib/content.ts:414`.

**Schema output (verified):** `page.tsx` emits `BlogPosting` + `BreadcrumbList`
JSON-LD only. **There is NO `datePublished`/`dateModified` field and NO `FAQPage`
schema anywhere in the blog component.** Adding either would require editing
`page.tsx` — component code, not data.

**Current content:** ~24 KB body, dated April 2026 (image paths `/2026/04/`,
og:image `ai-financial-planning-azure.jpg`). Table of contents + 8 H2 sections:
Challenge → What Fabric Provides (OneLake / Data Factory pipelines /
**"Real-Time Analytics"**) → Azure ML in Finance → Copilot Financial Data Analysis
(Copilot in Fabric / **"Copilot for Finance in Microsoft 365"**) → Power BI →
Governance → Practical Starting Points → Conclusion. Well written, current voice.

**Internal links:** 15 internal links, **all 15 resolve on this branch** (verified
against content-kit files). No broken links to fix.

**Search Console trend (REFRESH step 1):** COULD NOT PULL.
- Windsor.ai `searchconsole` connector: blocked — "connected more accounts than
  your Free plan allows."
- Ahrefs project `Azure.folio3` (id 6290224): "No GSC data available" — GSC not
  connected to the Ahrefs project.
- Ahrefs organic-keywords for the exact URL: empty (0 keywords).
- **Honest read:** the post is only ~3 months old and has no measurable ranking
  history yet. There is no "loss" to show. This refresh is a *freshness/accuracy*
  update, not a ranking-recovery. Reported to user rather than fabricated.

## RESEARCH — what genuinely changed since April 2026 (sourced)

1. **"Real-Time Analytics" is an outdated product name.** Microsoft consolidated
   Synapse Real-Time Analytics + Data Activator into **Real-Time Intelligence
   (RTI)**, now **generally available**. (blog.fabric.microsoft.com — "Transform
   your business with Real-Time Intelligence: now Generally Available")
2. **"Microsoft Copilot for Finance" was renamed and reached GA.** It is now
   **"Finance in Microsoft 365 Copilot"** (formerly Microsoft Copilot for
   Finance), **generally available since October 2025**. The post's framing reads
   as the older preview era. (microsoft.com/dynamics-365 blog, 2025-10-20)
3. **New, on-topic capability: Fabric data agents (GA).** Conversational Q&A
   agents that reason over OneLake data in natural language — directly relevant to
   the post's "intelligence layer" section. (learn.microsoft.com — "Fabric data
   agent"; Ignite 2025 / Build 2026 blogs)
4. (Noted, low priority) Azure OpenAI Service now sits under "Microsoft Foundry
   Models (includes Azure OpenAI)" as of Jan 2026. Underlying models are still
   Azure OpenAI, so the post's sentence is not wrong — leave a light touch only.

## PM — goal & acceptance criteria

**Goal:** Update the post so its product names and capability descriptions match
Microsoft's current (mid-2026) reality, preserving the author's voice. This is an
update, not a rewrite.

**Acceptance criteria:**
- [ ] "Real-Time Analytics" → "Real-Time Intelligence" (heading + body), with a
      one-line note that RTI unifies streaming analytics + Data Activator alerting.
- [ ] "Copilot for Finance in Microsoft 365" → "Finance in Microsoft 365 Copilot",
      noting GA (Oct 2025) / production-ready framing. Update the ToC anchor label.
- [ ] Add a short, on-topic mention of **Fabric data agents (GA)** in the Copilot
      section — natural-language Q&A over OneLake financial data.
- [ ] Meta description refreshed lightly if it helps; title left as brand-approved.
- [ ] All internal links still resolve (re-verify after edit).
- [ ] Build green + Playwright visual verification: every heading/paragraph in the
      JSON appears in rendered HTML, hero present, images 200, zero console errors.

**Out of scope unless user approves (component changes — flagged):**
- `dateModified` in the BlogPosting schema (REFRESH step 5) — needs `page.tsx` edit.
- `FAQPage` JSON-LD schema (REFRESH step 4) — needs `page.tsx` edit. A *visible*
  FAQ section can be added to `bodyHtml` with no component change, but it would not
  emit FAQ schema without the component edit.

## ARCHITECT — smallest change

Edit the single JSON file's `bodyHtml` string (surgical find/replace of the
outdated phrases + one new short paragraph) and, if desired, `meta.description`.
No component code, no new images, no icon manifest. Keep the URL unchanged (no
redirect needed).

## SM — stories

- **S1** — Rename Real-Time Analytics → Real-Time Intelligence (ToC anchor label,
  H3 heading text, body paragraph).
- **S2** — Update "Copilot for Finance in Microsoft 365" → "Finance in Microsoft
  365 Copilot" + GA note (ToC anchor label, H3 heading, body).
- **S3** — Add Fabric data agents mention in the Copilot section.
- **S4** — (Decision pending) Metadata description touch-up.
- **S5** — (Decision pending, component change) dateModified + FAQPage schema.

## USER DECISION (PM confirmation)

User chose **"Do the small page.tsx edit too"** — full refresh checklist including
`dateModified` schema + `FAQPage` schema. Component edit approved.

## DEV / QA — log

**Implemented (data):** `blog_..._financial_planning.json`
- S1 Real-Time Analytics → Real-Time Intelligence (ToC label + H3 + body; anchor
  IDs kept so in-page ToC links still work) + Data Activator alerting note.
- S2 "Copilot for Finance in Microsoft 365" → "Finance in Microsoft 365 Copilot"
  + GA-since-Oct-2025 note + ERP (Dynamics 365 / SAP) connector detail.
- S3 New paragraph: Fabric data agents (GA) in the Copilot section.
- S4 `meta.description` lightly refreshed; `meta.datePublished` 2026-03-20 (real
  byline date from live site), `meta.dateModified` 2026-07-24.
- S5 `faq[]` (4 Q&A) added.

**Implemented (component, approved):**
- `src/lib/content.ts` — `getBlogPost` now returns `datePublished`, `dateModified`,
  `faq`; `CapturedPage.meta` gains optional date fields.
- `src/app/blog/[slug]/page.tsx` — BlogPosting schema gains datePublished/
  dateModified; visible "Published … · Updated …" line; visible FAQ `<details>`
  section; `FAQPage` JSON-LD (only when `faq` present, so other posts unaffected).

**QA (production build + Playwright on rendered DOM):**
- `npm run build` green (124 static blog paths).
- 0 console errors, 0 request failures, HTTP 200.
- Old product names absent, new names present; Fabric data agents + Data Activator present.
- Published Mar 20 2026 + Updated Jul 24 2026 visible AND in BlogPosting schema.
- 4 FAQ items visible (`<details>`) + FAQPage schema with 4 questions; heading not duplicated.
- Hero image visible; all 8 images HTTP 200; all 15 internal article links resolve on this branch.
- Every JSON body heading/paragraph present in rendered HTML (0 missing).

**Could not do:** Search Console trend (Windsor free-plan cap; Ahrefs project has no
GSC link). Reported honestly — page is ~3 months old with no measurable trend yet.
