// Empathie-Blick (WP35, DESIGN §5): Kraft tippen = Blick-Impuls. Auren der Figuren in der Nähe pulsieren, die nächste Figur
// vor dir gibt ein feineres Wort aus dem äußeren Ring preis (36 Wörter sammelbar, state.blickWorte), ab blick.faeden
// leuchten Fäden zwischen Figuren mit Gemeinsamkeit. Die Stufen tanks/koerper/doppel/grenzen/streittiere/masken zeigt das
// Figuren-System dauerhaft an der Aura (npc/model.js auraView); im Profi-Modus sind die Farben aus und man liest Körper.
//   const blick = createBlick({ game }); blick.scan({ radius }) → { npcs, threads, word, stages } · blick.stages() · blick.words()
//   Ereignisse: blick:scan {npcs, threads} · blick:wort {npc, word, new, total} · blick:faeden {pairs}
// Stufe „Gläser“ (blick.tanks, QUELLE): Der Tipp zeigt ZUERST nur die Folge in der Welt (Tuns Winde klemmt, Jolies Karte
// bleibt leer; Orte melden sich über blick.addFolge, sonst ein wackelndes Zeichen über der Figur). Wer die Figur weiter im
// Bild behält (GLAS.hold Sekunden, Ring füllt sich) oder nochmal tippt, sieht über ihr die eigenen Gefäße: Höhe = wichtig,
// Füllung = voll, die größte Lücke leuchtet (Werte: game.nest.glaeser, Namen: content/beduerfnisse.js).
//   blick.addFolge({ id, npc, pos() → Vector3|null, aktiv() → bool, show(sec) }) → entfernen()
//   blick.glaeser → { show(npc, { seconds }), hide(), focus(npc), list(npc), current → { npc, phase:'halten'|'offen' } | null }
//   Ereignisse: blick:folge {npc, folgen:[id]} · blick:halten {npc} · blick:glaeser {npc, luecke} · blick:glaeser:zu {npc}
import * as THREE from 'three';
import { blickStages, wordFor, sharedThreads, WORD_TOTAL, BLICK_WORDS, GLAS, glasTarget } from './model.js';
import { shelfHTML, holdHTML, folgeHTML, GEF_CSS } from './gefaesse.js';
import { glassesOf, folgeAktiv } from '../nest/model.js';
import { EMOTION_COLORS } from '../../actors/humanoid/aura.js';

const CSS = `
.blick-ring{position:absolute;inset:0;pointer-events:none;z-index:7;opacity:0;background:radial-gradient(ellipse 60% 55% at 50% 50%, rgba(127,240,255,0) 55%, rgba(127,240,255,.28) 100%);transition:opacity .35s ease}
.blick-ring.is-on{opacity:1}
html.reduced-fx .blick-ring{opacity:0 !important}
` + GEF_CSS;

export function createBlick({ game }) {
  const { events, state, ui, player, scene } = game;
  const emit = (n, p) => events.emit(n, p);
  let ringEl = null, ringT = 0;
  const lines = [];
  if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.blick = '1'; st.textContent = CSS; document.head.appendChild(st); }
  const stages = () => blickStages(state.get('upgrades', []) || [], state.get('abilities', []) || []);
  const mode = () => state.get('settings.mode', 'abenteuer');
  const words = () => ({ collected: (state.get('blickWorte', []) || []).slice(), total: WORD_TOTAL, all: BLICK_WORDS });

  function flash() {
    if (typeof document === 'undefined' || !ui.root) return;
    if (!ringEl) { ringEl = document.createElement('div'); ringEl.className = 'blick-ring'; ringEl.dataset.blick = '1'; ui.root.appendChild(ringEl); }
    ringEl.classList.add('is-on');
    clearTimeout(ringT);
    ringT = setTimeout(() => ringEl.classList.remove('is-on'), 1100);
  }
  function auraBurst(npc, emotion) {
    if (!game.particles) return;
    const p = npc.position;
    const col = new THREE.Color(EMOTION_COLORS[emotion] || '#7ff0ff').getHex();
    game.particles.emit({ x: p.x, y: p.y + 1.1, z: p.z, count: 14, spread: 0.7, speed: 0.5, up: 1.1, color: col, size: 0.45, life: 1.2, gravity: 0.1, drag: 1.5, additive: true, alpha: 0.85 });
  }
  function drawThreads(pairs, byId) {
    clearThreads();
    for (const pr of pairs) {
      const a = byId.get(pr.a), b = byId.get(pr.b);
      if (!a || !b) continue;
      const col = pr.what === 'gefuehl' ? (EMOTION_COLORS[pr.value] || '#7ff0ff') : '#ffd166';
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a.position.x, a.position.y + 1.75, a.position.z), new THREE.Vector3(b.position.x, b.position.y + 1.75, b.position.z)]);
      const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(col), transparent: true, opacity: 0.85 });
      const line = new THREE.Line(geo, mat);
      line.name = 'blick-faden';
      scene.add(line);
      lines.push(line);
    }
    if (lines.length) setTimeout(clearThreads, 4200);
  }
  function clearThreads() { for (const l of lines) { scene.remove(l); l.geometry.dispose(); l.material.dispose(); } lines.length = 0; }

  function scan({ radius = 14 } = {}) {
    const st = stages();
    if (!st.auren) return { ok: false, error: 'kein Blick' };
    flash();
    if (game.audio && game.audio.has && game.audio.has('chime')) game.audio.play('chime');
    const N = game.npcs;
    const list = N && N.near ? N.near(radius) : [];
    const profi = mode() === 'profi';
    const fx = Math.sin(player.yaw || 0), fz = Math.cos(player.yaw || 0);
    const out = [];
    const byId = new Map();
    let best = null, bestD = Infinity;
    for (const n of list) {
      if (!n.emotion || !n.emotion.get) continue;
      const e = n.emotion.get();
      const prim = e.primary || ['freude', 3];
      const heat = e.heat || 0;
      const tanks = n.tanks && n.tanks.value ? Object.fromEntries(['koerper', 'sicherheit', 'zugehoerigkeit', 'anerkennung', 'selbstbestimmung', 'spass'].map((t) => [t, n.tanks.value(t)])) : {};
      const need = Object.keys(tanks).sort((x, y) => tanks[x] - tanks[y])[0] || null;
      const word = wordFor(prim[0], prim[1], { profi, heat });
      const entry = { id: n.id, name: n.name, emotion: prim[0], intensity: prim[1], heat, word, need, ambient: !!(n.def && n.def.ambient) };
      out.push(entry);
      byId.set(n.id, n);
      auraBurst(n, prim[0]);
      const dx = n.position.x - player.position.x, dz = n.position.z - player.position.z;
      const d = Math.hypot(dx, dz) || 1;
      const facing = (dx / d) * fx + (dz / d) * fz;
      if (facing > 0.2 && d < bestD && !entry.ambient) { bestD = d; best = entry; }
      else if (!best && facing > 0.2 && d < bestD) { bestD = d; best = entry; }
    }
    let wordInfo = null;
    if (best) {
      const known = state.get('blickWorte', []) || [];
      const isNew = !profi && !known.includes(best.word);
      if (isNew) state.addUnique('blickWorte', best.word);
      wordInfo = { npc: best.id, word: best.word, new: isNew, total: WORD_TOTAL, count: (state.get('blickWorte', []) || []).length };
      if (ui.glimm) ui.glimm(`${best.name}: ${best.word}.`, { seconds: 3 });
      if (isNew && ui.toast) ui.toast(`Neues Wort: ${best.word} (${wordInfo.count} von ${WORD_TOTAL})`, 2600);
      emit('blick:wort', wordInfo);
    }
    let threads = [];
    if (st.faeden) {
      threads = sharedThreads(out.map((o) => ({ id: o.id, emotion: o.emotion, need: o.need })));
      drawThreads(threads, byId);
      if (threads.length) emit('blick:faeden', { pairs: threads });
    }
    let glas = null;
    if (st.tanks) glas = glasScan(list, best ? best.id : null, fx, fz);
    emit('blick:scan', { npcs: out.map((o) => o.id), threads: threads.length, word: wordInfo });
    return { ok: true, npcs: out, threads, word: wordInfo, stages: st, profi, glas };
  }
  // ================= Stufe „Gläser“ =================
  const folgen = [];
  const V = new THREE.Vector3();
  let focus = null;     // { npc, t, lost }
  let shown = null;     // { npc, t, seconds }
  const els = { hold: null, shelf: null, folge: new Map() };
  const npcObj = (id) => (game.npcs && game.npcs.get ? game.npcs.get(id) : null);
  const defOf = (id) => { const n = npcObj(id); return (n && n.def) || (game.content && game.content.get('npcs', id)) || null; };
  const glasList = (id) => (game.nest && game.nest.glaeser ? game.nest.glaeser.list(id) : glassesOf(defOf(id), null));
  const headPos = (n) => V.set(n.position.x, n.position.y + ((n.humanoid && n.humanoid.height) || 1.8) + 0.55, n.position.z);
  function anchorEl(cls, html) {
    if (typeof document === 'undefined' || !ui.root) return null;
    const el = document.createElement('div');
    el.className = 'gf-anchor ' + cls;
    el.dataset.blick = 'glas';
    el.innerHTML = html;
    ui.root.appendChild(el);
    return el;
  }
  // Weltpunkt → Bildschirm; false = hinter der Kamera oder außerhalb des Bildes
  function place(el, p, { clamp = true } = {}) {
    if (!el || !ui.root) return false;
    V.copy(p).project(game.camera);
    const w = ui.root.clientWidth || 1, h = ui.root.clientHeight || 1;
    const on = V.z < 1 && Math.abs(V.x) < 1.05 && Math.abs(V.y) < 1.1;
    let x = (V.x * 0.5 + 0.5) * w, y = (-V.y * 0.5 + 0.5) * h;
    if (clamp) { const hw = (el.offsetWidth || 200) / 2 + 8, hh = (el.offsetHeight || 150) + 96; x = Math.max(hw, Math.min(w - hw, x)); y = Math.max(hh, Math.min(h - 8, y)); }
    el.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px) translate(-50%, -100%)`;
    el.classList.toggle('is-off', !on);
    return on;
  }
  function addFolge(f) { folgen.push(f); return () => { const i = folgen.indexOf(f); if (i >= 0) folgen.splice(i, 1); }; }
  function sparks(p, color = '#ff6b4a') { if (game.particles) game.particles.emit({ x: p.x, y: p.y, z: p.z, count: 16, spread: 0.5, up: 1.2, speed: 1.4, color, size: 0.12, life: 0.9, gravity: 0.6, drag: 1.2, additive: true }); }
  function folgeBadge(n, def) {
    const g = def.glaeser && def.glaeser.folge;
    const old = els.folge.get(n.id); if (old) old.el.remove();
    const el = anchorEl('gf-folge-anchor', `<div class="gf-folge">${folgeHTML(ui.icon ? ui.icon((g && g.icon) || 'frage', { size: 30 }) : '')}</div>`);
    if (el) els.folge.set(n.id, { el, n, t: GLAS.folge });
  }
  // Tipp: Folgen zeigen, Fokus auf eine Figur mit Gläsern starten (zweiter Tipp: sofort offen, dritter: zu)
  function glasScan(list, bestId, fx, fz) {
    const cands = [];
    for (const n of list) {
      const def = n.def;
      if (!def || !def.glaeser || def.ambient) continue;
      const dx = n.position.x - player.position.x, dz = n.position.z - player.position.z;
      const d = Math.hypot(dx, dz) || 1;
      if (d > GLAS.radius) continue;
      cands.push({ id: n.id, d, facing: (dx / d) * fx + (dz / d) * fz, n, def });
    }
    const target = glasTarget(cands, bestId);
    // Orte mit Folgen (Winde, Karte) in der Nähe
    const shownFolgen = [];
    for (const f of folgen) {
      let p = null;
      try { p = f.pos && f.pos(); } catch (e) { p = null; }
      if (!p || Math.hypot(p.x - player.position.x, p.z - player.position.z) > GLAS.radius + 4) continue;
      if (f.aktiv && !f.aktiv()) continue;
      if (f.show) f.show(GLAS.folge);
      sparks(p);
      shownFolgen.push(f);
    }
    let line = null;
    if (target) {
      const glasses = glasList(target.id);
      const own = shownFolgen.some((f) => f.npc === target.id);
      if (folgeAktiv(glasses)) {
        if (!own) folgeBadge(target.n, target.def);
        line = target.def.glaeser.folge && target.def.glaeser.folge.glimm;
      }
      if (shown && shown.npc === target.id) { hideGlaeser(); line = null; }
      else if (focus && focus.npc === target.id) showGlaeser(target.id);
      else if (!shown) { focus = { npc: target.id, t: 0, lost: 0 }; emit('blick:halten', { npc: target.id }); }
    }
    if (!line && shownFolgen.length) { const d = defOf(shownFolgen[0].npc); line = d && d.glaeser && d.glaeser.folge && d.glaeser.folge.glimm; }
    if (line && ui.glimm) setTimeout(() => ui.glimm(line, { seconds: 3 }), 900);
    const ids = shownFolgen.map((f) => f.id);
    if (target || ids.length) emit('blick:folge', { npc: target ? target.id : (shownFolgen[0] && shownFolgen[0].npc) || null, folgen: ids });
    return { target: target ? target.id : null, folgen: ids, line };
  }
  function renderShelf() {
    if (!shown) return;
    const def = defOf(shown.npc) || {};
    const html = shelfHTML(glasList(shown.npc), { form: (def.glaeser && def.glaeser.form) || 'glas', color: def.color || '#7ff0ff', icon: ui.icon });
    if (!els.shelf) els.shelf = anchorEl('gf-shelf-anchor', html); else els.shelf.innerHTML = html;
  }
  function showGlaeser(npc, { seconds = GLAS.show } = {}) {
    if (!npcObj(npc) && !defOf(npc)) return false;
    focus = null;
    if (els.hold) { els.hold.remove(); els.hold = null; }
    shown = { npc, t: 0, seconds };
    if (els.shelf) { els.shelf.remove(); els.shelf = null; }
    renderShelf();
    if (game.audio && game.audio.has && game.audio.has('chime')) game.audio.play('chime');
    const gl = glasList(npc);
    emit('blick:glaeser', { npc, luecke: (gl.find((g) => g.gross) || {}).id || null });
    return true;
  }
  function hideGlaeser() {
    const had = shown;
    shown = null; focus = null;
    if (els.shelf) { els.shelf.remove(); els.shelf = null; }
    if (els.hold) { els.hold.remove(); els.hold = null; }
    if (had) emit('blick:glaeser:zu', { npc: had.npc });
    return !!had;
  }
  const hidden = () => !!(game.paused || (ui.overlay && ui.overlay.count));
  game.addUpdate((dt) => {
    // Folge-Zeichen über Figuren
    for (const [id, f] of els.folge) { f.t -= dt; if (f.t <= 0 || hidden()) { f.el.remove(); els.folge.delete(id); } else place(f.el, headPos(f.n), { clamp: false }); }
    if (focus) {
      const n = npcObj(focus.npc);
      const d = n ? Math.hypot(n.position.x - player.position.x, n.position.z - player.position.z) : 99;
      if (!els.hold) els.hold = anchorEl('gf-hold-anchor', `<div class="gf-hold">${holdHTML(ui.icon ? ui.icon('blick', { size: 24 }) : '')}</div>`);
      const on = n && d <= GLAS.radius && !hidden() ? place(els.hold, headPos(n).setY(n.position.y + 1.1), { clamp: false }) : false;
      if (on) { focus.lost = 0; focus.t += dt; } else focus.lost += dt;
      const fg = els.hold && els.hold.querySelector('.gf-hold-fg');
      if (fg) fg.setAttribute('stroke-dashoffset', (Number(fg.dataset.c) * (1 - Math.min(1, focus.t / GLAS.hold))).toFixed(1));
      if (focus.lost > 0.6) { focus = null; if (els.hold) { els.hold.remove(); els.hold = null; } }
      else if (focus.t >= GLAS.hold) showGlaeser(focus.npc);
    }
    if (shown) {
      const n = npcObj(shown.npc);
      shown.t += dt;
      const d = n ? Math.hypot(n.position.x - player.position.x, n.position.z - player.position.z) : 99;
      if (shown.t > shown.seconds || d > GLAS.radius + 3) hideGlaeser();
      else if (els.shelf) { if (hidden()) els.shelf.classList.add('is-off'); else if (n) place(els.shelf, headPos(n)); }
    }
  }, { order: 13 });
  events.on('nest:glas', (e) => { if (shown && e && e.npc === shown.npc) renderShelf(); });
  events.on('nest:riss', (e) => { if (shown && e && e.npc === shown.npc) renderShelf(); });
  events.on('scene:change', () => { hideGlaeser(); for (const f of els.folge.values()) f.el.remove(); els.folge.clear(); });
  const glaeser = {
    show: (npc, o) => showGlaeser(npc, o || {}), hide: hideGlaeser, list: glasList,
    focus(npc) { if (!npcObj(npc)) return false; hideGlaeser(); focus = { npc, t: 0, lost: 0 }; emit('blick:halten', { npc }); return true; },
    get current() { return shown ? { npc: shown.npc, phase: 'offen', t: shown.t } : focus ? { npc: focus.npc, phase: 'halten', t: focus.t } : null; },
  };
  return { scan, stages, words, clearThreads, WORD_TOTAL, addFolge, glaeser, folgen };
}
