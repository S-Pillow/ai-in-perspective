
# AIIP-NEWS-02 | Source readiness and News feed MVP contract

**Status:** Prepared specification on the isolated News development branch. **Not implemented, not merged, not scheduled, not live.** Verified/reconciled November 16, 2026 under AIPF v8.10.1.

**Product intent:** The News section of AI in Perspective should surface interesting, beneficial, concerning, unusual and consequential AI developments without mistaking company claims or preliminary studies for established facts. It should be useful to a reader who wants to know *what happened* and *why it matters*, not simply scroll through model-launch marketing.

**Authority and dependencies:** The owner approved a dedicated `feature/aiip-news-feed` branch and preparing for News, while the Education/News page split is still on Education [PR #3](https://github.com/S-Pillow/ai-in-perspective/pull/3), not in production. This branch began at Education rollback SHA `638289c81fad2b915c60e11af8eee11972ee096f`. The source roster below was copied **unchanged** from the Education PR as `docs/discovery/AIIP-NEWS-01-sources-and-editorial-lenses.md`. It is reference material, not a second independently authoritative product direction.

**Pre-implementation boundary:** Do not merge the News branch, change Education, add an RSS job, enable a cron, use Vercel deploy capacity, publish headlines, scrape publisher pages or use a third-party LLM automatically. First synchronize the branch with the merged Education `main` after that separate release is complete. Record the new base and reconcile any Project Control Record changes before code work. This document is a design/data contract and does not overwrite the PCR on this branch, because its 2026-11-16 revision 59 predates Education PCR revision 62.

## 1. Source readiness register

The source roster stays seven candidates; verification is an evidence level, **not** a declaration that ingestion or reproduction is legally cleared. “Working according to an independent feed index” is not the same as a successful HTTP+XML parser smoke by our eventual CI fetcher.

| ID | Candidate / original source URL | Checked evidence on 2026-11-16 | Implementation disposition |
| --- | --- | --- | --- |
| `mit_news_ai` | MIT News AI: https://news.mit.edu/rss/topic/artificial-intelligence2 | MIT's topic page advertises RSS, and an independent feed checker reports this address working with recent posts. Direct web reader could not parse its RSS content type. | **First-wave candidate**; still require direct fetch, parser/schema and reuse-policy checks in the actual runner |
| `arxiv_cs_ai` | arXiv cs.AI: https://rss.arxiv.org/rss/cs.AI | arXiv's official RSS documentation establishes per-category feeds and daily updates. The current web reader could not fetch this XML endpoint. | **First-wave candidate**; allow an empty feed without classifying it as failure. Clearly label each item *preprint / not peer reviewed by default* |
| `mit_technology_review_ai` | MIT Technology Review AI: https://www.technologyreview.com/topic/artificial-intelligence/feed | A feed directory lists this address. Direct retrieval was denied by robots.txt in the research environment; this does **not** prove the feed itself is offline. | **Conditional candidate** until actual permitted fetch and attribution/reuse terms are verified |
| `verge_ai` | The Verge AI: https://www.theverge.com/rss/ai-artificial-intelligence/index.xml | A feed directory lists this address and the web reader recognized an XML content type but cannot inspect it as a web page. | **First-wave candidate** subject to runner-level HTTP/XML and publisher policy checks |
| `openai_news` | OpenAI News: https://openai.com/news/rss.xml | Independent feed directory reports current posts; the direct web reader recognized an XML content type but could not parse it. | **First-wave candidate**; company announcements remain attributed claims, not neutral verification |
| `google_deepmind_blog` | Google DeepMind Blog: https://deepmind.google/blog/rss.xml | Independent feed directory reports a working feed; direct reader recognized XML content type but cannot parse it. | **First-wave candidate**; company announcements remain attributed claims |
| `anthropic_newsroom` | Official listing: https://www.anthropic.com/news; third-party feed: https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_anthropic_news.xml | No verified official Anthropic RSS. The public unofficial RSS is readable as XML; its `lastBuildDate` is still **2026-11-10 11:34:31 UTC**. It is not maintained by Anthropic. | **Source preserved, adapter disabled by default** pending maintenance/freshness, legal and attribution review; no invented “official RSS” endpoint |

**Evidence links:** [MIT News AI topic](https://news.mit.edu/topic/artificial-intelligence2), [arXiv RSS documentation](https://github.com/arXiv/arxiv-docs/blob/develop/source/help/rss.md), [AI feed directory](https://feeder.co/knowledge-base/rss-content/ai-news-rss-feeds/), [OpenAI feeds directory](https://feeder.co/discover/site/openai.com), [DeepMind feeds directory](https://feeder.co/discover/site/deepmind.google), [Anthropic unofficial feed](https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_anthropic_news.xml), [Vercel limits](https://vercel.com/docs/limits). The researcher could not make direct HTTP/XML requests from the local runtime; those are mandatory implementation checks before a source can be enabled.

**Rights gate:** For each publisher, retain exact evidence for whether its feed permits showing externally linked headline metadata and whether snippets or thumbnails may be displayed. A working RSS endpoint **does not automatically grant** rights to reproduce full text, feed descriptions, images or logos. MVP default: our own editorial headings, original publisher's title only if permitted, publisher name, original URL and original date. No full story, embedded image, lifted summary or hotlinked restricted media.

## 2. Visitor experience

**Visual continuity:** Keep the existing AI in Perspective dark/navy, cyan/gold accents and considered type hierarchy. Do not mimic Anthropic's site or replace the restored Education design. The News page should feel like a credible editorial destination rather than a generic dashboard or equal-sized tile wall.

**First useful screen:** A concise title, honest publication/refresh information, one **editor-picked** featured story when actually reviewed, and an adjacent stack/list of recent original links. Subsequent articles should be quickly scannable on mobile. A curated lead is not the same as “most recent.” Provide a quiet unfeatured fallback when no lead has been selected; do not let an algorithm imply editorial endorsement.

**Editorial lenses, approved in AIIP-NEWS-01:** `AI Doing Good`, `AI Gone Wrong`, `New Models & Tools`, `Strange & Surprising`, `Safety, Policy & Society`. Show a neutral “All News” view. Never auto-assign an incident to “Gone Wrong” or a launch to “Doing Good” purely from a word in the headline; lens tagging is an editorial decision and may be absent until reviewed. Let every item retain its separate source/evidence classification.

**On each item:** Original headline, publisher, source type, source-reported publication date (or “Date not provided”), explicit preprint/provider-report qualifier where relevant, a working original-article link, and any reviewed lens. No invented recency badges or unstated claim verification. Published date and time of our latest usable snapshot must not be conflated.

**Accessibility:** Semantic article headings, actual links with descriptive names, visible keyboard focus, filter buttons with clearly exposed active state, mobile-first reading order, no horizontal overflow, accessible loading/empty/stale/error announcements, and usable content with JavaScript disabled where possible. The licensed pixel-fighter arcade remains on News as a **secondary** “intermission” or separate lower-page element, with its current MIT credit, replay control, sandbox and reduced-motion behavior preserved.

## 3. Static-first delivery architecture

**Baseline:** The current site uses Astro static output, GitHub Actions and Vercel. Prefer no database, no new API service, no third-party RSS bridge that we cannot inspect, and no server-side dynamic request per visitor.

**Implementation candidate (not yet approved as deployment):**

1. Put a code-reviewed **allowlist of feed URLs** in the repository. No input-provided URL fetching or arbitrary redirects. Select the working sources after runner tests.
2. A Node ingestion script downloads feeds with bounded timeouts, redirect/hostname checks, byte limits, XML parser safeguards and source-level failure records. Use fixtures in tests so CI does not depend on live publisher availability. Treat content as untrusted strings; never render RSS HTML unescaped.
3. Convert to a small, validated **versioned snapshot** such as `src/data/news-snapshot.json`. Keep the last known good snapshot if a source fails; do not make an empty success file after an outage. Keep “no articles published this cycle” distinct from “feed retrieval failed.”
4. Astro compiles the validated snapshot into the News page for static delivery. No visitor's browser needs to fetch publishers, expose credentials, or wait for cross-origin RSS. For a news update, the generated snapshot changes, and a normal deployment publishes the page.
5. Later, **only after owner acceptance**, add a single GitHub Actions `workflow_dispatch` / scheduled ingestion workflow. For the initial Hobby rollout, **one collection/publish check per day**, with “commit only when actual publishable content changes.” A successful check that changes only a timestamp must not force a new deploy.
6. Monitor actual team-wide Vercel deployment use before raising frequency. The repository currently fans out commits into two Vercel projects, and the Hobby plan has a finite shared deployment budget. Do **not** configure an hourly auto-commit pipeline by default.
7. If later needs require faster updates without full Vercel rebuilds, compare a separately persisted snapshot store or endpoint as a **new architecture decision**; do not silently expand hosting, data or billing assumptions.

**Known tradeoff:** A GitHub-committed snapshot makes news freshness dependent on successful scheduled collection **and** successful Vercel production deployment. Show the snapshot timestamp and state clearly; never claim “live news” simply because a workflow ran. The easiest operational mode is a small number of versioned, inspectable news publications per day.

## 4. Normalized data contract (proposed `news-snapshot-v1`)

Required top-level fields:

- `schemaVersion`: exactly `news-snapshot-v1`.
- `publishedAt`: ISO-8601 timestamp of the **snapshot actually written for publication**, not a guess about a feed's update time.
- `sourceStatuses`: an array of `sourceId`, `state` (`ok` / `empty` / `degraded` / `disabled`), `lastSuccessfulAt` (ISO or null) and optional non-sensitive `errorCode`; do not expose secrets or verbose remote error bodies.
- `articles`: validated normalized article records, in stable order.
- `featuredArticleId`: stable article ID or null; assigned by a human/editorial file, never auto-filled because a corporate item is newest.

Required article fields:

| Field | Type/rule |
| --- | --- |
| `id` | Deterministic hash from source ID + safe canonical source URL, with stable prefix; no random IDs |
| `sourceId`, `publisher` | Must match a known allowlisted source; not copied blindly from arbitrary XML |
| `sourceType` | `independent_reporting` / `university` / `preprint` / `company_announcement` |
| `title` | Text-only title, trimmed and length-capped; no embedded HTML or AI rewriting |
| `url` | Source's original HTTPS article URL; scheme and host checked against that source's permitted article hostnames |
| `publishedAt`, `updatedAt` | Parsed original dates or null; never silently replaced with collection date |
| `firstSeenAt` | Time first observed by the ingestion system; not the claimed publication date |
| `lens` | Approved visitor-facing lens or null; assigned only by reviewed editorial mapping |
| `evidenceStatus` | `unreviewed` / `attributed_primary_source` / `independent_reporting` / `preprint` / `corroborated`; label is contextual, **not** an automatic truth score |
| `editorialNote` | Optional concise *original* text requiring a human review gate before publication; null by default |

**Identity/deduplication:** Only normalized safe article URLs and stable source GUIDs are identity inputs; strip known tracking parameters conservatively. Exact URL duplicates collapse. Different publishers writing about the same model or incident remain separate original sources until an editor explicitly groups them; avoid unsafe fuzzy deduplication. An item with missing date may still be shown as “Date not provided,” never sorted as newest solely because it was collected now.

**Freshness and failure semantics:**

- `publishedAt` changes only for a new validated snapshot. A run that found no new content may log a successful check without committing anything.
- Per-source errors do not delete previously published items. An all-source failure leaves the prior snapshot intact and raises an operator signal through GitHub Actions.
- Invalid XML, unexpected redirects, wrong article host, giant response, timeout, duplicate GUID, malformed dates and HTML injection are independent test cases. A bad source cannot poison the whole site.
- A stale snapshot is labeled by age with an operator-chosen threshold; “last updated” must use the real `publishedAt`, not browser wall clock or an inferred last feed check.
- Do not publish an empty article page when a prior good snapshot exists. A genuine first-release empty state is factual and offers original publisher links.

## 5. Implementation and acceptance sequence

**AIIP-NEWS-02 (this unit):** Verify candidate endpoints to the limits of available read-only evidence; write this contract and copy the unchanged approved seven-source discovery register onto the isolated News branch. **Stop before code, merge, deployment or cron.**

**AIIP-NEWS-03 (next independent build unit, after Education release):** Reconcile News branch against accepted production `main`; implement fixture-driven RSS/Atom adapters, allowlist, normalization, deduplication, snapshots, validation scripts, offline tests and the original dark News layout; keep the arcade credit/controls. Tests must cover every field and failure rule above; source claims remain attributed. Preview readiness is code/build evidence until a real rendered browser check is performed.

**AIIP-NEWS-04 (separate activation unit):** Enable only sources with runner-level live HTTP/XML and terms-of-use verification; dry-run ingestion without a commit, approve final editorial and UI evidence, then approve production deployment and a daily scheduled update. Ensure GitHub job writes nothing when feed contents did not change. Observe Vercel team quota and stale-data behavior. Do not turn on independent Anthropic scraping/unofficial RSS without its own decision and freshness checks.

**Acceptance gates before declaring News live:** (a) source+license evidence, (b) static no-network-fixture unit and integration tests, (c) malicious RSS input tests, (d) unchanged existing Education/arcade/history/benefits/risks/environment routes, (e) successful GitHub build, (f) correct SHA protected preview with desktop/mobile/keyboard review, (g) main/production SHA parity and current page HTTP checks, and (h) ongoing source failure/retention visibility. GitHub build success is not visual approval or proof of live feed availability.

## 6. Operational and branch handoff

- The separate News branch currently starts at rollback snapshot `638289c...`, **not** the later 32-topic Education source or revised README/PCR. Its historical Project Control Record is expected to be out of date. **Do not merge this branch directly into `main` without reconciling the accepted Education release.**
- Copying `AIIP-NEWS-01` uses exactly the same source blob as Education PR #3. The new `AIIP-NEWS-02` document is unique to News. After Education merges, rebase/cherry-pick these documentary additions onto the new `main` (preserve history; no force-push without explicit reason and approval), update the PCR in that new context, then begin implementation.
- The November 17 conditional Education release task remains authoritative. This News preparation does not edit it, modify PR #3 or authorize a Vercel build/release. Even a documentation-only branch push may cause existing Git integrations to *attempt* builds; do not manually create or retry deployments.
