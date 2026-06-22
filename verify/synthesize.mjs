/**
 * Aggregate the deterministic audit JSON (desktop + mobile) + optional visual-agent
 * findings into a master problem list at verify/problem-list.md.
 *
 * Usage: node verify/synthesize.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const load = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : []);
const desktop = load('verify/audit-desktop.json');
const mobile = load('verify/audit-mobile.json');
const visual = existsSync('verify/visual-findings.json') ? JSON.parse(readFileSync('verify/visual-findings.json', 'utf8')) : [];

const byRoute = new Map();
for (const r of desktop) byRoute.set(r.route, { route: r.route, desktop: r, mobile: null });
for (const r of mobile) { const e = byRoute.get(r.route) || { route: r.route, desktop: null, mobile: null }; e.mobile = r; byRoute.set(r.route, e); }
const vByRoute = new Map(visual.map((v) => [v.route, v]));

// drop tel: "mismatches" that are only formatting (same digits dial identically)
const telDigits = (s) => (s || '').replace(/[^\d]/g, '');
const isTelNoise = (l) => l.clone.startsWith('tel:') && l.live.split('|').every((x) => x.trim().startsWith('tel:') && telDigits(x) === telDigits(l.clone));
for (const r of [...desktop, ...mobile]) if (r.linkMismatches) r.linkMismatches = r.linkMismatches.filter((l) => !isTelNoise(l));

// merge missing images across viewports (union), keep onDisk flag
const merged = [...byRoute.values()].map((e) => {
  const d = e.desktop, m = e.mobile;
  const imgs = new Map();
  for (const src of [d, m]) for (const im of (src?.missingImages || [])) if (!imgs.has(im.path)) imgs.set(im.path, im);
  const v = vByRoute.get(e.route);
  return {
    route: e.route,
    liveStatus: d?.liveStatus ?? m?.liveStatus ?? 0,
    cloneStatus: d?.cloneStatus ?? m?.cloneStatus ?? 0,
    h1: d?.h1 ?? m?.h1,
    title: d?.title ?? m?.title,
    missingImages: [...imgs.values()],
    linkMismatches: d?.linkMismatches || [],
    visual: v || null,
  };
});

// ---- aggregate signals ----
const live404 = merged.filter((r) => r.liveStatus >= 400);
const clone404 = merged.filter((r) => r.cloneStatus >= 400);
const okPages = merged.filter((r) => r.liveStatus < 400 && r.cloneStatus < 400);
const badH1 = okPages.filter((r) => r.h1 !== 1);
const totalMissing = okPages.reduce((s, r) => s + r.missingImages.length, 0);
const totalLinks = okPages.reduce((s, r) => s + r.linkMismatches.length, 0);
const needDownload = new Set();
for (const r of okPages) for (const im of r.missingImages) if (!im.onDisk) needDownload.add(im.path);

// common link-mismatch patterns (clone->live target) across pages
const linkPat = new Map();
for (const r of okPages) for (const l of r.linkMismatches) {
  const k = `${l.text} :: ${l.clone} -> ${l.live}`;
  if (!linkPat.has(k)) linkPat.set(k, { ...l, count: 0, pages: [] });
  const e = linkPat.get(k); e.count++; if (e.pages.length < 6) e.pages.push(r.route);
}
const topLinks = [...linkPat.values()].sort((a, b) => b.count - a.count);

// most-common missing images (probably central/template assets)
const imgFreq = new Map();
for (const r of okPages) for (const im of r.missingImages) imgFreq.set(im.path, (imgFreq.get(im.path) || 0) + 1);
const topImgs = [...imgFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);

// visual structural aggregates
const withVisual = okPages.filter((r) => r.visual);
const verdictCount = (key) => withVisual.reduce((m, r) => ((m[r.visual[key]] = (m[r.visual[key]] || 0) + 1), m), {});
const dVerdicts = verdictCount('desktopVerdict');
const mVerdicts = verdictCount('mobileVerdict');
const secFreq = new Map();
for (const r of withVisual) for (const s of (r.visual.missingSections || [])) secFreq.set(s, (secFreq.get(s) || 0) + 1);
const topSecs = [...secFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);

// ---- write report ----
let md = `# Master Problem List — site-wide pixel-parity audit\n\n`;
md += `Generated from deterministic audits (desktop + mobile) over ${merged.length} routes.\n\n`;
md += `## Executive summary\n\n`;
md += `| Metric | Count |\n|---|---|\n`;
md += `| Routes audited | ${merged.length} |\n`;
md += `| Pages OK on both live+clone | ${okPages.length} |\n`;
md += `| **Total missing images** (live img not in clone) | **${totalMissing}** |\n`;
md += `| Unique images to download (not on disk) | ${needDownload.size} |\n`;
md += `| **Total link-target mismatches** | **${totalLinks}** |\n`;
md += `| Pages with H1 ≠ 1 | ${badH1.length} |\n`;
md += `| Captured pages that 404 on the LIVE | ${live404.length} |\n`;
md += `| Pages that 404 on the CLONE | ${clone404.length} |\n\n`;

md += `## Cross-cutting patterns (fix centrally)\n\n`;
md += `### A. Most common link-target mismatches (clone → should be)\n\n`;
md += `| # pages | Button text | Clone target | Live target |\n|---|---|---|---|\n`;
for (const l of topLinks.slice(0, 25)) md += `| ${l.count} | ${l.text.replace(/\|/g, '/')} | \`${l.clone}\` | \`${l.live}\` |\n`;
md += `\n### B. Most common missing images (likely template assets)\n\n`;
md += `| # pages | Image |\n|---|---|\n`;
for (const [p, n] of topImgs) md += `| ${n} | \`${p}\` |\n`;

md += `\n### C. Captured pages that do NOT exist on the live (review: drop / noindex)\n\n`;
for (const r of live404) md += `- \`${r.route}\` (live ${r.liveStatus})\n`;
if (clone404.length) { md += `\n### D. Pages failing on the CLONE\n\n`; for (const r of clone404) md += `- \`${r.route}\` (clone ${r.cloneStatus})\n`; }
if (badH1.length) { md += `\n### E. Pages with wrong H1 count\n\n`; for (const r of badH1) md += `- \`${r.route}\` → H1=${r.h1}\n`; }

if (withVisual.length) {
  md += `\n## Visual structural findings (${withVisual.length} design pages)\n\n`;
  md += `Desktop verdicts: ${Object.entries(dVerdicts).map(([k, v]) => `${k}=${v}`).join(', ')}\n\n`;
  md += `Mobile verdicts: ${Object.entries(mVerdicts).map(([k, v]) => `${k}=${v}`).join(', ')}\n\n`;
  md += `### Most common missing SECTIONS (live → absent on clone)\n\n| # pages | Section |\n|---|---|\n`;
  for (const [s, n] of topSecs) md += `| ${n} | ${s} |\n`;
}

md += `\n## Per-page detail\n\n`;
for (const r of merged.sort((a, b) => (b.missingImages.length + b.linkMismatches.length) - (a.missingImages.length + a.linkMismatches.length))) {
  if (r.liveStatus >= 400) continue;
  const issues = r.missingImages.length + r.linkMismatches.length + (r.h1 !== 1 ? 1 : 0) + (r.visual?.issues?.length || 0);
  if (!issues) continue;
  const verd = r.visual ? ` — visual: desktop=${r.visual.desktopVerdict}, mobile=${r.visual.mobileVerdict}` : '';
  md += `### \`${r.route}\`  — ${r.missingImages.length} img, ${r.linkMismatches.length} links${r.h1 !== 1 ? `, H1=${r.h1}` : ''}${verd}\n`;
  if (r.visual?.missingSections?.length) md += `- Missing sections: ${r.visual.missingSections.join(', ')}\n`;
  if (r.missingImages.length) md += `- Missing images: ${r.missingImages.map((i) => i.path.split('/').pop() + (i.onDisk ? '' : ' *DL*')).slice(0, 20).join(', ')}${r.missingImages.length > 20 ? ' …' : ''}\n`;
  for (const l of r.linkMismatches) md += `- Link "${l.text}": clone \`${l.clone}\` → live \`${l.live}\`\n`;
  if (r.visual?.issues?.length) for (const v of r.visual.issues) md += `- Visual (${v.viewport}, ${v.category}, ${v.severity}): ${v.desc}\n`;
  md += `\n`;
}

writeFileSync('verify/problem-list.md', md);
// also dump the download list
writeFileSync('verify/to-download.json', JSON.stringify([...needDownload], null, 2));
console.log(`problem-list.md written. okPages=${okPages.length} missingImg=${totalMissing} links=${totalLinks} live404=${live404.length} download=${needDownload.size}`);
