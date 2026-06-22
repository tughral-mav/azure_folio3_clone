/** Visual gate: screenshot the clone, pixel-diff against the golden master. */
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { goldenShot, DIFF_OUT, slugOf } from './lib.mjs';

/** Crop a PNG to a top-left w×h region (returns a new PNG). */
function crop(png, w, h) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(png, out, 0, 0, w, h, 0, 0);
  return out;
}

export async function compareVisual(page, routePath) {
  const golden = goldenShot(routePath);
  if (!existsSync(golden)) return { route: routePath, ok: false, reason: 'no golden master' };

  // Full-page screenshot of the clone at the same 1440 width the master used.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(process.env.CLONE_BASE_INTERNAL || `http://localhost:3000${routePath}`, { waitUntil: 'load', timeout: 60000 });
  // settle: scroll to trigger lazy content, then back to top
  await page.evaluate(async () => {
    await new Promise((r) => { let y = 0; const t = setInterval(() => { scrollBy(0, 1000); y += 1000; if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 50); });
    scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
  const cloneBuf = await page.screenshot({ fullPage: true });

  const a = PNG.sync.read(readFileSync(golden));
  const b = PNG.sync.read(cloneBuf);

  // Diff over the common top-left region (heights differ between sites).
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const ca = a.width === w && a.height === h ? a : crop(a, w, h);
  const cb = b.width === w && b.height === h ? b : crop(b, w, h);

  const diff = new PNG({ width: w, height: h });
  // 0.2 tolerates cross-stack font anti-aliasing while still flagging real
  // layout / color / content shifts (a moved word = fully mismatched pixels).
  const mismatched = pixelmatch(ca.data, cb.data, diff.data, w, h, { threshold: 0.2, includeAA: false });
  const total = w * h;
  const matchPct = ((total - mismatched) / total) * 100;

  const diffPath = path.join(DIFF_OUT, `${slugOf(routePath)}.diff.png`);
  writeFileSync(diffPath, PNG.sync.write(diff));

  return {
    route: routePath,
    matchPct,
    goldenSize: `${a.width}x${a.height}`,
    cloneSize: `${b.width}x${b.height}`,
    comparedRegion: `${w}x${h}`,
    diffPath: path.relative(path.join(DIFF_OUT, '..', '..'), diffPath),
    ok: true,
  };
}
