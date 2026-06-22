# Home Page — Comprehensive Clone vs Live Inconsistency Audit (v2, visually verified)

Re-done with **side-by-side (live | clone) visual comparison of every section**
(verify/sbs/), plus CSS/animation/slider inspection. v1 caught structure; v2 adds
the **design-level** inconsistencies that were missed (alignment, button styles,
card styling, colors, counters).

Legend: ❌ wrong/missing · ⚠️ partial · 🎞️ animation/interaction gap

---

## Section-by-section (visually confirmed)

### 1. Hero ❌🎞️
- LIVE = **3-slide auto-slider** (Swiper/`e-n-carousel`): autoplay, loop, swipe. Slides: Cloud / IntelliFabric / HR-AI, each own headline+highlight+CTA+illustration.
- CLONE = **static, slide 1 only**.

### 2. Partner Designations ⚠️
- Card layout/spacing differs; verify Microsoft 4-square logo + 4 designation cards.

### 3. Discover Cloud Opportunities ❌
- LIVE: **horizontal tab pills** on top → **2-column** panel: white card with **4 icon list-items** (each its own icon) + EXPLORE button on the **left**, **large isometric illustration on the right**; light-blue **droplet background**. h=1065.
- CLONE: **vertical tab sidebar**, plain panel, **no illustration**, no list icons, plain bg. h=684.

### 4. Our Industries ❌🎞️ (MISSING)
- LIVE: **Slick slider** of **5 portrait image boxes** (Media & Entertainment, Manufacturing, Healthcare, Retail, Financial Service) with **hover title reveal** + **arrows that turn blue on hover**. h≈853.
- CLONE: **section does not exist** (wrongly removed).

### 5. Awards & Recognition ❌🎞️
- LIVE: **slider band** — heading + **nav arrows** + scrolling award **badges**, on **bright blue** gradient. h=180.
- CLONE: **static navy band** (`#00217F`), **no badges, no slider, no arrows**; heading rendering off; wrong order (sits where Industries belongs).

### 6. Your Next Big Idea ⚠️
- Close (3 cards). Verify card icon + spacing.

### 7. Scale Your Business ❌  *(missed in v1)*
- LIVE: text **left-aligned**; **navy** "GET STARTED WITH AZURE" button (left); **blue gradient** bg.
- CLONE: text **center-aligned**; **white** button (center); **flat** brand-blue bg.

### 8. Work With Top CSP Experts ⚠️
- Structure matches (blue-header card + 2 buttons) but clone card is **shorter/compact**; verify heading visibility + card proportions. Live h=785 vs clone h=676.

### 9. Ensuring Productivity / Agility / Scalability ⚠️
- Live h=718 vs clone **h=434** — clone is missing imagery/spacing or a sub-row; verify the 3-column content + any icons.

### 10. Our Process ❌🎞️  *(still wrong after v1 tweak)*
- LIVE: **light translucent-blue cards** with bold **"STEP 1/2/3/4"** labels + **circle icons**, on **`#D7E9FF`** bg.
- CLONE: **solid brand-blue cards**, **no STEP labels**, **diamond ◆ placeholders**, lighter bg, **no animation**.

### 11. Explore Why Businesses Trust Folio3 ⚠️
- 6 cards; verify icons + counters in the "750+/1,000+/100+" cards (live may animate). Live h=1022 vs clone h=919.

### 12. Real Results, Real Impact ❌🎞️  *(design differs)*
- LIVE: **dark-blue flip-box cards** (`#0C2976`); on hover the front **flips/slides** to reveal the back. Cards are compact, lower in a taller section.
- CLONE: **white static cards** with company badge + "Read the story →"; **no flip**.

### 13. Your Common Queries (FAQ) ⚠️
- Verify accordion open/close animation + default-open item.

### 14. Schedule a 1:1 Call Today ❌🎞️  *(missed details)*
- LIVE: stats **count up from 0+** (animated); **world-map background** with markers; form fields **Full Name / Phone / Email / Message**.
- CLONE: **static** stats (500+/650+/1000+/20+, no count-up); **no map**; fields **Full name / Work email / Phone / Company / message** (different set).

### 15. Footer ✅ (97% match)

---

## Cross-cutting inconsistencies

**Interactions / animations missing on clone:** hero auto-slider · Industries slider+hover · Awards slider · Real Results flip · Our Process step-cards animation · 1:1 counters · button/link/card hover transitions.
**Working (added earlier):** entrance reveals (fadeInUp/Left, zoomIn 1.25s), hero float, hero stat counters.

**Visual:** widespread **height divergence** (Discover Cloud 1065→684, Ensuring 718→434, etc.) → cascade. **Alignment** wrong on Scale (center vs left). **Button styles** wrong (Scale white-vs-navy). **Card styles** wrong (Our Process, Real Results). **Colors** wrong (Awards navy vs blue; Our Process bg). **Counters** static on 1:1.

**Missing imagery:** Discover Cloud illustration + tab icons · 5 Industries photos · Awards badges · 1:1 world map · (Discover Cloud droplet bg).

---

## Prioritized fix list (home only)
1. **Hero → 3-slide slider** (autoplay/loop/swipe).
2. **Re-add Industries** (5-box slider + hover title reveal + arrow hover).
3. **Rebuild Discover Cloud** (horizontal tabs + 2-col + illustration + list icons + droplet bg).
4. **Real Results → flip-boxes** (dark front, hover flip).
5. **Our Process** → light STEP cards + circle icons + `#D7E9FF` bg + animation.
6. **Awards → slider band** (bright blue, badges, arrows).
7. **Scale Your Business** → left-align + navy button + gradient.
8. **1:1** → animated counters + world-map bg + correct form fields.
9. **Ensuring / CSP / Next Big Idea / Common Queries** → height + content reconciliation.
10. **Hover transitions** site-wide (buttons/links/cards).
