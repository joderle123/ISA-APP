// Spiel-Objekt: erzeugt und verbindet alle Module. Auch als window.LUMO verfügbar (Tests, Konsole).
import * as THREE from 'three';
import { createEvents } from './engine/events.js';
import { createLoop } from './engine/loop.js';
import { createInput } from './engine/input.js';
import { createAudio } from './engine/audio.js';
import { createRenderer, detectQuality, QUALITY } from './engine/renderer.js';
import { createParticles } from './engine/particles.js';
import { createInteractions } from './engine/interactions.js';
import { createIsland, ZONES } from './world/island.js';
import { createVeil } from './world/veil.js';
import { createTerrain } from './world/terrain.js';
import { createWater } from './world/water.js';
import { createSky } from './world/sky.js';
import { createVegetation } from './world/vegetation.js';
import { createColliders } from './world/colliders.js';
import { createLandmarks, lambertVC } from './world/landmarks.js';
import { part, merge, frond, tint } from './world/geom.js';
import { createLife } from './world/life.js';
import { createPlayer } from './actors/player.js';
import { createCameraRig } from './actors/camera.js';
import { createHumanoid } from './actors/humanoid.js';
import { createHUD } from './ui/hud.js';

const SETTINGS_KEY = 'lumo.settings';
function loadSettings() {
  const def = { quality: 'auto', volume: 0.8, introSeen: false, look: null };
  try { return { ...def, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; } catch (e) { return def; }
}
function saveSettings(s) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) { /* privat-Modus */ } }
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

export async function createGame({ canvas, root, hudRoot, onProgress = () => {} }) {
  const params = new URLSearchParams(location.search);
  const step = async (p, label) => { onProgress(p, label); await nextFrame(); };
  const events = createEvents();
  const settings = loadSettings();
  const qInfo = detectQuality();
  const rr = createRenderer({ canvas, quality: qInfo, events });
  const renderer = rr.renderer;
  const q0 = rr.quality;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.3, 1600);
  camera.position.set(-150, 60, 320);
  camera.lookAt(0, 20, 60);
  const input = createInput({ root, events });
  const audio = createAudio();
  audio.setVolume(settings.volume);

  await step(0.08, 'Die Insel taucht auf …');
  const island = createIsland({ cell: q0.terrainCell });
  const veil = createVeil({ events, audio });
  await step(0.22, 'Berge und Strände wachsen …');
  const terrain = createTerrain({ island, veil, quality: q0 });
  scene.add(terrain.mesh);
  await step(0.38, 'Das Meer rauscht …');
  const water = createWater({ island, veil, quality: q0, scene });
  const sky = createSky({ scene, renderer, audio, quality: q0, events });
  const colliders = createColliders();
  await step(0.5, 'Palmen sprießen …');
  const vegetation = createVegetation({ island, veil, colliders, quality: q0, scene });
  await step(0.66, 'Möwen kreisen …');
  const particles = createParticles(scene);
  const landmarks = createLandmarks({ island, veil, colliders, scene });
  const life = createLife({ island, veil, scene, quality: q0 });
  particles.setBudget(q0.particles);
  const player = createPlayer({ scene, island, colliders, input, audio, particles, events, look: settings.look });
  const cameraRig = createCameraRig({ camera, island, input, player, events, colliders });

  const game = {
    THREE,
    scene, camera, renderer, events, input, audio, particles, colliders, settings,
    world: { island, terrain, water, sky, veil, vegetation, landmarks, life },
    player, cameraRig,
    ui: null, interactions: null, loop: null,
    time: sky.time,
    quality: {
      get name() { return rr.qualityName; },
      get tier() { return rr.quality; },
      get dpr() { return renderer.getPixelRatio(); },
      monitor: rr.monitor,
      set: (n) => game.setQuality(n),
    },
    zone: null,
    started: false,
    createHumanoid: (cfg, opts = {}) => createHumanoid(cfg, { ...opts, veil: opts.veil === false ? null : veil }),
    // Figur erzeugen, auf den Boden stellen, zur Szene hinzufügen und jedes Frame animieren
    spawnHumanoid(cfg, { x = 0, z = 0, yaw = 0, anim = 'idle', veil: useVeil = true, name } = {}) {
      const h = createHumanoid(cfg, { veil: useVeil ? veil : null, name });
      h.group.position.set(x, island.getHeight(x, z), z);
      h.group.rotation.y = yaw;
      h.setAnim(anim);
      scene.add(h.group);
      const off = game.addUpdate((dt) => h.update(dt));
      return { humanoid: h, remove() { off(); scene.remove(h.group); h.dispose(); } };
    },
    // Helfer für Requisiten: Low-Poly-Teile + Material mit Grauschleier/Nebel
    geom: { part, merge, frond, tint },
    materials: { lambertVC: (key, opts) => lambertVC(veil, key, opts) },
    addUpdate(fn, opts) { return game.loop.add(fn, opts); },
    setPaused(p) { game.loop.setPaused(p); if (p) input.releaseAll(); events.emit('pause', !!p); },
    get paused() { return game.loop.paused; },
    setQuality(name, opts) { rr.setQuality(name, opts); },
    setQualitySetting(v) {
      settings.quality = v; saveSettings(settings);
      if (v === 'auto') { rr.monitor.enabled = true; } else rr.setQuality(v);
      if (v !== 'auto') ui.toast('Grafik: ' + QUALITY[v].label);
    },
    setVolume(v) { settings.volume = v; audio.setVolume(v); saveSettings(settings); },
    saveSettings: () => saveSettings(settings),
  };

  const ui = createHUD({ root: hudRoot, input, events, audio, game });
  const interactions = createInteractions({ events, ui, input });
  game.ui = ui;
  game.interactions = interactions;
  // Beispiel-Interaktion: Boot am Steg (zeigt den Aktion-Knopf)
  interactions.add({
    id: 'boot', x: landmarks.boat.position.x, z: landmarks.boat.position.z, radius: 4.2, label: 'Ansehen',
    onAction: () => { audio.play('chime'); ui.toast('Das Boot der Kapitänin. Damit bist du angekommen!'); },
  });

  // ---- Größe ----
  rr.onResize((size) => {
    cameraRig.onResize(size);
    const h = renderer.domElement.height;
    particles.setViewport(h, camera.fov);
    life.setViewport(h, camera.fov);
  });

  // ---- Qualität ----
  function applyQuality(q) {
    sky.setQuality(q);
    vegetation.setQuality(q);
    water.setQuality(q);
    particles.setBudget(q.particles);
    camera.far = Math.max(900, q.drawDistance * 1.6);
    camera.updateProjectionMatrix();
    scene.traverse((o) => {
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.needsUpdate = true; });
    });
  }
  applyQuality(q0);
  events.on('quality', (e) => {
    applyQuality(e.quality);
    if (e.auto) ui.toast('Grafik angepasst: ' + e.quality.label);
  });

  // ---- Schleife ----
  const loop = createLoop({ render: () => renderer.render(scene, camera) });
  game.loop = loop;
  let zoneT = 0, ambT = 0;
  loop.add(() => input.beginFrame(), { order: -100, always: true });
  loop.add((dt) => { if (game.started) player.update(dt); else player.update(0); }, { order: -50 });
  loop.add((dt, t, real) => {
    if (!game.started && cameraRig.mode === 'follow') return; // Startbild: Blick vom Meer
    cameraRig.update(game.paused ? 0 : real);
  }, { order: -40, always: true });
  loop.add((dt) => interactions.update(dt, player), { order: -30 });
  loop.add((dt, t) => veil.update(dt, t), { order: -20 });
  loop.add((dt, t) => {
    camera.updateMatrixWorld();
    sky.update(dt, t, camera, player.position, veil);
    water.syncSky(sky);
    water.update(dt, t, particles, camera.position);
    vegetation.update(camera);
    landmarks.update(dt, t, sky.night, particles);
    life.update(dt, t, player.position, sky.night);
    particles.update(dt);
  }, { order: -10, always: true });
  let moteT = 0;
  const rainbow = [0xff5d73, 0xffb347, 0xffe14d, 0x7ce36a, 0x4fd6ff, 0xb58cff];
  loop.add((dt) => {
    // Funken entlang der Farbwelle
    const w = veil.wave;
    if (w && dt > 0) {
      const n = Math.round(10 * q0.particles);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const x = w.x + Math.cos(a) * w.radius, z = w.z + Math.sin(a) * w.radius;
        if (Math.hypot(x - camera.position.x, z - camera.position.z) > 110) continue;
        const y = Math.max(island.getHeight(x, z), island.waterLevel(x, z)) + 0.3;
        particles.emit({ x, y, z, count: 1, spread: 1.5, speed: 0.6, up: 3 + Math.random() * 3, color: rainbow[i % rainbow.length], size: 0.7, life: 1.6, gravity: -0.6, drag: 0.8, additive: true, alpha: 1 });
      }
    }
    // Graue Schwebeteilchen im Schleier
    moteT += dt;
    if (moteT > 0.12 && game.started) {
      moteT = 0;
      const p = player.position;
      if (veil.amountAt(p.x, p.z) > 0.45) {
        particles.emit({ x: p.x + (Math.random() - 0.5) * 16, y: p.y + 0.5 + Math.random() * 3, z: p.z + (Math.random() - 0.5) * 16, count: 1, speed: 0.2, up: 0.15, color: 0xb9b6c8, size: 0.16, life: 3.5, gravity: 0.05, drag: 0.2, grow: 0.2, alpha: 0.7 });
      }
    }
  }, { order: 5 });
  loop.add((dt) => {
    zoneT += dt;
    if (zoneT > 0.25 && game.started && cameraRig.mode === 'follow') {
      zoneT = 0;
      const z = island.zoneAt(player.position.x, player.position.z);
      if (z !== game.zone) {
        const prev = game.zone;
        game.zone = z;
        if (z) {
          const Z = island.zoneById(z);
          ui.showZone(Z.name, veil.isVeiled(z) ? 'Der Grauschleier liegt hier' : 'Hier leuchten die Farben');
          audio.play('chime');
        }
        events.emit('zone:change', { id: z, prev });
      }
    }
    ambT += dt;
    if (ambT > 0.5) {
      ambT = 0;
      const D = island.coastDist(player.position.x, player.position.z);
      audio.setAmbience({ waves: Math.max(0.12, Math.min(1, 1 - D / 70)) });
    }
    audio.update();
  }, { order: 10 });
  loop.add((dt, t, real) => ui.update(real, game), { order: 90, always: true });
  loop.add((dt, t, real) => rr.tickMonitor(real), { order: 95, always: true });
  loop.add(() => input.endFrame(), { order: 100, always: true });

  // ---- Start / Intro ----
  game.start = ({ intro } = {}) => {
    if (game.started) return;
    const playIntro = intro !== undefined ? intro : (params.get('intro') === '1' || (!settings.introSeen && !params.has('skipintro')));
    const begin = () => {
      game.started = true;
      ui.show(true);
      ui.showIntro(false);
      const Z = island.zoneById('hafen');
      setTimeout(() => ui.showZone(Z.name, 'Willkommen auf der Insel!', 'Du bist angekommen'), 400);
      game.zone = 'hafen';
      events.emit('game:start');
    };
    if (playIntro) {
      ui.show(false);
      cameraRig.startIntro({ duration: 9, onDone: () => { settings.introSeen = true; saveSettings(settings); begin(); } });
      setTimeout(() => ui.showIntro(true), 1600);
      setTimeout(() => { if (cameraRig.mode === 'intro') ui.el.introTitle.classList.remove('is-shown'); }, 6800);
      const skip = (e) => {
        if (e && e.target && e.target.closest && e.target.closest('.menu')) return;
        root.removeEventListener('pointerdown', skip);
        window.removeEventListener('keydown', skip);
        if (cameraRig.mode === 'intro') cameraRig.skipIntro();
      };
      setTimeout(() => { root.addEventListener('pointerdown', skip); window.addEventListener('keydown', skip); }, 600);
    } else {
      cameraRig.behindPlayer();
      cameraRig.snap();
      begin();
    }
  };

  // ---- Debug / Tests ----
  game.debug = {
    teleport(target, yaw) {
      let x, z;
      if (typeof target === 'string') {
        const Z = island.zoneById(target);
        if (!Z) return false;
        x = Z.spawn.x; z = Z.spawn.z;
        if (yaw === undefined) yaw = Math.atan2(Z.x - x, Z.z - z) || 0;
        if (Math.hypot(Z.x - x, Z.z - z) < 3) yaw = Math.atan2(-x, -z);
      } else { x = target.x; z = target.z; }
      player.teleport(x, z, yaw);
      cameraRig.behindPlayer();
      cameraRig.snap();
      return true;
    },
    setTimeOfDay(h) { sky.time.setTimeOfDay(h); },
    freezeTime(v = true) { sky.time.paused = !!v; },
    restoreZone(id, opts) { return veil.restoreZone(id, opts); },
    veilZone(id) { veil.veilZone(id); },
    setQuality(q) { rr.setQuality(q); },
    setShot(pos, look) { cameraRig.setShot(pos && new THREE.Vector3(pos.x, pos.y, pos.z), look && new THREE.Vector3(look.x, look.y, look.z)); if (pos) camera.position.set(pos.x, pos.y, pos.z); },
    stats() {
      return {
        fps: rr.monitor.fps, frameMs: rr.monitor.frameMs, quality: rr.qualityName, dpr: renderer.getPixelRatio(),
        calls: renderer.info.render.calls, triangles: renderer.info.render.triangles,
        terrainTris: terrain.triangles, vegetation: vegetation.instanceCount, colliders: colliders.count,
      };
    },
    zones: ZONES.map((z) => z.id),
    // Spielzeit ohne Rendern vorspulen (Tests)
    advance(seconds, dt = 1 / 30) {
      const r = loop.render;
      loop.render = null;
      const n = Math.ceil(seconds / dt);
      for (let i = 0; i < n; i++) loop.step(dt);
      loop.render = r;
    },
  };

  // Shader vorkompilieren (vermeidet Ruckler)
  await step(0.84, 'Farben werden gemischt …');
  cameraRig.snap();
  camera.position.set(-150, 60, 320);
  camera.lookAt(0, 20, 60);
  try { if (renderer.compileAsync) await renderer.compileAsync(scene, camera); else renderer.compile(scene, camera); } catch (e) { /* weiter */ }
  await step(1, 'Bereit!');
  renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); ui.toast('Grafik wird neu geladen …'); });
  window.LUMO = game;
  return game;
}
