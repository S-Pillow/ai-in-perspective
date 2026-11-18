/** Display-only News helpers. No fetching, claims verification or editorial inference. */
const TRACKING = /^(utm_[a-z0-9_]+|fbclid|gclid|mc_cid|mc_eid)$/i;
export function canonicalArticleLink(value) {
  const url = new URL(value);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) if(TRACKING.test(key)) url.searchParams.delete(key);
  url.searchParams.sort();
  return url.toString();
}
export function getVisibleFeedArticles(articles, sources, curatedStories, limit = 16) {
  if (!Number.isInteger(limit) || limit < 0) throw new RangeError("invalid_display_limit");
  const curatedLinks = new Set(curatedStories.map(story => canonicalArticleLink(story.url)));
  const buckets = sources.filter(source => source.enabled).map(source =>
    articles.filter(article => article.sourceId === source.id && !curatedLinks.has(canonicalArticleLink(article.url)))
  );
  const chosen = [], seen = new Set();
  const maxLength = Math.max(0, ...buckets.map(bucket => bucket.length));
  for (let index=0; index < maxLength && chosen.length < limit; index++) {
    for (const bucket of buckets) {
      const article=bucket[index];
      if(article && !seen.has(canonicalArticleLink(article.url))) { chosen.push(article); seen.add(canonicalArticleLink(article.url)); }
      if(chosen.length>=limit) break;
    }
  }
  return chosen;
}
export function formatSnapshotTimeUtc(iso) {
  if (typeof iso !== "string" || !Number.isFinite(Date.parse(iso))) return null;
  return new Intl.DateTimeFormat("en-US", {
    month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",
    timeZone:"UTC",timeZoneName:"short",
  }).format(new Date(iso));
}
