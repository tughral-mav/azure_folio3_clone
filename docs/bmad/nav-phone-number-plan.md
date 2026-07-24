# BMAD Plan — Change nav-bar phone number site-wide

**Task:** Change the phone number shown in the nav bar for the entire site
from `+1 (408) 412-3813` to `090078601`.

**Branch:** `claude/update-nav-phone-number-i7bcdu` (designated).

## Analyst — what I found (quoted from real files)
Occurrences of the old number in the LIVE app (`azure-clone-next/`):
- `src/lib/offices.ts:49` — `export const PHONE = '+1 (408) 412-3813';`
  → the ONLY value the nav bar uses.
- `src/components/layout/Header.tsx:122,128` — nav bar renders `PHONE`:
  - `<a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`} ...>` (the dial link)
  - `<span ...>{PHONE}</span>` (the display text)
- `src/lib/offices.ts:10` — `'Tel: +1 408 412-3813'` → **site-wide FOOTER** (US Office). NOT nav bar.
- `src/app/layout.tsx:65` — `telephone: '+1 (408) 412-3813'` → JSON-LD SEO metadata. NOT visible.

`grep` confirms `PHONE` is imported/used ONLY in `Header.tsx`. So editing
`offices.ts:49` changes the nav bar (both display + tel link) and nothing else.
Other hits (`archive/`, `clone-kit/`) are not part of the live app.

## PM — goal & acceptance criteria (confirmed with user)
- Nav bar shows `090078601` on every page (display text).
- Nav bar `tel:` link dials `090078601`.
- Footer + JSON-LD keep the old number (user chose "nav bar only").
- Old value no longer appears in nav bar of built output.
- User confirmed (sanity check) to ship `090078601` verbatim despite it
  looking like a placeholder / non-standard format.

## Architect — smallest change
Change the single string literal in `src/lib/offices.ts:49`. No component code
changes (Header already derives display + tel from `PHONE`). The tel link
`PHONE.replace(/[^+\d]/g, '')` → `090078601` (all digits kept), so it dials.

## SM — stories
1. Edit `PHONE` constant. (one line)

## Dev / QA
- Story 1: edit line 49. Build. Verify built output: nav bar shows new number,
  tel link = tel:090078601, footer/JSON-LD unchanged.
