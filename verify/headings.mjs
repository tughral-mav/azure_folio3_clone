import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['ai_powered_solutions_copilot_for_recruitment','/ai-powered-solutions/copilot-for-recruitment/'],
  ['ai_agents_smartexpense_agent','/ai-agents/smartexpense-agent/'],
  ['ai_agents_it_asset_management_agent','/ai-agents/it-asset-management-agent/'],
  ['ai_agents_kubemonitor_agent','/ai-agents/kubemonitor-agent/'],
  ['ai_agents_ai_powered_ticketing_and_customer_service_agent','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();const out={};
for(const [slug,route] of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1000){clearInterval(t);r();}},22);});});
    await p.waitForTimeout(1500);
    const d=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      const firstH=sec=>{const h=sec?.querySelector('h1,h2,h3,h4,h5');return txt(h);};
      // AI advantage section: contains eyebrow "The AI Advantage"
      const advEy=[...document.querySelectorAll('.elementor-heading-title,h2,h3,p,span')].find(e=>/^the ai advantage$/i.test(txt(e))||/^the ai advantage:/i.test(txt(e)));
      const advSec=advEy?.closest('.elementor-top-section');
      // video section: contains a youtube video widget
      const vEl=[...document.querySelectorAll('[data-settings]')].find(e=>/youtube_url/i.test(e.getAttribute('data-settings')||''));
      const vSec=vEl?.closest('.elementor-top-section');
      // what you get eyebrow
      const wygEy=[...document.querySelectorAll('.elementor-heading-title,h2,h3')].find(e=>/^what do you get/i.test(txt(e)));
      const wygSec=wygEy?.closest('.elementor-top-section');
      const tabCount=document.querySelectorAll('.elementor-tab-title.elementor-tab-desktop-title').length;
      return {advHeading:advSec?firstH(advSec):null, videoHeading:vSec?firstH(vSec):null, whatYouGetHeading:wygSec?txt(wygEy):null, wygSecFirstH:wygSec?firstH(wygSec):null, tabCount};
    });
    out[slug]=d;
    console.log(slug.replace('ai_agents_','').replace('ai_powered_solutions_','')+':');
    console.log('  adv:"'+d.advHeading+'" video:"'+(d.videoHeading||'').slice(0,40)+'" wyg-eyebrow:"'+(d.whatYouGetHeading||'')+'" wyg-firstH:"'+(d.wygSecFirstH||'').slice(0,30)+'" tabs:'+d.tabCount);
  }catch(e){console.log(slug+' ERR '+e.message.slice(0,40));}
  await p.close();
}
import('node:fs').then(fs=>fs.writeFileSync('verify/headings.json',JSON.stringify(out)));
await b.close();
