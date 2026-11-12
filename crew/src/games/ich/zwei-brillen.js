/* Spiel „Zwei Brillen“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T2 Rollen-Puzzle · j1-e05, j1-e18
   Eine Szene um eine Figur (z. B. Yara hat in der Gruppenarbeit kaum geredet). iPad A zeigt, wie die Figur
   sich selbst sieht, B die Freundin, C die Lehrkraft, D nur die Tatsachen. Die Crew wählt aus sechs Chips
   die zwei, die zu ALLEN vier Sichten passen. Pointe: Die eigene Brille ist fast immer die strengste –
   ohne dass jemand über sich reden muss. Beobachter:in für wer passen will. „Noch nicht“ statt falsch.
   j1-e18: Zusatzfrage Tatsache vs. Urteil (Brille A gegen Brille D).
   In drei Level: 1) Hören (jede Rolle liest ihre Brille), 2) Abgleichen (zwei Sätze, die durch alle Brillen passen),
   3) Fairer Satz – welcher Satz wäre für die Figur fair UND wahr? (Skill-Karte „Die freundliche Stimme“) */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const BRILLEN = {
    A: { name: 'Eigene Brille', icon: 'user', colour: 'var(--hot)', desc: 'So sieht die Figur sich selbst.' },
    B: { name: 'Freund:in', icon: 'users', colour: 'var(--teamB)', desc: 'So sieht es eine Freundin oder ein Freund.' },
    C: { name: 'Lehrkraft', icon: 'eye', colour: 'var(--teamA)', desc: 'So sieht es die Lehrkraft.' },
    D: { name: 'Nur Tatsachen', icon: 'check', colour: 'var(--good)', desc: 'Was man zählen und sehen kann. Keine Meinung.' },
  };

  /* Szenen: Figur, Situation, vier Sichten, sechs Chips.
     REGEL für fits: Ein Satz „passt“ zu einer Brille, wenn die Brille ihn sagt oder ihm nicht widerspricht.
     Richtig (fits 'ABCD') ist nur ein Satz, der in KEINER Brille widersprochen wird UND in mindestens zwei Brillen
     wörtlich steht (q = diese Brillen; S = Situationstext). Der Test prüft q bei jedem ABCD-Chip.
     strenge: wie streng jede Brille urteilt (0–100) – die eigene ist fast immer oben. */
  const SZENEN = [
    { id: 'gruppe', fig: 'yara', freund: 'sam', titel: 'Gruppenarbeit', text: 'Yara hat in der Gruppenarbeit kaum geredet.',
      views: { A: 'Ich hab wieder nichts gesagt. Die anderen denken sicher, ich bin nutzlos. Ich war einfach zu feige.', B: 'Yara war leise, klar. Aber Yara hat die ganze Zeit mitgeschrieben. Und die Idee mit der Zeitleiste kam von Yara – sie hat sie mir nur zugeflüstert.', C: 'Yara hat sich wenig gemeldet. Das Plakat war am Ende zur Hälfte Yaras Handschrift. Ich hätte Yara gern öfter gehört.', D: '40 Minuten Gruppenarbeit. Yara hat 2 Sätze laut gesagt. Yara hat 14 Zeilen auf das Plakat geschrieben. Die Idee mit der Zeitleiste kam von Yara, geflüstert an Sam.' },
      chips: [{ t: 'Yara hat wenig laut gesagt', fits: 'ABCD', q: 'ABCD' }, { t: 'Yara hat viel aufgeschrieben', fits: 'ABCD', q: 'BCD' }, { t: 'Yara ist feige', fits: 'A' }, { t: 'Yara ist nutzlos', fits: '' }, { t: 'Yara hatte die beste Idee', fits: 'B' }, { t: 'Die Gruppe hat Yara ausgeschlossen', fits: '' }],
      strenge: { A: 92, B: 20, C: 45, D: 5 },
      fair: [{ k: 'fair', t: 'Ich war leise – und die Zeitleiste war meine Idee.' }, { k: 'streng', t: 'Ich bin einfach zu feige zum Reden.' }, { k: 'rosa', t: 'Ich war die Beste in der ganzen Gruppe.' }] },
    { id: 'tor', fig: 'mika', freund: 'luca', titel: 'Das Eigentor', text: 'Mika hat im Spiel ein Eigentor geschossen. Die Mannschaft hat 2:3 verloren.',
      views: { A: 'Wegen mir haben wir verloren. Alle hassen mich jetzt. Ich sollte aufhören mit Fußball.', B: 'Blöd gelaufen, das Eigentor. Aber Mika hat vorher das 1:0 vorbereitet. Beim Rausgehen hat Mika niemanden angeschaut – das war das Schlimmste.', C: 'Ein Eigentor passiert. Mika hat danach noch 20 Minuten alles gegeben. Das habe ich gesehen.', D: 'Spiel 2:3 verloren. Mika: ein Eigentor in Minute 60, eine Torvorlage in Minute 12. Mika hat bis zum Abpfiff gespielt. Nach dem Spiel haben zwei Mitspieler Mika auf die Schulter geklopft.' },
      chips: [{ t: 'Mika hat ein Eigentor geschossen', fits: 'ABCD', q: 'SABCD' }, { t: 'Mika hat weitergespielt und alles gegeben', fits: 'ABCD', q: 'CD' }, { t: 'Alle hassen Mika', fits: 'A' }, { t: 'Mika hat das Spiel allein verloren', fits: 'A' }, { t: 'Mika sollte aufhören', fits: '' }, { t: 'Mika war der beste Spieler', fits: '' }],
      strenge: { A: 95, B: 25, C: 30, D: 5 },
      fair: [{ k: 'fair', t: 'Ich hab ein Eigentor geschossen und bis zum Schluss alles gegeben.' }, { k: 'streng', t: 'Wegen mir haben wir verloren.' }, { k: 'rosa', t: 'Das Eigentor war eigentlich egal.' }] },
    { id: 'chat', fig: 'luca', freund: 'yara', titel: 'Die Nachricht', text: 'Luca hat im Gruppenchat einen Witz gemacht. Niemand hat geantwortet.',
      views: { A: 'Peinlich. Keiner findet mich lustig. Die reden sicher gerade in einem anderen Chat über mich.', B: 'Ich hab den Witz gesehen und gelacht, war aber zwei Stunden im Training und konnte nicht antworten. Luca macht sich sicher wieder Gedanken.', C: 'Ich sehe den Chat nicht. Ich sehe, dass Luca heute im Unterricht still war und oft aufs Handy geschaut hat.', D: 'Nachricht um 17:02 Uhr. 0 Antworten bis 19 Uhr. Von 8 Leuten im Chat waren 5 beim Training. Um 19:40 Uhr kamen zwei Lach-Emojis.' },
      chips: [{ t: 'Luca hat einen Witz geschrieben', fits: 'ABCD', q: 'SBD' }, { t: 'Zwei Stunden kam keine Antwort', fits: 'ABCD', q: 'BD' }, { t: 'Keiner findet Luca lustig', fits: 'A' }, { t: 'Die anderen lästern über Luca', fits: '' }, { t: 'Yara fand den Witz gut', fits: 'B' }, { t: 'Luca ist langweilig', fits: '' }],
      strenge: { A: 90, B: 15, C: 35, D: 5 },
      fair: [{ k: 'fair', t: 'Zwei Stunden kam nichts – die meisten waren beim Training.' }, { k: 'streng', t: 'Keiner findet mich lustig.' }, { k: 'rosa', t: 'Alle lieben meine Witze.' }] },
    { id: 'referat', fig: 'sam', freund: 'mika', titel: 'Das Referat', text: 'Sam hat beim Referat zweimal den Faden verloren.',
      views: { A: 'Totalausfall. Ich hab gestottert, alle haben gegrinst. Ich kann einfach nicht vor Leuten reden.', B: 'Sam hat zweimal kurz gestockt, ja. Aber den Teil mit dem Vulkan-Modell fand die ganze Klasse stark. Sam sieht nur die zwei Hänger.', C: 'Zwei Pausen, dann weitergemacht – das ist das Wichtigste. Inhalt gut, Modell sehr gut. Note 2.', D: 'Referat 9 Minuten. Zwei Pausen von je ca. 5 Sekunden. Modell gezeigt, drei Fragen aus der Klasse beantwortet. Note: 2.' },
      chips: [{ t: 'Sam hat zweimal gestockt', fits: 'ABCD', q: 'SABCD' }, { t: 'Sam hat das Referat zu Ende gebracht', fits: 'ABCD', q: 'CD' }, { t: 'Das Referat war ein Totalausfall', fits: 'A' }, { t: 'Sam kann nicht vor Leuten reden', fits: 'A' }, { t: 'Das Modell war das Beste', fits: 'BC' }, { t: 'Die Klasse hat Sam ausgelacht', fits: '' }],
      strenge: { A: 94, B: 20, C: 25, D: 5 },
      fair: [{ k: 'fair', t: 'Ich hab zweimal gestockt und das Referat trotzdem gut zu Ende gebracht.' }, { k: 'streng', t: 'Ich kann einfach nicht vor Leuten reden.' }, { k: 'rosa', t: 'Das Referat war perfekt.' }] },
    { id: 'spaet', fig: 'yara', freund: 'luca', titel: 'Zu spät', text: 'Yara kommt zum dritten Mal in dieser Woche zu spät.',
      views: { A: 'Ich bin unzuverlässig. Alle anderen schaffen es pünktlich. Ich krieg mein Leben nicht hin.', B: 'Letzte Woche war Yara pünktlich. Yara kommt zu spät, seit Yara morgens den kleinen Bruder zur Kita bringt. Das weiß aber keiner in der Klasse.', C: 'Montag, Mittwoch, Freitag – dreimal zu spät, das muss ich ansprechen. Mir fällt auf: Yara kommt mit rotem Kopf rein, als wäre Yara gerannt. Da ist was.', D: 'Montag 8:12 Uhr, Mittwoch 8:09 Uhr, Freitag 8:15 Uhr. Unterricht beginnt 8:00 Uhr. Letzte Woche: null Mal zu spät.' },
      chips: [{ t: 'Yara kam dreimal zu spät', fits: 'ABCD', q: 'SCD' }, { t: 'Letzte Woche war Yara pünktlich', fits: 'ABCD', q: 'BD' }, { t: 'Yara ist unzuverlässig', fits: 'A' }, { t: 'Yara hat morgens einen Grund', fits: 'BC' }, { t: 'Yara kriegt ihr Leben nicht hin', fits: '' }, { t: 'Yara kam Montag, Mittwoch und Freitag nach 8 Uhr', fits: 'ABCD', q: 'CD' }],
      strenge: { A: 88, B: 10, C: 50, D: 5 },
      fair: [{ k: 'fair', t: 'Ich komme zu spät, seit ich meinen Bruder bringe. Das kann ich ansprechen.' }, { k: 'streng', t: 'Ich krieg mein Leben nicht hin.' }, { k: 'rosa', t: 'Zu spät kommen ist doch egal.' }],
      note: 'Hier passen drei Chips zu allen vier Brillen. Zwei reichen.' },
    { id: 'party', fig: 'luca', freund: 'sam', titel: 'Nicht eingeladen', text: 'Luca wurde nicht zu Mias Geburtstag eingeladen.',
      views: { A: 'Ich bin einfach nicht wichtig genug. Niemand will mich dabeihaben. War ja klar.', B: 'Mia durfte nur fünf Leute einladen, hat sie mir gesagt. Sie fand es selbst blöd. Luca denkt jetzt sicher wieder, dass es an Luca liegt.', C: 'Ich habe gesehen, dass Luca heute in der Pause allein saß. Vor zwei Wochen war Luca bei Sams Geburtstag dabei – das weiß ich auch.', D: 'Mia hat 5 Personen eingeladen. In der Klasse sind 22. Luca war vor zwei Wochen bei Sams Geburtstag eingeladen.' },
      chips: [{ t: 'Luca war nicht auf der Liste', fits: 'ABCD', q: 'SAB' }, { t: 'Mia hat nur fünf Leute eingeladen', fits: 'ABCD', q: 'BD' }, { t: 'Niemand will Luca dabeihaben', fits: 'A' }, { t: 'Luca war vor zwei Wochen bei Sam eingeladen', fits: 'ABCD', q: 'CD' }, { t: 'Luca ist nicht wichtig', fits: '' }, { t: 'Mia mag Luca nicht', fits: '' }],
      strenge: { A: 93, B: 15, C: 30, D: 5 },
      fair: [{ k: 'fair', t: 'Mia durfte nur fünf Leute einladen. Das sagt nichts über mich.' }, { k: 'streng', t: 'Niemand will mich dabeihaben.' }, { k: 'rosa', t: 'Ich wollte eh nicht hin.' }],
      note: 'Hier passen drei Sätze zu allen vier Brillen. Zwei reichen. Einen davon kennen nur B und D.' },
  ];

  const LEVELS = ['Hören', 'Abgleichen', 'Fairer Satz'];
  const FAIR_FB = {
    fair: 'Wahr und freundlich: Das sagt eine Freundin – und es stimmt mit den Tatsachen.',
    streng: 'Das ist die strenge eigene Brille. Die Tatsachen sagen etwas anderes.',
    rosa: 'Schöngeredet: Das passt nicht zu den Tatsachen. Fair heißt: wahr UND freundlich.',
  };
  const brilleCard = (ctx, key, sz, o) => {
    const b = BRILLEN[key];
    const oo = o || {};
    const who = key === 'A' ? CREW.games.figures[sz.fig].name + ' über sich' : key === 'B' ? CREW.games.figures[sz.freund].name + ' (Freund:in)' : key === 'C' ? 'Lehrkraft' : 'Tatsachen';
    const el = h('div', { class: 'brille' + (oo.small ? ' small' : ''), 'data-brille': key },
      h('div', { class: 'row between' }, h('span', { class: 'brille-tag' }, CREW.icon(b.icon, 18), ' ' + b.name), ctx.readBtn(b.name + ', ' + who + ': ' + sz.views[key])),
      h('span', { class: 'muted small' }, who),
      h('p', { class: oo.small ? 'small' : '' }, sz.views[key]));
    el.style.setProperty('--bc', b.colour);
    return el;
  };

  /* Nur den eigenen Teil zeigen */
  function slice(ctx, role, sz) {
    if (BRILLEN[role]) {
      const b = BRILLEN[role];
      return h('div', { class: 'stack' },
        role === 'D' ? ctx.figureCard({ fig: sz.fig, mood: 'neutral', text: sz.text, eyebrow: 'Die Szene', size: 72 }) : h('div', { class: 'card row', style: { gap: '10px' } }, CREW.games.avatar(sz.fig, role === 'A' ? 'traurig' : 'neutral', 56), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Die Szene'), h('b', null, sz.text))),
        brilleCard(ctx, role, sz),
        h('p', { class: 'muted small' }, 'Nur du siehst diese Brille. ' + (role === 'D' ? 'Lies die Tatsachen vor, wenn die anderen fragen – und nur die.' : 'Erzähl den anderen, was ' + (role === 'A' ? 'die Figur über sich' : role === 'B' ? 'die Freundin' : 'die Lehrkraft') + ' sagt.')));
    }
    return h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Du hast keine Brille. Deine Aufgabe:'),
      h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass jede Brille einmal vorgelesen wird.'), h('li', null, 'Frag: „Passt der Chip auch zu den Tatsachen (D)?“'), h('li', null, 'Am Ende: Welche Brille war am strengsten?')),
      h('p', { class: 'muted small' }, 'Szene: ' + sz.text));
  }

  /* Zwei Chips wählen und prüfen. Rückgabe { ok, tries } */
  async function chipsWaehlen(ctx, sz, role) {
    const chips = ctx.rshuffle(sz.chips);
    const correct = chips.filter((c) => c.fits === 'ABCD');
    let tries = 0;
    for (;;) {
      tries++;
      const picked = [];
      const count = h('span', { class: 'pill' }, '0 von 2 gewählt');
      const row = h('div', { class: 'row', style: { gap: '8px' } }, chips.map((c) => {
        const b = h('button', { type: 'button', class: 'chip', 'data-chip': c.t }, c.t);
        b.addEventListener('click', () => {
          CREW.sound.play('tap');
          const idx = picked.indexOf(c);
          if (idx >= 0) picked.splice(idx, 1); else if (picked.length < 2) picked.push(c); else return;
          b.classList.toggle('sel', picked.includes(c));
          count.textContent = picked.length + ' von 2 gewählt';
        });
        return b;
      }));
      const wrap = ctx.scr([
        ctx.say('Welche zwei Sätze passen zu ALLEN vier Brillen? Redet, bis ihr euch einig seid.', { eyebrow: 'Gemeinsam lösen · Versuch ' + tries, small: true }),
        h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Sechs Sätze, zwei passen überall'), count), row, sz.note ? h('p', { class: 'muted small' }, sz.note) : null),
      ], { eyebrow: 'Lösung', badge: h('div', { class: 'row', style: { gap: '6px' } }, ctx.stufe(2, LEVELS), h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role)) });
      if (ctx.auto) {
        const want = tries >= 2 ? correct.slice(0, 2) : [chips[0], chips[1]];
        want.forEach((c) => row.querySelector('[data-chip="' + c.t.replace(/"/g, '\\"') + '"]').click());
      }
      const r = await ctx.next(wrap, 'Prüfen', { id: 'btn-check' });
      if (r === ctx.SKIP) return { ok: false, tries, skipped: true };
      if (picked.length === 2 && picked.every((c) => c.fits === 'ABCD')) { CREW.sound.play('great'); return { ok: true, tries }; }
      // Noch nicht: Welcher Chip passt nicht zu welcher Brille? (ohne das Richtige zu verraten)
      const wrong = picked.filter((c) => c.fits !== 'ABCD');
      // Rückmeldung ohne Inhalt der anderen Brillen: nur, WEN man fragen soll
      const fragen = Array.from(new Set(wrong.flatMap((c) => 'ABCD'.split('').filter((k) => !c.fits.includes(k))))).sort();
      const hint = wrong.length ? 'Fragt ' + fragen.join(', ') + ': Passt das zu dir? Erst vorlesen, dann tippen.' : 'Ihr braucht genau zwei Sätze.';
      CREW.sound.play('soft');
      const w2 = ctx.scr([ctx.say('Noch nicht. ' + hint, { eyebrow: 'Noch nicht', small: true }), tries >= 3 ? h('p', { class: 'muted small' }, 'Dritter Versuch. Die Auflösung kommt gleich am Beamer – lest sie zusammen laut.') : null], { eyebrow: 'Lösung', center: true });
      await ctx.next(w2, 'Nochmal');
      if (tries >= 3) return { ok: false, tries };
    }
  }

  CREW.registerGame({
    id: 'zwei-brillen',
    szenen: SZENEN, // für den Test: Lösung gegen Quellen prüfen
    template: 'T2',
    icon: 'eye',
    themen: ['Selbstbild', 'Fremdbild', 'Tatsache vs. Urteil', 'Zuhören'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Vier iPads, vier Brillen auf dieselbe Szene. Hört zu, findet zwei Sätze, die durch alle Brillen stimmen – und einen fairen Satz für die Figur.',
        levels: LEVELS,
        steps: [
          { icon: 'user', title: 'A: Eigene Brille', text: 'Wie die Figur sich selbst sieht.' },
          { icon: 'users', title: 'B + C', text: 'Freund:in und Lehrkraft.' },
          { icon: 'check', title: 'D: Tatsachen', text: 'Nur, was man zählen kann.' },
        ],
        probe: ctx.T.probeCard('Probe: Mika sagt „Ich bin immer zu spät.“ Die Tatsachen sagen „Einmal diese Woche.“ Welcher Satz passt zu beiden? Tippt irgendwas – zählt nicht.', [{ label: '„Mika war diese Woche einmal zu spät“', value: 1, variant: 'ghost' }, { label: '„Mika ist unzuverlässig“', value: 2, variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      const role = await ctx.T.roleSetup({
        roles: { A: { name: 'Eigene Brille', desc: 'Du siehst, wie die Figur sich selbst sieht. Lies es vor – so streng, wie es dasteht.' }, B: { name: 'Freund:in', desc: 'Du siehst, wie eine Freundin oder ein Freund die Szene sieht.' }, C: { name: 'Lehrkraft', desc: 'Du siehst die Szene mit den Augen der Lehrkraft.' }, D: { name: 'Nur Tatsachen', desc: 'Du hast Zahlen und Fakten. Keine Meinung. Lies nur vor, was dasteht.' } },
        observer: { name: 'Beobachter:in', desc: 'Keine Brille. Du achtest darauf, dass jede Brille zu Wort kommt.' },
      });
      // Stunde: j1-e05 (Selbst- und Fremdbild) oder j1-e18 (Tatsache vs. Urteil)
      const wu = ctx.scr([ctx.say('Welche Stunde ist heute?', { eyebrow: 'Vorbereitung', small: true })], { eyebrow: 'Vorbereitung', center: true });
      const set = await ctx.ask(wu, [{ label: 'Zwischen laut und leise (j1-e05)', value: 'e05', variant: 'ghost', icon: 'users' }, { label: 'Der kritische Detektiv (j1-e18)', value: 'e18', variant: 'ghost', icon: 'sparkle' }]);
      const detektiv = set === 'e18';
      const szenen = ctx.rshuffle(SZENEN).slice(0, 2);
      let solved = 0, tries = 0, fair = 0;
      for (let i = 0; i < szenen.length; i++) {
        const sz = szenen[i];
        const name = CREW.games.figures[sz.fig].name;
        const w = ctx.scr([slice(ctx, role, sz), h('p', { class: 'muted small' }, 'Erst alle vier Brillen vorlesen (A zuerst, D zuletzt). Dann tippt jedes iPad „Zu den Sätzen“.')],
          { eyebrow: 'Szene ' + (i + 1) + '/' + szenen.length + ' · ' + sz.titel, badge: h('div', { class: 'row', style: { gap: '6px' } }, ctx.stufe(1, LEVELS), h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role)) });
        const go = await ctx.next(w, 'Zu den Sätzen');
        if (go === ctx.SKIP) continue;
        const r = await chipsWaehlen(ctx, sz, role);
        tries += r.tries;
        if (r.skipped) continue;
        if (r.ok) solved++;
        // Auflösung: alle vier Brillen nebeneinander, Strenge-Skala – die eigene Brille ist die strengste
        const order = ['A', 'B', 'C', 'D'];
        const w3 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill ' + (r.ok ? 'good' : ''), style: { fontSize: '1.05em' } }, r.ok ? 'Gefunden: ' + sz.chips.filter((c) => c.fits === 'ABCD').slice(0, 2).map((c) => '„' + c.t + '“').join(' und ') : 'Durch alle Brillen passen: ' + sz.chips.filter((c) => c.fits === 'ABCD').slice(0, 2).map((c) => '„' + c.t + '“').join(' und '))),
          h('div', { class: 'brillen-grid' }, order.map((k) => brilleCard(ctx, k, sz, { small: true }))),
          h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Wie streng urteilt jede Brille?'), h('span', { class: 'muted small' }, 'Die eigene Brille ist fast immer die strengste.')),
            h('div', { class: 'stack', style: { gap: '6px' } }, order.map((k) => { const m = ctx.meter({ value: sz.strenge[k], label: BRILLEN[k].name }); return m.el; }))),
          detektiv ? ctx.say('Detektiv-Frage: Welcher Satz aus Brille A ist ein Urteil? Welche Tatsache aus D steckt dahinter? Einer sagt es laut.', { eyebrow: 'j1-e18 · Tatsache oder Urteil?', small: true }) : ctx.say('Kurz reden: Was weiß Brille A nicht, was B, C und D wissen? Warum sieht ' + name + ' sich so streng?', { eyebrow: 'Kurz reden', small: true }),
        ], { eyebrow: 'Szene ' + (i + 1) + ' · Auflösung', badge: ctx.stufe(2, LEVELS) });
        await ctx.next(w3, 'Fairer Satz');
        // Level 3: Fairer Satz – wahr UND freundlich (nicht streng, nicht schöngeredet)
        const opts = ctx.rshuffle(sz.fair);
        const wF = ctx.scr([
          h('div', { class: 'card row', style: { gap: '10px' } }, CREW.games.avatar(sz.fig, 'traurig', 56), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Die eigene Brille sagt'), h('b', null, '„' + sz.views.A.split('.')[0] + '.“'))),
          ctx.say('Welchen Satz könnte ' + name + ' sich stattdessen sagen – fair UND wahr? Redet, dann tippt jedes iPad.', { eyebrow: 'Fairer Satz', small: true }),
        ], { eyebrow: 'Szene ' + (i + 1) + ' · Fairer Satz', badge: ctx.stufe(3, LEVELS) });
        const fk = await ctx.ask(wF, opts.map((o, j) => ({ label: '„' + o.t + '“', value: j, variant: 'ghost', id: 'zb-fair-' + j })), { autoPick: ctx.auto ? () => opts.findIndex((o) => o.k === 'fair') : undefined });
        if (fk !== ctx.SKIP) {
          const o = opts[fk];
          if (o.k === 'fair') { fair++; CREW.sound.play('great'); }
          const wR = ctx.scr([
            ctx.figureCard({ fig: sz.fig, mood: o.k === 'fair' ? 'froh' : o.k === 'streng' ? 'traurig' : 'neutral', text: '„' + o.t + '“', eyebrow: o.k === 'fair' ? 'Freundliche Stimme' : o.k === 'streng' ? 'Strenge Brille' : 'Schöngeredet' }),
            h('div', { class: 'card stack soft' }, h('b', null, FAIR_FB[o.k]), o.k === 'fair' ? null : h('p', { class: 'muted small' }, 'Fair wäre: „' + sz.fair.find((x) => x.k === 'fair').t + '“')),
          ], { eyebrow: 'Szene ' + (i + 1) + ' · Fairer Satz', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(wR, i + 1 < szenen.length ? 'Nächste Szene' : 'Fertig');
        }
      }
      return { summary: solved === szenen.length ? 'Alle Sätze gefunden. Die eigene Brille ist die strengste – ein fairer Satz ist wahr UND freundlich.' : 'Vier Brillen, eine Szene. Die Tatsachen sind kleiner als die eigene Brille.', stats: [[solved, 'Szenen gelöst'], [fair, 'faire Sätze gefunden']] };
    },
  });
})();
