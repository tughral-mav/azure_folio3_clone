import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();
async function shot(url,out,isLive){
  const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:isLive?UA:undefined});
  await p.goto(url,{waitUntil:'load',timeout:75000});
  await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,600);y+=600;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},25);});});
  await p.waitForTimeout(2500);
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(500);
  await p.screenshot({path:out,fullPage:true});
  await p.close();
}
await shot('https://azure.folio3.com/solution/intellifabric/','live_if.png',true);
await shot('http://localhost:3000/solution/intellifabric/','clone_if.png',false);
await b.close();
console.log('done');
