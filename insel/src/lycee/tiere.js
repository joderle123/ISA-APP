// Annexe Junglinster – Leben über und auf dem Hof: Tauben (mit Gerd, der einen Partyhut trägt und nie wegfliegt)
// und Wolken, die langsam über den Himmel ziehen. Alles selbst gebaut, keine Dateien.
import * as THREE from 'three';
import { KABEL } from './interaktion.js';

const mat = (c) => new THREE.MeshLambertMaterial({ color: c });
const GRAU = mat('#8d939c'), DUNKEL = mat('#5f6873'), HALS = mat('#4f8f7a'), SCHNABEL = mat('#e9b949'), BEIN = mat('#d9523c'), AUGE = mat('#1b1b1f');
const HUT = mat('#e85d75'), PUNKT = mat('#ffffff');

function taube(gerd) {
  const g = new THREE.Group();
  const k = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), GRAU); k.scale.set(0.11, 0.1, 0.17); k.position.y = 0.16; g.add(k);
  const hals = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), HALS); hals.position.set(0, 0.24, 0.1); g.add(hals);
  const kopf = new THREE.Group(); kopf.position.set(0, 0.29, 0.13); g.add(kopf);
  kopf.add(new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), DUNKEL));
  const sn = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.05, 6), SCHNABEL); sn.rotation.x = Math.PI / 2; sn.position.z = 0.065; kopf.add(sn);
  for (const s of [-1, 1]) { const a = new THREE.Mesh(new THREE.SphereGeometry(0.011, 6, 4), AUGE); a.position.set(s * 0.04, 0.012, 0.03); kopf.add(a); }
  if (gerd) {
    const h = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 10), HUT); h.position.y = 0.09; h.rotation.z = 0.25; kopf.add(h);
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 4), PUNKT); p.position.set(0.012, 0.135, 0); kopf.add(p);
  }
  const fl = [];
  for (const s of [-1, 1]) { const w = new THREE.Group(); w.position.set(s * 0.08, 0.2, -0.01); const m = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.015, 0.2), DUNKEL); m.position.x = s * 0.07; w.add(m); g.add(w); fl.push(w); }
  const sw = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.015, 0.12), DUNKEL); sw.position.set(0, 0.17, -0.2); sw.rotation.x = 0.3; g.add(sw);
  for (const s of [-1, 1]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.08, 4), BEIN); b.position.set(s * 0.03, 0.04, 0.01); g.add(b); }
  if (gerd) g.scale.setScalar(1.12);
  return { g, kopf, fl };
}

function wolkenTextur() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
  const blase = (cx, cy, r) => { const gr = x.createRadialGradient(cx, cy - r * 0.3, r * 0.2, cx, cy, r); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.75, 'rgba(250,251,255,0.95)'); gr.addColorStop(1, 'rgba(240,244,252,0)'); x.fillStyle = gr; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); };
  [[70, 78, 40], [118, 62, 52], [170, 76, 42], [140, 88, 36], [96, 92, 34], [200, 90, 28]].forEach(([a, b, r]) => blase(a, b, r));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function createTiere({ scene, steuerung }) {
  // ---- Tauben: kleine Gruppe auf dem Hof, Gerd immer dabei ----
  const HOF = [[2, 26], [-4, 12], [12, 22], [-20, 18], [8, 34]];
  const tauben = [];
  const neueLandung = () => { const [x, z] = HOF[Math.floor(Math.random() * HOF.length)]; return { x: x + (Math.random() - 0.5) * 3, z: z + (Math.random() - 0.5) * 3 }; };
  for (let i = 0; i < 9; i++) {
    const gerd = i === 0;
    const t = taube(gerd); const ziel = neueLandung();
    t.g.position.set(ziel.x, 0.06, ziel.z); scene.add(t.g);
    tauben.push({ ...t, gerd, zustand: 'boden', ziel, warte: Math.random() * 2, pick: Math.random() * 3, v: new THREE.Vector3(), flugZeit: 0 });
  }
  // ---- Wolken ----
  const tex = wolkenTextur();
  const wolken = [];
  for (let i = 0; i < 12; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false, opacity: 0.92 }));
    const gr = 40 + Math.random() * 45; s.scale.set(gr, gr * 0.5, 1);
    s.position.set(-180 + Math.random() * 360, 60 + Math.random() * 30, -180 + Math.random() * 360);
    s.userData.v = 0.8 + Math.random() * 1.2; scene.add(s); wolken.push(s);
  }
  // ---- Schmetterlinge an den Beeten (zwei Flügel, flattern in Schleifen) ----
  const falter = [];
  const FF = ['#f2b134', '#e85d75', '#ffffff', '#5fa0d0', '#e9734a'];
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group(); const m = new THREE.MeshBasicMaterial({ color: FF[i % FF.length], side: THREE.DoubleSide });
    const fl = [-1, 1].map((sx) => { const w = new THREE.Mesh(new THREE.CircleGeometry(0.07, 8), m); w.geometry.translate(sx * 0.06, 0, 0); g.add(w); return w; });
    const zentrum = [[-24, 14], [12, 14], [-6, 22], [-13, 23], [6, 30], [-30, 26], [20, 6]][i];
    g.position.set(zentrum[0], 1.2, zentrum[1]); scene.add(g);
    falter.push({ g, fl, c: zentrum, ph: Math.random() * 10, r: 0.8 + Math.random() * 1.2 });
  }
  // ---- Kleine Zufallsereignisse: Papierflieger aus einem Fenster, ein Ball rollt über den Hof ----
  const flieger = new THREE.Mesh((() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.25, -0.16, 0.02, -0.2, 0, -0.03, -0.2, 0, 0, 0.25, 0, -0.03, -0.2, 0.16, 0.02, -0.2], 3)); g.computeVertexNormals(); return g; })(), new THREE.MeshLambertMaterial({ color: '#ffffff', side: THREE.DoubleSide }));
  flieger.visible = false; scene.add(flieger);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshLambertMaterial({ color: '#e9734a' })); ball.visible = false; scene.add(ball);
  let ereignisNaechst = performance.now() + 25000, ereignis = null;
  // ---- Easter Eggs in 3D: Gummiente mit Krawatte im Brunnen, Herrn Mesenbergs Ladekabel ----
  const ente = new THREE.Group();
  { const gelb = mat('#ffd23f'); const k = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), gelb); k.scale.set(1, 0.75, 1.25); ente.add(k);
    const kopf = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), gelb); kopf.position.set(0, 0.15, 0.12); ente.add(kopf);
    const sn = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.03, 0.08), mat('#e9734a')); sn.position.set(0, 0.13, 0.23); ente.add(sn);
    const kr = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.12, 0.02), mat('#2f6db0')); kr.position.set(0, 0.03, 0.18); kr.rotation.x = -0.3; ente.add(kr);
    for (const sx of [-1, 1]) { const a = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 4), AUGE); a.position.set(sx * 0.05, 0.18, 0.2); ente.add(a); } }
  scene.add(ente);
  // Brunnen: Wasserstrahl (Tropfen-Bögen) und Wellenringe, wo sie landen
  const TROPFEN = 44, tropfen = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 6, 4), new THREE.MeshBasicMaterial({ color: '#e6f8ff', transparent: true, opacity: 0.92 }), TROPFEN);
  tropfen.frustumCulled = false; scene.add(tropfen);
  const ringe = [0, 1, 2, 3, 4].map((k) => { const r = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.14, 20), new THREE.MeshBasicMaterial({ color: '#e8f8ff', transparent: true, opacity: 0, depthWrite: false })); r.rotation.x = -Math.PI / 2; r.userData.k = k; scene.add(r); return r; });
  const dummy = new THREE.Object3D();
  const kabel = {};
  for (const [id, x, z] of KABEL) {
    const g = new THREE.Group();
    const kc = mat('#ff7a2f');
    const r = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 6, 20), kc); r.rotation.x = Math.PI / 2; g.add(r);
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.03, 6, 20), kc); r2.rotation.x = Math.PI / 2; r2.position.y = 0.05; g.add(r2);
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.16), mat('#ffffff')); st.position.set(0.26, 0.035, 0.08); g.add(st);
    g.position.set(x, (/kantine|gang|cdi/.test(id) ? 0.1 : 0.06) + 0.03, z); scene.add(g); kabel[id] = g;
  }
  let gerdGemeldet = false;
  return {
    kabelWeg(id) { if (kabel[id]) { kabel[id].visible = false; } },
    kabelSync(liste = []) { for (const id of Object.keys(kabel)) kabel[id].visible = !liste.includes(id); },
    // Gerd landet gezielt (z. B. auf dem Kopf von jemandem, der schläft) und bleibt sitzen, bis gerdLos()
    gerdAuf(x, y, z) { const d = tauben.find((q) => q.gerd); if (!d) return; const nach = new THREE.Vector3(x, y, z); d.zustand = 'sitz'; d.sitz = { von: nach.clone().add(new THREE.Vector3(5, 3.5, 3)), nach, t: 0 }; },
    gerdLos() { const d = tauben.find((q) => q.gerd); if (d && d.zustand === 'sitz') { d.zustand = 'flug'; d.flugZeit = 0; d.v.set(1.5, 3.2, 1.2); } },
    alleAuf() { for (const d of tauben) if (!d.gerd) { d.zustand = 'flug'; d.flugZeit = 0; d.v.set((Math.random() - 0.5) * 4, 3.5 + Math.random(), (Math.random() - 0.5) * 4); } },
    update(dt, t, { night = 0, onGerd } = {}) {
      { const w = t * 0.18; ente.position.set(-8 + Math.cos(w) * 2.05, 0.6 + Math.sin(t * 2) * 0.012, 18 + Math.sin(w) * 2.05); ente.rotation.y = -w; }
      for (const g of Object.values(kabel)) if (g.visible) g.rotation.y += dt * 0.3;
      { const sp0 = steuerung.pos, nah = Math.hypot(sp0.x + 8, sp0.z - 18) < 45; tropfen.visible = nah;
        if (nah) { const T = 0.9, v0 = 3.19;
          for (let k = 0; k < TROPFEN; k++) { const u = (t / T + k / TROPFEN * 3.7) % 1, a = k * 2.399, tt = u * T, r = 0.12 + u * 1.25;
            dummy.position.set(-8 + Math.cos(a) * r, 1.7 + v0 * tt - 4.9 * tt * tt, 18 + Math.sin(a) * r); dummy.scale.setScalar(1 - u * 0.35); dummy.updateMatrix(); tropfen.setMatrixAt(k, dummy.matrix); }
          tropfen.instanceMatrix.needsUpdate = true; }
        for (const r of ringe) { const zyk = 1.7, ph = (t + r.userData.k * zyk / ringe.length) / zyk, u = ph % 1, n = Math.floor(ph);
          if (u < dt / zyk * 1.5 || r.userData.n !== n) { r.userData.n = n; const a = (n * 7 + r.userData.k * 13) * 0.917; r.position.set(-8 + Math.cos(a) * 1.4, 0.615, 18 + Math.sin(a) * 1.4); }
          r.visible = nah; r.scale.setScalar(1 + u * 3.2); r.material.opacity = 0.55 * (1 - u); } }
      // Ereignisse (echte Zeit, damit es auch auf langsamen Geräten passiert)
      const jetzt = performance.now(), sp = steuerung.pos;
      if (!ereignis && jetzt > ereignisNaechst && sp.z > 2 && sp.z < 38 && Math.abs(sp.x) < 40 && night < 0.5) {
        if (Math.random() < 0.55) { ereignis = { art: 'flieger', t: 0, von: new THREE.Vector3(sp.x - 6 + Math.random() * 12, 6.2, -1.5), nach: new THREE.Vector3(sp.x + (Math.random() - 0.5) * 4, 0.05, sp.z + 3 + Math.random() * 3) }; flieger.visible = true; }
        else { const r = Math.random() < 0.5 ? -1 : 1; ereignis = { art: 'ball', t: 0, von: new THREE.Vector3(sp.x - r * 12, 0.12, sp.z + 2), nach: new THREE.Vector3(sp.x + r * 12, 0.12, sp.z + 3) }; ball.visible = true; }
      }
      if (ereignis) {
        ereignis.t += dt;
        if (ereignis.art === 'flieger') {
          const u = Math.min(1, ereignis.t / 5);
          flieger.position.lerpVectors(ereignis.von, ereignis.nach, u); flieger.position.y += Math.sin(u * Math.PI * 3) * 0.4 * (1 - u);
          flieger.lookAt(ereignis.nach.x, flieger.position.y - 0.3, ereignis.nach.z); flieger.rotation.z += Math.sin(t * 3) * 0.2;
          if (u >= 1 && ereignis.t > 14) { flieger.visible = false; ereignis = null; ereignisNaechst = jetzt + 60000 + Math.random() * 60000; }
        } else {
          const u = Math.min(1, ereignis.t / 6);
          ball.position.lerpVectors(ereignis.von, ereignis.nach, 1 - (1 - u) * (1 - u)); ball.rotation.z -= dt * 8;
          if (u >= 1) { ball.visible = false; ereignis = null; ereignisNaechst = jetzt + 60000 + Math.random() * 60000; }
        }
      }
      for (const f of falter) {
        f.g.visible = night < 0.5;
        const a = t * 0.6 + f.ph;
        f.g.position.set(f.c[0] + Math.cos(a) * f.r + Math.sin(a * 2.3) * 0.3, 0.9 + Math.sin(a * 1.7) * 0.35 + 0.3, f.c[1] + Math.sin(a) * f.r);
        f.g.rotation.y = -a; const k = Math.sin(t * 18 + f.ph) * 1.1; f.fl[0].rotation.y = k; f.fl[1].rotation.y = -k;
      }
      for (const w of wolken) { w.position.x += w.userData.v * dt; if (w.position.x > 200) w.position.x = -200; w.material.opacity = 0.92 * (1 - night * 0.8); }
      const p = steuerung.pos;
      for (const d of tauben) {
        const g = d.g, dx = g.position.x - p.x, dz = g.position.z - p.z, abst = Math.hypot(dx, dz);
        if (d.zustand === 'sitz') {   // gezielter Anflug, dann sitzen und picken
          const s = d.sitz; s.t = Math.min(1, s.t + dt / 1.5);
          g.position.lerpVectors(s.von, s.nach, 1 - (1 - s.t) * (1 - s.t)); g.position.y += Math.sin(s.t * Math.PI) * 0.8;
          g.rotation.y = s.t < 1 ? Math.atan2(s.nach.x - s.von.x, s.nach.z - s.von.z) : g.rotation.y;
          d.fl.forEach((f, i) => { f.rotation.z = s.t < 1 ? Math.sin(t * 22) * 0.9 * (i ? -1 : 1) : 0; });
          d.pick += dt; d.kopf.rotation.x = s.t < 1 ? 0 : Math.max(0, Math.sin(d.pick * 5)) * 0.7 * (Math.sin(d.pick * 0.6) > 0.2 ? 1 : 0);
          continue;
        }
        if (d.zustand === 'boden') {
          if (abst < 2.6 && !d.gerd) {   // erschrecken: auffliegen, weg vom Spieler
            d.zustand = 'flug'; d.flugZeit = 0; const n = abst || 1;
            d.v.set(dx / n * 4 + (Math.random() - 0.5) * 2, 3.2 + Math.random(), dz / n * 4 + (Math.random() - 0.5) * 2);
            continue;
          }
          if (d.gerd && abst < 1.6 && onGerd && !gerdGemeldet) { gerdGemeldet = true; onGerd(); }
          if (d.gerd && abst > 4) gerdGemeldet = false;
          // picken und trippeln
          d.pick += dt; d.kopf.rotation.x = Math.max(0, Math.sin(d.pick * 6)) * 0.9 * (Math.sin(d.pick * 0.7) > 0.3 ? 1 : 0);
          d.fl.forEach((f, i) => { f.rotation.z = 0; });
          if (d.warte > 0) { d.warte -= dt; continue; }
          const tx = d.ziel.x - g.position.x, tz = d.ziel.z - g.position.z, td = Math.hypot(tx, tz);
          if (td < 0.15) { d.warte = 1 + Math.random() * 4; d.ziel = { x: g.position.x + (Math.random() - 0.5) * 2.4, z: g.position.z + (Math.random() - 0.5) * 2.4 }; continue; }
          g.position.x += tx / td * 0.55 * dt; g.position.z += tz / td * 0.55 * dt;
          g.rotation.y = Math.atan2(tx, tz); g.position.y = 0.06 + Math.abs(Math.sin(t * 14)) * 0.012;
        } else {
          d.flugZeit += dt;
          d.fl.forEach((f, i) => { f.rotation.z = Math.sin(t * 22) * 0.9 * (i ? -1 : 1); });
          if (d.flugZeit < 2.2) { d.v.y -= 0.6 * dt; }
          else if (d.flugZeit < 2.4) { d.ziel = neueLandung(); }
          else { // zum Landeplatz gleiten
            const tx = d.ziel.x - g.position.x, tz = d.ziel.z - g.position.z, td = Math.hypot(tx, tz) || 1;
            d.v.x += (tx / td * 5 - d.v.x) * dt * 1.5; d.v.z += (tz / td * 5 - d.v.z) * dt * 1.5; d.v.y += ((td < 6 ? -1.6 : 0.2) - d.v.y) * dt * 2;
          }
          g.position.addScaledVector(d.v, dt);
          g.rotation.y = Math.atan2(d.v.x, d.v.z);
          if (d.flugZeit > 2.4 && g.position.y <= 0.06) { g.position.y = 0.06; d.zustand = 'boden'; d.warte = 1 + Math.random() * 2; d.ziel = { x: g.position.x, z: g.position.z }; }
          if (g.position.y > 9) d.v.y = Math.min(d.v.y, 0);
        }
      }
    },
  };
}
