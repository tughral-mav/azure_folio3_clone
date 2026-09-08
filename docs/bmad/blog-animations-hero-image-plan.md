# BMAD Plan — /blog/ animations / hero image / media

**Task slug:** blog-animations-hero-image
**Branch:** claude/blog-animations-hero-image-uxzplx (working tree clean at start, was already on this branch)
**Reported symptom:** "/blog/ is missing its animations / hero image / media. Other pages animate on scroll; this one does not."

---

## ANALYST — what the real files say (quoted, not assumed)

### The /blog/ route is bespoke, NOT the content-kit marketing-page machinery
- `src/app/blog/page.tsx` (the index) and `src/app/blog/[slug]/page.tsx` (a post) are
  hand-written React routes. They build content from `getBlogSlugs()/getBlogPost()`
  (`src/lib/content.ts`), NOT from a `content-kit/*.json` page with an `items[]` stream.
- Therefore they never go through `CapturedRenderer` → `OrderedRenderer`, which is the
  ONLY place `<Reveal>` scroll animation is wired in for marketing pages
  (`CapturedRenderer.tsx:66` dispatches to OrderedRenderer on `items[]`).

### No Reveal anywhere in the blog route
- `grep -rn "Reveal" src/app/blog/` → **nothing**.
- The three components the index renders — `BlogCategoryList`, `OneToOneCTA`,
  `Breadcrumb` — none import `Reveal` either (verified by grep).
- This matches the render-contract diagnostic point 4 verbatim: *"Blog posts have NO
  scroll animation, by design — the blog route imports no Reveal component."*

### The hero image/media DOES exist in code and on disk
- `blog/page.tsx:27` renders `our-blog-banner.webp` as a full-bleed background (`fill`,
  opacity-30) and `:34` renders `blog-mock.webp` (width 560 × height 380) as the hero
  illustration.
- Both files exist on disk: `public/wp-content/uploads/2023/06/our-blog-banner.webp`
  (50,386 B) and `blog-mock.webp` (49,916 B).
- So the hero image is NOT removed by a bad `w/h` (that failure mode belongs to the
  content-kit `items[]` renderer, which this page does not use).

---

## PM — goal, acceptance criteria, and the decision that needs YOUR confirmation

**Goal (restated):** make `/blog/` behave like the other pages — hero image visible +
scroll animation as you scroll.

**Key finding that changes the plan:** unlike a marketing page, `/blog/` has **no
content-kit JSON to edit**. Its animation is not data-driven and cannot be turned on by
editing `content-kit/`. Adding scroll animation to `/blog/` therefore REQUIRES editing
component code (wrapping sections in `<Reveal>`), which your brief says I must stop and
flag before doing.

**Two separable issues:**
1. **Scroll animation** — absent BY DESIGN (no Reveal in the blog route). This is
   architectural. Fixing needs a component-code change → needs your go-ahead.
2. **Hero image / media** — code + files are present. Verifying with a real browser
   whether it actually renders (VERIFY step below) to confirm whether there is a genuine
   bug or whether the "missing image" perception comes from the lack of entrance motion.

**Acceptance criteria (pending confirmation):** TBD after VERIFY + your decision.

---

## VERIFY (evidence, not assumptions) — status: DONE

`npm run build` → green (exit 0). Prod server + Playwright (Reveal renders
`<div class="reveal">`, so `.reveal` count = number of scroll-animation wrappers):

| Metric | `/blog/` | `/azure-data-analytics/` (marketing, for contrast) |
|---|---|---|
| HTTP | 200 | 200 |
| `.reveal` wrappers (scroll motion) | **0** | **34** |
| `.float-anim` | 0 | 0 |
| hero `blog-mock.webp` | **present, renders 589×518** | n/a |
| banner `our-blog-banner.webp` | **present, renders 1280×480** | n/a |
| broken images (HTTP ≥400) | **none** | none |
| console errors | **none** | none |

### Conclusions
1. **Hero image / media is NOT missing.** Both the hero illustration and the banner
   background render, HTTP 200, no broken images, no console errors. There is no image
   bug to fix. (Likely perceived as "missing" because it sits static — no zoomIn
   entrance, no float — so the page feels dead next to the animated pages.)
2. **Scroll animation is absent BY DESIGN.** 0 reveal wrappers on `/blog/` vs 34 on a
   real marketing page. The blog route + its components import no `Reveal`. This is
   render-contract diagnostic point 4 exactly.
3. **No content-kit fix exists.** `/blog/` is not driven by a `content-kit/*.json`
   `items[]` page, so nothing in `content-kit/` can turn motion on. Adding animation
   REQUIRES a component-code change → per the brief, STOP and confirm first.

## DECISION — user said "continue" → proceed with recommended smallest change (animate blog index).

## ARCHITECT — smallest change
Reuse the EXISTING `Reveal` component + `f3-*` keyframes (already in the codebase; nothing
installed). Touch only the two files the blog *index* is built from. Do NOT edit the shared
`OneToOneCTA` / `Breadcrumb` (blast radius across the whole site) and do NOT touch blog POSTS.

## SM — stories
1. Hero illustration animates (zoomIn entrance + gentle float) — `blog/page.tsx`.
2. Section intro heading animates on scroll — `BlogCategoryList.tsx`.
3. Post cards fade in on scroll, staggered — `BlogCategoryList.tsx`.

## DEV — what changed
- `src/app/blog/page.tsx`: wrapped the hero `blog-mock.webp` in
  `<Reveal animation="zoomIn">` and added `float-anim` to the image (mirrors the marketing
  hero pattern at `OrderedRenderer.tsx:181`).
- `src/components/sections/BlogCategoryList.tsx`: intro heading block → `Reveal fadeInUp`;
  each post card → `Reveal fadeInUp` with a `delay={min(i,5)*60}` stagger and `h-full` so the
  grid cell still stretches. Filter interaction preserved (keyed by slug).

## QA — verified in a real browser (build green, prod server + Playwright)

| Metric | `/blog/` BEFORE | `/blog/` AFTER |
|---|---|---|
| `.reveal` wrappers | 0 | **125** (1 hero + 1 heading + 123 cards) |
| `.reveal.is-in` after scroll | 0 | **125** (every one fires) |
| `.reveal` left invisible w/ text | — | **0** (nothing stuck hidden) |
| `.float-anim` (hero) | 0 | **1** |
| hero image renders | yes 589×518 | yes 589×518 |
| broken images (HTTP ≥400) | none | **none** |
| console errors | none | **none** |
| category filter still works | yes | **yes** — click tab → 53/53 cards visible |

Screenshots captured (hero + card grid): layout intact, no breakage.

## STATUS: DONE — committed & pushed to `claude/blog-animations-hero-image-uxzplx`.
