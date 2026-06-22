import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:900}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
// scroll to industries heading + screenshot
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/business intelligence services for indus/i.test(x.textContent));window.scrollTo(0,h.getBoundingClientRect().top+window.scrollY-30);});
await p.waitForTimeout(800);
await p.screenshot({path:'verify/live_ind.png'});
// also dump one industries-box inner structure
const r=await p.evaluate(()=>{const box=document.querySelector('.industries-box');return {html:box?box.outerHTML.slice(0,400).replace(/\s+/g,' '):'none',imgs:box?box.querySelectorAll('img').length:0};});
console.log(JSON.stringify(r,null,1));await b.close();
