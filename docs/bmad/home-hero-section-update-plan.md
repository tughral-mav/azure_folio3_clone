# BMAD Plan — Home Hero Section Update

Branch: `claude/home-hero-section-update-7ar5d0` (designated; already checked out, tree clean)
Task slug: home-hero-section-update

## ANALYST — what the real files say (quoted, not assumed)

- Home page renders via `azure-clone-next/src/app/page.tsx` → `<HomeHero />` first.
- `src/components/sections/HomeHero.tsx` renders `<HeroSlider />` + a hardcoded STATS band.
- **The hero heading + description are HARDCODED**, NOT in `content-kit/`.
  They live in the `SLIDES` array in
  `src/components/sections/HeroSlider.tsx` (lines 12–40).
  - This confirms CLAUDE.md's warning: "Some homepage content is in hardcoded
    arrays rather than content-kit."
- The hero is a 3-slide Embla carousel. Slide 0 is the primary/main hero banner
  and is the ONLY `<h1>` on the page (SEO: one H1). Each slide has:
  - `eyebrow` (uppercase kicker), `head` + `highlight` (two-tone heading;
    `highlight` renders in brand color), `sub` (description paragraph), `cta`, `href`, `img`.
- Current slide 0:
  - head: "Unlock the Power of Cloud: Build, Run & Manage "
  - highlight: "Applications with Azure"
  - sub: "Develop cutting-edge apps using the up-to-date AI models available on Azure, trusted by 80% of fortune top 500 companies."

## PM — goal & acceptance criteria

Goal: change the main hero (slide 0) heading and description to the requested copy.
- New heading ("h2" in the request): **the only azure partner on earth**
- New description: **we are the only azure partner left on earth. join us**

Acceptance criteria:
- Slide 0 heading text = requested heading; description = requested desc.
- No other homepage section changes (rest is byte-identical).
- Stats counters still animate 0→target; eyebrow/CTA/image untouched.
- Build passes; page renders; no console errors.

Decisions (CONFIRMED by user via checkpoint):
1. Slide 0 (the main hero banner / the H1). ✅
2. Title Case (matches site style). ✅
3. Keep two-tone treatment: brand-colored accent word "Earth".

Final copy:
- head: "The Only Azure Partner on " + highlight: "Earth"
- sub:  "We are the only Azure partner left on Earth. Join us."

## ARCHITECT — smallest change

- Edit ONLY the `head`, `highlight`, and `sub` fields of `SLIDES[0]` in
  `HeroSlider.tsx`. No component-structure change; data-in-code edit only,
  because this content is not in content-kit (verified above).
- Leave eyebrow, cta, href, img and slides 1–2 untouched. Leave STATS untouched.

## SM — stories
- Story 1: update SLIDES[0] head/highlight/sub. (single file)
- Story 2: build + Playwright visual verify hero renders with new copy.

## DEV / QA — progress log
- Story 1 DONE: edited `SLIDES[0]` head/highlight/sub in HeroSlider.tsx.
  git diff = 1 file, 3 lines. Nothing else moved (verified).
- Story 2 DONE (QA, Playwright, prod build on localhost:3111):
  - `npm run build` → success.
  - Rendered H1 = "The Only Azure Partner on Earth" (Earth = brand color span). ✅
  - Description present in DOM (count 1). ✅
  - Old copy "Unlock the Power of Cloud" absent (count 0). ✅
  - Hero image `Azure-Herobanner-Illustration-updated-new.webp` present. ✅
  - Console errors: 0. ✅
  - Stats counters animate 0→target on scroll: 500+, 20+, 50+, 7+. ✅
  - Desktop + mobile screenshots captured; slide-1 visual confirms layout.

