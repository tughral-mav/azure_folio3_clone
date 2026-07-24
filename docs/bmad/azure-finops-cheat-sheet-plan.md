# BMAD Plan — Azure FinOps Cheat Sheet lead magnet

**Task:** Lead magnet — *"The Azure FinOps Cheat Sheet: 15 Ways to Cut Your Azure Bill by 30%+"*
**Campaign goal:** Capture high-intent B2B leads and drive discovery calls for Azure Cloud Cost Optimization / FinOps consulting.
**Persona:** IT Directors, VPs of Infrastructure, FinOps Managers running enterprise Azure workloads, under pressure to cut spend without hurting performance.
**Branch:** `claude/azure-finops-lead-magnet-sc77sp` (per session instructions; NOT master).
**Status:** Analyst ✅ · PM ✅ (approved) · Architect ✅ · SM ✅ · Dev ✅ · QA ✅ (all checks pass)

---

## ANALYST — what I actually found (quoted from the real files)

### Routing / how a page comes to exist
- `src/app/[...slug]/page.tsx` → `getCaptured(slug.join('/'))`; `dynamicParams = false`; params from `getMarketingSlugs()`. So a page exists **only** if a JSON file exists in `content-kit/content/` AND its slug is returned by `getMarketingSlugs()`.
- `content.ts:134` `slugToFile` → `slug.replace(/[^a-z0-9]+/gi,'_')`. `getMarketingSlugs()` (content.ts:370) reads every non-`blog_`, non-`RESERVED` json, and derives the route **from the file's `url` field** (`data.url` → path segments). So the new file's `url` must be the intended path.
- Global chrome: `layout.tsx` renders `<Header />` + `<Footer />` around `<main>`. The nav/footer "sections" inside captured JSON are **filtered out** by `isChrome()` (OrderedRenderer.tsx:57) — I do **not** need to author nav/footer.

### The two render paths (RENDER CONTRACT #2 confirmed)
- `CapturedRenderer.tsx:66` — if any section has a non-empty `items[]` → `OrderedRenderer` (modern, ~60 Reveal wrappers). Else legacy. **=> author with `items[]`.**

### Hero (RENDER CONTRACT #1 & #4 confirmed)
- `OrderedRenderer.tsx:133-181`: hero = the section containing the `h1`.
  - subhead `sub = h1u.paras[0]` → **must be a `p`** in the same section (contract #4).
  - `illo = [...].find(im => im.w >= 180)` (line 144) then gated `{illo && <Reveal animation="zoomIn"><Image class="float-anim".../>}` (line 181). **=> hero img MUST have real `w`≥180 & `h`.**
  - CTAs: up to 3; first is solid, rest outline. Breadcrumb auto-rendered after hero.

### Card grid = the animated workhorse (used for the 15-ways preview etc.)
- A section = `h2` + optional `p` subtitle + ≥2 `h3`/`h4` "entry" units (each with one `p` body) → `renderGeneric` card grid, every card `<Reveal animation="fadeInUp" delay={j*80}>` (OrderedRenderer.tsx:1061-1101).
- Card icon = `cardIcon(title)` → `getCardIcon(pageSlug, title)` → `card-icons.json[urlPath][iconSlug(title)]`. Missing = generic checkmark (contract #3). `iconSlug` (content.ts:153) = lower, `&`→`and`, non-alnum→`-`, **truncated 50 chars**. Manifest key = **url path** `azure-finops-cheat-sheet` (hyphens), NOT the underscored slug.
- Card shows **only its first paragraph** (contract #5).

### Lead form band (the capture form)
- Section whose `h2` matches `/schedule a 1:1 call|book a free|get in touch with our team/i` → `<OneToOneCTA tone="light"/>` (OrderedRenderer.tsx:662). If none matched, one is auto-appended at the end (line 743). So the form is always present at `#pgForm`.
- `OneToOneCTA.tsx`: heading **hardcoded** "Schedule a 1:1 Call Today" + world map + 4 stat counters + `<ContactForm/>`.
- `ContactForm.tsx`: fields Full name*, Work email*, Phone, Company, "How can we help?"*. POSTs `/api/lead/`; on success `router.push('/thank-you/')`. Honeypot + optional Turnstile.

### FAQ (sidecar-driven)
- `getFaqFull(url)` reads `faq-full.json[slugOfRoute]` (underscored slug), needs ≥2 items. Renders accordion; if no section heading matched, auto-rendered before the CTA (OrderedRenderer.tsx:718). **=> add a `faq-full.json` entry keyed `azure_finops_cheat_sheet`.**

### Minimum counts that silently kill sections (contract #7)
- trust band ≥2 logos; FAQ ≥2; Explore More ≥2; flip cards ≥2. Case-study "Problem" cards need ≥3 titles each >45 chars (contract #6) — **not used on this page.**

### Existing thank-you
- `src/app/thank-you/page.tsx` (reserved bespoke route): generic "Thank you for getting in touch!" + `<OneToOneCTA tone="dark"/>`. `robots: noindex`. This is where the form lands.

### Candidate on-disk imagery (public/wp-content/uploads/…)
- Hero illo candidates: `2024/09/Azure-Herobanner-Illustration-updated-new.webp`, `2023/07/azure-cloud-profressional-services.webp`, `2023/05/x835687_Cloud_computing_technology_concept…-1024x574.png`.
- Cost-themed section imagery: `2024/12/microsoft-fabric-cost-optimization.jpg`, `2024/12/strategies-for-cost-optimization-in-microsoft-fabric.jpg`, `2026/01/inventory-cost-management.webp`, `2024/07/seamless-cloud-ride-with-us.webp`.
- Card icons: 322 SVGs in `public/icons/` (20 folders) to reuse.

---

## PM — goal & acceptance criteria (CONFIRM WITH MARKETER)

**Goal:** A published, on-brand landing page that presents the "15 Ways" cheat sheet as a gated download, captures the lead via the existing form, and routes to a thank-you — driving discovery calls for FinOps consulting.

**Acceptance criteria:**
1. New page at `/azure-finops-cheat-sheet/` renders through the **modern** OrderedRenderer (items[]), fully animated.
2. Hero: real illustration (w≥180) + zoomIn/float animation + subhead as `p` + primary CTA "Get the Free Cheat Sheet" → `#pgForm`.
3. A preview of all **15 tactics** (grouped into 4 pillars) rendered as animated card grids; **every card has a real icon (0 fallback checkmarks)**.
4. "What's inside", "Who it's for", "Why Folio3" proof, and an FAQ (≥2, via sidecar).
5. The capture form present at `#pgForm`; submitting routes to `/thank-you/`.
6. The **cheat-sheet asset itself** produced as a branded PDF (cover, TOC, 15 tactics) and placed in `public/`.
7. Build passes; Playwright visual QA passes all render-contract checks; internal links resolve on this branch; zero console errors.
8. A written **wiring hand-off** for anything I must not touch (lead API, delivery/email, form copy).

**Decided on the marketer's behalf (flag at checkpoint):**
- Form copy stays "Schedule a 1:1 Call Today" (shared `OneToOneCTA` component — changing it is component code touching every page). Page copy frames it as "Tell us where to send your cheat sheet / book a review."
- **PDF delivery** (email the file / show a download button on thank-you) is **out of bounds** (lead API + form redirect are locked). I build the asset + pages and hand off the exact wiring.

---

## ARCHITECT — smallest change that satisfies it

**Data-only** (no component code changed):
1. `content-kit/content/azure_finops_cheat_sheet.json` — the landing page, authored with `items[]` sections that map to renderer patterns proven above.
2. `content-kit/card-icons.json` — surgical one-line-append of icon mappings for every card (reuse existing `/icons/**` SVGs).
3. `content-kit/faq-full.json` — add `azure_finops_cheat_sheet` FAQ entry (≥2 Q&A).
4. The PDF asset in `public/downloads/azure-finops-cheat-sheet.pdf` (+ a cover thumbnail image if useful).

**Not touched:** any `.tsx`, `vercel.json`, env, `src/app/api/lead/`, analytics, the home page.

---

## SM — stories (one section/file per story)

- **S1** Author the cheat-sheet substance (the 15 tactics + savings levers) — content, reviewed at Checkpoint 2.
- **S2** Landing page JSON: hero + intro.
- **S3** Landing page JSON: 15-ways preview (4 pillar card grids).
- **S4** Landing page JSON: "What's inside" + "Who it's for".
- **S5** Landing page JSON: proof/why-Folio3 + CTA band + form band.
- **S6** `card-icons.json` mappings for every card (0 checkmarks).
- **S7** `faq-full.json` FAQ entry.
- **S8** Produce the branded PDF asset (cover + TOC + 15 tactics) → `public/downloads/`.
- **S9** Build + Playwright visual QA (all contract checks).
- **S10** Commit, push, PR, verify Vercel preview, wiring hand-off.

## QA — verification log
Playwright visual QA against the live-rendered page at `http://localhost:3000/azure-finops-cheat-sheet/` (viewport 1440, full scroll to fire reveals), asserting by counting the DOM — **all pass**:
- Headings in JSON present in rendered HTML: **28/28** (0 missing).
- Paragraphs + list items present: **35/35** (0 missing).
- Real card-icon glyphs: **18** (= 15 tactics + 3 personas); **fallback checkmarks: 0**.
- Hero illustration present, `naturalWidth` 637, wrapped in a `.reveal` element (zoomIn).
- `#pgForm` form band: exactly **1**; blue CTA band: exactly **1**; "Schedule a 1:1 Call" heading: exactly **1** (no duplication).
- FAQ accordion rendered; `#pgForm` CTAs: 3 (2 hero + 1 CTA band).
- Images loaded on page: **11 checked, 0 non-200**.
- Console errors: **0**.
- `npm run build` succeeds; page prerendered to `/azure-finops-cheat-sheet` (100 KB HTML).
- PDF asset verified visually: cover + TOC + 4 pillar pages (all 15 tactics) + 30-day plan + CTA.

## DELIVERY WIRING HAND-OFF (out of bounds for this task)
The pages + asset are built. To make the download actually reach the lead, the pipeline owner needs to:
1. **Serve the PDF on conversion.** The asset is staged at `public/downloads/azure-finops-cheat-sheet.pdf` (URL: `/downloads/azure-finops-cheat-sheet.pdf`). It is unlinked on the site but publicly reachable by URL. For hard gating, serve it behind the lead API instead of from `/public`.
2. **Trigger delivery on submit.** In `src/app/api/lead/` (LOCKED — not touched here), after a successful lead, email the download link (or a signed URL) to the submitted address.
3. **Optionally tailor the thank-you.** `ContactForm` redirects to `/thank-you/`; to show a "Download your cheat sheet" button there, add the link on that route (component code — needs a dev).
4. **Optionally reword the form.** The shared `OneToOneCTA`/`ContactForm` reads "Schedule a 1:1 Call Today"; a magnet-specific heading/CTA would be component code affecting every page — left unchanged by design.

## DECISIONS / OPEN QUESTIONS
- Checkpoint 1 (concept) approved. Checkpoint 2 (content) approved.
- Delivery: build pages + PDF, hand off wiring (option A) — no public download link placed on the page (asset stays unlinked/gated pending wiring).
- Form copy left as shared component text (framed by page copy) — confirmed acceptable.
