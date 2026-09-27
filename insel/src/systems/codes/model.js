// Code-Modell (WP30, DESIGN §10) – reine Logik ohne Browser, für Plugin, Lehrerheft-Generator und Unit-Tests.
//   Primäre Codes: das Code-Wort der Einheit aus content/units.js (WELLE → j1-e11), dazu die Sonder-Codes
//     demo · teacher · weather.{ruhe,fest,fruehling} · modules.{j1-m0…j1-m9} (units.js codes, WP30-Fassung).
//   Ersatzcodes: WORT-WORT-ZZ aus einem gesalzenen FNV-1a-Hash über salt|art|id und der 256er-Wortliste
//     (content/wordlist.js). Offline prüfbar, Groß/Klein egal, Bindestriche/Leerzeichen egal.
//   resolveCode(input, content, opts) → { kind, id, unit?, alt } | null      (alt = Ersatzcode getroffen)
//   allCodes(content, opts) → [{ kind, id, code, alt, label, nr?, unit?, teacherOnly, linesVeils }]
//   suggest(input, words, { max }) → Wörter aus der Wortliste (Präfix zuerst, dann Tippfehler ≤ 2)
//   planUnlock(found, { units, states, linesVeils, questDefs }) → { open, kurz, veiled, already, unit }
//   planLinesVeils(active, { units, states, codesUsed, questDefs }) → { toKurz, toOpen }
//   spellOut(code) → 'W, E, L, L, E' (zum Vorlesen) · friendlyError() · isLinesVeilsUnit(unit, questDef)
import { normCode } from '../../core/content.js';

export { normCode };
export const DEFAULT_SALT = 'herzglas-j1';
export const CODE_KINDS = ['unit', 'module', 'demo', 'teacher', 'weather'];
export const KIND_LABEL = { unit: 'Einheit', module: 'Modul', demo: 'Demo', teacher: 'Lehrer-Panel', weather: 'Inselwetter' };
export const WEATHER_LABEL = { ruhe: 'Ruhewetter', fest: 'Festwetter', fruehling: 'Frühlingswetter' };
// Einheiten, die bei Lines & Veils nur als Kurzfassung ohne Szene laufen (DESIGN §10) – plus QuestDefs mit linesAndVeils
export const LINES_VEILS_UNITS = ['j1-e17', 'j1-e26', 'j1-e28', 'j1-j08'];

// ---- Hash ----
export function fnv1a(str) {
  let h = 0x811c9dc5;
  const s = String(str);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
// Ersatzcode WORT-WORT-ZZ. words = 256 Wörter (Index = Byte). ZZ ohne führende Null (Zahlenrad liefert 0–99).
export function hashCode(kind, id, { salt = DEFAULT_SALT, words } = {}) {
  if (!words || words.length < 256) throw new Error('Wortliste mit 256 Wörtern nötig');
  const h = fnv1a(`${salt}|${kind}|${id}`);
  const h2 = fnv1a(`${id}|${kind}|${salt}`);   // zweite Runde, damit Wort 2 und Zahl nicht am selben Hash hängen
  const w1 = words[h & 255];
  const w2 = words[(h2 >>> 8) & 255];
  const zz = (h >>> 16) % 100;
  return `${w1}-${w2}-${zz}`;
}

// ---- Alle Codes ----
function unitLabel(u) { return u ? `${u.joker ? 'Joker ' + u.nr : 'Einheit ' + u.nr} · ${u.quest}` : ''; }
export function allCodes(content, { salt = DEFAULT_SALT, words = null, questDefs = null } = {}) {
  const out = [];
  const alt = (kind, id) => (words ? hashCode(kind, id, { salt, words }) : null);
  const codes = content.codes || {};
  for (const u of content.units || []) {
    const q = questDefs ? questDefs(u.id) : (content.get ? content.get('quests', u.id) : null);
    out.push({ kind: 'unit', id: u.id, code: u.code, alt: alt('unit', u.id), label: unitLabel(u), nr: u.nr, unit: u, teacherOnly: !!u.teacherOnly, linesVeils: isLinesVeilsUnit(u, q) });
  }
  for (const [mid, code] of Object.entries(codes.modules || {})) {
    const m = (content.modules || (content.get && content.get('units', 'units') && content.get('units', 'units').modules) || []).find((x) => x.id === mid);
    out.push({ kind: 'module', id: mid, code, alt: alt('module', mid), label: `Modul ${m ? m.nr + ' · ' + m.title : mid}`, teacherOnly: false, linesVeils: false });
  }
  if (codes.demo) out.push({ kind: 'demo', id: 'demo', code: codes.demo, alt: alt('demo', 'demo'), label: 'Demo (Team): alles als Kurzfassung', teacherOnly: false, linesVeils: false });
  if (codes.teacher) out.push({ kind: 'teacher', id: 'teacher', code: codes.teacher, alt: alt('teacher', 'teacher'), label: 'Lehrer-Panel', teacherOnly: true, linesVeils: false });
  for (const [wid, code] of Object.entries(codes.weather || {})) out.push({ kind: 'weather', id: wid, code, alt: alt('weather', wid), label: `Inselwetter · ${WEATHER_LABEL[wid] || wid}`, teacherOnly: false, linesVeils: false });
  return out;
}

// ---- Suche ----
export function resolveCode(input, content, opts = {}) {
  const w = normCode(input);
  if (!w) return null;
  for (const c of allCodes(content, opts)) {
    if (normCode(c.code) === w) return { kind: c.kind, id: c.id, unit: c.unit || null, alt: false };
  }
  if (opts.words) {
    for (const c of allCodes(content, opts)) if (c.alt && normCode(c.alt) === w) return { kind: c.kind, id: c.id, unit: c.unit || null, alt: true };
  }
  return null;
}

// ---- Vorschläge aus der Wortliste (nie aus der Codeliste) ----
export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
export function suggest(input, words, { max = 4 } = {}) {
  const w = normCode(String(input).replace(/[-\s]?\d+$/, ''));
  if (!w || w.length < 2) return [];
  const pre = words.filter((x) => x.startsWith(w) && x !== w);
  const out = pre.slice(0, max);
  if (out.length < max && w.length >= 4) {
    const typo = words.filter((x) => !out.includes(x) && x !== w && Math.abs(x.length - w.length) <= 2 && levenshtein(x, w) <= (w.length >= 7 ? 2 : 1))
      .sort((a, b) => levenshtein(a, w) - levenshtein(b, w) || a.localeCompare(b));
    out.push(...typo.slice(0, max - out.length));
  }
  return out;
}

// ---- Einheiten-Plan ----
export function isLinesVeilsUnit(unit, questDef = null) {
  if (!unit) return false;
  return !!(unit.linesAndVeils || LINES_VEILS_UNITS.includes(unit.id) || (questDef && questDef.linesAndVeils));
}
const moduleNr = (id) => Number((String(id || '').match(/m(\d+)$/) || [])[1] ?? -1);
const OPENED = ['offen', 'aktiv', 'fertig'];

// found = Ergebnis von resolveCode; units = content.units; states = state.units; linesVeils = Schalter der Lehrkraft
export function planUnlock(found, { units = [], states = {}, linesVeils = false, questDefs = null } = {}) {
  const plan = { open: [], kurz: [], veiled: [], already: false, unit: null };
  const q = (id) => (questDefs ? questDefs(id) : null);
  const stateOf = (id) => states[id] || 'gesperrt';
  const regular = units.filter((u) => !u.joker && !u.teacherOnly);
  const kurzUpTo = (nr) => { for (const u of regular) if (u.nr <= nr && stateOf(u.id) === 'gesperrt') plan.kurz.push(u.id); };
  if (!found) return plan;
  if (found.kind === 'unit') {
    const u = units.find((x) => x.id === found.id);
    if (!u) return plan;
    plan.unit = u;
    const st = stateOf(u.id);
    if (OPENED.includes(st)) plan.already = true;
    else if (linesVeils && isLinesVeilsUnit(u, q(u.id))) plan.veiled.push(u.id);
    else plan.open.push(u.id);
    // Frühere reguläre Einheiten ohne Code → Kurzfassung (DESIGN §10); ein Joker bringt die Einheiten bis 'after' mit
    if (!u.joker) kurzUpTo(u.nr - 1);
    else if (u.after) { const a = units.find((x) => x.id === u.after); if (a) kurzUpTo(a.nr); }
  } else if (found.kind === 'module') {
    const nr = moduleNr(found.id);
    for (const u of regular) if (moduleNr(u.module) <= nr && stateOf(u.id) === 'gesperrt') plan.kurz.push(u.id);
  } else if (found.kind === 'demo') {
    for (const u of units) if (!u.teacherOnly && stateOf(u.id) === 'gesperrt') plan.kurz.push(u.id);
  }
  return plan;
}

// Lines & Veils umschalten: an → offene/laufende L&V-Einheiten werden Kurzfassung; aus → per Code geöffnete zurück auf offen
export function planLinesVeils(active, { units = [], states = {}, codesUsed = [], questDefs = null } = {}) {
  const out = { toKurz: [], toOpen: [] };
  const q = (id) => (questDefs ? questDefs(id) : null);
  for (const u of units) {
    if (!isLinesVeilsUnit(u, q(u.id))) continue;
    const st = states[u.id] || 'gesperrt';
    if (active && (st === 'offen' || st === 'aktiv')) out.toKurz.push(u.id);
    if (!active && st === 'kurz' && codesUsed.includes('unit:' + u.id)) out.toOpen.push(u.id);
  }
  return out;
}

// ---- Texte ----
export const FRIENDLY_ERROR = 'Dieser Code passt hier nicht.';
export function friendlyError() { return FRIENDLY_ERROR; }
// Zum Vorlesen: Buchstaben einzeln, Zahl am Stück ('WELLE-KORN-11' → 'W, E, L, L, E, Strich, K, O, R, N, Strich, 11')
export function spellOut(code) {
  const parts = String(code || '').trim().toUpperCase().split(/[-\s]+/).filter(Boolean);
  return parts.map((p) => (/^\d+$/.test(p) ? p : p.split('').join(', '))).join(', Strich, ');
}
// Eingabe aus Wort und Zahlenrad zusammensetzen ('welle', 42 → 'WELLE-42'; ohne Zahl nur das Wort)
export function composeCode(word, number = null) {
  const w = String(word || '').trim().toUpperCase();
  if (number === null || number === undefined || number === '' || Number.isNaN(Number(number))) return w;
  return `${w}-${Number(number)}`;
}
