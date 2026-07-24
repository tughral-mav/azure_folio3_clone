# BMAD Plan — Azure Kubernetes Service landing page

**Task slug:** `azure-kubernetes-service`
**Target page path:** `/azure-kubernetes-service/`
**File to create:** `azure-clone-next/content-kit/content/azure_kubernetes_service.json`
**Branch:** `claude/azure-kubernetes-landing-page-tmv00y` (already checked out; off master)
**Profile:** Enterprise Migration & Modernization
**Persona:** Chief Enterprise Architect / VP of Application Modernization
**Voice:** Professional-Formal

---

## ANALYST — what the real files say (quoted / verified)

- **Routing** (`src/lib/content.ts:370-389`, `src/app/[...slug]/page.tsx:7,9-11,50`): routes are
  discovered by scanning `content-kit/content/*.json`; the route segments come from the JSON's
  `url` field (origin stripped), NOT the filename. The filename must equal
  `slugToFile(url-path)` = the url path with every `-`/`/` → `_`. `dynamicParams=false`, so a
  mismatched path 404s. `azure_kubernetes_service` is NOT in the `RESERVED` set (`content.ts:376`),
  so the catch-all will build it. No nav/registry file to edit.
  → **File `azure_kubernetes_service.json` + `"url":"https://azure.folio3.com/azure-kubernetes-service/"`.**
- **Header/footer** come from the app layout, NOT the page JSON (`page.tsx:94-100` renders only
  structured-data + `<CapturedRenderer>`). Chrome sections are also dropped by `isChrome()`
  (`OrderedRenderer.tsx:57-66`). → **We omit nav/footer sections.**
- **Renderer dispatch** (`CapturedRenderer.tsx:64-68`): if any section has a non-empty `items[]`,
  the modern **OrderedRenderer** (Path A, animated) runs; otherwise the legacy sparse renderer.
  → **Every section carries `items[]`.**
- **Hero** (`OrderedRenderer.tsx:133-184`): section with an `h1` unit. Subhead = `h1u.paras[0]`
  (the FIRST PARAGRAPH after the h1) — an h2 in that slot is dropped. Hero illustration = first
  image with `w >= 180`; it is wrapped in `<Reveal animation="zoomIn">` (line 181). CTAs from the
  h1 unit / lead.
- **Sidecar keys** (verified): underscored `azure_kubernetes_service` for `faq.json`,
  `faq-full.json`, `trust-band.json`, `counters.json`, `content-links.json`, `flip-content.json`;
  hyphen `azure-kubernetes-service` for `card-icons.json` ONLY.
- **Card icon slug** (`content.ts:153`): lowercase → `&`→`and` → non-alnum→`-` → trim `-` → cut 50.
- **Section thresholds** (silent-downgrade guards): trust band ≥2 logos; FAQ ≥2 items; pain band
  ≥3 cards; challenge cards >45 chars & ≥3; explore-more ≥2 links; comparison exactly 2 columns.
- **Reusable assets confirmed on disk**: `/icons/azure-cloud-service/*` (application-modernization,
  cloud-native-application-development, microservices-architecture, hybrid-setups, disaster-recovery,
  devops-and-continuous-delivery, cloud-infrastructure-audits, replatform, cloud-strategy-creation…)
  and `/icons/azure-managed-services/*` (identity-and-access-management, disaster-recovery-management,
  network-security…). Link targets `/savills/`, `/city-university-azure/`, `/azure-cloud-service/`,
  `/azure-managed-services/`, `/microsoft-fabric-services/` all exist on this branch.
- **Hero image**: `wp-content/uploads/2023/07/Cloud-Migration.webp` = 705×761 (w≥180 ✓).

## PM — goal & acceptance criteria

**Goal:** publish a conversion-focused, SEO-optimised landing page that positions Azure Kubernetes
Service (AKS) as the governed, downtime-free path to modernise legacy .NET/Java monoliths off VMs
for regulated enterprises, driven by Folio3's Tier-1 Microsoft CSP credentials.

**Acceptance criteria:**
1. Page renders through OrderedRenderer (Path A) at `/azure-kubernetes-service/`.
2. Every heading/paragraph in the JSON appears in rendered HTML; hero image + `zoomIn` Reveal present.
3. Real card icons > 0, fallback checkmarks = 0. All images HTTP 200. Zero console errors.
4. Animated sections: pain band, comparison table, solution cards, differentiator cards, FAQ, CTA.
5. No duplicated section/CTA band; internal links resolve on THIS branch.
6. Green `npm run build`.

## KEYWORD SET (Ahrefs, US)

- **Primary:** `azure kubernetes service` — vol 1,500 (US) / 5,400 (global), KD 52, commercial+branded. (H1 anchor.)
- **Secondary:** `azure kubernetes service migration`; `azure kubernetes consulting` (KD 10, TP 4,100);
  `legacy application modernization` (vol 1,100, KD 7, CPC $25); `.net modernization` (vol 200);
  `aks migration` (CPC $5).
- **Supporting:** `azure application modernization services`, `kubernetes consulting services`
  (KD 0), `application modernization azure`.

## NARRATIVE OWNERSHIP (the one defensible claim)

> Folio3 modernises legacy .NET and Java monoliths onto Azure Kubernetes Service **without a
> rip-and-replace** — a governed, downtime-free path from virtual machines to microservices,
> delivered by a Tier-1 Microsoft CSP. Windows + Linux containers, Microsoft Entra ID + Azure
> Landing Zones governance, and Azure Arc hybrid migration are the proof.

SERP gap: competitors (Saxon, Altoros, AppsCode, Tasrieit, BloomCS, MeteorOps) sell generic
"AKS deploy/secure/optimize". None own **governed, downtime-free legacy modernization for regulated
enterprises**. That is our angle. No fabricated stats — only earned Folio3 credentials.

## STRUCTURE / OUTLINE (section → renderer path → heading regex it triggers)

1. **Hero** — h1 + p subhead + 2 CTAs + `Cloud-Migration.webp`. (hero, animated)
2. **Trust band** — trust-band.json ≥2 logos. (post-hero band)
3. **Pain points** — H2 "Solve Real Business Problems" + 4 h3 cards. (`/real business problems/` → 4-across animated)
4. **Solution / 3 pillars** — H2 + 3 cards (Seamless Legacy Modernization, Unified Enterprise
   Governance, Downtime-Free Migrations). (card grid, animated, real icons)
5. **Comparison** — H2 "…Wins vs Traditional Virtual Machines" + 2 columns. (`/vs|traditional/` → comparison table)
6. **Product differentiators** — H2 + 6 feature→outcome cards. (card grid, animated, real icons)
7. **Credentials / trust building** — H2 + 4 credential cards (Tier-1 CSP, Solutions Partner,
   750+ certified developers, 1,000+ clients). (card grid, animated)
8. **Case studies** — H2 "Real Results, Real Impact" + Savills & CityU Read-More cards.
9. **FAQ** — H2 matching FAQ regex + faq-full.json (6 Q&A). (accordion, animated)
10. **CTA band** — blue "Ready to Modernize…" band.
11. **Explore More Services** — content-links.json ≥2 links (auto-rendered).
12. Lead form auto-appended by renderer.

## SIDECARS TO EDIT (surgical, minified where noted)
- `content/azure_kubernetes_service.json` (new)
- `faq-full.json` — key `azure_kubernetes_service` (heading + 6 items) [preferred FAQ source]
- `faq.json` — key `azure_kubernetes_service` (6 question strings)
- `card-icons.json` — key `azure-kubernetes-service` (hyphen) — one entry per card, MINIFIED, surgical
- `trust-band.json` — key `azure_kubernetes_service` (≥2 logos), MINIFIED
- `content-links.json` — key `azure_kubernetes_service` (Explore-More links), MINIFIED

## ARCHITECT — smallest change
Data-only. One new page JSON + 5 sidecar entries. No component code changes. (FAQ JSON-LD would
need a code change → deferred; page already emits WebPage + BreadcrumbList LD automatically.)
Generate the page JSON with a script so the legacy parallel arrays (headings/paragraphs/…) are
derived from `items[]` automatically and stay consistent with the proven managed-services schema.

## SM — stories (one per section/file) → see task list
## DEV / QA — implement one section, verify counts in rendered DOM before moving on.

## Decisions made on the user's behalf (to confirm at preview)
- Slug `/azure-kubernetes-service/` (matches the 1,500-vol head term; product name; short).
- Hero illustration = existing `Cloud-Migration.webp` (no new artwork drawn).
- Reused existing icons (no new SVGs drawn).
- FAQ JSON-LD deferred (needs component code; page already has WebPage/Breadcrumb LD).
- Reciprocal "link TO this page" from approved pages NOT added (keeps change minimal / avoids
  touching signed-off pages); recommended in handoff notes instead.
