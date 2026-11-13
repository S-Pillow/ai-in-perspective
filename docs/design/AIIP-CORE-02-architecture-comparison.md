# AIIP-CORE-02 — Architecture-first correction and visual comparison

**Date:** 2026-11-12  
**Classification:** AIPF v8.10.1 / Chapter 12 existing application + Chapter 14 substantial visual redirection + Chapter 18 protected preview. Managed, design-validation work.  
**Owner authorization:** Put the repo research into a plan and act. This authorizes new isolated architectural studies, targeted contracts, preview and review; **not** a main homepage replacement, merge, public deployment, paid asset acquisition, or approval of a final visual design.  
**Existing baseline:** `feature/aiip-foundation-museum-slice` / Draft PR #1; canonical `docs/PROJECT_CONTROL.md` revision 16; prior `/lab/core` is a rejected visual attempt but useful evidence of Three.js technical feasibility. Owner-approved source intent is a credible, animated data-center *experience* (not the supplied reference image). Six AI exhibit routes and education/evidence behavior protected.

## Why the first implementation failed

Its rack-like forms, rings, symbols and place-marker labels were generic primitives, not an architecturally justified facility. The scene lacked credible utility distribution, identifiable material/structure, spatial lighting, and subject-relevant portals. A working Astro build and running WebGL renderer do not establish art direction. Do **not** polish `/lab/core` with more neon, random procedural shapes, or extra animation.

## What the references taught us, with adoption decisions

- **Dioramas:** Study `docs/ENGINE.md`, `src/core/engine.js`, `src/core/reflector.js`, `scripts/shot.mjs`, `scripts/review.mjs`, `scripts/optimize.mjs`. Adopt deliberately authored assets, physically based materials, motivated lighting/contact shadows and real browser screenshots/console/FPS/mobile review. *Do not* import its full 3D renderer or paid model generator without measured need and separate authority.
- **InstaLanding:** Adopt the design system + precisely choreographed isolated motion study method from `AGENTS.md` and `motion/{hello-world-water,only-the-wind,dusk-valley-parallax}`. Animation is attached to meaningful components, with timing, input and reduced-motion rules.
- **OneShotPrompts and Opus video repository:** A scene brief must name objects, their function, placement, material, light, movement and observable success. The very short “show me inside an AI data centre” film prompt proves nothing about architectural fidelity. Evaluate procedural visuals, SVG/Canvas, shaders and full WebGL by role—not by novelty.
- **Polyfork:** Asset discovery includes an actual small server rack GLB; model license/visual fit must be checked before any acquisition. Do not fill the environment with mismatched library props.
- **HoloML/HyperSpace:** Declarative meaningful scenes (viewpoint, group, model, light, link, animation), but experimental language/renderer is not an Astro replacement.
- **Awwwards:** Editorial and visual benchmarking, not a source of copyable art, code, or inferred stack.
- **Infrastructure grounding:** ASHRAE Datacom Handbook chapter on hot/cold aisles; ENERGY STAR containment guidance; NVIDIA DGX SuperPOD design guidance. Aisles must have a believable supply/return-air story; electrical, network and cooling routes must have real endpoints. Illustrations remain conceptual, not engineering certifications.

### Architectural options compared in the isolated `/lab/directions` study

| Option | Physical composition | Main strength | Weakness | Decision |
|---|---|---|---|---|
| **01 Contained Aisle** | Human-height view along opposed equipment rack fronts with containment ceiling and overhead utility paths | Strongest sense of being inside genuine infrastructure | Six directly discoverable topical entrances would be difficult without an added gallery/navigation system | Preserve as a possible close-up transition / supporting scene |
| **02 Power-to-Cooling Cross-section** | Readable architectural section from incoming electrical equipment through compute to cooling equipment | Strongest explanation of environmental infrastructure, concrete flow | Too diagrammatic for a premium atmospheric hub | Prefer as a future **Environment** exhibit teaching sequence, separate scope |
| **03 Observation Gallery** | Visitor-scale gallery looking into real data hall behind glazed wall; separate thematic destinations on the gallery perimeter | Balances believable infrastructure with useful navigation and calm ambient activity | Must not become a flat “wall of server racks”; needs depth/material/light and evidence-aware previews | **Recommended provisional main hub composition for next asset study** |

**Evidence and uncertainty:** Local browser-rendered comparative vector composition studies were inspected at desktop 1440×900 and mobile 390×844. They are linework *planning studies*, not finished 3D scenes, not final visual acceptance, and not proof of production performance. The study route reproduces the architectural comparison rather than claiming realism. Reject any candidate that looks like generic neon hardware or sacrifices direct six-topic navigation. Provisional recommendation needs real 3D visual acceptance before the homepage changes.

## Next scoped implementation package

### CORE-02A — Actual (this unit)

- Add `/lab/directions` with three purpose-led architectural composition studies; the existing main home and `/lab/core` remain unchanged.
- Preserve all six exact exhibit topics/statuses as direct accessible links, with native tab buttons, reduced motion and mobile layout.
- Capture screenshots / test browser controls and content contract where available, check source and host deployment independently.
- Document a provisional direction based on the comparison, without writing “design accepted” or releasing.

### CORE-02B — Planned separate asset/material milestone

Use **Observation Gallery** as the default provisional candidate (subject to review). Model one *convincing* architectural slice: true depth, correctly oriented equipment rows, enclosure/glazing, overhead power/network routing, cooling physical logic, PBR materials, contact shadows, purposeful lighting. First produce 2–3 **material/camera** variants of that one layout with real 3D still captures, not three random stylistic presets. No artificial server sculpture. Include at least one motion behavior attached to real infrastructure. The stage must be visually compelling when paused.

### CORE-02C — Planned separate living-exhibits milestone

Make six real doorway previews connected to the visitor gallery: Risks incident evidence, Consciousness cognition/experience distinction, Environment power/cooling/water, Benefits measurable outcomes, Misconceptions claims versus evidence, Agents & Security permissions boundaries. Separate idle, selected and reduced-motion states. All links are HTML. Do not force a literal hardware explanation for philosophical subjects.

### Quality, testing and stops

- Visual QA: Playwright Chromium WebGL screenshot at desktop/mobile, console/page errors, keyboard/touch, no overflow, label occlusion, scene state, reduced-motion and GPU fallback. Note that headless Chromium is **not** proof of performance on real mobile GPU.
- Source contracts + Astro static build on exact commit, then Git-linked **protected preview** on feature branch, inspect deploy branch, protection/aliases, served route and assets. Git-connected preview builds may trigger automatically on pushes; verify them instead of claiming success in advance.
- Stop: no merge, no root-route replacement, no release or custom domain, no new external asset/license/paid pipeline, no rewriting PRD. The owner-directed visual delta requires formal PRD reconciliation before release.
- Risks: using line studies as a substitute for asset production; over-darkening and tiny labels; mismatched subject portals; mobile crop; GPU performance. All remain open and need real-device verification.
