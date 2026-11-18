<h1 align="center">AI in Perspective</h1>
<p align="center"><strong>Explore the promise. Examine the evidence.</strong></p>
<p align="center">An interactive, evidence-first guide to artificial intelligence: its history, potential benefits, risks, physical footprint, and the ideas that make it work.</p>
<p align="center"><a href="https://ai-in-perspective.vercel.app/intro">Enter the experience</a> · <a href="https://ai-in-perspective.vercel.app/discover/">Choose a perspective</a> · <a href="https://ai-in-perspective.vercel.app/methodology">Our approach</a></p>

---

## Explore five perspectives

Follow the interactive Discover ring, or go directly to a topic.

| Perspective | Explore | What you'll find |
| :-- | :-- | :-- |
| **History** | [The story](https://ai-in-perspective.vercel.app/explore/history) | How AI developed, long before today's chatbots. |
| **Risks & Safety** | [Understand the risks](https://ai-in-perspective.vercel.app/explore/risks) | Documented harms, possible future risks, and safeguards. |
| **Benefits** | [Look at the benefits](https://ai-in-perspective.vercel.app/explore/benefits) | Where AI is helping people, and how to examine the evidence. |
| **Environment** | [Follow the footprint](https://ai-in-perspective.vercel.app/explore/environment) | The electricity, water, cooling, and infrastructure behind AI. |
| **Education** | [Learn how AI works](https://ai-in-perspective.vercel.app/explore/education-news) | Six learning levels and 32 topics, from fundamentals to advanced concepts. |

### News & Perspective

[**Visit the News section**](https://ai-in-perspective.vercel.app/explore/news) for five selected AI stories, contextual editorial framing, original-source links, and the licensed arcade experience.

> **Source freshness:** News currently uses a **dated saved snapshot**, not a live or automatically refreshed feed. The published selection draws on a 40-article RSS/Atom snapshot and provides 16 attributed source links. Daily private review collection is configured via [GitHub Actions](https://github.com/S-Pillow/ai-in-perspective/actions/workflows/news-review.yml) and [review issue #8](https://github.com/S-Pillow/ai-in-perspective/issues/8); automatic editorial classification and automatic production publication remain **disabled**.

## Our approach

**Wonder is the invitation. Evidence is the foundation.**

AI in Perspective aims to distinguish measurements, documented incidents, research findings, modeled estimates, and interpretations without forcing them into one certainty level.

- Start with a question worth answering.
- Follow claims back to original sources wherever possible.
- Explain assumptions, limits, uncertainty, and competing interpretations.
- Keep new evidence and corrections visible instead of silently rewriting the past.

Read the site's [editorial approach](https://ai-in-perspective.vercel.app/methodology).

> **Editorial scope:** A published page is **not** a certification that every claim has completed a comprehensive independent research audit. Further editorial review and broader device, keyboard, and accessibility verification remain outstanding.

## Project status

**Public soft launch:** November 14, 2026. All **five perspective destinations** and the separate **News** section are published as of November 17, 2026.

| Area | Status |
| :-- | :-- |
| Intro, Discover, five perspectives, Education, News | **Published** |
| Perspective-return navigation | **Published** ([PR #6](https://github.com/S-Pillow/ai-in-perspective/pull/6)) |
| Discover availability labels and methodology copy | **Updated in source** ([PR #7](https://github.com/S-Pillow/ai-in-perspective/pull/7)); check the production deployment for rollout |
| Daily News collection | **Private review workflow**; no public publishing ([review queue](https://github.com/S-Pillow/ai-in-perspective/issues/8)) |
| Automatic News publication | **Not enabled**; rights and operational acceptance gates remain |
| Cross-device/accessibility review, comprehensive editorial audit, search-indexing decision | **Open follow-ups** |

Production is built from GitHub [`main`](https://github.com/S-Pillow/ai-in-perspective/tree/main) and served by [Vercel](https://ai-in-perspective.vercel.app). A merged commit is not considered deployed until a matching production build is **READY** and the affected public routes are checked. See the [Project Control Record](docs/PROJECT_CONTROL.md) and [GitHub Actions](https://github.com/S-Pillow/ai-in-perspective/actions) for authoritative verification evidence; this README is an orientation, not a live deployment monitor.

## Built with

- **Astro 5** — statically generated public pages.
- **JavaScript, CSS, Three.js, and GSAP** — interactive visuals and storytelling experiences.
- **GitHub Actions** — content, offline News, and build checks.
- **Vercel** — production hosting and a separate authentication-protected review project.

The existing Wayfinder assets are unpacked by the repository's development and build scripts. The interactive Discover experience is also served from `public/discover/index.html`.

## Develop locally

**Requirements:** Node.js **20.11+** and npm.

```bash
npm ci
npm run dev
```

Run content regressions, offline News tests, and the static build:

```bash
npm run check
```

Other useful commands:

| Command | Purpose |
| :-- | :-- |
| `npm run check:content` | Run source and content contract tests. |
| `npm run news:check` | Run offline RSS/Atom and News safeguards. |
| `npm run build` | Build the static site. |
| `npm run preview` | Preview the generated build locally. |
| `npm run news:probe` | Read-only News source probe; **does not publish**. |

`npm run news:collect` is a **write-mode** local snapshot command. It is used only in the isolated daily review checkout or by an approved operator; it never commits or publishes. See [the daily News review runbook](docs/design/AIIP-NEWS-06-daily-review.md).

A successful test run or build does not establish visual, responsive, assistive-technology, or external-link acceptance by itself.

## Contributing and releasing

1. Work on a bounded feature branch. Keep changes to published copy/navigation separate from any future automated News publishing work.
2. Run the relevant tests and Astro build. Inspect desktop/mobile layout and interactions when the visual experience is affected.
3. Open a pull request; document scope, evidence, remaining risks, and the required owner acceptance.
4. Merge into `main` only with explicit release authorization. The connected Vercel project then builds production.
5. Confirm the **exact merge SHA**, Vercel **READY** status, live routes, and a known-good rollback candidate. Record final release evidence in the [Project Control Record](docs/PROJECT_CONTROL.md) or the linked pull-request release record.

**Deployment budget:** The connected production and preview projects share the Vercel account's build allowance. Prefer one verified, coherent change over frequent speculative deployments; a GitHub merge alone does not prove a public release succeeded.

## Governance, sources, and rights

- **Product baseline:** `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, owner-accepted November 12, 2026. The filename retains historical wording; the accepted document content governs. The PRD lives in project materials, not as a substitute README attachment.
- **Development framework:** **AIPF v8.10.1**. Decisions, release gates, evidence, and risks are tracked in [`docs/PROJECT_CONTROL.md`](docs/PROJECT_CONTROL.md).
- **News research:** [Source and editorial-lens discovery](docs/discovery/AIIP-NEWS-01-sources-and-editorial-lenses.md). Publishing automation is not authorized merely because research/probe code exists.
- **Third-party rights:** The adapted arcade has a [specific MIT license notice](public/licenses/instalanding-MIT-LICENSE.txt). That notice does not automatically cover other artwork, code, reporting, or external assets.

**The standard:** make difficult questions understandable without presenting an appealing explanation, visualization, or model-generated claim as independently established fact.
