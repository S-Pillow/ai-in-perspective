# AIIP-NEWS-04 | Bounded RSS/Atom collector and source snapshot

**State (2026-11-17):** Feature-branch implementation and test contract on Draft PR #4. **Not activated or deployed to production.** This does not replace the owner-approved News editorial preview or alter Education.

## Intent and operational limits

The owner approved continuing the News experience after visually approving the five curated stories and lighter DM Sans headlines. This work adds a real RSS/Atom collection path **behind** the reviewed static News page, without automatically publishing unreviewed claims or triggering repeated Hobby deployments.

- **Static-first:** Astro renders a checked-in, validated \`src/data/news-snapshot.json\`. Visitors do not fetch publisher feeds and are not exposed to feed credentials or cross-origin requests.
- **Two distinct content types:** The five owner-reviewed editorial examples retain their manually assigned perspectives. Automatic feed items appear in a separate "Latest from the source feeds" section and **never receive an AI Doing Good/Gone Wrong or other editorial lens automatically**. They retain source-type and evidence labels. Blank snapshots honestly say no feed snapshot has been published.
- **Source statuses and freshness:** A saved \`publishedAt\` is when a changed local snapshot was produced, **not** the most recent publisher check, an article publish date or evidence of a current live feed. Unknown article dates remain unknown. The command prints transient per-source diagnostics; the site never invents success or recency after a failed check.
- **No service expansion:** No database, API route, external LLM or AI-generated summaries, cron/schedule, GitHub auto-commit, autonomous deploy, third-party licensed image use or paid provider integration.

## Candidate source policy

| Feed / origin | Collection flag | Known caution |
| --- | --- | --- |
| MIT News AI, \`news.mit.edu\` | Enabled for read-only probe | Actual runner XML access and publisher reuse requirements must be reviewed before automated publishing |
| arXiv cs.AI, \`rss.arxiv.org\` | Enabled | Can legitimately be empty; paper links remain labeled "preprint" |
| The Verge AI RSS, \`theverge.com\` | Enabled | Independent journalism; article title/link only until reuse review |
| OpenAI News RSS, \`openai.com\` | Enabled | First-party/company claims are **not independently corroborated** |
| Google DeepMind RSS, \`deepmind.google\` | Enabled | First-party/company claims are **not independently corroborated** |
| MIT Technology Review AI | **Disabled** | Review feed access policy and display rights |
| Anthropic News | **Disabled** | No verified official RSS; unofficial third-party bridge not trusted |

These five enabled sources are **candidate read-only fetch targets**; being enabled in the source allowlist does **not** constitute live publisher validation, permission to syndicate article text, or production activation. External feed availability is an operational condition, not an assumption.

## Local/offline commands

Project requires Node 20.11+ and adds a pinned \`fast-xml-parser\` dependency for proper RSS/Atom XML parsing. From a clean checkout:

\`\`\`sh
npm install --no-audit --no-fund
npm run news:check           # offline, synthetic/malicious fixtures; no external calls
npm run check                # existing content tests + news tests + Astro build
npm run news:probe           # read-only live feed probes, no file writes
npm run news:collect         # EXPLICIT operator action: updates local JSON only when content changes
\`\`\`

**Important:** \`npm run news:collect\` is a manual local file write, **not permission to commit** \`news-snapshot.json\`, merge a branch, turn on cron or publish to production. Run a dry-run first, inspect source responses and display rights, and obtain explicit approval before committing an actual headline snapshot. A successful command never calls Git or Vercel. By default it is read-only and outputs sanitized JSON diagnostics with source ID, entry count, success/empty/degraded state, bounded error code and whether a new snapshot would be written.

The GitHub PR build uses offline tests and an **optional read-only** probe step (nonblocking if a publisher refuses access). Live source outcomes should be assessed in the GitHub logs: a green GitHub build by itself is **not** evidence that every publisher RSS endpoint worked.

## Data and behavior contract

\`news-snapshot-v1\` is checked at Astro build and before writing: schema, ISO timestamp or null, stable source ID, allowlisted publisher and HTTPS article hostname, safe title, canonical article URL, deterministic article ID, original date or null, \`firstSeenAt\`, evidence qualifier, optional human-reviewed perspective and commentary, source status and optional human-picked featured ID.

- Bounded collector: at most 9 seconds per request, streaming response cap 3 MB, at most 3,000 parsed items per feed, and up to two redirects strictly within that feed's **allowlisted publisher domains** over HTTPS only. Unapproved cross-host redirects, HTTP feeds, non-XML responses, malformed XML, DTD, entity declarations and oversized input fail closed.
- Parser: uses a standards-aware XML parser for RSS 2.0 and Atom; extracts text-only title, linked canonical article URL and dates without copying descriptions, embedded publisher HTML or images.
- Normalization: strips common marketing tracking parameters only; preserves meaningful query parameters; rejects foreign hosts and embedded credentials; stable SHA-256 source/URL identifiers; distinguishes provider announcements, preprints and unreviewed independent/university reporting. The system does not infer fact-checking from a valid headline.
- Deduplication: canonical URL within source; no automatic cross-publisher story fusion or inferred causal links.
- Retention: at most 8 entries per source and 40 entries total, sorted with known dates ahead of unknown dates. Failed or empty sources retain their last good entries; partial successes can add new entries from working sources. Human editorial labels and first-seen information persist for the same article ID.
- **No-op behavior:** if the meaningful article content/metadata is unchanged, the existing snapshot is returned without touching its timestamp or file. Logging a successful fetch alone does not trigger a new Vercel build. Only an explicit \`--write\` changes the local JSON, by atomic rename.
- Invalid item policy: individual bad titles, dates or URLs are skipped; a defective feed does not poison the page. Live source-level failure outcomes are diagnosed without exposing raw response bodies or secrets.

## Tests and evidence

\`tests/news-feed.test.mjs\` uses mocked \`fetch\` and RSS/Atom XML strings; tests assert regular/empty feeds, CDATA, named entity decoding, alternate links, timestamp integrity, prohibited hosts/userinfo/schemes, XXE-like DTD/entity rejection, oversize and malformed errors, canonical IDs, dedupe, provider and preprint qualifiers, partial failures, legitimate empty arXiv days, retention, no-op signature, editorial label preservation, and disabled feeds. \`npm run check\` also retains the 36 existing Education/News and site content contracts.

**Release and acceptance sequence:**

1. Run focused offline tests and full Astro build on the exact Draft PR #4 SHA. Check that Education files remain unchanged, arcade license/replay works, and source snapshot validates.
2. Review the read-only GitHub-hosted publisher probe's HTTP/XML outcomes; inspect redirects and source-rights evidence for each enabled feed. Do not publish a source failing transport or reuse checks.
3. Operator manually performs a representative local or controlled-runner **write-mode** collection into a review branch, checks actual article links and displayed labels and date sorting in the protected preview, and confirms unchanged runs make zero Git changes.
4. Review desktop/mobile/keyboard and screen-reader behavior of the **populated** feed snapshot. The empty bootstrap preview alone cannot prove actual latest-news card rendering.
5. Only a separate approved activation unit may schedule a low-frequency update and publish source snapshots to main. First consider one reviewable commit per day **only when data changes**, and the existing team-wide Vercel Hobby deployment allowance.

**Stop conditions:** no live-source or content-rights proof, persistent publisher 403/robots/redirect restrictions, stale/incorrect dates, invalid host links, no reviewed snapshot or broken UI tests => stay Draft/unmerged. Never silently bypass feed restrictions with an unofficial Anthropic bridge.


## AIIP-NEWS-04A | Controlled real-source preview snapshot (2026-11-17)

- **Source probe accepted for review:** GitHub Actions run \`44006589935\` passed existing site contracts, all 15 initial News RSS/Atom offline tests and Astro build after correcting CDATA-title parsing. In the runner's read-only probe, **all five enabled RSS/Atom sources returned parsed entries**: MIT News 50 RSS, arXiv cs.AI 276 RSS, The Verge 10 Atom, OpenAI News 1398 RSS and DeepMind 100 RSS. The working reader normalized a possible 40-entry snapshot. No data files were written in that probe.
- **Review-only export:** A separate read-only CI export produced schema \`news-snapshot-v1\` at \`2026-11-17T02:59:19.913Z\`, with **40 normalized article records, 8 per enabled source**, source status \`ok\` for all five, and disabled records for MIT Technology Review and Anthropic. All titles/links were parsed from publishers, no article text or photos copied, no AI summaries, no editorial lens inferred. This is feed parsing evidence, not independent proof of each article's substantive claims.
- **Feature-branch snapshot staging:** The 40-row review snapshot is checked into \`src/data/news-snapshot.json\` on the Draft PR branch only. The News UI displays 16 sampled entries rotated across publishers (latest within each source), preserving one editor-selected featured story and four curated examples above. It explicitly separates original reporting/attributed company claims/preprints and states snapshot publication time is not live refresh time. This allows actual card rendering and visual inspection without production.
- **Test changes:** Update the snapshot fixture contract to require 40 source-attributed unreviewed entries and validate five-source diversity. Keep hostile XML/source URL, id/date, empty/failure, no-op and Education/arcade regressions. The read-only CI export has no write permission, git commit, automation or production deploy side effect.
- **Remaining blockers:** Desktop/mobile/keyboard owner review of the populated source cards, source display-rights review, live on-disk write/no-op operator smoke, decision on scheduled low-frequency publishing, and owner production approval. **Do not merge PR #4 to main yet.**



## AIIP-NEWS-04B | Compact curated section and nonduplicate source-feed presentation (2026-11-17)

- **Owner direction:** The owner agreed to refine the populated Draft PR #4 News screenshots: shrink the oversized five-curated-story block, remove excess empty featured-card height, make source links more prominent, suppress the MIT engineering story repeated in the two sections, lighten bold News section headings, and make the static snapshot timestamp precise and timezone-aware. This is a bounded layout/copy and display-only correction, not a general redesign or permission to publish.
- **Implementation:** The News-only styles align the featured story to its content, replace the four vertically stacked supporting articles with a desktop 2-by-2 grid, lower padding and card density while retaining the approved DM Sans article headline font, and use medium-weight DM Sans for News section headings. Responsive breakpoints keep tablet and mobile cards legible. The News hero primary link now jumps directly to the saved source feed. Curated story dates, descriptions, categories, filter behavior, and original arcade remain intact.
- **Display-only deduplication:** A pure helper in src/data/newsPresentation.mjs canonicalizes tracking parameters and fragments for link matching, then selects up to 16 distinct feed URLs round-robin across five enabled publishers, excluding URLs already appearing in the five editorial examples. The existing 40-article static snapshot remains unchanged. This is not fuzzy cross-publisher consolidation, feed filtering, automatic categorization, or a change to any publisher data.
- **Freshness:** The saved-snapshot status now shows the exact change timestamp to the minute, explicitly in UTC, with a machine-readable ISO time attribute and a clear distinction from live or scheduled updates.
- **Checks and limits:** The News tests cover actual duplicate suppression, unique links, publisher balance, zero-limit behavior, UTC timestamp, layout headings, responsive breakpoints, original readability and page anchor. Run the complete content/News/Astro pipeline and confirm the exact SHA Vercel protected preview. Owner should inspect new desktop/mobile proportions; HTML success is not a visual usability verdict.
- **Release boundary:** Keep Draft PR #4 unmerged, Education and its live source unchanged, and no scheduled publication. Feed rights review, actual write-mode/no-op operational smoke, and production authorization remain open.
