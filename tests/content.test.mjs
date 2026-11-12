import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");

test("six museum exhibit slugs and a single working prototype are declared", () => {
  const data = read("src/data/exhibits.ts");
  const slugs = [...data.matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);
  assert.deepEqual(slugs, ["risks", "consciousness", "environment", "benefits", "misconceptions", "agents-security"]);
  assert.equal([...data.matchAll(/status: "prototype"\s*\}/g)].length, 1);
});

test("cinematic opening never waits to reveal the skip and continue actions", () => {
  const html = read("src/pages/intro.astro");
  assert.match(html, /class="intro-skip"/);
  assert.match(html, /class="intro-continue"/);
  assert.match(html, /<h1 class="intro-line intro-line--first"><span class="intro-headline-lead">AI HAS<\/span> <span class="intro-headline-arrived">ARRIVED<\/span><\/h1>/);
  assert.match(html, /But the truth is, <em>right now<\/em>/);
  assert.doesNotMatch(html, /Because the truth is/);
  assert.doesNotMatch(html, /The wave isn.t coming/);
  assert.doesNotMatch(html, /setTimeout\(|window\.location\s*=/);
});

test("intro headline has a distinct display face and a brief standalone hold before body copy", () => {
  const css = read("src/styles/global.css");
  assert.match(css, /family=Syne:wght@500;700;800/);
  assert.match(css, /\.intro-line--first \{[\s\S]*?flex-direction:column/);
  assert.match(css, /\.intro-headline-arrived \{/);
  assert.match(css, /\.intro-line:nth-child\(1\) \{ animation-delay:\.35s; \}/);
  assert.match(css, /\.intro-line:nth-child\(2\) \{ animation-delay:1\.75s; \}/);
  assert.match(css, /animation:cta-illuminate 1s ease-out 5\.25s both/);
  assert.match(css, /\.intro-continue \{[\s\S]*?opacity:1;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("intro, hall, environment, and methodology have public routes", () => {
  for (const path of ["src/pages/intro.astro", "src/pages/index.astro", "src/pages/explore/environment.astro", "src/pages/methodology.astro", "src/pages/explore/[slug].astro"]) {
    assert.ok(read(path).includes("BaseLayout"));
  }
});

test("water diagram is declared as conceptual and has two reachable states", () => {
  const html = read("src/pages/explore/environment.astro");
  assert.match(html, /simplified teaching model/);
  assert.match(html, /data-mode-btn="withdrawal"/);
  assert.match(html, /data-mode-btn="consumption"/);
  assert.match(html, /aria-pressed/);
  assert.match(html, /No live data feed or measured site figures/);
});


test("Earth is viewport-anchored, rises from below the screen, and blooms with the sunrise", () => {
  const page = read("src/pages/intro.astro");
  const styles = read("src/styles/global.css");
  assert.match(page, /intro-earth-art/);
  assert.match(page, /intro-earth-land/);
  assert.match(page, /intro-earth-cloud-texture/);
  assert.match(page, /intro-title-horizon/);
  assert.match(styles, /\.intro-planet \{[\s\S]*?top:72svh/);
  assert.match(styles, /\.intro-planet \{ top:67svh;width:max\(165vw,730px\); \}/);
  assert.doesNotMatch(styles, /\.intro-planet \{[^}]*top:\d+%/);
  assert.match(styles, /@keyframes earth-emerge \{[\s\S]*?translate:0 76svh/);
  assert.match(styles, /@keyframes earth-aura-rise \{[\s\S]*?translate:0 54svh/);
  assert.match(styles, /@keyframes sunrise-bloom/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /\.intro-planet \{ opacity:\.98 !important;translate:0 0 !important;scale:1 !important; \}/);
});

test("pre-release site opts out of indexing", () => {
  assert.match(read("src/layouts/BaseLayout.astro"), /noindex, nofollow/);
});

test("accepted governance and development-branch protections are documented", () => {
  const control = read("docs/PROJECT_CONTROL.md");
  assert.match(control, /AIPF v8\.10\.1/);
  assert.match(control, /owner-accepted 2026-11-12/);
  assert.match(control, /No auto-merge/);
});
