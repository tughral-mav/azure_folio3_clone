/**
 * Generate the full 301 redirect map from the URL registry.
 * Ghost CPT URLs (nested custom-post-type paths) and test slugs → canonical pages.
 * Output: azure-clone-next/redirects.json (Next.js redirects() format).
 */
import { readFileSync, writeFileSync } from 'node:fs';

const ORIGIN = 'https://azure.folio3.com';
const reg = JSON.parse(readFileSync('audit-output/registry.json', 'utf8'));
const all = Object.entries(reg).flatMap(([group, urls]) => urls.map((u) => ({ group, path: u.loc.replace(ORIGIN, '') })));

// map an industry-ish keyword in a ghost slug to a canonical industry page
function industryDest(p) {
  if (/healthcare/i.test(p)) return '/azure-for-healthcare/';
  if (/retail|e-commerce/i.test(p)) return '/azure-for-retail/';
  if (/manufact/i.test(p)) return '/azure-for-manufacturing/';
  if (/logistic|transport/i.test(p)) return '/azure-for-logistics-and-transport/';
  if (/construction/i.test(p)) return '/azure-for-construction/';
  return '/industries/';
}

// per-group canonical destination for ghost CPT URLs
const GROUP_DEST = {
  our_industries: industryDest,
  our_cloud_service: () => '/azure-cloud-service/',
  our_data_analytics: () => '/azure-data-analytics/',
  our_managed_services: () => '/azure-managed-services/',
  managed_services: () => '/azure-managed-services/',
  testimonial_slider: () => '/about-us/',
  slider_item: () => '/',
};

const redirects = [];
const seen = new Set();
function add(source, destination) {
  if (source === destination || seen.has(source)) return;
  seen.add(source);
  redirects.push({ source, destination, permanent: true });
}

for (const { group, path } of all) {
  const dest = GROUP_DEST[group];
  if (dest) add(path, dest(path));
}
// blog taxonomy archives (category / tag / author) → consolidate to /blog/
// (strictly better than 404; high-value categories can later get real archive pages)
for (const { group, path } of all) {
  if ((group === 'category' || group === 'post_tag' || group === 'author') && !seen.has(path)) {
    add(path, '/blog/');
  }
}
// one-off odd pages + live page-merge redirects (verified against the live site)
// NOTE: /testimonials/ is a REAL 200 page on the live (renders testimonials.json) — do NOT redirect it.
add('/case-studies/wph-intellifabric/', '/case-studies/popcorn-producer-intellifabric-dashboards/'); // live 301
add('/microsoft-power-platform/', '/microsoft-power-platform-services/');
add('/end-to-end-bi-solution/', '/azure-data-analytics/');
// test/junk slugs explicitly (already covered by group rules, but keep explicit for clarity)
for (const { path } of all) {
  if (/(manufactring-test|e-commerce-and-retail-\d|healthcare-2|financial-services-2)/.test(path) && !seen.has(path)) {
    add(path, industryDest(path));
  }
}

writeFileSync('azure-clone-next/redirects.json', JSON.stringify(redirects, null, 2));
console.log(`Generated ${redirects.length} redirects → azure-clone-next/redirects.json`);
redirects.slice(0, 12).forEach((r) => console.log(`  ${r.source}  →  ${r.destination}`));
