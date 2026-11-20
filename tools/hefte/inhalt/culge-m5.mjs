// Culture générale · Modul 5 (6P) – Schwerpunkt Biologie, Gesundheit, nachhaltige Entwicklung
// (MENJE-Leitfaden Voie de préparation: Module 2, 5, 8). Themen: Skelett und Muskeln, Herz und Kreislauf
// (Versuch Puls), Atmung und Rauchen, Verdauung, Pubertät, Sucht und Risiko, Erste Hilfe, Klimaschutz im Alltag.
// Gesundheitsangaben vereinfacht und vorsichtig formuliert; Pubertät sachlich und ohne Zuschreibungen;
// Hilfe: 112 (Notruf), 116 111. Personen der Dialoge: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { skelett, kreislauf, lunge, verdauung, balken } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 5, {
  titel: 'Mein Körper – unsere Erde',
  titelFr: 'Mon corps – notre Terre',
  unter: 'Knochen und Muskeln, Herz und Lunge, Verdauung, Pubertät, Sucht und Risiko, Erste Hilfe – und was jede und jeder für das Klima tun kann. In acht Lektionen.',
  unterFr: 'Os et muscles, cœur et poumons, digestion, puberté, dépendances, premiers secours et climat.',
  farbe: '#b8452f',
  deckbild: ['jana:froh:stehen', 'ben:froh:stehen', 'aerztin:froh:erklaeren'],
  blasen: [{ t: 'Mein Puls rast!', x: 14, y: 112 }, { t: '112!', x: 128, y: 98 }, { t: 'Licht aus!', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'So funktioniert mein Körper', fr: 'Comment fonctionne mon corps' }, icon: 'heartbeat', lektionen: 4 },
    { titel: { de: 'Groß werden, gesund bleiben', fr: 'Grandir, rester en bonne santé' }, icon: 'first-aid-kit', lektionen: 3 },
    { titel: { de: 'Unsere Erde', fr: 'Notre Terre' }, icon: 'world', lektionen: 1 },
  ],
})

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Skelett · Gelenke · Muskeln', titel: 'Knochen, Gelenke, Muskeln', untertitel: 'Über 200 Knochen tragen dich: Du beschriftest ein Skelett, lernst, wie Muskeln arbeiten, und hörst, wie ein gebrochener Arm heilt.',
    ziel: { de: 'Ich benenne wichtige Knochen und erkläre, wie Muskeln und Gelenke zusammenarbeiten.', fr: 'Je nomme des os importants et j’explique comment muscles et articulations travaillent ensemble.' },
    bild: ['ben:froh:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Beweg dich!',
      aufgaben: [
        { art: 'mc', auftrag: 'Beuge den Arm und fühle mit der anderen Hand den Oberarm. Was passiert? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Der Muskel vorne wird dick und hart.', 'Der Knochen wird länger.', 'Nichts.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Das Gerüst des Körpers',
      absaetze: [
        'Das **Skelett** eines erwachsenen Menschen hat über **200 Knochen**. Es **stützt** den Körper, **schützt** die Organe und ermöglicht **Bewegung**. Der **Schädel** schützt das Gehirn, der **Brustkorb** mit den Rippen schützt Herz und Lunge. Die **Wirbelsäule** hält uns aufrecht. Der längste Knochen ist der **Oberschenkelknochen**.',
        '### Gelenke',
        'Wo zwei Knochen sich treffen, sind **Gelenke**. Das Knie und der Ellbogen sind **Scharniergelenke**: Sie bewegen sich wie eine Tür in eine Richtung. Schulter und Hüfte sind **Kugelgelenke**: Sie lassen sich in viele Richtungen drehen.',
        '### Muskeln',
        'Knochen bewegen sich nicht von allein. Das machen über **600 Muskeln**. Muskeln können sich nur **zusammenziehen**. Darum arbeiten sie oft paarweise: Beim Beugen des Arms zieht sich der **Bizeps** vorne zusammen, beim Strecken der **Trizeps** hinten.',
      ],
      bildHtml: skelett({ breite: 52 }),
      woerter: [['das Skelett', 'le squelette'], ['der Knochen', 'l’os'], ['der Schädel', 'le crâne'], ['die Wirbelsäule', 'la colonne vertébrale'], ['die Rippe', 'la côte'], ['das Becken', 'le bassin'], ['das Gelenk', 'l’articulation'], ['der Muskel', 'le muscle']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte das Skelett im Lesetext.', stufe: 1, html: '', liste: [['1', 'der Schädel'], ['2', 'die Wirbelsäule'], ['3', 'die Rippen (der Brustkorb)'], ['4', 'das Becken'], ['5', 'der Oberschenkelknochen'], ['6', 'der Oberarmknochen']], spalten: 2 },
        { art: 'zuordnen', auftrag: 'Was schützt was? Verbinde.', stufe: 2, links: ['der Schädel', 'der Brustkorb', 'die Wirbelsäule'], rechts: ['das Gehirn', 'Herz und Lunge', 'das Rückenmark'], ordnung: [2, 0, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Krankenhaus · Notaufnahme', titel: 'Gebrochen!',
      situation: 'Ben ist beim Skaten gestürzt. Die Ärztin zeigt ihm das Röntgenbild.',
      bild: ['ben:aengstlich:stehen', 'aerztin:froh:erklaeren'], sprecher: { Ärztin: 'w1', Ben: 'm3' },
      text: [
        ['Ärztin', 'Schau, Ben, hier auf dem Röntgenbild siehst du den Unterarm. Der Knochen hat einen Riss. Er ist gebrochen.'],
        ['Ben', 'Oh nein. Muss ich operiert werden?'],
        ['Ärztin', 'Nein, zum Glück nicht. Die Knochenteile liegen noch richtig. Du bekommst einen Gips für etwa vier bis sechs Wochen.'],
        ['Ben', 'Wie wächst der Knochen wieder zusammen?'],
        ['Ärztin', 'Knochen leben! Sie bilden an der Bruchstelle neues Knochengewebe. Bei jungen Menschen geht das besonders schnell. Der Gips hält alles ruhig, damit es gerade zusammenwächst.'],
        ['Ben', 'Und danach kann ich wieder skaten?'],
        ['Ärztin', 'Ja, aber zuerst musst du die Muskeln wieder trainieren. Und nächstes Mal: Handgelenkschoner und Helm!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Womit sieht man Knochen im Körper? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit einem Röntgenbild', 'mit einer Lupe', 'mit einem Fieberthermometer'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Bens Unterarm ist gebrochen.', true], ['Ben muss operiert werden.', false], ['Er trägt den Gips etwa vier bis sechs Wochen.', true], ['Knochen sind tot und wachsen nicht.', false]] },
        { art: 'fragen', auftrag: 'Was rät die Ärztin für das nächste Mal?', stufe: 2, fragen: [{ f: '', l: 'Handgelenkschoner und Helm tragen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Schutzausrüstung braucht man bei welchem Sport? Sammelt zu zweit.', stufe: 2, karten: [
        { titel: 'Sportarten', text: ['Skaten, Radfahren, Skifahren, Fußball, Reiten'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Skelett', punkte: ['über **200 Knochen**', '**stützen, schützen, bewegen**', 'Schädel, Wirbelsäule, Brustkorb, Becken'] },
         { titel: 'Gelenke und Muskeln', punkte: ['**Scharniergelenk**: Knie, Ellbogen', '**Kugelgelenk**: Schulter, Hüfte', 'Muskeln ziehen sich **zusammen** – oft als Paar (Bizeps/Trizeps)'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Scharniergelenk oder Kugelgelenk? Probiere an dir aus und kreuze an.', stufe: 2, kopf: ['Gelenk', 'Scharniergelenk', 'Kugelgelenk'], breiten: [40, 30, 30], zeilen: [['Knie', '[x]', ''], ['Schulter', '', '[x]'], ['Ellbogen', '[x]', ''], ['Hüfte', '', '[x]'], ['Fingergelenk', '[x]', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre mit eigenen Worten, wie du deinen Arm beugst und streckst. Benutze die Wörter Bizeps, Trizeps, Gelenk.', stufe: 2,
        anfaenge: ['Wenn ich den Arm beuge, …', 'Wenn ich den Arm strecke, …', 'Das Gelenk …'], zeilen: 6,
        beispiel: 'Wenn ich den Arm beuge, zieht sich der Bizeps vorne am Oberarm zusammen und zieht den Unterarm nach oben. Wenn ich den Arm strecke, zieht sich der Trizeps hinten zusammen. Das Ellbogengelenk funktioniert wie ein Scharnier.' },
    ],
    check: ['Ich benenne wichtige Knochen.', 'Ich unterscheide Scharnier- und Kugelgelenk.', 'Ich erkläre, wie Muskeln paarweise arbeiten.'],
  },
  // ================================================================ 2
  {
    thema: 'Herz · Kreislauf · Puls (Versuch)', titel: 'Das Herz – ein starker Motor', untertitel: 'Etwa 100 000 Schläge am Tag: Du lernst den Blutkreislauf kennen, misst deinen Puls in Ruhe und nach Bewegung und wertest die Daten aus.',
    ziel: { de: 'Ich erkläre den Blutkreislauf und messe meinen Puls.', fr: 'J’explique la circulation sanguine et je mesure mon pouls.' },
    bild: ['sami:froh:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Dein Herz',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie groß ist dein Herz ungefähr? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['so groß wie deine Faust', 'so groß wie ein Fußball', 'so groß wie ein Daumen'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Rund um die Uhr im Einsatz',
      absaetze: [
        'Das **Herz** ist ein Muskel, ungefähr so groß wie deine Faust. Es pumpt das **Blut** durch den ganzen Körper – Tag und Nacht, etwa 100 000 Mal am Tag. Durch die **Blutgefäße** fließt das Blut in einem **Kreislauf**.',
        '### Zwei Kreisläufe',
        'Im **Lungenkreislauf** fließt das Blut vom Herzen zur Lunge. Dort nimmt es **Sauerstoff** auf und gibt Kohlenstoffdioxid ab. Dann fließt es zurück zum Herzen. Im **Körperkreislauf** pumpt das Herz das sauerstoffreiche Blut zu allen Muskeln und Organen. Dort wird der Sauerstoff abgegeben. Das sauerstoffarme Blut fließt zurück zum Herzen.',
        '### Der Puls',
        'Bei jedem Herzschlag spürt man am Handgelenk oder am Hals einen kleinen Stoß: den **Puls**. In Ruhe schlägt das Herz von Jugendlichen etwa 60 bis 100 Mal pro Minute. Bei Bewegung brauchen die Muskeln mehr Sauerstoff – das Herz schlägt schneller.',
      ],
      bildHtml: kreislauf({ breite: 78 }),
      woerter: [['das Herz', 'le cœur'], ['das Blut', 'le sang'], ['das Blutgefäß', 'le vaisseau sanguin'], ['der Kreislauf', 'la circulation'], ['der Sauerstoff', 'l’oxygène'], ['der Puls', 'le pouls'], ['das Handgelenk', 'le poignet'], ['pumpen', 'pomper']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Das Herz ist ungefähr so groß wie eine [Faust].', 'In der Lunge nimmt das Blut [Sauerstoff] auf.', 'Den Herzschlag spürt man am Handgelenk als [Puls].', 'Bei Bewegung schlägt das Herz [schneller].'] },
      ],
    },
    hoeren: {
      was: 'Eine Anleitung', wo: 'Sportunterricht · Turnhalle', titel: 'Puls messen – so geht’s',
      situation: 'Herr Mesenberg erklärt, wie man den Puls misst.',
      bild: ['lehrer:froh:erklaeren', 'sami:froh:stehen'], sprecher: { 'Herr Mesenberg': 'm1', Sami: 'm3' },
      text: [
        ['Herr Mesenberg', 'Legt Zeige- und Mittelfinger auf die Innenseite eures Handgelenks, unter dem Daumen. Nicht den Daumen nehmen – der hat selbst einen Puls!'],
        ['Sami', 'Ich spüre es! Bum … bum …'],
        ['Herr Mesenberg', 'Gut. Jetzt zählt ihr fünfzehn Sekunden lang die Schläge. Ich sage Start und Stopp. … Start! … Stopp!'],
        ['Sami', 'Ich habe neunzehn.'],
        ['Herr Mesenberg', 'Dann rechnest du mal vier, denn eine Minute hat vier mal fünfzehn Sekunden. Neunzehn mal vier sind sechsundsiebzig Schläge pro Minute. Das ist dein Ruhepuls.'],
        ['Sami', 'Und jetzt?'],
        ['Herr Mesenberg', 'Jetzt eine Minute Hampelmann! … Und sofort wieder messen. Start! … Stopp!'],
        ['Sami', 'Wow, dreiunddreißig! Mal vier … hundertzweiunddreißig!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum misst man 15 Sekunden und rechnet mal 4? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['weil 4 · 15 Sekunden = 1 Minute sind', 'weil das Herz 4 Kammern hat'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze Samis Werte.', stufe: 1, kopf: ['', 'Schläge in 15 s', 'Puls pro Minute'], breiten: [34, 33, 33], zeilen: [['in Ruhe', '[19]', '[76]'], ['nach 1 Minute Hampelmann', '[33]', '[132]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum schlägt das Herz nach Bewegung schneller? Erklärt es euch gegenseitig.', stufe: 2, karten: [
        { titel: 'Wörter', text: ['Muskeln', 'Sauerstoff', 'schneller pumpen', 'mehr Blut'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Blutkreislauf', punkte: ['**Lungenkreislauf**: Blut holt Sauerstoff in der Lunge.', '**Körperkreislauf**: Blut bringt Sauerstoff zu Muskeln und Organen.', 'Das **Herz** pumpt.'] },
         { titel: 'Puls messen', nummern: true, punkte: ['Zwei Finger aufs Handgelenk (nicht den Daumen).', '15 Sekunden zählen.', '**mal 4** = Schläge pro Minute.'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Sami hat seinen Puls nach dem Hampelmann mehrmals gemessen. Lies ab: Nach wie vielen Minuten ist sein Puls fast wieder in Ruhe?', stufe: 2, html: balken('Samis Puls (Schläge pro Minute)', [['in Ruhe', 76], ['sofort nach Bewegung', 132], ['nach 1 Minute', 108], ['nach 2 Minuten', 92], ['nach 3 Minuten', 80]], { max: 140 }), liste: [['→', 'nach etwa 3 Minuten (80 statt 76)']], spalten: 1 },
      { art: 'versuch', auftrag: 'Messt euren Puls. (Wer nicht möchte oder kann, nimmt die Werte von Sami.)', stufe: 2,
        frage: 'Wie verändert sich der Puls bei Bewegung – und wie schnell wird er wieder normal?',
        material: ['eine Uhr mit Sekundenzeiger oder Stoppuhr', 'Stift und Tabelle'],
        schritte: ['Miss deinen Ruhepuls (15 s zählen, mal 4).', 'Mach 1 Minute Hampelmann.', 'Miss sofort wieder.', 'Ruh dich aus. Miss nach 1, 2 und 3 Minuten erneut.', 'Zeichne ein Balkendiagramm.'],
        loesung: { vermutung: 'z. B. Nach Bewegung ist der Puls doppelt so hoch.', beobachtung: 'z. B. Ruhe 76 · sofort danach 132 · nach 1 min 108 · nach 2 min 92 · nach 3 min 80', ergebnis: 'Bei Bewegung schlägt das Herz schneller, weil die Muskeln mehr Sauerstoff brauchen. In Ruhe wird es langsam wieder normal. Wer trainiert ist, erholt sich schneller.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Versuchsbericht zum Puls-Versuch.', stufe: 2,
        anfaenge: ['Unsere Frage: …', 'So sind wir vorgegangen: …', 'Ergebnisse: …', 'Erklärung: …'], zeilen: 8,
        beispiel: 'Unsere Frage: Wie verändert sich der Puls bei Bewegung? So sind wir vorgegangen: Wir haben den Ruhepuls gemessen, eine Minute Hampelmann gemacht und dann mehrmals gemessen. Ergebnisse: Der Puls stieg von 76 auf 132 und war nach drei Minuten fast wieder normal. Erklärung: Die Muskeln brauchen bei Bewegung mehr Sauerstoff, darum pumpt das Herz schneller.' },
    ],
    check: ['Ich erkläre Lungen- und Körperkreislauf.', 'Ich messe meinen Puls richtig.', 'Ich lese ein Balkendiagramm ab.'],
  },
  // ================================================================ 3
  {
    thema: 'Atmung · Lunge · Rauchen und Vapen', titel: 'Durchatmen', untertitel: 'Luftröhre, Bronchien, Lungenbläschen: Du lernst, wie die Atmung funktioniert, und was Rauchen und Vapen mit der Lunge machen.',
    ziel: { de: 'Ich erkläre die Atmung und nenne Risiken von Rauchen und Vapen.', fr: 'J’explique la respiration et je cite les risques du tabac et de la cigarette électronique.' },
    bild: ['jana:froh:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Atem anhalten',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wie lange kannst du die Luft anhalten? Probiere es (nur im Sitzen!) und schreibe auf, wie du dich danach fühlst.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. 30 Sekunden; danach atme ich schnell und tief.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Der Weg der Luft',
      absaetze: [
        'Wir atmen etwa 12- bis 20-mal pro Minute, ohne darüber nachzudenken. Die Luft strömt durch Nase oder Mund in die **Luftröhre**. Die Luftröhre teilt sich in zwei **Bronchien** – je eine für den linken und den rechten **Lungenflügel**. In der Lunge verzweigen sie sich immer feiner bis zu Millionen winziger **Lungenbläschen**. Dort geht der **Sauerstoff** ins Blut, und **Kohlenstoffdioxid** kommt aus dem Blut heraus.',
        'Beim Einatmen zieht sich das **Zwerchfell**, ein großer Muskel unter der Lunge, nach unten. Die Lunge dehnt sich aus, und Luft strömt hinein.',
        '### Rauchen und Vapen',
        'Zigarettenrauch enthält **Nikotin**, **Teer** und viele giftige Stoffe. Teer verklebt die Lunge, Nikotin macht sehr schnell **abhängig**. Rauchen ist eine der häufigsten Ursachen für schwere Krankheiten. Auch **E-Zigaretten** (Vapes) enthalten oft Nikotin. Sie sind nicht harmlos: Forscher untersuchen noch, wie sie der Lunge schaden. In Luxemburg dürfen Tabak und E-Zigaretten **nicht an Jugendliche unter 18** verkauft werden.',
      ],
      bildHtml: lunge({ breite: 66 }),
      woerter: [['die Atmung', 'la respiration'], ['die Luftröhre', 'la trachée'], ['die Bronchien', 'les bronches'], ['die Lunge', 'les poumons'], ['das Lungenbläschen', 'l’alvéole pulmonaire'], ['das Zwerchfell', 'le diaphragme'], ['abhängig', 'dépendant'], ['die E-Zigarette', 'la cigarette électronique']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte das Schaubild im Lesetext.', stufe: 1, html: '', liste: [['1', 'die Luftröhre'], ['2', 'die Lunge (Lungenflügel)'], ['3', 'die Bronchien'], ['4', 'das Zwerchfell']], spalten: 2 },
        { art: 'ordnen', auftrag: 'Der Weg der Luft: Ordne.', stufe: 2, teile: ['Nase oder Mund', 'Luftröhre', 'Bronchien', 'Lungenbläschen', 'Sauerstoff geht ins Blut'], ordnung: [3, 0, 4, 2, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · hinter der Turnhalle', titel: 'Nur einmal probieren?',
      situation: 'Ältere Schüler bieten Jana eine Vape an. Später spricht sie mit der Schulkrankenschwester.',
      bild: ['jana:besorgt:stehen', 'aerztin:froh:erklaeren'], sprecher: { Jana: 'w2', Krankenschwester: 'w1' },
      text: [
        ['Jana', 'Darf ich Sie etwas fragen? Heute wollten mir zwei Ältere eine Vape geben. Sie haben gesagt, das ist nur Wasserdampf mit Erdbeergeschmack.'],
        ['Krankenschwester', 'Gut, dass du fragst. Es ist kein Wasserdampf. Die meisten Vapes enthalten Nikotin – manchmal so viel wie viele Zigaretten.'],
        ['Jana', 'Und Nikotin macht abhängig?'],
        ['Krankenschwester', 'Ja, und zwar schnell, besonders bei Jugendlichen, weil das Gehirn noch wächst. Viele merken es erst, wenn sie nervös werden, sobald die Vape leer ist.'],
        ['Jana', 'Ich habe Nein gesagt. Aber dann haben sie mich ausgelacht.'],
        ['Krankenschwester', 'Das war mutig. Nein sagen ist schwerer als mitmachen. Du kannst sagen: „Nein danke, ich hab keinen Bock darauf.“ Und weggehen.'],
        ['Jana', 'Und wenn sie mich weiter nerven?'],
        ['Krankenschwester', 'Dann komm wieder zu mir oder sprich mit deiner Klassenlehrerin. Du musst das nicht allein lösen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „abhängig sein“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nicht mehr ohne etwas auskommen können', 'etwas sehr gern mögen', 'krank sein'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Vapes enthalten nur Wasserdampf.', false], ['Die meisten Vapes enthalten Nikotin.', true], ['Jugendliche werden besonders schnell abhängig.', true], ['Jana hat mitgemacht.', false]] },
        { art: 'fragen', auftrag: 'Wie kann Jana Nein sagen? Schreibe den Satz der Krankenschwester auf.', stufe: 2, fragen: [{ f: '', l: '„Nein danke, ich hab keinen Bock darauf.“ – und weggehen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt Nein-Sagen in Rollenspielen. Eine Person bietet etwas an, die andere lehnt freundlich, aber klar ab.', stufe: 2, karten: [
        { titel: 'Nein sagen', text: ['Nein danke.', 'Das ist nichts für mich.', 'Ich hab keinen Bock darauf.', 'Lass uns lieber … machen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Atmung', punkte: ['Nase/Mund → **Luftröhre** → **Bronchien** → **Lungenbläschen**', 'Sauerstoff ins Blut, CO₂ hinaus', '**Zwerchfell** hilft beim Einatmen'] },
         { titel: 'Rauchen und Vapen', punkte: ['**Nikotin** macht schnell abhängig.', '**Teer** und Giftstoffe schaden der Lunge.', 'Verkauf an **unter 18** verboten.'] }],
        [{ art: 'tipp', titel: 'Nein sagen ist stark', text: 'Du musst dich nicht rechtfertigen. Ein klares „Nein danke“ reicht. Wenn jemand dich unter Druck setzt: weggehen und mit einer Vertrauensperson sprechen.' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mythos oder Fakt? Kreuze an.', stufe: 2, kopf: ['Aussage', 'Mythos', 'Fakt'], breiten: [64, 18, 18], zeilen: [['Vapes sind nur Wasserdampf.', '[x]', ''], ['Nikotin macht abhängig.', '', '[x]'], ['Einmal probieren schadet nie.', '[x]', ''], ['Rauch von anderen (Passivrauchen) schadet auch.', '', '[x]'], ['Die meisten Jugendlichen rauchen.', '[x]', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text für die Schülerzeitung: „Warum ich nicht vape“ – aus Sicht einer ausgedachten Person.', stufe: 2,
        anfaenge: ['Viele denken, Vapen ist …', 'Aber …', 'Ich will nicht abhängig sein, weil …', 'Mein Tipp: …'], zeilen: 8,
        beispiel: 'Viele denken, Vapen ist harmlos und riecht nach Erdbeere. Aber die meisten Vapes enthalten Nikotin, und das macht schnell abhängig. Ich will nicht abhängig sein, weil ich mein Geld und meine Freiheit für andere Dinge brauche. Und ich will beim Fußball genug Luft haben. Mein Tipp: Sag einfach „Nein danke“ und geh mit Leuten, die dich so mögen, wie du bist.' },
    ],
    check: ['Ich beschreibe den Weg der Luft.', 'Ich erkläre, warum Nikotin gefährlich ist.', 'Ich kann klar Nein sagen.'],
  },
  // ================================================================ 4
  {
    thema: 'Verdauung · Organe', titel: 'Die Reise eines Pausenbrots', untertitel: 'Vom Mund bis zum Darm: Du verfolgst die Reise der Nahrung, beschriftest die Verdauungsorgane und hörst ein Quiz.',
    ziel: { de: 'Ich beschreibe den Weg der Nahrung durch die Verdauungsorgane.', fr: 'Je décris le trajet des aliments à travers les organes de la digestion.' },
    bild: ['finn:froh:tasse', 'lea:froh:stehen'],
    start: {
      was: 'Wie lange?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie lange dauert die Verdauung ungefähr vom Essen bis zur Toilette? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 10 Minuten', 'etwa einen bis zwei Tage', 'etwa einen Monat'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Eine Geschichte mit Sachinfos', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Ich bin ein Pausenbrot',
      absaetze: [
        'Hallo, ich bin ein Käsebrot! Heute um 10 Uhr hat Finn mich gegessen. Im **Mund** haben mich die Zähne zerkleinert, und der **Speichel** hat mich weich gemacht. Dann bin ich durch die **Speiseröhre** gerutscht – ein Muskelschlauch, etwa 25 Zentimeter lang.',
        'Im **Magen** wurde ich mit Magensaft vermischt und zu einem Brei geknetet. Das hat ein paar Stunden gedauert. Danach ging es in den **Dünndarm**. Er ist mehrere Meter lang und eng zusammengelegt. Hier werden die **Nährstoffe** aus mir herausgeholt und gehen ins Blut. Dabei helfen Säfte aus der **Leber** und der Bauchspeicheldrüse.',
        'Was übrig bleibt, wandert in den **Dickdarm**. Dort wird dem Brei **Wasser** entzogen. Am Ende verlässt der Rest den Körper durch den Enddarm. Meine Reise hat ungefähr einen bis zwei Tage gedauert. Tschüss!',
      ],
      bildHtml: verdauung({ breite: 56 }),
      woerter: [['die Verdauung', 'la digestion'], ['der Speichel', 'la salive'], ['die Speiseröhre', 'l’œsophage'], ['der Magen', 'l’estomac'], ['der Dünndarm', 'l’intestin grêle'], ['der Dickdarm', 'le gros intestin'], ['die Leber', 'le foie'], ['die Nährstoffe', 'les nutriments']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Verdauungsorgane im Lesetext.', stufe: 1, html: '', liste: [['1', 'der Mund'], ['2', 'die Speiseröhre'], ['3', 'der Magen'], ['4', 'der Dünndarm'], ['5', 'der Dickdarm'], ['6', 'die Leber']], spalten: 3 },
        { art: 'zuordnen', auftrag: 'Was passiert wo? Verbinde.', stufe: 2, links: ['Mund', 'Magen', 'Dünndarm', 'Dickdarm'], rechts: ['zerkleinern, einspeicheln', 'mit Magensaft zu Brei kneten', 'Nährstoffe ins Blut aufnehmen', 'Wasser entziehen'] },
      ],
    },
    hoeren: {
      was: 'Ein Quiz', wo: 'Schulradio · „Körper-Quiz“', titel: 'Wusstest du schon?',
      situation: 'Lea stellt Finn im Schulradio Quizfragen zur Verdauung.',
      bild: ['lea:froh:handy', 'finn:verwirrt:stehen'], sprecher: { Lea: 'w3', Finn: 'm3' },
      text: [
        ['Lea', 'Frage eins: Warum knurrt der Magen?'],
        ['Finn', 'Weil er Hunger hat?'],
        ['Lea', 'Fast! Auch wenn er leer ist, bewegt er sich. Luft und Saft werden hin- und hergeschoben. Das hört man als Knurren. Frage zwei: Warum soll man langsam essen?'],
        ['Finn', 'Damit man nicht so viel isst?'],
        ['Lea', 'Genau! Das Sattgefühl kommt erst nach etwa zwanzig Minuten. Wer schlingt, isst oft mehr, als er braucht. Und gut gekaut ist halb verdaut.'],
        ['Finn', 'Frage drei bitte, ich bin gut drin!'],
        ['Lea', 'Warum sind Ballaststoffe wichtig, zum Beispiel in Vollkornbrot, Obst und Gemüse?'],
        ['Finn', 'Keine Ahnung.'],
        ['Lea', 'Sie halten den Darm in Bewegung. Zusammen mit viel Wasser helfen sie, dass man gut auf die Toilette gehen kann.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wo stecken viele Ballaststoffe? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Vollkornbrot', 'Äpfel', 'Linsen', 'Limonade'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum knurrt der Magen?', l: 'Er bewegt sich auch leer; Luft und Saft werden hin- und hergeschoben.' }, { f: 'Nach wie vielen Minuten kommt das Sattgefühl?', l: 'nach etwa 20 Minuten' }, { f: 'Wozu sind Ballaststoffe gut?', l: 'Sie halten den Darm in Bewegung (mit viel Wasser).' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Denkt euch selbst drei Quizfragen zur Verdauung aus und stellt sie einer anderen Gruppe.', stufe: 2, karten: [
        { titel: 'Fragewörter', text: ['Warum …?', 'Wo …?', 'Wie lange …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Weg der Nahrung', nummern: true, punkte: ['**Mund**: kauen, Speichel', '**Speiseröhre**', '**Magen**: Brei', '**Dünndarm**: Nährstoffe ins Blut', '**Dickdarm**: Wasser entziehen'] },
         { titel: 'Gut für die Verdauung', punkte: ['**langsam** essen, gut kauen', '**Ballaststoffe**: Vollkorn, Obst, Gemüse', 'viel **Wasser** trinken', '**Bewegung**'] }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Reise eines Apfelstücks.', stufe: 2, woerter: ['Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm', 'Zähne'], saetze: ['Die [Zähne] zerkleinern das Apfelstück.', 'Durch die [Speiseröhre] rutscht es nach unten.', 'Im [Magen] wird es zu Brei.', 'Im [Dünndarm] gehen die Nährstoffe ins Blut.', 'Im [Dickdarm] wird Wasser entzogen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe die Reise eines anderen Lebensmittels in der Ich-Form (zum Beispiel eine Nudel oder eine Erdbeere).', stufe: 2,
        anfaenge: ['Hallo, ich bin …', 'Zuerst …', 'Danach …', 'Am Ende …'], zeilen: 8,
        beispiel: 'Hallo, ich bin eine Erdbeere. Zuerst hat mich Lea in den Mund gesteckt und zerkaut. Danach bin ich durch die Speiseröhre in den Magen gerutscht und wurde zu Brei. Im Dünndarm haben sie mir meine Vitamine genommen. Am Ende war ich im Dickdarm, und mein Wasser wurde mir auch noch abgenommen.' },
    ],
    check: ['Ich nenne die Verdauungsorgane in der richtigen Reihenfolge.', 'Ich erkläre, was im Magen und im Dünndarm passiert.', 'Ich nenne Tipps für eine gute Verdauung.'],
  },
  // ================================================================ 5
  {
    thema: 'Pubertät · Körper und Gefühle', titel: 'Alles verändert sich', untertitel: 'Wachstum, Stimme, Haut, Gefühle: Du liest sachlich über die Pubertät, hörst Fragen an eine Ärztin und weißt, an wen du dich wenden kannst.',
    ziel: { de: 'Ich beschreibe Veränderungen in der Pubertät und weiß, wo ich Fragen stellen kann.', fr: 'Je décris les changements de la puberté et je sais où poser mes questions.' },
    bild: ['nele:ruhig:sitzen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Fragen sammeln',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schreibe anonym eine Frage zur Pubertät auf einen Zettel und lege ihn in die Fragebox. (Hier kannst du eine Frage notieren – nur, wenn du willst.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Fragen – keine Lösung.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht; bei Fragen: Schulärztin, Arzt, Vertrauensperson)', titel: 'Vom Kind zum Erwachsenen',
      absaetze: [
        'Die **Pubertät** ist die Zeit, in der der Körper vom Kind zum Erwachsenen wird. Sie beginnt meist zwischen 9 und 14 Jahren – bei jedem Menschen **zu einer anderen Zeit**. Das ist völlig normal. Gesteuert wird sie von **Hormonen**, Botenstoffen im Blut.',
        '### Was sich verändert',
        'Man wächst schneller, manchmal mehrere Zentimeter in einem Jahr. Unter den Achseln und im Intimbereich wachsen Haare. Die Haut wird fettiger, oft gibt es **Pickel**. Man schwitzt mehr – regelmäßiges Duschen hilft. Bei vielen Mädchen wächst die Brust, und die **Periode** (Menstruation) beginnt. Bei vielen Jungen wird die **Stimme tiefer** („Stimmbruch“), und Bart beginnt zu wachsen.',
        '### Gefühle',
        'Nicht nur der Körper verändert sich. Viele fühlen sich manchmal fröhlich und kurz danach traurig oder genervt. Man will mehr selbst entscheiden und wird unsicher, ob man „normal“ ist. Auch das ist **normal**. Jeder Körper ist anders – und jeder ist in Ordnung.',
        'Fragen sind erlaubt! Man kann sie der Schulärztin, dem Hausarzt, einer Vertrauensperson oder anonym bei **116 111** stellen.',
      ],
      woerter: [['die Pubertät', 'la puberté'], ['das Hormon', 'l’hormone'], ['wachsen', 'grandir'], ['der Pickel', 'le bouton'], ['schwitzen', 'transpirer'], ['die Periode (Menstruation)', 'les règles'], ['der Stimmbruch', 'la mue'], ['unsicher', 'pas sûr de soi']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Pubertät beginnt bei allen genau mit 12 Jahren.', false], ['Hormone steuern die Pubertät.', true], ['Pickel und mehr Schweiß sind in der Pubertät häufig.', true], ['Starke Stimmungswechsel sind in der Pubertät nicht normal.', false]] },
      ],
    },
    hoeren: {
      was: 'Fragen an eine Ärztin', wo: 'Schulradio · „Frag die Ärztin“', titel: 'Ist das normal?',
      situation: 'Im Schulradio beantwortet eine Ärztin anonyme Fragen aus der Fragebox.',
      bild: ['aerztin:froh:erklaeren', 'nele:ruhig:handy'], sprecher: { Moderatorin: 'w3', Ärztin: 'w1' },
      text: [
        ['Moderatorin', 'Erste Frage aus der Box: „Ich bin 13 und noch ganz klein. Alle anderen sind schon gewachsen. Stimmt etwas nicht mit mir?“'],
        ['Ärztin', 'Fast immer stimmt alles. Die Pubertät beginnt bei jedem zu einer anderen Zeit. Manche wachsen mit 11, andere mit 15. Wer sich große Sorgen macht, kann es beim Arzt prüfen lassen.'],
        ['Moderatorin', 'Zweite Frage: „Ich habe ganz viele Pickel. Was kann ich tun?“'],
        ['Ärztin', 'Morgens und abends mit einem milden Waschgel waschen und die Pickel nicht ausdrücken. Wenn es sehr stark ist, hilft eine Hautärztin.'],
        ['Moderatorin', 'Dritte Frage: „Manchmal bin ich ohne Grund total wütend oder traurig. Bin ich komisch?“'],
        ['Ärztin', 'Nein. Die Hormone und die vielen Veränderungen können die Gefühle durcheinanderbringen. Sport, Schlaf und Reden helfen. Wenn es dir aber lange schlecht geht, such dir Hilfe – bei einer Vertrauensperson oder bei 116 111.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum ist eine anonyme Fragebox gut? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man traut sich eher, auch peinliche Fragen zu stellen.', 'Man muss keine Fragen stellen.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welchen Rat gibt die Ärztin?', stufe: 1, kopf: ['Frage', 'Rat'], breiten: [40, 60], zeilen: [['Ich bin noch klein.', '[Das ist meistens normal; jeder wächst zu einer anderen Zeit; bei großen Sorgen zum Arzt.]'], ['Ich habe viele Pickel.', '[mild waschen, nicht ausdrücken, bei starken Pickeln zur Hautärztin]'], ['Ich bin oft wütend oder traurig.', '[normal; Sport, Schlaf, Reden; wenn lange schlecht: Hilfe holen, 116 111]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wer kann bei Fragen zur Pubertät helfen? Sammelt in der Klasse Personen und Stellen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Schulärztin, Schulkrankenpfleger', 'Hausarzt, Kinderärztin', 'Vertrauenslehrerin', '116 111 (anonym)'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Pubertät', punkte: ['beginnt meist zwischen **9 und 14**', 'gesteuert von **Hormonen**', 'jeder hat sein **eigenes Tempo**'] },
         { titel: 'Gut für dich', punkte: ['regelmäßig **duschen**, Haut mild pflegen', 'genug **Schlaf** und Bewegung', '**Fragen stellen** ist normal', 'Hilfe: Schulärztin, 116 111'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? (Du musst deine Antworten nicht zeigen.)', stufe: 2, aussagen: ['Über die Pubertät sollte man in der Schule offen sprechen.', 'Werbung und Social Media zeigen „perfekte“ Körper, die es so kaum gibt.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Antwort auf eine Frage aus der Fragebox – so, wie eine gute Freundin oder ein guter Freund antworten würde.', stufe: 2,
        anfaenge: ['Liebe/r Unbekannte/r,', 'deine Frage ist …', 'Ich glaube, …', 'Vielleicht hilft dir …'], zeilen: 8,
        beispiel: 'Liebe Unbekannte, deine Frage ist ganz normal, und viele haben dieselbe Sorge. Ich glaube, du musst dich nicht schämen. Jeder Körper verändert sich zu einer anderen Zeit. Vielleicht hilft dir ein Gespräch mit der Schulärztin – sie hat solche Fragen schon oft gehört.' },
    ],
    check: ['Ich beschreibe Veränderungen in der Pubertät.', 'Ich weiß, dass jeder sein eigenes Tempo hat.', 'Ich weiß, wo ich Fragen stellen kann.'],
  },
  // ================================================================ 6
  {
    thema: 'Sucht · Risiko · Energydrinks · Handy', titel: 'Wenn etwas zur Gewohnheit wird', untertitel: 'Energydrinks, Zocken, Social Media: Du lernst, wie Abhängigkeit entsteht, hörst eine Geschichte und findest Wege, Grenzen zu setzen.',
    ziel: { de: 'Ich erkläre, wie Abhängigkeit entsteht, und nenne Strategien, um gesund damit umzugehen.', fr: 'J’explique comment naît une dépendance et je cite des stratégies pour s’en protéger.' },
    bild: ['yusuf:muede:zocken', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Gewohnheiten',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie oft machst du das? (Nur für dich – du musst es niemandem zeigen.)', stufe: 1, kopf: ['', 'nie', 'manchmal', 'jeden Tag'], breiten: [46, 18, 18, 18], zeilen: [['Energydrinks trinken', '', '', ''], ['länger als 2 Stunden zocken', '', '', ''], ['das Handy als Erstes am Morgen nehmen', '', '', ''], ['nachts Nachrichten lesen', '', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Vom Spaß zur Sucht',
      absaetze: [
        'Etwas Schönes zu tun, macht glücklich. Das Gehirn schüttet dabei einen Botenstoff aus, der sich gut anfühlt. Das Gehirn merkt sich: **Das will ich wieder!** So entstehen Gewohnheiten.',
        '### Wann wird es gefährlich?',
        'Gefährlich wird es, wenn man **nicht mehr aufhören kann**, obwohl man es möchte, wenn man **immer mehr** braucht und wenn **andere Dinge** leiden: Schule, Schlaf, Freunde, Hobbys. Dann spricht man von **Abhängigkeit** oder Sucht. Man kann von Stoffen abhängig werden (Nikotin, Alkohol, Drogen) und auch von Tätigkeiten (Glücksspiel, Zocken, Social Media).',
        '### Energydrinks',
        'Energydrinks enthalten viel **Koffein** und oft viel Zucker. Auf vielen Dosen steht: nicht empfohlen für Kinder. Zu viel Koffein kann Herzklopfen, Nervosität und Schlafprobleme machen.',
        '### Sich schützen',
        'Hilfreich sind **feste Grenzen** (zum Beispiel: Zocken nur nach den Hausaufgaben, höchstens eine Stunde), **andere Freuden** (Sport, Freunde treffen, Musik) und **ehrlich hinschauen**. Wer merkt, dass er nicht mehr aufhören kann, sollte darüber reden.',
      ],
      woerter: [['die Gewohnheit', 'l’habitude'], ['die Sucht (Abhängigkeit)', 'l’addiction (la dépendance)'], ['der Botenstoff', 'le messager chimique'], ['das Koffein', 'la caféine'], ['die Grenze', 'la limite'], ['aufhören', 'arrêter'], ['das Glücksspiel', 'le jeu de hasard'], ['die Nervosität', 'la nervosité']],
      aufgaben: [
        { art: 'mc', auftrag: 'Woran erkennt man Abhängigkeit? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Man kann nicht aufhören, obwohl man will.', 'Man braucht immer mehr.', 'Schule, Schlaf und Freunde leiden.', 'Man macht etwas einmal im Monat gern.'], r: [0, 1, 2] }] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Erzählung', titel: 'Nur noch eine Runde',
      situation: 'Yusuf erzählt, wie das Zocken ihn verändert hat – und was ihm geholfen hat.',
      bild: ['yusuf:muede:zocken', 'lehrerin:froh:erklaeren'], sprecher: { Yusuf: 'm3', 'Frau Kremer': 'w1' },
      text: [
        ['Yusuf', 'Letzten Winter habe ich ein neues Spiel bekommen. Am Anfang habe ich eine Stunde am Tag gespielt. Dann zwei. Dann bis nachts um zwei.'],
        ['Yusuf', 'Ich war morgens total müde, habe Hausaufgaben vergessen und meine Freunde nicht mehr getroffen. Wenn ich nicht spielen durfte, war ich gereizt.'],
        ['Yusuf', 'Irgendwann hat Frau Kremer mich angesprochen, weil ich im Unterricht eingeschlafen bin.'],
        ['Frau Kremer', 'Yusuf, ich mache mir Sorgen. Was ist los?'],
        ['Yusuf', 'Erst wollte ich nichts sagen. Dann habe ich es doch erzählt. Wir haben zusammen einen Plan gemacht: Zocken nur am Wochenende und nur bis zehn Uhr abends. Unter der Woche wieder Basketball.'],
        ['Yusuf', 'Die erste Woche war hart. Aber jetzt schlafe ich besser und habe wieder Spaß mit meinen Freunden. Spielen tue ich immer noch – aber das Spiel bestimmt nicht mehr über mich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „gereizt“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['schnell genervt und wütend', 'sehr glücklich', 'müde'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was hat sich verändert?', stufe: 1, kopf: ['vorher', 'nachher'], breiten: [50, 50], zeilen: [['[spielte bis 2 Uhr nachts]', '[spielt nur am Wochenende bis 22 Uhr]'], ['[müde, Hausaufgaben vergessen]', '[schläft besser]'], ['[traf keine Freunde mehr]', '[spielt wieder Basketball mit Freunden]']] },
        { art: 'fragen', auftrag: 'Was war wichtig, damit Yusuf es geschafft hat?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Er hat darüber geredet; er hatte einen klaren Plan mit Grenzen; er hatte andere schöne Dinge (Basketball, Freunde).' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was könnt ihr tun, wenn ihr merkt, dass ein Freund oder eine Freundin nicht mehr aufhören kann?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde fragen: …', 'Ich würde vorschlagen, …', 'Ich würde Hilfe holen bei …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Warnzeichen für Abhängigkeit', punkte: ['nicht **aufhören** können', '**immer mehr** brauchen', '**Schule, Schlaf, Freunde** leiden', 'gereizt, wenn es nicht geht'] },
         { titel: 'Das hilft', punkte: ['**Grenzen** festlegen (Zeit, Ort)', '**andere Freuden** pflegen', '**reden**: Vertrauensperson, 116 111'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mach einen Plan für Yusuf oder für dich (freiwillig): Wie viel Bildschirmzeit ist gut? Was machst du stattdessen?', stufe: 2, kopf: ['Tag', 'Bildschirm (Spiele, Social Media)', 'stattdessen'], breiten: [18, 41, 41], zeilen: [['Mo–Fr', '[z. B. höchstens 1 Stunde, nach den Hausaufgaben]', '[z. B. Basketball, Freunde treffen]'], ['Sa–So', '[z. B. höchstens 2 Stunden, nicht nach 22 Uhr]', '[z. B. Ausflug, Musik]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an Yusuf vom letzten Winter: Was würdest du ihm raten?', stufe: 2,
        anfaenge: ['Lieber Yusuf,', 'ich habe gemerkt, dass …', 'Ich rate dir …', 'Du bist nicht allein, …'], zeilen: 8,
        beispiel: 'Lieber Yusuf, ich habe gemerkt, dass du immer müde bist und nicht mehr zum Basketball kommst. Ich rate dir, mit jemandem darüber zu reden und feste Zeiten für das Spiel zu machen. Leg das Handy nachts aus dem Zimmer. Du bist nicht allein: Wir vermissen dich beim Training!' },
    ],
    check: ['Ich erkläre, wie aus Spaß eine Abhängigkeit werden kann.', 'Ich nenne Warnzeichen.', 'Ich nenne Strategien und Hilfe.'],
  },
  // ================================================================ 7
  {
    thema: 'Erste Hilfe · Notruf 112 · stabile Seitenlage', titel: 'Erste Hilfe – jeder kann helfen', untertitel: 'Prüfen, rufen, helfen: Du lernst den Notruf, die stabile Seitenlage und was bei kleinen Verletzungen hilft.',
    ziel: { de: 'Ich setze einen Notruf ab und kenne die wichtigsten Erste-Hilfe-Schritte.', fr: 'Je passe un appel d’urgence et je connais les gestes de premiers secours.' },
    bild: ['lio:besorgt:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Notrufnummern',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Nummer? Verbinde.', stufe: 1, links: ['Notarzt, Feuerwehr (Notruf)', 'Polizei', 'Hilfe für Kinder und Jugendliche bei Sorgen'], rechts: ['112', '113', '116 111'], ordnung: [1, 2, 0] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Anleitung (vereinfacht – ein richtiger Erste-Hilfe-Kurs ist sehr zu empfehlen)', titel: 'Prüfen – Rufen – Helfen',
      material: ['ruhig bleiben', 'ein Handy', 'wenn möglich: Verbandskasten'],
      schritte: [
        { icon: 'eye', text: '**Prüfen:** Ist der Ort sicher (Verkehr, Feuer, Strom)? Sprich die Person laut an und tippe sie an den Schultern an. Reagiert sie? Atmet sie normal?' },
        { icon: 'phone', text: '**Rufen:** Wähle **112**. Sag ruhig: **Wo** ist es passiert? **Was** ist passiert? **Wie viele** Verletzte? Leg erst auf, wenn die Leitstelle es sagt.' },
        { icon: 'first-aid-kit', text: '**Helfen:** Bleib bei der Person, sprich mit ihr und halte sie warm, zum Beispiel mit einer Jacke.' },
        { icon: 'arrow-big-right', text: '**Bewusstlos, aber atmet normal:** Lege die Person in die **stabile Seitenlage**. So kann sie nicht an Erbrochenem ersticken.' },
        { icon: 'heart', text: '**Atmet nicht normal:** Die Leitstelle erklärt dir am Telefon die Herzdruckmassage. Mach mit, bis Hilfe kommt.' },
      ],
      danach: ['Bei kleinen Wunden: mit sauberem Wasser ausspülen und ein Pflaster oder einen Verband darauf. Bei Verbrennungen: 10 bis 20 Minuten unter lauwarmes, fließendes Wasser halten.'],
      woerter: [['die Erste Hilfe', 'les premiers secours'], ['der Notruf', 'l’appel d’urgence'], ['bewusstlos', 'inconscient'], ['atmen', 'respirer'], ['die stabile Seitenlage', 'la position latérale de sécurité'], ['die Herzdruckmassage', 'le massage cardiaque'], ['der Verband', 'le pansement'], ['die Leitstelle', 'le centre d’appels d’urgence']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Die W-Fragen beim Notruf. Ergänze für dieses Beispiel: Ein Junge ist auf dem Schulhof von der Mauer gefallen und blutet am Kopf.', stufe: 2, kopf: ['Frage', 'Antwort'], breiten: [30, 70], zeilen: [['Wo?', '[Schulhof der Schule …, Adresse …]'], ['Was?', '[Ein Junge ist von der Mauer gefallen und blutet am Kopf.]'], ['Wie viele?', '[ein Verletzter]'], ['Warten!', '[nicht auflegen, bis die Leitstelle es sagt]']] },
      ],
    },
    hoeren: {
      was: 'Ein Notruf', wo: 'Park · Samstagnachmittag', titel: '112 – was ist passiert?',
      situation: 'Lio sieht, dass eine ältere Frau im Park umgefallen ist. Er ruft die 112.',
      bild: ['lio:besorgt:handy', 'oma:muede:sitzen'], sprecher: { Leitstelle: 'm1', Lio: 'm3' },
      text: [
        ['Leitstelle', 'Notruf 112, wo genau ist der Notfallort?'],
        ['Lio', 'Im Stadtpark, beim großen Brunnen, neben dem Spielplatz.'],
        ['Leitstelle', 'Was ist passiert?'],
        ['Lio', 'Eine ältere Frau ist umgefallen. Sie liegt auf dem Boden.'],
        ['Leitstelle', 'Spricht sie mit dir? Atmet sie?'],
        ['Lio', 'Sie macht die Augen auf, aber sie ist ganz verwirrt. Ja, sie atmet.'],
        ['Leitstelle', 'Gut gemacht. Der Rettungswagen ist unterwegs. Bleib bei ihr, sprich mit ihr und deck sie mit einer Jacke zu. Wenn sich etwas ändert, ruf sofort wieder an.'],
        ['Lio', 'Okay. Ich bleibe hier.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist beim Notruf am wichtigsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['genau sagen, wo man ist', 'schnell wieder auflegen', 'den eigenen Namen buchstabieren'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze die Notruf-Infos.', stufe: 1, kopf: ['Frage', 'Lios Antwort'], breiten: [30, 70], zeilen: [['Wo?', '[im Stadtpark, beim großen Brunnen, neben dem Spielplatz]'], ['Was?', '[eine ältere Frau ist umgefallen]'], ['Atmet sie?', '[ja; sie ist verwirrt]'], ['Was soll Lio tun?', '[bei ihr bleiben, mit ihr sprechen, mit einer Jacke zudecken]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt Notrufe nach: Eine Person ist die Leitstelle, eine ruft an. Wechselt die Situationen.', stufe: 2, karten: [
        { titel: 'Situationen', text: ['Fahrradunfall vor der Schule', 'Jemand ist beim Sport bewusstlos', 'Rauch aus einem Keller'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Prüfen – Rufen – Helfen', nummern: true, punkte: ['**Prüfen**: Sicherheit, Ansprechen, Atmung', '**Rufen**: 112 – Wo? Was? Wie viele? Warten!', '**Helfen**: bleiben, wärmen, Seitenlage'] },
         { titel: 'Wichtige Nummern', punkte: ['**112**: Notarzt, Rettungswagen, Feuerwehr', '**113**: Polizei', '**116 111**: Hilfe bei Sorgen (Kinder und Jugendliche)'] }],
        [{ art: 'tipp', titel: 'Helfen ist immer richtig', text: 'Man kann bei der Ersten Hilfe **nichts falsch machen** – nur **nichts tun** ist falsch. Die Leitstelle hilft dir am Telefon.' }],
      ],
    },
    ueben: [
      { art: 'ordnen', auftrag: 'Stabile Seitenlage: Bringe die Schritte in die richtige Reihenfolge. (Übt sie mit einer Fachperson.)', stufe: 2, teile: ['Neben der Person knien, den nahen Arm angewinkelt nach oben legen.', 'Den fernen Arm über die Brust legen, die Hand an die Wange.', 'Das ferne Bein am Knie beugen.', 'Am Knie zu sich herüberziehen, die Person dreht sich auf die Seite.', 'Kopf leicht nach hinten neigen, Mund öffnen: So bleibt der Atemweg frei.'], ordnung: [2, 4, 0, 3, 1] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe auf, wie du einen Notruf machst, wenn jemand auf dem Schulhof bewusstlos ist. Benutze die W-Fragen.', stufe: 2,
        anfaenge: ['Zuerst prüfe ich …', 'Dann rufe ich 112 an und sage: …', 'Danach …'], zeilen: 8,
        beispiel: 'Zuerst prüfe ich, ob der Ort sicher ist, und spreche die Person laut an. Dann rufe ich 112 an und sage: Wir sind auf dem Schulhof des Lycée, Adresse … Ein Mädchen ist umgefallen und reagiert nicht, sie atmet aber. Es gibt eine Verletzte. Danach bleibe ich bei ihr, lege sie in die stabile Seitenlage und hole eine Lehrkraft.' },
    ],
    check: ['Ich kenne die Nummern 112, 113 und 116 111.', 'Ich mache einen Notruf mit den W-Fragen.', 'Ich kenne die Schritte Prüfen – Rufen – Helfen.'],
  },
  // ================================================================ 8
  {
    thema: 'Klima · Treibhauseffekt · Energie sparen', titel: 'Das Klima schützen – im Alltag', untertitel: 'Was ist der Treibhauseffekt, und was kann ich selbst tun? Du liest, hörst eine Klimaschutz-Woche und rechnest Einsparungen aus.',
    ziel: { de: 'Ich erkläre den Treibhauseffekt einfach und nenne, wie ich im Alltag Energie spare.', fr: 'J’explique simplement l’effet de serre et je cite des façons d’économiser l’énergie.' },
    bild: ['amira:froh:stehen-zeigen', 'tom:froh:stehen'],
    start: {
      was: 'Energie im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Wobei verbraucht man Energie? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Heizen', 'Auto fahren', 'warm duschen', 'Handy laden', 'zu Fuß gehen'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Eine Decke um die Erde',
      absaetze: [
        'Um die Erde liegt eine Hülle aus Luft, die **Atmosphäre**. Sie wirkt wie die Scheiben eines **Treibhauses**: Sonnenlicht kommt hinein, und ein Teil der Wärme bleibt drin. Ohne diesen natürlichen **Treibhauseffekt** wäre es auf der Erde eiskalt.',
        '### Zu viel des Guten',
        'Seit etwa 200 Jahren verbrennen die Menschen sehr viel **Kohle, Erdöl und Gas** – in Fabriken, Kraftwerken, Heizungen und Autos. Dabei entsteht das Gas **Kohlenstoffdioxid** (CO₂). Es verstärkt den Treibhauseffekt: Die Decke um die Erde wird dicker, und es wird **wärmer**. Das nennt man den **Klimawandel**. Folgen sind zum Beispiel mehr Hitzewellen, Trockenheit und Starkregen.',
        '### Was kann ich tun?',
        'Große Veränderungen müssen Staaten und Firmen machen. Aber auch jede und jeder kann mithelfen: zu Fuß, mit dem Fahrrad oder mit Bus und Zug fahren (in Luxemburg ist der öffentliche Verkehr kostenlos), **Licht ausschalten**, Geräte nicht im Standby lassen, **kürzer duschen**, weniger Essen wegwerfen und Dinge länger benutzen.',
      ],
      woerter: [['das Klima', 'le climat'], ['der Treibhauseffekt', 'l’effet de serre'], ['die Atmosphäre', 'l’atmosphère'], ['das Kohlenstoffdioxid (CO₂)', 'le dioxyde de carbone (CO₂)'], ['der Klimawandel', 'le changement climatique'], ['verbrennen', 'brûler'], ['Energie sparen', 'économiser l’énergie'], ['der Standby', 'la veille (mode)']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Wie entsteht der Klimawandel? Ordne.', stufe: 1, teile: ['Menschen verbrennen Kohle, Öl und Gas.', 'Dabei entsteht viel CO₂.', 'Das CO₂ verstärkt den Treibhauseffekt.', 'Es bleibt mehr Wärme in der Atmosphäre.', 'Die Erde wird wärmer.'], ordnung: [1, 3, 0, 4, 2] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Ohne Treibhauseffekt wäre es auf der Erde eiskalt.', true], ['CO₂ entsteht beim Verbrennen von Kohle, Öl und Gas.', true], ['In Luxemburg kosten Bus und Zug viel Geld.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 6P2 · Projekt „Klima-Woche“', titel: 'Unsere Klima-Woche',
      situation: 'Amira und Tom berichten, was die Klasse in ihrer Klima-Woche ausprobiert hat.',
      bild: ['amira:froh:stehen-zeigen', 'tom:froh:stehen'], sprecher: { Amira: 'w2', Tom: 'm3', 'Frau Sommer': 'w1' },
      text: [
        ['Frau Sommer', 'Was habt ihr in der Klima-Woche ausprobiert?'],
        ['Amira', 'Ich bin jeden Tag mit dem Fahrrad gekommen statt mit dem Elterntaxi. Das sind sechs Kilometer am Tag weniger mit dem Auto.'],
        ['Tom', 'Ich habe kürzer geduscht. Statt zehn Minuten nur fünf. Ich habe eine Sanduhr ins Bad gestellt.'],
        ['Frau Sommer', 'Und als Klasse?'],
        ['Amira', 'Wir haben in den Pausen immer das Licht und den Beamer ausgemacht. Und wir haben die Heizung um ein Grad runtergedreht und dafür Pullis angezogen.'],
        ['Tom', 'Am Anfang war das nervig. Aber nach drei Tagen war es normal.'],
        ['Frau Sommer', 'Toll! Jede kleine Sache spart Energie. Und wenn viele mitmachen, wird daraus etwas Großes.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Elterntaxi“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Eltern bringen ihre Kinder mit dem Auto zur Schule.', 'ein Taxi für Eltern'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer hat was gemacht?', stufe: 1, kopf: ['Wer?', 'Was?'], breiten: [24, 76], zeilen: [['Amira', '[jeden Tag mit dem Fahrrad statt mit dem Auto]'], ['Tom', '[5 statt 10 Minuten duschen, mit Sanduhr]'], ['die Klasse', '[Licht und Beamer in den Pausen aus, Heizung 1 Grad niedriger]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant eine eigene Klima-Woche. Jede und jeder wählt eine Sache aus.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Fahrrad, Bus oder zu Fuß', 'kürzer duschen', 'Licht aus', 'kein Standby', 'Reste essen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Treibhauseffekt', punkte: ['natürlich: hält die Erde **warm**', 'mehr **CO₂** durch Kohle, Öl, Gas', '→ Erde wird **wärmer** (Klimawandel)'] },
         { titel: 'Im Alltag Energie sparen', punkte: ['**Fahrrad, Bus, Zug**, zu Fuß', '**Licht aus**, kein Standby', '**kürzer duschen**, Heizung 1 °C weniger', 'weniger **wegwerfen**'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Rechne die Einsparungen der Klima-Woche aus.', stufe: 2, spalten: 2, items: [
        { a: 'Amira fährt 5 Tage je 6 km mit dem Fahrrad statt mit dem Auto. Wie viele Auto-Kilometer spart sie?', l: '5 · 6 = 30 km', raum: 2 },
        { a: 'Ein Auto stößt etwa 150 g CO₂ pro km aus. Wie viel CO₂ spart Amira in der Woche?', l: '30 · 150 g = 4500 g = 4,5 kg', raum: 2 },
        { a: 'Tom duscht 5 Minuten kürzer. Pro Minute fließen etwa 10 Liter. Wie viel Wasser spart er pro Dusche?', l: '5 · 10 = 50 Liter', raum: 2 },
        { a: 'Tom duscht 7-mal pro Woche. Wie viel Wasser spart er in einer Woche?', l: '7 · 50 = 350 Liter', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein Klima-Versprechen für dich oder deine Klasse: drei Dinge, die ihr einen Monat lang macht.', stufe: 2,
        anfaenge: ['Unser Klima-Versprechen:', '1. Wir …', '2. Wir …', '3. Wir …', 'Wir prüfen am Ende, ob …'], zeilen: 7,
        beispiel: 'Unser Klima-Versprechen: 1. Wir machen in jeder Pause das Licht und den Beamer aus. 2. Wir kommen mindestens dreimal pro Woche mit dem Fahrrad, dem Bus oder zu Fuß. 3. Wir werfen kein Pausenbrot mehr weg. Wir prüfen am Ende des Monats, was wir geschafft haben.' },
    ],
    check: ['Ich erkläre den Treibhauseffekt mit einfachen Worten.', 'Ich nenne Wege, im Alltag Energie zu sparen.', 'Ich rechne eine Einsparung aus.'],
  },
]
