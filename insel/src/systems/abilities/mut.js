// Mut (WP35, DESIGN §5): Zeichen (e20, Emote als Zeichen), Klarklang über Satz-Bau (e21), Stopp-Schild (e23) mit vier
// Lichtern aus zwei Eingaben (stillstehen und zielen, Kraft halten, im Ring loslassen; Lächeln oder Bewegung schwächt;
// Fenster ±250/±150/±100 ms je Modus), Nein-Züge über Satz-Bau (e25, danach das zweite Nein aus der Crew).
//   const mut = createMut({ game, teamgeist }); mut.act() · mut.stopp({ target }) · mut.stoppRelease() · mut.stoppCancel()
//   mut.stoppAuto() (Tests) · mut.klarklang(npcId) · mut.nein(npcId) · mut.zeichen(emote) · mut.current · mut.targetFor()
//   DOM: .stopp-schild [data-stopp] (.ss-light × 4, .ss-marker) · Ereignisse: mut:stopp:start {target} · mut:stopp:licht
//   {lights, hit, offset} · mut:stopp {target, lights, attempts} · mut:stopp:cancel · mut:klarklang {npc, clean, thorn, ok} ·
//   mut:nein {npc, clean, ok} · mut:zeichen {emote}
import { createStoppSchild, mutActionFor, STOPP_WINDOW_MS } from './model.js';

const CSS = `
.stopp-schild{position:absolute;left:50%;top:34%;width:160px;height:160px;margin:-80px 0 0 -80px;z-index:11;pointer-events:none;opacity:0;transition:opacity .2s ease;filter:drop-shadow(0 4px 12px rgba(0,0,0,.5))}
.stopp-schild.is-on{opacity:1}
.stopp-schild svg{width:160px;height:160px;display:block;overflow:visible}
.stopp-schild .ss-ring{fill:rgba(18,12,36,.55);stroke:rgba(255,255,255,.22);stroke-width:2}
.stopp-schild .ss-win{fill:none;stroke:#ffd166;stroke-width:12;stroke-linecap:round;opacity:.85}
.stopp-schild .ss-marker{fill:#fff;stroke:#1b1033;stroke-width:2}
.stopp-schild .ss-light{fill:rgba(255,255,255,.14);stroke:rgba(255,255,255,.35);stroke-width:1.5}
.stopp-schild .ss-light.is-on{fill:#ff8c8c;stroke:#fff}
.stopp-schild .ss-txt{fill:#fff;font:900 15px var(--font,system-ui);text-anchor:middle;dominant-baseline:middle}
.stopp-schild.is-hold .ss-ring{stroke:#ffd166}
.stopp-schild.is-weak .ss-ring{stroke:#ff5d5d}
`;
const R = 60, CX = 80, CY = 80;

export function createMut({ game, teamgeist = null }) {
  const { events, state, ui, player, content, audio } = game;
  const emit = (n, p) => events.emit(n, p);
  if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.mut = '1'; st.textContent = CSS; document.head.appendChild(st); }
  const upgrades = () => state.get('upgrades', []) || [];
  const mode = () => state.get('settings.mode', 'abenteuer');
  const glimm = (key, opts) => { if (game.glimm && game.glimm.line) game.glimm.line(key, opts); };
  let el = null, schild = null, target = null, timeout = 0, holdSeen = false;

  function ensureEl() {
    if (el || typeof document === 'undefined' || !ui.root) return;
    el = document.createElement('div');
    el.className = 'stopp-schild';
    el.dataset.stopp = '1';
    el.innerHTML = `<svg viewBox="0 0 160 160"><circle class="ss-ring" cx="${CX}" cy="${CY}" r="${R}"/><path class="ss-win" d=""/><circle class="ss-marker" cx="${CX}" cy="${CY - R}" r="8"/>${[0, 1, 2, 3].map((i) => `<circle class="ss-light" data-light="${i}" cx="${CX - 36 + i * 24}" cy="${CY + R + 22}" r="8"/>`).join('')}<text class="ss-txt" x="${CX}" y="${CY}">Stopp</text></svg>`;
    ui.root.appendChild(el);
  }
  const angle = (phase) => -Math.PI / 2 + phase * Math.PI * 2;
  function render() {
    if (!el || !schild) return;
    const s = schild.state;
    const w = schild.windowSeconds / 1.6;   // Fensterbreite als Phasenanteil
    const a0 = angle(0.5 - w), a1 = angle(0.5 + w);
    const p = (a) => `${(CX + Math.cos(a) * R).toFixed(1)} ${(CY + Math.sin(a) * R).toFixed(1)}`;
    el.querySelector('.ss-win').setAttribute('d', `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`);
    const m = el.querySelector('.ss-marker');
    const a = angle(s.phase);
    m.setAttribute('cx', (CX + Math.cos(a) * R).toFixed(1)); m.setAttribute('cy', (CY + Math.sin(a) * R).toFixed(1));
    el.querySelectorAll('.ss-light').forEach((l, i) => l.classList.toggle('is-on', i < s.lights));
    el.classList.toggle('is-hold', !!s.holding);
    el.classList.toggle('is-weak', !!(s.moving || s.smiling));
  }
  function targetFor(radius = 6) {
    const N = game.npcs;
    if (!N || !N.near) return null;
    return N.near(radius).find((n) => n.def && !n.def.ambient) || N.near(radius)[0] || null;
  }
  function aiming(n) {
    if (!n) return true;
    const dx = n.position.x - player.position.x, dz = n.position.z - player.position.z;
    const d = Math.hypot(dx, dz) || 1;
    const f = (dx / d) * Math.sin(player.yaw || 0) + (dz / d) * Math.cos(player.yaw || 0);
    return f > 0.55;
  }
  function tick(dt) {
    if (!schild || !schild.active) return;
    const smiling = !!(player.humanoid && player.humanoid.emote === 'lachen');
    schild.tick(dt, { moving: player.speed > 0.35, smiling, aiming: aiming(target) });
    render();
  }
  game.addUpdate((dt) => tick(dt), { order: 45 });

  // ---- Stopp-Schild ----
  function stopp({ target: t = null } = {}) {
    if (!upgrades().includes('mut.stopp')) return { ok: false, error: 'kein Stopp' };
    if (schild && schild.active) return { ok: false, error: 'läuft schon' };
    target = t && typeof t === 'object' ? t : (t ? game.npcs.get(t) : targetFor());
    schild = createStoppSchild({ mode: mode() });
    schild.start();
    ensureEl(); if (el) { el.classList.add('is-on'); el.classList.remove('is-weak'); }
    holdSeen = false;
    render();
    if (ui.setPower) ui.setPower({ enabled: true, label: 'Halten' });
    if (target && target.face) target.face(player.position);
    emit('mut:stopp:start', { target: target ? target.id : null, windowMs: STOPP_WINDOW_MS[mode()] });
    clearTimeout(timeout);
    timeout = setTimeout(() => { if (schild && schild.active) stoppCancel('zeit'); }, 20000);
    return { ok: true, target: target ? target.id : null };
  }
  function stoppHold() { if (schild && schild.active) { schild.hold(); holdSeen = true; render(); } }
  function stoppRelease() {
    if (!schild || !schild.active) return null;
    const r = schild.release();
    render();
    emit('mut:stopp:licht', { lights: r.lights, hit: r.hit, offset: r.offset, weakened: r.weakened });
    if (r.hit) {
      if (audio && audio.has && audio.has('radtick')) audio.play('radtick');
      if (game.particles) { const p = player.position; game.particles.emit({ x: p.x, y: p.y + 1.5, z: p.z, count: 10, spread: 0.4, speed: 1.2, up: 0.6, color: 0xff8c8c, size: 0.4, life: 0.7, gravity: 0, drag: 2, additive: true, alpha: 0.9 }); }
      if (!r.done) glimm('stopp.licht');
    } else if (r.weakened) glimm('stopp.schwach');
    if (r.done) finishStopp(r);
    return r;
  }
  function finishStopp(r) {
    if (el) el.classList.remove('is-on');
    clearTimeout(timeout);
    const t = target;
    const s = schild.state;
    schild = null;
    if (ui.setPower) ui.setPower({ enabled: true, label: 'Mut' });
    if (player.humanoid && player.humanoid.playEmote) player.humanoid.playEmote('stopp', { seconds: 1.6 });
    if (t && game.npcs && game.npcs.heat) game.npcs.heat(t.id, -25);
    if (t && t.face) t.face(player.position);
    if (audio && audio.has && audio.has('unlock')) audio.play('unlock');
    glimm('stopp.voll', { force: true });
    const best = state.get('mut.stoppBest', 0) || 0;
    if (!best || s.attempts < best) state.set('mut.stoppBest', s.attempts);
    if (game.npcs && game.npcs.deed && t) game.npcs.deed(t.id, 'stopp-' + t.id, 'Du hast Stopp gesagt.');
    emit('mut:stopp', { target: t ? t.id : null, lights: r.lights, attempts: s.attempts, weakened: s.weakened });
    target = null;
  }
  function stoppCancel(reason = 'abbruch') {
    if (!schild) return false;
    schild.cancel(); schild = null; target = null;
    if (el) el.classList.remove('is-on');
    clearTimeout(timeout);
    if (ui.setPower) ui.setPower({ enabled: true, label: 'Mut' });
    emit('mut:stopp:cancel', { reason });
    return true;
  }
  // Tests: vier Treffer in der Mitte des Fensters
  function stoppAuto() {
    if (!schild || !schild.active) return null;
    let r = null;
    for (let i = 0; i < 4 && schild && schild.active; i++) { schild.hold(); schild.tick(0, { moving: false, smiling: false, aiming: true }); schild.setPhase(0.5); r = stoppRelease(); }
    return r;
  }
  events.on('input:power:hold', () => { if (schild && schild.active) stoppHold(); });
  events.on('input:power:up', () => { if (schild && schild.active && holdSeen) { holdSeen = false; stoppRelease(); } });
  events.on('kraftrad:open', () => { if (schild && schild.active && game.plugins.bewegung && game.plugins.bewegung.kraftrad) game.plugins.bewegung.kraftrad.close(); });
  events.on('pause', (p) => { if (p && schild && schild.active) stoppCancel('pause'); });

  // ---- Klarklang und Nein über Satz-Bau ----
  const satzbauDef = (ruleset, npcId) => {
    const all = content.list('minigames').filter((m) => m.template === 'satzbau' && m.ruleset === ruleset);
    return all.find((m) => npcId && (m.id.includes(npcId) || JSON.stringify(m.outcome || {}).includes(`"${npcId}"`))) || all[0] || null;
  };
  async function klarklang(npcId = null) {
    if (!upgrades().includes('mut.klarklang')) return { ok: false, error: 'kein Klarklang' };
    const n = npcId ? game.npcs.get(npcId) : targetFor();
    const id = n ? n.id : npcId;
    const def = satzbauDef('klarklang', id);
    const M = game.minigames || (game.plugins && game.plugins.minigames);
    if (!def || !M || !M.play) return { ok: false, error: 'kein Satz-Bau' };
    const r = await M.play(def.id, { satzbau: true, who: id });
    const clean = !!(r && r.clean), thorn = !!(r && r.thorn);
    if (clean && n && game.npcs.heat && !JSON.stringify(def.outcome || {}).includes(`"${id}"`)) game.npcs.heat(id, -40);
    if (game.music && game.music.klarklang && !r.cancelled) game.music.klarklang(clean ? 'konsonant' : 'dissonant');
    emit('mut:klarklang', { npc: id, clean, thorn, ok: !!(r && r.ok), cancelled: !!(r && r.cancelled) });
    return { ok: !!(r && r.ok), npc: id, clean, thorn, result: r };
  }
  async function nein(npcId = null) {
    if (!upgrades().includes('mut.nein')) return { ok: false, error: 'kein Nein' };
    const n = npcId ? game.npcs.get(npcId) : targetFor();
    const id = n ? n.id : npcId;
    const def = satzbauDef('nein-vorschlag', id);
    const M = game.minigames || (game.plugins && game.plugins.minigames);
    if (!def || !M || !M.play) return { ok: false, error: 'kein Satz-Bau' };
    const r = await M.play(def.id, { satzbau: true, who: id });
    const clean = !!(r && r.clean);
    emit('mut:nein', { npc: id, clean, ok: !!(r && r.ok) });
    let zweites = null;
    if (clean && teamgeist && upgrades().includes('teamgeist.zweitesNein')) zweites = await teamgeist.zweitesNein(id);
    return { ok: !!(r && r.ok), npc: id, clean, zweites };
  }
  async function zeichen(emote = 'stopp') {
    if (player.humanoid && player.humanoid.playEmote) await player.humanoid.playEmote(emote, { seconds: 1.6 });
    emit('mut:zeichen', { emote });
    return { ok: true, emote };
  }
  // Kraft „Mut“ tippen: Stopp vor Klarklang, sonst Zeichen
  function act() {
    const n = targetFor();
    const heat = n && n.emotion && n.emotion.get ? (n.emotion.get().heat || 0) : 0;
    const what = mutActionFor({ upgrades: upgrades(), target: n ? n.id : null, targetHeat: heat, near: !!n });
    if (what === 'stopp') return stopp({ target: n });
    if (what === 'klarklang') return klarklang(n.id);
    if (what === 'zeichen') return zeichen('stopp');
    return { ok: false, error: 'nichts' };
  }
  return {
    act, stopp, stoppHold, stoppRelease, stoppCancel, stoppAuto, klarklang, nein, zeichen, targetFor,
    get current() { return schild ? { ...schild.state, target: target ? target.id : null, windowMs: STOPP_WINDOW_MS[mode()] } : null; },
    STOPP_WINDOW_MS,
  };
}
