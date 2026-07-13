/**
 * Persist the extracted inline SVG icons to files under public so the bespoke page can
 * reference them, and print the manifest. Icons are index-aligned with the live cards.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('azure-clone-next/public/wp-content/uploads/2026/07/pc');
mkdirSync(OUT, { recursive: true });
const icons = JSON.parse(readFileSync(path.resolve('verify/_analysis/petrochemical_producer_edms_compliance_agent.icons.json'), 'utf8'));

const groups = {
  about: icons['KSA'] || [],
  problem: icons['Manual Reporting, Unclear Status, and Avoidable Re'] || [],
  need: icons['What The Client Needed'] || [],
  sol: icons['One Grounded, Conversational Source of Truth'] || [],
};

const manifest = {};
for (const [key, arr] of Object.entries(groups)) {
  manifest[key] = [];
  arr.forEach((ic, i) => {
    // keep the SVG intact (stripping width/height also zeroed clipPath/mask rects, which
    // clipped some icons to nothing). Rendered size is controlled by the <img> + CSS instead.
    const svg = ic.svg;
    const file = `${key}-${i}.svg`;
    writeFileSync(path.join(OUT, file), svg);
    manifest[key].push({ file: `/wp-content/uploads/2026/07/pc/${file}`, title: ic.title });
  });
}
writeFileSync(path.resolve('verify/_analysis/pc-icon-manifest.json'), JSON.stringify(manifest, null, 2));
for (const [k, arr] of Object.entries(manifest)) console.log(`${k}: ${arr.map((a, i) => i + '=' + a.title.slice(0, 18)).join(', ')}`);
