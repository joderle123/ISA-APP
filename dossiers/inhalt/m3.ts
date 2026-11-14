// REAL TALK #03 · DRUCK – Modul 3 (Gefühle regulieren: Skills, Einheiten 11–15).
import type { Heft } from '../typen'

const d: Heft = {
  id: 'm3', nr: '03', datei: 'Real-Talk-03-Druck',
  thema: 'Druck', headline: 'Runterkommen, bevor es knallt.', farbe: '#C6F02C', stand: 'November 2026',
  cover: {
    bild: 'peep:finn:wuetend:laessig', sticker: 'Selbst getestet',
    zeilen: ['Warum bei 80 keiner mehr zuhört', 'Atmen wie ein Profi: die Bremse im Körper', 'Stark, aber nicht schädlich: Kälte, Chili, Bass', 'Dein Plan für den Moment, in dem du nicht mehr denkst'],
  },
  ansage: {
    text: [
      'Jeder kennt den Moment. Es wird heiß, eng, laut – und dann machst du etwas, das du später bereust. Oder du machst gar nichts mehr.',
      'Dieses Heft ist ein **Testlabor**. Du probierst aus, was deinen Körper runterbringt, wenn der Kopf schon offline ist. Was bei dir wirkt, bleibt. Der Rest fliegt raus.',
      'Du brauchst dafür nur eine Zahl von 0 bis 100. Und die Bereitschaft, Dinge zu testen, die erst mal komisch aussehen.',
    ],
    zitat: 'Erst runter. ==Dann reden.==',
    so: [['Szene', 'Eine kurze Geschichte. Lies sie und sag, was du siehst.'], ['Fakten', 'Drei Dinge, die dahinterstecken. Mehr nicht.'], ['Mythos / Real', 'Was alle sagen – und was stimmt.'], ['Dein Move', 'Jetzt du: Zahl vorher, Skill testen, Zahl nachher.']],
    regeln: [
      '**Deine Zahl stimmt immer.** Nur du weißt, wie hoch dein Druck ist.',
      '**Du bestimmst das Tempo.** Aussteigen geht jederzeit. Ohne Erklärung.',
      '**Was wirkt, entscheidest du.** Nicht jeder Skill passt zu jedem.',
    ],
  },
  cast: [
    { bild: 'peep:finn:wuetend', name: 'Finn, 15', x: 'Von 20 auf 90 in drei Sekunden. Zwei Türen hat er schon bezahlt.' },
    { bild: 'peep:amira:ruhig', name: 'Amira, 16', x: 'Wird still, wenn es zu viel wird. Alle denken, sie hat sich im Griff.' },
    { bild: 'peep:sami:nervoes', name: 'Sami, 14', x: 'Kann vor Terminen nicht sitzen. Sein Bein wippt für zwei.' },
    { bild: 'peep:mia:muede', name: 'Mia, 16', x: 'Liegt nachts wach. Der Kopf macht Überstunden.' },
  ],
  warm: {
    titel: 'Soundcheck', text: 'Zwei schnelle Fragen. Kein Richtig, kein Falsch.',
    fragen: [
      { f: 'Wenn es mir zu viel wird, dann … (kreise ein)', kreis: ['werde ich laut', 'werde ich still', 'haue ich ab', 'zocke ich', 'höre ich Musik', 'mache ich Sport', 'schlafe ich'] },
      { f: 'Dein Druck gerade – kreise die Zahl ein:', skala: ['jetzt'] },
    ],
  },
  tracks: [
    {
      nr: 11, titel: 'Die Zahl', unter: 'Dein Druck von 0 bis 100 – und warum bei 80 keiner mehr zuhört',
      kurz: 'Warum Reden bei 80 nicht mehr funktioniert.',
      szene: {
        bild: 'peep:finn:wuetend', name: 'Finn, 15',
        text: 'Mathe, sechste Stunde. Finn hat kaum geschlafen und nichts gegessen. Der Lehrer sagt: „Handy weg.“ Finn: „Gleich.“ Der Lehrer greift nach dem Handy. Zwei Sekunden später liegt Finns Tisch auf der Seite. In der Pause sagt Finn: „Ich wollte das gar nicht.“ Das stimmt sogar.',
        frage: 'Bei welcher Zahl war Finn schon vor dem Satz mit dem Handy?',
      },
      faktenTitel: 'Drei Zonen',
      fakten: [
        { t: 'Grün · 0–30', x: 'Kopf online. Du kannst denken, zuhören, reden. **Beste Zeit zum Üben.**' },
        { t: 'Gelb · 30–70', x: 'Es wird eng. Gereizt, unruhig oder ganz still. **Jetzt lohnt sich ein Skill.**' },
        { t: 'Rot · 70–100', x: 'Kopf offline. Der Körper fährt: Herz, Hitze, Tunnelblick. **Reden bringt nichts mehr.**' },
      ],
      mythen: [
        ['Wer ausrastet, hat sich einfach nicht im Griff.', 'Ab 70 schaltet der Kopf ab. Das ist Biologie – und trainierbar.'],
        ['Bei Stress muss man sofort darüber reden.', 'Erst runter. Dann reden. Sonst wird es schlimmer.'],
        ['Wer still ist, ist ruhig.', 'Still kann auch 85 sein. Nur nach innen.'],
      ],
      clip: {"titel": "Aggressiv: Woher kommt deine Wut?", "kanal": "Terra Xplore", "url": "https://www.youtube.com/watch?v=ytcdqLNedrg", "dauer": "die ersten 5 Min.", "frage": "Was passiert im Körper, kurz bevor es knallt?"},
      merk: 'Erst runter. ==Dann reden.==',
      moveUnter: 'Finde deine Zahl',
      moves: [
        {
          titel: 'Welche Zone?', wie: 'allein, dann zu zweit', zeit: '6 Min.',
          fragen: [
            { f: 'Wo landest **du**? Kein Richtig, kein Falsch.', raster: { spalten: ['Grün', 'Gelb', 'Rot'], zeilen: ['Dein Spiel stürzt kurz vor dem Sieg ab.', 'Jemand lacht über dein Foto im Klassenchat.', 'Du musst gleich vor allen etwas sagen.', 'Ein Erwachsener sagt: „Wir müssen reden.“', 'Sonntag, Sofa, nichts los.'] } },
            { f: 'Vergleicht. Wo liegt ihr am weitesten auseinander?', linien: 1 },
          ],
        },
        {
          titel: 'Erster Test: Gehen ohne Worte', wie: 'alle zusammen', zeit: '5 Min.',
          kontext: 'Fünf Minuten gehen. Nicht reden. Nur Schritte, Geräusche, Gerüche.',
          fragen: [
            { f: 'Dein Druck – kreise die Zahl ein:', skala: ['vorher', 'nachher'] },
            { f: 'Was hat die Zahl gemacht?', kreuz: ['runter', 'gleich', 'rauf'] },
          ],
        },
      ],
      challenge: { titel: 'Zonen-Wette', wie: 'zwei Teams', x: 'Eine Situation wird vorgelesen. Alle stellen sich an ihre Zahl auf der Linie. Vorher wettet ein Tipper pro Team: Wo landet die Gruppe – **Grün, Gelb oder Rot?**' },
      line: { titel: 'Mein Frühwarnsystem', x: 'Woran merkst du als Erstes, dass dein Druck steigt? Ein Wort oder eine Zeichnung.', feld: 11 },
      woche: 'Miss dreimal deine Zahl: **morgens, mittags, abends.** Merk dir die höchste und die niedrigste.',
      gruppe: [
        {"titel": "Ein Schritt nach vorn", "wer": "alle", "zeit": "10 Min.", "material": "eine Linie am Boden, Liste mit Sätzen", "schritte": ["Alle stehen hinter der Linie. Jemand liest vor: „Mach einen Schritt, wenn du … schon mal wegen einer Kleinigkeit ausgerastet bist.“", "Passt der Satz? Ein Schritt vor. Kurz schauen, wer noch vorn steht. Zurück.", "**Niemand erklärt etwas.** Stehenbleiben ist immer erlaubt."], "frage": "Was hat euch überrascht, als ihr nach links und rechts geschaut habt?"},
        {"titel": "Skills-Sprint", "wer": "zwei Teams", "zeit": "8 Min.", "material": "Haftnotizen in zwei Farben, ein Plakat", "schritte": ["Drei Minuten: Schreibt auf, was hilft, wenn es zu viel wird. Eine Idee pro Zettel.", "Immer eine Person sprintet los und klebt den Zettel ans Plakat.", "Zählen. Doppelte gelten nur einmal. Dann sortieren: Was schadet auf Dauer?"], "frage": "Welche Idee hättet ihr dem anderen Team nicht zugetraut?"},
      ],
      leitung: {
        einsatz: 'Szene nach „Ein Schritt nach vorn“ oder vor dem Handmodell. Fakten zusammen mit dem Thermometer an der Tafel. Move A bereitet die Zonen-Wette (Challenge) vor. Move B ist der Skill „Spaziergang ohne Worte“.',
        loesungen: [
          'Szene: Finn war schon vorher hoch – wenig Schlaf, kein Essen, sechste Stunde. Der Griff zum Handy war nur der letzte Tropfen. Leere Tanks heben die Startzahl.',
          'Move A: Jede Einschätzung stimmt. Entscheidend ist der Vergleich: gleiche Situation, verschiedene Zonen.',
          'Move B: Bei den meisten sinkt die Zahl leicht. Bleibt sie gleich oder steigt sie, ist auch das ein Ergebnis.',
        ],
        impulse: ['Bis zu welcher Zahl hilft euch Reden – und ab wann nervt es nur noch?', 'Was macht eure Startzahl am Morgen höher?'],
        material: 'Klebeband für die Bodenlinie 0–100', blaetter: 'Gefühlsrad, Zonen-Karten, Skills-Pass. Das Thermometer-Blatt läuft für den Verlauf weiter.',
      },
    },
    {
      nr: 12, titel: 'Körper zuerst', unter: 'Vollgas, Atem, Muskeln: was auch bei Rot noch funktioniert',
      kurz: 'Skills, die auch bei Rot noch gehen.',
      szene: {
        bild: 'peep:sami:nervoes', name: 'Sami, 14',
        text: 'Sami wartet vor dem Büro der Direktorin. Sein Bein wippt, die Hände schwitzen, im Kopf läuft ein Film in Dauerschleife. Ein Älterer setzt sich daneben: „Atme mal länger aus als ein. Vier ein, acht aus.“ Sami findet das albern. Er macht es trotzdem. Nach einer Minute wippt das Bein nicht mehr.',
        frage: 'Warum hat ausgerechnet Atmen geholfen?',
      },
      fakten: [
        { t: 'Vollgas', x: 'Drei Minuten volle Kraft: rennen, Liegestütze, Schattenboxen. **Die Energie muss raus.** Danach fällt die Zahl.' },
        { t: 'Lang ausatmen', x: 'Länger aus als ein. Das ist die **Bremse** im Körper. Wirkt auch, wenn du nicht daran glaubst.' },
        { t: 'Anspannen – loslassen', x: 'Fäuste fünf Sekunden ballen, dann locker. Geht **heimlich** unter jedem Tisch.' },
      ],
      mythen: [
        ['Atemübungen sind Esoterik.', 'Langes Ausatmen senkt den Puls. Messbar. Sportler und Rettungskräfte nutzen es.'],
        ['Wut muss raus – am besten an irgendetwas.', 'Draufhauen heizt nach. Besser: Kraft raus ohne Ziel. Sprint. Liegestütze.'],
        ['Wenn es einmal nicht wirkt, wirkt es nie.', 'Skills sind Training. Wer bei Grün übt, hat bei Rot etwas in der Hand.'],
      ],
      clip: {"titel": "Box-Atmung 4-4-4-4 zum Mitmachen", "kanal": "MindCare Media", "url": "https://www.youtube.com/watch?v=wazCdqIBi2c", "dauer": "3 Min. mitmachen", "frage": "Zahl vorher – drei Minuten mitatmen – Zahl nachher. Was passiert?"},
      merk: 'Der Kopf hört nicht zu. ==Der Körper schon.==',
      moveUnter: 'Zahl vorher – Skill – Zahl nachher',
      moves: [
        {
          titel: 'Vollgas-Test', wie: 'alle zusammen', zeit: '3 + 2 Min.',
          kontext: 'Drei Minuten volle Kraft – der Würfel sagt, was. Dann zwei Minuten sitzen. Jeder in **seinem** Tempo.',
          fragen: [
            { f: 'Dein Druck – kreise die Zahl ein:', skala: ['vorher', 'nachher'] },
            { f: 'Wo hast du es gespürt?', kreis: ['Herz', 'Atem', 'Schultern', 'Bauch', 'Beine', 'Kopf'] },
          ],
        },
        {
          titel: 'Atem-Parcours', wie: 'zu zweit', zeit: 'je 3 Min.',
          fragen: [
            { f: 'Teste und kreuze an:', raster: { spalten: ['wirkt', 'geht so', 'nichts für mich'], zeilen: ['**4-7-8:** 4 ein, 7 halten, 8 aus', '**Finger:** die Hand entlangfahren, hoch ein, runter aus', '**Kasten:** 4 ein – 4 halten – 4 aus – 4 halten', '**Bauch:** Hand auf den Bauch, er wird rund', '**Feder:** lang pusten, sie bleibt oben'] } },
            { f: 'Ergebnis:', satz: ['Mein Favorit:', 'Wirkt bei mir bis Zahl:'] },
          ],
        },
      ],
      challenge: { titel: 'Ruhige Hand', wie: 'zwei Teams', x: 'Becherturm bauen. **Runde 1:** vorher zehn Hampelmänner. **Runde 2:** vorher drei lange Atemzüge. Welcher Turm wird höher?' },
      line: { titel: 'Mein Notfall-Move', x: 'Was machst du mit dem Körper, wenn es knallt – statt zuzuschlagen oder abzuhauen?', linien: 1 },
      woche: 'Teste deinen Favoriten einmal im echten Leben: **Zahl vorher – Skill – Zahl nachher.**',
      gruppe: [
        {"titel": "Wer spannt an?", "wer": "alle", "zeit": "10 Min.", "material": "Stuhlkreis", "schritte": ["Eine Person geht vor die Tür. Die Leitung bestimmt jemanden im Kreis.", "Diese Person spannt heimlich Muskeln an und lässt wieder los: Fäuste, Zehen, Bauch.", "Die Person von draußen hat drei Versuche zu raten, wer es ist."], "frage": "Welche Muskeln kann man anspannen, ohne dass es einer sieht?"},
        {"titel": "Gleicher Takt", "wer": "zu zweit", "zeit": "6 Min.", "material": "zwei Stühle, eine Armlänge Abstand", "schritte": ["Ihr sitzt euch gegenüber. A atmet ruhig und etwas langsamer als sonst – Hand hoch beim Einatmen, runter beim Ausatmen.", "B atmet im selben Takt mit.", "Nach zwei Minuten wechseln."], "frage": "Wer steckt euch im Alltag mit Ruhe an – und wer mit Stress?"},
      ],
      leitung: {
        einsatz: 'Move A ist das Vollgas-Experiment. Szene und Fakten vor dem Atem-Parcours. Move B begleitet den Parcours neben dem Skills-Tester. Die Challenge ist die Ruhige-Hand-Staffel.',
        loesungen: [
          'Szene: Langes Ausatmen aktiviert den beruhigenden Teil des Nervensystems. Der Körper meldet dem Kopf: keine Gefahr.',
          'Move A: Direkt nach der Bewegung ist der Puls hoch; nach zwei Minuten Ruhe liegt die Zahl meist unter dem Startwert.',
          'Move B: Kein Atem-Trick ist „der beste“. Wichtig sind ein Favorit und die Zahl, bis zu der er wirkt.',
        ],
        impulse: ['Wo könntet ihr im Alltag drei Minuten Vollgas geben, ohne dass es Ärger gibt?', 'Welcher Skill geht so unauffällig, dass ihn keiner bemerkt?'],
        material: '1 Würfel, schnelle Musik, Stoppuhr, Federn, 40 Becher', blaetter: 'Gefühlsrad, Atem-Stationen (Karten), Skills-Tester, Skills-Pass.',
      },
    },
    {
      nr: 13, titel: 'Reiz gegen Reiz', unter: 'Kälte, Duft, Musik: Starke Reize holen dich zurück ins Jetzt',
      kurz: 'Starke Reize gegen starken Druck. Stark – nicht schädlich.',
      szene: {
        bild: 'peep:amira:traurig', name: 'Amira, 16',
        text: 'Nach dem Streit sitzt Amira auf der Bettkante. Von außen sieht sie ruhig aus. Innen: 85. Die Gedanken drehen sich, immer schneller. Sie geht ins Bad und hält die Handgelenke unter eiskaltes Wasser. Dreißig Sekunden. Der Kopf wird langsamer. Sie zählt die Fliesen. Dann ruft sie ihre Cousine an.',
        frage: 'Was hat das kalte Wasser mit ihrem Kopf gemacht?',
      },
      fakten: [
        { t: 'Sinne sind im Jetzt', x: 'Grübeln hängt in gestern oder morgen. **Riechen, Fühlen, Hören** passiert immer jetzt.' },
        { t: 'Starker Reiz, starke Wirkung', x: '**Kälte** ist der stärkste: Eiswürfel, kaltes Wasser, Kühlpack. Wirkt auch bei Rot.' },
        { t: 'Runter oder rauf', x: 'Manche Reize beruhigen, andere machen wach. **Beides ist ein Skill** – je nachdem, was fehlt.' },
      ],
      mythen: [
        ['Musik hören ist nur Ablenkung.', 'Senkt es deine Zahl und schadet niemandem, ist es ein Skill.'],
        ['Bei Rot hilft nur, was wehtut.', 'Der Reiz muss stark sein, nicht schädlich: Kälte, Chili, saure Bonbons, Bass.'],
        ['Was mich beruhigt, beruhigt jeden.', 'Lavendel entspannt die einen und nervt die anderen. Du testest selbst.'],
      ],
      clip: {"titel": "5-4-3-2-1: zurück ins Hier und Jetzt", "kanal": "MindCare Media", "url": "https://www.youtube.com/watch?v=TsIGZklzSyc", "dauer": "mitmachen", "frage": "Mach mit. Welcher Sinn war bei dir am stärksten?"},
      merk: 'Stark: ==ja.== Schädlich: ==nein.==',
      moveUnter: 'Was holt dich zurück ins Jetzt?',
      moves: [
        {
          titel: 'Duft-Bar', wie: 'zu zweit', zeit: '10 Min.',
          kontext: 'Riech nur am Streifen. Nichts kommt auf die Haut.',
          fragen: [
            { f: 'Wie wirkt der Duft auf dich?', raster: { spalten: ['beruhigt', 'macht wach', 'nervt'], zeilen: ['Duft 1', 'Duft 2', 'Duft 3', 'Duft 4', 'Duft 5'] } },
            { f: 'Deine Wahl:', satz: ['Mein Duft für die Tasche – Nummer:'] },
          ],
        },
        {
          titel: 'Kälte-Test', wie: 'wer möchte', zeit: '30 Sek.',
          kontext: 'Kühlpack oder Eiswürfel im Tuch in die Hand. 30 Sekunden. Nicht länger.',
          fragen: [
            { f: 'Dein Druck – kreise die Zahl ein:', skala: ['vorher', 'nachher'] },
            { f: 'Kälte ist für mich ein Skill für …', kreuz: ['Grün', 'Gelb', 'Rot', 'gar nicht'] },
          ],
        },
      ],
      challenge: { titel: 'DJ-Battle', wie: 'alle', x: 'Jeder bringt einen Song mit, 30 Sekunden läuft er. Die Gruppe stellt sich auf die Linie: **bringt mich runter ↔ lädt mich auf.**' },
      line: { titel: 'Meine zwei Playlists', x: 'Ein Song zum Runterkommen. Ein Song zum Aufladen.', linien: 1 },
      woche: 'Steck deinen Duft oder deine Kopfhörer ein. Nutz sie, **sobald deine Zahl steigt** – nicht erst bei 90.',
      hilfe: true,
      gruppe: [
        {"titel": "5-4-3-2-1 im Gehen", "wer": "zu zweit", "zeit": "7 Min.", "material": "Raum und Flur", "schritte": ["Ihr geht langsam. A leitet an, B antwortet halblaut.", "**5** Dinge, die du siehst · **4**, die du hörst · **3**, die du spürst · **2**, die du riechst · **1**, die du schmeckst.", "Nach drei Minuten tauschen."], "frage": "Wo waren eure Gedanken währenddessen?"},
        {"titel": "Tast-Duell", "wer": "zwei Teams", "zeit": "12 Min.", "material": "Kiste mit Gegenständen: Stein, Knetball, Bürste, Tuch, Kühlpack …", "schritte": ["Augen zu, Hand in die Kiste. Nimm einen Gegenstand.", "Beschreib ihn deinem Team, ohne ihn zu nennen: warm oder kalt, glatt oder rau, schwer oder leicht.", "Das Team hat 30 Sekunden zum Raten. Richtig: ein Punkt."], "frage": "Was davon würdet ihr in die Hosentasche stecken?"},
      ],
      leitung: {
        einsatz: 'Szene nach „5-4-3-2-1 im Gehen“. Move A begleitet die Duft-Bar, Move B die Kälte-Probe, die Challenge ist die DJ-Runde. „Dein Satz“ gehört zur Playlist auf dem Blatt „Skills über die Sinne“.',
        loesungen: [
          'Szene: Der starke Kältereiz zieht die Aufmerksamkeit aus der Gedankenspirale in den Körper. Danach konnte Amira Hilfe holen. Die Szene zeigt eine Alternative zu schädlichen Reizen, ohne sie zu benennen – nicht nachbohren.',
          'Move A: Düfte wirken sehr verschieden. Wer keinen mag, hat auch ein Ergebnis.',
          'Move B: Kälte senkt die Zahl oft schnell und deutlich. Freiwillig, höchstens 30 Sekunden, Eis immer im Tuch.',
        ],
        impulse: ['Welcher Sinn hat euch heute am meisten gebracht?', 'Welchen starken Reiz könnt ihr immer dabeihaben?'],
        material: 'Riechstreifen und 5 Öle, Kühlpacks oder Eiswürfel im Tuch, Lautsprecher', blaetter: 'Gefühlsrad, Skills-Tester, „Skills über die Sinne“, Skills-Pass.',
      },
    },
    {
      nr: 14, titel: 'Kopfkino', unter: 'Gedanken kann man nicht abstellen. Aber man muss nicht jeden Film zu Ende schauen',
      kurz: 'Gedanken beobachten, statt mitzufahren.',
      szene: {
        bild: 'peep:mia:muede', name: 'Mia, 16',
        text: 'Zwei Uhr nachts. Mia liegt wach. Im Kopf läuft derselbe Film: der Blick von heute Mittag, der Satz, den sie hätte sagen sollen, die Arbeit morgen. Sie versucht, nicht daran zu denken. Es wird schlimmer. Dann probiert sie etwas anderes: Sie zählt von 100 in Siebenerschritten rückwärts. Bei 44 ist sie raus.',
        frage: 'Warum hat „nicht dran denken“ nicht funktioniert?',
      },
      fakten: [
        { t: 'Beschäftigen', x: 'Gib dem Kopf einen Job: 100 minus 7 minus 7 … Oder ein ABC mit Automarken. **Ein voller Kopf grübelt nicht.**' },
        { t: 'Beobachten', x: 'Setz jeden Gedanken auf ein Schiff und schau ihm nach. **Du musst nicht mitfahren.**' },
        { t: 'Umschalten', x: 'Geh in Gedanken an einen Ort, an dem dir nichts passiert. Mit Übung bist du in Sekunden dort.' },
      ],
      mythen: [
        ['Achtsamkeit heißt: an nichts denken.', 'Kann niemand. Es heißt: merken, dass du abgedriftet bist – und zurückkommen.'],
        ['Was ich denke, stimmt auch.', 'Gedanken sind Gedanken. Dein Kopf produziert Tausende am Tag. Nicht jeder stimmt.'],
        ['Kopf-Skills helfen immer.', 'Sie helfen bei Gelb. Bei Rot braucht zuerst der Körper Hilfe.'],
      ],
      clip: {"titel": "Overthinking – warum wir ständig grübeln", "kanal": "psychologeek", "url": "https://www.youtube.com/watch?v=J_mvG4KZt44", "dauer": "die ersten 5 Min.", "frage": "Warum macht „nicht dran denken“ alles schlimmer?"},
      merk: 'Du bist nicht dein Gedanke. ==Du schaust nur zu.==',
      moveUnter: 'Wer lenkt hier eigentlich?',
      moves: [
        {
          titel: 'Gedanken-Schiffe', wie: 'allein, in Stille', zeit: '5 Min.',
          kontext: 'Deine Leitung führt dich durch die Übung. Augen offen ist erlaubt.',
          fragen: [
            { f: 'Wie viele Schiffe kamen vorbei?', kreis: ['1–3', '4–10', 'mehr als 10', 'keine Ahnung'] },
            { f: 'Bist du mitgefahren?', kreuz: ['ja – und wieder ausgestiegen', 'ja – ziemlich lange', 'nein'] },
            { f: 'Wie war es, nur zuzuschauen?', linien: 1 },
          ],
        },
        {
          titel: 'Mein Ort', wie: 'allein', zeit: '8 Min.',
          kontext: 'Ein Ort, an dem dir nichts passiert. Echt oder erfunden. **Niemand muss ihn zeigen.**',
          fragen: [
            { f: 'Was passt? Kreise ein:', kreis: ['draußen', 'drinnen', 'warm', 'kühl', 'still', 'mit Musik', 'allein', 'mit jemandem', 'echt', 'erfunden'] },
            { f: 'Damit du schnell hinfindest:', satz: ['Mein Stichwort für den Ort:'] },
          ],
        },
      ],
      challenge: { titel: 'Zeitlupen-Rennen', wie: 'alle', x: 'Vier Meter. So langsam wie möglich, ohne stehen zu bleiben. **Wer zuletzt ankommt, gewinnt.** Danach: Wo war dein Kopf?' },
      line: { titel: 'Satz an mich', x: 'Red mit dir wie mit einem guten Freund – mit deinem Namen. „…, du schaffst die nächsten zehn Minuten.“', linien: 1 },
      woche: 'Besuch deinen Ort dreimal in Gedanken – **dann, wenn es dir gut geht**. Eine Minute reicht.',
      hilfe: true,
      gruppe: [
        {"titel": "Kopf-Zirkel", "wer": "zwei Teams", "zeit": "15 Min.", "material": "zwei Bögen Papier, Stifte, Stoppuhr", "schritte": ["**ABC-Staffel:** Zu jedem Buchstaben ein Tier, eine Stadt oder ein Verein. Welches Team kommt in drei Minuten weiter?", "**Rückwärts-Duell:** Von 100 in Siebenerschritten runter – das andere Team stört freundlich.", "**Blau-Jagd:** 45 Sekunden still alle blauen Dinge im Raum zählen."], "frage": "Bei welcher Runde war kein Platz mehr für andere Gedanken?"},
        {"titel": "Fokus-Dreikampf", "wer": "zwei Teams", "zeit": "12 Min.", "material": "Stoppuhr, Becher mit Wasser", "schritte": ["**Eine Minute:** Augen zu. Setz dich, wenn du glaubst, 60 Sekunden sind um.", "**Wasser-Staffel:** Ein randvoller Becher wandert durch das Team und zurück.", "**Spiegel:** Zu zweit gegenüber. Eine Person bewegt sich in Zeitlupe, die andere spiegelt."], "frage": "Was passiert mit der Zeit, wenn ihr unter Druck steht?"},
      ],
      leitung: {
        einsatz: 'Szene nach dem Kopf-Skill-Zirkel. Move A direkt nach dem Gedankenschiffchen, Move B im Schritt „Den sicheren Ort gestalten“. Die Challenge gehört zum Fokus-Vierkampf. „Dein Satz“ ist der vierte Kopf-Skill („wie mit einem Freund“).',
        loesungen: [
          'Szene: Gedanken wegzudrücken macht sie stärker. Eine Aufgabe, die den Kopf ganz braucht, lässt keinen Platz fürs Grübeln.',
          'Move A: Jede Antwort passt. Wer lange mitgefahren ist, hat nichts falsch gemacht – das Bemerken ist die Übung.',
          'Move B: privat. Niemand muss den Ort beschreiben. Das Stichwort hilft, ihn schnell aufzurufen.',
        ],
        impulse: ['Welcher Film läuft bei euch am häufigsten? Ein Stichwort reicht.', 'Warum helfen Kopf-Skills bei Gelb, aber kaum bei Rot?'],
        material: 'Stoppuhr, Obst oder Schokolade, ruhige Musik', blaetter: 'Gefühlsrad, Skills-Tester, „Mein sicherer Ort“, Skills-Pass.',
      },
    },
    {
      nr: 15, titel: 'Dein Plan', unter: 'Packen, was wirkt. Und wissen, was du bei Rot tust – ohne nachzudenken',
      kurz: 'Dein Koffer. Dein Plan für Rot.',
      szene: {
        bild: 'peep:finn:neutral', name: 'Finn, 15',
        text: 'Vier Wochen später. Wieder Mathe, wieder der Satz: „Handy weg.“ Finn merkt: Kiefer fest, Hitze im Gesicht. 60, Tendenz steigend. Er legt das Handy hin, ballt unter dem Tisch die Fäuste, atmet lang aus. Nach der Stunde geht er zum Lehrer: „Ich war kurz davor. Können wir das anders regeln?“ Der Lehrer ist so überrascht, dass er Ja sagt.',
        frage: 'Was hat Finn diesmal früher gemerkt?',
      },
      faktenTitel: 'Der Ampelplan',
      fakten: [
        { t: 'Grün: auftanken', x: 'Schlaf, Essen, Bewegung, Leute, die guttun. **Volle Tanks, niedrigere Startzahl.**' },
        { t: 'Gelb: früh reagieren', x: 'Kenn deine **Warnsignale**. Dann ein Skill – solange der Kopf noch mitspielt.' },
        { t: 'Rot: Notbremse', x: 'Körper und Sinne. **Raus aus der Situation.** Zu einem Menschen gehen.' },
      ],
      mythen: [
        ['Im Ernstfall fällt mir schon was ein.', 'Bei Rot fällt dir nichts ein. Deshalb steht der Plan vorher auf einer Karte.'],
        ['Weggehen ist feige.', 'Weggehen ist die Notbremse. Wer bleibt und explodiert, zahlt mehr.'],
        ['Hilfe holen heißt: Ich schaffe es nicht.', 'Einen Menschen im Plan zu haben, ist der stärkste Skill von allen.'],
      ],
      clip: {"titel": "Rauslassen oder unterdrücken – was tun bei Wut?", "kanal": "Quarks Dimension Ralph", "url": "https://www.youtube.com/watch?v=0L_uYTxRz1I", "dauer": "die ersten 5 Min.", "frage": "Draufhauen, um Dampf abzulassen: Hilft das wirklich?"},
      merk: 'Bei Rot denkt keiner. ==Darum denkst du jetzt.==',
      moveUnter: 'Dein Plan für Grün, Gelb und Rot',
      moves: [
        {
          titel: 'Meine Top 5', wie: 'allein, am Koffer-Markt', zeit: '10 Min.',
          fragen: [{ f: 'Nur was bei dir wirkt. Ein Skill pro Fach:', satz: ['Körper:', 'Sinne:', 'Kopf:', 'Mensch:', 'Tun, das mir guttut:'] }],
        },
        {
          titel: 'Mein Ampelplan', wie: 'allein', zeit: '8 Min.',
          kontext: 'Wird nicht eingesammelt. Wird nicht vorgelesen.',
          fragen: [{ f: 'Von Grün nach Rot:', satz: ['Grün – das hält meine Tanks voll:', 'Gelb – mein Warnsignal:', 'Gelb – mein Skill:', 'Rot – das geht ohne Nachdenken:'] }],
        },
      ],
      challenge: { titel: 'Skills-Notruf', wie: 'zwei Teams', x: 'Situation ziehen, Farbe würfeln. 20 Sekunden: Welcher Skill passt? Dann leitet ihr ihn **eine Minute für alle** an.' },
      line: { titel: 'Notfallkarte', x: 'Schreib deine drei Skills für Rot auf die Notfallkarte (Seite {K}). Ausschneiden. Einstecken.' },
      woche: 'Zeig deinen Plan einer Person, der du vertraust. Sag ihr, **was dir bei Rot hilft** – und was nicht.',
      hilfe: true,
      gruppe: [
        {"titel": "Startzahl-Check", "wer": "alle", "zeit": "10 Min.", "material": "Bodenlinie 0–100", "schritte": ["Die Leitung liest einen Morgen vor: „Kaum geschlafen, nichts gegessen.“ – „Streit am Morgen.“ – „Ausgeschlafen, satt, guter Morgen mit Freunden.“", "Stell dich an die Zahl, mit der du in so einen Tag startest.", "Schaut euch um: Wie weit ist es von dort bis Rot?"], "frage": "Was füllt eure Tanks am schnellsten wieder auf?"},
        {"titel": "Koffer-Markt", "wer": "alle", "zeit": "20 Min.", "material": "fünf Stände: Körper, Sinne, Kopf, Menschen, Tun; Skills-Kärtchen, Gegenstände", "schritte": ["Geh von Stand zu Stand. Probier aus, was dort liegt.", "Nimm von jedem Stand höchstens **einen** Skill mit – den, der bei dir wirkt.", "An den Ständen „Menschen“ und „Tun“ liegen leere Zettel: Schreib deine eigenen."], "frage": "Welcher Stand war bei euch am schnellsten leer?"},
      ],
      leitung: {
        einsatz: 'Szene nach „Das Glas der Bedürfnisse wird geöffnet“. Move A am Koffer-Markt, Move B im Schritt „Mein Ampelplan“ (Kurzform; das Blatt bleibt die ausführliche Fassung). Die Challenge ist der Skills-Notruf. Die Notfallkarte steht auf Seite {K}.',
        loesungen: [
          'Szene: Finn hat seine Warnsignale bei Gelb erkannt (Kiefer, Hitze) und einen unauffälligen Körper-Skill genutzt. Geredet hat er erst danach – bei Grün.',
          'Move A: offen. Darauf achten, dass im Fach „Mensch“ eine erreichbare Person steht.',
          'Move B: Bei Rot gehören Körper- und Sinnes-Skills hin, keine Kopf-Skills. Stehen dort Selbstverletzung, Weglaufen oder Drogen: zeitnah das Einzelgespräch suchen.',
        ],
        impulse: ['Welcher Skill liegt in eurem Koffer ganz oben – und warum?', 'Was braucht ihr, damit ihr bei Rot an die Karte denkt?'],
        material: 'Skills-Kärtchen, Gegenstände für die Stände, Würfel, Schere', blaetter: 'Gefühlsrad, Bedürfnis-Pegel, Skills-Tester, „Skills-Koffer und Ampelplan“, Zonen-Karten, Skills-Pass.',
      },
    },
  ],
  kino: {
    "geprueft": "14.11.2026",
    "filme": [
      {
        "titel": "Creed – Rocky’s Legacy",
        "jahr": 2015,
        "fsk": 12,
        "laenge": "133 Min.",
        "worum": "Adonis wächst in Heimen und Jugendanstalten auf – immer Ärger, immer Fäuste. Dann erfährt er, wer sein Vater war: Boxlegende Apollo Creed. Er sucht den alten Rocky Balboa und will nur eins beweisen: dass er kein Fehler ist.",
        "achte": [
          "Was macht Adonis mit seiner Wut – am Anfang und am Ende?",
          "Wie atmet und bewegt er sich vor einem Kampf?",
          "Wer ist sein Mensch, wenn es eng wird?"
        ],
        "achtung": "Harte Boxkämpfe; eine Hauptfigur ist schwer krank."
      },
      {
        "titel": "Karate Kid",
        "jahr": 2010,
        "fsk": 6,
        "laenge": "140 Min.",
        "worum": "Dre zieht mit seiner Mutter nach Peking und wird von einer Gang verprügelt. Hausmeister Han bringt ihm Kung-Fu bei – erst mal mit einer Jacke. Jacke an. Jacke aus. Tausendmal.",
        "achte": [
          "Was hat die Jacke mit Kämpfen zu tun?",
          "Wie bleibt Han ruhig, wenn er wütend ist?"
        ],
        "achtung": "Prügelszenen unter Jugendlichen."
      }
    ],
    "bingo": [
      "Jemand rastet aus",
      "Lang ausatmen vor dem großen Moment",
      "Training, das erst sinnlos wirkt",
      "Jemand geht weg, statt zuzuschlagen",
      "Hier wärst du bei 90",
      "Musik pusht",
      "Kälte oder Wasser",
      "Jemand holt sich Hilfe",
      "Aus Wut wird Kraft"
    ],
    "nachher": [
      "In welcher Szene war Adonis bei Rot – und was hat ihn runtergebracht?",
      "Was ist der Unterschied zwischen Prügeln und Boxen?",
      "Wer wäre dein Rocky?"
    ]
  },
  hot: {
    unter: 'Sechs Sätze zum Streiten – nach Regeln',
    regeln: 'Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**',
    takes: ['Wut ist immer ein Problem.', 'Wer weint, ist schwach.', 'Manche Leute bringt einfach nichts aus der Ruhe.', 'Zocken ist ein Skill.', 'Wer provoziert wird, darf zuschlagen.', 'Über Gefühle reden bringt nichts.'],
  },
  quiz: {
    unter: 'Zehn Fragen. Zehn Buchstaben. Zwei Wörter.', wort: 'KOPFONLINE',
    fragen: [
      { f: 'Was misst die Zahl von 0 bis 100?', o: ['deinen Druck', 'deine Noten', 'deine Laune von gestern'], r: 0 },
      { f: 'In welcher Zone ist der Kopf online?', o: ['Rot', 'Grün', 'Gelb'], r: 1 },
      { f: 'Was gilt bei Rot?', o: ['erst reden', 'erst runter', 'erst erklären'], r: 1 },
      { f: 'Welcher Atem bremst den Körper?', o: ['schnell und flach', 'Luft lange anhalten', 'länger aus als ein'], r: 2 },
      { f: 'Welche Skills gehen auch bei Rot?', o: ['Körper und Sinne', 'Kopf-Skills', 'Diskutieren'], r: 0 },
      { f: 'Der stärkste Reiz ohne Schaden?', o: ['Kälte', 'Lavendel', 'leise Musik'], r: 0 },
      { f: 'Wie lange bleibt das Eis in der Hand?', o: ['bis es wehtut', '30 Sekunden', '10 Minuten'], r: 1 },
      { f: 'Gedanken-Schiffe: Was tust du?', o: ['Gedanken wegdrücken', 'mitfahren', 'nachschauen'], r: 2 },
      { f: 'Kopf-Skills wirken am besten bei …', o: ['Gelb', 'Rot', 'gar nicht'], r: 0 },
      { f: 'Was steht auf der Notfallkarte?', o: ['deine Adresse', 'deine Noten', 'drei Skills für Rot'], r: 2 },
    ],
  },
  karten: [
    { titel: 'Notfallkarte', icon: 'alert-triangle', zeilen: ['Bei Rot mache ich – ohne nachzudenken:', '_1', '_2', '_3'], eigen: 'Mein Mensch:' },
    { titel: 'Ampel', icon: 'traffic-lights', zeilen: ['**Grün 0–30:** Kopf online. Reden, lösen, üben.', '**Gelb 30–70:** Skill jetzt – Kopf, Sinne oder Körper.', '**Rot 70–100:** Körper und Sinne. Raus. Zu einem Menschen.'] },
    { titel: 'Atem', icon: 'wind', zeilen: ['**4-7-8:** 4 ein, 7 halten, 8 aus.', '**Kasten:** 4 ein – 4 halten – 4 aus – 4 halten.', 'Halten unangenehm? Zweimal kurz ein, lang aus.'] },
    { titel: 'Stark, nicht schädlich', icon: 'snowflake', zeilen: ['Eiswürfel oder kaltes Wasser, 30 Sekunden.', 'Saures Bonbon, Chili, Minze.', 'Bass auf die Ohren. Kräftig riechen.', 'Fäuste ballen, 5 Sekunden, loslassen.'] },
    { titel: 'Kopf', icon: 'brain', zeilen: ['100 minus 7 minus 7 minus 7 …', 'ABC mit Automarken, Städten, Spielern.', 'Gedanke aufs Schiff. Nachschauen.'], eigen: 'Mein Ort:' },
    { titel: 'Unsichtbar', icon: 'eye-off', zeilen: ['Zehen in den Schuh drücken.', 'Hände fest gegeneinander.', 'Lang ausatmen – hört keiner.', 'Etwas Kaltes oder Raues in der Hosentasche.'] },
  ],
  abspann: {
    posten: ['Zahl einschätzen', 'Körper-Skill', 'Sinnes-Skill', 'Kopf-Skill', 'Plan für Rot'],
    saetze: ['Mein Skill Nr. 1:', 'Das war Quatsch:', 'Das soll im Kurs anders werden:'],
  },
  leitung: {
    fakten: [['Zielgruppe', '12–16 Jahre, 4–8 Jugendliche'], ['Dauer', '5 Einheiten à 100 Min. (E11–E15)'], ['Sozialform', 'allein, zu zweit, Teams'], ['Material', 'Stifte, Würfel, Düfte, Kühlpacks, Schere']],
    wozu: 'REAL TALK ist das Heft der Jugendlichen zu Modul 3 – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Die Spiele und Stationen der Einheiten bleiben. Ins Heft kommen die Messwerte (Zahl vorher, Zahl nachher) und das, was jede Person für sich herausfindet. Skills-Tester und Thermometer-Blatt können weiterlaufen.',
    lernziele: [
      'Die Jugendlichen schätzen ihre Anspannung von 0 bis 100 ein und ordnen sie den Zonen Grün, Gelb und Rot zu.',
      'Sie testen Körper-, Sinnes- und Kopf-Skills nach dem Muster Zahl vorher – Skill – Zahl nachher.',
      'Sie wissen, warum bei Rot Körper und Sinne vor dem Reden kommen – und dass ein Reiz stark sein darf, aber nicht schädlich.',
      'Sie packen einen eigenen Skills-Koffer und schreiben einen Ampelplan mit mindestens einer erreichbaren Person.',
    ],
    start: 'Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten, z. B. nach dem Skills-Sprint in Einheit 11.',
    schluss: 'Hot Takes im Stehen (15 Min.) in Einheit 15 oder als Einstieg in Einheit 16. „Knack den Code“ als Wiederholung, Karten ausschneiden (die Notfallkarte zuerst), Abspann in der Abschlussrunde.',
    hilfe: ['Die Zahl mit den Fingern zeigen lassen (0–10) und gemeinsam einkreisen.', 'Szene und Fakten vorlesen oder reihum lesen lassen.', 'Bei Schreibaufgaben reicht ein Stichwort oder eine Zeichnung.', 'Wer bei Gelb oder Rot ist: erst ein Skill, dann das Heft.'],
    forder: ['Einen Skill für die ganze Gruppe anleiten.', 'Eine eigene Szene schreiben: Was wäre bei 60 noch gegangen?', 'Eine Woche lang die Zahl dreimal täglich notieren und den Verlauf zeichnen.', 'Den Ampelplan um ein zweites Warnsignal erweitern.'],
    gespraech: 'Die Zahl ist eine Auskunft, kein Urteil – nie kommentieren oder anzweifeln („Du bist doch nicht bei 80“). Die Szenen sind nah am Alltag der Jugendlichen; fragen Sie nach der Figur („Was hätte Finn gebraucht?“), nicht nach der Person im Raum. Körper- und Vorstellungsübungen sind freiwillig. Ampelplan und sicherer Ort sind privat. Stehen bei Rot Selbstverletzung, Weglaufen oder Drogen, findet jemand keine erreichbare Person oder deutet Suizidgedanken an: zeitnah das Einzelgespräch suchen und nach dem Krisenplan des Hauses handeln.',
    druck: ['A4, doppelseitig, an der langen Seite gewendet. So liegen Szene (links) und „Dein Move“ (rechts) nebeneinander.', 'Seiten 1–{J} für die Jugendlichen, Seiten {L} nur für Sie.', 'Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.', 'Seite {K} (Karten) einzeln und einseitig drucken, am besten auf festerem Papier.'],
    hot: 'Es gibt keine richtige Position. Nachfragen statt korrigieren: „Was hast du erlebt, dass du dort stehst?“ Bei Take 5 nicht moralisieren, sondern rechnen lassen: Was bringt es in fünf Minuten, was kostet es in fünf Wochen? Bei Take 4 hilft die Definition: Ein Skill senkt die Zahl und schadet weder mir noch anderen – ab wann kippt das?',
    achtung: 'Körperübungen: bei Asthma, Herz-Kreislauf-Problemen oder Verletzungen anpassen, die Luft nicht anhalten lassen. Düfte: vorher Allergien und Asthma klären; Öle nur auf Riechstreifen. Kälte: freiwillig, höchstens 30 Sekunden, Eis immer im Tuch. „Stark, nicht schädlich“ (Track 03) richtet sich auch an Jugendliche, die sich selbst verletzen – das Thema nicht in der Gruppe öffnen. Vorstellungsübungen können belastende Erinnerungen wecken: Augen offen ist erlaubt.',
    hintergrund: 'Das Heft folgt dem Skillstraining der Dialektisch-Behavioralen Therapie für Jugendliche (Rathus & Miller; Fleischhaker et al.). Die Anspannungsskala macht greifbar, was Linehan beschreibt: Bei sehr hoher Erregung versagen Fertigkeiten, die Nachdenken voraussetzen; dann wirken Körper und starke, unschädliche Sinnesreize. Langsames Atmen mit langer Ausatmung stärkt den beruhigenden Teil des Nervensystems (Zaccaro et al.). Aggressives „Dampfablassen“ senkt Ärger nicht, sondern hält ihn hoch (Bushman). Gedanken als vorüberziehende Ereignisse zu beobachten stammt aus der Akzeptanz- und Commitment-Therapie (Hayes et al.). Vorab geschriebene Pläne werden in Krisen eher umgesetzt (Gollwitzer; Stanley & Brown).',
    quellen: 'Linehan (2015) · Rathus & Miller (2015) · Fleischhaker, Sixt & Schulz (2011) · Zaccaro et al. (2018) · Bushman (2002) · Kabat-Zinn (1990) · Hayes, Strosahl & Wilson (2012) · Gollwitzer (1999) · Stanley & Brown (2012). Angaben zu den Einheiten 11–15 in der Toolbox.',
  },
}
export default d
