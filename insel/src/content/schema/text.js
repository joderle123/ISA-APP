// Spielertexte einsammeln und prüfen (Gesetz 7: wenig Text; Gesetz 4: keine Übungswörter).
//   collectTexts(kind, def) → [{ path, role, text, teacher }]   role ∈ say|glimm|label|tile|caption|back|echteWelt|intro|name|other
//   lintDef(kind, def, file) → { errors:[{file,path,msg}], warnings }
//   countWords('…') · hasForbidden('…') → Wort | null · bubblesBeforeChoice(dialogue)
import { TEXT_LIMITS, FORBIDDEN_WORDS, TEACHER_FIELDS, MAX_BUBBLES_BEFORE_CHOICE } from './consts.js';
import { isObj, isStr, textOf } from './util.js';

export function countWords(s) {
  return String(s || '').split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}
const norm = (s) => String(s || '').toLowerCase().replace(/ß/g, 'ss');
export function hasForbidden(s) {
  const t = norm(s);
  for (const w of FORBIDDEN_WORDS) if (t.includes(norm(w))) return w;
  return null;
}

// Rolle nach Feldname; Kinder erben die Rolle (lines.greet[] → say, hints.glimm[] → glimm, line.fit → say)
const ROLE_BY_KEY = {
  say: 'say', greet: 'say', campfire: 'say', finale: 'say', line: 'say', lines: 'say', toast: 'say', laterTruth: 'say', chain: 'say',
  intro: 'intro', glimm: 'glimm', label: 'label', caption: 'caption', back: 'back', echteWelt: 'echteWelt', name: 'name',
  debrief: 'say', kursziele: 'say', tiles: 'tile',
};
// Schlüssel, deren Strings IDs/Farben/Namen von Dingen sind – nie Spielertext
const ID_KEYS = new Set(['id', 'unit', 'module', 'region', 'zone', 'site', 'icon', 'color', 'template', 'ruleset', 'kit', 'light', 'type', 'kind', 'slot',
  'npc', 'owner', 'dialogue', 'minigame', 'memory', 'room', 'gate', 'patch', 'flag', 'deed', 'grant', 'upgrade', 'feather', 'gadget', 'cosmetic', 'item',
  'speaker', 'anim', 'emote', 'goto', 'start', 'camera', 'tone', 'mode', 'medal', 'nebelkern', 'lichtkammer', 'interior', 'to', 'from', 'enter', 'spawn',
  'theme', 'season', 'builder', 'fach', 'use', 'tell', 'bluff', 'hairStyle', 'topStyle', 'silhouette', 'temperament', 'default', 'ability', 'jacket',
  'feeling', 'focus', 'scene', 'pose', 'facing', 'need', 'fits', 'input', 'partner', 'creature', 'rule', 'guide', 'board', 'win', 'source', 'cast',
  'stamp', 'quest', 'code', 'after', 'symbol', 'key', 'accent', 'tint', 'step', 'unlockAt', 'route', 'minMedal', 'bottomsStyle', 'accessory', 'skin', 'hair',
  'top', 'bottoms', 'shoes', 'accessoryColor', 'surname', 'steps', 'props', 'layers', 'dyes', 'rennstrecken', 'templates', 'pulsSources', 'nachtwache', 'npcs',
  'tracks', 'litBy', 'needs', 'requires', 'when', 'perSave', 'zones', 'seed', 'x', 'y', 'z', 'r']);

export function collectTexts(kind, def) {
  const out = [];
  const push = (path, role, text, teacher) => out.push({ path: path.join('.'), role, text, teacher });
  const walk = (v, path, role, teacher) => {
    if (isStr(v)) { if (role) push(path, role, v, teacher); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, path.concat(i), role, teacher)); return; }
    if (!isObj(v)) return;
    if (isStr(v.t)) { push(path.concat('t'), role || 'tile', v.t, teacher); return; }   // Text-Objekt { t, tts?, icon? }
    for (const k of Object.keys(v)) {
      const child = v[k];
      const isTeacher = teacher || TEACHER_FIELDS.includes(k);
      let r = ROLE_BY_KEY[k];
      if (k === 'title') r = (kind === 'quests' || kind === 'minigames') ? 'name' : undefined;
      if (r === undefined && ID_KEYS.has(k)) continue;
      if (kind === 'glimm' && r === undefined && !ID_KEYS.has(k)) r = 'glimm';
      walk(child, path.concat(k), r !== undefined ? r : role, isTeacher);
    }
  };
  walk(def, [], undefined, false);
  return out;
}

// Alle Strings (außer Lehrer-Feldern) für die Verbotsliste
function allStrings(def) {
  const out = [];
  const walk = (v, path, teacher) => {
    if (isStr(v)) { if (!teacher) out.push({ path: path.join('.'), text: v }); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, path.concat(i), teacher)); return; }
    if (!isObj(v)) return;
    for (const k of Object.keys(v)) {
      if (!teacher && !/^\d+$/.test(k)) out.push({ path: path.concat(k).join('.'), text: k });   // auch Schlüssel (Orts-/ID-Namen)
      walk(v[k], path.concat(k), teacher || TEACHER_FIELDS.includes(k));
    }
  };
  walk(def, [], false);
  return out;
}

// Sprechblasen vor einer Wahl (Dialog): Knoten mit Wahl + Kette von Vorgängern ohne Wahl, die nur per goto hineinführen
export function bubblesBeforeChoice(dialogue) {
  const nodes = (dialogue && dialogue.nodes) || {};
  const preds = {};
  for (const [id, n] of Object.entries(nodes)) {
    if (isObj(n) && isStr(n.goto) && !n.choices) (preds[n.goto] = preds[n.goto] || []).push(id);
  }
  const out = [];
  for (const [id, n] of Object.entries(nodes)) {
    if (!isObj(n) || !Array.isArray(n.choices)) continue;
    let count = n.say ? 1 : 0;
    let cur = id;
    const seen = new Set([id]);
    while (preds[cur] && preds[cur].length === 1 && !seen.has(preds[cur][0])) {
      cur = preds[cur][0];
      seen.add(cur);
      if (nodes[cur] && nodes[cur].say) count++;
    }
    out.push({ node: id, bubbles: count });
  }
  return out;
}

export function lintDef(kind, def, file = '?') {
  const errors = [], warnings = [];
  const E = (path, msg) => errors.push({ file, path, msg });
  const W = (path, msg) => warnings.push({ file, path, msg });
  for (const s of allStrings(def)) {
    const bad = hasForbidden(s.text);
    if (bad) E(s.path, `Übungswort „${bad}“ ist im Spiel verboten (Gesetz 4): „${s.text}“`);
  }
  for (const t of collectTexts(kind, def)) {
    if (t.teacher) continue;
    const n = countWords(t.text);
    const limit = TEXT_LIMITS[t.role];
    if (limit && n > limit) E(t.path, `${t.role.toUpperCase()} hat ${n} Wörter, erlaubt ≤ ${limit}: „${t.text}“`);
    if (t.role === 'say' && /(^|\s)(Sie|Ihnen)(\s|[.,!?]|$)/.test(t.text) && !/^(Sie|Ihnen)/.test(t.text)) W(t.path, `Sieht nach Sie-Form aus (du-Form gewünscht): „${t.text}“`);
  }
  if (kind === 'dialogues') {
    for (const b of bubblesBeforeChoice(def)) {
      if (b.bubbles > MAX_BUBBLES_BEFORE_CHOICE) E(`nodes.${b.node}`, `${b.bubbles} Blasen vor einer Wahl, erlaubt ≤ ${MAX_BUBBLES_BEFORE_CHOICE}`);
    }
  }
  if (kind === 'quests') {
    if (!isObj(def.patch) || !isStr(def.patch.back) || !def.patch.back.trim()) E('patch.back', 'Jede Quest braucht eine Aufnäher-Rückseite (patch.back)');
    if (!textOf(def.echteWelt).trim()) E('echteWelt', 'Jede Quest braucht eine Echte-Welt-Karte (echteWelt)');
    if (!Array.isArray(def.debrief) || !def.debrief.length || !def.debrief.every((d) => isStr(d) && d.trim())) E('debrief', 'Jede Quest braucht 1–2 Debrief-Fragen (debrief)');
    else if (def.debrief.length > 2) W('debrief', 'Mehr als 2 Debrief-Fragen');
    if (!textOf(def.glimm).trim()) E('glimm', 'Jede Quest braucht eine Glimm-Zeile (glimm)');
  }
  return { errors, warnings };
}
