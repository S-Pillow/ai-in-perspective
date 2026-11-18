import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mkdtemp, readFile, writeFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildReviewReport } from "../scripts/news/review-report.mjs";
import {NEWS_FEEDS,ENABLED_NEWS_FEEDS} from "../src/data/newsFeeds.mjs";
import {parseFeedXml,parseDate,safeArticleUrl,normalizeArticle,validateSnapshot,mergeSnapshot,newEmptySnapshot,sortArticles,MAX_FEED_BYTES} from "../scripts/news/feed-core.mjs";
import {collectOneFeed,collectAll,runCli} from "../scripts/news/collect.mjs";
import {getVisibleFeedArticles,canonicalArticleLink,formatSnapshotTimeUtc} from "../src/data/newsPresentation.mjs";
import {NEWS_STORIES} from "../src/data/newsEditorial.mjs";
const MIT=NEWS_FEEDS.find(s=>s.id==="mit_news_ai"),ARXIV=NEWS_FEEDS.find(s=>s.id==="arxiv_cs_ai"),OPENAI=NEWS_FEEDS.find(s=>s.id==="openai_news");
const NOW="2026-11-16T14:00:00.000Z";
const RSS='<?xml version="1.0"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><item><title>New AI &amp; research</title><link>https://news.mit.edu/2026/test?utm_source=rss&amp;id=1</link><pubDate>Mon, 16 Nov 2026 09:00:00 -0500</pubDate></item><item><title><![CDATA[Another discovery]]></title><link>https://news.mit.edu/2026/another</link></item></channel></rss>';
const ATOM='<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><entry><title>A new model</title><link rel="self" href="https://openai.com/news/feed"/><link rel="alternate" type="text/html" href="https://openai.com/index/new-model?utm_medium=rss&amp;ref=a"/><published>2026-11-16T10:00:00Z</published></entry></feed>';
const a=(source=MIT,link="https://news.mit.edu/2026/test",title="A legitimate paper",time=NOW)=>normalizeArticle({title,link,published:time},source,NOW);
const resp=(body,{status=200,type="application/rss+xml",headers={}}={})=>new Response(body,{status,headers:{"content-type":type,...headers}});
const fake=reply=>async()=>reply;
test("source allowlist keeps Anthropic and MIT Technology Review disabled",()=>{
  assert.equal(NEWS_FEEDS.length,8);assert.equal(ENABLED_NEWS_FEEDS.length,6);
  assert.equal(NEWS_FEEDS.find(s=>s.id==='techcrunch_ai').enabled,true);
  assert.equal(NEWS_FEEDS.find(s=>s.id==="anthropic_newsroom").enabled,false);
  assert.equal(NEWS_FEEDS.find(s=>s.id==="mit_technology_review_ai").enabled,false);
  for(const s of ENABLED_NEWS_FEEDS){assert.ok(s.feedUrl.startsWith("https://"));assert.ok(s.articleHosts.length);}
});
test("RSS 2.0 parses entities, dates, CDATA and legitimate empty feeds",()=>{
  const p=parseFeedXml(RSS);
  assert.equal(p.kind,"rss");assert.equal(p.entries.length,2);
  assert.equal(p.entries[0].title,"New AI & research");
  assert.equal(p.entries[0].link,"https://news.mit.edu/2026/test?utm_source=rss&id=1");
  assert.equal(parseDate(p.entries[0].published),NOW);
  assert.equal(p.entries[1].title,"Another discovery");
  assert.equal(parseFeedXml("<rss><channel><title>Quiet today</title></channel></rss>").entries.length,0);
});
test("Atom chooses alternate HTML link over self link",()=>{
  const p=parseFeedXml(ATOM);assert.equal(p.kind,"atom");
  assert.equal(p.entries[0].link,"https://openai.com/index/new-model?utm_medium=rss&ref=a");
  assert.equal(parseFeedXml("<feed xmlns='http://www.w3.org/2005/Atom'></feed>").entries.length,0);
});
test("unsupported, malformed, DTD, entity bomb and giant XML all fail closed",()=>{
  for(const xml of ["<rss><channel><item></channel></rss>","<html>Wrong response</html>","<!DOCTYPE rss [ <!ENTITY x 'boom'> ]><rss><channel/></rss>","<rss><channel />"," ", "x".repeat(MAX_FEED_BYTES+1)]) assert.throws(()=>parseFeedXml(xml));
});
test("normalizer keeps unknown dates unknown, attributes company and preprint evidence",()=>{
  const paper=normalizeArticle({title:"A preprint",link:"https://arxiv.org/abs/2611.01234",published:""},ARXIV,NOW);
  assert.equal(paper.publishedAt,null);assert.equal(paper.firstSeenAt,NOW);assert.equal(paper.evidenceStatus,"preprint");assert.equal(paper.lens,null);
  const firm=normalizeArticle({title:"Product note",link:"https://openai.com/news/sample"},OPENAI,NOW);
  assert.equal(firm.evidenceStatus,"attributed_primary_source");
  assert.throws(()=>normalizeArticle({title:"From 2099",link:"https://news.mit.edu/2026/sample",published:"2099-01-01T00:00:00Z"},MIT,NOW),/future_article_date/);
});
test("unsafe links, credentials, tracking trickery and markup are blocked or normalized",()=>{
  for(const link of ["http://news.mit.edu/2026/x","https://news.mit.edu.evil.org/x","https://user:pass@news.mit.edu/x","https://news.mit.edu:444/x","javascript:alert(1)","https://127.0.0.1/x"]) assert.throws(()=>safeArticleUrl(link,MIT));
  for(const title of ["","<script>alert(1)</script>","x".repeat(300)]) assert.throws(()=>normalizeArticle({title,link:"https://news.mit.edu/x"},MIT,NOW));
  assert.equal(a(MIT,"https://news.mit.edu/2026/test?utm_source=a&id=7").id,a(MIT,"https://news.mit.edu/2026/test?id=7#fragment").id);
  assert.equal(sortArticles([a(),a(),a(MIT,"https://news.mit.edu/2026/second")]).length,2);
});
test("saved snapshot checks fail for fake publisher, duplicate id, untrusted URL and unsupported version",()=>{
  const valid={...newEmptySnapshot(),publishedAt:NOW,articles:[a()]};assert.equal(validateSnapshot(valid),valid);
  assert.throws(()=>validateSnapshot({...valid,schemaVersion:"v0"}));
  assert.throws(()=>validateSnapshot({...valid,articles:[a(),a()]}));
  assert.throws(()=>validateSnapshot({...valid,articles:[{...a(),publisher:"Someone else"}]}));
  assert.throws(()=>validateSnapshot({...valid,articles:[{...a(),url:"https://bad.example/"}]}));
  assert.throws(()=>validateSnapshot({...valid,featuredArticleId:"not_here"}));
});
test("all-source failure retains prior snapshot with unchanged publication time",()=>{
  const old={...newEmptySnapshot(),publishedAt:NOW,articles:[a()]};
  const ob=ENABLED_NEWS_FEEDS.map(s=>({sourceId:s.id,state:"degraded",articles:[]}));
  const r=mergeSnapshot(old,ob,"2026-11-17T10:00:00Z");
  assert.equal(r.state,"retain_previous");assert.equal(r.snapshot,old);assert.equal(r.snapshot.publishedAt,NOW);
});
test("empty arXiv day does not erase prior articles or force an update",()=>{
  const paper=normalizeArticle({title:"Previous preprint",link:"https://arxiv.org/abs/2611.12345",published:"2026-11-15T10:00:00Z"},ARXIV,NOW);
  const old={...newEmptySnapshot(),publishedAt:NOW,articles:[paper]};
  const ob=ENABLED_NEWS_FEEDS.map(s=>({sourceId:s.id,state:s.id===ARXIV.id?"empty":"degraded",articles:[]}));
  const r=mergeSnapshot(old,ob,"2026-11-17T10:00:00Z");
  assert.equal(r.state,"unchanged");assert.equal(r.snapshot,old);
  assert.equal(r.statuses.find(s=>s.sourceId===ARXIV.id).state,"empty");
});
test("partial success keeps prior failed-source rows and records new claims as unreviewed",()=>{
  const old={...newEmptySnapshot(),publishedAt:NOW,articles:[a()]};
  const ob=ENABLED_NEWS_FEEDS.map(s=>({sourceId:s.id,state:s.id===OPENAI.id?"ok":"degraded",articles:s.id===OPENAI.id?[{title:"A launch",link:"https://openai.com/news/launch",published:"2026-11-17T08:00:00Z"}]:[]}));
  const r=mergeSnapshot(old,ob,"2026-11-17T10:00:00Z");
  assert.equal(r.state,"changed");assert.equal(r.snapshot.articles.length,2);
  assert.equal(r.snapshot.articles.find(x=>x.sourceId===MIT.id).firstSeenAt,NOW);
  assert.equal(r.snapshot.articles.find(x=>x.sourceId===OPENAI.id).evidenceStatus,"attributed_primary_source");
});
test("successful identical collection is a no-op, including the unchanged snapshot date",()=>{
  const original=a(),old={...newEmptySnapshot(),publishedAt:NOW,articles:[original]};
  const ob=ENABLED_NEWS_FEEDS.map(s=>({sourceId:s.id,state:s.id===MIT.id?"ok":"degraded",articles:s.id===MIT.id?[{title:original.title,link:original.url,published:original.publishedAt}]:[]}));
  const r=mergeSnapshot(old,ob,"2026-11-17T10:00:00Z");
  assert.equal(r.state,"unchanged");assert.equal(r.snapshot,old);
});
test("reviewed labels and first-seen date survive re-fetch of one identified story",()=>{
  const oldArticle={...a(),lens:"AI Doing Good",editorialNote:"Human-reviewed"};
  const old={...newEmptySnapshot(),publishedAt:NOW,featuredArticleId:oldArticle.id,articles:[oldArticle]};
  const ob=ENABLED_NEWS_FEEDS.map(s=>({sourceId:s.id,state:s.id===MIT.id?"ok":"degraded",articles:s.id===MIT.id?[{title:"Updated title",link:oldArticle.url,published:NOW}]:[]}));
  const r=mergeSnapshot(old,ob,"2026-11-17T10:00:00Z");
  assert.equal(r.state,"changed");assert.equal(r.snapshot.featuredArticleId,oldArticle.id);
  assert.equal(r.snapshot.articles[0].lens,"AI Doing Good");assert.equal(r.snapshot.articles[0].firstSeenAt,NOW);
});
test("bounded fetch reads RSS and treats HTML, redirects, HTTP errors and oversize as degraded",async()=>{
  assert.equal((await collectOneFeed(MIT,{fetchImpl:fake(resp(RSS))})).state,"ok");
  assert.equal((await collectOneFeed(ARXIV,{fetchImpl:fake(resp("<rss><channel/></rss>"))})).state,"empty");
  for(const reply of [resp("No",{type:"text/html"}),resp("",{status:503}),resp("",{status:301,headers:{location:"http://attacker.example/"}}),resp("x".repeat(MAX_FEED_BYTES+1))]){
    const r=await collectOneFeed(MIT,{fetchImpl:fake(reply)});assert.equal(r.state,"degraded");assert.ok(r.errorCode);
  }
});
test("collector returns per-source diagnostics, retains disabled sources and needs no live network in tests",async()=>{
  const fetchImpl=async url=>url.includes("news.mit.edu")?resp(RSS):resp("",{status:403});
  const r=await collectAll({fetchImpl,now:NOW,previous:newEmptySnapshot()});
  assert.equal(r.state,"changed");assert.equal(r.snapshot.articles.length,2);
  assert.equal(r.diagnostics.find(s=>s.sourceId==="anthropic_newsroom").state,"disabled");
  assert.equal(r.diagnostics.find(s=>s.sourceId==="openai_news").state,"degraded");
});
test("Astro uses a checked-in, validated snapshot and does not fetch publishers in visitors' browsers",()=>{
  const page=readFileSync(new URL("../src/pages/explore/news.astro",import.meta.url),"utf8");
  const fixture=JSON.parse(readFileSync(new URL("../src/data/news-snapshot.json",import.meta.url),"utf8"));
  assert.equal(validateSnapshot(fixture),fixture);assert.ok(fixture.articles.length<=40);
  for(const source of ENABLED_NEWS_FEEDS)assert.ok(fixture.articles.filter(a=>a.sourceId===source.id).length<=8);
  assert.ok(fixture.articles.every(a=>a.lens===null && a.editorialNote===null));
  assert.ok(fixture.articles.every(a=>a.publishedAt===null || a.publishedAt<=fixture.publishedAt));
  assert.match(page,/validateSnapshot\(savedNewsSnapshot\)/);assert.match(page,/latestArticles\.map/);
  assert.match(page,/no automatically assigned editorial perspective/);
  assert.match(page,/Date not provided/);assert.doesNotMatch(page,/\bfetch\s*\(/);
  assert.match(page,/ENABLED_NEWS_FEEDS/);
  assert.match(page,/getVisibleFeedArticles/);
});

test("read-only snapshot export rejects --write combinations before network access", async()=>{
  await assert.rejects(()=>runCli(["--preview-json","--write"]),/usage:/);
  await assert.rejects(()=>runCli(["--dry-run","--write"]),/usage:/);
});


test("AIIP-NEWS-04B curated items are not duplicated in the balanced visible source feed",()=>{
  const snapshot=JSON.parse(readFileSync(new URL("../src/data/news-snapshot.json",import.meta.url),"utf8"));
  const visible=getVisibleFeedArticles(snapshot.articles,ENABLED_NEWS_FEEDS,NEWS_STORIES,16);
  const curatedUrls=new Set(NEWS_STORIES.map(x=>canonicalArticleLink(x.url)));
  const eligible=snapshot.articles.filter(x=>!curatedUrls.has(canonicalArticleLink(x.url)));
  assert.equal(visible.length,Math.min(16,new Set(eligible.map(x=>canonicalArticleLink(x.url))).size),"show real available unique links up to sixteen");
  assert.ok(visible.every(x=>!curatedUrls.has(canonicalArticleLink(x.url))),"no repeated curated links");
  assert.equal(new Set(visible.map(x=>x.id)).size,visible.length,"unique visible article IDs");
  const synthetic=ENABLED_NEWS_FEEDS.flatMap(source=>Array.from({length:8},(_,i)=>a(source,"https://"+source.articleHosts[0]+"/test-fixture-"+i)));
  const duplicate=synthetic[0];
  const selected=getVisibleFeedArticles(synthetic,ENABLED_NEWS_FEEDS,[{url:duplicate.url}],16);
  assert.equal(selected.length,16);
  assert.ok(selected.every(x=>x.id!==duplicate.id));
  assert.equal(new Set(selected.slice(0,6).map(x=>x.sourceId)).size,6,"first rotation stays balanced");
  assert.equal(getVisibleFeedArticles(snapshot.articles,ENABLED_NEWS_FEEDS,NEWS_STORIES,0).length,0);
  assert.equal(canonicalArticleLink("https://news.mit.edu/2026/test?utm_source=rss&id=2#headline"),
    canonicalArticleLink("https://news.mit.edu/2026/test?id=2"));
});

test("AIIP-NEWS-04B news layout is compact and snapshot date shows an explicit UTC time",()=>{
  const page=readFileSync(new URL("../src/pages/explore/news.astro",import.meta.url),"utf8");
  const css=readFileSync(new URL("../src/styles/news-room.css",import.meta.url),"utf8");
  const stamp=formatSnapshotTimeUtc("2026-11-17T02:59:19.913Z");
  assert.match(stamp,/Nov 17, 2026/);
  assert.match(stamp,/2:59 AM/);
  assert.match(stamp,/UTC/);
  assert.equal(formatSnapshotTimeUtc(null),null);
  assert.match(page,/href="#source-feed">Browse source links/);
  assert.match(page,/datetime=\{feedSnapshot.publishedAt \?\? undefined\}/);
  assert.match(page,/formatSnapshotTimeUtc\(feedSnapshot.publishedAt\)/);
  assert.match(css,/\.nr-lead\{[^}]*align-self:start/);
  assert.match(css,/\.nr-stack\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css,/\.nr-stories h2,[^{]*\{[^}]*"DM Sans"/);
  assert.match(css,/\.nr-feed h2\{[^}]*"DM Sans"/);
  assert.match(css,/@media\(max-width:1100px\)/);
  assert.match(css,/@media\(max-width:620px\)/);
  assert.match(css,/\.nr-lead h3\{font:600[^}]*"DM Sans"/);
  assert.match(css,/\.nr-item h3\{font:600[^}]*"DM Sans"/);
});


test("AIIP-NEWS-04C owner retention policy keeps dated older news visible until displaced",()=>{
  const snapshot=JSON.parse(readFileSync(new URL("../src/data/news-snapshot.json",import.meta.url),"utf8"));
  const aged=snapshot.articles.map(article=>({...article,publishedAt:"2019-01-01T00:00:00.000Z"}));
  const selected=getVisibleFeedArticles(aged,ENABLED_NEWS_FEEDS,NEWS_STORIES,16);
  assert.equal(selected.length,getVisibleFeedArticles(snapshot.articles,ENABLED_NEWS_FEEDS,NEWS_STORIES,16).length,"do not shrink the feed merely because articles are older than seven days");
  assert.ok(selected.every(article=>article.publishedAt==="2019-01-01T00:00:00.000Z"));
  assert.ok(snapshot.articles.length<=40,"retention buffer cap unchanged");
  const page=readFileSync(new URL("../src/pages/explore/news.astro",import.meta.url),"utf8");
  assert.match(page,/Articles from across the sources\./,"the section does not promise a date-limited recent feed");
  assert.match(page,/formatDate\(article.publishedAt.slice\(0,10\)\)/,"preserve original publication dates");
});


test("daily review write, no-op and complete failure use an isolated atomic snapshot", async()=>{
  const dir=await mkdtemp(join(tmpdir(),"aiip-news-review-"));
  try{
    const path=join(dir,"snapshot.json");
    const start=JSON.stringify(newEmptySnapshot(),null,2)+"\n";
    await writeFile(path,start);
    const options={snapshotPath:path,fetchImpl:async url=>url.includes("news.mit.edu")?resp(RSS):resp("",{status:503}),now:NOW,stdout:{write(){}}};
    const changed=await runCli(["--write"],options);
    assert.equal(changed.state,"changed");
    const next=await readFile(path,"utf8");
    assert.notEqual(next,start);assert.equal(JSON.parse(next).articles.length,2);
    const inputs={previousText:start,candidateText:next,diagnostics:changed,baseSha:"a".repeat(40),runUrl:"https://github.com/S-Pillow/ai-in-perspective/actions/runs/1"};
    const report=buildReviewReport(inputs);
    assert.equal(report.state,"changed");
    assert.match(report.body,/Validated candidate. Production delivery is checked separately/);
    assert.match(report.body,/Proposed snapshot/);
    const before=await stat(path);
    const unchanged=await runCli(["--write"],{...options,now:"2026-11-17T14:00:00.000Z"});
    assert.equal(unchanged.state,"unchanged");
    assert.equal(await readFile(path,"utf8"),next);
    assert.equal((await stat(path)).mtimeMs,before.mtimeMs);
    const failure=await runCli(["--write"],{...options,fetchImpl:async()=>resp("",{status:503}),now:"2026-11-18T14:00:00.000Z"});
    assert.equal(failure.state,"retain_previous");
    assert.equal(await readFile(path,"utf8"),next);
    const retained=buildReviewReport({...inputs,previousText:next,diagnostics:failure});
    assert.doesNotMatch(retained.body,/Proposed snapshot/);
    assert.match(retained.body,/retained byte-for-byte/);
    assert.throws(()=>buildReviewReport({...inputs,previousText:start,diagnostics:failure}),/collection_count_mismatch|no_op_modified_snapshot/);
  }finally{await rm(dir,{recursive:true,force:true});}
});

test("daily review rejects per-publisher overflow and automatic editorial fields",()=>{
  const entries=Array.from({length:9},(_,i)=>a(MIT,"https://news.mit.edu/test-"+i));
  assert.throws(()=>validateSnapshot({...newEmptySnapshot(),publishedAt:NOW,articles:entries}),/source_limit/);
  const original={...newEmptySnapshot(),publishedAt:NOW,articles:[a()]};
  const malformed={...original,articles:[{...original.articles[0],editorialNote:"injected"}]};
  const diagnostics={mode:"local_write_only",state:"changed",previousCount:0,nextCount:1,snapshotPublishedAt:NOW,sources:NEWS_FEEDS.map(s=>({sourceId:s.id,state:s.enabled?"ok":"disabled",entries:s.enabled?1:0}))};
  assert.throws(()=>buildReviewReport({previousText:JSON.stringify(newEmptySnapshot()),candidateText:JSON.stringify(malformed),diagnostics,baseSha:"a".repeat(40),runUrl:"https://github.com/S-Pillow/ai-in-perspective/actions/runs/1"}),/automated_editorial_metadata/);
});


test("AIIP-NEWS-06B six-source retention is balanced within forty and preserves failed sources",()=>{
  const enabled=ENABLED_NEWS_FEEDS;
  const observations=enabled.map(s=>({sourceId:s.id,state:"ok",articles:Array.from({length:8},(_,i)=>({title:"Story "+i,link:"https://"+s.articleHosts[0]+"/article-"+i,published:NOW}))}));
  const initial=mergeSnapshot(newEmptySnapshot(),observations,NOW);
  assert.equal(initial.snapshot.articles.length,40);
  const sizes=enabled.map(s=>initial.snapshot.articles.filter(a=>a.sourceId===s.id).length);
  assert.ok(sizes.every(n=>n>=6&&n<=7));
  assert.equal(mergeSnapshot(initial.snapshot,observations,"2026-11-17T14:00:00.000Z").state,"unchanged");
  const failure=observations.map(o=>o.sourceId===MIT.id?{...o,state:"degraded",articles:[]}:o);
  const merged=mergeSnapshot(initial.snapshot,failure,"2026-11-18T14:00:00.000Z");
  assert.deepEqual(merged.snapshot.articles.filter(a=>a.sourceId===MIT.id),initial.snapshot.articles.filter(a=>a.sourceId===MIT.id));
  const tech=enabled.find(s=>s.id==="techcrunch_ai");
  const url="https://techcrunch.com/2026/11/16/story/?utm_source=feed&b=2&a=1";
  assert.equal(normalizeArticle({title:"Original TechCrunch headline",link:url,published:NOW},tech,NOW).url,url);
  assert.equal(safeArticleUrl(url,tech),url);
  assert.throws(()=>normalizeArticle({title:"Editorial  alteration",link:url},tech,NOW),/invalid_article_title/);
  const verge=enabled.find(s=>s.id==="verge_ai"),vurl="https://www.theverge.com/tech/123/story?utm_source=rss";
  assert.equal(safeArticleUrl(vurl,verge),vurl);
});
