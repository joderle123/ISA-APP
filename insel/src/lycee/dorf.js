// Annexe Junglinster – das Dorf um die Schule: Häuser wie in Luxemburg (heller Putz, Fensterläden, Schieferdach,
// Kamin, Vorgarten mit Hecke), ein Kirchturm und in der Ferne die Sendemasten von Junglinster (Opa Nik erzählt davon).
// Alles aus Kästen und Prismen, Eckpunktfarben wie der Rest der Welt. Wird VOR details.js gebaut, damit Bäume und
// Gras den Häusern ausweichen.
import * as THREE from 'three';

// Neue Orte für Karte und Situationen (Blick = (sin yaw, cos yaw))
export const ORTE_UMLAND = {
  waldweg: { x: -64, z: -30, yaw: Math.PI }, lichtung: { x: -60, z: -93, yaw: Math.PI },
  gasse: { x: 32, z: 58, yaw: 0 }, rueMoulin: { x: 20, z: 87, yaw: Math.PI / 2 }, epicerie: { x: 42, z: 89.5, yaw: 0 }, epicerieInnen: { x: 41.5, z: 93.4, yaw: 0 },
  spielplatz: { x: 63, z: 80.5, yaw: Math.PI }, arretMoulin: { x: 4.7, z: 86.5, yaw: Math.PI },
};

// Dinge, die Situationen sichtbar machen (situationen.js / spiel.js schalten sie an und aus)
export const DORF_DEKO = {};

// Wandbild im Bushäuschen der Rue du Moulin – gemalt von der 7ème vom letzten Jahr (Noor hat die Trommel gemalt)
export function wandbild(THREE, variante = '', cv0 = null) {
  const cv = cv0 || document.createElement('canvas'); cv.width = 1024; cv.height = 420; const g = cv.getContext('2d');
  const h = g.createLinearGradient(0, 0, 0, 420); h.addColorStop(0, '#7fc4ff'); h.addColorStop(0.62, '#cfeaff'); h.addColorStop(0.63, '#7cc47a'); h.addColorStop(1, '#4f9a55');
  g.fillStyle = h; g.fillRect(0, 0, 1024, 420);
  g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(880, 78, 46, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#ffd34d'; g.lineWidth = 6; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; g.beginPath(); g.moveTo(880 + Math.cos(a) * 58, 78 + Math.sin(a) * 58); g.lineTo(880 + Math.cos(a) * 78, 78 + Math.sin(a) * 78); g.stroke(); }
  g.fillStyle = '#6aa86a'; g.beginPath(); g.moveTo(0, 270); g.quadraticCurveTo(260, 170, 520, 262); g.quadraticCurveTo(760, 190, 1024, 258); g.lineTo(1024, 420); g.lineTo(0, 420); g.fill();
  // Sendemasten (rot-weiß) und Kirchturm
  for (const [x, hh] of [[150, 210], [235, 170]]) { for (let y = 0; y < hh; y += 24) { g.fillStyle = (y / 24) % 2 ? '#ffffff' : '#d9523c'; g.fillRect(x - 5, 262 - hh + y, 10, 24); } g.strokeStyle = '#8d96a3'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, 262 - hh); g.lineTo(x - 50, 262); g.moveTo(x, 262 - hh); g.lineTo(x + 50, 262); g.stroke(); }
  g.fillStyle = '#efe2b8'; g.fillRect(470, 150, 60, 120); g.fillStyle = '#5a6b7a'; g.beginPath(); g.moveTo(462, 150); g.lineTo(500, 82); g.lineTo(538, 150); g.fill();
  // Kinder an der Hand, Hund Bonbon, Trommel (Noor)
  const kind = (x, c) => { g.fillStyle = '#f1c7a2'; g.beginPath(); g.arc(x, 300, 15, 0, Math.PI * 2); g.fill(); g.fillStyle = c; g.fillRect(x - 15, 316, 30, 46); g.fillStyle = '#2d3748'; g.fillRect(x - 13, 362, 10, 34); g.fillRect(x + 3, 362, 10, 34); };
  ['#e85d75', '#2fb8a8', '#e9b949', '#9b7bc8', '#4f88c8'].forEach((c, i) => kind(330 + i * 62, c));
  g.strokeStyle = '#f1c7a2'; g.lineWidth = 6; g.beginPath(); g.moveTo(345, 334); g.lineTo(625, 334); g.stroke();
  g.fillStyle = '#c99a5b'; g.beginPath(); g.ellipse(700, 372, 38, 20, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(735, 350, 16, 0, Math.PI * 2); g.fill();
  if (variante === 'leer') {   // weggeschrubbt: heller Fleck, wo die Trommel war
    g.fillStyle = 'rgba(232,228,214,0.92)'; g.beginPath(); g.ellipse(866, 330, 120, 95, 0.1, 0, Math.PI * 2); g.fill();
  } else {
    g.fillStyle = variante === 'neu' ? '#2fb8a8' : '#d9523c'; g.fillRect(820, 318, 92, 72); g.fillStyle = '#f4e8cc'; g.beginPath(); g.ellipse(866, 318, 46, 13, 0, 0, Math.PI * 2); g.fill();
    if (variante === 'neu') { g.fillStyle = '#e9b949'; for (let i = 0; i < 4; i++) g.fillRect(826 + i * 22, 340, 10, 44); }   // neue Trommel mit Streifen
    g.strokeStyle = '#a0743e'; g.lineWidth = 7; g.beginPath(); g.moveTo(800, 270); g.lineTo(850, 312); g.moveTo(935, 270); g.lineTo(885, 312); g.stroke();
    if (variante === 'rosa') { g.fillStyle = 'rgba(232,93,117,0.28)'; g.beginPath(); g.ellipse(860, 335, 110, 70, -0.1, 0, Math.PI * 2); g.fill(); }
  }
  g.fillStyle = '#2b3a55'; g.font = 'bold 44px Georgia, serif'; g.textAlign = 'left'; g.fillText('Junglinster a Faarf', 28, 60);
  g.font = 'italic 24px Georgia, serif'; g.fillText('7ème B · Annexe · Trommel: Noor' + (variante === 'neu' ? ' (neu gemalt)' : ''), 30, 96);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
// Ein Sprüh-Tag (Kürzel) als durchsichtige Fläche
export function tagTextur(THREE, text, farbe, cv0) {
  const cv = cv0 || document.createElement('canvas'); cv.width = 512; cv.height = 256; const g = cv.getContext('2d');
  g.clearRect(0, 0, 512, 256); g.save(); g.translate(256, 140); g.rotate(-0.12);
  g.font = 'bold 120px Impact, system-ui'; g.textAlign = 'center'; g.lineJoin = 'round';
  g.lineWidth = 16; g.strokeStyle = '#1b1b1f'; g.strokeText(text, 0, 0); g.fillStyle = farbe; g.fillText(text, 0, 0);
  g.fillStyle = farbe; for (let i = 0; i < 6; i++) g.fillRect(-150 + i * 55, 20, 5, 30 + (i * 37) % 50);   // Farbnasen
  g.restore();
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function baueDorf({ B, C, schild, schilder, P = null, R = null }) {
  const { box, wand } = B;
  const schilders = (m) => schilder.push(m);
  const hex = (h) => new THREE.Color(h);
  const geo = (g, c, art = 'fest') => {
    g = g.index ? g.toNonIndexed() : g;
    if (g.attributes.uv) g.deleteAttribute('uv');
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const k = nor.getY(i) > 0.5 ? 1 : nor.getY(i) < -0.5 ? 0.86 : 0.93; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    B.teile[art].push(g);
  };
  let sz = 1312; const rnd = () => { sz = (sz * 16807) % 2147483647; return sz / 2147483647; };
  const belegt = (x0, x1, z0, z1) => B.alle.some((k) => k.y1 > 0.3 && (k.x1 - k.x0) * (k.z1 - k.z0) < 4000 && x1 > k.x0 && x0 < k.x1 && z1 > k.z0 && z0 < k.z1);

  const PUTZ = ['#f1e6cf', '#efe2b8', '#e8d9c4', '#dfe3e0', '#f2dccb', '#e9e3d0', '#d9cfb8'];
  const LADEN = ['#3f6f5a', '#2f5f9a', '#8a5a3a', '#6b6f78', '#a0522d', '#4a7a8c'];
  const SCHIEFER = hex('#454b5e'), FIRST = hex('#5a6178'), RAHMEN = hex('#f7f5ee'), GLAS = hex('#7fa6bf'), SOCKEL = hex('#9a8f80');

  // Satteldach mit First längs x (Traufe vorne/hinten), Giebeldreiecke an den Seiten
  function dach(x0, x1, z0, z1, y, h, putz) {
    const tief = (z1 - z0) / 2 + 0.5, zc = (z0 + z1) / 2, neig = Math.atan2(h, tief), lang = Math.hypot(h, tief);
    for (const s of [1, -1]) { const g = new THREE.BoxGeometry(x1 - x0 + 0.8, 0.25, lang); g.rotateX(s * neig); g.translate((x0 + x1) / 2, y + h / 2, zc + s * tief / 2); geo(g, SCHIEFER); }
    for (const x of [x0, x1]) {
      const sh = new THREE.Shape(); sh.moveTo(-(z1 - z0) / 2, 0); sh.lineTo((z1 - z0) / 2, 0); sh.lineTo(0, h - 0.15); sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: false }); g.rotateY(Math.PI / 2); g.translate(x - 0.1, y, zc); geo(g, putz);
    }
    box(x0 - 0.45, x1 + 0.45, y + h - 0.08, y + h + 0.12, zc - 0.14, zc + 0.14, FIRST);
  }

  // Haus mit Front nach Norden (vorne = −z) oder Süden (vorne = +z)
  function haus(xc, zc, w, d, stock, vorn = -1) {
    const x0 = xc - w / 2, x1 = xc + w / 2, z0 = zc - d / 2, z1 = zc + d / 2, H = stock * 2.9 + 0.4;
    if (belegt(x0 - 1.5, x1 + 1.5, z0 - 3, z1 + 1)) return false;
    const putz = hex(PUTZ[Math.floor(rnd() * PUTZ.length)]), laden = hex(LADEN[Math.floor(rnd() * LADEN.length)]);
    box(x0, x1, 0, H, z0, z1, putz, { stoss: true });
    box(x0 - 0.05, x1 + 0.05, 0, 0.55, z0 - 0.05, z1 + 0.05, SOCKEL);
    box(x0 - 0.1, x1 + 0.1, H - 0.18, H, z0 - 0.15, z1 + 0.15, hex('#e9e3d8'));   // Traufgesims
    const fz = vorn < 0 ? z0 : z1, s = vorn;   // Frontfläche
    const n = Math.max(2, Math.floor(w / 2.4));
    for (let f = 0; f < stock; f++) for (let i = 0; i < n; i++) {
      const x = x0 + (i + 0.5) * w / n, y0 = 0.9 + f * 2.9, tuer = f === 0 && i === Math.floor(n / 2);
      for (const zf of [z0, z1]) {
        const so = zf === z0 ? -1 : 1, front = zf === fz;
        if (tuer && front) {   // Haustür mit Vordach
          box(x - 0.5, x + 0.5, 0.05, 2.2, zf + so * 0.0, zf + so * 0.06, hex(LADEN[(i + 2) % LADEN.length]));
          box(x - 0.8, x + 0.8, 2.35, 2.45, zf, zf + so * 0.7, hex('#5d6573')); box(x - 0.7, x + 0.7, 0, 0.18, zf, zf + so * 0.9, SOCKEL);
          continue;
        }
        box(x - 0.45, x + 0.45, y0, y0 + 1.3, zf + so * 0.0, zf + so * 0.04, GLAS, { art: 'glas' });
        box(x - 0.52, x + 0.52, y0 - 0.08, y0, zf, zf + so * 0.12, RAHMEN); box(x - 0.52, x + 0.52, y0 + 1.3, y0 + 1.37, zf, zf + so * 0.06, RAHMEN);
        box(x - 0.025, x + 0.025, y0, y0 + 1.3, zf, zf + so * 0.06, RAHMEN);
        if (front || rnd() < 0.5) for (const sx of [-1, 1]) box(x + sx * 0.52 - (sx < 0 ? 0.42 : 0), x + sx * 0.52 + (sx > 0 ? 0.42 : 0), y0, y0 + 1.3, zf + so * 0.03, zf + so * 0.08, laden);
        if (front && f > 0 && rnd() < 0.35) box(x - 0.45, x + 0.45, y0 - 0.02, y0 + 0.2, zf + so * 0.1, zf + so * 0.32, hex(['#c0392b', '#e9b949', '#e85d75'][i % 3]));   // Blumenkasten
      }
    }
    dach(x0, x1, z0, z1, H, Math.min(4.2, d * 0.45), putz);
    const kx = x0 + w * (0.2 + rnd() * 0.6); box(kx - 0.3, kx + 0.3, H + 1.2, H + Math.min(4.2, d * 0.45) + 0.9, zc + 0.6, zc + 1.2, hex('#8a7a6a'));   // Kamin
    // Vorgarten: Hecke mit Lücke, Weg, Briefkasten
    const gz = fz + s * 2.6, mx = xc;
    for (const [a0, a1] of [[x0 - 0.5, mx - 0.8], [mx + 0.8, x1 + 0.5]]) box(a0, a1, 0, 0.9, Math.min(gz, gz + s * 0.6), Math.max(gz, gz + s * 0.6), hex('#4f8a4a'), { stoss: true });
    box(mx - 0.7, mx + 0.7, 0.01, 0.04, Math.min(fz, gz + s * 0.6), Math.max(fz, gz + s * 0.6), hex('#cfc7b8'));
    box(mx + 1.0, mx + 1.3, 0, 1.1, gz - s * 0.2, gz - s * 0.0, hex('#5d6573')); box(mx + 0.95, mx + 1.35, 1.1, 1.4, gz - s * 0.25, gz + s * 0.05, hex('#e9b949'));
    return true;
  }

  // Südseite der Straße: Häuserzeile hinter den Straßenbäumen (Bäckerei bleibt frei)
  let anz = 0;
  for (let x = -100; x <= 100; ) {
    const w = 8 + Math.floor(rnd() * 4) * 1.5, d = 8 + rnd() * 2;
    if (!(x + w > -10 && x < 14) && !(x + w > 26 && x < 38) && haus(x + w / 2, 62 + d / 2 + rnd() * 1.5, w, d, rnd() < 0.7 ? 2 : 3, -1)) anz++;   // Lücke bei x 26 … 38: Gasse zur Rue du Moulin
    x += w + 3 + rnd() * 4;
  }
  // Ost- und Westrand: ein paar Häuser mit Blick zur Schule
  for (const [x, z] of [[78, 20], [92, 4], [78, -10], [-82, 30], [-96, 34]]) if (haus(x, z, 9 + rnd() * 3, 8.5, 2, rnd() < 0.5 ? -1 : 1)) anz++;

  // Kirchturm mit Spitzhelm (Dorfmitte im Südwesten)
  { const kx = -70, kz = 70;
    box(kx - 6, kx + 6, 0, 9, kz - 2, kz + 9, hex('#efe6d6'), { stoss: true });
    dach(kx - 6, kx + 6, kz - 2, kz + 9, 9, 4.5, hex('#efe6d6'));
    box(kx - 2.6, kx + 2.6, 0, 24, kz - 6.6, kz - 1.4, hex('#e9dfcc'), { stoss: true });
    for (const y of [8, 15, 21]) for (const zf of [kz - 6.62]) box(kx - 0.5, kx + 0.5, y, y + 1.8, zf - 0.02, zf, hex('#3a3f4a'));
    const sp = new THREE.ConeGeometry(3.4, 11, 4); sp.rotateY(Math.PI / 4); sp.translate(kx, 24 + 5.5, kz - 4); geo(sp, SCHIEFER);
    box(kx - 0.08, kx + 0.08, 35, 37.2, kz - 4.08, kz - 3.92, hex('#c9a227')); box(kx - 0.6, kx + 0.6, 36.2, 36.4, kz - 4.08, kz - 3.92, hex('#c9a227'));
    const uhr = schild('XII', 1.6, 1.6, { bg: '#f7f5ee', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 120px Georgia, serif' }); uhr.position.set(kx, 18.2, kz - 6.65); uhr.rotation.y = Math.PI; schilder.push(uhr);
  }

  // Sendemasten von Junglinster (rot-weiß, rotes Licht oben) – hinter dem Wald im Nordosten
  for (const [mx, mz, h] of [[86, -114, 66], [100, -106, 58], [74, -118, 50]]) {
    for (let y = 0, i = 0; y < h; y += 6, i++) box(mx - 0.35, mx + 0.35, y, Math.min(h, y + 6), mz - 0.35, mz + 0.35, hex(i % 2 ? '#d9523c' : '#f2f2f2'));
    for (const y of [h * 0.35, h * 0.7]) box(mx - 1.2, mx + 1.2, y, y + 0.25, mz - 1.2, mz + 1.2, hex('#8d96a3'));
    box(mx - 0.4, mx + 0.4, h, h + 0.6, mz - 0.4, mz + 0.4, hex('#ff3b30'), { art: 'licht' });
    // Abspannseile (dünne schräge Balken)
    for (const a of [0.4, 2.5, 4.6]) {
      const A = new THREE.Vector3(mx + Math.cos(a) * 18, 0, mz + Math.sin(a) * 18), T = new THREE.Vector3(mx, h * 0.7, mz), d = T.clone().sub(A), L = d.length();
      const g = new THREE.BoxGeometry(0.06, L, 0.06); g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())); g.translate((A.x + T.x) / 2, (A.y + T.y) / 2, (A.z + T.z) / 2); geo(g, hex('#9aa3ad'));
    }
  }

  // ================= Zwei Straßen weiter: Gasse, Rue du Moulin, Épicerie „Klenge Buttek“, Spielplatz =================
  B.frei = B.frei || [];   // Flächen, auf die details.js keine Bäume und kein Gras setzt
  const geoF = (g, c, art = 'fest') => geo(g, c, art);
  box(-110, 110, -0.3, 0, 80, 132, C.rasen, { art: 'innen' });                                   // Grundfläche nach Süden verlängert
  // Gasse (Pflaster) mit Laternen und Straßenschild
  box(30, 34, 0, 0.05, 55, 84, C.pflaster, { art: 'innen' }); B.frei.push({ x0: 29, x1: 35, z0: 55, z1: 84 });
  for (const z of [64, 76]) { box(34.4, 34.55, 0, 3.6, z, z + 0.15, hex('#3a3f4a')); box(33.6, 34.55, 3.6, 3.7, z, z + 0.15, hex('#3a3f4a')); box(33.5, 33.9, 3.45, 3.6, z - 0.1, z + 0.25, hex('#fff2b0'), { art: 'licht' }); }
  { const t = schild('Rue du Moulin  ↓', 1.5, 0.34, { bg: '#1f4e9a', rand: '#ffffff', schrift: 'bold 96px system-ui' }); t.position.set(34.6, 2.4, 55.8); t.rotation.y = Math.PI / 2; schilder.push(t);
    box(34.55, 34.65, 0, 2.6, 55.75, 55.85, hex('#8d96a3')); }
  // Gasse mit Charakter: Gartenhecken links und rechts (mit Lücken für Gartentore), Mülltonnen, Bank, Briefkästen
  { const HECKE = hex('#3f7d3a'), HECKE2 = hex('#4b8c42'), HOLZ = hex('#8a6a4a');
    for (const [z0, z1] of [[56, 63], [65.5, 75], [77.5, 82]]) {
      box(28.9, 29.6, 0, 1.15, z0, z1, (z0 | 0) % 2 ? HECKE : HECKE2, { stoss: true });
      box(34.7, 35.4, 0, 1.05, z0 + 0.8, z1 - 0.4, (z0 | 0) % 2 ? HECKE2 : HECKE, { stoss: true });
    }
    for (const z of [63.6, 75.6]) { box(28.95, 29.05, 0, 1.0, z, z + 1.6, HOLZ); box(29.0, 29.1, 0.45, 0.55, z, z + 1.6, HOLZ); }   // Gartentore (offen angelehnt)
    for (const [x, z, c] of [[29.95, 64.2, '#2f6db0'], [29.95, 64.9, '#5a5f6b'], [34.1, 76.2, '#3f7d3a']]) box(x - 0.3, x + 0.3, 0, 1.05, z - 0.3, z + 0.3, hex(c), { stoss: true });   // Mülltonnen
    box(34.15, 34.55, 0.42, 0.5, 69, 70.8, HOLZ, { stoss: true }); box(34.45, 34.55, 0.5, 0.95, 69, 70.8, HOLZ);   // Bank an der Hecke
    if (B.sitze) for (const z of [69.5, 70.3]) B.sitze.push({ x: 34.0, z, rot: -Math.PI / 2, bank: true, h: 0.5 });
    for (const [x, z] of [[29.75, 58.2], [29.75, 71.4]]) { box(x - 0.04, x + 0.04, 0, 1.1, z - 0.04, z + 0.04, hex('#3a3f4a')); box(x - 0.2, x + 0.2, 1.1, 1.38, z - 0.14, z + 0.14, hex('#c0392b')); }   // Briefkästen
  }
  // Rue du Moulin (z 84 … 90), Gehwege
  box(-30, 110, 0, 0.02, 84, 90, hex('#4a4d55'), { art: 'innen' });
  for (let x = -28; x < 110; x += 6) box(x, x + 3, 0.02, 0.03, 86.9, 87.1, hex('#e9e3d0'), { art: 'innen' });
  box(-30, 110, 0, 0.14, 82, 84, C.bordstein || hex('#b8b2a6'), { art: 'innen' }); box(-30, 110, 0, 0.14, 90, 92, C.bordstein || hex('#b8b2a6'), { art: 'innen' });
  B.frei.push({ x0: -30, x1: 110, z0: 81, z1: 93 });
  if (P) for (const x of [-12, 12, 60, 84, 104]) P('strasse/Streetlight_Single', x, 82.6, 0, { h: 5.5 });
  // geparkte Autos am Straßenrand (nicht vor Épicerie, Gasse und Bushäuschen)
  if (P) for (const [x, z, m, f, d] of [[-16, 85.2, 'kk/car_sedan', '#c8d6e0', 1], [18, 88.8, 'auto/sedan', null, -1], [55, 88.8, 'kk/car_hatchback', '#e6c8a0', -1], [76, 85.2, 'kk/car_stationwagon', '#d8e2ea', 1], [94, 88.8, 'auto/suv', null, -1]])
    P(m, x, z, d * Math.PI / 2, m.startsWith('kk/') ? { s: 4.1, fest: true, ...(f ? { farbe: f } : {}) } : { h: 1.6, fest: true });
  // Épicerie „Klenge Buttek“ (x 36 … 48, z 92 … 102): Schaufenster, Markise, Tür in der Mitte, innen Regale, Kasse, Kühlschränke
  { const X0 = 36, X1 = 48, Z0 = 92, Z1 = 102, H = 3.6, PUTZ_L = hex('#efe2b8'), GLAS_L = hex('#9cc3d8');
    const tuer = { von: 41, bis: 43, unten: 0, oben: 2.4 }, f1 = { von: 36.8, bis: 40.4, unten: 0.6, oben: 2.5 }, f2 = { von: 43.6, bis: 47.2, unten: 0.6, oben: 2.5 };
    wand('x', Z0, X0, X1, 0, H, 0.3, PUTZ_L, [f1, tuer, f2], { stoss: true });
    wand('x', Z1, X0, X1, 0, H, 0.3, PUTZ_L, [], { stoss: true });
    for (const x of [X0, X1]) wand('z', x, Z0, Z1, 0, H, 0.3, PUTZ_L, [], { stoss: true });
    for (const o of [f1, f2]) box(o.von, o.bis, o.unten, o.oben, Z0 - 0.03, Z0 + 0.03, GLAS_L, { art: 'glas', stoss: true });
    box(X0 - 0.2, X1 + 0.2, H, H + 0.25, Z0 - 0.2, Z1 + 0.2, hex('#6b6f78'));   // Flachdach
    box(X0 - 0.05, X1 + 0.05, 0, 0.5, Z0 - 0.18, Z0 - 0.15, hex('#9a8f80'));      // Sockel
    for (let i = 0; i < 12; i++) box(X0 + i, X0 + i + 1, 2.7, 2.78, Z0 - 1.25, Z0 - 0.15, hex(i % 2 ? '#ffffff' : '#2f8a5a'));   // Markise
    for (const x of [X0 + 0.1, X1 - 0.1]) box(x - 0.03, x + 0.03, 2.4, 2.75, Z0 - 1.2, Z0 - 1.15, hex('#3a3f4a'));
    { const t = schild('Épicerie  Klenge Buttek', 5.6, 0.62, { bg: '#2f8a5a', rand: '#f4e8cc', schrift: 'bold 110px Georgia, serif' }); t.position.set(42, 3.15, Z0 - 0.17); t.rotation.y = Math.PI; schilder.push(t); }
    { const t = schild('Mo–Sa 7–19 · Brout · Uebst · Séisses', 2.6, 0.3, { bg: '#ffffff', fg: '#2f8a5a', rand: '#2f8a5a', schrift: 'bold 70px system-ui' }); t.position.set(42, 2.58, Z0 - 0.17); t.rotation.y = Math.PI; schilder.push(t); }
    box(41.05, 41.12, 0.05, 2.38, Z0 - 0.02, Z0 + 0.02, hex('#3a3f4a'));   // Türrahmen
    // innen: Boden, Decke, Licht
    box(X0 + 0.15, X1 - 0.15, 0.0, 0.07, Z0 + 0.15, Z1 - 0.15, hex('#ddd6c6'), { art: 'innen' });
    for (let x = X0 + 0.15; x < X1 - 0.2; x += 0.8) for (let z = Z0 + 0.15; z < Z1 - 0.2; z += 0.8) if (((x - X0) / 0.8 + (z - Z0) / 0.8 | 0) % 2) box(x, x + 0.8, 0.07, 0.072, z, z + 0.8, hex('#cfc6b2'), { art: 'innen' });
    box(X0 + 0.15, X1 - 0.15, H - 0.12, H - 0.02, Z0 + 0.15, Z1 - 0.15, hex('#f2efe8'), { art: 'innen' });
    for (const z of [94, 97, 100]) box(39, 46, H - 0.16, H - 0.12, z - 0.15, z + 0.15, hex('#fffbe8'), { art: 'licht' });
    // Kasse (Theke längs z, Tante Lisette steht dahinter an der Westseite)
    box(37.6, 38.4, 0.07, 1.0, 92.9, 96.2, hex('#8a5a3a'), { art: 'innen', stoss: true }); box(37.5, 38.5, 1.0, 1.06, 92.8, 96.3, hex('#d9c3a0'), { art: 'innen' });
    box(37.75, 38.25, 1.06, 1.3, 94.6, 95.2, hex('#2b2b33'), { art: 'innen' }); box(38.24, 38.26, 1.12, 1.26, 94.66, 95.14, hex('#7fc4ff'), { art: 'licht' });
    const BUNT = ['#e85d75', '#e9b949', '#3fa66b', '#2f6db0', '#d9693f', '#9b7bc8', '#2fb8a8'];
    for (let i = 0; i < 4; i++) for (let k = 0; k < 6; k++) box(38.45, 38.75, 0.2 + i * 0.2, 0.36 + i * 0.2, 93.0 + k * 0.5, 93.4 + k * 0.5, hex(BUNT[(i + k) % BUNT.length]), { art: 'innen' });   // Süßigkeiten vorn an der Theke
    { const t = schild('Süßes', 0.6, 0.16, { bg: '#e85d75', schrift: 'bold 80px system-ui' }); t.position.set(38.77, 1.0, 94.5); t.rotation.y = Math.PI / 2; schilder.push(t); }
    // Regale (zwei Reihen) mit Waren
    for (const z of [96.0, 98.8]) {
      box(40.0, 47.0, 0.07, 1.75, z - 0.3, z + 0.3, hex('#b8bcc4'), { art: 'innen', stoss: true });
      for (let lvl = 0; lvl < 4; lvl++) for (let x = 40.1; x < 46.9; x += 0.32) for (const sz of [-1, 1]) {
        const c = BUNT[Math.floor((x * 7 + lvl * 3 + (sz > 0 ? 2 : 0)) % BUNT.length)], h = 0.18 + ((x * 13) % 3) * 0.04;
        box(x, x + 0.26, 0.2 + lvl * 0.4, 0.2 + lvl * 0.4 + h, z + sz * 0.31 - (sz > 0 ? 0 : 0.18), z + sz * 0.31 + (sz > 0 ? 0.18 : 0), hex(c), { art: 'innen' });
      }
    }
    // Rückwand: Kühlschränke, Getränke; vorne am Fenster Obst und Gemüse; Zeitschriften
    if (P) { P('kk/fridge_A_decorated', 46.6, 101.1, Math.PI, { h: 2.0, fest: true }); P('kk/fridge_A_decorated', 45.2, 101.1, Math.PI, { h: 2.0, fest: true });
      P('kk/crate_tomatoes', 44.2, 92.9, 0, { h: 0.42, fest: true }); P('kk/crate_carrots', 45.3, 92.9, 0, { h: 0.42, fest: true }); P('kk/crate_potatoes', 46.4, 92.9, 0, { h: 0.42, fest: true });
      P('kk/cactus_small_A', 37.9, 95.8, 0, { h: 0.22, y: 1.06 }); }
    box(39.2, 47.85, 0.07, 1.9, 101.4, 101.85, hex('#8a5a3a'), { art: 'innen', stoss: true });
    for (let x = 39.4; x < 44.5; x += 0.35) for (let lvl = 0; lvl < 4; lvl++) box(x, x + 0.22, 0.25 + lvl * 0.42, 0.55 + lvl * 0.42, 101.42, 101.6, hex(['#c0392b', '#2f6db0', '#e9b949', '#3fa66b'][(lvl + Math.round(x * 3)) % 4]), { art: 'innen' });
    box(39.5, 40.4, 0.07, 1.3, 92.5, 92.8, hex('#5d6573'), { art: 'innen', stoss: true });
    for (let i = 0; i < 5; i++) box(39.55 + i * 0.17, 39.7 + i * 0.17, 0.5, 1.25, 92.8, 92.82, hex(BUNT[i]), { art: 'innen' });   // Zeitschriften
    // Kamera und Spiegel (sieht man, wenn man genau hinschaut)
    box(47.5, 47.8, 3.2, 3.38, 92.3, 92.6, hex('#2b2b33'), { art: 'innen' }); box(47.48, 47.5, 3.24, 3.27, 92.42, 92.47, hex('#ff3b30'), { art: 'licht' });
    { const g = new THREE.SphereGeometry(0.32, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2); g.rotateX(-Math.PI / 2); g.rotateY(-Math.PI / 4); g.translate(47.6, 2.7, 101.6); geoF(g, hex('#cfd8e0'), 'innen'); }
    { const t = schild('Lächeln, Sie werden gefilmt 🙂', 1.2, 0.2, { bg: '#ffffff', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 60px system-ui' }); t.position.set(47.83, 2.9, 93.6); t.rotation.y = -Math.PI / 2; schilder.push(t); }
    if (R) R('epicerie', 'Épicerie', X0, X1, Z0, Z1, { decke: H - 0.3 });
    B.frei.push({ x0: X0 - 1, x1: X1 + 1, z0: Z0 - 2, z1: Z1 + 1 });
  }
  // Häuser auf der Südseite der Rue du Moulin (die Épicerie bleibt frei)
  for (let x = -26; x <= 100; ) {
    const w = 8 + Math.floor(rnd() * 3) * 1.5, d = 8 + rnd() * 2;
    if (!(x + w > 33 && x < 51) && haus(x + w / 2, 95.5 + d / 2, w, d, 2, -1)) anz++;
    x += w + 3 + rnd() * 4;
  }
  // Bushäuschen „Arrêt Rue du Moulin“ (Nordseite, auf dem Gehweg): Rückwand mit Wandbild, Bank, Dach
  { const X0 = 2, X1 = 7.4, Z = 82.2, GR = hex('#3a3f4a');
    box(X0, X1, 0.14, 2.5, Z - 0.14, Z, hex('#d8d2c4'), { stoss: true });
    for (const x of [X0, X1 - 0.1]) box(x, x + 0.1, 0.14, 2.6, Z - 0.14, Z + 1.5, GR, { stoss: true });
    box(X0 - 0.1, X1 + 0.1, 2.6, 2.72, Z - 0.25, Z + 1.7, GR);
    box(X0 + 0.7, X1 - 0.7, 0.55, 0.61, Z + 0.1, Z + 0.5, hex('#a0743e'), { stoss: true }); for (const x of [X0 + 0.9, X1 - 1.0]) box(x, x + 0.1, 0.14, 0.55, Z + 0.15, Z + 0.45, GR);
    if (B.sitze) for (const x of [3.9, 5.5]) B.sitze.push({ x, z: Z + 0.3, rot: 0, bank: true, h: 0.61 });
    { const t = schild('Arrêt · Rue du Moulin', 1.4, 0.3, { bg: '#2fb8a8', schrift: 'bold 84px system-ui' }); t.position.set(X1 + 0.12, 2.25, Z + 1.3); t.rotation.y = Math.PI / 2; schilder.push(t); }
    const bild = new THREE.Mesh(new THREE.PlaneGeometry(4.9, 2.0), new THREE.MeshLambertMaterial({ map: wandbild(THREE) })); DORF_DEKO.wandbild = bild; bild.position.set((X0 + X1) / 2, 1.42, Z + 0.006); bild.name = 'schild'; schilders(bild);
    const tag = (text, farbe, x, y, b) => { const cv = document.createElement('canvas'); const m = new THREE.Mesh(new THREE.PlaneGeometry(b, b / 2), new THREE.MeshLambertMaterial({ map: tagTextur(THREE, text, farbe, cv), transparent: true, depthWrite: false }));
      m.position.set(x, y, Z + 0.012); m.name = 'schild'; m.visible = false; m.userData.cv = cv; schilders(m); return m; };
    DORF_DEKO.tagDex = tag('D3X', '#e85d75', 6.0, 1.15, 1.6);        // über Noors Trommel
    DORF_DEKO.tagDu = tag('★', '#e9b949', 3.4, 1.0, 1.3);            // dein Kürzel (spiel.js malt die Buchstaben)
    B.frei.push({ x0: X0 - 1, x1: X1 + 1, z0: Z - 1, z1: Z + 2 });
  }
  // Spielplatz (Nordseite der Rue du Moulin): Sand, Schaukel, Rutsche, Wippe, Bank
  { const X0 = 56, X1 = 72, Z0 = 73, Z1 = 81.5, SAND = hex('#e6d3a3'), ROT = hex('#d9523c'), BLAU = hex('#2f6db0'), GELB = hex('#e9b949'), HOLZ = hex('#a0743e');
    box(X0, X1, 0, 0.05, Z0, Z1, SAND, { art: 'innen' }); B.frei.push({ x0: X0 - 1, x1: X1 + 1, z0: Z0 - 1, z1: Z1 + 1 });
    for (const [a0, a1] of [[X0, 62], [66, X1]]) box(a0, a1, 0, 0.6, Z1 - 0.06, Z1, HOLZ, { stoss: true });   // Zaun mit Eingang
    for (const x of [X0, X1]) box(x - 0.06, x, 0, 0.6, Z0, Z1, HOLZ, { stoss: true }); box(X0, X1, 0, 0.6, Z0, Z0 + 0.06, HOLZ, { stoss: true });
    // Schaukel
    for (const x of [57.5, 61.5]) { box(x - 0.08, x + 0.08, 0, 2.4, 75.4, 75.56, BLAU, { stoss: true }); }
    box(57.4, 61.6, 2.32, 2.46, 75.4, 75.56, BLAU);
    for (const x of [58.6, 60.4]) { for (const dx of [-0.2, 0.2]) box(x + dx - 0.01, x + dx + 0.01, 0.55, 2.32, 75.47, 75.49, hex('#8d96a3')); box(x - 0.25, x + 0.25, 0.5, 0.56, 75.3, 75.66, ROT); }
    // Rutsche: Leiter, Plattform, schräge Bahn
    box(66, 67.2, 1.4, 1.5, 75.0, 76.2, HOLZ); for (const [x, z] of [[66, 75.0], [67.1, 75.0], [66, 76.1], [67.1, 76.1]]) box(x, x + 0.1, 0, 1.5, z, z + 0.1, HOLZ, { stoss: true });
    for (let y = 0.3; y < 1.4; y += 0.3) box(66.05, 67.15, y, y + 0.05, 74.9, 75.0, HOLZ);
    { const g = new THREE.BoxGeometry(0.9, 0.08, 3.0); g.rotateX(-0.45); g.translate(66.6, 0.78, 77.5); geoF(g, GELB); }
    // Wippe und Bank
    box(69.4, 69.6, 0, 0.45, 78.3, 78.5, HOLZ); { const g = new THREE.BoxGeometry(0.3, 0.08, 3.2); g.rotateX(0.18); g.translate(69.5, 0.5, 78.4); geoF(g, ROT); }
    box(58, 60.4, 0.42, 0.48, 80.2, 80.6, HOLZ, { stoss: true }); for (const x of [58.2, 60.1]) box(x, x + 0.12, 0, 0.42, 80.25, 80.55, hex('#3a3f4a'));
    if (B.sitze) for (const x of [58.6, 59.8]) B.sitze.push({ x, z: 80.4, rot: Math.PI, bank: true, h: 0.48 });
    // Energy-Drink-Dosen auf und neben der Bank (nur, solange die Wette läuft – spiel.js schaltet sie)
    { const gr = new THREE.Group(); gr.name = 'schild';
      for (const [x, y, z, liegt, c] of [[58.3, 0.54, 80.45, 0, '#2f6db0'], [58.45, 0.54, 80.35, 0, '#2f6db0'], [60.2, 0.54, 80.42, 0, '#3fa66b'], [59.1, 0.04, 79.6, 1, '#2f6db0'], [60.9, 0.04, 79.3, 1, '#3fa66b'], [58.8, 0.54, 80.5, 0, '#3fa66b']]) {
        const d = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.16, 12), new THREE.MeshLambertMaterial({ color: c })); d.position.set(x, y + 0.08, z); if (liegt) { d.rotation.z = Math.PI / 2; d.rotation.y = x; d.position.y = 0.075; } gr.add(d);
        const r2 = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.03, 12), new THREE.MeshLambertMaterial({ color: '#c9ccd2' })); r2.position.copy(d.position); if (liegt) { r2.rotation.copy(d.rotation); r2.position.x += 0.07; } else r2.position.y += 0.07; gr.add(r2);
      }
      gr.visible = false; DORF_DEKO.dosen = gr; schilders(gr); }
    { const t = schild('Spielplatz · bis 14 Jahre', 1.6, 0.32, { bg: '#3fa66b', schrift: 'bold 80px system-ui' }); t.position.set(64, 1.1, 81.56); schilder.push(t); box(63.9, 64.1, 0, 0.95, 81.5, 81.62, hex('#8d96a3')); }
  }

  // ================= Hinter der Schule: Waldweg zur Lichtung mit Schutzhütte =================
  { const ERDE = hex('#9c7a52'), HOLZ = hex('#7a5232'), HOLZH = hex('#a0743e'), STEIN = hex('#8d939c');
    // Der Weg beginnt zwischen Tribüne (bis x −63.1) und Werkstatt (ab x −60), knickt hinter der Tribüne nach Westen und läuft in den Wald
    box(-62.9, -60.3, 0, 0.04, -25, -2, ERDE, { art: 'innen' }); B.frei.push({ x0: -63.0, x1: -60.2, z0: -26, z1: -2 });
    box(-65.6, -60.3, 0, 0.04, -27.5, -24.5, ERDE, { art: 'innen' });
    box(-65.6, -62.4, 0, 0.04, -92, -26, ERDE, { art: 'innen' }); B.frei.push({ x0: -67.5, x1: -60.5, z0: -94, z1: -24 });
    // Wegweiser am Anfang (lesbar, wenn man vom Durchgang zum Sportplatz kommt)
    box(-60.55, -60.4, 0, 2.3, -2.6, -2.45, HOLZ, { stoss: true });
    { const t = schild('Bëschwee  ↑  Lichtung', 1.3, 0.26, { bg: '#7a5232', rand: '#f4e8cc', schrift: 'bold 72px Georgia, serif' }); t.position.set(-61.15, 2.0, -2.4); t.rotation.y = 0; schilder.push(t); }
    { const t = schild('→  Schoul', 1.0, 0.24, { bg: '#7a5232', rand: '#f4e8cc', schrift: 'bold 72px Georgia, serif' }); t.position.set(-61.0, 1.65, -2.4); t.rotation.y = 0; schilder.push(t); }
    // Lichtung (Mitte -60, -100): Boden, Feuerstelle (kalt), drei Baumstämme zum Sitzen
    const CX = -60, CZ = -100;
    { const g = new THREE.CylinderGeometry(9, 9, 0.04, 32); g.translate(CX, 0.02, CZ); geoF(g, hex('#8f9a5a'), 'innen'); }
    { const g = new THREE.CylinderGeometry(0.65, 0.7, 0.05, 16); g.translate(CX, 0.04, CZ + 1); geoF(g, hex('#3a3633'), 'innen'); }
    for (let i = 0; i < 11; i++) { const a = i / 11 * Math.PI * 2, x = CX + Math.cos(a) * 0.85, z = CZ + 1 + Math.sin(a) * 0.85; box(x - 0.14, x + 0.14, 0, 0.2, z - 0.12, z + 0.12, STEIN); }
    const stamm = (x, z, alongX, len = 2.6) => { const g = new THREE.CylinderGeometry(0.24, 0.26, len, 12); g.rotateZ(Math.PI / 2); if (!alongX) g.rotateY(Math.PI / 2); g.translate(x, 0.24, z); geoF(g, HOLZ);
      if (alongX) box(x - len / 2, x + len / 2, 0, 0.42, z - 0.22, z + 0.22, HOLZ, { art: 'innen', stoss: true }); else box(x - 0.22, x + 0.22, 0, 0.42, z - len / 2, z + len / 2, HOLZ, { art: 'innen', stoss: true }); };
    stamm(CX, CZ - 1.8, true); stamm(CX - 2.8, CZ + 1.2, false); stamm(CX + 2.8, CZ + 1.2, false);
    if (B.sitze) { for (const dx of [-0.8, 0.8]) B.sitze.push({ x: CX + dx, z: CZ - 1.75, rot: 0, bank: true, h: 0.44 });
      for (const dz of [0.4, 2.0]) { B.sitze.push({ x: CX - 2.75, z: CZ + dz, rot: Math.PI / 2, bank: true, h: 0.44 }); B.sitze.push({ x: CX + 2.75, z: CZ + dz, rot: -Math.PI / 2, bank: true, h: 0.44 }); } }
    // Dosen, Chipstüte (liegen herum)
    for (const [x, z, c] of [[CX + 1.3, CZ - 0.9, '#c0392b'], [CX - 1.6, CZ + 2.6, '#2fb8a8'], [CX + 2.1, CZ + 2.9, '#e9b949'], [CX - 0.4, CZ - 2.6, '#c0392b']]) { const g = new THREE.CylinderGeometry(0.035, 0.035, 0.12, 8); g.rotateZ(Math.PI / 2); g.translate(x, 0.05, z); geoF(g, hex(c)); }
    box(CX + 0.9, CX + 1.2, 0.02, 0.04, CZ + 2.4, CZ + 2.65, hex('#e85d75'));
    // Schutzhütte (offen nach Süden), Bank innen, Graffiti an der Rückwand
    { const HX0 = CX - 3.2, HX1 = CX + 3.2, HZ0 = CZ - 9.5, HZ1 = CZ - 5.6;
      box(HX0, HX1, 0, 2.4, HZ0, HZ0 + 0.15, HOLZH, { stoss: true });
      for (const x of [HX0, HX1 - 0.15]) box(x, x + 0.15, 0, 2.4, HZ0, HZ1, HOLZH, { stoss: true });
      for (const s of [-1, 1]) { const g = new THREE.BoxGeometry(7.2, 0.14, 2.6); g.rotateX(s * 0.42); g.translate(CX, 2.85, (HZ0 + HZ1) / 2 + s * 1.1); geoF(g, hex('#5a3a22')); }
      box(HX0 + 0.3, HX1 - 0.3, 0.42, 0.48, HZ0 + 0.2, HZ0 + 0.6, HOLZ, { stoss: true });
      if (B.sitze) for (const dx of [-1.6, 0, 1.6]) B.sitze.push({ x: CX + dx, z: HZ0 + 0.45, rot: 0, bank: true, h: 0.48 });
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 200; const g2 = cv.getContext('2d');
      g2.clearRect(0, 0, 512, 200); g2.font = 'bold 64px Impact, system-ui'; g2.lineWidth = 3;
      [['D3X', 40, 80, '#e85d75', -0.1], ['MO', 220, 70, '#2fb8a8', 0.08], ['4EVER', 300, 150, '#e9b949', -0.05], ['☺', 120, 170, '#ffffff', 0]].forEach(([t, x, y, c, r]) => { g2.save(); g2.translate(x, y); g2.rotate(r); g2.fillStyle = c; g2.fillText(t, 0, 0); g2.strokeStyle = '#1b1b22'; g2.strokeText(t, 0, 0); g2.restore(); });
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.6), new THREE.MeshLambertMaterial({ map: tex, transparent: true })); m.position.set(CX, 1.5, HZ0 + 0.17); m.name = 'schild'; schilder.push(m);
      { const t = schild('Feuer machen verboten · Forstverwaltung', 2.0, 0.3, { bg: '#ffffff', fg: '#c0392b', rand: '#c0392b', schrift: 'bold 60px system-ui' }); t.position.set(HX1 + 0.6, 1.3, HZ1 + 0.4); schilder.push(t); box(HX1 + 0.55, HX1 + 0.65, 0, 1.2, HZ1 + 0.35, HZ1 + 0.45, HOLZ); }
    }
    B.frei.push({ x0: CX - 10, x1: CX + 10, z0: CZ - 11, z1: CZ + 9 });
  }
  return { haeuser: anz };
}
