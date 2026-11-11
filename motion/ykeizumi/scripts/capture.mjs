import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = process.cwd();
const folder = resolve(root, 'public/motion/captures');
const dataFile = resolve(root, 'motion/ykeizumi/src/capture-data.json');
await mkdir(folder, {recursive: true});
await mkdir(dirname(dataFile), {recursive: true});
const executablePath = process.env.CHROME_BIN || '/usr/bin/google-chrome';
const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required']
});
const page = await browser.newPage({
  viewport: {width: 1440, height: 900},
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
  colorScheme: 'light'
});
page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
const url = process.env.SITE_URL || 'http://127.0.0.1:4173/';
await page.goto(url, {waitUntil: 'load', timeout: 45000});
await page.evaluate(async () => {
  await document.fonts.ready;
  for (const image of [...document.images]) if (image.loading !== 'lazy') await image.decode().catch(() => {});
});
await page.waitForTimeout(700);
const meta = {
  viewport: {width: 1440, height: 900},
  source: 'mathbrandscontato-wq/Consultoria-Ambiental',
  sourceBranch: 'feat/ykeizumi-redesign-unificado-20261027',
  captureDate: new Date().toISOString(),
  hero: {x:20,y:20,width:1400,height:856},
  serviceTargets: [{x:600,y:450},{x:600,y:590}],
  sectorTargets: [{x:620,y:480},{x:620,y:590}],
  galleryTarget: {x:730,y:750},
  screenCaptures: []
};
async function snap(name, transparent=false) {
  await page.screenshot({
    path: resolve(folder, name + '.png'),
    omitBackground: transparent,
    animations: 'disabled',
    fullPage: false
  });
  meta.screenCaptures.push(name);
}
async function scrollTo(selector, top=100) {
  const locator=page.locator(selector).first();
  if(!await locator.count()) throw new Error('Elemento não encontrado: '+selector);
  await page.evaluate(({selector,top}) => {
    const element=document.querySelector(selector);
    const y=window.scrollY+element.getBoundingClientRect().top-top;
    window.scrollTo({top:Math.max(0,y),behavior:'instant'});
  }, {selector,top});
  await page.waitForTimeout(550);
}
async function center(locator) {
  return await locator.evaluate(element => {
    const r=element.getBoundingClientRect();
    return {x:Math.round(r.x+r.width/2), y:Math.round(r.y+r.height/2)};
  });
}
async function imageReady(selector) {
  await page.locator(selector).first().evaluate(async element => {
    const all=[...element.querySelectorAll('img')];
    await Promise.all(all.map(img => {img.loading='eager';return img.decode().catch(() => {})}));
  });
}
try {
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
  await snap('hero');
  meta.hero = await page.locator('.ha').first().evaluate(element => {
    const r=element.getBoundingClientRect();
    return {x:r.x,y:r.y,width:r.width,height:r.height};
  });
  // Original text, logo, nav and button preserved over transparent video underlay.
  const overlay=await page.addStyleTag({content: [
    'html, body {background:transparent !important;}',
    '.ha, .ha-media {background:transparent !important; box-shadow:none !important;}',
    '.ha-video,.ha-photo,.ha-photo-shade,.ha-dots{visibility:hidden !important;}',
    '.ha-media::before{display:none !important;}'
  ].join(' ')});
  await snap('hero-overlay',true);
  await overlay.evaluate(element => element.remove());
  await scrollTo('#introducao',90);
  await snap('intro');
  await scrollTo('#servicos-home',105);
  await imageReady('#servicos-home');
  await page.mouse.move(3,3);
  await snap('service-idle');
  for (let i=0;i<2;i++) {
    const card=page.locator('.home-service').nth(i);
    await card.hover({force:true});
    await page.waitForTimeout(800);
    meta.serviceTargets[i]=await center(card.locator('h3'));
    await snap('service-'+(i+1));
    await page.mouse.move(3,3);
  }
  await scrollTo('#segmentos',105);
  await imageReady('#segmentos');
  await snap('sector-0');
  for (let i=1;i<=2;i++) {
    const target=page.locator('.sector-option summary').nth(i);
    meta.sectorTargets[i-1]=await center(target);
    await target.click({force:true});
    await page.waitForTimeout(550);
    await snap('sector-'+i);
  }
  await scrollTo('#projetos',92);
  await imageReady('#projetos');
  await page.waitForTimeout(450);
  await snap('gallery-0');
  const next=page.locator('[data-circular-next]').first();
  meta.galleryTarget=await center(next);
  for (let i=1;i<=2;i++) {
    await next.click({force:true});
    await page.waitForTimeout(650);
    await snap('gallery-'+i);
  }
  const visibleBroken=await page.evaluate(() => [...document.images]
    .filter(image => {
      const r=image.getBoundingClientRect();
      return r.bottom>0 && r.top<innerHeight && image.complete && image.naturalWidth===0;
    }).map(image=>image.getAttribute('src')));
  if (visibleBroken.length) throw new Error('Imagens visíveis quebradas: '+JSON.stringify(visibleBroken));
  await writeFile(dataFile, JSON.stringify(meta,null,2)+'\n','utf8');
  console.log('CAPTURE_PASS '+JSON.stringify({screens:meta.screenCaptures,hero:meta.hero,branch:meta.sourceBranch}));
} finally {
  await browser.close();
}
