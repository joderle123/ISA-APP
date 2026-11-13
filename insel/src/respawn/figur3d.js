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
    // Das kurze Haar des Kopfmodells ausblenden (wenn eine eigene Frisur oder ein Tuch den Kopf ganz bedeckt)
    versteckeHaar() { for (const t of teile) if (t.bau && t.bau.teil === 'Head' && (t.name === 'Hair' || t.name === 'Hair_White' || t.name === 'Moustache')) t.mesh.visible = false; },
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

// ---------- Frisuren und Kopfbedeckungen ----------
// Das Paket hat nur kurze Männerfrisuren. Damit jede Figur ihr eigenes Haar behält (Aussehen der Insel-Figuren:
// look.hairStyle, look.head), kommen einfache Formen an den Kopf: langes Haar, Zöpfe, Bob, Dutt, Locken, Kopftuch,
// Irokese, Stacheln, Mütze, Kappe, Stirnband. Maße in Metern im „Kopfraum“: Ursprung am Kopfgelenk (Halsende),
// y nach oben, z nach vorn (Gesicht). Kopfmitte liegt bei (0, 0.10, 0.012), Radius rund 0.105.
const K = { y: 0.10, z: 0.012, r: 0.105 };
function form(geo, farbe, mat, pos, dreh, mass) {
  const n = geo.attributes.position.count, c = new THREE.Color(farbe);
  const col = new Float32Array(n * 3); for (let i = 0; i < n; i++) { col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(n), 1));
  const m = new THREE.Mesh(geo, mat);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  if (dreh) m.rotation.set(dreh[0], dreh[1], dreh[2]);
  if (mass) m.scale.set(mass[0], mass[1], mass[2]);
  m.castShadow = true; m.frustumCulled = false;
  return m;
}
// Schale über Hinterkopf und Scheitel (vorn offen); seite = wie weit sie um die Wangen reicht (Bogenmaß), tief = wie weit nach unten
const schale = (farbe, mat, { r = K.r * 1.2, seite = 0.55, tief = 1.9 } = {}) =>   // größer als das kurze Haar des Kopfmodells
  form(new THREE.SphereGeometry(r, 12, 8, Math.PI - seite, Math.PI + seite * 2, 0, tief), farbe, mat, [0, K.y, K.z]);
// Vorderes Stück über Stirn und Scheitel: schließt die Schale vorn (Haaransatz)
const ansatz = (farbe, mat, { r = K.r * 1.2, tief = 0.92 } = {}) => form(new THREE.SphereGeometry(r, 10, 4, Math.PI / 2 - 1.05, 2.1, 0, tief), farbe, mat, [0, K.y, K.z]);
// Diese Frisuren bedecken den ganzen Kopf: das kurze Haar des Kopfmodells wird dann ausgeblendet
const DECKT = ['lang', 'bob', 'dutt', 'flechtzoepfe', 'locken', 'kopftuch'];
export function baueFrisur(look = {}, mat) {
  const g = new THREE.Group(); g.name = 'frisur'; g.userData.deckt = DECKT.includes(look.hairStyle);
  if (['lang', 'bob', 'dutt', 'flechtzoepfe', 'locken'].includes(look.hairStyle)) g.add(ansatz(look.hair || '#3a2a1c', mat));
  const haar = look.hair || '#3a2a1c', stil = look.hairStyle, kopf = look.head;
  const tuch = look.headColor || look.top || '#7a4e8a';
  const kugel = (r, x, y, z, f = haar) => form(new THREE.IcosahedronGeometry(r, 1), f, mat, [x, y, z]);
  if (stil === 'lang') {
    g.add(schale(haar, mat, { seite: 0.75, tief: 2.0 }));
    // Haar fällt hinten bis über die Schultern
    g.add(form(new THREE.CylinderGeometry(K.r * 1.14, K.r * 0.9, 0.3, 9, 1, false, Math.PI / 2 + 0.25, Math.PI - 0.5), haar, mat, [0, K.y - 0.17, K.z - 0.005]));
    g.add(kugel(0.045, 0.085, K.y - 0.07, 0.03)); g.add(kugel(0.045, -0.085, K.y - 0.07, 0.03));   // Strähnen vor den Schultern
  } else if (stil === 'bob') {
    g.add(schale(haar, mat, { seite: 0.95, tief: 2.15 }));
    g.add(form(new THREE.CylinderGeometry(K.r * 1.2, K.r * 1.1, 0.1, 9, 1, false, Math.PI / 2 - 0.35, Math.PI + 0.7), haar, mat, [0, K.y - 0.07, K.z]));
  } else if (stil === 'dutt') {
    g.add(schale(haar, mat, { seite: 0.5, tief: 1.75 }));
    g.add(kugel(0.055, 0, K.y + 0.1, K.z - 0.1));
  } else if (stil === 'flechtzoepfe') {
    g.add(schale(haar, mat, { seite: 0.6, tief: 1.85 }));
    for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) g.add(kugel(0.03 - i * 0.002, sx * (0.092 + i * 0.004), K.y - 0.03 - i * 0.045, K.z + 0.02 + i * 0.006));
  } else if (stil === 'locken') {
    g.add(schale(haar, mat, { seite: 0.6, tief: 1.9 }));
    for (const [x, y, z, r] of [[0, 0.1, 0, 0.058], [0.06, 0.085, 0.02, 0.05], [-0.06, 0.085, 0.02, 0.05], [0.085, 0.04, -0.02, 0.05], [-0.085, 0.04, -0.02, 0.05], [0, 0.07, -0.07, 0.058],
      [0.055, 0.02, -0.085, 0.05], [-0.055, 0.02, -0.085, 0.05], [0, -0.02, -0.095, 0.05], [0.04, 0.1, 0.055, 0.042], [-0.04, 0.1, 0.055, 0.042]]) g.add(kugel(r, x, K.y + y, K.z + z));
  } else if (stil === 'irokese') {
    for (let i = 0; i < 6; i++) g.add(form(new THREE.BoxGeometry(0.03, 0.075 - Math.abs(i - 2.2) * 0.012, 0.045), haar, mat, [0, K.y + 0.118 - Math.abs(i - 2.2) * 0.012, K.z + 0.085 - i * 0.04], [0.5 - i * 0.26, 0, 0]));
  } else if (stil === 'stachel') {
    for (const [x, z] of [[0, 0.06], [0.05, 0.03], [-0.05, 0.03], [0, 0.0], [0.055, -0.035], [-0.055, -0.035], [0, -0.06]]) g.add(form(new THREE.ConeGeometry(0.026, 0.075, 5), haar, mat, [x, K.y + 0.118, K.z + z], [z * 3, 0, -x * 4]));
  } else if (stil === 'kopftuch') {
    // Tuch um Kopf und Hals, das Gesicht bleibt frei
    g.add(form(new THREE.SphereGeometry(K.r * 1.3, 14, 9, Math.PI / 2 + 0.6, Math.PI * 2 - 1.2, 0, 2.5), tuch, mat, [0, K.y + 0.005, K.z - 0.006]));
    g.add(form(new THREE.SphereGeometry(K.r * 1.305, 10, 4, Math.PI / 2 - 0.68, 1.36, 0.0, 0.98), tuch, mat, [0, K.y + 0.005, K.z - 0.006]));   // Stirn bis knapp über die Brauen
    g.add(form(new THREE.CylinderGeometry(0.085, 0.16, 0.15, 10, 1, true), tuch, mat, [0, K.y - 0.145, K.z - 0.005]));           // fällt auf die Schultern
  }
  // Kopfbedeckung (über dem Haar)
  if (kopf === 'muetze') {
    g.add(form(new THREE.SphereGeometry(K.r * 1.27, 12, 6, 0, Math.PI * 2, 0, 1.3), tuch, mat, [0, K.y + 0.012, K.z]));
    g.add(form(new THREE.CylinderGeometry(K.r * 1.3, K.r * 1.3, 0.038, 12, 1, true), tuch, mat, [0, K.y + 0.045, K.z]));
  } else if (kopf === 'cap') {
    g.add(form(new THREE.SphereGeometry(K.r * 1.25, 12, 6, 0, Math.PI * 2, 0, 1.22), tuch, mat, [0, K.y + 0.015, K.z]));
    g.add(form(new THREE.BoxGeometry(0.16, 0.012, 0.11), tuch, mat, [0, K.y + 0.055, K.z + 0.155], [0.12, 0, 0]));
  } else if (kopf === 'stirnband' || kopf === 'bandana') {
    g.add(form(new THREE.CylinderGeometry(K.r * 1.19, K.r * 1.19, kopf === 'bandana' ? 0.05 : 0.034, 12, 1, true), tuch, mat, [0, K.y + 0.05, K.z]));
  }
  return g.children.length ? g : null;
}

// ---------- Überzug: neue Figur auf eine Spielfigur (actors/humanoid) legen ----------
const BEWEGUNG = { idle: 'Idle_Neutral', walk: 'Walk', run: 'Run', jump: 'Run', fall: 'Idle_Neutral', wave: 'Wave', talk: 'Idle_Neutral', cheer: 'Wave',
  sad: 'Idle_Neutral', angry: 'Idle', sit: 'Idle_Neutral', think: 'Idle_Neutral' };
const GESTE = { winken: 'Wave', stopp: 'Interact', handHeben: 'Wave', daumen: 'Interact', lachen: 'Wave' };
const TEMPO = { Walk: 1.15, Run: 1.05 };
const ueberzogen = [];
let laeuft = false;
const _v = new THREE.Vector3();

export async function ueberziehe(game, h, { stil, look, frau = false } = {}) {
  if (!h || h.__figur) return null;
  h.__figur = true;
  const f = await ladeFigur(game, 'menschen', { stil, fest: true });
  f.faerbeNach(look || (h.config || {}));
  f.group.name = 'figur';
  f.group.scale.multiplyScalar(1.8 / HOEHE);   // die Spielfiguren sind 2,0 × Größenfaktor hoch; Kopf knapp unter dem Namensschild
  // Der Kopf etwas größer: liest sich aus der Spielkamera besser (Gesichter) und passt zur gezeichneten Welt.
  let kopf = null, brust = null; f.group.traverse((o) => { if (o.isBone && /^head$/i.test(o.name)) kopf = o; if (o.isBone && /^chest$/i.test(o.name)) brust = o; });
  h.group.add(f.group);
  // Frisur und Kopfbedeckung: an den Kopfknochen, ausgerichtet wie die Spielfigur (in Ruhelage, vor der ersten Bewegung)
  const fr = kopf ? baueFrisur(look || h.config || {}, getMaterial(game.world.veil)) : null;
  if (fr) {
    h.group.updateMatrixWorld(true);
    const wq = new THREE.Quaternion(), bq = new THREE.Quaternion(), bs = new THREE.Vector3(), gs = new THREE.Vector3();
    h.group.getWorldQuaternion(wq); kopf.getWorldQuaternion(bq); kopf.getWorldScale(bs); h.group.getWorldScale(gs);
    fr.quaternion.copy(bq.invert().multiply(wq));
    fr.scale.setScalar(gs.x / (bs.x || 1));
    kopf.add(fr);
    if (fr.userData.deckt) f.versteckeHaar();
  }
  const e = { h, f, kopf, brust, frau: !!frau };
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
        if (x.frau && x.brust) x.brust.scale.set(0.9, 1, 0.92);   // schmalere Schultern
      }
    }, { order: 97, always: true });
  }
  return f;
}
export function entferneUeberzug(h) {
  const i = ueberzogen.findIndex((x) => x.h === h);
  if (i >= 0) { const x = ueberzogen[i]; if (x.f.group.parent) x.f.group.parent.remove(x.f.group); ueberzogen.splice(i, 1); }
}
