import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000},userAgent:UA});
await p.goto('https://azure.folio3.com/contact-us/',{waitUntil:'load',timeout:90000});
await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{
  const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
  const out=[];
  document.querySelectorAll('h1,h2,h3,h4,.elementor-heading-title,.elementor-button-text,p').forEach(e=>{const t=txt(e);if(t&&t.length>2&&t.length<140&&!out.includes(t))out.push((e.tagName||'')+': '+t);});
  return out.slice(0,30);
});
r.forEach(t=>console.log('  '+t));
await b.close();
