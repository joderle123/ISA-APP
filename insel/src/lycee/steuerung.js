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
    fokus: null,                             // Gesprächs-Blick: { x, y, z } oder null
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
  function brettUpdate(dt, st) {
    const b = s.brett, c = s.cam;
    const mx = s.frei ? st.move.x : 0, my = s.frei ? st.move.y : 0, staerke = Math.min(1, Math.hypot(mx, my));
    const will = staerke > 0.05 ? 5.4 * staerke : 0;
    s.tempo += (will - s.tempo) * Math.min(1, dt * (will > s.tempo ? 1.8 : 0.45));
    if (staerke > 0.05) {
      const fx = Math.sin(c.yaw), fz = Math.cos(c.yaw);
      let d = Math.atan2(fx * my - fz * mx, fz * my + fx * mx) - s.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      s.yaw += d * Math.min(1, dt * 3.2);
    }
    if (b.y <= 0 && b.vy <= 0 && st.jump && s.frei) { b.vy = 4.3; b.ueber = new Set(); b.start = s.tempo; }
    if (b.y > 0 || b.vy > 0) { b.vy -= 11 * dt; b.y = Math.max(0, b.y + b.vy * dt); }
    const nx = pos.x + Math.sin(s.yaw) * s.tempo * dt, nz = pos.z + Math.cos(s.yaw) * s.tempo * dt;
    const [x, z] = loese(nx, nz, b.y);
    const soll = s.tempo * dt;
    if (soll > 0.001 && Math.hypot(x - pos.x, z - pos.z) < soll * 0.5) s.tempo *= 0.5;   // gegen etwas gerollt: bremst
    pos.x = x; pos.z = z;
    if (b.y > 0.2) for (const k of nahe(x, z)) if (k.y1 > 0.2 && k.y1 <= b.y + 0.05 && x > k.x0 - 0.1 && x < k.x1 + 0.1 && z > k.z0 - 0.1 && z < k.z1 + 0.1) b.ueber.add(k);
    if (b.y <= 0 && b.vy < 0) {   // gelandet
      b.vy = 0;
      if (b.ueber.size) b.onTrick(b.ueber.size > 1 ? 'Doppelsprung' : 'Über das Hindernis', 3 * b.ueber.size);
      else if (b.start > 1.5) b.onTrick('Ollie', 1);
      b.ueber = new Set();
    }
    const [x0, x1, z0, z1] = b.bereich;
    if (pos.x < x0 || pos.x > x1 || pos.z < z0 || pos.z > z1) b.onRaus();
    pos.y = b.y;
    if (s.figur) { s.figur.group.position.set(pos.x, b.y, pos.z); s.figur.group.rotation.y = s.yaw + Math.PI / 2; s.figur.spiele('Idle'); }   // seitlich auf dem Brett
    if (!st.look.dx && s.tempo > 0.5) { let d = s.yaw - c.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); c.yaw += d * Math.min(1, dt * 1.4); }
    s.laeuft = s.tempo > 0.3;
  }
  // Hinsetzen (Stuhl): Figur sitzt, bis man sich bewegt
  s.sitzt = false;
  s.setzen = (x, z, yaw) => { s.teleport(x, z, yaw); s.sitzt = true; if (s.figur && s.figur.sitzen) s.figur.sitzen(true); };
  const aufstehen = () => { if (!s.sitzt) return; s.sitzt = false; if (s.figur && s.figur.sitzen) s.figur.sitzen(false); pos.x += Math.sin(s.yaw) * -0.5; pos.z += Math.cos(s.yaw) * -0.5; };
  s.teleport = (x, z, yaw) => { if (s.sitzt) { s.sitzt = false; if (s.figur && s.figur.sitzen) s.figur.sitzen(false); } pos.set(x, 0, z); if (yaw !== undefined) { s.yaw = yaw; s.cam.yaw = yaw; } s.tempo = 0; if (s.figur) { s.figur.group.position.copy(pos); s.figur.group.rotation.y = s.yaw; } kamera(1, true); };

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
  function kamera(dt, sofort) {
    if (s.kameraAus) return;   // Minispiel (Basketball) führt die Kamera selbst
    const c = s.cam;
    const raum = welt.raumBei(pos.x, pos.z);
    const decke = raum ? (raum.decke || 3.6) : 40;
    const innen = !!raum;
    // Gesprächsblick: über die Schulter auf das Gegenüber
    if (s.fokus) {
      const f = s.fokus, mx = (pos.x + f.x) / 2, mz = (pos.z + f.z) / 2;
      const ang = Math.atan2(f.x - pos.x, f.z - pos.z);
      const seit = ang + Math.PI * 0.72;
      _ziel.set(pos.x + Math.sin(seit) * 2.4, Math.min(decke - 0.35, 1.75), pos.z + Math.cos(seit) * 2.4);
      _blick.set(mx * 0.35 + f.x * 0.65, 1.45, mz * 0.35 + f.z * 0.65);
    } else {
      const ziel = innen ? Math.min(c.ziel, 3.6) : c.ziel;
      const pitch = innen ? Math.min(c.pitch, 0.42) : c.pitch;
      _o.set(pos.x, 1.45, pos.z);
      _d.set(-Math.sin(c.yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(c.yaw) * Math.cos(pitch)).normalize();
      const frei = strahl(_o, _d, ziel);
      // Wand oder Regal dicht hinter der Figur: Kamera nicht hineinschieben, sondern näher heran und etwas höher (über die Schulter)
      const will = Math.max(0.3, frei - 0.25);
      camDist = sofort ? will : (will < camDist ? will : camDist + (will - camDist) * Math.min(1, dt * 3));
      _ziel.copy(_o).addScaledVector(_d, camDist);
      if (camDist < 0.9) _ziel.y += (0.9 - camDist) * 0.4;
      if (s.figur && !s.brett) s.figur.group.visible = camDist > 0.5;
      if (innen) _ziel.y = Math.min(_ziel.y, decke - 0.3);
      _blick.set(pos.x, 1.3 + (innen ? 0.05 : 0.15), pos.z);
      if (camDist < 0.9) { const vor = (0.9 - camDist) * 4; _blick.x -= _d.x * vor; _blick.z -= _d.z * vor; _blick.y = 1.35; }   // dicht an der Wand: nach vorn schauen
    }
    if (sofort) camera.position.copy(_ziel); else camera.position.lerp(_ziel, Math.min(1, dt * (s.fokus ? 4 : 12)));
    camera.lookAt(_blick);
  }

  s.update = (dt) => {
    const c = s.cam, st = input.state;
    // Blick drehen
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
      const [x, z] = loese(nx, nz); pos.x = x; pos.z = z;
      // Kamera folgt langsam hinter die Laufrichtung
      if (!st.look.dx && staerke > 0.05 && Math.abs(mx) < 0.9) { let d = s.yaw - c.yaw; d = Math.atan2(Math.sin(d), Math.cos(d)); c.yaw += d * Math.min(1, dt * 0.9) * Math.min(1, s.tempo / GEHEN); }
    }
    // Rampe zum Eingang (Stufen): leicht anheben
    pos.y = (pos.z > -2 && pos.z < -0.6 && Math.abs(pos.x) < 4.2) ? 0.16 : 0;
    if (s.figur) {
      s.figur.group.position.copy(pos); s.figur.group.rotation.y = s.yaw;
      const lauf = s.sitzt ? 'Idle' : s.tempo > 3.2 ? 'Run' : s.tempo > 0.3 ? 'Walk' : (s.emote && performance.now() < s.emoteBis) ? s.emote : 'Idle';
      s.figur.spiele(lauf, { tempo: lauf === 'Walk' ? Math.max(0.7, s.tempo / GEHEN) : 1 });
    }
    s.laeuft = s.tempo > 0.3;
    kamera(dt, false);
  };
  s.kamera = kamera;
  return s;
}
