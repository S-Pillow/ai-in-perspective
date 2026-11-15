# AIIP-EXPERIENCE-06 — Wayfinder voyage and observation-deck visual slice

> **OWNER SCREENSHOT CORRECTION — 2026-11-14:** The owner's approved existing **landing experience** is the **“AI HAS ARRIVED”** introduction with Earth horizon, introduction text, “Skip introduction” and “Continue to the museum”, **implemented at `src/pages/intro.astro` and served at `/intro`** (verified source blob `040b3aa318f45dca141522cb3134c0f5550dbe37`). The **separate `src/pages/index.astro` at `/` is the museum/atrium**, which the agent wrongly called the protected liked homepage. The intended sequence is the preserved **/intro design** → a proposed new spaceship information journey → a proposed observation-window selector, with routing/public path decisions still unapproved. This correction supersedes every assertion below identifying the museum at `/` as the owner's chosen landing page. Neither of the newly rendered Wayfinder prototype screens is visually accepted; owner said “No.” Do not rewrite the approved /intro design or merge/publicly release anything. See [EXPERIENCE-05](AIIP-EXPERIENCE-05-voyage-and-window-hub.md).


**Date:** 2026-11-14  
**Status:** Prototype implementation on `feature/aiip-foundation-museum-slice`, **owner visually rejected as shown** on 2026-11-14, not the accepted landing page, not approved for integration or release. Functional/browser checks are not visual acceptance.  
**Authority:** Owner approved proceeding with the previously discussed Astro + Three.js + Blender + GSAP approach, scoped to an original spacecraft composition, cinematic transition and representative observation-deck window. AIPF v8.10.1; `docs/PROJECT_CONTROL.md` remains authoritative.

## Scope

New isolated prototype routes only: `/lab/voyage` and `/lab/observation-deck`. Do not modify current `/`, existing `/intro`, six `/explore/*` routes, `src/data/exhibits.ts`, methodology, content evidence or any production/custom-domain state. Draft PR #1 remains unmerged.

- **Voyage**: original starship model, live Three.js/WebGL scene, animated camera progression and six short draft AI narrative chapters, with GSAP timeline, pause, immediate skip to observation deck and a manual reduced-motion mode. On-screen text remains readable without WebGL. No compulsory auto-redirect or audio.
- **Observation deck**: original curved observation-frame interface, centered view with partial neighboring windows, horizontal touch/trackpad and mouse-drag, prev/next and keyboard navigation. A *single* active Three.js environment is moved between windows, with subject-specific scenic geometry and explanatory prototypes. Route labels reflect real `/explore/*` destinations versus future History/Education pages; no invented links. Scenes are a proof of the mechanism, **not** complete art for all worlds.
- **Wayfinder model**: an original swept-wing exploratory vessel, no franchise or Cyera assets. Source generator `scripts/build_wayfinder_asset.py` outputs `public/models/wayfinder.glb` from authored mesh lofts, swept wings, canopy, inlays, nacelles, surface relief and lights. All geometry is original and no external model source is used. It does **not** claim a Blender-authored asset, because Blender was unavailable in the initial execution environment. Blender refinement/import-export remains a separate art-production step when that capability is established.
- **GSAP**: newly added dependency, pinned to version `3.15.1` for timeline control only. It is not used to hijack global page routing or force scrolling.

## Visual requirements and limits

Target is original, illustrated, cinematic, high-quality interactive website experience inspired by the *craft* of `https://secure-the-unknown.cyera.com/`. No Cyera artwork, spacecraft design, planet arrangement, copy or game mechanics are reused. Existing homepage remains intact. Prior flat data-center diagrams and arbitrary glowing geometry were rejected; a GLB and functioning WebGL alone are **not** visual acceptance. Evaluate static first frame, silhouette, scene depth, legibility, material response, responsive crop, transition pacing and actual interaction before scaling.

The model is an authored parametric original GLB, not a professionally sculpted Blender asset; its quality must be judged in actual browser renders. The five-window arrangement is a working proposal (History, Risks & Safety, Benefits, Environment, Education & News last), not a revision of the accepted six-exhibit PRD. The two new destinations have no live editorial routes yet; the old Consciousness/Misconceptions/Agents & Security routes remain untouched.

## Intended checks

1. Exact-commit source-contract tests + Astro static build (with `three` and `gsap`) on GitHub Actions; verify pass/failure by run ID.
2. Git-linked Vercel **preview** `target=null` and commit parity; authenticate if required; verify two new routes, model URL, JS/CSS and old pages remain available.
3. Actual browser screenshot and interaction review at 1440×900, 390×844 (and ideally 320/430), including motion, model load, tab/keyboard controls, native drag/swipe, reduced-motion, WebGL fallback, console errors, and mobile GPU if available.
4. Operator visual review against the art-direction quality target. Do not infer quality from a successful build, GLB parse or HTTP 200.

## Gates and carryforwards

- **No homepage or existing intro change.** No PR merge, custom domain, public release, DNS, third-party paid models or external services.
- Visual acceptance is **pending** until actual interactive renders are inspected and explicitly accepted by the owner.
- This is a **single representative connected slice**, not completed five scenic worlds, finished exhibit pages, audio, actual RSS/news, data analytics or approved public narration.
- If the GLB feels too simple, do **not** add random neon shapes to compensate; improve geometry/art direction via a proper Blender/sculpting pipeline or rethink the composition before scaling.
- The eventual use of Blender is accepted as a *planned production tool*, not verified as installed/used in this asset. A future step can import, retopologize and art-direct the model in Blender after this browser proof.
## Owner rejection and landing-page identity correction (2026-11-14)

The owner inspected the rendered Wayfinder voyage and observation-deck screenshots and responded **“No and you saved the wrong home/landing page.”** The owner then supplied a screenshot of the visually preferred original introduction: **AI HAS ARRIVED**, introduction prose, **Skip introduction**, **Continue to the museum**, and Earth horizon. This exact content is source-confirmed at `src/pages/intro.astro` (`/intro`, blob `040b3aa318f45dca141522cb3134c0f5550dbe37`); it is NOT `src/pages/index.astro` (`/`), which contains the museum atrium. The prior claim to preserve `/` as the *owner-liked* landing page was mistaken.

**Disposition:** WAYFINDER visual slice NOT owner accepted. The browser-backed implementation still exists on protected isolated `/lab` routes, but neither art direction nor navigational placement may be advanced from it by implication. The next design pass must preserve the actual /intro composition, compare any further spaceship artistic concepts to the provided Cyera screenshots, and not advance the inadequate preliminary output merely because it is WebGL/GLB. No homepage or /intro code was edited in this correction; no merge, production release or public URL reassignment was authorized.
