# AIIP-UI-01 | Museum visual-direction correction research and brief

**Status:** Design discovery and candidate planning only. No design candidate selected or owner visually accepted. No changes to implemented UI.  
**Date:** 2026-11-12  
**Project authority:** Owner-accepted AI in Perspective PRD v2.1 (museum revision), AIPF v8.10.1.  
**AIPF classification:** Chapter 14, **Visual direction / substantial redesign**, with Chapter 12 existing-application baseline. The present visual iteration remains an unaccepted prototype.  
**Current code authority:** `feature/aiip-foundation-museum-slice`, draft PR #1; do not merge or treat preview as production.  
**Research sources (read-only GitHub inspection):**
- `pbakaus/impeccable` @ `b4bff1626c344067788c2679f048a20057c7cc5a`, Apache-2.0. [README](https://github.com/pbakaus/impeccable/blob/main/README.md), [skill](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md), [bolder](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/bolder.md), [overdrive](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/overdrive.md), [read mode](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/mode-read.md), [craft floor](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/craft-floor.md).
- `nextlevelbuilder/ui-ux-pro-max-skill` @ `6ae86f61f520d6ca229d2f40e070410638c908c5`, MIT. [README](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.md), [skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md), [Astro guidance](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/stacks/astro.csv), [charts](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/charts.csv), [motion](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/src/ui-ux-pro-max/data/motion.csv).

## 1. Problem and scope

The current preview is functional but visibly short of the accepted museum direction. The homepage currently reads as a conventional text-led hero, a glowing concentric Lens graphic, and a regular grid of six similarly structured arch cards carrying simple line icons. The Environment hero has an evocative water shape but insufficient physical/infrastructural specificity. This is a **composition/art-direction deficit**, not something that can be resolved by attaching more glow or hover effects.

**Goal:** Build an original, spatially convincing, animated museum environment with six genuinely different learning installations; maintain precise, research-based supporting content and high-quality reading experiences.

**Allowed for next separately bounded design unit:** Explore three materially different compositions within the accepted museum world. Produce original art direction, authored prototype scene states, and a first representative hall/Environment visual journey. Validate rendered behavior before making it the system for five more exhibits.

**Protected:** Six topics, routes, source/claim integrity, editorial scope, direct navigation, the visitor-controlled intro and Skip, substantial prose and charts, reduced-motion/keyboard/mobile access, no copying external visuals, no production changes or PR merge. Do not silently rewrite factual content, risk classifications, or the PRD.

## 2. What we adopt from the sources

| Source technique | Adopted application | Boundary |
| --- | --- | --- |
| Impeccable: distinguish **Experience** and **Read** modes | The hall and flagship openings immerse; research and deep dives use calm, legible reading surfaces within the museum's identity. | Do not turn content pages into animated spectacle; do not substitute decoration for information. |
| Impeccable: **bolder** via one decisive structural move, not more effects | Replace same-sized icon cards with an architectural/exhibition composition where each installation has its own scene. | Do not merely increase shadows, glowing rings, or movement on the existing grid. |
| Impeccable: **critique/audit** and target-based iteration | Inspect one meaningful scene at a time, rank usability/design defects, then batch targeted fixes. | Findings are advice, not a substitute for PRD or owner visual acceptance. |
| Impeccable: **overdrive** considers browser capabilities but first compares 2–3 directions | Prototype original atmosphere and transitions only after confirming the visual composition and real browser budget. | Avoid default WebGL/shaders and never enable the tool's unsafe live-agent fallback. |
| UI UX Pro Max: style/typography/motion/search catalogs | Use candidate generation and implementation checks to support deliberate originality, accessible contrast, and distinct motion roles. | Its catalog rankings are heuristics, not directions to turn the museum into SaaS or a generic gaming UI. |
| UI UX Pro Max: **Astro** advice | Static-first HTML and scoped interactive islands; no whole-site hydration for decorative motion; maintain independent routes. | Its stack reference targets Astro 7.1.6; our currently verified project uses Astro 5.x. Check version-specific API guidance before changing code. |
| UI UX Pro Max: **chart choice / a11y** | Time-based quantities → line plots; comparable discrete measures → zero-baseline bars; physical mechanisms → diagrams. Add tables, units, timeframes, source context and non-color encoding. | Chart selection never licenses invented figures or mismatched data scopes. |
| UI UX Pro Max: motion catalog | Separate ambient motion, focus/selection feedback, and educational state transitions; define cancel/reduced-motion behavior. | No universal duration or animation applied to every element. |

Do not run `npx impeccable install`, activate its hooks, or run its `live Apply` automation in this project as part of this review. The repository explicitly documents a fallback invoking external coding agents with approval/sandbox bypass. No CLI is installed, executed, or copied into this repository. Any future installation requires an exact reviewed version, execution/permissions audit, resource impact review and separate authorization. UI UX Pro Max's search script also remains uninstalled; its referenced data was inspected read-only through GitHub.

## 3. Candidate compositions within the already approved museum direction

Three **materially different arrangements**, not three themes that abandon the PRD:

1. **The Living Atrium (recommended first exploration).** A deep, monumental museum room with an original center installation and six physically distinct alcoves/objects arranged around the space. Visitors can select any subject directly. The hall establishes scale, light, distance and unmistakable subject specificity rather than six evenly sized panels. On mobile, convert the architectural scene into a deliberately composed sequence of substantial installations, not a cropped desktop collage.
2. **Gallery of Phenomena.** A curated sequence of six suspended sculptures/physical phenomena: shifting threat signals; layered neural system; cooling/water/compute infrastructure; observed benefits; refracted claim/evidence; connected trust-boundary network. Each scene's *material* and behavior is bespoke. Risk: can read as six disconnected artworks without a shared hall, so the environment must visibly connect them.
3. **The Observatory of Questions.** The Lens becomes an actual optical instrument that shifts viewpoint onto one of six subject-specific environments. The architecture frames the instrument; each selection reveals a unique chamber or vista rather than applying a different icon to the same portal. Risk: instrument could become a decorative bottleneck, so conventional direct navigation must remain present.

**Current preference for a first comp:** Living Atrium. Not owner-approved and not a mandate to implement without rendering the other materially different alternatives.

## 4. Vertical slice and authored states

- **Hall:** Original non-copied atmospheric background artwork/composition plus accessible DOM wayfinding. The six installations must have meaningfully different silhouettes and internal art. Authored states: idle, focus/preview, chosen/transition, reduced-motion static. No mandatory 3D first-person navigation, hover-only labels, or waiting.
- **Environment:** Transition from an authored physical water/electricity/cooling scene to an accurately labeled diagram and a substantial stable reading surface. Existing water-withdrawal/consumption behavior remains correct; any claim/figure added must be independently sourced and reviewed. Show source-to-mechanism and what is measured vs modeled, not an anonymous glowing drop as the sole teaching visual.
- **Deeper page:** Demonstrate a legible visual data/story structure with a real, checked comparison chart and/or diagram, source caveats, headings, and full text. A chart is not required until approved data exists; no invented numerical placeholders shown as facts.
- **No repeat template:** Component reuse stays in navigation, citations, semantics and evidence record components. Composition and signature teaching experience are exhibit-specific.

## 5. Rendered acceptance checks before expansion

- Compare **desktop (1440px), tablet and mobile (320/390/430px)** first viewports and selected installation states. The result must be recognizable as a museum scene at each size, not a conventional SaaS grid.
- Verify distinct identities for six installations with titles temporarily covered: they cannot be confused as identical icons with changed colors.
- Inspect original art layers and provenance; no third-party site assets or unlicensed fonts/images copied.
- Record whether movement creates atmosphere, directs selection, or teaches, and test that the reduced-motion version communicates the same content and affordances.
- Verify selection via touch, keyboard and pointer; show focus; navigation and Back/deep links remain normal.
- Audit font size and contrast in dark reading surfaces, text overflow/zoom, image and media load cost, and GPU/battery experience. Do not claim smoothness without browser observation.
- Confirm the short answer, substantial explanation, figures and provenance stay immediately accessible; no interaction is a prerequisite for comprehension.
- Record actual screenshots and observations, the chosen candidate, accepted deviations and outstanding visual debt in the project control record. **No screenshot inspection = visual quality not verified.**
- Gate: owner selects a rendered direction. Only then propagate it through all six complete exhibit experiences.

## 6. Stop and exclusions

This brief records research and a design correction plan only. It does not claim to have installed the tools, implemented a new hall, rendered new compositions, passed accessibility audits, or obtained owner approval. No new framework or commercial design tool is required, and no public release, domain change, external API access or unreviewed code execution is permitted by this document.
