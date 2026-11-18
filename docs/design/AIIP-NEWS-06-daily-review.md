# AIIP-NEWS-06 — Daily News automation

## Stage 1: private review collection

Run at 11:17 UTC daily (6:17 AM EST / 7:17 AM EDT), with GitHub's usual scheduling delay possible. Manual Run workflow on main and a push that changes the workflow provide controlled smoke paths. PR runs do not write to issue #8. Collection runs using the five already-enabled native RSS/Atom endpoints; retains the last good records on failed/empty feeds; max eight per source and 40 total; up to 16 source links; no age-only removal. The five curated stories are never touched.

A disposable checkout runs the atomic local writer. Existing source data on main is the base, not a mutable review comment. The report rejects unconstrained metadata and future dates, checks unchanged/failure bytes, verifies per-source retention and records counts, source states and candidate SHA-256. Private [issue #8](https://github.com/S-Pillow/ai-in-perspective/issues/8) is the durable review queue; a changed collection includes the validated JSON proposal and checkout SHA. Every successful run records its outcome privately, including no-op and all-source failure, with no production commit or artifact upload. Validation errors fail the run; no report/issue publication proceeds. The previous published snapshot stays intact until separately published. Candidate text is information, not execution authority; review against current main and source policy before any acceptance.

The workflow uses contents: read during collection and issues: write in a separate main-only issue job. The issue job checks repository privacy and issue state; it has no checkout, code write, PR merge or deployment token. If the repository is made public or the issue closes, recording fails closed. Disable the workflow via GitHub Actions to pause checks. A successful CI run is not evidence of publisher rights or production refresh.

## Stage 2: source rights and publication gate

Rights research checked November 17, 2026 (US local time). This is an operational assessment, not a legal opinion. Only titles, original links, source labels and dates are contemplated; no full text, descriptions, photos, generated summaries or automatic editorial judgments.

| Source | Evidence | Public automatic publication disposition |
|---|---|---|
| MIT News | [Terms of use](https://news.mit.edu/terms-of-use) explicitly offer RSS for syndication; complete republication has additional attribution conditions. [RSS index](https://news.mit.edu/rss). | Strong evidence for syndication; document applicable title/link-only conditions before activation. |
| arXiv | [API terms](https://info.arxiv.org/help/api/tou.html) permit descriptive metadata under CC0, including RSS; link to abstracts, no paper redistribution, single connection, at least three seconds between requests. | Metadata-only path supported subject to compliance. |
| The Verge | [Public RSS access explanation](https://theverge.zendesk.com/hc/en-us/articles/36052463032211-Will-non-subscribers-lose-access-to-RSS-feeds); former [Vox terms](https://www.voxmedia.com/terms-of-use/) now link to a different company's policy; current linked terms unavailable during review. | Reader access is not affirmative syndication rights; obtain applicable terms/permission before automated public display. |
| OpenAI | [Official site](https://openai.com/) links to RSS; [terms](https://openai.com/policies/terms-of-use/) restrict extraction of service data/output; applicability to public news metadata and redistribution not established. | Obtain or document metadata reuse permission before automated public display. |
| Google DeepMind | [Official newsroom](https://deepmind.google/blog/) and native RSS endpoint previously parsed; explicit redistribution license not confirmed. | Obtain or document reuse permission before automated public display. |
| MIT Technology Review / Anthropic | Disabled in existing allowlist; access/reuse and official feed respectively unresolved. | Keep disabled. |

Routine private review of the already enabled native feeds is distinct from public redistribution, and does not expand scraping or access to article bodies. Respect source limits and do not bypass blocks. Confirm or narrow the approved public-source roster explicitly before activation; keep the existing balanced-source objective and disabled-source decisions. Pending public gates: clear per-source metadata permissions, candidate regression and actual issue-write smoke, no-op/failure and stale-base guard, production no-change behavior, exact Vercel deployment verification, rollback/disable mechanism, and separate public-write authority under the owner's conditional instruction. Do not automatically commit to main or schedule production deployments yet.
