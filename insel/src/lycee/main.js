// Lycée-Simulator – Start: Ladebalken, dann das Spiel (spiel.js). Eigene Datei dist/lycee.html (build-lycee.mjs).
import { startLycee } from './spiel.js';
import { debugWerkzeuge } from './debug.js';

const $ = (id) => document.getElementById(id);
async function boot() {
  const bar = $('ly-boot-bar'), status = $('ly-boot-status'), bootEl = $('ly-boot');
  // Tipps beim Laden (AAA: Ladezeit nutzen) – wechseln alle 4 Sekunden
  const TIPPS = ['Tipp: E (oder der runde Knopf) = reden und weiter.', 'Tipp: ☰ → „Kurz raus“, wenn es dir zu viel wird.', 'Tipp: M zeigt die Karte.',
    'Tipp: In den Einstellungen kannst du Texte vorlesen lassen.', 'Gerd die Taube trägt einen Partyhut. Niemand weiß, warum.', 'Tipp: Es gibt kein Richtig oder Falsch. Nur Folgen.'];
  const tippEl = document.createElement('p'); tippEl.className = 'ly-boot-tipp'; tippEl.style.cssText = 'margin:14px auto 0;max-width:30em;opacity:.75;font-size:14px;text-align:center';
  if (bootEl) bootEl.appendChild(tippEl);
  let tn = Math.floor(Math.random() * TIPPS.length); const tippZeig = () => { tippEl.textContent = TIPPS[tn++ % TIPPS.length]; };
  tippZeig(); const tippUhr = setInterval(tippZeig, 4000);
  try {
    await startLycee({
      canvas: $('ly-canvas'), root: $('ly-root'),
      onProgress: (p, t) => {
        bar.style.width = Math.round(4 + p * 96) + '%'; if (t) status.textContent = t;
        if (p >= 1) { clearInterval(tippUhr); bootEl.classList.add('weg'); setTimeout(() => bootEl.remove(), 700); }
      },
    });
  } catch (e) {
    console.error(e);
    clearInterval(tippUhr);
    status.textContent = 'Das Spiel konnte nicht laden. Bitte die Seite neu laden. Klappt es wieder nicht: einen anderen Browser probieren (Chrome, Edge oder Firefox).';
    tippEl.textContent = 'Technischer Hinweis für Erwachsene: ' + (e && e.message ? e.message : e);
  }
}
// Ton erst nach dem ersten Klick (Browser-Regel)
document.addEventListener('pointerdown', () => { try { window.LYCEE && window.LYCEE.audio && window.LYCEE.audio.unlock(); } catch (e) { /* egal */ } }, { once: true });
boot();
if (new URLSearchParams(location.search).has('debug')) debugWerkzeuge();   // Testwerkzeuge nur mit ?debug
