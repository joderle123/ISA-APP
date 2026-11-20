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
import kaykitBin from './modelle/kaykit.glb';
import skateBin from './modelle/skate.glb';   
import kenney2Bin from './modelle/kenney2.glb';   // Kenney Furniture/City Roads/Retro Urban/Fantasy Town 2.0 (CC0, 20.11.): mk/…, weg/…, retro/…, dorf/… – tools/lycee/kenney-neu.py   // Kenney Mini Skate 2.0 (CC0, über opengameart.org): Halfpipe, Rails, Treppe, Trottinette – tools/stadt/stadt.py + kenney-auswahl.mjs   // KayKit (CC0): Möbel, Küche, Straße – Namen kk/<modell> (tools/lycee/kaykit.py)
import { mergeAll, zellenMerge } from './welt.js';

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
// Kollision für Modelle, die oft ohne „fest“ aufgestellt werden (Fehler-Rundgang 17.11.)
const AUTOFEST = { 'einrichtung/Plant': 0.5, 'strasse/Streetlight_Single': 0.3, 'platz/lantern': 0.3, 'moebel/OfficeChair': 0.5,
  'einrichtung/CoffeeTable': true, 'einrichtung/ChairCushioned': true, 'verkehr/Bicycle': true, 'verkehr/SquareFrameBicycle': true,
  'lager/bucket': 0.35, 'strasse/construction-cone': 0.35 };

export function ladeRequisiten() {
  if (!_alle) _alle = Promise.all([lade(lyceeBin, false), lade(stadtBin, true), lade(kaykitBin, true), lade(skateBin, true), lade(kenney2Bin, true)]).then(([a, b, k, sk, k2]) => ({ ...k2, ...sk, ...k, ...b, ...a }));
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
  // einfarbig: Farbe ersetzen (z. B. Beton für die Skate-Rampen), oben heller, Seiten dunkler
  if (p.einfarbig) { const c = new THREE.Color(p.einfarbig), a = g.attributes.color, n = g.attributes.normal; for (let i = 0; i < a.count; i++) { const k = 0.78 + 0.22 * Math.max(0, n.getY(i)); a.setXYZ(i, c.r * k, c.g * k, c.b * k); } }
  // stein: nur blasse Lila/Grau-Töne ersetzen (Brunnen-Rand), kräftiges Wasserblau bleibt
  if (p.stein) { const c = new THREE.Color(p.stein), a = g.attributes.color; for (let i = 0; i < a.count; i++) { const r = a.getX(i), gg = a.getY(i), b = a.getZ(i); if (b >= r && b - r < 0.4 && r > 0.12) { const l = (r + gg + b) / 3 / 0.62; a.setXYZ(i, c.r * l, c.g * l, c.b * l); } } }
  g.computeBoundingBox();
  return g;
}

export async function baueRequisiten({ welt, material, scene }) {
  const geo = await ladeRequisiten();
  const fest = [], eigene = {}, fehlt = [], saisonGeo = {};
  for (const p of welt.plaetze) {
    if (p.m.startsWith('natur/')) continue;   // natur.js (Texturen, Instanzen)
    const quelle = geo[p.m];
    if (!quelle) { fehlt.push(p.m); continue; }
    const g = stelle(quelle, p);
    if (p.saison) { (saisonGeo[p.saison] = saisonGeo[p.saison] || []).push(g); continue; }   // Deko je Jahreszeit: eigenes Netz, sichtbar je Kapitel
    const bb = g.boundingBox;
    if (p.fest === undefined && AUTOFEST[p.m] !== undefined) p.fest = AUTOFEST[p.m];   // Dinge, durch die man nicht laufen soll
    if (p.fest === true) welt.kasten.push({ x0: bb.min.x + 0.05, x1: bb.max.x - 0.05, z0: bb.min.z + 0.05, z1: bb.max.z - 0.05, y0: bb.min.y, y1: bb.max.y });
    else if (typeof p.fest === 'number') welt.kasten.push({ x0: p.x - p.fest / 2, x1: p.x + p.fest / 2, z0: p.z - p.fest / 2, z1: p.z + p.fest / 2, y0: 0, y1: 3 });
    if (p.id) {
      // eigenes Netz um den Platz herum (zum Bewegen, z. B. der Bus)
      g.translate(-p.x, 0, -p.z);
      const mesh = new THREE.Mesh(g, material); mesh.position.set(p.x, 0, p.z); mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = p.id;
      scene.add(mesh); eigene[p.id] = mesh;
    } else fest.push(g);
  }
  // nach Zellen zusammengefasst (Kamera-Ausschnitt schneidet ganze Zellen weg); mesh = Gruppe für Aufrufer
  const mesh = new THREE.Group(); mesh.name = 'requisiten';
  for (const g of zellenMerge(fest, 24)) { const m = new THREE.Mesh(g, material); m.name = 'requisiten-zelle'; m.castShadow = true; m.receiveShadow = true; mesh.add(m); }
  scene.add(mesh);
  const saison = {};
  for (const [k, gs] of Object.entries(saisonGeo)) { const m = new THREE.Mesh(mergeAll(gs), material); m.name = 'saison-' + k; m.visible = false; m.castShadow = true; m.receiveShadow = true; scene.add(m); saison[k] = m; }
  if (fehlt.length) console.warn('Lycée: Modelle fehlen', [...new Set(fehlt)]);
  return { mesh, eigene, fehlt, geo, saison };
}
