// Empathie-Blick (WP35, DESIGN §5): Kraft tippen = Blick-Impuls. Auren der Figuren in der Nähe pulsieren, die nächste Figur
// vor dir gibt ein feineres Wort aus dem äußeren Ring preis (36 Wörter sammelbar, state.blickWorte), ab blick.faeden
// leuchten Fäden zwischen Figuren mit Gemeinsamkeit. Die Stufen tanks/koerper/doppel/grenzen/streittiere/masken zeigt das
// Figuren-System dauerhaft an der Aura (npc/model.js auraView); im Profi-Modus sind die Farben aus und man liest Körper.
//   const blick = createBlick({ game }); blick.scan({ radius }) → { npcs, threads, word, stages } · blick.stages() · blick.words()
//   Ereignisse: blick:scan {npcs, threads} · blick:wort {npc, word, new, total} · blick:faeden {pairs}
import * as THREE from 'three';
import { blickStages, wordFor, sharedThreads, WORD_TOTAL, BLICK_WORDS } from './model.js';
import { EMOTION_COLORS } from '../../actors/humanoid/aura.js';

const CSS = `
.blick-ring{position:absolute;inset:0;pointer-events:none;z-index:7;opacity:0;background:radial-gradient(ellipse 60% 55% at 50% 50%, rgba(127,240,255,0) 55%, rgba(127,240,255,.28) 100%);transition:opacity .35s ease}
.blick-ring.is-on{opacity:1}
html.reduced-fx .blick-ring{opacity:0 !important}
`;

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
    emit('blick:scan', { npcs: out.map((o) => o.id), threads: threads.length, word: wordInfo });
    return { ok: true, npcs: out, threads, word: wordInfo, stages: st, profi };
  }
  return { scan, stages, words, clearThreads, WORD_TOTAL };
}
