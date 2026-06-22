import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0',viewport:{width:1440,height:1100}});
await p.goto('https://azure.folio3.com/azure-for-retail/',{waitUntil:'load',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+600){clearInterval(t);r();}},50);});});
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('*').forEach(el=>{const bg=getComputedStyle(el).backgroundImage;if(bg&&bg.includes('azure-healthcare-header-bg')){let s=el.closest('section,.elementor-section,.e-con');let h='';while(s){const hh=s.querySelector('h1,h2,h3');if(hh){h=hh.textContent.replace(/\s+/g,' ').trim().slice(0,40);break;}s=s.parentElement;}out.push(h||el.className.slice(0,40));}});return [...new Set(out)];});
console.log('used in section(s):', JSON.stringify(r)); await b.close();
