/**
 * Verification harness orchestrator.
 * Runs visual + content + perf + link gates against the running clone and
 * prints a red/green dashboard. Exit code 1 if any gate fails (CI-ready).
 *
 * Usage: CLONE_BASE=http://localhost:3000 node verify/run.mjs
 *        node verify/run.mjs --visual-only
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROUTES, THRESHOLDS, BASE, pct, __dirname } from './lib.mjs';
import { compareVisual } from './visual.mjs';
import { compareContent } from './content.mjs';
import { checkPerf } from './perf.mjs';
import { checkLinks } from './links.mjs';

const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', DIM = '\x1b[2m', RST = '\x1b[0m';
const mark = (ok) => (ok ? `${GREEN}PASS${RST}` : `${RED}FAIL${RST}`);

async function ensureUp() {
  try { const r = await fetch(BASE); return r.ok; } catch { return false; }
}

(async () => {
  if (!(await ensureUp())) {
    console.error(`${RED}✗ Clone not reachable at ${BASE}. Start it: cd azure-clone-next && npm start${RST}`);
    process.exit(2);
  }
  console.log(`\n${DIM}Verifying ${ROUTES.length} routes against the golden master (${BASE})${RST}\n`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const rows = [];

  for (const route of ROUTES) {
    const visual = await compareVisual(page, route).catch((e) => ({ route, ok: false, reason: String(e).slice(0, 60) }));
    const content = await compareContent(route).catch((e) => ({ route, ok: false, score: 'err', reason: String(e).slice(0, 60) }));
    const perf = await checkPerf(page, route).catch((e) => ({ route, ok: false, score: 'err' }));

    const vMatch = typeof visual.matchPct === 'number' ? visual.matchPct : 0;
    const vPass = vMatch >= THRESHOLDS.visual;
    rows.push({ route, vMatch, vPass, content, perf, visual });

    const vCol = vPass ? GREEN : vMatch > 80 ? YEL : RED;
    console.log(
      `${route.padEnd(38)} ` +
      `visual ${vCol}${pct(vMatch).padStart(6)}${RST} ${mark(vPass)}  ` +
      `content ${content.score} ${mark(content.ok)}  ` +
      `perf ${perf.score} ${mark(perf.ok)}`
    );
  }

  console.log(`\n${DIM}Crawling internal links…${RST}`);
  const links = await checkLinks();
  console.log(
    `links: crawled ${links.crawled}, discovered ${links.discovered}, ` +
    `broken ${links.broken.length}, ` +
    `anchor leaks ${links.anchorLeaks.length}  ${mark(links.ok)}`
  );

  await browser.close();

  // ---- summary ----
  const vPassN = rows.filter((r) => r.vPass).length;
  const cPassN = rows.filter((r) => r.content.ok).length;
  const pPassN = rows.filter((r) => r.perf.ok).length;
  const avgVisual = rows.reduce((a, r) => a + r.vMatch, 0) / rows.length;

  console.log(`\n${DIM}──────── SUMMARY ────────${RST}`);
  console.log(`Visual  ≥${THRESHOLDS.visual}% : ${vPassN}/${rows.length} pass  (avg ${pct(avgVisual)})`);
  console.log(`Content        : ${cPassN}/${rows.length} pass`);
  console.log(`Perf budget    : ${pPassN}/${rows.length} pass`);
  console.log(`Links          : ${links.ok ? 'clean' : links.broken.length + ' broken'}`);

  const report = { base: BASE, thresholds: THRESHOLDS, generatedRoutes: rows.length, rows, links };
  const out = path.join(__dirname, 'report.json');
  writeFileSync(out, JSON.stringify(report, null, 2));
  console.log(`\n${DIM}Full report → ${path.relative(path.join(__dirname, '..'), out)}  ·  diffs → verify/diffs/${RST}`);

  const allGreen = vPassN === rows.length && cPassN === rows.length && pPassN === rows.length && links.ok;
  console.log(allGreen ? `${GREEN}✓ ALL GATES GREEN${RST}\n` : `${YEL}● Gates not all green — expected until Phases 2–3 build pixel-perfect templates.${RST}\n`);
  process.exit(allGreen ? 0 : 1);
})();
