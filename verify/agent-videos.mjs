import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  '/ai-powered-solutions/copilot-for-recruitment/',
  '/ai-agents/smartexpense-agent/',
  '/ai-agents/it-asset-management-agent/',
  '/ai-agents/kubemonitor-agent/',
  '/ai-agents/ai-powered-ticketing-and-customer-service-agent/',
  '/ai-agents/',
];
const b=await chromium.launch();
for(const route of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1000},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'domcontentloaded',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},20);});});
    await p.waitForTimeout(1200);
    const vids=await p.evaluate(()=>{
      const txt=el=>(el?.textContent||'').replace(/\s+/g,' ').trim();
      const found=[];
      [...document.querySelectorAll('.elementor-widget-video,[data-settings]')].forEach(e=>{
        const ds=e.getAttribute('data-settings')||'';
        if(/youtube_url|vimeo_url|hosted_url|video_type/i.test(ds)){
          let j={};try{j=JSON.parse(ds);}catch{}
          const sec=e.closest('.elementor-top-section');
          const heading=sec?txt(sec.querySelector('h1,h2,.elementor-heading-title')).slice(0,45):'';
          found.push({url:j.youtube_url||j.vimeo_url||j.hosted_url||'?', poster:(j.image_overlay?.url||'').split('/').pop(), heading});
        }
      });
      // also bare iframes
      [...document.querySelectorAll('iframe[src*="youtu"],iframe[src*="vimeo"]')].forEach(f=>found.push({url:f.src,poster:'(iframe)',heading:''}));
      return found;
    });
    console.log(route+' -> '+(vids.length?JSON.stringify(vids):'NO VIDEO'));
  }catch(e){console.log(route+' -> ERR '+e.message.slice(0,40));}
  await p.close();
}
await b.close();
