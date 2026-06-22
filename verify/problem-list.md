# Master Problem List — site-wide pixel-parity audit

Generated from deterministic audits (desktop + mobile) over 242 routes.

## Executive summary

| Metric | Count |
|---|---|
| Routes audited | 242 |
| Pages OK on both live+clone | 241 |
| **Total missing images** (live img not in clone) | **1848** |
| Unique images to download (not on disk) | 284 |
| **Total link-target mismatches** | **9** |
| Pages with H1 ≠ 1 | 1 |
| Captured pages that 404 on the LIVE | 1 |
| Pages that 404 on the CLONE | 0 |

## Cross-cutting patterns (fix centrally)

### A. Most common link-target mismatches (clone → should be)

| # pages | Button text | Clone target | Live target |
|---|---|---|---|
| 5 | Talk to an Expert | `/contact-us` | `#pgForm` |
| 2 | Speak to Our Azure Experts | `/contact-us` | `#pgForm` |
| 1 | Contact Us Now | `/contact-us` | `#pgForm` |
| 1 | Read More | `/city-university-azure` | `/savills | /copilot-implementation-food-verification` |

### B. Most common missing images (likely template assets)

| # pages | Image |
|---|---|
| 73 | `/wp-content/uploads/2026/04/ai-financial-planning-azure.jpg` |
| 53 | `/wp-content/uploads/2026/04/ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg` |
| 52 | `/wp-content/uploads/2026/04/real-time-data-intelligence-in-microsoft-fabric.jpg` |
| 36 | `/wp-content/uploads/2026/04/farm-to-market-analytics-solutions.jpg` |
| 30 | `/wp-content/uploads/2024/08/azure-offices-map-img.webp` |
| 24 | `/wp-content/uploads/2023/11/azure_solution_architect.svg` |
| 24 | `/wp-content/uploads/2023/11/azure_administration.svg` |
| 24 | `/wp-content/uploads/2023/11/AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg` |
| 24 | `/wp-content/uploads/2023/11/azure_security_engineer.svg` |
| 24 | `/wp-content/uploads/2023/11/data-analyst.svg` |
| 24 | `/wp-content/uploads/2023/11/azure-data-engineer.svg` |
| 24 | `/wp-content/uploads/2023/11/power_platform_developers.svg` |
| 24 | `/wp-content/uploads/2023/11/azure-network-engineer.svg` |
| 24 | `/wp-content/uploads/2023/11/MB-900.svg` |
| 24 | `/wp-content/uploads/2023/11/AI-102.svg` |
| 24 | `/wp-content/uploads/2023/11/DP-100.svg` |
| 24 | `/wp-content/uploads/2023/11/AZ-140.svg` |
| 24 | `/wp-content/uploads/2023/11/azure-stack-hub.svg` |
| 24 | `/wp-content/uploads/2023/11/window-server-hybrid-administration.svg` |
| 24 | `/wp-content/uploads/2023/11/mirosoft_certified_trainer.svg` |
| 24 | `/wp-content/uploads/2024/08/azure-blog-cta-img-1.webp` |
| 22 | `/wp-content/uploads/2023/06/azure-banner-cloud.webp` |
| 21 | `/wp-content/uploads/2024/01/ias-savills-logo.webp` |
| 21 | `/wp-content/uploads/2024/01/ias-cityu-logo.webp` |
| 21 | `/wp-content/uploads/2024/01/ias-daraz-logo.webp` |
| 21 | `/wp-content/uploads/2024/01/ias-rff-logo.webp` |
| 20 | `/wp-content/uploads/2026/04/data-analytics-and-business-intelligence.jpg` |
| 20 | `/wp-content/uploads/2026/04/intellifabric-vs-custom-microsoft-fabric.jpg` |
| 17 | `/wp-content/uploads/2025/12/data-analytics-trends.jpg` |
| 14 | `/wp-content/uploads/2025/07/azure-automate-data-reporting-for-slb-with-data-accuracy.webp` |

### C. Captured pages that do NOT exist on the live (review: drop / noindex)

- `/industries/` (live 404)

### E. Pages with wrong H1 count

- `/blog/our_industries/financial-services/` → H1=0

## Visual structural findings (60 design pages)

Desktop verdicts: major-diff=56, minor-diff=1, totally-different=3

Mobile verdicts: major-diff=55, minor-diff=1, totally-different=4

### Most common missing SECTIONS (live → absent on clone)

| # pages | Section |
|---|---|
| 37 | hero-illustration |
| 31 | stats-band |
| 29 | lead-form |
| 11 | client-logos |
| 9 | case-studies |
| 8 | services-cards |
| 8 | industries |
| 7 | client-logo-strip |
| 6 | process-steps |
| 5 | awards-cert-badges |
| 4 | why-choose-folio3 |
| 4 | scale-cta |
| 4 | faq |
| 4 | scale-cta-illustration |
| 3 | scale-cta-banner |
| 3 | real-results-case-studies |
| 3 | lead-form (Schedule a 1:1 Call Today form) |
| 3 | business-outcomes-cards |
| 2 | feature-cards |
| 2 | etl-pipeline-diagram |

## Per-page detail

### `/power-bi-services/`  — 66 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration (partial: hero image broken/placeholder), industry-wide-analytics-architecture-diagram (Microsoft Fabric / Power BI flow), services-cards (Power BI & Analytics Services We Offer icon cards), bi-implementation-cards (Consulting/Implementation/Optimization/Support/Testing), bi-implementation-roadmap (7 numbered process steps with icons), bi-infrastructure-services-grid (9 feature cards with icons), industries-grid (Financial Services/Manufacturing/etc tabs+cards), awards-certs (Awards & Recognition carousel badges), client-logo-strip (Trusted By Organizations logos), technologies-logos (Technologies We Work With), why-choose-folio3-grid (4 feature cards), case-studies (Real Results, Real Impact card), lead-form (Schedule a 1:1 Call Today form), stats-band (Projects Delivered / Global Employees counters)
- Missing images: analytics-solutions-architecture.webp *DL*, analytics-solutions-architecture-mobile-scaled.webp *DL*, analytics-solutions-architecture-mobile.webp *DL*, discovery-icon.webp, architecture-design-icon.webp, tools-selection-icon.webp, planning-icon.webp, component-icon.webp, training-icon.webp, business-user-icon.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-1.webp, where-food-comes-from.webp, benefits-business-intelligence-analytics-services.webp *DL*, improved-decision-making-icon.svg, sustainable-market-advance.svg, better-customer-intelligence-icon.svg …
- Visual (both, structure, high): Clone renders section headings and paragraph text but almost all visual content (icon grids, cards, diagrams, badges, logos, illustrations) is missing, leaving large empty white/light bands. Page is ~9.5k px vs live ~13k px.
- Visual (both, images, high): Industry-Wide Analytics Solution Architecture diagram (Microsoft Fabric / Power BI flow) entirely absent on clone.
- Visual (both, structure, high): Services / BI Infrastructure feature-card grids and the 5 BI Implementation cards render as blank space (icons + card chrome missing).
- Visual (both, structure, high): BI Implementation Roadmap (7 numbered steps with icons) missing on clone.
- Visual (both, structure, high): Awards & Recognition band shows only the heading with no award/cert badges or carousel; Technologies We Work With shows heading with no logo row.
- Visual (both, structure, med): Industries grid (Financial Services, Manufacturing, Healthcare, etc.) absent; live shows a tabbed/boxed grid.
- Visual (both, structure, med): Case study card (Real Results, Real Impact - Food Crop Grower 12% yield) missing on clone.
- Visual (both, nav, high): Bottom CTA differs: live shows page-specific 'Schedule a 1:1 Call Today' lead form + stats counters band; clone shows a generic 'Ready to unlock the power of Azure?' banner with no form or stats.
- Visual (desktop, images, med): Hero illustration on clone appears as a plain/placeholder graphic vs live's detailed isometric BI illustration; hero CTA buttons styling differs.
- Visual (mobile, mobile, high): Same missing-content pattern on mobile: long empty stacked bands where card grids/diagrams/logos should be; many sections collapse to heading-only, producing large gaps and a broken-looking scroll.

### `/azure-data-analytics/`  — 53 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-feature-band, key-benefits-accordion-illustration, end-to-end-BI-illustrations, industries-tabs-image-grid, client-tech-logo-strip, testimonials, learn-more-services-cards, best-choice-section, lead-form
- Missing images: end-to-end-BI-top-banner-img-mobile.webp, end-to-end-BI-top-banner-img.webp, elt-pipeline-diagram-mobile-updated.webp *DL*, data-integration-as-service-icon.png, data-warehouse-as-service-icon.png, data-visualization-as-service-icon.png, predictive-analysis-icon.png, integrate-data-sources-icon.svg, unified-view-data-icon.svg, make-sense-data-icon.svg, predict-future-outcomes-icon.svg, time-insight-icon.svg, decision-making-icon.svg, agriculture-tab-img-grid.webp, retail-tab-img-grid.webp, dynamics-365-tab-img-grid.webp *DL*, business-central-tab-img-grid.webp *DL*, arrow_bottom.svg, Manufacturing-1.webp, Healthcare-1.webp …
- Visual (both, images, high): Hero 3D isometric Azure-data illustration (end-to-end-BI-top-banner-img) is missing on clone; hero right side is blank/placeholder.
- Visual (desktop, structure, high): Clone collapses most sections into long walls of raw unstyled body text with large white gaps where LIVE has styled cards, illustrations and bands.
- Visual (both, images, high): Industries section (Agriculture/Retail etc.) loses its tabbed image grid (agriculture-tab-img-grid.webp); only text remains, no tab UI/imagery.
- Visual (desktop, structure, high): 'Technologies We Work With' client/tech logo strip is empty/placeholder on clone vs full logo grid on LIVE.
- Visual (desktop, structure, high): Testimonials ('Real Parents, Real Impact') and 'Learn More About Our Services' card row are missing or unstyled on clone.
- Visual (desktop, layout, med): LIVE two-column benefit/feature cards render single-column text blocks on clone; column structure and card styling lost.
- Visual (desktop, structure, high): Lead form / contact block near footer is absent or reduced to empty box on clone.
- Visual (both, images, med): Key Benefits accordion and 'Get Empowering Insights' supporting illustrations are missing on clone, leaving blank columns.
- Visual (mobile, structure, high): Mobile clone is mostly stacked raw text with missing illustrations; section rhythm and cards from LIVE are gone, page reads as a long text dump.
- Visual (mobile, layout, med): Mobile clone missing the styled blue feature/benefit bands and testimonial blocks present on LIVE; large monochrome blue text sections instead.

### `/ai-scenario-library/`  — 47 img, 0 links — visual: desktop=totally-different, mobile=totally-different
- Missing sections: hero-illustration, client-logo-strip, agents-by-business-function-cards, agents-by-industry-cards, bringing-ai-to-business-cta, ready-to-transform-section, real-results-case-studies, lead-form, awards-cert-badges
- Missing images: scenarios.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, copilot-agents-finance.webp, copilot-agents-marketing.webp, copilot-agents-sales.webp, copilot-agents-operations.webp, copilot-agents-human-resources.webp, copilot-agents-information-technology.webp, copilot-agents-customer-service.webp, copilot-agents-legal.webp, copilot-agents-communications.webp, copilot-agents-executive-offices.webp, copilot-agents-accessibility.webp, copilot-agents-sustainability.webp, isa-financial-services.webp, isa-healthcare.webp …
- Visual (both, structure, high): Clone renders a generic template (hero 'Copilot Scenario Library – Azure', 'Why Choose Folio3?', 'Awards & Recognition' address list, single CTA). The entire scenario-library content model from LIVE is absent.
- Visual (both, text, high): Hero heading mismatch: LIVE 'AI Business Scenarios Made Easy'; CLONE 'Copilot Scenario Library – Azure'. CTA also differs ('Talk to an Expert' vs LIVE flow).
- Visual (both, images, high): LIVE hero has a central agents/network illustration; CLONE hero is text-only over a faint blue line graphic. Big illustration missing.
- Visual (both, structure, high): LIVE 'Explore Agents by Business Function' multi-column card grid (Finance, Marketing, Operations, HR, IT, etc.) is entirely missing on CLONE.
- Visual (both, structure, high): LIVE 'Explore Copilot Agents by Industry' card grid (Financial Services, Healthcare, Manufacturing, Retail, Government, Energy, Media, Nonprofit) is entirely missing on CLONE.
- Visual (both, structure, high): LIVE client-logo strip below hero and 'Real Results, Real Impact' case-study cards are missing on CLONE.
- Visual (both, images, med): 'Awards & Recognition' on CLONE is just an address/contact text block with no award/cert badge images; appears as a large empty white band.
- Visual (both, structure, high): Lead-capture form present in LIVE flow is absent on CLONE (replaced by single blue CTA banner only).
- Visual (mobile, layout, high): Mobile CLONE collapses to a short single-column generic page; LIVE mobile is a long stacked sequence of function/industry cards and tabs. Vastly less content, large empty white gaps.
- Visual (mobile, nav, med): Both show hamburger on mobile (parity ok), but CLONE's stock photo in 'Why Choose' sits with heavy whitespace and the Awards band is mostly blank, indicating broken/placeholder layout.

### `/data-integration-as-a-service/`  — 46 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: stats-band (Contact All Your Data Sources counters), services-cards (Our Data Integration Services icon grid), benefits-feature-cards (Benefits of DIaaS, icons missing), tabs (Fold All Your Data From Diverse Sources / DIaaS Capabilities tab UI), industries, client-logos (logo strip), process-steps (illustration + connected step graphics), case-studies (Savills/CityU thumbnails empty placeholders), scale-cta (banner illustration/styling missing), faq, lead-form (contact/pgForm fields not rendered as styled form)
- Missing images: ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, ias-concept-img-icon-1.webp, ias-concept-img-icon-2.webp, ias-concept-img.webp, ias-concept-img-icon-3.webp, cloud-dollar.svg, scaleability-icon.svg, servers-cloud-icon.svg, operate-cloud-icon.svg, right-monogram.svg, databases-postgresql-logo.webp *DL*, databases-oracle-logo.webp *DL*, databases-mariadb-logo.webp *DL*, databases-mssql-logo.webp *DL*, databases-amazonrds-logo.webp *DL*, databases-mysql-logo.webp *DL*, cloudapps-gsuite-logo.webp *DL* …
- Link "Talk to an Expert": clone `/contact-us` → live `#pgForm`
- Visual (both, images, high): Nearly all section illustrations/icons missing on clone: feature cards show generic blue diamond placeholder icons instead of real icons (ias-concept-img.webp etc.).
- Visual (desktop, structure, high): Large empty white/light-blue bands where live has styled sections (stats band, tabs, FAQ, scale CTA). Clone page is ~2150px TALLER than live due to collapsed/unstyled blocks.
- Visual (both, layout, high): 'Building Automated ETL/ELT Pipelines' step cards mis-ordered (Step 01, 03, 02) and styled as plain 3 bordered boxes vs live's designed process layout.
- Visual (both, layout, high): Benefits list renders as a bare bulleted/indented text column with no icons, columns, or card styling that live shows.
- Visual (both, images, high): Case-study cards (Savills, CityU) render as empty grey rectangles with only a label tag; live has full background imagery.
- Visual (both, structure, high): Live's tabbed 'Fold All Your Data / DIaaS Capabilities' interactive section and client-logo strip appear absent/empty on clone.
- Visual (both, structure, high): Lead/contact form (Talk to an Expert -> #pgForm) not rendered as a styled form section on clone.
- Visual (mobile, structure, high): Mobile clone is extremely long (~25k px) with huge empty gaps and long unstyled text runs; live stacks compact styled cards/sections.
- Visual (mobile, layout, med): Mobile benefits/services collapse into a single raw text column without the carded, iconed stacking seen on live.
- Visual (desktop, styling, med): Hero is the only faithfully-styled section (illustration, breadcrumb, CTA correct); everything below loses background/section styling, giving a broken half-built appearance.

### `/azure-data-analytics/data-visualization-as-a-service/`  — 44 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logo-strip, services-cards-icons, etl-pipeline-diagram, our-approach-icons, tech-logos-grid, stats-band, case-studies-images, scale-cta-illustration
- Missing images: data-visualization-as-service-header-img.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, dvas-featured-img-1-1.webp, elt-pipeline-diagram-mobile.webp *DL*, discovery-icon.webp *DL*, sb-icon.webp *DL*, dm-icon.webp *DL*, dd-icon.webp *DL*, developent-icon.webp *DL*, mobile-chat.svg, scaleability-icon.svg, servers-cloud-icon.svg, magni-window.svg, mobile-tick-hand.svg, arrow-gear-tick-icon.svg, power-bi-logo.webp, looker-logo.webp …
- Visual (both, images, high): Hero isometric data-visualization illustration absent on clone; hero right column is blank, leaving a lopsided text-only banner.
- Visual (both, images, high): Client/brand logo strip below hero (colored partner logos on live) is completely missing on clone.
- Visual (both, images, high): All service/feature card icons and 'Our Approach' icons are gone, leaving cards as bare text blocks.
- Visual (desktop, images, high): 'Building Automated ETL/ELT Pipelines' diagram missing; section collapses to a huge empty white gap.
- Visual (both, images, high): 'Implementing the Best Modern Data Visualization Technologies' tech-logo grid is empty on clone.
- Visual (both, structure, high): 'Real Results, Real Impact' stats band and case-study cards render as empty placeholders (no numbers/visuals/images).
- Visual (both, layout, high): Missing illustrations create enormous vertical white gaps, inflating page height and destroying intended spacing/rhythm vs live.
- Visual (both, images, med): Scale/'Ready to unlock the power of Azure?' CTA banner lacks its background illustration; appears as plain blue band.
- Visual (mobile, images, high): On mobile the missing hero/section illustrations leave large blank stretches; content reads as text-only with broken visual hierarchy.
- Visual (mobile, nav, low): Header/hamburger area renders but logo and top utility icons differ; sticky blue breadcrumb bar styling differs from live.

### `/azure-data-analytics/supply-chain-analytics/`  — 40 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, services-cards, industries, stats-band, dashboard-showcase, process-services, consulting-cards, key-benefits-cards, why-choose-cards, case-studies, scale-cta, lead-form
- Missing images: supply-chain-analytics.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-1.webp, where-food-comes-from.webp, industry-wide-analyts-solution-artchitecture-mobile-scaled.webp *DL*, industry-wide-analyts-solution-artchitecture-mobile.webp *DL*, sca-icon-1.svg, sca-icon-2.svg, sca-icon-3.svg, sca-icon-4.svg, sca-icon-5.svg, sca-icon-6.svg, sca-icon-7.svg, distribution.webp *DL*, inventory-quantity-cogs.webp *DL*, inventory-valuation.webp *DL*, sla-shipping-scorecard.webp *DL* …
- Visual (both, images, high): Hero isometric supply-chain illustration missing on clone; hero area shows only text on a faint background vs live's full graphic.
- Visual (both, structure, high): Client/partner logo strip (Danone, etc.) under hero is absent on the clone.
- Visual (both, structure, high): 'Our Industry-Wide Analytics Solution Architecture' icon grid and the 'Core Functionality' accordion/cards are missing or collapsed to empty space on clone.
- Visual (desktop, structure, high): Large mid-page sections render as huge blank white bands on clone: dashboard showcase, professional consulting cards, key-benefits and why-choose card grids are all empty.
- Visual (both, structure, high): 'Real Results, Real Impact' case-studies/testimonials block present on live is missing on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call' / lead-capture form section on live is absent on clone (clone ends near footer with no form).
- Visual (both, nav, med): Top utility/secondary nav and section-anchor bar (blue tab strip below hero) on live not reproduced on clone.
- Visual (both, layout, high): Multi-column card layouts (2-3 col) on live collapse to empty single-column whitespace on clone, breaking visual rhythm and spacing.
- Visual (desktop, styling, med): Awards & Recognition band renders as a plain blue bar with text only; live shows accompanying badge/cert visuals.
- Visual (mobile, mobile, high): Clone mobile is mostly blank stacked text with large empty gaps; live mobile has fully populated stacked cards, dashboards and form, so mobile parity is broken.

### `/ai-scenario-library/copilot-in-retail/`  — 37 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, services-cards, tabs, industries, process-steps, case-studies, faq, client-logos, awards-certs-badges
- Missing images: azure-ai-agent-copilot-in-retail.webp, microsoft-azure.webp, microsoft-copilot.webp, azure-openai-service.webp, azure-data-lake-1.webp, microsoft-fabric.webp, copilot-agent-icon.webp, azure-openai.webp, azure-data-lake.webp, microsoft-copilot-1.webp, power-automate.webp, microsoft-fabric-1.webp, power-bi.webp, dynamics-365.webp, azure-synapse.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg …
- Visual (both, structure, high): Clone omits the entire middle of the page: it jumps from hero straight to 'Awards & Recognition' (world map + office list), then CTA banner + footer. Live has many content sections (stats band, multiple feature/services card grids, dark 'Retail Operations in Action' block, tabs/accordion, industries grid, Microsoft-trusted/process section, FAQ) all absent.
- Visual (both, images, high): Hero illustration missing on clone. Live shows a circular AI-agent/supply-chain diagram art on the right of the hero; clone hero right side is empty faint background only.
- Visual (both, structure, high): 'Awards & Recognition' section on clone is malformed: it shows only a world map and an unrelated 'Schedule a 1:1 Call Today' heading plus raw office-address columns (footer-style content) instead of actual award/certification badges seen implicitly on live.
- Visual (both, structure, high): Stats/metrics band present on live (numbered KPI row near top) is completely missing on clone.
- Visual (desktop, layout, high): Live uses dense multi-column card grids (3-up feature cards, alternating light/dark bands) for capabilities and benefits; clone renders almost none of these, so the page is mostly empty white space between hero and footer.
- Visual (both, text, high): Live has section headings like 'Copilot In Retail Empowers...', 'What Makes The Difference', 'Capabilities & Data Solutions Across Your Enterprise', plus a FAQ block — none of these headings/copy appear on clone.
- Visual (both, styling, med): Hero heading text accent color differs/mismatched and live hero has a tinted gradient + decorative art panel; clone hero is plainer with a flat light panel.
- Visual (mobile, mobile, high): Mobile clone collapses to hero -> awards/world map -> office addresses -> CTA -> footer, an extremely short page versus the very long live mobile page; massive content loss rather than a stacking bug.
- Visual (mobile, nav, low): Mobile hamburger present on both (parity OK), but clone's truncated body means nav is the only intact shared element.
- Visual (both, layout, med): Scale/CTA banner ('Ready to unlock the power of Azure?') renders on clone but appears prematurely right after the address block due to missing sections, breaking intended page flow/spacing.

### `/azure-data-analytics/manufacturing-data-analytics/`  — 36 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logo-strip, transform-intro-illustration, stats-value-band, bi-reporting-illustration-section, crossing-data-use-cases-grid, features-advanced-suite-cards, mid-page-blue-cta-banner, gain-deep-insights-twocol, serving-businesses-worldwide-icons, awards-cert-badges, why-choose-folio3-panel, real-results-stats, faq-accordion, lead-capture-form
- Missing images: drive-manufacturing-excellence-ai-powered-analytics.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-1.webp, where-food-comes-from.webp, inventory-management-mda.webp, production-performance-mda.webp *DL*, one-time-full-production-mda.webp *DL*, sales-order-analysis-mda.webp *DL*, operational-efficiency-icon.svg, quality-control-icon.svg, optimize-inventory-icon.svg, asset-optimization-icon.svg, cost-reduction-icon.svg, gain-deep-insights-your-manufacturing-business.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg …
- Visual (both, images, high): Hero is missing the isometric dashboard illustration and the colorful brand/client logo row; clone shows only a faint empty background.
- Visual (both, structure, high): Roughly half the page body is empty white space on the clone where live renders multiple illustrated feature/stat sections (BI reporting, crossing use-cases, advanced suite features, gain insights, serving businesses).
- Visual (both, structure, high): Awards & Recognition appears as a bare blue band on the clone with no certification/award badge images.
- Visual (both, structure, high): FAQ accordion section is entirely absent on the clone.
- Visual (both, structure, high): Lead-capture form near page bottom is missing on the clone.
- Visual (both, structure, high): Mid-page blue CTA banner ('Take Your Manufacturing...') and 'Why Choose Folio3?' blue panel with stats are missing/collapsed on the clone.
- Visual (desktop, images, med): Offerings and feature cards on the live page carry colored icons; clone cards render with placeholder/empty icon slots.
- Visual (both, text, med): Clone inserts an 'Inventory Management' heading/card block that does not match the live section ordering and labeling.
- Visual (mobile, layout, high): Mobile clone collapses to mostly text-only stacked blocks with large empty gaps; the rich multi-section live mobile layout (icons, stats, FAQ, form) is absent.
- Visual (both, styling, med): Overall vertical rhythm broken: missing illustrations leave oversized blank spacing, making the page look unstyled versus the dense live layout.

### `/solution/intellifabric/`  — 36 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, client-logos, what-is-intellifabric, comparison-table, decision-intelligence-illustration, industries, who-is-it-for, case-studies, lead-form, faq
- Missing images: rocket-icon.png, intellifabric.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, what-is-intellifabric.webp, decision-intelligence.webp, insights-drive-actions.webp *DL*, meaningful-measurable-results.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL* …
- Visual (both, images, high): Hero right-side dashboard illustration (intellifabric.webp) absent on clone; hero is plain blue gradient with no product mockup.
- Visual (both, structure, high): Entire 'IntelliFabric Solves Real Business Problems' stats/feature band (4 cards: reports, business users, data, automated) missing on clone.
- Visual (both, structure, high): 'What is IntelliFabric?' section with bullet list + product illustration (what-is-intellifabric.webp) absent on clone.
- Visual (both, structure, high): 'Why IntelliFabric Wins (vs Traditional BI Tools)' two-column comparison table missing on clone.
- Visual (both, images, med): Client-logo strip (Duraz, CRU etc.) below hero present on live, absent on clone.
- Visual (both, structure, high): 'Industry-Specific Analytics' tabbed/category nav band and content missing on clone.
- Visual (both, structure, high): 'Who IntelliFabric is For?' 4-card grid missing on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead-capture form (name/email/phone fields) present on live, absent on clone.
- Visual (both, text, med): Hero heading differs: live 'Unlock Scalable, Self-Service Analytics Built on Microsoft Fabric...'; clone 'IntelliFabric Analytics Solution | Self-Service Reporting on Microsoft Fabric' (raw SEO title).
- Visual (both, layout, med): Awards & Recognition rendered as large empty blue band on clone (badge images missing), and address/office blocks pad out the middle where rich content should be.

### `/data-science-ai/`  — 34 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: client-logo-strip (Trusted By: savills/CityU/Daraz/etc.), services-cards (6-card 'Our Data Science And AI Services' grid), scale-cta ('Transform Data Into Decisions With Microsoft Fabric' banner), process-steps ('Our Data Science And AI Deployment Process' 4-step Discovery/Strategy/Development/Optimization), industries (tabbed 'Industries We Serve' with illustrations), why-folio3 feature cards (Collaboration/Domain Expertise/Proven Methodology), case-studies images (Savills/CityU cards render as empty placeholders), stats-band (0+ Projects/Employees/Companies/Awards), faq ('What Makes Us The Best Choice' accordion), lead-form ('Schedule a 1:1 Call Today')
- Missing images: ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-logo.webp, where-food-comes-from.webp, discovery-icon.webp *DL*, sb-icon.webp *DL*, dm-icon.webp *DL*, developent-icon.webp *DL*, Healthcare-1.webp, Manufacturing-1.webp, Financial-services.webp, retail-1.webp, agriculture.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg …
- Link "Talk to an Expert": clone `/contact-us` → live `#pgForm`
- Visual (both, structure, high): Clone is drastically truncated: page height ~8269px vs live ~11822px desktop (16003 vs 11973 mobile). After the hero+services intro it collapses straight into empty placeholder bands and the footer, dropping most mid-page sections.
- Visual (both, images, high): Entire 'Trusted By organizations around the globe' client-logo strip below the hero is absent on the clone.
- Visual (both, structure, high): 6-card 'Our Data Science And AI Services' grid, 'Microsoft Fabric' CTA banner, 4-step deployment process, and tabbed 'Industries We Serve' sections are all missing/empty placeholders on the clone.
- Visual (both, images, high): Case-study cards (Savills, CityU) render as blank grey boxes with only the label chip; thumbnail images missing.
- Visual (both, structure, high): FAQ accordion and the 'Schedule a 1:1 Call Today' lead form plus the 0+ stats band are entirely absent on the clone.
- Visual (both, layout, high): Sections that do render are badly misaligned vertically vs live (huge empty whitespace bands), so headings like 'Awards & Recognition' float alone with no content/carousel cards.
- Visual (both, text, med): Hero CTA text differs: live 'BOOK A FREE AZURE AI MEETING' vs clone 'SPEAK TO OUR AZURE EXPERTS'; clone also adds a 'DATA SCIENCE AI' eyebrow and different sub-copy.
- Visual (both, styling, med): Hero heading is rendered in a much heavier/bolder weight on the clone vs the lighter weight on live; button color is a lighter blue.
- Visual (mobile, layout, med): Mobile hero background wave illustration bleeds behind the heading/body text, overlapping and reducing legibility; on live the illustration is contained.
- Visual (mobile, structure, high): Mobile clone mirrors desktop gaps: services cards, process steps, industries, FAQ, stats and lead form missing, leaving large empty stretches before the footer. Hamburger nav parity itself is OK.

### `/ai-powered-solutions/`  — 33 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration (AI app-icon cluster), client-logo strip (Savills, CityU, Daraz, etc.), pioneering-innovation isometric illustration (gray placeholder on clone), services-cards content, core-benefits 6-item icon grid, microsoft-ai-powered-solutions cards, awards-certification badges, faq accordion, stats-counter band (0+ Projects/Companies/Employees), schedule-1:1-call lead form
- Missing images: Frame-1410126050-elementor-io-optimized.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, Frame-1000001875-elementor-io-optimized-3.webp *DL*, AI-Strategy-elementor-io-optimized.webp *DL*, Gen-AI-elementor-io-optimized-1.webp *DL*, Frame-elementor-io-optimized-1.webp, Intelligent-Recruitment-elementor-io-optimized.webp *DL*, bbbb-elementor-io-optimized.webp *DL*, Expense-Management-elementor-io-optimized.webp *DL*, Customer-Insights-elementor-io-optimized.webp *DL*, Talent-Management-elementor-io-optimized.webp *DL*, Frame-1000001913-elementor-io-optimized.webp, Frame-1000002167-elementor-io-optimized-1.webp, Frame-1000002168-elementor-io-optimized.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg …
- Visual (both, images, high): Hero AI app-icon illustration absent on clone; clone hero shows only a plain wave/gradient background.
- Visual (both, structure, high): Client trust-logo strip (Savills, CityU, Daraz, Robinhood, etc.) directly under hero is entirely missing on clone.
- Visual (both, images, high): 'Pioneering Innovation' isometric illustration renders as an empty gray placeholder box on clone vs full colored graphic on live.
- Visual (both, structure, high): Core Benefits section: live shows 6 icon+label cards (Productivity, Decision-Making, Optimized Costs, etc.); clone shows plain bullet text without icons/card layout.
- Visual (both, structure, high): FAQ accordion ('What Makes Us The Best Choice...') present on live, completely absent on clone.
- Visual (both, structure, high): Stats counter band (0+ Projects Delivered / Companies Served / Global Employees) missing on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call' lead form (Full Name, Phone, Email, Message + Submit) entirely missing on clone.
- Visual (both, images, med): Awards & Recognition badge row is empty/placeholder on clone (heading present, badges missing).
- Visual (desktop, layout, high): Microsoft AI Powered Solutions and Optimize sections show large blank white expanses on clone where live has populated card grids.
- Visual (mobile, text, med): Mobile hero CTA differs: live 'ACHIEVE YOUR AI VISION', clone 'SPEAK TO OUR AZURE EXPERTS'; clone hero also lacks the 'TRUSTED BY ORGANIZATIONS' logo band.

### `/ai-scenario-library/human-resources/`  — 33 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, use-case-cards (partial/empty), scale-cta (70% Fortune 500 band), recruitment-automation-section, hr-kpis-checklist, case-studies (Real Results Real Impact), stats-band (counters), lead-form (Schedule a 1:1 Call)
- Missing images: copilot-human-resource.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, recruitment-talent-acquisition.webp, employee-onboarding-integration.webp *DL*, benefits-compensation-management.webp *DL*, learning-career-development.webp *DL*, organizational-health-employee-experience.webp *DL*, human-resource-kpis-reimagined.webp, transform-hr-strategy-folio3.webp, azure-data-services-private-equity-firm.webp, automating-food-plan-management-saving-time-with-copilot.webp, azure-automate-data-reporting-for-slb-with-data-accuracy.webp, power-bi-dashboards-for-a-food-crop-grower-improving-yield-potential.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg …
- Visual (both, images, high): Hero illustration (copilot-human-resource.webp HR robot graphic) missing on clone; hero right side is blank/plain gradient vs live's detailed illustration.
- Visual (both, structure, high): Client/partner logo strip beneath hero (Daraz, Citi, etc.) is entirely absent on clone.
- Visual (both, structure, high): Clone drops ~half the page: '70% of Fortune 500' CTA band, 'Tired of Recurring Recruitment Tasks' section, 'Human Resource KPIs Reimagined' checklist, 'Real Results Real Impact' case-study cards, and the stats counter band are all missing.
- Visual (both, structure, high): Lead-form section 'Schedule a 1:1 Call Today' (left intro + right form fields) missing on clone; replaced by generic 'Ready to unlock the power of Azure?' CTA only.
- Visual (both, structure, med): Clone inserts an 'Awards & Recognization' blue band that does not match the live page's awards presentation; live shows it differently and lower in flow.
- Visual (both, layout, high): Use Cases section: live shows 9 populated cards in 3 columns; clone shows 6 cards with mismatched/empty content and large blank gaps between sections.
- Visual (both, text, med): Hero heading differs: live 'Folio3 HR Agent Hub for Effortless HR Transformation' vs clone 'Folio3 Copilot For HR'. CTA text also differs.
- Visual (both, styling, med): Large empty whitespace blocks on clone where live has dense content; overall vertical rhythm and section backgrounds don't match.
- Visual (mobile, mobile, high): Clone mobile is mostly empty after the first feature cards; live mobile is content-rich and far taller, so the clone is missing the bulk of stacked sections.
- Visual (mobile, images, med): Mobile hero illustration and logo carousel present on live are absent on clone, leaving a flat truncated hero.

### `/azure-data-analytics/retail-analytics/`  — 33 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, services-cards, stats-band, feature-cards, kpi-section, use-cases-cards, scale-cta, why-choose-cards, real-impact, awards-certs, lead-form
- Missing images: retail-analytics.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-1.webp, where-food-comes-from.webp, data-overload-icon.svg, tailored-industry-icon.svg, market-pulse-icon.svg, network-intelligence-icon.svg, inventory-management-mda.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL* …
- Visual (both, images, high): Hero retail dashboard illustration absent on clone; hero is text-only on a flat blue/white block vs live's rich illustrated hero.
- Visual (both, structure, high): Client-logo strip under hero (Adidas/Daraz/etc.) missing on clone.
- Visual (both, structure, high): 'Comprehensive Real-Time Retail Analytics Reporting Solution' feature-card section missing entirely on clone.
- Visual (both, structure, high): Stats band ('360x Sales Performance' metrics) not rendered on clone.
- Visual (both, structure, high): 'Key Features That Transform Retail Operations' and 'Critical KPIs' card sections absent; clone shows only a sparse two-column text list.
- Visual (both, structure, high): 'Covering All Strategic Retail Analytics Use Cases' card grid and 'Why Operations Leaders Choose Our' cards missing on clone.
- Visual (both, layout, high): Large empty blue band and huge whitespace gaps where card/illustration sections failed to load; major vertical-rhythm/spacing breakage.
- Visual (both, text, med): CTA heading differs: live ends with 'Ready to See How Real-Time Retail Analytics Can Transform Your Operations'; clone shows generic 'Ready to unlock the power of Azure?'.
- Visual (both, structure, high): 'Real Results, Real Impact' case-study/results section and the bottom lead form (live 'Schedule a 1:1 Call') not present on clone.
- Visual (mobile, images, med): Awards & Recognition badges/logos missing on clone mobile, leaving a heading over empty space; live shows badge row.

### `/azure-for-logistics-and-transport/`  — 33 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, services-feature-blocks (Azure IoT Solutions), 360-visibility-real-time-illustration, strategic-applications-illustrations, fleet-optimization-tabs, digital-transformation-illustration, process-steps (Your Path to Azure Implementation), awards-certs (empty blue band), client-logos, case-studies (Seville/Chivo cards empty), real-results-impact-stats, scale-cta-illustration, lead-form (mobile)
- Missing images: azure-iot-solutions.webp, azure-powered-business-apps.webp *DL*, data-ai-services.webp *DL*, logistics-focused-applications.webp *DL*, unlock-the-power-logistics-data-azure-ai.webp, fleet-optimization.webp, supply-chain-transparency.webp *DL*, last-mile-delivery.webp *DL*, warehouse-management.webp *DL*, route-freight-planning.webp *DL*, data-security-compliance.webp *DL*, yard-management-cross-docking.webp *DL*, your-partner-digital-transformation.webp, discovery-icon.webp *DL*, sb-icon.webp *DL*, dm-icon.webp *DL*, developent-icon.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg …
- Visual (both, images, high): All large section illustrations (hero composite, Azure IoT Solutions, 360 visibility, strategic applications, digital transformation, scale CTA) fail to load, leaving big empty white/blue bands where LIVE shows rich graphics.
- Visual (both, structure, high): Awards & Recognition renders as an empty solid-blue band on clone; LIVE shows a row of award/certification badge logos.
- Visual (both, structure, high): 'Real Results. Real Impact.' case-study cards (Seville, Chivo) are empty bordered placeholder boxes on clone with no imagery or body copy; LIVE shows full case-study cards with logos and text.
- Visual (both, structure, med): Client-logo strip present on LIVE is absent on clone.
- Visual (both, structure, high): 'Fleet Optimization' / Strategic Applications tabbed-accordion content largely collapses to blank space on clone vs structured tab panels on LIVE.
- Visual (both, structure, med): 'Your Path to Azure Implementation' process-steps visual is missing/empty on clone.
- Visual (desktop, layout, high): Massive vertical white gaps between sections on clone where image-driven content collapsed, breaking the visual rhythm and spacing of LIVE.
- Visual (mobile, structure, high): Mobile clone is heavily truncated/short: lead form ('Schedule a 1 Call Setup' / contact form) and much lower content present on LIVE mobile is missing or empty on clone mobile.
- Visual (mobile, layout, high): Mobile clone sections stack as empty white blocks (missing illustrations and body content), so the page reads as mostly blank scroll regions vs content-dense LIVE.
- Visual (both, text, med): Hero CTA/body and 'Why Choose Folio3' / impact-stat copy that accompanies illustrations is sparse or missing on clone; numeric impact stats not rendered.

### `/ai-scenario-library/finance/`  — 32 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, use-cases-tab-detail-panel, fortune-500-section-image, achieve-with-copilot-feature-list, case-studies, lead-form, awards-certs-content
- Missing images: copilot-finance.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, risk-management-compliance.webp, planning-analysis.webp *DL*, procure-to-pay.webp *DL*, record-to-report.webp *DL*, day-in-the-life-of-a-finance-pro.webp *DL*, achieve-copliot.webp, eliminate-vulneraility-start-transformation.webp, azure-data-services-private-equity-firm.webp, automating-food-plan-management-saving-time-with-copilot.webp, azure-automate-data-reporting-for-slb-with-data-accuracy.webp, power-bi-dashboards-for-a-food-crop-grower-improving-yield-potential.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg …
- Visual (both, images, high): Hero on clone is plain blue gradient with text only; live shows large 3D isometric Copilot + dashboard illustration on the right.
- Visual (both, structure, high): Client-logo strip (Saviynt, CityU, Duroz, etc.) present on live below hero is entirely absent on clone.
- Visual (both, structure, high): 'Comprehensive Finance Use Cases' is an interactive tabbed panel on live (selected tab shows detail copy + imagery); clone renders 6 static cards with no detail/illustration.
- Visual (both, structure, high): '70% Of The Fortune 500...' section with screenshot is missing on clone, leaving large empty whitespace gap.
- Visual (both, structure, high): 'Achieve These With Copilot' feature list (Secured by Azure, Integrated with ERPs, Customized for Performance) with icons/illustration is missing on clone (empty gap).
- Visual (both, structure, high): 'Real Results, Real Impact' case-study cards (Azure Data Services, Automating Food Plan, Power BI Dashboards, etc.) with images are absent on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form (Name/Phone/Email/Message + Submit) on live is replaced; clone shows it only at mobile bottom, not in desktop layout matching live.
- Visual (both, text, med): Hero heading differs: live 'Using Copilot In Finance'; clone 'Folio3 Copilot Agents Library: Azure AI Solutions for Enterprise'. CTA text also differs.
- Visual (both, styling, med): 'Awards & Recognition' / office-info band on clone is a near-empty blue placeholder; live integrates awards + structured office details with content.
- Visual (both, text, low): Final CTA banner text differs: clone 'Ready to unlock the power of Azure?' vs live finance-specific results/CTA context.

### `/azure-data-analytics/agriculture-data-analytics/`  — 31 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, stats-band, services-cards, industries, awards-certs, feature-icons, scale-cta, lead-form
- Missing images: Frame-elementor-io-optimized.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, Frame-1000001875-elementor-io-optimized-1.webp *DL*, Harvest-Management-elementor-io-optimized.webp *DL*, Crop-Management-elementor-io-optimized-1.webp *DL*, Warehouse-Management_-elementor-io-optimized-1.webp *DL*, Supply-Chain-Management_-elementor-io-optimized-1.webp *DL*, Farm-Irrigation-Management_-elementor-io-optimized-2-1.webp *DL*, Farm-Resource-Management_-elementor-io-optimized-1.webp *DL*, Farm-Financial-Management_-elementor-io-optimized-2.webp *DL*, Frame-1410126031-elementor-io-optimized-1.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL* …
- Visual (both, images, high): Hero illustration: live shows a rich isometric smart-farming scene with floating icons; clone shows only a bare blue Azure 'A' logo on plain background. Header logo strip and brand colors differ (live has red Folio3 logo on white, clone has white-on-dark bar).
- Visual (both, structure, high): Client-logo strip (Bosch, Beck's, Dorel etc.) present on live below hero; absent on clone.
- Visual (both, structure, high): 'Why Does Your Agribusiness Need BI Reporting' section: live has 6 illustrated icon feature cards (Make informed decisions, Boost Efficiency, Demand Forecasting, Market Alignment, Enhance Crop Management, Financial Tracking); clone renders only 2 placeholder text items with no icons.
- Visual (both, images, high): 'Covering All Areas Of Your Farming Enterprise' band illustration/graphic missing on clone (empty white space).
- Visual (both, structure, high): 'What Our Agriculture Analytics Solution Offers' grid: live shows a multi-row grid of ~9 icon service cards; clone shows only sparse unstyled text with no icons/cards.
- Visual (both, structure, med): Awards & Recognition / certification badges section is empty placeholder on clone (badge images missing).
- Visual (both, structure, high): Lead/contact form ('Schedule a 1:1 Call Today'): live shows a styled form with input fields and Submit; clone shows no visible form fields in the CTA area.
- Visual (desktop, layout, high): Massive empty whitespace gaps on clone where illustrations/cards should be, making the page far taller in proportion of blank space and breaking visual rhythm.
- Visual (both, text, med): Scale CTA banner text differs: live 'Get Microsoft Fabric Implementation Services Today'; clone shows 'Ready to unlock the power of Azure?' (generic/wrong copy).
- Visual (mobile, styling, med): Mobile hero/header styling inverted vs live (dark bar with white logo vs live white header), and stacked feature cards collapse to plain text without icons, breaking card layout.

### `/microsoft-power-platform-services/`  — 30 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: services-cards (Our Microsoft Power Platform Services For Enterprise Agility), feature-cards (Equipped To Deliver Full Capabilities Of Power Platform), power-platform-tabs (Power Apps / Automate / BI / Pages, tabbed), integrate-ai-cta-band (Integrate Advanced AI Into Your Operations), essentials-section (The Essentials Of Power Platform For Enterprise Success), power-platform-in-action (SAP integration block), why-partner-folio3-cards, experts-inline-contact-form (Connect With Our Power Platform Experts), case-studies (Real Results, Real Impact), awards-certs (heading present but badges/logos empty), lead-form
- Missing images: low-code-no-code-empowerment-icon.svg, leveraging-generative-ai-icon.svg, robust-governance-securit-icon.svg, effortless-integration-icon.svg, fusion-development-icon.svg, sap.webp, business-app-enhancements.webp *DL*, process-mining-automation-migration.webp *DL*, sales-financial-reporting.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL* …
- Link "Talk to an Expert": clone `/contact-us` → live `#pgForm`
- Visual (both, structure, high): Clone renders only hero + 'Transforming Manual Workloads' 4-card grid, then large blank gaps where ~9 live content sections (services, capabilities, tabs, AI band, essentials, SAP-in-action, why-folio3, experts form, case studies) should be.
- Visual (both, images, high): Most section illustrations/screenshots are absent (incl. business-app-enhancements.webp), leaving big empty white bands; tab UI and SAP-in-action visuals missing entirely.
- Visual (both, text, high): All headings/body copy for the missing services, capabilities, tabs, essentials, why-folio3 and case-study sections are gone on clone.
- Visual (both, layout, med): 'Awards & Recognition' heading renders on clone but its badge/cert logo strip is empty (placeholder), unlike live.
- Visual (both, structure, high): Inline 'Connect With Our Power Platform Experts' lead/contact form section is missing on clone.
- Visual (both, layout, med): Scale CTA differs: clone shows generic 'Ready to unlock the power of Azure?' where live has a Power-Platform-specific scale banner; large vertical whitespace before footer.
- Visual (mobile, mobile, high): Mobile clone collapses to hero + one card grid then long empty scroll; live mobile has full stacked sequence of service/feature/tab/case-study sections — clone is largely blank.
- Visual (mobile, images, high): Hero illustration scales but downstream section images/icons fail to load on mobile clone, producing tall empty gaps.
- Visual (both, nav, low): Header/nav and footer match between clone and live; problem is body content, not chrome.

### `/ai-agents/ai-powered-ticketing-and-customer-service-agent/`  — 30 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logo-strip, intelligent-intake-triage-tabs, asset-management-copilot-feature, scale-cta-banner, why-choose-folio3, stats-band, real-results-real-impact, case-studies, process-steps, lead-form
- Missing images: zammad-copilot.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, intellient-intake-triage.webp, agent-assist-resolution.webp *DL*, secure-lifecycle-management.webp *DL*, proactive-intelligence-reporting.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL* …
- Visual (both, structure, high): Clone renders only ~4 of ~12 live sections. After the 'Why Your Service Desk' cards and the 365 Copilot promo, the clone jumps straight to an empty 'Awards & Recognition' band and footer, dropping the entire middle of the page.
- Visual (both, images, high): Hero illustration (laptop/Zammad copilot graphic) absent on clone; hero right column is blank vs the rich product illustration on live.
- Visual (both, images, high): Client/partner logo strip under the hero (Daraz, Savills, etc.) is entirely missing on the clone.
- Visual (both, structure, high): 'What Do You Get With Folio3 Zammad Copilot?' tabbed feature section (Intelligent Intake & Triage etc.) and the Asset Management Copilot feature block are missing/empty on the clone.
- Visual (both, structure, high): 'Real Results. Real Impact' stats/metrics band and case-study cards present on live are absent on the clone.
- Visual (both, structure, high): Final lead-capture form ('Schedule A 1-Call Today') rendered on live is missing on the clone; clone ends at footer with no form.
- Visual (both, text, med): Hero heading differs: live 'Transform Your Service Desk with Zammad Copilot' vs clone 'Zammad Ticketing Copilot: AI for Instant, Automated Service Resolution'.
- Visual (both, styling, med): Awards & Recognition section on clone is a large empty blue/white band with sparse text and no award/cert badges, whereas live shows populated content; appears as a placeholder.
- Visual (both, text, med): Scale/CTA banner copy differs: live 'Ready to Make Customer Service Hassle-Free?' vs clone generic 'Ready to unlock the power of Azure?' — wrong/un-themed CTA.
- Visual (mobile, layout, high): Mobile clone is far shorter than live (~14k vs live ~10.7k content density much lower) due to dropped sections; large blank vertical gaps between the few rendered blocks.

### `/ai-agents/it-asset-management-agent/`  — 30 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logo-strip, microsoft-365-copilot-ecosystem-section, what-you-get-feature-grid, struggling-to-track-cta, ready-to-end-manual-tracking-banner, why-choose-folio3, case-studies, scale-cta-banner, lead-form, awards-cert-badges
- Missing images: head-itasset-copilot.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, conversational-tracking-provisioning.webp, seamless-enterprise-integration.webp *DL*, advanced-asset-intelligence.webp *DL*, security-high-volume-scalability.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL* …
- Visual (both, text, high): Hero heading differs: LIVE 'Transform IT Asset Management with Folio3 ITAsset Copilot'; CLONE 'ITAsset Copilot: Your AI Agent for Conversational IT Asset Management'. Subhead/CTA copy also diverges.
- Visual (both, images, high): Hero illustration (head-itasset-copilot.webp) and the Microsoft 365 Copilot ecosystem graphic are absent on CLONE, leaving the hero/text-only.
- Visual (both, structure, high): Most mid-page sections missing on CLONE: Microsoft 365 Copilot ecosystem, 'What Do You Get' feature grid, 'Why Choose Folio3?', 'Real Results, Real Impact' case studies, and the 'Schedule a 1-on-1 Call' lead form. CLONE jumps from feature cards to Awards then footer.
- Visual (desktop, layout, high): CLONE has large empty whitespace bands where LIVE sections render, indicating empty/placeholder containers rather than rendered content.
- Visual (both, structure, med): 'Why You Need To Automate ITAM Now' shows only 3 feature cards on CLONE vs full multi-card grid on LIVE.
- Visual (both, structure, med): Client-logo strip (HP, Microsoft, etc.) present below hero on LIVE, absent on CLONE.
- Visual (both, images, med): Awards & Recognition shows certification badge images on LIVE but text-only list on CLONE (no badge graphics).
- Visual (both, text, med): Bottom CTA banner copy mismatched: LIVE 'Ready to End Manual IT Asset Tracking?' / scale CTA; CLONE generic 'Ready to unlock the power of Azure?'.
- Visual (both, structure, high): Lead form ('Schedule a 1-on-1 Call Today') with input fields present on LIVE, completely missing on CLONE.
- Visual (mobile, mobile, high): CLONE mobile is far shorter (page collapses to hero+3 cards+awards+footer); LIVE mobile stacks all sections. Header/hamburger renders but body content is largely missing.

### `/ai-agents/kubemonitor-agent/`  — 30 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logos, copilot-promo-band, feature-tabs-screenshot, it-asset-copilot-banner, why-choose-folio3, case-studies, stats-band, lead-form, scale-cta
- Missing images: kubernetes.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, conversational-monitoring-diagnostics.webp, deep-metrics-resource-observability.webp *DL*, seamless-integration-enterprise-readiness.webp *DL*, accelerated-incident-response-recovery.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL* …
- Visual (both, images, high): Hero right-side conversational Kubernetes illustration missing on clone; hero is text-only.
- Visual (both, structure, med): Client-logo strip (Databricks, Snowflake, etc.) directly under hero is absent on clone.
- Visual (desktop, structure, high): '70% of Fortune 500 / Microsoft 365 Copilot' promo band with Copilot graphic renders as a bare card on clone, missing the right-side product image.
- Visual (both, structure, high): 'What Do You Get With KubeMonitor AI Agent?' feature section with tab nav + product screenshot is entirely missing on the clone.
- Visual (both, structure, high): 'Why Choose Folio3?' section and the IT-asset-management Copilot banner are absent on clone (large blank gaps).
- Visual (both, structure, high): 'Real Results, Real Impact' case-study cards section missing on clone.
- Visual (both, structure, high): 'Schedule a 1 Call Today' lead-capture form (right-side form fields) missing on clone.
- Visual (both, structure, med): Clone shows 'Awards & Recognition' heading but with empty/placeholder content; live integrates awards/stats differently with populated data.
- Visual (both, text, med): Hero CTA differs: clone shows a single 'Speak to our experts' button; live has hero copy plus supporting subtext/badges.
- Visual (both, styling, med): Numerous empty white bands on clone where live has full-bleed colored sections and imagery, making the clone far shorter visually per section.

### `/ai-agents/smartexpense-agent/`  — 30 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, client-logos, feature-cards, microsoft-copilot-section-illustration, tabs-feature-section, process-steps, why-choose-cta, real-results-case-studies, metrics-cards, awards-cert-badges, lead-form
- Missing images: head-smartexpense-copilot.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, instant-chat-based-submission-ai-extraction.webp, automated-compliance-risk-reduction.webp *DL*, smart-accounting-one-click-approval.webp *DL*, accelerated-reimbursement-insight-generation.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL* …
- Visual (both, text, high): Hero heading differs: LIVE leads with 'Stop Managing Expenses. Start Leading Finance.'; CLONE leads with 'SmartExpense Copilot: Your AI Agent for Expense Management' as the primary H1.
- Visual (both, images, high): Hero illustration (head-smartexpense-copilot.webp) and adjacent product mockup absent on clone; hero is text-only on a flat gradient.
- Visual (both, structure, high): Stats band + client-logo strip (Deloitte/KPMG/Doxer/etc.) present below LIVE hero is entirely missing on clone.
- Visual (desktop, layout, high): Large blank whitespace gaps on clone where Microsoft 365 Copilot illustration, tabbed feature section, and 'Tired of Recurring Manual Tasks' CTA render on LIVE — sections collapsed to empty placeholders.
- Visual (both, structure, high): 'Real Results, Real Impact' case-study/metrics-cards section on LIVE is absent on clone.
- Visual (both, structure, med): 'Why Choose Folio3?' section missing/empty on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form present on LIVE not rendered on clone.
- Visual (both, images, med): 'Awards & Recognition' heading present on clone but badge/cert images empty; LIVE shows populated award badges.
- Visual (both, styling, med): Feature cards on clone are sparse/icon-less with thin borders; LIVE cards include colored icons and richer styling.
- Visual (mobile, layout, high): Clone mobile shows huge empty vertical gaps between Copilot block, Awards, and CTA banner due to missing imagery; stacking leaves large void regions LIVE does not have.
- Visual (both, nav, low): Header/nav differs: LIVE top shows full product nav + stats; clone header is minimal Folio3/Azure bar — overall chrome parity reduced.

### `/ai-powered-solutions/copilot-for-recruitment/`  — 30 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, client-logos, feature-cards-three-up, fortune-500-stat-section, what-do-you-get-tabs, ai-recruiter-takeover, ready-cta-banner, why-choose-folio3, real-results-case-studies, lead-form, schedule-call-form
- Missing images: agent-smarter-faster-recruitment.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, intelligent-sourcing-screening.webp *DL*, one-click-interview-management.webp *DL*, interview-insights-post-interview-intelligence.webp *DL*, seamless-offer-onboarding-transition.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL* …
- Visual (both, images, high): Hero illustration (agent/laptop graphic) missing on clone; hero is just a flat blue gradient band with text, no artwork.
- Visual (both, text, med): Hero heading differs: LIVE reads 'Your AI Agent for Smarter, Faster Recruitment'; CLONE reads 'Recruit Flow Copilot: Your AI Agent to Simplify Recruitment'.
- Visual (both, structure, high): Stats band (0%/0% animated metric tiles) under hero present on LIVE, entirely absent on clone.
- Visual (both, images, high): Client/partner logo strip (CityU, Beren, etc.) below hero on LIVE is missing on clone.
- Visual (both, structure, high): Large mid-page sections missing on clone: '70% of Fortune 500' stat block, 'What Do You Get' tabbed section, 'Tired of Admin Work' AI recruiter section, and 'Why Choose Folio3' all render as blank/empty white space.
- Visual (both, structure, high): 'Real Results, Real Impact' case-study cards on LIVE are mostly empty placeholders on clone (text-only, missing icons/illustrations and styling).
- Visual (both, structure, high): Lead/contact form ('Schedule a 1:1 Call Today') present and styled on LIVE; on clone it is missing/blank with no form fields rendered.
- Visual (both, layout, high): Clone has large stretches of empty white vertical space where image-driven sections failed to render, inflating page height with no content.
- Visual (both, styling, med): 'The AI Advantage' four feature cards render plain/borderless on clone vs the styled bordered icon cards on LIVE.
- Visual (mobile, nav, low): Both show hamburger header; parity OK, but clone hero CTA button and overall mobile content collapse into empty blocks below the fold.

### `/azure-for-healthcare/`  — 27 img, 2 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration (claims-processing-img / member-value illustration empty), tabs (Empowering Providers tab UI rendered as plain stacked accordion, not horizontal tabs), why-choose-folio3 checklist + award badges (large blank gap), awards-certs badges (Awards & Recognition band present but badge logos empty), case-studies heading/section styling (Savills & CityU cards present but surrounding heading/layout missing), faq (accordion replaced by walls of plain paragraph text), stats-band (0+ Projects/Global Employees/Companies Served/Awards counters absent), lead-form (Schedule a 1:1 Call Today form with Name/Phone/Email/Message absent), scale-cta (Ready to unlock the power of Azure banner mis-positioned vs live)
- Missing images: claims-processing-img.webp, data-management-analysis-img.webp *DL*, member-engagement-img.webp *DL*, digital-health-services-img.webp *DL*, fraud-detection-img.webp *DL*, cta-health-care.webp, Centralized-Patient-Data.webp, data-analytics-img-1.webp *DL*, telemedicine-img.webp *DL*, research-collab-img.webp *DL*, IoT-Remote-Monitoring.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg, power_platform_developers.svg, azure-network-engineer.svg, MB-900.svg …
- Link "Contact Us Now": clone `/contact-us` → live `#pgForm`
- Link "Talk to an Expert": clone `/contact-us` → live `#pgForm`
- Visual (both, structure, high): Lead form 'Schedule a 1:1 Call Today' (Full Name/Phone/Email/Message + Submit) is entirely missing on clone; page jumps from text walls to footer.
- Visual (both, structure, high): Stats band (0+ Projects Delivered, Global Employees, Companies Served, Global Awards Won) absent on clone.
- Visual (both, structure, high): FAQ accordion (8+ collapsible questions like 'Can Azure integrate with existing healthcare systems?') replaced by long blocks of unstyled body paragraphs.
- Visual (both, layout, high): 'Why Choose Folio3?' section renders as a huge empty white gap on clone — checklist and award badges/illustration not loaded.
- Visual (both, images, high): Member-value / Claims Processing illustration cards are blank placeholders; large empty regions inflate clone page height (~10528px vs live 9436px).
- Visual (both, layout, med): 'Empowering Providers To Elevate Patient Care' horizontal tab bar (Centralized Patient Data | Data Analytics & AI | Telemedicine | ...) rendered as a flat vertical stacked list on clone, losing tab interaction/layout.
- Visual (both, layout, med): 'Real Results, Real Impact' case-study section: Savills/CityU cards present but the section heading and styling/spacing differ; cards float without their framed band.
- Visual (both, styling, med): 'Awards & Recognition' blue band present but contains no badge logos — appears as an empty colored stripe.
- Visual (both, layout, low): 'Ready to unlock the power of Azure?' scale CTA banner appears in a different position/order on clone relative to live's flow.
- Visual (mobile, structure, high): Mobile clone also omits the lead form and stats band; ends on text walls + CTA + footer, so the conversion area is entirely lost on small screens.

### `/data-science-ai/microsoft-copilot-consulting/`  — 25 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-logo-strip (Slack/Notion/Asana/etc partner logos under hero), stats-band (empowering-challenges icon grid renders but several follow-ons collapse), services-cards (Our Comprehensive Microsoft Copilot Services grid), why-choose-folio3 (Why Choose Folio3 for Microsoft 365 Copilot bullet list + illustration), copilot-in-action (Microsoft Copilot in Action feature/icon grid), case-studies (Real Results Real Impact case study cards), lead-form (Schedule a Trial Today contact form)
- Missing images: microsoft-dynamics-365-copilot-ipad-screen.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, slb-1.webp, where-food-comes-from.webp, macbook-air.webp, folio3-microsoft-365-copilot-services.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL* …
- Link "Read More": clone `/city-university-azure` → live `/savills | /copilot-implementation-food-verification`
- Visual (both, structure, high): Clone collapses the middle of the page into large blank/empty white bands. Live 'Our Comprehensive Microsoft Copilot Services', 'Why Choose Folio3', and 'Microsoft Copilot in Action' card grids are entirely absent on the clone (placeholder empty space).
- Visual (both, images, high): Hero illustration on live is the layered Copilot product graphic; clone renders a different/partial blue abstract graphic and the copilot-ipad-screen.webp is missing, leaving empty boxes.
- Visual (desktop, layout, high): Live hero is a full-bleed two-column band with partner logo strip beneath; clone hero is taller, logo strip missing, and the 'Automate Your Business Workflows' block is pushed into a separate offset section rather than inline.
- Visual (both, text, high): Clone shows 'Awards & Recognition' as a near-empty section with empty bordered boxes; live awards/cert badge row content is not rendered.
- Visual (both, structure, high): Live 'Real Results, Real Impact' case-study cards are missing on clone (no card grid rendered).
- Visual (both, structure, high): Live ends with a 'Schedule a Trial Today' lead form; clone replaces it with a generic 'Ready to unlock the power of Azure?' CTA band and no form fields.
- Visual (both, nav, med): CTA/heading text mismatch: clone final CTA says 'Ready to unlock the power of Azure?' instead of the live Copilot-specific scale CTA, indicating wrong/templated section.
- Visual (mobile, mobile, high): Mobile clone has the same dropped sections producing tall empty white gaps; the page is far shorter than live and most stacked card sections never appear.
- Visual (both, styling, med): Section vertical rhythm differs: clone uses oversized empty padding where live has dense content blocks, so spacing/scale looks broken.
- Visual (both, nav, med): Read More links point to /savills (wrong destination) per deterministic scan; case-study CTAs are misrouted.

### `/microsoft-fabric-services/microsoft-fabric-migration/`  — 26 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, client-logo-strip, why-fabric-illustration, services-cards, applications-comparison-table, why-choose-folio3-feature-cards, case-studies, lead-form, stats-band
- Missing images: moving-data-analytics-workloads-analytics-platform.webp, ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, superior-farms-logo.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL*, AZ-140.svg *DL*, azure-stack-hub.svg *DL*, window-server-hybrid-administration.svg *DL* …
- Visual (both, images, high): Hero product illustration / 'all-in-one analytics platform' graphic missing or placeholder on clone; hero looks bare vs rich LIVE hero.
- Visual (desktop, structure, high): Client/partner logo strip (Domino's, etc.) present on LIVE directly under hero is absent on clone.
- Visual (both, structure, high): 'Awards & Recognition' section renders as an empty placeholder block on clone (no badges/content), whereas this section/illustration is filled on LIVE.
- Visual (both, structure, high): 'Microsoft Fabric Migration Applications for Enterprise Growth' comparison TABLE is missing on clone — only the heading renders, table body empty.
- Visual (both, structure, high): 'Our Comprehensive Microsoft Fabric Migration Services' card grid is entirely absent on clone.
- Visual (both, structure, high): 'Why Choose Folio3...' feature cards (icon cards row) missing on clone.
- Visual (both, structure, high): 'Real Results, Real Impact' case-studies section missing on clone.
- Visual (both, structure, high): Lead/contact form ('Schedule a 1-1 call') missing on clone; LIVE shows a full form with fields.
- Visual (both, layout, high): Large empty white gaps where collapsed/missing sections leave the clone with huge blank vertical space and a broken vertical rhythm.
- Visual (desktop, styling, med): Transformation 'challenges into advantages' cards lack icons/illustrations and proper 3-col styling on clone (appear as plain text vs styled icon cards on LIVE).

### `/azure-for-retail/`  — 24 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: major-challenges-checklist-image, 360-view-tabs-illustration, services-feature-cards, industries, awards-cert-badges, case-studies-cards, faq-accordion, why-choose-stats
- Missing images: 360-customer-data.webp, demand-forecasting-img.webp *DL*, supply-chain-optimization.webp *DL*, data-security-compliance-img.webp *DL*, big-data-analytics-img.webp *DL*, innovate-IOT-img.webp *DL*, Omni-channel-optimization-img.webp *DL*, AI-personalized-engines-img.webp *DL*, redefine-customer-img.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL* …
- Link "Talk to an Expert": clone `/contact-us` → live `#pgForm`
- Visual (both, images, high): 360-customer-data illustration and the dark teal 'Major Challenges' image are missing, leaving large empty white bands on the clone.
- Visual (desktop, structure, high): 'Powerful Solutions / 360 View of Customer Data' tabbed feature section is entirely absent on clone; live shows tabs + illustration.
- Visual (both, structure, high): Folio3 Approach / services feature cards render as empty placeholder rows on clone (text/icons missing).
- Visual (desktop, structure, high): Case-study cards (Shopify/Chef) appear as empty bordered boxes on clone vs image cards on live.
- Visual (both, structure, med): Awards & Recognization section header present but badge/cert content is empty placeholder on clone.
- Visual (desktop, structure, med): FAQ accordion missing on clone desktop; live shows expandable Q&A list above the lead form.
- Visual (both, layout, med): 'Why Leverage Azure Services for Retail' cards lack icons and have inconsistent spacing/alignment on clone.
- Visual (both, nav, med): Clone top nav/header bar is oversized and styled differently from live's compact header.
- Visual (both, styling, low): Scale CTA banner 'Ready to unlock the power of Azure?' is plain/unstyled on clone vs gradient styled on live.
- Visual (mobile, mobile, high): Clone mobile drops nearly all mid-page sections (challenges, 360 view, approach cards, results), producing long empty scroll regions and a much taller blank page.

### `/microsoft-fabric-services/`  — 25 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, product-screenshot (One Data Hub), powering-every-aspect tabs + screenshot, services-cards (What You Can Expect), features-benefits icon cards (blue band empty), industries/awards-cert badges, case-studies / stats teal cards (Real Results), lead-form (Schedule a Call)
- Missing images: microsoft-fabric-services-ipad-screen-mob.webp *DL*, microsoft-fabric-services-ipad-screen.webp, Frame-6992.svg, data-integration-management.webp, ds-icon-02.jpg *DL*, data-engineering-warehousing.webp *DL*, data-science-real-time-analytics.webp *DL*, business-intelligence-reporting.webp *DL*, Scale-Your-Business-with-.png, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL* …
- Visual (desktop, images, high): Hero right-side Fabric/iPad illustration and colorful workflow graphic are missing/blank on clone.
- Visual (desktop, images, high): 'One Data Hub' large product screenshot/video replaced by an unrelated map graphic; wrong asset.
- Visual (desktop, structure, high): 'Powering Every Aspect' tabbed panel (Data Integration & Management) with screenshot reduced to plain text/cards; tabs gone.
- Visual (desktop, structure, high): 'What You Can Expect' icon card grid absent on clone (no cards rendered).
- Visual (desktop, structure, high): Blue 'Microsoft Fabric - Features And Benefits' section is an empty blue band; its 6 icon cards are missing.
- Visual (desktop, structure, high): 'Real Results, Real Impact' teal case-study/stat cards missing; only headings remain.
- Visual (desktop, structure, high): 'Schedule a Call Today' lead form (right column) missing/placeholder on clone.
- Visual (both, layout, med): Clone page is far shorter/sparser; multi-column card rows collapse to text, large vertical whitespace where sections dropped.
- Visual (mobile, images, high): Mobile hero illustration present in some form but 'One Data Hub' screenshot again shows unrelated map; feature/services cards missing.
- Visual (mobile, structure, high): Mobile clone omits services cards, features band, FAQ accordion and lead form that LIVE stacks; content ends prematurely before footer.

### `/azure-for-manufacturing/`  — 24 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: services-tabs (Powerful Azure Solutions tabbed feature panel), tools-grid (Build Your Manufacturing 4.0 Practices 3-col icon grid), services-cards (Folio3 Approach 2x2 service cards), awards-certs (Awards & Recognition badge/logo content empty), case-studies (Savills/CityU cards are empty placeholders, no image/text), stats-band (0+ Projects/Employees/Awards counters), lead-form (Schedule a 1:1 Call Today form), faq-accordion (questions/headers missing, only answer text renders)
- Missing images: azure-manufacturing-cta-banner-img.webp, Remote-Manufacturing-Operations.webp, supply-chain-tab-img.webp *DL*, anomaly-detection-tab-img.webp *DL*, unified-datra-management-tab-img.webp *DL*, predictive-maintenance-tab-img.webp *DL*, demand-forecasting-tab-img.webp *DL*, data-security-tab-img.webp *DL*, smart-factory-tab-img.webp *DL*, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg *DL*, power_platform_developers.svg *DL*, azure-network-engineer.svg *DL*, MB-900.svg *DL*, AI-102.svg *DL*, DP-100.svg *DL* …
- Visual (desktop, structure, high): 'Powerful Azure Solutions' tabbed feature section (tabs + Remote Manufacturing panel) entirely missing; replaced by a huge blank white void after the blue Partner CTA.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form (Name/Phone/Email/Message + Submit) is completely absent on the clone — the page's main conversion element.
- Visual (both, structure, high): Case-study cards (Savills, CityU) render as empty placeholders — just floating pill labels, no background image or description text.
- Visual (both, structure, high): FAQ accordion broken: question headers, row styling and arrow icons are gone; only the answer paragraphs render as plain stacked text.
- Visual (both, structure, high): 'Build Your Manufacturing 4.0 Practices' tools grid and 'Folio3 Approach to Azure Services' card grid are missing/empty, leaving large blank gaps.
- Visual (both, images, med): Stats band (0+ Projects Delivered / Global Employees / Companies Served / Global Awards) and Awards & Recognition badge logos do not render.
- Visual (desktop, layout, med): 'Why Leverage Azure' uses a 4-icon horizontal row + Learn More button on live, but a 2x2 card grid with broken icons and no button on clone.
- Visual (both, text, med): Hero differs: live has two CTAs ('UNLEASH POTENTIAL' + 'LEARN MORE') and subtext about modernizing; clone has one CTA ('SPEAK TO OUR AZURE EXPERTS') and different body copy.
- Visual (both, styling, med): Clone ends with a 'Ready to unlock the power of Azure?' scale CTA banner that is not the live closing layout; vast empty whitespace gaps where sections failed to render.
- Visual (mobile, nav, low): Hamburger + logo header parity is OK, but body suffers the same missing sections, empty case-study cards and broken FAQ as desktop.

### `/data-warehousing-as-a-service/`  — 24 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, etl-pipeline-diagram, data-warehouse-solution-models-cards, proven-process-steps, benefits-list, core-functions-cards, industries, folio3-advantage-band, real-results-stats, case-studies-content, faq, lead-form-fields
- Missing images: ias-savills-logo.webp, ias-cityu-logo.webp, ias-daraz-logo.webp, ias-rff-logo.webp, data-warehouse-solution-header-img-1.webp, elt-pipeline-diagram-mobile-updated.webp *DL*, discovery-icon.webp *DL*, data-strategy-icon.webp *DL*, design-deploy-icon.webp *DL*, mobile-chat.svg, scaleability-icon.svg, monitor-sync-1-tabs.svg, cloud-dollar.svg, mobile-tick-hand.svg, arrow-gear-tick-icon.svg, f3-advantage-experience-img.webp *DL*, f3-advantage-expertise-img.webp *DL*, f3-advantage-customized-img.webp *DL*, f3-advantage-recognition-img.webp *DL*, How-to-Build-Custom-Dashboards-for-Effective-Data-Visualization.png …
- Visual (both, images, high): Hero right-side isometric data-warehouse illustration is present on live but missing/blank on clone hero.
- Visual (both, structure, high): 'Building Automated ETL/ELT Pipelines' section shows only heading + small logo strip on clone; the live diagram/illustration and surrounding content are absent, leaving a huge empty band.
- Visual (both, structure, high): 'Our Data Warehouse Solution Models' and 'Our Proven Process' sections are entirely missing on clone (rendered as blank whitespace).
- Visual (both, structure, high): 'Benefits Of A Cloud Data Warehouse' list/section absent on clone.
- Visual (both, structure, high): 'Core Functions' feature-card grid (6 cards w/ icons) missing on clone; replaced by empty space.
- Visual (both, structure, high): 'The Folio3 Advantage' blue band and 'Real Results, Real Impact' stats section missing/empty on clone.
- Visual (desktop, layout, high): Two case-study cards render as empty bordered placeholders (no thumbnail, title, or text) vs populated cards on live.
- Visual (both, structure, high): FAQ accordion ('Your Common Queries Are Resolved') and the lead/contact form on the right are missing on clone; only an empty band remains.
- Visual (both, layout, high): Page collapses into multiple tall blank whitespace regions causing massive scroll-length and vertical spacing mismatch vs live.
- Visual (mobile, nav, med): Clone mobile header shows full top bar; live mobile uses condensed/hamburger layout — nav parity differs and most stacked content sections below hero are empty.

### `/azure-for-construction/`  — 21 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: boost-efficiency-intro, enhanced-collaboration-feature-card, scale-your-business-cta-band, efficiency-security-innovation-feature-grid, why-leverage-services-feature-list, stats-band-numbers, section-illustrations
- Missing images: sec-4-2-elementor-io-optimized.webp, sec-4-1-elementor-io-optimized.webp *DL*, BIM-elementor-io-optimized.webp *DL*, sec-4-4-elementor-io-optimized.webp *DL*, sec-5-1-elementor-io-optimized.webp, azure_solution_architect.svg, azure_administration.svg, AZ-400-104-or-204-Azure-DevOps-Engineer-Expert.svg, azure_security_engineer.svg, data-analyst.svg, azure-data-engineer.svg, power_platform_developers.svg, azure-network-engineer.svg, MB-900.svg, AI-102.svg, DP-100.svg, AZ-140.svg, azure-stack-hub.svg, window-server-hybrid-administration.svg, mirosoft_certified_trainer.svg …
- Visual (both, images, high): Multiple section illustrations/icon images fail to load, leaving large blank white and light-blue bands through the page middle; ~1500px of empty whitespace on desktop where live has dense content.
- Visual (both, structure, high): Live 'Boost Efficiency, Cut Costs & Reduce Risks' section with 'Enhanced Collaboration' feature card is absent/collapsed on clone.
- Visual (both, structure, high): Live blue 'Scale Your Business With Our Azure Professional Services' CTA band is missing/empty on clone.
- Visual (both, structure, high): Live 'Efficiency, Security, And Innovation In Construction' multi-card feature grid (Scalability/IoT/Data-Driven/Enhanced Collaboration) is missing on clone.
- Visual (both, structure, high): Live second 'Why Leverage Azure Services' feature list (Consultation, Tailored Solutions, Rapid Migration, Continued Support) is absent on clone.
- Visual (desktop, layout, med): Clone page is taller (8644px vs live 7075px) due to empty placeholder bands, breaking vertical rhythm and section spacing.
- Visual (both, layout, med): Hero illustration partially renders but the composite construction-scene graphic differs from live; hero band proportions look off.
- Visual (both, images, med): 'Why Choose Folio3' stats band shows '0+' style numbers / icons missing on clone vs populated stat icons on live.
- Visual (mobile, mobile, high): Mobile clone drops the same mid-page sections, producing long blank scroll regions between 'Why Leverage' cards and 'Awards & Recognition'.
- Visual (mobile, structure, med): Mobile clone top shows a thin promo/announcement bar and reordered hero; 'Building Tomorrow, Today With Azure' hero heading present on live but clone hero starts differently.

### `/case-studies/popcorn-producer-intellifabric-dashboards/`  — 18 img, 0 links — visual: desktop=major-diff, mobile=totally-different
- Missing sections: hero-illustration, key-business-areas-cards, what-client-needed-feature-cards, intellifabric-single-source-illustration, key-features-tabs, impact-outcomes-two-column, schedule-call-lead-form, stats-band, client-logo-strip
- Missing images: weaver-popcorn-hybrids.webp, expense-analysis-icon.svg, income-balance-sheet-overview-icon.svg, profitability-metrics-icon.svg, liquidity-ratios-icon.svg, financial-performance-monitoring.webp, sales-performance-tracking-icon.svg *DL*, budet-comparison-icon.svg *DL*, detailed-analysis-icon.svg *DL*, sales-customer-insights.webp *DL*, inventory-valuation-icon.svg *DL*, cogs-tracking-icon.svg *DL*, inventory-cost-management.webp *DL*, wph-impact-outcomes.png *DL*, Scale-Your-Business-with-.png, daraz-client-bg.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero 3D popcorn/food illustration on the right is entirely missing on clone; hero right side is blank/cropped abstract image instead.
- Visual (both, structure, high): 'One Source of Truth, Powered by IntelliFabric' section with 3D database/node illustrations is absent on clone (large empty white band).
- Visual (both, structure, high): 'What The Client Needed' icon/feature-card grid present on live is collapsed to a few bare text cards on clone.
- Visual (both, structure, high): 'Key Features' tabbed section (Financial Performance Monitoring, Profitability, etc.) is missing/empty on clone.
- Visual (both, structure, high): 'Impact & Outcomes' two-column bulleted list is missing on clone; replaced by a sparse single block of plain text.
- Visual (both, layout, high): Clone has multiple tall empty white bands where live shows content sections, indicating failed image/section rendering throughout.
- Visual (both, structure, high): 'Schedule a 1-Call Today' lead-capture form (live, right column) is absent on the clone.
- Visual (mobile, structure, high): Mobile clone shows a completely different content order/block (Industry: United States, 'Farming and Seed Production', '10 employees' sidebar-style panel) not present on live mobile.
- Visual (mobile, text, med): Clone mobile footer CTA reads 'Ready to unlock the power of Azure?' whereas live shows the case-study 'Take a Seamless Cloud Ride With Us!' flow; content mismatch.
- Visual (both, styling, med): Clone collapses the rich blue-accented info bands and card styling into plain stacked text, losing the live page's section dividers, icons and spacing rhythm.

### `/services/`  — 18 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: benefits-services-cards-grid, our-process-steps, what-makes-us-best-faq, schedule-a-call-lead-form, stats-counter-band, hero-illustration
- Missing images: 1-Cloud-Strategy-n-Consulting.png, Azure-Application-Development.png, 3-DevOps-Automation.png, 4-Cloud-Migration.png, azure-banner-cloud-services.webp, Intersect.webp, step_one-2.svg *DL*, Choose-the-Services-thats-right-for-you.svg *DL*, Meet-with-your-new-Senior-Level-Expert.svg *DL*, Let-the-Cloud-Empower-you.svg *DL*, shutterstock_2161798435-1.png, Azure-Synapse.webp, Azure-AI-Machine-Learning1-1-2.webp, Azure-SQL-1.webp, Azure-Cognitive-Services-2.webp, Azure-Stack-Services.webp, Azure-Cognitive-Search.webp, Azure-Cognitive-Search1.webp
- Visual (both, structure, high): Clone only renders the hero + 'Discover Cloud Opportunities' card block, then collapses into huge empty whitespace. Live has 6+ full sections (Benefits 8-card image grid, Our Process steps, What Makes Us Best/FAQ, Schedule a Call form, stats band) that are entirely missing/empty on the clone.
- Visual (both, images, high): Benefits 'Azure Cloud Partner' section: live shows an 8-tile grid of image cards (Databricks, Synapse, AI & ML, SQL, etc.); on clone the heading appears as bare text with no cards and no images below it.
- Visual (both, structure, high): 'Our Process' blue step band (4 numbered steps) present on live, completely absent on clone.
- Visual (both, structure, high): FAQ accordion ('What Makes Us The Best Choice...') and the 'Schedule a 1:1 Call Today' lead form with fields are missing on the clone.
- Visual (both, structure, med): Stats counter band (Projects Delivered / Global Employees / Companies Served / Global Awards) missing on clone.
- Visual (desktop, layout, med): 'Discover Cloud Opportunities' block: live shows 4 plain placeholder pills/buttons; clone shows a 6-card description grid (2 rows x 3) with body copy — different content layout for the same section.
- Visual (both, images, med): Hero background illustration/animation appears partially loaded; hero heading text overlaps awkwardly and is harder to read on clone.
- Visual (both, styling, med): Clone ends with a 'Ready to unlock the power of Azure?' CTA banner that does not match the live page's 'Scale Your Cloud Journey' / form-driven ending; CTA copy and button differ.
- Visual (mobile, layout, high): Clone mobile is dominated by a tall blank region between the card block and footer (content sections failed to render), producing a near-empty page versus live's fully stacked sections.
- Visual (mobile, nav, low): Both show hamburger/condensed top bar; header parity is acceptable, but live mobile shows an 'SPEAK TO OUR AZURE EXPERTS' CTA bar that is absent on the clone header.

### `/azure-cloud-service/`  — 16 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: who-can-benefit-band, industries-strip (Media and entertainment), real-results-heading-and-case-study-images, case-studies-description-and-read-more-buttons, feature-tab-cards (Hybrid Setups / App Modernization / Replatform / Lift-and-Shift), feature-lists-illustrations (Disaster Recovery / Centralized Log Management), blog-cards-images (Learn More About Our Services), faq-section (Your Common Queries Are Resolved), lead-form (Schedule a 1:1 Call Today / #pgForm)
- Missing images: azure-banner-cloud-services-mob.webp *DL*, 1-Cloud-Strategy-n-Consulting.png, Azure-Application-Development.png, 3-DevOps-Automation.png, 4-Cloud-Migration.png, Consulting-Services-2.webp, Application-Development.webp, DevOps-Automation-as-Service.webp, Cloud-Migration.webp *DL*, Financial-services.webp, Healthcare-and-Life-Sciences.webp, Manufacturing.webp, x835687_Businessman_with_cloud_computing_diagram_show_on_hand.__8495534b-061d-445d-932b-2c41b2e34c38.png *DL*, x835687_Cloud_computing_technology_concept._Futuristic_illustra_a1177465-92c5-40e8-a63c-de692350ddd5.png *DL*, Azure-Cognitive-Search.webp, azure-banner-cloud.webp *DL*
- Link "Speak to Our Azure Experts": clone `/contact-us` → live `#pgForm`
- Visual (both, structure, high): Entire FAQ section ('Your Common Queries Are Resolved', 5 accordion questions) and the 'Schedule a 1:1 Call Today' lead form (#pgForm target) are absent on clone; page jumps from Learn More straight to office/CTA.
- Visual (both, structure, high): 'Real Results, Real Impact' heading + 'See How Our Customers Succeed' subhead are missing on clone; only two empty placeholder case-study cards (Savills, CityU) render with no image, body copy, or READ MORE button.
- Visual (both, images, high): 'Learn More About Our Services' renders as 3 plain text paragraphs on clone instead of 3 blog cards with thumbnail images, category labels (CLOUD SERVICES / AZURE PROFESSIONAL SERVICES / CLOUD MIGRATION) and titles.
- Visual (both, structure, high): 'Who Can Benefit From Azure Cloud Professional Services?' band and the 'Media and entertainment' industries strip present on live are missing/blank on clone, leaving large empty white gaps.
- Visual (both, images, high): Feature/tab cards (Hybrid Setups, Application Modernization, Replatform, Lift-and-Shift) and feature-list icon rows (Disaster Recovery, Centralized Log Management, Continuous Process & Integration) and their illustrations are missing, leaving wide blank areas mid-page.
- Visual (desktop, layout, med): Massive vertical whitespace voids on clone where live has populated sections; clone total height ~10951px vs live ~12849px despite live having denser content, confirming dropped content blocks.
- Visual (both, text, med): Case-study cards on clone show only a small label chip (Savills/CityU) with no descriptive text; live shows full client description and a teal READ MORE button.
- Visual (both, styling, low): DISCOVER ALL button styled bright royal-blue on clone vs dark navy on live; case-study card background light-grey placeholders on clone vs blue filled cards with content on live.
- Visual (mobile, mobile, high): Mobile clone drops the same FAQ + lead form + blog cards; mobile live is much taller (~18614px) and content-rich while clone (~17483px) is padded with empty placeholders, so stacking order diverges in lower half.
- Visual (mobile, images, med): Mobile hero banner illustration and the dedicated mobile banner image (azure-banner-cloud-services-mob) and section illustrations do not render on clone, leaving flat blue/empty blocks.

### `/case-studies/agentic-hr-policy-feedback-update-and-reporting-solution/`  — 17 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, challenge-section, services-cards, core-technologies-logos, end-to-end-workflow, self-help-agent-feature, impact-outcomes, lead-form
- Missing images: agentic-hr-policy-feedback-update-reporting-solution.webp, microsoft-copilot-studio-icon.svg, power-automate-icon.svg, sharepoint-icon.svg *DL*, excel-sharepoint-hosted-icon.svg, copilot-powerpoint-icon.svg *DL*, self-help-hr-poliy-agent.webp, guided-feedback-collection.webp *DL*, automated-feedback-capture.webp *DL*, feedback-analysis-insights.webp *DL*, human-in-the-loop-approvals-policy-updates.webp *DL*, reporting-communication.webp *DL*, impact-outcomes.webp *DL*, Scale-Your-Business-with-.png, buildings.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero illustration (3D phone/agentic graphic on right of hero) missing on clone; live shows blue tech illustration, clone hero right side is plain.
- Visual (both, structure, high): Stats band absent on clone. Live shows three big metric tiles (60% reduction, 70% faster, 95% workflow automation); clone shows only plain text cards with no large percentage figures.
- Visual (both, structure, high): 'The Challenge' / Fragmented HR Policy section missing on clone.
- Visual (both, structure, high): 'What The Company Needed' services/feature cards (4-icon grid) absent on clone.
- Visual (both, images, high): 'Core Technologies Used' logo grid (Microsoft Copilot, Power Automate, SharePoint, Excel/PowerApps) missing on clone.
- Visual (both, structure, high): 'End-To-End Agentic Workflow' and 'Self-Help HR Policy Agent' feature sections absent on clone.
- Visual (both, structure, high): 'Impact & Outcomes' bulleted results section missing on clone.
- Visual (both, structure, high): Clone collapses to a large empty blue/white void between client cards and the CTA banner; ~70% of page body content is missing or unrendered.
- Visual (desktop, styling, med): Clone CTA banner text differs ('Ready to modernize HR policy management with agentic AI?' vs live 'Ready to unlock the power of Azure?'); two competing CTA banners stacked, inconsistent with live.
- Visual (mobile, layout, high): Mobile clone shows huge blank scroll region; lead form ('Schedule a 1:1 Call') present on live mobile is missing on clone, leaving only footer office addresses.

### `/azure-managed-services/`  — 16 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, here-is-what-we-have-photo, csp-logo-card, services-cards-images, case-study-content, faq-illustration, lead-form
- Missing images: Azure-Managed-Services-2.webp *DL*, 5-Holistic-Support.png, 6-Advisory.png, 7-Advanced-Support.png, 8-Security-Managment.png, Break-Fix-Support.webp, Advisory.webp, Advanced-Support.webp, security_management.webp, csp-ms-logo.webp, Financial-Services-1.webp, Manufacturing-and-Supply-Chain.webp, Media-and-entertainment.webp *DL*, The-Ultimate-Guide-to-Leveraging-Microsoft-Azure-for-Enhanced-Asset-Management.png, The-Role-of-Data-Integration-in-Building-an-Effective-Enterprise-Data-Architecture.png, Azure-Blog-Images-850-×-560-px-2.png
- Visual (both, images, high): Hero Azure illustration (Azure-Managed-Services-2.webp) missing on clone; hero right column is blank, leaving a lopsided header.
- Visual (desktop, images, high): Large right-side photo/illustration in the 'Here is What We Have Got In The Azure Managed Services' section is absent on clone, collapsing it to a text-only column.
- Visual (both, images, high): 'Work With Top Microsoft CSP Experts' csp-ms-logo.webp and its logo card are missing; section renders as plain text/empty card.
- Visual (desktop, structure, high): Multiple mid-page sections (case study / services content) render as large empty white gaps on clone, breaking vertical rhythm.
- Visual (desktop, images, med): 'Learn More About Our Services' 3-column cards lose their thumbnail images on clone, leaving bare text cards.
- Visual (desktop, images, med): FAQ 'Your Common Queries Are Resolved' supporting illustration missing on clone.
- Visual (desktop, structure, high): Bottom lead form / 'Schedule a 1:1 call' block present on live appears absent/empty on clone before footer.
- Visual (mobile, layout, high): Clone mobile reorders/omits sections: the early feature list and CSP block stack differently and large blank regions appear where images should be.
- Visual (mobile, images, med): Mobile stats band and service cards lack imagery; CTA banner area shows empty white space instead of content.
- Visual (both, styling, low): Overall page height/spacing diverges (clone ~18432 vs live ~17944 mobile) due to collapsed image blocks and inconsistent section padding.

### `/`  — 15 img, 0 links — visual: desktop=minor-diff, mobile=minor-diff
- Missing sections: industries-cards (live renders tall full-bleed per-industry image tiles e.g. 'Financial Service'; clone substitutes a 4-up photo card carousel - layout differs, not missing), lead-form-message-field (live form has a Message textarea; clone form omits it)
- Missing images: Modernize-Legacy-Applications.svg, Automate-Manual-Processes.svg, Power-Virtual-Agents.png, Automate-Integrate-Business-Processes-2.svg, azure-Microsoft-Power-Platform.webp, Data-Storage-and-Management.png, Data-Integration-and-ETL.png, Data-Analysis-and-Visualization.png, Governance-Security-and-Compliance.png, azure_data_analytics.webp, 5-Holistic-Support.png, 6-Advisory.png, 7-Advanced-Support.png, 8-Security-Managment.png, azure-managed-services-3.webp
- Visual (both, text, low): Hero/results stat counters show real values on clone (500+, 20+, 50+, 7+) but '0+' on live (live captured mid count-up animation). Cosmetic, not a clone defect.
- Visual (desktop, layout, med): Our Industries: live shows large full-width per-industry image tiles (e.g. 'Financial Service' band) with several missing images leaving blank space; clone shows a compact 4-card photo carousel (Media & Entertainment / Manufacturing / Healthcare / Retail) with dot pagination. Different presentation of same section.
- Visual (both, images, med): Several mid-page illustrations/feature graphics are placeholder/empty on clone (known missing SVally/webp assets), e.g. services-tab illustration is lighter and some feature-card icons blank.
- Visual (desktop, structure, low): Total page height ~17% shorter on clone (10750px vs 12971px), driven mainly by the more compact industries treatment and absent tall image tiles.
- Visual (both, layout, med): Lead form ('Schedule a 1:1 Call'): clone uses a faint world-map background + 2-column fields (Full Name/Last Name, Phone/Company) and no Message textarea; live uses simpler single-flow fields with Full Name, Phone, Email, Message.
- Visual (both, text, low): FAQ first item is expanded (answer text visible) on clone but collapsed on live - default-open state differs.
- Visual (mobile, nav, low): Mobile header collapses to hamburger on both; parity OK. CTA button ('GET IN TOUCH') present on both.
- Visual (mobile, layout, low): Sections stack cleanly on both with no overflow or cut-off content; awards badge strip and partner-designation cards stack vertically on both.

### `/testimonials/`  — 14 img, 0 links — visual: desktop=totally-different, mobile=totally-different
- Missing sections: hero-illustration, stats-band, awards-certifications-band, testimonial-arc-illustration, client-testimonial-cards, what-makes-us-best-faq-accordion, process-management-illustration, financial-service-cta, awards-recognition-badges, stats-counters, lead-form
- Missing images: azure-banner-Mobile-home_updated.webp, azure_administration.svg, azure_security_engineer.svg, azure_solution_architect.svg, mirosoft_certified_trainer.svg, testimonial_arc.webp, gj_garner.png, faq_placeholder.webp, media-img-updated.webp, Manufacturing-1.webp, Healthcare-1.webp, retail-1.webp, Financial-services.webp, Support-and-Management.png
- Visual (both, structure, high): Clone renders a completely different page. Live is the Testimonials page (hero 'Unlock the Power of Cloud: Build, Run & Manage Applications with Azure', stats band, awards & recognition band, 'Over 10,000 Plus Happy Retained Clients' testimonial arc, FAQ accordion, process illustration, lead form). Clone shows an About-Us-style page ('Transform Your Business With Azure Cloud Services' hero, 'Discover the essence of who we are').
- Visual (both, text, high): Hero headline and CTA differ entirely: live 'Unlock the Power of Cloud...' with 'SCHEDULE A FREE CONSULTATION'; clone 'Transform Your Business With Azure Cloud Services' with 'SPEAK TO OUR AZURE EXPERTS'.
- Visual (both, structure, high): Live stats band (0% / 0+ counters: User Satisfaction, Our Clients, Google Reviews, API Integration) is absent on the clone.
- Visual (both, images, high): Live 'Over 10,000 Plus Happy Retained Clients' testimonial section with arc illustration and client quote cards (testimonial_arc.webp, gj_garner.png etc.) is entirely missing on clone.
- Visual (both, structure, high): Live 'What Makes Us The Best Choice For Azure Cloud Service Providers?' FAQ accordion (Azure Power Platform?, Application Modernization?) is absent on clone.
- Visual (both, structure, high): Live 'Awards & Recognition' badge band and the large process-management illustration are missing on clone; clone instead shows generic image cards and a 'Ready to Work with The Ultimate Azure Experts' band.
- Visual (both, structure, high): Lead form differs: live has 'Schedule a 1:1 Call Today' form (Full Name, Phone, Email, Message, SUBMIT) plus stats counters; clone has no lead form, only a contact-office address grid.
- Visual (both, nav, med): Scale CTA banner copy differs: live 'Ready to unlock the power of Azure?' appears within stats context; clone ends with 'Ready to unlock the power of Azure?' / 'TALK TO AN EXPERT' but overall page body is unrelated.
- Visual (mobile, mobile, high): Both have hamburger nav, but clone mobile page content is the wrong page; testimonial arc, FAQ, and lead form sections that live shows are entirely absent on clone mobile.
- Visual (desktop, layout, high): Live page is content-dense (stats, testimonials, FAQ, process illustration, form) with a tall layout; clone is sparse with large empty whitespace gaps between a few image cards, indicating missing sections rather than a parity layout.

### `/case-studies/`  — 12 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: case-studies-grid (entire 'All Customer Stories' card listing, ~13 cards), hero-illustration, stats-band (0+ projects/clients metrics row), lead-form (Schedule 1:1 Call form fields + submit)
- Missing images: hr-policy.webp, real-estate-1.webp, weaver-popcorn-hybrids-1.webp, azure-data-services-private-equity-firm.webp, automating-food-plan-management-saving-time-with-copilot.webp, azure-automate-data-reporting-for-slb-with-data-accuracy.webp, power-bi-dashboards-for-a-food-crop-grower-improving-yield-potential.webp, alibaba-achieves-faster-financial-closings-with-power-bi-reporting.webp, microsoft-fabric-reporting-boosting-operational-effiency.webp, power-apps-solution-for-city-university.webp, microsoft-fabric-services-for-a-cattle-feeding-company-to-maximize-animal-well-being.webp, Scale-Your-Business-with-.png
- Visual (both, structure, high): Clone is entirely missing the main 'All Customer Stories' case-study card grid (~13 cards with image/tags/title/desc/READ MORE) that is the core of the live page. The page has almost no real content.
- Visual (both, structure, high): Clone injects sections absent on live: a 'Schedule a 1:1 Call' world-map block, an office-addresses contacts band, and a 'Ready to unlock the power of Azure?' CTA. Live has none of these on this route.
- Visual (both, text, med): Hero heading differs: live reads 'Client Success Stories' with eyebrow 'CASE STUDIES'; clone reads 'Client Case Studies | Folio3'. Subtext and CTA also differ (live has no visible hero CTA, clone shows 'SPEAK TO OUR AZURE EXPERTS').
- Visual (both, nav, med): Header differs: clone shows full nav (Services/Solutions/Industry/Resources/Contact us) with phone + GET IN TOUCH; live header is a slim bar without the visible mega-nav. Branding/layout mismatch.
- Visual (both, layout, high): Live uses a 2-column responsive card grid for case studies (desktop); clone has no grid at all, so column-count/layout parity is impossible to match.
- Visual (both, structure, med): Live's 'Take A Seamless Cloud Ride' CTA includes an adjacent stats band (project/client counters) and a lead form; clone shows the CTA banner but omits the stats counters and the form.
- Visual (both, images, low): Clone hero shows a generic circuit/abstract image; live hero is a layered blue success-stories illustration. Hero visual does not match.
- Visual (mobile, mobile, high): Mobile clone collapses to hero + map + addresses + CTA + footer only; the long scrollable stack of case-study cards present on live mobile is entirely absent, making the page far shorter and content-empty.
- Visual (mobile, nav, med): Mobile hamburger present on both, but clone's mobile content below hero diverges completely (map/contacts vs card list), so mobile parity fails beyond the menu.

### `/automated-data-reporting/`  — 11 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, the-problem-section, services-cards, process-steps, technologies-band, client-info-stats, lead-form
- Missing images: wfcf-header-graphic.webp, wfcf-our-process.webp, azure-storage-account.webp, ms-fabric-data-pipelines.svg, ms-fabric-lakehouse.svg, power-bi.svg *DL*, ms-fabric-notebooks.svg *DL*, ms-fabric-deployment-pipelines.svg, seamless-cloud-ride-with-us.webp *DL*, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero isometric cloud/Power BI illustration absent on clone; replaced with empty light-blue/wave background. Hero feels empty.
- Visual (both, structure, high): 'The Customer' stats band (Colorado USA / Food and Beverage / 51-100 Employees with icons) missing on clone; only the 'The Customer' heading + 3 plain text cards remain, no icons.
- Visual (both, structure, high): Entire 'The Problem' section (icon list of pain points) is absent on clone.
- Visual (both, structure, high): 'What Solution Did We Propose' section with 3D numbered blue service/feature cards missing entirely on clone.
- Visual (both, structure, high): 'Our Process' process-steps section missing on clone.
- Visual (both, structure, high): 'Technologies Involved In This Case' band (blue panel with tech labels) missing on clone.
- Visual (both, layout, high): Clone has large empty white gaps where multiple sections were dropped, leaving big blank vertical spacing.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form (name/email/message inputs + submit) missing on clone; only present on live.
- Visual (both, text, med): Bottom CTA banner text differs: live 'Take A Seamless Cloud Ride With Us!'; clone shows a second/different 'Ready to unlock the power of Azure?' banner and reorders the seamless-cloud CTA higher.
- Visual (both, layout, med): Client contact/stats blocks render as bare unstyled text rows on clone (no icons/columns), versus styled stat counters with icons on live.
- Visual (desktop, styling, med): Hero heading wraps/sizes differently and CTA buttons differ (clone single dark button vs live two buttons) at desktop width.

### `/blog/author/danishsaudfolio3-com/`  — 11 img, 0 links
- Missing images: The-Ultimate-Guide-to-Leveraging-Logistics-Dashboards-for-Enhanced-Supply-Chain-Efficiency.png, Advanced-Supply-Chain-Dashboards-for-Real-Time-Visibility.png, How-to-Build-Custom-Dashboards-for-Effective-Data-Visualization.png, What-is-Microsoft-Fabric-Features-Benefits-Use-cases.png, The-Ultimate-Guide-to-Leveraging-Microsoft-Azure-for-Enhanced-Asset-Management.png, A-Checklist-for-Choosing-the-Right-Business-Dashboard-Software-for-Your-Needs.png, The-Role-of-Data-Integration-in-Building-an-Effective-Enterprise-Data-Architecture.png, microsoft-fabric-data-analytics.png *DL*, Top-10-Dashboard-Software-For-Effective-Visualization-in-2024.png, Microsoft-Fabric-Features-Capabilities-and-Strategic-Insights.png *DL*, azure-offices-map-img.webp

### `/blog/category/blogs/`  — 11 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg, microsoft-365-copilot-features.jpg, managing-hybrid-cloud-with-azure-arc.jpg, data-analytics-trends.jpg, strategies-for-financial-data-security.jpg, power-bi-vs-qlik.jpg, copilot-for-finance.jpg, azure-synapse-power-bi.jpg, azure-offices-map-img.webp

### `/blog/category/data-analytics/`  — 11 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg, business-intelligence-vs-business-analytics.jpg, ai-data-governance.png, 54.png, The-Ultimate-Guide-to-Leveraging-Logistics-Dashboards-for-Enhanced-Supply-Chain-Efficiency.png, Advanced-Supply-Chain-Dashboards-for-Real-Time-Visibility.png, How-to-Build-Custom-Dashboards-for-Effective-Data-Visualization.png, A-Checklist-for-Choosing-the-Right-Business-Dashboard-Software-for-Your-Needs.png, azure-offices-map-img.webp

### `/blog/category/data-integration-and-etl/`  — 11 img, 0 links
- Missing images: The-Role-of-Data-Integration-in-Building-an-Effective-Enterprise-Data-Architecture.png, Azure-Blog-Images-850-%C3%97-560-px-6.png *DL*, Azure-Blog-Images-850-×-560-px-6.png, top-5-data-cleansing-tools.png, Azure-Data-Factory-vs.-Databricks-2023_-Key-Differences.jpg, Azure-Blog-Images-850-×-560-px-2.png, top-10-data-integration-tools.png *DL*, Azure-Data-Factory-vs.-Competitors-Choosing-the-Best-ETL-Tool-in-2023.png, Azure-Blog-Images-850-×-560-px-1.png *DL*, Data-Warehouse-Modernization-with-Azure.png, azure-offices-map-img.webp

### `/blog/category/microsoft-fabric/`  — 11 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg, azure-fabric-features.jpg, components-of-data-fabric-architecture.jpg, what-is-data-fabric-architecture.jpg, components-of-microsoft-fabric-architecture.jpg, microsoft-fabric-lakehouse-vs-warehouse.jpg, fabric-data-factory.jpg, microsoft-fabric-cost-optimization.jpg *DL*, azure-offices-map-img.webp

### `/blog/category/product-dashboards/`  — 11 img, 0 links
- Missing images: powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg, ecommerce-dashboard.jpg, store-performance-dashboard.jpg, inventory-dashboard.jpg, sales-performance-dashboards.jpg, power-bi-dashboard-vs-report.jpg, The-Ultimate-Guide-to-Leveraging-Logistics-Dashboards-for-Enhanced-Supply-Chain-Efficiency.png, Advanced-Supply-Chain-Dashboards-for-Real-Time-Visibility.png, How-to-Build-Custom-Dashboards-for-Effective-Data-Visualization.png, azure-offices-map-img.webp

### `/azure-automated-data-reporting-for-slb/`  — 10 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, process-steps, services-cards, industries, scale-cta-illustration, client-logo
- Missing images: automatic-data-reporting.webp, slb.webp, order-details-screen.webp *DL*, product-health-screen.webp *DL*, sales-category-product.webp *DL*, sales-distribution-1.webp *DL*, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png, azure-banner-cloud.webp *DL*
- Visual (both, images, high): Hero isometric 3D illustration (automatic-data-reporting.webp) missing on clone; hero right side is empty/abstract, breaking the 2-column hero balance.
- Visual (desktop, structure, high): Clone collapses content vertically with large empty gaps - the 'End-To-End Automated Data Reporting Platform' process-step diagram (3 blue cylinder/arrow nodes) is absent, leaving big white voids.
- Visual (both, images, high): 'About the Client / SLB - Formerly Schlumberger' section: blue SLB logo card and industry icons (Houston, Oil & Energy, Large Enterprise) missing/placeholder on clone.
- Visual (desktop, structure, high): 'Energy/Oil & Gas Dashboards & Reporting Suite' tabbed section and 'Business Outcomes' 3-card band render empty/placeholder on clone vs populated on live.
- Visual (both, images, med): Stats band (0+ Projects Delivered, 0+ Global Employees etc.) shows zeros/placeholders on clone; live shows the metric strip styled above the footer.
- Visual (mobile, text, med): Clone mobile hero CTA shows a single button ('EXPLORE AZURE APPS'?) while live shows two stacked CTAs; hero heading wraps differently.
- Visual (mobile, layout, high): Clone mobile has large blank vertical regions where the platform diagram, suite tabs, business-outcomes cards and stats should stack; content effectively cut/empty.
- Visual (both, styling, med): 'Take a Seamless Cloud Ride With Us!' blue CTA banner lacks its illustration/graphic on clone; appears as plain blue block.
- Visual (desktop, structure, high): Lead form ('Schedule a 1:1 Call Today') present on live above footer is missing on clone desktop (clone jumps from CTA banner to footer).
- Visual (both, text, low): Clone footer CTA reads 'Ready to unlock the power of Azure?' which is an extra/duplicate generic banner not matching live's page-specific final section ordering.

### `/copilot-implementation-food-verification/`  — 10 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, about-client-illustration, solution-node-diagram, technologies-stack-band, business-outcomes-cards, stats-band, lead-form
- Missing images: Time-with-Copilot.webp, Azure-Storage-Account.svg, MS-Fabric-Data-Pipelines.svg, MS-Fabric-Lakehouse.svg, Power-BI.svg *DL*, Azure-Service-Principal.svg, Azure-Function-App.svg, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero 3D food/dashboard illustration absent on clone; hero background is light/blank vs LIVE blue gradient with rich illustration.
- Visual (both, structure, high): 'Integrated AI-Powered Solution' circular node diagram (6 feature icon nodes) entirely missing on clone, leaving a large blank white gap.
- Visual (both, structure, high): 'Technologies Stack Implemented' blue band with tech logos is missing/blank on clone.
- Visual (both, structure, high): 'Business Outcomes' icon-card row missing on clone.
- Visual (both, structure, med): Stats/counter band (0+ metrics) under the 'Seamless Cloud Ride' CTA is absent on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form missing; clone shows a generic 'Ready to unlock the power of Azure?' CTA instead, with no form fields.
- Visual (both, images, med): About-the-Client section illustration missing on clone (text-only placeholder cards).
- Visual (both, layout, med): 'Challenges Faced' cards render empty/placeholder on clone vs populated text + sidebar list on LIVE.
- Visual (both, layout, high): Numerous tall blank white gaps where missing sections were dropped, breaking vertical rhythm/spacing vs LIVE.
- Visual (mobile, text, med): Hero heading text color/contrast differs (dark on light vs white on blue) and missing illustration makes mobile hero look broken.

### `/microsoft-fabric-reporting-for-real-estate/`  — 10 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, about-client-sidebar-logo, stats-band, services-feature-cards, data-consolidation-icon-grid, technologies-stack, business-outcomes-cards, client-logo-savills, lead-form, footer-content
- Missing images: Microsoft-Fabric-Reporting-Boosts-Real.webp, savills-reb6f7dtiyiw5ofu4vsmvdys4xzyvzp2ffgjjasafk.webp, MS-Fabric-Medallion-Architecture.svg, MS-Fabric-Data-Pipelines.svg, MS-Fabric-Lakehouse.svg, MS-Fabric-Notebooks.svg, Scale-Your-Business-with-.png, About-The-Client_.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero illustration/isometric graphic absent on clone; live shows a rich blue isometric scene, clone hero is a flat plain blue gradient with no artwork.
- Visual (both, structure, high): 'About the Client / Savills' section is largely empty on clone - the live shows body copy, the large yellow Savills logo bubble, and left nav rail; clone shows only the heading and 3 empty placeholder cards.
- Visual (both, structure, high): Stats band (e.g. '13% efficiency' metrics row) and the entire 'Data Fragmentation & Inconsistent Reporting' icon/feature grid are missing on clone - replaced by huge blank whitespace.
- Visual (both, structure, high): 'Real Estate Data Consolidation And Reporting Using Microsoft Fabric' feature-card grid (multiple blue circular-icon cards) is entirely absent on the clone.
- Visual (both, structure, high): 'Technologies Stack Implemented For WFCF' dark band with sub-cards is missing on clone.
- Visual (both, structure, high): 'Business Outcomes' 3-card icon section present on live is absent on clone (replaced by blank space).
- Visual (both, structure, high): Lead-form / 'Schedule A 1:1 Call Today' contact form panel next to the 'Take A Seamless Cloud Ride' CTA is missing on the clone.
- Visual (desktop, layout, high): Clone collapses ~10 content sections into empty whitespace, leaving only hero, empty Savills row, blue CTA, and footer - vertical rhythm and section count do not match live.
- Visual (mobile, images, high): Mobile hero missing the isometric illustration and the yellow Savills logo badge that anchor the live mobile hero; placeholder cards stack as empty boxes.
- Visual (mobile, styling, med): Clone heading uses solid white/blue text but loses the colored accent and the bright Savills branding; large empty regions break the mobile flow vs live's dense stacked sections.

### `/case-studies/microsoft-copilot-studio-based-hr-policy-agent/`  — 9 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, stats-band, 5-step-solution-flow, key-features-cards, business-impact-outcomes-stats, scale-cta-illustration, lead-form
- Missing images: automates-hr-operations-microsoft-studio-copilot.webp, increase-hr-productivity-icon.svg *DL*, instant-response-times-icon.svg *DL*, self-service-analytics-icon.svg *DL*, enhanced-compliance-icon.svg *DL*, Scale-Your-Business-with-.png, buildings.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): All section illustrations missing on clone: hero isometric laptop/HR graphic, 5-Step Solution Flow node diagram, Key Features icons, Business Impact stat icons, and CTA banner art are all blank/absent.
- Visual (both, structure, high): 'The 5-Step Solution Flow' section entirely absent on clone (live shows 5 connected process nodes with captions).
- Visual (both, structure, high): 'Key Features' card grid absent on clone (live has 6 feature cards: 24/7 AI-Powered Self-Service, Error-Security Guardrails, NLP Conversational Interface, Deep Document Grounding, etc.).
- Visual (both, structure, high): 'Business Impact & Outcomes' stats/metrics band absent on clone (live shows ATS coverage %, Latest Response, Average AHT, Enhanced Compliance tiles).
- Visual (both, structure, high): Lead-gen form ('Schedule a 1:1 Call Today' with Name/Email/Phone fields + Submit) is missing on clone; clone footer follows CTA directly with no form.
- Visual (both, text, med): Hero heading differs: live = 'Automates HR Operations with Microsoft Copilot Studio'; clone = 'Copilot Studio Based HR Policy Agent by Folio3 | Case Study'.
- Visual (both, layout, high): Massive empty whitespace gaps between clone sections where live content/illustrations would render, leaving large blank bands mid-page.
- Visual (both, layout, med): Bottom stats row (4 numeric counters '0+ ...') renders as empty zeros on clone vs populated metric tiles on live.
- Visual (desktop, styling, med): Hero on clone uses a plain blue gradient with no isometric product illustration; live hero has rich graphic on right and decorative network background.
- Visual (mobile, layout, high): Mobile clone collapses to a short stack with large empty regions; the long stacked illustration/process/feature flow of live mobile is absent, making the page appear truncated.

### `/client-success-story/`  — 9 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: solution-steps-isometric-illustrations, technologies-involved-grid, stats-band, lead-form (Schedule 1:1 Call), customer-info-band (location/industry/size), case-study-card-body-text
- Missing images: azure-sql.webp, azure-storage-account.webp, azure-data-factory.webp, azure-key-vaults.webp, azure-devops.webp, azure-data-bricks.webp, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png
- Visual (both, structure, high): Entire 'What Solution Did We Propose' section with the six isometric 3D numbered step illustrations is missing on the clone.
- Visual (both, structure, high): 'Technologies Involved In This Case' grid (Azure SQL, Storage Account, Data Factory, DevOps, etc.) is absent on the clone.
- Visual (both, structure, high): Lead-capture form 'Schedule a 1:1 Call Today' (name/phone/email/message fields + submit) is missing; clone jumps from CTA banner to footer.
- Visual (both, text, high): 'The Customer' and 'The Problem' cards render as empty placeholders with icon stubs and no body copy on the clone vs full descriptive text on live.
- Visual (both, images, med): Hero illustration is washed-out/low-contrast and the blue customer-info band (Connecticut, Financial Services, 11-50 employees) below the hero is missing/restyled on the clone.
- Visual (desktop, structure, med): Stats band (0+ Projects / Companies Served / Global Employees) present on live is missing on the clone.
- Visual (both, text, low): CTA banner heading differs: live uses 'Take A Seamless Cloud Ride With Us!' plus a separate 'Ready to unlock the power of Azure?' banner; clone duplicates/repositions these inconsistently.
- Visual (mobile, layout, high): Mobile hero image is oversized/overflowing and heading text overlaps the illustration, breaking the stacked layout.
- Visual (mobile, mobile, med): Clone mobile collapses most mid-page sections, leaving large empty gaps between cards and the footer; content density far below live.
- Visual (both, layout, med): Card grid column count/spacing differs: live 'Problem' uses denser multi-column detailed cards; clone shows sparse 2-3 placeholder cards.

### `/daraz/`  — 9 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: the-customer-card, the-problem, folio3-solution-isometric-diagram, process-steps, stats-band, real-results-tabs, case-study-result-cards
- Missing images: Folio3-Azure-Case-Study.webp *DL*, daraz_logo-2.png, Azure_Data_Lake-removebg-preview.png, Rectangle_12180__2_-removebg-preview.png, Power-BI.png, Azure_Storage-removebg-preview.png, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png
- Visual (both, structure, high): LIVE 'The Customer' is a blue band with an intro paragraph + circular illustration; CLONE shows only the heading 'The Customer' over a near-empty white card (placeholder), losing the entire section body and illustration.
- Visual (both, structure, high): Entire 'The Problem' section (heading + two-column problem text + bullet list with icons) present on LIVE is completely absent on CLONE.
- Visual (both, images, high): LIVE 'Folio3 Solution' large isometric process diagram with connected nodes/step icons is missing on CLONE; that whole region is blank white space.
- Visual (both, structure, high): LIVE 'Technologies Involved in This Case' band (Azure Data Lake, Power BI, Azure Storage chips) is absent on CLONE.
- Visual (both, structure, high): LIVE 'Real Results, Real Impact' tabbed/stat result cards (Seville/CityU blue panels) collapse to two plain photo thumbnails on CLONE; tab structure and result metrics lost.
- Visual (both, text, med): Hero CTA differs: LIVE button 'SCHEDULE A 1:1 CALL WITH OUR EXPERTS', CLONE 'SPEAK TO OUR AZURE EXPERTS'; also CLONE hero body paragraph is longer/denser than LIVE.
- Visual (both, text, med): CLONE heading typo 'The Customter' vs LIVE 'The Customer'.
- Visual (both, layout, med): CLONE has large empty white gaps where missing sections were, producing inconsistent vertical rhythm and an unbalanced page versus LIVE's dense, evenly-spaced sections.
- Visual (both, text, low): Scale CTA wording differs: LIVE 'Take A Seamless Cloud Ride With Us!' vs CLONE shows a generic blue band; CLONE also missing the secondary 'Ready to unlock the power of Azure?' framing alignment.
- Visual (mobile, nav, med): Mobile header parity off: LIVE shows hamburger plus prominent CTA button stack; CLONE header is sparse with a single CTA and missing the breadcrumb/intro hero stats present on LIVE.
- Visual (mobile, layout, high): On mobile the missing sections leave very tall blank scroll regions, so CLONE reads as mostly empty between hero and footer compared to LIVE's continuous content.

### `/power-bi-financial-reporting-for-alibaba/`  — 9 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, about-client-logo-graphic, navigating-data-challenge-section, optimized-power-bi-3d-illustrations, process-connector-diagram, business-outcomes-cards, stats-band, lead-form
- Missing images: daraz-header-graphic.png, alibaba-reb6f6fzc4hlu2h7ade0aw7bjk4loalc3at220tols.webp, achieve-dynamic-scalability-icon.svg *DL*, 32-Fewer-Human-Errors.svg *DL*, extract-transform-icon.svg *DL*, Scale-Your-Business-with-.png, daraz-client-bg.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero isometric cloud/BI illustration and Daraz/Alibaba logo graphic absent on clone; hero is text-only with empty right side.
- Visual (both, images, high): Blue 'About the Client' band missing the large circular Alibaba.com logo graphic; clone shows plain text only.
- Visual (both, structure, high): 'Optimized Power BI Reporting' section with three large 3D hexagon/cube illustrations and the connector/process diagram is entirely missing on clone.
- Visual (both, structure, high): 'Business Outcomes' 3-icon feature-card row is absent on the clone.
- Visual (both, structure, high): Stats band (0+ Projects / Global Employees / Companies / Global Awards) missing on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form section is missing on clone.
- Visual (desktop, layout, high): Clone has huge empty whitespace gaps where collapsed sections used to be, leaving the page mostly blank.
- Visual (both, text, med): CTA mismatch: clone shows generic blue 'Ready to unlock the power of Azure?' banner with a button instead of/in addition to live's 'Take A Seamless Cloud Ride With Us!' content.
- Visual (both, structure, high): 'Navigating Data At Scale' challenge section (icon + heading + 2-col bullet text) is reduced to a few empty/placeholder text cards on the clone.
- Visual (mobile, layout, high): Mobile clone collapses to a short stub: most sections dropped and the page ends abruptly, so stacking/content order doesn't match live's full mobile flow.

### `/savills/`  — 9 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: customer-band (blue band + Savills logo + icon stats), problem-section (numbered badge + two-column problem bullets), solution-grid (3D hexagon illustrations + numbered process steps), technologies-band (dark band with tech tags), stats-counters (0+ Projects/Employees/Companies/Industries), lead-form (Schedule a 1:1 Call Today form)
- Missing images: Folio3-Azure-Case-Study.webp *DL*, SAVILLS-2.png, C-Sharp.png, Asp.NET_.png, Angular.png, Azure-2.png, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png
- Visual (both, structure, high): 'The Customer' section reduced to three plain white text cards; live has a blue band with yellow Savills logo and three icon+label stats (London UK / Real Estate / 10,001+ Employees).
- Visual (both, structure, high): Entire 'The Problem' section missing on clone (numbered '1' badge, intro paragraph, two-column problem bullet list with icons).
- Visual (both, images, high): 'Folio3 Solution' section missing: large grid of blue 3D hexagonal/cube illustrations with numbered process steps is absent, leaving a large empty white gap.
- Visual (both, structure, high): 'Technologies Involved In This Case' dark band with tech tags (C-Sharp, Asp.NET, Angular, Azure) absent on clone.
- Visual (both, structure, high): Animated stats counter row (0+ Projects Delivered / Global Employees / Companies Served / Global Industries) missing on clone.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form (First/Last Name, Email, Message, SUBMIT) entirely missing on clone.
- Visual (both, text, med): Bottom CTA differs: clone shows 'Ready to unlock the power of Azure?' banner where live shows the stats counters + lead form; 'Take A Seamless Cloud Ride With Us!' CTA present on both but clone CTA button label/style differs.
- Visual (both, layout, med): Hero illustration present on both but clone hero band is shorter and the page collapses large empty white space between hero and CTA due to all mid-page sections being absent.
- Visual (desktop, styling, med): Customer cards on clone are flat/borderless white tiles with no icons or accent color, versus live's branded blue band treatment.
- Visual (mobile, layout, high): Mobile clone collapses to hero + three text cards + two CTA bands; live mobile renders full stacked sequence (logo band, problem bullets, full 3D solution grid, tech tags, counters, form) — large content cut/missing, not just stacking.

### `/blog/category/power-platform/`  — 9 img, 0 links
- Missing images: data-analytics-and-business-intelligence.jpg, power-bi-vs-qlik.jpg, azure-synapse-power-bi.jpg, fabric-for-powerbi-reporting.jpg, powerbi-dashbords-with-fabric.jpg, implementing-timezones-in-power-bi.jpg, power-bi-dashboard-vs-report.jpg, x835687_Cloud_storage_Data_transfer_protection_and_data_center__b11a9918-d1d5-4e3e-936f-2a177cbe11e4.png *DL*, azure-offices-map-img.webp

### `/blog/implementing-timezones-in-power-bi/`  — 9 img, 0 links
- Missing images: Image-1.png *DL*, Image-2.png *DL*, Image-3.png *DL*, Image-4.png *DL*, Image-5.png *DL*, Image-6.png *DL*, data-analytics-and-business-intelligence.jpg, power-bi-vs-qlik.jpg, azure-synapse-power-bi.jpg

### `/blog/tag/azure-professional-services/`  — 9 img, 0 links
- Missing images: The-Ultimate-Guide-to-Leveraging-Microsoft-Azure-for-Enhanced-Asset-Management.png, Azure-Blog-Images-850-%C3%97-560-px-4.png *DL*, Azure-Blog-Images-850-×-560-px-4.png, Azure-Blog-Images-850-%C3%97-560-px-3.png *DL*, Azure-Blog-Images-850-×-560-px-3.png, Azure-Data-Factory-vs.-Databricks-2023_-Key-Differences.jpg, Azure-Blog-Images-850-×-560-px-2.png, x835687_Cloud_computing_technology_concept._Futuristic_illustra_a1177465-92c5-40e8-a63c-de692350ddd5.png *DL*, azure-offices-map-img.webp

### `/implementing-power-bi-dashboard-for-food-crop-grower/`  — 8 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, about-client-cards-content, uncertain-operations-section, power-bi-dashboard-diagram, business-outcomes-stats, stats-band-counters, lead-form, scale-cta-banner-copy
- Missing images: food-crop-grower.webp, boost-operational-efficiency-icon.svg *DL*, Maximized-Data-Value-ROI.svg *DL*, self-service-analytics-icon.svg *DL*, Scale-Your-Business-with-.png, about-client-bg.webp, Line-5-1.png, Line-8-1.png
- Visual (both, images, high): Hero isometric farm/Power BI dashboard illustration absent on clone; replaced by generic abstract swirl background.
- Visual (both, structure, high): 'A Comprehensive Power BI Grower Portal Dashboard' node-diagram of 6 feature cards is entirely missing on clone.
- Visual (both, structure, high): 'Business Outcomes' section with 3 stat cards + icons (17% efficiency, 12% yield, etc.) missing on clone.
- Visual (both, structure, high): 'Uncertain Operations and Disconnected Growers' two-column text+icon section missing/empty on clone.
- Visual (both, text, high): 'About The Client' cards are empty placeholders on desktop clone; live shows populated company/location/industry info.
- Visual (both, structure, high): 'Schedule a 1:1 Call Today' lead form replaced by plain bulleted text list; no form fields/SUBMIT button on clone.
- Visual (both, structure, med): Stats band with animated 0+ counters present on live, absent on clone.
- Visual (both, text, med): Final CTA banner copy differs: live 'Take A Seamless Cloud Ride With Us!' scale CTA vs clone generic 'Ready to unlock the power of Azure?'.
- Visual (desktop, layout, high): Massive blank whitespace gaps on clone desktop where multiple sections fail to render, breaking vertical rhythm.
- Visual (mobile, layout, high): Mobile clone collapses to hero + empty About cards + text blocks then jumps to CTA/footer; most middle sections and illustrations dropped, content far shorter than live.

### `/blog/azure-data-factory-etl-tool/`  — 8 img, 0 links
- Missing images: azure-data-factory-logo.png *DL*, informatica-logo.png *DL*, talend-logo.png *DL*, apachie-nifi-logo.png *DL*, Google-dataflow.png *DL*, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/how-predictive-ai-can-reduce-interest-costs/`  — 8 img, 0 links
- Missing images: Other-game-changing-capabilities-include.png *DL*, what-are-the-key-capabilities-of-ai-predictive-analytics.png *DL*, Key-ways-AI-boosts-cash-and-credit-management.png *DL*, How-AI-Helps-with-Credit-Risk-and-Lending.png *DL*, Implementation-ROI.png *DL*, farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/multi-tenant-app-registration-in-azure-ad/`  — 8 img, 0 links
- Missing images: Image.png *DL*, Image-2.png, Image-3.png, Image-4.png, Image-5.png, Image-6.png, Image-7.png, Image-8.png

### `/contact-us/`  — 7 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, have-questions-form-section, email-phone-support-contact-band, scale-cta-banner, stats-band, schedule-1on1-call-form, offices-map-image
- Missing images: azure-banner-contact-us.webp *DL*, Oval-bg.webp, contact-us-1.webp, Scale-Your-Business-with-.png, azure-offices-map-img.webp, contact_us-banner.webp, azure-banner-cloud.webp *DL*
- Visual (both, structure, high): CLONE is a wholly different, condensed page: a single small hero + one lead form + footer. LIVE has 6+ distinct sections (hero, Q&A form, contact band, CTA banner, stats band, 1:1 call form). Most LIVE content is absent.
- Visual (both, images, high): LIVE hero has a large 3D Azure cloud/laptops illustration (azure-banner-contact-us.webp) on a blue gradient; CLONE hero has no illustration at all, just text and a flat light-purple background.
- Visual (both, text, high): Hero heading differs entirely: LIVE 'Reach Out For General Inquiries About Azure Cloud Services'; CLONE 'Let's build your Azure roadmap'. Body copy and bullet list also differ.
- Visual (both, structure, high): LIVE 'Email / Phone / Support' contact-info band with icons is completely missing on CLONE.
- Visual (both, structure, high): LIVE blue 'Ready to Work with The Ultimate Azure Experts?' CTA banner is missing on CLONE.
- Visual (both, structure, high): LIVE stats band (0+ Projects Delivered / Global Employees / Companies Served / Global Awards Won) is absent on CLONE.
- Visual (both, structure, high): LIVE 'Schedule a 1:1 Call Today' secondary form section (with offices map context) is missing; CLONE has only one generic form.
- Visual (desktop, layout, med): LIVE hero is full-bleed two-column (text left, illustration right). CLONE hero is a narrow single-column text block with the form pushed to the right card; spacing and proportions differ markedly.
- Visual (both, styling, med): Form styling differs: LIVE uses underline-only minimal inputs with a dark navy submit button; CLONE uses boxed/outlined inputs in a white rounded card with a blue submit button.
- Visual (mobile, mobile, high): Hamburger nav present on both, parity OK; but CLONE mobile drops directly from hero+form to footer, omitting all the stacked LIVE sections (contact band, CTA banner, stats, 1:1 form) the user would scroll through.

### `/blog/category/data-analysis-and-visualization/`  — 7 img, 0 links
- Missing images: azure-synapse-vs-databricks-1.png, Azure-Blog-Images-850-%C3%97-560-px-7.png *DL*, Azure-Blog-Images-850-×-560-px-7.png, Azure-Blog-Images-850-%C3%97-560-px-4.png *DL*, Azure-Blog-Images-850-×-560-px-4.png, Azure-Blog-Images-850-×-560-px-3.png, azure-offices-map-img.webp

### `/blog/tag/cloud-services/`  — 7 img, 0 links
- Missing images: Azure-Blog-Images-850-%C3%97-560-px-3.png *DL*, Azure-Blog-Images-850-×-560-px-3.png, Azure-Data-Factory-vs.-Databricks-2023_-Key-Differences.jpg, Azure-Blog-Images-850-×-560-px-2.png, azure-synapse-vs-databricks.png, x835687_Businessman_with_cloud_computing_diagram_show_on_hand.__8495534b-061d-445d-932b-2c41b2e34c38.png *DL*, azure-offices-map-img.webp

### `/city-university-azure/`  — 6 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: customer-cityu-logo-card, the-problem-icon-list, folio3-solution-process-steps, technologies-cards, stats-band, lead-form, scale-cta-banner-styling
- Missing images: Folio3-Azure-Case-Study.webp *DL*, City_u.webp, Lorem-Epsum.png, Scale-Your-Business-with-.png, Line-5-1.png, Line-8-1.png
- Visual (both, structure, high): Entire 'The Problem' section (icon + numbered list of issues plus right-column bullet points like 'Absence of support services', 'Disruption in data migration') is absent on the clone.
- Visual (both, images, high): 'Folio3 Solution' centerpiece process-step diagram (large numbered hexagon-node illustration with 6 steps) is completely missing on the clone, leaving the section nearly empty.
- Visual (both, structure, high): 'The Customer' blue CityU-of-Seattle logo card (right column on desktop / stat card on mobile) is missing; clone shows only plain text columns.
- Visual (both, structure, high): 'Technologies Involved In This Case' shows two cards (Dataverse, Power Apps) on live; clone renders the heading but the cards are empty/placeholder.
- Visual (desktop, structure, med): Stats band (0+ counters: Projects/Delivered, Global Employees, Companies Served, Global Awards) is missing on desktop clone; live has it above the footer.
- Visual (desktop, structure, high): 'Schedule a 1:1 Call Today' lead form (right-side form with name/email/message fields) is missing on the desktop clone.
- Visual (both, layout, high): Because mid-page sections collapse, the clone has large empty white gaps and total page height is far shorter than live; vertical rhythm/spacing does not match.
- Visual (both, text, med): Scale CTA banner heading differs: live reads 'Ready to Work With The Ultimate Azure Experts?' while clone's lower banner reads 'Ready to unlock the power of Azure?' with different button text.
- Visual (mobile, styling, med): Mobile customer-stat cards (years/location, higher education, employees count with icons) lose their icon styling and the '551-1000 employees' stat card is dropped on the clone.
- Visual (mobile, nav, med): Hamburger nav present on both, but mobile stats band (counters) and full lead form ordering differ; clone omits the stats counters row shown on live mobile.

### `/blog/ai-cash-flow-model-in-azure/`  — 6 img, 0 links
- Missing images: What-are-the-Benefits-of-an-AI-Cash-Flow-Model.png *DL*, what-are-the-benefits-of-an-ai-cash-flow-model-1.png *DL*, Steps-to-Build-an-Effective-AI-Cash-Flow-Model-in-Azure.png *DL*, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/category/data-storage-and-management/`  — 6 img, 0 links
- Missing images: ai-data-governance.png, inventory-dashboard.jpg, microsoft-fabric-data-warehouse.jpg, azure-synapse-vs-databricks.png, Manage-your-Almond-Farm-Finances-with-AgriERPs-Farm-Financial-Management-Capabilities-1.png, azure-offices-map-img.webp

### `/blog/connecting-to-azure-virtual-network-with-microsoft-fabric-vnet-data-gateway/`  — 6 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, steps-to-setting-up-microsoft-fabric-vnet-data-gateway.jpg, best-practices-for-securing-and-optimizing-vnet-data-gateway.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-vs-snowflake/`  — 6 img, 0 links
- Missing images: microsoft-fabric.jpg, azure-blog-cta-img-1.webp, snowflake.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/about-us/`  — 4 img, 1 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: services-cards (6-card 'Explore Why Businesses Trust Folio3' feature grid), stats-band (4-up '0+ Projects/Companies/Employees' counters), case-studies (Savills/CityU 'Real Results, Real Impact' titled grid), lead-form ('Schedule a 1:1 Call Today' contact form)
- Missing images: azure-about-us-mock.webp *DL*, Scale-Your-Business-with-.png, Oval.png, azure-banner-cloud.webp *DL*
- Link "Speak to Our Azure Experts": clone `/contact-us` → live `#pgForm`
- Visual (both, structure, high): 'Explore Why Businesses Trust Folio3' 6-card services/feature grid (Certified Developers, Cloud-Centric Approach, App Modernization, etc. with icons) is entirely absent on clone.
- Visual (both, structure, high): 'Real Results, Real Impact' case-study band is missing its heading and Savills/CityU labeled 2-col blue cards; clone instead shows two bare photo cards with one Read More button.
- Visual (both, structure, high): 4-up animated stats counter band (0+ Projects Delivered / Companies Served / Global Employees / Awards) absent on clone.
- Visual (both, structure, high): Lead-capture form 'Schedule a 1:1 Call Today' (First name, Phone, Email, Message, Submit) absent on clone; replaced by a generic 'Ready to unlock the power of Azure?' CTA banner.
- Visual (both, layout, med): 'Discover the essence of who we are' is centered/minimal on live but clone adds a left person-at-computer photo + right body-text two-column block, changing the section layout.
- Visual (both, text, med): Live 'Ready to Work with The Ultimate Azure Experts' CTA button reads 'Get Customized Azure Cloud Services'; clone button reads 'Contact us now'.
- Visual (both, images, med): Clone substitutes generic stock photos (cityscape, woman on laptop) where live uses branded case-study cards and the hero isometric illustration context differs.
- Visual (mobile, structure, high): Clone mobile omits the per-card 'READ MORE'/'DISCOVER ALL' case-study layout and the full feature-card stack present on live, making the page much shorter.
- Visual (both, styling, low): Clone footer 'Ready to unlock the power of Azure?' banner uses different copy/CTA ('Talk to an expert') vs live's form-driven bottom section.
- Visual (mobile, nav, low): Hamburger menu present on both; header parity is acceptable, but clone hero text scaling/spacing differs slightly from live.

### `/blog/best-practices-for-securing-microsoft-fabric-implementation/`  — 5 img, 0 links
- Missing images: implementing-cluster-security-by-using-various-technologies.jpg, secure-service-fabric-cluster-by-using-azure-resource-manager-templates.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/category/azure-professional-services/`  — 5 img, 0 links
- Missing images: ai-data-governance.png, The-Ultimate-Guide-to-Leveraging-Microsoft-Azure-for-Enhanced-Asset-Management.png, azure-synapse-vs-databricks.png, x835687_Cloud_computing_technology_concept._Futuristic_illustra_a1177465-92c5-40e8-a63c-de692350ddd5.png *DL*, azure-offices-map-img.webp

### `/blog/business-dashboard-software/`  — 5 img, 0 links
- Missing images: what-are-business-dashboard-software.jpg, benefits-of-business-dashboard-software.jpg, farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/category/business-insights/`  — 5 img, 0 links
- Missing images: How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, data-insights-companies.jpg, healthcare-business-insights.jpg, customer-data-insights.jpg *DL*, azure-offices-map-img.webp

### `/blog/category/uncategorized/`  — 5 img, 0 links
- Missing images: top-business-intelligence-tools.jpg, Azure-Blog-Images-850-%C3%97-560-px-6.png *DL*, Azure-Blog-Images-850-×-560-px-6.png, top-5-data-cleansing-tools.png, azure-offices-map-img.webp

### `/blog/connecting-to-external-cloud-data-sources-with-microsoft-fabric/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, challenges-and-how-microsoft-fabric-addresses-them.png, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/guide-to-microsoft-fabric-data-warehouse/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, methods-to-load-data-into-warehouse.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-azure-ai/`  — 5 img, 0 links
- Missing images: azure-ai-strategic-pillars.jpg, technologies-driving-enterprise-ai-transformation.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-cost-optimization-strategies/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, strategies-for-cost-optimization-in-microsoft-fabric.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-implementation/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, steps-to-implement-microsoft-fabric.png, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/optimize-store-performance-with-store-performance-dashboard/`  — 5 img, 0 links
- Missing images: what-is-a-store-performance-dashboard.jpg, steps-to-optimize-store-performance-dashboards.jpg, powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg, ecommerce-dashboard.jpg

### `/blog/power-bi-vs-qlik/`  — 5 img, 0 links
- Missing images: what-is-power-bi.jpg *DL*, what-is-qlik.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/tag/dashboard-software/`  — 5 img, 0 links
- Missing images: The-Ultimate-Guide-to-Leveraging-Logistics-Dashboards-for-Enhanced-Supply-Chain-Efficiency.png, Advanced-Supply-Chain-Dashboards-for-Real-Time-Visibility.png, A-Checklist-for-Choosing-the-Right-Business-Dashboard-Software-for-Your-Needs.png, Top-10-Dashboard-Software-For-Effective-Visualization-in-2024.png, azure-offices-map-img.webp

### `/blog/what-is-data-factory-in-microsoft-fabric/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, key-components-of-data-factory.png, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/what-is-onelake-in-microsoft-fabric/`  — 5 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, onelake-architecture.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/`  — 4 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, blog-hero-banner, discover-essence-heading, categories-filter-sidebar, stats-band, lead-form, schedule-call-cta
- Missing images: blog-mock.webp *DL*, azure-offices-map-img.webp, our-blog-banner.webp, azure-banner-cloud.webp *DL*
- Visual (both, structure, high): Clone omits the entire top of the page that LIVE shows: illustrated blue 'Blog Azure Cloud Services' hero banner with 'Schedule a Free Consultation' CTA, breadcrumb, and 'Discover The Essence Of Who We Are?' intro heading. Clone jumps straight to a 'From the Folio3 Azure blog' text header and the card grid.
- Visual (both, nav, high): Clone is missing the left 'CATEGORIES' filter list (All, Microsoft Fabric, Product Dashboards, Data Integration and ETL, Data Storage, Data Analysis/Visualization, Cloud Migration, Azure DevOps) present on LIVE.
- Visual (both, structure, high): Clone is missing the stats band (0+ Projects Delivered, Global Employees, Companies Served, Global Awards won) shown on LIVE.
- Visual (both, structure, high): Clone is missing the 'Schedule a 1:1 Call Today' lead form (Full Name/Phone/Email/Message + Submit) and on mobile the world-map background graphic behind the stats.
- Visual (both, images, high): LIVE hero illustration (isometric cloud/server graphic) and banner artwork are absent on the clone (placeholder/empty), consistent with the missing blog-mock.webp / our-blog-banner.webp images.
- Visual (both, layout, med): Card grid composition differs: clone renders a very dense, near-borderless 3-column (desktop) list of many blog cards as the primary content, whereas LIVE's captured view foregrounds the hero+categories+form layout with cards de-emphasized.
- Visual (both, text, med): Section heading text differs: LIVE uses 'Discover The Essence Of Who We Are?' as the blog intro; clone uses 'From the Folio3 Azure blog' with subtext, with no equivalent hero copy.
- Visual (desktop, styling, med): Clone blog cards have minimal/flat styling (thin dividers, tight spacing) versus LIVE's more spaced, branded section styling with blue accents.
- Visual (mobile, mobile, high): Clone mobile stacks only the card list and footer; it lacks the LIVE mobile hero, full-width blue CATEGORIES button + stacked category rows, stats, and lead form, so the mobile page is structurally much shorter in distinct sections.
- Visual (mobile, nav, low): Header/hamburger appears present on both, but clone mobile lacks the hero CTA button ('Schedule a Free Consultation') beneath the top nav that LIVE shows.

### `/blog/ai-data-governance/`  — 4 img, 0 links
- Missing images: Key-Principles-of-AI-Data-Governance.png *DL*, farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/azure-fabric-features/`  — 4 img, 0 links
- Missing images: latest-azure-fabric-features.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/benefits-of-microsoft-copilot/`  — 4 img, 0 links
- Missing images: what-is-microsoft-365-copilot.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/category/azure-devops/`  — 4 img, 0 links
- Missing images: azure-synapse-power-bi.jpg, How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, The-Beginners-Guide-to-Test-Automation-in-Azure-DevOps.png *DL*, azure-offices-map-img.webp

### `/blog/category/cloud-services/`  — 4 img, 0 links
- Missing images: Azure-Blog-Images-850-%C3%97-560-px-3.png *DL*, Azure-Blog-Images-850-×-560-px-3.png, x835687_Businessman_with_cloud_computing_diagram_show_on_hand.__8495534b-061d-445d-932b-2c41b2e34c38.png *DL*, azure-offices-map-img.webp

### `/blog/business-intelligence-vs-business-analytics/`  — 4 img, 0 links
- Missing images: difference-between-business-intelligence-and-business-analytics.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/connecting-to-on-premise-data-sources-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/data-analytics-trends/`  — 4 img, 0 links
- Missing images: top-data-analytics-trends.png *DL*, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/data-silos-in-healthcare/`  — 4 img, 0 links
- Missing images: strategic-approaches-to-healthcare-data-sharing.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/dynamics-365-finance-and-operations-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: integration-benefits-of-microsoft-dynamics-365-finance-and-operations-with-microsoft-fabric.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/ecommerce-dashboard/`  — 4 img, 0 links
- Missing images: what-is-an-ecommerce-dashboard.jpg, powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg, store-performance-dashboard.jpg

### `/blog/fabric-consulting-for-improving-data-insight/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/fabric-implementation-for-organizations/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/fabric-implementation-for-production-data-reporting/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/fabric-with-medallion-architecture/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/how-to-overcome-visibility-gaps-with-end-to-end-farm-to-market-analytics/`  — 4 img, 0 links
- Missing images: inventory-and-assess-farm-to-market-data-sources.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, ai-financial-planning-azure.jpg, data-analytics-and-business-intelligence.jpg

### `/blog/impact-of-azure-business-intelligence/`  — 4 img, 0 links
- Missing images: Core-Azure-BI-Components-and-Features.png *DL*, azure-synapse-power-bi.jpg, data-insights-companies.jpg, healthcare-business-insights.jpg

### `/blog/integrating-microsoft-fabric-with-databricks/`  — 4 img, 0 links
- Missing images: steps-to-integrate-microsoft-fabric-with-databricks.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/integrating-power-bi-data-gateway-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/managing-real-time-data-streams-efficiently-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: real-time-intelligence-suite-in-microsoft-fabric.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, ai-financial-planning-azure.jpg, azure-fabric-features.jpg

### `/blog/managing-hybrid-cloud-with-azure-arc/`  — 4 img, 0 links
- Missing images: what-is-azure-arc.jpg, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-for-powerbi-reporting/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-vs-databricks/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-vs-power-bi/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/optimizing-fabric-response-time/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/overview-of-microsoft-fabric-skus/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/power-bi-vs-tableau/`  — 4 img, 0 links
- Missing images: azure-synapse-vs-databricks-1.png, Azure-Blog-Images-850-×-560-px-7.png, Azure-Blog-Images-850-×-560-px-4.png, Azure-Blog-Images-850-×-560-px-3.png

### `/blog/power-bi-dashboards-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: benefits-of-using-microsoft-fabric-with-power-bi.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/powerbi-benefits/`  — 4 img, 0 links
- Missing images: unnamedasfsh.png, azure-synapse-vs-databricks-1.png, Azure-Blog-Images-850-×-560-px-4.png, Azure-Blog-Images-850-×-560-px-3.png

### `/blog/slider-item/`  — 4 img, 0 links
- Missing images: kubernetes_logo.webp, angular_logo.webp, aws_logo-1.webp, google_cloud.webp

### `/blog/sales-performance-dashboards/`  — 4 img, 0 links
- Missing images: sales-dashboard-examples.jpg, powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg, ecommerce-dashboard.jpg

### `/blog/secure-data-ingestion-processes-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric/`  — 4 img, 0 links
- Missing images: why-hr-reporting-needs-a-better-foundation.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg, azure-fabric-features.jpg

### `/blog/using-private-endpoints-with-microsoft-fabric-for-improved-security/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/what-is-data-fabric-architecture/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/what-is-microsoft-fabric-features-benefits-use-cases/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/what-is-production-level-ai/`  — 4 img, 0 links
- Missing images: aligning-ai-with-business-strategy.png *DL*, intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/which-microsoft-fabric-skus-suits-your-organization-needs/`  — 4 img, 0 links
- Missing images: azure-blog-cta-img-1.webp, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/author/alihassan/`  — 3 img, 0 links
- Missing images: How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, agentic-ai-in-healthcare.png, azure-offices-map-img.webp

### `/blog/azure-asset-management/`  — 3 img, 0 links
- Missing images: ai-data-governance.png, powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg

### `/blog/azure-data-factory-vs-databricks/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/azure-data-lake-analytics-vs-synapse/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/azure-synapse-power-bi/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/azure-synapse-vs-databricks/`  — 3 img, 0 links
- Missing images: ai-data-governance.png, inventory-dashboard.jpg, microsoft-fabric-data-warehouse.jpg

### `/blog/boosting-finance-efficiency-with-microsoft-365-copilot/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/components-of-data-fabric-architecture/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/components-of-microsoft-fabric-architecture/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/connecting-to-aws-data-sources-with-microsoft-fabric/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/data-analytics-and-business-intelligence/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-trends.jpg, power-bi-vs-qlik.jpg

### `/blog/custom-dashboards/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/dashboard-software/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/customer-data-insights/`  — 3 img, 0 links
- Missing images: How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, data-insights-companies.jpg, healthcare-business-insights.jpg

### `/blog/data-insights-companies/`  — 3 img, 0 links
- Missing images: How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, healthcare-business-insights.jpg, customer-data-insights.jpg *DL*

### `/blog/data-integration-etl-tools/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/data-integration-with-azure-data-factory/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/data-quality-management-dqm/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/data-strategy/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/data-warehouse-modernization-azure/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/enterprise-data-architecture/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/fabric-implementation-for-business-central-erp/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/fabric-implementation-for-microsoft-dynamics-finance-and-operations-erp/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/folio3-secures-microsoft-solution-partner-designation-in-four-key-areas/`  — 3 img, 0 links
- Missing images: data-and-ai.jpg, digital-and-app-innovation.jpg, infrastructure.jpg

### `/blog/fabric-with-microsoft-erp-consulting/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/how-azure-fabric-and-copilot-enable-ai-driven-financial-planning/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg

### `/blog/guide-to-microsoft-fabric-capacity/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/healthcare-business-insights/`  — 3 img, 0 links
- Missing images: How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png, data-insights-companies.jpg, customer-data-insights.jpg *DL*

### `/blog/how-business-intelligence-services-can-help-companies-stay-ahead-of-the-competition/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/intellifabric-vs-custom-microsoft-fabric/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg, microsoft-365-copilot-features.jpg

### `/blog/integrating-microsoft-fabric-in-power-bi/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/integrating-microsoft-fabric-with-erp-systems/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-365-copilot-features/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/logistics-dashboards/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/microsoft-azure-professional-services-why-your-business-needs-them/`  — 3 img, 0 links
- Missing images: ai-data-governance.png, The-Ultimate-Guide-to-Leveraging-Microsoft-Azure-for-Enhanced-Asset-Management.png, azure-synapse-vs-databricks.png

### `/blog/microsoft-fabric-certification/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-data-analytics/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-erp-dashboards/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-for-finance-data/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-implementation-for-supply-chain-reporting/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-lakehouse-vs-warehouse/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-pricing/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-license/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-vs-synapse/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/microsoft-fabric-with-dynamics-365-finance-and-operation/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/power-bi-dashboard-vs-report/`  — 3 img, 0 links
- Missing images: data-analytics-and-business-intelligence.jpg, power-bi-vs-qlik.jpg, azure-synapse-power-bi.jpg

### `/blog/power-platform-on-azure/`  — 3 img, 0 links
- Missing images: data-analytics-and-business-intelligence.jpg, power-bi-vs-qlik.jpg, azure-synapse-power-bi.jpg

### `/blog/retail-dashboards/`  — 3 img, 0 links
- Missing images: powerbi-dashbords-with-fabric.jpg, ecommerce-dashboard.jpg, store-performance-dashboard.jpg

### `/blog/tag/azure-devops/`  — 3 img, 0 links
- Missing images: Azure-Data-Factory-vs.-Databricks-2023_-Key-Differences.jpg, The-Beginners-Guide-to-Test-Automation-in-Azure-DevOps.png *DL*, azure-offices-map-img.webp

### `/blog/strategies-for-financial-data-security/`  — 3 img, 0 links
- Missing images: intellifabric-vs-custom-microsoft-fabric.jpg, farm-to-market-analytics-solutions.jpg, ai-financial-planning-azure.jpg

### `/blog/strategies-for-handling-large-scale-data-with-microsoft-fabric/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/blog/tag/power-platform/`  — 3 img, 0 links
- Missing images: Azure-Data-Factory-vs.-Databricks-2023_-Key-Differences.jpg, x835687_Cloud_storage_Data_transfer_protection_and_data_center__b11a9918-d1d5-4e3e-936f-2a177cbe11e4.png *DL*, azure-offices-map-img.webp

### `/blog/streamlining-inventory-management-with-interactive-dashboards/`  — 3 img, 0 links
- Missing images: ai-data-governance.png, powerbi-dashbords-with-fabric.jpg, retail-dashboard.jpg

### `/blog/supply-chain-dashboards/`  — 3 img, 0 links
- Missing images: farm-to-market-analytics-solutions.jpg, data-analytics-and-business-intelligence.jpg, data-analytics-trends.jpg

### `/blog/top-5-data-cleansing-tools-in-2023-how-to-select-the-right-one/`  — 3 img, 0 links
- Missing images: top-business-intelligence-tools.jpg, The-Role-of-Data-Integration-in-Building-an-Effective-Enterprise-Data-Architecture.png, Azure-Blog-Images-850-×-560-px-6.png

### `/blog/top-business-intelligence-tools/`  — 3 img, 0 links
- Missing images: factors-to-consider-when-selecting-the-best-business-intelligence-tool.jpg *DL*, Azure-Blog-Images-850-×-560-px-6.png, top-5-data-cleansing-tools.png

### `/blog/what-is-elt-meaning/`  — 3 img, 0 links
- Missing images: top-business-intelligence-tools.jpg, The-Role-of-Data-Integration-in-Building-an-Effective-Enterprise-Data-Architecture.png, top-5-data-cleansing-tools.png

### `/blog/what-is-microsoft-fabric/`  — 3 img, 0 links
- Missing images: ways-hr-teams-can-automate-workforce-reporting-with-microsoft-fabric.jpg, real-time-data-intelligence-in-microsoft-fabric.jpg, ai-financial-planning-azure.jpg

### `/cookie-policy/`  — 2 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: body-prose-content, stats-band, schedule-1on1-lead-form
- Missing images: Azure-Privay-policy-mobile.webp, azure-banner-cloud.webp *DL*
- Visual (both, structure, high): LIVE renders the full cookie-policy as prose paragraphs under each heading (What are Cookies, Third-party cookies, How Do We Use Them, etc.). CLONE drops all body text and instead shows a 6-card accordion/tile grid labeled only with the headings, so the actual policy content is missing.
- Visual (both, structure, high): LIVE 'Schedule a 1:1 Call Today' lead-form section (Full Name / Phone / Email / Message + SUBMIT) is absent on CLONE; CLONE replaces it with a generic blue 'Ready to unlock the power of Azure?' CTA banner.
- Visual (desktop, structure, high): LIVE stats band (0+ Projects Delivered / Global Employees / Companies Served / Global Awards won) sits as its own light section above the footer on LIVE; on CLONE desktop it is gone, surfacing only inside the mobile contact card.
- Visual (both, layout, high): CLONE introduces a 3-column card grid (What are Cookies? section) that does not exist on LIVE, changing the whole page from a single-column document to a tiled layout.
- Visual (both, text, med): Hero CTA differs: LIVE hero has no prominent button under the intro text, CLONE adds a 'SPEAK TO OUR AZURE EXPERTS' button in the hero.
- Visual (both, styling, low): CLONE hero heading 'Cookie Policy' is bold/dark and left-stacked with an eyebrow label 'COOKIE POLICY'; LIVE uses a lighter, larger thin heading with no eyebrow.
- Visual (both, layout, med): Large vertical whitespace gaps on CLONE between the card grid and the office/footer block, caused by removed content sections, leaving the page looking sparse vs LIVE's dense text.
- Visual (mobile, nav, low): Mobile hamburger present on both, parity OK, but CLONE mobile injects an office-address + stats contact card mid-page that LIVE does not show in that position.

### `/microsoft-licensing-process/`  — 2 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration, key-features-cards, why-partner-services-cards, case-studies, stats-counters, lead-form
- Missing images: ms-license-img.webp, key-features-img.webp
- Visual (both, images, high): Hero 3D Microsoft/laptop-cloud illustration on gradient band is missing on clone; hero right side is empty plain gradient.
- Visual (both, structure, high): 'Key Features Of Microsoft CSP Program' section is broken: heading and the feature bullet list with its right-side illustration are gone; clone shows large empty whitespace instead.
- Visual (both, structure, high): 'Why Partner With Folio3' 6-card services grid (One-stop-shop, Flexible Payment Plans, Better Pricing, Trusted Advisor, 24/7 Support, Microsoft Expertise) is entirely absent on clone.
- Visual (both, structure, high): 'Real Results, Real Impact' case-study cards (Savills / CityU) are missing on desktop clone (partially present on mobile but malformed).
- Visual (both, structure, high): Bottom conversion block differs: live has stats counters (0+ projects/cloud experts) plus a 'Schedule a 1:1 Call Today' lead form; clone replaces these with a generic blue 'Ready to unlock the power of Azure?' CTA banner — no form, no counters.
- Visual (desktop, layout, med): Clone has a stray orphan row of two photos (warehouse + person) with a lone button floating in whitespace, not present in live's layout flow.
- Visual (both, styling, low): Microsoft Tier 1 Partner card: live shows a multi-color Microsoft brand accent strip; clone's accent strip/styling under the logo differs.
- Visual (mobile, text, med): Hero CTA text differs: live 'REQUEST A AZURE' / 'REQUEST A QUOTE'; clone shows 'SPEAK TO OUR AZURE EXPERTS'.
- Visual (mobile, layout, high): Mobile clone is much shorter and content-sparse; case-study cards render as bare labels (Savills/CityU) with empty colored blocks and large gaps, breaking the stacked card layout seen on live.
- Visual (mobile, structure, high): Mobile clone omits the 'Why Partner' feature cards and the stats+lead-form section, ending in the generic CTA banner instead of the form like live.

### `/privacy-policy/`  — 2 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: hero-illustration (blue lock graphic), stats-band (4 counters: Projects, Global Employees, Companies Served, Global Awards), lead-form (Schedule a 1 Call Today form with name/email/message/submit), body-content-sections (Data Retention, IP Anonymity, Modes of Communication, Case of Data Breach, Retention of Personal Data, Other Important Info, Cookies Policy)
- Missing images: Azure-Privay-policy-mobile.webp, azure-banner-cloud.webp *DL*
- Visual (both, styling, high): Hero treatment wrong: LIVE is a light/white hero with small blue lock illustration on right; CLONE is a dark-blue hero with overlaid network/map graphic and white text.
- Visual (both, text, med): Hero heading differs: LIVE 'Privacy Policy'; CLONE 'Privacy Policy - Azure'. CLONE also stuffs the entire intro body paragraph inside the dark hero.
- Visual (desktop, structure, high): CLONE drops almost all mid-page body sections; after 'GDPR Compliance' heading there is large blank/empty whitespace with only faint placeholder rows, vs LIVE's dense multi-section legal copy.
- Visual (both, structure, high): Stats band of 4 animated counters present on LIVE is entirely absent on CLONE.
- Visual (both, structure, high): Lead-form CTA block ('Schedule a 1 Call Today' with form fields + SUBMIT) on LIVE is missing on CLONE; replaced by generic blue 'Ready to unlock the power of Azure?' banner.
- Visual (desktop, layout, med): LIVE intro copy is full-width single column with a breadcrumb bar below hero; CLONE has no breadcrumb bar in the same position and uses different column flow.
- Visual (both, text, med): CTA text/intent differs: LIVE form-driven CTA vs CLONE button 'SPEAK TO OUR AZURE EXPERTS' / 'Ready to unlock the power of Azure?'.
- Visual (mobile, text, low): Mobile hero heading wraps to 'Privacy Policy - Azure' with '- Azure' colored, not matching LIVE simpler 'Privacy Policy' heading.
- Visual (mobile, structure, high): Mobile CLONE shows only hero text block then jumps to address/contact list rows; the structured legal sections and stats counters seen on LIVE mobile are missing.
- Visual (both, styling, med): Overall color/background inverted in hero region (dark vs light) gives a markedly different first-impression brand look.

### `/thank-you/`  — 2 img, 0 links — visual: desktop=totally-different, mobile=totally-different
- Missing sections: hero-card-illustration, stats-band, schedule-call-lead-form, world-map-illustration
- Missing images: thankyou-right-image.png *DL*, azure-offices-map-img.webp
- Visual (both, structure, high): Entirely different page concept. LIVE shows a white rounded hero card 'Thanks for Reaching Out' with a person illustration + 'GO BACK TO HOME' button on a light-blue band. CLONE shows a minimalist centered checkmark circle, bold 'Thank you!' heading, subtext and a blue 'Back to home' button on plain white. Different copy, layout, and visual language.
- Visual (both, structure, high): LIVE includes a full 'Schedule a 1:1 Call Today' section with a world-map background graphic and a 4-field lead form (Full Name, Phone, Email, Message + SUBMIT). This entire section is absent on the CLONE.
- Visual (both, structure, high): LIVE has a 4-column stats band (0+ Projects Delivered / Global Employees / Companies Served / Global Awards won). Completely missing on CLONE.
- Visual (both, images, high): LIVE hero card has a colorful person/megaphone illustration (thankyou-right-image) and the schedule section has the azure-offices world-map graphic. Both illustrations are absent on the CLONE — its content area is plain.
- Visual (both, text, med): Heading/CTA copy differs: LIVE 'Thanks for Reaching Out' + 'GO BACK TO HOME'; CLONE 'Thank you!' + 'Back to home'. Subtext wording also differs.
- Visual (desktop, layout, med): LIVE main content sits in a constrained card layout against tinted background bands; CLONE centers a single small confirmation block in a tall expanse of empty white, leaving large vertical whitespace before the footer.
- Visual (both, nav, low): Header differs: LIVE top bar is compact with a small phone pill; CLONE header is taller with prominent 'Talk with Us' phone block and 'GET IN TOUCH' button. Desktop nav parity is otherwise close; mobile both collapse to a hamburger.
- Visual (mobile, layout, high): On mobile, LIVE stacks hero card, stats, then the schedule lead-form section before the footer; CLONE jumps straight from the small checkmark/thank-you block to the footer, so most live content is missing.
- Visual (both, styling, low): Background treatment differs: LIVE uses light-blue/tinted section bands behind the card and form; CLONE is flat white above the dark footer.

### `/blog/azure-devops-test-automation/`  — 2 img, 0 links
- Missing images: azure-synapse-power-bi.jpg, How-Will-Azure-Business-Intelligence-Change-Your-Business-In-2025.png

### `/blog/category/app-modernization/`  — 2 img, 0 links
- Missing images: 5-Reasons-to-Modernize-Your-App-with-Azure.png *DL*, azure-offices-map-img.webp

### `/blog/category/application-development/`  — 2 img, 0 links
- Missing images: agentic-ai-in-healthcare.png, azure-offices-map-img.webp

### `/blog/category/cloud-migration/`  — 2 img, 0 links
- Missing images: Azure-Cognitive-Search.webp, azure-offices-map-img.webp

### `/blog/category/press-release/`  — 2 img, 0 links
- Missing images: folio3-secures-microsoft-solution-partner-designation-in-four-key-areas.jpg, azure-offices-map-img.webp

### `/blog/generative-ai-journey-with-azure-openai/`  — 2 img, 0 links
- Missing images: what-is-azure-openai.jpg, key-features-of-azure-openai-service-1.jpg

### `/blog/tag/app-modernization/`  — 2 img, 0 links
- Missing images: 5-Reasons-to-Modernize-Your-App-with-Azure.png *DL*, azure-offices-map-img.webp

### `/blog/tag/cloud-migration-tools/`  — 2 img, 0 links
- Missing images: Azure-Cognitive-Search.webp, azure-offices-map-img.webp

### `/blog/agentic-ai-in-healthcare/`  — 1 img, 0 links
- Missing images: best-practices-to-implement-agentic-ai-in-healthcare.png *DL*

### `/blog/benefits-of-power-automate/`  — 1 img, 0 links
- Missing images: key-benefits-of-power-automate.jpg

### `/blog/comparing-aws-azure-google-cloud-services/`  — 1 img, 0 links
- Missing images: Azure-Blog-Images-850-×-560-px-3.png

### `/blog/guide-to-azure-ai-foundry/`  — 1 img, 0 links
- Missing images: what-is-azure-ai-foundry.png

### `/blog/major-azure-ai-trends/`  — 1 img, 0 links
- Missing images: top-azure-ai-trends.jpg

### `/blog/microsoft-azure-trends/`  — 1 img, 0 links
- Missing images: benefits-of-microsoft-azure-innovations.jpg

### `/blog/microsoft-copilot-for-sales/`  — 1 img, 0 links
- Missing images: why-sales-teams-need-copilot.jpg

### `/blog/our_industries/financial-services/`  — 1 img, 0 links, H1=0
- Missing images: azure-offices-map-img.webp

### `/blog/slider-item/angular-2/`  — 1 img, 0 links
- Missing images: angular_logo.webp

### `/blog/slider-item/angular/`  — 1 img, 0 links
- Missing images: angular_logo.webp

### `/blog/slider-item/aws-2/`  — 1 img, 0 links
- Missing images: aws_logo-1.webp

### `/blog/slider-item/aws/`  — 1 img, 0 links
- Missing images: aws_logo-1.webp

### `/blog/slider-item/google-cloud/`  — 1 img, 0 links
- Missing images: google_cloud.webp

### `/blog/slider-item/google-cloud-2/`  — 1 img, 0 links
- Missing images: google_cloud.webp

### `/blog/slider-item/kubernetees-2/`  — 1 img, 0 links
- Missing images: kubernetes_logo.webp

### `/blog/slider-item/kubernetees/`  — 1 img, 0 links
- Missing images: kubernetes_logo.webp

### `/blog/streamlining-recruitment-process-using-copilot/`  — 1 img, 0 links
- Missing images: how-copilot-streamlines-the-recruitment-process.jpg

### `/ai-agents/`  — 0 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: stats-band, lead-form, hero-illustration
- Visual (both, structure, high): LIVE 'Schedule a 1:1 Call Today' lead form (Full Name, Phone, Email, Message, SUBMIT) is entirely absent on CLONE. The clone keeps only the heading and instead dumps the footer office addresses into that section.
- Visual (both, structure, high): Stats band missing on CLONE. LIVE shows four counters over the world map (0+ Projects Delivered, Global Employees, Companies Served, Global Awards won); CLONE has no stats row.
- Visual (both, structure, med): CLONE adds a 'Ready to unlock the power of Azure?' scale CTA banner that does not exist on LIVE.
- Visual (both, text, high): Hero heading differs: LIVE shows plain 'AI Agents' on a white band; CLONE shows 'AI Agents - Azure' with an 'AI AGENTS' eyebrow plus a 'SPEAK TO OUR AZURE EXPERTS' CTA button.
- Visual (both, layout, med): World map illustration placement differs: LIVE renders it large behind the stats/form section; CLONE shrinks it into the hero, faint and small.
- Visual (both, nav, low): CLONE adds a breadcrumb bar (Home > AI Agents) that is not present on LIVE.
- Visual (both, styling, med): Office addresses on CLONE are rendered as an unstyled bulleted list mid-page (in the form area) rather than as the footer office columns seen on LIVE.
- Visual (mobile, mobile, high): On mobile CLONE the entire form-equivalent area collapses to a small address list and the scale-CTA, so the page is far shorter and lacks the prominent stacked form LIVE shows.
- Visual (desktop, layout, high): LIVE desktop uses a two-column layout (map+stats left, form card right); CLONE has no such two-column form region.
- Visual (both, nav, low): Header CTA differs slightly: LIVE shows phone + 'GET IN TOUCH'; CLONE header is similar but hero CTA wording/treatment diverges from LIVE.

### `/case-study-slider-for-mobile/`  — 0 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: stats-band, lead-form, world-map
- Visual (both, structure, high): Clone adds a full-width hero image banner with 'Inormobile/Azure' overlay + 'Speak to our azure experts' button + breadcrumb at top that LIVE does not have on this page.
- Visual (both, structure, high): LIVE 'Schedule a 1:1 Call Today' lead form (Full Name/Phone/Email/Message + Submit) is entirely missing on clone; replaced by two columns of plain bullet-point office text.
- Visual (both, structure, high): Stats band (0+ Projects Delivered / Global Employees / Companies Served / Awards Won) present on LIVE is absent on the clone.
- Visual (desktop, images, med): World map illustration is nearly blank/empty on clone vs the labeled dotted world map with country pins on LIVE.
- Visual (both, structure, med): Clone appends a 'Ready to unlock the power of Azure?' blue CTA banner that LIVE does not show on this route.
- Visual (mobile, layout, med): LIVE mobile shows a single case study card (Savills) in a slider; clone shows two cards (Savills + CityU) stacked, losing the slider behavior.
- Visual (both, layout, high): LIVE blue section is a two-column map+form layout; clone replaces it with a light two-column text block, losing the blue background and form panel.
- Visual (both, styling, low): Heading 'See How Our Customers Succeed' subheading present on both, but clone's overall section backgrounds/colors differ (light vs LIVE blue stats section).

### `/copilotsolutions/`  — 0 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: stats-band (4 counters: Projects Delivered / Global Employees / Companies Served / Global Awards won), lead-form (Schedule a 1:1 Call: Full Name, Phone, Email, Message, Submit)
- Visual (both, structure, high): Lead form under 'Schedule a 1:1 Call Today' is missing on clone; replaced by columns of office addresses/phone numbers. Live shows Full Name/Phone/Email/Message/Submit form.
- Visual (both, structure, high): Stats band (4 '0+' counters) present on live below the map is entirely absent on clone.
- Visual (both, structure, med): Clone adds an extra blue 'Ready to unlock the power of Azure?' scale-CTA banner that does not exist on live.
- Visual (desktop, text, med): Hero heading differs: live = plain 'CopilotSolutions'; clone = eyebrow 'COPILOTSOLUTIONS' + 'CopilotSolutions - Azure' with blue 'SPEAK TO OUR AZURE EXPERTS' button.
- Visual (desktop, layout, med): World map placement differs: live centers map in stats section with form on right; clone places map small to the right of the hero.
- Visual (both, text, low): Heading renders 'Schedule a 1:1 Call' as 'Schedule a 1 1 Call' / glitched '11' on clone — spacing/character rendering issue.
- Visual (desktop, nav, low): Clone adds a blue breadcrumb bar (Home / Copilotsolutions) not present on live.
- Visual (mobile, structure, high): Mobile clone omits stats counters and the full lead form; live mobile shows both stacked above footer.
- Visual (mobile, nav, med): Live mobile has hamburger menu; clone mobile shows full top nav links crammed instead of a hamburger — nav parity broken.
- Visual (mobile, layout, low): Clone mobile hero compresses eyebrow+title+button+map into a tight band; live mobile hero is a clean centered title only.

### `/solution/`  — 0 img, 0 links — visual: desktop=major-diff, mobile=major-diff
- Missing sections: lead-form, stats-band
- Visual (both, structure, high): LIVE 'Schedule a 1:1 Call Today' section is a working lead form (Full Name, Phone, Email, Message, Submit on a card beside the world map). CLONE replaces it entirely with rows of office-address text columns and no form fields/Submit button.
- Visual (desktop, structure, high): Stats band (0+ Projects Delivered / Global Employees / Companies Served / Global Awards won) shown under the map on LIVE is absent on the CLONE desktop.
- Visual (both, structure, med): CLONE adds a 'Ready to unlock the power of Azure?' blue CTA banner with 'TALK TO AN EXPERT' button that does not exist on LIVE.
- Visual (both, text, med): Hero differs: LIVE shows a plain 'Solution' heading on a white band. CLONE shows 'SOLUTION' eyebrow + 'Solution - Azure' heading + 'SPEAK TO OUR AZURE EXPERTS' button.
- Visual (desktop, layout, med): World map placement differs: LIVE sits in a dedicated mid-page band beside the form; CLONE pulls the map up into the hero overlapping the heading, with no stats row beneath.
- Visual (both, text, low): Section heading renders as 'Schedule a 1:1 Call Today' on LIVE but 'Schedule a 1:1 Call Today' is garbled/overlapped ('1:1' rendering issue) on CLONE.
- Visual (mobile, layout, high): On mobile LIVE the world map is full-width with a 2x2 stats grid below it; CLONE shrinks the map into the hero and drops the stats grid.
- Visual (mobile, nav, low): Hamburger present on both mobile headers (parity OK), but CLONE header keeps the full 'GET IN TOUCH'/phone affordances cramped vs LIVE's clean logo+hamburger.
- Visual (both, styling, low): Footer office listings styled differently: LIVE footer uses multi-row blue headings on dark bg; CLONE compresses offices into a denser grid with smaller type.

