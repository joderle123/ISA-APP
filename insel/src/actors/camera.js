// Third-Person-Kamera: weiches Folgen, Orbit per Wischen/Maus, Zoom (Pinch/Rad), dreht sich beim Laufen
// hinter die Figur, bleibt über dem Gelände. Dazu der Kino-Anflug vom Meer zum Hafen beim ersten Start.
import * as THREE from 'three';

const MIN_DIST = 3.2, MAX_DIST = 22;

export function createCameraRig({ camera, island, input, player, events }) {
  const rig = {
    yaw: island.spawn.yaw + Math.PI,
    pitch: 0.32,
    dist: 8.5,
    targetDist: 8.5,
    focus: new THREE.Vector3(),
    lookOffsetY: 1.45,
    autoRotate: true,
    sensitivity: 0.0055,
    intro: null,
    mode: 'follow', // 'follow' | 'intro' | 'free' (für Zwischensequenzen: rig.setShot)
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

  function place(dt, snap) {
    const p = player.position;
    const k = snap ? 1 : 1 - Math.exp(-dt * 9);
    const ky = snap ? 1 : 1 - Math.exp(-dt * 5);
    rig.focus.x += (p.x - rig.focus.x) * k;
    rig.focus.z += (p.z - rig.focus.z) * k;
    rig.focus.y += (p.y + rig.lookOffsetY - rig.focus.y) * ky;
    rig.dist += (rig.targetDist - rig.dist) * (snap ? 1 : 1 - Math.exp(-dt * 6));
    offset(rig.yaw, rig.pitch, rig.dist, tmp);
    desired.copy(rig.focus).add(tmp);
    const f = collide(rig.focus, desired);
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
      rig.pitch += (0.3 - rig.pitch) * Math.min(1, dt * 0.4);
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
