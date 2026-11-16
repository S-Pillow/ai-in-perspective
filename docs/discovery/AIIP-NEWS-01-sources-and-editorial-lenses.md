# AIIP-NEWS-01 | Candidate sources and editorial categories

**Status:** News discovery only. Approved direction and candidate source addition, not an active RSS integration, automated collection, generated summary, or public news section. This is a working design and source register under AIPF v8.10.1.

**Owner intent, November 2026:** News that is interesting, cool, surprising, useful, alarming or concerning, with examples of AI helping real people, incidents of AI-enabled misuse or agents behaving unexpectedly, and new model releases. The owner specifically asked to include [Anthropic News](https://www.anthropic.com/news) and supplied visual references showing a large featured story with a smaller adjacent story list. Those references inform hierarchy, not copying another publisher's page or media.

## Registered candidate: Anthropic News

| Field | Source record |
|---|---|
| Source ID | `anthropic_newsroom` |
| Publisher | Anthropic (first-party company communications) |
| Official listing | https://www.anthropic.com/news |
| Related subject-specific source | https://www.anthropic.com/news/security |
| Role | Model and product releases; scientific use cases; company positions; safety/security and misuse investigations |
| Evidence status | Official primary source for *what Anthropic says, announces and reports*. Not independent confirmation of all claims or outcomes |
| Feed availability | **No verified official RSS/Atom endpoint.** `https://www.anthropic.com/news/rss.xml` and `https://www.anthropic.com/rss.xml` returned HTTP 404 on 2026-11-15. Do not mark either as official or working |
| Unofficial candidate | `https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_anthropic_news.xml` from https://github.com/Olshansk/rss-feeds ; not owned or endorsed by Anthropic |
| Unofficial feed observation | RSS XML was accessible and contained titles, canonical article links and dates on 2026-11-15. Its `lastBuildDate` was **2026-11-10 11:34:31 UTC** at inspection. This is a snapshot, **not proof of an ongoing freshness guarantee** |
| Planned access decision | Compare permitted structured listing access against a vetted third-party bridge; verify site terms and publisher attribution before enabling ingestion; use explicit failure and staleness handling |
| Publication state | **Candidate approved for the source roster; automated fetching and publication not implemented or approved** |

Additional references checked 2026-11-15:
- https://www.anthropic.com/news (publisher listing, headlines and categories)
- https://www.anthropic.com/news/security (publisher's threat/safety stories)
- https://www.anthropic.com/threat-intelligence (publisher's incident reports)
- https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_anthropic_news.xml (unofficial RSS)
- https://github.com/Olshansk/rss-feeds (feed project and source)
- https://feeder.co/discover/5b58900104/anthropic-com-news-feed_anthropic_news-xml (third-party index of that feed)

## Candidate news experience

Visitors should find **noteworthy developments across AI**, not only corporate announcements, hype or disaster stories. Editorial categories describe *what a story is about* and must not pretend that a claim is independently verified.

| Visitor-facing lens | Include | Editorial caution |
|---|---|---|
| **AI Doing Good** | Examples in medicine, science, accessibility, education, safety, disaster response | Distinguish early research, a real deployment and independently measured outcomes. Do not say a tool cured a disease if the source reports only a promising trial or partnership |
| **AI Gone Wrong** | Documented scams, cyber incidents, harmful outputs, unauthorized actions, failures and consequential misuse | Identify the responsible human actors when known. Distinguish model misbehavior, adversarial manipulation, autonomous execution and hypothetical future scenarios |
| **New Models & Tools** | Model releases, new products and capabilities, practical integrations, major model changes | Provider benchmarks and marketing claims are attributed to the publisher, not presented as independent comparative facts |
| **Strange & Surprising** | Unusual applications, experiments, unexpected behaviors and important technical discoveries | Fascinating does not mean proven or safe. Identify a demonstration, controlled experiment or real-world event |
| **Safety, Policy & Society** | Safeguards, governance, AI and work, regulation, security research and impact on communities | Label official policy, reported findings, projections, and opinion separately |

The categories can become filters. A story may have multiple labels, but it needs one factual **topic** (e.g. research, model release, cyber incident, policy) and a separate **evidence status** (e.g. independently corroborated, attributed report, preliminary research, projection, unverified allegation). Avoid simplistic binary truth or "breaking" badges generated from keywords. Curated lead-story placement and dates should be transparent.

### Example handling of the provided reference stories

- **Drug-development announcement:** A publisher's report of *early progress* can appear under AI Doing Good, explicitly labeled early-stage research or partnership. It does not establish a new approved medicine or patient outcome.
- **Claude model launches:** Appear in New Models & Tools, preserving the model's release date and labeling performance statements as Anthropic's claims until independently evaluated.
- **AI-related cyberattack:** Anthropic documented an AI-orchestrated cyberespionage campaign in 2025 and further cases in 2026. These were human-directed misuse cases with varying levels of agent autonomy. Do not rewrite them as "AI escaped and hacked a company" without separate incident evidence establishing literal loss of control. Relevant sources: https://www.anthropic.com/threat-intelligence and https://www.anthropic.com/news/security .
- **Surprising agent experiments:** Can appear as controlled demonstrations if the source actually describes one. Do not imply production-world autonomy from a lab experiment.

## Presentation inspiration

The supplied Anthropic newsroom screenshots suggest a useful **featured story + adjacent recent-story stack**: one visually prominent lead with title, source and date, balanced with several smaller items. Consider this as an information hierarchy in the original AI in Perspective dark/cyan/gold visual identity. Do not copy the publisher's precise layout, images, video frames or proprietary branding. Image usage requires checking publication permissions or a suitable licensed source. Text-only source cards are a valid fallback.

Each card should make the original publisher, publication date, headline, link, content category and evidence context easy to see. When adding an AI in Perspective explanation, distinguish it from the source's statement and show why it matters without pretending to be the publisher. Links should lead readers to the original article.

## Data and risk contract to settle before implementing News

1. **Source roster:** Include official primary sources plus independent journalism, research and regulator sources. A company newsroom is not a balanced news feed on its own. Test feed availability, update intervals, terms of use and exact destination links.
2. **Collection:** Respect rate limits, allowlist sources, bound remote response sizes and timeouts, avoid unsafe arbitrary URL fetching, sanitize untrusted metadata and HTML, and record per-source success/failure and last checked.
3. **Normalizing:** Keep stable article IDs, original publisher, title, canonical URL, source-provided published/updated dates, collected timestamp, original snippet where permitted, topic and evidence classification. Treat unknown dates as unknown rather than silently substituting collection time.
4. **Deduplication:** Exact canonical URLs first, then conservative story grouping to avoid merging unrelated claims or different incidents. Expose all original sources in grouped stories.
5. **Publication:** Continue serving the latest successful validated snapshot when a feed fails, with an honest "last updated" timestamp and staleness warning. No invented articles or silently replaced sources.
6. **Content rights:** Attribution and source links by default. Do not republish full articles, hotlink restricted media or assume RSS availability grants broad reuse rights. Do not enable unattended AI summaries without separate controls for accuracy and attribution.
7. **Delivery boundary:** Current live Astro page is an Education & News **Coming Soon** arcade. No RSS feed, scheduled workflow, API, database, or new public headlines are authorized by this discovery entry. Implement only after a separate plan, fixtures, acceptance tests and explicit deploy authority.

## Discovery result

**Include Anthropic News in the planned News source list.** Do not pretend Anthropic offers an official RSS feed. First implementation should prefer stable, well-documented native publisher feeds and test the Anthropic bridge or a compliant listing adapter separately. A compelling news experience can cover useful, harmful, strange and consequential AI developments without confusing the level of evidence with how emotional a headline sounds.
