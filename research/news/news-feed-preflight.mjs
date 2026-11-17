/** News research-only preflight. No RSS ingestion, publishing, or scheduled actions. */
import { createHash } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';

const SOURCES = Object.freeze({
  mit_news_ai: { name: 'MIT News', type: 'university', feed: 'https://news.mit.edu/rss/topic/artificial-intelligence2', hosts: ['news.mit.edu'] },
  arxiv_cs_ai: { name: 'arXiv', type: 'preprint', feed: 'https://rss.arxiv.org/rss/cs.AI', hosts: ['arxiv.org', 'www.arxiv.org'] },
  verge_ai: { name: 'The Verge', type: 'independent_reporting', feed: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', hosts: ['www.theverge.com', 'theverge.com'] },
  mit_technology_review_ai: { name: 'MIT Technology Review', type: 'independent_reporting', feed: 'https://www.technologyreview.com/topic/artificial-intelligence/feed', hosts: ['www.technologyreview.com', 'technologyreview.com'] },
  openai_news: { name: 'OpenAI', type: 'company_announcement', feed: 'https://openai.com/news/rss.xml', hosts: ['openai.com', 'www.openai.com'] },
  google_deepmind_blog: { name: 'Google DeepMind', type: 'company_announcement', feed: 'https://deepmind.google/blog/rss.xml', hosts: ['deepmind.google'] },
});

export function canonicalArticleUrl(sourceId, raw) {
  const source = SOURCES[sourceId];
  if (!source) throw new Error('unknown_source');
  let url;
  try { url = new URL(raw); } catch { throw new Error('invalid_url'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !source.hosts.includes(url.hostname)) throw new Error('forbidden_article_url');
  url.hash = '';
  for (const key of Array.from(url.searchParams.keys())) {
    if (/^utm_/i.test(key) || /^(fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
  }
  url.searchParams.sort();
  return url.href;
}

export function isoDateOrNull(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return null;
  const year = new Date(ms).getUTCFullYear();
  if (year < 1990 || year > 2100) return null;
  return new Date(ms).toISOString();
}

export function normalizeParsedEntry({ sourceId, title, link, published, updated }, observedAt) {
  const source = SOURCES[sourceId];
  if (!source) throw new Error('unknown_source');
  const text = typeof title === 'string' ? title.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (!text || text.length > 260 || /<[^>]*>/.test(text)) throw new Error('invalid_title');
  const url = canonicalArticleUrl(sourceId, link);
  const seen = isoDateOrNull(observedAt);
  if (!seen) throw new Error('invalid_observed_time');
  const id = 'news_' + createHash('sha256').update(sourceId + '|' + url).digest('hex').slice(0, 24);
  return {
    id, sourceId, publisher: source.name, sourceType: source.type, title: text, url,
    publishedAt: isoDateOrNull(published), updatedAt: isoDateOrNull(updated), firstSeenAt: seen,
    lens: null,
    evidenceStatus: source.type === 'preprint' ? 'preprint' : source.type === 'company_announcement' ? 'attributed_primary_source' : 'unreviewed',
    editorialNote: null,
  };
}

export function dedupeAndSort(entries) {
  const uniq = new Map();
  for (const item of entries) if (!uniq.has(item.id)) uniq.set(item.id, item);
  return Array.from(uniq.values()).sort((a,b) => {
    if (!a.publishedAt) return b.publishedAt ? 1 : a.id.localeCompare(b.id);
    if (!b.publishedAt) return -1;
    return b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id);
  });
}

export function decideSnapshot(previous, articles, completedAt, hadSuccessfulSource) {
  if (!hadSuccessfulSource) return { state: 'retain_previous', snapshot: previous ?? null };
  const next = dedupeAndSort(articles);
  if (previous && !next.length && previous.articles?.length) return { state: 'retain_previous', snapshot: previous };
  const signature = xs => JSON.stringify(xs.map(a => ({ id:a.id, title:a.title, publishedAt:a.publishedAt, url:a.url, lens:a.lens??null, evidenceStatus:a.evidenceStatus??null, editorialNote:a.editorialNote??null })));
  if (previous && signature(previous.articles) === signature(next)) return { state: 'unchanged', snapshot: previous };
  const now = isoDateOrNull(completedAt);
  if (!now) throw new Error('invalid_publication_time');
  return { state: 'changed', snapshot: { schemaVersion:'news-snapshot-v1', publishedAt:now, featuredArticleId:null, sourceStatuses:[], articles:next } };
}

export function inspectXmlEnvelope(bytes, contentType='application/xml') {
  const text = typeof bytes === 'string' ? bytes : Buffer.from(bytes).toString('utf8');
  if (!/\b(?:xml|rss|atom)\b|^text\/plain/i.test(contentType)) throw new Error('unexpected_content_type');
  if (Buffer.byteLength(text, 'utf8') > 2_000_000) throw new Error('oversized_feed');
  if (/<!\s*(?:DOCTYPE|ENTITY)\b/i.test(text)) throw new Error('xml_entity_declaration');
  const rss = /<rss\b[^>]*>/i.test(text) && /<channel\b/i.test(text);
  const atom = /<(?:[\w-]+:)?feed\b/i.test(text);
  if (!rss && !atom) throw new Error('unrecognized_feed_envelope');
  const marker = rss ? /<item(?:\s|>)/gi : /<(?:[\w-]+:)?entry(?:\s|>)/gi;
  const approximateEntries = (text.match(marker) || []).length;
  return { kind: rss ? 'rss' : 'atom', state: approximateEntries ? 'has_entries' : 'empty', approximateEntries };
}

// Live mode is intentionally opt-in, read-only, with fixed feed URLs and no redirects.
// This is HTTP/envelope reconnaissance, NOT XML parsing or publication clearance.
async function probeLive(sourceId) {
  const source = SOURCES[sourceId];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const resp = await fetch(source.feed, { redirect:'manual', signal:controller.signal,
      headers: { 'User-Agent':'AIinPerspective-SourceResearch/0.1', 'Accept':'application/rss+xml,application/atom+xml,application/xml,text/xml' } });
    if (!resp.ok) return { sourceId, state:'http_failure', status:resp.status };
    const reader = resp.body.getReader();
    const chunks=[];let size=0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size+=value.length;
      if (size>2_000_000) {await reader.cancel();throw new Error('oversized_feed');}
      chunks.push(value);
    }
    return { sourceId, state:'http_ok', status:resp.status, bytes:size,
      envelope:inspectXmlEnvelope(Buffer.concat(chunks),resp.headers.get('content-type')||'') };
  } catch (err) {return {sourceId,state:'probe_error',reason:err.name==='AbortError'?'timeout':err.message};}
  finally { clearTimeout(timer); }
}

if (process.argv.includes('--live')) {
  const results=[];
  for(const id of Object.keys(SOURCES)) results.push(await probeLive(id));
  console.log(JSON.stringify({ researchOnly:true, collectedAt:new Date().toISOString(), results },null,2));
}

// Synthetic unit cases never call the network.
test('fixed source policy blocks arbitrary IDs and unsafe article links',()=>{
  assert.throws(()=>canonicalArticleUrl('unknown','https://arxiv.org/abs/123'),/unknown_source/);
  for(const bad of ['http://arxiv.org/abs/1','https://127.0.0.1/','https://arxiv.org.evil.example/abs/1','https://user:pass@arxiv.org/abs/1','javascript:alert(1)'])
    assert.throws(()=>canonicalArticleUrl('arxiv_cs_ai',bad));
});
test('canonical URLs remove only tracking parameters and preserve meaningful query fields',()=>{
  assert.equal(canonicalArticleUrl('openai_news','https://openai.com/news/story?id=2&utm_source=x#part'), 'https://openai.com/news/story?id=2');
  assert.notEqual(canonicalArticleUrl('openai_news','https://openai.com/news/story?id=2'),canonicalArticleUrl('openai_news','https://openai.com/news/story?id=3'));
});
test('unknown and malformed dates are null, RFC and ISO dates normalize to UTC',()=>{
  assert.equal(isoDateOrNull(''),null); assert.equal(isoDateOrNull('nonsense'),null);
  assert.equal(isoDateOrNull('Mon, 16 Nov 2026 05:00:00 -0500'),'2026-11-16T10:00:00.000Z');
  assert.equal(isoDateOrNull('2026-11-16T10:00:00Z'),'2026-11-16T10:00:00.000Z');
});
test('normalized item carries attribution, source type, and no invented editorial labels',()=>{
  const item=normalizeParsedEntry({sourceId:'arxiv_cs_ai',title:'  A synthetic preprint  ',link:'https://arxiv.org/abs/2611.01234',published:null},'2026-11-16T12:00:00Z');
  assert.equal(item.publishedAt,null); assert.equal(item.sourceType,'preprint'); assert.equal(item.evidenceStatus,'preprint');
  assert.equal(item.lens,null); assert.equal(item.editorialNote,null); assert.ok(item.id.startsWith('news_'));
  const company=normalizeParsedEntry({sourceId:'openai_news',title:'Synthetic announcement',link:'https://openai.com/news/example'},'2026-11-16T12:00:00Z');
  assert.equal(company.evidenceStatus,'attributed_primary_source');
});
test('unsafe markup and empty titles are rejected before any UI rendering',()=>{
  for(const title of ['', ' <script>alert(1)</script> '])
    assert.throws(()=>normalizeParsedEntry({sourceId:'mit_news_ai',title,link:'https://news.mit.edu/2026/sample'},'2026-11-16T12:00:00Z'),/invalid_title/);
});
test('dedupe is stable within a publisher and does not combine different publishers',()=>{
  const base={title:'A shared story',published:'2026-11-16T09:00:00Z'};
  const mit=normalizeParsedEntry({...base,sourceId:'mit_news_ai',link:'https://news.mit.edu/2026/test?utm_source=abc'},'2026-11-16T10:00:00Z');
  const mitCopy=normalizeParsedEntry({...base,sourceId:'mit_news_ai',link:'https://news.mit.edu/2026/test'},'2026-11-16T11:00:00Z');
  const verge=normalizeParsedEntry({...base,sourceId:'verge_ai',link:'https://www.theverge.com/2026/11/16/test'},'2026-11-16T11:00:00Z');
  const out=dedupeAndSort([mit,verge,mitCopy]); assert.equal(out.length,2); assert.equal(mit.id,mitCopy.id); assert.notEqual(mit.id,verge.id);
});
test('failed or genuinely empty runs preserve last good snapshot, no-change runs do not change publishedAt',()=>{
  const old={schemaVersion:'news-snapshot-v1',publishedAt:'2026-11-16T10:00:00Z', articles:[{id:'old',title:'An old story',url:'https://x.example',publishedAt:null}]};
  assert.strictEqual(decideSnapshot(old,[], '2026-11-16T12:00:00Z',false).snapshot,old);
  assert.strictEqual(decideSnapshot(old,[], '2026-11-16T12:00:00Z',true).snapshot,old);
  assert.equal(decideSnapshot(old,old.articles,'2026-11-16T12:00:00Z',true).state,'unchanged');
  assert.equal(decideSnapshot(old,old.articles,'2026-11-16T12:00:00Z',true).snapshot.publishedAt,old.publishedAt);
});
test('RSS, Atom, and empty envelopes have distinct safe diagnostic outcomes',()=>{
  assert.deepEqual(inspectXmlEnvelope('<rss version="2.0"><channel><item></item></channel></rss>','application/rss+xml'),{kind:'rss',state:'has_entries',approximateEntries:1});
  assert.equal(inspectXmlEnvelope('<feed xmlns="http://www.w3.org/2005/Atom"></feed>','application/atom+xml').state,'empty');
  assert.throws(()=>inspectXmlEnvelope('<!DOCTYPE rss [ <!ENTITY x "bomb"> ]><rss><channel></channel></rss>','application/xml'),/xml_entity_declaration/);
  assert.throws(()=>inspectXmlEnvelope('<html>blocked</html>','text/html'),/unexpected_content_type/);
});

test('human editorial changes count as publishable updates',()=>{
  const item=normalizeParsedEntry({sourceId:'mit_news_ai',title:'Synthetic discovery',link:'https://news.mit.edu/2026/synthetic',published:'2026-11-16T12:00:00Z'},'2026-11-16T13:00:00Z');
  const prev={schemaVersion:'news-snapshot-v1',publishedAt:'2026-11-16T13:00:00Z',articles:[item]};
  assert.equal(decideSnapshot(prev,[{...item,lens:'AI Doing Good',editorialNote:'Reviewed context'}],'2026-11-16T14:00:00Z',true).state,'changed');
});
