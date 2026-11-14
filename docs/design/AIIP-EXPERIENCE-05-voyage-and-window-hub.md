# AIIP-EXPERIENCE-05 — Voyage and Observation-Window Hub

**Date:** 2026-11-14
**Status:** Owner-directed, implementation-ready WORKING STORYBOARD / interaction brief. Not approved artwork, final script, finalized five-window IA, or actual implementation.
**Authority:** Owner's successive clarifications in conversation; AIPF v8.10.1 and docs/PROJECT_CONTROL.md. Accepted PRD v2.1 remains authoritative for unchanged editorial, research and accessibility requirements, until a separately approved product reconciliation.

## 1. Precise product flow and what is protected

**PAGE A: Existing homepage /. KEEP IT.** The owner explicitly likes the existing landing page and wants its work preserved. The earlier Cyera-inspired direction note was too broad: it is NOT permission to replace the homepage. Leave the existing visual layout, links and content unchanged.

**PAGE B: New guided spaceship journey, immediately after the homepage.** A cinematic, deliberately art-directed auto-progressing informational voyage. An original sleek exploration ship, visually reminiscent of high-end science-fiction exploration vessels in broad design intent, NOT a rocket and NOT copied from Star Trek or Cyera. Short on-screen passages tell a meaningful story, automatically advancing while the space environment and camera move. An immediately accessible **Skip** bypasses the passage and enters Page C. Provide Pause/Play, reduced-motion static reading and visible transition to C.

**PAGE C: New spaceship observation-window topic hub, after B.** Strongly informed by the owner's second Cyera screenshot: one giant panoramic rounded viewport centered, with neighboring framed viewports partly visible at edges. The viewer feels located inside a single continuous exploration vessel. Distinct illustrated living worlds are visible outside the windows, with a heading, short description and **Explore** action on the active view. Mobile visitors horizontally swipe/snap. Desktop visitors use pointer drag, trackpad horizontal gesture, visible arrows and keyboard arrows while focused; never trap normal vertical scrolling. Tap/click Explore to open the selected topic's separate route. No game-like first-person navigation is required.

**The explicit lesson:** Borrow Cyera's polished illustrated interactive storytelling, not its actual spaceship, three planets, purple palette, game mechanics, fonts, code or artwork. Existing /intro and /explore/* routes are protected while prototypes are tested. No homepage changes.

## 2. Page B: provisional copy, in readable auto-progressing beats

The owner wants more than an abbreviated line. Cover the **history, risks, benefits, education and ongoing news/developments of AI**. The following is a draft, not accepted publication copy:

**Beat 1 | Welcome aboard**
"We're setting out to understand one of the technologies reshaping our world: artificial intelligence."

**Beat 2 | A story decades in the making**
"AI didn't appear overnight. Its history stretches through generations of ideas, discoveries, setbacks and breakthroughs."

**Beat 3 | Where it helps**
"Today, AI is changing how people work, learn and create. Some benefits are measurable. Other promises still need to be tested."

**Beat 4 | Risks that matter**
"There are real risks, and they deserve serious attention. What could go wrong? What safeguards exist? Where are we still falling short?"

**Beat 5 | Keep learning**
"AI is evolving quickly. Education helps us understand it, and the latest headlines give us new questions to investigate. Not every headline tells the whole story."

**Beat 6 | Your journey, your questions**
"Together we'll explore the history, risks, benefits, education and evolving story of AI. Choose where you'd like to begin."

**Visual rhythm hypothesis:** An arresting first frame -> reveal the ship as an actual vessel -> move through original illustrated space/landscapes while story beats appear -> gradual approach to a windowed observation deck -> reveal the selectable world windows. Do not precommit exact shots, unlicensed art or a 3D engine before seeing a convincing composition. The ship's presence is central; no lone orb, no literal rocket.

**Control contract:** The short segments and visual transitions may advance automatically, but never forcibly redirect to a different URL without visitor action. Skip immediately opens the deck. A clear **Explore the windows** action at the end enters the deck. Pause/Play is visible; suspend progression on hidden tabs; no audio by default; use manual readable steps for reduced motion. People can jump directly to the hub or exhibits, and browser Back works. Final pacing and text need visual review and owner approval.

## 3. Page C: framing and user interaction

**Composition:** one large active ship observation window with an animated landscape/subject environment, partial windows immediately left and right, rounded architectural framing, carefully coordinated material/color decisions, consistent original ship interior. This is not six computer monitors, a flat SVG diagram or a row of isolated cards. The reference shows a big active middle window and a taste of each adjacent window; use this viewing principle, not copied pixels.

**Interaction:** touch swipe native horizontal scrolling with snap; desktop pointer drag; trackpad horizontal input; accessible previous/next buttons; Left/Right keys when this carousel has focus; visible position/number indicator and direct topic list for assistive tech. The active window's text and Explore link must be legible, clickable and stable before animation finishes. Avoid hijacking vertical mouse-wheel navigation or scroll traps. Reduced-motion and WebGL-off states preserve choice and clarity.

**Motion:** subtly animated worlds outside the glass; restrained ship life and purposeful camera/scene transitions when changing windows. Ambient movement does not obstruct buttons or reading. The scene should be compelling when still. Test mobile-specific composition rather than cropping the desktop.

## 4. Current proposed FIVE windows, awaiting explicit IA reconciliation

The owner directly requested **Education & News as the LAST window** and removal of Consciousness from the window selector. The owner also questioned whether Agents & Security warrants a standalone topic and emphasized that Risks deserves deep treatment. An assistant proposed this five-window arrangement; it is a **working proposal**, not approval to delete the six older source routes.

| Window | Working title | World and visitor promise | Route reality |
|---|---|---|---|
| 01 | **History of AI** | Passage through eras of questions, research and technological progress, with individually sourced dates only when content is developed | No current route. Plan separately; do not invent a functioning destination |
| 02 | **AI Risks & Safety** | Serious, evidence-aware treatment of documented threats, mitigations, unresolved gaps and practical steps. Include AI agents/security issues if owner approves consolidation | Existing /explore/risks; currently planned |
| 03 | **Where AI Is Helping** | Human-scale outcomes and limitations rather than generic techno-optimism | Existing /explore/benefits; currently planned |
| 04 | **AI & the Environment** | An original environmental world with coherent links to power, compute, heat, water and climate questions | Existing /explore/environment; prototype exists |
| 05 | **Education & News** | A rich learning-and-information destination; potential for curated educational materials and appropriately sourced recent AI developments | No current route. LAST per owner; design later |

**Important preservation/reconciliation:** The current accepted PRD v2.1 and src/data/exhibits.ts still contain six original subject pages: Risks, Consciousness, Environment, Benefits, Misconceptions, Agents & Security. The conversation's latest window plan is not an approval to delete pages, break old URLs, erase research or silently replace content models. Consciousness is removed from the **proposed windows**, not necessarily from every existing URL. Misconceptions could be integrated across evidence-first subjects; Agents & Security could be an important Risks topic. These remain open editorial decisions. Risks and Benefits should not be combined because risk-seeking visitors need an independently serious destination.

**Education & News is NOT in implementation scope now.** The owner mentioned an RSS feed, perhaps a rolling 90-day window, alongside hand-curated learning resources. The 90-day period and all RSS mechanics were explicitly called a quick thought to discuss later. Do not choose providers, retention policy, scheduler, news ranking or CMS during Page B/C work.

## 5. Tech/integration plan and release boundaries

**Current stack:** Astro 5 static site, browser JavaScript and Three.js/WebGL already used in earlier unsuccessful isolated lab studies; GitHub, GitHub Actions and Git-linked protected Vercel preview. No need to copy Cyera's proprietary engine. A beautiful original art/asset pipeline must be established first; working WebGL geometry is not a visual pass.

**Proposed isolation only:** new /lab/voyage and /lab/observation-deck routes on the feature branch, linked together. These are candidate development URLs, NOT chosen public canonical paths. When no real History or Education & News route exists, a planned state and link to approved existing content are safer than made-up URLs.

**Implementation milestones after design review:**
1. Compose **complete first-frame artwork** for the journey plus the actual observation-deck viewpoint with partial adjacent windows. Compare for original art quality before investing in mechanical complexity. Do not repeat generic primitives/diagrams.
2. Build one vertical slice: first and last journey narrative beat, auto progress and Skip; then deck with one live destination and adjacent partial preview; create actual browser capture and inspect.
3. Connect the remaining approved windows and test mobile swipe, desktop drag/buttons/keyboard, media queries, reduced motion, no GPU and direct links.
4. Get explicit owner visual acceptance. Only then plan to integrate public navigation, amend the accepted PRD for approved IA/direction, and consider merging/releasing.
5. Individual exhibit content, journalism, RSS and resource curation are later separate bounded units.

**Safety:** / homepage remains exactly as-is. Do not overwrite /intro or modify src/data/exhibits.ts, existing exhibit pages, methodology or unrelated app state without an explicit later owner change. This design brief is not an authorization to publish, purchase assets, merge or replace a live route.

## 6. Acceptance checkpoints

- **Narrative:** automatic movement of short, meaningful story passages, clear "of AI" context, serious Risks, no false empirical claims, immediately visible Skip, controllable pacing and readable reduced-motion mode.
- **Visual:** distinctive original exploratory spaceship and one cohesive illustrated world; central viewport plus partially visible neighbors; art-directed lighting/forms and no low-effort technical diagrams, 3D primitives or still-plus-glow trick.
- **Navigation:** mobile swipe/snap; desktop mouse drag/trackpad, visible arrows and keyboard; clear title/CTA; actual routes vs planned states accurately represented; no first-person game or scroll trap.
- **Engineering:** source-pinned tests and Astro build, protected preview exact SHA, real browser/mobile and desktop screenshots, console and event checks, real motion and fallback inspection; visuals are not proven by CI or HTTP 200.
- **Owner:** review cinematic words, final window lineup, artwork and transition behavior before / integration or canonical-route changes.

**This document is a proposed creative/interaction blueprint, not a finished rendered screen or approved route migration.**
