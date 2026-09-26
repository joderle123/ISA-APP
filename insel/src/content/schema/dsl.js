// Bedingungen (Cond) und Effekte (Effect) des Content-Schemas – Validierung ohne Auswertung.
// Auswertung übernehmen später die Systeme (Quest-/Dialog-Engine); hier wird nur die Form geprüft.
import { EMOTIONS, TANKS, MODES, ABILITIES, UPGRADES, VEIL_ZONES, AMPEL_ZONEN } from './consts.js';
import { isObj, isStr, isNum, isBool, isText, err, warn, ref, sub, oneOf, range, checkPos, unitRef } from './util.js';

const OPS = ['<', '<=', '>', '>=', '==', '!='];
const isOp = (v) => OPS.includes(v);

export function checkCond(ctx, path, c) {
  if (!isObj(c)) return err(ctx, path, 'Bedingung muss ein Objekt sein');
  const keys = Object.keys(c);
  if (keys.length !== 1) return err(ctx, path, `Bedingung braucht genau einen Schlüssel (gefunden: ${keys.join(', ') || 'keiner'})`);
  const k = keys[0], v = c[k], p = sub(path, k);
  switch (k) {
    case 'unit': case 'unitDone': return unitRef(ctx, p, v);
    case 'ability': return isStr(v) ? oneOf(ctx, p, v, ABILITIES, 'Fähigkeit') : err(ctx, p, 'Fähigkeits-ID erwartet');
    case 'upgrade': return isStr(v) ? oneOf(ctx, p, v, UPGRADES, 'Upgrade') : err(ctx, p, 'Upgrade-ID erwartet');
    case 'feather': return isStr(v) ? oneOf(ctx, p, v, EMOTIONS, 'Feder') : err(ctx, p, 'Feder = Emotion erwartet');
    case 'item': case 'deed': case 'collectible': return isStr(v) ? true : err(ctx, p, 'ID erwartet');
    case 'flag':
      if (isStr(v)) return true;
      if (Array.isArray(v) && v.length === 3 && isStr(v[0]) && isOp(v[1])) return true;
      return err(ctx, p, "flag: 'name' oder ['name', op, wert]");
    case 'bond':
      if (Array.isArray(v) && v.length === 2 && isStr(v[0]) && isNum(v[1])) { ref(ctx, p, 'npc', v[0]); return range(ctx, p, v[1], 0, 3, 'Bindung'); }
      return err(ctx, p, "bond: ['npc', stufe]");
    case 'time':
      if (v === 'night' || v === 'day') return true;
      if (Array.isArray(v) && v.length === 2 && v.every(isNum)) return true;
      return err(ctx, p, "time: 'night' | 'day' | [von, bis]");
    case 'puls':
      if (Array.isArray(v) && v.length === 2 && isOp(v[0]) && isNum(v[1])) return range(ctx, p, v[1], 0, 100, 'Puls');
      return err(ctx, p, "puls: [op, zahl]");
    case 'npcHitze':
      if (Array.isArray(v) && v.length === 3 && isStr(v[0]) && isOp(v[1]) && isNum(v[2])) { ref(ctx, p, 'npc', v[0]); return true; }
      return err(ctx, p, "npcHitze: ['npc', op, zahl]");
    case 'mode': return isStr(v) ? oneOf(ctx, p, v, MODES, 'Modus') : err(ctx, p, 'Modus erwartet');
    case 'shard': return range(ctx, p, v, 1, 9, 'Splitter');
    case 'regionFreed': return isStr(v) ? (ref(ctx, p, 'region', v), true) : err(ctx, p, 'Regions-ID erwartet');
    case 'medal':
      if (Array.isArray(v) && v.length === 2 && isStr(v[0]) && isStr(v[1])) { ref(ctx, p, 'minigame', v[0]); return true; }
      return err(ctx, p, "medal: ['minigame', 'bronze'|'silber'|'gold'|'stern']");
    case 'all': case 'any':
      if (!Array.isArray(v) || !v.length) return err(ctx, p, `${k}: Liste von Bedingungen erwartet`);
      return v.map((c2, i) => checkCond(ctx, sub(p, i), c2)).every(Boolean);
    case 'not': return checkCond(ctx, p, v);
    default: return err(ctx, p, `unbekannte Bedingung '${k}'`);
  }
}

export function checkConds(ctx, path, list) {
  if (list === undefined) return true;
  if (isObj(list)) return checkCond(ctx, path, list);
  if (!Array.isArray(list)) return err(ctx, path, 'Bedingung(en) erwartet');
  return list.map((c, i) => checkCond(ctx, sub(path, i), c)).every(Boolean);
}

// Echo: nur positiv oder mit Reparatur – sonst Fehler (Gesetz 6)
export function checkEcho(ctx, path, e) {
  if (!isObj(e)) return err(ctx, path, 'Echo muss ein Objekt sein');
  let ok = true;
  if (!isStr(e.id)) ok = err(ctx, sub(path, 'id'), 'Echo braucht eine id');
  if (e.when !== undefined) ok = checkCond(ctx, sub(path, 'when'), e.when) && ok;
  if (e.delay !== undefined && !(isObj(e.delay) && (isNum(e.delay.days) || isNum(e.delay.sessions)))) ok = err(ctx, sub(path, 'delay'), 'delay: {days} oder {sessions}');
  const negative = isObj(e.effect) && Array.isArray(e.effect.mood) && e.effect.mood[1] === 'verstimmt';
  const hasRepair = isObj(e.repair) && isStr(e.repair.quest);
  if (e.effect !== undefined) {
    if (!isObj(e.effect)) ok = err(ctx, sub(path, 'effect'), 'effect muss ein Objekt sein');
    else if (e.effect.mood !== undefined) {
      const m = e.effect.mood;
      if (!(Array.isArray(m) && m.length === 2 && isStr(m[0]) && ['verstimmt', 'froh', 'dankbar', 'stolz'].includes(m[1]))) ok = err(ctx, sub(path, 'effect.mood'), "mood: ['npc', 'verstimmt'|'froh'|'dankbar'|'stolz']");
      else ref(ctx, sub(path, 'effect.mood'), 'npc', m[0]);
    } else ok = checkEffectObj(ctx, sub(path, 'effect'), e.effect) && ok;
  }
  if (negative && !hasRepair) ok = err(ctx, path, "negatives Echo ('verstimmt') braucht repair: { quest, clears } – Bindungen sinken nie dauerhaft");
  if (hasRepair) ref(ctx, sub(path, 'repair.quest'), 'quest', e.repair.quest, { soft: true });
  if (e.line !== undefined) {
    if (!isObj(e.line) || !isStr(e.line.npc) || !isText(e.line.say)) ok = err(ctx, sub(path, 'line'), 'line: { npc, say }');
    else ref(ctx, sub(path, 'line.npc'), 'npc', e.line.npc);
  }
  return ok;
}

function checkEffectObj(ctx, path, e) {
  const keys = Object.keys(e).filter((k) => k !== 'set');
  if (keys.length !== 1) return err(ctx, path, `Effekt braucht genau einen Schlüssel (gefunden: ${Object.keys(e).join(', ') || 'keiner'})`);
  const k = keys[0], v = e[k], p = sub(path, k);
  switch (k) {
    case 'flag': return isStr(v) ? true : err(ctx, p, "flag: 'name' (mit set: wert)");
    case 'bond':
      if (Array.isArray(v) && v.length === 2 && isStr(v[0]) && isNum(v[1])) { ref(ctx, p, 'npc', v[0]); if (v[1] < 0) return err(ctx, p, 'Bindung darf nie sinken (nur „verstimmt“ über ein Echo mit Reparatur)'); return true; }
      return err(ctx, p, "bond: ['npc', +n]");
    case 'deed': return isStr(v) ? true : err(ctx, p, 'Tat-ID erwartet');
    case 'tank':
      if (!isObj(v)) return err(ctx, p, 'tank: { npc, tank, add, kind }');
      if (!isStr(v.npc)) return err(ctx, sub(p, 'npc'), 'npc fehlt');
      ref(ctx, sub(p, 'npc'), 'npc', v.npc);
      if (!oneOf(ctx, sub(p, 'tank'), v.tank, TANKS, 'Tank')) return false;
      if (!isNum(v.add)) return err(ctx, sub(p, 'add'), 'add muss eine Zahl sein');
      if (v.kind !== undefined && !['need', 'wish'].includes(v.kind)) return err(ctx, sub(p, 'kind'), "kind: 'need' | 'wish'");
      return true;
    case 'puls': return isNum(v) ? true : err(ctx, p, 'puls: Zahl (±)');
    case 'npcHitze':
      if (Array.isArray(v) && v.length === 2 && isStr(v[0]) && isNum(v[1])) { ref(ctx, p, 'npc', v[0]); return true; }
      return err(ctx, p, "npcHitze: ['npc', ±n]");
    case 'emotion': {
      if (!isObj(v) || !isStr(v.npc)) return err(ctx, p, 'emotion: { npc, primary:[emotion, 0–10], secondary? }');
      ref(ctx, sub(p, 'npc'), 'npc', v.npc);
      const pair = (key) => {
        const x = v[key];
        if (x === undefined) return true;
        if (!(Array.isArray(x) && x.length === 2 && EMOTIONS.includes(x[0]) && isNum(x[1]) && x[1] >= 0 && x[1] <= 10)) return err(ctx, sub(p, key), `${key}: [emotion, 0–10]`);
        return true;
      };
      return pair('primary') && pair('secondary');
    }
    case 'grant': return isStr(v) ? oneOf(ctx, p, v, ABILITIES, 'Fähigkeit') : err(ctx, p, 'Fähigkeit erwartet');
    case 'upgrade': return isStr(v) ? oneOf(ctx, p, v, UPGRADES, 'Upgrade') : err(ctx, p, 'Upgrade erwartet');
    case 'feather': return isStr(v) ? oneOf(ctx, p, v, EMOTIONS, 'Feder') : err(ctx, p, 'Feder erwartet');
    case 'gadget': return isStr(v) ? (ref(ctx, p, 'gadget', v), true) : err(ctx, p, 'Gadget-ID erwartet');
    case 'wurzel': case 'item': return isStr(v) ? true : err(ctx, p, 'ID erwartet');
    case 'veil':
      if (!isObj(v)) return err(ctx, p, 'veil: { zone, to, from? }');
      if (!oneOf(ctx, sub(p, 'zone'), v.zone, VEIL_ZONES, 'Zone')) return false;
      if (!range(ctx, sub(p, 'to'), v.to, 0, 1, 'Schleier-Anteil')) return false;
      if (v.from !== undefined) return checkPos(ctx, sub(p, 'from'), v.from);
      return true;
    case 'relapse':
      if (!isObj(v) || !isStr(v.patch)) return err(ctx, p, 'relapse: { patch, to }');
      ref(ctx, sub(p, 'patch'), 'patch', v.patch);
      return range(ctx, sub(p, 'to'), v.to, 0, 1, 'Schleier-Anteil');
    case 'patch': return unitRef(ctx, p, v);
    case 'lichtsplitter': return isNum(v) && v > 0 ? true : err(ctx, p, 'lichtsplitter: Anzahl > 0');
    case 'cosmetic': return isStr(v) ? (ref(ctx, p, 'cosmetic', v, { soft: true }), true) : err(ctx, p, 'Kosmetik-ID erwartet');
    case 'shard': return range(ctx, p, v, 1, 9, 'Splitter');
    case 'echo': return checkEcho(ctx, p, v);
    case 'quest':
      if (Array.isArray(v) && v.length === 2 && ['start', 'complete', 'offer'].includes(v[0]) && isStr(v[1])) { ref(ctx, p, 'quest', v[1]); return true; }
      return err(ctx, p, "quest: ['start'|'complete'|'offer', 'quest-id']");
    case 'scene':
      if (!isObj(v)) return err(ctx, p, 'scene: { enter, spawn? } | { exit: true }');
      if (v.exit === true) return true;
      if (!isStr(v.enter)) return err(ctx, sub(p, 'enter'), 'Raum-ID erwartet');
      ref(ctx, sub(p, 'enter'), 'room', v.enter);
      if (v.spawn !== undefined) { if (!isStr(v.spawn)) return err(ctx, sub(p, 'spawn'), 'spawn: Name erwartet'); ref(ctx, sub(p, 'spawn'), 'spawn', v.enter + '#' + v.spawn); }
      return true;
    case 'glimm': return isText(v) ? true : err(ctx, p, 'glimm: Text erwartet');
    case 'anim':
      if (!isObj(v) || !isStr(v.npc) || !isStr(v.emote)) return err(ctx, p, 'anim: { npc, emote }');
      ref(ctx, sub(p, 'npc'), 'npc', v.npc);
      return true;
    case 'gate':
      if (!isObj(v) || !(isStr(v.open) || isStr(v.close))) return err(ctx, p, 'gate: { open } | { close }');
      ref(ctx, p, 'gate', v.open || v.close);
      return true;
    case 'mood':
      if (Array.isArray(v) && v.length === 2 && isStr(v[0])) { ref(ctx, p, 'npc', v[0]); return v[1] === 'verstimmt' ? err(ctx, p, "'verstimmt' nur über ein Echo mit Reparatur") : true; }
      return err(ctx, p, "mood: ['npc', 'froh'|'dankbar'|'stolz']");
    case 'ampel':
      if (!isObj(v)) return err(ctx, p, 'ampel: { zone, gadget }');
      return oneOf(ctx, sub(p, 'zone'), v.zone, AMPEL_ZONEN.concat(['notfall']), 'Ampel-Zone');
    case 'toast': case 'say': return isText(v) ? true : err(ctx, p, 'Text erwartet');
    case 'sound': return isStr(v) ? true : err(ctx, p, 'Klang-ID erwartet');
    case 'wait': return isNum(v) && v >= 0 ? true : err(ctx, p, 'Sekunden erwartet');
    default: return err(ctx, p, `unbekannter Effekt '${k}'`);
  }
}

export function checkEffects(ctx, path, list) {
  if (list === undefined) return true;
  if (!Array.isArray(list)) return err(ctx, path, 'Liste von Effekten erwartet');
  return list.map((e, i) => (isObj(e) ? checkEffectObj(ctx, sub(path, i), e) : err(ctx, sub(path, i), 'Effekt muss ein Objekt sein'))).every(Boolean);
}
export const checkEffect = (ctx, path, e) => (isObj(e) ? checkEffectObj(ctx, path, e) : err(ctx, path, 'Effekt muss ein Objekt sein'));
export { isBool, warn };
