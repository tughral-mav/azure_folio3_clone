import 'server-only';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import sanitizeHtml from 'sanitize-html';

const PUBLIC = path.join(process.cwd(), 'public');

/**
 * Sanitize scraped blog body HTML before it is rendered with dangerouslySetInnerHTML.
 * Strips <script>/<style>, inline event handlers and javascript: URLs (stored-XSS defense)
 * while preserving article markup (headings, lists, tables, images, links, trusted embeds).
 */
const sanitizeBody = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption', 'picture', 'source', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding', 'srcset', 'sizes'],
      a: ['href', 'name', 'target', 'rel', 'title'],
      source: ['src', 'srcset', 'type', 'media', 'sizes'],
      iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title'],
      '*': ['class', 'id'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
  });

/**
 * Add real width/height (read from the local file) + lazy/async to body <img>s.
 * Eliminates the CLS the harness flagged on blog posts — images now reserve
 * their space before load (Core Web Vitals on the traffic pages).
 */
function annotateBodyImages(html: string): string {
  return html.replace(/<img\b([^>]*?)\/?>/gi, (tag, attrs) => {
    if (/\bwidth=/.test(attrs)) return tag;
    const src = (attrs.match(/src="([^"]+)"/) || [])[1];
    let dims = '';
    if (src && src.startsWith('/')) {
      try {
        const { width, height } = imageSize(readFileSync(path.join(PUBLIC, decodeURIComponent(src.split('?')[0]))));
        if (width && height) dims = ` width="${width}" height="${height}"`;
      } catch {}
    }
    return `<img${attrs}${dims} loading="lazy" decoding="async" />`;
  });
}

/**
 * Reads the captured content models from ./content-kit (self-contained inside the app
 * so the production build/deploy has no dependency on the sibling clone-kit/ dev folder).
 * These power SSG/ISR pages with the REAL copy, headings and images pulled
 * from the live site — no retyping, no lorem ipsum.
 * NOTE: content-kit/ is the deploy copy; the capture tooling in ../clone-kit is the dev
 * working set. If you re-capture, re-sync the changed JSON into content-kit before building.
 */
const KIT = path.join(process.cwd(), 'content-kit', 'content');

export type Heading = { tag: string; text: string };
export type CapturedItem =
  | { t: 'h'; tag: string; text: string }
  | { t: 'p'; text: string }
  | { t: 'li'; text: string }
  | { t: 'img'; src: string; w: number; h: number; alt?: string }
  | { t: 'cta'; text: string; href: string | null };
export type CapturedSection = {
  items?: CapturedItem[]; // ordered content stream (Path A); when present the renderer uses it
  headings: Heading[];
  paragraphs: string[];
  listItems: string[];
  ctas: { text: string; href: string | null }[];
  images: { src: string; alt: string | null; w: number; h: number }[];
};
export type CapturedPage = {
  url: string;
  meta: {
    title: string;
    description: string | null;
    canonical: string | null;
    ogImage: string | null;
    h1Count: number;
  };
  sections: CapturedSection[];
  images: { src: string; alt: string | null }[];
  bgImages?: string[];
};

const ORIGIN = 'https://azure.folio3.com';

/** Map a captured wp URL to a local asset path under /public. */
export function localAsset(src: string | null | undefined): string {
  if (!src) return '';
  if (src.startsWith('data:')) return '';
  return src.replace(ORIGIN, '').replace(/^https?:\/\/[^/]+/, '');
}

/** Like localAsset, but RESOLVES to a file that actually exists in /public. The capture
 *  often references a responsive variant (e.g. `-300x168`) that was never downloaded
 *  while the BASE (or a larger variant) is on disk — that renders as a broken <img>.
 *  Prefer: exact src → base (suffix stripped) → largest on-disk variant. */
const _imgCache = new Map<string, string>();
export function localImg(src: string | null | undefined): string {
  const rel = localAsset(src);
  if (!rel) return '';
  const cached = _imgCache.get(rel);
  if (cached !== undefined) return cached;
  const exists = (p: string) => { try { return existsSync(path.join(PUBLIC, decodeURIComponent(p.split('?')[0]))); } catch { return false; } };
  // resolve to an ON-DISK file; if nothing matches (stale capture reference the live no
  // longer serves), return '' so callers render nothing instead of a broken <img>.
  let resolved = exists(rel) ? rel : '';
  if (!resolved) {
    const base = rel.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '');
    if (base !== rel && exists(base)) resolved = base;
    else {
      try {
        const dir = path.dirname(base);
        const stem = path.basename(base).replace(/\.[a-z0-9]+$/i, '');
        const ext = path.extname(base);
        const abs = path.join(PUBLIC, dir);
        if (existsSync(abs)) {
          const match = readdirSync(abs).filter((f) => f.startsWith(stem) && f.endsWith(ext)).sort((a, b) => b.length - a.length)[0];
          if (match) resolved = `${dir}/${match}`.replace(/\\/g, '/');
        }
      } catch { /* resolved stays '' */ }
    }
  }
  _imgCache.set(rel, resolved);
  return resolved;
}

function slugToFile(slug: string) {
  return slug.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '_') || 'home';
}

/** Live FAQ question toggles (in order) for a page, paired in the renderer with the
 *  captured answers. Extracted separately because the accordion titles aren't in the
 *  section capture. Returns [] for pages without an FAQ. */
let _faq: Record<string, string[]> | null = null;
export function getFaq(slug: string): string[] {
  if (_faq === null) {
    const f = path.join(KIT, '..', 'faq.json');
    try { _faq = existsSync(f) ? (JSON.parse(readFileSync(f, 'utf8')) as Record<string, string[]>) : {}; } catch { _faq = {}; }
  }
  return _faq[slugToFile(slug)] ?? [];
}

/** Real card-icon SVG path for a (page, card-title) — the live uses inline custom SVG
 *  icons the capture missed; extracted to /public/icons/<slug>/ + this manifest. */
let _cardIcons: Record<string, Record<string, string>> | null = null;
const iconSlug = (t: string) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
export function getCardIcon(slug: string, title: string): string {
  if (_cardIcons === null) {
    const f = path.join(KIT, '..', 'card-icons.json');
    try { _cardIcons = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {}; } catch { _cardIcons = {}; }
  }
  return _cardIcons?.[slug]?.[iconSlug(title)] ?? '';
}

/** Verified in-content link for a card/section title — extracted from the LIVE
 *  (verify/extract-links.mjs). Only titles that map to ONE consistent target across all
 *  pages are kept, so a card never gets a wrong redirect. */
let _contentLink: Record<string, string> | null = null;
const clNorm = (t: string) => (t || '').toLowerCase().replace(/&amp;|&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
export function getContentLink(title: string): string {
  if (_contentLink === null) {
    _contentLink = {};
    try {
      const raw = JSON.parse(readFileSync(path.join(KIT, '..', 'content-links.json'), 'utf8')) as Record<string, Record<string, string>>;
      const seen: Record<string, Set<string>> = {};
      for (const pageMap of Object.values(raw)) for (const [k, v] of Object.entries(pageMap)) { (seen[k] ??= new Set()).add(v); }
      for (const [k, set] of Object.entries(seen)) if (set.size === 1) _contentLink[k] = [...set][0];
    } catch { _contentLink = {}; }
  }
  return _contentLink[clNorm(title)] ?? '';
}

/** Verified "related services" links the LIVE shows in-content on a given page (service/
 *  solution pages only — case studies & posts are handled elsewhere). Used to render the
 *  "Explore More" nav section that the capture missed. Keyed by the page's own URL. */
let _clRaw: Record<string, Record<string, string>> | null = null;
const slugOfRoute = (route: string) => (route.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '_');
export function getPageLinks(url: string): { title: string; href: string }[] {
  if (_clRaw === null) { try { _clRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'content-links.json'), 'utf8')); } catch { _clRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const self = '/' + slugOfRoute(route).replace(/_/g, '-') + '/';
  const pm = _clRaw?.[slugOfRoute(route)] ?? {};
  const titleCase = (k: string) => k.replace(/\bai\b/gi, 'AI').replace(/\bbi\b/gi, 'BI').replace(/\b\w/g, (c) => c.toUpperCase());
  // generic anchor text ("here", "read more"…) carries no title — derive one from the href slug
  const generic = (k: string) => /^(here|read more|learn more|click here|read|more|view( more)?|see more|details|link|this)$/i.test(k.trim());
  const slugTitle = (href: string) => titleCase((href.replace(/\/$/, '').split('/').pop() || '').replace(/-/g, ' '));
  const seen = new Set<string>();
  return Object.entries(pm)
    .filter(([k, href]) => (k.length > 4 || generic(k)) && /^\/[a-z][a-z0-9/-]+\/?$/.test(href) && href !== self
      && !/^\/(blog|contact-us|thank-you)\//.test(href))
    .filter(([, href]) => { const h = href.replace(/\/$/, ''); if (seen.has(h)) return false; seen.add(h); return true; })
    .map(([k, href]) => ({ title: generic(k) ? slugTitle(href) : titleCase(k), href }))
    .slice(0, 12);
}

// Flip-box BACK content the capture missed (front title + back description + icon), extracted
// from the live per page (verify/extract-flips.mjs → clone-kit/flip-content.json). The renderer
// uses this to turn the matching card grid into real flip cards (front icon+title → back desc).
type FlipRec = { front: string; back: string; backTitle?: string; icon?: string; btn?: string; href?: string };
let _flipRaw: Record<string, FlipRec[]> | null = null;
export function getFlipMap(url: string): Map<string, { back: string; icon: string; href: string }> {
  if (_flipRaw === null) { try { _flipRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'flip-content.json'), 'utf8')); } catch { _flipRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const arr = _flipRaw?.[slugOfRoute(route)] ?? [];
  const m = new Map<string, { back: string; icon: string; href: string }>();
  for (const f of arr) {
    const k = clNorm(f.front);
    const back = (f.back || f.backTitle || '').trim();
    if (k && back) m.set(k, { back, icon: (f.icon || '').trim(), href: (f.href || '').trim() });
  }
  return m;
}

// n-tabs "Solutions" sections ship an eyebrow + a big intro heading (often a span the capture
// missed, e.g. "Boost Efficiency, Cut Costs & Reduce Risks"). Extracted from the live
// (verify/extract-tabheads.mjs → clone-kit/tab-intro.json) keyed by page slug: [eyebrow, heading].
let _tabIntroRaw: Record<string, string[]> | null = null;
export function getTabIntro(url: string): string[] {
  if (_tabIntroRaw === null) { try { _tabIntroRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'tab-intro.json'), 'utf8')); } catch { _tabIntroRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  return _tabIntroRaw?.[slugOfRoute(route)] ?? [];
}

// Stat counters (e.g. "98% User satisfaction", "5000+ Projects Deilvered") are Elementor counter
// widgets the capture misses entirely. Re-captured from the live (verify/extract-counters.mjs →
// clone-kit/counters.json) keyed by page slug: [{to, pre, suf, title, section}].
export type CounterRec = { to: string; pre: string; suf: string; title: string; section: string };
let _countersRaw: Record<string, CounterRec[]> | null = null;
export function getCounters(url: string): CounterRec[] {
  if (_countersRaw === null) { try { _countersRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'counters.json'), 'utf8')); } catch { _countersRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  return _countersRaw?.[slugOfRoute(route)] ?? [];
}

// Process/methodology STEPS live inside an Elementor "slides" carousel widget the capture misses.
// Re-captured (verify/extract-slides.mjs → clone-kit/process-steps.json) keyed by page slug:
// [{ section, steps:[{icon, title, desc}] }].
export type ProcessStep = { icon: string; title: string; desc: string };
export type ProcessSection = { section: string; steps: ProcessStep[] };
let _procRaw: Record<string, ProcessSection[]> | null = null;
export function getProcessSteps(url: string): ProcessSection[] {
  if (_procRaw === null) { try { _procRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'process-steps.json'), 'utf8')); } catch { _procRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  return _procRaw?.[slugOfRoute(route)] ?? [];
}

// Some card grids (e.g. services "Benefits of Choosing Folio3": Azure Databricks/Synapse/SQL…)
// are a service NAME over a photo set as a CSS background — invisible to the capture. Re-captured
// (verify/extract-card-bgs.mjs → clone-kit/card-bgs.json) keyed by page slug → { normTitle: imgPath }.
let _cardBgRaw: Record<string, Record<string, string>> | null = null;
export function getCardBgs(url: string): Map<string, string> {
  if (_cardBgRaw === null) { try { _cardBgRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'card-bgs.json'), 'utf8')); } catch { _cardBgRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const obj = _cardBgRaw?.[slugOfRoute(route)] ?? {};
  const m = new Map<string, string>();
  for (const [k, v] of Object.entries(obj)) { const local = localImg(v); if (local) m.set(k, local); }
  return m;
}

// "Trusted by Organizations Around the Globe" client-logo strip — a lazy-loaded section the
// original capture missed. Re-captured (verify/extract-trustband.mjs → clone-kit/trust-band.json).
let _trustRaw: Record<string, { heading: string; logos: string[] }> | null = null;
export function getTrustBand(url: string): { heading: string; logos: string[] } | null {
  if (_trustRaw === null) { try { _trustRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'trust-band.json'), 'utf8')); } catch { _trustRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const rec = _trustRaw?.[slugOfRoute(route)];
  if (!rec) return null;
  const logos = rec.logos.map(localImg).filter(Boolean);
  return logos.length >= 2 ? { heading: rec.heading, logos } : null;
}

// Per-page extras for the Copilot Agent pages (hero stat counters, video embeds, etc.) that the
// generic capture missed. Keyed by slugOfRoute → content-kit/agent-extras.json.
export type AgentExtras = { heroStats?: { to: number; suffix?: string; label: string }[]; video?: { youtube: string; poster: string }; aiAdvantageIcons?: string[] };
let _agentExtrasRaw: Record<string, AgentExtras> | null = null;
export function getAgentExtras(url: string): AgentExtras | null {
  if (_agentExtrasRaw === null) { try { _agentExtrasRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'agent-extras.json'), 'utf8')); } catch { _agentExtrasRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  return _agentExtrasRaw?.[slugOfRoute(route)] ?? null;
}

// Full FAQ Q&A re-captured from the live's accordion (verify/extract-faq.mjs → clone-kit/faq-full.json).
// The original capture stored questions only + the answers weren't reliably matched.
let _faqFullRaw: Record<string, { heading: string; items: { q: string; a: string }[] }> | null = null;
export function getFaqFull(url: string): { heading: string; items: { q: string; a: string }[] } | null {
  if (_faqFullRaw === null) { try { _faqFullRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'faq-full.json'), 'utf8')); } catch { _faqFullRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const rec = _faqFullRaw?.[slugOfRoute(route)];
  if (!rec || rec.items.length < 2) return null;
  // some accordion titles ship a leading icon as raw <img …> markup — strip any HTML tags.
  const clean = (s: string) => (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return { heading: clean(rec.heading), items: rec.items.map((it) => ({ q: clean(it.q), a: clean(it.a) })) };
}

// Full n-tabs widget structure re-captured from the live (verify/extract-tabs.mjs →
// clone-kit/tabs-content.json): per page, [{ section, tabs:[{label, heading, body, items, img, cta}] }].
// The renderer matches a section to its tabs by heading and renders a real tabbed panel.
export type SectionTabRec = { section: string; tabs: { label: string; heading: string; body: string; items: { title: string; body: string; icon: string }[]; img: string; cta: { text: string; href: string } | null }[] };
let _tabsRaw: Record<string, SectionTabRec[]> | null = null;
export function getPageTabs(url: string): SectionTabRec[] {
  if (_tabsRaw === null) { try { _tabsRaw = JSON.parse(readFileSync(path.join(KIT, '..', 'tabs-content.json'), 'utf8')); } catch { _tabsRaw = {}; } }
  const route = (url || '').replace(ORIGIN, '').replace(/[?#].*$/, '');
  const arr = _tabsRaw?.[slugOfRoute(route)] ?? [];
  // dedupe (each section is captured twice for responsive) by section heading
  const seen = new Set<string>();
  const uniq = arr.filter((s) => { const k = (s.section || '').toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  // resolve image paths to on-disk
  return uniq.map((s) => ({ ...s, tabs: s.tabs.map((t) => ({ ...t, img: t.img ? localImg(t.img) : '', items: t.items.map((it) => ({ ...it, icon: it.icon ? localImg(it.icon) : '' })) })) }));
}

export function getCaptured(slug: string): CapturedPage | null {
  const file = path.join(KIT, `${slugToFile(slug)}.json`);
  if (!existsSync(file)) return null;
  const data = JSON.parse(readFileSync(file, 'utf8'));
  if (data.error) return null;
  return data as CapturedPage;
}

/** List blog post slugs (drives generateStaticParams). */
export function getBlogSlugs(): string[] {
  if (!existsSync(KIT)) return [];
  return readdirSync(KIT)
    .filter((f) => f.startsWith('blog_') && f.endsWith('.json'))
    .filter((f) => !/^blog_(category|tag|author)_/.test(f))
    // drop WP custom-post-type fragments (sliders, testimonials, nested industry/service
    // cards) — their URL is nested (/blog/<type>/<item>/), not a flat post, and they have
    // no article body. Keep only real flat /blog/<slug>/ posts.
    .filter((f) => {
      try {
        const url: string = (JSON.parse(readFileSync(path.join(KIT, f), 'utf8')).url ?? '').replace(ORIGIN, '');
        const p = url.replace(/^\/blog\//, '').replace(/\/$/, '');
        return p !== '' && !p.includes('/');
      } catch { return true; }
    })
    .map((f) => f.replace(/^blog_/, '').replace(/\.json$/, '').replace(/_/g, '-'));
}

/**
 * Slugs for non-blog marketing pages (services, industries, case studies…),
 * drives the generic catch-all template's generateStaticParams.
 */
export function getMarketingSlugs(): { slug: string[] }[] {
  if (!existsSync(KIT)) return [];
  // reserved = bespoke routes that have their own app/ page (not the generic renderer)
  // NOTE: also exclude duplicate captures that resolve to a reserved URL — e.g.
  // end_to_end_bi_solution.json has url=/azure-data-analytics/ and would otherwise
  // generate that route via the catch-all and clobber the bespoke page's output.
  const RESERVED = new Set(['home', 'contact_us', 'thank_you', 'blog', 'azure_for_retail', 'azure_cloud_service', 'azure_managed_services', 'azure_data_analytics', 'end_to_end_bi_solution', 'microsoft_fabric_services', 'microsoft_power_platform_services', 'microsoft_power_platform', 'ai_scenario_library']);
  return readdirSync(KIT)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .filter((s) => !s.startsWith('blog_') && !RESERVED.has(s))
    .map((file) => {
      const data = JSON.parse(readFileSync(path.join(KIT, `${file}.json`), 'utf8'));
      // recover the real URL path so nested routes (e.g. azure-data-analytics/retail-analytics) work
      const url: string = data.url ?? data.capturedFrom ?? '';
      const segs = url.replace(ORIGIN, '').replace(/^\/|\/$/g, '').split('/').filter(Boolean);
      return { slug: segs.length ? segs : [file] };
    })
    .filter((p) => p.slug.length > 0);
}

/** Pull a usable title/excerpt/hero image for a blog post from its capture. */
/** The post's FEATURED image = og:image (the live uses it for hero + related thumbnails).
 *  Falls back to the first real content image, never the site logo. */
function featuredImage(d: CapturedPage): string {
  const isLogo = (s: string) => /folio3_by_azure|folio3[-_]azure|azure-logo\.|\/logo[-.]/i.test(s);
  if (d.meta.ogImage && !isLogo(d.meta.ogImage)) return localAsset(d.meta.ogImage);
  const img = d.images.find((i) => i.src && !i.src.startsWith('data:') && !isLogo(i.src));
  return localAsset(img?.src);
}

/** Lightweight title + featured image for a blog slug — used to render related-post cards
 *  reliably (the captured related thumbnails were lazy-load placeholders). */
function blogCardMeta(slug: string): { title: string; image: string } | null {
  const file = path.join(KIT, `blog_${slug.replace(/-/g, '_')}.json`);
  if (!existsSync(file)) return null;
  try {
    const d = JSON.parse(readFileSync(file, 'utf8')) as CapturedPage;
    const h1 = d.sections.flatMap((s) => s.headings).find((h) => h.tag === 'h1');
    const title = (h1?.text ?? d.meta.title ?? '').replace(/\s*[|–-]\s*Folio3.*$/i, '').trim();
    return title ? { title, image: featuredImage(d) } : null;
  } catch { return null; }
}

export function getBlogPost(slug: string) {
  const file = path.join(KIT, `blog_${slug.replace(/-/g, '_')}.json`);
  if (!existsSync(file)) return null;
  const data = JSON.parse(readFileSync(file, 'utf8')) as CapturedPage & {
    bodyHtml?: string;
    related?: { title: string; href: string; image?: string }[];
  };
  if ((data as { error?: string }).error) return null;
  const h1 = data.sections.flatMap((s) => s.headings).find((h) => h.tag === 'h1');
  const body = data.sections
    .flatMap((s) => s.paragraphs)
    .filter((p) => p.length > 40);
  const heroImage = featuredImage(data);
  // localize image src inside the extracted body HTML so they resolve from /public
  const bodyHtml = data.bodyHtml
    ? annotateBodyImages(
        sanitizeBody(data.bodyHtml).replace(/src="https:\/\/azure\.folio3\.com/g, 'src="').replace(/https:\/\/azure\.folio3\.com/g, '')
      )
    : '';
  return {
    slug,
    title: h1?.text ?? data.meta.title,
    description: data.meta.description,
    heroImage,
    sections: data.sections,
    body,
    bodyHtml,
    related: (data.related ?? [])
      .map((r) => {
        const href = localAsset(r.href);
        const m = href.match(/\/blog\/([^/]+)\/?$/);
        const meta = m ? blogCardMeta(m[1]) : null;
        // prefer the linked post's own title + hero (captured related data was unreliable)
        const title = meta?.title ?? (r.title && !/^\s*</.test(r.title) ? r.title : '');
        const image = meta?.image || localAsset(r.image);
        return { title, href, image };
      })
      .filter((r) => r.href && r.title && r.title !== (h1?.text ?? data.meta.title)),
  };
}
