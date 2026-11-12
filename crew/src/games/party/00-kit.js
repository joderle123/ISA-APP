/* CREW – Partyspiele („Schnell & lustig“): gemeinsame Bausteine.
   Reine Spiele ohne Lehr-Rahmen: ein Satz Regel, echte Uhr, Punkte, Crew-Rekord, „Nochmal“.
   Was sie nebenbei üben (zuhören, abwarten, sich einigen, Körpersprache lesen), steht nur im Lehrer-Finder.
   Die iPads sind nicht verbunden: jedes Spiel läuft auf EINEM Gerät (weitergeben, zu zweit, am Beamer). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const P = {};

  /* Abbrechbare Uhr ohne Anzeige (für versteckte Zeiten). Hält bei Pause an. Auto-Modus: sehr kurz. */
  P.uhr = (ctx, sekunden, o) => {
    const oo = o || {};
    let rest = (ctx.auto ? Math.min(sekunden, oo.auto || 0.3) : sekunden) * 1000;
    const ganz = rest;
    let fertig = null, iv = null, aus = false;
    const promise = new Promise((r) => { fertig = r; });
    const stop = () => { aus = true; clearInterval(iv); };
    iv = setInterval(() => {
      if (aus) return;
      if (!ctx.alive()) { stop(); return; }
      if (CREW.ui.isPaused()) return;
      rest -= 100;
      if (oo.onTick) oo.onTick(Math.max(0, rest) / 1000, 1 - Math.max(0, rest) / ganz);
      if (rest <= 0) { stop(); fertig('zeit'); }
    }, 100);
    ctx.onCleanup(stop);
    return { promise, stop, rest: () => Math.max(0, rest) / 1000 };
  };

  /* Sichtbarer Zeitbalken (läuft leer, die letzten 5 Sekunden ticken). P.balken(ctx, sek) → { el, promise, stop } */
  P.balken = (ctx, sekunden, o) => {
    const oo = o || {};
    const fill = h('i');
    const zahl = h('b', null, String(Math.ceil(sekunden)));
    const el = h('div', { class: 'p-balken' + (oo.cls ? ' ' + oo.cls : '') }, h('span', { class: 'p-balken-bahn' }, fill), zahl);
    let letzte = -1;
    const u = P.uhr(ctx, sekunden, {
      auto: oo.auto,
      onTick: (rest, anteil) => {
        fill.style.width = Math.max(0, 100 - anteil * 100) + '%';
        const s = Math.ceil(rest);
        if (s !== letzte) { letzte = s; zahl.textContent = String(s); if (s <= 5 && s > 0) { el.classList.add('eng'); CREW.sound.play('tick'); } }
      },
    });
    return { el, promise: u.promise, stop: u.stop, rest: u.rest };
  };

  /* Großer Stempel über dem Bild („GLEICH!“, „BUMM!“). art: gut | schlecht | neutral */
  P.stempel = (text, art) => {
    const alt = document.querySelector('.p-stempel'); if (alt) alt.remove();
    const el = h('div', { class: 'p-stempel ' + (art || 'neutral') }, h('b', { class: 'display' }, text));
    (document.getElementById('overlays') || document.body).appendChild(el);
    CREW.sound.play(art === 'gut' ? 'combo' : art === 'schlecht' ? 'fail' : 'stamp');
    setTimeout(() => el.remove(), 900);
    return el;
  };
  P.wackeln = () => {
    const st = document.querySelector('.game-screen'); if (!st) return;
    st.classList.remove('p-wackel'); void st.offsetWidth; st.classList.add('p-wackel');
  };

  /* Wie viele spielen? (merkt sich die Zahl) */
  P.anzahl = async (ctx, min, max, frage) => {
    const wrap = ctx.scr([h('div', { class: 'cover-sheet' }, h('h1', { class: 'outline-text' }, frage || 'Wie viele spielen mit?'))], { eyebrow: 'Start', center: true });
    const opts = [];
    for (let i = min; i <= max; i++) opts.push({ label: String(i), value: i, id: 'p-n-' + i });
    const merk = Math.min(max, Math.max(min, (CREW.state && CREW.state.lastCrewSize) || 4));
    const r = await ctx.ask(wrap, opts, { autoPick: () => Math.min(max, Math.max(min, 3)) });
    if (r === ctx.SKIP) return merk;
    return r;
  };

  /* Punktestand als Pille(n) für die Kopfzeile */
  P.stand = (text) => h('span', { class: 'pill accent p-stand' }, text);

  /* Runden-Kopf: kurz „Runde 2“ einblenden (kein eigener Bildschirm) */
  P.runde = (n, von) => P.stempel('Runde ' + n + (von ? ' / ' + von : ''), 'neutral');

  /* Ergebnis fürs Endbild: Punkte + Einheit; kleiner = besser (Zeiten) */
  P.ergebnis = (score, einheit, o) => Object.assign({ score, einheit, stats: [[score, einheit]], noNach: true }, o || {});

  /* Karte „Nur du schaust“ → geheimer Inhalt → „Verstecken“ */
  P.geheim = async (ctx, wer, inhalt, o) => {
    const oo = o || {};
    const r = await ctx.T.cover({ who: wer, hint: oo.hint || 'Die anderen schauen weg.', label: 'Zeigen' });
    if (r === ctx.SKIP) return r;
    const wrap = ctx.scr([inhalt], { eyebrow: 'Geheim', center: true });
    return ctx.next(wrap, oo.label || 'Gemerkt – verstecken', { id: 'btn-versteckt' });
  };

  CREW.party = P;
})();
