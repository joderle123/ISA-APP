// Teamgeist (WP35, DESIGN §5): Crew-Ruf (e03: Kraft-Rad, auf eine Markierung zielen, Helfer wählen – die Figur erreicht
// ihr Ziel in unter 10 s), Hilfe holen (e15, als Dialogoption schon ab e11 – Puls-Plugin), zweites Nein (e25: eine
// Crew-Figur bekräftigt dein Nein), Zuschauer-Wende (e26: Umstehende wenden sich dir zu, das Gegenüber kühlt ab).
//   const tg = createTeamgeist({ game }); tg.ruf({ target, helper }) → Promise<{ ok, npc, seconds }> · tg.registerTarget(def)
//   · tg.removeTarget(id) · tg.targets() · tg.crew() · tg.hilfe() · tg.zweitesNein(vs) · tg.zuschauer(vs)
//   Ziel-Def: { id, x, z, r?, label?, needs?: Cond, onHelp(npc), keep?: Sekunden }
//   Ereignisse: teamgeist:ruf:start {target} · teamgeist:ruf {npc, target, seconds} · teamgeist:ruf:cancel ·
//   teamgeist:zweitesNein {helper, vs} · teamgeist:zuschauer {count, vs, heat}
import { bystanderEffect } from './model.js';

const RUN_SPEED = 3.4;

export function createTeamgeist({ game }) {
  const { events, state, ui, player, content } = game;
  const emit = (n, p) => events.emit(n, p);
  const targets = new Map();
  let running = null;
  const hasRuf = () => (state.get('upgrades', []) || []).includes('teamgeist.ruf') || (state.get('abilities', []) || []).includes('teamgeist');
  const glimm = (key, opts) => { if (game.glimm && game.glimm.line) game.glimm.line(key, opts); };
  const bond = (id) => Number(state.get('bonds.' + id, 0)) || 0;

  function crew({ radius = 90, max = 4 } = {}) {
    const N = game.npcs;
    if (!N || !N.list) return [];
    const p = player.position;
    return N.list().filter((n) => n.def && !n.def.ambient && !n.hidden && n.distTo(p) < radius)
      .sort((a, b) => bond(b.id) - bond(a.id) || a.distTo(p) - b.distTo(p)).slice(0, max);
  }
  function registerTarget(def) { if (!def || !def.id) return null; targets.set(def.id, { r: 2.5, ...def }); return () => targets.delete(def.id); }
  function removeTarget(id) { return targets.delete(id); }
  function nearestTarget(radius = 30) {
    const p = player.position;
    let best = null, bd = radius;
    for (const t of targets.values()) { const d = Math.hypot(t.x - p.x, t.z - p.z); if (d < bd) { bd = d; best = t; } }
    return best;
  }
  function moveHelper(npc, tx, tz, { maxSeconds = 12 } = {}) {
    return new Promise((resolve) => {
      const t0 = game.loop ? game.loop.realTime : 0;
      const dx = tx - npc.position.x, dz = tz - npc.position.z;
      const d = Math.hypot(dx, dz) || 1;
      const nx = dx / d, nz = dz / d;
      // weiter als 26 m: erst näher heranholen, damit die Figur in unter 10 s ankommt (3,4 m/s)
      if (d > 26) npc.warpTo(tx - nx * 24, tz - nz * 24);
      let done = false;
      const finish = () => { if (done) return; done = true; resolve({ seconds: +((game.loop ? game.loop.realTime : 0) - t0).toFixed(2) }); };
      npc.setOverride({ x: tx - nx * 1.2, z: tz - nz * 1.2, run: true, anim: 'wave', onArrive: finish });
      setTimeout(() => { if (!done) { npc.warpTo(tx - nx * 1.2, tz - nz * 1.2); finish(); } }, maxSeconds * 1000);
    });
  }
  // Crew-Ruf: Ziel = registrierte Markierung in der Nähe, sonst 4 m vor der Figur; Helfer per Kachel wählen
  async function ruf({ target = null, helper = null } = {}) {
    if (!hasRuf()) return { ok: false, error: 'kein Crew-Ruf' };
    if (running) return { ok: false, error: 'läuft schon' };
    const p = player.position, yaw = player.yaw || 0;
    const t = target || nearestTarget() || { id: 'vor-dir', x: p.x + Math.sin(yaw) * 4, z: p.z + Math.cos(yaw) * 4, r: 2.5 };
    const list = crew();
    if (!list.length) { if (game.glimm) game.glimm.say('Niemand in der Nähe.'); return { ok: false, error: 'keine Crew' }; }
    emit('teamgeist:ruf:start', { target: t.id, x: t.x, z: t.z });
    if (ui.setMarker) ui.setMarker('crewruf', t.x, t.z, '◆', '#ffd166');
    if (game.particles) game.particles.emit({ x: t.x, y: game.world.island.getHeight(t.x, t.z) + 0.3, z: t.z, count: 24, spread: 0.6, speed: 0.4, up: 3.2, color: 0xffd166, size: 0.5, life: 1.8, gravity: -0.2, drag: 1.2, additive: true, alpha: 0.9 });
    let npc = helper ? (typeof helper === 'string' ? game.npcs.get(helper) : helper) : null;
    if (!npc) {
      const r = await ui.ask({ prompt: 'Wen rufst du?', items: list.map((n) => ({ id: n.id, label: n.name, icon: (n.def && n.def.icon) || 'team', color: n.color })), system: { rueckzug: { label: 'Doch nicht' }, hilfe: false } });
      if (r.system || r.cancelled) { if (ui.removeMarker) ui.removeMarker('crewruf'); emit('teamgeist:ruf:cancel', {}); return { ok: false, cancelled: true }; }
      npc = game.npcs.get(r.id);
    }
    if (!npc) { if (ui.removeMarker) ui.removeMarker('crewruf'); return { ok: false, error: 'Figur fehlt' }; }
    running = { npc: npc.id, target: t.id };
    glimm('crew');
    try {
      const r = await moveHelper(npc, t.x, t.z);
      if (npc.humanoid && npc.humanoid.playEmote) npc.humanoid.playEmote('daumen', { seconds: 1.4 });
      npc.face(player.position);
      if (ui.removeMarker) ui.removeMarker('crewruf');
      if (typeof t.onHelp === 'function') { try { await t.onHelp(npc); } catch (e) { console.error('[teamgeist] onHelp', e); } }
      emit('teamgeist:ruf', { npc: npc.id, target: t.id, seconds: r.seconds });
      const keep = typeof t.keep === 'number' ? t.keep : 20;
      setTimeout(() => { try { npc.clearOverride(); } catch (e) { /* weg */ } }, keep * 1000);
      return { ok: true, npc: npc.id, target: t.id, seconds: r.seconds };
    } finally { running = null; }
  }
  function hilfe() { return game.puls && game.puls.hilfeHolen ? game.puls.hilfeHolen({ via: 'teamgeist' }) : Promise.resolve({ ok: false }); }
  // Zweites Nein: eine Crew-Figur (Bindung zuerst) bekräftigt dein Nein, das Gegenüber kühlt ab
  async function zweitesNein(vs = null) {
    const N = game.npcs;
    if (!N) return { ok: false };
    const cand = N.near(14).filter((n) => n.def && !n.def.ambient && n.id !== vs).sort((a, b) => bond(b.id) - bond(a.id))[0];
    if (!cand) return { ok: false, error: 'keine Crew' };
    const def = content.get('npcs', cand.id);
    const text = (def && def.lines && def.lines.zweitesNein) || 'Nein heißt Nein. Lass es.';
    cand.face(player.position);
    if (cand.humanoid && cand.humanoid.playEmote) cand.humanoid.playEmote('handHeben', { seconds: 1.4 });
    await ui.say({ who: cand.id, text, wait: false, seconds: 2.6, anchor: cand.group });
    if (vs && N.heat) N.heat(vs, -20);
    if (N.deed) N.deed(cand.id, 'zweites-nein-' + cand.id, 'Zusammen Nein gesagt.');
    emit('teamgeist:zweitesNein', { helper: cand.id, vs });
    return { ok: true, helper: cand.id, vs };
  }
  // Zuschauer-Wende: Umstehende wenden sich dir zu und treten einen Schritt näher
  function zuschauer(vs = null) {
    const N = game.npcs;
    if (!N) return { ok: false, count: 0 };
    const p = player.position;
    const by = N.near(11).filter((n) => n.def && !n.def.ambient ? n.id !== vs : n.id !== vs).slice(0, 5);
    for (const n of by) {
      const dx = p.x - n.position.x, dz = p.z - n.position.z, d = Math.hypot(dx, dz) || 1;
      n.setOverride({ x: n.position.x + (dx / d) * 1.5, z: n.position.z + (dz / d) * 1.5, anim: 'idle', lookAt: { x: p.x, y: p.y + 1.55, z: p.z } });
      if (n.humanoid && n.humanoid.playEmote) n.humanoid.playEmote('handHeben', { seconds: 1.6 });
      setTimeout(() => { try { n.clearOverride(); } catch (e) { /* weg */ } }, 8000);
    }
    const eff = bystanderEffect(by.length);
    if (vs && N.heat && eff.heat) N.heat(vs, eff.heat);
    emit('teamgeist:zuschauer', { count: by.length, vs, heat: eff.heat, courage: eff.courage });
    if (by.length && game.glimm) game.glimm.say('Sie schauen her. Du bist nicht allein.');
    return { ok: by.length > 0, count: by.length, ...eff, npcs: by.map((n) => n.id) };
  }
  return { ruf, hilfe, zweitesNein, zuschauer, crew, registerTarget, removeTarget, targets: () => [...targets.values()], get running() { return running; }, RUN_SPEED };
}
