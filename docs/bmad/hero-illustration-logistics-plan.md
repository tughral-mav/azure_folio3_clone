# BMAD Plan — Replace hero illustration on /azure-for-logistics-and-transport/

Branch: `claude/hero-illustration-replacement-fmo8ze` (per task instructions)

## Analyst (what I actually found)
- Content file: `azure-clone-next/content-kit/content/azure_for_logistics_and_transport.json`.
- Page renders through `OrderedRenderer` (sections carry non-empty `items[]`).
- The **hero** is `sections[1]` (the section that holds `h1` =
  "Efficiently Manage Your Logistics and Transport Operations with Microsoft Azure").
  `sections[0]` is header/nav chrome.
- Current hero illustration = `sections[1].items[4]`:
  `.../2025/07/efficiently-manage-logistics-transport-operations-microsoft-azure.webp`,
  `w:807 h:620 alt:""`.
- The hero illo is chosen at `OrderedRenderer.tsx:144` as the first hero-section img with `w >= 180`,
  and the visual + zoomIn + float animation are gated on it (`:181`).
- `localImg` (`content.ts:105`) resolves every `src` against local `/public`; an external URL that
  is not on disk resolves to `''` and renders as nothing. So the requested gstatic URL MUST be
  downloaded locally.

## PM (goal + acceptance)
- Goal: replace the hero illustration with the image at the user-supplied gstatic URL.
- The URL resolves to a 512x512 JPEG: the four-colour Microsoft logo with a white cat silhouette
  (off-topic, Microsoft-branded). Flagged to user. **User confirmed: "Ship the cat image anyway."**
- Acceptance: hero shows the new image, wrapped in Reveal (zoomIn), returns HTTP 200, build passes,
  no console errors, no other page area changed.

## Architect (smallest change)
- Download the image once, convert to WebP (site convention for photographic hero assets), place at
  `public/wp-content/uploads/2026/07/azure-logistics-hero.webp` (2026/07 = current month, real folder).
- Edit ONLY `sections[1].items[4]` (the `items[]` img): new src + true dims + alt.
- Leave legacy `images[]` duplicates, OG image, and everything else untouched.

## SM (stories)
1. Asset: download + convert + place WebP; record TRUE on-disk dimensions. — DONE (512x512, 6.2KB)
2. JSON: point hero `items[]` img to the local WebP with w/h = true dims, add alt.
3. QA: build; render page; assert hero img present, in Reveal, HTTP 200, no console errors.

## Dev / QA log
- Asset saved: `2026/07/azure-logistics-hero.webp`, true dims 512x512.
- JSON img item set to w:512 h:512 (true on-disk dims per render contract).
- QA (Playwright, prod build): hero <img> present, wrapped in `reveal a-zoomIn` (animation fired),
  rendered 596x596 desktop / 319x319 mobile — square, undistorted, matching the 512x512 source.
  File + Next image optimizer both return HTTP 200. Zero console errors. No duplicate hero/CTA.
- Out of scope, untouched: OG/social image (still the old logistics webp), legacy images[] arrays,
  the hero h2 subhead (pre-existing h2-in-subhead-slot behaviour, unrelated to this task).
