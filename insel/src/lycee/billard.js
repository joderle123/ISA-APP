// Billard in 3D im Jugendhaus (Auftrag 20.11.: „Und Billard“ – hochwertig wie der Tischkicker).
// 15 Kugeln + weiße Kugel, echte Stöße (Kugel trifft Kugel, Banden, Reibung), sechs Taschen.
// Regeln einfach: Wer zuerst eine Kugel versenkt, bekommt diese Sorte (Volle 1–7 oder Halbe 9–15). Danach die 8.
// Eigene Kugel versenkt = nochmal. Weiße in der Tasche = Wechsel. Die 8 zu früh = Runde verloren.
// Steuerung: ← → (A/D) zielen (Umschalt = fein) · Leertaste halten = Kraft, loslassen = Stoß. Finger: wischen = zielen, „Stoß“-Knopf halten.
// Die Zielhilfe zeigt, wohin die Weiße läuft und wohin die getroffene Kugel rollt (wie in Handy-Billardspielen).
import * as THREE from 'three';

export const BILLARD_TISCH = { x: 26.0, z: 115.2, T: 0.8, L: 1.6, B: 0.8 };
export const KUGEL_R = 0.026;
// Startaufstellung: Dreieck, Spitze auf dem Fußpunkt, die 8 in der Mitte, Ecken gemischt (eine Volle, eine Halbe)
export function dreieck({ L = BILLARD_TISCH.L, r = KUGEL_R } = {}) {
  const reihen = [[1], [9, 2], [3, 8, 10], [11, 4, 12, 5], [6, 13, 7, 14, 15]], fx = L / 4, out = [];
  reihen.forEach((reihe, i) => reihe.forEach((n, j) => out.push({ n, x: fx + i * r * 2 * 0.866 + 0.001 * i, z: (j - (reihe.length - 1) / 2) * (r * 2 + 0.0008) })));
  return out;
}
const sorte = (n) => (n === 0 ? 'weiss' : n === 8 ? 'acht' : n < 8 ? 'volle' : 'halbe');

export function createBillard({ scene, camera, steuerung, ui, rr = null, ton = () => {}, vib = () => {}, canvas = null, holeFigur = async () => null }) {
  const { x: TX, z: TZ, T, L, B } = BILLARD_TISCH, r = KUGEL_R, RAND = 0.06, TASCHE = [0.058, 0.05];
  const welt = (x, y, z, v = new THREE.Vector3()) => v.set(TX + x, y, TZ + z);
  const root = new THREE.Group(); root.name = 'billard'; scene.add(root);
  const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7, ...o });
  const box = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); welt(x, y, z, b.position); b.castShadow = b.receiveShadow = true; root.add(b); return b; };
  // ---------- Tisch ----------
  const filz = std('#1f7a4a', { roughness: 0.95 }), bande = std('#1a6a40', { roughness: 0.9 }), holz = std('#5a3522', { roughness: 0.5 }), dunkel = std('#111111');
  box(L, 0.04, B, filz, 0, T - 0.02, 0);
  box(L + 2 * RAND + 0.06, 0.14, B + 2 * RAND + 0.06, holz, 0, T - 0.1, 0);   // Korpus
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(0.1, T - 0.17, 0.1, holz, sx * (L / 2 + 0.02), (T - 0.17) / 2, sz * (B / 2 + 0.02));
  const TASCHEN = [[-L / 2, -B / 2, 0], [0, -B / 2, 1], [L / 2, -B / 2, 0], [-L / 2, B / 2, 0], [0, B / 2, 1], [L / 2, B / 2, 0]].map(([x, z, m]) => ({ x, z, rad: TASCHE[m] }));
  // Banden: zwischen den Taschen, mit Holzrahmen außen
  const lang = (L - 2 * 0.07 - 2 * 0.055) / 2;
  for (const sz of [-1, 1]) for (const sx of [-1, 1]) { box(lang, 0.04, 0.035, bande, sx * (0.055 + lang / 2), T + 0.02, sz * (B / 2 + 0.0175)); }
  for (const sx of [-1, 1]) box(0.035, 0.04, B - 2 * 0.07, bande, sx * (L / 2 + 0.0175), T + 0.02, 0);
  for (const sz of [-1, 1]) box(L + 2 * RAND + 0.06, 0.05, RAND, holz, 0, T + 0.025, sz * (B / 2 + 0.035 + RAND / 2));
  for (const sx of [-1, 1]) box(RAND, 0.05, B + 2 * 0.035, holz, sx * (L / 2 + 0.035 + RAND / 2), T + 0.025, 0);
  for (const t of TASCHEN) { const p = new THREE.Mesh(new THREE.CylinderGeometry(t.rad, t.rad * 0.8, 0.06, 18), dunkel); welt(t.x, T - 0.0, t.z, p.position); root.add(p); }
  for (let i = 1; i < 4; i++) for (const sz of [-1, 1]) { const d = new THREE.Mesh(new THREE.CircleGeometry(0.008, 8), std('#f4efe6')); d.rotation.x = -Math.PI / 2; welt(-L / 2 + i * L / 4, T + 0.051, sz * (B / 2 + 0.035 + RAND / 2), d.position); root.add(d); }
  { const lampe = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.28), std('#2b2f3a', { metalness: 0.4 })); welt(0, T + 1.05, 0, lampe.position); root.add(lampe);
    const leucht = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.22), new THREE.MeshBasicMaterial({ color: '#fff4d6', toneMapped: false })); leucht.rotation.x = Math.PI / 2; welt(0, T + 1.009, 0, leucht.position); root.add(leucht);
    for (const sx of [-0.4, 0.4]) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 1.9 - T - 1.05), dunkel); welt(sx, T + 1.05 + (1.9 - T - 1.05) / 2 + 0.04, 0, s.position); root.add(s); } }
  // ---------- Kugeln ----------
  const FARBE = { 1: '#f2c230', 2: '#2f5fbf', 3: '#d6452f', 4: '#6b3fa0', 5: '#f08a24', 6: '#1f8a4c', 7: '#8a2b2b', 8: '#151515' };
  const kugelTextur = (n) => {
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; const g = cv.getContext('2d');
    if (n === 0) { g.fillStyle = '#f7f4ea'; g.fillRect(0, 0, 256, 128); g.fillStyle = '#d33'; g.beginPath(); g.arc(64, 64, 6, 0, Math.PI * 2); g.fill(); }
    else {
      const f = FARBE[n > 8 ? n - 8 : n];
      if (n > 8) { g.fillStyle = '#f7f4ea'; g.fillRect(0, 0, 256, 128); g.fillStyle = f; g.fillRect(0, 34, 256, 60); } else { g.fillStyle = f; g.fillRect(0, 0, 256, 128); }
      for (const cx of [64, 192]) { g.fillStyle = '#f7f4ea'; g.beginPath(); g.arc(cx, 64, 22, 0, Math.PI * 2); g.fill(); g.fillStyle = '#151515'; g.font = 'bold 26px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(n), cx, 65); }
    }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  const geo = new THREE.SphereGeometry(r, 24, 16);
  const kugeln = [];
  for (let n = 0; n <= 15; n++) {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: kugelTextur(n), roughness: 0.18, metalness: 0.0 })); m.castShadow = true; m.name = 'billardkugel'; root.add(m);
    kugeln.push({ n, x: 0, z: 0, vx: 0, vz: 0, drin: false, m, fall: 0 });
  }
  const weisse = kugeln[0];
  // Queue und Zielhilfe
  const queue = new THREE.Group(); root.add(queue);
  { const q = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.013, 1.3, 12), std('#d9b47a', { roughness: 0.4 })); q.rotation.z = Math.PI / 2; q.position.x = -0.65 - r - 0.02; queue.add(q);
    const griffQ = new THREE.Mesh(new THREE.CylinderGeometry(0.0132, 0.0145, 0.45, 12), std('#2b1a12', { roughness: 0.4 })); griffQ.rotation.z = Math.PI / 2; griffQ.position.x = -1.08 - r; queue.add(griffQ);
    const spitze = new THREE.Mesh(new THREE.CylinderGeometry(0.0062, 0.0062, 0.012, 10), std('#3a6fd0')); spitze.rotation.z = Math.PI / 2; spitze.position.x = -r - 0.026; queue.add(spitze); }
  const linieMat = new THREE.LineDashedMaterial({ color: '#ffffff', dashSize: 0.02, gapSize: 0.014, transparent: true, opacity: 0.8 });
  const linie = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), linieMat); root.add(linie);
  const linie2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.85 })); root.add(linie2);
  const geist = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 10), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.25, depthWrite: false })); root.add(geist);
  const zeige = (k) => { if (k.drin) return; welt(k.x, T + r, k.z, k.m.position); };
  function aufstellen() {
    for (const k of kugeln) { k.drin = false; k.fall = 0; k.vx = k.vz = 0; k.m.visible = true; k.m.quaternion.identity(); }
    for (const d of dreieck()) { const k = kugeln[d.n]; k.x = d.x; k.z = d.z; }
    weisse.x = -L / 4; weisse.z = 0; kugeln.forEach(zeige);
  }
  aufstellen();
  [queue, linie, linie2, geist].forEach((o) => { o.visible = false; });

  // ---------- Physik ----------
  const ruht = () => kugeln.every((k) => k.drin || (k.vx === 0 && k.vz === 0));
  function schritt(h, ereignis) {
    for (const k of kugeln) {
      if (k.drin) continue;
      const v = Math.hypot(k.vx, k.vz); if (v === 0) continue;
      const nv = Math.max(0, v - 0.32 * h) * (1 - 0.15 * h);   // Rollreibung
      if (nv < 0.008) { k.vx = k.vz = 0; continue; }
      k.vx *= nv / v; k.vz *= nv / v; k.x += k.vx * h; k.z += k.vz * h;
      // Taschen
      for (const t of TASCHEN) if (Math.hypot(k.x - t.x, k.z - t.z) < t.rad) { k.drin = true; k.fall = 0.35; k.vx = (t.x - k.x) * 3; k.vz = (t.z - k.z) * 3; ereignis('tasche', k); break; }
      if (k.drin) continue;
      // Banden (außer im Taschenmaul)
      const imMaul = TASCHEN.some((t) => Math.hypot(k.x - t.x, k.z - t.z) < t.rad + r * 1.6);
      if (!imMaul) {
        if (k.x < -L / 2 + r) { k.x = -L / 2 + r; k.vx = Math.abs(k.vx) * 0.78; ereignis('bande', k); }
        if (k.x > L / 2 - r) { k.x = L / 2 - r; k.vx = -Math.abs(k.vx) * 0.78; ereignis('bande', k); }
        if (k.z < -B / 2 + r) { k.z = -B / 2 + r; k.vz = Math.abs(k.vz) * 0.78; ereignis('bande', k); }
        if (k.z > B / 2 - r) { k.z = B / 2 - r; k.vz = -Math.abs(k.vz) * 0.78; ereignis('bande', k); }
      }
    }
    // Kugel trifft Kugel (gleiche Masse: Normalanteile tauschen)
    for (let i = 0; i < kugeln.length; i++) for (let j = i + 1; j < kugeln.length; j++) {
      const a = kugeln[i], c = kugeln[j]; if (a.drin || c.drin) continue;
      const dx = c.x - a.x, dz = c.z - a.z, d = Math.hypot(dx, dz); if (d >= 2 * r || d === 0) continue;
      const nx = dx / d, nz = dz / d, ueber = 2 * r - d; a.x -= nx * ueber / 2; a.z -= nz * ueber / 2; c.x += nx * ueber / 2; c.z += nz * ueber / 2;
      const rel = (a.vx - c.vx) * nx + (a.vz - c.vz) * nz; if (rel <= 0) continue;
      const imp = rel * 0.96; a.vx -= imp * nx; a.vz -= imp * nz; c.vx += imp * nx; c.vz += imp * nz;
      ereignis('kugel', a, c);
    }
  }
  // Zielhilfe: erster Treffer entlang der Richtung (Kugel oder Bande)
  function vorschau(ri) {
    const dx = Math.cos(ri), dz = Math.sin(ri); let best = 3, ziel = null;
    for (const k of kugeln) { if (k.drin || k === weisse) continue;
      const px = k.x - weisse.x, pz = k.z - weisse.z, t = px * dx + pz * dz; if (t <= 0) continue;
      const q = px * px + pz * pz - t * t; if (q > 4 * r * r) continue; const tt = t - Math.sqrt(4 * r * r - q); if (tt < best) { best = tt; ziel = k; } }
    // Bande
    const tb = Math.min(dx > 0 ? (L / 2 - r - weisse.x) / dx : dx < 0 ? (-L / 2 + r - weisse.x) / dx : 9, dz > 0 ? (B / 2 - r - weisse.z) / dz : dz < 0 ? (-B / 2 + r - weisse.z) / dz : 9);
    if (!ziel || tb < best) return { t: tb, ziel: null };
    return { t: best, ziel };
  }

  let lauf = null;
  function spiel({ gegner = 'Kim', gegnerId = null, leicht = false, figur = null } = {}) {
    return new Promise(async (ok) => {
      aufstellen(); demoLauf = null;
      const S0 = lauf = { dran: 'ich', sorte: { ich: null, er: null }, ri: 0, kraft: 0, lade: false, phase: 'zielen', t: 0, tasten: {}, gegner, leicht, versenkt: [], ersterKontakt: null, weisseDrin: false, ende: null, aus: 0, kiWarte: 0, ergebnis: null };
      const p0 = steuerung.pos.clone(), yaw0 = steuerung.yaw || 0;
      steuerung.teleport(TX - L / 2 - 0.6, TZ, Math.PI / 2); steuerung.frei = false; steuerung.kameraAus = true;
      if (steuerung.figur && steuerung.figur.group) steuerung.figur.group.visible = false;
      let gf = null; try { gf = await holeFigur(gegnerId); } catch (e) { gf = null; }
      if (gf && lauf === S0) { scene.add(gf.group); welt(L / 2 + 0.55, 0, B / 2 + 0.25, gf.group.position); gf.group.rotation.set(0, -Math.PI * 0.75, 0); gf.spiele && gf.spiele('Idle'); }
      S0.gf = gf; S0.hf = gf || figur;   // hf: Figur, die beim Warten den Queue hält (auch die Kim aus dem Jugendhaus)
      const runter = (e) => {
        if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); S0.tasten[e.code] = true; if (e.code === 'Space' && !e.repeat && S0.phase === 'zielen' && S0.dran === 'ich') { S0.lade = true; S0.kraft = 0; S0.t = 0; } }
        if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); S0.ende(); }
      };
      const hoch = (e) => { S0.tasten[e.code] = false; if (e.code === 'Space' && S0.lade) stoss(S0); };
      let zieh = null;
      const pdown = (e) => { zieh = { x: e.clientX, ri: S0.ri }; };
      const pmove = (e) => { if (zieh && S0.phase === 'zielen' && S0.dran === 'ich') S0.ri = zieh.ri + (e.clientX - zieh.x) * 0.004; };
      const pup = () => { zieh = null; };
      document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
      if (canvas) { canvas.addEventListener('pointerdown', pdown); canvas.addEventListener('pointermove', pmove); canvas.addEventListener('pointerup', pup); }
      // Touch-Knopf „Stoß“ (halten = Kraft)
      const knopf = document.createElement('button'); knopf.type = 'button'; knopf.textContent = '🎱 Stoß (halten)';
      knopf.style.cssText = 'position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:30;font:700 17px system-ui;padding:14px 20px;border-radius:999px;border:0;background:#ffd166;color:#2b3a55;box-shadow:0 4px 14px rgba(0,0,0,.25);touch-action:none';
      knopf.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); if (S0.phase === 'zielen' && S0.dran === 'ich') { S0.lade = true; S0.kraft = 0; S0.t = 0; } });
      knopf.addEventListener('pointerup', (e) => { e.preventDefault(); e.stopPropagation(); if (S0.lade) stoss(S0); });
      document.body.appendChild(knopf);
      S0.ende = () => {
        if (lauf !== S0) return; lauf = null; knopf.remove();
        document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true);
        if (canvas) { canvas.removeEventListener('pointerdown', pdown); canvas.removeEventListener('pointermove', pmove); canvas.removeEventListener('pointerup', pup); }
        if (S0.gf) scene.remove(S0.gf.group);
        if (S0.hf && S0.hf.hand) { S0.hf.hand.R.w = 0; S0.hf.hand.L.w = 0; }
        gQ.visible = false;
        [queue, linie, linie2, geist].forEach((o) => { o.visible = false; });
        if (steuerung.figur && steuerung.figur.group) steuerung.figur.group.visible = true;
        steuerung.kameraAus = false; steuerung.frei = true; steuerung.teleport(p0.x, p0.z, yaw0); if (rr && rr.setDof) rr.setDof(0);
        ui.skate(null); ok(S0.ergebnis || { gewonnen: false, abbruch: true });
      };
      ui.skate({ kopf: '🎱 Billard gegen ' + gegner, punkte: 0, ohneTricks: true, minispiel: true, einheit: ['Kugel versenkt', 'Kugeln versenkt'], weg: () => S0.ende(), ziel: '← → zielen (Umschalt = fein) · Leertaste halten = Kraft, loslassen = Stoß', trick: 'Du hast den Anstoß.' });
    });
  }
  function stoss(Sx) {
    Sx.lade = false; if (Sx.kraft < 0.04) return;
    const v = 0.4 + Sx.kraft * 3.6; weisse.vx = Math.cos(Sx.ri) * v; weisse.vz = Math.sin(Sx.ri) * v;
    Sx.phase = 'rollen'; Sx.t = 0; Sx.versenkt = []; Sx.ersterKontakt = null; Sx.weisseDrin = false;
    if (!Sx.demo) { ton('klack'); vib(14); } [linie, linie2, geist].forEach((o) => { o.visible = false; });
  }
  function kiZielen(Sx, wer = 'er') {   // Gegner: bester Stoß aus allen eigenen Kugeln × Taschen (frei, kleiner Schnittwinkel, kurzer Weg)
    const meine = kugeln.filter((k) => !k.drin && k !== weisse && (Sx.sorte[wer] ? sorte(k.n) === Sx.sorte[wer] : sorte(k.n) !== 'acht'));
    const ziele = meine.length ? meine : kugeln.filter((k) => !k.drin && k.n === 8);
    let best = null;
    const frei = (ax, az, bx, bz, ohne) => kugeln.every((k) => { if (k.drin || ohne.includes(k)) return true; const dx = bx - ax, dz = bz - az, l = Math.hypot(dx, dz), t = ((k.x - ax) * dx + (k.z - az) * dz) / (l * l); if (t < 0 || t > 1) return true; return Math.hypot(ax + dx * t - k.x, az + dz * t - k.z) > 2 * r; });
    for (const k of ziele) for (const t of TASCHEN) {
      const dx = t.x - k.x, dz = t.z - k.z, d = Math.hypot(dx, dz), gx = k.x - dx / d * 2 * r, gz = k.z - dz / d * 2 * r;
      const ax = gx - weisse.x, az = gz - weisse.z, a = Math.hypot(ax, az), cut = (ax * dx + az * dz) / (a * d);
      if (cut < 0.35 || !frei(weisse.x, weisse.z, gx, gz, [weisse, k]) || !frei(k.x, k.z, t.x, t.z, [k])) continue;
      const wert = cut / (0.4 + a + d);
      if (!best || wert > best.wert) best = { wert, ri: Math.atan2(az, ax), kraft: Math.min(1, 0.25 + (a + d) * 0.3) };
    }
    if (!best) { const k = ziele.reduce((p, q) => (Math.hypot(q.x - weisse.x, q.z - weisse.z) < Math.hypot(p.x - weisse.x, p.z - weisse.z) ? q : p)); best = { ri: Math.atan2(k.z - weisse.z, k.x - weisse.x), kraft: 0.55 }; }
    best.ri += (Math.random() - 0.5) * (Sx.leicht ? 0.07 : 0.03);
    return best;
  }
  function auswerten(Sx) {   // nach dem Stoß: Regeln
    const wer = Sx.dran, anderer = wer === 'ich' ? 'er' : 'ich', name = wer === 'ich' ? 'Du' : Sx.gegner;
    const eigen = Sx.versenkt.filter((k) => k.n !== 8 && k.n !== 0);
    if (!Sx.sorte[wer] && eigen.length) { Sx.sorte[wer] = sorte(eigen[0].n); Sx.sorte[anderer] = Sx.sorte[wer] === 'volle' ? 'halbe' : 'volle'; }
    const restEigen = (w) => kugeln.filter((k) => !k.drin && Sx.sorte[w] && sorte(k.n) === Sx.sorte[w]).length;
    if (Sx.versenkt.some((k) => k.n === 8)) {
      const gewonnen = Sx.sorte[wer] && restEigen(wer) === 0 && !Sx.weisseDrin;
      const ichGewinne = gewonnen ? wer === 'ich' : wer !== 'ich';
      Sx.ergebnis = { gewonnen: ichGewinne };
      if (!Sx.demo) ui.skate({ trick: ichGewinne ? '🏆 Gewonnen! Die 8 ist drin.' : (wer === 'ich' ? 'Die 8 zu früh – Runde an ' + Sx.gegner + '.' : Sx.gegner + ' versenkt die 8 – du gewinnst!') });
      if (!Sx.demo) ton(ichGewinne ? 'melodie2' : 'klack'); if (Sx.gf && Sx.gf.spiele) Sx.gf.spiele(ichGewinne ? 'Idle' : 'Jubeln', { einmal: true });
      Sx.aus = 2.8; Sx.phase = 'aus'; return;
    }
    if (Sx.weisseDrin) {   // Weiße zurück auf den Kopfpunkt – liegt dort eine Kugel, daneben
      weisse.drin = false; weisse.m.visible = true; weisse.fall = 0; weisse.vx = weisse.vz = 0;
      for (const dz of [0, 0.07, -0.07, 0.14, -0.14, 0.21, -0.21]) for (const dx of [0, -0.07, -0.14]) {
        const x = -L / 4 + dx, z = dz; if (kugeln.every((k) => k === weisse || k.drin || Math.hypot(k.x - x, k.z - z) > 2.2 * r)) { weisse.x = x; weisse.z = z; zeige(weisse); return weiterNachWeisser(Sx, wer, anderer, name); }
      }
      weisse.x = -L / 4; weisse.z = 0; zeige(weisse);
    }
    return weiterNachWeisser(Sx, wer, anderer, name);
  }
  function weiterNachWeisser(Sx, wer, anderer, name) {
    const restEigen = (w) => kugeln.filter((k) => !k.drin && Sx.sorte[w] && sorte(k.n) === Sx.sorte[w]).length;
    const weiter = !Sx.weisseDrin && Sx.versenkt.some((k) => Sx.sorte[wer] && sorte(k.n) === Sx.sorte[wer]);
    const s = (w) => (Sx.sorte[w] === 'volle' ? 'Volle (1–7)' : Sx.sorte[w] === 'halbe' ? 'Halbe (9–15)' : 'noch offen');
    if (!weiter) Sx.dran = anderer;
    const hinweis = Sx.weisseDrin ? 'Weiße in der Tasche. ' : weiter ? name + ' trifft – nochmal! ' : '';
    if (!Sx.demo) ui.skate({ punkte: 15 - kugeln.filter((k) => !k.drin && k.n > 0).length, trick: hinweis + (Sx.dran === 'ich' ? 'Du bist dran' : Sx.gegner + ' ist dran') + ' · Du: ' + s('ich') + (Sx.sorte.ich && restEigen('ich') === 0 ? ' → jetzt die 8!' : '') });
    Sx.phase = 'zielen'; Sx.kiWarte = 1.4; Sx.kraft = 0;
    if (Sx.dran === 'ich') { const k = kugeln.find((q) => !q.drin && q !== weisse && (!Sx.sorte.ich || sorte(q.n) === Sx.sorte.ich)) || kugeln[8]; Sx.ri = Math.atan2(k.z - weisse.z, k.x - weisse.x); }
  }
  // Gegner:in wartet mit eigenem Queue in der Hand (Hand-IK der Figur, wie beim Kicker die Griffe). Ist sie dran, liegt der Queue am Tisch.
  const gQ = new THREE.Group(); gQ.name = 'gegnerQueue'; gQ.visible = false; scene.add(gQ);
  { const st = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.013, 1.42, 10), std('#d9b47a', { roughness: 0.4 })); st.position.y = 0.71; st.castShadow = true; gQ.add(st);
    const gr = new THREE.Mesh(new THREE.CylinderGeometry(0.0135, 0.015, 0.45, 10), std('#2b1a12', { roughness: 0.4 })); gr.position.y = 0.24; gQ.add(gr);
    const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.0062, 0.0062, 0.014, 10), std('#3a6fd0')); sp.position.y = 1.427; gQ.add(sp); }
  const qF = new THREE.Vector3(), qS = new THREE.Vector3(), qB = new THREE.Vector3(), qD = new THREE.Vector3(), qSh = new THREE.Vector3(), qUp = new THREE.Vector3(0, 1, 0);
  function gegnerHaelt(Sx, dt) {
    const gf = Sx.hf, halte = Sx.dran !== 'er' && Sx.phase !== 'aus';
    Sx.gw = Math.max(0, Math.min(1, (Sx.gw || 0) + (halte ? dt * 3 : -dt * 4)));
    gQ.visible = Sx.gw > 0.35;
    for (const sd of ['R', 'L']) gf.hand[sd].w = Sx.gw;
    if (Sx.gw <= 0) return;
    const P = gf.group.position, ry = gf.group.rotation.y;
    qF.set(Math.sin(ry), 0, Math.cos(ry));
    if (!gf.schulter('R', qSh)) return;
    qS.set(qSh.x - P.x, 0, qSh.z - P.z); qS.addScaledVector(qF, -qS.dot(qF)); if (qS.lengthSq() < 1e-6) return; qS.normalize();   // zeigt zur rechten Seite
    qB.copy(P).addScaledVector(qS, 0.11).addScaledVector(qF, 0.34); qB.y = 0.01;   // Fuß des Queues am Boden
    qD.set(0, 1.42, 0).addScaledVector(qF, -0.14).addScaledVector(qS, -0.02).normalize();   // Spitze leicht zum Körper geneigt
    gQ.position.copy(qB); gQ.quaternion.setFromUnitVectors(qUp, qD);
    for (const [sd, tief, seite] of [['R', 0.18, -1], ['L', 0.34, 1]]) {
      const H = gf.hand[sd], h = Math.max(0.5, qSh.y - tief);
      H.ziel = (H.ziel || new THREE.Vector3()).copy(qB).addScaledVector(qD, (h - qB.y) / qD.y);
      H.richtung = (H.richtung || new THREE.Vector3()).copy(qF).addScaledVector(qS, seite * -0.3).normalize();
      H.flaeche = (H.flaeche || new THREE.Vector3()).copy(qS).multiplyScalar(seite);
      H.pol = (H.pol || new THREE.Vector3()).set(0, -1, 0).addScaledVector(qS, sd === 'R' ? 0.5 : -0.4).addScaledVector(qF, -0.3);
      H.faust = 0.95; H.zeige = 0; H.daumenHoch = false;
    }
  }

  function tick(dt, Sx = lauf) {
    if (!Sx) return;
    if (Sx.hf && Sx.hf.hand && Sx.hf.armOk && Sx.hf.schulter) gegnerHaelt(Sx, Math.min(dt, 0.1));
    const demo = !!Sx.demo;
    dt = Math.min(dt, 0.04); Sx.t += dt;
    // fallende Kugeln
    for (const k of kugeln) if (k.drin && k.fall > 0) { k.fall -= dt; k.x += k.vx * dt; k.z += k.vz * dt; welt(k.x, T + r - (0.35 - k.fall) * 0.4, k.z, k.m.position); if (k.fall <= 0) k.m.visible = false; }
    if (Sx.phase === 'aus') { Sx.aus -= dt; if (Sx.aus <= 0) { if (demo) { aufstellen(); Object.assign(Sx, { phase: 'zielen', dran: 'ich', sorte: { ich: null, er: null }, kiWarte: 2, kiPlan: null }); } else Sx.ende(); } }
    const ziel = new THREE.Vector3(), cam = new THREE.Vector3();
    if (Sx.phase === 'zielen') {
      if (Sx.dran === 'ich' && !demo) {
        const dir = (Sx.tasten.ArrowRight || Sx.tasten.KeyD ? 1 : 0) - (Sx.tasten.ArrowLeft || Sx.tasten.KeyA ? 1 : 0), fein = Sx.tasten.ShiftLeft || Sx.tasten.ShiftRight;
        Sx.ri += dir * dt * (fein ? 0.12 : 0.9);
        if (Sx.lade) { Sx.kraft = 0.5 - 0.5 * Math.cos(Sx.t * 2.6); }   // pendelt 0 → 1 → 0
      } else {
        Sx.kiWarte -= dt;
        if (!Sx.kiPlan) Sx.kiPlan = kiZielen(Sx, Sx.dran);
        Sx.ri += THREE.MathUtils.clamp(Sx.kiPlan.ri - Sx.ri, -dt * 1.5, dt * 1.5); Sx.kraft = Math.min(Sx.kiPlan.kraft, Math.max(0, (1.4 - Sx.kiWarte) * 0.8));
        if (Sx.kiWarte <= 0) { Sx.ri = Sx.kiPlan.ri; Sx.kraft = Sx.kiPlan.kraft; Sx.kiPlan = null; stoss(Sx); }
      }
      // Queue, Zielhilfe, Kamera hinter der Weißen
      const dx = Math.cos(Sx.ri), dz = Math.sin(Sx.ri);
      welt(weisse.x, T + r + 0.012, weisse.z, queue.position); queue.rotation.set(0, -Sx.ri, -0.08); queue.children.forEach((c) => { c.position.x = c.userData.x0 === undefined ? (c.userData.x0 = c.position.x) : c.userData.x0; c.position.x -= Sx.kraft * 0.18; });
      queue.visible = true;
      if (Sx.dran === 'ich' && !demo) {
        const vs = vorschau(Sx.ri), ex = weisse.x + dx * vs.t, ez = weisse.z + dz * vs.t;
        linie.geometry.setFromPoints([welt(weisse.x, T + r, weisse.z), welt(ex, T + r, ez)]); linie.computeLineDistances(); linie.visible = true;
        welt(ex, T + r, ez, geist.position); geist.visible = !!vs.ziel;
        if (vs.ziel) { const nx = vs.ziel.x - ex, nz = vs.ziel.z - ez, nl = Math.hypot(nx, nz) || 1; linie2.geometry.setFromPoints([welt(vs.ziel.x, T + r, vs.ziel.z), welt(vs.ziel.x + nx / nl * 0.25, T + r, vs.ziel.z + nz / nl * 0.25)]); linie2.visible = true; } else linie2.visible = false;
      } else [linie, linie2, geist].forEach((o) => { o.visible = false; });
      welt(weisse.x - dx * 0.75, T + 0.42, weisse.z - dz * 0.75, cam); welt(weisse.x + dx * 0.3, T, weisse.z + dz * 0.3, ziel);
    } else {
      queue.visible = false;
      if (Sx.phase === 'rollen') {
        const n = Math.ceil(dt / 0.002), h = dt / n;
        for (let i = 0; i < n; i++) schritt(h, (art, a, c) => {
          if (art === 'tasche') { Sx.versenkt.push(a); if (a === weisse) Sx.weisseDrin = true; if (!demo) { ton(a === weisse ? 'klack' : 'pling'); vib(10); } }
          if (art === 'kugel' && !Sx.ersterKontakt && (a === weisse || c === weisse)) Sx.ersterKontakt = a === weisse ? c : a;
          if (art === 'kugel' && Math.random() < (demo ? 0.08 : 0.3)) ton('klack');
        });
        for (const k of kugeln) if (!k.drin) { const v = Math.hypot(k.vx, k.vz); if (v > 0) { zeige(k); k.m.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(k.vz, 0, -k.vx).normalize(), v * dt / r)); } }
        if (ruht() && kugeln.every((k) => !k.drin || k.fall <= 0)) auswerten(Sx);
      }
      cam.set(TX - 0.05, T + 1.55, TZ - 0.95); ziel.set(TX, T, TZ);   // Überblick, solange die Kugeln rollen
    }
    if (demo) return;
    camera.position.lerp(cam, Math.min(1, dt * 3)); camera.lookAt(ziel);
    if (rr && rr.setDof) rr.setDof(0.15, camera.position.distanceTo(ziel));
  }
  // Demo: Zwei Jugendliche spielen, solange man in der Nähe ist und nicht selbst spielt (die Figuren stellt spiel.js an den Tisch)
  let demoLauf = null;
  function demoTick(dt, nah) {
    if (lauf || !nah) return;
    if (!demoLauf) { aufstellen(); demoLauf = { demo: true, dran: 'ich', sorte: { ich: null, er: null }, ri: 0, kraft: 0, phase: 'zielen', t: 0, kiWarte: 2.5, kiPlan: null, versenkt: [], gegner: '', leicht: true }; }
    tick(dt, demoLauf);
  }
  return { spiel, tick, demoTick, aktiv: () => !!lauf, beenden: () => { if (lauf) lauf.ende(); }, root, kugeln, get lauf() { return lauf; }, stossTest: (ri, kraft) => { if (lauf) { lauf.ri = ri; lauf.kraft = kraft; stoss(lauf); } } };
}
