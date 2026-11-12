/* Spiel „Sorry-Werkstatt“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T5 Gerät weitergeben · j1-e24
   Nach einem Figuren-Streit wird eine Entschuldigung gebaut. Das iPad wandert im Kreis: „Nur du schaust“ auf
   drei Bausteine – echte („Das war nicht okay von mir“) und Fake-Sorrys („Sorry, aber du hast angefangen“).
   Jede Person legt einen Baustein dazu oder nimmt einen weg. Die verletzte Figur reagiert sofort mit Stimmung
   und Hitze; wer einen Fake wegnimmt, sagt in einem Satz, warum (aufgedeckt wird beim Weitergeben).
   Ein „aber“ im Sorry – und die Hitze ist wieder auf 80.
   In drei Level: 1) Fake finden (der erste Versuch der Figur enthält ein „aber“), 2) Sorry bauen (bis die Hitze
   unter 30 ist und die drei Kernteile drin sind), 3) Wieder gutmachen (was braucht die verletzte Figur wirklich?). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const START = 80;        // Hitze nach dem Streit
  const ANGENOMMEN = 30;   // darunter, ohne Fake und mit den drei Kernteilen, kommt das Sorry an
  const MAX_ZUEGE = 7;
  const PLAETZE = 5;       // so viele Bausteine passen in ein Sorry

  /* Bausteine: Jede echte Art senkt die Hitze (einmal – „Sorry, sorry, sorry“ hilft nicht mehr),
     jede Fake-Art treibt sie hoch. Ein „aber“ setzt die Hitze wieder auf 80. */
  const ARTEN = {
    tat: { echt: true, label: 'Sagen, was war', kurz: 'Sagt genau, was passiert ist.', delta: -14 },
    verantwortung: { echt: true, label: 'Dazu stehen', kurz: 'Kein Schönreden: Das war ich.', delta: -16 },
    wirkung: { echt: true, label: 'Wirkung sehen', kurz: 'Zeigt: Ich seh, was das mit dir gemacht hat.', delta: -12 },
    wieder: { echt: true, label: 'Wieder gutmachen', kurz: 'Bietet an, etwas wieder gutzumachen.', delta: -14 },
    zukunft: { echt: true, label: 'Nächstes Mal', kurz: 'Sagt, was sich ab jetzt ändert.', delta: -10 },
    aber: { echt: false, label: 'Sorry-aber', kurz: 'Das „aber“ schiebt die Schuld zurück. Hitze wieder auf 80.', delta: 0 },
    falls: { echt: false, label: 'Falls-Sorry', kurz: '„Falls“ heißt: Vielleicht war ja gar nichts.', delta: 10 },
    klein: { echt: false, label: 'Kleinreden', kurz: 'Macht das Problem klein – und die Person gleich mit.', delta: 15 },
    druck: { echt: false, label: 'Schlussstrich-Druck', kurz: 'Verlangt Verzeihen, statt es anzubieten.', delta: 12 },
    ausrede: { echt: false, label: 'Ausrede', kurz: 'Erklärt sich selbst, statt die andere Person zu sehen.', delta: 8 },
  };
  const KERN = ['tat', 'verantwortung', 'wieder'];
  const REAKT = {
    tat: 'Okay. Wenigstens sagst du, was war.',
    verantwortung: 'Hm. Das hab ich jetzt nicht erwartet.',
    wirkung: 'Ja. Genau so hat sich das angefühlt.',
    wieder: 'Und wie genau?',
    zukunft: 'Mal sehen, ob das stimmt.',
    aber: 'ABER? Echt jetzt? Dann lass es.',
    falls: 'Falls?! Es HAT mich gestört.',
    klein: 'Für dich vielleicht.',
    druck: 'Ich entscheide selbst, wann alles gut ist.',
    ausrede: 'Und ich? Geht’s jetzt nur um dich?',
  };

  /* Szenen: A entschuldigt sich bei B. teile[art] = Satz (alle ähnlich lang, damit „lang und höflich“ nichts verrät).
     start = der erste Versuch von A (immer mit „aber“). wieder = drei Wiedergutmach-Züge (einer passt zu B). */
  const SZENEN = [
    {
      id: 'story', title: 'Das Video', A: 'luca', B: 'sam',
      story: 'Luca hat ein Video gepostet, wie Sam in der Pause über die eigene Tasche stolpert. 40 Leute haben es gesehen. Sam hat es von Yara erfahren.',
      teile: {
        tat: 'Ich hab das Video von dir ohne Fragen in meine Story gestellt.',
        verantwortung: 'Das war nicht okay von mir. Da gibt’s nichts zu erklären.',
        wirkung: 'Vor 40 Leuten – das war bestimmt richtig peinlich für dich.',
        wieder: 'Ich will das wieder gutmachen. Sag mir, was du brauchst.',
        zukunft: 'Ab jetzt frag ich, bevor ich irgendwas von dir poste.',
        aber: 'Sorry, aber du hast letzte Woche auch über mein Foto gelacht.',
        falls: 'Sorry, falls dich das irgendwie gestört hat oder so.',
        klein: 'War doch nur ein Witz, morgen hat das eh jeder vergessen.',
        druck: 'Ich hab Sorry gesagt. Jetzt ist aber wieder alles gut, oder?',
        ausrede: 'Ich hab gar nicht nachgedacht, ich war so müde gestern.',
      },
      start: ['tat', 'aber'],
      braucht: 'Sam braucht, dass das Video überall weg ist – und dass die anderen hören: Das war nicht okay.',
      wieder: [
        { k: 'passt', t: 'Luca löscht das Video, fragt, wer es gespeichert hat, und schreibt in die Story: „Das war nicht okay von mir.“', fb: 'Genau das. Jetzt hört es auf – und alle wissen, dass es nicht okay war.' },
        { k: 'nett', t: 'Luca kauft Sam morgen in der Pause ein Eis.', fb: 'Nett gemeint. Aber das Video ist immer noch auf 40 Handys.' },
        { k: 'daneben', t: 'Luca postet ein peinliches Video von sich selbst – dann ist es fair.', fb: 'Davon wird nichts besser. Sam will kein „fair“, Sam will, dass das Video weg ist.' },
      ],
    },
    {
      id: 'geheimnis', title: 'Das Geheimnis', A: 'yara', B: 'mika',
      story: 'Mika hat Yara erzählt, dass Mika in jemanden aus der Parallelklasse verknallt ist. Yara hat es Luca weitererzählt. Jetzt tuscheln alle.',
      teile: {
        tat: 'Ich hab Luca dein Geheimnis erzählt. Das war deins, nicht meins.',
        verantwortung: 'Das war mein Fehler. Da will ich gar nichts schönreden.',
        wirkung: 'Du hast mir vertraut, und jetzt tuscheln alle. Das tut weh.',
        wieder: 'Ich will das wieder gutmachen. Was würde dir jetzt helfen?',
        zukunft: 'Was du mir erzählst, bleibt ab jetzt bei mir. Versprochen.',
        aber: 'Sorry, aber du hättest es mir dann halt nicht erzählen dürfen.',
        falls: 'Sorry, falls das jetzt irgendwie ein Problem für dich ist.',
        klein: 'Ist doch nicht schlimm, verknallt sein ist doch voll süß.',
        druck: 'Ich hab mich entschuldigt. Mehr kann ich echt nicht machen.',
        ausrede: 'Ich dachte, Luca weiß das sowieso schon von jemand anders.',
      },
      start: ['tat', 'aber'],
      braucht: 'Mika braucht, dass das Tuscheln aufhört – und dass Mika Yara wieder etwas anvertrauen kann.',
      wieder: [
        { k: 'passt', t: 'Yara sagt Luca: „Das war nicht meins zu erzählen – bitte gib es nicht weiter.“ Und fragt Mika, ob noch was hilft.', fb: 'Das stoppt das Weitererzählen – und Mika entscheidet mit.' },
        { k: 'nett', t: 'Yara schenkt Mika ihren besten Sticker.', fb: 'Lieb gemeint. Aber das Tuscheln geht weiter.' },
        { k: 'daneben', t: 'Yara erzählt Mika dafür ein Geheimnis über Luca.', fb: 'Noch ein verratenes Geheimnis. Jetzt haben zwei Leute ein Problem.' },
      ],
    },
    {
      id: 'controller', title: 'Der Controller', A: 'sam', B: 'luca',
      story: 'Sam hat bei Luca gezockt, verloren und den Controller auf den Boden geknallt. Jetzt klemmt die A-Taste.',
      teile: {
        tat: 'Ich hab deinen Controller hingeknallt. Jetzt klemmt die Taste.',
        verantwortung: 'Das war nicht okay. Ich war sauer, aber das ist mein Ding.',
        wirkung: 'Das ist dein Controller, den du selbst bezahlt hast. Mies.',
        wieder: 'Ich will das wieder gutmachen. Was kostet die Reparatur?',
        zukunft: 'Wenn ich merk, dass ich kippe, mach ich ab jetzt Pause.',
        aber: 'Sorry, aber das Spiel war auch unfair, da wär jeder ausgerastet.',
        falls: 'Sorry, falls der jetzt wirklich kaputt sein sollte.',
        klein: 'Der war doch eh schon alt. Chill mal, ist nur ein Controller.',
        druck: 'Sorry, okay? Zocken wir jetzt weiter oder was?',
        ausrede: 'Ich bin halt so, wenn ich verliere. Kann ich nichts dafür.',
      },
      start: ['tat', 'aber'],
      braucht: 'Luca braucht einen Controller, der wieder geht – und das Gefühl, dass Sam beim nächsten Mal nicht ausrastet.',
      wieder: [
        { k: 'passt', t: 'Sam zahlt die Reparatur in drei Raten vom Taschengeld und sagt, was Sam beim nächsten Mal macht, bevor es kippt.', fb: 'Das repariert den Controller – und das Vertrauen.' },
        { k: 'nett', t: 'Sam lädt Luca auf eine Pizza ein.', fb: 'Lecker. Aber die A-Taste klemmt immer noch.' },
        { k: 'daneben', t: 'Sam schenkt Luca seinen eigenen alten Controller, der auch wackelt.', fb: 'Kaputt gegen kaputt – das ist kein Ausgleich.' },
      ],
    },
    {
      id: 'vortrag', title: 'Der Vortrag', A: 'mika', B: 'yara',
      story: 'Mika hat beim Vortrag Yaras Teil vorgestellt, als wäre er von Mika. Die Lehrerin hat Mika gelobt. Yara saß daneben.',
      teile: {
        tat: 'Ich hab deinen Teil vorgestellt, als wär er von mir.',
        verantwortung: 'Das war unfair von mir. Das Lob gehört eigentlich dir.',
        wirkung: 'Du hast lange dran gesessen, und ich hab den Applaus gekriegt.',
        wieder: 'Ich will das wieder gutmachen – und zwar heute noch.',
        zukunft: 'Nächstes Mal sagen wir vorher, wer welchen Teil vorstellt.',
        aber: 'Sorry, aber du hättest dich ja auch selbst melden können.',
        falls: 'Sorry, falls das irgendwie komisch rübergekommen ist.',
        klein: 'Ist doch nur eine Note. Ist doch egal, wer was gemacht hat.',
        druck: 'Ich hab Sorry gesagt. Kannst du jetzt aufhören, so zu gucken?',
        ausrede: 'Ich war so nervös, ich wusste gar nicht mehr, was ich sag.',
      },
      start: ['tat', 'aber'],
      braucht: 'Yara braucht, dass die Lehrerin weiß, von wem der Teil war.',
      wieder: [
        { k: 'passt', t: 'Mika geht nach der Stunde mit Yara zur Lehrerin und sagt: „Der Teil war von Yara.“', fb: 'Jetzt bekommt Yara das Lob, das Yara gehört.' },
        { k: 'nett', t: 'Mika gibt Yara die Hälfte von den Gummibärchen ab.', fb: 'Süß. Aber die Lehrerin denkt immer noch, der Teil war von Mika.' },
        { k: 'daneben', t: 'Mika sagt, Yara darf beim nächsten Mal Mikas Teil vorstellen.', fb: 'Dann ist es nur andersrum unfair. Yara will das eigene Lob.' },
      ],
    },
  ];

  const LEVELS = ['Fake finden', 'Sorry bauen', 'Wieder gutmachen'];

  // Hitze bei der verletzten Figur: aus den Bausteinen im Sorry berechnet (Wegnehmen wirkt sofort)
  function hitzeVon(teile) {
    const arten = new Set(teile.map((t) => t.art));
    let v = START;
    arten.forEach((a) => { v += ARTEN[a].delta; });
    if (arten.has('aber')) v = Math.max(v, START);
    return Math.max(0, Math.min(100, v));
  }
  const fakeDrin = (teile) => teile.some((t) => !ARTEN[t.art].echt);
  const kernFehlt = (teile) => KERN.filter((k) => !teile.some((t) => t.art === k));
  const angenommen = (teile) => !fakeDrin(teile) && !kernFehlt(teile).length && hitzeVon(teile) < ANGENOMMEN;
  const moodVon = (v, ok) => (ok ? 'froh' : v >= 70 ? 'wut' : v >= 45 ? 'genervt' : 'neutral');
  const dreh = (z, n) => (z % Math.max(1, n)) + 1;

  // Auf einen von mehreren eigenen Knöpfen warten (X/Pass → ctx.SKIP). Auto-Modus: pick() wählt.
  function waitBtns(ctx, items, pick) {
    return ctx.waitFor(new Promise((resolve) => {
      items.forEach((it) => it.el.addEventListener('click', () => { items.forEach((x) => { x.el.disabled = true; }); resolve(it.value); }));
      if (ctx.auto) setTimeout(() => { const it = items[pick()]; if (it && it.el.isConnected && !it.el.disabled) it.el.click(); }, Math.max(40, window.__crewAutoDelay || 0));
    }));
  }

  // Das Sorry als Kette von Bausteinen (offen = ohne Etikett; aufgedeckt = mit echt/fake)
  function sorryBox(ctx, A, teile, o) {
    const oo = o || {};
    const slots = [];
    teile.forEach((t, i) => {
      const art = ARTEN[t.art];
      slots.push(h('div', { class: 'sw-teil' + (oo.offen ? (art.echt ? ' echt' : ' fake') : ''), 'data-art': oo.offen ? t.art : '' },
        h('span', { class: 'sw-n' }, String(i + 1)),
        h('div', { class: 'stack', style: { gap: '2px', minWidth: 0, flex: '1' } },
          h('span', { class: 'sw-text' }, '„' + t.text + '“'),
          oo.offen ? h('span', { class: 'small sw-label' }, CREW.icon(art.echt ? 'check' : 'x', 14), (art.echt ? 'echt · ' : 'Fake · ') + art.label) : null),
        oo.weg ? oo.weg(t, i) : null));
    });
    const frei = PLAETZE - teile.length;
    if (frei > 0 && !oo.offen) slots.push(h('div', { class: 'sw-teil leer' }, h('span', { class: 'sw-n' }, '+'), h('span', { class: 'muted small' }, frei === 1 ? 'Noch 1 Platz frei' : 'Noch ' + frei + ' Plätze frei')));
    return h('div', { class: 'card stack sw-sorry' },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, oo.title || ('Das Sorry von ' + A.name)), ctx.readBtn(A.name + ' sagt: ' + (teile.map((t) => t.text).join(' ') || 'noch nichts'))),
      h('div', { class: 'stack sw-kette' }, slots));
  }

  CREW.registerGame({
    id: 'sorrywerkstatt',
    template: 'T5',
    icon: 'heart',
    themen: ['Entschuldigung', 'Rechtfertigung', 'Wiedergutmachung', 'Verantwortung'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    // für den Test: CREW.games.get('sorrywerkstatt').logik
    logik: { hitzeVon, angenommen, ARTEN, SZENEN, START, ANGENOMMEN },
    async run(ctx) {
      const szene = ctx.rpick(SZENEN);
      const A = ctx.figures[szene.A], B = ctx.figures[szene.B];
      const n = Math.max(2, ctx.n || 5);
      const block = (art) => ({ art, text: szene.teile[art] });

      await ctx.T.intro({
        rule: 'Eine Figur will sich entschuldigen. Das iPad wandert: Jede Person legt einen Baustein dazu oder nimmt einen weg. Echte Teile kühlen, Fakes heizen.',
        levels: LEVELS,
        steps: [
          { icon: 'x', title: 'Fake finden', text: 'Im ersten Versuch steckt ein „aber“. Weg damit – und sagen, warum.' },
          { icon: 'eyeOff', title: 'Sorry bauen', text: 'Nur du schaust auf drei Bausteine. Einer rein oder einer raus.' },
          { icon: 'heart', title: 'Wieder gutmachen', text: 'Was braucht die andere Figur wirklich?' },
        ],
        probe: ctx.T.probeCard('Probe: Echt oder Fake? „Sorry, falls du dich angegriffen fühlst.“ Tippt eins – zählt nicht.', [{ label: 'Echt', value: 'e', variant: 'ghost', icon: 'check' }, { label: 'Fake', value: 'f', variant: 'ghost', icon: 'x' }]),
      });

      // Die Szene: Was ist passiert? Der erste Versuch von A (mit „aber“)
      let teile = szene.start.map(block);
      const meter = ctx.meter({ value: hitzeVon(teile), label: 'Hitze bei ' + B.name });
      const w0 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: szene.A, mood: 'traurig', text: A.name + ' will sich entschuldigen.', eyebrow: 'Entschuldigt sich', size: 72 }),
          ctx.figureCard({ fig: szene.B, mood: 'wut', text: B.name + ' ist verletzt und sauer.', eyebrow: 'Ist verletzt', size: 72 })),
        ctx.say(szene.story, { eyebrow: szene.title + ' · Was passiert ist', small: true }),
        sorryBox(ctx, A, teile, { title: 'Erster Versuch von ' + A.name }),
        meter.el,
        h('p', { class: 'muted small' }, B.name + ' sagt: „' + REAKT.aber + '“ Ein „aber“ im Sorry – und die Hitze steht wieder auf ' + START + '.'),
      ], { eyebrow: szene.title, badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(w0, 'Werkstatt öffnen')) === ctx.SKIP) return { summary: 'Heute keine Werkstatt. Nächstes Mal.' };

      const raus = new Set();   // weggenommene Fakes bleiben draußen
      let seat = 1, level = 1, zuege = 0;
      let fakesRaus = 0, gesagt = 0, echtRein = 0, fakeRein = 0;
      let ok = false;
      let aufgedeckt = null;    // was beim Weitergeben aufgedeckt wird

      // Erste Person: Deckblatt. X/Pass gibt gleich weiter.
      const weiter = (text) => ctx.T.passOn({ text, label: 'Ich bin Platz ' + seat, extra: h('div', { class: 'display ss-seat-big' }, 'Platz ' + seat) });
      let passNow = (await ctx.T.cover({ who: 'Nur du schaust', eyebrow: 'Zug 1 · Platz ' + seat, hint: 'Du bekommst drei Bausteine. Leg einen dazu – oder nimm einen weg.', extra: h('span', { class: 'pill accent' }, 'Platz ' + seat) })) === ctx.SKIP;
      for (let zug = 1; zug <= MAX_ZUEGE && !ok; zug++) {
        if (passNow) {
          passNow = false;
          seat = dreh(seat, n);
          if (zug < MAX_ZUEGE) await weiter('Pass ist okay. Gib das iPad nach links an Platz ' + seat + '. Nur Platz ' + seat + ' schaut auf die Bausteine.');
          continue;
        }
        // Ab dem ersten weggenommenen Fake (spätestens ab Zug 3): Level 2
        if (level === 1 && (fakesRaus > 0 || zug >= 3)) {
          level = 2;
          await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt wird gebaut: Ein echtes Sorry braucht „Sagen, was war“, „Dazu stehen“ und „Wieder gutmachen“. Und die Hitze muss unter ' + ANGENOMMEN + '.' });
        }
        // Drei Bausteine für diese Person: mindestens ein echter und ein Fake, wenn es noch welche gibt
        const frei = Object.keys(szene.teile).filter((a) => !raus.has(a) && !teile.some((t) => t.art === a));
        const echte = ctx.rshuffle(frei.filter((a) => ARTEN[a].echt)), fakes = ctx.rshuffle(frei.filter((a) => !ARTEN[a].echt));
        const hand = ctx.rshuffle([].concat(echte.slice(0, 1), fakes.slice(0, 1), ctx.rshuffle(echte.slice(1).concat(fakes.slice(1))).slice(0, 1))).slice(0, 3).map(block);
        const voll = teile.length >= PLAETZE;

        // Arbeits-Bildschirm: Sorry (mit „Weg“), Hitze, drei Bausteine (mit „Dazu“)
        const items = [];
        const wegBtn = (t) => { const b = CREW.ui.btn('Weg', null, { small: true, variant: 'ghost', icon: 'x', id: 'sw-weg-' + t.art, aria: 'Baustein wegnehmen' }); items.push({ el: b, value: { kind: 'weg', t } }); return b; };
        const handEls = hand.map((t, i) => {
          const b = CREW.ui.btn('Dazu', null, { small: true, icon: 'plus', id: 'sw-dazu-' + i, disabled: voll });
          items.push({ el: b, value: { kind: 'dazu', t } });
          return h('div', { class: 'sw-teil hand' }, h('span', { class: 'sw-text' }, '„' + t.text + '“'), b);
        });
        const wZ = ctx.scr([
          h('div', { class: 'sw-kopf' }, ctx.avatar(szene.B, moodVon(hitzeVon(teile)), 64), h('div', { class: 'stack', style: { gap: '4px', flex: '1', minWidth: 0 } }, h('b', null, B.name + ' hört zu'), meter.el)),
          h('div', { class: 'sw-arbeit' },
          sorryBox(ctx, A, teile, { weg: wegBtn }),
          h('div', { class: 'card stack sw-hand' },
            h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, 'Deine Bausteine · nur du siehst sie'), ctx.readBtn('Deine Bausteine: ' + hand.map((t) => t.text).join(' '))),
            handEls,
            voll ? h('p', { class: 'muted small' }, 'Das Sorry ist voll. Erst einen Baustein wegnehmen.') : null)),
          level === 1
            ? h('p', { class: 'muted small' }, 'Tipp: Im ersten Versuch steckt ein Fake. Findest du ihn?')
            : h('div', { class: 'row sw-kern' }, h('span', { class: 'muted small' }, 'Ein echtes Sorry braucht:'), KERN.map((k) => h('span', { class: 'chip small' }, ARTEN[k].label))),
        ], { eyebrow: 'Zug ' + zug + ' von ' + MAX_ZUEGE + ' · Platz ' + seat, badge: ctx.stufe(level, LEVELS) });
        // Auto-Modus: meistens sinnvoll (Fake raus, echten Baustein rein), manchmal daneben
        const pick = () => {
          const r = ctx.autoRng();
          const iFakeWeg = items.findIndex((x) => x.value.kind === 'weg' && !ARTEN[x.value.t.art].echt);
          const iEchtDazu = items.findIndex((x) => x.value.kind === 'dazu' && ARTEN[x.value.t.art].echt && !x.el.disabled);
          if (iFakeWeg >= 0 && r < 0.75) return iFakeWeg;
          if (iEchtDazu >= 0 && r < 0.85) return iEchtDazu;
          const offen = items.map((x, i) => (x.el.disabled ? -1 : i)).filter((i) => i >= 0);
          return offen[Math.floor(ctx.autoRng() * offen.length)];
        };
        const wahl = await waitBtns(ctx, items, pick);
        if (wahl === ctx.SKIP) {
          seat = dreh(seat, n);
          if (zug < MAX_ZUEGE) await weiter('Pass ist okay. Gib das iPad nach links an Platz ' + seat + '. Nur Platz ' + seat + ' schaut auf die Bausteine.');
          continue;
        }
        zuege++;
        const t = wahl.t, art = ARTEN[t.art];
        const vorher = hitzeVon(teile);
        if (wahl.kind === 'dazu') {
          teile = teile.concat([t]);
          if (art.echt) echtRein++; else fakeRein++;
        } else {
          teile = teile.filter((x) => x !== t);
          if (!art.echt) { raus.add(t.art); fakesRaus++; }
        }
        const jetzt = hitzeVon(teile);
        ok = angenommen(teile);
        meter.set(jetzt);
        CREW.sound.play(jetzt < vorher ? 'good' : jetzt > vorher ? 'soft' : 'tap');

        // Reaktion der verletzten Figur – für alle sichtbar
        const fehlt = kernFehlt(teile);
        const line = ok ? 'Okay. Das kommt an. Ich nehm dein Sorry an.'
          : wahl.kind === 'dazu' ? REAKT[t.art]
            : art.echt ? 'Hm. Jetzt fehlt was.' : 'Ohne das klingt’s ehrlicher.';
        const fakeWeg = wahl.kind === 'weg' && !art.echt;
        const wR = ctx.scr([
          h('div', { class: 'ss-said sw-said', 'data-kind': wahl.kind }, CREW.icon(wahl.kind === 'dazu' ? 'plus' : 'x', 22),
            h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, wahl.kind === 'dazu' ? 'Dazugelegt' : 'Weggenommen'), h('b', null, '„' + t.text + '“'))),
          ctx.figureCard({ fig: szene.B, mood: moodVon(jetzt, ok), text: line, eyebrow: B.name + ' reagiert' }),
          meter.el,
          !ok && wahl.kind === 'dazu' && t.art === 'aber' ? h('div', { class: 'card soft sw-aber' }, h('b', null, 'Ein „aber“ im Sorry – und die Hitze ist wieder auf ' + START + '.')) : null,
          !ok && level === 2 && !fakeDrin(teile) && jetzt < ANGENOMMEN && fehlt.length ? h('p', { class: 'muted small' }, 'Die Hitze ist unten, aber ' + B.name + ' glaubt es noch nicht ganz. Es fehlt: ' + fehlt.map((k) => ARTEN[k].label).join(', ') + '.') : null,
          fakeWeg ? h('div', { class: 'card stack sw-warum' }, h('b', null, 'Du hast einen Baustein weggenommen. Sag in einem Satz, warum der nicht ins Sorry gehört.'), h('span', { class: 'muted small' }, 'Pass ist okay. Aufgedeckt wird beim Weitergeben.')) : h('p', { class: 'muted small' }, 'Zeig die Karte allen oder lies sie vor.'),
        ], { eyebrow: 'Zug ' + zug + ' · Reaktion', badge: ctx.stufe(level, LEVELS) });
        if (fakeWeg) {
          const s = await ctx.ask(wR, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'sw-warum-pass' }, { label: 'Gesagt', value: 'ok', icon: 'chat', id: 'sw-warum-ok' }]);
          if (s === 'ok') gesagt++;
        } else {
          await ctx.next(wR, ok ? 'Sorry angekommen!' : 'Allen gezeigt');
        }
        aufgedeckt = wahl.kind === 'weg' ? { t, art } : null;
        if (ok) { CREW.sound.play('great'); break; }
        if (zug < MAX_ZUEGE) {
          seat = dreh(seat, n);
          await ctx.T.passOn({
            text: 'Gib das iPad nach links an Platz ' + seat + '. Nur Platz ' + seat + ' schaut auf die Bausteine. Pass ist okay.',
            label: 'Ich bin Platz ' + seat,
            extra: h('div', { class: 'stack', style: { alignItems: 'center', gap: '8px' } },
              h('div', { class: 'display ss-seat-big' }, 'Platz ' + seat),
              aufgedeckt ? h('div', { class: 'sw-auf', 'data-echt': aufgedeckt.art.echt ? '1' : '0' }, CREW.icon(aufgedeckt.art.echt ? 'check' : 'x', 20),
                h('span', null, h('b', null, aufgedeckt.art.echt ? 'Das war echt: ' : 'Aufgedeckt – Fake: '), aufgedeckt.art.label + '. ' + aufgedeckt.art.kurz)) : null,
              h('span', { class: 'pill' }, 'Hitze ' + jetzt)),
          });
        }
      }

      // Level 3: Wieder gutmachen – was braucht B wirklich? (Perspektive)
      await ctx.T.level({ n: 3, names: LEVELS, text: ok ? 'Das Sorry ist angekommen. Ein Sorry ist ein Anfang – jetzt kommt die Tat. Was braucht ' + B.name + ' wirklich?' : 'Ein Sorry ist ein Anfang – egal, wie weit ihr gekommen seid. Was braucht ' + B.name + ' wirklich?' });
      const optionen = ctx.rshuffle(szene.wieder);
      const wW = ctx.scr([
        ctx.figureCard({ fig: szene.B, mood: moodVon(hitzeVon(teile), ok), text: 'Was würde mir jetzt wirklich helfen?', eyebrow: B.name, size: 72 }),
        ctx.say('Redet kurz: Was braucht ' + B.name + '? Dann tippt eine Person den Zug, den ' + A.name + ' macht.', { eyebrow: 'Wieder gutmachen', small: true }),
      ], { eyebrow: 'Wieder gutmachen', badge: ctx.stufe(3, LEVELS) });
      const wk = await ctx.ask(wW, optionen.map((o, i) => ({ label: o.t, value: i, variant: 'ghost', id: 'sw-wieder-' + o.k })), { autoPick: () => optionen.findIndex((o) => o.k === 'passt') });
      const wo = wk === ctx.SKIP ? null : optionen[wk];
      if (wo) {
        if (wo.k === 'passt') CREW.sound.play('great');
        const wF = ctx.scr([
          ctx.figureCard({ fig: szene.B, mood: wo.k === 'passt' ? 'froh' : 'genervt', text: wo.fb, eyebrow: wo.k === 'passt' ? 'Passt zu ' + B.name : 'Hm, hilft das ' + B.name + '?' }),
          h('div', { class: 'card stack soft' }, h('span', { class: 'eyebrow' }, 'Das braucht ' + B.name), h('p', { style: { margin: 0 } }, szene.braucht),
            wo.k === 'passt' ? null : h('p', { class: 'muted small', style: { margin: 0 } }, 'Besser: ' + szene.wieder.find((x) => x.k === 'passt').t)),
        ], { eyebrow: 'Wieder gutmachen', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wF, 'Zum Ergebnis');
      }

      // Ergebnis: das Sorry mit aufgedeckten Etiketten
      const wE = ctx.scr([
        ok ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Sorry angekommen!') : null,
        ctx.figureCard({ fig: szene.B, mood: ok ? 'froh' : moodVon(hitzeVon(teile)), text: ok ? 'Ich bin noch nicht wieder ganz okay. Aber ich glaub dir, dass du es ernst meinst.' : 'Noch nicht. Da war zu viel „aber“ und zu wenig „das war ich“.', eyebrow: B.name, size: 72 }),
        sorryBox(ctx, A, teile, { offen: true, title: 'Das Sorry – aufgedeckt' }),
        h('p', { class: 'muted small' }, 'Es geht um ' + A.name + ' und ' + B.name + ', nicht um die Person, die getippt hat.'),
      ], { eyebrow: 'Ergebnis' });
      if (ok && !ctx.fast) CREW.ui.confetti(110);
      await ctx.next(wE, 'Weiter');
      return {
        summary: ok ? 'Sorry angekommen. Ohne „aber“, mit „das war ich“ und einem Plan zum Wiedergutmachen.' : 'Noch kein Sorry, das ankommt. Ein „aber“ reicht, und alles ist wieder auf 80.',
        stats: [[fakesRaus, 'Fakes rausgeworfen'], [gesagt, 'mal gesagt, warum'], [teile.filter((x) => ARTEN[x.art].echt).length, 'echte Bausteine'], [zuege, 'Züge']].concat(wo ? [[wo.k === 'passt' ? 1 : 0, 'Wiedergutmachung passt']] : []),
        again: true,
      };
    },
  });
})();
