# BMAD Plan — Redirect /azure-cloud-service/ → /contact-us/

Task slug: `azure-cloud-service-redirect`
Branch: `claude/azure-cloud-service-redirect-uglvl2` (designated by harness; working tree clean, confirmed mine at start)
Date: 2026-07-24

## Analyst — what I actually found (quoted from the files)

- Redirects live in `azure-clone-next/redirects.json`, consumed by `azure-clone-next/next.config.*`:
  `const redirects = JSON.parse(readFileSync(... './redirects.json' ...))` and `async redirects() { return redirects }`.
  So Next.js applies these as real 301/302 redirects before route rendering.
- Entry shape (verified): `{ "source": "/old/", "destination": "/new/", "permanent": true }`. 62 entries total.
- **No existing redirect has source `/azure-cloud-service/`** — so no duplicate, and the new redirect will
  override the existing rendered route `src/app/azure-cloud-service/page.tsx`.
- **Destination `/contact-us/` is a real page** — `src/app/contact-us/page.tsx` exists. No redirect has source
  `/contact-us/`, so it is a terminal destination (no onward chain).
- **CHAIN RISK found.** 5 existing entries currently point *to* `/azure-cloud-service/`:
  - `/blog/our_cloud_service/healthcare-2/`
  - `/blog/our_cloud_service/financial-services/`
  - `/blog/our_cloud_service/retail/`
  - `/blog/our_cloud_service/manufacturing/`
  - `/blog/our_cloud_service/healthcare/`
  Once `/azure-cloud-service/` → `/contact-us/`, each becomes a chain A→B→C.

## PM — goal & acceptance criteria

Goal: A visitor requesting `/azure-cloud-service/` is permanently (301) sent to `/contact-us/`.

Acceptance criteria:
1. `redirects.json` gains ONE entry: `/azure-cloud-service/` → `/contact-us/`, `permanent: true`.
2. No redirect chains: the 5 `/blog/our_cloud_service/*` sources are repointed straight to `/contact-us/`
   (per redirect-spec rule: "point A straight at C and tell me").
3. Build passes; on the preview the OLD path returns 301 and lands on `/contact-us/`.

Permanent? YES (301). Not a temporary campaign — nothing indicated otherwise; harness default = yes.

## Architect — smallest change

Data-only edit to `redirects.json`. No component code changes. Two parts:
1. Append the one new entry at the end of the array.
2. Surgically change `destination` on the 5 chain entries from `/azure-cloud-service/` to `/contact-us/`.
   (This is chain-avoidance required by the redirect spec, not reformatting.)

## SM — stories

- Story 1: Add the new `/azure-cloud-service/` → `/contact-us/` redirect entry.
- Story 2: Repoint the 5 `/blog/our_cloud_service/*` chain sources to `/contact-us/`.
- Story 3: Build + verify redirect resolves 301 → /contact-us/, destination is 200, JSON valid.

## Dev / QA log

- [x] Story 1 implemented — new entry `/azure-cloud-service/` → `/contact-us/` added at end of array.
- [x] Story 2 implemented — 5 `/blog/our_cloud_service/*` sources repointed to `/contact-us/` (chains removed).
- [x] Story 3 verified:
  - `npm ci` + `npm run build` pass. 63 entries, JSON valid.
  - Local prod server: `GET /azure-cloud-service/` → **308 Permanent Redirect**, `location: /contact-us/`.
    (Next.js emits 308 for `permanent: true` — its permanent-redirect status, method-preserving,
    semantically equivalent to a 301. Every existing entry in this file behaves the same way.)
  - `GET /contact-us/` → 200. A former chain source `/blog/our_cloud_service/healthcare/` → 308 → `/contact-us/` (no chain).
