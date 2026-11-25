// Lycée-Simulator – Menschen: Quaternius „Ultimate Modular Men/Women“ (CC0) mit Skelett und Bewegungen
// (Idle, Walk, Run, Wave, Interact …). Wie in RESPAWN (respawn/figur3d.js) werden die Material-Farben in die Eckpunkte
// geschrieben, damit alle Figuren das Toon-Material des Spiels tragen und sich umfärben lassen (Haut, Haar, Kleidung).
// Hier eigene Fassung, weil die Frauen-Datei Materialnamen mit Endungen hat („Skin.003“) und eigene Haarfarben.
//   const f = await ladePerson(veil, { modell: 'frauen', stil: 'Casual', haut, haar, oben, unten, schuhe })
//   f.group · f.spiele('Walk') · f.update(dt)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import BEWEGUNGEN from './bewegungen.json';   // Mixamo-Bewegungen (vom Nutzer, 20.11.), auf das Quaternius-Skelett übertragen – tools/lycee/mixamo/
// Zusätzliche Bewegungen für alle Figuren: Skaten, Elfmeter, SitzenReden (nur Oberkörper – die Beine macht sitzen()), Jubeln, Tanzen
let _zusatz = null;
function zusatzClips() {
  if (_zusatz) return _zusatz;
  _zusatz = Object.values(BEWEGUNGEN).map((b) => {
    const n = Math.round(b.dauer * b.fps) + 1, t = new Float32Array(n); for (let i = 0; i < n; i++) t[i] = i / b.fps;
    const tracks = [];
    b.knochen.forEach((k, i) => { if (b.name === 'SitzenReden' && /Leg|Foot|Hips/.test(k)) return; if (b.q[i].length !== n * 4) return; tracks.push(new THREE.QuaternionKeyframeTrack(k + '.quaternion', t, Float32Array.from(b.q[i]))); });
    return new THREE.AnimationClip(b.name, b.dauer, tracks);
  });
  return _zusatz;
}
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { getMaterial } from '../actors/humanoid/base.js';
import { baueFrisur } from './frisur.js';
import { baueRuecken } from './ruecken.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
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

export async function ladePerson(veil, { modell = 'menschen', stil = 'Casual', haut, haar, oben, unten, schuhe, hoehe = 1.72, frisur = null, kopf = null, kopfFarbe = null, brille = null, brilleArt = null, ruecken = null, rueckenFarbe = null } = {}) {
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
  // Blinzeln (AAA: Augen leben): Die Augen sind eigene Farbflächen – für 0,12 s nehmen sie die Hautfarbe an (Lid zu).
  // Die gepackten Modelle haben die Augen als kleine dunkle Farbinsel im Kopf (rund 72 Eckpunkte) – beim ersten Bild suchen.
  let AUGEN = null;   // [{ attr, idx: [..], auge: [r,g,b], lid: [r,g,b] }]
  const augenSuchen = () => {
    AUGEN = [];
    group.traverse((o) => {
      if (!o.isMesh || !o.geometry || !o.geometry.attributes.color) return;
      const c = o.geometry.attributes.color, gruppen = new Map();
      for (let i = 0; i < c.count; i++) { const k = c.getX(i).toFixed(2) + ',' + c.getY(i).toFixed(2) + ',' + c.getZ(i).toFixed(2); if (!gruppen.has(k)) gruppen.set(k, []); gruppen.get(k).push(i); }
      let haut = null, hautN = 0; for (const [k, idx] of gruppen) { const [r, g, b] = k.split(',').map(Number); if (r > g && g > b && r > 0.15 && idx.length > hautN) { haut = [r, g, b]; hautN = idx.length; } }
      if (!haut) return;
      for (const [k, idx] of gruppen) { const [r, g, b] = k.split(',').map(Number); if (r + g + b < 0.2 && idx.length >= 24 && idx.length <= 80) AUGEN.push({ attr: c, idx, auge: [r, g, b], lid: haut.map((v) => v * 0.85) }); }
    });
  };
  const augenSetzen = (zu) => { for (const A of AUGEN) { const f = zu ? A.lid : A.auge; for (const i of A.idx) A.attr.setXYZ(i, f[0], f[1], f[2]); A.attr.needsUpdate = true; } };
  group.updateMatrixWorld(true);
  const kasten = new THREE.Box3();
  for (const t of teile) { t.mesh.computeBoundingBox(); kasten.union(t.mesh.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)); }
  const h = kasten.max.y - kasten.min.y;
  // Sichtprüfung je Teil: großzügige Kugel um die ganze Figur (Arme, Sitzen, Sprünge passen hinein). Vorher wurden alle
  // Figuren immer gezeichnet – auch hinter der Kamera und in der Schattenkarte.
  {
    const kugel = new THREE.Sphere(); kasten.getBoundingSphere(kugel); kugel.radius *= 1.45;
    const inv = new THREE.Matrix4(), sk = new THREE.Vector3();
    for (const t of teile) {
      inv.copy(t.mesh.matrixWorld).invert(); t.mesh.getWorldScale(sk);
      const lokal = new THREE.Sphere(kugel.center.clone().applyMatrix4(inv), kugel.radius / Math.max(sk.x, sk.y, sk.z, 1e-6));
      if (t.mesh.isSkinnedMesh) t.mesh.boundingSphere = lokal; else t.mesh.geometry.boundingSphere = lokal;
      t.mesh.frustumCulled = true;
    }
  }
  if (h > 0.1) group.scale.multiplyScalar(hoehe / h);
  const huelle = new THREE.Group(); huelle.add(group);
  // Frisur und Kopfbedeckung (wie RESPAWN): an den Kopfknochen, in Ruhelage ausgerichtet; deckt sie den Kopf, fällt das kurze Haar weg
  if (frisur || kopf || brille) {
    let kb = null; group.traverse((o) => { if (o.isBone && /^head$/i.test(o.name)) kb = o; });
    const fr = kb ? baueFrisur({ hair: haar, hairStyle: frisur, head: kopf, headColor: kopfFarbe || oben, glasses: brille, glassesStyle: brilleArt }, mat) : null;
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
  // Rücken-Teil aus der Garderobe (ruecken.js): am Brustknochen, in Ruhelage ausgerichtet wie die Frisur
  let rueckenTeil = null, rkT = 0;
  if (ruecken) {
    let cb = null; group.traverse((o) => { if (o.isBone && /^chest$/i.test(o.name)) cb = o; });
    const rk = cb ? baueRuecken(ruecken, rueckenFarbe, mat) : null;
    if (rk) {
      huelle.updateMatrixWorld(true);
      const wq = new THREE.Quaternion(), bq = new THREE.Quaternion(), bs = new THREE.Vector3(), gs = new THREE.Vector3();
      huelle.getWorldQuaternion(wq); cb.getWorldQuaternion(bq); cb.getWorldScale(bs); huelle.getWorldScale(gs);
      const halter = new THREE.Group(); halter.quaternion.copy(bq.invert().multiply(wq)); halter.scale.setScalar(gs.x / (bs.x || 1));
      halter.add(rk); cb.add(halter); rueckenTeil = rk;   // rk schwingt beim Laufen leicht (update)
    }
  }
  // Teile mit gleicher Ruhelage (gleiche inverseBindMatrices) zu EINEM Netz zusammenfassen (gleiches Material):
  // statt 4–8 nur noch 1–3 Zeichenaufrufe je Figur. Jede Gruppe wird nachgeprüft (Stichproben vorher/nachher).
  try {
    const sicht = teile.filter((t) => t.mesh.visible && t.mesh.isSkinnedMesh && !Object.keys(t.mesh.geometry.morphAttributes || {}).length);
    const gleich = (a, b) => a.elements.every((v, i) => Math.abs(v - b.elements[i]) < 1e-4 * Math.max(1, Math.abs(v)));
    const gruppen = [];
    for (const t of sicht) {
      let g = null;
      for (const gr of gruppen) {
        const idx = gr.idx, ib = gr.leit.mesh.skeleton.boneInverses;
        if (t.mesh.skeleton.bones.every((b, k) => idx.has(b) && gleich(ib[idx.get(b)], t.mesh.skeleton.boneInverses[k])) && gleich(gr.leit.mesh.bindMatrix, t.mesh.bindMatrix)) { g = gr; break; }
      }
      if (g) g.teile.push(t); else gruppen.push({ leit: t, idx: new Map(t.mesh.skeleton.bones.map((b, k) => [b, k])), teile: [t] });
    }
    const NAMEN = ['position', 'normal', 'skinIndex', 'skinWeight', 'color', 'aWind'];
    const va = new THREE.Vector3(), vb = new THREE.Vector3();
    for (const gr of gruppen) {
      if (gr.teile.length < 2) continue;
      const geos = gr.teile.map((t) => {
        const g = t.mesh.geometry.index ? t.mesh.geometry.toNonIndexed() : t.mesh.geometry.clone();
        for (const k of Object.keys(g.attributes)) if (!NAMEN.includes(k)) g.deleteAttribute(k);
        if (!NAMEN.every((k) => g.attributes[k])) throw new Error('attr');
        const karte = t.mesh.skeleton.bones.map((b) => gr.idx.get(b));
        const si = g.attributes.skinIndex, neuIdx = new Uint16Array(si.count * 4);
        for (let i = 0; i < si.count; i++) for (let j = 0; j < 4; j++) neuIdx[i * 4 + j] = karte[si.getComponent(i, j)];
        g.setAttribute('skinIndex', new THREE.BufferAttribute(neuIdx, 4));
        return g;
      });
      const ein = mergeGeometries(geos); geos.forEach((g) => g.dispose());
      if (!ein) continue;
      const leit = gr.leit.mesh, m = new THREE.SkinnedMesh(ein, mat);
      m.name = 'figur'; m.castShadow = true; m.receiveShadow = false;
      leit.parent.add(m); m.position.copy(leit.position); m.quaternion.copy(leit.quaternion); m.scale.copy(leit.scale);
      m.bind(leit.skeleton, leit.bindMatrix.clone());
      huelle.updateMatrixWorld(true);
      let off = 0, fehler = 0;
      for (const t of gr.teile) {
        const ix = t.mesh.geometry.index, nn = ix ? ix.count : t.mesh.geometry.attributes.position.count;
        for (let k = 0; k < nn; k += Math.max(1, Math.floor(nn / 30))) {
          t.mesh.getVertexPosition(ix ? ix.getX(k) : k, va).applyMatrix4(t.mesh.matrixWorld);
          m.getVertexPosition(off + k, vb).applyMatrix4(m.matrixWorld);
          fehler = Math.max(fehler, va.distanceTo(vb));
        }
        off += nn;
      }
      if (fehler > 0.01) { m.parent.remove(m); ein.dispose(); continue; }
      ein.computeBoundingSphere(); m.boundingSphere = ein.boundingSphere.clone(); m.boundingSphere.radius *= 1.6;
      m.frustumCulled = true;
      for (const t of gr.teile) { t.mesh.parent.remove(t.mesh); t.mesh.geometry.dispose(); }
    }
  } catch (e) { /* dann bleiben die Teile einzeln */ }
  const mixer = new THREE.AnimationMixer(group);
  const aktionen = {};
  for (const clip of gltf.animations) aktionen[clip.name] = mixer.clipAction(clip);
  try { for (const clip of zusatzClips()) aktionen[clip.name] = mixer.clipAction(clip); } catch (e) { /* ohne Zusatz-Bewegungen */ }
  let jetzt = null, jetztName = '';
  // Sitzen: das Paket hat keine Sitz-Bewegung – Beine nach jedem Bild (nach der Idle-Bewegung) anwinkeln
  // Der Lader entfernt Punkte aus Knochennamen („UpperLeg.L“ → „UpperLegL“) – darum ohne Punkt nachschlagen
  const knochen = {}; group.traverse((o) => { if (o.isBone) knochen[o.name.replace(/\./g, '')] = o; });
  let sitzt = false;
  const _q = new THREE.Quaternion(), _ax = new THREE.Vector3(1, 0, 0);
  const winkel = (b, a) => { if (!b) return; _q.setFromAxisAngle(_ax, a); b.quaternion.multiply(_q); };
  const BEINE = ['UpperLegL', 'UpperLegR', 'LowerLegL', 'LowerLegR'].map((n) => knochen[n]).filter(Boolean);
  const ruhe = BEINE.map((b) => b.quaternion.clone());
  // Blick (wie in großen Story-Spielen): Kopf und Nacken drehen sich weich zu einem Ziel – Grenzen wie beim Menschen
  // (seitlich ±65°, hoch/runter −25°…+20°), Nacken 40 %, Kopf 60 %. Ziel hinter dem Rücken: geradeaus schauen.
  const KOPF = knochen.Head, NACKEN = knochen.Neck;
  // Jede Figur ein bisschen anders: eigenes Ruhe-Tempo, eigene Atem-Phase (sonst wippen alle im Gleichtakt)
  const RUHIG = { Idle: 1, Idle_Neutral: 1, Interact: 1 };
  const eigenTempo = 0.9 + Math.random() * 0.2, atemPhase = Math.random() * 6.28, atemHz = 0.2 + Math.random() * 0.08;
  const BRUST = knochen.Chest, brustVor = new THREE.Quaternion(); let atemT = 0, atemAn = false;
  let blickZiel = null, bYaw = 0, bPitch = 0, bAktiv = false;
  // Sprechen: leichtes Kopfnicken im Rhythmus der Sätze (statt Mund – die Modelle haben kein Gesicht zum Bewegen)
  let redetZiel = 0, redetW = 0, redeT = Math.random() * 10, redeAn = false; const kopfRedeVor = new THREE.Quaternion();
  let blinzelIn = 1 + Math.random() * 4, lidZu = 0;
  let nickT = 0; const NICK = 0.6;   // Zuhören: einmal kurz nicken
  // Gesten zum Gesagten (prozedural, die Modelle haben keine eigenen Clips): Kopf schütteln, neigen (Frage), lachen, senken
  const GESTE = { schuetteln: 0.95, neigen: 1.5, lachen: 1.0, senken: 1.5, zucken: 1.4, erklaeren: 2.2 };   // zucken: Schulterzucken mit offenen Händen
  let gesteArt = null, gesteT = 0; const _ay = new THREE.Vector3(0, 1, 0), _az = new THREE.Vector3(0, 0, 1);
  const kopfVor = new THREE.Quaternion(), nackenVor = new THREE.Quaternion();
  const _hp = new THREE.Vector3(), _fw = new THREE.Vector3(), _rt = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0);
  const _kq = new THREE.Quaternion(), _bw = new THREE.Quaternion(), _pw = new THREE.Quaternion(), _qy = new THREE.Quaternion(), _qp = new THREE.Quaternion();
  const drehe = (b, anteil) => {
    if (!b || !b.parent) return;
    _qy.setFromAxisAngle(_up, bYaw * anteil); _qp.setFromAxisAngle(_rt, -bPitch * anteil);
    b.getWorldQuaternion(_bw); b.parent.getWorldQuaternion(_pw);
    _bw.premultiply(_qp).premultiply(_qy);
    b.quaternion.copy(_pw.invert().multiply(_bw)); b.updateMatrixWorld(true);
  };
  // ---------- Arme und Hände per IK (Handschläge): Ziel für die Hand, Ellbogen-Richtung, Handfläche, Faust/Finger ----------
  // Alles in Weltkoordinaten über Richtungen zwischen den Knochen – unabhängig davon, wie die Achsen im Modell liegen.
  const ARM = {}; for (const s of ['R', 'L']) {
    const k = (n) => knochen[n + s];
    ARM[s] = { O: k('UpperArm'), U: k('LowerArm'), W: k('Wrist'), M: k('Middle1'), I: k('Index1'), P: k('Pinky1'),
      finger: ['Index', 'Middle', 'Ring', 'Pinky'].map((f) => [1, 2, 3].map((n) => k(f + n)).filter(Boolean)), daumen: [1, 2, 3].map((n) => k('Thumb' + n)).filter(Boolean) };
  }
  const ARMOK = !!(ARM.R.O && ARM.R.U && ARM.R.W && ARM.R.M && ARM.L.O && ARM.L.U && ARM.L.W && ARM.L.M);
  // Wunsch je Hand: { w: Gewicht 0..1, ziel: Vector3 (Welt), pol: Vector3 (Ellbogen zeigt dorthin), richtung: Vector3 (Hand zeigt dorthin),
  //   flaeche: Vector3 (Handfläche zeigt dorthin), faust: 0..1, zeige: 0..1 (Zeigefinger bleibt gestreckt), daumenHoch: bool }
  const HAND = { R: { w: 0 }, L: { w: 0 } };
  const ikVor = new Map();   // Knochen → Lage vor der IK (vor dem nächsten Mixer-Schritt zurücksetzen)
  const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3(), _v4 = new THREE.Vector3(), _v5 = new THREE.Vector3(), _v6 = new THREE.Vector3();
  const _qa = new THREE.Quaternion(), _q1 = new THREE.Quaternion(), _qi = new THREE.Quaternion();
  const wp = (b, v) => { b.updateWorldMatrix(true, false); return b.getWorldPosition(v); };
  const merk = (b) => { if (b && !ikVor.has(b)) ikVor.set(b, b.quaternion.clone()); };
  // Knochen in Weltrichtung drehen: Weltrotation q (anteilig w) auf den Knochen anwenden
  const weltDreh = (b, q, w) => {
    merk(b); _q1.copy(_qi).slerp(q, w);
    b.getWorldQuaternion(_bw); b.parent.getWorldQuaternion(_pw);
    _bw.premultiply(_q1); b.quaternion.copy(_pw.invert().multiply(_bw)); b.updateMatrixWorld(true);
  };
  const richte = (b, von, zu, w) => { _qa.setFromUnitVectors(_v5.copy(von).normalize(), _v6.copy(zu).normalize()); weltDreh(b, _qa, w); };
  // Handfläche: Normale aus Zeige- und Kleinfinger-Ansatz; Vorzeichen je Seite (rechte/linke Hand gespiegelt)
  const FL_VZ = { R: 1, L: -1 };
  const handBasis = (A, s, dir, nor) => {
    wp(A.W, _v1); wp(A.M, dir).sub(_v1).normalize();
    wp(A.I, _v2); wp(A.P, _v3); _v2.sub(_v3);
    nor.crossVectors(dir, _v2).normalize().multiplyScalar(FL_VZ[s]);
  };
  const _hd = new THREE.Vector3(), _hn = new THREE.Vector3(), _achse = new THREE.Vector3();
  const armAnwenden = (s) => {
    const h = HAND[s], A = ARM[s];
    if (!ARMOK || !h.w || h.w < 0.002 || !h.ziel) return;
    const w = Math.min(1, h.w);
    const pO = wp(A.O, new THREE.Vector3()), pU = wp(A.U, _v1).clone(), pW = wp(A.W, _v2).clone();
    const a = pO.distanceTo(pU), b = pU.distanceTo(pW);
    const zuZiel = _v3.copy(h.ziel).sub(pO); let d = zuZiel.length(); const dir = zuZiel.normalize().clone();
    d = Math.max(0.05, Math.min(d, (a + b) * 0.995));
    const pol = (h.pol ? _v4.copy(h.pol) : _v4.set(0, -1, 0)); pol.addScaledVector(dir, -pol.dot(dir)); if (pol.lengthSq() < 1e-6) pol.set(0, -1, 0); pol.normalize();
    const cosA = Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))), sinA = Math.sqrt(1 - cosA * cosA);
    const ell = pO.clone().addScaledVector(dir, a * cosA).addScaledVector(pol, a * sinA);
    richte(A.O, pU.clone().sub(pO), ell.clone().sub(pO), w);
    const pU2 = wp(A.U, new THREE.Vector3()), pW2 = wp(A.W, new THREE.Vector3());
    const ziel = pO.clone().addScaledVector(dir, d);
    richte(A.U, pW2.clone().sub(pU2), ziel.sub(pU2), w);
    // Hand ausrichten: erst die Richtung, dann um diese Achse drehen, bis die Handfläche stimmt
    if (h.richtung) { handBasis(A, s, _hd, _hn); richte(A.W, _hd, h.richtung, w); }
    if (h.flaeche) {
      handBasis(A, s, _hd, _hn);
      const f = _v3.copy(h.flaeche).addScaledVector(_hd, -h.flaeche.dot(_hd)); if (f.lengthSq() > 1e-5) { f.normalize(); const n = _hn.addScaledVector(_hd, -_hn.dot(_hd)).normalize();
        let ang = Math.acos(Math.max(-1, Math.min(1, n.dot(f)))); if (_achse.crossVectors(n, f).dot(_hd) < 0) ang = -ang; _qa.setFromAxisAngle(_hd, ang); weltDreh(A.W, _qa, w); }
    }
    // Finger krümmen (Faust): jedes Glied um die Achse quer zu Finger und Handfläche – zur Handfläche hin
    const faust = (h.faust || 0) * w;
    if (faust > 0.01 || h.zeige) {
      handBasis(A, s, _hd, _hn);
      A.finger.forEach((kette, fi) => {
        const krumm = fi === 0 && h.zeige ? faust * (1 - h.zeige) : faust;
        if (krumm < 0.01) return;
        kette.forEach((g, gi) => {
          const nach = g.children.find((c) => c.isBone); if (!nach) return;
          const fd = wp(nach, _v1).sub(wp(g, _v2)).normalize();
          _achse.crossVectors(fd, _hn).normalize(); if (_achse.lengthSq() < 1e-6) return;
          _qa.setFromAxisAngle(_achse, krumm * [1.35, 1.45, 1.1][gi]); weltDreh(g, _qa, 1);
        });
      });
      if (A.daumen.length && !h.daumenHoch) A.daumen.forEach((g, gi) => { if (gi === 0) return; const nach = g.children.find((c) => c.isBone); if (!nach) return;
        const fd = wp(nach, _v1).sub(wp(g, _v2)).normalize(); _achse.crossVectors(fd, _hn).normalize(); if (_achse.lengthSq() < 1e-6) return; _qa.setFromAxisAngle(_achse, faust * 0.7); weltDreh(g, _qa, 1); });
    }
  };
  // Körper: kleine Neigung nach vorn (zum Partner), in Weltrichtung um die Hüfte
  let lehnW = 0; const HUEFTE = knochen.Hips, BAUCH = knochen.Abdomen, _lehn = new THREE.Vector3();
  const lehnAnwenden = () => {
    const lw = lehnW + poseLehn; if (Math.abs(lw) < 0.002 || !BAUCH) return;
    huelle.getWorldQuaternion(_kq); _lehn.set(1, 0, 0).applyQuaternion(_kq); _qa.setFromAxisAngle(_lehn, lw); weltDreh(BAUCH, _qa, 1);
  };
  // ---------- Sitzen (Auftrag 19.11.: „kein natürliches Sitzen“): Hüfte auf der Sitzfläche, Oberschenkel waagrecht,
  // Unterschenkel senkrecht, Füße auf dem Boden – per Bein-IK, passend zur Höhe des Sitzes (Stuhl ≈ 0,47 m, Kübelrand 0,56 m)
  let sitzH = 0.47;
  const _b1 = new THREE.Vector3(), _b2 = new THREE.Vector3(), _b3 = new THREE.Vector3(), _bz = new THREE.Vector3(), _bp = new THREE.Vector3(), _bg = new THREE.Vector3();
  const beinIK = (s, boden) => {
    const O = knochen['UpperLeg' + s], U = knochen['LowerLeg' + s], F = knochen['Foot' + s]; if (!O || !U || !F) return;
    wp(O, _b1); wp(U, _b2); wp(F, _b3);
    const a = _b1.distanceTo(_b2), b = _b2.distanceTo(_b3);
    huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
    // Fuß: eine Oberschenkellänge vor der Hüfte, auf dem Boden (Knöchel ≈ 8 cm hoch)
    _bz.copy(_b1).addScaledVector(_fw, a * 0.95); _bz.y = boden + 0.08 * (a / 0.42);
    const dir = _bp.copy(_bz).sub(_b1); let d = dir.length(); dir.normalize(); d = Math.max(0.05, Math.min(d, (a + b) * 0.995));
    const pol = _bg.copy(_fw).addScaledVector(_up, 0.6); pol.addScaledVector(dir, -pol.dot(dir)).normalize();
    const cosA = Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))), sinA = Math.sqrt(1 - cosA * cosA);
    const knie = _b1.clone().addScaledVector(dir, a * cosA).addScaledVector(pol, a * sinA);
    richte(O, _b2.clone().sub(_b1), knie.clone().sub(_b1), 1);
    wp(U, _b2); wp(F, _b3);
    richte(U, _b3.clone().sub(_b2), _b1.clone().addScaledVector(dir, d).sub(_b2), 1);
    // Fuß flach: Richtung Ferse→Zehen waagrecht nach vorn
    const Z = knochen['PT' + s]; if (Z) { wp(F, _b3); wp(Z, _b2); const zu = _bp.copy(_fw).setY(-0.15); richte(F, _b2.clone().sub(_b3), zu, 1); }
  };
  const sitzPose = () => {
    if (!knochen.UpperLegL) { group.position.y = SITZ.tief; return; }
    // erst gerade hinstellen, Hüfthöhe messen, dann so weit absenken, dass die Hüfte auf dem Sitz liegt
    group.position.y = 0; group.position.z = 0; huelle.updateMatrixWorld(true);
    huelle.getWorldPosition(_bg); const boden = _bg.y;
    const hy = (wp(knochen.UpperLegL, _b1).y + wp(knochen.UpperLegR, _b2).y) / 2 - boden;
    const sk = huelle.scale.y || 1;
    group.position.y = (sitzH + 0.07 - hy) / sk; group.position.z = 0.07 / sk;   // Gesäß hinter dem Hüftgelenk: etwas nach vorn
    huelle.updateMatrixWorld(true);
    beinIK('L', boden); beinIK('R', boden);
  };
  let sitzHand = false; const _o1 = new THREE.Vector3(), _o2 = new THREE.Vector3();
  // Schulterzucken: beide Hände seitlich auf Hüfthöhe, Handflächen nach oben, Ellbogen hängen (Gewicht w = Hülle der Geste)
  let zuckW = 0; const _zr = new THREE.Vector3(), _zk = new THREE.Vector3();
  // Erklären: rechte Hand offen vor dem Bauch, wippt leicht im Sprechtakt
  let erklW = 0, erklT = 0;
  const erklHand = () => {
    huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
    wp(NACKEN || KOPF, _zk);
    const H = HAND.R, A = ARM.R; if (H.w && !H.erkl) return;
    wp(A.O, _o1); _zr.copy(_o1).sub(_zk).setY(0).normalize();
    H.ziel = (H.ziel || new THREE.Vector3()).copy(_o1).addScaledVector(_fw, 0.34).addScaledVector(_zr, 0.06); H.ziel.y -= 0.3 - Math.sin(erklT * 5.5) * 0.04;
    H.richtung = (H.richtung || new THREE.Vector3()).copy(_fw).addScaledVector(_zr, -0.3).normalize();
    H.flaeche = (H.flaeche || new THREE.Vector3()).set(0, 1, 0).addScaledVector(_zr, -0.5).normalize(); H.pol = (H.pol || new THREE.Vector3()).copy(_zr).multiplyScalar(0.5).setY(-1);
    H.faust = 0.1; H.zeige = 0; H.daumenHoch = false; H.w = erklW; H.erkl = true;
  };
  // ---------- Emotes (Emote-Rad, Auftrag 20.11. „wie bei Fortnite“): prozedurale Posen über die Hand-IK ----------
  // Rahmen aus den Schultern: r = zur rechten Schulter, f = vorn, c = Schultermitte, k = Kopf. Gewicht blendet weich ein/aus.
  let schlafZiel = 0, schlafW = 0, schlafAn = false; const kopfSchlafVor = new THREE.Quaternion();
  const POSEN = { daumen: 2.2, klatschen: 2.6, herz: 2.8, sieger: 2.4, facepalm: 2.4, verbeugen: 2.4, roboter: 4.2, gitarre: 3.4, denken: 3, winken2: 2.6 };
  let poseArt = null, poseT = 0, poseD = 1, poseLehn = 0;
  const _pr = new THREE.Vector3(), _pc = new THREE.Vector3(), _pk = new THREE.Vector3(), _pz = new THREE.Vector3(), _pd = new THREE.Vector3(), _pf = new THREE.Vector3(), _pp = new THREE.Vector3(), _pq = new THREE.Quaternion();
  const setzeHand = (s, w, ziel, richtung, flaeche, pol, faust, extra) => {
    const H = HAND[s]; if (H.w && !H.pose) return;   // Handschlag o. Ä. hat Vorrang
    H.ziel = (H.ziel || new THREE.Vector3()).copy(ziel); H.richtung = (H.richtung || new THREE.Vector3()).copy(richtung).normalize();
    H.flaeche = (H.flaeche || new THREE.Vector3()).copy(flaeche).normalize(); H.pol = (H.pol || new THREE.Vector3()).copy(pol);
    H.faust = faust; H.zeige = (extra && extra.zeige) || 0; H.daumenHoch = !!(extra && extra.daumenHoch); H.w = w; H.pose = true;
  };
  const poseEnde = () => { for (const s of ['R', 'L']) if (HAND[s].pose) { HAND[s].w = 0; HAND[s].pose = false; } poseLehn = 0; poseArt = null; poseT = 0; };
  const poseHaende = () => {
    const D = poseD, p = 1 - poseT / D, t = D - poseT, w = Math.min(1, t / 0.25, poseT / 0.3);
    huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
    const oR = wp(ARM.R.O, _o1), oL = wp(ARM.L.O, _o2);
    const r = _pr.copy(oR).sub(oL).setY(0).normalize(), f = _fw, u = _up;
    _pc.copy(oR).add(oL).multiplyScalar(0.5); wp(KOPF || NACKEN, _pk);
    const P = (out, basis, a, b, c) => out.copy(basis).addScaledVector(r, a).addScaledVector(u, b).addScaledVector(f, c);
    const R = (out, a, b, c) => out.set(0, 0, 0).addScaledVector(r, a).addScaledVector(u, b).addScaledVector(f, c);
    const kopfDreh = (achse, ang) => { if (KOPF) { _pq.setFromAxisAngle(achse, ang * w); weltDreh(KOPF, _pq, 1); } };
    const beide = (fn) => { for (const [s, sg] of [['R', 1], ['L', -1]]) fn(s, sg, s === 'R' ? oR : oL); };
    poseLehn = 0;
    switch (poseArt) {
      case 'daumen':   // Faust vor der Brust, Daumen nach oben
        setzeHand('R', w, P(_pz, _pc, 0.13, -0.1 + Math.min(1, t * 4) * 0.05, 0.4), R(_pd, -0.2, 0.1, 1), R(_pf, -1, 0, 0), R(_pp, 0.6, -1, -0.3), 1, { daumenHoch: true }); break;
      case 'klatschen': {   // Handflächen gegeneinander, schneller Takt
        const g = 0.025 + Math.abs(Math.sin(t * 7.5)) * 0.12;
        beide((s, sg) => setzeHand(s, w, P(_pz, _pc, sg * g, -0.13, 0.32), R(_pd, 0, 0.9, 0.6), R(_pf, -sg, 0, 0), R(_pp, sg * 0.7, -1, 0), 0)); break; }
      case 'herz':   // Hände formen vor der Brust ein Herz
        beide((s, sg) => setzeHand(s, w, P(_pz, _pc, sg * 0.035, -0.08, 0.3), R(_pd, -sg * 0.6, 0.8, 0.15), R(_pf, 0, 0, -1), R(_pp, sg * 0.9, -0.6, 0), 0.45)); break;
      case 'sieger':   // Fäuste nach oben, kleines Federn
        beide((s, sg, o) => setzeHand(s, w, P(_pz, o, sg * 0.24, 0.5 + Math.abs(Math.sin(t * 5)) * 0.04, 0.04), R(_pd, sg * 0.35, 1, 0), f, R(_pp, sg, 0, -0.3), 1)); break;
      case 'facepalm':   // Hand vor die Stirn, Kopf sinkt
        setzeHand('R', w, P(_pz, _pk, 0.02, 0.0, 0.12), R(_pd, -0.25, 1, 0.1), R(_pf, 0, 0, -1), R(_pp, 1, -0.6, 0.2), 0.1); break;
      case 'verbeugen':   // nach vorn neigen, rechte Hand vor dem Bauch, linke auf dem Rücken
        poseLehn = 0.62 * (D > 10 ? Math.min(1, t / 0.8) : Math.pow(Math.sin(Math.PI * Math.min(1, p * 1.1)), 0.7));
        setzeHand('R', w, P(_pz, _pc, 0, -0.42, 0.2), R(_pd, -1, 0, 0.15), R(_pf, 0, 0, -1), R(_pp, 1, -0.5, 0), 0.2);
        setzeHand('L', w, P(_pz, _pc, 0, -0.5, -0.2), R(_pd, 1, 0, -0.15), R(_pf, 0, 0, 1), R(_pp, -1, -0.5, 0), 0.2); break;
      case 'roboter': {   // eckig: Unterarme im Wechsel hoch und runter, Kopf ruckt
        const k = Math.floor(t * 2.6) % 4;
        beide((s, sg) => setzeHand(s, w, P(_pz, _pc, sg * 0.2, -0.25 + ((k % 2 === 0) === (sg > 0) ? 0.22 : 0), 0.27), f, R(_pf, 0, -1, 0), R(_pp, sg * 0.6, -1, -0.6), 0));
        kopfDreh(u, [0.35, 0, -0.35, 0][k]); break; }
      case 'gitarre':   // Luftgitarre: links greift, rechts schlägt, Kopf nickt
        poseLehn = 0.08;
        setzeHand('L', w, P(_pz, _pc, -0.44, -0.14, 0.3), R(_pd, -0.25, 0.25, 1), R(_pf, 1, 0, -0.3), R(_pp, -1, -0.6, -0.2), 0.55);
        setzeHand('R', w, P(_pz, _pc, 0.05, -0.48 + Math.sin(t * 16) * 0.07, 0.24), R(_pd, -1, -0.4, 0.2), R(_pf, 0, 0, -1), R(_pp, 1, -0.4, 0), 0.7);
        kopfDreh(r, Math.sin(t * 8) * 0.14); break;
      case 'denken':   // Hand am Kinn, anderer Arm stützt
        setzeHand('R', w, P(_pz, _pk, 0.0, -0.11, 0.13), R(_pd, -0.1, 1, 0.15), R(_pf, 0, 0, -1), R(_pp, 0.5, -1, 0.2), 0.8);
        setzeHand('L', w, P(_pz, _pc, 0.12, -0.32, 0.2), R(_pd, 1, 0, 0), R(_pf, 0, 1, 0), R(_pp, -0.5, -1, 0), 0.3);
        kopfDreh(f, -0.12); break;
      case 'winken2':   // beide Arme hoch, winken
        beide((s, sg, o) => setzeHand(s, w, P(_pz, o, sg * (0.18 + Math.sin(t * 7 + (sg > 0 ? 0 : Math.PI)) * 0.1), 0.48, 0.08), R(_pd, sg * 0.3, 1, 0), f, R(_pp, sg, -0.2, -0.3), 0)); break;
      default: break;
    }
  };
  const zuckHaende = () => {
    huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
    wp(NACKEN || KOPF, _zk);
    for (const s of ['R', 'L']) {
      const H = HAND[s], A = ARM[s]; if (H.w && !H.zuck) continue;   // Handschlag o. Ä. hat Vorrang
      wp(A.O, _o1); _zr.copy(_o1).sub(_zk).setY(0).normalize();   // nach außen (weg vom Hals)
      H.ziel = (H.ziel || new THREE.Vector3()).copy(_o1).addScaledVector(_zr, 0.26).addScaledVector(_fw, 0.24); H.ziel.y -= 0.4;
      H.richtung = (H.richtung || new THREE.Vector3()).copy(_fw).addScaledVector(_zr, 0.6).normalize();
      H.flaeche = (H.flaeche || new THREE.Vector3()).set(0, 1, 0); H.pol = (H.pol || new THREE.Vector3()).copy(_zr).multiplyScalar(0.3).setY(-1);
      H.faust = 0; H.zeige = 0; H.daumenHoch = false; H.w = zuckW; H.zuck = true;
    }
  };
  const sitzHaende = () => {
    huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
    for (const s of ['R', 'L']) {
      const H = HAND[s]; if (H.w && !H.sitz) continue;   // jemand anderes führt die Hand (z. B. Handschlag)
      const O = knochen['UpperLeg' + s], U = knochen['LowerLeg' + s]; if (!O || !U) continue;
      wp(O, _o1); wp(U, _o2);
      H.ziel = (H.ziel || new THREE.Vector3()).copy(_o1).lerp(_o2, 0.62); H.ziel.y += 0.07;
      H.richtung = (H.richtung || new THREE.Vector3()).copy(_fw).setY(-0.35).normalize();
      H.flaeche = (H.flaeche || new THREE.Vector3()).set(0, -1, 0); H.pol = (H.pol || new THREE.Vector3()).copy(_fw).multiplyScalar(-0.4).setY(-1);
      H.faust = 0.35; H.zeige = 0; H.daumenHoch = false; H.w = 1; H.sitz = true;
    }
    sitzHand = true;
  };
  const blickAnwenden = (dt) => {
    if (!KOPF) return;
    let zy = 0, zp = 0;
    if (blickZiel) {
      KOPF.updateWorldMatrix(true, false); KOPF.getWorldPosition(_hp);
      huelle.getWorldQuaternion(_kq); _fw.set(0, 0, 1).applyQuaternion(_kq);
      const dx = blickZiel.x - _hp.x, dz = blickZiel.z - _hp.z, dy = blickZiel.y - _hp.y;
      let a = Math.atan2(dx, dz) - Math.atan2(_fw.x, _fw.z); a = Math.atan2(Math.sin(a), Math.cos(a));
      if (Math.abs(a) < 2.1) { zy = Math.max(-1.13, Math.min(1.13, a)); zp = Math.max(-0.44, Math.min(0.35, Math.atan2(dy, Math.hypot(dx, dz)))); }
    }
    const k = 1 - Math.exp(-dt * 5); bYaw += (zy - bYaw) * k; bPitch += (zp - bPitch) * k;
    bAktiv = Math.abs(bYaw) > 0.002 || Math.abs(bPitch) > 0.002;
    if (!bAktiv) return;
    nackenVor.copy(NACKEN ? NACKEN.quaternion : KOPF.quaternion); kopfVor.copy(KOPF.quaternion);
    huelle.getWorldQuaternion(_kq); _rt.set(1, 0, 0).applyQuaternion(_kq);
    drehe(NACKEN, 0.4); drehe(KOPF, NACKEN ? 0.6 : 1);
  };
  return {
    group: huelle, mixer, namen: Object.keys(aktionen),
    spiele(name, { einmal = false, tempo = 1, blende = 0.25 } = {}) {
      const a = aktionen[name] || aktionen.Idle;
      if (!a) return;
      a.timeScale = tempo * (RUHIG[name] ? eigenTempo : 1);
      if (a === jetzt) return;
      a.reset(); a.setLoop(einmal ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = einmal;
      if (!einmal && RUHIG[name]) a.time = Math.random() * a.getClip().duration;   // irgendwo im Ablauf einsteigen
      if (jetzt) a.crossFadeFrom(jetzt, blende, true);
      a.play(); jetzt = a; jetztName = name;
    },
    get aktion() { return jetztName; },
    blick(ziel) { blickZiel = ziel || null; },
    redet(v) { redetZiel = v ? 1 : 0; },
    nicken() { nickT = NICK; },
    geste(art) { if (GESTE[art]) { gesteArt = art; gesteT = GESTE[art]; } },
    pose(art, dauer) { if (poseT > 0 || poseArt) poseEnde(); if (art && POSEN[art] && ARMOK) { poseArt = art; poseT = poseD = dauer || POSEN[art]; } },   // dauer: z. B. lange im Fotomodus
    get poseAktiv() { return poseT > 0 ? poseArt : null; },
    get augen() { return AUGEN ? AUGEN.map((a) => a.idx.length + '@' + a.idx[0] + '=' + a.attr.getX(a.idx[0]).toFixed(2) + ' n' + blinzelIn.toFixed(1)) : null; },
    hand: HAND, armOk: ARMOK,
    lehnen(w) { lehnW = w || 0; },
    schlafen(v) { schlafZiel = v ? 1 : 0; },   // Kopf zur Seite und nach vorn, Augen zu (Foto „eingeschlafen“, müde Figuren)
    handPos(s, v) { const A = ARM[s]; if (!A || !A.M) return null; return wp(A.M, v); },
    schulter(s, v) { const A = ARM[s]; if (!A || !A.O) return null; return wp(A.O, v); },
    sitzen(v, h) { sitzt = !!v; if (h) sitzH = h; group.position.y = 0; group.position.z = 0; },
    update(dt) {
      if (sitzt) BEINE.forEach((b, i) => b.quaternion.copy(ruhe[i]));   // nicht aufaddieren, falls Idle die Beine nicht bewegt
      if (atemAn) BRUST.quaternion.copy(brustVor);
      if (ikVor.size) { for (const [b, q] of ikVor) b.quaternion.copy(q); ikVor.clear(); }   // IK nicht aufaddieren
      if (schlafAn) KOPF.quaternion.copy(kopfSchlafVor);
      if (redeAn) KOPF.quaternion.copy(kopfRedeVor);
      if (bAktiv) { if (NACKEN) NACKEN.quaternion.copy(nackenVor); KOPF.quaternion.copy(kopfVor); }   // Blick nicht aufaddieren, falls ein Clip den Kopf nicht bewegt
      mixer.update(dt);
      if (sitzt) sitzPose();
      // Atmen: Brustkorb hebt sich kaum sichtbar (≈1°, alle 4–5 s) – nur im Stehen/Sitzen
      atemT += dt; atemAn = !!BRUST && !!RUHIG[jetztName];
      if (atemAn) { brustVor.copy(BRUST.quaternion); winkel(BRUST, Math.sin(atemT * 6.2832 * atemHz + atemPhase) * 0.02 - 0.005); }
      lehnAnwenden();
      blickAnwenden(dt);
      redetW += (redetZiel - redetW) * Math.min(1, dt * 6);
      if (nickT > 0) nickT = Math.max(0, nickT - dt);
      if (gesteT > 0) gesteT = Math.max(0, gesteT - dt);
      redeAn = !!KOPF && (redetW > 0.02 || nickT > 0 || gesteT > 0);
      if (redeAn) { kopfRedeVor.copy(KOPF.quaternion); redeT += dt; winkel(KOPF, (Math.sin(redeT * 7.1) * 0.6 + Math.sin(redeT * 2.9 + 1.3) * 0.4) * 0.075 * redetW + (nickT > 0 ? Math.sin(Math.PI * (1 - nickT / NICK)) * 0.16 : 0));
        if (gesteT > 0) {   // weich ein- und aus (Sinus-Hülle), Ausschläge wie beim Menschen klein
          const p = 1 - gesteT / GESTE[gesteArt], h = Math.sin(Math.PI * p);
          if (gesteArt === 'schuetteln') { _q.setFromAxisAngle(_ay, Math.sin(p * Math.PI * 4) * 0.2 * h); KOPF.quaternion.multiply(_q); }
          else if (gesteArt === 'neigen') { _q.setFromAxisAngle(_az, 0.15 * h); KOPF.quaternion.multiply(_q); winkel(KOPF, -0.04 * h); }
          else if (gesteArt === 'lachen') winkel(KOPF, -(0.07 + Math.abs(Math.sin(p * Math.PI * 5)) * 0.06) * h);
          else if (gesteArt === 'senken') winkel(KOPF, 0.24 * h);
          else if (gesteArt === 'zucken') { _q.setFromAxisAngle(_az, 0.09 * h); KOPF.quaternion.multiply(_q); winkel(KOPF, -0.05 * h); }
        } }
      schlafW += (schlafZiel - schlafW) * Math.min(1, dt * 2.5); schlafAn = !!KOPF && schlafW > 0.01;
      if (schlafAn) { kopfSchlafVor.copy(KOPF.quaternion); _q.setFromAxisAngle(_az, 0.42 * schlafW); KOPF.quaternion.multiply(_q); winkel(KOPF, 0.26 * schlafW); }
      if (!AUGEN) augenSuchen();
      if (AUGEN.length && schlafW > 0.5) augenSetzen(true);
      else if (AUGEN.length) {
        if (lidZu > 0) { lidZu -= dt; if (lidZu <= 0) augenSetzen(false); }
        else if ((blinzelIn -= dt) <= 0) { augenSetzen(true); lidZu = 0.12; blinzelIn = Math.random() < 0.15 ? 0.25 : 2.2 + Math.random() * 4.5; }
      }
      // Sitzen: Hände liegen auf den Oberschenkeln (statt durch Beine und Stuhl zu hängen) – nur, wenn niemand sonst die Hände führt
      zuckW = gesteT > 0 && gesteArt === 'zucken' && !sitzt && ARMOK ? Math.sin(Math.PI * (1 - gesteT / GESTE.zucken)) * 0.9 : 0;
      if (zuckW > 0.01) zuckHaende(); else for (const s of ['R', 'L']) if (HAND[s].zuck) { HAND[s].w = 0; HAND[s].zuck = false; }
      erklW = gesteT > 0 && gesteArt === 'erklaeren' && !sitzt && ARMOK ? Math.min(1, Math.sin(Math.PI * (1 - gesteT / GESTE.erklaeren)) * 1.6) * 0.8 : 0;
      if (erklW > 0.01) { erklT += dt; erklHand(); } else if (HAND.R.erkl) { HAND.R.w = 0; HAND.R.erkl = false; }
      if (poseT > 0) { poseT = Math.max(0, poseT - dt); if (poseT > 0 && poseArt && !sitzt && ARMOK) poseHaende(); else poseEnde(); }
      if (rueckenTeil) { rkT += dt; const lauf = jetztName === 'Run' ? 1 : jetztName === 'Walk' ? 0.45 : 0, f = jetztName === 'Run' ? 11 : 6.5;   // Rucksack wippt mit
        rueckenTeil.rotation.x += (Math.sin(rkT * f) * 0.07 * lauf - rueckenTeil.rotation.x) * Math.min(1, dt * 10); rueckenTeil.rotation.z = Math.sin(rkT * f * 0.5) * 0.035 * lauf; }
      if (sitzt && ARMOK) sitzHaende(); else if (sitzHand) { for (const s of ['R', 'L']) if (HAND[s].sitz) { HAND[s].w = 0; HAND[s].sitz = false; } sitzHand = false; }
      armAnwenden('R'); armAnwenden('L');
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
