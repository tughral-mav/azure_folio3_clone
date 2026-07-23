import { readFileSync } from 'node:fs';

// Full 301 map generated from the URL registry (see ../scripts/gen-redirects.mjs).
const redirects = JSON.parse(readFileSync(new URL('./redirects.json', import.meta.url)));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Live site uses trailing slashes — keep parity to protect SEO canonicals.
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // the optimizer rejects SVGs by default → award badges / svg icons fail to load. Our SVGs are
    // first-party captured assets, so allow them (with a safe content-disposition).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // captured assets keep their original wp path under /wp-content/...
    remotePatterns: [{ protocol: 'https', hostname: 'azure.folio3.com' }],
  },
  // Ship the content-kit JSON with the server bundle so the blog ISR routes
  // (revalidate: 3600) can read it at runtime on Cloudflare Workers — their
  // dynamic file paths aren't picked up by Next's default output tracing.
  outputFileTracingIncludes: {
    '/blog': ['./content-kit/**/*'],
    '/blog/[slug]': ['./content-kit/**/*'],
  },
  async redirects() {
    return redirects;
  },
};
export default nextConfig;
