# BMAD Plan — Healthcare hero "Unleash Potential" button

Task slug: `healthcare-unleash-potential-button`
Branch: `claude/azure-unleash-potential-button-hguln7` (already checked out, tree clean)
Date: 2026-07-24

## ANALYST — what I found (quoted from the real files)

File: `azure-clone-next/content-kit/content/azure_for_healthcare.json`
- `url`: `https://azure.folio3.com/azure-for-healthcare/`
- Page is section-based; the hero is **section index 1**.
- The hero renders through `items[]` (render contract #2 satisfied).
- The "Unleash Potential" CTA is stored **TWICE** (per CTA-SPECIFIC rule):
  - line 280 — in `items[]`: `{"t":"cta","text":"Unleash Potential","href":"#pgForm"}`
  - line 310 — in `ctas[]`: `{"text":"Unleash Potential","href":"#pgForm"}`
- There is a SECOND hero button, "Learn More" → `#pgForm` (lines 285 & 314).
  This is NOT the button I was asked about — LEAVE IT ALONE.
- Only these two "Unleash Potential" occurrences exist in the file (grep confirmed).

Target `/case-studies/`:
- `case_studies.json` exists with `url: https://azure.folio3.com/case-studies/`.
- Served by the catch-all route `src/app/[...slug]/page.tsx`, so the link
  resolves on THIS branch (render/verify contract satisfied).

## PM — goal & acceptance criteria

Goal: In the healthcare hero, change ONLY the "Unleash Potential" button so it
- reads **"See what's possible"**, and
- links to **`/case-studies/`** (was `#pgForm`).

Acceptance:
1. Both stored copies (items[] + ctas[]) updated → text + href consistent.
2. "Learn More" button unchanged (still `#pgForm`).
3. No other button on the page changed.
4. Build passes; rendered HTML shows the new label + href; `/case-studies/` is 200.

## ARCHITECT — smallest change

Pure data edit in one file (`azure_for_healthcare.json`). No component code.
Two surgical replacements (the paired items[]/ctas[] CTA). Nothing else.

## SM — stories
- Story 1: Update the items[] copy (text + href).
- Story 2: Update the ctas[] copy (text + href).
(One file; done together in one edit pass, verified as one.)

## DEV — progress
- [ ] Edit items[] CTA (line ~280)
- [ ] Edit ctas[] CTA (line ~310)

## QA — verification checklist
- [ ] Build passes (`npm run build` from azure-clone-next)
- [ ] Rendered hero shows "See what's possible" → href `/case-studies/`
- [ ] "Learn More" still `#pgForm`; enumerate ALL hero button hrefs
- [ ] `/case-studies/` returns 200 on this branch

## Decisions made on the marketer's behalf
- Interpreted the bracket "[links to /case-studies/ / reads 'See what's
  possible']" as BOTH changes to the one Unleash Potential button (new label
  AND new link), not an either/or.
