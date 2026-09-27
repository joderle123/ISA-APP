// Medaillen-Hülle (WP36, DESIGN §9), reine Logik (Node-testbar): Bronze/Silber/Gold aus den Kriterien der MinigameDef,
// der Leuchtstern als versteckte vierte Stufe (nie angekündigt, nur ohne Rückenwind und ohne Fehlschlag im Lauf),
// Zeitfenster je Modus (Entspannt großzügig, Abenteuer Standard, Profi eng), Bestwerte nur auf dem Gerät.
//   medalFor(def, result, { mode, rueckenwind }) → { medal: 'bronze'|'silber'|'gold'|null, stern: boolean }
//   medalCriteria(def, mode) → { bronze, silber, gold, stern } (Modus-Überschreibungen eingerechnet)
//   primaryKey(def, template) → Schlüssel des Bestwerts ('seconds' | 'hits' | 'score' | …)
//   isBetter(key, a, b) · formatValue(key, v) · updateBest(cur, { key, value, medal, stern, mode }) → { next, newBest }
//   timingFor(mode, rueckenwind) → Faktor für Zeitfenster (× 1,35 mit Rückenwind)
export const MEDAL_RANK = { bronze: 0, silber: 1, gold: 2, stern: 3 };
export const MEDAL_NAME = { bronze: 'Bronze', silber: 'Silber', gold: 'Gold', stern: 'Leuchtstern' };
export const MEDAL_COLOR = { bronze: '#d08a5a', silber: '#d9e2f2', gold: '#ffd166', stern: '#fff6c8' };
export const MEDAL_ORDER = ['bronze', 'silber', 'gold'];
// Kleiner ist besser (Zeit, Züge, Verschüttetes …); alles andere: größer ist besser (Trefferquote, Punkte)
export const LESS_IS_BETTER = new Set(['seconds', 'moves', 'spilled', 'lost', 'draengeln', 'fails', 'misses', 'commands', 'ground']);
// Flaggen statt Zahlen: der Leuchtstern verlangt Läufe ohne Hinweis (Rückenwind) und ohne Fehlschlag/Neustart
export const FLAGS = new Set(['noHint', 'noRewind', 'noFail', 'noRestart']);
export const MODE_TIMING = { entspannt: 1.3, abenteuer: 1, profi: 0.8 };
export const RUECKENWIND_TIMING = 1.35;
export const RUECKENWIND_AFTER = 3;   // Fehlversuche hintereinander, dann wird „Rückenwind?“ leise angeboten
// Standard-Bestwert je Vorlage, wenn die Def keinen medalKey nennt
export const TEMPLATE_KEY = { rennen: 'seconds', rhythmus: 'hits', satzbau: 'score', duell: 'hits', verteidigung: 'score', lotsen: 'score', bauen: 'score', wuerfel: 'score', leine: 'hits', oberflaeche: 'score' };

export const timingFor = (mode, rueckenwind = false) => (MODE_TIMING[mode] || 1) * (rueckenwind ? RUECKENWIND_TIMING : 1);

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export function primaryKey(def, template) {
  if (def && def.medalKey) return def.medalKey;
  const gold = def && def.medals && def.medals.gold;
  if (isObj(gold)) { const k = Object.keys(gold).find((x) => !FLAGS.has(x)); if (k) return k; }
  return TEMPLATE_KEY[template || (def && def.template)] || 'score';
}

// Kriterien je Modus: def.medals als Basis; def.modes[mode].medals überschreibt ganze Stufen,
// def.modes[mode].{bronze,silber,gold} als Zahl setzt nur den Hauptschlüssel (z. B. Sekunden je Modus)
export function medalCriteria(def, mode = 'abenteuer') {
  const base = (def && def.medals) || {};
  const key = primaryKey(def);
  const m = (def && def.modes && def.modes[mode]) || {};
  const out = {};
  for (const lvl of [...MEDAL_ORDER, 'stern']) {
    let c = isObj(base[lvl]) ? { ...base[lvl] } : null;
    if (m.medals && isObj(m.medals[lvl])) c = { ...(c || {}), ...m.medals[lvl] };
    if (typeof m[lvl] === 'number') c = { ...(c || {}), [key]: m[lvl] };
    if (c) out[lvl] = c;
  }
  return out;
}

export function meets(criterion, result, { rueckenwind = false } = {}) {
  if (!isObj(criterion) || !result) return false;
  for (const [k, v] of Object.entries(criterion)) {
    if (FLAGS.has(k)) {
      if (!v) continue;
      if (k === 'noHint' && rueckenwind) return false;
      if (k === 'noRewind' && (result.rewinds || 0) > 0) return false;
      if ((k === 'noFail' || k === 'noRestart') && (result.fails || 0) > 0) return false;
      continue;
    }
    const r = result[k];
    if (typeof r !== 'number' || Number.isNaN(r)) return false;
    // Rückenwind: Zeitgrenzen werden großzügiger (× 1,35), Quoten bleiben
    const tol = rueckenwind && k === 'seconds' ? RUECKENWIND_TIMING : 1;
    if (LESS_IS_BETTER.has(k) ? r > v * tol : r < v) return false;
  }
  return true;
}

// Höchste erreichte Stufe; der Stern nur zusätzlich zu Gold, nie mit Rückenwind und nie nach einem Fehlschlag im Lauf
export function medalFor(def, result, { mode = 'abenteuer', rueckenwind = false } = {}) {
  const C = medalCriteria(def, mode);
  let medal = null;
  for (const lvl of MEDAL_ORDER) if (C[lvl] && meets(C[lvl], result, { rueckenwind })) medal = lvl;
  const stern = medal === 'gold' && !rueckenwind && (result.fails || 0) === 0 && !!C.stern && meets(C.stern, result, { rueckenwind });
  return { medal, stern };
}

export const rankOf = (medal, stern = false) => (stern ? 3 : medal ? MEDAL_RANK[medal] : -1);
export const isBetter = (key, a, b) => (typeof a !== 'number' ? false : typeof b !== 'number' ? true : LESS_IS_BETTER.has(key) ? a < b - 1e-9 : a > b + 1e-9);

export function formatValue(key, v) {
  if (typeof v !== 'number' || Number.isNaN(v)) return '–';
  if (key === 'seconds') {
    const m = Math.floor(v / 60), s = v - m * 60;
    return (m ? m + ':' : '') + (m ? String(Math.floor(s)).padStart(2, '0') : String(Math.floor(s))) + ',' + String(Math.floor((s % 1) * 10));
  }
  if (key === 'hits' || key === 'score') return Math.round(v * 100) + ' %';
  return String(Math.round(v * 10) / 10);
}

// Bestwert-Eintrag fortschreiben: state.medals.<id> = { best, key, medal, stern, mode, runs, tries, bests:{mode:best}, updated }
export function updateBest(cur, { key, value, medal, stern, mode, ok }) {
  const c = isObj(cur) ? { ...cur } : {};
  c.key = key;
  c.runs = (c.runs || 0) + 1;
  c.tries = ok ? 0 : (c.tries || 0) + 1;
  let newBest = false;
  if (typeof value === 'number' && (medal || key !== 'seconds')) {
    if (isBetter(key, value, c.best)) { c.best = value; newBest = true; }
    c.bests = { ...(c.bests || {}) };
    if (isBetter(key, value, c.bests[mode])) c.bests[mode] = value;
  }
  if (rankOf(medal, stern) > rankOf(c.medal, c.stern)) { c.medal = medal; c.stern = !!stern; c.mode = mode; }
  else if (medal && !c.medal) { c.medal = medal; c.mode = mode; }
  if (stern) c.stern = true;
  return { next: c, newBest };
}

export const medalLabel = (medal, stern) => (stern ? MEDAL_NAME.stern : medal ? MEDAL_NAME[medal] : '');
