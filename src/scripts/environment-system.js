/**
 * AIIP environment systems plate — original scene drawn with an ISO-GLOW-inspired
 * isometric projection and hairline aesthetic.
 * Projection/kernel conventions adapted from ISO-GLOW / iso-figure (MIT).
 * Copyright (c) 2026 April Zhu, Tolga Cohce. License retained at
 * /licenses/iso-glow-LICENSE.txt; credit: https://isoglow.dev.
 * Scenario and architecture authored for AI in Perspective.
 */
const host = document.querySelector('[data-environment-stage]');
if (host) {
  const SVGNS = 'http://www.w3.org/2000/svg';
  // Isometric kernel. Projected scene lives within viewBox 0 0 1200 690.
  const C = Math.cos(Math.PI / 6);
  const S = Math.sin(Math.PI / 6);
  const P = (x,y,z=0) => [606+(x-y)*C*1.13, 98+(x+y)*S*1.04-z*1.04];
  const pt = (x,y,z=0) => P(x,y,z).map(n=>n.toFixed(2)).join(',');
  const polygon = (pts,cls,attr='') => `<polygon class="${cls}" points="${pts.map(p=>pt(...p)).join(' ')}" ${attr}/>`;
  const path = (points,cls,attr='') => `<path class="${cls}" d="M${points.map(p=>pt(...p)).join(' L')}" ${attr}/>`;
  const line = (a,b,cls,attr='') => path([a,b],cls,attr);
  const point = (x,y,z,r,cls,attr='') => { const [cx,cy]=P(x,y,z);return `<circle class="${cls}" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r}" ${attr}/>`; };
  const isoBox = (x,y,z,w,d,h,kind='') => {
    const top=z+h;
    return `<g class="iso-box ${kind}">
      ${polygon([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,top],[x,y+d,top]],'iso-face')}
      ${polygon([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,top],[x+w,y,top]],'iso-side')}
      ${polygon([[x,y,top],[x+w,y,top],[x+w,y+d,top],[x,y+d,top]],'iso-top')}
    </g>`;
  };
  const caption=(x,y,z,text,cls='plate-caption',anchor='middle')=>{const [cx,cy]=P(x,y,z);return `<text x="${cx}" y="${cy}" text-anchor="${anchor}" class="${cls}">${text}</text>`;};
  const arc=(cx,cy,rx,ry,cls,attr='')=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="${cls}" ${attr}/>`;
  let parts=[];const emit=s=>parts.push(s);
  emit(`<svg viewBox="0 0 1200 690" xmlns="${SVGNS}" role="img" aria-labelledby="env-system-title env-system-desc" preserveAspectRatio="xMidYMid meet">
    <title id="env-system-title">An isometric model of the physical systems that support AI computing</title>
    <desc id="env-system-desc">A conceptual illustrated site shows a power generation building, electricity grid, two detailed server racks, heat rejection and cooling equipment, a water-assisted example circuit, and surrounding land and water. Select a focus above to trace the system. This illustration does not represent actual quantities or a particular facility.</desc>
    <defs>
      <filter id="env-light" x="-75%" y="-75%" width="250%" height="250%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="env-deep" x="-25%" y="-35%" width="170%" height="180%"><feGaussianBlur stdDeviation="16"/></filter>
      <pattern id="env-hatch" patternUnits="userSpaceOnUse" width="9" height="9"><path d="M0 9L9 0" stroke="currentColor" stroke-opacity=".14" stroke-width=".7"/></pattern>
      <linearGradient id="env-water" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#173d49"/><stop offset="1" stop-color="#0b222e"/></linearGradient>
    </defs>
    <g class="env-floor">
      ${polygon([[0,0,-22],[600,0,-22],[600,400,-22],[0,400,-22]],'iso-ground-bottom')}
      ${polygon([[0,400,-22],[600,400,-22],[600,400,0],[0,400,0]],'iso-ground-front')}
      ${polygon([[600,0,-22],[600,400,-22],[600,400,0],[600,0,0]],'iso-ground-side')}
      ${polygon([[0,0,0],[600,0,0],[600,400,0],[0,400,0]],'iso-ground-top')}
      ${polygon([[22,22,1],[578,22,1],[578,378,1],[22,378,1]],'iso-ground-outline')}
    </g>`);
  // Orthogonal grid etched into ground plate; lines not props.
  for(let x=40;x<600;x+=40)emit(line([x,26,1],[x,374,1],'iso-grid'));
  for(let y=40;y<400;y+=40)emit(line([24,y,1],[576,y,1],'iso-grid'));
  // Ground waterways, isometric service pads and boundary details.
  emit(`<g class="env-landscape" data-zone="context">
    ${polygon([[38,262,3],[280,262,3],[280,362,3],[38,362,3]],'iso-pond-bank')}
    ${polygon([[51,272,4],[266,272,4],[266,346,4],[51,346,4]],'iso-pond-water')}
    ${path([[58,294,5],[100,294,5],[146,302,5],[206,302,5],[253,294,5]],'iso-water-ripple')}
    ${path([[67,326,5],[130,326,5],[173,333,5],[243,322,5]],'iso-water-ripple ripple-alt')}
    ${caption(153,314,8,'WATER CONTEXT','plate-caption-soft')}
    ${polygon([[295,109,3],[506,109,3],[506,222,3],[295,222,3]],'iso-equipment-pad')}
    ${polygon([[430,231,3],[568,231,3],[568,350,3],[430,350,3]],'iso-equipment-pad')}
  </g>`);
  // Site perimeter trees, tapered crowns, trunks and ground rings.
  const tree=(x,y,size=1)=>{
    const [bx,by]=P(x,y,0),[tipX,tipY]=P(x,y,45*size);const a=19*size,b=10*size;
    return `<g class="iso-tree" data-zone="context">
      ${arc(bx,by,18*size,8*size,'iso-tree-ring')}
      ${line([x,y,2],[x,y,19*size],'iso-tree-trunk')}
      <path d="M${tipX.toFixed(1)} ${(tipY-4*size).toFixed(1)}L${(bx-a).toFixed(1)} ${(by-13*size).toFixed(1)}Q${bx.toFixed(1)} ${(by-b).toFixed(1)} ${(bx+a).toFixed(1)} ${(by-13*size).toFixed(1)}Z" class="iso-tree-crown"/>
      <path d="M${(bx-a*.78).toFixed(1)} ${(by-18*size).toFixed(1)}Q${bx.toFixed(1)} ${(by-24*size).toFixed(1)} ${(bx+a*.7).toFixed(1)} ${(by-18*size).toFixed(1)}" class="iso-tree-detail"/>
    </g>`;
  };
  [[44,215,.85],[80,230,.6],[46,369,.8],[292,348,.75],[572,44,.9],[546,87,.68],[549,377,.9],[579,320,.65],[26,45,.72],[148,28,.67]].forEach(a=>emit(tree(...a)));
  // Electrical routes pass under/along ground. The single accent glow follows the selected circuit.
  const energyRoute=[[150,145,5],[215,145,5],[244,130,5],[305,130,5],[326,163,5]];
  const coolingOut=[[403,204,8],[426,234,8],[480,242,8],[493,272,8]];
  const coolingReturn=[[493,307,8],[455,318,8],[408,267,8],[363,217,8]];
  const waterRoute=[[264,322,7],[329,322,7],[402,331,7],[473,328,7]];
  for(const [id,pts] of [['power',energyRoute],['heat',coolingOut],['cool',coolingReturn],['water',waterRoute]]){
    const kind=id==='power'?'power':'cooling';
    emit(`<g class="env-routes env-routes--${kind}" data-zone="${kind}">
      ${path(pts,'route-sleeve')}
      ${path(pts,'route-line '+(id==='heat'?'route-line--hot':''))}
      ${path(pts,'route-signal route-signal--'+id,`pathLength="1000"`)}
    </g>`);
  }
  // Plant / source unit — a compact generator house, no chosen fuel type implied.
  emit(`<g class="iso-zone iso-zone--power" data-zone="power">
    ${isoBox(56,64,6,134,93,53,'plant-main')}
    ${isoBox(78,70,60,90,55,9,'plant-roof')}
    ${isoBox(99,82,71,33,20,22,'plant-turbine')}
    ${isoBox(144,84,71,14,22,43,'plant-stack')}
    ${isoBox(65,83,59,14,19,32,'plant-stack')}
    ${polygon([[72,157,31],[173,157,31],[173,157,50],[72,157,50]],'plant-panel')}
    ${[83,96,109,122,135,148].map(x=>line([x,158,34],[x,158,48],'rack-vent')).join('')}
    ${point(158,158,42,3.1,'iso-led live')}
    ${polygon([[91,99,81],[117,99,81],[117,118,81],[91,118,81]],'plant-top-accent')}
    ${[0,1,2].map(i=>line([94+i*7,100,82],[94+i*7,116,82],'plant-top-detail')).join('')}
    ${caption(116,162,13,'POWER SUPPLY','plate-caption','middle')}
  </g>`);
  // Grid transformer housings, gantries and electrical busbars.
  emit(`<g class="iso-zone iso-zone--grid" data-zone="power">
    ${isoBox(220,88,5,90,73,12,'grid-plinth')}
    ${[0,1,2].map(i=>isoBox(232+i*25,102,18,19,32,34,'transformer')).join('')}
    ${[0,1,2].map(i=>[0,1].map(j=>point(241+i*25,111+j*16,53,2.4,'iso-insulator')).join('')).join('')}
    ${line([225,91,61],[303,91,61],'grid-gantry')}
    ${line([225,91,18],[225,91,61],'grid-support')}
    ${line([303,91,18],[303,91,61],'grid-support')}
    ${line([231,91,61],[231,160,61],'grid-gantry')}
    ${line([297,91,61],[297,160,61],'grid-gantry')}
    ${[0,1,2].map(i=>line([234+i*28,102,54],[234+i*28,88,61],'grid-wire')).join('')}
    ${caption(267,163,10,'GRID / SUBSTATION','plate-caption')}
  </g>`);
  // Distinctive racks use seven server bays, top airflow vents and status diodes.
  const rack=(x,y,index)=>{
    const z=10,w=71,d=58,h=127,front=y+d;
    let q=`<g class="iso-rack" data-zone="compute" data-rack="${index}">
       ${isoBox(x,y,z,w,d,h,'rack-cabinet')}
       ${polygon([[x+6,front+.3,z+8],[x+w-5,front+.3,z+8],[x+w-5,front+.3,z+h-6],[x+6,front+.3,z+h-6]],'rack-cavity')}`;
    for(let i=0;i<7;i++){
      const top=z+h-16-i*13.2;
      q+=`${polygon([[x+10,front+.6,top-10],[x+w-10,front+.6,top-10],[x+w-10,front+.6,top],[x+10,front+.6,top]],'rack-server')}
      ${line([x+15,front+.7,top-4],[x+41,front+.7,top-4],'rack-vent')}
      ${point(x+52,front+.9,top-5,1.9,'rack-led '+(i%3===0?'rack-led--alt':''))}`;
    }
    const sw=z+h-9;
    q+=`${polygon([[x+8,front+.65,sw-4],[x+w-8,front+.65,sw-4],[x+w-8,front+.65,sw+3],[x+8,front+.65,sw+3]],'rack-switch')}
    ${[0,1,2,3,4,5,6].map(i=>point(x+17+i*6,front+1,sw,1.15,'rack-port')).join('')}
    ${[0,1,2,3,4].map(i=>line([x+w, y+6+i*9,z+15],[x+w,y+6+i*9,z+100],'rack-side-vent')).join('')}
    ${point(x+26,y+27,z+h+.7,12,'rack-fan')}
    ${point(x+46,y+27,z+h+.7,12,'rack-fan')}
    ${point(x+26,y+27,z+h+1,3,'rack-fan-hub')}
    ${point(x+46,y+27,z+h+1,3,'rack-fan-hub')}
    ${caption(x+35,front+10,z+2,'R-'+String(index).padStart(2,'0'),'rack-id')}
    </g>`;
    return q;
  };
  emit(`<g class="iso-zone iso-zone--compute" data-zone="compute">
    ${rack(320,145,1)}${rack(398,155,2)}
    ${path([[356,204,16],[386,224,16],[429,214,16]],'server-network')}
    ${caption(388,246,12,'AI COMPUTE','plate-caption')}
  </g>`);
  // Cooling apparatus: plate exchanger + two fan modules / recirculating lines.
  emit(`<g class="iso-zone iso-zone--cooling" data-zone="cooling">
    ${isoBox(440,241,7,70,62,52,'heat-exchanger')}
    ${[0,1,2,3,4,5].map(i=>line([448+i*9,303.4,19],[448+i*9,303.4,49],'exchanger-vent')).join('')}
    ${point(462,266,60,12,'rack-fan')}${point(492,274,60,12,'rack-fan')}
    ${point(462,266,61,3,'rack-fan-hub')}${point(492,274,61,3,'rack-fan-hub')}
    ${isoBox(490,320,6,54,43,65,'cool-tower')}
    ${[0,1,2].map(i=>line([498+i*12,363.6,17],[498+i*12,363.6,60],'cool-vent')).join('')}
    ${line([511,340,71],[532,340,71],'rack-vent')}
    ${caption(507,374,8,'HEAT REJECTION','plate-caption')}
  </g>`);
  // Thermodynamic heat in the scene is represented by airy curves, NOT smoke.
  const heatLoc=P(505,345,95);
  emit(`<g class="env-heat-vapor" data-zone="cooling">
    <path d="M${heatLoc[0]-16} ${heatLoc[1]+16}q-8 -13 3 -27t4 -27" class="heat-wave"/>
    <path d="M${heatLoc[0]+2} ${heatLoc[1]+19}q-8 -13 3 -27t4 -27" class="heat-wave"/>
    <path d="M${heatLoc[0]+20} ${heatLoc[1]+10}q-8 -13 3 -27t4 -27" class="heat-wave"/>
  </g>`);
  // Legend labels placed outside hardware silhouettes, with leader lines.
  const pins=[
    [190,108,6,300,145,'01','GENERATION','power'],
    [325,97,56,674,100,'02','GRID','power'],
    [420,176,145,968,175,'03','COMPUTE','compute'],
    [512,341,75,1038,479,'04','COOLING','cooling'],
    [125,314,4,242,495,'05','LAND + WATER','context']
  ];
  for(const [x,y,z,lx,ly,n,title,zone] of pins){const [cx,cy]=P(x,y,z);
    emit(`<g class="iso-label" data-zone="${zone}">
      <path d="M${cx} ${cy}L${lx} ${ly+8}" class="label-leader"/>
      <circle cx="${cx}" cy="${cy}" r="3.3" class="label-dot"/>
      <rect x="${lx-12}" y="${ly-13}" width="${title.length*8.8+52}" height="29" rx="6" class="label-bg"/>
      <text x="${lx}" y="${ly+6}" class="label-text"><tspan class="label-number">${n} </tspan>${title}</text>
    </g>`);
  }
  emit(`<g class="env-frame-meta"><text x="53" y="51">FIG 01</text><text x="1148" y="51" text-anchor="end">CONCEPTUAL / NOT TO SCALE</text><path d="M52 68H1148" /></g>`);
  emit(`</svg>`);
  host.innerHTML=parts.join('');
  const focusButtons=[...document.querySelectorAll('[data-env-focus]')];
  const textTitle=document.querySelector('[data-env-title]');
  const textBody=document.querySelector('[data-env-description]');
  const sequence=document.querySelector('[data-env-step]');
  const focusData={
    all:['The whole system','An AI response relies on linked infrastructure. Follow electricity to computing hardware, then the heat and cooling that keep those systems operating. The surroundings and energy supply also affect the footprint.','SYSTEM VIEW'],
    power:['Electricity has a source','Power is generated and delivered through electrical infrastructure. The source and local grid mix matter for environmental impact. This drawing does not assert a particular fuel type.','01 / ELECTRICITY'],
    compute:['Computing produces heat','Servers and networking equipment consume electricity while running workloads. That electrical energy ultimately becomes heat that must be managed.','02 / COMPUTE'],
    cooling:['Cooling takes different forms','Heat must be moved away from computing equipment. This model includes a water-assisted example; some facilities use air cooling or dry cooling and can have very different on-site water demands.','03 / COOLING'],
    context:['Where and how changes the impact','The environmental picture depends on electricity generation, cooling technology, climate, location, equipment life cycle and how water use is measured.','04 / CONTEXT']
  };
  const setFocus=(key)=>{
    const row=focusData[key];if(!row)return;
    host.dataset.focus=key;
    for(const b of focusButtons)b.setAttribute('aria-pressed',String(b.dataset.envFocus===key));
    if(textTitle)textTitle.textContent=row[0];
    if(textBody)textBody.textContent=row[1];
    if(sequence)sequence.textContent=row[2];
    // On narrow screens the figure pans within its own region; selecting a topic
    // moves the relevant part of the world into view without scrolling the page.
    const figureScroller=host.closest('.env-scene-wrap');
    if(figureScroller && matchMedia('(max-width:660px)').matches){
      const center={all:.48,power:.44,compute:.69,cooling:.77,context:.31}[key];
      const left=host.getBoundingClientRect().width*center-figureScroller.clientWidth/2;
      figureScroller.scrollTo({left:Math.max(0,left),behavior:reduced.matches?'instant':'smooth'});
    }
  };
  for(const b of focusButtons)b.addEventListener('click',()=>setFocus(b.dataset.envFocus));
  for(const zone of host.querySelectorAll('[data-zone]')){
    zone.addEventListener('click',()=>{
      const name=zone.getAttribute('data-zone');
      if(name==='power'||name==='compute'||name==='cooling'||name==='context')setFocus(name);
    });
  }
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const pause=document.querySelector('[data-env-motion]');
  let running=!reduced.matches;
  function paintMotion(){
    host.dataset.motion=running?'on':'off';
    if(pause){pause.setAttribute('aria-pressed',String(!running));pause.textContent=running?'Pause movement':'Play movement';}
  }
  pause?.addEventListener('click',()=>{running=!running;paintMotion();});
  reduced.addEventListener?.('change',e=>{running=!e.matches;paintMotion();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)host.classList.add('env-offscreen');else host.classList.remove('env-offscreen');
  });
  setFocus('all');paintMotion();
}