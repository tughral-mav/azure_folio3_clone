import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { CpqScripts } from './cpq-scripts';

/**
 * The Dynamics 365 CPQ landing page is authored as a self-contained HTML file
 * (own <head>, own <style>, own <body>) so the design team can iterate on it
 * without touching the app code. To render it inside the site layout (so it
 * inherits the shared header, footer, and lead form), this server component
 * reads the file at build time, scopes every CSS selector under `.cpq-page`
 * so its class names (e.g. `.btn-primary`, `.wrap`, `.hero`) don't collide
 * with the site's Tailwind, and injects the body content and scoped style.
 * The two inline <script> IIFEs (tabs, lightbox) are re-implemented in
 * `cpq-scripts.tsx` because scripts injected via dangerouslySetInnerHTML
 * do not execute.
 */

const HTML_PATH = join(process.cwd(), 'src', 'content', 'solution-dynamics-365-cpq.html');
const HTML_SRC = readFileSync(HTML_PATH, 'utf-8');

const STYLE_RAW = HTML_SRC.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? '';
const BODY_RAW = HTML_SRC.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';
const FONTS_HREF =
  HTML_SRC.match(/<link[^>]+fonts\.googleapis\.com[^>]+href="([^"]+)"/)?.[1] ?? '';

// Strip <script> tags out of the body — CpqScripts handles that behavior.
const BODY = BODY_RAW.replace(/<script[\s\S]*?<\/script>/g, '');

const SCOPE = '.cpq-page';

/**
 * Prefix every selector in the stylesheet with `SCOPE`, so the CPQ CSS only
 * applies inside our wrapper div. Handles nested at-rules (media, supports)
 * by recursing into their body, and passes through name-based at-rules
 * (keyframes, font-face) unchanged. `:root`, `html`, and `body` map to
 * `.cpq-page` since that div is effectively the CPQ page's body.
 */
function scopeCss(css: string, scope: string): string {
  const out: string[] = [];
  let i = 0;
  const n = css.length;

  while (i < n) {
    // pass through leading whitespace + comments
    while (i < n && /\s/.test(css[i])) { out.push(css[i]); i++; }
    if (i >= n) break;
    if (css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      out.push(css.slice(i, stop));
      i = stop;
      continue;
    }

    // at-rule?
    if (css[i] === '@') {
      let j = i;
      while (j < n && css[j] !== '{' && css[j] !== ';') j++;
      const prelude = css.slice(i, j).trim();
      const atName = prelude.split(/\s+/)[0].toLowerCase();

      if (css[j] === ';' || j >= n) {
        out.push(prelude + ';');
        i = j + 1;
        continue;
      }

      // find matching '}'
      let depth = 0;
      let k = j;
      while (k < n) {
        if (css[k] === '{') depth++;
        else if (css[k] === '}') { depth--; if (depth === 0) break; }
        k++;
      }
      const body = css.slice(j + 1, k);

      const passthrough = [
        '@keyframes', '@-webkit-keyframes', '@-moz-keyframes',
        '@font-face', '@page', '@counter-style', '@font-feature-values',
      ];
      if (passthrough.includes(atName)) {
        out.push(prelude + ' {' + body + '}');
      } else {
        // @media, @supports, @container, @layer: recurse
        out.push(prelude + ' {\n' + scopeCss(body, scope) + '\n}');
      }
      i = k + 1;
      continue;
    }

    // regular rule: selectors { decls }
    let j = i;
    while (j < n && css[j] !== '{' && css[j] !== '}') j++;
    if (j >= n || css[j] !== '{') {
      out.push(css.slice(i));
      break;
    }
    const selectorList = css.slice(i, j).trim();

    let depth = 1;
    let k = j + 1;
    while (k < n && depth > 0) {
      if (css[k] === '{') depth++;
      else if (css[k] === '}') depth--;
      k++;
    }
    const declBody = css.slice(j + 1, k - 1);

    const scoped = selectorList
      .split(',')
      .map((s) => {
        const sel = s.trim();
        if (!sel) return sel;
        if (sel === ':root' || sel === 'html' || sel === 'body') return scope;
        return `${scope} ${sel}`;
      })
      .join(', ');

    out.push(scoped + ' {' + declBody + '}');
    i = k;
  }

  return out.join('');
}

const SCOPED_STYLE =
  (FONTS_HREF ? `@import url('${FONTS_HREF}');\n` : '') +
  scopeCss(STYLE_RAW, SCOPE);

export const metadata: Metadata = {
  title: 'CPQ for Dynamics 365 on the Microsoft Cloud',
  description:
    'A Configure, Price, Quote solution that runs inside your Microsoft ecosystem. Hosted on Azure, built on Dynamics 365 CRM, secured by Azure Active Directory.',
  alternates: { canonical: '/solution/dynamics-365-cpq/' },
  openGraph: {
    title: 'CPQ for Dynamics 365 on the Microsoft Cloud',
    description:
      'A Configure, Price, Quote solution that runs inside your Microsoft ecosystem. Hosted on Azure, built on Dynamics 365 CRM, secured by Azure Active Directory.',
    type: 'website',
    url: '/solution/dynamics-365-cpq/',
  },
};

export default function Page() {
  return (
    <div className="cpq-page">
      <style dangerouslySetInnerHTML={{ __html: SCOPED_STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
      <CpqScripts />
    </div>
  );
}
