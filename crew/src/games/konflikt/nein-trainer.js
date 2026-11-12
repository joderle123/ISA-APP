/* Spiel „Nein-Trainer“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T0 Solo · j1-e25, j1-e23
   Sparring-Partner fürs Stundenende oder zu Hause: Eine Figur setzt per Sprachnachricht Druck („Nur dieses eine Mal“).
   Erst der Anker (Füße fest, ausatmen), dann wählst du eine Nein-Art und sagst den Satz – im Kopf, geflüstert oder
   (nur wenn du willst) laut – und tippst „Gesagt“. Die Figur hakt zweimal nach. Dreimal beim Nein geblieben =
   „Druck beendet“ plus Anker-Tipp. Das Ausweich-Nein wirkt kurz, holt den Druck aber zurück. Nichts wird gespeichert.
   In drei Level: 1) Anker (Skill-Karte, erstes Nein), 2) Nachhaken (das zweite Nein darf kürzer sein),
   3) Dabei bleiben (Schweigen, „Dachte, du bist …“ – das dritte Nein, dann ein Wenn-dann-Plan). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const ARTEN = {
    klar: { id: 'klar', label: 'Klares Nein', icon: 'x', wirkung: -20 },
    grund: { id: 'grund', label: 'Nein mit Grund', icon: 'chat', wirkung: -18 },
    ausweich: { id: 'ausweich', label: 'Ausweich-Nein', icon: 'shuffle', wirkung: -5 },
    alternativ: { id: 'alternativ', label: 'Nein + Alternative', icon: 'sparkle', wirkung: -24 },
  };
  const ORDER = ['klar', 'grund', 'ausweich', 'alternativ'];
  const MODI = [{ id: 'kopf', label: 'Im Kopf' }, { id: 'fluestern', label: 'Flüstern' }, { id: 'laut', label: 'Laut (wenn du willst)' }];

  /* Druck-Situationen: start = erste Sprachnachricht. Pro Stufe die vier Nein-Sätze (ähnlich lang),
     nach1/nach2 = Nachhaken der Figur je nach deiner letzten Nein-Art, ende = stark | ausweich. */
  const DRUCK = [
    {
      id: 'schwaenzen', fig: 'luca', titel: 'Schwänzen', teaser: 'Luca will, dass du mit schwänzt.',
      start: 'Ey, nach der Pause hauen wir ab. Mathe ist eh langweilig. Kommst du mit?',
      nein: [
        { klar: 'Nein, ich komm nicht mit.', grund: 'Nein. Ich will keinen Ärger mit der Schule.', ausweich: 'Heute passt’s irgendwie nicht.', alternativ: 'Nein. Aber nach der Schule bin ich dabei.' },
        { klar: 'Nein. Bleibt dabei.', grund: 'Nein. Wenn’s auffällt, ruft die Schule zu Hause an.', ausweich: 'Vielleicht. Mal sehen.', alternativ: 'Nein. Um vier im Park – da bin ich.' },
        { klar: 'Nein.', grund: 'Nein. Das hat mit Streber nichts zu tun.', ausweich: 'Ich muss los, bis später.', alternativ: 'Nein. Park um vier, ich bring den Ball.' },
      ],
      nach1: { klar: 'Komm schon, nur dieses eine Mal. Merkt doch keiner.', grund: 'Ärger? Die checken das nie. Nur dieses eine Mal.', ausweich: '„Irgendwie nicht“ heißt ja. Komm, nur dieses eine Mal.', alternativ: 'Nach der Schule ist doch langweilig. Nur dieses eine Mal!' },
      nach2: { klar: '… … Okay. Dachte, du bist nicht so ein Streber.', grund: '… … Wow. Dachte, du bist cooler.', ausweich: 'Mal sehen? Ich wart am Tor auf dich. 😏', alternativ: '… Park ist für Babys. Letzte Chance: Kommst du mit?' },
      ende: { stark: 'Okay, okay. Bis um vier dann.', ausweich: 'Na gut … ich frag dich morgen nochmal.' },
    },
    {
      id: 'passwort', fig: 'sam', titel: 'Das Passwort', teaser: 'Sam will dein Passwort vom Game.',
      start: 'Gib mir mal dein Passwort vom Game. Ich zock dir heute Nacht dein Level hoch, versprochen.',
      nein: [
        { klar: 'Nein, mein Passwort geb ich nicht raus.', grund: 'Nein. Passwörter geb ich niemandem, auch Freunden nicht.', ausweich: 'Weiß ich grad nicht auswendig.', alternativ: 'Nein. Aber wir können morgen zusammen zocken.' },
        { klar: 'Nein. Hat mit Vertrauen nichts zu tun.', grund: 'Nein. Wenn was passiert, ist mein Account weg.', ausweich: 'Ich schau später mal.', alternativ: 'Nein. Ich zock das Event selbst – hilf mir per Call.' },
        { klar: 'Nein. Bleibt so.', grund: 'Nein. Mein Account, meine Regel.', ausweich: 'Mein Akku ist gleich leer.', alternativ: 'Nein. 20 Uhr Call, wir machen das Event zusammen.' },
      ],
      nach1: { klar: 'Vertraust du mir etwa nicht? Nur dieses eine Mal.', grund: 'Auch Freunden nicht? Ich dachte, wir sind Freunde.', ausweich: 'Dann schau halt nach. Ich warte. 😏', alternativ: 'Morgen ist zu spät, das Event endet heute.' },
      nach2: { klar: '… … Echt jetzt? Alle anderen machen das.', grund: '… Als ob ich deinen Account klaue. 🙄', ausweich: 'Später ist zu spät. Schick’s jetzt.', alternativ: '… Per Call ist voll umständlich. Schick einfach.' },
      ende: { stark: 'Okay, okay. 20 Uhr Call.', ausweich: 'Dann lad halt auf. Ich frag gleich nochmal.' },
    },
    {
      id: 'mutprobe', fig: 'mika', titel: 'Die Mutprobe', teaser: 'Mika will eine Mutprobe am Kiosk.',
      start: 'Mutprobe! Steck am Kiosk einen Kaugummi ein, ohne zu zahlen. Alle haben’s schon gemacht.',
      nein: [
        { klar: 'Nein, das mach ich nicht.', grund: 'Nein. Das ist Klauen, da hab ich keinen Bock drauf.', ausweich: 'Hab grad keine Zeit.', alternativ: 'Nein. Aber ich mach eine andere Mutprobe.' },
        { klar: 'Nein. Auch nicht ein Kaugummi.', grund: 'Nein. Wenn ich erwischt werde, darf ich da nie wieder hin.', ausweich: 'Vielleicht morgen.', alternativ: 'Nein. Ich spring dafür vom Dreier im Freibad.' },
        { klar: 'Nein. Und ich bin trotzdem nicht raus.', grund: 'Nein. Feige ist was anderes.', ausweich: 'Ich muss heim.', alternativ: 'Nein. Samstag, Freibad, Dreier. Kommt mit.' },
      ],
      nach1: { klar: 'Komm, ist doch nur ein Kaugummi. Nur dieses eine Mal.', grund: 'Klauen, pff. Das ist doch kein echtes Klauen.', ausweich: 'Dauert zehn Sekunden. Zeit hast du.', alternativ: 'Andere Mutprobe ist langweilig. Kaugummi oder nix.' },
      nach2: { klar: '… … Okay. Dann bist du halt raus aus der Gruppe.', grund: '… … Feigling. 🐔', ausweich: 'Morgen? Ich erinner dich. 😏', alternativ: '… Vom Dreier springt jeder. Kaugummi oder du bist raus.' },
      ende: { stark: 'Okay … Samstag Freibad.', ausweich: 'Na gut. Morgen dann.' },
    },
    {
      id: 'handy', fig: 'yara', titel: 'Das Handy', teaser: 'Yara will durch deine Fotos scrollen.', grenze: true,
      start: 'Gib mal dein Handy, ich will die Fotos vom Ausflug sehen. Ich scroll nur kurz durch.',
      nein: [
        { klar: 'Nein, mein Handy bleibt bei mir.', grund: 'Nein. Da sind auch private Sachen drauf.', ausweich: 'Akku ist fast leer, sorry.', alternativ: 'Nein. Aber ich schick dir die Ausflug-Fotos.' },
        { klar: 'Nein. Stopp.', grund: 'Nein. Ich versteck nichts – es ist trotzdem meins.', ausweich: 'Später vielleicht.', alternativ: 'Nein. Ich schick sie dir jetzt sofort, guck.' },
        { klar: 'Nein. Frag bitte nicht nochmal.', grund: 'Nein. Mein Handy, meine Grenze.', ausweich: 'Ich muss jetzt echt los.', alternativ: 'Nein. Aber die fünf besten hast du jetzt.' },
      ],
      nach1: { klar: 'Boah, nur kurz! Ich schau auch nur die vom Ausflug.', grund: 'Private Sachen? Was versteckst du denn? 😏', ausweich: 'Für zwei Minuten reicht’s noch.', alternativ: 'Schicken dauert. Gib einfach kurz her.' },
      nach2: { klar: '… … Echt jetzt? Freunde teilen alles.', grund: '… Du bist so komisch heute.', ausweich: 'Später sagst du immer. Jetzt!', alternativ: 'Schick alle, nicht nur die vom Ausflug. 😏' },
      ende: { stark: 'Okay. Hab’s kapiert.', ausweich: 'Na gut. Nächstes Mal dann.' },
    },
  ];

  const LEVELS = ['Anker', 'Nachhaken', 'Dabei bleiben'];
  const TIPP = [
    'Erstes Nein: kurz und klar. Du musst nichts beweisen.',
    'Das zweite Nein darf kürzer sein als das erste. Wiederholen ist erlaubt.',
    'Schweigen und Sprüche aushalten. Du musst nichts erklären.',
  ];
  const PLAENE = [
    'Wenn jemand „Nur dieses eine Mal“ sagt, dann sage ich: „Auch nicht einmal.“',
    'Wenn ich wackle, dann stelle ich erst die Füße fest und atme aus.',
    'Wenn der Druck nicht aufhört, dann gehe ich – und rede mit jemandem, dem ich vertraue.',
    'Wenn „Dachte, du bist cool“ kommt, dann sage ich: „Bin ich. Trotzdem nein.“',
  ];

  // Sprachnachricht: Play-Knopf, Wellenform, Dauer, Abschrift (zum Mitlesen, immer sichtbar)
  function voice(ctx, fig, text) {
    const bars = h('span', { class: 'nt-wave', 'aria-hidden': 'true' }, Array.from({ length: 24 }, (_, i) => h('i', { style: { height: (25 + Math.round(70 * Math.abs(Math.sin(i * 1.7 + text.length)))) + '%' } })));
    const secs = Math.max(3, Math.round(text.length / 12));
    const el = h('div', { class: 'nt-msg' },
      ctx.avatar(fig, 'neutral', 36),
      h('div', { class: 'nt-voice' },
        h('div', { class: 'nt-voice-row' },
          CREW.ui.iconBtn('play', () => {
            el.classList.remove('playing'); void el.offsetWidth; el.classList.add('playing');
            setTimeout(() => el.classList.remove('playing'), Math.min(secs, 6) * 1000);
            if (CREW.canSpeak() && CREW.state.settings.speech) CREW.speak(ctx.figures[fig].name + ': ' + text);
          }, { label: 'Sprachnachricht abspielen', cls: 'nt-play' }),
          bars,
          h('span', { class: 'nt-dauer small' }, '0:' + String(secs).padStart(2, '0'))),
        h('span', { class: 'nt-trans' }, text)));
    return el;
  }
  const meinNein = (text, modus) => h('div', { class: 'nt-msg me' }, h('div', { class: 'bubble me' }, h('span', { class: 'bubble-who' }, 'Du · ' + modus), h('span', null, text)));

  CREW.registerGame({
    id: 'nein-trainer',
    template: 'T0',
    icon: 'shield',
    themen: ['Nein sagen', 'Nachhaken', 'Anker', 'Wenn-dann'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    druck: DRUCK, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Figur schickt Sprachnachrichten und macht Druck. Du ankerst, wählst ein Nein und sagst es – im Kopf, geflüstert oder laut. Dreimal dabei bleiben.',
        levels: LEVELS,
        steps: [
          { icon: 'leaf', title: 'Anker', text: 'Füße fest, einmal lang ausatmen.' },
          { icon: 'x', title: 'Nein sagen', text: 'Vier Arten. Sagen, dann „Gesagt“.' },
          { icon: 'shield', title: 'Dabei bleiben', text: 'Die Figur hakt zweimal nach.' },
        ],
        probe: ctx.T.probeCard('Probe: „Komm, nur einmal!“ – welches Nein lässt am wenigsten Hintertür? Tipp eins, zählt nicht.', [{ label: 'Klares Nein', value: 'k', variant: 'ghost', icon: 'x' }, { label: 'Ausweich-Nein', value: 'a', variant: 'ghost', icon: 'shuffle' }]),
      });

      // Wer macht heute Druck? (j1-e23: die Grenzen-Situation zuerst)
      const unit = (CREW.games.FILTER && CREW.games.FILTER.einheit) || '';
      const liste = unit === 'j1-e23' ? DRUCK.filter((d) => d.grenze).concat(DRUCK.filter((d) => !d.grenze)) : DRUCK.slice();
      const wS = ctx.scr([
        ctx.say('Wer macht dir heute Druck? Such dir eine Situation aus. Alles erfunden, nichts wird gespeichert.', { eyebrow: 'Sparring wählen', small: true }),
        CREW.ui.xHint('Mit dem X oben rechts kannst du jederzeit aufhören. Ohne Grund.'),
      ], { eyebrow: 'Sparring', center: true });
      const wahl = await ctx.ask(wS, liste.map((d) => ({ label: d.teaser, value: d.id, variant: 'ghost', icon: 'phone', id: 'nt-sit-' + d.id })).concat([{ label: 'Zufall', value: 'zufall', icon: 'shuffle', id: 'nt-sit-zufall' }]));
      if (wahl === ctx.SKIP) return { summary: 'Heute nur reingeschaut. Auch okay.', help: true };
      const sit = wahl === 'zufall' ? liste[Math.floor(Math.random() * liste.length)] : DRUCK.find((d) => d.id === wahl);
      const F = ctx.figures[sit.fig];

      // Level 1: Anker vor dem Nein (Skill-Karte)
      const wA = ctx.scr([
        h('div', { class: 'nt-anker' },
          h('div', { class: 'nt-anker-kreis', 'aria-hidden': 'true' }, CREW.icon('leaf', 46)),
          h('div', { class: 'stack', style: { gap: '6px' } },
            h('span', { class: 'skill-chip karte', style: { alignSelf: 'flex-start' } }, CREW.icon('star', 16), 'Skill-Karte „Anker vor dem Nein“'),
            h('b', { class: 'lead' }, 'Füße fest auf den Boden. Schultern locker. Einmal lang ausatmen.'),
            h('span', { class: 'muted small' }, 'Der Anker kommt vor dem Nein – dann wackelt es weniger.'))),
        ctx.say(F.name + ' schickt dir gleich eine Sprachnachricht. Erst der Anker, dann hörst du rein.', { eyebrow: 'Bevor es losgeht', small: true }),
      ], { eyebrow: sit.titel + ' · Anker', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(wA, 'Anker steht', { id: 'nt-anker' })) === ctx.SKIP) return { summary: 'Heute nur reingeschaut. Auch okay.', help: true };

      const chat = h('div', { class: 'nt-chat', role: 'log', 'aria-live': 'polite' });
      const kopf = h('div', { class: 'nt-kopf' }, ctx.avatar(sit.fig, 'neutral', 40), h('div', { class: 'stack', style: { gap: 0, minWidth: 0 } }, h('b', null, F.name), h('span', { class: 'muted small' }, 'Sprachnachrichten · erfunden')));
      const meter = ctx.meter({ value: 40, label: 'Druck' });
      const phone = h('div', { class: 'nt-phone' }, kopf, chat, h('div', { class: 'nt-foot' }, meter.el));
      const scrollEnd = () => requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
      let druck = 40, modus = MODI[0];
      const gewaehlt = [];
      let letzte = null;

      for (let k = 0; k < 3; k++) {
        if (k > 0) await ctx.T.level({ n: k + 1, names: LEVELS, text: k === 1 ? F.name + ' hakt nach: „Nur dieses eine Mal.“ Dein zweites Nein darf kürzer sein als das erste.' : 'Jetzt kommt Schweigen – oder ein Spruch. Dabei bleiben. Du musst nichts erklären.' });
        const msg = k === 0 ? sit.start : (k === 1 ? sit.nach1 : sit.nach2)[letzte || 'klar'];
        chat.appendChild(voice(ctx, sit.fig, msg));
        druck = Math.min(100, druck + (k === 0 ? 20 : 15) + (letzte === 'ausweich' ? 10 : 0));
        meter.set(druck);
        // Nein-Art wählen
        const wN = ctx.scr([
          phone,
          h('div', { class: 'nt-tipp' }, h('span', { class: 'pill accent' }, 'Nein ' + (k + 1) + ' von 3'), h('b', null, TIPP[k]), ctx.readBtn(TIPP[k])),
        ], { eyebrow: sit.titel + ' · ' + (k + 1) + '/3', badge: ctx.stufe(k + 1, LEVELS) });
        scrollEnd();
        const art = await ctx.ask(wN, ORDER.map((id) => ({ label: ARTEN[id].label + ' · „' + sit.nein[k][id] + '“', value: id, icon: ARTEN[id].icon, variant: 'ghost', id: 'nt-art-' + id })));
        if (art === ctx.SKIP) { gewaehlt.push(null); continue; }
        // Sagen: im Kopf, flüstern oder laut – dann „Gesagt“
        const satz = sit.nein[k][art];
        const chips = h('div', { class: 'row center', style: { gap: '8px' } }, MODI.map((m) => {
          const c = h('button', { type: 'button', class: 'chip' + (m === modus ? ' sel' : ''), 'data-modus': m.id }, m.label);
          c.addEventListener('click', () => { CREW.sound.play('tap'); modus = m; chips.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x === c)); });
          return c;
        }));
        const wG = ctx.scr([
          h('div', { class: 'nt-sag' }, h('span', { class: 'eyebrow' }, ARTEN[art].label), h('div', { class: 'nt-sag-satz display' }, '„' + satz + '“'), ctx.readBtn(satz)),
          chips,
          h('p', { class: 'muted small', style: { textAlign: 'center' } }, 'Blick hoch, Füße fest. Sag den Satz einmal ganz – wie du willst. Niemand hört mit, nichts wird aufgenommen.'),
        ], { eyebrow: 'Sag es', center: true, badge: ctx.stufe(k + 1, LEVELS) });
        const g = await ctx.next(wG, 'Gesagt', { id: 'nt-gesagt' });
        if (g === ctx.SKIP) { gewaehlt.push(null); continue; }
        gewaehlt.push(art);
        letzte = art;
        chat.appendChild(meinNein(satz, modus.label.replace(' (wenn du willst)', '')));
        druck = Math.max(0, druck + ARTEN[art].wirkung);
        meter.set(druck);
        CREW.sound.play(art === 'ausweich' ? 'soft' : 'good');
      }

      // Ende: die Figur gibt auf – oder vertagt (Ausweich-Nein holt den Druck zurück)
      const vertagt = letzte === 'ausweich';
      chat.appendChild(voice(ctx, sit.fig, vertagt ? sit.ende.ausweich : sit.ende.stark));
      const neins = gewaehlt.filter(Boolean).length;
      if (!vertagt && neins === 3) { druck = 0; meter.set(0); }
      const wE = ctx.scr([
        h('div', { class: 'dc-ende nt-ende', 'data-vertagt': vertagt ? '1' : '0' }, CREW.icon(vertagt ? 'timer' : 'shield', 40), h('h2', null, vertagt ? 'Druck vertagt – für heute.' : neins === 3 ? 'Druck beendet.' : 'Durchgehalten.')),
        phone,
        h('div', { class: 'card stack soft' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Anker-Tipp'), ctx.readBtn('Anker-Tipp: Füße fest, ausatmen, dann das Nein. Kurz und ruhig. Das zweite Nein darf kürzer sein als das erste.')),
          h('b', null, 'Füße fest, ausatmen, dann das Nein. Kurz und ruhig.'),
          h('span', { class: 'muted small' }, vertagt ? 'Das Ausweich-Nein wirkt kurz – aber es lässt eine Hintertür offen. Morgen kommt die Frage wieder.' : 'Das zweite Nein darf kürzer sein als das erste. Wiederholen ist keine Schwäche.')),
        h('div', { class: 'row center', style: { gap: '8px' } }, gewaehlt.map((a, i) => h('span', { class: 'pill' + (a && a !== 'ausweich' ? ' good' : '') }, (i + 1) + '. ' + (a ? ARTEN[a].label : 'Pass')))),
      ], { eyebrow: sit.titel + ' · Ende', badge: ctx.stufe(3, LEVELS) });
      scrollEnd();
      CREW.sound.play(vertagt ? 'soft' : 'great');
      await ctx.next(wE, 'Weiter');

      // Wenn-dann-Plan (j1-e25 Hausaufgabe): nur für den Kopf, nichts wird gespeichert
      const wP = ctx.scr([ctx.say('Welcher Wenn-dann-Satz hilft dir beim nächsten Mal? Nur für dich, nichts wird gespeichert.', { eyebrow: 'Wenn-dann', small: true })], { eyebrow: 'Wenn-dann', badge: ctx.stufe(3, LEVELS) });
      const p = await ctx.ask(wP, PLAENE.map((t, i) => ({ label: t, value: i, variant: 'ghost', id: 'nt-plan-' + i })).concat([{ label: 'Heute nicht', value: 'nein', variant: 'ghost', icon: 'x', auto: false }]));
      const plan = typeof p === 'number' ? PLAENE[p] : null;
      return {
        summary: vertagt ? 'Dreimal Nein – das letzte war ein Ausweich-Nein. Nächstes Mal: kurz und klar.' : neins === 3 ? 'Druck beendet. Dreimal beim Nein geblieben.' : 'Jedes Nein zählt – auch eins von dreien.',
        stats: [[neins, 'mal Nein gesagt'], [gewaehlt.filter((a) => a && a !== 'ausweich').length, 'Neins ohne Hintertür']],
        help: true,
        again: true,
        extra: plan ? h('p', { class: 'muted small' }, 'Dein Wenn-dann (nur im Kopf): „' + plan + '“') : null,
      };
    },
  });
})();
