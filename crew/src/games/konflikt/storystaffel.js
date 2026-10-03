/* Spiel „Story-Staffel: Der Streit“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T5 Gerät weitergeben · j1-e24
   Ein Alltagsstreit zwischen zwei Figuren startet mit Hitze-Meter. Das iPad wandert im Kreis: „Nur du schaust“ –
   drei Züge als Icons (Klartext / Angriff / Abtauchen) mit Satzanfang als Tipp. Nach jedem Zug reagiert die andere
   Figur, die Hitze ändert sich; die Reaktions-Karte wird allen gezeigt (vorgelesen oder per Beamer-Spiegelung).
   Ziel: in höchstens sechs Zügen zum Deal. Jede Person baut auf dem Zug der vorigen auf. Ab 95 knallt es –
   Zurückspulen statt „falsch“. Clash, nur die ganze Crew steuert nacheinander.
   Einheit j1-e24: Einstieg „Welches Tier hat bei euch gespielt?“ (Konflikt-Tiere) und Regel „unter 70, bevor geredet wird“ (Skill-Zug). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const MAX_ZUEGE = 6;
  const DEAL_UNTER = 35;      // Deal möglich, wenn die Hitze darunter liegt, der letzte Zug Klartext war und mindestens drei Züge liefen
  const KNALL_AB = 95;        // Eskalation: Zurückspulen

  // Die drei Züge: Icon, Satzanfang als Tipp, Wirkung auf die Hitze
  const ZUEGE = {
    klartext: { id: 'klartext', label: 'Klartext', icon: 'chat', tipp: '„Ich … weil … Lass uns …“', delta: -18, variant: 'good' },
    angriff: { id: 'angriff', label: 'Angriff', icon: 'bolt', tipp: '„Du immer … Du bist …“', delta: +20, variant: 'teamB' },
    abtauchen: { id: 'abtauchen', label: 'Abtauchen', icon: 'eyeOff', tipp: '„Ist egal … Lass mich …“', delta: -4, variant: 'ghost' },
  };

  // Konflikt-Tiere aus der Stunde (Einstiegsfrage, nur zum Reden)
  const TIERE = [
    { name: 'Hai', text: 'Will gewinnen, egal wie.' },
    { name: 'Schildkröte', text: 'Zieht den Kopf ein, geht weg.' },
    { name: 'Teddybär', text: 'Gibt nach, damit Ruhe ist.' },
    { name: 'Fuchs', text: 'Sucht schnell einen halben Deal.' },
    { name: 'Eule', text: 'Redet, fragt, sucht den Deal für beide.' },
  ];
  // Skill-Zug vor dem Reden (Anspannung unter 70 bringen)
  const SKILLS = [
    { id: 'atem', label: '3-mal tief atmen', delta: -14 },
    { id: 'raus', label: 'Kurz raus, Wasser trinken', delta: -18 },
    { id: 'zaehlen', label: 'Bis 10 zählen, Hände locker', delta: -12 },
    { id: 'satz', label: 'Innerer Satz: „Ich bleib ruhig“', delta: -10 },
  ];

  /* Szenen: A = die Figur, die die Crew steuert; B = die andere Figur.
     zuege[typ] = Varianten (Satz von A + Reaktion von B), rotieren pro Zug.
     reaktionHeiss = B, wenn die Hitze schon hoch ist (> 70). deal = Schluss-Szene. knall = Eskalation. */
  const SZENEN = [
    {
      id: 'kopfhoerer', title: 'Die Kopfhörer', A: 'mika', B: 'luca', hitze: 74,
      start: 'Luca hat sich Mikas Kopfhörer geliehen – ohne zu fragen. Jetzt ist ein Ohrpolster kaputt. Mika kommt rein, Luca hat sie noch auf.',
      zuege: {
        klartext: [
          { say: 'Ich bin sauer. Das sind meine Kopfhörer, und du hast nicht gefragt. Ich will, dass du vorher fragst.', react: 'Okay … stimmt. Ich hab gedacht, ist nicht so wild. Sorry, dass ich nicht gefragt hab.' },
          { say: 'Mich stört vor allem das kaputte Polster. Wie kriegen wir das hin?', react: 'Ich kann ein neues bestellen. Kostet nicht viel. Ich zahl das.' },
          { say: 'Ich brauch sie heute Abend zum Zocken. Lass uns was ausmachen.', react: 'Klar. Heute Abend hast du sie. Und ich frag ab jetzt.' },
        ],
        angriff: [
          { say: 'Du nimmst immer alles einfach! Du bist so respektlos.', react: 'Boah, jetzt reg dich ab. Als ob du nie was von mir nimmst!' },
          { say: 'Mit dir kann man nichts teilen. Du machst alles kaputt.', react: 'Dann behalt doch deinen Kram! Ich brauch dich nicht.' },
          { say: 'Du bist echt das Letzte.', react: 'Weißt du was? Ich bin raus.' },
        ],
        abtauchen: [
          { say: 'Ist egal. Behalt sie halt.', react: 'Hä? Okay … Wenn du meinst.' },
          { say: 'Lass mich einfach in Ruhe.', react: 'Was ist denn jetzt los? Sag halt was.' },
          { say: 'Mir doch egal.', react: 'Du bist komisch heute. Ich geh.' },
        ],
      },
      heiss: ['Luca schaut aufs Handy und antwortet nicht.', 'Luca: „Jetzt ist aber auch mal gut.“'],
      deal: 'Luca bestellt ein neues Polster. Mika hat die Kopfhörer heute Abend. Und: Fragen vor dem Nehmen – das gilt ab jetzt für beide.',
      knall: 'Luca knallt die Kopfhörer auf den Tisch und geht. Mika hat kaputte Kopfhörer UND Streit.',
    },
    {
      id: 'gruppenarbeit', title: 'Die Gruppenarbeit', A: 'yara', B: 'sam', hitze: 70,
      start: 'Morgen ist die Präsentation. Yara hat ihren Teil fertig, Sam hat noch nichts geschickt. Yara schreibt Sam im Chat, Sam ist online.',
      zuege: {
        klartext: [
          { say: 'Ich mach mir Stress, weil morgen Abgabe ist und dein Teil fehlt. Wie weit bist du?', react: 'Ehrlich? Ich hab’s nicht angefangen. Ich check das Thema nicht.' },
          { say: 'Ich will, dass wir das zusammen durchkriegen. Was brauchst du von mir?', react: 'Wenn du mir sagst, welche zwei Punkte rein müssen, mach ich die heute Abend.' },
          { say: 'Okay, dann teilen wir: Du machst Punkt 3 und 4, ich schau heute um 20 Uhr drüber.', react: 'Deal. Um 20 Uhr hast du’s. Danke, dass du nicht ausgerastet bist.' },
        ],
        angriff: [
          { say: 'Du bist so faul! Ich mach wie immer alles allein.', react: 'Dann mach’s doch allein, wenn du eh alles besser kannst.' },
          { say: 'Mit dir kann man nicht arbeiten. Du bist nutzlos.', react: 'Weißt du was? Trag mich aus der Gruppe aus. Mir egal.' },
          { say: 'Ich sag der Lehrerin, dass du nichts gemacht hast.', react: 'Petz doch. Dann sag ich, dass du mich nie gefragt hast.' },
        ],
        abtauchen: [
          { say: 'Egal. Ich mach deinen Teil halt auch noch.', react: 'Ähm … okay. Danke?' },
          { say: 'Vergiss es.', react: 'Was heißt das jetzt? Machst du’s oder ich?' },
          { say: 'Ist schon gut.', react: 'Sam ist offline.' },
        ],
      },
      heiss: ['Sam antwortet nur mit „ok“.', 'Sam: „Ich hab auch noch ein Leben.“'],
      deal: 'Sam macht Punkt 3 und 4 bis 20 Uhr, Yara schaut drüber. Morgen präsentieren beide. Yara hat gefragt statt alles allein zu machen.',
      knall: 'Sam verlässt die Gruppe im Chat. Yara steht morgen allein vor der Klasse.',
    },
    {
      id: 'bus', title: 'Der Platz im Bus', A: 'luca', B: 'yara', hitze: 66,
      start: 'Im Schulbus. Luca sitzt seit Wochen am Fenster hinten. Heute sitzt Yara da und hat die Tasche auf dem Platz daneben.',
      zuege: {
        klartext: [
          { say: 'Hey, ich sitz da normalerweise. Ich hätte gern den Fensterplatz – können wir tauschen?', react: 'Ach so. Ich wusste nicht, dass das dein Platz ist. Heute ist mir schlecht, deshalb Fenster.' },
          { say: 'Okay, wenn dir schlecht ist, versteh ich das. Kann ich wenigstens daneben sitzen?', react: 'Klar, ich nehm die Tasche weg. Sorry.' },
          { say: 'Lass uns abwechseln: heute du, morgen ich?', react: 'Passt. Morgen bist du dran.' },
        ],
        angriff: [
          { say: 'Das ist mein Platz. Weg da.', react: 'Steht dein Name drauf? Nein. Also.' },
          { say: 'Du denkst, dir gehört der Bus, oder?', react: 'Und du denkst, du bist der Boss hier. Setz dich woanders hin.' },
          { say: 'Räum deine blöde Tasche weg, sofort.', react: 'Fass sie an, und ich sag’s dem Fahrer.' },
        ],
        abtauchen: [
          { say: '… (Luca sagt nichts und bleibt im Gang stehen.)', react: 'Yara schaut raus. Der Bus fährt los.' },
          { say: 'Egal. Ich steh halt.', react: 'Hä? Es gibt doch Plätze.' },
          { say: 'Vergiss es.', react: 'Yara zuckt mit den Schultern.' },
        ],
      },
      heiss: ['Yara dreht die Musik lauter.', 'Yara: „Lass mich einfach in Ruhe.“'],
      deal: 'Heute sitzt Luca daneben, morgen am Fenster. Luca weiß jetzt, warum Yara dort saß – weil Luca gefragt hat.',
      knall: 'Der Busfahrer brüllt nach hinten. Beide müssen nach vorne. Keiner hat den Fensterplatz.',
    },
    {
      id: 'chat', title: 'Der Gruppenchat', A: 'sam', B: 'mika', hitze: 78,
      start: 'Sam sieht: Mika hat eine neue Gruppe gemacht – ohne Sam. Alle aus der Clique sind drin. Sam trifft Mika am Spind.',
      zuege: {
        klartext: [
          { say: 'Ich hab gesehen, dass es eine neue Gruppe gibt, ohne mich. Das tut weh. Warum?', react: 'Oh … Die ist für Noras Geburtstag. Nora hat gesagt, du magst sie nicht.' },
          { say: 'Ich mag Nora. Ich will dabei sein. Kannst du mich adden?', react: 'Klar. Ich dachte, du willst nicht. Sorry, hätte fragen sollen.' },
          { say: 'Nächstes Mal frag mich direkt, okay? Dann gibt’s kein Rätselraten.', react: 'Ja. Direkt fragen. Mach ich.' },
        ],
        angriff: [
          { say: 'Du bist so falsch. Hinter meinem Rücken Gruppen machen!', react: 'Ich bin falsch? Du redest doch über alle!' },
          { say: 'Ihr seid alle fake. Ich brauch euch nicht.', react: 'Dann ist ja gut, dass du nicht drin bist.' },
          { say: 'Ich mach jetzt auch eine Gruppe. Ohne dich.', react: 'Mach doch. Viel Spaß allein.' },
        ],
        abtauchen: [
          { say: 'Ist egal. Ich wollte eh nicht.', react: 'Okay … Also, wenn du mal willst, sag Bescheid.' },
          { say: '… (Sam schaut weg und geht.)', react: 'Mika steht am Spind und versteht nichts.' },
          { say: 'Lass gut sein.', react: 'Mika: „Was ist denn los mit dir?“' },
        ],
      },
      heiss: ['Mika tippt am Handy und schaut nicht hoch.', 'Mika: „Ich hab keine Lust auf Drama.“'],
      deal: 'Mika addet Sam in die Geburtstags-Gruppe. Das Missverständnis ist geklärt – weil Sam gesagt hat, was weh tat, statt zu raten.',
      knall: 'Sam schreibt wütende Nachrichten in den Klassenchat. Jetzt reden alle darüber. Nora auch.',
    },
    {
      id: 'screenshot', title: 'Der Screenshot', A: 'mika', B: 'sam', hitze: 82,
      start: 'Mika hat Sam privat etwas über die Lehrerin geschrieben. Sam hat einen Screenshot gemacht – und jetzt kursiert er in der Klasse. Mika stellt Sam in der Pause.',
      zuege: {
        klartext: [
          { say: 'Der Screenshot war privat. Ich bin richtig enttäuscht. Ich will wissen, wie das passiert ist.', react: 'Ich hab ihn nur Nora geschickt, als Witz. Dass sie ihn weiterschickt, wusste ich nicht. Es tut mir leid.' },
          { say: 'Ich brauch jetzt, dass du mir hilfst, das zu stoppen.', react: 'Ich schreib in die Gruppe, dass das von mir kam und nicht okay war. Und ich frag Nora, ob sie es löscht.' },
          { say: 'Okay. Und privat bleibt privat – kann ich mich darauf verlassen?', react: 'Ja. Kein Screenshot mehr, nie wieder. Versprochen.' },
        ],
        angriff: [
          { say: 'Du Verräter! Mit dir rede ich nie wieder.', react: 'Dann halt nicht. Du hast’s ja selbst geschrieben.' },
          { say: 'Du bist so hinterhältig. Alle sollen wissen, was du für einer bist.', react: 'Mach doch. Ich hab auch noch mehr Screenshots.' },
          { say: 'Ich hau dir eine rein, wenn das nicht aufhört.', react: 'Sam geht zum Lehrer.' },
        ],
        abtauchen: [
          { say: 'Egal. Ist eh schon rum.', react: 'Ähm, ja. Sorry halt.' },
          { say: '… (Mika dreht sich um und geht.)', react: 'Sam ruft hinterher, aber Mika hört nicht.' },
          { say: 'Mir ist alles egal.', react: 'Sam: „Dann ist ja gut.“' },
        ],
      },
      heiss: ['Sam verschränkt die Arme.', 'Sam: „Du drehst gleich durch, ich geh.“'],
      deal: 'Sam stellt es in der Gruppe klar und bittet um Löschen. Mika hat gesagt, was es ausgelöst hat – ohne zu drohen. Vertrauen muss neu wachsen, aber der Weg ist offen.',
      knall: 'Es gibt eine Rangelei, ein Lehrer greift ein. Der Screenshot ist immer noch da – und jetzt gibt’s auch noch Ärger.',
    },
    {
      id: 'fahrrad', title: 'Das Fahrrad', A: 'luca', B: 'mika', hitze: 68,
      start: 'Luca hat Mika das Fahrrad geliehen. Mika hat versprochen, es um 17 Uhr zurückzubringen. Jetzt ist es 18:30 Uhr, Luca hat das Training verpasst. Mika kommt angeradelt.',
      zuege: {
        klartext: [
          { say: 'Ich hab wegen dir das Training verpasst. Ich bin echt sauer. Was war los?', react: 'Mein Handy war leer und ich hab die Zeit vergessen. Das war Mist von mir. Sorry.' },
          { say: 'Ich brauch, dass sowas nicht nochmal passiert. Was schlägst du vor?', react: 'Nächstes Mal stell ich einen Wecker. Und wenn’s knapp wird, komm ich vorher.' },
          { say: 'Okay. Und für heute: Fahrst du mich morgen zur Schule, als Ausgleich?', react: 'Klar, hol ich dich ab. Danke, dass du’s mir so sagst.' },
        ],
        angriff: [
          { say: 'Auf dich ist einfach kein Verlass. Nie wieder krieg du was von mir.', react: 'Dann frag ich halt jemand anders. Kein Problem.' },
          { say: 'Du bist so egoistisch. Du denkst nur an dich.', react: 'Und du machst aus allem ein Drama.' },
          { say: 'Gib das Rad her und hau ab.', react: 'Mika wirft das Rad hin und geht.' },
        ],
        abtauchen: [
          { say: 'Ist schon okay. Egal.', react: 'Puh, cool. Dachte, du bist sauer.' },
          { say: 'Lass gut sein.', react: 'Mika: „Alles gut bei dir?“' },
          { say: '… (Luca nimmt das Rad wortlos.)', react: 'Mika weiß nicht, was los ist.' },
        ],
      },
      heiss: ['Mika guckt genervt zur Seite.', 'Mika: „Jetzt ist aber gut.“'],
      deal: 'Mika stellt nächstes Mal einen Wecker und fährt Luca morgen zur Schule. Luca hat gesagt, was es gekostet hat – und gefragt, statt zu drohen.',
      knall: 'Das Rad liegt auf dem Boden, Mika ist weg. Zwei Freunde, die eine Woche nicht reden.',
    },
    {
      id: 'spitzname', title: 'Der Spitzname', A: 'yara', B: 'luca', hitze: 72,
      start: 'Luca nennt Yara vor der ganzen Klasse „Streber-Yara“. Alle lachen. Nach der Stunde erwischt Yara Luca auf dem Flur.',
      zuege: {
        klartext: [
          { say: 'Der Name vor allen – das hat mich verletzt. Ich will, dass du damit aufhörst.', react: 'War nur Spaß … aber okay, wenn’s dich trifft, lass ich das.' },
          { say: 'Es ist kein Spaß, wenn nur die anderen lachen. Sag das bitte auch vor den anderen.', react: 'Hm. Ja, ist fair. Ich sag morgen, dass das nicht cool war.' },
          { say: 'Danke. Und wenn was ist, sag’s mir direkt, statt vor allen.', react: 'Mach ich. Direkt, nicht vor der Klasse.' },
        ],
        angriff: [
          { say: 'Du bist so ein Idiot. Kein Wunder, dass dich keiner mag.', react: 'Oh, Streber-Yara wird frech. Das sag ich allen.' },
          { say: 'Du bist dumm und neidisch, das ist alles.', react: 'Ja klar. Bye, Streberin.' },
          { say: 'Ich mach dich fertig, warte ab.', react: 'Luca filmt mit dem Handy: „Sag das nochmal.“' },
        ],
        abtauchen: [
          { say: 'Ist egal. Macht eh nichts.', react: 'Siehst du, war doch nur Spaß.' },
          { say: '… (Yara geht an Luca vorbei.)', react: 'Luca: „Streber-Yara redet nicht mehr mit uns!“ Gelächter.' },
          { say: 'Lass mich.', react: 'Luca zuckt mit den Schultern und geht.' },
        ],
      },
      heiss: ['Luca grinst und schaut zu den anderen.', 'Luca: „Jetzt übertreib mal nicht.“'],
      deal: 'Luca hört auf und sagt es morgen vor der Klasse. Yara hat die Grenze gezogen – ruhig und klar.',
      knall: 'Es gibt ein Video von Yaras Drohung. Jetzt ist Yara die „Aggressive“ – und der Spitzname bleibt.',
    },
  ];

  // Nächster Platz im Kreis
  const dreh = (z, n) => ((z + 1) % Math.max(1, n)) + 1;

  // Verlaufs-Karte: Start + bisherige Züge als Zeilen (für alle sichtbar)
  function verlauf(ctx, szene, log) {
    const A = ctx.figures[szene.A], B = ctx.figures[szene.B];
    return h('div', { class: 'card stack ss-verlauf' },
      h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Bisher'), ctx.readBtn(szene.start + ' ' + log.map((l) => A.name + ': ' + l.say + ' ' + B.name + ': ' + l.react).join(' '))),
      h('p', { class: 'muted small' }, szene.start),
      log.length ? h('div', { class: 'stack ss-log' }, log.map((l, i) => h('div', { class: 'ss-zug', 'data-zug': l.typ },
        h('span', { class: 'ss-zug-n' }, String(i + 1)),
        h('span', { class: 'ss-zug-ic' }, CREW.icon(ZUEGE[l.typ].icon, 18)),
        h('div', { class: 'stack', style: { gap: '2px' } }, h('b', { class: 'small' }, A.name + ': ' + l.say), h('span', { class: 'muted small' }, B.name + ': ' + l.react))))) : null);
  }

  CREW.registerGame({
    id: 'storystaffel',
    template: 'T5',
    icon: 'undo',
    themen: ['Konflikt-Treppe', 'Eskalation', 'Ich-Botschaft', 'Deal'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    async run(ctx) {
      const szene = ctx.rpick(SZENEN);
      const A = ctx.figures[szene.A], B = ctx.figures[szene.B];
      const n = Math.max(2, ctx.n || 6);

      await ctx.T.intro({
        rule: 'Ein Streit, ein iPad, die ganze Crew: Jede Person macht einen Zug und baut auf dem Zug davor auf. In sechs Zügen zum Deal.',
        steps: [
          { icon: 'eyeOff', title: 'Nur du schaust', text: 'Drei Züge: Klartext, Angriff, Abtauchen.' },
          { icon: 'undo', title: 'Weitergeben', text: 'Nach dem Zug zeigst du allen die Reaktion. Dann nach links.' },
          { icon: 'trophy', title: 'Deal', text: 'Hitze unter ' + DEAL_UNTER + ' und Klartext – fertig.' },
        ],
        probe: ctx.T.probeCard('Probe: ' + A.name + ' sagt „Du bist schuld!“ – welcher Zug ist das? Tippt einen, zählt nicht.', [
          { label: 'Klartext', value: 'k', variant: 'ghost', icon: 'chat' }, { label: 'Angriff', value: 'a', variant: 'ghost', icon: 'bolt' }, { label: 'Abtauchen', value: 'b', variant: 'ghost', icon: 'eyeOff' }]),
      });

      // Einstieg aus der Stunde (j1-e24): Konflikt-Tiere – nur zum Reden, nichts wird getippt
      const wT = ctx.scr([
        ctx.say('Welches Tier hat bei euch heute gespielt? Redet kurz. Pass ist okay.', { eyebrow: 'Aus der Stunde' }),
        h('div', { class: 'icon-cards' }, TIERE.map((t) => h('div', { class: 'icon-card' }, h('b', null, t.name), h('span', { class: 'muted small' }, t.text)))),
        h('p', { class: 'muted small' }, 'Im Spiel steuert ihr ' + A.name + '. Welches Tier ' + A.name + ' wird, entscheidet ihr – Zug für Zug.'),
      ], { eyebrow: 'Einstieg' });
      if ((await ctx.next(wT, 'Zur Szene')) === ctx.SKIP) { /* weiter, Einstieg ist freiwillig */ }

      // Die Szene am Beamer mit Hitze-Meter
      const meter = ctx.meter({ value: szene.hitze, label: 'Hitze' });
      let hitze = szene.hitze;
      const log = [];
      const w0 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: szene.A, mood: 'genervt', text: 'Ihr steuert ' + A.name + '.', eyebrow: 'Eure Figur' }),
          ctx.figureCard({ fig: szene.B, mood: 'genervt', text: B.name + ' reagiert auf jeden Zug.', eyebrow: 'Die andere Figur' })),
        ctx.say(szene.start, { eyebrow: szene.title + ' · So fängt es an' }),
        meter.el,
      ], { eyebrow: szene.title });
      if ((await ctx.next(w0, 'Staffel starten')) === ctx.SKIP) return { summary: 'Heute keine Staffel. Nächstes Mal.' };

      // Regel aus der Stunde: unter 70, bevor geredet wird – ein Skill-Zug für die Figur
      let skillUsed = null;
      if (hitze >= 70) {
        const wS = ctx.scr([
          ctx.figureCard({ fig: szene.A, mood: 'wut', text: A.name + ' ist bei ' + hitze + '. Über 70 redet niemand gut. Erst ein Skill, dann der erste Zug.', eyebrow: 'Unter 70, bevor geredet wird' }),
          meter.el,
        ], { eyebrow: 'Skill-Zug' });
        const s = await ctx.ask(wS, SKILLS.map((x) => ({ label: x.label, value: x.id, variant: 'ghost', icon: 'leaf' })));
        if (s !== ctx.SKIP) {
          skillUsed = SKILLS.find((x) => x.id === s);
          hitze = Math.max(0, hitze + skillUsed.delta);
          meter.set(hitze);
          CREW.sound.play('soft');
          await ctx.hold(600);
        }
      }

      // Die Staffel: bis zu sechs Züge im Kreis
      let seat = 1;
      let deal = false, knall = 0, rewinds = 0;
      const count = { klartext: 0, angriff: 0, abtauchen: 0 };
      for (let zug = 1; zug <= MAX_ZUEGE && !deal; zug++) {
        const c = await ctx.T.cover({
          who: 'Nur du schaust', eyebrow: 'Zug ' + zug + ' von ' + MAX_ZUEGE,
          hint: 'Die anderen schauen weg. Du wählst den nächsten Zug für ' + A.name + '.',
          extra: h('div', { class: 'row center' }, h('span', { class: 'pill' }, 'Hitze ' + hitze), h('span', { class: 'pill accent' }, 'Platz ' + seat)),
        });
        if (c === ctx.SKIP) { seat = dreh(seat, n); continue; }

        // Zug wählen: drei Icons mit Satzanfang als Tipp, Verlauf sichtbar
        const vorher = hitze;
        const wZ = ctx.scr([
          verlauf(ctx, szene, log),
          meter.el,
          ctx.say(log.length ? 'Bau auf dem letzten Zug auf. Was sagt ' + A.name + ' jetzt? Der Satzanfang ist dein Tipp.' : 'Der erste Zug. Was sagt ' + A.name + '? Der Satzanfang ist dein Tipp.', { eyebrow: 'Dein Zug', small: true }),
        ], { eyebrow: 'Zug ' + zug });
        const typ = await ctx.ask(wZ, Object.values(ZUEGE).map((z) => ({ label: z.label + ' · ' + z.tipp, value: z.id, icon: z.icon, variant: z.variant, id: 'zug-' + z.id })));
        if (typ === ctx.SKIP) { seat = dreh(seat, n); continue; }
        const vars = szene.zuege[typ];
        const v = vars[count[typ] % vars.length];
        count[typ]++;
        // Reaktion hängt von der Hitze ab: Abtauchen bei hoher Hitze bringt nichts, Klartext bei hoher Hitze weniger
        let delta = ZUEGE[typ].delta;
        if (typ === 'klartext' && hitze > 80) delta = -10;
        if (typ === 'abtauchen' && hitze > 70) delta = +6;
        let react = v.react;
        if (typ === 'abtauchen' && hitze > 70) react = szene.heiss[count.abtauchen % szene.heiss.length];
        hitze = Math.max(0, Math.min(100, hitze + delta));
        log.push({ typ, say: v.say, react });
        meter.set(hitze);

        // Es knallt: Zurückspulen statt „falsch“
        if (hitze >= KNALL_AB) {
          knall++;
          CREW.sound.play('soft');
          const wK = ctx.scr([
            h('div', { class: 'stop-big display' }, 'Es knallt!'),
            ctx.figureCard({ fig: szene.B, mood: 'wut', text: szene.knall, eyebrow: 'Hitze ' + hitze + ' · Eskalation' }),
            h('p', { class: 'muted' }, 'Kein „falsch“. Zurückspulen: Der Zug wird zurückgenommen, die nächste Person macht ihn anders.'),
          ], { eyebrow: 'Zug ' + zug });
          await ctx.next(wK, 'Zurückspulen', { id: 'btn-rewind' });
          rewinds++;
          log.pop();
          hitze = vorher;
          meter.set(hitze);
          seat = dreh(seat, n);
          continue;
        }

        // Reaktion für alle: Karte zeigen, vorlesen
        const mood = hitze >= 70 ? 'wut' : hitze >= 40 ? 'genervt' : 'froh';
        deal = typ === 'klartext' && hitze < DEAL_UNTER && log.length >= Math.min(3, MAX_ZUEGE); // mindestens drei Züge: die Staffel soll laufen
        const wR = ctx.scr([
          h('div', { class: 'ss-said', 'data-zug': typ }, CREW.icon(ZUEGE[typ].icon, 22), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, A.name + ' · ' + ZUEGE[typ].label), h('b', null, v.say))),
          ctx.figureCard({ fig: szene.B, mood, text: react, eyebrow: B.name + ' reagiert' }),
          meter.el,
          h('div', { class: 'row between' },
            h('span', { class: 'pill' + (delta < 0 ? ' good' : delta > 0 ? ' teamB' : '') }, 'Hitze ' + (delta > 0 ? '+' : '') + delta),
            h('span', { class: 'muted small' }, deal ? 'Deal in Reichweite!' : zug < MAX_ZUEGE ? 'Noch ' + (MAX_ZUEGE - zug) + (MAX_ZUEGE - zug === 1 ? ' Zug' : ' Züge') : 'Letzter Zug')),
          h('p', { class: 'muted small' }, 'Zeig die Karte allen oder lies sie vor. Dann weitergeben.'),
        ], { eyebrow: 'Zug ' + zug + ' · Reaktion' });
        await ctx.next(wR, deal ? 'Zum Deal' : 'Allen gezeigt');
        if (!deal && zug < MAX_ZUEGE) {
          seat = dreh(seat, n);
          await ctx.T.passOn({ direction: 'links', text: 'Gib das iPad nach links. Die nächste Person baut auf diesem Zug auf. Pass ist okay: einfach weitergeben.', extra: h('div', { class: 'row center' }, h('span', { class: 'pill' }, 'Hitze ' + hitze), h('span', { class: 'pill accent' }, 'Als Nächstes: Platz ' + seat)) });
        }
      }

      // Ende der Staffel: Deal oder nicht
      const wE = ctx.scr([
        deal ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Deal!') : null,
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: szene.A, mood: deal ? 'froh' : hitze >= 70 ? 'wut' : 'traurig', text: deal ? szene.deal : 'Kein Deal in ' + MAX_ZUEGE + ' Zügen. Hitze am Ende: ' + hitze + '. Der Streit geht morgen weiter.', eyebrow: deal ? 'So endet es' : 'Noch offen' }),
          ctx.figureCard({ fig: szene.B, mood: deal ? 'froh' : hitze >= 70 ? 'wut' : 'genervt', text: deal ? 'Danke, dass ihr geredet habt statt zu schießen.' : 'Ich hätte zugehört. Aber dafür hätte jemand Klartext reden müssen.', eyebrow: B.name })),
        verlauf(ctx, szene, log),
        h('div', { class: 'card stack soft' },
          h('b', null, 'Kurz reden, als Crew:'),
          h('p', { class: 'muted' }, 'Welcher Zug hat die Hitze am meisten gesenkt? Wo wurde es brenzlig? Es geht um ' + A.name + ', nicht um die Person, die getippt hat.')),
      ], { eyebrow: 'Ergebnis' });
      if (deal) { CREW.sound.play('great'); if (!ctx.fast) CREW.ui.confetti(120); }
      await ctx.next(wE, 'Fertig');
      return {
        summary: deal ? 'Deal in ' + log.length + (log.length === 1 ? ' Zug' : ' Zügen') + '. Klartext senkt die Hitze, die Crew hat’s gemeinsam geschafft.' : 'Kein Deal diesmal. Klartext senkt die Hitze, Angriff treibt sie hoch – nächste Staffel anders.',
        stats: [[count.klartext, 'Klartext'], [count.angriff, 'Angriff'], [count.abtauchen, 'Abtauchen'], [rewinds, 'zurückgespult']],
        again: true,
      };
    },
  });
})();
