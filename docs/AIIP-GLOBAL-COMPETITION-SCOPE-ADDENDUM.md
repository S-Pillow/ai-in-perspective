# AIIP-GC-01 | AI & Global Competition scope addendum

**State:** Preview implementation proposed; owner-accepted visual/content reference v0.6, no production release authorization.

## Authority and rationale

Owner's current narrative goal supersedes the original PRD v2.1 museum-era six-topic roster only for the current Discover set. The accepted Discover order is History, Risks & Safety, Benefits, Environment, AI & Global Competition, Education & News. Education & News remains last. This addendum does not erase the original PRD, and it does not authorize changing the separately published AI & Water project.

## Primary experience

Main question: **What If America Bans AI?** Compare a hypothetical broad U.S. ban while other countries continue advancing with continued U.S. AI development. Leadership is an ambition, not a predicted automatic result. The point is potential consequences for American jobs, businesses, cybersecurity, medicine, scientific discovery, national defense, technological dependence, and investment.

The owner approved the v0.6 standalone prototype after direct visual corrections. Preserve its substantive explanations, distinct comparative mechanisms, six topic stories, deeper sections, global view, interactive investment chain, and Explain Like I'm Five section. Do not replace these with generic illustrative labels or quizzes. No em dashes in newly authored ordinary visitor prose. Use human-sounding explanations and avoid defensive disclaimers that address claims never made.

## Implementation boundaries

- Route: `/explore/global-competition`, with Astro-managed metadata, stylesheet and script, and content imported from the owner-accepted artifact.
- Discover: add sixth original scene before Education & News. Preserve five accepted scenes, their typography and animation semantics, and six-position mobile usability.
- Cross-links: brief contextually placed pointers in Risks & Safety and Benefits; reciprocal routes in Global Competition.
- Privacy and platform: no live data ingestion, paid source APIs, AI jobs, or tracking. News snapshot and scheduled publication workflows are not to be changed.
- Claims: illustrative futures are possibilities, not invented observed outcomes; measured data retain sources and dates. Source spot-check and editorial review required before production approval.
- Publication: Git branch and draft PR are preview-only. An owner review of actual rendered site and separate explicit authorization are required before merge to `main`.

## Preview acceptance

Run `npm run check` (content contracts, News checks, Astro build), verify the rendered route and Discover at 320, 390, 430, 768, 1440 widths, inspect all six worlds and scenes, test click/tap/keyboard/reduced motion, and verify navigation back to Discover. Preserve existing News snapshot blob when reconciling against future `main`.
