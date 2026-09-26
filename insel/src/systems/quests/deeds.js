// Taten-Log und Echos (WP31, DESIGN §9): reine Logik ohne Browser.
// Taten:  state.deeds (IDs, wie Kosmetik-Quellen sie lesen) · state.deedLog [{ id, day, unit, npc, t }]
//   const deeds = createDeeds({ state, content, time }); deeds.add(id, { npc, unit }) · deeds.list() · deeds.today()
//   deeds.byNpc(npc) · deeds.campfireLines(n) → [{ who, text, deed }]   (Sätze der Figuren aus NpcDef.lines.campfire)
//   deeds.has(id)
// Echos: Figuren zitieren Wochen später deine Taten. Negative Echos sind höchstens „verstimmt“, nennen ihre Ursache und
//   haben eine sichtbare Reparatur-Quest – sonst werden sie abgelehnt (Gesetz 6; Validator prüft dasselbe).
//   const echoes = createEchoes({ state, content, evalCond, time, onFire, applyEffect, repair });
//   echoes.register(def) → bool · echoes.defs · echoes.check() → [gefeuert] · echoes.pending(npc) → [{ id, line, repair }]
//   echoes.consume(id) (Zeile gezeigt) · echoes.clear(id) (Reparatur) · echoes.repairFor(questId) → [echoIds] · reload()
//   Spielstand: state.echoes [{ id, firedDay, firedSession, shown, cleared }] · state.echoDefs (zur Laufzeit registrierte)
//   · state.moods.<npc> = { kind:'verstimmt'|'froh'|…, cause, repair, day }  (Format des Figuren-Systems WP34, das die
//     Figur beim Gruß „Grad nicht. Wegen …“ sagen lässt); applyEffect (DSL → Figuren-Haken) hat Vorrang, repair(npc, how)
//     hebt die Verstimmung im Figuren-System auf
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

export const lineText = (line) => (line && line.say && typeof line.say === 'object' ? line.say.t : line && line.say) || null;
export const isVerstimmt = (m) => !!m && (m === 'verstimmt' || m.kind === 'verstimmt');

export function createEchoes({ state, content = null, evalCond = () => true, time = null, session = () => 1, onFire = null, applyEffect = null, repair = null } = {}) {
  const defs = new Map();
  const now = () => (typeof time === 'function' ? time() : (time || { day: Number(state.get('time.day', 1)) || 1 }));
  const entries = () => state.get('echoes', []) || [];
  const entry = (id) => entries().find((e) => e.id === id) || null;
  const setEntry = (id, patch) => { const list = entries().slice(); const i = list.findIndex((e) => e.id === id); if (i < 0) list.push({ id, ...patch }); else list[i] = { ...list[i], ...patch }; state.set('echoes', list); };
  // Stimmung setzen: über die Effekt-DSL (Figuren-System), sonst direkt im Format { kind, cause, repair, day }
  const setMood = (def) => {
    const [npc, kind] = def.effect.mood;
    const extra = { cause: def.cause || lineText(def.line) || 'verstimmt', repair: def.repair && def.repair.quest ? def.repair.quest : null };
    const r = applyEffect ? applyEffect({ mood: [npc, kind, extra], cause: extra.cause, repair: extra.repair }) : undefined;
    if (r === undefined || r === false) {
      if (kind === 'ok') state.remove('moods.' + npc);
      else state.set('moods.' + npc, { kind, cause: extra.cause, repair: extra.repair, day: now().day });
    }
  };

  // Zur Laufzeit registrierte Echos (Effekt {echo: EchoDef}) überleben das Neuladen im Spielstand: state.echoDefs
  const stored = () => state.get('echoDefs', []) || [];
  const store = (def) => { const list = stored().filter((d) => d.id !== def.id); list.push(def); state.set('echoDefs', list); };
  const contentIds = new Set();

  const api = {
    get defs() { return [...defs.values()]; },
    register(def, { persist = true } = {}) {
      if (!def || typeof def.id !== 'string') return false;
      if (isNegativeEcho(def) && !hasRepair(def)) { console.warn('[echo]', def.id, 'abgelehnt: negatives Echo ohne Reparatur'); return false; }
      const armed = { ...def, _armedDay: def._armedDay !== undefined ? def._armedDay : now().day, _armedSession: def._armedSession !== undefined ? def._armedSession : session() };
      defs.set(def.id, armed);
      if (persist && !contentIds.has(def.id)) store(armed);
      return true;
    },
    unregister(id) { defs.delete(id); if (stored().some((d) => d.id === id)) state.set('echoDefs', stored().filter((d) => d.id !== id)); },
    // Nach Laden/Neustart: Inhalte bleiben, Laufzeit-Echos kommen aus dem Spielstand
    reload() {
      for (const id of [...defs.keys()]) if (!contentIds.has(id)) defs.delete(id);
      for (const d of stored()) api.register(d, { persist: false });
    },
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
          if (Array.isArray(def.effect.mood)) setMood(def);
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
    // Reparatur oder ausdrücklich: Stimmung zurücksetzen (Figuren-System zuerst), Echo als erledigt markieren
    clear(id) {
      const def = defs.get(id);
      if (def && def.effect && Array.isArray(def.effect.mood)) {
        const [npc, kind] = def.effect.mood;
        const m = state.get('moods.' + npc);
        const done = repair && kind === 'verstimmt' ? repair(npc, 'quest') : false;
        if (!done && m && (m === kind || m.kind === kind)) state.remove('moods.' + npc);
      }
      if (entry(id)) setEntry(id, { cleared: true, shown: true });
    },
    repairFor(questId) { return [...defs.values()].filter((d) => d.repair && d.repair.quest === questId && d.repair.clears !== false).map((d) => d.id); },
    moodOf(npc) { return state.get('moods.' + npc) || null; },
    isVerstimmt(npc) { return isVerstimmt(state.get('moods.' + npc)); },
    isFired(id) { return !!entry(id); },
  };
  if (content && content.list) for (const def of content.list('echoes')) { contentIds.add(def.id); api.register(def, { persist: false }); }
  api.reload();
  return api;
}
