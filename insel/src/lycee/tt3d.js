// Tischtennis in 3D an der echten Platte auf dem Hof (Auftrag 19.11.: „detaillierter, schwieriger“).
// Echte Ballphysik (Schwerkraft, Aufsprung, Netz, Topspin), Schatten des Balls auf der Platte (zum Einschätzen),
// eigener Schläger in der Hand (Arm-IK), Gegner mit Reaktionszeit und Laufweg. Gezählt wird wie echt: bis 11,
// zwei Punkte Abstand, Aufschlag wechselt alle 2 Punkte.
// Steuerung: A/D (oder ←/→) laufen · E/Leertaste schlagen · beim Schlagen Richtung halten = zielen ·
// lang drücken und loslassen = Schmetterball (nur bei hohem Ball sicher). Touch: links ziehen = laufen, rechts tippen = schlagen
// (Tipp-Stelle links/Mitte/rechts = Richtung), lang tippen = Schmettern.
import * as THREE from 'three';

const G = 9.81, BR = 0.02, TH = 0.76, HL = 1.37, HB = 0.7625, NETZ = TH + 0.1525;
const LP = -HL - 0.42, LO = HL + 0.42;   // Standlinie du / Gegner (lokal: l zur Gegnerseite)

export function createTischtennis({ scene, camera, steuerung, root, audio, rr, holeGegner, vib }) {
  const h = audio.helpers;
  if (h) {
    audio.register('tt_tisch', (ctx, bus) => { const t = ctx.currentTime; h.tone('sine', 1150 + Math.random() * 120, t, 0.001, 0.05, 0.05, bus); h.burst(t, 0.015, 'highpass', 3000, 1, 0.05, bus); });
    audio.register('tt_schlag', (ctx, bus) => { const t = ctx.currentTime; h.tone('sine', 640 + Math.random() * 80, t, 0.001, 0.06, 0.06, bus); h.burst(t, 0.02, 'bandpass', 1900, 1.2, 0.08, bus); });
    audio.register('tt_schmetter', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.03, 'bandpass', 1400, 1, 0.16, bus); h.tone('sine', 420, t, 0.001, 0.08, 0.08, bus); });
    audio.register('tt_netz', (ctx, bus) => { const t = ctx.currentTime; h.burst(t, 0.08, 'lowpass', 500, 1, 0.08, bus); });
    audio.register('tt_boden', (ctx, bus) => { const t = ctx.currentTime; h.tone('sine', 900, t, 0.001, 0.03, 0.04, bus); h.tone('sine', 900, t + 0.18, 0.001, 0.02, 0.04, bus); });
  }
  // ---------- Dinge in der Welt: Ball, Schatten, Spur, zwei Schläger ----------
  const ball = new THREE.Mesh(new THREE.SphereGeometry(BR * 1.3, 16, 12), new THREE.MeshLambertMaterial({ color: '#fff4dc', emissive: '#3a3020' }));
  const schatten = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.35, depthWrite: false }));
  schatten.rotation.x = -Math.PI / 2;
  const SPUR = 10, spurPos = new Float32Array(SPUR * 3);
  const spurGeo = new THREE.BufferGeometry(); spurGeo.setAttribute('position', new THREE.BufferAttribute(spurPos, 3));
  const spur = new THREE.Line(spurGeo, new THREE.LineBasicMaterial({ color: '#fff4dc', transparent: true, opacity: 0.35 }));
  spur.frustumCulled = false;
  const schlaeger = (farbe) => {
    const g = new THREE.Group();
    const blatt = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.078, 0.012, 22), new THREE.MeshLambertMaterial({ color: farbe }));
    blatt.rotation.x = Math.PI / 2; g.add(blatt);
    const griff = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.1, 0.024), new THREE.MeshLambertMaterial({ color: '#c79a5b' }));
    griff.position.y = -0.11; g.add(griff);
    return g;
  };
  const meinS = schlaeger('#c0392b'), seinS = schlaeger('#1b1b22');
  const teile = [ball, schatten, spur, meinS, seinS];

  let lauf = null;
  function spiel({ tisch, gegnerId = '', gegnerName = 'Gegner', staerke = 1, leicht = false }) {
    if (lauf) return Promise.resolve(null);
    return new Promise(async (fertig) => {
      // Rahmen: Mitte der Platte, Längsachse z. Du stehst am Ende, das näher an dir ist.
      const C = new THREE.Vector3(tisch.x, 0, tisch.z);
      const vonPlus = steuerung.pos.z > tisch.z;
      const F = new THREE.Vector3(0, 0, vonPlus ? -1 : 1);                    // zur Gegnerseite
      const R = new THREE.Vector3(vonPlus ? 1 : -1, 0, 0);                   // deine rechte Seite
      const welt = (s, y, l, out = new THREE.Vector3()) => out.copy(C).addScaledVector(R, s).addScaledVector(F, l).setY(y);
      const yawIch = Math.atan2(F.x, F.z), yawEr = Math.atan2(-F.x, -F.z);
      const p0 = steuerung.pos.clone(), yaw0 = steuerung.yaw;
      // Figuren
      const gegner = await holeGegner(gegnerId);
      if (gegner) { scene.add(gegner.group); gegner.spiele('Idle'); }
      teile.forEach((t) => scene.add(t));
      steuerung.frei = false; steuerung.kameraAus = true;
      const ich = { s: 0, v: 0, schwung: -1, smash: false, ziel: 0 }, er = { s: 0, v: 0, schwung: -1, reagiert: 0, zielS: 0, getroffen: false };
      // Ball (lokal: x = s, y = Höhe, z = l)
      const b = { p: new THREE.Vector3(), v: new THREE.Vector3(), spin: 0, aktiv: false, letzter: '', aufIch: 0, aufEr: 0, aufschlag: false, halten: 'ich' };
      let ichP = 0, erP = 0, aufschlaeger = 'ich', zustand = 'aufschlag', pauseT = 0, ballwechsel = 0, laengster = 0, nachricht = '', msgT = 0, ruck = 0, stopp = 0;
      const level = () => Math.min(3, staerke + ballwechsel * 0.05 + Math.max(0, ichP - erP) * 0.12);
      // ---------- Anzeige ----------
      const hud = document.createElement('div'); hud.className = 'ly-tt hud-interactive';
      hud.innerHTML = '<div class="ly-tt-tafel"><span data-t="ich">0</span><b>Du</b><i>:</i><b data-t="name"></b><span data-t="er">0</span></div>' +
        '<div class="ly-tt-auf" data-t="auf"></div><div class="ly-tt-msg" data-t="msg"></div>' +
        '<div class="ly-tt-tipp"><span class="pc"><kbd>A</kbd><kbd>D</kbd> laufen · <kbd>E</kbd> schlagen · Richtung halten = zielen · <kbd>E</kbd> lang = Schmettern</span><span class="touch">Links ziehen = laufen · rechts tippen = schlagen (links/Mitte/rechts = Richtung) · lang tippen = Schmettern</span></div>' +
        '<button type="button" class="ly-tt-weg" data-t="weg">Aufhören</button>';
      root.appendChild(hud); root.classList.add('ly-ttmodus');
      const $ = (n) => hud.querySelector('[data-t="' + n + '"]');
      $('name').textContent = gegnerName;
      const tafel = () => { $('ich').textContent = ichP; $('er').textContent = erP; $('auf').textContent = (aufschlaeger === 'ich' ? 'Dein Aufschlag' : gegnerName + ' schlägt auf') + (ballwechsel > 2 ? ' · Ballwechsel ' + ballwechsel : ''); };
      const msg = (t, farbe = '#fff', sek = 1.4) => { const m = $('msg'); m.textContent = t; m.style.color = farbe; m.classList.remove('neu'); void m.offsetWidth; m.classList.add('neu'); msgT = sek; nachricht = t; };
      // ---------- Eingabe ----------
      const tasten = new Set(); let drueckT = 0, zielTouch = null, zieh = null;
      const links = () => tasten.has('KeyA') || tasten.has('ArrowLeft'), rechts = () => tasten.has('KeyD') || tasten.has('ArrowRight');
      const druck = () => { if (!drueckT) drueckT = performance.now(); };
      const loslassen = () => {
        if (!drueckT) return; const lang = performance.now() - drueckT > 320; drueckT = 0;
        if (zustand === 'aufschlag' && aufschlaeger === 'ich') { aufschlagIch(); return; }
        if (ich.schwung < 0) { ich.schwung = 0; ich.getroffen = false; ich.smash = lang; ich.ziel = zielTouch !== null ? zielTouch : (links() ? -1 : rechts() ? 1 : 0); zielTouch = null; }
      };
      const runter = (e) => {
        if (['KeyE', 'Space', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) druck(); return; }
        if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); ende(); return; }
        tasten.add(e.code); e.stopPropagation();
      };
      const hoch = (e) => { if (['KeyE', 'Space', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); loslassen(); return; } tasten.delete(e.code); };
      document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
      hud.addEventListener('pointerdown', (e) => {
        if (e.target.closest('[data-t="weg"]')) return; e.preventDefault();
        const w = window.innerWidth;
        if (e.clientX < w * 0.45) { zieh = { id: e.pointerId, x0: e.clientX, s0: ich.s }; hud.setPointerCapture(e.pointerId); }
        else { const u = (e.clientX - w * 0.45) / (w * 0.55); zielTouch = u < 0.33 ? -1 : u > 0.66 ? 1 : 0; druck(); hud.setPointerCapture(e.pointerId); }
      });
      hud.addEventListener('pointermove', (e) => { if (zieh && e.pointerId === zieh.id) ich.zielS = Math.max(-1.25, Math.min(1.25, zieh.s0 + (e.clientX - zieh.x0) / (window.innerWidth * 0.18))); });
      const auf = (e) => { if (zieh && e.pointerId === zieh.id) { zieh = null; ich.zielS = null; return; } if (!e.target.closest('[data-t="weg"]')) loslassen(); };
      hud.addEventListener('pointerup', auf); hud.addEventListener('pointercancel', () => { zieh = null; drueckT = 0; });
      $('weg').onclick = () => ende();

      // ---------- Schlag planen: Geschwindigkeit, damit der Ball bei (sZ, lZ) landet; prüft das Netz ----------
      const plane = (p, sZ, lZ, T, extraG = 0) => {
        const g = G + extraG, v = new THREE.Vector3((sZ - p.x) / T, 0, (lZ - p.z) / T);
        v.y = (TH + BR - p.y + 0.5 * g * T * T) / T;
        // Höhe über dem Netz (l = 0)
        const tn = v.z !== 0 ? (0 - p.z) / v.z : -1;
        const yn = tn > 0 && tn < T ? p.y + v.y * tn - 0.5 * g * tn * tn : 9;
        return { v, netzFrei: yn - NETZ };
      };
      const schlagVon = (wer, p, sZ, lZ, tempo, extraG) => {
        // kürzeste Flugzeit, die noch übers Netz geht (je höher der Ball, desto schneller darf er sein)
        let best = null;
        for (let T = tempo; T < 1.2; T += 0.03) { const r = plane(p, sZ, lZ, T, extraG); if (r.netzFrei > 0.03) { best = r; break; } if (!best || r.netzFrei > best.netzFrei) best = r; }
        b.v.copy(best.v); b.spin = extraG; b.letzter = wer; b.aufIch = 0; b.aufEr = 0; b.aufschlag = false;
      };
      const aufschlagIch = () => {
        zustand = 'spiel'; b.aktiv = true; b.halten = '';
        b.p.set(ich.s + 0.25, TH + 0.32, LP + 0.42);
        // Aufschlag: erst auf die eigene Seite, dann rüber (wie echt)
        const zs = (links() ? -0.45 : rechts() ? 0.45 : 0) * 0.8;
        b.v.set((zs - b.p.x) * 0.35, -1.0, 3.6 + Math.random() * 0.25); b.spin = 0; b.letzter = 'ich'; b.aufschlag = true; b.aufIch = 0; b.aufEr = 0;
        ich.schwung = 0.05; ich.smash = false; audio.play('tt_schlag');
      };
      const aufschlagEr = () => {
        zustand = 'spiel'; b.aktiv = true; b.halten = '';
        b.p.set(er.s - 0.25, TH + 0.32, LO - 0.42);
        b.v.set((Math.random() - 0.5) * 0.9, -1.0, -(3.5 + Math.random() * 0.3 + level() * 0.12)); b.spin = level() > 1.6 ? 2 : 0; b.letzter = 'er'; b.aufschlag = true; b.aufIch = 0; b.aufEr = 0;
        er.schwung = 0.05; audio.play('tt_schlag');
      };
      const punkt = (fuerMich, grund) => {
        if (zustand !== 'spiel') return;
        zustand = 'punkt'; pauseT = 1.5; b.aktiv = false;
        if (fuerMich) ichP++; else erP++;
        laengster = Math.max(laengster, ballwechsel);
        msg(grund + (fuerMich ? ' – Punkt für dich' : ' – Punkt für ' + gegnerName), fuerMich ? '#7CFC9A' : '#ffd166', 1.5);
        ballwechsel = 0;
        if ((ichP + erP) % 2 === 0 || (ichP >= 10 && erP >= 10)) aufschlaeger = aufschlaeger === 'ich' ? 'er' : 'ich';
        tafel();
        if ((ichP >= 11 || erP >= 11) && Math.abs(ichP - erP) >= 2) { zustand = 'ende'; setTimeout(() => { msg(ichP > erP ? 'Gewonnen! 🏓 ' + ichP + ':' + erP : gegnerName + ' gewinnt ' + erP + ':' + ichP, '#f2b134', 2.5); }, 900); setTimeout(ende, 3400); }
      };
      // ---------- Ein Physik-Schritt ----------
      const _w = new THREE.Vector3();
      const schritt = (dt) => {
        const p = b.p, v = b.v;
        const vorZ = p.z, vorY = p.y;
        v.y -= (G + b.spin) * dt; v.multiplyScalar(1 - 0.06 * dt);
        p.addScaledVector(v, dt);
        // Netz
        if ((vorZ < 0) !== (p.z < 0) && p.y < NETZ + BR && Math.abs(p.x) < HB + 0.15) {
          if (p.y > NETZ - 0.02 && Math.abs(v.z) < 4.5) { v.y = Math.abs(v.y) * 0.3 + 0.4; v.z *= 0.35; audio.play('tt_netz'); }   // Netzkante: tropft rüber
          else { v.z *= -0.15; v.x *= 0.3; p.z = vorZ; audio.play('tt_netz'); if (!b.netz) { b.netz = true; setTimeout(() => punkt(b.letzter !== 'ich', 'Netz'), 450); } return; }
        }
        // Platte
        if (vorY >= TH + BR && p.y < TH + BR && Math.abs(p.x) <= HB && Math.abs(p.z) <= HL && v.y < 0) {
          p.y = TH + BR; v.y = -v.y * 0.86; v.x *= 0.97; v.z *= 0.97 + (b.spin > 0 ? 0.05 : 0); b.spin *= 0.4;
          audio.play('tt_tisch'); ruck = steuerung.wenigBewegung ? 0 : Math.max(ruck, 0.15);
          const seite = p.z < 0 ? 'ich' : 'er';
          if (seite === 'ich') b.aufIch++; else b.aufEr++;
          if (b.aufschlag) {   // Aufschlag: erste Berührung auf der eigenen Seite, dann auf der anderen
            if (seite === b.letzter) { if ((seite === 'ich' ? b.aufIch : b.aufEr) > 1) punkt(seite !== 'ich', 'Zweimal aufgesprungen'); }
            else b.aufschlag = false;
          } else if (seite === b.letzter) punkt(seite !== 'ich', 'Eigene Seite');
          if (b.aufIch >= 2 && b.letzter === 'er' && !b.aufschlag && seite === 'ich') punkt(false, 'Nicht erreicht');
          if (b.aufEr >= 2 && b.letzter === 'ich' && !b.aufschlag && seite === 'er') punkt(true, gegnerName + ' kommt nicht hin');
        }
        // Boden / weit weg
        if (p.y < BR) {
          p.y = BR; v.y = -v.y * 0.5; v.multiplyScalar(0.7); audio.play('tt_boden');
          if (zustand === 'spiel') {
            const getroffen = b.letzter === 'ich' ? b.aufEr > 0 : b.aufIch > 0;
            if (b.letzter === 'ich') punkt(getroffen, getroffen ? gegnerName + ' verpasst' : (b.aufschlag ? 'Aufschlag daneben' : 'Aus'));
            else punkt(!getroffen, getroffen ? 'Verpasst' : (b.aufschlag ? 'Aufschlag daneben' : 'Aus'));
          }
        }
      };
      // ---------- Treffer prüfen: Schlägerweg gegen Ballweg ----------
      const schlaegerLokal = (wer, u, out) => {
        // u: 0 (hinten) .. 1 (vorn) – Bogen von hinten-außen nach vorn-innen, Vorhand (rechts) oder Rückhand (links)
        const P = wer === 'ich' ? ich : er, dirL = wer === 'ich' ? 1 : -1;
        const vorhand = wer === 'ich' ? (b.p.x >= P.s - 0.05) : (b.p.x <= P.s + 0.05);
        const seite = (vorhand ? 1 : -1) * dirL;
        const basisL = wer === 'ich' ? LP : LO;
        out.set(P.s + seite * (0.42 - u * 0.2), TH + 0.18 + Math.sin(u * Math.PI) * 0.08 + (P.smash ? 0.25 * (1 - u) : 0), basisL + dirL * (0.12 + u * 0.55));
        return out;
      };
      const _sl = new THREE.Vector3();
      const trifft = (wer) => {
        const P = wer === 'ich' ? ich : er;
        if (P.schwung < 0.25 || P.schwung > 0.85 || P.getroffen) return false;
        schlaegerLokal(wer, P.schwung, _sl);
        const d = Math.hypot(b.p.x - _sl.x, (b.p.y - _sl.y) * 0.8, b.p.z - _sl.z);
        return d < (wer === 'ich' ? (leicht ? 0.3 : 0.22) : 0.25);
      };
      const zurueckSchlagen = (wer) => {
        const P = wer === 'ich' ? ich : er; P.getroffen = true;
        // Qualität: Mitte des Schwungs (u ≈ 0.55) ist perfekt; früh/spät lenkt seitlich ab
        const fehl = P.schwung - 0.55, gut = Math.abs(fehl) < 0.08 ? 2 : Math.abs(fehl) < 0.17 ? 1 : 0;
        ballwechsel++; tafel();
        if (wer === 'ich') {
          const smash = ich.smash, hoch = b.p.y > TH + 0.3;
          const streu = gut === 2 ? 0.08 : gut === 1 ? 0.22 : 0.42;
          let sZ = ich.ziel * 0.55 + fehl * 1.4 + (Math.random() - 0.5) * streu;
          let lZ = HL * (smash ? 0.55 : 0.68) + (Math.random() - 0.5) * streu * 1.2;
          if (smash && !hoch) lZ += 0.25;   // Schmettern aus tiefem Ball: geht eher ins Aus/Netz
          schlagVon('ich', b.p, sZ, lZ, smash ? (hoch ? 0.24 : 0.2) : 0.48 - gut * 0.03, smash ? 0 : 2.5);
          audio.play(smash ? 'tt_schmetter' : 'tt_schlag'); ruck = smash ? 1 : 0.4; stopp = smash ? 0.07 : 0.035; vib && vib(smash ? 22 : 10);
          if (gut === 2) msg(smash ? 'SCHMETTERBALL!' : 'Perfekt getroffen', '#7CFC9A', 0.8); else if (gut === 0) msg(fehl < 0 ? 'Zu früh' : 'Zu spät', '#ffd166', 0.8);
        } else {
          const L = level();
          // Gegner: Fehler werden wahrscheinlicher bei schnellen Bällen und weiten Wegen
          const tempoIn = Math.hypot(b.v.x, b.v.z), weit = Math.abs(b.p.x - er.s);
          const fehlerP = 0.05 + Math.max(0, tempoIn - 5) * 0.06 + weit * 0.12 - L * 0.025;
          let sZ = (Math.random() - 0.5) * (0.9 + L * 0.25), lZ = -HL * (0.45 + Math.random() * 0.4);
          if (Math.random() < fehlerP) { if (Math.random() < 0.5) lZ = -HL - 0.25 - Math.random() * 0.4; else sZ = (Math.random() < 0.5 ? -1 : 1) * (HB + 0.2); }
          schlagVon('er', b.p, sZ, lZ, 0.62 - L * 0.07, L > 1.4 && Math.random() < 0.4 ? 3.5 : 1.5);
          audio.play('tt_schlag');
        }
      };
      // ---------- Kamera hinter dir, Ende ----------
      const _c = new THREE.Vector3(), _z = new THREE.Vector3();
      const kamera = (dt) => {
        welt(ich.s * 0.5 - 0.3, 2.45, LP - 1.35, _c);   // hoch und leicht links: die eigene Figur verdeckt die Platte nicht
        if (steuerung.wenigBewegung) ruck = 0;
        if (ruck > 0) { _c.x += (Math.random() - 0.5) * ruck * 0.025; _c.y += (Math.random() - 0.5) * ruck * 0.025; ruck = Math.max(0, ruck - dt * 5); }
        camera.position.lerp(_c, Math.min(1, dt * 6));
        welt(ich.s * 0.2, TH - 0.1, 0.45, _z); camera.lookAt(_z);
        rr.setDof(0.25, camera.position.distanceTo(_z) + 0.6);
      };
      const ende = () => {
        if (!lauf) return;
        lauf = null;
        document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true);
        hud.remove(); root.classList.remove('ly-ttmodus');
        teile.forEach((t) => scene.remove(t));
        if (gegner) { scene.remove(gegner.group); gegner.hand.R.w = 0; }
        if (steuerung.figur) { steuerung.figur.hand.R.w = 0; steuerung.figur.lehnen(0); }
        steuerung.kameraAus = false; steuerung.frei = true; steuerung.teleport(p0.x, p0.z, yaw0); rr.setDof(0);
        laengster = Math.max(laengster, ballwechsel);
        fertig({ ich: ichP, er: erP, sieg: ichP > erP && (ichP >= 11), laengster });
      };
      tafel(); msg('Dein Aufschlag: E drücken', '#fff', 2.2);
      // ---------- Jedes Bild ----------
      const _hand = new THREE.Vector3(), _q = new THREE.Quaternion();
      lauf = {
        tick: (dt) => {
          if (leicht) dt *= 0.78;   // „Minispiele leichter“: alles etwas langsamer
          if (stopp > 0) { stopp -= dt; kamera(dt); return; }   // winzige Pause beim Treffer
          // du: laufen (Tasten oder Ziehen), mit Schwung (kein Teleport)
          const will = ich.zielS != null && zieh ? (ich.zielS - ich.s) * 6 : (links() ? -1 : rechts() ? 1 : 0) * 2.7;
          ich.v += (Math.max(-2.7, Math.min(2.7, will)) - ich.v) * Math.min(1, dt * 10);
          ich.s = Math.max(-1.3, Math.min(1.3, ich.s + ich.v * dt));
          const pw = welt(ich.s, 0, LP, _w); steuerung.pos.x = pw.x; steuerung.pos.z = pw.z; steuerung.yaw = yawIch;
          // Gegner: erst reagieren, dann zum vorhergesagten Treffpunkt laufen
          if (b.aktiv && b.letzter === 'ich' && b.v.z > 0) {
            er.reagiert += dt;
            if (er.reagiert > 0.22 - level() * 0.03) { const tz = (LO - 0.35 - b.p.z) / Math.max(0.5, b.v.z); er.zielS = Math.max(-1.3, Math.min(1.3, b.p.x + b.v.x * tz + 0.3)); }   // Ball auf die Vorhand, nicht auf den Bauch
          } else { er.reagiert = 0; if (zustand !== 'spiel' || b.letzter === 'er') er.zielS = er.zielS * (1 - dt); }
          const vmax = 1.9 + level() * 0.35;
          er.v += (Math.max(-vmax, Math.min(vmax, (er.zielS - er.s) * 5)) - er.v) * Math.min(1, dt * 8);
          er.s = Math.max(-1.3, Math.min(1.3, er.s + er.v * dt));
          if (gegner) { const ge = welt(er.s, 0, LO, _w); gegner.group.position.set(ge.x, 0, ge.z); gegner.group.rotation.y = yawEr; gegner.update(dt); }
          // Zustände
          if (zustand === 'punkt') { pauseT -= dt; if (pauseT <= 0) { zustand = 'aufschlag'; b.netz = false; b.halten = aufschlaeger; if (aufschlaeger === 'ich') msg('Dein Aufschlag', '#fff', 1); } }
          if (zustand === 'aufschlag') {
            b.aktiv = false;
            if (aufschlaeger === 'ich') b.p.set(ich.s + 0.22, TH + 0.25 + Math.sin(performance.now() / 300) * 0.04, LP + 0.4);
            else { b.p.set(er.s - 0.22, TH + 0.25, LO - 0.4); pauseT -= dt; if (pauseT < -1.1) { pauseT = 0; aufschlagEr(); } }
          }
          // Schwung des Gegners: startet, wenn der Ball in Reichweite kommt
          if (b.aktiv && b.letzter === 'ich' && b.aufEr >= 1 && er.schwung < 0 && b.p.z > LO - 0.85 && Math.abs(b.p.x - er.s) < 0.75) { er.schwung = 0; er.getroffen = false; }
          // Physik in kleinen Schritten, Treffer gegen den Schlägerweg prüfen
          const n = Math.max(4, Math.ceil(dt / 0.004));
          for (let i = 0; i < n; i++) {
            const d2 = dt / n;
            if (ich.schwung >= 0) ich.schwung += d2 / 0.2;
            if (er.schwung >= 0) er.schwung += d2 / 0.22;
            if (b.aktiv) {
              schritt(d2);
              if (zustand === 'spiel' && b.letzter === 'er' && !b.aufschlag && b.aufIch === 1 && trifft('ich')) zurueckSchlagen('ich');
              if (zustand === 'spiel' && b.letzter === 'ich' && !b.aufschlag && b.aufEr === 1 && trifft('er')) zurueckSchlagen('er');
            }
          }
          if (ich.schwung > 1.25) { ich.schwung = -1; ich.getroffen = false; }
          if (er.schwung > 1.25) { er.schwung = -1; er.getroffen = false; }
          // Gegner verpasst, wenn er nicht hinkommt: Ball fliegt an ihm vorbei (zählt beim Boden)
          // Darstellung: Ball, Schatten, Spur
          welt(b.p.x, b.p.y, b.p.z, ball.position);
          const ueber = Math.abs(b.p.x) <= HB && Math.abs(b.p.z) <= HL;
          schatten.visible = true; welt(b.p.x, ueber ? TH + 0.003 : 0.01, b.p.z, schatten.position);
          const hoehe = Math.max(0, b.p.y - (ueber ? TH : 0)); schatten.scale.setScalar(1 + hoehe * 1.2); schatten.material.opacity = Math.max(0.08, 0.38 - hoehe * 0.35);
          spurPos.copyWithin(3, 0, (SPUR - 1) * 3); spurPos[0] = ball.position.x; spurPos[1] = ball.position.y; spurPos[2] = ball.position.z; spurGeo.attributes.position.needsUpdate = true;
          spur.visible = b.aktiv && Math.hypot(b.v.x, b.v.z) > 4;
          // Schläger in der Hand (Arm folgt per IK)
          for (const [wer, S, fig] of [['ich', meinS, steuerung.figur], ['er', seinS, gegner]]) {
            const P = wer === 'ich' ? ich : er;
            const u = P.schwung >= 0 ? Math.min(1, P.schwung) : (b.aktiv ? 0.1 : 0.3);
            schlaegerLokal(wer, u, _sl); welt(_sl.x, _sl.y, _sl.z, S.position);
            S.rotation.set(0, wer === 'ich' ? yawIch : yawEr, 0); S.rotateX(-0.25 - u * 0.5); S.rotateZ((wer === 'ich' ? 1 : -1) * (_sl.x > P.s ? -0.3 : 0.3));
            if (fig && fig.hand) {
              const H = fig.hand.R; H.w = 1; H.ziel = (H.ziel || new THREE.Vector3()).copy(S.position); H.ziel.y -= 0.08;
              _q.copy(S.quaternion); H.richtung = (H.richtung || new THREE.Vector3()).set(0, 1, 0).applyQuaternion(_q);
              H.flaeche = (H.flaeche || new THREE.Vector3()).set(0, 0, 1).applyQuaternion(_q); H.faust = 0.85; H.pol = (H.pol || new THREE.Vector3()).set(0, -1, 0);
              fig.lehnen(0.14);
            }
          }
          if (msgT > 0) { msgT -= dt; if (msgT <= 0) $('msg').textContent = ''; }
          kamera(dt);
        },
      };
    });
  }
  return { spiel, tick: (dt) => { if (lauf) lauf.tick(dt); }, aktiv: () => !!lauf };
}
