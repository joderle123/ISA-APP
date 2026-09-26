// Taten-Log und Echos (WP31, DESIGN §9): reine Logik ohne Browser.
// Taten:  state.deeds (IDs, wie Kosmetik-Quellen sie lesen) · state.deedLog [{ id, day, unit, npc, t }]
//   const deeds = createDeeds({ state, content, time }); deeds.add(id, { npc, unit }) · deeds.list() · deeds.today()
//   deeds.byNpc(npc) · deeds.campfireLines(n) → [{ who, text, deed }]   (Sätze der Figuren aus NpcDef.lines.campfire)
//   deeds.has(id)
// Echos: Figuren zitieren Wochen später deine Taten. Negative Echos sind höchstens „verstimmt“, nennen ihre Ursache und
//   haben eine sichtbare Reparatur-Quest – sonst werden sie abgelehnt (Gesetz 6; Validator prüft dasselbe).
//   const echoes = createEchoes({ state, content, evalCond, time, onFire });
//   echoes.register(def) → bool · echoes.defs · echoes.check() → [gefeuert] · echoes.pending(npc) → [{ id, line }]
//   echoes.consume(id) (Zeile gezeigt) · echoes.clear(id) (Reparatur) · echoes.repairFor(questId) → [echoIds]
//   Spielstand: state.echoes [{ id, firedDay, firedSession, shown, cleared }] · state.moods.<npc> = 'verstimmt'|'froh'|…
export function createDeeds({ state, content = null, time = null } = {}) {
  const now = () => (typeof time === 'function' ? time() : (time || { day: Number(state.get('time.day', 1)) || 1 }));
  const api = {
    add(id, meta = {}) {
      const first = !(state.get('deeds', []) || []).includes(id);
      if (first) state.addUnique('deeds', id);
      const entry = { id, day: now().day, t: Date.now(), unit: meta.unit || null, npc: meta.npc || null };
      state.push('deedLog', entry);
      return { ...entry, first };
    },
    has(id) { return (state.get('deeds', []) || []).includes(id); },
    list() { return (state.get('deedLog', []) || []).slice(); },
    today() { const d = now().day; return api.list().filter((e) => e.day === d); },
    byNpc(npc) { return api.list().filter((e) => e.npc === npc); },
    // Sätze fürs Lagerfeuer: je Figur höchstens ein Satz, neueste Taten zuerst, nur wenn die Figur einen Satz dazu hat
    campfireLines(n = 3, { day = null } = {}) {
      const src = (day === null ? api.today() : api.list().filter((e) => e.day === day)).slice().reverse();
      const out = [];
      const used = new Set();
      for (const e of src) {
        const npcId = e.npc || (e.id.split('-')[0]);
        if (used.has(npcId)) continue;
        const npc = content && content.get ? content.get('npcs', npcId) : null;
        const text = npc && npc.lines && npc.lines.campfire && npc.lines.campfire[e.id];
        if (!text) continue;
        used.add(npcId);
        out.push({ who: npcId, text, deed: e.id });
        if (out.length >= n) break;
      }
      return out;
    },
  };
  return api;
}

export const isNegativeEcho = (def) => !!(def && def.effect && Array.isArray(def.effect.mood) && def.effect.mood[1] === 'verstimmt');
export const hasRepair = (def) => !!(def && def.repair && typeof def.repair.quest === 'string');

export function createEchoes({ state, content = null, evalCond = () => true, time = null, session = () => 1, onFire = null, applyEffect = null } = {}) {
  const defs = new Map();
  const now = () => (typeof time === 'function' ? time() : (time || { day: Number(state.get('time.day', 1)) || 1 }));
  const entries = () => state.get('echoes', []) || [];
  const entry = (id) => entries().find((e) => e.id === id) || null;
  const setEntry = (id, patch) => { const list = entries().slice(); const i = list.findIndex((e) => e.id === id); if (i < 0) list.push({ id, ...patch }); else list[i] = { ...list[i], ...patch }; state.set('echoes', list); };

  const api = {
    get defs() { return [...defs.values()]; },
    register(def) {
      if (!def || typeof def.id !== 'string') return false;
      if (isNegativeEcho(def) && !hasRepair(def)) { console.warn('[echo]', def.id, 'abgelehnt: negatives Echo ohne Reparatur'); return false; }
      defs.set(def.id, { ...def, _armedDay: def._armedDay !== undefined ? def._armedDay : now().day, _armedSession: session() });
      return true;
    },
    unregister(id) { defs.delete(id); },
    // Fällige Echos zünden: Bedingung wahr, Verzögerung (Tage oder Sitzungen) verstrichen, noch nicht gefeuert
    check() {
      const fired = [];
      const d = now().day, s = session();
      for (const def of defs.values()) {
        if (entry(def.id)) continue;
        if (def.when && !evalCond(def.when)) continue;
        const delay = def.delay || {};
        if (delay.days !== undefined && d - def._armedDay < delay.days) continue;
        if (delay.sessions !== undefined && s - def._armedSession < delay.sessions) continue;
        setEntry(def.id, { firedDay: d, firedSession: s, shown: false, cleared: false });
        if (def.effect) {
          if (Array.isArray(def.effect.mood)) { const [npc, mood] = def.effect.mood; state.set('moods.' + npc, mood); }
          else if (applyEffect) applyEffect(def.effect);
        }
        fired.push(def.id);
        if (onFire) onFire(def);
      }
      return fired;
    },
    // Noch nicht gezeigte Zeilen einer Figur (beim nächsten Treffen oder am Feuer)
    pending(npc) {
      return entries().filter((e) => !e.shown && !e.cleared).map((e) => ({ e, def: defs.get(e.id) })).filter(({ def }) => def && def.line && (!npc || def.line.npc === npc)).map(({ e, def }) => ({ id: e.id, line: def.line, repair: def.repair || null }));
    },
    consume(id) { if (entry(id)) setEntry(id, { shown: true }); },
    // Reparatur oder ausdrücklich: Stimmung zurücksetzen, Echo als erledigt markieren
    clear(id) {
      const def = defs.get(id);
      if (def && def.effect && Array.isArray(def.effect.mood)) { const npc = def.effect.mood[0]; if (state.get('moods.' + npc) === def.effect.mood[1]) state.remove('moods.' + npc); }
      if (entry(id)) setEntry(id, { cleared: true, shown: true });
    },
    repairFor(questId) { return [...defs.values()].filter((d) => d.repair && d.repair.quest === questId && d.repair.clears !== false).map((d) => d.id); },
    moodOf(npc) { return state.get('moods.' + npc) || null; },
    isFired(id) { return !!entry(id); },
  };
  if (content && content.list) for (const def of content.list('echoes')) api.register(def);
  return api;
}
