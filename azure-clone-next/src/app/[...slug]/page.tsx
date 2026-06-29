import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaptured, getMarketingSlugs, getFaq } from '@/lib/content';
import { CapturedRenderer } from '@/components/CapturedRenderer';

// SSG for marketing pages (per BLUEPRINT.md §1.3). Unknown paths 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getMarketingSlugs();
}

/** Fallback description for pages the live site left without a meta description
 *  (an SEO improvement over the original): H1 + first substantive paragraph. */
function deriveDescription(page: NonNullable<ReturnType<typeof getCaptured>>, title: string): string {
  const h1 = page.sections.flatMap((s) => s.headings).find((h) => h.tag === 'h1')?.text ?? '';
  const para = page.sections.flatMap((s) => s.paragraphs).find((p) => p.length > 60) ?? '';
  const derived = `${h1}${h1 && para ? ' — ' : ''}${para}`.replace(/\s+/g, ' ').trim();
  // never empty — guarantees every page has a meta description
  return (derived || `${title} — Microsoft Azure cloud, data and AI services from Folio3, a Microsoft Solutions Partner.`).slice(0, 158);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaptured(slug.join('/'));
  if (!page) return {};
  const description = page.meta.description ?? deriveDescription(page, titleFromSlug(slug));
  // Captured titles sometimes already carry "| Folio3" branding; strip it so the
  // layout template ("%s | Folio3 Azure") doesn't double the brand up.
  const title = page.meta.title.replace(/\s*[|–—-]\s*Folio3(\s*Azure)?\s*$/i, '').trim() || page.meta.title;
  // per-page OG image (resolved against metadataBase) instead of the generic homepage hero
  const ogImage = page.meta.ogImage?.replace(/^https?:\/\/[^/]+/, '') || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/${slug.join('/')}/` },
    openGraph: { title, description, type: 'website', url: `/${slug.join('/')}/`, ...(ogImage ? { images: [ogImage] } : {}) },
  };
}

function titleFromSlug(slug: string[]) {
  return slug[slug.length - 1]
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getCaptured(slug.join('/'));
  if (!page) notFound();
  const title = titleFromSlug(slug);

  // Per-page structured data (matches the live site's Yoast graph): WebPage + BreadcrumbList,
  // referencing the site-wide WebSite/Organization (in layout.tsx) by @id. Invisible to users —
  // pure machine-readable metadata for search engines and AI. Closes the parity gap where the
  // live emits these on every page but the clone previously only did on blog posts.
  const ORIGIN = 'https://azure.folio3.com';
  const pageUrl = `${ORIGIN}/${slug.join('/')}/`;
  const cleanTitle = page.meta.title.replace(/\s*[|–—-]\s*Folio3(\s*Azure)?\s*$/i, '').trim() || title;
  const description = page.meta.description ?? deriveDescription(page, title);
  const ogPath = page.meta.ogImage ? page.meta.ogImage.replace(/^https?:\/\/[^/]+/, '') : '';
  const ogImage = ogPath ? `${ORIGIN}${ogPath.startsWith('/') ? '' : '/'}${ogPath}` : undefined;
  // breadcrumb trail: Home » [parent segments…] » current page (mirrors the visible breadcrumb)
  const crumbName = cleanTitle.split(/\s[|–—-]\s/)[0].trim() || cleanTitle; // drop long SEO suffix for the trail
  const crumbs = [{ name: 'Home', url: `${ORIGIN}/` }];
  slug.forEach((seg, i) => {
    crumbs.push({
      name: i === slug.length - 1
        ? crumbName
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAi\b/g, 'AI').replace(/\bBi\b/g, 'BI'),
      url: `${ORIGIN}/${slug.slice(0, i + 1).join('/')}/`,
    });
  });
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: cleanTitle,
    description,
    isPartOf: { '@id': `${ORIGIN}/#website` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
    ...(ogImage ? { primaryImageOfPage: { '@type': 'ImageObject', url: ogImage } } : {}),
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <CapturedRenderer page={page} title={title} slug={slug[slug.length - 1]} faq={getFaq(slug.join('/'))} />
    </>
  );
}
