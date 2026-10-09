/* Spiel „Frühwarn-Radar“ (Thema: Gefühle verstehen) · Vorlage T3 Zu zweit an einem iPad · j1-e09, j1-e11
   Eine Figur geht durch eine Szene, der Kipp-Balken steigt, Körper-Signale leuchten an einer Silhouette auf –
   erst leise (Kiefer fest), dann laut (Faust). Das Paar legt zwei Finger auf „Stopp“, wählt das Gefühl und einen
   Mini-Move, der bei dieser Zahl noch geht. Statt Punkten gibt es „gewonnene Sekunden“ bis zum Kipp-Punkt.
   Level: 1) Signal sehen (Signale mit Wort, Balken sichtbar), 2) Körper lesen (nur der Körper, Balken verdeckt,
   „Welches Signal kam zuerst?“), 3) Rechtzeitig handeln (Figur startet bei Gelb, Signale kommen schneller,
   der Mini-Move muss zur Zahl passen).
   Bewegungs-Variante „Signal-Stopp“ (j1-e09): Alle gehen durch den Raum, beim ersten Signal am Beamer einfrieren
   und eine Skill-Geste zeigen. Die Lehrkraft tippt nur „Alle stehen still“. Crew-Stern, wenn alle vor 70 stehen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Signal sehen', 'Körper lesen', 'Rechtzeitig handeln'];
  const SEK_PRO_SCHRITT = 5; // so viel Story-Zeit liegt zwischen zwei Signalen

  /* Körper-Signale: Zone an der Silhouette, Wort, leise oder laut */
  const SIG = {
    kiefer: { z: 'kiefer', t: 'Kiefer fest' },
    stirn: { z: 'kopf', t: 'Stirn kraus' },
    schultern: { z: 'schultern', t: 'Schultern hoch' },
    kribbeln: { z: 'haende', t: 'Hände kribbeln' },
    heiss: { z: 'kopf', t: 'Gesicht heiß', laut: true },
    faust: { z: 'haende', t: 'Fäuste', laut: true },
    stimme: { z: 'kiefer', t: 'Stimme wird laut', laut: true },
    vor: { z: 'beine', t: 'Geht nach vorn', laut: true },
    bauch: { z: 'bauch', t: 'Bauch flau' },
    kalt: { z: 'haende', t: 'Hände kalt und feucht' },
    herz: { z: 'brust', t: 'Herz klopft schneller' },
    trocken: { z: 'kiefer', t: 'Mund trocken' },
    wippen: { z: 'beine', t: 'Fuß wippt' },
    atem: { z: 'brust', t: 'Atem flach und schnell', laut: true },
    zittern: { z: 'haende', t: 'Hände zittern', laut: true },
    weg: { z: 'beine', t: 'Beine wollen weg', laut: true },
    leer: { z: 'kopf', t: 'Kopf leer', laut: true },
  };

  const GEFUEHLE = [
    { id: 'wut', label: 'Wut', icon: 'bolt' },
    { id: 'angst', label: 'Angst', icon: 'shield' },
    { id: 'scham', label: 'Scham', icon: 'eyeOff' },
    { id: 'aufregung', label: 'Aufregung', icon: 'star' },
  ];
  const GF = Object.fromEntries(GEFUEHLE.map((g) => [g.id, g]));

  /* Szenen. gruppe: wut (Level 1), angst (Level 2), schnell (Level 3: startet bei Gelb).
     beats: Story-Schritte mit Zahl und Signal. kipp = was passiert, wenn niemand stoppt. gut = mit passendem Mini-Move.
     auch = Gefühle, die man auch sehen kann (kein Fehler). warum = woran man das Gefühl erkennt. */
  const SZENEN = [
    { id: 'foul', gruppe: 'wut', fig: 'mika', gefuehl: 'wut', ort: 'Fußballplatz', start: 'Turnier. Ein Gegenspieler klebt die ganze Zeit an Mika und grinst.',
      beats: [
        { p: 25, s: 'kiefer', t: 'Erster Rempler. Der Gegner grinst. Mika beißt die Zähne zusammen.' },
        { p: 40, s: 'schultern', t: 'Zweiter Rempler. Der Schiri schaut weg.' },
        { p: 55, s: 'heiss', t: 'Der Gegner flüstert: „Heulst du gleich?“' },
        { p: 70, s: 'faust', t: 'Wieder ein Foul. Kein Pfiff.' },
        { p: 85, s: 'vor', t: 'Mika läuft direkt auf den Gegner zu.' },
      ],
      kipp: 'Mika schubst den Gegner. Rote Karte. Das Team spielt zu zehnt weiter.',
      gut: 'Mika merkt es, atmet aus und dreht ab. Zwei Minuten später spielt Mika den Pass zum Tor.',
      warum: 'Zähne, Schultern, heißes Gesicht: Der Körper macht sich bereit zum Kämpfen. Das ist Wut.', auch: [] },
    { id: 'bruder', gruppe: 'wut', fig: 'luca', gefuehl: 'wut', ort: 'Zuhause', start: 'Luca zockt. Der kleine Bruder will auch und drückt dauernd auf den Controller.',
      beats: [
        { p: 25, s: 'stirn', t: 'Der Bruder drückt auf Pause. „Ich will auch!“' },
        { p: 40, s: 'kiefer', t: 'Mama ruft: „Lass ihn halt mal, du bist der Ältere.“' },
        { p: 55, s: 'heiss', t: 'Der Bruder zieht am Kabel. Der Spielstand ist weg.' },
        { p: 70, s: 'stimme', t: 'Luca: „Raus aus meinem Zimmer!“ – lauter als gewollt.' },
        { p: 85, s: 'faust', t: 'Der Bruder lacht und rennt mit dem Controller weg.' },
      ],
      kipp: 'Luca wirft ein Kissen hinterher und trifft die Lampe. Jetzt gibt es richtig Ärger.',
      gut: 'Luca legt den Controller weg, atmet aus und sagt: „Zehn Minuten, dann bist du dran.“ Deal.',
      warum: 'Stirn, Kiefer, laute Stimme: Etwas fühlt sich unfair an. Das ist Wut.', auch: [] },
    { id: 'foto', gruppe: 'wut', fig: 'sam', gefuehl: 'wut', ort: 'Klassenchat', start: 'Im Klassenchat postet jemand ein altes Kinderfoto von Sam. Die ersten Lach-Emojis kommen.',
      beats: [
        { p: 25, s: 'kiefer', t: 'Drei Lach-Emojis. Sam starrt aufs Handy.' },
        { p: 40, s: 'schultern', t: 'Jemand schreibt: „Süüüß 😂“.' },
        { p: 55, s: 'heiss', t: 'Das Foto wird als Sticker weitergeschickt.' },
        { p: 70, s: 'faust', t: 'Sam drückt das Handy so fest, dass die Hände weh tun.' },
        { p: 85, s: 'vor', t: 'Sam steht auf und sucht den, der es gepostet hat.' },
      ],
      kipp: 'Sam schreibt Beleidigungen in den Chat. Jetzt reden alle über Sam statt über das Foto.',
      gut: 'Sam legt das Handy weg, trinkt Wasser und schreibt später der Person: „Lösch das bitte.“',
      warum: 'Heißes Gesicht, Fäuste: Sam will sich wehren. Das ist Wut – Scham kann auch dabei sein.', auch: ['scham'] },
    { id: 'unfair', gruppe: 'wut', fig: 'yara', gefuehl: 'wut', ort: 'Mathestunde', start: 'In Mathe redet jemand hinter Yara. Die Lehrerin schaut aber Yara an.',
      beats: [
        { p: 25, s: 'stirn', t: 'Lehrerin: „Yara, bitte leise.“ Yara hat nichts gesagt.' },
        { p: 40, s: 'kiefer', t: 'Hinter Yara wird gekichert.' },
        { p: 55, s: 'schultern', t: 'Lehrerin: „Noch einmal, Yara, und du gehst raus.“' },
        { p: 70, s: 'heiss', t: 'Die zwei hinter Yara grinsen.' },
        { p: 85, s: 'stimme', t: 'Yara will schon rufen: „Ich war das nicht!“' },
      ],
      kipp: 'Yara schreit die Lehrerin an und knallt das Heft hin. Eintrag. Die zwei hinten lachen.',
      gut: 'Yara atmet lang aus und sagt nach der Stunde ruhig: „Das war ich nicht. Das sollen Sie wissen.“',
      warum: 'Etwas ist ungerecht, der Kiefer geht zu, die Stimme will raus. Das ist Wut.', auch: [] },
    { id: 'referat', gruppe: 'angst', fig: 'yara', gefuehl: 'angst', ort: 'Klassenraum', start: 'Yara wartet aufs Referat. Noch drei Leute vor ihr.',
      beats: [
        { p: 25, s: 'bauch', t: 'Yara liest den ersten Satz zum fünften Mal.' },
        { p: 40, s: 'kalt', t: 'Noch zwei. Die Karteikarten werden feucht.' },
        { p: 55, s: 'herz', t: 'Noch einer. Yara hört das eigene Herz.' },
        { p: 70, s: 'atem', t: 'Lehrer: „Yara, du bist dran.“' },
        { p: 85, s: 'leer', t: 'Yara steht vorne. Der erste Satz ist weg.' },
      ],
      kipp: 'Yara sagt „Ich kann das nicht“ und setzt sich. Das Referat ist verschoben – die Angst nicht.',
      gut: 'Yara drückt die Füße in den Boden, atmet zweimal lang aus und liest den ersten Satz von der Karte.',
      warum: 'Bauch, kalte Hände, Herz: Der Körper will fliehen. Das ist Angst. Aufregung fühlt sich ähnlich an.', auch: ['aufregung'] },
    { id: 'bus', gruppe: 'angst', fig: 'luca', gefuehl: 'angst', ort: 'Bushaltestelle, abends', start: 'Es ist dunkel. Luca wartet auf den letzten Bus. Akku: 3 Prozent.',
      beats: [
        { p: 25, s: 'bauch', t: 'Der Bus ist schon fünf Minuten zu spät.' },
        { p: 40, s: 'herz', t: 'Akku: 1 Prozent. Dann ist das Handy aus.' },
        { p: 55, s: 'trocken', t: 'Zwei Leute stehen weiter weg und schauen rüber.' },
        { p: 70, s: 'atem', t: 'Ein Bus kommt – der falsche.' },
        { p: 85, s: 'weg', t: 'Luca will einfach loslaufen, egal wohin.' },
      ],
      kipp: 'Luca läuft los, im Dunkeln, ohne Plan. Zuhause machen sich alle Sorgen.',
      gut: 'Luca atmet aus, geht in den Kiosk nebenan und fragt, ob Luca kurz zu Hause anrufen darf.',
      warum: 'Bauch, Herz, trockener Mund, Beine wollen weg: Das ist Angst.', auch: [] },
    { id: 'party', gruppe: 'angst', fig: 'sam', gefuehl: 'angst', ort: 'Geburtstagsparty', start: 'Sam kommt zu einer Party. Sam kennt nur das Geburtstagskind.',
      beats: [
        { p: 25, s: 'bauch', t: 'Alle stehen in Grüppchen. Keiner schaut zu Sam.' },
        { p: 40, s: 'kalt', t: 'Das Geburtstagskind ist in der Küche verschwunden.' },
        { p: 55, s: 'wippen', t: 'Sam steht an der Wand und tut so, als wäre das Handy spannend.' },
        { p: 70, s: 'herz', t: 'Eine Gruppe lacht laut – genau in Sams Richtung.' },
        { p: 85, s: 'weg', t: 'Sam denkt nur noch: Raus hier.' },
      ],
      kipp: 'Sam geht ohne Tschüss. Zuhause denkt Sam: Nie wieder Party.',
      gut: 'Sam atmet aus, holt sich was zu trinken und fragt einen, der auch allein steht: „Woher kennst du sie?“',
      warum: 'Bauch, kalte Hände, Fuß wippt, will weg: Das ist Angst. Scham kann mitspielen.', auch: ['scham'] },
    { id: 'durchsage', gruppe: 'angst', fig: 'mika', gefuehl: 'angst', ort: 'Schulflur', start: 'Durchsage: „Mika aus der 7b bitte ins Sekretariat.“ Mika weiß nicht, warum.',
      beats: [
        { p: 25, s: 'bauch', t: 'Alle drehen sich zu Mika um.' },
        { p: 40, s: 'trocken', t: 'Der Flur ist lang und leer.' },
        { p: 55, s: 'herz', t: 'Hinter der Tür: Stimmen. Eine klingt wie Mikas Mutter.' },
        { p: 70, s: 'zittern', t: 'Mika klopft. Die Hand zittert.' },
        { p: 85, s: 'leer', t: 'Drinnen fragt jemand etwas. Mika versteht kein Wort.' },
      ],
      kipp: 'Mika rennt raus, bevor jemand etwas erklären kann. Dabei ging es nur um die vergessene Sportjacke.',
      gut: 'Mika atmet vor der Tür zweimal lang aus. Drinnen: Die Mutter bringt nur die vergessene Sportjacke.',
      warum: 'Bauch, trockener Mund, Zittern: Mika erwartet Ärger. Das ist Angst.', auch: [] },
    { id: 'kopfhoerer', gruppe: 'schnell', fig: 'mika', gefuehl: 'wut', ort: 'Pause', start: 'Mika ist schon genervt aufgewacht. In der Pause fehlen die Kopfhörer in der Tasche.',
      beats: [
        { p: 45, s: 'kiefer', t: 'Luca grinst: „Suchst du was?“' },
        { p: 60, s: 'heiss', t: 'Die Kopfhörer hängen um Lucas Hals.' },
        { p: 75, s: 'faust', t: 'Luca: „Leihst du doch eh jedem.“' },
        { p: 90, s: 'vor', t: 'Mika geht auf Luca zu.' },
      ],
      kipp: 'Mika reißt die Kopfhörer weg, das Kabel ist kaputt. Beide landen im Sekretariat.',
      gut: 'Mika drückt die Fäuste kurz zu, lässt los und sagt: „Gib sie zurück. Jetzt.“ Luca gibt sie.',
      warum: 'Schon genervt gestartet, dann Kiefer, heißes Gesicht, Fäuste: Wut – und sie war schneller da.', auch: [] },
    { id: 'impfung', gruppe: 'schnell', fig: 'sam', gefuehl: 'angst', ort: 'Arztpraxis', start: 'Sam hat Angst vor Spritzen. Heute ist Impfung. Sam kommt schon nervös an.',
      beats: [
        { p: 45, s: 'kalt', t: 'Die Arzthelferin ruft den Namen vor Sam auf.' },
        { p: 60, s: 'herz', t: 'Aus dem Zimmer hört man ein „Au!“' },
        { p: 75, s: 'atem', t: '„Sam, bitte.“' },
        { p: 90, s: 'weg', t: 'Die Spritze liegt auf dem Tablett.' },
      ],
      kipp: 'Sam springt auf und läuft raus. Neuer Termin – und die Angst ist noch größer.',
      gut: 'Sam drückt die Füße fest auf den Boden und atmet lang aus. Dann sagt Sam: „Ich hab Angst.“ Die Ärztin zählt mit.',
      warum: 'Kalte Hände, Herz, schneller Atem, will weg: Angst – und sie startet schon bei Gelb.', auch: [] },
    { id: 'abendessen', gruppe: 'schnell', fig: 'yara', gefuehl: 'wut', ort: 'Abendessen', start: 'Yara hatte schon Streit mit der Schwester. Beim Abendessen geht es weiter.',
      beats: [
        { p: 45, s: 'schultern', t: 'Die Schwester: „Wieder nicht abgespült, Prinzessin?“' },
        { p: 60, s: 'kiefer', t: 'Papa: „Hört auf, beide.“ Aber er schaut nur Yara an.' },
        { p: 75, s: 'heiss', t: 'Die Schwester grinst über den Teller.' },
        { p: 90, s: 'stimme', t: 'Yara holt Luft für einen Satz, der weh tun soll.' },
      ],
      kipp: 'Yara schreit einen Satz, der wirklich weh tut. Danach ist es still. Keiner isst mehr.',
      gut: 'Yara steht auf: „Ich brauch fünf Minuten.“ Kaltes Wasser in der Küche. Danach redet sie mit Papa.',
      warum: 'Schultern, Kiefer, heißes Gesicht, laute Stimme: Wut, die schon vorher geladen war.', auch: [] },
    { id: 'freizeitpark', gruppe: 'schnell', fig: 'luca', gefuehl: 'angst', ort: 'Freizeitpark', start: 'Luca hat im Freizeitpark die Gruppe verloren und ist schon ziemlich unruhig.',
      beats: [
        { p: 45, s: 'herz', t: 'Am Treffpunkt ist niemand.' },
        { p: 60, s: 'kalt', t: 'Das Handy hat kein Netz.' },
        { p: 75, s: 'atem', t: 'Überall fremde Leute und laute Musik.' },
        { p: 90, s: 'leer', t: 'Luca weiß nicht mehr, wo der Ausgang ist.' },
      ],
      kipp: 'Luca rennt kreuz und quer durch den Park und verliert dabei auch noch die Jacke.',
      gut: 'Luca bleibt stehen, Füße fest, ausatmen. Dann geht Luca zu einer Person mit Park-Uniform.',
      warum: 'Herz, kalte Hände, schneller Atem, Kopf leer: Angst.', auch: [] },
  ];

  /* Mini-Moves: Art entscheidet, bis zu welcher Zahl sie noch ziehen */
  const MOVES = [
    { id: 'atem', t: 'Länger aus- als einatmen', icon: 'leaf', art: 'koerper' },
    { id: 'faust', t: 'Fäuste ballen, 5 Sek. halten, lösen', icon: 'bolt', art: 'koerper' },
    { id: 'raus', t: 'Kurz raus, Wasser trinken', icon: 'right', art: 'raus' },
    { id: 'reden', t: 'Sagen: „Ich brauch kurz Pause.“', icon: 'chat', art: 'reden' },
    { id: 'kopf', t: 'Denken: „Ist nur ein Gedanke.“', icon: 'sparkle', art: 'kopf' },
  ];
  function moveFit(art, p) {
    if (art === 'koerper') return p < 90 ? 'gut' : 'halb';
    if (art === 'raus') return p >= 40 ? 'gut' : 'halb';
    if (art === 'reden') return p < 70 ? 'gut' : 'nein';
    return p < 40 ? 'gut' : p < 70 ? 'halb' : 'nein'; // kopf
  }
  function moveText(m, p, name) {
    const fit = moveFit(m.art, p);
    if (fit === 'gut') return { fit, t: m.art === 'raus' ? 'Passt. Bei ' + p + ' ist raus gehen stark: Abstand, Wasser, dann zurück.' : 'Passt. Bei ' + p + ' kommt das noch an. ' + name + ' gewinnt Zeit.' };
    if (fit === 'halb') {
      if (m.art === 'raus') return { fit, t: 'Geht – bei ' + p + ' wäre aber auch ein kleiner Skill im Sitzen genug gewesen.' };
      if (m.art === 'koerper') return { fit, t: 'Hilft ein bisschen. Bei ' + p + ' ist es schon sehr spät – raus gehen wäre sicherer.' };
      return { fit, t: 'Zieht nur halb. Bei ' + p + ' hilft der Körper schneller als ein Gedanke.' };
    }
    return { fit, t: 'Bei ' + p + ' ist der Deckel fast ab: ' + (m.art === 'reden' ? 'Reden' : 'Denken') + ' kommt nicht mehr an. Erst Körper oder raus.' };
  }

  const moodFor = (sc, p) => (p < 35 ? 'neutral' : sc.gefuehl === 'wut' ? (p < 70 ? 'genervt' : 'wut') : 'angst');

  /* Ein Durchlauf der Szene: Signale kommen nacheinander, bis gestoppt wird oder die Figur kippt.
     o: { L, crew, beatMs, labels, balken } → { stopped, skipped, idx, p } */
  async function timeline(ctx, sc, o) {
    const name = ctx.figures[sc.fig].name;
    const body = K().koerper({ label: 'Körper von ' + name });
    const meter = ctx.meter({ value: sc.beats[0].p - 10, label: 'Kipp-Balken' });
    const verdeckt = h('div', { class: 'fw-verdeckt' }, CREW.icon('eyeOff', 20), h('span', null, 'Kipp-Balken verdeckt – lest den Körper'));
    const figBox = h('div', { class: 'fw-fig' }, ctx.avatar(sc.fig, 'neutral', 80));
    const story = h('div', { class: 'fw-story', 'aria-live': 'polite' }, sc.start);
    const sigLog = h('div', { class: 'fw-siglog' });
    const sek = h('span', { class: 'pill' }, '');
    const st = { stopped: false, skipped: false };
    const wrap = ctx.scr([
      h('div', { class: 'fw-stage' },
        h('div', { class: 'fw-bodycol' }, body, h('span', { class: 'muted small' }, name)),
        h('div', { class: 'stack fw-main' },
          h('div', { class: 'fw-storyrow' }, figBox, h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } }, h('div', { class: 'row between', style: { gap: '8px' } }, h('span', { class: 'eyebrow' }, sc.ort), ctx.readBtn(() => story.textContent)), story)),
          o.balken ? meter.el : verdeckt,
          h('div', { class: 'row between' }, sigLog, o.balken ? sek : null))),
    ], { eyebrow: (o.crew ? 'Signal-Stopp · ' : '') + 'Szene läuft', badge: ctx.stufe(o.L, LEVELS) });
    let stopP;
    if (o.crew) {
      stopP = ctx.ask(wrap, [{ label: 'Alle stehen still', value: 'stop', variant: 'teamB', icon: 'pause', id: 'fw-stop' }], { autoDelay: 40 + Math.floor(ctx.autoRng() * 4) * 60 });
      wrap.appendChild(CREW.ui.teacherLine('Tippen, sobald alle eingefroren sind und eine Skill-Geste zeigen.'));
    } else {
      stopP = ctx.T.twoFinger(wrap, { label: 'STOPP – beide Finger drauf', hint: 'Sobald ihr ein Signal seht. Zwei Finger, kurz halten.', ms: 350, id: 'fw-stop' });
    }
    stopP.then((v) => { if (v === ctx.SKIP) st.skipped = true; else st.stopped = true; });
    const zonen = {};
    for (let i = 0; i < sc.beats.length; i++) {
      const b = sc.beats[i];
      const s = SIG[b.s];
      // Alte Signale bleiben leise sichtbar, das neue leuchtet (laut = rot pulsierend)
      Object.keys(zonen).forEach((z) => { zonen[z] = 'leise'; });
      zonen[s.z] = s.laut ? 'laut' : 'leise';
      body.setZonen(zonen);
      story.textContent = b.t;
      clear(figBox); figBox.appendChild(ctx.avatar(sc.fig, moodFor(sc, b.p), 80));
      meter.set(b.p);
      sek.textContent = 'Noch ' + (sc.beats.length - i) * SEK_PRO_SCHRITT + ' Sek. bis zum Kipp-Punkt';
      sigLog.appendChild(h('span', { class: 'chip small fw-sig' + (s.laut ? ' laut' : ''), 'data-sig': b.s }, CREW.icon(s.laut ? 'bolt' : 'eye', 16), o.labels ? s.t : 'Signal ' + (i + 1)));
      CREW.sound.play(s.laut ? 'tap' : 'tick');
      for (let t = 0; t < o.beatMs; t += 100) {
        if (st.stopped || st.skipped) break;
        await ctx.hold(100);
      }
      if (st.stopped || st.skipped) return { stopped: st.stopped, skipped: st.skipped, idx: i, p: b.p };
    }
    return { stopped: false, skipped: st.skipped, idx: sc.beats.length, p: 100 };
  }

  // Streifen mit allen Schritten und der Stopp-Stelle
  function strip(sc, idx) {
    return h('div', { class: 'fw-strip', role: 'img', 'aria-label': 'Gestoppt bei Schritt ' + (idx + 1) + ' von ' + sc.beats.length },
      sc.beats.map((b, i) => h('div', { class: 'fw-step' + (i === idx ? ' stop' : i < idx ? ' seen' : ''), 'data-ampel': K().stufe(b.p) },
        h('b', null, String(b.p)), h('span', null, SIG[b.s].t))),
      h('div', { class: 'fw-step kipp' + (idx >= sc.beats.length ? ' stop' : '') }, h('b', null, '100'), h('span', null, 'Kipp-Punkt')));
  }

  /* Eine Szene zu zweit: Stopp → (Level 2: erstes Signal) → Gefühl → Mini-Move → Ergebnis */
  async function szeneZuZweit(ctx, sc, L, nr, total) {
    const name = ctx.figures[sc.fig].name;
    const ey = 'Szene ' + nr + '/' + total;
    const opts = { L, beatMs: L === 3 ? 2400 : 3200, labels: L === 1, balken: L !== 2 };
    const w0 = ctx.scr([
      ctx.figureCard({ fig: sc.fig, mood: 'neutral', text: sc.start, eyebrow: ey + ' · ' + sc.ort }),
      h('div', { class: 'card stack soft' },
        h('b', null, L === 1 ? 'Gleich leuchten Körper-Signale auf. Sobald ihr eins seht: beide Finger auf Stopp.' : L === 2 ? 'Diesmal ohne Wörter und ohne Balken. Nur der Körper. Stoppt beim ersten Signal.' : name + ' startet schon bei Gelb. Die Signale kommen schneller.'),
        h('p', { class: 'muted small' }, 'Je früher ihr stoppt, desto mehr Sekunden gewinnt ' + name + '. Kein Punkt, kein Fehler.')),
    ], { eyebrow: ey, badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w0, 'Szene starten', { id: 'fw-go' })) === ctx.SKIP) return null;
    let r = null, rewinds = 0;
    for (;;) {
      r = await timeline(ctx, sc, opts);
      if (r.skipped) return null;
      if (r.stopped) break;
      // Gekippt: Zurückspulen statt „falsch“ (einmal)
      CREW.sound.play('soft');
      const wk = ctx.scr([
        h('div', { class: 'stop-big display' }, 'Gekippt!'),
        ctx.figureCard({ fig: sc.fig, mood: sc.gefuehl === 'wut' ? 'wut' : 'angst', text: sc.kipp, eyebrow: 'Kipp-Balken bei 100' }),
        h('p', { class: 'muted' }, rewinds ? 'Passiert. Schaut euch an, welches Signal zuerst kam.' : 'Kein „falsch“. Zurückspulen und früher stoppen.'),
      ], { eyebrow: ey, badge: ctx.stufe(L, LEVELS) });
      if (rewinds) { await ctx.next(wk, 'Weiter'); r = { stopped: false, idx: sc.beats.length, p: 100 }; break; }
      const again = await ctx.ask(wk, [{ label: 'Zurückspulen', value: 'rewind', icon: 'undo', id: 'fw-rewind' }]);
      if (again === ctx.SKIP) return null;
      rewinds++;
    }
    const gestoppt = r.stopped;
    let sekunden = gestoppt ? (sc.beats.length - r.idx) * SEK_PRO_SCHRITT : 0;
    const p = r.p;
    if (gestoppt) {
      CREW.sound.play('unlock');
      const w1 = ctx.scr([
        h('div', { class: 'fw-stopbig', 'data-ampel': K().stufe(p) }, h('span', { class: 'eyebrow' }, L === 2 ? 'Der Balken stand bei' : 'Gestoppt bei'), h('b', { class: 'display' }, String(p)), h('span', null, '+' + sekunden + ' Sekunden gewonnen')),
        strip(sc, r.idx),
      ], { eyebrow: ey + ' · Stopp', center: true, badge: ctx.stufe(L, LEVELS) });
      if ((await ctx.next(w1, 'Weiter')) === ctx.SKIP) return null;
    }
    // Level 2: Welches Signal kam zuerst? (Begründen)
    let erstes = null;
    if (L === 2) {
      const gesehenB = sc.beats.slice(0, Math.max(1, Math.min(r.idx + 1, sc.beats.length)));
      const gesehen = gesehenB.map((b) => b.s);
      const fremd = ctx.rshuffle(Object.keys(SIG).filter((k) => !sc.beats.some((b) => b.s === k) && !SIG[k].laut)).slice(0, 2);
      const optsS = Array.from(new Set(gesehen.slice(0, 2).concat(fremd))).slice(0, 4);
      if (!optsS.includes(sc.beats[0].s)) optsS[0] = sc.beats[0].s;
      const zon = {};
      gesehenB.forEach((b) => { zon[SIG[b.s].z] = 'leise'; });
      const ws = ctx.scr([
        h('div', { class: 'fw-stage small' }, K().koerper({ zonen: zon }), ctx.say('Welches Signal kam bei ' + name + ' zuerst? Einigt euch, dann tippt einer.', { eyebrow: 'Woran habt ihr es gemerkt?', small: true })),
      ], { eyebrow: ey + ' · Begründen', badge: ctx.stufe(2, LEVELS) });
      const wahl = await ctx.ask(ws, ctx.rshuffle(optsS).map((k) => ({ label: SIG[k].t, value: k, variant: 'ghost', id: 'fw-erst-' + k })));
      if (wahl === ctx.SKIP) return null;
      erstes = wahl === sc.beats[0].s;
      const wsf = ctx.scr([ctx.say(erstes ? 'Genau: ' + SIG[sc.beats[0].s].t + '. Das leiseste Signal kommt zuerst – wer es kennt, gewinnt die meisten Sekunden.' : 'Zuerst kam: ' + SIG[sc.beats[0].s].t + '. Leise Signale übersieht man leicht. Genau die gewinnen Zeit.', { eyebrow: erstes ? 'Erstes Signal erkannt' : 'Das erste Signal' })], { eyebrow: ey + ' · Begründen', center: true, badge: ctx.stufe(2, LEVELS) });
      await ctx.next(wsf, 'Weiter');
    }
    // Gefühl wählen (zwei Finger = einig)
    const wg = ctx.scr([
      ctx.figureCard({ fig: sc.fig, mood: moodFor(sc, p), text: 'Welches Gefühl macht sich in ' + name + ' gerade breit?', eyebrow: 'Gefühl erkennen' }),
    ], { eyebrow: ey + ' · Gefühl', badge: ctx.stufe(L, LEVELS) });
    const gef = await ctx.ask(wg, ctx.rshuffle(GEFUEHLE).map((g) => ({ label: g.label, value: g.id, icon: g.icon, variant: 'ghost', id: 'fw-gef-' + g.id })));
    if (gef === ctx.SKIP) return null;
    const gefOk = gef === sc.gefuehl;
    const gefAuch = sc.auch.includes(gef);
    const wgf = ctx.scr([
      ctx.say((gefOk ? 'Vorhersage stimmt. ' : gefAuch ? GF[gef].label + ' ist auch drin. ' : 'Ihr hattet ' + GF[gef].label + ' – auch möglich. ') + sc.warum, { eyebrow: gefOk ? 'Gefühl erkannt' : 'Schaut auf die Lage', small: true }),
    ], { eyebrow: ey + ' · Gefühl', center: true, badge: ctx.stufe(L, LEVELS) });
    await ctx.next(wgf, 'Mini-Move wählen');
    // Mini-Move, der bei dieser Zahl noch geht (bei „gekippt“: was hätte bei 70 geholfen?)
    const pm = gestoppt ? p : 70;
    const koerperMove = ctx.rpick(MOVES.filter((m) => m.art === 'koerper'));
    const moves = ctx.rshuffle([koerperMove].concat(MOVES.filter((m) => m.art !== 'koerper')));
    let tries = 0, fitOut = null, okMove = null;
    const tried = [];
    while (tries < 2) {
      const wm = ctx.scr([
        h('div', { class: 'fw-stage small' }, K().koerper({ zonen: { [SIG[sc.beats[Math.min(r.idx, sc.beats.length - 1)].s].z]: K().stufe(pm) === 'rot' ? 'laut' : 'leise' } }),
          ctx.say((gestoppt ? name + ' steht bei ' + pm + '.' : 'Zurück auf 70.') + ' Welcher Mini-Move geht jetzt noch?', { eyebrow: tries ? 'Nochmal: ein anderer Move' : 'Mini-Move', small: true })),
        h('div', { class: 'row' }, h('span', { class: 'amp-pill', 'data-ampel': K().stufe(pm) }, CREW.icon(K().AMPEL[K().stufe(pm)].icon, 16), K().AMPEL[K().stufe(pm)].name + ' · ' + pm)),
      ], { eyebrow: ey + ' · Mini-Move', badge: ctx.stufe(L === 3 ? 3 : L, LEVELS) });
      const left = moves.filter((m) => !tried.includes(m.id));
      const mv = await ctx.ask(wm, left.map((m) => ({ label: m.t, value: m.id, icon: m.icon, variant: 'ghost', id: 'fw-move-' + m.id })), { autoPick: () => (tries ? (left.find((m) => moveFit(m.art, pm) === 'gut') || left[0]).id : left[0].id) });
      if (mv === ctx.SKIP) return null;
      const m = MOVES.find((x) => x.id === mv);
      tried.push(mv);
      const fb = moveText(m, pm, name);
      fitOut = fb.fit; okMove = m;
      CREW.sound.play(fb.fit === 'gut' ? 'good' : 'soft');
      if (fb.fit === 'nein') sekunden = Math.max(0, sekunden - SEK_PRO_SCHRITT);
      const wf = ctx.scr([
        ctx.figureCard({ fig: sc.fig, mood: fb.fit === 'gut' ? 'neutral' : moodFor(sc, pm), text: fb.t, eyebrow: fb.fit === 'gut' ? 'Mini-Move passt' : fb.fit === 'halb' ? 'Geht so' : 'Zieht hier nicht' }),
        fb.fit === 'nein' ? h('p', { class: 'muted small' }, 'Der Balken steigt weiter. Ihr habt noch einen Versuch.') : null,
      ], { eyebrow: ey + ' · Mini-Move', badge: ctx.stufe(L === 3 ? 3 : L, LEVELS) });
      if (fb.fit !== 'nein' || tries === 1) { await ctx.next(wf, 'Weiter'); break; }
      if ((await ctx.next(wf, 'Anderer Move')) === ctx.SKIP) return null;
      tries++;
    }
    // Ergebnis der Szene
    const gut = fitOut === 'gut' || fitOut === 'halb';
    const meterE = ctx.meter({ value: pm, label: 'Kipp-Balken' });
    const we = ctx.scr([
      h('div', { class: 'grid two' },
        ctx.figureCard({ fig: sc.fig, mood: gut ? 'froh' : moodFor(sc, pm), text: gut ? sc.gut : sc.kipp, eyebrow: gut ? 'So geht es weiter' : 'So endet es diesmal' }),
        h('div', { class: 'card stack fw-result', style: { alignItems: 'center', textAlign: 'center' } },
          h('span', { class: 'eyebrow' }, 'Gewonnen'), h('b', { class: 'display fw-sek' }, sekunden + ' Sek.'),
          h('span', { class: 'muted small' }, okMove ? 'Mini-Move: ' + okMove.t : ''),
          meterE.el)),
      h('p', { class: 'muted small' }, 'Über ' + name + ' reden, nicht über euch.'),
    ], { eyebrow: ey + ' · Ergebnis', badge: ctx.stufe(L, LEVELS) });
    if (gut) setTimeout(() => meterE.set(Math.max(15, pm - 30)), ctx.fast ? 0 : 400);
    await ctx.next(we, nr < total ? 'Nächste Szene' : 'Weiter');
    return { sekunden, gestoppt, vor70: gestoppt && p < 70, gefOk, erstes, move: fitOut, rewinds };
  }

  /* Bewegungs-Variante Signal-Stopp: Beamer zeigt die Szene, alle gehen, einfrieren, Skill-Geste */
  async function signalStopp(ctx, liste) {
    const wr = ctx.scr([
      ctx.say('Alle gehen langsam durch den Raum. Seht ihr am Beamer ein Körper-Signal: einfrieren und eine Skill-Geste zeigen.', { eyebrow: 'Signal-Stopp' }),
      h('div', { class: 'icon-cards' }, [['Faust lösen', 'Fäuste kurz ballen, dann locker'], ['Ausatmen', 'lange aus, Schultern runter'], ['Füße fest', 'Füße in den Boden drücken']].map(([t, s]) => h('div', { class: 'icon-card' }, CREW.icon('leaf', 26), h('b', null, t), h('span', { class: 'muted small' }, s)))),
      h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      CREW.ui.teacherLine('Ihr tippt nur „Alle stehen still“. Crew-Stern, wenn alle vor 70 stehen.'),
    ], { eyebrow: 'Signal-Stopp · Regeln' });
    if ((await ctx.next(wr, 'Los')) === ctx.SKIP) return { summary: 'Heute kein Signal-Stopp. Nächstes Mal.' };
    let sterne = 0, runden = 0;
    for (let i = 0; i < liste.length; i++) {
      const sc = liste[i];
      const L = i + 1;
      if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt ohne Wörter und ohne Balken. Nur der Körper der Figur verrät es.' : 'Die Figur startet schon bei Gelb. Die Signale kommen schneller. Stern nur unter 70.' });
      const r = await timeline(ctx, sc, { L, crew: true, beatMs: L === 3 ? 2400 : 3600, labels: L === 1, balken: L !== 2 });
      if (r.skipped) continue;
      runden++;
      const stern = r.stopped && r.p < 70;
      if (stern) { sterne++; CREW.sound.play('great'); } else CREW.sound.play('soft');
      const w = ctx.scr([
        h('div', { class: 'fw-stopbig', 'data-ampel': K().stufe(r.p) }, h('span', { class: 'eyebrow' }, r.stopped ? 'Eingefroren bei' : 'Gekippt bei'), h('b', { class: 'display' }, String(r.p)), h('span', null, stern ? 'Crew-Stern!' : r.stopped ? 'Über 70 – knapp. Nächstes Mal früher.' : 'Zu spät. ' + ctx.figures[sc.fig].name + ' ist gekippt.')),
        strip(sc, r.stopped ? r.idx : sc.beats.length),
        ctx.say('Redet kurz: Welches Signal hat euch gestoppt? Welche Skill-Geste habt ihr gezeigt? ' + sc.warum, { eyebrow: 'Jetzt reden', small: true }),
        CREW.ui.teacherLine('Gruppen fragen, nicht Einzelne. Dann Weiter.'),
      ], { eyebrow: 'Signal-Stopp · Runde ' + L, badge: ctx.stufe(L, LEVELS) });
      await ctx.next(w, i + 1 < liste.length ? 'Nächste Runde' : 'Weiter');
    }
    return {
      summary: runden ? (sterne === runden ? 'Alle Runden vor 70 eingefroren. Die Crew liest Körper-Signale.' : sterne + ' Crew-Sterne. Je leiser das Signal, desto mehr Zeit.') : 'Heute nur reingeschaut.',
      stats: [[sterne, 'Crew-Sterne'], [runden, 'Runden']],
    };
  }

  CREW.registerGame({
    id: 'fruehwarn',
    template: 'T3',
    icon: 'eye',
    szenen: SZENEN, signale: SIG, moveFit, // für den Test
    themen: ['Warnsignale im Körper', 'Wut und Angst', 'Rechtzeitig handeln', 'Anspannung 0–100'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Figur gerät in Stress. Körper-Signale leuchten auf. Stoppt zu zweit so früh wie möglich – dann Gefühl und ein Mini-Move.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Signal sehen', text: 'Kiefer, Bauch, Hände: Was leuchtet zuerst?' },
          { icon: 'users', title: 'Zwei Finger = Stopp', text: 'Beide gleichzeitig. Früh = mehr Sekunden.' },
          { icon: 'leaf', title: 'Mini-Move', text: 'Was geht bei dieser Zahl noch?' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            h('div', { class: 'fw-stage small' }, K().koerper({ zonen: { kiefer: 'leise' } }), ctx.say('Probe: Bei Sam leuchtet der Kiefer. Legt beide einen Finger auf das Feld – so fühlt sich Stopp an.', { eyebrow: 'Zum Ausprobieren', small: true }))], { eyebrow: 'Probe' });
          await ctx.T.twoFinger(w, { label: 'Probe: beide Finger drauf' });
        },
      });
      const wm = ctx.scr([ctx.say('Wie spielt ihr heute?', { eyebrow: 'Vorbereitung', small: true }), h('p', { class: 'muted small' }, 'Zu zweit an einem iPad – oder „Signal-Stopp“ mit der ganzen Crew in Bewegung (nach den Gefühlsstatuen).')], { eyebrow: 'Vorbereitung', center: true });
      const modus = await ctx.ask(wm, [{ label: 'Zu zweit · ein iPad', value: 'paar', variant: 'ghost', icon: 'users', id: 'fw-modus-paar' }, { label: 'Signal-Stopp · Bewegung', value: 'crew', variant: 'ghost', icon: 'bolt', id: 'fw-modus-crew' }], { autoPick: () => (ctx.autoRng() < 0.75 ? 'paar' : 'crew') });
      // Drei Szenen per Tagescode: Wut (Level 1), Angst (Level 2), schnell (Level 3)
      const liste = [ctx.rpick(SZENEN.filter((s) => s.gruppe === 'wut')), ctx.rpick(SZENEN.filter((s) => s.gruppe === 'angst')), ctx.rpick(SZENEN.filter((s) => s.gruppe === 'schnell'))];
      if (modus === 'crew') return signalStopp(ctx, liste);
      let sek = 0, gespielt = 0, vor70 = 0, gefOk = 0, movesOk = 0;
      for (let i = 0; i < liste.length; i++) {
        const L = i + 1;
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt ohne Wörter und ohne Balken. Nur der Körper verrät es. Danach: Welches Signal kam zuerst?' : 'Die Figur startet schon bei Gelb, die Signale kommen schneller. Der Mini-Move muss zur Zahl passen.' });
        const r = await szeneZuZweit(ctx, liste[i], L, i + 1, liste.length);
        if (!r) continue;
        gespielt++; sek += r.sekunden; if (r.vor70) vor70++; if (r.gefOk) gefOk++; if (r.move === 'gut') movesOk++;
      }
      return {
        summary: gespielt ? sek + ' Sekunden gewonnen. Wer das erste leise Signal kennt, hat Zeit für einen Skill.' : 'Heute nur reingeschaut.',
        stats: [[sek, 'Sekunden gewonnen'], [vor70, 'Stopps vor 70'], [gefOk, 'Gefühle erkannt'], [movesOk, 'Mini-Moves passten']],
      };
    },
  });
})();
