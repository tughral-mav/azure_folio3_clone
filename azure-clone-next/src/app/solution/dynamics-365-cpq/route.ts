import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The Dynamics 365 CPQ landing page is authored as a self-contained HTML file
 * (own <head>, own <style>, own <body>) so the design team can iterate on it
 * outside our Next.js layout. We can't drop it in /public/ because the site's
 * `[...slug]` catch-all has `dynamicParams = false` and claims the URL before
 * Next's static-file resolver would fall through to `.../index.html`.
 *
 * This route handler reads the HTML from source at build time (force-static)
 * and returns it as the response body. It bypasses the site layout entirely —
 * which matches the standalone design and is the reason the file exists outside
 * the content-kit renderer.
 */
export const dynamic = 'force-static';

const HTML = readFileSync(
  join(process.cwd(), 'src', 'content', 'solution-dynamics-365-cpq.html'),
  'utf-8',
);

export function GET() {
  return new Response(HTML, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
