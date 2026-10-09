/* Spiel „Druck-Chat“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T1 Solo + Austausch · j1-e25, j1-e27
   Ein simulierter Gruppenchat im Glimmr-Look. Der Druck steigt leise („Dachte, du bist cool“, Emoji-Schweigen).
   Du steuerst Mika. An drei Stellen pro Situation wählst du Mikas Nein-Art (klar / mit Grund / Ausweich-Nein /
   Nein + Alternative) oder „Mitmachen“; der Chat hakt nach, ein zweites Nein ist nötig. Drei Situationen:
   Vape am Bahnhof, Arbeit abschreiben, jemanden im Chat auslachen. Ende: „Chat beendet, Mika bleibt Mika.“
   „Mitmachen“ wird nie rot markiert – es zeigt ruhig, was es kostet. Danach Vergleichskarte zu zweit.
   Einheit j1-e25: Wenn-dann-Plan am Ende (Nein-Trainer als Hausaufgabe). j1-e27: Reihenfolge mit dem Auslach-Chat zuerst. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const ICH = 'mika';
  const ARTEN = {
    klar: { id: 'klar', label: 'Klares Nein', icon: 'x', kurz: 'Nein.' },
    grund: { id: 'grund', label: 'Nein mit Grund', icon: 'chat', kurz: 'Nein, weil …' },
    ausweich: { id: 'ausweich', label: 'Ausweich-Nein', icon: 'shuffle', kurz: 'Heute nicht …' },
    alternativ: { id: 'alternativ', label: 'Nein + Alternative', icon: 'sparkle', kurz: 'Nein, aber …' },
    mit: { id: 'mit', label: 'Mitmachen', icon: 'check', kurz: 'Okay …' },
  };
  const ORDER = ['klar', 'grund', 'ausweich', 'alternativ', 'mit'];

  /* Eine Situation: Chat-Verlauf, drei Druck-Stellen. Pro Stelle: Nachrichten davor, die fünf Antworten von Mika,
     die Reaktion des Chats auf jede Antwort. Nach „mit“ läuft die Situation weiter – mit dem leisen Preis. */
  const SITUATIONEN = [
    {
      id: 'vape', title: 'Vape am Bahnhof', gruppe: 'bahnhof 17:00 🚉', online: 4,
      intro: [['luca', 'wer is am bahnhof?'], ['sam', 'ich. hab was dabei 🍇💨'], ['yara', 'lol was'], ['sam', 'vape, traubenzeug. wer will?']],
      stellen: [
        {
          vor: [['sam', '@mika du auch oder?']],
          antworten: { klar: 'Nein, ich vape nicht.', grund: 'Nein. Ich hab Training, ich mach kein Nikotin.', ausweich: 'Muss heute früh heim.', alternativ: 'Nee. Aber ich hol uns was zu trinken, kommt mit.', mit: 'Okay, einmal ziehen.' },
          reakt: { klar: [['sam', 'ok ok 😅 schmeckt eh nur nach gummibärchen']], grund: [['luca', 'training lol. ein zug killt dich nicht']], ausweich: [['sam', 'dann morgen? 😏']], alternativ: [['yara', 'cola ja 🙌'], ['sam', 'aber erst einen zug']], mit: [['sam', 'jaaa 🔥'], ['luca', 'wusste ich']] },
          preis: 'Mika zieht. Hustet. Die anderen lachen, freundlich. Die Jacke riecht nach Traube.',
        },
        {
          vor: [['sam', 'komm, nur dieses eine mal'], ['sam', 'dachte, du bist cool']],
          antworten: { klar: 'Nein.', grund: 'Nein. Will ich einfach nicht.', ausweich: 'Vielleicht ein andermal.', alternativ: 'Nein. Aber ich bleib hier bei euch, Cola ist in der Hand.', mit: 'Na gut, einmal.' },
          reakt: { klar: [['luca', 'ok chill']], grund: [['yara', 'respekt eigentlich']], ausweich: [['sam', 'ausreden ausreden 🙄']], alternativ: [['luca', 'ok cola geht auch']], mit: [['sam', '🔥🔥'], ['yara', 'dachte du willst nicht?']] },
          preis: 'Zweiter Zug. Es wird leichter zu sagen: ja. Und schwerer: nein.',
        },
        {
          vor: [['sam', '👀'], ['luca', '😶'], ['yara', '…'], ['sam', 'letzte chance 😂']],
          antworten: { klar: 'Nein. Ich bin raus aus dem Thema.', grund: 'Nein, mir ist das egal, was ihr denkt. Ich will’s nicht.', ausweich: 'Ich muss los, mein Bus.', alternativ: 'Nein. Samstag zocken bei mir, wer kommt?', mit: 'Okay okay, gib her.' },
          reakt: { klar: [['sam', 'ok 👍']], grund: [['luca', 'fair']], ausweich: [['sam', 'bis morgen 😏']], alternativ: [['yara', 'ich!'], ['luca', 'ich auch']], mit: [['sam', 'endlich 😂']] },
          preis: 'Mika steht am Bahnhof mit der Vape in der Hand. Morgen fragt Sam nicht mehr – es ist dann normal.',
        },
      ],
      ende: { nein: 'Der Chat wird still. Sam schreibt Yara privat. Mika hat drei Mal Nein gesagt – und ist noch Teil der Gruppe. Samstag zocken sie zusammen.', mit: 'Chat beendet. Mika war dabei. Nichts Dramatisches ist passiert. Nur: Das nächste Nein ist jetzt schwerer.' },
    },
    {
      id: 'abschreiben', title: 'Arbeit abschreiben', gruppe: 'mathe 😭', online: 5,
      intro: [['yara', 'hat jemand die mathe aufgaben?'], ['luca', 'nope'], ['sam', 'mika hat die immer'], ['luca', '@mika schick foto pls']],
      stellen: [
        {
          vor: [['luca', 'nur die 3 aufgaben. dauert 10 sek']],
          antworten: { klar: 'Nein, ich schick das nicht.', grund: 'Nein. Die Lehrkraft vergleicht die Hefte, dann haben wir beide Ärger.', ausweich: 'Hab das Heft nicht da.', alternativ: 'Nein. Aber ich erklär dir Aufgabe 3 morgen in der Pause.', mit: 'Ok, hier. (Foto)' },
          reakt: { klar: [['luca', 'wow ok']], grund: [['sam', 'die checkt das nie']], ausweich: [['luca', 'dann schreib ab, dauert 2 min']], alternativ: [['yara', 'ich komm auch']], mit: [['luca', 'legende 🙏'], ['sam', 'schick mir auch']] },
          preis: 'Das Foto ist bei Luca. Und bei Sam. Und in zwei Minuten bei sechs Leuten.',
        },
        {
          vor: [['luca', 'dachte wir sind freunde'], ['luca', 'du bist halt einfach gut in mathe, ich nicht']],
          antworten: { klar: 'Nein. Freunde hin oder her.', grund: 'Nein. Ich hab zwei Stunden daran gesessen, das geb ich nicht einfach raus.', ausweich: 'Ich schau mal später, ob ich’s finde.', alternativ: 'Nein. Aber wir machen morgen früh Aufgabe 1 zusammen, dann kannst du’s.', mit: 'Ugh, okay. (Foto)' },
          reakt: { klar: [['sam', 'streber']], grund: [['yara', 'versteh ich']], ausweich: [['luca', 'bitte bis 22 uhr']], alternativ: [['luca', 'ok 7:45 am spind?']], mit: [['luca', '❤️'], ['sam', 'haha ok ok']] },
          preis: 'Sechs Hefte, dieselben Fehler. Die Lehrkraft sieht in Aufgabe 2 sechs Mal „x = 7“.',
        },
        {
          vor: [['sam', '👀'], ['luca', '😶'], ['yara', '…'], ['sam', 'mika ist halt mika 🤷']],
          antworten: { klar: 'Nein. Bleibt dabei.', grund: 'Nein. Wenn ihr die Fehler abschreibt, lernt keiner was.', ausweich: 'Mein Akku ist fast leer, sorry.', alternativ: 'Nein. Aber: Wer Hilfe will, morgen 7:45 am Spind. Ehrlich.', mit: 'Fein. (Foto)' },
          reakt: { klar: [['luca', 'ok. bis morgen']], grund: [['yara', 'stimmt eigentlich']], ausweich: [['sam', 'klar 🙄']], alternativ: [['luca', 'bin da'], ['yara', 'ich auch']], mit: [['sam', 'war doch nicht so schwer']] },
          preis: 'Die Lehrkraft ruft am nächsten Tag sieben Namen auf. Mikas auch.',
        },
      ],
      ende: { nein: 'Morgen 7:45, drei Leute am Spind. Mika erklärt Aufgabe 3. Luca kann’s danach – und sagt: „Danke, ehrlich.“', mit: 'Chat beendet. Mika hat geholfen – auf die schnelle Art. Sieben Hefte mit demselben Fehler. Das Gespräch mit der Lehrkraft kommt.' },
    },
    {
      id: 'auslachen', title: 'Jemanden im Chat auslachen', gruppe: '7B ohne yara 🤫', online: 3,
      intro: [['sam', '(Foto: Yara beim Sport, unvorteilhaft)'], ['sam', 'yara beim weitsprung lol 🤣'], ['luca', 'haha omg'], ['luca', '😂']],
      stellen: [
        {
          vor: [['sam', '@mika komm, einen sticker. der ist zu gut']],
          antworten: { klar: 'Nein. Nicht über Yara.', grund: 'Nein. Das ist gemein, und sie wird das sehen.', ausweich: 'Hab grad kein Netz 😅', alternativ: 'Nein. Aber schickt mal das Video vom Ausflug, das war wirklich lustig.', mit: '😂😂' },
          reakt: { klar: [['sam', 'ist nur spaß']], grund: [['luca', 'sieht sie ja nicht, sie ist nicht drin']], ausweich: [['sam', 'du schreibst aber grad 🤔']], alternativ: [['luca', 'omg ja das video 😂']], mit: [['sam', 'jaaa'], ['luca', 'mika ist auch dabei 😂']] },
          preis: 'Mikas 😂 steht jetzt unter dem Foto. Für immer, als Screenshot.',
        },
        {
          vor: [['luca', 'bist du jetzt yaras anwalt?'], ['luca', 'dachte, du bist auf unserer seite']],
          antworten: { klar: 'Nein. Da gibt’s keine Seiten.', grund: 'Nein. Beim letzten Mal war’s jemand anderes. Ich mach da nicht mit.', ausweich: 'Ich bin müde, bis morgen.', alternativ: 'Nein. Aber ich mach die Gruppe für den Ausflug auf, mit allen.', mit: 'Ok ok, ist ja nur ein Bild. 😅' },
          reakt: { klar: [['sam', 'ok mimose']], grund: [['luca', '…stimmt']], ausweich: [['luca', 'läuft weg 🙄']], alternativ: [['sam', 'ja ok, mit allen']], mit: [['luca', 'siehst du']] },
          preis: 'Das Foto bekommt 14 Reaktionen. Eine davon ist Mikas.',
        },
        {
          vor: [['sam', '👀'], ['luca', '😶'], ['sam', 'ok mika ist raus aus der gruppe? 👀']],
          antworten: { klar: 'Nein. Und ich bleib in der Gruppe.', grund: 'Nein. Wenn ihr mich deshalb rauswerft, sagt das mehr über euch.', ausweich: 'Macht, was ihr wollt, ich geh schlafen.', alternativ: 'Nein. Löscht das Foto, dann ist morgen alles normal.', mit: 'Ok, ok, war lustig. 😂' },
          reakt: { klar: [['luca', 'mika hat recht']], grund: [['luca', '…']], ausweich: [['sam', 'gn8 😂']], alternativ: [['luca', 'ja löschen'], ['sam', 'ok ok']], mit: [['sam', 'na also']] },
          preis: 'Yara bekommt am nächsten Tag einen Screenshot. Mikas Name steht drin.',
        },
      ],
      ende: { nein: 'Sam löscht das Foto. Luca schreibt Mika privat: „Danke, dass du das gesagt hast.“ Mika ist noch in der Gruppe – und Yara weiß nichts davon.', mit: 'Chat beendet. Yara sieht am nächsten Tag den Screenshot. Yara fragt Mika: „Du auch?“' },
    },
  ];

  const LEVELS = ['Erstes Nein', 'Nachhaken', 'Dabei bleiben'];

  // Wenn-dann-Pläne (Einheit j1-e25)
  const PLAENE = [
    'Wenn jemand nachhakt, dann sage ich mein Nein nochmal – kürzer.',
    'Wenn die Gruppe schweigt, dann schreibe ich eine Alternative.',
    'Wenn ich merke, dass ich wackle, dann lege ich das Handy 5 Minuten weg.',
    'Wenn „Dachte, du bist cool“ kommt, dann antworte ich: „Bin ich. Trotzdem nein.“',
    'Wenn es zu viel wird, dann rede ich mit jemandem, dem ich vertraue.',
  ];

  // Chat im Glimmr-Look: Kopf, Nachrichten, Druck-Meter
  function makeChat(ctx, sit) {
    const list = h('div', { class: 'dc-msgs', role: 'log', 'aria-live': 'polite' });
    const meter = ctx.meter({ value: 10, label: 'Druck' });
    const el = h('div', { class: 'dc-phone' },
      h('div', { class: 'dc-head' }, h('span', { class: 'dc-ava' }), h('div', { class: 'stack', style: { gap: '0' } }, h('b', null, sit.gruppe), h('span', { class: 'muted small' }, sit.online + ' online · erfundener Chat')), ctx.readBtn(() => [...list.querySelectorAll('.dc-msg')].map((m) => m.dataset.who + ': ' + m.dataset.text).join('. '))),
      list,
      h('div', { class: 'dc-foot' }, meter.el));
    const add = (who, text, me) => {
      const name = who === ICH ? 'Mika' : ctx.figures[who].name;
      const m = h('div', { class: 'dc-msg' + (me ? ' me' : ''), 'data-who': name, 'data-text': text },
        me ? null : ctx.avatar(who, 'neutral', 28),
        h('div', { class: 'bubble' + (me ? ' me' : '') }, h('span', { class: 'bubble-who' }, name), h('span', null, text)));
      list.appendChild(m);
      list.scrollTop = list.scrollHeight;
      return m;
    };
    // Nach dem Einhängen in den Bildschirm ans Ende scrollen (vorher ist scrollHeight 0)
    const scrollEnd = () => requestAnimationFrame(() => { list.scrollTop = list.scrollHeight; });
    return { el, add, meter, list, scrollEnd };
  }

  CREW.registerGame({
    id: 'druck-chat',
    template: 'T1',
    icon: 'phone',
    themen: ['Gruppendruck', 'Nein sagen', 'Chat', 'Wenn-dann'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Du steuerst Mika in einem Gruppenchat. Der Druck steigt leise. Dreimal wählst du: Welches Nein – oder mitmachen.',
        levels: LEVELS,
        steps: [
          { icon: 'phone', title: 'Allein tippen', text: 'Drei Chats, je drei Stellen. Nichts wird gespeichert.' },
          { icon: 'x', title: 'Vier Arten Nein', text: 'Klar · mit Grund · Ausweich · Nein + Alternative.' },
          { icon: 'users', title: 'Vergleichen', text: 'Blau findet Blau. Wie hast du dich entschieden? Warum?' },
        ],
        probe: ctx.T.probeCard('Probe: Sam schreibt „Komm, nur einmal.“ Welches Nein nimmst du für Mika? Tippen – zählt nicht.', ORDER.slice(0, 4).map((k) => ({ label: ARTEN[k].label, value: k, variant: 'ghost', icon: ARTEN[k].icon }))),
      });
      await ctx.T.codeCheck();

      // Stunde: Gruppendruck (j1-e25) oder Social Media (j1-e27)
      const unit = (CREW.games.FILTER && CREW.games.FILTER.einheit) || '';
      let stunde = unit === 'j1-e27' ? 'e27' : unit === 'j1-e25' ? 'e25' : '';
      if (!stunde) {
        const wU = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Kurz einstellen', small: true })], { eyebrow: 'Stunde', center: true });
        const u = await ctx.ask(wU, [{ label: 'Gruppendruck und Nein sagen', value: 'e25', variant: 'ghost', icon: 'users' }, { label: 'Social Media und ich', value: 'e27', variant: 'ghost', icon: 'phone' }]);
        stunde = u === 'e27' ? 'e27' : 'e25';
      }
      const sits = stunde === 'e27' ? [SITUATIONEN[2], SITUATIONEN[0], SITUATIONEN[1]] : SITUATIONEN.slice();

      const wahl = {};          // sit.id → [art, art, art]
      let neinGesamt = 0, mitGesamt = 0;
      for (let si = 0; si < sits.length; si++) {
        const sit = sits[si];
        wahl[sit.id] = [];
        const chat = makeChat(ctx, sit);
        let druck = 10;
        let dabei = false; // Mika hat irgendwo mitgemacht
        sit.intro.forEach(([w, t]) => chat.add(w, t));
        // Chat lesen
        const w0 = ctx.scr([
          ctx.say('Chat ' + (si + 1) + ' von ' + sits.length + ': ' + sit.title + '. Lies mit. Gleich bist du dran.', { eyebrow: sit.title, small: true }),
          chat.el,
        ], { eyebrow: 'Chat ' + (si + 1) });
        chat.scrollEnd();
        if ((await ctx.next(w0, 'Weiterlesen')) === ctx.SKIP) continue;

        for (let k = 0; k < sit.stellen.length; k++) {
          const st = sit.stellen[k];
          st.vor.forEach(([w, t]) => chat.add(w, t));
          druck = Math.min(100, druck + (k === 0 ? 20 : k === 1 ? 25 : 30));
          chat.meter.set(druck);
          const wK = ctx.scr([
            ctx.say(k === 0 ? 'Was antwortet Mika?' : k === 1 ? 'Der Chat hakt nach. Zweites Nein – oder?' : 'Emoji-Schweigen. Anker: Füße fest, einmal ausatmen. Was schreibt Mika?', { eyebrow: 'Stelle ' + (k + 1) + ' von 3', small: true }),
            chat.el,
          ], { eyebrow: sit.title + ' · ' + (k + 1) + '/3', badge: ctx.stufe(k + 1, LEVELS) });
          chat.scrollEnd();
          const art = await ctx.ask(wK, ORDER.map((id) => ({ label: ARTEN[id].label + ' · „' + st.antworten[id] + '“', value: id, icon: ARTEN[id].icon, variant: 'ghost', id: 'art-' + id })));
          if (art === ctx.SKIP) { wahl[sit.id].push(null); continue; }
          wahl[sit.id].push(art);
          chat.add(ICH, st.antworten[art], true);
          st.reakt[art].forEach(([w, t]) => chat.add(w, t));
          if (art === 'mit') { dabei = true; mitGesamt++; druck = Math.max(0, druck - 15); } else { neinGesamt++; druck = Math.max(0, druck - (art === 'ausweich' ? 5 : 15)); }
          chat.meter.set(druck);
          // Mitmachen: nie rot – ruhig zeigen, was es kostet
          const wR = ctx.scr([
            chat.el,
            art === 'mit'
              ? h('div', { class: 'card stack soft dc-preis' }, h('span', { class: 'eyebrow' }, 'Leise, ohne Alarm'), h('p', null, st.preis))
              : h('div', { class: 'card stack soft' }, h('span', { class: 'eyebrow' }, ARTEN[art].label), h('p', null, k < 2 ? 'Mika hat Nein gesagt. Der Chat lässt nicht locker – gleich kommt das Nachhaken.' : 'Dreimal Nein. Das war der schwere Teil.')),
          ], { eyebrow: sit.title + ' · ' + (k + 1) + '/3', badge: ctx.stufe(k + 1, LEVELS) });
          chat.scrollEnd();
          if ((await ctx.next(wR, k < 2 ? 'Weiter im Chat' : 'Chat beenden')) === ctx.SKIP) break;
        }
        // Ende der Situation
        const wE = ctx.scr([
          h('div', { class: 'dc-ende' }, CREW.icon('phone', 40), h('h2', null, 'Chat beendet. Mika bleibt Mika.')),
          ctx.figureCard({ fig: ICH, mood: dabei ? 'neutral' : 'froh', text: dabei ? sit.ende.mit : sit.ende.nein, eyebrow: 'Danach' }),
          // Hilfe nicht erst am Spielende: nach dem Vape-Chat gleich die Karte, sonst eine Zeile
          sit.id === 'vape' ? ctx.helpCard({ title: 'Wenn dich das gerade selbst betrifft', text: 'Erfundener Chat – aber manchmal ist es nah dran. X-Karte oder Hilfe oben, oder hier:' }) : h('p', { class: 'muted small dc-selbst' }, 'Wenn dich das gerade selbst betrifft: X-Karte oder Hilfe oben. Erfundener Chat, echte Hilfe.'),
        ], { eyebrow: sit.title + ' · Ende' });
        await ctx.next(wE, si + 1 < sits.length ? 'Nächster Chat' : 'Fertig');
      }

      // Wenn-dann-Plan (j1-e25): ein Plan für Mika, nichts wird gespeichert
      let plan = null;
      if (stunde === 'e25') {
        const wP = ctx.scr([
          ctx.say('Wenn-dann-Plan: Welcher Satz hätte Mika am meisten geholfen? Nur für dich, nichts wird gespeichert.', { eyebrow: 'Aus der Stunde', small: true }),
          h('p', { class: 'muted small' }, 'Hausaufgabe aus der Stunde: Nein-Trainer – den Satz dreimal laut üben, ohne Publikum.'),
        ], { eyebrow: 'Wenn-dann' });
        const p = await ctx.ask(wP, PLAENE.map((t, i) => ({ label: t, value: i, variant: 'ghost' })));
        if (p !== ctx.SKIP) plan = PLAENE[p];
      }

      // Austausch zu zweit: die EINE Vergleichskarte
      await ctx.T.pairScreen();
      await ctx.T.vergleich({
        title: 'Druck-Chat',
        items: sits.map((s) => ({ label: s.title, icon: 'phone', text: (wahl[s.id] || []).map((a) => (a ? ARTEN[a].kurz : 'Pass')).join(' · ') || 'gepasst' })),
        questions: stunde === 'e27'
          ? ['Wie hast du dich entschieden? Warum?', 'Emoji-Schweigen oder „Dachte, du bist cool“ – was hat mehr Druck gemacht?']
          : ['Wie hast du dich entschieden? Warum?', 'Welches Nein fällt dir am leichtesten – und welches ist am stärksten?'],
        note: 'Mitmachen ist keine falsche Antwort. Es geht um Mika, nicht um dich. Pass ist okay.',
      });
      return {
        summary: neinGesamt >= 6 ? 'Chat beendet. Mika bleibt Mika. Das zweite Nein ist das wichtige.' : 'Chat beendet. Mika bleibt Mika. Jedes Nein zählt – auch das späte.',
        stats: [[neinGesamt, 'mal Nein'], [mitGesamt, 'mal mitgemacht']],
        help: true,
        extra: plan ? h('p', { class: 'muted small' }, 'Dein Wenn-dann für Mika: „' + plan + '“') : null,
      };
    },
  });
})();
