// Annexe Junglinster – Stammgäste: Leute, die immer am selben Ort sind und eine eigene kleine Geschichte über das Jahr haben
// (wie die „Fremden“ in großen Open-World-Spielen). Jedes Kapitel ein neuer Besuch, der an den letzten anknüpft.
// Alle Figuren und Namen sind erfunden. Sprache: kurz, warm, mit Witz; Lux/FR/PT-Brocken wie im echten Schulalltag.
//
// Aufbau je Figur: name, farbe, aussehen (wie STATISTEN in spiel.js), steht [x, z, yaw, haltung],
// besuch[kap] = Szene (die letzte mit kap ≤ aktuellem Kapitel gilt), nochmal = kurze Sätze für weitere Besuche im selben Kapitel.
// plan (optional) = Tagesablauf: [{ ab: Uhrzeit, ort, steht, saetze? }] – ab dieser Uhrzeit steht die Figur dort (spiel.js setzt sie bei jedem
// Schritt der Geschichte um); saetze ersetzen dort die „nochmal“-Sätze.
// Szene: Liste aus ['s', text] (Stammgast), ['du', text] (Spielfigur), ['e', text] (Erzähler)
//        oder { wahl: [{ t, merke?, dann: [...] }] }.  {name} wird ersetzt.
// Rückblick: eine Szene kann eine Funktion (merke) => Liste sein, um frühere Antworten aufzugreifen.
// reaktion (optional) = (merke) => [{ key, zeilen } | null, …] – einmalige Antworten auf das, was die Spielfigur in der Welt getan hat.

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
    plan: [{ ab: 0, ort: 'Innenhof, Sitzstufen', steht: [-11.6, -46.25, 0, 'sitzt'] },
      { ab: 15.0, ort: 'Nach der Schule: Musikraum (Bandprobe)', steht: [54.6, -60.6, 0.64, 'redet'], saetze: ['Bandprobe! Noor gibt den Takt an. Ich halte kaum mit.', 'Wir suchen immer noch einen Bass. Kannst du Bass?'] }],
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
      10: [['s', 'Es ist fertig. Willst du es hören?'], { wahl: [{ t: '„Klar!“', merke: 'gillesLied', dann: [['e', 'Gilles spielt Luftgitarre.'], ['s', '„Der Bus fährt um sieben, ich steh um zehn nach da …“'], ['s', '„… ein Jahr voller Soße, Screens und Leuten, die bleiben.“'], ['s', '„Und Gerd, die Taube, schaut von oben zu.“'], ['e', 'Ein paar Leute auf den Stufen klatschen. Gilles wird rot.'], ['s', 'Danke, dass du jede Woche gekommen bist. Ehrlich.']] },
        { t: '„Spiel es am Schulfest. Ich komm.“', merke: 'gillesLied', dann: [['s', 'Deal. Erste Reihe. Und du klatschst zuerst, ja?']] }] }],
    },
    reaktion: (m) => [   // Situationen (situationen.js): Gilles ist in der 5ème, wie Dex
      m.sit_fest === 'getrunken' ? { key: 'stx_gilles_fest', zeilen: [['s', 'Du warst nicht beim Auftritt. Die erste Reihe war frei.'], ['s', 'Ich hab den letzten Vers trotzdem gesungen. Für dich.']] } : null,
      m.sit_fest === 'mitgenommen' ? { key: 'stx_gilles_fest2', zeilen: [['s', 'Ich hab dich gesehen. Mit Mika, ganz vorne.'], ['s', 'Ihr habt zu früh geklatscht. Bestes Publikum ever.']] } : null,
      ['nein', 'gegangen', 'umgelenkt', 'ausrede'].includes(m.sit_wald) ? { key: 'stx_gilles_wald', zeilen: [['s', 'Dex hat erzählt, dass du an der Lichtung warst.'], ['s', 'Und dass du nicht mitgemacht hast.'],
        ['s', 'Ich kenn Dex seit der Grundschule. Er war mal anders.'], ['s', 'Du hast was gemacht, was ich mit zwölf nicht konnte.']] } : null,
      m.sit_wald === 'mitgemacht' ? { key: 'stx_gilles_wald2', zeilen: [['s', 'Ich hab das Video gesehen. Mo hat es rumgeschickt.'], ['s', 'Ich sag nix Schlaues. Nur: Ich stand auch mal da.'],
        ['s', 'Hat mir nichts gebracht. Außer Bauchweh. Und ein Video.'], ['s', 'Wenn du reden willst: Ich sitz jeden Tag hier.']] } : null,
    ],
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
    reaktion: (m) => [
      m.sit_laden === 'geklaut' || m.sit_wald === 'mitgemacht' || (m.sit_halle === 'gefilmt' && !m.halleGeloescht) ? { key: 'stx_zoe_video', zeilen: [['s', 'Jemand wollte uns ein Video schicken. Für die Zeitung.'],
        ['s', 'Wir drucken keine Videos. Schon gar nicht von Leuten aus der 7ème.'], ['s', 'Ich hab es gelöscht. Nur, dass du es weißt.']] } : null,
      m.geholfen >= 3 ? { key: 'stx_zoe_helfen', zeilen: [['s', 'Für die Annexe News: Hier hilft jemand ständig Leuten.'], ['s', 'Ohne Namen. Aber ich weiß, wer es ist.']] } : null,
    ],
    nochmal: ['Die Ausgabe hängt Freitag an der Pinnwand.', 'Hast du eine Story für uns? Nur nette.', 'Psst. Nächste Woche: Umfrage über Hausaufgaben.'],
  },
  {
    id: 'jeff', ort: 'Eingangshalle, Fundkiste', steckbrief: 'Verliert jede Woche etwas. Gibt nie auf.', name: 'Jeff (6ème)', farbe: '#3f78b8',
    aussehen: { modell: 'menschen', stil: 'Casual', haut: '#f1c7a2', haar: '#d9b36a', oben: '#3f78b8', unten: '#3a3f4b', schuhe: '#e85d75', hoehe: 1.6, kopf: 'cap', kopfFarbe: '#e9b949' },
    steht: [5.4, -12.1, Math.PI / 2, 'handy'],
    plan: [{ ab: 0, ort: 'Eingangshalle, Fundkiste', steht: [5.4, -12.1, Math.PI / 2, 'handy'] },
      { ab: 12.0, ort: 'Mittags: Lesesaal, am Bücherwagen', steht: [24.2, -64.8, 2.43, 'handy'], saetze: ['Hast du hier ein Buch gesehen? Blau. Oder grün. Mit Drachen.', 'Ich hab ein Buch ausgeliehen. Dann das Buch verloren. Dann den Ausweis.'] },
      { ab: 13.5, ort: 'Eingangshalle, Fundkiste', steht: [5.4, -12.1, Math.PI / 2, 'handy'] }],
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
    reaktion: (m) => [
      m.fundkisteWahr ? { key: 'stx_jeff_fund', zeilen: [['s', 'Weißt du was? Seit zwei Wochen verlier ich nichts mehr.'], ['s', 'Weil keiner mehr klaut. Ich bin gar kein Chaot. Fast keiner.']] } : null,
      m.handyAbgegeben ? { key: 'stx_jeff_handy', zeilen: [['s', 'Du hast ein Handy ins Sekretariat gebracht? Hab ich gehört.'], ['s', 'Wenn ich was verliere, hoffe ich auf Leute wie dich.']] } : null,
      m.fundkisteBlick >= 3 ? { key: 'stx_jeff_kiste', zeilen: [['s', 'Du schaust oft in die Fundkiste.'], ['s', 'Verlierst du auch Sachen? Willkommen im Club.']] } : null,
    ],
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
    reaktion: (m) => [   // Rosa und Tante Lisette (Épicerie) sind Freundinnen – und reden
      m.zurueckgebracht ? { key: 'stx_rosa_lisette', zeilen: [['s', 'Lisette hat mir was erzählt. Ohne Namen.'], ['s', 'Jemand kam zurück und hat bezahlt. Sie war ganz gerührt.'],
        ['s', '… Du wirst ja rot. Ich sag nichts. Ein Croissant?']] } : null,
      m.sit_laden === 'erwischt' ? { key: 'stx_rosa_regal', zeilen: [['s', 'Lisette sagt, du räumst Regale ein wie ein Profi.'], ['s', 'Fehler machen alle. Wiedergutmachen nur wenige.']] } : null,
      m.sit_roller === 'mitgefahren' ? { key: 'stx_rosa_roller', zeilen: m.rollerSorry ? [['s', 'Da bist du ja. Tee geht aufs Haus.'], ['s', 'Ich fahr jetzt langsamer durch die Gasse. Und du?'], ['s', '… Zu Fuß. Gut so.']] : [['s', '(schaut dich lange an) Der Roller. Das warst du, oder?'], ['s', 'Ich hab zwei Nächte schlecht geschlafen. Nur damit du es weißt.']] } : null,
      m.sit_laden === 'bezahlt' || m.sit_laden === 'gesagt' ? { key: 'stx_rosa_gut', zeilen: [['s', 'Lisette erzählt von dir. Nur Gutes.'], ['s', 'Pass auf, sonst wirst du hier noch berühmt.']] } : null,
    ],
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
      10: [['s', 'Ein Jahr. Gerd ist frecher geworden. Ich langsamer. Du größer.'], ['s', 'Der Junge mit der Gitarre singt jetzt über Gerd. Endlich berühmt.'], ['s', 'Komm im September wieder vorbei. Gerd vergisst niemanden. Ich auch nicht.']],
    },
    reaktion: (m) => [
      m.geheimwort ? { key: 'stx_nik_gerd', zeilen: [['s', 'Gerd sagt, du kennst sein Geheimwort.'], ['s', '… Na gut. Tauben reden nicht. Aber er guckt so.']] } : null,
    ],
    nochmal: ['Gerd! … Er ignoriert mich.', 'Der Bus ist wieder zu spät. Wie 1974.', 'Setz dich ruhig. Die Bank ist für alle.'],
  },
  {
    id: 'paulo', ort: 'Hinterhof der Kantine', steckbrief: 'Bringt Gemüse. Und jede Woche ein Wort Portugiesisch.', name: 'Paulo · Lieferant', farbe: '#2f6b57',
    aussehen: { modell: 'menschen', stil: 'Casual', haut: '#c68e64', haar: '#1b1410', oben: '#2f6b57', unten: '#2d3748', schuhe: '#3a2a1c', hoehe: 1.76, kopf: 'cap', kopfFarbe: '#2f6b57' },
    steht: [31.7, -11.4, 0, 'redet'],
    besuch: {
      1: [['s', 'Bom dia! Ich bring das Gemüse für die Kantine. Jeden Morgen.'], ['s', 'Wort der Woche, auf Portugiesisch: „Bom dia“. Heißt: Guten Tag.'], ['s', 'Nächste Woche ein neues. Versprochen.']],
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
    reaktion: (m) => [   // Der Witz (situationen.js): Paulo vergisst nicht, wer neben ihm stand
      m.sit_witz === 'gefragt' || m.sit_witz === 'geholfen' ? { key: 'stx_paulo_witz', zeilen: [['s', 'Da ist ja mein Kisten-Team! Bom dia!'], ['s', 'Die zwei von neulich haben sich entschuldigt. Stell dir vor.'], ['s', 'Respeito. Hast du nicht vergessen, oder?']] } : null,
      m.pauloDesculpa ? { key: 'stx_paulo_desculpa', zeilen: [['s', 'Desculpa angenommen. Wirklich.'], ['s', 'Jeder lacht mal falsch. Wichtig ist, was danach kommt.']] } : null,
      m.sit_witz === 'mitgelacht' && !m.pauloDesculpa ? { key: 'stx_paulo_kalt', zeilen: [['s', 'Bom dia.'], ['e', 'Er lächelt. Aber nicht so wie früher.']] } : null,
    ],
    nochmal: ['Cuidado, die Kiste ist schwer!', 'Tomaten, Karotten, Kartoffeln. Und gute Laune.', 'Até já!'],
  },
  {
    id: 'lou', ort: 'Kantine, hinterer Tisch', steckbrief: 'Bewertet jedes Essen mit Sternen. Und irgendwann die Leute.', name: 'Lou (6ème)', farbe: '#d9693f',
    aussehen: { modell: 'frauen', stil: 'Casual', haut: '#e0b48c', haar: '#5a3a24', oben: '#d9693f', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.56 },
    steht: [19.55, -11.1, Math.PI / 2, 'sitzt'],
    plan: [{ ab: 0, ort: 'Vormittags: Lesesaal', steht: [19.7, -65.65, 0, 'sitzt'], saetze: ['Ich lese die Speisekarte von morgen. Spannender als jeder Krimi.', 'Psst. Hier drin bewerte ich nur Bücher.'] },
      { ab: 11.9, ort: 'Kantine, hinterer Tisch', steht: [19.55, -11.1, Math.PI / 2, 'sitzt'] }],
    besuch: {
      1: [['s', 'Montag: Nudeln mit Soße. Drei Sterne.'], ['s', 'Die Soße hat sich Mühe gegeben.'],
        { wahl: [{ t: '„Darf ich mich dazusetzen?“', merke: 'louDazu', dann: [['s', 'Klar. Aber ich bewerte dich auch.'], ['s', 'Spaß. Halb-Spaß.']] },
          { t: '„Du bewertest das Essen?“', dann: [['s', 'Jeden Tag. Ich schreib ein Buch. „Kantine: Die Wahrheit“.']] }] }],
      2: [['s', 'Soße mit Nudeln. Zwei Sterne.'], ['s', 'Zu viel Soße. Oder zu wenig Nudeln. Sehr philosophisch.']],
      3: [['s', 'Sportfest-Woche. Bananen überall.'], ['s', 'Fünf Sterne für die Banane. Sie war einfach da.']],
      4: [['s', 'Testwoche. Ich hab vor Stress nichts geschmeckt.'], ['s', 'Null Sterne. Liegt an mir, nicht am Essen.'], ['du', 'Und jetzt?'], ['s', 'Jetzt kau ich langsam. Hilft ein bisschen.']],
      5: [['s', 'Weihnachtsessen! Kakao: fünf Sterne.'], ['s', 'Kakao ist immer fünf Sterne. Naturgesetz.']],
      6: [['s', 'Ich hab heute mit wem gegessen, mit dem ich Streit hatte.'], ['s', 'Essen: drei Sterne. Gespräch: vier.']],
      7: (m) => [['s', 'Neue Regel: Ich bewerte jetzt auch die Gesellschaft.'], ['s', m.louDazu ? 'Du: vier Sterne. Du hast dich damals einfach dazugesetzt.' : 'Du: vier Sterne. Fünf, wenn du Ketchup teilst.']],
      8: [['s', 'Jemand hat ein Fake-Foto von meinem Teller gepostet. Mit Ananas.'], ['s', 'Ich esse keine Ananas. Das ist Rufschädigung!'], ['s', 'Hab’s gemeldet. Und allen gesagt: Ich war’s nicht.']],
      9: [['s', 'Gemüse-Woche. Paulo hat erzählt, woher die Karotten sind.'], ['s', 'Schmeckt anders, wenn man es weiß.']],
      10: [['s', 'Jahresbewertung. Kantine: vier Sterne.'], ['s', 'Die Leute hier: fünf.'], ['s', 'Das Essen war nie der Punkt. Hab ich jetzt gecheckt.']],
    },
    reaktion: (m) => [
      m.sit_wette === 'wippe' ? { key: 'stx_lou_wippe', zeilen: [['s', 'Gerücht: Am Spielplatz gab es ein Wippen-Turnier. Statt Dosen.'], ['s', 'Fünf Sterne. Ich will nächstes Mal mitmachen.']] } : null,
      m.sit_laden === 'bezahlt' ? { key: 'stx_lou_bezahlt', zeilen: [['s', 'Gerücht: Jemand hat in der Épicerie bezahlt. Obwohl einer gefilmt hat.'], ['s', 'Fünf Sterne. Von fünf.']] } : null,
      m.dazugesetzt ? { key: 'stx_lou_dazu', zeilen: [['s', 'Ich hab gesehen, wie du dich zu wem gesetzt hast. Einfach so.'], ['s', 'Fünf Sterne. Nicht fürs Essen. Für dich.']] } : null,
    ],
    nochmal: ['(kaut) Mmh. Vorläufig drei Sterne.', 'Psst. Die Pommes heute: Geheimtipp.', 'Setz dich, wenn du magst.'],
  },
  {
    id: 'fernand', ort: 'Gang, beim WC', steckbrief: 'Repariert alles. Nur die Uhr in der Halle nicht.', name: 'Fernand · Hausmeister', farbe: '#3d5a80',
    aussehen: { modell: 'menschen', stil: { alle: 'Worker', Head: 'Casual' }, haut: '#f1c7a2', haar: '#9a9a9a', oben: '#3d5a80', unten: '#2d3748', schuhe: '#3a2a1c', hoehe: 1.74 },
    steht: [26.6, -15.0, -Math.PI / 2, 'redet'],
    plan: [{ ab: 0, ort: 'Gang, beim WC', steht: [26.6, -15.0, -Math.PI / 2, 'redet'] },
      { ab: 12.0, ort: 'Mittags: Hinterhof, bei Paulo', steht: [32.6, -12.7, -0.6, 'redet'], saetze: ['Mittagspause. Paulo bringt mir immer eine Karotte.', 'Hier hinten ist es ruhig. Nur die Kisten klappern.'] },
      { ab: 13.5, ort: 'Gang, beim WC', steht: [26.6, -15.0, -Math.PI / 2, 'redet'] }],
    besuch: {
      1: [['s', 'Moien. Fernand. Hausmeister.'], ['s', 'Wenn was kaputt ist: Ich bin der, der kommt.'], ['s', 'Wenn DU es kaputt gemacht hast: Sag es einfach.'],
        { wahl: [{ t: '„Und wenn ich dann Ärger krieg?“', dann: [['s', 'Kaputt ist kaputt. Verstecken macht es nicht heil.'], ['s', 'Ehrlich sagen: halber Ärger. Versprochen.']] },
          { t: '„Was reparieren Sie gerade?“', merke: 'fernandUhr', dann: [['s', 'Die Uhr in der Halle. Geht drei Minuten nach.'], ['s', 'Seit 1998. Ich krieg sie noch.']] }] }],
      2: [['s', 'Heute: Kantinentür. Quietscht.'], ['s', 'Weißt du, was mehr quietscht? Manche Gruppenchats.'], ['s', 'Wer über andere lacht, lacht selten lange.']],
      3: [['s', 'Sportfest. Ich hab vierzig Hütchen aufgestellt.'], ['s', 'Und achtunddreißig wieder eingesammelt.'], ['s', 'Zwei orange Hütchen sind auf der Flucht. Augen auf.']],
      4: [['s', 'Einer wollte mir heute ein Handy verkaufen. Für fünf Euro.'], ['s', 'Ich hab Nein gesagt. Freundlich. Kurz. Fertig.'], ['s', 'Nein ist ein ganzer Satz.']],
      5: [['s', 'Lichterkette in der Halle. Dreihundert Lämpchen. Eins ist kaputt.'], ['s', 'Und dann leuchtet die ganze Kette nicht.'], ['s', 'Bei Menschen ist das zum Glück anders.'], ['s', 'Einer hat einen schlechten Tag. Die anderen leuchten weiter.']],
      6: [['s', 'Wasserhahn im WC. Erst die Schraube. Dann die Dichtung. Dann der Griff.'], ['s', 'Nicht alles auf einmal. Schritt für Schritt.'], ['s', 'So mach ich das auch mit schweren Tagen.']],
      7: [['s', 'Praktikum? Ich hab auch als Lehrling angefangen.'], ['s', 'Erster Tag: Eimer umgekippt. Weiße Farbe. Überall.'], ['s', 'Der Meister hat gelacht. Dann hab ich geputzt.'], ['s', 'Fehler am ersten Tag gehören dazu. Wirklich.']],
      8: [['s', 'Online steht, die Schule wird abgerissen.'], ['s', 'Ich steh hier. Mit Werkzeug. Sieht nicht nach Abriss aus.'], ['s', 'Erst prüfen. Dann glauben. Dann vielleicht teilen.']],
      9: [['s', 'Ich bin jeden Morgen um sechs der Erste hier.'], ['s', 'Um sechs ist die Schule ganz still. Nur die Heizung brummt.'], ['s', 'Wenn ich nicht schlafen kann, denk ich an das Brummen.']],
      10: (m) => [['e', 'Fernand steht mit einer Leiter unter der Uhr.'], ['s', m.fernandUhr ? 'Weißt du noch? Drei Minuten. Seit 1998.' : 'Die Uhr hier ging drei Minuten nach. Seit 1998.'],
        ['s', 'Heute hab ich sie gestellt. Jetzt ist sie pünktlich.'], ['s', '… Ich vermiss die drei Minuten fast.'], ['s', 'Äddi für den Sommer. Und pass auf die Hütchen auf.']],
    },
    reaktion: (m) => [
      m.huetchen >= 2 ? { key: 'stx_fernand_h2', zeilen: [['s', 'Beide Hütchen! Vierzig von vierzig.'], ['s', 'Weißt du, wie lange ich darauf gewartet hab? Merci.']] } : null,
      m.huetchen === 1 ? { key: 'stx_fernand_h1', zeilen: [['s', 'Du hast ein Hütchen zurückgebracht? Ich hab es gesehen.'], ['s', 'Neununddreißig. Eins ist noch auf der Flucht.']] } : null,
      m.sit_dach === 'leiter' ? { key: 'stx_fernand_dach', zeilen: [['s', 'Ihr habt gefragt, statt zu klettern. Das ist selten.'], ['s', 'Der Schuh von 2019 hängt an der Fundkiste. Jeff hat ihn anprobiert.']] } : null,
      m.dachGeholt ? { key: 'stx_fernand_dach2', zeilen: [['s', 'Pit humpelt noch. Aber du hast mich geholt. Gleich.'], ['s', 'Schnell sein ist manchmal wichtiger als cool sein.']] } : null,
      m.graffitiGeholfen ? { key: 'stx_fernand_wand', zeilen: [['s', 'Gute Arbeit am Bushäuschen. Deine Arme? Meine auch.'], ['s', 'Wer hilft, obwohl er nicht muss: Das merk ich mir.']] } : null,
      m.sit_graffiti === 'kiesser' ? { key: 'stx_fernand_wand3', zeilen: [['s', 'Der D3X malt jetzt im Neubau. Mit Erlaubnis!'], ['s', 'Ich hab ihm meine große Leiter geliehen. Die gute.'], ['s', 'Sag ihm nicht, dass ich stolz bin. Bin ich aber.']] } : null,
      m.sit_graffiti === 'weggemacht' ? { key: 'stx_fernand_wand4', zeilen: [['s', 'Frische Farbe geht noch ab. Gut, dass ihr gleich kamt.'], ['s', 'Der Junge hat mitgeschrubbt. Hätte ich nicht gedacht.']] } : null,
      m.sit_graffiti && !['gespruht', 'kiesser', 'weggemacht'].includes(m.sit_graffiti) ? { key: 'stx_fernand_wand2', zeilen: [['s', 'Am Bushäuschen war wieder einer. D3X.'], ['s', 'Ich kenn die Schrift. Der kann eigentlich zeichnen.']] } : null,
      m.romyMesenberg ? { key: 'stx_fernand_umkleide', zeilen: [['s', 'Herr Mesenberg wollte ein Schild. Für die Umkleide.'], ['s', '„Handys bleiben draußen.“ Hab ich gemacht. Groß.'], ['s', 'Manche Schilder sind wichtiger als andere.']] } : null,
      m.sit_wald ? { key: 'stx_fernand_wald', zeilen: [['s', 'Jeden Montag räum ich die Lichtung auf. Dosen, Stummel, alles.'], ['s', 'Die denken, das räumt sich selbst auf.'],
        ['s', 'Tut es nicht. Das bin ich. Mit dem Rücken.']] } : null,
      m.lauschen ? { key: 'stx_fernand_lausch', zeilen: [['s', 'Du hast am Lehrerzimmer gelauscht. Hab ich gesehen.'], ['s', 'Keine Sorge. Mach ich auch. Wegen dem Joghurt.']] } : null,
    ],
    nochmal: ['Moien. Alles heil?', 'Wenn du eine Schraube findest: Die gehört mir.', 'Die Uhr geht immer noch nach. Ich weiß.'],
  },
  {
    id: 'noor', ort: 'Neubau, Musikraum', steckbrief: 'Trommelt nur, wenn keiner zuschaut. Noch.', name: 'Noor (6ème)', farbe: '#2fb8a8',
    aussehen: { modell: 'frauen', stil: 'Casual', haut: '#a0694a', haar: '#1b1410', oben: '#2fb8a8', unten: '#2d3748', schuhe: '#f2f2f2', hoehe: 1.56 },
    steht: [55.8, -59.0, -Math.PI / 2, 'redet'],
    plan: [{ ab: 0, ort: 'Neubau, Musikraum', steht: [55.8, -59.0, -Math.PI / 2, 'redet'] },
      { ab: 12.0, ort: 'Mittags: Innenhof, bei Gilles', steht: [-12.8, -46.25, 0, 'sitzt'], saetze: ['Gilles summt. Ich trommle auf der Stufe mit.', 'Mittags ist der Musikraum zu. Also trommle ich hier.'] },
      { ab: 13.5, ort: 'Neubau, Musikraum', steht: [55.8, -59.0, -Math.PI / 2, 'redet'] }],
    besuch: {
      1: [['e', 'Bumm. Tschak. Bumm-bumm. Tschak.'], ['s', 'Oh! Sorry. Zu laut? Die Ampel sagt „BAND!“.'], ['s', 'Ich bin Noor. Ich spiel nur, wenn keiner da ist.'],
        { wahl: [{ t: '„Spiel ruhig weiter. Ich hör zu.“', merke: 'noorZuhoeren', dann: [['e', 'Noor spielt einen kurzen Rhythmus. Dann hört sie auf.'], ['s', 'Das war mein erstes Publikum. Ein Mensch. Zählt das?'], ['du', 'Zählt.']] },
          { t: '„Warum nur, wenn keiner da ist?“', dann: [['s', 'Wenn wer zuguckt, verspiel ich mich.'], ['s', 'Dann wird mein Kopf lauter als das Schlagzeug.']] }] }],
      2: [['s', 'Gilles fragt, ob ich in seiner Band spiele.'], ['s', 'Ich hab „vielleicht“ gesagt. Heißt bei mir: Panik.']],
      3: [['s', 'Beim Sportfest hab ich den Takt für die Staffel getrommelt.'], ['s', 'Auf einem Eimer. Keiner hat gemerkt, dass ich das war.'], ['s', 'Perfekt. Mitmachen, ohne gesehen zu werden.']],
      4: [['s', 'Gilles will, dass ich am Schulfest spiele. Vor allen.'], ['s', 'Ich hab nicht Nein gesagt. Aber auch nicht Ja.'],
        { wahl: [{ t: '„Du darfst auch Nein sagen.“', dann: [['s', 'Stimmt eigentlich.'], ['s', 'Aber ich will Ja sagen. Nur ohne Angst.']] },
          { t: '„Was bräuchtest du für ein Ja?“', merke: 'noorFrage', dann: [['s', 'Hmm. Vielleicht kleiner anfangen?'], ['s', 'Erst vor drei Leuten. Dann vor der Klasse. Dann vor allen.']] }] }],
      5: [['s', 'Ich hab vor drei Leuten gespielt. Gilles, Lou und Fernand.'], ['s', 'Fernand hat mitgewippt. Mit dem Besen.'], ['s', 'Ich hab mich zweimal verspielt. Keiner hat es gemerkt.']],
      6: (m) => [['s', m.noorFrage ? 'Deine Frage hat geholfen. „Was brauchst du für ein Ja?“' : 'Ich hab mir eine Mut-Leiter gemacht.'], ['s', 'Stufe eins: allein. Stufe zwei: drei Leute. Stufe drei: die Klasse.'],
        ['s', 'Heute ist Stufe drei. Mein Herz trommelt schon.'], ['s', 'Atmen. Vier rein, vier raus. Okay. Los.']],
      7: [['s', 'Stufe drei geschafft! Die Klasse hat geklatscht.'], ['s', 'Einer hat gepfiffen. Ich glaub, das war nett gemeint.']],
      8: [['s', 'Einer hat ein Video von mir gepostet. Ohne zu fragen.'], ['s', 'Ich hab gesagt: Bitte löschen. Er hat es gelöscht.'], ['s', 'Fragen kostet nichts. Hätte er vorher machen können.']],
      9: [['s', 'Nächste Woche Schulfest. Ich schlaf schlecht.'], ['s', 'Gilles schreibt auf, was ihn wach hält.'], ['s', 'Ich trommle es. Leise. Auf dem Kissen.']],
      10: (m) => [['e', 'Schulfest. Noor sitzt hinter dem Schlagzeug. Gilles stimmt die Gitarre.'], ['s', m.noorZuhoeren ? 'Du warst mein erstes Publikum. Weißt du noch?' : 'Ein ganzes Jahr. Von null Leuten bis zu allen.'],
        ['s', 'Bleib vorne, ja? Dann schau ich dich an. Nicht die anderen.'], ['e', 'Bumm. Tschak. Bumm-bumm. Tschak. Alle klatschen im Takt.']],
    },
    reaktion: (m) => [
      m.bandMal ? { key: 'stx_noor_band', zeilen: [['s', 'Du hast getrommelt! Ich hab’s durch die Wand gehört.'], ['s', (m.bandRekord || 0) >= 70 ? 'Ehrlich: Das war gut. Echt gut.' : 'Laut. Mutig. Weiter üben. Mach ich auch.']] } : null,
      // Situation „Die Wand“: Noor hat letztes Jahr die Trommel im Bushäuschen gemalt
      m.graffitiGesagt ? { key: 'stx_noor_wand1', zeilen: [['s', 'Die neue Trommel ist fertig. Mit deinen Farben.'], ['s', 'Ehrlich sein war schwer, oder? Für mich auch. Zuhören.'], ['s', 'Aber jetzt ist sie schöner als vorher.']] } : null,
      m.sit_graffiti === 'reden' ? { key: 'stx_noor_wand2', zeilen: [['s', 'Dex hat sich entschuldigt. DEX! Bei mir!'], ['s', 'Er malt die Trommel neu. Ich sag ihm, welche Farben.']] } : null,
      m.sit_graffiti === 'weggemacht' ? { key: 'stx_noor_wand3', zeilen: [['s', 'Meine Trommel im Bushäuschen ist jetzt rosa. Ein bisschen.'], ['s', 'Komisch. Gefällt mir sogar.']] } : null,
      m.graffitiGeholfen ? { key: 'stx_noor_wand4', zeilen: [['s', 'Danke nochmal fürs Schrubben. Die Trommel mal ich neu.'], ['s', 'Willst du helfen? Du hast ja schon Übung.']] } : null,
    ],
    nochmal: ['(trommelt auf den Tisch) Bumm-tschak.', 'Psst. Ich üb gerade Stufe drei.', 'Zu laut? Sag Bescheid.'],
  },
  {
    id: 'tiago', ort: 'Neubau, Informatik', steckbrief: 'Baut ein Spiel. Sucht Testpersonen. Ehrliche.', name: 'Tiago (6ème) · Coding-Club', farbe: '#2b3a55',
    aussehen: { modell: 'menschen', stil: 'Casual2', haut: '#d7a97f', haar: '#3a2a1c', oben: '#2b3a55', unten: '#3a3f4b', schuhe: '#e9b949', hoehe: 1.58 },
    steht: [60.4, -39.45, Math.PI, 'sitzt'],
    plan: [{ ab: 0, ort: 'Neubau, Informatik', steht: [60.4, -39.45, Math.PI, 'sitzt'] },
      { ab: 12.0, ort: 'Mittags: CDI, an den Computern', steht: [-13.7, -19.5, 0, 'redet'], saetze: ['Im CDI ist das WLAN besser. Verrat es keinem.', 'Ich teste mein Spiel. Ganz leise.'] },
      { ab: 13.5, ort: 'Neubau, Informatik', steht: [60.4, -39.45, Math.PI, 'sitzt'] }],
    besuch: {
      1: [['s', 'Hey. Kurze Frage: Läuft deine Figur rückwärts?'], ['du', '… Nein?'], ['s', 'Meine schon. In meinem Spiel. Ich bau ein Spiel.'], ['s', 'Das ist kein Fehler. Das ist ein Extra. Sag ich mir.']],
      2: [['s', 'Testest du mein Spiel? Sag ehrlich, was du denkst.'], ['e', 'Ein Kreis hüpft über Kästen. Manchmal fällt er durch den Boden.'],
        { wahl: [{ t: '„Hüpfen: cool. Durchfallen: nervt. Kästen dicker?“', merke: 'tiagoFeedback', dann: [['s', 'Oh. Das hilft mir richtig.'], ['s', 'Was gut ist, was nervt, und eine Idee. Merk ich mir.']] },
          { t: '„Ist voll gut!“', dann: [['s', 'Danke! … Aber was mach ich jetzt besser?'], ['s', 'Nur „gut“ ist nett. Hilft aber nicht weiter.']] },
          { t: '„Ist ziemlich schlecht.“', dann: [['s', 'Okay. … Was genau?'], ['s', 'Nur „schlecht“ tut weh. Und hilft auch nicht.']] }] }],
      3: [['s', 'Mein Spiel braucht einen Namen. Hilfst du?'],
        { wahl: [{ t: '„Gerd rennt“', merke: 'tiagoName=0', dann: [['s', 'Die Taube von Opa Nik? Genial. Gerd wird ein Star.']] },
          { t: '„Bus um sieben“', merke: 'tiagoName=1', dann: [['s', 'Ha! Den Bus kriegen. Jeden Tag. Episch.']] },
          { t: '„Annexe Run“', merke: 'tiagoName=2', dann: [['s', 'Klingt wie ein echtes Spiel. Nehm ich.']] }] }],
      4: [['s', 'Ich hab bis zwei Uhr nachts gecodet.'], ['s', 'Heute bin ich ein Zombie. Mein Code auch.'], ['s', 'Neue Regel: Nach zehn ist der Laptop zu. Ich versuch’s.']],
      5: (m) => [['s', 'Level zwei ist fertig. Mit Schnee!'], ['s', m.tiagoFeedback ? 'Die Kästen sind jetzt dicker. Dein Tipp. Keiner fällt mehr durch.' : 'Keiner fällt mehr durch den Boden. Hat ewig gedauert.']],
      6: [['s', 'Ich wollte alles auf einmal. Zehn Level. Online. Mit Musik.'], ['s', 'Dann hab ich gar nichts geschafft.'], ['s', 'Jetzt: ein Ding pro Woche. Diese Woche: der Sprung.'], ['s', 'Klingt klein. Ist aber fertig.']],
      7: [['s', 'Mein Cousin macht Praktikum. In einer Firma, die Apps baut.'], ['s', 'Er sagt: Die Hälfte der Zeit suchen alle Fehler.'], ['s', 'Ich dachte, nur ich mach Fehler. Nein. Alle.']],
      8: [['s', 'Ich hab eine KI um Hilfe gefragt.'], ['s', 'Sie hat mir Code gegeben. Sehr selbstbewusst. Komplett falsch.'], ['s', 'KI kann helfen. Prüfen musst du selbst.']],
      9: [['s', 'Ich träum schon in Code: wenn müde, dann schlafen.'], ['s', 'Klappt im Traum. Im echten Leben noch nicht.']],
      10: (m) => { const n = ['Gerd rennt', 'Bus um sieben', 'Annexe Run'][m.tiagoName] || 'Annexe Run';
        return [['s', 'Es ist fertig. „' + n + '“. Version eins.'], ['e', 'Abspann. Ganz unten, klein: „Testperson Nr. 1 – danke!“'],
          ['s', 'Das bist du. Du hast als Erstes gespielt.'], ['s', 'Nächstes Jahr: Version zwei. Mit Rückwärtslaufen. Als Extra.']]; },
    },
    reaktion: (m) => [
      m.drucker >= 4 ? { key: 'stx_tiago_druck', zeilen: [['s', 'Der Plastik-Bonbon ist fertig! Du hast zugeschaut?'], ['s', 'Dann bist du offiziell Zeuge. Ich trag dich ein.']] } : null,
      m.roboter ? { key: 'stx_tiago_rob', zeilen: [['s', 'Du hast meinen Roboter angemacht? Hat er „HALLO MENSCH“ gesagt?'], ['s', 'Hab ich ihm beigebracht. Ich bin stolz.']] } : null,
      // Situationen „Fast gewonnen“ (Rafa und die Kisten) und „Gratis“ (Fake-Link)
      m.sit_link ? { key: 'stx_tiago_link', zeilen: [['s', 'Gratis-Diamanten? Das heißt Phishing. Wie Angeln. Und du bist der Fisch.'], ['s', 'Ich hab im Coding-Club eine Folie dazu gemacht. Drei Fragen.']] } : null,
      m.sit_kiste ? { key: 'stx_tiago_kiste', zeilen: [['s', 'Rafa war bei mir. Wegen der Kisten.'], ['s', 'Mein Spiel hat jetzt einen Knopf: „Keine Kisten“.'], ['s', 'Er macht nichts. Aber er fühlt sich gut an.']] } : null,
    ],
    nochmal: ['Moment. Ich hab einen Fehler gefunden. Oder er mich.', 'Willst du testen? Ehrlich sagen, ja?', 'Speichern. Immer speichern.'],
  },
  {
    id: 'elio', ort: 'Eingangshalle, am Snackautomaten', steckbrief: 'Weiß alles über den Automaten. Knopf 14 klemmt.', name: 'Elio (6ème) · Automaten-Profi', farbe: '#d9693f',
    aussehen: { modell: 'menschen', stil: 'Casual', haut: '#e8bf9a', haar: '#7a4a2a', oben: '#e9b949', unten: '#3a3f4b', schuhe: '#2f6db0', hoehe: 1.55 },
    steht: [-6.0, -4.3, -0.86, 'handy'],
    besuch: {
      1: [['s', 'Psst. Neu? Wichtigste Info der Schule:'], ['s', 'Knopf 14 klemmt. Immer zweimal drücken. Nie dreimal.'],
        { wahl: [{ t: '„Danke für den Tipp!“', merke: 'elioTipp', dann: [['s', 'Gern. Ich bin Elio. Ich weiß alles über diesen Automaten.'], ['s', 'Über Mathe weniger. Aber das hier zählt auch.']] },
          { t: '„Warum nie dreimal?“', dann: [['s', 'Dann nimmt er dein Geld und denkt nach. Lange.'], ['s', 'Frag nicht, woher ich das weiß.']] }] }],
      2: [['s', 'Neue Sorte im Automaten: Chips „Saure Gurke“.'], ['s', 'Alle reden drüber. Mehr als über jede Gruppe.'], ['s', 'Ich hab sie probiert. Ehrlich? Okay. Nicht mehr.']],
      3: [['s', 'Sportfest-Statistik: Der Automat hat 112 Wasser verkauft.'], ['s', 'Ich hab mitgezählt. Ja, ich hab ein Hobby.']],
      4: [['s', 'Mein Bruder wollte jeden Tag Snacks. Von meinem Geld.'], ['s', 'Ich hab Nein gesagt. War komisch. Aber gut.'], ['s', 'Jetzt kauft er selber. Und klemmt bei Knopf 14.']],
      5: [['s', 'Im Dezember gibt’s Lebkuchen im Automaten.'], ['s', 'Mein Plan: einer pro Woche. Nicht pro Tag. Selbstkontrolle.']],
      6: [['s', 'Ein Riegel hing fest. Ich hab Mme Weber gefragt, ob sie aufmacht.'], ['s', 'Hab mich echt getraut. Mit Herzklopfen.'], ['s', 'Kleiner Schritt. Aber der Riegel war meiner.']],
      7: [['s', 'Ich will später Automaten reparieren. Echt.'], ['s', 'Praktikum bei der Firma, die die hier auffüllt? Ich frag mal.']],
      8: [['s', 'Online steht: Code 404 gibt Gratis-Chips.'], ['s', 'Stimmt nicht. Ich hab’s vierzigmal probiert.'], ['s', 'Lehre: Nicht alles glauben. Und Taschengeld behalten.']],
      9: [['s', 'Ich trink abends keine Cola mehr. Nur noch Wasser.'], ['s', 'Ich schlaf besser. Der Automat ist enttäuscht.']],
      10: (m) => [['s', m.elioTipp ? 'Du drückst Knopf 14 jetzt zweimal. Hab ich gesehen. Stolz.' : 'Ein Jahr Knopf 14. Ich werd ihn vermissen.'], ['s', 'Fernand repariert ihn in den Ferien. Endlich.'], ['s', '… Ehrlich gesagt hoffe ich, er klemmt weiter.']],
    },
    reaktion: (m) => [
      m.automat >= 7 ? { key: 'stx_elio_doppelt', zeilen: [['s', 'Du hast ein Doppelt gezogen? Zwei Snacks auf einmal?'], ['s', 'Respekt. Das schaffen nur Profis.']] } : null,
    ],
    nochmal: ['Knopf 14. Zweimal. Nicht vergessen.', 'Der Automat summt heute anders. Ich mach mir Sorgen.', 'Hast du 50 Cent? Nein? Ich auch nicht.'],
  },
];

// Szene für einen Besuch: Kapitel-Szene (einmal je Kapitel), danach kurze „nochmal“-Sätze
export function stammSzene(st, kap, merke, ortSaetze) {
  const ks = Object.keys(st.besuch).map(Number).filter((k) => k <= kap).sort((a, b) => b - a);
  const k = ks[0];
  const key = 'stb_' + st.id + '_' + k;
  if (k != null && !merke[key]) {
    const sz = st.besuch[k];
    return { neu: true, key, zeilen: typeof sz === 'function' ? sz(merke) : sz };
  }
  const rk = (st.reaktion ? [].concat(st.reaktion(merke) || []) : []).find((q) => q && !merke[q.key]);   // Reaktion auf etwas, das die Spielfigur getan hat (je einmal)
  if (rk) { merke[rk.key] = true; return { neu: false, zeilen: rk.zeilen }; }
  const n = (merke['stn_' + st.id] = (merke['stn_' + st.id] || 0) + 1);
  const pool = ortSaetze && ortSaetze.length ? ortSaetze : st.nochmal;
  return { neu: false, zeilen: [['s', pool[n % pool.length]]] };
}

// Wo ist die Figur um diese Uhrzeit? (letzter Plan-Eintrag mit ab ≤ uhr; ohne Plan: fester Ort)
export function stammPlan(st, uhr) {
  if (!st.plan) return { ab: 0, ort: st.ort, steht: st.steht };
  let e = st.plan[0];
  for (const q of st.plan) if (uhr >= q.ab) e = q;
  return e;
}
