/** AIIP-NEWS-03 — curated editorial preview, not a live feed or an RSS collector. */
export const NEWS_REVIEW_DATE = "2026-11-16";
export const NEWS_LENSES = Object.freeze([
  "AI Doing Good",
  "AI Gone Wrong",
  "New Models & Tools",
  "Strange & Surprising",
  "Safety, Policy & Society",
]);
export const NEWS_SOURCES = Object.freeze([
  { name: "MIT News", type: "University and research", url: "https://news.mit.edu/topic/artificial-intelligence2" },
  { name: "arXiv", type: "Preprints, not peer reviewed by default", url: "https://arxiv.org/list/cs.AI/recent" },
  { name: "MIT Technology Review", type: "Independent journalism", url: "https://www.technologyreview.com/topic/artificial-intelligence/" },
  { name: "TechCrunch", type: "Independent technology reporting", url: "https://techcrunch.com/category/artificial-intelligence/" },
  { name: "The Verge", type: "Independent reporting", url: "https://www.theverge.com/ai-artificial-intelligence" },
  { name: "OpenAI", type: "First-party announcements", url: "https://openai.com/news/" },
  { name: "Google DeepMind", type: "First-party announcements", url: "https://deepmind.google/blog/" },
  { name: "Anthropic", type: "First-party announcements", url: "https://www.anthropic.com/news" },
]);
export const NEWS_STORIES = Object.freeze([
  {
    id: "mit-2026-design-copilot",
    title: "New AI “copilot” helps engineers design better structures",
    publisher: "MIT News",
    sourceType: "University research report",
    url: "https://news.mit.edu/2026/new-ai-copilot-helps-engineers-design-better-structures-1113",
    publishedAt: "2026-11-13",
    lens: "AI Doing Good",
    evidenceStatus: "Research reported by MIT",
    context: "Researchers describe an approach that lets engineers steer a design as an AI system develops it. It is research evidence, not proof that the technique is already standard in construction.",
    featured: true,
  },
  {
    id: "verge-2026-agent-wallet",
    title: "ChatGPT Wallet lets OpenAI’s Dots agents make purchases for you",
    publisher: "The Verge",
    sourceType: "Independent technology reporting",
    url: "https://www.theverge.com/ai-artificial-intelligence/1033425/openai-chatgpt-wallet",
    publishedAt: "2026-11-13",
    lens: "New Models & Tools",
    evidenceStatus: "Reporting with provider-attributed product claims",
    context: "The Verge reports on an agent payment feature requiring user approval at checkout. Availability, safeguards, and future plans are attributed to the provider.",
    featured: false,
  },
  {
    id: "arxiv-2026-tail-agent-safety",
    title: "Tail-risk-aware Agent Safety: Constraining Tail Risks Across Multi-step LLM Agent Workflows",
    publisher: "arXiv",
    sourceType: "Research preprint",
    url: "https://arxiv.org/abs/2611.10411",
    publishedAt: "2026-11-07",
    lens: "Safety, Policy & Society",
    evidenceStatus: "Preprint — not peer reviewed by default",
    context: "The authors propose a method for considering failures across multiple steps in an AI agent's work. Its reported benchmarks do not establish a widely adopted safety standard.",
    featured: false,
  },
  {
    id: "mit-2026-worldparticle",
    title: "A single AI model simulates the behavior of many substances, from sliding sand to folding proteins",
    publisher: "MIT News",
    sourceType: "University research report",
    url: "https://news.mit.edu/2026/single-ai-model-simulates-many-substances-behavior-1109",
    publishedAt: "2026-11-09",
    lens: "Strange & Surprising",
    evidenceStatus: "Research reported by MIT",
    context: "A research team presents a single model for several kinds of physical simulation. Its possible future applications are not yet the same as established real-world results.",
    featured: false,
  },
  {
    id: "anthropic-2026-misuse-report",
    title: "Detecting and countering misuse of AI: September 2026",
    publisher: "Anthropic",
    sourceType: "First-party security report",
    url: "https://www.anthropic.com/threat-intelligence-report-september-2026",
    publishedAt: "2026-09-10",
    lens: "AI Gone Wrong",
    evidenceStatus: "Provider-reported incidents; not independent verification",
    context: "Anthropic describes cases of people misusing its AI services. These are company investigations of human-directed activity, not evidence of an AI system acting outside all human direction.",
    featured: false,
  },
]);

/** A purely offline policy check. The published page never fetches external feeds. */
const HOSTS = Object.freeze({
  "MIT News": ["news.mit.edu"],
  "The Verge": ["www.theverge.com", "theverge.com"],
  "arXiv": ["arxiv.org"],
  "Anthropic": ["www.anthropic.com", "anthropic.com"],
});
export function validateEditorialPreview(stories = NEWS_STORIES) {
  if (!Array.isArray(stories) || !stories.length) throw new Error("no_preview_stories");
  const ids = new Set();
  let featured = 0;
  for (const story of stories) {
    if (!story || typeof story !== "object" || ids.has(story.id)) throw new Error("invalid_or_duplicate_id");
    ids.add(story.id);
    if (!NEWS_LENSES.includes(story.lens)) throw new Error("unknown_lens");
    if (!HOSTS[story.publisher]) throw new Error("publisher_not_reviewed");
    const url = new URL(story.url);
    if (url.protocol !== "https:" || url.username || url.password || url.port || !HOSTS[story.publisher].includes(url.hostname)) throw new Error("unsafe_article_url");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(story.publishedAt) || !Number.isFinite(Date.parse(story.publishedAt + "T00:00:00Z")) || story.publishedAt > NEWS_REVIEW_DATE) throw new Error("invalid_article_date");
    for (const field of ["title", "sourceType", "context", "evidenceStatus"]) {
      if (typeof story[field] !== "string" || !story[field].trim() || /<[^>]*>/.test(story[field])) throw new Error("invalid_preview_text");
    }
    if (story.featured) featured++;
  }
  if (featured !== 1) throw new Error("exactly_one_editorial_example_lead");
  return true;
}
