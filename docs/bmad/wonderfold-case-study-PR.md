## What this adds

A new **customer case study** page about an Amazon → Microsoft Dynamics 365 Business Central integration project. The client is kept anonymous (referred to as "a multi-storefront Amazon seller") — no company name and no logo.

**New page:** `/case-studies/amazon-business-central-integration/`

## What the page says (plain language)

The story of how Folio3 rebuilt a stalled Amazon-to-Business Central integration:
- **The situation:** the project had stalled after a mid-project change of integration partner, and Fulfilled-by-Merchant (FBM) orders weren't processing in the live system — holding up order fulfilment across two Amazon storefronts.
- **What Folio3 did:** rebuilt the integration on the Burq connector, which reads Amazon's data and syncs it into Business Central (and pulls information back from Amazon). FBM orders now process on live customer orders, and the specialty store prices each order from Business Central.
- **The outcome:** both storefronts stay in sync with Business Central, the FBM backlog is cleared, and the platform can now connect any Microsoft ERP with any eCommerce channel as the business grows.

## Why it's safe to review

- **Content only — no code changed.** It's a new data file plus a small, surgical addition to the card-icon list (existing icons reused, nothing redrawn).
- **Nothing invented.** Only facts from the source notes are used — no made-up industry, company size, location, dates, or numbers, and no fabricated quote. Standard "at a glance" chips that weren't in the notes (industry / size / location) were left out on purpose.
- **Home page untouched**; no deployment, lead-form, or analytics files touched.

## Pages affected

- `NEW` `/case-studies/amazon-business-central-integration/`

## How it was checked

Built successfully and verified in a real browser: every heading and paragraph renders (nothing silently dropped), all card icons show real artwork (no generic checkmarks), the hero image and its animation are present, all images load, there are no console errors, and the closing call-to-action band appears once.

> Note: please circulate to the customer for approval before merging.
