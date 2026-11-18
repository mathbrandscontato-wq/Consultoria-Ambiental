// Run only in the isolated GitHub audit runner, never as a production dependency.
import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {serveStatic} from './ux-v2-audit-server.mjs';
const [baseline,candidate,tools,slug='home',device='mobile']=process.argv.slice(2);
if(!baseline||!candidate||!tools||!['home','sobre','servicos','contato'].includes(slug)||!['mobile','desktop'].includes(device))throw Error('Invalid audit arguments');
const out=resolve(candidate,'artifacts/ux-v2/lighthouse/'+slug+'-'+device);await mkdir(out,{recursive:true});
const results=[];
for(const [phase,directory] of [['before',baseline],['after',candidate]]){
 const server=await serveStatic(join(directory,'dist'));
 try{
  const outputPath=join(out,phase);
  const args=[server.url+(slug==='home'?'/':'/'+slug+'/'),'--quiet','--no-enable-error-reporting','--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage','--output=json','--output=html','--output-path='+outputPath,'--only-categories=performance,accessibility,best-practices,seo','--max-wait-for-load=60000'];
  if(device==='desktop')args.push('--preset=desktop');
  const command=join(resolve(tools),'node_modules/.bin/lighthouse');
  await new Promise((resolve,reject)=>{const child=spawn(command,args,{stdio:'inherit',env:process.env});child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(Error('Lighthouse '+phase+' exited '+code)));});
  const reportFile=(await readdir(out)).find(name=>name.startsWith(phase)&&name.endsWith('.json'));
  const lhr=JSON.parse(await readFile(join(out,reportFile),'utf8'));
  if(lhr.runtimeError)throw Error(JSON.stringify(lhr.runtimeError));
  const metrics={};for(const id of ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'])metrics[id]={value:lhr.audits[id]?.numericValue,display:lhr.audits[id]?.displayValue};
  results.push({phase,slug,device,source:phase==='before'?process.env.BASELINE_SHA:process.env.CANDIDATE_SHA,fetchTime:lhr.fetchTime,lighthouseVersion:lhr.lighthouseVersion,scores:Object.fromEntries(Object.entries(lhr.categories).map(([id,c])=>[id,c.score===null?null:Math.round(c.score*100)])),metrics,warnings:lhr.runWarnings,environment:lhr.environment,settings:lhr.configSettings});
 }finally{await server.close();}
}
const summary={method:'One Lighthouse lab run per phase, route and simulated device, against equal local static servers on the GitHub runner. No field INP or production TTFB is inferred.',results};
await writeFile(join(out,'summary.json'),JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
