# AIIP-EDU-02 | Beginner-to-advanced Education and separate News arcade

## Owner decision and status

Owner authorized beginning the Education section and moving the existing Coming Soon arcade to News. This is a feature prototype under AIPF v8.10.1, not an approved public deployment. The broader News candidate roster and publication contract are still at the discovery stage.

Education now becomes the existing fifth Discover destination /explore/education-news. News gets its own /explore/news route, linked from Education, and retains the arcade animation and the MIT credit. Keeping the original Discover destination avoids breaking the approved selector art or navigation.

## Initial learning product

The Education page is a substantive first learning overview, not twenty-four complete courses or a claim of certification. It teaches six beginner-to-advanced levels, with four expandable concepts each, plain-language examples, cautions and source links. Levels:
1. The basics, including everyday AI, ML versus generative AI, and ANI/AGI/ASI distinctions
2. Using AI well, including prompting, chatbots, verification, privacy and workflows
3. How learning works, including supervised/unsupervised/reinforcement learning, neural networks, deep learning, NLP, computer vision, data and evaluation
4. Modern AI internals, including tokens, transformers, LLMs, training versus inference, GPUs, electricity and water, local versus cloud
5. Connecting and building, including RAG, embeddings, APIs, MCP, agentic workflows and practical small projects
6. Advanced use and governance, including fine-tuning, evaluation, multi-agent systems, risk and policy

The selector shows one level at a time, with six server-rendered levels and native details. Buttons carry aria-pressed, panels carry aria-labelledby and hidden, controls focus the active panel, and next-level buttons and three optional paths move between levels. Resource filters work entirely on server-rendered cards and need no network fetch. Reduced-motion preferences and four mobile/tablet CSS breakpoints are included.

The visual is an original dark cyan/violet/gold learning atlas with orbital graphics, not a generic dashboard or a copy of another site. Decorative graphics are aria-hidden and do not have unnecessary "concept illustration" captions. Visible writing avoids em dashes.

A small RAG-like example shows the steps of asking, retrieving relevant material when connected, generating, and checking. It explicitly notes that not all models retrieve and that agent tool use brings separate permission risks.

## Initial learning resources

Ten owner-supplied provider resources appear as original preview-style cards with name, provider, topical description, learning level, access information and a direct link. Provider websites were checked during discovery. Since external course prices and enrollment can change, the page tells visitors to check directly. These are not reproduced publisher website screenshots or fetched Open Graph photos.

Initial catalog: Google AI Skills, Coursera's beginner guide, Google Machine Learning Crash Course, Tina Huang videos, Lonely Octopus practical programs, The Multiverse School, AMD AI Academy, NVIDIA self-paced AI training, Andrej Karpathy's coding walkthrough, and MIT/GetSmarter's AI for Business Strategy course.

Resource queue for later review, not silently rejected: another MIT professional education program landing page, the NVIDIA enterprise eBook, and seven separate owner-provided YouTube videos. They need individual metadata, relevance and access reviews before publication. Additional future learning may build full lessons, assessments or provider OG previews, but those are not part of this ticket.

Important source/accuracy boundaries: Artificial narrow intelligence is task-specific; AGI has disputed meanings and is not claimed achieved; ASI is hypothetical. AI fields and techniques overlap instead of being an exclusive partition. RAG improves grounding but can retrieve misleading content; MCP enables integrations without making tools safe automatically. GPU/data-center impact varies with energy and cooling. No unsourced per-request water or electricity estimates appear.

## News still in preparation

The existing sandboxed Pixel Fighter Combo iframe and its replay mechanism move from the fifth entrance page to /explore/news. The same static arcade asset and MIT license credit are retained. News is described as coming soon; no article ingestion, RSS scheduler, subscriptions, invented real news, live database, API or scraping is introduced.

The News placeholder previews the editorial interests: helpful applications, documented harm and misuse, major model releases, unexpected AI phenomena and safety/policy changes. The source roster keeps MIT News, arXiv, MIT Technology Review, The Verge, OpenAI News, Google DeepMind Blog and adds Anthropic News. Those seven are *candidates*, not a confirmed operating feed. Any independent journalism, research and provider claims must remain distinguishable.

News implementation needs separate publisher endpoint/terms verification, source allowlist, deduplication, stale-feed behavior, attribution, sanitization, moderation, accessibility, and independent release authority.

## Changed scope and validation contract

New: src/data/education.ts, src/styles/education-learning.css, src/scripts/education.js, src/pages/explore/news.astro, this note.

Changed: src/pages/explore/education-news.astro, src/styles/education-news.css, tests/content.test.mjs, docs/PROJECT_CONTROL.md.

Unchanged: public/arcade/education-news-fighter.html, its MIT license, fifth Discover entrance URL and art, root/intro/header/other four perspectives, dependencies, SEO indexing settings, deployed production, and external APIs.

Run content tests including six level/four concept/ten resource contracts and simulated active-panel/filter/replay interactions, then Astro build, protected preview exact-SHA and hosted GET regressions. This alone does not prove real rendered browser visual quality; operator acceptance remains necessary. Do not merge to production as part of the preview ticket, and reconcile other open docs branches if main changes.

## AIIP-EDU-02B | Owner-feedback refinement (2026-11-16)

**Authorization:** The owner requested one bounded Education/News refinement pass after identifying three issues: unnatural explanation of chatbots/language models in beginner material, too many starry backgrounds resembling Benefits, and resource cards without actual preview pages. Scope is the existing PR #3 feature branch and its protected previews only. No merge, public release, RSS integration, provider-image copying, or changes to other perspective pages.

**Editorial human-speech audit:** The 24 existing concept introductions and examples were reviewed and rewritten in clearer everyday English. In particular, the chatbot example now distinguishes an interface (chatbot) from a possible underlying technology (language model), rather than treating them as comparable products. Preserve the original caution/limitation text and source links for each concept, including AGI uncertainty, RAG retrieval quality, MCP permissions, water-use variation, and human oversight. This is a copy/comprehension improvement, not independent re-verification of every external source. All six levels, four concepts per level, practice activities, navigation, disclosure patterns, and learning filters remain unchanged.

**Education visual direction:** Replace the hero starfield with a restrained blueprint/ruled-grid learning environment and a warm field-notes folio with a question-to-understanding diagram. Give the chapter illustration a page/diagram rather than orbital treatment. Resource artwork becomes index-card-like. This is a deliberate alternative to the existing dark-cosmic sphere and star motif. Heading and supporting typography remain part of the site's brand. Actual rendered desktop/mobile visual distinctness, contrast, hierarchy, focus, keyboard and reduced-motion behavior require separate capable review; source CSS and Astro alone cannot prove it.

**News visual direction:** Replace the starfield and floating orbital question mark with a newspaper-style dispatch/bulletin sheet showing that stories, sources and human review are still in preparation. Preserve the arcade iframe, replay action, MIT license link, seven candidate publishers, and explicit no-live-headlines boundary. The editorial composition must not imply automatic publication or currently available news.

**First-party resource preview pages:** Add ten static routes at `/learn/{resource.id}` generated directly from the existing ten resources. Each page shows the provider, curated description, format, level, audience, access caveat, editorial reason to consider it, one suggested first step, and a direct external link. Resource cards now offer both an on-site preview and a direct provider visit. Previews are authored editorial summaries, not provider screenshots, live embeds, cached course copies, verified up-to-date syllabi, endorsements, or guarantees of access/price. Only previously curated resource links are used; no external fetch, scraping, new permission or third-party image right is assumed. Provider-source validation and real-browser reading review remain open.

**Protected surfaces:** No edits to Intro, Discover entrance, History, Risks, Benefits, Environment, shared navigation, arcade source/license, CSS/JS for other routes, external services, domain/SEO settings, dependencies, or production Vercel. Existing Education interaction script is unchanged.

**Acceptance checkpoints:** Exact-commit GitHub source/interaction tests, Astro static build including ten new resource routes, Git-linked protected Vercel preview status/source match, route GET smoke where authentication allows, owner review at desktop and mobile, keyboard/focus, reduced-motion and resource clarity. Keep PR #3 in draft pending those gates. Visual quality and editorial accuracy cannot be marked accepted from successful code/build alone. Reconcile the parallel News documentation branch before any eventual merge.
