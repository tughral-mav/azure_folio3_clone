# BMAD Plan — Add FAQPage + Service schema to /azure-for-manufacturing/

Task slug: `azure-for-manufacturing-schema`
Branch: `claude/azure-manufacturing-schema-779j8q` (working tree was clean, solely mine)
Page: https://azure.folio3.com/azure-for-manufacturing/  →  content-kit/content/azure_for_manufacturing.json

---

## ANALYST — what is actually on disk (quoted, not assumed)

Schema is injected by **component code**, never by page JSON. Three emitters exist:

1. `src/app/layout.tsx:53-79` — site-wide `Organization` + `WebSite` graph (every page).
   - Organization `@id`: `https://azure.folio3.com/#organization`, name "Folio3 Azure".
2. `src/app/[...slug]/page.tsx:75-97` — per-page `WebPage` + `BreadcrumbList` (every marketing page,
   this one included).
3. `src/components/sections/Accordion.tsx:8,30-43` — **FAQPage JSON-LD, emitted automatically for
   any page that renders an FAQ accordion.** Docstring: *"Renders FAQPage JSON-LD for SEO."*

The manufacturing page renders a 19-item FAQ accordion (`faq-full.json` key `azure_for_manufacturing`,
heading "Major Challenges for Manufacturers", 19 Q&A), pulled by `getFaqFull` in
`OrderedRenderer.tsx:108` and rendered through `<Accordion>` at `OrderedRenderer.tsx:673/718`.

### => KEY FINDING: FAQPage schema is ALREADY present on this page.
Because the accordion renders, `Accordion.tsx` already outputs a valid FAQPage node covering all 19
Q&A. Adding another FAQPage would DUPLICATE it (WORKFLOW step 1 forbids duplicating existing schema).

### => GAP: Service schema is NOT present anywhere. That is the only real work.

There is **no data-driven mechanism** to inject arbitrary schema from content-kit/. Service schema
therefore requires a component-code change (flagged to user per the "stop and tell me first" rule).

Page facts for the Service node (from the real files):
- meta.title: "Azure for Manufacturing - Azure" (meta.description: null)
- H1: "Embrace Manufacturing 4.0 with Azure"
- H2/intro: "Modernizing Manufacturing companies to build smart factories, resilient and profitable
  supply chains, and engage customers in new ways."

## PM — goal & acceptance criteria
- Goal: page carries valid FAQPage + Service structured data.
- FAQPage: already satisfied by Accordion.tsx — verify present & valid, do NOT duplicate.
- Service: add one valid `Service` JSON-LD node, provider referencing the existing Organization @id,
  fields reflecting only what is truly on the page. No fabricated ratings/reviews.
- Acceptance: exactly one FAQPage, exactly one Service, no duplicate WebPage/Breadcrumb; page renders
  unchanged visually; green build; JSON-LD parses.

## ARCHITECT — smallest change
Chosen: a **slug-gated block in `src/app/[...slug]/page.tsx`** that emits a `Service` node ONLY when
`slug.join('/') === 'azure-for-manufacturing'`. Reuses already-computed `pageUrl`, `description`,
Organization @id. No new files, no new data plumbing, no effect on any other page, FAQPage untouched.
(Rejected: dedicated route segment `app/azure-for-manufacturing/page.tsx` — larger, duplicates the
whole render path, risks catch-all route conflict. Rejected: content-kit schema sidecar — more code,
not less, for a single page.)

## SM — stories
- S1: Add slug-gated Service JSON-LD to `[...slug]/page.tsx`. (DONE pending user OK on code change)
- S2: Build + Playwright verify: exactly one FAQPage, one Service, one WebPage, one Breadcrumb; 19
  Question nodes; page visually unchanged; zero console errors.

## DEV / QA log
- User approved "Add Service only, scoped" (2026-07-24).
- S1 DONE: added slug-gated `Service` JSON-LD in `src/app/[...slug]/page.tsx` (18-line additive diff,
  no content JSON / renderer changes). Fires only for slug `azure-for-manufacturing`.
- S2 DONE — verified two ways:
  1. Prerendered HTML (`.next/server/app/azure-for-manufacturing.html`): 6 ld+json blocks all parse —
     Organization+WebSite, WebPage (×1), BreadcrumbList (×1), Service (×1), FAQPage (19 items),
     FAQPage (14 items). Service fields all reflect the real page; provider → Organization @id.
  2. Live headless-Chromium load of http://localhost:3000/azure-for-manufacturing/:
     HTTP 200; LD nodes = [Organization+WebSite, WebPage, BreadcrumbList, Service, FAQPage, FAQPage];
     Service present, provider @id correct, name "Azure for Manufacturing"; single H1
     ("Embrace Manufacturing 4.0 with Azure"); 10 H2; 57 imgs; first img HTTP 200; **0 console errors**.
- NOTE (pre-existing, NOT changed): the page renders TWO FAQ accordions by design
  (OrderedRenderer.tsx:671-672) — "Major Challenges" (faq-full.json, 19 Q&A) + a "Partner with Folio3"
  FAQ (faq.json, 14 Q&A). Each auto-emits its own valid FAQPage via Accordion.tsx. Both accurately
  mark up genuinely on-page content, so they were left untouched.
- Build: `npm run build` green.
