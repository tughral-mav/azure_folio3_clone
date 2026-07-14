# BMAD Workflow — Case-Study Uplift (Route 1)

> Second BMAD run. Goal: lift ALL case-study pages to the pixel-perfect design established by
> the petrochemical page — but via ONE upgrade to the shared `OrderedRenderer` case-study blocks
> (not 11 bespoke rebuilds). Same PR (#33).

## Agent roles
| Persona | Responsibility |
|---|---|
| **Analyst** | Baseline current vs live for representative case studies; map each shared block to its target design. |
| **PM** | PRD + acceptance below. |
| **Architect** | Upgrade the `isCaseStudy`-gated blocks in `OrderedRenderer`; keep non-case-study pages untouched; reuse petrochemical tokens. |
| **Scrum Master** | Shard by block. |
| **Dev** | Implement one block upgrade at a time. |
| **QA** | Screenshot the block on 2 representative pages (SLB=Tier B, Popcorn=Tier A) vs live; regression-check the full case-study set. |

## PRD
**Goal:** every case study looks like the petrochemical template's family (pale-blue panels, circled
icons + connectors, stat cards + result banner, clean type), with zero regressions to non-case-study pages.
**Acceptance**
- The shared case-study blocks (Customer band, The Problem, Our Solution, Business Outcomes, needs cards)
  match the new visual language.
- No visual/functional regression on services/industries/home/blog (all `isCaseStudy=false`).
- Every case study still builds + renders (0 broken images, links resolve).

## Architecture
- Edit only the `isCaseStudy`-gated branches in `src/components/OrderedRenderer.tsx`.
- Reuse the petrochemical tokens (pale-blue `#f5f8fe`/`#eef3fb`, brand `#1742e7`, navy `#00217f`).
- Real inline icons remain a per-page optional add-on (numbers/checkmarks stay as the safe default).
- The petrochemical page is bespoke and does NOT use these blocks — it stays the reference, unaffected.

## Stories (by block)
| # | Block | Pages it lifts |
|---|---|---|
| 1 | Business Outcomes → horizontal stat cards + blue result banner | SLB, Food-Verification, Food-Crop-Grower, Real-Estate, Alibaba |
| 2 | The Problem → pale-blue panel + circled steps + dashed connectors | SLB, Alibaba, City-Uni, Daraz, Savills |
| 3 | The Customer band → refined pale-blue facts (icon-over-label) | all with "About The Client" |
| 4 | Our Solution → numbered nodes styling | SLB, Alibaba, modern set |
| 5 | Needs / "What The Client Needed" → pale-blue icon cards | Popcorn, HR Copilot |

## Changed pages (kept up to date for the PR)
- (populated as stories land)

**DoD:** all stories pass QA on the two representatives; regression set green; PR description lists
every changed case-study page link.
