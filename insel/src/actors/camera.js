// Third-Person-Kamera: weiches Folgen, Orbit per Wischen/Maus, Zoom (Pinch/Rad), dreht sich beim Laufen
// hinter die Figur, bleibt über dem Gelände. Bäume zwischen Figur und Kamera rücken die Kamera nur bis zu
// einem Mindestabstand heran (nie in den Kopf) und das sanft. Dazu der Kino-Anflug vom Meer zum Hafen.
import * as THREE from 'three';

const MIN_DIST = 3.2, MAX_DIST = 22;
const MIN_OCCLUDED = 3.6;   // näher rückt die Kamera wegen Bäumen nie heran
const OCC_PITCH = 0.4;      // bei Verdeckung hebt sich der Blick (über den Kopf hinweg)

// Nur dicke Stämme (Dschungelriesen) ziehen die Kamera heran; dünne Stämme dürfen kurz durchs Bild
const OCCLUDERS = new Set(['jungle']);

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
    mode: 'follow', // 'follow' | 'intro' | 'free' (für Zwischensequenzen: rig.setShot)
    occlusion: 1,   // aktueller Verkürzungsfaktor durch Bäume (1 = frei)
  };
  let idleLook = 10;
  const tmp = new THREE.Vector3();
  const desired = new THREE.Vector3();
  const shot = { pos: new THREE.Vector3(), look: new THREE.Vector3() };

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

  function place(dt, snap) {
    const p = player.position;
    const k = snap ? 1 : 1 - Math.exp(-dt * 9);
    const ky = snap ? 1 : 1 - Math.exp(-dt * 5);
    rig.focus.x += (p.x - rig.focus.x) * k;
    rig.focus.z += (p.z - rig.focus.z) * k;
    rig.focus.y += (p.y + rig.lookOffsetY - rig.focus.y) * ky;
    rig.dist += (rig.targetDist - rig.dist) * (snap ? 1 : 1 - Math.exp(-dt * 6));
    // Bei Verdeckung von oben schauen, damit der Kopf nicht das Bild füllt
    const lift = (1 - rig.occlusion) * OCC_PITCH;
    offset(rig.yaw, Math.min(1.25, rig.pitch + lift), rig.dist, tmp);
    desired.copy(rig.focus).add(tmp);
    // Gelände: sofort (nie unter dem Boden)
    const fTerrain = collide(rig.focus, desired);
    // Bäume: nur bis MIN_OCCLUDED heran, sanft (schnell hinein, langsam wieder hinaus)
    let fOcc = 1;
    if (colliders) {
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
    // nie unter Gelände oder Wasser
    const gh = Math.max(island.getHeight(desired.x, desired.z), island.waterLevel(desired.x, desired.z) + 0.15) + 0.6;
    if (desired.y < gh) desired.y = gh;
    if (snap) camera.position.copy(desired);
    else camera.position.lerp(desired, 1 - Math.exp(-dt * 14));
    camera.lookAt(rig.focus);
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
  rig.snap = () => { rig.dist = rig.targetDist; place(0, true); };
  // Blick hinter die Figur setzen
  rig.behindPlayer = () => { rig.yaw = player.yaw + Math.PI; };
  // Feste Kameraeinstellung (Dialoge, Zwischensequenzen); null = zurück zum Folgen
  rig.setShot = (pos, look) => {
    if (!pos) { rig.mode = 'follow'; return; }
    shot.pos.copy(pos); shot.look.copy(look); rig.mode = 'free';
  };

  rig.update = (dt) => {
    const st = input.state;
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
    // Eingabe
    const lx = st.look.dx, ly = st.look.dy;
    if (Math.abs(lx) + Math.abs(ly) > 0.5) idleLook = 0; else idleLook += dt;
    rig.yaw -= lx * rig.sensitivity;
    rig.pitch = THREE.MathUtils.clamp(rig.pitch + ly * rig.sensitivity * 0.8, -0.2, 1.25);
    if (st.zoom) rig.targetDist = THREE.MathUtils.clamp(rig.targetDist + st.zoom * 0.9, MIN_DIST, MAX_DIST);
    // Hinter die Figur drehen, wenn sie läuft
    const sp = player.speed;
    if (rig.autoRotate && idleLook > 1.2 && sp > 1.2 && dt > 0) {
      const want = player.yaw + Math.PI;
      let d = want - rig.yaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      if (Math.abs(d) < 2.3) rig.yaw += d * Math.min(1, dt * 0.9 * (sp / 6));
      // Neigung sanft zum Standard zurück
      rig.pitch += (0.24 - rig.pitch) * Math.min(1, dt * 0.4);
    }
    place(dt, false);
    player.setCameraYaw(rig.yaw);
  };

  // FOV für Hoch-/Querformat
  rig.onResize = (size) => {
    camera.aspect = size.aspect;
    camera.fov = size.portrait ? 68 : 55;
    camera.updateProjectionMatrix();
  };
  return rig;
}
