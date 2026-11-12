// Start: Ladebildschirm mit Titelkarte, Qualitätserkennung, Spiel erzeugen, Schleife starten.
import { createGame } from './game.js';

const $ = (id) => document.getElementById(id);

async function boot() {
  const params = new URLSearchParams(location.search);
  const bar = $('boot-bar');
  const status = $('boot-status');
  const startBtn = $('boot-start');
  const bootEl = $('boot');
  const setProgress = (p, label) => {
    bar.style.width = Math.round(4 + p * 96) + '%';
    if (label) status.textContent = label;
  };
  let game;
  try {
    game = await createGame({
      canvas: $('lumo-canvas'),
      root: $('lumo-root'),
      hudRoot: $('hud'),
      onProgress: setProgress,
    });
  } catch (e) {
    console.error(e);
    status.textContent = 'Oh nein – die Insel konnte nicht laden. (' + (e && e.message ? e.message : e) + ')';
    return;
  }
  game.loop.start();
  status.textContent = 'Die Insel wartet auf dich.';
  startBtn.classList.remove('is-hidden');
  let started = false;
  const go = (e) => {
    if (started) return;
    started = true;
    if (e) e.preventDefault();
    game.audio.unlock();
    game.audio.play('whoosh', { duration: 2.2 });
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    bootEl.classList.add('is-leaving');
    setTimeout(() => bootEl.remove(), 1300);
    game.start();
  };
  startBtn.addEventListener('click', go);
  startBtn.addEventListener('touchend', go);
  window.addEventListener('keydown', (e) => { if (!started && (e.code === 'Enter' || e.code === 'Space')) go(e); });
  // Audio auch bei späterer erster Berührung freischalten (iOS)
  const unlock = () => game.audio.unlock();
  window.addEventListener('touchend', unlock, { passive: true });
  window.addEventListener('pointerdown', unlock);
  if (params.has('autostart')) go();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
