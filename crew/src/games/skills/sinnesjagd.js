/* Spiel „Sinnes-Jagd“ (Thema: Anspannung & Skills) · Vorlage T4 Bewegung im Raum · j1-e13
   Jedes Paar (Paar-Farbe per Tagescode) bekommt am Beamer drei Aufträge („etwas Kälteres als eure Hand“, „ein
   Geräusch, das nur ihr beide hört“), legt das iPad weg und sucht 90 Sekunden – nur im Klassenraum und im Flur in
   Sichtweite. Zurück gehen die Paare mit ihrem Fund in die Ecke des passenden Fachs; die Sinneskiste der Crew füllt sich.
   Level: 1) Jagen, 2) Einordnen (Funde, die in zwei Fächer passen – welcher Reiz hilft bei 80?),
   3) Hosentaschen-Pack: je ein Sinnes-Skill für Bus, Schulhof und Bett nachts (knüpft an die Sinneskiste an). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Jagen', 'Einordnen', 'Hosentaschen-Pack'];
  const FAECHER = [
    { id: 'kalt', name: 'Kalt & warm', where: 'Ecke vorne links', icon: 'leaf' },
    { id: 'fuehlen', name: 'Fühlen', where: 'Ecke vorne rechts', icon: 'user' },
    { id: 'hoeren', name: 'Hören', where: 'Ecke hinten links', icon: 'sound' },
    { id: 'sehen', name: 'Sehen', where: 'Ecke hinten rechts', icon: 'eye' },
    { id: 'riechen', name: 'Riechen', where: 'Mitte', icon: 'sparkle' },
  ];
  const F = Object.fromEntries(FAECHER.map((f) => [f.id, f]));
  // Aufträge je Fach (nichts in den Mund, nichts aus fremden Taschen)
  const AUFTRAEGE = {
    kalt: ['Etwas, das kälter ist als eure Hand', 'Etwas, das sich warm anfühlt (nicht die Heizung)', 'Etwas Kaltes und Glattes'],
    fuehlen: ['Etwas Raues', 'Etwas Weiches, das in eine Hand passt', 'Etwas mit Rillen oder Noppen'],
    hoeren: ['Ein Geräusch, das nur ihr beide hört', 'Ein Geräusch, das immer wiederkommt', 'Das leiseste Geräusch, das ihr findet'],
    sehen: ['Etwas Blaues, kleiner als ein Daumen', 'Drei Dinge mit einem Kreis drauf', 'Etwas, das sich bewegt'],
    riechen: ['Etwas, das nach etwas riecht (Holz, Papier, Seife)', 'Den frischesten Geruch im Raum', 'Etwas, das nach Ferien riecht'],
  };
  // Level 2: Funde, die in zwei Fächer passen. stark = hilft auch bei hoher Zahl
  const ZWEIFACH = [
    { id: 'chips', name: 'Knisternde Chipstüte (leer)', faecher: ['hoeren', 'fuehlen'], stark: false, text: 'Knistern hören und Knittern fühlen: zwei Fächer. Gut bei Gelb, bei 80 zu leise.' },
    { id: 'dose', name: 'Kalte Getränkedose', faecher: ['kalt', 'fuehlen'], stark: true, text: 'Kälte ist ein starker Reiz: Sie holt den Kopf sogar bei Rot zurück.' },
    { id: 'regen', name: 'Regentropfen am Fenster', faecher: ['sehen', 'hoeren'], stark: false, text: 'Tropfen anschauen und hören beruhigt – braucht aber etwas Ruhe. Eher Gelb.' },
    { id: 'minz', name: 'Pfefferminz-Kaugummi (verpackt)', faecher: ['riechen'], stark: true, text: 'Scharfer Geruch und Geschmack sind starke Reize – gut bei Rot. Schmecken nur, wenn es erlaubt ist.' },
    { id: 'igel', name: 'Igelball', faecher: ['fuehlen'], stark: true, text: 'Fest drücken und Noppen spüren: geht leise und auch bei hoher Zahl.' },
    { id: 'duftstift', name: 'Duft-Textmarker', faecher: ['riechen', 'sehen'], stark: false, text: 'Riechen und Farbe sehen: zwei Fächer. Ein leichter Duft hilft eher bei Gelb.' },
  ];
  // Level 3: Hosentaschen-Pack. fit: gut | geht | schwierig
  const ORTE = [
    { id: 'bus', name: 'Im Bus', opts: [
      { kurz: 'Kalte Flasche', t: 'Kalte Wasserflasche ans Handgelenk', f: 'kalt', fit: 'gut', why: 'Geht im Sitzen, keiner merkt es.' },
      { kurz: '5 rote Dinge', t: '5 rote Dinge draußen zählen', f: 'sehen', fit: 'gut', why: 'Das Fenster ist da – völlig unauffällig.' },
      { kurz: 'Igelball', t: 'Igelball in der Jackentasche kneten', f: 'fuehlen', fit: 'gut', why: 'Die Hand ist in der Tasche, niemand sieht es.' },
      { kurz: 'Laute Musik', t: 'Laute Musik ohne Kopfhörer', f: 'hoeren', fit: 'schwierig', why: 'Stört alle. Mit Kopfhörern wäre es gut.' },
    ] },
    { id: 'hof', name: 'Auf dem Schulhof', opts: [
      { kurz: 'Kalte Wand', t: 'Hände an die kalte Hauswand legen', f: 'kalt', fit: 'gut', why: 'Kurz, kräftig, kostet nichts.' },
      { kurz: 'Minz-Kaugummi', t: 'Pfefferminz-Kaugummi', f: 'riechen', fit: 'gut', why: 'Starker Reiz, geht überall – wenn Kaugummi erlaubt ist.' },
      { kurz: 'Bodyscan', t: 'Augen zu und Bodyscan', f: 'fuehlen', fit: 'schwierig', why: 'Auf dem lauten Hof schwer. Lieber zu Hause.' },
      { kurz: '3 Geräusche', t: 'Drei Geräusche bewusst hören', f: 'hoeren', fit: 'geht', why: 'Geht, wenn es nicht zu laut ist.' },
    ] },
    { id: 'bett', name: 'Im Bett, nachts', opts: [
      { kurz: 'Kühles Kissen', t: 'Kissen umdrehen, kühle Seite spüren', f: 'kalt', fit: 'gut', why: 'Leise, kühl, geht im Liegen.' },
      { kurz: 'Duft', t: 'Ein ruhiger Duft (Lavendel, Lieblings-Shirt)', f: 'riechen', fit: 'gut', why: 'Ein vertrauter Geruch hilft beim Runterkommen.' },
      { kurz: 'Scharfes Bonbon', t: 'Scharfes Bonbon lutschen', f: 'riechen', fit: 'schwierig', why: 'Macht wach – nachts eher nicht. Und im Liegen nichts lutschen.' },
      { kurz: 'Uhr zählen', t: 'Ein leises Geräusch zählen (Uhr, Regen)', f: 'hoeren', fit: 'gut', why: 'Hält die Gedanken bei einem Ding.' },
    ] },
  ];
  const FIT_TXT = { gut: 'Passt gut', geht: 'Geht', schwierig: 'Schwierig hier' };
  const ECKEN4 = ['Ecke vorne links', 'Ecke vorne rechts', 'Ecke hinten links', 'Ecke hinten rechts'];

  // Sinneskiste: fünf Fächer, gefüllte leuchten
  function kiste(gefuellt) {
    return h('div', { class: 'sj-kiste' }, FAECHER.map((f) => h('div', { class: 'sj-fach' + (gefuellt.includes(f.id) ? ' voll' : ''), 'data-fach': f.id }, CREW.icon(f.icon, 26), h('b', null, f.name))));
  }

  CREW.registerGame({
    id: 'sinnesjagd',
    template: 'T4',
    icon: 'eye',
    faecher: FAECHER, auftraege: AUFTRAEGE, orte: ORTE, // für den Test
    themen: ['Sinnes-Skills', 'Skills an Orte binden', 'Kooperation zu zweit'],
    safety: ['raum', 'koerper', 'freiwillig'],
    async run(ctx) {
      const POS = FAECHER.map((f) => ({ id: f.id, label: f.name, where: f.where }));
      await ctx.T.intro({
        rule: 'Jedes Paar sucht 90 Sekunden nach drei Dingen für die Sinne. Danach packt ihr einen Hosentaschen-Pack für Bus, Schulhof und Bett.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Jagen', text: 'Drei Aufträge, 90 Sekunden, nur Klassenraum und Flur.' },
          { icon: 'users', title: 'Einordnen', text: 'Mit dem Fund in die Ecke des Fachs gehen.' },
          { icon: 'leaf', title: 'Hosentaschen-Pack', text: 'Je ein Sinnes-Skill für drei Orte.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: ctx.say('Probe: Ein Igelball. In welche Ecke? Kurz hingehen – zählt nicht.', { eyebrow: 'PROBE · zählt nicht' }), positions: POS, seconds: 10, step: 'Probe', question: 'Probe vorbei. Fühlen – oder? Kurz nicken reicht.', minorityFirst: false });
        },
      });
      // Paare und Aufträge (Tagescode: gleiche Paare wie auf den iPads)
      const paare = CREW.seed.pairs(ctx.code, Math.max(2, ctx.n));
      const plan = paare.map((p) => {
        const faecher = ctx.rshuffle(FAECHER.map((f) => f.id)).slice(0, 3);
        return { p, auftraege: faecher.map((fid) => ({ fid, t: ctx.rpick(AUFTRAEGE[fid]) })) };
      });
      const wP = ctx.scr([
        ctx.say('Merkt euch eure drei Aufträge. Das iPad bleibt liegen.', { eyebrow: 'Eure Aufträge', small: true }),
        h('div', { class: 'sj-paare' }, plan.map((x) => h('div', { class: 'sj-paar', style: { '--pc': x.p.colour.css, '--pi': x.p.colour.ink } },
          h('div', { class: 'row between', style: { gap: '8px' } }, ctx.colourChip(x.p.colour), h('span', { class: 'muted small' }, 'Plätze ' + x.p.seats.join(' + '))),
          h('ol', { class: 'sj-auftraege' }, x.auftraege.map((a) => h('li', null, h('span', { class: 'sj-ic' }, CREW.icon(F[a.fid].icon, 18)), a.t)))))),
        h('div', { class: 'card stack soft sj-regeln' },
          h('b', null, 'Regeln der Jagd'),
          h('ul', { class: 'lh-list' }, ['Nur Klassenraum und Flur in Sichtweite.', 'Gehen, nicht rennen. Kein Körperkontakt.', 'Nichts in den Mund, nichts aus fremden Taschen.', 'Geräusche merkt ihr euch nur.'].map((t) => h('li', null, t)))),
      ], { eyebrow: 'Jagen · Aufträge', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(wP, 'Los – 90 Sekunden', { id: 'sj-los' })) === ctx.SKIP) return { summary: 'Heute keine Jagd. Nächstes Mal.' };
      // 90 Sekunden suchen
      const slot = h('div', { class: 'row center' });
      const wJ = ctx.scr([
        h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Jagd läuft!'),
        h('div', { class: 'row center' }, slot),
        h('div', { class: 'sj-paare mini' }, plan.map((x) => h('div', { class: 'sj-paar', style: { '--pc': x.p.colour.css, '--pi': x.p.colour.ink } }, ctx.colourChip(x.p.colour), h('ol', { class: 'sj-auftraege' }, x.auftraege.map((a) => h('li', null, a.t)))))),
        h('div', { class: 'row' }, ctx.safetyLine('raum'), ctx.safetyLine('koerper')),
      ], { eyebrow: 'Jagen · 90 Sekunden', badge: ctx.stufe(1, LEVELS) });
      CREW.sound.play('go');
      const tj = await ctx.timerOrButton(wJ, 90, [{ label: 'Stopp! Alle zurück', value: 'stop', variant: 'teamB', icon: 'pause', id: 'btn-stop' }], { slot, movement: true });
      if (tj === ctx.SKIP) return { summary: 'Jagd abgebrochen. Auch okay.' };
      CREW.sound.play('go');
      // Mit dem Fund in die Ecke des Fachs
      const rF = await ctx.T.walk({
        card: ctx.say('Zurück mit den Funden! Jedes Paar geht mit einem Fund in die Ecke seines Fachs. Geräusche: einfach hinstellen und nachmachen.', { eyebrow: 'Funde einordnen' }),
        positions: POS, seconds: 15, step: 'Jagen · Funde', badge: ctx.stufe(1, LEVELS), minorityFirst: false,
        question: 'Jedes Paar zeigt einen Fund: Was ist es – und warum dieses Fach?', nextLabel: 'Sinneskiste füllen',
      });
      let gefuellt = [];
      if (rF !== ctx.SKIP) {
        // Lehrkraft tippt die Fächer an, in denen ein Fund lag
        const chips = h('div', { class: 'row center', style: { gap: '8px' } }, FAECHER.map((f) => {
          const b = h('button', { type: 'button', class: 'chip', 'data-fach': f.id }, CREW.icon(f.icon, 18), f.name);
          b.addEventListener('click', () => { CREW.sound.play('tap'); b.classList.toggle('sel'); });
          return b;
        }));
        if (ctx.auto) ctx.rshuffle(FAECHER).slice(0, 2 + Math.floor(ctx.autoRng() * 3)).forEach((f) => chips.querySelector('[data-fach="' + f.id + '"]').click());
        const wK = ctx.scr([
          ctx.say('In welchen Fächern lag ein Fund? Antippen – die Sinneskiste der Crew füllt sich.', { eyebrow: 'Sinneskiste', small: true }),
          chips,
          CREW.ui.teacherLine('Nur die Fächer antippen. Nicht zählen, welches Paar was hatte.'),
        ], { eyebrow: 'Jagen · Sinneskiste', badge: ctx.stufe(1, LEVELS) });
        if ((await ctx.next(wK, 'Kiste zeigen')) !== ctx.SKIP) {
          gefuellt = [...chips.querySelectorAll('.chip.sel')].map((b) => b.dataset.fach);
          CREW.sound.play(gefuellt.length >= 4 ? 'great' : 'good');
          const wK2 = ctx.scr([
            h('h2', { style: { textAlign: 'center' } }, gefuellt.length + ' von 5 Fächern gefüllt'),
            kiste(gefuellt),
            h('p', { class: 'muted', style: { textAlign: 'center' } }, gefuellt.length === 5 ? 'Volle Kiste! Für jeden Sinn ein Skill im Raum.' : 'Fehlt ein Fach? Es gibt überall etwas – man muss nur hinschauen.'),
          ], { eyebrow: 'Jagen · Sinneskiste', center: true, badge: ctx.stufe(1, LEVELS) });
          await ctx.next(wK2, 'Weiter');
        }
      }
      // Level 2: Funde, die in zwei Fächer passen – und welcher Reiz hilft bei 80?
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Manche Funde passen in zwei Fächer. Geht in die Ecke, die ihr wählt. Danach: Hilft das auch bei 80?' });
      const zwei = ctx.rshuffle(ZWEIFACH.filter((z) => z.faecher.length > 1)).slice(0, 1).concat(ctx.rshuffle(ZWEIFACH.filter((z) => z.stark)).slice(0, 1));
      let eingeordnet = 0;
      for (let i = 0; i < zwei.length; i++) {
        const z = zwei[i];
        const r = await ctx.T.walk({
          card: h('div', { class: 'sj-fund' }, h('span', { class: 'eyebrow' }, 'Fund ' + (i + 1) + ' von ' + zwei.length), h('b', { class: 'sj-fund-name' }, z.name), ctx.readBtn('Fund: ' + z.name)),
          positions: POS, seconds: 10, step: 'Einordnen ' + (i + 1), badge: ctx.stufe(2, LEVELS),
          question: 'Die kleinere Gruppe zuerst: Warum dieses Fach? Und: Hilft das auch bei 80?', nextLabel: 'Auflösen',
        });
        if (r === ctx.SKIP) continue;
        eingeordnet++;
        const wA = ctx.scr([
          h('div', { class: 'row center' }, z.faecher.map((fid) => h('span', { class: 'pill sj-pill', 'data-fach': fid }, CREW.icon(F[fid].icon, 16), F[fid].name)), z.faecher.length > 1 ? h('span', { class: 'muted small' }, 'Zwei Ecken haben recht.') : null),
          h('div', { class: 'sj-fund' }, h('b', { class: 'sj-fund-name' }, z.name), h('span', { class: 'amp-pill', 'data-ampel': z.stark ? 'rot' : 'gelb' }, z.stark ? 'Starker Reiz: hilft auch bei Rot' : 'Sanfter Reiz: eher bei Gelb')),
          ctx.say(z.text, { eyebrow: 'Bei 80?', small: true }),
        ], { eyebrow: 'Einordnen ' + (i + 1) + ' · Auflösung', badge: ctx.stufe(2, LEVELS) });
        await ctx.next(wA, i + 1 < zwei.length ? 'Nächster Fund' : 'Weiter');
      }
      // Level 3: Hosentaschen-Pack für drei Orte
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt packt die Crew ihren Hosentaschen-Pack: je ein Sinnes-Skill für Bus, Schulhof und Bett nachts. Geht zu eurer Wahl.' });
      const pack = [];
      let gutGewaehlt = 0;
      for (const ort of ORTE) {
        const opts = ctx.rshuffle(ort.opts);
        const pos = opts.map((o, i) => ({ id: 'o' + (i + 1), label: o.kurz, where: ECKEN4[i] }));
        const r = await ctx.T.walk({
          card: h('div', { class: 'stack' }, h('div', { class: 'sj-ort' }, CREW.icon('base', 30), h('b', null, ort.name), ctx.readBtn(ort.name + ': ' + opts.map((o) => o.t).join('. '))),
            h('div', { class: 'sj-opts' }, opts.map((o, i) => h('div', { class: 'sj-opt', 'data-pos': 'o' + (i + 1) }, h('span', { class: 'eyebrow' }, ECKEN4[i]), h('b', null, o.t))))),
          positions: pos, seconds: 10, step: 'Pack · ' + ort.name, badge: ctx.stufe(3, LEVELS),
          question: 'Jede Ecke einen Satz: Warum passt das zu „' + ort.name + '“? Die größte Gruppe entscheidet, was in den Pack kommt.', nextLabel: 'In den Pack',
        });
        if (r === ctx.SKIP) continue;
        const wW = ctx.scr([
          ctx.say('Was kommt für „' + ort.name + '“ in den Pack? Die größte Gruppe entscheidet.', { eyebrow: 'Pack · ' + ort.name, small: true }),
          CREW.ui.teacherLine('Einmal tippen, was die größte Gruppe gewählt hat.'),
        ], { eyebrow: 'Pack · ' + ort.name, badge: ctx.stufe(3, LEVELS) });
        const wahl = await ctx.ask(wW, opts.map((o, i) => ({ label: o.kurz, value: i, variant: 'ghost', id: 'sj-wahl-' + i })));
        if (wahl === ctx.SKIP) continue;
        const o = opts[wahl];
        if (o.fit === 'gut') gutGewaehlt++;
        CREW.sound.play(o.fit === 'schwierig' ? 'soft' : 'good');
        pack.push({ ort, o });
        const wF = ctx.scr([
          h('div', { class: 'sj-opts' }, opts.map((x) => h('div', { class: 'sj-opt fit', 'data-fit': x.fit, 'data-sel': x === o ? '1' : '0' }, h('span', { class: 'eyebrow' }, FIT_TXT[x.fit]), h('b', null, x.t), h('span', { class: 'muted small' }, x.why)))),
          ctx.say(o.fit === 'schwierig' ? 'Ehrlich: ' + o.why + ' Wollt ihr tauschen? Im Pack bleibt, was ihr gewählt habt – aber denkt an die anderen Ideen.' : 'In den Pack: ' + o.t + '. ' + o.why, { eyebrow: FIT_TXT[o.fit], small: true }),
        ], { eyebrow: 'Pack · ' + ort.name, badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wF, 'Weiter');
      }
      // Der fertige Pack
      if (pack.length) {
        const wPk = ctx.scr([
          h('div', { class: 'sj-pack' }, h('div', { class: 'sj-pack-head' }, CREW.icon('star', 28), h('b', { class: 'display' }, 'Euer Hosentaschen-Pack')),
            pack.map((x) => h('div', { class: 'sj-pack-item' }, h('span', { class: 'sj-ic' }, CREW.icon(F[x.o.f] ? F[x.o.f].icon : 'sparkle', 22)), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, x.ort.name), h('b', null, x.o.t))))),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Sinnes-Spaziergang“'), ctx.safetyLine('Wer mag, macht ein Foto im Kopf. Nichts wird gespeichert.')),
        ], { eyebrow: 'Hosentaschen-Pack', badge: ctx.stufe(3, LEVELS) });
        CREW.sound.play('great');
        await ctx.next(wPk, 'Weiter');
      }
      return {
        summary: pack.length ? 'Der Hosentaschen-Pack steht: Sinne holen euch zurück ins Hier – im Bus, auf dem Hof und nachts.' : 'Sinne gesucht und eingeordnet. Den Pack packt ihr nächstes Mal.',
        stats: [[gefuellt.length, 'von 5 Fächern gefüllt'], [eingeordnet, 'Funde eingeordnet'], [pack.length, 'Skills im Pack']].concat(pack.length ? [[gutGewaehlt, 'passen richtig gut']] : []),
      };
    },
  });
})();
