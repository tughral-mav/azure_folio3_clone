/**
 * azure.folio3.com — Reverse-Engineering Crawler & Architectural Auditor
 * --------------------------------------------------------------------
 * Discovers routes via sitemap_index.xml, then for a representative
 * sample of each "layout family" it:
 *   - captures rendered DOM signatures (theme / page-builder engines)
 *   - enumerates every <form>, its fields, hidden UTM trackers & action
 *   - records all network requests (3rd-party scripts, XHR endpoints)
 *   - flags heavy / unoptimized images
 *   - probes interactive components (mega-menu, tabs, sliders, accordions)
 *
 * Output: ./audit-output/*.json  (consumed when writing the blueprint)
 *
 * Run:  PLAYWRIGHT_BROWSERS_PATH=d:/AzureClone/.ms-playwright node crawl-audit.mjs
 */

import { chromium } from 'playwright';
import { XMLParser } from 'fast-xml-parser';
import { writeFileSync, mkdirSync } from 'node:fs';

const ORIGIN = 'https://azure.folio3.com';
const OUT = new URL('./audit-output/', import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, '$1');
mkdirSync(OUT, { recursive: true });

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

/* ------------------------------------------------------------------ */
/* 1. SITEMAP DISCOVERY                                                 */
/* ------------------------------------------------------------------ */
const xml = new XMLParser({ ignoreAttributes: false });

async function fetchText(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  return r.ok ? await r.text() : '';
}

async function discoverRoutes() {
  const index = xml.parse(await fetchText(`${ORIGIN}/sitemap_index.xml`));
  const subSitemaps = (index?.sitemapindex?.sitemap ?? []).map((s) => s.loc);
  const registry = {}; // group -> [urls]

  for (const sm of subSitemaps) {
    const group = sm
      .replace(`${ORIGIN}/`, '')
      .replace('-sitemap.xml', '')
      .replace('.xml', '');
    const doc = xml.parse(await fetchText(sm));
    const urls = (doc?.urlset?.url ?? []).map((u) => ({
      loc: u.loc,
      lastmod: u.lastmod ?? null,
    }));
    registry[group] = urls;
  }
  return registry;
}

/* ------------------------------------------------------------------ */
/* 2. PER-PAGE DEEP AUDIT                                               */
/* ------------------------------------------------------------------ */
async function auditPage(context, url) {
  const page = await context.newPage();
  const network = [];
  const heavyAssets = [];

  page.on('request', (req) => {
    network.push({ url: req.url(), type: req.resourceType(), method: req.method() });
  });
  page.on('response', async (res) => {
    try {
      const h = res.headers();
      const len = Number(h['content-length'] || 0);
      const ct = h['content-type'] || '';
      if (len > 150_000 && (ct.startsWith('image') || ct.includes('javascript') || ct.includes('font'))) {
        heavyAssets.push({ url: res.url(), bytes: len, type: ct });
      }
    } catch {}
  });

  const result = { url, ok: true };
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  } catch (e) {
    result.ok = false;
    result.error = String(e).slice(0, 200);
  }

  // ---- DOM / engine signature ----
  result.dom = await page.evaluate(() => {
    const classHits = {};
    const PREFIXES = ['elementor', 'wp-block', 'fusion', 'et_pb', 'vc_', 'wpb_', 'gform', 'wpcf7', 'hs-form', 'swiper', 'slick', 'owl-'];
    document.querySelectorAll('[class]').forEach((el) => {
      el.classList.forEach((c) => {
        const p = PREFIXES.find((pre) => c.startsWith(pre));
        if (p) classHits[p] = (classHits[p] || 0) + 1;
      });
    });
    const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content || null;
    return {
      title: document.title,
      generator: meta('generator'),
      bodyClasses: document.body.className.split(/\s+/).filter(Boolean).slice(0, 25),
      h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()).slice(0, 3),
      sectionCount: document.querySelectorAll('section').length,
      classEngineHits: classHits,
      hasMegaMenu: !!document.querySelector('.menu-item-has-children, .sub-menu, [class*=mega]'),
      tabBlocks: document.querySelectorAll('[role=tab], .elementor-tab-title, .et_pb_tab, [class*=tab-title]').length,
      accordions: document.querySelectorAll('.elementor-accordion, [class*=accordion], details').length,
      sliders: document.querySelectorAll('.swiper, .slick-slider, .owl-carousel, [class*=slider]').length,
      imgTotal: document.querySelectorAll('img').length,
      imgLazy: document.querySelectorAll('img[loading=lazy]').length,
      imgNoDims: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length,
    };
  });

  // ---- Forms ----
  result.forms = await page.evaluate(() => {
    return [...document.querySelectorAll('form')].map((f) => ({
      id: f.id || null,
      classes: f.className,
      action: f.getAttribute('action') || null,
      method: (f.getAttribute('method') || 'get').toLowerCase(),
      engine: f.className.includes('wpcf7') ? 'contact-form-7'
            : f.className.includes('gform') ? 'gravity-forms'
            : f.querySelector('.hs-form-field, [name^=hs]') ? 'hubspot'
            : f.className.includes('wpforms') ? 'wpforms'
            : 'unknown',
      fields: [...f.querySelectorAll('input,select,textarea')].map((i) => ({
        name: i.getAttribute('name'),
        type: i.getAttribute('type') || i.tagName.toLowerCase(),
        required: i.hasAttribute('required') || i.getAttribute('aria-required') === 'true',
        hidden: i.getAttribute('type') === 'hidden',
        placeholder: i.getAttribute('placeholder') || null,
      })),
    }));
  });

  // ---- script/iframe vendors ----
  result.vendors = await page.evaluate(() => {
    const map = {
      'googletagmanager.com': 'Google Tag Manager',
      'google-analytics.com': 'Google Analytics',
      'gtag/js': 'gtag',
      'clarity.ms': 'Microsoft Clarity',
      'hs-scripts.com': 'HubSpot',
      'hsforms': 'HubSpot Forms',
      'js.hsforms.net': 'HubSpot Forms',
      'facebook.net': 'Meta Pixel',
      'linkedin.com/px': 'LinkedIn Insight',
      'hotjar': 'Hotjar',
      'cookieyes': 'CookieYes',
      'cloudflare': 'Cloudflare',
      'wp-content/plugins': 'WP-Plugin-Asset',
      'elementor': 'Elementor',
    };
    const found = new Set();
    [...document.scripts].forEach((s) => {
      for (const k in map) if ((s.src || '').includes(k)) found.add(map[k]);
    });
    [...document.querySelectorAll('iframe,link')].forEach((n) => {
      const u = n.src || n.href || '';
      for (const k in map) if (u.includes(k)) found.add(map[k]);
    });
    // plugin folders referenced anywhere in HTML
    const plugins = new Set();
    document.querySelectorAll('link[href],script[src]').forEach((n) => {
      const m = (n.href || n.src || '').match(/wp-content\/plugins\/([^/]+)/);
      if (m) plugins.add(m[1]);
    });
    return { thirdParty: [...found], wpPlugins: [...plugins] };
  });

  result.heavyAssets = heavyAssets.sort((a, b) => b.bytes - a.bytes).slice(0, 10);
  result.network = {
    total: network.length,
    byType: network.reduce((a, r) => ((a[r.type] = (a[r.type] || 0) + 1), a), {}),
    xhr: network.filter((r) => /admin-ajax|wp-json|hubspot|api|graphql/.test(r.url)).map((r) => r.url).slice(0, 20),
  };

  await page.close();
  return result;
}

/* ------------------------------------------------------------------ */
/* 3. ORCHESTRATION                                                     */
/* ------------------------------------------------------------------ */
(async () => {
  console.log('› Discovering routes from sitemap…');
  const registry = await discoverRoutes();
  const counts = Object.fromEntries(Object.entries(registry).map(([k, v]) => [k, v.length]));
  console.log('  groups:', counts);
  writeFileSync(`${OUT}registry.json`, JSON.stringify(registry, null, 2));

  // Representative sample: home + 1-2 from each layout family + key funnels
  const sample = [
    `${ORIGIN}/`,
    `${ORIGIN}/services/`,
    `${ORIGIN}/azure-cloud-service/`,
    `${ORIGIN}/azure-data-analytics/`,
    `${ORIGIN}/azure-for-healthcare/`,
    `${ORIGIN}/azure-managed-services/`,
    `${ORIGIN}/microsoft-fabric-services/`,
    `${ORIGIN}/ai-agents/`,
    `${ORIGIN}/case-studies/`,
    `${ORIGIN}/case-studies/popcorn-producer-intellifabric-dashboards/`,
    `${ORIGIN}/blog/`,
    `${ORIGIN}/blog/what-is-microsoft-fabric/`,
    `${ORIGIN}/contact-us/`,
    `${ORIGIN}/about-us/`,
    `${ORIGIN}/power-bi-services/`,
  ];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 } });

  const audits = [];
  for (const url of sample) {
    process.stdout.write(`› Auditing ${url} … `);
    const a = await auditPage(context, url).catch((e) => ({ url, ok: false, error: String(e) }));
    audits.push(a);
    console.log(a.ok ? `forms=${a.forms?.length} engines=${Object.keys(a.dom?.classEngineHits||{}).join(',')||'—'}` : `FAIL ${a.error}`);
    writeFileSync(`${OUT}page-${url.replace(ORIGIN,'').replace(/[^a-z0-9]+/gi,'_')||'home'}.json`, JSON.stringify(a, null, 2));
  }

  // aggregate roll-up
  const allPlugins = new Set(), allVendors = new Set(), allEngines = {};
  for (const a of audits) {
    (a.vendors?.wpPlugins||[]).forEach((p)=>allPlugins.add(p));
    (a.vendors?.thirdParty||[]).forEach((v)=>allVendors.add(v));
    Object.entries(a.dom?.classEngineHits||{}).forEach(([k,v])=>allEngines[k]=(allEngines[k]||0)+v);
  }
  const summary = {
    routeCounts: counts,
    totalRoutes: Object.values(counts).reduce((a,b)=>a+b,0),
    enginesDetected: allEngines,
    wpPluginsDetected: [...allPlugins].sort(),
    thirdPartyVendors: [...allVendors].sort(),
    formsByEngine: audits.flatMap((a)=>a.forms||[]).reduce((acc,f)=>((acc[f.engine]=(acc[f.engine]||0)+1),acc),{}),
  };
  writeFileSync(`${OUT}_summary.json`, JSON.stringify(summary, null, 2));
  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(summary, null, 2));

  await browser.close();
})();
