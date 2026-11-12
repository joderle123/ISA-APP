// RESPAWN – Lader für Figuren mit Skelett und echten Bewegungen (glTF als Text, z. B. Quaternius CC0).
// Stand 12.11.2026: nur zur Probe. Getestet mit „Casual_Male“ aus dem Ultimate Animated Character Pack – technisch läuft es
// (17 Bewegungen, Toon-Material, umfärbbar), aber die Figuren haben große Köpfe und kurze Körper und wirken kindlicher als
// die eigenen Figuren des Spiels. Darum ist kein Modell eingebettet (MODELLE ist leer); der Lader bleibt für bessere Figuren.
// Die Dateien haben Farben je Material und keine Texturen. Hier werden die Farben in die Eckpunkte geschrieben, damit
// die Figuren dasselbe Toon-Material wie alles andere im Spiel bekommen (Rampe, Kantenlicht, Nebel, Farbstimmung) –
// und damit man Haut, Haar und Kleidung umfärben kann.
//   MODELLE.name = glTF-Text;  const f = await ladeFigur(game, 'name', { farben: { Shirt: '#c0392b' } })
//   f.group (in die Szene hängen) · f.spiele('Walk', { einmal, tempo }) · f.update(dt) · f.namen · f.setzeFarben({ … })
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getMaterial } from '../actors/humanoid/base.js';
export const MODELLE = {};   // name → glTF-Text (bei Bedarf: import x from './modelle/X.gltf' – build.mjs bettet .gltf als Text ein)
const HOEHE = 1.72;                 // Zielgröße in Metern (die Dateien sind etwa 3,2 Einheiten hoch)
const FLAGGE = { Skin: 1, Face: 2 };   // aWind: 0 Stoff/Haar · 1 Haut (warmer Schatten) · 2 flach (Augen, Mund)
const cache = new Map();

function parse(text) {
  return new Promise((resolve, reject) => new GLTFLoader().parse(text, '', resolve, reject));
}

export async function ladeFigur(game, id, { farben = {} } = {}) {
  if (!cache.has(id)) cache.set(id, parse(MODELLE[id]));
  const gltf = await cache.get(id);
  const mat = getMaterial(game.world.veil);
  const group = gltf.scene;
  const teile = [];   // { mesh, name, farbe }
  let maxY = 0;
  group.traverse((o) => {
    if (!o.isMesh) return;
    const name = o.material && o.material.name;
    const farbe = (o.material && o.material.color ? o.material.color.clone() : new THREE.Color(1, 1, 1));
    const g = o.geometry, n = g.attributes.position.count;
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n).fill(FLAGGE[name] || 0), 1));
    g.computeBoundingBox();
    maxY = Math.max(maxY, g.boundingBox.max.y);
    o.material = mat;
    o.castShadow = true; o.receiveShadow = false; o.frustumCulled = false;
    teile.push({ mesh: o, name, farbe });
  });
  const faerbe = (t, c) => { const a = t.mesh.geometry.attributes.color; for (let i = 0; i < a.count; i++) a.setXYZ(i, c.r, c.g, c.b); a.needsUpdate = true; };
  const setzeFarben = (f) => { for (const t of teile) { const c = f && f[t.name] ? new THREE.Color(f[t.name]) : t.farbe; faerbe(t, c); } };
  setzeFarben(farben);
  // Größe aus der wirklichen Figur messen (das Skelett skaliert die Eckpunkte noch einmal)
  group.updateMatrixWorld(true);
  const kasten = new THREE.Box3();
  for (const t of teile) { t.mesh.computeBoundingBox(); kasten.union(t.mesh.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)); }
  const h = kasten.max.y - kasten.min.y;
  group.scale.multiplyScalar(HOEHE / (h > 0.1 ? h : (maxY || 3.2)));
  const mixer = new THREE.AnimationMixer(group);
  const aktionen = {};
  for (const clip of gltf.animations) aktionen[clip.name] = mixer.clipAction(clip);
  let jetzt = null;
  return {
    group, mixer, namen: Object.keys(aktionen), teile: teile.map((t) => t.name), setzeFarben,
    spiele(name, { einmal = false, tempo = 1, blende = 0.25 } = {}) {
      const a = aktionen[name];
      if (!a || a === jetzt) return;
      a.reset(); a.setLoop(einmal ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = einmal; a.timeScale = tempo;
      if (jetzt) a.crossFadeFrom(jetzt, blende, true);
      a.play(); jetzt = a;
    },
    update(dt) { mixer.update(dt); },
  };
}
