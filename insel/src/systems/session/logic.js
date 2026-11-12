// Sitzungsfluss – reine Logik (WP42, DESIGN §3/§9/§10/§11): Recap-Karten „Letztes Mal“, Sätze fürs Lagerfeuer,
// „Bester Moment“-Bilder, Cliffhanger-Pool, Jahreszeiten je Modul, Modus-Parameter, Inselwetter, kleine Bedingungs-Auswertung.
import { UNIT_MODULE, MODES, EMOTIONS } from '../../content/schema/consts.js';
import { countWords } from '../../content/schema/text.js';

export const ZONE_NAME = { hafen: 'Hafen-Dorf', strand: 'Palmenstrand', dschungel: 'Dschungel', klippen: 'Sturmklippen', moor: 'Flüstermoor', markt: 'Markt-Hügel', vulkan: 'Vulkan', glimmer: 'Glimmerwolke', quellen: 'Quellental', leuchtturm: 'Leuchtturm' };
export const ZONE_ICON = { hafen: 'anker', strand: 'muschel', dschungel: 'trommel', klippen: 'windrad', moor: 'stein', markt: 'spraydose', vulkan: 'flamme', glimmer: 'stern', quellen: 'giesskanne', leuchtturm: 'laterne' };
export const ZONE_COLOR = { hafen: '#ffb347', strand: '#2de2c9', dschungel: '#4cd964', klippen: '#8fa3ff', moor: '#b06bff', markt: '#ffd166', vulkan: '#ff6b3d', glimmer: '#ff8ccf', quellen: '#8fd18b', leuchtturm: '#fff3a0' };
export const MODULE_REGION = { 'j1-m0': 'hafen', 'j1-m1': 'strand', 'j1-m2': 'dschungel', 'j1-m3': 'klippen', 'j1-m4': 'moor', 'j1-m5': 'markt', 'j1-m6': 'vulkan', 'j1-m7': 'glimmer', 'j1-m8': 'quellen', 'j1-m9': 'leuchtturm' };

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const short = (t, n = 12) => { const w = String(t || '').split(/\s+/).filter(Boolean); return w.length <= n ? w.join(' ') : w.slice(0, n).join(' ') + '…'; };

// ---- Modul-Fortschritt: höchstes Modul mit einer Einheit, die nicht gesperrt ist (kurz/offen/aktiv/fertig) ----
export function moduleProgress(units = {}) {
  let best = 0, done = 0, opened = 0;
  for (const [id, st] of Object.entries(units || {})) {
    if (!st || st === 'gesperrt') continue;
    opened++;
    if (st === 'fertig') done++;
    const m = UNIT_MODULE[id];
    if (m) best = Math.max(best, Number(m.slice(4)) || 0);
  }
  return { module: best, done, opened, finale: units['j1-e30'] === 'fertig' };
}

// ---- Jahreszeiten je Modul (DESIGN §1): M0–M2 Spätsommer/Herbst, M3 Winter, M4–M6 Nebel/Tauwetter, M7–M9 Frühling bis Sommer ----
export const SEASON_BY_MODULE = ['spaetsommer', 'spaetsommer', 'herbst', 'winter', 'tauwetter', 'tauwetter', 'tauwetter', 'fruehling', 'fruehling', 'sommer'];
// Palette: Farbkorrektur-Zusätze (Lift/Gain multiplikativ auf die Tageszeit), Sättigung, Nebelweite, Sturmstärke, Blüten
export const SEASON_PALETTES = {
  spaetsommer: { name: 'Spätsommer', lift: [0.006, 0.003, 0.0], gain: [1.03, 1.0, 0.95], sat: 1.05, fog: 1.0, storm: 1.0, bloom: 0.6, sky: '#ffd49c' },
  herbst: { name: 'Herbst', lift: [0.014, 0.006, 0.0], gain: [1.06, 0.97, 0.88], sat: 1.08, fog: 0.95, storm: 1.0, bloom: 0.3, sky: '#ffb56b' },
  winter: { name: 'Wintersturm', lift: [0.0, 0.008, 0.028], gain: [0.93, 0.97, 1.07], sat: 0.86, fog: 0.85, storm: 1.0, bloom: 0.0, sky: '#c7d3ff' },
  tauwetter: { name: 'Tauwetter', lift: [0.01, 0.012, 0.02], gain: [0.97, 1.0, 1.02], sat: 0.93, fog: 0.72, storm: 0.7, bloom: 0.25, sky: '#dfe6ff' },
  fruehling: { name: 'Frühling', lift: [0.004, 0.012, 0.004], gain: [1.0, 1.05, 0.97], sat: 1.12, fog: 1.05, storm: 0.5, bloom: 1.0, sky: '#e6ffd6' },
  sommer: { name: 'Sommer', lift: [0.004, 0.003, 0.0], gain: [1.05, 1.02, 0.96], sat: 1.1, fog: 1.1, storm: 0.4, bloom: 0.9, sky: '#fff0c8' },
  sommernacht: { name: 'Sommernacht', lift: [0.0, 0.004, 0.02], gain: [0.98, 1.0, 1.06], sat: 1.0, fog: 1.15, storm: 0.2, bloom: 0.9, sky: '#9ab0ff' },
};
export function seasonFor(units = {}, override = null) {
  if (override && SEASON_PALETTES[override]) return override;
  const p = moduleProgress(units);
  if (p.finale) return 'sommernacht';
  return SEASON_BY_MODULE[clamp(p.module, 0, 9)];
}

// ---- Modi (DESIGN §9): neutrale Namen, jederzeit wechselbar ----
export const MODE_PARAMS = {
  entspannt: { pulsRate: 0.6, control: 'optisch', timing: 1.3, auras: true, segelAuto: true, tellAmp: 1.0, label: 'Entspannt' },
  abenteuer: { pulsRate: 1.0, control: 'leicht', timing: 1.0, auras: true, segelAuto: true, tellAmp: 0.6, label: 'Abenteuer' },
  profi: { pulsRate: 1.3, control: 'deutlich', timing: 0.8, auras: false, segelAuto: false, tellAmp: 0.3, label: 'Profi' },
};
export const modeParams = (mode) => MODE_PARAMS[MODES.includes(mode) ? mode : 'abenteuer'];

// ---- Inselwetter (DESIGN §10): 20 Minuten, alle gleichzeitig ----
export const WEATHER = {
  ruhe: { name: 'Ruhewetter', minutes: 20, hour: 17.4, timeSpeed: 0.25, storm: 0.25, pulsFactor: 0.5, glimm: 'Ruhewetter. Alles langsamer.', icon: 'ruhe' },
  fest: { name: 'Festwetter', minutes: 20, hour: 19.3, timeSpeed: 0.3, storm: 0.5, pulsFactor: 1, glimm: 'Festwetter. Laternen an.', icon: 'feuer', lanterns: true, fireworks: true },
  fruehling: { name: 'Frühlingswetter', minutes: 20, hour: 9.5, timeSpeed: 0.5, storm: 0.3, pulsFactor: 0.8, glimm: 'Frühling. Alles blüht.', icon: 'bonsai', season: 'fruehling' },
};

// ---- Kleine Bedingungs-Auswertung (Teilmenge der Cond-DSL) für Signalfeuer, Sammelsachen, Nachtwachen ----
export function evalCond(c, ctx) {
  if (c === undefined || c === null || c === true) return true;
  if (c === false) return false;
  if (typeof c !== 'object') return false;
  const st = (p, fb) => ctx.state.get(p, fb);
  const unitState = (id) => st('units.' + id) || 'gesperrt';
  if (c.all) return c.all.every((x) => evalCond(x, ctx));
  if (c.any) return c.any.some((x) => evalCond(x, ctx));
  if (c.not) return !evalCond(c.not, ctx);
  if (c.unit) return unitState(c.unit) !== 'gesperrt';
  if (c.unitDone) return unitState(c.unitDone) === 'fertig';
  if (c.ability) return st('abilities', []).includes(c.ability);
  if (c.upgrade) return st('upgrades', []).includes(c.upgrade);
  if (c.feather) return st('feathers', []).includes(c.feather);
  if (c.item) return st('gadgets', []).includes(c.item) || !!(st('collectibles') || {})[c.item];
  if (c.weg) return st('wege', []).includes(c.weg);   // Wegfähigkeit aus einer Bindung (Stufe 2, WP34)
  if (c.deed) return st('deeds', []).includes(c.deed);
  if (c.collectible) return !!(st('collectibles') || {})[c.collectible];
  if (c.shard !== undefined) return st('shards', []).includes(c.shard);
  if (c.mode) return st('settings.mode', 'abenteuer') === c.mode;
  if (c.flag) {
    if (Array.isArray(c.flag)) { const [k, op, v] = c.flag; return cmp(st('flags.' + k), op, v); }
    return !!st('flags.' + c.flag);
  }
  if (c.bond) { const [id, lvl] = c.bond; return (Number(st('bonds.' + id)) || 0) >= lvl; }
  if (c.regionFreed) return ctx.regionFreed ? ctx.regionFreed(c.regionFreed) : false;
  if (c.time) {
    const h = ctx.hour ? ctx.hour() : 12;
    if (c.time === 'night') return h >= 20 || h < 5.5;
    if (c.time === 'day') return h >= 6 && h < 19;
    if (Array.isArray(c.time)) return h >= c.time[0] && h < c.time[1];
    return true;
  }
  if (c.puls) { const [op, v] = c.puls; return cmp(st('session.puls', 0), op, v); }
  if (c.npcHitze) { const [id, op, v] = c.npcHitze; const n = ctx.npcs && ctx.npcs.emotion ? ctx.npcs.emotion(id) : null; return cmp(n ? n.heat : 0, op, v); }
  if (c.medal) return true;
  return false;
}
function cmp(a, op, b) {
  switch (op) {
    case '>': return Number(a) > Number(b);
    case '>=': return Number(a) >= Number(b);
    case '<': return Number(a) < Number(b);
    case '<=': return Number(a) <= Number(b);
    case '!=': return a != b; // eslint-disable-line eqeqeq
    default: return a == b; // eslint-disable-line eqeqeq
  }
}

// ---- Recap „Letztes Mal“: drei Bildkarten aus dem gesicherten Sitzungs-Abschluss ----
//   buildRecap({ recap: state.recap, units, content, targetLabel }) → cards[3]
export function buildRecap({ recap = null, units = {}, target = null, content = null } = {}) {
  const r = recap || {};
  const zone = r.zone || 'hafen';
  const where = { icon: ZONE_ICON[zone] || 'karte', color: ZONE_COLOR[zone] || '#ffd166', kicker: 'Wo du warst', title: ZONE_NAME[zone] || 'Auf der Insel', text: r.whereText || (zone === 'hafen' ? 'Am Hafen, wo die Farben noch leuchten.' : 'Dort geht es weiter.') };
  let did;
  if (r.deed && r.deed.text) did = { icon: r.deed.icon || 'haken', color: r.deed.color || '#2de2c9', kicker: 'Was du geschafft hast', title: r.deed.title || 'Deine Tat', text: short(r.deed.text) };
  else if (r.unitDone && content && content.unit && content.unit(r.unitDone)) { const u = content.unit(r.unitDone); did = { icon: 'medaille', color: '#ffd166', kicker: 'Was du geschafft hast', title: u.quest, text: 'Geschafft. Ein Aufnäher mehr.' }; }
  else if (r.collected > 0) did = { icon: 'splitter', color: '#fff3a0', kicker: 'Was du geschafft hast', title: `${r.collected} Lichtsplitter`, text: 'Gefunden und eingesammelt.' };
  else did = { icon: 'boot', color: '#58c4ff', kicker: 'Was du geschafft hast', title: 'Angekommen', text: 'Mit dem letzten Boot. Die Insel wartet.' };
  const t = target || r.target || null;
  const next = t ? { icon: t.icon || 'feuer', color: t.color || '#ff8c42', kicker: 'Was jetzt leuchtet', title: t.title || t.label || 'Dein Ziel', text: short(t.text || 'Folge dem Marker auf dem Kompass.') }
    : { icon: 'schluessel', color: '#ff8c42', kicker: 'Was jetzt leuchtet', title: 'Der nächste Code', text: 'Am Ende der Stunde öffnet er die Quest.' };
  return [where, did, next];
}

// ---- Lagerfeuer: bis zu 3 Figuren mit je einem Satz zu deiner heutigen Tat (Taten-Log), sonst allgemeiner Satz der Figur ----
//   buildCampfireLines({ deedLog, day, npcDefs, names, max }) → [{ who, text, deed }]
export function buildCampfireLines({ deedLog = [], day = 1, npcDefs = [], max = 3 } = {}) {
  const byId = new Map(npcDefs.map((d) => [d.id, d]));
  const today = deedLog.filter((e) => e && e.day === day && e.npc).slice().reverse();
  const out = [], used = new Set();
  for (const e of today) {
    if (used.has(e.npc) || !byId.has(e.npc)) continue;
    const d = byId.get(e.npc);
    const L = d.lines || {};
    const text = (L.campfire && L.campfire[e.id]) || e.text || L.campfireDefault || null;
    if (!text) continue;
    const t = typeof text === 'object' ? text.t : text;
    if (countWords(t) > 12) continue;
    used.add(e.npc);
    out.push({ who: e.npc, text: t, deed: e.id });
    if (out.length >= max) break;
  }
  return out;
}

// ---- „Bester Moment heute?“: drei Bilder aus den Momenten der Sitzung (Vielfalt vor Reihenfolge) ----
export function buildMoments(moments = [], { max = 3 } = {}) {
  const seen = new Set(), out = [];
  const list = moments.slice().reverse();
  for (const m of list) {
    if (!m || !m.id) continue;
    const kind = m.kind || m.icon || 'x';
    if (seen.has(kind) && out.length < list.length - 1) continue;
    seen.add(kind);
    out.push({ id: m.id, icon: m.icon || 'stern', title: short(m.title || 'Ein Moment', 4), color: m.color || '#ffd166' });
    if (out.length >= max) break;
  }
  for (const m of list) { if (out.length >= max) break; if (!out.some((o) => o.id === m.id)) out.push({ id: m.id, icon: m.icon || 'stern', title: short(m.title || 'Ein Moment', 4), color: m.color || '#ffd166' }); }
  return out;
}

// ---- Cliffhanger-Pool (DESIGN §3): ein Satz zum Geheimnis, passend zum Fortschritt, ≤ 12 Wörter ----
export const CLIFFHANGERS = {
  0: ['Auf einer Kiste am Steg steht ein neuer Name.', 'Ilda schaut zum Turm. Und sagt nichts.', 'Ilda trägt den Brief noch. Zugeklebt.', 'An der Hafenmauer: frische Farbe. WER REDET …', 'Über den Klippen steigt Rauch. Jeden Abend.'],
  1: ['In der Höhle summt etwas im Takt der Flut.', 'Tiago sagt, oben in der Mangrove sieht man alles.', 'Eine Möwe trägt ein Stück Glas. Es glänzt.'],
  2: ['Über dem Wasserfall kreist ein siebter Vogel. Grau.', 'Maëlle träumt von einem Schiff. Ohne Steuer.', 'Im Kronendorf hängt ein Foto. Jemand hat es zerrissen.'],
  3: ['Ein Blitz zeigt eine Gestalt am Gipfel.', 'Luc sagt, die Hütte da oben war mal bewohnt.', 'Im Sturm ruft jemand. Oder ist es der Wind?'],
  4: ['Im Moor liegt ein Stein. Jemand hat ihn poliert.', 'Der Steinriese hat eine neue Inschrift. Frisch.', 'Pit hat eine Nachricht bekommen. Er zeigt sie keinem.'],
  5: ['Auf Noors Mauer steht ein neuer Satz. Über dich.', 'Oma Lucinda sagt: „Ich habe es gesehen. Damals.“', 'Der Markt ist still. Zu still.'],
  6: ['Am Krater brennt ein Feuer, das niemand angezündet hat.', 'Mika hat einen Brief. Er liest ihn nicht.', 'Grisel kommt näher. Jede Nacht ein Stück.'],
  7: ['Über der Nordküste glimmt ein Netz aus Licht.', 'Kims Netz kennt ein altes Video.', 'Ein Video geht herum. Vierzig Mal.'],
  8: ['Im Quellental raucht ein zweites Feuer.', 'Jhemp hat drei Nächte nicht geschlafen. Wieder.'],
  9: ['Das Herzglas fehlt noch ein Splitter. Wer hat ihn?', 'Grisel wartet im Turm. Sie ist satt von Schweigen.'],
};
export function pickCliffhanger({ module = 0, day = 1, pool = CLIFFHANGERS, extra = [] } = {}) {
  const m = clamp(module, 0, 9);
  const list = [...(pool[m] || []), ...extra].filter((t) => countWords(t) <= 12);
  if (!list.length) return 'Morgen leuchtet etwas Neues. Versprochen.';
  return list[(day * 7 + m * 3) % list.length];
}

// ---- Puls-Zonen (für andere Systeme, DESIGN §6) ----
export const pulsZone = (p) => (p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot');
export const EMOTION_LIST = EMOTIONS;
