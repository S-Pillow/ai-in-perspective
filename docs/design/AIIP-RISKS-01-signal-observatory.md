# AIIP-RISKS-01 | Signal Observatory visual prototype

Status: Owner-authorized first preview. Levels are provisional editorial assessments of potential harm, not measured probability or an official threat ranking. This is not a public release.

## Direction and scope

The owner wants the interior Risks & Safety page to feel connected to the separate gold-and-cyan corridor entrance, not to copy or reuse its visual. The Risk Radar design has original glowing signal rings, dark graphite/navy, amber and cyan traces, severity indicators, category selection, and a details panel without separate pages. The owner explicitly requested broad coverage, risks to employment, leadership/security context, practical safeguards, and the playful ELI5 recap. Product identity is AI in Perspective, an educational interactive website, not a museum.

The prototype has 17 risks in six categories: work/economy, security/misuse, trust/information, people/privacy, governance/power, and advanced systems. Labels Critical/High/Moderate/Low indicate potential severity, not probability. Evidence is separately documented/emerging/uncertain, and trends have cautious specific descriptions. Classifications and copy need research/editorial review before release, not assumed accurate because a third-party screenshot displays similar metrics. In particular, severe hypothetical future loss of control is not a present event, and AI cyber support does not establish widespread fully autonomous attacks.

## Employment evidence ledger (as of 2026-11-14)

1. 2025-05-28, Axios, Anthropic CEO Dario Amodei: warning AI could eliminate up to half of entry-level white-collar jobs within 1 to 5 years, and unemployment might reach 10–20 percent. These are forecasts, not observed impacts. https://www.axios.com/2025/05/28/ai-jobs-white-collar-unemployment-anthropic
2. 2026-08-12, Stanford Digital Economy Lab + ADP: 22–25-year-old workers in highly AI-exposed occupations had an employment level ~19 percent below a benchmark based on growth of less-exposed occupations. This is a relative comparison, NOT a 19 percent unemployment or AI-caused job-loss rate. The gap was associated primarily with slower hiring, not more separations; authors explicitly do not make causal claims or report economy-wide mass displacement. https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
3. 2026-10-14, Yale Budget Lab: no clear large-scale labor market disruption linked to AI by the methods used; may conceal occupational/young-worker effects; subject to changing data. https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market
4. 2026-05-26, Reuters, OpenAI CEO Sam Altman: publicly said an AI jobs apocalypse was unlikely in the near term and acknowledged previous overestimation of some labor effects. A counterpoint CEO opinion, not a causal evaluation. https://www.reuters.com/world/asia-pacific/openais-altman-says-ai-unlikely-lead-jobs-apocalypse-2026-05-26/
5. 2025-05-20, International Labour Organization: one in four workers globally in occupations with some generative AI exposure; most likely transformed rather than made wholly redundant. Exposure does not equal displacement. https://www.ilo.org/publications/generative-ai-and-jobs-2025-update
6. 2026-03-05, Anthropic Economic Index study: no systematic rise in unemployment in highly exposed workers at the time, but possible slowing in young worker hiring. https://www.anthropic.com/research/labor-market-impacts
7. 2026-02-03, IMF labor outlook: both wage/productivity opportunities and unequal labor impacts; workers and nations differently positioned. https://www.imf.org/en/news/articles/2026/02/03/sp-md-leveraging-artificial-intelligence-and-enhancing-countries-preparedness

## General risk and safeguard evidence

The 2026 International AI Safety Report distinguishes actual misuse, malfunctions, systemic harms, emerging capabilities, and uncertain hypothetical catastrophic risks. It advises defense in depth and cautions that current safeguards remain imperfect. https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026

NIST AI Risk Management Framework provides voluntary practices for governance, mapping, measuring, and managing AI risk. It does not guarantee that a model is safe. https://www.nist.gov/itl/ai-risk-management-framework

The leadership opener balances the possible benefits of national AI expertise for domestic security/standards and the real risks from rushed competition and insufficient coordination. It is a reasoned interpretation, not proof that U.S. leadership automatically makes U.S. citizens safe.

## Implementation / accessibility

Files: src/data/risks.ts, src/pages/explore/risks.astro, src/styles/risks.css, src/scripts/risks.js, this design note, source tests, dynamic-placeholder exclusion and PCR. No Intro, Discover corridor, Benefits, Environment, other route, shared styles, dependencies, external live API, PR merge, or public production deployment.

Three-column cards on large screens, two columns tablet, one narrow mobile. Real keyboard-focusable buttons select six category filters and 17 risks. Selected details are native text and sources, not unreadable SVG. JS manages pressed/hidden status and focuses/scolls to selected panel; source summary and safeguard content remain visible without JS. Reduced-motion preference removes ring/card animations. Status count announces filters. Source contract/build evidence, protected preview exact SHA, hosted read-only smoke, and actual device/keyboard/operator review remain distinct gates. Prototype leaves the Risks metadata as planned pending acceptance.

## Acceptance considerations

Review at 1440, 820, 390 and 320 pixels. Inspect overflow, focus, filter re-selection, low-motion behavior, source target links, text readability, relative numbers, attribution, and social risk framing. Job-related estimates and risk severities should be revisited on release as evidence evolves. No claim that this page covers all risks or provides a numerical likelihood model.
