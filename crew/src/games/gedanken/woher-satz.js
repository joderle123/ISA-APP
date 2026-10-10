/* Spiel „Woher kommt der Satz?“ (Thema: Gedanken & Glaubenssätze) · Vorlage T1 Solo + Austausch · j1-e17
   Bewusst nur Figuren, nie eigene Sätze: Vier Teen-Figuren mit bremsenden Sätzen und je drei Hinweis-Schnipseln,
   die wie echte Chats, Feeds und Hefte aussehen (ein Spruch, ein Vergleich, eine einzige blöde Erfahrung –
   nichts Gewaltnahes). Du tippst die Quelle an (Detektiv-Hinweis: Der Satz klingt fast wie ein Zitat), dann
   „Stimmt der Satz heute noch?“, dann zeigt das iPad, was die Figur seitdem geschafft hat. Zum Schluss bekommt
   der Satz ein Update (v2.0): fair, nicht schöngeredet. Knopf „Kenne ich“ ohne Zählung: „Du bist damit nicht allein.“
   Danach die Vergleichskarte zu zweit – nur über die Figuren. Nach der privaten Übung der Stunde bewusst entlastend. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Quelle finden', 'Heute prüfen', 'Update'];
  const ARTEN = { spruch: 'Ein Spruch', vergleich: 'Ein Vergleich', erfahrung: 'Eine blöde Erfahrung' };

  /* Figuren: Satz (v1.0), seit wann, drei Schnipsel (genau einer ist die Quelle – dort stehen fast dieselben Worte),
     was die Figur seitdem geschafft hat, und drei mögliche Updates (fair / schöngeredet / immer noch Urteil). */
  const FIGUREN = [
    {
      id: 'luca', fig: 'luca', mood: 'traurig', satz: 'Ich bin halt nicht so schlau.', seit: 'seit Klasse 3', jahre: 5,
      schnipsel: [
        { art: 'vergleich', typ: 'chat', quelle: true, kopf: 'Familien-Chat', zeit: 'vor 5 Jahren', who: 'Papa', text: 'Dein Bruder hatte in der 3. nur Einsen. Du bist halt nicht so der Schlaue 😅', warum: 'Hier stehen fast dieselben Worte. Ein Vergleich, als Witz gemeint – Luca hat ihn behalten.' },
        { art: 'erfahrung', typ: 'note', kopf: 'Diktat-Heft', zeit: 'Klasse 4', text: 'Diktat: 5 · 23 Fehler · Bitte üben!', warum: 'Eine schlechte Note. Sie hat den Satz lauter gemacht – erfunden hat sie ihn nicht.' },
        { art: 'spruch', typ: 'feed', kopf: 'Glimmr', zeit: 'vor 2 Jahren', who: '@cousin.k', text: 'wenn luca mathe erklärt 🤡😂 #fail', likes: '41', warum: 'Ein fieser Spruch, später. Er hat gepasst – weil der Satz schon da war.' },
      ],
      geschafft: ['Bio-Test: 2 – nach drei Tagen Lernen', 'Gitarre: 12 Songs in einem Jahr', 'Erklärt Sam die Englisch-Hausaufgabe'],
      update: { fair: 'In Mathe brauche ich länger. Bio und Gitarre zeigen: Ich lerne, wenn ich dranbleibe.', schoen: 'Ich bin eigentlich ein Genie. Mathe ist einfach unter meinem Niveau.', urteil: 'In Mathe bin ich halt hoffnungslos. Der Rest zählt nicht.' },
    },
    {
      id: 'yara', fig: 'yara', mood: 'genervt', satz: 'Ich bin einfach zu viel.', seit: 'seit Klasse 5', jahre: 3,
      schnipsel: [
        { art: 'spruch', typ: 'chat', quelle: true, kopf: 'Chat mit Ex-Freundin', zeit: 'vor 3 Jahren', who: 'Jo', text: 'sorry aber du bist echt einfach zu viel manchmal 🙄', warum: 'Fast wörtlich der Satz. Ein Spruch im Streit – und er ist geblieben.' },
        { art: 'vergleich', typ: 'feed', kopf: 'Glimmr', zeit: 'jeden Tag', who: '@stille.wasser', text: 'Leise Menschen sind die tiefsten ✨ #introvert #vibes', likes: '9.3k', warum: 'Ein Feed, der leise feiert. Er vergleicht – die Worte kommen aber woanders her.' },
        { art: 'erfahrung', typ: 'note', kopf: 'Zeugnis', zeit: 'Klasse 6', text: 'Yara sollte sich im Unterricht mehr zurücknehmen.', warum: 'Ein Satz im Zeugnis. Er hat den alten Satz bestätigt – angefangen hat er nicht hier.' },
      ],
      geschafft: ['Leitet die Sitzung der Schülerzeitung', 'Ruft beim Handball das Team zusammen', 'Sam: „Ohne dich wär’s langweilig.“'],
      update: { fair: 'Ich bin manchmal laut. Beim Handball und in der Zeitung ist genau das gut.', schoen: 'Ich bin perfekt so. Alle anderen sind einfach zu leise.', urteil: 'Ich bin halt anstrengend. Das müssen die anderen aushalten.' },
    },
    {
      id: 'mika', fig: 'mika', mood: 'angst', satz: 'Ich kann nicht vor Leuten reden.', seit: 'seit Klasse 4', jahre: 4,
      schnipsel: [
        { art: 'spruch', typ: 'chat', kopf: 'Chat mit der Schwester', zeit: 'letztes Jahr', who: 'Schwester', text: 'lass lieber mich reden beim Elternabend 😅', warum: 'Ein Spruch, gut gemeint. Er hat Mika das Reden abgenommen – und den Satz gefüttert.' },
        { art: 'erfahrung', typ: 'feed', quelle: true, kopf: 'Klassenchat', zeit: 'vor 4 Jahren', who: '4B 🎭', text: 'mika beim theater: „ähhh…“ 😂 kann nicht vor leuten reden lol', likes: '17', warum: 'Eine einzige blöde Erfahrung, einmal Text vergessen. Und darunter stehen die Worte.' },
        { art: 'vergleich', typ: 'feed', kopf: 'Glimmr', zeit: 'vor 1 Jahr', who: '@referat.queen', text: 'Referat ohne Zettel, 1+ 👑 so geht das', likes: '2.1k', warum: 'Ein Vergleich mit einer Fremden. Er macht klein – die Quelle ist er nicht.' },
      ],
      geschafft: ['Sagt beim Fußball die Aufstellung an', 'Geschichts-Referat: 2-, mit Zettel', 'Erklärt jeden Tag acht Leuten die Spielregeln'],
      update: { fair: 'Vor der Klasse bin ich nervös. Mit Zettel und Üben klappt es.', schoen: 'Ich bin der geborene Redner. Nervös war ich noch nie.', urteil: 'Ich bin halt kein Redner-Typ. Das bleibt so.' },
    },
    {
      id: 'sam', fig: 'sam', mood: 'neutral', satz: 'Ich bin nicht kreativ.', seit: 'seit Klasse 2', jahre: 6,
      schnipsel: [
        { art: 'erfahrung', typ: 'note', kopf: 'Kunst-Mappe', zeit: 'Klasse 5', text: 'Thema verfehlt. Note 4.', warum: 'Eine schlechte Kunst-Note. Sie kam später – der Satz war schon da.' },
        { art: 'vergleich', typ: 'chat', kopf: 'Familien-Chat', zeit: 'vor 3 Jahren', who: 'Oma', text: 'Schaut euch das Bild von Sams Cousine an! 😍 So begabt!', warum: 'Ein Vergleich, der weh tut. Aber die Worte kommen nicht von hier.' },
        { art: 'spruch', typ: 'note', quelle: true, kopf: 'Zettel aus der Grundschule', zeit: 'Klasse 2', text: 'Sam ist eher praktisch, nicht so kreativ. Basteln lieber mit Hilfe.', warum: 'Ein Satz von einer Erwachsenen, in Klasse 2. Fast wörtlich der Glaubenssatz.' },
      ],
      geschafft: ['Baut im Bau-Spiel eine ganze Stadt mit Seilbahn', 'Erfindet Raps für die Klassenfahrt', 'Repariert Yaras Fahrrad mit Kabelbinder'],
      update: { fair: 'Malen ist nicht meins. Bauen, Reimen und Tüfteln schon – das ist auch kreativ.', schoen: 'Ich bin der kreativste Mensch der Welt.', urteil: 'Ich bin halt nur praktisch. Kreativ sind andere.' },
    },
  ];
  const UPDATE_FB = {
    fair: { ok: true, titel: 'Update installiert', t: (n) => 'Fair und wahr. Der Satz bleibt ehrlich – und lässt ' + n + ' Platz zum Wachsen.' },
    schoen: { ok: false, titel: 'Update abgebrochen', t: (n) => 'Klingt super – aber ' + n + ' glaubt es nicht. Schöngeredet hält nicht.' },
    urteil: { ok: false, titel: 'Update fehlgeschlagen', t: (n) => 'Da steckt noch das alte Urteil drin: „halt“, „nur“, „bleibt so“. ' + n + ' braucht einen fairen Satz.' },
  };
  const HEUTE = [
    { v: 'ja', label: 'Stimmt noch' },
    { v: 'teils', label: 'Teilweise' },
    { v: 'nein', label: 'Stimmt nicht mehr' },
  ];

  /* Ein Schnipsel als antippbare Karte im Chat-, Feed- oder Heft-Look */
  function schnipselEl(ctx, s, i) {
    const body = s.typ === 'chat'
      ? h('div', { class: 'ws-chat' }, h('span', { class: 'ws-who' }, s.who), h('span', { class: 'ws-bubble' }, s.text))
      : s.typ === 'feed'
        ? h('div', { class: 'ws-feed' }, h('div', { class: 'ws-feed-head' }, h('span', { class: 'ws-feed-ava' }), h('b', null, s.who)), h('p', null, s.text), h('span', { class: 'ws-likes' }, CREW.icon('heart', 14), ' ' + s.likes))
        : h('div', { class: 'ws-note' }, h('p', null, s.text));
    return h('button', { type: 'button', class: 'ws-snip', 'data-typ': s.typ, 'data-snip': String(i), 'aria-label': 'Schnipsel ' + (i + 1) + ': ' + s.kopf + ', ' + s.text },
      h('span', { class: 'ws-snip-head' }, h('b', null, s.kopf), h('span', { class: 'muted small' }, s.zeit)),
      body);
  }
  // Auf das Antippen einer Karte warten (X/Pass → SKIP). Auto-Modus: eine zufällige Karte.
  function tapOne(ctx, els, pickAuto) {
    return ctx.waitFor(new Promise((res) => {
      let done = false;
      els.forEach((el, i) => el.addEventListener('click', () => { if (done) return; done = true; CREW.sound.play('tap'); el.classList.add('picked'); res(i); }));
      if (ctx.auto) setTimeout(() => { const i = pickAuto != null ? pickAuto : Math.floor(ctx.autoRng() * els.length); if (els[i] && els[i].isConnected) els[i].click(); }, Math.max(40, window.__crewAutoDelay || 0));
    }));
  }

  // Satz-Karte: Figur, Satz v1.0, „Kenne ich“ (ohne Zählung, nichts wird gespeichert)
  function satzKarte(ctx, f, o) {
    const oo = o || {};
    const name = ctx.figures[f.fig].name;
    const note = h('p', { class: 'ws-kenne-note', hidden: true }, CREW.icon('heart', 18), h('span', null, 'Du bist damit nicht allein. Viele kennen so einen Satz. Er gehört trotzdem nicht zu dir.'));
    const kenne = oo.kenne === false ? null : CREW.ui.btn('Kenne ich', () => { note.hidden = false; kenne.disabled = true; }, { small: true, variant: 'ghost', icon: 'heart', id: 'ws-kenne', aria: 'Kenne ich – wird nicht gezählt' });
    return ctx.figureCard({
      fig: f.fig, mood: f.mood, text: '„' + f.satz + '“', eyebrow: oo.eyebrow || name + ' denkt oft',
      speakText: name + ' denkt oft: ' + f.satz,
      extra: h('div', { class: 'stack', style: { gap: '8px' } },
        h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill ws-version' }, 'Satz v' + (oo.version || '1.0') + ' · ' + f.seit), kenne),
        note),
    });
  }

  /* Schritt 1: Quelle finden. Rückgabe { hit, art } oder null (Pass) */
  async function quelle(ctx, f, ey, L) {
    const name = ctx.figures[f.fig].name;
    const els = f.schnipsel.map((s, i) => schnipselEl(ctx, s, i));
    const w = ctx.scr([
      h('div', { class: 'ws-top' }, satzKarte(ctx, f),
        ctx.say('Drei Schnipsel aus ' + name + 's Handy und Heften. Welcher ist die Quelle? Tipp: Ein Glaubenssatz klingt oft wie ein Zitat.', { eyebrow: 'Quelle antippen', small: true })),
      h('div', { class: 'ws-snips' }, els),
    ], { eyebrow: ey + ' · Quelle', badge: ctx.stufe(L, LEVELS) });
    const qi = f.schnipsel.findIndex((s) => s.quelle);
    const r = await tapOne(ctx, els, ctx.auto && ctx.autoRng() < 0.6 ? qi : null);
    if (r === ctx.SKIP) return null;
    const hit = r === qi;
    CREW.sound.play(hit ? 'good' : 'tick');
    // Auflösung: jede Karte bekommt ihren Stempel (Quelle / Verstärker) und einen Satz, warum
    const res = f.schnipsel.map((s, i) => {
      const el = schnipselEl(ctx, s, i);
      el.disabled = true;
      el.classList.add(s.quelle ? 'is-quelle' : 'is-echo');
      if (i === r) el.classList.add('picked');
      el.appendChild(h('span', { class: 'ws-stamp' }, s.quelle ? 'Quelle' : 'Verstärker'));
      return h('div', { class: 'stack', style: { gap: '6px' } }, el, h('p', { class: 'small ws-why' }, h('b', null, ARTEN[s.art] + ': '), s.warum));
    });
    const w2 = ctx.scr([
      h('div', { class: 'row center' }, h('span', { class: 'pill ' + (hit ? 'good' : '') , style: { fontSize: '1.1em' } }, hit ? 'Quelle gefunden' : 'Auch ein Puzzleteil – die Quelle war eine andere')),
      h('div', { class: 'ws-snips' }, res),
      ctx.say(hit ? 'Genau. Der Satz ist ein Zitat – jemand anderes hat ihn zuerst gesagt. Die anderen Schnipsel haben ihn nur lauter gemacht.' : 'Dein Schnipsel hat den Satz lauter gemacht. Die Worte selbst kommen aber von der Quelle. Ein Satz, viele Verstärker.', { eyebrow: 'Woher er kommt', small: true }),
    ], { eyebrow: ey + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
    await ctx.next(w2, 'Weiter');
    return { hit, art: f.schnipsel[qi].art };
  }

  /* Schritt 2: Stimmt der Satz heute noch? Dann: was die Figur seitdem geschafft hat – und nochmal fragen. */
  async function heute(ctx, f, ey) {
    const name = ctx.figures[f.fig].name;
    const w = ctx.scr([
      h('div', { class: 'ws-top' }, satzKarte(ctx, f, { kenne: false }),
        ctx.say('Der Satz ist von früher. ' + name + ' ist seitdem ' + f.jahre + ' Jahre älter. Was meinst du: Stimmt der Satz heute noch?', { eyebrow: 'Heute prüfen', small: true })),
    ], { eyebrow: ey + ' · Heute', badge: ctx.stufe(2, LEVELS) });
    const vorher = await ctx.ask(w, HEUTE.map((x) => ({ label: x.label, value: x.v, variant: 'ghost', id: 'ws-heute-' + x.v })));
    if (vorher === ctx.SKIP) return null;
    const feed = h('div', { class: 'ws-geschafft' },
      h('div', { class: 'row between' }, h('b', null, 'Was ' + name + ' seitdem geschafft hat'), ctx.readBtn('Was ' + name + ' seitdem geschafft hat: ' + f.geschafft.join('. '))),
      f.geschafft.map((g, i) => h('div', { class: 'ws-win enter-' + Math.min(3, i + 1) }, CREW.icon('check', 22), h('span', null, g))));
    const w2 = ctx.scr([
      h('div', { class: 'row' }, h('span', { class: 'pill' }, 'Du hattest: ' + HEUTE.find((x) => x.v === vorher).label)),
      h('div', { class: 'ws-top' }, feed,
        ctx.say('Und jetzt, mit diesen Beweisen? Du darfst deine Antwort ändern.', { eyebrow: 'Nochmal prüfen', small: true })),
    ], { eyebrow: ey + ' · Heute', badge: ctx.stufe(2, LEVELS) });
    CREW.sound.play('unlock');
    const nachher = await ctx.ask(w2, HEUTE.map((x) => ({ label: x.label, value: x.v, variant: x.v === vorher ? '' : 'ghost', id: 'ws-jetzt-' + x.v })));
    if (nachher === ctx.SKIP) return { vorher, nachher: vorher };
    const anders = nachher !== vorher;
    const w3 = ctx.scr([ctx.say((anders ? 'Umgedacht – genau dafür ist der Blick auf heute da. ' : 'Bei deiner Antwort geblieben – auch okay. ') + 'Alte Sätze prüfen heißt: Was weiß ich HEUTE? Der Satz ist ' + f.jahre + ' Jahre alt, ' + name + ' nicht stehen geblieben.', { eyebrow: 'Heute zählt', small: true })], { eyebrow: ey + ' · Heute', center: true, badge: ctx.stufe(2, LEVELS) });
    await ctx.next(w3, 'Weiter');
    return { vorher, nachher };
  }

  /* Schritt 3: Satz-Update v2.0 – fair, nicht schöngeredet. Rückgabe 'erster' | 'zweiter' | 'gezeigt' | null */
  async function update(ctx, f, ey) {
    const name = ctx.figures[f.fig].name;
    const opts = ctx.rshuffle(['fair', 'schoen', 'urteil']);
    const tried = [];
    for (let versuch = 1; versuch <= 2; versuch++) {
      const w = ctx.scr([
        h('div', { class: 'ws-top' }, h('div', { class: 'ws-update' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Satz-Update verfügbar · v2.0'), CREW.icon('download', 26)),
          h('p', { class: 'ws-old' }, h('s', null, '„' + f.satz + '“'), h('span', { class: 'muted small' }, ' v1.0 · ' + f.seit)),
          h('div', { class: 'stack', style: { gap: '4px' } }, h('b', { class: 'small' }, 'Neu seit v1.0:'), f.geschafft.map((g) => h('span', { class: 'small ws-patch' }, '+ ' + g)))),
        ctx.say('Welches Update installiert ' + name + '? Fair heißt: wahr und freundlich – nicht schöngeredet.', { eyebrow: 'Update wählen', small: true })),
      ], { eyebrow: ey + ' · Update', badge: ctx.stufe(3, LEVELS) });
      const left = opts.filter((k) => !tried.includes(k));
      const r = await ctx.ask(w, left.map((k) => ({ label: '„' + f.update[k] + '“', value: k, variant: 'ghost', id: 'ws-upd-' + k })), { autoPick: () => (versuch > 1 ? 'fair' : left[0]) });
      if (r === ctx.SKIP) return null;
      tried.push(r);
      const fb = UPDATE_FB[r];
      // Installations-Balken: kurz, dann das Ergebnis
      const bar = h('div', { class: 'ws-install' }, h('i'));
      ctx.scr([h('div', { class: 'ws-update center' }, h('b', null, 'Installiere v2.0 …'), bar, h('p', { class: 'muted small' }, '„' + f.update[r] + '“'))], { eyebrow: ey + ' · Update', center: true });
      requestAnimationFrame(() => bar.classList.add('run'));
      await ctx.hold(1300);
      CREW.sound.play(fb.ok ? 'great' : 'soft');
      const w2 = ctx.scr([
        h('div', { class: 'ws-result' + (fb.ok ? ' ok' : '') }, CREW.icon(fb.ok ? 'check' : 'x', 34), h('h2', null, fb.titel)),
        ctx.figureCard({ fig: f.fig, mood: fb.ok ? 'froh' : 'neutral', text: fb.ok ? '„' + f.update.fair + '“' : fb.t(name), eyebrow: fb.ok ? name + ' denkt jetzt · v2.0' : 'Hm' }),
        fb.ok ? h('p', { class: 'muted' }, fb.t(name)) : null,
        fb.ok ? h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Die freundliche Stimme“')) : null,
      ], { eyebrow: ey + ' · Update', badge: ctx.stufe(3, LEVELS) });
      if (fb.ok) { await ctx.next(w2, 'Weiter'); return versuch === 1 ? 'erster' : 'zweiter'; }
      if (versuch === 2) { await ctx.next(w2, 'Faires Update zeigen'); break; }
      const again = await ctx.ask(w2, [{ label: 'Faires Update zeigen', value: 'show', variant: 'ghost', auto: false }, { label: 'Nochmal wählen', value: 'again', iconRight: 'undo', id: 'ws-nochmal' }]);
      if (again === ctx.SKIP) return null;
      if (again === 'show') break;
    }
    const w3 = ctx.scr([
      h('div', { class: 'ws-result ok' }, CREW.icon('check', 34), h('h2', null, 'Das faire Update')),
      ctx.figureCard({ fig: f.fig, mood: 'froh', text: '„' + f.update.fair + '“', eyebrow: name + ' · v2.0' }),
      h('p', { class: 'muted' }, 'Nicht perfekt, nicht hoffnungslos – ehrlich. So klingt die freundliche Stimme.'),
    ], { eyebrow: ey + ' · Update', badge: ctx.stufe(3, LEVELS) });
    await ctx.next(w3, 'Weiter');
    return 'gezeigt';
  }

  CREW.registerGame({
    id: 'woher-satz',
    figuren: FIGUREN, // für den Test: CREW.games.get('woher-satz').figuren
    template: 'T1',
    icon: 'sparkle',
    themen: ['Glaubenssätze', 'Quellen', 'Heute prüfen', 'Entlastung'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Drei Figuren, drei alte Sätze. Du findest heraus, woher jeder Satz kommt – und ob er heute noch stimmt. Nur Figuren, nie du.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Quelle finden', text: 'Chat, Feed oder Heft: Wo kommt der Satz her?' },
          { icon: 'calendar', title: 'Heute prüfen', text: 'Stimmt er noch? Dann siehst du, was die Figur geschafft hat.' },
          { icon: 'download', title: 'Update', text: 'Der Satz bekommt v2.0: fair, nicht schöngeredet.' },
        ],
        probe: ctx.T.probeCard('Probe: Sam denkt „Ich bin immer zu spät“. Ein Schnipsel: Opa sagt „Unser Sam, immer zu spät!“ Quelle? Tipp irgendwas – zählt nicht.', [{ label: 'Ja, Quelle', value: 1, variant: 'ghost', icon: 'check' }, { label: 'Nein', value: 2, variant: 'ghost', icon: 'x' }]),
      });
      await ctx.T.codeCheck();
      // Drei der vier Figuren per Tagescode – gleich auf allen iPads, damit die Vergleichskarte passt
      const liste = ctx.rshuffle(FIGUREN).slice(0, 3);
      let gefunden = 0, umgedacht = 0, updates = 0;
      const ergebnisse = [];
      for (let i = 0; i < liste.length; i++) {
        const f = liste[i];
        const L = i + 1;
        const ey = 'Figur ' + (i + 1) + '/3';
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt prüfst du auch: Stimmt der Satz heute noch? Dann zeigt das iPad, was die Figur seitdem geschafft hat.' : 'Letzte Figur: Quelle, heute – und dann bekommt der Satz ein Update. Fair, nicht schöngeredet.' });
        const q = await quelle(ctx, f, ey, L);
        if (!q) { ergebnisse.push({ f, pass: true }); continue; }
        if (q.hit) gefunden++;
        const e = { f, hit: q.hit, art: q.art };
        if (L >= 2) {
          const hu = await heute(ctx, f, ey);
          if (hu) { e.heute = hu.nachher; if (hu.nachher !== hu.vorher) umgedacht++; }
        }
        if (L === 3) {
          const u = await update(ctx, f, ey);
          if (u) { e.update = u; if (u !== 'gezeigt') updates++; }
        }
        ergebnisse.push(e);
      }
      // Austausch zu zweit: dieselbe Vergleichskarte wie überall – nur über die Figuren
      if (ergebnisse.some((e) => !e.pass)) {
        await ctx.T.pairScreen({ badge: ctx.stufe(3, LEVELS) });
        await ctx.T.vergleich({
          title: 'Woher kommt der Satz? – Vergleichskarte',
          items: ergebnisse.map((e) => ({
            label: ctx.figures[e.f.fig].name + ': „' + e.f.satz + '“', icon: e.hit ? 'check' : 'eye',
            text: e.pass ? 'gepasst' : 'Quelle: ' + ARTEN[e.art].replace(/^Ein/, 'ein') + (e.hit ? ' (gefunden)' : '') + (e.heute ? ' · heute: ' + HEUTE.find((x) => x.v === e.heute).label.toLowerCase() : '') + (e.update ? ' · v2.0 installiert' : ''),
          })),
          questions: ['Welche Quelle hat dich am meisten überrascht – und warum?', 'Warum glauben Figuren alte Sätze so lange?'],
          note: 'Nur über die Figuren. Eigene Sätze bleiben bei dir – Pass ist okay.',
        });
      }
      const gespielt = ergebnisse.filter((e) => !e.pass).length;
      return {
        summary: gespielt ? 'Alte Sätze haben eine Quelle – und ein Datum. Heute darf man nachprüfen.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[gefunden, 'Quellen gefunden'], [umgedacht, 'mal umgedacht'], [updates, 'faires Update']],
        help: true,
        extra: h('p', { class: 'muted small' }, 'Wenn dich ein eigener Satz nicht loslässt: Reden hilft. Die Nummern unten sind für dich.'),
      };
    },
  });
})();
