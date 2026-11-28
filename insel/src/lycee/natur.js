// Annexe Junglinster – Natur: gemalte Bäume, Büsche, Blumen, Gras und Steine aus dem
// Quaternius „Stylized Nature MegaKit“ (CC0, modelle/natur.glb, Werkzeug tools/lycee/natur-pack.py).
// Die Modelle tragen echte Blatt-Texturen (Alpha-Maske). Jede Sorte wird als InstancedMesh gezeichnet:
// wenige Draw-Calls, auch bei hundert Bäumen. Laub wiegt sich im Wind (Vertex-Shader, Phase je Baum).
// welt.plaetze mit m: 'natur/<Modell>' werden hier aufgestellt (requisiten.js überspringt sie).
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import naturBin from './modelle/natur.glb';

const puffer = (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);

// Wind: je höher über dem Boden des Modells, desto mehr Bewegung; Phase aus der Position des Baums
const WIND = (staerke) => (vs) => vs.replace('void main() {', 'uniform float uWind;\nvoid main() {').replace('#include <begin_vertex>', `#include <begin_vertex>
    float nwH = max(position.y - 0.4, 0.0);
    float nwP = position.x * 0.5 + position.z * 0.4;
    #ifdef USE_INSTANCING
      nwP += instanceMatrix[3].x * 0.37 + instanceMatrix[3].z * 0.29;
    #endif
    float nwS = sin(uWind * 1.05 + nwP) * 0.6 + sin(uWind * 2.2 + nwP * 1.7) * 0.4;
    transformed.x += nwS * ${staerke.toFixed(3)} * nwH;
    transformed.z += cos(uWind * 0.85 + nwP) * ${(staerke * 0.6).toFixed(3)} * nwH;`);

export async function baueNatur({ welt, scene, veil, windZeit, wenig = false }) {
  const plaetze = welt.plaetze.filter((p) => p.m && p.m.startsWith('natur/'));
  if (!plaetze.length) return null;
  const gltf = await new Promise((ok, nein) => new GLTFLoader().parse(puffer(naturBin), '', ok, nein));
  gltf.scene.updateMatrixWorld(true);
  // Modell → [{ geo, mat }] (eine Primitive je Material) und Höhe
  const modelle = {};
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    let k = o; while (k && !((k.userData && k.userData.name) || '').startsWith('natur/')) k = k.parent;
    if (!k) return;
    const name = k.userData.name;
    const m = modelle[name] || (modelle[name] = { teile: [], box: new THREE.Box3() });
    const g = o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
    g.computeBoundingBox(); m.box.union(g.boundingBox);
    m.teile.push({ geo: g, quelle: o.material });
  });
  // Materialien: Lambert mit Textur und Alpha-Maske, Toon-Rampe der Welt; Laub, Gras, Blumen mit Wind
  const matCache = new Map(), laubMats = [];   // laubMats: für Jahreszeiten (Herbstfarben, Frost)
  const material = (q, modell) => {
    const art = /Leaves|Leaf|Flowers|Grass/.test(q.name) ? 'laub' : 'fest';
    const baum = /Tree|Pine/.test(modell);
    const key = q.name + '|' + art + '|' + (baum ? 'b' : 'k');
    if (matCache.has(key)) return matCache.get(key);
    const m = new THREE.MeshLambertMaterial({ map: q.map || null, color: q.color ? q.color.clone() : 0xffffff, alphaTest: q.alphaTest || 0, side: q.alphaTest ? THREE.DoubleSide : THREE.FrontSide });
    if (m.map) { m.map.colorSpace = THREE.SRGBColorSpace; m.map.anisotropy = 4; }
    const wind = art === 'laub' ? WIND(baum ? 0.022 : 0.05) : null;
    veil.patch(m, { key: 'natur-' + key, ramp: art === 'laub' ? 'laub' : 'props', uniforms: wind ? { uWind: windZeit } : undefined, vertex: wind || undefined });
    matCache.set(key, m);
    if (art === 'laub') laubMats.push({ m, baum, nadel: /Pine/i.test(q.name + ' ' + modell), blume: /Flower/i.test(q.name + ' ' + modell), farbe: m.color.clone() });
    return m;
  };
  // Plätze je Modell sammeln, dünnere Bodendecker bei wenig Leistung
  const jeModell = {};
  plaetze.forEach((p, i) => {
    if (wenig && /Grass|Clover|Flower_3|Fern|Plant_1|Mushroom/.test(p.m) && i % 2) return;
    (jeModell[p.m] = jeModell[p.m] || []).push(p);
  });
  const gruppe = new THREE.Group(); gruppe.name = 'natur';
  const fehlt = [], zellen = [];   // zellen: { m: InstancedMesh, x, z, r, klein } – für Sichtbarkeit nach Entfernung
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), T = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
  const ZELLE = 36;   // Instanzen je 36-m-Feld: so greift das Wegschneiden außerhalb des Bildes (auch beim Schatten)
  for (const [name, alle] of Object.entries(jeModell)) {
    const mod = modelle[name];
    if (!mod) { fehlt.push(name); continue; }
    const hoehe = Math.max(mod.box.max.y - mod.box.min.y, 0.01), breite = Math.max(mod.box.max.x - mod.box.min.x, mod.box.max.z - mod.box.min.z, 0.01);
    const baum = /Tree|Pine/.test(name), klein = /Grass|Clover|Flower|Fern|Plant_1|Mushroom/.test(name);
    const felder = new Map();
    for (const p of alle) { const k = Math.floor(p.x / ZELLE) + ':' + Math.floor(p.z / ZELLE); if (!felder.has(k)) felder.set(k, []); felder.get(k).push(p); }
    for (const liste of felder.values()) {
      for (const t of mod.teile) {
        const im = new THREE.InstancedMesh(t.geo, material(t.quelle, name), liste.length);
        let sx = 0, sz = 0;
        liste.forEach((p, i) => {
          const k = p.s ? p.s / breite : (p.h ? p.h / hoehe : 1);
          T.set(p.x, (p.y || 0) + 0.04, p.z); Q.setFromAxisAngle(Y, p.rot || 0); S.set(k, k * (p.streck || 1), k);
          im.setMatrixAt(i, M.compose(T, Q, S)); sx += p.x; sz += p.z;
        });
        im.instanceMatrix.needsUpdate = true;
        im.castShadow = baum || /Bush|Rock/.test(name); im.receiveShadow = true;
        im.computeBoundingSphere();
        im.name = name;
        gruppe.add(im);
        zellen.push({ m: im, x: sx / liste.length, z: sz / liste.length, klein, baum });
      }
    }
    // Kollision: Stamm (Zahl = halbe Breite) oder Grundriss
    for (const p of alle) {
      if (typeof p.fest === 'number') welt.kasten.push({ x0: p.x - p.fest, x1: p.x + p.fest, z0: p.z - p.fest, z1: p.z + p.fest, y0: 0, y1: 3 });
      else if (p.fest === true) { const k = p.h ? p.h / hoehe : 1, r = breite * k * 0.35; welt.kasten.push({ x0: p.x - r, x1: p.x + r, z0: p.z - r, z1: p.z + r, y0: 0, y1: 1.2 }); }
    }
  }
  scene.add(gruppe);
  if (fehlt.length) console.warn('Natur: Modelle fehlen', fehlt);
  // Sichtweite: Gras und Blumen nur in der Nähe, Bäume weiter; drinnen nur, was durch die Fenster zu sehen ist (nah)
  let tz = 0;
  function sicht(kamera, drinnen) {
    if ((tz = (tz + 1) % 10) !== 0) return;   // alle zehn Bilder reicht
    const cx = kamera.position.x, cz = kamera.position.z;
    for (const z of zellen) {
      const d = Math.hypot(z.x - cx, z.z - cz);
      z.m.visible = z.klein ? d < (drinnen ? 0 : wenig ? 40 : 60) : d < (drinnen ? 45 : z.baum ? (wenig ? 180 : 260) : (wenig ? 85 : 120));
    }
  }
  // Jahreszeit: 'herbst' (warme Blätter), 'winter' (Frost: blasser, heller, Nadelbäume bleiben grün), sonst wie gemalt
  function saison(art) {
    for (const x of laubMats) {
      x.m.color.copy(x.farbe); x.m.visible = true;
      if (x.m.emissive) x.m.emissive.setRGB(0, 0, 0);
      if (art === 'winter' && ((x.baum && !x.nadel) || x.blume)) { x.m.visible = false; x.m.needsUpdate = true; continue; }   // Dezember: Laubbäume kahl, keine Blumen (Jugend-Kritik: „Laub im Schnee“)
      if (art === 'herbst' && !x.nadel) x.m.color.multiply(new THREE.Color(x.baum ? 0xffb066 : 0xf2d49a));
      if (art === 'winter') {
        if (x.nadel) { if (x.m.emissive) x.m.emissive.setRGB(0.09, 0.1, 0.12); }
        else { x.m.color.multiply(new THREE.Color(x.baum ? 0x8f9a9c : 0xa9b4b4)); if (x.m.emissive) x.m.emissive.setRGB(0.26, 0.29, 0.33); }
      }
      x.m.needsUpdate = true;
    }
  }
  return { gruppe, anzahl: plaetze.length, sicht, saison };
}
