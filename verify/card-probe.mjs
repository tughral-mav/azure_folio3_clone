import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-cloud-service/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
// find the "Overview" section cards (icon + h3 + p)
const handle = await p.evaluateHandle(()=>{
  const head=[...document.querySelectorAll('h2')].find(h=>/^overview$/i.test(h.textContent.trim()));
  const sec=head.closest('.elementor-section, .e-con');
  // a card = an inner column/widget-wrap that contains both an icon and an h3
  const cards=[...sec.querySelectorAll('.elementor-widget-wrap, .e-con-inner, .elementor-column')].filter(el=>el.querySelector('img,svg,i') && [...el.querySelectorAll('h3')].length);
  return cards[1]||cards[0];
});
const el = handle.asElement();
const snap = async (label)=> p.evaluate((el)=>{
  if(!el) return null;
  const card=el; const s=getComputedStyle(card);
  const icon=card.querySelector('.elementor-icon, [class*="icon"]')||card.querySelector('img,svg');
  const is = icon? getComputedStyle(icon):null;
  const iconBox = icon?.closest('.elementor-icon, [class*="icon-box-icon"], [class*="icon"]')||icon;
  const ibs = iconBox? getComputedStyle(iconBox):null;
  return { card:{transform:s.transform, border:s.border.slice(0,40), borderColor:s.borderColor, boxShadow:s.boxShadow.slice(0,40), bg:s.backgroundColor, transition:s.transition.slice(0,50)},
           iconBox: ibs?{bg:ibs.backgroundColor, transform:ibs.transform, transition:ibs.transition.slice(0,40)}:null,
           icon: is?{color:is.color, fill:is.fill}:null };
}, el);
const before = await snap();
await el.hover(); await p.waitForTimeout(700);
const after = await snap();
console.log('BEFORE', JSON.stringify(before));
console.log('AFTER ', JSON.stringify(after));
await b.close();
