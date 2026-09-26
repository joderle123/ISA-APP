/* SKILL DECK – Inhalte Kursjahr 1 (Skills-Kurs, CDSE Annexe Junglinster)
   Quelle: Skills-Kurs Jahr 1 (Module 0–9, Einheiten j1-e01 bis j1-e30, Joker j1-j01 bis j1-j09).
   Enthält:
   1. alle Skill-Karten, deren „Besitzer“ Jahr 1 ist (Skill-Schritt der ersten Einheit, als Spielkarte),
   2. alle 39 Einheiten mit Code, Stempel und Mission,
   3. Kampf-Situationen zu den Modulen von Jahr 1.
   Regeln: kurze Sätze, du-Form, keine persönlichen Offenbarungen, Rot nur für Körper/Atem/Sinne.
   Codes: Thema NATUR & MEER (damit sie nicht mit Jahr 2 und 3 kollidieren). */
(function () {
  'use strict';
  const SK = window.SK;

  /* ------------------------------------------------------------------
     1. SKILL-KARTEN (Besitzer: Jahr 1)
     ------------------------------------------------------------------ */
  SK.addSkills([
    // Modul 0 – Ankommen
    {
      id: 'sinne-54321', name: '5-4-3-2-1', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'sinne-tippen',
      params: { schritte: [{ anzahl: 5, sinn: 'sehen' }, { anzahl: 4, sinn: 'hören' }, { anzahl: 3, sinn: 'spüren' }, { anzahl: 2, sinn: 'riechen' }, { anzahl: 1, sinn: 'schmecken' }] },
      schritte: ['Nenne 5 Dinge, die du siehst.', 'Dann 4, die du hörst, und 3, die du spürst.', 'Dann 2, die du riechst, und 1, das du schmeckst.'],
      wann: 'Wenn dein Kopf voll ist und die Gedanken rasen.',
      flavor: 'Dein erster Skill. Und er holt dich immer zurück ins Jetzt.',
      einheit: 'j1-e01', seltenheit: 'legendaer',
    },
    {
      id: 'komplimente', name: 'Komplimente', typ: 'menschen', zonen: ['gruen'], kraft: 1,
      interaktion: 'satz',
      params: { saetze: ['Du hast heute richtig gut zugehört.', 'Danke.'] },
      schritte: ['Sag, was die Person gemacht hat – nicht, wie sie aussieht.', 'Bekommst du eins: Sag nur „Danke“.', 'Nicht kleinreden. Einfach annehmen.'],
      wann: 'Wenn du jemandem zeigen willst: Ich hab dich gesehen.',
      flavor: '„Danke“ – das schwerste leichte Wort der Welt.',
      einheit: 'j1-e02', seltenheit: 'basis',
    },
    {
      id: 'gemeinsam-atmen', name: 'Gemeinsam atmen', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen',
      params: { ein: 4, halten: 0, aus: 4, runden: 4 },
      schritte: ['Beide Füße auf den Boden.', '4 Sekunden ein, 4 Sekunden aus.', 'Bleib im Takt der Gruppe – oder des Kreises.'],
      wann: 'Wenn es in der Gruppe unruhig wird.',
      flavor: 'Ein Takt. Viele Lungen. Null Stress.',
      einheit: 'j1-e03', seltenheit: 'selten',
    },
    // Modul 1 – Wer bin ich?
    {
      id: 'atem-478', name: 'Atem 4-7-8', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen',
      params: { ein: 4, halten: 7, aus: 8, runden: 2 },
      schritte: ['4 Sekunden durch die Nase einatmen.', '7 Sekunden halten – oder kürzer, wenn dir das lieber ist.', '8 Sekunden langsam aus, wie durch einen Strohhalm.'],
      wann: 'Vor einer Prüfung, im Bus oder abends im Bett.',
      flavor: 'Langsamer als dein Puls. Stärker als dein Stress.',
      einheit: 'j1-e04', seltenheit: 'basis',
    },
    {
      id: 'dankbarkeitsblitz', name: 'Dankbarkeitsblitz', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'genuss',
      params: { text: '20 Sekunden: Denk an eine Sache, für die du gerade dankbar bist. Klein reicht.', sekunden: 20 },
      schritte: ['Augen zu oder Blick auf den Boden.', 'Denk 20 Sekunden an eine gute Sache. Klein reicht.', 'Das Essen in der Pause zählt auch.'],
      wann: 'An Tagen, an denen dein Kopf nur das Schlechte sieht.',
      flavor: '20 Sekunden Licht. Auch an grauen Tagen.',
      einheit: 'j1-e05', seltenheit: 'basis',
    },
    {
      id: 'bodyscan-kurz', name: 'Bodyscan', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bodyscan',
      params: { stellen: ['Füße', 'Beine', 'Bauch', 'Brust', 'Schultern', 'Kiefer'] },
      schritte: ['Setz oder leg dich bequem hin. Augen zu ist freiwillig.', 'Wandere mit der Aufmerksamkeit von den Füßen nach oben.', 'Du kannst nichts falsch machen. Alles, was da ist, ist okay.'],
      wann: 'Wenn du runterkommen willst – oder abends zum Einschlafen.',
      flavor: 'Einmal komplett durchscannen. Kein Virus gefunden.',
      einheit: 'j1-e06', seltenheit: 'selten',
    },
    // Modul 2 – Gefühle verstehen
    {
      id: 'spaziergang-sinne', name: 'Sinnes-Spaziergang', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'sinne-tippen',
      params: { schritte: [{ anzahl: 2, sinn: 'sehen' }, { anzahl: 2, sinn: 'hören' }, { anzahl: 1, sinn: 'riechen' }, { anzahl: 1, sinn: 'spüren' }] },
      schritte: ['Geh ohne Worte und ohne Handy.', 'Achte immer nur auf einen Sinn.', 'Such etwas, das du sonst übersiehst.'],
      wann: 'Wenn du im Gedankenkarussell festhängst.',
      flavor: 'Raus aus dem Karussell. Rein in die Welt.',
      einheit: 'j1-e07', seltenheit: 'basis',
    },
    {
      id: 'achtsames-hoeren', name: 'Achtsames Hören', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 1,
      interaktion: 'sinne-tippen',
      params: { schritte: [{ anzahl: 3, sinn: 'hören' }] },
      schritte: ['Augen zu oder Blick auf einen Punkt am Boden.', 'Hör erst auf Geräusche im Raum, dann draußen.', 'Such das leiseste Geräusch, das du finden kannst.'],
      wann: 'Wenn du nicht weißt, wohin mit deinen Gedanken.',
      flavor: 'Leise ist das neue Laut.',
      einheit: 'j1-e08', seltenheit: 'basis',
    },
    {
      id: 'luftballon-atem', name: 'Luftballon-Atem', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen',
      params: { ein: 3, halten: 0, aus: 5, runden: 3 },
      schritte: ['Beide Hände auf den Bauch.', 'Einatmen durch die Nase: Der Bauch wird rund.', 'Langsam durch den Mund aus – länger als ein.'],
      wann: 'Wenn die Anspannung steigt und du bremsen willst.',
      flavor: 'Nenn es Bauchatmung, wenn du willst. Es wirkt trotzdem.',
      einheit: 'j1-e10', seltenheit: 'selten',
    },
    // Modul 3 – Gefühle regulieren (Skills)
    {
      id: 'spaziergang-ohne-worte', name: 'Spaziergang ohne Worte', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bewegen',
      params: { text: 'Geh schweigend. Achte nur auf deine Schritte, auf Geräusche und Gerüche.', sekunden: 30 },
      schritte: ['Schätz deine Zahl von 0 bis 100.', 'Geh schweigend. Achte nur auf Schritte und Geräusche.', 'Schätz noch mal. Was hat sich verändert?'],
      wann: 'Wenn du Abstand brauchst, bevor du redest.',
      flavor: 'Kein Wort. Nur Schritte. Und die Zahl sinkt.',
      einheit: 'j1-e11', seltenheit: 'basis',
    },
    {
      id: 'partneratmung', name: 'Partneratmung', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen',
      params: { ein: 4, halten: 0, aus: 6, runden: 3 },
      schritte: ['Such dir eine ruhige Person – oder nimm den Kreis.', 'Pass deinen Atem ihrem Rhythmus an.', 'Nicht perfekt. Lass dich einfach mitnehmen.'],
      wann: 'Wenn eine ruhige Person in deiner Nähe ist.',
      flavor: 'Ruhe ist ansteckend. Zum Glück.',
      einheit: 'j1-e12', seltenheit: 'basis',
    },
    {
      id: 'minute-stille', name: 'Bis es still ist', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'halten',
      params: { sekunden: 12, text: 'Halt den Finger, solange du den Ton hörst. Lass los, wenn es still ist.' },
      schritte: ['Die Klangschale klingt einmal.', 'Hör dem Ton nach, bis er ganz weg ist.', 'Oder: eine Minute Stille, gemeinsam.'],
      wann: 'Wenn alles zu laut ist – außen oder innen.',
      flavor: 'Der Ton ist länger da, als du denkst.',
      einheit: 'j1-e13', seltenheit: 'basis',
    },
    {
      id: 'sicherer-ort', name: 'Mein sicherer Ort', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker',
      params: { text: 'Denk an dein Stichwort. Geh in Gedanken an deinen Ort. Was siehst, hörst, riechst du dort?', sekunden: 20 },
      schritte: ['Augen zu oder Blick auf einen Punkt.', 'Denk an dein Stichwort und geh an deinen Ort.', 'Du bestimmst, was dort ist und wer dazukommt.'],
      wann: 'Wenn du kurz raus musst, ohne wegzugehen – geübt bei Grün.',
      flavor: 'Kein Ticket. Kein WLAN. Nur du.',
      einheit: 'j1-e14', seltenheit: 'selten',
    },
    // Modul 4 – Meine Gedanken
    {
      id: 'gedankenschiffchen', name: 'Gedankenschiffchen', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'gedanken-boot',
      params: { gedanken: ['Ich schaff das nie.', 'Alle schauen mich an.', 'Das war so peinlich.', 'Ich bin nicht gut genug.'] },
      schritte: ['Stell dir einen Fluss vor.', 'Jeder Gedanke bekommt ein Schiff und treibt davon.', 'Mitgefahren? Kein Problem. Steig aus und schau vom Ufer zu.'],
      wann: 'Wenn ein Gedanke immer wieder kommt und dich bremst.',
      flavor: 'Du musst nicht auf jedes Schiff aufsteigen.',
      einheit: 'j1-e16', seltenheit: 'selten',
    },
    {
      id: 'freundliche-stimme', name: 'Die freundliche Stimme', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz',
      params: { saetze: ['Das ist gerade schwer.', 'Anderen geht es auch manchmal so.', 'Ich darf freundlich zu mir sein.'] },
      schritte: ['Wer mag: Hand auf die Brust oder den Unterarm.', 'Sag dir die drei Sätze innerlich. Glauben musst du sie nicht.', 'Sprich mit dir wie mit einem guten Freund.'],
      wann: 'Wenn deine innere Stimme gerade gemein zu dir ist.',
      flavor: 'Dein bester Kumpel wohnt in deinem Kopf. Lass ihn reden.',
      einheit: 'j1-e18', seltenheit: 'selten',
    },
    {
      id: 'achtsamkeit-wahl', name: 'Achtsamkeit nach Wahl', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'zaehlen',
      params: { bis: 5 },
      schritte: ['Wähl: Schiffchen, Bodyscan oder Klangschale.', 'Mach deine Übung fünf ruhige Atemzüge lang.', 'Merk dir: Welche Übung gehört zu dir?'],
      wann: 'Wenn du schon weißt, welche Übung dir am besten hilft.',
      flavor: 'Du kennst jetzt genug Skills, um selbst zu wählen.',
      einheit: 'j1-e19', seltenheit: 'episch',
    },
    // Modul 5 – Kommunikation & Grenzen
    {
      id: 'fester-stand', name: 'Fester Stand', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anker',
      params: { text: 'Füße hüftbreit. Spür Wurzeln in den Boden wachsen. Dreimal lang ausatmen. Sag leise: Ich stehe hier.', sekunden: 10 },
      schritte: ['Füße hüftbreit, Knie locker.', 'Stell dir Wurzeln vor. Schultern sinken lassen, dreimal lang ausatmen.', 'Sag leise, aber fest: „Ich stehe hier.“'],
      wann: 'Bevor du Nein sagst – im Bus oder vor der Klassentür.',
      flavor: 'Ich stehe hier. Niemand schiebt mich weg.',
      einheit: 'j1-e23', seltenheit: 'episch',
    },
    // Modul 6 – Wenn es schwierig wird
    {
      id: 'runter-unter-70', name: 'Runter unter 70', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'atmen',
      params: { ein: 4, halten: 4, aus: 4, halten2: 4, runden: 2 },
      schritte: ['Quadrat-Atmen: 4 Sekunden ein, 4 halten.', '4 Sekunden aus, 4 halten. Eine Minute lang.', 'Ziel ist nicht 0. Unter 70 reicht – dann geht Reden wieder.'],
      wann: 'Mitten im Streit, wenn du nicht einfach weggehen kannst.',
      flavor: 'Von 80 auf 60 reicht. Dann sitzt du wieder am Steuer.',
      einheit: 'j1-e24', seltenheit: 'selten',
    },
    {
      id: 'anker-vor-dem-nein', name: 'Anker vor dem Nein', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anker',
      params: { text: 'Füße fest auf den Boden. Einmal lang ausatmen. Dann erst: „Nein, ohne mich.“', sekunden: 8 },
      schritte: ['Füße fest auf den Boden.', 'Einmal lang ausatmen.', 'Dann erst deinen Nein-Satz sagen.'],
      wann: 'Wenn andere drängeln und alle auf deine Antwort warten.',
      flavor: 'Zwei Sekunden Anker. Ein Nein, das hält.',
      einheit: 'j1-e25', seltenheit: 'selten',
    },
    {
      id: 'positivitaetskette', name: 'Positivitätskette', typ: 'menschen', zonen: ['gruen'], kraft: 2,
      interaktion: 'satz',
      params: { saetze: ['Ich schätze an dir, dass du …', 'Danke.'] },
      schritte: ['Sag der Person neben dir, was du an ihr schätzt.', 'Sag, was sie gemacht hat – nicht, wie sie aussieht.', 'Die Antwort ist einfach: „Danke.“'],
      wann: 'Wenn die Gruppe nach einem schweren Thema Wärme braucht.',
      flavor: 'Das Gegenteil von Mobbing: Jede Person wird gesehen.',
      einheit: 'j1-e26', seltenheit: 'episch',
    },
    // Modul 7 – Digitale Welt
    {
      id: 'drei-atemzuege-handy', name: 'Drei Atemzüge vorm Handy', typ: 'atem', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'zaehlen',
      params: { bis: 3 },
      schritte: ['Handy mit dem Display nach unten.', 'Drei ruhige Atemzüge. Bemerk, wie die Hand zum Handy will.', 'Frag dich: Was will ich gerade wirklich?'],
      wann: 'Bevor du eine App öffnest – im Bett oder bei den Hausaufgaben.',
      flavor: 'Nicht die App entscheidet. Du.',
      einheit: 'j1-e27', seltenheit: 'basis',
    },
    {
      id: 'teilen-bremse', name: 'Teilen-Bremse', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'halten',
      params: { sekunden: 10, text: 'Finger halten statt teilen. Drei lange Atemzüge. Dann: Wer sagt das?' },
      schritte: ['Hand weg vom Handy.', 'Drei ruhige Atemzüge mit langem Ausatmen.', 'Dann erst die Frage: Wer sagt das?'],
      wann: 'Wenn dich ein Post wütend macht und du ihn sofort teilen willst.',
      flavor: 'Wut teilt schnell. Du teilst klug.',
      einheit: 'j1-e28', seltenheit: 'episch',
    },
    // Joker-Einheiten
    {
      id: 'wer-am-pult', name: 'Wer steht am Pult?', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'satz',
      params: { saetze: ['Gerade steht … bei mir am Pult.', 'Es darf da sein. Ich schau nur hin.'] },
      schritte: ['Dreimal ruhig ausatmen.', 'Schau nach innen: Welches Gefühl ist gerade da?', 'Zwei Gefühle? Beide dürfen bleiben.'],
      wann: 'Bevor ein Gefühl das Steuer übernimmt.',
      flavor: 'Wer sieht, wer am Pult steht, fährt selbst.',
      einheit: 'j1-j01', seltenheit: 'selten',
    },
    {
      id: 'satz-fuer-schwere-tage', name: 'Satz für schwere Tage', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz',
      params: { saetze: ['Heute ist schwer. Das bleibt nicht so.', 'Ein kleiner Schritt reicht für heute.', 'Ich hab schon Schweres geschafft.'] },
      schritte: ['Denk an deinen tragenden Satz.', 'Dreimal langsam ausatmen.', 'Sag dir den Satz innerlich. Ehrlich, nicht kitschig.'],
      wann: 'Wenn du alles hinschmeißen willst.',
      flavor: 'Ein Satz, den du immer dabeihast. Wie ein Schlüssel.',
      einheit: 'j1-j02', seltenheit: 'selten',
    },
    {
      id: 'handy-stopp', name: 'Handy-Stopp', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'halten',
      params: { sekunden: 8, text: 'Daumen aufs Display, nicht entsperren. Einmal langsam ausatmen. Was will ich eigentlich?' },
      schritte: ['Handy in die Hand – aber nicht entsperren.', 'Daumen aufs Display. Einmal langsam ausatmen.', 'Frag dich: Was will ich eigentlich? Dann entscheide.'],
      wann: 'Wenn du merkst, dass die App schon wieder ruft.',
      flavor: 'Du holst dir die Entscheidung zurück, bevor die App sie trifft.',
      einheit: 'j1-j03', seltenheit: 'selten',
    },
    {
      id: 'mein-platz', name: 'Mein Platz draußen', typ: 'sinne', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'genuss',
      params: { text: 'Stell dir deinen Platz draußen vor. Nur sitzen, schauen und hören.', sekunden: 20 },
      schritte: ['Such dir draußen einen Platz in Sichtweite.', 'Allein und ohne Handy.', 'Nur sitzen, schauen und hören.'],
      wann: 'Wenn du Ruhe tanken willst.',
      flavor: 'Zehn Minuten. Ein Baum. Endlich Ruhe im Kopf.',
      einheit: 'j1-j04', seltenheit: 'selten',
    },
    {
      id: 'rolle-abschuetteln', name: 'Rolle abschütteln', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bewegen',
      params: { text: 'Schüttel Arme, Beine und Schultern aus. Sag deinen Namen und etwas, das du magst.', sekunden: 15 },
      schritte: ['Schüttel Arme, Beine und Schultern aus.', 'Sag laut deinen eigenen Namen.', 'Und etwas, das du wirklich magst.'],
      wann: 'Nach einem Rollenspiel – oder nach einer blöden Rolle im Alltag.',
      flavor: 'Die Rolle bleibt auf der Bühne. Du gehst als du.',
      einheit: 'j1-j05', seltenheit: 'basis',
    },
    {
      id: 'energie-check', name: 'Energie-Check', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bewegen',
      params: { text: 'Zu viel Dampf? 4 Sekunden ein, 6 aus. Akku leer? Strecken, Schultern kreisen, Hände schütteln.', sekunden: 20 },
      schritte: ['Zeig mit den Fingern: Energie von 0 bis 10.', 'Zu viel: 4 ein, 6 aus. Zu wenig: strecken und schütteln.', 'Schätz noch mal. Was hat sich verändert?'],
      wann: 'Wenn du total aufgedreht bist – oder total leer.',
      flavor: 'Runterfahren oder hochladen. Du hast beide Knöpfe.',
      einheit: 'j1-j06', seltenheit: 'basis',
    },
    {
      id: 'unsichtbare-skills', name: 'Unsichtbare Skills', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'anspannen-loslassen',
      params: { teile: ['Hände', 'Füße', 'Schultern'], halten: 5 },
      schritte: ['Füße fest in den Boden drücken.', 'Hände 5 Sekunden anspannen, dann loslassen.', 'Lang ausatmen. Oder ein Schluck Wasser.'],
      wann: 'In der Prüfung, wenn niemand etwas merken soll.',
      flavor: 'Niemand sieht es. Aber du spürst es.',
      einheit: 'j1-j09', seltenheit: 'episch',
    },
  ]);

  /* ------------------------------------------------------------------
     2. EINHEITEN (30 reguläre Einheiten + 9 Joker)
     Stempel: nur bei der letzten regulären Einheit eines Moduls.
     ------------------------------------------------------------------ */
  SK.addUnits([
    // ================= Modul 0 – Ankommen =================
    {
      id: 'j1-e01', jahr: 1, nr: 1, modul: 'j1-m0', modulTitel: 'Ankommen',
      titel: 'Willkommen – unser Rahmen', joker: false,
      code: 'BOJE', skills: ['sinne-54321'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge',
        titel: '5-4-3-2-1 aus dem Kopf',
        intro: 'Dein erster Skill! Bring die fünf Sinne in die richtige Reihenfolge.',
        daten: {
          schritte: [
            'Sehen: Such Dinge um dich herum.',
            'Hören: Welche Geräusche sind gerade da?',
            'Spüren: Stuhl, Kleidung, Luft auf der Haut.',
            'Riechen: Was liegt in der Luft?',
            'Schmecken: Was ist gerade in deinem Mund?',
          ],
        },
        abschluss: '5 sehen, 4 hören, 3 spüren, 2 riechen, 1 schmecken. So holst du dich ins Jetzt.',
      },
    },
    {
      id: 'j1-e02', jahr: 1, nr: 2, modul: 'j1-m0', modulTitel: 'Ankommen',
      titel: 'Kennenlernen in Bewegung', joker: false,
      code: 'DELFIN', skills: ['komplimente'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen',
        titel: 'Kompliment-Werkstatt',
        intro: 'Bau Komplimente, die wirklich ankommen. Und nimm eins an!',
        daten: {
          aufgaben: [
            {
              situation: 'Noah hat beim Bingo bei jeder Person freundlich nachgefragt.',
              bausteine: ['Du hast', 'beim Bingo', 'richtig gut nachgefragt.', 'coole Schuhe.', 'Du siehst', 'heute gut aus.'],
              loesungen: [['Du hast', 'beim Bingo', 'richtig gut nachgefragt.']],
              tipp: 'Sag, was die Person gemacht hat – nicht, wie sie aussieht.',
            },
            {
              situation: 'Mia sagt zu dir: „Du hast heute voll lustig erzählt.“ Was sagst du?',
              bausteine: ['Danke.', 'Ach, war doch nichts.', 'Stimmt gar nicht.', 'Du spinnst.'],
              loesungen: [['Danke.']],
              tipp: 'Nur „Danke“. Nicht kleinreden. Das ist der eigentliche Skill.',
            },
            {
              situation: 'Tiago hat Lina geholfen, als sie ihr Blatt nicht gefunden hat.',
              bausteine: ['Du hast', 'Lina', 'sofort geholfen.', 'eine teure Jacke.', 'Du hast', 'gar nichts gemacht.'],
              loesungen: [['Du hast', 'Lina', 'sofort geholfen.']],
              tipp: 'Ein gutes Kompliment ist konkret: Was genau hat er getan?',
            },
          ],
        },
        abschluss: 'Geben ist leicht, annehmen ist der Skill. Und den kann man üben.',
      },
    },
    {
      id: 'j1-e03', jahr: 1, nr: 3, modul: 'j1-m0', modulTitel: 'Ankommen',
      titel: 'Wir als Team', joker: false,
      code: 'OTTER', skills: ['gemeinsam-atmen'], stempel: 'Team-Start', heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Blind führen',
        intro: 'Deine Partnerin hat die Augen zu. Du führst nur mit der Stimme.',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Draußen auf dem Gelände. Inês hat die Augen zu. Vor euch liegt ein dicker Ast.',
              wahl: [
                { text: '„Stopp! Jetzt ein großer Schritt nach vorn.“', weiter: 'k2', folge: 'Inês steigt sicher drüber. Sie vertraut dir mehr.', punkte: 2 },
                { text: 'Du packst sie einfach am Arm und ziehst.', weiter: 'k2', folge: 'Inês erschrickt. Anfassen nur, wenn sie es vorher erlaubt.', punkte: 0 },
                { text: 'Du sagst nichts. Sie merkt das schon.', weiter: 'k2', folge: 'Inês stolpert fast. Ohne klare Ansagen geht Führen nicht.', punkte: 0 },
              ],
            },
            k2: {
              text: 'Jetzt Blindfußball. Inês schießt – weit am Tor vorbei. Zwei Leute lachen.',
              wahl: [
                { text: '„Etwas mehr nach links. Du bist nah dran!“', weiter: 'k3', folge: 'Der nächste Schuss sitzt fast. Ihr lacht zusammen.', punkte: 2 },
                { text: '„Oh Mann, das war echt schlecht.“', weiter: 'k3', folge: 'Inês hat keine Lust mehr. Die Stimmung kippt.', punkte: 0 },
                { text: 'Du lachst mit den anderen mit.', weiter: 'k3', folge: 'Inês nimmt die Augenbinde ab. Das Vertrauen ist weg.', punkte: 0 },
              ],
            },
            k3: {
              text: 'Rollenwechsel. Jetzt hast du die Augen zu. Plötzlich wird es dir zu viel.',
              wahl: [
                { text: '„Stopp. Ich brauch kurz eine Pause.“', weiter: null, folge: 'Inês bleibt sofort stehen. Das Stopp-Recht gilt für alle.', punkte: 2 },
                { text: 'Du hältst durch und sagst nichts.', weiter: null, folge: 'Geschafft – aber mit Bauchweh. Stopp sagen ist immer erlaubt.', punkte: 1 },
              ],
            },
          },
        },
        abschluss: 'Klare Ansagen, fragen vor dem Anfassen, Stopp-Recht: So wird aus einer Gruppe ein Team.',
      },
    },

    // ================= Modul 1 – Wer bin ich? =================
    {
      id: 'j1-e04', jahr: 1, nr: 4, modul: 'j1-m1', modulTitel: 'Wer bin ich?',
      titel: 'Das Glas der Bedürfnisse', joker: false,
      code: 'QUELLE', skills: ['atem-478'], stempel: null, heikel: false,
      mission: {
        typ: 'paare',
        titel: 'Welcher Tank ist leer?',
        intro: 'Hinter vielen Sätzen steckt ein Bedürfnis. Finde die Paare!',
        daten: {
          paare: [
            ['„Ich will unbedingt die neuen Sneakers.“', 'Dazugehören'],
            ['„Lasst mich einfach alle in Ruhe!“', 'Ruhe und Erholung'],
            ['„Keiner merkt, was ich alles mache.“', 'Anerkennung'],
            ['„Ich kann nicht mehr still sitzen.“', 'Bewegung'],
            ['„Ich kann mich null konzentrieren. So müde.“', 'Schlaf'],
            ['„Immer bestimmen die anderen, nie ich.“', 'Mitbestimmen'],
          ],
        },
        abschluss: 'Jedes Bedürfnis ist wie ein Tank. Ist einer fast leer, meldet sich ein Gefühl.',
      },
    },
    {
      id: 'j1-e05', jahr: 1, nr: 5, modul: 'j1-m1', modulTitel: 'Wer bin ich?',
      titel: 'Zwischen laut und leise', joker: false,
      code: 'BRISE', skills: ['dankbarkeitsblitz'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Laut, leise – alles okay?',
        intro: 'Wisch die Karten: Mythos oder Fakt?',
        daten: {
          karten: [
            { text: 'Leise Menschen sind schüchtern.', fakt: false, erklaerung: 'Leise ist nicht dasselbe wie schüchtern. Viele tanken einfach gern in Ruhe auf.' },
            { text: 'Die meisten Menschen liegen irgendwo zwischen laut und leise.', fakt: true, erklaerung: 'Ganz laut oder ganz leise sind wenige. Die meisten sind dazwischen.' },
            { text: 'Du bist in jeder Situation gleich laut.', fakt: false, erklaerung: 'Mit Freunden laut, in der neuen Klasse leise. Das ist ganz normal.' },
            { text: 'Laut ist besser als leise.', fakt: false, erklaerung: 'Keine Seite ist besser. Beide haben echte Stärken.' },
            { text: 'Andere sehen dich manchmal anders als du dich selbst.', fakt: true, erklaerung: 'Selbstbild und Fremdbild sind oft verschieden. Beides ist spannend.' },
            { text: 'Manche tanken unter Leuten auf, andere allein.', fakt: true, erklaerung: 'Beides ist okay. Wichtig ist: Du weißt, was dir guttut.' },
            { text: 'Wer leise ist, hat nichts zu sagen.', fakt: false, erklaerung: 'Leise Leute hören oft genau zu. Wenn sie reden, lohnt es sich.' },
          ],
        },
        abschluss: 'Unterschiede sind keine Fehler. Sie machen eine Gruppe bunt und stark.',
      },
    },
    {
      id: 'j1-e06', jahr: 1, nr: 6, modul: 'j1-m1', modulTitel: 'Wer bin ich?',
      titel: 'Mein Baum der Stärke', joker: false,
      code: 'EICHE', skills: ['bodyscan-kurz'], stempel: 'Stärken-Finder', heikel: false,
      mission: {
        typ: 'detektiv',
        titel: 'Der leere Baum',
        intro: 'Stimmt dieser Gedanke wirklich? Sammle Beweise dafür und dagegen.',
        daten: {
          gedanke: 'Ich kann gar nichts.',
          situation: 'Lucas soll seinen Baum der Stärke malen. Das Blatt bleibt leer.',
          beweise: [
            { text: 'In Mathe hat er gerade eine schlechte Note.', spricht: 'dafuer' },
            { text: 'Er hat seiner Oma gezeigt, wie Videoanrufe gehen.', spricht: 'dagegen' },
            { text: 'Beim Fußball hält er fast jeden Ball.', spricht: 'dagegen' },
            { text: 'Er vergisst oft seine Hausaufgaben.', spricht: 'dafuer' },
            { text: 'Freunde fragen ihn um Rat, wenn sie Streit haben.', spricht: 'dagegen' },
            { text: 'Er backt sonntags die besten Pfannkuchen.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Manches fällt mir schwer. Aber ich kann einiges – und das wächst.',
        },
        abschluss: 'Wurzeln, Stamm, Krone, Früchte: Jeder Baum hat mehr, als man zuerst sieht.',
      },
    },

    // ================= Modul 2 – Gefühle verstehen =================
    {
      id: 'j1-e07', jahr: 1, nr: 7, modul: 'j1-m2', modulTitel: 'Gefühle verstehen',
      titel: 'Was sind Gefühle – und wozu sind sie gut?', joker: false,
      code: 'FUCHS', skills: ['spaziergang-sinne'], stempel: null, heikel: false,
      mission: {
        typ: 'paare',
        titel: 'Gefühle mit Botschaft',
        intro: 'Jedes Gefühl will dir etwas sagen. Welche Botschaft gehört zu welchem?',
        daten: {
          paare: [
            ['Angst', '„Pass auf, hier könnte Gefahr sein.“'],
            ['Wut', '„Hier ist etwas unfair. Setz dich ein!“'],
            ['Traurigkeit', '„Du hast etwas verloren. Hol dir Trost.“'],
            ['Freude', '„Das tut dir gut. Mehr davon!“'],
            ['Ekel', '„Igitt, halt Abstand. Das könnte schaden.“'],
            ['Überraschung', '„Achtung, etwas Neues! Schau genau hin.“'],
          ],
        },
        abschluss: 'Es gibt keine falschen Gefühle. Auch die unangenehmen haben einen Job.',
      },
    },
    {
      id: 'j1-e08', jahr: 1, nr: 8, modul: 'j1-m2', modulTitel: 'Gefühle verstehen',
      titel: 'Alles steht Kopf', joker: false,
      code: 'KRAKE', skills: ['achtsames-hoeren'], stempel: null, heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Wer kommt ans Pult?',
        intro: 'Ein Gefühl übernimmt das Steuer. Du entscheidest, wer ans Pult darf.',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Samstag, 13 Uhr. Sofia schreibt: „Sorry, kann heute doch nicht.“ Ihr wolltet ins Kino. Wer darf ans Pult?',
              wahl: [
                { text: 'Wut: „Immer sagt sie ab! Der schreib ich jetzt was.“', weiter: 'k2a', folge: 'Du tippst eine fiese Nachricht. Sofia antwortet nicht mehr.', punkte: 0 },
                { text: 'Kummer: „Schade. Ich hab mich echt gefreut.“', weiter: 'k2b', folge: 'Du schreibst genau das. Sofia ruft sofort an.', punkte: 2 },
                { text: 'Freude: „Egal! Ist doch alles super!“', weiter: 'k2c', folge: 'Du lächelst es weg. Aber abends bist du komisch drauf.', punkte: 1 },
              ],
            },
            k2a: {
              text: 'Am Montag ist es zwischen euch komisch. Was machst du?',
              wahl: [
                { text: '„Sorry wegen Samstag. Ich war echt enttäuscht.“', weiter: null, folge: 'Sofia erzählt, was los war. Ihr versteht euch wieder.', punkte: 2 },
                { text: 'Du tust so, als wäre sie Luft.', weiter: null, folge: 'Die Funkstille bleibt. Beide fühlen sich mies.', punkte: 0 },
              ],
            },
            k2b: {
              text: 'Sofia sagt: „Bei mir zu Hause war heute Stress. Ich wollte dich nicht hängen lassen.“',
              wahl: [
                { text: '„Okay, danke fürs Sagen. Wir holen das nach.“', weiter: null, folge: 'Kummer hat Nähe gebracht. Ihr plant einen neuen Termin.', punkte: 2 },
                { text: '„Aha. Okay.“ Und Handy weg.', weiter: null, folge: 'Kurz ist es kühl zwischen euch. Nachfragen hätte geholfen.', punkte: 1 },
              ],
            },
            k2c: {
              text: 'Abends merkst du: Da ist doch etwas. Was machst du?',
              wahl: [
                { text: 'Du schaust, wer wirklich am Pult steht: Enttäuschung.', weiter: null, folge: 'Gefühl erkannt. Du schreibst Sofia ehrlich. Sie freut sich darüber.', punkte: 2 },
                { text: 'Du scrollst bis Mitternacht.', weiter: null, folge: 'Die Enttäuschung bleibt. Weggeschoben ist nicht weg.', punkte: 0 },
              ],
            },
          },
        },
        abschluss: 'Jedes Gefühl hat seinen Platz am Pult. Sogar Kummer – er holt dir Trost und Nähe.',
      },
    },
    {
      id: 'j1-e09', jahr: 1, nr: 9, modul: 'j1-m2', modulTitel: 'Gefühle verstehen',
      titel: 'Wo spüre ich Gefühle?', joker: false,
      code: 'MOOS', skills: ['bodyscan-kurz'], stempel: null, heikel: false,
      mission: {
        typ: 'paare',
        titel: 'Gefühls-Landkarte',
        intro: 'Wo meldet sich welches Gefühl im Körper? Finde die typischen Paare.',
        daten: {
          paare: [
            ['Wut', 'Heißer Kopf, Fäuste, Kiefer fest'],
            ['Angst', 'Herz rast, Bauch zieht sich zusammen'],
            ['Freude', 'Leicht, warm, voller Energie'],
            ['Traurigkeit', 'Kloß im Hals, schwere Arme'],
            ['Ekel', 'Magen dreht sich, Nase rümpft sich'],
            ['Überraschung', 'Augen weit auf, kurz die Luft weg'],
          ],
        },
        abschluss: 'Das sind typische Signale – bei dir sitzen sie vielleicht woanders. Kennst du dein erstes Warnsignal?',
      },
    },
    {
      id: 'j1-e10', jahr: 1, nr: 10, modul: 'j1-m2', modulTitel: 'Gefühle verstehen',
      titel: 'Gemischte Gefühle', joker: false,
      code: 'LAGUNE', skills: ['luftballon-atem'], stempel: 'Gefühls-Kenner', heikel: false,
      mission: {
        typ: 'schaetzen',
        titel: 'Wie stark, von 0 bis 10?',
        intro: 'Schätz, wie stark die Person ihr Gefühl erlebt. Dann verrät sie ihre Zahl.',
        daten: {
          fragen: [
            { text: 'Emma schießt das Siegtor. Dabei schürft sie sich das Knie auf. Wie stark ist ihre Freude?', min: 0, max: 10, richtig: 9, einheit: '/10', erklaerung: 'Emma sagt: Freude 9 – und Schmerz 4. Beides ist gleichzeitig da.' },
            { text: 'Amir zieht in eine neue Stadt. Wie stark ist seine Traurigkeit?', min: 0, max: 10, richtig: 6, einheit: '/10', erklaerung: 'Amir sagt: Traurigkeit 6 und Vorfreude 5. Gemischte Gefühle sind normal.' },
            { text: 'Chloé hat morgen ihren ersten Auftritt mit der Band. Wie nervös ist sie?', min: 0, max: 10, richtig: 7, einheit: '/10', erklaerung: 'Chloé sagt: Nervosität 7 – und Freude 8. Aufregung kann beides sein.' },
            { text: 'Jules bekommt ein Geschenk, das er doof findet. Wie groß ist die Enttäuschung?', min: 0, max: 10, richtig: 3, einheit: '/10', erklaerung: 'Jules sagt: 3. Und Dankbarkeit 6, weil jemand an ihn gedacht hat.' },
          ],
        },
        abschluss: 'Gefühle mischen sich. Und jeder Mensch hat seine eigene Zahl – keine ist falsch.',
      },
    },

    // ================= Modul 3 – Gefühle regulieren (Skills) =================
    {
      id: 'j1-e11', jahr: 1, nr: 11, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
      titel: 'Skills und die Anspannungsskala', joker: false,
      code: 'WELLE', skills: ['spaziergang-ohne-worte'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren',
        titel: 'Wo stehst du?',
        intro: 'Grün, gelb oder rot? Sortiere die Situationen auf der Skala von 0 bis 100.',
        daten: {
          items: [
            { text: 'Du chillst nach der Schule auf dem Sofa.', zone: 'gruen', warum: '0–30: entspannt. Hier kannst du alle Skills üben.' },
            { text: 'In fünf Minuten sollst du vor der Klasse vorlesen.', zone: 'gelb', warum: '30–70: angespannt, aber du kannst noch denken. Atem und Kopf helfen.' },
            { text: 'Jemand schubst dich, alle lachen. Du kochst.', zone: 'rot', warum: '70–100: Der Kopf ist aus. Reden hilft nicht. Erst Körper, Atem, Sinne.' },
            { text: 'Du hast den Bus knapp verpasst.', zone: 'gelb', warum: 'Ärgerlich, aber machbar. Ein paar lange Atemzüge helfen.' },
            { text: 'Du hörst mit Freunden Musik.', zone: 'gruen', warum: 'Entspannt und gut drauf. Nichts zu tun.' },
            { text: 'Im Streit brüllt dich jemand an. Dein Herz rast.', zone: 'rot', warum: 'Alarm im Körper. Jetzt nur Körper, Atem, Sinne.' },
            { text: 'Du wartest auf deine Testnote.', zone: 'gelb', warum: 'Die Spannung steigt. Ablenken oder atmen hilft.' },
            { text: 'Du liegst abends im Bett, kurz vorm Einschlafen.', zone: 'gruen', warum: 'Fast bei 0. Völlig entspannt.' },
          ],
        },
        abschluss: 'Jede Person hat ihre eigene Skala. Wichtig ist: Du kennst deine.',
      },
    },
    {
      id: 'j1-e12', jahr: 1, nr: 12, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
      titel: 'Skills über Körper und Atem', joker: false,
      code: 'ROBBE', skills: ['partneratmung'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Das Körper-Labor',
        intro: 'Was stimmt über Körper- und Atem-Skills? Mythos oder Fakt?',
        daten: {
          karten: [
            { text: 'Langes Ausatmen tritt im Körper auf die Bremse.', fakt: true, erklaerung: 'Beim langen Ausatmen schlägt das Herz langsamer. Der Körper fährt runter.' },
            { text: 'Bei Wut stellt der Körper Energie für Kampf oder Flucht bereit.', fakt: true, erklaerung: 'Herz, Muskeln, Atem: alles auf Alarm. Diese Energie will raus.' },
            { text: 'Drei Minuten Hampelmänner machen dich nur noch wütender.', fakt: false, erklaerung: 'Kurze, starke Bewegung verbraucht die Alarm-Energie. Danach sinkt die Anspannung oft.' },
            { text: 'Anspannen und Loslassen fällt im Unterricht sofort auf.', fakt: false, erklaerung: 'Füße in den Boden drücken, Hände unter dem Tisch anspannen: Das merkt niemand.' },
            { text: 'Ruhige Menschen können uns ruhiger machen.', fakt: true, erklaerung: 'Das zeigt die Partneratmung: Ruhe steckt an.' },
            { text: 'Ein Skill wirkt bei allen gleich gut.', fakt: false, erklaerung: 'Was bei dir wirkt, findest du nur durch Testen heraus.' },
            { text: 'Beim Anspannen soll es richtig wehtun.', fakt: false, erklaerung: 'Fest anspannen, aber ohne Schmerz. Dann loslassen und nachspüren.' },
          ],
        },
        abschluss: 'Teste wie im Labor: Zahl vorher, Skill, Zahl nachher. So findest du deinen Favoriten.',
      },
    },
    {
      id: 'j1-e13', jahr: 1, nr: 13, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
      titel: 'Skills über die Sinne', joker: false,
      code: 'KIESEL', skills: ['minute-stille'], stempel: null, heikel: false,
      mission: {
        typ: 'paare',
        titel: 'Die Sinneskiste',
        intro: 'Welcher Sinnes-Skill passt zu welchem Moment? Finde die Paare.',
        daten: {
          paare: [
            ['Die Wut kocht hoch.', 'Kühlpack oder Eiswürfel in die Hand'],
            ['Die Gedanken rasen vor dem Test.', '5-4-3-2-1'],
            ['Nervös im Bus, die Hände wollen etwas tun.', 'Knetball in der Hosentasche'],
            ['Mittags müde, die Augen fallen zu.', 'Pfefferminz oder frischer Duft'],
            ['Abends kannst du nicht abschalten.', 'Ruhiger Song aus deiner Playlist'],
            ['Alles ist zu laut und zu viel.', 'Klangschale: hören, bis es still ist'],
          ],
        },
        abschluss: 'Sinne holen dich ins Jetzt. Wer genau hinhört, kann nicht gleichzeitig grübeln.',
      },
    },
    {
      id: 'j1-e14', jahr: 1, nr: 14, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
      titel: 'Achtsamkeit und Kopf-Skills', joker: false,
      code: 'BUCHT', skills: ['sicherer-ort'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren',
        titel: 'Welcher Skill wirkt wo?',
        intro: 'Wo hilft dieser Skill am besten: bei Grün, Gelb oder Rot?',
        daten: {
          items: [
            { text: 'Gedankenschiffchen', zone: 'gelb', warum: 'Kopf-Skill: stark bei Gelb. Bei Rot kommt der Kopf nicht mit.' },
            { text: 'Kaltes Wasser über die Handgelenke', zone: 'rot', warum: 'Kälte wirkt direkt auf den Körper. Perfekt für Rot.' },
            { text: 'Ein Stück Schokolade ganz langsam essen', zone: 'gruen', warum: 'Achtsam genießen übst du am besten, wenn es ruhig ist.' },
            { text: 'Von 100 immer 7 abziehen', zone: 'gelb', warum: 'Kopf-Skill: Er bindet die Aufmerksamkeit. Bei Rot ist das zu schwer.' },
            { text: 'Drei Minuten Hampelmänner', zone: 'rot', warum: 'Bewegung verbraucht die Alarm-Energie. Hilft bei Rot.' },
            { text: 'Mein sicherer Ort', zone: 'gelb', warum: 'Bei Grün üben – dann funktioniert er bei Gelb.' },
            { text: 'Dankbarkeitsblitz', zone: 'gruen', warum: 'Kopf-Skill für ruhige Momente. Er stärkt dich für später.' },
            { text: 'Füße fest in den Boden drücken', zone: 'rot', warum: 'Körper-Skill: geht immer, auch wenn der Kopf aus ist.' },
          ],
        },
        abschluss: 'Bei Rot kommt der Kopf nicht an. Erst runter mit Körper, Atem, Sinnen – dann denken.',
      },
    },
    {
      id: 'j1-e15', jahr: 1, nr: 15, modul: 'j1-m3', modulTitel: 'Gefühle regulieren (Skills)',
      titel: 'Mein Skills-Koffer und Ampelplan', joker: false,
      code: 'GIPFEL', skills: [], stempel: 'Skills-Profi', heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Der Koffer im Einsatz',
        intro: 'Rot, gelb, grün: Welcher Skill passt wann? Pack deinen Koffer aus!',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Sportstunde. Ihr verliert knapp. Jemand ruft: „Wegen dir!“ Du bist bei 85.',
              wahl: [
                { text: 'Kopf-Skill: Ich denke an meinen sicheren Ort.', weiter: 'k1', folge: 'Bei 85 kommt der Kopf nicht an. Spul zurück und probier etwas anderes.', punkte: 0 },
                { text: 'Körper-Skill: Raus auf den Flur, 20 Hampelmänner.', weiter: 'k2', folge: 'Die Alarm-Energie geht raus. Du bist bei 60.', punkte: 2 },
                { text: 'Sinnes-Skill: kaltes Wasser über die Hände.', weiter: 'k2', folge: 'Die Kälte holt dich zurück. Du bist bei 60.', punkte: 2 },
              ],
            },
            k2: {
              text: 'Du bist bei 60 – Gelb. Der Kopf kommt langsam wieder. Und jetzt?',
              wahl: [
                { text: 'Gedankenschiffchen: „Wegen dir“ darf wegtreiben.', weiter: 'k3', folge: 'Der Satz verliert an Kraft. Du bist bei 35.', punkte: 2 },
                { text: 'Luftballon-Atem, fünf Runden.', weiter: 'k3', folge: 'Der Bauch wird ruhig. Du bist bei 35.', punkte: 2 },
                { text: 'Du grübelst weiter: „Stimmt ja. Immer ich.“', weiter: 'k2', folge: 'Die Zahl steigt wieder auf 70. Spul zurück.', punkte: 0 },
              ],
            },
            k3: {
              text: 'Fast Grün. Jetzt kannst du wieder reden. Was machst du?',
              wahl: [
                { text: 'Du sagst ruhig: „Wir haben alle verloren. Nicht nur ich.“', weiter: null, folge: 'Kurze Stille. Dann nickt jemand. Situation gelöst.', punkte: 2 },
                { text: 'Du erzählst es später deiner Vertrauensperson.', weiter: null, folge: 'Du bist nicht allein damit. Sie steht auch auf deiner Notfallkarte.', punkte: 2 },
                { text: 'Du sagst nichts und gehst nach Hause.', weiter: null, folge: 'Okay für heute. Aber der Ärger kommt vielleicht wieder.', punkte: 1 },
              ],
            },
          },
        },
        abschluss: 'Bei Rot Körper, Atem, Sinne, bei Gelb auch Kopf, bei Grün reden. Du bist Skills-Profi!',
      },
    },

    // ================= Modul 4 – Meine Gedanken =================
    {
      id: 'j1-e16', jahr: 1, nr: 16, modul: 'j1-m4', modulTitel: 'Meine Gedanken',
      titel: 'Was sind Glaubenssätze?', joker: false,
      code: 'SEGEL', skills: ['gedankenschiffchen'], stempel: null, heikel: false,
      mission: {
        typ: 'paare',
        titel: 'Bremse oder Rückenwind?',
        intro: 'Jeder bremsende Satz hat ein hilfreiches Gegenstück. Finde die Paare!',
        daten: {
          paare: [
            ['„Ich bin schlecht in Mathe.“', '„Mathe fällt mir schwer. Mit Üben wird es besser.“'],
            ['„Alle anderen sind besser als ich.“', '„Jede Person kann etwas anderes gut.“'],
            ['„Ich darf keine Fehler machen.“', '„Aus Fehlern lerne ich.“'],
            ['„Mich mag sowieso keiner.“', '„Ein paar Leute mögen mich. Das zählt.“'],
            ['„Ich muss immer stark sein.“', '„Auch Starke holen sich mal Hilfe.“'],
            ['„Das schaffe ich nie.“', '„Das schaffe ich noch nicht. Schritt für Schritt.“'],
          ],
        },
        abschluss: 'Gedanken sind keine Tatsachen. Du kannst prüfen, welcher Satz dich weiterbringt.',
      },
    },
    {
      id: 'j1-e17', jahr: 1, nr: 17, modul: 'j1-m4', modulTitel: 'Meine Gedanken',
      titel: 'Meine Glaubenssätze', joker: false,
      code: 'WURZEL', skills: ['luftballon-atem', 'dankbarkeitsblitz'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Woher kommen die Sätze?',
        intro: 'Deine eigenen Sätze bleiben privat. Hier geht es ums Prinzip: Mythos oder Fakt?',
        daten: {
          karten: [
            { text: 'Glaubenssätze stimmen immer.', fakt: false, erklaerung: 'Wir halten sie für wahr. Aber oft hat sie nie jemand überprüft.' },
            { text: 'Viele Glaubenssätze entstehen aus einer einzigen Situation.', fakt: true, erklaerung: 'Einmal ausgelacht – und schon sitzt der Satz: „Ich bin peinlich.“' },
            { text: 'Sprüche von anderen können zu eigenen Sätzen werden.', fakt: true, erklaerung: 'Was man oft hört, glaubt man irgendwann. Auch wenn es nicht stimmt.' },
            { text: 'Social Media hat mit Glaubenssätzen nichts zu tun.', fakt: false, erklaerung: 'Wer sich ständig vergleicht, landet schnell bei „Ich bin nicht gut genug“.' },
            { text: 'Nur schwache Menschen haben bremsende Sätze.', fakt: false, erklaerung: 'Fast alle kennen solche Sätze. Du bist damit nicht allein.' },
            { text: 'Einen Satz, der heute nicht mehr stimmt, darfst du loslassen.', fakt: true, erklaerung: 'Was früher gepasst hat, muss heute nicht mehr gelten.' },
            { text: 'Wenn jemand seinen Satz teilt, gibt die Gruppe Ratschläge.', fakt: false, erklaerung: 'Im Kurs hört die Gruppe nur zu. Keine Ratschläge, keine Bewertung.' },
          ],
        },
        abschluss: 'Du musst deine Sätze niemandem zeigen. Aber du darfst sie prüfen.',
      },
    },
    {
      id: 'j1-e18', jahr: 1, nr: 18, modul: 'j1-m4', modulTitel: 'Meine Gedanken',
      titel: 'Der kritische Detektiv', joker: false,
      code: 'LUCHS', skills: ['freundliche-stimme'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv',
        titel: 'Fall: „Ich bin dumm“',
        intro: 'Tatsache oder Urteil? Sammle Beweise wie ein Detektiv.',
        daten: {
          gedanke: 'Ich bin dumm.',
          situation: 'Nora bekommt ihren Mathetest zurück: 22 von 60 Punkten.',
          beweise: [
            { text: 'Im Mathetest hat sie 22 von 60 Punkten.', spricht: 'dafuer' },
            { text: 'In Englisch hat sie eine gute Note.', spricht: 'dagegen' },
            { text: 'Für diesen Test hat sie kaum gelernt.', spricht: 'dagegen' },
            { text: 'Sie repariert Fahrräder für die halbe Klasse.', spricht: 'dagegen' },
            { text: 'Bei Textaufgaben versteht sie die Frage oft nicht.', spricht: 'dafuer' },
            { text: 'Sie kann sich jede Songzeile merken.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Mathe fällt mir gerade schwer. Wenn ich übe und frage, werde ich besser.',
        },
        abschluss: '22 von 60 ist eine Tatsache, „dumm“ ist ein Urteil. Ein fairer Satz ist realistisch – nicht super.',
      },
    },
    {
      id: 'j1-e19', jahr: 1, nr: 19, modul: 'j1-m4', modulTitel: 'Meine Gedanken',
      titel: 'Neue Gedanken ausprobieren', joker: false,
      code: 'KNOSPE', skills: ['achtsamkeit-wahl'], stempel: 'Gedanken-Detektiv', heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Die innere Stimme',
        intro: 'Eine Szene, zwei innere Stimmen. Welcher Satz führt dich?',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Referat in Geschichte. Du stehst vorn, alle schauen dich an. Deine innere Stimme meldet sich.',
              wahl: [
                { text: 'Alter Satz: „Ich blamiere mich sowieso.“', weiter: 'k2a', folge: 'Du schaust auf den Boden. Deine Stimme wird leise.', punkte: 0 },
                { text: 'Neuer Satz: „Ich bin nervös. Aber ich hab geübt.“', weiter: 'k2b', folge: 'Du stellst dich gerade hin. Der erste Satz klappt.', punkte: 2 },
              ],
            },
            k2a: {
              text: 'Hinten flüstert jemand. Die innere Stimme sagt: „Siehst du!“ Was jetzt?',
              wahl: [
                { text: 'Du wechselst den Satz: „Ein Flüstern ist kein Urteil.“', weiter: 'k2b', folge: 'Du atmest aus und machst weiter. Neuer Versuch!', punkte: 2 },
                { text: 'Du liest nur noch schnell vom Blatt ab.', weiter: null, folge: 'Geschafft, aber ohne Spaß. Nächstes Mal: neuer Satz zuerst.', punkte: 1 },
              ],
            },
            k2b: {
              text: 'Mitten im Referat fehlt dir ein Wort. Die innere Stimme sagt …',
              wahl: [
                { text: '„Kein Drama. Kurz auf die Karte schauen.“', weiter: null, folge: 'Du findest den Faden wieder. Am Ende klatscht die Klasse.', punkte: 2 },
                { text: '„Jetzt ist alles kaputt.“', weiter: 'k2a', folge: 'Der alte Satz ist zurück. Deine Stimme wird leise.', punkte: 0 },
              ],
            },
          },
        },
        abschluss: 'Ein neuer Satz verändert Haltung, Stimme und Ausgang. Test ihn eine Woche im Alltag!',
      },
    },

    // ================= Modul 5 – Kommunikation & Grenzen =================
    {
      id: 'j1-e20', jahr: 1, nr: 20, modul: 'j1-m5', modulTitel: 'Kommunikation & Grenzen',
      titel: 'Verbal und nonverbal', joker: false,
      code: 'ORCA', skills: ['achtsames-hoeren'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Mehr als Worte',
        intro: 'Worte, Stimme, Körper – und Emojis. Mythos oder Fakt?',
        daten: {
          karten: [
            { text: 'Man kann nicht nicht kommunizieren.', fakt: true, erklaerung: 'Auch Schweigen und Wegschauen sagen etwas. Der Körper redet immer mit.' },
            { text: 'Passen Worte und Körper nicht zusammen, glauben die meisten dem Körper.', fakt: true, erklaerung: '„Mir geht’s super“ mit hängenden Schultern? Das glaubt kaum jemand.' },
            { text: 'Ein Emoji versteht jede Person gleich.', fakt: false, erklaerung: 'Ein Smiley kann freundlich wirken – oder genervt. Die Deutungen gehen weit auseinander.' },
            { text: 'Im Chat fehlen Stimme und Körper.', fakt: true, erklaerung: 'Darum gibt es dort so viele Missverständnisse.' },
            { text: 'Nachfragen ist peinlich und nervt.', fakt: false, erklaerung: 'Beim Bild-Beschreiben hat Nachfragen am meisten geholfen. Im Chat auch.' },
            { text: 'Ein „ok.“ mit Punkt heißt immer: Die Person ist sauer.', fakt: false, erklaerung: 'Vielleicht. Vielleicht auch nicht. Frag lieber nach, statt zu raten.' },
            { text: 'Für schwierige Themen ist ein Gespräch oft besser als ein Chat.', fakt: true, erklaerung: 'Da hörst du die Stimme und siehst das Gesicht. So gibt es weniger Missverständnisse.' },
          ],
        },
        abschluss: 'Im Zweifel nachfragen: „Wie meinst du das?“ spart viel Stress.',
      },
    },
    {
      id: 'j1-e21', jahr: 1, nr: 21, modul: 'j1-m5', modulTitel: 'Kommunikation & Grenzen',
      titel: 'Ich-Botschaften und Zuhören', joker: false,
      code: 'EULE', skills: ['partneratmung'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen',
        titel: 'Vorwurf-Umbau',
        intro: 'Aus Vorwurf wird Ich-Botschaft. Bau die vier Teile zusammen!',
        daten: {
          aufgaben: [
            {
              situation: 'Jules unterbricht dich ständig, wenn du etwas erzählst.',
              bausteine: ['Ich fühle mich genervt,', 'wenn ich unterbrochen werde,', 'weil ich dann den Faden verliere.', 'Ich wünsche mir, dass du mich ausreden lässt.', 'Du nervst immer!', 'Halt einfach mal die Klappe.'],
              loesungen: [['Ich fühle mich genervt,', 'wenn ich unterbrochen werde,', 'weil ich dann den Faden verliere.', 'Ich wünsche mir, dass du mich ausreden lässt.']],
              tipp: 'Ich fühle mich …, wenn …, weil … Ich wünsche mir …',
            },
            {
              situation: 'Bei der Gruppenarbeit macht Mateo seit einer Woche nichts.',
              bausteine: ['Ich fühle mich gestresst,', 'wenn ich alles allein mache,', 'weil die Abgabe bald ist.', 'Ich wünsche mir, dass wir die Aufgaben teilen.', 'Du bist so faul.', 'Immer machst du nichts!'],
              loesungen: [['Ich fühle mich gestresst,', 'wenn ich alles allein mache,', 'weil die Abgabe bald ist.', 'Ich wünsche mir, dass wir die Aufgaben teilen.']],
              tipp: 'Beschreib, was passiert – ohne „immer“ und „nie“.',
            },
            {
              situation: 'Dein Kumpel hat etwas weitererzählt, das du ihm im Vertrauen gesagt hast.',
              bausteine: ['Ich bin enttäuscht,', 'wenn du Sachen weitererzählst,', 'weil ich dir vertraut habe.', 'Ich wünsche mir, dass es unter uns bleibt.', 'Du Verräter!', 'Dir sag ich nie mehr was.'],
              loesungen: [['Ich bin enttäuscht,', 'wenn du Sachen weitererzählst,', 'weil ich dir vertraut habe.', 'Ich wünsche mir, dass es unter uns bleibt.']],
              tipp: 'Das Gefühl zuerst. Dann der Wunsch – nicht der Vorwurf.',
            },
          ],
        },
        abschluss: 'Du-Botschaften starten Streit. Ich-Botschaften starten Gespräche.',
      },
    },
    {
      id: 'j1-e22', jahr: 1, nr: 22, modul: 'j1-m5', modulTitel: 'Kommunikation & Grenzen',
      titel: 'Grenzen erkennen', joker: false,
      code: 'STRAND', skills: ['sicherer-ort'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen',
        titel: 'Unsichtbare Grenzen',
        intro: 'Grenzen gibt es auf der Karte und bei Menschen. Schätz mal!',
        daten: {
          fragen: [
            { text: 'An wie viele Nachbarländer grenzt Luxemburg?', min: 0, max: 10, richtig: 3, einheit: 'Länder', erklaerung: 'Belgien, Deutschland, Frankreich. Menschen haben auch Grenzen – nur unsichtbare.' },
            { text: 'Ab welchem Abstand wird es vielen bei Fremden zu nah?', min: 0, max: 300, richtig: 120, einheit: 'cm', erklaerung: 'Richtwert: etwa 1,2 Meter. Bei dir kann es mehr oder weniger sein.' },
            { text: 'Und bei guten Freunden: Wie nah ist für viele noch okay?', min: 0, max: 300, richtig: 50, einheit: 'cm', erklaerung: 'Richtwert: etwa ein halber Meter. Nähe hängt immer von der Person ab.' },
            { text: 'Jemand sagt „Stopp“. Wie viele Sekunden darfst du noch weitergehen?', min: 0, max: 10, richtig: 0, einheit: 'Sekunden', erklaerung: 'Null. Wer „Stopp“ hört, bleibt sofort stehen.' },
          ],
        },
        abschluss: 'Die Zahlen sind nur Richtwerte. Deine Grenze bestimmst du – und sie darf sich ändern.',
      },
    },
    {
      id: 'j1-e23', jahr: 1, nr: 23, modul: 'j1-m5', modulTitel: 'Kommunikation & Grenzen',
      titel: 'Grenzen setzen: Stopp!', joker: false,
      code: 'IGEL', skills: ['fester-stand'], stempel: 'Grenzen-Wächter', heikel: false,
      mission: {
        typ: 'satz-bauen',
        titel: 'Dein Stopp-Satz',
        intro: 'Bau Stopp-Sätze, die ankommen. Kurz, klar, ohne Grinsen.',
        daten: {
          aufgaben: [
            {
              situation: 'Im Bus rückt dir jemand immer näher.',
              bausteine: ['Gerade stehen, Hand heben:', 'Stopp.', 'Das ist mir zu nah.', 'Hihi,', 'ist ja egal …'],
              loesungen: [['Gerade stehen, Hand heben:', 'Stopp.', 'Das ist mir zu nah.']],
              tipp: 'Worte und Körper sagen dasselbe. Kein Lächeln.',
            },
            {
              situation: 'Ein Mitschüler nimmt immer wieder dein Handy, um „nur kurz“ zu schauen.',
              bausteine: ['Stopp.', 'Ich will nicht,', 'dass du mein Handy nimmst.', 'Gib es mir bitte zurück.', 'Na gut, schau halt.', 'Wenn es sein muss …'],
              loesungen: [['Stopp.', 'Ich will nicht,', 'dass du mein Handy nimmst.', 'Gib es mir bitte zurück.']],
              tipp: 'Ein Stopp braucht keine lange Erklärung.',
            },
            {
              situation: 'Deine Freundin will ein Foto von dir posten. Du willst das nicht. Sie sagt: „Ach komm!“',
              bausteine: ['Nein.', 'Ich will nicht,', 'dass das Foto online geht.', 'Das bleibt so.', 'Na ja, okay …', 'Vielleicht später.'],
              loesungen: [['Nein.', 'Ich will nicht,', 'dass das Foto online geht.', 'Das bleibt so.']],
              tipp: 'Hakt jemand nach: einfach wiederholen. Auch online gibt es Grenzen.',
            },
          ],
        },
        abschluss: 'Sagen Worte und Körper dasselbe, wirkt dein Stopp. Wer eine Grenze überschreitet, ist verantwortlich – nicht du.',
      },
    },

    // ================= Modul 6 – Wenn es schwierig wird =================
    {
      id: 'j1-e24', jahr: 1, nr: 24, modul: 'j1-m6', modulTitel: 'Wenn es schwierig wird',
      titel: 'Konflikte lösen', joker: false,
      code: 'BIBER', skills: ['runter-unter-70'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge',
        titel: 'Die Konflikt-Treppe',
        intro: 'Streit um den Fußballplatz. Bring die Stufen der Konflikt-Treppe in die richtige Reihenfolge.',
        daten: {
          schritte: [
            'Runterkommen: erst unter 70, dann reden.',
            'Ich-Botschaft: Sag, wie es dir geht.',
            'Zuhören: Lass die andere Person ausreden und fass zusammen.',
            'Ideen sammeln: Welche Lösungen gibt es?',
            'Einigen: Eine Lösung wählen und ausprobieren.',
          ],
        },
        abschluss: 'Ganz unten steht das Runterkommen. Oberhalb deiner Grenze gelingt keine andere Stufe.',
      },
    },
    {
      id: 'j1-e25', jahr: 1, nr: 25, modul: 'j1-m6', modulTitel: 'Wenn es schwierig wird',
      titel: 'Gruppendruck und Nein sagen', joker: false,
      code: 'ANKER', skills: ['anker-vor-dem-nein'], stempel: null, heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Druck vor dem Laden',
        intro: 'Alle warten auf deine Antwort. Wie klingt ein Nein, das hält?',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Nach der Schule. Lara und Enzo wollen im Laden Süßigkeiten mitgehen lassen. „Komm, du machst mit!“',
              wahl: [
                { text: '„Nee, ohne mich.“', weiter: 'k2', folge: 'Kurze Stille. Enzo verdreht die Augen.', punkte: 2 },
                { text: '„Äh … vielleicht … weiß nicht.“', weiter: 'k2b', folge: 'Das klingt nach Ja. Sie drängeln weiter.', punkte: 0 },
                { text: 'Du machst mit, damit keiner lacht.', weiter: 'k3x', folge: 'Dein Bauch zieht sich zusammen. Das fühlt sich falsch an.', punkte: 0 },
              ],
            },
            k2: {
              text: 'Lara: „Boah, Langweiler. Alle machen das!“ Alle schauen dich an.',
              wahl: [
                { text: 'Füße fest, ausatmen: „Nein. Ich warte draußen.“', weiter: 'k3', folge: 'Dein Anker hält. Du gehst raus.', punkte: 2 },
                { text: '„Okay, okay, dann halt.“', weiter: 'k3x', folge: 'Gekippt. Beim zweiten Drängeln ist Nein am schwersten.', punkte: 0 },
              ],
            },
            k2b: {
              text: 'Enzo: „Also ja? Super!“ Er zieht dich schon zur Tür.',
              wahl: [
                { text: 'Stehen bleiben, lang ausatmen: „Nein. Ich mach nicht mit.“', weiter: 'k3', folge: 'Jetzt ist es klar. Er lässt deinen Arm los.', punkte: 2 },
                { text: 'Du gehst mit rein.', weiter: 'k3x', folge: 'Drinnen wird dir heiß. Du willst nur noch raus.', punkte: 0 },
              ],
            },
            k3: {
              text: 'Draußen steht auch Tiago. Er sagt leise: „Ehrlich, ich hatte auch keinen Bock.“',
              wahl: [
                { text: '„Komm, wir holen uns ein Eis. Bezahlt.“', weiter: null, folge: 'Zwei Neins sind stärker als eins. Am Ende kommen Lara und Enzo nach.', punkte: 2 },
                { text: 'Du zuckst nur mit den Schultern.', weiter: null, folge: 'Okay. Aber zusammen hättet ihr euch stärker gefühlt.', punkte: 1 },
              ],
            },
            k3x: {
              text: 'Die Verkäuferin schaut genau hin. Dein Herz rast. Was jetzt?',
              wahl: [
                { text: 'Du legst alles zurück und gehst raus.', weiter: null, folge: 'Notbremse gezogen. Ein spätes Nein ist auch ein Nein.', punkte: 1 },
                { text: 'Zurückspulen und ein klares Nein probieren.', weiter: 'k1', folge: 'Zurück an den Anfang. Neuer Versuch!', punkte: 0 },
              ],
            },
          },
        },
        abschluss: 'Ein echter Freund akzeptiert ein Nein. Und ein zweites Nein macht das erste stark.',
      },
    },
    {
      id: 'j1-e26', jahr: 1, nr: 26, modul: 'j1-m6', modulTitel: 'Wenn es schwierig wird',
      titel: 'Mobbing und Zivilcourage', joker: false,
      code: 'ADLER', skills: ['positivitaetskette'], stempel: 'Zivilcourage', heikel: false,
      mission: {
        typ: 'zonen-sortieren',
        titel: 'Spaß, Konflikt oder Mobbing?',
        intro: 'Heute heißt Grün Spaß, Gelb Konflikt und Rot Mobbing. Wohin gehört jede Situation?',
        daten: {
          items: [
            { text: 'Alle lachen über einen Witz. Auch die Person, um die es geht.', zone: 'gruen', warum: 'Spaß: Alle lachen mit, niemand wird verletzt.' },
            { text: 'Zwei Freunde streiten, wer beim Spiel gewonnen hat.', zone: 'gelb', warum: 'Konflikt: ungefähr gleich stark. Die Konflikt-Treppe hilft.' },
            { text: 'Seit Wochen lachen fünf Leute jeden Tag über Mia. Sie steht allein da.', zone: 'rot', warum: 'Mobbing: absichtlich, immer wieder, viele gegen eine. Hier braucht es Hilfe von außen.' },
            { text: 'Ihr neckt euch im Gruppenchat. Alle schicken Lach-Emojis zurück.', zone: 'gruen', warum: 'Spaß, solange alle gleich mitmachen und mitlachen.' },
            { text: 'Eine gemeine Sprachnachricht über Amir wird immer weitergeleitet.', zone: 'rot', warum: 'Mobbing online. Nicht weiterleiten, Hilfe holen.' },
            { text: 'Lina und Rui sind sauer, weil beide denselben Platz wollen.', zone: 'gelb', warum: 'Konflikt: einmalig und gleich stark. Das lässt sich lösen.' },
            { text: 'Jemand wird immer wieder absichtlich nicht mitspielen gelassen.', zone: 'rot', warum: 'Ausschließen, immer wieder, mit Absicht: Das ist auch Mobbing.' },
          ],
        },
        abschluss: 'Zuschauende sind mächtig: nicht mitlachen, Hilfe holen. Vertrauensperson, 116 111 oder BEE SECURE 8002 1234.',
      },
    },

    // ================= Modul 7 – Digitale Welt =================
    {
      id: 'j1-e27', jahr: 1, nr: 27, modul: 'j1-m7', modulTitel: 'Digitale Welt',
      titel: 'Social Media und ich', joker: false,
      code: 'INSEL', skills: ['drei-atemzuege-handy'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Das Social-Media-Quiz',
        intro: 'Stimmt das – oder stimmt das nicht? Wisch!',
        daten: {
          karten: [
            { text: 'Apps sind so gebaut, dass du möglichst lange bleibst.', fakt: true, erklaerung: 'Endloser Feed, Autoplay, Likes: Das ist Absicht, kein Zufall.' },
            { text: 'Die geschätzte Bildschirmzeit stimmt meistens ziemlich genau.', fakt: false, erklaerung: 'Viele schätzen deutlich zu wenig. Ein Blick in die Einstellungen überrascht oft.' },
            { text: 'Perfekte Fotos brauchen oft viele Versuche, Licht und Filter.', fakt: true, erklaerung: 'Ein Bild zeigt einen ausgewählten Moment. Den halb leeren Tisch daneben siehst du nicht.' },
            { text: 'Wer viele Likes hat, ist glücklicher.', fakt: false, erklaerung: 'Likes sind kurze Belohnungen. Glücklich machen sie nicht automatisch.' },
            { text: 'Der Algorithmus zeigt dir mehr von dem, was dich festhält.', fakt: true, erklaerung: 'Er lernt, wo du hängen bleibst – und liefert Nachschub.' },
            { text: 'Ein ehrlicher, positiver Kommentar kann jemandem den Tag retten.', fakt: true, erklaerung: 'Konkret und ehrlich gemeint wirkt er stark. Probier es aus!' },
            { text: 'Nach 30 Minuten Scrollen fühlen sich alle super.', fakt: false, erklaerung: 'Viele fühlen sich danach eher leer oder gereizt. Achte mal auf dein Gefühl.' },
          ],
        },
        abschluss: 'Kein Handy-Verbot – aber ein Plan, der zu dir passt. Lieber eine kleine Änderung, die hält.',
      },
    },
    {
      id: 'j1-e28', jahr: 1, nr: 28, modul: 'j1-m7', modulTitel: 'Digitale Welt',
      titel: 'Echt oder fake? KI und Fake News', joker: false,
      code: 'PERLE', skills: ['teilen-bremse'], stempel: 'Fake-Checker', heikel: false,
      mission: {
        typ: 'detektiv',
        titel: 'Fall: Die Schock-Schlagzeile',
        intro: 'Echt oder fake? Prüf die Beweise, bevor du teilst.',
        daten: {
          gedanke: 'Das ist bestimmt echt. Sofort teilen!',
          situation: 'Im Klassenchat: „AB MONTAG HANDYVERBOT IN GANZ LUXEMBURG!!!“ Alle regen sich auf.',
          beweise: [
            { text: 'Der Post hat schon 2.000 Likes.', spricht: 'dafuer' },
            { text: 'Es steht keine Quelle dabei.', spricht: 'dagegen' },
            { text: 'Auf den Seiten großer Nachrichten steht nichts davon.', spricht: 'dagegen' },
            { text: 'Das Foto dazu sieht echt aus.', spricht: 'dafuer' },
            { text: 'Die Schlagzeile ist voller Großbuchstaben und Ausrufezeichen.', spricht: 'dagegen' },
            { text: 'Das Profil, das es gepostet hat, ist erst zwei Tage alt.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Ich weiß nicht, ob das stimmt. Erst prüfen: Wer sagt das? Dann entscheide ich.',
        },
        abschluss: 'Wer wütend ist, teilt schneller: erst bremsen, dann Quelle prüfen. Bei Ärger online hilft BEE SECURE: 8002 1234.',
      },
    },

    // ================= Modul 8 – Gesund & stark =================
    {
      id: 'j1-e29', jahr: 1, nr: 29, modul: 'j1-m8', modulTitel: 'Gesund & stark',
      titel: 'Gesund und stark', joker: false,
      code: 'BAMBUS', skills: ['bodyscan-kurz'], stempel: 'Gesund & stark', heikel: false,
      mission: {
        typ: 'schaetzen',
        titel: 'Akku-Fakten',
        intro: 'Schlaf, Bewegung, Handy: Schätz mal, was Fachleute sagen!',
        daten: {
          fragen: [
            { text: 'Wie viele Stunden Schlaf brauchen Jugendliche pro Nacht?', min: 4, max: 12, richtig: 9, einheit: 'Stunden', erklaerung: 'Fachleute sagen: etwa 8 bis 10 Stunden. Viele schlafen deutlich weniger.' },
            { text: 'Wie viele Minuten Bewegung am Tag empfiehlt die WHO für Jugendliche?', min: 0, max: 180, richtig: 60, einheit: 'Minuten', erklaerung: 'Mindestens 60 Minuten. Radfahren, Tanzen und Treppen zählen auch.' },
            { text: 'Wie lange vor dem Schlafen sollte das Handy weg?', min: 0, max: 120, richtig: 60, einheit: 'Minuten', erklaerung: 'Viele Fachleute raten: 30 bis 60 Minuten. Dann schläfst du leichter ein.' },
            { text: 'Wie viel Prozent deines Körpers ist Wasser?', min: 0, max: 100, richtig: 60, einheit: '%', erklaerung: 'Etwa 60 Prozent. Genug trinken hilft gegen Kopfweh und Müdigkeit.' },
          ],
        },
        abschluss: 'Du musst nicht alles ändern. Ein kleiner Schritt, der fast sicher klappt, reicht.',
      },
    },

    // ================= Modul 9 – Abschluss =================
    {
      id: 'j1-e30', jahr: 1, nr: 30, modul: 'j1-m9', modulTitel: 'Abschluss',
      titel: 'Rückblick und Abschied', joker: false,
      code: 'MEER', skills: ['sinne-54321'], stempel: 'Skills-Legende', heikel: false,
      mission: {
        typ: 'reihenfolge',
        titel: 'Dein Jahr in Skills',
        intro: 'Ein Jahr Skills-Kurs! Bring die Stationen in die richtige Reihenfolge.',
        daten: {
          schritte: [
            'Gruppenvertrag unterschreiben und 5-4-3-2-1 lernen',
            'Das Glas der Bedürfnisse füllen',
            'Die Anspannungsskala von 0 bis 100 kennenlernen',
            'Den eigenen Skills-Koffer packen',
            'Als Detektiv Glaubenssätze prüfen',
            'Grenzen setzen: Stopp!',
          ],
        },
        abschluss: 'Angefangen hast du mit 5-4-3-2-1. Schau, wie voll dein Koffer jetzt ist!',
      },
    },

    // ================= Joker-Einheiten (flexibel einsetzbar) =================
    {
      id: 'j1-j01', jahr: 1, nr: 1, modul: 'joker', modulTitel: 'Joker',
      titel: 'Filmeinheit „Alles steht Kopf“', joker: true,
      code: 'KRABBE', skills: ['wer-am-pult'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv',
        titel: 'Fall: Rileys Dauerlächeln',
        intro: 'Stimmt Rileys Gedanke wirklich? Sammle Beweise aus dem Film.',
        daten: {
          gedanke: 'Ich muss immer fröhlich sein. Sonst enttäusche ich alle.',
          situation: 'Riley ist mit ihrer Familie umgezogen. Alles ist neu. Sie zeigt nur gute Laune.',
          beweise: [
            { text: 'Ihre Eltern haben mit dem Umzug viel Stress.', spricht: 'dafuer' },
            { text: 'Ihre Mutter bittet sie, fröhlich zu bleiben.', spricht: 'dafuer' },
            { text: 'Als Riley endlich weint, nehmen die Eltern sie in den Arm.', spricht: 'dagegen' },
            { text: 'Die Eltern sagen: Sie vermissen das alte Zuhause auch.', spricht: 'dagegen' },
            { text: 'Erst als Kummer ans Pult darf, bekommt Riley Hilfe.', spricht: 'dagegen' },
            { text: 'Die gute Laune zu spielen, kostet sie immer mehr Kraft.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Ich darf auch traurig sein. Wer mich mag, hält das aus.',
        },
        abschluss: 'Freude muss nicht immer am Steuer sitzen. Manchmal braucht es Kummer, damit andere trösten können.',
      },
    },
    {
      id: 'j1-j02', jahr: 1, nr: 2, modul: 'joker', modulTitel: 'Joker',
      titel: 'Filmeinheit „Das Streben nach Glück“', joker: true,
      code: 'LACHS', skills: ['satz-fuer-schwere-tage'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen',
        titel: 'Sätze, die tragen',
        intro: 'Welche Sätze tragen an schweren Tagen? Ehrlich, nicht kitschig.',
        daten: {
          aufgaben: [
            {
              situation: 'Chris bekommt schon wieder eine Absage. Welcher Gedanke trägt ihn weiter?',
              bausteine: ['Heute war ein Rückschlag.', 'Morgen versuche ich es wieder.', 'Ich bin ein Versager.', 'Alles ist sinnlos.'],
              loesungen: [['Heute war ein Rückschlag.', 'Morgen versuche ich es wieder.']],
              tipp: 'Ein tragender Satz nennt das Schwere – und den nächsten Schritt.',
            },
            {
              situation: 'Sara hat eine Woche voller Pech: Streit, schlechte Note, Handy kaputt.',
              bausteine: ['Das ist gerade viel.', 'Ich muss nicht alles auf einmal lösen.', 'Ich hol mir Hilfe, wenn ich sie brauche.', 'Mein Leben ist komplett ruiniert.', 'Alles wird immer super!'],
              loesungen: [
                ['Das ist gerade viel.', 'Ich muss nicht alles auf einmal lösen.'],
                ['Das ist gerade viel.', 'Ich hol mir Hilfe, wenn ich sie brauche.'],
                ['Das ist gerade viel.', 'Ich muss nicht alles auf einmal lösen.', 'Ich hol mir Hilfe, wenn ich sie brauche.'],
              ],
              tipp: '„Alles wird super“ ist kitschig. Ein guter Satz ist ehrlich.',
            },
            {
              situation: 'Vor dem Training. Dein Team hat die letzten drei Spiele verloren.',
              bausteine: ['Wir haben schon Schweres geschafft.', 'Ein Spiel nach dem anderen.', 'Wir sind einfach schlecht.', 'Ab jetzt gewinnen wir immer.'],
              loesungen: [['Wir haben schon Schweres geschafft.', 'Ein Spiel nach dem anderen.']],
              tipp: 'Realistisch schlägt super. Kleine Schritte zählen.',
            },
          ],
        },
        abschluss: 'Chris schafft es nicht nur mit Willen – auch mit Menschen und Glück. Dein Satz und deine Leute tragen dich.',
      },
    },
    {
      id: 'j1-j03', jahr: 1, nr: 3, modul: 'joker', modulTitel: 'Joker',
      titel: 'Doku „Das Dilemma mit den sozialen Medien“', joker: true,
      code: 'FALKE', skills: ['handy-stopp'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge',
        titel: 'So entsteht eine Blase',
        intro: 'Wie baut eine App deine Meinungsblase? Bring die Schritte in die richtige Reihenfolge.',
        daten: {
          schritte: [
            'Du schaust ein Video zu einem Thema bis zum Ende.',
            'Die App merkt: Das hält dich fest.',
            'Du bekommst mehr Videos zu diesem Thema.',
            'Andere Themen tauchen immer seltener auf.',
            'Fast alles in deinem Feed zeigt dieselbe Sicht.',
            'Die Blase ist fertig – und du merkst es kaum.',
          ],
        },
        abschluss: 'Der Handy-Stopp holt dir die Entscheidung zurück. Und quer lesen macht die Blase auf.',
      },
    },
    {
      id: 'j1-j04', jahr: 1, nr: 4, modul: 'joker', modulTitel: 'Joker',
      titel: 'Naturtag mit Achtsamkeits-Parcours', joker: true,
      code: 'WALD', skills: ['mein-platz'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen',
        titel: 'Natur-Check',
        intro: 'Raus in die Natur! Aber erst mal schätzen.',
        daten: {
          fragen: [
            { text: 'Nach wie vielen Minuten draußen sinkt der Stress messbar?', min: 0, max: 120, richtig: 20, einheit: 'Minuten', erklaerung: 'Studien zeigen: Schon etwa 20 Minuten in der Natur senken Stresshormone.' },
            { text: 'Wie viel Prozent von Luxemburg ist Wald?', min: 0, max: 100, richtig: 35, einheit: '%', erklaerung: 'Etwa ein Drittel. Wald ist bei uns nie weit weg.' },
            { text: 'Wie viele Minuten saßt ihr in der ersten Einheit allein draußen?', min: 0, max: 30, richtig: 10, einheit: 'Minuten', erklaerung: 'Zehn Minuten nur sitzen, schauen, hören. Heute gleich noch einmal!' },
            { text: 'Wie viele Sinnes-Stationen hat der Parcours heute?', min: 0, max: 12, richtig: 6, einheit: 'Stationen', erklaerung: 'Sechs Stationen, zu zweit und ohne zu reden.' },
          ],
        },
        abschluss: 'Natur ist ein Skill, der fast überall auf dich wartet. Such dir deinen Platz.',
      },
    },
    {
      id: 'j1-j05', jahr: 1, nr: 5, modul: 'joker', modulTitel: 'Joker',
      titel: 'Unser Stück – Theater oder Video', joker: true,
      code: 'PFAU', skills: ['rolle-abschuetteln', 'gemeinsam-atmen'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge',
        titel: 'Vorhang auf!',
        intro: 'Euer eigenes Stück! In welcher Reihenfolge entsteht es?',
        daten: {
          schritte: [
            'Ein Thema aus dem Kursjahr wählen.',
            'Die Botschaft in einem Satz festhalten.',
            'Szenen und Rollen planen – auch hinter der Kamera.',
            'Proben mit Regie-Stopps.',
            'Aufführen oder drehen.',
            'Rolle abschütteln und gemeinsam atmen.',
          ],
        },
        abschluss: 'Die Rolle bleibt auf der Bühne. Du gehst als du – mit Applaus.',
      },
    },
    {
      id: 'j1-j06', jahr: 1, nr: 6, modul: 'joker', modulTitel: 'Joker',
      titel: 'Dampf ablassen, Akku laden', joker: true,
      code: 'GEYSIR', skills: ['energie-check'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren',
        titel: 'Dampf oder Akku?',
        intro: 'Wie hoch ist die Anspannung? Sortiere – und schau, welcher Skill passt.',
        daten: {
          items: [
            { text: 'Nach der großen Pause sind alle aufgedreht. Du kannst nicht stillsitzen.', zone: 'gelb', warum: 'Viel Dampf, aber noch steuerbar. Erst bewegen, dann 4 ein, 6 aus.' },
            { text: 'Du bist so geladen, dass dich jedes Wort nervt.', zone: 'rot', warum: 'Dampf ablassen: Bewegung und Kälte. Reden kommt später.' },
            { text: 'Du bist müde, aber entspannt.', zone: 'gruen', warum: 'Wenig Anspannung, leerer Akku. Strecken und frische Luft laden auf.' },
            { text: 'Nach dem Blindfußball bist du angenehm platt.', zone: 'gruen', warum: 'Der Dampf ist raus. Jetzt tut Ruhe gut.' },
            { text: 'Du hast Hunger, es ist laut, und die Gruppe streitet.', zone: 'gelb', warum: 'Mehrere Auslöser auf einmal. Ein kurzer Energie-Check hilft.' },
            { text: 'Du bist wütend und willst gegen etwas treten.', zone: 'rot', warum: 'Kampf-Energie. Raus damit: zügig gehen, Hampelmänner, kaltes Wasser.' },
            { text: 'Ihr baut zusammen eine Kettenreaktion. Konzentriert, aber ruhig.', zone: 'gruen', warum: 'Konzentriert und entspannt: perfekt.' },
          ],
        },
        abschluss: 'Aufgedreht oder leer: Beides lässt sich ändern. Du hast beide Knöpfe.',
      },
    },
    {
      id: 'j1-j07', jahr: 1, nr: 7, modul: 'joker', modulTitel: 'Joker',
      titel: 'Neu in der Gruppe', joker: true,
      code: 'NEST', skills: ['gemeinsam-atmen'], stempel: null, heikel: false,
      mission: {
        typ: 'szene',
        titel: 'Willkommen, Yara!',
        intro: 'Eine neue Person kommt dazu. Du bist ihr Pate oder ihre Patin.',
        daten: {
          start: 'k1',
          knoten: {
            k1: {
              text: 'Heute ist Yara neu in eurer Gruppe. Sie steht allein an der Tür.',
              wahl: [
                { text: 'Du gehst hin: „Hi! Ich zeig dir heute alles. Setz dich zu mir.“', weiter: 'k2', folge: 'Yara atmet sichtbar auf.', punkte: 2 },
                { text: 'Du wartest, bis die Leitung sie vorstellt.', weiter: 'k2', folge: 'Yara steht zwei lange Minuten allein da.', punkte: 1 },
              ],
            },
            k2: {
              text: 'Check-in am Gefühlsrad. Yara weiß nicht, was sie machen soll.',
              wahl: [
                { text: '„Zeig einfach auf ein Wort. Reden ist freiwillig.“', weiter: 'k3', folge: 'Yara zeigt auf „nervös“. Zwei andere nicken.', punkte: 2 },
                { text: '„Mach einfach wie wir.“', weiter: 'k3', folge: 'Yara sagt unsicher „weiter“. Okay – aber erklären hilft mehr.', punkte: 1 },
              ],
            },
            k3: {
              text: 'Beim Kennenlernen fragt jemand: „Warum bist du eigentlich neu hier?“',
              wahl: [
                { text: '„Das muss sie nicht sagen. Suchen wir lieber Gemeinsamkeiten!“', weiter: null, folge: 'Ihr findet raus: Alle hassen Rosenkohl. Yara lacht zum ersten Mal.', punkte: 2 },
                { text: 'Du schaust gespannt zu Yara.', weiter: null, folge: 'Yara wird rot. Niemand muss Persönliches erzählen.', punkte: 0 },
              ],
            },
          },
        },
        abschluss: 'Rituale erklären, niemanden bloßstellen, gemeinsam atmen: So wird aus „neu“ ein „wir“.',
      },
    },
    {
      // Heikel: nach einem belastenden Ereignis (Streit, Vorfall, Verlust). Nur sachlich, keine Fragen nach Erlebtem.
      id: 'j1-j08', jahr: 1, nr: 8, modul: 'joker', modulTitel: 'Joker',
      titel: 'Wenn uns etwas beschäftigt', joker: true,
      code: 'LINDE', skills: ['minute-stille'], stempel: null, heikel: true,
      mission: {
        typ: 'mythos-fakt',
        titel: 'Was jetzt normal ist',
        intro: 'Wenn etwas Schweres passiert ist: Was stimmt? Mythos oder Fakt?',
        daten: {
          karten: [
            { text: 'Alle Menschen reagieren gleich auf eine schlimme Nachricht.', fakt: false, erklaerung: 'Manche weinen, manche sind wütend, manche spüren erst mal nichts. Alles ist normal.' },
            { text: 'Auch gar nichts zu fühlen, kann normal sein.', fakt: true, erklaerung: 'Manchmal braucht ein Gefühl Zeit. Das ist kein Fehler.' },
            { text: 'Was in Videos und Chats erzählt wird, stimmt meistens.', fakt: false, erklaerung: 'Gerüchte verbreiten sich schnell. Frag: Was weiß ich sicher?' },
            { text: 'Du musst über alles reden, damit es besser wird.', fakt: false, erklaerung: 'Reden hilft vielen. Aber niemand muss. Schreiben, Malen oder Zuhören zählt auch.' },
            { text: 'Bewegung und Atmen können dem Körper Halt geben.', fakt: true, erklaerung: 'Zügig gehen, Füße in den Boden, länger aus- als einatmen: Das stabilisiert.' },
            { text: 'Wenn es nicht besser wird, darfst du dir Hilfe holen.', fakt: true, erklaerung: 'Deine Vertrauensperson in der Schule oder das Kanner- a Jugendtelefon: 116 111.' },
          ],
        },
        abschluss: 'Du bist nicht allein: Vertrauensperson in der Schule oder 116 111, anonym und kostenlos. Im Notfall: 112.',
      },
    },
    {
      id: 'j1-j09', jahr: 1, nr: 9, modul: 'joker', modulTitel: 'Joker',
      titel: 'Ruhig durch die Prüfungszeit', joker: true,
      code: 'LOTUS', skills: ['unsichtbare-skills'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv',
        titel: 'Fall: „Ich fall sowieso durch“',
        intro: 'Prüfungsgedanken auf dem Prüfstand. Stimmt der Satz?',
        daten: {
          gedanke: 'Ich fall sowieso durch.',
          situation: 'In drei Wochen ist die Prüfung. Gabriel hat kaum gelernt und schläft schlecht.',
          beweise: [
            { text: 'Im letzten Test hatte er eine schlechte Note.', spricht: 'dafuer' },
            { text: 'Er hat noch drei Wochen Zeit.', spricht: 'dagegen' },
            { text: 'Er hat schon einen Lernplan rückwärts gemacht.', spricht: 'dagegen' },
            { text: 'Einen Teil vom Stoff versteht er noch nicht.', spricht: 'dafuer' },
            { text: 'Seine Lehrerin bietet Fragestunden an.', spricht: 'dagegen' },
            { text: 'Kurze Lerneinheiten mit Selbsttests wirken besser als eine lange Nacht.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Ich hab noch Zeit. Mit Plan und Selbsttests schaffe ich mehr, als ich denke.',
        },
        abschluss: 'Zwei Hebel gegen Stress: Aufgabe kleiner machen, Mittel größer machen. Plan plus Skills!',
      },
    },
  ]);

  /* ------------------------------------------------------------------
     3. KAMPF-SITUATIONEN (Module von Jahr 1)
     Familie/Zuhause: heikel: true.
     ------------------------------------------------------------------ */
  SK.addSituations([
    // Modul 0 – Ankommen
    {
      id: 'j1-neue-gruppe', modul: 'j1-m0', titel: 'Neu in der Klasse',
      text: 'Erster Tag. Alle scheinen sich schon zu kennen. Du suchst einen Platz.',
      start: 55,
      wellen: [
        { text: 'Zwei lachen, genau als du reinkommst.', plus: 8 },
        { text: 'Die Lehrerin sagt: „Stellt euch bitte kurz vor.“', plus: 10 },
        { text: 'Du bist als Nächstes dran.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich sag meinen Namen und eine Sache, die ich mag.', gut: true, folge: 'Jemand ruft: „Ich auch!“ Das Eis ist gebrochen.' },
        { text: 'Ich sag nur leise meinen Namen.', gut: true, folge: 'Reicht völlig. Du bist angekommen.' },
        { text: 'Ich sag „Keine Lust“ und schau aufs Handy.', gut: false, folge: 'Kurz Ruhe. Aber in der Pause spricht dich keiner an.' },
        { text: 'Ich mach einen Witz über die anderen.', gut: false, folge: 'Ein paar lachen. Einer ist jetzt sauer auf dich.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-blind-fuehren', modul: 'j1-m0', titel: 'Die Augenbinde',
      text: 'Blind führen draußen. Du hast die Augen zu. Dein Partner ist abgelenkt.',
      start: 50,
      wellen: [
        { text: 'Unter deinen Füßen knackt etwas.', plus: 8 },
        { text: 'Er lacht mit jemand anderem und sagt nichts mehr.', plus: 12 },
        { text: 'Ein Fahrrad klingelt. Ganz nah.', plus: 12 },
      ],
      handeln: [
        { text: '„Stopp!“ Ich bleib stehen und nehm die Binde ab.', gut: true, folge: 'Stopp-Recht genutzt. Danach klärt ihr die Regeln neu.' },
        { text: 'Ich lauf einfach weiter.', gut: false, folge: 'Du stolperst fast. Das Vertrauen ist erst mal weg.' },
        { text: 'Ich schrei ihn an.', gut: false, folge: 'Er erschrickt und ist beleidigt. Ein klares Stopp hätte gereicht.' },
      ],
      heikel: false,
    },

    // Modul 1 – Wer bin ich?
    {
      id: 'j1-staerken-vorlesen', modul: 'j1-m1', titel: 'Drei Stärken, bitte!',
      text: 'Jede Person soll drei eigene Stärken vorlesen. Dein Blatt ist leer.',
      start: 60,
      wellen: [
        { text: 'Neben dir liest Luca schon vier Stärken vor.', plus: 8 },
        { text: 'Die Lehrerin schaut zu dir.', plus: 10 },
        { text: 'Jemand flüstert: „Na, fällt dir nix ein?“', plus: 12 },
      ],
      handeln: [
        { text: 'Ich nenne eine Sache, die ich diese Woche geschafft habe.', gut: true, folge: 'Klein reicht. Die Lehrerin nickt, und es wird leichter.' },
        { text: 'Ich frage: „Kann ich später dran sein?“', gut: true, folge: 'Kein Problem. Du bekommst Zeit zum Nachdenken.' },
        { text: 'Ich sag: „Ich kann eh nichts.“', gut: false, folge: 'Stille. Der Satz tut dir selbst am meisten weh.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-leerer-tank', modul: 'j1-m1', titel: 'Leerer Tank',
      text: 'Du kommst müde und hungrig nach Hause. Dein Bruder ist laut und will deine Konsole.',
      start: 55,
      wellen: [
        { text: 'Er schnappt sich einfach den Controller.', plus: 12 },
        { text: 'Aus der Küche ruft jemand: „Erst Hausaufgaben!“', plus: 10 },
        { text: 'Dein Handy vibriert: 47 neue Nachrichten im Gruppenchat.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich sag: „Ich brauch erst was zu essen und zehn Minuten Ruhe.“', gut: true, folge: 'Der Tank wird etwas voller. Danach geht der Rest leichter.' },
        { text: 'Ich knall die Tür und schrei rum.', gut: false, folge: 'Kurz Luft gemacht. Danach gibt es noch mehr Streit.' },
        { text: 'Ich zock trotzdem bis spät in die Nacht.', gut: false, folge: 'Morgen ist der Schlaf-Tank noch leerer.' },
      ],
      heikel: true,
    },
    {
      id: 'j1-party-laut', modul: 'j1-m1', titel: 'Zu laut für mich',
      text: 'Geburtstagsparty. Die Musik ist laut, alle tanzen. Du brauchst eigentlich kurz Ruhe.',
      start: 50,
      wellen: [
        { text: 'Jemand zieht dich auf die Tanzfläche.', plus: 10 },
        { text: 'Die Musik wird noch lauter.', plus: 8 },
        { text: 'Einer ruft: „Sei doch nicht so langweilig!“', plus: 12 },
      ],
      handeln: [
        { text: 'Ich sag: „Ich geh fünf Minuten raus. Bin gleich zurück.“', gut: true, folge: 'Kurz Luft geholt. Danach macht die Party wieder Spaß.' },
        { text: 'Ich tanz weiter, obwohl ich nicht mehr kann.', gut: false, folge: 'Du hältst durch, aber der Abend fühlt sich endlos an.' },
        { text: 'Ich geh ohne Tschüss nach Hause.', gut: false, folge: 'Ruhe gefunden. Aber deine Freundin macht sich Sorgen.' },
      ],
      heikel: false,
    },

    // Modul 2 – Gefühle verstehen
    {
      id: 'j1-foul', modul: 'j1-m2', titel: 'Foul ohne Pfiff',
      text: 'Fußballtraining. Jemand foult dich hart. Der Trainer pfeift nicht.',
      start: 60,
      wellen: [
        { text: 'Der andere grinst dich an.', plus: 10 },
        { text: 'Dein Kopf wird heiß, die Fäuste gehen zu.', plus: 12 },
        { text: 'Er ruft: „Heul doch!“', plus: 12 },
      ],
      handeln: [
        { text: 'Ich sag dem Trainer ruhig: „Das war ein Foul.“', gut: true, folge: 'Er schaut beim nächsten Mal genauer hin.' },
        { text: 'Ich geh kurz an die Seitenlinie und trink was.', gut: true, folge: 'Die Wut sitzt nicht mehr am Pult. Du spielst wieder mit Kopf.' },
        { text: 'Ich foul ihn beim nächsten Mal zurück.', gut: false, folge: 'Jetzt pfeift der Trainer – gegen dich.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-nicht-eingeladen', modul: 'j1-m2', titel: 'Ohne mich',
      text: 'Du siehst in einer Story: Deine Freunde feiern zusammen. Ohne dich.',
      start: 55,
      wellen: [
        { text: 'Noch ein Foto. Alle lachen.', plus: 10 },
        { text: 'Keiner hat dir geschrieben.', plus: 10 },
        { text: 'Im Kopf: „Die mögen mich nicht.“', plus: 12 },
      ],
      handeln: [
        { text: 'Ich frag morgen nach: „Hey, ich hab die Story gesehen. War das spontan?“', gut: true, folge: 'Es war spontan. Beim nächsten Mal bist du dabei.' },
        { text: 'Ich schreib einen sauren Kommentar unter die Story.', gut: false, folge: 'Alle sehen ihn. Jetzt wird es richtig unangenehm.' },
        { text: 'Ich blockiere alle.', gut: false, folge: 'Kurz fühlt es sich stark an. Dann bist du wirklich allein.' },
      ],
      heikel: false,
    },

    // Modul 3 – Gefühle regulieren (Skills)
    {
      id: 'j1-referat', modul: 'j1-m3', titel: 'Referat in 5 Minuten',
      text: 'Gleich hältst du dein Referat. Deine Hände sind kalt und feucht.',
      start: 65,
      wellen: [
        { text: 'Der USB-Stick wird nicht erkannt.', plus: 12 },
        { text: 'Jemand ruft: „Wann geht’s endlich los?“', plus: 8 },
        { text: 'Dein Kopf ist plötzlich leer.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich starte mit meiner ersten Karteikarte. Schritt für Schritt.', gut: true, folge: 'Der Anfang klappt. Der Rest kommt fast von allein.' },
        { text: 'Ich frage: „Kann ich die Folien vom Handy zeigen?“', gut: true, folge: 'Die Lehrerin hilft. Problem gelöst.' },
        { text: 'Ich sag, mir ist schlecht, und geh raus.', gut: false, folge: 'Erst Erleichterung. Aber das Referat wartet nächste Woche immer noch.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-verloren-online', modul: 'j1-m3', titel: 'Schon wieder verloren',
      text: 'Online-Match. Dein Team verliert die dritte Runde in Folge.',
      start: 60,
      wellen: [
        { text: 'Im Chat schreibt jemand: „Noob.“', plus: 10 },
        { text: 'Dein Controller hängt kurz.', plus: 10 },
        { text: 'Letzte Runde. Du verlierst in der letzten Sekunde.', plus: 14 },
      ],
      handeln: [
        { text: 'Ich mach Pause und hol mir ein Glas Wasser.', gut: true, folge: 'Nach zehn Minuten spielst du ruhiger – und besser.' },
        { text: 'Ich schreib zurück, was ich von ihm halte.', gut: false, folge: 'Der Chat eskaliert. Du wirst gemeldet.' },
        { text: 'Ich werf den Controller aufs Sofa und spiel sofort weiter.', gut: false, folge: 'Die nächste Runde läuft noch schlechter.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-angerempelt', modul: 'j1-m3', titel: 'Angerempelt',
      text: 'Pause. Jemand rempelt dich an. Dein Getränk fliegt auf den Boden.',
      start: 65,
      wellen: [
        { text: 'Ein paar Leute lachen laut.', plus: 10 },
        { text: 'Er sagt: „Pass halt auf.“', plus: 12 },
        { text: 'Dein Herz hämmert. Du willst schubsen.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich geh weg und sag es später der Aufsicht.', gut: true, folge: 'Die Aufsicht klärt das. Du bleibst aus dem Ärger raus.' },
        { text: 'Ich sag ruhig: „Du schuldest mir ein Getränk.“', gut: true, folge: 'Er murmelt „Sorry“. Nicht perfekt, aber erledigt.' },
        { text: 'Ich schubs zurück.', gut: false, folge: 'Jetzt habt ihr beide Ärger. Und alle haben dich gesehen.' },
      ],
      heikel: false,
    },

    // Modul 4 – Meine Gedanken
    {
      id: 'j1-test-zurueck', modul: 'j1-m4', titel: '22 von 60',
      text: 'Du bekommst deinen Mathetest zurück: 22 von 60 Punkten.',
      start: 60,
      wellen: [
        { text: 'Deine Nachbarin hat 55 Punkte.', plus: 10 },
        { text: 'Im Kopf: „Ich bin einfach dumm.“', plus: 12 },
        { text: 'Die Lehrerin sagt: „Bitte bis Montag unterschreiben lassen.“', plus: 10 },
      ],
      handeln: [
        { text: 'Ich frage die Lehrerin, welche Aufgaben ich üben soll.', gut: true, folge: 'Sie zeigt dir zwei Themen. Jetzt hast du einen Plan.' },
        { text: 'Ich sag mir: „Mathe fällt mir schwer. Mit Üben wird es besser.“', gut: true, folge: 'Der Satz trägt. Du steckst den Test ein und atmest aus.' },
        { text: 'Ich zerknüll den Test und werf ihn weg.', gut: false, folge: 'Kurz weg. Aber die Unterschrift fehlt trotzdem.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-keine-antwort', modul: 'j1-m4', titel: 'Gelesen. Keine Antwort.',
      text: 'Du hast deinem Kumpel geschrieben. Zwei blaue Haken. Seit drei Stunden nichts.',
      start: 50,
      wellen: [
        { text: 'Er ist online. Du siehst es.', plus: 10 },
        { text: 'Im Kopf: „Er hat keinen Bock mehr auf mich.“', plus: 12 },
        { text: 'In seiner Story ist er mit anderen unterwegs.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich prüfe fair: Vielleicht ist er einfach beschäftigt.', gut: true, folge: 'Abends schreibt er: „Sorry, war Training!“' },
        { text: 'Ich schick fünf Nachrichten hinterher.', gut: false, folge: 'Er fühlt sich gedrängt und antwortet noch später.' },
        { text: 'Ich schreib: „Dann halt nicht.“', gut: false, folge: 'Am nächsten Tag ist es komisch zwischen euch.' },
      ],
      heikel: false,
    },

    // Modul 5 – Kommunikation & Grenzen
    {
      id: 'j1-zu-nah', modul: 'j1-m5', titel: 'Zu nah',
      text: 'Voller Bus. Ein Typ aus der Parallelklasse drückt sich immer näher an dich.',
      start: 60,
      wellen: [
        { text: 'Du rückst weg. Er rückt nach.', plus: 12 },
        { text: 'Er grinst: „Was denn? Ist halt voll.“', plus: 10 },
        { text: 'Deine Haltestelle kommt erst in zehn Minuten.', plus: 8 },
      ],
      handeln: [
        { text: 'Gerade hinstellen, klar sagen: „Stopp. Das ist mir zu nah.“', gut: true, folge: 'Er tritt zurück. Worte und Körper haben dasselbe gesagt.' },
        { text: 'Ich geh nach vorn zum Busfahrer.', gut: true, folge: 'Dort ist Platz – und ein Erwachsener in der Nähe.' },
        { text: 'Ich sag nichts und halt es aus.', gut: false, folge: 'Du kommst an, aber mit einem miesen Gefühl. Du darfst Stopp sagen.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-foto-story', modul: 'j1-m5', titel: 'Foto ohne Fragen',
      text: 'Eine Mitschülerin hat ein peinliches Foto von dir in ihre Story gestellt.',
      start: 60,
      wellen: [
        { text: 'Schon 30 Leute haben es gesehen.', plus: 10 },
        { text: 'Jemand kommentiert mit Lach-Emojis.', plus: 10 },
        { text: 'Im Flur zeigen zwei auf ihr Handy und lachen.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich schreib ihr: „Bitte nimm das Foto raus. Ich will das nicht.“', gut: true, folge: 'Sie löscht es: „Sorry, war nicht böse gemeint.“' },
        { text: 'Ich melde das Foto und hol mir Hilfe, falls es bleibt.', gut: true, folge: 'Gut so. Bei Ärger online hilft BEE SECURE: 8002 1234.' },
        { text: 'Ich poste ein noch peinlicheres Foto von ihr.', gut: false, folge: 'Jetzt seid ihr beide bloßgestellt. Der Streit wird größer.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-unterbrochen', modul: 'j1-m5', titel: 'Lass mich ausreden!',
      text: 'Gruppenarbeit. Jedes Mal, wenn du etwas sagst, redet Mateo dazwischen.',
      start: 50,
      wellen: [
        { text: 'Er stellt deine Idee als seine vor.', plus: 12 },
        { text: 'Die anderen nicken ihm zu.', plus: 10 },
        { text: 'Du fängst neu an – und er unterbricht wieder.', plus: 10 },
      ],
      handeln: [
        { text: '„Ich bin genervt, wenn ich unterbrochen werde. Lass mich bitte ausreden.“', gut: true, folge: 'Kurze Pause. Dann hört er zu. Die Ich-Botschaft wirkt.' },
        { text: '„Du nervst immer!“', gut: false, folge: 'Er fühlt sich angegriffen. Jetzt streitet ihr, statt zu arbeiten.' },
        { text: 'Ich sag gar nichts mehr.', gut: false, folge: 'Ruhe. Aber deine Ideen gehen verloren.' },
      ],
      heikel: false,
    },

    // Modul 6 – Wenn es schwierig wird
    {
      id: 'j1-platz-streit', modul: 'j1-m6', titel: 'Streit um den Platz',
      text: 'Pause. Ihr wollt Fußball spielen. Die Klasse 7b ist schon auf dem Platz.',
      start: 55,
      wellen: [
        { text: 'Einer ruft: „Haut ab, der gehört uns!“', plus: 12 },
        { text: 'Dein Kumpel geht wütend auf ihn zu.', plus: 10 },
        { text: 'Alle reden gleichzeitig. Keiner versteht mehr was.', plus: 12 },
      ],
      handeln: [
        { text: '„Stopp. Einer redet. Was, wenn wir den Platz teilen?“', gut: true, folge: 'Erst Augenrollen. Dann spielt ihr gemischt. Konflikt-Treppe geschafft.' },
        { text: 'Ich hol die Aufsicht dazu.', gut: true, folge: 'Sie macht einen Plan: heute ihr, morgen die anderen.' },
        { text: 'Wir nehmen uns einfach den Ball.', gut: false, folge: 'Es gibt Geschubse. Am Ende darf keiner spielen.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-mutprobe', modul: 'j1-m6', titel: 'Die Mutprobe',
      text: 'Nach der Schule. Deine Clique will, dass du einen Klingelstreich machst. Du willst nicht.',
      start: 55,
      wellen: [
        { text: '„Komm schon, nur einmal!“', plus: 10 },
        { text: 'Alle holen schon die Handys zum Filmen raus.', plus: 12 },
        { text: '„Sonst bist du raus aus der Gruppe.“', plus: 14 },
      ],
      handeln: [
        { text: 'Füße fest, ausatmen: „Nein, ohne mich.“', gut: true, folge: 'Ein anderer sagt: „Ich auch nicht.“ Zwei Neins sind stark.' },
        { text: '„Lasst uns lieber zum Skatepark gehen.“', gut: true, folge: 'Ein Gegenvorschlag nimmt Druck raus. Die Hälfte kommt mit.' },
        { text: 'Ich mach es, damit sie aufhören.', gut: false, folge: 'Das Video landet im Gruppenchat. Du fühlst dich mies.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-sprachnachricht', modul: 'j1-m6', titel: 'Die Sprachnachricht',
      text: 'Im Klassenchat taucht eine gemeine Sprachnachricht über Samira auf.',
      start: 55,
      wellen: [
        { text: 'Alle schicken Lach-Emojis.', plus: 10 },
        { text: 'Jemand schreibt: „Leitet das weiter!“', plus: 10 },
        { text: 'Samira ist heute nicht in der Schule.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich leite nicht weiter und sag es einer Vertrauensperson.', gut: true, folge: 'Die Nachricht wird gelöscht. Samira bekommt Unterstützung.' },
        { text: 'Ich schreib Samira privat: „Das ist nicht okay. Ich bin auf deiner Seite.“', gut: true, folge: 'Sie schickt ein Herz zurück. Sie fühlt sich weniger allein.' },
        { text: 'Ich lach mit, damit ich nicht auffalle.', gut: false, folge: 'Die Nachricht geht weiter. Und du warst ein Teil davon.' },
        { text: 'Ich sag nichts und schau weg.', gut: false, folge: 'Nichts ändert sich. Zuschauende hätten es stoppen können.' },
      ],
      heikel: false,
    },

    // Modul 7 – Digitale Welt
    {
      id: 'j1-nur-noch-ein-video', modul: 'j1-m7', titel: 'Nur noch ein Video',
      text: 'Es ist 23 Uhr. Morgen schreibst du einen Test. Du scrollst seit einer Stunde.',
      start: 50,
      wellen: [
        { text: 'Autoplay startet das nächste Video.', plus: 8 },
        { text: 'Eine Nachricht ploppt auf: „Deine Serie läuft ab!“', plus: 10 },
        { text: 'Plötzlich ist es Mitternacht.', plus: 12 },
      ],
      handeln: [
        { text: 'Handy-Stopp: Daumen drauf, ausatmen, Handy raus aus dem Zimmer.', gut: true, folge: 'Nach einer Viertelstunde schläfst du. Der Test läuft besser.' },
        { text: 'Ich schalte die Benachrichtigungen für die App aus.', gut: true, folge: 'Weniger Rufen vom Handy. Ab jetzt wird es leichter.' },
        { text: 'Ich stell den Wecker früher und schau weiter.', gut: false, folge: 'Morgens bist du total müde. Der Test wird zäh.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-schock-video', modul: 'j1-m7', titel: 'Das Schock-Video',
      text: 'Im Gruppenchat: ein Video von einem Lehrer. Er sagt angeblich schlimme Sachen.',
      start: 60,
      wellen: [
        { text: 'Alle schreiben: „Krass!!! Teilen!“', plus: 10 },
        { text: 'Das Video hat schon 500 Aufrufe.', plus: 10 },
        { text: 'Dein Finger ist schon auf „Weiterleiten“.', plus: 12 },
      ],
      handeln: [
        { text: 'Teilen-Bremse: Hand weg, drei Atemzüge. Dann: Wer sagt das?', gut: true, folge: 'Beim genauen Hinsehen klingt die Stimme komisch. Es ist ein Deepfake.' },
        { text: 'Ich schreib: „Das ist vermutlich fake. Bitte nicht teilen.“', gut: true, folge: 'Zwei andere stimmen zu. Das Video stoppt.' },
        { text: 'Ich teile es. Alle anderen tun es ja auch.', gut: false, folge: 'Später kommt raus: fake. Fälschungen teilen kann strafbar sein.' },
      ],
      heikel: false,
    },

    // Modul 8 – Gesund & stark
    {
      id: 'j1-nicht-einschlafen', modul: 'j1-m8', titel: 'Kann nicht einschlafen',
      text: 'Mitternacht. Morgen ist das Turnier. Deine Gedanken drehen sich im Kreis.',
      start: 55,
      wellen: [
        { text: 'Du schaust auf die Uhr: 0:30.', plus: 10 },
        { text: 'Im Kopf: „Wenn ich jetzt nicht schlafe, verlieren wir.“', plus: 12 },
        { text: 'Das Handy leuchtet neben dir.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich mach einen Bodyscan von den Füßen bis zum Kopf.', gut: true, folge: 'Irgendwo bei den Schultern schläfst du ein.' },
        { text: 'Ich schreib den Gedanken auf einen Zettel und leg ihn weg.', gut: true, folge: 'Der Kopf wird leiser. Morgen ist auch noch Zeit.' },
        { text: 'Ich zock noch eine Runde zur Ablenkung.', gut: false, folge: 'Das Licht macht dich wacher. Um zwei bist du immer noch wach.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-voller-rucksack', modul: 'j1-m8', titel: 'Der volle Rucksack',
      text: 'Test morgen, Training heute. Und zu Hause gab es beim Frühstück Streit.',
      start: 65,
      wellen: [
        { text: 'Der Trainer sagt: „Heute eine Extra-Runde.“', plus: 8 },
        { text: 'Eine Nachricht von zu Hause: „Wir reden heute Abend.“', plus: 12 },
        { text: 'Du merkst: Du hast heute noch nichts gegessen.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich ess erst was und plane: Was ist heute wirklich wichtig?', gut: true, folge: 'Ein Stein weniger im Rucksack. Ein Schritt nach dem anderen.' },
        { text: 'Ich rede mit einer Vertrauensperson in der Schule.', gut: true, folge: 'Reden macht den Rucksack leichter. Du bist nicht allein damit.' },
        { text: 'Ich lass das Essen weg und lern bis spät in die Nacht.', gut: false, folge: 'Morgen ist der Akku leer. Der Test wird schwerer statt leichter.' },
      ],
      heikel: true,
    },

    // Modul 9 – Abschluss
    {
      id: 'j1-letzter-kurstag', modul: 'j1-m9', titel: 'Letzter Kurstag',
      text: 'Letzte Stunde Skills-Kurs. Du sollst vor allen sagen, was du mitnimmst.',
      start: 45,
      wellen: [
        { text: 'Alle schauen dich an.', plus: 10 },
        { text: 'Du merkst einen Kloß im Hals.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich sag einen Satz: „Ich nehme 5-4-3-2-1 mit.“', gut: true, folge: 'Die anderen nicken. Ein Satz reicht völlig.' },
        { text: 'Ich sag: „Ich bin stolz und ein bisschen traurig.“', gut: true, folge: 'Gemischte Gefühle gehören dazu. Die Leitung lächelt.' },
        { text: 'Ich mach einen Witz, damit keiner merkt, dass ich gerührt bin.', gut: false, folge: 'Alle lachen. Aber das, was du sagen wolltest, bleibt ungesagt.' },
      ],
      heikel: false,
    },
    {
      id: 'j1-vorstellungsgespraech', modul: 'j1-m9', titel: 'Das Praktikums-Gespräch',
      text: 'Dein erstes Gespräch für ein Praktikum. Du sitzt im Wartebereich.',
      start: 60,
      wellen: [
        { text: 'Die Person vor dir kommt raus und sieht fertig aus.', plus: 10 },
        { text: 'Dein Name wird aufgerufen.', plus: 12 },
        { text: 'Die erste Frage: „Was sind deine Stärken?“', plus: 10 },
      ],
      handeln: [
        { text: 'Füße fest, ausatmen – dann zwei Stärken aus meinem Baum nennen.', gut: true, folge: '„Ich bin zuverlässig und helfe gern.“ Die Chefin schreibt mit.' },
        { text: 'Ich sag: „Weiß nicht.“', gut: false, folge: 'Kurze Stille. Du hättest viel mehr zu sagen gehabt.' },
        { text: 'Ich übertreibe: „Ich kann einfach alles.“', gut: false, folge: 'Die Chefin zieht die Augenbraue hoch. Realistisch wirkt besser.' },
      ],
      heikel: false,
    },
  ]);
})();
