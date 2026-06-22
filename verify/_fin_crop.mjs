import sharp from 'sharp';
import fs from 'fs';
for (const which of ['live','clone']) {
  const f = `verify/_fin_${which}.png`;
  const meta = await sharp(f).metadata();
  const H = meta.height, W = meta.width;
  // split into 5 vertical bands
  const bands = 6;
  for (let i=0;i<bands;i++){
    const top = Math.floor(H*i/bands);
    const h = Math.min(Math.floor(H/bands)+40, H-top);
    await sharp(f).extract({left:0, top, width:W, height:h}).toFile(`verify/_fin_${which}_b${i}.png`);
  }
  console.log(which, W, H);
}
