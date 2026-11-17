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
  { offset:0,    transform:"rotateX(68deg) translateY(15svh) scale(.76)" },
  { offset:0.15, transform:"rotateX(68deg) translateY(15svh) scale(.76)" },
  { offset:0.29, transform:"rotateX(68deg) translateY(-6svh) scale(.76)" },
  { offset:0.45, transform:"rotateX(68deg) translateY(-25svh) scale(.76)" },
  { offset:0.55, transform:"rotateX(43deg) translateY(-12svh) scale(.64)" },
  { offset:0.65, transform:"rotateX(0deg) translateY(-4svh) scale(.72)" },
  { offset:0.72, transform:"rotateX(0deg) translateY(-4svh) scale(.72)" },
  { offset:0.86, transform:"rotateX(0deg) translateY(0svh) scale(1)" },
  { offset:1,    transform:"rotateX(0deg) translateY(0svh) scale(1)" },
]);

/** Globe and light remain below the frame until after 65% upright marker. */
export const INTRO_GLOBE_FRAMES = Object.freeze([
  {offset:0,    opacity:0,   transform:"translateX(-50%) translateY(76svh) scale(.96)"},
  {offset:0.65, opacity:0,   transform:"translateX(-50%) translateY(76svh) scale(.96)"},
  {offset:0.66, opacity:0,   transform:"translateX(-50%) translateY(76svh) scale(.96)"},
  {offset:0.76, opacity:0.58,transform:"translateX(-50%) translateY(30svh) scale(.98)"},
  {offset:0.86, opacity:0.98,transform:"translateX(-50%) translateY(0svh) scale(1)"},
  {offset:1,    opacity:0.98,transform:"translateX(-50%) translateY(0svh) scale(1)"},
]);
export const INTRO_AURA_FRAMES = Object.freeze([
  {offset:0,    opacity:0, transform:"translateX(-50%) translateY(42svh)"},
  {offset:0.66, opacity:0, transform:"translateX(-50%) translateY(42svh)"},
  {offset:0.79, opacity:0.75,transform:"translateX(-50%) translateY(6svh)"},
  {offset:0.86, opacity:1, transform:"translateX(-50%) translateY(0svh)"},
  {offset:1,    opacity:1, transform:"translateX(-50%) translateY(0svh)"},
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
