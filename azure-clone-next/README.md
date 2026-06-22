# Azure Folio3 — Next.js Clone (scaffold)

App Router rebuild of **azure.folio3.com**, scaffolded from the `clone-kit` capture.
See `../BLUEPRINT.md` for the full architecture.

## What's wired

| Area | Status |
|---|---|
| Design system | Tailwind seeded from `clone-kit/tokens.json` (real brand colors / Plus Jakarta Sans + Poppins) |
| Layout | Sticky `Header` + mega-menu + `Footer` from the captured nav |
| Components | Hero, ServiceCardGrid, FeatureTabs, Accordion (FAQ JSON-LD), Embla Carousel, CTABanner, LogoCloud |
| Home | Hand-wired with real hero copy + assets |
| Blog | `blog/[slug]` (ISR) + index, content from captured JSON, `generateStaticParams` over real posts |
| Marketing pages | `[...slug]` catch-all renders ~200 captured pages via `CapturedRenderer` (SSG) |
| Forms | `ContactForm` (RHF + Zod) → `/api/lead` proxy → NetSuite + HubSpot (creds server-only) |
| SEO | Metadata API, `sitemap.ts`, `robots.ts`, `trailingSlash: true`, single H1 per page |

## Run

```bash
npm install
cp .env.example .env.local   # optional: tracking + CRM creds
npm run dev                  # http://localhost:3000
```

Content + images are read from `../clone-kit/` at build time. Assets are served
from `public/` (copied from `clone-kit/public/azure.folio3.com`).

## Next steps (promotion path)
- Promote high-value pages (services, industries) from the generic `CapturedRenderer`
  to bespoke layouts using the section components.
- Generate full 301 map from `../audit-output/registry.json` into `next.config.mjs`.
- Migrate blog bodies to MDX for richer formatting than the captured paragraph model.
