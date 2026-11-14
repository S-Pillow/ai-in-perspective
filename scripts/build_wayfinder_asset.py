"""Export AIIP's original Wayfinder exploratory vessel as a reproducible GLB.

This deliberately authored parametric mesh is a first model for a visual review,
not a Blender-rendered final asset. No third-party model or texture is used.
Run: python scripts/build_wayfinder_asset.py
"""
from __future__ import annotations
import math
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon
from shapely.ops import triangulate
import trimesh

OUT=Path(__file__).resolve().parents[1]/'public/models/wayfinder.glb'
COLORS={
    'porcelain':[215,222,218,255],
    'bone':[176,203,205,255],
    'titanium':[93,130,142,255],
    'navy':[24,54,68,255],
    'shadow':[17,38,52,255],
    'glass':[20,74,92,255],
    'copper':[206,171,114,255],
    'cyan':[112,247,227,255],
    'blue':[89,164,213,255],
}
SCENE=trimesh.Scene()

def put(name:str, mesh:trimesh.Trimesh, color='porcelain', metallic=.3, roughness=.5, emit=False):
    rgba=COLORS[color]
    material=trimesh.visual.material.PBRMaterial(name=color,
        baseColorFactor=rgba,
        metallicFactor=0 if emit else metallic, roughnessFactor=1 if emit else roughness,
        emissiveFactor=[.35,.95,.83] if emit else [0,0,0],
        doubleSided=True)
    mesh.visual=trimesh.visual.TextureVisuals(material=material)
    SCENE.add_geometry(mesh, geom_name=name)
    return mesh

def box(name:str, extent, xyz, material='titanium', radius=0):
    mesh=trimesh.creation.box(extents=extent)
    mesh.apply_translation(xyz)
    return put(name,mesh,material)

def ellipsoid(name:str, scale, center, mat='porcelain', sections=3):
    mesh=trimesh.creation.icosphere(subdivisions=sections)
    mesh.apply_scale(scale)
    mesh.apply_translation(center)
    return put(name,mesh,mat)

def tube(name:str, pts, rad, material='copper', sectors=8):
    # Smooth path with closely spaced connected radial loops.
    pts=np.asarray(pts,dtype=float)
    V=[];F=[];n=len(pts)
    for i,p in enumerate(pts):
        tangent=pts[min(n-1,i+1)]-pts[max(0,i-1)]
        tangent/=np.linalg.norm(tangent)+1e-9
        ref=np.array([0,1,0],float)
        if abs(np.dot(tangent,ref))>.94: ref=np.array([1,0,0],float)
        u=np.cross(tangent,ref);u/=np.linalg.norm(u)+1e-9
        v=np.cross(tangent,u);v/=np.linalg.norm(v)+1e-9
        for j in range(sectors):
            a=j*2*math.pi/sectors
            V.append(p+rad*(u*math.cos(a)+v*math.sin(a)))
    for i in range(n-1):
        for j in range(sectors):
            a=i*sectors+j;b=i*sectors+(j+1)%sectors;c=(i+1)*sectors+j;d=(i+1)*sectors+(j+1)%sectors
            F.extend([[a,c,b],[b,c,d]])
    return put(name,trimesh.Trimesh(vertices=V,faces=F,process=False),material,emit=material=='cyan')

def loft(name:str, stations:list[tuple[float,float,float,float,float]], mat:str, sides=24):
    # station: z, width X radius, height Y radius, center-Y, center-X.
    verts=[];faces=[]
    for z,w,h,cy,cx in stations:
        for i in range(sides):
            a=i*2*math.pi/sides
            verts.append([cx+w*math.cos(a),cy+h*math.sin(a),z])
    for k in range(len(stations)-1):
        for i in range(sides):
            a=k*sides+i;b=k*sides+(i+1)%sides;c=(k+1)*sides+i;d=(k+1)*sides+(i+1)%sides
            faces.extend([[a,b,c],[b,d,c]])
    faces.extend([[0,i+1,i] for i in range(1,sides-1)])
    last=(len(stations)-1)*sides
    faces.extend([[last,last+i,last+i+1] for i in range(1,sides-1)])
    return put(name,trimesh.Trimesh(vertices=verts,faces=faces,process=False),mat)

def panel(name, perimeter, top_y, thickness, material='porcelain'):
    # Flat-shaded carefully bounded wing plate with raised center relief and bevel edges.
    poly=Polygon([(x,z) for x,z in perimeter]); assert poly.is_valid and poly.area>0
    verts=[]; idx={}; faces=[]
    # Use original polygon boundary plus interior triangulation coords.
    triangles=[g for g in triangulate(poly) if poly.covers(g.representative_point())]
    def vertex(x,z,surface):
        key=(round(x,6),round(z,6),surface)
        if key not in idx:
            cx=abs(x)
            y=top_y + (.04*math.cos(cx*.57) if surface==1 else -thickness)
            idx[key]=len(verts);verts.append([x,y,z])
        return idx[key]
    for tri in triangles:
        coords=list(tri.exterior.coords)[:3]
        top=[vertex(x,z,1) for x,z in coords]
        bot=[vertex(x,z,0) for x,z in coords]
        faces.append(top);faces.append(bot[::-1])
    coords=list(poly.exterior.coords)[:-1]
    for i,(x,z) in enumerate(coords):
        nx,nz=coords[(i+1)%len(coords)]
        a=vertex(x,z,1);b=vertex(nx,nz,1);c=vertex(x,z,0);d=vertex(nx,nz,0)
        faces.extend([[a,c,b],[b,c,d]])
    return put(name,trimesh.Trimesh(vertices=verts,faces=faces,process=False),material)

# Long, sculpted mid-hull, flying toward positive Z, made from 3D section geometry.
loft('Wayfinder | continuous sculpted fuselage',[
(-5.0,.45,.28,.08,0),(-4.4,1.14,.54,.1,0),(-3.1,1.40,.64,.16,0),
(-1.4,1.57,.72,.21,0),(0,1.48,.70,.30,0),(1.55,1.15,.61,.30,0),
(3.05,.77,.46,.27,0),(4.15,.32,.27,.23,0),(4.75,.07,.07,.2,0)],'porcelain',32)
loft('Wayfinder | ventral dark mass',[
(-4.4,.74,.40,-.33,0),(-3.0,.90,.45,-.40,0),(-1.0,1.12,.39,-.42,0),
(1.65,.84,.34,-.32,0),(3.0,.41,.20,-.2,0)],'shadow',24)

# Distinctive semi-crescent swept wings; trailing edge creates paired forks.
wing=[(1.02,1.28),(2.05,.78),(3.38,.27),(5.12,-.42),(7.95,-1.78),
(8.55,-2.32),(8.22,-2.66),(7.16,-2.52),(6.02,-2.1),(4.98,-2.00),
(3.90,-2.48),(2.72,-3.45),(1.32,-3.16)]
for side,label in [(1,'starboard'),(-1,'port')]:
    coords=[(side*x,z) for x,z in wing]
    panel(f'Wayfinder | {label} swept titanium wing',coords,.05,.28,'bone')
    wingInset=[(side*x,z) for x,z in [(1.7,.55),(3.38,-.08),(5.12,-.66),(7.45,-1.87),(6.94,-2.17),(5.08,-1.76),(3.8,-2.24),(2.65,-3.10),(1.67,-2.98)]]
    panel(f'Wayfinder | {label} recessed panel',wingInset,.105,.015,'titanium')
    # Thin precise luminous/copper trimming along swept leading edge.
    lead=[(side*x,.115,z) for x,z in [(1.31,1.04),(2.23,.67),(3.47,.21),(4.87,-.40),(6.26,-1.03),(7.75,-1.82)]]
    tube(f'Wayfinder | {label} leading edge inlay',lead,.034,'copper',8)
    back=[(side*x,.11,z) for x,z in [(7.98,-2.52),(7.10,-2.39),(6.05,-1.99),(4.96,-1.94)]]
    tube(f'Wayfinder | {label} navlight',back,.041,'cyan',8)
    # Three distinct flush vent banks and subtle panel division lines.
    for j,(x,z) in enumerate([(2.7,-1.65),(3.25,-1.92),(3.8,-2.2)]):
        box(f'Wayfinder | {label} flush intake grille {j}',[.34,.035,.11], [side*x,.15,z], 'navy')
        box(f'Wayfinder | {label} grille highlight {j}',[.18,.016,.026],[side*x,.17,z],'copper')

# Bridge blister / curved glass canopy and supporting frame, not an orb.
ellipsoid('Wayfinder | panoramic armored glazing',(1.025,.48,1.98),(0,.77,.65),'glass',4)
ellipsoid('Wayfinder | canopy highlight lip',(1.125,.11,2.05),(0,.46,.65),'navy',3)
# Hand-built arch ribs over the upper canopy, subtle struts not a giant grid.
for i,z in enumerate([-0.18,1.28,1.75]):
    pts=[]
    for j in range(17):
        theta=math.pi * j/16
        pts.append((1.045*math.cos(theta),.77+.485*math.sin(theta),z))
    tube(f'Wayfinder | canopy frame rib {i}',pts,.025,'copper',6)
# Outer sensor strip and dorsal keel, safely original silhouette.
tube('Wayfinder | centerline copper keel',[(0,1.00,2.6),(0,1.05,3.1),(0,.82,4.1)],.035,'copper')
for s in [-1,1]:
    # Engine pods sit integrated in the wing aft forks, not tall rocket boosters.
    loft(f'Wayfinder | {"left" if s<0 else "right"} propulsion nacelle',[
      (-5.1,.23,.25,-.16,3.06*s),(-4.85,.48,.32,-.17,3.07*s),
      (-3.65,.54,.34,-.14,3.07*s),(-2.7,.35,.28,-.08,3.01*s),(-2.25,.06,.12,.04,2.89*s)],'navy',16)
    # An emission jewel at rear of each nacelle; animated glow added as Three.js light.
    mesh=trimesh.creation.cylinder(radius=.33,height=.075,sections=32)
    T=trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]);mesh.apply_transform(T)
    mesh.apply_translation([3.06*s,-.16,-5.12])
    put(f'Wayfinder | {"left" if s<0 else "right"} plasma aperture',mesh,'cyan',emit=True)
    for j in range(4):
        box(f'Wayfinder | nacelle band {s} {j}',[.47,.04,.075],[3.06*s,.15,-4.65+j*.36],'copper')

# Six dark ribs along center underside enhance scale and structural intentionality.
for z in [-3.7,-3.1,-2.5,-1.9,-1.3,-.7]:
    box(f'Wayfinder | ventral maintenance rib {z}',[1.05,.06,.11],[0,-.83,z],'titanium')

# Original, asymmetric port side survey/antenna pod; this is an exploration craft.
loft('Wayfinder | offset survey sensor pod',[(.7,.10,.10,.16,-1.1),(1.25,.23,.17,.18,-1.12),(1.8,.10,.10,.16,-1.1)],'navy',16)

OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_bytes(SCENE.export(file_type='glb'))
print(f'created {OUT}, {OUT.stat().st_size} bytes, parts={len(SCENE.geometry)}, triangles={sum(len(g.faces) for g in SCENE.geometry.values())}')