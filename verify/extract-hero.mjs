import { readFileSync } from 'node:fs';
const html = readFileSync('verify/recruit.html', 'utf8');
// hero buttons: anchors whose text matches the 3 labels
const re = /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
let m; const seen = new Set();
console.log('=== hero buttons ===');
while ((m = re.exec(html))) {
  const txt = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (/request a callback|view on appsource|video demo/i.test(txt)) {
    const k = txt.toLowerCase();
    if (!seen.has(k)) { seen.add(k); console.log(`"${txt}" -> ${m[1]}`); }
  }
}
// candidate hero illustration images
const imgs = [...html.matchAll(/wp-content\/uploads\/[^"'\s)]+\.(?:webp|png|jpg|jpeg|svg)/gi)]
  .map((x) => x[0].split('/').pop());
const hero = [...new Set(imgs)].filter((s) => /recruit|hero|banner|agent|copilot/i.test(s)).slice(0, 10);
console.log('=== candidate hero imgs ===');
console.log(hero.join('\n'));
