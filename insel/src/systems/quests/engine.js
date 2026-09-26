// Quest-Engine (WP31): Zustände gesperrt/kurz/offen/aktiv/fertig je Einheit, Schritte aus den 12 Vorlagen, Marker,
// Belohnungen (Teil-Farbwelle, Aufnäher mit Rückseite, Glimm-Zeile, Echte-Welt-Karte), Hinweisleiter, Taten-Log,
// Echos, Kurzfassung. Reine Logik: die Welt kommt über den Adapter ctx (templates.js) und die DSL-Haken (dsl.js).
//   const q = createQuestEngine({ content, state, ctx, dsl, emit, session });
//   q.defs() · q.get(id) · q.status(id) · q.active (Haupt-Quest-ID) · q.running (alle laufenden IDs) · q.current (Runner)
//   q.offer(id) · q.start(id, { kurz }) · q.startKurz(id) · q.stop(id) · q.complete(id) · q.completeStep() · q.failStep(reason)
//   q.skipStep() · q.stepInfo(id) → { index, step, describe } · q.update(dt) · q.resume() · q.applyKurz(id)
//   q.deeds · q.echoes · q.hints · q.markerTarget() · q.progress(id) → { done, total, step }
// Spielstand: units.<id> (Einheiten) · quests.<id> = { status?, step, done:[…], fails:{…}, data:{…}, kurz, kurzApplied, kurzDone }
//   · session.activeUnit · deeds/deedLog · echoes · moods · patches · lichtsplitter · stiche.<unit>
// Ereignisse: quest:offer · quest:start {id, kurz} · quest:step {id, step, index, params} · quest:step:done · quest:step:fail
//   · quest:hint {id, step, stage} · quest:skip · quest:complete {id, kurz} · unit:complete {id} · patch:unlock {unit}
//   · quest:kurz {id} (Kurzfassung angewendet) · quest:marker {target}
import { createRunner } from './templates.js';
import { createHintLadder, RUECKENWIND_GLIMM } from './hints.js';
import { createDeeds, createEchoes } from './deeds.js';
import { evalCond, applyEffect, applyEffects, addDeed } from './dsl.js';

export const UNIT_RE = /^j1-[ej]\d\d$/;
export const isUnitQuest = (id) => UNIT_RE.test(String(id));

export function createQuestEngine({ content, state, ctx, dsl, emit = () => {}, session = () => 1, npcRepair = null, log = console } = {}) {
  const runners = new Map();   // id -> { runner, index, def, kurz }
  const hints = createHintLadder({ onStage: onHintStage });
  const deeds = createDeeds({ state, content, time: () => dsl.time() });
  const echoes = createEchoes({ state, content, evalCond: (c) => evalCond(c, dsl), time: () => dsl.time(), session, repair: npcRepair,
    onFire: (def) => { emit('echo:fire', { id: def.id, npc: def.line && def.line.npc, repair: def.repair || null }); if (def.repair && def.repair.quest) api.offer(def.repair.quest); },
    applyEffect: (e) => applyEffect(e, dsl) });
  let mainId = null;

  const defOf = (id) => content.get('quests', id) || null;
  const unitOf = (id) => (content.unit ? content.unit(id) : null);
  const regionOf = (def) => (def && content.get('regions', def.region)) || null;
  const qs = (id) => state.get('quests.' + id) || {};
  const setQ = (id, patch) => state.set('quests.' + id, { ...qs(id), ...patch });
  const stepsOf = (def, kurz) => {
    if (!kurz || !def.kurzfassung || !Array.isArray(def.kurzfassung.steps)) return def.steps || [];
    return def.kurzfassung.steps.map((sid) => (def.steps || []).find((s) => s.id === sid)).filter(Boolean);
  };

  // ---- Status ----
  function status(id) {
    if (isUnitQuest(id)) return state.get('units.' + id) || 'gesperrt';
    return qs(id).status || 'gesperrt';
  }
  function setStatus(id, st) {
    if (isUnitQuest(id)) { if (state.get('units.' + id) !== st) state.set('units.' + id, st); }
    else setQ(id, { status: st });
  }

  // ---- Hinweisleiter ----
  function onHintStage(stage, { step }) {
    const cur = api.current;
    const def = mainId ? defOf(mainId) : null;
    const stepDef = cur ? cur.runner.step : null;
    emit('quest:hint', { id: mainId, step, stage: stage.id, fails: hints.failsOf(step) });
    if (stage.id === 'rueckenwind') {
      if (dsl.setPuls) dsl.setPuls(dsl.puls() + (stage.puls || -20), 'rueckenwind');
      if (ctx.rueckenwind) ctx.rueckenwind({ step, quest: mainId });
      if (ctx.glimm) ctx.glimm(RUECKENWIND_GLIMM);
    } else if (stage.id === 'glimm') {
      const line = stepDef && stepDef.hints && stepDef.hints.glimm && stepDef.hints.glimm[0];
      if (ctx.glimm) ctx.glimm(line || 'Schau dich um. Da vorne.');
    } else if (stage.id === 'leuchten') {
      if (ctx.markerGlow) ctx.markerGlow(true);
    } else if (stage.id === 'ueberspringen') {
      if (ctx.offerSkip) ctx.offerSkip({ quest: mainId, step, optional: !!(stepDef && stepDef.optional), label: def && def.title }).then((yes) => { if (yes) api.skipStep(); });
    }
  }

  // ---- Schritte ----
  function runStep(id, index) {
    const entry = runners.get(id);
    if (!entry) return;
    const def = entry.def;
    const steps = stepsOf(def, entry.kurz);
    if (entry.runner) { entry.runner.stop(); entry.runner = null; }
    if (index >= steps.length) { api.complete(id); return; }
    const step = steps[index];
    entry.index = index;
    setQ(id, { step: step.id });
    const data = (qs(id).data || {})[step.id] || {};
    const runner = createRunner(step, {
      quest: def, ctx, data,
      done: (res) => onStepDone(id, step, res),
      fail: (reason) => api.failStep(reason, id),
      progress: (p) => emit('quest:progress', { id, step: step.id, progress: p }),
    });
    entry.runner = runner;
    emit('quest:step', { id, step: step.id, index, params: step.params, template: step.template, optional: !!step.optional, kurz: entry.kurz });
    if (step.onStart) applyEffects(step.onStart, dsl);
    try { runner.start(); } catch (e) { log.error('[quest]', id, step.id, e); }
    if (id === mainId) syncMarker();
  }
  async function onStepDone(id, step, res) {
    const entry = runners.get(id);
    if (!entry) return;
    const q = qs(id);
    setQ(id, { done: [...(q.done || []), step.id], data: { ...(q.data || {}), [step.id]: entry.runner && entry.runner.data ? entry.runner.data : {} } });
    hints.reset(step.id);
    if (ctx.markerGlow) ctx.markerGlow(false);
    if (ctx.clearRueckenwind) ctx.clearRueckenwind();
    emit('quest:step:done', { id, step: step.id, result: res || null });
    if (step.onDone) await applyEffects(step.onDone, dsl);
    if (step.deed) addDeed(dsl, step.deed, { unit: id });
    runStep(id, entry.index + 1);
  }

  function syncMarker() {
    const cur = api.current;
    const t = cur && cur.runner.describe ? cur.runner.describe() : null;
    emit('quest:marker', { id: mainId, target: t ? t.target : null, label: t ? t.label : null, icon: t ? t.icon : null });
  }

  // ---- Belohnungen ----
  async function complete(id) {
    const entry = runners.get(id);
    const def = defOf(id);
    if (!def) return false;
    const kurz = !!(entry && entry.kurz);
    if (entry) { if (entry.runner) entry.runner.stop(); runners.delete(id); }
    const effects = kurz ? (def.kurzfassung && def.kurzfassung.onComplete) || [] : (def.onComplete || []);
    if (state.get('session.activeUnit') === id) state.set('session.activeUnit', null);
    if (kurz) {
      setQ(id, { step: null, kurzDone: true });
      await applyEffects(effects, dsl);
      emit('quest:complete', { id, kurz: true });
    } else {
      setQ(id, { step: null, completedDay: dsl.time().day });
      setStatus(id, 'fertig');
      await applyEffects(effects, dsl);
      // Aufnäher je Einheit immer (auch ohne explizites patch-Effekt; Reparatur-/Nebenquests nur mit eigenem {patch}),
      // Teil-Farbwelle aus der Region, wenn die Quest keine eigene setzt
      if (isUnitQuest(id) && !(state.get('patches', []) || []).includes(id)) await applyEffects([{ patch: id }], dsl);
      const hasVeil = effects.some((e) => e && e.veil);
      const region = regionOf(def);
      if (!hasVeil && region && region.veil && region.veil.steps && region.veil.steps[id] !== undefined) {
        await applyEffects([{ veil: { zone: region.veil.zone || def.region, to: region.veil.steps[id] } }], dsl);
      }
      if (region && region.veil && Array.isArray(region.veil.patches)) {
        for (const p of region.veil.patches) if (p.freeAt === id) await applyEffects([{ veil: { zone: p.id, to: 0 } }], dsl);
      }
      if (def.shard && !(state.get('shards', []) || []).includes(def.shard)) await applyEffects([{ shard: def.shard }], dsl);
      emit('quest:complete', { id, kurz: false });
      if (isUnitQuest(id)) emit('unit:complete', { id, quest: true });
      for (const eid of echoes.repairFor(id)) { echoes.clear(eid); emit('echo:clear', { id: eid, quest: id }); }
    }
    if (def.glimm && ctx.glimm) ctx.glimm(def.glimm, { seconds: 4.2 });
    if (id === mainId) { mainId = null; emit('quest:marker', { id: null, target: null }); startNext(); }
    return true;
  }

  // Kurzfassung (DESIGN §10): Fähigkeit, Splitter und Schleier-Anteil sind sofort da; die 3-Minuten-Szene ist spielbar
  async function applyKurz(id) {
    const def = defOf(id);
    if (!def || qs(id).kurzApplied) return false;
    setQ(id, { kurzApplied: true });
    const k = def.kurzfassung || {};
    await applyEffects(k.grants || def.grants || [], dsl);
    if (k.veil) await applyEffects([{ veil: { zone: k.veil.zone, to: k.veil.to, instant: true } }], dsl);
    else { const region = regionOf(def); if (region && region.veil && region.veil.steps && region.veil.steps[id] !== undefined) await applyEffects([{ veil: { zone: region.veil.zone || def.region, to: region.veil.steps[id], instant: true } }], dsl); }
    if (def.shard) await applyEffects([{ shard: def.shard }], dsl);
    emit('quest:kurz', { id });
    return true;
  }

  function startNext() {
    if (mainId) return null;
    const open = api.defs().filter((d) => status(d.id) === 'offen' && !runners.has(d.id));
    open.sort((a, b) => (unitOf(a.id) ? (unitOf(a.id).joker ? 100 : 0) + unitOf(a.id).nr : 500) - (unitOf(b.id) ? (unitOf(b.id).joker ? 100 : 0) + unitOf(b.id).nr : 500));
    if (!open.length) return null;
    api.start(open[0].id);
    return open[0].id;
  }

  const api = {
    hints, deeds, echoes,
    defs() { return content.list('quests'); },
    get(id) { return defOf(id); },
    status,
    get active() { return mainId; },
    get running() { return [...runners.keys()]; },
    get current() { return mainId ? runners.get(mainId) || null : null; },
    runnerOf(id) { const e = runners.get(id); return e ? e.runner : null; },
    isUnitQuest,
    stepsOf: (id, kurz) => { const d = defOf(id); return d ? stepsOf(d, kurz) : []; },
    stepInfo(id = mainId) {
      const e = runners.get(id);
      if (!e) return null;
      return { index: e.index, step: e.runner ? e.runner.step : null, describe: e.runner && e.runner.describe ? e.runner.describe() : null, kurz: e.kurz };
    },
    progress(id = mainId) {
      const d = defOf(id);
      if (!d) return null;
      const e = runners.get(id);
      const total = stepsOf(d, e ? e.kurz : false).length;
      return { done: (qs(id).done || []).length, total, step: qs(id).step || null, status: status(id) };
    },
    markerTarget() { const c = api.current; return c && c.runner.describe ? c.runner.describe().target : null; },
    // Angebot: Quest wird 'offen' (Code, Echo-Reparatur, Effekt quest:['offer', id]); der Hauptmarker folgt der Reihe nach
    offer(id) {
      const def = defOf(id);
      if (!def) return false;
      const st = status(id);
      if (st === 'fertig' || st === 'aktiv') return false;
      if (st !== 'offen') setStatus(id, 'offen');
      emit('quest:offer', { id });
      if (!mainId) startNext();
      return true;
    },
    start(id, { kurz = false, resume = false } = {}) {
      const def = defOf(id);
      if (!def) { log.warn('[quest] unbekannt:', id); return false; }
      if (runners.has(id)) return false;
      const isKurz = kurz || (isUnitQuest(id) && status(id) === 'kurz');
      if (!isKurz && status(id) === 'fertig') return false;
      if (mainId && mainId !== id) {
        // Es gibt immer nur einen Hauptmarker: laufende Quest zuerst beenden, Neues wartet als 'offen'
        if (!isKurz) { setStatus(id, 'offen'); emit('quest:offer', { id }); return false; }
      }
      const prev = qs(id);
      const steps = stepsOf(def, isKurz);
      if (!steps.length) { log.warn('[quest] keine Schritte:', id); return false; }
      let index = 0;
      if (resume && prev.step) { const i = steps.findIndex((s) => s.id === prev.step); if (i >= 0) index = i; }
      if (!resume) setQ(id, { step: null, done: [], data: {}, fails: {}, kurz: isKurz, startedDay: dsl.time().day });
      else setQ(id, { kurz: isKurz });
      // Die Kraft oder Stufe der Einheit kommt mit der Quest (DESIGN §10: der Code öffnet Quest und Kraft zugleich)
      if (!isKurz && !resume && def.grants) applyEffects(def.grants, dsl);
      hints.load(prev.fails || {});
      if (!isKurz) setStatus(id, 'aktiv');
      mainId = id;
      state.set('session.activeUnit', id);
      runners.set(id, { runner: null, index, def, kurz: isKurz });
      emit('quest:start', { id, kurz: isKurz, resume, title: def.title });
      runStep(id, index);
      return true;
    },
    startKurz(id) { return api.start(id, { kurz: true }); },
    stop(id = mainId) {
      const e = runners.get(id);
      if (!e) return false;
      if (e.runner) e.runner.stop();
      runners.delete(id);
      if (mainId === id) { mainId = null; emit('quest:marker', { id: null, target: null }); }
      emit('quest:stop', { id });
      return true;
    },
    complete,
    applyKurz,
    // Debug/Tests: aktuellen Schritt als erledigt/gescheitert/übersprungen behandeln
    completeStep(id = mainId, res = { forced: true }) { const e = runners.get(id); if (!e || !e.runner) return false; const step = e.runner.step; e.runner.stop(); onStepDone(id, step, res); return true; },
    failStep(reason = 'fehlschlag', id = mainId) {
      const e = runners.get(id);
      if (!e || !e.runner) return null;
      const step = e.runner.step;
      const q = qs(id);
      const fails = { ...(q.fails || {}), [step.id]: ((q.fails || {})[step.id] || 0) + 1 };
      setQ(id, { fails });
      emit('quest:step:fail', { id, step: step.id, reason, fails: fails[step.id] });
      return hints.fail(step.id);
    },
    skipStep(id = mainId) {
      const e = runners.get(id);
      if (!e || !e.runner) return false;
      const step = e.runner.step;
      emit('quest:skip', { id, step: step.id });
      if (ctx.glimm) ctx.glimm('Geht später nochmal.');
      e.runner.stop();
      const q = qs(id);
      setQ(id, { done: [...(q.done || []), step.id], skipped: [...(q.skipped || []), step.id] });
      hints.reset(step.id);
      if (ctx.markerGlow) ctx.markerGlow(false);
      runStep(id, e.index + 1);
      return true;
    },
    update(dt) { for (const e of runners.values()) if (e.runner && e.runner.update) { try { e.runner.update(dt); } catch (err) { log.error('[quest]', err); } } },
    // Nach Laden/Neustart: laufende Quest am gespeicherten Schritt fortsetzen, Kurzfassungen anwenden
    resume() {
      for (const e of [...runners.values()]) if (e.runner) e.runner.stop();
      runners.clear(); mainId = null; hints.resetAll();
      const units = state.get('units', {}) || {};
      for (const [id, st] of Object.entries(units)) if (st === 'kurz' && defOf(id)) applyKurz(id);
      const active = api.defs().find((d) => status(d.id) === 'aktiv');
      if (active) api.start(active.id, { resume: true });
      else startNext();
      echoes.reload();
      echoes.check();
      return mainId;
    },
    onUnitState(id, st) {
      if (!defOf(id)) return;
      if (st === 'kurz') applyKurz(id);
      else if (st === 'offen' && !runners.has(id)) { emit('quest:offer', { id }); if (!mainId) startNext(); }
    },
    syncMarker,
  };
  return api;
}
