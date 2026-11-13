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

test("Living Atrium has six subject-specific interactive installations and direct routes", () => {
  const hall = read("src/pages/index.astro");
  const styles = read("src/styles/global.css");
  assert.match(hall, /class="hall hall--living-atrium"/);
  assert.match(hall, /<nav class="installation-grid" aria-label="Choose one of six AI exhibits">/);
  assert.match(hall, /href=\{exhibitPath\(exhibit\.slug\)\}/);
  for (const kind of ["signal","mind","water","benefits","prism","network"]) {
    assert.ok(hall.includes('exhibit.visual === "' + kind + '"'));
    assert.ok(styles.includes(".installation--" + kind));
  }
  assert.match(styles, /\.hall--living-atrium \.installation-grid \{[^}]*grid-template-columns:repeat\(12,minmax\(0,1fr\)\)/);
  assert.match(styles, /\.hall--living-atrium \.installation-grid \{ display:flex;flex-direction:column/);
  assert.match(styles, /\.installation:focus-visible \.installation-sculpture/);
  assert.match(styles, /\.installation:active \.installation-sculpture/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(hall, /clearly labeled planned exhibits/);
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

test("isolated Core lab is a genuine 3D scene and preserves six accessible exhibit destinations", () => {
  const page = read("src/pages/lab/core.astro");
  const script = read("src/scripts/core-scene.js");
  const css = read("src/styles/core-lab.css");
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies.three, "0.187.0");
  assert.match(page, /<BaseLayout/);
  assert.match(page, /<canvas class="core-canvas"/);
  assert.match(page, /aria-hidden="true"/);
  assert.match(page, /<nav aria-label="All six exhibit topics">/);
  assert.match(page, /href=\{exhibitPath\(exhibit\.slug\)\}/);
  assert.match(page, /exhibits\.map\(\(exhibit\) =>/);
  assert.match(page, /Working prototype/);
  assert.match(page, /Planned/);
  assert.match(page, /data-core-motion aria-pressed="true"/);
  assert.match(script, /new THREE\.WebGLRenderer/);
  assert.match(script, /new THREE\.PerspectiveCamera/);
  assert.match(script, /new THREE\.InstancedMesh/);
  assert.match(script, /new THREE\.TubeGeometry/);
  assert.match(script, /new THREE\.SphereGeometry/);
  assert.match(script, /globe\.rotation\.y = elapsed/);
  assert.match(script, /pulse\.position\.copy\(path\.getPoint/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(script, /webglcontextlost/);
  assert.match(script, /renderer\.dispose\(\)/);
  assert.match(script, /new ResizeObserver/);
  assert.doesNotMatch(page, /ForgeForward|Cloud Solutions|Core Infrastructure|Sustainability/);
  assert.doesNotMatch(css, /background-image:\s*url\(/);
  assert.match(css, /@media\(max-width:620px\)/);
});

test("data-center visual direction and bounded review gate are documented", () => {
  const direction = read("docs/design/AIIP-CORE-01-data-center-direction.md");
  const control = read("docs/PROJECT_CONTROL.md");
  assert.match(direction, /Owner-directed visual-direction change/);
  assert.match(direction, /Three\.js WebGL scene/);
  assert.match(direction, /not.*flat|flat.*rejected/i);
  assert.match(direction, /Globe|globe/);
  assert.ok(direction.includes("`/lab/core`"));
  assert.match(direction, /not.*visual approval/i);
  assert.ok(Number(control.match(/Record revision:\*\* (\\d+)/)?.[1]) >= 18);
});


test("CORE-02 architectural comparison preserves three meaningful alternatives and six direct exhibit links", () => {
  const html=read("src/pages/lab/directions.astro");
  const brief=read("docs/design/AIIP-CORE-02-architecture-comparison.md");
  assert.match(html,/data-composition="aisle"/);
  assert.match(html,/data-composition="section"/);
  assert.match(html,/data-composition="overlook"/);
  assert.match(html,/aria-label="Choose an AI in Perspective exhibit"/);
  assert.match(html,/href=\{exhibitPath\(e.slug\)\}/);
  assert.match(html,/prefers-reduced-motion:reduce/);
  assert.match(html,/Cold aisle|COLD AISLE/);
  assert.match(html,/COOLING \/ CDU/);
  assert.match(html,/Observation gallery/i);
  assert.match(html,/not finished 3D environments/i);
  assert.match(brief,/Recommended provisional main hub composition/);
  assert.match(brief,/not final visual acceptance/i);
  assert.ok(Number(read("docs/PROJECT_CONTROL.md").match(/Record revision:\*\* (\\d+)/)?.[1]) >= 18);
});
