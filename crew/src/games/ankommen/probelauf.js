/* Spiel „Probelauf“ (Thema: Ankommen & Crew) · Vorlage T6 Beamer-Gruppe · j1-e01
   In drei Level:
   1) Ausprobieren: Drei harmlose Fragen am Beamer. Jede:r passt einmal, zieht einmal die X-Karte und sagt einmal
      „Stopp“. Das Spiel tut dann sichtbar NICHTS: Karte weg, kein Kommentar, kein Punkt.
   2) Stopp oder okay? Zwei Figuren-Szenen aus dem Alltag (Note zeigen, Video im Bus …). Die Crew ruft rein,
      wie die Figur Stopp sagen kann – und warum. Die Lehrkraft tippt, was die Crew sagt; die Szene zeigt die Folge.
   3) Unser Zeichen: Die Crew wählt ein Stopp-Zeichen, das ab jetzt in jedem Spiel gilt (gespeichert ohne Namen).
   Nur die Lehrkraft tippt „Weiter“ – den Stopp-Knopf darf jede:r drücken. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const LEVELS = ['Ausprobieren', 'Stopp oder okay?', 'Unser Zeichen'];

  /* Harmlose Fragen – es gibt keine falsche Antwort, und keine Antwort ist auch eine Antwort */
  const FRAGEN = [
    { icon: 'heart', text: 'Welches Essen könntest du jeden Tag essen?', fig: 'sam', bsp: 'Sam: „Nudeln mit nix. Ehrlich.“' },
    { icon: 'play', text: 'Welches Spiel hast du zuletzt gespielt – Handy, Konsole oder draußen?', fig: 'luca', bsp: 'Luca: „Fußball im Hof, bis es dunkel war.“' },
    { icon: 'sparkle', text: 'Welches Wetter magst du am liebsten?', fig: 'yara', bsp: 'Yara: „Regen, wenn ich drinnen bin.“' },
    { icon: 'star', text: 'Welche Farbe würdest du für die Wand hier wählen?', fig: 'mika', bsp: 'Mika: „Dunkelgrün. Oder schwarz.“' },
    { icon: 'sound', text: 'Welches Lied läuft bei dir gerade oft?', fig: 'sam', bsp: 'Sam: „Eins, das keiner kennt.“' },
    { icon: 'leaf', text: 'Lieber Berge oder Meer?', fig: 'luca', bsp: 'Luca: „Meer. Wegen dem Geräusch.“' },
    { icon: 'bolt', text: 'Welches Tier wärst du für einen Tag?', fig: 'yara', bsp: 'Yara: „Katze. Schlafen, wo die Sonne ist.“' },
    { icon: 'timer', text: 'Frühaufsteher oder Nachtmensch?', fig: 'mika', bsp: 'Mika: „Nacht. Morgens bin ich nicht ansprechbar.“' },
    { icon: 'phone', text: 'Welche App hast du heute als Erstes geöffnet?', fig: 'sam', bsp: 'Sam: „Die mit den Katzenvideos.“' },
  ];

  /* Drei Dinge, die jede:r heute einmal ausprobiert – ohne Zählen, ohne Namen */
  const AUFGABEN = [
    { icon: 'x', title: 'Einmal Pass', text: 'Der Pass-Knopf auf der Karte. Die Frage geht ohne dich weiter.' },
    { icon: 'shield', title: 'Einmal X-Karte', text: 'Das X oben rechts. Die Karte ist weg. Kein Grund nötig.' },
    { icon: 'pause', title: 'Einmal „Stopp“', text: 'Laut sagen oder den roten Knopf drücken. Alles hält an.' },
  ];

  /* Level 2: Alltagsszenen, in denen eine Figur etwas NICHT will. Vier Wege – keiner ist „falsch“, aber jeder hat eine Folge.
     satz = so klingt der Weg für diese Figur, folge = was danach passiert */
  const SZENEN = [
    { id: 'note', fig: 'sam', mood: 'angst', ort: 'Pause, Schulhof', text: 'Luca ruft vor allen: „Sam, was hattest du in Mathe? Zeig mal!“ Sam will die Note nicht zeigen.', gegen: 'luca',
      wege: { stopp: { satz: '„Stopp. Die zeig ich nicht.“', folge: 'Luca: „Okay, okay.“ Das Thema ist durch.', mood: 'neutral' }, pass: { satz: '„Pass. Bleibt bei mir.“', folge: 'Luca zuckt mit den Schultern. Keiner fragt weiter.', mood: 'neutral' }, weg: { satz: 'Sam geht ohne ein Wort weg.', folge: 'Luca ruft hinterher: „Was hast du denn?“ Sam ist raus – aber Luca versteht nicht, was los war.', mood: 'genervt' }, mit: { satz: 'Sam zeigt die Note, obwohl Sam nicht will.', folge: 'Luca lacht kurz. Sam ärgert sich den Rest des Tages – über sich selbst.', mood: 'traurig' } } },
    { id: 'video', fig: 'mika', mood: 'ueberrascht', ort: 'Bus, 7:20 Uhr', text: 'Mika singt mit Kopfhörern leise mit. Yara filmt: „Das poste ich!“ Mika will das nicht.', gegen: 'yara',
      wege: { stopp: { satz: '„Stopp. Nicht posten. Lösch das bitte.“', folge: 'Yara: „Chill … okay, gelöscht.“ Mika zeigt kurz aufs Handy – weg ist es.', mood: 'neutral' }, pass: { satz: '„Pass. Ich will nicht ins Video.“', folge: 'Yara steckt das Handy weg: „War nur Spaß.“', mood: 'neutral' }, weg: { satz: 'Mika dreht sich zum Fenster und sagt nichts.', folge: 'Am Abend ist das Video in Yaras Story. Mika hat nie Nein gesagt – Yara dachte, es ist okay.', mood: 'traurig' }, mit: { satz: 'Mika lacht mit, als wäre es okay.', folge: 'Das Video hat 40 Aufrufe. Mika schaut jeden Kommentar an und fühlt sich mies.', mood: 'traurig' } } },
    { id: 'ferien', fig: 'yara', mood: 'neutral', ort: 'Kursraum, Montag', text: 'Reihum soll jede:r von den Ferien erzählen. Yara war nirgends und will nichts sagen.', gegen: 'sam',
      wege: { stopp: { satz: '„Ich sag heute nichts. Weiter.“', folge: 'Die Runde geht weiter. Keiner fragt nach.', mood: 'neutral' }, pass: { satz: '„Pass.“', folge: 'Ein Wort reicht. Die Nächste erzählt vom Freibad.', mood: 'froh' }, weg: { satz: 'Yara geht aufs Klo, bis die Runde vorbei ist.', folge: 'Es klappt – aber Yara hat fünf Minuten Herzklopfen auf dem Klo.', mood: 'angst' }, mit: { satz: 'Yara erfindet eine Reise nach Spanien.', folge: 'Sam fragt nach Fotos. Jetzt muss Yara weiter erfinden.', mood: 'angst' } } },
    { id: 'name', fig: 'luca', mood: 'genervt', ort: 'Klassenchat, abends', text: 'Im Chat nennen zwei Leute Luca zum dritten Mal „Lucky Luke“. Luca mag den Spitznamen nicht.', gegen: 'mika',
      wege: { stopp: { satz: '„Stopp mit dem Namen. Ich bin Luca.“', folge: 'Mika: „Sorry, wusste nicht, dass dich das nervt.“ Der Name ist weg.', mood: 'froh' }, pass: { satz: 'Luca schreibt: „Pass auf den Namen.“', folge: 'Einer schickt ein 👍. Der andere schreibt ihn noch einmal. Dann wird es ruhig.', mood: 'neutral' }, weg: { satz: 'Luca schaltet den Chat stumm.', folge: 'Am nächsten Tag heißt Luca immer noch „Lucky Luke“. Keiner weiß, dass es nervt.', mood: 'genervt' }, mit: { satz: 'Luca schreibt „haha“ unter den Namen.', folge: 'Jetzt denken alle, Luca findet ihn gut. Der Name bleibt.', mood: 'traurig' } } },
    { id: 'festhalten', fig: 'mika', mood: 'genervt', ort: 'Pausenhof, Fußball', text: 'Beim Kicken hält Sam Mika zum Spaß am Pulli fest. Mika lacht am Anfang, jetzt nicht mehr.', gegen: 'sam',
      wege: { stopp: { satz: '„Stopp. Lass los.“', folge: 'Sam lässt sofort los: „Sorry, dachte, das ist witzig.“', mood: 'neutral' }, pass: { satz: '„Ich bin raus.“', folge: 'Sam lässt los. Mika setzt sich an den Rand – und darf später wieder rein.', mood: 'neutral' }, weg: { satz: 'Mika reißt sich los und geht.', folge: 'Sam ist verwirrt. Der Pulli hat ein Loch. Keiner hat was gesagt.', mood: 'wut' }, mit: { satz: 'Mika lacht weiter, obwohl es wehtut.', folge: 'Sam macht weiter. Morgen auch. Für Sam ist es ja ein Spaß.', mood: 'traurig' } } },
  ];
  const WEGE = [
    { id: 'stopp', label: 'Klar Stopp sagen', icon: 'pause', variant: 'teamB' },
    { id: 'pass', label: 'Pass sagen', icon: 'x', variant: 'ghost' },
    { id: 'weg', label: 'Ohne Wort weg', icon: 'right', variant: 'ghost' },
    { id: 'mit', label: 'Mitmachen, obwohl nicht gewollt', icon: 'check', variant: 'ghost' },
  ];

  /* Level 3: ein gemeinsames Stopp-Zeichen */
  const ZEICHEN = [
    { id: 'hand', label: 'Hand flach hoch', icon: 'pause', text: 'Hand flach hochhalten – wie ein Stoppschild.' },
    { id: 'wort', label: 'Das Wort „Stopp“', icon: 'chat', text: 'Laut und kurz: „Stopp.“ Mehr nicht.' },
    { id: 'x', label: 'X mit den Armen', icon: 'x', text: 'Unterarme kreuzen, wie die X-Karte.' },
    { id: 'tisch', label: 'Zweimal auf den Tisch klopfen', icon: 'bolt', text: 'Zweimal klopfen: Alles hält kurz an.' },
  ];

  /* Die Frage-Karte: groß am Beamer, Figur zeigt ein Beispiel */
  function frageCard(ctx, f, i, total) {
    return h('div', { class: 'stack' },
      h('div', { class: 'bigcard enter' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Frage ' + (i + 1) + ' von ' + total), ctx.readBtn(f.text)),
        h('div', { class: 'row', style: { gap: '16px', alignItems: 'flex-start', flexWrap: 'nowrap' } },
          h('span', { class: 'game-ic', style: { width: '64px', height: '64px' } }, CREW.icon(f.icon, 36)),
          h('div', { class: 'say' }, f.text))),
      ctx.figureCard({ fig: f.fig, mood: 'froh', text: f.bsp, eyebrow: 'Zum Beispiel', size: 72 }),
      h('p', { class: 'muted' }, 'Reihum, wer mag: ein Satz. Oder Pass. Oder X. Oder Stopp.'));
  }

  /* Das sichtbare Nichts: Die Karte ist weg. Keine Nachfrage, kein Kommentar, kein Punkt. */
  async function nichts(ctx, art) {
    const txt = art === 'stopp' ? 'Stopp. Alles hält an.' : art === 'x' ? 'X gezogen. Karte weg.' : 'Pass. Karte weg.';
    const w = ctx.scr([
      h('div', { class: 'stack probe-nichts' },
        h('div', { class: 'stop-big display', style: { color: art === 'stopp' ? 'var(--teamB)' : 'var(--muted)' } }, art === 'stopp' ? 'Stopp!' : '…'),
        h('h2', null, txt),
        h('p', { class: 'muted' }, 'Und jetzt? Nichts. Keine Nachfrage, kein Kommentar, kein Punkt.')),
    ], { eyebrow: 'Nichts passiert', center: true, badge: ctx.stufe(1, LEVELS) });
    await ctx.hold(900);
    return ctx.next(w, 'Nächste Karte');
  }

  /* Level 2: Eine Szene. Die Crew ruft rein, die Lehrkraft tippt. Danach die Folge – und das „Warum“. */
  async function szene(ctx, s, i, total) {
    const name = ctx.figures[s.fig].name;
    const w = ctx.scr([
      ctx.figureCard({ fig: s.fig, mood: s.mood, text: s.text, eyebrow: s.ort + ' · Szene ' + (i + 1) + ' von ' + total }),
      ctx.say('Wie kann ' + name + ' hier Stopp sagen? Ruft es rein – und sagt, warum so.', { eyebrow: 'Stopp oder okay?', small: true }),
      CREW.ui.teacherLine('Tippe den Weg, den die Crew vorschlägt. Mehrere Ideen? Die erste nehmen, die anderen nach der Folge.'),
    ], { eyebrow: 'Szene ' + (i + 1), badge: ctx.stufe(2, LEVELS) });
    const r = await ctx.ask(w, WEGE.map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: x.variant, id: 'weg-' + x.id })));
    if (r === ctx.SKIP) return null;
    const weg = s.wege[r];
    const gut = r === 'stopp' || r === 'pass';
    const w2 = ctx.scr([
      h('div', { class: 'grid two' },
        ctx.figureCard({ fig: s.fig, mood: gut ? 'neutral' : s.mood, text: weg.satz, eyebrow: name + ' · ' + WEGE.find((x) => x.id === r).label }),
        ctx.figureCard({ fig: s.gegen, mood: weg.mood === 'froh' ? 'froh' : 'neutral', text: weg.folge, eyebrow: 'Was passiert' })),
      h('div', { class: 'card stack soft' },
        h('b', null, gut ? 'Klar und kurz. Kein Grund nötig.' : 'Kein „falsch“ – aber schaut, was es kostet.'),
        h('p', { class: 'muted' }, gut ? 'Stopp und Pass sind beide okay. Wenn ein Stopp nicht gehört wird: Hilfe holen.' : 'Ohne Stopp weiß die andere Person oft nicht, dass es zu viel ist. Wie hätte ' + name + ' es kurz sagen können?')),
    ], { eyebrow: 'Szene ' + (i + 1) + ' · Folge', badge: ctx.stufe(2, LEVELS) });
    await ctx.next(w2, i + 1 < total ? 'Nächste Szene' : 'Weiter');
    return r;
  }

  CREW.registerGame({
    id: 'probelauf',
    template: 'T6',
    icon: 'shield',
    themen: ['Sicherheit', 'Stopp-Recht', 'Passen', 'Regeln'],
    safety: ['freiwillig'],
    help: false,
    szenen: SZENEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Erst testet ihr Pass, X und Stopp. Dann helft ihr Figuren, Stopp zu sagen. Am Ende wählt ihr euer Stopp-Zeichen.',
        levels: LEVELS,
        steps: AUFGABEN,
        probe: async () => {
          const w = ctx.scr([
            h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            ctx.say('Probe: Tippt unten auf Pass oder oben auf das X. Schaut, was passiert.', { eyebrow: 'Zum Ausprobieren' }),
            h('p', { class: 'muted' }, 'Spoiler: nichts. Die Karte geht einfach weg.'),
          ], { eyebrow: 'Probe' });
          const r = await ctx.ask(w, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }, { label: 'Stopp!', value: 'stopp', variant: 'teamB', icon: 'pause' }]);
          await nichts(ctx, r === ctx.SKIP ? 'x' : r);
        },
      });

      /* ---- Level 1: Ausprobieren – drei harmlose Fragen ---- */
      const anzahl = 3;
      const fragen = [FRAGEN[0], FRAGEN[1], FRAGEN[2]].concat(ctx.rshuffle(FRAGEN.slice(3))).slice(0, anzahl + 1);
      let karten = 0, stopps = 0, weg = 0;
      let zusatz = false;
      for (let i = 0; i < fragen.length; i++) {
        if (i === anzahl && !zusatz) break;
        const f = fragen[i];
        const total = zusatz ? anzahl + 1 : anzahl;
        const w = ctx.scr([frageCard(ctx, f, i, total), CREW.ui.teacherLine('Nur „Weiter“ tippen. Nicht zählen, wer passt. Der Stopp-Knopf gehört allen.')], { eyebrow: 'Frage ' + (i + 1), badge: ctx.stufe(1, LEVELS) });
        const r = await ctx.ask(w, [
          { label: 'Stopp!', value: 'stopp', variant: 'teamB', icon: 'pause', id: 'btn-stopp' },
          { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'btn-pass-card' },
          { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' },
        ]);
        karten++;
        if (r === 'stopp') { stopps++; await nichts(ctx, 'stopp'); continue; }
        if (r === 'pass' || r === ctx.SKIP) { weg++; await nichts(ctx, r === 'pass' ? 'pass' : 'x'); continue; }
        // Nach der dritten Frage: Hat jede:r alles einmal ausprobiert? Sonst eine Zusatzkarte.
        if (i === anzahl - 1 && !zusatz) {
          const w2 = ctx.scr([
            ctx.say('Kurzer Check, ohne Namen: Hat jede:r heute einmal gepasst, einmal das X gezogen und einmal Stopp gesagt?', { eyebrow: 'Check', small: true }),
            h('div', { class: 'row' }, AUFGABEN.map((a) => h('span', { class: 'pill' }, CREW.icon(a.icon, 16), a.title))),
            CREW.ui.teacherLine('Nicht abfragen. Wer noch etwas ausprobieren will, bekommt eine Zusatzkarte.'),
          ], { eyebrow: 'Check', center: true, badge: ctx.stufe(1, LEVELS) });
          const z = await ctx.ask(w2, [{ label: 'Noch eine Karte', value: 'mehr', variant: 'ghost', icon: 'plus' }, { label: 'Alle haben’s probiert', value: 'ok', iconRight: 'right' }]);
          if (z === 'mehr') zusatz = true;
        }
      }

      /* ---- Level 2: Stopp oder okay? – zwei Figuren-Szenen ---- */
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt helft ihr Figuren. Sie wollen etwas nicht. Wie sagen sie Stopp – und warum so?' });
      const szenen = ctx.rshuffle(SZENEN).slice(0, 2);
      const wahl = [];
      for (let i = 0; i < szenen.length; i++) {
        const r = await szene(ctx, szenen[i], i, szenen.length);
        if (r) wahl.push(r);
      }

      /* ---- Level 3: Unser Zeichen ---- */
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Manchmal ist Reden zu viel. Wählt ein Stopp-Zeichen. Wer es zeigt, muss nichts erklären.' });
      const wz = ctx.scr([
        h('div', { class: 'opt-grid' }, ZEICHEN.map((z) => h('div', { class: 'card stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'game-ic', style: { width: '56px', height: '56px' } }, CREW.icon(z.icon, 30)), h('b', null, z.label), h('span', { class: 'muted small' }, z.text)))),
        ctx.say('Probiert alle vier kurz aus. Welches Zeichen versteht jede:r sofort?', { eyebrow: 'Unser Stopp-Zeichen', small: true }),
        CREW.ui.teacherLine('Die Crew entscheidet. Tippe das Zeichen, mit dem alle leben können.'),
      ], { eyebrow: 'Zeichen', badge: ctx.stufe(3, LEVELS) });
      const zid = await ctx.ask(wz, ZEICHEN.map((z) => ({ label: z.label, value: z.id, icon: z.icon, variant: 'ghost', id: 'zeichen-' + z.id })));
      const zeichen = ZEICHEN.find((z) => z.id === zid) || null;
      if (zeichen) {
        // Nur das Crew-Zeichen wird gespeichert (keine Namen) – es steht ab jetzt unter „Hilfe“
        try { CREW.state.stoppZeichen = zeichen.id; CREW.save(); } catch (e) { /* egal */ }
        const w3 = ctx.scr([
          h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Unser Zeichen'),
          h('div', { class: 'card stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'game-ic', style: { width: '72px', height: '72px' } }, CREW.icon(zeichen.icon, 40)), h('h2', null, zeichen.label), h('p', { class: 'muted' }, zeichen.text)),
          ctx.say('Gilt ab jetzt in jedem Spiel – genau wie Pass und X. Wer es zeigt, muss nichts erklären.', { eyebrow: 'Ab jetzt', small: true }),
        ], { eyebrow: 'Zeichen', center: true, badge: ctx.stufe(3, LEVELS) });
        CREW.sound.play('great');
        await ctx.next(w3, 'Weiter');
      }
      return {
        summary: 'Pass, X und Stopp: Es ist nichts passiert. Genau so soll es sein.',
        stats: [[karten, 'Karten'], [stopps + weg, 'mal Pass, X oder Stopp – folgenlos'], [wahl.length, 'Szenen besprochen']],
        extra: zeichen ? h('p', { class: 'muted small' }, 'Euer Stopp-Zeichen: ' + zeichen.label + '. Es steht ab jetzt auch unter „Hilfe“.') : null,
      };
    },
  });
})();
