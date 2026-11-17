// Lycée-Simulator – Menschen: Quaternius „Ultimate Modular Men/Women“ (CC0) mit Skelett und Bewegungen
// (Idle, Walk, Run, Wave, Interact …). Wie in RESPAWN (respawn/figur3d.js) werden die Material-Farben in die Eckpunkte
// geschrieben, damit alle Figuren das Toon-Material des Spiels tragen und sich umfärben lassen (Haut, Haar, Kleidung).
// Hier eigene Fassung, weil die Frauen-Datei Materialnamen mit Endungen hat („Skin.003“) und eigene Haarfarben.
//   const f = await ladePerson(veil, { modell: 'frauen', stil: 'Casual', haut, haar, oben, unten, schuhe })
//   f.group · f.spiele('Walk') · f.update(dt)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { getMaterial } from '../actors/humanoid/base.js';
import { baueFrisur } from './frisur.js';
import menschenBin from './modelle/menschen.glb';   // = respawn/modelle/menschen.glb, mit Meshopt gepackt
import frauenBin from './modelle/frauen.glb';

const DATEN = { menschen: menschenBin, frauen: frauenBin };
const cache = new Map();
const puffer = (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
const roh = (n) => String(n || '').replace(/\.\d+$/, '');
const FLAGGE = { Skin: 1, Skin_Darker: 1, Face: 2, Eye: 2, Eyebrows: 2 };
const HAAR = /^(Hair|Hair_Brown|Hair_Blond|Hair_White|Eyebrows|Moustache)$/;

function baustein(o) {
  for (let n = o; n; n = n.parent) {
    const m = /^([A-Za-z0-9]+)_(Head|Body|Legs|Feet|Pants)/.exec(n.name || '');
    if (m) return { stil: m[1], teil: m[2] === 'Pants' ? 'Legs' : m[2] };
  }
  return null;
}

export async function ladePerson(veil, { modell = 'menschen', stil = 'Casual', haut, haar, oben, unten, schuhe, hoehe = 1.72, frisur = null, kopf = null, kopfFarbe = null } = {}) {
  if (!cache.has(modell)) cache.set(modell, new Promise((ok, nein) => new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parse(puffer(DATEN[modell]), '', ok, nein)));
  const gltf = await cache.get(modell);
  const mat = getMaterial(veil);
  const group = skClone(gltf.scene);
  const teile = [];
  group.traverse((o) => {
    if (!o.isMesh) return;
    const name = roh(o.material && o.material.name);
    const farbe = o.material && o.material.color ? o.material.color.clone() : new THREE.Color(1, 1, 1);
    const bau = baustein(o);
    teile.push({ mesh: o, name, farbe, bau });
  });
  // nur der gewählte Stil (je Teil anderer Stil möglich: stil = { Head, Body, Legs, Feet })
  const will = (t) => (typeof stil === 'string' ? stil : (stil[t] || stil.alle));
  for (let i = teile.length - 1; i >= 0; i--) {
    const t = teile[i];
    if (!t.bau || t.bau.stil !== will(t.bau.teil)) { if (t.mesh.parent) t.mesh.parent.remove(t.mesh); teile.splice(i, 1); }
  }
  // Hauptstoff je Teil = Material mit den meisten Eckpunkten (ohne Haut, Haar, Augen)
  const haupt = {};
  for (const t of teile) {
    if (/^Skin/.test(t.name) || HAAR.test(t.name) || t.name === 'Eye') continue;
    const n = t.mesh.geometry.attributes.position.count, k = t.bau.teil;
    if (!haupt[k] || n > haupt[k].n) haupt[k] = { name: t.name, n, mesh: t.mesh };
  }
  const ziel = { Body: oben, Legs: unten, Feet: schuhe };
  for (const t of teile) {
    const g = t.mesh.geometry = t.mesh.geometry.clone(), n = g.attributes.position.count;
    let c;
    if (t.name === 'Skin' && haut) c = new THREE.Color(haut);
    else if (t.name === 'Skin_Darker' && haut) c = new THREE.Color(haut).multiplyScalar(0.82);
    else if (HAAR.test(t.name) && haar) c = new THREE.Color(haar);
    else if (t.name === 'Eye') c = new THREE.Color('#1b1d26');
    else if (ziel[t.bau.teil] && haupt[t.bau.teil] && haupt[t.bau.teil].mesh === t.mesh) c = new THREE.Color(ziel[t.bau.teil]);
    else c = t.farbe.clone().multiplyScalar(1.5);
    const col = new Float32Array(n * 3); for (let i = 0; i < n; i++) { col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n).fill(FLAGGE[t.name] || 0), 1));
    t.mesh.material = mat; t.mesh.castShadow = true; t.mesh.receiveShadow = false; t.mesh.frustumCulled = false;
  }
  group.updateMatrixWorld(true);
  const kasten = new THREE.Box3();
  for (const t of teile) { t.mesh.computeBoundingBox(); kasten.union(t.mesh.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)); }
  const h = kasten.max.y - kasten.min.y;
  if (h > 0.1) group.scale.multiplyScalar(hoehe / h);
  const huelle = new THREE.Group(); huelle.add(group);
  // Frisur und Kopfbedeckung (wie RESPAWN): an den Kopfknochen, in Ruhelage ausgerichtet; deckt sie den Kopf, fällt das kurze Haar weg
  if (frisur || kopf) {
    let kb = null; group.traverse((o) => { if (o.isBone && /^head$/i.test(o.name)) kb = o; });
    const fr = kb ? baueFrisur({ hair: haar, hairStyle: frisur, head: kopf, headColor: kopfFarbe || oben }, mat) : null;
    if (fr) {
      huelle.updateMatrixWorld(true);
      const wq = new THREE.Quaternion(), bq = new THREE.Quaternion(), bs = new THREE.Vector3(), gs = new THREE.Vector3();
      huelle.getWorldQuaternion(wq); kb.getWorldQuaternion(bq); kb.getWorldScale(bs); huelle.getWorldScale(gs);
      fr.quaternion.copy(bq.invert().multiply(wq));
      fr.scale.setScalar(gs.x / (bs.x || 1));
      kb.add(fr);
      if (fr.userData.deckt) for (const t of teile) if (t.bau.teil === 'Head' && /^Hair/.test(t.name)) t.mesh.visible = false;
    }
  }
  const mixer = new THREE.AnimationMixer(group);
  const aktionen = {};
  for (const clip of gltf.animations) aktionen[clip.name] = mixer.clipAction(clip);
  let jetzt = null, jetztName = '';
  // Sitzen: das Paket hat keine Sitz-Bewegung – Beine nach jedem Bild (nach der Idle-Bewegung) anwinkeln
  const knochen = {}; group.traverse((o) => { if (o.isBone) knochen[o.name] = o; });
  let sitzt = false;
  const _q = new THREE.Quaternion(), _ax = new THREE.Vector3(1, 0, 0);
  const winkel = (b, a) => { if (!b) return; _q.setFromAxisAngle(_ax, a); b.quaternion.multiply(_q); };
  const BEINE = ['UpperLeg.L', 'UpperLeg.R', 'LowerLeg.L', 'LowerLeg.R'].map((n) => knochen[n]).filter(Boolean);
  const ruhe = BEINE.map((b) => b.quaternion.clone());
  return {
    group: huelle, mixer, namen: Object.keys(aktionen),
    spiele(name, { einmal = false, tempo = 1, blende = 0.25 } = {}) {
      const a = aktionen[name] || aktionen.Idle;
      if (!a) return;
      a.timeScale = tempo;
      if (a === jetzt) return;
      a.reset(); a.setLoop(einmal ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = einmal;
      if (jetzt) a.crossFadeFrom(jetzt, blende, true);
      a.play(); jetzt = a; jetztName = name;
    },
    get aktion() { return jetztName; },
    sitzen(v) { sitzt = !!v; group.position.y = 0; },
    update(dt) {
      if (sitzt) BEINE.forEach((b, i) => b.quaternion.copy(ruhe[i]));   // nicht aufaddieren, falls Idle die Beine nicht bewegt
      mixer.update(dt);
      if (sitzt) {
        winkel(knochen['UpperLeg.L'], SITZ.ober); winkel(knochen['UpperLeg.R'], SITZ.ober);
        winkel(knochen['LowerLeg.L'], SITZ.unter); winkel(knochen['LowerLeg.R'], SITZ.unter);
        group.position.y = SITZ.tief;
      }
    },
  };
}

// Sitzhaltung (Bogenmaß je Knochen, Absenken in Modell-Einheiten) – für Tests einstellbar: SITZ.ober = …
export const SITZ = { ober: -1.45, unter: 1.5, tief: -0.42 };

// Namensschild über dem Kopf (Sprite mit Leinwand), blendet nach Entfernung aus
export function namensschild(text, farbe = '#2b3a55') {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128;
  const x = cv.getContext('2d');
  x.font = 'bold 60px system-ui, sans-serif';
  const w = Math.min(500, x.measureText(text).width + 64);
  x.fillStyle = 'rgba(255,255,255,0.92)'; rund(x, (512 - w) / 2, 22, w, 84, 42); x.fill();
  x.fillStyle = farbe; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 256, 66);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthWrite: false, transparent: true, toneMapped: false }));
  s.scale.set(1.2, 0.3, 1); s.position.y = 2.05; s.renderOrder = 20;
  return s;
}
function rund(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
