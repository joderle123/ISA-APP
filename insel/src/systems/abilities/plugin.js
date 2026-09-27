// Kräfte-Plugin (WP35, DESIGN §5): verbindet Blick, Mut und Teamgeist mit dem Kraft-Rad (kraft:tap) und dem Tagebuch
// (Seite „Kräfte“: Stufen je Kraft, die 36 Blick-Wörter, Stopp-Bestwert, Crew). Ruhe läuft über den Koffer (WP33).
//   game.abilities = game.plugins.abilities → { blick, mut, teamgeist, stages(), use(id), info(), page }
//   Debug: LUMO.debug.blick() · stopp(target?) · stoppRelease() · stoppAuto() · crewRuf(helper?) · klarklang(npc) ·
//     nein(npc) · zuschauer(vs) · zweitesNein(vs) · abilities()
import { createBlick } from './blick.js';
import { createMut } from './mut.js';
import { createTeamgeist } from './teamgeist.js';
import { blickStages, BLICK_WORDS, WORD_TOTAL, STOPP_WINDOW_MS } from './model.js';
import { esc } from '../../ui/overlay.js';

const CSS = `
.kr-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.kr-card{background:rgba(18,12,36,.55);box-shadow:0 0 0 1px rgba(255,255,255,.14);border-radius:18px;padding:12px 14px;border-left:4px solid var(--kr,#ffd166)}
.kr-card h4{display:flex;align-items:center;gap:8px;margin:0 0 6px;font-size:15px;color:var(--kr,#ffd166)}
.kr-card.is-locked{opacity:.55}
.kr-stufen{display:flex;flex-wrap:wrap;gap:6px}
.kr-stufe{padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.08);font-size:13px;font-weight:800}
.kr-stufe.is-on{background:rgba(255,209,102,.18);box-shadow:0 0 0 1px var(--c-gold,#ffd166)}
.kr-words{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin-top:8px}
.kr-word{padding:6px 10px;border-radius:12px;background:rgba(255,255,255,.06);font-size:13px;opacity:.45}
.kr-word.is-on{opacity:1;background:rgba(255,255,255,.14);box-shadow:0 0 0 1px var(--wc,#7ff0ff)}
`;
const POWERS = [
  { id: 'blick', label: 'Blick', icon: 'blick', color: '#7ff0ff', stages: ['auren', 'faeden', 'tanks', 'koerper', 'doppel', 'grenzen', 'streittiere', 'masken'], labels: { auren: 'Auren', faeden: 'Fäden', tanks: 'Tanks', koerper: 'Körper', doppel: 'Doppel', grenzen: 'Grenzen', streittiere: 'Streit-Tiere', masken: 'Masken' } },
  { id: 'teamgeist', label: 'Teamgeist', icon: 'team', color: '#ffd166', stages: ['ruf', 'hilfe', 'zweitesNein', 'zuschauer'], labels: { ruf: 'Crew-Ruf', hilfe: 'Hilfe holen', zweitesNein: 'Zweites Nein', zuschauer: 'Zuschauer' } },
  { id: 'ruhe', label: 'Ruhe', icon: 'ruhe', color: '#9fe8b0', stages: ['puls', 'koerper', 'sinne', 'kopf', 'ampel', 'rucksack'], labels: { puls: 'Puls', koerper: 'Körper', sinne: 'Sinne', kopf: 'Kopf', ampel: 'Ampel', rucksack: 'Rucksack' } },
  { id: 'mut', label: 'Mut', icon: 'mut', color: '#ff8c8c', stages: ['zeichen', 'klarklang', 'stopp', 'nein', 'leiter'], labels: { zeichen: 'Zeichen', klarklang: 'Klarklang', stopp: 'Stopp', nein: 'Nein', leiter: 'Leiter' } },
];
const EMO_COLOR = { freude: '#ffd23f', wut: '#ff4d4d', angst: '#9b6bff', trauer: '#4d8cff', ekel: '#5ad24f', ueberraschung: '#2de2c9' };

export default {
  id: 'abilities', order: 63.5, deps: ['ui', 'puls', 'koffer', 'npcs'],
  install(game) {
    const { events, state, ui } = game;
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.abilities = '1'; st.textContent = CSS; document.head.appendChild(st); }
    const teamgeist = createTeamgeist({ game });
    const blick = createBlick({ game });
    const mut = createMut({ game, teamgeist });
    const upgrades = () => state.get('upgrades', []) || [];
    const abilities = () => state.get('abilities', []) || [];
    function stages() {
      const out = {};
      for (const p of POWERS) {
        const has = abilities().includes(p.id) || upgrades().some((u) => u.startsWith(p.id + '.'));
        out[p.id] = { has, stages: Object.fromEntries(p.stages.map((s) => [s, p.id === 'blick' ? !!blickStages(upgrades(), abilities())[s] : upgrades().includes(p.id + '.' + s)])) };
      }
      return out;
    }
    // Kraft tippen (Kraft-Rad, WP19): Blick = Impuls, Teamgeist = Crew-Ruf, Mut = Stopp/Klarklang/Zeichen; Ruhe → Koffer
    function use(id) {
      if (id === 'blick') return blick.scan();
      if (id === 'teamgeist') return teamgeist.ruf();
      if (id === 'mut') return mut.act();
      return null;
    }
    events.on('kraft:tap', (e) => { if (!e || !game.started || game.paused) return; if (e.id === 'blick' || e.id === 'teamgeist' || e.id === 'mut') use(e.id); });

    // ---- Tagebuch-Seite „Kräfte“ ----
    function render(el) {
      const st = stages();
      const words = blick.words();
      const cards = POWERS.map((p) => {
        const s = st[p.id];
        return `<article class="kr-card${s.has ? '' : ' is-locked'}" style="--kr:${p.color}"><h4>${ui.icon(p.icon, { size: 22 })}<span>${p.label}</span>${s.has ? '' : ui.icon('schloss', { size: 18 })}</h4><div class="kr-stufen">${p.stages.map((k) => `<span class="kr-stufe${s.stages[k] ? ' is-on' : ''}">${esc(p.labels[k])}</span>`).join('')}</div>${p.id === 'mut' && state.get('mut.stoppBest') ? `<p class="jn-note">Stopp-Schild: ${esc(String(state.get('mut.stoppBest')))} Versuche</p>` : ''}</article>`;
      }).join('');
      const wordGrid = st.blick.has ? `<h4 class="jn-sub">Blick-Wörter · ${words.collected.length} von ${WORD_TOTAL}</h4><div class="kr-words">${Object.entries(BLICK_WORDS).map(([em, list]) => list.map((w) => `<span class="kr-word${words.collected.includes(w) ? ' is-on' : ''}" style="--wc:${EMO_COLOR[em]}">${words.collected.includes(w) ? esc(w) : '· · ·'}</span>`).join('')).join('')}</div>` : '';
      el.innerHTML = `<div class="kr-cards">${cards}</div>${wordGrid}<p class="jn-note">Kraft tippen nutzt die aktive Kraft. Halten öffnet das Rad.</p>`;
    }
    if (ui.journal && ui.journal.registerPage) ui.journal.registerPage({ id: 'kraefte', label: 'Kräfte', icon: 'stern', order: 35, hidden: () => !abilities().length, render });
    events.on('blick:wort', () => { if (ui.journal && ui.journal.isOpen && ui.journal.current === 'kraefte') ui.journal.refresh(); });

    const api = { blick, mut, teamgeist, stages, use, info: () => ({ stages: stages(), words: blick.words().collected.length, stopp: mut.current, running: teamgeist.running, STOPP_WINDOW_MS }), POWERS };
    game.abilities = api;

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.blick = (o) => blick.scan(o || {});
    D.stopp = (t) => mut.stopp({ target: t || null });
    D.stoppRelease = () => mut.stoppRelease();
    D.stoppAuto = () => mut.stoppAuto();
    D.stoppInfo = () => mut.current;
    D.crewRuf = (helper, target) => teamgeist.ruf({ helper: helper || null, target: target || null });
    D.klarklang = (npc) => mut.klarklang(npc);
    D.nein = (npc) => mut.nein(npc);
    D.zuschauer = (vs) => teamgeist.zuschauer(vs);
    D.zweitesNein = (vs) => teamgeist.zweitesNein(vs);
    D.abilities = () => api.info();
    return api;
  },
};
