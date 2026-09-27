// Baumhaus-Modell (WP40, DESIGN §8): reine Logik ohne Browser – Möbel-Raster, Stärken-Bonsai aus dem Taten-Log,
// Jukebox-Komponist, Glas (Glühwürmchen + anonyme Muscheln), Trophäenwand, Hängematte.
//   Raster:   GRID {n, cell} · cellToLocal(cx, cz) · cellFree(cx, cz, blocked) · FURNITURE (Katalog) · availableFurniture(ctx)
//             placeFurniture(list, item) · removeFurniture(list, cx, cz)
//   Bonsai:   bonsaiFrom({ deedLog, deeds, bonsai, npcDefs, glaubenssatz }) → { fruits, branches, stage, size }
//   Glas:     glassSummary(glas) → { fireflies, shells, byNeed, total }
//   Jukebox:  JUKEBOX_SLOTS, JUKEBOX_LOOPS, cycleLoop(list, i), playlistFrom(list), nextIndex(list, i)
//   Trophäen: trophiesFrom({ medals, units, jackePatches, wege, minigameDefs, questDefs }) → [{ id, kind, icon, color, label, tier }]
//   Ruhe:     REST { seconds, puls }
import { TANKS as NEEDS } from '../../content/schema/consts.js';

// ---- Möbel-Raster: 7 × 7 Zellen à 1,4 m auf dem runden Boden (Radius 6,2 m), Stationen sind gesperrt ----
export const GRID = { n: 7, cell: 1.4, radius: 5.4 };
export function cellToLocal(cx, cz) { const o = (GRID.n - 1) / 2; return { x: (cx - o) * GRID.cell, z: (cz - o) * GRID.cell }; }
export function cellInRoom(cx, cz) {
  if (!Number.isInteger(cx) || !Number.isInteger(cz) || cx < 0 || cz < 0 || cx >= GRID.n || cz >= GRID.n) return false;
  const p = cellToLocal(cx, cz);
  return Math.hypot(p.x, p.z) <= GRID.radius;
}
// Gesperrte Zellen: Stationen (lokale Koordinaten) belegen die nächstliegende Zelle plus Nachbarn im Radius r
export function blockedCells(stations = []) {
  const out = new Set();
  const o = (GRID.n - 1) / 2;
  for (const s of stations) {
    const r = s.block === undefined ? 1 : s.block;
    const cx = Math.round(s.at[0] / GRID.cell + o), cz = Math.round(s.at[2] / GRID.cell + o);
    for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) out.add(`${cx + dx},${cz + dz}`);
  }
  return out;
}
export function cellFree(cx, cz, blocked = new Set(), list = []) {
  if (!cellInRoom(cx, cz)) return false;
  if (blocked.has(`${cx},${cz}`)) return false;
  return !list.some((f) => f.cx === cx && f.cz === cz);
}

// Möbel aus Regionsmaterialien (DESIGN §8): frei ab befreiter Region oder Einheit; kosmetische 'moebel'-Items kommen dazu
export const FURNITURE = [
  { id: 'hafenkiste', label: 'Hafenkiste', icon: 'anker', color: '#a87850', needs: null, shape: 'kiste' },
  { id: 'papierlaterne', label: 'Papierlaterne', icon: 'laterne', color: '#ffd166', needs: { unit: 'j1-e02' }, shape: 'laterne' },
  { id: 'muschellampe', label: 'Muschellampe', icon: 'muschel', color: '#2de2c9', needs: { regionFreed: 'strand' }, shape: 'lampe' },
  { id: 'surfbrett', label: 'Surfbrett', icon: 'surfbrett', color: '#ff7a59', needs: { unit: 'j1-e06' }, shape: 'brett' },
  { id: 'federteppich', label: 'Federteppich', icon: 'trommel', color: '#9b5cff', needs: { regionFreed: 'dschungel' }, shape: 'teppich' },
  { id: 'trommel', label: 'Trommel', icon: 'trommel', color: '#c0392b', needs: { unit: 'j1-e09' }, shape: 'trommel' },
  { id: 'windrad', label: 'Windrad', icon: 'windrad', color: '#8fa3ff', needs: { regionFreed: 'klippen' }, shape: 'windrad' },
  { id: 'sturmglas', label: 'Sturmglas', icon: 'wetter', color: '#7fd8ff', needs: { unit: 'j1-e11' }, shape: 'sturmglas' },
  { id: 'moosbank', label: 'Moosbank', icon: 'stein', color: '#4fae55', needs: { regionFreed: 'moor' }, shape: 'bank' },
  { id: 'kristall', label: 'Kristall', icon: 'kristall', color: '#b48cff', needs: { regionFreed: 'markt' }, shape: 'kristall' },
  { id: 'glutstein', label: 'Glutstein', icon: 'flamme', color: '#ff6b1a', needs: { regionFreed: 'vulkan' }, shape: 'glut' },
  { id: 'lichtnetz', label: 'Lichtnetz', icon: 'chip', color: '#5ad8ff', needs: { regionFreed: 'glimmer' }, shape: 'netz' },
];
// ctx = { evalCond(c) → bool, cosmetics: [{ id, slot, label?, icon?, color? }] (besessene Kosmetik) }
export function availableFurniture({ evalCond = () => false, cosmetics = [] } = {}) {
  const base = FURNITURE.filter((f) => !f.needs || evalCond(f.needs));
  const extra = cosmetics.filter((c) => c && c.slot === 'moebel').map((c) => ({ id: c.id, label: c.label || c.id, icon: c.icon || 'stern', color: c.color || '#ffd166', shape: c.shape || 'kiste', cosmetic: true }));
  return base.concat(extra);
}
export function furnitureDef(id, cosmetics = []) {
  return FURNITURE.find((f) => f.id === id) || availableFurniture({ evalCond: () => true, cosmetics }).find((f) => f.id === id) || null;
}
// Setzen: gleiche Zelle wird ersetzt; Rückgabe eine neue Liste (Spielstand-Feld baumhaus.furniture)
export function placeFurniture(list = [], { id, cx, cz, yaw = 0 }, blocked = new Set()) {
  if (!id || !cellInRoom(cx, cz) || blocked.has(`${cx},${cz}`)) return { ok: false, list, reason: 'zelle' };
  const out = list.filter((f) => !(f.cx === cx && f.cz === cz));
  if (out.length >= 24) return { ok: false, list, reason: 'voll' };
  out.push({ id, cx, cz, yaw: Math.round(yaw * 100) / 100 });
  return { ok: true, list: out };
}
export function removeFurniture(list = [], cx, cz) {
  const out = list.filter((f) => !(f.cx === cx && f.cz === cz));
  return { ok: out.length !== list.length, list: out };
}

// ---- Stärken-Bonsai: eine Frucht je echter Tat (Taten-Log), ein Ast je Satz (Glaubenssatz, Klarklang-Sätze) ----
export const BONSAI_STAGES = ['keimling', 'jung', 'kraeftig', 'alt', 'ehrwuerdig'];
export function bonsaiFrom({ deedLog = [], deeds = [], bonsai = [], npcDefs = [], glaubenssatz = null, nameOf = null } = {}) {
  const defs = new Map((npcDefs || []).map((d) => [d.id, d]));
  const seen = new Set();
  const fruits = [];
  const log = Array.isArray(deedLog) ? deedLog : [];
  for (const e of log) {
    if (!e || !e.id || seen.has(e.id)) continue;
    seen.add(e.id);
    const d = e.npc ? defs.get(e.npc) : null;
    fruits.push({ id: e.id, npc: e.npc || null, npcName: e.npc ? ((nameOf && nameOf(e.npc)) || (d && d.name) || e.npc) : null, color: (d && d.color) || '#ffd23f', icon: (d && d.icon) || 'herz', text: e.text || null, day: e.day || 1 });
  }
  for (const id of deeds || []) { if (!seen.has(id)) { seen.add(id); fruits.push({ id, npc: null, npcName: null, color: '#ffd23f', icon: 'herz', text: null, day: 0 }); } }
  const branches = [];
  const addB = (id, text, color, kind) => { if (!id || branches.some((b) => b.id === id)) return; branches.push({ id, text: text || null, color: color || '#4fae55', kind }); };
  if (glaubenssatz && (glaubenssatz.text || typeof glaubenssatz === 'string')) addB('glaubenssatz', typeof glaubenssatz === 'string' ? glaubenssatz : glaubenssatz.text, '#ffd166', 'glaubenssatz');
  for (const b of bonsai || []) if (b && b.id) addB(b.id, b.text, b.color, b.kind || 'satz');
  // Größe wächst mit Früchten und Ästen, aber nie über 1 (ab ~24 Früchten + 4 Ästen)
  const size = Math.min(1, 0.18 + fruits.length * 0.03 + branches.length * 0.08);
  const stage = BONSAI_STAGES[Math.min(BONSAI_STAGES.length - 1, Math.floor(size * BONSAI_STAGES.length))];
  return { fruits, branches, size, stage };
}

// ---- Glas: Glühwürmchen (Bester Moment am Feuer, {moment, day}) und anonyme Muscheln ({need, day}), nur auf dem Gerät ----
export function glassSummary(glas = []) {
  const list = Array.isArray(glas) ? glas : [];
  const fireflies = list.filter((g) => g && g.moment);
  const shells = list.filter((g) => g && g.need);
  const byNeed = {};
  for (const n of NEEDS) byNeed[n] = 0;
  for (const s of shells) if (byNeed[s.need] !== undefined) byNeed[s.need]++;
  return { fireflies, shells, byNeed, total: list.length };
}
export function addShell(glas = [], need, day = 1) {
  if (!NEEDS.includes(need)) return { ok: false, list: glas };
  const list = (Array.isArray(glas) ? glas : []).slice();
  list.push({ need, day });
  return { ok: true, list };
}

// ---- Jukebox-Komponist: 4 Takte, jeder 'runter' | 'auf' | 'still'; vor e13 nur ein einzelner Loop ----
export const JUKEBOX_SLOTS = 4;
export const JUKEBOX_LOOPS = ['runter', 'auf', 'still'];
export const JUKEBOX_LABEL = { runter: 'Runter', auf: 'Auf', still: 'Still' };
export const JUKEBOX_ICON = { runter: 'mond', auf: 'sonne', still: 'stumm' };
export const JUKEBOX_STEP_SECONDS = 24;
export function playlistFrom(list) {
  const out = [];
  for (let i = 0; i < JUKEBOX_SLOTS; i++) { const v = Array.isArray(list) ? list[i] : null; out.push(JUKEBOX_LOOPS.includes(v) ? v : 'still'); }
  return out;
}
export function cycleLoop(list, i) {
  const pl = playlistFrom(list);
  if (i < 0 || i >= JUKEBOX_SLOTS) return pl;
  pl[i] = JUKEBOX_LOOPS[(JUKEBOX_LOOPS.indexOf(pl[i]) + 1) % JUKEBOX_LOOPS.length];
  return pl;
}
export function nextIndex(list, i) {
  const pl = playlistFrom(list);
  if (!pl.some((v) => v !== 'still')) return -1;
  let k = i;
  for (let n = 0; n < JUKEBOX_SLOTS; n++) { k = (k + 1) % JUKEBOX_SLOTS; if (pl[k] !== 'still') return k; }
  return -1;
}
export function firstIndex(list) { return nextIndex(list, -1); }
// Stimmung der Playlist für Wetter/Tiere (e13): −1 ganz runter … +1 ganz auf
export function playlistMood(list) {
  const pl = playlistFrom(list).filter((v) => v !== 'still');
  if (!pl.length) return 0;
  return pl.reduce((a, v) => a + (v === 'auf' ? 1 : -1), 0) / pl.length;
}

// ---- Trophäenwand: Medaillen je Minispiel, Aufnäher, Wegfähigkeiten, Jacken-Aufnäher ----
export const MEDAL_TIER = { bronze: 1, silber: 2, gold: 3, stern: 4 };
export function trophiesFrom({ medals = {}, units = {}, jackePatches = [], wege = [], minigameDefs = [], questDefs = [], collectibles = {} } = {}) {
  const out = [];
  const mg = new Map((minigameDefs || []).map((d) => [d.id, d]));
  for (const [id, m] of Object.entries(medals || {})) {
    if (!m || !m.medal) continue;
    const d = mg.get(id);
    const tier = m.stern ? 'stern' : m.medal;
    out.push({ id: 'medal-' + id, kind: 'medaille', icon: (d && d.icon) || 'medaille', color: (d && d.color) || '#ffd166', label: (d && (typeof d.title === 'object' ? d.title.t : d.title)) || id, tier, rank: MEDAL_TIER[tier] || 1 });
  }
  const qd = new Map((questDefs || []).map((q) => [q.id, q]));
  for (const [id, st] of Object.entries(units || {})) {
    if (st !== 'fertig') continue;
    const q = qd.get(id);
    out.push({ id: 'patch-' + id, kind: 'aufnaeher', icon: (q && q.patch && q.patch.icon) || 'pass', color: (q && q.patch && q.patch.color) || '#ffd166', label: q ? q.title : id, tier: 'aufnaeher', rank: 2 });
  }
  for (const w of wege || []) out.push({ id: 'weg-' + w, kind: 'weg', icon: 'kompass', color: '#2de2c9', label: w, tier: 'weg', rank: 2 });
  for (const j of jackePatches || []) out.push({ id: 'jacke-' + j, kind: 'jacke', icon: 'herz', color: '#ff5d8f', label: j, tier: 'jacke', rank: 3 });
  const found = Object.keys(collectibles || {}).length;
  if (found >= 10) out.push({ id: 'sammler', kind: 'sammler', icon: 'stern', color: '#ffd23f', label: `${found} Funde`, tier: found >= 60 ? 'gold' : found >= 30 ? 'silber' : 'bronze', rank: found >= 60 ? 3 : found >= 30 ? 2 : 1 });
  out.sort((a, b) => b.rank - a.rank || a.label.localeCompare(b.label));
  return out;
}

// ---- Hängematte / Sicherer Ort: Puls fällt auf 10 (DESIGN §7), kurze Ruhe, jederzeit verlassbar ----
export const REST = { seconds: 6, puls: 10, easeSeconds: 2.5 };
export function restPuls(from, t) { const k = Math.min(1, Math.max(0, t / REST.easeSeconds)); return Math.round(from + (REST.puls - from) * (1 - (1 - k) * (1 - k))); }
