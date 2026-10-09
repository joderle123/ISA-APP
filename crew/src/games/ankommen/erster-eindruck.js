/* Spiel „Erster Eindruck“ (Thema: Ankommen & Crew) · Vorlage T2 Rollen-Puzzle · j1-e05, j1-e02, j1-e26 · Top
   Nur eine Silhouette und zwei Oberflächen-Infos (Kapuze, laute Musik im Bus). Jede:r tippt heimlich zwei
   „Erster Gedanke“-Chips. Dann zeigt jedes iPad (Rolle A–D) einen anderen echten Fakt über die Figur; die Crew
   tauscht die Fakten aus und tippt gemeinsam den „Zweiten Blick“. Erste Gedanken bleiben anonym als Wolke –
   niemand muss sagen, was er zuerst dachte. Beobachter:in (X) achtet darauf, was sich verändert.
   In drei Level: 1) Erster Blick (heimlich), 2) Zweiter Blick (Fakten tauschen), 3) Nachfragen – welche Frage oder
   welcher Satz hilft der Figur? Sie antwortet; ein Urteil-Satz zeigt ruhig, was er kostet. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Erster Blick', 'Zweiter Blick', 'Nachfragen'];
  /* Erste Gedanken – bewusst gemischt: nette, neutrale und fiese, damit niemand sich schämen muss */
  const GEDANKEN = ['gefährlich', 'cool', 'will allein sein', 'unfreundlich', 'stylish', 'traurig', 'nervig', 'ängstlich', 'laut', 'neugierig', 'arrogant', 'schüchtern', 'rücksichtslos', 'müde', 'hat Stress', 'lustig'];
  /* Zweiter Blick – nach den Fakten */
  const ZWEITER = ['einsam', 'hilfsbereit', 'traurig', 'unsicher', 'mutig', 'überfordert', 'liebevoll', 'stolz', 'müde', 'hat Stress', 'neugierig', 'genervt', 'braucht Ruhe', 'braucht jemanden', 'nervös', 'frei'];

  const FAELLE = [
    { fig: 'sam', ort: 'Im Bus, morgens', infos: ['Kapuze tief im Gesicht', 'Musik so laut, dass alle sie hören'], mood: 'traurig',
      fakten: { A: 'Sams Kopfhörer sind kaputt. Das Lied ist vom Opa, der letzte Woche gestorben ist.', B: 'Die Kapuze: Sam hat sich gestern die Haare selbst geschnitten. Schief.', C: 'Sam fährt gerade ins Tierheim. Da hilft Sam jeden Samstag beim Füttern.', D: 'Sam hat die ganze Nacht nicht geschlafen, weil die kleine Schwester krank war.' },
      spricht: 'Ich hab gemerkt, dass alle geguckt haben. Ich wollte nur, dass das Lied zu Ende läuft.', frage: [{ t: '„Alles okay bei dir?“', a: 'Sam nimmt die Kopfhörer raus: „Nicht so. Mein Opa … Aber danke, dass du fragst.“' }, { t: '„Was hörst du da?“', a: 'Sam: „Ein altes Lied. Von meinem Opa.“ Sam dreht leiser.' }, { t: '„Darf ich mich hier hinsetzen?“', a: 'Sam rückt zur Seite. Zwei Haltestellen später erzählt Sam vom Tierheim.' }, { t: '„Mach mal leiser, ey!“', a: 'Sam dreht leiser und zieht die Kapuze tiefer. Den ganzen Tag sagt Sam nichts mehr.', urteil: true }] },
    { fig: 'yara', ort: 'Pausenhof, erste Woche', infos: ['Steht allein an der Wand, Handy in der Hand', 'Antwortet auf „Hi“ nur mit Nicken'], mood: 'angst',
      fakten: { A: 'Yara ist vor drei Wochen hergezogen. Alle Freunde sind 400 Kilometer weg.', B: 'Auf dem Handy: eine Sprachnachricht von der besten Freundin, zum vierten Mal angehört.', C: 'Yara versteht den Dialekt hier noch nicht gut und hat Angst, etwas Falsches zu sagen.', D: 'Zu Hause ist Yara die, die alle zum Lachen bringt. Hier hat das noch keiner gesehen.' },
      spricht: 'Ich wollte Hallo sagen. Mein Mund hat nur genickt. Peinlich.', frage: [{ t: '„Bist du neu hier?“', a: 'Yara nickt: „Seit drei Wochen. Ich versteh den Dialekt noch nicht.“' }, { t: '„Wir spielen gleich – kommst du mit?“', a: 'Yara zögert – und kommt mit. Beim Spiel lacht Yara zum ersten Mal laut.' }, { t: '„Woher kommst du?“', a: 'Yara: „Von weit weg. Meine beste Freundin ist noch da.“ Yara zeigt ein Foto.' }, { t: '(Nichts sagen – die will eh allein sein.)', a: 'Yara bleibt allein an der Wand. Am nächsten Tag auch.', urteil: true }] },
    { fig: 'luca', ort: 'Klassenraum, vor dem Test', infos: ['Lacht laut, macht Witze über den Test', 'Hat kein Heft dabei'], mood: 'genervt',
      fakten: { A: 'Luca hat gestern bis Mitternacht gelernt. Das Heft liegt zu Hause auf dem Küchentisch.', B: 'Lucas Eltern haben gesagt: Noch eine Fünf, dann kein Fußball mehr.', C: 'Die Witze macht Luca immer, wenn das Herz schnell klopft. Das weiß nur Lucas Schwester.', D: 'Luca hat Mika heute Morgen die Hausaufgaben erklärt. 20 Minuten lang.' },
      spricht: 'Wenn ich Witze mache, merkt keiner, dass ich Angst hab. Dachte ich.', frage: [{ t: '„Bist du nervös?“', a: 'Luca hört auf zu lachen: „Ja. Total. Danke, dass du fragst.“' }, { t: '„Soll ich dir ein Blatt geben?“', a: 'Luca: „Echt? Danke.“ Luca setzt sich hin, ruhiger.' }, { t: '„Wie lief das Lernen?“', a: 'Luca: „Bis Mitternacht. Und das Heft liegt zu Hause.“ Jetzt lachen beide – echt.' }, { t: '„Hör auf mit den Witzen, das nervt.“', a: 'Luca macht noch einen Witz. Lauter. Die Angst sieht keiner.', urteil: true }] },
    { fig: 'mika', ort: 'Supermarkt, Kasse', infos: ['Schiebt sich vor in der Schlange', 'Schaut niemanden an, Jacke voller Flecken'], mood: 'angst',
      fakten: { A: 'Mika hat die kleine Schwester zu Hause allein gelassen – nur fünf Minuten, Fieber-Saft holen.', B: 'Die Flecken: Mika hat heute früh im Garten der Nachbarin geholfen, für zehn Euro.', C: 'Mika zählt im Kopf das Geld nach. Es könnte knapp werden.', D: 'Mika hat sich beim Vordrängeln entschuldigt – so leise, dass keiner es gehört hat.' },
      spricht: 'Ich weiß, dass das unhöflich war. Ich hatte einfach Panik.', frage: [{ t: '„Hast du es eilig? Geh vor.“', a: 'Mika: „Danke! Meine Schwester hat Fieber.“ Zwei Minuten später ist Mika draußen.' }, { t: '„Alles in Ordnung?“', a: 'Mika: „Nicht wirklich. Ich muss schnell nach Hause.“' }, { t: '„Brauchst du Hilfe?“', a: 'Mika zählt das Geld: „Es fehlen 50 Cent.“ Die Person hilft aus.' }, { t: '„Hey, hinten anstellen!“', a: 'Mika stellt sich hinten an. Mit Herzrasen. Die Schwester wartet länger.', urteil: true }] },
    { fig: 'sam', ort: 'Gruppenchat, 23 Uhr', infos: ['Schreibt nur in Großbuchstaben', 'Hat drei Leute aus dem Chat entfernt'], mood: 'wut',
      fakten: { A: 'Vor einer Stunde wurde ein Foto von Sam im Chat geteilt. Mit Kommentar. Von einer der drei Personen.', B: 'Sam hat die Caps-Lock-Taste nicht gefunden – neues Handy, erster Abend.', C: 'Sam hat davor sieben Mal „bitte hört auf“ geschrieben. Keiner hat reagiert.', D: 'Sam ist die Person, die den Chat mal gegründet hat, damit niemand allein ist.' },
      spricht: 'Ich hab siebenmal nett gefragt. Beim achten Mal war ich laut.', frage: [{ t: '„Was ist passiert?“', a: 'Sam schickt den Screenshot vom Foto: „Das. Und keiner hat reagiert.“' }, { t: '„Soll ich mit dir zusammen was schreiben?“', a: 'Sam: „Ja, bitte. Ich weiß nicht, wie ich das sage, ohne zu schreien.“' }, { t: '„Willst du reden?“', a: 'Sam ruft an. Nach zehn Minuten ist die Wut kleiner.' }, { t: '„Chill mal, schreib nicht so in Caps.“', a: 'Sam schreibt jetzt erst recht in Caps. Der Chat explodiert.', urteil: true }] },
    { fig: 'luca', ort: 'Sporthalle, Mannschaftswahl', infos: ['Sitzt am Rand, Kapuze auf', 'Sagt „keine Lust“, als die Teams gewählt werden'], mood: 'traurig',
      fakten: { A: 'Luca wurde letztes Mal als Letzter gewählt. Jemand hat gestöhnt.', B: 'Luca spielt in einem Verein – in der Startelf. Das weiß hier niemand.', C: 'Lucas Knie ist seit zwei Wochen verletzt. Luca will nicht, dass alle fragen.', D: 'Unter der Kapuze: Luca hat geweint. Vor der Halle, kurz.' },
      spricht: '„Keine Lust“ ist leichter als „Ich hab Angst, wieder übrig zu bleiben“.', frage: [{ t: '„Willst du in mein Team?“', a: 'Luca: „Mein Knie ist kaputt. Aber ich kann pfeifen.“ Luca wird Schiri.' }, { t: '„Alles gut mit dir?“', a: 'Luca: „Knie. Und … letztes Mal hat einer gestöhnt, als ich übrig war.“' }, { t: '„Soll ich mich dazu setzen?“', a: 'Ihr sitzt zu zweit am Rand. Luca erzählt vom Verein.' }, { t: '„Dann halt nicht, Spielverderber.“', a: 'Luca zieht die Kapuze tiefer. Nächste Woche ist Luca „krank“.', urteil: true }] },
  ];

  /* Silhouette: das Porträt schwarz gefiltert, dazu zwei Oberflächen-Infos */
  function silhouette(ctx, f) {
    return h('div', { class: 'fig-card enter ee-silhouette', style: { '--fc': 'var(--muted)' } },
      h('div', { class: 'fig-side' }, ctx.avatar(f.fig, 'neutral', 110), h('b', { class: 'fig-name' }, '???')),
      h('div', { class: 'fig-body' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, f.ort), ctx.readBtn(f.ort + '. ' + f.infos.join('. '))),
        h('div', { class: 'fig-text' }, 'Eine Person. Mehr siehst du nicht.'),
        h('div', { class: 'row', style: { gap: '8px' } }, f.infos.map((x) => h('span', { class: 'pill' }, CREW.icon('eye', 16), x)))));
  }

  /* Chips wählen (höchstens zwei), Auto wählt zufällig */
  function chipPicker(ctx, words, picked, max) {
    const count = h('span', { class: 'pill' }, '0 von ' + max);
    const chips = words.map((w) => { const b = h('button', { type: 'button', class: 'chip', 'data-w': w }, w); b.addEventListener('click', () => { CREW.sound.play('tap'); const i = picked.indexOf(w); if (i >= 0) picked.splice(i, 1); else if (picked.length < max) picked.push(w); else return; b.classList.toggle('sel', picked.includes(w)); count.textContent = picked.length + ' von ' + max; }); return b; });
    if (ctx.auto) { ctx.autoRng(); chips[Math.floor(ctx.autoRng() * chips.length)].click(); chips[Math.floor(ctx.autoRng() * chips.length)].click(); }
    return { count, row: h('div', { class: 'row', style: { gap: '8px' } }, chips) };
  }

  /* Wolke: alle ersten Gedanken, zufällig groß – keiner weiß, welcher von wem */
  function wolke(ctx) {
    const ws = ctx.rshuffle(GEDANKEN);
    return h('div', { class: 'ee-cloud' }, ws.map((w, i) => h('span', { 'data-w': String(1 + ((i * 7 + 3) % 3)) }, w)));
  }

  CREW.registerGame({
    id: 'erster-eindruck',
    template: 'T2',
    icon: 'eye',
    themen: ['Vorurteile', 'Vielfalt', 'Nachfragen', 'Zweiter Blick'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Silhouette, zwei Infos: Tipp heimlich deinen ersten Gedanken. Dann tauscht ihr echte Fakten, schaut ein zweites Mal – und fragt nach.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Erster Gedanke', text: 'Heimlich, zwei Chips. Bleibt anonym.' },
          { icon: 'users', title: 'Fakten tauschen', text: 'A, B, C, D wissen je ein Ding.' },
          { icon: 'eye', title: 'Zweiter Blick', text: 'Gemeinsam neu tippen. Was hat sich verändert?' },
        ],
        probe: ctx.T.probeCard('Probe: Jemand trägt eine Sonnenbrille im Klassenraum. Erster Gedanke? Tippt – zählt nicht, und keiner sieht es.', [{ label: 'cool', value: 1, variant: 'ghost' }, { label: 'hat geweint', value: 2, variant: 'ghost' }, { label: 'Augen tun weh', value: 3, variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      const role = await ctx.T.roleSetup({
        roles: { A: { name: 'Fakt A', desc: 'Du bekommst einen echten Fakt über die Figur. Erzähl ihn, wenn alle getippt haben.' }, B: { name: 'Fakt B', desc: 'Dein Fakt ist ein anderer. Nur zusammen ergibt sich das Bild.' }, C: { name: 'Fakt C', desc: 'Du weißt etwas, das die Infos von außen erklärt.' }, D: { name: 'Fakt D', desc: 'Dein Fakt zeigt eine Seite, die niemand von außen sieht.' } },
        observer: { name: 'Beobachter:in', desc: 'Kein Fakt, dafür der Überblick: Was verändert sich in der Crew zwischen erstem und zweitem Blick?' },
      });
      const faelle = ctx.rshuffle(FAELLE).slice(0, 2);
      let veraendert = 0, gespielt = 0;
      for (let i = 0; i < faelle.length; i++) {
        const f = faelle[i];
        const fig = CREW.games.figures[f.fig];
        // 1) Erster Gedanke – heimlich
        const first = [];
        const p1 = chipPicker(ctx, GEDANKEN, first, 2);
        const w1 = ctx.scr([
          silhouette(ctx, f),
          h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Dein erster Gedanke. Ehrlich, zwei Chips. Niemand sieht es.'), p1.count), p1.row),
          ctx.safetyLine('figuren'),
        ], { eyebrow: 'Fall ' + (i + 1) + '/' + faelle.length + ' · Erster Blick', badge: h('div', { class: 'row', style: { gap: '6px' } }, ctx.stufe(1, LEVELS), h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role)) });
        const r1 = await ctx.next(w1, 'Getippt – Chips weg');
        if (r1 === ctx.SKIP) continue;
        gespielt++;
        // 2) Dein Fakt (Rolle) – oder Beobachtungsauftrag
        const fakt = role === 'X' ? null : f.fakten[role];
        const w2 = ctx.scr([
          silhouette(ctx, f),
          fakt ? h('div', { class: 'card stack ee-fact' }, h('div', { class: 'row between' }, h('b', null, 'Dein Fakt (' + role + ') – nur du kennst ihn'), ctx.readBtn('Fakt ' + role + ': ' + fakt)), h('p', { class: 'lead' }, fakt), h('p', { class: 'muted small' }, 'Erzähl ihn der Crew. Hört euch alle vier an, bevor ihr neu tippt.'))
            : h('div', { class: 'card stack ee-fact' }, h('b', null, 'Beobachter:in'), h('p', null, 'Hör dir die vier Fakten an. Achte darauf: Welcher Fakt verändert am meisten? Wer sagt zuerst „Oh“?')),
        ], { eyebrow: 'Fall ' + (i + 1) + ' · Fakten tauschen', badge: h('div', { class: 'row', style: { gap: '6px' } }, ctx.stufe(2, LEVELS), h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role)) });
        if ((await ctx.next(w2, 'Alle Fakten gehört')) === ctx.SKIP) continue;
        // 3) Zweiter Blick – gemeinsam tippen (jedes iPad für sich, gleiche Auswahl)
        const second = [];
        const p2 = chipPicker(ctx, ZWEITER, second, 2);
        const w3 = ctx.scr([
          ctx.figureCard({ fig: f.fig, mood: f.mood, text: f.spricht, eyebrow: 'Das ist ' + fig.name + '. ' + f.ort + '.' }),
          h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Zweiter Blick: Was seht ihr jetzt? Einigt euch auf zwei Chips.'), p2.count), p2.row),
        ], { eyebrow: 'Fall ' + (i + 1) + ' · Zweiter Blick', badge: ctx.stufe(2, LEVELS) });
        if ((await ctx.next(w3, 'So sehen wir ' + fig.name + ' jetzt')) === ctx.SKIP) continue;
        // 4) Wolke der ersten Gedanken (anonym) neben dem zweiten Blick + Nachfrage statt Urteil
        const changed = first.some((w) => !second.includes(w));
        if (changed) veraendert++;
        const w4 = ctx.scr([
          h('div', { class: 'grid two' },
            h('div', { class: 'card stack' }, h('b', null, 'Erste Gedanken der Crew'), wolke(ctx), h('p', { class: 'muted small' }, 'Alle ersten Gedanken sind irgendwo hier drin. Keiner weiß, welcher von wem. So soll es sein.')),
            h('div', { class: 'card stack' }, h('b', null, 'Zweiter Blick'), h('div', { class: 'row', style: { gap: '8px' } }, second.length ? second.map((w) => h('span', { class: 'chip sel' }, w)) : h('span', { class: 'muted' }, 'nichts gewählt')),
              h('p', { class: 'muted' }, 'Ein erster Gedanke ist schnell. Der zweite Blick ist eine Entscheidung.'))),
          ctx.say('Ihr steht neben ' + fig.name + '. Was sagt oder fragt ihr? Einigt euch auf eins.', { eyebrow: 'Level 3 · Nachfragen', small: true }),
        ], { eyebrow: 'Fall ' + (i + 1) + ' · Nachfragen', badge: ctx.stufe(3, LEVELS) });
        const fr = ctx.rshuffle(f.frage);
        const q = await ctx.ask(w4, fr.map((x, k) => ({ label: x.t, value: k, variant: 'ghost', id: 'ee-frage-' + k })));
        if (q !== ctx.SKIP) {
          const o = fr[q];
          const w5 = ctx.scr([
            ctx.figureCard({ fig: f.fig, mood: o.urteil ? 'traurig' : 'neutral', text: o.a, eyebrow: o.t }),
            h('div', { class: 'card stack soft' }, h('b', null, o.urteil ? 'Kein „falsch“ – aber hier hat ein Urteil entschieden, nicht eine Frage.' : 'Eine Frage statt eines Urteils. ' + fig.name + ' erzählt mehr.'), h('p', { class: 'muted small' }, o.urteil ? 'Schaut noch mal auf die Fakten: Welche Frage hätte geholfen?' : 'Fragen kostet zwei Sekunden – und ändert, was ihr von jemandem wisst.')),
            ctx.safetyLine('freiwillig'),
          ], { eyebrow: 'Fall ' + (i + 1) + ' · Antwort', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w5, i + 1 < faelle.length ? 'Nächster Fall' : 'Weiter');
        }
      }
      return { summary: gespielt ? 'Erster Gedanke, zweiter Blick: Ein Fakt reicht, und das Bild kippt.' : 'Heute nur reingeschaut.', stats: [[gespielt, 'Figuren'], [veraendert, 'mal hat sich der Blick geändert']] };
    },
  });
})();
