// RESPAWN – Figuren mit Skelett und echten Bewegungen (Quaternius „Ultimate Modular Men“, CC0; siehe modelle/LIZENZ.md).
// Normale Proportionen, Gesichter, Bausteine zum Mischen (Kopf, Oberteil, Beine, Füße je Stil), Farben je Figur.
// „Überzug“: Die Figuren des Spiels (actors/humanoid) bleiben als Logik bestehen (Ort, Zustand, Namensschild); ihre
// gezeichneten Teile werden ausgeblendet und die neue Figur hängt als Kind daran. So muss am Spiel sonst nichts geändert werden.
// Die Dateien haben Farben je Material und keine Texturen. Hier werden die Farben in die Eckpunkte geschrieben, damit
// die Figuren dasselbe Toon-Material wie alles andere im Spiel bekommen (Rampe, Kantenlicht, Nebel, Farbstimmung) –
// und damit man Haut, Haar und Kleidung umfärben kann.
//   MODELLE.name = glTF-Text;  const f = await ladeFigur(game, 'name', { farben: { Shirt: '#c0392b' } })
//   f.group (in die Szene hängen) · f.spiele('Walk', { einmal, tempo }) · f.update(dt) · f.namen · f.setzeFarben({ … })
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { getMaterial } from '../actors/humanoid/base.js';
import menschenBin from './modelle/menschen.glb';

// name → glTF-Text oder ArrayBuffer (build.mjs bettet .glb binär und .gltf als Text ein)
export const MODELLE = { menschen: menschenBin.buffer.slice(menschenBin.byteOffset, menschenBin.byteOffset + menschenBin.byteLength) };
const HOEHE = 1.72;                 // Zielgröße in Metern
// aWind: 0 Stoff/Haar · 1 Haut (warmer Schatten) · 2 flach (Augen, Brauen)
const FLAGGE = { Skin: 1, Skin_Darker: 1, Face: 2, Eye: 2, Eyebrows: 2 };
export const TEILE = ['Head', 'Body', 'Legs', 'Feet'];
const cache = new Map();

function parse(daten) {
  return new Promise((resolve, reject) => new GLTFLoader().parse(daten, '', resolve, reject));
}
// Zu welchem Baustein gehört ein Netz? „Casual_Body“ → { stil: 'Casual', teil: 'Body' } (Farmer_Pants zählt als Legs)
function baustein(o) {
  for (let n = o; n; n = n.parent) {
    const m = /^([A-Za-z0-9]+)_(Head|Body|Legs|Feet|Pants)/.exec(n.name || '');
    if (m) return { stil: m[1], teil: m[2] === 'Pants' ? 'Legs' : m[2] };
  }
  return null;
}

// stil: 'Casual' oder je Baustein { Head: 'Punk', Body: 'Casual', Legs: 'Casual2', Feet: 'Casual' }
export async function ladeFigur(game, id, { farben = {}, stil = null, fest = false } = {}) {
  if (!cache.has(id)) cache.set(id, parse(MODELLE[id]));
  const gltf = await cache.get(id);
  const mat = getMaterial(game.world.veil);
  const group = skClone(gltf.scene);
  const teile = [];   // { mesh, name, farbe, bau }
  const stile = new Set();
  group.traverse((o) => {
    if (!o.isMesh) return;
    const name = o.material && o.material.name;
    const farbe = (o.material && o.material.color ? o.material.color.clone() : new THREE.Color(1, 1, 1));
    const g = o.geometry, n = g.attributes.position.count;
    if (!g.attributes.color) g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    if (!g.attributes.aWind) g.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n).fill(FLAGGE[name] || 0), 1));
    o.material = mat;
    o.castShadow = true; o.receiveShadow = false; o.frustumCulled = false;
    const bau = baustein(o);
    if (bau) stile.add(bau.stil);
    teile.push({ mesh: o, name, farbe, bau });
  });
  const faerbe = (t, c) => { const a = t.mesh.geometry.attributes.color; for (let i = 0; i < a.count; i++) a.setXYZ(i, c.r, c.g, c.b); a.needsUpdate = true; };
  const setzeFarben = (f) => { for (const t of teile) { const c = f && f[t.name] ? new THREE.Color(f[t.name]) : t.farbe; faerbe(t, c); } };
  const setzeStil = (s) => {
    if (!s) return;
    for (const t of teile) {
      if (!t.bau) { t.mesh.visible = false; continue; }   // Zubehör (Rucksack …) nur auf Wunsch
      const will = typeof s === 'string' ? s : (s[t.bau.teil] || s.alle);
      t.mesh.visible = t.bau.stil === will;
    }
  };
  setzeStil(stil || (stile.size ? [...stile][0] : null));
  // fest: nur die gewählten Bausteine behalten (spart Speicher, wenn viele Figuren gleichzeitig da sind)
  if (fest) for (let i = teile.length - 1; i >= 0; i--) if (!teile[i].mesh.visible) { const m = teile[i].mesh; if (m.parent) m.parent.remove(m); teile.splice(i, 1); }
  for (const t of teile) t.mesh.geometry = t.mesh.geometry.clone();
  setzeFarben(farben);
  // Größe aus der wirklichen Figur messen (das Skelett skaliert die Eckpunkte noch einmal)
  group.updateMatrixWorld(true);
  const kasten = new THREE.Box3();
  for (const t of teile) { if (!t.mesh.visible) continue; t.mesh.computeBoundingBox(); kasten.union(t.mesh.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)); }
  const h = kasten.max.y - kasten.min.y;
  if (h > 0.1) group.scale.multiplyScalar(HOEHE / h);
  const mixer = new THREE.AnimationMixer(group);
  const aktionen = {};
  for (const clip of gltf.animations) aktionen[clip.name] = mixer.clipAction(clip);
  let jetzt = null;
  return {
    group, mixer, namen: Object.keys(aktionen), stile: [...stile], setzeFarben, setzeStil,
    // Farben aus dem Aussehen einer Spielfigur: Haut, Haar, Oberteil, Hose, Schuhe (je Baustein das größte Stoff-Material)
    faerbeNach(look = {}) {
      const HAUT = ['Skin', 'Skin_Darker'], HAAR = ['Hair', 'Eyebrows', 'Moustache', 'Hair_White'];
      const ziel = { Body: look.top, Legs: look.bottoms, Feet: look.shoes };
      const haupt = {};   // Baustein → Materialname mit den meisten Eckpunkten (ohne Haut und Haar)
      for (const t of teile) {
        if (!t.bau || HAUT.includes(t.name) || HAAR.includes(t.name) || t.name === 'Eye') continue;
        const n = t.mesh.geometry.attributes.position.count, k = t.bau.teil;
        if (!haupt[k] || n > haupt[k].n) haupt[k] = { name: t.name, n };
      }
      for (const t of teile) {
        let c = t.farbe;
        if (t.name === 'Skin' && look.skin) c = new THREE.Color(look.skin);
        else if (t.name === 'Skin_Darker' && look.skin) c = new THREE.Color(look.skin).multiplyScalar(0.82);
        else if (HAAR.includes(t.name) && look.hair) c = new THREE.Color(look.hair);
        else if (t.name === 'Eye') c = new THREE.Color('#1b1d26');
        else if (t.bau && ziel[t.bau.teil] && haupt[t.bau.teil] && haupt[t.bau.teil].name === t.name) c = new THREE.Color(ziel[t.bau.teil]);
        else c = t.farbe.clone().multiplyScalar(1.6);   // Nebenfarben etwas heller: die Datei ist für dunklere Beleuchtung gemacht
        faerbe(t, c);
      }
    },
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

// ---------- Überzug: neue Figur auf eine Spielfigur (actors/humanoid) legen ----------
const BEWEGUNG = { idle: 'Idle_Neutral', walk: 'Walk', run: 'Run', jump: 'Run', fall: 'Idle_Neutral', wave: 'Wave', talk: 'Idle_Neutral', cheer: 'Wave',
  sad: 'Idle_Neutral', angry: 'Idle', sit: 'Idle_Neutral', think: 'Idle_Neutral' };
const GESTE = { winken: 'Wave', stopp: 'Interact', handHeben: 'Wave', daumen: 'Interact', lachen: 'Wave' };
const TEMPO = { Walk: 1.15, Run: 1.05 };
const ueberzogen = [];
let laeuft = false;
const _v = new THREE.Vector3();

export async function ueberziehe(game, h, { stil, look } = {}) {
  if (!h || h.__figur) return null;
  h.__figur = true;
  const f = await ladeFigur(game, 'menschen', { stil, fest: true });
  f.faerbeNach(look || (h.config || {}));
  f.group.name = 'figur';
  f.group.scale.multiplyScalar(1.8 / HOEHE);   // die Spielfiguren sind 2,0 × Größenfaktor hoch; Kopf knapp unter dem Namensschild
  // Der Kopf etwas größer: liest sich aus der Spielkamera besser (Gesichter) und passt zur gezeichneten Welt.
  let kopf = null; f.group.traverse((o) => { if (o.isBone && /^head$/i.test(o.name)) kopf = o; });
  h.group.add(f.group);
  const e = { h, f, kopf };
  ueberzogen.push(e);
  h.figur = f;
  if (!laeuft) {
    laeuft = true;
    game.addUpdate((dt) => {
      const cam = game.camera;
      for (const x of ueberzogen) {
        if (x.h.joints && x.h.joints.body) x.h.joints.body.visible = false;   // die alten gezeichneten Teile bleiben aus
        for (const c of x.h.group.children) if (c.name === 'impostor') c.visible = false;
        if (!x.h.group.visible || !x.h.group.parent) continue;
        if (cam && cam.position.distanceToSquared(x.h.group.getWorldPosition(_v)) > 80 * 80) continue;
        const clip = (x.h.emote && GESTE[x.h.emote]) || BEWEGUNG[x.h.anim] || 'Idle_Neutral';
        x.f.spiele(clip, { tempo: TEMPO[clip] || 1 });
        x.f.update(dt);
        if (x.kopf) x.kopf.scale.setScalar(1.1);
      }
    }, { order: 97, always: true });
  }
  return f;
}
export function entferneUeberzug(h) {
  const i = ueberzogen.findIndex((x) => x.h === h);
  if (i >= 0) { const x = ueberzogen[i]; if (x.f.group.parent) x.f.group.parent.remove(x.f.group); ueberzogen.splice(i, 1); }
}
