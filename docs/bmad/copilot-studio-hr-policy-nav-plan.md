# BMAD Plan — Add HR Policy Agent case study to the Solutions menu

**Task:** Add `/case-studies/microsoft-copilot-studio-based-hr-policy-agent/` to
the navigation menu under **Solutions**.

**Branch:** `claude/add-copilot-studio-nav-y8ghsz` (cut from `master`).

---

## Analyst — what I actually found (quoted from the files)

- **Nav is data-driven.** `azure-clone-next/src/lib/nav.ts` exports a `NAV`
  array of `{ label, href, children }`. The Solutions entry today has exactly
  one child:
  ```ts
  { label: 'Solutions', href: '#',
    children: [{ label: 'Intellifabric', href: '/solution/intellifabric/' }] }
  ```
- **One edit covers desktop AND mobile.** `src/components/layout/Header.tsx`
  maps over the same `NAV` array twice — desktop menu at line 39, mobile menu at
  line 146. No component change is needed.
- **The target page already exists on this branch.** Content lives at
  `azure-clone-next/content-kit/content/case_studies_microsoft_copilot_studio_based_hr_policy_agent.json`.
  Its `url` field is
  `https://azure.folio3.com/case-studies/microsoft-copilot-studio-based-hr-policy-agent/`,
  it has a populated `items[]` stream (renders through OrderedRenderer, the
  modern layout), 10 sections, meta title
  "Copilot Studio Based HR Policy Agent by Folio3 | Case Study".
- **Routing:** the catch-all `src/app/[...slug]/page.tsx` serves it via
  `getMarketingSlugs()` / `getCaptured()`. The file is NOT in the RESERVED set,
  so the route `case-studies/microsoft-copilot-studio-based-hr-policy-agent` is
  generated. The link will resolve on this branch (not a cross-branch 404).

## PM — goal & acceptance criteria

**Goal:** A visitor can reach the HR Policy Agent case study from the Solutions
dropdown, on both desktop and mobile.

**Acceptance criteria:**
1. Solutions dropdown shows a new item linking to
   `/case-studies/microsoft-copilot-studio-based-hr-policy-agent/`.
2. Clicking it lands on the real, rendered case-study page (HTTP 200, not 404).
3. Works in both the desktop mega-menu and the mobile menu.
4. No other nav item changed; Intellifabric still present.
5. Build passes.

## Architect — smallest change

Add ONE child object to the Solutions `children` array in `nav.ts`. No
component code touched. No content-kit change (page already exists). No icon
manifest change (nav items don't use card icons).

**Decisions made on the marketer's behalf:**
- **Label:** `HR Policy Agent` — concise, reads cleanly in a dropdown next to
  "Intellifabric". (Full page title is longer; a shorter menu label is standard.)
- **Position:** placed *after* Intellifabric. Intellifabric is the flagship
  product; the case study is supporting proof, so product-first ordering.

## SM — stories

- **Story 1:** Edit `nav.ts` to add the Solutions child. (Dev + QA)

## Dev / QA log

- [x] Story 1 — edit applied to `src/lib/nav.ts`.
- [x] QA — `npm run build` passes.
- [x] QA — Playwright: Solutions dropdown shows item, link → 200 rendered page,
  desktop + mobile both verified.

## Footer note

Footer is a separate component — checked whether it already links this page
before offering any footer change. (No footer change requested or made.)
