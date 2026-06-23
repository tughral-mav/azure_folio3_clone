import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36';
const PAGES=[
  ['ai_agents_smartexpense_agent','/ai-agents/smartexpense-agent/'],
  ['ai_agents_it_asset_management_agent','/ai-agents/it-asset-management-agent/'],
  ['ai_agents_kubemonitor_agent','/ai-agents/kubemonitor-agent/'],
  ['ai_agents_ai_powered_ticketing_and_customer_service_agent','/ai-agents/ai-powered-ticketing-and-customer-service-agent/'],
];
const b=await chromium.launch();const data={};
for(const [slug,route] of PAGES){
  const p=await b.newPage({viewport:{width:1280,height:1100},userAgent:UA});
  try{
    await p.goto('https://azure.folio3.com'+route,{waitUntil:'networkidle',timeout:90000});
    await p.evaluate(async()=>{await new Promise(r=>{let y=0;const t=setInterval(()=>{scrollBy(0,400);y+=400;if(y>document.body.scrollHeight+1200){clearInterval(t);r();}},22);});});
    await p.waitForTimeout(2000);
    await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('img')].map(i=>i.complete?1:new Promise(r=>{i.addEventListener('load',r);setTimeout(r,3000);})));});
    const d=await p.evaluate(()=>{const txt=e=>(e?.textContent||'').replace(/\s+/g,' ').trim();
      // hero stats: first 3 counters w/ suffix + label
      const counters=[...document.querySelectorAll('.elementor-counter-number')].slice(0,3).map(n=>({to:parseFloat(n.getAttribute('data-to-value'))||0,suffix:txt(n.parentElement.querySelector('.elementor-counter-number-suffix'))||'',label:txt(n.closest('.elementor-counter').querySelector('.elementor-counter-title'))}));
      // AI advantage 4 icons
      const adv=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/the ai advantage/i.test(txt(e)));
      const advSec=adv?.closest('.elementor-top-section');
      const advIcons=advSec?[...advSec.querySelectorAll('.elementor-icon-box-wrapper svg')].map(s=>s.outerHTML):[];
      // what you get: heading + tab labels + tab icons
      const wyg=[...document.querySelectorAll('h2,.elementor-heading-title')].find(e=>/what do you get/i.test(txt(e)));
      const tabLabels=[...document.querySelectorAll('.elementor-tab-title.elementor-tab-desktop-title')].map(t=>txt(t)).filter(Boolean);
      const tabIcons=[...document.querySelectorAll('.elementor-tab-content')].slice(0,tabLabels.length).map(pan=>[...pan.querySelectorAll('.elementor-icon-box-wrapper svg')].map(s=>s.outerHTML));
      // video data-settings
      const vEl=[...document.querySelectorAll('[data-settings]')].find(e=>/youtube_url/i.test(e.getAttribute('data-settings')||''));
      let video=null;if(vEl){try{const j=JSON.parse(vEl.getAttribute('data-settings'));const m=(j.youtube_url||'').match(/[?&]v=([^&]+)|youtu\.be\/([^?]+)/);video={youtube:m?(m[1]||m[2]):'',posterUrl:j.image_overlay?.url||''};}catch{}}
      return {heroStats:counters, aiAdvantageIcons:advIcons.slice(0,4), whatYouGet:{heading:txt(wyg),tabLabels,tabIcons}, video};
    });
    data[slug]=d;
    console.log(slug+' -> stats:'+d.heroStats.length+' advIcons:'+d.aiAdvantageIcons.length+' tabs:'+d.whatYouGet.tabLabels.length+' tabIcons:'+d.whatYouGet.tabIcons.map(t=>t.length).join('+')+' video:'+(d.video?.youtube||'?')+' poster:'+(d.video?.posterUrl||'').split('/').pop());
    console.log('   stats: '+d.heroStats.map(s=>s.to+(s.suffix)+' '+s.label.slice(0,22)).join(' | '));
    console.log('   tabs: '+d.whatYouGet.tabLabels.map(l=>l.slice(0,24)).join(' | '));
  }catch(e){console.log(slug+' ERR '+e.message.slice(0,50));}
  await p.close();
}
writeFileSync('verify/agent-data.json',JSON.stringify(data));
await b.close();
