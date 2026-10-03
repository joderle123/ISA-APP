/* Spiel „Hitze-Ecken“ (Thema: Kommunikation & Grenzen) · Vorlage T4 Bewegung im Raum · j1-e21, j1-e24
   Ein Streit-Satz einer Figur am Beamer, vier Ecken: Klartext / Angriff / Abgetaucht / Getarnter Angriff.
   Gehen, Stopp, der Beamer zeigt die Reaktion der anderen Figur und die Hitze im Raum. Zusatzzug: Steht der Satz
   in einer Angriff-Ecke, hat diese Ecke 20 Sekunden, den Satz als Klartext neu zu sagen – gelingt es, sinkt die
   Hitze für alle. Ecken werden gefragt, nicht Einzelne. Nur die Lehrkraft tippt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const ECKEN = [
    { id: 'klartext', label: 'Klartext', where: 'Ecke vorne links', kurz: 'Ich-Botschaft: Gefühl, Grund, Wunsch.' },
    { id: 'angriff', label: 'Angriff', where: 'Ecke vorne rechts', kurz: 'Du-Botschaft: Vorwurf, „immer“, „nie“.' },
    { id: 'abgetaucht', label: 'Abgetaucht', where: 'Ecke hinten links', kurz: 'Weg damit: „Egal“, Schweigen.' },
    { id: 'getarnt', label: 'Getarnter Angriff', where: 'Ecke hinten rechts', kurz: 'Klingt nett, sticht trotzdem.' },
  ];
  const BY = Object.fromEntries(ECKEN.map((e) => [e.id, e]));
  const HITZE = { klartext: -10, angriff: +15, abgetaucht: +5, getarnt: +12 };

  /* Streit-Sätze: wer sagt ihn zu wem, Situation, Ecke(n), Reaktion der anderen Figur, Klartext-Version.
     Bei zwei Ecken (types) haben beide recht – gut zum Reden. */
  const SAETZE = [
    { fig: 'mika', to: 'yara', ort: 'Yara scrollt, während Mika erzählt.', text: 'Du hörst mir nie zu!', types: ['angriff'], react: 'Doch! Du redest halt nur über dich.', mood: 'wut', klartext: 'Ich hab das Gefühl, ich komm nicht durch. Ich will, dass du kurz das Handy weglegst.' },
    { fig: 'sam', to: 'luca', ort: 'Luca will lieber mit anderen ins Kino.', text: 'Mach doch, was du willst.', types: ['getarnt'], react: 'Okay … also bist du jetzt sauer, oder?', mood: 'ueberrascht', klartext: 'Ich bin enttäuscht, weil ich mich auf den Abend gefreut hab. Nächstes Mal sag mir früher Bescheid.' },
    { fig: 'yara', to: 'sam', ort: 'Sam ist gestern nicht zum Treffen gekommen.', text: 'Ich bin enttäuscht, weil du nicht gekommen bist. Ich hätte gern eine Nachricht gehabt.', types: ['klartext'], react: 'Stimmt. Sorry. Nächstes Mal sag ich ab.', mood: 'neutral', klartext: null },
    { fig: 'luca', to: 'mika', ort: 'Mika hat Lucas Idee vor der Gruppe abgelehnt.', text: 'Ist schon okay. Egal.', types: ['abgetaucht'], react: 'Okay … (Mika merkt nicht, dass etwas ist.)', mood: 'neutral', klartext: 'Das hat mich getroffen, weil es meine Idee war. Ich hätte gern, dass du das nächste Mal erst mit mir redest.' },
    { fig: 'mika', to: 'sam', ort: 'Sam kommt zehn Minuten zu spät.', text: 'Schön, dass du auch mal pünktlich bist.', types: ['getarnt'], react: 'Was soll das jetzt heißen?', mood: 'genervt', klartext: 'Ich hab zehn Minuten in der Kälte gewartet, das nervt mich. Schreib mir, wenn du später kommst.' },
    { fig: 'yara', to: 'luca', ort: 'Luca hat den gemeinsamen Tisch vollgestellt.', text: 'Du bist so egoistisch, wie immer.', types: ['angriff'], react: 'Und du bist perfekt, oder?', mood: 'wut', klartext: 'Ich finde meine Sachen nicht, wenn alles voll ist. Lass uns den Tisch aufteilen.' },
    { fig: 'sam', to: 'yara', ort: 'Die Gruppenarbeit läuft schief.', text: 'Mir ist wichtig, dass wir das zusammen schaffen. Ich mach Teil 1, nimmst du Teil 2?', types: ['klartext'], react: 'Okay, Deal. Teil 2 ist meins.', mood: 'froh', klartext: null },
    { fig: 'luca', to: 'sam', ort: 'Sam hat Lucas Vorschlag zum dritten Mal übergangen.', text: 'Ich sag nichts mehr. Bringt eh nichts.', types: ['abgetaucht', 'getarnt'], react: 'Hä? Sag doch, was los ist.', mood: 'ueberrascht', klartext: 'Ich fühl mich übergangen, weil mein Vorschlag dreimal nicht drankam. Ich will, dass wir einmal meinen probieren.' },
    { fig: 'luca', to: 'mika', ort: 'Mika hat Luca nicht zur Party eingeladen.', text: 'Kein Stress, ich wollte eh nicht mit.', types: ['getarnt'], react: 'Ach so … okay. (Mika schaut weg.)', mood: 'neutral', klartext: 'Es hat mich verletzt, dass ich nicht eingeladen war. Ich wüsste gern, warum.' },
    { fig: 'mika', to: 'luca', ort: 'Lucas Zeug liegt überall im Zimmer.', text: 'Wenn deine Sachen hier liegen, finde ich meine nicht. Lass uns das Regal aufteilen.', types: ['klartext'], react: 'Okay. Das linke Fach ist deins.', mood: 'froh', klartext: null },
    { fig: 'sam', to: 'mika', ort: 'Mika hat ein Geheimnis von Sam weitererzählt.', text: 'Mit dir kann man echt über nichts reden.', types: ['angriff'], react: 'Dann rede halt nicht mit mir!', mood: 'wut', klartext: 'Ich bin verletzt, weil das zwischen uns bleiben sollte. Ich brauch, dass ich dir vertrauen kann.' },
    { fig: 'yara', to: 'mika', ort: 'Mika fragt, ob alles okay ist.', text: 'Alles gut. Lass mich einfach.', types: ['abgetaucht'], react: 'Okay … (Mika geht. Yara bleibt allein mit dem Ärger.)', mood: 'traurig', klartext: 'Nein, nicht alles gut. Ich brauch gerade zehn Minuten, dann erzähl ich’s dir.' },
  ];

  // Beamer-Karte: Figur, Situation, der Satz groß
  function satzKarte(ctx, s, eyebrow) {
    const f = ctx.figures[s.fig], t = ctx.figures[s.to];
    return h('div', { class: 'he-satz' },
      h('div', { class: 'he-satz-side' }, ctx.avatar(s.fig, 'genervt', 88), h('b', { class: 'fig-name' }, f.name)),
      h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, eyebrow + ' · ' + f.name + ' zu ' + t.name), ctx.readBtn(f.name + ' sagt zu ' + t.name + ': ' + s.text)),
        h('p', { class: 'muted small' }, s.ort),
        h('div', { class: 'he-text' }, '„' + s.text + '“')));
  }

  CREW.registerGame({
    id: 'hitzeecken',
    template: 'T4',
    icon: 'bolt',
    themen: ['Ich-Botschaft', 'Du-Botschaft', 'Vorwurf', 'Umformulieren'],
    safety: ['figuren', 'koerper', 'raum'],
    help: false,
    async run(ctx) {
      const POS = ECKEN.map((e) => ({ id: e.id, label: e.label, where: e.where }));
      await ctx.T.intro({
        rule: 'Eine Figur sagt einen Streit-Satz. Geh in die Ecke, die passt: Klartext, Angriff, Abgetaucht oder Getarnter Angriff. Die Ecken reden, nicht Einzelne.',
        steps: [
          { icon: 'bolt', title: 'Vier Ecken', text: ECKEN.map((e) => e.label).join(' · ') },
          { icon: 'timer', title: 'Gehen, Stopp', text: '10 Sekunden. Dann zeigt der Beamer die Reaktion.' },
          { icon: 'chat', title: 'Zusatzzug', text: 'Angriff-Ecke: 20 Sekunden für den Satz als Klartext. Klappt es, sinkt die Hitze für alle.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: satzKarte(ctx, { fig: 'sam', to: 'luca', ort: 'Luca hat Sam beim Umzug geholfen.', text: 'Danke, dass du da warst. Das hat mir viel bedeutet.' }, 'PROBE · zählt nicht'), positions: POS, seconds: 10, question: 'Probe vorbei. Klartext – oder? Kurz nicken reicht.', step: 'Probe', minorityFirst: false });
        },
      });
      // Ecken erklären (einmal, am Beamer)
      const wE = ctx.scr([
        ctx.say('So sehen die vier Ecken aus. Mitte ist erlaubt.', { eyebrow: 'Die Ecken', small: true }),
        h('div', { class: 'icon-cards' }, ECKEN.map((e) => h('div', { class: 'icon-card he-ecke', 'data-pos': e.id }, h('b', null, e.label), h('span', { class: 'muted small' }, e.where), h('span', { class: 'small' }, e.kurz)))),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      ], { eyebrow: 'Ecken' });
      if ((await ctx.next(wE, 'Los')) === ctx.SKIP) return { summary: 'Heute keine Ecken. Nächstes Mal.' };

      // Sechs Sätze, gleiche Reihenfolge auf allen Geräten (Tagescode)
      const saetze = ctx.rshuffle(SAETZE).slice(0, 6);
      const meter = ctx.meter({ value: 50, label: 'Hitze im Raum' });
      let hitze = 50, gegangen = 0, umformuliert = 0;
      for (let i = 0; i < saetze.length; i++) {
        const s = saetze[i];
        const f = ctx.figures[s.fig], t = ctx.figures[s.to];
        const r = await ctx.T.walk({
          card: satzKarte(ctx, s, 'Satz ' + (i + 1) + ' von ' + saetze.length),
          positions: POS, seconds: 10, step: 'Satz ' + (i + 1),
          question: 'Jede Ecke einen Satz: Woran habt ihr es erkannt? Welches Wort war der Hinweis?',
          nextLabel: 'Auflösen',
        });
        if (r === ctx.SKIP) continue;
        gegangen++;
        const main = s.types[0];
        hitze = Math.max(0, Math.min(100, hitze + HITZE[main]));
        meter.set(hitze);
        // Auflösung: Ecke(n), Reaktion der anderen Figur, Hitze
        const w = ctx.scr([
          h('div', { class: 'row center' }, s.types.map((ty) => h('span', { class: 'pill he-pill', 'data-pos': ty, style: { fontSize: '1.15em' } }, BY[ty].label)), s.types.length > 1 ? h('span', { class: 'muted small' }, 'Zwei Ecken haben recht.') : null),
          h('div', { class: 'grid two' },
            satzKarte(ctx, s, 'Satz ' + (i + 1)),
            ctx.figureCard({ fig: s.to, mood: s.mood, text: s.react, eyebrow: t.name + ' reagiert' })),
          meter.el,
          CREW.ui.teacherLine('Ecken fragen, nicht Einzelne. Nicht zählen, wer wo stand. Dann Weiter.'),
        ], { eyebrow: 'Satz ' + (i + 1) + ' · Auflösung' });
        const needsFix = main === 'angriff' || main === 'getarnt';
        const r2 = await ctx.next(w, needsFix ? 'Zusatzzug' : i + 1 < saetze.length ? 'Nächster Satz' : 'Fertig');
        if (r2 === ctx.SKIP || !needsFix) continue;

        // Zusatzzug: die Angriff-Ecke hat 20 Sekunden, den Satz als Klartext neu zu sagen
        const slot = h('div', { class: 'row center' });
        const w2 = ctx.scr([
          ctx.say('Ecke „' + BY[main].label + '“: Sagt ' + f.name + 's Satz als Klartext neu – Gefühl, Grund, Wunsch. 20 Sekunden. Eine Person spricht für die Ecke.', { eyebrow: 'Zusatzzug · Klartext' }),
          h('div', { class: 'he-text soft' }, '„' + s.text + '“'),
          h('div', { class: 'row between' }, h('p', { class: 'muted small' }, 'Niemand allein in der Ecke? Dann darf die ganze Crew helfen.'), slot),
          CREW.ui.teacherLine('Hat die Ecke einen Klartext-Satz gesagt? Dann „Geschafft“ tippen.'),
        ], { eyebrow: 'Satz ' + (i + 1) + ' · Zusatzzug' });
        const z = await ctx.timerOrButton(w2, 20, [{ label: 'Geschafft', value: 'ok', variant: 'good', icon: 'check', id: 'btn-fix-ok' }, { label: 'Nicht geschafft', value: 'no', variant: 'ghost', icon: 'x', id: 'btn-fix-no' }], { slot });
        const ok = z === 'ok';
        if (ok) { umformuliert++; hitze = Math.max(0, hitze - 15); meter.set(hitze); CREW.sound.play('great'); }
        const w3 = ctx.scr([
          ok ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Hitze sinkt!') : null,
          ctx.figureCard({ fig: s.fig, mood: ok ? 'froh' : 'neutral', text: s.klartext, eyebrow: ok ? 'So klingt Klartext zum Beispiel' : 'So hätte Klartext klingen können' }),
          ctx.figureCard({ fig: s.to, mood: ok ? 'froh' : 'neutral', text: ok ? 'Okay. So kann ich zuhören.' : 'Beim nächsten Satz nochmal probieren – Gefühl, Grund, Wunsch.', eyebrow: t.name }),
          meter.el,
        ], { eyebrow: 'Satz ' + (i + 1) + ' · Klartext' });
        await ctx.next(w3, i + 1 < saetze.length ? 'Nächster Satz' : 'Fertig');
      }

      return {
        summary: hitze < 50 ? 'Die Hitze ist gesunken. Klartext hat gewirkt: Gefühl, Grund, Wunsch.' : 'Angriffe treiben die Hitze hoch – auch getarnte. Klartext holt sie runter.',
        stats: [[gegangen, 'Sätze gegangen'], [umformuliert, 'mal umformuliert'], [hitze, 'Hitze am Ende']],
      };
    },
  });
})();
