import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1100}});
await p.goto('http://localhost:3000/testimonials/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000);
const secs=await p.evaluate(()=>[...document.querySelectorAll('section')].map(s=>{const h=s.querySelector('h1,h2,h3');const imgs=[...s.querySelectorAll('img')].filter(i=>i.offsetParent!==null&&i.naturalWidth>15).length;return {h:h?h.textContent.replace(/\s+/g,' ').trim().slice(0,34):'(none)',imgs};}).filter(s=>s.h!=='(none)'||s.imgs));
secs.forEach(s=>console.log(`  imgs=${s.imgs}  ${s.h}`));
await b.close();
