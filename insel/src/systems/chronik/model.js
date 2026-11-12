// Herzglas-Chronik (WP54, DESIGN §2): reine Logik ohne Browser.
//   SHARDS[1..9]            Zeitstrahl der Nacht (Stunde, Icon, Einheit) – Titel erscheinen erst, wenn der Splitter gefunden ist
//   placeShard(placed, shard, slot) → { placed, correct }   isPlaced(placed, shard)   slotOf(placed, shard)
//   CONTRADICTIONS          freiwillige Detektiv-Aufgaben: zwei Splitter widersprechen sich, ein „Warum“-Slot mit Kacheln
//   openContradictions({ shards, placed, solved }) → [{ id, shards, ready, solved }]
//   answerWhy(id, tileId) → { ok, tile, say }   (kein „falsch“: die Kachel prallt nur ab, Glimm sagt „Schau nochmal hin.“)
//   chainFor(memories, placed) → [{ shard, step, say }]     memoryBy(memories, shard)
//   cliffhangerPool({ shards, units, solved }) → [Sätze ≤ 12 Wörter]   griselStateFor({ module, shards, flags }) → Zustand
import { countWords } from '../../content/schema/text.js';
import { moduleProgress } from '../session/logic.js';

// ---- Die Nacht des Sommerfests in neun Splittern (Reihenfolge = Kette; Stunde = Zeitstrahl) ----
export const SHARDS = [
  null,
  { shard: 1, unit: 'j1-e01', hour: 22.5, icon: 'laterne', owner: 'jolie', filter: null },
  { shard: 2, unit: 'j1-e06', hour: 19.0, icon: 'surfbrett', owner: 'tiago', filter: 'anerkennung' },
  { shard: 3, unit: 'j1-e10', hour: 22.4, icon: 'trommel', owner: 'maelle', filter: 'angst' },
  { shard: 4, unit: 'j1-e15', hour: 22.45, icon: 'blitz', owner: 'jhemp', filter: 'scham' },
  { shard: 5, unit: 'j1-e18', hour: 21.8, icon: 'sprechblase', owner: 'pit', filter: 'glaubenssatz' },
  { shard: 6, unit: 'j1-e23', hour: 22.3, icon: 'ohr', owner: 'lucinda', filter: 'hingehoert' },
  { shard: 7, unit: 'j1-e26', hour: 20.5, icon: 'kamera', owner: 'mika', filter: 'gruppendruck' },
  { shard: 8, unit: 'j1-e28', hour: 20.0, icon: 'chip', owner: 'kim', filter: 'daten' },
  { shard: 9, unit: 'j1-e29', hour: 23.5, icon: 'mond', owner: 'jhemp', filter: 'erschoepfung' },
];
export const SHARD_COUNT = 9;
// Zeitstrahl: neun Slots von früh bis spät (Slot-Reihenfolge nach Stunde, Ties nach Splitter-Nummer)
export const TIMELINE = SHARDS.slice(1).slice().sort((a, b) => a.hour - b.hour || a.shard - b.shard).map((s, i) => ({ slot: i + 1, shard: s.shard, hour: s.hour, icon: s.icon }));
export const SLOT_OF = Object.fromEntries(TIMELINE.map((t) => [t.shard, t.slot]));
export const SHARD_AT = Object.fromEntries(TIMELINE.map((t) => [t.slot, t.shard]));

export const FEELING_COLOR = { neutral: '#bfc6d6', unklar: '#bfc6d6', anerkennung: '#e0a458', angst: '#6f5cc8', scham: '#b8443a', rot: '#b8443a', glaubenssatz: '#6a8f5a', hingehoert: '#3d7bff', gruppendruck: '#ff5d8f', daten: '#2de2c9', erschoepfung: '#4a4f6a', trauer: '#3d7bff', wut: '#ff3b3b', freude: '#ffd23f' };
export const FEELING_LABEL = { neutral: 'Fundstück', unklar: 'Fundstück', anerkennung: 'Anerkennung', angst: 'Angst', scham: 'Scham', rot: 'Rot', glaubenssatz: 'Gedanke', hingehoert: 'Hingehört', gruppendruck: 'Gruppendruck', daten: 'Daten', erschoepfung: 'Erschöpfung' };
export const fmtHour = (h) => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return `${hh}:${mm < 10 ? '0' : ''}${mm}`; };

export const isPlaced = (placed = [], shard) => (placed || []).some((p) => p && p.shard === shard);
export const slotOf = (placed = [], shard) => { const p = (placed || []).find((x) => x && x.shard === shard); return p ? p.slot : null; };
export const shardInSlot = (placed = [], slot) => { const p = (placed || []).find((x) => x && x.slot === slot); return p ? p.shard : null; };
// Splitter auf den Zeitstrahl legen: ein Slot trägt höchstens einen Splitter; ein falscher Slot ist erlaubt (er wackelt nur)
export function placeShard(placed = [], shard, slot) {
  if (!SHARDS[shard] || !SHARD_AT[slot]) return { placed, correct: false, ok: false };
  const list = (placed || []).filter((p) => p && p.shard !== shard && p.slot !== slot);
  list.push({ shard, slot });
  return { placed: list, correct: SLOT_OF[shard] === slot, ok: true };
}
export function unplaceShard(placed = [], shard) { return (placed || []).filter((p) => p && p.shard !== shard); }
export const correctCount = (placed = []) => (placed || []).filter((p) => p && SLOT_OF[p.shard] === p.slot).length;
export const chainComplete = (placed = []) => correctCount(placed) === SHARD_COUNT;

// ---- Widersprüche: freiwillig, mit „Warum“-Slot; Kacheln ≤ 6 Wörter, Icon voran; nie ein Ausbruch als Ursache des Graus ----
export const CONTRADICTIONS = [
  { id: 'wer-rannte', shards: [3, 4], icon: 'sprint', prompt: 'Warum rannte Jhemp?',
    tiles: [{ id: 'zu-laut', icon: 'ruhe', t: 'Zu laut. Rot. Nur weg.', ok: true }, { id: 'absicht', icon: 'blitz', t: 'Er wollte etwas kaputt machen.' }, { id: 'spass', icon: 'stern', t: 'Aus Spaß.' }],
    say: 'Bei Rot will man nur raus. Kein Plan, kein Ziel.' },
  { id: 'lachen', shards: [2, 8], icon: 'kamera', prompt: 'Warum lachten alle?',
    tiles: [{ id: 'schnitt', icon: 'chip', t: 'Der schnelle Schnitt.', ok: true }, { id: 'tiago', icon: 'surfbrett', t: 'Über Tiagos Show.' }, { id: 'zufall', icon: 'frage', t: 'Einfach so.' }],
    say: 'Das Original war harmlos. Der Schnitt war das Problem.' },
  { id: 'pit', shards: [5, 8], icon: 'sprechblase', prompt: 'Warum dachte Pit, es ging um ihn?',
    tiles: [{ id: 'gedanke', icon: 'wirbel', t: 'Ein Gedanke färbt das Gefühl.', ok: true }, { id: 'beweis', icon: 'lupe', t: 'Er hatte Beweise.' }, { id: 'pech', icon: 'wolke', t: 'Pech gehabt.' }],
    say: 'Niemand lachte über Pit. Sein Gedanke sagte es ihm.' },
  { id: 'ilda', shards: [6, 9], icon: 'ohr', prompt: 'Warum war Ilda so hart?',
    tiles: [{ id: 'muede', icon: 'mond', t: 'Drei Nächte ohne Schlaf.', ok: true }, { id: 'boese', icon: 'wut', t: 'Sie mag Jhemp nicht.' }, { id: 'egal', icon: 'stumm', t: 'War ihr egal.' }],
    say: 'Erschöpft, nicht böse. Eine Frage hätte gereicht.' },
  { id: 'clip', shards: [4, 7], icon: 'kamera', prompt: 'Warum wurde es so laut?',
    tiles: [{ id: 'ueberall', icon: 'chip', t: 'Der Clip lief überall.', ok: true }, { id: 'musik', icon: 'trommel', t: 'Die Musik war zu laut.' }, { id: 'jhemp', icon: 'blitz', t: 'Jhemp hat es übertrieben.' }],
    say: 'Vierzig Reposts. Für Jhemp war jeder Blick zu viel.' },
];
export const contradictionById = (id) => CONTRADICTIONS.find((c) => c.id === id) || null;
// Bereit = beide Splitter liegen auf dem Zeitstrahl (an irgendeinem Slot); gelöst = im Spielstand chronik.solved
export function openContradictions({ shards = [], placed = [], solved = [] } = {}) {
  return CONTRADICTIONS.map((c) => {
    const found = c.shards.every((s) => shards.includes(s));
    const ready = found && c.shards.every((s) => isPlaced(placed, s));
    return { id: c.id, shards: c.shards, icon: c.icon, prompt: c.prompt, found, ready, solved: (solved || []).includes(c.id), tiles: c.tiles };
  }).filter((c) => c.found);
}
export function answerWhy(id, tileId) {
  const c = contradictionById(id);
  if (!c) return { ok: false, tile: null, say: null };
  const tile = c.tiles.find((t) => t.id === tileId) || null;
  if (!tile) return { ok: false, tile: null, say: null };
  return { ok: !!tile.ok, tile, say: tile.ok ? c.say : 'Schau nochmal hin.' };
}

// ---- Kette: Glied je gelegtem Splitter aus MemoryDef.chain ----
export const memoryBy = (memories = [], shard) => (memories || []).find((m) => m && m.shard === shard) || null;
export function chainFor(memories = [], placed = []) {
  return TIMELINE.map((t) => {
    const m = memoryBy(memories, t.shard);
    const on = isPlaced(placed, t.shard);
    return { slot: t.slot, shard: t.shard, hour: t.hour, icon: t.icon, placed: on, correct: on && slotOf(placed, t.shard) === t.slot, step: m && m.chain ? m.chain.step : null, say: on && m && m.chain ? textOf(m.chain.say) : null };
  });
}
export const textOf = (t) => (t && typeof t === 'object' ? t.t : t) || '';

// ---- Cliffhanger-Pool fürs Lagerfeuer (DESIGN §3): passend zu Splittern und gelösten Widersprüchen, ≤ 12 Wörter ----
export const CLIFF_BY_SHARD = {
  1: ['Der Turm wurde dunkel. Aber wann genau?', 'Jolies Fundstück zeigt einen Knall. Wer war da?'],
  2: ['Tiago sah nur Lachen. Was sahen die anderen?', 'Zwei Erinnerungen, eine Nacht. Sie passen nicht zusammen.'],
  3: ['Maëlle hörte den Knall. Jemand rannte vorher.', 'Die Musik brach ab. Warum eigentlich?'],
  4: ['Jhemp wollte nur weg. Die Tür weiß mehr.', 'Das Glas kippte. Niemand hat es gewollt.'],
  5: ['Pit ist sicher. Zu sicher.', 'Ein Gedanke kann eine ganze Nacht färben.'],
  6: ['Oma Lucinda hat genau hingehört. Sie sagt es dir bald.'],
  7: ['Die Crew hat geschnitten. Wer hat zuerst geteilt?'],
  8: ['Vierzig Reposts. Das Original ist harmlos.'],
  9: ['Drei Nächte ohne Schlaf. Dann fährt Ilda aufs Meer.', 'Neun Splitter. Die Kette ist fast geschlossen.'],
};
export const CLIFF_BY_SOLVED = {
  'wer-rannte': ['Rot ist kein Plan. Das weißt du jetzt.'],
  lachen: ['Der Schnitt war das Problem. Nicht Tiago.'],
  pit: ['Pit glaubt dir noch nicht. Bald.'],
  ilda: ['Ilda war müde, nicht böse. Sag es ihr.'],
  clip: ['Ein Clip, vierzig Blicke. Jhemp hat sie alle gespürt.'],
};
export function cliffhangerPool({ shards = [], solved = [], units = {} } = {}) {
  const out = [];
  const found = (shards || []).slice().sort((a, b) => a - b);
  // die zwei jüngsten Splitter geben die Sätze (der Fokus bleibt beim Neuen)
  for (const s of found.slice(-2)) out.push(...(CLIFF_BY_SHARD[s] || []));
  for (const id of (solved || []).slice(-1)) out.push(...(CLIFF_BY_SOLVED[id] || []));
  if (found.length >= 4 && found.length < 9 && moduleProgress(units).module >= 3) out.push('Grisel kreist über dem Gipfel. Sie wartet auf die Kette.');
  return out.filter((t) => countWords(t) <= 12);
}

// ---- Grisel: Schatten im Intro, Silhouette in der Ferne ab M3, nah ab acht Splittern, Lichtfalter im Finale ----
export const GRISEL_STATES = ['verborgen', 'ferne', 'nah', 'lichtfalter'];
export function griselStateFor({ module = 0, shards = [], flags = {} } = {}) {
  if (flags && (flags['finale.lichtfalter'] || flags['grisel.lichtfalter'])) return 'lichtfalter';
  if (flags && flags['grisel.nah']) return 'nah';
  if ((shards || []).length >= 8) return 'nah';
  if (module >= 3) return 'ferne';
  return 'verborgen';
}
export const GRISEL_PROP_STATE = { verborgen: 'schatten', ferne: 'schatten', nah: 'nah', lichtfalter: 'lichtfalter' };
