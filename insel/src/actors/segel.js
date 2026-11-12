// Gefühlssegel (WP13, Sichtbarkeit): prozedurales Segel aus sechs Federbahnen hinter den Schultern.
// Jede Feder trägt die Farbe eines Gefühls (Lehrkraft-einstellbar: setColors) und ihr Symbol-Muster; die aktive
// Feder leuchtet, im Kombi-Modus zwei. Öffnen/Schließen mit Fächer-Animation, Rollen/Nicken beim Lenken, Wackeln.
//   const segel = createSegel({ humanoid, veil }); segel.open(); segel.close(); segel.setMode(mode, second, rule)
//   segel.update(dt, { speed, roll, pitch, wobble, hover }); segel.color (Hex-Zahl der aktiven Feder)
import * as THREE from 'three';
import { part, merge } from '../world/geom.js';

export const EMOTION_COLORS = { freude: '#ffd23f', wut: '#ff3b3b', angst: '#9b5cff', trauer: '#3d7bff', ekel: '#45d15a', ueberraschung: '#2de2c9' };
export const EMOTION_SYMBOLS = { freude: 'sonne', wut: 'flamme', angst: 'zickzack', trauer: 'tropfen', ekel: 'wirbel', ueberraschung: 'stern' };
export const EMOTION_ORDER = ['angst', 'trauer', 'freude', 'ueberraschung', 'ekel', 'wut'];   // Anordnung von links nach rechts
const SYMBOL_DEG = [0, 4, 4, 0, 6, 5];   // kleine Symbolformen auf den Federn: Sonne(0)…

function featherGeo(len, w, color, symbol) {
  const parts = [];
  // Federblatt: schmaler Streifen mit Spitze, leicht gebogen
  const seg = 7;
  const g = new THREE.PlaneGeometry(w, len, 1, seg);
  parts.push(part(g, {
    pos: [0, len / 2, 0], color, faceVar: 0.05,
    deform: (v) => { const t = (v.y + len / 2) / len; v.x *= 1 - Math.pow(t, 3) * 0.85 + Math.sin(t * Math.PI) * 0.35; v.z += Math.sin(t * Math.PI) * 0.12 - t * 0.2; },
  }));
  // Kiel
  parts.push(part(new THREE.CylinderGeometry(0.012, 0.028, len, 4, 1), { pos: [0, len / 2, 0.01], color: '#fff6e0' }));
  // Symbol-Marke nahe der Spitze (für Farbenblinde: Form statt Farbe)
  const sy = len * 0.68;
  if (symbol === 'sonne') { parts.push(part(new THREE.CircleGeometry(0.075, 8), { pos: [0, sy, 0.025], color: '#fffbe6' })); for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; parts.push(part(new THREE.BoxGeometry(0.02, 0.05, 0.01), { pos: [Math.cos(a) * 0.115, sy + Math.sin(a) * 0.115, 0.025], rot: [0, 0, a - Math.PI / 2], color: '#fffbe6' })); } }
  else if (symbol === 'flamme') { parts.push(part(new THREE.ConeGeometry(0.075, 0.2, 5, 1), { pos: [0, sy, 0.025], color: '#fff0d0' })); }
  else if (symbol === 'zickzack') { for (let k = 0; k < 3; k++) parts.push(part(new THREE.BoxGeometry(0.12, 0.025, 0.01), { pos: [(k % 2 ? 0.03 : -0.03), sy - 0.07 + k * 0.07, 0.025], rot: [0, 0, k % 2 ? -0.6 : 0.6], color: '#f4ecff' })); }
  else if (symbol === 'tropfen') { parts.push(part(new THREE.CircleGeometry(0.07, 8), { pos: [0, sy - 0.03, 0.025], color: '#e8f0ff' })); parts.push(part(new THREE.ConeGeometry(0.068, 0.12, 8, 1), { pos: [0, sy + 0.06, 0.025], color: '#e8f0ff' })); }
  else if (symbol === 'wirbel') { parts.push(part(new THREE.TorusGeometry(0.075, 0.018, 4, 10, Math.PI * 1.6), { pos: [0, sy, 0.025], color: '#eaffe8' })); parts.push(part(new THREE.CircleGeometry(0.025, 6), { pos: [0.02, sy - 0.01, 0.028], color: '#eaffe8' })); }
  else if (symbol === 'stern') { for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; parts.push(part(new THREE.BoxGeometry(0.035, 0.13, 0.01), { pos: [Math.cos(a) * 0.04, sy + Math.sin(a) * 0.04, 0.025], rot: [0, 0, a - Math.PI / 2], color: '#e6fffb' })); } }
  return merge(parts);
}

export function createSegel({ humanoid, veil, colors = {} } = {}) {
  const cols = { ...EMOTION_COLORS, ...colors };
  const group = new THREE.Group();
  group.name = 'segel';
  group.position.set(0, 0.42, -0.2);
  // Unbeleuchtet (leuchtende Federn in reinen Gefühlsfarben), aber mit Nebel und Farbkorrektur der Welt
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0.96 });
  if (veil) veil.patch(mat, { key: 'segel', veil: false });
  const feathers = [];
  const N = EMOTION_ORDER.length;
  for (let i = 0; i < N; i++) {
    const em = EMOTION_ORDER[i];
    const t = (i / (N - 1)) - 0.5;              // −0.5 … 0.5
    const len = 2.1 + (1 - Math.abs(t) * 2) * 0.7;
    const geo = featherGeo(len, 0.46, cols[em], EMOTION_SYMBOLS[em]);
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = false;
    m.userData = { emotion: em, angle: t * 2.5, len, base: geo.attributes.color.array.slice() };
    m.rotation.set(-0.35, 0, t * 2.5);
    group.add(m);
    feathers.push(m);
  }
  group.scale.setScalar(0.001);
  group.visible = false;
  humanoid.joints.spine.add(group);

  let openAmt = 0, openT = 0, wantOpen = false, t = 0;
  let mode = 'neutral', second = null, colorHex = 0xffffff;
  const cTmp = new THREE.Color();

  function recolor() {
    for (const f of feathers) {
      const em = f.userData.emotion;
      const active = em === mode || em === second;
      const dim = mode !== 'neutral' && !active;
      const arr = f.geometry.attributes.color.array, base = f.userData.base;
      const k = active ? 1.25 : dim ? 0.45 : 0.92;
      for (let i = 0; i < arr.length; i++) arr[i] = Math.min(1.3, base[i] * k);
      f.geometry.attributes.color.needsUpdate = true;
    }
    if (mode === 'neutral') colorHex = 0xfff3d6;
    else { cTmp.set(cols[mode] || '#ffffff'); if (second) cTmp.lerp(new THREE.Color(cols[second]), 0.5); colorHex = cTmp.getHex(); }
  }
  recolor();

  const segel = {
    group, feathers, material: mat,
    get open_() { return openAmt; },
    get opened() { return openAmt; },
    get color() { return colorHex; },
    get mode() { return mode; },
    setColors(map) { Object.assign(cols, map || {}); for (const f of feathers) { const c = new THREE.Color(cols[f.userData.emotion]); const arr = f.userData.base; for (let i = 0; i < arr.length; i += 3) { if (arr[i] > 0.85 && arr[i + 1] > 0.85 && arr[i + 2] > 0.85) continue; arr[i] = c.r; arr[i + 1] = c.g; arr[i + 2] = c.b; } } recolor(); },
    open() { wantOpen = true; group.visible = true; openT = 0; },
    close() { wantOpen = false; },
    setMode(m, s, rule) { mode = m || 'neutral'; second = s || null; recolor(); },
    update(dt, o = {}) {
      t += dt;
      openAmt += ((wantOpen ? 1 : 0) - openAmt) * Math.min(1, dt * (wantOpen ? 9 : 12));
      if (!wantOpen && openAmt < 0.02) { group.visible = false; openAmt = 0; return; }
      openT += dt;
      const s = 0.2 + openAmt * 0.8;
      group.scale.setScalar(Math.max(0.001, s));
      const wob = (o.wobble || 0);
      group.rotation.set(-0.15 + (o.pitch || 0) * 0.4 + Math.sin(t * 1.7) * 0.03, 0, (o.roll || 0) * 0.8);
      for (let i = 0; i < feathers.length; i++) {
        const f = feathers[i];
        const tt = (i / (feathers.length - 1)) - 0.5;
        const flutter = Math.sin(t * (6 + i) + i * 1.3) * (0.03 + wob * 0.12) + Math.sin(t * 2.1 + i) * 0.015;
        // Fächer: geschlossen liegen die Federn zusammen, offen spreizen sie sich
        f.rotation.z = f.userData.angle * (0.3 + openAmt * 0.7) + flutter;
        f.rotation.x = -0.35 + flutter * 0.5 - (o.hover ? 0.45 : 0) + Math.abs(tt) * 0.15;
        const stretch = 1 + Math.min(1, (o.speed || 0) / 14) * 0.12;
        f.scale.set(1, stretch, 1);
      }
    },
    dispose() { for (const f of feathers) f.geometry.dispose(); mat.dispose(); },
  };
  return segel;
}
