// Dialog-Engine (WP32): führt eine DialogueDef (CONTENT-SCHEMA) datengetrieben aus – ohne Browser. Die Bühne
// (stage.js) liefert Blasen, Kacheln, Kamera, Lauschen und Minispiele über den Kontext.
//   const d = createDialogue(def, ctx);  await d.start() → { end: true, reason: 'end'|'rueckzug'|'exit'|'abbruch', node }
//   d.node (aktueller Knoten) · d.history ([{ node, snap }]) · d.rewind() · d.exit(reason) · d.running · d.hitzeOf(npc)
// Kontext:
//   puls() · hasHilfe() · hitze(npc) · setHitze(npc, v) · evalCond(c) · applyEffects(list) · snapshot() · restore(snap)
//   say({ who, text, tts, anim, sign, node }) → Promise          Sprechblase (jede Zeile vorlesbar)
//   ask({ items, system, rewind, node }) → Promise<{ index | system:'rueckzug'|'hilfe' | rewind:true | exit:true }>
//   lauschen({ who, text, seconds, node }) → Promise<{ ok }>     Satz entsteht; Bewegung/Tippen bricht ab
//   satzbau(minigameId, { node }) → Promise<{ clean, thorn }>    Satz-Bau-Minispiel
//   minigame(id, { choice }) → Promise<{ ok, medal }>
//   sign(emote, { who:'du' })                                    Zeichen-Kanal (Emote der Spielfigur)
//   hilfe(cast) → Promise                                        Hilfe holen: erwachsene Figur, Szene pausiert
//   emit(name, payload)
// Regeln (rules.js): sichtbare Wahlen nach Puls, Deckel ab über 70, Zurückspulen stellt Hitze/Bindung/Flags wieder her.
// Ereignisse: dialogue:start {id} · dialogue:node {id, node} · dialogue:choice {id, node, index, choice} ·
//   dialogue:bounce {id, node, npc} (Deckel ab) · dialogue:rewind {id, to} · dialogue:lauschen {id, node, ok} ·
//   dialogue:hilfe {id} · dialogue:end {id, reason, node}
import { visibleChoices, textOf, DECKEL_HITZE, HILFE_HITZE, HILFE_PULS } from './rules.js';

const absHitze = (e) => (e && e.npcHitze ? { ...e, set: true } : e);

export function createDialogue(def, ctx) {
  const nodes = def.nodes || {};
  const history = [];
  let cur = null;
  let running = false;
  let exitReason = null;
  const emit = (n, p) => { if (ctx.emit) ctx.emit(n, { id: def.id, ...p }); };
  const speakerOf = (node) => node.speaker || (def.cast && def.cast[0]) || 'erzaehler';

  async function enterNode(id) {
    const node = nodes[id];
    if (!node) throw new Error(`Dialog ${def.id}: Knoten '${id}' fehlt`);
    history.push({ node: id, snap: ctx.snapshot ? ctx.snapshot() : null });
    cur = id;
    emit('dialogue:node', { node: id });
    if (node.enter) await ctx.applyEffects(node.enter.map(absHitze));
    return node;
  }

  // Ein Knoten: sagen (ggf. lauschen), Satz-Bau, Wirkungen, dann Wahl / goto / Ende. Rückgabe: nächster Knoten oder null.
  async function step(id) {
    const node = await enterNode(id);
    if (exitReason) return null;
    const who = speakerOf(node);
    if (node.say !== undefined || node.sign) {
      if (node.lauschen) {
        const r = await ctx.lauschen({ who, text: node.say, tts: node.say && node.say.tts, seconds: node.lauschen.seconds, anim: node.anim, node: id });
        emit('dialogue:lauschen', { node: id, ok: !!(r && r.ok) });
        if (exitReason) return null;
        if (!r || !r.ok) {
          // Abbruch: der Satz bricht ab, die Figur verstummt kurz; abort-Knoten oder derselbe Knoten noch einmal
          if (ctx.say) await ctx.say({ who, text: node.lauschen.abortSay || '…', anim: node.anim, node: id, brief: true });
          if (exitReason) return null;
          if (node.lauschen.abort) return node.lauschen.abort;
          history.pop();
          return id;
        }
      } else {
        await ctx.say({ who, text: node.say, tts: node.say && node.say.tts, anim: node.anim, sign: node.sign, node: id });
      }
      if (exitReason) return null;
    }
    if (node.satzbau) {
      const r = await ctx.satzbau(node.satzbau, { node: id, who });
      if (exitReason) return null;
      if (r && r.goto) return r.goto;
    }
    if (node.effects) await ctx.applyEffects(node.effects);
    if (exitReason) return null;
    if (node.end) return null;
    if (node.choices) return askLoop(id, node, who);
    if (node.goto) return node.goto;
    return null;
  }

  async function askLoop(id, node, who) {
    for (;;) {
      const items = visibleChoices(node.choices, { puls: ctx.puls(), hitze: ctx.hitze(who), evalCond: (c) => ctx.evalCond(c) });
      const r = await ctx.ask({ items, node: id, who, system: { rueckzug: true, hilfe: ctx.hasHilfe ? (ctx.hasHilfe() ? true : false) : 'auto' }, rewind: def.rewind !== false && history.length > 1 });
      if (exitReason) return null;
      if (!r) return null;
      if (r.exit) { exitReason = 'exit'; return null; }
      if (r.rewind) { const to = rewindTarget(); if (to) { emit('dialogue:rewind', { from: id, to }); return to; } continue; }
      if (r.system === 'rueckzug') { exitReason = 'rueckzug'; return null; }
      if (r.system === 'hilfe') {
        emit('dialogue:hilfe', { node: id });
        if (ctx.hilfe) await ctx.hilfe(def.cast || [who], { node: id });
        else { ctx.setHitze(who, ctx.hitze(who) + HILFE_HITZE); if (ctx.setPuls) ctx.setPuls(ctx.puls() + HILFE_PULS); }
        if (exitReason) return null;
        continue;   // Szene läuft an derselben Stelle weiter
      }
      const it = items[r.index];
      if (!it) continue;
      const c = it.choice;
      emit('dialogue:choice', { node: id, index: r.index, choice: c, deckel: it.deckel });
      if (it.deckel) {
        // Deckel ab (DESIGN §6): Argumente prallen ab – nur Handeln zählt. Kein Ende, keine Strafe, nur Hitze +5.
        ctx.setHitze(who, ctx.hitze(who) + DECKEL_HITZE, 'deckel');
        emit('dialogue:bounce', { node: id, npc: who });
        if (ctx.say) await ctx.say({ who, text: node.deckel || def.deckel || '…', anim: node.anim || 'angry', node: id, brief: true });
        if (exitReason) return null;
        continue;
      }
      if (c.sign && ctx.sign) await ctx.sign(c.sign, { who: 'du', hum: c.hum, choice: c });
      if (c.effects) await ctx.applyEffects(c.effects);
      if (exitReason) return null;
      if (c.minigame) {
        const m = await ctx.minigame(c.minigame, { choice: c, node: id, who });
        if (exitReason) return null;
        if (m && m.ok === false && c.gotoFail) return c.gotoFail;
      }
      if (c.end) return null;
      return c.goto || null;
    }
  }

  // Zurückspulen: zum letzten Wahl-Knoten vor dem aktuellen zurück und dessen Zustand (Hitze, Bindung, Flags …) wiederherstellen
  function rewindTarget() {
    if (history.length < 2) return null;
    history.pop();                                        // aktueller Knoten
    while (history.length > 1) {
      const top = history[history.length - 1];
      const n = nodes[top.node];
      if (n && n.choices) break;
      history.pop();
    }
    const target = history.pop();
    if (!target) return null;
    if (ctx.restore && target.snap) ctx.restore(target.snap);
    return target.node;
  }

  const api = {
    def,
    get node() { return cur; },
    get history() { return history.map((h) => h.node); },
    get running() { return running; },
    hitzeOf(npc) { return ctx.hitze(npc); },
    // Sofort verlassen (Pause/X, Rückzug, Sicherheit): löst start() mit reason auf
    exit(reason = 'exit') { if (!running) return; exitReason = reason; if (ctx.cancel) ctx.cancel(reason); },
    rewind() {
      const to = rewindTarget();
      if (to) emit('dialogue:rewind', { from: cur, to });
      return to;
    },
    async start() {
      if (running) throw new Error('Dialog läuft schon');
      running = true; exitReason = null; history.length = 0;
      emit('dialogue:start', {});
      let next = def.start;
      let guard = 500;
      try {
        while (next && !exitReason && guard-- > 0) next = await step(next);
      } catch (e) {
        console.error('[dialog]', def.id, e);
        exitReason = 'fehler';
      }
      running = false;
      const reason = exitReason || 'end';
      const result = { end: true, reason, node: cur, id: def.id };
      emit('dialogue:end', { reason, node: cur });
      return result;
    },
    // Für Tests: läuft der Dialog gerade auf diesem Knoten?
    at(id) { return cur === id; },
  };
  return api;
}
