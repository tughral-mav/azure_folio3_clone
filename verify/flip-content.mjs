import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  const flips=[...sec.querySelectorAll('.elementor-flip-box')];
  return flips.map(f=>{
    const front=f.querySelector('.elementor-flip-box__front');
    const back=f.querySelector('.elementor-flip-box__back');
    const ft=(front?.querySelector('.elementor-flip-box__layer__title')||front)?.textContent.replace(/\s+/g,' ').trim();
    const bt=(back?.querySelector('.elementor-flip-box__layer__title')||back)?.textContent.replace(/\s+/g,' ').trim();
    const bd=(back?.querySelector('.elementor-flip-box__layer__description'))?.textContent.replace(/\s+/g,' ').trim();
    const btn=back?.querySelector('a')?.getAttribute('href');
    const backBg=back? getComputedStyle(back).backgroundColor : '';
    return {front:ft?.slice(0,40), backTitle:bt?.slice(0,40), backDesc:(bd||''), btn, backBg};
  });
});
console.log(JSON.stringify(r,null,1));
await b.close();
