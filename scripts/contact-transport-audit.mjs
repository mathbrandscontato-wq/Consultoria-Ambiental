// CI-only transport inspection. Provider requests are intercepted before network
// access; this tests the real browser POST, not delivery into the recipient inbox.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {resolve,join} from 'node:path';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {createHash} from 'node:crypto';
import {serveStatic} from './ux-v2-audit-server.mjs';
const [toolsDirectory,engine='chromium']=process.argv.slice(2);
const require=createRequire(join(resolve(toolsDirectory),'package.json'));
const playwright=require('playwright');
const browser=await playwright[engine].launch(engine==='chromium'?{executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']}:{});
const sourceHtml=await readFile(resolve('dist/contato/index.html'),'utf8');
assert.match(sourceHtml,/action="https:\/\/formsubmit.co\/lara@ykeizumi.com.br" method="POST" enctype="multipart\/form-data"/);
let captureResolve,captureReject;
const captureServer=createServer(async(req,res)=>{
 try {
  assert.equal(req.method,'POST','provider transport must use POST');
  const type=req.headers['content-type'];assert.match(type,/^multipart\/form-data; boundary=/);
  const chunks=[];for await(const chunk of req)chunks.push(chunk);const body=Buffer.concat(chunks);assert.ok(body.length);
  const data=await new Request('http://transport.invalid/',{method:'POST',headers:{'content-type':type},body}).formData();
  const files=[];for(const [field,value] of data)if(typeof value==='object'&&value.name)files.push({field,name:value.name,size:value.size,sha256:createHash('sha256').update(Buffer.from(await value.arrayBuffer())).digest('hex')});
  assert.equal(data.get('name'),'QA transport');assert.equal(data.get('email'),'qa@example.invalid');
  captureResolve({method:req.method,contentType:type,files});
  res.writeHead(200,{'Content-Type':'text/html'});res.end('<h1>Local transport inspection only</h1><p>No email was sent.</p>');
 }catch(error){captureReject(error);res.writeHead(500);res.end('Transport inspection failed');}
});
await new Promise(resolve=>captureServer.listen(0,'127.0.0.1',resolve));
const captureUrl='http://127.0.0.1:'+captureServer.address().port+'/capture';
// Replace only the destination in the HTML response, preserving the production
// markup, scripts, file selector and native submission across two local origins.
const server=await serveStatic(resolve('dist'),{transformHtml:html=>html.replaceAll('https://formsubmit.co/lara@ykeizumi.com.br',captureUrl)});
const out=resolve('artifacts/contact-transport',engine);await mkdir(out,{recursive:true});
const results=[];
try {
 for(const mobile of [false,true])for(const fileCount of [0,1,3]) {
  const context=await browser.newContext({viewport:{width:mobile?390:1440,height:900},isMobile:mobile,hasTouch:mobile});
  const captured=new Promise((resolve,reject)=>{captureResolve=resolve;captureReject=reject;});
  await context.route('**/*',async route=>{
   const url=route.request().url();
   if(url.startsWith(server.url)||url.startsWith(captureUrl))await route.continue();
   else await route.abort();
  });
  const page=await context.newPage();await page.goto(server.url+'/contato/',{waitUntil:'networkidle'});
  await page.locator('#contact-name').fill('QA transport');await page.locator('#contact-email').fill('qa@example.invalid');
  await page.locator('#contact-phone').fill('00000000000');await page.locator('#contact-city').fill('Joinville');
  await page.locator('#contact-service').selectOption('s04');await page.locator('#contact-description').fill('Local browser transport test; no external delivery.');
  const fileFixtures=Array.from({length:fileCount},(_,index)=>({name:'transport-'+(index+1)+'.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\ntransport fixture '+index+'\n%%EOF')}));
  if(fileCount)await page.locator('#contact-attachments').setInputFiles(fileFixtures);
  const timer=setTimeout(()=>captureReject(Error('No POST captured within 20 seconds')),20000);
  await page.getByRole('button',{name:'Enviar',exact:true}).click();
  const result=await captured;clearTimeout(timer);
  assert.equal(result.files.length,fileCount,'all selected files must be in the multipart body');
  assert.equal(new Set(result.files.map(file=>file.field)).size,fileCount,'distinct fields prevent providers overwriting same-name files');
  for(const [index,file] of result.files.entries()) {
   assert.equal(file.name,fileFixtures[index].name);assert.equal(file.size,fileFixtures[index].buffer.length);
   assert.equal(file.sha256,createHash('sha256').update(fileFixtures[index].buffer).digest('hex'));
  }
  assert.equal(await page.locator('#contact-name').inputValue(),'QA transport');
  assert.equal(await page.locator('#contact-attachments').evaluate(input=>input.files.length),fileCount);
  await page.screenshot({path:join(out,(mobile?'mobile':'desktop')+'-'+fileCount+'-files.png'),fullPage:true});
  results.push({engine,mobile,fileCount,...result,originalAnswersPreserved:true});
  await context.close();
 }
 console.log(JSON.stringify({engine,scenarios:results.length,passed:true,method:'Cross-origin POST to isolated local capture server; zero provider submissions.'}));
}finally {
 await writeFile(join(out,'results.json'),JSON.stringify({engine,method:'Production markup with only its destination replaced by an isolated local server. Real cross-origin multipart bytes; no provider submissions or inbox delivery test.',results},null,2));
 await browser.close();await server.close();await new Promise(resolve=>captureServer.close(resolve));
}
