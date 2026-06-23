import { readFileSync } from 'node:fs';
const ex=JSON.parse(readFileSync('azure-clone-next/content-kit/agent-extras.json','utf8'));
console.log('agent-extras keys:', Object.keys(ex).join(', '));
const k='ai_agents_it_asset_management_agent';
console.log(k, '-> advIcons:', ex[k]?.aiAdvantageIcons?.length||0, '| video:', ex[k]?.video?.youtube||'none', '| poster:', ex[k]?.video?.poster||'none');
const j=JSON.parse(readFileSync('azure-clone-next/content-kit/content/ai_agents_it_asset_management_agent.json','utf8'));
console.log('captured url:', j.url);
const route=(j.url||'').replace(/^https?:\/\/[^/]+/,'').replace(/[?#].*$/,'');
const slug=(route.replace(/^\/|\/$/g,'')||'home').replace(/[^a-z0-9]+/gi,'_');
console.log('route:', route, '-> slug:', slug, '| matches key:', slug===k);
// AI advantage section + its real-head card count
const secs=j.sections||[];
secs.forEach((s,i)=>{const items=s.items||[];const h=items.find(it=>it.t==='h');if(h&&/ai advantage/i.test(h.text)){const h3s=items.filter(it=>it.t==='h'&&(it.tag==='h3'||it.tag==='h4')&&!it.text.trim().startsWith('<'));console.log('AI Advantage sec'+i+': first heading=['+h.tag+'] "'+h.text.slice(0,40)+'" | h3/h4 cards:'+h3s.length+' -> '+h3s.slice(0,5).map(x=>x.text.slice(0,22)).join(', '));}});
