/* CREW – Partyspiele für die ganze Crew (ein iPad oder der Beamer): Treffer, Seitenwechsel, Jagd.
   Reine Spiele mit Uhr, Punkten und Crew-Rekord. Nebenbei geübt (nur im Lehrer-Finder): sich in andere hineindenken,
   überzeugen statt überstimmen, zusammen etwas schaffen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const P = () => CREW.party;

  /* ---------- Treffer ---------- */
  const TR_SKALEN = [['eiskalt', 'kochend heiß'], ['langweilig', 'mega spannend'], ['winzig', 'riesig'], ['billig', 'sauteuer'], ['eklig', 'lecker'], ['leise', 'ohrenbetäubend'],
    ['harmlos', 'gefährlich'], ['uncool', 'richtig cool'], ['langsam', 'blitzschnell'], ['weich', 'steinhart'], ['nutzlos', 'unverzichtbar'], ['gruselig', 'süß'],
    ['altmodisch', 'Zukunft'], ['überbewertet', 'unterschätzt'], ['federleicht', 'tonnenschwer'], ['selten', 'überall'], ['still', 'chaotisch'], ['normal', 'total verrückt']];
  function skala(pole, o) {
    const oo = o || {};
    const bahn = h('div', { class: 'p-skala-bahn' });
    if (oo.ziel != null) bahn.appendChild(h('i', { class: 'p-skala-ziel', style: { left: oo.ziel + '%' } }));
    if (oo.nadel != null) bahn.appendChild(h('i', { class: 'p-skala-nadel', style: { left: oo.nadel + '%' } }));
    return h('div', { class: 'p-skala' }, h('div', { class: 'p-skala-pole' }, h('span', null, '◀ ' + pole[0]), h('span', null, pole[1] + ' ▶')), bahn, oo.unten || null);
  }
  CREW.registerGame({
    id: 'treffer', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Eine Person kennt das Ziel und nennt ein Beispiel. Die Crew stellt den Regler. Nah dran gibt Punkte.' });
      const RUNDEN = 5;
      const skalen = ctx.rshuffle(TR_SKALEN);
      let summe = 0;
      for (let r = 0; r < RUNDEN; r++) {
        const pole = skalen[r], ziel = Math.round(8 + ctx.rng() * 84);
        const g = await P().geheim(ctx, 'Wer den Tipp gibt, schaut allein', h('div', { class: 'p-karte' }, h('span', { class: 'eyebrow' }, 'Das Ziel liegt hier'), skala(pole, { ziel }), h('p', { class: 'p-mittel' }, 'Nenn EIN Ding, das genau dort liegt.')), { label: 'Gemerkt – verstecken' });
        if (g === ctx.SKIP) continue;
        const regler = h('input', { type: 'range', min: '0', max: '100', value: '50', id: 'tr-regler', 'aria-label': 'Regler' });
        const w = ctx.scr([h('div', { class: 'p-karte' }, h('span', { class: 'eyebrow' }, 'Hört auf das Beispiel'), h('p', { class: 'p-mittel' }, 'Wo liegt das? Schiebt gemeinsam.'), skala(pole, { unten: regler }))], { eyebrow: 'Runde ' + (r + 1) + ' / ' + RUNDEN, center: true, badge: P().stand(summe + ' Punkte') });
        if (ctx.auto) regler.value = String(Math.round(ctx.autoRng() * 100));
        const a = await ctx.ask(w, [{ label: 'Einloggen', value: 'ok', id: 'btn-einloggen' }]);
        if (a === ctx.SKIP) continue;
        const wert = Number(regler.value), diff = Math.abs(wert - ziel);
        const pkt = diff <= 6 ? 4 : diff <= 12 ? 3 : diff <= 20 ? 2 : diff <= 30 ? 1 : 0;
        summe += pkt;
        P().stempel(pkt === 4 ? 'VOLLTREFFER!' : pkt >= 2 ? 'NAH DRAN' : pkt === 1 ? 'KNAPP' : 'DANEBEN', pkt >= 2 ? 'gut' : pkt ? 'neutral' : 'schlecht');
        const w2 = ctx.scr([h('div', { class: 'p-karte' }, h('span', { class: 'eyebrow' }, '+' + pkt + ' Punkte'), skala(pole, { ziel, nadel: wert }))], { eyebrow: 'Auflösung', center: true, noPass: true });
        await ctx.next(w2, r < RUNDEN - 1 ? 'Nächste Person gibt den Tipp' : 'Fertig');
      }
      return P().ergebnis(summe, 'von 20 Punkten');
    },
  });

  /* ---------- Seitenwechsel ---------- */
  const SW_FRAGEN = [['Nie mehr Musik hören', 'Nie mehr Handy'], ['Immer 10 Minuten zu spät', 'Immer 2 Stunden zu früh'], ['Fliegen können', 'Unsichtbar sein'], ['Nur noch flüstern', 'Nur noch schreien'],
    ['Ein Jahr ohne Süßes', 'Ein Jahr ohne Zocken'], ['In der Vergangenheit leben', 'In der Zukunft leben'], ['Mit Tieren reden', 'Alle Sprachen sprechen'], ['Jeden Tag Pizza', 'Nie wieder Pizza'],
    ['Berühmt und pleite', 'Unbekannt und reich'], ['Immer Sommer', 'Immer Winter'], ['Gedanken lesen', 'In die Zukunft sehen'], ['Eine Woche ohne Internet', 'Eine Woche ohne Bett'],
    ['Nur noch rückwärts gehen', 'Nur noch hüpfen'], ['Ein Drache als Haustier', 'Selbst ein Drache sein'], ['Nie mehr Hausaufgaben', 'Nie mehr früh aufstehen']];
  CREW.registerGame({
    id: 'seitenwechsel', template: 'T4', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Linke Wand oder rechte Wand: Stell dich zu deiner Antwort. Die kleinere Gruppe darf die anderen rüberholen.' });
      const RUNDEN = 5;
      const fragen = ctx.rshuffle(SW_FRAGEN);
      let summe = 0;
      for (let r = 0; r < RUNDEN; r++) {
        const [a, b] = fragen[r];
        const box = h('div', { class: 'p-wahl', style: { maxWidth: '900px' } }, h('div', { class: 'p-karte' }, h('span', { class: 'eyebrow' }, '◀ Linke Wand'), h('p', { class: 'p-mittel' }, a)), h('div', { class: 'p-karte' }, h('span', { class: 'eyebrow' }, 'Rechte Wand ▶'), h('p', { class: 'p-mittel' }, b)));
        const w = ctx.scr([h('p', { class: 'p-gross' }, 'Lieber …?'), box], { eyebrow: 'Frage ' + (r + 1) + ' / ' + RUNDEN, center: true, badge: P().stand(summe + ' rübergeholt') });
        const s1 = await P().zeitOderKnopf(ctx, w, 10, [{ label: 'Alle stehen', value: 'ok', id: 'btn-stehen' }], { auto: 0.2 });
        if (s1 === ctx.SKIP) continue;
        CREW.sound.play('go');
        const w2 = ctx.scr([P().karte('Kleinere Gruppe', 'Überzeugt die anderen!', h('p', { class: 'muted' }, '20 Sekunden. Wer überzeugt ist, wechselt die Wand.'))], { eyebrow: 'Frage ' + (r + 1) + ' / ' + RUNDEN, center: true });
        await P().zeitOderKnopf(ctx, w2, 20, [{ label: 'Fertig', value: 'ok', id: 'btn-fertig' }], { auto: 0.2 });
        const w3 = ctx.scr([P().karte('Stopp!', 'Wie viele haben gewechselt?', null, { mittel: true })], { eyebrow: 'Frage ' + (r + 1) + ' / ' + RUNDEN, center: true, noPass: true });
        const n = await ctx.ask(w3, [0, 1, 2, 3, 4].map((k) => ({ label: k === 4 ? '4+' : String(k), value: k, id: 'sw-' + k })));
        if (n !== ctx.SKIP && n > 0) { summe += n; P().stempel('ÜBERZEUGT!', 'gut'); }
      }
      return P().ergebnis(summe, 'Leute rübergeholt');
    },
  });

  /* ---------- Jagd ---------- */
  const JG_DINGE = ['etwas Rundes', 'etwas Blaues', 'etwas mit einer Zahl drauf', 'etwas, das klappert', 'etwas Weiches', 'etwas, das älter ist als ihr', 'etwas mit einem Loch', 'etwas, das riecht',
    'etwas Durchsichtiges', 'etwas, das rollt', 'etwas Kaltes', 'etwas mit Streifen', 'etwas Kleineres als ein Daumen', 'etwas Rotes', 'etwas zum Schreiben', 'etwas, das Geräusche macht',
    'etwas aus Metall', 'etwas Essbares', 'etwas mit einem Namen drauf', 'etwas Glänzendes', 'etwas aus Holz', 'etwas zum Falten', 'etwas Grünes', 'etwas mit einem Knopf', 'etwas mit Reißverschluss', 'etwas Eckiges'];
  CREW.registerGame({
    id: 'jagd', template: 'T4', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Holt die fünf Sachen zum iPad, bevor die Zeit um ist. Gehen, nicht rennen.' });
      const RUNDEN = 3;
      const dinge = ctx.rshuffle(JG_DINGE);
      let summe = 0;
      for (let r = 0; r < RUNDEN; r++) {
        P().runde(r + 1, RUNDEN);
        const liste = dinge.slice(r * 5, r * 5 + 5);
        const da = new Set();
        const box = h('div', { class: 'p-liste', id: 'jg-liste' });
        const w = ctx.scr([h('p', { class: 'p-mittel' }, 'Bringt her:'), box], { eyebrow: 'Jagd ' + (r + 1) + ' / ' + RUNDEN, center: true, badge: P().stand(summe + ' geholt') });
        const alle = new Promise((resolve) => {
          liste.forEach((t, i) => {
            const b = h('button', { type: 'button', 'data-i': String(i) }, h('b', null, '○'), h('span', null, t));
            b.addEventListener('click', () => { if (da.has(i)) { da.delete(i); b.classList.remove('an'); b.firstChild.textContent = '○'; } else { da.add(i); b.classList.add('an'); b.firstChild.textContent = '✓'; CREW.sound.play('tick'); } if (da.size === liste.length) resolve('alle'); });
            box.appendChild(b);
          });
          if (ctx.auto) setTimeout(() => box.querySelectorAll('button').forEach((b, i) => { if (i < 3) b.click(); }), 40);
        });
        const bk = P().balken(ctx, 60, { auto: 0.4 });
        w.appendChild(bk.el);
        const e = await Promise.race([bk.promise, ctx.waitFor(alle)]);
        bk.stop();
        summe += da.size;
        if (e === 'alle') { CREW.sound.play('great'); P().stempel('ALLE DA!', 'gut'); } else { P().stempel(da.size + ' VON 5', da.size >= 3 ? 'neutral' : 'schlecht'); }
        const w2 = ctx.scr([P().karte('Runde ' + (r + 1), da.size + ' von 5 geholt', h('p', { class: 'muted' }, 'Bringt alles zurück, bevor es weitergeht.'))], { eyebrow: 'Pause', center: true, noPass: true });
        await ctx.next(w2, r < RUNDEN - 1 ? 'Nächste Jagd' : 'Fertig');
      }
      return P().ergebnis(summe, 'von 15 Sachen geholt');
    },
  });
})();
