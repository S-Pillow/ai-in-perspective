# AI in Perspective | Project control record

- **Record revision:** 2
- **Last reconciled:** 2026-11-12
- **Governance:** AIPF v8.10.1
- **Product authority:** `AI_in_Perspective_PRD_v2_1_Museum_Review_Revision.docx`, owner-accepted 2026-11-12. Its embedded 'review draft' notices are superseded by the owner's explicit acceptance; the document content is otherwise unchanged.
- **Historical baseline:** v2.0 PRD (superseded for current scope).
- **Repository:** `S-Pillow/ai-in-perspective`
- **Delivery model:** GitHub development branch, checked code, PR, Vercel preview only after owner connects it, rendered review and owner acceptance, then separately approved release.
- **Active unit:** AIP-FOUNDATION-01. Repo foundation plus one complete **prototype journey**: cinematic introduction, original atmospheric museum hall with six distinguishable exhibit navigation installations, and an Environment page illustrating a simple water-accounting teaching interaction.
- **Owner authorization:** 'Start work you will be the prompt agent and the build and pushing the code to github.' Accepted PRD governs; push to development branch authorized. No auto-merge, public release, external API subscriptions, production changes, or third-party source copying.
- **Phase:** Initial implementation complete for AIP-FOUNDATION-01, draft pull request #1 open; rendered visual and editorial acceptance pending. Do not merge.
- **Controls:** No copied Multiverse imagery/code; no unverified quantitative research; intro replay/skip and reduced-motion behavior; six genuine destination routes, with incomplete pages disclosed as such; direct links and readable content.
- **Validation:** GitHub Actions workflow run `43193313929` completed SUCCESS for source commit `b7707f94e214c80d7dc03dcae06542ce524f60a8`: 6/6 content checks PASS, `astro build` PASS with 9 static routes generated. Earlier CI failures were confined to a test regex; corrected before final green run. Rendered browser inspection at 320/390/430/1440 widths, keyboard, reduced motion, interaction and editorial source checks remain NOT VERIFIED.
- **Known environment constraint:** npm registry network was not reachable from the initial coding container, so local build remained unavailable; the GitHub-hosted CI runner installed dependencies and successfully built the static site. No local browser preview was generated.
- **Deployment:** Vercel connection not yet confirmed; plugin connection has been offered to owner. No Vercel deploy initiated. GitHub PR #1 is draft only.
- **Rollback:** development-only changes isolated on `feature/aiip-foundation-museum-slice`; no live site to roll back.
- **Future work not authorized as part of this unit:** completed Risk Atlas, five full exhibits, automated research ingestion, live datasets, paid APIs, public launch, changing AI & Water or Hostinger.
