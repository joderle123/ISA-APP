// REAL TALK #05 · GRENZEN – vier Stunden (Umbau 27.11.2026 nach fünf jugendlichen Kritikern).
// Höchstens sechs Stationen und eine Pause je Doppelstunde, ein Clip im ganzen Heft (das Quarks-Experiment zur Nähe).
// Niemand spielt etwas vor: Wo ein Ton gezeigt werden muss, macht das die Leitung – die Jugendlichen legen, zeigen
// gleichzeitig, schneiden und kreuzen an. Stunde 1: Münz-Wette mit Nachrichten (ohne Punkte), Rücken an Rücken zeichnen.
// Stunde 2 (neu): die Wort-Schere. Stunde 3 (neu gebaut): ausmalen, Abstand auf dem Boden, die Grenz-Skala.
// Stunde 4: die Stopp-Leiter, Chor im Sitzen. Alle Figuren sind 12–13 und leben in Klasse, Pause, Sport und Klassenchat.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, blasen, clip, fall, fragen, karten, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, strich, stunde, text, umriss, weiter, pause } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [koerper, streit, bis, stopp] = d.tracks

  /* ---------- Stunde 1 · Dein Körper redet mit ---------- */
  const NACHRICHTEN = ['ok.', 'ja ja', 'mach doch', 'schon gut', 'haha', 'passt schon', 'wie du meinst', 'egal', 'aha', 'na toll', 'klar', 'bis dann', '👍', 'k', '…', '✓✓ gelesen – keine Antwort', '?', 'haha.']
  const s1 = stunde('Wem glaubst du – den Worten oder dem Körper?', ['die drei Kanäle nennen: Worte, Stimme, Körper', 'erklären, warum Chat-Nachrichten oft falsch ankommen', 'nachfragen, statt zu raten'],
    seite(
      ankommen('zwei Buchstaben', kreuz('Du schreibst: „Kommst du Samstag?“ Die Antwort: **ok.** Mit Punkt. Was heißt das?', 'passt', 'ist sauer', 'hat keine Zeit', 'keine Ahnung'), kreuz('Wem glaubst du eher?', 'den Worten', 'dem Gesicht und der Stimme')),
      fall(koerper, 'Tom sagt „Ja“', [
        kreis('Was hat Toms Körper gesagt? Kreise ein.', 'Kapuze auf', 'Blick am Boden', 'Kiefer fest', 'er lächelt', 'er redet viel'),
        kreuzU('Alle sagen: „Aus dem Nichts.“ Stimmt das?', 'Nein. Tom hat den ganzen Tag gesendet – nur nicht mit Worten.', 'Ja.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Tom sagt „Ja“', 2, 'search', reden('Woran merkt ihr bei Freunden, dass etwas nicht stimmt – auch wenn sie „passt schon“ sagen?')),
      modell(koerper, 'drei Kanäle', ['message-circle', 'volume', 'device-mobile'], { wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein ankreuzen und auflösen.',
        fragen: [raster('Welcher Kanal ist das? Ein Kreuz pro Zeile.', ['Worte', 'Stimme', 'Körper'], 'Er sagt: „Ja.“', 'Sie spricht ganz leise.', 'Er verschränkt die Arme.', 'Sie seufzt laut.', 'Er schaut auf den Boden.')],
        danach: [reden('Welche Kanäle fehlen im Chat – und was passiert dann?')] }),
      pause(),
    ),
    seite(
      runde('ein Kanal, zwei Kanäle, drei Kanäle', '30 Min.', 'alle · am Tisch', 'antenna-bars-5', {
        ziel: 'Erleben: Je mehr Kanäle, desto klarer die Nachricht. Im Chat fehlen zwei.',
        material: 'die 18 Nachrichten-Karten und 4 Bedeutungs-Karten von der nächsten Seite (ausschneiden), eine Münze pro Person, ein Würfel',
        schritte: [
          'Die vier Bedeutungen liegen auf dem Tisch. Eine Nachricht wird aufgedeckt.',
          'Alle legen **gleichzeitig** ihre Münze auf die Bedeutung, die sie lesen.',
          'Schaut nur hin: Liegen die Münzen zusammen – oder verstreut? Nicht zählen, nicht bewerten.',
        ],
        runden: [
          { t: 'Runde 1 · nur Text', x: 'Die Karte liegt stumm auf dem Tisch. Sechs Nachrichten – auch 👍, „k“ und „gelesen“.' },
          { t: 'Runde 2 · mit Stimme', x: 'Die Leitung würfelt verdeckt eine Bedeutung und liest die Nachricht so vor – mit dem Rücken zu euch. Sechs Nachrichten.' },
          { t: 'Runde 3 · mit Körper', x: 'Die Leitung dreht sich um: Stimme, Gesicht und Haltung. Sechs Nachrichten.' },
        ],
        regeln: ['Nur die Leitung spricht und zeigt. Ihr lest und legt.', 'Keine Punkte. Es gibt kein Richtig – es geht darum, wie verschieden man liest.'],
        zu3: 'Genau so.',
        notiz: { titel: 'Am meisten verstreut lagen die Münzen bei:', linien: 1 },
        auswertung: ['In welcher Runde lagen die Münzen am meisten zusammen?', 'Welche Nachricht schreibt ihr selbst oft – und wie kommt sie wohl an?'],
      }, { leitung: 'Sie sind die einzige Person, die etwas zeigt. Würfel: 1–2 freundlich, 3–4 genervt, 5–6 traurig.', danach: [beispiel('So kann es klingen', ['Die Karte liegt stumm da:', '„ok.“'], ['', 'Zwei Münzen auf „genervt“, zwei auf „kann man nicht wissen“.'], ['Leitung, mit dem Rücken zu euch:', '„ok.“ – kurz und hart.'], ['Ben:', 'Jetzt ist es klar. Genervt.'])] }),
    ),
    seite(
      material('18 Nachrichten und 4 Bedeutungen', 5,
        karten(4, 14, 'Die Bedeutungen: ausschneiden und auf den Tisch legen.', ['freundlich', 'genervt', 'traurig', 'kann man nicht wissen'].map((t) => ({ t }))),
        karten(4, 14, 'Die Nachrichten: ausschneiden, mischen, verdeckt stapeln.', NACHRICHTEN.map((t) => ({ t: `„${t}“` })))),
    ),
    seite(
      st('Rücken an Rücken', '10 Min.', 'zu zweit · alle Paare gleichzeitig', 'pencil', 'Papier und Stifte austeilen. Zu dritt: eine Person beschreibt, zwei zeichnen, dann wechseln. Nach Durchgang 2 die Bilder nebeneinanderlegen.',
        text('Ihr sitzt Rücken an Rücken. A zeichnet ein einfaches Bild aus fünf Formen (Kreis, Dreieck, Viereck, Linie, Stern) und beschreibt es. B zeichnet mit. **Durchgang 1:** B darf nichts fragen. **Durchgang 2:** neues Bild, Rollen tauschen – jetzt sind Fragen erlaubt.'),
        fragen(null, kreuz('Wann war das Bild genauer?', 'ohne Fragen', 'mit Fragen'), kreuzU('Und bei einem „ok.“ im Chat?', 'Nachfragen macht es genauer.', 'Nachfragen ist peinlich.'))),
      schluss(koerper, 'noch einmal „ok.“', [kreuzU('Du bekommst wieder ein „ok.“ und bist unsicher. Was machst du?', 'nachfragen: „Wie meinst du das?“', 'raten', 'beleidigt sein'), kreuz('Schau auf Station 1: Kannst du aus zwei Buchstaben sicher lesen, was gemeint ist?', 'ja', 'nein')], ['gemacht']),
    ),
  )

  /* ---------- Stunde 2 · Die Wort-Schere (neu 27.11.2026) ---------- */
  // Ersetzt die Satz-Werkstatt mit dem Bauplan „Ich bin …, weil … Ich will, dass …“ – so redet keiner (Kritik der Jugendlichen).
  const STREIFEN = ['Du kommst IMMER zu spät, typisch du!', 'Du hörst NIE zu, wenn ich rede!', 'Wegen dir kriegen wir eine schlechte Note.', 'Schon wieder sitzt du auf meinem Platz!', 'Du bist so ein Egoist. Gib mein Heft zurück.', 'Typisch. Du hast es IMMER weitererzählt.', 'Du lachst NIE mit mir. Nur über mich.', 'Ich finde, du bist ein Lügner.', 'Ich fühle mich, als wärst du IMMER gegen mich.', 'Ich sag ja nur: Du bist peinlich.']
  const WUNSCH = ['Frag vorher.', 'Lass mich ausreden.', 'Sag’s mir allein.', 'Nicht vor allen.', 'Gib’s zurück.', 'Lass das.', 'Später reden?', 'Sag Bescheid.']
  const BAUSTEINE = ['Der Bus ist ausgefallen.', 'Sorry.', 'Kann ich trotzdem mitmachen?', 'Können wir das nachher klären?', 'Nicht vor allen.', 'Ich kann nichts dafür!']
  const s2 = stunde('Welche Wörter machen aus Ärger Krieg?', ['Giftwörter finden: immer, nie, typisch, du bist …, wegen dir', 'einen Satz kürzen, bis er die Sache trifft – nicht die Person', 'Yusufs Satz neu legen'],
    seite(
      ankommen('du im Streit', kreuz('Was passiert bei dir im Streit eher?', 'ich werde laut', 'ich werde still', 'ich gehe'), strich('Wie gut kannst du sagen, was dich stört?', 'gar nicht', 'gut')),
      st('Der Fall: Yusuf und der Sportlehrer', '10 Min.', 'lesen · alle zeigen gleichzeitig', 'search', 'Vorlesen. Auf „drei“ zeigen alle mit dem Finger auf die Blase, an der es kippt. Dann ankreuzen.',
        { art: 'fall', bild: streit.szene.bild, name: streit.szene.name, text: 'Yusuf kommt zu spät in die Sporthalle. Der Bus ist ausgefallen.' },
        blasen(['Sportlehrer', '„Schon wieder.“'], ['Yusuf', '„Sie haben doch eh was gegen mich!“'], ['Sportlehrer', '„Raus.“'], ['~Yusuf', 'Bus ausgefallen. Voll peinlich.']),
        fragen(null, kreuzU('Wer benutzt das erste Giftwort?', 'der Sportlehrer: „Schon wieder.“', 'Yusuf: „Sie haben doch eh was gegen mich!“'), kreuzU('Was wollte Yusuf eigentlich sagen?', 'Der Bus ist ausgefallen. Es ist mir peinlich.', 'Der Lehrer ist unfair.')),
        reden('Welcher Satz bringt euch sofort auf 100?')),
    ),
    seite(
      st('Experiment: Treffer', '8 Min.', 'alle gleichzeitig', 'target-arrow', 'Sie sagen beide Sätze zu allen – ruhig, nicht gespielt. Niemand muss antworten. Dann einkreisen lassen.',
        text('Die Leitung sagt zu allen zwei Sätze. Nach jedem Satz zeigen alle **gleichzeitig** 0 bis 5 Finger: Wie sehr willst du zurückschießen?'),
        blasen(['Satz 1', '„Du nimmst IMMER mein Ladekabel. Typisch du.“'], ['Satz 2', '„Mein Ladekabel ist weg. Frag vorher.“']),
        fragen(null, kreis('Welche Wörter haben bei Satz 1 getroffen? Kreise ein.', 'IMMER', 'Ladekabel', 'typisch', 'du', 'weg'))),
      pause(),
    ),
    seite(
      runde('die Wort-Schere', '32 Min.', 'alle · am Tisch', 'scissors', {
        ziel: 'Aus Streit-Sätzen das Gift herausschneiden – und schauen, ob der Rest noch sagt, was man will.',
        material: 'die 10 Satz-Streifen und 8 Wunsch-Karten von der nächsten Seite (ausschneiden), eine Schere pro Person, ein Becher als „Giftdose“',
        schritte: [
          '**Teil 1 · die Falle:** Drei Streifen fangen mit „Ich“ an. Legt sie in die Mitte, bevor geschnitten wird: Wo steckt trotzdem das Gift?',
          '**Teil 2 · schneiden:** Jede Person nimmt zwei Satz-Streifen und schneidet die Giftwörter heraus: **immer, nie, typisch, schon wieder, du bist …, wegen dir.** Die Schnipsel kommen in die Giftdose. Bei **NIE**: rausschneiden und „gerade nicht“ drüberschreiben.',
          '**Teil 3 · Wunsch dazu:** Neben den Rest legt ihr eine Wunsch-Karte. Was will die Person eigentlich?',
          'Alle Streifen liegen offen auf dem Tisch. Ihr lest still. Niemand muss vorlesen.',
        ],
        regeln: ['Was übrig bleibt, darf hart sein. Nur das Gift muss weg.', 'Keine Punkte, keine Teams.'],
        zu3: 'Jede Person nimmt drei Streifen.',
        notiz: { titel: 'Dieser Satz hatte am meisten Gift:', linien: 1 },
        auswertung: ['Reicht der Rest – oder fehlt jetzt etwas?', 'Welches Giftwort rutscht euch selbst am schnellsten raus?'],
      }, { leitung: 'Sagen Sie: „Schneidet weg, was nur trifft. Was übrig bleibt, darf hart sein.“ Die Falle: „Ich finde, du bist ein Lügner.“',
        danach: [beispiel('So sieht eine Runde aus', ['Streifen:', '„Du kommst IMMER zu spät, typisch du!“'], ['', 'Schnipp: „IMMER“ und „typisch du“ kommen in die Giftdose.'], ['Rest:', '„Du kommst zu spät.“ – dazu die Wunsch-Karte „Sag Bescheid.“'])] }),
    ),
    seite(
      material('10 Satz-Streifen und 8 Wunsch-Karten', 5,
        karten(2, 13, 'Satz-Streifen: ausschneiden. Die Giftwörter schneidet ihr in der Runde heraus.', STREIFEN.map((t) => ({ t: `„${t}“` }))),
        karten(4, 12, 'Wunsch-Karten: ausschneiden.', WUNSCH.map((t) => ({ t: `„${t}“` })))),
    ),
    seite(
      st('Yusufs zweiter Versuch', '10 Min.', 'allein · dann alle gleichzeitig', 'cards', 'Jede Person kreist still ein. Auf „drei“ halten alle das Heft hoch. Nicht bewerten – vergleichen.',
        text('Yusufs Satz kommt in die Wort-Schere: „Sie haben doch eh was gegen mich!“ – es bleibt nichts übrig. Bau ihm einen neuen Satz aus **2 oder 3 Bausteinen.** Kreise sie ein. Auf „drei“ halten alle das Heft hoch.'),
        fragen(null, { f: 'Yusufs neuer Satz – kreise 2 oder 3 Bausteine ein:', kreis: BAUSTEINE.map((t) => `„${t}“`) }),
        fragen(null, kreuzU('Was macht der Sportlehrer jetzt eher?', 'Er hört zu.', 'Er schickt Yusuf trotzdem raus.', 'Kommt auf den Satz an.'))),
      schluss(streit, 'dein Giftwort', [kreis('Welches Wort rutscht dir am schnellsten raus? Kreise ein. Sieht keiner.', 'immer', 'nie', 'typisch', 'schon wieder', 'du bist …', 'wegen dir'), strich('Schau auf Station 1. Wie gut kannst du **jetzt** sagen, was dich stört?', 'gar nicht', 'gut')], ['gesagt']),
    ),
  )

  /* ---------- Stunde 3 · Mein Abstand (neu gebaut 27.11.2026) ---------- */
  // Raus: der Stopp-Abstand (wer grinsend auf einen zuläuft, bekommt Lachen statt Stopp – vor Publikum) und das doppelte
  // Sortieren in drei Felder. Neu: ausmalen, Abstand-Streifen auf dem Boden (im Sitzen), die Grenz-Skala mit den Fingern.
  const GRENZEN: [string, string][] = [
    ['Jemand legt dir den Arm um die Schulter.', 'K'], ['Jemand setzt sich im leeren Bus direkt neben dich.', 'K'], ['Jemand nimmt dein Ladekabel, ohne zu fragen.', 'K'], ['Jemand fasst in deine Haare.', 'K'], ['Jemand geht in dein Zimmer, wenn du nicht da bist.', 'K'], ['Jemand isst von deinem Teller.', 'K'],
    ['Jemand fragt vor allen, warum du gefehlt hast.', 'I'], ['Jemand lacht über das, was dir wichtig ist.', 'I'], ['Jemand erzählt dein Geheimnis weiter.', 'I'], ['Jemand gibt dir einen Spitznamen, den du nicht magst.', 'I'], ['Jemand fragt immer wieder nach deiner Familie.', 'I'], ['Jemand sagt: „Stell dich nicht so an.“', 'I'],
    ['Jemand postet ein Foto von dir.', 'D'], ['Jemand liest deine Chats mit.', 'D'], ['Jemand schreibt dir nachts zwanzig Nachrichten.', 'D'], ['Jemand fügt dich in eine Gruppe ein, ohne zu fragen.', 'D'], ['Jemand will dein Passwort.', 'D'], ['Jemand schickt einen Screenshot von eurem Chat weiter.', 'D'],
  ]
  const SAETZE = ['„Ist das okay?“', '„Sag, wenn’s nervt.“', 'einfach machen', 'aufs Gesicht schauen']
  const s3 = stunde('Woran merkst du „zu viel“ – und warum liegt das bei jedem woanders?', ['dein Signal für „zu viel“ nennen', 'zeigen, dass Grenzen bei jedem woanders liegen', 'fragen: „Ist das okay?“'],
    seite(
      ankommen('dein Signal', kreis('Woran merkt **dein** Körper „zu viel“? Kreise ein.', 'Knoten im Bauch', 'Herz klopft', 'Kiefer fest', 'Schritt zurück', 'werde still', 'lache komisch', 'werde laut', 'will weg'), kreuz('Sagst du es, wenn dir etwas zu nah ist?', 'meistens', 'manchmal', 'fast nie')),
      fall(bis, 'Chloé lacht', [
        kreuzU('Der Arm war nett gemeint. Darf es Chloé trotzdem stören?', 'Ja. Ihr Bauch entscheidet.', 'Nein. Nett gemeint ist nett gemeint.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann ausmalen.' }),
      weiter('Ausmalen: hier fängt „zu viel“ an', 2, 'palette',
        fragen('Nur für dich. Niemand zeigt sein Bild, niemand fragt nach.', umriss('Mal mit einer Farbe die Stelle aus, an der sich „zu viel“ bei dir zuerst meldet.', 'Bauch? Hals? Hände? Kopf?')),
        reden('Woran sieht man es anderen an, wenn es ihnen zu nah ist?')),
    ),
    seite(
      clip(bis, 'Wie viel Nähe ist okay?', [kreuz('Wie nah darf dir ein Fremder kommen?', 'sehr nah', 'eine Armlänge', 'weiter weg')], ['Das passiert im Clip:', 'So reagieren die Leute:'],
        [{ f: 'Woran sah man im Clip „zu nah“? Kreise ein.', kreis: ['Schritt zurück', 'Blick weg', 'Arme vor', 'komisches Lachen'] }], '8 Min.'),
      st('Abstand auf dem Boden', '12 Min.', 'alle gleichzeitig · im Sitzen', 'ruler-measure', 'Alle bleiben auf ihren Stühlen. Niemand geht auf jemanden zu. Danach still herumgehen und schauen – Sie auch.',
        text('Jede Person bekommt drei Papierstreifen: **F** = ein Fremder · **K** = jemand aus der Klasse · **B** = jemand, den du richtig gern hast. Leg jeden Streifen dorthin auf den Boden, wo diese Person stehen bleiben soll, wenn sie auf dich zukommt. Dann gehen alle still herum und schauen.'),
        fragen(null, kreuz('Welcher Streifen liegt bei dir am weitesten weg? Nur für dich.', 'F', 'K', 'B'))),
      pause(),
    ),
    seite(
      runde('die Grenz-Skala', '30 Min.', 'alle · am Tisch', 'hand-finger', {
        ziel: 'Sehen, dass Grenzen bei jedem woanders liegen – und was man dann fragt.',
        material: 'die 18 Situations-Karten und 4 Satz-Karten von der nächsten Seite (ausschneiden), zwei Zettel „gleich“ und „verschieden“',
        schritte: [
          '**Teil 1 · zeigen:** Die Leitung liest zwölf Situationen, eine nach der anderen. Auf „drei“ zeigen alle gleichzeitig 0 bis 5 Finger: Wie sehr würde dich das stören?',
          'Liegen die Finger 3 oder mehr auseinander, kommt die Karte auf **„verschieden“**. Sonst auf **„gleich“**.',
          '**Teil 2 · fragen:** Nehmt drei Karten vom Stapel „verschieden“. Legt zu jeder eine Satz-Karte: Was hätte die andere Person tun können?',
        ],
        regeln: ['Zahlen werden nicht kommentiert. Jede Grenze zählt.', 'Niemand muss sagen, ob ihm das schon passiert ist.', 'Keine Punkte, keine Teams.'],
        zu3: 'Die Leitung zeigt mit. Bei drei Leuten reichen 2 Finger Unterschied für „verschieden“.',
        notiz: { titel: 'Bei dieser Karte lagen unsere Finger am weitesten auseinander:', linien: 1 },
        auswertung: ['Chloé zeigt 5, der Junge 1 – wer hat recht?', 'Welche Satz-Karte würdet ihr am ehesten benutzen?'],
      }, { danach: [beispiel('So sieht eine Runde aus', ['Leitung liest:', '„Jemand legt dir den Arm um die Schulter.“'], ['', 'Sara zeigt 5 Finger, Ben 1, Amira 3. Die Karte kommt auf „verschieden“.'], ['Ben:', 'Dann frag ich halt vorher.'])] }),
    ),
    seite(
      material('18 Situationen und 4 Satz-Karten', 6,
        karten(3, 14, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', GRENZEN.map(([t]) => t).sort((a, b) => a.length - b.length).map((t) => ({ t }))),
        karten(4, 12, 'Die Satz-Karten: ausschneiden.', SAETZE.map((t) => ({ t })))),
      schluss(bis, 'Chloé am Abend', [kreuzU('Was hätte der Junge fragen können?', '„Ist das okay?“', 'gar nichts – war ja nett gemeint', '„Warum bist du so komisch?“'), satz('Dein Signal von Station 1 – für die Karte „Zu viel“ hinten im Heft:', 'Mein Signal:')]),
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
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Jana und das Foto', 2, 'search', reden('Warum sagen viele „haha, lass mal“, wenn sie eigentlich „Hör auf“ meinen?')),
      st('Die Jury: drei Stopps', '8 Min.', 'alle · die Leitung zeigt', 'gavel', 'Sie zeigen die drei Stopps selbst, jedes Mal mit demselben Wort „Stopp.“ – die Jugendlichen bewerten nur.',
        fragen(stopp.moves[0].kontext ?? null, ...stopp.moves[0].fragen)),
    ),
    seite(
      modell(stopp, 'ein Stopp hat drei Teile', ['user', 'volume', 'message-circle'], { zeit: '5 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein ankreuzen und auflösen.',
        fragen: [raster('Klar oder unklar? Ein Kreuz pro Zeile.', ['klar', 'unklar'], 'gerade stehen, Blick ins Gesicht', 'beim Nein lachen', 'ein kurzer Satz: „Hör auf.“', '„Sorry, könntest du vielleicht …“', 'ruhige, feste Stimme')],
        danach: [reden('Was fällt euch am schwersten: Körper, Stimme oder Worte?')] }),
      pause(),
    ),
    seite(
      runde('von unklar bis klar', '38 Min.', 'alle · am Tisch', 'stairs', {
        ziel: 'Herausfinden, welches Stopp ankommt – und es einmal gemeinsam sagen.',
        material: 'die 12 Stopp-Karten und 9 Situations-Karten von der nächsten Seite (ausschneiden)',
        schritte: [
          '**Teil 1 · die Leiter:** Legt die 12 Stopp-Karten in eine Reihe – von „unklar“ bis „klar“. Ihr müsst euch einigen.',
          '**Teil 2 · welches passt?** Eine Situation wird vorgelesen. Jede Person tippt auf die Stopp-Karte, die sie nehmen würde – alle gleichzeitig.',
          '**Teil 3 · im Chor:** Alle sitzen, der Blick geht auf die klarste Karte in der Mitte. Füße fest auf den Boden, Stimme ruhig. Auf „drei“ sagen alle gleichzeitig den Satz (z. B. „Hör auf. Jetzt.“). Dreimal.',
          '**Teil 4 · das Okay:** Die Leitung sagt zu allen: „Nein. Lass das.“ Alle antworten im Chor: „Okay.“',
        ],
        regeln: ['Niemand sagt allein etwas vor den anderen. Gesprochen wird nur im Chor, im Sitzen.', 'Wer nicht mitsprechen mag, hört zu. Das ist okay.'],
        zu3: 'Die Leitung spricht im Chor mit.',
        notiz: { titel: 'Mein Stopp-Satz:', linien: 1 },
        auswertung: ['Welche Karten lagen ganz unten bei „unklar“ – und warum benutzt man sie trotzdem so oft?', 'Wie war es, „Okay“ zu sagen?'],
      }, { leitung: 'Bei Teil 3 mitsprechen. Brüllen ist nicht das Ziel: ruhig und klar. Wer erstarrt, ist nicht schuld – das sagen.', danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Jemand filmt dich, ohne zu fragen.“'], ['', 'Drei tippen auf „Hör auf. Jetzt.“, eine Person auf „weggehen“.'], ['Amira:', 'Weggehen ist auch klar. Und danach sag ich es jemandem.'])] }),
    ),
    seite(
      material('12 Stopps und 9 Situationen', 6,
        karten(4, 14, 'Die Stopps: ausschneiden und mischen.', STOPPS.map((t) => ({ t }))),
        karten(3, 15, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', LAGEN.map((t) => ({ t })))),
      schluss(stopp, 'Janas Satz', [kreuzU('Wo könntest du diese Woche ein klares Stopp brauchen? Etwas Kleines reicht. Nur für dich.', 'jemand nimmt mein Handy oder meine Sachen', 'ein Spitzname, den ich nicht mag', 'jemand drängelt: „Komm schon“', 'online'), satz('Dann sage ich – gerade, ruhig, ohne Lächeln:', '„'), strich('Schau auf Station 1. Wie leicht fällt dir ein Nein jetzt?', 'schwer', 'leicht')], ['Nein gesagt', '„Okay“ gesagt']),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben (Umbau 27.11.2026) */
export const loesungen: string[][] = [
  [
    'Der Fall: Kapuze auf, Blick am Boden, Kiefer fest. „Aus dem Nichts“ stimmt nicht – Tom hat den ganzen Tag gesendet.',
    'Drei Kanäle: „Ja“ = Worte · leise sprechen und seufzen = Stimme · Arme verschränkt und Blick am Boden = Körper.',
    'Münz-Wette: Meist liegen die Münzen von Runde zu Runde enger zusammen. Das ist die Botschaft: Im Chat fehlen Stimme und Körper. „✓✓ gelesen – keine Antwort“ und „k“ streuen fast immer.',
    'Rücken an Rücken: Mit Fragen wird das Bild genauer – genau wie bei einem „ok.“ im Chat.',
  ],
  [
    'Der Fall: Das erste Giftwort sagt der Sportlehrer („Schon wieder.“) – gekippt ist es bei „Sie haben doch eh was gegen mich!“. Yusuf wollte sagen: Der Bus ist ausgefallen, es ist mir peinlich.',
    'Treffer: Bei Satz 1 treffen „IMMER“, „typisch“ und „du“. Satz 2 sagt dieselbe Sache – ohne Gift.',
    'Wort-Schere: Giftwörter sind immer, nie, typisch, schon wieder, du bist …, wegen dir. Die Falle: „Ich finde, du bist ein Lügner.“, „Ich fühle mich, als wärst du IMMER gegen mich.“, „Ich sag ja nur: Du bist peinlich.“ – ein „Ich“ am Anfang macht keinen Angriff zur Info.',
    'Yusufs zweiter Versuch: Gute Kombinationen sind zum Beispiel „Der Bus ist ausgefallen.“ + „Kann ich trotzdem mitmachen?“ oder „Sorry.“ + „Können wir das nachher klären?“. „Ich kann nichts dafür!“ ist wahr, klingt aber wie ein neuer Angriff.',
  ],
  [
    'Der Fall: Der Bauch zieht sich zusammen – das ist das Signal. Nett gemeint heißt nicht: darf nicht stören.',
    'Clip: Zu nah sieht man am Schritt zurück, am Blick weg, an den Armen vor dem Körper – und oft an einem komischen Lachen. Abstand auf dem Boden: Unterschiedliche Abstände sind das Ergebnis, kein Fehler.',
    'Grenz-Skala: Unterschiedliche Finger sind das Ergebnis. Die beste Satz-Karte ist meistens „Ist das okay?“ – „aufs Gesicht schauen“ hilft auch, reicht aber nicht immer.',
  ],
  [
    'Der Fall: Jana steht vor ihm, kein Lächeln, kein „haha“, dazu „Jetzt.“ Die erste Nachricht klang wie ein Witz.',
    'Die Jury: Stopp 3 (ruhig, klar, mit Hand) wirkt am stärksten. Den Unterschied machen Stimme, Gesicht, Hand und Haltung – die Worte sind gleich.',
    'Klar: gerade stehen, kurzer Satz, ruhige feste Stimme. Unklar: lachen, „Sorry, könntest du vielleicht …“.',
    'Leiter: Klar sind kurze Sätze ohne Lächeln und ohne Entschuldigung. Unklar: Lachen, „vielleicht später“, „Sorry, könntest du …“. Weggehen ist auch klar. „Okay“ auf ein Nein kostet kurz Stolz und bringt Respekt.',
  ],
]
