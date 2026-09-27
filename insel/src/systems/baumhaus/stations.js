// Baumhaus-Stationen (WP40): wachsende 3D-Einrichtung aus dem Spielstand – Stärken-Bonsai, Glas, Chronik-Pinnwand,
// Trophäenwand, Tür zum Sicheren Ort, Möbel aus dem Raster, Tür und Schild auf dem Außenpodest.
//   const S = createStationBuilders({ THREE, part, merge, M, rng });   (M = game.props.materials)
//   S.bonsai(model) · S.glass(summary) · S.pinnwand(chain, tints) · S.trophies(list) · S.door({ open }) · S.furniture(def, item)
//   S.deck() – jede Rückgabe: { group, update?(dt, t), dispose() }; Meshes heißen 'bh-<station>' (Tests zählen userData)
const TAU = Math.PI * 2;
const NEED_COLOR = { koerper: '#ff7a59', sicherheit: '#3d7bff', zugehoerigkeit: '#ffd23f', anerkennung: '#ff5d8f', selbstbestimmung: '#9b5cff', spass: '#2de2c9' };
const TIER_COLOR = { bronze: '#c8804a', silber: '#d8dde8', gold: '#ffd166', stern: '#fff6a8', aufnaeher: '#ff5d8f', weg: '#2de2c9', jacke: '#b48cff' };

export function createStationBuilders({ THREE, part, merge, M, rng = null }) {
  const R = rng || { float: (a, b) => a + Math.random() * (b - a) };
  const hash = (i, k = 1) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  const mesh = (geos, mat, name) => { const m = new THREE.Mesh(merge(geos), mat); m.name = name; m.castShadow = true; m.receiveShadow = true; return m; };
  const disposeGroup = (g) => g.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
  const done = (group, update) => ({ group, update: update || null, dispose() { disposeGroup(group); if (group.parent) group.parent.remove(group); } });

  // ---- Stärken-Bonsai: Topf, Stamm (wächst mit size), Äste (3 + Sätze), Früchte = Taten ----
  function bonsai(model) {
    const g = new THREE.Group(); g.name = 'bh-bonsai';
    const s = 0.75 + model.size * 0.75;                      // 0,75 … 1,5
    const base = [], glows = [];
    base.push(part(new THREE.CylinderGeometry(0.62, 0.5, 0.5, 8, 1), { pos: [0, 0.25, 0], color: '#7a5a3a', faceVar: 0.08 }));
    base.push(part(new THREE.CylinderGeometry(0.56, 0.56, 0.06, 8, 1), { pos: [0, 0.53, 0], color: '#3f6b3a' }));
    const H = 0.9 * s;
    base.push(part(new THREE.CylinderGeometry(0.07 * s, 0.15 * s, H, 5, 3), { pos: [0, 0.5 + H / 2, 0], color: '#6b4a30', deform: (v) => { v.x += Math.sin((v.y - 0.5) * 3.2) * 0.14 * s; } }));
    const nB = 3 + model.branches.length;
    const clusters = [];
    for (let i = 0; i < nB; i++) {
      const a = i * 2.1 + 0.6, len = (0.42 + hash(i, 3) * 0.2) * s, y = 0.5 + H * (0.55 + 0.45 * hash(i, 5));
      const dir = { x: Math.cos(a) * len, z: Math.sin(a) * len };
      const br = model.branches[i - 3] || null;
      base.push(part(new THREE.CylinderGeometry(0.03 * s, 0.05 * s, len, 4, 1), { pos: [dir.x / 2, y + 0.12 * s, dir.z / 2], rot: [0, -a, Math.PI / 2 + 0.35], color: br ? '#8a6a48' : '#6b4a30' }));
      const cx = dir.x * 1.05, cz = dir.z * 1.05, cy = y + 0.26 * s;
      const col = br ? br.color : (i % 2 ? '#4fae55' : '#69c47a');
      base.push(part(new THREE.IcosahedronGeometry(0.3 * s, 0), { pos: [cx, cy, cz], scale: [1.25, 0.65, 1.25], jitter: 0.08, seed: 20 + i, color: col, faceVar: 0.16 }));
      clusters.push({ x: cx, y: cy, z: cz, r: 0.3 * s, color: col });
    }
    base.push(part(new THREE.IcosahedronGeometry(0.34 * s, 0), { pos: [0, 0.5 + H + 0.1 * s, 0], scale: [1.2, 0.7, 1.2], jitter: 0.1, seed: 9, color: '#7fd28a', faceVar: 0.16 }));
    clusters.push({ x: 0, y: 0.5 + H + 0.1 * s, z: 0, r: 0.34 * s, color: '#7fd28a' });
    g.add(mesh(base, M.base, 'bh-bonsai-holz'));
    // Früchte: kleine leuchtende Kugeln in Figurenfarbe, außen an den Blätterballen (höchstens 36 sichtbar)
    const byColor = new Map();
    model.fruits.slice(0, 36).forEach((f, i) => {
      const c = clusters[i % clusters.length];
      const a = hash(i, 7) * TAU, e = 0.55 + hash(i, 11) * 0.5;
      const geo = part(new THREE.IcosahedronGeometry(0.075 * s, 0), { pos: [c.x + Math.cos(a) * c.r * 1.15, c.y - c.r * 0.35 + hash(i, 13) * c.r * 0.6, c.z + Math.sin(a) * c.r * 1.15 * e], color: f.color });
      if (!byColor.has(f.color)) byColor.set(f.color, []);
      byColor.get(f.color).push(geo);
    });
    for (const [hex, geos] of byColor) { const m = mesh(geos, M.glow(hex, { intensity: 0.9 }), 'bh-bonsai-frucht'); m.castShadow = false; g.add(m); }
    g.userData = { fruits: model.fruits.length, branches: model.branches.length, size: model.size, stage: model.stage };
    return done(g);
  }

  // ---- Glas: Glühwürmchen (Momente) schweben, Muscheln (anonym) liegen am Boden ----
  function glass(summary) {
    const g = new THREE.Group(); g.name = 'bh-glas';
    const base = [];
    base.push(part(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 10, 1), { pos: [0, 0.05, 0], color: '#6b4a30' }));
    base.push(part(new THREE.CylinderGeometry(0.08, 0.1, 0.9, 6, 1), { pos: [-0.62, 0.55, 0], color: '#6b4a30' }));   // Pfahl
    base.push(part(new THREE.BoxGeometry(0.8, 0.06, 0.8), { pos: [0, 0.1, 0], color: '#a87850' }));
    const glassMesh = new THREE.Mesh(part(new THREE.CylinderGeometry(0.42, 0.36, 0.95, 10, 1, true), { pos: [0, 0.6, 0], color: '#dff4ff' }), M.glass('#bfe8ff', { opacity: 0.28 }));
    glassMesh.name = 'bh-glas-glas'; glassMesh.castShadow = false;
    const lid = part(new THREE.CylinderGeometry(0.44, 0.44, 0.07, 10, 1), { pos: [0, 1.1, 0], color: '#8a6a48' });
    base.push(lid);
    const shells = [];
    summary.shells.slice(0, 40).forEach((sh, i) => {
      const a = hash(i, 17) * TAU, r = hash(i, 19) * 0.28;
      shells.push(part(new THREE.ConeGeometry(0.06, 0.05, 5, 1), { pos: [Math.cos(a) * r, 0.16 + Math.floor(i / 12) * 0.05, Math.sin(a) * r], rot: [Math.PI / 2, 0, a], color: NEED_COLOR[sh.need] || '#ffd23f' }));
    });
    g.add(mesh(base, M.base, 'bh-glas-holz'));
    if (shells.length) g.add(mesh(shells, M.base, 'bh-glas-muscheln'));
    g.add(glassMesh);
    // Glühwürmchen: eigenes Mesh je Farbe, Positionen werden animiert (kleine Gruppe, höchstens 24)
    const flies = [];
    summary.fireflies.slice(-24).forEach((f, i) => {
      const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 0), M.glow('#fff6a8', { intensity: 1.6, veil: false }));
      m.userData.seed = i; m.castShadow = false; m.name = 'bh-glas-gluehwuermchen';
      g.add(m); flies.push(m);
    });
    g.userData = { fireflies: summary.fireflies.length, shells: summary.shells.length };
    return done(g, (dt, t) => {
      for (const m of flies) {
        const k = m.userData.seed;
        const a = t * (0.5 + hash(k, 23) * 0.5) + k * 1.7;
        m.position.set(Math.cos(a) * (0.12 + hash(k, 29) * 0.2), 0.32 + hash(k, 31) * 0.55 + Math.sin(t * 1.3 + k) * 0.07, Math.sin(a * 0.8) * (0.12 + hash(k, 37) * 0.2));
        m.material.emissiveIntensity = 1.2 + Math.sin(t * 3 + k * 2) * 0.5;
      }
    });
  }

  // ---- Chronik-Pinnwand: neun Rahmen auf dem Zeitstrahl, gelegte Splitter als getönte Karten, Kette darunter ----
  function pinnwand(chain, tints = {}) {
    const g = new THREE.Group(); g.name = 'bh-pinnwand';
    const base = [];
    base.push(part(new THREE.BoxGeometry(4.6, 2.2, 0.12), { pos: [0, 1.75, 0], color: '#c9a26e', faceVar: 0.08 }));
    base.push(part(new THREE.BoxGeometry(4.8, 0.1, 0.18), { pos: [0, 2.9, 0], color: '#6b4a30' }));
    base.push(part(new THREE.BoxGeometry(4.8, 0.1, 0.18), { pos: [0, 0.6, 0], color: '#6b4a30' }));
    base.push(part(new THREE.BoxGeometry(4.2, 0.03, 0.03), { pos: [0, 1.15, 0.08], color: '#3b3848' }));   // Zeitstrahl
    const glows = new Map();
    chain.forEach((c, i) => {
      const x = -2.0 + i * 0.5, y = 2.05 - (i % 2) * 0.55;
      base.push(part(new THREE.BoxGeometry(0.42, 0.34, 0.03), { pos: [x, y, 0.07], color: '#fff6e0' }));
      base.push(part(new THREE.CylinderGeometry(0.03, 0.03, 0.04, 6, 1), { pos: [x, y + 0.2, 0.09], rot: [Math.PI / 2, 0, 0], color: '#ff3b3b' }));   // Pin
      if (c.placed) {
        const hex = tints[c.shard] || '#ffd166';
        const geo = part(new THREE.BoxGeometry(0.36, 0.28, 0.02), { pos: [x, y, 0.1], color: hex });
        if (!glows.has(hex)) glows.set(hex, []);
        glows.get(hex).push(geo);
        if (c.correct) base.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 5, 1), { pos: [x, 1.15 + (y - 1.15) / 2, 0.06], color: '#ffd166' }));  // Faden zum Zeitstrahl
      }
      base.push(part(new THREE.SphereGeometry(0.035, 6, 4), { pos: [x, 1.15, 0.09], color: c.placed && c.correct ? '#ffd166' : '#5c4030' }));
    });
    g.add(mesh(base, M.base, 'bh-pinnwand-holz'));
    for (const [hex, geos] of glows) { const m = mesh(geos, M.glow(hex, { intensity: 0.45 }), 'bh-pinnwand-karte'); m.castShadow = false; g.add(m); }
    g.userData = { placed: chain.filter((c) => c.placed).length, correct: chain.filter((c) => c.correct).length };
    return done(g);
  }

  // ---- Trophäenwand: Regal mit Medaillen-Scheiben und Aufnäher-Kacheln ----
  function trophies(list) {
    const g = new THREE.Group(); g.name = 'bh-trophaeen';
    const base = [];
    const W = 2.6;
    base.push(part(new THREE.BoxGeometry(W, 2.3, 0.12), { pos: [0, 1.75, 0], color: '#7a5a3c', faceVar: 0.1 }));
    for (let i = 0; i < 3; i++) base.push(part(new THREE.BoxGeometry(W - 0.1, 0.06, 0.4), { pos: [0, 0.95 + i * 0.6, 0.2], color: '#a87850' }));
    const glows = new Map();
    list.slice(0, 18).forEach((t, i) => {
      const row = Math.floor(i / 6), col = i % 6;
      const x = -W / 2 + 0.3 + col * ((W - 0.6) / 5), y = 1.0 + row * 0.6;
      const hex = TIER_COLOR[t.tier] || t.color || '#ffd166';
      let geo;
      if (t.kind === 'medaille') geo = part(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 10, 1), { pos: [x, y + 0.14, 0.24], rot: [Math.PI / 2, 0, 0], color: hex });
      else if (t.kind === 'aufnaeher') geo = part(new THREE.BoxGeometry(0.2, 0.2, 0.04), { pos: [x, y + 0.14, 0.24], rot: [0, 0, Math.PI / 4], color: t.color || hex });
      else geo = part(new THREE.OctahedronGeometry(0.11, 0), { pos: [x, y + 0.14, 0.24], color: t.color || hex });
      if (!glows.has(hex)) glows.set(hex, []);
      glows.get(hex).push(geo);
      base.push(part(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 8, 1), { pos: [x, y + 0.02, 0.24], color: '#5c4030' }));
    });
    g.add(mesh(base, M.base, 'bh-trophaeen-regal'));
    for (const [hex, geos] of glows) { const m = mesh(geos, M.glow(hex, { intensity: 0.55 }), 'bh-trophaeen-stueck'); m.castShadow = false; g.add(m); }
    g.userData = { count: list.length };
    return done(g);
  }

  // ---- Tür zum Sicheren Ort: geschlossen mit Hängematten-Schild, offen mit leuchtendem Rahmen ----
  function door({ open = false } = {}) {
    const g = new THREE.Group(); g.name = 'bh-tuer';
    const base = [];
    base.push(part(new THREE.BoxGeometry(1.5, 2.5, 0.16), { pos: [0, 1.25, 0], color: '#5c4030', faceVar: 0.06 }));
    base.push(part(new THREE.BoxGeometry(1.1, 2.1, 0.08), { pos: [0, 1.15, 0.06], color: open ? '#a87850' : '#7a5a3c', faceVar: 0.08 }));
    base.push(part(new THREE.SphereGeometry(0.07, 6, 4), { pos: [0.38, 1.1, 0.14], color: '#ffd166' }));
    g.add(mesh(base, M.base, 'bh-tuer-holz'));
    const frame = part(new THREE.BoxGeometry(1.2, 2.2, 0.03), { pos: [0, 1.15, 0.11], color: open ? '#2de2c9' : '#8a90a8' });
    const fm = new THREE.Mesh(frame, M.glow(open ? '#2de2c9' : '#6f7a99', { intensity: open ? 0.9 : 0.15 })); fm.name = 'bh-tuer-rahmen'; fm.castShadow = false;
    // Innen: Ausschnitt-Optik über eine dunklere Fläche davor (kein echter Durchbruch)
    const inner = new THREE.Mesh(part(new THREE.BoxGeometry(1.0, 2.0, 0.02), { pos: [0, 1.15, 0.125], color: open ? '#0f3a3a' : '#4a3a2a' }), M.base); inner.name = 'bh-tuer-innen';
    g.add(inner); g.add(fm);
    g.userData = { open };
    return done(g);
  }

  // ---- Möbel: Form je Katalog-Eintrag (kiste, laterne, lampe, brett, teppich, trommel, windrad, sturmglas, bank, kristall, glut, netz) ----
  function furniture(def, item) {
    const g = new THREE.Group(); g.name = 'bh-moebel';
    const base = [], glow = [];
    const c = def.color || '#a87850';
    switch (def.shape) {
      case 'laterne': base.push(part(new THREE.CylinderGeometry(0.05, 0.07, 1.4, 5, 1), { pos: [0, 0.7, 0], color: '#5c4030' })); glow.push(part(new THREE.SphereGeometry(0.22, 8, 6), { pos: [0, 1.55, 0], color: c })); break;
      case 'lampe': base.push(part(new THREE.CylinderGeometry(0.2, 0.28, 0.5, 8, 1), { pos: [0, 0.25, 0], color: '#6b4a30' })); glow.push(part(new THREE.ConeGeometry(0.32, 0.4, 7, 1), { pos: [0, 0.72, 0], rot: [Math.PI, 0, 0], color: c })); break;
      case 'brett': base.push(part(new THREE.BoxGeometry(0.42, 1.9, 0.08), { pos: [0, 0.95, 0], rot: [0.12, 0, 0], color: c, faceVar: 0.06, deform: (v) => { v.z += (v.y / 0.95) ** 2 * 0.06; } })); break;
      case 'teppich': base.push(part(new THREE.CylinderGeometry(0.75, 0.75, 0.04, 12, 1), { pos: [0, 0.02, 0], color: c, faceVar: 0.14 })); break;
      case 'trommel': base.push(part(new THREE.CylinderGeometry(0.34, 0.3, 0.6, 9, 1), { pos: [0, 0.3, 0], color: c, faceVar: 0.1 })); base.push(part(new THREE.CylinderGeometry(0.34, 0.34, 0.04, 9, 1), { pos: [0, 0.62, 0], color: '#f0e0c0' })); break;
      case 'windrad': base.push(part(new THREE.CylinderGeometry(0.03, 0.05, 1.2, 4, 1), { pos: [0, 0.6, 0], color: '#5c4030' })); for (let i = 0; i < 4; i++) base.push(part(new THREE.BoxGeometry(0.06, 0.4, 0.14), { pos: [Math.cos(i * Math.PI / 2) * 0.22, 1.2 + Math.sin(i * Math.PI / 2) * 0.22, 0.05], rot: [0, 0, i * Math.PI / 2 + 0.5], color: c })); break;
      case 'sturmglas': base.push(part(new THREE.BoxGeometry(0.34, 0.06, 0.34), { pos: [0, 0.03, 0], color: '#6b4a30' })); glow.push(part(new THREE.CylinderGeometry(0.09, 0.11, 0.7, 7, 1), { pos: [0, 0.42, 0], color: c })); break;
      case 'bank': base.push(part(new THREE.BoxGeometry(1.3, 0.16, 0.5), { pos: [0, 0.42, 0], color: c, faceVar: 0.12 })); for (const sx of [-1, 1]) base.push(part(new THREE.BoxGeometry(0.12, 0.36, 0.44), { pos: [sx * 0.55, 0.18, 0], color: '#7a5a3c' })); break;
      case 'kristall': glow.push(part(new THREE.OctahedronGeometry(0.3, 0), { pos: [0, 0.42, 0], scale: [1, 1.6, 1], color: c })); base.push(part(new THREE.CylinderGeometry(0.22, 0.28, 0.12, 6, 1), { pos: [0, 0.06, 0], color: '#5f5a6e' })); break;
      case 'glut': base.push(part(new THREE.IcosahedronGeometry(0.34, 0), { pos: [0, 0.3, 0], scale: [1.2, 0.8, 1.2], jitter: 0.1, color: '#3a2a24' })); glow.push(part(new THREE.IcosahedronGeometry(0.16, 0), { pos: [0, 0.42, 0], color: c })); break;
      case 'netz': for (let i = 0; i < 5; i++) glow.push(part(new THREE.SphereGeometry(0.05, 5, 4), { pos: [Math.cos(i * 1.26) * 0.4, 1.3 + Math.sin(i * 2.1) * 0.2, Math.sin(i * 1.26) * 0.4], color: c })); base.push(part(new THREE.CylinderGeometry(0.03, 0.04, 1.3, 4, 1), { pos: [0, 0.65, 0], color: '#5c4030' })); break;
      default: base.push(part(new THREE.BoxGeometry(0.9, 0.7, 0.75), { pos: [0, 0.35, 0], color: c, faceVar: 0.1 })); base.push(part(new THREE.BoxGeometry(0.95, 0.07, 0.8), { pos: [0, 0.7, 0], color: '#6b4a30' }));
    }
    if (base.length) g.add(mesh(base, M.base, 'bh-moebel-' + def.id));
    if (glow.length) { const m = mesh(glow, M.glow(c, { intensity: 0.8 }), 'bh-moebel-glow'); m.castShadow = false; g.add(m); }
    g.userData = { id: def.id, cx: item.cx, cz: item.cz };
    return done(g);
  }

  // ---- Außenpodest: Tür in den Stamm, Papierlaterne, Schild mit Bonsai-Symbol ----
  function deck() {
    const g = new THREE.Group(); g.name = 'bh-podest';
    const base = [];
    base.push(part(new THREE.BoxGeometry(1.6, 2.4, 0.3), { pos: [0, 1.2, 0], color: '#5c4030', faceVar: 0.08 }));
    base.push(part(new THREE.BoxGeometry(1.1, 2.05, 0.1), { pos: [0, 1.05, 0.14], color: '#a87850', faceVar: 0.1 }));
    base.push(part(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 10, 1, false, 0, Math.PI), { pos: [0, 2.4, 0], rot: [Math.PI / 2, 0, 0], color: '#5c4030' }));
    base.push(part(new THREE.SphereGeometry(0.07, 6, 4), { pos: [0.36, 1.05, 0.22], color: '#ffd166' }));
    // Schild
    base.push(part(new THREE.BoxGeometry(0.08, 1.4, 0.08), { pos: [-2.2, 0.7, -0.5], color: '#6b4a30' }));
    base.push(part(new THREE.BoxGeometry(0.9, 0.5, 0.06), { pos: [-2.2, 1.45, -0.5], color: '#fff6e0' }));
    g.add(mesh(base, M.base, 'bh-podest-holz'));
    const glows = [part(new THREE.IcosahedronGeometry(0.12, 0), { pos: [-2.2, 1.45, -0.44], color: '#4fae55' }), part(new THREE.SphereGeometry(0.22, 8, 6), { pos: [2.2, 2.0, -0.6], color: '#ffd166' })];
    const gm = mesh(glows, M.glow('#ffd166', { intensity: 1.3 }), 'bh-podest-licht'); gm.castShadow = false; g.add(gm);
    const post = mesh([part(new THREE.CylinderGeometry(0.05, 0.06, 2.0, 5, 1), { pos: [2.2, 1.0, -0.6], color: '#5c4030' })], M.base, 'bh-podest-pfahl'); g.add(post);
    return done(g);
  }

  return { bonsai, glass, pinnwand, trophies, door, furniture, deck, NEED_COLOR, TIER_COLOR };
}
