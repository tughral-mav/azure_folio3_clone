# BMAD Plan — Clone /microsoft-fabric-services/ into the nav with a "2" prefix

Branch: `claude/fabric-services-nav-clone-9zcsl3` (cut from master)
Task slug: fabric-services-nav-clone

## ANALYST — what I actually found (quoted from the real files)

- Nav is data-driven from `azure-clone-next/src/lib/nav.ts`. The original item:
  `{ label: 'Microsoft Fabric Services', href: '/microsoft-fabric-services/' }`
  It lives inside Services → **Azure Data Analytics** `children` (nav.ts:20).
- `Header.tsx` renders the SAME `NAV` array for desktop (line 39) and mobile
  (line 146), including grandchildren (`gc`, line 163). One nav edit covers both.
- The page route is real component code: `src/app/microsoft-fabric-services/page.tsx`
  (`const SLUG = 'microsoft-fabric-services'`). It is bespoke (custom section
  parsing), NOT a generic template — so a page clone REQUIRES a new route file.
  This is the one place I must touch component code; a data-only clone is impossible
  because there is no catch-all route that renders arbitrary slugs.
- Content data: `content-kit/content/microsoft_fabric_services.json` (14 sections).
  `getCaptured(slug)` maps slug → `slugToFile` (hyphens→underscores) → JSON file.
- Icons: `card-icons.json` has key `"microsoft-fabric-services"` (keyed by URL path).
  `getCardIcon(SLUG, title)` reads it. Values are real files in
  `/public/icons/microsoft-fabric-services/` (14 mappings) — reusable as-is.
- FAQ: `faq.json` has key `"microsoft_fabric_services"` (5 items), read via
  `getFaq(SLUG)` (underscored key).
- **Footer** (`src/components/layout/Footer.tsx`): only links Privacy Policy,
  Cookie Policy, and a phone number. It does NOT link to microsoft-fabric-services
  (grep for "fabric" = no match). => NO footer change needed or offered.

## PM — goal & acceptance criteria

Goal: add a nav entry that is a working clone of the Microsoft Fabric Services page,
with "2" prepended.

- New page at `/2-microsoft-fabric-services/`, content identical to the original.
- New nav item `2 Microsoft Fabric Services` → `/2-microsoft-fabric-services/`,
  placed directly BELOW the original in Services → Azure Data Analytics (so the
  clone sits next to its source — the obvious place for a reader).
- Appears in BOTH desktop and mobile menus (same NAV array).
- Clicking it lands on the real page (not a 404); page renders with hero image,
  real icons (no fallback checkmarks), no console errors.

## ARCHITECT — smallest change that satisfies it

1. `nav.ts`: ONE new line in the Azure Data Analytics children array (below the
   original). [data]
2. `content-kit/content/2_microsoft_fabric_services.json`: copy of the original
   captured JSON (url/canonical fields updated for hygiene). [data]
3. `card-icons.json`: add key `"2-microsoft-fabric-services"` = same mapping,
   inserted surgically on the minified line. [data]
4. `faq.json`: add key `"2_microsoft_fabric_services"` = copy of the original. [data]
5. `src/app/2-microsoft-fabric-services/page.tsx`: copy of the original route with
   `SLUG='2-microsoft-fabric-services'`, updated canonical + breadcrumb name.
   [unavoidable component code — see Analyst note]

## SM — stories
- S1: nav.ts one-line edit.
- S2: content JSON clone.
- S3: card-icons + faq keys.
- S4: new route page.tsx.
- S5: build + Playwright verify (both menus, click-through, icons, hero image).

## QA — verify per story (see RENDER CONTRACT / VERIFY in prompt)
- npm run build green.
- Render /2-microsoft-fabric-services/: hero image present + Reveal wrapper,
  real icons > 0, fallback checkmarks == 0, every heading/paragraph present,
  zero console errors, images HTTP 200.
- Nav: open Azure Data Analytics submenu (desktop + mobile), confirm "2 Microsoft
  Fabric Services" appears directly under the original and links resolve.

## STATUS LOG
- [x] Analyst / PM / Architect complete.
- [x] S1 nav  [x] S2 content  [x] S3 sidecars  [x] S4 route  [x] S5 verify

### DEV note — one extra file beyond the plan (necessary)
`src/lib/content.ts` RESERVED set: added `2_microsoft_fabric_services`. Reason:
the catch-all `[...slug]` route auto-generates a page for every content-kit JSON
via a GENERIC renderer. Without reserving the new stem, TWO routes resolved to
`/2-microsoft-fabric-services/` and the generic one won (leaner: 26 vs 39 icons).
The ORIGINAL page reserves `microsoft_fabric_services` for the exact same reason.
This is the codebase's intended extension point for a bespoke page, not new logic.

### QA RESULT — clone == original on every measured metric (Playwright, prod build)
- real card icons 13==13; fallback checkmarks 1==1 (the ORIGINAL renders 1 too —
  inherent to the page, not a clone defect); hero image present + Reveal-wrapped
  (naturalWidth 640==640); all <img> HTTP 200; zero console errors.
- "missing" innerText lines are IDENTICAL on both pages (inactive-tab labels +
  breadcrumb + footer text that innerText can't see) — proven equal, not dropped.
- Nav: "2 Microsoft Fabric Services" appears directly below the original in BOTH
  desktop and mobile menus; click lands on the real page (H1 present), no 404.
- FOOTER: only Privacy/Cookie/phone links — no fabric link exists, so NO footer
  change was made or needed.
