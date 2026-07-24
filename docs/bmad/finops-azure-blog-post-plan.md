# BMAD Plan — Blog: "Mastering FinOps on Azure: 5 Proven Strategies to Cut Cloud Spend Without Sacrificing Performance"

Slug: finops-azure-blog-post
Branch: `claude/finops-azure-blog-post-4jbosr` (assigned by harness; working tree was clean, based off master)
Target reader: CTOs, Data Architects, Enterprise BI Leaders. Funnel: TOFU. Word count target: ~500 (note: reference posts run far longer; will confirm scope).

## CHECKPOINTS (stop and wait for marketer)
- [x] (a) topic + keywords  — CONFIRMED: primary "Azure cost optimization" + "Azure FinOps"; ~1,000-1,200 words; FAQ+JSON-LD yes
- [x] (b) outline  — APPROVED
- [x] (c) draft  — APPROVED (metadata picked: title opt 1, desc opt 1)
- [ ] (d) before the PR  <-- CURRENT

## DEV/QA STATUS
- File written: content-kit/content/blog_finops_on_azure.json (~1,172 words)
- Hero built + placed: public/wp-content/uploads/2026/07/finops-on-azure.png (850x560 PNG)
- `npm run build` = SUCCESS; /blog/finops-on-azure prerendered
- Playwright verify (localhost:3123) = ALL 11 PASS: headings, 15 paragraphs, ez-toc, Key Takeaways,
  hero 200, all 7 images <400, all 7 internal links resolve on branch, exactly 1 CTA band,
  Related Blogs (3 real cards), zero console errors.
- OPEN: FAQ JSON-LD — sanitizer strips <script>, so FAQPage JSON-LD needs a small renderer change. Visible FAQ ships either way.

---

## ANALYST — what I actually found (quoted, not assumed)

### Blog mechanics (from repo + prompt)
- Blog posts live in `azure-clone-next/content-kit/content/blog_*.json`. 182 blog_* files exist.
- Blog posts do NOT use `items[]`. The article is the `bodyHtml` field (raw HTML, sanitised at build).
  `sections[]` is vestigial (only h1 read). Confirmed structure of reference file
  `blog_agentic_ai_in_healthcare.json`: top keys = url, capturedRobust, meta, sections, images, bgImages, bodyHtml, related.
- `related` is auto-populated by the renderer from each linked post's own file — do NOT hand-write. (Reference file ships `related: []`.)
- File name must start with `blog_`; url must be flat `/blog/<slug>/`.
- Blogs have NO scroll animations by design (blog route imports no Reveal). Correct — do not add.
- ISR hourly revalidate.

### Reference `meta` shape (blog_agentic_ai_in_healthcare.json)
```
meta: { title, description, canonical, ogImage, h1Count: 1 }
```
ogImage = full absolute URL to a PNG under /wp-content/uploads/2025/07/...

### bodyHtml anatomy observed
- Opens with the **ez-toc** widget: `<div id="ez-toc-container" class="ez-toc-v2_0_82_2 counter-hierarchy ez-toc-counter ez-toc-grey ez-toc-container-direction">` → title container → `<nav><ul class="ez-toc-list ...">` of anchor links to `#Heading_Anchor` ids.
- Headings use `<h2 class="wp-block-heading">` / `<h3 class="wp-block-heading">` with an inner `<span class="ez-toc-section" id="Anchor"></span><a></a>Title<span class="ez-toc-section-end"></span>` so ez-toc anchors resolve.
- Paragraphs use `<p class="wp-block-paragraph">`.
- Internal links: `<a href="/blog/..." target="_blank" rel="noreferrer noopener">text</a>` and `/service-path/`.
- Reference ends with a plain conclusion — NO hard CTA block, NO Key Takeaways block, NO FAQ, NO JSON-LD.

### House-style gaps vs. the prompt's blog requirements
- **No blog post in the repo uses FAQPage JSON-LD** (`grep FAQPage` = 0 hits).
- **No blog post has a dedicated "Key Takeaways" heading block** (0 real hits).
- The reference has no CTA block. A cleaner recent post (`blog_microsoft_365_copilot_features.json`)
  ends with a **soft CTA paragraph** linking to a Folio3 Azure service page — this is the closest thing to a house CTA.
- => The prompt's "Key Takeaways / ez-toc / FAQ JSON-LD / CTA" asks are partly ABOVE current house style.
  Decision needed: match house style (ez-toc + soft CTA, which exist) and ADD Key Takeaways + FAQ+JSON-LD as enhancements. Flagged to marketer.

### Cannibalization check
- Existing close post: `blog_microsoft_fabric_cost_optimization_strategies.json`
  - url: /blog/microsoft-fabric-cost-optimization-strategies/
  - title: "5 Effective Microsoft Fabric Cost Optimization Strategies"
  - Scope = **Microsoft Fabric-specific** (compute/storage/egress inside Fabric). Different, narrower scope than Azure-wide FinOps.
  - Verdict: adjacent, NOT a duplicate. Use it as an internal link. Flagged to marketer.
- Other adjacent: `blog_ai_cash_flow_model_in_azure.json`, `blog_how_predictive_ai_can_reduce_interest_costs.json` — finance-topic but not cloud-cost. Not competing.

### Keyword research (Ahrefs, US, pulled 2026-07-24)
| Keyword | US Vol | Global | KD | Traffic Pot. | Parent Topic |
|---|---|---|---|---|---|
| azure cost optimization | 700 | 1500 | 7 | 600 | azure cost optimization |
| azure finops | 350 | 1200 | 8 | 300 | azure finops |
| finops azure | 60 | 500 | 6 | 300 | azure finops |
| azure cost management | 1000 | 3200 | 28 | 1200 | azure cost management |
| cloud cost optimization | 2200 | 5500 | 16 | 200 | cloud cost optimization |
| azure cost optimization best practices | 90 | 350 | 3 | 450 | azure cost optimization |
| how to reduce azure costs | 60 | 200 | 2 | 450 | azure cost optimization |

**Recommendation:** Primary = **"Azure cost optimization"** (best volume-to-difficulty: 700 vol / KD 7, parent topic = itself, so it can anchor the page). Weave the title term **"Azure FinOps"** (350 vol, KD 8) as co-primary since it's literally in the H1 and shares buyer intent.
Secondary: azure finops best practices, how to reduce azure costs, azure cost management, cloud cost optimization.

---

## PM — goal & acceptance criteria (to confirm)
Goal: Publish one new TOFU blog post that ranks for Azure cost optimization / Azure FinOps and routes CTO/Data-Architect/BI-Leader readers toward Folio3 Azure services.
Acceptance criteria:
- Primary keyword in H1, first 100 words, ≥2 H2s, conclusion.
- ez-toc widget present (house style). Key Takeaways block before intro. 5 strategy H2s.
- FAQ + FAQPage JSON-LD (enhancement over house style — confirm wanted).
- 5–7 real internal links, each resolving on THIS branch, each with a lead-in.
- Soft CTA paragraph to a Folio3 Azure service page.
- Hero image built to blog template (850x560 PNG/JPG, navy gradient, folio3|Azure pill). meta.ogImage set.
- Word count: prompt says 500; reference posts are ~2000+. Flagged — 500 is thin for KD-competitive SEO. Confirm.

## OPEN DECISIONS FOR MARKETER (checkpoint a) — RESOLVED
1. Confirm primary keyword = "Azure cost optimization" (co-lead with "Azure FinOps").
2. Word count: hold at ~500, or allow ~900–1,200 to be competitive? (500 recommended-against for SEO.)
3. Include FAQ + FAQPage JSON-LD? (No existing post has it; it's an upgrade.)
4. Confirm not cannibalizing the Fabric cost post (I say no; will link to it).

---

## ARCHITECT — smallest change
- Add ONE file: `content-kit/content/blog_finops_on_azure.json` (url `/blog/finops-on-azure/`).
- Add ONE hero image to blog template: `public/wp-content/uploads/2026/07/finops-on-azure.png` (850x560).
- Set `meta.ogImage` to that PNG. `related: []` (auto-populated). No component code. No card-icons (blog, not marketing page).

## SM — stories
- S1: Build hero image to blog template (850x560 PNG, navy gradient, folio3|Azure pill).
- S2: Write bodyHtml (ez-toc + Key Takeaways + intro + 5 strategies + mistakes + FAQ + JSON-LD + conclusion + soft CTA).
- S3: Assemble JSON (meta, sections[h1 only], images, bodyHtml). Wire 5-7 internal links.
- S4: Build (`npm run build`) + Playwright visual verify (headings/paras present, images 200, no console errors, links resolve on branch).
- S5: Commit + push + PR.

## Verified internal-link targets (exist on THIS branch)
- /blog/microsoft-fabric-cost-optimization-strategies/  (Fabric-specific cost tuning)
- /azure-data-analytics/
- /microsoft-fabric-services/
- /blog/data-warehouse-modernization-azure/
- /azure-cloud-service/   (main Azure services — CTA target)
- /data-integration-as-a-service/   (data movement / egress angle)
- /blog/enterprise-data-architecture/
- /data-science-ai/ (fallback)

## OUTLINE (checkpoint b — proposed)
- H1: Mastering FinOps on Azure: 5 Proven Strategies to Cut Cloud Spend Without Sacrificing Performance
- Key Takeaways (bullet block, before intro)
- ez-toc widget
- Intro (~90 words; "Azure cost optimization" + "FinOps on Azure" in first 100 words)
- H2: What FinOps on Azure Really Means  [secondary kw: azure finops]
- H2: 5 Proven Azure Cost Optimization Strategies  [PRIMARY kw in H2]
  - H3: 1. Right-size and autoscale before you buy anything
  - H3: 2. Commit deliberately — Reserved Instances & Savings Plans
  - H3: 3. Tier and lifecycle your storage (and kill egress waste)
  - H3: 4. Govern with tagging, budgets & Azure Cost Management
  - H3: 5. Make cost a continuous, shared discipline (the FinOps loop)
- H2: Azure Cost Optimization Mistakes That Quietly Inflate Your Bill  [PRIMARY kw in 2nd H2]
- H2: Frequently Asked Questions  (3-4 Q&A) + FAQPage JSON-LD
- H2: Conclusion  (primary kw in conclusion)
- Soft CTA paragraph -> /azure-cloud-service/
