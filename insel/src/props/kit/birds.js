// Die sechs Gefühlsvögel (WP43): schlank, kantig, mit leuchtenden Kanten – keine Kulleraugen-Maskottchen.
// Jeder Vogel: eigene Silhouette (Tanz-Umriss), Signaturfarbe des Gefühls, Flügelschlag im Vertex-Shader (aWind = Abstand
// vom Körper), Kantenlicht als Glow-Streifen. vogel({ emotion, colors }) → { group, update, setGlow, pose('fliegen'|'sitzen') }
//   wachkranich (Angst)   Glutfalke (Wut)   Tiefentaucher (Trauer)   Sonnensegler (Freude)   Grünwürger (Ekel)   Blitzkolibri (Überraschung)
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { EMOTION_COLORS } from '../../actors/segel.js';

export const BIRDS = {
  angst: { id: 'wachkranich', name: 'Wachkranich', body: [0.22, 0.9], neck: 1.1, legs: 1.3, wing: [1.9, 0.55], sweep: 0.15, tail: 0.5, crest: 3, beak: 0.32, flap: 5.5, amp: 0.7, scale: 1.25 },
  wut: { id: 'glutfalke', name: 'Glutfalke', body: [0.26, 0.85], neck: 0.25, legs: 0.35, wing: [1.7, 0.7], sweep: 0.75, tail: 0.6, crest: 0, beak: 0.22, hook: true, flap: 9, amp: 0.55, scale: 1.05 },
  trauer: { id: 'tiefentaucher', name: 'Tiefentaucher', body: [0.3, 1.0], neck: 0.3, legs: 0.2, wing: [1.1, 0.5], sweep: 0.3, tail: 0.3, crest: 0, beak: 0.5, belly: '#e8f0ff', flap: 7, amp: 0.5, scale: 1.0 },
  freude: { id: 'sonnensegler', name: 'Sonnensegler', body: [0.24, 0.8], neck: 0.35, legs: 0.3, wing: [2.6, 0.6], sweep: 0.2, tail: 0.7, fork: true, crest: 0, beak: 0.25, flap: 4, amp: 0.5, scale: 1.15 },
  ekel: { id: 'gruenwuerger', name: 'Grünwürger', body: [0.32, 0.75], neck: 0.3, legs: 0.45, wing: [1.3, 0.75], sweep: 0.35, tail: 0.45, crest: 0, ruff: 8, beak: 0.3, hook: true, flap: 7.5, amp: 0.6, scale: 1.0 },
  ueberraschung: { id: 'blitzkolibri', name: 'Blitzkolibri', body: [0.16, 0.5], neck: 0.15, legs: 0.12, wing: [0.9, 0.35], sweep: 0.1, tail: 0.6, streamers: true, crest: 1, beak: 0.55, flap: 34, amp: 1.0, scale: 0.55 },
};
export const BIRD_EMOTIONS = Object.keys(BIRDS);

function darken(hex, k) { const c = new THREE.Color(hex); c.multiplyScalar(k); return c; }
function lighten(hex, k) { const c = new THREE.Color(hex); c.lerp(new THREE.Color('#ffffff'), k); return c; }

export function vogel(o = {}, K) {
  const { M } = K;
  const emotion = o.emotion || 'freude';
  const D = BIRDS[emotion] || BIRDS.freude;
  const hex = (o.colors && o.colors[emotion]) || EMOTION_COLORS[emotion] || '#ffffff';
  const dark = darken(hex, 0.55), mid = new THREE.Color(hex), light = lighten(hex, 0.45);
  const g = new THREE.Group();
  const [br, bl] = D.body;
  const P = [], G = [];
  // Körper: gestreckter Oktaeder-Rumpf, Kiel unten dunkler
  P.push(part(new THREE.OctahedronGeometry(1, 1), { scale: [br, br * 0.85, bl], pos: [0, 0, 0], jitter: 0.03, seed: 1, faceVar: 0.1, color: (x, y, z, out) => out.copy(y < -0.05 ? (D.belly ? new THREE.Color(D.belly) : dark) : mid) }));
  // Hals + Kopf (gestreckt, kantig), Schnabel
  const neckTop = new THREE.Vector3(0, D.neck * 0.85, bl * 0.75 + D.neck * 0.35);
  P.push(part(new THREE.CylinderGeometry(br * 0.42, br * 0.6, D.neck + br, 5, 1), { pos: [0, D.neck * 0.45, bl * 0.6 + D.neck * 0.2], rot: [-0.55, 0, 0], color: mid }));
  P.push(part(new THREE.OctahedronGeometry(br * 0.72, 0), { pos: [neckTop.x, neckTop.y, neckTop.z], scale: [1, 0.9, 1.4], color: mid }));
  P.push(part(new THREE.ConeGeometry(br * 0.28, D.beak, 4, 1), { pos: [0, neckTop.y - 0.02, neckTop.z + br * 0.9 + D.beak / 2], rot: [Math.PI / 2, 0, 0], color: D.hook ? '#3b2a2a' : '#ffb000', deform: D.hook ? (v) => { v.x += Math.max(0, v.y) * 0.0; } : undefined }));
  if (D.hook) P.push(part(new THREE.ConeGeometry(br * 0.22, D.beak * 0.5, 4, 1), { pos: [0, neckTop.y - 0.14, neckTop.z + br * 0.9 + D.beak * 0.8], rot: [Math.PI, 0, 0], color: '#3b2a2a' }));
  // Augen: schmale, kantige Schlitze (Glow)
  for (const s of [-1, 1]) G.push(part(new THREE.BoxGeometry(0.04, 0.09, 0.16), { pos: [s * br * 0.55, neckTop.y + 0.08, neckTop.z + 0.15], rot: [0, 0, s * 0.3], color: light }));
  // Kamm / Federkrone
  for (let i = 0; i < D.crest; i++) P.push(part(new THREE.ConeGeometry(0.05, 0.42 + i * 0.1, 3, 1), { pos: [0, neckTop.y + 0.25, neckTop.z - 0.15 - i * 0.14], rot: [-0.9 - i * 0.25, 0, 0], color: i % 2 ? dark : mid }));
  // Halskrause (Grünwürger)
  for (let i = 0; i < (D.ruff || 0); i++) { const a = (i / D.ruff) * Math.PI * 2; P.push(part(new THREE.ConeGeometry(0.09, 0.45, 3, 1), { pos: [Math.cos(a) * br * 0.9, D.neck * 0.5 + Math.sin(a) * br * 0.7, bl * 0.55], rot: [0.6, 0, -a + Math.PI / 2], color: i % 2 ? dark : light })); }
  // Beine (Kranich lang)
  for (const s of [-1, 1]) {
    P.push(part(new THREE.CylinderGeometry(0.03, 0.035, D.legs, 4, 1), { pos: [s * br * 0.45, -br * 0.5 - D.legs / 2, -bl * 0.05], color: '#3b3f4a' }));
    P.push(part(new THREE.ConeGeometry(0.09, 0.22, 3, 1), { pos: [s * br * 0.45, -br * 0.5 - D.legs, 0.08], rot: [Math.PI / 2, 0, 0], color: '#3b3f4a' }));
  }
  // Schwanz: Fächer (Gabel oder Streamer je Art)
  const tailN = D.streamers ? 2 : D.fork ? 2 : 3;
  for (let i = 0; i < tailN; i++) {
    const s = tailN === 2 ? (i ? 1 : -1) : i - 1;
    const L = D.tail * (D.streamers ? 2.6 : 1) * (D.fork && s !== 0 ? 1.4 : 1);
    P.push(part(new THREE.BoxGeometry(0.16, 0.02, L), { pos: [s * 0.12, 0.02, -bl * 0.85 - L / 2], rot: [0.12, s * (D.fork ? 0.32 : 0.16), 0], color: (x, y, z, out) => out.copy(z < -bl - L * 0.6 ? light : dark), wind: (x, y, z) => Math.max(0, (-z - bl) / L) * 0.25 }));
  }
  const bodyGeo = merge(P);   // Körper flattert nicht (aWind 0), teilt sich aber das Flügel-Material (ein Mesh weniger)
  // Flügel: kantige Segelflächen mit Schwung (sweep), aWind = Abstand vom Körper (Flügelschlag), Vorderkante leuchtet
  const [wl, ww] = D.wing;
  const W = [], E = [];
  for (const s of [-1, 1]) {
    const pts = [];
    const segs = 4;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs, x = s * (br * 0.6 + t * wl);
      const front = bl * 0.25 - t * t * D.sweep * wl;
      const back = front - ww * (1 - 0.35 * t) * (t < 0.85 ? 1 : (1 - t) / 0.15 + 0.15);
      pts.push({ x, f: front, b: back, t });
    }
    const pos = [], cols = [], winds = [];
    const push = (x, y, z, c, w) => { pos.push(x, y, z); cols.push(c.r, c.g, c.b); winds.push(w); };
    for (let i = 0; i < segs; i++) {
      const a = pts[i], b = pts[i + 1];
      const ca = i % 2 ? mid : dark, cb = i % 2 ? dark : mid;
      const ya = 0.05 + a.t * a.t * 0.1, yb = 0.05 + b.t * b.t * 0.1;
      push(a.x, ya, a.f, ca, a.t); push(b.x, yb, b.f, cb, b.t); push(a.x, ya, a.b, ca, a.t);
      push(b.x, yb, b.f, cb, b.t); push(b.x, yb, b.b, cb, b.t); push(a.x, ya, a.b, ca, a.t);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    geo.setAttribute('aWind', new THREE.Float32BufferAttribute(winds, 1));
    W.push(geo);
    // Kantenlicht: dünner Streifen an der Vorderkante, schlägt mit
    for (let i = 0; i < segs; i++) {
      const a = pts[i], b = pts[i + 1];
      const L = Math.hypot(b.x - a.x, b.f - a.f);
      E.push(part(new THREE.BoxGeometry(L, 0.035, 0.035), { pos: [(a.x + b.x) / 2, 0.08 + ((a.t + b.t) / 2) ** 2 * 0.1, (a.f + b.f) / 2], rot: [0, -Math.atan2(b.f - a.f, b.x - a.x), 0], color: light, wind: (a.t + b.t) / 2 }));
    }
  }
  const flapMat = M.flap({ speed: D.flap, amp: D.amp, phase: o.phase || 0 });
  const body = new THREE.Mesh(bodyGeo, flapMat);
  body.castShadow = true;
  body.userData.dynamic = true;
  const wings = new THREE.Mesh(merge(W), flapMat);
  wings.castShadow = true;
  wings.userData.dynamic = true;
  const edgeMat = M.flap({ speed: D.flap, amp: D.amp, phase: o.phase || 0 });
  edgeMat.emissive = new THREE.Color(hex); edgeMat.emissiveIntensity = 0.9;
  const edges = new THREE.Mesh(merge(E.concat(G)), edgeMat);   // Kantenlicht + Augen
  edges.userData.dynamic = true;
  const eyes = edges;
  g.add(body, wings, edges);
  g.scale.setScalar(D.scale * (o.scale || 1));
  const baseY = br * 0.5 + D.legs;
  let pose = o.pose || 'fliegen', bob = 0, glowV = 1;
  const api = {
    group: g, type: 'vogel', emotion, id: D.id, name: D.name, color: hex, def: D, wings, edges,
    pose(p) {
      pose = p;
      const sit = p === 'sitzen';
      for (const m of [flapMat, edgeMat]) { m.userData.flap.uFlapAmp.value = sit ? 0.05 : D.amp; m.userData.flap.uFlapSpeed.value = sit ? 1.5 : D.flap; }
      // sitzend: Flügel angelegt (schmal, leicht angehoben), fliegend: weit gespannt
      for (const w of [wings, edges]) { w.scale.set(sit ? 0.42 : 1, 1, sit ? 0.85 : 1); w.rotation.x = sit ? 0.25 : 0; }
      return api;
    },
    setGlow(v) { glowV = Math.max(0, Math.min(1, v)); edgeMat.emissiveIntensity = 0.15 + 0.9 * glowV; },
    setPhase(ph) { flapMat.userData.flap.uPhase.value = ph; edgeMat.userData.flap.uPhase.value = ph; },
    // Fußhöhe (sitzend steht der Vogel auf y = 0, fliegend schwebt der Körper bei baseY)
    baseY: baseY * D.scale,
    update(dt, t) {
      bob += dt;
      if (pose === 'fliegen') body.position.y = baseY + Math.sin(t * D.flap * 0.5 + (o.phase || 0)) * 0.05; else body.position.y = baseY;
      wings.position.y = body.position.y; edges.position.y = body.position.y;
    },
  };
  api.pose(pose);
  api.update(0, 0);
  return api;
}
