import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage({userAgent:'Mozilla/5.0',viewport:{width:1440,height:900}});
await p.goto('https://azure.folio3.com/azure-cloud-service/',{waitUntil:'load',timeout:90000});
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const h1=document.querySelector('h1');const sec=h1.closest('.elementor-section,.e-con');const imgs=[...sec.querySelectorAll('img')].map(i=>(i.currentSrc||i.src||'').split('/').pop());let bg='';sec.querySelectorAll('*').forEach(el=>{const b=getComputedStyle(el).backgroundImage;if(b&&b.includes('url')&&b.includes('wp-content'))bg=(b.match(/[^/]+\.(webp|png|jpg)/i)||[''])[0];});return {imgs,bg};});
console.log('live hero imgs:',JSON.stringify(r.imgs),'| live hero bg:',r.bg);await b.close();
