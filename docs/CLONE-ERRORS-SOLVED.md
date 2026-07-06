# Azure Clone — Errors Solved (full project log)

Final state: **60/60 design pages pass the 10-category parity checker · 0 broken links (100 unique) · 0 console/JS errors · production build clean (190 static pages) · 404 handling works.**

---

## 1. Images & media

| # | Error | Fix |
|---|---|---|
| 1 | **All 475 VP8X webp images served broken** — the Next.js image optimizer + `trailingSlash:true` (→ `/_next/image/`) + AVIF-first choked on the extended-webp format, breaking images on retail/healthcare and others | Re-encoded every VP8X webp to standard webp at q90 (`sharp`). 0 broken images. |
| 2 | **Card icons that precede their title rendered as a checkmark fallback** — `parse()` attached an image to the *previous* unit when the order was `[img, h3, text]` | `parse()` now buffers images and attaches them to the *next* heading (card icon) or flushes to the current block on text (icon-list). |
| 3 | **Icon+text list sections dropped their icons and all-but-first paragraph** (e.g. data-viz "Benefits") — no `h3` titles, so they hit the single-block path which only rendered `units0Paras` | Added an ordered `blocks[]` model; render an icon+text grid by pairing each small icon with its following text. |
| 4 | **`data-visualization` rendered 13 of 45 images** | Fixed by #2 + #3 — now full image coverage. |
| 5 | **Service-name cards with CSS photo backgrounds not rendered** (services "Benefits": Azure Databricks/Synapse/SQL/AI-ML/Cognitive/Stack/Security) | Re-captured card backgrounds (`extract-card-bgs`) → render name-over-photo cards. |
| 6 | **Spurious small image leaking into a trailing grid** (why-choose `about-mock` w=200) | Consume small decorative images in bulleted single-block sections only. |
| 7 | **Blog body images were lazy-load placeholders** | Recaptured with scroll + `currentSrc` resolution. |
| 8 | **Bespoke pages missing images** (contact-us 3, thank-you 2, blog 1, testimonials 7) | Rebuilt each page with the real images (see §4). |

## 2. Layout & format fidelity

| # | Error | Fix |
|---|---|---|
| 9 | **Hero showed the SEO H1 ("AZURE FOR CONSTRUCTION") instead of the visible tagline H2** ("Building Tomorrow, Today With Azure") | Detect all-caps SEO H1 + following H2 → show the tagline. |
| 10 | **n-tabs "Azure Solutions" sections rendered as a flat list** | Detect the image-bounded tab structure → render the live's tabbed widget (`RetailSolutionTabs`). |
| 11 | **Flip-box hover animations missing back text** — the original capture never grabbed it | Re-captured fronts + backs + icons (`extract-flips`, 26 pages) → real `FlipCard`. |
| 12 | **Flip cards in a sparse 2×2 grid** | Single row (`grid-cols-4` for 4 cards). |
| 13 | **"Why Choose Folio3?" missing its bullet points and showing a wrong stock photo** | Render the `li` bullets; drop the spurious photo. |
| 14 | **Process/methodology steps missing** — they live in an Elementor *slides carousel* the capture skipped | Re-captured (`extract-slides`) → numbered 01–0N stepper (icon + title + desc). |
| 15 | **All stat counters missing** ("922+ Projects Deilvered", "98% User satisfaction"…) | Re-captured counter widgets (`extract-counters`) → render the Why-Choose trust bar + CTA stats. Matched the live typo "Deilvered". Added decimal support (4.9). |
| 16 | **Home DiscoverCloud only rendered the active tab** → inactive tabs' 12 icons + 3 service links were never in the DOM | Render every tab panel (inactive ones hidden) — visible design unchanged. |
| 17 | **n-tabs big intro headings missing** ("Boost Efficiency, Cut Costs & Reduce Risks") — a span the capture skipped | Re-captured (`extract-tabheads`) → eyebrow + heading. |
| 18 | **Sub-heading "Efficiency, Security, and Innovation In Construction" missing** | Surfaced via the tab-intro/heading work where reliable; the noisy general capture was deliberately *not* wired in. |

## 3. Links & routing

| # | Error | Fix |
|---|---|---|
| 19 | **`/testimonials/` wrongly redirected to `/about-us/`** — a hardcoded redirect shadowed a real 200 page, so testimonials never rendered | Removed the bogus redirect; testimonials renders its own page (awards, photos, industries). |
| 20 | **`/case-studies/wph-intellifabric/` linked but 404** | Added the live's 301 → `popcorn-producer-intellifabric-dashboards`. |
| 21 | **Dead "Read More" links** (`href="#"`) | Guarded `CaseFlip`/`CaseStudies` against `#`/empty hrefs. |
| 22 | **Missing in-content links** (logistics→data-science-ai, retail-analytics→Alibaba, case-studies index 9→2, copilot-in-retail→managed-services, privacy-policy→cookie-policy, data-viz→retail/healthcare) | "Explore More" threshold ≥2→≥1, narrowed exclusions to utility pages, cap 8→12, derive titles from the href slug for generic anchors ("here"→"Cookie Policy"), and added the verified lazy-slider links. |
| 23 | **Nested pages missing parent breadcrumb** | `Home » Parent » Page` derived from `page.url`. |
| 24 | **Food Verification case card had no thumbnail** | Mapped the case to `food-verification.webp`. |

## 4. Bespoke pages rebuilt to match the live

| Page | Fix |
|---|---|
| **contact-us** | Hero banner (`contact_us-banner` bg + `azure-banner-contact-us`), "Have questions?" form + contact details (Email/Phone/Support), `contact-us-1` over `Oval-bg`, "Ready to Work…" CTA band (`Scale-Your-Business`), Schedule CTA. |
| **thank-you** | 2-column message + `thankyou-right-image` + Schedule CTA (offices map). |
| **blog** | Banner header (`our-blog-banner` + `blog-mock`) + post grid + Schedule CTA. |
| **testimonials** | Now renders (unblocked by #19): hero, awards badges, "Over 10,000 clients", industries, CTA. |

## 5. Earlier systemic fixes (pre-fidelity pass)

- Reveal/IntersectionObserver misfire left content invisible → safety-net timeout.
- `isChromeImg` too broad (matched partner badges) → tightened.
- Headingless image bands skipped (`[].every()` true) → length guard.
- Double hero image on cloud-service → render once as full-bleed.
- Duplicate-capture conflict clobbering bespoke prerenders → reserve duplicates.
- 122 blog posts: body images, thumbnails, 33 CPT fragments excluded.
- Hover effects (card scale/border, flip) rebuilt with `useState` (Tailwind `group-hover:` doesn't compile here).

## Verification tooling built
`page-checks` (10 categories), `sweep-images` (rendered image-set diff), `func-check` (link integrity + form anchors), `console-check` (JS errors), and re-capture scripts: `extract-flips`, `extract-counters`, `extract-slides`, `extract-tabheads`, `extract-card-bgs`, `extract-links`.
