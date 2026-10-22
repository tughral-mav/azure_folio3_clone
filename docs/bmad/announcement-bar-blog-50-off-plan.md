# BMAD Plan — Blog promo bar: "50% off all services"

**Task slug:** `announcement-bar-blog-50-off`
**Branch:** `claude/announcement-bar-50-percent-jpkhv1` (designated by the harness; do NOT use master)
**Status:** ✅ COMPLETE — approved (add component / copy B / corner slide-in), built & verified
**Last updated:** 2026-07-24

---

## ANALYST — what the real files say (quoted, not assumed)

- The Next.js app is in `azure-clone-next/`. Blog index page:
  `azure-clone-next/src/app/blog/page.tsx`. It is a **hand-written React page**
  (not the `items[]`/OrderedRenderer content system): banner `<section>` +
  `<Breadcrumb>` + `<BlogCategoryList>` + `<OneToOneCTA tone="dark" />`.
  → The RENDER CONTRACT rules about `items[]`, hero `w>=180`, card icons, etc.
    do NOT apply here — this page never touches OrderedRenderer.
- Root layout `src/app/layout.tsx` renders `<Header/> <main>{children}</main> <Footer/>`.
  **Header is `sticky top-0 z-50`** (Header.tsx:27). Any top-anchored bar must sit
  clear of it; a fixed bar needs `z` chosen relative to `z-50`.
- **No promo / announcement / popup / exit-intent infrastructure exists** anywhere
  in `src/` or `content-kit/` (grep confirmed — the only "promo" hits are the word
  inside unrelated page copy). Nothing to reuse; this is net-new.
- `content-kit/` is **static, server-rendered page data**. It has no mechanism for
  scroll listeners, `localStorage`, timers, or dismiss state. Client components that
  DO carry such behavior already exist and are marked `'use client'`
  (e.g. `src/components/ui/Reveal.tsx`, `sections/Carousel.tsx`).
- Out-of-bounds (confirmed untouched by this plan): `vercel.json`, env vars,
  `src/app/api/lead/`, analytics, the home page.

## PM — goal & acceptance criteria (CONFIRM WITH ME)

**Goal:** Show visitors on **/blog/** a limited-time "50% off all services" promo.
It appears **after the visitor scrolls past 10% of the page** and stays until they
**dismiss it with the X**. It must not harass returning visitors, must not cover the
primary CTA, and must not break mobile.

**Acceptance criteria**
1. Renders **only on `/blog/`** — not the home page, not any other route.
2. Trigger: appears once the visitor scrolls **≥10%** of page height.
3. Dismiss: an **X** closes it; once closed it stays closed.
4. **Frequency cap:** after dismissal it does **not** reappear for the same
   browser for **N days** (proposed **30**) — stored in `localStorage`, no cookies,
   no PII, no analytics.
5. **Scheduling:** explicit **start** and **end** date. Before start / after end the
   bar renders **nothing at all** (returns null) — it does not linger, no cleanup
   needed. Proposed window: **start 2026-07-25 → end 2026-08-31** (please confirm).
6. Does **not** cover the primary CTA and does **not** break layout at mobile or
   desktop. Respects `prefers-reduced-motion`.
7. All copy, the offer, the CTA link, the dates, the scroll %, and the cap live in a
   **new content-kit JSON** so the copy/dates can be edited later without code.

## ARCHITECT — smallest change that satisfies it (⚠ NEEDS YOUR OK: it touches code)

**Why this cannot be data-only (I am flagging this per your rule):**
A scroll-triggered, X-dismissible, frequency-capped, date-gated bar is *interactive
client behavior*. `content-kit/` JSON is static server-rendered data — it has no way
to run a scroll listener, read `localStorage`, or hold dismiss state. There is no
existing promo component to feed. So this task **requires a small amount of new
component code**. There is no data-only path; if we can't add a component, the
feature can't exist.

**Smallest architecture (keeps as much as possible in data):**
1. **NEW data file** `azure-clone-next/content-kit/promo-blog.json` — holds copy,
   offer, CTA label+href, `startDate`, `endDate`, `scrollTrigger` (0.10),
   `frequencyCapDays` (30), `enabled`. Marketer-editable, no code.
2. **NEW client component** `src/components/sections/PromoBanner.tsx`
   (`'use client'`, ~1 small file) — reads the JSON, implements scroll-trigger +
   dismiss + `localStorage` cap + date gating, returns `null` when out of window /
   dismissed / capped. Uses existing CSS/animation conventions; no new libraries.
3. **ONE line** added to `src/app/blog/page.tsx` — mount `<PromoBanner/>`.

**Placement recommendation:** a **bottom slide-in card (corner toast)** —
desktop bottom-right, mobile a compact bottom bar with the X always reachable.
This keeps the centered primary CTA and the footer `OneToOneCTA` band uncovered.
(Alternative: a bar directly under the sticky header — rejected because it either
overlaps the `z-50` header or causes layout shift on appear.)

**Files touched:** `blog/page.tsx` (+2 lines), + 2 new files. Nothing else.

## SM — stories

- **S1 — Copy:** draft 3 variants, get approval. *(checkpoint)*
- **S2 — Data:** author `content-kit/promo-blog.json` with approved copy + rules.
- **S3 — Component:** build `PromoBanner.tsx` (scroll 10%, X dismiss, 30-day cap,
  date gate, reduced-motion, mobile-safe, non-CTA-covering).
- **S4 — Mount:** add `<PromoBanner/>` to `/blog/` only.
- **S5 — QA:** `npm run build`; Playwright verify at desktop + mobile — bar appears
  after 10% scroll, X dismisses, stays dismissed, out-of-window renders null, no
  console errors, primary CTA not covered, links resolve on this branch.

## QA — evidence log
Decisions approved by user: add component ✓ · copy variant **B** ✓ · **bottom
corner slide-in** ✓. Defaults kept: CTA `/contact-us/`, window 2026-07-25→08-31,
cap 30 days.

- **Build:** `npm ci && npm run build` → success. `/blog` route builds (4.59 kB).
- **Playwright (prod server, clock overridden), 19/19 PASS:**
  - Before start (2026-07-24): promo absent (renders null). ✓
  - After end (2026-09-01): promo absent — does not linger. ✓
  - In window, pre-scroll: hidden (opacity 0, non-interactive). ✓
  - After ≥10% scroll: visible (opacity 1). ✓
  - Copy = variant B (headline / offer body / "Get my 50% off"). ✓
  - CTA href = `/contact-us/` (resolves on this branch). ✓
  - Corner card, right/bottom anchored, width 448px (not full-width) → primary
    header CTA and footer CTA band uncovered. ✓
  - X dismisses; dismissal written to localStorage; reload keeps it closed
    (frequency cap). ✓
  - Mobile 390px: visible, fits viewport, X on-screen. ✓
  - Zero console/page errors, desktop + mobile. ✓
- Screenshots: promo-desktop.png, promo-mobile.png (scratchpad) — visually confirmed.

**Status: COMPLETE — ready to commit/push.**

## Conversion tracking (out of bounds — for you to wire)
I will **not** touch analytics or the lead API. When ready you'll want to fire two
events from GTM/your analytics: **promo_view** (bar shown) and **promo_click** (CTA
clicked). I can expose stable hooks (e.g. `data-promo="blog-50off"` attributes and a
`window.dataLayer.push` call site left commented) for whoever owns GTM to wire —
tell me if you want those hooks added.

## Open decisions for you
- A) OK to add the small client component (only way to ship this)? 
- B) Which copy variant (see chat).
- C) Start/end dates (proposed 2026-07-25 → 2026-08-31).
- D) CTA destination (proposed `/contact-us/`).
- E) Frequency cap length (proposed 30 days).
- F) Placement: bottom corner slide-in (recommended) vs top bar.
