// Vorlage duell (WP37): Reflex-Konterkarten. Eine Flüsterkrähe (oder Wolke, Prüfungsstein) bringt einen Satz, drei Karten
// liegen bereit – die passende schnell tippen (Tasten 1–3). Ein Zeitbalken läuft; schnell = voller Treffer, spät = halb.
//   def.rounds: [{ say, icon?, options:[{ t, ok }] }] (oder params.pool) · modes[m].rounds · params.seconds je Modus
//   Ergebnis: { hits (Quote), correct, rounds, fails: 0 }
import { createDuel, pickRounds, DEFAULT_SECONDS } from './logic.js';
import { esc } from '../../ui/overlay.js';

export default {
  id: 'duell', world: false, hint: 'Die Karte, die stimmt. Nicht die lauteste.',
  create(ctx) {
    const { def, params, mount, audio, speech, icon, textOf, events } = ctx;
    const rounds = pickRounds(def, ctx.mode, ctx.rng);
    const seconds = (params.seconds || DEFAULT_SECONDS[ctx.mode] || 4) * ctx.timing;
    const D = createDuel({ rounds, seconds });
    let raf = 0, done = false, keyH = null, t0 = 0, waitT = 0;
    const now = () => performance.now() / 1000;
    const attackIcon = def.icon === 'blitz' ? 'wolke' : (params.attacker || 'motte');

    function renderRound() {
      const r = D.round;
      if (!r) return;
      mount.innerHTML = `<div class="mg-topline"><span>Runde ${D.index + 1} / ${rounds.length}</span><span class="mg-prog" data-prog>${rounds.map((_, i) => `<i class="${D.results[i] ? 'is-' + (D.results[i].ok ? (D.results[i].late ? 'fast' : 'hit') : 'miss') : ''}"></i>`).join('')}</span></div>
        <div class="mg-attack"><span class="mg-attack-icon">${icon(r.icon || attackIcon, { size: 34 })}</span><p>${esc(textOf(r.say))}</p>${speech && speech.available ? `<span class="choice-read" data-read role="button" aria-label="Vorlesen">${icon('lautsprecher', { size: 22 })}</span>` : ''}</div>
        <div class="mg-timebar"><i data-time></i></div>
        <div class="mg-tiles" data-options>${r.options.map((o, i) => `<button class="mg-tile" type="button" data-opt="${i}"><span class="mg-tile-icon">${i + 1}</span><span>${esc(textOf(o.t))}</span></button>`).join('')}</div>
        ${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}`;
      mount.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => answer(+b.dataset.opt)));
      const rd = mount.querySelector('[data-read]'); if (rd) rd.addEventListener('click', () => speech.speak(textOf(r.say), { who: 'du', interrupt: true }));
      if (speech && speech.settings.autoRead) speech.speak(textOf(r.say), { who: 'du', interrupt: true, auto: true });
      if (audio) audio.play('whoosh', { duration: 0.6 });
      t0 = now();
      D.begin(t0);
    }
    function answer(i) {
      if (done || !D.open) return;
      const res = D.answer(now(), i);
      const btns = mount.querySelectorAll('[data-opt]');
      btns.forEach((b, k) => { const o = D.round.options[k]; if (o.ok) b.classList.add('is-ok'); if (k === i && !res.ok) { b.classList.add('is-dorn', 'is-shake'); } if (k === i && res.ok) b.classList.add('is-on'); });
      if (audio) audio.play(res.ok ? (res.late ? 'bubble' : 'tile') : 'error');
      events.emit('duell:answer', { id: ctx.id, round: D.index, ok: res.ok, late: res.late });
      waitT = now() + 0.75;
    }
    function timeout() {
      if (done) return;
      mount.querySelectorAll('[data-opt]').forEach((b, k) => { if (D.round.options[k].ok) b.classList.add('is-ok'); });
      if (audio) audio.play('error');
      waitT = now() + 0.75;
    }
    function step() {
      if (done) return;
      raf = requestAnimationFrame(step);
      const t = now();
      if (D.open) {
        const bar = mount.querySelector('[data-time]');
        if (bar) bar.style.transform = `scaleX(${(D.remaining(t) / seconds).toFixed(3)})`;
        if (D.timeout(t)) timeout();
      } else if (waitT && t >= waitT) {
        waitT = 0;
        if (D.next()) renderRound(); else finish();
      }
    }
    function finish() {
      if (done) return; done = true;
      cancelAnimationFrame(raf);
      ctx.finish({ hits: +D.ratio.toFixed(3), correct: D.correct, rounds: rounds.length, fails: 0 });
    }
    return {
      D,
      start() {
        keyH = (e) => { const m = e.code.match(/^(?:Digit|Numpad)([1-3])$/); if (!m) return; e.preventDefault(); e.stopPropagation(); answer(+m[1] - 1); };
        window.addEventListener('keydown', keyH, true);
        D.next(); renderRound(); raf = requestAnimationFrame(step);
      },
      stop() { done = true; cancelAnimationFrame(raf); if (keyH) window.removeEventListener('keydown', keyH, true); },
      auto(level = 'gold') {
        const ratio = { gold: 1, silber: 0.85, bronze: 0.6, fail: 0.2 }[level] ?? 1;
        cancelAnimationFrame(raf);
        while (!D.done) {
          const r = D.round || D.next(); if (!r) break;
          if (!D.open) D.begin(now());
          const okIdx = r.options.findIndex((o) => o.ok);
          const want = D.results.length < Math.round(ratio * rounds.length);
          D.answer(now() + 0.1, want ? okIdx : (okIdx + 1) % r.options.length);
          if (D.index >= rounds.length - 1) break;
          D.next();
        }
        finish();
      },
      act(name, i) { if (name === 'answer') { answer(i); return true; } return false; },
    };
  },
};
