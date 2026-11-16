// Fetches metadata only for cards in or near the viewport.
// The link itself is usable even when JavaScript or metadata fetching fails.
const cards = [...document.querySelectorAll('[data-link-preview]')];
const queue = [];
let active = 0;
const CONCURRENT_REQUESTS = 3;

function drain() {
  while (active < CONCURRENT_REQUESTS && queue.length) {
    const card = queue.shift();
    active += 1;
    populate(card).finally(() => { active -= 1; drain(); });
  }
}

function schedule(card) {
  if (card.dataset.previewQueued) return;
  card.dataset.previewQueued = 'true';
  queue.push(card);
  drain();
}

async function populate(card) {
  const status = card.querySelector('[data-preview-status]');
  const title = card.querySelector('[data-preview-title]');
  const description = card.querySelector('[data-preview-description]');
  const site = card.querySelector('[data-preview-site]');
  const image = card.querySelector('[data-preview-image]');
  const placeholder = card.querySelector('[data-preview-placeholder]');
  status.textContent = 'Loading website preview…';
  try {
    const sourceUrl = card.dataset.previewUrl;
    const response = await fetch(`/api/preview?url=${encodeURIComponent(sourceUrl)}`, {
      signal: AbortSignal.timeout(9000),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Preview endpoint returned ${response.status}`);
    const data = await response.json();
    // Never render third-party text as HTML.
    if (data.title) title.textContent = data.title;
    if (data.description) description.textContent = data.description;
    if (data.siteName) site.textContent = data.siteName;
    if (data.image) {
      const imgUrl = new URL(data.image);
      if (imgUrl.protocol === 'https:') {
        image.addEventListener('load', () => {
          image.hidden = false;
          placeholder.hidden = true;
        }, { once: true });
        image.addEventListener('error', () => {
          image.hidden = true;
          placeholder.hidden = false;
        }, { once: true });
        image.src = imgUrl.href;
      }
    }
    status.textContent = 'Website metadata';
  } catch {
    status.textContent = 'Preview unavailable · curated description';
  }
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      schedule(entry.target);
    }
  }, { rootMargin: '350px 0px' });
  for (const card of cards) observer.observe(card);
} else {
  cards.forEach(schedule);
}