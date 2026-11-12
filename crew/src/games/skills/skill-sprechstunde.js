/* Spiel „Skill-Sprechstunde“ (Thema: Anspannung & Skills) · Vorlage T5 Gerät weitergeben · j1-e15
   Ein iPad wandert: eine Figur mit Anspannungszahl, Ort und Warnsignal. Wer dran ist, wählt aus fünf
   Koffer-Fächern (Körper / Sinne / Kopf / Reden / Erwachsene Person) einen Skill und sagt in einem Satz,
   warum – Satzanfänge hinter „Tipp“. Die Crew darf einmal pro Runde „Veto“ rufen (Kopf-Skill bei 80),
   dann wird gemeinsam korrigiert. Pass gibt weiter, ohne Kommentar. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const KOFFER = [
    { id: 'koerper', name: 'Körper', icon: 'bolt', bsp: 'Treppen laufen, Wand drücken, kaltes Wasser', ab: 0 },
    { id: 'sinne', name: 'Sinne', icon: 'eye', bsp: 'Eiswürfel, scharfes Bonbon, 5 Dinge sehen', ab: 0 },
    { id: 'kopf', name: 'Kopf', icon: 'sparkle', bsp: 'Gedankenstopp, „nur ein Gedanke“, rückwärts zählen', bis: 69 },
    { id: 'reden', name: 'Reden', icon: 'chat', bsp: 'jemandem sagen, was los ist', bis: 69 },
    { id: 'erwachsen', name: 'Erwachsene Person', icon: 'user', bsp: 'Lehrkraft, Eltern, 116 111', ab: 0 },
  ];
  /* Fälle mit Zahl, Ort und Ort-Tipp (was an DIESEM Ort unauffällig geht) */
  const FAELLE = [
    { fig: 'mika', mood: 'angst', zahl: 30, ort: 'Zuhause, abends', signal: 'leichtes Bauchkribbeln', text: 'Morgen Klassenfahrt. Mika freut sich, ist aber auch ein bisschen nervös.', ortTipp: 'Zuhause ist alles erlaubt: Musik, Tasche packen, jemandem erzählen.' },
    { fig: 'sam', mood: 'neutral', zahl: 25, ort: 'Wartezimmer beim Arzt', signal: 'Fuß wippt', text: 'Sam wartet auf die Impfung. Noch zwei Leute vor Sam. Ein bisschen unruhig.', ortTipp: 'Im Wartezimmer geht es leise: 5 Dinge sehen oder langsam ausatmen.' },
    { fig: 'luca', mood: 'genervt', zahl: 45, ort: 'Zuhause, am Schreibtisch', signal: 'unruhige Beine, kann nicht anfangen', text: 'Luca soll lernen. Seit zwanzig Minuten scrollt Luca stattdessen und wird immer genervter.', ortTipp: 'Am Schreibtisch: Handy in ein anderes Zimmer, kurz bewegen, dann fünf Minuten anfangen.' },
    { fig: 'yara', mood: 'traurig', zahl: 55, ort: 'Bus nach Hause', signal: 'Kloß im Hals', text: 'Yaras Team hat verloren, und ein Mitspieler hat gesagt, es wär Yaras Schuld. Yara sitzt allein im Bus.', ortTipp: 'Im Bus geht unauffällig: Musik, Fenster, Füße fest auf den Boden, später jemandem erzählen.' },
    { fig: 'yara', mood: 'angst', zahl: 65, ort: 'Vor dem Klassenraum', signal: 'Herz rast, Gedanken kreisen', text: 'Gleich Referat. Yara steht vor der Tür und denkt: „Ich vergess alles.“', ortTipp: 'Vor der Tür: Wand drücken oder Luftballon-Atem merkt niemand.' },
    { fig: 'mika', mood: 'wut', zahl: 80, ort: 'Pausenhof', signal: 'Hände zittern, Kiefer fest', text: 'Jemand hat Mikas Rucksack in die Pfütze geworfen. Mika steht davor, die Hände zittern.', ortTipp: 'Auf dem Pausenhof geht Bewegung: eine Runde laufen, Abstand nehmen, dann Aufsicht holen.' },
    { fig: 'luca', mood: 'angst', zahl: 85, ort: 'Bushaltestelle', signal: 'schneller Atem, will nur weg', text: 'An der Haltestelle wird Luca von drei Älteren umringt und ausgelacht. Der Bus kommt erst in zehn Minuten.', ortTipp: 'An der Haltestelle: zu anderen Erwachsenen stellen, Füße spüren, ausatmen – Sicherheit zuerst.' },
    { fig: 'sam', mood: 'wut', zahl: 90, ort: 'Gruppenchat', signal: 'heißes Gesicht, will zurückschreiben', text: 'Im Chat macht jemand ein Foto von Sam lächerlich. Sam tippt schon eine Antwort in Großbuchstaben.', ortTipp: 'Im Chat: Handy weglegen, kaltes Wasser, erst dann melden oder einer erwachsenen Person zeigen.' },
  ];
  const LEVELS = ['Grün', 'Gelb', 'Rot'];
  const lvl = (z) => (z >= 70 ? 3 : z >= 40 ? 2 : 1);
  const GRUENDE = [
    { k: 'zahl', t: 'Wegen der Zahl' },
    { k: 'ort', t: 'Passt zum Ort' },
    { k: 'leise', t: 'Geht unauffällig' },
    { k: 'schnell', t: 'Wirkt schnell' },
  ];
  const LEVEL_TEXT = {
    2: 'Jetzt gelb. Nach der Wahl nennt die Person einen Grund: die Zahl, der Ort – oder geht es unauffällig?',
    3: 'Jetzt rot: über 70. Hier ziehen Kopf-Skills kaum. Die Crew passt auf und darf einmal „Veto“ rufen.',
  };
  const TIPPS = ['Bei … hilft erst mal …, weil …', 'Mit Zahl … braucht die Figur zuerst …', 'Ich würde …, damit die Zahl runtergeht.'];

  function fallCard(ctx, f, i, total, meter) {
    return h('div', { class: 'stack' },
      ctx.figureCard({ fig: f.fig, mood: f.mood, text: f.text, eyebrow: 'Fall ' + (i + 1) + ' von ' + total, extra: h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill accent' }, 'Ort: ' + f.ort), h('span', { class: 'pill' }, 'Signal: ' + f.signal)) }),
      h('div', { class: 'card' }, meter.el));
  }

  CREW.registerGame({
    id: 'skill-sprechstunde',
    template: 'T5',
    icon: 'leaf',
    themen: ['Skills-Koffer', 'Ampelplan', 'Anspannung'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Das iPad wandert. Wähl für die Figur ein Koffer-Fach und sag in einem Satz, warum. Die Zahlen steigen von Grün bis Rot.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Nur du schaust', text: 'Figur, Zahl, Ort, Signal.' },
          { icon: 'leaf', title: 'Fach wählen', text: 'Körper, Sinne, Kopf, Reden, Erwachsene Person.' },
          { icon: 'undo', title: 'Weitergeben', text: 'Pass gibt weiter, ohne Kommentar.' },
        ],
        probe: ctx.T.probeCard('Probe: Zahl 20, Figur chillt auf dem Sofa. Welches Fach? Egal, tippt irgendwas.', KOFFER.slice(0, 3).map((k) => ({ label: k.name, value: k.id, variant: 'ghost', icon: k.icon }))),
      });
      // Fälle von Grün nach Rot: je Stufe mindestens einer, zusätzliche erst Gelb, dann Rot
      const rounds = Math.min(6, Math.max(3, ctx.n));
      const anzahl = { 1: 1, 2: 1, 3: 1 };
      [2, 3, 1, 2, 3].slice(0, rounds - 3).forEach((l) => { anzahl[l]++; });
      const faelle = [1, 2, 3].flatMap((l) => ctx.rshuffle(FAELLE.filter((f) => lvl(f.zahl) === l)).slice(0, anzahl[l])).sort((a, b) => a.zahl - b.zahl);
      let good = 0, vetos = 0, passed = 0, gruende = 0, lastLvl = 1;
      for (let i = 0; i < faelle.length; i++) {
        const f = faelle[i];
        const L = lvl(f.zahl);
        if (L > lastLvl) { lastLvl = L; await ctx.T.level({ n: L, names: LEVELS, text: LEVEL_TEXT[L] }); }
        const c = await ctx.T.cover({ who: 'Nur du schaust', hint: 'Person ' + (i + 1) + ' von ' + faelle.length + '. Die anderen schauen weg. Tippe, wenn du bereit bist.', eyebrow: 'Fall ' + (i + 1) });
        if (c === ctx.SKIP) { passed++; await ctx.T.passOn(); continue; }
        const meter = ctx.meter({ value: f.zahl, label: 'Anspannung' });
        let tipOpen = false;
        const tipBox = h('div', { class: 'card soft stack', style: { display: 'none' } }, TIPPS.map((t) => h('span', { class: 'chip' }, t)));
        let choice = null;
        for (let attempt = 0; attempt < 2; attempt++) {
          const wrap = ctx.scr([
            fallCard(ctx, f, i, faelle.length, meter),
            h('div', { class: 'row between' }, h('b', null, attempt ? 'Gemeinsam korrigieren: Welches Fach zuerst?' : 'Welches Fach hilft ' + CREW.games.figures[f.fig].name + ' jetzt? Sag in einem Satz, warum.'),
              CREW.ui.btn('Tipp', () => { tipOpen = !tipOpen; tipBox.style.display = tipOpen ? '' : 'none'; }, { small: true, variant: 'ghost', icon: 'help', id: 'btn-tipp' })),
            tipBox,
          ], { eyebrow: 'Fall ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
          choice = await ctx.ask(wrap, KOFFER.filter((k) => !attempt || !(k.bis != null && f.zahl > k.bis)).map((k) => ({ label: k.name, value: k.id, icon: k.icon, variant: 'ghost' })));
          if (choice === ctx.SKIP) break;
          const k = KOFFER.find((x) => x.id === choice);
          const tooHigh = k.bis != null && f.zahl > k.bis;
          if (!tooHigh) {
            good++;
            meter.set(Math.max(10, f.zahl - 30));
            if (L === 1) {
              const w2 = ctx.scr([fallCard(ctx, f, i, faelle.length, meter), ctx.say(k.name + ' bei ' + f.zahl + ': passt. Im grünen Bereich geht fast alles – auch Kopf und Reden.', { eyebrow: 'Passt', small: true })], { eyebrow: 'Fall ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
              await ctx.next(w2, 'Weitergeben');
              break;
            }
            // Ab Gelb: Grund nennen (laut sagen, dann antippen)
            const wg = ctx.scr([fallCard(ctx, f, i, faelle.length, meter), ctx.say(k.name + ' passt. Sag laut, warum – dann tipp deinen Grund an.', { eyebrow: 'Grund nennen', small: true })], { eyebrow: 'Fall ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
            const g = await ctx.ask(wg, GRUENDE.map((x) => ({ label: x.t, value: x.k, variant: 'ghost', id: 'ss-grund-' + x.k })));
            if (g !== ctx.SKIP) gruende++;
            const w2 = ctx.scr([
              fallCard(ctx, f, i, faelle.length, meter),
              ctx.say((g === ctx.SKIP ? '' : 'Guter Grund. ') + 'Ort-Tipp: ' + f.ortTipp, { eyebrow: 'Passt', small: true }),
              L === 3 ? h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Runter unter 70“')) : null,
            ], { eyebrow: 'Fall ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
            await ctx.next(w2, 'Weitergeben');
            break;
          }
          // Kopf-/Reden-Skill bei hoher Zahl: Die Crew darf einmal Veto rufen
          const w3 = ctx.scr([
            fallCard(ctx, f, i, faelle.length, meter),
            ctx.say(k.name + ' bei ' + f.zahl + '? Die Crew darf jetzt einmal „Veto“ rufen. Veto heißt: erst Körper oder Sinne, dann Kopf.', { eyebrow: 'Veto-Moment', small: true }),
          ], { eyebrow: 'Fall ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
          const v = await ctx.ask(w3, [{ label: 'Kein Veto, so lassen', value: 'ok', variant: 'ghost' }, { label: 'Veto! Gemeinsam korrigieren', value: 'veto', variant: 'teamB', icon: 'shuffle' }]);
          if (v !== 'veto') { meter.set(f.zahl + 5); const w4 = ctx.scr([fallCard(ctx, f, i, faelle.length, meter), ctx.say('Kein Veto. Bei ' + f.zahl + ' bleibt der Kopf meist noch zu. Merkt euch das für den Ampelplan.', { eyebrow: 'Ohne Veto', small: true })], { eyebrow: 'Fall ' + (i + 1) }); await ctx.next(w4, 'Weitergeben'); break; }
          vetos++;
        }
        if (i + 1 < faelle.length) await ctx.T.passOn({ direction: 'links', extra: h('span', { class: 'pill' }, 'Nächste Person: Fall ' + (i + 2)) });
      }
      return { summary: good >= faelle.length - 1 ? 'Koffer sitzt. Erst Körper, dann Kopf.' : 'Sprechstunde beendet. Die Zahl entscheidet über das Fach.', stats: [[good, 'passende Fächer'], [gruende, 'Gründe genannt'], [vetos, 'Vetos'], [passed, 'mal gepasst']] };
    },
  });
})();
