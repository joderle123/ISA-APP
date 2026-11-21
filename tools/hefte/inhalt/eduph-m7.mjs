// Sport · Modul 7 (5P) „Mannschaftssport“ – Éducation physique et sportive, Voie de préparation.
// Fußball (Feld beschriften, Regeln, Schiedsrichter-Szene), Volleyball (Pritschen, Baggern, Feld, Regeln, Rotation),
// Teamgeist (faire Teamwahl, Rollenkarten, Sitzvolleyball), Projekt Schiedsrichter (Handzeichen, Entscheidungen).
// Regeln vereinfacht, Stand 2026.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { spielfeld, volleyRotation, schiriZeichen } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 7, {
  titel: 'Mannschaftssport',
  titelFr: 'Sports collectifs',
  unter: 'Fußball und Volleyball: Regeln, Felder und Techniken kennen, als Team zusammenspielen, Teams fair bilden – und selbst ein Spiel als Schiedsrichterin oder Schiedsrichter leiten.',
  unterFr: 'Football et volley-ball : règles, terrains, techniques, esprit d’équipe et arbitrage.',
  farbe: '#2e7d4f',
  deckbild: ['amira:aufgeregt:stehen-zeigen', 'nele:froh:rollstuhl', 'tom:froh:stehen'],
  blasen: [{ t: 'Meiner!', x: 8, y: 104 }, { t: 'Frei!', x: 140, y: 92 }, { t: 'Nächster Ball!', x: 172, y: 150 }],
  aussprache: { '(\\d+) : (\\d+)': '\\1 zu \\2' },
  themen: [
    { titel: { de: 'Fußball', fr: 'Football' }, icon: 'ball-football', lektionen: 1 },
    { titel: { de: 'Volleyball', fr: 'Volley-ball' }, icon: 'ball-volleyball', lektionen: 2 },
    { titel: { de: 'Team und Fairplay', fr: 'Équipe et fair-play' }, icon: 'users', lektionen: 2 },
  ],
})

const TEAM = '#2e7d4f'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Fußball: Feld und Regeln', titel: 'Anstoß!', untertitel: 'Fußball ist eine der beliebtesten Sportarten der Welt. Du lernst das Feld und die wichtigsten Regeln kennen und hörst eine Schiedsrichterin bei der Arbeit.',
    ziel: { de: 'Ich kenne das Fußballfeld und die wichtigsten Regeln.', fr: 'Je connais le terrain de football et les règles principales.' },
    bild: ['chloe:froh:stehen-zeigen', 'ben:froh:stehen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Personen hat eine Fußballmannschaft auf dem Feld? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['11', '9', '7'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Fußballregeln (vereinfacht, Stand 2026)', titel: 'Die wichtigsten Regeln',
      absaetze: [
        '**Mannschaft und Zeit:** Eine Mannschaft hat **elf** Personen auf dem Feld, eine davon steht im **Tor**. Nur sie darf den Ball im eigenen **Strafraum** mit den Händen spielen. Ein Spiel dauert zweimal 45 Minuten. In der Schule spielt man meist kürzer und mit kleineren Teams.',
        '**Ball im Aus:** Geht der Ball über die **Seitenlinie**, gibt es **Einwurf**: mit beiden Händen von hinten über den Kopf, beide Füße bleiben auf dem Boden. Geht der Ball über die **Torlinie** und hat ihn zuletzt die verteidigende Mannschaft berührt, gibt es **Eckstoß**. Sonst gibt es **Abstoß** vom Tor.',
        '**Fouls:** Wer einen Gegner tritt, festhält oder stößt, begeht ein **Foul**. Dann gibt es **Freistoß**. Passiert das Foul im eigenen Strafraum, gibt es **Elfmeter** vom Elfmeterpunkt.',
        '**Karten:** Die **gelbe Karte** ist eine Verwarnung. Die **rote Karte** heißt: vom Platz. Wer im selben Spiel zwei gelbe Karten bekommt, muss auch vom Platz.',
        '**Abseits:** Du bekommst einen Pass. Genau in diesem Moment bist du in der gegnerischen Hälfte näher am Tor als der Ball und als der vorletzte Gegner. Dann stehst du im **Abseits**. Der vorletzte Gegner ist meist der letzte Verteidiger vor dem Torwart. In der eigenen Hälfte gibt es kein Abseits.',
      ],
      woerter: [['die Mannschaft', 'l’équipe'], ['der Einwurf', 'la touche'], ['der Eckstoß', 'le corner'], ['der Abstoß', 'le coup de pied de but'], ['das Foul', 'la faute'], ['der Freistoß', 'le coup franc'], ['der Elfmeter', 'le penalty'], ['das Abseits', 'le hors-jeu']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gibt es? Verbinde.', stufe: 1, links: ['Der Ball geht über die Seitenlinie.', 'Eine Verteidigerin schießt den Ball über die eigene Torlinie.', 'Ein Spieler wird im Mittelfeld festgehalten.', 'Ein Verteidiger foult im eigenen Strafraum.'], rechts: ['Einwurf', 'Eckstoß', 'Freistoß', 'Elfmeter'] },
      ],
    },
    hoeren: {
      was: 'Eine Spielszene', wo: 'Sportplatz · Schulspiel', titel: 'Pfiff!',
      situation: 'Chloé ist Schiedsrichterin beim Schulspiel Blau gegen Rot. Ben spielt bei Blau, Finn bei Rot. Hör zu: Was entscheidet Chloé?',
      bild: ['chloe:froh:stehen-zeigen', 'ben:wuetend:stehen'], sprecher: { 'Chloé': 'w3', Ben: 'm2', Finn: 'm3' },
      text: [
        ['Chloé', 'Pfiff! Der Ball ist über die Seitenlinie. Einwurf für Blau.'],
        ['Ben', 'Ich werfe ein … so!'],
        ['Chloé', 'Halt, Ben. Dein Fuß war in der Luft. Beim Einwurf bleiben beide Füße auf dem Boden. Einwurf für Rot.'],
        ['Ben', 'Echt jetzt? Das ist doch kleinlich!'],
        ['Chloé', 'So ist die Regel. … Weiter geht’s. Oh, Finn hat den Ball über die eigene Torlinie geschossen. Eckstoß für Blau!'],
        ['Finn', 'Sorry, Leute.'],
        ['Chloé', 'Pfiff! Foul im Strafraum. Finn hat Ben am Trikot festgehalten. Elfmeter für Blau.'],
        ['Ben', 'Ich schieße … Tor!'],
        ['Chloé', 'Tor für Blau. Und Ben: Vorhin hast du dich beschwert. Danke, dass du trotzdem fair geblieben bist.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Schiedsrichterin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie achtet auf die Regeln und entscheidet.', 'Sie schießt die Tore.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was entscheidet Chloé?', stufe: 1, kopf: ['Situation', 'Entscheidung'], breiten: [55, 45], zeilen: [['Ball über die Seitenlinie', '[Einwurf für Blau]'], ['Bens Fuß ist beim Einwurf in der Luft.', '[Einwurf für Rot]'], ['Finn schießt über die eigene Torlinie.', '[Eckstoß für Blau]'], ['Finn hält Ben im Strafraum fest.', '[Elfmeter für Blau]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ben findet eine Entscheidung kleinlich. Was macht ihr, wenn ihr eine Entscheidung ungerecht findet?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich bleibe ruhig und …', 'Ich frage nach, warum …', 'Nach dem Spiel …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ball im Aus', punkte: ['Seitenlinie: **Einwurf**', 'Torlinie, Verteidigung zuletzt: **Eckstoß**', 'Torlinie, Angriff zuletzt: **Abstoß**'] },
         { titel: 'Fouls', punkte: ['Foul: **Freistoß**', 'Foul im eigenen Strafraum: **Elfmeter**', '**gelb** = Verwarnung', '**rot** = vom Platz'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Beschrifte das Fußballfeld.', stufe: 1, html: '<div class="voll">' + spielfeld('fussball') + '</div>', liste: [['1', 'Tor'], ['2', 'Strafraum'], ['3', 'Mittellinie'], ['4', 'Mittelkreis'], ['5', 'Seitenlinie'], ['6', 'Elfmeterpunkt']], spalten: 3 },
      { art: 'mc', auftrag: 'Erlaubt oder nicht? Kreuze an.', stufe: 2, fragen: [{ f: 'Die Torhüterin fängt den Ball im eigenen Strafraum.', o: ['erlaubt', 'Foul'], r: 0 }, { f: 'Ein Spieler stößt einen Gegner mit beiden Händen weg.', o: ['erlaubt', 'Foul'], r: 1 }, { f: 'Ein Spieler bekommt die zweite gelbe Karte.', o: ['Er spielt weiter.', 'Er muss vom Platz.'], r: 1 }, { f: 'Beim Einwurf springt eine Spielerin hoch.', o: ['erlaubt', 'falscher Einwurf'], r: 1 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Fußballregel findest du besonders wichtig? Warum?', stufe: 2,
        anfaenge: ['Besonders wichtig finde ich …', 'weil …', 'Ohne diese Regel …'], zeilen: 5,
        beispiel: 'Besonders wichtig finde ich die Regel gegen Fouls, weil sonst schnell jemand verletzt wird. Ohne diese Regel würden die Stärksten einfach alle umrennen.' },
    ],
    check: ['Ich kenne die Teile des Fußballfelds.', 'Ich weiß, wann es Einwurf, Eckstoß und Abstoß gibt.', 'Ich kenne Freistoß, Elfmeter und die Karten.'],
  },
  // ================================================================ 2
  {
    thema: 'Volleyball: Pritschen und Baggern', titel: 'Hände hoch, Arme gestreckt', untertitel: 'Beim Volleyball darf der Ball nie den Boden berühren. Du lernst die zwei wichtigsten Techniken und den Aufschlag von unten – und übst mit einem Partner.',
    ziel: { de: 'Ich spiele den Ball im Pritschen und Baggern.', fr: 'Je joue le ballon en touche haute et en manchette.' },
    bild: ['mia:froh:stehen', 'yusuf:froh:stehen-zeigen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie oft darf eine Mannschaft beim Volleyball den Ball berühren, bevor er übers Netz muss? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['höchstens dreimal', 'so oft sie will', 'nur einmal'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sportwissen', titel: 'Die zwei wichtigsten Techniken',
      absaetze: [
        '### Pritschen',
        'Das **Pritschen** ist ein Zuspiel über dem Kopf. Forme mit beiden Händen ein **Dreieck** aus Daumen und Zeigefingern und halte es über die Stirn. Der Ball wird nur mit den **Fingern** gespielt, nicht mit der Handfläche. Beuge leicht die Knie und strecke dann Arme und Beine **gleichzeitig**. Pritschen ist genau und gut für hohe Bälle.',
        '### Baggern',
        'Das **Baggern** nutzt man für tiefe und harte Bälle. Lege eine Hand in die andere, die Daumen liegen **nebeneinander**. Die Arme sind **gestreckt** und bilden eine flache Fläche. Der Ball wird mit den **Unterarmen** gespielt. Geh tief in die Knie und spiel den Ball aus den Beinen, nicht mit Schwung aus den Armen.',
        '### Der Aufschlag von unten',
        'Für den Anfang eignet sich der **Aufschlag von unten**. Wer mit rechts schlägt, stellt den linken Fuß nach vorn. Halte den Ball vor dem Körper und schlage ihn mit der festen Hand von unten nach vorn.',
        'Ruf laut **„Meiner!“** oder **„Hab ihn!“**, bevor du den Ball spielst. So weiß dein Team Bescheid, und niemand stößt zusammen.',
      ],
      woerter: [['pritschen', 'faire une touche haute'], ['baggern', 'faire une manchette'], ['die Stirn', 'le front'], ['der Daumen', 'le pouce'], ['der Unterarm', 'l’avant-bras'], ['gestreckt', 'tendu'], ['beugen', 'fléchir'], ['zusammenstoßen', 'se heurter']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Pritschen oder Baggern? Kreuze an.', stufe: 1, kopf: ['', 'Pritschen', 'Baggern'], breiten: [60, 20, 20], zeilen: [['mit den Fingern', '[x]', ''], ['mit den Unterarmen', '', '[x]'], ['für hohe Bälle', '[x]', ''], ['für tiefe, harte Bälle', '', '[x]'], ['Hände bilden ein Dreieck über der Stirn.', '[x]', ''], ['Die Daumen liegen nebeneinander.', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Volleyball', titel: 'Zehn Kontakte',
      situation: 'Frau Diallo erklärt eine Übung zu zweit. Mia und Yusuf probieren sie aus.',
      bild: ['lehrerin:froh:erklaeren', 'mia:froh:stehen'], sprecher: { 'Frau Diallo': 'w1', Mia: 'w3', Yusuf: 'm3' },
      text: [
        ['Frau Diallo', 'Ihr spielt zu zweit, ungefähr drei Meter auseinander. Erst nur Pritschen: Hände zum Dreieck, über die Stirn.'],
        ['Mia', 'Aua, der Ball tut an den Händen weh.'],
        ['Frau Diallo', 'Du spielst ihn mit der Handfläche, Mia. Nur die Finger berühren den Ball. Und die Hände sind schon oben, bevor der Ball kommt.'],
        ['Frau Diallo', 'Ziel: zehn Pässe hintereinander, ohne dass der Ball den Boden berührt.'],
        ['Yusuf', 'Wir haben sechs geschafft!'],
        ['Frau Diallo', 'Gut. Jetzt Baggern: Eine Person wirft den Ball tief, die andere baggert zurück. Arme gestreckt, Daumen nebeneinander.'],
        ['Yusuf', 'Mein Ball fliegt immer nach hinten weg.'],
        ['Frau Diallo', 'Du schwingst die Arme zu stark, Yusuf. Bleib ruhig und drück aus den Beinen nach oben. Die Arme sind nur ein Brett.'],
        ['Frau Diallo', 'Zum Schluss: Wer zuerst zehn Kontakte im Wechsel schafft, ruft laut „Zehn!“.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „im Wechsel“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['abwechselnd: einmal du, einmal ich', 'alle gleichzeitig'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welchen Fehler macht Mia beim Pritschen?', zeilen: 2, l: 'Sie spielt den Ball mit der Handfläche statt nur mit den Fingern.' }, { f: 'Was ist das Ziel der ersten Übung?', l: 'zehn Pässe hintereinander ohne Bodenkontakt' }, { f: 'Welchen Fehler macht Yusuf beim Baggern? Was soll er tun?', zeilen: 2, l: 'Er schwingt die Arme zu stark. Er soll ruhig bleiben und aus den Beinen nach oben drücken.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Beobachtet euch gegenseitig und gebt einen Tipp zum Pritschen oder Baggern.', stufe: 2, karten: [
        { titel: 'Tipp geben', text: ['Gut war …', 'Achte auf …', 'Versuch mal …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Pritschen', punkte: ['Hände: **Dreieck** über der Stirn', 'nur mit den **Fingern**', 'für **hohe** Bälle', 'Arme und Beine **strecken**'] },
         { titel: 'Baggern', punkte: ['Daumen **nebeneinander**', 'Arme **gestreckt**', 'mit den **Unterarmen**', 'aus den **Beinen** spielen'] }],
      ],
    },
    ueben: [
      { art: 'ordnen', auftrag: 'Bring die Schritte beim Baggern in die richtige Reihenfolge.', stufe: 1, teile: ['eine Hand in die andere legen, Daumen nebeneinander', 'die Arme strecken', 'tief in die Knie gehen', 'den Ball mit den Unterarmen treffen', 'aus den Beinen nach oben drücken'], ordnung: [3, 0, 4, 1, 2] },
      { art: 'tabelle', auftrag: 'Mein Volleyball-Protokoll: Wie viele von 10 Versuchen klappen?', stufe: 1, kopf: ['Übung', 'Versuch 1', 'Versuch 2', 'Versuch 3'], breiten: [40, 20, 20, 20], zeilen: [['Pritschen zu zweit', '… von 10', '… von 10', '… von 10'], ['Baggern zu zweit', '… von 10', '… von 10', '… von 10'], ['Aufschlag von unten übers Netz', '… von 10', '… von 10', '… von 10']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Pritschen oder Baggern – was klappt bei dir besser? Woran willst du arbeiten?', stufe: 1,
        anfaenge: ['Besser klappt bei mir …', 'Schwierig ist …', 'Ich will üben, …'], zeilen: 5,
        beispiel: 'Besser klappt bei mir das Baggern, weil ich die Arme schon gut gestreckt halte. Schwierig ist das Pritschen, weil mir der Ball oft durch die Finger rutscht. Ich will üben, die Hände früher nach oben zu nehmen.' },
    ],
    check: ['Ich pritsche mit den Fingern.', 'Ich baggere mit gestreckten Armen.', 'Ich schlage von unten auf.'],
  },
  // ================================================================ 3
  {
    thema: 'Volleyball: Regeln und Rotation', titel: 'Drei Kontakte und weiter', untertitel: 'Beim Volleyball wechseln alle ihre Position. Du lernst das Feld, die Regeln und die Rotation kennen – und verfolgst ein spannendes Spiel.',
    ziel: { de: 'Ich kenne die Volleyballregeln und die Rotation.', fr: 'Je connais les règles du volley-ball et la rotation.' },
    bild: ['noah:froh:stehen-zeigen', 'amira:froh:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Der Volleyball landet genau auf der Linie. Was gilt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er ist im Feld.', 'Er ist im Aus.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Volleyballregeln (vereinfacht, Stand 2026)', titel: 'So wird gespielt',
      absaetze: [
        '**Das Feld:** Das **Netz** teilt das Feld in zwei Hälften. In jeder Hälfte trennt die **Angriffslinie** das **Vorderfeld** am Netz vom **Hinterfeld**. Hinten begrenzt die **Grundlinie** das Feld, an den Seiten die **Seitenlinien**. Ein Ball auf der Linie ist **im Feld**.',
        '**Die Mannschaft:** Sechs Personen stehen auf dem Feld, drei vorn und drei hinten. Pro Seite darf man den Ball höchstens **dreimal** berühren. Niemand darf den Ball **zweimal hintereinander** spielen.',
        '**Punkte:** Jeder Ballwechsel bringt einen Punkt. Ein Satz geht bis **25 Punkte**, mit zwei Punkten Vorsprung. Wer drei Sätze gewinnt, gewinnt das Spiel.',
        '**Fehler:** Der Ball landet im Aus oder auf dem Boden der eigenen Seite, das Team braucht mehr als drei Berührungen, oder jemand berührt beim Spielen das **Netz**.',
        '**Rotation:** Holt sich eine Mannschaft das Aufschlagrecht vom Gegner zurück, **rotiert** sie: Alle rücken eine Position **im Uhrzeigersinn** weiter. Wer jetzt hinten rechts steht, auf **Position 1**, schlägt auf.',
      ],
      woerter: [['die Angriffslinie', 'la ligne d’attaque'], ['das Vorderfeld', 'la zone avant'], ['das Hinterfeld', 'la zone arrière'], ['die Grundlinie', 'la ligne de fond'], ['berühren', 'toucher'], ['hintereinander', 'd’affilée'], ['im Uhrzeigersinn', 'dans le sens des aiguilles d’une montre'], ['das Aufschlagrecht', 'le droit de servir']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte das Volleyballfeld.', stufe: 1, html: '<div class="voll">' + spielfeld('volleyball') + '</div>', liste: [['1', 'Netz'], ['2', 'Angriffslinie'], ['3', 'Hinterfeld'], ['4', 'Grundlinie'], ['5', 'Seitenlinie'], ['6', 'Vorderfeld']], spalten: 3 },
      ],
    },
    hoeren: {
      was: 'Ein Spielkommentar', wo: 'Sporthalle · Volleyballspiel', titel: 'Wer schlägt auf?',
      situation: 'Team Grün spielt gegen Team Orange. Noah kommentiert das Spiel. Amira spielt bei Grün.',
      bild: ['noah:aufgeregt:stehen-zeigen', 'amira:verwirrt:stehen'], sprecher: { Noah: 'm3', Amira: 'w2' },
      text: [
        ['Noah', 'Es steht 12 zu 14 für Orange. Orange hat Aufschlag. Lina schlägt von unten auf … der Ball ist drüben.'],
        ['Noah', 'Team Grün: Amira baggert, Tom pritscht, Lea spielt den Ball übers Netz. Drei Kontakte – genau richtig!'],
        ['Noah', 'Orange kommt nicht ran. Punkt für Grün! 13 zu 14. Und Grün holt sich das Aufschlagrecht zurück.'],
        ['Amira', 'Moment, wer schlägt jetzt bei uns auf?'],
        ['Noah', 'Ihr müsst rotieren! Alle eine Position weiter im Uhrzeigersinn. Amira, du warst vorn rechts auf Position 2. Jetzt bist du hinten rechts, auf Position 1. Du schlägst auf.'],
        ['Amira', 'Okay … Oh nein, der Ball ist im Netz.'],
        ['Noah', 'Punkt für Orange, 13 zu 15. Jetzt hat Orange wieder Aufschlag und rotiert.'],
        ['Noah', 'Aufschlag Orange … Tom will den Ball pritschen und berührt dabei das Netz. Fehler! Punkt für Orange, 13 zu 16.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht ein Kommentator? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er beschreibt, was im Spiel passiert.', 'Er pfeift Fouls.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer bekommt den Punkt? Wie steht es danach?', stufe: 2, kopf: ['Was passiert?', 'Punkt für', 'Grün : Orange'], breiten: [56, 20, 24], zeilen: [['Orange kommt nicht an den Ball.', '[Grün]', '[13 : 14]'], ['Amiras Aufschlag geht ins Netz.', '[Orange]', '[13 : 15]'], ['Tom berührt das Netz.', '[Orange]', '[13 : 16]']] },
        { art: 'fragen', auftrag: 'Warum schlägt Amira auf?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Grün hat das Aufschlagrecht zurückgeholt und rotiert. Amira rückt von Position 2 auf Position 1, und Position 1 schlägt auf.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch zu sechst auf und spielt die Rotation langsam durch. Wer ruft „Rotation!“?', stufe: 1, karten: [
        { titel: 'Rufe', text: ['Rotation!', 'Wer schlägt auf?', 'Du bist auf Position …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Regeln', punkte: ['höchstens **3 Kontakte**', 'nie **zweimal hintereinander**', 'Satz bis **25**, 2 Punkte Vorsprung', 'Linie = **im Feld**', 'Netz berühren = **Fehler**'] },
         { titel: 'Rotation', nummern: true, punkte: ['Aufschlagrecht **zurückgeholt**', 'alle eine Position **im Uhrzeigersinn** weiter', '**Position 1** schlägt auf'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Die Positionen: Das Netz ist oben. Die Pfeile zeigen die Rotation. Schreib zu jedem Buchstaben die Positionsnummer.', stufe: 3, html: '<div class="voll">' + volleyRotation({ leer: true }) + '</div>', liste: [['A', '4'], ['B', '3'], ['C', '2'], ['D', '5'], ['E', '6'], ['F', '1']], spalten: 3 },
      { art: 'tabelle', auftrag: 'Rotation: Wo steht jede Person nach einer Rotation?', stufe: 2, kopf: ['Name', 'Position vorher', 'Position nachher'], breiten: [40, 30, 30], zeilen: [['Amira', '2', '[1]'], ['Tom', '3', '[2]'], ['Lea', '4', '[3]'], ['Finn', '5', '[4]'], ['Ben', '6', '[5]'], ['Mia', '1', '[6]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Erkläre einer neuen Mitschülerin die Rotation beim Volleyball.', stufe: 2,
        anfaenge: ['Wenn dein Team …', 'Dann rücken alle …', 'Aufschlagen darf …'], zeilen: 5,
        beispiel: 'Wenn dein Team das Aufschlagrecht zurückholt, wird rotiert. Dann rücken alle eine Position im Uhrzeigersinn weiter. Aufschlagen darf die Person, die jetzt hinten rechts auf Position 1 steht.' },
    ],
    check: ['Ich kenne die Teile des Volleyballfelds.', 'Ich kenne die wichtigsten Regeln.', 'Ich weiß, wann und wie man rotiert.'],
  },
  // ================================================================ 4
  {
    thema: 'Teamgeist', titel: 'Gemeinsam stark', untertitel: 'Ein Team ist mehr als die einzelnen Personen. Du lernst, wie gute Teams miteinander reden, wie man Teams fair bildet und welche Rollen es im Team gibt.',
    ziel: { de: 'Ich trage zu einem guten Teamgeist bei.', fr: 'Je contribue à un bon esprit d’équipe.' },
    bild: ['lea:traurig:stehen', 'ben:verlegen:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie werden bei euch im Sport meistens Teams gebildet? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Zwei Kapitäne wählen abwechselnd.', 'Die Lehrperson teilt ein.', 'durch Abzählen oder Losen', 'anders'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'Was ein gutes Team ausmacht',
      absaetze: [
        '**Reden:** Gute Teams sprechen viel miteinander. Kurze Rufe wie **„Meiner!“**, **„Frei!“** oder **„Hinter dir!“** helfen im Spiel. Nach dem Spiel bespricht man, was gut lief.',
        '**Ermutigen:** Nach einem Fehler hilft kein Meckern. Ein **„Weiter!“** oder **„Nächster Ball!“** gibt neuen Mut. Wer ausgelacht wird, spielt danach oft schlechter.',
        '**Rollen:** In einem Team gibt es verschiedene Aufgaben. Die **Kapitänin** oder der **Kapitän** spricht mit der Schiedsrichterin oder dem Schiedsrichter und motiviert. Andere verteidigen, greifen an oder bauen das Spiel auf. Jede Rolle ist wichtig.',
        '**Faire Teams:** Wenn immer zwei Kapitäne wählen, bleiben oft dieselben Personen bis zum Schluss übrig. Das tut weh. Fairer ist es, durch **Abzählen** oder **Lose** einzuteilen. Oder die Lehrperson bildet die Teams so, dass sie etwa **gleich stark** sind.',
        '**Alle spielen mit:** Beim **Sitzvolleyball**, einer Sportart der Paralympics, spielen alle am Boden sitzend. So können Menschen mit und ohne Behinderung gut zusammen spielen.',
      ],
      woerter: [['der Kapitän', 'le capitaine'], ['ermutigen', 'encourager'], ['meckern', 'râler'], ['auslachen', 'se moquer de'], ['die Rolle', 'le rôle'], ['verteidigen', 'défendre'], ['angreifen', 'attaquer'], ['gleich stark', 'de même force']],
      aufgaben: [
        { art: 'mc', auftrag: 'Was hilft dem Team? Kreuze alles an, was hilft.', stufe: 1, fragen: [{ f: '', o: ['„Nächster Ball!“ nach einem Fehler', 'über einen Fehler lachen', 'laut „Meiner!“ rufen', 'allein spielen, ohne abzugeben', 'Teams durch Abzählen bilden'], r: [0, 2, 4] }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · vor dem Spiel', titel: 'Immer die Letzte',
      situation: 'Zwei Kapitäne wählen ihre Teams. Lea bleibt bis zum Schluss übrig. Danach spricht Ben mit ihr.',
      bild: ['lea:traurig:stehen', 'ben:verlegen:stehen'], sprecher: { Ben: 'm2', Lea: 'w3', 'Frau Diallo': 'w1' },
      text: [
        ['Ben', 'Ich nehme Tom. … Und dann Amira.'],
        ['Frau Diallo', 'Lea, du gehst zu Team Rot.'],
        ['Lea', 'Wie immer. Ich bin immer die Letzte.'],
        ['Ben', 'Hey, Lea. Das war nicht gegen dich. Ich habe einfach meine Freunde zuerst gewählt.'],
        ['Lea', 'Trotzdem fühlt es sich mies an. Jedes Mal stehe ich da und warte.'],
        ['Ben', 'Das habe ich nicht gemerkt. Tut mir leid.'],
        ['Frau Diallo', 'Ich habe zugehört. Ab nächster Woche bilden wir die Teams anders: Wir zählen ab, eins, zwei, eins, zwei. Dann sind die Teams gemischt, und niemand muss warten.'],
        ['Ben', 'Gute Idee. Und Lea: Letzte Woche warst du in meinem Team und hast super verteidigt. Das hat uns echt geholfen.'],
        ['Lea', 'Danke. Das tut gut.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „sich mies fühlen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sich schlecht fühlen', 'sich müde fühlen'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 2, fragen: [{ f: 'Wie fühlt sich Lea? Warum?', zeilen: 2, l: 'Sie fühlt sich mies, weil sie immer als Letzte gewählt wird und warten muss.' }, { f: 'Wie reagiert Ben?', zeilen: 2, l: 'Er erklärt, dass es nicht gegen sie war, entschuldigt sich und lobt sie später.' }, { f: 'Was ändert Frau Diallo?', zeilen: 2, l: 'Die Teams werden durch Abzählen gebildet. So sind sie gemischt, und niemand muss warten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie kann man Teams fair bilden? Sammelt Ideen und stimmt ab.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['abzählen: eins, zwei, eins, zwei', 'Spielkarten ziehen: Rot gegen Schwarz', 'Die Lehrperson teilt ein.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gutes Team', punkte: ['**reden**: „Meiner!“, „Frei!“', '**ermutigen**: „Nächster Ball!“', 'jede **Rolle** ist wichtig'] },
         { titel: 'Faire Teams', punkte: ['**abzählen** oder **losen**', 'Teams **gleich stark**', 'niemand muss **warten**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Team-Check nach dem Spiel: Kreuzt gemeinsam an.', stufe: 1, kopf: ['', 'ja', 'teilweise', 'nein'], breiten: [55, 15, 15, 15], zeilen: [['Wir haben viel miteinander geredet.', '', '', ''], ['Alle haben den Ball bekommen.', '', '', ''], ['Nach Fehlern haben wir uns ermutigt.', '', '', ''], ['Wir haben fair gespielt.', '', '', '']] },
      { art: 'schneidekarten', auftrag: 'Rollenkarten: Jede Person im Team zieht eine Karte. Nach dem Spiel erzählt jede Person, wie sie ihre Rolle erfüllt hat.', stufe: 2, neueSeite: true, titel: 'Rolle', icon: 'users', farbe: TEAM, spalten: 2,
        karten: [
          { text: '**Kapitän/in**\nspricht mit dem Schiri und motiviert das Team' }, { text: '**Antreiber/in**\nruft nach jedem Fehler „Nächster Ball!“' },
          { text: '**Beobachter/in**\nachtet darauf, dass alle den Ball bekommen' }, { text: '**Taktik-Chef/in**\nplant in der Pause mit dem Team' },
          { text: '**Lob-Profi**\nlobt drei Mitspielende mit Namen' }, { text: '**Ruhepol**\nbleibt bei Streit ruhig und hilft, eine Lösung zu finden' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wann hast du dich in einem Team wohlgefühlt? Was hat das Team gut gemacht? Du kannst auch über ein ausgedachtes Team schreiben.', stufe: 2,
        anfaenge: ['Wohlgefühlt habe ich mich, als …', 'Das Team hat …', 'Ich selbst habe …'], zeilen: 6,
        beispiel: 'Wohlgefühlt habe ich mich, als wir beim Volleyball knapp verloren haben und trotzdem alle gelacht haben. Das Team hat nach jedem Fehler „Nächster Ball!“ gerufen. Ich selbst habe darauf geachtet, dass alle den Ball bekommen.' },
    ],
    check: ['Ich rede im Spiel mit meinem Team.', 'Ich ermutige andere nach Fehlern.', 'Ich kenne faire Wege, Teams zu bilden.'],
  },
  // ================================================================ 5
  {
    thema: 'Projekt: Schiedsrichter sein', titel: 'Pfeife an!', untertitel: 'Ohne Schiedsrichter kein faires Spiel. Du lernst die wichtigsten Handzeichen, übst Entscheidungen und leitest selbst ein Spiel in eurem Klassenturnier.',
    ziel: { de: 'Ich leite ein Spiel fair und kenne die wichtigsten Handzeichen.', fr: 'J’arbitre un match de façon juste et je connais les principaux gestes de l’arbitre.' },
    bild: ['tom:nervoes:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist für eine Schiedsrichterin am wichtigsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['fair und neutral bleiben', 'selbst gut Fußball spielen', 'möglichst laut sein'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Fußballregeln (vereinfacht, Stand 2026)', titel: 'Pfiff und Handzeichen',
      absaetze: [
        'Die Schiedsrichterin oder der Schiedsrichter **pfeift** bei einem Fehler und zeigt dann mit einem **Handzeichen**, wie es weitergeht. So verstehen alle die Entscheidung, auch die Zuschauer.',
        '**Indirekter Freistoß:** Ein Arm zeigt **senkrecht nach oben**. Bevor ein Tor zählt, muss noch eine andere Spielerin oder ein anderer Spieler den Ball berühren. **Direkter Freistoß:** Der Arm zeigt **schräg in die Richtung**, in die gespielt wird.',
        '**Vorteil:** Beide Arme werden **nach vorn** gestreckt, ohne Pfiff. Das heißt: Es gab ein Foul, aber das gefoulte Team ist gerade im Vorteil. Also geht das Spiel **weiter**.',
        '**Elfmeter:** Die Hand zeigt auf den **Elfmeterpunkt**. **Karten:** Die gelbe oder rote Karte wird **hoch** über den Kopf gehalten.',
        'Eine gute Schiedsrichterin bleibt **neutral**, entscheidet **schnell und klar** und erklärt ruhig, wenn jemand fragt. Auch Schiedsrichter machen Fehler. **Respekt** gilt trotzdem für alle.',
      ],
      woerter: [['pfeifen', 'siffler'], ['das Handzeichen', 'le geste'], ['senkrecht', 'à la verticale'], ['die Richtung', 'la direction'], ['der Vorteil', 'l’avantage'], ['neutral', 'neutre'], ['die Entscheidung', 'la décision'], ['der Respekt', 'le respect']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Was zeigt der Schiedsrichter? Schreib die Bedeutung.', stufe: 2, html: '<div class="voll">' + schiriZeichen() + '</div>', liste: [['A', 'indirekter Freistoß'], ['B', 'direkter Freistoß'], ['C', 'Vorteil, weiterspielen'], ['D', 'Verwarnung, gelbe Karte']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sportplatz · Halbzeitpause', titel: 'Schiri unter Druck',
      situation: 'Tom leitet zum ersten Mal ein Spiel im Klassenturnier. In der Halbzeit spricht er mit Frau Diallo.',
      bild: ['tom:nervoes:stehen', 'lehrerin:froh:erklaeren'], sprecher: { Tom: 'm3', 'Frau Diallo': 'w1' },
      text: [
        ['Tom', 'Das ist viel schwerer, als ich dachte. Alle meckern bei jedem Pfiff.'],
        ['Frau Diallo', 'Das kenne ich. Was ist passiert?'],
        ['Tom', 'Yusuf wurde gefoult, aber sein Team hatte den Ball und ist weitergelaufen. Ich habe gepfiffen, und dann war die Torchance weg. Jetzt sind alle sauer.'],
        ['Frau Diallo', 'Das war ein Fall für Vorteil. Wenn das gefoulte Team im Vorteil ist, lässt du weiterspielen und streckst beide Arme nach vorn.'],
        ['Tom', 'Ach so. Und was mache ich, wenn alle gleichzeitig auf mich einreden?'],
        ['Frau Diallo', 'Bleib ruhig. Sprich nur mit der Kapitänin oder dem Kapitän. Und entscheide schnell und klar. Lieber eine klare Entscheidung als ein langes Hin und Her.'],
        ['Tom', 'Und wenn ich einen Fehler mache?'],
        ['Frau Diallo', 'Dann gibst du ihn zu. Das passiert auch Profis. Aber Beleidigungen gegen dich sind nicht in Ordnung. Dafür gibt es eine Karte.'],
        ['Tom', 'Okay. Zweite Halbzeit: Ich bin bereit.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „auf jemanden einreden“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['viel und drängend mit jemandem sprechen', 'jemandem ruhig zuhören'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 2, fragen: [{ f: 'Welchen Fehler hat Tom gemacht?', zeilen: 2, l: 'Er hat nach einem Foul gepfiffen, obwohl das gefoulte Team im Vorteil war. Dann war die Torchance weg.' }, { f: 'Wie zeigt man Vorteil?', l: 'beide Arme nach vorn strecken und weiterspielen lassen' }, { f: 'Nenne zwei Tipps von Frau Diallo.', zeilen: 3, l: 'ruhig bleiben; nur mit dem Kapitän oder der Kapitänin sprechen; schnell und klar entscheiden; Fehler zugeben' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt kurze Szenen: Eine Person ist Schiri, die anderen spielen eine Situation nach. Die Schiri pfeift, zeigt das Handzeichen und sagt die Entscheidung.', stufe: 3, karten: [
        { titel: 'Schiri-Sätze', text: ['Foul! Direkter Freistoß für Blau.', 'Vorteil, weiterspielen!', 'Bitte nur die Kapitänin spricht mit mir.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Handzeichen', punkte: ['Arm **hoch**: indirekter Freistoß', 'Arm **schräg**: direkter Freistoß', 'beide Arme **vor**: Vorteil', 'Hand zum **Punkt**: Elfmeter'] },
         { titel: 'Gute Schiris', punkte: ['**neutral** bleiben', '**schnell und klar** entscheiden', '**ruhig** erklären', 'Fehler **zugeben**'] }],
      ],
    },
    ueben: [
      { art: 'mc', auftrag: 'Du bist Schiri. Wie entscheidest du? Kreuze an.', stufe: 2, fragen: [{ f: 'Ein Spieler wird gefoult. Sein Team läuft trotzdem mit dem Ball allein auf das Tor zu.', o: ['sofort pfeifen', 'Vorteil, weiterspielen'], r: 1 }, { f: 'Ein Verteidiger hält im eigenen Strafraum einen Gegner fest.', o: ['Elfmeter', 'Einwurf'], r: 0 }, { f: 'Eine Spielerin beleidigt die Schiedsrichterin.', o: ['Karte zeigen', 'nichts tun'], r: 0 }, { f: 'Du merkst, dass du falsch entschieden hast.', o: ['den Fehler zugeben', 'so tun, als wäre nichts'], r: 0 }] },
      { art: 'tabelle', auftrag: 'Mein Schiri-Bogen: Notiere während deines Spiels die wichtigsten Entscheidungen.', stufe: 2, kopf: ['Minute', 'Was ist passiert?', 'Meine Entscheidung'], breiten: [14, 46, 40], zeilen: [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie war es, Schiri zu sein? Verstehst du Schiedsrichter jetzt besser?', stufe: 2,
        anfaenge: ['Als Schiri habe ich …', 'Schwierig war …', 'Jetzt verstehe ich besser, dass …'], zeilen: 6,
        beispiel: 'Als Schiri habe ich gemerkt, wie schnell man entscheiden muss. Schwierig war, als beide Teams gleichzeitig gerufen haben. Jetzt verstehe ich besser, dass Schiedsrichter nicht alles sehen können und trotzdem Respekt verdienen.' },
    ],
    check: ['Ich kenne die wichtigsten Handzeichen.', 'Ich entscheide schnell und klar.', 'Ich bleibe als Schiri ruhig und fair.'],
  },
]
