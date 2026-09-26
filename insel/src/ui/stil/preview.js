// Drehteller-Vorschau (WP41): eigene kleine Szene mit eigenem Renderer auf einem Canvas im Overlay. Die Figur dreht
// sich langsam, per Wischen dreht man selbst, Emotes lassen sich vorführen; Nahaufnahme für Kopf-Register.
//   const pv = createPreview({ canvas, quality }); pv.setConfig(cfg); pv.focus('kopf'|'ganz'); pv.playEmote('winken');
//   pv.rotate(rad); pv.start(); pv.stop(); pv.resize(); pv.dispose()
import * as THREE from 'three';
import { createHumanoid } from '../../actors/humanoid/index.js';

export function createPreview({ canvas, quality = 'medium' } = {}) {
  let renderer = null;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 30);
  const hemi = new THREE.HemisphereLight('#dfefff', '#4a3a5a', 1.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#fff2dc', 1.4);
  sun.position.set(2.2, 4, 3);
  scene.add(sun);
  const rim = new THREE.DirectionalLight('#8fa3ff', 0.7);
  rim.position.set(-2, 2.5, -3);
  scene.add(rim);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(0.9, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#2b1850', transparent: true, opacity: 0.55 }));
  floor.position.y = 0.005;
  scene.add(floor);
  const pivot = new THREE.Group();
  scene.add(pivot);
  let humanoid = null;
  let yaw = 0.35, spin = 0.35, auto = true, autoPause = 0;
  let focusMode = 'ganz', camT = 0;
  const camFrom = new THREE.Vector3(), camTo = new THREE.Vector3(0, 1.1, 3.9), lookFrom = new THREE.Vector3(), lookTo = new THREE.Vector3(0, 0.95, 0), lookCur = new THREE.Vector3(0, 0.95, 0);
  camera.position.copy(camTo);
  let running = false, raf = 0, last = 0;

  function ensureRenderer() {
    if (renderer) return renderer;
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: quality !== 'low', powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality === 'low' ? 1 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    return renderer;
  }
  function targets() {
    const h = humanoid ? humanoid.height : 2;
    // Rahmung lässt oben Platz für den Spielnamen und unten für die Drehknöpfe (FOV 30°)
    if (focusMode === 'kopf') { camTo.set(0, h * 0.84, 1.55); lookTo.set(0, h * 0.8, 0); }
    else if (focusMode === 'oben') { camTo.set(0, h * 0.7, 2.5); lookTo.set(0, h * 0.6, 0); }
    else if (focusMode === 'unten') { camTo.set(0, h * 0.32, 2.6); lookTo.set(0, h * 0.26, 0); }
    else { camTo.set(0, h * 0.62, 3.0 * h); lookTo.set(0, h * 0.44, 0); }
  }
  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    if (autoPause > 0) autoPause -= dt; else if (auto) spin += dt * 0.35;
    yaw += (spin - yaw) * Math.min(1, dt * 8);
    pivot.rotation.y = yaw;
    camT = Math.min(1, camT + dt * 3);
    camera.position.lerpVectors(camFrom, camTo, smooth(camT));
    lookCur.lerpVectors(lookFrom, lookTo, smooth(camT));
    camera.lookAt(lookCur);
    if (humanoid) humanoid.update(dt, camera);
    ensureRenderer().render(scene, camera);
  }
  const smooth = (t) => t * t * (3 - 2 * t);

  const pv = {
    scene, camera, pivot,
    get humanoid() { return humanoid; },
    get yaw() { return yaw; },
    setConfig(cfg, { anim = 'idle' } = {}) {
      if (humanoid) { humanoid.setConfig(cfg); }
      else {
        humanoid = createHumanoid(cfg, { name: 'stil-vorschau' });
        pivot.add(humanoid.group);
      }
      humanoid.setAnim(anim);
      targets();
      return humanoid;
    },
    focus(mode) { if (mode === focusMode) return; focusMode = mode; camFrom.copy(camera.position); lookFrom.copy(lookCur); camT = 0; targets(); },
    playEmote(name) { if (humanoid) { autoPause = 3; spin = 0; return humanoid.playEmote(name); } return Promise.resolve({ done: false }); },
    stopEmote() { if (humanoid) humanoid.stopEmote(); },
    rotate(d) { spin += d; autoPause = 2.5; },
    setAuto(v) { auto = !!v; },
    front() { spin = 0; autoPause = 3; },
    resize() {
      const r = ensureRenderer();
      const w = Math.max(1, canvas.clientWidth | 0), h = Math.max(1, canvas.clientHeight | 0);
      r.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    },
    start() { if (running) return; running = true; last = performance.now(); pv.resize(); raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); },
    renderOnce() { pv.resize(); if (humanoid) humanoid.update(0.016, camera); ensureRenderer().render(scene, camera); },
    dispose() {
      pv.stop();
      if (humanoid) { pivot.remove(humanoid.group); humanoid.dispose(); humanoid = null; }
      floor.geometry.dispose(); floor.material.dispose();
      if (renderer) { renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) { /* egal */ } renderer = null; }
    },
  };
  return pv;
}
