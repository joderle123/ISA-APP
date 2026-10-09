/* Spiel „Stille Post ohne Worte“ (Thema: Kommunikation & Grenzen) · Vorlage T4 Bewegung im Raum · j1-e20
   Die Crew steht in einer Reihe und schaut zur Wand. Nur die letzte Person sieht die Botschaft auf dem iPad
   („genervt, 7“ oder „Warte hier!“). Sie gibt sie nur mit Gesicht und Körper weiter – geweckt wird die Person davor
   mit dem Signalwort „Funk“ oder zweimal Klopfen auf den Tisch, nie mit Antippen. Vorne tippt die erste Person an,
   was ankam; der Beamer zeigt Start und Ziel nebeneinander. Rückwärts-Check ohne Schuld: Welches Signal war unklar?
   In drei Level: 1) Gefühl (Gefühl + Stärke), 2) Botschaft (eine Bitte), 3) Ein Wort (Gefühl + Bitte, jede Person darf
   genau ein Wort dazu nehmen). Die Beobachter-Rolle wird ausdrücklich angeboten. Nur die Lehrkraft und die vorderste
   Person tippen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const GEFUEHLE = {
    froh: { id: 'froh', label: 'froh', mood: 'froh' },
    genervt: { id: 'genervt', label: 'genervt', mood: 'genervt' },
    traurig: { id: 'traurig', label: 'traurig', mood: 'traurig' },
    nervoes: { id: 'nervoes', label: 'nervös', mood: 'angst' },
    wuetend: { id: 'wuetend', label: 'wütend', mood: 'wut' },
    ueberrascht: { id: 'ueberrascht', label: 'überrascht', mood: 'ueberrascht' },
  };
  // „Nah dran“: Gefühle, die man ohne Worte leicht verwechselt
  const NAH = { genervt: ['wuetend'], wuetend: ['genervt'], nervoes: ['ueberrascht', 'traurig'], ueberrascht: ['nervoes', 'froh'], traurig: ['nervoes'], froh: ['ueberrascht'] };
  const BAND = { leicht: { id: 'leicht', label: 'leicht (1–3)' }, mittel: { id: 'mittel', label: 'mittel (4–6)' }, stark: { id: 'stark', label: 'stark (7–10)' } };
  const band = (z) => (z <= 3 ? 'leicht' : z <= 6 ? 'mittel' : 'stark');

  /* Level 1: Gefühl + Stärke */
  const KARTEN = [
    { gef: 'genervt', z: 7 }, { gef: 'froh', z: 3 }, { gef: 'nervoes', z: 8 },
    { gef: 'traurig', z: 5 }, { gef: 'ueberrascht', z: 9 }, { gef: 'wuetend', z: 4 },
  ];
  /* Level 2: Bitten (tipp = Idee für die letzte Person, nur auf ihrem Bildschirm) */
  const BITTEN = {
    komm: { id: 'komm', t: 'Komm mit!', tipp: 'Winken, Kopf zur Seite, einen Schritt andeuten.' },
    warte: { id: 'warte', t: 'Warte hier!', tipp: 'Hand flach nach unten, auf den Boden zeigen.' },
    leise: { id: 'leise', t: 'Sei leise!', tipp: 'Finger an den Mund, Augen groß.' },
    schau: { id: 'schau', t: 'Schau mal da!', tipp: 'Mit Blick und Kopf in eine Richtung zeigen.' },
    hunger: { id: 'hunger', t: 'Ich hab Hunger.', tipp: 'Bauch halten, so tun, als ob du isst.' },
    muede: { id: 'muede', t: 'Ich bin müde.', tipp: 'Gähnen, Kopf auf die Hände legen.' },
    super: { id: 'super', t: 'Gut gemacht!', tipp: 'Daumen hoch, nicken, strahlen.' },
    hilfe: { id: 'hilfe', t: 'Ich brauch Hilfe.', tipp: 'Hände offen nach vorn, fragender Blick.' },
  };
  /* Level 3: Gefühl + Bitte, ein Wort erlaubt */
  const KOMBI = [
    { gef: 'nervoes', bitte: 'komm', t: 'Ich bin nervös – komm bitte mit.' },
    { gef: 'genervt', bitte: 'leise', t: 'Ich bin genervt – sei bitte leise.' },
    { gef: 'froh', bitte: 'schau', t: 'Ich freu mich – schau mal da!' },
    { gef: 'traurig', bitte: 'warte', t: 'Mir geht’s nicht gut – wartest du kurz?' },
    { gef: 'ueberrascht', bitte: 'hilfe', t: 'Huch! Ich brauch Hilfe.' },
  ];
  const LEVELS = ['Gefühl', 'Botschaft', 'Ein Wort'];
  const LEVEL_TEXT = {
    2: 'Jetzt eine Bitte, kein Gefühl: „Warte hier!“ oder „Komm mit!“ – nur mit Körper. Vorne gibt es fünf ähnliche Bitten zur Auswahl.',
    3: 'Gefühl und Bitte zusammen – das ist schwer. Darum darf jede Person in der Reihe genau EIN Wort dazu sagen. Welches nimmt ihr?',
  };

  // Botschafts-Karte: Figur mit Gesicht, Gefühl, Zahl (Level 1) oder Bitte (Level 2) oder beides (Level 3)
  function botschaftKarte(ctx, b, o) {
    const oo = o || {};
    const g = b.gef ? GEFUEHLE[b.gef] : null;
    const text = b.t || (g ? g.label + ' · ' + b.z : '');
    return h('div', { class: 'sl-karte' + (oo.cls ? ' ' + oo.cls : '') },
      h('div', { class: 'row between', style: { width: '100%' } }, h('span', { class: 'eyebrow' }, oo.eyebrow || 'Botschaft'), ctx.readBtn(oo.speak || text)),
      g ? ctx.avatar('sam', g.mood, oo.small ? 72 : 110) : h('span', { class: 'sl-bitte-ic' }, CREW.icon('chat', oo.small ? 34 : 52)),
      h('b', { class: 'sl-text display' }, text),
      b.gef && b.z ? h('span', { class: 'pill' }, 'Stärke ' + b.z + ' von 10 · ' + BAND[band(b.z)].label) : null,
      oo.tipp ? h('p', { class: 'muted small', style: { margin: 0 } }, 'Idee: ' + oo.tipp) : null);
  }

  /* Vorne: Was ist angekommen? Liefert { gef, band, bitte } (je nach Level) oder SKIP */
  async function eingabe(ctx, L, start, nr) {
    const out = {};
    const badge = ctx.stufe(L, LEVELS);
    if (L === 1 || L === 3) {
      const w = ctx.scr([ctx.say('Vorderste Person: Welches Gefühl ist bei dir angekommen?', { eyebrow: 'Angekommen?', small: true }), CREW.ui.teacherLine('Die vorderste Person tippt – oder sagt es, und du tippst.')], { eyebrow: 'Runde ' + nr + ' · vorne', badge });
      const ids = Object.keys(GEFUEHLE);
      const r = await ctx.ask(w, ids.map((id) => ({ label: GEFUEHLE[id].label, value: id, variant: 'ghost', id: 'sl-gef-' + id })), { autoPick: ctx.autoRng() < 0.6 ? () => start.gef : undefined });
      if (r === ctx.SKIP) return ctx.SKIP;
      out.gef = r;
    }
    if (L === 1) {
      const w = ctx.scr([ctx.say('Und wie stark?', { eyebrow: 'Angekommen?', small: true }), h('div', { class: 'row center' }, h('span', { class: 'pill' }, 'Gefühl: ' + GEFUEHLE[out.gef].label))], { eyebrow: 'Runde ' + nr + ' · vorne', badge });
      const r = await ctx.ask(w, Object.values(BAND).map((b) => ({ label: b.label, value: b.id, variant: 'ghost', id: 'sl-band-' + b.id })), { autoPick: ctx.autoRng() < 0.5 ? () => band(start.z) : undefined });
      if (r === ctx.SKIP) return ctx.SKIP;
      out.band = r;
    }
    if (L === 2 || L === 3) {
      const andere = ctx.rshuffle(Object.keys(BITTEN).filter((k) => k !== start.bitte)).slice(0, 4);
      const opts = ctx.rshuffle([start.bitte].concat(andere));
      const w = ctx.scr([ctx.say(L === 3 ? 'Und welche Bitte?' : 'Vorderste Person: Welche Bitte ist bei dir angekommen?', { eyebrow: 'Angekommen?', small: true }), out.gef ? h('div', { class: 'row center' }, h('span', { class: 'pill' }, 'Gefühl: ' + GEFUEHLE[out.gef].label)) : null], { eyebrow: 'Runde ' + nr + ' · vorne', badge });
      const r = await ctx.ask(w, opts.map((k) => ({ label: BITTEN[k].t, value: k, variant: 'ghost', id: 'sl-bitte-' + k })), { autoPick: ctx.autoRng() < 0.6 ? () => start.bitte : undefined });
      if (r === ctx.SKIP) return ctx.SKIP;
      out.bitte = r;
    }
    return out;
  }

  /* Auswertung: Wie nah ist das Ziel am Start? 2 = angekommen, 1 = nah dran, 0 = unterwegs verändert */
  function bewerten(L, start, ziel) {
    const teile = [];
    if (start.gef) teile.push(ziel.gef === start.gef ? 2 : (NAH[start.gef] || []).includes(ziel.gef) ? 1 : 0);
    if (L === 1) teile.push(ziel.band === band(start.z) ? 2 : 1);
    if (start.bitte) teile.push(ziel.bitte === start.bitte ? 2 : 0);
    const min = Math.min(...teile);
    const allesGleich = teile.every((x) => x === 2);
    return { stufe: allesGleich ? 2 : min === 0 ? 0 : 1, teile };
  }
  const ERGEBNIS = {
    2: { label: 'Angekommen!', text: 'Die Botschaft ist durch die ganze Reihe gekommen – ohne ein Wort.' },
    1: { label: 'Nah dran', text: 'Die Richtung stimmt, ein Teil ist unterwegs verrutscht.' },
    0: { label: 'Unterwegs verändert', text: 'Irgendwo in der Reihe ist eine andere Botschaft draus geworden. Ganz normal ohne Worte.' },
  };

  CREW.registerGame({
    id: 'stillepost',
    template: 'T4',
    icon: 'eye',
    themen: ['Körpersprache', 'Nonverbal', 'Gefühle zeigen', 'Missverständnis'],
    safety: ['koerper', 'raum', 'freiwillig'],
    help: false,
    karten: KARTEN, bitten: BITTEN, kombi: KOMBI, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Reihe, alle schauen zur Wand. Nur die letzte Person sieht die Botschaft – und gibt sie nur mit Gesicht und Körper weiter. Vorne wird getippt, was ankam.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Nur hinten schaut', text: 'Die letzte Person sieht die Botschaft auf dem iPad.' },
          { icon: 'users', title: 'Ohne Worte weiter', text: 'Signalwort „Funk“ oder zweimal Klopfen. Kein Antippen.' },
          { icon: 'eye', title: 'Start und Ziel', text: 'Vorne wird getippt. Der Beamer zeigt beides.' },
        ],
        probe: async () => {
          const slot = h('div', { class: 'row center walk-timer' });
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            botschaftKarte(ctx, { gef: 'froh', z: 5 }, { eyebrow: 'Alle gleichzeitig zeigen' }),
            h('div', { class: 'row between' }, h('p', { class: 'muted', style: { margin: 0 } }, 'Alle zeigen „froh, 5“ – nur mit dem Gesicht. Kein Wort.'), slot)], { eyebrow: 'Probe' });
          await ctx.timerOrButton(w, 10, [{ label: 'Gezeigt', value: 'ok', variant: 'ghost', icon: 'check' }], { movement: true, slot });
        },
      });

      // Aufstellen: Reihe, Blick zur Wand, Beobachter:in anbieten, Signal statt Antippen
      const wA = ctx.scr([
        ctx.say('Stellt euch in eine Reihe, alle schauen zur Wand. Die letzte Person steht am iPad. Wer nicht mitlaufen mag, wird Beobachter:in.', { eyebrow: 'Aufstellen', small: true }),
        h('div', { class: 'icon-cards' },
          h('div', { class: 'icon-card' }, CREW.icon('users', 30), h('b', null, 'Reihe'), h('span', { class: 'muted small' }, 'Abstand: eine Armlänge.')),
          h('div', { class: 'icon-card' }, CREW.icon('speaker', 30), h('b', null, 'Signal „Funk“'), h('span', { class: 'muted small' }, 'oder zweimal auf den Tisch klopfen – dann dreht sich die Person davor um.')),
          h('div', { class: 'icon-card' }, CREW.icon('x', 30), h('b', null, 'Kein Antippen'), h('span', { class: 'muted small' }, 'Kein Wort, kein Anfassen.')),
          h('div', { class: 'icon-card sl-beob' }, CREW.icon('eye', 30), h('b', null, 'Beobachter:in'), h('span', { class: 'muted small' }, 'steht seitlich und merkt sich: Wo verändert sich die Botschaft?'))),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      ], { eyebrow: 'Aufstellen' });
      if ((await ctx.next(wA, 'Reihe steht')) === ctx.SKIP) return { summary: 'Heute keine Reihe. Nächstes Mal.', noNach: true };

      // Drei Runden: Gefühl → Bitte → Gefühl + Bitte mit einem Wort (gleich auf allen Geräten durch den Tagescode)
      const r1 = ctx.rpick(KARTEN);
      const r2 = { bitte: ctx.rpick(Object.keys(BITTEN)) };
      r2.t = BITTEN[r2.bitte].t;
      const k3 = ctx.rpick(KOMBI.filter((k) => k.gef !== r1.gef && k.bitte !== r2.bitte)) || KOMBI[0];
      const runden = [{ L: 1, start: r1 }, { L: 2, start: r2 }, { L: 3, start: k3 }];
      const ergebnisse = [];
      for (let i = 0; i < runden.length; i++) {
        const { L, start } = runden[i];
        const nr = i + 1;
        const badge = ctx.stufe(L, LEVELS);
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: LEVEL_TEXT[L] });
        // 1) Nur die letzte Person schaut
        const c = await ctx.T.cover({ who: 'Nur die letzte Person schaut', hint: 'Alle anderen schauen zur Wand. Beamer kurz aus oder zur Seite drehen.', eyebrow: 'Runde ' + nr, label: 'Ich bin die letzte Person' });
        if (c === ctx.SKIP) continue;
        const wS = ctx.scr([
          botschaftKarte(ctx, start, { eyebrow: 'Deine Botschaft – nur für dich', tipp: L === 2 ? BITTEN[start.bitte].tipp : null }),
          h('p', { class: 'muted', style: { margin: 0, textAlign: 'center' } }, L === 3 ? 'Merk dir Gefühl und Bitte. Du darfst gleich genau EIN Wort dazu sagen.' : 'Merk sie dir. Gleich zeigst du sie nur mit Gesicht und Körper.'),
        ], { eyebrow: 'Runde ' + nr + ' · geheim', badge, center: true });
        if ((await ctx.next(wS, 'Gemerkt – verdecken', { id: 'sl-gemerkt' })) === ctx.SKIP) continue;
        // 2) Weitergeben
        const slot = h('div', { class: 'row center walk-timer' });
        const wW = ctx.scr([
          ctx.say(L === 3 ? 'Weitergeben: Gesicht, Körper – und genau EIN Wort pro Person. Welches Wort hilft am meisten?' : 'Weitergeben ohne Worte: „Funk“ sagen oder klopfen, zeigen, umdrehen. Die Nächste ist dran.', { eyebrow: 'Weitergeben', small: true }),
          h('div', { class: 'sl-kette', 'aria-label': 'Von hinten nach vorne' }, ['hinten', '…', '…', 'vorne'].flatMap((t, k) => [k ? h('span', { class: 'sl-pfeil-k', 'aria-hidden': 'true' }, '→') : null, h('span', { class: 'sl-glied' + (k === 0 ? ' start' : k === 3 ? ' ziel' : '') }, t)])),
          h('div', { class: 'row between' }, h('p', { class: 'muted', style: { margin: 0 } }, 'Beobachter:in: Wo verändert sich etwas? Merken, nicht reinrufen.'), slot),
          h('div', { class: 'row' }, ctx.safetyLine('koerper')),
        ], { eyebrow: 'Runde ' + nr + ' · Reihe', badge });
        const wr = await ctx.timerOrButton(wW, 60, [{ label: 'Vorne angekommen', value: 'da', variant: 'good', icon: 'check', id: 'sl-da' }], { movement: true, slot });
        if (wr === ctx.SKIP) continue;
        // 3) Vorne tippen, was ankam
        const ziel = await eingabe(ctx, L, start, nr);
        if (ziel === ctx.SKIP) continue;
        const bew = bewerten(L, start, ziel);
        ergebnisse.push({ L, stufe: bew.stufe });
        CREW.sound.play(bew.stufe === 2 ? 'great' : bew.stufe === 1 ? 'good' : 'soft');
        // 4) Start und Ziel am Beamer, Rückwärts-Check ohne Schuld
        const zielBot = { gef: ziel.gef, z: null, t: ziel.bitte ? BITTEN[ziel.bitte].t : null };
        if (L === 3 && ziel.gef) zielBot.t = GEFUEHLE[ziel.gef].label + ' · ' + BITTEN[ziel.bitte].t;
        const w5 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill sl-ergebnis', 'data-stufe': String(bew.stufe), style: { fontSize: '1.2em' } }, ERGEBNIS[bew.stufe].label)),
          h('div', { class: 'sl-vergleich' },
            botschaftKarte(ctx, start, { eyebrow: 'Start (hinten)', small: true, cls: 'start' }),
            h('span', { class: 'sl-pfeil display', 'aria-hidden': 'true' }, '→'),
            L === 1
              ? h('div', { class: 'sl-karte ziel' }, h('span', { class: 'eyebrow' }, 'Angekommen (vorne)'), ctx.avatar('sam', GEFUEHLE[ziel.gef].mood, 72), h('b', { class: 'sl-text display' }, GEFUEHLE[ziel.gef].label), h('span', { class: 'pill' }, BAND[ziel.band].label))
              : botschaftKarte(ctx, zielBot, { eyebrow: 'Angekommen (vorne)', small: true, cls: 'ziel' })),
          ctx.say(ERGEBNIS[bew.stufe].text + ' Rückwärts-Check: Von vorne nach hinten zeigt jede:r kurz, was er oder sie bekommen hat.', { eyebrow: 'Wo hat es sich verändert?', small: true }),
          h('div', { class: 'card stack soft' }, h('b', null, 'Beobachter:in zuerst: Wo hat sich etwas verändert?'), h('p', { class: 'muted small', style: { margin: 0 } }, L === 3 ? 'Und: Welche Wörter wurden genommen? Welches hat geholfen?' : 'Nicht wer, sondern welches Signal: Was war unklar – Gesicht, Hände, Tempo?')),
          CREW.ui.teacherLine('Niemanden vorführen. Nur Signale besprechen. Dann Weiter.'),
        ], { eyebrow: 'Runde ' + nr + ' · Start und Ziel', badge });
        await ctx.next(w5, i + 1 < runden.length ? 'Nächste Runde' : 'Weiter');
      }

      // Vergleich der Runden: Was ging ohne Worte, wo hat ein Wort geholfen?
      if (ergebnisse.length) {
        const wV = ctx.scr([
          ctx.say('Was geht ohne Worte – und wann hilft ein Wort?', { eyebrow: 'Drei Runden', small: true }),
          h('div', { class: 'sl-runden' }, ergebnisse.map((e) => h('div', { class: 'sl-runde', 'data-stufe': String(e.stufe) }, h('span', { class: 'eyebrow' }, 'Level ' + e.L + ' · ' + LEVELS[e.L - 1]), h('b', null, ERGEBNIS[e.stufe].label)))),
          h('div', { class: 'card stack soft' }, h('b', null, 'Gefühle kommen oft an. Stärken und genaue Bitten sind schwer.'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Darum: genau hinschauen – und im Zweifel ein Wort dazu. „Warte!“ ist schneller als jede Geste.')),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Achtsames Hören“: ganz bei der anderen Person sein – mit Augen und Ohren')),
        ], { eyebrow: 'Vergleich', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wV, 'Weiter');
      }
      const an = ergebnisse.filter((e) => e.stufe === 2).length;
      return {
        summary: an >= 2 ? 'Angekommen! Körper und Gesicht sagen viel – und ein Wort rettet den Rest.' : ergebnisse.length ? 'Ohne Worte verrutscht viel. Darum hilft genau hinschauen – und manchmal ein Wort.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[ergebnisse.length, 'Runden'], [an, 'mal angekommen']],
      };
    },
  });
})();
