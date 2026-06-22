import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/microsoft-power-platform-services/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(700);
const r = await p.evaluate(()=>{
  const out=[];
  for(const rx of [/transforming manual workloads/i, /our microsoft power platform services for/i, /equipped to deliver/i, /into strategic advantages|why partner/i]){
    const head=[...document.querySelectorAll('h2,h3')].find(h=>rx.test(h.textContent));
    if(!head){ out.push({rx:rx.source, found:false}); continue; }
    const sec=head.closest('.elementor-section, .e-con');
    // first card after heading
    const cards=[...sec.querySelectorAll('.elementor-widget-icon-box, .elementor-icon-box-wrapper, .elementor-widget-icon-list, [class*="icon-box"]')];
    const imgs=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src||'').split('/').pop()).filter(s=>s&&!/data:|logo|^$/.test(s)).slice(0,4);
    const icons=[...sec.querySelectorAll('.elementor-icon i, .elementor-icon svg, i.fa, [class*="eicon"]')].slice(0,4).map(e=>e.className.toString().slice(0,40) || e.tagName);
    out.push({rx:rx.source.slice(0,30), found:true, iconBoxes:cards.length, imgs, fontIcons:icons});
  }
  return out;
});
console.log(JSON.stringify(r,null,1));
await b.close();
