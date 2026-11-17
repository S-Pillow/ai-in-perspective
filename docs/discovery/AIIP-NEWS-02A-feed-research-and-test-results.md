# AIIP-NEWS-02A | Feed research and offline preflight results

**Status:** Pre-implementation research and **research-only** test harness on isolated `feature/aiip-news-feed` (2026-11-16). No live RSS collector, News page implementation, cron, deployment authorization, database, automatic editorial categorization, AI summary, or public publishing.

**Why this work exists:** The source contract in `AIIP-NEWS-02-source-readiness-and-feed-contract.md` identified live feed verification, unknown dates, malicious content and deduplication as outstanding risks. Those remain meaningful implementation gates. This artifact provides independent source checks and a reproducible small offline test before development starts.

## External source findings

- **MIT News:** Its official AI topic page advertises RSS; a recent third-party feed checker reports `https://news.mit.edu/rss/topic/artificial-intelligence2` as working. Crucially, the official [MIT News Terms of Use](https://news.mit.edu/terms-of-use) set conditions for reprinting articles, and images have separate copyright/Creative Commons restrictions. Therefore *do not* replicate full posts or download/copy photos by default; display only separately cleared headline/link metadata and proper attribution. Confirm final use scope before public display.
- **arXiv:** [Official RSS/Atom documentation](https://github.com/arXiv/arxiv-docs/blob/develop/source/help/rss.md) confirms feed URL construction and a daily refresh cycle. Empty feeds on no-announcement days are normal. The proposed `cs.AI` URL is an official category pattern, but live fetch/parsing remains to be checked by a connected runner. Article records are **preprints**, not automatically peer-reviewed.
- **MIT Technology Review:** A feed directory reported `https://www.technologyreview.com/topic/artificial-intelligence/feed` as active, but direct web research was blocked by robots constraints. Do not infer that an automated collector is permitted, that images may be reused, or that metadata can be republished without a source-rights decision.
- **The Verge, OpenAI, Google DeepMind:** Third-party directories report active feed URLs; the web research tool could not decode publisher XML as normal HTML pages. Their respective direct HTTP status, actual XML structure, valid article link hosts, rate limits and publication terms remain **unverified in our runtime**.
- **Anthropic:** No verified official RSS feed; the available community RSS snapshot is not the publisher's maintained endpoint and the previously observed `lastBuildDate` was 2026-11-10. Keep disabled in automatic collection pending a separate permission/freshness decision. Do not invent an “official Anthropic RSS” label.

**Evidence and distinction:** These are documentation and third-party-feed-directory findings, not claims of live parser compatibility. Relevant references: [MIT RSS](https://news.mit.edu/topic/artificial-intelligence2), [MIT terms](https://news.mit.edu/terms-of-use), [arXiv RSS help](https://github.com/arXiv/arxiv-docs/blob/develop/source/help/rss.md), [Feeder's dated cross-publisher survey](https://feeder.co/knowledge-base/rss-content/ai-news-rss-feeds/), [MIT Technology Review feed checker](https://feeder.co/discover/6aa0208dc2/technologyreview-com). The local runner could not resolve publisher DNS addresses (`Temporary failure in name resolution` for MIT News and arXiv on 2026-11-16), so **zero publishers have been live-HTTP/XML verified by this test**.

## Tested preflight

Runnable research harness: `research/news/news-feed-preflight.mjs`. Uses only Node built-ins. It has **no I/O or publication side effects during default tests**.

Run offline:

```sh
node --test research/news/news-feed-preflight.mjs
```

**Observed local result on 2026-11-16:** 9 tests passed, 0 failed on a Node runtime in the execution container. These covered:

1. Unknown source identifiers, unsafe HTTP/non-allowlisted/credential-bearing article links.
2. Stable HTTPS canonical URLs, tracking parameter stripping and preservation of meaningful parameters.
3. Missing/invalid dates and RFC/ISO time-zone normalization.
4. Publisher/type attribution, preprint and company claim qualifiers, no automatic editorial lens.
5. Rejection of blank or HTML-looking titles.
6. Stable exact-URL deduplication without merging different publishers' stories.
7. Last-good snapshot retention on all-source failure/empty results and no timestamp-only publishing.
8. Recognizing RSS vs Atom envelopes, treating valid empty feeds as empty, rejecting DTD/entity declarations and unexpected HTML content-type.
9. Publishing a changed snapshot when *human editorial notes or classifications* are deliberately revised.

**Scope warning:** The envelope inspector checks type/size/rough markers only; it is **not a standards-compliant XML parser**. Ingestion, actual RSS/Atom XML parsing, encoding, HTTP redirects, page rendering, error reporting, licensing, and action privileges remain future implementation work. A parser and renderer must have their own fixture and security tests before going live. The simulated article content is synthetic.

## Optional connected-runner smoke

The harness also supports `node research/news/news-feed-preflight.mjs --live`. This makes **one bounded, read-only HTTP GET per each of six fixed candidate feed URLs** (not Anthropic), 9-second timeout, 2 MB response cap, no following redirects, outputs only status/content-type/envelope counts. No writes, no scheduled job and no article content output. **Do not use this option in routine CI** or claim it as rights approval. Execute from an environment that can resolve the publishers *only after* the connection, rate-limit and policy review. HTTP 301/302/403/429/5xx should be reported, not bypassed.

## Findings for the News build

- Keep the static snapshot retention guarantee and do not publish an empty page on feed failure.
- The MVP should start with original source links, human-selected featured content, no full-text copying or hotlinked images, and separate editorial lenses from evidence status.
- Before implementation, run live publisher-level endpoint and safe parser tests in an accessible environment; record status/date/format and rights decisions per source. If a source disallows aggregation, disable it rather than scraping around restrictions.
- **No deployment changes:** News branch is deliberately based on the pre-Education rollback snapshot; its old PCR is not authoritative for current Education state. Preserve the protected Education PR #3 and scheduled November 17 release. When Education merges, reconcile this branch with accepted `main` before any News implementation/PR merge.

**Next gate:** AIPF News implementation can proceed after Education release and branch reconciliation, but do not equate these nine synthetic checks with a working live News feed.
