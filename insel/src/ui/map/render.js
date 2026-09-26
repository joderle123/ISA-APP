// Karte zeichnen (WP42, DESIGN §17): Insel aus der Höhenfunktion, Zonenfarben, Schleier grau, Nebelkacheln (unentdeckt =
// dunkel), gesperrte Teaser mit Fähigkeitssymbol, Marker (Spielfigur, Hauptziel, Signalfeuer, Aussichtspunkte, Baumhaus).
// Reine Canvas-Logik; Icons kommen als SVG-Bilder (asynchron, dann Neuzeichnen).
import { icon as svgIcon } from '../icons.js';

export const MAP_N = 24;           // Nebelkacheln je Achse
export const MAP_R = 190;          // halbe Kartenweite in Metern
export const ABILITY_ICON = { blick: 'blick', teamgeist: 'team', schwimmen: 'schwimmen', klettern: 'klettern', segel: 'segel', tauchen: 'tauchen', ruhe: 'ruhe', mut: 'mut' };
// Fähigkeit, die ein Gebiet öffnet (Rückfall, wenn keine RegionDef ein Tor nennt)
export const REGION_NEEDS = { strand: 'teamgeist', dschungel: 'klettern', klippen: 'segel', moor: 'ruhe', markt: 'mut', vulkan: 'mut', glimmer: 'segel', quellen: 'ruhe', leuchtturm: 'teamgeist' };
export const REGION_CENTER = { glimmer: { x: 20, z: -118 }, quellen: { x: 47, z: -23 } };

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

function mixGrey(hex, v, h) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const k = Math.min(1, Math.max(0, v)) * 0.85;
  const light = 1 + Math.min(0.25, h / 120);
  const m = (c) => Math.max(0, Math.min(255, Math.round(((c * (1 - k) + (l * 0.75 + 40) * k)) * light)));
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}

// ctx = { island, veil, revealed:Set, player:{x,z,yaw}, target, fires:[{x,z,lit,name}], viewpoints:[{x,z,found}],
//         teasers:[{region,x,z,ability,name,open}], counts:{zone:{found,total}}, baumhaus:{x,z}, zoneNames, zoneColors, redraw }
export function drawMap(cv, ctx) {
  const g = cv.getContext('2d');
  const W = cv.width, H = cv.height, R = MAP_R, N = MAP_N;
  const px = (x) => (x + R) / (2 * R) * W, py = (z) => (z + R) / (2 * R) * H;
  const { island, veil } = ctx;
  g.fillStyle = '#0f2f4c'; g.fillRect(0, 0, W, H);
  // Gelände-Raster
  const G = 96, cell = W / G;
  const zoneCol = {}; for (const z of island.ZONES) zoneCol[z.id] = z.color;
  for (let iy = 0; iy < G; iy++) for (let ix = 0; ix < G; ix++) {
    const x = (ix + 0.5) / G * 2 * R - R, z = (iy + 0.5) / G * 2 * R - R;
    const h = island.getHeight(x, z);
    if (h <= 0.05) { if (h > -1.2) { g.fillStyle = '#1a5a82'; g.fillRect(ix * cell, iy * cell, cell + 0.5, cell + 0.5); } continue; }
    const zid = island.zoneAt(x, z);
    const base = zid ? zoneCol[zid] : (h > 18 ? '#8a7f7a' : '#7bbf5a');
    const v = veil ? veil.amountAt(x, z) : 0;
    g.fillStyle = mixGrey(base, v, h);
    g.fillRect(ix * cell, iy * cell, cell + 0.5, cell + 0.5);
  }
  // Nebelkacheln: unentdeckt = dunkel, Rand entdeckter Kacheln halb
  const ts = W / N;
  const rev = ctx.revealed || new Set();
  const near = (i) => { const ix = i % N, iz = Math.floor(i / N); for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { const jx = ix + dx, jz = iz + dz; if (jx < 0 || jz < 0 || jx >= N || jz >= N) continue; if (rev.has(jz * N + jx)) return true; } return false; };
  for (let i = 0; i < N * N; i++) {
    if (rev.has(i)) continue;
    const ix = i % N, iz = Math.floor(i / N);
    g.fillStyle = near(i) ? 'rgba(10,8,30,0.55)' : 'rgba(10,8,30,0.86)';
    g.fillRect(ix * ts, iz * ts, ts + 0.5, ts + 0.5);
  }
  // feine Schraffur auf dem Nebel
  g.strokeStyle = 'rgba(255,255,255,0.05)'; g.lineWidth = 1;
  for (let i = 0; i < N * N; i++) { if (rev.has(i)) continue; const ix = i % N, iz = Math.floor(i / N); g.beginPath(); g.moveTo(ix * ts, iz * ts + ts); g.lineTo(ix * ts + ts, iz * ts); g.stroke(); }
  // Zonennamen und Sammelzähler
  g.textAlign = 'center'; g.textBaseline = 'middle';
  for (const z of island.ZONES) {
    const t = tileOf(z.x, z.z, N, R);
    const known = rev.has(t) || near(t);
    const teaser = (ctx.teasers || []).find((tz) => tz.region === z.id);
    const veiled = veil && veil.isVeiled && veil.isVeiled(z.id);
    const X = px(z.x), Y = py(z.z);
    g.font = '700 15px system-ui, sans-serif';
    const name = known || (teaser && !teaser.open) ? (ctx.zoneNames && ctx.zoneNames[z.id]) || z.name : '?';
    g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillText(name, X + 1, Y + 1);
    g.fillStyle = known ? (veiled ? '#d8d4e6' : '#ffffff') : 'rgba(255,255,255,0.55)'; g.fillText(name, X, Y);
    const c = ctx.counts && ctx.counts[z.id];
    if (known && c && c.total) { g.font = '800 12px system-ui, sans-serif'; g.fillStyle = c.found >= c.total ? '#fff3a0' : '#cfe9ff'; g.fillText(`${c.found}/${c.total}`, X, Y + 17); }
    else if (known && veiled) { g.font = '600 12px system-ui, sans-serif'; g.fillStyle = '#c8c2dc'; g.fillText('Grauschleier', X, Y + 17); }
  }
  // Teaser: gesperrte Gebiete mit Schloss und Fähigkeitssymbol
  for (const tz of ctx.teasers || []) {
    if (tz.open) continue;
    const X = px(tz.x), Y = py(tz.z) - 30;
    g.beginPath(); g.arc(X, Y, 16, 0, Math.PI * 2); g.fillStyle = 'rgba(20,12,40,0.85)'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#ffd166'; g.stroke();
    const im = iconImg(ABILITY_ICON[tz.ability] || 'schloss', '#ffd166', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 11, Y - 11, 22, 22);
    const lk = iconImg('schloss', '#ffffff', ctx.redraw);
    if (lk && lk.complete && lk.naturalWidth) g.drawImage(lk, X + 8, Y - 20, 14, 14);
  }
  // Signalfeuer
  for (const f of ctx.fires || []) {
    const t = tileOf(f.x, f.z, N, R);
    if (!rev.has(t) && !near(t)) continue;
    const X = px(f.x), Y = py(f.z);
    g.beginPath(); g.arc(X, Y, 8, 0, Math.PI * 2); g.fillStyle = f.lit ? '#ff8c42' : 'rgba(80,70,90,0.9)'; g.fill(); g.lineWidth = 1.5; g.strokeStyle = f.lit ? '#fff3a0' : '#8a8090'; g.stroke();
    const im = iconImg('feuer', f.lit ? '#1d1330' : '#c8c2dc', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 5, Y - 5, 10, 10);
  }
  // Farbmarken (Noors Wegfähigkeit, Bindung 2): offene Lichtsplitter und Muscheln in entdeckten Kacheln
  for (const m of ctx.marks || []) {
    const t = tileOf(m.x, m.z, N, R);
    if (!rev.has(t)) continue;
    const X = px(m.x), Y = py(m.z);
    g.beginPath(); g.arc(X, Y, m.type === 'muschel' ? 3.6 : 2.8, 0, Math.PI * 2);
    g.fillStyle = m.type === 'muschel' ? '#ffd0ea' : '#fff3a0'; g.fill(); g.lineWidth = 1; g.strokeStyle = 'rgba(20,12,40,0.8)'; g.stroke();
  }
  // Aussichtspunkte (gefunden)
  for (const v of ctx.viewpoints || []) {
    if (!v.found) continue;
    const X = px(v.x), Y = py(v.z);
    g.beginPath(); g.arc(X, Y, 7, 0, Math.PI * 2); g.fillStyle = '#2de2c9'; g.fill();
    const im = iconImg('augen', '#1d1330', ctx.redraw);
    if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 5, Y - 5, 10, 10);
  }
  // Baumhaus
  if (ctx.baumhaus) { const X = px(ctx.baumhaus.x), Y = py(ctx.baumhaus.z); g.beginPath(); g.arc(X, Y, 9, 0, Math.PI * 2); g.fillStyle = '#ffb347'; g.fill(); const im = iconImg('haengematte', '#1d1330', ctx.redraw); if (im && im.complete && im.naturalWidth) g.drawImage(im, X - 6, Y - 6, 12, 12); }
  // Hauptziel
  if (ctx.target) {
    const X = px(ctx.target.x), Y = py(ctx.target.z);
    g.save(); g.translate(X, Y); g.rotate(Math.PI / 4);
    g.fillStyle = ctx.target.color || '#ffd166'; g.fillRect(-8, -8, 16, 16); g.lineWidth = 2; g.strokeStyle = '#1d1330'; g.strokeRect(-8, -8, 16, 16);
    g.restore();
  }
  // Spielfigur
  if (ctx.player) {
    const X = px(ctx.player.x), Y = py(ctx.player.z);
    g.beginPath(); g.arc(X, Y, 11, 0, Math.PI * 2); g.fillStyle = 'rgba(255,209,102,0.3)'; g.fill();
    g.save(); g.translate(X, Y); g.rotate(-(ctx.player.yaw || 0) + Math.PI);
    g.beginPath(); g.moveTo(0, -9); g.lineTo(6, 6); g.lineTo(0, 3); g.lineTo(-6, 6); g.closePath();
    g.fillStyle = '#ffd166'; g.fill(); g.lineWidth = 2; g.strokeStyle = '#1d1330'; g.stroke();
    g.restore();
  }
}
