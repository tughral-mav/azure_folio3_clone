# BMAD Plan — Cannibalisation Audit: Azure Services & Consulting

**Task slug:** `azure-services-consulting-cannibalisation`
**Branch:** `claude/azure-cannibalisation-audit-odmdda` (harness-designated; task text said `content/…` but harness pins this branch)
**Date started:** 2026-07-24
**Owner:** claudemarketing-dynamics@folio3.com (non-technical marketer)

> This is an AUDIT with a hard CHECKPOINT. No merges, redirects, canonicals or
> rewrites happen until the user approves the recommendations below.
> Deleting/merging a page is destructive to live traffic.

---

## PHASE 1 — ANALYST (read the real data first)

### 1.1 Data-source availability (what I actually found, not assumed)

| Source | Intended use | Status |
|---|---|---|
| **Windsor.ai → Search Console** (`searchconsole`, `https://azure.folio3.com/`) | Query→URL mapping, alternation over time (the brief's step 1) | **BLOCKED.** Free-plan cap: *"You've connected more accounts than your Free plan allows."* Returns a stub row, no data. Cannot be fixed from my side. |
| **Ahrefs → GSC** (project "Azure.folio3", id 6290224) | Same, via `gsc-keywords` (`urls_count`) | **NOT CONNECTED.** All GSC endpoints return *"No GSC data available for the requested date range"* for every range tried (2024–2026). |
| **Ahrefs Site Explorer** (organic-keywords, top-pages) | SERP snapshot: which of our URLs rank for which keyword | **AVAILABLE.** This is the fallback dataset used below. Workspace units: 400k limit, ~148k remaining until 2026-08-11. |

**Consequence:** the brief's ideal signal — *keywords where 2+ of our URLs ALTERNATE in the rankings over time* — comes from GSC, which is unavailable. Ahrefs gives a **point-in-time SERP snapshot** (simultaneous multi-URL ranking) plus each page's keyword footprint. I use those instead and flag the reduced confidence.

### 1.2 Simultaneous multi-URL ranking (Ahrefs `serp_target_positions_count >= 2`)

Pulled the whole domain (subdomains, no position cap). **Only 3 keyword rows** have 2+ of our URLs ranking at once, and **all 3 are the same page self-overlapping via its own in-page `#anchor` links**:

- `azure digital asset management` / `digital asset management azure`
  → `blog/azure-asset-management/` + `…/#Fortifying_Security…` + `…/#Scaling_Up_Efficiencies…`

That is **anchor-fragment self-overlap, not page-vs-page cannibalisation.** → **No true simultaneous cannibalisation exists in the current SERP snapshot.**

### 1.3 Whole-domain footprint (Ahrefs Site Explorer, 2026-07-23)

`site-explorer-metrics` (subdomains):
- **org_keywords: 21** · org_keywords in top 3: **4** · **org_traffic: ~34 visits/mo** · paid: 0

**Every page that earns any organic traffic is a `/blog/…` post.** Top pages:

| Page | Traffic/mo | Top keyword (vol · pos) |
|---|---|---|
| blog/microsoft-fabric-certification/ | 13 | microsoft fabric certification (4000 · 20) |
| blog/guide-to-azure-ai-foundry/ | 7 | foundry ai (500 · 14) |
| blog/azure-asset-management/ | 5 | azure digital asset management (70 · 8) |
| blog/what-is-onelake-in-microsoft-fabric/ | 4 | what is onelake (100 · 10) |
| blog/best-practices-for-securing-microsoft-fabric-implementation/ | 2 | azure service fabric security (50 · 8) |
| 11 more blog posts | 0–1 each | fabric / copilot / etl / elt terms |

**Non-blog pages with organic visibility: `site-explorer-top-pages` where url NOT contains `/blog/` → `[]` (ZERO).**
Not one Azure **services / consulting** landing page — `azure-cloud-service`, `azure-managed-services`,
`services`, `solution`, `microsoft-fabric-services`, `power-bi-services`,
`microsoft-power-platform-services`, `data-science-ai-microsoft-copilot-consulting` — ranks for anything.

### 1.4 Analyst conclusion
- **True ranking cannibalisation in the Azure services/consulting cluster: NONE.**
  Those pages cannot cannibalise each other because none of them hold any ranking.
- The **only** multi-URL overlap anywhere on the domain is **anchor-fragment self-overlap**
  on one blog post (`blog/azure-asset-management/` + its own `#…` jump-links). That is one
  page, not two — cosmetic, not cannibalisation.
- Mild *topical* proximity between two Fabric blogs (`fabric-implementation-for-organizations`
  → "azure fabric" @33; `microsoft-fabric-implementation` → "what is azure fabric" @1) — but they
  rank for **different queries with one URL each**, so this is not active cannibalisation either.
- The real issue surfaced by the data is **not** cannibalisation but **near-zero organic
  visibility on every commercial/service page** — an optimisation gap, not a consolidation problem.

---

## PHASE 2 — PM (goal & acceptance criteria)

Restated goal: audit the Azure services/consulting cluster for keyword cannibalisation, quantify
traffic at stake, and recommend consolidate / differentiate / canonicalise per case — executing
nothing until approved.

**Finding vs goal:** the audit ran to completion. The answer is that there is **no cannibalisation
to remediate**. Acceptance criteria met:
- [x] Competing URLs + per-page traffic quantified (table above; the "competition" is nil).
- [x] Recommendation per case with trade-off (below).
- [x] Nothing merged/redirected/rewritten — and nothing *should* be.

---

## PHASE 3 — RECOMMENDATIONS (per case, with trade-offs) — awaiting user decision

**Case A — `blog/azure-asset-management/` anchor self-overlap**
→ **Recommendation: CANONICALISE / do nothing (leave as-is).** The extra "URLs" are in-page
jump-links to the same document; Google already collapses them to the canonical page (best pos 6–8).
Trade-off: a merge/redirect is impossible (there is no second page) and unnecessary. No action.

**Case B — Two Microsoft Fabric implementation blogs (topical proximity, not cannibalisation)**
`fabric-implementation-for-organizations` (azure fabric, vol 1500, pos 33, 0 traffic) vs
`microsoft-fabric-implementation` (what is azure fabric, vol 100, pos 1, 0 traffic).
→ **Recommendation: DIFFERENTIATE, do not merge.** They serve different intents (broad
"azure fabric" hub vs definitional "what is azure fabric"). Merging would risk the pos-1 ranking on
the definitional term for no gain. Trade-off: keep both, make the intent split explicit in titles/H1s.
*(Blog pages, and outside the services/consulting scope — noted for completeness only.)*

**Case C — The service/consulting landing pages themselves (the actual finding)**
`azure-cloud-service`, `azure-managed-services`, `services`, `solution`,
`microsoft-fabric-services`, `power-bi-services`, `microsoft-power-platform-services`,
`data-science-ai-microsoft-copilot-consulting` — **all earn 0 organic traffic, rank for nothing.**
→ **Recommendation: DO NOT consolidate or redirect.** There is nothing to consolidate — merging
zero-traffic pages destroys nothing but also fixes nothing. The correct next step is a **separate
differentiation / targeting exercise** (assign each page one primary head term, e.g.
"azure consulting services", "azure managed services", "azure cloud services", so they don't
compete once they *do* start ranking). That is a content project, not a cannibalisation fix, and is
out of scope for this destructive-change audit.

### Destructive-change guardrail
Per the brief, deleting/merging/redirecting a page affects live traffic. **No page here carries
organic traffic worth protecting, and none carries cannibalisation worth curing → recommend
executing NO merges, redirects, or canonicals.**

---

## Data-confidence caveat
The gold-standard signal for *alternation over time* is Search Console (query→multiple pages across
a date range). Both GSC paths are unavailable (Windsor free-plan cap; Ahrefs GSC not connected), so
this audit uses Ahrefs' point-in-time SERP snapshot. Given the domain ranks for only 21 keywords
total and no service page ranks at all, the risk that GSC would reveal hidden services/consulting
cannibalisation is very low — you cannot alternate for a query you never rank for. If you want the
GSC-based confirmation, the fix is on the Windsor.ai account (reduce connected accounts / upgrade) or
connect GSC to the Ahrefs "Azure.folio3" project; then re-run step 1.

## PHASE 4/5 — ARCHITECT / SM / DEV / QA
Not triggered. No page-content change is warranted, so no build / Playwright render verification is
required (RENDER CONTRACT applies only to page edits, of which there are none).

## URL change log
_(empty — no URLs changed; audit recommends no destructive changes)_
