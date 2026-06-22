import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124', viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-for-retail/', { waitUntil:'load', timeout:90000 });
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},40);});});
await p.waitForTimeout(800);
const r = await p.evaluate(()=>{
  const head=[...document.querySelectorAll('h2,h3')].find(h=>/why leverage azure/i.test(h.textContent));
  const sec=head.closest('.elementor-section, .e-con');
  // find an element near the icon (look for svg or img near "Better Understand")
  const titleEl=[...sec.querySelectorAll('*')].find(e=>/Better Understand/i.test(e.textContent) && e.children.length===0);
  // walk up to the card container, dump structure
  let card=titleEl; for(let k=0;k<4 && card.parentElement;k++) card=card.parentElement;
  // find the icon (svg/img/i) in the card
  const icon=card.querySelector('svg, img, i');
  const iconWrap=icon?.parentElement;
  // collect all classes that contain animation/hover anywhere in card subtree
  const animEls=[...card.querySelectorAll('*')].map(e=>(e.className||'').toString()).filter(c=>/animation|hover|grow|float|pulse/i.test(c));
  return {
    cardCls:(card.className||'').toString().slice(0,80),
    iconTag: icon?.tagName, iconWrapCls:(iconWrap?.className||'').toString().slice(0,80),
    animEls:[...new Set(animEls)].slice(0,6),
    cardHTML: card.outerHTML.slice(0,500).replace(/\s+/g,' ')
  };
});
console.log(JSON.stringify(r,null,1));
await b.close();
