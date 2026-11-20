// Lycée-Simulator – Laufen und Kamera. Schlank und nur für das Lycée: Figur mit Kreis-Kollision gegen die Kästen der Welt
// (welt.js → kasten) und gegen Personen; Kamera hinter der Figur, dreht mit Maus/Finger (input.look), weicht Wänden aus
// und bleibt drinnen unter der Decke. Bewegung relativ zur Blickrichtung (W = vom Betrachter weg).
import * as THREE from 'three';

const R = 0.34;            // Radius der Figur
const GEHEN = 2.1, RENNEN = 4.6;

export function createSteuerung({ camera, input, welt, figur = null }) {
  const pos = new THREE.Vector3(0, 0, 30);
  const s = {
    pos, yaw: Math.PI, tempo: 0, frei: true, laeuft: false,
    figur, hindernisse: [],                 // Personen: { x, z, r }
    cam: { yaw: Math.PI, pitch: 0.32, dist: 5.2, ziel: 5.2, minPitch: -0.15, maxPitch: 1.1 },
    fokus: null, gegenSchuss: false,      // gegenSchuss: Kamera über die Schulter des Gegenübers auf dich (Schuss/Gegenschuss)
                                // Gesprächs-Blick: { x, y, z } oder null
  };
  // nur Kästen, die auf Schulterhöhe im Weg stehen
  const wand = welt.kasten.filter((k) => k.y1 > 0.35 && k.y0 < 1.6);
  // grobes Raster: 4 m
  const RAST = 4, gitter = new Map();
  const key = (i, j) => i * 10007 + j;
  for (const k of wand) {
    for (let i = Math.floor(k.x0 / RAST); i <= Math.floor(k.x1 / RAST); i++) for (let j = Math.floor(k.z0 / RAST); j <= Math.floor(k.z1 / RAST); j++) {
      const kk = key(i, j); if (!gitter.has(kk)) gitter.set(kk, []); gitter.get(kk).push(k);
    }
  }
  const nahe = (x, z) => {
    const out = new Set(), i0 = Math.floor((x - 1) / RAST), i1 = Math.floor((x + 1) / RAST), j0 = Math.floor((z - 1) / RAST), j1 = Math.floor((z + 1) / RAST);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) { const l = gitter.get(key(i, j)); if (l) for (const k of l) out.add(k); }
    return out;
  };
  function loese(x, z, h = 0) {
    for (let iter = 0; iter < 3; iter++) {
      for (const k of nahe(x, z)) {
        if (h > 0.05 && k.y1 <= h + 0.05) continue;   // im Sprung (Skateboard) darüber hinweg
        const cx = Math.max(k.x0, Math.min(x, k.x1)), cz = Math.max(k.z0, Math.min(z, k.z1));
        const dx = x - cx, dz = z - cz, d2 = dx * dx + dz * dz;
        if (d2 >= R * R) continue;
        if (d2 > 1e-8) { const d = Math.sqrt(d2), p = (R - d) / d; x += dx * p; z += dz * p; }
        else {   // Mittelpunkt im Kasten: kürzester Weg hinaus
          const l = [x - k.x0, k.x1 - x, z - k.z0, k.z1 - z], m = Math.min(...l);
          if (m === l[0]) x = k.x0 - R; else if (m === l[1]) x = k.x1 + R; else if (m === l[2]) z = k.z0 - R; else z = k.z1 + R;
        }
      }
      for (const h of s.autos || []) {   // fahrende Autos (verkehr.js): nicht hindurchlaufen
        const dx = x - h.x, dz = z - h.z, d = Math.hypot(dx, dz), min = R + h.r;
        if (d < min && d > 1e-5) { x = h.x + dx / d * min; z = h.z + dz / d * min; }
      }
      for (const h of s.hindernisse) {
        const dx = x - h.x, dz = z - h.z, d = Math.hypot(dx, dz), min = R + (h.r || 0.3);
        if (d < min && d > 1e-5) { x = h.x + dx / d * min; z = h.z + dz / d * min; }
      }
    }
    return [x, z];
  }
  s.loese = loese;

  // ---------- Skateboard (Minispiel in der Skate-Ecke) ----------
  // s.brett = { y, vy, ueber: Set, start, bereich: [x0, x1, z0, z1], onTrick(name, punkte), onRaus() }. Das Brett rollt
  // weiter (Schwung), lenkt träger als Laufen, Sprung mit Leertaste/Knopf; niedrige Hindernisse im Sprung überwinden = Punkte.
  s.brett = null;
  // Skaten (Auftrag 19.11.: „detaillierter, schwieriger“): Anschieben baut Schwung langsam auf, links/rechts lenkt (träger
  // bei Tempo). Sprung: Taste halten = aufladen, loslassen = Pop (höher). In der Luft: Trick (Kickflip, Shove-it, 180) –
  // muss vor der Landung fertig sein, sonst Sturz. Schief gelandet (in der Luft zu stark gelenkt) = Sturz. Sprungtaste kurz vor
  // der Landung = saubere Landung (Bonus). Auf Kanten (Bank, Mäuerchen) landen = Grind mit Gleichgewicht (gegensteuern).
  const TRICKS = { kickflip: { name: 'Kickflip', dauer: 0.42, p: 3 }, shove: { name: 'Pop Shove-it', dauer: 0.4, p: 3 }, dreh: { name: '180', dauer: 0.5, p: 4 } };
  function brettUpdate(dt, st) {
    const b = s.brett, c = s.cam;
    const mx = s.frei ? st.move.x : 0, my = s.frei ? st.move.y : 0;
    const g = s.figur && s.figur.group;
    b.uhr = (b.uhr || 0) + dt;
    // ---------- Sturz: liegen bleiben, Brett rollt weg, dann wieder drauf ----------
    if (b.sturz > 0) {
      b.sturz -= dt; s.tempo = Math.max(0, s.tempo - dt * 6); b.y = 0; b.vy = 0;
      if (b.mesh) { b.mesh.position.x += dt * 1.2; b.mesh.rotation.z += dt * 5; }
      if (s.figur) { g.position.set(pos.x, 0, pos.z); g.rotation.set(0, s.yaw + Math.PI / 2, 0); s.figur.spiele(b.sturz > 0.6 ? 'HitRecieve' : 'Idle', { einmal: true }); }
      if (b.sturz <= 0) { b.trick = null; b.dreh = 0; if (b.mesh) { b.mesh.position.set(0, 0, 0); b.mesh.rotation.set(0, 0, 0); } }
      s.laeuft = false; return;
    }
    const sturz = (grund) => { b.sturz = 1.4; b.grind = null; b.trick = null; b.lade = null; s.tempo *= 0.3; if (b.onSturz) b.onSturz(grund); };
    const amBoden = b.y <= 0 && !b.grind;
    if (amBoden) {
      const will = my > 0.2 ? (b.vmax || 6.2) * Math.min(1, my) : 0;   // freie Fahrt: Brett 7,4 m/s, Trottinette 9,5 m/s
      if (will > s.tempo) s.tempo += (will - s.tempo) * dt * (b.antrieb || 0.9);          // anschieben: Schwung kommt langsam
      else s.tempo = Math.max(0, s.tempo - dt * (my < -0.3 ? 4.5 : 0.3));   // rollen / bremsen (zurück)
      s.yaw -= mx * dt * ((b.lenk || 2.1) - Math.min(1.1, s.tempo * (b.lenk ? 0.11 : 0.16)));
      b.luftDreh = 0;
    } else if (!b.grind) { const d = mx * dt * 1.1; s.yaw -= d; b.luftDreh = (b.luftDreh || 0) + d; }
    // ---------- Kicker-Rampe: mit Schwung in Fahrtrichtung drüber = Absprung (je schneller, desto höher) ----------
    if (amBoden && s.tempo > 2.2 && s.kicker) for (const k of s.kicker) {
      if (pos.x < k.x0 || pos.x > k.x1 || pos.z < k.z0 || pos.z > k.z1) continue;
      if (Math.sin(s.yaw) * k.dx + Math.cos(s.yaw) * k.dz < 0.55) continue;
      b.vy = 2.0 + s.tempo * 0.5; b.y = 0.02; b.ueber = new Set(); b.start = s.tempo; b.pop = 0.3; b.luftDreh = 0;
      if (b.onKicker) b.onKicker(); break;
    }
    // ---------- Pop: halten = aufladen, loslassen = springen ----------
    if ((st.jump || st.jumpHeld) && s.frei) {   // halten = aufladen (jump allein gilt nur im ersten Bild)
      if (amBoden && b.lade == null && !b.sprungGehalten) b.lade = 0;
      if (b.lade != null) b.lade = Math.min(0.45, b.lade + dt);
      if (!amBoden && !b.sprungGehalten) b.landeDruck = b.uhr;   // kurz vor der Landung gedrückt
      b.sprungGehalten = true;
    } else {
      if (b.lade != null && (amBoden || b.grind)) { b.vy = 3.1 + b.lade * 3.4; b.ueber = new Set(); b.start = s.tempo; b.pop = b.lade; b.grind = null; b.trick = null; b.luftDreh = 0; b.y = Math.max(b.y, 0.001); }
      b.lade = null; b.sprungGehalten = false;
    }
    // ---------- Trick in der Luft ----------
    if (b.trickWunsch) { if (b.y > 0.12 && !b.trick && !b.grind) b.trick = { art: b.trickWunsch, t: 0 }; b.trickWunsch = null; }
    if (b.trick) b.trick.t += dt;
    // ---------- Bewegung ----------
    const nx = pos.x + Math.sin(s.yaw) * s.tempo * dt, nz = pos.z + Math.cos(s.yaw) * s.tempo * dt;
    const [x, z] = loese(nx, nz, b.grind ? b.y + 0.1 : b.y);
    if (s.tempo * dt > 0.001 && Math.hypot(x - pos.x, z - pos.z) < s.tempo * dt * 0.5) { if (s.tempo > (b.crash || 4.6) && amBoden) sturz('Mit Vollgas gegen etwas gefahren'); else s.tempo *= 0.5; }
    pos.x = x; pos.z = z;
    // ---------- Grind: auf einer Kante entlang, Gleichgewicht halten ----------
    if (b.grind) {
      const k = b.grind.k, G2 = b.grind;
      G2.t += dt; G2.bal += ((Math.random() - 0.5) * 2.4 + G2.bal * 1.5) * dt + mx * dt * 2.2;
      if (b.onGrind) b.onGrind(dt, G2.bal);
      s.tempo = Math.max(1.2, s.tempo - dt * 0.6);
      if (Math.abs(G2.bal) > 1) { sturz('Gleichgewicht verloren'); }
      else if (x < k.x0 - 0.05 || x > k.x1 + 0.05 || z < k.z0 - 0.05 || z > k.z1 + 0.05) {   // Ende der Kante: abspringen
        if (b.onTrick) b.onTrick('Grind ' + G2.t.toFixed(1) + ' s', Math.max(1, Math.round(G2.t * 3)));
        b.grind = null; b.vy = 0.6; b.ueber = new Set();
      } else { b.y = k.y1; b.vy = 0; }
    } else if (b.y > 0 || b.vy > 0) {
      const vor = b.y;
      b.vy -= 11 * dt; b.y = Math.max(0, b.y + b.vy * dt);
      for (const k of nahe(x, z)) {
        if (k.y1 > 0.2 && k.y1 <= vor + 0.05 && x > k.x0 - 0.1 && x < k.x1 + 0.1 && z > k.z0 - 0.1 && z < k.z1 + 0.1) b.ueber.add(k);
        // auf einer Kante landen (0,25–0,8 m hoch, schmal genug): Grind
        const breit = Math.min(k.x1 - k.x0, k.z1 - k.z0);
        if (b.vy < 0 && k.y1 >= 0.25 && k.y1 <= 0.8 && breit < 1.2 && vor >= k.y1 - 0.02 && b.y <= k.y1 + 0.02 && x > k.x0 && x < k.x1 && z > k.z0 && z < k.z1) {
          if (b.trick && b.trick.t < TRICKS[b.trick.art].dauer) { sturz('Trick nicht fertig'); break; }
          b.grind = { k, bal: (Math.random() - 0.5) * 0.3, t: 0 }; b.y = k.y1; b.vy = 0;
          if (b.trick && b.onTrick) b.onTrick(TRICKS[b.trick.art].name + ' auf die Kante', TRICKS[b.trick.art].p);
          b.trick = null; break;
        }
      }
    }
    // ---------- Landung ----------
    if (!b.grind && b.y <= 0 && b.vy < 0 && !(b.sturz > 0)) {
      b.vy = 0;
      const tr = b.trick && TRICKS[b.trick.art];
      if (tr && b.trick.t < tr.dauer) sturz('Zu früh gelandet – Trick nicht fertig');
      else if (Math.abs(b.luftDreh || 0) > 0.55) sturz('Schief gelandet');
      else {
        const sauber = b.landeDruck && b.uhr - b.landeDruck < 0.18;
        let name = '', p = 0;
        if (tr) { name = tr.name; p = tr.p; }
        if (b.ueber.size) { name = (name ? name + ' über ' : 'Über ') + (b.ueber.size > 1 ? 'zwei Hindernisse' : 'das Hindernis'); p += 2 * b.ueber.size; }
        if (!name && b.start > 1.5 && (b.pop || 0) > 0.12) { name = 'Ollie'; p = 1; }
        else if (!name && b.start > 1.5) { name = 'Hüpfer'; p = 0; }
        if (sauber && p) { name += ' · sauber gelandet'; p += 1; }
        if (p && b.onTrick) b.onTrick(name, p);
      }
      b.trick = null; b.ueber = new Set(); b.landeDruck = 0;
    }
    const [x0, x1, z0, z1] = b.bereich;
    if (pos.x < x0 || pos.x > x1 || pos.z < z0 || pos.z > z1) b.onRaus();
    pos.y = b.y;
    // ---------- Darstellung: Figur seitlich auf dem Brett, neigt sich in Kurven, Brett dreht beim Trick ----------
    if (s.figur) {
      if (g.rotation.order !== 'YXZ') g.rotation.order = 'YXZ';
      const tr = b.trick && TRICKS[b.trick.art], u = tr ? Math.min(1, b.trick.t / tr.dauer) : 0;
      const dreh = tr && b.trick.art === 'dreh' ? Math.PI * u : 0;
      g.position.set(pos.x, b.y + (b.lade != null ? -0.05 * (b.lade / 0.45) : 0), pos.z);
      g.rotation.set(-mx * 0.16 * Math.min(1, s.tempo / 3) + (b.grind ? b.grind.bal * 0.25 : 0), s.yaw + Math.PI / 2 + dreh, 0);
      s.figur.spiele(b.mesh && amBoden && !b.grind && !(b.sturz > 0) && my > 0.2 && s.tempo < (b.vmax || 6.2) * 0.92 ? 'Skaten' : 'Idle');   // anschieben (Mixamo „Skateboarding“)
      if (b.mesh) { b.mesh.rotation.set(tr && b.trick.art === 'kickflip' ? Math.PI * 2 * u : 0, tr && b.trick.art === 'shove' ? Math.PI * u : 0, 0); b.mesh.position.y = b.y > 0 ? Math.sin(u * Math.PI) * 0.12 : 0; }
      if (s.figur.lehnen) s.figur.lehnen(b.lade != null ? 0.18 : 0.08);
    }
    if (!st.look.dx && s.tempo > 0.5) { let d = s.yaw - c.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); c.yaw += d * Math.min(1, dt * 1.4); }
    s.laeuft = s.tempo > 0.3;
  }
  // Hinsetzen (Stuhl): Figur sitzt, bis man sich bewegt
  s.sitzt = false;
  s.sitzSuche = null;   // (x, z) → { x, z, rot, h } nächster Sitz (aus der Welt)
  s.setzen = (x, z, yaw) => { const sp = s.sitzSuche && s.sitzSuche(x, z); if (sp) { x = sp.x; z = sp.z; yaw = sp.rot; }
    s.teleport(x, z, yaw); s.sitzt = true; if (s.figur && s.figur.sitzen) s.figur.sitzen(true, sp ? sp.h || 0.47 : 0.47); };
  const aufstehen = () => { if (!s.sitzt) return; s.sitzt = false; if (s.figur && s.figur.sitzen) s.figur.sitzen(false); pos.x += Math.sin(s.yaw) * -0.5; pos.z += Math.cos(s.yaw) * -0.5; };
  s.teleport = (x, z, yaw) => { if (s.sitzt) { s.sitzt = false; if (s.figur && s.figur.sitzen) s.figur.sitzen(false); } pos.set(x, 0, z); if (yaw !== undefined) { s.yaw = yaw; s.cam.yaw = yaw; } s.tempo = 0; if (s.figur) { s.figur.group.position.copy(pos); s.figur.group.rotation.set(0, s.yaw, 0); } yawAlt = null; kamera(1, true); };

  // Strahl gegen Kästen (für die Kamera): kleinster Treffer-Abstand t in [0, maxT]
  const alle = welt.kasten.filter((k) => k.y1 - k.y0 > 0.5);
  function strahl(o, d, maxT) {
    let best = maxT;
    for (const k of alle) {
      let t0 = 0, t1 = best;
      const ax = [[o.x, d.x, k.x0 - 0.15, k.x1 + 0.15], [o.y, d.y, k.y0 - 0.15, k.y1 + 0.15], [o.z, d.z, k.z0 - 0.15, k.z1 + 0.15]];
      let ok = true;
      for (const [oo, dd, a, b] of ax) {
        if (Math.abs(dd) < 1e-6) { if (oo < a || oo > b) { ok = false; break; } continue; }
        let ta = (a - oo) / dd, tb = (b - oo) / dd; if (ta > tb) { const q = ta; ta = tb; tb = q; }
        t0 = Math.max(t0, ta); t1 = Math.min(t1, tb); if (t0 > t1) { ok = false; break; }
      }
      if (ok && t0 > 0.05 && t0 < best) best = t0;
    }
    return best;
  }
  const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _ziel = new THREE.Vector3(), _blick = new THREE.Vector3();
  let camDist = 5.2;
  // Spielgefühl (Qualitätsrunde 1): Schritte hörbar, Blick weitet sich beim Rennen, Stufen weich, Figur zappelt im Stand
  let schrittWeg = 0, fovJetzt = 0, idleZeit = 0, atem = 0, letzterSchuss = null;
  // Körper neigt sich in Kurven und beim Anlaufen (wie in großen Third-Person-Spielen)
  let neigZ = 0, neigX = 0, yawAlt = null, tempoAlt = 0;
  let blickPause = 9, vorX = 0, vorZ = 0;
  s.onSchritt = null;
  function kamera(dt, sofort) {
    if (s.kameraAus) return;   // Minispiel (Basketball) führt die Kamera selbst
    const c = s.cam;
    const raum = welt.raumBei(pos.x, pos.z);
    const decke = raum ? (raum.decke || 3.6) : 40;
    const innen = !!raum;
    // Gesprächsblick: über die Schulter auf das Gegenüber
    let schnitt = false;
    if (s.fokus) {
      // Schuss/Gegenschuss: beide Kameras auf derselben Seite der Blickachse (180°-Regel), harter Schnitt beim Wechsel
      const f = s.fokus;
      let gs = !!s.gegenSchuss;
      if (gs) {   // Gegenschuss nur, wenn hinter dem Gegenüber Platz ist – sonst normale Einstellung
        const a2 = Math.atan2(pos.x - f.x, pos.z - f.z) - Math.PI * 0.72;
        _o.set(f.x, 1.6, f.z); _d.set(Math.sin(a2), 0.06, Math.cos(a2)).normalize();
        if (strahl(_o, _d, 2.4) < 1.8) gs = false;
        else { _o.y = 2.2; if (strahl(_o, _d, 2.4) < 1.8) gs = false; }   // auch kein Dach direkt darüber
      }
      s.gegenSchussIst = gs;
      const von = gs ? f : pos, zu = gs ? pos : f;
      const mx = (von.x + zu.x) / 2, mz = (von.z + zu.z) / 2;
      const ang = Math.atan2(zu.x - von.x, zu.z - von.z);
      const seit = ang + Math.PI * 0.72 * (gs ? -1 : 1);
      _o.set(von.x, 1.6, von.z); _d.set(Math.sin(seit), 0.06, Math.cos(seit)).normalize();
      const weit = Math.max(0.7, Math.min(2.4, strahl(_o, _d, 2.4) - 0.2));   // nicht durch Wände filmen
      _ziel.set(von.x + Math.sin(seit) * weit, Math.min(decke - 0.35, 1.75), von.z + Math.cos(seit) * weit);
      atem += dt;
      _blick.set(mx * 0.35 + zu.x * 0.65, 1.45 + (s.wenigBewegung ? 0 : Math.sin(atem * 0.9) * 0.012), mz * 0.35 + zu.z * 0.65);   // Kamera „atmet“ kaum merklich
      schnitt = letzterSchuss !== null && letzterSchuss !== gs;
      letzterSchuss = gs;
    } else {
      letzterSchuss = null;
      const ziel = innen ? Math.min(c.ziel, 3.6) : c.ziel;
      const pitch = innen ? Math.min(c.pitch, 0.42) : c.pitch;
      _o.set(pos.x, 1.45, pos.z);
      _d.set(-Math.sin(c.yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(c.yaw) * Math.cos(pitch)).normalize();
      const frei = strahl(_o, _d, ziel);
      // Wand oder Regal dicht hinter der Figur: Kamera nicht hineinschieben, sondern näher heran und etwas höher (über die Schulter)
      const will = Math.max(0.3, frei - 0.25);
      camDist = sofort || (will < camDist && frei < 0.6) ? will : camDist + (will - camDist) * Math.min(1, dt * (will < camDist ? 20 : 3));
      _ziel.copy(_o).addScaledVector(_d, camDist);
      if (camDist < 0.9) _ziel.y += (0.9 - camDist) * 0.4;
      if (s.figur && !s.brett) s.figur.group.visible = camDist > 0.5;
      if (innen) _ziel.y = Math.min(_ziel.y, decke - 0.3);
      // ein wenig in Laufrichtung vorausschauen (weich), damit man sieht, wohin man läuft
      const k3 = Math.min(1, dt * 2.5), vz = s.brett ? 0 : Math.min(s.tempo, 5.4) * 0.22;
      vorX += (Math.sin(s.yaw) * vz - vorX) * k3; vorZ += (Math.cos(s.yaw) * vz - vorZ) * k3;
      _blick.set(pos.x + vorX, 1.3 + (innen ? 0.05 : 0.15), pos.z + vorZ);
      if (camDist < 0.9) { const vor = (0.9 - camDist) * 4; _blick.x -= _d.x * vor; _blick.z -= _d.z * vor; _blick.y = 1.35; }   // dicht an der Wand: nach vorn schauen
    }
    if (sofort || schnitt) camera.position.copy(_ziel); else camera.position.lerp(_ziel, Math.min(1, dt * (s.fokus ? 4 : 12)));
    // Sichtfeld: beim Rennen ein paar Grad weiter (Gefühl von Tempo), im Gespräch etwas enger
    const basis = camera.userData.baseFov;
    if (basis) { const ziel = s.wenigBewegung ? 0 : s.fokus ? -4 : (s.tempo > 3.2 && !s.brett ? 5 : s.brett && s.tempo > 3 ? 7 : 0);   /* „Weniger Bewegung“: kein Zoomen */ fovJetzt += (ziel - fovJetzt) * Math.min(1, dt * (sofort ? 99 : 3)); camera.fov = basis + fovJetzt; camera.updateProjectionMatrix(); }
    camera.lookAt(_blick);
  }

  s.update = (dt) => {
    const c = s.cam, st = input.state;
    // Blick drehen
    blickPause = (st.look.dx || st.look.dy) ? 0 : blickPause + dt;
    c.yaw -= st.look.dx * 0.0052; c.pitch = Math.max(c.minPitch, Math.min(c.maxPitch, c.pitch + st.look.dy * 0.0036));
    c.ziel = Math.max(2.4, Math.min(9, c.ziel + st.zoom * 0.6));
    if (s.brett) { brettUpdate(dt, st); kamera(dt, false); return; }
    let mx = s.frei ? st.move.x : 0, my = s.frei ? st.move.y : 0;
    if (s.sitzt) { if (Math.hypot(mx, my) > 0.3) aufstehen(); else { mx = 0; my = 0; } }
    const staerke = Math.min(1, Math.hypot(mx, my));
    const will = staerke > 0.05 ? (st.run && staerke > 0.6 ? RENNEN : GEHEN * Math.max(0.5, staerke)) : 0;
    s.tempo += (will - s.tempo) * Math.min(1, dt * (will > s.tempo ? 8 : 12));
    if (staerke > 0.05) {
      // Richtung relativ zur Kamera
      const fx = Math.sin(c.yaw), fz = Math.cos(c.yaw);
      const dx = fx * my - fz * mx, dz = fz * my + fx * mx;
      const ziel = Math.atan2(dx, dz);
      let d = ziel - s.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      s.yaw += d * Math.min(1, dt * 12);
    }
    if (s.tempo > 0.01) {
      const nx = pos.x + Math.sin(s.yaw) * s.tempo * dt, nz = pos.z + Math.cos(s.yaw) * s.tempo * dt;
      const [x, z] = loese(nx, nz);
      const weg = Math.hypot(x - pos.x, z - pos.z); schrittWeg += weg; pos.x = x; pos.z = z;
      // gegen eine Wand gelaufen: kein Rennen auf der Stelle – Tempo folgt der echten Bewegung
      if (dt > 0) { const ist = weg / dt; if (ist < s.tempo * 0.6) s.tempo += (ist - s.tempo) * Math.min(1, dt * 14); }
      const schritt = s.tempo > 3.2 ? 1.25 : 0.74;
      if (schrittWeg > schritt) { schrittWeg = 0; if (s.onSchritt && s.tempo > 0.4) s.onSchritt(s.tempo > 3.2); }
      // Kamera folgt langsam hinter die Laufrichtung
      if (blickPause > 1.2 && staerke > 0.05 && Math.abs(mx) < 0.9) { let d = s.yaw - c.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); c.yaw += d * Math.min(1, dt * (s.tempo > 3.2 ? 1.8 : 1.0)) * Math.min(1, s.tempo / GEHEN); }
    }
    // Rampe zum Eingang (Stufen): leicht anheben
    { const zy = (pos.z > -2 && pos.z < -0.6 && Math.abs(pos.x) < 4.2) ? 0.16 : 0; pos.y += (zy - pos.y) * Math.min(1, dt * 12); }
    if (s.figur) {
      s.figur.group.position.copy(pos); s.figur.group.rotation.y = s.yaw;
      // Neigung: in die Kurve (seitlich) und beim Anlaufen/Bremsen (vor/zurück) – klein und weich
      const g = s.figur.group; if (g.rotation.order !== 'YXZ') g.rotation.order = 'YXZ';
      if (dt > 0 && yawAlt !== null && !s.sitzt) {
        let dy = s.yaw - yawAlt; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
        const zz = Math.max(-0.11, Math.min(0.11, -(dy / dt) * s.tempo * 0.022));
        const xx = Math.max(-0.05, Math.min(0.07, ((s.tempo - tempoAlt) / dt) * 0.012));
        neigZ += (zz - neigZ) * Math.min(1, dt * 8); neigX += (xx - neigX) * Math.min(1, dt * 6);
      } else { neigZ = 0; neigX = 0; }
      yawAlt = s.yaw; tempoAlt = s.tempo;
      g.rotation.z = neigZ; g.rotation.x = neigX;
      idleZeit = (s.tempo < 0.3 && !s.sitzt) ? idleZeit + dt : 0;
      const zappel = idleZeit > 8 && ((idleZeit - 8) % 14) < 2.8;   // im Stand: ab und zu umschauen
      const emo = s.emote && performance.now() < s.emoteBis;   // emoteVor: auch im Laufen (Schuss, Jubel)
      const lauf = s.sitzt ? 'Idle' : emo && s.emoteVor ? s.emote : s.tempo > 2.9 ? 'Run' : s.tempo > 0.3 ? 'Walk' : emo ? s.emote : zappel ? 'Idle_Neutral' : 'Idle';
      s.figur.spiele(lauf, { tempo: lauf === 'Walk' ? Math.max(0.7, Math.min(1.3, s.tempo / GEHEN)) : lauf === 'Run' ? Math.max(0.8, Math.min(1.15, s.tempo / RENNEN)) : 1 });
    }
    s.laeuft = s.tempo > 0.3;
    kamera(dt, false);
  };
  s.kamera = kamera;
  s.strahl = strahl;   // für Minispiel-Kameras (nicht durch Wände filmen)
  return s;
}
