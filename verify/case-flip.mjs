import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-cloud-service/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const flips=[...document.querySelectorAll('.elementor-flip-box')];
  // find the section heading for the flips
  const sec = flips[0]?.closest('.elementor-section, .e-con');
  const secHead = sec? [...sec.querySelectorAll('h1,h2,h3')].map(h=>h.textContent.replace(/\s+/g,' ').trim()).find(t=>/real result|success|case stud/i.test(t)) : '';
  return { count: flips.length, secHead, cards: flips.map(f=>{
    const front=f.querySelector('.elementor-flip-box__front');
    const back=f.querySelector('.elementor-flip-box__back');
    const fimg=front?.querySelector('img'); 
    return {
      frontImg: fimg? (fimg.currentSrc||fimg.src||'').split('/').pop() : '',
      frontTitle:(front?.querySelector('.elementor-flip-box__layer__title')||{}).textContent?.replace(/\s+/g,' ').trim().slice(0,40),
      backTitle:(back?.querySelector('.elementor-flip-box__layer__title')||{}).textContent?.replace(/\s+/g,' ').trim().slice(0,40),
      backDesc:(back?.querySelector('.elementor-flip-box__layer__description')||{}).textContent?.replace(/\s+/g,' ').trim().slice(0,80),
      backBtn: back?.querySelector('a')?.textContent.trim(),
    };
  })};
});
console.log(JSON.stringify(r,null,1));
await b.close();
