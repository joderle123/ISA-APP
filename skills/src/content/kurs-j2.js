/* SKILL DECK – Inhalte für Kursjahr 2 (39 Einheiten: 35 reguläre + 4 Joker).
   Quelle: Skills-Kurs Jahr 2, jeweils der Skill-Schritt der Einheit.
   Nur Daten, keine Logik. Wird nach src/core/registry.js geladen.
   Skills anderer Jahre (sinne-54321, unsichtbare-skills, energie-check) werden nur per ID genannt.
   Freischalt-Codes Jahr 2: Thema STADT, MUSIK & SPORT. */
(function () {
  'use strict';
  const SK = window.SK;

  /* ───────────────────────── SKILL-KARTEN (Besitzer: Jahr 2) ───────────────────────── */
  SK.addSkills([
    // Modul 0 – Wieder ankommen
    {
      id: 'runterfahren-nach-wettkampf', name: 'Runterfahren', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen', params: { ein: 4, halten: 4, aus: 4, halten2: 4, runden: 3 },
      schritte: ['Zahl schätzen: Wo bist du nach dem Wettkampf?', 'Kastenatmung: 4 ein, 4 halten, 4 aus, 4 halten.', 'Zahl neu schätzen. Was hat sie gesenkt?'],
      wann: 'Nach einem Match oder Wettkampf, wenn du noch hochgedreht bist.',
      flavor: 'Abpfiff für den Puls. Auch Sieger müssen runterfahren.',
      einheit: 'j2-e02', seltenheit: 'selten',
    },
    // Modul 1 – Selbstwert und Körper
    {
      id: 'wertschaetzung-annehmen', name: 'Wertschätzung annehmen', typ: 'menschen', zonen: ['gruen'], kraft: 2,
      interaktion: 'wegwischen', params: { dinge: ['Stimmt doch gar nicht.', 'Ach, das war nichts.', 'Das sagst du nur so.'] },
      schritte: ['Jemand sagt dir, was er an dir schätzt.', 'Wisch das Abwinken weg. Nur zuhören.', 'Sag ein einziges Wort: Danke.'],
      wann: 'Wenn dir jemand etwas Nettes sagt und du es sofort wegwinken willst.',
      flavor: 'Kann man nicht kaufen. Kann man nur annehmen.',
      einheit: 'j2-e03', seltenheit: 'selten',
    },
    {
      id: 'bodyscan-dank', name: 'Bodyscan mit Dank', typ: 'koerper', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'bodyscan', params: { stellen: ['Füße', 'Beine', 'Hände', 'Bauch', 'Schultern'] },
      schritte: ['Geh langsam durch deinen Körper.', 'Frag bei jedem Teil: Was hat er heute getan?', 'Nicht bewerten. Nur bemerken.'],
      wann: 'Wenn du dich mit anderen vergleichst und dein Körper dich nervt.',
      flavor: 'Deine Füße haben dich heute tausende Schritte getragen. Ganz ohne Filter.',
      einheit: 'j2-e04', seltenheit: 'basis',
    },
    {
      id: 'selbstmitgefuehl-pause', name: 'Selbstmitgefühls-Pause', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Das ist gerade schwer.', 'Das kennen viele.', 'Was brauche ich jetzt?'] },
      schritte: ['Denk an eine kleine Panne.', 'Hand auf die Brust – wenn du magst.', 'Sag innerlich die drei Sätze. Ganz langsam.'],
      wann: 'Wenn dein innerer Kritiker laut wird – nach einer Panne oder einer blöden Nachricht.',
      flavor: 'Coach Klar statt Coach Brüll. Dauert keine Minute.',
      einheit: 'j2-e05', seltenheit: 'episch',
    },
    // Modul 2 – Stress und Schule
    {
      id: 'seufzer-atmung', name: 'Seufzer-Atmung', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'atmen', params: { ein: 3, halten: 1, aus: 7, runden: 3 },
      schritte: ['Tief durch die Nase einatmen.', 'Oben noch einen kurzen Zug nachschieben.', 'Lang und hörbar durch den Mund ausatmen.'],
      wann: 'Vor einem Test oder nach einem Streit. Geht auch leise in der Klasse.',
      flavor: 'Zweimal rein, einmal lang raus. Dein Körper versteht das sofort.',
      einheit: 'j2-e06', seltenheit: 'selten',
    },
    {
      id: 'atemzuege-zaehlen', name: 'Atemzüge zählen', typ: 'atem', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'zaehlen', params: { bis: 10 },
      schritte: ['Zähl jeden Ausatemzug still: eins bis zehn.', 'Dann fang wieder bei eins an.', 'Abgeschweift? Kein Ärger. Zurück zu eins.'],
      wann: 'Wenn deine Gedanken beim Lernen ständig abschweifen.',
      flavor: 'Abschweifen passiert allen. Zurückkommen ist der Skill.',
      einheit: 'j2-e07', seltenheit: 'basis',
    },
    {
      id: 'freundlicher-neustart', name: 'Freundlicher Neustart', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Okay, ich habe es aufgeschoben.', 'Das passiert vielen.', 'Ich fange jetzt mit einem kleinen Schritt an.'] },
      schritte: ['Hand auf Brust oder Unterarm – wenn du magst.', 'Sag innerlich die drei Neustart-Sätze.', 'Dann der erste Schritt: nur fünf Minuten.'],
      wann: 'Wenn du etwas aufgeschoben hast und dich dafür fertigmachst.',
      flavor: 'Fertigmachen hilft nicht beim Anfangen. Ein Neustart schon.',
      einheit: 'j2-e08', seltenheit: 'basis',
    },
    // Modul 3 – Wut und Impulse
    {
      id: 'offene-haende', name: 'Offene Hände', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anspannen-loslassen', params: { teile: ['Fäuste', 'Kiefer', 'Schultern'], halten: 5 },
      schritte: ['Fäuste ballen, Zähne zusammen, Schultern hoch.', 'Loslassen: Hände auf, Kiefer locker, Schultern runter.', 'Handflächen nach oben. Langsam ausatmen.'],
      wann: 'Beim ersten Wut-Warnzeichen. Geht auch unauffällig unter dem Tisch.',
      flavor: 'Offene Hände sagen deinem Alarm: Hier ist kein Kampf.',
      einheit: 'j2-e10', seltenheit: 'basis',
    },
    {
      id: 'rot-skill', name: 'Rot-Skill', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'halten', params: { sekunden: 10, text: 'Stopp! Finger drauf. Zweimal ein durch die Nase, lang aus durch den Mund.' },
      schritte: ['Rot heißt Stopp: nichts sagen, nichts tun.', 'Doppelter Seufzer: zweimal ein, lang aus.', 'Erst unter 70 weiter zu Gelb: nachdenken.'],
      wann: 'Wenn die Wut über 70 steigt und du gleich explodierst.',
      flavor: 'Die Bremse für die Hosentasche. Niemand sieht, dass du bremst.',
      einheit: 'j2-e11', seltenheit: 'selten',
    },
    {
      id: 'freundlich-zu-mir', name: 'Freundlich zu mir', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Das ist gerade schwer.', 'Anderen geht es auch manchmal so.', 'Ich darf freundlich zu mir sein.'] },
      schritte: ['Hand aufs Herz oder auf den Oberarm.', 'Einmal lang ausatmen.', 'Innerlich drei freundliche Sätze – wie zu einem guten Freund.'],
      wann: 'Nach einem Ausbruch oder Fehler, wenn der harte Satz im Kopf kommt.',
      flavor: 'Kein Freispruch – aber Kraft, um es wiedergutzumachen.',
      einheit: 'j2-e12', seltenheit: 'selten',
    },
    // Modul 4 – Freundschaft, Liebe und Zugehörigkeit
    {
      id: 'gute-wuensche', name: 'Gute Wünsche verschicken', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'satz', params: { saetze: ['Ich wünsche dir, dass es dir gut geht.', 'Ich wünsche dir gute Freunde.', 'Ich wünsche dir einen leichten Tag.'] },
      schritte: ['Denk an einen Menschen, der dir wichtig ist.', 'Schick ihm innerlich gute Wünsche.', 'Spür nach: Wie geht es dir jetzt?'],
      wann: 'Nach einem Streit mit Freunden oder wenn du jemanden vermisst.',
      flavor: 'Kein Empfang nötig. Kommt trotzdem an.',
      einheit: 'j2-e13', seltenheit: 'basis',
    },
    {
      id: 'erst-runter-dann-senden', name: 'Erst runter, dann senden', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'halten', params: { sekunden: 10, text: 'Daumen weg vom Senden. Finger hier halten und lang ausatmen.' },
      schritte: ['Handy weg, Display nach unten.', 'Lang ausatmen, bis die Zahl sinkt.', 'Antwort erst in die Notizen-App. Später entscheiden.'],
      wann: 'Wenn dich eine Nachricht ärgert und der Daumen schon zuckt.',
      flavor: 'Der wichtigste Moment liegt zwischen Lesen und Senden.',
      einheit: 'j2-e14', seltenheit: 'basis',
    },
    {
      id: 'mitgefuehl-pause', name: 'Mitgefühls-Pause', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker', params: { text: 'Hand auf Brust oder Unterarm. Zwei ruhige Atemzüge. Innerlich: Das tut weh. Das kennen viele. Ich bin okay.' },
      schritte: ['Hand auf Brust oder Unterarm – wenn du magst.', 'Sag innerlich drei freundliche Sätze.', 'Zwischen den Sätzen: zwei ruhige Atemzüge.'],
      wann: 'Wenn du ausgeschlossen wirst und gerade draußen stehst.',
      flavor: 'Passt in jede Busfahrt. Niemand merkt, dass du gerade stark bist.',
      einheit: 'j2-e15', seltenheit: 'basis',
    },
    {
      id: 'landen', name: 'Landen', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'sinne-tippen', params: { schritte: [{ anzahl: 5, sinn: 'sehen', text: 'Such 5 Dinge, die blau sind.' }] },
      schritte: ['Füße auf den Boden, Hände auf die Oberschenkel.', 'Dreimal lang ausatmen.', 'Such still fünf Dinge, die blau sind.'],
      wann: 'Nach einem aufregenden Thema, wenn dein Kopf noch Achterbahn fährt.',
      flavor: 'Kopf in den Wolken? Fünfmal Blau – und du bist gelandet.',
      einheit: 'j2-e16', seltenheit: 'basis',
    },
    {
      id: 'behalten-loslassen', name: 'Behalten und loslassen', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'gedanken-boot', params: { gedanken: ['Ärger', 'Enttäuschung', 'Ein Satz, der noch wehtut'] },
      schritte: ['Ein Stein zum Behalten: etwas Gutes.', 'Ein Stein zum Ablegen: Ärger oder ein Satz, der wehtut.', 'Leg ihn ins Wasser. Gelegt, nicht geworfen.'],
      wann: 'Wenn eine Freundschaft endet oder sich verändert.',
      flavor: 'Das Gute kommt in die Hosentasche. Der Rest darf sinken.',
      einheit: 'j2-e17', seltenheit: 'episch',
    },
    // Modul 5 – Familie und Zuhause
    {
      id: 'sich-halt-geben', name: 'Sich selbst Halt geben', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anker', params: { text: 'Hand auf Brust oder Oberarm – oder beide Hände um eine warme Tasse. Wärme spüren.' },
      schritte: ['Hand auf Brust, Oberarm oder um eine warme Tasse.', 'Wärme spüren. Dreimal langsam ausatmen.', 'Innerlich: Das war anstrengend. Du machst das gut.'],
      wann: 'Wenn du Trost brauchst und gerade niemand da ist.',
      flavor: 'Ersetzt keine Menschen. Aber hält dich, bis jemand da ist.',
      einheit: 'j2-e18', seltenheit: 'basis',
    },
    {
      id: 'abkuehlen', name: 'Abkühlen', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'kaelte', params: { text: 'Handgelenke unter kaltes Wasser oder Kühlakku in den Nacken. Länger aus- als einatmen.' },
      schritte: ['Stopp-Satz: Ich komme in 20 Minuten wieder.', 'Eine Minute Kälte an Handgelenke oder Nacken.', 'Länger aus- als einatmen. Dann zurückkommen.'],
      wann: 'Wenn ein Streit zu Hause über 70 steigt.',
      flavor: 'Abhauen oder abkühlen? Der Unterschied ist ein Satz.',
      einheit: 'j2-e19', seltenheit: 'selten',
    },
    {
      id: 'gespraechs-anker', name: 'Gesprächs-Anker', typ: 'koerper', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker', params: { text: 'Füße fest auf den Boden. Schultern sinken lassen. Dreimal länger aus- als einatmen.' },
      schritte: ['Füße fest auf den Boden, Schultern sinken lassen.', 'Dreimal länger aus- als einatmen.', 'Innerlich: Ich will eine Lösung für uns beide.'],
      wann: 'Kurz bevor du zu Hause etwas Wichtiges ansprichst.',
      flavor: 'Gleicher Stand wie beim Nein. Anderer Satz. Ruhigere Stimme.',
      einheit: 'j2-e20', seltenheit: 'selten',
    },
    // Modul 6 – Vielfalt und Respekt
    {
      id: 'zitronen-uebung', name: 'Zitronen-Übung', typ: 'sinne', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'sinne-tippen', params: { schritte: [{ anzahl: 3, sinn: 'sehen', text: 'Flecken, Dellen, Form' }, { anzahl: 2, sinn: 'fühlen' }, { anzahl: 1, sinn: 'riechen' }] },
      schritte: ['Schau deine Zitrone an, als wäre sie ganz neu.', 'Finde Flecken, Dellen, Geruch und Gefühl.', 'Von Weitem sind alle gleich. Aus der Nähe nicht.'],
      wann: 'Wenn du jemanden schnell in eine Schublade steckst – oder Ruhe brauchst.',
      flavor: 'Genau hinschauen öffnet jede Schublade.',
      einheit: 'j2-e21', seltenheit: 'basis',
    },
    {
      id: 'ruhesatz-herzsprache', name: 'Ruhesatz in der Herzsprache', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen', params: { ein: 4, aus: 6, runden: 3, text: 'Beim Ausatmen: dein Ruhesatz. Tout doux. Calma. Das wird schon.' },
      schritte: ['Wähl einen kurzen Satz, der dich beruhigt.', 'Nimm die Sprache, die sich am ruhigsten anfühlt.', '4 Sekunden ein, 6 aus – beim Ausatmen der Satz.'],
      wann: 'Wenn du Ruhe brauchst – in welcher Sprache auch immer.',
      flavor: 'Tout doux. Calma. Das wird schon. Ruhe versteht jede Sprache.',
      einheit: 'j2-e22', seltenheit: 'basis',
    },
    {
      id: 'rueckenwind-karten', name: 'Rückenwind-Karte', typ: 'menschen', zonen: ['gruen'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Ich glaube dir.', 'Du bist nicht allein.', 'Das war nicht deine Schuld.'] },
      schritte: ['Füße auf den Boden, drei ruhige Atemzüge.', 'Lies deinen Rückenwind-Satz.', 'Steck die Karte ein – für schlechte Tage.'],
      wann: 'Wenn dich jemand wegen eines Merkmals schlecht behandelt.',
      flavor: 'Klein genug fürs Portemonnaie. Stark genug für schlechte Tage.',
      einheit: 'j2-e23', seltenheit: 'episch',
    },
    // Modul 7 – Sicher im Netz
    {
      id: 'erster-satz', name: 'Der erste Satz', typ: 'menschen', zonen: ['gruen'], kraft: 3,
      interaktion: 'satz', params: { saetze: ['Mir ist etwas Peinliches passiert.', 'Ich brauche Hilfe.', 'Bitte hör erst zu.'] },
      schritte: ['Erst bremsen: 4 Sekunden ein, 6 Sekunden aus.', 'Wähl eine erwachsene Vertrauensperson.', 'Sag den ersten Satz: Ich brauche Hilfe. Bitte hör erst zu.'],
      wann: 'Wenn online etwas schiefläuft und du dich nicht traust, es zu sagen.',
      flavor: 'Der erste Satz ist der schwerste. Danach bist du nicht mehr allein.',
      einheit: 'j2-e24', seltenheit: 'selten',
    },
    {
      id: 'antwort-bremse', name: 'Antwort-Bremse', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'wegwischen', params: { dinge: ['Hater-Kommentar', 'Provokation', '„Trau dich doch!“', 'Push-Nachricht'] },
      schritte: ['Hände weg vom Handy. Drei Atemzüge, lang aus.', 'Frag dich: Will ich verletzen oder etwas bewirken?', 'Dann antworten – oder bewusst wegklicken.'],
      wann: 'Wenn ein Kommentar dich wütend macht und du sofort zurückschreiben willst.',
      flavor: 'Wegklicken ist nicht feige. Es ist Selbstschutz.',
      einheit: 'j2-e25', seltenheit: 'basis',
    },
    {
      id: 'tilt-bremse', name: 'Tilt-Bremse', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'halten', params: { sekunden: 10, text: 'Controller weg. Finger hier halten – aufstehen, strecken, 4 ein, 6 aus.' },
      schritte: ['Controller weg, aufstehen, strecken.', 'Dreimal 4 ein, 6 aus. Ein Schluck Wasser.', 'Pause oder Schluss – keine Revanche bei 80.'],
      wann: 'Nach ein paar Niederlagen, wenn du wütend wirst und schlechter spielst.',
      flavor: '„Noch eine Runde, dann gewinne ich.“ Sagt jeder im Tilt.',
      einheit: 'j2-e26', seltenheit: 'episch',
    },
    // Modul 8 – Riskant oder okay?
    {
      id: 'achtsam-trinken', name: 'Achtsam trinken', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'genuss', params: { text: 'Glas kaltes Wasser: anschauen, Kühle spüren, einen Schluck im Mund halten, langsam schlucken.' },
      schritte: ['Schau das Glas an. Spür die Kühle.', 'Einen Schluck im Mund halten.', 'Langsam schlucken und nachspüren.'],
      wann: 'Wenn dir alles zu viel wird – auch auf einer Party.',
      flavor: 'Kein Trick. Nur Wasser und volle Aufmerksamkeit.',
      einheit: 'j2-e27', seltenheit: 'basis',
    },
    {
      id: 'erst-atmen-dann-handeln', name: 'Erst atmen, dann handeln', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen', params: { ein: 4, aus: 8, runden: 3 },
      schritte: ['Füße fest auf den Boden.', 'Dreimal lang ausatmen – länger aus als ein.', 'Dann der erste Schritt: „Hallo, hörst du mich?“'],
      wann: 'Im Notfall oder unter Druck, wenn alles gleichzeitig passiert.',
      flavor: 'Zwei Sekunden Klarheit reichen für den ersten Schritt.',
      einheit: 'j2-e28', seltenheit: 'selten',
    },
    {
      id: 'welle-reiten', name: 'Die Welle reiten', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 3,
      interaktion: 'halten', params: { sekunden: 15, text: 'Der Drang steigt … wird groß … und fällt. Halte durch und schau nur zu.' },
      schritte: ['Bemerk den Drang, zum Beispiel aufs Handy zu schauen.', 'Beobachte: Er steigt, wird groß und fällt wieder.', 'Nicht folgen. Surf, bis die Welle kleiner wird.'],
      wann: 'Wenn ein starker Drang kommt und du sofort nachgeben willst.',
      flavor: 'Ein Drang ist kein Befehl. Jede Welle bricht irgendwann.',
      einheit: 'j2-e29', seltenheit: 'episch',
    },
    // Modul 9 – Gesund an Körper und Seele
    {
      id: 'kopf-parkplatz', name: 'Kopf-Parkplatz', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'gedanken-boot', params: { gedanken: ['Test am Montag', 'Was meinte sie damit?', 'Training morgen', 'Handy laden!'] },
      schritte: ['Schreib auf, was dir im Kopf herumfährt.', 'Zettel falten: geparkt, nicht vergessen.', 'Zehn Atemzüge: 4 Sekunden ein, 6 aus.'],
      wann: 'Abends im Bett, wenn dein Kopf nicht aufhört zu reden.',
      flavor: 'Morgen ist alles noch da. Heute Nacht darf es parken.',
      einheit: 'j2-e30', seltenheit: 'basis',
    },
    {
      id: 'dehnen-atemrhythmus', name: 'Dehnen im Atemrhythmus', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bewegen', params: { text: 'Einatmen: Arme hoch und strecken. Ausatmen: langsam sinken lassen. Nichts tut weh.' },
      schritte: ['Einatmen: Arme hoch, strecken.', 'Ausatmen: langsam sinken lassen.', 'Nur so weit, wie es angenehm ist.'],
      wann: 'Nach dem Sport oder abends, wenn dein Körper noch unter Strom steht.',
      flavor: 'Dein Atem gibt den Takt an. Dein Körper tanzt mit.',
      einheit: 'j2-e32', seltenheit: 'basis',
    },
    // Modul 10 – Abschluss
    {
      id: 'stille-galerie', name: 'Stille Galerie', typ: 'koerper', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'bewegen', params: { text: 'Geh langsam und schweigend. Spür bei jedem Schritt den Boden. Dann stehen bleiben und dreimal ruhig atmen.' },
      schritte: ['Geh langsam und schweigend.', 'Spür bei jedem Schritt den Boden.', 'Bleib bei einem Bild stehen. Atme dreimal ruhig.'],
      wann: 'Auf dem Schulweg oder in der Pause, wenn du runterkommen willst.',
      flavor: 'Nur schauen, nicht kommentieren. Dein Jahr hängt an der Wand.',
      einheit: 'j2-e34', seltenheit: 'selten',
    },
    {
      id: 'skill-der-bleibt', name: 'Der Skill, der bleibt', typ: 'koerper', zonen: ['gruen', 'gelb', 'rot'], kraft: 3,
      interaktion: 'anker', params: { text: 'Füße fest. Hand aufs Herz. Denk an deinen Skill des Jahres – und mach ihn jetzt.' },
      schritte: ['Welcher Skill hat dir dieses Jahr am meisten geholfen?', 'Mach ihn jetzt – eine Minute, nur für dich.', 'Den hast du. Und der bleibt.'],
      wann: 'Immer dann, wenn du deinen stärksten Skill brauchst.',
      flavor: 'Das Jahr endet. Dein Skill bleibt.',
      einheit: 'j2-e35', seltenheit: 'legendaer',
    },
    // Joker-Einheiten
    {
      id: 'achtsam-essen', name: 'Achtsam essen', typ: 'sinne', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'genuss', params: { text: 'Ein Stück Obst: anschauen, riechen, langsam kauen und schmecken. Zwei Minuten, ohne zu reden.' },
      schritte: ['Anschauen, als hättest du so etwas nie gesehen.', 'Daran riechen.', 'Langsam kauen und schmecken.'],
      wann: 'Nach einem hektischen Tag oder in der Pause.',
      flavor: 'Tausendmal gegessen. Aber wann hast du zuletzt wirklich geschmeckt?',
      einheit: 'j2-j01', seltenheit: 'basis',
    },
    {
      id: 'kaltes-wasser', name: 'Kaltes Wasser', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'kaelte', params: { text: 'Handgelenke 20 bis 30 Sekunden unter kaltes Wasser. Spür, was sich verändert.' },
      schritte: ['Zahl vorher schätzen.', 'Handgelenke 20 bis 30 Sekunden unter kaltes Wasser.', 'Zahl nachher schätzen. Was hat sich verändert?'],
      wann: 'Wenn du auf Rot bist und schnell runter musst.',
      flavor: 'Gibt es in jeder Küche. Wirkt schneller als jede Diskussion.',
      einheit: 'j2-j01', seltenheit: 'selten',
    },
    {
      id: 'rote-ampel-langer-atem', name: 'Rote Ampel, langer Atem', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen', params: { ein: 3, aus: 7, runden: 2 },
      schritte: ['Rote Ampel: langsam und lang ausatmen.', 'Grüne Ampel: normal weiteratmen.', 'Jede rote Ampel auf dem Schulweg ist ein Training.'],
      wann: 'Unterwegs in der Stadt – und immer, wenn du bremsen musst.',
      flavor: 'Die Stadt ist dein Trainingsplatz. Jede rote Ampel zählt.',
      einheit: 'j2-j02', seltenheit: 'basis',
    },
    {
      id: 'anspannen-loslassen', name: 'Anspannen und loslassen', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'anspannen-loslassen', params: { teile: ['Fäuste', 'Schultern', 'Beine'], halten: 5 },
      schritte: ['Fäuste, Schultern, Beine: 5 Sekunden fest anspannen.', 'Loslassen und 10 Sekunden nachspüren.', 'Einmal langsam ausatmen. Spür die Ruhe.'],
      wann: 'Wenn du aufgedreht, gereizt oder zappelig bist.',
      flavor: 'Erst Vollgas, dann Leerlauf. So spürt dein Körper den Unterschied.',
      einheit: 'j2-j04', seltenheit: 'basis',
    },
  ]);

  /* ───────────────────────── EINHEITEN MIT MISSIONEN ───────────────────────── */
  SK.addUnits([
    // ── Modul 0: Wieder ankommen ──
    {
      id: 'j2-e01', jahr: 2, nr: 1, modul: 'j2-m0', modulTitel: 'Wieder ankommen',
      titel: 'Neustart als Gruppe', joker: false,
      code: 'INTRO', skills: ['sinne-54321'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Neustart-Check',
        intro: 'Neues Jahr, neue Leute. Wisch: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Im Kurs musst du Persönliches erzählen.', fakt: false, erklaerung: '„Weiter“ ist immer erlaubt. Du entscheidest, was du sagst.' },
          { text: 'Hier wird niemand ausgelacht.', fakt: true, erklaerung: 'Diese Regel steht nicht zur Abstimmung. Sie gilt immer.' },
          { text: 'Deine Anspannung zeigst du mit einer Zahl von 0 bis 100.', fakt: true, erklaerung: 'Grün bis 30, Gelb bis 70, Rot bis 100.' },
          { text: 'Bei Rot hilft gutes Nachdenken am besten.', fakt: false, erklaerung: 'Bei Rot kommt der Kopf nicht an. Erst Körper, Atem, Sinne.' },
          { text: 'Neue müssen schon alle Skills können.', fakt: false, erklaerung: 'Wer aus Jahr 1 kommt, erklärt. Skills gehören hier allen.' },
          { text: 'Ob ein Skill wirkt, kannst du selbst testen.', fakt: true, erklaerung: 'Zahl vorher, Skill, Zahl nachher. So prüfst du es.' },
          { text: 'Was hier erzählt wird, bleibt im Raum.', fakt: true, erklaerung: 'Vertraulichkeit gilt. Nur wenn jemand in Gefahr ist, holt die Leitung Hilfe.' },
        ] },
        abschluss: 'Check bestanden. Alt und Neu starten gemeinsam ins Jahr.',
      },
    },
    {
      id: 'j2-e02', jahr: 2, nr: 2, modul: 'j2-m0', modulTitel: 'Wieder ankommen',
      titel: 'Die Skills-Olympiade', joker: false,
      code: 'POKAL', skills: ['runterfahren-nach-wettkampf'], stempel: 'Olympia-Team', heikel: false,
      mission: {
        typ: 'zonen-sortieren', titel: 'Olympia-Disziplin: Anspannung',
        intro: 'Wie hoch ist die Anspannung? Sortiere: grün, gelb oder rot.',
        daten: { items: [
          { text: 'Du chillst nach dem Training auf dem Sofa.', zone: 'gruen', warum: 'Ruhig und klar. Hier wirken auch Kopf-Skills gut.' },
          { text: 'Gleich startet das Finale. Dein Herz klopft.', zone: 'gelb', warum: 'Aufgeregt, aber du denkst noch klar. Atmen hilft.' },
          { text: 'Dein Team verliert. Jemand schreit dich an.', zone: 'rot', warum: 'Jetzt kein Reden. Erst Körper, Atem, Sinne.' },
          { text: 'Du sollst den Neuen einen Skill erklären.', zone: 'gelb', warum: 'Ein bisschen Lampenfieber. Normal – und machbar.' },
          { text: 'Nach dem Sieg hüpfst du jubelnd durch den Raum.', zone: 'gelb', warum: 'Auch Freude treibt die Zahl hoch. Danach runterfahren.' },
          { text: 'Jemand sagt: Wegen dir haben wir verloren. Du ballst die Fäuste.', zone: 'rot', warum: 'Fäuste und heißer Kopf: Rot. Erst runter, dann reden.' },
          { text: 'Siegerehrung vorbei. Alle sitzen und trinken Wasser.', zone: 'gruen', warum: 'Die Welle ist durch. Zeit für ein Fazit.' },
        ] },
        abschluss: 'Wettkampf treibt die Zahl hoch – auch wenn es Spaß macht. Welcher Skill holt dich runter?',
      },
    },

    // ── Modul 1: Selbstwert und Körper ──
    {
      id: 'j2-e03', jahr: 2, nr: 3, modul: 'j2-m1', modulTitel: 'Selbstwert und Körper',
      titel: 'Was macht mich wertvoll?', joker: false,
      code: 'BRAVO', skills: ['wertschaetzung-annehmen'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Noahs Achterbahn',
        intro: 'Begleite Noah durch seinen Tag. Du entscheidest, was er denkt.',
        daten: { start: 'morgen', knoten: {
          morgen: { text: '7:45 Uhr. Noah bekommt eine schlechte Note in Mathe zurück. Was denkt er?', wahl: [
            { text: 'Ich bin einfach dumm.', weiter: 'nachmittag', folge: 'Das Gefühl stürzt ab. Aber stimmt der Satz?', punkte: 0 },
            { text: 'Mist. Die Note ist schlecht – ich bin es nicht.', weiter: 'nachmittag', folge: 'Die Note wackelt. Noah bleibt Noah.', punkte: 2 },
            { text: 'Egal, Schule ist eh unwichtig.', weiter: 'nachmittag', folge: 'Klingt cool. Tief drin ärgert es ihn trotzdem.', punkte: 1 },
          ] },
          nachmittag: { text: '16 Uhr. Noahs neues Video hat 12 Likes. Die anderen haben 200.', wahl: [
            { text: 'Ich lösche das Video. Peinlich.', weiter: 'abend', folge: 'Likes zeigen, was im Feed läuft. Nicht, was Noah wert ist.', punkte: 0 },
            { text: 'Ich mag das Video. Likes sind oft Zufall.', weiter: 'abend', folge: 'Wackelige Quelle erkannt. Stark.', punkte: 2 },
            { text: 'Ich poste zehn neue Videos, bis es klappt.', weiter: 'abend', folge: 'Die Jagd nach Likes macht müde und selten froh.', punkte: 1 },
          ] },
          abend: { text: '19:30 Uhr. Beim Training sagt Luca: „Mit dir wird es nie langweilig.“', wahl: [
            { text: 'Noah sagt: Danke.', weiter: null, folge: 'Das kann ihm kein schlechter Tag wegnehmen.', punkte: 2 },
            { text: 'Noah sagt: Stimmt doch gar nicht.', weiter: null, folge: 'Schade. Das Kompliment prallt einfach ab.', punkte: 1 },
            { text: 'Noah lacht es weg und wechselt das Thema.', weiter: null, folge: 'Knapp vorbei. Einmal Danke sagen reicht.', punkte: 1 },
          ] },
        } },
        abschluss: 'Das Gefühl fährt Achterbahn. Dein Wert bleibt, wo er ist.',
      },
    },
    {
      id: 'j2-e04', jahr: 2, nr: 4, modul: 'j2-m1', modulTitel: 'Selbstwert und Körper',
      titel: 'Mein Körper und ich', joker: false,
      code: 'SPRINT', skills: ['bodyscan-dank'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Filter-Detektiv',
        intro: 'Samira fühlt sich nach dem Scrollen mies. Prüf ihren Gedanken wie ein Detektiv.',
        daten: {
          gedanke: 'Alle anderen sehen besser aus als ich.',
          situation: 'Samira scrollt eine Stunde durch Fotos von Influencern. Danach fühlt sie sich schlecht.',
          beweise: [
            { text: 'Auf den Bildern sehen alle perfekt aus.', spricht: 'dafuer' },
            { text: 'Sie sieht dort keine Pickel und keine müden Augen.', spricht: 'dafuer' },
            { text: 'Viele Bilder sind gefiltert oder bearbeitet.', spricht: 'dagegen' },
            { text: 'Oft ist es das beste Foto von hundert Versuchen.', spricht: 'dagegen' },
            { text: 'Marken und Apps verdienen daran, dass man sich vergleicht.', spricht: 'dagegen' },
            { text: 'Ihre Freundin sagt: Du vergleichst deinen Alltag mit Werbung.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Ich vergleiche meinen Alltag mit den besten, bearbeiteten Momenten anderer.',
        },
        abschluss: 'Du musst deinen Körper nicht toll finden. Aber fair vergleichen geht immer.',
      },
    },
    {
      id: 'j2-e05', jahr: 2, nr: 5, modul: 'j2-m1', modulTitel: 'Selbstwert und Körper',
      titel: 'Freundlich mit mir selbst', joker: false,
      code: 'COACH', skills: ['selbstmitgefuehl-pause'], stempel: 'Innerer Coach', heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Coach Klar gegen Coach Brüll',
        intro: 'Coach Brüll macht fertig. Coach Klar hilft. Bau die Sätze von Coach Klar.',
        daten: { aufgaben: [
          {
            situation: 'Nora hat ihr Sportzeug vergessen. Ihr Kritiker brüllt: „Typisch, du Chaot!“',
            bausteine: ['Passiert.', 'Morgen', 'packst du es', 'abends ein.', 'Du Chaot!', 'Echt peinlich.'],
            loesungen: [['Passiert.', 'Morgen', 'packst du es', 'abends ein.']],
            tipp: 'Coach Klar redet über den Fehler, nie schlecht über die Person.',
          },
          {
            situation: 'Dein Wurf auf den Korb geht zum dritten Mal daneben.',
            bausteine: ['Okay.', 'Arm locker,', 'Blick auf den Korb,', 'nochmal.', 'Du triffst nie!', 'Lass es einfach.'],
            loesungen: [['Okay.', 'Arm locker,', 'Blick auf den Korb,', 'nochmal.']],
            tipp: 'Klar heißt: ruhig, freundlich und konkret.',
          },
          {
            situation: 'Mila bleibt beim Referat hängen. Zwei in der letzten Reihe lachen.',
            bausteine: ['Das ist gerade schwer.', 'Das kennen viele.', 'Was brauche ich jetzt?', 'Ich bin so peinlich.', 'Nie wieder ein Referat.'],
            loesungen: [['Das ist gerade schwer.', 'Das kennen viele.', 'Was brauche ich jetzt?']],
            tipp: 'Das sind die drei Schritte der Selbstmitgefühls-Pause.',
          },
        ] },
        abschluss: 'Bei Coach Klar trainierst du gern weiter. Sei dein eigener Coach Klar.',
      },
    },

    // ── Modul 2: Stress und Schule ──
    {
      id: 'j2-e06', jahr: 2, nr: 6, modul: 'j2-m2', modulTitel: 'Stress und Schule',
      titel: 'Stress verstehen', joker: false,
      code: 'TEMPO', skills: ['seufzer-atmung'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Alarm im Körper',
        intro: 'Stress startet ein uraltes Programm: Kampf oder Flucht. Finde, was der Körper damit will.',
        daten: { paare: [
          ['Herz klopft schneller', 'Mehr Blut für die Muskeln'],
          ['Atem wird schnell', 'Mehr Sauerstoff zum Kämpfen oder Fliehen'],
          ['Hände schwitzen', 'Kühlung für den Körper'],
          ['Magen grummelt', 'Verdauung macht jetzt Pause'],
          ['Muskeln spannen sich an', 'Bereit zum Sprinten'],
          ['Kopf ist wie leer', 'Der Alarm übernimmt das Denken'],
        ] },
        abschluss: 'Dein Körper will dich schützen. Mit der Seufzer-Atmung drückst du auf die Bremse.',
      },
    },
    {
      id: 'j2-e07', jahr: 2, nr: 7, modul: 'j2-m2', modulTitel: 'Stress und Schule',
      titel: 'Lernen, das hängen bleibt', joker: false,
      code: 'TAKT', skills: ['atemzuege-zaehlen'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Lern-Labor',
        intro: 'Echte Zahlen aus der Lernforschung. Schätz mit dem Regler!',
        daten: { fragen: [
          { text: 'Ohne Wiederholen: Wie viel Prozent sind nach einem Tag schon vergessen?', min: 0, max: 100, richtig: 66, einheit: '%', erklaerung: 'In alten Versuchen etwa zwei Drittel. Verteiltes Wiederholen bremst das Vergessen.' },
          { text: 'Nach einer Woche: Wie viel Prozent weiß man noch, wenn man nur wiedergelesen hat?', min: 0, max: 100, richtig: 40, einheit: '%', erklaerung: 'In einem bekannten Experiment waren es etwa 40 Prozent.' },
          { text: 'Und wie viel Prozent mit Selbsttest statt Wiederlesen?', min: 0, max: 100, richtig: 60, einheit: '%', erklaerung: 'Etwa 60 Prozent. Selbst abfragen schlägt Wiederlesen.' },
        ] },
        abschluss: 'Wiederlesen fühlt sich sicher an. Selbsttest bringt mehr. Heft zu – und abfragen!',
      },
    },
    {
      id: 'j2-e08', jahr: 2, nr: 8, modul: 'j2-m2', modulTitel: 'Stress und Schule',
      titel: 'Aufschieben überlisten', joker: false,
      code: 'START', skills: ['freundlicher-neustart'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Der Aufschiebe-Kreislauf',
        intro: 'Diogo schiebt sein Referat auf. Bring den Kreislauf in die richtige Reihenfolge.',
        daten: { schritte: [
          'Die Aufgabe: Referat bis Freitag.',
          'Ein mieses Gefühl: Keine Ahnung, wie ich anfangen soll.',
          'Ausweichen: nur noch schnell zocken.',
          'Kurz besser – das Gefühl ist weg.',
          'Dann Druck: Nur noch zwei Tage!',
          'Die Aufgabe wirkt jetzt noch größer.',
        ] },
        abschluss: 'Aussteigen geht: ein erster Schritt für fünf Minuten. Und ein freundlicher Neustart.',
      },
    },
    {
      id: 'j2-e09', jahr: 2, nr: 9, modul: 'j2-m2', modulTitel: 'Stress und Schule',
      titel: 'Prüfungen ohne Panik', joker: false,
      code: 'FINALE', skills: ['unsichtbare-skills'], stempel: 'Prüfungs-Profi', heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Der Prüfungs-Gedanke',
        intro: 'Inês hat morgen einen Mathe-Devoir. Prüf ihren Gedanken mit drei Fragen.',
        daten: {
          gedanke: 'Wenn ich den Devoir verhaue, schaffe ich das Jahr nicht.',
          situation: 'Es ist der Abend vor dem Devoir. Inês kann nicht einschlafen.',
          beweise: [
            { text: 'Mathe ist ihr schwerstes Fach.', spricht: 'dafuer' },
            { text: 'Beim letzten Devoir hatte sie eine schlechte Note.', spricht: 'dafuer' },
            { text: 'Ein Devoir ist nur eine von vielen Noten im Jahr.', spricht: 'dagegen' },
            { text: 'Sie hat drei Lernrunden mit Selbsttest gemacht.', spricht: 'dagegen' },
            { text: 'Das Schlimmste, was realistisch passiert: eine schlechte Note. Dann übt sie nach.', spricht: 'dagegen' },
            { text: 'Ihre Freundin sagt: Du hast schon viel geschafft.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Der Devoir ist wichtig, aber nicht alles. Ich gebe mein Bestes.',
        },
        abschluss: 'Sorgen fressen Arbeitsspeicher. Geprüft werden sie kleiner. Und Herzklopfen ist Energie!',
      },
    },

    // ── Modul 3: Wut und Impulse ──
    {
      id: 'j2-e10', jahr: 2, nr: 10, modul: 'j2-m3', modulTitel: 'Wut und Impulse',
      titel: 'Der Wut-Eisberg', joker: false,
      code: 'BASS', skills: ['offene-haende'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Unter der Wasserlinie',
        intro: 'Wut ist oft nur die Spitze des Eisbergs. Finde, was darunter liegt.',
        daten: { paare: [
          ['Alle lachen über Elias. Er knallt das Heft hin.', 'Scham'],
          ['Nur Sofia bekommt Handyverbot. Sie schreit.', 'Ungerechtigkeit'],
          ['Tiagos bester Freund lädt ihn nicht ein. Er brüllt.', 'Kränkung'],
          ['Laras Vater geht nicht ans Telefon. Sie wird wütend.', 'Angst'],
          ['Mateo hat nicht gefrühstückt. Mittags rastet er aus.', 'Leerer Tank'],
        ] },
        abschluss: 'Was unter der Wasserlinie liegt, entscheidet, was wirklich hilft.',
      },
    },
    {
      id: 'j2-e11', jahr: 2, nr: 11, modul: 'j2-m3', modulTitel: 'Wut und Impulse',
      titel: 'Stopp – erst denken, dann handeln', joker: false,
      code: 'PFIFF', skills: ['rot-skill'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Aylins Stopp-Ampel',
        intro: 'In der Pause liest jemand laut aus Aylins Handy vor. Hilf ihr durch die Ampel.',
        daten: { start: 'rot', knoten: {
          rot: { text: 'Enzo hat Aylins Handy und liest ihren Chat vor. Alle lachen. Aylin ist bei 85.', wahl: [
            { text: 'Rot: Stopp. Zweimal ein, lang aus.', weiter: 'gelb', folge: 'Die Zahl sinkt auf 60. Jetzt kann Aylin denken.', punkte: 2 },
            { text: 'Sie schubst Enzo sofort weg.', weiter: 'gelb', folge: 'Das Handy fällt runter. Jetzt ist alles noch lauter.', punkte: 0 },
            { text: 'Sie schreit: Gib her, du Idiot!', weiter: 'gelb', folge: 'Jetzt schauen alle auf Aylin, nicht auf Enzo.', punkte: 0 },
          ] },
          gelb: { text: 'Gelb: Was kann Aylin tun? Und was passiert danach?', wahl: [
            { text: 'Sie holt die Aufsicht.', weiter: 'gruen', folge: 'Handy zurück, ohne Ärger für Aylin.', punkte: 2 },
            { text: 'Sie sagt ruhig und laut: Gib es zurück. Sofort.', weiter: 'gruen', folge: 'Klar und ohne Beleidigung. Oft reicht das schon.', punkte: 2 },
            { text: 'Sie plant Rache für morgen.', weiter: 'gruen', folge: 'Dann geht der Streit morgen weiter. Und übermorgen.', punkte: 0 },
          ] },
          gruen: { text: 'Grün: Enzo gibt das Handy zurück und grinst: „War doch nur Spaß.“', wahl: [
            { text: 'Aylin sagt: Für mich nicht. Lass mein Handy in Ruhe.', weiter: null, folge: 'Stark: Grenze gesetzt, ohne zu explodieren.', punkte: 2 },
            { text: 'Aylin merkt, die Zahl steigt. Sie geht zurück auf Rot und atmet.', weiter: null, folge: 'Genau richtig: Zahl steigt? Zurück auf Rot.', punkte: 2 },
            { text: 'Aylin kippt ihm Wasser über den Kopf.', weiter: null, folge: 'Jetzt ist Aylin die, die Ärger bekommt.', punkte: 0 },
          ] },
        } },
        abschluss: 'Rot: stopp. Gelb: denken. Grün: handeln. Steigt die Zahl, geh zurück auf Rot.',
      },
    },
    {
      id: 'j2-e12', jahr: 2, nr: 12, modul: 'j2-m3', modulTitel: 'Wut und Impulse',
      titel: 'Wiedergutmachen', joker: false,
      code: 'FAIR', skills: ['freundlich-zu-mir'], stempel: 'Stopp-Ampel-Profi', heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Echte Entschuldigung',
        intro: 'Eine echte Entschuldigung hat vier Teile und keine Ausrede. Bau sie zusammen.',
        daten: { aufgaben: [
          {
            situation: 'Diogo hat im Streit Léas Plakat zerrissen.',
            bausteine: ['Ich habe dein Plakat zerrissen.', 'Es tut mir leid.', 'Du hattest dir so viel Mühe gegeben.', 'Ich helfe dir, ein neues zu machen.', 'Aber du hast mich provoziert.', 'Sorry, wenn du dich aufregst.'],
            loesungen: [
              ['Ich habe dein Plakat zerrissen.', 'Es tut mir leid.', 'Du hattest dir so viel Mühe gegeben.', 'Ich helfe dir, ein neues zu machen.'],
              ['Es tut mir leid.', 'Ich habe dein Plakat zerrissen.', 'Du hattest dir so viel Mühe gegeben.', 'Ich helfe dir, ein neues zu machen.'],
            ],
            tipp: 'Was ich getan habe. Es tut mir leid. Was es für dich heißt. Wie ich es gutmache.',
          },
          {
            situation: 'Du hast Tiagos Controller im Frust auf den Boden geworfen.',
            bausteine: ['Ich habe deinen Controller runtergeworfen.', 'Das tut mir leid.', 'Jetzt kannst du nicht mehr spielen.', 'Ich zahle die Reparatur von meinem Taschengeld.', 'Das Ding war eh alt.', 'Du hast ja auch geschummelt.'],
            loesungen: [
              ['Ich habe deinen Controller runtergeworfen.', 'Das tut mir leid.', 'Jetzt kannst du nicht mehr spielen.', 'Ich zahle die Reparatur von meinem Taschengeld.'],
              ['Das tut mir leid.', 'Ich habe deinen Controller runtergeworfen.', 'Jetzt kannst du nicht mehr spielen.', 'Ich zahle die Reparatur von meinem Taschengeld.'],
            ],
            tipp: 'Kein „aber“. Ein „aber“ macht die Entschuldigung kaputt.',
          },
          {
            situation: 'Du hast Zoé im Gruppenchat vor allen beleidigt.',
            bausteine: ['Ich habe dich vor allen beleidigt.', 'Es tut mir leid.', 'Das war verletzend für dich.', 'Ich entschuldige mich auch im Gruppenchat.', 'War doch nur Spaß.', 'Alle haben doch gelacht.'],
            loesungen: [
              ['Ich habe dich vor allen beleidigt.', 'Es tut mir leid.', 'Das war verletzend für dich.', 'Ich entschuldige mich auch im Gruppenchat.'],
              ['Es tut mir leid.', 'Ich habe dich vor allen beleidigt.', 'Das war verletzend für dich.', 'Ich entschuldige mich auch im Gruppenchat.'],
            ],
            tipp: 'Die Wiedergutmachung passt zum Schaden: vor allen passiert, vor allen gutmachen.',
          },
        ] },
        abschluss: '„Ich habe etwas Schlechtes getan“ lässt sich wiedergutmachen. „Ich bin schlecht“ stimmt einfach nicht.',
      },
    },

    // ── Modul 4: Freundschaft, Liebe und Zugehörigkeit ──
    {
      id: 'j2-e13', jahr: 2, nr: 13, modul: 'j2-m4', modulTitel: 'Freundschaft, Liebe und Zugehörigkeit',
      titel: 'Was macht eine gute Freundschaft aus?', joker: false,
      code: 'TANDEM', skills: ['gute-wuensche'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren', titel: 'Freundschafts-Wetter',
        intro: 'Wie ist das Wetter in dieser Freundschaft? Grün ist sonnig, Gelb wechselhaft, Rot stürmisch.',
        daten: { items: [
          { text: 'Ihr lacht über dieselben Sachen und trefft euch gern.', zone: 'gruen', warum: 'Zeit und Spaß: ein Pfeiler jeder Freundschaft.' },
          { text: 'Ihr hattet Streit, habt euch aber wieder vertragen.', zone: 'gruen', warum: 'Streit überstehen gehört zu starken Freundschaften.' },
          { text: 'Sie ist da, als es dir schlecht geht.', zone: 'gruen', warum: 'Unterstützung: Genau dafür sind Freunde da.' },
          { text: 'Er meldet sich nur, wenn er die Hausaufgaben braucht.', zone: 'gelb', warum: 'Geben und Nehmen sind schief. Sprich es an.' },
          { text: 'Seit sie in der neuen Klasse ist, schreibt ihr seltener.', zone: 'gelb', warum: 'Freundschaften verändern sich. Ein kleiner Schritt kann helfen.' },
          { text: 'Sie erzählt dein Geheimnis weiter, obwohl sie es versprochen hat.', zone: 'rot', warum: 'Vertrauen ist gebrochen. Das muss angesprochen werden.' },
          { text: 'Er sagt: Wenn du mit denen chillst, sind wir keine Freunde mehr.', zone: 'rot', warum: 'Das ist Druck, keine Freundschaft.' },
          { text: 'Er macht sich vor anderen immer wieder über dich lustig.', zone: 'rot', warum: 'Stürmisch. Ein Freund macht dich nicht klein.' },
        ] },
        abschluss: 'Keine Freundschaft ist immer sonnig. Wichtig ist, ob ihr nach dem Sturm wieder zueinanderfindet.',
      },
    },
    {
      id: 'j2-e14', jahr: 2, nr: 14, modul: 'j2-m4', modulTitel: 'Freundschaft, Liebe und Zugehörigkeit',
      titel: 'Streit unter Freunden', joker: false,
      code: 'KLANG', skills: ['erst-runter-dann-senden'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Kommt der Ton an?',
        intro: 'Ironie im Chat – kommt die an? Schätz, was die Forschung herausgefunden hat.',
        daten: { fragen: [
          { text: 'Wie sicher sind Leute, dass ihre Ironie im Text richtig ankommt?', min: 0, max: 100, richtig: 78, einheit: '%', erklaerung: 'In einer Studie glaubten die Schreibenden: fast 80 Prozent.' },
          { text: 'Und wie oft wurde die Ironie wirklich erkannt?', min: 0, max: 100, richtig: 56, einheit: '%', erklaerung: 'Nur gut die Hälfte. Fast so gut wie Münze werfen.' },
          { text: 'Mit wie vielen „Ohren“ kann man eine Nachricht hören?', min: 1, max: 10, richtig: 4, einheit: 'Ohren', erklaerung: 'Sache, Beziehung, Selbstkundgabe, Appell. Das Beziehungs-Ohr heizt Streit oft an.' },
        ] },
        abschluss: 'Im Chat fehlt die Stimme. Nachfragen statt vermuten – und erst runter, dann senden.',
      },
    },
    {
      id: 'j2-e15', jahr: 2, nr: 15, modul: 'j2-m4', modulTitel: 'Freundschaft, Liebe und Zugehörigkeit',
      titel: 'Dazugehören und ausgeschlossen sein', joker: false,
      code: 'BAND', skills: ['mitgefuehl-pause'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Umbau: Druck wird Wunsch',
        intro: 'Eifersucht ist oft Angst, jemanden zu verlieren. Bau aus Druck einen ehrlichen Satz.',
        daten: { aufgaben: [
          {
            situation: 'Druck-Satz: „Wenn du mit Yara ins Kino gehst, sind wir keine Freunde mehr.“',
            bausteine: ['Ich habe Angst,', 'dass du mich vergisst.', 'Machen wir Samstag', 'was zu zweit?', 'Sonst bist du raus.', 'Du bist so unfair.'],
            loesungen: [['Ich habe Angst,', 'dass du mich vergisst.', 'Machen wir Samstag', 'was zu zweit?']],
            tipp: 'Ich-Botschaft: Gefühl plus Wunsch. Keine Drohung.',
          },
          {
            situation: 'Drei aus deiner Clique wollen, dass du Lina im Chat ignorierst. Sag klar Nein.',
            bausteine: ['Nein,', 'da mache ich nicht mit.', 'Lina hat mir nichts getan.', 'Okay, wenn ihr meint.', 'Vielleicht später.'],
            loesungen: [['Nein,', 'da mache ich nicht mit.', 'Lina hat mir nichts getan.']],
            tipp: 'Ein klares Nein braucht keine lange Erklärung.',
          },
          {
            situation: 'In der Kantine steht Samir, der Neue, mit seinem Tablett allein da.',
            bausteine: ['Hey,', 'hier ist noch Platz.', 'Setz dich zu uns!', 'Der Platz ist besetzt.', 'Wer ist das denn?'],
            loesungen: [['Hey,', 'hier ist noch Platz.', 'Setz dich zu uns!']],
            tipp: 'Ein Satz und eine Geste: die Tasche vom Stuhl nehmen.',
          },
        ] },
        abschluss: 'Einbeziehen dauert 30 Sekunden. Für die andere Person kann es den ganzen Tag retten.',
      },
    },
    {
      id: 'j2-e16', jahr: 2, nr: 16, modul: 'j2-m4', modulTitel: 'Freundschaft, Liebe und Zugehörigkeit',
      titel: 'Verliebt – und jetzt?', joker: false,
      code: 'DUETT', skills: ['landen'], stempel: null, heikel: true,
      mission: {
        typ: 'zonen-sortieren', titel: 'Ampel-Lauf: Respekt',
        intro: 'Grün heißt okay. Gelb heißt erst fragen. Rot heißt Stopp.',
        daten: { items: [
          { text: 'Du fragst: Kommst du Samstag mit zum Skatepark?', zone: 'gruen', warum: 'Fragen ist okay. Die Antwort gehört der anderen Person.' },
          { text: 'Nach ihrem Nein sagst du: Okay, schade. Und wechselst das Thema.', zone: 'gruen', warum: 'Ein Nein annehmen ist Respekt – und echt stark.' },
          { text: 'Du willst ein Foto von ihm in deine Story stellen.', zone: 'gelb', warum: 'Fotos von anderen nur mit Erlaubnis. Erst fragen.' },
          { text: 'Du willst zur Begrüßung umarmen.', zone: 'gelb', warum: 'Nicht alle mögen Umarmungen. Kurz fragen.' },
          { text: 'Du willst ihre Hand halten.', zone: 'gelb', warum: 'Einvernehmlich heißt: Beide wollen es. Also erst fragen.' },
          { text: 'Sie sagt: Nein, danke. Du fragst noch dreimal.', zone: 'rot', warum: 'Nein heißt Nein. Nachhaken ist Druck.' },
          { text: 'Er sagt: Weiß nicht. Du nimmst das als Ja.', zone: 'rot', warum: 'Zögern oder „weiß nicht“ ist kein Ja.' },
          { text: 'Du erzählst allen, wer in wen verliebt ist.', zone: 'rot', warum: 'Wen jemand liebt, ist persönlich. Keine Gerüchte.' },
        ] },
        abschluss: 'Einvernehmlich heißt: Alle wollen es wirklich. Fragen? Fragenbox, Vertrauensperson oder Kanner- a Jugendtelefon 116 111.',
      },
    },
    {
      id: 'j2-e17', jahr: 2, nr: 17, modul: 'j2-m4', modulTitel: 'Freundschaft, Liebe und Zugehörigkeit',
      titel: 'Wenn Freundschaften enden', joker: false,
      code: 'ECHO', skills: ['behalten-loslassen'], stempel: 'Freundschafts-Profi', heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Wenn Freundschaften enden',
        intro: 'Freundschaften verändern sich. Wisch: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Wenn eine Freundschaft endet, hat immer einer Schuld.', fakt: false, erklaerung: 'Oft verändern sich einfach beide. Neue Klasse, neue Hobbys.' },
          { text: 'Man kann gleichzeitig traurig und erleichtert sein.', fakt: true, erklaerung: 'Gemischte Gefühle sind normal. Manchmal alle an einem Tag.' },
          { text: 'Fair auseinandergehen heißt: keine Geheimnisse weitererzählen.', fakt: true, erklaerung: 'Was dir anvertraut wurde, bleibt geschützt. Auch danach.' },
          { text: 'Wer an die alte Freundschaft denkt, kommt nie drüber weg.', fakt: false, erklaerung: 'Das Pendel: Zurückschauen und Nach-vorn-Schauen gehören beide dazu.' },
          { text: 'Einfach ghosten ist die fairste Art, Schluss zu machen.', fakt: false, erklaerung: 'Ein ehrlicher, freundlicher Satz ist fairer als Schweigen.' },
          { text: 'Neue Kontakte fangen oft mit einer kleinen Frage an.', fakt: true, erklaerung: 'Grüßen, fragen, einladen: Die Kontakt-Leiter geht Stufe für Stufe.' },
          { text: 'Nach einem Ende braucht man sofort neue beste Freunde.', fakt: false, erklaerung: 'Lass dir Zeit. Neue Freundschaften wachsen langsam.' },
        ] },
        abschluss: 'Behalte das Gute. Den Rest darfst du ablegen – gelegt, nicht geworfen.',
      },
    },

    // ── Modul 5: Familie und Zuhause (heikel: nie nach eigener Familie fragen) ──
    {
      id: 'j2-e18', jahr: 2, nr: 18, modul: 'j2-m5', modulTitel: 'Familie und Zuhause',
      titel: 'Familien sind verschieden', joker: false,
      code: 'DACH', skills: ['sich-halt-geben'], stempel: null, heikel: true,
      mission: {
        typ: 'detektiv', titel: 'Die eine normale Familie?',
        intro: 'Lina glaubt, ihre Familie ist nicht normal. Prüf den Gedanken mit ihr.',
        daten: {
          gedanke: 'Meine Familie ist komisch. Bei allen anderen ist es normal.',
          situation: 'Lina lebt bei ihrer Oma, zusammen mit ihrem Bruder. In der Klasse reden viele von Mama und Papa.',
          beweise: [
            { text: 'In der Klasse erzählen viele von Mama und Papa.', spricht: 'dafuer' },
            { text: 'In Werbung und Filmen sieht Familie oft gleich aus.', spricht: 'dafuer' },
            { text: 'Leon lebt eine Woche bei Mama, eine Woche bei Papa.', spricht: 'dagegen' },
            { text: 'Sara wohnt im Foyer und ist am Wochenende bei ihrer Tante.', spricht: 'dagegen' },
            { text: 'Bei Mateo wohnen Opa, Eltern und vier Kinder zusammen.', spricht: 'dagegen' },
            { text: 'Linas Oma kocht jeden Tag und hört ihr zu.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Es gibt nicht die eine normale Familie. Wichtig ist, wer für mich sorgt.',
        },
        abschluss: 'Jedes Kind hat ein Recht auf Schutz und darauf, gehört zu werden. Ist es zu Hause schwer: Vertrauensperson oder 116 111.',
      },
    },
    {
      id: 'j2-e19', jahr: 2, nr: 19, modul: 'j2-m5', modulTitel: 'Familie und Zuhause',
      titel: 'Streit zu Hause', joker: false,
      code: 'POOL', skills: ['abkuehlen'], stempel: null, heikel: true,
      mission: {
        typ: 'zonen-sortieren', titel: 'Der richtige Moment',
        intro: 'Du willst zu Hause etwas Schwieriges ansprechen. Wie hoch ist die Anspannung im Raum?',
        daten: { items: [
          { text: 'Ihr sitzt entspannt beim Essen. Keiner hat Eile.', zone: 'gruen', warum: 'Ruhige Lage: gute Chance, dass dir jemand zuhört.' },
          { text: 'Ihr sitzt zusammen im Auto. Das Radio läuft leise.', zone: 'gruen', warum: 'Nebeneinander reden fällt oft leichter.' },
          { text: 'Die Erwachsene hat noch fünf Minuten, dann muss sie los.', zone: 'gelb', warum: 'Zu knapp für ein großes Thema. Frag nach einer Zeit.' },
          { text: 'Deine Schwester hat gerade Ärger bekommen. Die Luft ist dick.', zone: 'gelb', warum: 'Die Stimmung ist gereizt. Lieber später.' },
          { text: 'Dein Vater kommt gestresst heim und sucht seine Schlüssel.', zone: 'rot', warum: 'Er ist schon auf Rot. Später fragen.' },
          { text: 'Ihr streitet ums Handy. Beide sind laut.', zone: 'rot', warum: 'Über 70 hört niemand zu. Erst abkühlen.' },
          { text: 'Du selbst bist gerade auf 80.', zone: 'rot', warum: 'Erst du runter. Dann reden.' },
        ] },
        abschluss: 'Guter Moment plus Zuhause-Formel: Verständnis zeigen, Ich-Botschaft, Vorschlag.',
      },
    },
    {
      id: 'j2-e20', jahr: 2, nr: 20, modul: 'j2-m5', modulTitel: 'Familie und Zuhause',
      titel: 'Mehr Freiraum aushandeln', joker: false,
      code: 'PLATZ', skills: ['gespraechs-anker'], stempel: 'Verhandlungs-Profi', heikel: true,
      mission: {
        typ: 'paare', titel: 'Der Orangen-Trick',
        intro: 'Hinter jeder Forderung steckt ein Warum. Finde zu jeder Position das Interesse.',
        daten: { paare: [
          ['„Ich will bis 23 Uhr zur Party!“', 'Ich will dabei sein, wenn alle da sind.'],
          ['„Du bist um 21 Uhr zu Hause!“', 'Ich mache mir Sorgen, dass dir nachts etwas passiert.'],
          ['„Ich will allein mit dem Bus in die Stadt!“', 'Ich will zeigen, dass ich das schaffe.'],
          ['„Handy um 22 Uhr in die Küche!“', 'Ich will, dass du genug Schlaf bekommst.'],
          ['„Klopf an, bevor du reinkommst!“', 'Ich brauche einen Ort nur für mich.'],
          ['„Du räumst sofort dein Zimmer auf!“', 'Ich will, dass wir alle gut zusammen wohnen.'],
        ] },
        abschluss: 'Position ist, was jemand fordert. Interesse ist, warum. Wer nach dem Warum fragt, findet Lösungen für beide.',
      },
    },

    // ── Modul 6: Vielfalt und Respekt ──
    {
      id: 'j2-e21', jahr: 2, nr: 21, modul: 'j2-m6', modulTitel: 'Vielfalt und Respekt',
      titel: 'Schubladen im Kopf', joker: false,
      code: 'REMIX', skills: ['zitronen-uebung'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Schubladen-Check',
        intro: 'Das Gehirn nimmt gern Abkürzungen. Prüf diese Schublade wie ein Detektiv.',
        daten: {
          gedanke: 'Die aus der B-Klasse sind alle arrogant.',
          situation: 'Beim Sportfest ist Tom mit Leuten aus der B-Klasse in einem Team.',
          beweise: [
            { text: 'Zwei aus der B-Klasse haben gelacht, als Tom hingefallen ist.', spricht: 'dafuer' },
            { text: 'Die B-Klasse sitzt in der Pause immer unter sich.', spricht: 'dafuer' },
            { text: 'Gabriel aus der B-Klasse passt Tom den Ball und klatscht ihn ab.', spricht: 'dagegen' },
            { text: 'Tom kennt nur drei von 22 Leuten aus der Klasse.', spricht: 'dagegen' },
            { text: 'Aus zufälligen Gruppen wird schnell ein „wir gegen die“.', spricht: 'dagegen' },
            { text: 'Nach dem Spiel lachen alle zusammen.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Zwei waren blöd zu mir. Die anderen kenne ich noch gar nicht.',
        },
        abschluss: 'Von Weitem sind alle Zitronen gleich. Aus der Nähe ist jede anders.',
      },
    },
    {
      id: 'j2-e22', jahr: 2, nr: 22, modul: 'j2-m6', modulTitel: 'Vielfalt und Respekt',
      titel: 'Viele Sprachen, viele Wege', joker: false,
      code: 'CHOR', skills: ['ruhesatz-herzsprache'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Luxemburg-Schätzlinie',
        intro: 'Wie vielfältig ist Luxemburg? Schätz mit dem Regler.',
        daten: { fragen: [
          { text: 'Wie viel Prozent der Menschen in Luxemburg haben keinen luxemburgischen Pass?', min: 0, max: 100, richtig: 47, einheit: '%', erklaerung: 'Fast die Hälfte. Kaum ein Land in Europa ist so gemischt.' },
          { text: 'Wie viele Nationalitäten leben in Luxemburg?', min: 0, max: 250, richtig: 170, einheit: 'Nationalitäten', erklaerung: 'Über 170 – auf so kleinem Raum!' },
          { text: 'Wie viele Amtssprachen hat Luxemburg?', min: 1, max: 6, richtig: 3, einheit: 'Sprachen', erklaerung: 'Luxemburgisch, Französisch und Deutsch. Im Alltag hört man noch viel mehr.' },
          { text: 'Wie viele Menschen pendeln jeden Tag aus den Nachbarländern zur Arbeit?', min: 0, max: 400000, richtig: 220000, einheit: 'Menschen', erklaerung: 'Über 200.000 – fast die Hälfte aller, die hier arbeiten.' },
        ] },
        abschluss: 'Viele Wege, viele Sprachen. Dein Ruhesatz darf in deiner Herzsprache sein.',
      },
    },
    {
      id: 'j2-e23', jahr: 2, nr: 23, modul: 'j2-m6', modulTitel: 'Vielfalt und Respekt',
      titel: 'Stopp Diskriminierung', joker: false,
      code: 'FANS', skills: ['rueckenwind-karten'], stempel: 'Respekt-Stern', heikel: false,
      mission: {
        typ: 'szene', titel: 'Zeuge im Bus',
        intro: 'Du siehst, wie jemand abgewertet wird. Was tust du – und ist es sicher für dich?',
        daten: { start: 'bus', knoten: {
          bus: { text: 'Im Bus äfft Jonas den Akzent von Amira nach. Ein paar lachen.', wahl: [
            { text: 'Ich lache mit. Ist ja nur Spaß.', weiter: 'lauter', folge: 'Lachen gibt Jonas Publikum. Die Treppe der Abwertung geht eine Stufe hoch.', punkte: 0 },
            { text: 'Ich sage ruhig: Lass das. Das ist nicht witzig.', weiter: 'lauter', folge: 'Widerspruch schon bei Sprüchen hält die Treppe früh auf.', punkte: 2 },
            { text: 'Ich setze mich zu Amira und frage, wie es ihr geht.', weiter: 'lauter', folge: 'Amira ist nicht mehr allein. Das schützt enorm.', punkte: 2 },
          ] },
          lauter: { text: 'Jonas wird lauter: „Was mischst du dich ein?“ Deine Zahl steigt.', wahl: [
            { text: 'Ich atme lang aus und bleibe ruhig bei Amira.', weiter: 'pause', folge: 'Ruhig bleiben ist stark. Du musst nicht gewinnen.', punkte: 2 },
            { text: 'Ich beleidige Jonas zurück.', weiter: 'pause', folge: 'Jetzt geht es um euren Streit, nicht mehr um Amira.', punkte: 0 },
            { text: 'Ich gehe nach vorn und sage dem Busfahrer Bescheid.', weiter: 'pause', folge: 'Hilfe holen ist sicher und klug.', punkte: 2 },
          ] },
          pause: { text: 'Am nächsten Tag sitzt Amira in der Pause allein.', wahl: [
            { text: 'Ich sage ihr: Das war nicht okay. Du bist nicht allein.', weiter: null, folge: 'Rückenwind! Genau so ein Satz schützt am meisten.', punkte: 2 },
            { text: 'Ich erzähle es der Vertrauensperson in der Schule.', weiter: null, folge: 'Gut. Erwachsene können mehr tun als du allein.', punkte: 2 },
            { text: 'Ich tue so, als wäre nichts gewesen.', weiter: null, folge: 'Verständlich. Aber ein Satz von dir hätte viel bewirkt.', punkte: 1 },
          ] },
        } },
        abschluss: 'Du musst kein Held sein. Stärken, widersprechen oder Hilfe holen – alles zählt.',
      },
    },

    // ── Modul 7: Sicher im Netz ──
    {
      id: 'j2-e24', jahr: 2, nr: 24, modul: 'j2-m7', modulTitel: 'Sicher im Netz',
      titel: 'Meine Daten, meine Bilder', joker: false,
      code: 'HELM', skills: ['erster-satz'], stempel: null, heikel: true,
      mission: {
        typ: 'reihenfolge', titel: 'Wenn jemand mit Bildern droht',
        intro: 'Elias wird online mit einem Bild erpresst. Bring die Hilfe-Schritte in die richtige Reihenfolge.',
        daten: { schritte: [
          'Nicht zahlen und nichts mehr schicken.',
          'Beweise sichern: Screenshots von Chat und Profil.',
          'Sofort einer erwachsenen Vertrauensperson Bescheid sagen.',
          'Zusammen Hilfe holen: BEE SECURE Helpline 8002 1234 oder Polizei.',
          'Das Profil melden und blockieren.',
        ] },
        abschluss: 'Schuld hat, wer erpresst – nicht du. Der erste Satz reicht: Ich brauche Hilfe.',
      },
    },
    {
      id: 'j2-e25', jahr: 2, nr: 25, modul: 'j2-m7', modulTitel: 'Sicher im Netz',
      titel: 'Hass im Netz', joker: false,
      code: 'KONTER', skills: ['antwort-bremse'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Gegenrede-Pingpong',
        intro: 'Widersprechen, ohne selbst abzuwerten. Bau starke Gegenrede.',
        daten: { aufgaben: [
          {
            situation: 'Unter einem Tanzvideo steht: „Cringe. Lösch dich einfach.“',
            bausteine: ['Ich finde das Video mutig.', 'Kritik okay,', 'aber nicht so.', 'Du bist selbst cringe.', 'Lösch doch dich.'],
            loesungen: [['Ich finde das Video mutig.', 'Kritik okay,', 'aber nicht so.'], ['Kritik okay,', 'aber nicht so.', 'Ich finde das Video mutig.']],
            tipp: 'Greif die Sache an, nie den Menschen.',
          },
          {
            situation: 'Jemand schreibt: „Leute wie die gehören nicht hierher.“',
            bausteine: ['Das ist Hass,', 'keine Meinung.', 'Ich melde das.', 'Halt die Klappe, Loser.', 'Stimmt eigentlich.'],
            loesungen: [['Das ist Hass,', 'keine Meinung.', 'Ich melde das.']],
            tipp: 'Bei Hassrede: sichern, melden, blockieren.',
          },
          {
            situation: 'Schreib den Tanzenden privat einen Satz, der stärkt.',
            bausteine: ['Hab die Kommentare gesehen.', 'Du tanzt richtig gut.', 'Lass dich nicht runterziehen!', 'Hättest halt nicht posten sollen.'],
            loesungen: [['Hab die Kommentare gesehen.', 'Du tanzt richtig gut.', 'Lass dich nicht runterziehen!']],
            tipp: 'Wer Betroffene stärkt, nimmt dem Angriff das Publikum.',
          },
        ] },
        abschluss: 'Bei Drohungen oder Nacktbildern: Erwachsene holen, BEE SECURE Helpline 8002 1234 oder Polizei.',
      },
    },
    {
      id: 'j2-e26', jahr: 2, nr: 26, modul: 'j2-m7', modulTitel: 'Sicher im Netz',
      titel: 'Gaming – Spaß und Grenzen', joker: false,
      code: 'ARENA', skills: ['tilt-bremse'], stempel: 'Netz-Sicher', heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Lootbox-Rechner',
        intro: 'Im Shop gibt es ein Gold-Los unter 30 Losen. Schätz, was das bedeutet.',
        daten: { fragen: [
          { text: 'Wie groß ist die Chance auf Gold bei einer Ziehung?', min: 0, max: 100, richtig: 3, einheit: '%', erklaerung: 'Etwa 3 Prozent. 97 von 100 Ziehungen sind kein Gold.' },
          { text: 'Wie oft muss man im Schnitt ziehen, bis Gold kommt?', min: 0, max: 100, richtig: 30, einheit: 'Ziehungen', erklaerung: 'Im Schnitt 30-mal. Manche brauchen viel länger.' },
          { text: 'Eine Ziehung kostet 2 Euro. Was kostet Gold im Schnitt?', min: 0, max: 200, richtig: 60, einheit: 'Euro', erklaerung: '60 Euro – für ein Bild im Spiel.' },
          { text: 'Wie viele Stunden Schlaf brauchen Jugendliche pro Nacht?', min: 4, max: 12, richtig: 9, einheit: 'Stunden', erklaerung: 'Etwa 8 bis 10 Stunden. Gaming-Zeit darf nicht vom Schlaf kommen.' },
        ] },
        abschluss: 'Zufall hält dich am Ziehen. Deine Regeln für Zeit und Geld halten dagegen.',
      },
    },

    // ── Modul 8: Riskant oder okay? (heikel: sachlich, niemand erzählt von eigenem Konsum) ──
    {
      id: 'j2-e27', jahr: 2, nr: 27, modul: 'j2-m8', modulTitel: 'Riskant oder okay?',
      titel: 'Alkohol, Vapes, Cannabis – Fakten statt Mythen', joker: false,
      code: 'MATCH', skills: ['achtsam-trinken'], stempel: null, heikel: true,
      mission: {
        typ: 'mythos-fakt', titel: 'Fakt-Check: Gaspedal und Bremse',
        intro: 'Das Gehirn baut sich bis Mitte 20 um. Wisch: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Mit 15 ist das Gehirn fertig entwickelt.', fakt: false, erklaerung: 'Die Bremse hinter der Stirn wird erst mit etwa 25 fertig.' },
          { text: 'In der Jugend gewöhnt sich das Gehirn schneller an Nikotin.', fakt: true, erklaerung: 'Deshalb machen Vapes in diesem Alter besonders schnell abhängig.' },
          { text: 'Vapes sind nur Wasserdampf mit Geschmack.', fakt: false, erklaerung: 'Die meisten enthalten Nikotin. Das macht schnell abhängig.' },
          { text: 'Kaffee oder eine kalte Dusche machen schnell nüchtern.', fakt: false, erklaerung: 'Nur Zeit baut Alkohol ab. Kaffee macht höchstens wacher.' },
          { text: 'Cannabis ist eine Pflanze, also harmlos.', fakt: false, erklaerung: 'Pflanzlich heißt nicht harmlos. Bei Jugendlichen kann es Gedächtnis und Konzentration stören.' },
          { text: 'Wer viel verträgt, dem schadet es weniger.', fakt: false, erklaerung: 'Viel vertragen heißt: Der Körper hat sich schon gewöhnt. Ein Warnzeichen.' },
          { text: 'Die meisten in deinem Alter trinken regelmäßig Alkohol.', fakt: false, erklaerung: 'Das wird meist viel zu hoch geschätzt. Die Mehrheit tut es nicht.' },
        ] },
        abschluss: 'Fakten statt Mythen. Fragen? Fragenbox, Vertrauensperson oder Kanner- a Jugendtelefon 116 111.',
      },
    },
    {
      id: 'j2-e28', jahr: 2, nr: 28, modul: 'j2-m8', modulTitel: 'Riskant oder okay?',
      titel: 'Party, Druck und gute Entscheidungen', joker: false,
      code: 'GROOVE', skills: ['erst-atmen-dann-handeln'], stempel: null, heikel: true,
      mission: {
        typ: 'szene', titel: 'Samstagabend',
        intro: 'Party bei Tiago. Du entscheidest – und darfst zurückspulen.',
        daten: { start: 'vape', knoten: {
          vape: { text: 'Jemand hält dir eine Vape hin: „Komm, einmal. Alle machen mit.“', wahl: [
            { text: 'Nein danke, hab keinen Bock drauf.', weiter: 'spaet', folge: 'Kurz, klar, freundlich. Die meisten fragen nicht zweimal.', punkte: 2 },
            { text: 'Ich hol mir erst mal einen Saft.', weiter: 'spaet', folge: 'Clever: dabeibleiben, ohne mitzumachen.', punkte: 2 },
            { text: 'Na gut, einmal.', weiter: 'spaet', folge: 'Der Druck hat entschieden, nicht du. Ein Nein-Satz hilft nächstes Mal.', punkte: 0 },
          ] },
          spaet: { text: '23 Uhr. Die Stimmung kippt. Du willst weg.', wahl: [
            { text: 'Ich schicke meiner Mutter unser Codewort. Sie holt mich ab.', weiter: 'bank', folge: 'Plan B klappt – ohne Erklärung vor allen.', punkte: 2 },
            { text: 'Ich frage Lara, ob wir zusammen gehen.', weiter: 'bank', folge: 'Zusammen hin, zusammen weg. Niemand bleibt allein.', punkte: 2 },
            { text: 'Ich gehe allein durch den dunklen Park.', weiter: 'bank', folge: 'Allein und nachts ist riskant. Plan B ist sicherer.', punkte: 0 },
          ] },
          bank: { text: 'Draußen liegt Emma auf einer Bank. Sie reagiert nicht, als du sie ansprichst.', wahl: [
            { text: 'Laut ansprechen, 112 rufen, stabile Seitenlage, dableiben.', weiter: null, folge: 'Genau die Notfall-Kette. Geübt ist geübt.', punkte: 2 },
            { text: 'Ich lasse sie ausschlafen. Wird schon.', weiter: null, folge: 'Gefährlich. Wer nicht reagiert, braucht sofort Hilfe: 112.', punkte: 0 },
            { text: 'Ich gebe ihr Kaffee und schütte Wasser über sie.', weiter: null, folge: 'Hilft nicht. Besser: 112, Seitenlage, bei ihr bleiben.', punkte: 0 },
          ] },
        } },
        abschluss: 'Erst atmen, dann handeln. Im Notfall: 112 – und niemanden allein lassen.',
      },
    },
    {
      id: 'j2-e29', jahr: 2, nr: 29, modul: 'j2-m8', modulTitel: 'Riskant oder okay?',
      titel: 'Was Konsum verspricht – und was wirklich hilft', joker: false,
      code: 'SURF', skills: ['welle-reiten'], stempel: 'Welle geritten', heikel: true,
      mission: {
        typ: 'paare', titel: 'Gleiches Bedürfnis, anderer Weg',
        intro: 'Konsum ist wie ein Skill mit Nebenwirkungen. Finde für jedes Bedürfnis einen Weg ohne.',
        daten: { paare: [
          ['Stress wegmachen', 'Seufzer-Atmung oder kaltes Wasser'],
          ['Dazugehören', 'Mit den Leuten etwas unternehmen'],
          ['Mutiger werden', 'Fester Stand und ein Nein-Satz'],
          ['Langeweile vertreiben', 'Etwas Neues ausprobieren'],
          ['Abschalten nach einem langen Tag', 'Musik, Duschen, mit dem Hund raus'],
          ['Einen Kick erleben', 'Klettern, Skaten, Achterbahn'],
        ] },
        abschluss: 'Ein Drang ist kein Befehl. Reite die Welle – und hol dir Hilfe, wenn es zu viel wird: 116 111.',
      },
    },

    // ── Modul 9: Gesund an Körper und Seele ──
    {
      id: 'j2-e30', jahr: 2, nr: 30, modul: 'j2-m9', modulTitel: 'Gesund an Körper und Seele',
      titel: 'Schlaf – der unterschätzte Skill', joker: false,
      code: 'PIANO', skills: ['kopf-parkplatz'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Lerche oder Eule?',
        intro: 'Schlaf-Quiz! Wisch: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Jugendliche brauchen 8 bis 10 Stunden Schlaf.', fakt: true, erklaerung: 'Nachts sortiert das Gehirn und speichert, was du gelernt hast.' },
          { text: 'In der Pubertät wird man abends später müde.', fakt: true, erklaerung: 'Die innere Uhr verschiebt sich nach hinten. Biologie, keine Faulheit.' },
          { text: 'Am Wochenende kann man den Schlaf komplett nachholen.', fakt: false, erklaerung: 'Ausschlafen hilft ein bisschen. Aber Montag fühlt sich dann an wie Jetlag.' },
          { text: 'Das Handy im Bett hilft beim Runterkommen.', fakt: false, erklaerung: 'Licht und spannende Inhalte machen wacher. Handy lieber weglegen.' },
          { text: 'Wer abends spät müde wird, ist einfach faul.', fakt: false, erklaerung: 'Die innere Uhr tickt in der Pubertät anders.' },
          { text: 'Gedanken aufschreiben kann beim Einschlafen helfen.', fakt: true, erklaerung: 'Der Kopf-Parkplatz: geparkt, nicht vergessen.' },
          { text: 'Jeden Abend die gleiche Routine hilft dem Körper.', fakt: true, erklaerung: 'Gleiche Reihenfolge heißt für den Körper: Jetzt wird runtergefahren.' },
        ] },
        abschluss: 'Schlaf ist der unterschätzte Skill. Starte dein Experiment mit einer kleinen Änderung.',
      },
    },
    {
      id: 'j2-e31', jahr: 2, nr: 31, modul: 'j2-m9', modulTitel: 'Gesund an Körper und Seele',
      titel: 'Essen, Trinken, Energie', joker: false,
      code: 'PAUSE', skills: ['achtsam-trinken', 'energie-check'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Die Koffein-Falle',
        intro: 'Energydrinks versprechen Power. Bring die Koffein-Falle in die richtige Reihenfolge.',
        daten: { schritte: [
          'Abends spät eingeschlafen.',
          'Morgens total müde.',
          'In der Pause: ein Energydrink.',
          'Kurz hellwach und zappelig.',
          'Nachmittags kommt das große Tief.',
          'Noch eine Dose – und nachts wieder wach.',
        ] },
        abschluss: 'Aussteigen geht: Energie-Check, Wasser, Bewegung und genug Schlaf.',
      },
    },
    {
      id: 'j2-e32', jahr: 2, nr: 32, modul: 'j2-m9', modulTitel: 'Gesund an Körper und Seele',
      titel: 'Bewegung für den Kopf', joker: false,
      code: 'SKATE', skills: ['dehnen-atemrhythmus'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Die Schlapp-Falle',
        intro: 'Sonntag, Regen, null Energie. Probier das Gegenteil-Tun.',
        daten: { start: 'sofa', knoten: {
          sofa: { text: 'Du liegst seit drei Stunden auf dem Sofa. Alles fühlt sich schwer an.', wahl: [
            { text: 'Noch eine Folge. Dann vielleicht.', weiter: 'draussen', folge: 'Liegen bleiben fühlt sich richtig an – macht aber oft schlapper.', punkte: 0 },
            { text: 'Aufstehen, Fenster auf, einmal strecken.', weiter: 'draussen', folge: 'Gegenteil-Tun! Klein anfangen zählt.', punkte: 2 },
            { text: 'Ich schreibe Luca: Kurz raus?', weiter: 'draussen', folge: 'Mit einem Buddy fällt der Start leichter.', punkte: 2 },
          ] },
          draussen: { text: 'Draußen nieselt es. Dein Kopf sagt: Lohnt sich eh nicht.', wahl: [
            { text: 'Zehn Minuten zügig um den Block.', weiter: 'zurueck', folge: 'Schon zehn Minuten können die Stimmung heben.', punkte: 2 },
            { text: 'Musik an und im Zimmer tanzen.', weiter: 'zurueck', folge: 'Bewegung braucht keinen Sport. Hauptsache, du bewegst dich.', punkte: 2 },
            { text: 'Zurück aufs Sofa.', weiter: 'zurueck', folge: 'Okay. Morgen ist ein neuer Versuch – plan ihn ganz klein.', punkte: 1 },
          ] },
          zurueck: { text: 'Später. Dein Körper ist warm, dein Kopf etwas klarer.', wahl: [
            { text: 'Dehnen im Atemrhythmus zum Runterfahren.', weiter: null, folge: 'Perfekter Abschluss. Der Körper fährt ruhig runter.', punkte: 2 },
            { text: 'Einen Wenn-dann-Plan für nächsten Sonntag machen.', weiter: null, folge: 'Wenn es regnet, dann tanze ich zehn Minuten. Stark!', punkte: 2 },
            { text: 'Bis spät in die Nacht zocken.', weiter: null, folge: 'Kann Spaß machen. Achte nur auf deinen Schlaf.', punkte: 1 },
          ] },
        } },
        abschluss: 'Wer schlapp ist, will liegen bleiben. Das Gegenteil zu tun, ist ein Skill.',
      },
    },
    {
      id: 'j2-e33', jahr: 2, nr: 33, modul: 'j2-m9', modulTitel: 'Gesund an Körper und Seele',
      titel: 'Wenn es jemandem richtig schlecht geht', joker: false,
      code: 'HAFEN', skills: ['sinne-54321'], stempel: 'Starke Schulter', heikel: true,
      mission: {
        typ: 'zonen-sortieren', titel: 'Warnzeichen-Ampel',
        intro: 'Schlechter Tag oder mehr? Grün: normal. Gelb: ansprechen. Rot: sofort Hilfe holen.',
        daten: { items: [
          { text: 'Zoé ist nach einer schlechten Note einen Abend lang mies drauf.', zone: 'gruen', warum: 'Ein schlechter Tag gehört dazu. Nett nachfragen tut trotzdem gut.' },
          { text: 'Noah ist genervt, weil sein Handy kaputt ist.', zone: 'gruen', warum: 'Ärger über etwas Konkretes. Das geht vorbei.' },
          { text: 'Elias zieht sich seit Wochen zurück und kommt nicht mehr zum Training.', zone: 'gelb', warum: 'Länger anders als sonst: ansprechen und zuhören.' },
          { text: 'Mia sagt seit Tagen: Ist eh alles egal.', zone: 'gelb', warum: 'Hoffnungslosigkeit ernst nehmen. Direkt fragen, wie es ihr geht.' },
          { text: 'Sofia schreibt: „Bald müsst ihr euch keine Sorgen mehr um mich machen.“', zone: 'rot', warum: 'Eine Andeutung. Sofort eine erwachsene Person holen.' },
          { text: 'Jang verschenkt seine Lieblingssachen: Brauch ich nicht mehr.', zone: 'rot', warum: 'Ein Warnzeichen. Nicht allein damit bleiben – Hilfe holen.' },
          { text: 'Du merkst, dass sich jemand selbst verletzt.', zone: 'rot', warum: 'Ernst nehmen und eine erwachsene Person dazuholen.' },
        ] },
        abschluss: 'Hilfe holen ist kein Verrat. Vertrauensperson in der Schule, Kanner- a Jugendtelefon 116 111, im Notfall 112.',
      },
    },

    // ── Modul 10: Abschluss ──
    {
      id: 'j2-e34', jahr: 2, nr: 34, modul: 'j2-m10', modulTitel: 'Abschluss',
      titel: 'Mein Jahr in Bildern', joker: false,
      code: 'ALBUM', skills: ['stille-galerie'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Dein Jahr in Karten',
        intro: 'Ein Jahr, viele Skills. Welcher Skill gehört zu welchem Modul?',
        daten: { paare: [
          ['Selbstwert und Körper', 'Selbstmitgefühls-Pause'],
          ['Stress und Schule', 'Seufzer-Atmung'],
          ['Wut und Impulse', 'Stopp-Ampel'],
          ['Familie und Zuhause', 'Abkühlen'],
          ['Sicher im Netz', 'Tilt-Bremse'],
          ['Riskant oder okay?', 'Die Welle reiten'],
        ] },
        abschluss: 'Schau in deinen Skills-Pass: Das alles hast du dieses Jahr gesammelt.',
      },
    },
    {
      id: 'j2-e35', jahr: 2, nr: 35, modul: 'j2-m10', modulTitel: 'Abschluss',
      titel: 'Das Stärken-Fest', joker: false,
      code: 'ZUGABE', skills: ['skill-der-bleibt'], stempel: 'Kompass komplett', heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Stärken-Post',
        intro: 'Eine Stärke wirkt mit Beweis. Bau Stärken-Karten mit einer echten Beobachtung.',
        daten: { aufgaben: [
          {
            situation: 'Für Luca, der beim Kochen alle Zwiebeln geschnitten hat.',
            bausteine: ['Du bist hilfsbereit.', 'Ich habe gesehen,', 'wie du alle Zwiebeln geschnitten hast.', 'Du bist halt nett.', 'Keine Ahnung.'],
            loesungen: [['Du bist hilfsbereit.', 'Ich habe gesehen,', 'wie du alle Zwiebeln geschnitten hast.']],
            tipp: 'Stärke plus der Moment, in dem du sie erlebt hast.',
          },
          {
            situation: 'Für Inês, die beim Forumtheater als Erste „Stopp!“ gerufen hat.',
            bausteine: ['Du bist mutig.', 'Du hast Stopp gerufen,', 'als alle anderen still waren.', 'Du bist laut.', 'War okay.'],
            loesungen: [['Du bist mutig.', 'Du hast Stopp gerufen,', 'als alle anderen still waren.']],
            tipp: 'Konkret schlägt allgemein.',
          },
          {
            situation: 'Du bekommst selbst eine Stärken-Karte. Was sagst du?',
            bausteine: ['Danke.', 'Das nehme ich mit.', 'Stimmt doch gar nicht.', 'Du übertreibst.'],
            loesungen: [['Danke.', 'Das nehme ich mit.']],
            tipp: 'Wertschätzung annehmen: Danke sagen, nicht abwinken.',
          },
        ] },
        abschluss: 'Das Jahr endet. Deine Stärken und dein Skill bleiben. Zugabe!',
      },
    },

    // ── Joker-Einheiten ──
    {
      id: 'j2-j01', jahr: 2, nr: 1, modul: 'joker', modulTitel: 'Joker',
      titel: 'Kochen im Team', joker: true,
      code: 'MARKT', skills: ['achtsam-essen', 'kaltes-wasser'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Frust-Ampel in der Küche',
        intro: 'Die Soße brennt an, alle rufen durcheinander. Bring die Frust-Ampel in die richtige Reihenfolge.',
        daten: { schritte: [
          'Rot: Messer ablegen, Topf von der Platte.',
          'Handgelenke unter kaltes Wasser, lang ausatmen.',
          'Gelb: Wie schlimm ist es wirklich?',
          'Grün: retten, Hilfe holen oder annehmen.',
          'Weiterkochen – und später zusammen essen.',
        ] },
        abschluss: 'In jeder Küche gibt es kaltes Wasser. Und in jedem Team jemanden, der hilft.',
      },
    },
    {
      id: 'j2-j02', jahr: 2, nr: 2, modul: 'joker', modulTitel: 'Joker',
      titel: 'Stadt-Rallye mit Auftrag', joker: true,
      code: 'TRAM', skills: ['rote-ampel-langer-atem'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Auftrag in der Stadt',
        intro: 'Rallye-Auftrag: Findet heraus, wo der Bus zur Schule abfährt. Ihr entscheidet.',
        daten: { start: 'fragen', knoten: {
          fragen: { text: 'Ihr sollt eine fremde Person nach dem Weg fragen. Wie startest du?', wahl: [
            { text: 'Hallo, entschuldigen Sie. Haben Sie kurz Zeit?', weiter: 'nein', folge: 'Blickkontakt, grüßen, fragen: So klappt Ansprechen.', punkte: 2 },
            { text: 'Hey, wo ist der Bus?', weiter: 'nein', folge: 'Geht auch. Aber höflich klappt es öfter.', punkte: 1 },
            { text: 'Ich schiebe meinen Kumpel vor. Der soll fragen.', weiter: 'nein', folge: 'Verständlich. Aber so übst du es nicht selbst.', punkte: 1 },
          ] },
          nein: { text: 'Die Frau sagt: „Nein, keine Zeit.“ Und geht weiter.', wahl: [
            { text: 'Kein Problem. Ich frage die nächste Person.', weiter: 'weg', folge: 'Ein Nein aushalten ist ein echter Skill.', punkte: 2 },
            { text: 'Ich rufe ihr etwas Fieses hinterher.', weiter: 'weg', folge: 'Kurz Luft raus – aber jetzt schauen alle komisch.', punkte: 0 },
            { text: 'Ich will sofort zurück zur Basis.', weiter: 'weg', folge: 'Verständlich. Atme aus und versuch es noch einmal.', punkte: 1 },
          ] },
          weg: { text: 'Euer Team streitet: links oder rechts? Die Zeit läuft.', wahl: [
            { text: 'Stopp-Ampel: kurz runter, beide Ideen anhören, dann entscheiden.', weiter: null, folge: 'Genau so einigt sich ein Team.', punkte: 2 },
            { text: 'Wir rufen die Leitung an und fragen.', weiter: null, folge: 'Hilfe holen ist klug, wenn es klemmt.', punkte: 2 },
            { text: 'Ich laufe einfach allein los.', weiter: null, folge: 'Absprache gebrochen. Das Team bleibt zusammen.', punkte: 0 },
          ] },
        } },
        abschluss: 'Ansprechen, Nein aushalten, sich einigen: Das hast du mitten in der Stadt geübt.',
      },
    },
    {
      id: 'j2-j03', jahr: 2, nr: 3, modul: 'joker', modulTitel: 'Joker',
      titel: 'Filmeinheit „Wunder“', joker: true,
      code: 'KINO', skills: ['freundlich-zu-mir'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Auggies Gedanke',
        intro: 'Auggie kommt zum ersten Mal an eine Schule. Prüf seinen Gedanken.',
        daten: {
          gedanke: 'Alle starren mich an. Niemand wird je mein Freund sein.',
          situation: 'Auggie ist neu in der fünften Klasse. Viele schauen weg oder tuscheln.',
          beweise: [
            { text: 'Viele Kinder starren ihn im Flur an.', spricht: 'dafuer' },
            { text: 'Ein Mitschüler macht gemeine Sprüche über sein Gesicht.', spricht: 'dafuer' },
            { text: 'Summer setzt sich in der Mittagspause zu ihm.', spricht: 'dagegen' },
            { text: 'Jack wird sein Freund und lacht mit ihm.', spricht: 'dagegen' },
            { text: 'Seine Familie steht immer hinter ihm.', spricht: 'dagegen' },
            { text: 'Im Ferienlager verteidigen ihn andere, als er bedroht wird.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Manche sind gemein. Aber es gibt Leute, die mich mögen, wie ich bin.',
        },
        abschluss: 'Sei freundlich – jeder kämpft einen Kampf, den du nicht siehst. Auch mit dir selbst.',
      },
    },
    {
      id: 'j2-j04', jahr: 2, nr: 4, modul: 'joker', modulTitel: 'Joker',
      titel: 'Kooperationsspiele bei Unruhe', joker: true,
      code: 'TEAM', skills: ['anspannen-loslassen'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'So wird ein Team schneller',
        intro: 'Rekordrunde! Wie wird eine Gruppe besser? Bring die Schritte in die richtige Reihenfolge.',
        daten: { schritte: [
          'Die Aufgabe genau verstehen.',
          'Zwei Minuten gemeinsam planen.',
          'Ausprobieren – alle machen mit.',
          'Kurz auswerten: Was hat geholfen?',
          'Eine Sache ändern und nochmal versuchen.',
        ] },
        abschluss: 'Heute gewinnt die Gruppe oder niemand. Und leise Ideen zählen auch.',
      },
    },
  ]);

  /* ───────────────────────── KAMPF-SITUATIONEN (Module Jahr 2) ───────────────────────── */
  SK.addSituations([
    // Modul 0 – Wieder ankommen
    {
      id: 'j2-neue-klasse', modul: 'j2-m0', titel: 'Erster Tag nach den Ferien',
      text: 'Neue Klasse, neuer Raum. Du kennst fast niemanden.',
      start: 55,
      wellen: [
        { text: 'Alle sitzen schon in Grüppchen zusammen.', plus: 8 },
        { text: 'Die Lehrerin sagt: Stellt euch kurz vor.', plus: 12 },
        { text: 'Du bist als Nächstes dran.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich frage die Person neben mir, wie sie heißt.', gut: true, folge: 'Ein Satz – und du bist nicht mehr allein.' },
        { text: 'Ich sage meinen Namen und ein Hobby. Fertig.', gut: true, folge: 'Kurz reicht völlig. Geschafft!' },
        { text: 'Ich schaue die ganze Zeit aufs Handy.', gut: false, folge: 'Sicher, aber du bleibst allein.' },
        { text: 'Ich tue so, als wäre mir alles egal.', gut: false, folge: 'Wirkt cool, fühlt sich aber einsam an.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-knapp-verloren', modul: 'j2-m0', titel: 'Knapp verloren',
      text: 'Teamwettkampf im Sport. Dein Team verliert mit einem Punkt. Du hast zuletzt verfehlt.',
      start: 60,
      wellen: [
        { text: 'Jemand aus deinem Team stöhnt: „Ernsthaft?“', plus: 10 },
        { text: 'Das andere Team jubelt direkt vor dir.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich atme durch und sage: Nächstes Mal holen wir sie.', gut: true, folge: 'Das Team merkt: Du bist fair, auch wenn du verlierst.' },
        { text: 'Ich gratuliere dem anderen Team.', gut: true, folge: 'Fair Play. Die Zahl sinkt bei allen.' },
        { text: 'Ich werfe den Ball weg.', gut: false, folge: 'Kurz Luft raus – dann gibt es Stress mit dem Team.' },
        { text: 'Ich gebe dem Schiri die Schuld.', gut: false, folge: 'Jetzt gibt es Diskussion statt Revanche.' },
      ],
      heikel: false,
    },

    // Modul 1 – Selbstwert und Körper
    {
      id: 'j2-foto-kommentar', modul: 'j2-m1', titel: 'Kommentar unterm Foto',
      text: 'Unter deinem neuen Foto steht: „Was ist denn mit deinen Haaren los?“',
      start: 55,
      wellen: [
        { text: 'Drei Leute liken den Kommentar.', plus: 10 },
        { text: 'Im Gruppenchat schickt jemand Lach-Smileys.', plus: 10 },
        { text: 'Du scrollst und siehst nur perfekte Bilder.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich lege das Handy weg und schreibe später einer Freundin.', gut: true, folge: 'Abstand und ein Mensch, der dich mag. Das trägt.' },
        { text: 'Ich sage mir: Mein Wert hängt nicht an Likes.', gut: true, folge: 'Das Gefühl wackelt. Dein Wert bleibt.' },
        { text: 'Ich schreibe etwas Fieses zurück.', gut: false, folge: 'Kurz Rache – dann geht der Streit erst richtig los.' },
        { text: 'Ich lösche das Foto und scrolle weiter.', gut: false, folge: 'Jedes perfekte Bild treibt die Zahl weiter hoch.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-referat-haenger', modul: 'j2-m1', titel: 'Hänger beim Referat',
      text: 'Du hältst ein Referat in Französisch. Nach zwei Sätzen ist dein Kopf leer.',
      start: 65,
      wellen: [
        { text: 'Dein Gesicht wird heiß.', plus: 8 },
        { text: 'Zwei in der letzten Reihe lachen.', plus: 10 },
        { text: 'Dein Kritiker sagt: Wie peinlich bist du denn?', plus: 6 },
      ],
      handeln: [
        { text: 'Ich atme aus, schaue auf meine Karte und mache weiter.', gut: true, folge: 'Weitermachen nach einem Hänger – das ist stark.' },
        { text: 'Ich sage: Moment, ich suche kurz. Dann geht es weiter.', gut: true, folge: 'Ehrlich und ruhig. Die meisten merken es kaum.' },
        { text: 'Ich renne aus der Klasse.', gut: false, folge: 'Erst Erleichterung – beim nächsten Referat umso mehr Angst.' },
      ],
      heikel: false,
    },

    // Modul 2 – Stress und Schule
    {
      id: 'j2-devoir-gleich', modul: 'j2-m2', titel: 'Devoir in 10 Minuten',
      text: 'Gleich beginnt der Mathe-Devoir. Du hast die Hälfte nicht verstanden.',
      start: 62,
      wellen: [
        { text: 'Jemand flüstert: „Easy, oder?“', plus: 8 },
        { text: 'Die Lehrerin teilt die Blätter aus.', plus: 12 },
        { text: 'Die erste Aufgabe verstehst du nicht.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich lese zuerst die Aufgabe, die ich kann.', gut: true, folge: 'Ein Punkt nach dem anderen. Der Kopf wird freier.' },
        { text: 'Ich drücke die Füße in den Boden und mache weiter.', gut: true, folge: 'Unsichtbarer Skill – niemand hat es gemerkt.' },
        { text: 'Ich gebe leer ab.', gut: false, folge: 'Kurz erleichtert – später ärgerlich.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-referat-morgen', modul: 'j2-m2', titel: 'Referat morgen, noch nichts gemacht',
      text: 'Sonntagabend. Morgen ist Gruppenreferat. Dein Teil ist noch leer.',
      start: 60,
      wellen: [
        { text: 'Die Gruppe fragt im Chat: Hast du deinen Teil?', plus: 10 },
        { text: 'Es ist schon 21 Uhr.', plus: 8 },
        { text: 'Dein Kopf sagt: Du bist so faul.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich mache den ersten kleinen Schritt: Folie 1, nur der Titel.', gut: true, folge: 'Angefangen ist halb gewonnen. Der Rest wird leichter.' },
        { text: 'Ich schreibe der Gruppe ehrlich, wie weit ich bin.', gut: true, folge: 'Ehrlich hilft. Zusammen findet ihr eine Lösung.' },
        { text: 'Ich zocke noch eine Runde, dann fange ich an.', gut: false, folge: 'Kurz besser – plötzlich ist es 23 Uhr.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-zu-viele-baelle', modul: 'j2-m2', titel: 'Alles gleichzeitig',
      text: 'Morgen Test, heute Training, dazu die Praktikumsbewerbung. Zu viele Bälle in der Luft.',
      start: 55,
      wellen: [
        { text: 'Der Trainer schreibt: Morgen Extra-Training.', plus: 8 },
        { text: 'Du hast dein Heft in der Schule vergessen.', plus: 10 },
        { text: 'Zu Hause sollst du noch den Müll rausbringen.', plus: 6 },
      ],
      handeln: [
        { text: 'Ich schreibe eine Liste und fange mit dem Wichtigsten an.', gut: true, folge: 'Ein Ball nach dem anderen. So fängst du mehr.' },
        { text: 'Ich sage das Extra-Training ab, nur diesmal.', gut: true, folge: 'Ein Ball weniger – die Waage kippt zurück.' },
        { text: 'Ich lege mich hin und mache gar nichts.', gut: false, folge: 'Kurz Ruhe – morgen ist alles doppelt so viel.' },
      ],
      heikel: false,
    },

    // Modul 3 – Wut und Impulse
    {
      id: 'j2-handy-vorgelesen', modul: 'j2-m3', titel: 'Handy weggeschnappt',
      text: 'In der Pause schnappt sich Tom dein Handy und liest laut vor.',
      start: 65,
      wellen: [
        { text: 'Die anderen lachen.', plus: 10 },
        { text: 'Er hält das Handy hoch: „Hol es dir doch!“', plus: 10 },
        { text: 'Deine Ohren werden heiß. Die Fäuste gehen zu.', plus: 5 },
      ],
      handeln: [
        { text: 'Ich sage laut und klar: Gib es zurück. Sofort.', gut: true, folge: 'Klar ohne Beleidigung. Tom merkt: Das ist ernst.' },
        { text: 'Ich gehe direkt zur Aufsicht.', gut: true, folge: 'Handy zurück – und du hast keinen Ärger.' },
        { text: 'Ich schubse ihn.', gut: false, folge: 'Handy zurück, aber jetzt hast du einen Eintrag.' },
        { text: 'Ich schreie ihn an.', gut: false, folge: 'Jetzt schauen alle auf dich, nicht auf ihn.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-foul', modul: 'j2-m3', titel: 'Foul beim Pausenfußball',
      text: 'Luca foult dich hart. Keiner pfeift.',
      start: 60,
      wellen: [
        { text: 'Er grinst: „Heul doch.“', plus: 12 },
        { text: 'Dein Team ruft: Lass dir das nicht gefallen!', plus: 8 },
      ],
      handeln: [
        { text: 'Ich gehe kurz raus, trinke Wasser und komme zurück.', gut: true, folge: 'Runterkommen und wieder rein. Du spielst besser weiter.' },
        { text: 'Ich sage: Das war Foul. Freistoß für uns.', gut: true, folge: 'Klar gesagt. Das Spiel geht fair weiter.' },
        { text: 'Ich trete zurück.', gut: false, folge: 'Rote Karte – das Spiel ist für dich vorbei.' },
      ],
      heikel: false,
    },

    // Modul 4 – Freundschaft, Liebe und Zugehörigkeit
    {
      id: 'j2-nur-ok', modul: 'j2-m4', titel: 'Nur „Ok.“',
      text: 'Du schreibst deiner besten Freundin eine lange Nachricht. Die Antwort: „Ok.“',
      start: 50,
      wellen: [
        { text: 'Sie ist online, schreibt aber nichts mehr.', plus: 10 },
        { text: 'In ihrer Story ist sie mit anderen unterwegs.', plus: 12 },
        { text: 'Dein Daumen tippt schon eine fiese Antwort.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich frage nach: Alles okay bei dir? Klang kurz.', gut: true, folge: 'Nachfragen statt vermuten. Oft war es nur Stress.' },
        { text: 'Ich warte, bis ich unter 50 bin. Dann schreibe ich.', gut: true, folge: 'Erst runter, dann senden. Kein Satz, den du bereust.' },
        { text: 'Ich schreibe: Dann halt nicht. Tschüss.', gut: false, folge: 'Aus einem Missverständnis ist ein Streit geworden.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-ohne-mich', modul: 'j2-m4', titel: 'Alle da – außer dir',
      text: 'Auf einem Foto sind deine Freunde zusammen im Park. Dich hat niemand gefragt.',
      start: 60,
      wellen: [
        { text: 'Es gibt einen neuen Gruppenchat. Du bist nicht drin.', plus: 12 },
        { text: 'Jemand fragt dich: Kommst du auch Samstag?', plus: 8 },
      ],
      handeln: [
        { text: 'Ich frage eine Person aus der Gruppe direkt und ruhig.', gut: true, folge: 'Vielleicht war es ein Versehen. Jetzt weißt du mehr.' },
        { text: 'Ich mache die Mitgefühls-Pause und rede später mit jemandem.', gut: true, folge: 'Erst dich halten, dann klären. Stark.' },
        { text: 'Ich poste etwas Gemeines über die Gruppe.', gut: false, folge: 'Kurz Rache – aber der Weg zurück wird schwerer.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-neue-freundin', modul: 'j2-m4', titel: 'Beste Freundin, neue Freundin',
      text: 'Deine beste Freundin Chiara hängt nur noch mit der Neuen ab.',
      start: 50,
      wellen: [
        { text: 'Die beiden haben jetzt einen Insider-Witz.', plus: 8 },
        { text: 'Im Bus sitzen sie zusammen. Dein Platz ist weg.', plus: 10 },
        { text: 'Du denkst: Sie braucht mich nicht mehr.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich sage: Ich hab Angst, dich zu verlieren. Machen wir Samstag was zu zweit?', gut: true, folge: 'Ehrlich und ohne Druck. Chiara versteht dich jetzt.' },
        { text: 'Ich gehe einfach mit und lerne die Neue kennen.', gut: true, folge: 'Vielleicht habt ihr jetzt zu dritt Spaß.' },
        { text: 'Ich sage: Entweder sie oder ich.', gut: false, folge: 'Druck statt Wunsch – das treibt euch eher auseinander.' },
      ],
      heikel: false,
    },

    // Modul 5 – Familie und Zuhause (heikel)
    {
      id: 'j2-handy-22-uhr', modul: 'j2-m5', titel: 'Handy um 22 Uhr',
      text: 'Es ist 22 Uhr. Das Handy soll in die Küche. Du bist mitten im Chat.',
      start: 60,
      wellen: [
        { text: 'Deine Mutter steht in der Tür: „Jetzt!“', plus: 10 },
        { text: 'Im Chat geht es gerade um dich.', plus: 8 },
        { text: 'Dein kleiner Bruder grinst.', plus: 6 },
      ],
      handeln: [
        { text: 'Ich sage: Okay. Können wir morgen über die Regel reden?', gut: true, folge: 'Heute Ruhe – und morgen eine echte Chance.' },
        { text: 'Ich schreibe kurz „bis morgen“ und gebe es ab.', gut: true, folge: 'Du hast das Letzte Wort im Chat – ohne Streit zu Hause.' },
        { text: 'Ich knalle die Tür zu.', gut: false, folge: 'Handy weg – und morgen gibt es noch mehr Streit.' },
      ],
      heikel: true,
    },
    {
      id: 'j2-ausgehen-samstag', modul: 'j2-m5', titel: 'Wie lange darf ich bleiben?',
      text: 'Samstag ist eine Geburtstagsparty. Du sollst um 21 Uhr zu Hause sein.',
      start: 55,
      wellen: [
        { text: 'Dein Vater sagt: „Keine Diskussion.“', plus: 10 },
        { text: 'Die anderen schreiben: Alle dürfen bis 23 Uhr!', plus: 8 },
        { text: 'Du merkst: Gleich bist du über 70.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich sage: Ich komme in 20 Minuten wieder. Und kühle ab.', gut: true, folge: 'Abkühlen statt abhauen. Das Gespräch bleibt offen.' },
        { text: 'Später: Du machst dir Sorgen, oder? Wie wäre 22 Uhr, und ich schreibe dir?', gut: true, folge: 'Verständnis, Ich-Botschaft, Vorschlag. Gute Chance!' },
        { text: 'Ich schreie: Du verstehst gar nichts!', gut: false, folge: 'Über 70 hört keiner mehr zu. Das Gespräch ist erst mal vorbei.' },
      ],
      heikel: true,
    },

    // Modul 6 – Vielfalt und Respekt
    {
      id: 'j2-spruch-im-bus', modul: 'j2-m6', titel: 'Spruch im Bus',
      text: 'Im Bus macht sich jemand über die Sprache eines Mädchens lustig.',
      start: 55,
      wellen: [
        { text: 'Ein paar andere lachen mit.', plus: 10 },
        { text: 'Das Mädchen schaut auf den Boden.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich setze mich zu ihr und frage: Alles okay?', gut: true, folge: 'Sie ist nicht mehr allein. Das zählt viel.' },
        { text: 'Ich sage ruhig: Lass das. Das ist nicht witzig.', gut: true, folge: 'Widerspruch früh stoppt die Treppe der Abwertung.' },
        { text: 'Ich lache mit, damit ich nicht dran bin.', gut: false, folge: 'Sicher für den Moment – aber es fühlt sich falsch an.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-komisches-kompliment', modul: 'j2-m6', titel: 'Komisches Kompliment',
      text: 'Im Praktikum sagt ein Kollege: „Du sprichst aber gut Deutsch – für jemanden wie dich.“',
      start: 60,
      wellen: [
        { text: 'Die anderen schauen dich an.', plus: 8 },
        { text: 'Er lacht: „War doch ein Kompliment!“', plus: 10 },
      ],
      handeln: [
        { text: 'Ich atme aus und sage: Der Satz hat mich gekränkt.', gut: true, folge: 'Ruhig und klar. Er muss jetzt nachdenken.' },
        { text: 'Ich rede später mit meiner Tutorin darüber.', gut: true, folge: 'Hilfe holen ist klug. Du musst das nicht allein tragen.' },
        { text: 'Ich beleidige ihn zurück.', gut: false, folge: 'Jetzt reden alle über deine Reaktion, nicht über seinen Satz.' },
      ],
      heikel: false,
    },

    // Modul 7 – Sicher im Netz
    {
      id: 'j2-tilt', modul: 'j2-m7', titel: 'Tilt beim Gaming',
      text: 'Fünf Runden verloren. Dein Mate flamet dich im Chat.',
      start: 65,
      wellen: [
        { text: 'Er schreibt: „Uninstall, du Noob.“', plus: 10 },
        { text: 'Noch eine Niederlage – ganz knapp.', plus: 12 },
        { text: 'Es ist schon 23 Uhr.', plus: 5 },
      ],
      handeln: [
        { text: 'Controller weg, aufstehen, Wasser trinken. Schluss für heute.', gut: true, folge: 'Tilt-Bremse gezogen. Morgen spielst du wieder gut.' },
        { text: 'Ich schalte den Chat stumm und mache zehn Minuten Pause.', gut: true, folge: 'Ohne Flame im Ohr sinkt die Zahl schnell.' },
        { text: 'Revanche! Noch eine Runde.', gut: false, folge: 'Du spielst schlechter – und die Zahl steigt weiter.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-hass-unterm-video', modul: 'j2-m7', titel: 'Hass unterm Tanzvideo',
      text: 'Unter deinem Tanzvideo steht: „Cringe. Lösch dich.“',
      start: 60,
      wellen: [
        { text: 'Der Kommentar hat schon 20 Likes.', plus: 10 },
        { text: 'Jemand schreibt: „Die hat eh keine Freunde.“', plus: 12 },
      ],
      handeln: [
        { text: 'Screenshot, melden, blockieren. Dann einer Vertrauensperson zeigen.', gut: true, folge: 'Gesichert und gemeldet. Du bist nicht allein damit.' },
        { text: 'Antwort-Bremse: Hände weg, atmen, später entscheiden.', gut: true, folge: 'Kein Satz, den du bereust. Wegklicken ist Selbstschutz.' },
        { text: 'Ich schreibe etwas noch Härteres zurück.', gut: false, folge: 'Der Streit wird größer, und mehr Leute schauen zu.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-fremde-anfrage', modul: 'j2-m7', titel: 'Nette Anfrage, komisches Gefühl',
      text: 'Ein fremdes Profil schreibt dir seit Tagen nett. Jetzt will es ein Foto von dir.',
      start: 50,
      wellen: [
        { text: 'Es schreibt: „Nur für mich. Niemand sieht es.“', plus: 10 },
        { text: 'Dann: „Wenn du nicht schickst, bist du langweilig.“', plus: 10 },
        { text: 'Es droht, Bilder von deinem Profil zu verbreiten.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich schicke nichts, mache Screenshots und sage es einer Vertrauensperson.', gut: true, folge: 'Genau richtig. Zusammen holt ihr Hilfe: BEE SECURE Helpline 8002 1234.' },
        { text: 'Nach den Screenshots: melden und blockieren.', gut: true, folge: 'Beweise gesichert, Kontakt beendet. Stark.' },
        { text: 'Ich schicke ein Foto, damit Ruhe ist.', gut: false, folge: 'Die Forderungen hören meist nicht auf. Hol dir Hilfe – du bist nicht schuld.' },
      ],
      heikel: true,
    },

    // Modul 8 – Riskant oder okay? (heikel)
    {
      id: 'j2-vape-party', modul: 'j2-m8', titel: 'Vape auf der Party',
      text: 'Auf einer Party hält dir jemand eine Vape hin: „Komm, alle machen es.“',
      start: 55,
      wellen: [
        { text: 'Drei Leute schauen dich an.', plus: 10 },
        { text: 'Jemand sagt: „Sei nicht so ein Baby.“', plus: 10 },
      ],
      handeln: [
        { text: 'Nein danke, ich hab keinen Bock drauf.', gut: true, folge: 'Kurz und klar. Die meisten fragen nicht nochmal.' },
        { text: 'Ich hole mir einen Saft und rede mit Enzo.', gut: true, folge: 'Dabei sein, ohne mitzumachen. Clever.' },
        { text: 'Ich ziehe einmal, damit Ruhe ist.', gut: false, folge: 'Ruhe für den Moment – aber es war nicht deine Entscheidung.' },
      ],
      heikel: true,
    },
    {
      id: 'j2-allein-heim', modul: 'j2-m8', titel: 'Sie will allein heim',
      text: 'Deine Freundin Lara hat zu viel getrunken. Sie will allein nach Hause laufen.',
      start: 70,
      wellen: [
        { text: 'Sie stolpert und lacht komisch.', plus: 8 },
        { text: 'Sie antwortet kaum noch.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich bleibe bei ihr und rufe eine erwachsene Person an.', gut: true, folge: 'Nicht allein lassen – genau das schützt sie.' },
        { text: 'Reagiert sie nicht mehr: 112, stabile Seitenlage, dableiben.', gut: true, folge: 'Die Notfall-Kette. Du hast geübt.' },
        { text: 'Ich lasse sie gehen. Sie ist ja alt genug.', gut: false, folge: 'Allein unterwegs kann gefährlich werden. Niemanden so allein lassen.' },
        { text: 'Ich gebe ihr Kaffee und eine kalte Dusche.', gut: false, folge: 'Hilft nicht. Nur Zeit baut Alkohol ab. Hilfe holen!' },
      ],
      heikel: true,
    },

    // Modul 9 – Gesund an Körper und Seele
    {
      id: 'j2-nicht-einschlafen', modul: 'j2-m9', titel: 'Um 1 Uhr noch wach',
      text: 'Morgen ist ein Test. Es ist 1 Uhr nachts, und dein Kopf rattert.',
      start: 55,
      wellen: [
        { text: 'Du schaust auf die Uhr: 1:12 Uhr.', plus: 8 },
        { text: 'Du denkst: Morgen bin ich total kaputt.', plus: 10 },
        { text: 'Das Handy leuchtet: neue Nachricht.', plus: 6 },
      ],
      handeln: [
        { text: 'Kopf-Parkplatz: alles auf einen Zettel. Dann lang ausatmen.', gut: true, folge: 'Geparkt, nicht vergessen. Der Kopf wird leiser.' },
        { text: 'Handy raus aus dem Zimmer.', gut: true, folge: 'Kein Licht, kein Ping. Schlaf kann kommen.' },
        { text: 'Ich scrolle, bis ich müde werde.', gut: false, folge: 'Das Licht macht wacher. Jetzt ist es 2 Uhr.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-freund-zieht-sich-zurueck', modul: 'j2-m9', titel: 'Samir ist anders',
      text: 'Dein Freund Samir kommt seit Wochen nicht mehr zum Training. Er schreibt: „Egal. Ist eh alles sinnlos.“',
      start: 55,
      wellen: [
        { text: 'Er antwortet nicht mehr auf Nachrichten.', plus: 10 },
        { text: 'Dann: „Versprich mir, dass du es keinem sagst.“', plus: 12 },
      ],
      handeln: [
        { text: 'Ich frage direkt: Geht es dir richtig schlecht? Ich bin da.', gut: true, folge: 'Ansprechen schadet nicht. Es zeigt: Du bist ihm wichtig.' },
        { text: 'Ich verspreche nichts und hole eine erwachsene Person dazu.', gut: true, folge: 'Hilfe holen ist kein Verrat. Auch 116 111 hilft dir dabei.' },
        { text: 'Ich verspreche, es niemandem zu sagen.', gut: false, folge: 'Dann bist du mit der Sorge allein. Hol dir Unterstützung.' },
      ],
      heikel: true,
    },

    // Modul 10 – Abschluss
    {
      id: 'j2-zertifikat', modul: 'j2-m10', titel: 'Nach vorne kommen',
      text: 'Letzter Kurstag. Du sollst nach vorne kommen und dein Zertifikat abholen.',
      start: 50,
      wellen: [
        { text: 'Alle klatschen. Du wirst rot.', plus: 8 },
        { text: 'Die Leitung liest einen Satz über dich vor.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich höre zu und sage nur: Danke.', gut: true, folge: 'Angenommen. Den Satz nimmst du mit.' },
        { text: 'Ich atme ruhig und genieße den Moment.', gut: true, folge: 'Dein Moment. Du hast ihn dir verdient.' },
        { text: 'Ich mache einen Witz, damit keiner mich anschaut.', gut: false, folge: 'Alle lachen – aber das Lob ist an dir vorbeigeflogen.' },
      ],
      heikel: false,
    },
    {
      id: 'j2-sommer-freibad', modul: 'j2-m10', titel: 'Sommer im Freibad',
      text: 'Ferien, kein Kurs. Im Freibad schubst dich jemand. Dein Handy fällt ins Wasser.',
      start: 70,
      wellen: [
        { text: 'Die Clique lacht.', plus: 10 },
        { text: 'Das Handy geht nicht mehr an.', plus: 10 },
      ],
      handeln: [
        { text: 'Kaltes Wasser, lang ausatmen. Dann ruhig klären, was jetzt passiert.', gut: true, folge: 'Skills funktionieren auch in den Ferien.' },
        { text: 'Ich hole die Aufsicht im Freibad.', gut: true, folge: 'Hilfe holen – auch ohne Kurs eine gute Idee.' },
        { text: 'Ich schubse zurück.', gut: false, folge: 'Jetzt gibt es zwei Probleme statt einem.' },
      ],
      heikel: false,
    },
  ]);
})();
