import * as THREE from "three";

// AIIP-CORE-01A. Real 3D geometry with a fixed, deliberately composed camera.
// No external textures, generated stills, fetched data, shaders or paid assets.
export function mountCoreScene(stage, { onStatus } = {}) {
  const canvas = stage.querySelector("[data-core-canvas]");
  const motionButton = document.querySelector("[data-core-motion]");
  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const resources = new Set();
  const track = (resource) => { resources.add(resource); return resource; };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: false,
      powerPreference: "low-power", preserveDrawingBuffer: false
    });
  } catch {
    stage.dataset.coreState = "unavailable";
    if (motionButton) motionButton.disabled = true;
    onStatus?.("3D graphics are unavailable. All six exhibit links remain accessible.");
    return () => {};
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.26;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.setClearColor(0x050a12, 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07101b);
  scene.fog = new THREE.FogExp2(0x08131f, 0.015);
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 80);
  camera.position.set(0, 4.45, 18.2);
  const focus = new THREE.Vector3(0, 2.85, -4.1);
  camera.lookAt(focus);
  const pointer = { x: 0, y: 0 };
  scene.add(new THREE.HemisphereLight(0x9ec4e6, 0x121820, 2.0));
  const key = new THREE.DirectionalLight(0xf4f1df, 3.2);
  key.position.set(-7, 12, 8);
  scene.add(key);
  const cool = new THREE.PointLight(0x66b6d8, 18, 14, 2);
  cool.position.set(0, 5.5, 2.5);
  scene.add(cool);
  const warm = new THREE.PointLight(0xffb76c, 13, 13, 2);
  warm.position.set(-8, 4.3, -1.5);
  scene.add(warm);

  const mat = (hex, roughness = 0.72, metalness = 0.22, extra = {}) =>
    track(new THREE.MeshStandardMaterial({ color: hex, roughness, metalness, ...extra }));
  const graphite = mat(0x131d28, .76, .38);
  const concrete = mat(0x29333c, .94, .12);
  const steel = mat(0x53626d, .49, .68);
  const black = mat(0x060b10, .68, .25);
  const copper = mat(0x9b7453, .41, .78);
  const faintGlass = mat(0x233e53, .12, .18, { transparent: true, opacity: .34, depthWrite: false });
  const light = (hex, intensity = 1.2) => track(new THREE.MeshBasicMaterial({ color: hex, toneMapped: intensity < 1.5 }));
  const ice = light(0x7bcbe1);
  const amber = light(0xf1ac66);
  const materialCache = new Map();

  function box(group, w, h, d, x, y, z, material) {
    const m = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), material);
    m.position.set(x, y, z);
    group.add(m);
    return m;
  }
  function ring(group, radius, tube, x, y, z, material, plane = "horizontal") {
    const m = new THREE.Mesh(track(new THREE.TorusGeometry(radius, tube, 7, 96)), material);
    m.position.set(x, y, z);
    if (plane === "horizontal") m.rotation.x = Math.PI / 2;
    group.add(m);
    return m;
  }

  // Build the room as physical meshes. The stage has no flat scene image.
  box(scene, 27, .3, 21, 0, -.25, -2.6, concrete);
  box(scene, 27, 9.0, .55, 0, 4.0, -12.3, graphite);
  box(scene, .55, 9.0, 21, -13.2, 4.0, -2.6, graphite);
  box(scene, .55, 9.0, 21, 13.2, 4.0, -2.6, graphite);
  box(scene, 25, .45, 1.4, 0, 4.14, -9.8, concrete);
  box(scene, 25, .22, 1.25, 0, 4.35, -9.3, steel);
  box(scene, 26, .55, 21, 0, 8.35, -2.6, graphite);

  // Architectural pillars, walkways, recessed ceiling fixtures.
  for (const x of [-11.2, -6.3, 6.3, 11.2]) {
    box(scene, .62, 8.3, .72, x, 3.95, -9.0, concrete);
    box(scene, .11, 8.3, .12, x + .36, 3.95, -8.55, steel);
  }
  for (const y of [1.16, 4.47, 7.68]) {
    box(scene, 24, .11, .12, 0, y, -8.95, copper);
  }
  for (const x of [-9, -3.0, 3.0, 9]) {
    box(scene, .06, 3.0, .06, x, 5.85, -7.15, steel);
  }
  box(scene, 23.0, .06, .08, 0, 4.4, -7.1, steel);
  for (let x = -11; x <= 11; x += 2.2) {
    box(scene, 1.2, .03, 10.5, x, -.065, -3.5, graphite);
  }

  // Core plinth and electrically conductive hoops.
  const baseMat = mat(0x243b4a, .57, .54);
  const column = new THREE.Group();
  column.position.set(0, .02, -3.2);
  scene.add(column);
  const plinth = new THREE.Mesh(track(new THREE.CylinderGeometry(2.72, 2.94, .58, 48)), steel);
  plinth.position.y = .32;
  column.add(plinth);
  const lowerStep = new THREE.Mesh(track(new THREE.CylinderGeometry(3.38, 3.50, .20, 60)), concrete);
  lowerStep.position.y = .03;
  column.add(lowerStep);
  const upperRing = new THREE.Mesh(track(new THREE.CylinderGeometry(2.86, 2.82, .23, 48)), copper);
  upperRing.position.y = 5.10;
  column.add(upperRing);
  const roof = new THREE.Mesh(track(new THREE.CylinderGeometry(3.16, 3.16, .15, 60)), steel);
  roof.position.y = 5.33;
  column.add(roof);
  ring(column, 3.10, .025, 0, 5.21, 0, amber);
  ring(column, 3.00, .020, 0, .49, 0, ice);
  ring(column, 3.25, .022, 0, .05, 0, amber);
  ring(column, 2.44, .014, 0, 3.92, 0, copper);
  const spine = new THREE.Mesh(track(new THREE.CylinderGeometry(.62, .62, 4.6, 24)), baseMat);
  spine.position.y = 2.72;
  column.add(spine);
  // Instanced server units use world-space matrices; update the parent transform first.
  column.updateMatrixWorld(true);

  // Eight distinct racks, actual 3D cabinets and module fronts.
  // Repeated drive bays and LED indicators are instanced for low draw-call count.
  const units = 10;
  const bladeGeometry = track(new THREE.BoxGeometry(.69, .22, .06));
  const bladeMaterial = mat(0x1a2c39, .46, .54);
  const bladeMesh = new THREE.InstancedMesh(bladeGeometry, bladeMaterial, units * 8);
  const ledGeometry = track(new THREE.BoxGeometry(.065, .055, .035));
  const ledMesh = new THREE.InstancedMesh(ledGeometry, light(0xf3ffff), units * 8);
  const dummy = new THREE.Object3D();
  const indicators = [];
  let count = 0;
  const ledBright = new THREE.Color(0xa4edf0);
  const ledWarm = new THREE.Color(0xe6a772);
  const ledDim = new THREE.Color(0x19383f);
  let lastLedStep = -1;
  for (let side = 0; side < 8; side++) {
    const angle = side * Math.PI / 4;
    const rack = new THREE.Group();
    rack.position.set(Math.sin(angle) * 1.63, .62, Math.cos(angle) * 1.63);
    rack.rotation.y = angle;
    column.add(rack);
    box(rack, .99, 4.15, .72, 0, 2.08, 0, black);
    box(rack, .92, .05, .82, 0, 4.15, 0, steel);
    box(rack, .08, 3.9, .82, -.49, 2.10, 0, steel);
    box(rack, .08, 3.9, .82, .49, 2.10, 0, steel);
    box(rack, .90, 3.75, .04, 0, 2.08, .38, graphite);
    for (let row = 0; row < units; row++) {
      const y = .40 + row * .335;
      rack.updateMatrixWorld(true);
      dummy.position.set(0, y, .427);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      rack.localToWorld(dummy.position);
      dummy.rotation.y = angle;
      dummy.updateMatrix();
      bladeMesh.setMatrixAt(count, dummy.matrix);
      dummy.position.set(.32, y, .472);
      rack.localToWorld(dummy.position);
      dummy.rotation.y = angle;
      dummy.updateMatrix();
      ledMesh.setMatrixAt(count, dummy.matrix);
      indicators.push({ index: count, seed: side * 17 + row * 11 });
      count++;
    }
  }
  bladeMesh.instanceMatrix.needsUpdate = true;
  ledMesh.instanceMatrix.needsUpdate = true;
  scene.add(bladeMesh, ledMesh);
  // Three separate conductor traces run up the central tower in real 3D space.
  const streams = [];
  for (let k = 0; k < 3; k++) {
    const points = [];
    for (let n = 0; n <= 120; n++) {
      const t = n / 120;
      const theta = t * Math.PI * 6 + (k * Math.PI * 2) / 3;
      const radius = 2.24;
      points.push(new THREE.Vector3(radius * Math.cos(theta), .72 + t * 4.12, radius * Math.sin(theta)));
    }
    const path = new THREE.CatmullRomCurve3(points);
    const conductor = new THREE.Mesh(track(new THREE.TubeGeometry(path, 250, .012, 4, false)), k % 2 ? copper : steel);
    column.add(conductor);
    const pulse = new THREE.Mesh(track(new THREE.SphereGeometry(.067, 10, 8)), k === 1 ? amber : ice);
    column.add(pulse);
    streams.push({ path, pulse, offset: k / 3 });
  }

  // Genuine spherical globe in its own physical wall display.
  const screen = new THREE.Group();
  screen.position.set(5.24, 5.77, -8.0);
  scene.add(screen);
  box(screen, 4.1, 2.56, .16, 0, 0, -.28, black);
  box(screen, 4.26, .09, .24, 0, 1.29, -.20, steel);
  box(screen, 4.26, .09, .24, 0, -1.29, -.20, steel);
  box(screen, .10, 2.59, .24, -2.13, 0, -.20, steel);
  box(screen, .10, 2.59, .24, 2.13, 0, -.20, steel);
  const globe = new THREE.Group();
  globe.position.set(-.18, .02, .35);
  screen.add(globe);
  const globeMaterial = mat(0x175674, .64, .22, { emissive: 0x071c38, emissiveIntensity: .5 });
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(.98, 48, 32)), globeMaterial));
  const wire = new THREE.Mesh(
    track(new THREE.SphereGeometry(.993, 32, 20)),
    track(new THREE.MeshBasicMaterial({ color: 0x8dcbec, wireframe: true, transparent: true, opacity: .19, depthWrite: false }))
  );
  globe.add(wire);
  // Longitude/latitude location pins are decorative and not sourced geographic claims.
  const network = new THREE.Group();
  globe.add(network);
  const pinGeo = track(new THREE.SphereGeometry(.025, 6, 5));
  const pinMat = light(0xb1e9ef);
  const latlon = [[42,-74],[52,13],[35,139],[-23,-46],[28,77],[1,103],[-34,18],[38,-122]];
  for (const [latitude, longitude] of latlon) {
    const phi = (90 - latitude) * Math.PI / 180;
    const theta = longitude * Math.PI / 180;
    const pin = new THREE.Mesh(pinGeo, pinMat);
    pin.position.set(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
    network.add(pin);
  }
  ring(screen, 1.08, .014, -.18, .01, .36, ice, "vertical");
  const tics = [];
  for (let i = 0; i < 5; i++) {
    const m = box(screen, .54, .035, .05, 1.1, -.66 + i * .27, 0, i === 3 ? amber : ice);
    tics.push(m);
  }

  // Six actual recessed 3D bays, not six floating cards or an imported image.
  const bayData = [
    { x:-8.55, y:5.45, z:-8.4, tone:0xe19376, kind:"risks" },
    { x:-8.55, y:2.15, z:-8.4, tone:0xb6a5d9, kind:"consciousness" },
    { x:-4.64, y:5.48, z:-9.5, tone:0x84bac0, kind:"environment" },
    { x: 4.64, y:2.15, z:-9.5, tone:0xdbbc83, kind:"benefits" },
    { x: 8.55, y:5.45, z:-8.4, tone:0xb9b3ce, kind:"misconceptions" },
    { x: 8.55, y:2.15, z:-8.4, tone:0x8cbca9, kind:"agents-security" },
  ];
  const bayAccents = [];
  function addBay({x,y,z,tone,kind}, i) {
    const bay = new THREE.Group();
    bay.position.set(x, y, z);
    scene.add(bay);
    const glowMaterial = track(new THREE.MeshBasicMaterial({color:tone, transparent:true, opacity:.68}));
    const roomMat = materialCache.get(kind) || mat(0x1b2a36, .83, .1);
    materialCache.set(kind, roomMat);
    box(bay, 2.33, 1.98, .84, 0, 0, -.35, black);
    box(bay, 2.10, 1.70, .015, 0, -.02, .065, roomMat);
    box(bay, 2.54, .11, .25, 0, 1.01, .08, concrete);
    box(bay, 2.54, .11, .25, 0, -1.01, .08, concrete);
    box(bay, .12, 2.1, .26, -1.27, 0, .08, steel);
    box(bay, .12, 2.1, .26, 1.27, 0, .08, steel);
    const accent = box(bay, 2.1, .035, .03, 0, -.9, .19, glowMaterial);
    bayAccents.push(accent);
    const artifact = new THREE.Group();
    artifact.position.z = .20;
    bay.add(artifact);
    const shapeMat = mat(tone, .55, .40, { emissive: tone, emissiveIntensity: .065 });
    if (kind === "risks") {
      for (let j=0;j<5;j++) box(artifact,.12,.2+j*.19,.16,-.67+j*.33,-.38+j*.06,0,shapeMat);
      ring(artifact,.49,.015,0,.09,0,glowMaterial,"vertical");
    } else if (kind === "consciousness") {
      ring(artifact,.48,.026,0,.02,0,shapeMat,"vertical");
      const r=ring(artifact,.45,.018,0,.02,0,glowMaterial,"vertical");
      r.rotation.y=.58;
    } else if (kind === "environment") {
      for(let j=-1;j<=1;j++) box(artifact,.12,1.18,.14,j*.32,0,0,shapeMat);
      ring(artifact,.49,.023,0,.03,.15,glowMaterial,"vertical");
    } else if (kind === "benefits") {
      for(let j=0;j<4;j++) box(artifact,.18,.3+j*.22,.20,-.54+j*.35,-.43+j*.11,0,shapeMat);
    } else if (kind === "misconceptions") {
      const prism = new THREE.Mesh(track(new THREE.ConeGeometry(.58,1.14,3)),shapeMat);
      prism.rotation.z=Math.PI;artifact.add(prism);
      box(artifact,.85,.025,.02,.07,.15,.15,glowMaterial);
    } else {
      const oct = new THREE.Mesh(track(new THREE.OctahedronGeometry(.59)),shapeMat);
      artifact.add(oct);
      ring(artifact,.45,.022,0,0,.18,glowMaterial,"vertical");
    }
    return {bay,accent,kind,index:i};
  }
  const bays = bayData.map(addBay);

  // The scene uses a physical floor conductor with moving nodes (not overlay graphics).
  const railCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, .02, 3.2),
    new THREE.Vector3(-5, .02, 2.1),
    new THREE.Vector3(0, .02, 2.55),
    new THREE.Vector3(5, .02, 2.1),
    new THREE.Vector3(10, .02, 3.2),
  ]);
  const floorRail = new THREE.Mesh(track(new THREE.TubeGeometry(railCurve,100,.018,5,false)),copper);
  scene.add(floorRail);
  const railNode = new THREE.Mesh(track(new THREE.SphereGeometry(.065,10,8)),ice);
  scene.add(railNode);

  let disposed = false;
  let paused = false;
  let visible = true;
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  let focalBay = null;
  let resizeObserver;
  let pointerX = 0, pointerY = 0;
  const motionEnabled = () => !reducedQuery.matches && !paused && visible && !document.hidden && !disposed;

  function resize() {
    if (disposed) return;
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    const cap = 2200000;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.4, Math.sqrt(cap / (width * height)));
    renderer.setPixelRatio(Math.max(.75,ratio));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Mobile is an authored closer camera framing, not a cropped desktop bitmap.
    camera.fov = width < 600 ? 53 : 39;
    camera.position.z = width < 600 ? 20.6 : 18.2;
    camera.updateProjectionMatrix();
    render();
  }
  function draw(time) {
    if (!motionEnabled()) { raf = 0; return; }
    const delta = Math.min(.05, Math.max(0,(time - (last || time)) / 1000));
    last = time;
    elapsed += delta;
    globe.rotation.y = elapsed * .18;
    globe.rotation.z = .11;
    const ledStep = Math.floor(elapsed * 4);
    if (ledStep !== lastLedStep) {
      lastLedStep = ledStep;
      for (const { index, seed } of indicators) {
        // Low-frequency deterministic light activity: no hard flashing or strobe.
        const value = Math.sin(seed * 9.41 + ledStep * .57);
        ledMesh.setColorAt(index, value > .48 ? ledWarm : value > -.45 ? ledBright : ledDim);
      }
      ledMesh.instanceColor.needsUpdate = true;
    }
    for (const { path, pulse, offset } of streams) {
      pulse.position.copy(path.getPoint((elapsed * .065 + offset) % 1));
    }
    railNode.position.copy(railCurve.getPoint((elapsed * .035) % 1));
    for (const b of bays) {
      b.accent.material.opacity = b.kind === focalBay ? .95 : .42 + .11*Math.sin(elapsed * .6 + b.index);
    }
    cool.intensity = 17.5 + 1.4*Math.sin(elapsed * 1.1);
    camera.position.x += ((pointerX*.24) - camera.position.x) * .018;
    camera.position.y += ((4.45 + pointerY*.10) - camera.position.y) * .018;
    camera.lookAt(focus);
    render();
    raf = window.requestAnimationFrame(draw);
  }
  function render() { renderer.render(scene,camera); }
  function schedule() {
    window.cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    if (motionEnabled()) raf = window.requestAnimationFrame(draw);
    else if (!disposed) render();
  }
  function onMove(e) {
    const bounds=stage.getBoundingClientRect();
    pointerX = Math.max(-1,Math.min(1,((e.clientX-bounds.left)/bounds.width)*2-1));
    pointerY = Math.max(-1,Math.min(1,((e.clientY-bounds.top)/bounds.height)*2-1));
  }
  function onExit() { pointerX=0;pointerY=0; }
  function onFocus(e) {
    focalBay = e.target.closest("[data-exhibit-visual]")?.getAttribute("data-exhibit-visual") || null;
  }
  function onBlur() { focalBay = null; }
  function onMotion() {
    if (reducedQuery.matches) return;
    paused = !paused;
    motionButton.setAttribute("aria-pressed", String(!paused));
    motionButton.textContent = paused ? "Resume ambient motion" : "Pause ambient motion";
    schedule();
  }
  function onReduced() {
    if (motionButton) {
      motionButton.disabled = reducedQuery.matches;
      motionButton.textContent = reducedQuery.matches ? "Motion limited by system settings" : paused ? "Resume ambient motion" : "Pause ambient motion";
      motionButton.setAttribute("aria-pressed", String(!paused && !reducedQuery.matches));
    }
    schedule();
  }
  function onVisibility(){ schedule(); }
  function onContextLost(e) {
    e.preventDefault();
    visible = false;
    window.cancelAnimationFrame(raf);
    stage.dataset.coreState = "unavailable";
    onStatus?.("3D graphics context was lost. Topic links remain available; reload to retry.");
  }
  stage.addEventListener("pointermove", onMove, {passive:true});
  stage.addEventListener("pointerleave", onExit);
  stage.addEventListener("focusin", onFocus);
  stage.addEventListener("focusout", onBlur);
  canvas.addEventListener("webglcontextlost", onContextLost);
  motionButton?.addEventListener("click", onMotion);
  reducedQuery.addEventListener("change", onReduced);
  document.addEventListener("visibilitychange", onVisibility);
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
  } else window.addEventListener("resize", resize);
  onReduced();
  resize();
  stage.dataset.coreState = "ready";
  onStatus?.("Live 3D study loaded. Animated server core and rotating globe are illustrative.");
  const visibilityObserver = new IntersectionObserver((entries)=>{
    visible = entries[0]?.isIntersecting ?? true;
    schedule();
  },{threshold: .01});
  visibilityObserver.observe(stage);
  schedule();

  return () => {
    disposed = true;
    window.cancelAnimationFrame(raf);
    visibilityObserver.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("resize",resize);
    stage.removeEventListener("pointermove",onMove);
    stage.removeEventListener("pointerleave",onExit);
    stage.removeEventListener("focusin",onFocus);
    stage.removeEventListener("focusout",onBlur);
    canvas.removeEventListener("webglcontextlost",onContextLost);
    motionButton?.removeEventListener("click",onMotion);
    reducedQuery.removeEventListener("change",onReduced);
    document.removeEventListener("visibilitychange",onVisibility);
    for (const obj of resources) obj.dispose?.();
    renderer.dispose();
  };
}
