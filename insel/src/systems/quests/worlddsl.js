// Welt-Kontext für die Cond/Effect-DSL (Browser): verbindet dsl.js mit Spielzustand, Schleier, UI, Figuren, Szenen.
// Wird vom Dialog-Plugin angelegt (game.dsl) und vom Quest-Plugin um den quest-Haken ergänzt. Andere Systeme (Puls WP33,
// Figuren WP34, Minispiele WP36) dürfen Haken ersetzen: game.dsl.hooks.<name> = fn(value, effect).
//   game.dsl → createDslContext(...) + Haken: veil (Teil-Farbwelle oder sofort), relapse, glimm, toast, say, sound, anim,
//   scene, gate, cosmetic, tank, emotion, echo, wait · hitze/setHitze laufen über game.npcs, wenn das Figuren-System da ist
import { createDslContext, pulsZone, clamp100 } from './dsl.js';

export function createWorldDsl(game) {
  const { state, events, content, ui, world, audio } = game;
  const dsl = createDslContext({
    state, events, content,
    time: () => ({ hour: game.time ? game.time.hour : Number(state.get('time.hour', 12)), day: Number(state.get('time.day', 1)) || 1 }),
    mode: () => state.get('settings.mode', 'abenteuer'),
    hooks: {
      // Teil-Farbwelle vom Ort aus (Standard: Spielerposition); instant = ohne Welle (Kurzfassung, Laden)
      veil(v) {
        const veil = world && world.veil;
        const to = Math.max(0, Math.min(1, Number(v.to)));
        const isPatch = !!(veil && veil.getPatch && veil.getPatch(v.zone));
        if (isPatch) state.set('veil.patches.' + v.zone, to); else state.set('veil.zones.' + v.zone, to);
        if (!veil) return true;
        if (v.instant || !veil.restoreZone) { if (isPatch) veil.setPatch(v.zone, to, { seconds: 1.2 }); else veil.setZone(v.zone, to, { seconds: 1.2 }); events.emit('veil:set', { zone: v.zone, amount: to }); return true; }
        const from = v.from ? content.resolveSite(v.from) : null;
        const p = from || (game.player ? { x: game.player.position.x, z: game.player.position.z } : {});
        const cur = isPatch ? Number(veil.getPatch(v.zone).veil) : (veil.zoneValue ? veil.zoneValue(v.zone) : 1);
        if (cur <= to + 1e-6) { events.emit('veil:set', { zone: v.zone, amount: to }); return true; }   // schon farbiger: keine Welle
        veil.restoreZone(v.zone, { amount: to, x: p.x, z: p.z, onDone: () => events.emit('veil:set', { zone: v.zone, amount: to }) });
        return true;
      },
      relapse(v) {
        const veil = world && world.veil;
        const to = Math.max(0, Math.min(1, Number(v.to === undefined ? 1 : v.to)));
        state.set('veil.patches.' + v.patch, to);
        if (!veil) return true;
        if (!veil.getPatch(v.patch)) {
          const def = content.list('regions').flatMap((r) => (r.veil && r.veil.patches) || []).find((p) => p.id === v.patch);
          if (def) veil.addPatch({ id: def.id, x: def.x, z: def.z, r: def.r, veil: 0 });
        }
        if (veil.getPatch(v.patch)) veil.relapse(v.patch, { to });
        return true;
      },
      glimm(t, e) { if (ui && ui.glimm) ui.glimm(t, { seconds: (e && e.seconds) || 3.4 }); },
      toast(t) { if (ui && ui.toast) ui.toast(typeof t === 'object' ? t.t : t); },
      say(t, e) { if (ui && ui.say) return ui.say({ who: (e && e.who) || 'erzaehler', text: t, wait: e && e.wait !== undefined ? e.wait : false }); },
      sound(id) { if (audio && audio.has && audio.has(id)) audio.play(id); },
      anim(v) {
        if (game.npcs && game.npcs.applyEffect && game.npcs.applyEffect({ anim: v })) return true;
        const a = game.dialogue && game.dialogue.actor ? game.dialogue.actor(v.npc) : null;
        if (a && a.humanoid) { if (v.emote) a.humanoid.playEmote(v.emote, { loop: !!v.loop }); else if (v.anim) a.humanoid.setAnim(v.anim); return true; }
        return false;
      },
      scene(v) { if (!game.scenes) return false; if (v.exit) return game.scenes.exit({}); return game.scenes.enter(v.enter, { spawn: v.spawn || 'eingang' }); },
      gate(v) { events.emit('gate:' + (v.open ? 'open' : 'close'), { id: v.open || v.close }); return true; },
      cosmetic(id) { if (game.plugins.cosmetics && game.plugins.cosmetics.refresh) game.plugins.cosmetics.refresh(); return true; },
      tank(v) { if (game.npcs && game.npcs.tank) { game.npcs.tank(v.npc, v.tank, v.add, { kind: v.kind || 'need' }); return true; } return undefined; },
      emotion(v) { if (game.npcs && game.npcs.setEmotion) { game.npcs.setEmotion(v.npc, { primary: v.primary, secondary: v.secondary }); return true; } return undefined; },
      // Stimmung („verstimmt“ mit Ursache und Reparatur-Quest) führt das Figuren-System (WP34); ohne es schreibt dsl.js dasselbe Format
      mood(v, e) { if (game.npcs && game.npcs.applyEffect) return game.npcs.applyEffect({ mood: v, cause: e && e.cause, repair: e && e.repair }); return undefined; },
      wait(s) { return new Promise((r) => setTimeout(r, Math.max(0, s) * 1000)); },
    },
  });
  // Hitze: das Figuren-System (WP34) führt sie im Gefühlsmodell; session.hitze spiegelt sie für Bedingungen und Tests
  const baseHitze = dsl.hitze, baseSetHitze = dsl.setHitze;
  dsl.hitze = (npc) => {
    const n = game.npcs && game.npcs.get ? game.npcs.get(npc) : null;
    if (n && n.emotion && n.emotion.get) return Math.round(n.emotion.get().heat || 0);
    return baseHitze(npc);
  };
  dsl.setHitze = (npc, v, reason) => {
    const h = clamp100(v);
    const n = game.npcs && game.npcs.get ? game.npcs.get(npc) : null;
    if (n && game.npcs.setHeat) game.npcs.setHeat(npc, h);
    return baseSetHitze(npc, h, reason);
  };
  // Puls: bis WP33 direkt im Zustand; ein Puls-System darf dsl.setPuls/dsl.puls ersetzen (Anti-Spirale, Deckel)
  const basePuls = dsl.setPuls;
  dsl.setPuls = (v, reason) => {
    const P = game.plugins && game.plugins.puls;
    if (P && typeof P.set === 'function') { const r = P.set(clamp100(v), reason || 'effekt'); return typeof r === 'number' ? r : dsl.puls(); }
    return basePuls(v, reason);
  };
  dsl.zone = () => pulsZone(dsl.puls());
  return dsl;
}
