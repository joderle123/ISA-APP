// Erinnerungs-Dioramen (WP54): stilles 3D-Bild aus MemoryDef.diorama in der Farbe des Gefühls (filter.tint).
// Szenen-Vorlagen: turm-nacht · strand-surfshow · sommerfest-buehne · turm-tuer · platz (Rückfall). Requisiten nach Namen
// (laternen, turm, steg, boot, welle, surfbrett, handys, buehne, trommeln, tuer, herzglas, treppe), Figuren als leichte
// Humanoide (lite) in Zeitlupe, Menge mit Handys. Alles feste Geometrie wird zur Tönung hin gemischt (mixTint).
//   const D = buildDiorama(def, { THREE, part, merge, M, createHumanoid, npcLook(id), rng });
//   D.group · D.update(dt, t) · D.dispose() · D.camera { pos:[x,y,z], look:[x,y,z] } · D.tint · D.figures
const TAU = Math.PI * 2;
const CROWD_SKINS = ['#f0c09a', '#c68a5a', '#8d5a3b', '#f6d6b8', '#5a3b2a', '#d9a479'];
const CROWD_TOPS = ['#39d0c8', '#ff7a59', '#ffd166', '#b48cff', '#3d7bff', '#45d15a', '#ff5d8f'];
const CROWD_HAIR = ['#2a1b12', '#6b4a2f', '#1b1b1b', '#c9a26e', '#8d2b2b'];
const POSE = {
  staunen: { anim: 'idle', poses: { shoulderUp: 0.6, upright: 0.4 } },
  schauen: { anim: 'idle', poses: { shoulderUp: 0.2 } },
  surfen: { anim: 'cheer', poses: { upright: 1 } },
  lachen: { anim: 'talk', poses: { upright: 0.6 } },
  ducken: { anim: 'idle', poses: { slump: 0.7, shoulderUp: 1, stepBack: 0.5 } },
  rennen: { anim: 'run', poses: {} },
  weg: { anim: 'run', poses: { headDown: 0.7, shoulderUp: 0.6 } },
  slump: { anim: 'sad', poses: { slump: 1 } },
  stolpern: { anim: 'fall', poses: {} },
  sitzen: { anim: 'sit', poses: {} },
  wut: { anim: 'angry', poses: { fistClench: 0.8 } },
};

export function mixTint(geo, hex, k, THREE) {
  const c = new THREE.Color(hex);
  const a = geo.attributes.color;
  if (!a) return geo;
  for (let i = 0; i < a.count; i++) a.setXYZ(i, a.getX(i) * (1 - k) + c.r * k, a.getY(i) * (1 - k) + c.g * k, a.getZ(i) * (1 - k) + c.b * k);
  return geo;
}

export function buildDiorama(def, K) {
  const { THREE, part, merge, M } = K;
  const rng = K.rng || { float: (a, b) => a + Math.random() * (b - a), int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)), pick: (arr) => arr[Math.floor(Math.random() * arr.length)] };
  const tint = (def.filter && def.filter.tint) || '#bfc6d6';
  const blur = def.filter && typeof def.filter.blur === 'number' ? def.filter.blur : 0.3;
  const scene = (def.diorama && def.diorama.scene) || 'platz';
  const props = new Set((def.diorama && def.diorama.props) || []);
  const g = new THREE.Group(); g.name = 'diorama-' + def.id;
  const solid = [], glows = new Map(), dyn = [], figures = [];
  const glow = (geo, hex, i = 1.2) => { if (!glows.has(hex + ':' + i)) glows.set(hex + ':' + i, []); glows.get(hex + ':' + i).push(geo); };

  // ---- Boden: dunkle Scheibe, leicht zur Tönung ----
  solid.push(part(new THREE.CylinderGeometry(9, 9.6, 0.5, 24, 1), { pos: [0, -0.25, 0], color: '#2a2a38', faceVar: 0.1, jitter: 0.06, seed: 3 }));

  // ---- Requisiten ----
  const lanterns = (pts, color = '#ffd166') => { for (const [x, z, h] of pts) { solid.push(part(new THREE.CylinderGeometry(0.05, 0.07, h, 5, 1), { pos: [x, h / 2, z], color: '#3b2a1a' })); glow(part(new THREE.SphereGeometry(0.22, 8, 6), { pos: [x, h + 0.15, z], color }), color, 1.5); } };
  const tower = (x, z, lit) => {
    solid.push(part(new THREE.CylinderGeometry(1.2, 1.5, 6.5, 10, 3), { pos: [x, 3.25, z], color: '#e8e2d6', faceVar: 0.08, jitter: 0.03, seed: 5 }));
    for (let i = 0; i < 3; i++) solid.push(part(new THREE.TorusGeometry(1.32, 0.09, 4, 12), { pos: [x, 1.4 + i * 1.9, z], rot: [Math.PI / 2, 0, 0], color: '#b0413e' }));
    solid.push(part(new THREE.CylinderGeometry(1.5, 1.5, 0.3, 10, 1), { pos: [x, 6.6, z], color: '#3b3848' }));
    const lampGeo = part(new THREE.CylinderGeometry(0.7, 0.7, 1.0, 8, 1), { pos: [x, 7.3, z], color: lit ? '#fff1c8' : '#3a3f52' });
    if (lit) glow(lampGeo, '#fff1c8', 2.0); else solid.push(lampGeo);
    solid.push(part(new THREE.ConeGeometry(1.0, 0.9, 8, 1), { pos: [x, 8.2, z], color: '#b0413e' }));
  };
  const pier = () => { for (let i = 0; i < 6; i++) solid.push(part(new THREE.BoxGeometry(1.6, 0.12, 0.7), { pos: [0, 0.08, 3.5 + i * 0.75], color: i % 2 ? '#a87850' : '#8a6a48' })); for (const [x, z] of [[-0.9, 3.4], [0.9, 3.4], [-0.9, 7.2], [0.9, 7.2]]) solid.push(part(new THREE.CylinderGeometry(0.08, 0.1, 0.9, 5, 1), { pos: [x, 0.3, z], color: '#5c4030' })); };
  const boat = (x, z) => { solid.push(part(new THREE.BoxGeometry(1.2, 0.5, 2.6, 2, 1, 3), { pos: [x, 0.25, z], color: '#ff7a59', faceVar: 0.08, deform: (v) => { v.x *= 1 - Math.abs(v.z / 1.3) * 0.45; } })); };
  const wave = () => { solid.push(part(new THREE.BoxGeometry(12, 0.3, 6, 12, 1, 6), { pos: [0, 0.15, -1], color: '#2b8fc9', faceVar: 0.12, deform: (v) => { v.y += Math.max(0, Math.sin((v.z + 2) * 1.1)) * 1.6 + Math.sin(v.x * 1.4) * 0.15; } })); glow(part(new THREE.BoxGeometry(11, 0.08, 0.6), { pos: [0, 1.75, -1.6], color: '#dff4ff' }), '#dff4ff', 0.6); };
  const surfboard = (x, y, z) => { solid.push(part(new THREE.BoxGeometry(0.5, 0.08, 2.0, 1, 1, 3), { pos: [x, y, z], rot: [0, 0.4, 0.2], color: '#ffd166', deform: (v) => { v.x *= 1 - Math.abs(v.z) * 0.35; } })); };
  const stage = () => { solid.push(part(new THREE.BoxGeometry(6, 0.7, 3.2), { pos: [0, 0.35, -3], color: '#5c4030', faceVar: 0.08 })); for (const sx of [-1, 1]) { solid.push(part(new THREE.CylinderGeometry(0.08, 0.1, 3.4, 5, 1), { pos: [sx * 2.8, 2.4, -4.4], color: '#3b2a1a' })); } solid.push(part(new THREE.BoxGeometry(6.2, 0.12, 0.12), { pos: [0, 4.1, -4.4], color: '#3b2a1a' })); for (let i = 0; i < 7; i++) { const c = ['#ffd166', '#ff5d8f', '#2de2c9', '#b48cff'][i % 4]; glow(part(new THREE.SphereGeometry(0.12, 6, 4), { pos: [-2.7 + i * 0.9, 4.0 - (i % 2) * 0.25, -4.3], color: c }), c, 1.3); } };
  const drums = () => { for (let i = 0; i < 3; i++) { solid.push(part(new THREE.CylinderGeometry(0.34, 0.3, 0.6, 9, 1), { pos: [-1.6 + i * 1.3, 1.0, -3.2], color: ['#c0392b', '#9b5cff', '#ffd166'][i], faceVar: 0.1 })); solid.push(part(new THREE.CylinderGeometry(0.34, 0.34, 0.04, 9, 1), { pos: [-1.6 + i * 1.3, 1.32, -3.2], color: '#f0e0c0' })); } };
  const door = () => { solid.push(part(new THREE.BoxGeometry(2.4, 3.4, 0.3), { pos: [0, 1.7, -3.2], color: '#e8e2d6', faceVar: 0.06 })); solid.push(part(new THREE.BoxGeometry(1.2, 2.6, 0.12), { pos: [-0.35, 1.3, -2.9], rot: [0, -0.9, 0], color: '#6b4a30', faceVar: 0.08 })); solid.push(part(new THREE.SphereGeometry(0.06, 6, 4), { pos: [0.1, 1.3, -2.55], color: '#ffd166' })); };
  const heartGlass = () => { solid.push(part(new THREE.CylinderGeometry(0.5, 0.6, 1.1, 8, 1), { pos: [2.2, 0.55, -1.6], color: '#5f5a6e' })); glow(part(new THREE.OctahedronGeometry(0.55, 0), { pos: [2.45, 1.45, -1.35], rot: [0.3, 0.2, 0.7], scale: [1, 1.3, 1], color: '#ff9ac0' }), '#ff5d8f', 1.4); for (let i = 0; i < 5; i++) glow(part(new THREE.TetrahedronGeometry(0.12, 0), { pos: [2.6 + Math.cos(i * 1.3) * 0.6, 0.15 + i * 0.12, -1.2 + Math.sin(i * 1.3) * 0.6], color: '#ffc0dc' }), '#ff5d8f', 0.9); };
  const stairs = () => { for (let i = 0; i < 5; i++) solid.push(part(new THREE.BoxGeometry(2.0, 0.3, 0.7), { pos: [-3.2, 0.15 + i * 0.3, 1.5 - i * 0.7], color: '#a8a4bb', faceVar: 0.08 })); };

  // ---- Szenen-Vorlagen ----
  const crowdSpots = [];
  let camera = { pos: [0, 3.4, 9.5], look: [0, 1.3, -0.5] };
  let dark = false;
  if (scene === 'turm-nacht') {
    tower(0, -4, false); if (props.has('steg')) pier(); if (props.has('boot')) boat(-3.2, 5.2);
    lanterns([[-4, 1, 2.2], [4, 1, 2.2], [-2.5, 4, 2.0], [2.5, 4, 2.0], [-5, -2, 2.4], [5, -2, 2.4]]);
    for (let i = 0; i < 12; i++) crowdSpots.push({ x: -4 + (i % 6) * 1.6, z: 1.5 + Math.floor(i / 6) * 1.6, yaw: Math.PI });
    camera = { pos: [1, 3.2, 11], look: [0, 3.2, -3] }; dark = true;
  } else if (scene === 'strand-surfshow') {
    wave(); surfboard(0, 2.2, -2.2);
    lanterns([[-5, 4, 2.2], [5, 4, 2.2]]);
    for (let i = 0; i < 14; i++) crowdSpots.push({ x: -5 + (i % 7) * 1.65, z: 2.6 + Math.floor(i / 7) * 1.5, yaw: Math.PI, phone: true });
    camera = { pos: [3, 3.0, 10], look: [0, 1.6, -1] };
  } else if (scene === 'sommerfest-buehne') {
    stage(); if (props.has('trommeln')) drums(); if (props.has('turm')) tower(-7, -8, false);
    lanterns([[-4, 2, 2.4], [4, 2, 2.4]]);
    for (let i = 0; i < 14; i++) crowdSpots.push({ x: -4.5 + (i % 7) * 1.5, z: 0.5 + Math.floor(i / 7) * 1.6, yaw: rng.float(0.3, 1.2) * (i % 2 ? 1 : -1) + Math.PI / 2 * (i % 2 ? 1 : -1) });
    camera = { pos: [-2, 3.6, 10], look: [0, 1.5, -2] }; dark = true;
  } else if (scene === 'turm-tuer') {
    door(); if (props.has('herzglas')) heartGlass(); if (props.has('treppe')) stairs();
    lanterns([[-4.5, 3, 2.2], [4.5, 3, 2.2]], '#ff9a6a');
    for (let i = 0; i < 8; i++) crowdSpots.push({ x: -3.5 + i * 1.0, z: 4.2 + (i % 2) * 0.8, yaw: Math.PI, phone: true });
    camera = { pos: [1.5, 2.8, 8.5], look: [0, 1.4, -2] }; dark = true;
  } else {
    lanterns([[-3, 2, 2.2], [3, 2, 2.2]]);
    for (let i = 0; i < 8; i++) crowdSpots.push({ x: -3.5 + i * 1.0, z: 2 + (i % 2), yaw: Math.PI });
  }
  if (props.has('handys')) for (const s of crowdSpots) s.phone = true;

  // ---- Feste Geometrie mischen (zur Tönung) und bauen ----
  const k = 0.45 + blur * 0.25;
  const solidMesh = new THREE.Mesh(mixTint(merge(solid), tint, k, THREE), M.base); solidMesh.name = 'dio-solid'; solidMesh.castShadow = true; solidMesh.receiveShadow = true; g.add(solidMesh);
  for (const [key, geos] of glows) { const [hex, i] = key.split(':'); const m = new THREE.Mesh(merge(geos), M.glow(hex, { intensity: +i, veil: false })); m.name = 'dio-glow'; g.add(m); }

  // ---- Figuren: Hauptfigur(en) und Menge ----
  const addFigure = (look, pose, x, z, yaw, opts = {}) => {
    if (!K.createHumanoid) return null;
    let h = null;
    try { h = K.createHumanoid(look || {}, { detail: 'lite', veil: false }); } catch (e) { console.warn('[diorama] Figur', e); return null; }
    const P = POSE[pose] || POSE.schauen;
    h.group.position.set(x, opts.y || 0, z); h.group.rotation.y = yaw;
    if (opts.scale) h.group.scale.setScalar(opts.scale);
    try { h.setAnim(P.anim); if (h.setPoses) h.setPoses(P.poses); } catch (e) { /* egal */ }
    g.add(h.group);
    figures.push({ h, pose, phone: !!opts.phone, phase: rng.float(0, TAU) });
    if (opts.phone) { const pm = new THREE.Mesh(part(new THREE.BoxGeometry(0.16, 0.26, 0.02), { pos: [0.22, 1.25, 0.28], rot: [-0.6, 0, 0], color: '#dff4ff' }), M.glow('#9ad0ff', { intensity: 1.6, veil: false })); pm.name = 'dio-handy'; h.group.add(pm); }
    return h;
  };
  const figs = (def.diorama && def.diorama.figures) || [];
  let crowdN = 0;
  let mainIdx = 0;
  for (const f of figs) {
    if (f.npc) {
      const look = K.npcLook ? K.npcLook(f.npc) : {};
      const spot = scene === 'strand-surfshow' ? { x: 0, z: -2.1, yaw: Math.PI * 0.85, y: 2.25 } : scene === 'turm-tuer' ? { x: -0.6, z: -1.4, yaw: 0.6 } : scene === 'sommerfest-buehne' ? { x: 1.5, z: -0.5, yaw: 0.2 } : { x: 0.6 + mainIdx * 1.2, z: 0.6, yaw: Math.PI };
      addFigure(look, f.pose, spot.x, spot.z, spot.yaw, { y: spot.y, phone: f.facing === 'handy' });
      mainIdx++;
    } else if (f.crowd) crowdN = Math.max(crowdN, Math.min(f.crowd, crowdSpots.length));
  }
  const crowdPose = (figs.find((f) => f.crowd) || {}).pose || 'schauen';
  const crowdFacingPhone = (figs.find((f) => f.crowd) || {}).facing === 'handy';
  for (let i = 0; i < crowdN; i++) {
    const s = crowdSpots[i];
    const look = { skin: CROWD_SKINS[i % CROWD_SKINS.length], top: CROWD_TOPS[(i * 3) % CROWD_TOPS.length], hair: CROWD_HAIR[(i * 5) % CROWD_HAIR.length], bottoms: i % 2 ? '#2b3350' : '#3b3848', hairStyle: ['kurz', 'lang', 'locken', 'buzz', 'dutt'][i % 5] };
    addFigure(look, crowdPose, s.x + rng.float(-0.25, 0.25), s.z + rng.float(-0.2, 0.2), (s.yaw || Math.PI) + rng.float(-0.3, 0.3), { phone: crowdFacingPhone || s.phone, scale: 0.92 + rng.float(0, 0.12) });
  }

  return {
    group: g, tint, blur, dark, camera, figures, scene,
    // Zeitlupe: Figuren laufen mit einem Fünftel der Zeit, Handys flackern leicht
    update(dt, t) { for (const f of figures) { try { f.h.update(dt * 0.18); } catch (e) { /* egal */ } } },
    dispose() {
      for (const f of figures) { try { g.remove(f.h.group); f.h.dispose(); } catch (e) { /* egal */ } }
      g.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
      if (g.parent) g.parent.remove(g);
    },
  };
}
