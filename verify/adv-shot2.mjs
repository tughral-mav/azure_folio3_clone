import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://localhost:3000/data-warehousing-as-a-service/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1500);
// scroll so the first card row is centered
const info=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(h=>/folio3 advantage/i.test(h.textContent));const sec=h?.closest('section');const cards=sec?[...sec.querySelectorAll('.relative.h-56,[class*="h-56"]')]:[];const firstCard=cards[0];return {cardCount:cards.length, firstTop: firstCard? Math.round(firstCard.getBoundingClientRect().top+scrollY):0};});
await p.evaluate((y)=>scrollTo(0,Math.max(0,y-120)),info.firstTop);await p.waitForTimeout(500);
await p.screenshot({path:'verify/folio3-adv2.png',clip:{x:0,y:0,width:1440,height:560}});
console.log('flip cards found:',info.cardCount);
await b.close();
