import { chromium } from 'playwright';
const route = process.argv[2];
const b = await chromium.launch();
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
async function shot(url, out){ const p=await b.newPage({userAgent:UA,viewport:{width:1440,height:1000}}); await p.goto(url,{waitUntil:'load',timeout:90000}); await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},45);});}); await p.waitForTimeout(900); await p.addStyleTag({content:'.reveal{opacity:1!important;transform:none!important;animation:none!important}'}); await p.waitForTimeout(200); const h=await p.evaluate(()=>document.body.scrollHeight); await p.screenshot({path:out,fullPage:true}); await p.close(); return h; }
const lh = await shot('https://azure.folio3.com'+route, 'verify/cmp_live.png');
const ch = await shot('http://localhost:3000'+route, 'verify/cmp_clone.png');
console.log('live='+lh+' clone='+ch+' ratio='+(ch/lh).toFixed(2));
await b.close();
