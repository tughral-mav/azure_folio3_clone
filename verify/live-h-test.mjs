import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto('https://azure.folio3.com/azure-data-analytics/',{waitUntil:'load',timeout:90000});
await p.waitForTimeout(800);
const h1=await p.evaluate(()=>document.body.scrollHeight);
// scroll fully + wait for slick init
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(3500);
const h2=await p.evaluate(()=>document.body.scrollHeight);
const slickInit=await p.evaluate(()=>!!document.querySelector('.sliderIndustries.slick-initialized'));
const indH=await p.evaluate(()=>{const s=document.querySelector('.sliderIndustries');return s?Math.round(s.getBoundingClientRect().height):0;});
console.log('height after load:',h1,'| after scroll+wait:',h2,'| slick-initialized:',slickInit,'| slider height:',indH);
await b.close();
