/* Spiel „Pult-Tausch“ (Thema: Gefühle verstehen) · Vorlage T1 Solo + Austausch · j1-e08 „Alles steht Kopf“
   Zwei Szenen per Tagescode (eine davon aus dem Film-Thema der Stunde). Du wählst, welches Gefühl bei der
   Figur am Steuerpult sitzt und was es tut. Dann setzt das iPad ein anderes Gefühl ans Pult und du
   entscheidest neu – mit Zurückspulen wie in Clash. Vergleichskarte: „Lief es mit dem Tausch besser oder
   schlechter – warum?“ Brücke in die Woche: „Wer saß bei dir heute am Pult?“ (Pass, nichts wird gespeichert). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Die fünf Gefühle am Pult (wie im Film): Farbe, Icon, was sie wollen */
  const GEFUEHLE = {
    freude: { name: 'Freude', icon: 'star', colour: '#ffc93c', ink: '#2a1d00', will: 'will, dass es leicht bleibt' },
    trauer: { name: 'Trauer', icon: 'heart', colour: '#4c8dff', ink: '#ffffff', will: 'will, dass jemand es merkt' },
    wut: { name: 'Wut', icon: 'bolt', colour: '#ff4d4d', ink: '#ffffff', will: 'will, dass die Grenze zählt' },
    angst: { name: 'Angst', icon: 'shield', colour: '#b48bff', ink: '#1a0a3a', will: 'will, dass nichts schiefgeht' },
    ekel: { name: 'Ekel', icon: 'x', colour: '#2ee6c5', ink: '#003a30', will: 'will Abstand von dem, was nicht passt' },
  };
  Object.keys(GEFUEHLE).forEach((k) => { GEFUEHLE[k].id = k; });
  const G = (id) => GEFUEHLE[id];

  /* Szenen: Figur, Text, Film-Thema (eine Film-Szene ist immer dabei) und je Gefühl: Pult-Satz + zwei Handlungen.
     Jede Handlung: Text, Ausgang (was passiert), Stimmung danach, Pegel 0–100 (wie angespannt es danach ist). */
  const SZENEN = [
    { id: 'note', film: false, fig: 'mika', mood: 'ueberrascht', titel: 'Die Note', text: 'Die Lehrerin gibt die Mathe-Arbeit zurück und sagt vor der ganzen Klasse: „Mika, so geht das nicht.“ Alle schauen.',
      pult: {
        freude: { satz: '„Halb so wild. Nächstes Mal läuft’s.“', tun: [{ t: 'Grinsen, Schulter zucken, Arbeit einstecken', aus: 'Die Klasse lacht kurz mit. Mika schaut die Note später allein an – und schluckt doch.', mood: 'neutral', pegel: 40 }, { t: 'Nach der Stunde fragen: „Was kann ich bis zur nächsten Arbeit üben?“', aus: 'Die Lehrerin nimmt sich zwei Minuten. Mika hat einen Plan. Die Klasse hat den Satz schon vergessen.', mood: 'froh', pegel: 20 }] },
        trauer: { satz: '„Ich schaff das einfach nicht.“', tun: [{ t: 'Still werden, Kopf runter, Rest der Stunde nichts sagen', aus: 'Niemand fragt nach. Mika fühlt sich den ganzen Tag klein. Zu Hause liegt die Arbeit zerknüllt im Rucksack.', mood: 'traurig', pegel: 65 }, { t: 'In der Pause Sam erzählen, wie das vor allen war', aus: 'Sam sagt: „Das war echt nicht okay von ihr.“ Es tut noch weh, aber Mika ist nicht allein damit.', mood: 'neutral', pegel: 35 }] },
        wut: { satz: '„Vor allen? Das war gemein.“', tun: [{ t: 'Laut sagen: „Müssen Sie das vor allen sagen?“', aus: 'Es wird still. Die Lehrerin wird rot, sagt: „Du hast recht, das besprechen wir nachher.“ Mutig – und knapp am Ärger vorbei.', mood: 'neutral', pegel: 55 }, { t: 'Das Heft auf den Tisch knallen und „Egal“ murmeln', aus: 'Eintrag ins Klassenbuch. Die Note ist jetzt das kleinere Problem.', mood: 'wut', pegel: 85 }] },
        angst: { satz: '„Jetzt denken alle, ich bin dumm.“', tun: [{ t: 'Rot werden, nicht aufschauen, hoffen, dass es vorbeigeht', aus: 'Es geht vorbei. Aber im Kopf läuft der Satz in Schleife, bis in den Abend.', mood: 'angst', pegel: 70 }, { t: 'Nach der Stunde leise sagen: „Könnten Sie das nächstes Mal nicht vor allen sagen?“', aus: 'Die Lehrerin stutzt und sagt: „Ja. Sorry.“ Mika zittert noch – aber hat es gesagt.', mood: 'neutral', pegel: 40 }] },
        ekel: { satz: '„Diese Art. Das will ich nicht.“', tun: [{ t: 'Wegschauen, Arbeit umdrehen, nicht mehr hinhören', aus: 'Mika bekommt den Rest der Erklärung nicht mit. Die nächste Arbeit wird nicht besser.', mood: 'genervt', pegel: 55 }, { t: 'Mit Yara nach der Stunde besprechen: „Wie sie das gesagt hat, ging gar nicht.“', aus: 'Yara nickt. Zu zweit beschließen sie, es der Klassenlehrerin zu sagen. Es geht um die Art, nicht um die Note.', mood: 'neutral', pegel: 35 }] },
      } },
    { id: 'gelesen', film: false, fig: 'yara', mood: 'neutral', titel: 'Auf „gelesen“', text: 'Yara schreibt Luca: „Kommst du morgen mit ins Kino?“ Zwei Haken, blau. Keine Antwort. Seit drei Stunden.',
      pult: {
        freude: { satz: '„Luca ist bestimmt beschäftigt. Wird schon.“', tun: [{ t: 'Handy weglegen, Serie weiterschauen', aus: 'Um 22 Uhr kommt: „Sorry, war beim Training! Klar, Kino.“ Yara hat einen entspannten Abend gehabt.', mood: 'froh', pegel: 15 }, { t: 'Ein Meme hinterherschicken: „Hallooo? 😄“', aus: 'Luca antwortet mit einem Lach-Emoji und „jaa, bin dabei“. Locker gelöst.', mood: 'froh', pegel: 20 }] },
        trauer: { satz: '„Ich bin Luca egal.“', tun: [{ t: 'Die Nachricht löschen und niemandem mehr schreiben', aus: 'Luca sieht die gelöschte Nachricht, versteht nichts und fragt nicht. Beide warten. Kino fällt aus.', mood: 'traurig', pegel: 60 }, { t: 'Ehrlich schreiben: „Hab mich gefragt, ob du keine Lust hast. Alles gut?“', aus: 'Luca: „Nein, alles gut! War nur weg. Bin dabei.“ Yara hat nachgefragt statt geraten.', mood: 'neutral', pegel: 30 }] },
        wut: { satz: '„So lässt man niemanden hängen.“', tun: [{ t: 'Schreiben: „Dann halt nicht. Geh allein.“', aus: 'Luca kommt vom Training, liest das – und ist verletzt. Der nächste Tag ist komisch. Kino fällt aus.', mood: 'wut', pegel: 80 }, { t: 'Das Handy auf Flugmodus und eine Runde rausgehen', aus: 'Nach 20 Minuten ist die Wut kleiner. Als Yara zurückkommt, ist die Antwort da.', mood: 'neutral', pegel: 35 }] },
        angst: { satz: '„Hab ich was Falsches geschrieben?“', tun: [{ t: 'Alle alten Chats durchlesen und nach Fehlern suchen', aus: 'Drei Stunden Grübeln. Keine Antwort gefunden, weil es keinen Fehler gab.', mood: 'angst', pegel: 75 }, { t: 'Sam fragen: „Ist Luca heute beim Training?“', aus: 'Sam: „Ja, bis neun.“ Rätsel gelöst. Yara atmet aus.', mood: 'froh', pegel: 25 }] },
        ekel: { satz: '„Dieses Warten auf Haken ist ätzend.“', tun: [{ t: 'Chat stummschalten und den Abend ohne Handy planen', aus: 'Yara kocht mit ihrer Schwester. Die Antwort wartet in Ruhe bis morgen.', mood: 'froh', pegel: 20 }, { t: 'Luca im Status anstupsen: „Manche Leute können nicht mal antworten.“', aus: 'Alle im Chat sehen es. Luca fühlt sich vorgeführt. Peinlich für beide.', mood: 'genervt', pegel: 70 }] },
      } },
    { id: 'umzug', film: true, fig: 'sam', mood: 'traurig', titel: 'Neue Stadt', text: 'Wie im Film: Sam ist umgezogen. Erster Tag an der neuen Schule. In der Pause steht Sam allein am Zaun, alle anderen kennen sich.',
      pult: {
        freude: { satz: '„Neuer Start. Das wird gut.“', tun: [{ t: 'Zur Gruppe am Tisch gehen: „Hey, ich bin neu. Darf ich mich dazusetzen?“', aus: 'Kurz still, dann rückt jemand. Es ist noch fremd, aber Sam sitzt nicht mehr allein.', mood: 'froh', pegel: 30 }, { t: 'Lachen, als wäre alles super, und niemandem sagen, dass es schwer ist', aus: 'Die anderen denken, Sam braucht nichts. Am Abend ist Sam leer, weil nichts davon echt war.', mood: 'traurig', pegel: 55 }] },
        trauer: { satz: '„Ich vermisse meine alten Leute.“', tun: [{ t: 'Am Zaun bleiben, alten Freunden schreiben, nichts hier anfangen', aus: 'Die alten Freunde antworten lieb. Aber hier lernt Sam niemanden kennen. Die Wochen werden lang.', mood: 'traurig', pegel: 60 }, { t: 'Beim Abendessen sagen: „Es ist hart. Ich vermisse alle.“', aus: 'Die Eltern hören zu. Wie im Film: Zeigen, dass es traurig ist, holt Hilfe. Am nächsten Tag ist der Zaun weniger hoch.', mood: 'neutral', pegel: 35 }] },
        wut: { satz: '„Keiner hat mich gefragt, ob ich umziehen will.“', tun: [{ t: 'Alle hier blöd finden und das auch zeigen', aus: 'Die Klasse merkt sich: Der Neue ist unfreundlich. Es wird schwerer, nicht leichter.', mood: 'wut', pegel: 75 }, { t: 'Nach der Schule mit den Eltern streiten – und dann sagen, was Sam wirklich braucht', aus: 'Der Streit ist laut. Danach aber verabreden sie: In den Ferien geht es zu Besuch in die alte Stadt. Die Wut hatte einen Grund.', mood: 'neutral', pegel: 45 }] },
        angst: { satz: '„Wenn ich hingehe, lachen die.“', tun: [{ t: 'Die Pause auf dem Klo verbringen', aus: 'Keiner lacht. Keiner sieht Sam. Morgen ist es genauso schwer wie heute.', mood: 'angst', pegel: 70 }, { t: 'Erst eine Person ansprechen, die auch allein steht', aus: 'Die Person heißt Noa und ist auch neu. Zwei am Zaun sind keine Außenseiter mehr.', mood: 'froh', pegel: 30 }] },
        ekel: { satz: '„Hier ist alles anders und komisch.“', tun: [{ t: 'Das Essen, die Leute, die Schule durchgehend schlechtmachen', aus: 'Sam hat Recht, dass vieles anders ist. Aber mit Nörgeln kommt niemand näher.', mood: 'genervt', pegel: 55 }, { t: 'Eine Sache suchen, die hier besser ist als früher', aus: 'Der Skatepark neben der Schule. Da trifft Sam am Nachmittag zwei aus der Klasse.', mood: 'froh', pegel: 25 }] },
      } },
    { id: 'lachen', film: true, fig: 'luca', mood: 'angst', titel: 'Vor der Klasse', text: 'Wie Riley im Film: Luca soll sich vor der neuen Klasse vorstellen. Beim Erzählen von früher wird die Stimme plötzlich dünn. Zwei Leute grinsen.',
      pult: {
        freude: { satz: '„Lächeln, dann wird es leichter.“', tun: [{ t: 'Kurz lächeln und sagen: „Okay, das war jetzt kurz emotional“', aus: 'Zwei lachen – aber freundlich. Jemand sagt: „Respekt.“ Luca setzt sich erleichtert.', mood: 'froh', pegel: 30 }, { t: 'So tun, als wäre nichts, und schnell fertig werden', aus: 'Es geht vorbei. Aber Luca hat der Klasse nichts von sich gezeigt. Keiner spricht Luca danach an.', mood: 'neutral', pegel: 45 }] },
        trauer: { satz: '„Früher war alles besser.“', tun: [{ t: 'Abbrechen, sich setzen, den Blick nicht mehr heben', aus: 'Die Lehrerin wechselt das Thema. Luca ist fürs Erste unsichtbar. Das ist ruhig, aber auch einsam.', mood: 'traurig', pegel: 55 }, { t: 'Ehrlich sagen: „Sorry, ich vermisse das noch. Ist noch frisch.“', aus: 'Die Klasse wird still, nicht gemein. Nach der Stunde kommt jemand: „Ich bin vor zwei Jahren auch umgezogen.“', mood: 'neutral', pegel: 30 }] },
        wut: { satz: '„Die grinsen. Das ist unfair.“', tun: [{ t: 'Die zwei anfunkeln: „Was gibt’s da zu lachen?“', aus: 'Die zwei lachen jetzt wirklich. Der erste Tag ist versaut, bevor er begonnen hat.', mood: 'wut', pegel: 80 }, { t: 'Fäuste kurz anspannen und lösen, weiterreden', aus: 'Keiner merkt die Fäuste. Die Stimme wird wieder fester. Luca bringt es zu Ende.', mood: 'neutral', pegel: 40 }] },
        angst: { satz: '„Alle sehen, dass ich zittere.“', tun: [{ t: 'Schnell nuscheln und abbrechen', aus: 'Keiner hat etwas verstanden. Die Lehrerin bittet um eine Wiederholung. Doppelt schwer.', mood: 'angst', pegel: 75 }, { t: 'Ausatmen, zwei Sekunden Pause, auf den Boden schauen, weitermachen', aus: 'Die Pause fühlt sich ewig an, dauert zwei Sekunden. Dann geht es. Niemand hat die Pause komisch gefunden.', mood: 'neutral', pegel: 40 }] },
        ekel: { satz: '„Vorstellen vor allen ist so eine blöde Idee.“', tun: [{ t: 'Sagen: „Ich mach das nicht“, und sich setzen', aus: 'Die Lehrerin lässt es. Die Klasse weiß jetzt nur: Luca macht nicht mit.', mood: 'genervt', pegel: 55 }, { t: 'Vorschlagen: „Kann ich stattdessen drei Fragen beantworten?“', aus: 'Die Klasse fragt: Lieblingsspiel, Haustier, schlimmstes Essen. Das ist leichter – und lustiger.', mood: 'froh', pegel: 25 }] },
      } },
    { id: 'bank', film: false, fig: 'mika', mood: 'genervt', titel: 'Auf der Bank', text: 'Fußball-Turnier. Mika hat die ganze Woche trainiert. Der Trainer stellt die Aufstellung vor – ohne Mika. „Heute von der Bank.“',
      pult: {
        freude: { satz: '„Dann feuere ich halt an. Auch wichtig.“', tun: [{ t: 'Laut mitfiebern, bei jedem Tor jubeln', aus: 'Der Trainer sieht das. In der zweiten Halbzeit darf Mika rein. Es war echt – und es hat sich gelohnt.', mood: 'froh', pegel: 20 }, { t: 'Nur lächeln, innen aber brodeln', aus: 'Niemand merkt etwas. Mika merkt es umso mehr. Nach dem Spiel ist der Frust immer noch da.', mood: 'genervt', pegel: 55 }] },
        trauer: { satz: '„Die ganze Arbeit war umsonst.“', tun: [{ t: 'Still auf der Bank sitzen, nicht hinschauen', aus: 'Das Spiel läuft vorbei. Mika hat weder gespielt noch mitgefiebert. Ein verlorener Tag.', mood: 'traurig', pegel: 60 }, { t: 'Nach dem Spiel sagen: „Das war enttäuschend für mich. Ich hab viel trainiert.“', aus: 'Der Trainer: „Ich weiß. Das nächste Spiel bist du drin.“ Gesagt statt geschluckt.', mood: 'neutral', pegel: 30 }] },
        wut: { satz: '„Das ist so unfair.“', tun: [{ t: 'Die Trinkflasche wegtreten und „Dann halt“ rufen', aus: 'Der Trainer zieht die Augenbrauen hoch. Nächste Woche: wieder Bank. Diesmal wegen der Flasche.', mood: 'wut', pegel: 85 }, { t: 'In der Halbzeit ruhig fragen: „Warum bin ich heute nicht drin?“', aus: 'Der Trainer: „Du warst krank, ich wollte dich schonen. Zweite Halbzeit gehst du rein.“ Die Wut hatte eine Frage, und die war gut.', mood: 'froh', pegel: 30 }] },
        angst: { satz: '„Bin ich zu schlecht für das Team?“', tun: [{ t: 'Beim nächsten Training nicht mehr hingehen', aus: 'Das Team fragt nach. Mika hat sich aus Angst selbst rausgenommen – ohne Antwort.', mood: 'angst', pegel: 70 }, { t: 'Sam auf der Bank leise fragen: „Hab ich was falsch gemacht?“', aus: 'Sam: „Quatsch. Rotation. Letzte Woche saß ich hier.“ Angst beantwortet, ohne Drama.', mood: 'neutral', pegel: 30 }] },
        ekel: { satz: '„Dieses ewige Entscheiden über meinen Kopf hinweg.“', tun: [{ t: 'Das Team schlechtreden: „Ohne mich verliert ihr sowieso.“', aus: 'Zwei aus dem Team hören es. Der Spruch macht die Runde. Mika hat jetzt ein anderes Problem.', mood: 'genervt', pegel: 70 }, { t: 'Nach dem Spiel sagen: „Ich will nächstes Mal vorher wissen, ob ich spiele.“', aus: 'Der Trainer: „Fair. Ich sag es ab jetzt am Tag davor.“ Eine klare Bitte, ein klares Ja.', mood: 'froh', pegel: 25 }] },
      } },
    { id: 'foto', film: false, fig: 'yara', mood: 'wut', titel: 'Das Foto', text: 'Luca postet ein Gruppenfoto aus dem Schwimmbad. Yara ist drauf – ungefragt. Zehn Kommentare, einer davon fies über Yara.',
      pult: {
        freude: { satz: '„Ist doch ein schönes Foto.“', tun: [{ t: 'Den fiesen Kommentar ignorieren, das Foto liken', aus: 'Das Foto bleibt. Der Kommentar auch. Yara sieht ihn jeden Tag wieder.', mood: 'neutral', pegel: 45 }, { t: 'Luca privat schreiben: „Foto ist süß, aber bitte frag mich nächstes Mal. Und lösch den Kommentar?“', aus: 'Luca: „Oh, sorry! Mach ich.“ Freundlich und klar – beides war drin.', mood: 'froh', pegel: 25 }] },
        trauer: { satz: '„So sehen die anderen mich also.“', tun: [{ t: 'Den Kommentar hundertmal lesen und sich nicht mehr melden', aus: 'Ein Kommentar von einer Person wird im Kopf zu „alle“. Der Abend ist schwer.', mood: 'traurig', pegel: 70 }, { t: 'Sam anrufen und den Kommentar vorlesen', aus: 'Sam: „Das ist Paul. Der schreibt unter jedes Foto Mist.“ Es ist ein Kommentar, nicht die Wahrheit.', mood: 'neutral', pegel: 35 }] },
        wut: { satz: '„Das ist mein Bild. Mein Körper. Meine Entscheidung.“', tun: [{ t: 'Unter das Foto schreiben: „Lösch das sofort, du Idiot“', aus: 'Zwanzig neue Kommentare. Jetzt reden alle über den Streit statt über das Foto.', mood: 'wut', pegel: 85 }, { t: 'Luca anrufen: „Nimm das Foto runter. Ich hab nicht Ja gesagt.“', aus: 'Das Foto ist in fünf Minuten weg. Wut mit klarer Grenze – ohne Publikum.', mood: 'neutral', pegel: 35 }] },
        angst: { satz: '„Was, wenn das jetzt überall landet?“', tun: [{ t: 'Nichts sagen, damit es nicht noch schlimmer wird', aus: 'Das Foto bleibt online, weil Yara aus Angst nichts gesagt hat. Die Angst ist nicht kleiner geworden.', mood: 'angst', pegel: 70 }, { t: 'Einen Screenshot machen und einer erwachsenen Person zeigen', aus: 'Die Schwester hilft: Foto melden, Luca schreiben. Zu zweit ist die Angst halb so groß.', mood: 'neutral', pegel: 35 }] },
        ekel: { satz: '„Fremde Leute kommentieren meinen Körper. Igitt.“', tun: [{ t: 'Den Kommentar melden und den Schreiber blockieren', aus: 'Der Kommentar ist weg, der Schreiber auch. Yara hat Abstand geschaffen – genau das, was Ekel will.', mood: 'froh', pegel: 25 }, { t: 'Das eigene Profil löschen', aus: 'Das Foto auf Lucas Profil bleibt. Yara ist weg, das Problem nicht.', mood: 'genervt', pegel: 55 }] },
      } },
  ];

  /* Pult-Grafik: Konsole mit fünf Plätzen, das gewählte Gefühl sitzt am Steuer */
  function pultEl(active, o) {
    const oo = o || {};
    const seat = active ? G(active) : null;
    return h('div', { class: 'pult' + (oo.small ? ' small' : ''), style: seat ? { '--pc': seat.colour, '--pi': seat.ink } : null },
      h('div', { class: 'pult-screen' },
        seat ? h('div', { class: 'pult-seat' }, CREW.icon(seat.icon, oo.small ? 26 : 40), h('b', null, seat.name)) : h('span', { class: 'muted' }, 'Wer sitzt am Pult?'),
        seat && oo.satz ? h('div', { class: 'pult-satz' }, oo.satz) : null),
      h('div', { class: 'pult-knobs' }, Object.values(GEFUEHLE).map((g) => h('i', { class: active === g.id ? 'on' : '', style: { '--kc': g.colour }, title: g.name }))));
  }
  const gChip = (id) => h('span', { class: 'chip small pult-chip', style: { '--pc': G(id).colour, '--pi': G(id).ink } }, CREW.icon(G(id).icon, 16), ' ' + G(id).name);

  /* Eine Runde: Gefühl wählen (oder vorgegeben), Handlung wählen, Ausgang sehen, Zurückspulen erlaubt.
     Rückgabe { gefuehl, tun, rewinds } oder null bei Pass */
  async function runde(ctx, sz, o) {
    const name = CREW.games.figures[sz.fig].name;
    const oo = o || {};
    let gef = oo.gefuehl || null;
    if (!gef) {
      const w = ctx.scr([
        ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: sz.text, eyebrow: sz.titel }),
        h('div', { class: 'pult-row' }, pultEl(null), ctx.say('Welches Gefühl sitzt bei ' + name + ' gerade am Pult?', { eyebrow: 'Du entscheidest', small: true })),
      ], { eyebrow: oo.eyebrow, step: oo.step });
      gef = await ctx.ask(w, Object.values(GEFUEHLE).map((g) => ({ label: g.name, value: g.id, icon: g.icon, variant: 'ghost' })));
      if (gef === ctx.SKIP) return null;
    }
    const p = sz.pult[gef];
    let rewinds = 0;
    for (;;) {
      const w2 = ctx.scr([
        h('div', { class: 'pult-row' }, pultEl(gef, { satz: p.satz }), ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: G(gef).name + ' sitzt am Pult und ' + G(gef).will + '. Was tut ' + name + '?', eyebrow: sz.titel, size: 72 })),
      ], { eyebrow: oo.eyebrow + ' · ' + G(gef).name + ' am Pult', step: oo.step });
      const tun = await ctx.ask(w2, p.tun.map((t, i) => ({ label: t.t, value: i, variant: 'ghost' })));
      if (tun === ctx.SKIP) return null;
      const a = p.tun[tun];
      const m = ctx.meter({ value: a.pegel, label: 'Anspannung danach' });
      const w3 = ctx.scr([
        h('div', { class: 'pult-row' }, pultEl(gef, { satz: p.satz, small: true }), ctx.figureCard({ fig: sz.fig, mood: a.mood, text: a.aus, eyebrow: 'So geht es weiter' })),
        m.el,
        h('p', { class: 'muted small' }, 'Zurückspulen heißt: Gleiches Gefühl, andere Handlung. Nichts davon ist falsch – es sind Folgen.'),
      ], { eyebrow: oo.eyebrow + ' · Ausgang', step: oo.step });
      const r = await ctx.ask(w3, [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', auto: false, id: 'btn-rewind' }, { label: 'So bleibt es', value: 'ok', iconRight: 'right', id: 'btn-keep' }]);
      if (r === ctx.SKIP) return null;
      if (r === 'rewind') { rewinds++; CREW.sound.play('tick'); continue; }
      return { gefuehl: gef, tun, pegel: a.pegel, rewinds };
    }
  }

  CREW.registerGame({
    id: 'pult-tausch',
    template: 'T1',
    icon: 'heart',
    themen: ['Gefühl steuert Handeln', 'Steuerpult', 'Alles steht Kopf', 'Perspektivwechsel'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Du setzt ein Gefühl ans Steuerpult der Figur und wählst, was sie tut. Dann tauscht das iPad das Gefühl – und du schaust, ob es besser läuft.',
        steps: [
          { icon: 'eye', title: 'Szene lesen', text: 'Eine Figur, ein Moment.' },
          { icon: 'bolt', title: 'Gefühl ans Pult', text: 'Wählen, was es tut. Zurückspulen erlaubt.' },
          { icon: 'shuffle', title: 'Tausch', text: 'Anderes Gefühl, neue Entscheidung. Dann Vergleichskarte.' },
        ],
        probe: ctx.T.probeCard('Probe: Sam findet einen Zehner auf dem Schulhof. Wer sitzt am Pult? Tippt irgendwas – zählt nicht.', [{ label: 'Freude', value: 1, variant: 'ghost', icon: 'star' }, { label: 'Angst', value: 2, variant: 'ghost', icon: 'shield' }]),
      });
      await ctx.T.codeCheck();
      // Zwei Szenen per Tagescode: eine aus dem Film-Thema (j1-e08), eine aus dem Alltag
      const film = ctx.rpick(SZENEN.filter((s) => s.film));
      const alltag = ctx.rpick(SZENEN.filter((s) => !s.film));
      const szenen = ctx.rng() < 0.5 ? [film, alltag] : [alltag, film];
      const ergebnisse = [];
      let rewinds = 0;
      for (let i = 0; i < szenen.length; i++) {
        const sz = szenen[i];
        const name = CREW.games.figures[sz.fig].name;
        const ey = 'Szene ' + (i + 1) + '/2';
        const r1 = await runde(ctx, sz, { eyebrow: ey, step: i * 2 + 1 });
        if (!r1) continue;
        rewinds += r1.rewinds;
        // Tausch: das iPad setzt ein anderes Gefühl ans Pult (per Tagescode gleich auf allen iPads der Szene? Nein – abhängig von der ersten Wahl)
        const andere = Object.keys(GEFUEHLE).filter((k) => k !== r1.gefuehl);
        const g2 = andere[Math.floor(ctx.rng() * andere.length)];
        const wt = ctx.scr([
          h('div', { class: 'pult-tausch-anim' }, pultEl(r1.gefuehl, { small: true }), CREW.icon('shuffle', 40), pultEl(g2, { small: true })),
          ctx.say('Tausch! Das iPad setzt ' + G(g2).name + ' ans Pult. Gleiche Szene, ' + name + ' entscheidet neu.', { eyebrow: 'Pult-Tausch' }),
        ], { eyebrow: ey + ' · Tausch', center: true, step: i * 2 + 2 });
        const go = await ctx.next(wt, 'Neu entscheiden');
        if (go === ctx.SKIP) continue;
        const r2 = await runde(ctx, sz, { gefuehl: g2, eyebrow: ey + ' · Tausch', step: i * 2 + 2 });
        if (!r2) continue;
        rewinds += r2.rewinds;
        // Urteil: besser oder schlechter? (die eigene Einschätzung, nicht der Pegel)
        const w4 = ctx.scr([
          h('div', { class: 'pult-compare' },
            h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Vorher'), gChip(r1.gefuehl), h('b', null, sz.pult[r1.gefuehl].tun[r1.tun].t), h('span', { class: 'muted small' }, 'Anspannung danach: ' + r1.pegel)),
            h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Nach dem Tausch'), gChip(r2.gefuehl), h('b', null, sz.pult[r2.gefuehl].tun[r2.tun].t), h('span', { class: 'muted small' }, 'Anspannung danach: ' + r2.pegel))),
          ctx.say('Lief es mit dem Tausch für ' + name + ' besser oder schlechter?', { eyebrow: 'Dein Urteil', small: true }),
        ], { eyebrow: ey + ' · Vergleich' });
        const urteil = await ctx.ask(w4, [{ label: 'Besser', value: 'besser', variant: 'ghost', icon: 'check' }, { label: 'Ungefähr gleich', value: 'gleich', variant: 'ghost' }, { label: 'Schlechter', value: 'schlechter', variant: 'ghost', icon: 'x' }]);
        if (urteil === ctx.SKIP) continue;
        ergebnisse.push({ sz, r1, r2, urteil });
      }
      // Austausch zu zweit: dieselbe Vergleichskarte wie überall
      if (ergebnisse.length) {
        await ctx.T.pairScreen({});
        const items = [];
        ergebnisse.forEach((e) => {
          items.push({ label: e.sz.titel + ': ' + G(e.r1.gefuehl).name + ' → ' + G(e.r2.gefuehl).name, icon: G(e.r1.gefuehl).icon, text: 'Tausch war ' + e.urteil + (e.r1.rewinds + e.r2.rewinds ? ' · ' + (e.r1.rewinds + e.r2.rewinds) + '× zurückgespult' : '') });
        });
        await ctx.T.vergleich({
          title: 'Pult-Tausch – Vergleichskarte',
          items,
          questions: ['Welches Gefühl hast du zuerst ans Pult gesetzt – und warum?', 'Lief es mit dem Tausch besser oder schlechter – warum?'],
          note: 'Es geht um ' + CREW.games.figures[ergebnisse[0].sz.fig].name + ' und die anderen Figuren. Über dich musst du nichts sagen.',
        });
      }
      // Brücke in die Woche (j1-e08): Wer saß bei dir heute am Pult? Freiwillig, nichts wird gespeichert.
      const w5 = ctx.scr([
        ctx.say('Brücke in die Woche: Wer saß bei dir heute am Pult? Nur wenn du magst. Nichts wird gespeichert.', { eyebrow: 'Freiwillig' }),
        h('div', { class: 'pult-knobs big' }, Object.values(GEFUEHLE).map((g) => h('i', { style: { '--kc': g.colour }, title: g.name }))),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Brücke', center: true });
      const heute = await ctx.ask(w5, Object.values(GEFUEHLE).map((g) => ({ label: g.name, value: g.id, icon: g.icon, variant: 'ghost' })).concat([{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]));
      if (heute !== ctx.SKIP && heute !== 'pass') {
        const w6 = ctx.scr([h('div', { class: 'pult-row' }, pultEl(heute, { satz: G(heute).name + ' ' + G(heute).will + '.' }), ctx.say('Okay. ' + G(heute).name + ' darf da sitzen. Und du entscheidest trotzdem, was du tust.', { eyebrow: 'Nur für dich' }))], { eyebrow: 'Brücke', center: true });
        await ctx.next(w6, 'Fertig');
      }
      const besser = ergebnisse.filter((e) => e.urteil === 'besser').length;
      return {
        summary: ergebnisse.length ? 'Das Gefühl am Pult steuert mit. Was die Figur tut, entscheidet trotzdem sie.' : 'Heute nur reingeschaut. Das Pult wartet.',
        stats: [[ergebnisse.length, 'Szenen'], [besser, '× Tausch war besser'], [rewinds, '× zurückgespult']],
      };
    },
  });
})();
