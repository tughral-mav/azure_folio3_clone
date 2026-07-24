# BMAD Plan — Fix generic checkmark icons on /about-us/

Branch: `claude/about-us-card-icons-cttbqg` (designated). Working tree was clean at start.
Task slug: about-us-card-icons

## Analyst — what I found (quoted from the real files)

- Page content: `azure-clone-next/content-kit/content/about_us.json`.
  `"url": "https://azure.folio3.com/about-us/"`.
- The card section is **"Explore Why Businesses Trust Folio3 To Fuel Growth"**
  (a heading + paragraph-pair grid). Its 6 `h3` cards:
  1. `750+ Certified Developers`
  2. `Cloud-Centric Approach`
  3. `App Modernization Specialists`
  4. `1,000+ Clients Worldwide`
  5. `100+ Applications Supported`
  6. `24/7 Support and Maintenance`
  (The "750+/1,000+/100+" are NOT stat counters here — `counters.json`'s
  `about_us` counters attach to the "Discover the essence of who we are?"
  section, not this one.)
- Icons come from the sidecar `content-kit/card-icons.json`, NOT the page JSON
  (`OrderedRenderer.tsx:119` `cardIcon = localImg(getCardIcon(pageSlug, t))`).
  Page key = URL path = `about-us` (`OrderedRenderer.tsx:118`).
  **`about-us` is ABSENT from the manifest** (22 keys, none about-us) → all 6
  cards fall to the generic checkmark SVG at `OrderedRenderer.tsx:1092`
  (`<path d="M5 13l4 4L19 7" .../>`).
- Slug rule (`content.ts:153`): lowercase, `&`→`and`, non-alnum→`-`, trim,
  slice(0,50). Confirmed slugs below.

## PM — goal & acceptance criteria

Goal: the 6 About-Us cards render their real brand icons, not generic
checkmarks. Data-only change (edit `card-icons.json`), no component code.

Acceptance:
- Rendered /about-us/ shows real icons > 0 and fallback checkmarks == 0 in the
  card grid.
- Every mapped icon file returns HTTP 200.
- `npm run build` passes.
- No other page changed; manifest stays minified (surgical single-key insert).

## Architect — smallest change

Add ONE key `"about-us"` to `card-icons.json` with 6 title→icon mappings,
reusing existing SVGs from `public/icons/`. No new artwork. No code edits.

## SM — stories

- S1: Add the `about-us` manifest key surgically (minified).
- S2: Build + verify by counting rendered DOM icons vs checkmarks.

## Dev — mapping (slug → reused icon, all verified on disk)

| Card title | slug | icon |
|---|---|---|
| 750+ Certified Developers | `750-certified-developers` | `/icons/microsoft-power-platform-services/proven-expertise.svg` |
| Cloud-Centric Approach | `cloud-centric-approach` | `/icons/azure-cloud-service/cloud-strategy-creation.svg` |
| App Modernization Specialists | `app-modernization-specialists` | `/icons/azure-cloud-service/application-modernization.svg` |
| 1,000+ Clients Worldwide | `1-000-clients-worldwide` | `/icons/microsoft-power-platform-services/staff-augmentation.svg` |
| 100+ Applications Supported | `100-applications-supported` | `/icons/azure-managed-services/application-performance-monitoring.svg` |
| 24/7 Support and Maintenance | `24-7-support-and-maintenance` | `/icons/azure-for-logistics-and-transport/dedicated-24-7-technical-support.svg` |

## QA — verification log

- [x] S1 applied surgically — manifest still one line, 23 keys, pure append (git diff: 1 line changed).
- [x] Build passes (`npm run build`, no errors).
- [x] Rendered `.next/server/app/about-us.html`: 6 masked-glyph icons (all 6 mapped files), **0 fallback checkmarks**; all 6 card titles present.
- [x] All 6 icon SVGs verified present in `public/icons/` (served as static assets).
