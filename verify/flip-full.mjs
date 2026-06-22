import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  return [...sec.querySelectorAll('.elementor-flip-box')].map(f=>{
    const front=(f.querySelector('.elementor-flip-box__front .elementor-flip-box__layer__title')||{}).textContent?.replace(/\s+/g,' ').trim();
    const back=(f.querySelector('.elementor-flip-box__back .elementor-flip-box__layer__description')||f.querySelector('.elementor-flip-box__back .elementor-flip-box__layer__title')||{}).textContent?.replace(/\s+/g,' ').trim();
    return {front, back};
  });
});
console.log(JSON.stringify(r,null,1));
await b.close();
