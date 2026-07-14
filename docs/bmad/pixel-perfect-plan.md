# BMAD Workflow — Pixel-Perfect Petrochemical EDMS Case-Study Page

> Running the BMAD-METHOD (Breakthrough Method for Agile AI-Driven Development) agent
> workflow against a single, well-scoped goal: make `/petrochemical-producer-edms-compliance-agent/`
> a pixel-and-motion-identical rebuild of the live page.

## Agent roles (BMAD personas)
| Persona | Responsibility here |
|---|---|
| **Analyst** | Reverse-engineer the live page: sections, design tokens, icons, motion. |
| **PM** | PRD below — what "done" means, acceptance criteria. |
| **Architect** | Decide the implementation shape (dedicated component + scoped CSS + matched keyframes). |
| **Scrum Master** | Shard the PRD into per-section stories with QA gates. |
| **Dev** | Implement one story (section) at a time. |
| **QA** | Playwright screenshot-diff of that section vs live; must pass before the next story starts. |

## PRD (PM)
**Goal:** the clone page is visually and behaviourally indistinguishable from the live page.
**Acceptance criteria**
- Every section's layout, spacing, colour, type, and icons match the live page.
- Missing icons are added (live inline SVGs, extracted).
- Entrance animations + hover transitions match the live (Elementor `zoomIn`/fade, `0.3s` button hover, `0→target` counters).
- No regression to any other page (shared templates untouched).

## Architecture (Architect)
- **Dedicated route component:** `src/app/petrochemical-producer-edms-compliance-agent/page.tsx`
  (a static segment route wins over the `[...slug]` catch-all).
- **Reserve** the slug in `getMarketingSlugs()` so the catch-all does not also emit it.
- **Scoped styling:** a co-located CSS module (`page.module.css`) so nothing leaks into the
  shared `Reveal`/`OrderedRenderer`/home templates.
- **Motion:** animate.css-equivalent keyframes (`fadeInUp`, `fadeIn`, `zoomIn`) fired by an
  IntersectionObserver, timings matched to the live; counters via the existing `Counter`.
- **Content source:** the already-captured `content-kit` JSON + the extracted design/icon/motion tokens.

## Stories (Scrum Master) — one section = one story, QA-gated
| # | Story (section) | QA gate |
|---|---|---|
| 0 | Design/icon/motion capture + scaffold + routing reserve | scaffold builds, route served by new component |
| 1 | Hero | section screenshot ≈ live |
| 2 | About The Client (blue band) | ≈ live |
| 3 | The Problem (2-col) | ≈ live |
| 4 | What The Client Needed (icon cards) | ≈ live |
| 5 | Our Solution (numbered cards) | ≈ live |
| 6 | Key Features (tabs) | ≈ live + tab switching |
| 7 | Impact & Outcomes (stat cards) | ≈ live |
| 8 | CTA band | ≈ live |
| 9 | FAQ accordion | ≈ live + expand/collapse |
| 10 | Lead form + counters + footer | ≈ live |

**Definition of Done:** all stories pass QA; full-page diff ≈ live; build green; PR updated.
