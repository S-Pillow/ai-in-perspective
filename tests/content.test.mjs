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
  assert.doesNotMatch(html, /setTimeout\(|window\.location\s*=/);
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

test("pre-release site opts out of indexing", () => {
  assert.match(read("src/layouts/BaseLayout.astro"), /noindex, nofollow/);
});

test("accepted governance and development-branch protections are documented", () => {
  const control = read("docs/PROJECT_CONTROL.md");
  assert.match(control, /AIPF v8\.10\.1/);
  assert.match(control, /owner-accepted 2026-11-12/);
  assert.match(control, /No auto-merge/);
});
