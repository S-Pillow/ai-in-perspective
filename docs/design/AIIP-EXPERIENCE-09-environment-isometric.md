# AIIP-EXPERIENCE-09 — Environment page restart: connected physical systems

**Date:** 2026-11-14  
**Governance:** AIPF v8.10.1 and `docs/PROJECT_CONTROL.md`.  
**Scope / owner authorization:** After accepting the proposed hybrid system composition, the owner stated “let's go” to proceed with rebuilding the **Environment** page. This unit changes only Environment presentation, supporting local script and styles, ISO-GLOW license text, targeted content regression, and the project record. It does **not** revisit the AI HAS ARRIVED introduction, the approved rotating topic selector, Risks, Benefits, or other education pages; no merge or public release.

## Intended visitor experience

Replace the old water-withdrawal-only hero/lab with a cohesive, original isometric environment scene built using the **isometric projection and hairline-glow conventions** of the owner's uploaded `iso-glow.zip`. The detailed seven-unit server-rack example in the ZIP was studied as a quality/semantic reference; the page uses a smaller original SVG rack composition, **not the extracted Three.js rack code itself**. Source ZIP's ISO-GLOW and iso-figure MIT license remains visible as `public/licenses/iso-glow-LICENSE.txt` and linked in the page.

The isometric scene is **one connected illustrative system**, not five separate decorative icons: (1) generation / generic electrical supply building, (2) substation and grid handoff, (3) detailed rack cluster with seven server bays and a switch, (4) heat-rejection/cooling equipment and a possible water-assisted loop, (5) the surrounding water/land context. Mechanical forms are a teaching depiction, not a plant topology, a source-mix claim, or a measured installation.

Visitors can select `Whole system`, `Electricity`, `Compute`, `Cooling`, or `Environment`. The selected system brightens while the rest recedes and explanatory text changes. Desktop view shows the full model; on mobile it is deliberately a **horizontally scrollable/pannable illustrated plate**, with a visible cue and focus selection that pans to relevant objects. A Pause/Play movement button plus `prefers-reduced-motion`, hidden-tab pause, semantic descriptions, native controls, and text explanation preserve accessibility. No audio, external simulation or fake numbers.

Below the scene, the page has three explanatory sections (power, computation/heat, cooling/water) and a context statement. Primary research links are the [IEA Energy and AI 2025 report](https://www.iea.org/reports/energy-and-ai) and [Berkeley Lab's 2024 US Data Center Energy Usage Report](https://eta.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report). They ground general mechanisms but do not validate the art as a literal engineering diagram.

## Important science and interpretation caveats

- AI computation draws electricity and rejects waste heat, but facility equipment, local climate, electricity fuel mix and cooling design vary.
- **Water withdrawal is not water consumption.** Do not treat the depicted reservoir as mandatory for all data centers or assume all cooling is evaporative; dry cooling / air cooling exist. There is no numerical water/electricity claim or per-prompt estimate in the new page.
- The generator building **does not imply a selected fuel type or direct source** supplying that exact installation. Animated lines are conceptual flows, not measured real-time activity.
- Nothing on this page claims that a 2D illustration predicts actual heat, power, cooling demand or external emissions.

## Implementation surface

- Replace **only** `src/pages/explore/environment.astro` (fresh presentation, preserving route).
- Add `src/scripts/environment-system.js` (SVG projection/scene + state, motion and focus behavior; no added runtime dependencies).
- Add `src/styles/environment-rebuild.css` (fully `.environment-rebuild` and `.env-` scoped, no changes to global intro/ring styling).
- Add `public/licenses/iso-glow-LICENSE.txt` (copyright/license retained from uploaded MIT reference).
- Replace the previous obsolete water-only test with current Environment page contracts in `tests/content.test.mjs`.
- Update PCR with factual implementation evidence and outstanding browser/release gates.

## Observed local proof

The original layout was run in local headless Chromium via `page.set_content` (file and local HTTP navigation were blocked by the browser sandbox). At 1440×900, 390×844 and 320×844: complete SVG generated, no JS page errors, no document horizontal overflow, and focus selection changed the explanatory text. Pause changed `data-motion` from `on` to `off` on desktop. Reduced-motion phone case defaulted to `off`. The mobile scene is an internal 790px-wide horizontally scrollable SVG, with a labelled region and programmatic panning by chosen focus; top-level document stays within the viewport. Local screenshots exist at `/mnt/data/aiip-env09/environment-final-1440.png`, `environment-final-390.png`, `environment-final-320.png`, not as repository assets.

This is **browser smoke of a standalone derived HTML preview**, not an Astro compilation test or production browser QA. Exact-source GitHub Actions, deployed protected preview, actual full-page render and owner aesthetic approval are separate release gates. The code is a new prototype, not an accepted final exhibit.

## Release boundaries and follow-up

- Existing introduction (`/intro`), root redirect, selector (`/discover/`), all other `/explore/*` routes and methodology are unchanged.
- Any material quantitative comparative content and more detailed research is a separately approved editorial unit. No new RSS, news system, calculator, science data feed, or live grid tracking in scope.
- No PR merge, public release, license provenance change, third-party asset purchase, external quota use or unrelated code cleanup was authorized.