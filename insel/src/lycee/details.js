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
  const uhr = (x, y, z, rot, r = 0.3, name = 'wanduhr') => {   // Zeiger stellt spiel.js nach der Spielzeit (Hallenuhr: 3 Minuten nach)
    const t = uhrTextur();
    const face = new THREE.Mesh(new THREE.CircleGeometry(r, 32), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
    face.position.set(x, y, z); face.rotation.y = rot; face.translateZ(0.035); face.name = name; extra(face);
    const ring = new THREE.CylinderGeometry(r + 0.04, r + 0.04, 0.06, 28); ring.rotateX(Math.PI / 2); ring.rotateY(rot); ring.translate(x, y, z); geo(ring, hex('#2b3a55'), 'innen');
  };
  uhr(-29.76, 2.85, -23.9, Math.PI / 2); uhr(8.14, 2.85, -23.9, Math.PI / 2);   // über den Tafeln
  uhr(8.12, 2.6, -8, Math.PI / 2, 0.36);                                      // Kantine
  uhr(0, 3.1, -2.24, Math.PI, 0.34, 'wanduhr-halle');                         // Halle über der Tür (Fernands Uhr, geht nach)

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

  // ---------- Kantine: Speiseplan-Tafel hinter der Theke (mit Humor) ----------
  {
    const c = document.createElement('canvas'); c.width = 512; c.height = 384; const g = c.getContext('2d');
    g.fillStyle = '#2b3a33'; g.fillRect(0, 0, 512, 384); g.strokeStyle = '#c99a5b'; g.lineWidth = 18; g.strokeRect(9, 9, 494, 366);
    g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = '#ffe28a'; g.font = 'bold 40px system-ui, sans-serif'; g.fillText('MENÜ DER WOCHE', 40, 52);
    [['MO', 'Nudeln mit Soße'], ['DI', 'Soße mit Nudeln'], ['MI', 'Überraschung (frag nicht)'], ['DO', 'PIZZA!!! ♥'], ['FR', 'Fisch. Sorry.']].forEach(([t, w], k) => {
      g.fillStyle = '#9fe0c9'; g.font = 'bold 30px system-ui, sans-serif'; g.fillText(t, 40, 112 + k * 52);
      g.fillStyle = '#ffffff'; g.font = '28px system-ui, sans-serif'; g.fillText(w, 110, 112 + k * 52);
    });
    g.fillStyle = '#ffb3c1'; g.font = 'italic 21px system-ui, sans-serif'; g.fillText('Tablett stehen lassen = spülen. – Die Küche', 40, 350);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    const tafel = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.95), new THREE.MeshBasicMaterial({ map: t }));
    tafel.position.set(29.72, 2.0, -11.9); tafel.rotation.y = -Math.PI / 2; extra(tafel);
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
  // Laubbaum: gemalter Baum aus dem Naturpaket (natur.js, Textur-Blätter, Wind). Sorte und Drehung je Ort verschieden.
  const BAUM = ['natur/CommonTree_1', 'natur/CommonTree_3', 'natur/CommonTree_5'];
  const baum = (x, z, h = 5.2, seed = 1) => {
    plaetze.push({ m: BAUM[Math.abs(seed) % BAUM.length], x, z, rot: (seed * 2.39) % (Math.PI * 2), h: h > 8 ? h * 0.95 : h * 1.28 });
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
    for (const s of [-1, 1]) for (const q of [-0.6, 0.6]) B.sitze.push({ x: x + q, z: z + s * 1.3, rot: s > 0 ? 0 : Math.PI, bank: true, h: 0.56 });   // Sitzkante 0,5–0,56 m
    for (let k = 0; k < 6; k++) { const g = new THREE.IcosahedronGeometry(0.22 + (k % 3) * 0.05, 0); g.translate(x - 0.8 + (k % 3) * 0.8, 0.66, z + (k < 3 ? -0.7 : 0.7)); geo(g, k % 2 ? C.gruen : hex('#2e7d4f')); }
    baum(x, z, 4.8 + (nr % 3) * 0.6, nr);
  }
  // ---------- Natur rund um die Schule (natur.js): Waldgürtel, Straßenbäume, Beete an der Fassade, Gras am Rasenrand ----------
  // Feste Zufallsfolge, damit die Welt bei jedem Start gleich aussieht. Nur dort, wo nichts gebaut ist.
  { let sz = 7919; const rnd = () => { sz = (sz * 16807) % 2147483647; return sz / 2147483647; };
    const bauten = B.alle.filter((k) => k.y1 > 0.3 && (k.x1 - k.x0) * (k.z1 - k.z0) < 4000);
    const leer = (x, z, r) => !bauten.some((k) => x + r > k.x0 && x - r < k.x1 && z + r > k.z0 && z - r < k.z1)
      && !plaetze.some((q) => Math.hypot(q.x - x, q.z - z) < r + 0.6) && !imRaum(x, z)
      && !(x > -108 && x < -64 && z > -38 && z < 22)            // Sportplatz mit Laufbahn
      && !(x > -47 && x < 47 && z > -3 && z < 41)              // gepflasterter Hof
      && !(z > 39 && z < 57)                                    // Straße und Gehwege
      && !(B.frei || []).some((f) => x + r > f.x0 && x - r < f.x1 && z + r > f.z0 && z - r < f.z1);   // Wege, Lichtung, Rue du Moulin (dorf.js)
    const setze = (m, x, z, h, opt = {}) => plaetze.push({ m, x, z, rot: rnd() * Math.PI * 2, h, ...opt });
    // Waldgürtel im Norden und Osten: hinten Kiefern, davor Laubbäume – die Schule liegt am Waldrand wie viele Schulen im Ösling/Müllerthal
    const wald = [];
    for (let x = -106; x <= 106; x += 8.5) for (let z = -116; z <= -86; z += 8.5) wald.push([x + (rnd() - 0.5) * 5, z + (rnd() - 0.5) * 5]);
    for (let x = 72; x <= 106; x += 9) for (let z = -80; z <= 34; z += 9) wald.push([x + (rnd() - 0.5) * 5, z + (rnd() - 0.5) * 5]);
    for (let z = -80; z <= -44; z += 9) for (let x = -106; x <= -78; x += 9) wald.push([x + (rnd() - 0.5) * 5, z + (rnd() - 0.5) * 5]);
    for (const [x, z] of wald) {
      if (!leer(x, z, 2.2)) continue;
      const tief = z < -96 || x > 90 || x < -96;
      const m = tief ? (rnd() < 0.6 ? 'natur/Pine_5' : 'natur/Pine_1') : (rnd() < 0.4 ? 'natur/CommonTree_5' : rnd() < 0.5 ? 'natur/CommonTree_3' : 'natur/Pine_5');
      setze(m, x, z, (tief ? 9 : 8) + rnd() * 4, { fest: 0.35 });
      if (rnd() < 0.55 && leer(x + 2.4, z + 1.2, 0.8)) setze(rnd() < 0.5 ? 'natur/Bush_Common' : 'natur/Fern_1', x + 2.4, z + 1.2, 0.9 + rnd() * 0.6);
    }
    // Straßenbäume auf der Südseite (Allee), Abstand 12 m
    for (let x = -96; x <= 96; x += 12) if (Math.abs(x - 0) > 8 && leer(x, 57.6, 1.2)) setze(BAUM[(x / 12 + 20) % 3 | 0], x, 57.6, 7 + rnd() * 1.5, { fest: 0.3 });
    // Beete an der Hof-Fassade: Bordstein, Erde, Büsche mit Blüten im Wechsel
    for (const [a0, a1] of [[-27.4, -3.2], [3.2, 16.8], [21.6, 27.4]]) {
      box(a0, a1, 0, 0.32, -1.75, -0.95, C.sandsteinDunkel, { stoss: true }); box(a0 + 0.08, a1 - 0.08, 0.32, 0.35, -1.67, -1.03, C.erde);
      for (let x = a0 + 0.9; x < a1 - 0.6; x += 1.7) plaetze.push({ m: (Math.round(x * 3) % 2) ? 'natur/Bush_Common_Flowers' : 'natur/Bush_Common', x, z: -1.35, rot: rnd() * 6.28, h: 0.85 + rnd() * 0.25, y: 0.3 });
    }
    // Rasenrand: Grasbüschel, Klee, Blumen – locker gestreut, nie auf Wegen
    const tuffs = ['natur/Grass_Common_Short', 'natur/Grass_Wispy_Tall', 'natur/Clover_1', 'natur/Flower_3_Group', 'natur/Flower_4_Group', 'natur/Grass_Common_Short'];
    for (let i = 0; i < 420; i++) {
      const x = -108 + rnd() * 216, z = -84 + rnd() * 160;
      if (!(x < -47 || x > 47 || z < -76 || z > 57) || !leer(x, z, 0.5)) continue;   // nur auf Rasen außen herum
      const m = tuffs[(rnd() * tuffs.length) | 0];
      setze(m, x, z, /Flower/.test(m) ? 0.55 + rnd() * 0.3 : 0.4 + rnd() * 0.35);
    }
    // ein paar Findlinge und Pilze am Waldrand
    for (let i = 0; i < 14; i++) { const x = -100 + rnd() * 200, z = -84 + rnd() * 6; if (leer(x, z, 1.4)) setze(rnd() < 0.5 ? 'natur/Rock_Medium_1' : 'natur/Rock_Medium_3', x, z, 0.8 + rnd() * 0.9, { fest: true }); }
    for (let i = 0; i < 18; i++) { const x = -100 + rnd() * 200, z = -86 - rnd() * 20; if (leer(x, z, 0.4)) setze('natur/Mushroom_Common', x, z, 0.22 + rnd() * 0.12); }
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

  // ---------- Hof lebendiger (Qualitätsrunde): Kreide-Hüpfspiel, Fahrradständer mit Rädern, Kreide-Sonne ----------
  {
    const kreideFarben = ['#f4f1e8', '#f7c6d0', '#bfe3f2', '#fff0a8', '#c8ecc4'];
    // Himmel und Hölle: 1 – 2|3 – 4 – 5|6 – 7 – Himmel (Halbkreis aus Feldern)
    for (const [x0, z0] of [[-15, 23], [6, 24], [-3, 30]]) {
      if (!frei(x0, z0 + 2, 1.6) || Math.hypot(x0 + 8, z0 + 2 - 18) < 5.5) continue;   // nicht unter den Brunnen (−8, 18)
      const feld = (x, z, f) => { box(x - 0.29, x + 0.29, 0.065, 0.069, z - 0.29, z + 0.29, hex(kreideFarben[f % kreideFarben.length])); };
      const reihen = [[0], [-0.31, 0.31], [0], [-0.31, 0.31], [0], [0]];
      reihen.forEach((r, i) => r.forEach((dx, j) => feld(x0 + dx, z0 + i * 0.62, i + j)));
      const h = new THREE.CircleGeometry(0.42, 12, 0, Math.PI); h.rotateX(-Math.PI / 2); h.translate(x0, 0.069, z0 + 6 * 0.62 - 0.28); geo(h, hex('#fff0a8'));
      break;
    }
    // Kreide-Sonne mit Strahlen (jemand hat gemalt)
    for (const [x, z] of [[-4, 27], [12, 26], [-16, 26]]) {
      if (!frei(x, z, 1.3)) continue;
      const c = new THREE.CircleGeometry(0.55, 14); c.rotateX(-Math.PI / 2); c.translate(x, 0.068, z); geo(c, hex('#ffe27a'));
      for (let k = 0; k < 10; k++) { const w = (k / 10) * Math.PI * 2, g = new THREE.BoxGeometry(0.42, 0.004, 0.07); g.rotateY(-w); g.translate(x + Math.cos(w) * 0.85, 0.068, z + Math.sin(w) * 0.85); geo(g, hex('#ffd04a')); }
      break;
    }
    // Fahrradständer mit drei Rädern (Rahmen, Reifen, Lenker) neben dem Eingang
    for (const [x0, z0] of [[8.5, 5.5], [-12, 5.5], [14, 8]]) {
      if (!frei(x0 + 1.5, z0, 2.2)) continue;
      box(x0 - 0.2, x0 + 3.4, 0.06, 0.1, z0 - 0.03, z0 + 0.03, C.beton);
      for (let i = 0; i < 6; i++) { const t = new THREE.TorusGeometry(0.28, 0.02, 4, 12, Math.PI); t.rotateY(Math.PI / 2); t.translate(x0 + i * 0.62, 0.05, z0); geo(t, hex('#9aa3ad')); }
      const farben = ['#d9693f', '#3f78b8', '#2fb8a8'];
      [0, 1, 3].forEach((i, n) => {
        const x = x0 + i * 0.62, f = hex(farben[n]);
        for (const dz of [-0.48, 0.48]) { const r = new THREE.TorusGeometry(0.31, 0.035, 6, 16); r.rotateY(Math.PI / 2); r.translate(x, 0.34, z0 + dz); geo(r, hex('#2b2b33')); }
        const rahmen = (z1, y1, z2, y2) => { const l = Math.hypot(z2 - z1, y2 - y1), g = new THREE.BoxGeometry(0.04, 0.04, l); g.rotateX(-Math.atan2(y2 - y1, z2 - z1)); g.translate(x, (y1 + y2) / 2, (z1 + z2) / 2); geo(g, f); };
        rahmen(z0 - 0.48, 0.34, z0 + 0.05, 0.62); rahmen(z0 + 0.05, 0.62, z0 + 0.48, 0.34); rahmen(z0 - 0.48, 0.34, z0, 0.34); rahmen(z0 + 0.4, 0.66, z0 + 0.48, 0.34);
        box(x - 0.05, x + 0.05, 0.66, 0.7, z0 - 0.1, z0 + 0.05, hex('#2b2b33'));
        box(x - 0.22, x + 0.22, 0.78, 0.81, z0 + 0.38, z0 + 0.42, hex('#2b2b33'));
      });
      B.kasten.push({ x0: x0 - 0.3, x1: x0 + 3.5, z0: z0 - 0.6, z1: z0 + 0.6, y0: 0, y1: 0.9 });
      break;
    }
  }

  // ---------- Basketballplatz mit echten Markierungen (Mittelkreis, Zonen, Dreierlinie) ----------
  {
    const weiss = hex('#ffffff'), zone = hex('#2f6db0'), y = 0.102;
    const flach = (g, f) => { g.rotateX(-Math.PI / 2); g.translate(0, y, 0); return g; };
    const ring = (x, z, r, start = 0, len = Math.PI * 2) => { const g = flach(new THREE.RingGeometry(r - 0.06, r + 0.06, 40, 1, start, len)); g.translate(x, 0, z); geo(g, weiss); };
    for (const [z0, dir] of [[8.12, 1], [29.88, -1]]) {
      const zk = z0 + dir * 5.8;
      box(26.6, 31.4, y - 0.004, y - 0.001, Math.min(z0, zk), Math.max(z0, zk), zone);   // Zone (blau)
      for (const [a0, a1, b0, b1] of [[26.6, 26.7, Math.min(z0, zk), Math.max(z0, zk)], [31.3, 31.4, Math.min(z0, zk), Math.max(z0, zk)], [26.6, 31.4, zk - 0.05, zk + 0.05]]) box(a0, a1, y, y + 0.002, b0, b1, weiss);
      ring(29, zk, 1.8);
      ring(29, z0, 6.75, dir > 0 ? Math.PI : 0, Math.PI);   // Dreierlinie
    }
    ring(29, 19, 1.8);
    const punkt = flach(new THREE.CircleGeometry(0.5, 24)); punkt.translate(29, 0.001, 19); geo(punkt, hex('#f2b134'));
  }

  // ---------- Mehr Farbe auf dem Hof: Wimpelketten zwischen Masten, Twister-Punkte, Pfütze ----------
  {
    const FARBEN = ['#e85d75', '#f2b134', '#2fb8a8', '#5fa0d0', '#8a7bc8', '#3fa66b', '#e9734a'];
    const mast = (x, z, h) => { const g = new THREE.CylinderGeometry(0.06, 0.07, h, 8); g.translate(x, h / 2, z); geo(g, hex('#6f7a86')); B.kasten.push({ x0: x - 0.1, x1: x + 0.1, z0: z - 0.1, z1: z + 0.1, y0: 0, y1: h }); };
    const kette = (a, b, h, n) => {
      for (let i = 0; i < n; i++) {
        const t0 = i / n, t1 = (i + 0.7) / n;
        const p = (t) => [a[0] + (b[0] - a[0]) * t, h - Math.sin(Math.PI * t) * 0.9, a[1] + (b[1] - a[1]) * t];
        const [x0, y0, z0] = p(t0), [x1, y1, z1] = p(t1), xm = (x0 + x1) / 2, zm = (z0 + z1) / 2, ym = (y0 + y1) / 2 - 0.42;
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([x0, y0, z0, x1, y1, z1, xm, ym, zm, x1, y1, z1, x0, y0, z0, xm, ym, zm], 3)); g.computeVertexNormals();
        geo(g, hex(FARBEN[i % FARBEN.length]));
      }
      // die Schnur
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]), seg = 16;
      for (let i = 0; i < seg; i++) { const t = (i + 0.5) / seg, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t, y = h - Math.sin(Math.PI * t) * 0.9; const g = new THREE.BoxGeometry(l / seg + 0.05, 0.02, 0.02); g.rotateY(-Math.atan2(b[1] - a[1], b[0] - a[0])); g.translate(x, y, z); geo(g, hex('#f4f1e8')); }
    };
    const masten = [[-24, 14], [-6, 16.5], [12, 14], [-6, 32.5]];
    for (const [x, z] of masten) if (frei(x, z, 0.6)) mast(x, z, 5.6);
    kette([-24, 14], [-6, 16.5], 5.5, 16); kette([-6, 16.5], [12, 14], 5.5, 16); kette([-6, 16.5], [-6, 32.5], 5.5, 14);
    // Twister-Punkte (vier Reihen Farbe) – jemand hat sie auf den Hof gemalt
    for (const [x0, z0] of [[14, 30], [-28, 30], [2, 30]]) {
      if (!frei(x0 + 1.5, z0 + 1.2, 2)) continue;
      ['#e85d75', '#f2b134', '#3fa66b', '#5fa0d0'].forEach((f, r) => { for (let c = 0; c < 5; c++) { const g = new THREE.CircleGeometry(0.26, 16); g.rotateX(-Math.PI / 2); g.translate(x0 + c * 0.75, 0.066, z0 + r * 0.75); geo(g, hex(f)); } });
      break;
    }
    // Pfütze nach dem Regen (hellblau, leicht glänzend)
    const pf = new THREE.CircleGeometry(1, 20); pf.scale(1.3, 1, 0.8); pf.rotateX(-Math.PI / 2); pf.translate(-16, 0.064, 34); geo(pf, hex('#a9c8dc'));
  }

  // ---------- Fassade mit Charakter: Blumenkästen, Kübel am Eingang, Willkommens-Banner in drei Sprachen ----------
  {
    const BLUMEN = ['#e85d75', '#f2b134', '#ffffff', '#8a7bc8', '#e9734a'];
    let n = 0;
    for (let x = -26; x <= 26.01; x += 4) {
      if (Math.abs(x) < 3 || (n++ % 3 === 1)) continue;
      box(x - 0.75, x + 0.75, 4.72, 4.98, -1.7, -1.42, hex('#8a5a3a'));
      for (let i = 0; i < 7; i++) { const g = new THREE.IcosahedronGeometry(0.11 + (i % 2) * 0.03, 0); g.translate(x - 0.6 + i * 0.2, 5.05 + (i % 3) * 0.04, -1.56); geo(g, i % 2 ? hex('#3f8f4f') : hex(BLUMEN[(i + n) % BLUMEN.length])); }
    }
    for (const sx of [-3.4, 3.4]) {
      const k = new THREE.CylinderGeometry(0.42, 0.32, 0.7, 12); k.translate(sx, 0.4, -1.2); geo(k, hex('#c46a3c'));
      for (let i = 0; i < 6; i++) { const g = new THREE.IcosahedronGeometry(0.28, 0); g.translate(sx + Math.cos(i) * 0.18, 0.95 + (i % 3) * 0.18, -1.2 + Math.sin(i) * 0.18); geo(g, hex(i % 2 ? '#2e7d4f' : '#3fa66b')); }
      B.kasten.push({ x0: sx - 0.45, x1: sx + 0.45, z0: -1.65, z1: -0.75, y0: 0, y1: 1.3 });
    }
    // Banner über dem Eingang
    const c = document.createElement('canvas'); c.width = 1024; c.height = 160; const g2 = c.getContext('2d');
    g2.fillStyle = '#2fb8a8'; g2.fillRect(0, 0, 1024, 160); g2.fillStyle = '#f2b134'; for (let i = 0; i < 1024; i += 64) { g2.beginPath(); g2.moveTo(i, 160); g2.lineTo(i + 32, 130); g2.lineTo(i + 64, 160); g2.fill(); }
    g2.fillStyle = '#ffffff'; g2.textAlign = 'center'; g2.textBaseline = 'middle'; { const tx = 'Wëllkomm · Bienvenue · Willkommen'; let fs = 74; do { g2.font = 'bold ' + fs + 'px system-ui, sans-serif'; fs -= 2; } while (fs > 30 && g2.measureText(tx).width > 960); g2.fillText(tx, 512, 66); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(9, 1.4), new THREE.MeshBasicMaterial({ map: t }));
    banner.position.set(0, 7.75, -1.62); extra(banner);
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
