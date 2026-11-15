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

The attached demo includes "InstaLanding Motion" branding in the original source and comments, but **no explicit copyright/license grant**. It was supplied by the owner for this task. This permits a private protected design prototype, not an assumption of public redistribution rights. Before public merge or production release of this demo, verify provenance and appropriate redistribution permission/license or replace it with a fully original equivalent. Keep this approval gate open regardless of passing tests.

The original demo references Google Fonts for display, consistent with the existing site, but its script has no application network fetch. No new npm dependencies, credentials, RSS services, image generation or external API integrations were introduced. Preview with iframe sandboxing and evaluate performance and accessible fallback in browser review.

## Authority, files and verification

New: src/pages/explore/education-news.astro, src/styles/education-news.css, public/arcade/education-news-fighter.html and this design record.
Updated: public/discover/index.html Education & News URL only; tests/content.test.mjs for five real entrance destinations, temporary copy, iframe isolation and replay behavior; docs/PROJECT_CONTROL.md.

Unchanged: other four topic pages, intro, global styles, generic exhibit placeholder metadata, external APIs, and Draft PR #1 merge state. No public deployment.

Validation requires exact-SHA GitHub content contracts and Astro build, Git-linked protected Vercel preview READY, and read-only GET for /explore/education-news, /arcade/education-news-fighter.html and existing four routes. Static GET only verifies HTML/assets, not Canvas animation rendering, mobile usability or actual screen-reader behavior. Owner desktop/mobile/keyboard/reduced-motion review remains open.

## Separate future work, not authorized now

Education: gather and vet resources, categorize by audience and topic, assess accuracy, accessibility, source licensing and update cadence.

News: independently decide RSS publishers, attribution rights, feed ingestion, caching, freshness dates, failures, deduplication, and how to separate reporting from interpretation. Implement only after a separate authorized data and content contract. The current page does not implement an RSS reader.
