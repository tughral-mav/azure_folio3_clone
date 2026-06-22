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
  return <CapturedRenderer page={page} title={titleFromSlug(slug)} slug={slug[slug.length - 1]} faq={getFaq(slug.join('/'))} />;
}
