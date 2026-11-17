# AIIP-NEWS-03 | Editorial newsroom preview

**Status:** Feature-branch implementation for owner review only. Not merged to \`main\`, not on the public News route, not an RSS reader or automatically refreshed feed. 2026-11-16.

## Governing direction

The owner confirmed the released Education experience looks and works well and authorized work on News. The original dark AI in Perspective visual identity, separate Education route, original licensed News arcade, and source/evidence integrity are protected. News may show a first manually curated selection in a protected review environment, but it must not claim to be a live feed or to have verified source outcomes beyond the original evidence.

This iteration implements the **editorial surface**, not publisher scraping, scheduled fetching, automatic summaries, or production release.

## Design and interaction

- News opening: original navy/cyan atmospheric treatment, succinct value proposition, and a visible **"first look, not a live feed"** status panel displaying an explicit review date and manual preview state.
- Featured reading zone: one named example lead and four smaller adjacent stories. All five have validated original HTTPS source links, publisher names, source-type classifications, source-provided publication dates, an explicit evidence qualifier and an original one-paragraph explanation of the limitations.
- Five manual perspective filters: AI Doing Good, AI Gone Wrong, New Models & Tools, Strange & Surprising, Safety, Policy & Society. Client-side filtering only; no behavioral tracking, remote service or data gathering. Native buttons with \`aria-pressed\`, visible focus, live result count, accessible empty state; works for keyboard users.
- Separate explanatory/source panels: source provenance, evidence distinctions, seven official publisher landing pages. **Anthropic is included as a direct source link, not claimed to have an official RSS endpoint.**
- The previously approved MIT-licensed fighter animation is retained below the editorial content, including the sandboxed iframe, replay button and license link.
- No third-party images, publisher logos, article paragraphs, full-text excerpts or AI-generated summaries are copied into the page. Original article titles are linked to publishers and research authors.

## Source-audited manual selection

The prototype uses **five dated original source pages** checked on 2026-11-16. These are manually chosen to represent the five perspectives, not the five most recent items and not a balanced sample of all AI developments.

| Editorial lens | Original article, source, published | Scope/caveat |
| --- | --- | --- |
| AI Doing Good | [New AI “copilot” helps engineers design better structures](https://news.mit.edu/2026/new-ai-copilot-helps-engineers-design-better-structures-1113), MIT News, 2026-11-13 | MIT reports a research approach involving engineer feedback; it is not routine building practice by default |
| New Models & Tools | [ChatGPT Wallet lets OpenAI’s Dots agents make purchases for you](https://www.theverge.com/ai-artificial-intelligence/1033425/openai-chatgpt-wallet), The Verge, 2026-11-13 | Independent report, with rollout/safeguard details explicitly attributed to provider claims |
| Safety, Policy & Society | [Tail-risk-aware Agent Safety: Constraining Tail Risks Across Multi-step LLM Agent Workflows](https://arxiv.org/abs/2611.10411), arXiv preprint, 2026-11-07 | Research preprint; no default peer-review or real-world effectiveness claim |
| Strange & Surprising | [A single AI model simulates the behavior of many substances, from sliding sand to folding proteins](https://news.mit.edu/2026/single-ai-model-simulates-many-substances-behavior-1109), MIT News, 2026-11-09 | Research demonstration and proposed applications; not blanket generalization |
| AI Gone Wrong | [Detecting and countering misuse of AI: September 2026](https://www.anthropic.com/threat-intelligence-report-september-2026), Anthropic, 2026-09-10 | Provider's own investigation of human-directed misuse; not independent verification |

Source audits are scoped to the specific article/landing page facts above. This does **not** establish automated RSS health, syndication rights, or current availability of model/product features mentioned in publisher stories.

## Implementation files

- \`src/data/newsEditorial.mjs\`: manually reviewed selection, all five lenses, seven source links, source/host and content validation. No fetch or environment variables.
- \`src/pages/explore/news.astro\`: semantic News screen with editor example lead, source-linked cards, filters, evidence labels, method/source sections and existing arcade. Only browser-side script is local UI filtering and arcade replay.
- \`src/styles/news-room.css\`: additive, responsive News visual treatment. Original \`src/styles/education-news.css\` is unchanged; the News styles do not affect the Education page.
- \`tests/content.test.mjs\`: replaces superseded "Coming Soon only" assertions with preview and unchanged arcade/license checks; adds source/URL/date/caveat validation, malicious input rejection, keyboard filter event testing and Education boundary checks.
- Existing \`research/news/news-feed-preflight.mjs\` stays research-only and is not imported by the live page.
- The News branch is reconciled against accepted production \`main\` by a two-parent integration commit. Existing News discovery/research files are retained; main's Education, README, project records and public site source are not rolled back.

## Validation and stop conditions

1. Compare the implementation commit against accepted \`main\`: only News page/style/data, News tests, News docs, and append-only PCR change. Confirm Education source blobs are identical to public main.
2. Run \`npm run check:content\` and \`npm run build\` in GitHub Actions on a Draft PR; preserve the content tests for other pages.
3. Preview with exact commit SHA. Check rendered hero, filters, active states, story links, source labels, arcade, 320/390/430/1440 responsive widths, reduced-motion and keyboard accessibility. If browser visual tooling is unavailable, explicitly mark those checks not done rather than claim sign-off.
4. Check original article URLs manually; verify no unlicensed images or third-party story excerpts were embedded. Ensure no automatic network/publishing code or developer keys.
5. **Stop before merging or releasing**. Owner review and separately authorized RSS/Atom collector implementation plus source rights/run-time validation are still pending. Existing production remains Education \`9712e9f4791b5f319fc3744b324c4ed529229db1\`.

## Next News development after visual acceptance

- Add a standards-compliant, fixture-tested RSS/Atom parser, with bounded fetch and redirect policy, allowlisted feed and article hosts, date and stable-ID normalization, no unsafe XML/HTML, per-source error statuses, and exact-deduplication. This is separate from the current static editorial prototype.
- Verify working publisher feeds and display/reuse rights in a connected, read-only runner; choose which sources are actually enabled. Disabled/unverified Anthropic bridge stays outside automatic ingestion until separately approved.
- Create a versioned static snapshot with documented freshness, failure retention and no-op-diff behavior. Verify that a no-change run does not create a Git commit or Vercel deployment.
- Only after source and visual acceptance, consider a single low-frequency GitHub Actions scheduled task and public release. No automation, database, new service, paid plan or external model API is included in this iteration.
