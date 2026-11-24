// Eigene Autos (Rückmeldung der Schüler: „Autos furchtbar“). Vorher: Bausatz-Autos, deren Einfärbung auch Reifen und
// Scheiben blass machte. Jetzt: Seitenprofil als Extrusion mit leichter Fase, dunkle Scheiben, Reifen mit Felgen,
// Scheinwerfer, Rücklichter, Kühlergrill, Spiegel. Farbe wird eingebaut (Vertex-Farben), nicht nachträglich getönt.
// Längs z, Front bei +z (wie die alten Modelle) – so passen Verkehr und geparkte Autos ohne weitere Änderung.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const FARBEN = { weiss: '#eceef0', schwarz: '#22252b', silber: '#a9b1bb', blau: '#24406b', rot: '#a8282a', grau: '#5c6470', gruen: '#2f5a4e', sand: '#c9b48e' };

// Seitenprofil (Länge entlang u, Höhe v), Front bei u > 0
const TYPEN = {
  limo: { l: 4.4, b: 1.8, unten: [[-2.2, 0.32], [2.2, 0.32], [2.24, 0.6], [2.1, 0.8], [0.95, 0.94], [-1.75, 0.98], [-2.18, 0.9], [-2.24, 0.48]],
    glas: [[0.95, 0.93], [0.3, 1.36], [-0.95, 1.36], [-1.78, 0.97]], dach: [0.3, -0.95, 1.36], achse: 1.38, rad: 0.34 },
  kompakt: { l: 3.9, b: 1.74, unten: [[-1.9, 0.32], [1.95, 0.32], [1.99, 0.62], [1.85, 0.82], [0.85, 0.96], [-1.88, 1.0], [-1.95, 0.5]],
    glas: [[0.85, 0.95], [0.22, 1.42], [-1.55, 1.42], [-1.88, 0.99]], dach: [0.22, -1.55, 1.42], achse: 1.25, rad: 0.32 },
  suv: { l: 4.6, b: 1.9, unten: [[-2.3, 0.42], [2.3, 0.42], [2.34, 0.78], [2.2, 1.0], [1.05, 1.12], [-2.2, 1.14], [-2.32, 0.6]],
    glas: [[1.05, 1.11], [0.45, 1.62], [-2.0, 1.62], [-2.2, 1.13]], dach: [0.45, -2.05, 1.62], achse: 1.45, rad: 0.4 },
  bus: { l: 4.9, b: 1.95, unten: [[-2.45, 0.38], [2.45, 0.38], [2.48, 0.8], [2.3, 1.1], [1.6, 1.2], [-2.42, 1.22], [-2.48, 0.55]],
    glas: [[1.6, 1.19], [1.05, 1.95], [-2.3, 1.95], [-2.42, 1.21]], dach: [1.05, -2.35, 1.95], achse: 1.6, rad: 0.38 },
};

function farbig(g, farbe) {
  const c = new THREE.Color(farbe), n = g.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(a, 3));
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(k)) g.deleteAttribute(k);
  return g.index ? g.toNonIndexed() : g;
}
// Profil extrudieren: Breite entlang x, Länge entlang z (u → z), Höhe y
function profil(punkte, breite, farbe, fase = 0.06) {
  const s = new THREE.Shape(punkte.map(([u, v]) => new THREE.Vector2(u, v)));
  const g = new THREE.ExtrudeGeometry(s, { depth: breite - fase * 2, bevelEnabled: true, bevelThickness: fase, bevelSize: fase, bevelSegments: 2, curveSegments: 1 });
  g.translate(0, 0, -(breite - fase * 2) / 2);   // Shape-Ebene xy, Extrusion z → danach drehen: u → z, Extrusion → x
  g.rotateY(-Math.PI / 2);
  return farbig(g, farbe);
}
const kasten = (w, h, d, x, y, z, farbe) => { const g = new THREE.BoxGeometry(w, h, d); g.translate(x, y, z); return farbig(g, farbe); };
function rad(x, z, r, farbe) {
  const reifen = new THREE.CylinderGeometry(r, r, 0.24, 18); reifen.rotateZ(Math.PI / 2); reifen.translate(x, r, z);
  const felge = new THREE.CylinderGeometry(r * 0.58, r * 0.58, 0.26, 12); felge.rotateZ(Math.PI / 2); felge.translate(x, r, z);
  const nabe = new THREE.CylinderGeometry(r * 0.16, r * 0.16, 0.28, 8); nabe.rotateZ(Math.PI / 2); nabe.translate(x, r, z);
  return [farbig(reifen, '#18191c'), farbig(felge, farbe), farbig(nabe, '#6b7280')];
}

export function bauAuto(typ = 'limo', farbe = FARBEN.weiss, { taxi = false } = {}) {
  const T = TYPEN[typ] || TYPEN.limo, b = T.b, teile = [];
  teile.push(profil(T.unten, b, farbe));
  teile.push(profil(T.glas, b - 0.16, '#1a2431', 0.03));
  const [d0, d1, dh] = T.dach;
  teile.push(kasten(b - 0.14, 0.07, d0 - d1, 0, dh + 0.02, (d0 + d1) / 2, farbe));          // Dach
  teile.push(kasten(b - 0.12, dh - T.glas[3][1] + 0.02, 0.09, 0, (dh + T.glas[3][1]) / 2, (d0 + d1) / 2 + 0.05, farbe));   // B-Säule
  const us = T.unten.map((p) => p[0]), vorn = Math.max(...us) + 0.05, hinten = Math.min(...us) - 0.05, hl = T.unten[2][1] - 0.06;
  for (const s of [-1, 1]) {
    teile.push(kasten(0.36, 0.11, 0.05, s * (b / 2 - 0.3), hl, vorn + 0.02, '#f6f1d6'));    // Scheinwerfer
    teile.push(kasten(0.34, 0.1, 0.05, s * (b / 2 - 0.28), hl + 0.06, hinten - 0.02, '#c0262b'));   // Rücklicht
    teile.push(kasten(0.06, 0.1, 0.16, s * (b / 2 + 0.05), T.glas[0][1] + 0.02, T.glas[0][0] - 0.12, farbe));   // Spiegel
    for (const z of [T.achse, -T.achse]) {
      { const r = T.rad * 1.22, h = new THREE.CylinderGeometry(r, r, 0.012, 20, 1, false, 0, Math.PI); h.rotateZ(Math.PI / 2); h.translate(s * (b / 2 + 0.004), T.rad, z); teile.push(farbig(h, '#101114')); }   // Radkasten: dunkler Halbkreis
      teile.push(...rad(s * (b / 2 - 0.07), z, T.rad, typ === 'suv' ? '#4a5059' : '#c4cad2'));
    }
  }
  teile.push(kasten(b * 0.46, 0.14, 0.05, 0, hl - 0.04, vorn + 0.02, '#23262c'));          // Kühlergrill
  teile.push(kasten(b - 0.08, 0.12, T.l - 0.3, 0, 0.26, 0, '#2a2d33'));                    // Unterboden (Schatten unter dem Auto)
  teile.push(kasten(b * 0.5, 0.1, 0.04, 0, 0.42, hinten - 0.03, '#f2f2f2'));               // Kennzeichen
  if (taxi) teile.push(kasten(0.5, 0.14, 0.24, 0, dh + 0.12, (d0 + d1) / 2, '#f2c230'));
  const g = mergeGeometries(teile, false);
  g.computeBoundingBox();
  return g;
}

// Alle Varianten als Geometrie-Katalog (Name → Geometrie), passend zu requisiten.stelle()
export function autoKatalog() {
  return {
    'auto2/limo-weiss': bauAuto('limo', FARBEN.weiss), 'auto2/limo-schwarz': bauAuto('limo', FARBEN.schwarz),
    'auto2/limo-blau': bauAuto('limo', FARBEN.blau), 'auto2/limo-silber': bauAuto('limo', FARBEN.silber), 'auto2/kompakt-rot': bauAuto('kompakt', FARBEN.rot),
    'auto2/kompakt-silber': bauAuto('kompakt', FARBEN.silber), 'auto2/kompakt-gruen': bauAuto('kompakt', FARBEN.gruen),
    'auto2/suv-grau': bauAuto('suv', FARBEN.grau), 'auto2/suv-sand': bauAuto('suv', FARBEN.sand),
    'auto2/bus-weiss': bauAuto('bus', FARBEN.weiss), 'auto2/bus-gruen': bauAuto('bus', '#4f7d62'), 'auto2/limo-rot': bauAuto('limo', FARBEN.rot),
    'auto2/kompakt-blau': bauAuto('kompakt', '#3b6ea5'), 'auto2/taxi': bauAuto('limo', '#f2f2f2', { taxi: true }),
  };
}
