// Karte zeichnen (WP42, DESIGN §17 · Stil-Bibel §11.6): gemaltes Pergament statt Pixelraster. Papier #F3E6C9 mit Tintenlinien,
// Meer als blasse Lasur mit Wellenstrichen, Zonen als weiche Farbflächen (Höhenfunktion, niedrig aufgelöst und weich skaliert),
// Küste als Tuschelinie, Schleier grau-lila, Nebelkacheln (unentdeckt) als Wolkenschraffur, gesperrte Teaser mit
// Fähigkeitssymbol, Marker (Spielfigur, Hauptziel, Signalfeuer, Aussichtspunkte, Baumhaus).
// Reine Canvas-Logik; Icons kommen als SVG-Bilder (asynchron, dann Neuzeichnen). ctx.revealed === null → kein Nebel.
import { icon as svgIcon } from '../icons.js';

export const MAP_N = 24;           // Nebelkacheln je Achse
export const MAP_R = 190;          // halbe Kartenweite in Metern
export const ABILITY_ICON = { blick: 'blick', teamgeist: 'team', schwimmen: 'schwimmen', klettern: 'klettern', segel: 'segel', tauchen: 'tauchen', ruhe: 'ruhe', mut: 'mut' };
// Fähigkeit, die ein Gebiet öffnet (Rückfall, wenn keine RegionDef ein Tor nennt)
export const REGION_NEEDS = { strand: 'teamgeist', dschungel: 'klettern', klippen: 'segel', moor: 'ruhe', markt: 'mut', vulkan: 'mut', glimmer: 'segel', quellen: 'ruhe', leuchtturm: 'teamgeist' };
export const REGION_CENTER = { glimmer: { x: 20, z: -118 }, quellen: { x: 47, z: -23 } };

// Palette der Karte (Tinte und Papier, §2.1 / §11.6)
const PAPER = '#f3e6c9', PAPER_DARK = '#e6d5b2', INK = '#2c1f44', INK_SOFT = 'rgba(44,31,68,0.55)';
const SEA = '#cfdfd8', SEA_DEEP = '#b9cfcc', SHALLOW = '#e2e6cf';
const FONT = '"Nunito", ui-rounded, "SF Pro Rounded", "Segoe UI", system-ui, sans-serif';

const hasDOM = typeof document !== 'undefined';
const IMG = new Map();
export function iconImg(name, color, onLoad) {
  if (!hasDOM) return null;
  const key = name + '|' + color;
  if (IMG.has(key)) return IMG.get(key);
  const svg = svgIcon(name, { size: 64 }).replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" style="color:${color}" `);
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  img.addEventListener('load', () => { if (onLoad) onLoad(); }, { once: true });
  IMG.set(key, img);
  return img;
}
export const tileOf = (x, z, N = MAP_N, R = MAP_R) => {
  const ix = Math.floor((x + R) / (2 * R) * N), iz = Math.floor((z + R) / (2 * R) * N);
  if (ix < 0 || iz < 0 || ix >= N || iz >= N) return -1;
  return iz * N + ix;
};
export const tilesInRadius = (x, z, r, N = MAP_N, R = MAP_R) => {
  const out = [];
  const size = (2 * R) / N;
  for (let iz = 0; iz < N; iz++) for (let ix = 0; ix < N; ix++) {
    const cx = -R + (ix + 0.5) * size, cz = -R + (iz + 0.5) * size;
    if (Math.hypot(cx - x, cz - z) <= r + size * 0.35) out.push(iz * N + ix);
  }
  return out;
};

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const clamp255 = (v) => Math.max(0, Math.min(255, Math.round(v)));
// Zonenfarbe als Lasur auf Papier: entsättigt und aufgehellt, Schleier dreht nach grau-lila, Höhe hellt leicht auf
function washColor(zoneHex, veil, h) {
  const [r, g, b] = hex(zoneHex);
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const s = 0.62;                                  // Sättigung der Lasur
  let R = l + (r - l) * s, G = l + (g - l) * s, B = l + (b - l) * s;
  const paper = [243, 230, 201];
  const k = 0.3 + Math.min(0.22, Math.max(0, h) / 140);   // Anteil Papier (Höhe → heller)
  R = R * (1 - k) + paper[0] * k; G = G * (1 - k) + paper[1] * k; B = B * (1 - k) + paper[2] * k;
  const v = Math.min(1, Math.max(0, veil)) * 0.85;
  const grey = [0.3 * R + 0.59 * G + 0.11 * B];
  const lilac = [grey[0] * 0.82 + 40, grey[0] * 0.78 + 36, grey[0] * 0.9 + 44];   // Duotone-Schleier
  return [clamp255(R * (1 - v) + lilac[0] * v), clamp255(G * (1 - v) + lilac[1] * v), clamp255(B * (1 - v) + lilac[2] * v)];
}
// deterministische Zufallszahlen für Papierfasern und Wellen
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function paper(g, W, H) {
  g.fillStyle = PAPER; g.fillRect(0, 0, W, H);
  // weiche Flecken
  const r = rng(7);
  for (let i = 0; i < 14; i++) {
    const x = r() * W, y = r() * H, rad = 40 + r() * 120;
    const grad = g.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, `rgba(190,150,100,${0.05 + r() * 0.06})`); grad.addColorStop(1, 'rgba(190,150,100,0)');
    g.fillStyle = grad; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  // Fasern
  g.fillStyle = 'rgba(120,90,50,0.08)';
  for (let i = 0; i < 520; i++) { const x = r() * W, y = r() * H, s = 0.4 + r() * 1.1; g.fillRect(x, y, s * 2.2, s); }
  // Randabdunklung
  const v = g.createRadialGradient(W / 2, H / 2, W * 0.35, W / 2, H / 2, W * 0.78);
  v.addColorStop(0, 'rgba(120,80,40,0)'); v.addColorStop(1, 'rgba(120,80,40,0.22)');
  g.fillStyle = v; g.fillRect(0, 0, W, H);
}

// ctx = { island, veil, revealed:Set|null, player:{x,z,yaw}, target, fires:[{x,z,lit,name}], viewpoints:[{x,z,found}],
//         teasers:[{region,x,z,ability,name,open}], counts:{zone:{found,total}}, baumhaus:{x,z}, zoneNames, zoneColors, redraw }
export function drawMap(cv, ctx) {
  const g = cv.getContext('2d');
  const W = cv.width, H = cv.height, R = MAP_R, N = MAP_N;
  const px = (x) => (x + R) / (2 * R) * W, py = (z) => (z + R) / (2 * R) * H;
  const { island, veil } = ctx;
  paper(g, W, H);

  // ---- Meer und Land als weiche Lasur: niedrig aufgelöst zeichnen, weich hochskalieren ----
  const G = 96;
  const off = document.createElement('canvas'); off.width = off.height = G;
  const og = off.getContext('2d');
  const id = og.createImageData(G, G);
  const d = id.data;
  const zoneCol = {}; for (const z of island.ZONES) zoneCol[z.id] = z.color;
  const land = new Uint8Array(G * G);
  for (let iy = 0; iy < G; iy++) for (let ix = 0; ix < G; ix++) {
    const x = (ix + 0.5) / G * 2 * R - R, z = (iy + 0.5) / G * 2 * R - R;
    const h = island.getHeight(x, z);
    const o = (iy * G + ix) * 4;
    let c;
    if (h <= 0.05) { c = h > -1.4 ? hex(SHALLOW) : h > -6 ? hex(SEA) : hex(SEA_DEEP); }
    else {
      land[iy * G + ix] = 1;
      const zid = island.zoneAt(x, z);
      const base = zid ? zoneCol[zid] : (h > 18 ? '#9a8c86' : '#86b86a');
      c = washColor(base, veil ? veil.amountAt(x, z) : 0, h);
    }
    d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255;
  }
  og.putImageData(id, 0, 0);
  g.save();
  g.globalAlpha = 0.92;
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(off, 0, 0, G, G, 0, 0, W, H);
  g.restore();
  // Wellenstriche im Meer
  {
    const r = rng(11);
    g.strokeStyle = 'rgba(44,31,68,0.16)'; g.lineWidth = 1.2; g.lineCap = 'round';
    for (let i = 0; i < 110; i++) {
      const ix = Math.floor(r() * G), iy = Math.floor(r() * G);
      if (land[iy * G + ix]) continue;
      const x = (ix + 0.5) / G * W, y = (iy + 0.5) / G * H, w = 8 + r() * 10;
      g.beginPath(); g.moveTo(x - w, y); g.quadraticCurveTo(x - w / 2, y - 3, x, y); g.quadraticCurveTo(x + w / 2, y + 3, x + w, y); g.stroke();
    }
  }
  // Küste als Tuschelinie (Kanten der Landmaske, feiner abgetastet)
  {
    const K = 192, cell = W / K;
    const mask = new Uint8Array(K * K);
    for (let iy = 0; iy < K; iy++) for (let ix = 0; ix < K; ix++) {
      const x = (ix + 0.5) / K * 2 * R - R, z = (iy + 0.5) / K * 2 * R - R;
      mask[iy * K + ix] = island.getHeight(x, z) > 0.05 ? 1 : 0;
    }
    g.fillStyle = 'rgba(44,31,68,0.62)';
    for (let iy = 0; iy < K; iy++) for (let ix = 0; ix < K; ix++) {
      if (!mask[iy * K + ix]) continue;
      const edge = (ix > 0 && !mask[iy * K + ix - 1]) || (ix < K - 1 && !mask[iy * K + ix + 1]) || (iy > 0 && !mask[(iy - 1) * K + ix]) || (iy < K - 1 && !mask[(iy + 1) * K + ix]);
      if (!edge) continue;
      g.beginPath(); g.arc((ix + 0.5) * cell, (iy + 0.5) * cell, cell * 0.55, 0, Math.PI * 2); g.fill();
    }
  }

  // ---- Nebelkacheln: unentdeckt = Papierwolken mit Schraffur, Rand entdeckter Kacheln halb ----
  const ts = W / N;
  const rev = ctx.revealed === null ? null : (ctx.revealed || new Set());
  const near = (i) => { if (!rev) return true; const ix = i % N, iz = Math.floor(i / N); for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { const jx = ix + dx, jz = iz + dz; if (jx < 0 || jz < 0 || jx >= N || jz >= N) continue; if (rev.has(jz * N + jx)) return true; } return false; };
  const isRev = (i) => !rev || rev.has(i);
  if (rev) {
    // Wolken auf eine eigene Ebene malen (deckend, damit Überlappungen kein Gitter bilden) und einmal halbdurchsichtig auflegen
    const fog = document.createElement('canvas'); fog.width = W; fog.height = H;
    const f = fog.getContext('2d');
    const cloud = (rad, style) => {
      f.fillStyle = style;
      for (let i = 0; i < N * N; i++) {
        if (rev.has(i)) continue;
        const ix = i % N, iz = Math.floor(i / N);
        f.beginPath(); f.arc((ix + 0.5) * ts, (iz + 0.5) * ts, rad, 0, Math.PI * 2); f.fill();
      }
    };
    cloud(ts * 0.88, 'rgba(120,100,140,0.4)');   // weicher Rand um die Wolkenfläche
    cloud(ts * 0.8, PAPER_DARK);
    // Schraffur und Wolkenbögen, beschnitten auf die Wolken
    f.save();
    f.beginPath();
    for (let i = 0; i < N * N; i++) { if (rev.has(i)) continue; const ix = i % N, iz = Math.floor(i / N); f.moveTo((ix + 0.5) * ts + ts * 0.8, (iz + 0.5) * ts); f.arc((ix + 0.5) * ts, (iz + 0.5) * ts, ts * 0.8, 0, Math.PI * 2); }
    f.clip();
    f.strokeStyle = 'rgba(90,70,110,0.12)'; f.lineWidth = 1;
    for (let x = -H; x < W; x += 16) { f.beginPath(); f.moveTo(x, 0); f.lineTo(x + H, H); f.stroke(); }
    f.strokeStyle = 'rgba(90,70,110,0.3)'; f.lineWidth = 1.2;
    for (let i = 0; i < N * N; i++) {
      if (rev.has(i)) continue;
      const ix = i % N, iz = Math.floor(i / N);
      if ((ix * 7 + iz * 3) % 5) continue;
      const x = (ix + 0.5) * ts, y = (iz + 0.5) * ts;
      f.beginPath(); f.arc(x - 5, y + 2, 5, Math.PI, 0); f.arc(x + 4, y + 2, 6, Math.PI, 0); f.stroke();
    }
    f.restore();
    g.save(); g.globalAlpha = 0.84; g.drawImage(fog, 0, 0); g.restore();
  }

  // ---- Tintenrahmen ----
  g.strokeStyle = INK_SOFT; g.lineWidth = 1.5; g.strokeRect(9.5, 9.5, W - 19, H - 19);
  g.strokeStyle = 'rgba(44,31,68,0.3)'; g.lineWidth = 1; g.strokeRect(14.5, 14.5, W - 29, H - 29);
  // Windrose oben rechts
  {
    const cx = W - 44, cy = 44;
    g.save(); g.translate(cx, cy);
    g.fillStyle = 'rgba(243,230,201,0.75)'; g.beginPath(); g.arc(0, 0, 22, 0, Math.PI * 2); g.fill();
    g.strokeStyle = INK_SOFT; g.lineWidth = 1; g.beginPath(); g.arc(0, 0, 22, 0, Math.PI * 2); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.moveTo(0, -18); g.lineTo(4, 0); g.lineTo(-4, 0); g.closePath(); g.fill();
    g.fillStyle = 'rgba(44,31,68,0.35)'; g.beginPath(); g.moveTo(0, 18); g.lineTo(4, 0); g.lineTo(-4, 0); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(-18, 0); g.lineTo(0, 3); g.lineTo(0, -3); g.closePath(); g.fill(); g.beginPath(); g.moveTo(18, 0); g.lineTo(0, 3); g.lineTo(0, -3); g.closePath(); g.fill();
    g.fillStyle = INK; g.font = `900 9px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('N', 0, -27);
    g.restore();
  }

  // ---- Zonennamen und Sammelzähler ----
  g.textAlign = 'center'; g.textBaseline = 'middle';
  const label = (text, X, Y, size, weight, color) => {
    g.font = `${weight} ${size}px ${FONT}`;
    g.lineWidth = 4; g.lineJoin = 'round'; g.strokeStyle = 'rgba(243,230,201,0.85)'; g.strokeText(text, X, Y);
    g.fillStyle = color; g.fillText(text, X, Y);
  };
  for (const z of island.ZONES) {
    const t = tileOf(z.x, z.z, N, R);
    const known = isRev(t) || near(t);
    const teaser = (ctx.teasers || []).find((tz) => tz.region === z.id);
    const veiled = veil && veil.isVeiled && veil.isVeiled(z.id);
    const X = px(z.x), Y = py(z.z);
    const name = known || (teaser && !teaser.open) ? (ctx.zoneNames && ctx.zoneNames[z.id]) || z.name : '?';
    label(name, X, Y, 15, 800, known ? (veiled ? '#5a5070' : INK) : 'rgba(44,31,68,0.55)');
    const c = ctx.counts && ctx.counts[z.id];
    if (known && c && c.total) label(`${c.found}/${c.total}`, X, Y + 17, 12, 800, c.found >= c.total ? '#8a6a10' : 'rgba(44,31,68,0.7)');
    else if (known && veiled) label('Grauschleier', X, Y + 17, 11, 800, '#6a6080');
  }
  // Teaser: gesperrte Gebiete mit Schloss und Fähigkeitssymbol
  for (const tz of ctx.teasers || []) {
    if (tz.open) continue;
    const X = px(tz.x), Y = py(tz.z) - 30;
    g.beginPath(); g.arc(X, Y, 16, 0, Math.PI * 2); g.fillStyle = 'rgba(44,31,68,0.88)'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = '#ffd166'; g.stroke();
    const im = iconImg(ABILITY_ICON[tz.ability] || 'schloss', '#ffd166', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 11, Y - 11, 22, 22);
    const lk = iconImg('schloss', '#f3e6c9', ctx.redraw);
    if (lk && lk.complete && lk.naturalWidth) g.drawImage(lk, X + 8, Y - 20, 14, 14);
  }
  // Signalfeuer
  for (const f of ctx.fires || []) {
    const t = tileOf(f.x, f.z, N, R);
    if (!isRev(t) && !near(t)) continue;
    const X = px(f.x), Y = py(f.z);
    g.beginPath(); g.arc(X, Y, 8, 0, Math.PI * 2); g.fillStyle = f.lit ? '#ff8c42' : 'rgba(90,80,100,0.9)'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = f.lit ? '#fff3a0' : INK_SOFT; g.stroke();
    const im = iconImg('feuer', f.lit ? '#2c1f44' : '#d8d0e0', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 5, Y - 5, 10, 10);
  }
  // Farbmarken (Noors Wegfähigkeit, Bindung 2): offene Lichtsplitter und Muscheln in entdeckten Kacheln
  for (const m of ctx.marks || []) {
    const t = tileOf(m.x, m.z, N, R);
    if (!isRev(t)) continue;
    const X = px(m.x), Y = py(m.z);
    g.beginPath(); g.arc(X, Y, m.type === 'muschel' ? 3.6 : 2.8, 0, Math.PI * 2);
    g.fillStyle = m.type === 'muschel' ? '#ff9ad0' : '#ffd166'; g.fill(); g.lineWidth = 1; g.strokeStyle = 'rgba(44,31,68,0.8)'; g.stroke();
  }
  // Aussichtspunkte (gefunden)
  for (const v of ctx.viewpoints || []) {
    if (!v.found) continue;
    const X = px(v.x), Y = py(v.z);
    g.beginPath(); g.arc(X, Y, 7, 0, Math.PI * 2); g.fillStyle = '#2de2c9'; g.fill(); g.lineWidth = 1; g.strokeStyle = INK_SOFT; g.stroke();
    const im = iconImg('augen', '#14102a', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 5, Y - 5, 10, 10);
  }
  // Baumhaus
  if (ctx.baumhaus) { const X = px(ctx.baumhaus.x), Y = py(ctx.baumhaus.z); g.beginPath(); g.arc(X, Y, 9, 0, Math.PI * 2); g.fillStyle = '#ffb347'; g.fill(); g.lineWidth = 1; g.strokeStyle = INK_SOFT; g.stroke(); const im = iconImg('haengematte', '#14102a', ctx.redraw); if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 6, Y - 6, 12, 12); }
  // Hauptziel
  if (ctx.target) {
    const X = px(ctx.target.x), Y = py(ctx.target.z);
    g.save(); g.translate(X, Y); g.rotate(Math.PI / 4);
    g.fillStyle = ctx.target.color || '#ffd166'; g.fillRect(-8, -8, 16, 16); g.lineWidth = 1.5; g.strokeStyle = INK; g.strokeRect(-8, -8, 16, 16);
    g.restore();
  }
  // Spielfigur
  if (ctx.player) {
    const X = px(ctx.player.x), Y = py(ctx.player.z);
    g.beginPath(); g.arc(X, Y, 12, 0, Math.PI * 2); g.fillStyle = 'rgba(255,209,102,0.35)'; g.fill();
    g.save(); g.translate(X, Y); g.rotate(-(ctx.player.yaw || 0) + Math.PI);
    g.beginPath(); g.moveTo(0, -9); g.lineTo(6, 6); g.lineTo(0, 3); g.lineTo(-6, 6); g.closePath();
    g.fillStyle = '#ffd166'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = INK; g.stroke();
    g.restore();
  }
}
