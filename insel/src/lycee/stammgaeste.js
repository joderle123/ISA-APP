// Annexe Junglinster – Stammgäste: Leute, die immer am selben Ort sind und eine eigene kleine Geschichte über das Jahr haben
// (wie die „Fremden“ in großen Open-World-Spielen). Jedes Kapitel ein neuer Besuch, der an den letzten anknüpft.
// Alle Figuren und Namen sind erfunden. Sprache: kurz, warm, mit Witz; Lux/FR/PT-Brocken wie im echten Schulalltag.
//
// Aufbau je Figur: name, farbe, aussehen (wie STATISTEN in spiel.js), steht [x, z, yaw, haltung],
// besuch[kap] = Szene (die letzte mit kap ≤ aktuellem Kapitel gilt), nochmal = kurze Sätze für weitere Besuche im selben Kapitel.
// Szene: Liste aus ['s', text] (Stammgast), ['du', text] (Spielfigur), ['e', text] (Erzähler)
//        oder { wahl: [{ t, merke?, dann: [...] }] }.  {name} wird ersetzt.
// Rückblick: eine Szene kann eine Funktion (merke) => Liste sein, um frühere Antworten aufzugreifen.

const UMFRAGE = {
  1: { frage: 'Erste Woche. Ein Wort für die Annexe?', opt: ['Groß', 'Laut', 'Eigentlich okay'], quote: [31, 44, 25] },
  2: { frage: 'Was nervt mehr: Gruppenchat oder Gruppenarbeit?', opt: ['Gruppenchat', 'Gruppenarbeit', 'Beides. Gleich doll.'], quote: [48, 21, 31] },
  3: { frage: 'Sportfest: Mitmachen oder zuschauen?', opt: ['Mitmachen', 'Zuschauen', 'Snacks verkaufen'], quote: [52, 30, 18] },
  4: { frage: 'Wie viele Stunden Handy am Tag? Ehrlich.', opt: ['Unter zwei', 'Zwei bis vier', 'Mehr. Frag nicht.'], quote: [17, 46, 37] },
  5: { frage: 'Was zählt im Dezember am meisten?', opt: ['Ferien', 'Geschenke', 'Leute treffen'], quote: [44, 19, 37] },
  6: { frage: 'Welchen Satz würdest du gern öfter hören?', opt: ['„Gut gemacht.“', '„Ich hör dir zu.“', '„Pizza ist da.“'], quote: [33, 29, 38] },
  7: { frage: 'Kantine: Wo sitzt du am liebsten?', opt: ['Am Fenster', 'Bei meinen Leuten', 'Egal, Hauptsache warm'], quote: [24, 58, 18] },
  8: { frage: 'Glaubst du, was du online siehst?', opt: ['Fast nie', 'Manchmal', 'Kommt drauf an, wer es postet'], quote: [21, 47, 32] },
  9: { frage: 'Was hilft dir, wenn du nicht schlafen kannst?', opt: ['Musik', 'Mit wem reden', 'Nichts. Ich lieg da.'], quote: [41, 23, 36] },
  10: { frage: 'Ein Wort für dein erstes Jahr?', opt: ['Chaos', 'Gewachsen', 'Freunde'], quote: [30, 27, 43] },
};
const zoeErgebnis = (k) => (m) => {
  const u = UMFRAGE[k], a = m['zoe_' + k];
  if (a == null) return [];
  const p = u.quote[a];
  return [['s', 'Ergebnis von letzter Woche: „' + u.opt[a] + '“ – ' + p + ' Prozent.'], ['s', p >= 40 ? 'Du liegst voll im Trend.' : 'Du bist in der Minderheit. Mutig.']];
};
const zoeFrage = (k) => ({ wahl: UMFRAGE[k].opt.map((t, i) => ({ t: '„' + t + '“', merke: 'zoe_' + k + '=' + i, dann: [['s', ['Notiert. Danke!', 'Interessant. Kommt in die Ausgabe.', 'Ha. Wusste ich.'][i]]] })) });
const zoe = (k, vorher, nachher) => (m) => [...(k > 1 ? zoeErgebnis(k - 1)(m) : []), ...vorher, ['s', UMFRAGE[k].frage], zoeFrage(k), ...nachher];

export const STAMM = [
  {
    id: 'gilles', ort: 'Innenhof, Sitzstufen', steckbrief: '5ème. Schreibt ein Lied über die Annexe. Jede Woche ein Vers.', name: 'Gilles (5ème)', farbe: '#6b4e8a',
    aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#e0b48c', haar: '#2b1d14', oben: '#6b4e8a', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.8, frisur: 'locken' },
    steht: [-11.6, -46.25, 0, 'sitzt'],
    besuch: {
      1: [['s', 'Neu? Sieht man. Du schaust noch nach oben.'], ['s', 'Ich bin Gilles. 5ème. Ich schreib ein Lied über die Annexe.'],
        { wahl: [{ t: '„Wie geht es?“', dann: [['s', '(singt) „Der Bus fährt um sieben. Ich steh um zehn nach da.“'], ['s', 'Ist noch nicht fertig. Ist ein Jahresprojekt.']] },
          { t: '„Ein Lied? Über die Schule?“', dann: [['s', 'Über alles hier. Die Tauben. Den Automaten. Euch.'], ['s', 'Komm wieder. Jede Woche ein Vers.']] }] }],
      2: [['s', 'Vers zwei: „In der Kantine gibt es Soße. Mit Nudeln. Oder umgekehrt.“'], ['s', 'Real talk: Listen über Leute sind das Letzte.'], ['s', 'Hab ich auch mal mitgemacht.'], ['s', 'Bereut. Bis heute.']],
      3: [['s', 'Vers drei: „Beim Sportfest rennt die halbe Schule. Die andere filmt.“'], ['s', 'Tipp vom Alten: Nicht jedes Video muss irgendwohin.']],
      4: [['s', 'Vers vier fehlt. Ich hab eine Schreibblockade.'], ['du', 'Und jetzt?'], ['s', 'Pause. Spazieren. Atmen. Klingt langweilig. Hilft aber.'], ['s', '… Okay, es kommt: „Im November ist es grau. Wir auch.“']],
      5: [['s', 'Vers fünf: „Ein Screenshot reist schneller als der Bus.“'], ['s', 'Real talk: Was online ist, bleibt.'], ['s', 'Aber Leute vergessen schneller, als du denkst.'], ['s', 'Und die, die bleiben, sind die richtigen.']],
      6: [['s', 'Vers sechs. Der ist ernst. „Ein Satz kann reparieren.“'], ['s', 'Hab ich zu spät gecheckt. Mit meinem besten Freund damals.'], { wahl: [{ t: '„Und heute?“', dann: [['s', 'Heute reden wir wieder. Hat ein Jahr gedauert.'], ['s', 'Ich würd’s wieder machen. Nur früher.']] }, { t: '(Nur nicken.)', dann: [['s', 'Ja. Genau so.']] }] }],
      7: [['s', 'Vers sieben: „Zwei Tische, eine Kantine. Und ich sitz einfach dazwischen.“'], ['s', 'Ehrlich: Dazwischen ist gar nicht so schlecht. Man hört beide Seiten.']],
      8: [['s', 'Vers acht: „Dreihundert Herzen. Null Wahrheit.“'], ['s', 'Wenn etwas zu krass klingt, um wahr zu sein: Ist es meistens.']],
      9: [['s', 'Ich schlaf auch schlecht vor Konzerten. Ich spiel am Schulfest.'], ['s', 'Mein Trick: Ich schreib auf, was mich wach hält.'], ['s', 'Dann liegt es auf dem Papier. Nicht im Kopf.']],
      10: [['s', 'Es ist fertig. Willst du es hören?'], { wahl: [{ t: '„Klar!“', merke: 'gillesLied', dann: [['e', 'Gilles spielt Luftgitarre.'], ['s', '„Der Bus fährt um sieben, ich steh um zehn nach da …“'], ['s', '„… ein Jahr voller Soße, Screens und Leuten, die bleiben.“'], ['e', 'Ein paar Leute auf den Stufen klatschen. Gilles wird rot.'], ['s', 'Danke, dass du jede Woche gekommen bist. Ehrlich.']] },
        { t: '„Spiel es am Schulfest. Ich komm.“', merke: 'gillesLied', dann: [['s', 'Deal. Erste Reihe. Und du klatschst zuerst, ja?']] }] }],
    },
    nochmal: ['(summt) Der Bus fährt um sieben …', 'Reim auf „Annexe“? Ich find keinen.', 'Komm nächste Woche. Neuer Vers.'],
  },
  {
    id: 'zoe', ort: 'Eingangshalle', steckbrief: 'Macht die Schülerzeitung. Jede Woche eine Umfrage.', name: 'Zoé · Annexe News', farbe: '#e85d75',
    aussehen: { modell: 'frauen', stil: 'Casual', haut: '#8d5a3b', haar: '#1b1410', oben: '#e85d75', unten: '#2d3748', schuhe: '#ffffff', hoehe: 1.58 },
    steht: [-4.4, -6.4, 0.3, 'redet'],
    besuch: {
      1: zoe(1, [['s', 'Hi! Zoé, 6ème. Ich mach die Schülerzeitung. Annexe News.'], ['s', 'Jede Woche eine Frage. Anonym. Dauert zehn Sekunden.']], [['s', 'Komm nächste Woche. Dann gibt’s das Ergebnis.']]),
      2: zoe(2, [], []), 3: zoe(3, [], []), 4: zoe(4, [], [['s', 'Ich übrigens: zwei bis vier. Ich arbeite dran.']]),
      5: zoe(5, [['s', 'Wir schreiben nichts über den Screenshot. Gerüchte drucken wir nicht.']], []),
      6: zoe(6, [], []), 7: zoe(7, [], []), 8: zoe(8, [['s', 'Diese Woche: ein Text, wie man Fakes erkennt. Drei Tipps.'], ['s', 'Wer postet es? Wo kommt es her? Wer hat was davon?']], []),
      9: zoe(9, [], []),
      10: (m) => [...zoeErgebnis(9)(m), ['s', 'Letzte Ausgabe. Letzte Frage.'], ['s', UMFRAGE[10].frage], zoeFrage(10),
        ['s', 'Danke fürs Mitmachen. Jede Woche.'], ['s', 'Du kommst auf Seite drei: „Treueste Leserschaft“.'], ['s', 'Ohne Namen natürlich. Aber du weißt es.']],
    },
    nochmal: ['Die Ausgabe hängt Freitag an der Pinnwand.', 'Hast du eine Story für uns? Nur nette.', 'Psst. Nächste Woche: Umfrage über Hausaufgaben.'],
  },
  {
    id: 'jeff', ort: 'Eingangshalle, Fundkiste', steckbrief: 'Verliert jede Woche etwas. Gibt nie auf.', name: 'Jeff (6ème)', farbe: '#3f78b8',
    aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#d9b36a', oben: '#3f78b8', unten: '#3a3f4b', schuhe: '#e85d75', hoehe: 1.6, kopf: 'cap', kopfFarbe: '#e9b949' },
    steht: [5.4, -12.1, Math.PI / 2, 'handy'],
    besuch: {
      1: [['s', 'Hast du eine grüne Trinkflasche gesehen? Sie heißt Wasserfall.'], { wahl: [
        { t: '„Wo warst du zuletzt mit ihr?“', merke: 'jeffTipp', dann: [['s', '… Sport. Dann Kantine. Dann … oh.'], ['s', 'Kantine! Danke! Zurückdenken. Genial.']] },
        { t: '„Schau in die Fundkiste.“', dann: [['s', 'Da wohne ich quasi schon. Sie ist nicht drin.']] },
        { t: '„Keine Ahnung, sorry.“', dann: [['s', 'Kein Problem. Die Suche geht weiter.']] }] }],
      2: [['s', 'Neue Woche, neues Problem: mein Turnbeutel.'], ['s', 'Er riecht. Also, man findet ihn eigentlich leicht.']],
      3: (m) => [['s', m.jeffTipp ? 'Dein Tipp mit dem Zurückdenken! Wasserfall war in der Kantine.' : 'Wasserfall ist wieder da. Lag in der Kantine.'], ['s', 'Aber jetzt: linker Schuh. Seit dem Sportfest.'], ['du', 'Wie verliert man EINEN Schuh?'], ['s', 'Mit Talent.']],
      4: [['s', 'Ladekabel. Weg. Mein Handy hat noch drei Prozent.'], ['s', 'Weißt du was? Ich lass es einfach leer.'], ['s', 'Mal sehen, wie das ist.']],
      5: [['s', 'Meine Mütze ist weg. Im Dezember. Meine Ohren sind sauer.'], ['s', 'Wenn du eine blaue Mütze mit Bommel siehst: Das ist sie.']],
      6: [['s', 'Hausaufgaben verloren. Ehrlich.'], ['du', 'Der Hund hat sie gefressen?'], ['s', 'Ich hab keinen Hund. Das macht es noch peinlicher.'], ['s', 'Ich hab es der Lehrerin einfach gesagt. Ging. Ich mach sie neu.']],
      7: [['s', 'Schlüssel. Weg. Ich sitz heute bei Oma.'], ['s', 'Oma hat Kuchen. Also … eigentlich Glück.']],
      8: [['s', 'Ich hab mein Handy verloren. Seit drei Tagen.'], ['s', 'Und weißt du was? Ich hab ein Buch gelesen. Ein ganzes.'], ['s', 'Bitte sag es niemandem. Ich hab einen Ruf.']],
      9: [['s', 'Diesmal hab ich nichts verloren. Ich bin nervös.'], ['s', 'Fühlt sich an, als ob gleich was passiert.']],
      10: [['e', 'Jeff steht vor der Fundkiste. Sie ist voll mit seinen Sachen.'], ['s', 'Wasserfall! Mein Schuh! Das Kabel! Die Mütze!'], ['s', 'Das ganze Jahr. In einer Kiste.'], ['s', 'Danke, dass du immer gefragt hast. Das war nett.'], ['s', '… Wo ist eigentlich mein Rucksack?']],
    },
    nochmal: ['Suchst du auch was? Wir könnten ein Team sein.', 'Fundkiste. Zweites Zuhause.', 'Wenn du was findest, ist es wahrscheinlich meins.'],
  },
  {
    id: 'rosa', ort: 'Bäckerei gegenüber', steckbrief: 'Kennt jeden. Backt, was gerade Saison hat.', name: 'Rosa · Boulangerie', farbe: '#c0392b',
    aussehen: { modell: 'frauen', stil: 'Casual', haut: '#f0c9a8', haar: '#7a7a7a', oben: '#ffffff', unten: '#c0392b', schuhe: '#2b2b2b', hoehe: 1.6 },
    steht: [0.4, 56.2, Math.PI, 'redet'],
    besuch: {
      1: [['s', 'Moien, Schatz! Neu an der Annexe?'], ['s', 'Sieht man an der Jacke. Zu sauber.'], ['s', 'Diese Woche: Quetschentaart. Zwetschgen von hier. Ist September!'], ['s', 'Bis muer!']],
      2: [['s', 'Moien! Deine Klasse war gestern hier. Laut. Aber höflich. Fast.'], ['s', 'Ein Tipp: Die Kirsch-Teilchen sind um zehn nach zehn noch warm.']],
      3: [['s', 'Oktober! Äppeltaart. Die Äpfel sind aus dem Garten meiner Schwester.'], ['s', 'Sportfest? Ich hab euch rennen sehen. Bravo. Alle. Auch die Letzten.']],
      4: [['s', 'Grauer Montag, Schatz? Ein warmes Brötchen hilft. Kein Wunder. Aber ein bisschen.'], ['s', 'Ich bin seit fünf Uhr wach. Erzähl mir nichts von müde. Hihi.']],
      5: [['s', 'Bald kommt de Kleeschen! Boxemännercher, frisch aus dem Ofen.'], ['s', 'Wer ein Lächeln mitbringt, kriegt ein kleines. Heute nur.'], ['e', 'Sie legt dir ein kleines Teigmännchen in die Hand. Mit Rosinenaugen.']],
      6: [['s', 'Fuesend! Ich hab Verwurelter gebacken. Mit viel Zucker obendrauf.'], ['s', 'Und du? Verkleidest du dich? Ich geh als Bäckerin. Jedes Jahr. Ha!']],
      7: [['s', 'Bretzelsonndeg kommt. Wer eine Bretzel schenkt, mag wen.'], ['s', 'Pass auf, wem du eine gibst.'], ['du', 'Und wenn man sie zurückgibt?'], ['s', 'Dann gibt’s Ostern ein Ei zurück. So geht das hier.']],
      8: [['s', 'Ich hab gehört, im Internet ist was los wegen einem Video.'], ['s', 'Wenn ich was höre, frag ich nach.'], ['s', 'Ich erzähl es nicht weiter.']],
      9: [['s', 'Juni! Erdbeertaart. Und du siehst müde aus, Schatz.'], ['s', 'Wenn’s schwer ist: reden. Mit wem, der zuhört.'], ['s', 'Ich hör auch zu. Und hab Kuchen.']],
      10: [['s', 'Letzte Woche! Eis gibt’s jetzt auch. Vanille, Erdbeer, Pistazie.'], ['s', 'Du warst ein gutes Jahr lang hier. Bis September, Schatz. Äddi!']],
    },
    nochmal: ['Merci villmools, Schatz!', 'Nicht drängeln, jeder kriegt was.', 'Wéi geet et? Gut? Gut.'],
  },
  {
    id: 'nik', ort: 'Bushaltestelle', steckbrief: 'Füttert Gerd. Erzählt vom alten Junglinster.', name: 'Opa Nik', farbe: '#5a6b5a',
    aussehen: { modell: 'menschen', stil: 'Suit', haut: '#f1c7a2', haar: '#d8d8d8', oben: '#6f7b5a', unten: '#3a3f4b', schuhe: '#3a2a1c', hoehe: 1.72, kopf: 'muetze', kopfFarbe: '#5a4a3a' },
    steht: [-23.2, 41.85, 0, 'sitzt'],
    besuch: {
      1: [['s', 'Moien. Siehst du die Taube mit dem schiefen Kopf? Das ist Gerd.'], ['s', 'Ich füttere ihn seit vier Jahren. Er dankt es nie.'], ['s', 'Typisch Gerd.']],
      2: [['s', 'Siehst du den Sendemast da hinten?'], ['s', 'Früher hörte halb Europa Radio aus Junglinster.'], ['s', 'Stell dir vor: Musik aus unserem Dorf. Bis nach England.']],
      3: [['s', 'Ich war auch hier in der Schule. Damals war alles kleiner.'], ['s', 'Schlecht in Mathe. Gut in Freundschaften.'], ['s', 'Das zweite hat mehr gebracht.']],
      4: [['s', 'November. Die Nebel kommen. Gerd mag keinen Nebel.'], ['s', 'Weißt du, was man bei Nebel macht? Langsamer fahren. Im Leben auch.']],
      5: [['s', 'Ich hab heute einen Schal für Gerd gestrickt. Er will ihn nicht.'], ['s', 'Schenken ist trotzdem schön. Auch wenn es keiner will. Hihi.']],
      6: [['s', 'Früher hat man über Gefühle nicht geredet. War nicht besser.'], ['s', 'Mein Bruder und ich haben zehn Jahre geschwiegen. Wegen nichts.'], ['s', 'Ein Satz hätte gereicht. Sag ihn früher als wir.']],
      7: [['s', 'Der Frühling kommt. Gerd hat eine Freundin.'], ['s', 'Ich nenn sie Gerda.'], ['s', 'Sie sitzen immer zusammen. Auch wenn es regnet. Das ist Freundschaft.']],
      8: [['s', 'Mein Enkel hat mir ein Video gezeigt. Angeblich von euch.'], ['s', 'Ich hab gesagt: Ich glaub, was ich selbst sehe.'], ['s', 'Mit meinen eigenen Augen. Hier.']],
      9: [['s', 'Du schläfst schlecht? Ich auch.'], ['s', 'Mit achtzig ist das normal. Mit zwölf nicht.'], ['s', 'Erzähl es wem. Einem von den Großen da drin.'], ['s', 'Die sind gut, glaub ich.']],
      10: [['s', 'Ein Jahr. Gerd ist frecher geworden. Ich langsamer. Du größer.'], ['s', 'Komm im September wieder vorbei. Gerd vergisst niemanden. Ich auch nicht.']],
    },
    nochmal: ['Gerd! … Er ignoriert mich.', 'Der Bus ist wieder zu spät. Wie 1974.', 'Setz dich ruhig. Die Bank ist für alle.'],
  },
  {
    id: 'paulo', ort: 'Hinterhof der Kantine', steckbrief: 'Bringt Gemüse. Und jede Woche ein Wort Portugiesisch.', name: 'Paulo · Lieferant', farbe: '#2f6b57',
    aussehen: { modell: 'menschen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#2f6b57', unten: '#2d3748', schuhe: '#3a2a1c', hoehe: 1.76, kopf: 'cap', kopfFarbe: '#2f6b57' },
    steht: [31.7, -11.4, 0, 'redet'],
    besuch: {
      1: [['s', 'Bom dia! Ich bring das Gemüse für die Kantine. Jeden Montag.'], ['s', 'Wort der Woche, auf Portugiesisch: „Bom dia“. Heißt: Guten Tag.'], ['s', 'Nächste Woche ein neues. Versprochen.']],
      2: [['s', 'Wort der Woche: „Obrigado“. Danke.'], ['s', 'Sagt man viel zu selten. Probier es heute dreimal.']],
      3: [['s', 'Wort der Woche: „Saudade“. Schwer zu übersetzen.'], ['s', 'Wenn du jemanden vermisst. Oder etwas.'], ['s', 'Traurig und schön zugleich.']],
      4: [['s', 'Fogo, die Kisten sind schwer heute!'], ['s', 'Wort der Woche: „Calma“. Ruhig. Erst atmen, dann tragen.']],
      5: [['s', 'Wort der Woche: „Feliz Natal“. Frohe Weihnachten!'], ['s', 'Meine Mutter macht Bacalhau. Das Haus riecht nach Fisch.'], ['s', 'Ich liebe es.']],
      6: [['s', 'Wort der Woche: „Desculpa“. Entschuldigung.'], ['s', 'Kleines Wort. Großer Effekt. Wenn man es meint.']],
      7: [['s', 'Wort der Woche: „Amigo“. Das kennst du schon, oder?'], ['s', 'Ein Amigo hilft dir tragen. Auch wenn er nicht muss.']],
      8: [['s', 'Wort der Woche: „Mentira“. Lüge.'], ['s', 'Mein Opa sagte: Eine Lüge läuft schnell. Aber die Wahrheit kommt an.']],
      9: [['s', 'Wort der Woche: „Dorme bem“. Schlaf gut.'], ['s', 'Mein Trick: Ich denk an das Meer. An die Wellen.'], ['s', 'Eins, zwei. Eins, zwei.']],
      10: [['s', 'Letzte Lieferung vor dem Sommer! Wort der Woche: „Até já“. Bis bald.'], ['s', 'Du hast zehn Wörter gelernt. Bom trabalho! Gute Arbeit, amigo.']],
    },
    nochmal: ['Cuidado, die Kiste ist schwer!', 'Tomaten, Karotten, Kartoffeln. Und gute Laune.', 'Até já!'],
  },
];

// Szene für einen Besuch: Kapitel-Szene (einmal je Kapitel), danach kurze „nochmal“-Sätze
export function stammSzene(st, kap, merke) {
  const ks = Object.keys(st.besuch).map(Number).filter((k) => k <= kap).sort((a, b) => b - a);
  const k = ks[0];
  const key = 'stb_' + st.id + '_' + k;
  if (k != null && !merke[key]) {
    const sz = st.besuch[k];
    return { neu: true, key, zeilen: typeof sz === 'function' ? sz(merke) : sz };
  }
  const n = (merke['stn_' + st.id] = (merke['stn_' + st.id] || 0) + 1);
  return { neu: false, zeilen: [['s', st.nochmal[n % st.nochmal.length]]] };
}
