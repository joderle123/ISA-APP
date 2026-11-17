// Lycée-Simulator – Möbel, Bäume, Fahrzeuge und Essen aus den Modell-Paketen (CC0):
//   lycee.glb  – Quaternius (Möbel, Einrichtung, Innenräume, Verkehr, Straße, Essen), Farben linear in den Eckpunkten
//   kenney.glb – Kenney (Bäume, Hecken, Bänke, Brunnen, Skate-Teile, Autos), Farben sRGB in den Eckpunkten
// welt.js legt fest, was wo steht (plaetze: { m, x, z, rot, h | s, y, fest, id }); hier wird jedes Modell auf seine Zielhöhe
// gebracht, mittig auf den Punkt gestellt und alles Feste zu EINEM Netz mit dem Toon-Material zusammengefasst.
// fest: true = Grundriss als Kollisionskasten · Zahl = kleiner Kasten dieser halben Breite (Baumstamm) · id = eigenes Netz.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import lyceeBin from './modelle/lycee.glb';
import stadtBin from './modelle/kenney.glb';   // Auswahl aus respawn/modelle/stadt.glb (tools/lycee/kenney-auswahl.mjs)
import { mergeAll } from './welt.js';

const puffer = (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
function parse(buf) { return new Promise((ok, nein) => new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parse(buf, '', ok, nein)); }

async function lade(bin, srgb) {
  const gltf = await parse(puffer(bin));
  gltf.scene.updateMatrixWorld(true);
  const geo = {};
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    g.applyMatrix4(o.matrixWorld);
    const n = g.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const P = g.attributes.position, N = g.attributes.normal, C = g.attributes.color, c = new THREE.Color(), v = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      pos[i * 3] = P.getX(i); pos[i * 3 + 1] = P.getY(i); pos[i * 3 + 2] = P.getZ(i);
      if (N) { v.set(N.getX(i), N.getY(i), N.getZ(i)).normalize(); nor[i * 3] = v.x; nor[i * 3 + 1] = v.y; nor[i * 3 + 2] = v.z; }
      if (C) { if (srgb) c.setRGB(C.getX(i), C.getY(i), C.getZ(i), THREE.SRGBColorSpace); else c.setRGB(C.getX(i), C.getY(i), C.getZ(i)); } else c.setRGB(0.8, 0.8, 0.8);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    out.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (!N) out.computeVertexNormals();
    out.computeBoundingBox();
    const name = (o.userData && o.userData.name) || o.name;
    // ein Modell kann aus mehreren Netzen bestehen (Kenney): zusammenlegen
    geo[name] = geo[name] ? mergeAll([geo[name], out]) : out;
    if (!geo[name].boundingBox) geo[name].computeBoundingBox();
  });
  return geo;
}

let _alle = null;
export function ladeRequisiten() {
  if (!_alle) _alle = Promise.all([lade(lyceeBin, false), lade(stadtBin, true)]).then(([a, b]) => ({ ...b, ...a }));
  return _alle;
}

// Ein Platz → fertige, ausgerichtete Geometrie (Weltkoordinaten) und ihr Grundriss
export function stelle(geo, p) {
  const g = geo.clone();
  const bb = g.boundingBox || (g.computeBoundingBox(), g.boundingBox);
  const sx = bb.max.x - bb.min.x, sy = bb.max.y - bb.min.y, sz = bb.max.z - bb.min.z;
  const k = p.s ? p.s / Math.max(sx, sz, 1e-3) : (p.h ? p.h / Math.max(sy, 1e-3) : 1);
  const m = new THREE.Matrix4()
    .makeTranslation(p.x, (p.y || 0) + 0.06, p.z)
    .multiply(new THREE.Matrix4().makeRotationY(p.rot || 0))
    .multiply(new THREE.Matrix4().makeScale(k, k, k))
    .multiply(new THREE.Matrix4().makeTranslation(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2));
  g.applyMatrix4(m);
  if (p.farbe) { const c = new THREE.Color(p.farbe), a = g.attributes.color; for (let i = 0; i < a.count; i++) a.setXYZ(i, a.getX(i) * c.r, a.getY(i) * c.g, a.getZ(i) * c.b); }
  g.computeBoundingBox();
  return g;
}

export async function baueRequisiten({ welt, material, scene }) {
  const geo = await ladeRequisiten();
  const fest = [], eigene = {}, fehlt = [];
  for (const p of welt.plaetze) {
    const quelle = geo[p.m];
    if (!quelle) { fehlt.push(p.m); continue; }
    const g = stelle(quelle, p);
    const bb = g.boundingBox;
    if (p.fest === true) welt.kasten.push({ x0: bb.min.x + 0.05, x1: bb.max.x - 0.05, z0: bb.min.z + 0.05, z1: bb.max.z - 0.05, y0: bb.min.y, y1: bb.max.y });
    else if (typeof p.fest === 'number') welt.kasten.push({ x0: p.x - p.fest / 2, x1: p.x + p.fest / 2, z0: p.z - p.fest / 2, z1: p.z + p.fest / 2, y0: 0, y1: 3 });
    if (p.id) {
      // eigenes Netz um den Platz herum (zum Bewegen, z. B. der Bus)
      g.translate(-p.x, 0, -p.z);
      const mesh = new THREE.Mesh(g, material); mesh.position.set(p.x, 0, p.z); mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = p.id;
      scene.add(mesh); eigene[p.id] = mesh;
    } else fest.push(g);
  }
  const mesh = new THREE.Mesh(mergeAll(fest), material);
  mesh.name = 'requisiten'; mesh.castShadow = true; mesh.receiveShadow = true;
  scene.add(mesh);
  if (fehlt.length) console.warn('Lycée: Modelle fehlen', [...new Set(fehlt)]);
  return { mesh, eigene, fehlt, geo };
}
