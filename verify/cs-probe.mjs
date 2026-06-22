import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/case-studies/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // case-study cards: links to /case-studies/* or known case slugs, with an image + title
  const cards=[...document.querySelectorAll('a[href*="case-stud"], a[href]')].filter(a=>{const h=a.getAttribute('href')||'';return /\/(savills|daraz|city-university|case-studies\/|microsoft-fabric-reporting|power-bi-financial|implementing-power-bi|copilot-implementation|azure-automated|client-success)/.test(h);}).map(a=>{const img=a.querySelector('img')||a.closest('[class*="column"],[class*="box"]')?.querySelector('img');return {href:(a.getAttribute('href')||'').replace(/^https?:\/\/[^/]+/,''), title:txt(a.querySelector('h2,h3,h4,.elementor-heading-title')||a).slice(0,40), img:img?(img.currentSrc||img.src).split('/').pop().split('?')[0]:''};}).filter(c=>c.title&&c.title.length>3);
  // dedupe by href
  const seen=new Set();const uniq=cards.filter(c=>{if(seen.has(c.href))return false;seen.add(c.href);return true;});
  return {cardCount:uniq.length, cards:uniq.slice(0,20)};
});
console.log('LIVE case-studies cards:',r.cardCount);
r.cards.forEach(c=>console.log('  '+(c.img||'(no img)').slice(0,30).padEnd(32)+' '+c.title+' → '+c.href));
await b.close();
