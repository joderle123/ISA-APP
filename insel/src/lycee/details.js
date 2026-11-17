// Annexe Junglinster – Details und Atmosphäre (Auftrag 17.11.: „Grafik am absoluten Maximum … so viele Details wie möglich“).
// Alles selbst gezeichnet: Plakate (eine gemeinsame Leinwand, ein Netz), Kreide auf den Tafeln, Wanduhren, Schulranzen an
// den Stühlen, Hefte auf den Tischen, Hängelampen und Tabletts in der Kantine, Mülleimer, Pflanzkübel mit Bäumen und
// Sitzkante, eine Tischtennisplatte auf dem Hof und weiche Schatten unter allen Tischen, Stühlen und Bänken.
// Neue Teile nur dort, wo nichts steht (frei()). Keine echten Personen, keine Familiendaten, Telefonnummern nur 116 111.
import * as THREE from 'three';

const leinwand = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

// ---------- Plakate: 12 Motive auf einer Leinwand (4 × 3 Felder à 256 × 340) ----------
const PW = 256, PH = 340;
const MOTIVE = ['regeln', 'einmaleins', 'sport', 'theater', 'lesen', 'willkommen', 'planeten', 'sepas', 'wasser', 'musik', 'klassenfoto', 'tablett'];
function plakatLeinwand() {
  const c = leinwand(1024, 1024), g = c.getContext('2d');
  const text = (t, x, y, px, farbe, fett = true, align = 'center') => { g.font = (fett ? 'bold ' : '') + px + 'px system-ui, sans-serif'; g.fillStyle = farbe; g.textAlign = align; g.fillText(t, x, y); };
  const kreis = (x, y, r, f) => { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = f; g.fill(); };
  MOTIVE.forEach((m, i) => {
    const ox = (i % 4) * PW, oy = Math.floor(i / 4) * PH, mx = ox + PW / 2;
    g.save(); g.beginPath(); g.rect(ox, oy, PW, PH); g.clip();
    const bg = { regeln: '#fff8e6', einmaleins: '#2b3a55', sport: '#d9693f', theater: '#6b4e8a', lesen: '#3fa66b', willkommen: '#2fb8a8', planeten: '#1c2340', sepas: '#ffffff', wasser: '#cdeaff', musik: '#2b2b33', klassenfoto: '#f4e8cc', tablett: '#e9c46a' }[m];
    g.fillStyle = bg; g.fillRect(ox, oy, PW, PH);
    if (m === 'regeln') {
      text('Unsere Regeln', mx, oy + 48, 30, '#2b3a55');
      ['Zuhören', 'Ausreden lassen', 'Fragen ist gut', 'Hilfe holen ist okay', 'Handy in die Tasche'].forEach((t, k) => { kreis(ox + 34, oy + 96 + k * 46, 12, ['#e85d75', '#4f88c8', '#3fa66b', '#e9b949', '#9b7bc8'][k]); text(t, ox + 56, oy + 104 + k * 46, 21, '#2b3a55', false, 'left'); });
    } else if (m === 'einmaleins') {
      text('1 × 1', mx, oy + 46, 36, '#ffd166');
      for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) text(String(a * b), ox + 14 + (b - 1) * 25 + 11, oy + 76 + (a - 1) * 25, 12, a === b ? '#ffd166' : '#e7eef0', a === b);
    } else if (m === 'sport') {
      kreis(mx, oy + 140, 80, '#f28c38'); g.strokeStyle = '#2b2b33'; g.lineWidth = 5;
      g.beginPath(); g.arc(mx, oy + 140, 80, 0, Math.PI * 2); g.moveTo(mx - 80, oy + 140); g.lineTo(mx + 80, oy + 140); g.moveTo(mx, oy + 60); g.lineTo(mx, oy + 220); g.stroke();
      text('SPORTFEST', mx, oy + 268, 34, '#ffffff'); text('12. Juni · ganzer Tag', mx, oy + 304, 20, '#fff3a8');
    } else if (m === 'theater') {
      kreis(mx - 40, oy + 120, 52, '#f4e8cc'); kreis(mx + 44, oy + 132, 52, '#ffd166');
      for (const [x, y, s] of [[mx - 40, oy + 120, 1], [mx + 44, oy + 132, -1]]) { kreis(x - 18, y - 12, 7, '#2b2b33'); kreis(x + 18, y - 12, 7, '#2b2b33'); g.beginPath(); g.lineWidth = 5; g.strokeStyle = '#2b2b33'; g.arc(x, y + 18 - s * 6, 20, s > 0 ? 0.15 * Math.PI : 1.15 * Math.PI, s > 0 ? 0.85 * Math.PI : 1.85 * Math.PI); g.stroke(); }
      text('Theater-AG', mx, oy + 246, 34, '#ffffff'); text('Mittwoch · 14 Uhr · Aula', mx, oy + 284, 19, '#f4e8cc'); text('Alle dürfen mitmachen', mx, oy + 314, 17, '#d8c8f0', false);
    } else if (m === 'lesen') {
      g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(mx, oy + 90); g.lineTo(mx - 90, oy + 70); g.lineTo(mx - 90, oy + 180); g.lineTo(mx, oy + 200); g.lineTo(mx + 90, oy + 180); g.lineTo(mx + 90, oy + 70); g.closePath(); g.fill();
      g.strokeStyle = '#c8d6c0'; g.lineWidth = 3; for (let k = 0; k < 5; k++) { g.beginPath(); g.moveTo(mx - 76, oy + 96 + k * 18); g.lineTo(mx - 14, oy + 108 + k * 18); g.moveTo(mx + 14, oy + 108 + k * 18); g.lineTo(mx + 76, oy + 96 + k * 18); g.stroke(); }
      text('LESEN', mx, oy + 256, 44, '#ffffff'); text('= Reisen im Kopf', mx, oy + 292, 22, '#e8f5df'); text('CDI · jeden Tag offen', mx, oy + 322, 16, '#d8f5c8', false);
    } else if (m === 'willkommen') {
      ['Wëllkomm', 'Bienvenue', 'Willkommen', 'Bem-vindo', 'Welcome'].forEach((t, k) => text(t, mx, oy + 70 + k * 56, k === 0 ? 38 : 30, k % 2 ? '#ffffff' : '#fff3a8'));
    } else if (m === 'planeten') {
      kreis(ox - 30, oy + 170, 70, '#ffd166');
      [[60, 6, '#b8b8b8'], [86, 10, '#e9c46a'], [116, 11, '#4f88c8'], [144, 8, '#d9693f'], [182, 24, '#e0b48c'], [226, 20, '#f2d49b']].forEach(([d, r, f], k) => kreis(ox + d, oy + 170 + (k % 2 ? -26 : 22), r, f));
      for (let k = 0; k < 40; k++) kreis(ox + ((k * 67) % PW), oy + ((k * 113) % PH), 1.4, '#ffffff');
      text('Unser Sonnensystem', mx, oy + 50, 24, '#ffffff'); text('8 Planeten · 1 Stern', mx, oy + 300, 18, '#cdeaff', false);
    } else if (m === 'sepas') {
      g.fillStyle = '#2fb8a8'; g.beginPath(); g.ellipse(mx, oy + 120, 92, 66, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(mx - 40, oy + 170); g.lineTo(mx - 64, oy + 214); g.lineTo(mx - 6, oy + 182); g.fill();
      text('Stress?', mx, oy + 112, 32, '#ffffff'); text('Sorgen?', mx, oy + 148, 26, '#ffffff');
      text('SePAS – die Tür ist offen', mx, oy + 252, 19, '#2b3a55'); text('Neben dem Sekretariat', mx, oy + 280, 17, '#2b3a55', false); text('Kanner- a Jugendtelefon 116 111', mx, oy + 316, 15, '#2f6db0');
    } else if (m === 'wasser') {
      g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(mx - 52, oy + 70); g.lineTo(mx + 52, oy + 70); g.lineTo(mx + 40, oy + 210); g.lineTo(mx - 40, oy + 210); g.closePath(); g.fill();
      g.fillStyle = '#4f88c8'; g.beginPath(); g.moveTo(mx - 46, oy + 120); g.lineTo(mx + 46, oy + 120); g.lineTo(mx + 40, oy + 210); g.lineTo(mx - 40, oy + 210); g.closePath(); g.fill();
      text('Wasser trinken', mx, oy + 262, 28, '#2b3a55'); text('hilft beim Denken', mx, oy + 296, 21, '#2f6db0', false);
    } else if (m === 'musik') {
      for (const [x, y] of [[mx - 50, oy + 150], [mx + 30, oy + 130]]) { kreis(x, y, 18, '#ffd166'); g.fillStyle = '#ffd166'; g.fillRect(x + 14, y - 90, 6, 90); }
      g.fillRect(mx - 32, oy + 44, 68, 12);
      text('Konzert', mx, oy + 238, 38, '#ffffff'); text('der Musik-AG', mx, oy + 272, 22, '#ffd166'); text('Freitag · 18 Uhr · Aula', mx, oy + 304, 18, '#e7eef0', false);
    } else if (m === 'klassenfoto') {
      g.fillStyle = '#ffffff'; g.fillRect(ox + 16, oy + 30, PW - 32, 220); g.fillStyle = '#9fd0e6'; g.fillRect(ox + 24, oy + 38, PW - 48, 204);
      const haut = ['#e8bf9a', '#c68e64', '#9b6a45', '#f1c7a2', '#8d5a3b', '#e0b48c'], oben = ['#e85d75', '#4f88c8', '#3fa66b', '#e9c46a', '#9b7bc8', '#d9693f', '#2fb8a8'];
      for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { const x = ox + 46 + k * 33 + (r % 2) * 10, y = oy + 92 + r * 52; g.fillStyle = oben[(r * 6 + k) % 7]; g.fillRect(x - 13, y + 12, 26, 30); kreis(x, y, 12, haut[(r * 5 + k) % 6]); }
      text('7P2 · 2026', mx, oy + 292, 28, '#2b3a55');
    } else if (m === 'tablett') {
      g.fillStyle = '#8d96a3'; g.fillRect(mx - 90, oy + 90, 180, 110); kreis(mx - 30, oy + 145, 34, '#ffffff'); kreis(mx + 46, oy + 130, 16, '#ffffff');
      text('Tablett zurück', mx, oy + 256, 28, '#2b3a55'); text('= Danke!', mx, oy + 292, 26, '#2b3a55');
    }
    g.lineWidth = 6; g.strokeStyle = 'rgba(0,0,0,0.12)'; g.strokeRect(ox + 3, oy + 3, PW - 6, PH - 6);
    g.restore();
  });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

// Kreide auf der Tafel (durchsichtige Leinwand)
function kreide(zeilen) {
  const c = leinwand(1024, 256), g = c.getContext('2d');
  g.fillStyle = 'rgba(245,245,235,0.88)'; g.textAlign = 'left';
  zeilen.forEach((z, i) => { g.font = (i === 0 ? '' : 'bold ') + (i === 0 ? 30 : 44) + 'px "Comic Sans MS", "Chalkboard SE", cursive, system-ui'; g.fillText(z, 40 + (i === 0 ? 0 : 20), 52 + i * 62); });
  g.strokeStyle = 'rgba(245,245,235,0.7)'; g.lineWidth = 4; g.beginPath(); g.moveTo(60, 60 + zeilen.length * 62 - 30); g.lineTo(420, 64 + zeilen.length * 62 - 32); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false });
}

// Weiches Rechteck für Kontaktschatten (dunkle Mitte, weicher Rand)
let _fleck = null;
function fleckMaterial() {
  if (_fleck) return _fleck;
  const c = leinwand(64, 64), g = c.getContext('2d');
  for (let i = 0; i < 16; i++) { const r = i * 1.9; g.fillStyle = 'rgba(20,24,36,0.075)'; g.beginPath(); g.roundRect ? g.roundRect(r, r, 64 - 2 * r, 64 - 2 * r, 14 - i * 0.7) : g.rect(r, r, 64 - 2 * r, 64 - 2 * r); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  _fleck = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  return _fleck;
}

export function baueDetails({ B, P, schilder, C, uhrTextur, extra, raeume, plaetze, DECKE }) {
  const { box } = B;
  const hex = (h) => new THREE.Color(h);
  const geo = (g, c, art = 'fest') => {
    g = g.index ? g.toNonIndexed() : g;
    if (g.attributes.uv) g.deleteAttribute('uv');
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const k = nor.getY(i) > 0.5 ? 1 : nor.getY(i) < -0.5 ? 0.86 : 0.95; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    B.teile[art].push(g);
  };
  // Ist der Platz frei? (keine Kollisionskästen, keine Möbel aus den Paketen in der Nähe)
  const frei = (x, z, r) => !B.kasten.some((k) => x + r > k.x0 && x - r < k.x1 && z + r > k.z0 && z - r < k.z1)
    && !plaetze.some((p) => Math.hypot(p.x - x, p.z - z) < r + 1.2);
  const imRaum = (x, z) => raeume.some((q) => x > q.x0 && x < q.x1 && z > q.z0 && z < q.z1);

  // ---------- Plakate ----------
  const plakatGeos = [];
  // rot: Blickrichtung der Fläche (0 = nach +z / Süden, π/2 = nach +x / Osten, −π/2 = nach −x, π = nach −z)
  const plakat = (motiv, x, y, z, rot, w = 0.72) => {
    const i = MOTIVE.indexOf(motiv), h = w * PH / PW;
    const g = new THREE.PlaneGeometry(w, h);
    const u0 = (i % 4) * PW / 1024, u1 = u0 + PW / 1024, v1 = 1 - Math.floor(i / 4) * PH / 1024, v0 = v1 - PH / 1024;
    const uv = g.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) ? u1 : u0, uv.getY(k) ? v1 : v0);
    g.rotateY(rot); g.translate(x, y, z);
    plakatGeos.push(g);
  };
  // Säle: Regeln und Klassenfoto an der Rückwand (Süd), Wissen an der Seitenwand (Ost)
  for (const [x0, x1, tuer] of [[-29.8, -16, -21], [8, 20, 14]]) {
    const ost = x1 - 0.12;
    plakat('einmaleins', ost, 1.75, -26.6, -Math.PI / 2); plakat('planeten', ost, 1.75, -24.3, -Math.PI / 2); plakat('lesen', ost, 1.75, -22, -Math.PI / 2, 0.66);
    const sued = -18.12;
    plakat('regeln', tuer - 3.2, 1.75, sued, Math.PI); plakat('klassenfoto', tuer + 2.4, 1.75, sued, Math.PI, 0.8);
  }
  // Halle: Willkommen, SePAS, Sport, Theater (Innenseite der Front, zwischen Tür und Fenstern)
  plakat('willkommen', -3.8, 1.8, -2.2, Math.PI, 0.8); plakat('sepas', 3.8, 1.8, -2.2, Math.PI, 0.8);
  // Gang: über den Spinden
  for (const x of [-25.3, -15, -4, 8.5, 19.3]) plakat(['sport', 'theater', 'musik', 'lesen', 'wasser'][[-25.3, -15, -4, 8.5, 19.3].indexOf(x)], x, 2.62, -17.88, 0, 0.5);
  for (const x of [-25.3, -16.3, 18.5]) plakat(['planeten', 'sport', 'theater'][[-25.3, -16.3, 18.5].indexOf(x)], x, 2.62, -14.12, Math.PI, 0.5);
  // Kantine: Nordwand
  plakat('wasser', 15.4, 1.8, -13.88, 0); plakat('tablett', 18.6, 1.8, -13.88, 0); plakat('sport', 21.8, 1.8, -13.88, 0);
  if (plakatGeos.length) {
    const g = mergePlakate(plakatGeos);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: plakatLeinwand(), color: hex('#ececec'), toneMapped: true }));
    m.name = 'plakate'; extra(m);
  }

  // ---------- Kreide auf den Tafeln ----------
  for (const [x0, zeilen] of [[-29.8, ['Montag', 'Komma unter Komma!', '3,5 + 1,25 = 4,75']], [8, ['Français', 'le passé composé', 'j’ai mangé · tu as vu']]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.15), kreide(zeilen));
    m.position.set(x0 + 0.175, 1.72, -23.9); m.rotation.y = Math.PI / 2; m.renderOrder = 2; extra(m);
  }

  // ---------- Wanduhren ----------
  const uhr = (x, y, z, rot, r = 0.3) => {
    const t = uhrTextur();
    const face = new THREE.Mesh(new THREE.CircleGeometry(r, 32), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
    face.position.set(x, y, z); face.rotation.y = rot; face.translateZ(0.035); extra(face);
    const ring = new THREE.CylinderGeometry(r + 0.04, r + 0.04, 0.06, 28); ring.rotateX(Math.PI / 2); ring.rotateY(rot); ring.translate(x, y, z); geo(ring, hex('#2b3a55'), 'innen');
  };
  uhr(-29.76, 2.85, -23.9, Math.PI / 2); uhr(8.14, 2.85, -23.9, Math.PI / 2);   // über den Tafeln
  uhr(8.12, 2.6, -8, Math.PI / 2, 0.36);                                      // Kantine
  uhr(0, 3.1, -2.24, Math.PI, 0.34);                                          // Halle über der Tür

  // ---------- Säle: Ranzen an den Stühlen, Hefte und Mäppchen auf den Tischen ----------
  const ranzenFarben = ['#2b3a55', '#e85d75', '#3fa66b', '#2b2b33', '#e9b949', '#4f88c8', '#9b7bc8'].map(hex);
  for (const x0 of [-29.8, 8]) {
    const z0 = -29.8;
    let n = 0;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) for (const dz of [-0.62, 0.62]) {
      const x = x0 + 5 + r * 2.1, z = z0 + 2.6 + c * 3.4 + dz; n++;
      if (n % 3 !== 1) {   // Ranzen hängt hinten am Stuhl
        const f = ranzenFarben[(n * 5) % ranzenFarben.length];
        box(x + 0.85, x + 0.99, 0.42, 0.74, z - 0.12, z + 0.12, f, { art: 'innen' });
        box(x + 0.99, x + 1.02, 0.46, 0.62, z - 0.09, z + 0.09, f.clone().multiplyScalar(0.8), { art: 'innen' });
        box(x + 0.84, x + 0.86, 0.7, 0.9, z - 0.08, z - 0.06, hex('#2b2b33'), { art: 'innen' }); box(x + 0.84, x + 0.86, 0.7, 0.9, z + 0.06, z + 0.08, hex('#2b2b33'), { art: 'innen' });
      }
      if (n % 2) box(x - 0.2, x + 0.12, 0.76, 0.775, z - 0.2, z + 0.02, [C.zettel[0], C.zettel[2], C.zettel[3], C.zettel[4]][n % 4], { art: 'innen' });   // Heft
      if (n % 4 === 0) box(x - 0.24, x - 0.18, 0.76, 0.8, z + 0.1, z + 0.32, ranzenFarben[(n * 3) % ranzenFarben.length], { art: 'innen' });   // Mäppchen
    }
    // Pult der Lehrperson: Bücherstapel und Tasse
    for (let k = 0; k < 3; k++) box(x0 + 1.8, x0 + 2.2, 0.79 + k * 0.05, 0.835 + k * 0.05, -21.5 + k * 0.02, -21.0 - k * 0.03, C.buch[(k * 3 + (x0 > 0 ? 1 : 0)) % C.buch.length], { art: 'innen' });
    { const g = new THREE.CylinderGeometry(0.045, 0.04, 0.1, 12); g.translate(x0 + 2.05, 0.84, -21.75); geo(g, hex('#e85d75'), 'innen'); }
  }

  // ---------- Kantine: Hängelampen über jedem Tisch, Tabletts mit Tellern ----------
  for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
    const x = 11.5 + r * 4.4, z = -10.6 + c * 5.2;
    for (const dz of [-0.6, 0.6]) {
      const s = new THREE.CylinderGeometry(0.14, 0.34, 0.28, 18); s.translate(x, 2.55, z + dz); geo(s, hex('#2f4f45'), 'innen');
      const top = new THREE.CylinderGeometry(0.14, 0.14, 0.02, 18); top.translate(x, 2.69, z + dz); geo(top, hex('#2f4f45'), 'innen');
      const lampe = new THREE.CircleGeometry(0.3, 18); lampe.rotateX(Math.PI / 2); lampe.translate(x, 2.4, z + dz); geo(lampe, C.licht, 'licht');
      box(x - 0.006, x + 0.006, 2.69, DECKE, z + dz - 0.006, z + dz + 0.006, hex('#2b2b33'), { art: 'innen' });
    }
    if ((r + c) % 2 === 0) for (const [dx, dz] of [[-0.25, -0.5], [0.25, 0.5]]) {
      box(x + dx - 0.17, x + dx + 0.17, 0.77, 0.79, z + dz - 0.24, z + dz + 0.24, [hex('#e9b949'), hex('#4f88c8'), hex('#e85d75')][(r + (dx > 0 ? 1 : 0)) % 3], { art: 'innen' });
      const t = new THREE.CylinderGeometry(0.12, 0.1, 0.02, 18); t.translate(x + dx, 0.8, z + dz - 0.04); geo(t, hex('#ffffff'), 'innen');
      const b = new THREE.CylinderGeometry(0.035, 0.03, 0.1, 10); b.translate(x + dx + 0.09, 0.84, z + dz + 0.15); geo(b, hex('#cdeaff'), 'innen');
    }
  }

  // ---------- Mülleimer (drinnen und draußen) ----------
  const eimer = (x, z, f = hex('#3d5a52')) => {
    if (!frei(x, z, 0.35)) return;
    const g = new THREE.CylinderGeometry(0.26, 0.22, 0.85, 14); g.translate(x, 0.43, z); geo(g, f);
    const d = new THREE.CylinderGeometry(0.28, 0.28, 0.06, 14); d.translate(x, 0.88, z); geo(d, hex('#2b2b33'));
    B.kasten.push({ x0: x - 0.28, x1: x + 0.28, z0: z - 0.28, z1: z + 0.28, y0: 0, y1: 0.9 });
  };
  for (const [x, z] of [[-3.4, -2.9], [3.4, -2.9], [9, -13.4], [-17, 11], [9, 12], [9, 24], [16, 36], [-36, 36]]) eimer(x, z);

  // ---------- Hof: Pflanzkübel mit Baum und Sitzkante, Tischtennisplatte ----------
  const blatt = [hex('#3f8f4a'), hex('#4fa556'), hex('#367d43'), hex('#5cb860')];
  // Laubbaum: Stamm, zwei Äste, Krone aus 7–9 Ballen in vier Grüntönen; s skaliert die Krone (große Linde im Innenhof)
  const baum = (x, z, h = 5.2, seed = 1) => {
    const s = Math.max(1, h / 5.6), n = s > 1.6 ? 9 : 7;
    const st = new THREE.CylinderGeometry(0.13 * s, 0.21 * s, h * 0.55, 8); st.translate(x, h * 0.275, z); geo(st, hex('#7a5638'));
    for (const q of [-1, 1]) { const a = new THREE.CylinderGeometry(0.05 * s, 0.08 * s, 1.1 * s, 6); a.rotateZ(q * 0.7); a.rotateY(seed); a.translate(x + Math.cos(seed) * q * 0.35 * s, h * 0.5, z - Math.sin(seed) * q * 0.35 * s); geo(a, hex('#6b4a30')); }
    for (let k = 0; k < n; k++) {
      const a = (k + seed) * 2.1, rr = (k === 0 ? 0 : 0.75 + ((k * 7 + seed) % 3) * 0.15) * s;
      const g = new THREE.IcosahedronGeometry((k === 0 ? 1.3 : 0.95 + ((k + seed) % 3) * 0.12) * s, 1);
      g.translate(x + Math.sin(a) * rr, h * 0.62 + (k === 0 ? 0.5 : ((k * 3 + seed) % 4) * 0.28) * s, z + Math.cos(a) * rr); geo(g, blatt[(k + seed) % blatt.length]);
    }
  };
  // Die kantigen Kegelbäume aus dem Paket durch diese Laubbäume ersetzen (gleicher Ort, Stamm bleibt fest)
  const ersetzeBaeume = () => { for (let i = plaetze.length - 1; i >= 0; i--) {
    const p = plaetze[i];
    if (!/^haus\/tree-(large|small)$/.test(p.m)) continue;
    plaetze.splice(i, 1);
    baum(p.x, p.z, (p.h || 6) * (p.m.endsWith('small') ? 1.05 : 0.85), i);
    const r = typeof p.fest === 'number' ? p.fest : 0.4;
    B.kasten.push({ x0: p.x - r, x1: p.x + r, z0: p.z - r, z1: p.z + r, y0: 0, y1: 3 });
  } };
  let nr = 0;
  for (const [x, z] of [[5, 17], [-14, 16], [24, 36.5], [-24, 36], [-26, 30], [36, 36], [-22, 2], [-30, 10]]) {
    if (!frei(x, z, 1.7) || Math.abs(x) < 4) continue;
    nr++;
    box(x - 1.3, x + 1.3, 0, 0.5, z - 1.3, z + 1.3, C.sandsteinDunkel, { stoss: true });
    box(x - 1.15, x + 1.15, 0.5, 0.54, z - 1.15, z + 1.15, C.erde);
    box(x - 1.42, x + 1.42, 0.5, 0.56, z - 1.42, z - 1.18, C.holz); box(x - 1.42, x + 1.42, 0.5, 0.56, z + 1.18, z + 1.42, C.holz);   // Sitzkante
    for (const s of [-1, 1]) for (const q of [-0.6, 0.6]) B.sitze.push({ x: x + q, z: z + s * 1.62, rot: s > 0 ? 0 : Math.PI, bank: true });
    for (let k = 0; k < 6; k++) { const g = new THREE.IcosahedronGeometry(0.22 + (k % 3) * 0.05, 0); g.translate(x - 0.8 + (k % 3) * 0.8, 0.66, z + (k < 3 ? -0.7 : 0.7)); geo(g, k % 2 ? C.gruen : hex('#2e7d4f')); }
    baum(x, z, 4.8 + (nr % 3) * 0.6, nr);
  }
  // Tischtennisplatte (Beton, wie auf vielen Schulhöfen)
  let tischtennis = null;
  for (const [x, z] of [[-20, 32], [-34, 30], [24, 34]]) {
    if (!frei(x, z, 2.2)) continue;
    tischtennis = { x, z };
    box(x - 0.9, x + 0.9, 0, 0.66, z - 0.2, z + 0.2, C.beton, { stoss: true });
    box(x - 0.76, x + 0.76, 0.66, 0.76, z - 1.37, z + 1.37, hex('#2f6b57'));
    box(x - 0.76, x + 0.76, 0.761, 0.765, z - 0.015, z + 0.015, hex('#ffffff'));
    box(x - 0.76, x + 0.76, 0.76, 0.92, z - 0.012, z + 0.012, hex('#2b2b33'));
    for (const s of [-1, 1]) { box(x - 0.76, x + 0.76, 0.761, 0.764, z + s * 1.34, z + s * 1.37, hex('#ffffff')); box(x - 0.015, x + 0.015, 0.761, 0.764, z - 1.37, z + 1.37, hex('#ffffff')); }
    B.kasten.push({ x0: x - 0.78, x1: x + 0.78, z0: z - 1.38, z1: z + 1.38, y0: 0, y1: 0.8 });
    break;
  }

  ersetzeBaeume();

  // ---------- Fassade des Haupthauses (x −30 … 30, z −30 … −2): Fensterfaschen, Schlusssteine, Lisenen, Dachgauben ----------
  {
    const HAUS_H = 8.6, dunkel = C.sandsteinDunkel, hell = C.gesims;
    for (const [z, s] of [[-2, 1], [-30, -1]]) {
      const za = Math.min(z + s * 0.16, z + s * 0.24), zb = Math.max(z + s * 0.16, z + s * 0.24);
      for (let x = -26; x <= 26.01; x += 4) {
        const tuer = s === 1 && (Math.abs(x) < 3 || (x > 17 && x < 21));
        for (const [y0, y1, eg] of [[1.0, 2.7, true], [4.7, 7.0, false]]) {
          if (eg && tuer) continue;
          box(x - 0.99, x - 0.82, y0 - 0.06, y1 + 0.02, za, zb, dunkel); box(x + 0.82, x + 0.99, y0 - 0.06, y1 + 0.02, za, zb, dunkel);
          box(x - 0.2, x + 0.2, y1 + 0.12, y1 + 0.42, Math.min(za, za + s * 0.03), Math.max(zb, zb + s * 0.03), hell);   // Schlussstein
        }
      }
      for (const x of [-29.75, -24, -16, -8, 8, 16, 24, 29.75]) {   // Lisenen (flache Wandpfeiler)
        if (s === 1 && Math.abs(x) === 8) continue;                    // neben dem Portal frei lassen
        box(x - 0.26, x + 0.26, 0.7, HAUS_H - 0.25, Math.min(z + s * 0.17, z + s * 0.3), Math.max(z + s * 0.17, z + s * 0.3), dunkel);
      }
      // Dachgauben: kleiner Kasten mit Fenster und Pyramidendach, sitzt im Dach
      for (const x of [-20, -12, 12, 20]) {
        const zf = s === 1 ? -3.6 : -28.4, zi = zf - s * 1.8, yb = 9.1;
        box(x - 0.9, x + 0.9, yb, yb + 1.7, Math.min(zf, zi), Math.max(zf, zi), C.sandstein);
        box(x - 0.55, x + 0.55, yb + 0.3, yb + 1.4, Math.min(zf, zf + s * 0.04), Math.max(zf, zf + s * 0.04), C.glas, { art: 'glas' });
        box(x - 0.62, x + 0.62, yb + 0.22, yb + 0.3, Math.min(zf, zf + s * 0.1), Math.max(zf, zf + s * 0.1), hell);
        box(x - 0.03, x + 0.03, yb + 0.3, yb + 1.4, Math.min(zf, zf + s * 0.06), Math.max(zf, zf + s * 0.06), C.rahmen);
        const d = new THREE.ConeGeometry(1.42, 0.95, 4); d.rotateY(Math.PI / 4); d.translate(x, yb + 1.7 + 0.47, (zf + zi) / 2); geo(d, C.schiefer);
      }
    }
  }

  // ---------- Weiche Kontaktschatten unter Tischen, Stühlen, Bänken, Theken ----------
  const flecken = [];
  for (const k of B.kasten) {
    const w = k.x1 - k.x0, d = k.z1 - k.z0;
    if ((k.y0 || 0) > 0.12 || k.y1 < 0.3 || k.y1 > 1.3 || w > 4.5 || d > 4.5 || w * d > 10) continue;
    const cx = (k.x0 + k.x1) / 2, cz = (k.z0 + k.z1) / 2;
    const g = new THREE.PlaneGeometry(w + 0.34, d + 0.34); g.rotateX(-Math.PI / 2); g.translate(cx, imRaum(cx, cz) ? 0.104 : 0.066, cz);
    flecken.push(g);
  }
  if (flecken.length) {
    const m = new THREE.Mesh(mergePlakate(flecken), fleckMaterial());
    m.name = 'kontaktschatten'; m.renderOrder = 1; extra(m);
  }
  return { plakate: plakatGeos.length, flecken: flecken.length, tischtennis };
}

// Ebenen mit uv zusammenlegen (Plakate, Schatten)
function mergePlakate(geos) {
  let n = 0; for (const g of geos) n += (g.index ? g.index.count : g.attributes.position.count);
  const pos = new Float32Array(n * 3), uv = new Float32Array(n * 2);
  let o = 0;
  for (let g of geos) {
    if (g.index) g = g.toNonIndexed();
    pos.set(g.attributes.position.array, o * 3); uv.set(g.attributes.uv.array, o * 2); o += g.attributes.position.count;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3)); out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.computeVertexNormals();
  return out;
}
