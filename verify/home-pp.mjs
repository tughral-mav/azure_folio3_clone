import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // find imgs matching the missing icons + their context
  const want=/Modernize-Legacy|Automate-Manual|Power-Virtual|Automate-Integrate|Analyze-Data|Power-BI|Power-Apps|Build-Apps/i;
  const icons=[...document.querySelectorAll('img')].filter(i=>want.test(i.src||i.currentSrc||'')).map(i=>{
    const card=i.closest('[class*="column"],[class*="box"],.elementor-widget');
    return {file:(i.currentSrc||i.src).split('/').pop().split('?')[0], near:txt(card?.querySelector('h3,h4,.elementor-heading-title')||card).slice(0,30)};
  });
  // the DiscoverCloud tab section: tab labels + their Learn More hrefs
  const sec=[...document.querySelectorAll('.elementor-top-section')].find(s=>/discover cloud opportunities/i.test(txt(s.querySelector('h2'))));
  const tabLinks=sec?[...sec.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&/azure|power|managed|analytics/i.test(h)).map(h=>h.replace(/^https?:\/\/[^/]+/,'')):[];
  return {icons:icons.slice(0,16), tabLinks:[...new Set(tabLinks)]};
});
console.log('ICONS ('+r.icons.length+'):');r.icons.forEach(i=>console.log('  '+i.file+(i.near?'  ['+i.near+']':'')));
console.log('DISCOVER-CLOUD TAB LINKS:',JSON.stringify(r.tabLinks));
await b.close();
