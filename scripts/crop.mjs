import sharp from 'sharp';
const meta = async f => { const m = await sharp(f).metadata(); return m; };
for (const f of ['live_if.png','clone_if.png']){
  const m = await sharp(f).metadata();
  console.log(f, m.width, 'x', m.height);
}
