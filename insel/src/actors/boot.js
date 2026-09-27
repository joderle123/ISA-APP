// Boote (BAUPLAN §2.1 A1, aus minigames/rennen/boat.js herausgelöst): ein gemeinsamer Bau für das Ruderboot im
// Bootsrennen (variant 'renn', Verhalten wie bisher) und die Kielpost (variant 'kielpost', freies Fahren).
//   const boat = createBoat({ game, variant, speed, turn }); boat.place(x, z, yaw) · boat.dispose()
//   Rennen:   boat.update(dt, { move, camYaw, frozen }) · boat.spin(seconds) (komischer Stillstand)
//   Kielpost: boat.drive(dt, { x, y, camYaw, sail }, env) → { bump, gust }   (Fahrgefühl v1, stepBoot unten)
//             boat.setTeile({ ausleger, segel, laterne }) – sichtbare Teile · boat.visible · boat.state (Physik-Zustand)
//   boat.x/z/y/yaw · boat.speed · boat.deckY · boat.seat (Sitzplatz der Figur in Weltkoordinaten)
// Die Spielfigur steht auf einer begehbaren Fläche (Collider-Surface), die mit dem Boot mitwandert.
// Kein Kentern, kein Schaden: Hindernisse lassen das Boot nur sanft abprallen.
import * as THREE from 'three';
import { part, merge } from '../world/geom.js';

// Fahrgefühl v1 (Kielpost). Einheiten: m, s, rad.
export const BOOT = {
  speed: 7.2,          // Grundtempo bei voller Auslenkung
  sail: 1.16,          // Segel dicht (Springen halten)
  gust: 1.5,           // Böen-Schub (Segel dicht während einer Böe), klingt in boostTime ab
  boostTime: 1.4,
  segel: 1.25,         // Teil „Segel“: +25 % Tempo
  acc: 1.25,           // Beschleunigen (exponentiell)
  coast: 0.32,         // Ausrollen ohne Eingabe (klein = lange Gleitstrecke)
  grip: 2.4,           // wie schnell die Fahrt der Bugrichtung folgt (Rest = leichtes Driften)
  turn: 1.7,           // Wendegeschwindigkeit (rad/s bei Fahrt)
  turnStill: 0.55,     // Anteil der Wendigkeit im Stand (drehen am Steg geht)
  radius: 1.25,        // Rumpf-Halbbreite für Kollision
  bow: 2.5,            // Bug-Abstand vom Mittelpunkt
  bounce: 0.45,        // Abprall-Anteil
  gustEvery: 7.5, gustLen: 1.8,
  rock: 0.055, rockAusleger: 0.4, heel: 0.045, heelMax: 0.26,
};

const wrap = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };

export function createBootState(x = 0, z = 0, yaw = 0) {
  return { x, z, yaw, speed: 0, vx: 0, vz: 0, turnRate: 0, roll: 0, pitch: 0, bob: 0, t: 0, gustT: 0, gust: false, gustUsed: false, boostT: 0, sail: false, bumpT: 0 };
}

// Ein Physik-Schritt (rein, ohne three.js-Szene: auch in Node testbar).
//   inp: { x, y (Joystick −1..1), camYaw, sail (Springen gehalten) }
//   env: { hit(x, z) → null | { nx, nz } (Normale weg vom Hindernis), push(x, z) → null | { nx, nz, k } (weiche Wand,
//          z. B. Nebel ohne Laterne), teile: { segel, ausleger } }
// Rückgabe: { bump: null | { x, z, strength }, gust: true beim Start einer Böe, pushed }
export function stepBoot(st, dt, inp = {}, env = {}) {
  const out = { bump: null, gust: false, pushed: false };
  if (dt <= 0) return out;
  const teile = env.teile || {};
  st.t += dt;
  st.bumpT = Math.max(0, st.bumpT - dt);
  // ---- Böen: feste Abstände, sichtbar und hörbar (Plugin) ----
  st.gustT += dt;
  const wasGust = st.gust;
  st.gust = (st.gustT % BOOT.gustEvery) > BOOT.gustEvery - BOOT.gustLen;
  if (st.gust && !wasGust) { out.gust = true; st.gustUsed = false; }
  st.sail = !!inp.sail;
  if (st.gust && st.sail && !st.gustUsed) { st.gustUsed = true; st.boostT = BOOT.boostTime; }
  st.boostT = Math.max(0, st.boostT - dt);
  // ---- Steuern (kamerabezogen: Joystick zeigt, wohin es gehen soll) ----
  const ix = inp.x || 0, iy = inp.y || 0;
  const mag = Math.min(1, Math.hypot(ix, iy));
  let maxV = BOOT.speed * (teile.segel ? BOOT.segel : 1) * (st.sail ? BOOT.sail : 1);
  maxV *= 1 + (BOOT.gust - 1) * (st.boostT / BOOT.boostTime);
  let turnRate = 0;
  if (mag > 0.15) {
    const want = (inp.camYaw || 0) + Math.PI + Math.atan2(ix, iy);
    const d = wrap(want - st.yaw);
    const k = BOOT.turn * (BOOT.turnStill + (1 - BOOT.turnStill) * Math.min(1, st.speed / 3));
    turnRate = Math.max(-k, Math.min(k, d * 2.4));
    // hart zurück? erst wenden, dann Gas (kein Rückwärtsfahren)
    const facing = Math.max(0, Math.cos(d));
    const target = mag * maxV * (0.35 + 0.65 * facing);
    if (target > st.speed) st.speed += (target - st.speed) * (1 - Math.exp(-BOOT.acc * dt));
    else st.speed += (target - st.speed) * (1 - Math.exp(-BOOT.coast * 2 * dt));
  } else {
    st.speed *= Math.exp(-BOOT.coast * dt);
    if (st.speed < 0.02) st.speed = 0;
  }
  if (st.boostT > 0 && st.speed < maxV) st.speed += (maxV - st.speed) * (1 - Math.exp(-3 * dt));
  st.turnRate += (turnRate - st.turnRate) * (1 - Math.exp(-6 * dt));
  st.yaw = wrap(st.yaw + st.turnRate * dt);
  // ---- Fahrt folgt der Bugrichtung (Kiel), etwas Drift bleibt ----
  const fx = Math.sin(st.yaw), fz = Math.cos(st.yaw);
  const g = 1 - Math.exp(-BOOT.grip * dt);
  st.vx += (fx * st.speed - st.vx) * g;
  st.vz += (fz * st.speed - st.vz) * g;
  // weiche Wand (Nebel ohne Licht): sanft abdrehen und hinausschieben
  if (env.push) {
    const p = env.push(st.x, st.z);
    if (p) {
      out.pushed = true;
      st.vx += p.nx * p.k * 9 * dt; st.vz += p.nz * p.k * 9 * dt;
      const away = Math.atan2(p.nx, p.nz);
      st.yaw = wrap(st.yaw + wrap(away - st.yaw) * Math.min(1, dt * 1.6 * p.k));
      st.speed *= Math.exp(-1.5 * p.k * dt);
    }
  }
  // ---- Bewegen mit sanftem Abprallen (Mitte und Bug prüfen) ----
  const nx = st.x + st.vx * dt, nz = st.z + st.vz * dt;
  const hit = env.hit ? (env.hit(nx, nz) || env.hit(nx + fx * BOOT.bow, nz + fz * BOOT.bow)) : null;
  if (hit) {
    const vn = st.vx * hit.nx + st.vz * hit.nz;
    const strength = Math.max(0, -vn);
    if (vn < 0) { st.vx -= (1 + BOOT.bounce) * vn * hit.nx; st.vz -= (1 + BOOT.bounce) * vn * hit.nz; }
    st.vx += hit.nx * 0.6; st.vz += hit.nz * 0.6;   // immer ein kleines Stück frei
    st.speed *= 0.35;
    if (st.bumpT <= 0 && strength > 0.6) { out.bump = { x: nx, z: nz, strength }; st.bumpT = 1.2; }
    const ex = st.x + st.vx * dt, ez = st.z + st.vz * dt;
    if (!(env.hit && env.hit(ex, ez))) { st.x = ex; st.z = ez; }
  } else { st.x = nx; st.z = nz; }
  // ---- Schaukeln, Schräglage, Nicken ----
  const A = BOOT.rock * (teile.ausleger ? BOOT.rockAusleger : 1) * (1 + st.speed * 0.04);
  const heel = Math.max(-BOOT.heelMax, Math.min(BOOT.heelMax, -st.turnRate * st.speed * BOOT.heel)) * (teile.ausleger ? 0.6 : 1);
  st.roll = Math.sin(st.t * 1.3) * A + Math.sin(st.t * 2.3 + 1.1) * A * 0.45 + heel;
  st.pitch = Math.sin(st.t * 1.05 + 0.4) * A * 0.7 - st.speed * 0.008 + (st.boostT > 0 ? -0.03 : 0);
  st.bob = Math.sin(st.t * 1.7) * 0.07 * (teile.ausleger ? 0.6 : 1);
  return out;
}

// ---------- Meshes ----------
function rennMesh() {
  const P = [];
  P.push(part(new THREE.BoxGeometry(2.2, 0.7, 4.6), { pos: [0, 0.35, 0], color: '#b8743c', faceVar: 0.1, deform: (v) => { if (v.y < 0) { v.x *= 0.6; } } }));
  P.push(part(new THREE.ConeGeometry(1.1, 1.6, 4, 1), { pos: [0, 0.4, 3.0], rot: [Math.PI / 2, Math.PI / 4, 0], scale: [1, 1, 0.65], color: '#b8743c' }));
  P.push(part(new THREE.BoxGeometry(2.0, 0.12, 4.2), { pos: [0, 0.72, 0], color: '#e0b27a' }));   // Deck
  P.push(part(new THREE.BoxGeometry(2.3, 0.14, 0.2), { pos: [0, 0.8, -2.2], color: '#7a4a24' }));
  P.push(part(new THREE.BoxGeometry(1.2, 0.5, 0.3), { pos: [0, 1.0, 1.4], color: '#4d8cff' }));     // Pult
  P.push(part(new THREE.BoxGeometry(1.4, 0.08, 0.5), { pos: [0, 1.28, 1.35], color: '#ffd166' }));  // Vogelstange
  return merge(P);
}
// Dreieckssegel aus einer dünnen Box (Spitze oben)
const sailPart = (w, h, opts) => part(new THREE.BoxGeometry(w, h, 0.04), { ...opts, deform: (v) => { v.x = (v.x + w / 2) * (0.5 - v.y / h); } });

function kielpostMeshes() {
  // Rumpf: altes Postboot, verwittertes Blaugrün mit gelbem Streifen, geflickte Planken
  const H = [];
  H.push(part(new THREE.BoxGeometry(2.3, 0.8, 4.4), { pos: [0, 0.3, -0.1], color: '#2f6572', faceVar: 0.12, seed: 3, deform: (v) => { if (v.y < 0) v.x *= 0.55; } }));
  H.push(part(new THREE.ConeGeometry(1.16, 1.7, 4, 1), { pos: [0, 0.34, 2.95], rot: [Math.PI / 2, Math.PI / 4, 0], scale: [1, 1, 0.7], color: '#2f6572', faceVar: 0.1 }));
  H.push(part(new THREE.BoxGeometry(2.36, 0.12, 4.3), { pos: [0, 0.56, -0.1], color: '#f2c14e' }));        // Post-Streifen
  H.push(part(new THREE.BoxGeometry(2.1, 0.1, 4.1), { pos: [0, 0.72, -0.1], color: '#c9a071', faceVar: 0.08 })); // Deck
  H.push(part(new THREE.BoxGeometry(0.7, 0.3, 0.5), { pos: [0.55, 0.52, 1.2], color: '#8a6a4a' }));        // Flicken
  H.push(part(new THREE.BoxGeometry(1.9, 0.14, 0.42), { pos: [0, 1.0, -1.55], color: '#7a4a24' }));      // Sitzbank
  H.push(part(new THREE.BoxGeometry(0.16, 0.3, 0.16), { pos: [0.8, 0.86, -1.55], color: '#5a3a20' }));
  H.push(part(new THREE.BoxGeometry(0.16, 0.3, 0.16), { pos: [-0.8, 0.86, -1.55], color: '#5a3a20' }));
  H.push(part(new THREE.BoxGeometry(0.6, 0.5, 0.6), { pos: [0.6, 1.02, 1.7], color: '#f2c14e', faceVar: 0.06 })); // Postkiste vorn
  H.push(part(new THREE.BoxGeometry(0.36, 0.06, 0.04), { pos: [0.6, 1.16, 1.39], color: '#3a2a1a' }));    // Schlitz
  H.push(part(new THREE.CylinderGeometry(0.06, 0.07, 2.2, 5, 1), { pos: [0, 1.8, 0.7], color: '#6e4a30' })); // kurzer Mast
  H.push(part(new THREE.BoxGeometry(0.05, 0.05, 1.6), { pos: [0, 1.05, -0.1], color: '#5a3a20' }));       // Ruderpinne
  for (const s of [-1, 1]) H.push(part(new THREE.BoxGeometry(0.1, 0.18, 4.2), { pos: [s * 1.12, 0.86, -0.1], color: '#6e4a30' })); // Dollbord
  const hull = merge(H);
  // Notsegel (geflickt, grau-beige): fällt weg, wenn das neue Segel gebaut ist
  const notsegel = merge([sailPart(1.3, 1.7, { pos: [0, 1.95, 0.62], rot: [0, Math.PI / 2, 0], color: '#bdb39c', faceVar: 0.15, seed: 5 })]);
  // Teil Segel: großes Segel mit Streifen am längeren Mast
  const segel = merge([
    part(new THREE.CylinderGeometry(0.07, 0.08, 1.6, 5, 1), { pos: [0, 3.5, 0.7], color: '#6e4a30' }),
    sailPart(2.2, 3.3, { pos: [0, 2.75, 0.62], rot: [0, Math.PI / 2, 0], color: '#f4efe2', faceVar: 0.05 }),
    part(new THREE.BoxGeometry(0.05, 0.22, 1.9), { pos: [0.0, 2.1, 0.0], color: '#ff7a59' }),
    part(new THREE.CylinderGeometry(0.04, 0.04, 2.3, 4, 1), { pos: [0, 1.25, -0.4], rot: [Math.PI / 2, 0, 0], color: '#5a3a20' }),   // Baum
  ]);
  // Teil Ausleger: zwei Querbalken und ein Schwimmer an Backbord
  const ausleger = merge([
    part(new THREE.BoxGeometry(2.3, 0.12, 0.18), { pos: [-2.2, 0.8, 1.0], color: '#8a5a34' }),
    part(new THREE.BoxGeometry(2.3, 0.12, 0.18), { pos: [-2.2, 0.8, -1.2], color: '#8a5a34' }),
    part(new THREE.CylinderGeometry(0.28, 0.28, 3.6, 7, 1), { pos: [-3.35, 0.32, -0.1], rot: [Math.PI / 2, 0, 0], color: '#e0b27a', faceVar: 0.1 }),
    part(new THREE.ConeGeometry(0.28, 0.6, 7, 1), { pos: [-3.35, 0.32, 2.0], rot: [Math.PI / 2, 0, 0], color: '#e0b27a' }),
  ]);
  // Teil Laterne: Pfahl am Bug, Gehäuse; das Glas leuchtet eigens (Bloom über 1.0)
  const laterne = merge([
    part(new THREE.CylinderGeometry(0.05, 0.06, 1.5, 5, 1), { pos: [0, 1.45, 2.6], color: '#3f4460' }),
    part(new THREE.BoxGeometry(0.34, 0.06, 0.34), { pos: [0, 2.22, 2.6], color: '#3f4460' }),
    part(new THREE.ConeGeometry(0.26, 0.2, 4, 1), { pos: [0, 2.72, 2.6], rot: [0, Math.PI / 4, 0], color: '#3f4460' }),
  ]);
  const glas = merge([part(new THREE.BoxGeometry(0.26, 0.36, 0.26), { pos: [0, 2.43, 2.6], color: '#ffe7a0' })]);
  return { hull, notsegel, segel, ausleger, laterne, glas };
}

export function createBoat({ game, speed = 8.5, turn = 1.9, variant = 'renn' } = {}) {
  const { scene, world, colliders } = game;
  const island = world.island;
  const g = new THREE.Group();
  g.name = variant === 'kielpost' ? 'kielpost' : 'rennboot';
  const tilt = new THREE.Group();   // Schaukeln/Schräglage (g trägt Position + Kurs)
  g.add(tilt);
  const disposables = [];
  const teilMeshes = {};
  let mat;
  if (variant === 'kielpost') {
    mat = game.materials && game.materials.lambertVC ? game.materials.lambertVC('kielpost') : new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    const M = kielpostMeshes();
    for (const [k, geo] of Object.entries(M)) {
      const m = new THREE.Mesh(geo, k === 'glas' ? new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.8, 0.9), toneMapped: false }) : mat);
      m.castShadow = k === 'hull' || k === 'segel';
      m.name = 'kielpost-' + k;
      tilt.add(m);
      disposables.push(geo);
      if (k !== 'hull') teilMeshes[k] = m;
    }
    teilMeshes.glas.visible = teilMeshes.laterne.visible = teilMeshes.segel.visible = teilMeshes.ausleger.visible = false;
  } else {
    const geo = rennMesh();
    mat = game.props && game.props.materials ? game.props.materials.base : new THREE.MeshLambertMaterial({ vertexColors: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    tilt.add(mesh);
    disposables.push(geo);
  }
  scene.add(g);
  const st = createBootState();
  st.spinT = 0;
  const deckY = () => st.y + 0.78;
  let surfaceOn = true;
  const surface = colliders ? colliders.addSurface({ type: 'circle', x: 0, z: 0, r: 400, group: 'mg-boot', surface: 'wood', height: (x, z) => (surfaceOn && Math.hypot(x - st.x, z - st.z) < 2.4 ? deckY() : -Infinity) }) : null;
  const waterY = (x, z) => (island.waterLevel ? island.waterLevel(x, z) : 0);
  const landAt = (x, z) => island.getHeight(x, z) > waterY(x, z) - 0.35;
  st.y = 0;
  const teile = { ausleger: false, segel: false, laterne: false };
  const seat = new THREE.Vector3();
  function syncMesh() {
    g.position.set(st.x, st.y, st.z);
    g.rotation.y = st.yaw;
  }
  const boat = {
    group: g, variant, state: st, teile,
    get x() { return st.x; }, get z() { return st.z; }, get y() { return st.y; }, get yaw() { return st.yaw; }, get speed() { return st.speed; },
    get deckY() { return deckY(); },
    get visible() { return g.visible; },
    set visible(v) { g.visible = !!v; surfaceOn = !!v; },
    // Sitzplatz auf der Bank am Heck (Welt), für die Figur
    get seat() {
      const c = Math.cos(st.yaw), s = Math.sin(st.yaw);
      const lz = -1.35;
      return seat.set(st.x + s * lz, st.y + 0.62 + st.bob, st.z + c * lz);
    },
    place(x, z, yaw = 0) { st.x = x; st.z = z; st.yaw = yaw; st.vx = st.vz = 0; st.speed = 0; st.turnRate = 0; st.boostT = 0; st.y = waterY(x, z); syncMesh(); tilt.rotation.set(0, 0, 0); },
    spin(seconds = 1.2) { st.spinT = seconds; st.speed = 0; st.vx = st.vz = 0; },
    setTeile(t = {}) {
      Object.assign(teile, t);
      if (variant !== 'kielpost') return;
      teilMeshes.ausleger.visible = !!teile.ausleger;
      teilMeshes.segel.visible = !!teile.segel;
      teilMeshes.notsegel.visible = !teile.segel;
      teilMeshes.laterne.visible = teilMeshes.glas.visible = !!teile.laterne;
    },
    // Rennen (unverändertes Verhalten aus WP36)
    update(dt, { move = { x: 0, y: 0 }, camYaw = 0, frozen = false } = {}) {
      st.t += dt;
      if (st.spinT > 0) { st.spinT -= dt; st.yaw += dt * 9; g.rotation.y = st.yaw; tilt.rotation.z = Math.sin(st.t * 14) * 0.15; return; }
      tilt.rotation.z = Math.sin(st.t * 1.7) * 0.03;
      if (!frozen) {
        if (Math.abs(move.x) > 0.05 && st.speed > 0.4) st.yaw -= move.x * turn * dt * Math.min(1, st.speed / 4);
        // Kamera-relativ: Vorwärts zeigt vom Bild weg; leichte Kurskorrektur zur Joystickrichtung
        if (Math.hypot(move.x, move.y) > 0.3) {
          const want = camYaw + Math.PI + Math.atan2(move.x, move.y);
          const d = wrap(want - st.yaw);
          st.yaw += d * Math.min(1, dt * 2.2);
          st.speed += (Math.hypot(move.x, move.y) * speed - st.speed) * Math.min(1, dt * 1.6);
        } else st.speed *= Math.max(0, 1 - dt * 0.9);
      } else st.speed *= Math.max(0, 1 - dt * 3);
      const nx = st.x + Math.sin(st.yaw) * st.speed * dt, nz = st.z + Math.cos(st.yaw) * st.speed * dt;
      if (landAt(nx, nz) || Math.hypot(nx, nz) > 235) { st.speed *= 0.2; }
      else { st.x = nx; st.z = nz; }
      st.y = waterY(st.x, st.z) + Math.sin(st.t * 2.1) * 0.05;
      syncMesh();
      tilt.rotation.x = -st.speed * 0.012;
    },
    // Kielpost: freies Fahren mit Fahrgefühl v1
    drive(dt, inp, env = {}) {
      const r = stepBoot(st, dt, inp, { ...env, teile });
      st.y = waterY(st.x, st.z) + st.bob;
      syncMesh();
      tilt.rotation.z = st.roll;
      tilt.rotation.x = st.pitch;
      // Notsegel/Segel: dicht = schmaler und straffer
      const s = teile.segel ? teilMeshes.segel : teilMeshes.notsegel;
      if (s) { const want = st.sail ? 0.55 : 1; s.scale.z += (want - s.scale.z) * Math.min(1, dt * 6); s.rotation.y = (st.sail ? -0.12 : 0.18) + Math.sin(st.t * 3) * 0.02; }
      return r;
    },
    // Ruhig am Anleger: nur Schaukeln
    idle(dt) { return boat.drive(dt, {}, {}); },
    landAt,
    dispose() { scene.remove(g); for (const geo of disposables) geo.dispose(); if (surface && colliders) colliders.remove(surface); },
  };
  return boat;
}
