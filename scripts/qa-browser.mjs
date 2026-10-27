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
const chromePath=[process.env.CHROME_PATH,"google-chrome","google-chrome-stable","chromium"].filter(Boolean).find(n=>spawnSync(process.platform==="win32"?"where":"which",[n]).status===0);
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
  res.writeHead(200,{"Content-Type":({".html":"text/html; charset=utf-8",".css":"text/css",".mjs":"text/javascript",".webp":"image/webp",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".mp4":"video/mp4"})[extname(f)]||"application/octet-stream"});
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
 const run=async expression=>{const result=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
 await send("Page.enable");await send("Runtime.enable");
 const results=[];
 for(const [width,height] of [[320,780],[360,780],[390,860],[430,900],[768,870],[1024,900],[1440,900],[1920,1080]]){
  await send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:width<=390});
  await send("Page.navigate",{url:"http://127.0.0.1:"+port+"/"});
  let ready=false;
  for(let n=0;n<45;n++){try{ready=await run("document.readyState==='complete'&&!!document.querySelector('.ha-cta--services')");}catch{}if(ready)break;await sleep(100);}
  assert.ok(ready,"page not loaded "+width);
  const metrics=await run('(()=>{const c=document.querySelector(".ha-cta--services"),r=c.getBoundingClientRect();return {vw:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelector("h1")?.textContent,href:c.getAttribute("href"),left:r.left,right:r.right,visible:getComputedStyle(c).display!=="none",forms:document.querySelectorAll("form").length,media:!!document.querySelector(".ha-dots"),fontStack:getComputedStyle(document.body).fontFamily,photoLoaded:!!document.querySelector(".ha-photo")?.naturalWidth,videoSource:document.querySelector(".ha-video")?.dataset.desktop};})()');
  assert.equal(metrics.h1,"Consultoria Ambiental");
  assert.ok(metrics.fontStack.includes("Ykeizumi Avenir"),"Avenir missing from computed font-family");
  assert.equal(metrics.href,"./servicos/");
  assert.equal(metrics.forms,0);
  assert.ok(metrics.visible&&metrics.media);
  assert.equal(metrics.videoSource,"./media/hero-desktop.mp4","Approved hero video source changed");
  assert.ok(metrics.photoLoaded,"Hero poster unavailable at "+width);
  const links = await run('Promise.all(["/","/servicos/","/sobre/","/projetos/","/contato/","/styles/tokens.css","/styles/base.css","/styles/hero-a.css","/scripts/mobile-menu.mjs"].map(async path=>({path,status:(await fetch(path)).status})))');
  assert.deepEqual(links.map(x=>x.status),Array(9).fill(200),
    "Broken internal route or asset: "+JSON.stringify(links));
  assert.ok(metrics.scroll<=width+1,"horizontal overflow at "+width+": "+metrics.scroll);
  assert.ok(metrics.left>=-1&&metrics.right<=width+1,"CTA clipped at "+width);
  const texture=await run('(()=>{const dots=document.querySelector(".ha-dots");return {visible:getComputedStyle(dots).display!=="none",background:getComputedStyle(dots).backgroundImage};})()');
  assert.ok(texture.visible&&texture.background.includes("radial-gradient"),"Dotted hero texture missing at "+width);
  const shot=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:true});
  await writeFile(join(out,"home-"+width+".png"),Buffer.from(shot.data,"base64"));
  const viewportShot=await send("Page.captureScreenshot",{
    format:"png",captureBeyondViewport:true,
    clip:{x:0,y:0,width,height,scale:1}
  });
  await writeFile(join(out,"viewport-"+width+".png"),Buffer.from(viewportShot.data,"base64"));
  if(width===390){
   const escape=await run('(()=>{const m=document.querySelector(".ha-mobile-menu"),s=m.querySelector("summary");m.open=true;m.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));return !m.open&&document.activeElement===s;})()');
   assert.ok(escape,"menu Escape/focus");
  }
  results.push({width,height,result:"PASS",...metrics,links,texture});
  // Revalidar também as páginas novas nos breakpoints de referência.
  {
    for(const slug of ["servicos","sobre","projetos","contato"]){
      await send("Page.navigate",{url:"http://127.0.0.1:"+port+"/"+slug+"/"});
      let readyPage=false;
      for(let i=0;i<50;i++){
        try{readyPage=await run("document.readyState==='complete'&&!!document.querySelector('main h1')");}catch{}
        if(readyPage)break;
        await sleep(100);
      }
      assert.ok(readyPage,"Internal page did not load: "+slug+"/"+width);
      const page=await run('(()=>({h1Count:document.querySelectorAll("main h1").length,overflow:document.documentElement.scrollWidth>innerWidth+1,heading:document.querySelector("main h1")?.textContent,hasForm:!!document.querySelector("form"),stage:document.querySelector("footer")?.textContent||""}))()');
      assert.equal(page.h1Count,1,"Exactly one H1 on "+slug);
      assert.equal(page.overflow,false,"Horizontal overflow on "+slug+"/"+width);
      assert.equal(page.hasForm,false,"Contact must not fake submission");
      assert.ok(page.stage.includes("revisão"),"Review-only disclosure missing");
      const sc=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:true});
      await writeFile(join(out,slug+"-"+width+".png"),Buffer.from(sc.data,"base64"));
      results.push({width,height,route:slug,result:"PASS",...page});
    }
  }

 }
 await writeFile(join(out,"results.json"),JSON.stringify({browser:chromePath,results},null,2));
 console.log("Browser tests passed on five routes at 320/360/390/430/768/1024/1440/1920; not a visual design approval.");
}catch(e){console.error(e.stack||e);process.exitCode=1;}
finally{ws?.close();proc.kill();await new Promise(r=>server.close(r));await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100});}
