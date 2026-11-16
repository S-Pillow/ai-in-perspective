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

test("approved AI HAS ARRIVED introduction is the public entrypoint", () => {
  const rootPage = read("src/pages/index.astro");
  const intro = read("src/pages/intro.astro");
  assert.match(rootPage, /window\.location\.replace\("\/intro"\)/);
  assert.match(intro, /AI HAS/);
  assert.match(intro, /href="\/discover\/" class="intro-continue"/);
  assert.match(intro, /href="\/discover\/" class="intro-skip"/);
  assert.doesNotMatch(rootPage, /hall--living-atrium/);
});

test("ring selector uses five real AI perspectives and no fake destination links", () => {
  const page = read("public/discover/index.html");
  const worlds = page.split("const WORLDS=[")[1]?.split("];")[0] || "";
  assert.equal((worlds.match(/\{name:'/g)||[]).length,5);
  for (const name of ["History","Risks & Safety","Benefits","Environment","Education & News"]) {
    assert.ok(worlds.includes("name:'"+name+"'"));
  }
  for (const path of ["/explore/history","/explore/risks","/explore/benefits","/explore/environment","/explore/education-news"]) {
    assert.ok(worlds.includes("url:'"+path+"'"));
  }
  assert.equal((worlds.match(/url:null/g)||[]).length,0);
  // Owner disliked Benefits cherry blossoms; trial uses existing original Horizon painter.
  const benefits=worlds.split("{name:'Benefits'")[1]?.split('},')[0] || '';
  assert.match(benefits, /paint:pGrid/);
  assert.match(benefits, /anim:aGrid/);
  assert.match(benefits, /icon:ICON\.horizon/);
  assert.doesNotMatch(benefits, /pBlossom|aBlossom|ICON\.blossom/);
  assert.match(page, /In development/);
  assert.match(page, /id="topic-cta"/);
  assert.match(page, /prefers-reduced-motion:reduce/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /noindex, nofollow/);
  assert.doesNotMatch(page, /Start a pilot|Send a demo request/);
});

test("intro, hall, environment, and methodology have public routes", () => {
  for (const path of ["src/pages/intro.astro", "src/pages/index.astro", "src/pages/explore/environment.astro", "src/pages/methodology.astro", "src/pages/explore/[slug].astro"]) {
    assert.ok(read(path).includes("BaseLayout"));
  }
});

test("Environment restart uses accessible ISO-GLOW-inspired connected infrastructure", () => {
  const page = read("src/pages/explore/environment.astro");
  const script = read("src/scripts/environment-system.js");
  const css = read("src/styles/environment-rebuild.css");
  const license = read("public/licenses/iso-glow-LICENSE.txt");
  assert.match(page, /<h1 id="environment-title">AI has a/);
  assert.match(page, /data-environment-stage/);
  for (const focus of ["all", "power", "compute", "cooling", "context"]) {
    assert.ok(page.includes('data-env-focus="' + focus + '"'));
  }
  assert.match(page, /data-env-motion/);
  assert.match(page, /role="status" aria-live="polite"/);
  assert.match(page, /IEA · Energy and AI/);
  assert.match(page, /Berkeley National Laboratory/);
  assert.match(page, /not a measured data center/i);
  assert.match(page, /Data centers use different power sources and cooling systems/i);
  assert.match(page, /licenses\/iso-glow-LICENSE\.txt/);
  assert.doesNotMatch(page, /data-mode-btn="withdrawal"|data-water-mode="withdrawal"|water-lab/);
  assert.match(script, /const P = \(x,y,z=0\)/);
  assert.match(script, /const isoBox =/);
  assert.match(script, /const rack=\(x,y,index\)=>/);
  assert.match(script, /for\(let i=0;i<7;i\+\+\)/);
  assert.match(script, /data-zone="compute"/);
  assert.match(script, /const focusData=/);
  assert.match(script, /visibilitychange/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media\(max-width:660px\)/);
  assert.match(css, /\.env-scene-wrap\{overflow-x:auto/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(license, /MIT License/);
  assert.match(license, /Copyright \(c\) 2026 April Zhu/);
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

test("current public release governance and protected preview are documented", () => {
  const control = read("docs/PROJECT_CONTROL.md");
  assert.match(control, /AIPF v8\.10\.1/);
  assert.match(control, /owner-accepted 2026-11-12/);
  assert.match(control, /GitHub main is the live source/);
  assert.match(control, /separate prototype-preview project is protected with Vercel Authentication/);
  assert.match(control, /No RSS feed or educational resource catalog is active/);
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
  assert.match(direction, /Owner-directed experience metaphor/);
  assert.match(direction, /Three\.js\/WebGL/);
  assert.match(direction, /Flat, ugly technical diagrams as homepage candidates/);
  assert.match(direction, /Globe|globe/);
  assert.ok(direction.includes("`/lab/core`"));
  assert.match(direction, /Signature central core/);
  assert.match(direction, /Six meaningful, discoverable exhibit entrances/);
  assert.match(direction, /The observation gallery is \*\*NOT selected/);
  assert.match(direction, /Dioramas/);
  assert.match(direction, /InstaLanding/);
  assert.match(direction, /No default winner now/);

  assert.match(direction, /NO owner-accepted page composition/);
  assert.ok(Number(control.match(/Record revision:\*\* (\d+)/)?.[1]) >= 18);
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
  assert.match(brief,/rejected all three/i);
  assert.match(brief,/Observation Gallery winner is withdrawn/);
  assert.match(brief,/not final visual acceptance/i);
  assert.ok(Number(read("docs/PROJECT_CONTROL.md").match(/Record revision:\*\* (\d+)/)?.[1]) >= 18);
});
// Paste the following isolated test into tests/content.test.mjs; it exercises
// source-level contract only. It does not establish actual WebGL rendering.
test("EXPERIENCE-06 isolated connected spaceship visual slice", () => {
  const voyage = read("src/pages/lab/voyage.astro");
  const scene = read("src/scripts/voyage-lab.js");
  const deck = read("src/pages/lab/observation-deck.astro");
  const deckCode = read("src/scripts/observation-deck-lab.js");
  const pkg = JSON.parse(read("package.json"));
  const direction = read("docs/design/AIIP-EXPERIENCE-06-visual-slice.md");
  assert.match(voyage, /Skip journey/);
  assert.match(voyage, /data-voyage-play/);
  assert.match(voyage, /Explore the observation deck/);
  assert.match(scene, /GLTFLoader/);
  assert.match(scene, /wayfinder\.glb/);
  assert.match(scene, /new THREE\.WebGLRenderer/);
  assert.match(scene, /gsap\.timeline/);
  assert.match(scene, /prefers-reduced-motion: reduce/);
  assert.match(scene, /visibilitychange/);
  assert.match(deck, /Spaceship observation windows/);
  assert.match(deck, /Education & News/);
  assert.match(deck, /href: null/);
  assert.match(deckCode, /pointerdown/);
  assert.match(deckCode, /ArrowLeft/);
  assert.match(deckCode, /scrollTo/);
  assert.match(deckCode, /new THREE\.WebGLRenderer/);
  assert.equal(pkg.dependencies.gsap, "3.15.1");
  assert.match(pkg.scripts.build, /unpack-wayfinder/);
  assert.match(read("scripts/unpack-wayfinder.mjs"), /brotliDecompressSync/);
  assert.match(direction, /existing homepage remains intact/i);
  assert.ok(Number(read("docs/PROJECT_CONTROL.md").match(/Record revision:\*\* (\d+)/)?.[1]) >= 24);
});
test("EXPERIENCE-10 keeps the energy plate and teaches separate water flows", () => {
  const page = read("src/pages/explore/environment.astro");
  const scene = read("src/scripts/environment-water.js");
  const style = read("src/styles/environment-water.css");
  const design = read("docs/design/AIIP-EXPERIENCE-10-water-flow.md");
  assert.match(page, /id="environment-model"/);
  assert.match(page, /id="water-system"/);
  assert.ok(page.indexOf('id="environment-model"') < page.indexOf('id="water-system"'));
  const energy = page.indexOf('id="environment-model"');
  const explanation = page.indexOf('class="env-explain"');
  const water = page.indexOf('id="water-system"');
  const context = page.indexOf('class="env-context"');
  assert.ok(energy >= 0 && explanation >= 0 && water >= 0 && context >= 0);
  assert.ok(energy < explanation && explanation < water && water < context,
    "Energy explanation must sit directly after the Energy scene, before Water and shared context");
  assert.equal(page.match(/class="env-explain"/g)?.length, 1);
  assert.match(page, /How AI uses energy/);
  assert.match(page, /How AI uses <em>water/);
  assert.match(page, /data-water-mode-btn="evaporative"/);
  assert.match(page, /data-water-mode-btn="onceThrough"/);
  assert.match(page, /data-water-focus-btn="withdrawal"/);
  assert.match(page, /data-water-focus-btn="reuse"/);
  assert.match(page, /data-water-focus-btn="evaporation"/);
  assert.match(page, /data-water-focus-btn="discharge"/);
  assert.match(page, /data-water-reading-body/);
  assert.match(page, /data-water-motion/);
  assert.match(page, /not a data-center cooling tower/i);
  assert.match(page, /treated blowdown/i);
  assert.match(page, /energy.gov\/cmei\/femp\/cooling-water-efficiency/);
  assert.match(page, /usgs.gov\/mission-areas\/water-resources\/science\/thermoelectric/);
  assert.match(page, /import "\.\.\/\.\.\/scripts\/environment-system.js"/);
  assert.match(page, /import "\.\.\/\.\.\/scripts\/environment-water.js"/);
  assert.match(scene, /const evaporative=\(\)=>/);
  assert.match(scene, /const onceThrough=\(\)=>/);
  assert.match(scene, /TREATED RETURN\*/);
  assert.match(scene, /RETURN TO SOURCE/);
  assert.match(scene, /WARMER WATER/);
  assert.match(scene, /waterStage\.dataset\.mode=mode/);
  assert.match(scene, /waterStage\.dataset\.focus=focus/);
  assert.match(scene, /b\.disabled=!active/);
  assert.match(scene, /prefers-reduced-motion: reduce/);
  assert.match(scene, /visibilitychange/);
  assert.match(scene, /requestAnimationFrame\(\(\)=>pan\('all',true\)\)/);
  assert.match(style, /\.env-water-stage\[data-motion="off"\]/);
  assert.match(style, /@media\(max-width:700px\)/);
  assert.match(style, /\.env-water-scroll\{overflow-x:auto/);
  assert.match(style, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(design, /not a measured or statistically representative/i);
  assert.match(design, /owner visual review/i);
});

test("EXPERIENCE-12 practical cards and ELI5 recap follow shared Environment conclusion", () => {
  const page = read("src/pages/explore/environment.astro");
  const css = read("src/styles/environment-rebuild.css");
  const anchors = ['id="environment-model"', 'class="env-explain"', 'id="water-system"', 'class="env-context"', 'class="env-actions"', 'class="env-eli5"', 'class="env-footnotes"'];
  const positions = anchors.map(anchor => page.indexOf(anchor));
  assert.ok(positions.every(position => position !== -1), "all seven section anchors must remain present");
  assert.ok(positions.every((position, index) => index === 0 || position > positions[index - 1]), "teaching sections must follow the approved reading order");
  assert.equal(page.match(/class="env-actions__card"/g)?.length, 3);
  assert.equal(page.match(/class="env-eli5__card"/g)?.length, 4);
  for (const title of ["Using different water", "Changing the cooling", "Replenishing and restoring",
    "AI runs in buildings", "Computers get hot", "Cooling removes that heat", "Water can be used in different ways"]) {
    assert.ok(page.includes(title), title);
  }
  assert.match(page, /id="environment-eli5-title"/);
  assert.match(page, /<span class="env-eli5__word env-eli5__word--mint">Five:<svg class="env-eli5__scribble"/);
  assert.match(page, /aria-hidden="true" focusable="false"/);
  assert.match(css, /\.env-eli5__scribble/);
  assert.match(css, /\.env-eli5__grid\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:660px\)\{[\s\S]*?\.env-eli5__grid\{grid-template-columns:1fr;/);
  assert.match(page, /epa.gov\/waterreuse\/water-reuse-industrial-applications-resources/);
  assert.match(page, /energy.gov\/cmei\/femp\/cooling-water-efficiency-opportunities-federal-data-centers/);
  assert.match(page, /microsoft.com\/en-us\/corporate-responsibility\/sustainability\/water/);
});


test("BENEFITS-01 impact explorer has four grounded stories and an accessible interactive preview", () => {
  const page = read("src/pages/explore/benefits.astro");
  const style = read("src/styles/benefits.css");
  const script = read("src/scripts/benefits.js");
  const route = read("src/pages/explore/[slug].astro");
  const record = read("docs/design/AIIP-BENEFITS-01-impact-explorer.md");
  assert.match(route, /e\.slug !== "environment" && e\.slug !== "benefits"/);
  assert.equal((page.match(/id:"(healthcare|discovery|environment|accessibility)"/g) || []).length, 4);
  for (const id of ["healthcare", "discovery", "environment", "accessibility"]) {
    assert.match(page, new RegExp('id:"' + id + '"'));
    assert.ok(page.includes('s.id==="' + id + '"'), "missing original subject-specific scene: " + id);
  }
  assert.match(page, /id="benefits-explorer"/);
  assert.match(page, /data-benefits-card=\{s.id\}/);
  assert.match(page, /data-benefits-panel=\{s.id\}/);
  assert.match(page, /aria-pressed=\{i===0\?"true":"false"\}/);
  assert.match(page, /hidden=\{i>0\}/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /data-benefits-motion/);
  assert.match(page, /stories\.map\(s=>\(<article class="bf-evidence__card"/);
  assert.doesNotMatch(page, /Concept illustration|artNote|bf-story__caption/);
  assert.match(page, /class="bf-story__art-meta"/);
  assert.match(page, /KEEP IN PERSPECTIVE/);
  for (const link of ["pubmed.ncbi.nlm.nih.gov/41620232/",
      "alphafold.ebi.ac.uk/", "ecmwf.int/en/about/media-centre/news/2025/ecmwfs-ai-forecasts-become-operational",
      "bemyeyes.com/bme-ai/"]) assert.ok(page.includes(link), "missing source " + link);
  assert.match(script, /card\.setAttribute\("aria-pressed"/);
  assert.match(script, /panel\.hidden = panel\.dataset\.benefitsPanel !== topic/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(style, /\.bf-choice\[aria-pressed="true"\]/);
  assert.match(style, /\.benefits-realm\[data-motion="off"\]/);
  assert.match(style, /@media\(max-width:540px\)/);
  assert.match(style, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(record, /original visual system/);
});


test("BENEFITS-02 closes the impact explorer with four plain-language ELI5 cards", () => {
  const page = read("src/pages/explore/benefits.astro");
  const style = read("src/styles/benefits.css");
  const anchors = [
    'id="benefits-explorer"', 'class="bf-evidence"', 'class="bf-close"',
    'class="bf-eli5"', 'class="bf-foot"'
  ];
  const positions = anchors.map(anchor => page.indexOf(anchor));
  assert.ok(positions.every(position => position >= 0), "all sections must remain present");
  assert.ok(positions.every((position,i) => i === 0 || position > positions[i-1]),
    "ELI5 must follow story, evidence and context, before footer");
  assert.equal(page.match(/class="bf-eli5"/g)?.length, 1);
  assert.equal(page.match(/class="bf-eli5__card"/g)?.length, 4);
  for (const heading of ["A second set of eyes for doctors", "Giving scientists a head start",
    "A better heads-up about weather", "Turning pictures into words"]) {
    assert.ok(page.includes(heading), heading);
  }
  assert.match(page, /id="benefits-eli5"/);
  assert.match(page, /id="bf-eli5-title"/);
  assert.match(page, /class="bf-eli5__scribble"[^>]*aria-hidden="true" focusable="false"/);
  assert.match(page, /THE BIGGER PICTURE/);
  assert.match(page, /The doctor still decides/);
  assert.match(page, /Forecasts can still be wrong/);
  assert.match(page, /AI sometimes gets details wrong/);
  assert.match(style, /\.bf-eli5__word--peach/);
  assert.match(style, /\.bf-eli5__word--lavender/);
  assert.match(style, /\.bf-eli5__scribble/);
  assert.match(style, /\.bf-eli5__cards\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(style, /@media\(max-width:660px\)\{\.bf-eli5[\s\S]*?\.bf-eli5__cards\{grid-template-columns:1fr;/);
  assert.match(style, /@media\(prefers-reduced-motion:reduce\)\{\.bf-eli5__word\{transform:none;/);
});



test("AIIP-RISKS-01 structures 17 source-based risks, employee impact, and accessible controls", () => {
  const page = read("src/pages/explore/risks.astro");
  const data = read("src/data/risks.ts");
  const css = read("src/styles/risks.css");
  const script = read("src/scripts/risks.js");
  const route = read("src/pages/explore/[slug].astro");
  const notes = read("docs/design/AIIP-RISKS-01-signal-observatory.md");
  assert.match(route, /e\.slug !== "environment" && e\.slug !== "benefits" && e\.slug !== "risks"/);
  assert.equal((data.match(/id:"[^"]+",group:"/g) || []).length, 17);
  for (const g of ["work","misuse","trust","people","power","frontier"]) {
    assert.ok(data.includes('id: "' + g + '"'), "missing category " + g);
  }
  for (const risk of ["job-security","cyber","scams","bio","loss-control","sexual-abuse","agents","wellbeing"]) {
    assert.ok(data.includes('id:"' + risk + '"'), "missing risk " + risk);
  }
  for (const l of ["critical","high","moderate","low"]) assert.ok(data.includes('id: "' + l + '"'));
  for (const field of ["evidence:","trend:","response:","source:"]) assert.ok(data.includes(field));
  const anchors = ['id="rs-title"', 'id="rs-global-title"', 'id="rs-jobs-title"',
     'id="risk-radar"', 'id="risk-safeguards"', 'class="rs-eli5"', 'class="rs-foot"'];
  const positions = anchors.map(anchor => page.indexOf(anchor));
  assert.ok(positions.every(position => position >= 0 && position < page.length));
  assert.ok(positions.every((position,i) => i === 0 || position > positions[i-1]), "correct section order");
  assert.match(page, /data-rs-filter="all"/);
  assert.match(page, /data-rs-risk=\{risk\.id\}/);
  assert.match(page, /data-rs-panel=\{risk\.id\}/);
  assert.match(page, /aria-controls=\{"rs-panel-"\+risk\.id\}/);
  assert.match(page, /role="status" data-rs-count/);
  assert.match(page, /hidden=\{i>0\}/);
  assert.match(script, /panel\.hidden = panel\.dataset\.rsPanel !== id/);
  assert.match(script, /card\.setAttribute\("aria-pressed"/);
  assert.match(script, /filter\.setAttribute\("aria-pressed"/);
  assert.match(script, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.rs-grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:1100px\)/);
  assert.match(css, /@media\(max-width:590px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(page, /A prediction, not an observed job-loss rate/);
  assert.match(page, /not proof AI caused a 19% job loss/);
  assert.match(page, /no clear evidence of large-scale AI-driven labor-market disruption/i);
  assert.match(page, /AI IN PERSPECTIVE · EDUCATIONAL RISK OVERVIEW/);
  assert.doesNotMatch(page, /Back to the museum|EXHIBIT STATUS/);
  for (const link of ["digitaleconomy.stanford.edu/", "budgetlab.yale.edu/", "axios.com/2025/05/28/",
    "reuters.com/world/asia-pacific/", "ilo.org/publications/", "nist.gov/", "internationalaisafetyreport.org/"]) {
    assert.ok(page.includes(link) || data.includes(link), "missing attribution " + link);
  }
  assert.match(page, /class="rs-eli5__scribble"[^>]*aria-hidden="true" focusable="false"/);
  assert.equal((page.match(/class="rs-eli5__grid"/g) || []).length, 1);
  assert.equal((page.match(/<article><span>0[1-4] \//g) || []).length, 4);
  assert.match(notes, /not measured probability/);
});

test("AIIP-RISKS-01 filters and risk-selection controllers preserve single active risk", async () => {
  const { runInNewContext } = await import("node:vm");
  const script = read("src/scripts/risks.js");
  const element = (dataset, label = "") => ({
    dataset, textContent: label, hidden: false, attributes: {}, actions: {}, focused: false, scrolled: false,
    setAttribute(k,v) { this.attributes[k] = v; },
    addEventListener(k,fn) { this.actions[k] = fn; },
    focus() { this.focused = true; },
    scrollIntoView(opts) { this.scrolled = opts.behavior; },
    click() { this.actions.click(); }
  });
  const filters = [element({rsFilter:"all"},"All risks 3"),element({rsFilter:"work"},"Work & economy 1"),
    element({rsFilter:"misuse"},"Security & misuse 1"), element({rsFilter:"frontier"},"Advanced systems 1")];
  const cards = [element({rsRisk:"job-security",rsGroup:"work"}),element({rsRisk:"cyber",rsGroup:"misuse"}),
    element({rsRisk:"loss-control",rsGroup:"frontier"})];
  const panels = [element({rsPanel:"job-security"}),element({rsPanel:"cyber"}),element({rsPanel:"loss-control"})];
  const counter = {textContent:""};
  const root = {
    querySelectorAll(sel) { return sel==="[data-rs-filter]"?filters:sel==="[data-rs-risk]"?cards:panels; },
    querySelector(sel) { return sel==="[data-rs-count]"?counter:null; }
  };
  runInNewContext(script, {document:{querySelector:()=>root},window:{matchMedia:()=>({matches:true})}});
  assert.equal(cards[0].attributes["aria-pressed"],"true");
  assert.equal(panels.filter(x=>!x.hidden).length,1);
  assert.equal(counter.textContent,"Showing all 3 risks");
  filters[2].click();
  assert.equal(cards[0].hidden,true);
  assert.equal(cards[1].hidden,false);
  assert.equal(cards[1].attributes["aria-pressed"],"true");
  assert.equal(panels[1].hidden,false);
  assert.equal(panels[0].hidden,true);
  cards[1].click();
  assert.equal(panels[1].focused,true);
  assert.equal(panels[1].scrolled,"auto");
  filters[0].click();
  assert.equal(cards.filter(x=>!x.hidden).length,3);
  assert.equal(panels.filter(x=>!x.hidden).length,1);
});


test("AIIP-HISTORY-01 connects History and presents a sourced timeline and everyday examples", () => {
  const page = read("src/pages/explore/history.astro");
  const eras = read("src/data/history.ts");
  const style = read("src/styles/history.css");
  const script = read("src/scripts/history.js");
  const nav = read("public/discover/index.html");
  const notes = read("docs/design/AIIP-HISTORY-01-time-machine.md");
  assert.equal((eras.match(/id:"(?:questions|beginning|conversation|setbacks|chess|learning|everyday)",label:/g) || []).length, 7);
  assert.equal((eras.match(/year:"/g) || []).length, 12);
  for (const year of ["1943","1950","1956","1958","1966","1997","2012","2016","2017","2022"]) {
    assert.ok(eras.includes('year:"' + year + '"'));
  }
  const anchors = ['id="hi-title"','id="hi-thought-title"','id="time-machine"','class="hi-milestones"','id="everyday-ai"','class="hi-perspective"','class="hi-eli5"','class="hi-footer"'];
  const positions = anchors.map(anchor => page.indexOf(anchor));
  assert.ok(positions.every(position => position >= 0));
  assert.ok(positions.every((position, i) => i === 0 || position > positions[i-1]));
  for (const label of ["Snapchat Lenses","Email spam filters","What to watch next","Traffic predictions"]) assert.ok(page.includes(label),label);
  for (const source of ["help.snapchat.com/","blog.google/","help.netflix.com/","academic.oup.com/","ibm.com/history/deep-blue","research.google/"]) {
    assert.ok(page.includes(source) || eras.includes(source),source);
  }
  for (const token of ["data-hi-era={era.id}","data-hi-era-panel={era.id}","data-hi-everyday={item.id}","data-hi-everyday-panel={item.id}","hidden={i>0}"]) assert.ok(page.includes(token),token);
  assert.ok(page.includes('<details class="hi-milestone"'));
  assert.ok(page.includes('class="hi-eli5__scribble"'));
  assert.ok(page.includes('era.visual==="neuron"?"AI"'), "first History chapter must retain its owner-selected AI centerpiece");
  assert.ok(page.includes('<div class="hi-clock__center"><span>AI</span></div>'), "main History clock must retain its AI centerpiece");
  assert.ok(!page.includes("A conceptual illustration, not historical footage"), "decorative illustration captions stay removed");
  assert.ok(page.includes('not every algorithm, animation, or camera filter is AI'));
  assert.ok(style.includes("prefers-reduced-motion:reduce"));
  assert.ok(style.includes("grid-template-columns:repeat(7"));
  assert.ok(style.includes("@media(max-width:580px)"));
  assert.ok(script.includes('setAttribute("aria-pressed"'));
  assert.ok(nav.includes("url:'/explore/history'"));
  assert.ok(nav.includes("name:'Education & News'"));
  assert.ok(!page.includes("\u2014") && !eras.includes("\u2014"),"History prose contains an em dash");
  assert.ok(notes.includes("Snapchat"));
});



test("AIIP-HISTORY-01 selectors display one active chapter and one active everyday example", async () => {
  const { runInNewContext } = await import("node:vm");
  const script = read("src/scripts/history.js");
  const el = dataset => ({
    dataset, hidden:false, attrs:{}, actions:{}, focusCount:0,
    setAttribute(key,value) { this.attrs[key] = value; },
    addEventListener(key,fn) { this.actions[key] = fn; },
    focus() { this.focusCount++; },
    scrollIntoView() {},
    click() { this.actions.click(); }
  });
  const eras=[el({hiEra:"questions"}),el({hiEra:"learning"})];
  const eraPanels=[el({hiEraPanel:"questions"}),el({hiEraPanel:"learning"})];
  const examples=[el({hiEveryday:"lenses"}),el({hiEveryday:"navigation"})];
  const examplePanels=[el({hiEverydayPanel:"lenses"}),el({hiEverydayPanel:"navigation"})];
  const root={querySelectorAll(selector) {
    return ({
      "[data-hi-era]":eras,"[data-hi-era-panel]":eraPanels,
      "[data-hi-everyday]":examples,"[data-hi-everyday-panel]":examplePanels
    })[selector] || [];
  }};
  runInNewContext(script,{document:{querySelector:()=>root},window:{matchMedia:()=>({matches:true})}});
  assert.equal(eraPanels.filter(p=>!p.hidden).length,1);
  assert.equal(examplePanels.filter(p=>!p.hidden).length,1);
  eras[1].click();
  assert.equal(eras[1].attrs["aria-pressed"],"true");
  assert.equal(eraPanels[0].hidden,true);
  assert.equal(eraPanels[1].hidden,false);
  assert.equal(eraPanels[1].focusCount,1);
  examples[1].click();
  assert.equal(examplePanels[1].hidden,false);
  assert.equal(examplePanels[0].hidden,true);
  assert.equal(examplePanels[1].focusCount,1);
  eras[0].click();
  assert.equal(eraPanels.filter(p=>!p.hidden).length,1);
});



test("AIIP-COPY-01 keeps four topic pages conversational without intrusive art labels", () => {
  const pages = ["history", "benefits", "risks", "environment"];
  const sources = pages.map(name => read("src/pages/explore/" + name + ".astro"));
  const all = [
    ...sources, read("src/data/history.ts"), read("src/data/risks.ts")
  ];
  for (let i=0;i<all.length;i++) {
    assert.ok(!all[i].includes("\u2014"), "Em dash remains in page/data " + i);
  }
  const [history, benefits, risks, environment] = sources;
  for (const phrase of [
    "A conceptual illustration, not historical footage",
    "Simplified concept, not an actual app screenshot",
    "hi-era-illustration__caption", "hi-everyday__art-label"
  ]) assert.ok(!history.includes(phrase), "History still labels art: " + phrase);
  assert.match(history, /hi-everyday__art" aria-hidden="true"/);
  assert.match(history, /WHAT WE LEARNED/);
  for (const phrase of ["artNote", "Concept illustration", "bf-story__caption"]) {
    assert.ok(!benefits.includes(phrase), "Benefits still labels art: " + phrase);
  }
  assert.match(benefits, /THE BIGGER PICTURE/);
  assert.match(benefits, /trial tested one screening system/i);
  assert.match(benefits, /predictions, not confirmed lab results/i);
  assert.match(benefits, /bemyeyes\.com\/bme-ai/);
  assert.match(risks, /A prediction, not an observed job-loss rate/);
  assert.match(risks, /not proof AI caused a 19% job loss/);
  assert.match(risks, /Yale's Budget Lab found no clear evidence/);
  assert.match(environment, /not a measured data center/);
  assert.match(environment, /Data centers use different power sources and cooling systems/);
  assert.match(environment, /Withdrawal isn't consumption/);
  assert.match(environment, /Neither drawing presents measured volumes or a typical percentage split/);
  assert.doesNotMatch(benefits, /EXHIBIT 04/);
  assert.doesNotMatch(environment, /How to use this exhibit|This exhibit deliberately/);
});



test("AIIP-EDU-02 Education is the fifth entrance, with a real beginning-to-advanced learning path", () => {
  const page = read("src/pages/explore/education-news.astro");
  const data = read("src/data/education.ts");
  const css = read("src/styles/education-learning.css");
  const script = read("src/scripts/education.js");
  const news = read("src/pages/explore/news.astro");
  const nav = read("public/discover/index.html");
  assert.match(page, /<BaseLayout title="Learn AI \| Education & News"/);
  assert.match(page, /id="ed-title"/);
  assert.match(page, /id="learning-levels"/);
  assert.match(page, /id="learning-resources"/);
  assert.match(page, /id="ed-eli5-title"/);
  assert.match(page, /data-ed-root/);
  assert.match(page, /data-ed-jump=\{lane\.level\}/);
  assert.match(page, /data-ed-level=\{level\.id\}/);
  assert.match(page, /data-ed-panel=\{level\.id\}/);
  assert.match(page, /hidden=\{i>0\}/);
  assert.match(page, /data-ed-next=\{educationLevels\[i\+1\]\.id\}/);
  assert.match(page, /data-ed-filter="beginner"/);
  assert.match(page, /data-ed-filter="intermediate"/);
  assert.match(page, /data-ed-filter="advanced"/);
  assert.match(page, /data-ed-resource=\{resource\.level\}/);
  assert.match(page, /<details class="ed-concept">/);
  assert.match(page, /Keep in perspective:/);
  assert.match(page, /Read the source/);
  assert.match(page, /Visit resource/);
  assert.match(page, /href="\/explore\/news"/);
  assert.match(page, /href="\/discover\/"/);
  assert.match(data, /AI describes systems that can perform tasks/);
  assert.match(data, /Generative AI/);
  assert.match(data, /Artificial narrow intelligence \(ANI\)/);
  assert.match(data, /neural networks/i);
  assert.match(data, /Graphics processors \(GPUs\)/);
  assert.match(data, /Retrieval-augmented generation \(RAG\)/);
  assert.match(data, /MCP is an open standard/);
  assert.match(data, /Agents vs\. agentic workflows/);
  assert.match(data, /local model runs on equipment you control/);
  assert.equal((data.match(/id: "[a-z-]+", number: "/g)||[]).length,6,"six stages");
  assert.equal((data.match(/\{term:/g)||[]).length,24,"24 concept introductions");
  assert.equal((data.match(/\{id:"/g)||[]).length,10,"10 linked resources");
  for (const fragment of ["ai.google/learn-ai-skills/","www.coursera.org/articles/how-to-learn-artificial-intelligence/",
    "developers.google.com/machine-learning/crash-course","developer.amd.com/amd-ai-academy/",
    "www.youtube.com/watch?v=kCc8FmEb1nY","themultiverse.school/","lonelyoctopus.com/"]) {
    assert.ok(data.includes(fragment),fragment);
  }
  assert.match(css, /@media\(max-width:820px\)/);
  assert.match(css, /@media\(max-width:580px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.ed-world \[hidden\]\{display:none!important;\}/);
  assert.match(script, /setAttribute\("aria-pressed"/);
  assert.match(script, /panel\.hidden = panel\.dataset\.edPanel !== id/);
  assert.match(script, /card\.hidden = level !== "all"/);
  assert.match(nav, /name:'Education & News'.*url:'\/explore\/education-news'/);
  assert.match(news, /href="\/explore\/education-news"/);
  assert.ok(!page.includes("\u2014")&&!data.includes("\u2014")&&!news.includes("\u2014"),"no em dashes in the new copy");
  assert.ok(!page.includes("A conceptual illustration"));
  assert.doesNotMatch(page, /<iframe|rss-parser|\/api\/news/);
});

test("AIIP-EDU-02 keyboard-friendly level and resource controls isolate one selected level", async () => {
  const { runInNewContext } = await import("node:vm");
  const script = read("src/scripts/education.js");
  const node = dataset => ({
    dataset,hidden:false,attrs:{},handlers:{},focused:0,scrolled:0,
    setAttribute(key,value){this.attrs[key]=value;},
    addEventListener(type,cb){this.handlers[type]=cb;},
    focus(){this.focused++;},
    scrollIntoView(){this.scrolled++;},
    click(event={preventDefault(){}}){this.handlers.click(event);}
  });
  const buttons=[node({edLevel:"first-steps"}),node({edLevel:"connect-and-build"})];
  const panels=[node({edPanel:"first-steps"}),node({edPanel:"connect-and-build"})];
  const next=[node({edNext:"connect-and-build"})];
  const jump=[node({edJump:"connect-and-build"})];
  const filters=[node({edFilter:"all"}),node({edFilter:"advanced"})];
  const resources=[node({edResource:"beginner"}),node({edResource:"advanced"})];
  const root={querySelectorAll(selector){return ({
    "[data-ed-level]":buttons,"[data-ed-panel]":panels,
    "[data-ed-next]":next,"[data-ed-jump]":jump,
    "[data-ed-filter]":filters,"[data-ed-resource]":resources
  })[selector]||[];}};
  runInNewContext(script,{document:{querySelector:()=>root},window:{matchMedia:()=>({matches:true})}});
  buttons[1].click();
  assert.equal(buttons[1].attrs["aria-pressed"],"true");
  assert.equal(buttons[0].attrs["aria-pressed"],"false");
  assert.equal(panels[0].hidden,true);
  assert.equal(panels[1].hidden,false);
  assert.equal(panels[1].focused,1);
  buttons[0].click();
  next[0].click();
  assert.equal(panels.filter(p=>!p.hidden).length,1);
  assert.equal(panels[1].hidden,false);
  filters[1].click();
  assert.equal(filters[1].attrs["aria-pressed"],"true");
  assert.equal(resources[0].hidden,true);
  assert.equal(resources[1].hidden,false);
  filters[0].click();
  assert.equal(resources.filter(p=>!p.hidden).length,2);
  jump[0].click();
  assert.equal(panels[1].hidden,false);
});

test("AIIP-EDU-02 News retains the protected arcade while real RSS stays deferred", async () => {
  const page=read("src/pages/explore/news.astro");
  const css=read("src/styles/education-news.css");
  const arcade=read("public/arcade/education-news-fighter.html");
  const license=read("public/licenses/instalanding-MIT-LICENSE.txt");
  assert.match(page, /<BaseLayout title="AI News \| Coming Soon"/);
  assert.match(page, /<SiteHeader subtle \/>/);
  assert.match(page, /id="en-title"/);
  assert.match(page, /COMING <span>SOON<\/span>/);
  assert.match(page, /id="arcade"/);
  assert.match(page, /id="what-is-next"/);
  assert.match(page, /data-en-replay/);
  assert.match(page, /<iframe[^>]*src="\/arcade\/education-news-fighter\.html"[^>]*sandbox="allow-scripts"/);
  assert.match(page, /tabindex="-1" sandbox="allow-scripts"/);
  assert.doesNotMatch(page, /sandbox="[^"]*allow-same-origin/);
  assert.match(page, /RSS IS PLANNED \/ NO LIVE HEADLINES YET/);
  assert.match(page, /MIT-LICENSE\.txt/);
  assert.match(page, /href="\/explore\/education-news"/);
  assert.match(page, /Anthropic/);
  assert.doesNotMatch(page, /<article[^>]*data-(?:news|rss)-item|rss-parser|api\/news/);
  assert.match(css, /\.en-arcade__frame/);
  assert.match(css, /\.en-section-switch/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(arcade, /<canvas id="fighter"/);
  assert.match(arcade, /<article id="gamepad"/);
  assert.match(arcade, /window\.__renderAt/);
  assert.match(arcade, /prefers-reduced-motion: reduce/);
  assert.match(license, /Copyright \(c\) 2026 Ray Velez/);

  const { runInNewContext } = await import("node:vm");
  const script = page.split("<script>")[1]?.split("</script>")[0];
  assert.ok(script&&script.includes("replayButton.addEventListener"));
  const events={},links=[];
  const button={addEventListener(name,fn){events[name]=fn;}};
  const frame={setAttribute(name,value){links.push({name,value});}};
  runInNewContext(script,{document:{querySelector:()=>button,getElementById:()=>frame}});
  events.click();events.click();
  assert.deepEqual(links,[
    {name:"src",value:"/arcade/education-news-fighter.html?replay=1"},
    {name:"src",value:"/arcade/education-news-fighter.html?replay=2"}
  ]);
});

test("AIIP-RELEASE-01 museum wording is absent from shared live navigation and links reach real pages", () => {
  const header=read("src/components/SiteHeader.astro");
  const methodology=read("src/pages/methodology.astro");
  const fallback=read("src/pages/explore/[slug].astro");
  assert.match(header, /href="\/discover\/" aria-label="AI in Perspective, explore the perspectives"/);
  assert.match(header, /href="\/discover\/">Explore<\/a>/);
  assert.match(header, /href="\/explore\/history">The story<\/a>/);
  assert.match(header, /href="\/methodology">Our approach<\/a>/);
  assert.match(header, /href="\/intro" class="header-quiet">Replay opening/);
  assert.doesNotMatch(header, /museum|Exhibits|href="\/#exhibits"/i);
  assert.match(methodology, /href="\/discover\/" class="back-link">← All perspectives/);
  assert.match(methodology, /BEHIND THE RESEARCH/);
  assert.doesNotMatch(methodology, /museum|BEHIND THE EXHIBITS/i);
  assert.match(fallback, /href="\/discover\/" class="back-link">← All perspectives/);
  assert.match(fallback, /PAGE STATUS/);
  assert.doesNotMatch(fallback, /Back to the museum|EXHIBIT STATUS/);
  for(const text of [header,methodology,fallback])assert.ok(!text.includes("\u2014"));
});

test("AIIP-RELEASE-01 preserves MIT license and creator credit for the arcade animation", () => {
  const license=read("public/licenses/instalanding-MIT-LICENSE.txt");
  const animation=read("public/arcade/education-news-fighter.html");
  const page=read("src/pages/explore/news.astro");
  assert.match(license, /^MIT License/);
  assert.match(license, /Copyright \(c\) 2026 Ray Velez/);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.match(license, /copies or substantial portions of the Software/);
  assert.match(animation, /instalanding\.ai\/m\/pixel-fighter-combo\.txt/);
  assert.match(animation, /licenses\/instalanding-MIT-LICENSE\.txt/);
  assert.match(page, /href="\/licenses\/instalanding-MIT-LICENSE\.txt"/);
  assert.match(page, /Animation license and credit/);
  assert.match(page, /sandbox="allow-scripts"/);
  assert.match(page, /RSS IS PLANNED \/ NO LIVE HEADLINES YET/);
  assert.ok(!page.includes("\u2014"),"Site copy must not use em dashes");
});


test("AIIP-SHARE-01 social card is a real 1200x630 JPEG with canonical Open Graph metadata", () => {
  const image = readFileSync(join(root,"public/social/ai-in-perspective-og.jpg"));
  assert.ok(image.length > 30000 && image.length < 500000, "social JPEG is optimized and nonempty");
  assert.equal(image[0],0xff);
  assert.equal(image[1],0xd8);
  assert.equal(image.at(-2),0xff);
  assert.equal(image.at(-1),0xd9);
  let width=0, height=0, i=2;
  while(i < image.length-8) {
    if(image[i] !== 0xff) {i++;continue;}
    while(image[i] === 0xff) i++;
    const marker=image[i++];
    if(marker===0xd9||marker===0xda) break;
    if(marker===0x01 || (marker>=0xd0 && marker<=0xd7))continue;
    const length=image.readUInt16BE(i);
    if(length < 2 || i + length > image.length) break;
    if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
      height=image.readUInt16BE(i+3);width=image.readUInt16BE(i+5);break;
    }
    i+=length;
  }
  assert.deepEqual([width,height],[1200,630]);

  const layout=read("src/layouts/BaseLayout.astro");
  const discover=read("public/discover/index.html");
  const home=read("src/pages/index.astro");
  const imageUrl="https://ai-in-perspective.vercel.app/social/ai-in-perspective-og.jpg";
  assert.ok(layout.includes('const socialImageUrl = "'+imageUrl+'"'));
  assert.match(layout,/property="og:image" content=\{socialImageUrl\}/);
  assert.match(layout,/property="og:image:secure_url" content=\{socialImageUrl\}/);
  assert.match(layout,/property="og:image:type" content="image\/jpeg"/);
  assert.match(layout,/property="og:image:width" content="1200"/);
  assert.match(layout,/property="og:image:height" content="630"/);
  assert.match(layout,/property="og:image:alt"/);
  assert.match(layout,/property="og:url" content=\{canonicalUrl\}/);
  assert.match(layout,/rel="canonical" href=\{canonicalUrl\}/);
  assert.match(layout,/name="twitter:card" content="summary_large_image"/);
  assert.match(layout,/name="twitter:image" content=\{socialImageUrl\}/);
  assert.match(layout,/name="twitter:image:alt"/);
  assert.ok(discover.includes('property="og:image" content="'+imageUrl+'"'));
  assert.ok(discover.includes('name="twitter:image" content="'+imageUrl+'"'));
  assert.match(discover,/property="og:url" content="https:\/\/ai-in-perspective\.vercel\.app\/discover\/"/);
  assert.match(discover,/name="twitter:card" content="summary_large_image"/);
  assert.match(home,/A guided look at AI through history, benefits, risks, and the environment\./);
  assert.match(layout,/name="robots" content="noindex, nofollow"/);
  assert.match(discover,/name="robots" content="noindex, nofollow"/);
});


test("AIIP-EDU-02B audits all 24 learning concepts while protecting caveats and source links", () => {
  const data=read("src/data/education.ts");
  const concepts=data.split("\n").filter(line=>line.trimStart().startsWith("{term:"));
  assert.equal(concepts.length,24,"all 24 concept introductions must remain present");
  for (const [index,line] of concepts.entries()) {
    for (const field of ["term:","plain:","example:","note:","source:","sourceLabel:"]) {
      assert.ok(line.includes(field),"concept "+(index+1)+" missing "+field);
    }
  }
  assert.match(data,/A chatbot is software you can talk to by typing or speaking/);
  assert.doesNotMatch(data,/A help chatbot might walk you through a return, while a language model/);
  assert.match(data,/Artificial general intelligence \(AGI\) is a disputed idea/);
  assert.match(data,/Retrieval-augmented generation \(RAG\)/);
  assert.match(data,/MCP is an open standard/);
  assert.equal((data.match(/previewNote:/g)||[]).length,10);
  assert.equal((data.match(/firstStep:/g)||[]).length,10);
});

test("AIIP-EDU-02B exposes ten first-party resource previews without copying provider pages", () => {
  const data=read("src/data/education.ts");
  const page=read("src/pages/explore/education-news.astro");
  const preview=read("src/pages/learn/[id].astro");
  const css=read("src/styles/resource-preview.css");
  const ids=[...data.matchAll(/^\s*\{id:"([^"]+)"/gm)].map(match=>match[1]);
  assert.equal(ids.length,10);
  assert.equal(new Set(ids).size,10);
  assert.match(page,/href=\{"\/learn\/"\+resource\.id\}/);
  assert.match(page,/View preview/);
  assert.match(page,/Visit resource/);
  assert.match(preview,/getStaticPaths\(\)/);
  assert.match(preview,/educationResources\.map/);
  assert.match(preview,/params: \{ id: resource\.id \}/);
  assert.match(preview,/resource\.previewNote/);
  assert.match(preview,/resource\.firstStep/);
  assert.match(preview,/target="_blank" rel="noopener noreferrer"/);
  assert.match(preview,/does not reproduce the provider's course page/);
  assert.match(css,/max-width:520px/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.doesNotMatch(preview,/<iframe|fetch\(|<img|<script/);
});

test("AIIP-EDU-02B gives Education and News distinct non-starry hero compositions", () => {
  const edu=read("src/pages/explore/education-news.astro");
  const news=read("src/pages/explore/news.astro");
  const eduStyle=read("src/styles/education-learning.css");
  const newsStyle=read("src/styles/education-news.css");
  assert.match(edu,/ed-studio__folio/);
  assert.match(edu,/ed-studio__diagram/);
  assert.doesNotMatch(edu,/ed-graphic__orbit|ed-graphic__core/);
  assert.match(news,/en-bulletin__headline/);
  assert.match(news,/en-bulletin__row/);
  assert.doesNotMatch(news,/en-hero__signal-orbit|en-hero__signal-core/);
  assert.match(eduStyle,/\.ed-ambient::before\{[^\n]*repeating-linear-gradient/);
  assert.match(newsStyle,/\.en-sky::before\{[^\n]*repeating-linear-gradient/);
  assert.match(news,/<iframe[^>]*sandbox="allow-scripts"/);
  assert.match(news,/Replay animation/);
});
