# AIIP-BENEFITS-01 | Interactive Impact Explorer visual study

**Status:** New owner-directed Benefits prototype on development branch only; awaiting aesthetic/editorial acceptance. Not a production release or completed six-exhibit deliverable.

## Creative direction and source-rights choice

The owner proposed Uiverse examples featuring pink/orange/violet gradient cards, glass layers, an atmospheric starfield and a light that moves around a card border; the last glowing-border/background effect was a favorite, but a search box was explicitly unwanted. Build an original visual system from those high-level qualities, not copied CSS, assets, layouts or code.

Composition: atmospheric dark page and warm sunset-horizon hero; four selectable, luminous subject cards; large story-specific illustrated teaching stage; restrained research-source cards and an ordinary-language conclusion. The moving rim is a selection indicator, not continuous decoration on every panel. The four stories share navigation and evidentiary structure while having different original SVG subjects: abstract screening review, protein prediction, forecast patterns, and photo description.

This is a substantive first-page **visual prototype**, not an assertion of complete research coverage of education, public service or daily work. Those remain future subject candidates.

## Evidence and factual boundaries

- Healthcare: MASAI Swedish randomized breast-screening research. 2026 Lancet trial record at https://pubmed.ncbi.nlm.nih.gov/41620232/ reports favorable screening performance for a particular AI-assisted workflow. Do not generalize this to every clinical AI model, diagnosis or hospital.
- Discovery: EMBL-EBI / DeepMind AlphaFold DB at https://alphafold.ebi.ac.uk/ offers more than 200 million freely available **predicted** structures. Predictions are not experiment-verified structures or instant medical discoveries.
- Environment: ECMWF operational AI forecasting announcement https://www.ecmwf.int/en/about/media-centre/news/2025/ecmwfs-ai-forecasts-become-operational from February 2025. Operational forecasting is not evidence that AI's net environmental footprint is negative.
- Accessibility: Be My AI available feature documented at https://www.bemyeyes.com/bme-ai/ . Provider feature descriptions establish availability, not independently verified impact for all users. The product can describe images inaccurately.

All SVG teaching scenes are original conceptual metaphors, never real mammograms, scientific measurements, weather readings, or screenshots of a real application. Core claims have direct named sources. No invented gain percentages, miracle claims, fake real-time data, or fictional comparative metrics.

## Responsive and accessibility contract

Desktop uses a two-column hero, four subject cards, and a text/illustration stage; tablet collapses to two cards and a stacked stage; narrow mobile retains labeled two-column choices and stacked text. Inspect at 320, 390, 430 and 1440px, plus meaningful intermediate widths.

Use real buttons with aria-pressed and aria-controls, visible keyboard focus, and a motion control. JavaScript updates which stage panel is hidden. Static evidence cards with all four source links remain available without JavaScript, and source content is never only in an illustration. Decorative motion is optional: CSS prefers-reduced-motion turns it off, and the page's motion toggle pauses animations. Static page remains readable and meaningful.

## Controlled scope, verification and stop

New src/pages/explore/benefits.astro, its scoped CSS/JS, fallback [slug].astro exclusion, source-contract tests, this design record and PCR; no changes to Intro, five-topic ring, Environment, exhibit list or unrelated page. Benefits remains marked planned in src/data/exhibits.ts pending owner/full-exhibit acceptance, despite having a reviewable prototype route. No new library, external API, source copying, login, monitoring, public deployment or merge.

Acceptance evidence: GitHub tests and Astro build at exact code SHA, protected Vercel preview READY matching that SHA, read-only hosted content smoke, then separate owner visual acceptance and mobile/keyboard/reduced-motion verification before release.
