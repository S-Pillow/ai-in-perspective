# AIIP-EXPERIENCE-04 — Illustrated Interactive Worlds: visual reference (later page placement corrected)

> **OWNER SCREENSHOT CORRECTION — 2026-11-14:** The owner's approved existing **landing experience** is the **“AI HAS ARRIVED”** introduction with Earth horizon, introduction text, “Skip introduction” and “Continue to the museum”, **implemented at `src/pages/intro.astro` and served at `/intro`** (verified source blob `040b3aa318f45dca141522cb3134c0f5550dbe37`). The **separate `src/pages/index.astro` at `/` is the museum/atrium**, which the agent wrongly called the protected liked homepage. The intended sequence is the preserved **/intro design** → a proposed new spaceship information journey → a proposed observation-window selector, with routing/public path decisions still unapproved. This correction supersedes every assertion below identifying the museum at `/` as the owner's chosen landing page. Neither of the newly rendered Wayfinder prototype screens is visually accepted; owner said “No.” Do not rewrite the approved /intro design or merge/publicly release anything. See [EXPERIENCE-05](AIIP-EXPERIENCE-05-voyage-and-window-hub.md).


> **CORRECTION OF PAGE PLACEMENT (2026-11-14):** The owner explicitly likes the current homepage and wants it **preserved unchanged**. The Cyera visual inspiration now applies to two **NEW pages AFTER the homepage**: (B) a skippable, automatically progressing cinematic journey in an original exploratory spacecraft and (C) a swipeable/window-based topic-selection deck. See [AIIP-EXPERIENCE-05](AIIP-EXPERIENCE-05-voyage-and-window-hub.md). The previous suggestion to replace the homepage with an illustrated world is superseded. Education & News is the last window in a proposed five-window lineup; RSS details, including any 90-day period, are deferred.


**Owner direction:** November 14, 2026.
**Status:** Active primary visual and interactive *reference* for the main AI in Perspective experience. No new original concept, artwork, mechanics or homepage implementation has been visually accepted.
**Governing project state:** docs/PROJECT_CONTROL.md and AIPF v8.10.1; owner-accepted PRD v2.1 continues to govern unchanged educational/accessibility/evidence requirements. Formal PRD reconciliation of the experience metaphor is needed before release.

## 1. Decisive owner change

The owner supplied https://secure-the-unknown.cyera.com/ and explicitly declared that all previous ideas should be dropped in favor of a website **like this**. This supersedes the museum and the entire realistic/grand data-center direction (including central server core, rotating architectural globe, literal physical six doors, rack aisles and observation-gallery proposals). None of those previous features is a fixed requirement anymore. The rejected lab/core and lab/directions remain recoverable experiments, not selected designs.

Interpret the target as the *integrated interactive experience* of a professionally art-directed illustrated 3D world: coherent visual language, cinematic motion, distinct environments, creative navigation, small meaningful interactions and a sense of inhabiting a living place. **Not** just a purple color scheme or gratuitous effects. The request is *not* permission to clone Cyera's product, copy a cockpit/spacecraft/planets, assets, interface, challenges, voice, visuals or code. Develop original AI in Perspective intellectual property.

## 2. Grounded reference breakdown — source limits matter

The Cyera AI Guardian / Secure the Unknown site was made by **Active Theory**, as credited by DesignRush and CSS Design Awards. Public screenshots and descriptions show:
- A stylized, purposely *illustrated, flat-shaded 3D* sci-fi/space world with layered terrains, floating objects and clear silhouette/color language. This is excellent art direction, not bad flat technical diagrams.
- A cinematic opening/briefing, then a destination-selection experience framed by a vessel/interior; the reference features three separate environment choices.
- Camera-led transitions, a world that responds to user movement/selection, and small topic-related interactive challenges. The actions teach/reinforce each topic instead of merely decorating it.
- Real-time 3D visuals combined with interface text/controls that remain understandable.

Primary URL: https://secure-the-unknown.cyera.com/ (JavaScript-heavy; text extraction returned only Loading / enable javascript). Independent detailed teardown: https://rickcreates.com/r/2026-09-29-cyera-ai-guardian . Visual/award descriptions: https://www.designrush.com/best-designs/websites/cyera-ai-guardian-website-design and https://www.cssdesignawards.com/sites/cyera-ai-guardian/50227/ . Gallery: https://mesh3d.gallery/website/cyera-ai-guardian-secure-the-unknown .

**Technology caveat:** An independent teardown, not a first-party source-code audit, attributes the reference to Active Theory's custom Hydra WebGL renderer, Theatre.js sequencing, Draco 3D compression and real HTML interface overlays. Do **not** claim Cyera uses Three.js just because it appears in 3D galleries; its actual JavaScript execution was not instrumented in this investigation. The owner did not request this proprietary engine. Astro 5 + current Three.js/WebGL remains a candidate implementation stack, not the artistic answer by itself.

## 3. What the next site needs to achieve

**A single original, polished, illustrated interactive journey for six AI questions**, with coherent navigation/world language and actual motion:
1. An arresting visual opening and an understandable invitation to explore, without a mandatory long film.
2. A memorable, navigable central experience that presents all six subjects as *distinct places or interactions* rather than flat cards or an equipment diagram.
3. Seamless but purposeful transitions between those distinct environments. Camera/motion design should feel cohesive and authored, with restraint.
4. One small meaningful visitor action in an initial chosen exhibit; pilot it before committing to six mini-games. Don't promise games merely because the source reference features them.
5. Subtle ambient behavior and discoverable details that make the world feel alive; previous bird/mouse/day-night/water/shooting-star ideas were illustrative, not a checklist.
6. Real HTML labels, native links to the six existing routes, keyboard/touch navigation, visible focus, mobile-specific design, reduced motion and a non-WebGL path to the educational content.
7. Existing evidence-first education: original visual metaphors are *not evidence*, scientific measurements, or verified models.

**Six existing destinations remain unchanged in src/data/exhibits.ts:** Risks (What Should I Worry About?), Consciousness (Is AI Conscious?), Environment (AI & the Environment), Benefits (Where AI Is Helping), Misconceptions (Things AI Gets Blamed For), Agents & Security (AI Agents & Security). Only Environment currently has a working teaching prototype; the others are planned. Do not falsely market incomplete exhibits as complete.

Possible original world/interactions (hypotheses, not commitments): Risks can reveal an uncertainty/evidence decision; Consciousness can contrast observable behavior and unobservable experience; Environment can reveal energy-heat-cooling tradeoffs; Benefits can compare observed outcomes and limits; Misconceptions can change perspective with context; Agents & Security can expose permissions/actions/boundaries. Do not fabricate quantitative facts, risks or safety.

## 4. Visual / technical principles learned from earlier research

- **The stylistic lesson from Cyera:** A deliberately illustrated 3D environment, built from coherent geometry, colors, layers, framing and choreography, can be richer and more distinctive than unsuccessful pseudo-photorealistic assets or flat diagrams. Low-poly itself is not quality; *art direction* is.
- **Dioramas** (https://github.com/blendi-remade/dioramas): purposeful asset creation/lighting, browser-rendered screenshot review, multi-state QA; not a requirement to import its engine or AI model generator.
- **InstaLanding** (https://github.com/RayVelez27/instalanding.ai): complete-page visual coherence and isolated, precisely specified motion studies; not a recommendation to draw more flat servers.
- **OneShotPrompts** (https://oneshotprompts.com/): specific creative scene briefs including meaning, camera, artwork, interaction, timing, constraints and acceptance.
- **Opus 5.5 videos** (https://github.com/yihui-dev/awesome-opus5-5-videos): code-authored interactive 3D and films show feasibility, *not* proof of finished quality. The AI data-center film is only potential Environment teaching inspiration.
- **Polyfork** (https://github.com/lucas-martinic/polyfork-catalog): licensed and stylistically coherent assets should be evaluated before importing, if needed.
- **HoloML** (https://srajpal.github.io/holoml/): specify a scene object's role, position, trigger and interaction; not a reason to replace Astro/Three.js.
- **Awwwards**: benchmark complete-world design and motion rather than copying pixels, narratives or proprietary mechanics.

Current stack remains Astro 5, HTML/CSS/JS, Three.js 0.187.0 and WebGL in a rejected lab proof, GitHub Actions and a protected Git-linked Vercel preview. Theatre.js or GSAP is *not* approved as a new dependency by the reference link alone. Blender/glTF/GLB remain optional asset pipelines requiring actual capability and visual validation.

## 5. Deliberate next plan, not an automatic build

**Step 1 — Study actual experience:** Review Cyera's opening, scene navigation, transitions, interaction loops, pause/fallback, mobile and accessibility where browser tools can access them. Mark independent-review assertions separately from personal inspection. Do not claim to have played what could not be rendered.

**Step 2 — Author original candidate world concepts:** Compare 3–4 coherent first-screen + destination-selection concepts for *six* AI subjects. No three recolors, no rack/aisle diagrams, no copied Cyera cockpit. The comparison must be of complete visual experiences with intentional composition and interaction.

**Step 3 — Establish art pipeline and benchmark:** Build/review one integrated browser-rendered first-view and selection transition, with the chosen original visual style. Capture desktop and mobile frames and moving interactions. If the artwork remains generic, do not proceed by adding glow.

**Step 4 — Pilot one meaningful encounter:** Show a distinct subject world with a small purposeful interaction, real content link, pause/reduced motion and fallback. Refine art and interaction before expanding to six destinations.

**Step 5 — Seek owner visual acceptance before replacing homepage.** Preserve the accepted PRD for unaffected requirements, existing /, /intro, /explore/* and /methodology. The two rejected /lab routes remain historical. Work only in a newly authorized isolated feature-branch lab before the owner approves a replacement; no merge, production deploy, new paid model/source assets or unrelated edits.

## 6. Acceptance and legal boundaries

This is a **reference reset**, not approval of any particular original concept or a literal remake. Success means the user sees a cohesive, visually memorable, playful and legible interactive *AI in Perspective* world, not generic shapes masquerading as 3D, a backdrop with animation stickers, or a technical diagram.

Keep all artwork, scene models, copy, page layout, game designs and mechanics original; third-party references are not licenses to extract or copy them. Maintain accessibility, mobile performance and educational integrity. Inspect *actual browser output*, not only source/build/HTTP status. Explicit owner approval governs choosing the final original design and replacing /.

**Supersession:** This document and the latest Project Control Record entry override the former CORE-01 data-center visual direction and CORE-02 architectural studies. Their earlier next-steps and central core/globe mandates are withdrawn.
