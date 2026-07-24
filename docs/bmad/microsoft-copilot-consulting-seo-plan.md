# BMAD Plan — SEO optimise /data-science-ai/microsoft-copilot-consulting/

Task: On-page SEO for the Microsoft Copilot Consulting page.
Date started: 2026-07-24
Branch: `claude/microsoft-copilot-seo-7d0c8k` (working tree was clean, on this branch, no foreign changes)
Target URL: https://azure.folio3.com/data-science-ai/microsoft-copilot-consulting/
Page data file: `azure-clone-next/content-kit/content/data_science_ai_microsoft_copilot_consulting.json`

STATUS: Awaiting user approval of the change list (CHECKPOINT before any edit).

---

## ANALYST — what is actually on disk (quoted, not assumed)

Renderer path: this page has `sections[].items[]` populated → renders through
**OrderedRenderer** (modern, animated path). Confirmed via
`CapturedRenderer.tsx:66`.

- **Title tag** source = `meta.title` (route strips a trailing "| Folio3"
  brand, layout appends "%s | Folio3 Azure"). Current:
  `"Strategic Microsoft Copilot Consulting Services for AI"` (54 chars).
- **Meta description** source = `meta.description`. Current (141 chars):
  `"Unlock unparalleled productivity with expert Microsoft Copilot consulting. Securely integrate AI, and optimize workflows for your enterprise."`
- **H1** (section 1): `"Accelerate Productivity & Enterprise Transformation With Copilot AI"`
  — does NOT contain the exact phrase "Microsoft Copilot Consulting".
- **Hero subhead** (section 1) is an **h2**: `"Make your tasks easier and more efficient…"`.
  Section 1 ships `[h1, h2, cta, img]`. Because the parser opens a new unit on
  every heading, the hero subhead (`h1u.paras[0]` at OrderedRenderer.tsx:141)
  is **empty → the subhead is currently DROPPED / invisible** (same failure the
  render contract flags for savills.json).
- Section 6 h2 contains a **typo**: "Microsoft **Coplitot** Consulting".
- **No FAQ** exists for this page in either `content-kit/faq.json` or
  `content-kit/faq-full.json`. Adding a `faq-full.json` entry (key
  `data_science_ai_microsoft_copilot_consulting`, ≥2 items) renders a visible
  accordion (fallback at OrderedRenderer.tsx:718) **and emits FAQPage JSON-LD**
  (Accordion.tsx) — pure-data, high SEO/AEO value.
- Existing sections already cover: 6 challenge cards, 9 service cards (Strategy,
  Readiness Assessment, Use-Case ID, Custom Solutions, Implementation &
  Integration, Licensing & Access, Governance & Compliance, Support), "Copilot
  in Action" (Word/Excel/Teams/Outlook/PowerPoint/D365/Power Platform/Security),
  awards, 2 case studies (Savills, Food Verification).

## ANALYST — performance / keyword data

GSC via Windsor.ai = blocked (free-plan account limit). GSC via Ahrefs project
"Azure.folio3" (id 6290224) = **no GSC data connected** for any range. Ahrefs
**organic keywords for this exact URL = EMPTY** — the page currently ranks for
nothing / has ~zero organic visibility. That is the headline problem.

Keyword demand (Ahrefs Keywords Explorer, US / global), commercial cluster —
low difficulty, winnable:

| Keyword | US vol | Global | KD | Note |
|---|---|---|---|---|
| microsoft copilot consulting | 300 | 800 | 0 | PRIMARY, CPC $10, parent topic |
| copilot consulting services | 200 | 200 | — | |
| copilot implementation services | 150 | 150 | — | |
| microsoft copilot implementation | 150 | 250 | — | |
| copilot consulting | 100 | 450 | 8 | |
| microsoft copilot consultant | 80 | 250 | — | |
| microsoft copilot readiness assessment | 70 | 350 | — | page already has this section |
| microsoft 365 copilot consulting | 30 | 40 | 0 | |

Supporting/FAQ demand: microsoft copilot training (900, KD16), microsoft copilot
agents (1100, KD29), microsoft security copilot (1400, KD30), copilot pricing/
cost/license (800–1300), microsoft copilot vs chatgpt (1100, KD40).
Head terms (microsoft copilot 514k, login, download, "what is") are
informational/product at KD 88–96 → NOT targets for a consulting landing page.

## PM — goal & acceptance criteria

Goal: make this page eligible to rank for the "microsoft copilot consulting"
commercial cluster by fixing title/H1 keyword mismatch, restoring the dropped
hero subhead, tightening on-page keyword coverage, and adding an FAQ (with
schema) — CONTENT/DATA ONLY, no component code, no design change, no URL change.

Acceptance:
- Title tag leads with the exact primary keyword; ≤ ~60 chars visible.
- H1 contains "Microsoft Copilot Consulting".
- Hero subhead renders (h2→p fix) and is keyword-relevant.
- Typo "Coplitot" fixed.
- FAQ with ≥ 4 Q&As renders + FAQPage JSON-LD present.
- Build passes; page renders; hero image + Reveal present; 0 console errors;
  0 fallback checkmark icons introduced; no dropped headings/paras; images 200.

## ARCHITECT — smallest change

All edits are in `content-kit/` JSON. No component/TS edits. Two files:
1. `content/data_science_ai_microsoft_copilot_consulting.json` — meta.title,
   meta.description, hero h1 text, hero h2→p (subhead), typo fix, 1–2 intro
   keyword insertions.
2. `faq-full.json` — add one key with 6 Q&As (surgical, minified, single key).

## SM — stories
- S1: Title tag + meta description.
- S2: Hero H1 keyword + hero subhead h2→p restore.
- S3: Typo fix + light intro keyword insertions.
- S4: New FAQ (faq-full.json) + verify FAQPage schema.

## DEV — executed 2026-07-24 (user approved all 6)
- S1: meta.title → "Microsoft Copilot Consulting & Implementation Services";
  meta.description → new 156-char version. (page JSON)
- S2: hero H1 → "Microsoft Copilot Consulting Services to Accelerate Enterprise
  Transformation"; hero subhead h2→p (now renders) with keyword-enriched copy.
  Legacy headings[] kept consistent.
- S3: typo "Coplitot" → "Copilot" (both items[] + legacy copy).
- S4: added faq-full.json key `data_science_ai_microsoft_copilot_consulting`
  (6 Q&As), inserted surgically into the minified file (no reformat).

## QA — Playwright against `npm run build` + `npm start` (localhost:3210)
- HTTP 200; TITLE = "Microsoft Copilot Consulting & Implementation Services |
  Folio3 Azure"; META DESC correct; CANONICAL unchanged (URL not changed).
- H1 = new value; hero illustration present WITH Reveal (zoomIn) wrapper.
- Hero subhead now RENDERS (previously dropped).
- 48 headings + 35 paragraphs from JSON all present in DOM (2 "misses" are the
  breadcrumb — rendered by the layout with different separators — and the footer
  privacy line, which comes from the shared footer component, not page JSON).
- FAQPage JSON-LD present with 6 questions; accordion visible.
- Images: 60 checked, 0 broken. Internal links: 7 checked, 0 broken.
- #pgForm = 1, "Schedule a 1:1 Call Today" appears once — no duplication.
- 0 console errors. Build green.
- KNOWN PRE-EXISTING (NOT changed, NOT in approved scope): this page has no
  entry in card-icons.json (only 22 of 245 pages do), so its cards render the
  generic fallback icon. No card titles were renamed, so nothing was orphaned.
  Flagged to user as an optional follow-up.

## Decisions made on the user's behalf
- Used Ahrefs organic + keyword data as the performance source because the GSC
  connectors were unavailable (Windsor free-plan cap; Ahrefs project has no GSC
  link). Flagged to user.
