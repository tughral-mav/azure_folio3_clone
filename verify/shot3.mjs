import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});
await p.goto('http://localhost:3000/testimonials/',{waitUntil:'load',timeout:60000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000); await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(500);
await p.screenshot({path:'verify/testimonials-now.png', fullPage:true});
await b.close();
