// Kleine Prüf-Helfer für die Schema-Validatoren (ohne Fremdbibliothek).
// ctx = { file, kind, id, errors: [], warnings: [], refs: [] }; Fehler: { file, path, msg }
export const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export const isStr = (v) => typeof v === 'string';
export const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
export const isBool = (v) => typeof v === 'boolean';
export const isText = (v) => (isStr(v) && v.length > 0) || (isObj(v) && isStr(v.t) && v.t.length > 0);
export const textOf = (v) => (isStr(v) ? v : isObj(v) && isStr(v.t) ? v.t : '');
export const ID_RE = /^[a-z0-9]+(?:[-.][a-z0-9]+)*$/;   // ASCII-kebab-case (auch a.b für Upgrades)
export const isId = (v) => isStr(v) && ID_RE.test(v);
export const isColor = (v) => isStr(v) && /^#[0-9a-fA-F]{6}$/.test(v);

export function createCtx(file, kind, id) {
  return { file, kind, id: id || '?', errors: [], warnings: [], refs: [] };
}
export function err(ctx, path, msg) { ctx.errors.push({ file: ctx.file, path: pathStr(path), msg }); return false; }
export function warn(ctx, path, msg) { ctx.warnings.push({ file: ctx.file, path: pathStr(path), msg }); return false; }
export const pathStr = (p) => (Array.isArray(p) ? p.filter((x) => x !== '' && x !== undefined).join('.') : String(p || ''));
export const sub = (path, key) => (Array.isArray(path) ? path.concat([key]) : [path, key]);

// Verweis merken (wird nach dem Sammeln aller Inhalte aufgelöst): kind ∈ unit|npc|dialogue|minigame|room|gadget|memory|nachtwache|cosmetic|region|site|gate|patch|quest|climbable|spawn
export function ref(ctx, path, kind, id, { soft = false } = {}) {
  ctx.refs.push({ file: ctx.file, path: pathStr(path), kind, id, soft });
}

export function req(ctx, obj, key, test, what, path = []) {
  if (!isObj(obj) || obj[key] === undefined) return err(ctx, sub(path, key), `Pflichtfeld fehlt (${what})`);
  if (!test(obj[key])) return err(ctx, sub(path, key), `falscher Typ, erwartet ${what}`);
  return true;
}
export function opt(ctx, obj, key, test, what, path = []) {
  if (!isObj(obj) || obj[key] === undefined) return true;
  if (!test(obj[key])) return err(ctx, sub(path, key), `falscher Typ, erwartet ${what}`);
  return true;
}
export function oneOf(ctx, path, val, list, what) {
  if (list.includes(val)) return true;
  return err(ctx, path, `${what || 'Wert'} '${val}' unbekannt – erlaubt: ${list.join(', ')}`);
}
export function range(ctx, path, val, min, max, what = 'Zahl') {
  if (!isNum(val)) return err(ctx, path, `${what} fehlt oder ist keine Zahl`);
  if (val < min || val > max) return err(ctx, path, `${what} ${val} außerhalb von ${min}–${max}`);
  return true;
}
export function arrayOf(ctx, path, val, test, what, { min = 0 } = {}) {
  if (!Array.isArray(val)) return err(ctx, path, `Liste erwartet (${what})`);
  if (val.length < min) return err(ctx, path, `mindestens ${min} Eintrag/Einträge (${what})`);
  let ok = true;
  val.forEach((v, i) => { if (!test(v, i)) { err(ctx, sub(path, i), `ungültiger Eintrag (${what})`); ok = false; } });
  return ok;
}
// Pos = { x, z, y? } | { site: 'baumhaus' } | { site: 'strand.muschelbucht' } | [x, y, z] (nur in Räumen)
export function checkPos(ctx, path, pos, { allowArray = false } = {}) {
  if (allowArray && Array.isArray(pos)) {
    if (pos.length === 3 && pos.every(isNum)) return true;
    return err(ctx, path, 'Raum-Position [x, y, z] erwartet');
  }
  if (!isObj(pos)) return err(ctx, path, 'Position erwartet: {x,z} oder {site}');
  if (isStr(pos.site)) { ref(ctx, path, 'site', pos.site); return true; }
  if (isNum(pos.x) && isNum(pos.z)) { if (pos.y !== undefined && !isNum(pos.y)) return err(ctx, sub(path, 'y'), 'y muss eine Zahl sein'); return true; }
  return err(ctx, path, 'Position braucht x und z oder site');
}
export function unitRef(ctx, path, id) {
  if (!isStr(id)) return err(ctx, path, 'Einheiten-ID erwartet (z. B. j1-e11)');
  ref(ctx, path, 'unit', id);
  return true;
}
