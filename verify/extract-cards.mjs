import { readFileSync } from 'node:fs';
const html = readFileSync('verify/recruit.html', 'utf8');
// isolate the AI Advantage section (between its heading and the next top-section heading)
const start = html.indexOf('The AI Advantage');
const slice = html.slice(start, start + 14000);
// find icon markup: <i class="..."> or <svg ...> occurrences with their nearest following title
const titles = ['Cut Resume Screening', 'Productivity Gained', 'Lower Cost-per-Hire', 'Match the Right Talent'];
for (const t of titles) {
  const ti = slice.indexOf(t);
  if (ti < 0) { console.log(t, '-> NOT FOUND'); continue; }
  // look backwards ~1200 chars for the icon
  const before = slice.slice(Math.max(0, ti - 1400), ti);
  const iMatch = [...before.matchAll(/<i class="([^"]+)"/g)].pop();
  const svgMatch = before.includes('<svg');
  const imgMatch = [...before.matchAll(/uploads\/[^"'\s)]+\.(?:svg|png|webp)/gi)].pop();
  console.log(t, '-> i:', iMatch ? iMatch[1] : '(none)', '| svg:', svgMatch, '| img:', imgMatch ? imgMatch[0].split('/').pop() : '(none)');
}
// CTA arrow + the "Request a call" inline link style
const ctaIdx = slice.indexOf('cr-arrow');
console.log('cr-arrow context:', ctaIdx >= 0 ? slice.slice(ctaIdx - 120, ctaIdx + 40).replace(/\s+/g, ' ') : 'none');
