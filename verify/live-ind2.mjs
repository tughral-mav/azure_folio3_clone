import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:820}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,300);y+=300;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},30);});});
await p.waitForTimeout(1500);
// scroll so the FIRST industry card is in view
await p.evaluate(()=>{const c=document.querySelector('.industries-box');if(c)window.scrollTo(0,c.getBoundingClientRect().top+window.scrollY-20);});
await p.waitForTimeout(1200);
await p.screenshot({path:'verify/live_ind2.png'});
const r=await p.evaluate(()=>{const cards=[...document.querySelectorAll('.industries-box')];return cards.slice(0,5).map(c=>{const r=c.getBoundingClientRect();return {t:c.getAttribute('data-title'),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.x)};});});
console.log(JSON.stringify(r));await b.close();
