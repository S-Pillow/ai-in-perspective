# AI in Perspective | Project control record

- **Record revision:** 4
- **Last reconciled:** 2026-11-12
- **Governance:** AIPF v8.10.1
- **Product authority:** `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, owner-accepted 2026-11-12. Its embedded 'review draft' notices are superseded by the owner's explicit acceptance; the document content is otherwise unchanged.
- **Historical baseline:** v2.0 PRD (superseded for current scope).
- **Repository:** `S-Pillow/ai-in-perspective`
- **Delivery model:** GitHub development branch, checked code, PR, Vercel preview only after owner connects it, rendered review and owner acceptance, then separately approved release.
- **Active unit:** AIP-FOUNDATION-01. Repo foundation plus one complete **prototype journey**: cinematic introduction, original atmospheric museum hall with six distinguishable exhibit navigation installations, and an Environment page illustrating a simple water-accounting teaching interaction.
- **Owner authorization:** 'Start work you will be the prompt agent and the build and pushing the code to github.' Accepted PRD governs; push to development branch authorized. No auto-merge, public release, external API subscriptions, production changes, or third-party source copying.
- **Phase:** Initial implementation complete for AIP-FOUNDATION-01, draft pull request #1 open, preview deployment READY and HTTP smoke passed. Rendered visual and editorial acceptance pending. Do not merge.
- **Controls:** No copied Multiverse imagery/code; no unverified quantitative research; intro replay/skip and reduced-motion behavior; six genuine destination routes, with incomplete pages disclosed as such; direct links and readable content.
- **Validation:** GitHub Actions workflow run `43193313929` completed SUCCESS for source commit `b7707f94e214c80d7dc03dcae06542ce524f60a8`: 6/6 content checks PASS, `astro build` PASS with 9 static routes generated. Earlier CI failures were confined to a test regex; corrected before final green run. Rendered browser inspection at 320/390/430/1440 widths, keyboard, reduced motion, interaction and editorial source checks remain NOT VERIFIED.
- **Known environment constraint:** npm registry network was not reachable from the initial coding container, so local build remained unavailable; the GitHub-hosted CI runner installed dependencies and successfully built the static site. Vercel independently built the inline-source snapshot. No browser-based screenshot inspection of desktop/mobile/animation was completed by the builder.
- **Deployment:** Owner connected Vercel on 2026-11-12. Vercel GitHub Login Connection is still missing, so automatic Git builds could not be linked (`create_git_project` returned GitHub Login Connection required). A separate team-scoped project `prj_ogxXY2zsXmNWfbQzJo3L5MipbJxC` was created for an authenticated, non-production preview. An initial inline deployment was unexpectedly classified as `target=production` and immediately **canceled** (`dpl_4B8dFnsFW6c2DxJXVpZXZ8HcsM28`, state CANCELED; no completed production release). A subsequent inline-file deployment omitted target (Vercel default preview) and reached **READY**, with `target=null`, no assigned aliases: `dpl_GAQsehvNdg8oe6Hpgdhk9GcJRfvF`, URL `https://ai-in-perspective-prototype-preview-9yxfwd3xl-spillow82-4062.vercel.app`. All 17 tracked source files were read from feature branch commit `ac5ee432395e8375bd89732fd8e43df78ede17ba` and passed as inline source. GitHub PR #1 remains draft and unmerged. Vercel project uses preview SSO protection; the Git-connected auto-deploy workflow remains pending owner's separate GitHub Login Connection.
- **Rollback:** development-only changes isolated on `feature/aiip-foundation-museum-slice`; the authenticated unaliased preview may be canceled if required. No production site is running. The accidentally production-targeted attempt was canceled before completion.
- **Future work not authorized as part of this unit:** completed Risk Atlas, five full exhibits, automated research ingestion, live datasets, paid APIs, public launch, changing AI & Water or Hostinger.

## Preview smoke record (2026-11-12)

- Build: Vercel deployment `dpl_GAQsehvNdg8oe6Hpgdhk9GcJRfvF`, `READY`, `target=null`, `alias=[]`.
- Authenticated HTML fetch: `/`, `/intro`, `/explore/environment`, `/explore/risks`, `/methodology` all returned HTTP 200 and corresponding HTML titles. The remaining four planned route pages have Astro build coverage but were not HTTP-smoked individually.
- Source snapshot: feature-branch commit `ac5ee432395e8375bd89732fd8e43df78ede17ba` (earlier than this documentation-only revision).
- NOT VERIFIED: rendered desktop/mobile layout or design quality, interactive button state transition in a browser, reduced-motion behavior in a browser, cross-browser layout/keyboard interaction, final research/editorial sourcing.
- Source-of-truth note: GitHub PR #1 remains the code authority. This temporary standalone Vercel project is not Git-linked and does not auto-update on pushes. Do not treat its READY state as visual approval or public launch.

## AIIP-UI-01 design correction intake (2026-11-12)

- **Trigger/evidence:** Owner-provided desktop screenshots of the authenticated museum hall, six similarly structured arch installations, Environment hero and reading sections show that the current iteration does not yet visually meet the accepted immersive museum direction. This is screenshot evidence for the pictured states only; animation and multi-viewport performance remain unverified.
- **Chapter 14 classification:** Visual direction / substantial redesign. Planning and source study only in this unit; accepted PRD, application behavior and editorial evidence are protected.
- **External research reviewed:** `pbakaus/impeccable` at `b4bff1626c344067788c2679f048a20057c7cc5a` (Apache-2.0); `nextlevelbuilder/ui-ux-pro-max-skill` at `6ae86f61f520d6ca229d2f40e070410638c908c5` (MIT). Detailed adoption/non-adoption and three candidate museum compositions: `docs/design/AIIP-UI-01-creative-correction-brief.md`.
- **Current action:** Read-only source review and planning document commit on draft PR #1; no third-party tool or hook installed, no downloaded executable run, and no change to visual source/runtime/deployment.
- **Visual status:** Current prototype remains **not visually accepted**. The candidate art direction (Living Atrium recommended for exploration) is a proposal, not accepted design and not implementation authority for unreviewed visual additions.
- **Next gate:** Render and compare materially different compositions within the same accepted animated museum vision, inspect mobile/desktop/reduced-motion and teaching states; owner selects direction before full rollout. No PR merge or public release.
