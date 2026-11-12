// Minispiel-Plugin (WP36–39): Hülle + acht Vorlagen (rennen, rhythmus, satzbau, duell, verteidigung, lotsen, bauen, wuerfel)
//   + zwei Gesprächs-Vorlagen der Kostprobe (leine, oberflaeche; X → Kurzfassung, siehe shell.js).
//   game.minigames = game.plugins.minigames → { play(id|def, opts) → Promise<Ergebnis>, lotsen(params), current, bests(id),
//     medalOf(id), templates, cancel(), formatValue, MEDAL_NAME, MEDAL_COLOR }
//   Die Dialog-Bühne (WP32) ruft play(id, { choice, node, who }) und play(id, { satzbau: true, who }); die Quest-Vorlagen
//   pruefung/bauen laufen über dialogue.stage.minigame → play; lotsen über game.plugins.minigames.lotsen(params).
//   Ergebnis-Felder, auf die andere achten: ok (≥ story.minMedal), medal, stern, cancelled (false = gespielt), clean/thorn (Satz-Bau).
//   Debug: LUMO.debug.playMinigame(id, opts) · mgAuto(level='gold', {weiter=true}) · mgAct(name, …) · mgInfo() · mgList() · mgBests()
//   Szenario: 'call playMinigame hafen-daecher' · 'call mgAuto gold' · 'expect state.medals.hafen-daecher.medal == gold'
import { createShell, MINIGAME_CSS } from './shell.js';
import rennen from '../rennen/index.js';
import rhythmus from '../rhythmus/index.js';
import satzbau from '../satzbau/index.js';
import duell from '../duell/index.js';
import verteidigung from '../verteidigung/index.js';
import lotsen from '../lotsen/index.js';
import bauen from '../bauen/index.js';
import wuerfel from '../wuerfel/index.js';
import leine from '../leine/index.js';
import oberflaeche from '../oberflaeche/index.js';

export default {
  id: 'minigames', order: 63, deps: ['ui'],
  install(game) {
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.minigames = '1'; st.textContent = MINIGAME_CSS; document.head.appendChild(st); }
    const templates = { rennen, rhythmus, satzbau, duell, verteidigung, lotsen, bauen, wuerfel, leine, oberflaeche };
    const shell = createShell({ game, templates });
    game.minigames = shell;

    // ---- Debug / Tests ----
    const D = game.debug || (game.debug = {});
    D.playMinigame = (id, opts) => { const p = shell.play(id, opts || {}); D._mgLast = p; p.then((r) => { D._mgResult = r; }); return true; };
    D.mgAuto = async (level = 'gold', { weiter = true } = {}) => {
      const c = shell.current;
      if (!c) return { ok: false, error: 'kein Minispiel' };
      // Startkarte noch offen → Los drücken
      if (c.phase === 'start') { const b = document.querySelector('[data-overlay="minigame"] [data-los]'); if (b) b.click(); await new Promise((r) => setTimeout(r, 30)); }
      const cur = shell.current;
      if (!cur || !cur.inst) return { ok: false, error: 'kein Lauf' };
      if (typeof cur.inst.auto !== 'function') return { ok: false, error: 'kein auto' };
      await cur.inst.auto(level);
      await new Promise((r) => setTimeout(r, 2200));
      if (weiter) { const b = document.querySelector('[data-overlay="minigame"] [data-weiter]'); if (b) b.click(); }
      return { ok: true, result: D._mgResult || null, phase: shell.current ? shell.current.phase : 'zu' };
    };
    D.mgAct = (name, ...args) => { const c = shell.current; return c && c.inst && c.inst.act ? c.inst.act(name, ...args) : null; };
    D.mgInfo = () => { const c = shell.current; return c ? { id: c.id, mode: c.mode, phase: c.phase, rueckenwind: c.rueckenwind, tries: c.tries, template: c.def.template, hasInst: !!c.inst, restartMs: c.restartMs } : null; };
    D.mgList = () => game.content.ids('minigames');
    D.mgBests = () => game.state.get('medals', {});
    D.mgResult = () => D._mgResult || null;
    D.mgKurz = () => { shell.kurz(); return true; };
    return shell;
  },
};
