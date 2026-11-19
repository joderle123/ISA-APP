// Annexe Junglinster – Basketball direkt auf dem Hof (Auftrag 18.11.: „richtiges Wischen, näher an 2K“).
// Man steht wirklich am Korb, die Kamera schaut über die Schulter. Halten = Wurf aufbauen (Balken füllt sich),
// nach oben wischen = Richtung, loslassen im grünen Bereich = perfekter Wurf. Der Ball fliegt mit Schwerkraft, prallt an
// Ring und Brett ab, das Netz schwingt. Modi: Freiwürfe, Dreier (drei Positionen), H-O-R-S-E gegen Ben.
// Kein Zufall bei perfektem Timing und gerader Richtung: grün + gerade = Swish.
import * as THREE from 'three';

const G = 9.81, BALL_R = 0.12, RING_R = 0.23, ROHR = 0.018, RING_Y = 3.05;
// Die beiden Körbe am Hof (welt.js: korb(B, 29, 8.6, 1, 'z') und korb(B, 29, 29.4, -1, 'z'))
// und die beiden in der Turnhalle (welt.js, Brett an Auslegern, quer zur x-Achse).
// n = Richtung vom Brett zum Spielfeld, brett = Punkt auf der Brettfläche.
const KOERBE = [
  ...[{ x: 29, z: 8.6, s: 1 }, { x: 29, z: 29.4, s: -1 }].map((k) => ({ ring: new THREE.Vector3(k.x, RING_Y, k.z + 0.05 * k.s), n: { x: 0, z: k.s }, brett: { x: k.x, z: k.z - 0.25 * k.s } })),
  // Turnhalle (umgebaut 19.11.): Brett 1,6 m vor der Stirnwand (Innenkante 34,175 bzw. 57,825), Vorderseite 5 cm davor, Ring 38 cm vor dem Brett
  ...[{ x: 34.175, s: 1 }, { x: 57.825, s: -1 }].map((k) => ({ ring: new THREE.Vector3(k.x + (1.6 + 0.38) * k.s, RING_Y, -18), n: { x: k.s, z: 0 }, brett: { x: k.x + (1.6 + 0.05) * k.s, z: -18 } })),
];

function ballTextur() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 128); g.addColorStop(0, '#f39a4a'); g.addColorStop(1, '#d9662a'); x.fillStyle = g; x.fillRect(0, 0, 256, 128);
  x.strokeStyle = '#3a1d0c'; x.lineWidth = 4;
  x.beginPath(); x.moveTo(0, 64); x.lineTo(256, 64); x.moveTo(64, 0); x.lineTo(64, 128); x.moveTo(192, 0); x.lineTo(192, 128); x.stroke();
  x.beginPath(); x.ellipse(128, 64, 40, 70, 0, 0, 7); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function createKorbSpiel({ scene, camera, steuerung, input, root, ton = () => {} }) {
  // ---------- Ring und Netz an beiden Körben (bleiben immer in der Welt) ----------
  const ringMat = new THREE.MeshLambertMaterial({ color: '#e0522f' }), netzMat = new THREE.LineBasicMaterial({ color: '#f4f4f4', transparent: true, opacity: 0.9 });
  const netze = KOERBE.map((k) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(RING_R, ROHR, 8, 28), ringMat); ring.rotation.x = Math.PI / 2; ring.position.copy(k.ring); scene.add(ring);
    const halter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.16), ringMat); halter.position.set(k.ring.x - (RING_R + 0.06) * k.n.x, RING_Y, k.ring.z - (RING_R + 0.06) * k.n.z); halter.rotation.y = Math.atan2(k.n.x, k.n.z); scene.add(halter);
    const N = 14, punkte = [];
    const oben = (i) => new THREE.Vector3(Math.cos(i / N * Math.PI * 2) * RING_R, 0, Math.sin(i / N * Math.PI * 2) * RING_R);
    const unten = (i, f = 1) => new THREE.Vector3(Math.cos((i + 0.5) / N * Math.PI * 2) * 0.13 * f, -0.42, Math.sin((i + 0.5) / N * Math.PI * 2) * 0.13 * f);
    for (let i = 0; i < N; i++) { punkte.push(oben(i), unten(i), oben(i + 1), unten(i), unten(i), unten(i + 1)); }
    const geo = new THREE.BufferGeometry().setFromPoints(punkte);
    const netz = new THREE.LineSegments(geo, netzMat); netz.position.copy(k.ring); scene.add(netz);
    return { netz, schwing: 0 };
  });

  // ---------- Ball ----------
  const ball = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 24, 16), new THREE.MeshLambertMaterial({ map: ballTextur() }));
  ball.visible = false; scene.add(ball);

  let lauf = null;   // laufendes Spiel
  const _v = new THREE.Vector3(), _q = new THREE.Vector3();

  // Startgeschwindigkeit, damit der Ball aus P genau durch Z fliegt (Abwurfwinkel theta)
  function abwurf(P, Z, theta, faktor, seitWinkel) {
    const dx = Z.x - P.x, dz = Z.z - P.z, d = Math.hypot(dx, dz), h = Z.y - P.y;
    const v = Math.sqrt(G * d * d / (2 * Math.cos(theta) ** 2 * Math.max(0.05, d * Math.tan(theta) - h))) * faktor;
    const a = Math.atan2(dx, dz) + seitWinkel;
    return new THREE.Vector3(Math.sin(a) * Math.cos(theta) * v, Math.sin(theta) * v, Math.cos(a) * Math.cos(theta) * v);
  }

  // ---------- Physik eines fliegenden Balls ----------
  function schritt(f, dt) {
    const k = lauf.korb, R = k.ring, p = f.p, v = f.v;
    const vorY = p.y;
    v.y -= G * dt; p.addScaledVector(v, dt);
    // Ring: nächster Punkt auf dem Kreis
    const hx = p.x - R.x, hz = p.z - R.z, hd = Math.hypot(hx, hz);
    if (hd > 1e-4) {
      _q.set(R.x + hx / hd * RING_R, R.y, R.z + hz / hd * RING_R);
      _v.subVectors(p, _q); const d = _v.length();
      if (d < BALL_R + ROHR) {
        _v.divideScalar(d); const vn = v.dot(_v);
        if (vn < 0) { v.addScaledVector(_v, -(1 + 0.5) * vn); v.multiplyScalar(0.88); f.ring++; if (f.ring < 6) ton('klack'); }
        p.copy(_q).addScaledVector(_v, BALL_R + ROHR + 0.001);
      }
    }
    // Brett
    const n = k.n, vorne = (p.x - k.brett.x) * n.x + (p.z - k.brett.z) * n.z, quer = (p.x - k.brett.x) * n.z - (p.z - k.brett.z) * n.x, vn = v.x * n.x + v.z * n.z;
    if (vorne < BALL_R && vorne > -0.2 && Math.abs(quer) < 0.9 && p.y > 2.9 && p.y < 3.95 && vn < 0) { v.x -= 1.6 * vn * n.x; v.z -= 1.6 * vn * n.z; p.x += (BALL_R - vorne) * n.x; p.z += (BALL_R - vorne) * n.z; f.brett = true; ton('klack'); }
    // Durch den Ring nach unten?
    if (!f.drin && vorY > R.y && p.y <= R.y && Math.hypot(p.x - R.x, p.z - R.z) < RING_R - BALL_R * 0.35) { f.drin = true; netze[lauf.ki].schwing = 1; ton(f.ring || f.brett ? 'pling' : 'pling'); }
    // Boden
    if (p.y < BALL_R) { p.y = BALL_R; if (v.y < 0) v.y = -v.y * 0.62; v.x *= 0.82; v.z *= 0.82; if (!f.boden) { f.boden = true; ton('klack'); } }
  }

  // ---------- Bedienung (eigene Fläche über dem Bild) ----------
  function hudBauen(titel) {
    const h = document.createElement('div'); h.className = 'ly-wurf';
    h.innerHTML = '<div class="ly-wurf-kopf"><b>' + titel + '</b><span data-w="stand"></span></div>' +
      '<div class="ly-wurf-meter"><i data-w="gruen"></i><b data-w="zeiger"></b></div>' +
      '<div class="ly-wurf-msg" data-w="msg"></div>' +
      '<div class="ly-wurf-tipp" data-w="tipp">Finger halten · nach oben wischen · loslassen, wenn der Balken im <b>Grünen</b> ist<br><small>PC: Leertaste halten · Pfeile = Richtung</small></div>' +
      '<button type="button" class="ly-wurf-weg" data-w="weg">Aufhören</button>';
    root.appendChild(h); root.classList.add('ly-wurfmodus');
    return h;
  }

  function spiel({ modus = 'frei', gegner = 'Ben' } = {}) {
    if (lauf) return Promise.resolve(0);
    return new Promise((ok) => {
      const p0 = steuerung.pos.clone(), yaw0 = steuerung.yaw;
      let ki = 0; KOERBE.forEach((k, i) => { if (Math.hypot(k.ring.x - p0.x, k.ring.z - p0.z) < Math.hypot(KOERBE[ki].ring.x - p0.x, KOERBE[ki].ring.z - p0.z)) ki = i; });
      const korb = KOERBE[ki];
      const HORSE = modus === 'horse', DREIER = modus === 'dreier', MAX = HORSE ? 10 : 5;
      const GRUEN = DREIER ? [0.885, 0.955] : [0.86, 0.98];
      const n = korb.n, dreh = (a, d) => ({ x: korb.ring.x + (n.x * Math.cos(a) - n.z * Math.sin(a)) * d, z: korb.ring.z + (n.z * Math.cos(a) + n.x * Math.sin(a)) * d });
      const spots = DREIER ? [-0.85, 0, 0.85].map((a) => dreh(a, 6.0)) : [dreh(0, 4.2)];
      const hud = hudBauen(HORSE ? 'H-O-R-S-E gegen ' + gegner : DREIER ? 'Dreier' : 'Freiwürfe');
      const $ = (n) => hud.querySelector('[data-w="' + n + '"]');
      const meterGruen = $('gruen'); meterGruen.style.bottom = (GRUEN[0] * 100) + '%'; meterGruen.style.height = ((GRUEN[1] - GRUEN[0]) * 100) + '%';
      input.setEnabled(false); steuerung.frei = false; steuerung.kameraAus = true;
      let wurf = 0, treffer = 0, serie = 0, halten = null, flug = null, zug = 'ich', ichRein = false, bI = 0, bE = 0, warte = 0.6, msgT = 0;
      lauf = { korb, ki };
      const stellen = () => {
        const sp = spots[DREIER ? wurf % spots.length : 0];
        const yaw = Math.atan2(korb.ring.x - sp.x, korb.ring.z - sp.z);
        steuerung.teleport(sp.x, sp.z, yaw); steuerung.kameraAus = true;
        lauf.sp = sp; lauf.yaw = yaw;
        const fx = Math.sin(yaw), fz = Math.cos(yaw);
        // Kamera: hinter und etwas rechts über der Schulter, Blick auf den Korb
        const hochkant = window.innerHeight > window.innerWidth, weit = DREIER ? 3.6 : 3.3, seit = hochkant ? 0.35 : 0.9, blick = hochkant ? 0.8 : 0.62;
        camera.position.set(sp.x - fx * weit + fz * seit, 2.7, sp.z - fz * weit - fx * seit);
        camera.lookAt(korb.ring.x * blick + sp.x * (1 - blick), 2.45, korb.ring.z * blick + sp.z * (1 - blick));
        ball.visible = true; ball.position.set(sp.x + fx * 0.32 - fz * 0.18, 1.05, sp.z + fz * 0.32 + fx * 0.18);
      };
      const WORT = 'HORSE';
      const zeigStand = () => { $('stand').textContent = HORSE ? 'Du: ' + (WORT.slice(0, bI) || '–') + ' · ' + gegner + ': ' + (WORT.slice(0, bE) || '–') : 'Wurf ' + Math.min(MAX, wurf + 1) + ' / ' + MAX + ' · Treffer ' + treffer + (serie >= 2 ? ' · 🔥 ' + serie : ''); };
      const msg = (t, farbe = '#fff') => { const m = $('msg'); m.textContent = t; m.style.color = farbe; m.classList.remove('neu'); void m.offsetWidth; m.classList.add('neu'); msgT = 1.8; };
      const meterWert = (now) => { if (!halten) return 0; const u = (now - halten.t0) / 900; return u <= 1 ? u : Math.max(0, 1 - (u - 1) * 2.4); };
      const start = (x, y) => { if (flug || halten || zug !== 'ich' || warte > 0 || wurf >= MAX) return; halten = { t0: performance.now(), x0: x, y0: y, x, y, steigt: true }; $('tipp').style.opacity = '0.35'; };
      const los = () => {
        if (!halten) return;
        const now = performance.now(), u = (now - halten.t0) / 900, m = meterWert(now);
        const dx = halten.x - halten.x0, breite = Math.max(320, window.innerWidth);
        const richtung = Math.abs(dx) < breite * 0.035 ? 0 : Math.max(-1, Math.min(1, dx / (breite * 0.28)));
        halten = null;
        const gruen = u <= 1 && m >= GRUEN[0] && m <= GRUEN[1];
        const fehlerZeit = gruen ? 0 : u > 1 ? Math.min(0.3, 0.06 + (u - 1) * 0.5) : -Math.min(0.3, (GRUEN[0] - m) * 0.55 + 0.02);
        const faktor = 1 + fehlerZeit * (DREIER ? 0.32 : 0.3), seit = richtung * 0.1;
        werfen(faktor, seit, 'ich');
        msg(gruen && !richtung ? 'Perfekter Release 💚' : gruen ? 'Grün – aber schief' : fehlerZeit < 0 ? 'Etwas früh' : 'Etwas spät', gruen ? '#7CFC9A' : '#ffd166');
        wurf++;
      };
      const werfen = (faktor, seit, wer) => {
        const sp = lauf.sp, fx = Math.sin(lauf.yaw), fz = Math.cos(lauf.yaw);
        const P = new THREE.Vector3(sp.x + fx * 0.28, 2.25, sp.z + fz * 0.28);
        const ziel = korb.ring.clone(); ziel.y += 0.02;
        flug = { wer, p: P, v: abwurf(P, ziel, DREIER ? 0.9 : 0.93, faktor, seit), t: 0, ring: 0, brett: false, drin: false, boden: false };
        ball.position.copy(P);
        if (wer === 'ich' && steuerung.figur && steuerung.figur.spiele) steuerung.figur.spiele('Idle');
      };
      const gegnerWirft = () => {
        const r = Math.random(), f = r < 0.38 ? 1 : r < 0.6 ? 1 + (Math.random() - 0.5) * 0.02 : 1 + (Math.random() < 0.5 ? -1 : 1) * (0.025 + Math.random() * 0.05);
        werfen(f, (Math.random() - 0.5) * (r < 0.6 ? 0.01 : 0.08), 'gegner'); msg(gegner + ' wirft …', '#fff');
      };
      const ende = () => {
        if (!lauf) return;
        lauf = null; ball.visible = false; hud.remove(); root.classList.remove('ly-wurfmodus');
        document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true);
        steuerung.kameraAus = false; steuerung.teleport(p0.x, p0.z, yaw0); input.setEnabled(true); steuerung.frei = true;
        if (HORSE) korbSpiel.letzteRunde = { sieg: bE > bI, ich: bI, er: bE };
        ok(treffer);
      };
      // Tasten: Leertaste/E halten, Pfeile links/rechts = Richtung
      const runter = (e) => {
        if (['Space', 'KeyE', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) start(0, 0); }
        else if (halten && (e.code === 'ArrowLeft' || e.code === 'ArrowRight')) { e.preventDefault(); e.stopPropagation(); halten.x += (e.code === 'ArrowLeft' ? -1 : 1) * window.innerWidth * 0.08; }
        else if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); ende(); }
        else e.stopPropagation();
      };
      const hoch = (e) => { if (['Space', 'KeyE', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); los(); } };
      document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
      hud.addEventListener('pointerdown', (e) => { if (e.target.closest('[data-w="weg"]')) return; e.preventDefault(); hud.setPointerCapture(e.pointerId); start(e.clientX, e.clientY); });
      hud.addEventListener('pointermove', (e) => { if (halten) { halten.x = e.clientX; halten.y = e.clientY; } });
      hud.addEventListener('pointerup', (e) => { if (e.target.closest('[data-w="weg"]')) return; los(); });
      hud.addEventListener('pointercancel', () => { halten = null; });
      $('weg').onclick = () => ende();
      stellen(); zeigStand();

      let letzt = performance.now();
      lauf.tick = () => {
        const now = performance.now(), dt = Math.min(0.25, (now - letzt) / 1000); letzt = now;   // echte Zeit: auch auf langsamen Geräten gleich schnell
        // Kamera festhalten (die normale Steuerung ist aus)
        // Balken
        const m = meterWert(now);
        $('zeiger').style.bottom = (m * 100) + '%';
        $('zeiger').style.background = m >= GRUEN[0] && m <= GRUEN[1] && halten && (now - halten.t0) / 900 <= 1 ? '#7CFC9A' : '#fff';
        if (halten && now - halten.t0 > 2200) los();   // nicht ewig halten
        if (halten) { const sp = lauf.sp, fx = Math.sin(lauf.yaw), fz = Math.cos(lauf.yaw), hoch2 = Math.min(1, (now - halten.t0) / 500); ball.position.set(sp.x + fx * 0.3, 1.05 + hoch2 * 1.0, sp.z + fz * 0.3); }
        if (msgT > 0) { msgT -= dt; if (msgT <= 0) $('msg').textContent = ''; }
        for (const n of netze) if (n.schwing > 0) { n.schwing = Math.max(0, n.schwing - dt * 1.4); n.netz.scale.y = 1 + Math.sin(n.schwing * 18) * 0.18 * n.schwing; n.netz.rotation.y = Math.sin(n.schwing * 11) * 0.15 * n.schwing; }
        if (warte > 0) { warte -= dt; if (warte <= 0 && zug === 'gegner') gegnerWirft(); return; }
        if (!flug) return;
        const f = flug; const n = Math.max(6, Math.ceil(dt / 0.004));
        for (let i = 0; i < n; i++) schritt(f, dt / n);
        f.t += dt;
        ball.position.copy(f.p); ball.rotation.x -= dt * 9;
        const ruhig = f.boden && f.v.length() < 1.2;
        if (f.boden && !f.bodenT) f.bodenT = f.t;
        if (f.t > 2.8 || ruhig || (f.drin && f.t > 1.3) || (f.bodenT && f.t - f.bodenT > 0.5)) {
          flug = null;
          const rein = f.drin;
          if (f.wer === 'ich') {
            if (rein) { treffer++; serie++; } else serie = 0;
            ichRein = rein;
            msg(rein ? (f.ring || f.brett ? (f.brett ? 'Drin! Übers Brett' : 'Drin! Über den Ring') : 'SWISH 💚') : f.ring ? 'Ring … raus' : 'Daneben', rein ? (f.ring || f.brett ? '#f2b134' : '#7CFC9A') : '#ffffff');
            if (HORSE) { zug = 'gegner'; warte = 0.9; }
            else { warte = 0.45; if (wurf >= MAX) { zeigStand(); setTimeout(ende, 1400); return; } }
          } else {
            msg(gegner + ': ' + (rein ? 'drin.' : 'daneben.'), '#fff');
            if (ichRein && !rein) bE++; else if (!ichRein && rein) bI++;
            zug = 'ich'; warte = 0.6;
            if (bI >= 5 || bE >= 5 || wurf >= MAX) { zeigStand(); msg(bE > bI ? 'Gewonnen! 🏆' : bI > bE ? gegner + ' gewinnt.' : 'Unentschieden.', '#f2b134'); setTimeout(ende, 1800); warte = 99; return; }
          }
          zeigStand(); stellen();
        }
      };
    });
  }

  const korbSpiel = {
    spiel, letzteRunde: null,
    tick: (dt) => { if (lauf && lauf.tick) lauf.tick(dt); else for (const n of netze) if (n.schwing > 0) n.schwing = 0; },
    aktiv: () => !!lauf,
  };
  return korbSpiel;
}
