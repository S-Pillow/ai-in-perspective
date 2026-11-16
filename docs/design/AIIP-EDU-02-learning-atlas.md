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

## AIIP-EDU-03 | Owner-directed deeper Education, separate News branch (2026-11-16)

**Authority:** The owner approved a *separate GitHub branch for future News work* while requesting specific Education edits on existing Draft PR #3 before any main merge. A branch named `feature/aiip-news-feed` was created at restored feature commit `638289c81fad2b915c60e11af8eee11972ee096f`, with no News implementation changes. That branch depends on the unmerged Education/News route split and needs synchronization after Education acceptance; do not merge or deploy it yet. The Education PR branch remains `feature/aiip-education-path-news-arcade`.

**Intent/visual lock:** Owner rejected the bright below-fold redesign and approved returning to the original dark Education screenshot with six horizontal level buttons, dark lesson panels, and expandable two-column concept tiles. Keep that restored page identity, navigation, controls and content hierarchy unchanged. The only visual change in this ticket allows an *opened* concept tile to use the full concept-row width for longer explanatory text; collapsed tiles and the dark palette are unchanged. The Build with AI panel gains a readable, modest in-panel tools list. No News page, arcade, Discover, intro, History, Risks, Benefits, Environment, shared component or production change.

**Editorial changes requested:** 
- Basics topic #4 now explains Large Language Models (LLMs) and the Transformer-based model design used by many assistants, with the distinctions between product, model, training and retrieval made explicit. Topic #5 adds Multimodal Foundation Models, including photos, PDFs, voice and varied I/O, with product capability caveats. Previous ANI/AGI/ASI remains as topic #6, with AGI uncertainty maintained.
- How it learns #1 now explains supervised, unsupervised and reinforcement learning from a provider/training-team perspective, replacing the house-price/song example. A fifth topic traces a typical company data-to-model workflow. Do not claim every company publishes or uses one identical training recipe.
- Inside the system #3 retains its environment source and adds https://stevenpillow.com/ai-water-perspective/ as requested further reading. #4 explains local inference on CPU and optional GPU, system RAM vs GPU VRAM, downloads, offline considerations and cloud tradeoffs, with official Ollama documentation.
- Build with AI #4 now contains a followable seven-step Langflow Vector Store RAG example referencing the actual official tutorial: install, create template, configure embeddings/model/vector store, upload fictional files and index, query with retrieved text, test unknown answers, and reindex changes. This exercise requires external tool setup, may incur API/vector-store costs and is not a promise of turnkey deployment. A fifth topic explains selecting a builder, coding tool or workflow based on the job.
- New in-panel Build with AI tool directory: GoDaddy Airo AI Builder and Hostinger AI Builder with owner's exact affiliate/referral URLs, Cursor, OpenAI Codex, Claude with Cowork capabilities (Anthropic announced the merger into Claude in September 2026), Langflow's official RAG tutorial, and https://stevenpillow.com/aipf for an owner-supplied development workflow. Affiliate/referral URLs are plainly labeled on the page. The supplied AIPF URL is retained as given; external provider names and available features should be checked on linked sites before relying on them.
- Removed both owner-rejected microcopy strings: "Go at your own pace. There's no test to pass." and "Learn at your own pace". Removed the hard-coded "Four things to understand" and static 24-concept count. Total content is now **28 topics across six levels** (6, 4, 5, 4, 5, 4), with expandable optional deep-dive paragraphs, guided steps and further-reading links where warranted. Existing primary source links, caution notes, badges and native detail controls remain. This does not invent certifications, grades, a rigid four-topic cap, or an external course credential.

**Trust and verification:** The website's user-supplied external links are treated as citations/learning suggestions, not proof of endorsement. Technical descriptions rely on appropriate primary sources such as Google Research's Transformer paper, Google AI's multimodal/document docs, Ollama's installation guide and Langflow's current RAG tutorial. RAG vector-store vendor and credential requirements can change; the official tutorial is the canonical implementation reference, not the short educational outline alone. Do not expose API keys on the page, scrape providers, or enable external actions. The previously removed external link-unfurl API remains out of scope and absent.

**Acceptance:** GitHub content contract tests and Astro build at exact feature SHA, verify six selectors and 28 rendered topic disclosures plus Build tool link display and the requested extra water source in the protected Vercel preview. Confirm open-topic readability at desktop/mobile with keyboard and reduced-motion behavior as actual browser/operator checks, not inferred from source. Keep PR #3 **draft**, no force push, News branch isolated and production main unchanged. A future merge needs explicit owner acceptance and separate release authorization; reconcile the existing News discovery/PCR branch before any News merge.

## AIIP-EDU-04 | Four useful topics, complete human-voice review, authorized release (2026-11-16)

**Owner direction:** After viewing and approving the protected Education preview of `895dfe0`, the owner explicitly accepted four additional gaps and requested a whole-section human-voice review, then a merge to main so News can proceed on its own branch. This supersedes the older preview-only release boundary for Education/News, **conditional on source/build/hosted verification**. No visual redesign or external live News feed was authorized.

**Curriculum outcome:** Six levels remain unchanged. Four specifically approved topics have been added:
- Use AI: **Why AI makes things up**, with hallucination examples, reasons, ways to check, and a distinction between convincing text and evidence (Google ML glossary and technical writing guidance).
- Inside the system: **Context windows, memory, and why AI loses track**, explaining the difference between working context, a stored chat history, optional remembered information, and training; avoids claiming any one product always remembers or forgets the same way (OpenAI conversation state and memory docs).
- Inside the system: **Open-weight vs. proprietary models**, distinguishing downloaded weights, local execution, source/model openness, and actual license rights (Hugging Face license/model docs).
- Build with AI: **Prompt injection and tool permissions**, showing an untrusted email/document example and safeguards that restrict authority, with a safe exercise using fictional files (Microsoft Learn indirect-injection guidance).
Total **32 topics** with per-level counts 6, 5, 5, 6, 6, 4. The existing six stage IDs, four original perspectives, visual theme, horizontal level selectors, 10 owner-curated resource cards, optional content expansion, native disclosures, accessibility/keyboard behavior, extra water citation, RAG project guide, builder directory and referral links remain as previously implemented.

**Human-voice editorial audit:** Reviewed the visible Education content for all 28 pre-existing concepts, replaced each old `plain` explanation and `example` with more direct, everyday language while retaining each concept's `note`, `source`, `sourceLabel`, and existing longer optional `more` or `steps` explanations. Reviewed six level introductions and practical takeaways, selectively revised overly abstract or polished phrases, and refined page guidance (path choice, six-level heading, resource explanation and RAG diagram headline). Preserved important meaning: LLM product-vs-model distinction, multimodal app/tool variability, ANI/AGI/ASI uncertainty, labeled/unlabeled/reinforcement training nuances, hardware and cloud/privacy caveats, RAG limitations and external costs, high-impact human approvals, licensing permissions and draft News boundaries. No unsupported claims that models are sentient, always cite sources, or literally think like humans. The existing source links are not portrayed as independently verified current live service guarantees.

**Source-record reconciliation:** The seven-source candidate News roster and five editorial lenses from the earlier unmerged `docs/aiip-news-sources-anthropic` branch are copied as an **unchanged discovery artifact** to `docs/discovery/AIIP-NEWS-01-sources-and-editorial-lenses.md` on the Education PR branch before main merge. This preserves the previously approved addition of Anthropic alongside MIT News, arXiv, MIT Technology Review, The Verge, OpenAI and Google DeepMind. It does **not** implement or authorize an RSS feed, scrape articles, publish news, or prioritize one model vendor. The separate `feature/aiip-news-feed` branch remains the target for the next authorized News development and must be synchronized with main after merge.

**Verification/release contract:** GitHub Actions content assertions for 32 topics, location, source and caution, 6 level controls, 10 resources, text/URL parity, News arcade unchanged, and Astro static build. Protected Vercel preview from exact final source SHA with read-only GET for Education, News, Discover and arcade, plus key lesson text checks and permission/ownership constraints. Review copy from rendered output and disclose that no browser screenshot/keyboard execution was performed if unavailable. Convert Draft PR #3 to ready after tests pass, merge via GitHub only with expected head SHA, then independently confirm Vercel production target is READY at merged main SHA, public Education and News URLs serve revised content, and protected News branch remains distinct. If deployment cannot be confirmed, do not claim release success. Update PCR with real observed hashes and any unresolved risks.
