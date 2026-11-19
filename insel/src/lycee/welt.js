// Lycée-Simulator – die Welt: Lycée des Collines mit Haupthaus (Halle, Gang, Säle, Sekretariat, SePAS, Kantine, Bibliothek, WC),
// Turnhalle, Werkstatt, Schulhof, Bushaltestelle und Straße. Alles wird hier aus einfachen Formen gebaut (Eckpunktfarben,
// Toon-Material des Spiels); Möbel, Bäume und Fahrzeuge kommen aus den Modell-Paketen (requisiten.js).
// Maße in Metern: x nach Osten, z nach Süden, y nach oben. Ein Stockwerk ist innen 3,6 m hoch; begehbar ist das Erdgeschoss.
// Rückgabe: { gruppe, kasten (Kollision, Liste {x0,x1,z0,z1,y1}), raeume, raumBei(x,z), orte, schilder, plaetze (Möbel) }
import * as THREE from 'three';
import { pflaster, rasen, asphalt, flaeche, fliesen as fliesenTex, dielen } from './texturen.js';
import { baueCampus, baueCampus2, ORTE_CAMPUS, ORTE_CAMPUS2 } from './campus.js';
import { baueDetails } from './details.js';

export const DECKE = 3.6;            // Deckenhöhe innen
const HAUS_H = 8.6;                 // Außenwand Haupthaus (zwei Stockwerke)
const TUER_H = 2.45;

// Farben (sRGB, werden linear umgerechnet)
const F = {
  sandstein: '#e9d6ad', sandsteinDunkel: '#cdb68a', sockel: '#a99a86', gesims: '#f4e8cc',
  schiefer: '#3f4560', schieferHell: '#596081', rahmen: '#3d5a52', glas: '#9fd0e6', glasNacht: '#3c5f86',
  modern: '#dfe4ea', holz: '#b07a4e', holzHell: '#d4a373', beton: '#c9c4bb',
  innenWand: '#f3ece0', innenWandGang: '#e7eef0', sockelLeiste: '#6f8c86', decke: '#f7f4ee',
  bodenHalle: '#d8cbb5', bodenHalle2: '#cbbca3', bodenGang: '#c9d3d1', bodenGang2: '#bcc8c6', bodenSaal: '#c89f74',
  bodenKantine: '#e3d6c1', bodenKantine2: '#d6c6ad', bodenSport: '#d9a96b', linieSport: '#ffffff',
  pflaster: '#cfc7b8', pflaster2: '#c6bdac', pflaster3: '#d6cfc1', asphalt: '#5b5f6a', bordstein: '#d7d3cb', streifen: '#f2f2f2',
  rasen: '#8fc35a', rasen2: '#7bb04c', erde: '#8a6a4a', korbFeld: '#d8693f', korbLinie: '#ffffff',
  tafel: '#2f4f45', tafelRahmen: '#8a6a4a', spind: ['#4f88c8', '#3f78b8', '#5fa0d0', '#2fb8a8'], spindGriff: '#dfe4ea',
  pinnwand: '#b88a5a', zettel: ['#fff3a8', '#ffd1dc', '#cdeaff', '#d8f5c8', '#ffffff'], theke: '#8f6a4e', thekeOben: '#e8e1d4',
  licht: '#fff8e6', deckeHell: '#d9d4ca', buch: ['#c0392b', '#2f6db0', '#e9b949', '#3fa66b', '#6b4e8a', '#d9693f', '#f2efe6', '#2b3a55'], blauDunkel: '#2b3a55', stuhl: ['#4f88c8', '#2fb8a8', '#e9b949', '#e85d75', '#3fa66b'], tischPlatte: '#efe6d6',
  metall: '#8d96a3', metallDunkel: '#5d6573', rot: '#d9523c', gelb: '#ffd166', gruen: '#3fa66b', blau: '#4f88c8',
};
const C = {};
for (const [k, v] of Object.entries(F)) C[k] = Array.isArray(v) ? v.map((x) => new THREE.Color(x)) : new THREE.Color(v);

// ---------- Baukasten ----------
function baukasten() {
  const teile = { fest: [], innen: [], glas: [], licht: [], laub: [] };   // fest: wirft Schatten · innen: Innenausbau (kein Schatten)
  const kasten = [], alle = [], sitze = [];   // sitze: wo man sich hinsetzen kann { x, z, rot }   // alle: jeder Kasten (für die Prüfung „Kann man durchlaufen?“)
  function box(x0, x1, y0, y1, z0, z1, farbe, { art = 'fest', stoss = false, kanten = null } = {}) {
    if (x1 - x0 < 0.001 || y1 - y0 < 0.001 || z1 - z0 < 0.001) return;
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).toNonIndexed();
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const c = farbe.isColor ? farbe : new THREE.Color(farbe);
    const n = g.attributes.position.count, col = new Float32Array(n * 3);
    // leichte Abdunklung der Unterseite/Seiten: wirkt gemalt, ohne Textur
    const nor = g.attributes.normal;
    for (let i = 0; i < n; i++) {
      const k = nor.getY(i) > 0.5 ? 1.0 : nor.getY(i) < -0.5 ? 0.86 : (kanten || 0.95);
      col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.deleteAttribute('uv');
    teile[art].push(g);
    alle.push({ x0, x1, z0, z1, y0, y1, stoss, art });
    if (stoss) kasten.push({ x0, x1, z0, z1, y0, y1 });
  }
  // senkrechte Wand längs x (z fest) oder längs z (x fest) mit Öffnungen {von, bis, unten, oben}
  function wand(achse, fest, a0, a1, y0, y1, dicke, farbe, oeffnungen = [], opt = {}) {
    const ls = [...oeffnungen].sort((p, q) => p.von - q.von);
    let pos = a0;
    const stueck = (b0, b1, u, o) => {
      if (b1 - b0 < 0.01 || o - u < 0.01) return;
      if (achse === 'x') box(b0, b1, u, o, fest - dicke / 2, fest + dicke / 2, farbe, opt);
      else box(fest - dicke / 2, fest + dicke / 2, u, o, b0, b1, farbe, opt);
    };
    for (const o of ls) {
      stueck(pos, o.von, y0, y1);
      stueck(o.von, o.bis, y0, Math.max(y0, o.unten || y0));           // Brüstung
      if ((o.oben || TUER_H) < y1) stueck(o.von, o.bis, o.oben || TUER_H, y1);   // Sturz
      pos = o.bis;
    }
    stueck(pos, a1, y0, y1);
  }
  return { teile, kasten, alle, sitze, box, wand };
}

// Schilder: Text auf einer Leinwand, als Fläche an die Wand
function schildTextur(text, { bg = '#2b3a55', fg = '#ffffff', w = 512, h = 128, schrift = 'bold 64px system-ui, sans-serif', rand = '#f4e8cc' } = {}) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const x = cv.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, w, h);
  if (rand) { x.strokeStyle = rand; x.lineWidth = Math.max(4, h * 0.05); x.strokeRect(x.lineWidth, x.lineWidth, w - 2 * x.lineWidth, h - 2 * x.lineWidth); }
  x.fillStyle = fg; x.font = schrift; x.textAlign = 'center'; x.textBaseline = 'middle';
  const zeilen = String(text).split('\n'), lh = h / (zeilen.length + 0.6);
  zeilen.forEach((z, i) => x.fillText(z, w / 2, lh * (i + 0.8)));
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
export function schild(text, breite, hoehe, opt = {}) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(breite, hoehe),
    new THREE.MeshBasicMaterial({ map: schildTextur(text, { w: Math.round(256 * breite / hoehe), h: 256, schrift: opt.schrift || 'bold 120px system-ui, sans-serif', ...opt }), toneMapped: false }));
  m.name = 'schild';
  return m;
}

export function baueWelt({ material, materialInnen, materialLaub }) {
  const B = baukasten();
  const { box, wand } = B;
  const gruppe = new THREE.Group(); gruppe.name = 'lycee-welt';
  const schilder = [];
  const plaetze = [];     // Möbel aus den Paketen: { m: 'moebel/Desk', x, z, rot, h (Zielhöhe) | s (Maßstab), fest }
  const P = (m, x, z, rot = 0, opt = {}) => plaetze.push({ m, x, z, rot, ...opt });
  const raeume = [];
  const R = (id, name, x0, x1, z0, z1, opt = {}) => raeume.push({ id, name, x0, x1, z0, z1, innen: true, ...opt });

  // ================= Gelände: Straße, Gehweg, Schulhof, Rasen =================
  box(-110, 110, -0.3, 0, -120, 80, C.rasen, { art: 'innen' });                 // Grundfläche
  // Straße im Süden (z 44 … 52) mit Mittellinie, Gehwege beidseits
  box(-110, 110, 0, 0.02, 44, 52, C.asphalt, { art: 'innen' });
  for (let x = -106; x < 110; x += 6) box(x, x + 3, 0.02, 0.03, 47.9, 48.1, C.streifen, { art: 'innen' });
  box(-110, 110, 0, 0.14, 40.5, 44, C.bordstein, { art: 'innen' });
  box(-110, 110, 0, 0.14, 52, 55, C.bordstein, { art: 'innen' });
  // Zebrastreifen vor dem Tor
  for (let i = 0; i < 6; i++) box(-6 + i * 2.2, -6 + i * 2.2 + 1.2, 0.02, 0.035, 44.2, 51.8, C.streifen, { art: 'innen' });
  // Schulhof (gepflastert) zwischen Haus und Straße, mit Muster
  box(-46, 46, 0, 0.06, -2, 40.5, C.pflaster, { art: 'innen' });   // Unterbau; die Steine liegen als Textur darauf (unten)
  // Weg zur Turnhalle (Osten) und zur Werkstatt (Westen)
  box(46, 62, 0, 0.06, -4, 2, C.pflaster, { art: 'innen' });
  box(-62, -46, 0, 0.06, -4, 2, C.pflaster, { art: 'innen' });
  // Mauer mit Tor zur Straße (Tor bei x -8 … 8)
  for (const [a, b] of [[-46, -8], [8, 46]]) {
    box(a, b, 0, 0.9, 39.6, 40.2, C.sockel, { stoss: true });
    box(a, b, 0.9, 1.0, 39.5, 40.3, C.gesims);
  }
  for (const x of [-8.4, 8.4]) { box(x - 0.45, x + 0.45, 0, 2.4, 39.45, 40.35, C.sandsteinDunkel, { stoss: true }); box(x - 0.55, x + 0.55, 2.4, 2.6, 39.35, 40.45, C.gesims); }
  box(-46.4, -45.8, 0, 0.9, -2, 4, C.sockel, { stoss: true }); box(-46.4, -45.8, 0, 0.9, 8, 40.2, C.sockel, { stoss: true });   // Durchgang zum Sportplatz
  box(45.8, 46.4, 0, 0.9, 6, 40.2, C.sockel, { stoss: true });
  // Torbogen-Schild
  const torSchild = schild('ANNEXE JUNGLINSTER', 9, 1.1, { bg: '#2d3d5c', rand: '#e9c46a', schrift: 'bold 150px Georgia, serif' });
  torSchild.position.set(0, 3.25, 40.0); torSchild.rotation.y = 0; schilder.push(torSchild);
  box(-8.4, 8.4, 2.6, 2.75, 39.85, 40.15, C.metallDunkel);
  box(-4.6, 4.6, 2.65, 3.9, 39.93, 40.07, C.metallDunkel);
  const torSchildHinten = torSchild.clone(); torSchildHinten.rotation.y = Math.PI; torSchildHinten.position.z = 39.9; schilder.push(torSchildHinten);
  torSchild.position.z = 40.1;

  // Bushaltestelle (Gehweg Nordseite, westlich vom Tor)
  box(-26, -18, 0.14, 0.24, 41, 43.6, C.beton);
  for (const x of [-25.6, -18.4]) box(x - 0.08, x + 0.08, 0.24, 2.6, 41.2, 41.4, C.metallDunkel, { stoss: true });
  box(-25.8, -18.2, 0.24, 2.4, 41.15, 41.25, C.glas, { art: 'glas', stoss: true });
  box(-26.1, -17.9, 2.6, 2.75, 40.9, 43.4, C.metallDunkel);
  box(-24, -20, 0.24, 0.7, 41.3, 41.8, C.holz, { stoss: true });
  const busSchild = schild('Arrêt · Annexe', 1.6, 0.5, { bg: '#2fb8a8', schrift: 'bold 110px system-ui' });
  busSchild.position.set(-18.2, 2.2, 43.3); busSchild.rotation.y = -Math.PI / 2; schilder.push(busSchild);
  box(-18.25, -18.15, 0.24, 2.5, 43.2, 43.4, C.metallDunkel);

  // ================= Haupthaus: x −30 … 30, z −30 … −2 =================
  const X0 = -30, X1 = 30, Z0 = -30, Z1 = -2, D = 0.35;
  // Sockel und Außenwände mit Fenstern (Erdgeschoss: Öffnungen; Obergeschoss: Fenster als Flächen)
  const fensterReihe = (a0, a1, abstand, ausser = []) => {
    const l = [];
    for (let a = a0; a <= a1 + 0.01; a += abstand) if (!ausser.some(([v, b]) => a > v - 1.2 && a < b + 1.2)) l.push({ von: a - 0.8, bis: a + 0.8, unten: 1.0, oben: 2.7 });
    return l;
  };
  // Süden (Front zum Hof): Haupteingang x −2.4 … 2.4, Kantinen-Tür x 18 … 20.4
  const frontTueren = [{ von: -2.4, bis: 2.4, unten: 0, oben: 3.0 }, { von: 18, bis: 20.2, unten: 0, oben: TUER_H }];
  const frontFenster = fensterReihe(-26, 26, 4, [[-2.4, 2.4], [18, 20.2]]);
  wand('x', Z1, X0, X1, 0, HAUS_H, D, C.sandstein, [...frontTueren, ...frontFenster], { stoss: true });
  wand('x', Z0, X0, X1, 0, HAUS_H, D, C.sandstein, fensterReihe(-26, 26, 4), { stoss: true });
  wand('z', X0, Z0, Z1, 0, HAUS_H, D, C.sandstein, [{ von: -12.6, bis: -10.4, unten: 0, oben: TUER_H }, ...fensterReihe(-26, -6, 4, [[-12.6, -10.4]])], { stoss: true });
  wand('z', X1, Z0, Z1, 0, HAUS_H, D, C.sandstein, [{ von: -12.6, bis: -10.4, unten: 0, oben: TUER_H }, ...fensterReihe(-26, -6, 4, [[-12.6, -10.4]])], { stoss: true });
  // Glas in den Fensteröffnungen des Erdgeschosses
  const glasIn = (achse, fest, l) => { for (const o of l) { if (o.unten === 0) continue; if (achse === 'x') box(o.von, o.bis, o.unten, o.oben, fest - 0.04, fest + 0.04, C.glas, { art: 'glas', stoss: true }); else box(fest - 0.04, fest + 0.04, o.unten, o.oben, o.von, o.bis, C.glas, { art: 'glas', stoss: true }); } };
  glasIn('x', Z1, frontFenster); glasIn('x', Z0, fensterReihe(-26, 26, 4));
  glasIn('z', X0, fensterReihe(-26, -6, 4, [[-12.6, -10.4]])); glasIn('z', X1, fensterReihe(-26, -6, 4, [[-12.6, -10.4]]));
  // Fensterrahmen und Obergeschoss-Fenster (nur außen) an der Front und hinten
  for (const [z, s] of [[Z1, 1], [Z0, -1]]) {
    for (let x = -26; x <= 26.01; x += 4) {
      const frontTuer = s === 1 && (Math.abs(x) < 3 || (x > 17 && x < 21));
      if (!frontTuer) { box(x - 0.95, x + 0.95, 0.9, 1.0, z + s * 0.15, z + s * 0.3, C.gesims); box(x - 0.9, x + 0.9, 2.7, 2.85, z + s * 0.15, z + s * 0.28, C.rahmen); }
      box(x - 0.8, x + 0.8, 4.7, 7.0, z + s * 0.18, z + s * 0.2, C.glas, { art: 'glas' });
      box(x - 0.9, x + 0.9, 4.55, 4.7, z + s * 0.15, z + s * 0.32, C.gesims);
      box(x - 0.9, x + 0.9, 7.0, 7.15, z + s * 0.15, z + s * 0.28, C.rahmen);
      box(x - 0.04, x + 0.04, 4.7, 7.0, z + s * 0.18, z + s * 0.24, C.rahmen);
    }
    box(X0 - 0.2, X1 + 0.2, 0, 0.7, z + s * 0.1, z + s * 0.3, C.sockel);        // Sockel
    box(X0 - 0.3, X1 + 0.3, 3.9, 4.15, z + s * 0.1, z + s * 0.38, C.gesims);   // Gurtgesims zwischen den Stockwerken
    box(X0 - 0.35, X1 + 0.35, HAUS_H - 0.25, HAUS_H, z + s * 0.1, z + s * 0.45, C.gesims);   // Traufgesims
  }
  for (const [x, s] of [[X0, -1], [X1, 1]]) {
    box(x + s * 0.1, x + s * 0.3, 0, 0.7, Z0, Z1, C.sockel);
    box(x + s * 0.1, x + s * 0.38, 3.9, 4.15, Z0 - 0.3, Z1 + 0.3, C.gesims);
    for (let z = -26; z <= -6; z += 4) { box(x + s * 0.18, x + s * 0.2, 4.7, 7.0, z - 0.8, z + 0.8, C.glas, { art: 'glas' }); box(x + s * 0.15, x + s * 0.32, 4.55, 4.7, z - 0.9, z + 0.9, C.gesims); }
  }
  // Eingangsportal: Stufen, Säulen, Vordach, Schild
  box(-4.2, 4.2, 0, 0.16, -2, -0.6, C.beton); box(-3.8, 3.8, 0, 0.32, -2, -1.2, C.beton);
  for (const x of [-3.6, 3.6]) { box(x - 0.3, x + 0.3, 0, 3.6, -1.6, -1.0, C.gesims, { stoss: true }); }
  box(-4.4, 4.4, 3.6, 3.95, -2.2, -0.4, C.schiefer);
  const hausSchild = schild('ANNEXE JUNGLINSTER', 6.4, 0.75, { bg: '#2d3d5c', rand: '#e9c46a', schrift: 'bold 150px Georgia, serif' });
  hausSchild.position.set(0, 4.45, -1.6); schilder.push(hausSchild);
  // Dach: Satteldach (First längs x) aus zwei schrägen Platten + Giebel
  const dachH = 4.4, tief = (Z1 - Z0) / 2 + 0.8;
  const neig = Math.atan2(dachH, tief), lang = Math.hypot(dachH, tief);
  for (const s of [1, -1]) {
    const g = new THREE.BoxGeometry(X1 - X0 + 1.6, 0.35, lang).toNonIndexed();
    g.rotateX(s * neig); g.translate(0, HAUS_H + dachH / 2, (Z0 + Z1) / 2 + s * tief / 2);
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const c = nor.getY(i) > 0.3 ? C.schiefer : C.schieferHell; col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.deleteAttribute('uv');
    B.teile.fest.push(g);
  }
  for (const x of [X0, X1]) {
    const sh = new THREE.Shape(); sh.moveTo(-(Z1 - Z0) / 2 - 0.4, 0); sh.lineTo((Z1 - Z0) / 2 + 0.4, 0); sh.lineTo(0, dachH - 0.1); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }).toNonIndexed();
    g.rotateY(Math.PI / 2); g.translate(x - 0.15, HAUS_H, (Z0 + Z1) / 2);
    const n = g.attributes.position.count, col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { col[i * 3] = C.sandsteinDunkel.r; col[i * 3 + 1] = C.sandsteinDunkel.g; col[i * 3 + 2] = C.sandsteinDunkel.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.deleteAttribute('uv');
    B.teile.fest.push(g);
  }
  // Uhrtürmchen über dem Eingang (Wahrzeichen)
  box(-1.6, 1.6, HAUS_H, HAUS_H + 6.2, Z1 - 3.2, Z1 - 0.2, C.sandstein);
  box(-1.9, 1.9, HAUS_H + 6.2, HAUS_H + 6.5, Z1 - 3.5, Z1 + 0.1, C.gesims);
  const turmDach = new THREE.ConeGeometry(2.6, 3.4, 4).toNonIndexed(); turmDach.rotateY(Math.PI / 4); turmDach.translate(0, HAUS_H + 8.2, Z1 - 1.7);
  { const n = turmDach.attributes.position.count, col = new Float32Array(n * 3); for (let i = 0; i < n; i++) { col[i * 3] = C.schiefer.r; col[i * 3 + 1] = C.schiefer.g; col[i * 3 + 2] = C.schiefer.b; } turmDach.setAttribute('color', new THREE.BufferAttribute(col, 3)); turmDach.deleteAttribute('uv'); B.teile.fest.push(turmDach); }
  const uhr = new THREE.Mesh(new THREE.CircleGeometry(1.0, 32), new THREE.MeshBasicMaterial({ map: uhrTextur(), toneMapped: false }));
  uhr.position.set(0, HAUS_H + 3.6, Z1 - 0.17); schilder.push(uhr);

  // Innen: Boden, Decke, Innenwände (Erdgeschoss)
  const Y = DECKE;
  box(X0 + D / 2, X1 - D / 2, Y, Y + 0.12, Z0 + D / 2, Z1 - D / 2, C.deckeHell, { art: 'licht' });
  // Halle x −8 … 8, z −14 … −2 · Gang z −18 … −14 (x −29.8 … 29.8) · Räume nördlich (z −30 … −18) und südlich (z −14 … −2)
  // Böden: Unterbau als Kasten, Fliesen bzw. Dielen als Textur darauf (texturen.js, unten beim Zusammenbau)
  const boeden = [];
  const fliesen = (x0, x1, z0, z1, c1, c2, s = 1.2) => { box(x0, x1, 0.06, 0.1, z0, z1, c1, { art: 'innen' }); boeden.push({ x0, x1, z0, z1, c1, c2, s }); };
  const dielenBoden = (x0, x1, z0, z1) => boeden.push({ x0, x1, z0, z1, holz: true });
  fliesen(-8, 8, -14, -2.2, C.bodenHalle, C.bodenHalle2, 1.6);
  fliesen(-29.8, 29.8, -18, -14, C.bodenGang, C.bodenGang2, 2);
  box(-29.8, -16, 0.06, 0.1, -29.8, -18, C.bodenSaal, { art: 'innen' }); dielenBoden(-29.8, -16, -29.8, -18);     // Saal 1.04
  box(-16, -2, 0.06, 0.1, -29.8, -18, C.bodenSaal, { art: 'innen' }); dielenBoden(-16, -2, -29.8, -18);        // Bibliothek
  box(-2, 8, 0.06, 0.1, -29.8, -18, C.bodenSaal, { art: 'innen' }); dielenBoden(-2, 8, -29.8, -18);          // Lehrerzimmer
  box(8, 20, 0.06, 0.1, -29.8, -18, C.bodenSaal, { art: 'innen' }); dielenBoden(8, 20, -29.8, -18);          // Saal 1.06
  fliesen(20, 29.8, -29.8, -18, C.bodenGang, C.bodenGang2, 0.8);              // WC
  box(-29.8, -16, 0.06, 0.1, -14, -2.2, C.bodenHalle2, { art: 'innen' });     // Sekretariat
  box(-16, -8, 0.06, 0.1, -14, -2.2, C.bodenSaal, { art: 'innen' }); dielenBoden(-16, -8, -14, -2.2);          // SePAS
  fliesen(8, 29.8, -14, -2.2, C.bodenKantine, C.bodenKantine2, 1.4);          // Kantine
  // Innenwände (3,6 m), Türen 1,3 m breit
  const IW = 0.2, ih = Y;
  const innen = (achse, fest, a0, a1, tueren, farbe = C.innenWand) => wand(achse, fest, a0, a1, 0, ih, IW, farbe, tueren.map((t) => ({ von: t - 0.65, bis: t + 0.65, unten: 0, oben: TUER_H })), { art: 'innen', stoss: true });
  innen('x', -18, -29.8, 29.8, [-21, -9, 3, 14, 24], C.innenWandGang);   // Nordwand des Gangs: Türen zu 1.04, Bibliothek, Lehrerzimmer, 1.06, WC
  innen('x', -14, -29.8, -8, [-21, -12]);                                 // Südwand des Gangs West: Sekretariat, SePAS
  innen('x', -14, 8, 29.8, [12, 25]);                                     // Südwand des Gangs Ost: Kantine (zwei Türen)
  innen('z', -16, -29.8, -18, []); innen('z', -2, -29.8, -18, []); innen('z', 8, -29.8, -18, []); innen('z', 20, -29.8, -18, []);
  innen('z', -16, -14, -2.2, []); innen('z', -8, -14, -2.2, []); innen('z', 8, -14, -2.2, []);
  // Halle → Gang: offen (breiter Durchgang), nur zwei Pfeiler
  for (const x of [-8, 8]) box(x - 0.35, x + 0.35, 0, Y, -14.35, -13.65, C.gesims, { art: 'innen', stoss: true });
  // Sockelleisten im Gang
  box(-29.8, 29.8, 0.1, 0.3, -17.88, -17.84, C.sockelLeiste, { art: 'innen' }); box(-29.8, -8, 0.1, 0.3, -14.16, -14.12, C.sockelLeiste, { art: 'innen' }); box(8, 29.8, 0.1, 0.3, -14.16, -14.12, C.sockelLeiste, { art: 'innen' });
  // Farbband im Gang (Qualitätsrunde): zwei Streifen über den Spinden, Farbe wechselt zwischen den Türen
  {
    const BAND = ['#e9734a', '#2fb8a8', '#f2b134', '#5fa0d0', '#e85d75'];
    const band = (zA, zB, x0, x1, tueren, start) => {
      const kanten = [x0].concat(...tueren.map((t) => [t - 0.8, t + 0.8]), [x1]);
      for (let i = 0; i + 1 < kanten.length; i += 2) {
        if (kanten[i + 1] - kanten[i] < 0.3) continue;
        const f = BAND[(start + i / 2) % BAND.length];
        box(kanten[i], kanten[i + 1], 2.0, 2.14, zA, zB, f, { art: 'innen' });
        box(kanten[i], kanten[i + 1], 2.18, 2.22, zA, zB, f, { art: 'innen' });
      }
    };
    band(-17.885, -17.855, -29.8, 29.8, [-21, -9, 3, 14, 24], 0);
    band(-14.145, -14.115, -29.8, -8, [-21, -12], 2);
    band(-14.145, -14.115, 8, 29.8, [12, 25], 3);
  }
  // Innenseite der Außenwände (Farbe innen)
  box(X0 + D / 2, X0 + D / 2 + 0.02, 0.1, Y, Z0, Z1, C.innenWand, { art: 'innen' });
  box(X1 - D / 2 - 0.02, X1 - D / 2, 0.1, Y, Z0, Z1, C.innenWand, { art: 'innen' });

  // ---- Halle: Treppe (verschlossen: „1. Stock – bald“), Pinnwand, Pokalvitrine, Bank ----
  for (let i = 0; i < 10; i++) box(5.0, 7.8, 0, 0.34 * (i + 1), -3.2 - (i + 1) * 0.5, -3.2 - i * 0.5, i % 2 ? C.beton : C.gesims, { art: 'innen', stoss: true });
  box(4.86, 5.0, 0.4, 1.4, -8.2, -3.2, C.metall, { art: 'innen' });
  for (let i = 0; i <= 5; i++) box(4.88, 4.98, 0, 1.4 + i * 0.68, -3.3 - i, -3.2 - i, C.metallDunkel, { art: 'innen' });
  box(5.0, 7.8, 0.75, 0.82, -3.0, -2.94, C.rot, { art: 'innen' });   // Absperrband
  box(5.0, 5.08, 0, 1.0, -3.04, -2.9, C.metallDunkel, { art: 'innen' }); box(7.72, 7.8, 0, 1.0, -3.04, -2.9, C.metallDunkel, { art: 'innen' });
  const stockSchild = schild('1. Stock · später', 1.6, 0.38, { bg: '#d9523c', schrift: 'bold 96px system-ui' });
  stockSchild.position.set(6.4, 1.15, -2.88); schilder.push(stockSchild);
  // Deckenlampen (leuchtende Paneele) in Halle, Gang und Räumen
  for (const [x0, x1, z0, z1, dx, dz] of [[-6, 6, -12, -4, 4, 4], [-28, 28, -16.4, -15.6, 4, 1], [-28, -18, -28, -20, 4, 4], [-14, -4, -28, -20, 4, 4], [10, 18, -28, -20, 4, 4], [10, 28, -12, -4, 4, 4], [-28, -18, -12, -4, 5, 4], [-14, -10, -12, -4, 4, 4], [22, 28, -28, -20, 4, 4]]) {
    for (let x = x0; x <= x1 + 0.01; x += dx) for (let z = z0; z <= z1 + 0.01; z += dz) box(x - 0.6, x + 0.6, DECKE - 0.04, DECKE, z - 0.25, z + 0.25, C.licht, { art: 'licht' });
  }
  // Pinnwand (Westwand der Halle)
  box(-7.88, -7.8, 1.0, 2.6, -11.5, -6.5, C.pinnwand, { art: 'innen' });
  for (let i = 0; i < 9; i++) { const zz = -11.2 + (i % 5) * 1.0, yy = 1.25 + Math.floor(i / 5) * 0.75; box(-7.79, -7.77, yy, yy + 0.55, zz, zz + 0.7, C.zettel[i % 5], { art: 'innen' }); }
  const plan = schild('Klassen · Säle\n7P2 → Saal 1.04', 1.4, 0.8, { bg: '#ffffff', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 70px system-ui' });
  plan.position.set(-7.76, 1.9, -6.95); plan.rotation.y = Math.PI / 2; schilder.push(plan);
  // Vitrine (Ostwand, hinter der Treppe)
  box(7.2, 7.8, 0, 2.0, -13.2, -9.6, C.holz, { art: 'innen', stoss: true }); box(7.25, 7.75, 0.8, 1.9, -13.1, -9.7, C.glas, { art: 'glas' });
  box(7.4, 7.6, 1.0, 1.35, -12.4, -12.1, C.gelb, { art: 'innen' }); box(7.4, 7.6, 1.0, 1.25, -11, -10.7, C.gelb, { art: 'innen' });
  // Wegweiser in der Halle
  const weg = schild('Gang  ·  Säle · CDI · WC\nSekretariat · SePAS · Kantine', 3.6, 0.9, { bg: '#2b3a55', schrift: 'bold 66px system-ui' });
  weg.position.set(0, 2.75, -13.2); schilder.push(weg);   // Text unten neu gesetzt
  box(-1.5, -1.46, 3.2, DECKE, -13.24, -13.2, C.metallDunkel, { art: 'innen' }); box(1.46, 1.5, 3.2, DECKE, -13.24, -13.2, C.metallDunkel, { art: 'innen' });
  box(-1.85, 1.85, 2.28, 3.22, -13.26, -13.22, C.blauDunkel, { art: 'innen' });

  // ---- Gang: Spinde an beiden Seiten ----
  const spinde = (x0, x1, z, s) => {
    let i = 0;
    for (let x = x0; x < x1 - 0.5; x += 0.6, i++) {
      box(x + 0.02, x + 0.58, 0.1, 1.95, z, z + s * 0.5, C.spind[i % C.spind.length], { art: 'innen', stoss: true });
      box(x + 0.44, x + 0.5, 0.95, 1.25, z + s * 0.5, z + s * 0.52, C.spindGriff, { art: 'innen' });
      box(x + 0.12, x + 0.48, 1.6, 1.64, z + s * 0.5, z + s * 0.51, C.spindGriff, { art: 'innen' });
      box(x + 0.12, x + 0.48, 1.7, 1.74, z + s * 0.5, z + s * 0.51, C.spindGriff, { art: 'innen' });
    }
  };
  spinde(-28.4, -22.2, -17.9, 1); spinde(-19.8, -10.2, -17.9, 1); spinde(-7.8, 1.6, -17.9, 1); spinde(4.4, 12.6, -17.9, 1); spinde(15.4, 23.2, -17.9, 1);
  spinde(-28.4, -22.2, -14.1, -1); spinde(-19.6, -13, -14.1, -1); spinde(13.4, 23.6, -14.1, -1);

  // ---- Saal 1.04 (x −29.8 … −16, z −29.8 … −18): Tafel an der Westwand, Pulte in Reihen ----
  const saal = (x0, x1, z0, z1, name) => {
    box(x0 + 0.05, x0 + 0.12, 1.0, 2.4, z0 + 2.5, z1 - 2.5, C.tafelRahmen, { art: 'innen' });
    box(x0 + 0.12, x0 + 0.16, 1.06, 2.34, z0 + 2.6, z1 - 2.6, C.tafel, { art: 'innen' });
    box(x0 + 0.12, x0 + 0.32, 0.98, 1.02, z0 + 2.6, z1 - 2.6, C.tafelRahmen, { art: 'innen' });
    P('moebel/Desk', x0 + 2.0, (z0 + z1) / 2 + 2.6, -Math.PI / 2, { h: 0.78, fest: true });
    P('moebel/OfficeChair', x0 + 1.15, (z0 + z1) / 2 + 2.6, Math.PI / 2, { h: 1.05 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
      const x = x0 + 5 + r * 2.1, z = z0 + 2.6 + c * 3.4;
      for (const dz of [-0.62, 0.62]) {
        box(x - 0.32, x + 0.32, 0.72, 0.76, z + dz - 0.58, z + dz + 0.58, C.holzHell, { art: 'innen' });
        box(x - 0.3, x + 0.3, 0.1, 0.72, z + dz - 0.56, z + dz - 0.5, C.metall, { art: 'innen' });
        box(x - 0.3, x + 0.3, 0.1, 0.72, z + dz + 0.5, z + dz + 0.56, C.metall, { art: 'innen' });
        stuhl(B, x + 0.62, z + dz, -Math.PI / 2, C.stuhl[(r + c) % C.stuhl.length]);
      }
      B.kasten.push({ x0: x - 0.34, x1: x + 0.34, z0: z - 1.22, z1: z + 1.22, y0: 0, y1: 0.8 });
    }
    const s = schild(name, 1.0, 0.36, { bg: '#2b3a55', schrift: 'bold 110px system-ui' });
    return s;
  };
  const s104 = saal(-29.8, -16, -29.8, -18, 'Saal 1.04'); s104.position.set(-21, 2.85, -17.85); schilder.push(s104);
  P('einrichtung/Plant', -16.8, -29, 0, { h: 1.2 }); P('moebel/ShortCloset', -17.2, -19, Math.PI, { h: 1.1, fest: true });
  const s106 = saal(8, 20, -29.8, -18, 'Saal 1.06'); s106.position.set(14, 2.85, -17.85); schilder.push(s106);
  // Bibliothek / CDI
  { const sb = schild('CDI · Bibliothèque', 1.6, 0.36, { bg: '#3d5a52', schrift: 'bold 96px system-ui' }); sb.position.set(-9, 2.85, -17.85); schilder.push(sb);
    regal(B, -15.6, -4.4, -29.8, 1);                 // lange Regalwand an der Nordwand
    regal(B, -15.8, -15.8, -27.4, 0, -20.6);         // Regal längs der Westwand
    regal(B, -12.6, -10.0, -25.6, 1); regal(B, -12.6, -10.0, -25.6, -1);   // freistehendes Doppelregal
    P('einrichtung/SofaLong', -6.2, -20, Math.PI, { h: 0.85, fest: true, farbe: '#5f8fc8' }); P('einrichtung/CoffeeTable', -6.2, -21.6, 0, { h: 0.45, farbe: '#c89f74' });
    box(-10.4, -8.6, 0.72, 0.77, -23.4, -21.4, C.holzHell, { art: 'innen' }); for (const [lx, lz] of [[-10.3, -23.3], [-8.7, -23.3], [-10.3, -21.5], [-8.7, -21.5]]) box(lx - 0.03, lx + 0.03, 0.08, 0.72, lz - 0.03, lz + 0.03, C.metall, { art: 'innen' });
    B.kasten.push({ x0: -10.4, x1: -8.6, z0: -23.4, z1: -21.4, y0: 0, y1: 0.8 });
    stuhl(B, -11.0, -22.9, Math.PI / 2, C.stuhl[1]); stuhl(B, -11.0, -21.9, Math.PI / 2, C.stuhl[2]); stuhl(B, -8.0, -22.9, -Math.PI / 2, C.stuhl[0]); stuhl(B, -8.0, -21.9, -Math.PI / 2, C.stuhl[4]);
    box(-5.4, -3.0, 0, 1.0, -27.4, -26.8, C.theke, { art: 'innen', stoss: true }); box(-5.5, -2.9, 1.0, 1.07, -27.5, -26.7, C.thekeOben, { art: 'innen' });   // Ausleihe (Mme Laurent, Lernstation)
    P('einrichtung/Plant', -2.8, -29, 0, { h: 1.3 }); P('innen/Carpet_1', -6.2, -21.4, 0, { s: 3.2 }); }
  // Lehrerzimmer (verschlossen)
  { const sl = schild('Salle des profs', 1.4, 0.36, { bg: '#6b4e8a', schrift: 'bold 100px system-ui' }); sl.position.set(3, 2.85, -17.85); schilder.push(sl);
    box(2.35, 3.65, 0.1, TUER_H, -18.1, -17.95, C.holz, { art: 'innen', stoss: true }); }
  // WC
  { const sw = schild('WC', 0.6, 0.36, { bg: '#2b3a55', schrift: 'bold 140px system-ui' }); sw.position.set(24, 2.85, -17.85); schilder.push(sw);
    for (let i = 0; i < 3; i++) { P('innen/Bathroom_Sink', 21.2 + i * 1.6, -29.3, 0, { h: 0.95 }); P('innen/Bathroom_Mirror1', 21.2 + i * 1.6, -29.6, 0, { h: 0.8, y: 1.3 }); }
    for (let i = 0; i < 3; i++) box(26 + i * 1.25, 26.08 + i * 1.25, 0.1, 2.1, -29.8, -26.5, C.spind[1], { art: 'innen', stoss: true }); }
  // Sekretariat (x −29.8 … −16, z −14 … −2): Theke mit Fenster zum Gang
  { const ss = schild('Secrétariat', 1.4, 0.36, { bg: '#2b3a55', schrift: 'bold 100px system-ui' }); ss.position.set(-21, 2.85, -14.15); ss.rotation.y = Math.PI; schilder.push(ss);
    box(-25, -17, 0, 1.05, -11.2, -10.6, C.theke, { art: 'innen', stoss: true }); box(-25.1, -16.9, 1.05, 1.12, -11.3, -10.5, C.thekeOben, { art: 'innen' });
    P('moebel/Desk', -21, -8, 0, { h: 0.78, fest: true }); P('moebel/OfficeChair', -21, -7.2, Math.PI, { h: 1.05 });
    P('moebel/Closet', -28.8, -6, Math.PI / 2, { h: 2.0, fest: true }); P('innen/Drawer_1', -28.9, -9, Math.PI / 2, { h: 1.0, fest: true });
    P('einrichtung/Plant', -17, -3, 0, { h: 1.3 }); stuhl(B, -23.5, -12.6, 0, C.stuhl[0]); stuhl(B, -22.3, -12.6, 0, C.stuhl[1]); }
  // SePAS (Beratung) x −16 … −8
  { const sp = schild('SePAS', 0.9, 0.36, { bg: '#2fb8a8', schrift: 'bold 120px system-ui' }); sp.position.set(-12, 2.85, -14.15); sp.rotation.y = Math.PI; schilder.push(sp);
    P('innen/Couch_Medium1', -12, -3.2, Math.PI, { h: 0.85, fest: true }); P('einrichtung/CoffeeTable', -12, -5.4, 0, { h: 0.45 }); P('innen/Carpet_1', -12, -5.2, 0, { s: 2.8 });
    P('einrichtung/ChairCushioned', -14.6, -6.2, Math.PI / 2, { h: 0.95 }); P('einrichtung/Plant', -9, -12.8, 0, { h: 1.3 }); }
  // Kantine (x 8 … 29.8, z −14 … −2): Ausgabe-Theke an der Ostwand, Tische
  { const sk = schild('Cantine', 1.2, 0.36, { bg: '#d9693f', schrift: 'bold 110px system-ui' }); sk.position.set(18.5, 2.85, -14.15); sk.rotation.y = Math.PI; schilder.push(sk);
    box(25.2, 26.2, 0, 1.0, -13.4, -4.2, C.theke, { art: 'innen', stoss: true }); box(25.1, 26.3, 1.0, 1.08, -13.5, -4.1, C.metall, { art: 'innen' });
    box(26.2, 29.6, 0, 1.0, -13.6, -13.2, C.theke, { art: 'innen', stoss: true });
    box(25.25, 26.15, 1.08, 1.4, -13.2, -4.4, C.glas, { art: 'glas' });
    box(23.4, 25.0, 0.95, 1.0, -13.4, -4.2, C.metallDunkel, { art: 'innen' });   // Tablett-Schiene
    const essen = ['essen/Apple', 'essen/Banana', 'essen/Bread', 'essen/Croissant', 'essen/Fries', 'essen/Cheeseburger', 'essen/CookingPot_Soup', 'essen/Bottle1', 'essen/Donut1', 'essen/ChocolateBar'];
    essen.forEach((m, i) => P(m, 25.7, -12.6 + i * 0.9, 0, { h: m.includes('Pot') ? 0.3 : m.includes('Bottle') ? 0.28 : 0.12, y: 1.08 }));
    const menue = schild('Menu du jour\nPâtes · Salade · Fruit', 2.6, 1.1, { bg: '#2f4f45', schrift: 'bold 52px system-ui', rand: '#ffffff' });
    menue.position.set(29.55, 2.2, -8.8); menue.rotation.y = -Math.PI / 2; schilder.push(menue);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
      const x = 11.5 + r * 4.4, z = -10.6 + c * 5.2;
      box(x - 0.5, x + 0.5, 0.72, 0.77, z - 1.1, z + 1.1, C.tischPlatte, { art: 'innen' });
      for (const [lx, lz] of [[-0.42, -1.0], [0.42, -1.0], [-0.42, 1.0], [0.42, 1.0]]) box(x + lx - 0.03, x + lx + 0.03, 0.08, 0.72, z + lz - 0.03, z + lz + 0.03, C.metall, { art: 'innen' });
      B.kasten.push({ x0: x - 0.5, x1: x + 0.5, z0: z - 1.1, z1: z + 1.1, y0: 0, y1: 0.8 });
      for (const [dx, dz, rot] of [[-0.75, -0.5, Math.PI / 2], [-0.75, 0.5, Math.PI / 2], [0.75, -0.5, -Math.PI / 2], [0.75, 0.5, -Math.PI / 2]]) stuhl(B, x + dx, z + dz, rot, C.stuhl[(r * 2 + c + (dx > 0 ? 1 : 0)) % C.stuhl.length]);
    }
    P('einrichtung/Plant', 9, -3, 0, { h: 1.3 }); P('einrichtung/Plant', 22.6, -3, 0, { h: 1.3 }); }

  R('halle', 'Eingangshalle', -8, 8, -14, -2);
  R('gang', 'Gang', -30, 30, -18, -14);
  R('saal104', 'Saal 1.04', -30, -16, -30, -18);
  R('cdi', 'CDI · Bibliothek', -16, -2, -30, -18);
  R('profs', 'Salle des profs', -2, 8, -30, -18);
  R('saal106', 'Saal 1.06', 8, 20, -30, -18);
  R('wc', 'WC', 20, 30, -30, -18);
  R('sekretariat', 'Sekretariat', -30, -16, -14, -2);
  R('sepas', 'SePAS', -16, -8, -14, -2);
  R('kantine', 'Kantine', 8, 30, -14, -2);

  // ================= Turnhalle (Osten): x 34 … 58, z −30 … −6, modern =================
  { const GX0 = 34, GX1 = 58, GZ0 = -30, GZ1 = -6, GH = 7.5;
    const tuer = [{ von: 44.8, bis: 47.2, unten: 0, oben: 2.8 }];
    const band = []; for (let x = 36; x < 56; x += 3.2) band.push({ von: x, bis: x + 2.2, unten: 4.6, oben: 6.6 });
    wand('x', GZ1, GX0, GX1, 0, GH, D, C.modern, [...tuer, ...band], { stoss: true });
    wand('x', GZ0, GX0, GX1, 0, GH, D, C.modern, band, { stoss: true });
    wand('z', GX0, GZ0, GZ1, 0, GH, D, C.modern, [{ von: -20, bis: -14, unten: 4.6, oben: 6.6 }], { stoss: true });
    wand('z', GX1, GZ0, GZ1, 0, GH, D, C.modern, [], { stoss: true });
    for (const o of band) { box(o.von, o.bis, o.unten, o.oben, GZ1 - 0.04, GZ1 + 0.04, C.glas, { art: 'glas' }); box(o.von, o.bis, o.unten, o.oben, GZ0 - 0.04, GZ0 + 0.04, C.glas, { art: 'glas' }); }
    box(GX0 - 0.4, GX1 + 0.4, GH, GH + 0.5, GZ0 - 0.4, GZ1 + 0.4, C.metallDunkel);
    box(GX0 - 0.2, GX1 + 0.2, 0, 1.0, GZ1 + 0.1, GZ1 + 0.25, C.holz);
    box(44, 48, 2.8, 3.1, -6, -4.6, C.metallDunkel);
    const st = schild('Hall des sports', 3.2, 0.6, { bg: '#2b3a55', schrift: 'bold 110px system-ui' }); st.position.set(46, 3.6, -5.8); schilder.push(st);
    box(GX0 + D / 2, GX1 - D / 2, 0.06, 0.1, GZ0 + D / 2, GZ1 - D / 2, C.bodenSport, { art: 'innen' });
    box(GX0 + 2, GX1 - 2, 0.1, 0.11, -18.05, -17.95, C.linieSport, { art: 'innen' });
    for (const [a, b] of [[GX0 + 2, GX1 - 2]]) { box(a, b, 0.1, 0.11, GZ0 + 2, GZ0 + 2.1, C.linieSport, { art: 'innen' }); box(a, b, 0.1, 0.11, GZ1 - 2.1, GZ1 - 2, C.linieSport, { art: 'innen' }); }
    box(GX0 + 2, GX0 + 2.1, 0.1, 0.11, GZ0 + 2, GZ1 - 2, C.linieSport, { art: 'innen' }); box(GX1 - 2.1, GX1 - 2, 0.1, 0.11, GZ0 + 2, GZ1 - 2, C.linieSport, { art: 'innen' });
    box(GX0 + D / 2, GX1 - D / 2, GH - 0.3, GH - 0.2, GZ0 + D / 2, GZ1 - D / 2, C.decke, { art: 'innen' });
    for (const [x, s] of [[GX0 + 0.6, 1], [GX1 - 0.6, -1]]) korb(B, x, -18, s);
    for (let i = 0; i < 4; i++) box(GX0 + 3 + i * 0.6, GX0 + 3.5 + i * 0.6, 0.1, 0.45 + i * 0.45, GZ0 + 0.3, GZ0 + 1.6, C.holzHell, { art: 'innen', stoss: true });
    R('turnhalle', 'Hall des sports', GX0, GX1, GZ0, GZ1, { decke: GH - 0.4 }); }

  // ================= Werkstatt (Westen): x −60 … −36, z −28 … −8 – Ausblick auf DAP/CCP =================
  { const WX0 = -60, WX1 = -36, WZ0 = -28, WZ1 = -8, WH = 5.2;
    const tor = [{ von: -50.5, bis: -45.5, unten: 0, oben: 3.6 }];
    const f = []; for (let x = -58; x < -38; x += 4) if (x < -51 || x > -45) f.push({ von: x, bis: x + 2.4, unten: 1.2, oben: 3.4 });
    wand('x', WZ1, WX0, WX1, 0, WH, D, C.beton, [...tor, ...f], { stoss: true });
    wand('x', WZ0, WX0, WX1, 0, WH, D, C.beton, [], { stoss: true });
    wand('z', WX0, WZ0, WZ1, 0, WH, D, C.beton, [], { stoss: true }); wand('z', WX1, WZ0, WZ1, 0, WH, D, C.beton, [], { stoss: true });
    for (const o of f) box(o.von, o.bis, o.unten, o.oben, WZ1 - 0.04, WZ1 + 0.04, C.glas, { art: 'glas' });
    // Sheddach
    for (let z = WZ0; z < WZ1 - 0.1; z += 5) { box(WX0 - 0.3, WX1 + 0.3, WH, WH + 0.25, z, z + 5, C.metallDunkel); box(WX0 - 0.3, WX1 + 0.3, WH + 0.25, WH + 1.4, z + 4.6, z + 5, C.glas, { art: 'glas' }); }
    const sw = schild('Atelier · Ateliers DAP / CCP', 4.4, 0.6, { bg: '#d9693f', schrift: 'bold 96px system-ui' }); sw.position.set(-48, 4.2, -7.8); schilder.push(sw);
    box(WX0 + D / 2, WX1 - D / 2, 0.06, 0.1, WZ0 + D / 2, WZ1 - D / 2, C.beton, { art: 'innen' });
    box(WX0 + D / 2, WX1 - D / 2, WH - 0.2, WH - 0.1, WZ0 + D / 2, WZ1 - D / 2, C.decke, { art: 'innen' });
    for (let i = 0; i < 3; i++) { const x = -56 + i * 6; box(x, x + 3.6, 0, 0.9, -22, -20.8, C.holz, { art: 'innen', stoss: true }); box(x - 0.05, x + 3.65, 0.9, 0.98, -22.05, -20.75, C.holzHell, { art: 'innen' }); box(x + 0.4, x + 0.7, 0.98, 1.3, -21.8, -21.2, C.rot, { art: 'innen' }); }
    box(WX0 + 0.3, WX0 + 0.9, 0, 2.2, -26, -10, C.metall, { art: 'innen', stoss: true });
    const zu = schild('Hier fängt bald die Ausbildung an', 3.2, 0.42, { bg: '#2b3a55', schrift: 'bold 72px system-ui' }); zu.position.set(-48, 2.2, -27.6); schilder.push(zu);
    // Holz, Kisten, Eimer (Kenney): die Werkstatt sieht nach Arbeit aus
    P('lager/resource-planks', -57.6, -26.4, 0.2, { h: 0.5, fest: true }); P('lager/resource-planks', -55.2, -26.6, -0.1, { h: 0.4, fest: true });
    P('lager/box-large', -39.4, -26.6, 0.3, { h: 0.9, fest: true }); P('lager/box-large', -38.2, -26.4, -0.2, { h: 0.7, fest: true });
    P('lager/bucket', -41.2, -26.8, 0, { h: 0.4 }); P('markt/shelf-boxes', -37.2, -16, -Math.PI / 2, { h: 1.9, fest: true });
    P('strasse/construction-cone', -46.5, -9.4, 0, { h: 0.6 });
    R('werkstatt', 'Atelier', WX0, WX1, WZ0, WZ1, { decke: WH - 0.3 }); }

  // ================= Schulhof: Korbballfeld, Bänke, Bäume, Fahrradständer, Skate-Ecke =================
  box(18, 40, 0.06, 0.09, 8, 30, C.korbFeld, { art: 'innen' });
  for (const [a0, a1, b0, b1] of [[18, 40, 8, 8.12], [18, 40, 29.88, 30], [18, 18.12, 8, 30], [39.88, 40, 8, 30], [18, 40, 18.94, 19.06]]) box(a0, a1, 0.09, 0.1, b0, b1, C.korbLinie, { art: 'innen' });
  korb(B, 29, 8.6, 1, 'z'); korb(B, 29, 29.4, -1, 'z');
  // Fahrradständer (Westen)
  for (let i = 0; i < 8; i++) box(-42 + i * 1.0, -41.9 + i * 1.0, 0, 0.8, 24, 26, C.metall, { stoss: false });
  box(-42.2, -34, 0, 0.12, 23.8, 26.2, C.beton);
  box(-42.2, -34, 0.8, 0.86, 24.9, 25.1, C.metall, { stoss: true });
  [0, 2, 3, 5, 6].forEach((i, k) => P(k % 2 ? 'verkehr/SquareFrameBicycle' : 'verkehr/Bicycle', -41.5 + i * 1.0, 25, Math.PI / 2, { h: 1.0 }));
  // Überdachter Unterstand (Préau) vor der Kantine
  box(12, 26, 3.4, 3.6, 0.5, 8, C.metallDunkel);
  for (const [x, z] of [[12.3, 7.7], [25.7, 7.7], [12.3, 0.8], [25.7, 0.8]]) box(x - 0.12, x + 0.12, 0, 3.4, z - 0.12, z + 0.12, C.metall, { stoss: true });

  // Orte (Ziele, Treffpunkte) – Blickrichtung yaw: 0 = nach Süden (+z), π = nach Norden
  const orte = {
    bus: { x: -22, z: 42.2, yaw: Math.PI }, busAnkunft: { x: -15.5, z: 42.4, yaw: -Math.PI / 2 },
    tor: { x: 0, z: 38, yaw: Math.PI }, eingang: { x: 0, z: 1.5, yaw: 0 }, eingangHof: { x: 0, z: 3.5, yaw: 0 }, halle: { x: 0, z: -6, yaw: Math.PI },
    pinnwand: { x: -6.8, z: -9, yaw: -Math.PI / 2 }, sekretariat: { x: -21, z: -12.4, yaw: 0 }, sekretariatTheke: { x: -21, z: -9.6 },
    saal104Tuer: { x: -21, z: -16, yaw: Math.PI }, saal104: { x: -22, z: -24, yaw: -Math.PI / 2 }, cdi: { x: -9, z: -23 },
    kantineTuer: { x: 12, z: -16 }, kantineAusgabe: { x: 24.2, z: -8.8, yaw: Math.PI / 2 }, kantine: { x: 16, z: -8 },
    hof: { x: 0, z: 18 }, bank: { x: -20, z: 12 }, raucherecke: { x: 60.4, z: -17 }, skateEcke: { x: -36, z: 12 }, korbfeld: { x: 29, z: 19 }, turnhalle: { x: 46, z: -3 }, werkstatt: { x: -48, z: -5 },
    sepas: { x: -12, z: -10 }, fahrrad: { x: -38, z: 22 }, preau: { x: 19, z: 4 },
  };
  // Bäume, Hecken, Bänke, Brunnen, Laternen, Skate-Teile, Autos (Kenney „stadt“)
  for (const [x, z] of [[-40, 4], [-40, 14], [-30, 34], [-16, 34], [14, 34], [42, 34], [-26, 2.5], [-14, 2.5], [6, 30], [42, 4]]) P('haus/tree-large', x, z, Math.random() * 6, { h: 7.5 + Math.random() * 2, fest: 0.6 });
  for (const [x, z] of [[-34, 30], [-6, 30], [40, 12], [-44, -6], [68, -4], [-66, -14], [-34, -34], [34, -36]]) P('haus/tree-small', x, z, Math.random() * 6, { h: 4.5, fest: 0.4 });
  for (const [x, z, r] of [[-20, 11, 0], [-14, 11, 0], [-26, 18, Math.PI / 2], [6, 12, 0], [6, 24, 0]]) P('skate/bench', x, z, r, { h: 0.55, fest: true });
  P('platz/fountain-round-detail', -8, 18, 0, { h: 1.6, fest: true, stein: '#d9cdb8' });   // ganzer Grundriss: nicht ins Wasser laufen
  for (const [x, z] of [[-44, 38], [-30, 38], [30, 38], [44, 38]]) P('platz/hedge-large', x, z, 0, { h: 1.2, fest: true });
  for (const x of [-60, -36, -12, 12, 36, 60]) P('strasse/Streetlight_Single', x, 40.8, Math.PI, { h: 5.5 });
  // ---- Skate-Ecke (Westen des Hofs): Betonfläche, Half-Pipe, Rampe, Rail, Box, Graffiti-Wand ----
  box(-45.6, -28, 0.06, 0.1, 3.2, 19, C.beton, { art: 'innen' });
  P('skate/half-pipe-low', -41.5, 6.2, 0, { s: 5.2, fest: true, einfarbig: '#bdb7ad' });
  P('skate/ramp', -31.6, 12.4, Math.PI / 2, { h: 0.8, fest: true, einfarbig: '#bdb7ad' }); P('skate/rail-low', -36, 9.6, 0, { h: 0.5, fest: true }); P('skate/obstacle-box', -36.4, 15.8, 0, { h: 0.5, fest: true, einfarbig: '#a9a39a' });
  P('skate/bench', -44.6, 13, Math.PI / 2, { h: 0.55, fest: true });
  box(-45.9, -45.5, 0, 2.6, 9, 18.4, C.beton, { stoss: true }); box(-46, -45.4, 2.6, 2.7, 8.9, 18.5, C.sockel);
  { const g = graffiti(['SKATE', 'K+D', '7P2'], 9.4, 2.4, 3); g.position.set(-45.45, 1.3, 13.7); g.rotation.y = Math.PI / 2; schilder.push(g); }

  // ---- Bäcker gegenüber (Südseite der Straße): Schaufenster, Markise, Schild – in der Pause stehen sie hier an ----
  box(-6, 10, 0, 4.2, 57, 64, C.gesims, { stoss: true });
  box(-6.2, 10.2, 4.2, 4.5, 56.8, 64.2, C.schiefer);
  box(-5, 2.2, 0.5, 2.6, 56.92, 57.0, C.glas, { art: 'glas' }); box(4.2, 9, 0.5, 2.6, 56.92, 57.0, C.glas, { art: 'glas' });
  box(2.6, 3.8, 0, 2.4, 56.9, 57.0, C.holz);
  for (let i = 0; i < 8; i++) box(-6 + i * 2, -4 + i * 2, 2.8, 2.95, 55.8, 57, i % 2 ? C.rot : C.zettel[4]);   // Markise
  box(-5, 2.2, 0.5, 0.9, 57.0, 57.6, C.holzHell); for (let i = 0; i < 6; i++) box(-4.6 + i * 1.1, -4.0 + i * 1.1, 0.9, 1.05, 57.1, 57.5, i % 2 ? C.gelb : C.holz);   // Auslage
  { const b = schild('Boulangerie des Collines', 6.2, 0.7, { bg: '#2f4f45', rand: '#e9c46a', schrift: 'bold 120px Georgia, serif' }); b.position.set(2, 3.5, 56.78); b.rotation.y = Math.PI; schilder.push(b); }
  { const z = schild('Kirsch-Teilchen 1,50 €', 1.6, 0.5, { bg: '#ffffff', fg: '#c0392b', rand: '#c0392b', schrift: 'bold 80px system-ui' }); z.position.set(6.6, 1.7, 56.9); z.rotation.y = Math.PI; schilder.push(z); }

  // ---- Snackautomat in der Halle (frisst Münzen) ----
  box(-7.85, -7.0, 0, 1.9, -3.6, -2.6, C.metallDunkel, { art: 'innen', stoss: true });
  box(-7.02, -6.98, 0.7, 1.75, -3.5, -2.7, C.glas, { art: 'glas' });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) box(-7.3, -7.05, 0.8 + r * 0.24, 0.95 + r * 0.24, -3.4 + c * 0.25, -3.25 + c * 0.25, [C.rot, C.gelb, C.blau, C.gruen][(r + c) % 4], { art: 'innen' });

  // ---- Raucherecke hinter der Turnhalle (Osten): da, wo die Aufsicht selten hinschaut ----
  box(58.2, 64, 0.06, 0.1, -26, -9, C.pflaster2, { art: 'innen' });
  P('skate/bench', 61.8, -20.5, -Math.PI / 2, { h: 0.55, fest: true });
  box(62.6, 62.75, 0, 0.9, -16.2, -16.05, C.metallDunkel, { stoss: true }); box(62.45, 62.9, 0.9, 1.05, -16.35, -15.9, C.metall);   // Standaschenbecher
  P('strasse/dumpster', 63, -23.5, -Math.PI / 2, { h: 1.3, fest: true });
  for (let i = 0; i < 26; i++) { const x = 59 + ((i * 37) % 47) / 10, z = -24 + ((i * 53) % 130) / 10; box(x, x + 0.08, 0.1, 0.12, z, z + 0.025, i % 4 ? C.zettel[4] : C.gelb, { art: 'innen' }); }   // Kippen
  { const g = graffiti(['NO FUTURE?', 'L.', 'chill'], 8, 2.2, 7); g.position.set(58.22, 1.5, -18.5); g.rotation.y = Math.PI / 2; schilder.push(g); }
  { const v = schild('Rauchen und Vapen auf dem Schulgelände verboten', 2.8, 0.42, { bg: '#ffffff', fg: '#c0392b', rand: '#c0392b', schrift: 'bold 66px system-ui' }); v.position.set(58.22, 2.6, -12.4); v.rotation.y = Math.PI / 2; schilder.push(v); }
  P('verkehr/Bus', -12, 46, Math.PI / 2, { h: 3.2, fest: true, id: 'bus' });
  for (const [x, m] of [[24, 'auto/sedan'], [32, 'auto/hatchback-sports'], [52, 'auto/suv'], [-50, 'auto/van']]) P(m, x, 54.2, -Math.PI / 2, { h: 1.6, fest: true });
  P('strasse/dumpster', 27.5, -4.2, 0, { h: 1.4, fest: true });
  P('platz/lantern', -4, 36, 0, { h: 2.6 }); P('platz/lantern', 4, 36, 0, { h: 2.6 });

  // ================= Annexe Junglinster: Innenhof, Nordflügel, Glockenturm, Ecktürmchen (campus.js) =================
  const extras = [];
  baueCampus({ B, P, R, schilder, C, schild, uhrTextur, stuhl, D: 0.35, TUER_H,
    boden: (x0, x1, z0, z1, art) => boeden.push(art === 'pflaster' ? { x0, x1, z0, z1, pflaster: true } : art === 'holz' ? { x0, x1, z0, z1, holz: true } : { x0, x1, z0, z1, c1: new THREE.Color(art.c1), c2: new THREE.Color(art.c2), s: art.s || 1.2 }),
    extra: (m) => extras.push(m) });
  baueCampus2({ B, P, R, schilder, C, schild, stuhl, D: 0.35, TUER_H,
    boden: (x0, x1, z0, z1, art) => boeden.push(art === 'pflaster' ? { x0, x1, z0, z1, pflaster: true } : art === 'holz' ? { x0, x1, z0, z1, holz: true } : { x0, x1, z0, z1, c1: new THREE.Color(art.c1), c2: new THREE.Color(art.c2), s: art.s || 1.2 }),
    extra: (m) => extras.push(m) });
  // Details und Atmosphäre: Plakate, Kreide, Uhren, Ranzen, Lampen, Kübel mit Bäumen, Kontaktschatten (details.js)
  const details = baueDetails({ B, P, schilder, C, uhrTextur, raeume, plaetze, DECKE, extra: (m) => extras.push(m) });
  if (details.tischtennis) orte.tischtennis = { ...details.tischtennis, yaw: Math.PI / 2 };

  // Netze zusammenfassen: fest (wirft Schatten), innen (Innenausbau, Böden, kein Schatten), glas
  for (const [art, mat] of [['fest', material], ['laub', materialLaub || material], ['innen', materialInnen || material], ['glas', null], ['licht', new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false })]]) {
    if (!B.teile[art].length) continue;
    const mm = mat || glasMaterial();
    for (const g of zellenMerge(B.teile[art], 28)) {
      const m = new THREE.Mesh(g, mm);
      m.name = 'welt-' + art;
      m.castShadow = art === 'fest' || art === 'laub'; m.receiveShadow = art === 'fest' || art === 'innen' || art === 'laub';
      gruppe.add(m);
    }
  }
  for (const s of schilder) gruppe.add(s);
  for (const m of extras) gruppe.add(m);
  // Gemalte Oberflächen: Verbundpflaster auf Hof und Wegen, Rasen, Asphalt (texturen.js)
  const tP = pflaster(), tR = rasen(), tA = asphalt();
  gruppe.add(flaeche(tR, -110, 110, -120, 80, 0.003, 6, { wolken: true }));
  gruppe.add(flaeche(tA, -110, 110, 44, 52, 0.021, 4, { wolken: true }));
  gruppe.add(flaeche(tP, -46, 46, -2, 40.5, 0.0615, 8, { wolken: true }));
  gruppe.add(flaeche(tP, 46, 62, -4, 2, 0.0615, 8));
  gruppe.add(flaeche(tP, -62, -46, -4, 2, 0.0615, 8));
  const tD = dielen(), fl = {}, bl = [];
  for (const b of boeden) {
    const x0 = Math.min(b.x0, b.x1), x1 = Math.max(b.x0, b.x1), z0 = Math.min(b.z0, b.z1), z1 = Math.max(b.z0, b.z1);
    if (b.holz) { bl.push({ tex: tD, x0, x1, z0, z1, y: 0.1015, kachel: 4 }); continue; }
    if (b.pflaster) { bl.push({ tex: tP, x0, x1, z0, z1, y: 0.0615, kachel: 8 }); continue; }
    const k = '#' + b.c1.getHexString() + '#' + b.c2.getHexString();
    fl[k] = fl[k] || fliesenTex('#' + b.c1.getHexString(), '#' + b.c2.getHexString());
    bl.push({ tex: fl[k], x0, x1, z0, z1, y: 0.1015, kachel: b.s * 2 });
  }
  for (const m of boedenMerge(bl)) gruppe.add(m);   // Böden je Textur und Zelle ein Netz (vorher eins je Raum)

  Object.assign(orte, ORTE_CAMPUS, ORTE_CAMPUS2);
  // Bänke (Modelle): zwei Plätze je Bank, Blick weg von der Lehne
  for (const p of plaetze) if (p.m === 'skate/bench') {
    const yaw = p.rot + Math.PI, fx = Math.sin(yaw), fz = Math.cos(yaw);
    for (const q of [-0.55, 0.55]) B.sitze.push({ x: p.x + fz * q, z: p.z - fx * q, rot: yaw, bank: true, h: 0.46 });   // Sitzpunkt AUF der Bank (vorher 60 cm dahinter)
  }
  for (const x of [-23.2, -22, -20.8]) B.sitze.push({ x, z: 41.85, rot: 0, bank: true });   // Bushaltestelle
  const raumBei = (x, z) => raeume.find((r) => x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1) || null;
  return { gruppe, kasten: B.kasten, alleKaesten: B.alle, sitze: B.sitze, raeume, raumBei, orte, plaetze, schilder };
}

// Bücherregal: von a0 bis a1 längs x (achse 1/-1 = Rückwand im Norden/Süden, z = Wandlinie) oder längs z (s = 0: x = a0, z von z bis a2)
function regal(B, a0, a1, z, s, a2) {
  const holz = new THREE.Color('#9a6b45'), tief = 0.34, H = 2.1, buch = (i) => new THREE.Color(['#c0392b', '#2f6db0', '#e9b949', '#3fa66b', '#6b4e8a', '#d9693f', '#f2efe6', '#2b3a55'][i % 8]);
  let n = 0;
  if (s) {
    const zv = s > 0 ? z : z, zr = s > 0 ? z + tief : z - tief, zz0 = Math.min(zv, zr), zz1 = Math.max(zv, zr);
    B.box(a0, a1, 0, H, zz0, zz1, holz, { art: 'innen', stoss: true, kanten: 0.8 });
    for (let b = 0; b < 5; b++) {
      const y = 0.12 + b * 0.4;
      for (let x = a0 + 0.05; x < a1 - 0.08; ) { const w = 0.05 + ((n * 37) % 7) * 0.012, h = 0.24 + ((n * 13) % 5) * 0.02; B.box(x, x + w, y, y + h, s > 0 ? zz1 - 0.02 : zz0 - 0.005, s > 0 ? zz1 + 0.005 : zz0 + 0.02, buch(n), { art: 'innen' }); x += w + 0.005; n++; }
      B.box(a0, a1, y - 0.03, y, zz0, zz1 + (s > 0 ? 0.01 : 0), holz, { art: 'innen' });
    }
  } else {
    const x0 = a0, x1 = a0 + tief, zz0 = Math.min(z, a2), zz1 = Math.max(z, a2);
    B.box(x0, x1, 0, H, zz0, zz1, holz, { art: 'innen', stoss: true, kanten: 0.8 });
    for (let b = 0; b < 5; b++) {
      const y = 0.12 + b * 0.4;
      for (let zz = zz0 + 0.05; zz < zz1 - 0.08; ) { const w = 0.05 + ((n * 37) % 7) * 0.012, h = 0.24 + ((n * 13) % 5) * 0.02; B.box(x1 - 0.005, x1 + 0.02, y, y + h, zz, zz + w, buch(n), { art: 'innen' }); zz += w + 0.005; n++; }
    }
  }
}

// Schulstuhl aus Kästen: Metallbeine, Sitz und Lehne in Farbe. rot = Blickrichtung des Sitzenden (0 = +z)
function stuhl(B, x, z, rot, farbe) {
  const c = Math.cos(rot), s = Math.sin(rot);
  const teil = (lx, lz, w, d, y0, y1, f) => {   // lokale Mitte (lx, lz), Breite w (quer), Tiefe d (längs)
    const wx = x + lx * c + lz * s, wz = z - lx * s + lz * c;
    const hx = Math.abs(c) * w / 2 + Math.abs(s) * d / 2, hz = Math.abs(s) * w / 2 + Math.abs(c) * d / 2;
    B.box(wx - hx, wx + hx, y0, y1, wz - hz, wz + hz, f, { art: 'innen' });
  };
  B.kasten.push({ x0: x - 0.2, x1: x + 0.2, z0: z - 0.2, z1: z + 0.2, y0: 0, y1: 0.95 });   // Stuhl: nicht hindurchlaufen
  if (B.sitze) B.sitze.push({ x, z, rot, h: 0.49 });
  const m = new THREE.Color('#8d96a3');
  for (const [lx, lz] of [[-0.19, -0.17], [0.19, -0.17], [-0.19, 0.17], [0.19, 0.17]]) teil(lx, lz, 0.035, 0.035, 0.06, 0.45, m);
  teil(0, 0, 0.44, 0.42, 0.45, 0.5, farbe);
  teil(0, -0.2, 0.42, 0.04, 0.6, 0.92, farbe);
  teil(-0.19, -0.2, 0.03, 0.03, 0.45, 0.62, m); teil(0.19, -0.2, 0.03, 0.03, 0.45, 0.62, m);
}

function korb(B, x, z, s, achse = 'x') {
  const { box } = B;
  if (achse === 'x') {
    box(x - 0.08 * s, x + 0.08 * s, 0, 3.4, z - 0.1, z + 0.1, new THREE.Color('#5d6573'), { art: 'innen' });
    box(x + 0.3 * s - 0.05, x + 0.3 * s + 0.05, 2.9, 3.95, z - 0.9, z + 0.9, new THREE.Color('#ffffff'), { art: 'innen' });
  } else {
    box(x - 0.1, x + 0.1, 0, 3.4, z - 0.6 * s - 0.08, z - 0.6 * s + 0.08, new THREE.Color('#5d6573'), { art: 'fest', stoss: true });
    box(x - 0.9, x + 0.9, 2.9, 3.95, z - 0.25 * s - 0.05, z - 0.25 * s + 0.05, new THREE.Color('#ffffff'), { art: 'fest' });
    // Ring und Netz: korb3d.js (echter runder Ring, damit der Ball hindurchfallen kann)
  }
}

// Graffiti: Schriftzüge in Sprühfarben auf transparenter Fläche (Wand dahinter)
function graffiti(woerter, breite, hoehe, seed) {
  const cv = document.createElement('canvas'); cv.width = Math.round(256 * breite / hoehe); cv.height = 256;
  const x = cv.getContext('2d'), F2 = ['#e85d75', '#2fb8a8', '#e9c46a', '#6b4e8a', '#3fa66b', '#d9693f', '#ffffff'];
  let r = seed; const zuf = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  for (let i = 0; i < 5; i++) { x.fillStyle = F2[Math.floor(zuf() * F2.length)] + '55'; x.beginPath(); x.ellipse(zuf() * cv.width, 60 + zuf() * 140, 60 + zuf() * 120, 20 + zuf() * 40, zuf(), 0, 7); x.fill(); }
  woerter.forEach((w, i) => {
    const px = (i + 0.5) * cv.width / woerter.length, py = 90 + zuf() * 100, gr = 60 + zuf() * 50;
    x.save(); x.translate(px, py); x.rotate((zuf() - 0.5) * 0.4);
    x.font = '900 ' + gr + 'px Impact, system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineWidth = 12; x.strokeStyle = '#1f2a3d'; x.strokeText(w, 0, 0);
    x.fillStyle = F2[Math.floor(zuf() * F2.length)]; x.fillText(w, 0, 0); x.restore();
  });
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(breite, hoehe), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false, depthWrite: false }));
  m.name = 'graffiti'; return m;
}

function uhrTextur() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const x = cv.getContext('2d');
  x.fillStyle = '#f4e8cc'; x.beginPath(); x.arc(128, 128, 124, 0, 7); x.fill();
  x.strokeStyle = '#2d3d5c'; x.lineWidth = 10; x.stroke();
  x.fillStyle = '#2d3d5c';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(128 + Math.sin(a) * 100 - 4, 128 - Math.cos(a) * 100 - 4, 8, 8); }
  x.lineWidth = 9; x.lineCap = 'round';
  x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 50, 128 - 30); x.stroke();
  x.lineWidth = 6; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 - 10, 128 - 90); x.stroke();
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

let _glas = null;
function glasMaterial() {
  if (!_glas) _glas = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: new THREE.Color('#2a5a78'), emissiveIntensity: 0.55 });
  return _glas;
}

export function mergeAll(geos) {
  let n = 0; for (const g of geos) n += g.attributes.position.count;
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3);
  let o = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); col.set(g.attributes.color.array, o * 3);
    o += g.attributes.position.count; g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.computeBoundingSphere();
  return out;
}

// Zusammenfassen nach Zellen (Raster in Metern): pro Zelle ein Netz, damit unsichtbare Zellen nicht gezeichnet werden
// (Kamera-Ausschnitt). Teile werden nach der Mitte ihres Kastens einsortiert.
export function zellenMerge(geos, groesse = 24) {
  const zellen = new Map();
  for (const g of geos) {
    if (!g.boundingBox) g.computeBoundingBox();
    const b = g.boundingBox, k = Math.floor((b.min.x + b.max.x) / 2 / groesse) + ':' + Math.floor((b.min.z + b.max.z) / 2 / groesse);
    if (!zellen.has(k)) zellen.set(k, []);
    zellen.get(k).push(g);
  }
  return [...zellen.values()].map((l) => mergeAll(l));
}

// Böden mit gleicher Textur zu einem Netz: Kacheln über die UV-Koordinaten statt über texture.repeat
export function boedenMerge(liste) {
  const gruppen = new Map();
  for (const { tex, x0, x1, z0, z1, y, kachel } of liste) {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
    const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * (x1 - x0) / kachel, uv.getY(i) * (z1 - z0) / kachel);
    g.rotateX(-Math.PI / 2); g.translate((x0 + x1) / 2, y, (z0 + z1) / 2);
    if (!gruppen.has(tex)) gruppen.set(tex, []);
    gruppen.get(tex).push(g);
  }
  const netze = [];
  for (const [tex, geos] of gruppen) {
    const t = tex.clone(); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.needsUpdate = true;
    const mat = new THREE.MeshLambertMaterial({ map: t });
    for (const g of zellenMergeUV(geos, 32)) { const m = new THREE.Mesh(g, mat); m.receiveShadow = true; m.name = 'boden'; netze.push(m); }
  }
  return netze;
}
function zellenMergeUV(geos, groesse) {
  const zellen = new Map();
  for (const g of geos) { g.computeBoundingBox(); const b = g.boundingBox, k = Math.floor((b.min.x + b.max.x) / 2 / groesse) + ':' + Math.floor((b.min.z + b.max.z) / 2 / groesse); if (!zellen.has(k)) zellen.set(k, []); zellen.get(k).push(g); }
  return [...zellen.values()].map((l) => {
    let n = 0, ni = 0; for (const g of l) { n += g.attributes.position.count; ni += g.index.count; }
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), idx = new Uint32Array(ni);
    let o = 0, oi = 0;
    for (const g of l) { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); uv.set(g.attributes.uv.array, o * 2); const ix = g.index.array; for (let i = 0; i < ix.length; i++) idx[oi + i] = ix[i] + o; oi += ix.length; o += g.attributes.position.count; g.dispose(); }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); out.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); out.setIndex(new THREE.BufferAttribute(idx, 1));
    out.computeBoundingSphere(); out.computeBoundingBox();
    return out;
  });
}
