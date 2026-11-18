/** Validated review report; no Git, API or publication capability. */
import { readFileSync, appendFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateSnapshot, MAX_ARTICLES_PER_SOURCE, MAX_ARTICLES_TOTAL } from "./feed-core.mjs";
import { NEWS_FEEDS, ENABLED_NEWS_FEEDS } from "../../src/data/newsFeeds.mjs";
import { NEWS_STORIES } from "../../src/data/newsEditorial.mjs";
import { getVisibleFeedArticles } from "../../src/data/newsPresentation.mjs";

const fingerprint = value => createHash("sha256").update(value).digest("hex");
const safeJson = value => JSON.stringify(value,null,2).replace(/[\x60@<>\u2028\u2029]/g, c=>"\\u"+c.charCodeAt(0).toString(16).padStart(4,"0"));
const articleKeys=["id","sourceId","publisher","sourceType","title","url","publishedAt","updatedAt","firstSeenAt","lens","evidenceStatus","editorialNote"].sort().join("|");
const states=new Set(["changed","unchanged","retain_previous"]);
const assert=(condition,message)=>{if(!condition)throw new Error(message);};

export function buildReviewReport({previousText,candidateText,diagnostics,baseSha,runUrl}){
  assert(/^[a-f0-9]{40}$/.test(baseSha),"invalid_review_base");
  assert(/^https:\/\/github\.com\/S-Pillow\/ai-in-perspective\/actions\/runs\/\d+$/.test(runUrl),"invalid_review_run_url");
  const previous=validateSnapshot(JSON.parse(previousText));
  const candidate=validateSnapshot(JSON.parse(candidateText));
  assert(diagnostics.mode==="local_write_only"&&states.has(diagnostics.state),"invalid_collection_result");
  assert(diagnostics.previousCount===previous.articles.length&&diagnostics.nextCount===candidate.articles.length,"collection_count_mismatch");
  assert(diagnostics.snapshotPublishedAt===candidate.publishedAt,"collection_date_mismatch");
  assert(Array.isArray(diagnostics.sources)&&diagnostics.sources.length===NEWS_FEEDS.length,"invalid_source_diagnostics");
  const bySource=new Map(diagnostics.sources.map(s=>[s.sourceId,s]));
  assert(bySource.size===NEWS_FEEDS.length,"duplicate_source_diagnostic");
  for(const source of NEWS_FEEDS){
    const result=bySource.get(source.id);
    assert(result&&["ok","empty","degraded","disabled"].includes(result.state)&&Number.isInteger(result.entries)&&result.entries>=0&&result.entries<=3000,"invalid_source_diagnostic");
    assert(source.enabled?result.state!=="disabled":result.state==="disabled","source_enablement_mismatch");
    if(result.state!=="ok")assert(result.entries===0,"unexpected_failed_source_entries");
    if(result.state==="degraded"||result.state==="empty"){
      const before=previous.articles.filter(a=>a.sourceId===source.id);
      const after=candidate.articles.filter(a=>a.sourceId===source.id);
      assert(JSON.stringify(before)===JSON.stringify(after),"failed_or_empty_source_lost_articles");
    }
  }
  for(const article of candidate.articles){
    assert(Object.keys(article).sort().join("|")===articleKeys,"unexpected_article_fields");
    assert(article.lens===null&&article.editorialNote===null,"automated_editorial_metadata");
    assert(!article.publishedAt||article.publishedAt<=candidate.publishedAt,"future_article_in_candidate");
  }
  assert(candidate.featuredArticleId===null,"unexpected_automatic_featured_selection");
  assert(candidate.articles.length<=MAX_ARTICLES_TOTAL,"candidate_total_limit");
  for(const source of ENABLED_NEWS_FEEDS)assert(candidate.articles.filter(a=>a.sourceId===source.id).length<=MAX_ARTICLES_PER_SOURCE,"candidate_source_limit");
  if(diagnostics.state==="changed"){
    assert(previousText!==candidateText&&previous.publishedAt!==candidate.publishedAt,"changed_without_new_snapshot");
    assert(fingerprint(JSON.stringify(previous.articles))!==fingerprint(JSON.stringify(candidate.articles)),"timestamp_only_change");
  }else assert(previousText===candidateText,"no_op_modified_snapshot");
  const visible=getVisibleFeedArticles(candidate.articles,ENABLED_NEWS_FEEDS,NEWS_STORIES,16);
  const priorIds=new Set(previous.articles.map(a=>a.id)),nextIds=new Set(candidate.articles.map(a=>a.id));
  const counts={before:previous.articles.length,after:candidate.articles.length,added:candidate.articles.filter(a=>!priorIds.has(a.id)).length,removed:previous.articles.filter(a=>!nextIds.has(a.id)).length,visible:visible.length};
  const sources=NEWS_FEEDS.map(s=>{
    const x=bySource.get(s.id);
    return {sourceId:s.id,state:x.state,entries:x.entries,retained:candidate.articles.filter(a=>a.sourceId===s.id).length};
  });
  const lines=["## Daily News review — "+diagnostics.state,"","**Review only. No production update.**","",
    "Run: "+runUrl+"  ","Base checkout SHA: "+baseSha+"  ","Snapshot SHA-256: "+fingerprint(candidateText)+"  ",
    "Result: "+counts.before+" → "+counts.after+" stored; "+counts.added+" new IDs; "+counts.removed+" displaced; "+counts.visible+" eligible visible links.",
    "Saved snapshot timestamp: "+(candidate.publishedAt??"none"),"",
    "| Source | Result | Received | Retained |","| --- | --- | ---: | ---: |",
    ...sources.map(s=>"| "+s.sourceId+" | "+s.state+" | "+s.entries+" | "+s.retained+" |"),""];
  if(diagnostics.state==="changed"){
    const fence=String.fromCharCode(96).repeat(3);
    lines.push("### Proposed snapshot (metadata only)","","Validate against current main, source rights, and current editorial rules before any release.","",
      fence+"json",safeJson(candidate),fence);
  }else lines.push("Published snapshot retained byte-for-byte. No candidate needs publication from this run.");
  const body=lines.join("\n")+"\n";
  assert(Buffer.byteLength(body,"utf8")<=60000,"review_comment_size_limit");
  return {body,state:diagnostics.state,counts,sources,sha256:fingerprint(candidateText)};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [previous,candidate,diagnostics,baseSha,runUrl]=process.argv.slice(2);
  const result=buildReviewReport({previousText:readFileSync(previous,"utf8"),candidateText:readFileSync(candidate,"utf8"),diagnostics:JSON.parse(readFileSync(diagnostics,"utf8")),baseSha,runUrl});
  appendFileSync(process.env.GITHUB_OUTPUT,"report="+Buffer.from(result.body,"utf8").toString("base64")+"\n");
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,result.body.split("### Proposed snapshot")[0]);
}
