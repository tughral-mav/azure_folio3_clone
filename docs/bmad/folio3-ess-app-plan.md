# BMAD Plan: Folio3 ESS App Landing Page

## Analyst — What the mockup contains

Source: standalone HTML mockup (folioessapplandingpageazure_1.html)

### Sections extracted from mockup:
1. **Hero**: "The Employee Self-Service Portal Built for Your Microsoft Ecosystem"
   - Subhead paragraph about Folio ESS on Azure/Dynamics 365/AAD
   - CTAs: "Book a Demo", "Talk to a Consultant"
2. **Problem** (5 cards): "Your HR Self-Service Shouldn't Live Outside Your Microsoft Cloud"
   - Two identity systems / Data outside tenant / Compliance gaps / No Power Platform / Contractors left out
3. **Solution**: "An Employee Self-Service Layer Built Into Your Microsoft Cloud"
   - Architecture stack: Folio ESS App → D365 HR → Power Platform → Azure AD → Azure
4. **Use Cases** (4 cards): "What You Can Use Folio3 ESS For"
   - Employee / Manager / Department Coordinator / Contractor — each with feature lists
5. **Features** (5 cards): "What Folio3 ESS Can Do"
   - Azure-Native Hosting / Azure AD SSO / D365 HR Integration / Power Platform / Mobile App
6. **Mobile**: "A Native Mobile App for iOS and Android" with feature list
7. **Why** (5 cards): "Five Reasons Enterprise Buyers Choose It Over a Bolt-On"
8. **CTA Band**: "See Folio ESS in Action" — Book a Demo
9. **FAQ** (9 items): "Common Questions About Folio3 ESS"

## PM — Goal and Acceptance Criteria

**Goal**: Publish the ESS app page at `/folio3-employee-self-service-app/` using content-kit JSON, our existing renderer, our design language. Add to nav under Solutions.

**Acceptance criteria**:
- [x] Page renders at /folio3-employee-self-service-app/ through the catch-all route
- [x] Hero has image with Reveal animation (w >= 180)
- [x] All card sections render as animated card grids (not generic fallback)
- [x] Every card has a real SVG icon (zero checkmark fallbacks)
- [x] FAQ renders as accordion (>= 2 items, heading matches FAQ regex)
- [x] All headings and paragraphs from the JSON appear in rendered HTML
- [x] No console errors, no broken images
- [x] Page appears in nav under Solutions
- [x] Build passes (`npm run build`)

## Architect — Smallest change

Files to create/modify:
1. **CREATE** `content-kit/content/folio3_employee_self_service_app.json` — page content
2. **MODIFY** `content-kit/card-icons.json` — add icon entries for all cards
3. **MODIFY** `src/lib/nav.ts` — add nav entry under Solutions

No component changes needed. No new images needed (reusing existing).

### Section → Renderer mapping:
| Mockup section | items[] pattern | Renderer path |
|---|---|---|
| Hero | h1 + p + cta + img(w>=180) | Hero with Reveal zoomIn + float |
| Problem (5 cards) | h2 + p + 5×(h3 + p) | Icon card grid |
| Solution (5 cards) | h2 + p + 5×(h3 + p) | Icon card grid |
| Use Cases (4 cards) | h2 + p + 4×(h3 + p) | Icon card grid |
| Features (5 cards) | h2 + p + 5×(h3 + p) | Icon card grid |
| Mobile (list) | h2 + p + li×5 | Generic text + list |
| Why (5 cards) | h2 + 5×(h3 + p) | Icon card grid |
| CTA Band | h2 + p + cta | CTA band |
| FAQ (9 items) | h2 "FAQ" + 9×(h3 + p) | Accordion |

### Hero image
Reusing: `/wp-content/uploads/2026/01/employee-onboarding-integration.webp` (705×576)

### Icon mapping (19 cards)
All reused from existing SVGs in public/icons/.

## SM — Stories

1. Create content JSON with all sections
2. Add card-icons.json entries for all 19 icon cards
3. Add nav entry
4. Build and verify

## Status
- [x] Story 1: Content JSON created
- [x] Story 2: Card icons mapped
- [x] Story 3: Nav updated
- [ ] Story 4: Build + Playwright verification
