// Dialog-Plugin (WP32): datengetriebene Szenen aus content/dialogues/* mit sichtbaren Wahlen nach Puls (grün 4, gelb 3,
// rot 2) plus Rückzug und Hilfe holen, NPC-Hitze mit „Deckel ab“ über 70, Zurückspulen (immer, stellt Hitze/Bindung/Flags
// wieder her), Lauschen-Knoten, Satz-Bau-Knoten, Zeichen-Kanal, Kamera-Rahmung, alle Zeilen vorlesbar.
//   game.dialogue = game.plugins.dialogue → { play(id|def, opts) → Promise<{ end, reason, node }>, current, isOpen, exit(reason),
//     rewind(), actor(npcId), rules: { maxChoices, pulsZone, isDeckel, visibleChoices }, createDialogue (Engine) }
//   game.dsl (worlddsl.js): Cond/Effect-Auswertung mit Welt-Haken – auch für Quests, Nachtwachen, Tore.
//   Figuren-System (WP34): npc:talk {id} startet die Szene eines wartenden Quest-Schritts (szene) mit dieser Figur.
//   Debug: LUMO.debug.playDialogue(id) · exitDialogue() · rewindDialogue() · hitze(npc, v?)
//   Szenario: 'call playDialogue e11-luc-kante' · 'expect dom:.choices == true' · 'emit dialogue:choose {"index":1}'
import { createStage, STAGE_CSS } from './stage.js';
import { createDialogue } from './engine.js';
import { maxChoices, pulsZone, isDeckel, visibleChoices } from './rules.js';
import { createWorldDsl } from '../quests/worlddsl.js';

export default {
  id: 'dialogue', order: 61, deps: ['ui'],
  install(game) {
    const { events, state } = game;
    if (!game.dsl) game.dsl = createWorldDsl(game);
    const dsl = game.dsl;
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.dialogue = '1'; st.textContent = STAGE_CSS; document.head.appendChild(st); }
    const stage = createStage({ game, dsl });

    // Szenen-Warteschlange: eine Figur hat eine Szene „parat“ (Quest-Schritt szene mit at/npc) – npc:talk startet sie
    const pending = new Map();   // npcId → { dialogue, resolve }
    events.on('npc:talk', (e) => {
      if (!e || e.handled || !e.id) return;
      const p = pending.get(e.id);
      if (!p) return;
      e.handled = true;
      pending.delete(e.id);
      stage.play(p.dialogue, p.opts).then(p.resolve);
    });

    const api = {
      play: (id, opts) => stage.play(id, opts),
      get current() { return stage.current; },
      get isOpen() { return stage.isOpen; },
      exit: (r) => stage.exit(r),
      rewind: () => stage.rewind(),
      actor: (id) => stage.actor(id),
      // Szene bei einer Figur hinterlegen: startet, wenn die Spielfigur mit ihr redet (oder sofort, wenn keine Figur da ist)
      offerAt(npcId, dialogue, opts = {}) {
        const N = game.npcs || (game.plugins && game.plugins.npcs);
        if (!N || !N.get || !N.get(npcId)) return stage.play(dialogue, opts);
        return new Promise((resolve) => pending.set(npcId, { dialogue, opts, resolve }));
      },
      cancelOffer(npcId) { pending.delete(npcId); },
      rules: { maxChoices, pulsZone, isDeckel, visibleChoices },
      createDialogue,
      stage,
    };
    game.dialogue = api;

    // Demo für Screenshots und Tests
    if (game.ui && game.ui.demo) game.ui.demo.szene = () => api.play('e11-luc-kante');

    const D = game.debug || (game.debug = {});
    D.playDialogue = (id, opts) => api.play(id, opts);
    D.exitDialogue = (r) => api.exit(r);
    D.rewindDialogue = () => api.rewind();
    D.hitze = (npc, v) => (v === undefined ? dsl.hitze(npc) : dsl.setHitze(npc, Number(v), 'debug'));
    return api;
  },
};
