# BMAD Plan — Update Microsoft Partner Badges Site-Wide

**Task slug:** `microsoft-partner-badges`
**Branch:** `claude/microsoft-partner-badges-oz490y` (cut for this work; master is LIVE + locked)
**Status:** ANALYST done · PM awaiting user confirmation (BLOCKED on inputs)
**Last updated:** 2026-07-24

---

## ANALYST — what is actually on disk (quoted, not assumed)

### 1. The site-wide badge strip = "Awards & Recognition" band
It renders a slider of **15 Microsoft *certification-exam* badge SVGs** (AZ-400,
AI-102, DP-100, MB-900, AZ-140, Azure Solutions Architect, etc.). These are
**"Microsoft Certified" exam badges**, which are NOT the same thing as
**"Microsoft Solutions Partner" designation** badges (the partner-program logos).

**Rendered in two ways:**

A. **Hardcoded component** `src/components/sections/AwardsBand.tsx`
   - `const BADGES = [...15 SVGs...]` (lines 9–25), all under
     `/wp-content/uploads/2023/07/*.svg`.
   - Used on: `src/app/page.tsx` (**HOME — SIGNED OFF / LOCKED, do not touch**)
     and `src/app/azure-for-retail/page.tsx`.

B. **Data-driven** across **~28–31 content pages** — any page JSON whose section
   heading matches `Awards & Recognition`. The renderer
   (`CapturedRenderer.tsx:120-124`, `OrderedRenderer.tsx:663-665`) pulls the SVGs
   from that section's `images[]` and shows them only if `>= 3` badges. Same 15
   certification SVGs (referenced as `2023/11/*.svg`, mapped to disk via
   `localAsset()`).

### 2. On-disk source files (all exist, all 120×120)
`public/wp-content/uploads/2023/07/`:
`azure_solution_architect`, `azure_administration`,
`AZ-400-104-or-204-Azure-DevOps-Engineer-Expert`, `azure_security_engineer`,
`data-analyst`, `azure-data-engineer`, `power_platform_developers`,
`azure-network-engineer`, `MB-900`, `AI-102`, `DP-100`, `AZ-140`,
`azure-stack-hub`, `window-server-hybrid-administration`,
`mirosoft_certified_trainer` — all `.svg`, viewBox 120×120.

### 3. Actual "Microsoft Solutions Partner" DESIGNATION assets found
Only as **blog/content images**, NOT in any badge strip:
- `2024/09/business-applications-solution-partner.jpg`
- `2024/09/folio3-secures-microsoft-solution-partner-designation-in-four-key-areas.jpg`
- `2023/10/Microsoft-Cloud-Solution-Provider.png`

### 4. Footer
`src/components/layout/Footer.tsx` carries **no** partner/certification badges —
only the Folio3 Azure logo. So there is **no** footer badge strip to update.

---

## BLOCKERS (need marketer input before any change)

1. **No new asset files provided.** The request says "with the new updated
   badges from microsoft" but no image files or links were attached. I cannot
   replace assets I do not have.

2. **Which badges?** Two different things could be meant:
   - (a) the **certification-exam** "Awards & Recognition" strip (the 15 SVGs
     shown site-wide today), or
   - (b) the **Microsoft Solutions Partner designation** badges (partner-program
     logos) — which currently appear nowhere as a strip.

3. **Accuracy / currency (per instructions):** must only publish designations
   currently held. Need confirmation of which designations Folio3 holds now, so
   an expired one is flagged, not published.

---

## ANALYST (cont.) — decision from marketer + designation evidence

**Marketer chose:** (1) *Solutions Partner designation logos* (not the cert strip),
(2) source *official Microsoft* artwork.

**Folio3's 4 Solutions Partner designations** (from
`2024/09/folio3-secures-...-four-key-areas.jpg`, dated Sept 2024):
1. Infrastructure (Azure)
2. Data & AI (Azure)
3. Digital & App Innovation (Azure)
4. Business Applications

**Key facts that change the plan:**
- The repo's existing badge art (`2024/09/business-applications-solution-partner.jpg`,
  800×400) **already is** the current official "Microsoft Solutions Partner"
  badge design (white card, 4-square logo, "Solutions Partner" + area). As of
  knowledge cutoff there is no known *newer* Microsoft redesign of these badges.
  => If the marketer has genuinely new artwork from Microsoft, I need the files.
- These badges do **not** appear in any site-wide strip today — only inside
  ~2 blog posts. "Site-wide" therefore means **adding a new strip**, likely in
  place of / alongside the certification "Awards & Recognition" band.

**HARD CONSTRAINTS this triggers (must confirm before building):**
- **HOME IS LOCKED**, but the Awards band renders on the home page. Replacing the
  cert strip *site-wide* would touch home → NOT allowed without explicit sign-off.
- **Component-code change**: `AwardsBand.tsx` is code, not JSON. Adding a partner
  strip likely needs a new/edited component → marketer said "stop and tell me why
  first." (This note is the telling.)
- **ACCURACY FLAG**: designations are evidenced only as of **Sept 2024**.
  Microsoft Solutions Partner status requires **annual renewal**. I cannot verify
  from the repo that all four are still active as of **July 2026**. Per the
  accuracy rule, I must NOT publish an unverified/expired designation.

## ARCHITECT — sourcing blocker (verified against Microsoft docs, 2026-07-24)

Marketer chose scope = **"just fix the 2 blog posts"** + artwork = **"source new
official ones"** + confirmed all 4 designations active.

**Pages in scope (only ones that display a Microsoft partner badge):**
- `blog_folio3_secures_...four_key_areas.json` — hero `folio3-secures-...jpg`
  (850×560, folio3-branded 4-up) + inline `business-applications-solution-partner.jpg`
  (800×400, single Business Applications badge).
- `microsoft_licensing_process.json` — `Microsoft-Cloud-Solution-Provider.png`
  (464×162, CSP badge).
- (`blog_category_press_release.json`, `blog_business_intelligence_vs_business_analytics.json`
  only reuse the announcement hero as a listing thumbnail — auto-updates if that
  file is replaced.)

**BLOCKER on "source official myself":** per
learn.microsoft.com/partner-center/benefits/mpn-logo-builder, official Solutions
Partner badge files are ONLY downloadable from the partner's own Partner Center
(Benefits → Logo Builder → Save & download), governed by Microsoft Trademark &
Brand Guidelines. I cannot legitimately fetch genuine "new" official files from
the web, and must not republish third-party look-alikes as official. The badges
already in the repo are legitimate official art from 2024 and the core design is
unchanged (only specialization / "Solutions Partner for Microsoft Cloud" badges
are new, and those also require Folio3's Logo Builder).

**Awaiting marketer decision:** (A) Folio3 downloads current badges from Logo
Builder & uploads → I swap in true official files; (B) quality/format upgrade
using existing official repo art (no new sourcing); (C) no change (already
current & official).

## STATUS — HELD (no site changes made)

An image was supplied to replace the badges. Decoded, it is a **148×148
black apple-with-skull-crossbones (pirate) icon** — NOT a Microsoft partner
badge (no MS logo, no "Solutions Partner" wordmark, no designation). Placing it
on the announcement post would misrepresent a Microsoft certification / trust
asset, which the ACCURACY rule forbids. **Declined; both pages left untouched.**
Awaiting either the genuine official badge file (Partner Center → Logo Builder)
or a safe fallback (quality upgrade of existing official repo art). No page
JSON, component, or image asset was modified.

## PM — goal & acceptance criteria (DRAFT — to confirm)
- Goal: swap the current Microsoft badge assets for Microsoft's updated badges,
  everywhere they appear, without breaking any layout (desktop + mobile).
- Acceptance: every location listed above updated only where confirmed; true
  w/h on every image item; build green; rendered pages verified with Playwright
  (badge count unchanged, 0 fallback checkmarks, all images HTTP 200, no console
  errors, no layout wrap on badge strips desktop+mobile).

## ARCHITECT / SM / DEV / QA — TBD after blockers resolved.
