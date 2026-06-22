import { chromium } from 'playwright';
const b=await chromium.launch();
for(const route of ['/azure-cloud-service/','/azure-managed-services/','/azure-data-analytics/','/microsoft-fabric-services/','/microsoft-power-platform-services/','/ai-scenario-library/','/azure-for-retail/']){
  const p=await b.newPage({userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',viewport:{width:1440,height:900}});
  try{await p.goto('https://azure.folio3.com'+route,{waitUntil:'load',timeout:90000});await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>{const bc=document.querySelector('.elementor-widget-breadcrumbs, .breadcrumbs, [class*="breadcrumb"], nav[aria-label*="readcrumb" i]');if(bc)return {found:true,text:bc.textContent.replace(/\s+/g,' ').trim().slice(0,60),bg:getComputedStyle(bc.closest('.elementor-section,.e-con')||bc).backgroundColor};
    // fallback: any element with "Home »"
    const el=[...document.querySelectorAll('*')].find(e=>e.children.length<=3 && /home\s*(»|›|&raquo;)/i.test(e.textContent)&&e.textContent.length<60);return el?{found:true,text:el.textContent.replace(/\s+/g,' ').trim().slice(0,60),bg:getComputedStyle(el.closest('section,div')||el).backgroundColor}:{found:false};});
  console.log(route.padEnd(40),JSON.stringify(r));}catch(e){console.log(route,'ERR');}
  await p.close();
}
await b.close();
