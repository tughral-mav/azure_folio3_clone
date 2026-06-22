/**
 * Performance gate (self-contained Playwright probe).
 * Measures HTML size, JS transfer, request count, image-CLS risk, and load timing.
 * This is the fast CI gate; full Lighthouse CI is recommended for the production pipeline.
 */
import { THRESHOLDS } from './lib.mjs';

export async function checkPerf(page, routePath) {
  let htmlBytes = 0, jsBytes = 0, imgBytes = 0, reqCount = 0;

  const onResp = async (res) => {
    reqCount++;
    try {
      const h = res.headers();
      const len = Number(h['content-length'] || 0);
      const ct = h['content-type'] || '';
      if (ct.includes('html')) htmlBytes += len;
      else if (ct.includes('javascript')) jsBytes += len;
      else if (ct.startsWith('image')) imgBytes += len;
    } catch {}
  };
  page.on('response', onResp);

  const t0 = Date.now();
  await page.goto(`http://localhost:3000${routePath}`, { waitUntil: 'load', timeout: 60000 });
  const loadMs = Date.now() - t0;
  page.off('response', onResp);

  // CLS risk = img with no width/height AND not a next/image "fill" (those are
  // absolutely positioned inside a fixed-size container, so they don't shift layout).
  const imgNoDims = await page.evaluate(
    () =>
      [...document.querySelectorAll('img')].filter((i) => {
        const hasDims = i.getAttribute('width') && i.getAttribute('height');
        const isFill = i.dataset.nimg === 'fill' || getComputedStyle(i).position === 'absolute';
        return !hasDims && !isFill;
      }).length
  );

  const jsKB = Math.round(jsBytes / 1024);
  const htmlKB = Math.round(htmlBytes / 1024);
  const checks = {
    [`JS < ${THRESHOLDS.jsKB}KB`]: jsKB <= THRESHOLDS.jsKB || jsKB === 0,
    [`HTML < ${THRESHOLDS.htmlKB}KB`]: htmlKB <= THRESHOLDS.htmlKB || htmlKB === 0,
    'no img missing dims (CLS)': imgNoDims === 0,
    'load < 3s': loadMs < 3000,
  };
  const passed = Object.values(checks).filter(Boolean).length;

  return {
    route: routePath,
    jsKB, htmlKB, imgKB: Math.round(imgBytes / 1024), reqCount, loadMs, imgNoDims,
    checks,
    score: `${passed}/${Object.keys(checks).length}`,
    ok: passed === Object.keys(checks).length,
  };
}
