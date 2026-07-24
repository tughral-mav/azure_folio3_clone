# BMAD Plan — Thank-you page for the Contact Us form

Branch: `claude/contact-form-thank-you-page-bq9hcj`
Task slug: contact-form-thank-you-page

---

## ANALYST — what actually exists (quoted from the real files)

### The existing `/thank-you/` page is a bespoke React component, NOT data-driven
`azure-clone-next/src/app/thank-you/page.tsx`:
- Has `export const metadata` with `robots: { index: false }` and
  `alternates: { canonical: '/thank-you/' }`. **Already noindex.**
- Hero: eyebrow "Have a great day!", `<h1>Thank you for getting in touch!</h1>`,
  a paragraph, and a single `<Link href="/" class="btn-primary">Back to home</Link>`.
- Renders `<OneToOneCTA tone="dark" />` beneath the hero.
- Hero image: `/wp-content/uploads/2022/06/thankyou-right-image-300x235.png`.

So `content-kit/content/thank_you.json` is only a **captured snapshot** of the live
WordPress page; the live clone route renders the component above. The RENDER CONTRACT
(items[]/OrderedRenderer/card-icons.json) governs the **data-driven `[...slug]`
catch-all pages**, NOT bespoke component pages. This page is a component page, so
that contract does not apply here — we model on `page.tsx`.

### The contact form redirects here
`src/components/forms/ContactForm.tsx:43`:
`if (res.ok) router.push('/thank-you/');`
The same `<ContactForm />` is used on `/contact-us/` and inside `OneToOneCTA`
(which appears on many pages). So `/thank-you/` is the shared success page for
EVERY form on the site, not just contact-us.

### No gated assets, no booking links exist yet
- `find public -iname "*.pdf" …` → nothing. There is no downloadable asset in the repo.
- No Calendly / "book a call" / meetings link anywhere in `src/`.

### Out of bounds (confirmed, will not touch)
`vercel.json`, env vars, `src/app/api/lead/`, analytics/GTM. Home page signed off.

---

## PM — goal & acceptance criteria

**Goal:** A dedicated thank-you page shown after the Contact Us form is submitted,
that turns the "dead end" into a second conversion opportunity.

**Acceptance criteria:**
1. New page modelled on the existing `/thank-you/` component.
2. Includes a next-step CTA (book a call AND/OR download an asset).
3. Page is `noindex`.
4. If a gated asset is offered, the download link is wired and delivered on this page.
5. Conversion events fire on load — SPEC handed to the marketer, no analytics/GTM/api edits.
6. Verified visually with Playwright on the built page.

**Open decisions → asked via AskUserQuestion (PM checkpoint):**
- A. Standalone new URL, or also rewire the contact form to point at it?
- B. What is the gated asset (none exists in repo)?
- C. Book-a-call target URL.

---

### PM DECISIONS (confirmed by user)
- A. **New URL `/contact-us/thank-you/`, rewire ONLY the contact-us form.**
- B. **Placeholder PDF** gated asset (marketer swaps real file later).
- C. **Book-a-call CTA → existing on-page form (`#pgForm`) / contact.**

> Note on scoping the rewire: `ContactForm` is shared (contact-us page + the
> `OneToOneCTA` band on many pages). Changing its single hardcoded redirect would
> affect ALL forms. So the minimal correct edit is to add an optional
> `redirectTo` prop (default `/thank-you/`) and pass the new URL ONLY to the
> contact-us page's main form. Every other form keeps `/thank-you/`.

## ARCHITECT — smallest change
- New route `src/app/contact-us/thank-you/page.tsx` (or agreed slug), a component
  modelled on `thank-you/page.tsx`, `robots:{index:false}`.
- Reuse existing `btn-primary` / card styles and `OneToOneCTA`.
- Download: static file placed in `public/…`, linked with a plain `<a download>`.
- Conversion event: a tiny client `dataLayer.push` OR documented as spec only.

## SM — stories
1. New page `src/app/contact-us/thank-you/page.tsx` (noindex, hero + dual CTA + explore + OneToOneCTA).
2. Placeholder gated asset `public/downloads/azure-cloud-starter-guide.pdf`.
3. `ConversionBeacon` client component (fires dataLayer event on load).
4. Rewire ONLY the contact-us main form via `redirectTo` prop.

## DEV — done (all four stories implemented as above).

## QA — Playwright verification (built prod server, real DOM, PASSED)
- HTTP 200; single H1 "Thanks for reaching out!".
- All copy present in rendered DOM (hero, guide, explore, 1:1 form).
- Gated asset `/downloads/azure-cloud-starter-guide.pdf` → 200 `application/pdf`.
- "Book a call" → `#pgForm`, and `#pgForm` exists on the page.
- Hero image → 200; every internal link resolves on THIS branch (all 200).
- `<meta name="robots" content="noindex, nofollow">` present. ✓ noindex.
- `window.dataLayer` = `[{event:'generate_lead', form_location:'contact-us'}]`. ✓
- 0 console errors. Full-page screenshot reviewed — renders correctly.

## ANALYTICS SPEC (for the marketer — I did NOT touch GTM/GA4/Ads/api)
The page pushes this to the dataLayer on load:
```
{ event: 'generate_lead', form_location: 'contact-us' }
```
To turn it into a conversion, configure in GTM (no code change needed):
1. **Trigger** — Custom Event, event name = `generate_lead`.
2. **GA4 event tag** — event name `generate_lead`, param `form_location`, on that trigger.
3. **Google Ads Conversion tag** (if used) — your contact conversion, same trigger.
The event only fires on `/contact-us/thank-you/`, so it counts contact-form leads
only (the shared `/thank-you/` page does NOT push it).
