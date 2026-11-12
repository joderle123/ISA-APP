// Einstieg des Content-Validators (Node und Browser):
//   validateContent(entries, { knownSites }) → { errors, warnings, counts }
//     entries: [{ file, kind, name, def }]  (wie src/_gen/content.js oder tools/gen.mjs findContent + import)
//     knownSites: Liste von Ortsnamen der Insel (island.SITES), damit {site:'baumhaus'} aufgelöst wird
//   lintContent(entries) → { errors, warnings }   (Text-Regeln, siehe text.js)
//   formatIssue(issue) → '✘ datei · pfad · grund'
import { VALIDATORS } from './defs.js';
import { UNIT_IDS, REGION_IDS } from './consts.js';
import { createCtx, warn, isObj, isStr } from './util.js';
import { lintDef } from './text.js';
export * from './consts.js';
export { lintDef, collectTexts, countWords, hasForbidden, bubblesBeforeChoice } from './text.js';
export { checkCond, checkEffects, checkEffect, checkEcho } from './dsl.js';

export function validateContent(entries, { knownSites = [] } = {}) {
  const errors = [], warnings = [], refs = [];
  const counts = {};
  const reg = {}; // kind -> Set(id)
  const add = (kind, id) => { (reg[kind] = reg[kind] || new Set()).add(id); };
  const files = new Map();

  for (const e of entries) {
    const { file, kind, name, def } = e;
    counts[kind] = (counts[kind] || 0) + 1;
    const ctx = createCtx(file, kind, isObj(def) && def.id);
    if (!isObj(def)) { errors.push({ file, path: '', msg: 'export default muss ein Objekt sein' }); continue; }
    const id = def.id || name;
    if (reg[kind] && reg[kind].has(id)) errors.push({ file, path: 'id', msg: `${kind}/${id} ist doppelt (auch in ${files.get(kind + '/' + id)})` });
    add(kind, id);
    files.set(kind + '/' + id, file);
    if (isStr(def.id) && def.id !== name && !['cosmetics', 'collectibles'].includes(kind) && name !== undefined) warn(ctx, 'id', `id '${def.id}' und Dateiname '${name}' unterscheiden sich`);
    const v = VALIDATORS[kind];
    if (!v) { warn(ctx, '', `unbekannte Inhaltsart '${kind}' – nur Text-Linter`); }
    else { try { v(ctx, def); } catch (ex) { errors.push({ file, path: '', msg: 'Validator abgestürzt: ' + (ex && ex.message) }); } }
    errors.push(...ctx.errors); warnings.push(...ctx.warnings); refs.push(...ctx.refs);
    // Sekundär-IDs für Verweise
    if (kind === 'regions') {
      for (const s of Object.keys(def.sites || {})) add('site', `${def.id}.${s}`), add('regionSite', s);
      for (const g of def.gates || []) if (isObj(g)) add('gate', g.id);
      for (const p of (def.veil && def.veil.patches) || []) if (isObj(p)) add('patch', p.id);
      for (const c of def.climbables || []) if (isObj(c)) add('climbable', c.id);
    }
    if (kind === 'rooms') for (const s of Object.keys(def.spawns || {})) add('spawn', `${def.id}#${s}`);
    if (kind === 'cosmetics') for (const it of def.items || []) if (isObj(it)) add('cosmetic', it.id);
    if (kind === 'collectibles') for (const it of def.items || []) if (isObj(it)) add('collectible', it.id);
  }
  for (const s of knownSites) add('site', s);
  const KIND_MAP = { npc: 'npcs', dialogue: 'dialogues', minigame: 'minigames', room: 'rooms', gadget: 'gadgets', memory: 'memories', nachtwache: 'nachtwache', quest: 'quests', region: 'regions' };
  const LABEL = { unit: 'Einheit', npc: 'Figur', dialogue: 'Dialog', minigame: 'Minispiel', room: 'Raum', gadget: 'Gadget', memory: 'Erinnerung', nachtwache: 'Nachtwache', quest: 'Quest', region: 'Region', site: 'Ort', gate: 'Tor', patch: 'Schleier-Fleck', cosmetic: 'Kosmetik', climbable: 'Kletterfläche', spawn: 'Spawn', collectible: 'Sammelsache' };
  const exists = (kind, id) => {
    if (kind === 'unit') return UNIT_IDS.includes(id);
    if (kind === 'region') return REGION_IDS.includes(id);
    if (kind === 'site') return (reg.site && reg.site.has(id)) || (!id.includes('.') && reg.regionSite && reg.regionSite.has(id));
    const k = KIND_MAP[kind] || kind;
    return !!(reg[k] && reg[k].has(id));
  };
  for (const r of refs) {
    if (exists(r.kind, r.id)) continue;
    const issue = { file: r.file, path: r.path, msg: `${LABEL[r.kind] || r.kind} '${r.id}' gibt es nicht` };
    if (r.soft) warnings.push(issue); else errors.push(issue);
  }
  return { errors, warnings, counts, registry: Object.fromEntries(Object.entries(reg).map(([k, v]) => [k, [...v]])) };
}

export function lintContent(entries) {
  const errors = [], warnings = [];
  for (const e of entries) {
    if (!isObj(e.def)) continue;
    const r = lintDef(e.kind, e.def, e.file);
    errors.push(...r.errors); warnings.push(...r.warnings);
  }
  return { errors, warnings };
}

export function formatIssue(i, mark = '✘') {
  return `${mark} ${i.file}${i.path ? ' · ' + i.path : ''} · ${i.msg}`;
}
