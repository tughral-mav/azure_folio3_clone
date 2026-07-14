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
    // The live's clipPath rects lose their width/height on extraction (become <rect fill="white">),
    // which clips a 0x0 region and hides the whole icon. The clip only bounds to the viewBox anyway,
    // so strip clip-path refs + clipPath defs entirely (masks are left untouched). Rendered size is
    // controlled by the <img> + CSS.
    const svg = ic.svg
      .replace(/\s*clip-path="url\([^)]*\)"/g, '')
      .replace(/<clipPath\b[\s\S]*?<\/clipPath>/g, '');
    const file = `${key}-${i}.svg`;
    writeFileSync(path.join(OUT, file), svg);
    manifest[key].push({ file: `/wp-content/uploads/2026/07/pc/${file}`, title: ic.title });
  });
}
writeFileSync(path.resolve('verify/_analysis/pc-icon-manifest.json'), JSON.stringify(manifest, null, 2));
for (const [k, arr] of Object.entries(manifest)) console.log(`${k}: ${arr.map((a, i) => i + '=' + a.title.slice(0, 18)).join(', ')}`);
