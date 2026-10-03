/* Spiel „Funkstille – der Chat kippt“ (Thema: Kommunikation & Grenzen) · Vorlage T2 Rollen-Puzzle · j1-e21, j1-e23
   A sieht einen Chat, der gerade kippt, und sechs mögliche Nachrichten; B hat die Ich-Botschaft-Regel als
   Icon-Karte (j1-e21: Formel der Stunde; j1-e23: Stopp-Formel); C sieht, welche Nachrichten eine Grenze der
   Figur überschreiten; D den Pegel (ab 80: erst Skill, dann Text). Nur zusammen finden sie die eine
   Nachricht, die alles erfüllt. Kein Countdown, „Fragt nochmal nach“ statt falsch. Hilfenummern am Ende. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Fälle: Figur, Chat, Pegel, Grenzen der Figur, sechs Nachrichten (ich = Ich-Botschaft, ok = überschreitet keine
     Grenze, skill = erst Skill, dann Text). Genau eine Nachricht erfüllt alles. antwort = wie der Chat weitergeht. */
  const FAELLE = [
    { id: 'foto', fig: 'yara', pegel: 85, titel: 'Das Foto im Klassenchat',
      chat: [{ who: 'Paul', t: 'hahaha schaut euch Yaras Gesicht an 📸' }, { who: 'Lena', t: 'omg 😂😂' }, { who: 'Paul', t: '@Yara sag mal was, bist du beleidigt?' }, { who: 'Noa', t: 'leute…' }],
      grenzen: ['Keine Fotos von Yara ohne zu fragen.', 'Keine Beleidigungen – auch nicht zurück.'],
      msgs: [
        { t: 'Du bist so ein Opfer, Paul. Lösch das, du Lauch.', ich: false, ok: false, skill: false },
        { t: 'Ich will nicht, dass Fotos von mir hier landen. Bitte lösch es.', ich: true, ok: true, skill: false },
        { t: 'Ist mir egal, postet was ihr wollt 🙄', ich: false, ok: true, skill: false },
        { t: 'Ich bin gerade echt sauer, dass das Foto hier ist. Bitte lösch es, Paul.', ich: true, ok: true, skill: true },
        { t: 'Ich finde, du bist einfach ein Idiot, Paul.', ich: false, ok: false, skill: true },
        { t: 'Ihr seid alle so kindisch, immer dasselbe mit euch.', ich: false, ok: true, skill: true },
      ],
      antwort: [{ who: 'Paul', t: 'ok ok, sorry. gelöscht.' }, { who: 'Noa', t: '👍' }] },
    { id: 'absage', fig: 'sam', pegel: 55, titel: 'Zum dritten Mal abgesagt',
      chat: [{ who: 'Luca', t: 'sorry kann heute doch nicht 😬' }, { who: 'Luca', t: 'nächste woche safe' }, { who: 'Luca', t: 'bist du sauer?' }],
      grenzen: ['Sam will nicht angelogen werden.', 'Sam will Luca nicht vor anderen bloßstellen.'],
      msgs: [
        { t: 'Nee alles gut 🙂', ich: false, ok: true, skill: false },
        { t: 'Du sagst immer ab. Du bist echt unzuverlässig.', ich: false, ok: true, skill: false },
        { t: 'Ich bin enttäuscht, weil das das dritte Mal ist. Ich wünsche mir, dass du ehrlich sagst, ob du Lust hast.', ich: true, ok: true, skill: false },
        { t: 'Ich bin enttäuscht. Ich schreib das jetzt mal in die Gruppe, dann wissen alle Bescheid.', ich: true, ok: false, skill: false },
        { t: 'Warum lügst du eigentlich ständig?', ich: false, ok: true, skill: false },
        { t: 'Ich bin raus. Such dir jemand anderen.', ich: false, ok: true, skill: true },
      ],
      antwort: [{ who: 'Luca', t: 'ehrlich? ich hatte stress zuhause. wollte das nicht schreiben. samstag, versprochen.' }] },
    { id: 'gruppenarbeit', fig: 'mika', pegel: 75, titel: 'Gruppenarbeit-Chat',
      chat: [{ who: 'Jonas', t: 'Mika macht eh nichts, wie immer' }, { who: 'Emma', t: 'wer macht die Präsi?' }, { who: 'Jonas', t: 'Mika kann ja mal was tun lol' }],
      grenzen: ['Mika will nicht vor der Gruppe runtergemacht werden.', 'Mika will keine Drohungen schreiben.'],
      msgs: [
        { t: 'Ich mach die Präsi. Und ich find’s unfair, Jonas, dass du schreibst, ich tue nichts – ich hab den Text gemacht.', ich: true, ok: true, skill: false },
        { t: 'Jonas, du hast selbst noch nichts gemacht, halt die Klappe.', ich: false, ok: false, skill: false },
        { t: 'Ich mach gar nichts mehr, macht euren Kram allein.', ich: true, ok: false, skill: false },
        { t: 'lol ok', ich: false, ok: true, skill: false },
        { t: 'Wenn du das nochmal schreibst, sag ich’s der Lehrerin.', ich: false, ok: false, skill: false },
        { t: 'Du bist so respektlos, Jonas.', ich: false, ok: true, skill: false },
      ],
      antwort: [{ who: 'Emma', t: 'stimmt, der Text war von Mika. Jonas machst du die Bilder?' }, { who: 'Jonas', t: 'ja ok' }] },
    { id: 'vater', fig: 'luca', pegel: 90, titel: 'Nachrichten vom Vater', familie: true,
      chat: [{ who: 'Papa', t: 'Wo bist du??' }, { who: 'Papa', t: 'Es ist 19:30. Wir hatten 19 Uhr gesagt.' }, { who: 'Papa', t: 'Antworte sofort.' }, { who: 'Papa', t: 'Das hat Konsequenzen.' }],
      grenzen: ['Luca will nicht anschreien und nicht angeschrien werden.', 'Luca will nicht lügen, wo Luca ist.'],
      msgs: [
        { t: 'Bin bei Sam, komme in 15 Min. Ich hab die Zeit vergessen, sorry.', ich: true, ok: true, skill: false },
        { t: 'Bin in der Bibliothek. (Luca ist bei Sam.)', ich: false, ok: false, skill: true },
        { t: 'LASS MICH IN RUHE', ich: false, ok: false, skill: false },
        { t: 'Ich bin bei Sam und komme in 15 Minuten. Mir ist das gerade zu viel, lass uns zu Hause reden.', ich: true, ok: true, skill: true },
        { t: 'Du nervst. Immer dieser Stress.', ich: false, ok: true, skill: true },
        { t: 'Ich komme, wann ich will.', ich: true, ok: false, skill: true },
      ],
      antwort: [{ who: 'Papa', t: 'Ok. Komm heil nach Hause. Wir reden dann.' }] },
    { id: 'screenshot', fig: 'yara', pegel: 80, titel: 'Der Screenshot',
      chat: [{ who: 'Mia', t: 'warum hat Lena einen Screenshot von unserem Chat??' }, { who: 'Mia', t: 'da steht das, was du über Tom gesagt hast' }, { who: 'Mia', t: 'hast DU das weitergeschickt?' }],
      grenzen: ['Yara will nicht beschuldigt werden, ohne gefragt zu werden.', 'Yara will nicht über Dritte lästern, um sich zu retten.'],
      msgs: [
        { t: 'Nein. Lena ist eine Schlange, die hat sicher mein Handy genommen.', ich: false, ok: false, skill: false },
        { t: 'Ich hab das nicht weitergeschickt. Ich bin erschrocken, dass du das von mir denkst. Können wir telefonieren?', ich: true, ok: true, skill: true },
        { t: 'Wow. Danke für das Vertrauen.', ich: false, ok: true, skill: false },
        { t: 'Ich hab das nicht weitergeschickt, und ich will nicht, dass du mir das vorwirfst.', ich: true, ok: true, skill: false },
        { t: 'Vielleicht hat Tom das ja selbst verdient.', ich: false, ok: false, skill: true },
        { t: 'Ich bin gerade echt verletzt. Und Lena ist sowieso falsch.', ich: true, ok: false, skill: true },
      ],
      antwort: [{ who: 'Mia', t: 'ok… sorry, ich bin nur panisch. ruf an?' }] },
    { id: 'team', fig: 'sam', pegel: 45, titel: 'Team-Chat',
      chat: [{ who: 'Kapitän Ben', t: 'Samstag Turnier. Wer nicht kommt, fliegt aus dem Kader.' }, { who: 'Ali', t: 'bin da' }, { who: 'Ben', t: '@Sam?' }],
      grenzen: ['Sam will nicht lügen, warum Sam fehlt.', 'Sam will keine Drohung mit „dann geh ich“.'],
      msgs: [
        { t: 'Ich kann Samstag nicht, meine Oma wird 80. Ich wünsche mir, dass das okay ist – nächstes Turnier bin ich sicher da.', ich: true, ok: true, skill: false },
        { t: 'Bin krank 🤒', ich: false, ok: false, skill: false },
        { t: 'Wenn das so läuft, dann geh ich halt zum anderen Verein.', ich: false, ok: false, skill: false },
        { t: 'Du kannst mich nicht rauswerfen, das entscheidet der Trainer.', ich: false, ok: true, skill: false },
        { t: 'Ich kann nicht. Und ich finde, du kannst mich nicht rauswerfen – ich sag’s dem Trainer, dass du drohst.', ich: true, ok: false, skill: false },
        { t: '…', ich: false, ok: true, skill: false },
      ],
      antwort: [{ who: 'Ben', t: 'ok, Oma geht vor. nächstes Turnier dann.' }] },
  ];
  const korrekt = (f) => f.msgs.findIndex((m) => m.ich && m.ok && (f.pegel < 80 || m.skill));

  const chatBox = (ctx, f, extraLines) => h('div', { class: 'chat-box funk-chat' },
    h('div', { class: 'funk-chat-head' }, CREW.icon('phone', 18), h('b', null, f.titel), h('span', { class: 'muted small' }, 'Gruppenchat')),
    f.chat.map((l) => ctx.bubble(l.t, { who: l.who })),
    (extraLines || []).map((l) => ctx.bubble(l.t, { who: l.who, me: l.me })));

  const iconCard = (icon, title, text) => h('div', { class: 'icon-card' }, CREW.icon(icon, 32), h('b', null, title), text ? h('span', { class: 'muted small' }, text) : null);

  /* Was zeigt dieses iPad? Nur den eigenen Teil. */
  function slice(ctx, role, f, unit) {
    const name = CREW.games.figures[f.fig].name;
    if (role === 'A') return h('div', { class: 'stack' },
      chatBox(ctx, f),
      h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, name + ' könnte schreiben:'), ctx.readBtn('Sechs Nachrichten: ' + f.msgs.map((m, i) => (i + 1) + ': ' + m.t).join('. '))),
        h('p', { class: 'muted small' }, 'Lies den Chat und die sechs Nachrichten laut vor. B, C und D haben die Regeln. „Erst Skill“ heißt: ' + name + ' atmet erst aus und schreibt dann.'),
        h('ol', { class: 'funk-list' }, f.msgs.map((m, i) => h('li', null, h('span', { class: 'funk-n' }, String(i + 1)), h('span', null, m.t), m.skill ? h('span', { class: 'pill small funk-skill' }, CREW.icon('leaf', 14), 'erst Skill') : null)))));
    if (role === 'B') {
      const e23 = unit === 'e23';
      return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, e23 ? 'Stopp-Formel' : 'Ich-Botschaft-Formel'), ctx.readBtn(e23 ? 'Stopp-Formel: Stopp oder Ich will nicht. Dann: was ich stattdessen will. Keine Beleidigung, keine Drohung.' : 'Ich-Botschaft: Ich fühle, wenn, weil, ich wünsche mir. Ich statt Du. Gefühl benannt. Wunsch statt Vorwurf.')),
        h('p', { class: 'muted small' }, 'Frag A nach jeder Nachricht: Erfüllt sie die Formel? Du entscheidest das – laut.'),
        h('div', { class: 'icon-cards' }, e23
          ? [iconCard('shield', '„Stopp“ / „Ich will nicht“', 'klar, ohne Schimpfwort'), iconCard('star', 'Wunsch', 'was stattdessen'), iconCard('x', 'Keine Drohung', 'kein „sonst …“')]
          : [iconCard('user', 'Ich …', 'nicht „Du bist“'), iconCard('heart', '… fühle', 'ein Gefühl steht drin'), iconCard('eye', '… wenn / weil', 'die Situation, keine Beleidigung'), iconCard('star', 'Ich wünsche mir', 'Wunsch statt Vorwurf')]),
        h('p', { class: 'muted small' }, 'Achtung: Ein „Ich“ am Anfang reicht nicht. „Ich finde, du bist blöd“ ist keine Ich-Botschaft.'));
    }
    if (role === 'C') {
      const cross = f.msgs.map((m, i) => (m.ok ? null : i + 1)).filter(Boolean);
      return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, 'Grenzen von ' + name), ctx.readBtn('Grenzen von ' + name + ': ' + f.grenzen.join(' ') + ' Diese Nachrichten überschreiten eine Grenze: ' + cross.join(', '))),
        h('p', { class: 'muted small' }, 'Nur du weißt, welche Nummern eine Grenze von ' + name + ' überschreiten – auch die eigenen Grenzen zählen.'),
        h('div', { class: 'stack' }, f.grenzen.map((g) => h('div', { class: 'vk-item' }, h('span', { class: 'vk-ic', style: { background: 'var(--hot)', color: '#fff' } }, CREW.icon('shield', 22)), h('span', null, g)))),
        h('div', { class: 'card row', style: { gap: '8px', alignItems: 'center' } }, h('b', null, 'Grenze überschritten:'), cross.map((n) => h('span', { class: 'funk-n bad' }, String(n)))));
    }
    if (role === 'D') {
      const m = ctx.meter({ value: f.pegel, label: name + ' steht bei' });
      return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, 'Pegel'), ctx.readBtn(name + ' steht bei ' + f.pegel + '. ' + (f.pegel >= 80 ? 'Ab 80: erst Skill, dann Text.' : 'Unter 80: Text geht direkt.'))),
        m.el,
        h('div', { class: 'icon-cards' }, iconCard('leaf', 'Ab 80', 'erst Skill, dann Text'), iconCard('chat', 'Unter 80', 'Text geht direkt'), iconCard('bolt', 'Ab 95', 'gar nicht schreiben – Handy weg')),
        h('p', { class: 'muted small' }, 'Sag der Crew, ob ' + name + ' erst einen Skill braucht. A sieht, bei welchen Nachrichten „erst Skill“ steht.'));
    }
    return h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Du hast kein Puzzle-Teil. Deine Aufgabe:'),
      h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass A alle sechs Nachrichten vorliest – ohne Bewertung.'), h('li', null, 'Frag: „Hat jemand B, C und D gefragt?“, bevor geprüft wird.'), h('li', null, 'Am Ende: Welche Rolle hat die Lösung gebracht?')),
      h('p', { class: 'muted small' }, 'Szene: ' + f.titel + '. Der Chat bleibt für dich verdeckt.'));
  }

  /* Gemeinsame Lösung prüfen – Hinweis nennt nur die Rolle, die nochmal gefragt werden sollte */
  async function pruefen(ctx, f, role) {
    const name = CREW.games.figures[f.fig].name;
    const ok = korrekt(f);
    let tries = 0;
    for (;;) {
      tries++;
      const w = ctx.scr([
        ctx.say('Welche Nummer schreibt ' + name + '? Redet, bis ihr euch einig seid.', { eyebrow: 'Gemeinsam lösen · Versuch ' + tries, small: true }),
        // Rolle A behält die sechs Nachrichten im Blick (klein), die anderen sehen nur die Nummern
        role === 'A' ? h('ol', { class: 'funk-list compact' }, f.msgs.map((m, i) => h('li', null, h('span', { class: 'funk-n' }, String(i + 1)), h('span', null, m.t), m.skill ? h('span', { class: 'pill small funk-skill' }, CREW.icon('leaf', 14), 'erst Skill') : null))) : null,
        h('p', { class: 'muted small' }, 'Kein Countdown. Jedes iPad prüft für sich.')],
        { eyebrow: 'Lösung', badge: h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role) });
      const r = await ctx.ask(w, f.msgs.map((m, i) => ({ label: 'Nr. ' + (i + 1), value: i, variant: 'ghost' })), { autoPick: ctx.auto && tries >= 2 ? () => ok : undefined });
      if (r === ctx.SKIP) return { ok: false, tries, skipped: true };
      if (r === ok) { CREW.sound.play('great'); return { ok: true, tries }; }
      const m = f.msgs[r];
      const hint = !m.ich ? 'Fragt B nochmal: Ist Nr. ' + (r + 1) + ' wirklich eine Ich-Botschaft?' : !m.ok ? 'Fragt C nochmal: Überschreitet Nr. ' + (r + 1) + ' eine Grenze von ' + name + '?' : 'Fragt D nochmal: Wie hoch steht ' + name + ' – und was gilt ab 80?';
      CREW.sound.play('soft');
      const w2 = ctx.scr([ctx.say('Noch nicht. ' + hint, { eyebrow: 'Fragt nochmal nach' })], { eyebrow: 'Lösung', center: true });
      await ctx.next(w2, 'Nochmal');
      if (tries >= 4) return { ok: false, tries };
    }
  }

  CREW.registerGame({
    id: 'funkstille',
    template: 'T2',
    icon: 'chat',
    themen: ['Ich-Botschaften', 'Grenzen', 'Gruppenchat', 'Anspannung einschätzen', 'Team-Entscheidung'],
    safety: ['figuren', 'familie'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Chat kippt. A hat sechs Nachrichten, B die Formel, C die Grenzen, D den Pegel. Nur zusammen findet ihr die eine Nachricht, die alles erfüllt.',
        steps: [
          { icon: 'phone', title: 'A: Chat', text: 'liest Chat und sechs Nachrichten vor' },
          { icon: 'chat', title: 'B + C', text: 'Formel und Grenzen prüfen' },
          { icon: 'leaf', title: 'D: Pegel', text: 'ab 80: erst Skill, dann Text' },
        ],
        probe: ctx.T.probeCard('Probe: „Du bist immer so gemein“ oder „Ich bin verletzt, wenn du das sagst“ – welche ist die Ich-Botschaft? Tippt irgendwas – zählt nicht.', [{ label: '„Du bist immer so gemein“', value: 1, variant: 'ghost' }, { label: '„Ich bin verletzt, wenn …“', value: 2, variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      const role = await ctx.T.roleSetup({
        roles: { A: { name: 'Chat', desc: 'Du siehst den Chat und sechs mögliche Nachrichten. Lies alles vor – ohne zu werten.' }, B: { name: 'Formel', desc: 'Du hast die Ich-Botschaft-Regel als Karte. Du sagst, ob eine Nachricht die Formel erfüllt.' }, C: { name: 'Grenzen', desc: 'Du siehst die Grenzen der Figur und welche Nachrichten sie überschreiten.' }, D: { name: 'Pegel', desc: 'Du siehst, wie angespannt die Figur ist. Ab 80: erst Skill, dann Text.' } },
        observer: { name: 'Beobachter:in', desc: 'Kein Puzzle-Teil. Du achtest darauf, dass alle gefragt werden, bevor geprüft wird.' },
      });
      // Stunde: j1-e21 (Ich-Botschaften) oder j1-e23 (Grenzen setzen: Stopp!) – B bekommt die Formel der Stunde
      const wu = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Vorbereitung', small: true })], { eyebrow: 'Vorbereitung', center: true });
      const unit = await ctx.ask(wu, [{ label: 'Ich-Botschaften und Zuhören (j1-e21)', value: 'e21', variant: 'ghost', icon: 'chat' }, { label: 'Grenzen setzen: Stopp! (j1-e23)', value: 'e23', variant: 'ghost', icon: 'shield' }]);
      const faelle = ctx.rshuffle(FAELLE).slice(0, 2);
      let solved = 0, tries = 0, familie = false;
      for (let i = 0; i < faelle.length; i++) {
        const f = faelle[i];
        const name = CREW.games.figures[f.fig].name;
        if (f.familie) familie = true;
        const w = ctx.scr([
          slice(ctx, role, f, unit),
          h('p', { class: 'muted small' }, 'Redet, fragt nach, bis ihr euch einig seid. Dann tippt jedes iPad „Lösung prüfen“.'),
          f.familie ? ctx.safetyLine('familie') : null,
        ], { eyebrow: 'Fall ' + (i + 1) + '/' + faelle.length + ' · ' + f.titel, badge: h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role) });
        const go = await ctx.next(w, 'Lösung prüfen');
        if (go === ctx.SKIP) continue;
        const r = await pruefen(ctx, f, role);
        tries += r.tries;
        if (r.skipped) continue;
        if (r.ok) solved++;
        const ok = korrekt(f);
        const m = f.msgs[ok];
        // Auflösung: der Chat geht weiter – mit der Nachricht, die alles erfüllt
        const w2 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (r.ok ? 'good' : '') }, r.ok ? 'Gefunden: Nr. ' + (ok + 1) : 'Die Nachricht war Nr. ' + (ok + 1))),
          chatBox(ctx, f, [{ who: name, t: (m.skill ? '[erst ausatmen] ' : '') + m.t, me: true }].concat(f.antwort)),
          h('div', { class: 'funk-checks' },
            h('div', { class: 'funk-check' }, CREW.icon('check', 22), h('span', null, h('b', null, 'B: '), 'Ich-Botschaft')),
            h('div', { class: 'funk-check' }, CREW.icon('check', 22), h('span', null, h('b', null, 'C: '), 'keine Grenze überschritten')),
            h('div', { class: 'funk-check' }, CREW.icon('check', 22), h('span', null, h('b', null, 'D: '), f.pegel >= 80 ? 'Pegel ' + f.pegel + ' – erst Skill' : 'Pegel ' + f.pegel + ' – Text geht direkt'))),
          ctx.say('Kurz reden: Welche der anderen fünf Nachrichten hätte den Chat am meisten kippen lassen? Warum?', { eyebrow: 'Kurz reden', small: true }),
        ], { eyebrow: 'Fall ' + (i + 1) + ' · Auflösung' });
        await ctx.next(w2, i + 1 < faelle.length ? 'Nächster Fall' : 'Fertig');
      }
      const w5 = ctx.scr([ctx.say('Beobachter:in zuerst, dann wer will: Welche Rolle hat die Lösung gebracht – Formel, Grenzen oder Pegel?', { eyebrow: 'Kurz reden', small: true }), ctx.safetyLine('freiwillig')], { eyebrow: 'Abschluss' });
      await ctx.next(w5, 'Fertig');
      return {
        summary: solved === faelle.length ? 'Funk steht. Ich-Botschaft, Grenze, Pegel – alles drin.' : 'Zusammengelegt. Nachfragen war die Mechanik.',
        stats: [[solved, 'Chats gerettet'], [tries, 'Versuche']],
        help: true,
        extra: familie ? h('p', { class: 'muted small' }, 'Ein Fall hatte ein Familien-Thema. Wenn dich das selbst betrifft: Die Nummern unten sind für dich.') : null,
      };
    },
  });
})();
