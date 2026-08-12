# BMAD Plan — Microsoft Employee Self-Service (Folio ESS) landing page

**Task slug:** `microsoft-employee-self-service`
**Branch (to cut):** `content/microsoft-employee-self-service`
**Content file:** `azure-clone-next/content-kit/content/microsoft_employee_self_service.json`
**Route:** `/microsoft-employee-self-service/` (generic `[...slug]` renderer — CONFIRMED free, not RESERVED, no bespoke folder)
**card-icons.json key:** `microsoft-employee-self-service` (URL path form — hyphens, NOT underscores)
**Source mockup:** `C:\Users\rafaymuneer\Downloads\folio-ess-app-landing-page-azure (1).html` (content/layout reference ONLY — its CSS/fonts/colours are discarded)

Started: 2026-08-11 (Setup gate). Re-read this file after any long tool run / branch switch / uncertainty.

---

## ANALYST — what I actually found (quoted, not assumed)

### The mockup (source of CONTENT + SECTION STRUCTURE only)
Meta (from HTML comment, lines 3-8):
- Title: `Microsoft Employee Self-Service on Azure | Folio ESS`
- Description: `Folio ESS is an employee self-service app for the Microsoft ecosystem. Runs on Azure, built on Dynamics 365 HR, secured by Azure Active Directory.`
- Slug: `/microsoft-employee-self-service/`
- Primary keyword: `microsoft employee self-service`

Sections in the mockup, in order:
1. **HERO** — eyebrow "Folio3 ESS on the Microsoft Cloud"; H1 "The Employee Self-Service Portal Built for Your Microsoft Ecosystem"; sub paragraph; 2 CTAs (Book a Demo / Talk to a Consultant). Visual = a pure-CSS "browser mock" (NOT a real image — cannot carry into our template).
2. **PROBLEM** — eyebrow "The problem"; H2 "Your HR Self-Service Shouldn't Live Outside Your Microsoft Cloud"; intro paragraph; **5 numbered problem cards** (title + 1 paragraph each).
3. **SOLUTION** — eyebrow "The solution"; H2; 2 paragraphs; visual = a pure-CSS "stack diagram" (Folio ESS → D365 HR → Power Platform → Azure AD → Azure).
4. **USE CASES** — eyebrow "Use cases"; H2 "What You Can Use Folio3 ESS For"; intro; **4 role tabs** (Employee / Manager / Department Coordinator / Contractor), each with a bullet list of what that role does.
5. **FEATURES** — eyebrow "Product capabilities"; H2 "What Folio3 ESS Can Do"; intro; **5 feature cards** (Azure-Native Hosting, Azure AD SSO, Native D365 HR Integration, Power Platform Extensibility, Cross-Platform Mobile App).
6. **MOBILE** — eyebrow "Cross-platform mobile"; H2; paragraph; 5 bullets; visual = pure-CSS phone mock.
7. **WHY** — eyebrow "Why Folio ESS"; H2 "Five Reasons Enterprise Buyers Choose It Over a Bolt-On"; **5 why cards** (title + 1 paragraph each).
8. **FINAL CTA** — eyebrow "Book a demo"; H2 "See Folio ESS in Action"; paragraph; 2 CTAs.
9. **FAQ** — eyebrow "Frequently asked questions"; H2 "Common Questions About Folio3 ESS"; **9 FAQ items** (Q + A).

### The renderer / model page (facts confirmed by reading source)
- Route: `src/app/[...slug]/page.tsx` reads `content-kit/content/*.json`, dispatches via `CapturedRenderer.tsx`. A page WITH non-empty `items[]` renders through `OrderedRenderer` (modern, animated). Model page read in full: `content-kit/content/azure_cloud_service.json`.
- `CapturedPage` shape confirmed: `url`, `meta{title,description,canonical,ogImage,h1Count}`, `sections[]` each with `items[]` + legacy `headings/paragraphs/listItems/ctas/images`, plus top-level `images[]` and `bgImages[]`.
- Item types seen: `{t:"img",src,w,h,alt}`, `{t:"h",tag,text}`, `{t:"p",text}`, `{t:"li",text}`, `{t:"cta",text,href}`.
- `RESERVED` set (content.ts:376) does NOT include this slug → generic renderer path is correct.
- **Exact section-detection heuristics are being extracted by a sub-agent** (hero illo w>=180 / Reveal gating; challenge cards >45char & >=3; card grids vs generic fallback; FAQ source; explore-more; flip cards; trust band; nav/footer handling). Findings will be pasted into ARCHITECT below before any authoring.

### RENDER CONTRACT risks I must respect (from user brief)
1. Every `img` needs TRUE on-disk `w`/`h`; hero illo needs first img w>=180 or hero image+animation silently drop.
2. Page MUST have `items[]` or it downgrades to legacy renderer.
3. Card icons come from `card-icons.json` keyed by URL path; missing entry → generic blue checkmark. Report checkmark count at end.
4. Hero subhead + section intros MUST be `{t:"p"}`, never headings.
5. Cards render only their FIRST paragraph; no closing line after last card.
6. Case-study/challenge cards: h3/h4, NO paragraph, title >45 chars, need >=3.
7. Min counts: trust band >=2 logos; FAQ >=2; explore-more >=2; flip cards >=2 & >=half.
8. Animation only where renderer wraps a section in `<Reveal>`; generic text fallback is static.

---

## PM — goal & acceptance criteria (CONFIRM WITH USER)

**Goal:** Publish a new marketing landing page at `/microsoft-employee-self-service/` that reproduces the mockup's CONTENT and SECTION STRUCTURE, rebuilt entirely in OUR design language (our components/colours/typography via the content-kit JSON + OrderedRenderer). None of the mockup's CSS/fonts/colours/device illustrations are copied.

**Acceptance criteria:**
- Page renders through OrderedRenderer (has `items[]`), animated like other real marketing pages.
- All 9 sections' headings + paragraphs appear in rendered HTML (verified by counting in the DOM, not reading JSON).
- Real hero image present (w>=180) with its Reveal wrapper; float + zoomIn animation fires.
- Every card has a real icon via `card-icons.json`; **zero** generic checkmark fallbacks (or fallbacks listed + approved).
- FAQ (>=2) renders; all min-count sections render or are flagged if they can't.
- Every image returns HTTP 200; zero console errors; no duplicated section/CTA band; internal links resolve on this branch.
- Green `npm run build` AND a visual Playwright pass.
- Landed as a PR off `content/microsoft-employee-self-service` (never master); Vercel preview link (with path) handed over, loaded & confirmed.

**Open decisions for user (asked via AskUserQuestion):**
1. Route confirm `/microsoft-employee-self-service/`.
2. Add to nav menu? (which dropdown, or leave unlinked)
3. Hero image source (device mock can't carry) — reuse existing site asset / I pick a suitable existing one / generate new.
4. Role "tabs" (Employee/Manager/Coordinator/Contractor) → how to render in our template (card grid vs sequential sections).

---

## USER DECISIONS (confirmed)
- Route: **`/folio3-employee-self-service-app/`** (NOT the mockup slug). File `folio3_employee_self_service_app.json`; card-icons key `folio3-employee-self-service-app`; sidecar slug `folio3_employee_self_service_app`.
- Nav: **add under Solutions** dropdown (edit `src/lib/nav.ts` — the ONLY place nav lives; flagged as necessary non-JSON edit).
- Hero image: **generate a new one** (hand-authored on-brand SVG; show user before shipping).
- Use Cases: **real tabs** — supported WITHOUT component code via `SectionTabs` + `tabs-content.json` sidecar.
- Branch: `content/folio3-employee-self-service-app`, normal branch in main checkout (tree is clean & mine; worktree not required per user's own git rule). Never commit to master.

## ARCHITECT — render-path decisions (from sub-agent contract, line-cited)
Keep **isCaseStudy FALSE** (used at OrderedRenderer:498/536/574/615) → NO heading may contain "the problem|the challenge|our solution|folio3 solution|business outcomes|technologies involved|the approach|about the client|the customer". So mockup eyebrows dropped; h2 headings carry the message.

Section-by-section (page JSON sections, all with `items[]`; legacy arrays left empty):
1. **HERO** — h1 (headline) + p (subhead, first p of h1 unit) + 2 cta (#pgForm) + img (generated SVG, w=640 h=480 ≥180 → zoomIn+float). Eyebrow is auto = titleFromSlug. Breadcrumb + (no) trust band auto-follow.
2. **PROBLEM** — h2 heading + p intro + 5×(h3+p) → animated card grid (grid-cols-3). 5 icons.
3. **SOLUTION (the stack)** — h2 + p intro(merged) + 5×(h3+p) for the Microsoft-stack layers (Folio ESS / D365 HR+Dataverse / Power Platform / Azure AD / Azure) → card grid. Replaces mockup's CSS stack diagram. 5 icons.
4. **USE CASES (tabs)** — page section = just h2 "What You Can Use Folio3 ESS For". Real content in `tabs-content.json[folio3_employee_self_service_app]` = [{section:"What You Can Use Folio3 ESS For", tabs:[Employee, Manager, Department Coordinator, Contractor]}]. Matched by section-name equality (OrderedRenderer:247) → `<SectionTabs>` renders, section `continue`d. NOTE: do NOT author an intro p here (it'd be dropped → QA false-flag). Tab-item icons default to the component's check (NOT the card-checkmark concern).
5. **FEATURES** — h2 + p intro + 5×(h3+p) → card grid. 5 icons.
6. **MOBILE** — h2 + p intro + 5×(h3+p) (the 5 mobile bullets reshaped into titled cards) → card grid (animates; avoids static no-Reveal path). 5 icons.
7. **WHY** — h2 + 5×(h3+p) → card grid. 5 icons.
8. **CTA band** — h2 "See Folio ESS in Action" + p + 1 cta(#pgForm), 0 entries → renderCtaBand (OrderedRenderer:684). Placed BEFORE FAQ so it isn't adjacent to the auto lead-form (no "duplicate band"). Heading avoids the 1:1 regex.
9. **FAQ** — page section = just h2 "Common Questions About Folio3 ESS". Q&A in `faq-full.json[folio3_employee_self_service_app]` (heading identical) → faqHeadMatch (OrderedRenderer:673) renders 9 items.
10. **Auto lead-form** — OneToOneCTA (#pgForm) appended automatically at end (OrderedRenderer:743) since no 1:1 heading. Single clean closer.

NO nav/footer sections in JSON (stripped/handled by Header/Footer). Icons: ~25 cards, reuse from 322 existing SVGs (~10-12 unique concepts reused). Report checkmark fallbacks at end (target 0).

## SM — stories (implement one at a time, QA each)
- S1. Hero SVG asset → `public/wp-content/uploads/2026/02/folio-ess-hero.svg` (name avoids isChromeImg regex).
- S2. Page JSON `content-kit/content/folio3_employee_self_service_app.json` (sections 1-9).
- S3. `tabs-content.json` entry (4 role tabs) — surgical add.
- S4. `faq-full.json` entry (9 Q&A) — surgical add.
- S5. `card-icons.json` entries for all cards — surgical add; map to existing SVGs; count checkmarks.
- S6. `src/lib/nav.ts` — add link under Solutions.
- S7. Tester: JSON parse + `npm ci` + `npm run build`.
- S8. QA: Playwright visual verification vs render contract (headings/paras present, icons>0 & checkmarks==0, hero+Reveal, images 200, no console errors, no dup band, links resolve).
- S9. Ship: PR off branch + verified Vercel preview link.

## DEV — implementation log
- Hero SVG: `public/wp-content/uploads/2026/02/folio-ess-hero.svg` (640×480, brand palette).
- Page JSON: 9 sections authored; 34 headings + 31 paragraphs; 25 cards across 5 grids.
- Tabs: `tabs-content.json[folio3_employee_self_service_app]` = 4 role tabs; after "ugly" feedback, added per-tab illustration (`ess-role-{employee,manager,coordinator,contractor}.svg`) + 1-line body → 2-column layout.
- FAQ: `faq-full.json` 9 Q&A, heading "Common Questions About Folio3 ESS".
- Icons: `card-icons.json[folio3-employee-self-service-app]` = 25 keys → 21 distinct existing SVGs. **0 checkmark fallbacks.**
- Nav: `src/lib/nav.ts` — added "Employee Self-Service App" under Solutions (only place nav can live; flagged).
- Sidecars edited surgically (append-only, minified preserved; other entries byte-verified unchanged).

## QA — verification log (all PASS)
- Build: `npm ci` + `npm run build` exit 0; route prerendered (`/folio3-employee-self-service-app.html`). Rebuilt after tab fix, exit 0.
- Presence (built HTML): 34/34 headings + 31/31 paragraphs present; **0 missing**. 9/9 FAQ Q&A present. 4 tab labels + Employee items present.
- Hero: image in DOM + Reveal/zoomIn wrapper present. Renders with float/zoom animation.
- Icons: 25 cards → real `/icons/` images, **0 card checkmark fallbacks** (8 checks = SectionTabs default tab-item markers, the component's standard look).
- Images: all 22 assets (21 icons + hero) + 4 role SVGs return HTTP 200.
- Console: zero errors on load.
- Tabs: interactive (Manager switch verified); now 2-column with distinct per-role illustration; all 4 tab imgs in DOM.
- Order: CTA band < FAQ < single lead form (`#pgForm` ×1, "How can we help" ×1) → no duplicated band.
- Nav: Solutions dropdown shows "Employee Self-Service App" (verified in browser).
- Design: our components/colours/typography throughout; mockup CSS/fonts/device illos discarded.

## SHIP
- Branch `content/folio3-employee-self-service-app` pushed; PR opened.

## REWORK (user feedback round 1)
Feedback: content must be VERBATIM from the HTML (no rewording), remove em dashes, rebuild the Solution as the mockup's stacked diagram, and some cards showed square-box icons.
- **Verbatim copy**: all sections re-authored word-for-word from the mockup; em dashes removed (0 in page/stack/tabs/faq). Footer office addresses use en-dashes but that's global site chrome (every page), left untouched + flagged.
- **Box icons**: root cause = `case-studies/*` + `power-automate`/`power-apps` SVGs have a full-bounds background `<rect fill>` → render as filled squares. Wrote an audit (24 box icons in library); re-mapped all 15 card icons to clean stroke/line icons (0 box, 0 fallback, verified 200).
- **Solution stack**: new `SolutionStack` component + `solution-stack.json` sidecar + `getSolutionStack()` loader + OrderedRenderer branch (mirrors the tabs pattern; user authorized the small component). Renders the 5 layered rows with tag pills in our colours.
- **Mobile**: reverted from invented title/body cards to the mockup's exact 5-bullet list.
- **Tabs**: removed the invented per-tab intro lines; section intro now shown as the tabs subtitle (small renderer tweak). Per-role illustrations kept.
- Rebuilt (exit 0); Playwright re-verified: verbatim text present, stack renders, clean icons, mobile bullets in `<li>`, single lead form, 0 console errors.
