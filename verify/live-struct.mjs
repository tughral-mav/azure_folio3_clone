import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/azure-for-construction/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},30);});});
await p.waitForTimeout(1200);
const data=await p.evaluate(()=>{
  const txt=(el)=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const root=document.querySelector('main')||document.body;
  const isSec=(el)=>el.matches('.elementor-top-section, body > div .elementor-section');
  const tops=[...document.querySelectorAll('.elementor-top-section')];
  return tops.map((s)=>{
    const headings=[...s.querySelectorAll('h1,h2,h3,h4,h5')].map(h=>h.tagName+':'+txt(h).slice(0,45)).slice(0,8);
    const widgets={};
    s.querySelectorAll('[class*="elementor-widget-"]').forEach(w=>{const m=[...w.classList].find(c=>c.startsWith('elementor-widget-')); if(m){const t=m.replace('elementor-widget-','');widgets[t]=(widgets[t]||0)+1;}});
    const accordion=s.querySelector('.elementor-accordion, .elementor-toggle, .e-n-accordion');
    const accItems=accordion?[...accordion.querySelectorAll('.elementor-accordion-item, .elementor-toggle-item, .e-n-accordion-item summary, details')].map(i=>txt(i.querySelector('.elementor-accordion-title, .elementor-toggle-title, summary')||i).slice(0,40)).filter(Boolean):[];
    const flipFronts=[...s.querySelectorAll('.elementor-flip-box__front .elementor-flip-box__layer__title')].map(t=>txt(t).slice(0,35));
    const iconBoxTitles=[...s.querySelectorAll('.elementor-icon-box-title')].map(t=>txt(t).slice(0,35));
    return {headings, widgets:Object.entries(widgets).map(([k,v])=>k+'×'+v), accItems, flipFronts, iconBoxTitles};
  });
});
data.forEach((s,i)=>{console.log(`\n=== SECTION ${i} ===`);console.log(' headings:',s.headings.join(' | '));console.log(' widgets:',s.widgets.join(', '));if(s.accItems.length)console.log(' ACCORDION:',s.accItems.join(' | '));if(s.flipFronts.length)console.log(' FLIP:',s.flipFronts.join(' | '));if(s.iconBoxTitles.length)console.log(' ICONBOX:',s.iconBoxTitles.join(' | '));});
await b.close();
