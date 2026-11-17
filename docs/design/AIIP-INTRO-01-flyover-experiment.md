# AIIP-INTRO-01 — Intro landing-page flyover experiment

**Authority:** Owner request to try a flyover adapted from [OpenDesign's Landing Page Flyover Video Prompt](https://open-design.ai/prompts/landing-page-flyover-video-prompt/) on the existing [AI in Perspective Intro](https://ai-in-perspective.vercel.app/intro). **Stop:** draft PR and protected preview, no production release until owner reviews. **Governance:** AIPF v8.10.1. Reference credited to OpenDesign's editorial adaptation of @twoclipping; no reference media reused.

## Adaptation and nonnegotiable trigger

The OpenDesign guide proposes a continuous camera over the real webpage: establish flat page; travel down existing sections; pull back to an overview; return to the hero. It requires an editable timeline, real copy and assets, readable holds, inspection of every scene boundary, silent output absent licensed audio, and an MP4/poster. The existing Intro has real paragraphs, an AI HAS ARRIVED headline and a built-in SVG Earth. Animate only those elements and preserve all wording, links, proportions, colors and accessibility.

**Specific owner instruction:** Earth must remain concealed through the flat-plane flyover. At 65% of the timeline the page becomes fully upright. Only after that, at 66%, may the original globe begin rising from below the viewport. The globe settles during the return to the normal hero.

## Editable scene timing — silent 18.5-second film at 1440 × 1152 and 15 fps

| Scene | Timing | Original Intro content | Camera / motion | Sound |
| --- | --- | --- | --- | --- |
| Establish flat page | 0–2.8 s | AI HAS ARRIVED | Pitch the real page as a flat plane, retain its anchor and hold | Silent |
| Travel down | 2.8–8.4 s | Existing choice, risks and possibility paragraphs | Move one continuous camera along the real content | Silent |
| Full-page overview | 8.4–12.1 s | Existing paragraphs and “The choice begins with understanding.” | Pull back for overview; tilt gradually upright by about 12.0 s | Silent |
| Earth rises | 12.1–15.4 s | Original inline SVG Earth and AI in Perspective brand | Start globe ascent only after vertical at approximately 12.21 s | Silent |
| Return to hero | 15.4–18.5 s | Original headline and Continue to explore link | Return camera to ordinary upright scale, settle globe, hold CTA | Silent |

Timing and animation keyframes are isolated in src/data/introFlyover.mjs and rendered from src/scripts/intro-flyover.js. The source content remains src/pages/intro.astro; intro-flyover.css adds only opt-in styles.

## Reversibility, accessibility and validation

- The original Skip introduction link and Continue to explore link stay navigable. A Skip motion button finishes the animation in place; Replay flyover replays it.
- Query ?flyover=off restores the original Intro; ?flyoverAt=12.1 pauses at a particular timestamp. A local-only seek method is available to the visual test runner. No browser-side network requests or tracking.
- Reduced-motion and screens at most 620 px wide keep the prior static Intro sequence rather than shrinking pitched text past legibility.
- The proof job uses Playwright and ffmpeg against a locally built, never-published copy. It checks globe opacity/position at scene boundaries, desktop overflow, original links, mobile and reduced-motion fallback, then generates six scene screenshots, a silent MP4 and a JSON report. The seven-day GitHub Actions artifact is a testing deliverable, not an authorized release.
- The reference video, fonts, imagery and audio are not copied. Output silent; no claims of synchronization.
- No new site sections, invented content or analytics. No change to Education, News, discovery, SEO, deployment settings or production main.
- A successful build does not prove a playable MP4 exists. Report the video only if the proof job completes and validates its duration.
- Owner chooses **keep, revise or scrap** after inspecting the protected preview and animation. Production merge is a separate explicit decision.

## Test/release gates

1. Start from accepted main 4f0215aa1941fd129762c9923cd25349fbcbc03b; preserve current production.
2. Pass content contracts and Astro build at the exact candidate SHA.
3. In Chromium check the flat opening, travel, full overview, upright boundary, visible globe ascent and hero close. Confirm Earth stays below until the page is fully upright.
4. Inspect the Vercel protected preview, navigation, paused timestamp state and original/fallback route.
5. Hold at draft PR, no production deployment or autoplay on the live route without owner's approval.
