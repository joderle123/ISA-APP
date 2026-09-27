// Skills-Koffer (WP33, DESIGN §7): fünf Fächer (Körper, Sinne, Kopf, Menschen, Aktivitäten) mit GadgetDefs aus
// content/gadgets/*, Wirkung schwankt je Spielstand (0,7–1,3) und je Figur (npcFit), Skills-Tester (vorher/nachher,
// „hilft bis 60“), Ampelplan (ein Gadget je Zone + Notfall-Slot mit erwachsener Figur), Kopf-Gadgets verpuffen bei Rot
// sichtbar und ohne Strafe, Umbau am Koffer-Stein oder im Tagebuch. Ruhe-Kraft tippen = Gadget der aktuellen Zone.
//   game.koffer = game.plugins.koffer → { list(), owned(), has(id), def(id), effect(id, { npc }), use(id, { via, npc, mode })
//     → Promise<{ ok, id, before, after, verpufft?, cooldown?, error? }>, useForZone(), cooldownLeft(id),
//     tester { run(id), results(), entry(id) }, ampel { get(), set(zone, id), setNotfall(npc), adults() }, openEditor(),
//     stones(), FAECHER, FACH_LABEL, FACH_ICON }
//   Ereignisse: koffer:use {id, before, after, factor, via} · koffer:verpufft {id, puls} · koffer:cooldown {id, left}
//     · koffer:frost {x, z, r, seconds} · koffer:klang {seconds, until} · koffer:anker {seconds} · koffer:playlist {mode}
//     · koffer:kopf {id, x, z, r} · koffer:tandem {npc, done} · koffer:sprint {phase} · ampel:set {zone, gadget, warn}
//   Spielstand: gadgets[] · ampel {gruen, gelb, rot, notfall} · koffer.tests.<id> {before, after, reichweite, day}
//   Debug: LUMO.debug.koffer() · useGadget(id) · grantGadget(id) · setAmpel(zone, id) · kofferTester(id)
import { FAECHER, FACH_LABEL, FACH_ICON, ZONEN, ZONE_LABEL, effectFor, canUse, testerEntry, planFor, ampelSet, pickForZone } from './model.js';
import { esc } from '../../ui/overlay.js';

const CSS = `
.kf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.kf-fach{background:rgba(18,12,36,.55);box-shadow:0 0 0 1px rgba(255,255,255,.14);border-radius:18px;padding:12px 14px;border-left:4px solid var(--c-gold,#ffd166)}
.kf-fach h4{display:flex;align-items:center;gap:8px;margin:0 0 8px;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.kf-gadget{display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:10px;padding:8px 4px;border-top:1px solid rgba(255,255,255,.08)}
.kf-gadget:first-of-type{border-top:0}
.kf-gadget .kf-ico{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1)}
.kf-gadget b{display:block;font-size:16px}
.kf-gadget small{display:block;opacity:.8;font-size:13px}
.kf-gadget .kf-test{min-height:44px;padding:6px 12px;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;font:800 13px/1 var(--font,system-ui);cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,.14)}
.kf-empty{opacity:.6;font-size:14px;padding:6px 0}
.kf-ampel{display:grid;gap:10px;margin-top:8px}
.kf-zone{display:grid;grid-template-columns:96px 1fr;align-items:start;gap:10px;padding:10px 12px;border-radius:16px;background:rgba(18,12,36,.55);box-shadow:0 0 0 1px rgba(255,255,255,.14)}
.kf-zone > b{display:flex;align-items:center;gap:8px;font-size:15px;padding-top:10px}
.kf-zone i.kf-dot{width:14px;height:14px;border-radius:50%;display:inline-block}
.kf-zone.is-gruen i.kf-dot{background:#5ad24f}.kf-zone.is-gelb i.kf-dot{background:#ffd23f}.kf-zone.is-rot i.kf-dot{background:#ff5d5d}.kf-zone.is-notfall i.kf-dot{background:#ffd166}
.kf-opts{display:flex;flex-wrap:wrap;gap:8px}
.kf-opt{display:inline-flex;align-items:center;gap:6px;min-height:64px;min-width:64px;padding:6px 14px;border-radius:12px;background:rgba(255,255,255,.08);box-shadow:0 0 0 1px rgba(255,255,255,.14);color:#fff;font:800 14px/1.1 var(--font,system-ui);cursor:pointer}
.kf-opt.is-on{box-shadow:0 0 0 2px var(--c-gold,#ffd166);background:rgba(255,209,102,.16)}
.kf-opt.is-kopf-rot.is-on{box-shadow:0 0 0 2px #ff5d5d}
.kf-warn{margin:6px 0 0;font-size:13px;color:#ffb3b3}
.kf-graph{display:flex;align-items:center;gap:8px;font-size:13px;opacity:.9}
.kf-graph .kf-bar{position:relative;width:90px;height:8px;border-radius:4px;background:rgba(255,255,255,.14);overflow:hidden}
.kf-graph .kf-bar i{position:absolute;top:0;bottom:0;left:0;border-radius:4px;background:linear-gradient(90deg,#5ad24f,#ffd23f 45%,#ff5d5d)}
`;
const STONES = [
  { id: 'kofferstein-wetterwarte', site: 'wetterwarte', dx: 4, dz: 3 },
  { id: 'kofferstein-baumhaus', site: 'baumhaus', dx: -4, dz: 4 },
  { id: 'kofferstein-gedankenschlucht', site: 'gedankenschlucht', dx: 2, dz: -2 },
];

export default {
  id: 'koffer', order: 60.6, deps: ['ui', 'puls'],
  install(game) {
    const { events, state, content, ui, player, audio } = game;
    const puls = game.puls;
    const emit = (n, p) => events.emit(n, p);
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.koffer = '1'; st.textContent = CSS; document.head.appendChild(st); }
    const seed = () => state.get('seed', 1);
    const day = () => state.get('time.day', 1);
    const owned = () => (state.get('gadgets', []) || []).slice();
    const has = (id) => owned().includes(id);
    const def = (id) => content.get('gadgets', id);
    const defs = () => Object.fromEntries(content.list('gadgets').map((d) => [d.id, d]));
    const now = () => (game.loop ? game.loop.realTime : 0);
    const cd = new Map();     // id → Echtzeit, ab der es wieder geht
    const cooldownLeft = (id) => Math.max(0, (cd.get(id) || 0) - now());
    const effect = (id, { npc = null } = {}) => effectFor(def(id), { seed: seed(), npc });
    const glimm = (key, opts) => { if (puls && puls.glimm) puls.glimm.line(key, opts); };
    const zoneNow = () => (puls ? puls.zone : 'gruen');
    const nearestCalmNpc = (r = 5) => {
      const N = game.npcs; if (!N || !N.near) return null;
      return N.near(r).find((n) => n.def && !n.def.ambient && ((n.emotion.get().heat || 0) < 40)) || null;
    };
    const record = (id, before, after, reichweite) => { state.set('koffer.tests.' + id, { ...testerEntry({ before, after, reichweite }), day: day() }); };
    const poof = (color = 0xffffff, up = 1.2) => { const p = player.position; if (game.particles) game.particles.emit({ x: p.x, y: p.y + 1.2, z: p.z, count: 18, spread: 0.6, speed: 1.4, up, color, size: 0.5, life: 0.9, gravity: -0.4, drag: 2.2, additive: true, alpha: 0.9, grow: 1.5 }); };

    // ---- laufende Gadgets (Sprint-Ventil, Tandem-Takt, Anker, Klang, Playlist) ----
    let sprint = null, tandem = null, ankerUntil = 0, klangUntil = 0, playlistUntil = 0;
    function tick(dt) {
      if (!game.started || dt <= 0) return;
      if (sprint) {
        if (player.sprinting) sprint.t += dt;
        sprint.left -= dt;
        if (puls && puls.chip && Math.floor(sprint.t * 4) !== sprint.shown) { sprint.shown = Math.floor(sprint.t * 4); puls.chip(`Sprint-Ventil ${Math.min(sprint.need, sprint.t).toFixed(1)} / ${sprint.need} s`, { seconds: 1.5 }); }
        if (sprint.t >= sprint.need) { const s = sprint; sprint = null; finishUse(s.id, s.before, s.eff, s.via, { graph: true }); emit('koffer:sprint', { phase: 'done' }); glimm('gadget.sprint'); s.resolve(lastResult); }
        else if (sprint.left <= 0) { const s = sprint; sprint = null; emit('koffer:sprint', { phase: 'expired' }); s.resolve({ ok: false, id: s.id, expired: true, before: s.before, after: puls.value }); }
      }
      if (tandem) {
        const n = tandem.npc;
        const d = n.distTo(player.position);
        if (player.sprinting) { tandem.t = Math.max(0, tandem.t - dt * 2); tandem.hetzt = true; }
        else if (d <= tandem.r && player.speed > 0.25) tandem.t += dt;
        tandem.left -= dt;
        if (tandem.t >= tandem.need) {
          const t = tandem; tandem = null;
          if (game.npcs && game.npcs.heat) game.npcs.heat(n.def.id, -15);
          n.clearOverride();
          finishUse(t.id, t.before, t.eff, t.via);
          emit('koffer:tandem', { npc: n.def.id, done: true, hetzt: t.hetzt });
          glimm('gadget.tandem');
          t.resolve(lastResult);
        } else if (tandem.left <= 0) { const t = tandem; tandem = null; n.clearOverride(); emit('koffer:tandem', { npc: n.def.id, done: false }); t.resolve({ ok: false, id: t.id, expired: true, before: t.before, after: puls.value }); }
        else if (n.override && Math.floor(tandem.t) !== tandem.shown) { tandem.shown = Math.floor(tandem.t); const p = player.position; n.setOverride({ x: p.x + Math.sin((player.yaw || 0) + Math.PI / 2) * 1.4, z: p.z + Math.cos((player.yaw || 0) + Math.PI / 2) * 1.4, anim: 'idle' }); }
      }
      if (ankerUntil && now() > ankerUntil) { ankerUntil = 0; game.cameraRig.reducedFx = !!state.get('settings.reducedFx'); }
      if (playlistUntil && now() > playlistUntil) { playlistUntil = 0; if (game.music && game.music.jukebox) game.music.jukebox.stop(); }
    }
    game.addUpdate((dt) => tick(dt), { order: 44 });

    // ---- Nutzung ----
    let lastResult = null;
    function finishUse(id, before, eff, via, { graph = false } = {}) {
      const after = puls ? puls.add(eff.puls, 'gadget:' + id) : before;
      const d = def(id);
      cd.set(id, now() + (d && d.cooldown ? d.cooldown : 0));
      record(id, before, after, eff.reichweite);
      lastResult = { ok: true, id, before, after, factor: eff.factor, fit: eff.fit, reichweite: eff.reichweite, via };
      emit('koffer:use', lastResult);
      if (audio && audio.has && audio.has('chime')) audio.play('chime');
      if (graph || via === 'tester') { if (puls && puls.chip) puls.chip(d ? d.name : id, { before, after }); if (via === 'tester') glimm('tester'); else glimm('gadget.ok'); }
      else if (Math.random() < 0.35) glimm('gadget.ok');
      if (ui.journal && ui.journal.isOpen && ui.journal.current === 'koffer') ui.journal.refresh();
      return lastResult;
    }
    async function use(id, { via = 'kraft', npc = null, mode: plMode = null } = {}) {
      const d = def(id);
      if (!d) return { ok: false, id, error: 'unbekannt' };
      if (!has(id) && via !== 'debug') return { ok: false, id, error: 'nicht im Koffer' };
      if (d.use === 'notfall') { const r = await puls.hilfeHolen({ via: 'koffer' }); return { ok: !r.busy, id, before: r.before, after: r.after, notfall: true }; }
      const left = cooldownLeft(id);
      if (left > 0) { emit('koffer:cooldown', { id, left }); glimm('gadget.cooldown'); return { ok: false, id, cooldown: +left.toFixed(1) }; }
      const before = puls ? puls.value : 0;
      const zone = zoneNow();
      if (canUse(d, zone) === 'verpufft') {
        // Kopf-Gadget bei Rot: verpufft sichtbar, ohne Strafe (DESIGN §7)
        poof(0xc9bff0, 2.2);
        if (audio && audio.has && audio.has('whoosh')) audio.play('whoosh');
        if (puls && puls.chip) puls.chip(`${d.name}: puff.`, { seconds: 2.4 });
        glimm('gadget.verpufft', { force: true });
        emit('koffer:verpufft', { id, puls: before, zone });
        return { ok: false, id, verpufft: true, before, after: before };
      }
      const npcId = npc || (nearestCalmNpc(4) ? nearestCalmNpc(4).def.id : null);
      const eff = effect(id, { npc: npcId });
      const p = player.position;
      switch (d.use === 'sprint' ? 'sprint' : d.use === 'gehen' ? 'gehen' : d.id) {
        case 'sprint': {
          if (sprint) return { ok: false, id, error: 'läuft schon' };
          emit('koffer:sprint', { phase: 'start' });
          if (puls && puls.chip) puls.chip('Sprint-Ventil: fünf Sekunden voll rennen', { seconds: 2.4 });
          if (via === 'tester') { await new Promise((r) => setTimeout(r, 30)); return finishUse(id, before, eff, via, { graph: true }); }
          return new Promise((resolve) => { sprint = { id, before, eff, via, t: 0, need: (d.effect && d.effect.seconds) || 5, left: 14, shown: -1, resolve }; });
        }
        case 'gehen': {
          const n = npcId && game.npcs ? game.npcs.get(npcId) : nearestCalmNpc(6);
          if (!n) { if (puls && puls.glimm) puls.glimm.say('Keine ruhige Figur nah.'); return { ok: false, id, error: 'keine Figur' }; }
          if (tandem) return { ok: false, id, error: 'läuft schon' };
          if (via === 'tester') { await new Promise((r) => setTimeout(r, 30)); return finishUse(id, before, effect(id, { npc: n.def.id }), via, { graph: true }); }
          n.setOverride({ x: p.x + Math.sin((player.yaw || 0) + Math.PI / 2) * 1.4, z: p.z + Math.cos((player.yaw || 0) + Math.PI / 2) * 1.4, anim: 'idle' });
          emit('koffer:tandem', { npc: n.def.id, done: false, start: true });
          if (puls && puls.chip) puls.chip(`Im Takt mit ${n.name} gehen`, { seconds: 2.4 });
          return new Promise((resolve) => { tandem = { id, before, eff: effect(id, { npc: n.def.id }), via, npc: n, t: 0, need: (d.effect && d.effect.seconds) || 6, r: (d.effect && d.effect.radius) || 3, left: 30, shown: -1, hetzt: false, resolve }; });
        }
        case 'pumpsprung': { poof(0xfff3c4, 1.6); return finishUse(id, before, eff, via); }
        case 'quetschkoralle': {
          if (player.humanoid && player.humanoid.setHands) { player.humanoid.setHands('fist'); setTimeout(() => { try { player.humanoid.setHands(null); } catch (e) { /* weg */ } }, ((d.effect && d.effect.seconds) || 1.4) * 1000); }
          poof(0xff8ccf, 0.8);
          return finishUse(id, before, eff, via);
        }
        case 'kaeltekristall': {
          const yaw = player.yaw || 0, r = (d.effect && d.effect.radius) || 4;
          const tx = p.x + Math.sin(yaw) * 4.5, tz = p.z + Math.cos(yaw) * 4.5;
          if (game.particles) { for (let i = 0; i <= 6; i++) { const k = i / 6; game.particles.emit({ x: p.x + (tx - p.x) * k, y: p.y + 1.3 + Math.sin(k * Math.PI) * 1.6, z: p.z + (tz - p.z) * k, count: 2, spread: 0.15, speed: 0.2, up: 0.2, color: 0xbfe8ff, size: 0.45, life: 0.6, gravity: 0, drag: 2, additive: true, alpha: 0.9 }); } game.particles.emit({ x: tx, y: game.world.island.getHeight(tx, tz) + 0.3, z: tz, count: 40, spread: r * 0.7, speed: 1.2, up: 1.6, color: 0xdff6ff, size: 0.6, life: 1.6, gravity: -0.5, drag: 1.6, additive: true, alpha: 0.9, grow: 1.4 }); }
          emit('koffer:frost', { x: tx, z: tz, r, seconds: (d.effect && d.effect.seconds) || 12 });
          glimm('kaelte');
          return finishUse(id, before, eff, via);
        }
        case 'klangmuschel': {
          const sec = (d.effect && d.effect.seconds) || 6;
          if (game.music && game.music.klangmuschel) game.music.klangmuschel(sec);
          klangUntil = now() + sec;
          emit('koffer:klang', { seconds: sec, until: klangUntil, x: p.x, z: p.z });
          glimm('klang');
          return finishUse(id, before, eff, via);
        }
        case 'ankerstein': {
          const sec = (d.effect && d.effect.seconds) || 10;
          ankerUntil = now() + sec;
          game.cameraRig.reducedFx = true;
          emit('koffer:anker', { seconds: sec });
          poof(0x8fa3ff, 0.4);
          return finishUse(id, before, eff, via);
        }
        case 'playlist': {
          const m = plMode || (zone === 'gruen' ? 'auf' : 'runter');
          if (game.music && game.music.jukebox) game.music.jukebox.play(m);
          playlistUntil = now() + ((d.effect && d.effect.seconds) || 40);
          emit('koffer:playlist', { mode: m, seconds: (d.effect && d.effect.seconds) || 40 });
          return m === 'runter' ? finishUse(id, before, eff, via) : finishUse(id, before, { ...eff, puls: 0 }, via);
        }
        case 'zaehllaterne': case 'abcrune': {
          poof(0xffe9a8, 1.4);
          emit('koffer:kopf', { id, x: p.x, z: p.z, r: 7, zone });
          return finishUse(id, before, eff, via);
        }
        default: return finishUse(id, before, eff, via);
      }
    }
    // Ruhe-Kraft tippen: das Gadget, das der Ampelplan für die aktuelle Zone vorsieht (Rot ohne Gadget → Notfall)
    async function useForZone() {
      const plan = planFor(state);
      const zone = zoneNow();
      const D = defs();
      const d = pickForZone(plan, zone, D);
      if (d && has(d.id)) return use(d.id, { via: 'kraft' });
      if (zone === 'rot' && (plan.notfall || has('hilfeholen'))) { const r = await puls.hilfeHolen({ via: 'kraft' }); return { ok: !r.busy, id: 'hilfeholen', notfall: true, ...r }; }
      glimm('gadget.leer', { force: true });
      emit('koffer:leer', { zone });
      return { ok: false, error: 'leer', zone };
    }
    events.on('kraft:tap', (e) => { if (e && e.id === 'ruhe' && game.started && !game.paused) useForZone(); });
    // Pumpsprung: die Bewegung selbst ist das Gadget (moves/pump.js meldet player:pump)
    events.on('player:pump', () => {
      if (!puls || !puls.active) return;
      if (has('pumpsprung')) use('pumpsprung', { via: 'bewegung' });
      else puls.add(-6, 'pumpsprung');
    });

    // ---- Ampelplan ----
    const ampel = {
      get: () => planFor(state),
      set(zone, id) {
        const r = ampelSet(planFor(state), zone, id, defs());
        if (r.warn === 'zone') return r;
        state.set('ampel.' + zone, r.plan[zone]);
        emit('ampel:set', { zone, gadget: r.plan[zone], warn: r.warn });
        if (r.warn === 'kopf-bei-rot') glimm('gadget.verpufft');
        return r;
      },
      setNotfall(npc) { state.set('ampel.notfall', npc || null); emit('ampel:set', { zone: 'notfall', gadget: npc || null, warn: null }); return npc; },
      adults: () => content.list('npcs').filter((d) => Number(d.age) >= 18 && !d.ambient).map((d) => ({ id: d.id, name: game.npcs && game.npcs.nameOf ? game.npcs.nameOf(d.id) : d.name, icon: d.icon, color: d.color })),
    };
    // Neues Gadget: Hinweis, und wenn eine passende Zone frei ist, gleich hinein (umbauen geht jederzeit)
    events.on('gadget:grant', (e) => {
      const d = e && def(e.id);
      if (!d) return;
      if (ui.toast && game.started) ui.toast(`Neu im Koffer: ${d.name}`);
      if (audio && audio.has && audio.has('pickup')) audio.play('pickup');
      const plan = planFor(state);
      if (d.use === 'notfall') { if (!plan.notfall) ampel.setNotfall(puls.adultFor()); return; }
      for (const z of ZONEN) if (!plan[z] && d.zones && d.zones[z] === 1) { ampel.set(z, d.id); break; }
      if (ui.journal && ui.journal.isOpen && ui.journal.current === 'koffer') ui.journal.refresh();
    });

    // ---- Tester ----
    const tester = {
      run: (id) => use(id, { via: 'tester' }),
      results: () => ({ ...(state.get('koffer.tests') || {}) }),
      entry: (id) => state.get('koffer.tests.' + id) || null,
    };

    // ---- Koffer-Steine (Umbau in der Welt) ----
    const stones = [];
    function placeStones() {
      if (!game.props || !game.props.spawn || !game.interactions) return;
      for (const s of STONES) {
        const site = content.resolveSite(s.site);
        if (!site) continue;
        const x = site.x + s.dx, z = site.z + s.dz;
        let h = null;
        try { h = game.props.spawn('menhir', { id: s.id, x, z, height: 2.6, color: '#ffd166' }); } catch (e) { h = null; }
        const it = game.interactions.add({ id: s.id, x, z, radius: 3.2, label: 'Koffer', priority: 1, onAction: () => openEditor() });
        stones.push({ id: s.id, x, z, handle: h, interaction: it });
      }
    }
    function openEditor() { if (ui.journal) ui.journal.open('koffer'); }

    // ---- Tagebuch-Seite „Koffer“ (ersetzt die Hülle aus ui/journal/pages.js) ----
    function renderPage(el) {
      const D = defs();
      const own = owned().map((id) => D[id]).filter(Boolean);
      const plan = planFor(state);
      const tests = tester.results();
      const gadgetRow = (d) => {
        const t = tests[d.id];
        const graph = t ? `<span class="kf-graph"><span>${t.before} → ${t.after}</span><span class="kf-bar"><i style="width:${t.after}%"></i></span><span>hilft bis ${t.reichweite}</span></span>` : `<small>${esc(d.hint || '')}</small>`;
        return `<div class="kf-gadget" data-gadget="${esc(d.id)}"><span class="kf-ico">${ui.icon(d.icon || 'punkt', { size: 22 })}</span><span><b>${esc(d.name)}</b>${graph}</span>${d.use === 'notfall' ? '' : `<button type="button" class="kf-test" data-test="${esc(d.id)}">Testen</button>`}</div>`;
      };
      const zoneRow = (z) => {
        const opts = own.filter((d) => d.use !== 'notfall');
        const cur = plan[z];
        const warn = z === 'rot' && cur && D[cur] && D[cur].fach === 'kopf';
        return `<div class="kf-zone is-${z}"><b><i class="kf-dot"></i>${ZONE_LABEL[z]}</b><div><div class="kf-opts">
          <button type="button" class="kf-opt${!cur ? ' is-on' : ''}" data-zone="${z}" data-gadget="">${ui.icon('x', { size: 18 })}<span>leer</span></button>
          ${opts.map((d) => `<button type="button" class="kf-opt${cur === d.id ? ' is-on' : ''}${z === 'rot' && d.fach === 'kopf' ? ' is-kopf-rot' : ''}" data-zone="${z}" data-gadget="${esc(d.id)}">${ui.icon(d.icon || 'punkt', { size: 18 })}<span>${esc(d.name)}</span></button>`).join('')}
        </div>${warn ? '<p class="kf-warn">Ein Kopf-Gadget bei Rot verpufft. Dein Koffer, deine Wahl.</p>' : ''}</div></div>`;
      };
      const adults = ampel.adults();
      el.innerHTML = `
        <div class="kf-grid">${FAECHER.map((f) => `<section class="kf-fach"><h4>${ui.icon(FACH_ICON[f], { size: 22 })}<span>${FACH_LABEL[f]}</span></h4>${own.filter((d) => d.fach === f).map(gadgetRow).join('') || '<p class="kf-empty">Noch leer.</p>'}</section>`).join('')}</div>
        <h4 class="jn-sub">Ampelplan</h4>
        <p class="jn-note">Ein Gadget je Zone. Testen zeigt vorher und nachher.</p>
        <div class="kf-ampel">${ZONEN.map(zoneRow).join('')}
          <div class="kf-zone is-notfall"><b><i class="kf-dot"></i>Notfall</b><div class="kf-opts">${adults.map((a) => `<button type="button" class="kf-opt${plan.notfall === a.id ? ' is-on' : ''}" data-notfall="${esc(a.id)}">${ui.icon(a.icon || 'hilfe', { size: 18 })}<span>${esc(a.name)}</span></button>`).join('')}</div></div>
        </div>`;
      el.querySelectorAll('[data-zone]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); ampel.set(b.dataset.zone, b.dataset.gadget || null); ui.journal.refresh(); }));
      el.querySelectorAll('[data-notfall]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); ampel.setNotfall(b.dataset.notfall); ui.journal.refresh(); }));
      el.querySelectorAll('[data-test]').forEach((b) => b.addEventListener('click', async () => {
        if (audio) audio.play('click');
        b.disabled = true;
        const r = await tester.run(b.dataset.test);
        if (r && r.verpufft && ui.toast) ui.toast('Puff. Bei Rot erst Körper oder Sinne.');
        ui.journal.refresh();
      }));
    }
    if (ui.journal && ui.journal.registerPage) {
      ui.journal.registerPage({
        id: 'koffer', label: 'Koffer', icon: 'koffer', order: 40,
        hidden: () => !((state.get('abilities', []) || []).includes('ruhe') || owned().length),
        render: (el) => renderPage(el),
      });
    }
    state.on('gadgets', () => { if (ui.journal && ui.journal.isOpen && ui.journal.current === 'koffer') ui.journal.refresh(); });
    events.on('game:start', placeStones);
    if (game.started) placeStones();

    const api = {
      list: () => content.list('gadgets'), owned: () => owned().map(def).filter(Boolean), has, def, effect, use, useForZone, cooldownLeft,
      tester, ampel, openEditor, stones: () => stones.slice(),
      get running() { return { sprint: !!sprint, tandem: tandem ? tandem.npc.def.id : null, anker: ankerUntil > now(), klang: klangUntil > now(), playlist: playlistUntil > now() }; },
      FAECHER, FACH_LABEL, FACH_ICON, ZONEN,
    };
    game.koffer = api;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.koffer = () => ({ owned: owned(), ampel: planFor(state), tests: tester.results(), running: api.running, zone: zoneNow(), stones: stones.map((s) => s.id) });
    D.useGadget = (id, opts) => use(id, { via: 'debug', ...(opts || {}) });
    D.grantGadget = (id) => { if (!def(id)) throw new Error('Unbekanntes Gadget ' + id); state.addUnique('gadgets', id); emit('gadget:grant', { id }); return owned(); };
    D.setAmpel = (zone, id) => (zone === 'notfall' ? ampel.setNotfall(id) : ampel.set(zone, id));
    D.kofferTester = (id) => tester.run(id);
    return api;
  },
};
