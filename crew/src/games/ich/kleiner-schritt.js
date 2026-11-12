/* Spiel „Kleiner Schritt“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T0 Solo · j1-e04, j1-e29
   Eine Figur hat ein zu großes Ziel („besser in Mathe“). Der Machbar-Meter steht auf Rot. Mit drei Taps
   (Wann? Wo? Wie klein?) schrumpft das Ziel; der Meter wird erst grün, wenn der Schritt winzig ist –
   dann entsteht ein Wenn-dann-Satz. Danach optional das Gleiche für dich: nur auf dem Bildschirm,
   nichts wird gespeichert, X löscht.
   In drei Level: 1) Mit Meter (Ziel 1: der Meter zeigt nach jedem Tipp, wie groß es noch ist),
   2) Selbst prüfen (Ziel 2: kein Meter – du schätzt selbst, ob der Schritt winzig ist, dann kommt die Auflösung),
   3) Für dich (freiwillig, nur auf dem Bildschirm). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Ziele: pro Frage drei Antworten mit Größe (3 = riesig, 2 = mittel, 1 = winzig). wie: der Satzteil nach „dann“. */
  const ZIELE = [
    { fig: 'mika', mood: 'traurig', ziel: 'Besser in Mathe werden.', set: 'basis',
      wann: [{ t: 'irgendwann, wenn ich Zeit hab', s: 3 }, { t: 'diese Woche mal', s: 2 }, { t: 'morgen nach dem Abendessen', s: 1 }],
      wo: [{ t: 'überall, wo ich bin', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'am Küchentisch', s: 1 }],
      wie: [{ t: 'das ganze Mathebuch durcharbeiten', s: 3 }, { t: 'eine Seite Aufgaben', s: 2 }, { t: 'eine einzige Aufgabe rechnen', s: 1 }] },
    { fig: 'yara', mood: 'angst', ziel: 'Mehr Freunde finden.', set: 'basis',
      wann: [{ t: 'wenn ich mutiger bin', s: 3 }, { t: 'nächste Woche', s: 2 }, { t: 'morgen in der großen Pause', s: 1 }],
      wo: [{ t: 'überall', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'am Kiosk auf dem Hof', s: 1 }],
      wie: [{ t: 'in einer coolen Clique sein', s: 3 }, { t: 'mit jemandem ein Gespräch führen', s: 2 }, { t: 'eine Person nach der Uhrzeit fragen', s: 1 }] },
    { fig: 'luca', mood: 'genervt', ziel: 'Weniger am Handy hängen.', set: 'basis',
      wann: [{ t: 'ab sofort immer', s: 3 }, { t: 'abends', s: 2 }, { t: 'heute beim Abendessen', s: 1 }],
      wo: [{ t: 'überall', s: 3 }, { t: 'zuhause', s: 2 }, { t: 'am Esstisch', s: 1 }],
      wie: [{ t: 'das Handy nur noch eine Stunde am Tag', s: 3 }, { t: 'eine App löschen', s: 2 }, { t: 'das Handy 20 Minuten in die Schublade legen', s: 1 }] },
    { fig: 'sam', mood: 'neutral', ziel: 'Fit werden.', set: 'basis',
      wann: [{ t: 'wenn das Wetter besser ist', s: 3 }, { t: 'am Wochenende', s: 2 }, { t: 'morgen nach der Schule', s: 1 }],
      wo: [{ t: 'im Fitnessstudio, wenn ich eins finde', s: 3 }, { t: 'draußen', s: 2 }, { t: 'auf der Treppe vor dem Haus', s: 1 }],
      wie: [{ t: 'jeden Tag eine Stunde Sport', s: 3 }, { t: 'eine halbe Stunde laufen', s: 2 }, { t: 'zweimal die Treppe hoch und runter', s: 1 }] },
    { fig: 'mika', mood: 'angst', ziel: 'Vor der Klasse reden können.', set: 'basis',
      wann: [{ t: 'wenn ich keine Angst mehr hab', s: 3 }, { t: 'bei der nächsten Präsentation', s: 2 }, { t: 'morgen in Deutsch', s: 1 }],
      wo: [{ t: 'vor der ganzen Schule', s: 3 }, { t: 'vor der Klasse', s: 2 }, { t: 'von meinem Platz aus', s: 1 }],
      wie: [{ t: 'einen Vortrag ohne Zettel halten', s: 3 }, { t: 'einmal eine Antwort geben', s: 2 }, { t: 'einmal den Finger heben', s: 1 }] },
    { fig: 'yara', mood: 'genervt', ziel: 'Mein Zimmer ordentlich halten.', set: 'basis',
      wann: [{ t: 'irgendwann am Wochenende', s: 3 }, { t: 'heute Abend', s: 2 }, { t: 'heute, direkt nach dem Essen', s: 1 }],
      wo: [{ t: 'das ganze Zimmer', s: 3 }, { t: 'der Schreibtisch', s: 2 }, { t: 'nur die Ecke neben dem Bett', s: 1 }],
      wie: [{ t: 'alles komplett aufräumen', s: 3 }, { t: 'den Schreibtisch frei machen', s: 2 }, { t: 'fünf Sachen wegräumen', s: 1 }] },
    /* Gesund-Plan (j1-e29) */
    { fig: 'luca', mood: 'traurig', ziel: 'Früher schlafen.', set: 'gesund',
      wann: [{ t: 'wenn die Serie zu Ende ist', s: 3 }, { t: 'unter der Woche', s: 2 }, { t: 'heute Abend', s: 1 }],
      wo: [{ t: 'irgendwo', s: 3 }, { t: 'im Zimmer', s: 2 }, { t: 'im Bett, Handy auf dem Schreibtisch', s: 1 }],
      wie: [{ t: 'jeden Tag um 21 Uhr schlafen', s: 3 }, { t: 'eine Stunde früher ins Bett', s: 2 }, { t: 'eine Folge weniger schauen', s: 1 }] },
    { fig: 'sam', mood: 'genervt', ziel: 'Gesünder essen.', set: 'gesund',
      wann: [{ t: 'ab nächstem Monat', s: 3 }, { t: 'diese Woche', s: 2 }, { t: 'morgen früh', s: 1 }],
      wo: [{ t: 'überall', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'zuhause in der Küche', s: 1 }],
      wie: [{ t: 'nie wieder Süßes', s: 3 }, { t: 'jeden Tag Obst', s: 2 }, { t: 'eine Banane in den Rucksack legen', s: 1 }] },
    { fig: 'yara', mood: 'neutral', ziel: 'Mehr Wasser trinken.', set: 'gesund',
      wann: [{ t: 'immer, den ganzen Tag', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'morgen in der ersten Pause', s: 1 }],
      wo: [{ t: 'überall', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'am Wasserspender neben der Aula', s: 1 }],
      wie: [{ t: 'zwei Liter am Tag', s: 3 }, { t: 'eine Flasche am Tag', s: 2 }, { t: 'ein Glas Wasser trinken', s: 1 }] },
    { fig: 'mika', mood: 'genervt', ziel: 'Weniger Energy-Drinks.', set: 'gesund',
      wann: [{ t: 'ab irgendwann', s: 3 }, { t: 'unter der Woche', s: 2 }, { t: 'morgen Vormittag', s: 1 }],
      wo: [{ t: 'überall', s: 3 }, { t: 'in der Schule', s: 2 }, { t: 'am Kiosk', s: 1 }],
      wie: [{ t: 'nie wieder Energy', s: 3 }, { t: 'nur noch einer am Tag', s: 2 }, { t: 'einmal Wasser statt Energy kaufen', s: 1 }] },
  ];
  const FRAGEN = [{ id: 'wann', q: 'Wann?', icon: 'timer' }, { id: 'wo', q: 'Wo?', icon: 'base' }, { id: 'wie', q: 'Wie klein?', icon: 'leaf' }];
  const LEVELS = ['Mit Meter', 'Selbst prüfen', 'Für dich'];

  // Größe (3–9) → Meter-Wert: 3 = winzig (grün), 9 = riesig (rot)
  const meterValue = (sum) => Math.round(10 + ((sum - 3) / 6) * 85);
  const wennDann = (a) => 'Wenn ich ' + a.wann.t + ' ' + a.wo.t + ' bin, dann: ' + a.wie.t + '.';

  /* Ziel-Karte mit Machbar-Meter und den drei Taps */
  function zielCard(ctx, z, i, total, answers, m, blind) {
    const name = CREW.games.figures[z.fig].name;
    return h('div', { class: 'stack' },
      ctx.figureCard({ fig: z.fig, mood: z.mood, text: '„' + z.ziel + '“', eyebrow: 'Ziel ' + (i + 1) + ' von ' + total + ' · ' + name + ' nimmt sich vor', speakText: name + ' nimmt sich vor: ' + z.ziel }),
      blind
        ? h('div', { class: 'card stack ks-meter ks-blind' }, h('div', { class: 'row between' }, h('b', null, 'Machbar-Meter'), h('span', { class: 'muted small' }, 'Diesmal verdeckt. Du prüfst selbst.')), h('div', { class: 'ks-blind-bar' }, CREW.icon('eyeOff', 22), h('span', null, 'kommt am Ende')))
        : h('div', { class: 'card stack ks-meter' }, h('div', { class: 'row between' }, h('b', null, 'Machbar-Meter'), h('span', { class: 'muted small' }, 'Rot = zu groß. Grün = winzig und machbar.')), m.el),
      h('div', { class: 'ks-taps' }, FRAGEN.map((f) => h('div', { class: 'ks-tap', 'data-size': answers[f.id] ? String(answers[f.id].s) : '0' }, h('span', { class: 'ks-tap-ic' }, CREW.icon(f.icon, 20)), h('b', null, f.q), h('span', { class: 'small' }, answers[f.id] ? answers[f.id].t : '– noch offen –')))));
  }

  /* Ein Ziel schrumpfen: drei Taps, danach so lange nachbessern, bis der Meter grün ist (max. 3 Nachbesserungen) */
  async function schrumpfen(ctx, z, i, total, blind) {
    const answers = {};
    const m = ctx.meter({ value: 95, label: 'Größe' });
    const lv = blind ? 2 : 1;
    let taps = 0;
    for (const f of FRAGEN) {
      const w = ctx.scr([zielCard(ctx, z, i, total, answers, m, blind), ctx.say(f.q + ' Tipp an, was das Ziel kleiner macht.', { eyebrow: 'Tap ' + (FRAGEN.indexOf(f) + 1) + ' von 3', small: true })], { eyebrow: 'Ziel ' + (i + 1) + ' · ' + f.q, badge: ctx.stufe(lv, LEVELS) });
      const r = await ctx.ask(w, ctx.rshuffle(z[f.id]).map((o) => ({ label: o.t, value: o.t, variant: 'ghost' })));
      if (r === ctx.SKIP) return null;
      answers[f.id] = z[f.id].find((o) => o.t === r);
      taps++;
      m.set(meterValue(answers.wann ? (answers.wann.s + (answers.wo ? answers.wo.s : 3) + (answers.wie ? answers.wie.s : 3)) : 9));
    }
    let sum = answers.wann.s + answers.wo.s + answers.wie.s;
    let fixes = 0;
    let selbst = null;
    if (blind) {
      // Level 2: Erst selbst einschätzen, dann zeigt der Meter die Wahrheit
      const wS = ctx.scr([zielCard(ctx, z, i, total, answers, m, true), ctx.say('Lies deine drei Taps. Ist der Schritt jetzt so winzig, dass ' + CREW.games.figures[z.fig].name + ' heute anfängt?', { eyebrow: 'Selbst prüfen', small: true })], { eyebrow: 'Ziel ' + (i + 1) + ' · Prüfen', badge: ctx.stufe(2, LEVELS) });
      selbst = await ctx.ask(wS, [{ label: 'Noch zu groß', value: 'gross', variant: 'ghost' }, { label: 'Ja, winzig', value: 'winzig', variant: 'good', icon: 'check' }]);
      const stimmt = (selbst === 'winzig') === (sum === 3);
      const wR = ctx.scr([zielCard(ctx, z, i, total, answers, m, false), ctx.say(selbst === ctx.SKIP ? 'Hier ist der Meter.' : stimmt ? 'Gut geprüft! ' + (sum === 3 ? 'Der Meter ist grün.' : 'Der Meter sagt auch: noch zu groß.') : (sum === 3 ? 'Strenger als nötig: Der Meter ist schon grün.' : 'Fast: Der Meter ist noch nicht grün. Ein Teil ist noch groß.'), { eyebrow: 'Der Meter', small: true })], { eyebrow: 'Ziel ' + (i + 1) + ' · Meter', badge: ctx.stufe(2, LEVELS) });
      if (stimmt) CREW.sound.play('good');
      await ctx.next(wR, sum === 3 ? 'Weiter' : 'Kleiner machen');
    }
    while (sum > 3 && fixes < 3) {
      // Noch nicht grün: Welcher Tap ist noch zu groß?
      const big = FRAGEN.filter((f) => answers[f.id].s > 1);
      const w = ctx.scr([zielCard(ctx, z, i, total, answers, m), ctx.say('Noch nicht grün. ' + (sum >= 7 ? 'Das ist noch ein Berg.' : 'Fast.') + ' Welcher Teil ist noch zu groß? Tipp ihn an und mach ihn kleiner.', { eyebrow: 'Noch zu groß', small: true })], { eyebrow: 'Ziel ' + (i + 1) + ' · Kleiner', badge: ctx.stufe(lv, LEVELS) });
      const which = await ctx.ask(w, big.map((f) => ({ label: f.q + ' · ' + answers[f.id].t, value: f.id, variant: 'ghost', icon: f.icon })).concat([{ label: 'So lassen', value: 'keep', variant: 'ghost', auto: false }]));
      if (which === ctx.SKIP || which === 'keep') break;
      const f = FRAGEN.find((x) => x.id === which);
      const w2 = ctx.scr([zielCard(ctx, z, i, total, answers, m), ctx.say(f.q + ' Noch kleiner.', { eyebrow: 'Nachbessern', small: true })], { eyebrow: 'Ziel ' + (i + 1) + ' · ' + f.q, badge: ctx.stufe(lv, LEVELS) });
      const r = await ctx.ask(w2, ctx.rshuffle(z[f.id].filter((o) => o.s < answers[f.id].s)).map((o) => ({ label: o.t, value: o.t, variant: 'ghost' })));
      if (r === ctx.SKIP) break;
      answers[f.id] = z[f.id].find((o) => o.t === r);
      fixes++; taps++;
      sum = answers.wann.s + answers.wo.s + answers.wie.s;
      m.set(meterValue(sum));
    }
    const green = sum === 3;
    if (green) CREW.sound.play('great');
    const satz = wennDann(answers);
    const w3 = ctx.scr([
      zielCard(ctx, z, i, total, answers, m),
      h('div', { class: 'card stack ks-satz' + (green ? ' good' : '') },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, green ? 'Grün: Wenn-dann-Satz' : 'Noch gelb: Wenn-dann-Satz, erster Versuch'), ctx.readBtn(satz)),
        h('p', { class: 'say small-say' }, satz),
        h('p', { class: 'muted small' }, green ? 'So klein, dass ' + CREW.games.figures[z.fig].name + ' heute noch anfängt. Danach kommt Schritt zwei von allein.' : 'Ein Berg bleibt liegen. Ein Krümel wird gegessen. Nächstes Mal noch kleiner.')),
    ], { eyebrow: 'Ziel ' + (i + 1) + ' · Satz', badge: ctx.stufe(lv, LEVELS) });
    await ctx.next(w3, i + 1 < total ? 'Nächstes Ziel' : 'Weiter');
    return { green, taps, selbst };
  }

  /* Optional: das Gleiche für dich. Nur auf dem Bildschirm, nichts wird gespeichert, X löscht. */
  async function fuerDich(ctx) {
    const inp = (ph, id) => h('input', { type: 'text', class: 'ks-input', placeholder: ph, maxlength: '60', autocomplete: 'off', id: id, 'aria-label': ph });
    const ziel = inp('Dein Ziel (z. B. früher schlafen)', 'ks-ziel');
    const wann = inp('Wann? (z. B. heute Abend)', 'ks-wann');
    const wo = inp('Wo? (z. B. im Zimmer)', 'ks-wo');
    const wie = inp('Wie klein? (z. B. eine Folge weniger)', 'ks-wie');
    const m = ctx.meter({ value: 95, label: 'Größe' });
    const satz = h('p', { class: 'say small-say muted' }, 'Wenn … , dann … .');
    const upd = () => {
      const filled = [wann, wo, wie].filter((x) => x.value.trim()).length;
      m.set(95 - filled * 28);
      satz.classList.toggle('muted', filled < 3);
      satz.textContent = 'Wenn ich ' + (wann.value.trim() || '…') + ' ' + (wo.value.trim() || '…') + ' bin, dann: ' + (wie.value.trim() || '…') + '.';
    };
    [ziel, wann, wo, wie].forEach((x) => x.addEventListener('input', upd));
    if (ctx.auto) { ziel.value = 'Probe'; wann.value = 'morgen'; wo.value = 'zuhause'; wie.value = 'eine Sache tun'; upd(); }
    const w = ctx.scr([
      ctx.say('Jetzt du – wenn du magst. Nur auf diesem Bildschirm. Nichts wird gespeichert. Das X oben löscht alles.', { eyebrow: 'Freiwillig', small: true }),
      h('div', { class: 'grid two' },
        h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Dein Ziel'), ziel, h('span', { class: 'eyebrow' }, 'Drei Taps'), wann, wo, wie),
        h('div', { class: 'card stack' }, m.el, h('span', { class: 'eyebrow' }, 'Dein Wenn-dann-Satz'), satz, h('p', { class: 'muted small' }, 'Der Meter wird grün, wenn alle drei Felder stehen. Ob der Schritt winzig ist, weißt nur du.'))),
      ctx.safetyLine('freiwillig'),
    ], { eyebrow: 'Für dich', badge: ctx.stufe(3, LEVELS) });
    const r = await ctx.ask(w, [{ label: 'Lieber nicht', value: 'no', variant: 'ghost', icon: 'x' }, { label: 'Satz gelesen, fertig', value: 'ok', iconRight: 'right' }]);
    // Alles vergessen: Felder leeren, bevor der Bildschirm verschwindet
    [ziel, wann, wo, wie].forEach((x) => { x.value = ''; });
    return r === 'ok';
  }

  CREW.registerGame({
    id: 'kleiner-schritt',
    template: 'T0',
    icon: 'leaf',
    themen: ['Ziele zerlegen', 'Wenn-dann-Plan', 'Kleine Schritte'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Ziel ist zu groß. Drei Taps machen es klein: Wann? Wo? Wie klein? Erst mit Meter, dann prüfst du selbst.',
        levels: LEVELS,
        steps: [
          { icon: 'star', title: 'Ziel ist rot', text: 'Zu groß, um anzufangen.' },
          { icon: 'leaf', title: 'Drei Taps', text: 'Wann, wo, wie klein.' },
          { icon: 'check', title: 'Grün + Satz', text: '„Wenn …, dann …“' },
        ],
        probe: ctx.T.probeCard('Probe: „Ich will mal aufräumen.“ Was ist kleiner? Tipp irgendwas – zählt nicht.', [{ label: 'das ganze Haus', value: 1, variant: 'ghost' }, { label: 'fünf Sachen vom Boden', value: 2, variant: 'ghost' }]),
      });
      const wu = ctx.scr([ctx.say('Welche Ziele heute?', { eyebrow: 'Ziele wählen', small: true })], { eyebrow: 'Vorbereitung', center: true });
      const set = await ctx.ask(wu, [{ label: 'Alltag & Schule (j1-e04)', value: 'basis', variant: 'ghost', icon: 'star' }, { label: 'Gesund-Plan (j1-e29)', value: 'gesund', variant: 'ghost', icon: 'leaf' }]);
      const ziele = ctx.rshuffle(ZIELE.filter((z) => z.set === (set === 'gesund' ? 'gesund' : 'basis'))).slice(0, 2);
      let green = 0, taps = 0, played = 0;
      for (let i = 0; i < ziele.length; i++) {
        if (i === 1) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt ohne Meter: Du entscheidest selbst, ob der Schritt winzig genug ist. Dann kommt die Auflösung.' });
        const r = await schrumpfen(ctx, ziele[i], i, ziele.length, i === 1);
        if (!r) continue;
        played++; taps += r.taps; if (r.green) green++;
      }
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Freiwillig: dasselbe für dich. Nur auf dem Bildschirm, nichts wird gespeichert.', label: 'Weiter' });
      const mine = await fuerDich(ctx);
      return {
        summary: played ? (green === played ? 'Alle Ziele grün. Ein Krümel heute schlägt einen Berg irgendwann.' : 'Ziele geschrumpft. Grün wird es erst, wenn der Schritt winzig ist.') : 'Heute nur reingeschaut. Auch okay.',
        stats: [[green, 'grüne Ziele'], [taps, 'Taps'], [mine ? 1 : 0, 'eigener Satz (nicht gespeichert)']],
      };
    },
  });
})();
