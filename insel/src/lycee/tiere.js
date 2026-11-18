// Annexe Junglinster – Leben über und auf dem Hof: Tauben (mit Gerd, der einen Partyhut trägt und nie wegfliegt)
// und Wolken, die langsam über den Himmel ziehen. Alles selbst gebaut, keine Dateien.
import * as THREE from 'three';

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
  let gerdGemeldet = false;
  return {
    update(dt, t, { night = 0, onGerd } = {}) {
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
