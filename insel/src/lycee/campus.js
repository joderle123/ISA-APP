// Annexe Junglinster – Erweiterung des Campus (Phase 1 „Architektur mit Charakter“, Auftrag 17.11.2026):
// hinter dem Haupthaus ein Innenhof mit Bogengängen, ein Nordflügel mit Aula (Bühne, Vorhang, Klavier) und Lesesaal
// (zwei Etagen Bücher, Galerie, Treppe), ein Glockenturm, Ecktürmchen am Haupthaus, ein Gewächshaus (Schulgarten-AG),
// Sitzstufen und eine alte Linde. Das Gebäude ist erfunden – nur der Name ist echt. Alles aus Kästen und gemalten
// Oberflächen (texturen.js), damit es auch auf Tablets flüssig läuft.
import * as THREE from 'three';
import { schiefer, buecher, wandFlaeche, dachFlaeche } from './texturen.js';

// Norden ist −z. Haupthaus: x −30 … 30, z −30 … −2 (welt.js).
export const CAMPUS = {
  hof: { x0: -26, x1: 26, z0: -54, z1: -30 },
  nord: { x0: -30, x1: 30, z0: -72, z1: -54, h: 9.6, decke: 7.4 },
  turm: { x: 34, z: -58, b: 3, h: 20 },
};

let _hellGlas = null;
const hellGlas = () => (_hellGlas = _hellGlas || new THREE.MeshLambertMaterial({ color: '#e6f6ff', emissive: '#9fd0e6', emissiveIntensity: 0.25, transparent: true, opacity: 0.32, depthWrite: false }));

// Neue Orte (Ziele, Treffpunkte)
export const ORTE_CAMPUS = {
  innenhof: { x: 0, z: -34, yaw: Math.PI }, linde: { x: 2, z: -36.6, yaw: Math.PI }, aula: { x: -14, z: -57, yaw: Math.PI },
  lesesaal: { x: 14, z: -57, yaw: Math.PI }, gewaechshaus: { x: 15, z: -46.5, yaw: Math.PI }, turm: { x: 34, z: -53.5, yaw: Math.PI },
  sitzstufen: { x: -16, z: -44.6, yaw: Math.PI }, torWest: { x: -33, z: -40.5, yaw: Math.PI / 2 }, torOst: { x: 33, z: -40.5, yaw: -Math.PI / 2 },
};

export function baueCampus({ B, P, R, schilder, C, schild, uhrTextur, stuhl, boden, extra, D, TUER_H }) {
  const { box, wand } = B;
  // Geometrie einfärben und in die gemeinsamen Netze legen (wie box() in welt.js)
  const geo = (g, c, art = 'fest') => {
    g = g.index ? g.toNonIndexed() : g;
    if (g.attributes.uv) g.deleteAttribute('uv');
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const k = nor.getY(i) > 0.5 ? 1 : nor.getY(i) < -0.5 ? 0.86 : 0.95; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    B.teile[art].push(g);
  };
  const hart = (x0, x1, z0, z1, y1 = 3) => B.kasten.push({ x0, x1, z0, z1, y0: 0, y1 });
  const tS = schiefer(), tB = buecher();
  const scheibe = (x0, x1, y0, y1, z0, z1, fest = true) => {   // durchsichtige Scheibe (eigenes Netz)
    const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), hellGlas()); m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); m.renderOrder = 2; extra(m);
    if (fest) hart(x0, x1, z0, z1, y1);
  };
  const hex = (h) => new THREE.Color(h);
  const bronze = hex('#9c7a3c'), dunkel = hex('#2b2b33'), vorhang = hex('#9e2a2b'), vorhang2 = hex('#7e1f22'), erde = C.erde || hex('#8a6a4a');

  // ---------- Bogenwand: Pfeiler mit Rundbögen (für die Bogengänge) ----------
  function bogenWand(achse, fest, a0, a1, H, n, dicke, c) {
    const w = (a1 - a0) / n, oeff = w * 0.7, rad = oeff / 2, kampfer = Math.min(H - rad - 0.4, 2.4);
    const sh = new THREE.Shape(); sh.moveTo(0, -0.1); sh.lineTo(a1 - a0, -0.1); sh.lineTo(a1 - a0, H); sh.lineTo(0, H); sh.closePath();
    for (let i = 0; i < n; i++) {
      const m = w * (i + 0.5), h = new THREE.Path();
      h.moveTo(m - rad, 0); h.lineTo(m + rad, 0); h.lineTo(m + rad, kampfer); h.absarc(m, kampfer, rad, 0, Math.PI, false); h.lineTo(m - rad, 0);
      sh.holes.push(h);
    }
    const g = new THREE.ExtrudeGeometry(sh, { depth: dicke, bevelEnabled: false, curveSegments: 10 });
    if (achse === 'x') g.translate(a0, 0, fest - dicke / 2);
    else { g.rotateY(-Math.PI / 2); g.translate(fest + dicke / 2, 0, a0); }
    geo(g, c);
    // Pfeiler sind fest (Kollision), die Bögen dazwischen offen
    const pf = (w - oeff) / 2;
    for (let i = 0; i <= n; i++) {
      const p0 = a0 + i * w - (i ? pf : 0), p1 = a0 + i * w + (i < n ? pf : 0);
      if (achse === 'x') hart(p0, p1, fest - dicke / 2, fest + dicke / 2); else hart(fest - dicke / 2, fest + dicke / 2, p0, p1);
      // Kämpfergesims und Sockel an jedem Pfeiler
      if (achse === 'x') { box(p0 - 0.06, p1 + 0.06, kampfer - 0.12, kampfer, fest - dicke / 2 - 0.06, fest + dicke / 2 + 0.06, C.gesims); box(p0 - 0.05, p1 + 0.05, 0, 0.35, fest - dicke / 2 - 0.05, fest + dicke / 2 + 0.05, C.sockel); }
      else { box(fest - dicke / 2 - 0.06, fest + dicke / 2 + 0.06, kampfer - 0.12, kampfer, p0 - 0.06, p1 + 0.06, C.gesims); box(fest - dicke / 2 - 0.05, fest + dicke / 2 + 0.05, 0, 0.35, p0 - 0.05, p1 + 0.05, C.sockel); }
    }
  }

  // ---------- Satteldach (First längs x) mit Schieferfläche ----------
  function dachTexturen(x0, x1, z0, z1, y, h) {
    const tief = (z1 - z0) / 2 + 0.8, zc = (z0 + z1) / 2, n = Math.atan2(h, tief);
    for (const s of [1, -1]) {
      const o = 0.19;   // auf die Oberseite der Platte
      extra(dachFlaeche(tS, x0 - 0.8, x1 + 0.8, zc + s * tief + s * Math.sin(n) * o, y + Math.cos(n) * o, zc + s * Math.sin(n) * o, y + h + Math.cos(n) * o, 3));
    }
  }
  function satteldach(x0, x1, z0, z1, y, h) {
    const tief = (z1 - z0) / 2 + 0.8, zc = (z0 + z1) / 2, neig = Math.atan2(h, tief), lang = Math.hypot(h, tief);
    for (const s of [1, -1]) { const g = new THREE.BoxGeometry(x1 - x0 + 1.6, 0.35, lang); g.rotateX(s * neig); g.translate((x0 + x1) / 2, y + h / 2, zc + s * tief / 2); geo(g, C.schiefer); }
    for (const x of [x0, x1]) {
      const sh = new THREE.Shape(); sh.moveTo(-(z1 - z0) / 2 - 0.4, 0); sh.lineTo((z1 - z0) / 2 + 0.4, 0); sh.lineTo(0, h - 0.1); sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }); g.rotateY(Math.PI / 2); g.translate(x - 0.15, y, zc); geo(g, C.sandsteinDunkel);
    }
    box(x0 - 0.9, x1 + 0.9, y + h - 0.05, y + h + 0.22, zc - 0.18, zc + 0.18, C.schieferHell);   // Firstziegel
    dachTexturen(x0, x1, z0, z1, y, h);
  }
  // Dach des Haupthauses bekommt ebenfalls Schiefer (Platten liegen schon, welt.js)
  dachTexturen(-30, 30, -30, -2, 8.6, 4.4);
  // Gauben (kleine Dachfenster) auf der Hofseite des Haupthauses
  for (const x of [-20, -10, 10, 20]) {
    box(x - 0.9, x + 0.9, 9.4, 11.0, -6.2, -5.0, C.sandstein); box(x - 0.6, x + 0.6, 9.7, 10.7, -5.02, -4.95, C.glas, { art: 'glas' });
    const g = new THREE.ConeGeometry(1.35, 0.9, 4); g.rotateY(Math.PI / 4); g.scale(1, 1, 1.1); g.translate(x, 11.45, -5.6); geo(g, C.schiefer);
  }
  // Schornsteine
  for (const x of [-24, 6]) box(x - 0.45, x + 0.45, 11, 14.6, -17.5, -16.6, C.sandsteinDunkel);

  // ================= Ecktürmchen am Haupthaus (vorne links und rechts) =================
  for (const [x, z] of [[-31.4, -0.6], [31.4, -0.6]]) {
    const g = new THREE.CylinderGeometry(1.8, 1.95, 12.6, 12, 1); g.translate(x, 6.3, z); geo(g, C.sandstein);
    for (const y of [0.35, 4.0, 8.5, 12.4]) { const r = new THREE.CylinderGeometry(2.02, 2.02, y < 1 ? 0.7 : 0.26, 12, 1); r.translate(x, y, z); geo(r, y < 1 ? C.sockel : C.gesims); }
    const d = new THREE.ConeGeometry(2.4, 4.4, 12); d.translate(x, 12.6 + 2.2, z); geo(d, C.schiefer);
    box(x - 0.05, x + 0.05, 17, 18.4, z - 0.05, z + 0.05, C.metallDunkel);
    for (const [a, y] of [[0.4, 2.2], [-0.4, 6.2], [0.4, 10.2]]) { const wx = x + Math.sin(a + (x > 0 ? 0.6 : -0.6)) * 1.86, wz = z + Math.cos(a + (x > 0 ? 0.6 : -0.6)) * 1.86; box(wx - 0.28, wx + 0.28, y, y + 1.1, wz - 0.28, wz + 0.28, C.rahmen); }
    hart(x - 1.9, x + 1.9, z - 1.9, z + 1.9, 12);
  }

  // ================= Innenhof mit Bogengängen =================
  const H = CAMPUS.hof;
  box(H.x0, H.x1, 0, 0.06, H.z0, H.z1, C.pflaster, { art: 'innen' }); boden(H.x0, H.x1, H.z0, H.z1, 'pflaster');
  // Wege seitlich am Haupthaus vorbei nach hinten
  box(-36, -30, 0, 0.06, -46, -2, C.pflaster, { art: 'innen' }); boden(-36, -30, -46, -2, 'pflaster');
  box(30, 34, 0, 0.06, -46, -2, C.pflaster, { art: 'innen' }); boden(30, 34, -46, -2, 'pflaster');
  for (const [xa, xo, s] of [[-26, -30, -1], [26, 30, 1]]) {
    // innen: Bögen zum Hof · außen: Mauer mit Tor und kleinen Fenstern · oben: flaches Dach mit Schiefer
    bogenWand('z', xa, H.z0, H.z1, 4.2, 8, 0.5, C.sandstein);
    wand('z', xo, H.z0, H.z1, 0, 4.4, D, C.sandstein, [{ von: -41.7, bis: -39.3, unten: 0, oben: 3.0 }, { von: -51, bis: -49.6, unten: 1.6, oben: 2.8 }, { von: -36, bis: -34.6, unten: 1.6, oben: 2.8 }], { stoss: true });
    const a = Math.min(xa, xo) - 0.3, b = Math.max(xa, xo) + 0.3;
    box(a, b, 4.2, 4.5, H.z0, H.z1, C.gesims);
    box(a, b, 4.5, 4.62, H.z0, H.z1, C.schiefer);
    box(Math.min(xa, xo) + 0.2, Math.max(xa, xo) - 0.2, 3.95, 4.2, H.z0, H.z1, C.decke, { art: 'innen' });
    boden(Math.min(xa, xo), Math.max(xa, xo), H.z0, H.z1, { c1: '#d8cbb5', c2: '#c9b89c', s: 1 });
    box(Math.min(xa, xo), Math.max(xa, xo), 0, 0.1, H.z0, H.z1, C.sandsteinDunkel, { art: 'innen' });
    for (let z = -51; z <= -33; z += 6) box(Math.min(xa, xo) + 1.2, Math.max(xa, xo) - 1.2, 3.86, 3.95, z - 0.6, z + 0.6, C.licht, { art: 'licht' });
    // Torbogen-Schild außen
    const t = schild('Innenhof', 1.6, 0.42, { bg: '#2d3d5c', rand: '#e9c46a', schrift: 'bold 110px Georgia, serif' });
    t.position.set(xo + s * 0.2, 3.5, -40.5); t.rotation.y = s > 0 ? Math.PI / 2 : -Math.PI / 2; schilder.push(t);
    R('bogen' + (s > 0 ? 'O' : 'W'), 'Bogengang', Math.min(xa, xo), Math.max(xa, xo), H.z0, H.z1, { decke: 3.9 });
  }
  // Alte Linde mit Rundbank in der Mitte
  P('haus/tree-large', 2, -40, 0.4, { h: 12.5, fest: 1.1 });
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2, x = 2 + Math.sin(a) * 2.5, z = -40 + Math.cos(a) * 2.5;
    const g = new THREE.BoxGeometry(1.5, 0.12, 0.5); g.rotateY(a); g.translate(x, 0.48, z); geo(g, C.holz);
    const f = new THREE.BoxGeometry(0.12, 0.42, 0.12); f.translate(x, 0.21, z); geo(f, C.metallDunkel);
    B.sitze.push({ x: 2 + Math.sin(a) * 2.75, z: -40 + Math.cos(a) * 2.75, rot: a, bank: true });
  }
  hart(-0.9, 4.9, -42.9, -37.1, 1);
  // Blumenbeete an den Ecken des Hofs
  for (const [x, z] of [[-20, -34], [20, -34], [-20, -50.5], [10, -33]]) {
    box(x - 2, x + 2, 0, 0.45, z - 1, z + 1, C.sandsteinDunkel, { stoss: true }); box(x - 1.85, x + 1.85, 0.45, 0.5, z - 0.85, z + 0.85, erde);
    for (let i = 0; i < 6; i++) { const g = new THREE.IcosahedronGeometry(0.42 + (i % 3) * 0.06, 0); g.scale(1, 0.7, 1); g.translate(x - 1.4 + (i % 3) * 1.4, 0.72, z - 0.4 + Math.floor(i / 3) * 0.8); geo(g, i % 2 ? C.gruen : hex('#2e7d4f')); }
    for (let i = 0; i < 26; i++) { const g = new THREE.IcosahedronGeometry(0.075, 0); g.translate(x - 1.7 + ((i * 37) % 34) / 10, 0.98 + ((i * 13) % 5) * 0.03, z - 0.75 + ((i * 17) % 15) / 10); geo(g, [C.rot, C.gelb, hex('#e85d75'), hex('#f2efe6'), hex('#9b7bc8')][i % 5]); }
  }
  // Sitzstufen (Unterricht draußen im Sommer)
  for (let i = 0; i < 4; i++) {
    box(-22, -10, 0, 0.42 * (i + 1), -46 - 1.5 * (i + 1), -46 - 1.5 * i, C.beton);
    box(-22, -10, 0.42 * (i + 1), 0.42 * (i + 1) + 0.06, -46 - 1.5 * i - 0.55, -46 - 1.5 * i - 0.05, C.holzHell);
  }
  hart(-22, -10, -52, -46, 1.7);
  for (let x = -21.2; x < -10.5; x += 1.2) B.sitze.push({ x, z: -46.25, rot: 0, bank: true });
  // Gewächshaus (Schulgarten-AG): Glas, Metallrahmen, Beete
  { const X0 = 10, X1 = 20, Z0 = -50, Z1 = -43, W = 2.6, F = 3.8;
    for (let x = X0; x <= X1 + 0.01; x += 2.5) for (const z of [Z0, Z1]) box(x - 0.05, x + 0.05, 0, W, z - 0.05, z + 0.05, C.metall);
    for (let z = Z0; z <= Z1 + 0.01; z += 3.5) for (const x of [X0, X1]) box(x - 0.05, x + 0.05, 0, W, z - 0.05, z + 0.05, C.metall);
    scheibe(X0, X1, 0.3, W, Z0 - 0.03, Z0 + 0.03);
    scheibe(X0, 14, 0.3, W, Z1 - 0.03, Z1 + 0.03); scheibe(16, X1, 0.3, W, Z1 - 0.03, Z1 + 0.03);
    for (const x of [X0, X1]) scheibe(x - 0.03, x + 0.03, 0.3, W, Z0, Z1);
    box(X0, X1, 0, 0.3, Z0 - 0.08, Z0 + 0.08, C.sockel); box(X0 - 0.08, X0 + 0.08, 0, 0.3, Z0, Z1, C.sockel); box(X1 - 0.08, X1 + 0.08, 0, 0.3, Z0, Z1, C.sockel);
    const zc = (Z0 + Z1) / 2, half = (Z1 - Z0) / 2, n = Math.atan2(F - W, half), l = Math.hypot(F - W, half);
    for (const s of [1, -1]) { const m = new THREE.Mesh(new THREE.BoxGeometry(X1 - X0 + 0.2, 0.05, l), hellGlas()); m.rotation.x = s * n; m.position.set((X0 + X1) / 2, (W + F) / 2, zc + s * half / 2); m.renderOrder = 2; extra(m);
      for (let x = X0; x <= X1 + 0.01; x += 2.5) { const g = new THREE.BoxGeometry(0.08, 0.08, l); g.rotateX(s * n); g.translate(x, (W + F) / 2 + 0.04, zc + s * half / 2); geo(g, C.metall); } }
    box(X0 - 0.1, X1 + 0.1, F - 0.05, F + 0.06, zc - 0.06, zc + 0.06, C.metall);
    for (const z of [-48.6, -45.6]) { box(11, 19, 0, 0.5, z - 0.6, z + 0.6, C.holz, { art: 'innen', stoss: true }); box(11.1, 18.9, 0.5, 0.55, z - 0.5, z + 0.5, erde, { art: 'innen' });
      for (let x = 11.6; x < 18.6; x += 0.9) { const g = new THREE.ConeGeometry(0.28, 0.6 + ((x * 7) % 3) * 0.15, 6); g.translate(x, 0.85, z); geo(g, C.gruen, 'innen'); } }
    box(19.2, 19.6, 0, 0.9, -44.2, -43.7, C.rot, { art: 'innen' });   // Gießkanne
    const t = schild('Schulgarten', 1.8, 0.42, { bg: '#3fa66b', schrift: 'bold 110px system-ui' }); t.position.set(15, 2.85, Z1 + 0.06); schilder.push(t);
    R('gewaechshaus', 'Gewächshaus', X0, X1, Z0, Z1, { decke: 2.5 }); }

  // ================= Nordflügel: Aula (Westen) und Lesesaal (Osten) =================
  const N = CAMPUS.nord, Y = N.decke;
  const fenster = (a0, a1, aus = []) => { const l = []; for (let a = a0; a <= a1 + 0.01; a += 4) if (!aus.some(([v, b]) => a > v - 1.4 && a < b + 1.4)) l.push({ von: a - 0.75, bis: a + 0.75, unten: 1.3, oben: 4.6 }); return l; };
  const sudT = [{ von: -15.5, bis: -12.5, unten: 0, oben: 3.4 }, { von: 12.5, bis: 15.5, unten: 0, oben: 3.4 }];
  const sudF = fenster(-26, 26, [[-15.5, -12.5], [12.5, 15.5], [-0.5, 0.5]]), nordF = fenster(-26, 26, [[-0.5, 0.5]]);
  const seitF = fenster(-70, -56);
  wand('x', N.z1, N.x0, N.x1, 0, N.h, D, C.sandstein, [...sudT, ...sudF], { stoss: true });
  wand('x', N.z0, N.x0, N.x1, 0, N.h, D, C.sandstein, nordF, { stoss: true });
  wand('z', N.x0, N.z0, N.z1, 0, N.h, D, C.sandstein, seitF, { stoss: true });
  wand('z', N.x1, N.z0, N.z1, 0, N.h, D, C.sandstein, seitF, { stoss: true });
  for (const o of sudF) box(o.von, o.bis, o.unten, o.oben, N.z1 - 0.04, N.z1 + 0.04, C.glas, { art: 'glas', stoss: true });
  for (const o of nordF) box(o.von, o.bis, o.unten, o.oben, N.z0 - 0.04, N.z0 + 0.04, C.glas, { art: 'glas', stoss: true });
  for (const x of [N.x0, N.x1]) for (const o of seitF) box(x - 0.04, x + 0.04, o.unten, o.oben, o.von, o.bis, C.glas, { art: 'glas', stoss: true });
  // Fassade: Sockel, Gesimse, Schlusssteine über den Fenstern, Obergeschoss-Fenster, Sprossen
  for (const [z, s, liste] of [[N.z1, 1, sudF], [N.z0, -1, nordF]]) {
    box(N.x0 - 0.2, N.x1 + 0.2, 0, 0.8, z + s * 0.1, z + s * 0.3, C.sockel);
    box(N.x0 - 0.3, N.x1 + 0.3, 5.0, 5.25, z + s * 0.1, z + s * 0.38, C.gesims);
    box(N.x0 - 0.35, N.x1 + 0.35, N.h - 0.25, N.h, z + s * 0.1, z + s * 0.45, C.gesims);
    for (const o of liste) {
      const m = (o.von + o.bis) / 2;
      box(o.von - 0.15, o.bis + 0.15, o.unten - 0.12, o.unten, z + s * 0.12, z + s * 0.32, C.gesims);
      box(o.von - 0.1, o.bis + 0.1, o.oben, o.oben + 0.18, z + s * 0.12, z + s * 0.3, C.sandsteinDunkel);
      box(m - 0.22, m + 0.22, o.oben, o.oben + 0.42, z + s * 0.14, z + s * 0.34, C.gesims);   // Schlussstein
      box(m - 0.03, m + 0.03, o.unten, o.oben, z + s * 0.04, z + s * 0.08, C.rahmen); box(o.von, o.bis, (o.unten + o.oben) / 2 - 0.03, (o.unten + o.oben) / 2 + 0.03, z + s * 0.04, z + s * 0.08, C.rahmen);
      box(o.von, o.bis, 6.0, 8.4, z + s * 0.18, z + s * 0.2, C.glas, { art: 'glas' }); box(o.von - 0.1, o.bis + 0.1, 5.85, 6.0, z + s * 0.15, z + s * 0.3, C.gesims);
    }
  }
  for (const x of [N.x0, N.x1]) { const s = x < 0 ? -1 : 1; box(x + s * 0.1, x + s * 0.3, 0, 0.8, N.z0, N.z1, C.sockel); box(x + s * 0.1, x + s * 0.38, 5.0, 5.25, N.z0 - 0.3, N.z1 + 0.3, C.gesims); }
  // Portale: Stufen, Säulen, Rundbogen-Giebel
  for (const xm of [-14, 14]) {
    box(xm - 2.4, xm + 2.4, 0, 0.16, N.z1, N.z1 + 1.4, C.beton);
    for (const x of [xm - 2.1, xm + 2.1]) box(x - 0.25, x + 0.25, 0, 3.8, N.z1 + 0.2, N.z1 + 0.7, C.gesims, { stoss: true });
    box(xm - 2.6, xm + 2.6, 3.8, 4.1, N.z1, N.z1 + 0.95, C.gesims);
    const sh = new THREE.Shape(); sh.absarc(0, 0, 2.5, 0, Math.PI, false); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.4, bevelEnabled: false, curveSegments: 14 }); g.scale(1, 0.55, 1); g.translate(xm, 4.1, N.z1 + 0.3); geo(g, C.sandsteinDunkel);
  }
  const plakette = schild('ANNEXE JUNGLINSTER · 1912', 8.4, 0.72, { bg: '#2d3d5c', rand: '#e9c46a', fg: '#f4e8cc', schrift: 'bold 132px Georgia, serif' });
  plakette.position.set(0, 7.25, N.z1 + 0.22); schilder.push(plakette);
  for (const [x, txt] of [[-14, 'Aula'], [14, 'Lesesaal · Bibliothèque']]) { const t = schild(txt, txt.length > 6 ? 3.2 : 1.6, 0.42, { bg: '#2d3d5c', rand: '#e9c46a', schrift: 'bold 110px Georgia, serif' }); t.position.set(x, 4.55, N.z1 + 0.98); schilder.push(t); }
  satteldach(N.x0, N.x1, N.z0, N.z1, N.h, 4.2);
  // Innen: Decke, Lampen, Trennwand mit Durchgang
  box(N.x0 + D / 2, N.x1 - D / 2, Y, Y + 0.12, N.z0 + D / 2, N.z1 - D / 2, C.decke, { art: 'innen' });
  wand('z', 0, N.z0, N.z1, 0, Y, D, C.innenWand, [{ von: -64.2, bis: -61.8, unten: 0, oben: TUER_H + 0.3 }], { stoss: true, art: 'innen' });
  boden(N.x0 + D / 2, -D / 2, N.z0 + D / 2, N.z1 - D / 2, 'holz'); boden(D / 2, N.x1 - D / 2, N.z0 + D / 2, N.z1 - D / 2, 'holz');
  box(N.x0 + D / 2, N.x1 - D / 2, 0.06, 0.1, N.z0 + D / 2, N.z1 - D / 2, C.bodenSaal || C.holz, { art: 'innen' });
  // Innenwände: Holzvertäfelung unten
  for (const [a0, a1] of [[N.x0 + D, -D / 2], [D / 2, N.x1 - D]]) {
    box(a0, a1, 0.1, 1.3, N.z1 - D / 2 - 0.06, N.z1 - D / 2, C.holz, { art: 'innen' }); box(a0, a1, 0.1, 1.3, N.z0 + D / 2, N.z0 + D / 2 + 0.06, C.holz, { art: 'innen' });
  }

  // --- Aula: Bühne, Vorhang, Klavier, Stuhlreihen, Kronleuchter ---
  box(-27, -3, 0, 0.75, -71.6, -66.6, C.holz, { art: 'innen', stoss: true });
  box(-27, -3, 0.75, 0.8, -71.6, -66.6, C.holzHell, { art: 'innen' });
  for (let i = 0; i < 24; i++) { const x = -27 + i; box(x, x + 1, 0.8, 6.6, -71.6, -71.3, i % 2 ? vorhang : vorhang2, { art: 'innen' }); }
  for (const x of [-27.6, -3.6]) for (let i = 0; i < 3; i++) box(x + i * 0.2, x + i * 0.2 + 0.2, 0.8, 6.6, -71.2 + i * 0.25, -70.9 + i * 0.25, i % 2 ? vorhang : vorhang2, { art: 'innen' });
  box(-27.4, -2.6, 6.6, 7.2, -71.7, -71.0, vorhang2, { art: 'innen' });
  box(-8.4, -6.2, 0.8, 2.0, -70.6, -69.2, dunkel, { art: 'innen' }); box(-8.4, -6.2, 1.9, 2.0, -69.3, -68.9, hex('#f2efe6'), { art: 'innen' });   // Klavier
  box(-7.7, -6.9, 0.8, 1.3, -68.6, -68.2, dunkel, { art: 'innen' });
  { const t = schild('AULA', 2.4, 0.6, { bg: '#2d3d5c', rand: '#e9c46a', schrift: 'bold 140px Georgia, serif' }); t.position.set(-15, 6.95, -70.8); schilder.push(t); }
  for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { if (c === 6) continue; stuhl(B, -26.2 + c * 1.95, -63.8 + r * 1.55, Math.PI, C.stuhl[(r + c) % C.stuhl.length]); }
  for (const x of [-22, -15, -8]) for (const z of [-66, -60]) {
    box(x - 0.05, x + 0.05, Y - 1.4, Y, z - 0.05, z + 0.05, C.metallDunkel, { art: 'innen' });
    const g = new THREE.CylinderGeometry(0.9, 0.5, 0.35, 8); g.translate(x, Y - 1.55, z); geo(g, bronze, 'innen');
    box(x - 0.6, x + 0.6, Y - 1.75, Y - 1.62, z - 0.6, z + 0.6, C.licht, { art: 'licht' });
  }
  R('aula', 'Aula', N.x0, 0, N.z0, N.z1, { decke: Y - 0.3 });

  // --- Lesesaal: Bücherwände über zwei Etagen, Galerie, Treppe, Lesetische mit grünen Lampen ---
  const tiefe = 0.45, gal = 3.5;
  const buecherwand = (achse, fest, a0, a1, s, y0, y1) => {   // s: Blickrichtung der Bücher (+1/−1)
    if (achse === 'x') { box(a0, a1, y0, y1, fest - (s > 0 ? 0 : tiefe), fest + (s > 0 ? tiefe : 0), hex('#5a3a22'), { art: 'innen', stoss: y0 < 1 }); extra(wandFlaeche(tB, 'x', fest + s * (tiefe + 0.005), a0, a1, y0, y1, s, 2)); }
    else { box(fest - (s > 0 ? 0 : tiefe), fest + (s > 0 ? tiefe : 0), y0, y1, a0, a1, hex('#5a3a22'), { art: 'innen', stoss: y0 < 1 }); extra(wandFlaeche(tB, 'z', fest + s * (tiefe + 0.005), a0, a1, y0, y1, s, 2)); }
  };
  buecherwand('x', N.z0 + D / 2, 2.4, 29.6, 1, 0.1, 3.2);   // Nordwand unten
  buecherwand('x', N.z0 + D / 2, 1, 29.6, 1, gal + 0.15, 6.9);   // Nordwand oben (Galerie)
  buecherwand('z', N.x1 - D / 2, -71.6, -56.6, -1, 0.1, 3.2);   // Ostwand unten
  buecherwand('z', N.x1 - D / 2, -71.6, -55, -1, gal + 0.15, 6.9);   // Ostwand oben
  // Galerie: Boden, Geländer, Stützen
  box(1, N.x1 - D / 2, gal, gal + 0.15, N.z0 + D / 2, -69.6, C.holz, { art: 'innen' });
  box(27.6, N.x1 - D / 2, gal, gal + 0.15, -69.6, -55, C.holz, { art: 'innen' });
  box(1, 27.6, gal + 0.95, gal + 1.02, -69.66, -69.56, C.holzHell, { art: 'innen' }); box(27.54, 27.64, gal + 0.95, gal + 1.02, -69.6, -55, C.holzHell, { art: 'innen' });
  for (let x = 1.2; x < 27.6; x += 0.5) box(x - 0.02, x + 0.02, gal + 0.15, gal + 0.95, -69.63, -69.59, C.holzHell, { art: 'innen' });
  for (let z = -69.4; z < -55; z += 0.5) box(27.57, 27.61, gal + 0.15, gal + 0.95, z - 0.02, z + 0.02, C.holzHell, { art: 'innen' });
  for (const x of [5, 11, 17, 23]) { box(x - 0.15, x + 0.15, 0.1, gal, -69.75, -69.45, C.holz, { art: 'innen', stoss: true }); }
  for (const z of [-64, -58]) box(27.45, 27.75, 0.1, gal, z - 0.15, z + 0.15, C.holz, { art: 'innen', stoss: true });
  // Treppe zur Galerie (an der Trennwand)
  for (let i = 0; i < 16; i++) box(0.3, 1.6, 0.1, 0.1 + (i + 1) * gal / 16, -56.4 - i * 0.62, -56.4 - (i + 1) * 0.62, C.holz, { art: 'innen' });
  box(0.3, 2.4, gal - 0.05, gal + 0.15, -69.6, -66.3, C.holz, { art: 'innen' });
  hart(0.2, 1.7, -66.6, -56.3, 3);
  // Lesetische mit grünen Lampen
  for (const [x, z] of [[9, -64.5], [19, -64.5], [9, -59.5], [19, -59.5]]) {
    box(x - 3, x + 3, 0.74, 0.8, z - 0.7, z + 0.7, C.holz, { art: 'innen' });
    for (const [lx, lz] of [[-2.8, -0.6], [2.8, -0.6], [-2.8, 0.6], [2.8, 0.6]]) box(x + lx - 0.05, x + lx + 0.05, 0.1, 0.74, z + lz - 0.05, z + lz + 0.05, C.holz, { art: 'innen' });
    hart(x - 3, x + 3, z - 0.7, z + 0.7, 0.8);
    for (const dx of [-1.6, 1.6]) { box(x + dx - 0.03, x + dx + 0.03, 0.8, 1.15, z - 0.03, z + 0.03, bronze, { art: 'innen' }); box(x + dx - 0.25, x + dx + 0.25, 1.12, 1.22, z - 0.12, z + 0.12, hex('#2e7d4f'), { art: 'innen' }); box(x + dx - 0.2, x + dx + 0.2, 1.1, 1.12, z - 0.09, z + 0.09, C.licht, { art: 'licht' }); }
    for (let i = 0; i < 4; i++) { stuhl(B, x - 2.2 + i * 1.45, z - 1.15, 0, C.holz); stuhl(B, x - 2.2 + i * 1.45, z + 1.15, Math.PI, C.holz); }
  }
  box(4, 25, 0.1, 0.115, -67.5, -56.5, hex('#7e3b3b'), { art: 'innen' }); box(4.4, 24.6, 0.115, 0.12, -67.1, -56.9, hex('#a85a4a'), { art: 'innen' });   // Teppich
  { const g = new THREE.SphereGeometry(0.42, 14, 10); g.translate(4, 1.45, -57.2); geo(g, hex('#4f88c8'), 'innen'); box(3.95, 4.05, 0.1, 1.05, -57.25, -57.15, bronze, { art: 'innen' }); hart(3.7, 4.3, -57.5, -56.9, 1.5); }
  for (const x of [8, 14, 20, 26]) for (const z of [-67, -62, -57]) box(x - 0.7, x + 0.7, Y - 0.1, Y - 0.04, z - 0.4, z + 0.4, C.licht, { art: 'licht' });
  R('lesesaal', 'Lesesaal', 0, N.x1, N.z0, N.z1, { decke: Y - 0.3 });

  // ================= Glockenturm (nordöstlich vom Hof) =================
  { const { x, z, b, h } = CAMPUS.turm;
    box(x - b, x + b, 0, h, z - b, z + b, C.sandstein, { stoss: true });
    box(x - b - 0.25, x + b + 0.25, 0, 1.0, z - b - 0.25, z + b + 0.25, C.sockel);
    for (const y of [7, 14]) box(x - b - 0.18, x + b + 0.18, y, y + 0.3, z - b - 0.18, z + b + 0.18, C.gesims);
    box(x - b - 0.35, x + b + 0.35, h, h + 0.45, z - b - 0.35, z + b + 0.35, C.gesims);
    for (const y of [3.5, 10]) { box(x - 0.35, x + 0.35, y, y + 2.2, z + b - 0.02, z + b + 0.04, C.rahmen); box(x - b - 0.04, x - b + 0.02, y, y + 2.2, z - 0.35, z + 0.35, C.rahmen); }
    // Glockenstube: vier Eckpfeiler, Glocke, Dach
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) box(x + dx * b - 0.8 * (dx > 0 ? 1 : 0), x + dx * b + 0.8 * (dx < 0 ? 1 : 0), h + 0.45, h + 4.6, z + dz * b - 0.8 * (dz > 0 ? 1 : 0), z + dz * b + 0.8 * (dz < 0 ? 1 : 0), C.sandstein);
    box(x - b - 0.3, x + b + 0.3, h + 4.6, h + 5.1, z - b - 0.3, z + b + 0.3, C.gesims);
    { const g = new THREE.CylinderGeometry(0.5, 1.15, 1.6, 12); g.translate(x, h + 2.7, z); geo(g, bronze); box(x - 0.08, x + 0.08, h + 3.5, h + 4.6, z - 0.08, z + 0.08, dunkel); }
    { const g = new THREE.ConeGeometry(b * 1.45, 8.5, 4); g.rotateY(Math.PI / 4); g.translate(x, h + 5.1 + 4.25, z); geo(g, C.schiefer); }
    box(x - 0.06, x + 0.06, h + 13.6, h + 16.2, z - 0.06, z + 0.06, C.metallDunkel);
    box(x + 0.06, x + 1.5, h + 15.2, h + 16.1, z - 0.02, z + 0.02, hex('#e9c46a'));   // Fahne
    for (const [px, pz, ry] of [[x, z + b + 0.03, 0], [x - b - 0.03, z, -Math.PI / 2]]) {
      const u = new THREE.Mesh(new THREE.CircleGeometry(1.35, 32), new THREE.MeshBasicMaterial({ map: uhrTextur(), toneMapped: false }));
      u.position.set(px, 16.4, pz); u.rotation.y = ry; schilder.push(u);
      const ring = new THREE.TorusGeometry(1.42, 0.12, 6, 28); ring.rotateY(ry); ring.translate(px, 16.4, pz); geo(ring, C.gesims);
    }
  }
}

// ================= Phase 1b: Neubau (Musik, Kunst, Informatik) und Sportplatz =================
export const ORTE_CAMPUS2 = {
  neubau: { x: 37, z: -50, yaw: -Math.PI / 2 }, musik: { x: 52, z: -58, yaw: Math.PI }, kunst: { x: 52, z: -50, yaw: Math.PI },
  informatik: { x: 52, z: -42, yaw: Math.PI }, sportplatz: { x: -56, z: 6, yaw: Math.PI / 2 }, tribuene: { x: -66, z: -6, yaw: Math.PI / 2 },
};

// Bild auf der Staffelei: ein paar Farbflecken und Pinselstriche
function gemaelde(seed) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 160; const g = c.getContext('2d');
  let s = seed >>> 0; const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  g.fillStyle = ['#f4ecd8', '#dfeaf2', '#f2e2e2', '#e3efe0'][seed % 4]; g.fillRect(0, 0, 128, 160);
  for (let i = 0; i < 14; i++) { g.fillStyle = ['#d9523c', '#2f6db0', '#e9b949', '#3fa66b', '#6b4e8a', '#2b3a55'][Math.floor(r() * 6)]; g.globalAlpha = 0.55 + r() * 0.4; g.beginPath(); g.ellipse(r() * 128, r() * 160, 6 + r() * 30, 4 + r() * 18, r() * 3, 0, 7); g.fill(); }
  g.globalAlpha = 1; g.strokeStyle = '#2b2b33'; g.lineWidth = 3; g.beginPath(); g.moveTo(r() * 128, r() * 160); for (let i = 0; i < 4; i++) g.quadraticCurveTo(r() * 128, r() * 160, r() * 128, r() * 160); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function baueCampus2({ B, P, R, schilder, C, schild, stuhl, boden, extra, D, TUER_H }) {
  const { box, wand } = B;
  const hex = (h) => new THREE.Color(h);
  const geo = (g, c, art = 'fest') => {
    g = g.index ? g.toNonIndexed() : g; if (g.attributes.uv) g.deleteAttribute('uv');
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const k = nor.getY(i) > 0.5 ? 1 : nor.getY(i) < -0.5 ? 0.86 : 0.95; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); B.teile[art].push(g);
  };
  const hart = (x0, x1, z0, z1, y1 = 3) => B.kasten.push({ x0, x1, z0, z1, y0: 0, y1 });
  const schwarz = hex('#22252c'), schirm = hex('#7fc4ff'), weiss = hex('#f4f4f2'), lack = hex('#c0392b');

  // ---------- Neubau: Holz und Glas, Flachdach mit Solarzellen ----------
  const X0 = 40, X1 = 64, Z0 = -62, Z1 = -38, H = 4.4, Y = 3.9;
  box(30, 40, 0, 0.06, -52, -48, C.pflaster, { art: 'innen' }); boden(30, 40, -52, -48, 'pflaster');
  box(30, 34, 0, 0.06, -60, -46, C.pflaster, { art: 'innen' }); boden(30, 34, -60, -46, 'pflaster');
  const glas = (achse, fest, a0, a1) => { const l = []; for (let a = a0; a < a1 - 1; a += 3) l.push({ von: a + 0.2, bis: a + 2.8, unten: 0.6, oben: 3.6 }); return l; };
  const westF = glas('z', X0, Z0 + 1, Z1 - 1).filter((o) => o.bis < -51.4 || o.von > -48.6);
  wand('z', X0, Z0, Z1, 0, H, D, C.modern, [{ von: -51.2, bis: -48.8, unten: 0, oben: 2.9 }, ...westF], { stoss: true });
  const ostF = glas('z', X1, Z0 + 1, Z1 - 1), nordF = glas('x', Z0, X0 + 1, X1 - 1), sudF = glas('x', Z1, X0 + 1, X1 - 1);
  wand('z', X1, Z0, Z1, 0, H, D, C.modern, ostF, { stoss: true });
  wand('x', Z0, X0, X1, 0, H, D, C.modern, nordF, { stoss: true });
  wand('x', Z1, X0, X1, 0, H, D, C.modern, sudF, { stoss: true });
  for (const o of westF) box(X0 - 0.03, X0 + 0.03, o.unten, o.oben, o.von, o.bis, C.glas, { art: 'glas', stoss: true });
  for (const o of ostF) box(X1 - 0.03, X1 + 0.03, o.unten, o.oben, o.von, o.bis, C.glas, { art: 'glas', stoss: true });
  for (const o of nordF) box(o.von, o.bis, o.unten, o.oben, Z0 - 0.03, Z0 + 0.03, C.glas, { art: 'glas', stoss: true });
  for (const o of sudF) box(o.von, o.bis, o.unten, o.oben, Z1 - 0.03, Z1 + 0.03, C.glas, { art: 'glas', stoss: true });
  // Holzlamellen außen (Charakter: warm neben dem alten Stein)
  for (let z = Z0 + 0.2; z < Z1; z += 0.5) box(X0 - 0.32, X0 - 0.2, 3.6, H, z, z + 0.22, C.holzHell);
  for (let x = X0 + 0.2; x < X1; x += 0.5) box(x, x + 0.22, 3.6, H, Z1 + 0.2, Z1 + 0.32, C.holzHell);
  box(X0 - 0.5, X1 + 0.5, H, H + 0.3, Z0 - 0.5, Z1 + 0.5, C.metallDunkel);
  for (let x = X0 + 2; x < X1 - 2; x += 3.2) for (let z = Z0 + 2; z < Z1 - 2; z += 4) { const g = new THREE.BoxGeometry(2.8, 0.08, 1.7); g.rotateX(-0.35); g.translate(x + 1.4, H + 0.75, z + 0.9); geo(g, hex('#24345c')); }
  { const t = schild('Neubau · Musik · Kunst · Informatik', 5.6, 0.5, { bg: '#2b3a55', schrift: 'bold 96px system-ui' }); t.position.set(X0 - 0.36, 3.3, -50); t.rotation.y = -Math.PI / 2; schilder.push(t); }
  box(X0 + D / 2, X1 - D / 2, Y, Y + 0.1, Z0 + D / 2, Z1 - D / 2, C.decke, { art: 'innen' });
  box(X0 + D / 2, X1 - D / 2, 0.06, 0.1, Z0 + D / 2, Z1 - D / 2, hex('#cfd6d9'), { art: 'innen' });
  boden(X0 + D / 2, 44, Z0 + D / 2, Z1 - D / 2, { c1: '#d6dcdf', c2: '#c9d0d3', s: 1.2 });
  boden(44, X1 - D / 2, Z0 + D / 2, Z1 - D / 2, 'holz');
  // Flur (Westen) und drei Räume
  wand('z', 44, Z0, Z1, 0, Y, 0.2, C.innenWandGang || C.innenWand, [{ von: -59, bis: -57, unten: 0, oben: TUER_H }, { von: -51, bis: -49, unten: 0, oben: TUER_H }, { von: -43, bis: -41, unten: 0, oben: TUER_H }], { stoss: true, art: 'innen' });
  for (const z of [-54, -46]) wand('x', z, 44, X1, 0, Y, 0.2, C.innenWand, [], { stoss: true, art: 'innen' });
  for (let z = -60; z < -38; z += 4) box(41, 43, Y - 0.08, Y - 0.02, z - 0.4, z + 0.4, C.licht, { art: 'licht' });
  for (const [x, z] of [[48, -58], [56, -58], [48, -50], [56, -50], [48, -42], [56, -42]]) box(x - 1, x + 1, Y - 0.08, Y - 0.02, z - 0.5, z + 0.5, C.licht, { art: 'licht' });
  for (const [z, txt] of [[-58, 'Musik'], [-50, 'Kunst'], [-42, 'Informatik']]) { const t = schild(txt, 1.3, 0.34, { bg: '#2b3a55', schrift: 'bold 100px system-ui' }); t.position.set(43.88, 2.75, z); t.rotation.y = -Math.PI / 2; schilder.push(t); }

  // Musikraum: Schlagzeug, Keyboard, Gitarren an der Wand, Stühle im Halbkreis, Akustikplatten
  { const cx = 58, cz = -60;
    for (const [dx, dz, r, h] of [[0, 0, 0.32, 0.45], [0.7, -0.1, 0.22, 0.6], [-0.7, -0.1, 0.22, 0.6], [0.4, 0.6, 0.25, 0.5]]) { const g = new THREE.CylinderGeometry(r, r, 0.3, 14); g.translate(cx + dx, h, cz + dz); geo(g, dx === 0 ? lack : weiss, 'innen'); const f = new THREE.CylinderGeometry(0.02, 0.02, h, 4); f.translate(cx + dx, h / 2, cz + dz); geo(f, C.metall, 'innen'); }
    for (const dx of [-0.9, 1.0]) { const g = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 14); g.translate(cx + dx, 1.25, cz - 0.4); geo(g, hex('#d4af37'), 'innen'); box(cx + dx - 0.015, cx + dx + 0.015, 0, 1.25, cz - 0.415, cz - 0.385, C.metall, { art: 'innen' }); }
    hart(cx - 1.3, cx + 1.3, cz - 0.9, cz + 1.0, 1.3);
    box(48, 50.6, 0.75, 0.86, -61.2, -60.6, schwarz, { art: 'innen' }); for (let i = 0; i < 22; i++) box(48.06 + i * 0.115, 48.16 + i * 0.115, 0.86, 0.88, -60.95, -60.62, weiss, { art: 'innen' });
    for (let i = 0; i < 22; i++) if ([0, 1, 3, 4, 5].includes(i % 7) && i < 21) box(48.14 + i * 0.115, 48.2 + i * 0.115, 0.88, 0.9, -60.95, -60.78, schwarz, { art: 'innen' });
    for (const x of [48.2, 50.4]) box(x - 0.03, x + 0.03, 0.1, 0.75, -61, -60.8, C.metall, { art: 'innen' }); hart(48, 50.6, -61.2, -60.6, 0.9);
    for (let i = 0; i < 4; i++) {   // Gitarren an der Wand: Korpus aus zwei Rundungen, langer Hals, Kopf
      const x = 47 + i * 1.3, f = [hex('#b35a2a'), hex('#2f5d8a'), lack, hex('#e9b949')][i];
      for (const [r, y] of [[0.27, 1.38], [0.2, 1.72]]) { const g = new THREE.CylinderGeometry(r, r, 0.1, 16); g.rotateX(Math.PI / 2); g.translate(x, y, -61.72); geo(g, f, 'innen'); }
      { const g = new THREE.CylinderGeometry(0.075, 0.075, 0.11, 12); g.rotateX(Math.PI / 2); g.translate(x, 1.55, -61.7); geo(g, schwarz, 'innen'); }
      box(x - 0.035, x + 0.035, 1.85, 2.55, -61.74, -61.68, hex('#5a3a22'), { art: 'innen' }); box(x - 0.06, x + 0.06, 2.55, 2.72, -61.74, -61.68, schwarz, { art: 'innen' });
      box(x - 0.08, x + 0.08, 2.74, 2.78, -61.79, -61.74, C.metall, { art: 'innen' });
    }
    for (let i = 0; i < 7; i++) { const a = -0.9 + i * 0.3, x = 54 + Math.sin(a) * 4, z = -56.6 - Math.cos(a) * 0.1 + Math.abs(a) * 1.5; stuhl(B, x, z, Math.PI + a * 0.6, C.stuhl[i % C.stuhl.length]); }
    for (let x = 45; x < 63; x += 1.2) box(x, x + 1, 2.2, 3.2, -61.82, -61.76, hex('#4a4f5c'), { art: 'innen' });
    R('musik', 'Musikraum', 44, X1, Z0, -54, { decke: Y - 0.3 }); }
  // Kunstraum: Staffeleien mit Bildern, Tische mit Farbtöpfen, Waschbecken
  { for (const [i, x, z] of [[0, 48, -52], [1, 51, -52.3], [2, 54, -52], [3, 57, -52.3], [4, 60, -52]]) {
      const bein = (dx, dz, l, ax) => { const g = new THREE.BoxGeometry(0.05, l, 0.05); g.rotateX(ax); g.translate(x + dx, l / 2 * Math.cos(ax), z + dz); geo(g, C.holz, 'innen'); };
      bein(-0.35, 0, 1.7, 0.08); bein(0.35, 0, 1.7, 0.08); bein(0, 0.45, 1.6, -0.35);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.0), new THREE.MeshLambertMaterial({ map: gemaelde(i * 7 + 3) })); m.position.set(x, 1.25, z + 0.12); m.rotation.x = -0.08; extra(m);
      box(x - 0.45, x + 0.45, 0.7, 0.74, z + 0.02, z + 0.14, C.holz, { art: 'innen' }); hart(x - 0.45, x + 0.45, z - 0.2, z + 0.5, 1.7);
    }
    for (const z of [-48.6]) { box(47, 61, 0.74, 0.8, z - 0.8, z + 0.8, C.holzHell, { art: 'innen' }); hart(47, 61, z - 0.8, z + 0.8, 0.8); for (const x of [47.3, 60.7]) box(x - 0.05, x + 0.05, 0.1, 0.74, z - 0.7, z + 0.7, C.metall, { art: 'innen' });
      for (let i = 0; i < 12; i++) { const g = new THREE.CylinderGeometry(0.08, 0.07, 0.14, 8); g.translate(48 + i * 1.1, 0.87, z + (i % 2 ? 0.3 : -0.3)); geo(g, [lack, hex('#2f6db0'), hex('#e9b949'), hex('#3fa66b'), hex('#6b4e8a')][i % 5], 'innen'); } }
    box(62.6, 63.7, 0.85, 0.95, -53.5, -52, weiss, { art: 'innen', stoss: true }); box(62.6, 63.7, 0.1, 0.85, -53.4, -52.1, hex('#9aa3ad'), { art: 'innen' });
    for (let x = 45.5; x < 62; x += 2.4) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.0), new THREE.MeshLambertMaterial({ map: gemaelde(Math.round(x * 13)) })); m.position.set(x, 2.3, -46.16); m.rotation.y = Math.PI; extra(m); }
    R('kunst', 'Kunstraum', 44, X1, -54, -46, { decke: Y - 0.3 }); }
  // Informatik: drei Reihen Tische mit Bildschirmen
  { for (let r = 0; r < 3; r++) { const z = -44.6 + r * 2.2; box(46, 62, 0.74, 0.8, z - 0.45, z + 0.45, weiss, { art: 'innen' }); hart(46, 62, z - 0.45, z + 0.45, 0.8);
      for (const x of [46.3, 61.7]) box(x - 0.04, x + 0.04, 0.1, 0.74, z - 0.4, z + 0.4, C.metall, { art: 'innen' });
      for (let i = 0; i < 6; i++) { const x = 47.4 + i * 2.6; box(x - 0.42, x + 0.42, 0.95, 1.45, z - 0.33, z - 0.29, schwarz, { art: 'innen' }); box(x - 0.38, x + 0.38, 0.99, 1.41, z - 0.29, z - 0.28, schirm, { art: 'licht' }); box(x - 0.04, x + 0.04, 0.8, 0.95, z - 0.33, z - 0.29, schwarz, { art: 'innen' }); box(x - 0.3, x + 0.3, 0.8, 0.82, z - 0.05, z + 0.12, hex('#3a3f4b'), { art: 'innen' }); stuhl(B, x, z + 0.75, Math.PI, C.stuhl[(i + r) % C.stuhl.length]); } }
    box(62.9, 63.8, 0.1, 1.9, -40.2, -39.0, schwarz, { art: 'innen', stoss: true }); for (let i = 0; i < 6; i++) box(62.88, 62.9, 0.3 + i * 0.26, 0.34 + i * 0.26, -40, -39.2, i % 2 ? hex('#3fa66b') : hex('#e9b949'), { art: 'licht' });
    R('informatik', 'Informatik', 44, X1, -46, Z1, { decke: Y - 0.3 }); }
  R('neubauFlur', 'Neubau', X0, 44, Z0, Z1, { decke: Y - 0.3 });

  // ---------- Sportplatz (Westen): Laufbahn, Fußballfeld, Tore, Tribüne ----------
  const SX0 = -104, SX1 = -68, SZ0 = -34, SZ1 = 18;
  box(SX0, SX1, 0, 0.04, SZ0, SZ1, hex('#b5523b'), { art: 'innen' });              // Kunststoff-Laufbahn
  box(SX0 + 4, SX1 - 4, 0.04, 0.05, SZ0 + 6, SZ1 - 6, C.rasen2 || C.rasen, { art: 'innen' });
  for (let i = 1; i < 4; i++) { const o = i * 1.2; for (const [a0, a1, b0, b1] of [[SX0 + o, SX1 - o, SZ0 + o, SZ0 + o + 0.06], [SX0 + o, SX1 - o, SZ1 - o - 0.06, SZ1 - o], [SX0 + o, SX0 + o + 0.06, SZ0 + o, SZ1 - o], [SX1 - o - 0.06, SX1 - o, SZ0 + o, SZ1 - o]]) box(a0, a1, 0.04, 0.045, b0, b1, weiss, { art: 'innen' }); }
  const FX0 = SX0 + 6, FX1 = SX1 - 6, FZ0 = SZ0 + 8, FZ1 = SZ1 - 8, fm = (FZ0 + FZ1) / 2;
  for (const [a0, a1, b0, b1] of [[FX0, FX1, FZ0, FZ0 + 0.1], [FX0, FX1, FZ1 - 0.1, FZ1], [FX0, FX0 + 0.1, FZ0, FZ1], [FX1 - 0.1, FX1, FZ0, FZ1], [FX0, FX1, fm - 0.05, fm + 0.05]]) box(a0, a1, 0.05, 0.06, b0, b1, weiss, { art: 'innen' });
  { const g = new THREE.TorusGeometry(4, 0.05, 4, 40); g.rotateX(Math.PI / 2); g.translate((FX0 + FX1) / 2, 0.055, fm); geo(g, weiss, 'innen'); }
  for (const [z, s] of [[FZ0, 1], [FZ1, -1]]) {
    const xm = (FX0 + FX1) / 2;
    for (const x of [xm - 3.66, xm + 3.66]) box(x - 0.06, x + 0.06, 0, 2.44, z - 0.06, z + 0.06, weiss, { stoss: true });
    box(xm - 3.72, xm + 3.72, 2.38, 2.5, z - 0.06, z + 0.06, weiss);
    const netz = new THREE.Mesh(new THREE.BoxGeometry(7.3, 2.4, 1.6), new THREE.MeshLambertMaterial({ color: '#ffffff', transparent: true, opacity: 0.22, depthWrite: false })); netz.position.set(xm, 1.2, z - s * 0.85); extra(netz);
    for (const [a0, a1, b0, b1] of [[xm - 9, xm + 9, z + s * 5.5 - 0.05, z + s * 5.5 + 0.05], [xm - 9, xm - 8.9, Math.min(z, z + s * 5.5), Math.max(z, z + s * 5.5)], [xm + 8.9, xm + 9, Math.min(z, z + s * 5.5), Math.max(z, z + s * 5.5)]]) box(a0, a1, 0.05, 0.06, b0, b1, weiss, { art: 'innen' });
  }
  // Tribüne (Osten des Platzes, Blick nach Westen)
  for (let i = 0; i < 5; i++) { box(SX1 + 0.4 + i * 0.9, SX1 + 1.3 + i * 0.9, 0, 0.45 * (i + 1), -22, 6, C.beton); box(SX1 + 0.45 + i * 0.9, SX1 + 0.9 + i * 0.9, 0.45 * (i + 1), 0.45 * (i + 1) + 0.08, -22, 6, [C.blau, C.gelb][i % 2]); }
  hart(SX1 + 0.4, SX1 + 4.9, -22, 6, 2.3);
  for (let z = -21; z < 5.5; z += 1.3) B.sitze.push({ x: SX1 + 0.55, z, rot: -Math.PI / 2, bank: true });
  box(SX1 + 4.4, SX1 + 4.7, 0, 4.4, -22, -21.7, C.metall); box(SX1 + 4.4, SX1 + 4.7, 0, 4.4, 5.7, 6, C.metall);
  box(SX1 - 0.4, SX1 + 5.2, 4.4, 4.6, -22.3, 6.3, C.metallDunkel);
  { const t = schild('Stade Annexe', 3.6, 0.6, { bg: '#2fb8a8', schrift: 'bold 110px system-ui' }); t.position.set(SX1 + 5.0, 3.6, -8); t.rotation.y = -Math.PI / 2; schilder.push(t); const t2 = t.clone(); t2.rotation.y = Math.PI / 2; t2.position.x = SX1 + 4.38; schilder.push(t2); }
  // Weg vom Hof zum Sportplatz (Durchgang in der Hofmauer bei z 4 … 8)
  box(-68, -46, 0, 0.06, 4, 8, C.pflaster, { art: 'innen' }); boden(-68, -46, 4, 8, 'pflaster');
  for (const z of [-30, -18, -6, 10]) P('platz/lantern', SX1 + 6.2, z, 0, { h: 2.6 });
}
