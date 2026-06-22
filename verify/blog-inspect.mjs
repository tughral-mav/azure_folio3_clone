import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124' , viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/blog/ai-data-governance/', { waitUntil: 'load', timeout: 90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},45);});});
await p.waitForTimeout(1200);
const r = await p.evaluate(()=>{
  const cand = ['.elementor-widget-theme-post-content','.entry-content','article .elementor-widget-container','main article','.post-content'];
  const found = cand.map(s=>({s, n: document.querySelectorAll(s).length, len: (document.querySelector(s)?.innerHTML||'').length}));
  // body images resolved?
  const cont = document.querySelector('.elementor-widget-theme-post-content') || document.querySelector('.entry-content') || document.querySelector('article');
  const imgs = cont? [...cont.querySelectorAll('img')].slice(0,4).map(im=>({src:(im.currentSrc||im.src||'').slice(-60), lazy:(im.getAttribute('data-lazy-src')||'').slice(-40)})):[];
  // related section
  const relHeads = [...document.querySelectorAll('h2,h3,h4')].filter(h=>/related|you (might|may)|more (posts|articles|blogs)/i.test(h.textContent)).map(h=>h.textContent.trim());
  return {found, imgs, relHeads};
});
console.log(JSON.stringify(r,null,1));
await b.close();
