# Website Section Blocks — for CMS Setup

This is the full menu of reusable page-section "blocks" the Azure (folio3.com) site is built
from. Every page is a stack of these. Each block below lists **what it shows** and the
**fields** an editor fills in. Build each block once in the CMS with these fields.

Source of truth in code: `azure-clone-next/src/components/sections/`, `.../layout/`, `.../ui/`.

---

## 1. Global (appear on every page)

| Block | What it shows | Editor fields |
|---|---|---|
| **Header / Nav** | Top logo + mega-menu + phone + "Get in Touch" button | Logo image; nav items (label → link, incl. dropdowns); phone number; button label + link |
| **Footer** | Office directory by country + policy links + logo | Per office: name, address lines, tel/support; copyright text; policy links; logo |
| **Breadcrumb** | "Home » Page" trail | (Automatic from page — usually no fields) |

## 2. Hero / Banner (top of a page)

| Block | What it shows | Editor fields |
|---|---|---|
| **Hero / Banner** | Eyebrow + big headline + subtitle + buttons + illustration | Eyebrow; headline (+ highlighted part); subtitle; up to 3 buttons (label + link); illustration image; background image |
| **Hero Slider** (home) | Rotating hero slides | Per slide: headline, subtitle, image, button(s) |

## 3. Trust / Logos

| Block | What it shows | Editor fields |
|---|---|---|
| **Trusted-by Logo Strip** | Heading + row of client logos | Heading; list of logos (image + name) |
| **Awards & Recognition** | Blue band of certification badges (carousel) | List of badge images |
| **Partner Designations** | Microsoft partner badges | List of badge images |

## 4. Content sections

| Block | What it shows | Editor fields |
|---|---|---|
| **Feature / Icon Card Grid** | Heading + subtitle + cards (icon + title + text) | Heading; subtitle; cards: icon, title, description, optional link |
| **Pain-Points / Challenges Grid** | Row of cards (icon + short title) on a tinted band | Heading; subtitle; items: icon + short title |
| **Comparison Table** | Two columns ("Traditional" vs "Ours") with rows | Heading; subtitle; left column label + rows; right column label + rows |
| **Tabbed Section** (Services/Solutions) | Tab bar + a panel per tab (features + image) | Section heading; per tab: label, heading, intro, sub-features (icon + title + desc), illustration image, button |
| **Process Steps** | Numbered steps (icon + title + text) | Heading + subtitle; per step: icon, title, description |
| **Flip Cards** | Cards that flip on hover (front icon+title → back text) | Per card: icon, front title, back description, optional link |
| **Industry Showcase** | Grid of industry image cards with hover caption | Per card: image, name, hover caption, link |
| **Feature Groups** | Alternating image-left / image-right blocks | Per block: image, heading, text, bullet list |
| **Video Embed** | Heading + poster image + YouTube video | Heading; poster image; YouTube link |
| **Stat Counters** | Row of animated numbers | Per stat: value, prefix/suffix, label |

## 5. Case-study sections

| Block | What it shows | Editor fields |
|---|---|---|
| **About The Client** | Blue banner: icon facts + heading + description | Facts (location / industry / size); client name; description |
| **The Problem / Challenges** | Left panel (icon + heading + text + button) + numbered challenge list | Eyebrow; heading; description; button; challenge items |
| **Our Solution** | Eyebrow + heading + intro + numbered feature cards | Eyebrow; heading; intro; feature items (title + description); button |
| **Business Outcomes** | Cards with a stat or icon + label | Intro; outcomes (icon or stat + label); button |
| **Real Results / Case Grid** | Case-study cards (image + title + Read More) | Per card: image, title, short text, link |

## 6. Blog

| Block | What it shows | Editor fields |
|---|---|---|
| **Blog Category List** | CATEGORIES sidebar + filtered post cards (image + title + excerpt) | Categories (label → posts); posts pull title/excerpt/image automatically |
| **Article Body** | The post content + table of contents | Rich-text body; featured image; title; meta (description) |

## 7. Conversion / CTA

| Block | What it shows | Editor fields |
|---|---|---|
| **CTA Band** | Blue band: heading + subtitle + button | Heading; subtitle; button (label + link) |
| **Schedule a 1:1 Call** | Heading + lead form + offices map + stats | Heading; intro; form fields; map image; stat counters |
| **FAQ / Accordion** | Expandable Q&A list | Heading; Q&A items (question + answer) |
| **Explore More / Related** | Cards linking to related pages | Heading; related items (title + link, image optional) |

---

### Notes for the CMS team
- **Fields are shared across blocks:** almost everything is built from *heading, subtitle, text, image, icon, button (label+link), and repeatable item lists*. Design those field types once and reuse.
- **Icons** are small SVGs; **illustrations/photos** are larger images — treat as two field types.
- **Buttons** are always `label + link` (some link to an in-page form anchor `#pgForm`).
- **Repeatable items** (cards, tabs, steps, FAQ, offices) should be add/remove/reorder lists.
- Every page should have exactly **one H1** (the hero headline) for SEO.
