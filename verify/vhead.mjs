import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['ai_agents_smartexpense_agent','/ai-agents/smartexpense-agent/'],
  ['ai_agents_it_asset_management_agent','/ai-agents/it-asset-management-agent/'],
  ['ai_agents_kubemonitor_agent','/ai-agents/kubemonitor-agent/'],
  ['ai_agents_ai_powered_ticketing_and_customer_service_agent','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();const clean={};
for(const [slug,route] of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+800){clearInterval(t);r();}},22);});});
    await p.waitForTimeout(1200);
    const h=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      const vEl=[...document.querySelectorAll('[data-settings]')].find(e=>/youtube_url/i.test(e.getAttribute('data-settings')||''));
      let sec=vEl; for(let i=0;i<8&&sec;i++){sec=sec.parentElement;if(sec&&sec.querySelector('h1,h2,h3,.elementor-heading-title'))break;}
      const hs=sec?[...sec.querySelectorAll('h1,h2,h3,.elementor-heading-title')].map(txt).filter(t=>t.length>15):[];
      return hs.sort((a,b)=>b.length-a.length)[0]||'';
    });
    clean[slug]=h;
    console.log(slug.replace('ai_agents_','')+': "'+h.slice(0,70)+'"');
  }catch(e){console.log(slug+' ERR '+e.message.slice(0,40));}
  await p.close();
}
// merge clean video headings into agent-extras (display) keeping detection fuzzy
const exPath='azure-clone-next/content-kit/agent-extras.json';
const ex=JSON.parse(readFileSync(exPath,'utf8'));
for(const [slug,h] of Object.entries(clean)){if(h&&ex[slug]){ex[slug].videoHeading=h;}}
writeFileSync(exPath,JSON.stringify(ex,null,1));
await b.close();
