import type { MetadataRoute } from 'next';
import { getBlogSlugs, getMarketingSlugs } from '@/lib/content';

const BASE = 'https://azure.folio3.com';

// Native sitemap — replaces Yoast's sitemap_index.xml, only real routes (no ghost CPTs).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(); // build time — reflects last deploy/generation

  // bespoke routes that have their own app/ page (not produced by the generic renderer)
  const bespoke = [
    '/', '/services/', '/about-us/', '/contact-us/', '/industries/', '/blog/', '/case-studies/',
    '/azure-cloud-service/', '/azure-data-analytics/', '/azure-managed-services/', '/azure-for-retail/',
    '/microsoft-fabric-services/', '/microsoft-power-platform-services/', '/ai-scenario-library/',
  ];
  // every catch-all design page (so the sitemap covers the full site, not a hardcoded subset)
  const marketing = getMarketingSlugs().map((p) => `/${p.slug.join('/')}/`);

  const staticRoutes = Array.from(new Set([...bespoke, ...marketing])).map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const posts = getBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}
