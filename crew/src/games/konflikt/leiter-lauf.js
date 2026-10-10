/* Spiel „Leiter-Lauf“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T4 Bewegung im Raum · j1-e26, j1-e25
   Fünf Bodenmarken = Zivilcourage-Leiter (1 Hinschauen · 2 Nicht mitlachen · 3 Weggehen mit Betroffenen ·
   4 Erwachsene holen · 5 Direkt was sagen) plus Mitte („weiß noch nicht“). Vorab: „Jede Stufe hilft. Stufe 1 ist
   keine Null.“ Zuschauer-Szene am Beamer, 10 Sekunden gehen, Stopp, die größte Gruppe zuerst: „Warum hier?“
   Danach zeigt die Leiter, was jede Stufe in dieser Szene bewirkt. Runde 2 derselben Szene: „Jetzt zu zweit“ –
   wer geht höher? Runde 3: eine Drohung im Chat – hier ist „Erwachsene holen“ die stärkste Stufe (Hilfe holen ist
   kein Petzen). Die Crew läuft als Figur (Yara, dann Yara + Mika, dann Luca), nie als sie selbst.
   Hilfenummern (116 111, BEE SECURE, Schule) am Ende. Nur die Lehrkraft tippt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const STUFEN = [
    { n: 1, id: 's1', label: 'Hinschauen', icon: 'eye' },
    { n: 2, id: 's2', label: 'Nicht mitlachen', icon: 'x' },
    { n: 3, id: 's3', label: 'Mit Betroffenen weggehen', icon: 'users' },
    { n: 4, id: 's4', label: 'Erwachsene holen', icon: 'shield' },
    { n: 5, id: 's5', label: 'Direkt was sagen', icon: 'chat' },
  ];
  const POS = STUFEN.map((s) => ({ id: s.id, label: String(s.n), where: s.label })).concat([{ id: 'mitte', label: '?', where: 'Weiß noch nicht' }]);

  /* Szenen: was am Beamer steht (wer schaut zu), und was jede Stufe dort bewirkt.
     stark = die Stufe, die in dieser Szene am meisten schützt. zuzweit = was sich zu zweit ändert. */
  const SZENEN = {
    bus: {
      titel: 'An der Bushaltestelle', zuschauer: 'yara', betroffen: 'sam',
      text: 'Nach der Schule. Luca und zwei aus der 8. nehmen Sam die Mütze weg und werfen sie hin und her. Sam lacht nicht. Yara wartet drei Meter daneben auf denselben Bus.',
      folgen: {
        s1: 'Yara schaut hin statt aufs Handy. Sam merkt: Jemand sieht das. Und Yara kann später genau erzählen, was war.',
        s2: 'Yara lacht nicht mit. Ein Lacher weniger – Luca merkt, dass das Publikum fehlt.',
        s3: 'Yara sagt zu Sam: „Komm, wir stellen uns da vorne hin.“ Sam ist nicht mehr allein.',
        s4: 'Yara erzählt es am nächsten Morgen der Klassenlehrkraft. Die kümmert sich – ohne Yaras Namen zu nennen.',
        s5: 'Yara sagt: „Gebt die Mütze zurück.“ Allein gegen drei Ältere – mutig, aber riskant.',
        mitte: 'Unsicher sein ist okay. Wer hinschaut, ist schon auf Stufe 1.',
      },
      stark: 's3',
      zuzweit: { s5: 'Yara und Mika sagen zusammen: „Lasst das. Gebt die Mütze zurück.“ Zu zweit wirkt es – Luca wirft die Mütze zurück.', s3: 'Yara und Mika nehmen Sam in die Mitte und gehen zum Bus. Drei sind eine Gruppe.' },
    },
    chat: {
      titel: 'Die Drohung im Chat', zuschauer: 'luca', betroffen: 'mika',
      text: 'Im Gruppenchat schreiben drei aus der 9. an Mika: „Morgen nach der Schule bist du dran.“ Daneben Lach-Emojis. Luca liest mit.',
      folgen: {
        s1: 'Luca liest genau und merkt: Das ist kein Witz, das ist eine Drohung.',
        s2: 'Luca setzt kein Emoji drunter. Kein Applaus für die Drohung.',
        s3: 'Luca schreibt Mika privat: „Hab’s gesehen. Ich geh morgen mit dir raus.“',
        s4: 'Luca macht einen Screenshot und zeigt ihn noch heute einer erwachsenen Person. Bei Drohungen ist das die stärkste Stufe.',
        s5: 'Luca schreibt in den Chat: „Hört auf.“ Gut gemeint – aber gegen drei aus der 9. kann Luca selbst zum Ziel werden.',
        mitte: 'Unsicher ist okay. Bei Drohungen gilt: Erwachsene dazuholen ist nie falsch.',
      },
      stark: 's4',
    },
  };

  const LEVELS = ['Allein', 'Zu zweit', 'Sicher handeln'];

  // Die Leiter als Bild: Stufe 5 oben, Stufe 1 unten. o.folgen = Text je Stufe, o.stark = hervorgehoben
  function leiter(ctx, o) {
    const oo = o || {};
    return h('div', { class: 'll-leiter' + (oo.folgen ? ' mit-folgen' : '') },
      STUFEN.slice().reverse().map((s) => h('div', { class: 'll-sprosse' + (oo.stark === s.id ? ' stark' : ''), 'data-pos': s.id },
        h('span', { class: 'll-n display' }, String(s.n)),
        h('span', { class: 'll-ic' }, CREW.icon(s.icon, 22)),
        h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } },
          h('b', null, s.label + (oo.stark === s.id ? ' · ' + (oo.starkText || 'passt hier besonders') : '')),
          oo.folgen ? h('span', { class: 'small' }, oo.folgen[s.id]) : null))));
  }
  const szeneKarte = (ctx, sz, eyebrow, extra) => h('div', { class: 'card stack ll-szene' },
    h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, eyebrow), ctx.readBtn(sz.text)),
    h('div', { class: 'll-szene-body' },
      h('div', { class: 'll-figs' }, ctx.avatar(sz.betroffen, 'angst', 56), ctx.avatar(sz.zuschauer, 'ueberrascht', 56)),
      h('p', { class: 'lead', style: { margin: 0 } }, sz.text)),
    extra || null);

  CREW.registerGame({
    id: 'leiter-lauf',
    template: 'T4',
    icon: 'steps',
    themen: ['Zivilcourage', 'Zuschauen', 'Hilfe holen', 'Zu zweit'],
    safety: ['figuren', 'koerper', 'raum'],
    help: true,
    szenen: SZENEN, stufen: STUFEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Fünf Marken am Boden sind eine Leiter: von Hinschauen bis Direkt was sagen. Eine Szene, 10 Sekunden gehen – auf die Stufe, die die Figur schafft.',
        levels: LEVELS,
        steps: [
          { icon: 'steps', title: 'Allein', text: 'Welche Stufe schafft Yara allein?' },
          { icon: 'users', title: 'Zu zweit', text: 'Dieselbe Szene, jetzt mit Mika. Wer geht höher?' },
          { icon: 'shield', title: 'Sicher handeln', text: 'Bei Drohungen: Hilfe holen ist die stärkste Stufe.' },
        ],
        probe: ctx.T.probeCard('Probe: Auf welcher Stufe steht „Einer Lehrkraft Bescheid sagen“? Tippt eins – zählt nicht.', [{ label: 'Stufe 2', value: 2, variant: 'ghost' }, { label: 'Stufe 4', value: 4, variant: 'ghost' }]),
      });

      // Bodenmarken legen + der wichtigste Satz vorab
      const wB = ctx.scr([
        h('div', { class: 'll-vorab display' }, 'Jede Stufe hilft. Stufe 1 ist keine Null.'),
        h('div', { class: 'll-start' },
          leiter(ctx),
          h('div', { class: 'stack' },
            ctx.say('Legt fünf Zettel 1–5 in eine Reihe auf den Boden, von der Tür bis zur Tafel. Daneben ein Zettel „?“ für „weiß noch nicht“.', { eyebrow: 'Bodenmarken', small: true }),
            h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum'), ctx.safetyLine('figuren')))),
        CREW.ui.teacherLine('Marken liegen? Dann Weiter. Ihr lauft immer für eine Figur, nie für euch.'),
      ], { eyebrow: 'Vorbereitung' });
      if ((await ctx.next(wB, 'Marken liegen')) === ctx.SKIP) return { summary: 'Heute keine Leiter. Nächstes Mal.', help: true };

      const bus = SZENEN.bus, chat = SZENEN.chat;
      const Y = ctx.figures[bus.zuschauer], S = ctx.figures[bus.betroffen], L = ctx.figures[chat.zuschauer];
      let gelaufen = 0, hoeher = null;

      // Level 1: allein – Yara an der Bushaltestelle
      const r1 = await ctx.T.walk({
        card: szeneKarte(ctx, bus, bus.titel + ' · Was macht ' + Y.name + '?'),
        positions: POS, seconds: 10, step: bus.titel, badge: ctx.stufe(1, LEVELS),
        question: 'Die größte Gruppe zuerst: Warum hier? Was traut sich ' + Y.name + ' – ehrlich?',
        minorityFirst: false, nextLabel: 'Was bringt jede Stufe?',
      });
      if (r1 !== ctx.SKIP) {
        gelaufen++;
        const wF = ctx.scr([
          ctx.say('So hilft jede Stufe ' + S.name + ' an der Bushaltestelle:', { eyebrow: 'Die Leiter', small: true }),
          leiter(ctx, { folgen: bus.folgen, stark: bus.stark }),
          h('p', { class: 'muted small' }, 'Auf „?“ gestanden? ' + bus.folgen.mitte),
        ], { eyebrow: bus.titel + ' · Folgen', badge: ctx.stufe(1, LEVELS) });
        await ctx.next(wF, 'Weiter');
      }

      // Level 2: zu zweit – dieselbe Szene, Mika ist auch da
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Dieselbe Szene. Jetzt steht Mika neben ' + Y.name + '. Geht zu zweit – nebeneinander, ohne Anfassen. Wer geht höher?' });
      const r2 = await ctx.T.walk({
        card: szeneKarte(ctx, bus, bus.titel + ' · zu zweit', h('div', { class: 'row', style: { gap: '10px' } }, ctx.avatar(bus.zuschauer, 'neutral', 40), ctx.avatar('mika', 'neutral', 40), h('b', null, Y.name + ' und Mika gehen zusammen.'))),
        positions: POS, seconds: 10, step: bus.titel + ' · zu zweit', badge: ctx.stufe(2, LEVELS),
        question: 'Die größte Gruppe zuerst: Wer ist höher gegangen als allein? Was macht zu zweit leichter?',
        minorityFirst: false, nextLabel: 'Weiter',
      });
      if (r2 !== ctx.SKIP) {
        gelaufen++;
        const wH = ctx.scr([ctx.say('Ist die Crew zu zweit höher gegangen als allein?', { eyebrow: 'Zu zweit', small: true }), CREW.ui.teacherLine('Einmal antippen, was ihr seht. Niemand wird gezählt.')], { eyebrow: 'Zu zweit', center: true, badge: ctx.stufe(2, LEVELS) });
        const hh = await ctx.ask(wH, [{ label: 'Höher', value: 'hoeher', icon: 'steps', id: 'll-hoeher' }, { label: 'Gleich', value: 'gleich', variant: 'ghost', id: 'll-gleich' }, { label: 'Tiefer', value: 'tiefer', variant: 'ghost', id: 'll-tiefer' }]);
        if (hh !== ctx.SKIP) hoeher = hh;
        const wZ = ctx.scr([
          hh === 'hoeher' ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Zu zweit höher!') : null,
          h('div', { class: 'grid two' },
            ctx.figureCard({ fig: bus.zuschauer, mood: 'froh', text: bus.zuzweit.s5, eyebrow: 'Stufe 5 · zu zweit', size: 64 }),
            ctx.figureCard({ fig: 'mika', mood: 'neutral', text: bus.zuzweit.s3, eyebrow: 'Stufe 3 · zu zweit', size: 64 })),
          h('div', { class: 'card stack soft' }, h('b', null, 'Zu zweit ist man mutiger – und sicherer.'), h('span', { class: 'muted small' }, hh === 'tiefer' ? 'Tiefer ist auch eine Antwort: Manchmal verlässt man sich auf die andere Person. Fragt euch: Wer macht den ersten Schritt?' : 'Darum: Such dir Verbündete. Ein Blick, ein „Kommst du mit?“ reicht oft.')),
        ], { eyebrow: bus.titel + ' · zu zweit', badge: ctx.stufe(2, LEVELS) });
        if (hh === 'hoeher') CREW.sound.play('great');
        await ctx.next(wZ, 'Weiter');
      }

      // Level 3: sicher handeln – eine Drohung im Chat
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Neue Szene, online. Jetzt seid ihr ' + L.name + '. Welche Stufe ist hier sicher – und welche am stärksten?' });
      const r3 = await ctx.T.walk({
        card: szeneKarte(ctx, chat, chat.titel + ' · Was macht ' + L.name + '?'),
        positions: POS, seconds: 10, step: chat.titel, badge: ctx.stufe(3, LEVELS),
        question: 'Die größte Gruppe zuerst: Was ist hier sicher? Was wäre gefährlich?',
        minorityFirst: false, nextLabel: 'Was bringt jede Stufe?',
      });
      if (r3 !== ctx.SKIP) {
        gelaufen++;
        const wF3 = ctx.scr([
          leiter(ctx, { folgen: chat.folgen, stark: chat.stark, starkText: 'hier am stärksten' }),
          h('div', { class: 'grid two ll-petzen' },
            h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Petzen'), h('b', null, 'will jemandem schaden.'), h('span', { class: 'muted small' }, '„Die soll Ärger kriegen.“')),
            h('div', { class: 'card stack ll-hilfe' }, h('span', { class: 'eyebrow' }, 'Hilfe holen'), h('b', null, 'will jemanden schützen.'), h('span', { class: 'muted small' }, '„Mika ist in Gefahr. Allein schaff ich das nicht.“'))),
        ], { eyebrow: chat.titel + ' · Folgen', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wF3, 'Weiter');
      }

      return {
        summary: 'Jede Stufe hilft. Zu zweit geht man höher – und Hilfe holen ist kein Petzen, sondern die stärkste Stufe, wenn es gefährlich wird.',
        stats: [[gelaufen, 'mal gelaufen']].concat(hoeher ? [[hoeher === 'hoeher' ? 'ja' : hoeher === 'gleich' ? 'gleich' : 'nein', 'zu zweit höher']] : []),
        help: true,
      };
    },
  });
})();
