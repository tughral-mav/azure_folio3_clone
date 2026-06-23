import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/ai-powered-solutions/copilot-for-recruitment/',{waitUntil:'networkidle',timeout:90000});
await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},25);});});
await p.waitForTimeout(2000);
const out=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  // full page outline: all top-section main headings in order
  const secs=[...document.querySelectorAll('.elementor-top-section')];
  const outline=secs.map((s,i)=>{const h=s.querySelector('h1,h2,.elementor-heading-title');return {i,h:txt(h).slice(0,55)};}).filter(x=>x.h);
  // video: any iframe or <video> on the page
  const videos=[...document.querySelectorAll('iframe,video')].map(v=>({tag:v.tagName,src:(v.src||v.getAttribute('data-src')||v.querySelector?.('source')?.src||'').slice(0,120),title:v.getAttribute('title')||''}));
  // also lazy youtube placeholders
  const ytPlace=[...document.querySelectorAll('[data-src*="youtu"],[data-litespeed-src],.elementor-widget-video')].map(e=>({cls:(e.className||'').toString().slice(0,40),dataSettings:(e.getAttribute('data-settings')||'').slice(0,200)}));
  return {outline, videos, ytPlace};
});
console.log(JSON.stringify(out,null,1));
await b.close();
