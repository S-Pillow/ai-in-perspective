/**
 * AIIP-INTRO-01: editable silent flyover timeline of the real Intro page.
 * The reference is a pacing guide; its media, brand and unlicensed audio are not reused.
 */
export const INTRO_FLYOVER_DURATION_MS = 18_500;
export const INTRO_FLYOVER_SCENES = Object.freeze([
  { id:"establish", start:0, end:2.8, copy:"AI HAS ARRIVED", asset:".intro-center", motion:"Establish the real heading on a flat, pitched page." },
  { id:"travel", start:2.8, end:8.4, copy:"You can choose to understand it", asset:".intro-message", motion:"One camera travels down the original Intro paragraphs." },
  { id:"overview", start:8.4, end:12.1, copy:"The choice begins with understanding.", asset:".intro-center", motion:"Pull back to see the complete page and rotate it upright." },
  { id:"globe", start:12.1, end:15.4, copy:"AI in Perspective", asset:".intro-planet", motion:"Once the page is upright, raise its existing Earth illustration." },
  { id:"closing", start:15.4, end:18.5, copy:"Continue to explore", asset:".intro-continue", motion:"Return to the real headline and hold the original action." },
]);
export const INTRO_FLYOVER_MARKERS = Object.freeze({
  pageUprightAt:0.65,
  globeRiseStartsAt:0.66,
  globeSettledAt:0.86,
  closingHoldStartsAt:0.86,
});

/** A single continuous camera moves the existing text page. */
export const INTRO_CAMERA_FRAMES = Object.freeze([
  // The website is truly horizontal and has a visible outline while the camera travels.
  {offset:0,    transform:"translateY(20svh) rotateX(80deg) scale(1.60)"},
  {offset:0.15, transform:"translateY(20svh) rotateX(80deg) scale(1.60)"},
  {offset:0.29, transform:"translateY(2svh) rotateX(80deg) scale(1.60)"},
  {offset:0.45, transform:"translateY(-29svh) rotateX(80deg) scale(1.65)"},
  {offset:0.55, transform:"translateY(-25svh) rotateX(56deg) scale(.95)"},
  {offset:0.65, transform:"translateY(-9svh) rotateX(0deg) scale(.72)"},
  {offset:0.72, transform:"translateY(-9svh) rotateX(0deg) scale(.72)"},
  {offset:0.86, transform:"translateY(0svh) rotateX(0deg) scale(1)"},
  {offset:1,    transform:"translateY(0svh) rotateX(0deg) scale(1)"},
]);
export const INTRO_SURFACE_FRAMES = Object.freeze([
  {offset:0,opacity:1},{offset:.45,opacity:1},
  {offset:.65,opacity:.9},{offset:.78,opacity:.6},
  {offset:.86,opacity:0},{offset:1,opacity:0},
]);
/** The globe must enter the visible viewport, not just change opacity offscreen. */
export const INTRO_GLOBE_FRAMES = Object.freeze([
  {offset:0,opacity:0,transform:"translateX(-50%) translateY(90svh) scale(.96)"},
  {offset:.65,opacity:0,transform:"translateX(-50%) translateY(90svh) scale(.96)"},
  {offset:.66,opacity:0,transform:"translateX(-50%) translateY(90svh) scale(.96)"},
  {offset:.72,opacity:.45,transform:"translateX(-50%) translateY(-13svh) scale(.98)"},
  {offset:.77,opacity:.98,transform:"translateX(-50%) translateY(-52svh) scale(1)"},
  {offset:.86,opacity:.98,transform:"translateX(-50%) translateY(-52svh) scale(1)"},
  {offset:1,opacity:.98,transform:"translateX(-50%) translateY(-52svh) scale(1)"},
]);

export const INTRO_AURA_FRAMES = Object.freeze([
  {offset:0,    opacity:0, transform:"translateX(-50%) translateY(42svh)"},
  {offset:0.66, opacity:0, transform:"translateX(-50%) translateY(42svh)"},
  {offset:0.79, opacity:0.75,transform:"translateX(-50%) translateY(-30svh)"},
  {offset:0.86, opacity:1, transform:"translateX(-50%) translateY(-38svh)"},
  {offset:1,    opacity:1, transform:"translateX(-50%) translateY(-38svh)"},
]);
export const INTRO_HORIZON_FRAMES = Object.freeze([
  {offset:0,opacity:0}, {offset:0.66,opacity:0},
  {offset:0.78,opacity:.55}, {offset:0.86,opacity:.8}, {offset:1,opacity:.8},
]);

export function getIntroFlyoverScene(seconds) {
  if(!Number.isFinite(seconds)) throw new RangeError("Invalid flyover timestamp");
  const clamped=Math.max(0,Math.min(INTRO_FLYOVER_DURATION_MS/1000,seconds));
  return INTRO_FLYOVER_SCENES.find(scene=>clamped>=scene.start && clamped<scene.end) ?? INTRO_FLYOVER_SCENES.at(-1);
}
