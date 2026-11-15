# AIIP-EXPERIENCE-10 — How AI Uses Water

**Status:** New isolated implementation for owner visual review, not acceptance or release.
**Date:** 2026-11-14
**Governance:** AIPF v8.10.1, PRD v2.1 and the repository Project Control Record.
**Authority:** Owner agreed to the two-scene Environment concept: retain the already built "How AI uses energy" installation, and introduce a **separate isometric water scene** that distinguishes withdrawal, recirculation, evaporation, and return/discharge. The owner approved the blueprint in conversation; no permission was given to merge, publish or rewrite another page.

## One main teaching outcome

Water withdrawal is not the same as water consumption. Some withdrawn water returns, some is reused within equipment (not the same as a return), and some is lost from the local system through evaporation. The outcomes depend on cooling design and site. **The illustration uses no invented quantitative water split.**

## Two separately labeled physical scenarios

**Mode A (default): Data center / evaporative cooling.** A river is one illustrative makeup-water source, not a claim that all data centers use rivers. Water is withdrawn through intake/pump, enters the heat rejection arrangement, recirculates in a cooling loop, and part evaporates into the atmosphere. Blowdown is a separate liquid discharge. This **particular hypothetical facility** depicts blowdown passing through an illustrative treatment station to a **permitted treated return to the river**. Other facilities can use sewer discharge, additional treatment or recovery; the return shown is not a generic cooling-tower requirement. Data-center server racks supply the heat. The close-coupled loop and paths are a conceptual art model, **not engineering construction guidance**.

**Mode B: Power generation / once-through cooling.** An explicitly **different** schematic facility takes river water through a condenser and returns most to the source at a higher temperature. No data-center cooling tower is shown. Ecological/thermal impacts can still exist even if consumptive use is comparatively low. This example illustrates an **upstream energy-related** water dimension; it is not the same as on-site data-center cooling.

Mode switch resets focus to Whole flow. Focus buttons show Whole flow, Withdrawal, Reuse loop, Evaporation and Return / discharge; the Reuse/Evaporation buttons are disabled for once-through mode because they are not the main paths depicted. On-site explanations, accessible semantic SVG titles/descriptions, a persistent legend, and substantive static text accompany the illustration.

## Visual fidelity and layout

Uses the existing ISO-GLOW-inspired isometric kernel vocabulary and a separate original SVG composition, with water source/bank, pump, detailed seven-bay server racks and switch/roof fans, heat exchanger, cooling tower with moving water-vapor plume, blowdown/treatment equipment, power-generation building, condenser and return piping. Animated directional pipe dashes/arrow markers communicate flow. No embedded Three.js/ISO-GLOW gallery and no new runtime dependencies. Existing MIT license remains linked from the page footer.

At desktop widths the SVG fits inside the bounded panel; at <=700px the 980px model plate scrolls inside its own accessible region with a swipe cue and focus-driven panning; automatic starting pan avoids a blank margin. Animations respect `prefers-reduced-motion`, the Pause/Play toggle and hidden-tab conditions. The page does not impose top-level horizontal scroll.

## Editorial and evidence boundaries

Primary references:
- U.S. Department of Energy — [Cooling Water Efficiency Opportunities for Federal Data Centers](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers): evaporative cooling, recirculation, makeup water, blowdown.
- U.S. Department of Energy — [Best Management Practice #10: Cooling Tower Management](https://www.energy.gov/cmei/femp/best-management-practice-10-cooling-tower-management): evaporation, blowdown, drift, maintenance water balance.
- U.S. Geological Survey — [Thermoelectric Power Water Use](https://www.usgs.gov/mission-areas/water-resources/science/thermoelectric-power-water-use): once-through versus recirculating power-plant cooling, returned water and temperature.

The examples are illustrative, not a measured or statistically representative data center, power plant or water budget. Water vapor is not destroyed; it joins the global water cycle and can nonetheless leave the relevant local watershed in the accounting period. Direct-to-chip/immersion describes internal heat collection; ultimate heat rejection determines facility water usage. No unsupported energy consumption comparison, millions-of-gallons assertion, real-time data, or actual site is represented. Existing detailed water-withdrawal content in historical Git remains recoverable.

## Files and excluded scope

Edited: `src/pages/explore/environment.astro` (only insert new scene after the energy scene, add scoped stylesheet/script imports); new `src/scripts/environment-water.js`; new `src/styles/environment-water.css`; expanded `tests/content.test.mjs` source contract; this design note and PCR status update.

Untouched: earlier energy scene JS/CSS; site intro `/intro`, root redirect, five-topic selector `/discover/` and its Benefits Horizon, all other topic routes, data, methodology, dependencies and production/release config. No public release, feature branch merge or API/quota activity.

## Local verification, not deployment acceptance

- Node syntax check on the new JavaScript: PASS.
- Chromium Playwright render of an isolated standalone HTML derived from the exact Astro water-section markup and scoped CSS/JS: 1440x900, 390x844, 320x844 PASS (SVG and accessible semantic title present, no page exceptions, document width matches viewport; internal horizontal scroll present only for mobile).
- Both modes, return/discharge focus, once-through disabled controls and Pause state observed in DOM. Mobile initial view correction inspected via screenshots. Note mobile scrollLeft immediately after smooth focus clicks is not an authoritative assertion; allow the scroll animation to complete.
- These are local derivative tests, not evidence the final Astro build compiled or that the protected Vercel page rendered correctly. CI, build and protected preview require separate exact-commit verification before reporting success.

## Review gates

Owner aesthetic/educational approval pending. Verify the deployed route, bundle behavior, mobile swipe and reduced motion, accessible keyboard controls and real-device performance where practical. Before public release, editorial review should confirm the depicted permit-specific treated return route and water-source tradeoff claims and reconcile the accepted PRD's larger Environmental deliverable. No deployment/merge authorization is implied by a visually promising preview.
## Exact-commit build and preview verification

Implementation source `6bc9935476e2a06d31482246a1d23e1a5e602447` preview-built, but the older Environment content contract in GitHub initially failed because it wrongly rejected the new scenario controls. Tests/docs-only correction commit `b030e0c607e404c748ed9df8113857f7a0c19be2` narrowed the obsolete check. GitHub Actions run `43604287446` **completed SUCCESS**, covering content checks and Astro build. Vercel protected preview `dpl_FzJqiVgGqPWUHMEVTNshW8BVMtU3` **READY** at the exact corrected source SHA (target null). GETs for Environment, intro, ring, Benefits and the MIT license returned 200, and the generated Water scene JS bundle returned 200 and contained both expected scene marker strings. This was a read-only hosted response check, not a hosted browser interaction test. Owner visual and educational acceptance remains pending; no public release or merge.
