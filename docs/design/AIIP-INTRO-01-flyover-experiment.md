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


## AIIP-INTRO-01A — Browser proof accepted, experiment media delivered (2026-11-17)

- GitHub Actions visual-proof runner **44021119794**, job **133830577546** built the actual Intro, used Playwright/Chromium at 1440 × 1152, inspected the real DOM and rendered a silent 18.5333 s MP4 (278 frames at 15 fps) and six scene screenshots.
- Deterministic browser checkpoints: flat 1.8 s camera pitch metric 0.70466, Earth opacity 0 and vertical top 1738 px; travelling 6 s Earth still hidden; overview 10.5 s Earth still hidden; upright 12.1 s camera pitch exactly 0, Earth opacity 0/top 1738; Earth rising 14.2 s opacity 0.61027/top 1164; closing 18.5 s Earth opacity 0.98/top 829. Original /discover/ CTA, no horizontal desktop overflow, reduced-motion/phone fallback and ?flyover=off all passed.
- GitHub Actions artifact storage quota blocked the normal artifact ZIP upload. This is a **delivery/retention limitation, not a video render failure**. No unrelated artifacts were deleted, no plan or storage settings changed. To provide a reviewable film, the same CI runner additionally generated a compact **720 × 576 silent H.264 MP4** plus original 1440 × 1152 closing poster. Their encoded bytes were transferred through verified labelled CI log chunks into GitHub Git blobs and committed only to this experimental branch.
- Review-only assets: public/experiments/intro-flyover-silent.mp4 (242,607 bytes) and public/experiments/intro-flyover-poster.png (1,298,457 bytes), both available at the exact PR Vercel preview routes. The video is a downscaled review copy of the verified full-resolution render; it is **not** a 1440 × 1152 delivered MP4. The first attempt failed in setup because ffmpeg was missing, corrected by installing the runner package; later render passed, upload artifact was unavailable. No soundtrack was supplied/reused.
- All ordinary content/news regression tests and Astro build passed on the second run; the visual proof was successful through video generation. Only media attachment and updated documentation were modified after that test; rerun branch content/build/asset smoke to confirm it serves. Human judgement of polish and reading holds remains open. The original published Intro at production main 4f0215aa1941fd129762c9923cd25349fbcbc03b remains untouched.


## AIIP-INTRO-01B | Rebuild the physically flat Intro and visible globe arrival (2026-11-17)

- **Owner feedback:** The first protected flyover looked unchanged: the website never became visibly flat, and the Earth did not visibly enter the view. The owner explicitly directed reading the entire OpenDesign landing-page flyover guide instead of its opening section. The full indexed written guide was reviewed, including all four instructional sections, scene/timing requirements, technical deliverables, scene boundaries, the case-specific failure analysis and follow-up prompt. The embedded creator video could not be fetched/verified, so no frame-accurate replication is claimed.
- **Root cause:** The earlier camera moved an unframed transparent text group without a visible website surface. Its Earth transform changed numerical opacity/position but left the globe mostly below the viewport. The initial browser test only inspected a rotation matrix and a relative Y change; it did not verify visual entry or grounded plane geometry.
- **Bounded correction:** Place an aria-hidden, high-contrast, geometrically visible backing surface and thin frame behind the unchanged Intro DOM copy. Animate that whole page as one steeply horizontal (80°) sheet, travel along the real paragraphs, zoom out and rotate upright (65%), then make the existing SVG globe rise into the viewport after upright (66%). The frame fades before the final original hero composition. No new copy, fabricated sections, external imagery/audio or transplanted reference video.
- **Improved proof:** Extend Chromium checks to ensure the sheet has a border and occupies meaningful screen geometry while pitched, and that the globe overlaps the visible viewport by at least 200px after the rise begins. Keep the original CTA, source text, desktop overflow, reduced-motion/phone opt-out and exact timeline regressions. Inspect all scene stills/MP4 before declaring visual acceptance. Existing artifact storage quota failure remains a delivery limitation until an alternative transfer is verified.
- **Release boundary:** Draft PR #5 feature branch only. No production/News/Education modifications, no unscheduled merge or release. Owner judges keep/revise/scrap after real visual review.
