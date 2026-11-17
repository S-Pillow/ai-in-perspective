// AIIP-INTRO-01: read-only local browser proof and silent 1440x1152 MP4 render.
// Runs only in a PR job. Does not commit, deploy, modify published site or copy reference media.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
import { INTRO_FLYOVER_DURATION_MS, INTRO_FLYOVER_SCENES } from "../src/data/introFlyover.mjs";

const root=join(process.cwd(),"intro-flyover-proof");
const frames=join(root,"frames");
const fps=15;
const duration=INTRO_FLYOVER_DURATION_MS/1000;
await mkdir(frames,{recursive:true});
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const url=(process.env.BASE_URL || "http://127.0.0.1:4173").replace(/\/$/,"");
const page=await browser.newPage({viewport:{width:1440,height:1152},deviceScaleFactor:1,reducedMotion:"no-preference"});
const report={source:"AIIP-INTRO-01",durationSeconds:duration,dimensions:"1440x1152",fps,audio:"silent",referenceAssetReused:false,scenes:INTRO_FLYOVER_SCENES};
try{
  await page.goto(url+"/intro?flyoverAt=0",{waitUntil:"networkidle"});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>typeof window.__introFlyoverSeek==="function");
  const measure=async seconds=>page.evaluate(t=>{
    window.__introFlyoverSeek(t);
    const center=document.querySelector(".intro-center");
    const earth=document.querySelector(".intro-planet");
    const sheet=document.querySelector(".intro-flyover-page-surface");
    const camera=new DOMMatrixReadOnly(getComputedStyle(center).transform);
    const rect=earth.getBoundingClientRect();
    const sheetRect=sheet.getBoundingClientRect();
    const globeVisibleHeight=Math.max(0,Math.min(rect.bottom,innerHeight)-Math.max(rect.top,0));
    return {
      at:t,
      cameraPitchMetric:Math.abs(camera.m23),
      planetOpacity:Number(getComputedStyle(earth).opacity),
      planetTop:Math.round(rect.top),
      planetVisibleHeight:Math.round(globeVisibleHeight),
      sheetProjectedWidth:Math.round(sheetRect.width),
      sheetProjectedHeight:Math.round(sheetRect.height),
      sheetHasBorder:getComputedStyle(sheet).borderTopWidth!=="0px",
      screenHeight:innerHeight,
      title:document.querySelector(".intro-headline-arrived")?.textContent,
      continueHref:document.querySelector(".intro-continue")?.getAttribute("href"),
      active:document.querySelector(".intro-stage")?.classList.contains("intro-flyover"),
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,
    };
  },seconds);
  const checkpoints={
    flat:await measure(1.8),
    travelling:await measure(6),
    overview:await measure(10.5),
    upright:await measure(12.1),
    globeRising:await measure(14.2),
    closing:await measure(18.5),
  };
  report.checkpoints=checkpoints;
  assert.equal(checkpoints.flat.active,true);
  assert.equal(checkpoints.flat.title?.trim(),"ARRIVED");
  assert.equal(checkpoints.flat.continueHref,"/discover/");
  assert.ok(checkpoints.flat.cameraPitchMetric>.7,"camera shows the actual webpage nearly horizontal");
  assert.ok(checkpoints.flat.sheetHasBorder,"flat website has an actual framed surface");
  assert.ok(checkpoints.flat.sheetProjectedWidth>300,"flat website spans enough of the frame");
  assert.ok(checkpoints.flat.sheetProjectedHeight>40,"flat website is visible, not a collapsed line");
  assert.ok(checkpoints.upright.cameraPitchMetric<.025,"page is vertical before the globe rises");
  assert.ok(checkpoints.upright.planetOpacity<.02,"globe remains hidden at upright transition");
  assert.ok(checkpoints.globeRising.planetOpacity>.25,"globe rises after upright transition");
  assert.ok(checkpoints.globeRising.planetTop<checkpoints.upright.planetTop,"globe actually moves upward");
  assert.ok(checkpoints.globeRising.planetVisibleHeight>200,"globe must visibly enter the viewport");
  assert.ok(checkpoints.closing.planetOpacity>.9,"globe settles at close");
  assert.ok(!checkpoints.closing.horizontalOverflow,"no horizontal overflow in finished desktop frame");
  const shots=[
    ["01-flat",1.8],["02-travel",6],["03-overview",10.5],
    ["04-upright",12.1],["05-globe-rise",14.2],["06-closing",18.5],
  ];
  for(const [label,time] of shots){
    await measure(time);
    await page.screenshot({path:join(root,label+".png"),animations:"allow"});
  }
  // Render source-timeline frames by seeking the same four Web Animations tracks.
  const count=Math.ceil(duration*fps);
  for(let i=0;i<count;i++){
    await page.evaluate(t=>window.__introFlyoverSeek(t),i/fps);
    await page.screenshot({
      path:join(frames,"frame-"+String(i).padStart(4,"0")+".jpg"),
      type:"jpeg",quality:81,animations:"allow",
    });
  }
  execFileSync("ffmpeg",[
    "-hide_banner","-loglevel","error","-y",
    "-framerate",String(fps),"-i",join(frames,"frame-%04d.jpg"),
    "-c:v","libx264","-preset","veryfast","-crf","23",
    "-pix_fmt","yuv420p","-movflags","+faststart",
    join(root,"intro-flyover-silent.mp4"),
  ]);
  const videoSeconds=Number(execFileSync("ffprobe",[
    "-v","error","-show_entries","format=duration",
    "-of","default=nokey=1:noprint_wrappers=1",join(root,"intro-flyover-silent.mp4"),
  ]).toString().trim());
  assert.ok(Math.abs(videoSeconds-duration)<.3,"rendered MP4 duration matches scene plan");
  report.videoDurationSeconds=videoSeconds;
  // Prior experience must remain available as opt-out.
  const original=await browser.newPage({viewport:{width:1440,height:1152}});
  await original.goto(url+"/intro?flyover=off",{waitUntil:"domcontentloaded"});
  assert.equal(await original.locator(".intro-stage").evaluate(el=>el.classList.contains("intro-flyover")),false);
  assert.equal(await original.locator(".intro-continue").getAttribute("href"),"/discover/");
  await original.close();
  // Motion accessibility: reduced motion and narrow phones keep the original readable Intro.
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  await reduced.goto(url+"/intro",{waitUntil:"domcontentloaded"});
  assert.equal(await reduced.locator(".intro-stage").evaluate(el=>el.classList.contains("intro-flyover")),false);
  assert.equal(await reduced.locator(".intro-skip").getAttribute("href"),"/discover/");
  await reduced.close();
  const phone=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"no-preference"});
  await phone.goto(url+"/intro",{waitUntil:"domcontentloaded"});
  assert.equal(await phone.locator(".intro-stage").evaluate(el=>el.classList.contains("intro-flyover")),false);
  report.mobileFallback="Original Intro on widths 620px or narrower; no tiny pitched copy.";
  await phone.close();
  await writeFile(join(root,"report.json"),JSON.stringify(report,null,2)+"\n");
  process.stdout.write(JSON.stringify({result:"passed",checkpoints,videoSeconds,frameCount:count,mobileFallback:report.mobileFallback})+"\n");
}finally{
  await browser.close();
}
