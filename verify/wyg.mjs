import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['ai_agents_it_asset_management_agent','/ai-agents/it-asset-management-agent/'],
  ['ai_agents_kubemonitor_agent','/ai-agents/kubemonitor-agent/'],
  ['ai_agents_ai_powered_ticketing_and_customer_service_agent','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();const out={};
for(const [slug,route] of PAGES){
  const p=await b.newPage({viewport:{width:1366,height:1000},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,500);y+=500;if(y>document.body.scrollHeight){clearInterval(t);r();}},25);});});await p.waitForTimeout(1500);
    const d=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      const ey=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/^what do you get with/i.test(txt(e)));
      const sec=ey?.closest('.elementor-top-section, .e-con.e-parent');
      if(!sec)return {found:false};
      const heading=txt(ey);
      const sub=txt([...sec.querySelectorAll('p')].find(p=>txt(p).length>40)||null);
      const tabBtns=[...sec.querySelectorAll('[role=tab], .e-n-tab-title, .elementor-tab-title')];
      const tabLabels=tabBtns.map(txt).filter(Boolean);
      const panels=[...sec.querySelectorAll('[role=tabpanel], .e-n-tabs-content > .e-con, .elementor-tab-content')];
      const tabIcons=panels.map(pan=>[...pan.querySelectorAll('.elementor-icon-box-wrapper')].map(ib=>{const svg=ib.querySelector('svg');const i=ib.querySelector('.elementor-icon i');return svg?svg.outerHTML:(i?i.className:'');}));
      const tabImgs=panels.map(pan=>{const im=pan.querySelector('img');return im?(im.currentSrc||im.src):'';});
      return {found:true,heading,sub,tabLabels,tabIconCounts:tabIcons.map(t=>t.length),tabIcons,tabImgs};
    });
    out[slug]=d;
    console.log(slug.replace('ai_agents_','')+': tabs='+(d.tabLabels||[]).length+' iconCounts='+JSON.stringify(d.tabIconCounts)+' imgs='+(d.tabImgs||[]).filter(Boolean).length);
    console.log('   labels: '+(d.tabLabels||[]).join(' | '));
  }catch(e){console.log(slug+' ERR '+e.message.slice(0,50));}
  await p.close();
}
writeFileSync('verify/wyg.json',JSON.stringify(out));
await b.close();
