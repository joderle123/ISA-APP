// Tischkicker in 3D am echten Tisch im Jugendhaus (Auftrag 20.11.: „Tischkicker … aber hochquali“).
// Echter Aufbau mit 8 Stangen je Seite abwechselnd: Tor (1), Abwehr (2), Sturm Rot (3), Mittelfeld (5), Mittelfeld Rot (5),
// Sturm (3), Abwehr Rot (2), Tor Rot (1). Stangen verschieben sich (das Fünfer-Mittelfeld nur wenig – wie echt),
// Figuren schwingen beim Schuss nach vorn. Ball rollt mit Reibung, prallt an Banden und Figuren, wird von der Seite eingeworfen.
// Steuerung: ↑/↓ oder W/S = Stangen schieben · Leertaste = schießen · Finger/Maus: hoch/runter ziehen, tippen = schießen.
import * as THREE from 'three';

export const KICKER_TISCH = { x: 20.5, z: 117.2, T: 0.86, L: 1.36, B: 0.76, TOR: 0.22 };
// Stangen von links (blaues Tor) nach rechts (rotes Tor): Position u, Team, Anzahl, Abstand
export const STANGEN3D = [[-0.60, 'b', 1, 0], [-0.44, 'b', 2, 0.24], [-0.28, 'r', 3, 0.21], [-0.12, 'b', 5, 0.13], [0.12, 'r', 5, 0.13], [0.28, 'b', 3, 0.21], [0.44, 'r', 2, 0.24], [0.60, 'r', 1, 0]];
export const stangenWeg = (n, a, B = KICKER_TISCH.B) => (n === 1 ? 0.13 : Math.max(0.04, B / 2 - 0.05 - (n - 1) / 2 * a));   // wie weit eine Stange gleiten kann

export function createKicker3d({ scene, camera, steuerung, ui, rr = null, ton = () => {}, vib = () => {}, canvas = null, holeFigur = async () => null }) {
  const { x: KX, z: KZ, T, L, B, TOR } = KICKER_TISCH, R = 0.019, FR = 0.024;
  const welt = (u, y, v, ziel = new THREE.Vector3()) => ziel.set(KX - u, y, KZ + v);   // Kamera schaut nach +z: rechts im Bild = −x
  const root = new THREE.Group(); root.name = 'kicker3d'; scene.add(root);
  const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0, ...o });
  const box = (w, h, d, m, x, y, z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); b.castShadow = b.receiveShadow = true; root.add(b); return b; };
  // ---------- Tisch: Feld mit Linien, Holzkasten, Tore, Beine ----------
  { const cv = document.createElement('canvas'); cv.width = 680; cv.height = 380; const g = cv.getContext('2d');
    g.fillStyle = '#2d8a3e'; g.fillRect(0, 0, 680, 380);
    for (let i = 0; i < 10; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.035)' : 'rgba(0,0,0,.03)'; g.fillRect(i * 68, 0, 68, 380); }   // Rasenstreifen
    g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 4; g.strokeRect(6, 6, 668, 368); g.beginPath(); g.moveTo(340, 6); g.lineTo(340, 374); g.stroke();
    g.beginPath(); g.arc(340, 190, 52, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(340, 190, 5, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
    for (const x of [6, 674]) { g.strokeRect(x === 6 ? 6 : 594, 110, 80, 160); g.strokeRect(x === 6 ? 6 : 644, 150, 30, 80); }
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const feld = new THREE.Mesh(new THREE.PlaneGeometry(L, B), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
    feld.rotation.x = -Math.PI / 2; feld.rotation.z = Math.PI; feld.position.set(KX, T, KZ); feld.receiveShadow = true; root.add(feld); }
  const holz = mat('#6b4632'), holzHell = mat('#c89f74'), dunkel = mat('#1b1f27');
  const HW = 0.14, D = 0.05;   // Wandhöhe über dem Feld, Wanddicke
  box(L + 2 * D, HW + 0.12, D, holz, KX, T + HW / 2 - 0.06, KZ - B / 2 - D / 2); box(L + 2 * D, HW + 0.12, D, holz, KX, T + HW / 2 - 0.06, KZ + B / 2 + D / 2);   // lange Seiten
  for (const s of [-1, 1]) {   // Stirnseiten mit Toröffnung
    const x = KX - s * (L / 2 + D / 2), seite = (B - TOR) / 2;
    box(D, HW + 0.12, seite, holz, x, T + HW / 2 - 0.06, KZ - TOR / 2 - seite / 2); box(D, HW + 0.12, seite, holz, x, T + HW / 2 - 0.06, KZ + TOR / 2 + seite / 2);
    box(D, HW - 0.07, TOR, holz, x, T + 0.07 + (HW - 0.07) / 2, KZ); box(0.12, 0.08, TOR + 0.04, dunkel, x - s * 0.06, T + 0.02, KZ);   // über dem Tor, Torkasten
  }
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(0.07, T - 0.06, 0.07, holz, KX + sx * (L / 2 - 0.02), (T - 0.06) / 2, KZ + sz * (B / 2 - 0.02));
  for (const sz of [-1, 1]) box(L + 2 * D + 0.004, 0.014, D + 0.006, holzHell, KX, T + HW + 0.007, KZ + sz * (B / 2 + D / 2));   // helle Kante oben (lange Seiten)
  for (const sx of [-1, 1]) box(D + 0.006, 0.014, B + 2 * D + 0.004, holzHell, KX - sx * (L / 2 + D / 2), T + HW + 0.007, KZ);   // und Stirnseiten
  // ---------- Stangen mit Figuren ----------
  const chrom = mat('#d6dbe2', { metalness: 0.9, roughness: 0.25 }), griff = mat('#1b1f27', { roughness: 0.8 });
  const blau = mat('#2f6fd0'), rot = mat('#e0384f'), haut = mat('#f1c7a2'), hose = mat('#f4f4f0');
  const stangen = STANGEN3D.map(([u, f, n, a]) => {
    const g = new THREE.Group(); welt(u, T + 0.075, 0, g.position); root.add(g);
    const st = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, B + 0.5, 10), chrom); st.rotation.x = Math.PI / 2; g.add(st);
    const gr = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.12, 12), griff); gr.rotation.x = Math.PI / 2; gr.position.z = (f === 'b' ? -1 : 1) * (B / 2 + 0.22); g.add(gr);
    const dreh = new THREE.Group(); g.add(dreh);
    const figuren = [];
    for (let i = 0; i < n; i++) {
      const v = (i - (n - 1) / 2) * a, p = new THREE.Group(); p.position.z = v; dreh.add(p);
      const trikot = f === 'b' ? blau : rot;
      const k = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.05, 0.03), trikot); k.position.y = 0.005; p.add(k);
      const kopf = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 10), haut); kopf.position.y = 0.045; p.add(kopf);
      const bein = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.05, 0.034), hose); bein.position.y = -0.045; p.add(bein);
      const fuss = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.014, 0.036), trikot); fuss.position.set(f === 'b' ? -0.005 : 0.005, -0.068, 0); p.add(fuss);
      p.traverse((o) => { if (o.isMesh) o.castShadow = true; });
      figuren.push(v);
    }
    return { u, f, n, a, g, dreh, figuren, weg: stangenWeg(n, a), off: 0, schwung: 0 };
  });
  // ---------- Ball und Schatten ----------
  const ball = new THREE.Mesh(new THREE.SphereGeometry(R, 18, 14), mat('#f7f4ea', { roughness: 0.35 })); ball.castShadow = true; root.add(ball);
  const schatten = new THREE.Mesh(new THREE.CircleGeometry(R * 1.1, 16), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.3, depthWrite: false }));
  schatten.rotation.x = -Math.PI / 2; root.add(schatten);
  const torLicht = [-1, 1].map((s) => { const l = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, TOR), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0, toneMapped: false })); welt(s * (L / 2 + 0.03), T + HW + 0.02, 0, l.position); root.add(l); return l; });
  const b = { u: 0, v: 0, vu: 0, vv: 0, rot: new THREE.Quaternion() };
  const zeigeBall = () => { welt(b.u, T + R, b.v, ball.position); welt(b.u, T + 0.001, b.v, schatten.position); };
  zeigeBall();
  const figurVs = (st) => st.figuren.map((v) => v + st.off);

  let lauf = null;
  function spiel({ gegner = 'Kim', leicht = false, gegnerId = null } = {}) {
    return new Promise(async (ok) => {
      const L0 = { ich: 0, er: 0, uIch: 0, uEr: 0, schuss: 0, rSchuss: 0, pause: 1.0, fehler: 0, fehlerUhr: 0, t: 0, zieh: null, tasten: {}, leicht, gegner, ende: null, aus: 0 };
      lauf = L0;
      const p0 = steuerung.pos.clone(), yaw0 = steuerung.yaw || 0;
      steuerung.teleport(KX, KZ - B / 2 - 0.75, 0); steuerung.frei = false; steuerung.kameraAus = true;
      if (steuerung.figur && steuerung.figur.group) steuerung.figur.group.visible = false;
      let gf = null; try { gf = await holeFigur(gegnerId); } catch (e) { gf = null; }
      if (gf && lauf === L0) { scene.add(gf.group); welt(0, 0, B / 2 + 0.55, gf.group.position); gf.group.rotation.set(0, Math.PI, 0); gf.spiele && gf.spiele('Idle'); }
      L0.gf = gf;
      einwurf(L0, Math.random() < 0.5 ? 1 : -1);
      const runter = (e) => {
        if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS', 'Space'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); L0.tasten[e.code] = true; if (e.code === 'Space' && !e.repeat) schiessen(L0); }
        if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); L0.ende(); }
      };
      const hoch = (e) => { L0.tasten[e.code] = false; };
      const pdown = (e) => { L0.zieh = { y: e.clientY, u: L0.uIch, t: performance.now() }; };
      const pmove = (e) => { if (L0.zieh) L0.uIch = THREE.MathUtils.clamp(L0.zieh.u + (L0.zieh.y - e.clientY) / 120, -1, 1); };
      const pup = () => { if (L0.zieh && performance.now() - L0.zieh.t < 220) schiessen(L0); L0.zieh = null; };
      document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
      if (canvas) { canvas.addEventListener('pointerdown', pdown); canvas.addEventListener('pointermove', pmove); canvas.addEventListener('pointerup', pup); }
      L0.ende = () => {
        if (lauf !== L0) return; lauf = null;
        document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true);
        if (canvas) { canvas.removeEventListener('pointerdown', pdown); canvas.removeEventListener('pointermove', pmove); canvas.removeEventListener('pointerup', pup); }
        if (L0.gf) scene.remove(L0.gf.group);
        if (steuerung.figur && steuerung.figur.group) steuerung.figur.group.visible = true;
        steuerung.kameraAus = false; steuerung.frei = true; steuerung.teleport(p0.x, p0.z, yaw0); if (rr && rr.setDof) rr.setDof(0);
        ui.skate(null); torLicht.forEach((l) => { l.material.opacity = 0; });
        ok({ ich: L0.ich, er: L0.er });
      };
      ui.skate({ kopf: '⚽ Tischkicker gegen ' + gegner, punkte: 0, ohneTricks: true, minispiel: true, einheit: ['Tor', 'Tore'], weg: () => L0.ende(), ziel: '↑ ↓ (oder ziehen) = Stangen · Leertaste (oder tippen) = Schuss · bis 5', trick: 'Du 0 : 0 ' + gegner });
    });
  }
  function einwurf(Lx, richtung) {   // Ball kommt seitlich durch das Loch in der Mitte ins Spiel
    b.u = (Math.random() - 0.5) * 0.06; b.v = -B / 2 + R + 0.01; b.vu = richtung * (0.15 + Math.random() * 0.2); b.vv = 0.9 + Math.random() * 0.4; Lx.pause = 0.8; zeigeBall();
  }
  function schiessen(Lx) { if (Lx.schuss <= 0) { Lx.schuss = 0.24; ton('klack'); for (const st of stangen) if (st.f === 'b') st.schwung = 0.25; } }

  function tick(dt) {
    const Lx = lauf; if (!Lx) return;
    dt = Math.min(dt, 0.04); Lx.t += dt;
    // Kamera: schräg von der eigenen Seite, so weit weg, dass der ganze Tisch ins Bild passt (auch hochkant am Handy)
    const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect), dist = Math.max(1.35, (L / 2 + 0.12) / Math.tan(hfov / 2) * 0.92);
    camera.position.lerp(new THREE.Vector3(KX, T + dist * 0.78, KZ - B / 2 - dist * 0.62), Math.min(1, dt * 5)); camera.lookAt(KX, T, KZ + 0.04);
    if (rr && rr.setDof) rr.setDof(0.2, camera.position.distanceTo(ball.position));
    // eigene Stangen
    const dir = (Lx.tasten.ArrowUp || Lx.tasten.KeyW ? 1 : 0) - (Lx.tasten.ArrowDown || Lx.tasten.KeyS ? 1 : 0);
    Lx.uIch = THREE.MathUtils.clamp(Lx.uIch + dir * dt * 3.2, -1, 1);
    // Gegner: richtet die nächste Figur vor dem Ball aus (nicht perfekt; „leicht“ = langsamer und ungenauer)
    Lx.fehlerUhr -= dt; if (Lx.fehlerUhr <= 0) { Lx.fehlerUhr = 0.45 + Math.random() * 0.5; Lx.fehler = (Math.random() - 0.5) * (Lx.leicht ? 0.12 : 0.06); }
    const roteVorn = stangen.filter((s) => s.f === 'r' && s.u > b.u - 0.02);
    const ziel = (roteVorn.length ? roteVorn : stangen.filter((s) => s.f === 'r')).reduce((a, s) => (Math.abs(s.u - b.u) < Math.abs(a.u - b.u) ? s : a));
    const best = ziel.figuren.reduce((a, v) => (Math.abs(v + ziel.weg * Lx.uEr - (b.v + Lx.fehler)) < Math.abs(a + ziel.weg * Lx.uEr - (b.v + Lx.fehler)) ? v : a));
    const sollU = THREE.MathUtils.clamp((b.v + Lx.fehler - best) / ziel.weg, -1, 1);
    Lx.uEr += THREE.MathUtils.clamp(sollU - Lx.uEr, -dt * (Lx.leicht ? 2.2 : 3.4), dt * (Lx.leicht ? 2.2 : 3.4));
    for (const st of stangen) {
      st.off = st.weg * (st.f === 'b' ? Lx.uIch : Lx.uEr); st.g.position.z = KZ + st.off;
      st.schwung = Math.max(0, st.schwung - dt);
      const s = st.schwung > 0 ? Math.sin((1 - st.schwung / 0.25) * Math.PI) : 0;
      st.dreh.rotation.z = (st.f === 'b' ? -1 : 1) * s * 1.25;   // Füße schwingen Richtung gegnerisches Tor
    }
    Lx.schuss = Math.max(0, Lx.schuss - dt); Lx.rSchuss = Math.max(0, Lx.rSchuss - dt);
    torLicht.forEach((l) => { l.material.opacity = Math.max(0, l.material.opacity - dt * 1.2); });
    if (Lx.aus > 0) { Lx.aus -= dt; if (Lx.aus <= 0) Lx.ende(); return; }
    if (Lx.pause > 0) { Lx.pause -= dt; b.u += b.vu * dt * 0.5; b.v += b.vv * dt * 0.5; b.vv *= 0.98; zeigeBall(); if (b.v > -0.05 && Lx.pause > 0.05) Lx.pause = 0.05; return; }
    // Ball in kleinen Schritten (schnelle Schüsse sollen nicht durch Figuren rutschen)
    const n = Math.ceil(dt / 0.004), h = dt / n;
    for (let k = 0; k < n; k++) {
      b.u += b.vu * h; b.v += b.vv * h; const reib = 1 - h * 0.45; b.vu *= reib; b.vv *= reib;
      if (b.v < -B / 2 + R) { b.v = -B / 2 + R; b.vv = Math.abs(b.vv) * 0.8; }
      if (b.v > B / 2 - R) { b.v = B / 2 - R; b.vv = -Math.abs(b.vv) * 0.8; }
      for (const s of [-1, 1]) if (s * b.u > L / 2 - R) {
        if (Math.abs(b.v) < TOR / 2 - R * 0.4) { tor(Lx, s); return; }
        b.u = s * (L / 2 - R); b.vu = -s * Math.abs(b.vu) * 0.8; ton('klack');
      }
      for (const st of stangen) {
        if (Math.abs(b.u - st.u) > R + FR + 0.01) continue;
        const vorn = st.f === 'b' ? 1 : -1;
        for (const fv of figurVs(st)) {
          const du = b.u - st.u, dv = b.v - fv, d = Math.hypot(du, dv);
          if (d >= R + FR || du * vorn < -0.012) continue;   // von hinten rollt der Ball unter der Figur durch
          const blauSt = st.f === 'b', kick = blauSt ? Lx.schuss > 0 : (Lx.rSchuss <= 0 && Math.random() < (Lx.leicht ? 0.55 : 0.78));
          if (kick) {
            const v = 2.6 + Math.random() * 1.0, torU = blauSt ? L / 2 : -L / 2, zielV = (Math.random() - 0.5) * (TOR + 0.2) + dv * 2;
            b.vu = vorn * v; b.vv = (zielV - b.v) / Math.max(0.12, Math.abs(torU - b.u)) * v;
            if (blauSt) Lx.schuss = 0; else { Lx.rSchuss = 0.5; for (const s2 of stangen) if (s2.f === 'r') s2.schwung = 0.25; }
            ton('klack'); vib(8);
          } else { const sp = Math.max(0.35, Math.hypot(b.vu, b.vv)) * 0.75; b.vu = du / (d || 1) * sp; b.vv = dv / (d || 1) * sp; }
          b.u = st.u + du / (d || 1) * (R + FR + 0.001); b.v = fv + dv / (d || 1) * (R + FR + 0.001);
        }
      }
    }
    // Langsamer Ball rollt wie auf einem leicht schrägen Tisch zur nächsten Figur – keine toten Zonen
    if (Math.hypot(b.vu, b.vv) < 0.18) {
      let fu = 0, fv = 0, fd = 1e9; for (const st of stangen) for (const v of figurVs(st)) { const d = Math.hypot(st.u - b.u, v - b.v); if (d < fd) { fd = d; fu = st.u; fv = v; } }
      b.vu += (fu - b.u) / (fd || 1) * 0.5 * dt; b.vv += (fv - b.v) / (fd || 1) * 0.5 * dt;
    }
    zeigeBall();
    const rl = Math.hypot(b.vu, b.vv) * dt / R; if (rl > 0) { const ax = new THREE.Vector3(b.vv, 0, b.vu).normalize(); ball.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(ax, rl)); }
  }
  function tor(Lx, seite) {   // seite +1: rechts = rotes Tor → Punkt für dich
    if (seite > 0) Lx.ich++; else Lx.er++;
    torLicht[seite > 0 ? 1 : 0].material.opacity = 1;
    ton(seite > 0 ? 'melodie2' : 'klack'); vib(seite > 0 ? [20, 30, 20] : 30);
    ui.skate({ punkte: Lx.ich, trick: (seite > 0 ? '⚽ TOR! ' : 'Tor für ' + Lx.gegner + '. ') + 'Du ' + Lx.ich + ' : ' + Lx.er + ' ' + Lx.gegner });
    if (Lx.gf && Lx.gf.spiele) Lx.gf.spiele(seite > 0 ? 'Idle' : 'Jubeln', { einmal: true });
    if (Lx.ich >= 5 || Lx.er >= 5) { ui.skate({ trick: (Lx.ich > Lx.er ? '🏆 Gewonnen! ' : 'Knapp! ') + Lx.ich + ' : ' + Lx.er }); b.vu = b.vv = 0; welt(0, -1, 0, ball.position); Lx.aus = 2.4; return; }
    einwurf(Lx, seite > 0 ? -1 : 1);
  }
  return { spiel, tick, aktiv: () => !!lauf, beenden: () => { if (lauf) lauf.ende(); }, root, get ball() { return b; }, get lauf() { return lauf; } };
}
