import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/microsoft-power-platform-services/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(700);
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/transforming manual workloads/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  // each card: an icon-box widget with a title + an svg
  const boxes=[...sec.querySelectorAll('.elementor-widget')].filter(w=>w.querySelector('svg') && w.querySelector('h1,h2,h3,h4,h5,.elementor-icon-box-title'));
  return boxes.slice(0,2).map(w=>{
    const title=(w.querySelector('.elementor-icon-box-title, h3,h4,h5')||{}).textContent?.replace(/\s+/g,' ').trim();
    const svg=w.querySelector('svg');
    return { title, svgLen: svg.outerHTML.length, svg: svg.outerHTML.slice(0,300) };
  });
});
console.log(JSON.stringify(r,null,1));
await b.close();
