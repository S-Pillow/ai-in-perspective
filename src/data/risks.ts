/**
 * AIIP-RISKS-01 — Educational risk overview, reviewed 2026-11-14.
 * Levels are PROVISIONAL editorial descriptions of potential consequence,
 * not measured probability, independent rankings or predictions.
 * No trend indicator is an unsupported numeric forecast.
 */
export const riskGroups = [
  { id: "work", title: "Work & economy", short: "Jobs, hiring, opportunity" },
  { id: "misuse", title: "Security & misuse", short: "How people may abuse AI" },
  { id: "trust", title: "Trust & information", short: "Truth, manipulation, reliability" },
  { id: "people", title: "People & privacy", short: "Rights, fairness, well-being" },
  { id: "power", title: "Governance & power", short: "Who sets the rules" },
  { id: "frontier", title: "Advanced systems", short: "Emerging capability risks" }
] as const;

export const riskLevels = [
  { id: "critical", name: "Critical", detail: "Potentially catastrophic consequences if a serious scenario occurs; likelihood may still be unknown." },
  { id: "high", name: "High", detail: "Could cause major harm to people, organizations, or society, particularly without safeguards." },
  { id: "moderate", name: "Moderate", detail: "Could cause meaningful harm, with severity depending on how and where AI is used." },
  { id: "low", name: "Low", detail: "More limited consequences in the particular conditions being assessed. Not a guarantee of safety." }
] as const;

export type RiskCard = {
  id: string;
  group: string;
  level: "critical" | "high" | "moderate" | "low";
  evidence: "documented" | "emerging" | "uncertain";
  trend: string;
  name: string;
  short: string;
  longer: string;
  perspective: string;
  response: string;
  source: string;
  sourceName: string;
};

const report = "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026";
const nist = "https://www.nist.gov/itl/ai-risk-management-framework";
export const risks: RiskCard[] = [
  {
    id:"job-security",group:"work",level:"high",evidence:"emerging",trend:"Early-career hiring gap",
    name:"AI & job security",
    short:"AI could change what people do at work, reduce some hiring, and put certain jobs at risk.",
    longer:"AI can take over tasks that used to require people. Some employers may hire fewer entry-level workers or reorganize jobs; other employers may use AI to support workers or create new kinds of work. Losing a job, having fewer openings, and changing job tasks are different outcomes.",
    perspective:"A Stanford analysis found a widening employment gap for young workers in exposed occupations, driven more by reduced hiring than layoffs. It did not prove AI caused the gap. Yale has not found clear economy-wide disruption. Meanwhile, executives have warned of far larger future losses.",
    response:"Companies can track how automation affects hiring and employees, consult workers, offer transition support, and avoid unreviewed job decisions. Policymakers can measure outcomes and support skills and income transitions.",
    source:"https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/",
    sourceName:"Stanford Digital Economy Lab · August 2026"
  },
  {
    id:"inequality",group:"work",level:"high",evidence:"emerging",trend:"Long-term distribution unclear",
    name:"Unequal economic gains",
    short:"AI's rewards might reach some workers and companies long before others.",
    longer:"People who own technology, have in-demand skills, or can afford new tools may benefit more. Workers with less bargaining power may face disruption without receiving much of the upside.",
    perspective:"The IMF expects AI to affect jobs differently across countries and workers. An exposed job is not automatically an eliminated job.",
    response:"Track who benefits, support affordable training and access, and design labor and competition policies that don't leave vulnerable groups behind.",
    source:"https://www.imf.org/en/news/articles/2026/02/03/sp-md-leveraging-artificial-intelligence-and-enhancing-countries-preparedness",
    sourceName:"International Monetary Fund · February 2026"
  },
  {
    id:"cyber",group:"misuse",level:"high",evidence:"documented",trend:"Capabilities increasing",
    name:"AI-assisted cyberattacks",
    short:"Attackers can use AI to find weak spots, write code, and speed up parts of an intrusion.",
    longer:"Criminals and state-linked actors already use general-purpose AI in cyber operations. AI can make existing attack steps faster. Current research does not establish that fully autonomous end-to-end attacks are a common reality.",
    perspective:"The same techniques can also help defenders find and patch weaknesses. Whether AI helps attackers more than defenders depends on the setting.",
    response:"Use strong authentication, limit access, keep systems patched, review AI agent permissions, and run security tests with human oversight.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"scams",group:"misuse",level:"high",evidence:"documented",trend:"Scale uncertain",
    name:"Deepfakes, impersonation & scams",
    short:"A fake voice, video, or message can make a lie look real.",
    longer:"AI-generated images, cloned voices, and convincing text can help people impersonate trusted friends, family, businesses, or public figures. Financial scams and blackmail using synthetic content have been documented.",
    perspective:"A realistic-looking recording is no longer enough to verify who sent a message. The total amount of AI-attributable fraud is hard to measure.",
    response:"Verify unexpected requests using an independent contact method, use account protections, and slow down when a message demands urgent payment or secrets.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"bio",group:"misuse",level:"critical",evidence:"emerging",trend:"Capabilities under evaluation",
    name:"Biological & chemical misuse",
    short:"More capable AI could make dangerous specialist knowledge easier to misuse.",
    longer:"Some frontier models perform well on tests related to scientific knowledge, raising questions about helping malicious actors. Several developers adopted extra precautions when tests could not rule out harmful assistance.",
    perspective:"High performance on a benchmark is not proof that an AI system has enabled a real-world biological attack. The possible severity is very high; the likelihood and real-world uplift remain uncertain.",
    response:"Evaluate dangerous capabilities before release, restrict high-risk assistance, use expert review, and coordinate with biosecurity authorities.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"sexual-abuse",group:"misuse",level:"high",evidence:"documented",trend:"Prevalence not reliably measured",
    name:"Sexual deepfakes & child exploitation",
    short:"AI can be misused to create intimate images without consent, including abusive imagery involving children.",
    longer:"Synthetic sexual imagery can be used to harass, humiliate, threaten, and exploit. These are documented harms, and the effects on victims can be severe even when images are fabricated.",
    perspective:"Confirmed cases do not give us a reliable global count of how widespread the problem is.",
    response:"Platforms should remove abusive material promptly, preserve reporting routes, and support victims; users can report content instead of spreading it.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"false-answers",group:"trust",level:"moderate",evidence:"documented",trend:"Varies by tool and task",
    name:"Convincing but wrong answers",
    short:"AI can sound certain while giving false information.",
    longer:"AI can invent citations, misread evidence, or produce inaccurate code and explanations. Mistakes become more serious when a person relies on them for medical, legal, financial, or security decisions.",
    perspective:"Some models are more accurate on some tasks, but no broad performance score guarantees correctness in a particular situation.",
    response:"Verify important claims against original sources and keep qualified human review where stakes are high.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"manipulation",group:"trust",level:"high",evidence:"emerging",trend:"Real-world scale unclear",
    name:"Personalized manipulation",
    short:"AI can help people generate persuasive messages aimed at particular audiences.",
    longer:"At low cost, AI can generate many variations of a message and tailor them to different people. That could amplify scams, deceptive persuasion, or coordinated influence campaigns.",
    perspective:"Experiments show persuasive capability, but large-scale real-world effects are harder to prove.",
    response:"Disclose automated political or commercial content when appropriate, limit abuse at scale, support independent media literacy, and assess manipulation techniques.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"poisoning",group:"trust",level:"high",evidence:"emerging",trend:"Attack methods evolving",
    name:"Poisoned data & hidden instructions",
    short:"Malicious content can influence what an AI system reads or does.",
    longer:"Attackers can hide instructions in websites, documents, or other content an AI assistant processes. In some systems that may mislead answers or trigger unsafe tool actions.",
    perspective:"Demonstrated vulnerabilities vary by system; a laboratory attack doesn't automatically show a widespread incident.",
    response:"Treat outside content as untrusted, test prompt-injection defenses, restrict tool permissions, and require approval for consequential actions.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"surveillance",group:"people",level:"high",evidence:"documented",trend:"Deployment varies",
    name:"Mass surveillance & privacy",
    short:"AI can help organizations monitor and analyze people at a much larger scale.",
    longer:"Automated recognition and pattern analysis can turn scattered records, cameras, or online activity into detailed profiles. Weak oversight can threaten privacy and civil liberties.",
    perspective:"Whether a particular system is justified or lawful depends on the purpose, jurisdiction, and safeguards. AI is not the only cause of surveillance harms.",
    response:"Limit collection and retention, protect access, require legal authorization and independent oversight, and make meaningful appeal routes available.",
    source:nist,sourceName:"NIST · AI Risk Management Framework"
  },
  {
    id:"bias",group:"people",level:"high",evidence:"documented",trend:"Context-dependent",
    name:"Bias & unfair decisions",
    short:"An AI-assisted decision can treat people unfairly when data or design leaves some groups out.",
    longer:"Hiring, lending, and service decisions may reproduce patterns from earlier data or produce new errors. Even if nobody intends discrimination, the effects on individuals can be significant.",
    perspective:"Fairness must be tested for the specific population and use. A system described as 'objective' may still be wrong.",
    response:"Test outcomes across affected groups, explain decisions, monitor after deployment, and provide human review and ways to appeal.",
    source:nist,sourceName:"NIST · AI Risk Management Framework"
  },
  {
    id:"overreliance",group:"people",level:"moderate",evidence:"documented",trend:"Long-term effects uncertain",
    name:"Overreliance on AI",
    short:"People may accept an AI answer too quickly or stop checking their own judgment.",
    longer:"A convenient assistant can encourage us to trust a plausible answer even when it is wrong. This is called automation bias; its risks depend on the stakes and the person using the tool.",
    perspective:"AI can be a helpful second opinion, but it should not become an unquestioned authority.",
    response:"Teach checking habits, make uncertainty visible, and retain review for high-stakes tasks.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"wellbeing",group:"people",level:"moderate",evidence:"emerging",trend:"Population-level effects uncertain",
    name:"Chatbots & emotional well-being",
    short:"Some AI conversations may reinforce unhealthy beliefs or make isolation worse.",
    longer:"Conversational AI can feel reassuring or personal. For vulnerable people, excessive agreement, misleading guidance, or dependency may cause harm.",
    perspective:"Some harms have been reported, but broad causal claims about users' mental health are not yet established. This is not a diagnosis.",
    response:"Avoid treating a chatbot as a substitute for professional or personal support in a crisis, and design systems to avoid harmful reinforcement.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"concentration",group:"power",level:"high",evidence:"emerging",trend:"Market outcomes uncertain",
    name:"Concentration of power",
    short:"A small number of organizations could control tools that many people depend on.",
    longer:"Building advanced AI can require vast computing resources, talent, and data. That may give a few companies or governments unusual influence over access, prices, and decisions.",
    perspective:"Concentration creates governance concerns, but its eventual extent and harms depend on policy and market changes.",
    response:"Support competition, transparency, independent research access, open standards, and checks on abuse of power.",
    source:nist,sourceName:"NIST · AI Risk Management Framework"
  },
  {
    id:"oversight",group:"power",level:"high",evidence:"emerging",trend:"Governance catching up",
    name:"Safety rules falling behind",
    short:"New AI capabilities can spread faster than institutions can test or oversee them.",
    longer:"When evaluation methods, laws, or public oversight cannot keep pace with deployment, important problems may be missed until after a system is in use.",
    perspective:"Safety rules, regulation, and voluntary frameworks differ across countries; no one approach guarantees protection.",
    response:"Use independent testing, incident reporting, auditable records, enforceable standards and international coordination.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"agents",group:"frontier",level:"high",evidence:"emerging",trend:"Autonomy increasing",
    name:"Autonomous AI agents",
    short:"When AI can act through software tools, a mistake can affect more than a written answer.",
    longer:"Agents can browse, run code, send messages, or change systems. If permissions are too broad or outside content is malicious, the consequences can spread quickly.",
    perspective:"Capabilities are improving unevenly. Some autonomous tasks work well; reliable long-running, unsupervised operation remains limited.",
    response:"Give agents the minimum permissions they need, keep consequential actions behind approval, and test recovery and shutdown paths.",
    source:report,sourceName:"International AI Safety Report · 2026"
  },
  {
    id:"loss-control",group:"frontier",level:"critical",evidence:"uncertain",trend:"Long-term likelihood unknown",
    name:"Losing control of advanced AI",
    short:"Future systems might become hard to supervise or stop if they gain more autonomy.",
    longer:"Researchers are studying scenarios where a powerful AI could evade oversight or pursue goals that conflict with human intentions. The potential consequences could be extreme.",
    perspective:"The 2026 International AI Safety Report says current systems do not have the capabilities required for such a loss-of-control scenario. Experts disagree about whether and when it could become possible.",
    response:"Research evaluation methods, monitor autonomy, limit access to critical systems, and prepare safeguards before capabilities advance.",
    source:report,sourceName:"International AI Safety Report · 2026"
  }
];
