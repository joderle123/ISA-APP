// Third-Person-Kamera (WP19): weiches Folgen, Orbit per Wischen/Maus, Zoom (Pinch/Rad), dreht sich beim Laufen
// hinter die Figur, bleibt über dem Gelände. Bäume zwischen Figur und Kamera rücken die Kamera nur bis zu einem
// Mindestabstand heran (nie in den Kopf). Dazu der Kino-Anflug vom Meer zum Hafen.
// Modi: rig.mode = 'follow' (alle Bewegungs-Ansichten) | 'intro' | 'free' (setShot) | 'talk' | 'photo'
//   rig.viewMode = 'follow' | 'glide' | 'climb' | 'swim' | 'dive' (vom Spieler-Zustand, player.cameraMode)
//   rig.setMode('talk', { target: Vector3|Object3D, side: ±1 }) · rig.setMode('photo') · rig.setMode(null) (zurück)
//   rig.shake(strength, seconds) (reducedFx dämpft) · rig.reducedFx · rig.bounds (Innenraum-Box, z. B. Tauchen)
import * as THREE from 'three';

const MIN_DIST = 3.2, MAX_DIST = 22;
const MIN_OCCLUDED = 3.6;   // näher rückt die Kamera wegen Bäumen nie heran
const OCC_PITCH = 0.4;      // bei Verdeckung hebt sich der Blick (über den Kopf hinweg)

// Nur dicke Stämme (Dschungelriesen) ziehen die Kamera heran; dünne Stämme dürfen kurz durchs Bild
const OCCLUDERS = new Set(['jungle', 'mangrove', 'podest']);

// Ansichten je Bewegungszustand: Abstand/Neigung/Blickhöhe/FOV-Zuschlag/Folge-Tempo
const VIEWS = {
  follow: { dist: 0, pitchMin: -0.2, pitchMax: 1.25, lookY: 1.6, fov: 0, follow: 9, behind: 0.9 },
  glide: { dist: 3.2, pitchMin: 0.3, pitchMax: 1.2, lookY: 1.1, fov: 9, follow: 14, behind: 2.6 },
  climb: { dist: -2.2, pitchMin: -0.35, pitchMax: 0.9, lookY: 1.5, fov: 2, follow: 10, behind: 1.6 },
  swim: { dist: 0.5, pitchMin: 0.22, pitchMax: 1.2, lookY: 0.9, fov: 0, follow: 9, behind: 0.9 },
  dive: { dist: -1.2, pitchMin: -0.7, pitchMax: 1.2, lookY: 0.9, fov: 5, follow: 9, behind: 1.2 },
};

export function createCameraRig({ camera, island, input, player, events, colliders }) {
  const rig = {
    yaw: island.spawn.yaw + Math.PI,
    pitch: 0.24,
    dist: 8.5,
    targetDist: 8.5,
    focus: new THREE.Vector3(),
    lookOffsetY: 1.6,
    autoRotate: true,
    sensitivity: 0.0055,
    intro: null,
    mode: 'follow', // 'follow' | 'intro' | 'free' (setShot) | 'talk' | 'photo'
    viewMode: 'follow',
    occlusion: 1,   // aktueller Verkürzungsfaktor durch Bäume (1 = frei)
    reducedFx: false,
    bounds: null,   // { min:{x,y,z}, max:{x,y,z} } – Kamera bleibt im Raum (Tauchen/Innenräume)
    baseFov: 55,
    fovOffset: 0,
  };
  let idleLook = 10;
  const tmp = new THREE.Vector3();
  const desired = new THREE.Vector3();
  const shot = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
  const talk = { target: null, side: 1, t: 0 };
  const photo = { pan: new THREE.Vector3(), t: 0 };
  let shake = { amp: 0, t: 0, dur: 0 };
  let fovCur = 55;
  let viewDist = 0, viewLookY = 1.6;
  let lastView = 'follow';

  function offset(yaw, pitch, dist, out) {
    return out.set(Math.sin(yaw) * Math.cos(pitch) * dist, Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
  }

  // Abstand verkürzen, wenn Gelände zwischen Fokus und Kamera liegt
  function collide(focus, want) {
    const steps = 10;
    let allowed = 1;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = focus.x + (want.x - focus.x) * t, y = focus.y + (want.y - focus.y) * t, z = focus.z + (want.z - focus.z) * t;
      const h = island.getHeight(x, z) + 0.55;
      if (h > y) { allowed = Math.max(0.15, (i - 1) / steps); break; }
    }
    return allowed;
  }
  // Steht der Punkt in einer Baumkrone?
  function inCanopy(x, z, y) {
    const list = colliders.query(x, z, 0.5);
    for (const o of list) {
      const c = o.canopy;
      if (!c) continue;
      if (y >= c.yMin && y <= c.yMax && Math.hypot(x - o.x, z - o.z) < c.r + 0.5) return true;
    }
    return false;
  }
  function applyShake(dt) {
    if (shake.t <= 0) return;
    shake.t -= dt;
    const k = Math.max(0, shake.t / shake.dur) * shake.amp * (rig.reducedFx ? 0.2 : 1);
    if (k <= 0.001) return;
    const t = performance.now() / 1000;
    camera.position.x += Math.sin(t * 37) * 0.08 * k;
    camera.position.y += Math.sin(t * 29 + 1) * 0.06 * k;
    camera.position.z += Math.cos(t * 41 + 2) * 0.08 * k;
  }

  function place(dt, snap) {
    const p = player.position;
    const view = VIEWS[rig.viewMode] || VIEWS.follow;
    const k = snap ? 1 : 1 - Math.exp(-dt * view.follow);
    const ky = snap ? 1 : 1 - Math.exp(-dt * (rig.viewMode === 'glide' ? 8 : 5));
    viewDist += (view.dist - viewDist) * (snap ? 1 : 1 - Math.exp(-dt * 3));
    viewLookY += (view.lookY - viewLookY) * (snap ? 1 : 1 - Math.exp(-dt * 4));
    rig.lookOffsetY = viewLookY;
    rig.focus.x += (p.x - rig.focus.x) * k;
    rig.focus.z += (p.z - rig.focus.z) * k;
    rig.focus.y += (p.y + rig.lookOffsetY - rig.focus.y) * ky;
    if (rig.mode === 'photo') rig.focus.add(photo.pan);
    const wantDist = THREE.MathUtils.clamp(rig.targetDist + viewDist, rig.mode === 'photo' ? 1.5 : MIN_DIST, rig.mode === 'photo' ? 40 : MAX_DIST + 6);
    rig.dist += (wantDist - rig.dist) * (snap ? 1 : 1 - Math.exp(-dt * 6));
    // Bei Verdeckung von oben schauen, damit der Kopf nicht das Bild füllt
    const lift = (1 - rig.occlusion) * OCC_PITCH;
    offset(rig.yaw, Math.min(1.35, rig.pitch + lift), rig.dist, tmp);
    desired.copy(rig.focus).add(tmp);
    const indoor = !!rig.bounds;
    // Gelände: sofort (nie unter dem Boden)
    const fTerrain = indoor ? 1 : collide(rig.focus, desired);
    // Bäume: nur bis MIN_OCCLUDED heran, sanft (schnell hinein, langsam wieder hinaus)
    let fOcc = 1;
    if (colliders && !indoor) {
      const th = colliders.segmentHit(rig.focus.x, rig.focus.z, desired.x, desired.z, 0.35, rig.focus.y, desired.y, (o) => OCCLUDERS.has(o.tag));
      // Baumkronen zählen nur, wenn die Kamera selbst in einer Krone landen würde
      let tc = 1;
      if (inCanopy(desired.x, desired.z, desired.y)) {
        tc = colliders.segmentHit(rig.focus.x, rig.focus.z, desired.x, desired.z, 0.5, rig.focus.y, desired.y, null, (o) => o.canopy);
      }
      const tt = Math.min(th, tc);
      if (tt < 1) fOcc = Math.max(tt - 0.04, MIN_OCCLUDED / Math.max(rig.dist, 0.01));
      fOcc = Math.min(1, fOcc);
    }
    if (snap) rig.occlusion = fOcc;
    else {
      const rate = fOcc < rig.occlusion ? 10 : 2.2;
      rig.occlusion += (fOcc - rig.occlusion) * (1 - Math.exp(-dt * rate));
    }
    const f = Math.min(fTerrain, rig.occlusion);
    if (f < 1) desired.copy(rig.focus).addScaledVector(tmp, f);
    if (indoor) {
      const b = rig.bounds, m = 0.6;
      desired.x = THREE.MathUtils.clamp(desired.x, b.min.x + m, b.max.x - m);
      desired.y = THREE.MathUtils.clamp(desired.y, b.min.y + m, b.max.y - m);
      desired.z = THREE.MathUtils.clamp(desired.z, b.min.z + m, b.max.z - m);
    } else {
      // nie unter Gelände oder Wasser (beim Schwimmen knapp über der Oberfläche)
      const gh = Math.max(island.getHeight(desired.x, desired.z), island.waterLevel(desired.x, desired.z) + 0.15) + 0.6;
      if (desired.y < gh) desired.y = gh;
    }
    if (snap) camera.position.copy(desired);
    else camera.position.lerp(desired, 1 - Math.exp(-dt * 14));
    camera.lookAt(rig.focus);
    applyShake(dt);
    // FOV je Ansicht
    const wantFov = rig.baseFov + view.fov + rig.fovOffset;
    fovCur += (wantFov - fovCur) * (snap ? 1 : 1 - Math.exp(-dt * 4));
    if (Math.abs(camera.fov - fovCur) > 0.05) { camera.fov = fovCur; camera.updateProjectionMatrix(); }
  }

  // ---- Intro-Anflug ----
  function startIntro({ duration = 9, onDone } = {}) {
    const sp = player.position;
    offset(rig.yaw, rig.pitch, rig.targetDist, tmp);
    const endPos = new THREE.Vector3(sp.x, sp.y + rig.lookOffsetY, sp.z).add(tmp);
    const endLook = new THREE.Vector3(sp.x, sp.y + rig.lookOffsetY, sp.z);
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-150, 60, 320),
      new THREE.Vector3(-70, 42, 265),
      new THREE.Vector3(10, 26, 215),
      new THREE.Vector3(24, 12, 178),
      endPos.clone().add(new THREE.Vector3(3, 2.5, 6)),
      endPos,
    ], false, 'centripetal');
    const lookPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 30, 80),
      new THREE.Vector3(0, 30, 20),
      new THREE.Vector3(0, 20, 40),
      new THREE.Vector3(sp.x, sp.y + 6, sp.z - 30),
      endLook.clone().add(new THREE.Vector3(0, 0.5, -4)),
      endLook,
    ], false, 'centripetal');
    rig.intro = { t: 0, duration, path, lookPath, onDone };
    rig.mode = 'intro';
    events && events.emit('camera:intro:start');
  }
  function endIntro() {
    if (!rig.intro) return;
    const cb = rig.intro.onDone;
    rig.intro = null;
    rig.mode = 'follow';
    rig.snap();
    events && events.emit('camera:intro:end');
    if (cb) cb();
  }

  rig.startIntro = startIntro;
  rig.skipIntro = endIntro;
  rig.snap = () => { rig.dist = rig.targetDist + viewDist; place(0, true); };
  // Blick hinter die Figur setzen
  rig.behindPlayer = () => { rig.yaw = player.yaw + Math.PI; };
  // Feste Kameraeinstellung (Dialoge, Zwischensequenzen); null = zurück zum Folgen
  rig.setShot = (pos, look) => {
    if (!pos) { rig.mode = 'follow'; return; }
    shot.pos.copy(pos); shot.look.copy(look); rig.mode = 'free';
  };
  // Sondermodi: 'talk' {target, side} · 'photo' · null (zurück zum Folgen)
  rig.setMode = (name, opts = {}) => {
    if (rig.mode === 'intro') return false;
    if (!name || name === 'follow') { if (rig.mode === 'talk' || rig.mode === 'photo') { rig.mode = 'follow'; events && events.emit('camera:mode', { mode: 'follow' }); } return true; }
    if (name === 'talk') { talk.target = opts.target || null; talk.side = opts.side || 1; talk.t = 0; rig.mode = 'talk'; }
    else if (name === 'photo') { photo.pan.set(0, 0, 0); photo.t = 0; rig.mode = 'photo'; }
    else if (name === 'free') { rig.mode = 'free'; }
    else return false;
    events && events.emit('camera:mode', { mode: rig.mode });
    return true;
  };
  rig.shake = (strength = 1, seconds = 0.5) => { shake = { amp: Math.max(shake.t > 0 ? shake.amp : 0, strength), t: seconds, dur: seconds }; };
  rig.photoPan = photo.pan;

  function talkTarget(out) {
    const t = talk.target;
    if (!t) return out.copy(player.position).add(tmp.set(Math.sin(player.yaw) * 2.5, 1.5, Math.cos(player.yaw) * 2.5));
    if (t.isObject3D) return t.getWorldPosition(out).add(tmp.set(0, 1.5, 0));
    return out.set(t.x, (t.y || 0) + 1.5, t.z);
  }
  const tA = new THREE.Vector3(), tB = new THREE.Vector3(), tMid = new THREE.Vector3();

  rig.update = (dt) => {
    const st = input.state;
    // Ansicht aus dem Spieler-Zustand
    const vm = player.cameraMode || 'follow';
    if (vm !== rig.viewMode) {
      rig.viewMode = vm;
      if (vm === 'glide' || vm === 'climb') idleLook = 10;
      lastView = vm;
      events && events.emit('camera:view', { view: vm });
    }
    if (rig.mode === 'intro' && rig.intro) {
      const it = rig.intro;
      it.t += dt;
      const u = Math.min(1, it.t / it.duration);
      const e = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
      camera.position.copy(it.path.getPointAt(e));
      camera.lookAt(it.lookPath.getPointAt(Math.min(1, e * 1.02)));
      if (u >= 1) endIntro();
      player.setCameraYaw(rig.yaw);
      return;
    }
    if (rig.mode === 'free') {
      camera.position.lerp(shot.pos, 1 - Math.exp(-dt * 3));
      tmp.copy(shot.look);
      camera.lookAt(tmp);
      return;
    }
    if (rig.mode === 'talk') {
      // Über-die-Schulter: Figur links/rechts im Bild, Gesprächspartner gegenüber
      talk.t += dt;
      tA.copy(player.position).add(tmp.set(0, 1.5, 0));
      talkTarget(tB);
      tMid.copy(tA).lerp(tB, 0.5);
      const dir = tmp.copy(tB).sub(tA); dir.y = 0;
      const d = Math.max(1.5, dir.length()); dir.normalize();
      const side = tmp.set(-dir.z, 0, dir.x).multiplyScalar(talk.side * 1.3);
      desired.copy(tA).addScaledVector(dir, -2.2 - d * 0.4).add(side); desired.y = tA.y + 0.45 + d * 0.1;
      const gh = island.getHeight(desired.x, desired.z) + 0.6;
      if (desired.y < gh) desired.y = gh;
      const kk = talk.t < 0.05 ? 1 : 1 - Math.exp(-dt * 4);
      camera.position.lerp(desired, kk);
      rig.focus.lerp(tMid, kk);
      camera.lookAt(rig.focus);
      player.setCameraYaw(Math.atan2(camera.position.x - rig.focus.x, camera.position.z - rig.focus.z));
      return;
    }
    // Eingabe (Folgen und Foto)
    const lx = st.look.dx, ly = st.look.dy;
    if (Math.abs(lx) + Math.abs(ly) > 0.5) idleLook = 0; else idleLook += dt;
    const view = VIEWS[rig.viewMode] || VIEWS.follow;
    rig.yaw -= lx * rig.sensitivity;
    const pMin = rig.mode === 'photo' ? -1.2 : view.pitchMin, pMax = rig.mode === 'photo' ? 1.45 : view.pitchMax;
    rig.pitch = THREE.MathUtils.clamp(rig.pitch + ly * rig.sensitivity * 0.8, pMin, pMax);
    if (st.zoom) rig.targetDist = THREE.MathUtils.clamp(rig.targetDist + st.zoom * 0.9, rig.mode === 'photo' ? 1.5 : MIN_DIST, rig.mode === 'photo' ? 40 : MAX_DIST);
    if (rig.mode === 'photo') {
      // Joystick schwenkt den Bildausschnitt, Springen/Aktion heben und senken
      const fx = -Math.sin(rig.yaw), fz = -Math.cos(rig.yaw), rx = Math.cos(rig.yaw), rz = -Math.sin(rig.yaw);
      photo.pan.x += (rx * st.move.x + fx * st.move.y) * dt * 4;
      photo.pan.z += (rz * st.move.x + fz * st.move.y) * dt * 4;
      photo.pan.y += ((st.jumpHeld ? 1 : 0) - (st.actionHeld ? 1 : 0)) * dt * 3;
      photo.pan.clampLength(0, 12);
      // Fokus liegt fest auf der Figur + Schwenk (kein Nachziehen)
      rig.focus.set(player.position.x, player.position.y + rig.lookOffsetY, player.position.z);
      place(dt, false);
      return;
    }
    // Hinter die Figur drehen, wenn sie läuft (im Flug und beim Klettern stärker)
    const sp = player.speed;
    const moving = rig.viewMode === 'glide' || rig.viewMode === 'climb' ? true : sp > 1.2;
    if (rig.autoRotate && idleLook > (rig.viewMode === 'glide' ? 0.6 : 1.2) && moving && dt > 0) {
      const want = player.yaw + Math.PI;
      let d = want - rig.yaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      const rate = view.behind * (rig.viewMode === 'glide' || rig.viewMode === 'climb' ? 1 : Math.min(1, sp / 6));
      if (Math.abs(d) < 2.3 || rig.viewMode !== 'follow') rig.yaw += d * Math.min(1, dt * rate);
      // Neigung sanft zum Standard zurück
      const p0 = rig.viewMode === 'glide' ? 0.42 : rig.viewMode === 'climb' ? 0.08 : 0.24;
      rig.pitch += (p0 - rig.pitch) * Math.min(1, dt * 0.4);
    }
    place(dt, false);
    player.setCameraYaw(rig.yaw);
  };

  // FOV für Hoch-/Querformat
  rig.onResize = (size) => {
    camera.aspect = size.aspect;
    rig.baseFov = size.portrait ? 68 : 55;
    fovCur = rig.baseFov + (VIEWS[rig.viewMode] || VIEWS.follow).fov + rig.fovOffset;
    camera.fov = fovCur;
    camera.updateProjectionMatrix();
  };
  return rig;
}
