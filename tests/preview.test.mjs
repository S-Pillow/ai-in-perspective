import test from 'node:test';
import assert from 'node:assert/strict';
import preview, { validatePublicUrl, parseMetadata } from '../api/preview.js';

test('preview endpoint permits public site URLs but rejects local/IP/credential/unsafe targets', () => {
  assert.equal(validatePublicUrl('https://example.org/page#section').href, 'https://example.org/page');
  for (const url of [
    'file:///etc/passwd','http://127.0.0.1/','http://169.254.169.254/latest/meta-data',
    'http://192.168.1.5/','http://localhost/','https://host.internal/',
    'https://example.com:8080/','https://user:pass@example.com/','javascript:alert(1)'
  ]) assert.throws(() => validatePublicUrl(url), undefined, url);
});

test('preview metadata uses OG before fallback and resolves relative images', () => {
  const html = `<html><head><title>Fallback &amp; title</title>
    <meta content="OG &amp; title" property="og:title">
    <meta property='og:description' content='A useful &amp; honest summary'>
    <meta name="description" content="Standard summary">
    <meta property="og:image" content="/cover.jpg"></head></html>`;
  assert.deepEqual(parseMetadata(html,'https://example.org/post'), {
    url:'https://example.org/post',siteName:'example.org',
    title:'OG & title',description:'A useful & honest summary',
    image:'https://example.org/cover.jpg'
  });
});

test('preview metadata falls back to standard title and description and discards unsafe image URLs', () => {
  const m=parseMetadata('<title>Regular &amp; title</title><meta name="description" content="Ordinary summary"><meta property="og:image" content="javascript:alert(1)">','https://example.org/');
  assert.equal(m.title,'Regular & title');
  assert.equal(m.description,'Ordinary summary');
  assert.equal(m.image,null);
});

test('preview function rejects wrong method and invalid URL without caching', async () => {
  const wrong=await preview.fetch(new Request('https://demo.example/api/preview',{method:'POST'}));
  const bad=await preview.fetch(new Request('https://demo.example/api/preview?url=http%3A%2F%2Flocalhost'));
  assert.equal(wrong.status,405);
  assert.equal(bad.status,400);
  assert.equal(bad.headers.get('cache-control'),'no-store');
  assert.equal(bad.headers.get('vercel-cdn-cache-control'),null);
});

test('link previews retain graceful fallback, safe text and image handling, and progressive enhancement', () => {
  const fs=globalThis.process.getBuiltinModule('node:fs');
  const component=fs.readFileSync('src/components/LinkPreview.astro','utf8');
  const script=fs.readFileSync('src/scripts/link-previews.js','utf8');
  const css=fs.readFileSync('src/styles/link-preview.css','utf8');
  assert.match(component,/data-preview-url=\{url\}/);
  assert.match(component,/referrerpolicy="no-referrer"/);
  assert.match(component,/fallbackTitle/);
  assert.match(component,/data-preview-image/);
  assert.match(script,/encodeURIComponent\(sourceUrl\)/);
  assert.match(script,/textContent = data\.title/);
  assert.match(script,/IntersectionObserver/);
  assert.match(script,/CONCURRENT_REQUESTS = 3/);
  assert.match(css,/\[hidden\]\{display:none!important;\}/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
