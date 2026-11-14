# AIIP-EXPERIENCE-08 — Simplified AI in Perspective ring selector (owner reset)
**Status:** Owner-directed, isolated feature-branch prototype, not visually accepted.
**Date:** 2026-11-14

## Controlling owner experience
Keep the **“AI HAS ARRIVED”** landing page exactly in its established art/text/composition, presently at `/intro`. It is the only prior designed page the owner chose to retain. After that, show a selection page **closely adapted from the uploaded complete Orrery/InstaLanding HTML example**, with our AI topics in place of the example’s nine fictional AI services. Drop spaceship journey, window deck, museum/data-center hub, unrelated new 3D scenes, extra mini-games and mandatory cinematic steps.

## Navigation
- `/` redirects to `/intro` to ensure the correct page is the starting experience; keep the original screenshot-matched intro title, statement and Earth visual, modifying only navigation target/link label.
- Continue/Skip on `/intro` now open `/discover/`.
- `/discover/` is a five-topic revolving ring of locally painted animated canvas worlds, with one centered topic, drag/touch, wheel, arrow/keyboard controls, optional automatic rotation, and an About sheet.
- Real topic links: Risks & Safety → `/explore/risks`, Benefits → `/explore/benefits`, Environment → `/explore/environment`. Do not overstate these pages' readiness; they already existed at source baseline.
- History and Education & News are displayed with “In development” rather than links to invented routes. Education & News stays last. RSS/news-source mechanics deferred.
- Existing Consciousness, Misconceptions and Agents & Security source routes remain untouched and recoverable though not exposed in the new five-window primary navigation. Editorial IA reconciliation is a later owner decision.

## Source fidelity & IP
The user provided the full approximately 117KB standalone HTML template with painter functions, a rotating ring, SVG glass distortion, dynamic title, canvas animation, drag/wheel/arrow navigation, a loader, and an About sheet. **Adapt this original implementation**, rather than create another approximated design. Keep source attribution comments. The header calls its brand fictional but is not a complete public software license; independently verify reuse rights before public release. No copied Cyera/Star Trek assets or new 3D dependencies.

## Bounded implementation / verification
`public/discover/index.html` is a standalone static page distributed through Astro's `public/` passthrough. `src/pages/intro.astro` keeps accepted artwork and copy; `src/pages/index.astro` becomes a minimal redirect to the canonical introduction. Existing app libraries, source content, old lab code and methodology stay unmodified in this unit, avoiding broad destructive cleanup until the proposed flow is approved.

Local Chromium 1440×900 and 390×844 rendering passed: five topics, intended selected labels, right-arrow state and real Risks href; zero page errors or horizontal overflow. **Performance warning:** The source paints multiple 1280×800 canvases on first load; software-rendered Chromium took roughly 23 seconds to finish. This is not acceptable as a verified release performance outcome. Optimize/cache or pre-render and test on realistic devices before promotion. Screenshot review does not equal owner acceptance.

Source tests, Astro build, protected Vercel preview, and direct navigation need to be verified on exact Git SHA after push. No merge or production release is authorized. Preserve rollback through Git history. Longer-term remove obsolete 3D dependencies/lab routes only by separate cleanup scope.

## Observed post-commit evidence (2026-11-14)

Commit `76d8f137b3ef133342fa85186447f82471f430b2`: GitHub Actions `43584992477` **SUCCESS**; Git-linked Vercel protected preview `dpl_6zEnsAvE26HxAV9wHivqcoK8Yvmn` READY on exact SHA, target null. Read-only authorized fetch passed HTTP 200 for root redirect, screenshot-matched `/intro`, the new `/discover/` route, and three existing linked topic routes. Local Chromium rendered desktop and mobile views (including reduced-motion preference on mobile), with five worlds, correct Risks arrow/CTA and no page errors/overflow. **Owner aesthetic approval is still absent.** The ~23-second software-rendered load and unverified template public usage rights are explicit release blockers pending further review. This update is documentation-only.

## EXPERIENCE-08B | Benefits Horizon variant — review candidate

Owner liked the simplified ring direction but disliked its cherry-blossom image under **Benefits**. Change only the Benefits scene binding from original template `pBlossom/aBlossom/ICON.blossom` to already included `pGrid/aGrid/ICON.horizon`, with a warmer sunset accent. No new art is generated and no other topics, text, controls, landing page or links change. This is a **trial** for review, not an owner-approved image. Cherry-blossom renderer source remains in the file for easy reversal. Tests assert mapping, then run exact-commit CI and protected preview verification. Existing performance and template-license checks still block public release.
