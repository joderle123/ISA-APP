/* SKILL DECK – Inhalte für Kursjahr 3 (39 Einheiten: 35 reguläre + 4 Joker).
   Quelle: Skills-Kurs Jahr 3, jeweils der Skill-Schritt der Einheit (Text, Liste, Sätze).
   Nur Daten, keine Logik. Wird nach src/core/registry.js geladen.
   Skills anderer Jahre werden nur per ID genannt: sinne-54321, achtsames-hoeren, spaziergang-ohne-worte,
   minute-stille, gedankenschiffchen, freundliche-stimme, fester-stand, unsichtbare-skills (Jahr 1);
   selbstmitgefuehl-pause, seufzer-atmung, erster-satz, erst-atmen-dann-handeln, welle-reiten,
   anspannen-loslassen (Jahr 2).
   Freischalt-Codes Jahr 3: Thema WELTRAUM, REISE & ZUKUNFT.
   Heikle Einheiten (heikel: true): e08 Rausch, e17 Trauer, e20 Sicherheitsplan, e27–e30 Liebe und Sexualität. */
(function () {
  'use strict';
  const SK = window.SK;

  /* ───────────────────────── SKILL-KARTEN (Besitzer: Jahr 3) ───────────────────────── */
  SK.addSkills([
    // Modul 0 – Ankommen
    {
      id: 'einer-aus-dem-koffer', name: 'Einer aus dem Koffer', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'atmen', params: { ein: 4, halten: 4, aus: 4, halten2: 4, runden: 3 },
      schritte: ['Hol deinen Lieblingsskill aus dem Koffer – und mach ihn.', 'Kein Favorit? Kastenatmung: 4 ein, 4 halten, 4 aus, 4 halten.', 'Danach: Wann hilft dir dieser Skill?'],
      wann: 'Wenn du neu startest und schnell Boden unter den Füßen brauchst.',
      flavor: 'Drei Jahre, ein Koffer. Du weißt längst, was hilft.',
      einheit: 'j3-e01', seltenheit: 'selten',
    },
    {
      id: 'hand-aufs-herz', name: 'Hand aufs Herz', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker', params: { text: 'Hand auf Brust oder Oberarm. Spür die Wärme. Drei ruhige Atemzüge. Innerlich: Ich bin unterwegs.' },
      schritte: ['Hand auf Brust oder Oberarm – wo es sich gut anfühlt.', 'Spür die Wärme. Drei ruhige Atemzüge.', 'Sag innerlich: Ich muss nicht überall bei 5 sein. Ich bin unterwegs.'],
      wann: 'Wenn du hart mit dir bist – nach einer Note, einem Streit, einem Vergleich.',
      flavor: 'Kein Level-Check. Nur eine warme Hand und ein ehrlicher Satz.',
      einheit: 'j3-e02', seltenheit: 'selten',
    },

    // Modul 1 – Werte und Identität
    {
      id: 'werte-anker', name: 'Werte-Anker', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Ich denke an einen Moment, in dem ich nach meinem Wert gehandelt habe.', 'Wo spüre ich ihn im Körper?', 'Was ist mir hier wichtig?'] },
      schritte: ['Füße auf den Boden. Einmal lang ausatmen.', 'Denk an einen Moment, in dem du nach deinem Wert gehandelt hast.', 'Drei ruhige Atemzüge. Frag dich: Was ist mir hier wichtig?'],
      wann: 'In einer Zwickmühle, wenn zwei Dinge in verschiedene Richtungen ziehen.',
      flavor: 'Wenn alle an dir ziehen, hält dich, was dir wichtig ist.',
      einheit: 'j3-e03', seltenheit: 'basis',
    },
    {
      id: 'innere-mentorin', name: 'Innere Mentorin', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Was würde mein Mensch jetzt zu mir sagen?', 'Du musst nicht alles auf einmal schaffen.', 'Ich trau dir das zu.'] },
      schritte: ['Denk an eine Situation, die dir Bauchweh macht.', 'Stell dir einen Menschen aus deinem inneren Ring neben dich.', 'Was sagt er – und in welchem Ton? Nimm den Satz mit.'],
      wann: 'Wenn du festhängst und einen Blick von außen brauchst.',
      flavor: 'Deine Leute sind immer dabei. Du musst nur kurz hinhören.',
      einheit: 'j3-e05', seltenheit: 'episch',
    },

    // Modul 2 – Entscheidungen und Verantwortung
    {
      id: 'freundin-frage', name: 'Freundin-Frage', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Was würde ich meiner besten Freundin raten?', 'Was würde ich meinem besten Freund raten?', 'Genau das rate ich jetzt mir.'] },
      schritte: ['Hand auf den Bauch. Drei lange Atemzüge.', 'Stell dir A und B vor: Wird es eng oder weit?', 'Frag: Was würde ich meiner besten Freundin raten?'],
      wann: 'Vor einer Entscheidung, wenn du dich im Kreis drehst.',
      flavor: 'Für andere sind wir klüger. Leih dir den Trick.',
      einheit: 'j3-e06', seltenheit: 'basis',
    },
    {
      id: 'stopp-ausstiegssatz', name: 'Stopp und Ausstiegssatz', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'halten', params: { sekunden: 8, text: 'Stopp! Einfrieren. Einen Schritt zurück und lang ausatmen.' },
      schritte: ['Stopp: einfrieren. Nichts sagen, nichts tun.', 'Ein echter Schritt zurück. Lang ausatmen.', 'Hinschauen – dann dein Ausstiegssatz: „Ohne mich.“'],
      wann: 'Wenn alle anfeuern und du gleich etwas Riskantes machen sollst.',
      flavor: 'Ein Meter Abstand schenkt dir zwei Sekunden Bremse.',
      einheit: 'j3-e07', seltenheit: 'selten',
    },
    {
      id: 'satz-nach-fehler', name: 'Satz nach dem Fehler', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'satz', params: { saetze: ['Das war ein Fehler, und er ärgert mich.', 'So etwas passiert allen Menschen.', 'Was hilft mir jetzt – und was ist mein nächster Schritt?'] },
      schritte: ['Hand auf Brust oder Bauch. Zweimal lang ausatmen.', 'Sag innerlich die drei Sätze nach dem Fehler.', 'Dann: Was ist mein nächster Schritt?'],
      wann: 'Wenn dich ein Fehler noch ärgert und dein Kopf nachtritt.',
      flavor: 'Nimmt den Fehler ernst. Tritt aber nicht nach.',
      einheit: 'j3-e09', seltenheit: 'selten',
    },

    // Modul 3 – Zukunft und Beruf
    {
      id: 'plan-gegen-nervositaet', name: 'Plan gegen Nervosität', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'atmen', params: { ein: 3, halten: 1, aus: 6, runden: 5 },
      schritte: ['Durch die Nase ein – oben ein Stück nachatmen.', 'Lang durch den Mund aus. Länger als ein. Fünfmal.', 'Dein Plan: Wenn ich vor der Tür stehe, dann …'],
      wann: 'Vor einem Vorstellungsgespräch, einer Prüfung oder einem wichtigen Anruf.',
      flavor: 'Nervös sein ist normal. Mit Plan bist du schneller wieder da.',
      einheit: 'j3-e12', seltenheit: 'basis',
    },
    {
      id: 'woop', name: 'WOOP im Kopf', typ: 'menschen', zonen: ['gruen'], kraft: 3,
      interaktion: 'satz', params: { saetze: ['W: Was wünsche ich mir für morgen?', 'O: Was wäre das Beste daran?', 'O: Was in mir könnte mich bremsen?', 'P: Wenn das passiert, dann …'] },
      schritte: ['Wunsch und bestes Ergebnis: Was willst du – und was wäre das Beste?', 'Hindernis: Was in dir könnte dich bremsen?', 'Plan: Wenn das passiert, dann …'],
      wann: 'Wenn du ruhig bist und aus einem Wunsch einen Plan machen willst.',
      flavor: 'Träumen ist schön. Mit Plan kommst du auch an.',
      einheit: 'j3-e13', seltenheit: 'episch',
    },

    // Modul 4 – Selbstständig werden
    {
      id: 'kauf-stopp', name: 'Kauf-Stopp', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'halten', params: { sekunden: 10, text: 'Finger weg vom Kaufen-Knopf. Halten und lang ausatmen. Morgen entscheiden.' },
      schritte: ['Handy weg. Warenkorb stehen lassen.', 'Frag: Brauche ich das – oder will ich das? Wie geht es mir gerade?', 'Eine Nacht drüber schlafen. Will ich es morgen noch?'],
      wann: 'Wenn „Nur heute!“ blinkt und dein Daumen schon kaufen will.',
      flavor: 'Willst du es morgen noch, ist es eine Entscheidung. Kein Spontankauf.',
      einheit: 'j3-e14', seltenheit: 'basis',
    },
    {
      id: 'erste-drei-bissen', name: 'Die ersten drei Bissen', typ: 'sinne', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'genuss', params: { text: 'Die ersten drei Bissen: anschauen, riechen, langsam kauen. Was schmeckst du heraus?' },
      schritte: ['Anschauen und riechen – bevor du loslegst.', 'Langsam kauen. Ohne Handy.', 'Was schmeckst du heraus? Knoblauch, Paprika, die Soße?'],
      wann: 'Wenn das Essen dampft und du sonst alles runterschlingst.',
      flavor: 'Selbst gekocht schmeckt besser. Die ersten drei Bissen beweisen es.',
      einheit: 'j3-e16', seltenheit: 'selten',
    },

    // Modul 5 – Schwere Gefühle
    {
      id: 'eine-sache-ganz', name: 'Eine Sache ganz', typ: 'sinne', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'genuss', params: { text: 'Wähl eine Sache: ein Lied, eine Mandarine, zeichnen. Nur das. Ohne Handy.' },
      schritte: ['Wähl eine einzige Sache: ein Lied, eine Mandarine, zeichnen.', 'Mach nur das – mit ganzer Aufmerksamkeit, ohne Handy.', 'Gedanken wandern? Hol sie freundlich zurück.'],
      wann: 'Wenn du allein bist und die Leere sofort mit dem Handy füllen willst.',
      flavor: 'Allein, aber nicht einsam. Das ist ein Skill.',
      einheit: 'j3-e19', seltenheit: 'selten',
    },

    // Modul 6 – Resilienz und Hilfe
    {
      id: 'kraft-moment', name: 'Mein Kraft-Moment', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker', params: { text: 'Denk an deinen Kraft-Moment. Drück Daumen und Zeigefinger zusammen. Spür das Gefühl noch einmal.' },
      schritte: ['Denk an einen Moment, in dem du dich stark gefühlt hast.', 'Wo warst du? Wie waren Haltung, Atem, Schultern?', 'Drück Daumen und Zeigefinger zusammen. Spür es noch einmal.'],
      wann: 'In ruhigen Momenten üben – damit er in schweren wirkt.',
      flavor: 'Ein Tor, eine gute Antwort, ein geschaffter Tag. Alles zählt.',
      einheit: 'j3-e21', seltenheit: 'selten',
    },
    {
      id: 'geniessen-zeitlupe', name: 'Genießen in Zeitlupe', typ: 'sinne', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'genuss', params: { text: 'Ein Stück Mandarine oder Schokolade. Anschauen. Riechen. Auf die Zunge legen. Ganz langsam kauen.' },
      schritte: ['Schau es an, als hättest du so etwas noch nie gesehen.', 'Riech daran. Leg es in den Mund, ohne zu kauen.', 'Kau ganz langsam. Wann ist der Geschmack am stärksten?'],
      wann: 'Bei jedem guten Moment – Lied, Dusche, Nachricht. Mach ihn länger.',
      flavor: 'Die meisten brauchen zwei Sekunden. Du nimmst dir eine Minute.',
      einheit: 'j3-e23', seltenheit: 'episch',
    },

    // Modul 7 – Meinung und Mitbestimmung
    {
      id: 'gedanke-oder-tatsache', name: 'Gedanke oder Tatsache?', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'gedanken-boot', params: { gedanken: ['Ich habe den Gedanken, dass ich das nicht kann.', 'Ich habe den Gedanken, dass die mich komisch finden.', 'Ich habe den Gedanken, dass alles schiefgeht.'] },
      schritte: ['Bemerk einen Gedanken, der gerade da ist.', 'Sag innerlich: Ich habe den Gedanken, dass …', 'Setz ihn aufs Schiffchen. Neue Zahl von 0 bis 100?'],
      wann: 'Wenn dein Kopf dir eine Meinung über dich als Tatsache verkauft.',
      flavor: 'Nicht jeder Gedanke ist eine Tatsache. Auch nicht die über dich.',
      einheit: 'j3-e24', seltenheit: 'selten',
    },
    {
      id: 'aus-der-rolle', name: 'Aus der Rolle steigen', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'bewegen', params: { text: 'Steh auf. Schüttel Arme und Beine aus. Sag: Ich bin nicht mehr Pro. Ich bin wieder ich.' },
      schritte: ['Aufstehen. Arme und Beine ausschütteln.', 'Sag: Ich bin nicht mehr Pro, ich bin wieder … – dein Name.', 'Eine Minute Kastenatmung. Neue Zahl?'],
      wann: 'Nach einer Debatte, einem Match oder einem Streit, der noch nachglüht.',
      flavor: 'Du hast gut gestritten. Die Rolle bleibt hier.',
      einheit: 'j3-e25', seltenheit: 'basis',
    },

    // Modul 8 – Liebe, Sexualität und Einvernehmlichkeit
    {
      id: 'weiser-geist', name: 'Weiser Geist', typ: 'kopf', zonen: ['gruen', 'gelb'], kraft: 3,
      interaktion: 'anker', params: { text: 'Du bist ein flacher Kieselstein. Du sinkst langsam durch klares Wasser. Unten fragst du: Was tut mir gut?' },
      schritte: ['Ruhig atmen. Augen offen oder zu.', 'Stell dir vor: Du sinkst wie ein Kieselstein auf den Grund.', 'Frag still: Was weiß ich tief drinnen – was tut mir gut?'],
      wann: 'Wenn Gefühle laut sind: verliebt, eifersüchtig, verunsichert.',
      flavor: 'Der weise Geist wird nicht laut. Man hört ihn, wenn es ruhig wird.',
      einheit: 'j3-e27', seltenheit: 'episch',
    },
    {
      id: 'mein-raum-dein-raum', name: 'Mein Raum, dein Raum', typ: 'koerper', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'bewegen', params: { text: 'Füße fest. Arme langsam ausbreiten. Zeichne einen Kreis um dich: Das ist dein Raum.' },
      schritte: ['Füße fest auf den Boden. Einmal lang ausatmen.', 'Arme ausbreiten, einen Kreis um dich zeichnen: Das ist mein Raum.', 'Arme sinken lassen. Jede und jeder hat so einen Raum.'],
      wann: 'Wenn dir jemand zu nah kommt – oder du unsicher bist, ob du es tust.',
      flavor: 'Mein Raum gehört mir. Und dein Raum gehört dir.',
      einheit: 'j3-e28', seltenheit: 'selten',
    },
    {
      id: 'gegenteil-tun', name: 'Gegenteil tun', typ: 'koerper', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'anker', params: { text: 'Füße auf den Boden. Aufrecht sitzen. Schultern locker. Blick heben. Einmal lang ausatmen.' },
      schritte: ['Peinlich? Scham sagt: Mach dich klein.', 'Mach das Gegenteil: aufrecht sitzen, Schultern locker, Blick heben.', 'Einmal lang ausatmen. Dann stell deine Frage.'],
      wann: 'Wenn dir etwas peinlich ist, obwohl du nichts falsch gemacht hast.',
      flavor: 'Eine peinliche Frage stellen ist kein Risiko. Es ist Mut.',
      einheit: 'j3-e29', seltenheit: 'selten',
    },
    {
      id: 'tempo-rausnehmen', name: 'Tempo rausnehmen', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'atmen', params: { ein: 4, halten: 0, aus: 6, runden: 5 },
      schritte: ['4 Sekunden ein, 6 Sekunden aus. Fünf Runden.', 'Drück dabei die Füße fest in den Boden.', 'Dann: erst atmen, dann Hilfe holen, dann handeln.'],
      wann: 'Wenn dir jemand Zeitdruck macht: „Du hast zehn Minuten.“',
      flavor: 'Wer Druck macht, will deine Panik. Du nimmst das Tempo raus.',
      einheit: 'j3-e30', seltenheit: 'episch',
    },

    // Modul 9 – Medien und KI
    {
      id: 'aufmerksamkeit-zurueck', name: 'Aufmerksamkeit zurückholen', typ: 'atem', zonen: ['gruen', 'gelb'], kraft: 2,
      interaktion: 'wegwischen', params: { dinge: ['Neue Nachricht', 'Noch ein Video', 'Was läuft im Chat?', 'Gleich mal checken', 'Autoplay startet'] },
      schritte: ['Handy weg. Spür den Atem an der Nase oder am Bauch.', 'Gedanken weg? Freundlich bemerken – zurück zum Atem.', 'Jedes Zurückkommen ist eine Wiederholung. Wie im Gym.'],
      wann: 'Wenn der Feed dich festhält und du eigentlich etwas anderes wolltest.',
      flavor: 'Der Feed will deine Aufmerksamkeit. Du holst sie dir zurück.',
      einheit: 'j3-e31', seltenheit: 'basis',
    },

    // Modul 10 – Abschluss
    {
      id: 'satz-im-ausatmen', name: 'Mein Satz im Ausatmen', typ: 'atem', zonen: ['gelb', 'rot'], kraft: 3,
      interaktion: 'atmen', params: { ein: 4, halten: 0, aus: 6, runden: 5, satz: 'Das ist schwer – und ich habe schon Schwereres geschafft.' },
      schritte: ['4 Sekunden ein durch die Nase.', '6 Sekunden aus – und dabei dein Satz.', 'Fünf Runden. Drei, vier Wörter reichen: „Ich schaff das.“'],
      wann: 'Unterwegs, wenn es eng wird und du etwas zum Festhalten brauchst.',
      flavor: 'Der Atem bremst den Körper. Dein Satz hält den Kopf.',
      einheit: 'j3-e33', seltenheit: 'episch',
    },
    {
      id: 'wegstein', name: 'Der Wegstein', typ: 'sinne', zonen: ['gruen', 'gelb', 'rot'], kraft: 3,
      interaktion: 'sinne-tippen', params: { schritte: [
        { anzahl: 1, sinn: 'sehen', text: 'Schau deinen Stein an: Farben, Linien.' },
        { anzahl: 1, sinn: 'spüren', text: 'Wieg ihn in der Hand. Wie schwer ist er?' },
        { anzahl: 1, sinn: 'spüren', text: 'Wo ist er kalt, wo warm?' },
      ] },
      schritte: ['Nimm deinen Stein. Schau ihn an wie zum ersten Mal.', 'Wieg ihn. Spür, wo er kalt und wo er warm ist.', 'Lass ihn in der Hand warm werden. Du bist hier.'],
      wann: 'Wenn es nach dem Sommer eng wird. Er passt in jede Hosentasche.',
      flavor: 'Drei Jahre Skills in einem Stein. Keiner sieht ihn. Du spürst ihn.',
      einheit: 'j3-e35', seltenheit: 'legendaer',
    },

    // Joker
    {
      id: 'anker-vor-der-tuer', name: 'Anker vor der Tür', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anker', params: { text: 'Stehen bleiben. Füße spüren. Einmal lang ausatmen. Dein Satz. Dann klopfen.' },
      schritte: ['Füße: Bleib stehen und spür den Boden.', 'Atem: einmal lang ausatmen.', 'Satz: Ich bin hier, um zu fragen – nicht, um alles zu wissen.'],
      wann: 'Vor einer fremden Tür: Betrieb, Praxis, neues Büro.',
      flavor: 'Füße, Atem, Satz – dann klopfen.',
      einheit: 'j3-j01', seltenheit: 'selten',
    },
    {
      id: 'pannen-stopp', name: 'Pannen-Stopp', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'halten', params: { sekunden: 8, text: 'Stopp! Herd kleiner. Finger halten und einmal lang ausatmen.' },
      schritte: ['Stopp rufen. Herd kleiner.', 'Einmal lang ausatmen.', 'Sagen, was los ist. Dann gemeinsam die nächste Lösung.'],
      wann: 'Wenn in der Küche – oder sonst wo – etwas schiefgeht.',
      flavor: 'Ein angebrannter Topf ist kein Drama. Hektik ist das Drama.',
      einheit: 'j3-j02', seltenheit: 'basis',
    },
    {
      id: 'durchatmen-vor-gaesten', name: 'Durchatmen vor den Gästen', typ: 'atem', zonen: ['gruen', 'gelb'], kraft: 1,
      interaktion: 'atmen', params: { ein: 4, halten: 0, aus: 6, runden: 3 },
      schritte: ['Drei ruhige Atemzüge – gemeinsam.', 'Sag: Heute bin ich zuständig für …', 'Zeig deine Anspannung mit den Fingern.'],
      wann: 'Kurz bevor es losgeht: Gäste, Auftritt, Präsentation.',
      flavor: 'Ihr habt das vorbereitet. Jetzt dürft ihr es genießen.',
      einheit: 'j3-j02', seltenheit: 'basis',
    },
    {
      id: 'frust-check', name: 'Frust-Check', typ: 'koerper', zonen: ['gelb', 'rot'], kraft: 2,
      interaktion: 'anspannen-loslassen', params: { teile: ['Schultern'], halten: 3 },
      schritte: ['Zeig deinen Frust mit den Fingern: 0 bis 10.', 'Zweimal lang ausatmen. Schultern hoch – und fallen lassen.', 'Ein Satz ans andere Team: Gut argumentiert, besonders als ihr …'],
      wann: 'Nach einer Niederlage, wenn der Ärger hochkocht.',
      flavor: 'Verloren hat eine Position. Nicht du.',
      einheit: 'j3-j03', seltenheit: 'selten',
    },
  ]);

  /* ───────────────────────── EINHEITEN (Kursjahr 3) ───────────────────────── */
  SK.addUnits([
    // ── Modul 0: Ankommen ──
    {
      id: 'j3-e01', jahr: 3, nr: 1, modul: 'j3-m0', modulTitel: 'Ankommen',
      titel: 'Das letzte Kursjahr beginnt', joker: false,
      code: 'RAKETE', skills: ['einer-aus-dem-koffer'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Vertrags-Check',
        intro: 'Neues Jahr, neuer Vertrag. Wisch jede Karte: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Dieses Jahr musst du von deinen Beziehungen erzählen.', fakt: false, erklaerung: 'Niemand erzählt Eigenes. Fragen gehen anonym in die Fragenbox.' },
          { text: '„Weiter“ und „Stopp“ gelten immer. Ohne Begründung.', fakt: true, erklaerung: 'Steht im Vertrag. Für alle, auch für die Leitung.' },
          { text: 'Ein Screenshot aus der Gruppe ist okay, wenn ihn keiner weiterschickt.', fakt: false, erklaerung: 'Was hier erzählt wird, bleibt hier. Keine Fotos, keine Screenshots.' },
          { text: 'Die Leitung behält alles für sich – außer jemand ist in Gefahr.', fakt: true, erklaerung: 'Dann holt sie Hilfe. Und sagt vorher, was sie tut.' },
          { text: 'Ins Skills-Buch kommt nur, was bei dir wirklich wirkt.', fakt: true, erklaerung: 'Dein Buch, deine Skills. Im Juni nimmst du es mit.' },
          { text: 'Neue in der Gruppe müssen schon alle Skills kennen.', fakt: false, erklaerung: 'Die Erfahrenen zeigen ihren Lieblingsskill. So lernen alle.' },
          { text: 'Im letzten Jahr kommen persönlichere Themen dran.', fakt: true, erklaerung: 'Rausch, Liebe, schwere Gefühle. Darum gibt es neue Regeln.' },
        ] },
        abschluss: 'Der Vertrag steht. Countdown läuft: Das letzte Kursjahr startet.',
      },
    },
    {
      id: 'j3-e02', jahr: 3, nr: 2, modul: 'j3-m0', modulTitel: 'Ankommen',
      titel: 'Wo stehe ich?', joker: false,
      code: 'RADAR', skills: ['hand-aufs-herz'], stempel: 'Startklar', heikel: false,
      mission: {
        typ: 'paare', titel: 'Mein Skills-Radar',
        intro: 'Das Skills-Radar hat acht Bereiche. Welcher Alltag passt zu welchem Bereich?',
        daten: { paare: [
          ['Gefühle erkennen', 'Ich merke schon im Bus, dass ich gereizt bin.'],
          ['Runterkommen', 'Nach dem Streit bin ich zur nächsten Stunde wieder ruhig.'],
          ['Gedanken prüfen', 'Nach einer schlechten Note frage ich mich: Stimmt das?'],
          ['Nein sagen', 'Beim Lästern im Chat mache ich nicht mit.'],
          ['Für mich sorgen', 'Unter der Woche bin ich vor Mitternacht offline.'],
          ['Hilfe holen', 'Wenn mich etwas nicht loslässt, rede ich mit jemandem.'],
        ] },
        abschluss: 'Niemand muss überall bei 5 sein. Du bist unterwegs – und weißt jetzt, wohin.',
      },
    },

    // ── Modul 1: Werte und Identität ──
    {
      id: 'j3-e03', jahr: 3, nr: 3, modul: 'j3-m1', modulTitel: 'Werte und Identität',
      titel: 'Was mir wichtig ist', joker: false,
      code: 'NORDEN', skills: ['werte-anker'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Welcher Wert steckt dahinter?',
        intro: 'Hinter jeder Entscheidung steckt ein Wert. Finde die Paare.',
        daten: { paare: [
          ['Diogo kauft ein Konzertticket, statt zu sparen.', 'Genuss und Abwechslung'],
          ['Amira hilft jeden Abend ihrem kleinen Bruder.', 'Fürsorge'],
          ['Mathis wird Koch, obwohl seine Eltern etwas anderes wollten.', 'Selbstbestimmung'],
          ['Sofia übt jeden Tag Gitarre für das Solo.', 'Erfolg'],
          ['Jang schreibt im Chat: Hört auf, über Yusuf zu lästern.', 'Gerechtigkeit'],
          ['Ana hilft jeden Sommer beim Dorffest ihrer Großeltern.', 'Tradition'],
        ] },
        abschluss: 'Oft stecken zwei Werte in einer Handlung. Welche drei sind deine Top 3?',
      },
    },
    {
      id: 'j3-e04', jahr: 3, nr: 4, modul: 'j3-m1', modulTitel: 'Werte und Identität',
      titel: 'Wer bin ich – und wer will ich sein?', joker: false,
      code: 'PLANET', skills: ['sinne-54321'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Aylin, die Fake-Show?',
        intro: 'Aylin ist den ganzen Tag anders. Prüf ihren Gedanken wie ein Detektiv.',
        daten: {
          gedanke: 'Ich bin überall ein anderer Mensch. Also bin ich fake.',
          situation: 'Morgens große Schwester, in Mathe still, in der Kantine die Lustige, abends Kapitänin.',
          beweise: [
            { text: 'Zu Hause spricht sie Türkisch, in der Clique Luxemburgisch.', spricht: 'dafuer' },
            { text: 'In Mathe sagt sie nichts, in der Pause ist sie laut.', spricht: 'dafuer' },
            { text: 'Ihr Humor ist überall dabei – mal lauter, mal leiser.', spricht: 'dagegen' },
            { text: 'Sie kümmert sich um andere: um den Bruder und um ihr Team.', spricht: 'dagegen' },
            { text: 'Jeder Mensch passt sich an: Ton, Sprache, Kleidung.', spricht: 'dagegen' },
            { text: 'Ihre Werte bleiben gleich, egal welche Sprache sie spricht.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Ich zeige in jeder Rolle eine andere Seite. Ich bleibe trotzdem ich.',
        },
        abschluss: 'Viele Rollen, viele Sprachen, eine Person. Das ist keine Show. Das bist du.',
      },
    },
    {
      id: 'j3-e05', jahr: 3, nr: 5, modul: 'j3-m1', modulTitel: 'Werte und Identität',
      titel: 'Vorbilder', joker: false,
      code: 'KOMET', skills: ['innere-mentorin'], stempel: 'Werte-Kompass', heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Der Vorbild-Check',
        intro: 'Ein Account verspricht: Mit 19 reich. Prüf ihn wie ein Detektiv.',
        daten: {
          gedanke: 'Wenn ich seinen Kurs kaufe, werde ich auch reich.',
          situation: 'Account „Mit 19 reich“: Sportwagen, Hotelpools, Sprüche über Erfolg. Sein Kurs kostet 499 Euro.',
          beweise: [
            { text: 'Er zeigt teure Autos und Pools.', spricht: 'dafuer' },
            { text: 'Tausende Kommentare feiern ihn.', spricht: 'dafuer' },
            { text: 'Er verdient an jedem Kurs, den er verkauft.', spricht: 'dagegen' },
            { text: 'Autos und Pools kann man auch mieten.', spricht: 'dagegen' },
            { text: 'Leute, bei denen es nicht geklappt hat, zeigt er nie.', spricht: 'dagegen' },
            { text: 'Man sieht nur, was er zeigen will.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Reich wird vor allem er – mit seinem Kurs. Echte Vorbilder zeigen auch Zweifel.',
        },
        abschluss: 'Wer prägt dich wirklich? Oft die Leute ganz nah. Die hörst du als innere Mentorin.',
      },
    },

    // ── Modul 2: Entscheidungen und Verantwortung ──
    {
      id: 'j3-e06', jahr: 3, nr: 6, modul: 'j3-m2', modulTitel: 'Entscheidungen und Verantwortung',
      titel: 'Gut entscheiden', joker: false,
      code: 'ROUTE', skills: ['freundin-frage'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Der innere Rat',
        intro: 'Inês muss sich entscheiden. Bauch, Kopf, Werte und die anderen reden mit.',
        daten: { start: 'fall', knoten: {
          fall: { text: 'Samstag: Kino mit der Clique oder Geburtstag der Cousine? Beides zur selben Zeit.', wahl: [
            { text: 'Erst den Bauch fragen: Wo wird es eng, wo weit?', weiter: 'stimmen', folge: 'Der Bauch meldet sich in Sekunden. Guter Start.', punkte: 2 },
            { text: 'Einfach machen, was die Clique macht.', weiter: 'stimmen', folge: 'Die anderen ziehen stark. Aber ist das Inês’ Entscheidung?', punkte: 0 },
            { text: 'Eine Münze werfen.', weiter: 'stimmen', folge: 'Schnell – aber Kopf und Werte bleiben stumm.', punkte: 1 },
          ] },
          stimmen: { text: 'Kopf: „Die Cousine wird nur einmal 18.“ Die anderen: „Alle kommen ins Kino!“', wahl: [
            { text: 'Eine dritte Möglichkeit suchen: erst Geburtstag, dann später ins Kino.', weiter: 'rat', folge: 'Oft gibt es mehr als A oder B.', punkte: 2 },
            { text: 'Prüfen: Was zählt auch noch in einem Jahr?', weiter: 'rat', folge: 'Genau die Frage aus dem Entscheidungsweg.', punkte: 2 },
            { text: 'Beiden absagen. Zu stressig.', weiter: 'rat', folge: 'Kurz Ruhe. Aber jetzt sind zwei enttäuscht.', punkte: 0 },
          ] },
          rat: { text: 'Inês hängt immer noch fest. Was hilft ihr jetzt?', wahl: [
            { text: 'Die Freundin-Frage: Was würde ich meiner besten Freundin raten?', weiter: null, folge: 'Für andere sind wir klüger. Trick geliehen!', punkte: 2 },
            { text: 'Der Entscheidungssatz: Ich entscheide mich für …, weil …', weiter: null, folge: 'Klar und mit Grund. So steht die Entscheidung.', punkte: 2 },
            { text: 'Noch drei Tage grübeln.', weiter: null, folge: 'Der Kopf wird nie fertig. Irgendwann braucht es einen Satz.', punkte: 0 },
          ] },
        } },
        abschluss: 'Kleines darf der Bauch entscheiden. Großes braucht Bauch, Kopf und Werte.',
      },
    },
    {
      id: 'j3-e07', jahr: 3, nr: 7, modul: 'j3-m2', modulTitel: 'Entscheidungen und Verantwortung',
      titel: 'Risiko, Mut und Leichtsinn', joker: false,
      code: 'SONDE', skills: ['stopp-ausstiegssatz'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Ausstiegssatz-Werkstatt',
        intro: 'Alle feuern dich an. Bau einen Ausstiegssatz: kurz, klar, gern mit Humor.',
        daten: { aufgaben: [
          {
            situation: 'Auf der Brücke rufen alle deinen Namen. Wie tief das Wasser ist, weiß keiner.',
            bausteine: ['Lass mal,', 'ich brauch', 'meine Knochen noch.', 'Okay, ich spring.', 'Ihr seid alle Feiglinge.'],
            loesungen: [['Lass mal,', 'ich brauch', 'meine Knochen noch.']],
            tipp: 'Ein Ausstiegssatz braucht keine lange Begründung. Witzig darf er sein.',
          },
          {
            situation: 'Luca will, dass du aufs Baugerüst kletterst. Er filmt schon.',
            bausteine: ['Ohne mich,', 'ich hab', 'morgen Training.', 'Nur ein Video, dann.', 'Warte, ich komme.'],
            loesungen: [['Ohne mich,', 'ich hab', 'morgen Training.']],
            tipp: 'Kurz reicht. Dann umdrehen und gehen.',
          },
          {
            situation: 'Der Bus fährt gleich. Die Ampel ist rot. Deine Freunde rennen schon los.',
            bausteine: ['Ich nehm', 'den nächsten.', 'Wir sehen uns', 'gleich.', 'Wartet, ich renne mit!'],
            loesungen: [['Ich nehm', 'den nächsten.', 'Wir sehen uns', 'gleich.'], ['Wir sehen uns', 'gleich.', 'Ich nehm', 'den nächsten.']],
            tipp: 'Mut heißt manchmal: allein stehen bleiben.',
          },
        ] },
        abschluss: 'Stopp, Schritt zurück, hinschauen, Ausstiegssatz. Mut ist, wenn es sich lohnt.',
      },
    },
    {
      id: 'j3-e08', jahr: 3, nr: 8, modul: 'j3-m2', modulTitel: 'Entscheidungen und Verantwortung',
      titel: 'Rausch und Risiko – informiert entscheiden', joker: false,
      code: 'POLAR', skills: ['anspannen-loslassen'], stempel: null, heikel: true,
      mission: {
        typ: 'mythos-fakt', titel: 'Faktencheck: Rausch',
        intro: 'Sachlich statt mit Angst. Wisch jede Aussage: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Die meisten Jugendlichen in deinem Alter kiffen nicht.', fakt: true, erklaerung: 'Wir überschätzen, was „alle“ tun. Rausch fällt auf, Nüchternsein nicht.' },
          { text: 'Mit Energydrink ist Alkohol weniger gefährlich.', fakt: false, erklaerung: 'Man fühlt sich wacher, ist aber genauso betrunken. Oft trinkt man mehr.' },
          { text: 'Kiffen macht immer entspannt.', fakt: false, erklaerung: 'THC kann auch Angst, Herzrasen oder Panik auslösen.' },
          { text: 'Mischen ist okay, wenn man von allem nur wenig nimmt.', fakt: false, erklaerung: 'Wirkungen verstärken sich. Auch kleine Mengen können zusammen gefährlich sein.' },
          { text: 'Einer Pille sieht man nicht an, was und wie viel drin ist.', fakt: true, erklaerung: 'Farbe, Form oder Logo verraten nichts über Inhalt und Menge.' },
          { text: 'Wer sich nach ein paar Bier fit fühlt, kann fahren.', fakt: false, erklaerung: 'Die Reaktion wird langsamer, bevor man es merkt. Nicht fahren, nicht einsteigen.' },
          { text: 'Im Rausch gibt es kein echtes Ja.', fakt: true, erklaerung: 'Ein echtes Ja braucht einen klaren Kopf. Wer unsicher ist, hört auf.' },
          { text: 'Wer nicht mehr wach zu kriegen ist, soll den Rausch ausschlafen.', fakt: false, erklaerung: 'Lebensgefahr! Sofort 112, stabile Seitenlage, nicht allein lassen.' },
        ] },
        abschluss: 'Im Notfall: 112, stabile Seitenlage, dableiben. Fragen? Vertrauensperson oder 116 111.',
      },
    },
    {
      id: 'j3-e09', jahr: 3, nr: 9, modul: 'j3-m2', modulTitel: 'Entscheidungen und Verantwortung',
      titel: 'Fehler machen – und daraus lernen', joker: false,
      code: 'ROVER', skills: ['satz-nach-fehler'], stempel: 'Entscheidungs-Profi', heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Das kleine Wort „noch“',
        intro: 'Ein kleines Wort verändert alles. Bau die Sätze um.',
        daten: { aufgaben: [
          {
            situation: 'Chiara sagt nach dem Test: „Ich kann das nicht.“',
            bausteine: ['Ich kann', 'das', 'noch', 'nicht.', 'nie.', 'Ich bin zu dumm.'],
            loesungen: [['Ich kann', 'das', 'noch', 'nicht.']],
            tipp: 'Mit „noch“ wird aus einem Urteil ein Zwischenstand.',
          },
          {
            situation: 'Diogo sagt: „Ich bin halt schlecht in Mathe.“ Mach den Satz konkret.',
            bausteine: ['Brüche', 'kann ich', 'noch nicht sicher.', 'Ich übe sie', 'diese Woche.', 'Mathe ist nichts für mich.'],
            loesungen: [['Brüche', 'kann ich', 'noch nicht sicher.', 'Ich übe sie', 'diese Woche.'], ['Brüche', 'kann ich', 'noch nicht sicher.']],
            tipp: 'Konkret statt pauschal: Was genau fehlt – und was ist der nächste Schritt?',
          },
          {
            situation: 'Du hast den Bus verpasst. Dein Kopf schimpft. Bau die drei Sätze nach dem Fehler.',
            bausteine: ['Das war ein Fehler, und er ärgert mich.', 'So etwas passiert allen Menschen.', 'Mein nächster Schritt: Wecker abends stellen.', 'Ich bin so ein Loser.', 'Mir passiert immer alles.'],
            loesungen: [['Das war ein Fehler, und er ärgert mich.', 'So etwas passiert allen Menschen.', 'Mein nächster Schritt: Wecker abends stellen.']],
            tipp: 'Ernst nehmen, nicht nachtreten, nächsten Schritt finden.',
          },
        ] },
        abschluss: 'Fällt ein Tuch runter: Arme hoch, „Ta-da!“ – und weiter.',
      },
    },

    // ── Modul 3: Zukunft und Beruf ──
    {
      id: 'j3-e10', jahr: 3, nr: 10, modul: 'j3-m3', modulTitel: 'Zukunft und Beruf',
      titel: 'Was kann ich, was will ich?', joker: false,
      code: 'VISION', skills: ['gedankenschiffchen'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Parcours der Arbeitsproben',
        intro: 'Sechs Arbeitsproben, sechs Interessen-Bereiche. Welche Probe gehört wohin?',
        daten: { paare: [
          ['Eine Papierbrücke bauen, die eine Schere trägt', 'Anpacken'],
          ['Ein Zahlenrätsel knacken: 2, 3, 5, 9, 17 …', 'Tüfteln'],
          ['Ein Logo für den Skills-Kurs entwerfen', 'Gestalten'],
          ['Einen Skill so erklären, dass ihn jemand allein kann', 'Helfen'],
          ['Einen alten Kugelschreiber verkaufen', 'Überzeugen'],
          ['Aus Terminchaos einen Wochenplan machen', 'Ordnen'],
        ] },
        abschluss: 'Was hat dir Energie gegeben? Deine zwei stärksten Bereiche sind dein Interessen-Code.',
      },
    },
    {
      id: 'j3-e11', jahr: 3, nr: 11, modul: 'j3-m3', modulTitel: 'Zukunft und Beruf',
      titel: 'Berufe entdecken', joker: false,
      code: 'GLOBUS', skills: ['erster-satz'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Wege-Check',
        intro: 'Lycée, Ausbildung, Umwege: Was stimmt? Wisch: Mythos oder Fakt.',
        daten: { karten: [
          { text: 'Echte Berufswege gehen immer schnurgerade.', fakt: false, erklaerung: 'Viele Wege haben Kurven. Umwege gehören dazu.' },
          { text: 'Beim DAP lernst du meist in der Schule und im Betrieb.', fakt: true, erklaerung: 'Meist mit Lehrvertrag. So wirst du Fachkraft.' },
          { text: 'Wer eine Klasse wiederholt, hat keine Chance mehr.', fakt: false, erklaerung: 'Es zählt, was du daraus machst. Viele starten danach durch.' },
          { text: 'Einen Abschluss kann man auch mit 20 oder 30 nachholen.', fakt: true, erklaerung: 'Zum Beispiel in Kursen für Erwachsene.' },
          { text: 'Eine Ausbildung ist nur was für schlechte Schüler.', fakt: false, erklaerung: 'Fachkräfte werden überall gesucht. Im Handwerk geht es bis zur Meisterprüfung.' },
          { text: 'Im Interview erfährst du Dinge, die nicht im Internet stehen.', fakt: true, erklaerung: 'Wie ist der Ton im Team? Was passiert bei Fehlern? Frag nach!' },
          { text: 'Wer nach dem Weg in den Beruf fragt, wirkt ahnungslos.', fakt: false, erklaerung: 'Fragen zeigt Interesse. Profis erzählen gern von ihrem Weg.' },
        ] },
        abschluss: 'Umwege sind auch Wege. Und dein erster Satz öffnet die Tür zum Interview.',
      },
    },
    {
      id: 'j3-e12', jahr: 3, nr: 12, modul: 'j3-m3', modulTitel: 'Zukunft und Beruf',
      titel: 'Bewerben und vorstellen', joker: false,
      code: 'TICKET', skills: ['plan-gegen-nervositaet'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren', titel: 'Rein oder raus?',
        intro: 'Was gehört in den Lebenslauf? Grün heißt rein, gelb kommt drauf an, rot heißt raus.',
        daten: { items: [
          { text: 'Handynummer und eine seriöse E-Mail-Adresse', zone: 'gruen', warum: 'Rein. Am besten vorname.nachname@…' },
          { text: 'Die E-Mail-Adresse suesse.maus2010@…', zone: 'rot', warum: 'Raus. Leg dir lieber eine neue Adresse an.' },
          { text: 'Alle deine Sprachen, mit ehrlicher Stufe', zone: 'gruen', warum: 'Rein – auch Portugiesisch, Arabisch oder Luxemburgisch.' },
          { text: 'Deine Religion', zone: 'rot', warum: 'Raus. Das ist privat.' },
          { text: 'Ein Foto', zone: 'gelb', warum: 'Freiwillig. Wenn, dann ruhig und aktuell – kein Strand-Selfie.' },
          { text: 'Hobby: Zocken', zone: 'gelb', warum: '„Online-Turniere im Team organisiert“ sagt mehr als „Zocken“.' },
          { text: 'Praktika, Ferienjobs, Babysitten', zone: 'gruen', warum: 'Rein. Das sind echte Erfahrungen.' },
          { text: 'Diagnosen oder Medikamente', zone: 'rot', warum: 'Raus. Das ist privat.' },
        ] },
        abschluss: 'Beispiel statt Behauptung. Und vor der Tür: ein, nachatmen, lang aus.',
      },
    },
    {
      id: 'j3-e13', jahr: 3, nr: 13, modul: 'j3-m3', modulTitel: 'Zukunft und Beruf',
      titel: 'Ziele, die tragen', joker: false,
      code: 'NAVI', skills: ['woop'], stempel: 'Zukunfts-Pilot', heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'WOOP wie Zoé',
        intro: 'Zoé will bis Ostern einen Praktikumsplatz. Bring ihren WOOP in die richtige Reihenfolge.',
        daten: { schritte: [
          'W – Wunsch: bis Ostern einen Praktikumsplatz finden.',
          'O – Bestes Ergebnis: zeigen, was ich kann.',
          'O – Hindernis: Ich schiebe Anrufe auf. Ich habe Angst vor einem Nein.',
          'P – Plan: Wenn ich dienstags heimkomme, rufe ich zuerst einen Betrieb an.',
          'Plan B: Nach einer Absage frage ich den nächsten Betrieb.',
        ] },
        abschluss: 'Nur ausmalen reicht nicht. Wer sein Hindernis kennt, bleibt dran.',
      },
    },

    // ── Modul 4: Selbstständig werden ──
    {
      id: 'j3-e14', jahr: 3, nr: 14, modul: 'j3-m4', modulTitel: 'Selbstständig werden',
      titel: 'Geld im Griff', joker: false,
      code: 'SPUR', skills: ['kauf-stopp'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Der Monatspreis täuscht',
        intro: 'Rechnen lohnt sich! Schätz mit dem Regler, dann kommt die Auflösung.',
        daten: { fragen: [
          { text: 'Handy A: 1 Euro plus 24 Monate à 30 Euro. Was zahlst du insgesamt?', min: 0, max: 1000, richtig: 721, einheit: 'Euro', erklaerung: '1 + 24 × 30 = 721 Euro. Der 1-Euro-Trick ist teuer.' },
          { text: 'Handy B: 180 Euro plus 24 Monate à 10 Euro. Insgesamt?', min: 0, max: 1000, richtig: 420, einheit: 'Euro', erklaerung: '180 + 24 × 10 = 420 Euro. Rund 300 Euro weniger als Handy A.' },
          { text: 'Konsole: 12 Raten à 45 Euro. Bar kostet sie 480 Euro. Wie viel mehr zahlst du?', min: 0, max: 200, richtig: 60, einheit: 'Euro', erklaerung: '12 × 45 = 540 Euro. Also 60 Euro mehr als bar.' },
          { text: 'Inês hat 60 Euro im Monat. 15 für feste Kosten, 15 zum Sparen. Was bleibt für den Alltag?', min: 0, max: 60, richtig: 30, einheit: 'Euro', erklaerung: '30 Euro – also 7,50 Euro pro Woche.' },
        ] },
        abschluss: 'Der Monatspreis sieht klein aus. Rechne immer die Summe. Und vor dem Kauf: Kauf-Stopp.',
      },
    },
    {
      id: 'j3-e15', jahr: 3, nr: 15, modul: 'j3-m4', modulTitel: 'Selbstständig werden',
      titel: 'Alltag organisieren', joker: false,
      code: 'GLEIS', skills: ['erst-atmen-dann-handeln'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Der Anruf in der Praxis',
        intro: 'Jang hat seit drei Tagen Halsschmerzen. Du entscheidest, wie er anruft.',
        daten: { start: 'vorher', knoten: {
          vorher: { text: 'Jangs Anspannung: 65. Das Handy liegt vor ihm.', wahl: [
            { text: 'Lang ausatmen, Kastenatmung, ersten Satz halblaut sagen. Dann wählen.', weiter: 'praxis', folge: 'Wählen, solange die Zahl sinkt.', punkte: 2 },
            { text: 'Warten, bis die Angst ganz weg ist.', weiter: 'praxis', folge: 'Sie geht selten von allein. Morgen ist es genauso schwer.', punkte: 0 },
            { text: 'Seine Schwester anrufen lassen.', weiter: 'praxis', folge: 'Klappt heute. Aber Jang übt es nicht selbst.', punkte: 1 },
          ] },
          praxis: { text: '„Cabinet médical, bonjour!“ Die Stimme spricht schnell Französisch.', wahl: [
            { text: '„Bonjour. Pouvez-vous parler plus lentement, s’il vous plaît?“', weiter: 'termin', folge: 'Nachfragen ist erlaubt. Die Frau spricht langsamer.', punkte: 2 },
            { text: 'Auf Deutsch weiterreden und hoffen.', weiter: 'termin', folge: 'Manchmal klappt es. Nachfragen ist sicherer.', punkte: 1 },
            { text: 'Sofort auflegen.', weiter: 'termin', folge: 'Kurz erleichtert. Dann ruft er doch nochmal an – mit Spickzettel.', punkte: 0 },
          ] },
          termin: { text: '„Diese Woche ist alles voll. Dienstag, 14:30 Uhr?“ Da hat Jang Mathe.', wahl: [
            { text: 'Nach einem anderen Termin fragen und ihn sofort eintragen.', weiter: null, folge: 'Termin im Kalender, mit zwei Erinnerungen. Profi!', punkte: 2 },
            { text: 'Dienstag nehmen, der Lehrerin Bescheid sagen und eintragen.', weiter: null, folge: 'Plan steht. Erinnerung am Vortag und eine Stunde vorher.', punkte: 2 },
            { text: 'Ja sagen und nichts notieren.', weiter: null, folge: 'Dienstag vergessen. Termin verpasst.', punkte: 0 },
          ] },
        } },
        abschluss: 'Aufregung verschwindet nicht durch Warten. Sie wird kleiner, wenn du anfängst.',
      },
    },
    {
      id: 'j3-e16', jahr: 3, nr: 16, modul: 'j3-m4', modulTitel: 'Selbstständig werden',
      titel: 'Kochen und versorgen', joker: false,
      code: 'MARS', skills: ['erste-drei-bissen'], stempel: 'Alltags-Profi', heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Küchen-Check',
        intro: 'Bevor der Herd angeht: Was stimmt? Wisch: Mythos oder Fakt.',
        daten: { karten: [
          { text: 'Rohes Hähnchen wäscht man vor dem Braten ab.', fakt: false, erklaerung: 'Das Wasser verteilt Keime in der Küche. Die Hitze tötet sie ab.' },
          { text: 'Für rohes Fleisch nimmt man ein eigenes Brett.', fakt: true, erklaerung: 'So kommen Keime nicht ans Gemüse.' },
          { text: 'Nach dem Mindesthaltbarkeitsdatum ist Joghurt sofort verdorben.', fakt: false, erklaerung: 'Oft ist er noch gut. Ansehen, riechen, probieren.' },
          { text: 'Bei einer Nussallergie pickt man die Nüsse einfach raus.', fakt: false, erklaerung: 'Schon Spuren können gefährlich sein.' },
          { text: 'Brennendes Fett löscht man mit Wasser.', fakt: false, erklaerung: 'Gefährlich! Deckel drauf, Herd aus.' },
          { text: 'Ein fallendes Messer fängt man nicht auf.', fakt: true, erklaerung: 'Zurücktreten und fallen lassen.' },
          { text: 'Auf eine Verbrennung gehört sofort Eis.', fakt: false, erklaerung: 'Besser: handwarmes, fließendes Wasser.' },
          { text: 'Hände waschen dauert mindestens 20 Sekunden.', fakt: true, erklaerung: 'Zweimal „Zum Geburtstag viel Glück“ summen.' },
        ] },
        abschluss: 'Sicher kochen, zusammen essen. Und die ersten drei Bissen ganz bewusst.',
      },
    },

    // ── Modul 5: Schwere Gefühle ──
    {
      id: 'j3-e17', jahr: 3, nr: 17, modul: 'j3-m5', modulTitel: 'Schwere Gefühle',
      titel: 'Trauer und Verlust', joker: false,
      code: 'AURORA', skills: ['welle-reiten'], stempel: null, heikel: true,
      mission: {
        typ: 'zonen-sortieren', titel: 'Was hilft Tiago?',
        intro: 'Tiagos Avô ist gestorben. Sortiere: grün hilft, gelb kommt drauf an, rot hilft eher nicht.',
        daten: { items: [
          { text: '„Es tut mir leid. Ich weiß nicht, was ich sagen soll. Aber ich bin da.“', zone: 'gruen', warum: 'Ehrlich und ohne Druck.' },
          { text: '„Ich weiß genau, wie du dich fühlst.“', zone: 'rot', warum: 'Das weiß niemand genau. Besser: fragen.' },
          { text: '„Kopf hoch, das wird schon wieder.“', zone: 'rot', warum: 'Klingt, als müsste die Trauer schnell weg.' },
          { text: '„Magst du erzählen, wie er so war?“', zone: 'gelb', warum: 'Manche erzählen gern, andere noch nicht. Die Frage lässt die Wahl.' },
          { text: '„Soll ich dich nach dem Training ein Stück begleiten?“', zone: 'gruen', warum: 'Kleine, konkrete Hilfe.' },
          { text: '„Jetzt ist aber mal gut. Das ist doch Monate her.“', zone: 'rot', warum: 'Trauer hat keine Frist.' },
          { text: '„Ich hab heute an dich gedacht.“', zone: 'gruen', warum: 'Zeigt: Du bist nicht vergessen – auch Wochen später.' },
          { text: '„Hast du Lust, am Samstag was zu machen? Einfach so.“', zone: 'gelb', warum: 'Ablenkung tut gut, wenn ein Nein erlaubt ist.' },
        ] },
        abschluss: 'Da sein, ehrlich sein, dranbleiben. Wird Trauer zu schwer: Vertrauensperson oder 116 111.',
      },
    },
    {
      id: 'j3-e18', jahr: 3, nr: 18, modul: 'j3-m5', modulTitel: 'Schwere Gefühle',
      titel: 'Scham und Schuld', joker: false,
      code: 'KURS', skills: ['freundliche-stimme'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Zurückspulen',
        intro: 'Scham versteckt, Schuld repariert. Spul zurück und bau den Reparatur-Satz.',
        daten: { aufgaben: [
          {
            situation: 'Rafael wird beim Spicken erwischt. Die Lehrerin will nach der Stunde reden.',
            bausteine: ['Ja, das war ein Spickzettel.', 'Das war unfair.', 'Was kann ich jetzt tun?', 'Mir doch egal.', 'Ihre Tests sind eh unfair.'],
            loesungen: [['Ja, das war ein Spickzettel.', 'Das war unfair.', 'Was kann ich jetzt tun?']],
            tipp: 'Schuld schaut auf die Tat. Und dann auf den nächsten Schritt.',
          },
          {
            situation: 'Mathis hat einen Screenshot aus Zoés Chat geteilt. Im Bus setzt sie sich neben ihn.',
            bausteine: ['Ich hab ihn gelöscht.', 'Das war falsch.', 'Es tut mir leid.', 'Chill mal,', 'war doch nur Spaß.'],
            loesungen: [['Ich hab ihn gelöscht.', 'Das war falsch.', 'Es tut mir leid.'], ['Es tut mir leid.', 'Das war falsch.', 'Ich hab ihn gelöscht.']],
            tipp: 'Wiedergutmachen heißt: sagen, was war – und etwas tun.',
          },
          {
            situation: 'Inês hat im Praktikum einen Kundentermin vergessen. Der Chef ist verärgert.',
            bausteine: ['Das war mein Fehler.', 'Soll ich die Kundin anrufen?', 'Ab jetzt trage ich Termine sofort ein.', 'Ich bin zu blöd für alles.', 'Morgen melde ich mich krank.'],
            loesungen: [['Das war mein Fehler.', 'Soll ich die Kundin anrufen?', 'Ab jetzt trage ich Termine sofort ein.']],
            tipp: '„Ich habe einen Fehler gemacht“ – nicht: „Ich bin ein Fehler.“',
          },
        ] },
        abschluss: 'Du bist mehr als ein Fehler. Aufrichten – und mit freundlicher Stimme weiter.',
      },
    },
    {
      id: 'j3-e19', jahr: 3, nr: 19, modul: 'j3-m5', modulTitel: 'Schwere Gefühle',
      titel: 'Einsamkeit', joker: false,
      code: 'FUNK', skills: ['eine-sache-ganz'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Jangs einsamer Gedanke',
        intro: 'Jang fühlt sich einsam. Prüf seinen Gedanken wie ein Detektiv.',
        daten: {
          gedanke: 'Niemand will etwas mit mir zu tun haben.',
          situation: 'Jang ist in der Pause oft allein. Heute hat keiner auf seine Nachricht geantwortet.',
          beweise: [
            { text: 'In der Pause sitzt er meistens allein.', spricht: 'dafuer' },
            { text: 'Auf seine Nachricht im Gruppenchat kam keine Antwort.', spricht: 'dafuer' },
            { text: 'Im Gruppenchat gehen viele Nachrichten einfach unter.', spricht: 'dagegen' },
            { text: 'Sein Online-Team fragt jeden Abend, ob er mitspielt.', spricht: 'dagegen' },
            { text: 'Letzte Woche hat Elias ihn nach den Hausaufgaben gefragt.', spricht: 'dagegen' },
            { text: 'Wer einsam ist, deutet unklare Signale schnell negativ.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Gerade fühle ich mich einsam. Das ist ein Signal – und ich kann einen kleinen Schritt machen.',
        },
        abschluss: 'Einsamkeit ist ein Signal wie Hunger, kein Makel. Ein „Ist hier noch frei?“ kann viel ändern.',
      },
    },
    {
      id: 'j3-e20', jahr: 3, nr: 20, modul: 'j3-m5', modulTitel: 'Schwere Gefühle',
      titel: 'Wenn es mir schlecht geht – mein Sicherheitsplan', joker: false,
      code: 'BASIS', skills: ['fester-stand'], stempel: 'Plan an Bord', heikel: true,
      mission: {
        typ: 'reihenfolge', titel: 'Schritt für Schritt zur Hilfe',
        intro: 'Ein Sicherheitsplan ist wie ein Erste-Hilfe-Kasten. Reicht ein Schritt nicht, kommt der nächste.',
        daten: { schritte: [
          'Warnzeichen merken: Es geht mir richtig schlecht.',
          'Selbst etwas tun: kaltes Wasser, Treppe laufen, 5-4-3-2-1.',
          'Unter Menschen gehen oder an einen guten Ort.',
          'Jemanden um Hilfe bitten: Familie, Freunde, Erwachsene in der Schule.',
          'Fachleute erreichen: SePAS, Kanner- a Jugendtelefon 116 111, SOS Détresse 45 45 45.',
          'Bei akuter Gefahr: Notruf 112.',
        ] },
        abschluss: 'Den Plan packst du, wenn es dir gut geht. Er bleibt privat. Hilfe holen ist nie Verrat.',
      },
    },

    // ── Modul 6: Resilienz und Hilfe ──
    {
      id: 'j3-e21', jahr: 3, nr: 21, modul: 'j3-m6', modulTitel: 'Resilienz und Hilfe',
      titel: 'Was mich stark macht', joker: false,
      code: 'SCHUB', skills: ['kraft-moment'], stempel: null, heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Die Kinder von Kauai',
        intro: 'Auf der Insel Kauai begleitete ein Team Kinder bis ins Erwachsenenalter. Schätz mit dem Regler!',
        daten: { fragen: [
          { text: 'Wie viele Kinder kamen 1955 auf Kauai zur Welt und wurden begleitet?', min: 0, max: 2000, richtig: 698, einheit: 'Kinder', erklaerung: 'Es waren 698. Das Team um Emmy Werner begleitete sie jahrzehntelang.' },
          { text: 'Von 10 Kindern mit schwerem Start: Wie vielen ging es mit 18 gut?', min: 0, max: 10, richtig: 3, einheit: 'von 10', erklaerung: 'Etwa jedem dritten. Und viele andere fanden später doch noch ihren Weg.' },
          { text: 'Wie viele Menschen braucht es mindestens, die verlässlich zu dir halten?', min: 0, max: 10, richtig: 1, einheit: 'Mensch', erklaerung: 'Oft machte schon einer den Unterschied: eine Oma, ein Trainer, eine Lehrerin.' },
        ] },
        abschluss: 'Stärke wächst aus gewöhnlichen Dingen: Menschen, Können, Aufgaben. Die kann man finden und üben.',
      },
    },
    {
      id: 'j3-e22', jahr: 3, nr: 22, modul: 'j3-m6', modulTitel: 'Resilienz und Hilfe',
      titel: 'Hilfe holen ist stark', joker: false,
      code: 'LOTSE', skills: ['selbstmitgefuehl-pause'], stempel: null, heikel: false,
      mission: {
        typ: 'paare', titel: 'Die Hilfe-Landkarte',
        intro: 'Wer hilft wobei? Finde für jede Lage die passende Anlaufstelle.',
        daten: { paare: [
          ['Ein Freund ist auf einer Party nicht mehr ansprechbar.', 'Notruf 112'],
          ['Jemand droht, peinliche Fotos von Emma zu verschicken.', 'BEE SECURE Helpline 8002 1234'],
          ['Mila grübelt seit Tagen. Sie will anonym mit jemandem reden.', 'Kanner- a Jugendtelefon 116 111'],
          ['Tiago hat eine Frage zur Verhütung.', 'Planning Familial oder Schulärztin'],
          ['Jang schläft seit Wochen schlecht und hat zu nichts Lust.', 'SePAS im Lycée'],
          ['Ana kommt in Mathe nicht mehr mit.', 'Lehrperson oder Educateur'],
        ] },
        abschluss: 'Früh fragen ist leichter. Ein erster Satz reicht: „Mir geht es nicht gut. Hast du kurz Zeit?“',
      },
    },
    {
      id: 'j3-e23', jahr: 3, nr: 23, modul: 'j3-m6', modulTitel: 'Resilienz und Hilfe',
      titel: 'Gute Momente sammeln', joker: false,
      code: 'NOVA', skills: ['geniessen-zeitlupe'], stempel: 'Starkes Netz', heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Der schwarze Punkt',
        intro: 'Schlechtes klebt, Gutes rutscht durch. Prüf Sofias Gedanken wie ein Detektiv.',
        daten: {
          gedanke: 'Heute war einfach alles schlecht.',
          situation: 'Sofia hat eine schlechte Note. Der Bus war weg. Jetzt liegt sie auf dem Bett.',
          beweise: [
            { text: 'Die Mathe-Note ist wirklich mies.', spricht: 'dafuer' },
            { text: 'Der Bus ist ihr vor der Nase weggefahren.', spricht: 'dafuer' },
            { text: 'In der Pause hat Amira ihr Schokolade abgegeben.', spricht: 'dagegen' },
            { text: 'Ihr Lieblingslied lief im Radio.', spricht: 'dagegen' },
            { text: 'Auf dem Heimweg schien kurz die Sonne.', spricht: 'dagegen' },
            { text: 'Ihr Bruder hat sie mit einem Meme zum Lachen gebracht.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Heute war einiges mies. Und es gab drei gute Momente.',
        },
        abschluss: 'Gute Momente kann man sammeln – im Glas oder im Kopf. Und in Zeitlupe genießen.',
      },
    },

    // ── Modul 7: Meinung und Mitbestimmung ──
    {
      id: 'j3-e24', jahr: 3, nr: 24, modul: 'j3-m7', modulTitel: 'Meinung und Mitbestimmung',
      titel: 'Meine Meinung zählt', joker: false,
      code: 'FLAGGE', skills: ['gedanke-oder-tatsache'], stempel: null, heikel: false,
      mission: {
        typ: 'detektiv', titel: 'Alle Gamer sind …?',
        intro: 'Klingt wie eine Meinung, ist aber prüfbar. Sammle Beweise wie ein Detektiv.',
        daten: {
          gedanke: 'Alle Gamer sind aggressiv.',
          situation: 'Im Klassenchat: ein Clip von einem schreienden Gamer. Darunter: „Typisch. Alle Gamer sind aggressiv.“',
          beweise: [
            { text: 'Im Clip schreit ein Spieler ins Mikro.', spricht: 'dafuer' },
            { text: 'Online liest man auch Beleidigungen.', spricht: 'dafuer' },
            { text: 'Dein Cousin zockt jeden Tag und ist total ruhig.', spricht: 'dagegen' },
            { text: 'Wütende Clips bekommen mehr Klicks. Ruhige Spieler sieht man kaum.', spricht: 'dagegen' },
            { text: 'Millionen sehr verschiedene Menschen spielen Games.', spricht: 'dagegen' },
            { text: '„Alle“ ist prüfbar. Ein Gegenbeispiel reicht.', spricht: 'dagegen' },
          ],
          fairerGedanke: 'Manche Gamer werden laut. „Alle“ ist eine Behauptung – und die ist falsch.',
        },
        abschluss: 'Tatsachen prüft man, Meinungen begründet man. Und dein Kopf? Gedanke ist nicht gleich Tatsache.',
      },
    },
    {
      id: 'j3-e25', jahr: 3, nr: 25, modul: 'j3-m7', modulTitel: 'Meinung und Mitbestimmung',
      titel: 'Streiten, aber fair', joker: false,
      code: 'LASER', skills: ['aus-der-rolle'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Argument-Werkstatt',
        intro: 'Behauptung, Begründung, Beispiel. Bau Argumente, die tragen – und bleib fair.',
        daten: { aufgaben: [
          {
            situation: 'Schwaches Argument: „Die Schule sollte später beginnen, weil es nervt.“ Reparier es.',
            bausteine: ['Die Schule sollte um 9 Uhr beginnen,', 'weil Jugendliche morgens mehr Schlaf brauchen.', 'Empfohlen sind 8 bis 10 Stunden.', 'weil es halt nervt.', 'Punkt, aus.'],
            loesungen: [['Die Schule sollte um 9 Uhr beginnen,', 'weil Jugendliche morgens mehr Schlaf brauchen.', 'Empfohlen sind 8 bis 10 Stunden.']],
            tipp: 'Behauptung – Begründung – Beispiel. Alle drei müssen tragen.',
          },
          {
            situation: 'Killerphrase: „Du hast doch keine Ahnung.“ Sag es fair.',
            bausteine: ['Woher hast du das?', 'Ich habe', 'etwas anderes gelesen.', 'Typisch für euch.', 'Das ist doch Quatsch.'],
            loesungen: [['Woher hast du das?', 'Ich habe', 'etwas anderes gelesen.']],
            tipp: 'Hart in der Sache, fair zur Person.',
          },
          {
            situation: 'Die Gegenseite sagt: Hausaufgaben üben den Stoff. Antworte fair.',
            bausteine: ['Du sagst,', 'Hausaufgaben üben den Stoff.', 'Ich sehe das anders,', 'weil Üben in der Schule besser klappt.', 'Falsch!'],
            loesungen: [['Du sagst,', 'Hausaufgaben üben den Stoff.', 'Ich sehe das anders,', 'weil Üben in der Schule besser klappt.']],
            tipp: 'Erst zusammenfassen, dann widersprechen.',
          },
        ] },
        abschluss: 'Gut gestritten? Dann raus aus der Rolle – und das beste Argument der anderen nennen.',
      },
    },
    {
      id: 'j3-e26', jahr: 3, nr: 26, modul: 'j3-m7', modulTitel: 'Meinung und Mitbestimmung',
      titel: 'Mitbestimmen', joker: false,
      code: 'PILOT', skills: ['fester-stand'], stempel: 'Stimme zählt', heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Die Beteiligungsleiter',
        intro: 'Wer entscheidet wirklich? Bau die Leiter von unten nach oben.',
        daten: { schritte: [
          'Schein: Die Schule fragt nach dem Pausenhof. Die Ergebnisse sieht nie jemand.',
          'Zugewiesen, aber informiert: Ihr räumt den Schulgarten auf und wisst, wozu.',
          'Gefragt und informiert: Die Gemeinde fragt euch und zeigt, was umgesetzt wird.',
          'Gemeinsam entschieden: Der Klassenrat plant den Ausflug mit.',
          'Selbst gestartet: Ihr organisiert ein Fußballturnier in der Pause.',
          'Selbst gestartet, gemeinsam entschieden: eure Idee für einen Ruheraum, mit der Direktion geplant.',
        ] },
        abschluss: 'Es muss nicht immer ganz oben sein. Aber Schein-Beteiligung erkennst du jetzt sofort.',
      },
    },

    // ── Modul 8: Liebe, Sexualität und Einvernehmlichkeit ──
    {
      id: 'j3-e27', jahr: 3, nr: 27, modul: 'j3-m8', modulTitel: 'Liebe, Sexualität und Einvernehmlichkeit',
      titel: 'Respekt in Beziehungen', joker: false,
      code: 'VENUS', skills: ['weiser-geist'], stempel: null, heikel: true,
      mission: {
        typ: 'zonen-sortieren', titel: 'Die Beziehungs-Ampel',
        intro: 'Die Ampel bewertet Verhalten, nicht Menschen. Grün gesund, gelb ungesund, rot Gewalt.',
        daten: { items: [
          { text: 'Beide haben eigene Freunde und Hobbys.', zone: 'gruen', warum: 'Freiraum gehört zu einer guten Beziehung.' },
          { text: 'Ein Nein wird ohne Drama akzeptiert.', zone: 'gruen', warum: 'Respekt heißt: Nein ist okay.' },
          { text: 'Streit, aber fair: Beide sagen, was sie stört.', zone: 'gruen', warum: 'Streiten gehört dazu. Fair ist gesund.' },
          { text: 'Mathis liest heimlich Lenas Nachrichten.', zone: 'gelb', warum: 'Kontrolle ist kein Liebesbeweis. Ansprechen, mit jemandem reden.' },
          { text: 'Ständig kommt: „Wo bist du? Mit wem?“', zone: 'gelb', warum: 'Eifersucht, die einengt. Genauer hinschauen.' },
          { text: 'Nach Streit wird tagelang beleidigt geschwiegen.', zone: 'gelb', warum: 'Schweigen als Strafe ist ungesund.' },
          { text: 'Jemand droht: Sonst zeige ich allen deine Fotos.', zone: 'rot', warum: 'Erpressung ist Gewalt. Hilfe holen ist nie Verrat.' },
          { text: 'Jemand wird von allen Freunden abgeschnitten.', zone: 'rot', warum: 'Isolieren ist Gewalt. Hilfe holen.' },
        ] },
        abschluss: 'Aus Gelb kann Rot werden. Hilfe: SePAS, 116 111 – bei Gefahr 113 oder 112.',
      },
    },
    {
      id: 'j3-e28', jahr: 3, nr: 28, modul: 'j3-m8', modulTitel: 'Liebe, Sexualität und Einvernehmlichkeit',
      titel: 'Ja heißt Ja – Einvernehmlichkeit', joker: false,
      code: 'ORBIT', skills: ['mein-raum-dein-raum'], stempel: null, heikel: true,
      mission: {
        typ: 'paare', titel: 'Die Jacke',
        intro: 'Erst sagt sie Ja zur Jacke. Doch dann: Welches Merkmal eines echten Ja fehlt?',
        daten: { paare: [
          ['„Leih mir die Jacke, sonst erzähl ich was.“ – „Na gut …“', 'Freiwillig'],
          ['Sie sagt nichts und schaut weg.', 'Eindeutig'],
          ['„Gib sie bitte zurück.“ – „Du hast doch Ja gesagt!“', 'Jederzeit zurücknehmbar'],
          ['Sie döst im Halbschlaf. Er nimmt die Jacke einfach.', 'Bei klarem Kopf'],
          ['Er leiht die Jacke – und gibt sie einfach weiter.', 'Nur für genau das'],
        ] },
        abschluss: 'Nur ein Ja ist ein Ja. Unklar heißt: nachfragen. „Ist das okay für dich?“',
      },
    },
    {
      id: 'j3-e29', jahr: 3, nr: 29, modul: 'j3-m8', modulTitel: 'Liebe, Sexualität und Einvernehmlichkeit',
      titel: 'Körper, Sexualität, Vielfalt – gut informiert', joker: false,
      code: 'KOSMOS', skills: ['gegenteil-tun'], stempel: null, heikel: true,
      mission: {
        typ: 'mythos-fakt', titel: 'Wissens-Check',
        intro: 'Wissen statt Halbwissen. Wisch: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Pornos zeigen, wie Sex im echten Leben ist.', fakt: false, erklaerung: 'Pornos sind gespielt und geschnitten. Nachfragen, Schutz und echte Körper fehlen meist.' },
          { text: 'Kondome schützen vor Schwangerschaft und vor vielen Infektionen.', fakt: true, erklaerung: 'Sie schützen vor beidem. Die Pille schützt nur vor Schwangerschaft.' },
          { text: '„Aufpassen“ ist eine sichere Verhütung.', fakt: false, erklaerung: 'Nein. Das ist keine sichere Methode.' },
          { text: 'Jeder Körper entwickelt sich in seinem eigenen Tempo.', fakt: true, erklaerung: 'Früher, später, anders: Das ist normal.' },
          { text: 'Man sieht einem Menschen an, in wen er sich verliebt.', fakt: false, erklaerung: 'Das sieht man niemandem an. Wir raten nicht über andere.' },
          { text: 'Sexuelle Orientierung und geschlechtliche Identität sind dasselbe.', fakt: false, erklaerung: 'Orientierung: in wen man sich verliebt. Identität: welches Geschlecht man selbst ist.' },
          { text: 'Wann und wem jemand von sich erzählt, entscheidet die Person selbst.', fakt: true, erklaerung: 'Coming-out ist freiwillig. Wir outen niemanden.' },
          { text: 'KI-Chatbots sind bei Fragen zu Körper und Sex immer verlässlich.', fakt: false, erklaerung: 'Sie klingen sicher, erfinden aber manchmal. Besser: Planning Familial, Schulärztin, SePAS.' },
        ] },
        abschluss: 'Peinlich ist normal. Fragen ist mutig – anonym in der Fragenbox oder beim Planning Familial.',
      },
    },
    {
      id: 'j3-e30', jahr: 3, nr: 30, modul: 'j3-m8', modulTitel: 'Liebe, Sexualität und Einvernehmlichkeit',
      titel: 'Nudes, Sexting und Erpressung im Netz', joker: false,
      code: 'SCHILD', skills: ['tempo-rausnehmen'], stempel: 'Grenzen-Profi', heikel: true,
      mission: {
        typ: 'szene', titel: 'Du hast zehn Minuten',
        intro: 'Luca bekommt eine Drohung. Du entscheidest, was er tut.',
        daten: { start: 'druck', knoten: {
          druck: { text: 'Ein fremdes Profil schreibt: „Zahl 200 Euro. Sonst geht dein Bild an alle. Du hast zehn Minuten.“', wahl: [
            { text: 'Erst atmen: 4 ein, 6 aus. Füße fest in den Boden.', weiter: 'sichern', folge: 'Bei 80 denkt niemand klar. Erst runter, dann handeln.', punkte: 2 },
            { text: 'Sofort zahlen, damit es aufhört.', weiter: 'sichern', folge: 'Wer zahlt, bekommt meist neue Forderungen.', punkte: 0 },
            { text: 'Alles löschen und hoffen.', weiter: 'sichern', folge: 'Dann fehlen die Beweise. Das Problem bleibt.', punkte: 0 },
          ] },
          sichern: { text: 'Luca ist etwas ruhiger. Was jetzt?', wahl: [
            { text: 'Chat und Profilnamen sichern. Dann blockieren und melden.', weiter: 'hilfe', folge: 'Genau: erst sichern, dann Kontakt abbrechen.', punkte: 2 },
            { text: 'Um mehr Zeit bitten und verhandeln.', weiter: 'hilfe', folge: 'Verhandeln hält den Druck am Laufen.', punkte: 0 },
            { text: 'Zurückdrohen.', weiter: 'hilfe', folge: 'Das macht es meist schlimmer.', punkte: 0 },
          ] },
          hilfe: { text: 'Luca schämt sich. Er will es niemandem sagen.', wahl: [
            { text: 'Einer Vertrauensperson sagen. Du bist nicht schuld.', weiter: null, folge: 'Schuld hat, wer erpresst. Mit Hilfe wird der Druck kleiner.', punkte: 2 },
            { text: 'BEE SECURE Helpline 8002 1234 oder Polizei 113 anrufen.', weiter: null, folge: 'Fachleute kennen solche Fälle und wissen, was zu tun ist.', punkte: 2 },
            { text: 'Allein aussitzen.', weiter: null, folge: 'Allein wird der Druck immer größer. Hol dir Hilfe.', punkte: 0 },
          ] },
        } },
        abschluss: 'Erst atmen, dann Hilfe holen, dann handeln. Du bist nicht schuld.',
      },
    },

    // ── Modul 9: Medien und KI ──
    {
      id: 'j3-e31', jahr: 3, nr: 31, modul: 'j3-m9', modulTitel: 'Medien und KI',
      titel: 'Algorithmen und Filterblasen', joker: false,
      code: 'SIGNAL', skills: ['aufmerksamkeit-zurueck'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Wie eine Blase wächst',
        intro: 'Mila schaut ein Streit-Video zweimal. Bring die Kette in die richtige Reihenfolge.',
        daten: { schritte: [
          'Mila schaut ein Streit-Video bis zum Ende – zweimal.',
          'Der Feed misst: lange hingeschaut, nochmal geschaut.',
          'Er zeigt ihr mehr Streit-Videos.',
          'Andere Themen tauchen seltener auf.',
          'Ihr Feed wird eng: eine Filterblase.',
          'Mila tippt „Nicht interessiert“ und sucht bewusst Neues.',
        ] },
        abschluss: 'Der Feed misst, wie lange du hinschaust. Nicht, ob es dir guttut. Du kannst gegensteuern.',
      },
    },
    {
      id: 'j3-e32', jahr: 3, nr: 32, modul: 'j3-m9', modulTitel: 'Medien und KI',
      titel: 'KI klug nutzen', joker: false,
      code: 'PIXEL', skills: ['achtsames-hoeren'], stempel: 'Durchblick', heikel: false,
      mission: {
        typ: 'zonen-sortieren', titel: 'Die KI-Ampel',
        intro: 'Lernhilfe, Absprache oder Schummeln? Grün geht, gelb nur nach Absprache, rot nie.',
        daten: { items: [
          { text: 'Die KI erklärt dir Brüche noch einmal anders.', zone: 'gruen', warum: 'Erklären lassen, bis du es verstehst: Lernhilfe.' },
          { text: 'Die KI fragt dich Vokabeln ab.', zone: 'gruen', warum: 'Abfragen vor dem Test: starke Lernhilfe.' },
          { text: 'Die KI findet Fehler in deinem eigenen Text.', zone: 'gruen', warum: 'Dein Text, deine Arbeit. Die KI korrigiert nur.' },
          { text: 'Die KI sammelt Ideen für dein Referat.', zone: 'gelb', warum: 'Geht oft – aber frag vorher, was erlaubt ist.' },
          { text: 'Die KI übersetzt deine Hausaufgabe ins Französische.', zone: 'gelb', warum: 'Nur nach Absprache. Sonst lernst du nichts.' },
          { text: 'Die KI schreibt deinen Aufsatz. Du gibst ihn als deinen ab.', zone: 'rot', warum: 'Das ist Schummeln. Und gelernt hast du nichts.' },
          { text: 'Du lädst ein Foto deiner Freundin in eine KI-App.', zone: 'rot', warum: 'Fotos und Namen anderer gehören nie in eine KI-App.' },
          { text: 'Du machst aus Spaß ein Fake-Video von Elias.', zone: 'rot', warum: 'Deepfakes verletzen und können strafbar sein. Hilfe: BEE SECURE 8002 1234.' },
        ] },
        abschluss: 'KI klingt immer sicher – auch wenn sie erfindet. Prüfen, ehrlich bleiben, Daten schützen.',
      },
    },

    // ── Modul 10: Abschluss ──
    {
      id: 'j3-e33', jahr: 3, nr: 33, modul: 'j3-m10', modulTitel: 'Abschluss',
      titel: 'Mein Skills-Buch', joker: false,
      code: 'ATLAS', skills: ['satz-im-ausatmen'], stempel: null, heikel: false,
      mission: {
        typ: 'satz-bauen', titel: 'Sätze für die Hosentasche',
        intro: 'Ein guter Satz ist kurz, wahr, deiner und freundlich. Bau Sätze, die tragen.',
        daten: { aufgaben: [
          {
            situation: 'Ein richtig schlechter Tag. Welcher Satz trägt wirklich?',
            bausteine: ['Das ist schwer,', 'und ich habe', 'schon Schwereres geschafft.', 'Alles wird gut.', 'Stell dich nicht so an.'],
            loesungen: [['Das ist schwer,', 'und ich habe', 'schon Schwereres geschafft.']],
            tipp: '„Alles wird gut“ klingt nett. Aber ist es wahr?',
          },
          {
            situation: 'Morgen ist dein erster Tag im neuen Betrieb.',
            bausteine: ['Ich muss', 'nicht alles wissen.', 'Ich darf', 'fragen.', 'Die finden mich sicher blöd.'],
            loesungen: [['Ich muss', 'nicht alles wissen.', 'Ich darf', 'fragen.'], ['Ich darf', 'fragen.', 'Ich muss', 'nicht alles wissen.']],
            tipp: 'Kurz genug für einen Atemzug.',
          },
          {
            situation: 'Dein Ziel hat einen Rückschlag bekommen.',
            bausteine: ['Umwege', 'sind auch', 'Wege.', 'Ich gebe auf.', 'Immer ich.'],
            loesungen: [['Umwege', 'sind auch', 'Wege.']],
            tipp: 'Ein Satz aus dem Skills-Buch – Modul Zukunft und Beruf.',
          },
        ] },
        abschluss: 'Dein Satz passt in einen Atemzug. Ein – und aus mit deinem Satz.',
      },
    },
    {
      id: 'j3-e34', jahr: 3, nr: 34, modul: 'j3-m10', modulTitel: 'Abschluss',
      titel: 'Brücken in die Zukunft', joker: false,
      code: 'ABFLUG', skills: ['unsichtbare-skills'], stempel: null, heikel: false,
      mission: {
        typ: 'zonen-sortieren', titel: 'Ampel-Check nach dem Sommer',
        intro: 'Nach einem Wechsel rutscht es oft langsam. Grün, gelb oder rot?',
        daten: { items: [
          { text: 'Du schläfst gut und freust dich auf den Betrieb.', zone: 'gruen', warum: 'Beibehalten, was hilft: Training, Freunde, Schlaf.' },
          { text: 'In der neuen Klasse hast du jemanden zum Reden.', zone: 'gruen', warum: 'Eine Brücke steht. Pflege sie!' },
          { text: 'Neuer Ort – aber deine Skills sind in der Tasche.', zone: 'gruen', warum: 'Unsichtbare Skills sieht niemand. Sie wirken trotzdem.' },
          { text: 'Seit zwei Wochen verbringst du jede Pause allein.', zone: 'gelb', warum: 'Frühzeichen. Jetzt deinen Wenn-dann-Plan nutzen.' },
          { text: 'Du schläfst immer weniger.', zone: 'gelb', warum: 'Gelb: Sag deiner Brücken-Person Bescheid.' },
          { text: 'Du hattest den ersten Fehltag – ohne krank zu sein.', zone: 'gelb', warum: 'Nicht warten. Erzähl jemandem, was los ist.' },
          { text: 'Du denkst: Alles ist sinnlos. Nichts hilft mehr.', zone: 'rot', warum: 'Rot: Dein Sicherheitsplan gilt. Hilfe holen – 116 111, Notruf 112.' },
        ] },
        abschluss: 'Meist kippt es nicht an einem Tag. Wer Gelb früh merkt, bleibt auf der Brücke.',
      },
    },
    {
      id: 'j3-e35', jahr: 3, nr: 35, modul: 'j3-m10', modulTitel: 'Abschluss',
      titel: 'Abschied nach drei Jahren', joker: false,
      code: 'ZENIT', skills: ['wegstein'], stempel: 'Skills-Legende', heikel: false,
      mission: {
        typ: 'schaetzen', titel: 'Drei Jahre in Zahlen',
        intro: 'Drei Jahre Skills-Kurs – weißt du noch? Schätz mit dem Regler!',
        daten: { fragen: [
          { text: 'Wie viele Einheiten hat der Skills-Kurs in drei Jahren – mit Jokern?', min: 0, max: 200, richtig: 117, einheit: 'Einheiten', erklaerung: '3 × 39 = 117. Jede mit einem eigenen Skill.' },
          { text: 'Wie viele Minuten dauert eine Einheit?', min: 0, max: 180, richtig: 100, einheit: 'Minuten', erklaerung: '100 Minuten: Check-in, Übung, Skill, Réckbléck.' },
          { text: 'Wie viele Fächer hat der Skills-Koffer?', min: 0, max: 10, richtig: 5, einheit: 'Fächer', erklaerung: 'Körper, Atem, Sinne, Kopf, Menschen und Handeln.' },
          { text: 'Ab welcher Zahl beginnt auf der Anspannungsskala Rot?', min: 0, max: 100, richtig: 70, einheit: '', erklaerung: 'Ab 70: kein Reden, keine Kopf-Skills. Erst Körper, Atem, Sinne.' },
        ] },
        abschluss: 'Drei Jahre, ein Koffer voller Skills. Und ein Stein in der Tasche für deinen Weg.',
      },
    },

    // ── Joker-Einheiten ──
    {
      id: 'j3-j01', jahr: 3, nr: 1, modul: 'joker', modulTitel: 'Joker',
      titel: 'Betriebsbesuch mit Auftrag', joker: true,
      code: 'REISE', skills: ['anker-vor-der-tuer', 'spaziergang-ohne-worte'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Forscherauftrag im Betrieb',
        intro: 'Du besuchst einen echten Betrieb. Du entscheidest, wie du auftrittst.',
        daten: { start: 'tuer', knoten: {
          tuer: { text: 'Vor der Werkstatt-Tür. Dein Herz klopft. Gleich öffnet die Fachkraft.', wahl: [
            { text: 'Füße spüren, einmal lang aus. Dann klopfen.', weiter: 'frage', folge: 'Anker gesetzt. Du trittst ruhig ein.', punkte: 2 },
            { text: 'Jemand anderen vorschieben. Soll der klopfen.', weiter: 'frage', folge: 'Klappt auch. Aber die Probe verpasst du.', punkte: 1 },
            { text: 'Schnell aufs Handy schauen, bis jemand kommt.', weiter: 'frage', folge: 'Erster Eindruck: abgelenkt. Schade.', punkte: 0 },
          ] },
          frage: { text: 'Du stellst deine Frage. Die Fachkraft antwortet mit einem Satz und schaut aufs Handy.', wahl: [
            { text: 'Nachfragen: Können Sie ein Beispiel geben?', weiter: 'rueck', folge: 'Nachfragen zeigt Interesse. Sie legt das Handy weg.', punkte: 2 },
            { text: 'Nichts mehr sagen.', weiter: 'rueck', folge: 'Verständlich. Aber so erfährst du wenig.', punkte: 1 },
            { text: 'Sagen: Sie hören ja gar nicht zu.', weiter: 'rueck', folge: 'Ehrlich, aber zu scharf. Die Stimmung kühlt ab.', punkte: 0 },
          ] },
          rueck: { text: 'Plötzlich fragt sie zurück: „Und was willst du mal werden?“', wahl: [
            { text: 'Weiß ich noch nicht genau. Aber Anpacken gibt mir Energie.', weiter: null, folge: 'Ehrlich und konkret. Das kommt gut an.', punkte: 2 },
            { text: 'Keine Ahnung.', weiter: null, folge: 'Geht. Ein Satz mehr hätte gezeigt, wer du bist.', punkte: 1 },
            { text: 'Deshalb bin ich hier: Wie haben Sie angefangen?', weiter: null, folge: 'Clever zurückgefragt. Sie erzählt von ihrem Umweg.', punkte: 2 },
          ] },
        } },
        abschluss: 'Füße, Atem, Satz – dann klopfen. Danach fünf Minuten schweigend sortieren.',
      },
    },
    {
      id: 'j3-j02', jahr: 3, nr: 2, modul: 'joker', modulTitel: 'Joker',
      titel: 'Ein Menü für unsere Gäste', joker: true,
      code: 'STERNE', skills: ['pannen-stopp', 'durchatmen-vor-gaesten'], stempel: null, heikel: false,
      mission: {
        typ: 'reihenfolge', titel: 'Zeitplan rückwärts',
        intro: 'In 45 Minuten kommen die Gäste. Bring den Küchenplan in die richtige Reihenfolge.',
        daten: { schritte: [
          'Hände waschen, Schürzen an, Plan lesen.',
          'Ofen an, Gemüse schneiden.',
          'Nachtisch vorbereiten und kalt stellen.',
          'Tisch decken.',
          'Vorspeise anrichten, Küche grob aufräumen.',
          'Durchatmen und Rollen-Check. Dann klingelt es.',
        ] },
        abschluss: 'Rückwärts planen heißt: vom Ziel aus denken. Und wenn etwas anbrennt: Pannen-Stopp.',
      },
    },
    {
      id: 'j3-j03', jahr: 3, nr: 3, modul: 'joker', modulTitel: 'Joker',
      titel: 'Debattier-Turnier', joker: true,
      code: 'TURBO', skills: ['frust-check'], stempel: null, heikel: false,
      mission: {
        typ: 'szene', titel: 'Das Blitz-Finale',
        intro: 'Finale im Debattier-Turnier! Du entscheidest in drei Momenten.',
        daten: { start: 'los', knoten: {
          los: { text: 'Du ziehst Contra: „Hausaufgaben abschaffen.“ Privat bist du eigentlich dafür.', wahl: [
            { text: 'Ich vertrete Contra trotzdem – mit Grund und Beispiel.', weiter: 'angriff', folge: 'Genau das ist Debattieren. Respekt!', punkte: 2 },
            { text: 'Ich spiele Contra, aber ohne Beispiel.', weiter: 'angriff', folge: 'Die Behauptung steht. Das Beispiel fehlt.', punkte: 1 },
            { text: 'Ich sage: Das kann ich nicht, ich denke anders.', weiter: 'angriff', folge: 'Verständlich. Aber im Turnier gilt die geloste Seite.', punkte: 0 },
          ] },
          angriff: { text: 'Die Gegenseite ruft: „Ihr habt doch keine Ahnung!“', wahl: [
            { text: 'Ich fasse zusammen, was sie meinen. Dann widerspreche ich.', weiter: 'jury', folge: 'Hart in der Sache, fair zur Person.', punkte: 2 },
            { text: 'Ich bleibe ruhig und schaue zur Jury.', weiter: 'jury', folge: 'Ruhig geblieben. Jetzt fehlt nur dein Argument.', punkte: 1 },
            { text: 'Ich rufe: Selber keine Ahnung!', weiter: 'jury', folge: 'Killerphrase gegen Killerphrase. Die Jury notiert es.', punkte: 0 },
          ] },
          jury: { text: 'Die Jury: 3 zu 2 für die anderen. Dein Frust: 8 von 10.', wahl: [
            { text: 'Frust-Check: lang aus, Schultern fallen lassen. Dann: Gut argumentiert!', weiter: null, folge: 'Verloren hat eine Position. Nicht du.', punkte: 2 },
            { text: 'Ich frage die Jury nach einem Tipp.', weiter: null, folge: 'Nachfragen ist erlaubt. So wirst du besser.', punkte: 2 },
            { text: 'Ich schimpfe über die Jury und gehe raus.', weiter: null, folge: 'Ärger darf sein. Und zurückkommen ist auch ein Skill.', punkte: 0 },
          ] },
        } },
        abschluss: 'Ärger darf da sein. Fairness gewinnt trotzdem.',
      },
    },
    {
      id: 'j3-j04', jahr: 3, nr: 4, modul: 'joker', modulTitel: 'Joker',
      titel: 'Plan B für unruhige und müde Tage', joker: true,
      code: 'AKKU', skills: ['minute-stille', 'seufzer-atmung'], stempel: null, heikel: false,
      mission: {
        typ: 'mythos-fakt', titel: 'Energie-Mythen',
        intro: 'Aufgedreht oder leerer Akku? Wisch jede Karte: Mythos oder Fakt?',
        daten: { karten: [
          { text: 'Länger ausatmen als einatmen bremst den Körper.', fakt: true, erklaerung: 'Langes Ausatmen sagt dem Körper: Du darfst runterfahren.' },
          { text: 'Wer müde ist, braucht immer nur Ruhe.', fakt: false, erklaerung: 'Oft hilft auch Bewegung. Eine Staffel weckt leere Akkus.' },
          { text: 'Einen Atem-Skill merken sofort alle.', fakt: false, erklaerung: 'Der doppelte Atemzug geht leise. Im Bus, vor der Prüfung.' },
          { text: 'Wird dir beim Atmen schwindlig, atmest du einfach normal weiter.', fakt: true, erklaerung: 'Weniger Runden, mehr Pausen: völlig okay.' },
          { text: 'Eine Minute Stille ist verschwendete Zeit.', fakt: false, erklaerung: 'Stille kann Energie ordnen. Hand hoch, wenn der Ton weg ist.' },
          { text: 'Teamspiele können eine aufgedrehte Gruppe sammeln.', fakt: true, erklaerung: 'Wer sich absprechen muss, wird wach und ruhiger zugleich.' },
          { text: 'Deine Energie kannst du ein Stück selbst steuern.', fakt: true, erklaerung: 'Bewegung, Stille, Atem: Du hast mehrere Regler.' },
        ] },
        abschluss: 'Aufgedreht oder leer: Für beides gibt es einen Plan B.',
      },
    },
  ]);

  /* ───────────────────────── KAMPF-SITUATIONEN (Module Jahr 3) ───────────────────────── */
  SK.addSituations([
    // Modul 0 – Ankommen
    {
      id: 'j3-neu-im-kurs', modul: 'j3-m0', titel: 'Neu im letzten Kursjahr',
      text: 'Alle kennen sich seit zwei Jahren. Du bist heute zum ersten Mal dabei.',
      start: 55,
      wellen: [
        { text: 'Alle lachen über Insider aus Jahr 1.', plus: 8 },
        { text: 'Die Leitung sagt: Jeder zeigt heute seinen Lieblingsskill.', plus: 12 },
        { text: 'Alle schauen zu dir. Du kennst keinen Skill.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich sage: Ich bin neu. Zeigt mir einen?', gut: true, folge: 'Jemand leitet die Kastenatmung an. Du machst einfach mit.' },
        { text: 'Ich frage die Person neben mir nach ihrem Lieblingsskill.', gut: true, folge: 'Ein Satz – und du bist nicht mehr allein.' },
        { text: 'Ich sage: Skills sind Kinderkram.', gut: false, folge: 'Kurz cool. Dann bist du draußen.' },
        { text: 'Ich gehe aufs Klo, bis es vorbei ist.', gut: false, folge: 'Sicher, aber verpasst. Nächstes Mal ist es noch schwerer.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-radar-vergleich', modul: 'j3-m0', titel: 'Radar-Vergleich',
      text: 'Dein Skills-Radar liegt vor dir. Bei „Runterkommen“ steht eine 1.',
      start: 45,
      wellen: [
        { text: 'Diogo schnappt sich dein Blatt: Zeig mal!', plus: 12 },
        { text: 'Er lacht: Bei dir ist ja alles ganz innen.', plus: 15 },
        { text: 'Zwei andere drehen sich um.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich nehme das Blatt zurück: Das ist privat.', gut: true, folge: 'Klar und ruhig. Diogo gibt es zurück.' },
        { text: 'Ich sage: Das ist mein Stand heute. Ich bin unterwegs.', gut: true, folge: 'Da gibt es nichts mehr zu lachen.' },
        { text: 'Ich zerknülle das Radar.', gut: false, folge: 'Das Blatt ist weg – und dein Startpunkt auch.' },
        { text: 'Ich lache mit und mache mich selbst fertig.', gut: false, folge: 'Die anderen lachen weiter. Du fühlst dich mies.' },
      ],
      heikel: false,
    },

    // Modul 1 – Werte und Identität
    {
      id: 'j3-akzent', modul: 'j3-m1', titel: 'Akzent nachgemacht',
      text: 'Du liest im Unterricht auf Französisch vor. Deine Aussprache klingt anders.',
      start: 55,
      wellen: [
        { text: 'Zwei in der letzten Reihe kichern.', plus: 8 },
        { text: 'Einer macht deinen Akzent nach.', plus: 15 },
        { text: 'Die halbe Klasse lacht.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich richte mich auf und lese weiter.', gut: true, folge: 'Scham will, dass du dich versteckst. Du machst das Gegenteil.' },
        { text: 'Nach der Stunde sage ich ruhig: Das war nicht okay.', gut: true, folge: 'Klar gesagt, ohne Show. Das wirkt.' },
        { text: 'Ich sage nie wieder etwas im Unterricht.', gut: false, folge: 'Sicher – aber deine Stimme fehlt.' },
        { text: 'Ich mache seine Sprache fies nach.', gut: false, folge: 'Jetzt lachen alle über alle. Keiner gewinnt.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-reich-kurs', modul: 'j3-m1', titel: 'Der Reich-Kurs',
      text: 'Ein Video: „Mit 19 reich. Mein Kurs – nur heute 499 Euro.“',
      start: 45,
      wellen: [
        { text: 'Ein Timer im Video: noch 10 Minuten.', plus: 10 },
        { text: 'Dein Kumpel schreibt: Komm, wir teilen uns den Kurs!', plus: 10 },
        { text: 'In den Kommentaren: Hab schon 5000 Euro verdient!', plus: 10 },
      ],
      handeln: [
        { text: 'Ich checke: Wer verdient hier woran?', gut: true, folge: 'Klar: Reich wird vor allem er.' },
        { text: 'Ich schlafe eine Nacht drüber.', gut: true, folge: 'Am nächsten Tag ist das „Nur heute“-Angebot wieder da.' },
        { text: 'Ich kaufe sofort, bevor es weg ist.', gut: false, folge: '499 Euro weg. Das Video läuft einfach weiter.' },
        { text: 'Ich leihe mir Geld, um mitzumachen.', gut: false, folge: 'Jetzt hast du Schulden. Und keinen Plan.' },
      ],
      heikel: false,
    },

    // Modul 2 – Entscheidungen und Verantwortung
    {
      id: 'j3-bruecke', modul: 'j3-m2', titel: 'Die Brücke',
      text: 'Sommer am Fluss. Alle springen von der Brücke. Wie tief das Wasser ist, weiß keiner.',
      start: 55,
      wellen: [
        { text: 'Drei sind schon gesprungen.', plus: 8 },
        { text: 'Alle rufen deinen Namen.', plus: 12 },
        { text: 'Jemand filmt schon.', plus: 10 },
      ],
      handeln: [
        { text: 'Stopp, Schritt zurück: Lass mal, ich brauch meine Knochen noch.', gut: true, folge: 'Ein paar lachen. Du lachst mit – und bleibst heil.' },
        { text: 'Ich frage: Wer kennt die Tiefe? Sonst springe ich nicht.', gut: true, folge: 'Gute Frage. Plötzlich zögern auch andere.' },
        { text: 'Ich springe, damit endlich Ruhe ist.', gut: false, folge: 'Diesmal ging es gut. Das Risiko war trotzdem riesig.' },
        { text: 'Ich denke: Mir passiert schon nichts.', gut: false, folge: 'Das Gaspedal drückt. Die Bremse bleibt aus.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-tasche', modul: 'j3-m2', titel: 'Die Tasche',
      text: 'Ein Kumpel drückt dir eine Tasche in die Hand. Du sollst sie aufbewahren.',
      start: 50,
      wellen: [
        { text: 'Er sagt: Frag nicht, was drin ist.', plus: 10 },
        { text: 'Er wird ungeduldig: Bist du mein Freund oder nicht?', plus: 12 },
        { text: 'Er schaut sich nervös um.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich sage: Ohne zu wissen, was drin ist – nein.', gut: true, folge: 'Er ist sauer. Aber du trägst kein fremdes Risiko.' },
        { text: 'Ich gebe sie zurück und rede später mit einer erwachsenen Person.', gut: true, folge: 'Klug: Du holst dir Rat, bevor es ernst wird.' },
        { text: 'Ich nehme sie. Er ist ja mein Freund.', gut: false, folge: 'Jetzt trägst du ein Risiko, das du nicht kennst.' },
        { text: 'Ich schaue heimlich rein.', gut: false, folge: 'Jetzt weißt du mehr – und steckst tiefer drin.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-heimweg', modul: 'j3-m2', titel: 'Der letzte Bus ist weg',
      text: 'Nach einer Feier. Der letzte Bus ist weg. Rui will euch fahren – er hat getrunken.',
      start: 55,
      wellen: [
        { text: 'Rui ruft: Steigt ein, ich bin total fit!', plus: 10 },
        { text: 'Die anderen steigen schon ein.', plus: 12 },
        { text: 'Es regnet. Dein Akku: 5 Prozent.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich steige nicht ein und rufe jemanden an, der mich abholt.', gut: true, folge: 'Nicht fahren, nicht einsteigen. Du kommst sicher heim.' },
        { text: 'Ich sage: Wir gehen zusammen zu Fuß oder nehmen ein Taxi.', gut: true, folge: 'Zwei steigen wieder aus. Du bist nicht allein.' },
        { text: 'Ich steige ein. Wird schon gutgehen.', gut: false, folge: 'Alkohol bremst die Reaktion, bevor man es merkt. Sehr riskant.' },
        { text: 'Ich sage nichts und hoffe.', gut: false, folge: 'Die Angst fährt mit. Das Risiko auch.' },
      ],
      heikel: true,
    },

    // Modul 3 – Zukunft und Beruf
    {
      id: 'j3-vor-der-tuer', modul: 'j3-m3', titel: 'Vor der Tür',
      text: 'Vorstellungsgespräch in der Werkstatt. Du sitzt im Warteraum.',
      start: 60,
      wellen: [
        { text: 'Die Person vor dir kommt raus. Sie sieht fertig aus.', plus: 10 },
        { text: 'Dein Kopf ist plötzlich leer.', plus: 12 },
        { text: 'Die Tür geht auf: Der Nächste, bitte!', plus: 10 },
      ],
      handeln: [
        { text: 'Füße spüren, lang ausatmen. Dann klopfen und den ersten Satz sagen.', gut: true, folge: 'Die zwei Sekunden vorher gehören dir. Es läuft.' },
        { text: 'Ich sage ehrlich: Ich bin etwas nervös.', gut: true, folge: 'Der Chef nickt. Das kennt er. Das Gespräch wird locker.' },
        { text: 'Ich gehe einfach nach Hause.', gut: false, folge: 'Erst Erleichterung. Dann Ärger über die verpasste Chance.' },
        { text: 'Ich spiele den Coolen und kaue Kaugummi.', gut: false, folge: 'Wirkt desinteressiert. Schade um deine Stärken.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-absage', modul: 'j3-m3', titel: 'Die dritte Absage',
      text: 'Wieder eine Mail: „Leider müssen wir Ihnen absagen.“ Es ist schon die dritte.',
      start: 50,
      wellen: [
        { text: 'Im Chat postet jemand: Hab meinen Lehrvertrag!', plus: 10 },
        { text: 'Dein Kopf: Mich nimmt eh keiner.', plus: 12 },
        { text: 'Die nächste Frist endet in einer Woche.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich schicke morgen zwei neue Bewerbungen. Mein Plan B läuft.', gut: true, folge: 'Rückschläge gehören dazu. Du bleibst dran.' },
        { text: 'Ich frage den Betrieb, was ich besser machen kann.', gut: true, folge: 'Mutig. Die Antwort hilft bei der nächsten Bewerbung.' },
        { text: 'Ich lösche alle Bewerbungen und gebe auf.', gut: false, folge: 'Kurz Ruhe. Aber das Ziel rückt weit weg.' },
        { text: 'Ich schreibe dem Betrieb eine wütende Mail.', gut: false, folge: 'Die Tür dort ist jetzt zu.' },
      ],
      heikel: false,
    },

    // Modul 4 – Selbstständig werden
    {
      id: 'j3-nur-heute', modul: 'j3-m4', titel: 'Nur heute: minus 50 Prozent',
      text: 'Die Sneaker, die du willst. Heute nur die Hälfte. Auf dem Konto: 25 Euro.',
      start: 45,
      wellen: [
        { text: 'Push-Nachricht: Nur noch 2 Stück!', plus: 10 },
        { text: 'Der Countdown zeigt 9 Minuten.', plus: 10 },
        { text: 'Die App bietet an: Jetzt kaufen, später zahlen.', plus: 12 },
      ],
      handeln: [
        { text: 'Kauf-Stopp: Warenkorb stehen lassen, morgen entscheiden.', gut: true, folge: 'Willst du sie morgen noch, ist es eine Entscheidung.' },
        { text: 'Ich frage mich: Brauche ich das – oder will ich das?', gut: true, folge: 'Ehrliche Antwort: Wollen. Das Geld bleibt für Wichtiges.' },
        { text: 'Ich kaufe mit „später zahlen“.', gut: false, folge: 'Sieht billig aus. Mit Gebühren wird es teuer.' },
        { text: 'Ich leihe mir den Rest von einer Freundin.', gut: false, folge: 'Jetzt fehlt dir Geld – und die Freundin wartet.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-sosse-brennt', modul: 'j3-m4', titel: 'Die Soße brennt an',
      text: 'Ihr kocht für Gäste. In zehn Minuten klingelt es.',
      start: 55,
      wellen: [
        { text: 'Es riecht verbrannt.', plus: 10 },
        { text: 'Jemand ruft: Wer war das?!', plus: 12 },
        { text: 'Es klingelt. Die ersten Gäste sind da.', plus: 12 },
      ],
      handeln: [
        { text: 'Pannen-Stopp: Herd kleiner, lang ausatmen, sagen, was los ist.', gut: true, folge: 'Aus einem kleinen Fehler wird kein großer.' },
        { text: 'Wir retten, was geht, und sagen den Gästen ehrlich Bescheid.', gut: true, folge: 'Die Gäste lachen mit. Der Abend wird trotzdem gut.' },
        { text: 'Ich schreie den Koch an.', gut: false, folge: 'Jetzt brennt die Soße und die Stimmung.' },
        { text: 'Ich lasse alles stehen und gehe.', gut: false, folge: 'Das Team steht allein da. Der Abend kippt.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-bruder-geld', modul: 'j3-m4', titel: 'Schon wieder leihen?',
      text: 'Dein großer Bruder will 20 Euro. Die letzten 40 hat er nie zurückgezahlt.',
      start: 50,
      wellen: [
        { text: 'Er sagt: Stell dich nicht so an.', plus: 10 },
        { text: 'Er sagt: Du hast doch eh genug.', plus: 10 },
        { text: 'Im Flur ruft jemand: Hört auf zu streiten!', plus: 8 },
      ],
      handeln: [
        { text: 'Ich sage ruhig: Erst die 40 zurück. Dann reden wir.', gut: true, folge: 'Klar und fair. Er murrt – aber er weiß, woran er ist.' },
        { text: 'Ich rede später mit einer erwachsenen Person darüber.', gut: true, folge: 'Du musst das nicht allein klären.' },
        { text: 'Ich gebe ihm das Geld, damit Ruhe ist.', gut: false, folge: 'Ruhe für heute. Dein Sparziel rückt weiter weg.' },
        { text: 'Ich nehme mir heimlich etwas von seinem Geld.', gut: false, folge: 'Jetzt ist der Streit doppelt so groß.' },
      ],
      heikel: true,
    },

    // Modul 5 – Schwere Gefühle
    {
      id: 'j3-tiago-treppe', modul: 'j3-m5', titel: 'Tiago auf der Treppe',
      text: 'Tiagos Avô ist gestorben. In der Pause sitzt er allein auf der Treppe.',
      start: 45,
      wellen: [
        { text: 'Du willst hin, weißt aber nicht, was du sagen sollst.', plus: 10 },
        { text: 'Die anderen laufen einfach vorbei.', plus: 8 },
        { text: 'Er schaut kurz hoch. Dann wieder weg.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich setze mich dazu: Es tut mir leid. Ich bin da.', gut: true, folge: 'Mehr braucht es oft nicht. Er nimmt einen Kopfhörer raus.' },
        { text: 'Ich schreibe ihm später: Hab heute an dich gedacht.', gut: true, folge: 'Kleine Nachricht, große Wirkung. Er fühlt sich nicht vergessen.' },
        { text: 'Ich sage: Kopf hoch, das wird schon wieder.', gut: false, folge: 'Gut gemeint. Klingt aber, als müsste die Trauer schnell weg.' },
        { text: 'Ich gehe ihm lieber aus dem Weg.', gut: false, folge: 'Für Trauernde fühlt sich das oft wie Ausschluss an.' },
      ],
      heikel: true,
    },
    {
      id: 'j3-screenshot', modul: 'j3-m5', titel: 'Der Screenshot',
      text: 'Du hast einen Screenshot aus Zoés Chat in die Klassengruppe gestellt.',
      start: 55,
      wellen: [
        { text: 'Zoé schreibt: Warum machst du so was?', plus: 10 },
        { text: 'Alle lesen mit. Keiner schreibt mehr.', plus: 10 },
        { text: 'Dein Kopf: Ich bin ein mieser Mensch.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich lösche den Screenshot und entschuldige mich bei Zoé.', gut: true, folge: 'Schuld, die handelt. Das Vertrauen kann wieder wachsen.' },
        { text: 'Ich schreibe in die Gruppe: Das war falsch von mir.', gut: true, folge: 'Mutig. Die Scham-Spirale stoppt hier.' },
        { text: 'Ich blockiere Zoé. War doch nur Spaß.', gut: false, folge: 'Jetzt reden erst recht alle darüber.' },
        { text: 'Ich bleibe morgen zu Hause.', gut: false, folge: 'Verstecken macht die Scham größer, nicht kleiner.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-kantine', modul: 'j3-m5', titel: 'Allein in der Kantine',
      text: 'Neues Lycée. Mittagspause. Du stehst mit deinem Tablett da.',
      start: 50,
      wellen: [
        { text: 'Alle Tische sind voll mit Grüppchen.', plus: 8 },
        { text: 'Jemand stellt seine Tasche auf den freien Platz.', plus: 12 },
        { text: 'Dein Kopf: Niemand will mich dabeihaben.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich frage an einem Tisch: Ist hier noch frei?', gut: true, folge: '„Klar.“ Ein Satz – und du sitzt mittendrin.' },
        { text: 'Ich setze mich zu Amira, die auch allein ist.', gut: true, folge: 'Zwei weniger allein. Ihr redet über das Essen.' },
        { text: 'Ich esse ab jetzt immer draußen allein.', gut: false, folge: 'Schützt kurz. Aber so kommt niemand an dich ran.' },
        { text: 'Ich scrolle so, als wäre ich beschäftigt.', gut: false, folge: 'Sieht beschäftigt aus. Fühlt sich einsam an.' },
      ],
      heikel: false,
    },

    // Modul 6 – Resilienz und Hilfe
    {
      id: 'j3-jetzt-nicht', modul: 'j3-m6', titel: '„Jetzt nicht“',
      text: 'Seit Wochen kommst du in Mathe nicht mit. Endlich fragst du die Lehrerin.',
      start: 55,
      wellen: [
        { text: 'Sie sagt: Jetzt nicht, ich muss zum Kopierer.', plus: 12 },
        { text: 'Sie ist schon halb aus der Tür.', plus: 8 },
        { text: 'Dein Kopf: Wusste ich es. Bringt eh nichts.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich frage: Wann hätten Sie Zeit? Ich brauche Hilfe.', gut: true, folge: 'Sie bleibt stehen: Morgen in der Pause. Termin steht.' },
        { text: 'Ich gehe zu einer anderen Vertrauensperson oder zum SePAS.', gut: true, folge: 'Ein Nein heißt nicht: nie. Es gibt mehr als eine Tür.' },
        { text: 'Ich frage nie wieder jemanden.', gut: false, folge: 'Der Test kommt trotzdem. Allein wird es schwerer.' },
        { text: 'Ich knalle die Tür zu.', gut: false, folge: 'Jetzt geht es um die Tür. Nicht um Mathe.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-alles-mies', modul: 'j3-m6', titel: 'Alles mies heute',
      text: 'Regen, schlechte Note, Bus verpasst. Du liegst auf dem Bett.',
      start: 50,
      wellen: [
        { text: 'Im Kopf läuft nur noch die schlechte Note.', plus: 10 },
        { text: 'Im Feed haben alle anderen einen tollen Tag.', plus: 10 },
        { text: 'Dein Kopf: Bei mir läuft einfach alles schief.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich schreibe drei gute Momente von heute auf.', gut: true, folge: 'Da war mehr als der schwarze Punkt. Der Blick wird weiter.' },
        { text: 'Ich schreibe jemandem Danke für etwas Kleines.', gut: true, folge: 'Die Antwort kommt schnell. Das tut beiden gut.' },
        { text: 'Ich scrolle bis nachts, um nichts zu fühlen.', gut: false, folge: 'Morgen bist du müde. Und die Note ist noch da.' },
        { text: 'Ich lasse meinen Frust an der nächsten Person aus.', gut: false, folge: 'Jetzt gibt es zwei schlechte Tage.' },
      ],
      heikel: false,
    },

    // Modul 7 – Meinung und Mitbestimmung
    {
      id: 'j3-klassenrat', modul: 'j3-m7', titel: 'Dein Anliegen im Klassenrat',
      text: 'Du willst einen Wasserspender vorschlagen. Gleich bist du dran.',
      start: 55,
      wellen: [
        { text: 'Alle schauen dich an.', plus: 10 },
        { text: 'Einer murmelt: Bringt doch eh nichts.', plus: 10 },
        { text: 'Die Sitzungsleitung sagt: Du hast zwei Minuten.', plus: 8 },
      ],
      handeln: [
        { text: 'Fester Stand, ruhige Stimme: Ich schlage vor …', gut: true, folge: 'Ein klarer Satz. Die Klasse hört zu.' },
        { text: 'Ich lese meinen Vorschlag vom Zettel ab.', gut: true, folge: 'Ablesen ist erlaubt. Dein Anliegen kommt an.' },
        { text: 'Ich sage: Ach, vergesst es.', gut: false, folge: 'Das Thema ist weg. Der Wasserspender auch.' },
        { text: 'Ich zische zurück: Halt die Klappe!', gut: false, folge: 'Jetzt geht es um den Streit, nicht um deine Idee.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-debatte-verloren', modul: 'j3-m7', titel: 'Debatte verloren',
      text: 'Ihr habt gut debattiert. Jetzt verkündet die Jury ihr Urteil.',
      start: 50,
      wellen: [
        { text: 'Die Jury: 3 zu 1 für die anderen.', plus: 12 },
        { text: 'Das andere Team jubelt laut.', plus: 10 },
        { text: 'Einer ruft: Ihr hattet keine Chance!', plus: 12 },
      ],
      handeln: [
        { text: 'Ich sage: Gut argumentiert, besonders beim Schlaf-Argument.', gut: true, folge: 'Fair verloren. Das merken sich alle.' },
        { text: 'Ich frage die Jury nach einem Tipp.', gut: true, folge: 'Nachfragen ist erlaubt. Nächstes Mal bist du stärker.' },
        { text: 'Ich zerreiße den Jurybogen.', gut: false, folge: 'Kurz Luft raus. Dann ist es peinlich.' },
        { text: 'Ich sage: Die Jury ist total unfair.', gut: false, folge: 'Über die Wertung wird nicht gestritten. Die Stimmung kippt.' },
      ],
      heikel: false,
    },

    // Modul 8 – Liebe, Sexualität und Einvernehmlichkeit
    {
      id: 'j3-handy-kontrolle', modul: 'j3-m8', titel: 'Zeig mir dein Handy',
      text: 'Du bist mit Mika zusammen. Mika will ständig dein Handy sehen.',
      start: 50,
      wellen: [
        { text: 'Mika: Wenn du nichts versteckst, zeig es mir.', plus: 10 },
        { text: 'Zehn Nachrichten: Wo bist du? Mit wem?', plus: 12 },
        { text: 'Mika schweigt beleidigt. Seit gestern.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich sage ruhig: Mein Handy gehört mir. Vertrauen geht anders.', gut: true, folge: 'Klar gesagt. Jetzt zeigt sich, ob Respekt da ist.' },
        { text: 'Ich rede mit einer Freundin oder dem SePAS darüber.', gut: true, folge: 'Gut: Ein Blick von außen hilft bei Gelb.' },
        { text: 'Ich gebe Mika das Handy, damit Ruhe ist.', gut: false, folge: 'Kurz Ruhe. Dann wird die Kontrolle mehr.' },
        { text: 'Ich lösche alle Kontakte, die Mika nicht mag.', gut: false, folge: 'Du wirst einsamer. Das ist ein Warnzeichen.' },
      ],
      heikel: true,
    },
    {
      id: 'j3-bild-druck', modul: 'j3-m8', titel: 'Schick mal ein Bild',
      text: 'Du schreibst mit Noa. Plötzlich: „Schick mal ein Bild. Nur für mich.“',
      start: 55,
      wellen: [
        { text: 'Noa: Alle machen das doch.', plus: 10 },
        { text: 'Noa: Wenn du mich magst, machst du es.', plus: 12 },
        { text: 'Noa: Okay, dann halt nicht. Du bist langweilig.', plus: 10 },
      ],
      handeln: [
        { text: 'Ich schreibe: Nein. Dafür brauche ich keinen Grund.', gut: true, folge: 'Ein Nein im Chat braucht keine Begründung. Und die meisten schicken nichts.' },
        { text: 'Ich blockiere Noa, wenn der Druck weitergeht.', gut: true, folge: 'Blockieren ist jederzeit erlaubt.' },
        { text: 'Ich schicke ein Bild, damit Ruhe ist.', gut: false, folge: 'Das Bild ist weg. Du hast keine Kontrolle mehr darüber.' },
        { text: 'Ich entschuldige mich für mein Nein.', gut: false, folge: 'Ein Nein braucht keine Entschuldigung. Der Druck bleibt.' },
      ],
      heikel: true,
    },
    {
      id: 'j3-bild-im-chat', modul: 'j3-m8', titel: 'Das Bild im Klassenchat',
      text: 'Im Klassenchat taucht ein privates Bild von Samuel auf.',
      start: 55,
      wellen: [
        { text: 'Die ersten Lach-Emojis kommen.', plus: 10 },
        { text: 'Jemand schreibt: Schickt weiter!', plus: 12 },
        { text: 'Samuel ist heute nicht in der Schule.', plus: 8 },
      ],
      handeln: [
        { text: 'Ich leite nichts weiter und schreibe: Löscht das.', gut: true, folge: 'Weiterleiten verletzt und ist strafbar. Du stoppst die Kette.' },
        { text: 'Ich sage einer Lehrperson oder dem SePAS, wo das Bild ist.', gut: true, folge: 'Genau richtig. Erwachsene können es stoppen lassen.' },
        { text: 'Ich speichere es als Beweis.', gut: false, folge: 'Gut gemeint. Aber so ein Bild nie speichern oder weitergeben.' },
        { text: 'Ich schaue weg und sage nichts.', gut: false, folge: 'Samuel bleibt allein damit.' },
      ],
      heikel: true,
    },

    // Modul 9 – Medien und KI
    {
      id: 'j3-fake-video', modul: 'j3-m9', titel: 'Das Fake-Video',
      text: 'Im Klassenchat: ein Video von Elias. Es ist gefälscht, mit KI gemacht.',
      start: 50,
      wellen: [
        { text: 'Es hat schon 40 Aufrufe.', plus: 10 },
        { text: 'Alle lachen. Elias schreibt nichts.', plus: 10 },
        { text: 'Jemand fragt dich: Teilst du es auch?', plus: 12 },
      ],
      handeln: [
        { text: 'Nicht teilen. Melden. Elias schreiben: Ich glaube dir.', gut: true, folge: 'Du stehst an seiner Seite. Das zählt.' },
        { text: 'Eine Lehrperson oder die BEE SECURE Helpline 8002 1234 einschalten.', gut: true, folge: 'Fachleute wissen, wie man so etwas stoppt.' },
        { text: 'Ich teile es. Ist doch nur Spaß.', gut: false, folge: 'Auch Spaß-Fakes verletzen. Und sie können strafbar sein.' },
        { text: 'Ich kommentiere: Sieht voll echt aus!', gut: false, folge: 'Jetzt glauben noch mehr Leute das Fake.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-nur-noch-ein-video', modul: 'j3-m9', titel: 'Nur noch ein Video',
      text: '23:40 Uhr. Morgen ist Test. Du wolltest nur kurz schauen.',
      start: 45,
      wellen: [
        { text: 'Das nächste Video startet von allein.', plus: 8 },
        { text: 'Der Feed zeigt nur noch Drama-Clips.', plus: 10 },
        { text: 'Es ist 0:30 Uhr.', plus: 12 },
      ],
      handeln: [
        { text: 'Handy weg, Wecker stellen, Licht aus.', gut: true, folge: 'Morgen bist du wach. Der Feed wartet auch morgen.' },
        { text: 'Ich tippe bei Drama-Clips „Nicht interessiert“.', gut: true, folge: 'Du steuerst gegen. Der Feed merkt es.' },
        { text: 'Nur noch zehn Videos.', gut: false, folge: 'Aus zehn werden fünfzig. Genau dafür ist der Feed gebaut.' },
        { text: 'Ich lerne ab 1 Uhr noch schnell.', gut: false, folge: 'Müde lernt man wenig. Und der Test ist früh.' },
      ],
      heikel: false,
    },

    // Modul 10 – Abschluss
    {
      id: 'j3-erster-tag-lehre', modul: 'j3-m10', titel: 'Erster Tag in der Lehre',
      text: '6:30 Uhr auf der Baustelle. Neuer Chef, neue Kollegen, alles laut.',
      start: 55,
      wellen: [
        { text: 'Der Chef ruft: Nicht so langsam!', plus: 10 },
        { text: 'Alle reden schnell Luxemburgisch.', plus: 8 },
        { text: 'Dir fällt ein Werkzeug runter. Alle schauen.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich frage: Können Sie es mir noch einmal zeigen?', gut: true, folge: 'Nachfragen zeigt Interesse. Der Chef zeigt es dir.' },
        { text: 'Ich sage: Mein Fehler. Wie mache ich es richtig?', gut: true, folge: 'Fehler passieren. Wer fragt, lernt schneller.' },
        { text: 'Ich gehe mittags einfach nach Hause.', gut: false, folge: 'Der zweite Tag wird noch schwerer.' },
        { text: 'Ich rufe zurück: Dann machen Sie es doch selbst!', gut: false, folge: 'Der Ton wird rau. Der Start wackelt.' },
      ],
      heikel: false,
    },
    {
      id: 'j3-neues-lycee', modul: 'j3-m10', titel: 'Neues Lycée, niemand bekannt',
      text: 'Drei Wochen nach dem Wechsel. Der Busweg dauert fast eine Stunde.',
      start: 50,
      wellen: [
        { text: 'Jede Pause verbringst du allein.', plus: 10 },
        { text: 'Du schläfst immer schlechter.', plus: 10 },
        { text: 'Heute willst du gar nicht hin.', plus: 12 },
      ],
      handeln: [
        { text: 'Ich schreibe meiner Brücken-Person: Hast du kurz Zeit?', gut: true, folge: 'Gelb früh bemerkt. Jetzt bist du nicht mehr allein damit.' },
        { text: 'Ich gehe zum SePAS im neuen Lycée.', gut: true, folge: 'Neue Schule, neue Anlaufstelle. Gut, dass du sie kennst.' },
        { text: 'Ich bleibe einfach zu Hause.', gut: false, folge: 'Heute leichter. Morgen ist der Berg größer.' },
        { text: 'Ich sage allen, es ist alles super.', gut: false, folge: 'Dann kann dir auch niemand helfen.' },
      ],
      heikel: false,
    },
  ]);
})();
