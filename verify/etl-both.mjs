import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function shot(url,isLive,name){const p=await b.newPage({viewport:{width:1440,height:1200},userAgent:isLive?UA:undefined});
await p.goto(url,{waitUntil:'load',timeout:90000});await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+700){clearInterval(t);r();}},25);});});await p.waitForTimeout(1800);
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/building automated etl/i.test(e.textContent));const s=h.closest('.elementor-top-section')||h.closest('section');return s.getBoundingClientRect().top+scrollY;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy)),y);await p.waitForTimeout(700);
await p.screenshot({path:`verify/${name}.png`,clip:{x:0,y:0,width:1440,height:1019}});await p.close();}
await shot('https://azure.folio3.com/data-integration-as-a-service/',true,'etl-L');
await shot('http://localhost:3000/data-integration-as-a-service/',false,'etl-C');
await b.close();console.log('both shot');
