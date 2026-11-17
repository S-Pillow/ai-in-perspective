# AI in Perspective

An interactive, evidence-first look at artificial intelligence: where it came from, what it can help with, where it can go wrong, how it affects the physical world, and how to understand and use it.

**Public website:** https://ai-in-perspective.vercel.app

**Governing product baseline:** `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, accepted by the owner on November 12, 2026. The historical filename and embedded review-draft notices do not rename the product or override the owner's acceptance. The authoritative PRD remains in project materials; this README is an operational overview, not a substitute for the PRD.

**Development framework:** AIPF v8.10.1. Current decisions, approval boundaries, evidence, risks, and release state are recorded in [the Project Control Record](docs/PROJECT_CONTROL.md).

## Public site and release status

The site had its first **public soft launch** on November 14, 2026. The production environment is built from the `main` branch of `S-Pillow/ai-in-perspective`.

- **Live now (November 17, 2026):** the interactive Intro, five-perspective Discover ring, published History, Risks & Safety, Benefits, Environment and Education pages, and the separate News page. Education contains a six-level, 32-topic learning path. News presents five curated stories, up to 16 attributed source links selected from a dated 40-article snapshot, and the licensed arcade.
- **Latest production release:** [PR #6](https://github.com/S-Pillow/ai-in-perspective/pull/6) merged the perspective-return navigation and corrected the outdated Education-to-News "Coming Soon" labels. Production Vercel deployment `dpl_ESSWH9N8JBKmphrQVFfdMb6vAQ9d` reports `READY` for `main` commit `619024976f3bf5ba202f4b768555f9e76abcfbbb`; the published route checks passed.
- **Not activated:** a scheduled daily News collection/publication job, real-time feeds, or automatic editorial classification. News source links are from a dated saved snapshot, not a live feed. Publisher-rights checks and approved operator verification remain prerequisites for automated publishing; see [News source discovery](docs/discovery/AIIP-NEWS-01-sources-and-editorial-lenses.md).

The public site still needs broad device/keyboard/accessibility review, independent editorial verification beyond already-reviewed material, and a separate search-indexing decision. Published does not mean every claim has undergone a comprehensive independent research audit.

## Technology and repository

- Astro 5 with static output, plus JavaScript/CSS for interactive experiences. Existing animations use the dependencies declared in `package.json`.
- GitHub repository: https://github.com/S-Pillow/ai-in-perspective
- Public production: Vercel project `ai-in-perspective` at https://ai-in-perspective.vercel.app, connected to `main`.
- Protected review environment: separate Vercel project `ai-in-perspective-prototype-preview`, with Vercel Authentication enabled. A preview URL does not mean a feature is publicly released.
- Published source includes `src/pages/`, `src/components/`, `src/styles/`, `src/data/`, `src/scripts/`, and static assets in `public/`. The Discover entrance includes a standalone HTML asset under `public/discover/`.
- Design and discovery documents are under `docs/design/` and `docs/discovery/`. These include historical decisions; read their supersession notes before treating them as current implementation instructions.

## Run and verify locally

Use Node.js **20.11 or newer**, as declared by the project. From the repository root:

```bash
npm ci
npm run dev
```

For source/content regression checks and a static production build:

```bash
npm run check
```

The `check` script runs content and News tests plus the Astro build. The `dev` and `build` scripts also unpack the existing Wayfinder assets before starting Astro. A passing build is not a substitute for checking rendered layout, keyboard operation, reduced-motion preferences, or real external links.

## GitHub and release workflow

1. Scope changes on a feature branch. Keep bounded copy/navigation fixes separate from activating automated News collection or publication.
2. Run the content tests and build; inspect the actual rendered experience where visual/interaction acceptance matters.
3. Open or update a pull request and record the owner's acceptance. Production merges are an explicit release action, not an automatic consequence of completed code.
4. Merge into `main` only with the required release gates satisfied. Vercel then builds and publishes production from the merged commit; verify that the live deployment matches that SHA and that the key routes work.
5. Preserve rollback references and record the final release result in `docs/PROJECT_CONTROL.md`.

**Vercel Hobby quota:** Both connected Vercel projects can generate builds from GitHub changes, so repeated small commits can exhaust the shared deployment allowance. Batch related changes into fewer commits, avoid unnecessary preview retries, and verify deployment capacity before a controlled production merge. Do not bypass quota by claiming a GitHub merge is already published.

## Editorial, privacy, and asset boundaries

The goal is understandable, source-backed writing with uncertainty and provenance preserved. Do not present generated claims as independently verified facts, automatically republish third-party news, or use external imagery/code without permission. The adapted arcade has its own license notice at `public/licenses/instalanding-MIT-LICENSE.txt`; other third-party assets are not covered by that notice.

The repository and accepted PRD govern product changes. The Project Control Record describes the current operational state; older documentation remains useful as historical evidence, not a reason to reinstate superseded designs.
