import dns from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import { BlockList, isIP } from 'node:net';
import { gunzipSync, inflateSync, brotliDecompressSync } from 'node:zlib';

const MAX_HTML_BYTES = 512 * 1024;
const MAX_URL_LENGTH = 2048;
const MAX_REDIRECTS = 3;
const USER_AGENT = 'AIInPerspectivePreview/1.0 (+https://ai-in-perspective.vercel.app)';

// This endpoint is deliberately restricted to public DNS names and public IPv4
// targets. Denying raw IP URLs and pinning a checked DNS result prevents DNS
// rebinding and accidental access to internal Vercel/host network services.
const reserved = new BlockList();
for (const [base, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10],
  ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.88.99.0', 24],
  ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24],
  ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
]) reserved.addSubnet(base, prefix, 'ipv4');

function invalid(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

export function validatePublicUrl(input) {
  if (typeof input !== 'string' || input.length > MAX_URL_LENGTH) {
    throw invalid('Provide a URL of at most 2048 characters.');
  }
  let parsed;
  try { parsed = new URL(input.trim()); }
  catch { throw invalid('Enter a valid absolute URL.'); }
  if (!['http:', 'https:'].includes(parsed.protocol)) throw invalid('Only HTTP and HTTPS URLs are supported.');
  if (parsed.username || parsed.password) throw invalid('URLs containing credentials are not supported.');
  if (parsed.port) throw invalid('Custom ports are not supported.');
  if (!parsed.hostname || isIP(parsed.hostname)) throw invalid('Use a public website hostname, not an IP address.');
  if (!parsed.hostname.includes('.') || /(?:^|\.)(localhost|local|internal|invalid|test|onion)$/i.test(parsed.hostname)) {
    throw invalid('Only public website hostnames are supported.');
  }
  parsed.hash = '';
  return parsed;
}

async function resolvePublicIPv4(hostname) {
  const records = await dns.lookup(hostname, { family: 4, all: true });
  if (!records.length || records.some(({ address }) => isIP(address) !== 4 || reserved.check(address, 'ipv4'))) {
    throw invalid('This website does not resolve to an allowed public address.');
  }
  return records[0].address;
}

function decodeEntities(value = '') {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—' };
  return value.replace(/&(#(?:x[0-9a-f]+|[0-9]+)|[a-z]+);/gi, (whole, entity) => {
    if (entity[0] === '#') {
      const hex = /^#x/i.test(entity);
      const number = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return number > 0 && number <= 0x10ffff && !(number >= 0xd800 && number <= 0xdfff)
        ? String.fromCodePoint(number) : whole;
    }
    return named[entity.toLowerCase()] ?? whole;
  });
}

function clean(value, length) {
  return decodeEntities(String(value ?? '')).replace(/\s+/g, ' ').trim().slice(0, length);
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

export function parseMetadata(html, finalUrl) {
  const tags = [...html.matchAll(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)].map(match => match[0]);
  const meta = new Map();
  for (const tag of tags) {
    const attrs = attributes(tag);
    const name = (attrs.property || attrs.name || '').toLowerCase();
    if (name && attrs.content && !meta.has(name)) meta.set(name, attrs.content);
  }
  const titleTag = html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i);
  const baseTag = html.match(/<base\b(?:[^>"']|"[^"]*"|'[^']*')*>/i);
  let base = finalUrl;
  if (baseTag) {
    try {
      const candidate = new URL(attributes(baseTag[0]).href || '', finalUrl);
      if (candidate.protocol === 'http:' || candidate.protocol === 'https:') base = candidate.href;
    } catch { /* fall back to finalUrl */ }
  }
  const original = new URL(finalUrl);
  let image = null;
  const rawImage = meta.get('og:image:secure_url') || meta.get('og:image') || meta.get('twitter:image');
  if (rawImage) {
    try {
      const resolved = new URL(rawImage, base);
      if (['http:', 'https:'].includes(resolved.protocol) && !resolved.username && !resolved.password &&
          !isIP(resolved.hostname) && !/(?:^|\.)(localhost|local|internal|invalid|test|onion)$/i.test(resolved.hostname)) {
        resolved.hash = '';
        image = resolved.href;
      }
    } catch { /* image is optional */ }
  }
  return {
    url: original.href,
    siteName: clean(meta.get('og:site_name') || original.hostname, 100),
    title: clean(meta.get('og:title') || meta.get('twitter:title') || titleTag?.[1] || original.hostname, 220),
    description: clean(meta.get('og:description') || meta.get('twitter:description') || meta.get('description') || '', 420),
    image,
  };
}

async function getHtml(url, signal, redirects = 0) {
  if (redirects > MAX_REDIRECTS) throw invalid('This website redirected too many times.');
  const parsed = validatePublicUrl(url);
  const pinnedAddress = await resolvePublicIPv4(parsed.hostname);
  const transport = parsed.protocol === 'https:' ? https : http;
  const response = await new Promise((resolve, reject) => {
    const req = transport.get(parsed, {
      signal,
      family: 4,
      lookup: (_host, _options, callback) => callback(null, pinnedAddress, 4),
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml;q=0.9',
        'accept-encoding': 'identity',
      },
    }, res => {
      const chunks = [];
      let total = 0;
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve({ status: res.statusCode || 502, headers: res.headers, buffer: Buffer.concat(chunks) });
      };
      res.on('data', chunk => {
        if (settled) return;
        const left = MAX_HTML_BYTES - total;
        if (left <= 0) { finish(); res.destroy(); return; }
        chunks.push(chunk.subarray(0, left));
        total += Math.min(chunk.length, left);
        if (total >= MAX_HTML_BYTES) { finish(); res.destroy(); }
      });
      res.on('end', finish);
      res.on('error', error => { if (!settled) reject(error); });
    });
    req.on('error', reject);
  });
  if (response.status >= 300 && response.status < 400 && response.headers.location) {
    const next = new URL(response.headers.location, parsed).href;
    return getHtml(next, signal, redirects + 1);
  }
  if (response.status < 200 || response.status >= 300) throw new Error(`Source returned HTTP ${response.status}.`);
  const type = String(response.headers['content-type'] || '').toLowerCase();
  if (!type.includes('text/html') && !type.includes('application/xhtml+xml')) {
    throw new Error('The URL did not return HTML.');
  }
  const encoding = String(response.headers['content-encoding'] || '').toLowerCase();
  let body = response.buffer;
  const options = { maxOutputLength: MAX_HTML_BYTES };
  if (encoding.includes('gzip')) body = gunzipSync(body, options);
  else if (encoding.includes('br')) body = brotliDecompressSync(body, options);
  else if (encoding.includes('deflate')) body = inflateSync(body, options);
  return { html: body.toString('utf8'), url: parsed.href };
}

function json(body, status = 200, cached = false) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': cached ? 'public, max-age=0' : 'no-store',
      ...(cached ? { 'Vercel-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } : {}),
    },
  });
}

// Native Node.js Vercel Function: deploys as /api/preview?url=https%3A%2F%2Fexample.com
export default {
  async fetch(request) {
    if (request.method !== 'GET') return json({ error: 'Use GET.' }, 405);
    let target;
    try {
      const requestUrl = new URL(request.url);
      target = validatePublicUrl(requestUrl.searchParams.get('url'));
    } catch (error) {
      return json({ error: error.message || 'Invalid URL.' }, 400);
    }
    try {
      const { html, url } = await getHtml(target.href, AbortSignal.timeout(7500));
      return json(parseMetadata(html, url), 200, true);
    } catch (error) {
      // Avoid leaking DNS/IP/network details to callers.
      return json({ error: error.status === 400 ? error.message : 'A preview could not be loaded from this website.' }, error.status === 400 ? 400 : 502);
    }
  },
};