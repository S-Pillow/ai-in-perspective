import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

// Designed, contained visual proof: real original glTF geometry, not the old core scene.
const CHAPTERS = [
  {tag:'01 / DEPARTURE', title:'Beyond the noise.\nInto perspective.', text:"We're setting out to understand one of the technologies reshaping our world: artificial intelligence."},
  {tag:'02 / OUR ORIGINS', title:'A story decades\nin the making.', text:"AI didn't appear overnight. Its history stretches through generations of ideas, discoveries, setbacks and breakthroughs."},
  {tag:'03 / THE POSSIBILITY', title:'What becomes\npossible?', text:'Today, AI is changing how people work, learn and create. Some benefits are measurable. Other promises still need to be tested.'},
  {tag:'04 / THE QUESTIONS', title:'Risks that deserve\nserious answers.', text:'What could go wrong? What safeguards exist? Where are we still falling short? Understanding the risks is part of understanding AI.'},
  {tag:'05 / STAY CURIOUS', title:'Keep asking.\nKeep learning.', text:'Education helps us make sense of AI. New developments arrive quickly, and not every headline tells the full story.'},
  {tag:'06 / ARRIVAL', title:'The journey\nis yours.', text:'Explore the history, risks, benefits, education and evolving story of AI. Choose the questions that matter to you.'},
];
const BEAT_SECONDS=5.5;
const MAX_PIXEL_RATIO=1.5;
function lerp(a,b,t){return a+(b-a)*t;}
function createSpace(renderer,canvas,motion,onStatus){
  const tracked=[];
  const remember=x=>(tracked.push(x),x);
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x071524);
  const camera=new THREE.PerspectiveCamera(43,1,.1,380);
  const sky=remember(new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{uTime:{value:0}},vertexShader:`varying vec3 vPos; void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`precision highp float; varying vec3 vPos;uniform float uTime;void main(){vec3 d=normalize(vPos);float a=clamp(d.y*.55+.5,0.,1.);vec3 deep=vec3(.015,.052,.102);vec3 mid=vec3(.083,.15,.224);vec3 warm=vec3(.21,.14,.20);vec3 c=mix(warm,deep,smoothstep(.08,.84,a));c+=mid*(1.-smoothstep(-.2,.75,d.y))*.22;float haze=pow(max(0.,1.-abs(d.y+.11)*2.2),3.);c+=vec3(.21,.19,.17)*haze*.30;float ribbon=sin(d.x*4.+d.z*2.+sin(d.y*9.))*sin(d.y*8.+d.x*3.);c+=vec3(.06,.13,.16)*haze*max(ribbon,0.)*.14;gl_FragColor=vec4(c,1.);}` }));
  const skyMesh=remember(new THREE.Mesh(remember(new THREE.SphereGeometry(185,48,24)),sky));
  scene.add(skyMesh);
  // The stellar field uses deterministic scatter, so all view states are reproducible.
  let seed=91;const rand=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
  const pts=[];
  for(let i=0;i<850;i++){
    const theta=rand()*Math.PI*2,u=rand()*2-1,r=70+rand()*88;
    pts.push(r*Math.sqrt(1-u*u)*Math.cos(theta),r*u,r*Math.sqrt(1-u*u)*Math.sin(theta));
  }
  const starGeo=remember(new THREE.BufferGeometry());
  starGeo.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
  const stars=remember(new THREE.Points(starGeo,remember(new THREE.PointsMaterial({color:0xd2f4f5,size:.48,transparent:true,opacity:.78,sizeAttenuation:true,depthWrite:false}))));
  scene.add(stars);

  const planetMaterial=remember(new THREE.ShaderMaterial({vertexShader:`varying vec3 vNormal;varying vec3 vPos;void main(){vNormal=normalize(normalMatrix*normal);vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec3 vNormal;varying vec3 vPos;void main(){float v=normalize(vPos).y;float stripe=sin(v*28.+sin(v*13.)*.75)*.055;vec3 teal=vec3(.075,.31,.32);vec3 low=vec3(.02,.095,.155);vec3 stone=vec3(.29,.22,.29);vec3 color=mix(low,teal,smoothstep(-.7,.7,v));color=mix(color,stone,smoothstep(.28,.85,v)*.6);color+=stripe;float lit=clamp(dot(normalize(vNormal),normalize(vec3(.75,.45,.5))),.0,1.);color*=.22+.84*lit;gl_FragColor=vec4(color,1.);}` }));
  const planet=remember(new THREE.Mesh(remember(new THREE.SphereGeometry(32,64,36)),planetMaterial));planet.position.set(-33,-36,-78);scene.add(planet);
  const orbAtmos=remember(new THREE.Mesh(remember(new THREE.SphereGeometry(32.5,48,32)),remember(new THREE.MeshBasicMaterial({color:0x6aaca5,side:THREE.BackSide,transparent:true,opacity:.10,depthWrite:false}))));orbAtmos.position.copy(planet.position);scene.add(orbAtmos);

  const amb=remember(new THREE.HemisphereLight(0xc8f7fc,0x163342,2.4));scene.add(amb);
  const key=remember(new THREE.DirectionalLight(0xffeed2,3.2));key.position.set(-7,14,14);scene.add(key);
  const edge=remember(new THREE.DirectionalLight(0x73def1,3.4));edge.position.set(12,3,-11);scene.add(edge);
  const rim=remember(new THREE.PointLight(0xeac69d,90,38));rim.position.set(-8,5,9);scene.add(rim);

  const ship=new THREE.Group();ship.position.set(4,.2,-2);ship.scale.setScalar(.87);scene.add(ship);
  const dots=[];
  const textureCanvas=document.createElement('canvas');textureCanvas.width=128;textureCanvas.height=128;
  const cx=textureCanvas.getContext('2d');
  if(cx){let g=cx.createRadialGradient(64,64,4,64,64,64);g.addColorStop(0,'rgba(170,255,244,.9)');g.addColorStop(.2,'rgba(104,237,226,.5)');g.addColorStop(1,'rgba(104,237,226,0)');cx.fillStyle=g;cx.fillRect(0,0,128,128);}
  const glowTex=remember(new THREE.CanvasTexture(textureCanvas));
  const glowMat=remember(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  for (const x of [-3.06,3.06]){let glow=new THREE.Sprite(glowMat);glow.position.set(x,-.18,-5.20);glow.scale.set(1.45,1.45,1);ship.add(glow);dots.push(glow);}
  const modelLoader=new GLTFLoader();
  modelLoader.load('/models/wayfinder.glb', gltf=>{
    ship.add(gltf.scene);
    canvas.closest('[data-voyage-scene]')?.setAttribute('data-model','ready');
    onStatus('Wayfinder spacecraft model loaded.');
  },undefined,()=>{canvas.closest('[data-voyage-scene]')?.setAttribute('data-model','missing');onStatus('3D spacecraft model unavailable. The journey text and Skip remain accessible.');});

  let disposed=false,raf=0,width=0,height=0,last=0,elapsed=0,allowAnimation=true;
  const target=new THREE.Vector3();
  function resize(){
    if(disposed)return;
    const bounds=canvas.getBoundingClientRect();
    width=Math.max(1,Math.round(bounds.width));height=Math.max(1,Math.round(bounds.height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,MAX_PIXEL_RATIO));
    renderer.setSize(width,height,false);
    camera.aspect=width/height;camera.fov=width<680?54:43;camera.updateProjectionMatrix();
    render(0);
  }
  function render(dt){
    elapsed+=allowAnimation?dt:0;
    const narrow=width<680;
    camera.position.set(motion.cx+(narrow?5:0),motion.cy+(narrow?3:0),motion.cz+(narrow?4:0));
    target.set(motion.tx+(narrow?2.8:0),motion.ty+(narrow?1.0:0),motion.tz);
    camera.lookAt(target);
    ship.rotation.y=motion.yaw+(allowAnimation?Math.sin(elapsed*.3)*.025:0);
    ship.rotation.x=-.055+(allowAnimation?Math.sin(elapsed*.5)*.023:0);
    ship.position.x=motion.sx;ship.position.y=motion.sy+(allowAnimation?Math.sin(elapsed*.52)*.075:0);
    for(let i=0;i<dots.length;i++){const s=1.1+(allowAnimation ? .22*Math.sin(elapsed*2.5+i*1.2) : 0);dots[i].scale.setScalar(s);}
    sky.uniforms.uTime.value=elapsed;
    renderer.render(scene,camera);
  }
  function loop(timestamp){
    if(disposed)return;
    const dt=Math.min(.035,(timestamp-last)/1000||0);last=timestamp;
    render(dt);raf=requestAnimationFrame(loop);
  }
  const observer=new ResizeObserver(resize);observer.observe(canvas);
  window.addEventListener('resize',resize);resize();raf=requestAnimationFrame(loop);
  return {
    setPlaying(value){allowAnimation=value;if(!value)render(0);},
    destroy(){disposed=true;cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('resize',resize);scene.traverse(o=>{if(o.isMesh&&o.geometry&&!tracked.includes(o.geometry))o.geometry.dispose();if(o.isMesh&&o.material&&!tracked.includes(o.material)){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose());}});tracked.forEach(o=>o.dispose?.());renderer.dispose();}
  };
}

export function bootVoyage(){
  const root=document.querySelector('[data-voyage]');if(!root)return;
  const canvas=root.querySelector('[data-voyage-canvas]');
  const story=root.querySelector('[data-voyage-copy]');
  const head=root.querySelector('[data-voyage-heading]');
  const body=root.querySelector('[data-voyage-description]');
  const chapter=root.querySelector('[data-voyage-chapter]');
  const counter=root.querySelector('[data-voyage-counter]');
  const progress=root.querySelector('[data-voyage-progress]');
  const status=root.querySelector('[data-voyage-status]');
  const play=root.querySelector('[data-voyage-play]');
  const next=root.querySelector('[data-voyage-next]');
  const enter=root.querySelector('[data-voyage-enter]');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let current=-1,manualPaused=false,finished=false,view=null;
  const motion={cx:13,cy:7,cz:27,tx:3,ty:.5,tz:-2,sx:4,sy:-.2,yaw:-.42};
  const poses=[
    {cx:13,cy:7,cz:27,tx:3,ty:.5,tz:-2,sx:4,sy:-.2,yaw:-.42},
    {cx:10,cy:6,cz:23,tx:3,ty:.4,tz:-2,sx:3.4,sy:.05,yaw:-.22},
    {cx:8,cy:5.5,cz:20,tx:3,ty:.8,tz:-2,sx:3.6,sy:.12,yaw:-.08},
    {cx:9,cy:4.5,cz:19,tx:3.7,ty:.5,tz:-2,sx:4.3,sy:.10,yaw:-.25},
    {cx:11,cy:5.3,cz:22,tx:3.8,ty:.8,tz:-2,sx:4.2,sy:.15,yaw:-.46},
    {cx:10,cy:6.2,cz:20,tx:3.6,ty:.6,tz:-2,sx:3.8,sy:.05,yaw:-.32}
  ];
  let timeline=gsap.timeline({paused:true,onUpdate(){const t=Math.min(timeline.time(),CHAPTERS.length*BEAT_SECONDS-.001);const i=Math.min(CHAPTERS.length-1,Math.floor(t/BEAT_SECONDS));show(i);progress.style.width=Math.min(100,timeline.progress()*100)+'%';},onComplete(){finished=true;root.dataset.finished='true';play.textContent='Replay journey';play.setAttribute('aria-pressed','true');}});
  CHAPTERS.forEach((_,i)=>{
    timeline.to(motion,{...poses[i],duration:BEAT_SECONDS,ease:'power1.inOut'},i*BEAT_SECONDS);
  });
  function show(i){if(i===current)return;current=i;const item=CHAPTERS[i];chapter.textContent=item.tag;head.textContent=item.title;body.textContent=item.text;counter.textContent=String(i+1).padStart(2,'0')+' / 06';story.classList.remove('chapter-reveal');void story.offsetHeight;story.classList.add('chapter-reveal');}
  function setPlaying(value){manualPaused=!value;if(!reduced.matches&&!document.hidden&&!finished){if(value)timeline.play();else timeline.pause();}view?.setPlaying(value&&!reduced.matches);play.innerHTML=value?'Pause journey <span aria-hidden="true">Ⅱ</span>':'Play journey <span aria-hidden="true">▶</span>';play.setAttribute('aria-pressed',String(!value));}
  function setup(){
    if(reduced.matches){timeline.pause(0);show(0);next.hidden=false;play.hidden=true;root.dataset.reduced='true';view?.setPlaying(false);}
    else{next.hidden=true;play.hidden=false;root.dataset.reduced='false';if(!manualPaused&&!finished&&!document.hidden)timeline.play();view?.setPlaying(!manualPaused&&!document.hidden);}
  }
  next.addEventListener('click',()=>{if(current<CHAPTERS.length-1){timeline.pause((current+1)*BEAT_SECONDS+.1);show(current+1);}else{window.location.assign('/lab/observation-deck');}});
  play.addEventListener('click',()=>{if(finished){finished=false;root.dataset.finished='false';timeline.restart();setPlaying(true);}else setPlaying(manualPaused);});
  function onVisibility(){if(document.hidden){timeline.pause();view?.setPlaying(false);}else if(!manualPaused&&!finished&&!reduced.matches){timeline.play();view?.setPlaying(true);}}
  document.addEventListener('visibilitychange',onVisibility);
  reduced.addEventListener('change',setup);
  try{
    const renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:'high-performance'});
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.35;
    view=createSpace(renderer,canvas,motion,msg=>{if(status)status.textContent=msg;});
    root.dataset.graphics='ready';
  }catch(e){root.dataset.graphics='unavailable';status.textContent='3D unavailable. The complete journey and Skip remain available.';}
  timeline.pause(0);show(0);setup();
  window.addEventListener('pagehide',()=>{timeline.kill();view?.destroy();document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',setup);},{once:true});
}