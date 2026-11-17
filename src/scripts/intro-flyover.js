import {
  INTRO_FLYOVER_DURATION_MS,
  INTRO_CAMERA_FRAMES, INTRO_GLOBE_FRAMES,
  INTRO_AURA_FRAMES, INTRO_HORIZON_FRAMES,
} from "../data/introFlyover.mjs";

/**
 * Optional first-load film: the real Intro DOM is the moving page.
 * No copied text, videos, third-party imagery or audio.
 * ?flyover=off restores the previous Intro unchanged.
 * ?flyoverAt=12.1 freezes the timeline for deterministic visual inspection.
 */
const stage=document.querySelector(".intro-stage");
if(stage){
  stage.classList.add("intro-ready");
  const params=new URLSearchParams(location.search);
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches??false;
  const canAnimate=typeof Element.prototype.animate==="function";
  const compact=window.matchMedia?.("(max-width: 620px)")?.matches??false;
  // The full-page 3D camera would shrink the real paragraphs too far on phones.
  const disabled=params.get("flyover")==="off" || reduced || compact || !canAnimate;
  const replay=stage.querySelector("[data-intro-flyover-replay]");
  const skip=stage.querySelector("[data-intro-flyover-skip]");
  if(!disabled){
    const center=stage.querySelector(".intro-center");
    const globe=stage.querySelector(".intro-planet");
    const aura=stage.querySelector(".intro-earth-aura");
    const horizon=stage.querySelector(".intro-title-horizon");
    if(center && globe && aura && horizon){
      stage.classList.add("intro-flyover");
      const tracks=[
        center.animate(INTRO_CAMERA_FRAMES,{duration:INTRO_FLYOVER_DURATION_MS,fill:"both",easing:"linear"}),
        globe.animate(INTRO_GLOBE_FRAMES,{duration:INTRO_FLYOVER_DURATION_MS,fill:"both",easing:"linear"}),
        aura.animate(INTRO_AURA_FRAMES,{duration:INTRO_FLYOVER_DURATION_MS,fill:"both",easing:"linear"}),
        horizon.animate(INTRO_HORIZON_FRAMES,{duration:INTRO_FLYOVER_DURATION_MS,fill:"both",easing:"linear"}),
      ];
      const complete=()=>{
        stage.classList.add("intro-flyover-finished");
        if(skip)skip.hidden=true;
        if(replay)replay.hidden=false;
      };
      const seek=(seconds)=>{
        const t=Math.max(0,Math.min(INTRO_FLYOVER_DURATION_MS,Number(seconds)*1000));
        if(!Number.isFinite(t))return false;
        for(const track of tracks){track.pause();track.currentTime=t;}
        if(t>=INTRO_FLYOVER_DURATION_MS){complete();}
        else{
          stage.classList.remove("intro-flyover-finished");
          if(skip)skip.hidden=false;
          if(replay)replay.hidden=true;
        }
        return true;
      };
      // Browser-proof inspection API: intentionally local, no remote calls.
      window.__introFlyoverSeek=seek;
      window.__introFlyoverDuration=INTRO_FLYOVER_DURATION_MS/1000;
      tracks[0].addEventListener("finish",complete);
      if(skip){
        skip.hidden=false;
        skip.addEventListener("click",()=>{
          for(const track of tracks){track.finish();}
          complete();
        });
      }
      if(replay){
        replay.addEventListener("click",()=>{
          stage.classList.remove("intro-flyover-finished");
          replay.hidden=true;
          if(skip)skip.hidden=false;
          for(const track of tracks){track.currentTime=0;track.play();}
        });
      }
      stage.addEventListener("keydown",event=>{
        if(event.key==="Escape" && !stage.classList.contains("intro-flyover-finished")){
          for(const track of tracks)track.finish();
          complete();
        }
      });
      const at=params.get("flyoverAt");
      if(at!==null && at.trim()!=="" && Number.isFinite(Number(at)))seek(Number(at));
    }
  }
}
