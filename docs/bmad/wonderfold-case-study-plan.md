# BMAD Plan — Amazon ↔ Business Central Integration case study (client ANONYMIZED)

**USER DECISIONS (checkpoint a):** (1) Proceed with supported facts only — nothing invented. (2) **ANONYMIZE** — the real client name (Wonderfold) must NOT appear on the published page, URL, meta, or as a logo. Refer to them generically ("a multi-storefront Amazon seller"). This planning doc keeps the real name only as internal context.

**Task slug:** `amazon-business-central-integration` (anonymized — no client name)
**Page URL (route):** `/case-studies/amazon-business-central-integration/`
**Content file:** `azure-clone-next/content-kit/content/case_studies_amazon_business_central_integration.json`
**card-icons.json page key:** `case-studies/amazon-business-central-integration` (URL-path form — hyphens/slashes, NOT the underscored slug)
**Branch:** `claude/case-study-creation-qwb22y` (designated by harness; task template said `content/<slug>` but the harness-assigned branch takes precedence — flagged to user)
**Reference modeled on:** `copilot_implementation_food_verification.json` (canonical clean case study)

---

## ANALYST — what I actually found (verified in the real files)

- **Routing:** `src/app/[...slug]/page.tsx` → `getCaptured(slug)` reads `content-kit/content/<slugToFile>.json`; route path comes from the JSON's `url` field (`getMarketingSlugs`). Adding the JSON file creates the SSG route. Global Header/Footer come from `src/app/layout.tsx`, so nav/footer chrome sections are NOT needed in the page JSON.
- **Renderer dispatch (`CapturedRenderer.tsx:66`):** any section with a non-empty `items[]` → `OrderedRenderer` (modern, Reveal-wrapped). Confirmed. Every section will carry `items[]`.
- **Hero (`OrderedRenderer.tsx:133-181`):** hero illustration = first image in the hero section's item stream with `w >= 180`; the `<Image>` + `zoomIn`/float animation is gated on it. Subhead = `h1u.paras[0]` — i.e. **the paragraph that immediately follows the h1 inside the hero unit**. An `h2` after the h1 opens its OWN unit, so it is NOT the subhead and silently vanishes. **The food reference actually ships its hero subhead as an `h2` → it does not render (a latent bug). We will use a `p` so ours renders.**
- **isCaseStudy (`:122`):** true when any heading matches the canonical set (the problem/the challenge/our solution/folio3 solution/business outcomes/technologies involved/the approach/about the client/the customer). We use "About The Client", "Challenges Faced", "Our Solution", "Business Outcomes".
- **About The Client (`:491-531`):** renders the blue client banner when a marker ("About The Client"/"The Customer") is present (as a heading or paragraph) OR `isCaseStudy && looksLikeFacts`. Fact chips = h3/h5 units with title < 42 chars. Client name = an h2 (< 60 chars) that isn't the marker. Description = paragraphs > 40 chars. With the marker present, the `looksLikeFacts` keyword test is bypassed, so any ≥1 short chips render.
- **Challenge cards (`:536-570`):** kept only if h3/h4 with **no paragraphs** and **title length > 45 chars**; needs **≥3** survivors or the whole block reverts to generic. No-icon challenge cards show their index number (1/2/3), not a checkmark.
- **Our Solution (`:574-611`):** triggers on a solution marker OR a `Folio3 (designed|implemented|partnered|developed|built|created|delivered)…` intro, plus ≥2 feature units (h3/h4, title < 62 chars). Renders once (`solutionRendered` guard). No-icon feature cards show a number badge, not a checkmark.
- **Business Outcomes (`:615-649`):** heading must match `business outcomes` (etc.); ≥2 h3/h4 cards. **A card with no icon and no leading number renders a check-circle fallback** → every outcome card needs a card-icons entry.
- **Generic card grid (`:997-1092`):** heading (h2) + ≥2 h3/p cards animates (each card `Reveal`-wrapped). Only the no-entries text tail is fully static. So "What The Client Needed" will be a card grid (animated). Generic cards with no icon show the blue checkmark → need card-icons entries.
- **CTA band (`:684-689`) / Schedule-a-1:1 (`:662`):** standard closing bands, matched by heading text.
- **card-icons (`content.ts:153`):** icon slug = title → lowercase, `&`→`and`, non-alphanumeric→`-`, trim, **slice(0,50)**. Value = path to any existing SVG on disk. 302 SVGs already in `public/icons/`.
- **Hero image chosen:** `wp-content/uploads/2024/01/integration-as-service-header-img.webp` — exists on disk, **831 × 747** (verified), thematically an integration illustration.

---

## PM — goal & acceptance criteria

**Goal:** Publish a new, on-brand case study telling how Folio3 rebuilt Wonderfold's Amazon-to-Business Central integration (Burq connector) — recovering a stalled rollout, clearing the FBM order backlog, and syncing two Amazon storefronts with Business Central.

**Acceptance criteria**
1. Route `/case-studies/wonderfold-amazon-business-central-integration/` builds and renders via OrderedRenderer.
2. Renderer treats it as a case study (canonical headings) — blue client banner renders.
3. Section flow: Hero → About The Client → Challenges Faced → What The Client Needed → Our Solution (incl. key features) → Business Outcomes → "Take A Seamless Cloud Ride" CTA band → Schedule-a-1:1 form.
4. Hero image + Reveal present; every image HTTP 200; 0 console errors; no duplicated CTA band.
5. ≥3 challenge cards, each > 45 chars. Real icons > 0, fallback checkmarks == 0.
6. Every JSON heading & paragraph appears in the rendered HTML (explicit assertion).
7. Only facts from the notes — no invented industry/size/location/timeline/numbers; no named Folio3 staff; no fabricated quote.

---

## ARCHITECT — smallest change

- Add ONE content JSON file (the page) + surgically add ONE page key to `card-icons.json` (single-line, minified). No component code changes. No touching home page, vercel.json, api/lead, analytics.
- Reuse existing on-disk images and existing SVG icons (no new artwork).
- **Consolidation decision:** the notes' "Solution" and "Key Features" are rendered as ONE canonical "Our Solution" feature-card grid (the reference pattern). Rendering them as two solution sections risks the `solutionRendered` guard silently dropping the second. Flagged to user.

---

## SM — stories (one section/file per story)

- S1: page skeleton + hero + meta (items[] stream, hero image 831×747, `p` subhead).
- S2: About The Client (chips + marker + name + description).
- S3: Challenges Faced (3 cards > 45 chars).
- S4: What The Client Needed (3 requirement cards).
- S5: Our Solution (marker + headline + `Folio3 built…` intro + 5 feature cards).
- S6: Business Outcomes (5 qualitative outcome cards — icons required).
- S7: Closing bands (Take A Seamless Cloud Ride CTA + Schedule-a-1:1).
- S8: card-icons.json entries (challenges 3 + needs 3 + solution 5 + outcomes 5), reusing existing SVGs.
- S9: build + Playwright verify (heading/paragraph presence assertion; icon vs checkmark count; image 200s; console errors).

---

## INPUTS MINED FROM NOTES  vs  GAPS

| # | Input | Status |
|---|-------|--------|
| 1 | Customer name / what they do | **Wonderfold** ✓. Runs 2 Amazon storefronts (Amazon–BC + Amazon BC specialty) and uses Dynamics 365 Business Central ✓. **Industry / company size / location: MISSING** — not in notes, will NOT invent. |
| 2 | Before state (pain) | ✓ Change of integration partner mid-project → complications; FBM orders not appearing/processing in live env → fulfilment delays; prior providers couldn't work in their restricted environment. |
| 3 | Why Folio3 | ✓ One-stop integration; any Microsoft ERP with any eCommerce; Burq connector works in the restricted environment others couldn't. |
| 4 | What was implemented / scope | ✓ Burq connector reads Amazon's complex JSON → writes to BC and fetches from Amazon; FBM job runs on live orders; specialty store priced from BC item price. Folio3 provided 100% of the input and proposed the Amazon→BC approach. **No timeline in notes.** |
| 5 | Quantified results | **MISSING** — notes contain zero numbers. Business Outcomes will be qualitative (no invented metrics). |
| 6 | Named customer quote | **MISSING / none.** Only named person is Folio3's PM (Muhammad Hassan Khan) — Folio3 staff, cannot be named on the page; no customer quote will be fabricated. |

**"At a glance" chips available from notes:** only `2 Amazon Storefronts` and `Dynamics 365 Business Central`. Standard `Industry / Company size / Location` chips are omitted (unsupported).

**Decisions taken on your behalf (to confirm):**
- Publish the real client name "Wonderfold" (existing case studies name clients).
- Consolidate Solution + Key Features into one "Our Solution" grid.
- Business Outcomes are qualitative (no numbers).
- **Customer approval:** must circulate before merge (cannot merge here anyway).

---

## STATUS LOG
- [x] Analyst — real files read & quoted.
- [x] Plan written to disk.
- [x] Checkpoint (a) — user chose: proceed with supported facts only; ANONYMIZE client.
- [x] Dev S1–S8 — page JSON + card-icons entry (16 icons, reused existing SVGs) authored.
- [x] QA S9 — `npm run build` OK; verified in real browser (Playwright/Chromium):
      - 29/29 headings + 19/19 paragraphs present in rendered HTML (0 missing).
      - 16 real icons (13 `<img>` all load + 3 masked glyphs); 0 fallback checkmarks (generic + outcome).
      - Hero image visible + zoomIn Reveal present.
      - 49 referenced assets HTTP 200; 0 broken images; 0 console errors; 0 request failures.
      - Visible "Take A Seamless Cloud Ride" band count = 1 (no duplicate); blue client banner rendered; challenge special layout rendered (≥3 cards, border-dashed).
      - 0 client-name/staff leaks (anonymized).
- [x] Commit + push to `claude/case-study-creation-qwb22y`.
- [ ] PR + Vercel preview link — BLOCKED: GitHub MCP is unauthenticated in this non-interactive session. Must be opened from an authorized session. Circulate to customer for approval before merge.

### Render-path notes (for future edits)
- Solution section intro must be an **h2** (renderer pulls `solIntro` from an h2 matching `Folio3 (built|implemented|…)`, NOT from a paragraph) — the one place that inverts render-contract rule #4. First authored as a `p`; it silently vanished; changed to h2 and it renders.
- "What The Client Needed" renders via the generic card grid (animated, `.svc-ic-glyph` icons). Solution + Business Outcomes render via the case-study special paths (`<img>` icons). Challenges render via the numbered problem-list layout.
- Schedule-a-1:1 form auto-appends (`OrderedRenderer.tsx:743`); no schedule section authored (avoids duplication).
