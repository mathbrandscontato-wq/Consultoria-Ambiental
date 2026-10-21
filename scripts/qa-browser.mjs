import {createServer} from "node:http";
import {readFile,writeFile,mkdir,mkdtemp,rm} from "node:fs/promises";
import {existsSync} from "node:fs";
import {spawn,spawnSync} from "node:child_process";
import {tmpdir} from "node:os";
import {join,resolve,extname} from "node:path";
import {fileURLToPath} from "node:url";
import assert from "node:assert/strict";
// Development-only Chrome CDP QA. Zero npm dependencies; visual approval remains manual.
const root=resolve(fileURLToPath(new URL("..",import.meta.url))),dist=join(root,"dist"),out=join(root,"artifacts/qa-browser");
const chromePath=[process.env.CHROME_PATH,"google-chrome","google-chrome-stable","chromium"].filter(Boolean).find(n=>spawnSync("which",[n]).status===0);
if(!chromePath)throw Error("Chrome not found: QA cannot be skipped");
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{
 try{
  const p=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  if(p.includes(".."))throw Error("unsafe");
  const f=resolve(dist,"."+p,p.endsWith("/")?"index.html":"");
  if(!f.startsWith(dist+"/"))throw Error("outside dist");
  const contents=await readFile(f);
  res.writeHead(200,{"Content-Type":({".html":"text/html; charset=utf-8",".css":"text/css",".mjs":"text/javascript"})[extname(f)]||"application/octet-stream"});
  res.end(contents);
 }catch{res.writeHead(404);res.end("Not found");}
});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const port=server.address().port;
const profile=await mkdtemp(join(tmpdir(),"yk-cdp-"));
const proc=spawn(chromePath,["--headless=new","--no-sandbox","--disable-dev-shm-usage","--no-first-run","--remote-debugging-port=0","--user-data-dir="+profile,"about:blank"],{stdio:"ignore"});
let ws;
try{
 let endpoint;
 for(let n=0;n<90;n++){
  const file=join(profile,"DevToolsActivePort");
  if(existsSync(file)){endpoint="http://127.0.0.1:"+(await readFile(file,"utf8")).split("\n")[0];break;}
  if(proc.exitCode!==null)break;
  await sleep(100);
 }
 assert.ok(endpoint,"CDP endpoint missing");
 const target=await fetch(endpoint+"/json/new?about:blank",{method:"PUT"}).then(r=>r.json());
 ws=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((r,j)=>{ws.addEventListener("open",r,{once:true});ws.addEventListener("error",j,{once:true});});
 let id=0;const pending=new Map();
 ws.addEventListener("message",e=>{const o=JSON.parse(e.data),p=pending.get(o.id);if(!p)return;pending.delete(o.id);o.error?p.j(Error(JSON.stringify(o.error))):p.r(o.result);});
 const send=(method,params={})=>new Promise((r,j)=>{const k=++id;pending.set(k,{r,j});ws.send(JSON.stringify({id:k,method,params}));setTimeout(()=>{if(pending.has(k)){pending.delete(k);j(Error("CDP timeout "+method));}},15000);});
 const run=async expression=>{const result=await send("Runtime.evaluate",{expression,returnByValue:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
 await send("Page.enable");await send("Runtime.enable");
 const results=[];
 for(const [width,height] of [[1440,900],[390,860],[768,870],[360,780]]){
  await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:width<=390});
  await send("Page.navigate",{url:"http://127.0.0.1:"+port+"/"});
  let ready=false;
  for(let n=0;n<45;n++){try{ready=await run("document.readyState==='complete'&&!!document.querySelector('.ha-cta--main')");}catch{}if(ready)break;await sleep(100);}
  assert.ok(ready,"page not loaded "+width);
  const metrics=await run('(()=>{const c=document.querySelector(".ha-cta--main"),r=c.getBoundingClientRect();return {vw:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelector("h1")?.textContent,href:c.getAttribute("href"),left:r.left,right:r.right,visible:getComputedStyle(c).display!=="none",forms:document.querySelectorAll("form").length,media:!!document.querySelector(".ha-media-label")};})()');
  assert.equal(metrics.h1,"AMBIENTAL.");
  assert.equal(metrics.href,"./contato/");
  assert.equal(metrics.forms,0);
  assert.ok(metrics.visible&&metrics.media);
  assert.ok(metrics.scroll<=width+1,"horizontal overflow at "+width+": "+metrics.scroll);
  assert.ok(metrics.left>=-1&&metrics.right<=width+1,"CTA clipped at "+width);
  const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:true});
  await writeFile(join(out,"home-"+width+".png"),Buffer.from(shot.data,"base64"));
  if(width===390){
   const escape=await run('(()=>{const m=document.querySelector(".ha-mobile-menu"),s=m.querySelector("summary");m.open=true;m.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));return !m.open&&document.activeElement===s;})()');
   assert.ok(escape,"menu Escape/focus");
  }
  results.push({width,height,result:"PASS",...metrics});
 }
 await writeFile(join(out,"results.json"),JSON.stringify({browser:chromePath,results},null,2));
 console.log("Browser tests passed at 1440/390/768/360; not a visual design approval.");
}catch(e){console.error(e.stack||e);process.exitCode=1;}
finally{ws?.close();proc.kill();await new Promise(r=>server.close(r));await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100});}
