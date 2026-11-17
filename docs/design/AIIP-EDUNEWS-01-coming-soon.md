# AIIP-EDUNEWS-01 | Education & News temporary arcade teaser

## Product intent and current status

**Status:** Owner-authorized temporary coming-soon interior page on the unmerged preview branch. This does not authorize production, a public launch, a completed Education library, or an operational news feed.

After accepting History, Benefits, Environment and Risks & Safety, the owner reserved Education & News for last. The owner now wants a cool, temporary page while gathering educational resources and deciding how news should work with RSS. They attached an HTML/CSS/JavaScript "Pixel Fighter Combo / InstaLanding Motion" animation as the desired temporary experience. The product is **AI in Perspective**, not a museum, and current editorial copy excludes em dashes.

## Design and behavior

- New route /explore/education-news is an intentional Coming Soon experience, not a generic planned placeholder.
- Keep the existing Education & News entrance artwork and transition unchanged. Link its fifth topic to the new route.
- Original AI in Perspective wrapper uses cyan, lavender and pixel-arcade accents. The animated fighter scene runs in an isolated HTML iframe, not the global Astro DOM. Uploaded source is stored in public/arcade/education-news-fighter.html with minor preview branding, metadata and provenance comment. The canvas pixel fighter, dojo backdrop, HUD, CSS 3D controller, movement choreography and reduced-motion behavior are retained.
- The iframe uses sandbox="allow-scripts" without allow-same-origin, giving the animation no access to the parent DOM. It is removed from tab order with tabindex="-1" because the demo controller is only a motion animation, not a playable game. An external focusable Replay animation button reloads the frame. A click inside the animation also replays it.
- The site text explains what is planned, not delivered: useful learning guides, reviewed references and a future approach to AI news with context. RSS is being considered; there is no live feed, subscriptions, data ingestion, news endpoint or invented headlines.
- The page is responsive; the mobile iframe aspect ratio fits the uploaded source's portrait layout. Parent/child reduced-motion behavior is present. No decorative art captions.

## Source provenance and third-party rights gate

The owner confirmed that the source website states this animation is free to reuse. Release research independently located Pixel Fighter Combo in InstaLanding.ai's official motion list and the site's public statement that the library is free and MIT-licensed. Its GitHub LICENSE explicitly grants modification, publication and commercial use while requiring the copyright and license notice in copies or substantial portions. We preserved Copyright (c) 2026 Ray Velez and the complete MIT terms in public/licenses/instalanding-MIT-LICENSE.txt, credited the source in the animation HTML and linked the license on the page. Source: https://instalanding.ai/m/pixel-fighter-combo.txt ; license: https://github.com/RayVelez27/instalanding.ai/blob/main/LICENSE . No claim is made that an unrelated third-party asset is covered by this license. The previously recorded licensing gate is resolved for this adapted animation.

The demo references Google Fonts for display, but the stylesheet now loads without blocking the animation and the frame starts without waiting for font loading. If fonts are unavailable, the interface falls back to system fonts. The script has no application network fetch. No new npm dependencies, credentials, RSS services, image generation or external API integrations were introduced. Preview with iframe sandboxing and evaluate performance and accessible fallback in browser review.

## Authority, files and verification

New: src/pages/explore/education-news.astro, src/styles/education-news.css, public/arcade/education-news-fighter.html and this design record.
Updated: public/discover/index.html Education & News URL only; tests/content.test.mjs for five real entrance destinations, temporary copy, iframe isolation and replay behavior; docs/PROJECT_CONTROL.md.

Unchanged: other four topic pages, intro, global styles, generic exhibit placeholder metadata, external APIs, and Draft PR #1 merge state. The previous preview-only restriction was superseded by the owner's explicit 2026-11-14 request to merge main and launch after release checks; use an independent public production Vercel project so the protected preview remains separate.

Validation requires exact-SHA GitHub content contracts and Astro build, Git-linked protected Vercel preview READY, and read-only GET for /explore/education-news, /arcade/education-news-fighter.html and existing four routes. Static GET only verifies HTML/assets, not Canvas animation rendering, mobile usability or actual screen-reader behavior. Owner desktop/mobile/keyboard/reduced-motion review remains open.

## Separate future work, not authorized now

Education: gather and vet resources, categorize by audience and topic, assess accuracy, accessibility, source licensing and update cadence.

News: independently decide RSS publishers, attribution rights, feed ingestion, caching, freshness dates, failures, deduplication, and how to separate reporting from interpretation. Implement only after a separate authorized data and content contract. The current page does not implement an RSS reader.

## Supersession note: AIIP-EDU-02 (2026-11-15)

This document records the original temporary combined Education & News Coming Soon experience and its source/license controls. By owner direction, the next feature splits that experience:

- /explore/education-news becomes the Education learning page
- /explore/news becomes the News Coming Soon arcade
- public/arcade/education-news-fighter.html and its MIT license remain at their established URLs
- no live RSS or automated news has been created

The current design and implementation contract is docs/design/AIIP-EDU-02-learning-atlas.md. Earlier text in this historical design record is not current route status. Both routes remain protected preview work until separately approved for public release.
