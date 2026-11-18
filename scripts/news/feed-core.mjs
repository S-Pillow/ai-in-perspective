/** AIIP-NEWS-04. Offline-safe RSS/Atom parsing, normalization and snapshot policy. */
import { createHash } from "node:crypto";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { NEWS_FEEDS, NEWS_SNAPSHOT_SCHEMA } from "../../src/data/newsFeeds.mjs";

export const MAX_FEED_BYTES = 3_000_000;
export const MAX_ARTICLES_PER_SOURCE = 8;
export const MAX_ARTICLES_TOTAL = 40;
const TRACKING = /^(utm_[a-z0-9_]+|fbclid|gclid|mc_cid|mc_eid)$/i;
const MAX_TITLE = 240;
const PARSER = new XMLParser({
  ignoreAttributes:false, attributeNamePrefix:"@_", textNodeName:"#text",
  parseTagValue:false, parseAttributeValue:false, trimValues:true,
  processEntities:true, allowBooleanAttributes:false,
});

export const sourceById = (id, sources=NEWS_FEEDS) => sources.find(s=>s.id===id) ?? null;
const asList = x => x===undefined || x===null ? [] : Array.isArray(x) ? x : [x];
const nodeText = x => {
  if(Array.isArray(x))return x.map(nodeText).filter(Boolean).join(" ");
  if(typeof x==="string" || typeof x==="number") return String(x);
  if(x && typeof x==="object" && x["#text"]!==undefined) return nodeText(x["#text"]);
  return "";
};
const scalar = (...values) => values.map(nodeText).find(x=>x.trim()) ?? "";
export function parseDate(input) {
  if(typeof input!=="string" || !input.trim()) return null;
  const value=Date.parse(input);
  if(!Number.isFinite(value)) return null;
  if(/^\d{4}-\d{2}-\d{2}$/.test(input.trim()) && new Date(value).toISOString().slice(0,10)!==input.trim())return null;
  const year=new Date(value).getUTCFullYear();
  if(year<1990 || year>2100) return null;
  return new Date(value).toISOString();
}
const withoutMarkup = raw => {
  const value = String(raw??"").replace(/[\u0000-\u001f\u007f]/g," ").replace(/\s+/g," ").trim();
  if(!value || value.length>MAX_TITLE || /<[^>]*>/.test(value)) return null;
  return value;
};
export function safeArticleUrl(raw, source) {
  if(!source || typeof raw!=="string") throw new Error("invalid_article_url");
  let url;
  try{url=new URL(raw);}catch{throw new Error("invalid_article_url");}
  if(url.protocol!=="https:" || url.username || url.password || url.port ||
     !source.articleHosts.includes(url.hostname.toLowerCase())) throw new Error("forbidden_article_url");
  url.hash="";
  for(const key of [...url.searchParams.keys()]) if(TRACKING.test(key)) url.searchParams.delete(key);
  url.searchParams.sort();
  return url.toString();
}
export function parseFeedXml(xml) {
  if(typeof xml!=="string" || !xml.trim() || Buffer.byteLength(xml,"utf8")>MAX_FEED_BYTES) throw new Error("invalid_feed_size");
  if(/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(xml)) throw new Error("forbidden_xml_declaration");
  if(XMLValidator.validate(xml)!==true) throw new Error("malformed_xml");
  let doc;
  try{doc=PARSER.parse(xml);}catch{throw new Error("malformed_xml");}
  if(doc.rss && Object.prototype.hasOwnProperty.call(doc.rss,"channel")){
    const channel=doc.rss.channel && typeof doc.rss.channel==="object" ? doc.rss.channel : {};
    return {kind:"rss",entries:asList(channel.item).map(item=>({
      title:scalar(item?.title), link:scalar(item?.link),
      published:scalar(item?.pubDate,item?.["dc:date"],item?.published),
      updated:scalar(item?.["atom:updated"],item?.updated),
    }))};
  }
  const feed=doc.feed && typeof doc.feed==="object" ? doc.feed : {};
  if(Object.prototype.hasOwnProperty.call(doc,"feed")){
    return {kind:"atom",entries:asList(feed.entry).map(entry=>{
      const links=asList(entry?.link);
      const link=links.find(v=>typeof v==="object" && (!v["@_rel"] || v["@_rel"]==="alternate") &&
        (v["@_type"]===undefined || v["@_type"]==="text/html") && typeof v["@_href"]==="string");
      return {title:scalar(entry?.title),
        link:link?.["@_href"] ?? scalar(entry?.link),
        published:scalar(entry?.published,entry?.updated),
        updated:scalar(entry?.updated)};
    })};
  }
  throw new Error("unsupported_xml_feed");
}
export function normalizeArticle(raw, source, observedAt, previous=null) {
  const title=withoutMarkup(raw?.title);
  if(!title) throw new Error("invalid_article_title");
  const url=safeArticleUrl(raw?.link,source);
  const id="news_"+createHash("sha256").update(source.id+"|"+url).digest("hex").slice(0,24);
  const now=parseDate(observedAt);
  if(!now) throw new Error("invalid_observed_date");
  const publishedAt=parseDate(raw.published);
  const updatedAt=parseDate(raw.updated);
  // Unknown dates remain unknown. A future publication date is suspicious, not "breaking".
  const future=Date.parse(now)+48*3600*1000;
  if(publishedAt && Date.parse(publishedAt)>future) throw new Error("future_article_date");
  return {
    id,sourceId:source.id,publisher:source.publisher,sourceType:source.sourceType,title,url,
    publishedAt,updatedAt,
    firstSeenAt:previous?.firstSeenAt ?? now,
    lens:previous?.lens ?? null,
    evidenceStatus:previous?.evidenceStatus ?? (source.sourceType==="preprint"?"preprint":source.sourceType==="company_announcement"?"attributed_primary_source":"unreviewed"),
    editorialNote:previous?.editorialNote ?? null,
  };
}
export function sortArticles(articles) {
  const seen=new Set();
  return articles.filter(a=>{if(seen.has(a.id))return false;seen.add(a.id);return true;})
    .sort((a,b)=>(b.publishedAt??"").localeCompare(a.publishedAt??"") || a.id.localeCompare(b.id));
}
export function validateSnapshot(snapshot, sources=NEWS_FEEDS) {
  if(!snapshot || typeof snapshot!=="object" || Array.isArray(snapshot) ||
    snapshot.schemaVersion!==NEWS_SNAPSHOT_SCHEMA) throw new Error("invalid_snapshot_schema");
  if(snapshot.publishedAt!==null && parseDate(snapshot.publishedAt)!==snapshot.publishedAt) throw new Error("invalid_snapshot_date");
  if(!Array.isArray(snapshot.articles) || snapshot.articles.length>MAX_ARTICLES_TOTAL ||
     !Array.isArray(snapshot.sourceStatuses)) throw new Error("invalid_snapshot_arrays");
  const ids=new Set(),statusIds=new Set(),perSourceCount=new Map();
  for(const article of snapshot.articles){
    const source=sourceById(article?.sourceId,sources);
    if(!source || !source.enabled || source.publisher!==article.publisher || source.sourceType!==article.sourceType ||
      typeof article.id!=="string" || ids.has(article.id) ||
      !article.id.startsWith("news_") || typeof article.title!=="string" ||
      withoutMarkup(article.title)!==article.title) throw new Error("invalid_snapshot_article");
    ids.add(article.id);
    perSourceCount.set(source.id,(perSourceCount.get(source.id)??0)+1);
    if(perSourceCount.get(source.id)>MAX_ARTICLES_PER_SOURCE) throw new Error("invalid_snapshot_source_limit");
    if(safeArticleUrl(article.url,source)!==article.url) throw new Error("invalid_snapshot_article_url");
    const stableId="news_"+createHash("sha256").update(source.id+"|"+article.url).digest("hex").slice(0,24);
    if(stableId!==article.id) throw new Error("invalid_snapshot_article_id");
    for(const field of ["publishedAt","updatedAt"]){
      if(article[field]!==null && parseDate(article[field])!==article[field])throw new Error("invalid_snapshot_article_date");
    }
    if(parseDate(article.firstSeenAt)!==article.firstSeenAt ||
      (article.lens!==null && typeof article.lens!=="string") ||
      (article.editorialNote!==null && (typeof article.editorialNote!=="string" || /<[^>]*>/.test(article.editorialNote))) ||
      !["preprint","unreviewed","attributed_primary_source","independent_reporting","corroborated"].includes(article.evidenceStatus)) throw new Error("invalid_snapshot_metadata");
  }
  for(const st of snapshot.sourceStatuses){
    if(!sourceById(st?.sourceId,sources) || statusIds.has(st.sourceId) ||
      !["ok","empty","degraded","disabled"].includes(st.state) ||
      (st.lastSuccessfulAt!==null && parseDate(st.lastSuccessfulAt)!==st.lastSuccessfulAt)) throw new Error("invalid_snapshot_source_status");
    statusIds.add(st.sourceId);
  }
  if(snapshot.featuredArticleId!==null && !ids.has(snapshot.featuredArticleId))throw new Error("invalid_featured_id");
  return snapshot;
}
export function newEmptySnapshot(){
  return {schemaVersion:NEWS_SNAPSHOT_SCHEMA,publishedAt:null,featuredArticleId:null,sourceStatuses:[],articles:[]};
}
const signature = arts => JSON.stringify(sortArticles(arts).map(x=>({
  id:x.id,sourceId:x.sourceId,publisher:x.publisher,sourceType:x.sourceType,
  title:x.title,url:x.url,publishedAt:x.publishedAt,updatedAt:x.updatedAt,
  lens:x.lens,evidenceStatus:x.evidenceStatus,editorialNote:x.editorialNote,
})));
/** Partial failures and empty feeds retain previous articles. No content change => no file write. */
export function mergeSnapshot(previous, observations, at, sources=NEWS_FEEDS) {
  const old=validateSnapshot(previous??newEmptySnapshot(),sources);
  const date=parseDate(at);
  if(!date)throw new Error("invalid_collection_date");
  const perSource=new Map();
  const statuses=[];
  let successful=0;
  for(const source of sources){
    const observation=observations.find(o=>o.sourceId===source.id);
    const past=old.sourceStatuses.find(s=>s.sourceId===source.id);
    if(!source.enabled){
      statuses.push({sourceId:source.id,state:"disabled",lastSuccessfulAt:past?.lastSuccessfulAt??null});
      continue;
    }
    if(!observation || !["ok","empty","degraded"].includes(observation.state)) throw new Error("invalid_observation");
    const success=observation.state==="ok" || observation.state==="empty";
    if(success)successful++;
    const state=observation.state;
    statuses.push({sourceId:source.id,state,lastSuccessfulAt:success?date:past?.lastSuccessfulAt??null});
    if(!success) continue;
    if(!Array.isArray(observation.articles))throw new Error("invalid_observation_articles");
    const originals=old.articles.filter(a=>a.sourceId===source.id);
    const originalById=new Map(originals.map(a=>[a.id,a]));
    const converted=[];
    for(const entry of observation.articles){
      try{
        const url=safeArticleUrl(entry.link,source);
        const id="news_"+createHash("sha256").update(source.id+"|"+url).digest("hex").slice(0,24);
        converted.push(normalizeArticle(entry,source,date,originalById.get(id)));
      }catch{ /* A bad article is isolated and counted by the collector. */ }
    }
    perSource.set(source.id,sortArticles([...converted,...originals]).slice(0,MAX_ARTICLES_PER_SOURCE));
  }
  if(!successful) return {state:"retain_previous",snapshot:old,statuses};
  const previousBySource=new Map(sources.map(s=>[s.id,old.articles.filter(a=>a.sourceId===s.id)]));
  const merged=[];
  for(const source of sources){
    if(!source.enabled) continue;
    merged.push(...(perSource.get(source.id)??previousBySource.get(source.id)).slice(0,MAX_ARTICLES_PER_SOURCE));
  }
  const articles=sortArticles(merged).slice(0,MAX_ARTICLES_TOTAL);
  if(signature(old.articles)===signature(articles)) return {state:"unchanged",snapshot:old,statuses};
  const next={
    schemaVersion:NEWS_SNAPSHOT_SCHEMA,publishedAt:date,
    featuredArticleId:old.featuredArticleId && articles.some(x=>x.id===old.featuredArticleId)?old.featuredArticleId:null,
    sourceStatuses:statuses,articles,
  };
  return {state:"changed",snapshot:validateSnapshot(next,sources),statuses};
}
