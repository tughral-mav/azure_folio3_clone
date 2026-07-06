# azure.folio3.com → Next.js Revamp — Architectural Blueprint

> Generated from a live Playwright audit (`crawl-audit.mjs`) executed against
> `https://azure.folio3.com` on 2026-06-11. All figures below are measured, not
> assumed. Raw evidence lives in `./audit-output/*.json`.

---

## Audit Snapshot (measured)

| Signal | Finding |
|---|---|
| CMS / generator | WordPress 7.0 |
| Theme | **Astra 3.8.2** (`wp-theme-astra`, `elementor-kit-9`) |
| Page builder | **Elementor + Elementor Pro** (2,185 `elementor-*` class hits on home; 23,847 across sample) |
| Caching / optimization | **WP Rocket** (asset combine + lazyload) behind **Cloudflare APO** (`cf-apo-via: origin,host`) |
| SEO framework | **Yoast SEO** (`wordpress-seo`, XML sitemaps + XSL stylesheet) |
| Sliders | **Swiper** (249 hits) + **Slick** (Elementor carousels) |
| Forms | **Elementor Pro Forms** + 1 custom theme AJAX form |
| Lead destination | **NetSuite CRM** (hidden `custentity_f3_wpcf_sign` field — NetSuite custom-entity signature) |
| Tracking | Google Tag Manager, Microsoft Clarity, HubSpot |
| CDN / edge | Cloudflare (HSTS preload, H3/QUIC) |
| Total routes (sitemap) | **243** across 12 sitemap groups |
| Homepage weight | **920 KB of HTML** in a single document (Elementor inline CSS) |
| Homepage H1 count | **3** ⚠️ (SEO anti-pattern — should be 1) |
| Homepage interactive density | 24 sections, 13 tab blocks, 27 accordions, 4 sliders, 1 mega-menu |

---

## Section 1 — Site Map & Next.js Routing Strategy

### 1.1 Route registry (grouped from `sitemap_index.xml`)

| Sitemap group | Count | Nature | Next.js render mode |
|---|---:|---|---|
| `page` | 62 | Core marketing, services, industries, funnels | **SSG** (+ ISR for ones that embed dynamic lists) |
| `post` (blog) | 122 | Editorial / SEO articles | **ISR** (`revalidate: 3600`) |
| `category` | 17 | Blog taxonomy archives | **ISR** |
| `slider_item` | 9 | Homepage/case-study slides (CPT used as data) | **Data source only** — fold into page props, no route |
| `our_industries` | 5 | Industry vertical blocks | **Data source** → `industries/[slug]` |
| `our_cloud_service` | 5 | Cloud-service blocks | **Data source** → service sections |
| `our_data_analytics` | 5 | Analytics service blocks | **Data source** |
| `our_managed_services` | 5 | Managed-service blocks | **Data source** |
| `post_tag` | 7 | Blog tags | **ISR** (or `noindex` if thin) |
| `managed_services` | 2 | Service detail CPT | **SSG** |
| `testimonial_slider` | 2 | Testimonial data | **Data source** |
| `author` | 2 | Author archives | **ISR** or drop |

> **Insight:** 7 of the 12 groups (`slider_item`, `our_industries`, `our_cloud_service`,
> `our_data_analytics`, `our_managed_services`, `testimonial_slider`) are **custom post
> types abused as content containers**, not real URLs users navigate to. In Next.js these
> collapse into typed data files / CMS collections feeding components — eliminating ~30
> "ghost" routes and their crawl-budget drain (note the `manufactring-test` and
> `e-commerce-and-retail-5` slugs leaking into the public sitemap today).

### 1.2 Proposed App Router structure

```
app/
├── layout.tsx                      # <html>, fonts, GTM/Clarity (next/script), header+footer
├── page.tsx                        # Home  (SSG)
├── about-us/page.tsx               # SSG
├── contact-us/page.tsx             # SSG shell + <ContactForm> (client island)
├── thank-you/page.tsx              # SSG (form success route — already exists today)
├── services/
│   ├── page.tsx                    # Services index (SSG)
│   └── [slug]/page.tsx             # azure-cloud-service, azure-managed-services, power-bi-services… (SSG)
├── microsoft-fabric-services/
│   ├── page.tsx
│   └── [slug]/page.tsx             # microsoft-fabric-migration…
├── azure-data-analytics/
│   ├── page.tsx
│   └── [slug]/page.tsx             # retail-analytics, supply-chain-analytics, agriculture-data-analytics…
├── data-science-ai/[slug]/page.tsx # microsoft-copilot-consulting…
├── industries/
│   ├── page.tsx
│   └── [slug]/page.tsx             # azure-for-healthcare|retail|manufacturing|construction|logistics… (SSG)
├── ai-agents/
│   ├── page.tsx
│   └── [slug]/page.tsx             # smartexpense-agent, kubemonitor-agent… (SSG)
├── ai-scenario-library/[slug]/page.tsx
├── case-studies/
│   ├── page.tsx                    # listing + filter (Server Component + client filter island)
│   └── [slug]/page.tsx             # ISR, revalidate 3600
├── blog/
│   ├── page.tsx                    # paginated index (ISR)
│   ├── [slug]/page.tsx             # 122 articles (ISR generateStaticParams)
│   └── category/[slug]/page.tsx    # 17 archives (ISR)
├── solution/[slug]/page.tsx        # intellifabric…
├── privacy-policy/page.tsx
├── cookie-policy/page.tsx
├── sitemap.ts                      # native next-sitemap (replaces Yoast XML)
├── robots.ts
└── api/
    └── lead/route.ts               # server-side proxy → NetSuite/HubSpot (see §4)
```

### 1.3 Rendering classification

| Bucket | Pages | Strategy | Why |
|---|---|---|---|
| **SSG (static export)** | Home, About, Contact shell, all Service / Industry / AI-Agent / Solution pages (~60) | `generateStaticParams` at build, zero runtime cost | Content changes rarely; serve pure HTML from CDN |
| **ISR** | 122 blog posts, 17 categories, case studies | `export const revalidate = 3600` | Editorial cadence without full rebuilds |
| **CSR / client islands** | Lead forms, case-study filter, mega-menu, tabs, accordions, sliders | `"use client"` components mounted inside static pages | Interactivity only where needed — everything else stays static |

---

## Section 2 — Legacy Dependency & Plugin Dissection

### 2.1 What's actually running (measured)

| Plugin / Service | Role today | License cost / risk |
|---|---|---|
| **Elementor Pro** | Every page layout, forms, sliders, tabs, accordions, mega-menu | Paid annual; renders 920 KB inline-CSS pages; breakage on license lapse |
| **WP Rocket** | JS/CSS combine, lazyload, cache | Paid annual; masks the real asset graph |
| **Astra (likely Pro)** | Header/footer builder, theme scaffolding | Paid for Pro modules |
| **Yoast SEO** | Meta, OG, XML sitemaps | Free tier in use, but couples SEO to WP |
| **HubSpot** | Marketing tracking / forms embed | SaaS subscription |
| **NetSuite (custentity)** | Lead destination CRM | Enterprise ERP/CRM |
| GTM + Microsoft Clarity | Tag mgmt + session heatmaps | Free, but ~loaded render-blocking via GTM |

### 2.2 Next.js Native Translation Grid

| Legacy feature | Driven by | Native Next.js replacement |
|---|---|---|
| Page layouts / sections | Elementor Pro | **React Server Components + Tailwind** — typed section components (`<Hero>`, `<ServiceGrid>`), content in MDX/CMS. Kills inline-CSS bloat. |
| Contact / RFQ forms | Elementor Pro Forms | **React Hook Form + Zod + Server Action** posting to `/api/lead` (see §4) |
| Sliders / carousels | Swiper + Slick (2 libs!) | **Embla Carousel** (one ~6 KB lib) or CSS scroll-snap for simple rows |
| Tabbed service blocks | Elementor Tabs (13 on home) | **Radix UI Tabs** or `<details>`-based, ~1 KB, accessible |
| Accordions (27 on home) | Elementor Accordion | **Radix Accordion** / native `<details>` — SSR-friendly, no JS for SEO crawlers |
| Mega-menu | Astra/Elementor nav | **Custom `<Header>` Server Component** + small client island for hover/keyboard |
| Caching / combine | WP Rocket | **Built-in** — SSG/ISR + Next asset pipeline + Cloudflare. Plugin obsolete. |
| SEO meta / sitemaps | Yoast | **Next Metadata API** + `app/sitemap.ts` + `app/robots.ts` (see §5) |
| Image lazyload/opt | WP Rocket lazyload | **`next/image`** — automatic AVIF/WebP, responsive `srcset`, blur placeholder, real lazy |
| Tag management | GTM (render-blocking) | **`next/script` strategy="afterInteractive"** for GTM/Clarity; or Partytown to offload to worker |
| Cookie consent | (CookieYes-style) | Lightweight custom consent context gating non-essential scripts |

**Net effect:** 4 paid licenses (Elementor Pro, WP Rocket, Astra Pro, + WP hosting) and the
920 KB Elementor payload are replaced by an open-source component library and a static CDN
deploy. Lead capture no longer depends on a plugin license staying valid.

---

## Section 3 — Reusable Atomic UI Component Map

Derived from the measured DOM (24 sections, repeating across all sampled layout families).

```
components/
├── layout/
│   ├── Header.tsx              # sticky header (Astra ast-hfb-header) — Server shell
│   │   └── MegaMenu.tsx        # client island: multi-tier dropdown (menu-item-has-children → sub-menu)
│   ├── Footer.tsx
│   └── StickyCTA.tsx           # persistent "Contact us" bar
├── sections/
│   ├── Hero.tsx                # H1 + subcopy + CTA + visual (⚠ fix 3→1 H1 per page)
│   ├── LogoCloud.tsx           # client/partner grid ("Microsoft Solution Partner")
│   ├── ServiceCardGrid.tsx     # responsive 2/3/4-col cards (services, industries, agents)
│   ├── TabbedFeatures.tsx      # Radix Tabs — Azure solution switcher (13 tab blocks on home)
│   ├── AccordionFAQ.tsx        # Radix Accordion — replaces 27 Elementor accordions
│   ├── TestimonialSlider.tsx   # Embla — fed by testimonial_slider data
│   ├── CaseStudyCarousel.tsx   # Embla — fed by slider_item / case studies
│   ├── StatsBand.tsx           # KPI counters
│   ├── ProcessSteps.tsx        # numbered methodology blocks
│   └── CTABanner.tsx           # bottom-of-page conversion band
├── content/
│   ├── CaseStudyCard.tsx
│   ├── BlogCard.tsx
│   └── CaseStudyFilter.tsx     # client island — search/sort over case studies & blog
└── forms/
    ├── ContactForm.tsx         # RHF + Zod (full contact funnel)
    └── LeadFormInline.tsx      # short variant embedded in service pages
```

**Structural nuances captured by the audit:**
- **Sticky header** — `ast-hfb-header` + transparent-logo variant; mega-menu confirmed (`hasMegaMenu: true`).
- **Tabbed blocks** appear 13× on home alone — must be one reusable, accessible primitive.
- **Accordions** appear 27× on home — currently each is an Elementor widget; consolidate to one component (huge DOM/CSS reduction).
- **Cards** repeat across services/industries/agents — one `ServiceCardGrid` with a variant prop covers all.
- **Sliders** — site mixes Swiper *and* Slick; standardize on a single Embla-based component.

---

## Section 4 — Data Layer & Form Re-Engineering Schema

### 4.1 Measured form payloads (from `/contact-us/`)

**Form A — Elementor Pro Form** (`form.elementor-form`, `method=post`):

| Field (name) | Type | Required | Purpose |
|---|---|---|---|
| `post_id`, `form_id`, `referer_title`, `queried_id` | hidden | — | Elementor routing metadata |
| `form_fields[name]` / `[last_name]` | text | ✅ | Name |
| `form_fields[title]` | text | — | Job title |
| `form_fields[email]` | email | ✅ | Email |
| `form_fields[Description]` | text | — | Free text |
| `form_fields[field_ba12fb6]` | number | ✅ | Phone (auto-named field) |
| `form_fields[message]` | textarea | — | Message |
| **`form_fields[custentity_f3_wpcf_sign]`** | hidden | — | **NetSuite custom-entity signature** |

**Form B — Custom theme AJAX form** (`#wp-contact-form.azure`):

| Field | Type | Purpose |
|---|---|---|
| `full_name`, `email` | required | Core lead |
| `phone` | tel | Phone |
| `message` | required | Message |
| `geolocation`, `user_name` | hidden | Enrichment |
| **`page_journey`, `page_url`** | hidden | **Attribution / UTM-style journey tracking** |
| `custentity_f3_wpcf_sign` | hidden | NetSuite signature |

> Today these submit via WordPress `admin-ajax.php` → NetSuite, with GTM/HubSpot firing
> client-side. The NetSuite signature and `page_journey`/`page_url` fields are the critical
> business logic to preserve.

### 4.2 Secure Next.js architecture (no pipeline exposed to client)

```
Client (ContactForm.tsx)                Server                         External
─────────────────────────   ─────────────────────────────   ──────────────────────
RHF + Zod validate
  │  POST { name, email,
  │         phone, message,
  │         page_url, utm{} }
  ▼
Server Action / app/api/lead/route.ts
  • re-validate with Zod (never trust client)
  • verify Turnstile/hCaptcha token (Cloudflare-native)
  • rate-limit by IP (edge KV)
  • attach custentity_f3_wpcf_sign  ─────────────────────►  NetSuite REST/SuiteTalk
  • map page_journey/utm           ─────────────────────►  HubSpot Forms API
  • fire server-side GA4 event
  ▼
redirect → /thank-you
```

**Security properties:**
- NetSuite credentials / HubSpot tokens live in **server env vars only** — never shipped to the browser.
- Validation runs **server-side** with the same Zod schema used client-side (shared type).
- Bot protection via **Cloudflare Turnstile** (already on Cloudflare) instead of relying on plugin honeypots.
- The lead endpoint is the *only* server surface; everything else is static.

```ts
// lib/lead-schema.ts — shared client+server contract
import { z } from "zod";
export const LeadSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).optional(),
  message: z.string().min(5),
  pageUrl: z.string().url(),
  utm: z.record(z.string()).optional(),         // utm_source/medium/campaign…
  turnstileToken: z.string(),
});
```

---

## Section 5 — Transition & SEO Retention Plan

The site has **243 indexed URLs** and ranks on high-intent terms (Microsoft Fabric, Azure,
Power BI). Migration must be **zero-loss**.

### 5.1 URL parity & 301 redirects
- **Preserve every slug 1:1** where possible — the App Router structure in §1.2 keeps current paths (`/azure-for-healthcare/`, `/blog/what-is-microsoft-fabric/`, etc.).
- For the ~30 ghost CPT URLs (`/blog/our_industries/...`, `manufactring-test`, `e-commerce-and-retail-5`) — **301 → the canonical service/industry page**, then drop from sitemap.
- Implement programmatically from the crawl registry:

```ts
// next.config.js
const redirects = require("./redirects.json"); // generated from audit-output/registry.json
module.exports = {
  trailingSlash: true,           // site currently uses trailing slashes — keep to avoid dupes
  async redirects() { return redirects; },
  images: { formats: ["image/avif", "image/webp"] },
};
```

### 5.2 Trailing slashes
- Live site uses **trailing slashes** (`/services/`, `/contact-us/`). Set `trailingSlash: true` so Next emits identical canonical URLs — prevents `/services` vs `/services/` duplicate-content splits.

### 5.3 Metadata, OpenGraph & structured data (replaces Yoast)

```ts
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.seoTitle,
    description: post.metaDesc,
    alternates: { canonical: `https://azure.folio3.com/blog/${params.slug}/` },
    openGraph: { title: post.seoTitle, description: post.metaDesc,
                 images: [post.ogImage], type: "article" },
    twitter: { card: "summary_large_image" },
  };
}
```
- Port Yoast titles/descriptions/canonicals via the CMS migration.
- Add **JSON-LD** (`Organization`, `Service`, `Article`, `BreadcrumbList`, `FAQPage` for the 27 accordions) using Next's `<script type="application/ld+json">` in Server Components.
- ⚠️ **Fix the 3-H1 homepage** — exactly one `<h1>` per page; demote the IntelliFabric/HR headings to `<h2>`.

### 5.4 Sitemap & robots (native)
```ts
// app/sitemap.ts — replaces Yoast's sitemap_index.xml, only real routes
export default async function sitemap() {
  const [pages, posts, caseStudies] = await Promise.all([getPages(), getPosts(), getCaseStudies()]);
  return [...pages, ...posts, ...caseStudies].map((u) => ({
    url: `https://azure.folio3.com${u.path}`,
    lastModified: u.modified,
    changeFrequency: u.type === "post" ? "weekly" : "monthly",
  }));
}
```

### 5.5 Performance / Core Web Vitals wins (measured opportunities)
- Replace **920 KB inline-CSS homepage** with component-scoped Tailwind → expect 60–80% HTML reduction.
- `next/image` for all 59 homepage images (currently `imgLazy: 0` at DOM snapshot — JS-driven lazyload only) → real responsive AVIF/WebP, fixed dimensions, no CLS.
- Defer GTM + Microsoft Clarity via `next/script strategy="afterInteractive"` (or Partytown) → unblock main thread.
- Drop the dual Swiper+Slick payload for a single Embla bundle.

### 5.6 Cutover checklist
1. Build Next app at parity; keep WP live.
2. Generate `redirects.json` from `audit-output/registry.json`.
3. Stage behind a preview URL; diff every route's `<title>`/canonical/H1 vs the audit JSON.
4. Submit new `sitemap.ts` output to Google Search Console; keep old sitemap 200 for one crawl cycle, then 301.
5. Switch Cloudflare origin to the Next deployment (Vercel/Cloudflare Pages); monitor GSC coverage + CWV for 4 weeks.
6. Decommission WordPress + paid plugins once impressions/positions hold.

---

### Evidence index
- `crawl-audit.mjs` — the executable Playwright auditor (run instructions in file header)
- `audit-output/registry.json` — full 243-URL registry, grouped
- `audit-output/_summary.json` — engines, plugins, vendors, form roll-up
- `audit-output/page-*.json` — per-page DOM/forms/network/heavy-asset detail
