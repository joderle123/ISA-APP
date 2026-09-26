// „Letztes Mal“ (WP21-Hülle für WP42, DESIGN §3): drei Bildkarten – wo du warst, was du geschafft hast, was als
// Nächstes leuchtet – in 15 Sekunden, vorgelesen, überspringbar. X und „Los“ beenden immer.
//   const recap = createRecap({ overlay, speech, audio, icon });
//   recap.show({ title = 'Letztes Mal', cards: [{ icon, color, kicker, title, text }], seconds = 15, read = 'auto' })
//     → Promise<{ skipped: boolean }>
//   DOM: .ov[data-overlay=recap] .recap-card[data-card] · [data-recap-go]
import { esc } from './overlay.js';

export function createRecap({ overlay, speech, audio, icon }) {
  let active = null;
  function show({ title = 'Letztes Mal', cards = [], seconds = 15, read = 'auto', go = 'Los' } = {}) {
    if (active) active.close('replace');
    return new Promise((resolve) => {
      let done = false;
      let timer = 0, raf = 0;
      const finish = (skipped) => { if (done) return; done = true; clearTimeout(timer); cancelAnimationFrame(raf); if (speech) speech.cancel(); active = null; resolve({ skipped }); };
      const h = overlay.open({
        id: 'recap', title, icon: 'uhr', kind: 'dark', pause: true, cls: 'ov-recap', closeLabel: 'Überspringen',
        content: (body) => {
          body.innerHTML = `
            <div class="recap-cards">
              ${cards.slice(0, 3).map((c, i) => `
                <article class="recap-card" data-card="${i}" style="--card:${esc(c.color || '#ffd166')}">
                  <div class="recap-art">${icon(c.icon || 'karte', { size: 64 })}</div>
                  <small class="recap-kicker">${esc(c.kicker || ['Wo du warst', 'Was du geschafft hast', 'Was jetzt leuchtet'][i] || '')}</small>
                  <h3>${esc(c.title || '')}</h3>
                  <p>${esc(c.text || '')}</p>
                </article>`).join('')}
            </div>
            <div class="recap-bar"><i></i></div>
            <div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-recap-go>${icon('play', { size: 26 })}<span>${esc(go)}</span></button></div>`;
          body.querySelector('[data-recap-go]').addEventListener('click', () => { if (audio) audio.play('tile'); h.close('go'); });
          const bar = body.querySelector('.recap-bar i');
          const t0 = performance.now();
          const tick = () => { if (done) return; const p = Math.min(1, (performance.now() - t0) / (seconds * 1000)); bar.style.width = (p * 100).toFixed(1) + '%'; if (p < 1) raf = requestAnimationFrame(tick); };
          raf = requestAnimationFrame(tick);
          // Karten nacheinander einblenden
          body.querySelectorAll('.recap-card').forEach((c, i) => setTimeout(() => c.classList.add('is-in'), 120 + i * 380));
        },
        onClose: (reason) => finish(reason !== 'go' && reason !== 'timeout'),
      });
      active = h;
      timer = setTimeout(() => h.close('timeout'), seconds * 1000);
      if (speech && (read === true || (read === 'auto' && speech.settings.autoRead))) {
        (async () => { for (const c of cards.slice(0, 3)) { if (done) break; await speech.speak(`${c.title || ''}. ${c.text || ''}`, { who: 'erzaehler', auto: read !== true }); } })();
      }
    });
  }
  return { show, get active() { return !!active; } };
}
