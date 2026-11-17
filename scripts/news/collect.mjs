#!/usr/bin/env node
/**
 * AIIP-NEWS-04 manual collection CLI.
 * Read-only --dry-run by default; --write only writes an on-disk JSON snapshot.
 * It never commits, deploys, schedules, publishes to a remote API, or changes main.
 */
import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { NEWS_FEEDS } from "../../src/data/newsFeeds.mjs";
import {
  MAX_FEED_BYTES, parseFeedXml, mergeSnapshot, validateSnapshot, newEmptySnapshot,
} from "./feed-core.mjs";

const SNAPSHOT_PATH=resolve(fileURLToPath(new URL("../../src/data/news-snapshot.json",import.meta.url)));
const ALLOWED_TYPES=/^(application\/(rss\+xml|atom\+xml|xml)|text\/xml|text\/plain)(?:\s*;|$)/i;
const LIMIT_MS=9000;
const MAX_ENTRIES=3000;
function diagnostic(err){
  const message=String(err?.message??err);
  if(/oversized|too_large/.test(message))return "size_limit";
  if(/timeout|abort/i.test(message))return "timeout";
  if(/redirect/.test(message))return "redirect_rejected";
  if(/content_type/.test(message))return "content_type";
  if(/xml|feed/.test(message))return "invalid_xml";
  if(/http_status/.test(message))return "http_status";
  return "fetch_or_parse_failure";
}
async function cappedText(response){
  const len=Number(response.headers.get("content-length"));
  if(Number.isFinite(len)&&len>MAX_FEED_BYTES)throw new Error("size_limit");
  if(!response.body) throw new Error("empty_body");
  const reader=response.body.getReader();
  let bytes=0;const chunks=[];
  try{
    while(true){
      const {done,value}=await reader.read();
      if(done)break;
      bytes+=value.byteLength;
      if(bytes>MAX_FEED_BYTES) throw new Error("size_limit");
      chunks.push(value);
    }
  }finally{reader.releaseLock();}
  return new TextDecoder("utf-8",{fatal:true}).decode(Buffer.concat(chunks.map(x=>Buffer.from(x))));
}
export async function collectOneFeed(source,{fetchImpl=fetch,timeoutMs=LIMIT_MS}={}){
  if(!source.enabled || !source.feedUrl) return {sourceId:source.id,state:"disabled",articles:[],errorCode:"disabled"};
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{
    // Bounded redirects only among publisher-approved feed/article hosts; never to a new service.
    const allowedHosts=new Set([new URL(source.feedUrl).hostname,...source.articleHosts]);
    let target=source.feedUrl,response;
    for(let attempt=0;attempt<3;attempt++){
      response=await fetchImpl(target,{
        redirect:"manual",signal:controller.signal,
        headers:{Accept:"application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9",
          "User-Agent":"AIinPerspective-NewsResearch/0.2 (+https://ai-in-perspective.vercel.app)"},
      });
      if(response.status<300 || response.status>=400)break;
      if(![301,302,303,307,308].includes(response.status) || attempt===2)throw new Error("redirect_rejected");
      const location=response.headers.get("location");
      if(!location)throw new Error("redirect_rejected");
      let next;
      try{next=new URL(location,target);}catch{throw new Error("redirect_rejected");}
      if(next.protocol!=="https:" || next.username || next.password || next.port ||
         !allowedHosts.has(next.hostname))throw new Error("redirect_rejected");
      target=next.href;
    }
    if(!response || !response.ok)throw new Error("http_status");
    const type=response.headers.get("content-type")?.trim()??"";
    if(!ALLOWED_TYPES.test(type))throw new Error("content_type");
    const parsed=parseFeedXml(await cappedText(response));
    if(parsed.entries.length>MAX_ENTRIES)throw new Error("too_large_feed");
    return {sourceId:source.id,state:parsed.entries.length?"ok":"empty",articles:parsed.entries,format:parsed.kind};
  }catch(err){
    return {sourceId:source.id,state:"degraded",articles:[],errorCode:diagnostic(err)};
  }finally{clearTimeout(timer);}
}
export async function collectAll({fetchImpl=fetch,now=new Date().toISOString(),previous=newEmptySnapshot(),sources=NEWS_FEEDS}={}){
  validateSnapshot(previous,sources);
  const observations=[];
  for(const source of sources)observations.push(await collectOneFeed(source,{fetchImpl}));
  const result=mergeSnapshot(previous,observations,now,sources);
  return { ...result,
    diagnostics:observations.map(o=>({
      sourceId:o.sourceId,state:o.state,entries:o.articles.length,
      ...(o.errorCode?{errorCode:o.errorCode}:{}),
      ...(o.format?{format:o.format}:{}),
    })),
  };
}
export async function runCli(args=process.argv.slice(2)){
  if(args.some(s=>!["--dry-run","--write"].includes(s))||args.includes("--write")&&args.includes("--dry-run"))throw new Error("usage: node scripts/news/collect.mjs [--dry-run | --write]");
  const write=args.includes("--write");
  let previous;
  try{previous=JSON.parse(await readFile(SNAPSHOT_PATH,"utf8"));}
  catch(err){if(err.code!=="ENOENT")throw err;previous=newEmptySnapshot();}
  const result=await collectAll({previous});
  const output={mode:write?"local_write_only":"read_only",state:result.state,
    sources:result.diagnostics,previousCount:previous.articles.length,
    nextCount:result.snapshot.articles.length,
    snapshotPublishedAt:result.snapshot.publishedAt};
  if(write && result.state==="changed"){
    const temp=SNAPSHOT_PATH+".pending-"+process.pid;
    try{await writeFile(temp,JSON.stringify(result.snapshot,null,2)+"\n",{encoding:"utf8",flag:"wx"});
      await rename(temp,SNAPSHOT_PATH);
    }catch(err){await unlink(temp).catch(()=>{});throw err;}
  }
  process.stdout.write(JSON.stringify(output,null,2)+"\n");
  // Read-only probing must not fail a build because a third-party feed is offline.
  return output;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  runCli().catch(err=>{console.error("News feed collection failed:",diagnostic(err));process.exitCode=1;});
}
