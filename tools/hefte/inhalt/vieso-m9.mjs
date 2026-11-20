// Vie et société · Modul 9 (5P) „Was wirklich zählt“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 9. Klasse:
// Themenfelder „Technik früher, heute, morgen“ (Ambivalenz des technologischen Fortschritts; Folgen der Technik),
// „Medien und Mythen“ (Manipulation von Individuen, Gruppen und Gesellschaft; Information und Propaganda) und
// „Sinnfragen“ (Sinn erfahren, Sinn deuten, Sinn geben; Glück). Letztes Modul: Abschluss mit Brief an das Zukunfts-Ich.
// Ergänzt Deutsch M7 (Werbung, Bildschirmzeit) und Culture générale M9 (KI, Faktencheck) um die ethische Sicht.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 9, {
  titel: 'Was wirklich zählt',
  titelFr: 'Ce qui compte vraiment',
  unter: 'Erfindungen mit zwei Seiten, Verantwortung für Technik, Apps, die uns festhalten, Filterblasen und Propaganda – und die großen Fragen: Was gibt meinem Leben Sinn? Was macht mich glücklich?',
  unterFr: 'Progrès technique, manipulation, propagande – et les grandes questions : le sens de la vie et le bonheur.',
  farbe: '#2b6f8e',
  deckbild: ['lio:froh:handy', 'mia:froh:stehen-zeigen', 'opa:froh:stehen'],
  blasen: [{ t: 'Wer steuert wen?', x: 6, y: 104 }, { t: 'Was macht dich glücklich?', x: 112, y: 92 }, { t: 'Meine Spur!', x: 168, y: 150 }],
  aussprache: { 'Raskin': 'Rässkin', 'Cattenom': 'Kattenomm', 'Berners-Lee': 'Börners-Lie', 'CERN': 'Zern', 'Csikszentmihalyi': 'Tschik-sent-mihaji', '\\bStreaks\\b': 'Strieks' },
  themen: [
    { titel: { de: 'Technik', fr: 'Technique' }, icon: 'bulb', lektionen: 2 },
    { titel: { de: 'Medien und Macht', fr: 'Médias et pouvoir' }, icon: 'device-mobile', lektionen: 3 },
    { titel: { de: 'Sinn und Glück', fr: 'Sens et bonheur' }, icon: 'sun', lektionen: 3 },
  ],
})

const FRAGE = '#2b6f8e', DILEMMA = '#6d4bc4', MUT = '#d0577b', IDEE = '#2f8a6b', SINN = '#d08a1e'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Fortschritt · Segen und Fluch', titel: 'Zwei Seiten einer Erfindung', untertitel: 'Feuer wärmt und zerstört, das Internet verbindet und spaltet: Du lernst, dass fast jede Erfindung zwei Seiten hat, und wägst bei vielen Erfindungen Segen und Fluch ab.',
    ziel: { de: 'Ich beschreibe an Beispielen, dass technischer Fortschritt Chancen und Risiken hat.', fr: 'Je montre à l’aide d’exemples que le progrès technique a des chances et des risques.' },
    bild: ['noah:froh:laptop', 'opa:froh:stehen'],
    start: {
      was: 'Ohne …',
      aufgaben: [
        { art: 'fragen', auftrag: 'Auf welche Erfindung könntest du am wenigsten verzichten? Warum?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort, z. B.: auf den Kühlschrank, weil sonst das Essen schlecht wird.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Segen und Fluch',
      absaetze: [
        'Seit es Menschen gibt, erfinden sie Neues: das Feuer, das Rad, den Buchdruck, die Dampfmaschine, das Auto, das Internet. Erfindungen machen das Leben leichter, sicherer und länger. Doch fast jede Erfindung hat **zwei Seiten**: Feuer zum Beispiel wärmt, kocht Essen und gibt Licht – aber es kann Häuser und Wälder zerstören.',
        '### Beispiel Atomkraft',
        '1938 entdeckten Forschende in Berlin, dass man Atomkerne spalten kann. Daraus wurden **Atomkraftwerke**, die viel Strom erzeugen – aber auch gefährlichen Müll und das Risiko schwerer Unfälle. Und daraus wurde die **Atombombe**. Luxemburg ist seit Langem gegen das französische Atomkraftwerk **Cattenom**, das nur wenige Kilometer von der Grenze entfernt steht.',
        '### Beispiel Internet',
        'Der Brite **Tim Berners-Lee** erfand um 1990 am Forschungszentrum CERN das World Wide Web und schenkte es der Welt. Heute verbindet es Milliarden Menschen, macht Wissen frei zugänglich und hilft in Notfällen. Aber es verbreitet auch Hass und Lügen und macht manche süchtig.',
        '### Die Frage ist nicht nur: Was können wir?',
        'Sondern auch: **Was wollen wir?** Und: **Wie nutzen wir es?** Menschen entscheiden, ob eine Erfindung mehr Segen oder mehr Fluch bringt.',
      ],
      woerter: [['die Erfindung', 'l’invention'], ['der Fortschritt', 'le progrès'], ['der Segen', 'la bénédiction'], ['der Fluch', 'la malédiction'], ['der Buchdruck', 'l’imprimerie'], ['spalten', 'fendre, diviser'], ['das Atomkraftwerk', 'la centrale nucléaire'], ['zugänglich', 'accessible']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Segen und Fluch: Ergänze die Tabelle.', stufe: 2, kopf: ['Erfindung', 'Segen', 'Fluch'], breiten: [20, 40, 40], zeilen: [['Feuer', '[wärmt, kocht, gibt Licht]', '[zerstört Häuser und Wälder]'], ['Atomkraft', '[viel Strom]', '[gefährlicher Müll, Unfälle, Atombombe]'], ['Internet', '[verbindet, Wissen, Hilfe im Notfall]', '[Hass, Lügen, Sucht]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Beim Großvater', titel: 'Früher war alles … anders',
      situation: 'Noah zeigt seinem Opa, wie er mit dem Handy für ein Referat recherchiert. Der Opa erzählt, wie das früher war.',
      bild: ['noah:froh:handy', 'opa:froh:stehen'], sprecher: { Noah: 'm3', Opa: 'm2' },
      text: [
        ['Opa', 'Als ich so alt war wie du, musste ich für ein Referat in die Bibliothek nach Luxemburg-Stadt fahren. Eine Stunde mit dem Bus. Und dann war das Buch schon ausgeliehen.'],
        ['Noah', 'Heute habe ich in fünf Minuten zehn Artikel gefunden.'],
        ['Opa', 'Und ein Video, in dem ein Mann erzählt, die Erde sei eine Scheibe. Das habe ich gestern bei dir gesehen!'],
        ['Noah', 'Haha. Ja, man muss aufpassen, was stimmt.'],
        ['Opa', 'Weißt du, was ich vermisse? Früher hat man sich zum Reden getroffen. Heute sitzen alle am Tisch und schauen aufs Handy.'],
        ['Noah', 'Aber du videotelefonierst jeden Sonntag mit Tante Rita in Kanada. Das ging früher auch nicht.'],
        ['Opa', 'Stimmt. Das ist ein Geschenk. Ich glaube, die Technik ist wie ein Messer: Man kann damit Brot schneiden oder jemanden verletzen. Es kommt darauf an, wer es in der Hand hat.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „recherchieren“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Informationen suchen und sammeln', 'etwas reparieren'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sagen Noah und der Opa über Technik – Gutes und Schlechtes?', stufe: 1, kopf: ['Segen', 'Fluch'], breiten: [50, 50], zeilen: [['[schnell Informationen finden]', '[falsche Videos, z. B. die Erde sei eine Scheibe]'], ['[Videotelefon mit Tante Rita in Kanada]', '[alle schauen am Tisch aufs Handy]']] },
        { art: 'fragen', auftrag: 'Womit vergleicht der Opa die Technik? Was meint er damit?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'mit einem Messer: Man kann damit Gutes oder Schlechtes tun; es kommt darauf an, wer es benutzt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stimmt der Vergleich mit dem Messer? Gibt es Erfindungen, die nur gut oder nur schlecht sind?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde den Vergleich gut, weil …', 'Aber bei … ist es anders, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zwei Seiten', punkte: ['fast jede Erfindung hat **Segen** und **Fluch**', 'Beispiele: **Feuer**, **Atomkraft**, **Internet**', 'Luxemburg ist gegen das Atomkraftwerk **Cattenom**'] },
         { titel: 'Drei Fragen', punkte: ['Was **können** wir?', 'Was **wollen** wir?', 'Wie **nutzen** wir es?', 'Menschen **entscheiden** über die Folgen.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Erfindungs-Karten: Schreibt auf jede Karte einen Segen und einen Fluch. Legt die Karten dann auf eine Linie: Wo überwiegt der Segen, wo der Fluch?', stufe: 2, neueSeite: true, titel: 'Segen oder Fluch?', icon: 'bulb', farbe: FRAGE, spalten: 3,
        karten: [
          { text: '**das Auto**', linien: 2 }, { text: '**das Smartphone**', linien: 2 }, { text: '**das Flugzeug**', linien: 2 },
          { text: '**die Plastiktüte**', linien: 2 }, { text: '**die Impfung**', linien: 2 }, { text: '**die Drohne**', linien: 2 },
          { text: '**die Künstliche Intelligenz**', linien: 2 }, { text: '**das Antibiotikum**', linien: 2 }, { text: '**die Videospiel-Konsole**', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Erfindung. Schreibe einen kurzen Text über ihren Segen und ihren Fluch – und wie man sie gut nutzt.', stufe: 2,
        anfaenge: ['Die Erfindung … hat zwei Seiten.', 'Ein Segen ist, dass …', 'Ein Fluch ist, dass …', 'Gut nutzt man sie, wenn …'], zeilen: 7,
        beispiel: 'Die Erfindung Auto hat zwei Seiten. Ein Segen ist, dass man schnell überall hinkommt, auch dorthin, wo kein Bus fährt. Ein Fluch ist, dass Autos die Luft verschmutzen und es viele Unfälle gibt. Gut nutzt man es, wenn man kurze Strecken zu Fuß oder mit dem Rad fährt und das Auto nur nimmt, wenn es wirklich nötig ist.' },
    ],
    check: ['Ich erkläre, warum Erfindungen zwei Seiten haben.', 'Ich nenne Beispiele für Segen und Fluch.', 'Ich weiß: Menschen entscheiden, wie Technik genutzt wird.'],
  },
  // ================================================================ 2
  {
    thema: 'Folgen der Technik · Verantwortung', titel: 'Darf man alles, was man kann?', untertitel: 'Ein Erfinder, der seinen eigenen Nachruf liest, und Fragen ohne einfache Antwort: Du denkst darüber nach, wer für die Folgen von Technik verantwortlich ist.',
    ziel: { de: 'Ich erkläre, wer für die Folgen von Technik Verantwortung trägt, und begründe meine Meinung zu Grenzen der Technik.', fr: 'J’explique qui est responsable des conséquences de la technique et je justifie mon avis sur ses limites.' },
    bild: ['lea:verwirrt:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Wer ist schuld?',
      aufgaben: [
        { art: 'mc', auftrag: 'Jemand benutzt ein Küchenmesser, um einen Menschen zu verletzen. Wer ist verantwortlich? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der Erfinder des Messers', 'die Firma, die es verkauft hat', 'der Mensch, der es benutzt hat'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Der Erfinder, der seinen Nachruf las',
      absaetze: [
        'Der Schwede **Alfred Nobel** erfand 1867 das **Dynamit**. Es sollte beim Bau von Tunneln und Straßen helfen. Doch es wurde auch im Krieg benutzt.',
        'Man erzählt, dass 1888 eine französische Zeitung aus Versehen seinen **Nachruf** druckte – eigentlich war sein Bruder gestorben. Darin stand: „Der Händler des Todes ist tot.“ Nobel soll so erschrocken gewesen sein, dass er sein Testament änderte. Darin bestimmte er, dass mit seinem Vermögen Preise für Menschen vergeben werden, die der Menschheit Gutes tun – die **Nobelpreise**, auch den Friedensnobelpreis. Es gibt sie seit 1901.',
        '### Wer trägt Verantwortung?',
        'Bei neuer Technik tragen viele Verantwortung: die **Forschenden**, die überlegen müssen, was aus ihrer Idee werden kann. Die **Firmen**, die entscheiden, was sie verkaufen. Die **Politik**, die Regeln macht. Und wir alle als **Nutzerinnen und Nutzer**.',
        '### Schwierige Fragen von heute',
        'Darf eine Kamera in der Stadt alle Gesichter erkennen, um Verbrecher zu finden? Darf eine KI Bilder von echten Menschen fälschen? Darf man Gene von Pflanzen oder Tieren verändern? Auf solche Fragen gibt es oft **keine einfache Antwort**. Darum ist es wichtig, darüber zu reden, bevor die Technik da ist.',
      ],
      woerter: [['das Dynamit', 'la dynamite'], ['der Nachruf', 'la nécrologie'], ['aus Versehen', 'par erreur'], ['das Testament', 'le testament'], ['das Vermögen', 'la fortune'], ['die Verantwortung', 'la responsabilité'], ['der Nutzer', 'l’utilisateur'], ['fälschen', 'falsifier']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne Nobels Geschichte.', stufe: 1, teile: ['Nobel erfindet das Dynamit.', 'Das Dynamit wird auch im Krieg benutzt.', 'Eine Zeitung druckt aus Versehen seinen Nachruf.', 'Nobel ändert sein Testament.', 'Es gibt die Nobelpreise.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'zuordnen', auftrag: 'Wer trägt welche Verantwortung? Verbinde.', stufe: 2, links: ['Forschende', 'Firmen', 'Politik', 'Nutzer'], rechts: ['überlegen, was aus ihrer Idee werden kann', 'entscheiden, was sie verkaufen', 'machen Regeln und Gesetze', 'entscheiden, wie sie die Technik benutzen'] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion', wo: 'Klasse 5P3 · Diskussion', titel: 'Kameras überall?',
      situation: 'Die Klasse diskutiert, ob es am Bahnhof Kameras mit Gesichtserkennung geben soll.',
      bild: ['lea:froh:erklaeren', 'finn:gelangweilt:verschraenkt'], sprecher: { Lehrer: 'm1', Finn: 'm3', Lea: 'w3' },
      text: [
        ['Lehrer', 'Stellt euch vor: Am Bahnhof hängen Kameras, die jedes Gesicht erkennen. Gesuchte Verbrecher werden sofort gefunden. Gute Idee?'],
        ['Finn', 'Klar! Wer nichts Schlimmes tut, muss doch keine Angst haben. Und ich fühle mich sicherer.'],
        ['Lea', 'Ich nicht. Dann weiß jemand immer, wo ich bin. Mit wem ich mich treffe. Wann ich nach Hause komme.'],
        ['Finn', 'Na und? Ist doch egal.'],
        ['Lea', 'Und wenn die Kamera sich irrt? Solche Systeme verwechseln manchmal Menschen. Dann wirst du festgehalten, obwohl du nichts getan hast.'],
        ['Lehrer', 'Und was, wenn eine Regierung die Kameras benutzt, um Menschen zu verfolgen, die demonstrieren?'],
        ['Finn', 'Hm. Das wäre schlimm. Vielleicht nur mit strengen Regeln? Und nur für schwere Verbrechen?'],
        ['Lea', 'Damit könnte ich eher leben. Aber jemand muss die Regeln kontrollieren.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist „Gesichtserkennung“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ein Computer erkennt Menschen an ihrem Gesicht.', 'Ein Arzt untersucht das Gesicht.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Argumente gibt es dafür und dagegen?', stufe: 1, kopf: ['dafür', 'dagegen'], breiten: [50, 50], zeilen: [['[Verbrecher werden sofort gefunden]', '[jemand weiß immer, wo ich bin]'], ['[Finn fühlt sich sicherer]', '[die Kamera kann sich irren]'], ['', '[eine Regierung könnte Demonstrierende verfolgen]']] },
        { art: 'fragen', auftrag: 'Welchen Kompromiss schlägt Finn am Ende vor?', stufe: 2, fragen: [{ f: '', l: 'nur mit strengen Regeln und nur für schwere Verbrechen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: '„Wer nichts Schlimmes tut, muss keine Angst haben.“ Stimmt das?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, das stimmt, weil …', 'Das stimmt nicht ganz, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Verantwortung für Technik', punkte: ['**Forschende**: an Folgen denken', '**Firmen**: was sie verkaufen', '**Politik**: Regeln machen', '**Nutzer**: wie wir sie benutzen'] },
         { titel: 'Nobel', punkte: ['erfand 1867 das **Dynamit**', 'las (so erzählt man) seinen eigenen **Nachruf**', 'stiftete im Testament die **Nobelpreise**', 'über Grenzen der Technik **reden, bevor** sie da ist'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Die Wissenschaft darf alles erforschen, was möglich ist.', 'Eine KI darf keine Bilder von echten Menschen fälschen.'] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Du hast eine App erfunden, mit der man verlorene Haustiere über ein Foto findet. Eine große Firma will sie für viel Geld kaufen. Du erfährst, dass sie die App auch nutzen will, um Menschen auf Fotos zu erkennen.'],
        frage: 'Verkaufst du die App?',
        optionen: ['Ja – das Geld ist zu gut, was die Firma macht, ist nicht meine Sache.', 'Nein – ich will nicht, dass meine Erfindung so benutzt wird.', 'Nur mit einem Vertrag, der die Gesichtserkennung verbietet.'],
        hinweis: 'Gute Antworten denken an die Folgen der Erfindung – und an die eigene Verantwortung.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du schreibst wie Nobel ein „Testament“ für eine Erfindung, die du später machen willst. Was soll damit niemals geschehen? Was soll sie Gutes tun?', stufe: 3,
        anfaenge: ['Meine Erfindung ist …', 'Sie soll …', 'Sie darf niemals …', 'Darum bestimme ich: …'], zeilen: 7,
        beispiel: 'Meine Erfindung ist ein Roboter, der alten Menschen im Haushalt hilft. Er soll ihnen Essen bringen, sie an Medikamente erinnern und Hilfe rufen, wenn sie hinfallen. Er darf niemals heimlich filmen oder Gespräche weitergeben. Darum bestimme ich: Jeder Roboter hat einen großen roten Knopf, mit dem man die Kamera ausschaltet.' },
    ],
    check: ['Ich erzähle die Geschichte von Alfred Nobel.', 'Ich nenne, wer für Technik Verantwortung trägt.', 'Ich begründe meine Meinung zu Grenzen der Technik.'],
  },
  // ================================================================ 3
  {
    thema: 'Manipulation des Einzelnen · Apps', titel: 'Wer steuert wen?', untertitel: 'Rote Punkte, endloses Scrollen, Serien, die man nicht verlieren will: Du entdeckst die Tricks, mit denen Apps uns festhalten, und findest deine Gegentricks.',
    ziel: { de: 'Ich erkenne Tricks, mit denen Apps meine Aufmerksamkeit lenken, und entscheide selbst.', fr: 'Je reconnais les astuces par lesquelles les applis captent mon attention et je décide moi-même.' },
    bild: ['lio:muede:handy', 'chloe:froh:stehen'],
    start: {
      was: 'Ehrlich?',
      aufgaben: [
        { art: 'mc', auftrag: 'Hast du schon einmal mehr Zeit am Handy verbracht, als du wolltest? Kreuze an (du musst es niemandem zeigen).', stufe: 1, fragen: [{ f: '', o: ['oft', 'manchmal', 'selten', 'nie'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Deine Zeit ist ihr Geld',
      absaetze: [
        'Viele Apps sind **kostenlos**. Wie verdienen die Firmen dann Geld? Vor allem mit **Werbung**. Je länger wir in der App bleiben, desto mehr Werbung sehen wir – und desto mehr verdienen sie. Darum gilt: **Unsere Aufmerksamkeit ist das Produkt.**',
        '### Die Tricks',
        '**Endloses Scrollen**: Es gibt kein Ende, an dem man aufhören würde. **Autoplay**: Das nächste Video startet von selbst. **Rote Punkte** und Benachrichtigungen rufen: „Schau sofort!“ **Likes** wirken wie eine kleine Belohnung – und weil man nie weiß, wie viele kommen, schaut man immer wieder nach, wie bei einem Glücksspielautomaten. **Serien** (Streaks) machen Druck: „Wenn du heute nicht schreibst, ist alles weg!“',
        '### Selbst die Erfinder sind besorgt',
        'Aza Raskin, der das endlose Scrollen miterfunden hat, sagte später, dass ihm die Folgen Sorgen machen.',
        '### Gegentricks',
        'Benachrichtigungen ausschalten. Feste Handy-Zeiten. Das Handy nachts aus dem Zimmer. Bevor man eine App öffnet, kurz fragen: **Will ich das gerade – oder will die App das?**',
      ],
      woerter: [['kostenlos', 'gratuit'], ['die Aufmerksamkeit', 'l’attention'], ['scrollen', 'faire défiler'], ['die Benachrichtigung', 'la notification'], ['die Belohnung', 'la récompense'], ['der Glücksspielautomat', 'la machine à sous'], ['besorgt', 'inquiet'], ['ausschalten', 'désactiver']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Trick ist das? Verbinde.', stufe: 1, links: ['„Nur noch ein Video …“ – und es startet von selbst.', '„Deine Serie mit Ben endet in 2 Stunden!“', 'Ein roter Punkt mit der Zahl 12.', 'Es gibt nie ein Ende der Seite.'], rechts: ['Autoplay', 'Serie (Streak)', 'Benachrichtigung', 'endloses Scrollen'] },
        { art: 'fragen', auftrag: 'Was bedeutet „Unsere Aufmerksamkeit ist das Produkt“?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Die Firmen verdienen Geld mit Werbung; je länger wir schauen, desto mehr verdienen sie. Unsere Zeit wird verkauft.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Morgens im Bus', titel: 'Nur noch fünf Minuten',
      situation: 'Lio ist im Bus total müde. Chloé fragt, was los ist.',
      bild: ['lio:muede:handy', 'chloe:froh:stehen'], sprecher: { Chloé: 'w3', Lio: 'm3' },
      text: [
        ['Chloé', 'Du siehst aus wie ein Zombie. Was war los?'],
        ['Lio', 'Ich wollte um zehn schlafen. Nur noch fünf Minuten Videos. Dann war es plötzlich zwei Uhr.'],
        ['Chloé', 'Kenne ich. Das ist kein Zufall. Wir hatten das in Vie et société: Die App ist so gebaut, dass du nicht aufhörst.'],
        ['Lio', 'Aber ich entscheide doch selbst.'],
        ['Chloé', 'Ja, aber gegen hunderte Leute, die den ganzen Tag überlegen, wie sie dich festhalten. Das ist kein fairer Kampf.'],
        ['Lio', 'Und was machst du?'],
        ['Chloé', 'Mein Handy lädt nachts in der Küche. Und ich habe alle Benachrichtigungen ausgeschaltet, außer von meiner Familie. Am Anfang war das komisch. Jetzt schlafe ich viel besser.'],
        ['Lio', 'Hm. Vielleicht probiere ich das eine Woche lang.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „kein fairer Kampf“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Eine Seite ist viel stärker als die andere.', 'Beide sind gleich stark.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lio wollte um zehn schlafen.', true], ['Er hat bis zwei Uhr Videos geschaut.', true], ['Chloé glaubt, dass das Zufall ist.', false], ['Chloés Handy lädt nachts in der Küche.', true], ['Chloé hat alle Benachrichtigungen an.', false]] },
        { art: 'fragen', auftrag: 'Warum ist es laut Chloé „kein fairer Kampf“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil hunderte Menschen den ganzen Tag überlegen, wie die App einen festhält – gegen einen Einzelnen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher Gegentrick wäre für euch realistisch?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich könnte …', 'Schwer fände ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Tricks der Apps', punkte: ['**endloses Scrollen**', '**Autoplay**', '**rote Punkte**, Benachrichtigungen', '**Likes** als Belohnung', '**Serien** (Streaks)'] },
         { titel: 'Gegentricks', punkte: ['Benachrichtigungen **aus**', 'feste **Handy-Zeiten**', 'nachts **raus aus dem Zimmer**', 'fragen: **Will ich das – oder die App?**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Trick-Detektiv: Schreibt auf jede Karte, was der Trick mit euch macht und welchen Gegentrick ihr wählt. Probiert einen Gegentrick eine Woche lang aus.', stufe: 2, neueSeite: true, titel: 'Trick erkannt!', icon: 'device-mobile', farbe: MUT, spalten: 2,
        karten: [
          { text: '**Endloses Scrollen**', linien: 2, frage: 'Mein Gegentrick: …' },
          { text: '**Autoplay**', linien: 2, frage: 'Mein Gegentrick: …' },
          { text: '**Rote Punkte**', linien: 2, frage: 'Mein Gegentrick: …' },
          { text: '**Likes zählen**', linien: 2, frage: 'Mein Gegentrick: …' },
          { text: '**Serien (Streaks)**', linien: 2, frage: 'Mein Gegentrick: …' },
          { text: '**„Nur heute: Angebot!“**', linien: 2, frage: 'Mein Gegentrick: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an eine App-Firma: Was stört dich an ihren Tricks? Was wünschst du dir?', stufe: 3,
        anfaenge: ['Liebe App-Entwicklerinnen und -Entwickler,', 'mich stört, dass …', 'Das ist nicht fair, weil …', 'Ich wünsche mir …'], zeilen: 8,
        beispiel: 'Liebe App-Entwicklerinnen und -Entwickler, mich stört, dass eure Videos nie aufhören und das nächste immer von selbst startet. Das ist nicht fair, weil ihr genau wisst, dass wir Jugendlichen dann nicht mehr schlafen. Ich wünsche mir einen Knopf „Pause nach 30 Minuten“ und dass Autoplay am Anfang ausgeschaltet ist. Dann entscheide ich selbst.' },
    ],
    check: ['Ich erkläre, wie kostenlose Apps Geld verdienen.', 'Ich erkenne Tricks der Apps.', 'Ich habe einen Gegentrick ausprobiert.'],
  },
  // ================================================================ 4
  {
    thema: 'Manipulation von Gruppen · Algorithmen · Filterblase', titel: 'Gefangen in der Blase', untertitel: 'Warum sehen zwei Menschen im Internet ganz verschiedene Welten? Du lernst, wie Algorithmen auswählen, was wir sehen, was eine Filterblase ist und wie man herauskommt.',
    ziel: { de: 'Ich erkläre, was Algorithmen und Filterblasen sind, und kenne Wege aus der Blase.', fr: 'J’explique ce que sont les algorithmes et les bulles de filtres et je connais des moyens d’en sortir.' },
    bild: ['ben:verwirrt:handy', 'mia:froh:handy'],
    start: {
      was: 'Gleiche App, andere Welt',
      aufgaben: [
        { art: 'fragen', auftrag: 'Vergleicht mit eurem Nachbarn: Zeigt euch eine Video-App dieselben Videos? Warum wohl nicht?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Nein. Die App merkt sich, was jeder anschaut, und zeigt ihm mehr davon.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Der unsichtbare Auswähler',
      absaetze: [
        'Jede Minute werden Millionen Videos und Beiträge hochgeladen. Niemand kann alles sehen. Darum wählt ein **Algorithmus** aus – ein Computerprogramm mit Regeln. Er merkt sich, was wir anschauen, liken und wie lange wir bleiben. Dann zeigt er uns **mehr davon**.',
        '### Die Filterblase',
        'Das ist bequem: Wer Fußball mag, sieht Fußball. Aber es hat eine Kehrseite. Wer sich für eine bestimmte Meinung interessiert, sieht bald **fast nur noch diese Meinung**. Andere Sichtweisen verschwinden. Man sitzt in einer **Filterblase** und denkt: „Alle sehen das so wie ich.“',
        '### Wut bringt Klicks',
        'Beiträge, die **wütend** oder **ängstlich** machen, werden besonders oft geteilt und kommentiert. Darum zeigen Algorithmen sie gern. So können sich Gruppen immer weiter voneinander entfernen. Man nennt das **Polarisierung**: Am Ende verstehen sich die Menschen nicht mehr.',
        '### Raus aus der Blase',
        'Bewusst auch andere Quellen lesen. Menschen folgen, die anders denken. Mit echten Menschen reden, nicht nur online. Und sich fragen: **Warum zeigt mir die App gerade das?**',
      ],
      woerter: [['der Algorithmus', 'l’algorithme'], ['hochladen', 'mettre en ligne'], ['der Beitrag', 'la publication'], ['bequem', 'pratique, confortable'], ['die Kehrseite', 'le revers'], ['die Filterblase', 'la bulle de filtres'], ['die Polarisierung', 'la polarisation'], ['die Quelle', 'la source']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was macht ein Algorithmus in einer App?', zeilen: 2, l: 'Er merkt sich, was wir anschauen und liken, und zeigt uns mehr davon.' }, { f: 'Was ist eine Filterblase?', zeilen: 2, l: 'Man sieht fast nur noch die eigene Meinung; andere Sichtweisen verschwinden.' }, { f: 'Warum zeigen Algorithmen gern Beiträge, die wütend machen?', zeilen: 2, l: 'Weil sie besonders oft geteilt und kommentiert werden.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause', titel: 'Alle denken so!',
      situation: 'Ben ist sich sicher, dass „alle“ etwas denken. Mia ist skeptisch.',
      bild: ['ben:wuetend:handy', 'mia:froh:handy'], sprecher: { Ben: 'm3', Mia: 'w3' },
      text: [
        ['Ben', 'Hast du gesehen? Alle sagen, dass die neue Handyregel an der Schule total unfair ist. Überall in meinem Feed!'],
        ['Mia', 'Alle? In meinem Feed habe ich davon nichts gesehen.'],
        ['Ben', 'Echt? Bei mir ist das seit drei Tagen das einzige Thema. Hunderte wütende Kommentare.'],
        ['Mia', 'Vielleicht, weil du ein paar davon geliked hast? Dann zeigt dir die App immer mehr davon.'],
        ['Ben', 'Hm. Ich habe tatsächlich ein Video kommentiert.'],
        ['Mia', 'Siehst du. Und in der Klasse hat die Mehrheit beim Abstimmen für die Regel gestimmt.'],
        ['Ben', 'Stimmt … Ich dachte wirklich, alle sind dagegen.'],
        ['Mia', 'Das ist die Blase. Hundert Kommentare in deinem Feed sind nicht „alle“.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Feed“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Liste von Beiträgen, die eine App dir zeigt', 'ein Futter für Tiere'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was glaubt Ben?', l: 'dass alle die neue Handyregel unfair finden' }, { f: 'Warum sieht Ben so viele Beiträge zu dem Thema?', zeilen: 2, l: 'Weil er ein Video dazu kommentiert (und vielleicht welche geliked) hat; die App zeigt ihm mehr davon.' }, { f: 'Wie hat die Klasse wirklich abgestimmt?', l: 'Die Mehrheit war für die Regel.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wart ihr schon einmal in einer Blase – bei einem Thema, einem Spiel, einer Meinung?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich dachte einmal, alle …', 'Dann habe ich gemerkt …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Algorithmus und Blase', punkte: ['**Algorithmus**: wählt aus, was wir sehen', 'zeigt **mehr vom Gleichen**', '**Filterblase**: andere Meinungen verschwinden', '**Wut** bringt Klicks → **Polarisierung**'] },
         { titel: 'Raus aus der Blase', punkte: ['**andere Quellen** lesen', 'Menschen folgen, die **anders denken**', 'mit **echten Menschen** reden', 'fragen: **Warum zeigt mir die App das?**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Blasen-Challenge: Wählt drei Karten und probiert sie eine Woche lang aus. Notiert, was ihr Neues entdeckt habt.', stufe: 2, neueSeite: true, titel: 'Raus aus der Blase', icon: 'bubble', farbe: IDEE, spalten: 3,
        karten: [
          { text: 'Lies eine Zeitung oder hör Nachrichten im Radio.', linien: 2 }, { text: 'Folge einem Kanal zu einem Thema, das du nicht kennst.', linien: 2 }, { text: 'Frag eine ältere Person, was sie über ein Thema denkt.', linien: 2 },
          { text: 'Lies zu einem Streitthema einen Text von der „anderen Seite“.', linien: 2 }, { text: 'Lösche den Verlauf deiner Video-App und schau, was passiert.', linien: 2 }, { text: 'Rede mit jemandem aus einer anderen Klasse über Nachrichten.', linien: 2 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Apps sollten zeigen müssen, warum sie mir einen Beitrag zeigen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem jüngeren Kind, was eine Filterblase ist. Benutze ein Beispiel aus dem Alltag.', stufe: 2,
        anfaenge: ['Stell dir vor, …', 'Genau so macht es die App: …', 'Darum …', 'Mein Tipp: …'], zeilen: 7,
        beispiel: 'Stell dir vor, du isst einmal Spaghetti und bekommst ab dann jeden Tag nur noch Spaghetti, weil die Köchin denkt, du magst nichts anderes. Genau so macht es die App: Sie zeigt dir nur noch, was du schon angeschaut hast. Darum glaubst du irgendwann, es gibt nur Spaghetti auf der Welt. Mein Tipp: Probier auch mal etwas anderes aus!' },
    ],
    check: ['Ich erkläre, was ein Algorithmus macht.', 'Ich erkläre, was eine Filterblase ist.', 'Ich kenne Wege aus der Blase.'],
  },
  // ================================================================ 5
  {
    thema: 'Information und Propaganda', titel: 'Propaganda erkennen', untertitel: 'Feindbilder, einfache Parolen, nur eine Seite: Du lernst, wie Propaganda funktioniert – früher und heute – und wie du Information von Manipulation unterscheidest.',
    ziel: { de: 'Ich unterscheide Information und Propaganda und erkenne typische Propaganda-Tricks.', fr: 'Je distingue information et propagande et je reconnais les techniques typiques de propagande.' },
    bild: ['lehrerin:froh:zeigen', 'yusuf:verwirrt:stehen'],
    start: {
      was: 'Information oder nicht?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welcher Satz ist eine sachliche Information? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['„Die Gemeinde baut bis 2027 einen neuen Radweg.“', '„Nur Verräter sind gegen unseren großartigen Führer!“'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die Macht der Parolen',
      absaetze: [
        '**Information** will, dass wir etwas **verstehen**: Sie nennt Fakten und Quellen, zeigt mehrere Seiten und lässt uns selbst urteilen. **Propaganda** will, dass wir etwas **glauben** und **tun**: Sie zeigt nur eine Seite und spielt mit unseren Gefühlen.',
        '### Typische Tricks',
        '**Feindbilder**: Eine Gruppe wird als böse und gefährlich dargestellt. **Einfache Parolen**: kurze Sätze, die man sich merkt, statt Erklärungen. **Wiederholung**: Dieselbe Botschaft kommt immer wieder, bis man sie glaubt. **Gefühle statt Fakten**: Angst, Wut oder Stolz werden geweckt. **Wir gegen die**: Die eigene Gruppe ist gut, die anderen sind schuld.',
        '### Früher',
        'Die Nationalsozialisten hatten ein eigenes **Ministerium für Propaganda**. Sie verkauften billige Radios, damit möglichst viele ihre Reden hörten. Zeitungen durften nur schreiben, was erlaubt war.',
        '### Heute',
        'Heute verbreitet sich Propaganda oft im Internet: mit **gefälschten Konten** (Bots), die tausendfach dieselbe Botschaft teilen, mit gefälschten Videos oder mit Gerüchten, die Angst machen. Freie Medien, die verschiedene Meinungen zeigen dürfen, sind darum ein wichtiger Schutz der **Demokratie**.',
      ],
      woerter: [['die Propaganda', 'la propagande'], ['urteilen', 'juger'], ['das Feindbild', 'l’image de l’ennemi'], ['die Parole', 'le slogan'], ['die Wiederholung', 'la répétition'], ['die Botschaft', 'le message'], ['das Ministerium', 'le ministère'], ['gefälscht', 'falsifié, faux']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Information oder Propaganda? Kreuze an.', stufe: 2, kopf: ['', 'Information', 'Propaganda'], breiten: [60, 20, 20], zeilen: [['nennt Quellen', '[x]', ''], ['zeigt nur eine Seite', '', '[x]'], ['weckt Angst und Wut', '', '[x]'], ['lässt mich selbst urteilen', '[x]', ''], ['wiederholt immer dieselbe Parole', '', '[x]']] },
        { art: 'zuordnen', auftrag: 'Welcher Trick ist das? Verbinde.', stufe: 2, links: ['„Die da drüben sind an allem schuld!“', '„Ein Land, ein Wille!“', '„Wenn wir nichts tun, verlieren wir alles!“'], rechts: ['Feindbild', 'einfache Parole', 'Gefühle statt Fakten (Angst)'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 5P2 · Medienstunde', titel: 'Das Video mit den vielen Klicks',
      situation: 'Yusuf hat ein Video gesehen, das ihn wütend gemacht hat. Die Lehrerin schaut es mit der Klasse an.',
      bild: ['yusuf:wuetend:handy', 'lehrerin:ruhig:erklaeren'], sprecher: { Yusuf: 'm3', Lehrerin: 'w1' },
      text: [
        ['Yusuf', 'In dem Video heißt es, dass eine Gruppe von Ausländern allen hier die Arbeit wegnimmt. Es hat zwei Millionen Klicks!'],
        ['Lehrerin', 'Schauen wir genauer hin. Wer hat das Video gemacht?'],
        ['Yusuf', 'Ein Kanal, der „Die Wahrheit“ heißt. Mehr steht da nicht.'],
        ['Lehrerin', 'Gibt es Zahlen? Quellen?'],
        ['Yusuf', 'Nein. Nur dramatische Musik und Bilder von leeren Fabriken.'],
        ['Lehrerin', 'Und wie fühlst du dich, wenn du es schaust?'],
        ['Yusuf', 'Wütend. Und ein bisschen ängstlich.'],
        ['Lehrerin', 'Genau das soll das Video erreichen. Feindbild, Angst, keine Quellen, Musik statt Fakten. Das sind typische Zeichen von Propaganda. Und zwei Millionen Klicks heißen nicht, dass etwas stimmt.'],
        ['Yusuf', 'Krass. Ich hätte es fast weitergeschickt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „dramatisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sehr aufregend und gefühlvoll gemacht', 'langweilig'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Welche Zeichen von Propaganda findet die Klasse? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['ein Feindbild', 'keine Quellen', 'dramatische Musik', 'mehrere Meinungen', 'Angst'], r: [0, 1, 2, 4] }] },
        { art: 'fragen', auftrag: 'Was sagt die Lehrerin über die zwei Millionen Klicks?', stufe: 2, fragen: [{ f: '', l: 'Viele Klicks heißen nicht, dass etwas stimmt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was tut ihr, bevor ihr ein Video weiterschickt, das euch wütend macht?', stufe: 2, karten: [
        { titel: 'Checkliste', text: ['Wer hat es gemacht?', 'Gibt es Quellen?', 'Wie fühle ich mich?', 'Was sagen andere Quellen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Information', punkte: ['will, dass ich **verstehe**', 'nennt **Fakten** und **Quellen**', 'zeigt **mehrere Seiten**'] },
         { titel: 'Propaganda', punkte: ['will, dass ich **glaube** und **tue**', 'Tricks: **Feindbild**, **Parolen**, **Wiederholung**, **Gefühle**, **wir gegen die**', 'heute oft mit **Bots** und Fälschungen', 'Schutz: **freie Medien**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Propaganda entlarven: Auf jeder Karte steht eine Propaganda-Botschaft. Welcher Trick steckt dahinter? Schreibt darunter eine faire, sachliche Version.', stufe: 3, neueSeite: true, titel: 'Entlarvt!', icon: 'eye-search', farbe: DILEMMA, spalten: 2,
        karten: [
          { text: '„Die Jugend von heute ist faul und zerstört unser Land!“', linien: 2, frage: 'Fair: …' },
          { text: '„Nur wir sagen euch die Wahrheit. Alle Zeitungen lügen!“', linien: 2, frage: 'Fair: …' },
          { text: '„Wer nicht für uns ist, ist gegen uns!“', linien: 2, frage: 'Fair: …' },
          { text: '„Die Radfahrer sind an jedem Stau schuld!“', linien: 2, frage: 'Fair: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Anleitung für jüngere Schüler: „So erkennst du Propaganda“.', stufe: 2,
        anfaenge: ['So erkennst du Propaganda:', 'Erstens: …', 'Zweitens: …', 'Drittens: …', 'Wenn du unsicher bist, …'], zeilen: 8,
        beispiel: 'So erkennst du Propaganda: Erstens: Achte darauf, ob eine Gruppe als böse dargestellt wird. Zweitens: Schau, ob es Quellen und Zahlen gibt oder nur Musik und Gefühle. Drittens: Frag dich, wie du dich fühlst – Angst und Wut sind ein Warnzeichen. Wenn du unsicher bist, schick nichts weiter und frag eine Lehrerin oder schau, was andere Quellen sagen.' },
    ],
    check: ['Ich unterscheide Information und Propaganda.', 'Ich erkenne Propaganda-Tricks.', 'Ich prüfe, bevor ich etwas weiterschicke.'],
  },
  // ================================================================ 6
  {
    thema: 'Sinn erfahren · Sinn deuten', titel: 'Was gibt meinem Leben Sinn?', untertitel: 'Wofür lohnt es sich zu leben? Du lernst Viktor Frankl kennen, entdeckst Sinnquellen und erfährst, welche Antworten Religionen und Menschen ohne Religion geben.',
    ziel: { de: 'Ich nenne Quellen von Sinn und beschreibe verschiedene Antworten auf die Sinnfrage.', fr: 'Je cite des sources de sens et je décris différentes réponses à la question du sens.' },
    bild: ['lina:ruhig:sitzen', 'opa:froh:stehen'],
    start: {
      was: 'Wofür?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Wofür stehen Menschen morgens auf? Sammle.', stufe: 1, mitte: 'Wofür?', aeste: ['für Menschen, die sie lieben', { l: 'für eine Aufgabe' }, { l: 'für ein Ziel' }, { l: 'für Freude' }, { l: 'für ihren Glauben' }, { l: 'für Tiere' }] },
      ],
    },
    lesen: {
      was: 'Ein Text zum Nachdenken', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Text zum Nachdenken (vereinfacht)', titel: 'Ein Warum zum Leben',
      absaetze: [
        'Der Wiener Arzt **Viktor Frankl** wurde im Zweiten Weltkrieg als Jude in Konzentrationslager verschleppt. Er überlebte. Dabei beobachtete er: Menschen, die einen **Sinn** hatten – einen Menschen, auf den sie hofften, eine Aufgabe, die auf sie wartete –, hielten oft länger durch. Er zitierte gern einen Satz des Philosophen Nietzsche: **„Wer ein Warum zum Leben hat, erträgt fast jedes Wie.“**',
        '### Wo finden Menschen Sinn?',
        'Frankl meinte, Sinn kann man auf drei Wegen finden: indem man etwas **tut oder schafft** (eine Arbeit, ein Bild, einem Menschen helfen), indem man etwas **erlebt** (Liebe, Freundschaft, Natur, Musik) und indem man eine **Haltung** findet, wenn etwas Schweres passiert.',
        '### Antworten der Religionen',
        'Für Christen, Juden und Muslime hat jeder Mensch einen Sinn, weil Gott ihn gewollt hat und liebt. Im Buddhismus geht es darum, Leid zu überwinden und mitfühlend zu leben.',
        '### Ohne Religion',
        'Viele Menschen ohne Religion sagen: Das Leben hat keinen fertigen Sinn – wir **geben** ihm selbst einen, durch das, was wir tun und wen wir lieben.',
      ],
      woerter: [['der Sinn', 'le sens'], ['verschleppen', 'déporter'], ['durchhalten', 'tenir bon'], ['ertragen', 'supporter'], ['erleben', 'vivre (une expérience)'], ['die Haltung', 'l’attitude'], ['das Leid', 'la souffrance'], ['mitfühlend', 'compatissant']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Frankls drei Wege zum Sinn: Verbinde mit den Beispielen.', stufe: 2, links: ['etwas tun oder schaffen', 'etwas erleben', 'eine Haltung finden'], rechts: ['im Tierheim helfen, ein Lied schreiben', 'mit Freunden am Lagerfeuer sitzen', 'nach einem Unfall den Mut nicht verlieren'] },
        { art: 'fragen', auftrag: 'Was bedeutet der Satz „Wer ein Warum zum Leben hat, erträgt fast jedes Wie“?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Wer einen Grund zum Leben hat, kann auch schwere Situationen besser aushalten.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Auf der Bank im Park', titel: 'Was mir Kraft gibt',
      situation: 'Lina sitzt mit Herrn Weis, einem älteren Nachbarn, auf einer Bank. Er war früher Lokführer.',
      bild: ['lina:ruhig:sitzen', 'opa:froh:sitzen'], sprecher: { Lina: 'w3', 'Herr Weis': 'm2' },
      text: [
        ['Lina', 'Herr Weis, Sie sind jetzt seit zehn Jahren in Rente. Ist Ihnen nicht langweilig?'],
        ['Herr Weis', 'Am Anfang schon. Ich habe vierzig Jahre lang Züge gefahren. Plötzlich hat mich niemand mehr gebraucht. Das war die schwerste Zeit.'],
        ['Lina', 'Und was hat sich geändert?'],
        ['Herr Weis', 'Ich habe angefangen, im Reparatur-Café Fahrräder zu reparieren. Jeden Samstag. Wenn ein Kind mit seinem kaputten Rad kommt und mit einem heilen Rad nach Hause fährt – das ist ein gutes Gefühl.'],
        ['Lina', 'Ist das Ihr Sinn?'],
        ['Herr Weis', 'Einer davon. Dann meine Enkelin. Und mein Garten. Und abends sitze ich hier und schaue in den Himmel. Ich glaube nicht an Gott, aber in solchen Momenten spüre ich, dass ich ein Teil von etwas Großem bin.'],
        ['Lina', 'Ich weiß noch nicht, was mein Sinn ist.'],
        ['Herr Weis', 'Den muss man mit vierzehn auch nicht wissen. Probier viel aus. Der Sinn findet dich oft, wenn du etwas für andere tust.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Reparatur-Café“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Treffen, bei dem Freiwillige kaputte Dinge reparieren', 'ein Café, das gerade umgebaut wird'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum war die erste Zeit in Rente schwer für Herrn Weis?', l: 'Niemand hat ihn mehr gebraucht.' }, { f: 'Was macht er jeden Samstag?', l: 'Er repariert im Reparatur-Café Fahrräder.' }, { f: 'Nenne drei Dinge, die seinem Leben Sinn geben.', zeilen: 2, l: 'das Reparieren für andere, seine Enkelin, sein Garten, in den Himmel schauen' }] },
        { art: 'fragen', auftrag: 'Welche von Frankls drei Wegen findest du bei Herrn Weis?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'etwas tun (Fahrräder reparieren), etwas erleben (Enkelin, Garten, Himmel), Haltung (nach der schweren Zeit neu anfangen)' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: '„Der Sinn findet dich oft, wenn du etwas für andere tust.“ Was meint ihr dazu?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, das stimmt, weil …', 'Für mich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Sinn', punkte: ['Frankl: **„Wer ein Warum zum Leben hat, erträgt fast jedes Wie.“**', 'drei Wege: **tun**, **erleben**, **Haltung finden**'] },
         { titel: 'Antworten', punkte: ['**Judentum, Christentum, Islam**: Gott will und liebt jeden Menschen', '**Buddhismus**: Leid überwinden, mitfühlend leben', '**ohne Religion**: Wir **geben** dem Leben selbst Sinn'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Sinn-Quellen: Schneide die Karten aus. Lege die fünf, die dir am wichtigsten sind, in eine Reihenfolge. Du musst deine Auswahl niemandem zeigen.', stufe: 2, neueSeite: true, titel: 'Was mir Sinn gibt', icon: 'sun', farbe: SINN, spalten: 4,
        karten: [
          { text: '**Menschen, die ich liebe**' }, { text: '**Freundschaft**' }, { text: '**Glaube**' }, { text: '**Natur**' },
          { text: '**Musik oder Kunst**' }, { text: '**Sport**' }, { text: '**anderen helfen**' }, { text: '**Neues lernen**' },
          { text: '**eine Arbeit, die ich gut mache**' }, { text: '**Tiere**' }, { text: '**ein großes Ziel**' }, { text: '**Lachen**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was gibt deinem Leben (oder dem Leben einer ausgedachten Person) Sinn? Schreibe mit Beispielen.', stufe: 3,
        anfaenge: ['Sinn gibt mir …', 'Zum Beispiel …', 'Wenn es mir schlecht geht, hilft mir …', 'Ich möchte noch herausfinden, …'], zeilen: 8,
        beispiel: 'Sinn geben mir meine Freunde und mein kleiner Hund. Zum Beispiel freut er sich jeden Tag so sehr, wenn ich nach Hause komme, dass ich weiß: Ich bin wichtig. Wenn es mir schlecht geht, hilft mir Musik. Ich möchte noch herausfinden, welcher Beruf mir so viel Freude macht wie Herrn Weis das Reparieren.' },
    ],
    check: ['Ich erzähle von Viktor Frankl.', 'Ich nenne drei Wege zum Sinn.', 'Ich beschreibe Antworten von Religionen und Menschen ohne Religion.'],
  },
  // ================================================================ 7
  {
    thema: 'Glück', titel: 'Was macht glücklich?', untertitel: 'Ein Lottogewinn? Viele Likes? Die Glücksforschung kommt zu überraschenden Ergebnissen. Du lernst, was Menschen wirklich glücklich macht, und startest ein Glücks-Tagebuch.',
    ziel: { de: 'Ich nenne, was Menschen nach der Forschung glücklich macht, und probiere eine Glücks-Übung aus.', fr: 'Je cite ce qui, selon la recherche, rend les gens heureux et j’essaie un exercice du bonheur.' },
    bild: ['tom:froh:stehen', 'jana:froh:stehen'],
    start: {
      was: 'Glück haben – glücklich sein',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was ist „Glück haben“ (Zufall), was ist „glücklich sein“ (ein Gefühl)? Kreuze an.', stufe: 1, kopf: ['', 'Glück haben', 'glücklich sein'], breiten: [60, 20, 20], zeilen: [['Ich finde 10 Euro auf der Straße.', '[x]', ''], ['Ich lache mit meinen Freunden am Lagerfeuer.', '', '[x]'], ['Der Bus hat Verspätung, und ich erwische ihn noch.', '[x]', ''], ['Ich bin stolz, weil ich etwas geschafft habe.', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die Glücksforschung',
      absaetze: [
        'Was macht Menschen glücklich? Forscherinnen und Forscher auf der ganzen Welt untersuchen diese Frage.',
        '### Beziehungen',
        'Eine der längsten Studien der Welt läuft seit **1938** an der Harvard-Universität in den USA. Sie begleitet Menschen ihr ganzes Leben lang. Das wichtigste Ergebnis: **Gute Beziehungen** machen Menschen glücklicher und gesünder – mehr als Ruhm oder Reichtum.',
        '### Geld',
        'Geld macht glücklicher, wenn es für das Nötige reicht. Wer keine Sorgen um Essen und Wohnung haben muss, ist zufriedener. Aber darüber hinaus wird der Effekt **kleiner**: Ein neues Handy freut nur kurz.',
        '### Flow',
        'Viele Menschen sind glücklich, wenn sie ganz in einer Sache aufgehen: beim Musikmachen, Sport, Basteln. Man vergisst die Zeit. Das nennt man **Flow**.',
        '### Kleine Übungen',
        'Glück kann man auch üben: jeden Abend **drei gute Dinge** aufschreiben, die passiert sind. **Danke** sagen. Anderen eine **Freude machen** – das macht oft glücklicher als selbst etwas zu bekommen.',
      ],
      woerter: [['das Glück', 'le bonheur, la chance'], ['die Forschung', 'la recherche'], ['die Beziehung', 'la relation'], ['der Ruhm', 'la gloire'], ['zufrieden', 'satisfait'], ['aufgehen in', 's’absorber dans'], ['die Übung', 'l’exercice'], ['eine Freude machen', 'faire plaisir']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Harvard-Studie läuft seit 1938.', true], ['Ruhm macht laut der Studie am glücklichsten.', false], ['Geld macht glücklicher, wenn es für das Nötige reicht.', true], ['Ein neues Handy macht für immer glücklich.', false], ['Flow heißt: ganz in einer Sache aufgehen.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach der Schule', titel: 'Drei gute Dinge',
      situation: 'Jana hat eine Woche lang jeden Abend drei gute Dinge aufgeschrieben. Tom ist skeptisch.',
      bild: ['jana:froh:blatt', 'tom:verwirrt:stehen'], sprecher: { Tom: 'm3', Jana: 'w2' },
      text: [
        ['Tom', 'Und? Hat das Glücks-Tagebuch was gebracht? Klingt ein bisschen kitschig.'],
        ['Jana', 'Dachte ich auch. Am ersten Abend ist mir fast nichts eingefallen. Ich habe geschrieben: „Es gab Pizza in der Kantine.“'],
        ['Tom', 'Haha, das zählt!'],
        ['Jana', 'Aber dann habe ich angefangen, tagsüber schon darauf zu achten. Die Busfahrerin hat mich angelächelt. Ich habe in Mathe etwas verstanden. Meine Katze hat sich auf meinen Bauch gelegt.'],
        ['Tom', 'Und das macht glücklich?'],
        ['Jana', 'Nicht sofort. Aber ich sehe mehr gute Sachen. Vorher habe ich abends immer nur an das gedacht, was schiefgelaufen ist.'],
        ['Tom', 'Okay. Vielleicht probiere ich es auch. Mein erstes gutes Ding heute: Du hast mir dein Ladekabel geliehen.'],
        ['Jana', 'Siehst du, es funktioniert schon!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „kitschig“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['übertrieben süß und gefühlvoll', 'sehr gefährlich'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hat Jana am ersten Abend geschrieben?', l: '„Es gab Pizza in der Kantine.“' }, { f: 'Nenne zwei gute Dinge, die Jana später bemerkt hat.', zeilen: 2, l: 'die Busfahrerin hat gelächelt; sie hat in Mathe etwas verstanden; die Katze hat sich auf ihren Bauch gelegt' }, { f: 'Was hat sich für Jana verändert?', zeilen: 2, l: 'Sie sieht mehr gute Sachen und denkt abends nicht mehr nur an das, was schiefgelaufen ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was war heute ein gutes Ding für euch – auch ein ganz kleines?', stufe: 1, karten: [
        { titel: 'Satzanfänge', text: ['Heute war gut, dass …', 'Ich habe mich gefreut, als …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Was glücklich macht', punkte: ['**gute Beziehungen** (Harvard-Studie seit 1938)', '**Geld**, wenn es für das Nötige reicht', '**Flow**: ganz in einer Sache aufgehen', 'anderen eine **Freude machen**'] },
         { titel: 'Glück üben', punkte: ['jeden Abend **drei gute Dinge**', '**Danke** sagen', '**Glück haben** (Zufall) ≠ **glücklich sein** (Gefühl)'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Glücks-Tagebuch für sechs Tage: Schneide die Karten aus. Schreibe jeden Abend drei gute Dinge auf.', stufe: 2, neueSeite: true, titel: 'Drei gute Dinge', icon: 'mood-smile', farbe: SINN, spalten: 2,
        karten: [
          { text: '**Tag 1**', linien: 3 }, { text: '**Tag 2**', linien: 3 }, { text: '**Tag 3**', linien: 3 },
          { text: '**Tag 4**', linien: 3 }, { text: '**Tag 5**', linien: 3 }, { text: '**Tag 6**', linien: 3 },
        ] },
      { art: 'fragen', auftrag: 'Nach sechs Tagen: Schau auf deine Karten.', stufe: 2, fragen: [{ f: 'Was hast du bemerkt?', zeilen: 2, l: 'Individuelle Antwort.' }, { f: 'Wem hast du in dieser Woche eine Freude gemacht?', zeilen: 2, l: 'Individuelle Antwort.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe dein persönliches „Glücks-Rezept“ – wie ein Kochrezept.', stufe: 2,
        anfaenge: ['Zutaten: …', 'Zubereitung: Man nehme …', 'Dazu kommt …', 'Nicht vergessen: …'], zeilen: 7,
        beispiel: 'Zutaten: zwei gute Freunde, eine Portion Musik, ein Fußball, viel frische Luft. Zubereitung: Man nehme die Freunde und gehe nach der Schule zusammen auf den Bolzplatz. Dazu kommt ein Lied, das alle mitsingen können. Nicht vergessen: dem Busfahrer Danke sagen und abends drei gute Dinge aufschreiben.' },
    ],
    check: ['Ich unterscheide „Glück haben“ und „glücklich sein“.', 'Ich nenne, was nach der Forschung glücklich macht.', 'Ich habe eine Glücks-Übung ausprobiert.'],
  },
  // ================================================================ 8
  {
    thema: 'Sinn geben · Abschluss', titel: 'Meine Spur', untertitel: 'Das letzte Kapitel: Du schaust zurück auf das, was du gelernt hast, überlegst, welche Spur du hinterlassen möchtest, und schreibst einen Brief an dein Ich in fünf Jahren.',
    ziel: { de: 'Ich denke darüber nach, was mir wichtig ist, und formuliere Ziele für meine Zukunft.', fr: 'Je réfléchis à ce qui est important pour moi et je formule des objectifs pour mon avenir.' },
    bild: ['mia:froh:stehen-zeigen', 'yusuf:froh:stehen'],
    start: {
      was: 'Rückblick',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was aus Vie et société ist dir besonders in Erinnerung geblieben? Ein Thema, eine Geschichte, ein Satz?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort.' }] },
      ],
    },
    lesen: {
      was: 'Ein Text zum Nachdenken', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Text zum Nachdenken', titel: 'Spuren im Sand',
      absaetze: [
        'Wer am Strand läuft, hinterlässt Spuren im Sand. Manche verwischt die nächste Welle. Andere bleiben eine Weile. Auch im Leben hinterlassen wir **Spuren**: in den Menschen, denen wir begegnen.',
        '### Kleine Spuren zählen',
        'Man muss nicht berühmt werden, um eine Spur zu hinterlassen. Eine Lehrerin, die an dich geglaubt hat. Ein Freund, der in einer schweren Zeit da war. Ein Fremder, der dir den Weg gezeigt hat. Oft erinnern wir uns ein Leben lang an kleine Gesten.',
        '### Werte als Kompass',
        'In diesem Fach hast du über viele **Werte** nachgedacht: Respekt, Gerechtigkeit, Mut, Verantwortung, Freundschaft, Frieden. Werte sind wie ein **Kompass**. Sie sagen dir nicht genau, wohin du gehen sollst. Aber sie helfen dir, die Richtung zu halten, wenn es schwierig wird.',
        '### Ein neuer Abschnitt',
        'Bald beginnt für dich ein neuer Abschnitt: eine Lehre, eine neue Schule, neue Menschen. Das kann aufregend sein und auch Angst machen. Du nimmst etwas mit: alles, was du gelernt hast, deine Stärken – und die Frage, welche **Spur** du hinterlassen möchtest.',
      ],
      woerter: [['die Spur', 'la trace'], ['hinterlassen', 'laisser (derrière soi)'], ['verwischen', 'effacer'], ['berühmt', 'célèbre'], ['die Geste', 'le geste'], ['der Wert', 'la valeur'], ['der Kompass', 'la boussole'], ['der Abschnitt', 'l’étape']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Warum muss man nicht berühmt sein, um eine Spur zu hinterlassen?', zeilen: 2, l: 'Weil schon kleine Gesten – an jemanden glauben, da sein, helfen – lange in Erinnerung bleiben.' }, { f: 'Warum sind Werte wie ein Kompass?', zeilen: 2, l: 'Sie zeigen nicht den genauen Weg, helfen aber, die Richtung zu halten, wenn es schwierig wird.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Letzter Schultag vor den Ferien', titel: 'Was nehmen wir mit?',
      situation: 'Mia und Yusuf sitzen am letzten Tag auf der Treppe vor der Schule. Im Herbst beginnt für beide etwas Neues.',
      bild: ['mia:froh:sitzen', 'yusuf:froh:sitzen'], sprecher: { Mia: 'w3', Yusuf: 'm3' },
      text: [
        ['Mia', 'Komisch. Im Herbst bin ich in einer Lehre als Floristin, und du bist im neuen Lyzeum.'],
        ['Yusuf', 'Ich bin ehrlich gesagt nervös. Ich kenne da niemanden.'],
        ['Mia', 'Das ging uns hier am Anfang auch so. Weißt du noch, unser erster Tag? Du hast dich nicht getraut, in die Kantine zu gehen.'],
        ['Yusuf', 'Ja! Und du hast gesagt: „Komm, wir setzen uns zu den Lauten, die beißen nicht.“'],
        ['Mia', 'Haha. Was nimmst du mit aus den drei Jahren?'],
        ['Yusuf', 'Dass ich mehr kann, als ich dachte. Und dass man Hilfe holen darf. Und du?'],
        ['Mia', 'Dass ich meine Meinung sagen kann, auch wenn alle anders denken. Früher hätte ich mich das nie getraut.'],
        ['Yusuf', 'Und welche Spur willst du hinterlassen?'],
        ['Mia', 'Ich will die Floristin sein, bei der jeder Kunde lächelnd rausgeht. Und du?'],
        ['Yusuf', 'Ich will der sein, der sich in der neuen Klasse zu dem setzt, der allein ist. So wie du damals bei mir.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Floristin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie bindet Blumensträuße und verkauft Blumen.', 'Sie repariert Fahrräder.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Mia', 'Yusuf'], breiten: [28, 36, 36], zeilen: [['im Herbst', '[Lehre als Floristin]', '[neues Lyzeum]'], ['nimmt mit', '[ihre Meinung sagen, auch wenn alle anders denken]', '[mehr können als gedacht; Hilfe holen dürfen]'], ['ihre / seine Spur', '[jeder Kunde geht lächelnd raus]', '[sich zu dem setzen, der allein ist]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was nehmt ihr mit aus eurer Zeit hier? Sagt jeder einen Satz.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich nehme mit, dass …', 'Ich habe gelernt, …', 'Danke an …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Meine Spur', punkte: ['jeder hinterlässt **Spuren** in anderen Menschen', '**kleine Gesten** zählen', 'man muss nicht **berühmt** sein'] },
         { titel: 'Werte als Kompass', punkte: ['**Respekt**, **Gerechtigkeit**, **Mut**', '**Verantwortung**, **Freundschaft**, **Frieden**', 'Werte helfen, **die Richtung zu halten**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Spuren-Karten: Schneide die Karten aus und fülle sie aus. Eine behältst du, die anderen verschenkst du an Menschen, die eine Spur bei dir hinterlassen haben.', stufe: 2, neueSeite: true, titel: 'Meine Spur', icon: 'walk', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Ein Wert, der mir wichtig ist:**', linien: 2, frage: 'Warum: …' },
          { text: '**Eine Spur, die du bei mir hinterlassen hast:**', linien: 2, frage: 'für: …' },
          { text: '**Danke für …**', linien: 2, frage: 'für: …' },
          { text: '**Das wünsche ich dir für deinen Weg:**', linien: 2, frage: 'für: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an dich selbst in fünf Jahren. Steck ihn in einen Umschlag und öffne ihn erst dann. Du musst ihn niemandem zeigen.', stufe: 3,
        anfaenge: ['Liebes Ich in fünf Jahren,', 'gerade bin ich … Jahre alt und …', 'Mir ist wichtig, dass …', 'Ich hoffe, dass du …', 'Vergiss nicht: …'], zeilen: 12,
        beispiel: 'Liebes Ich in fünf Jahren, gerade bin ich fünfzehn Jahre alt und habe Angst vor der Lehre, aber ich freue mich auch. Mir ist wichtig, dass ich ehrlich bleibe und meine Freunde nicht vergesse. Ich hoffe, dass du deinen Abschluss geschafft hast und eine Arbeit machst, auf die du stolz bist. Ich hoffe auch, dass du noch Fußball spielst. Vergiss nicht: Du kannst mehr, als du denkst. Und wenn es schwer wird, hol dir Hilfe.' },
    ],
    check: ['Ich denke darüber nach, welche Spur ich hinterlassen möchte.', 'Ich nenne Werte, die mir wichtig sind.', 'Ich habe einen Brief an mein Zukunfts-Ich geschrieben.'],
  },
]
