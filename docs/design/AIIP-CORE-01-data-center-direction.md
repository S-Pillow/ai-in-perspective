# AIIP-CORE-01 — Living Data Center (historical / superseded)

> **SUPERSEDED BY LATER OWNER DIRECTION (2026-11-14):** The owner has discarded the data-center/museum concepts and selected the *interactive illustrated 3D experience* of https://secure-the-unknown.cyera.com/ as the new primary **visual and behavior reference**. See [AIIP-EXPERIENCE-04](AIIP-EXPERIENCE-04-cyera-interactive-world-direction.md) and the newest Project Control Record entry. This file remains historical only: central core, elevated globe, physical data-center six bays, observation gallery and related implementation steps are **no longer requirements**. Do not assume approval to copy the reference's artwork or mechanics.


**First recorded:** 2026-11-12  
**Reconciled:** 2026-11-12, after owner review of `/lab/core` and all three `/lab/directions` studies  
**Decision state:** **Owner-directed experience metaphor; NO owner-accepted page composition or finished visual prototype.**  
**Project governance:** AIPF v8.10.1; canonical state and release boundary in [`docs/PROJECT_CONTROL.md`](../PROJECT_CONTROL.md).  
**Product authority:** Owner-accepted `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, subject to the owner's later scoped change of the *hub's visual metaphor*. The accepted DOCX has **not** been reissued or silently amended. Its unaffected educational, navigational, factual, accessibility and exhibit requirements remain controlling.  
**Reference authority:** Owner-provided 2026-11-12 ForgeForward-branded architectural data-center image is a **visual direction reference only**. Create original AI in Perspective architecture/artwork/navigation; do not reproduce source pixels, logo, site, copy, service categories or other protected third-party materials.

> **LATEST OWNER CORRECTION — READ BEFORE ANY DESIGN OR IMPLEMENTATION:** The owner rejected the first programmatic 3D hall and then rejected **all three** subsequent flat architectural studies (contained aisle, power-to-cooling section and observation gallery) as directions for the **main** page. The observation gallery is **NOT selected, NOT approved and NOT the required next milestone**. The previous recommendation to proceed with its model/material study is superseded. The fundamental failure was shifting from an immersive, ambitious, living AI destination to an equipment illustration / infrastructure explainer. Do not resume or salvage those designs as the homepage. This decision applies to the main hub's design process, not a blanket prohibition on diagrams or educational content inside exhibits.

## 1. The owner's real goal: a compelling living destination

Build an original **AI in Perspective** main hub that feels like entering an extraordinary, inhabited technological complex. This is an **experience-driven interactive website**, not a film, video game, data-center engineering schematic, literal replica of a commercial facility, or conventional grid of six cards.

The owner's architectural reference conveyed a sweeping **multi-level, grand interior** with a central technological installation, an upper-level globe display, and **six spatially integrated entrances** to distinct thematic areas. The appeal came from a cohesive designed space, atmospheric light, material richness, clear visual hierarchy, a sense of scale and discoverable details—not from the reference brand or its hosting-service categories.

**The envisioned experience, in priority order:**

1. **Memorable first impression.** Visitors should immediately recognize a visually sophisticated, dimensional, cohesive futuristic data-center-inspired destination. It must be beautiful when paused; neither an obvious AI-generated still nor simplistic procedural geometry passes.
2. **Signature central core.** A central installation with credible form and *electrical/data activity passing through it*. Its movement serves as the heart of the scene—not an arbitrary glowing cylinder or stack of rings. The final object design is open for art-direction exploration.
3. **Architectural globe / world display.** An elevated display (the owner's example was high right) contains a globe that genuinely turns, with tasteful geographic/network visual language. It should be connected to the building, not a floating token. Exact position/design is a composition decision, not a fixed mandate to imitate the reference.
4. **Six meaningful, discoverable exhibit entrances.** The hall's architecture exposes actual themed doors, rooms or visual windows; **inside each is an original, small animated subject preview** that gives visitors an intelligible glimpse into the topic. The entrances are the navigation, not unrelated little illustrations or a text list bolted on after the scene.
5. **Ambient life and occasional discoveries.** Small environmental motions, some continuous and some rare, should make the setting feel inhabited, analogous to the discoverable activity in Roku's standby screen. A bird, a tiny mouse, lighting shift, water, or a shooting star were **examples of the *principle*, NOT approved feature requirements**.
6. **Usable educational product.** The destination leads promptly into the same six evidence-first exhibits. Navigation, readable text, focus states, mobile layout, fallback and reduced motion remain first-class. Visitors must not be required to explore a 3D game space to find a topic.

**Creative license and boundaries:** A data-center-inspired architectural fantasy can be grander and more visually engaging than a real facility. Equipment and lighting should be plausible and intentional, but **infrastructure accuracy must never take over the page's purpose**. Actual engineering schematics belong, if useful, inside a relevant teaching exhibit.

## 2. The six exhibits belong inside the world

Preserve `src/data/exhibits.ts` and its exact slugs, existing routes and status distinctions. The following are **creative briefs to explore, not accepted finished designs**:

| Existing topic / slug | What visitors should glimpse through its actual entrance | Avoid |
|---|---|---|
| **What Should I Worry About?** — `risks` | Meaningful investigation of a signal/incident, evidence under examination, careful distinction of known and unknown | Unexplained red warning icons, generic danger spikes, fake live threat numbers |
| **Is AI Conscious?** — `consciousness` | A contemplative, intelligible inquiry into behavior, perception and the limits of claims about subjective experience | Glowing brains/heads, simulated proof of consciousness, random purple geometry |
| **AI & the Environment** — `environment` | Power, computing, heat and cooling/water flows with an understandable physical connection | Decorative water disconnected from compute, arbitrary green leaves, false quantitative claims |
| **Where AI Is Helping** — `benefits` | A believable scene suggesting examination of real human benefits and measured outcomes | Generic uplifting bars, unsupported breakthrough graphics, stock marketing scenes |
| **Things AI Gets Blamed For** — `misconceptions` | A claim and its evidence/context visibly changing interpretation, possibly through an optical/editorial interaction | Unrelated prisms/triangles, changing color alone, predetermined or misleading conclusions |
| **AI Agents & Security** — `agents-security` | An interpretable action sequence involving tools, approval/permissions, boundaries and observable results | Random locks, octahedrons, claim that all autonomy is safe or unsafe |

**Common requirement:** The six mini-scenes are visually distinct **because their subjects differ**, while their entrances share one coherent architectural language. The previews are a *taste* of the exhibition, not a forced multi-minute explanation. On activation, a native link goes to the real exhibit. Environment is currently the sole working teaching prototype; other exhibits remain planned, and previews must not misrepresent their readiness.

**Separate later direction:** The code-generated film from @mdaman010 (power grid → compute hardware → heat/cooling) is valuable as an **Environment exhibit teaching-format reference**. It does **not** redefine the homepage as a hardware explainer or dictate the hub's art style. Its exact creator implementation was not independently verified, and the repository's Three.js/GLSL/SVG listing pertains to a **remake**, not automatically to the original film.

## 3. Visual design standard: deliberately authored, not generated-looking

**Positive standard**
- A cohesive, immediately readable **full-page spatial composition**, with multilevel architecture, a convincing central focus, six discoverable access points, clear scale, good camera/crop, intentional negative space and integrated typography.
- Beautiful material and lighting decisions: carefully controlled practical light sources, metal/glass/concrete and other chosen materials with physically coherent response where 3D is used; texture and reflections only where useful.
- Selective luminous detail and environmental motion—ambient rather than continuously competing for attention.
- A design that feels individually art-directed rather than a default AI-template aesthetic. Premium and imaginative, without substituting spectacle for meaning.
- A **mobile-specific composition** maintaining both the sense of place and accessible six-topic navigation; never treat phone as a blindly cropped desktop scene.

**Disallowed shortcuts / known anti-patterns**
- **Flat, ugly technical diagrams as homepage candidates.** The last three drawings demonstrated an architecture-first design *failure*, not a success. No further aisle schematics, wall-of-racks observation scenes or power/cooling block diagrams as the primary landing experience without a completely new owner decision.
- **Random polygons/cylinders/rings/holograms** as exhibit art or fake equipment. Every visible significant object needs an architectural, navigational, narrative or technical role *and visual quality*; “purposeful” is not synonymous with “industrial schematic.”
- An AI-generated still dressed up with floating glow/particles pretending to be independently moving physical objects. An original authored rendered 3D environment can be used, but the source-image-only method must not quietly reappear.
- Repeated neon borders, identical room cards, generic glowing faces/brains, fake charts, over-dark scenes, tiny low-contrast UI or effects unrelated to the subject.
- Treating a successful dependency install, 3D renderer initialization, content test, Astro build or HTTP 200 as evidence of artistic success.
- Selecting the **first** technically feasible composition just because it is inexpensive to code.

**Important nuance:** Real 3D geometry, pre-rendered loops, authored SVG, Canvas and CSS are all allowed when they materially serve the composition. Requiring every pixel to be WebGL is **not** an accepted goal; requiring the world to feel spatially coherent and *not like a flattened still with pasted animation* **is** a goal.

## 4. Animation behavior and technology by visual need

The owner wants a *living scene*, **not** a video game or full animated film. Ambient effects are an art-direction layer after the visual composition succeeds.

| Motion layer | Candidate behavior (examples, not promises) | Appropriate techniques |
|---|---|---|
| Core signature | Gentle traveling pulses/data flow through meaningful structural pathways; selective practical rack/display activity | Three.js animation/shaders, modeled meshes, or authored 3D animation within the scene |
| Elevated globe | Smooth, slow rotation and occasional tasteful activity within its display enclosure | Three.js spherical mesh or author-rendered animation if camera is fixed |
| Exhibit scene glimpses | Unique topic-driven motion through the architectural openings | Small independent Canvas/SVG/CSS animation, short original loop, or scene-integrated 3D depending on effect |
| Ambient life | Practical lighting, changing displays, atmospheric activity, subtle reflections | Targeted lighting/material updates, canvas or CSS; no forced engine for trivial tasks |
| Discoverable Easter eggs | Rare, optically/contextually plausible events tied to the environment | Lightweight event scheduling with careful constraints, not random visual clutter |

**Motion quality:** Continuous behaviors should not all share the same obvious loop. Occasional events should be infrequent and situated (behind windows/architecture, not over controls). Maintain pauses, reduced motion, page visibility performance control, no sound by default and no flashes or distracting animation over reading content.

## 5. Technology decisions — use the right tool, not the most complex one

**Existing verified code stack:** Astro 5, HTML/CSS, browser JavaScript/TypeScript, `three@0.187.0`, WebGL, GitHub Actions, Git-connected protected Vercel previews. The existing `/lab/core` already proved we can serve a custom 3D renderer; it did **not** prove visual quality.

**Realistic production routes to evaluate:** 
- **Three.js/WebGL** when a scene truly needs depth, camera perspective, separate physical models, material lighting and independent spatial animation.
- **Blender-authored GLB/glTF** when genuine equipment/architecture detail, coherent asset structure, material control or baked animation justifies it. Blender/asset-production capability is a **pipeline to establish**, not something the project already has or a guarantee of realism.
- **Original SVG/Canvas/CSS** for isolated 2D display movements and accessible UI. The presence of a GPU/3D tool elsewhere on the page does not force it into every preview.
- **GSAP** as an *optional* choreography tool for reliable motion timelines and scene focus; not installed or necessary by default.
- **Video/animated assets** selectively for effects that cost too much to render live, without making the entire page a flattened video or embedding links/text in the footage.
- **Physically based materials / HDR lighting / selective post-processing / geometry & texture compression** only after a composed scene exists and the browser review shows the techniques help. No automatic bloom/SSAO/effects dependency list.

**Key technical source docs:** [Three.js scene](https://threejs.org/manual/pages/creating-a-scene.html), [responsive renderer](https://threejs.org/manual/pages/responsive.html), [resource disposal](https://threejs.org/manual/pages/how-to-dispose-of-objects.html), [Blender glTF exporter](https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html), [Khronos glTF](https://www.khronos.org/gltf/), [Astro client scripts](https://docs.astro.build/en/guides/client-side-scripts/), [MDN WebGL performance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices).

## 6. What the referenced repositories *usefully* taught us

The useful lessons are **process and production techniques**, *not* the flat design subsequently delivered. Avoid inventing source claims; these are notes from previously inspected public READMEs/source, not a new independent local benchmark.

1. **[Dioramas](https://github.com/blendi-remade/dioramas)** — Study its engine and `scripts/review.mjs`, `scripts/shot.mjs`, `scripts/optimize.mjs`. Worth carrying forward: serious authored 3D assets, motivated lighting/materials, screenshot comparisons at actual browser sizes, console/performance inspection and an iterative **brief → build → render → critique → revise** loop. Do **not** adopt its AI-image-to-3D generation as the default or assume its full engine is required.
2. **[InstaLanding](https://github.com/RayVelez27/instalanding.ai)** — Worth carrying forward: composed *complete pages*, coherent design-system decisions, and isolated motion studies with explicit timing and interaction. The useful element is joining layout, type, visual system, behavior and motion in one art-directed pass; **not** making another flat server illustration.
3. **[OneShotPrompts](https://oneshotprompts.com/)** — Worth carrying forward: write concrete scene briefs describing **what/where/why**, material, framing, timing, triggers, non-goals and acceptance, instead of vague “make it futuristic” prompts. It is not a substitute for artistic judgment or browser review.
4. **[Awesome Opus video prompts](https://github.com/yihui-dev/awesome-opus5-5-videos)** — Worth carrying forward: ambitious original visual sequences can be code-authored with Three.js/GLSL/Canvas/SVG when the prompt and execution provide specific spatial/visual constraints. The @mdaman010 “inside a data centre” example is **an exhibit-format reference**, not a recipe for the hub. The prompts/recreations are not proof we can match the film's quality without testing.
5. **[Polyfork catalog](https://github.com/lucas-martinic/polyfork-catalog)** / [asset browser](https://polyfork.dev/assets) — Worth carrying forward: recognize that *real* equipment models and asset inventories are preferable to improvised fake hardware **when** their artistic style fits. Check asset license/provenance and whether low-poly geometry meets the intended quality. No asset is currently approved or imported.
6. **[HoloML](https://srajpal.github.io/holoml/)** / [HyperSpace 3D](https://github.com/srajpal/hypersol-hyperspace-3d) — Worth carrying forward: define each scene component's **semantic role, spatial position, trigger and response** before code. Do **not** replace the proven Astro/Three.js stack with an experimental scene language on this evidence.
7. **[Awwwards WebGL](https://www.awwwards.com/websites/webgl/), [3D](https://www.awwwards.com/websites/3d/), [GSAP](https://www.awwwards.com/websites/gsap-animation/)** — Inspiration for polished *whole-page interaction and art direction* only. Gallery membership does not verify a site's specific stack or license its designs for reuse.
8. **[TechnoLyte](https://technolyte.com/) / [Sinderweave](https://sinderweavelabs.com/#projects)** — Proposed comparisons only. Prior attempts to inspect TechnoLyte were blocked by HTTP errors; Sinderweave's exact animation stack was **not** independently established. Do not claim their implementation proves or disproves Three.js or GSAP.

**What NOT to carry forward from the research attempt:** the idea that “physically purposeful” means “literal infrastructure drawing,” or that three code-generated diagrams count as three competitive premium website designs.

## 7. Authoritative rejection history (do not silently reopen)

| Item | Technical state | Visual/product decision |
|---|---|---|
| Museum Living Atrium | Historical homepage candidate | Superseded by owner-directed data-center setting; not accepted as final |
| **`/lab/core` — CORE-01A** | True Three.js 3D geometry, lights, rotating sphere, 3D moving traces; built and served in protected preview | **Owner rejected visually**: simplified shapes, no convincing coherent high-quality environment, generic tokens for exhibits. Keep recoverable as technical experiment only |
| **`/lab/directions` — CORE-02A** | Three SVG architecture studies, selectable in a separate route; built and served through Git-connected protected preview | **Owner rejected all three as main-page directions**. They looked like technical/equipment illustrations, and their proposed observation-gallery winner is withdrawn. Do not use `/lab/directions` as source of visual acceptance |
| 03 Observation Gallery “selected” | Historical agent recommendation in CORE-02 document/PCR | **Explicitly invalidated by the owner**. It is not a default next implementation and no live design commitment follows |
| AI in Perspective main page | Existing `/` is still the old museum implementation | Data-center homepage remains **unbuilt and visually unapproved**. Six routes and existing learning content should be preserved |

**Scope distinction:** 02 power/compute/cooling imagery may remain a conceptual teaching *idea* for a future Environment exhibit, subject to separate evidence and design approval. It is **not** the homepage direction. No CORE-02 generated art should be reused automatically.

## 8. Corrected production workflow — the next assistant must follow this order

**Stage A — Re-establish design intent, not code output.** Inspect the actual repo/PRD/PCR and this note, then restate what a visitor should see and do on the **main landing hub**. Use the original owner reference for visual *ambition only*; ask for it to be reattached if the new chat cannot view it. Do not assume the new chat has that image. Identify exactly where the central core, upper globe and six integrated entrances sit in each candidate.

**Stage B — Creative competition, not cheap variants.** Explore **3–4 materially different high-quality, whole-page arrangements** of that same complete visitor experience: different architectural spatial grammar and camera emphasis, not merely color schemes or 3 server aisle drawings. Each candidate must visibly account for **central core, globe, six subject entrances, scale, typography, visitor wayfinding, and restrained living details**. Before choosing, critique against the owner's visual reference and the failure modes here. If convincing authored visuals cannot be produced with current tools, report the concrete missing art capability instead of claiming a winner.

**Stage C — Prove real art production in one integrated slice.** After selecting a promising architecture for further exploration (not declaring owner acceptance), demonstrate a **single integrated composition** with its actual camera, modeled architecture/equipment where appropriate, material/lighting and at least 1–2 real subject-relevant entrances. Do not start by coding a ring, rack or globe in isolation as if it makes a homepage. Real asset modeling/licensing route must be established and validated before the full build.

**Stage D — Add motion because the scene has a purpose.** Specify motion briefs for central energy activity, globe, one exhibit preview and optionally one ambient event. Implement each with the least complex adequate renderer. Verify it does not look like overlay tricks, does not create fake activity claims, and does not distract from navigation.

**Stage E — Extend to all six entrances and responsive presentation.** Each scene is genuinely unique and consistent with the parent architectural world. The static-first site, accessible direct links, mobile-specific composition, performance/fallback, noindex while prototype, and reduced-motion behavior all remain.

**Stage F — Visual gate, then integration authority.** Obtain browser-rendered stills and motion evidence at desktop/mobile, inspect lighting, depth, occlusion, topic meaning, navigation and performance, compare alternatives, and secure **explicit owner visual approval** *before* replacing `/`. A subsequent AIPF approval unit handles PRD direction reconciliation, merge and eventual public release. Do not silently infer authority from “get started.”

**No default winner now.** Stage B must not pick observation gallery or another design automatically. The owner's taste/acceptance matters; technically sufficient is not artistically sufficient.

## 9. Evidence and acceptance requirements

- **Visual review must test the *whole first viewport*** (not an isolated server model), and the accessible path to all six destinations. Evaluate broad composition, dimensional fidelity, art quality, motion integration, exhibit relevance and differentiation, readability and polish.
- **Representative captures:** at least desktop ~1440px and mobile 320/390/430px, with live animations examined rather than inferred from source. Note who captured the evidence and whether it is a local scene, Vercel preview or a real device. A generated concept image is mood/reference only and **not equivalent** to captured functioning code.
- **Browser diagnostics:** visible rendering after initialization, console/errors, keyboard/touch, no text collisions or horizontal overflow, no fake UI, mobile GPU performance, no catastrophic context loss, pause/reduced-motion and WebGL-free navigation fallback.
- **Source evidence:** source-pinned GitHub Actions tests + Astro build; preview source SHA/branch/deployment target, served unique route sentinel, JS/CSS response, access protection. Git-connected Vercel preview now exists. A 200 response alone does not validate actual WebGL output.
- **Evidence status:** As of this correction, neither rejected prototype has passed owner visual acceptance. The **next page design has not been started or validated** in these docs. Do not claim visual progress on the basis of the latest comparison tests.

## 10. Exact current source context and safety boundary

- Repo: [`S-Pillow/ai-in-perspective`](https://github.com/S-Pillow/ai-in-perspective); ongoing feature branch `feature/aiip-foundation-museum-slice`; **Draft PR #1** [link](https://github.com/S-Pillow/ai-in-perspective/pull/1), unmerged as verified during this documentation correction. Re-read head SHA and `docs/PROJECT_CONTROL.md` on the next turn; do not hardcode a stale commit into a new implementation.
- Existing routes: `/` old museum candidate, `/intro` cinematic entry, `/explore/environment` working teaching prototype, other `/explore/{slug}` destinations (planned), `/methodology`, and rejected isolated labs `/lab/core` and `/lab/directions`. Labs are historical, not the approved main design.
- Governance: AIPF v8.10.1; the owner-accepted PRD remains product authority for unchanged scope. The data-center metaphor has owner direction but no final visual or reconciled PRD revision.
- Vercel project `prj_ogxXY2zsXmNWfbQzJo3L5MipbJxC` is **GitHub-linked** to `S-Pillow/ai-in-perspective`; automatic preview builds on branch pushes should be **verified**, not presumed. Protected previews only; no production/custom domain/public release.
- The current task is **documentation correction + next-chat handoff only**, authorized by the owner. **Do not modify application source, regenerate art, start another design, merge, deploy manually or publish** as part of this task. GitHub automation may create a fresh preview on docs pushes; record it separately rather than treating it as an approved visual candidate.

## 11. Explicit acceptance criteria for a future main hub

A main hub candidate is not ready for owner acceptance unless it:
1. Feels like one polished, **grand immersive** AI-tech environment rather than technical drawings, conventional cards or generic GPU primitives.
2. Has a compelling integrated central data/energy core and a purposeful rotating globe or equally approved interpretation.
3. Shows **six discoverable, distinct subject-relevant entrances** in the architecture with credible miniature motion previews, without a separate link list being the only usable way to navigate.
4. Makes ambient world behavior tasteful, legible and opt-out-capable rather than arbitrary constant sparkle.
5. Uses visual art/asset production appropriate to the requested quality, not a flat generated still under superficial overlays.
6. Works as a webpage with accessible native destinations, mobile-specific composition, reduced-motion/static fallback and truthful evidence-based content.
7. Has been **seen moving and inspected in actual browsers**, and explicitly accepted by the owner; build/HTTP checks are necessary but insufficient.

**Next allowed action after this handoff:** Read-only discovery and a scoped next design unit on the feature branch, subject to the above plan and exact GitHub state. No previous lab “winner” may be silently promoted.
