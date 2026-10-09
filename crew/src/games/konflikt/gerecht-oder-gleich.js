/* Spiel „Gerecht oder gleich?“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T4 Bewegung im Raum · j1-e01, j1-e24
   Fairness-Dilemma mit Bild (Pizza für vier, Luca hat seit dem Frühstück nichts gegessen; Gruppenarbeit, Yara hat fast
   alles gemacht, eine Note für alle; Elfmeterschießen, Sam ist neu). Zwei Seiten im Raum: A „Alle gleich“ (Wand links),
   B „Je nach Lage“ (Wand rechts), Mitte „Kommt drauf an“. 20 Sekunden gehen, die kleinere Seite spricht zuerst.
   Die Folge-Szene zeigt, wie es den Figuren geht; „Rewind“ zeigt die anderen Wege. Keine richtige Antwort, nur Folgen.
   In drei Level: 1) Erkennen (Pizza), 2) Begründen (Gruppennote: mit „weil“, die andere Seite wiederholt das Argument,
   bevor sie widerspricht), 3) Perspektive (Elfmeter: einmal als Sam gehen, einmal als Luca – wer bewegt sich?).
   Nur die Lehrkraft tippt: „Stopp!“, „Weiter“ und welcher Weg zuerst gezeigt wird. Niemand wird gezählt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const POS = [
    { id: 'a', label: 'A', where: 'Wand links' },
    { id: 'mitte', label: 'Mitte', where: 'Kommt drauf an' },
    { id: 'b', label: 'B', where: 'Wand rechts' },
  ];
  const WEG_NAME = { a: 'Weg A', mitte: 'Mitte', b: 'Weg B' };

  /* Dilemmata: a/b/mitte = die drei Wege. Jeder Weg hat ein Bild (verteilung) und drei Figuren-Reaktionen.
     Jeder Weg hat mindestens eine Figur, die nicht froh ist: Es gibt keinen Weg ohne Preis. */
  const DILEMMATA = [
    {
      id: 'pizza', titel: 'Die Pizza', bild: 'pizza',
      text: 'Vier Freunde, eine Pizza mit 12 Stücken. Luca hat seit dem Frühstück nichts gegessen. Die anderen hatten Mittagessen.',
      a: { kurz: 'Alle gleich', lang: 'Jede:r bekommt 3 Stücke.', vert: { mika: 3, yara: 3, luca: 3, sam: 3 },
        react: [['luca', 'neutral', 'Drei Stücke. Ich hab immer noch Hunger, aber okay.'], ['sam', 'froh', 'Easy. Keiner kann meckern.'], ['yara', 'neutral', 'Ich hätte eh nur zwei geschafft.']] },
      b: { kurz: 'Je nach Hunger', lang: 'Luca bekommt 6 Stücke, die anderen je 2.', vert: { mika: 2, yara: 2, luca: 6, sam: 2 },
        react: [['luca', 'froh', 'Danke. Jetzt kann ich wieder denken.'], ['mika', 'genervt', 'Und wenn ich morgen Hunger hab – krieg ich dann auch sechs?'], ['sam', 'neutral', 'Zwei Stücke … okay, ich hatte ja Mittag.']] },
      mitte: { kurz: 'Erst fragen', lang: 'Erst fragen, wer wie viel Hunger hat. Dann verteilen.', vert: { mika: 2, yara: 2, luca: 5, sam: 3 },
        react: [['yara', 'froh', 'Ich hab eh keinen Hunger mehr. Luca, nimm eins von mir.'], ['sam', 'genervt', 'Fragen dauert. Die Pizza wird kalt.'], ['luca', 'froh', 'Fünf Stücke. Danke, dass ihr gefragt habt.']] },
    },
    {
      id: 'note', titel: 'Die Gruppennote', bild: 'note',
      text: 'Gruppenarbeit: Yara hat fast alles gemacht. Sam war zwei Wochen krank. Mika und Luca hatten wenig Lust. Die Lehrerin gibt eine 2.',
      arbeit: { yara: 60, mika: 15, luca: 15, sam: 10 },
      a: { kurz: 'Alle gleich', lang: 'Alle vier bekommen die 2.', noten: { yara: '2', mika: '2', luca: '2', sam: '2' },
        react: [['yara', 'wut', 'Ich hab die Arbeit gemacht, ihr habt die Note.'], ['luca', 'froh', 'Glück gehabt. Eine 2!'], ['sam', 'neutral', 'Ich war krank. Gut, dass ich nicht bestraft werde.']] },
      b: { kurz: 'Je nach Arbeit', lang: 'Yara bekommt eine 1, die anderen eine 3.', noten: { yara: '1', mika: '3', luca: '3', sam: '3' },
        react: [['yara', 'froh', 'Endlich sieht jemand, wer was gemacht hat.'], ['mika', 'wut', 'Jetzt streiten wir, wer wie viel gemacht hat.'], ['sam', 'traurig', 'Ich war krank! Dafür kann ich nichts.']] },
      mitte: { kurz: 'Kommt drauf an', lang: 'Krank zählt anders als keine Lust: Yara 1, Sam 2, Mika und Luca 3.', noten: { yara: '1', mika: '3', luca: '3', sam: '2' },
        react: [['sam', 'froh', 'Danke, dass Kranksein nicht zählt wie keine Lust.'], ['mika', 'genervt', 'Und wer entscheidet, wer keine Lust hatte?'], ['yara', 'neutral', 'Besser. Aber eigentlich wollte ich, dass die anderen mitmachen.']] },
    },
    {
      id: 'elfmeter', titel: 'Das Elfmeterschießen', bild: 'elfmeter',
      text: 'Schulturnier, Elfmeterschießen. Sam ist neu, hat noch nie im Turnier geschossen und will unbedingt. Luca trifft fast immer.',
      a: { kurz: 'Alle gleich', lang: 'Alle schießen der Reihe nach – auch Sam.', schuetzen: ['luca', 'mika', 'yara', 'sam'],
        react: [['sam', 'froh', 'Ich hab verschossen. Aber ich war dabei!'], ['luca', 'genervt', 'Wir sind raus. Hätte ich zweimal geschossen …'], ['yara', 'neutral', 'Wenigstens saß keiner auf der Bank.']] },
      b: { kurz: 'Die Sichersten', lang: 'Die Sichersten schießen, damit das Team eine Chance hat.', schuetzen: ['luca', 'mika', 'yara'],
        react: [['luca', 'froh', 'Weiter! Halbfinale!'], ['sam', 'traurig', 'Ich bin mal wieder nur Zuschauer.'], ['mika', 'neutral', 'Gewonnen – aber Sam ist still.']] },
      mitte: { kurz: 'Kommt drauf an', lang: 'Sam schießt im Training mit, im Turnier die Sichersten – beim nächsten Turnier ist Sam dran.', schuetzen: ['luca', 'mika', 'yara'],
        react: [['sam', 'neutral', 'Training ist okay. Aber einmal will ich im echten Spiel schießen.'], ['luca', 'froh', 'Fairer Plan: Sam übt, und nächstes Mal ist Sam dran.'], ['yara', 'froh', 'Dann hat jede:r was davon.']] },
      sicht: [{ fig: 'sam', text: 'Ihr seid jetzt Sam: neu, will unbedingt schießen, hat Angst zu verschießen.' }, { fig: 'luca', text: 'Ihr seid jetzt Luca: trifft fast immer, will unbedingt ins Halbfinale.' }],
    },
  ];

  const LEVELS = ['Erkennen', 'Begründen', 'Perspektive'];

  // Bild zum Dilemma: Pizza (Stücke in Figurenfarben), Arbeit + Noten, Schützen
  function bild(ctx, d, weg) {
    const F = ctx.figures;
    if (d.bild === 'pizza') {
      const vert = weg ? d[weg].vert : null;
      const order = ['mika', 'yara', 'luca', 'sam'];
      const stuecke = [];
      if (vert) order.forEach((f) => { for (let i = 0; i < vert[f]; i++) stuecke.push(F[f].colour); });
      while (stuecke.length < 12) stuecke.push('#f5c26b');
      const R = 60, C = 70;
      const paths = stuecke.map((col, i) => {
        const a0 = (i / 12) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / 12) * Math.PI * 2 - Math.PI / 2;
        const x0 = C + R * Math.cos(a0), y0 = C + R * Math.sin(a0), x1 = C + R * Math.cos(a1), y1 = C + R * Math.sin(a1);
        return '<path d="M' + C + ' ' + C + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + R + ' ' + R + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="' + col + '" stroke="#0e0a26" stroke-width="2.5"/>';
      }).join('');
      const svg = h('span', { class: 'gg-pizza', 'aria-label': vert ? 'Pizza verteilt' : 'Pizza mit 12 Stücken', html: '<svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true"><circle cx="70" cy="70" r="66" fill="#c98a3a" stroke="#0e0a26" stroke-width="3"/>' + paths + '</svg>' });
      return h('div', { class: 'gg-bild' }, svg, vert ? h('div', { class: 'gg-legende' }, order.map((f) => h('span', { class: 'gg-leg', style: { '--fc': F[f].colour } }, ctx.avatar(f, 'neutral', 30), h('b', null, vert[f]), h('span', { class: 'small muted' }, 'Stücke')))) : h('span', { class: 'muted small' }, '12 Stücke für 4 Leute'));
    }
    if (d.bild === 'note') {
      const noten = weg ? d[weg].noten : null;
      return h('div', { class: 'gg-bild gg-arbeit' }, ['yara', 'mika', 'luca', 'sam'].map((f) => h('div', { class: 'gg-zeile' },
        ctx.avatar(f, 'neutral', 30), h('b', { class: 'small' }, F[f].name),
        h('div', { class: 'gg-balken', title: 'Arbeit' }, h('i', { style: { width: d.arbeit[f] + '%', background: F[f].colour } })),
        h('span', { class: 'small muted' }, f === 'sam' ? 'krank' : d.arbeit[f] + ' %'),
        h('span', { class: 'gg-note display' }, noten ? noten[f] : '?'))));
    }
    const sch = weg ? d[weg].schuetzen : null;
    return h('div', { class: 'gg-bild gg-tor' }, h('span', { class: 'gg-tornetz', 'aria-hidden': 'true' }),
      h('div', { class: 'row center', style: { gap: '10px' } }, ['luca', 'mika', 'yara', 'sam'].map((f) => h('span', { class: 'gg-schuetze' + (sch && !sch.includes(f) ? ' bank' : ''), style: { '--fc': F[f].colour } }, ctx.avatar(f, sch && !sch.includes(f) ? 'traurig' : 'neutral', 40), h('span', { class: 'small' }, F[f].name), h('span', { class: 'small muted' }, sch ? (sch.includes(f) ? 'schießt' : 'Bank') : (f === 'sam' ? 'neu' : f === 'luca' ? 'trifft fast immer' : ''))))));
  }

  // Beamer-Karte: Bild, Situation, die zwei Seiten
  function karte(ctx, d, extra) {
    return h('div', { class: 'card stack gg-karte' },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, d.titel), ctx.readBtn(d.text + ' Weg A: ' + d.a.lang + ' Weg B: ' + d.b.lang + ' Mitte: kommt drauf an.')),
      h('div', { class: 'gg-oben' }, bild(ctx, d, null), h('p', { class: 'lead', style: { margin: 0 } }, d.text)),
      h('div', { class: 'gg-seiten' },
        h('div', { class: 'gg-seite', 'data-pos': 'a' }, h('b', { class: 'display' }, 'A · ' + d.a.kurz), h('span', null, d.a.lang)),
        h('div', { class: 'gg-seite', 'data-pos': 'b' }, h('b', { class: 'display' }, 'B · ' + d.b.kurz), h('span', null, d.b.lang))),
      extra || null);
  }

  // Folge-Szene eines Weges: Bild + drei Figuren
  function folge(ctx, d, weg, o) {
    const oo = o || {};
    const w = d[weg];
    return h('div', { class: 'card stack gg-folge' + (oo.klein ? ' klein' : ''), 'data-weg': weg },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, WEG_NAME[weg] + ' · ' + w.kurz), ctx.readBtn(w.lang + ' ' + w.react.map(([f, , t]) => ctx.figures[f].name + ': ' + t).join(' '))),
      h('b', null, w.lang),
      oo.klein ? null : bild(ctx, d, weg),
      h('div', { class: 'stack gg-reakt' }, w.react.map(([f, mood, t]) => h('div', { class: 'gg-r' }, ctx.avatar(f, mood, oo.klein ? 34 : 44), h('span', null, h('b', null, ctx.figures[f].name + ': '), t)))));
  }

  CREW.registerGame({
    id: 'gerecht-oder-gleich',
    template: 'T4',
    icon: 'users',
    themen: ['Fairness', 'Gleichheit', 'Argumentieren', 'Perspektive'],
    safety: ['figuren', 'koerper', 'raum'],
    help: false,
    dilemmata: DILEMMATA, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Dilemma am Beamer. Geh zur Seite, die du fairer findest: A, B oder Mitte. Die kleinere Seite spricht zuerst. Dann zeigt der Beamer die Folgen.',
        levels: LEVELS,
        steps: [
          { icon: 'users', title: 'Gehen', text: '20 Sekunden: A, B oder Mitte.' },
          { icon: 'chat', title: 'Reden', text: 'Die kleinere Seite zuerst. Mit „weil“.' },
          { icon: 'undo', title: 'Folgen + Rewind', text: 'Jeder Weg hat einen Preis. Rewind zeigt die anderen.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: ctx.say('PROBE · zählt nicht: Zwei Kekse, zwei Leute. A: jede:r einen. B: wer zuerst kommt. Geh kurz hin – nur zum Ausprobieren.', { eyebrow: 'Probe' }), positions: POS, seconds: 10, question: 'Probe vorbei. So geht’s: gehen, Stopp, reden.', step: 'Probe', minorityFirst: false });
        },
      });
      // Raum vorbereiten (einmal am Beamer)
      const wR = ctx.scr([
        ctx.say('Zwei Seiten im Raum: A an der linken Wand, B an der rechten. Wer unsicher ist, geht in die Mitte. Es gibt keine richtige Seite – nur Folgen.', { eyebrow: 'Der Raum', small: true }),
        h('div', { class: 'walk-pos' }, POS.map((p) => h('div', { class: 'walk-p', 'data-pos': p.id }, h('b', { class: 'display' }, p.label), h('span', { class: 'muted small' }, p.where)))),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      ], { eyebrow: 'Vorbereitung' });
      if ((await ctx.next(wR, 'Los')) === ctx.SKIP) return { summary: 'Heute nicht gegangen. Nächstes Mal.' };

      let gegangen = 0, rewinds = 0, sichtWechsel = null;
      for (let i = 0; i < DILEMMATA.length; i++) {
        const d = DILEMMATA[i];
        const L = i + 1;
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt mit „weil“: Die kleinere Seite begründet zuerst. Dann wiederholt die andere Seite das Argument, bevor sie widerspricht.' : 'Jetzt geht ihr nicht für euch, sondern als Figur: erst als Sam, dann als Luca. Wer bewegt sich?' });

        if (L < 3) {
          const r = await ctx.T.walk({
            card: karte(ctx, d), positions: POS, seconds: 20, step: d.titel, badge: ctx.stufe(L, LEVELS),
            question: L === 1 ? 'Die kleinere Seite zuerst: Warum steht ihr hier?' : 'Die kleinere Seite zuerst, mit „weil“. Dann wiederholt die andere Seite das Argument – erst dann widersprechen.',
            nextLabel: 'Zu den Folgen',
          });
          if (r === ctx.SKIP) continue;
          gegangen++;
        } else {
          // Level 3: zweimal gehen – als Sam, dann als Luca
          for (const s of d.sicht) {
            const r = await ctx.T.walk({
              card: karte(ctx, d, ctx.figureCard({ fig: s.fig, mood: s.fig === 'sam' ? 'angst' : 'froh', text: s.text, eyebrow: 'Perspektive', size: 64 })),
              positions: POS, seconds: 20, step: d.titel + ' · als ' + ctx.figures[s.fig].name, badge: ctx.stufe(3, LEVELS),
              question: s.fig === 'sam' ? 'Als Sam: Warum steht ihr hier? Die kleinere Seite zuerst.' : 'Als Luca: Wer hat sich bewegt – und warum?',
              nextLabel: 'Weiter',
            });
            if (r !== ctx.SKIP) gegangen++;
          }
          const wS = ctx.scr([
            ctx.say('Habt ihr euch bewegt, als ihr Luca wart? Fair hängt davon ab, wo man steht.', { eyebrow: 'Perspektive', small: true }),
          ], { eyebrow: d.titel, center: true, badge: ctx.stufe(3, LEVELS) });
          const sw = await ctx.ask(wS, [{ label: 'Ja, viele sind gewechselt', value: 'ja', variant: 'ghost', id: 'gg-sicht-ja' }, { label: 'Kaum jemand', value: 'kaum', variant: 'ghost', id: 'gg-sicht-kaum' }]);
          if (sw !== ctx.SKIP) sichtWechsel = sw;
          // Alle drei Wege nebeneinander: Jeder Weg hat einen Preis
          const wAll = ctx.scr([
            ctx.say('Drei Wege, drei Folgen. Gibt es einen Weg, mit dem Sam UND Luca leben können? Worauf kommt es an?', { eyebrow: 'Kommt drauf an', small: true }),
            h('div', { class: 'gg-wege' }, ['a', 'mitte', 'b'].map((w) => folge(ctx, d, w, { klein: true }))),
            h('p', { class: 'muted small' }, 'Keine Seite ist falsch. Jeder Weg hat einen Preis – die Frage ist, wer ihn zahlt.'),
          ], { eyebrow: d.titel + ' · alle Wege', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(wAll, 'Weiter');
          continue;
        }

        // Welcher Weg wird zuerst gezeigt? (z. B. der der größeren Gruppe – nicht zählen, nur zeigen)
        const wW = ctx.scr([
          ctx.say('Welchen Weg spielen wir zuerst durch? Zum Beispiel den der größeren Gruppe.', { eyebrow: d.titel, small: true }),
          CREW.ui.teacherLine('Einen Weg antippen. Niemand wird gezählt.'),
        ], { eyebrow: d.titel, center: true, badge: ctx.stufe(L, LEVELS) });
        const weg = await ctx.ask(wW, [{ label: 'A · ' + d.a.kurz, value: 'a', variant: 'teamA', id: 'gg-weg-a' }, { label: 'Mitte · ' + d.mitte.kurz, value: 'mitte', variant: 'ghost', id: 'gg-weg-mitte' }, { label: 'B · ' + d.b.kurz, value: 'b', variant: 'teamB', id: 'gg-weg-b' }]);
        if (weg === ctx.SKIP) continue;
        const wF = ctx.scr([
          folge(ctx, d, weg),
          ctx.say(L === 1 ? 'Wem geht es gut, wem nicht? War das fair – und für wen?' : 'Wer zahlt hier den Preis? Was würde die andere Seite sagen?', { eyebrow: 'Kurz reden', small: true }),
        ], { eyebrow: d.titel + ' · Folge', badge: ctx.stufe(L, LEVELS) });
        const rw = await ctx.ask(wF, [{ label: 'Rewind: die anderen Wege', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'gg-rewind' }, { label: 'Weiter', value: 'weiter', iconRight: 'right', id: 'gg-weiter' }]);
        if (rw === 'rewind') {
          rewinds++;
          CREW.sound.play('tap');
          const andere = ['a', 'mitte', 'b'].filter((w) => w !== weg);
          const wRw = ctx.scr([
            h('div', { class: 'gg-rewind display' }, CREW.icon('undo', 34), 'Rewind'),
            h('div', { class: 'gg-wege zwei' }, andere.map((w) => folge(ctx, d, w, { klein: true }))),
            h('p', { class: 'muted small' }, 'Kein Weg ohne Preis. Gleich ist nicht immer gerecht – und gerecht nicht immer gleich.'),
          ], { eyebrow: d.titel + ' · Rewind', badge: ctx.stufe(L, LEVELS) });
          await ctx.next(wRw, i + 1 < DILEMMATA.length ? 'Nächstes Dilemma' : 'Weiter');
        }
      }
      return {
        summary: 'Gleich ist nicht immer gerecht. Ihr habt Seiten gewählt, begründet – und gesehen, dass jeder Weg einen Preis hat.',
        stats: [[gegangen, 'mal gegangen'], [rewinds, 'mal Rewind']].concat(sichtWechsel ? [[sichtWechsel === 'ja' ? 'viele' : 'kaum', 'Seitenwechsel als Luca']] : []),
      };
    },
  });
})();
