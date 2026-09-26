// Validatoren je Inhaltsart (CONTENT-SCHEMA.md). Jede Funktion: (ctx, def) → boolean; Fehler landen in ctx.errors,
// Verweise in ctx.refs (werden in index.js gegen die Registry aufgelöst).
import * as C from './consts.js';
import { isObj, isStr, isNum, isBool, isText, isId, isColor, err, warn, ref, sub, req, opt, oneOf, range, arrayOf, checkPos, unitRef } from './util.js';
import { checkCond, checkConds, checkEffects, checkEcho } from './dsl.js';

const isList = (v) => Array.isArray(v);
const strList = (v) => isList(v) && v.every(isStr);
const vec3 = (v) => isList(v) && v.length === 3 && v.every(isNum);
const emoPair = (v) => isList(v) && v.length === 2 && C.EMOTIONS.includes(v[0]) && isNum(v[1]) && v[1] >= 0 && v[1] <= 10;

function baseId(ctx, def, { unit = false } = {}) {
  if (!isStr(def.id) || !def.id) return err(ctx, 'id', 'id fehlt');
  if (!isId(def.id)) return err(ctx, 'id', `id '${def.id}' muss ASCII-kebab-case sein`);
  if (unit && /^j1-/.test(def.id) && !C.UNIT_IDS.includes(def.id)) return err(ctx, 'id', `'${def.id}' ist keine Einheit (j1-e01…e30, j1-j01…j09)`);
  return true;
}

// ---- RegionDef ----
export function regions(ctx, d) {
  let ok = baseId(ctx, d);
  if (ok && !C.REGION_IDS.includes(d.id)) ok = err(ctx, 'id', `Region '${d.id}' unbekannt – erlaubt: ${C.REGION_IDS.join(', ')}`);
  ok = req(ctx, d, 'module', (v) => C.MODULE_IDS.includes(v), 'Modul j1-m0…m9') && ok;
  ok = req(ctx, d, 'name', isText, 'Text') && ok;
  if (d.veil !== undefined) {
    const v = d.veil, p = ['veil'];
    if (!isObj(v)) ok = err(ctx, p, 'veil: { zone, start, steps, patches? }');
    else {
      if (v.zone !== undefined) ok = oneOf(ctx, sub(p, 'zone'), v.zone, C.VEIL_ZONES, 'Zone') && ok;
      if (v.start !== undefined) ok = range(ctx, sub(p, 'start'), v.start, 0, 1, 'Schleier-Start') && ok;
      if (v.steps !== undefined) {
        if (!isObj(v.steps)) ok = err(ctx, sub(p, 'steps'), 'steps: { einheit: anteil }');
        else for (const [u, a] of Object.entries(v.steps)) { unitRef(ctx, sub(p, 'steps'), u); ok = range(ctx, [...p, 'steps', u], a, 0, 1, 'Schleier-Anteil') && ok; }
      }
      if (v.patches !== undefined) ok = arrayOf(ctx, sub(p, 'patches'), v.patches, (x, i) => {
        if (!isObj(x) || !isId(x.id)) return false;
        const q = [...p, 'patches', i];
        let o = range(ctx, sub(q, 'x'), x.x, -240, 240, 'x') && range(ctx, sub(q, 'z'), x.z, -240, 240, 'z') && range(ctx, sub(q, 'r'), x.r, 1, 80, 'Radius');
        if (x.start !== undefined) o = range(ctx, sub(q, 'start'), x.start, 0, 1, 'Start') && o;
        if (x.freeAt !== undefined) o = unitRef(ctx, sub(q, 'freeAt'), x.freeAt) && o;
        return o;
      }, 'Flecken {id,x,z,r,start?,freeAt?}') && ok;
    }
  }
  if (d.teaserFrom !== undefined) ok = unitRef(ctx, 'teaserFrom', d.teaserFrom) && ok;
  if (d.palette !== undefined) {
    if (!isObj(d.palette)) ok = err(ctx, 'palette', 'palette: { key, accent, dyes }');
    else {
      for (const k of ['key', 'accent']) if (d.palette[k] !== undefined && !isColor(d.palette[k])) ok = err(ctx, ['palette', k], 'Farbe #rrggbb erwartet');
      if (d.palette.dyes !== undefined && !(isList(d.palette.dyes) && d.palette.dyes.every(isColor))) ok = err(ctx, 'palette.dyes', 'Liste von Farben #rrggbb erwartet');
    }
  }
  if (d.season !== undefined) ok = oneOf(ctx, 'season', d.season, C.SEASONS, 'Jahreszeit') && ok;
  if (d.music !== undefined && !(isObj(d.music) && isStr(d.music.theme) && (d.music.layers === undefined || strList(d.music.layers)))) ok = err(ctx, 'music', 'music: { theme, layers:[…] }');
  const siteNames = new Set();
  if (d.sites !== undefined) {
    if (!isObj(d.sites)) ok = err(ctx, 'sites', 'sites: { name: {x, z, …} }');
    else for (const [name, s] of Object.entries(d.sites)) {
      siteNames.add(name);
      if (!isObj(s) || !isNum(s.x) || !isNum(s.z)) { ok = err(ctx, ['sites', name], 'Ort braucht x und z'); continue; }
      if (s.r !== undefined && !isNum(s.r)) ok = err(ctx, ['sites', name, 'r'], 'r muss eine Zahl sein');
      if (s.y !== undefined && !isNum(s.y)) ok = err(ctx, ['sites', name, 'y'], 'y muss eine Zahl sein');
      if (s.interior !== undefined) { if (!isStr(s.interior)) ok = err(ctx, ['sites', name, 'interior'], 'Raum-ID erwartet'); else ref(ctx, ['sites', name, 'interior'], 'room', s.interior); }
    }
  }
  const localSite = (path, v) => { if (!isStr(v)) return err(ctx, path, 'Ortsname erwartet'); if (!siteNames.has(v)) ref(ctx, path, 'site', v); return true; };
  if (d.signalfeuer !== undefined) ok = arrayOf(ctx, 'signalfeuer', d.signalfeuer, (s, i) => {
    if (!isObj(s) || !isId(s.id)) return false;
    let o = localSite(['signalfeuer', i, 'site'], s.site);
    if (s.litBy !== undefined) o = checkCond(ctx, ['signalfeuer', i, 'litBy'], s.litBy) && o;
    return o;
  }, 'Signalfeuer {id, site, litBy?}') && ok;
  if (d.gates !== undefined) ok = arrayOf(ctx, 'gates', d.gates, (g, i) => {
    if (!isObj(g) || !isId(g.id)) return false;
    const p = ['gates', i];
    let o = oneOf(ctx, sub(p, 'type'), g.type, C.GATE_TYPES, 'Tor-Typ');
    if (g.needs !== undefined) o = checkCond(ctx, sub(p, 'needs'), g.needs) && o;
    if (g.params !== undefined && !isObj(g.params)) o = err(ctx, sub(p, 'params'), 'params muss ein Objekt sein');
    o = checkPos(ctx, sub(p, 'pos'), g.pos) && o;
    return o;
  }, 'Tore {id, type, needs?, params?, pos}') && ok;
  if (d.climbables !== undefined) ok = arrayOf(ctx, 'climbables', d.climbables, (c, i) => {
    if (!isObj(c) || !isId(c.id)) return false;
    const p = ['climbables', i];
    let o = oneOf(ctx, sub(p, 'kind'), c.kind, C.CLIMB_KINDS, 'Kletterart');
    o = checkPos(ctx, sub(p, 'pos'), c.pos) && o;
    if (c.height !== undefined) o = range(ctx, sub(p, 'height'), c.height, 1, 120, 'Höhe') && o;
    return o;
  }, 'Kletterflächen {id, kind, pos, height}') && ok;
  if (d.lichtkammer !== undefined && !isStr(d.lichtkammer)) ok = err(ctx, 'lichtkammer', 'Lichtkammer-ID erwartet');
  if (d.rennstrecken !== undefined) { if (!strList(d.rennstrecken)) ok = err(ctx, 'rennstrecken', 'Liste von Minispiel-IDs'); else d.rennstrecken.forEach((r, i) => ref(ctx, ['rennstrecken', i], 'minigame', r, { soft: true })); }
  if (d.nebelkern !== undefined && !isStr(d.nebelkern)) ok = err(ctx, 'nebelkern', 'Nebelkern-ID erwartet');
  if (d.aussichtspunkte !== undefined) ok = arrayOf(ctx, 'aussichtspunkte', d.aussichtspunkte, (a) => isObj(a) && isId(a.id) && isNum(a.x) && isNum(a.z) && (a.y === undefined || isNum(a.y)), 'Aussichtspunkte {id,x,z,y?}') && ok;
  if (d.npcs !== undefined) { if (!strList(d.npcs)) ok = err(ctx, 'npcs', 'Liste von Figuren-IDs'); else d.npcs.forEach((n, i) => ref(ctx, ['npcs', i], 'npc', n)); }
  if (d.ambient !== undefined && !(isObj(d.ambient) && isNum(d.ambient.count))) ok = err(ctx, 'ambient', 'ambient: { count, seed? }');
  return ok;
}

// ---- NpcDef ----
export function npcs(ctx, d) {
  let ok = baseId(ctx, d);
  ok = req(ctx, d, 'name', isText, 'Name') && ok;
  ok = opt(ctx, d, 'surname', isStr, 'Nachname') && ok;
  ok = opt(ctx, d, 'age', isNum, 'Alter') && ok;
  ok = opt(ctx, d, 'renameable', isBool, 'true/false') && ok;
  ok = req(ctx, d, 'icon', isStr, 'Icon-Name') && ok;
  ok = req(ctx, d, 'color', isColor, 'Farbe #rrggbb') && ok;
  ok = opt(ctx, d, 'silhouette', isStr, 'Silhouette') && ok;
  if (d.introducedIn !== undefined) ok = unitRef(ctx, 'introducedIn', d.introducedIn) && ok;
  ok = opt(ctx, d, 'look', isObj, 'Aussehen-Objekt') && ok;
  if (d.voice !== undefined && !(isObj(d.voice) && (d.voice.pitch === undefined || isNum(d.voice.pitch)) && (d.voice.rate === undefined || isNum(d.voice.rate)))) ok = err(ctx, 'voice', 'voice: { pitch, rate }');
  if (d.schedule !== undefined) ok = arrayOf(ctx, 'schedule', d.schedule, (s, i) => {
    if (!isObj(s)) return false;
    const p = ['schedule', i];
    let o = range(ctx, sub(p, 'from'), s.from, 0, 24, 'from') && range(ctx, sub(p, 'to'), s.to, 0, 24, 'to');
    if (!isStr(s.site)) o = err(ctx, sub(p, 'site'), 'Ort erwartet'); else ref(ctx, sub(p, 'site'), 'site', s.site);
    if (s.anim !== undefined && !isStr(s.anim)) o = err(ctx, sub(p, 'anim'), 'Animationsname erwartet');
    return o;
  }, 'Tagesablauf {from,to,site,anim?,hidden?}') && ok;
  if (d.emotion !== undefined) {
    const b = isObj(d.emotion) && d.emotion.base;
    if (!isObj(b) || !emoPair(b.primary) || (b.secondary !== undefined && !emoPair(b.secondary))) ok = err(ctx, 'emotion', 'emotion: { base: { primary:[emotion,0–10], secondary? } }');
  }
  if (d.tanks !== undefined) {
    if (!isObj(d.tanks)) ok = err(ctx, 'tanks', 'tanks: { koerper, sicherheit, … } 0–100');
    else for (const [k, v] of Object.entries(d.tanks)) { if (!C.TANKS.includes(k)) ok = err(ctx, ['tanks', k], `unbekannter Tank – erlaubt: ${C.TANKS.join(', ')}`); else ok = range(ctx, ['tanks', k], v, 0, 100, 'Tank') && ok; }
  }
  if (d.boundary !== undefined) {
    const b = d.boundary;
    if (!isObj(b) || !(isList(b.byBond) && b.byBond.length === 4 && b.byBond.every(isNum))) ok = err(ctx, 'boundary', 'boundary: { byBond:[4 Radien], mood?:{emotion: faktor} }');
    else if (b.mood !== undefined) for (const k of Object.keys(b.mood)) if (!C.EMOTIONS.includes(k) || !isNum(b.mood[k])) ok = err(ctx, ['boundary', 'mood', k], 'Emotion → Zahl erwartet');
  }
  if (d.streitStil !== undefined) {
    const s = d.streitStil;
    if (!isObj(s)) ok = err(ctx, 'streitStil', 'streitStil: { default, vs? }');
    else {
      ok = oneOf(ctx, 'streitStil.default', s.default, C.STREIT_STILE, 'Streit-Stil') && ok;
      if (s.vs !== undefined) for (const [n, st] of Object.entries(s.vs)) { ref(ctx, ['streitStil', 'vs', n], 'npc', n); ok = oneOf(ctx, ['streitStil', 'vs', n], st, C.STREIT_STILE, 'Streit-Stil') && ok; }
    }
  }
  ok = opt(ctx, d, 'temperament', isStr, 'Temperament') && ok;
  if (d.bond !== undefined) {
    const b = d.bond;
    if (!isObj(b)) ok = err(ctx, 'bond', 'bond: { ability?, jacket?, finale? }');
    else {
      if (b.ability !== undefined && !(isObj(b.ability) && isNum(b.ability.level) && b.ability.level >= 1 && b.ability.level <= 3 && isStr(b.ability.id) && (b.ability.say === undefined || isText(b.ability.say)))) ok = err(ctx, 'bond.ability', 'ability: { level 1–3, id, say? }');
      if (b.jacket !== undefined && !isStr(b.jacket)) ok = err(ctx, 'bond.jacket', 'Aufnäher-ID erwartet');
      if (b.finale !== undefined && !isText(b.finale)) ok = err(ctx, 'bond.finale', 'Text erwartet');
    }
  }
  if (d.tell !== undefined) {
    const t = d.tell;
    if (!isObj(t) || !isStr(t.bluff)) ok = err(ctx, 'tell', 'tell: { bluff, amp?:{entspannt,abenteuer,profi} }');
    else if (t.amp !== undefined) for (const m of C.MODES) if (!isNum(t.amp[m])) ok = err(ctx, ['tell', 'amp', m], 'Zahl 0–1 erwartet');
  }
  if (d.lines !== undefined) {
    if (!isObj(d.lines)) ok = err(ctx, 'lines', 'lines: { greet:[…], campfire:{…}, … }');
    else for (const [k, v] of Object.entries(d.lines)) {
      const good = isText(v) || (isList(v) && v.every(isText)) || (isObj(v) && Object.values(v).every(isText));
      if (!good) ok = err(ctx, ['lines', k], 'Text, Liste von Texten oder { schlüssel: Text }');
    }
  }
  if (d.nachtwache !== undefined) { if (!strList(d.nachtwache)) ok = err(ctx, 'nachtwache', 'Liste von Nachtwache-IDs'); else d.nachtwache.forEach((n, i) => ref(ctx, ['nachtwache', i], 'nachtwache', n)); }
  return ok;
}

// ---- DialogueDef ----
export function dialogues(ctx, d) {
  let ok = baseId(ctx, d);
  if (d.unit !== undefined) ok = unitRef(ctx, 'unit', d.unit) && ok;
  ok = req(ctx, d, 'cast', strList, 'Liste von Figuren-IDs') && ok;
  const cast = new Set(isList(d.cast) ? d.cast : []);
  if (isList(d.cast)) d.cast.forEach((n, i) => ref(ctx, ['cast', i], 'npc', n));
  if (d.camera !== undefined) ok = oneOf(ctx, 'camera', d.camera, C.CAMERA_MODES, 'Kamera-Modus') && ok;
  ok = opt(ctx, d, 'rewind', isBool, 'true/false') && ok;
  if (!isObj(d.nodes) || !Object.keys(d.nodes).length) return err(ctx, 'nodes', 'nodes: { id: Knoten } mit mindestens einem Knoten');
  const ids = new Set(Object.keys(d.nodes));
  if (!isStr(d.start) || !ids.has(d.start)) ok = err(ctx, 'start', `start muss ein Knoten sein (${[...ids].join(', ')})`);
  const reachable = new Set();
  const visit = (id) => { if (!ids.has(id) || reachable.has(id)) return; reachable.add(id); const n = d.nodes[id]; if (!isObj(n)) return; if (isStr(n.goto)) visit(n.goto); if (isList(n.choices)) n.choices.forEach((c) => isObj(c) && isStr(c.goto) && visit(c.goto)); if (isObj(n.lauschen) && isStr(n.lauschen.abort)) visit(n.lauschen.abort); };
  if (isStr(d.start)) visit(d.start);
  for (const [id, n] of Object.entries(d.nodes)) {
    const p = ['nodes', id];
    if (!isObj(n)) { ok = err(ctx, p, 'Knoten muss ein Objekt sein'); continue; }
    if (!reachable.has(id)) warn(ctx, p, 'Knoten ist von start aus nicht erreichbar');
    if (n.speaker !== undefined) { if (!isStr(n.speaker)) ok = err(ctx, sub(p, 'speaker'), 'Sprecher erwartet'); else if (!cast.has(n.speaker) && !['glimm', 'player', 'erzaehler'].includes(n.speaker)) ok = err(ctx, sub(p, 'speaker'), `Sprecher '${n.speaker}' steht nicht in cast`); }
    if (n.say !== undefined && !isText(n.say)) ok = err(ctx, sub(p, 'say'), 'Text erwartet');
    if (n.anim !== undefined && !isStr(n.anim)) ok = err(ctx, sub(p, 'anim'), 'Animationsname erwartet');
    ok = checkEffects(ctx, sub(p, 'enter'), n.enter) && ok;
    ok = checkEffects(ctx, sub(p, 'effects'), n.effects) && ok;
    if (n.goto !== undefined && !(isStr(n.goto) && ids.has(n.goto))) ok = err(ctx, sub(p, 'goto'), `goto '${n.goto}' ist kein Knoten`);
    if (n.lauschen !== undefined && !(isObj(n.lauschen) && isNum(n.lauschen.seconds))) ok = err(ctx, sub(p, 'lauschen'), 'lauschen: { seconds, abort? }');
    if (n.satzbau !== undefined) { if (!isStr(n.satzbau)) ok = err(ctx, sub(p, 'satzbau'), 'Minispiel-ID erwartet'); else ref(ctx, sub(p, 'satzbau'), 'minigame', n.satzbau); }
    if (n.end !== undefined && !isBool(n.end)) ok = err(ctx, sub(p, 'end'), 'end: true');
    if (n.choices !== undefined) {
      if (!isList(n.choices) || !n.choices.length) ok = err(ctx, sub(p, 'choices'), 'choices: Liste mit mindestens einer Wahl');
      else {
        if (n.choices.length > 4) ok = err(ctx, sub(p, 'choices'), `${n.choices.length} Wahlen, höchstens 4 (grün 4, gelb 3, rot 2 + Rückzug/Hilfe kommen dazu)`);
        n.choices.forEach((c, i) => {
          const q = [...p, 'choices', i];
          if (!isObj(c)) { ok = err(ctx, q, 'Wahl muss ein Objekt sein'); return; }
          if (!isText(c.say) && !isText(c.label)) ok = err(ctx, q, 'Wahl braucht say oder label');
          if (c.icon !== undefined && !isStr(c.icon)) ok = err(ctx, sub(q, 'icon'), 'Icon-Name erwartet');
          if (c.tone !== undefined && !isStr(c.tone)) ok = err(ctx, sub(q, 'tone'), 'Ton erwartet (ruhig, fest, handlung …)');
          ok = checkEffects(ctx, sub(q, 'effects'), c.effects) && ok;
          if (c.requires !== undefined) ok = checkCond(ctx, sub(q, 'requires'), c.requires) && ok;
          if (c.minigame !== undefined) { if (!isStr(c.minigame)) ok = err(ctx, sub(q, 'minigame'), 'Minispiel-ID erwartet'); else ref(ctx, sub(q, 'minigame'), 'minigame', c.minigame); }
          if (c.goto !== undefined && !(isStr(c.goto) && ids.has(c.goto))) ok = err(ctx, sub(q, 'goto'), `goto '${c.goto}' ist kein Knoten`);
          if (c.goto === undefined && c.end !== true) ok = err(ctx, q, 'Wahl braucht goto oder end: true');
        });
      }
    }
    if (n.say === undefined && n.choices === undefined && n.goto === undefined && n.end !== true && n.effects === undefined) ok = err(ctx, p, 'Knoten ohne say, choices, goto, effects oder end');
    if (n.end !== true && n.goto === undefined && n.choices === undefined) ok = err(ctx, p, 'Knoten führt nirgendwohin (goto, choices oder end: true)');
  }
  return ok;
}

// ---- QuestDef ----
const STEP_PARAMS = {
  wegTor(ctx, p, x) {
    let o = checkPos(ctx, sub(p, 'to'), x.to);
    if (x.route !== undefined && !isStr(x.route)) o = err(ctx, sub(p, 'route'), 'Routen-ID erwartet');
    if (x.gate !== undefined) { if (!isStr(x.gate)) o = err(ctx, sub(p, 'gate'), 'Tor-ID erwartet'); else ref(ctx, sub(p, 'gate'), 'gate', x.gate); }
    if (x.pulsSources !== undefined && !strList(x.pulsSources)) o = err(ctx, sub(p, 'pulsSources'), 'Liste von Puls-Quellen');
    if (x.shelters !== undefined && !isNum(x.shelters)) o = err(ctx, sub(p, 'shelters'), 'Anzahl erwartet');
    return o;
  },
  tragen(ctx, p, x) {
    let o = isStr(x.item) ? true : err(ctx, sub(p, 'item'), 'item fehlt');
    o = checkPos(ctx, sub(p, 'from'), x.from) && o;
    o = checkPos(ctx, sub(p, 'to'), x.to) && o;
    if (x.slosh !== undefined) o = range(ctx, sub(p, 'slosh'), x.slosh, 0, 1, 'Schwappen') && o;
    if (x.count !== undefined && !isNum(x.count)) o = err(ctx, sub(p, 'count'), 'Anzahl erwartet');
    return o;
  },
  szene(ctx, p, x) { if (!isStr(x.dialogue)) return err(ctx, sub(p, 'dialogue'), 'dialogue fehlt'); ref(ctx, sub(p, 'dialogue'), 'dialogue', x.dialogue); return true; },
  ermitteln(ctx, p, x) {
    let o = arrayOf(ctx, sub(p, 'evidence'), x.evidence, (e, i) => {
      if (!isObj(e) || !isStr(e.id) || !['fakt', 'urteil'].includes(e.kind) || !isText(e.say)) return false;
      return checkPos(ctx, [...p, 'evidence', i, 'pos'], e.pos);
    }, 'Beweise {id, kind:fakt|urteil, pos, say}', { min: 1 });
    o = oneOf(ctx, sub(p, 'board'), x.board, C.ERMITTELN_BOARDS, 'Brett') && o;
    if (!isNum(x.need)) o = err(ctx, sub(p, 'need'), 'need: Anzahl');
    if (x.chain !== undefined) { if (!strList(x.chain)) o = err(ctx, sub(p, 'chain'), 'Liste von Figuren-IDs'); else x.chain.forEach((n, i) => ref(ctx, [...p, 'chain', i], 'npc', n)); }
    return o;
  },
  treppe(ctx, p, x) {
    let o = true;
    if (!strList(x.npcs) || x.npcs.length < 2) o = err(ctx, sub(p, 'npcs'), 'npcs: [a, b]'); else x.npcs.forEach((n, i) => ref(ctx, [...p, 'npcs', i], 'npc', n));
    o = checkSteps(ctx, sub(p, 'steps'), x.steps) && o;
    if (x.checkDay !== undefined && !isNum(x.checkDay)) o = err(ctx, sub(p, 'checkDay'), 'Tag als Zahl');
    return o;
  },
  befreunden(ctx, p, x) {
    let o = isStr(x.creature) ? true : err(ctx, sub(p, 'creature'), 'creature fehlt');
    o = oneOf(ctx, sub(p, 'rule'), x.rule, C.BEFREUNDEN_RULES, 'Regel') && o;
    if (x.seconds !== undefined && !isNum(x.seconds)) o = err(ctx, sub(p, 'seconds'), 'Sekunden erwartet');
    return o;
  },
  lotsen(ctx, p, x) {
    let o = true;
    if (!isStr(x.guide)) o = err(ctx, sub(p, 'guide'), 'guide (Figur) fehlt'); else ref(ctx, sub(p, 'guide'), 'npc', x.guide);
    o = oneOf(ctx, sub(p, 'mode'), x.mode, C.LOTSEN_MODES, 'Lotsen-Modus') && o;
    if (x.stoppRecht === false) o = err(ctx, sub(p, 'stoppRecht'), 'Stopp-Recht ist immer an (Gesetz 8)');
    if (x.room !== undefined) { if (!isStr(x.room)) o = err(ctx, sub(p, 'room'), 'Raum-ID erwartet'); else ref(ctx, sub(p, 'room'), 'room', x.room); }
    return o;
  },
  boss(ctx, p, x) {
    let o = arrayOf(ctx, sub(p, 'phases'), x.phases, (ph, i) => {
      if (!isObj(ph)) return false;
      const q = [...p, 'phases', i];
      let z = oneOf(ctx, sub(q, 'zone'), ph.zone, C.AMPEL_ZONEN, 'Zone');
      z = checkStep(ctx, q, { id: 'phase' + i, template: ph.template, params: ph.params }) && z;
      if (ph.pulsCap !== undefined) { z = range(ctx, sub(q, 'pulsCap'), ph.pulsCap, 0, 80, 'Puls-Deckel') && z; }
      else warn(ctx, q, 'Boss-Phase ohne pulsCap (Bosse deckeln den Puls, DESIGN §6)');
      return z;
    }, 'Phasen', { min: 1 });
    o = oneOf(ctx, sub(p, 'win'), x.win, C.BOSS_WINS, 'Siegbedingung (gewaltfrei)') && o;
    return o;
  },
  bauen(ctx, p, x) { if (!isStr(x.minigame)) return err(ctx, sub(p, 'minigame'), 'minigame fehlt'); ref(ctx, sub(p, 'minigame'), 'minigame', x.minigame); return true; },
  pruefung(ctx, p, x) { if (!isStr(x.minigame)) return err(ctx, sub(p, 'minigame'), 'minigame fehlt'); ref(ctx, sub(p, 'minigame'), 'minigame', x.minigame); return true; },
  nachtwache(ctx, p, x) { if (!strList(x.pool) || !x.pool.length) return err(ctx, sub(p, 'pool'), 'pool: Liste von Nachtwache-IDs'); x.pool.forEach((n, i) => ref(ctx, [...p, 'pool', i], 'nachtwache', n)); return true; },
  erinnerung(ctx, p, x) { if (!isStr(x.memory)) return err(ctx, sub(p, 'memory'), 'memory fehlt'); ref(ctx, sub(p, 'memory'), 'memory', x.memory); return true; },
};
function checkStep(ctx, p, s) {
  if (!isObj(s)) return err(ctx, p, 'Schritt muss ein Objekt sein');
  let o = isStr(s.id) ? true : err(ctx, sub(p, 'id'), 'Schritt-ID fehlt');
  if (!oneOf(ctx, sub(p, 'template'), s.template, C.QUEST_TEMPLATES, 'Vorlage')) return false;
  if (!isObj(s.params)) return err(ctx, sub(p, 'params'), 'params fehlt');
  o = STEP_PARAMS[s.template](ctx, sub(p, 'params'), s.params) && o;
  if (s.marker !== undefined && !(isBool(s.marker) || isObj(s.marker))) o = err(ctx, sub(p, 'marker'), 'marker: true oder Pos');
  if (s.optional !== undefined && !isBool(s.optional)) o = err(ctx, sub(p, 'optional'), 'optional: true/false');
  o = checkEffects(ctx, sub(p, 'onStart'), s.onStart) && o;
  o = checkEffects(ctx, sub(p, 'onDone'), s.onDone) && o;
  if (s.hints !== undefined) {
    if (!isObj(s.hints)) o = err(ctx, sub(p, 'hints'), 'hints: { glimm:[…] }');
    else if (s.hints.glimm !== undefined && !(isList(s.hints.glimm) && s.hints.glimm.every(isText))) o = err(ctx, [...p, 'hints', 'glimm'], 'Liste von Glimm-Zeilen');
  }
  return o;
}
function checkSteps(ctx, p, steps) {
  if (!isList(steps) || !steps.length) return err(ctx, p, 'steps: Liste mit mindestens einem Schritt');
  const ids = new Set();
  let o = true;
  steps.forEach((s, i) => {
    o = checkStep(ctx, sub(p, i), s) && o;
    if (isObj(s) && isStr(s.id)) { if (ids.has(s.id)) o = err(ctx, [...p, i, 'id'], `Schritt-ID '${s.id}' doppelt`); ids.add(s.id); }
  });
  return o;
}
export function quests(ctx, d) {
  let ok = baseId(ctx, d, { unit: true });
  const isUnitQuest = isStr(d.id) && C.UNIT_IDS.includes(d.id);
  if (isUnitQuest) {
    ok = req(ctx, d, 'module', (v) => v === C.UNIT_MODULE[d.id] || (C.MODULE_IDS.includes(v) && /^j1-j/.test(d.id)), `Modul ${C.UNIT_MODULE[d.id] || 'j1-m?'}`) && ok;
  } else if (d.module !== undefined) ok = oneOf(ctx, 'module', d.module, C.MODULE_IDS, 'Modul') && ok;
  ok = req(ctx, d, 'title', isText, 'Titel') && ok;
  ok = req(ctx, d, 'region', (v) => C.REGION_IDS.includes(v), 'Region') && ok;
  if (d.estMinutes !== undefined) { if (!isNum(d.estMinutes)) ok = err(ctx, 'estMinutes', 'Minuten erwartet'); else if (d.estMinutes > 20) warn(ctx, 'estMinutes', `${d.estMinutes} min – eine Quest dauert höchstens 20 Minuten (DESIGN §12)`); }
  if (d.templates !== undefined) ok = arrayOf(ctx, 'templates', d.templates, (t) => C.QUEST_TEMPLATES.includes(t), 'Vorlagen') && ok;
  ok = checkEffects(ctx, 'grants', d.grants) && ok;
  ok = checkSteps(ctx, ['steps'], d.steps) && ok;
  const stepIds = new Set(isList(d.steps) ? d.steps.filter(isObj).map((s) => s.id) : []);
  if (d.kurzfassung !== undefined) {
    const k = d.kurzfassung;
    if (!isObj(k)) ok = err(ctx, 'kurzfassung', 'kurzfassung: { minutes, steps, grants?, veil? }');
    else {
      if (k.minutes !== undefined && !(isNum(k.minutes) && k.minutes <= 5)) ok = err(ctx, 'kurzfassung.minutes', 'Kurzfassung dauert höchstens 5 Minuten');
      if (!strList(k.steps)) ok = err(ctx, 'kurzfassung.steps', 'Liste von Schritt-IDs');
      else k.steps.forEach((s, i) => { if (!stepIds.has(s)) ok = err(ctx, ['kurzfassung', 'steps', i], `Schritt '${s}' gibt es nicht in steps`); });
      ok = checkEffects(ctx, 'kurzfassung.grants', k.grants) && ok;
      if (k.veil !== undefined) { if (!isObj(k.veil)) ok = err(ctx, 'kurzfassung.veil', 'veil: { zone, to }'); else { ok = oneOf(ctx, 'kurzfassung.veil.zone', k.veil.zone, C.VEIL_ZONES, 'Zone') && ok; ok = range(ctx, 'kurzfassung.veil.to', k.veil.to, 0, 1, 'Schleier-Anteil') && ok; } }
    }
  } else if (isUnitQuest && !/^j1-j/.test(d.id)) warn(ctx, 'kurzfassung', 'Einheit ohne Kurzfassung – spätere Codes setzen verpasste Einheiten auf Kurzfassung (DESIGN §10)');
  ok = checkEffects(ctx, 'onComplete', d.onComplete) && ok;
  if (d.teaser !== undefined) {
    if (!isObj(d.teaser)) ok = err(ctx, 'teaser', 'teaser: { gate?, say? }');
    else { if (d.teaser.gate !== undefined) { if (!isStr(d.teaser.gate)) ok = err(ctx, 'teaser.gate', 'Tor-ID erwartet'); else ref(ctx, 'teaser.gate', 'gate', d.teaser.gate, { soft: true }); } if (d.teaser.say !== undefined && !isText(d.teaser.say)) ok = err(ctx, 'teaser.say', 'Text erwartet'); }
  }
  ok = req(ctx, d, 'glimm', isText, 'Glimm-Zeile') && ok;
  if (!isObj(d.patch)) ok = err(ctx, 'patch', 'patch: { icon, color, back }');
  else {
    ok = req(ctx, d.patch, 'icon', isStr, 'Icon-Name', ['patch']) && ok;
    ok = req(ctx, d.patch, 'color', isColor, 'Farbe #rrggbb', ['patch']) && ok;
    ok = req(ctx, d.patch, 'back', isText, 'Rückseiten-Satz', ['patch']) && ok;
  }
  ok = req(ctx, d, 'echteWelt', isText, 'Echte-Welt-Karte') && ok;
  ok = req(ctx, d, 'debrief', (v) => strList(v) && v.length >= 1, 'Liste mit 1–2 Fragen') && ok;
  ok = opt(ctx, d, 'kursziele', strList, 'Liste von Kurszielen') && ok;
  if (d.shard !== undefined && d.shard !== null) ok = range(ctx, 'shard', d.shard, 1, 9, 'Splitter') && ok;
  ok = opt(ctx, d, 'linesAndVeils', isBool, 'true/false') && ok;
  return ok;
}

// ---- MinigameDef ----
export function minigames(ctx, d) {
  let ok = baseId(ctx, d);
  if (!oneOf(ctx, 'template', d.template, C.MINIGAME_TEMPLATES, 'Minispiel-Vorlage')) return false;
  ok = req(ctx, d, 'title', isText, 'Titel') && ok;
  ok = opt(ctx, d, 'icon', isStr, 'Icon-Name') && ok;
  ok = opt(ctx, d, 'intro', isText, 'Ein Satz') && ok;
  if (d.modes !== undefined) {
    if (!isObj(d.modes)) ok = err(ctx, 'modes', 'modes: { entspannt, abenteuer, profi }');
    else for (const m of C.MODES) { if (!isObj(d.modes[m])) ok = err(ctx, ['modes', m], `Modus '${m}' fehlt`); }
  }
  if (d.medals !== undefined) {
    if (!isObj(d.medals)) ok = err(ctx, 'medals', 'medals: { bronze, silber, gold, stern? }');
    else {
      for (const m of ['bronze', 'silber', 'gold']) if (!isObj(d.medals[m])) ok = err(ctx, ['medals', m], `Medaille '${m}' fehlt`);
      for (const m of Object.keys(d.medals)) if (!C.MEDALS.includes(m)) ok = err(ctx, ['medals', m], `unbekannte Medaille – erlaubt: ${C.MEDALS.join(', ')}`);
    }
  }
  if (d.story !== undefined) {
    if (!isObj(d.story)) ok = err(ctx, 'story', 'story: { minMedal, failForward }');
    else { if (d.story.minMedal !== undefined) ok = oneOf(ctx, 'story.minMedal', d.story.minMedal, C.MEDALS, 'Medaille') && ok; if (d.story.minMedal === 'stern') ok = err(ctx, 'story.minMedal', 'Der Leuchtstern ist nie nötig für die Geschichte'); }
  }
  if (d.params !== undefined) {
    if (!isObj(d.params)) ok = err(ctx, 'params', 'params muss ein Objekt sein');
    else { ok = checkEffects(ctx, 'params.onHit', d.params.onHit) && ok; ok = checkEffects(ctx, 'params.onMiss', d.params.onMiss) && ok; if (d.params.partner !== undefined) { if (!isStr(d.params.partner)) ok = err(ctx, 'params.partner', 'Figuren-ID'); else ref(ctx, 'params.partner', 'npc', d.params.partner); } }
  }
  if (d.template === 'satzbau') {
    ok = oneOf(ctx, 'ruleset', d.ruleset, C.SATZBAU_RULESETS, 'Regelset') && ok;
    ok = arrayOf(ctx, 'slots', d.slots, (s, i) => {
      if (!isObj(s) || !isStr(s.id) || !isText(s.label)) return false;
      return arrayOf(ctx, ['slots', i, 'tiles'], s.tiles, (t) => isObj(t) && isText(t.t || t), 'Kacheln {t, ok?|thorn?|rules?}', { min: 2 });
    }, 'Slots {id, label, tiles}', { min: 1 }) && ok;
    if (d.outcome !== undefined) {
      if (!isObj(d.outcome)) ok = err(ctx, 'outcome', 'outcome: { clean:[…], thorn:[…] }');
      else for (const k of Object.keys(d.outcome)) ok = checkEffects(ctx, ['outcome', k], d.outcome[k]) && ok;
    }
  }
  return ok;
}

// ---- RoomDef ----
export function rooms(ctx, d) {
  let ok = baseId(ctx, d);
  ok = oneOf(ctx, 'kit', d.kit, C.ROOM_KITS, 'Raum-Baukasten') && ok;
  ok = req(ctx, d, 'size', vec3, '[Breite, Höhe, Länge]') && ok;
  if (d.light !== undefined && !C.ROOM_LIGHTS.includes(d.light)) warn(ctx, 'light', `Licht-Preset '${d.light}' unbekannt – bekannt: ${C.ROOM_LIGHTS.join(', ')}`);
  if (d.water !== undefined && !(isObj(d.water) && isNum(d.water.level))) ok = err(ctx, 'water', 'water: { level, tide? }');
  if (!isObj(d.spawns) || !Object.keys(d.spawns).length) ok = err(ctx, 'spawns', 'spawns: { name: [x, y, z] } mit mindestens einem Eintrag');
  else for (const [k, v] of Object.entries(d.spawns)) if (!vec3(v)) ok = err(ctx, ['spawns', k], '[x, y, z] erwartet');
  ok = arrayOf(ctx, 'exits', d.exits, (e, i) => {
    if (!isObj(e) || !vec3(e.at) || !isObj(e.to)) return false;
    if (e.to.region !== undefined && !C.REGION_IDS.includes(e.to.region)) return err(ctx, ['exits', i, 'to', 'region'], `Region '${e.to.region}' unbekannt`);
    if (e.to.site !== undefined) { if (!isStr(e.to.site)) return false; ref(ctx, ['exits', i, 'to', 'site'], 'site', e.to.site); }
    if (e.to.room !== undefined) { if (!isStr(e.to.room)) return false; ref(ctx, ['exits', i, 'to', 'room'], 'room', e.to.room); }
    return true;
  }, 'Ausgänge {at:[x,y,z], to:{region, site} | {room, spawn}}', { min: 1 }) && ok;
  if (d.features !== undefined) ok = arrayOf(ctx, 'features', d.features, (f, i) => {
    if (!isObj(f) || !isStr(f.type) || !vec3(f.at)) return false;
    if (f.minigame !== undefined) { if (!isStr(f.minigame)) return false; ref(ctx, ['features', i, 'minigame'], 'minigame', f.minigame); }
    if (f.dialogue !== undefined) { if (!isStr(f.dialogue)) return false; ref(ctx, ['features', i, 'dialogue'], 'dialogue', f.dialogue); }
    return true;
  }, 'Features {type, at, minigame?}') && ok;
  return ok;
}

// ---- GadgetDef ----
export function gadgets(ctx, d) {
  let ok = baseId(ctx, d);
  ok = oneOf(ctx, 'fach', d.fach, C.KOFFER_FAECHER, 'Koffer-Fach') && ok;
  ok = unitRef(ctx, 'unit', d.unit) && ok;
  ok = req(ctx, d, 'name', isText, 'Name') && ok;
  ok = req(ctx, d, 'icon', isStr, 'Icon-Name') && ok;
  if (d.use !== undefined && !C.GADGET_USES.includes(d.use)) warn(ctx, 'use', `Nutzungsart '${d.use}' unbekannt – bekannt: ${C.GADGET_USES.join(', ')}`);
  if (!isObj(d.effect)) ok = err(ctx, 'effect', 'effect: { puls?, world?, radius?, seconds? }');
  else if (d.effect.puls !== undefined && !(isNum(d.effect.puls) && d.effect.puls <= 0)) ok = err(ctx, 'effect.puls', 'Gadgets senken den Puls (Zahl ≤ 0)');
  if (!isObj(d.zones)) ok = err(ctx, 'zones', 'zones: { gruen, gelb, rot } je 0|1');
  else for (const z of C.AMPEL_ZONEN) if (![0, 1].includes(d.zones[z])) ok = err(ctx, ['zones', z], 'Wert 0 oder 1 erwartet');
  if (d.fach === 'kopf' && isObj(d.zones) && d.zones.rot === 1) warn(ctx, 'zones.rot', 'Kopf-Gadgets verpuffen bei Rot (DESIGN §7) – rot: 0 erwartet');
  if (d.perSave !== undefined) {
    if (!(isList(d.perSave) && d.perSave.length === 2 && d.perSave.every(isNum) && d.perSave[0] <= d.perSave[1])) ok = err(ctx, 'perSave', 'perSave: [min, max]');
    else if (d.perSave[0] < 0.5 || d.perSave[1] > 1.5) warn(ctx, 'perSave', 'Faktor sollte in 0,7–1,3 bleiben');
  }
  if (d.npcFit !== undefined) { if (!isObj(d.npcFit)) ok = err(ctx, 'npcFit', 'npcFit: { npc: faktor }'); else for (const [n, f] of Object.entries(d.npcFit)) { ref(ctx, ['npcFit', n], 'npc', n); if (!isNum(f)) ok = err(ctx, ['npcFit', n], 'Faktor erwartet'); } }
  if (d.reichweite !== undefined) ok = range(ctx, 'reichweite', d.reichweite, 0, 100, 'Reichweite') && ok;
  ok = opt(ctx, d, 'cooldown', isNum, 'Sekunden') && ok;
  return ok;
}

// ---- MemoryDef ----
export function memories(ctx, d) {
  let ok = baseId(ctx, d);
  ok = range(ctx, 'shard', d.shard, 1, 9, 'Splitter') && ok;
  if (!isStr(d.owner)) ok = err(ctx, 'owner', 'owner (Figur) fehlt'); else ref(ctx, 'owner', 'npc', d.owner);
  ok = unitRef(ctx, 'unit', d.unit) && ok;
  ok = req(ctx, d, 'feeling', isStr, 'Gefühl') && ok;
  if (d.filter !== undefined) {
    if (!isObj(d.filter)) ok = err(ctx, 'filter', 'filter: { tint, blur, focus }');
    else { if (d.filter.tint !== undefined && !isColor(d.filter.tint)) ok = err(ctx, 'filter.tint', 'Farbe #rrggbb'); if (d.filter.blur !== undefined) ok = range(ctx, 'filter.blur', d.filter.blur, 0, 1, 'Unschärfe') && ok; }
  }
  if (!isObj(d.diorama)) ok = err(ctx, 'diorama', 'diorama: { scene, hour, props, figures }');
  else {
    const p = ['diorama'];
    ok = req(ctx, d.diorama, 'scene', isStr, 'Szenen-ID', p) && ok;
    if (d.diorama.hour !== undefined) ok = range(ctx, sub(p, 'hour'), d.diorama.hour, 0, 24, 'Stunde') && ok;
    ok = opt(ctx, d.diorama, 'props', strList, 'Liste von Requisiten', p) && ok;
    if (d.diorama.figures !== undefined) ok = arrayOf(ctx, sub(p, 'figures'), d.diorama.figures, (f, i) => {
      if (!isObj(f) || !isStr(f.pose)) return false;
      if (f.npc !== undefined) { if (!isStr(f.npc)) return false; ref(ctx, [...p, 'figures', i, 'npc'], 'npc', f.npc); }
      else if (!isNum(f.crowd)) return false;
      return true;
    }, 'Figuren {npc|crowd, pose, facing?}') && ok;
  }
  ok = req(ctx, d, 'caption', isText, 'Bildunterschrift') && ok;
  if (d.chain !== undefined && !(isObj(d.chain) && isStr(d.chain.step) && isText(d.chain.say))) ok = err(ctx, 'chain', 'chain: { step, say }');
  if (d.laterTruth !== undefined) { if (!(isObj(d.laterTruth) && isText(d.laterTruth.say))) ok = err(ctx, 'laterTruth', 'laterTruth: { unlockAt, say }'); else if (d.laterTruth.unlockAt !== undefined) ok = unitRef(ctx, 'laterTruth.unlockAt', d.laterTruth.unlockAt) && ok; }
  return ok;
}

// ---- NachtwacheDef ----
export function nachtwache(ctx, d) {
  let ok = baseId(ctx, d);
  if (!isStr(d.npc)) ok = err(ctx, 'npc', 'npc fehlt'); else ref(ctx, 'npc', 'npc', d.npc);
  ok = unitRef(ctx, 'from', d.from) && ok;
  ok = checkPos(ctx, 'where', d.where) && ok;
  if (d.clue !== undefined && !isObj(d.clue)) ok = err(ctx, 'clue', 'clue: { routineBreak?, glimm?, tracks? }');
  if (d.outer !== undefined && !emoPair(d.outer)) ok = err(ctx, 'outer', 'outer: [emotion, 0–10]');
  if (d.inner !== undefined && !emoPair(d.inner)) ok = err(ctx, 'inner', 'inner: [emotion, 0–10]');
  ok = oneOf(ctx, 'need', d.need, C.TANKS, 'Bedürfnis-Tank') && ok;
  ok = arrayOf(ctx, 'help', d.help, (h, i) => {
    if (!isObj(h) || !isStr(h.id) || !isText(h.label)) return false;
    let o = oneOf(ctx, ['help', i, 'fits'], h.fits, C.TANKS, 'Tank');
    if (h.dialogue !== undefined) { if (!isStr(h.dialogue)) o = false; else ref(ctx, ['help', i, 'dialogue'], 'dialogue', h.dialogue); }
    return o;
  }, 'Hilfen {id, label, fits, emote?|dialogue?, seconds?}', { min: 2 }) && ok;
  if (!isObj(d.reward)) ok = err(ctx, 'reward', 'reward: { fit:[…], other:[…] }');
  else {
    ok = checkEffects(ctx, 'reward.fit', d.reward.fit) && ok;
    ok = checkEffects(ctx, 'reward.other', d.reward.other) && ok;
    if (!isList(d.reward.other) || !d.reward.other.length) ok = err(ctx, 'reward.other', "Auch die 'andere' Hilfe wird belohnt – nie 'falsch' (DESIGN §9)");
  }
  if (!isObj(d.line) || !isText(d.line.fit) || !isText(d.line.other)) ok = err(ctx, 'line', 'line: { fit, other }');
  return ok;
}

// ---- EchoDef (eigene Dateien unter content/echoes/) ----
export function echoes(ctx, d) { return checkEcho(ctx, [], d); }

// ---- CosmeticDef-Set ----
export function cosmetics(ctx, d) {
  const SOURCES = ['minigame', 'nebelkern', 'unitDone', 'regionFreed', 'shard', 'bond', 'collectible', 'lichtsplitter', 'deed', 'start'];
  return arrayOf(ctx, 'items', d.items, (it, i) => {
    if (!isObj(it) || !isId(it.id)) return false;
    const p = ['items', i];
    let o = oneOf(ctx, sub(p, 'slot'), it.slot, C.COSMETIC_SLOTS, 'Kosmetik-Slot');
    if (!isObj(it.source)) return err(ctx, sub(p, 'source'), 'source: { minigame+medal | nebelkern | unitDone | regionFreed | shard | bond | collectible | start }');
    const k = Object.keys(it.source).filter((x) => x !== 'medal')[0];
    if (!SOURCES.includes(k)) o = err(ctx, sub(p, 'source'), `unbekannte Quelle '${k}'`);
    if (k === 'minigame') { ref(ctx, [...p, 'source', 'minigame'], 'minigame', it.source.minigame, { soft: true }); if (it.source.medal !== undefined) o = oneOf(ctx, [...p, 'source', 'medal'], it.source.medal, C.MEDALS, 'Medaille') && o; }
    if (k === 'unitDone') o = unitRef(ctx, [...p, 'source', 'unitDone'], it.source.unitDone) && o;
    if (k === 'regionFreed' && !C.REGION_IDS.includes(it.source.regionFreed)) o = err(ctx, [...p, 'source', 'regionFreed'], 'Region unbekannt');
    if (k === 'shard') o = range(ctx, [...p, 'source', 'shard'], it.source.shard, 1, 9, 'Splitter') && o;
    if (k === 'bond') { const b = it.source.bond; if (!(isList(b) && isStr(b[0]) && isNum(b[1]))) o = err(ctx, [...p, 'source', 'bond'], "bond: ['npc', stufe]"); else ref(ctx, [...p, 'source', 'bond'], 'npc', b[0]); }
    if (it.builder !== undefined && !isStr(it.builder)) o = err(ctx, sub(p, 'builder'), 'Builder-Name erwartet');
    return o;
  }, 'Kosmetik {id, slot, source, builder?, params?}', { min: 1 });
}

// ---- CollectibleDef ----
export function collectibles(ctx, d) {
  return arrayOf(ctx, 'items', d.items, (it, i) => {
    if (!isObj(it) || !isId(it.id)) return false;
    const p = ['items', i];
    let o = oneOf(ctx, sub(p, 'type'), it.type, C.COLLECTIBLE_TYPES, 'Sammelart');
    o = checkPos(ctx, sub(p, 'pos'), it.pos) && o;
    if (it.needs !== undefined) o = checkCond(ctx, sub(p, 'needs'), it.needs) && o;
    return o;
  }, 'Sammelsachen {id, type, pos, needs?, memoryImage?}', { min: 1 });
}

// ---- Glimm-Zeilen (freie Struktur, nur Text-Linter) ----
export function glimm(ctx, d) { return isObj(d) ? true : err(ctx, [], 'Objekt erwartet'); }

// ---- Einheiten-Tabelle (content/units.js) ----
export function units(ctx, d) {
  let ok = true;
  if (!isList(d.units)) return err(ctx, 'units', 'units: Liste');
  const seen = new Set(), codes = new Map();
  const normC = (s) => String(s).toUpperCase().replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE').replace(/[\s_-]+/g, '');
  d.units.forEach((u, i) => {
    const p = ['units', i];
    if (!isObj(u) || !C.UNIT_IDS.includes(u.id)) { ok = err(ctx, p, 'Einheit mit gültiger id (j1-e01…) erwartet'); return; }
    if (seen.has(u.id)) ok = err(ctx, sub(p, 'id'), `Einheit ${u.id} doppelt`);
    seen.add(u.id);
    if (!isStr(u.code) || !/^[A-Z]{3,}$/.test(u.code)) ok = err(ctx, sub(p, 'code'), 'Code-Wort in Großbuchstaben ohne Umlaute erwartet');
    else { const n = normC(u.code); if (codes.has(n)) ok = err(ctx, sub(p, 'code'), `Code '${u.code}' doppelt (auch ${codes.get(n)})`); codes.set(n, u.id); }
    if (!isText(u.title)) ok = err(ctx, sub(p, 'title'), 'Titel fehlt');
    if (u.region !== undefined && !C.REGION_IDS.includes(u.region)) ok = err(ctx, sub(p, 'region'), 'Region unbekannt');
    if (u.module !== undefined && u.module !== 'joker' && u.module !== C.UNIT_MODULE[u.id]) ok = err(ctx, sub(p, 'module'), `Modul passt nicht (erwartet ${C.UNIT_MODULE[u.id]})`);
  });
  for (const id of C.UNIT_IDS) if (!seen.has(id)) ok = err(ctx, 'units', `Einheit ${id} fehlt`);
  if (isObj(d.codes)) {
    const all = [d.codes.demo, d.codes.teacher, ...Object.values(d.codes.weather || {}), ...Object.values(d.codes.modules || {})].filter(Boolean);
    for (const c of all) { const n = normC(c); if (codes.has(n)) ok = err(ctx, 'codes', `Sonder-Code '${c}' kollidiert mit Einheit ${codes.get(n)}`); codes.set(n, c); }
  }
  return ok;
}

export const VALIDATORS = { regions, npcs, dialogues, quests, minigames, rooms, gadgets, memories, nachtwache, echoes, cosmetics, collectibles, glimm, units };
