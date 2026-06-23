import { readFileSync, writeFileSync } from 'node:fs';
const stats=JSON.parse(readFileSync('verify/herostats.json','utf8'));
const exPath='azure-clone-next/content-kit/agent-extras.json';
const ex=JSON.parse(readFileSync(exPath,'utf8'));
const FAMAP={'fa-rocket':'rocket','fa-hand-holding-usd':'hand-holding-dollar','fa-hand-holding-dollar':'hand-holding-dollar'};
const faCache={};
async function faSvg(cls){
  const key=(cls.match(/fa-[a-z-]+/g)||[]).map(c=>FAMAP[c]).find(Boolean);
  if(!key)return '';
  if(faCache[key])return faCache[key];
  for(const u of [`https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/${key}.svg`]){
    try{const r=await fetch(u);if(r.ok){let t=(await r.text()).replace(/<!--.*?-->/s,'').replace('<svg ','<svg fill="#1742E7" ');faCache[key]=t;return t;}}catch{}
  }
  return '';
}
for(const [slug,arr] of Object.entries(stats)){
  if(!ex[slug]||!arr.length)continue;
  const hs=[];
  for(const s of arr){
    if(s.type==='counter')hs.push({to:s.to,suffix:s.suffix||'',label:s.label});
    else{const icon=s.svg||await faSvg(s.fa||'');hs.push({label:s.label,icon});}
  }
  ex[slug].heroStats=hs;
  console.log(slug.replace('ai_agents_','')+': '+hs.map(h=>h.icon?('[icon '+h.icon.length+'b] '+h.label.slice(0,20)):(h.to+h.suffix+' '+h.label.slice(0,16))).join(' | '));
}
writeFileSync(exPath,JSON.stringify(ex,null,1));
