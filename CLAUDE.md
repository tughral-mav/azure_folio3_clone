# Project: azure.folio3.com clone (Next.js)

A pixel-perfect clone of https://azure.folio3.com, built with Next.js 15
(App Router, TypeScript, Tailwind) and deployed to Vercel. This file tells you
how to make safe changes when someone requests one via `@claude` on an issue/PR.

## Repository layout
- The Next.js app lives in **`azure-clone-next/`** (NOT the repo root) — run all
  `npm` commands from there.
- Page **content** (headings, paragraphs, stats, image references, tab labels)
  is data-driven and lives in **`azure-clone-next/content-kit/`**. Editing the
  JSON there is how most text / number / image changes are made.
- Shared UI components: `azure-clone-next/src/components/`.
- Images are served from `azure-clone-next/public/wp-content/uploads/`.

## How to make a change safely — READ THIS
1. Make the **smallest possible edit** that satisfies the request. Do not
   refactor, rename, or "improve" unrelated things.
2. For a text / number / image change, prefer editing the data in
   `content-kit/` over changing component code.
3. **Always verify the build before finishing:**
   ```
   cd azure-clone-next
   npm ci
   npm run build
   ```
   If the build fails, fix the cause — never open a PR with a broken build.
4. In the PR description, explain what changed in **plain, non-technical
   language** and list which page(s) are affected.
5. Land changes as a **Pull Request** (never push straight to `master`) so the
   Vercel preview can be reviewed before it goes live.

## Do NOT touch unless explicitly asked
- The **home page** is approved and signed off — leave it alone unless the
  request is specifically about the home page.
- Production-sensitive areas: deployment config (`vercel.json`, env vars), the
  lead/CRM pipeline (`azure-clone-next/src/app/api/lead/`), and analytics.

## Useful context
- Default branch is `master`.
- A reusable set of Playwright extraction/verification scripts lives in
  `verify/` (used to pull exact text, stats, and icons from the live site).
