// Lycée-Simulator – Start: Ladebalken, dann das Spiel (spiel.js). Eigene Datei dist/lycee.html (build-lycee.mjs).
import { startLycee } from './spiel.js';

const $ = (id) => document.getElementById(id);
async function boot() {
  const bar = $('ly-boot-bar'), status = $('ly-boot-status'), bootEl = $('ly-boot');
  try {
    await startLycee({
      canvas: $('ly-canvas'), root: $('ly-root'),
      onProgress: (p, t) => {
        bar.style.width = Math.round(4 + p * 96) + '%'; if (t) status.textContent = t;
        if (p >= 1) { bootEl.classList.add('weg'); setTimeout(() => bootEl.remove(), 700); }
      },
    });
  } catch (e) {
    console.error(e);
    status.textContent = 'Das Spiel konnte nicht laden. (' + (e && e.message ? e.message : e) + ')';
  }
}
// Ton erst nach dem ersten Klick (Browser-Regel)
document.addEventListener('pointerdown', () => { try { window.LYCEE && window.LYCEE.audio && window.LYCEE.audio.unlock(); } catch (e) { /* egal */ } }, { once: true });
boot();
