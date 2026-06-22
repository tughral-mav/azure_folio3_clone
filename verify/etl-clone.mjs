import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1200}});
await p.goto('http://localhost:3000/data-integration-as-a-service/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});
await p.waitForTimeout(1800);
const y=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(e=>/building automated etl/i.test(e.textContent));return h?h.closest('section').getBoundingClientRect().top+scrollY:0;});
await p.evaluate((yy)=>scrollTo(0,Math.max(0,yy-30)),y);await p.waitForTimeout(700);
await p.screenshot({path:'verify/etl-clone.png',clip:{x:0,y:0,width:1440,height:760}});
await b.close();console.log('shot done');
