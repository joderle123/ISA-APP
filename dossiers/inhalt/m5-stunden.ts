// REAL TALK #05 · GRENZEN – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Niemand spielt etwas vor: Wo ein Ton oder eine Haltung gezeigt werden muss, macht das die Leitung – oder alle gleichzeitig
// mit dem Gesicht zur Wand. Stunde 1 ist eine Wette mit Nachrichten, Stunde 2 eine Satz-Werkstatt, Stunde 3 ein Lege-Spiel
// mit drei Feldern, Stunde 4 eine Leiter von „unklar“ bis „klar“.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stimmtDas, stunde, strich, text } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [koerper, streit, bis, stopp] = d.tracks

  /* ---------- Stunde 1 · Dein Körper redet mit ---------- */
  const NACHRICHTEN = ['ok.', 'ja ja', 'mach doch', 'schon gut', 'haha', 'passt schon', 'wie du meinst', 'egal', 'aha', 'na toll', 'klar', 'bis dann']
  const s1 = stunde('Wem glaubst du – den Worten oder dem Körper?', ['die drei Kanäle nennen: Worte, Stimme, Körper', 'erklären, warum Chat-Nachrichten oft falsch ankommen', 'nachfragen, statt zu raten'],
    seite(
      ankommen('zwei Buchstaben', kreuz('Du schreibst: „Kommst du Samstag?“ Die Antwort: **ok.** Mit Punkt. Was heißt das?', 'passt', 'ist sauer', 'hat keine Zeit', 'keine Ahnung'), kreuz('Wem glaubst du eher?', 'den Worten', 'dem Gesicht und der Stimme')),
      fall(koerper, 'Tom sagt „Ja“', [
        kreis('Was hat Toms Körper gesagt? Kreise ein.', 'Kapuze auf', 'Blick am Boden', 'Kiefer fest', 'er lächelt', 'er redet viel'),
        kreuzU('Alle sagen: „Aus dem Nichts.“ Stimmt das?', 'Nein. Tom hat den ganzen Tag gesendet – nur nicht mit Worten.', 'Ja.'),
      ]),
      modell(koerper, 'drei Kanäle', ['message-circle', 'volume', 'device-mobile']),
    ),
    seite(
      clip(koerper, 'Ich sehe, was du fühlst', [kreuzU('Kann man Gefühle am Körper ablesen?', 'ja, meistens', 'nur manchmal', 'nein')], ['Ein Signal aus dem Clip:', 'Es bedeutet:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hätte der Erzieher bei Tom tun können?', 'noch einmal nachfragen – allein, in Ruhe', 'ihn vor allen ansprechen', 'nichts')]),
      st('Zu zweit: Wem glaubst du?', '8 Min.', 'zu zweit', 'users', 'Gute Sätze: „Du wirkst müde. Magst du reden?“ – ohne Druck, ohne Publikum.',
        fragen(koerper.moves[0].kontext ?? null, ...koerper.moves[0].fragen)),
      stimmtDas(koerper),
    ),
    seite(
      runde('ein Kanal, zwei Kanäle, drei Kanäle', '25 Min.', 'alle · am Tisch', 'antenna-bars-5', {
        ziel: 'Erleben: Je mehr Kanäle, desto klarer die Nachricht. Im Chat fehlen zwei.',
        material: 'die 12 Nachrichten-Karten und 4 Bedeutungs-Karten von der nächsten Seite (ausschneiden), eine Münze pro Person, ein Würfel',
        schritte: [
          'Die vier Bedeutungen liegen auf dem Tisch. Eine Nachricht wird aufgedeckt.',
          'Alle legen **gleichzeitig** ihre Münze auf die Bedeutung, die sie lesen. Liegen alle Münzen auf derselben Bedeutung – nicht auf „kann man nicht wissen“: 1 Punkt für die Gruppe.',
          'Zählt am Ende jeder Runde eure Punkte. In welcher Runde wart ihr euch am häufigsten einig?',
        ],
        runden: [
          { t: 'Runde 1 · nur Text', x: 'Die Karte liegt stumm auf dem Tisch. Vier Nachrichten.' },
          { t: 'Runde 2 · mit Stimme', x: 'Die Leitung würfelt verdeckt eine Bedeutung und liest die Nachricht so vor – mit dem Rücken zu euch.' },
          { t: 'Runde 3 · mit Körper', x: 'Die Leitung dreht sich um: Stimme, Gesicht und Haltung. Vier Nachrichten.' },
        ],
        regeln: ['Nur die Leitung spricht und zeigt. Ihr lest und legt.'],
        zu3: 'Genau so. Bei drei Leuten zählt: mindestens zwei Münzen auf derselben Karte.',
        wertung: { kopf: ['Punkte der Gruppe', 'nur Text', 'mit Stimme', 'mit Körper'], zeilen: ['von 4'] },
        auswertung: ['In welcher Runde wart ihr euch am häufigsten einig?', 'Welche Nachricht schreibt ihr selbst oft – und wie kommt sie wohl an?'],
      }, { leitung: 'Sie sind die einzige Person, die etwas zeigt. Würfel: 1–2 freundlich, 3–4 genervt, 5–6 traurig.' }),
    ),
    seite(
      material('12 Nachrichten und 4 Bedeutungen', 6,
        karten(4, 18, 'Die Bedeutungen: ausschneiden und auf den Tisch legen.', ['freundlich', 'genervt', 'traurig', 'kann man nicht wissen'].map((t) => ({ t })), true),
        karten(4, 18, 'Die Nachrichten: ausschneiden, mischen, verdeckt stapeln.', NACHRICHTEN.map((t) => ({ t: `„${t}“` })))),
      st('Zu zweit: Rücken an Rücken', '10 Min.', 'zu zweit', 'pencil', 'Papier und Stifte austeilen. Zu dritt: eine Person beschreibt, zwei zeichnen, dann wechseln. Nach Durchgang 2 die Bilder nebeneinanderlegen.',
        text('Ihr sitzt Rücken an Rücken. A zeichnet ein einfaches Bild aus fünf Formen (Kreis, Dreieck, Viereck, Linie, Stern) und beschreibt es. B zeichnet mit. **Durchgang 1:** B darf nichts fragen. **Durchgang 2:** neues Bild, Rollen tauschen – jetzt sind Fragen erlaubt.'),
        fragen(null, kreuz('Wann war das Bild genauer?', 'ohne Fragen', 'mit Fragen'))),
      schluss(koerper, 'noch einmal: ok.', [kreuzU('Du bekommst wieder ein „ok.“ und bist unsicher. Was machst du?', 'nachfragen: „Wie meinst du das?“', 'raten', 'beleidigt sein'), kreuz('Schau auf Station 1: Kannst du aus zwei Buchstaben sicher lesen, was gemeint ist?', 'ja', 'nein')], ['gemacht']),
    ),
  )

  /* ---------- Stunde 2 · Streiten ohne Krieg ---------- */
  const ANGRIFF = ['Du hörst nie zu!', 'Immer nimmst du meine Sachen!', 'Du bist so ein Egoist.', 'Typisch. Schon wieder zu spät.', 'Ich finde, du bist unfair.', 'Ich fühle mich, als wärst du ein Lügner.', 'Du nervst.', 'Wegen dir kriege ich Ärger.']
  const INFO = ['Ich bin sauer, weil mein Kabel weg ist. Frag vorher.', 'Ich will ausreden. Dann bist du dran.', 'Ich habe mich erschrocken, als du geschrien hast.', 'Ich brauche fünf Minuten Ruhe.', 'Ich warte seit zwanzig Minuten. Das ärgert mich.', 'Mir ist das peinlich. Sag es mir bitte allein.', 'Ich verstehe die Aufgabe nicht. Hilfst du mir?', 'Ich bin enttäuscht, weil du nicht gekommen bist.']
  const s2 = stunde('Wie sagst du, was dich stört – ohne dass es knallt?', ['einen Angriff von einer Info unterscheiden', 'einen Ich-Satz bauen: was los ist und was du willst', 'erklären, warum Zuhören nicht Zustimmen heißt'],
    seite(
      ankommen('du im Streit', kreuz('Was passiert bei dir im Streit eher?', 'ich werde laut', 'ich werde still', 'ich gehe'), strich('Wie gut kannst du sagen, was dich stört?', 'gar nicht', 'gut')),
      fall(streit, 'Yusuf und der Meister', [
        kreuzU('An welchem Satz ist es gekippt?', '„Schon wieder.“', '„Sie haben doch eh was gegen mich!“'),
        kreuzU('Was wollte Yusuf eigentlich sagen?', 'Der Bus ist ausgefallen. Es ist mir peinlich.', 'Der Meister ist unfair.'),
        kreuz('Yusufs Satz war …', 'ein Angriff', 'eine Info'),
      ]),
      modell(streit, 'Angriff oder Info?', ['target-arrow', 'info-circle', 'ear']),
    ),
    seite(
      clip(streit, 'Reden ohne Angriff', [kreuzU('Welcher Satz macht einen Streit schlimmer?', '„Du bist immer …“', '„Ich bin sauer, weil …“')], ['Die Schritte aus dem Clip:', 'Ein Beispiel:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was fehlte in Yusufs Satz?', 'was mit ihm los ist – und was er will', 'mehr Lautstärke')]),
      fuerDich('Finde den Angriff', '8 Min.', fragen(null, ...streit.moves[0].fragen)),
      stimmtDas(streit),
    ),
    seite(
      runde('die Satz-Werkstatt', '25 Min.', 'zwei Teams · am Tisch', 'tool', {
        ziel: 'Angriffe erkennen – und zu Sätzen umbauen, bei denen der andere weiter zuhört.',
        material: 'die 16 Satz-Karten von der nächsten Seite (ausschneiden), zwei Zettel „Angriff“ und „Info“, Papier, Stifte',
        schritte: [
          '**Teil 1 · sortieren:** Die 16 Karten liegen gemischt in der Mitte. Reihum eine Karte ziehen, vorlesen und zu „Angriff“ oder „Info“ legen. Richtig: 1 Punkt.',
          'Achtung, Falle: Manche Sätze fangen mit „Ich“ an und sind trotzdem ein Angriff.',
          '**Teil 2 · umbauen:** Jedes Team zieht drei Angriff-Karten und baut sie um. Der Bauplan: **Ich bin … , weil … . Ich will, dass … .**',
          'Das andere Team prüft: Steckt noch „immer“, „nie“ oder „du bist“ drin? Dann kein Punkt. Sonst: 2 Punkte.',
        ],
        regeln: ['Die Sätze werden geschrieben und vorgelesen – niemand muss einen Streit spielen.'],
        zu3: 'Ein Team sortiert gegen die Uhr. Teil 2 gemeinsam: Die Leitung prüft.',
        wertung: { kopf: ['Punkte', 'Teil 1 · sortieren', 'Teil 2 · umbauen', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Welcher Satz war am schwersten umzubauen?', 'Bei welchem Satz würdet ihr selbst weiter zuhören?'],
      }, { leitung: 'Fallen: „Ich finde, du bist unfair.“ und „Ich fühle mich, als wärst du ein Lügner.“ sind Angriffe.' }),
    ),
    seite(
      material('16 Sätze', 6, karten(4, 19, 'Ausschneiden und mischen.', [...ANGRIFF, ...INFO].sort((a, b) => a.length - b.length).map((t) => ({ t: `„${t}“` })))),
      st('Zu zweit: Yusufs zweiter Versuch', '8 Min.', 'zu zweit', 'refresh', 'Schreiben reicht. Wer mag, liest den Satz vor.',
        fragen('Gleicher Moment. Der Meister sagt: „Schon wieder.“ Baut Yusufs Antwort neu – in drei Teilen:', streit.moves[1].fragen[0], kreis('Was passiert jetzt eher? Kreise ein.', 'ein Gespräch', 'eine Ansage, aber fair', 'Rauswurf'))),
      schluss(streit, 'dein Satz', [kreuz('Schau auf Station 1. Wie gut kannst du **jetzt** sagen, was dich stört?', 'wie vorher', 'etwas besser', 'viel besser')], ['gesagt']),
    ),
  )

  /* ---------- Stunde 3 · Bis hierhin ---------- */
  const GRENZEN: [string, string][] = [
    ['Jemand legt dir den Arm um die Schulter.', 'K'], ['Jemand setzt sich im leeren Bus direkt neben dich.', 'K'], ['Jemand nimmt dein Ladekabel, ohne zu fragen.', 'K'], ['Jemand fasst in deine Haare.', 'K'], ['Jemand geht in dein Zimmer, wenn du nicht da bist.', 'K'], ['Jemand isst von deinem Teller.', 'K'],
    ['Jemand fragt vor allen, warum du gefehlt hast.', 'I'], ['Jemand lacht über das, was dir wichtig ist.', 'I'], ['Jemand erzählt dein Geheimnis weiter.', 'I'], ['Jemand gibt dir einen Spitznamen, den du nicht magst.', 'I'], ['Jemand fragt immer wieder nach deiner Familie.', 'I'], ['Jemand sagt: „Stell dich nicht so an.“', 'I'],
    ['Jemand postet ein Foto von dir.', 'D'], ['Jemand liest deine Chats mit.', 'D'], ['Jemand schreibt dir nachts zwanzig Nachrichten.', 'D'], ['Jemand fügt dich in eine Gruppe ein, ohne zu fragen.', 'D'], ['Jemand will dein Passwort.', 'D'], ['Jemand schickt einen Screenshot von eurem Chat weiter.', 'D'],
  ]
  const s3 = stunde('Woran merkst du, dass es dir zu viel wird?', ['drei Sorten von Grenzen nennen: Körper, Inneres, Digital', 'das Signal deines Körpers für „zu viel“ kennen', 'erklären, warum Grenzen bei jedem anders liegen'],
    seite(
      ankommen('dein Signal', kreis('Woran merkt **dein** Körper „zu viel“? Kreise ein.', 'Knoten im Bauch', 'Herz klopft', 'Kiefer fest', 'Schritt zurück', 'werde still', 'lache komisch', 'werde laut', 'will weg'), kreuz('Sagst du es, wenn dir etwas zu nah ist?', 'meistens', 'manchmal', 'fast nie')),
      fall(bis, 'Chloé lacht', [
        kreuzU('Woran hätte Chloé ihre Grenze merken können?', 'Ihr Bauch zieht sich zusammen.', 'An gar nichts.'),
        kreuzU('Der Arm war nett gemeint. Darf es Chloé trotzdem stören?', 'Ja. Ihr Bauch entscheidet.', 'Nein. Nett gemeint ist nett gemeint.'),
      ]),
      modell(bis, 'drei Sorten von Grenzen', ['user', 'heart', 'device-mobile']),
    ),
    seite(
      clip(bis, 'Wie viel Nähe ist okay?', [kreuz('Wie nah darf dir ein Fremder kommen?', 'sehr nah', 'eine Armlänge', 'weiter weg')], ['Das passiert im Experiment:', 'So reagieren die Leute:'],
        [kreuzU('Ist der Abstand bei allen gleich?', 'Nein. Jeder hat seinen.', 'Ja.'), kreuzU('Chloé wurde nicht gefragt. Was hat ihr Körper gemeldet?', 'Der Bauch zieht sich zusammen.', 'nichts')]),
      st('Erst machen: der Stopp-Abstand', '8 Min.', 'zwei Reihen · alle gleichzeitig', 'ruler-measure', 'Alle Paare gleichzeitig, so schaut niemand zu. Bei ungerader Zahl geht die Leitung mit; wer nicht mag, misst die Abstände. Wer Stopp hört, bleibt sofort stehen. Danach Abstände vergleichen.',
        text('Zwei Reihen stehen sich gegenüber, vier Meter Abstand. Eine Reihe geht langsam los. Wer steht, sagt **Stopp**, sobald es zu nah wird. Wer Stopp hört, bleibt stehen. **Sofort.** Dann tauschen.'),
        fragen(null, kreuz('Waren alle Abstände gleich?', 'ja', 'nein'), kreuz('Wie war es, Stopp zu sagen?', 'leicht', 'komisch', 'schwer'))),
      stimmtDas(bis),
    ),
    seite(
      runde('drei Felder', '25 Min.', 'zwei Teams · am Tisch', 'layout-columns', {
        ziel: 'Grenzen sortieren – und sehen, dass sie bei jedem woanders liegen.',
        material: 'die drei Feld-Karten und 18 Situations-Karten von der nächsten Seite (ausschneiden)',
        schritte: [
          'Die drei Felder liegen auf dem Tisch: **Körper und Sachen · Inneres · Digital.** Jedes Team bekommt neun Situationen.',
          'Reihum eine Karte vorlesen und auf ein Feld legen. Passt sie: 1 Punkt. Passt sie zu zwei Feldern und ihr sagt, warum: auch 1 Punkt.',
          'Sind alle Karten gelegt, kommt Runde 2.',
        ],
        runden: [
          { t: 'Runde 1 · legen', x: 'Alle 18 Karten auf die drei Felder.' },
          { t: 'Runde 2 · Finger', x: 'Die Leitung liest sechs Karten vor. Auf „drei“ zeigen alle: Wie sehr würde dich das stören, von 1 bis 5?' },
          { t: 'Runde 3 · eigene Karte', x: 'Jedes Team schreibt eine eigene Situation. Das andere Team legt sie.' },
        ],
        regeln: ['Niemand muss sagen, ob ihm das schon passiert ist.', 'Über eine Zahl wird nicht gelacht. Jede Grenze zählt.'],
        zu3: 'Ein Team legt alle 18 Karten. Die Leitung prüft und zeigt in Runde 2 mit.',
        notiz: { titel: 'Bei dieser Karte lagen unsere Zahlen am weitesten auseinander:', linien: 1 },
        auswertung: ['Bei welcher Karte wart ihr euch nicht einig, auf welches Feld sie gehört?', 'Was heißt es, wenn dich etwas mit 5 stört und den anderen mit 1?'],
      }),
    ),
    seite(
      material('3 Felder und 18 Situationen', 6,
        karten(3, 16, 'Die Felder: ausschneiden und auf den Tisch legen.', ['Körper und Sachen', 'Inneres', 'Digital'].map((t) => ({ t })), true),
        karten(3, 17, 'Die Situationen: ausschneiden, mischen, auf die Teams verteilen.', GRENZEN.map(([t]) => t).sort((a, b) => a.length - b.length).map((t) => ({ t })))),
      schluss(bis, 'Chloé am Abend', [kreuzU('Chloé merkt am Abend: Das war zu viel. Was kann sie beim nächsten Mal tun?', 'auf den Bauch hören und einen Schritt zur Seite gehen', 'weiter lachen', 'nie wieder hingehen'), kreis('Schau auf Station 1. Woran merkst du es bei **anderen**? Kreise ein.', 'wird still', 'weicht zurück', 'lacht komisch', 'schaut weg', 'antwortet kurz', 'wird laut')], ['gemerkt']),
    ),
  )

  /* ---------- Stunde 4 · Stopp. ---------- */
  const STOPPS = ['„haha, lass mal“', '„Nein.“', '„Hör auf. Jetzt.“', '„Vielleicht später …“', '„Ich will das nicht.“', '„Äh, ich weiß nicht …“', '„Stopp.“ – mit Hand', '„Sorry, könntest du eventuell …“', '„Lass das.“', 'nichts sagen und lachen', 'weggehen', '„Nein. Ich sage es nicht noch einmal.“']
  const LAGEN = ['Jemand nimmt dein Handy und scrollt durch deine Fotos.', 'Jemand kitzelt dich und hört nicht auf.', 'Jemand will, dass du bei etwas mitmachst, das du nicht willst.', 'Jemand nennt dich wieder bei dem Spitznamen, den du hasst.', 'Jemand filmt dich ohne zu fragen.', 'Jemand drängt: „Komm schon, nur einmal.“', 'Jemand setzt sich auf deinen Platz und grinst.', 'Jemand fragt dich vor allen etwas Privates.', 'Jemand umarmt dich, obwohl du das nicht magst.']
  const s4 = stunde('Wie sagst du Stopp, sodass es ankommt?', ['ein klares Stopp von einem unklaren unterscheiden', 'Stopp sagen mit Körper, Stimme und Worten', 'ein Nein hören und „Okay“ sagen'],
    seite(
      ankommen('dein Nein', strich('Wie leicht fällt dir ein Nein?', 'schwer', 'leicht'), kreuz('Und wenn du ein Nein hörst?', '„Okay.“', 'ich diskutiere', 'ich bin beleidigt')),
      fall(stopp, 'Jana und das Foto', [
        kreis('Was war beim zweiten Mal anders? Kreise alles ein.', 'sie steht vor ihm', 'kein Lächeln', 'kein „haha“', '„Jetzt.“', 'sie schreit'),
        kreuzU('Warum hat die erste Nachricht nicht gewirkt?', '„haha“ und „bitte“ klangen wie ein Witz.', 'Er hat sie nicht gelesen.'),
      ]),
      st('Die Jury: drei Stopps', '8 Min.', 'alle · die Leitung zeigt', 'gavel', 'Sie zeigen die drei Stopps selbst, jedes Mal mit demselben Wort „Stopp.“ – die Jugendlichen bewerten nur.',
        fragen(stopp.moves[0].kontext ?? null, ...stopp.moves[0].fragen)),
    ),
    seite(
      modell(stopp, 'ein Stopp hat drei Teile', ['user', 'volume', 'message-circle'], { zeit: '8 Min.' }),
      clip(stopp, 'Einverständnis – so einfach wie Tee', [kreuzU('Jemand sagt erst Ja und dann Nein. Was gilt?', 'das Nein', 'das Ja', 'weiß nicht')], ['Das Bild aus dem Clip:', 'Die Regel:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein'), kreuzU('Was sagst du, wenn du ein Nein hörst?', '„Okay.“', '„Warum nicht?“', '„Stell dich nicht so an.“')]),
      fuerDich('du hörst ein Nein', '8 Min.', fragen(stopp.moves[1].kontext ?? null, ...stopp.moves[1].fragen)),
    ),
    seite(
      runde('von unklar bis klar', '25 Min.', 'alle · am Tisch', 'stairs', {
        ziel: 'Herausfinden, welches Stopp ankommt – und es einmal gemeinsam sagen.',
        material: 'die 12 Stopp-Karten und 9 Situations-Karten von der nächsten Seite (ausschneiden)',
        schritte: [
          '**Teil 1 · die Leiter:** Legt die 12 Stopp-Karten in eine Reihe – von „unklar“ bis „klar“. Ihr müsst euch einigen.',
          '**Teil 2 · welches passt?** Eine Situation wird vorgelesen. Jede Person tippt auf die Stopp-Karte, die sie nehmen würde – alle gleichzeitig.',
          '**Teil 3 · im Chor:** Alle stehen mit dem Gesicht zur Wand. Füße fest, Stimme ruhig. Auf „drei“ sagen alle gleichzeitig den klarsten Satz von der Leiter (z. B. „Hör auf. Jetzt.“). Dreimal.',
          '**Teil 4 · das Okay:** Die Leitung sagt zu allen: „Nein. Lass das.“ Alle antworten im Chor: „Okay.“',
        ],
        regeln: ['Niemand sagt allein etwas vor den anderen. Gesprochen wird nur im Chor, mit dem Gesicht zur Wand.', 'Wer nicht mitsprechen mag, steht dabei und hört zu.'],
        zu3: 'Genau so. Die Leitung spricht im Chor mit.',
        notiz: { titel: 'Mein Stopp-Satz:', linien: 1 },
        auswertung: ['Welche Karten lagen ganz unten bei „unklar“ – und warum benutzt man sie trotzdem so oft?', 'Wie war es, „Okay“ zu sagen?'],
      }, { leitung: 'Bei Teil 3 mitsprechen. Brüllen ist nicht das Ziel: ruhig und klar. Wer erstarrt, ist nicht schuld – das sagen.' }),
    ),
    seite(
      material('12 Stopps und 9 Situationen', 6,
        karten(4, 16, 'Die Stopps: ausschneiden und mischen.', STOPPS.map((t) => ({ t }))),
        karten(3, 19, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', LAGEN.map((t) => ({ t })))),
      schluss(stopp, 'Janas Satz', [kreuzU('Jana hat drei Dinge geändert. Welche?', 'Körper, Stimme, Worte', 'Sie wurde lauter und böser.'), strich('Schau auf Station 1. Wie leicht fällt dir ein Nein jetzt?', 'schwer', 'leicht')], ['Nein gesagt', '„Okay“ gesagt']),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Kapuze auf, Blick am Boden, Kiefer fest. „Aus dem Nichts“ stimmt nicht – Tom hat den ganzen Tag gesendet.',
    'Wem glaubst du? Chloé geht es eher traurig, müde oder leer. Gut: „Du wirkst müde. Magst du reden?“ – allein, ohne Druck.',
    'Drei Kanäle: Meist steigt die Zahl der Punkte von Runde zu Runde. Das ist die Botschaft: Im Chat fehlen Stimme und Körper.',
  ],
  [
    'Der Fall: Gekippt ist es bei „Sie haben doch eh was gegen mich!“ – ein Angriff. Yusuf wollte sagen: Der Bus ist ausgefallen, es ist mir peinlich.',
    'Finde den Angriff: Echte Ich-Sätze sind der erste und der dritte. Angriffswörter: immer, nie, typisch, schon wieder.',
    'Satz-Werkstatt: Angriffe sind alle „Du …“-Sätze, „Immer nimmst du …“, „Typisch …“, „Wegen dir …“ und die zwei falschen Ich-Sätze („Ich finde, du bist …“, „Ich fühle mich, als wärst du …“).',
    'Yusufs zweiter Versuch: „Ich bin genervt, weil der Bus ausgefallen ist – und es ist mir peinlich. Ich will, dass wir das kurz allein klären.“',
  ],
  [
    'Der Fall: Der Bauch zieht sich zusammen – das ist das Signal. Nett gemeint heißt nicht: darf nicht stören.',
    'Drei Felder: Körper und Sachen – Arm, Bus, Ladekabel, Haare, Zimmer, Teller · Inneres – vor allen gefehlt, Lachen über Wichtiges, Geheimnis, Spitzname, Familie, „Stell dich nicht so an“ · Digital – Foto, Chats mitlesen, 20 Nachrichten, Gruppe, Passwort, Screenshot. Zu zwei Feldern passen zum Beispiel das Zimmer (Sachen und Inneres) und der Screenshot (Digital und Inneres).',
    'Runde 2: Unterschiedliche Zahlen sind das Ergebnis, kein Fehler. Grenzen liegen bei jedem woanders.',
  ],
  [
    'Der Fall: Jana steht vor ihm, kein Lächeln, kein „haha“, dazu „Jetzt.“ Die erste Nachricht klang wie ein Witz.',
    'Die Jury: Stopp 3 (ruhig, klar, mit Hand) bekommt die meisten Punkte. Den Unterschied machen Stimme, Gesicht, Hand und Haltung – die Worte sind gleich.',
    'Du hörst ein Nein: „Okay“ kostet kurz Stolz und bringt Respekt und Vertrauen. Weitermachen kostet alles.',
    'Leiter: Klar sind kurze Sätze ohne Lächeln und ohne Entschuldigung. Unklar: Lachen, „vielleicht später“, „Sorry, könntest du …“.',
  ],
]
