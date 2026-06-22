import { chromium } from 'playwright';
const b=await chromium.launch();
async function heights(url){const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:1000}});
await p.goto(url,{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},35);});});
await p.waitForTimeout(900);
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('h2').forEach(h=>{const sec=h.closest('section,.elementor-section,.e-con');if(sec){const rect=sec.getBoundingClientRect();out.push({h:h.textContent.replace(/\s+/g,' ').trim().slice(0,38),ht:Math.round(rect.height)});}});return {total:document.body.scrollHeight,secs:out};});
await p.close();return r;}
const live=await heights('https://azure.folio3.com/azure-data-analytics/');
const clone=await heights('http://localhost:3000/azure-data-analytics/');
console.log('LIVE total',live.total,'| CLONE total',clone.total);
console.log('\nLIVE sections:');live.secs.forEach(s=>console.log('  '+String(s.ht).padStart(5)+'  '+s.h));
console.log('\nCLONE sections:');clone.secs.forEach(s=>console.log('  '+String(s.ht).padStart(5)+'  '+s.h));
await b.close();
