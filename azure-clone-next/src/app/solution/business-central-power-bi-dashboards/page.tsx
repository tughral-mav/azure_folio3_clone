import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { BcDashboardScripts } from './bc-scripts';

const HTML_PATH = join(
  process.cwd(),
  'src',
  'content',
  'solution-business-central-power-bi-dashboards.html'
);
const HTML_SRC = readFileSync(HTML_PATH, 'utf-8');

const STYLE_RAW = HTML_SRC.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? '';
const BODY_RAW = HTML_SRC.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] ?? '';
const FONTS_HREF =
  HTML_SRC.match(/<link[^>]+fonts\.googleapis\.com[^>]+href="([^"]+)"/)?.[1] ?? '';

const BODY = BODY_RAW.replace(/<script[\s\S]*?<\/script>/g, '');

const SCOPE = '.bc-page';

function scopeCss(css: string, scope: string): string {
  const out: string[] = [];
  let i = 0;
  const n = css.length;

  while (i < n) {
    while (i < n && /\s/.test(css[i])) { out.push(css[i]); i++; }
    if (i >= n) break;
    if (css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      out.push(css.slice(i, stop));
      i = stop;
      continue;
    }

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
        out.push(prelude + ' {\n' + scopeCss(body, scope) + '\n}');
      }
      i = k + 1;
      continue;
    }

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
  title: 'Pre-Built Reporting Dashboards |',
  description:
    'Get pre-built Power BI dashboards for Dynamics 365 Business Central to track finance, sales, inventory, purchasing, AP, and AR.',
  alternates: { canonical: '/solution/business-central-power-bi-dashboards/' },
  openGraph: {
    title: 'Power BI Dashboards for Business Central | Folio3',
    description:
      'Get pre-built Power BI dashboards for Dynamics 365 Business Central to track finance, sales, inventory, purchasing, AP, and AR.',
    type: 'website',
    url: '/solution/business-central-power-bi-dashboards/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power BI Dashboards for Business Central | Folio3',
    description:
      'Get pre-built Power BI dashboards for Dynamics 365 Business Central to track finance, sales, inventory, purchasing, AP, and AR.',
  },
};

export default function Page() {
  return (
    <>
      <div className="bc-page">
        <style dangerouslySetInnerHTML={{ __html: SCOPED_STYLE }} />
        <div dangerouslySetInnerHTML={{ __html: BODY }} />
        <BcDashboardScripts />
      </div>
      <OneToOneCTA tone="light" />
    </>
  );
}
