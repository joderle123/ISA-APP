// Tor-Bauanleitungen (WP35): eine Gruppe je Typ (Ursprung = Bodenpunkt, +z = Durchgang), schleierfähige Materialien aus
// dem Requisiten-Baukasten, dazu das schwebende Symbol der nötigen Fähigkeit (Canvas-Sprite mit Schloss, solange zu).
//   build(type, { def, K: { M, R, THREE }, symbol }) → { group, setOpen(bool, {instant}), setActive?(bool), update(dt, t),
//     collide(colliders, x, z, yaw) → Refs (nur solange zu), surfaces?(colliders, x, z, yaw) → Refs (Klangbrücke, Bohlen) }
//   createSymbolSprite({ icon, color, label, locked }) → { sprite, setLocked(v), dispose() }
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { icon as iconSvg } from '../../ui/icons.js';

const TAU = Math.PI * 2;
const mesh = (geo, mat, dyn = false) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; if (dyn) m.userData.dynamic = true; return m; };
const hasDOM = typeof document !== 'undefined';

// ---- Symbol-Sprite: dunkle Scheibe, farbiger Ring, Fähigkeits-Icon (SVG → Canvas), Schloss-Plakette solange zu ----
const TEX = new Map();
function drawSymbol(g, size, { color, locked, img }) {
  const r = size / 2;
  g.clearRect(0, 0, size, size);
  g.beginPath(); g.arc(r, r, r * 0.86, 0, TAU); g.fillStyle = 'rgba(20,12,40,0.85)'; g.fill();
  g.lineWidth = size * 0.07; g.strokeStyle = color; g.globalAlpha = locked ? 1 : 0.55; g.stroke(); g.globalAlpha = 1;
  if (img) { const s = size * 0.5; g.drawImage(img, r - s / 2, r - s / 2, s, s); }
  if (locked) {
    // Schloss-Plakette unten rechts
    const bx = r + r * 0.42, by = r + r * 0.42, br = size * 0.16;
    g.beginPath(); g.arc(bx, by, br, 0, TAU); g.fillStyle = '#1b1033'; g.fill(); g.lineWidth = size * 0.02; g.strokeStyle = 'rgba(255,255,255,.7)'; g.stroke();
    g.fillStyle = '#ffd166'; g.fillRect(bx - br * 0.45, by - br * 0.1, br * 0.9, br * 0.7);
    g.beginPath(); g.arc(bx, by - br * 0.15, br * 0.33, Math.PI, 0); g.lineWidth = size * 0.025; g.strokeStyle = '#ffd166'; g.stroke();
  }
}
export function createSymbolSprite({ icon = 'stern', color = '#ffd166', locked = true, size = 128 } = {}) {
  if (!hasDOM) return { sprite: new THREE.Group(), setLocked() {}, dispose() {} };
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, sizeAttenuation: true });
  const sprite = new THREE.Sprite(mat);
  sprite.name = 'tor-symbol';
  let img = null, isLocked = locked;
  const redraw = () => { drawSymbol(g, size, { color, locked: isLocked, img }); tex.needsUpdate = true; };
  redraw();
  const key = icon + '|' + color;
  const svg = iconSvg(icon, { size: 64 }).replace('stroke="currentColor"', `stroke="${color}"`).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  if (TEX.has(key)) { img = TEX.get(key); redraw(); }
  else {
    const im = new Image();
    im.onload = () => { TEX.set(key, im); img = im; redraw(); };
    im.onerror = () => { /* ohne Icon, Ring reicht */ };
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  return { sprite, setLocked(v) { if (isLocked === !!v) return; isLocked = !!v; redraw(); }, dispose() { tex.dispose(); mat.dispose(); } };
}

// ---- Hilfen ----
function rockSlab(K, w, h, d, { color = '#5b5566', seed = 1, jitter = 0.2 } = {}) {
  return part(new THREE.BoxGeometry(w, h, d, 2, 4, 2), { pos: [0, h / 2, 0], jitter, seed, faceVar: 0.16, color });
}
function post(K, x, z, h, color = '#6b4a30') { return part(new THREE.CylinderGeometry(0.14, 0.18, h, 6, 1), { pos: [x, h / 2, z], color, faceVar: 0.1 }); }

// ---- Typen ----
const BUILD = {
  // Dornenwand: dichte Ranken mit Dornen; das Wut-Segel bricht sie (segel:break / gate:break vom Bewegungs-Plugin)
  dornenwand(o, K) {
    const { M, R } = K;
    const g = new THREE.Group();
    const w = o.width || 6, h = o.height || 3.6;
    const P = [];
    for (let i = 0; i < 12; i++) {
      const x = -w / 2 + (i / 11) * w, hh = h * (0.6 + R.float(0, 0.4));
      P.push(part(new THREE.CylinderGeometry(0.1, 0.18, hh, 5, 3), { pos: [x, hh / 2, R.float(-0.3, 0.3)], rot: [R.float(-0.2, 0.2), 0, R.float(-0.25, 0.25)], jitter: 0.06, seed: 700 + i, color: i % 2 ? '#3d5a2a' : '#4a3a28', faceVar: 0.14, deform: (v) => { v.x += Math.sin(v.y * 2.2) * 0.12; } }));
      for (let k = 0; k < 4; k++) P.push(part(new THREE.ConeGeometry(0.05, 0.28, 4, 1), { pos: [x + R.float(-0.25, 0.25), R.float(0.3, hh), R.float(-0.4, 0.4)], rot: [R.float(-1.4, 1.4), 0, R.float(-1.4, 1.4)], color: '#a8b0a0' }));
    }
    const body = mesh(merge(P), M.base);
    g.add(body);
    let open = false, k = 1;
    return {
      group: g,
      setOpen(v, { instant } = {}) { open = !!v; if (instant) { k = open ? 0 : 1; body.scale.set(1, Math.max(0.02, k), 1); body.visible = k > 0.02; } },
      update(dt) { const t = open ? 0 : 1; if (Math.abs(k - t) > 0.01) { k += (t - k) * Math.min(1, dt * 3); body.scale.set(1 + (1 - k) * 0.3, Math.max(0.02, k), 1); body.visible = k > 0.03; } },
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x, z, w / 2, 0.6, yaw, { group: 'tore', tag: 'dornen' }); },
    };
  },
  // Tauchring: schwebender Ring knapp über dem Wasser (Tauchringe führen in kurze Unterwasser-Räume)
  tauchring(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const ring = mesh(part(new THREE.TorusGeometry(o.r || 2, 0.16, 6, 20), { pos: [0, 0.9, 0], rot: [Math.PI / 2, 0, 0], color: '#3d7bff' }), M.glow('#3d7bff', { intensity: 0.7 }), true);
    ring.castShadow = false;
    g.add(ring);
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; g.add(mesh(part(new THREE.SphereGeometry(0.12, 5, 4), { pos: [Math.cos(a) * (o.r || 2), 0.9, Math.sin(a) * (o.r || 2)], color: '#bfe8ff' }), M.glow('#bfe8ff', { intensity: 0.9 }), true)); }
    let open = false;
    return { group: g, setOpen(v) { open = !!v; }, update(dt, t) { ring.rotation.z = t * 0.4; ring.position.y = 0.9 + Math.sin(t * 1.3) * 0.08; ring.material.emissiveIntensity = open ? 1.8 : 0.6; } };
  },
  // Klangtor: zwei Säulen mit Bogen; solange zu, hängt ein Klangvorhang dazwischen; Klangbrücke (Planken) erscheint beim Ton
  klangtor(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const P = [];
    for (const sx of [-1, 1]) { P.push(part(new THREE.CylinderGeometry(0.42, 0.55, 4.2, 7, 1), { pos: [sx * 2.2, 2.1, 0], color: '#4a4560', faceVar: 0.14, jitter: 0.05, seed: 10 + sx })); }
    P.push(part(new THREE.TorusGeometry(2.2, 0.32, 6, 14, Math.PI), { pos: [0, 4.2, 0], color: '#5b5570', faceVar: 0.14 }));
    g.add(mesh(merge(P), M.base));
    const curtain = mesh(part(new THREE.PlaneGeometry(4, 4, 8, 8), { pos: [0, 2.1, 0], color: '#b06bff', deform: (v) => { v.x += Math.sin(v.y * 3) * 0.08; } }), M.glass('#b06bff', { opacity: 0.35 }), true);
    curtain.castShadow = false;
    g.add(curtain);
    const notes = mesh(merge([0, 1, 2].map((i) => part(new THREE.SphereGeometry(0.12, 5, 4), { pos: [-1.2 + i * 1.2, 3.2 + (i % 2) * 0.4, 0], color: '#2de2c9' }))), M.glow('#2de2c9', { intensity: 0.8 }), true);
    g.add(notes);
    // Klangbrücke: drei Planken hinter dem Tor, nur sichtbar solange der Ton klingt
    const planks = new THREE.Group();
    for (let i = 0; i < 3; i++) { const pl = mesh(part(new THREE.BoxGeometry(2.2, 0.16, 1.6), { pos: [0, 0.35, 2.4 + i * 2.2], color: '#7ff0ff' }), M.glow('#7ff0ff', { intensity: 0.7 }), true); pl.castShadow = false; planks.add(pl); }
    planks.visible = false;
    g.add(planks);
    let open = false, klang = 0;
    return {
      group: g,
      setOpen(v) { open = !!v; curtain.visible = !open; },
      setActive(v) { klang = v ? 1 : 0; planks.visible = klang > 0; },
      update(dt, t) { notes.position.y = Math.sin(t * 2) * 0.1; curtain.material.opacity = 0.25 + Math.sin(t * 3) * 0.08; },
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x, z, 1.8, 0.4, yaw, { group: 'tore', tag: 'klangtor' }); },
      surfaces(colliders, x, z, y, yaw) { return [0, 1, 2].map((i) => { const dz = 2.4 + i * 2.2; return colliders.addSurface({ type: 'box', x: x + Math.sin(yaw) * dz, z: z + Math.cos(yaw) * dz, hw: 1.1, hd: 0.8, rot: yaw, y: y + 0.43, group: 'tore', tag: 'klangbruecke', surface: 'wood' }); }); },
    };
  },
  // Gezeitentür: Steintor mit Wellenmarken, der Torstein sinkt beim Öffnen in den Boden
  gezeitentuer(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const frame = mesh(merge([rockSlab(K, 0.9, 3.8, 0.9, { seed: 21 }).translate(-1.8, 0, 0), rockSlab(K, 0.9, 3.8, 0.9, { seed: 22 }).translate(1.8, 0, 0), part(new THREE.BoxGeometry(4.6, 0.8, 1), { pos: [0, 3.9, 0], jitter: 0.1, seed: 23, faceVar: 0.14, color: '#5b5566' })]), M.base);
    g.add(frame);
    const door = mesh(part(new THREE.BoxGeometry(2.6, 3.4, 0.4, 3, 6, 1), { pos: [0, 1.7, 0], jitter: 0.04, seed: 24, faceVar: 0.1, color: (x, y, z, out) => out.set(Math.abs(Math.sin(y * 4)) > 0.85 ? '#5ad8ff' : '#3e5c78') }), M.base, true);
    g.add(door);
    let open = false, k = 0;
    return {
      group: g,
      setOpen(v, { instant } = {}) { open = !!v; if (instant) { k = open ? 1 : 0; door.position.y = -3.3 * k; } },
      update(dt) { const t = open ? 1 : 0; if (Math.abs(k - t) > 0.01) { k += (t - k) * Math.min(1, dt * 2); door.position.y = -3.3 * k; } },
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x, z, 1.4, 0.35, yaw, { group: 'tore', tag: 'gezeitentuer' }); },
    };
  },
  // Runentor: Steinbogen mit leuchtender Rune; solange zu, steht ein Lichtvorhang im Bogen
  runentor(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const P = [];
    for (const sx of [-1, 1]) P.push(rockSlab(K, 0.9, 3.6, 1, { seed: 30 + sx, color: '#5b5566' }).translate(sx * 1.9, 0, 0));
    P.push(part(new THREE.BoxGeometry(4.8, 0.9, 1.1), { pos: [0, 4.0, 0], jitter: 0.12, seed: 33, faceVar: 0.14, color: '#6a6478' }));
    g.add(mesh(merge(P), M.base));
    const col = o.color || '#ffd166';
    const rune = mesh(merge([part(new THREE.BoxGeometry(0.06, 1.0, 0.08), { pos: [0, 4.0, 0.6], color: col }), part(new THREE.BoxGeometry(0.6, 0.06, 0.08), { pos: [0, 4.25, 0.6], color: col }), part(new THREE.TorusGeometry(0.28, 0.04, 4, 12), { pos: [0, 3.75, 0.6], color: col })]), M.glow(col, { intensity: 0.6 }), true);
    g.add(rune);
    const curtain = mesh(part(new THREE.PlaneGeometry(3, 3.5, 6, 6), { pos: [0, 1.75, 0], color: col }), M.glass(col, { opacity: 0.28 }), true);
    curtain.castShadow = false;
    g.add(curtain);
    let open = false;
    return {
      group: g,
      setOpen(v) { open = !!v; curtain.visible = !open; rune.material.emissiveIntensity = open ? 1.8 : 0.6; },
      update(dt, t) { if (!open) curtain.material.opacity = 0.2 + Math.sin(t * 2.4) * 0.06; },
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x, z, 1.5, 0.35, yaw, { group: 'tore', tag: 'runentor' }); },
    };
  },
  // Spalt: zwei Felsplatten mit schmalem Riss; Jolies Spalten-Weg schiebt sie auseinander
  spalt(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const L = mesh(rockSlab(K, 2.6, 3.6, 1.2, { seed: 40, color: '#4f4a5c' }), M.base, true), Rr = mesh(rockSlab(K, 2.6, 3.6, 1.2, { seed: 41, color: '#575266' }), M.base, true);
    L.position.x = -1.45; Rr.position.x = 1.45;
    g.add(L, Rr);
    const glowLine = mesh(part(new THREE.BoxGeometry(0.06, 3.2, 0.06), { pos: [0, 1.7, 0.62], color: '#39d0c8' }), M.glow('#39d0c8', { intensity: 0.5 }), true);
    g.add(glowLine);
    let open = false, k = 0;
    return {
      group: g,
      setOpen(v, { instant } = {}) { open = !!v; if (instant) { k = open ? 1 : 0; L.position.x = -1.45 - k * 1.2; Rr.position.x = 1.45 + k * 1.2; } },
      update(dt) { const t = open ? 1 : 0; if (Math.abs(k - t) > 0.01) { k += (t - k) * Math.min(1, dt * 2); L.position.x = -1.45 - k * 1.2; Rr.position.x = 1.45 + k * 1.2; glowLine.scale.x = 1 + k * 8; } },
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x, z, 2.8, 0.6, yaw, { group: 'tore', tag: 'spalt' }); },
    };
  },
  // Aufwind-Fächer: Federfächer auf einem Sockel; offen spreizt er sich und trägt eine Aufwindsäule (Bewegungs-Plugin)
  aufwindfaecher(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    g.add(mesh(part(new THREE.CylinderGeometry(0.5, 0.7, 0.6, 8, 1), { pos: [0, 0.3, 0], color: '#5b5566', faceVar: 0.14 }), M.base));
    const fan = new THREE.Group();
    fan.position.y = 0.6;
    const blades = [];
    for (let i = 0; i < 7; i++) {
      const b = mesh(part(new THREE.ConeGeometry(0.22, 2.2, 4, 1), { pos: [0, 1.1, 0], scale: [1, 1, 0.35], color: ['#8fa3ff', '#7fe0ff', '#ffd166'][i % 3] }), M.glow(['#8fa3ff', '#7fe0ff', '#ffd166'][i % 3], { intensity: 0.5 }), true);
      b.castShadow = false;
      fan.add(b); blades.push(b);
    }
    g.add(fan);
    let open = false, k = 0;
    const lay = () => blades.forEach((b, i) => { b.rotation.z = (-0.9 + (i / 6) * 1.8) * k; });
    lay();
    return {
      group: g,
      setOpen(v, { instant } = {}) { open = !!v; if (instant) { k = open ? 1 : 0; lay(); } },
      update(dt, t) { const tg = open ? 1 : 0; if (Math.abs(k - tg) > 0.01) { k += (tg - k) * Math.min(1, dt * 2); lay(); } fan.rotation.y = Math.sin(t * 0.8) * 0.15 * k; },
    };
  },
  // Flüsterstein: Requisite aus dem Baukasten (aktiv, solange zu) – Zone macht schwer (Puls-Quelle)
  fluesterstein(o, K) {
    const h = K.props ? K.props.make('fluesterstein', { size: o.size || 1.4, active: true, dynamic: true }) : null;
    const g = h ? h.group : new THREE.Group();
    return { group: g, setOpen(v) { if (h && h.setActive) h.setActive(!v); }, update(dt, t, ctx) { if (h && h.update) h.update(dt, t, ctx); } };
  },
  // Windschatten: gebogene Steinmauer – dahinter Windstille (Puls-Senke), nie gesperrt
  windschatten(o, K) {
    const { M, R } = K;
    const g = new THREE.Group();
    const P = [];
    const n = 5;
    for (let i = 0; i < n; i++) {
      const a = -0.9 + (i / (n - 1)) * 1.8, r = 2.6;
      const hh = 1.6 + Math.sin((i / (n - 1)) * Math.PI) * 0.9;
      P.push(part(new THREE.BoxGeometry(1.25, hh, 0.7, 2, 3, 1), { pos: [Math.sin(a) * r, hh / 2, -Math.cos(a) * r + 2.2], rot: [0, -a, 0], jitter: 0.16, seed: 50 + i, faceVar: 0.16, color: i % 2 ? '#6b667a' : '#5b5566' }));
    }
    P.push(part(new THREE.CylinderGeometry(2.4, 2.6, 0.12, 14, 1), { pos: [0, 0.06, 0], color: '#8fa080', faceVar: 0.1 }));
    g.add(mesh(merge(P), M.base));
    const moss = mesh(merge([0, 1, 2].map((i) => part(new THREE.SphereGeometry(0.16, 5, 4), { pos: [-1 + i, 0.2, -0.4 + R.float(-0.3, 0.3)], color: '#9fe8b0' }))), M.glow('#9fe8b0', { intensity: 0.35 }), true);
    g.add(moss);
    return { group: g, setOpen() {}, update() {} };
  },
  // Sturmfeld (Kältefeld): wirbelnde Böen in einer Säule; der Kältekristall friert es ein (Kristalle, Wirbel stehen still)
  kaeltefeld(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const r = o.r || 3.2;
    const swirl = mesh(part(new THREE.CylinderGeometry(r, r * 0.8, 3.4, 12, 3, true), { pos: [0, 1.7, 0], color: '#9fb4d8', deform: (v) => { v.x += Math.sin(v.y * 2.5) * 0.2; v.z += Math.cos(v.y * 2.5) * 0.2; } }), M.glass('#bfd0ff', { opacity: 0.22 }), true);
    swirl.castShadow = false;
    g.add(swirl);
    const ice = mesh(merge([0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * TAU; return part(new THREE.ConeGeometry(0.3, 1.4 + (i % 2) * 0.5, 5, 1), { pos: [Math.cos(a) * r * 0.7, 0.7, Math.sin(a) * r * 0.7], rot: [Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3], color: '#dff6ff' }); })), M.glow('#bfe8ff', { intensity: 0.9 }), true);
    ice.visible = false; ice.castShadow = false;
    g.add(ice);
    let frozen = false, open = false, spin = 0;
    return {
      group: g,
      setOpen(v) { open = !!v; },
      setActive(v) { frozen = !!v; ice.visible = frozen; },
      update(dt, t, ctx) {
        if (!frozen) { spin += dt * 2.6; swirl.rotation.y = spin; swirl.material.opacity = 0.18 + Math.sin(t * 4) * 0.05; }
        else swirl.material.opacity = 0.08;
        if (ctx && ctx.particles && !frozen && dt > 0 && ctx.near(g, 60) && Math.random() < 0.25) { const p = ctx.worldPos(g); const a = Math.random() * TAU; ctx.particles.emit({ x: p.x + Math.cos(a) * r * 0.8, y: p.y + 0.4 + Math.random() * 2.4, z: p.z + Math.sin(a) * r * 0.8, count: 1, spread: 0.2, speed: 1.4, up: 0.3, vx: -Math.sin(a) * 3, vz: Math.cos(a) * 3, color: 0xcfe0ff, size: 0.4, life: 0.8, gravity: 0, drag: 0.6, alpha: 0.6 }); }
      },
      collide(colliders, x, z) { return colliders.addCircle(x, z, r, { group: 'tore', tag: 'sturmfeld' }); },
      get frozen() { return frozen; },
    };
  },
  // Hitze-Ring: glühender Ring aus Glut auf dem Boden (Puls-Quelle Vulkanhitze); mit Ampelplan darf man hindurch
  heizring(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const r = o.r || 3;
    const ring = mesh(part(new THREE.TorusGeometry(r, 0.28, 6, 22), { pos: [0, 0.18, 0], rot: [Math.PI / 2, 0, 0], color: '#ff6b3d' }), M.glow('#ff4d1a', { intensity: 1.1 }), true);
    ring.castShadow = false;
    g.add(ring);
    g.add(mesh(part(new THREE.CylinderGeometry(r + 0.4, r + 0.5, 0.1, 22, 1), { pos: [0, 0.05, 0], color: '#2a2230', faceVar: 0.12 }), M.base));
    let open = false;
    return {
      group: g, setOpen(v) { open = !!v; },
      update(dt, t, ctx) { ring.material.emissiveIntensity = 0.9 + Math.sin(t * 3) * 0.3; if (ctx && ctx.particles && dt > 0 && ctx.near(g, 60) && Math.random() < 0.3) { const p = ctx.worldPos(g); const a = Math.random() * TAU; ctx.particles.emit({ x: p.x + Math.cos(a) * r, y: p.y + 0.3, z: p.z + Math.sin(a) * r, count: 1, spread: 0.2, speed: 0.3, up: 1.8, color: 0xffb347, size: 0.35, life: 1.2, gravity: 0.5, drag: 0.8, additive: true, alpha: 0.9 }); } },
      collide(colliders, x, z) { return colliders.addCircle(x, z, r, { group: 'tore', tag: 'heizring' }); },
    };
  },
  // Orbfeld: schwebende Glimmer-Kugeln, die ziehen (Puls-Quelle); das Stopp-Schild löst das Feld
  orbfeld(o, K) {
    const { M, R } = K;
    const g = new THREE.Group();
    const r = o.r || 3.4;
    const orbs = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const m = mesh(part(new THREE.IcosahedronGeometry(0.28, 1), { pos: [0, 0, 0], color: i % 2 ? '#ff8cf0' : '#7cf0ff' }), M.glow(i % 2 ? '#ff8cf0' : '#7cf0ff', { intensity: 1.2 }), true);
      m.castShadow = false;
      m.position.set(Math.cos(a) * r * 0.7, 1.4 + R.float(0, 1.2), Math.sin(a) * r * 0.7);
      m.userData.a = a; m.userData.y0 = m.position.y;
      g.add(m); orbs.push(m);
    }
    const field = mesh(part(new THREE.CylinderGeometry(r, r, 3, 12, 1, true), { pos: [0, 1.5, 0], color: '#ff8cf0' }), M.glass('#ff8cf0', { opacity: 0.16 }), true);
    field.castShadow = false;
    g.add(field);
    let open = false;
    return {
      group: g,
      setOpen(v) { open = !!v; field.visible = !open; },
      update(dt, t) { for (const m of orbs) { const a = m.userData.a + t * (open ? 0.15 : 0.6); m.position.x = Math.cos(a) * r * 0.7; m.position.z = Math.sin(a) * r * 0.7; m.position.y = m.userData.y0 + Math.sin(t * 2 + m.userData.a) * 0.25; } },
      collide(colliders, x, z) { return colliders.addCircle(x, z, r, { group: 'tore', tag: 'orbfeld' }); },
    };
  },
  // Bohlensteg: Pfähle stehen, die Planken fehlen, solange zu; offen liegen sie und tragen
  bohle(o, K) {
    const { M } = K;
    const g = new THREE.Group();
    const len = o.length || 8, n = Math.max(2, Math.round(len / 2));
    const P = [];
    for (let i = 0; i <= n; i++) { const z = (i / n) * len; P.push(post(K, -0.9, z, 1.0), post(K, 0.9, z, 1.0)); }
    g.add(mesh(merge(P), M.base));
    const planks = mesh(merge(Array.from({ length: n }, (_, i) => part(new THREE.BoxGeometry(2.0, 0.14, len / n - 0.15), { pos: [0, 1.0, (i + 0.5) * (len / n)], color: i % 2 ? '#8a6a48' : '#7a5a3c', faceVar: 0.1 }))), M.base, true);
    planks.visible = false;
    g.add(planks);
    let open = false;
    return {
      group: g, setOpen(v) { open = !!v; planks.visible = open; }, update() {},
      collide(colliders, x, z, y, yaw) { return colliders.addBox(x + Math.sin(yaw) * 1, z + Math.cos(yaw) * 1, 1.1, 0.5, yaw, { group: 'tore', tag: 'bohle' }); },
      surfaces(colliders, x, z, y, yaw) { return [colliders.addSurface({ type: 'box', x: x + Math.sin(yaw) * len / 2, z: z + Math.cos(yaw) * len / 2, hw: 1.0, hd: len / 2, rot: yaw, y: y + 1.07, group: 'tore', tag: 'bohle', surface: 'wood' })]; },
    };
  },
};

export const GATE_BUILDERS = Object.keys(BUILD);
export function build(type, { def = {}, K, symbol = null } = {}) {
  const b = BUILD[type];
  if (!b) throw new Error('Unbekannter Tor-Typ: ' + type);
  const h = b(def.params || {}, K);
  h.type = type;
  return h;
}
