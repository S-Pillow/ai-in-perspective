# AIIP-CORE-01 — Living Data Center creative reset and interactive 3D study

**Date:** 2026-11-12  
**Status:** Owner-directed visual-direction change; first bounded technical study authorized, **not** visual approval or release.  
**Source authority:** Owner-accepted `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, especially GOV protected commitments, IA-05, EXP-06 through EXP-14, VIS-05 through VIS-10, TECH-01 through TECH-08; later owner message changes the hall's **visual metaphor** to a data center. AIPF v8.10.1 / `docs/PROJECT_CONTROL.md` govern execution.  
**Reference:** User-provided ForgeForward Data Solutions composition (2026-11-12): only a *directional reference*, not transferable art. No ForgeForward logo, wording, image pixels, layout files, proprietary assets, or service categories may be copied into AI in Perspective.

## 1. Owner intent and rejected approaches

Build an original, coherent **living data-center experience** instead of the unaccepted “Living Atrium” museum-hall prototype. Character: grounded industrial architecture, credible server hardware, real spatial depth, restrained practical lighting and separate real exhibit bays. The central data-processing core should carry traveling electrical/data pulses; a world/network globe rotates; small believable peripheral activity gives the space life. Exhibit bays preview **the existing six AI in Perspective questions**, not cloud hosting sales categories. Animation is ambient discovery, not a videogame, a long forced tour or a moving illustration pasted onto a flat generated background.

The owner **rejects** the previous generic glowing SVG/hologram installation styling and flat-image-plus-effects proposals as the direction for the hub. Current code and old Vercel previews are historical recoverable prototypes only. Their successful CI checks were never evidence of visual acceptance.

## 2. Product invariants and governance delta

- Preserve the six exact slugs/questions and status distinction in `src/data/exhibits.ts`: Risks, Consciousness, Environment, Benefits, Misconceptions, Agents & Security. Keep all existing routable pages, factual/evidence contracts, Environment teaching prototype, intro copy and Skip/Continue, methodology and static-first site.
- User selection always operates through visible, keyboard/touch accessible semantic links; no required first-person movement or 3D game controls. All six remain accessible if GPU is missing, motion is reduced, or 3D fails. No misleading synthetic analytics masquerading as actual evidence.
- The **experience metaphor** is a new owner direction subsequent to the PRD. The PRD remains authoritative for unaffected commitments; record this as a scoped owner-directed change, **not** a claim that the attached accepted DOCX has been silently edited or formally reissued. A later explicit PRD amendment/reconciliation is required before design release.
- Intro desktop acceptance remains independent. No alterations to unrelated ForgeForward sites, domains, DNS, existing AI & Water, public release or other application state.
- Work first in an isolated route `/lab/core` on the existing feature branch, behind the draft PR and protected review-only preview. Do not replace `/` until rendered desktop/mobile design acceptance.

## 3. Comparison of approaches (research-backed engineering decision)

| Approach | Real spatial geometry? | Visual ceiling | Cost / limitations | Disposition |
|---|---|---|---|---|
| Flat still + CSS/SVG overlays | No | Good for UI; poor for convincingly changing camera/light/occlusion | Easy, but directly contradicts owner request | Rejected as primary composition |
| Prerendered architectural animation + HTML | Rendered 3D, but not live scene | Very high; assets require external art production | Little interactivity of viewpoint; media cost | Possible supplemental media, not main 3D study |
| **Three.js WebGL scene + Blender/glTF asset pipeline** | **Yes** | High with excellent modeled assets, calibrated light/PBR and compositing | Requires geometry/art production, WebGL performance/fallback | **Selected for core study and direction** |
| Babylon.js runtime engine | Yes | Comparable | Broader engine functionality than first scene needs | Viable alternative if Three.js blockers emerge |
| WebGPU-only shaders/world | Yes | High but hardware/browser support complexity | Unnecessary platform risk for current stage | Deferred |

Three.js uses a scene/camera/WebGL renderer/animation loop, meshes, physically based materials and reusable instancing. Blender exports keyed animation, materials and models to glTF/GLB. glTF is the accepted portable 3D asset delivery format; KTX2 and geometry compression only if measured to help; do not optimize nonexistent assets.

**Authoritative technical references (research verified 2026-11-12):**
- Three.js scene / renderer / animation loop: https://threejs.org/manual/pages/creating-a-scene.html
- Three.js WebGL instancing: https://threejs.org/docs/pages/InstancedMesh.html
- Three.js responsive rendering and framebuffer budget: https://threejs.org/manual/pages/responsive.html
- Three.js resource disposal: https://threejs.org/manual/pages/how-to-dispose-of-objects.html
- Three.js physically based materials: https://threejs.org/docs/pages/MeshStandardMaterial.html
- Astro client JavaScript without changing framework: https://docs.astro.build/en/guides/client-side-scripts/
- Blender glTF 2.0 exporter: https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html
- Khronos glTF and PBR: https://www.khronos.org/gltf/
- Khronos KTX2 texture guide: https://github.com/KhronosGroup/3D-Formats-Guidelines/blob/main/KTXArtistGuide.md
- Babylon engine capability comparison: https://www.babylonjs.com/specifications/
- MDN WebGL performance and context loss: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- Three.js npm release: https://www.npmjs.com/package/three (checked `0.187.0`, MIT license, latest as of date)

## 4. Visual and animation art direction

**Spatial design:** One anchored camera looks into a believable data-center atrium. Matte graphite/concrete structure, satin steel racks, dark glass, subtle floor reflections and actual recess depth, not six cards or six unrelated neon sculptures. Central multi-rack column has visible individually modeled server modules and physically placed moving power traces. Rotating globe belongs to a high-right wall/balcony display, not as a decorative floating logo. Only purposeful accent colors and restrained luminance.

**Subject bays (future complete works):** Risks = signal/incident-evidence environment; Consciousness = behavior-versus-experience research chamber; Environment = infrastructure, cooling and water cycle; Benefits = evidence-of-outcomes laboratory; Misconceptions = source/claim analysis chamber; Agents & Security = permission and boundary operations center. Entry art must communicate the subject; themed differentiation is not just six recolors. The initial 3D study can use provisional bays, but they must never be claimed complete.

**Motion states:** Ambient/idle = low-amplitude globe rotation, independently varied rack lights, subtle core tracer; focus = restrained local scene/lighting response; selection = enter the topic immediately; reduced motion/static = no continuous movement while the scene and readable links remain intact. Later rare environmental moments are authored for the actual environment, not precommitted to mouse/bird/waterfall Easter eggs.

**Responsive:** First-class mobile composition with useful crop and native six-topic navigation. Desktop 1440px and mobile 320/390/430px visual review required. A static semantic fallback remains visible until scene initialization; no GPU requirement for using any exhibit.

## 5. Implementation sequence and acceptance

**AIIP-CORE-01A — first bounded unit:** Add a self-contained route `/lab/core`, one Three.js dependency, a 3D scene module, isolated visual CSS, source contracts, this decision brief and Project Control Record update. Render a genuine 3D floor/structural environment, central modeled server rack core with pulse objects moving along 3D curves, and a real 3D rotating network globe; include six visible direct HTML links using the existing exhibit metadata. Limit scene complexity and avoid paid/remote assets, image-generation shortcuts and full-site restyle.

**AIIP-CORE-01B — quality / architecture after independent review:** Replace provisional geometry with art-directed Blender-authored GLB assets, validated material palette, physically meaningful portals and distinct scene previews; evaluate 2–3 materially different architectural arrangements with actual rendered states. Add purposeful focused/selected bay reactions; only then consider root hub replacement.

**Engineering evidence:** GitHub Actions content contract + Astro static build on exact commit, protected unaliased Vercel preview matching source revision, served route/JS/CSS response and noindex, diagnostics for WebGL initialization, animations, fallback, reduced motion and resource cleanup.

**Visual acceptance:** **Pending actual device/browser review.** Inspect live 3D at desktop and mobile, camera, depth/occlusion, legibility, composed bays, animations, input, WebGL fallback, reduced motion, load/performance; visual fidelity is not established by successful build/HTTP/3D object presence. Separate formal PRD direction reconciliation before merge/public launch. Hard stop on visual underdelivery: revise art direction or asset pipeline, not add decorative glow.

**Authority / operation boundaries:** The owner has explicitly authorized the scoped visual-direction update and starting creation of a prototype, but has not approved merge, replacing the active home design, public production deploy, new external service, domain or DNS changes. AIPF Ch. 12 + Ch. 14 + hosted preview Ch.18; treatment Managed because of substantial UI direction/3D dependency, release gate closed.
