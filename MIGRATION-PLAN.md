# azure.folio3.com → Next.js — Foolproof Migration Plan

> Goal: a **pixel-identical**, **error-free**, **low-latency** clone that, on cutover,
> behaves exactly like the live WordPress site — same look, same URLs, same SEO, same
> lead capture — with an instant rollback if anything is off.
>
> Governing principle: **the captured live site is the single source of truth (the "golden master").**
> We already froze it: 486 screenshots, 243 content models, design tokens, 224 assets.
> Nothing ships unless it is automatically verified against that golden master.

---

## 0. Why this plan is "foolproof" — the one idea that matters

A clone fails when "looks done to a human" silently diverges from the original. We remove
human judgement from the pass/fail decision by building a **verification harness** that, for
every page, diffs the clone against the frozen live capture on three axes:

1. **Visual** — Playwright screenshot of the clone vs the saved live screenshot → pixel-diff %.
2. **Content/SEO** — title, meta description, canonical, H1, word count, structured data.
3. **Performance** — Lighthouse CI (LCP, CLS, TBT) + payload budget.

A page is **"done" only when all three gates pass**, in CI, on every commit. That converts
"I think it matches" into a measured number. This harness is built **first** (Phase 1), before
any page work — so fidelity is enforced from commit #1, not audited at the end.

---

## 1. What to do first — three sequencing strategies (pick one)

You asked for different recommendations on ordering. Here are the three credible ones, with the
trade-off, then my recommendation.

### Option A — Template-First (engineering-optimal) ✅ RECOMMENDED
Build the **~8 unique layout families** pixel-perfect first, then fan content through them.
- The audit proved 243 URLs collapse into ~8 templates (Home, Service, Industry, AI-Agent,
  Solution, Case-Study, Blog-Post, Listing) + funnel pages (Contact/Thank-you/About).
- **Why first:** one pixel-perfect template instantly lifts dozens of pages. Highest leverage,
  least duplicated effort, cleanest codebase.
- **Risk:** the first 2 templates are slow (you're also hardening the component library).

### Option B — Funnel-First (revenue-optimal)
Order: Home → Contact → top 5 service pages → top 10 blog posts.
- **Why:** protects lead generation and the highest-intent pages immediately; you could even
  cut over just these behind a path-based split while the rest stays on WP.
- **Risk:** templates get reworked as you go (less DRY early).

### Option C — Traffic-First (SEO-optimal)
Rank every URL by real organic traffic (Google Search Console / Ahrefs — both connected here),
clone highest-traffic descending.
- **Why:** every hour of work protects the most search equity; data-driven, not guesswork.
- **Risk:** ignores layout grouping, so you bounce between templates.

### My recommendation: **A, sequenced by C, with B's pages as the first templates.**
> Build template-first (A) for DRY leverage; choose *which* template to build next by which
> covers the highest-traffic pages (C); and make the funnel pages (B) the very first templates
> because they're both high-value and architecturally distinct. You get DRY + revenue + SEO in
> one ordering. Concretely the first five build targets are: **Home, Contact, Azure Cloud
> Service (service template), Azure-for-Healthcare (industry template), one Blog post template.**

---

## 2. The phased plan

### Phase 0 — Foundation ✅ DONE
Audit, clone-kit capture, runnable scaffold, design tokens, localized assets, lead-API skeleton,
SEO primitives. (See `BLUEPRINT.md`, `clone-kit/`, `azure-clone-next/`.)

### Phase 1 — Build the Verification Harness (do this BEFORE any page) 🔑
Deliverables:
- `verify/visual.mjs` — for a route: launch clone, screenshot desktop+mobile, pixel-diff vs
  `clone-kit/screenshots/...`, output % + a highlighted diff PNG. Gate: **≥ 98% match**.
- `verify/content.mjs` — fetch clone + saved live capture, assert title/meta/canonical/H1/JSON-LD
  parity. Gate: **exact on title/canonical/H1 count**.
- `verify/perf.mjs` — Lighthouse CI. Gate: **LCP < 2.0s, CLS < 0.05, TBT < 150ms, JS < 150KB/route**.
- `verify/links.mjs` — crawl clone, assert no 404s, no links to azure.folio3.com that should be local.
- `verify/report.mjs` — one dashboard: every route × 3 gates, red/green.
Wire all into CI (GitHub Actions) so a PR cannot merge with a red gate.

> Why this is non-negotiable first: it makes every later step **self-checking**. You never again
> ask "is this page right?" — the harness answers in a number.

### Phase 2 — Lock the design system to the golden master
- Extend `tailwind.config.ts` from `clone-kit/tokens.json` into the *full* scale (it currently
  uses the top tokens). Add the exact spacing, line-heights, shadows, breakpoints observed.
- Build the real header/footer/mega-menu to pixel-match the live screenshots (these appear on
  every page — fixing them once moves all 243 diffs).
- Gate: header + footer visual diff ≥ 99% on 3 sample pages.

### Phase 3 — Templates, pixel-perfect, one at a time
For each of the ~8 templates (in the Section-1 order):
1. Pick the representative page; open its live screenshot as the target.
2. Rebuild its specific section layout with components.
3. Run `verify/visual` + `verify/content` until green (≥98%).
4. Wire `generateStaticParams` so the *whole family* renders through it.
5. Re-run the harness across the **entire family** — every page in it must pass.
> Net: ~8 focused efforts cover all 243 pages, each proven by the harness.

### Phase 4 — Content fidelity pass
- Promote blog bodies from flattened paragraphs → **MDX** (preserve headings, lists, code,
  images, internal links) so articles are rich, not just text. Source: re-extract full article
  HTML per post (one-command crawler extension) → convert to MDX.
- Verify each post's word count and heading tree vs the live capture (content gate).

### Phase 5 — Lead pipeline hardening (the #1 production-risk area)
- Stand up **NetSuite + HubSpot sandboxes**. Point `/api/lead` at them.
- Submit test leads; confirm they land in NetSuite with the `custentity_f3_wpcf_sign` signature
  and in HubSpot with UTM attribution — **byte-for-byte matching the payloads in `BLUEPRINT.md §4`**.
- Add Cloudflare Turnstile, server-side Zod re-validation, rate-limiting, and an error alert
  (so a broken form pages you, not silently drops leads).
- Gate: 10 synthetic submissions, 100% delivered to both systems, 0 client-side credential leakage.

### Phase 6 — SEO retention (zero-loss)
- Generate the **complete 301 map** programmatically from `audit-output/registry.json`
  (ghost CPT URLs → canonical pages) into `next.config.mjs`. Currently a 4-rule stub.
- `trailingSlash: true` (already set), native `sitemap.ts`/`robots.ts` (done), per-page Metadata
  + OpenGraph + JSON-LD (`Organization`, `Service`, `Article`, `BreadcrumbList`, `FAQPage`).
- Run a **redirect test**: every one of the 243 live URLs must resolve 200 or 301-to-200 on the
  clone — no 404s. This is the SEO safety net.

### Phase 7 — Performance & "no latency"
- Render mode: **SSG for all marketing/service/industry pages** (pure static HTML), **ISR** for
  blog/case-studies. Result: HTML served from CDN edge, near-zero TTFB.
- `next/image` AVIF/WebP for all assets; explicit width/height (zero CLS).
- Defer GTM/Clarity via `next/script afterInteractive` (or Partytown to a worker thread).
- Replace the 920 KB Elementor inline-CSS homepage with component-scoped CSS (target < 200 KB HTML).
- Gate: Lighthouse ≥ 95 mobile on home + 3 templates; Core Web Vitals all green.

### Phase 8 — Staging, parity sign-off, cutover (see §4)

---

## 3. Deployment architecture (for "works perfectly, no latency")

| Concern | Decision | Why |
|---|---|---|
| Host | **Vercel** or **Cloudflare Pages** | First-class Next 15 App Router + global edge CDN; SSG/ISR native |
| Edge | Keep **Cloudflare** in front (already there) | DNS, caching, Turnstile, instant origin swap for rollback |
| Rendering | SSG-first, ISR for blog | Static HTML from edge = no server latency on the hot path |
| Images | `next/image` + AVIF, served from CDN | Automatic optimization the live site lacks |
| Secrets | NetSuite/HubSpot tokens in host env vars only | Never in the client bundle |
| Observability | Vercel Analytics + Sentry + Cloudflare logs | Catch errors/regressions in real time post-deploy |

---

## 4. Cutover runbook — error-proof switch with instant rollback

**Pre-cutover gates (all must be green):**
- [ ] Harness: 243/243 routes pass visual ≥98%, content exact, perf budget.
- [ ] Redirect test: 0 of the 243 live URLs 404 on the clone.
- [ ] Lead test: 10/10 synthetic submissions delivered to NetSuite + HubSpot.
- [ ] Lighthouse ≥ 95 mobile on key templates.
- [ ] Link checker: 0 broken internal links.

**Switch (Cloudflare-mediated, reversible):**
1. Deploy clone to Vercel/Pages; verify on a `staging.` hostname (noindex).
2. Run the **full harness against staging** one final time.
3. **Canary:** Cloudflare to route a small % of traffic (or a path subset) to the clone origin;
   keep WordPress live in parallel. Monitor Sentry + Web Vitals + form deliveries for 24–48h.
4. **Promote:** shift 100% origin to the clone. WordPress stays warm (not deleted).
5. **Rollback (if any alarm):** repoint Cloudflare origin back to WordPress — **seconds, not a
   redeploy**. This is the safety valve that makes the cutover risk-free.
6. Submit new sitemap to Search Console; watch coverage + positions for 4 weeks.
7. Decommission WordPress + paid plugins only after metrics hold.

---

## 5. Risk register (where clones actually break, and the mitigation)

| Risk | Likelihood | Mitigation (built into the plan) |
|---|---|---|
| Visual drift unnoticed | High | Visual-diff gate ≥98% in CI on every page |
| Lost SEO / 404s on old URLs | High | Full 301 map from registry + redirect test gate |
| Form silently drops leads | High | Sandbox test + delivery gate + error alerting |
| Layout shift / slow LCP | Medium | next/image dims + SSG + Lighthouse gate |
| Lazy/below-fold images captured as placeholders | Medium | Re-extract full `srcset` per page during Phase 4 |
| Tracking double-fires or misses | Medium | Single GTM container, deferred, verified in staging |
| Cutover breaks prod | Medium | Cloudflare origin swap = instant rollback; WP kept warm |
| Dynamic/personalized blocks missed | Low | Audit found the site is near-fully static; few dynamic parts |

---

## 6. Decisions I need from you (these change the plan)

1. **Content source going forward** — (a) keep content **static in-repo** (MDX/JSON, simplest,
   fastest, but devs edit content), or (b) wire a **headless CMS** (Sanity/Contentful, marketers
   keep editing). Recommendation: **(a) static** unless non-devs must edit frequently.
2. **Host** — Vercel vs Cloudflare Pages. Recommendation: **Vercel** for smoothest Next 15 ISR.
3. **Lead system of record** — keep **NetSuite direct** (current) or consolidate through **HubSpot**.
   Recommendation: keep both, proxy unifies them in `/api/lead`.
4. **Fidelity bar** — "pixel-identical" (≥99% diff, slow) vs "visually indistinguishable"
   (≥98%, pragmatic). Recommendation: **98% + manual sign-off on the 10 highest-traffic pages**.

---

## 7. Suggested immediate next step
Build **Phase 1 (the verification harness)** + make the **Home page pixel-match its screenshot**
as the first proof. That gives you a working fidelity gate *and* one perfect page to see the bar,
before committing to all 8 templates. Everything after that is repeating a proven loop.
