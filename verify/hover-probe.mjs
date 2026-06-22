import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
// find the "Why leverage" section's icon-card columns
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  if(!head) return {err:'no head'};
  const sec=head.closest('section,.elementor-section,.e-con')||head.parentElement.parentElement;
  // candidate hover targets: the column boxes + icon wrappers
  const cols=[...sec.querySelectorAll('.elementor-column, .elementor-widget-wrap, .e-con-inner > div, [class*="icon-box"]')].slice(0,8);
  return {found: cols.length, classes: cols.slice(0,4).map(c=>c.className.slice(0,60))};
});
console.log('cols', JSON.stringify(r));
// hover the first icon-box-ish element and diff styles
const target = await p.evaluateHandle(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('section,.elementor-section,.e-con');
  // the icon container
  return sec.querySelector('.elementor-icon-box-icon, [class*="icon"] i, [class*="icon-box"]')?.closest('.elementor-widget, .elementor-column, .e-con') || sec.querySelector('.elementor-icon-box-wrapper');
});
const snap = async () => p.evaluate((el)=>{ if(!el) return null; const els=[el, ...el.querySelectorAll('*')].slice(0,12); return els.map(e=>{const s=getComputedStyle(e); return {tag:e.tagName, cls:(e.className||'').toString().slice(0,40), bg:s.backgroundColor, color:s.color, transform:s.transform, shadow:s.boxShadow.slice(0,30), transition:s.transition.slice(0,40)};});}, target);
const before = await snap();
await target.asElement()?.hover();
await p.waitForTimeout(600);
const after = await snap();
const diffs=[];
if(before&&after) before.forEach((b2,i)=>{const a=after[i]; ['bg','color','transform','shadow'].forEach(k=>{ if(b2[k]!==a[k]) diffs.push(`${b2.tag}.${b2.cls} ${k}: ${b2[k]} -> ${a[k]}`);});});
console.log('HOVER DIFFS:'); diffs.forEach(d=>console.log('  '+d));
console.log('transitions seen:', [...new Set((before||[]).map(x=>x.transition).filter(Boolean))]);
await b.close();
