/**
 * News source allowlist. A candidate does not imply syndication rights or an
 * independently verified live endpoint. Anthropic has no verified official RSS.
 * Only enabled entries may be collected; metadata-only owner authorization is documented in the runbook.
 */
export const NEWS_FEEDS = Object.freeze([
  { id:"mit_news_ai",publisher:"MIT News",sourceType:"university",feedUrl:"https://news.mit.edu/rss/topic/artificial-intelligence2",articleHosts:["news.mit.edu"],enabled:true },
  { id:"arxiv_cs_ai",publisher:"arXiv",sourceType:"preprint",feedUrl:"https://rss.arxiv.org/rss/cs.AI",articleHosts:["arxiv.org","www.arxiv.org"],enabled:true },
  { id:"verge_ai",publisher:"The Verge",sourceType:"independent_reporting",feedUrl:"https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",articleHosts:["www.theverge.com","theverge.com"],enabled:true,preserveFeedMetadata:true },
  { id:"openai_news",publisher:"OpenAI",sourceType:"company_announcement",feedUrl:"https://openai.com/news/rss.xml",articleHosts:["openai.com","www.openai.com"],enabled:true },
  { id:"google_deepmind_blog",publisher:"Google DeepMind",sourceType:"company_announcement",feedUrl:"https://deepmind.google/blog/rss.xml",articleHosts:["deepmind.google"],enabled:true },
  { id:"techcrunch_ai",publisher:"TechCrunch",sourceType:"independent_reporting",feedUrl:"https://techcrunch.com/category/artificial-intelligence/feed/",articleHosts:["techcrunch.com","www.techcrunch.com"],enabled:true,preserveFeedMetadata:true },
  { id:"mit_technology_review_ai",publisher:"MIT Technology Review",sourceType:"independent_reporting",feedUrl:"https://www.technologyreview.com/topic/artificial-intelligence/feed",articleHosts:["www.technologyreview.com","technologyreview.com"],enabled:false,reason:"access_and_reuse_review" },
  { id:"anthropic_newsroom",publisher:"Anthropic",sourceType:"company_announcement",feedUrl:null,articleHosts:["www.anthropic.com","anthropic.com"],enabled:false,reason:"no_verified_official_feed" },
]);
export const ENABLED_NEWS_FEEDS = Object.freeze(NEWS_FEEDS.filter(s => s.enabled));
export const NEWS_SNAPSHOT_SCHEMA = "news-snapshot-v1";
