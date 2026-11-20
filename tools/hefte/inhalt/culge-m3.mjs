// Culture générale · Modul 3 (7P) – Schwerpunkt Geografie, Physik/Chemie, neue Technologien, Medienbildung
// (MENJE-Leitfaden Voie de préparation: Module 3, 6, 9). Themen: Karten lesen, Luxemburg (Kantone, Ösling, Gutland),
// Nachbarländer und Grenzen, Wetter (Versuch Regenmesser), Wasser in drei Zuständen (Versuch), einfacher Stromkreis
// (Versuch Leiter/Nichtleiter), sicher mit dem Handy, Bilder im Netz.
// Zahlen zu Luxemburg: allgemein bekannte Werte, gerundet („etwa“, „rund“).
import { sachModul } from './sachfach-gemeinsam.mjs'
import { luxKarte, KANTONE } from './karten.mjs'
import { wasserkreislauf, stromkreis, thermometer, balken } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 3, {
  titel: 'Luxemburg erkunden – Technik verstehen',
  titelFr: 'Explorer le Luxembourg – comprendre la technique',
  unter: 'Karten lesen, Ösling und Gutland, Nachbarn und Grenzen, Wetter messen, Wasser verwandeln, Strom fließen lassen – und sicher und fair im Internet. In acht Lektionen.',
  unterFr: 'Lire une carte, Oesling et Gutland, voisins et frontières, la météo, l’eau, l’électricité et l’Internet en sécurité.',
  farbe: '#1f6aa0',
  deckbild: ['noah:froh:stehen-zeigen', 'chloe:froh:handy', 'tom:froh:stehen'],
  blasen: [{ t: 'Wo ist Norden?', x: 14, y: 112 }, { t: 'Leuchtet die Lampe?', x: 112, y: 98 }, { t: 'Passwort?', x: 166, y: 150 }],
  themen: [
    { titel: { de: 'Luxemburg auf der Karte', fr: 'Le Luxembourg sur la carte' }, icon: 'map-2', lektionen: 3 },
    { titel: { de: 'Natur und Technik', fr: 'Nature et technique' }, icon: 'flask', lektionen: 3 },
    { titel: { de: 'Sicher im Netz', fr: 'En sécurité sur Internet' }, icon: 'shield-lock', lektionen: 2 },
  ],
  karten: true,
})

const kompass = () => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:52mm;display:block;margin:0 auto">
  <circle cx="100" cy="100" r="78" fill="#f5f8fb" stroke="#9fb4c8" stroke-width="2"/>
  <path d="M100,22 L112,100 L100,178 L88,100 Z" fill="#2a2f3a"/><path d="M22,100 L100,88 L178,100 L100,112 Z" fill="#7d8798"/>
  <path d="M100,22 L112,100 L100,100 Z" fill="#c0392b"/>
  ${[['N', 100, 14], ['O', 192, 106], ['S', 100, 198], ['W', 8, 106]].map(([b, x, y]) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lexend" font-size="18" font-weight="800" fill="#2a2f3a">${b}</text>`).join('')}
  ${[['NO', 155, 50], ['SO', 155, 160], ['SW', 45, 160], ['NW', 45, 50]].map(([b, x, y]) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Lexend" font-size="12" font-weight="700" fill="#6b7487">${b}</text>`).join('')}</svg>`

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Karten · Himmelsrichtungen · Maßstab', titel: 'Wo ist Norden?', untertitel: 'Legende, Kompassrose und Maßstab: Du lernst, wie man eine Karte liest, hörst eine Wegbeschreibung und bestimmst Richtungen in Luxemburg.',
    ziel: { de: 'Ich lese eine Karte mit Legende, Himmelsrichtungen und Maßstab.', fr: 'Je lis une carte avec la légende, les points cardinaux et l’échelle.' },
    bild: ['noah:froh:stehen-zeigen', 'jana:verwirrt:stehen'],
    start: {
      was: 'Orientierung',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo geht die Sonne morgens auf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['im Osten', 'im Westen', 'im Norden'], r: 0 }, { f: 'Wo steht die Sonne bei uns mittags?', o: ['im Süden', 'im Norden', 'im Osten'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Drei Werkzeuge zum Kartenlesen',
      absaetze: [
        'Eine Karte ist ein Bild der Erde **von oben**, stark verkleinert und vereinfacht. Wer eine Karte lesen will, braucht drei Werkzeuge.',
        '### 1. Die Legende',
        'Die **Legende** erklärt die Zeichen auf der Karte: ein roter Punkt für eine Stadt, eine blaue Linie für einen Fluss, ein Quadrat für die Hauptstadt. Ohne Legende versteht man die Karte nicht.',
        '### 2. Die Himmelsrichtungen',
        'Auf fast allen Karten ist **Norden oben**. Dann ist Süden unten, Osten rechts und Westen links. Dazwischen liegen Nordosten, Südosten, Südwesten und Nordwesten. Ein Pfeil mit „N“ zeigt, wo Norden ist. Ein Trick für die Reihenfolge im Uhrzeigersinn: **N**ie **O**hne **S**eife **W**aschen.',
        '### 3. Der Maßstab',
        'Der **Maßstab** zeigt, wie stark die Karte verkleinert ist. Ein Balken zeigt zum Beispiel: Diese Strecke ist in Wirklichkeit 10 Kilometer lang. So kann man Entfernungen messen.',
      ],
      bildHtml: kompass(),
      woerter: [['die Karte', 'la carte'], ['die Legende', 'la légende'], ['der Norden / Süden', 'le nord / le sud'], ['der Osten / Westen', 'l’est / l’ouest'], ['die Himmelsrichtung', 'le point cardinal'], ['der Maßstab', 'l’échelle'], ['die Entfernung', 'la distance'], ['vereinfacht', 'simplifié']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Werkzeug hilft? Verbinde.', stufe: 1, links: ['Was bedeutet der blaue Strich?', 'Wie weit ist es bis zur nächsten Stadt?', 'Liegt der Ort oben oder unten auf der Karte?'], rechts: ['die Legende', 'der Maßstab', 'die Himmelsrichtungen'], ordnung: [1, 2, 0] },
      ],
    },
    hoeren: {
      was: 'Eine Wegbeschreibung', wo: 'Ausflug · Echternach', titel: 'Wohin gehen wir?',
      situation: 'Die Klasse ist in Echternach. Noah liest die Karte, Jana ist verwirrt.',
      bild: ['noah:froh:blatt', 'jana:verwirrt:stehen'], sprecher: { Noah: 'm3', Jana: 'w2' },
      text: [
        ['Jana', 'Noah, wo ist die Jugendherberge? Ich sehe nur Linien.'],
        ['Noah', 'Schau, hier ist der Pfeil mit N. Norden ist oben. Wir stehen am Marktplatz, das ist der rote Punkt.'],
        ['Jana', 'Und die Herberge?'],
        ['Noah', 'Das kleine Haus mit dem Bett. In der Legende steht: Jugendherberge. Sie liegt südwestlich von uns, also unten links.'],
        ['Jana', 'Und wie weit ist das?'],
        ['Noah', 'Der Maßstab sagt: ein Zentimeter auf der Karte sind hundert Meter. Die Herberge ist sieben Zentimeter entfernt.'],
        ['Jana', 'Also siebenhundert Meter. Das geht ja! Und die Sauer?'],
        ['Noah', 'Die blaue Linie im Osten. Dahinter ist schon Deutschland.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wenn Norden oben ist, wo ist Südwesten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['unten links', 'oben rechts', 'unten rechts'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [50, 50], zeilen: [['Wo steht die Klasse?', '[am Marktplatz]'], ['In welcher Richtung liegt die Herberge?', '[südwestlich (unten links)]'], ['Maßstab: 1 cm auf der Karte =', '[100 m]'], ['Wie weit ist die Herberge?', '[700 m]'], ['Was liegt hinter der Sauer?', '[Deutschland]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Beschreibt euch gegenseitig den Weg von der Klasse zu einem Ort in der Schule – nur mit Himmelsrichtungen und Entfernungen.', stufe: 2, karten: [
        { titel: 'Wörter', text: ['nach Norden / Süden …', 'nach etwa … Metern', 'links / rechts abbiegen', 'geradeaus'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Karte lesen', nummern: true, punkte: ['**Legende** lesen: Was bedeuten die Zeichen?', '**Norden** suchen (meist oben).', 'Mit dem **Maßstab** Entfernungen messen.'] },
         { titel: 'Himmelsrichtungen', punkte: ['**N**orden oben, **S**üden unten', '**O**sten rechts, **W**esten links', 'dazwischen: NO, SO, SW, NW', 'Merksatz: **N**ie **O**hne **S**eife **W**aschen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Schau auf die Karte. In welcher Himmelsrichtung von Luxemburg-Stadt liegt …?', stufe: 2,
        html: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Clerf', 'Echternach', 'Esch-sur-Alzette', 'Remich', 'Redingen'], breite: 80 }),
        liste: [['Clerf:', 'im Norden'], ['Echternach:', 'im Nordosten'], ['Esch-sur-Alzette:', 'im Südwesten'], ['Remich:', 'im Südosten'], ['Redingen:', 'im Nordwesten']], spalten: 2 },
      { art: 'rechnen', auftrag: 'Maßstab: 1 cm auf der Karte = 5 km in Wirklichkeit. Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'Auf der Karte: 4 cm', l: '4 · 5 = 20 km', raum: 1 }, { a: 'Auf der Karte: 7 cm', l: '7 · 5 = 35 km', raum: 1 },
        { a: 'Auf der Karte: 2,5 cm', l: '2,5 · 5 = 12,5 km', raum: 1 }, { a: 'In Wirklichkeit 15 km. Wie viele cm auf der Karte?', l: '15 ÷ 5 = 3 cm', raum: 1 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe den Weg von deiner Schule zu einem Ort, den du gut kennst (Bushaltestelle, Sporthalle …). Benutze Himmelsrichtungen und Entfernungen.', stufe: 2,
        anfaenge: ['Ich gehe aus der Schule nach …', 'Nach etwa … Metern …', 'Dann …', 'Das Ziel liegt …'], zeilen: 7,
        beispiel: 'Ich gehe aus der Schule nach Süden. Nach etwa 200 Metern komme ich an eine Kreuzung. Dann gehe ich nach Osten, etwa 300 Meter, bis zur Bäckerei. Die Bushaltestelle liegt direkt gegenüber.' },
    ],
    check: ['Ich erkläre Legende, Himmelsrichtungen und Maßstab.', 'Ich bestimme Himmelsrichtungen auf einer Karte.', 'Ich rechne mit dem Maßstab.'],
  },
  // ================================================================ 2
  {
    thema: 'Luxemburg · Kantone · Ösling und Gutland', titel: 'Ein kleines Land mit zwei Gesichtern', untertitel: 'Hügel und Wälder im Norden, Felder und Städte im Süden: Du lernst die zwei Landschaften und die zwölf Kantone kennen.',
    ziel: { de: 'Ich beschreibe Ösling und Gutland und finde die Kantone auf der Karte.', fr: 'Je décris l’Oesling et le Gutland et je trouve les cantons sur la carte.' },
    bild: ['opa:froh:stehen', 'lina:froh:stehen-zeigen'],
    start: {
      was: 'Was weißt du über Luxemburg?',
      aufgaben: [
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 1, fragen: [{ f: 'Wie heißt die Hauptstadt?', o: ['Luxemburg', 'Esch-sur-Alzette', 'Ettelbrück'], r: 0 }, { f: 'Wie viele Kantone hat Luxemburg?', o: ['3', '12', '52'], r: 1 }, { f: 'Wie heißt der Fluss an der Grenze zu Deutschland im Südosten?', o: ['die Mosel', 'die Alzette', 'die Wiltz'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (Zahlen gerundet)', titel: 'Ösling und Gutland',
      absaetze: [
        'Luxemburg ist rund **2600 Quadratkilometer** groß. Von Norden nach Süden sind es etwa 80 Kilometer, von Westen nach Osten etwa 55. Man kann das Land also an einem Tag mit dem Fahrrad durchqueren – wenn man gute Beine hat!',
        '### Das Ösling',
        'Der Norden heißt **Ösling** (auf Französisch: Oesling). Er gehört zu den **Ardennen**. Hier gibt es Hügel, tiefe Täler und viele Wälder. Etwa ein Drittel der Landesfläche gehört zum Ösling, aber nur wenige Menschen wohnen hier. Der höchste Punkt des Landes liegt im Ösling: etwa 560 Meter hoch. Der **Stausee der Obersauer** liefert Trinkwasser für einen großen Teil des Landes.',
        '### Das Gutland',
        'Der Süden und die Mitte heißen **Gutland**. Der Boden ist fruchtbar, darum gibt es viele Felder. Hier liegen die großen Städte. Im Südwesten, im **Minett**, wurde früher Eisenerz abgebaut. Im Osten, an der **Mosel**, wächst Wein. Und im **Müllerthal** gibt es spannende Felsen aus Sandstein.',
        '### Die Kantone',
        'Luxemburg ist in **12 Kantone** eingeteilt. Die Kantone sind in Gemeinden unterteilt.',
      ],
      bildHtml: luxKarte({ kantone: 'namen', oesling: true, breite: 88 }),
      woerter: [['der Kanton', 'le canton'], ['die Gemeinde', 'la commune'], ['der Hügel', 'la colline'], ['das Tal', 'la vallée'], ['fruchtbar', 'fertile'], ['der Stausee', 'le lac de barrage'], ['das Eisenerz', 'le minerai de fer'], ['der Sandstein', 'le grès']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche Ösling und Gutland.', stufe: 1, kopf: ['', 'Ösling', 'Gutland'], breiten: [24, 38, 38], zeilen: [['Lage', '[im Norden]', '[im Süden und in der Mitte]'], ['Landschaft', '[Hügel, Täler, Wälder (Ardennen)]', '[fruchtbare Felder, Mosel, Müllerthal]'], ['Menschen', '[wenige]', '[viele, große Städte]'], ['Besonderes', '[höchster Punkt, Stausee der Obersauer]', '[Minett, Wein an der Mosel, Sandsteinfelsen]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Das Ösling gehört zu den Ardennen.', true], ['Im Ösling wohnen die meisten Menschen.', false], ['An der Mosel wächst Wein.', true], ['Luxemburg ist von Norden nach Süden etwa 800 km lang.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Ausflug · Stausee der Obersauer', titel: 'Opas Ösling',
      situation: 'Lina macht mit ihrem Opa eine Wanderung am Stausee. Er erzählt von früher.',
      bild: ['opa:froh:stehen', 'lina:froh:stehen'], sprecher: { Opa: 'm1', Lina: 'w3' },
      text: [
        ['Lina', 'Opa, das Wasser ist so grün und still. War der See schon immer hier?'],
        ['Opa', 'Nein! Als ich klein war, gab es hier nur die Sauer, einen Fluss im Tal. Dann hat man eine große Staumauer gebaut. Seit den Fünfzigerjahren gibt es den See.'],
        ['Lina', 'Warum hat man das gemacht?'],
        ['Opa', 'Für Strom und vor allem für Trinkwasser. Heute kommt ein großer Teil unseres Leitungswassers von hier.'],
        ['Lina', 'Dann trinke ich zu Hause im Süden Wasser aus dem Norden!'],
        ['Opa', 'Genau. Darum darf man hier im See auch nicht mit Motorbooten fahren. Das Wasser muss sauber bleiben.'],
        ['Lina', 'Es ist so ruhig hier. Bei uns in Esch hört man immer Autos.'],
        ['Opa', 'Das ist das Ösling: viel Wald, wenige Menschen. Und das Gutland: viele Menschen, viele Geschäfte. Beides ist Luxemburg.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wozu baut man einen Stausee? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['für Trinkwasser', 'für Strom', 'gegen Hochwasser', 'für den Weinbau'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Der Stausee war schon immer da.', false], ['Ein großer Teil des Leitungswassers kommt vom Stausee.', true], ['Auf dem See fahren viele Motorboote.', false], ['Lina wohnt in Esch, im Süden.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo würdet ihr lieber wohnen: im Ösling oder im Gutland? Sammelt Vorteile und Nachteile.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Im Ösling gefällt mir …', 'Im Gutland ist praktisch, dass …', 'Ein Nachteil ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Luxemburg in Zahlen', punkte: ['Fläche: rund **2600 km²**', 'Norden–Süden: etwa **80 km**', '**12 Kantone**, viele Gemeinden', 'Hauptstadt: **Luxemburg**'] },
         { titel: 'Zwei Landschaften', punkte: ['**Ösling** (Norden): Ardennen, Wald, wenige Menschen', '**Gutland** (Süden, Mitte): Felder, Städte, Mosel, Minett, Müllerthal'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Schreibe die Namen der Kantone zu den Nummern. Nimm die Karte im Lesetext zu Hilfe.', stufe: 2,
        html: luxKarte({ kantone: 'nummern', oesling: true, fluesse: false, breite: 78 }),
        liste: KANTONE.map((k, i) => [String(i + 1), k]), spalten: 3 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Reiseprospekt: „Luxemburg – ein Land, zwei Gesichter“. Locke Touristen in das Ösling und in das Gutland.', stufe: 2,
        anfaenge: ['Willkommen in Luxemburg!', 'Im Norden …', 'Im Süden …', 'Unser Tipp: …'], zeilen: 8,
        beispiel: 'Willkommen in Luxemburg! Im Norden wartet das Ösling mit tiefen Wäldern, Burgen und dem Stausee der Obersauer. Hier kannst du wandern und die Ruhe genießen. Im Süden liegt das Gutland mit der Hauptstadt, dem Weinbau an der Mosel und den Felsen im Müllerthal. Unser Tipp: Fahr mit dem Zug – er ist in Luxemburg in der 2. Klasse gratis (Stand 2026)!' },
    ],
    check: ['Ich beschreibe Ösling und Gutland.', 'Ich nenne Zahlen zu Luxemburg.', 'Ich finde die Kantone auf der Karte.'],
  },
  // ================================================================ 3
  {
    thema: 'Nachbarländer · Grenzen · Schengen', titel: 'Drei Nachbarn, keine Schlagbäume', untertitel: 'Belgien, Deutschland, Frankreich: Du lernst Luxemburgs Nachbarn kennen, hörst Grenzgänger erzählen und erfährst, was Schengen bedeutet.',
    ziel: { de: 'Ich nenne die Nachbarländer und erkläre, was Grenzgänger und das Schengener Abkommen sind.', fr: 'Je nomme les pays voisins et j’explique ce que sont les frontaliers et l’accord de Schengen.' },
    bild: ['vater:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Nachbarn',
      aufgaben: [
        { art: 'beschriften', auftrag: 'Welche Länder grenzen an Luxemburg? Schau auf die Karte und schreibe.', stufe: 1, html: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Schengen', 'Wasserbillig', 'Troisvierges'], breite: 66, massstab: false }), liste: [['im Westen und Norden:', 'Belgien'], ['im Osten:', 'Deutschland'], ['im Süden:', 'Frankreich']], spalten: 1 },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (Zahlen gerundet, Stand 2026)', titel: 'Ein Land mitten in Europa',
      absaetze: [
        'Luxemburg hat drei Nachbarn: **Belgien** im Westen und Norden, **Deutschland** im Osten und **Frankreich** im Süden. An der Grenze zu Deutschland fließen drei Flüsse: die **Our**, die **Sauer** und die **Mosel**.',
        '### Grenzgänger',
        'Jeden Morgen fahren über 200 000 Menschen aus Frankreich, Belgien und Deutschland zur Arbeit nach Luxemburg und abends wieder nach Hause. Man nennt sie **Grenzgänger**. Ohne sie könnten viele Krankenhäuser, Geschäfte und Banken nicht arbeiten. Darum gibt es morgens auf den Straßen oft Stau, und die Züge sind voll.',
        '### Schengen',
        'Früher gab es an jeder Grenze **Kontrollen** mit Schlagbäumen. Am **14. Juni 1985** unterschrieben fünf Länder auf einem Schiff auf der Mosel beim Dorf **Schengen** einen Vertrag: Sie wollten die Kontrollen an ihren gemeinsamen Grenzen abschaffen. Heute gehören viele europäische Länder zum **Schengen-Raum**. Man kann meist reisen, ohne an der Grenze anzuhalten (Stand 2026: zeitweise gibt es wieder Kontrollen).',
      ],
      woerter: [['das Nachbarland', 'le pays voisin'], ['die Grenze', 'la frontière'], ['der Grenzgänger', 'le frontalier'], ['die Kontrolle', 'le contrôle'], ['der Schlagbaum', 'la barrière (de frontière)'], ['der Vertrag', 'le traité, l’accord'], ['abschaffen', 'supprimer'], ['der Stau', 'l’embouteillage']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Im Osten grenzt Luxemburg an [Deutschland].', 'Menschen, die in einem Land wohnen und im Nachbarland arbeiten, heißen [Grenzgänger].', 'Das Schengener Abkommen wurde am [14. Juni 1985] unterschrieben.', 'Seitdem gibt es an vielen Grenzen keine [Kontrollen] mehr.'] },
        { art: 'fragen', auftrag: 'Warum sind die Grenzgänger wichtig für Luxemburg?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Viele Krankenhäuser, Geschäfte, Banken und Firmen brauchen sie als Arbeitskräfte.' }] },
      ],
    },
    hoeren: {
      was: 'Interviews', wo: 'Bahnhof Luxemburg · 7 Uhr morgens', titel: 'Jeden Tag über die Grenze',
      situation: 'Chloé macht für die Schülerzeitung Interviews am Bahnhof.',
      bild: ['chloe:froh:handy', 'vater:froh:stehen'], sprecher: { 'Chloé': 'w3', Pflegerin: 'w1', Busfahrer: 'm1' },
      text: [
        ['Chloé', 'Guten Morgen! Darf ich Sie kurz fragen: Woher kommen Sie?'],
        ['Pflegerin', 'Aus Metz, in Frankreich. Ich arbeite als Pflegerin im Krankenhaus. Ich bin um halb sechs aufgestanden.'],
        ['Chloé', 'So früh! Warum arbeiten Sie in Luxemburg?'],
        ['Pflegerin', 'Die Arbeit gefällt mir, und der Lohn ist besser. Aber die Fahrt ist lang: eine Stunde mit dem Zug, wenn alles klappt.'],
        ['Chloé', 'Und Sie? Sie fahren den Bus?'],
        ['Busfahrer', 'Ja, ich komme aus Arlon in Belgien. Ich fahre jeden Tag mit dem Auto bis zur Grenze, dann beginnt meine Schicht.'],
        ['Chloé', 'Merken Sie die Grenze noch?'],
        ['Busfahrer', 'Kaum! Nur am Handy-Netz und an den Schildern. Früher hat mein Vater an der Grenze immer den Ausweis gezeigt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Metz liegt in … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Frankreich', 'Belgien', 'Deutschland'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Pflegerin', 'Busfahrer'], breiten: [24, 38, 38], zeilen: [['Wohnort', '[Metz (Frankreich)]', '[Arlon (Belgien)]'], ['Beruf', '[Pflegerin im Krankenhaus]', '[Busfahrer]'], ['Weg zur Arbeit', '[eine Stunde mit dem Zug]', '[mit dem Auto bis zur Grenze]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was bedeutet es für ein Land, wenn so viele Menschen jeden Tag pendeln? Sammelt gute Seiten und Probleme.', stufe: 3, karten: [
        { titel: 'Ideen', text: ['Arbeitskräfte', 'Stau und Züge voller Menschen', 'viele Sprachen', 'Umwelt'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Luxemburgs Nachbarn', punkte: ['**Belgien** (Westen, Norden)', '**Deutschland** (Osten)', '**Frankreich** (Süden)', 'Grenzflüsse: **Our, Sauer, Mosel**'] },
         { titel: 'Schengen', punkte: ['**1985**: Vertrag auf der Mosel bei **Schengen**', 'keine ständigen Kontrollen an vielen Grenzen', 'freies Reisen im **Schengen-Raum**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'In welchem Land liegt diese Stadt? Kreuze an. (Tipp: Atlas oder Internet)', stufe: 2, kopf: ['Stadt', 'Belgien', 'Deutschland', 'Frankreich'], breiten: [34, 22, 22, 22], zeilen: [['Trier', '', '[x]', ''], ['Metz', '', '', '[x]'], ['Arlon', '[x]', '', ''], ['Thionville', '', '', '[x]'], ['Saarbrücken', '', '[x]', ''], ['Bastogne', '[x]', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Artikel für die Schülerzeitung: „Ein Tag im Leben einer Grenzgängerin“. Nutze den Hörtext.', stufe: 2,
        anfaenge: ['Um halb sechs …', 'Um sieben …', 'Ihre Arbeit …', 'Am Abend …'], zeilen: 8,
        beispiel: 'Um halb sechs klingelt in Metz der Wecker. Um sieben steigt die Pflegerin am Bahnhof Luxemburg aus dem Zug. Ihre Arbeit im Krankenhaus gefällt ihr, und sie verdient gut. Nur die lange Fahrt ist anstrengend. Am Abend fährt sie zurück nach Frankreich – ohne an der Grenze anzuhalten.' },
    ],
    check: ['Ich nenne die drei Nachbarländer.', 'Ich erkläre, was Grenzgänger sind.', 'Ich erkläre das Schengener Abkommen.'],
  },
  // ================================================================ 4
  {
    thema: 'Wetter · messen · Versuch Regenmesser', titel: 'Das Wetter messen', untertitel: 'Temperatur, Regen, Wind: Du liest einen Wetterbericht, hörst eine Wettervorhersage und baust einen Regenmesser.',
    ziel: { de: 'Ich nenne Wetterelemente und Messgeräte und lese Wetterdaten.', fr: 'Je cite les éléments de la météo et les instruments de mesure et je lis des données.' },
    bild: ['tom:froh:stehen', 'mia:froh:handy'],
    start: {
      was: 'Wie ist das Wetter heute?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Beobachte das Wetter heute. Kreuze an.', stufe: 1, kopf: ['', 'ja', 'nein'], breiten: [60, 20, 20], zeilen: [['Die Sonne scheint.', '', ''], ['Es ist bewölkt.', '', ''], ['Es regnet.', '', ''], ['Es ist windig.', '', ''], ['Es ist kälter als 10 °C.', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Woraus das Wetter besteht',
      absaetze: [
        'Das **Wetter** beschreibt, wie die Luft **heute** an einem Ort ist: warm oder kalt, trocken oder nass, ruhig oder windig. Das **Klima** dagegen beschreibt das Wetter über **viele Jahre**. Luxemburg hat ein gemäßigtes Klima: nicht sehr heiß, nicht sehr kalt, Regen zu allen Jahreszeiten.',
        '### Wetterelemente und Messgeräte',
        'Die **Temperatur** misst man mit dem **Thermometer** in Grad Celsius (°C). Bei 0 °C gefriert Wasser. Den **Niederschlag** (Regen, Schnee, Hagel) misst man mit dem **Regenmesser** in Millimetern: 1 mm heißt, dass auf einem Quadratmeter ein Liter Wasser gefallen ist. Den **Wind** beschreibt man mit Richtung und Stärke. Die Richtung zeigt eine **Windfahne**: Ein Westwind kommt **aus** dem Westen.',
        'Wetterstationen messen diese Werte jeden Tag. Mit Computern berechnen Fachleute daraus die **Wettervorhersage**.',
      ],
      bildHtml: `<div style="display:flex;gap:6mm;justify-content:center;align-items:flex-end">${thermometer(12)}${thermometer(-4)}${thermometer(28)}</div>`,
      woerter: [['das Wetter', 'la météo, le temps'], ['das Klima', 'le climat'], ['die Temperatur', 'la température'], ['der Niederschlag', 'les précipitations'], ['der Regenmesser', 'le pluviomètre'], ['die Windfahne', 'la girouette'], ['gefrieren', 'geler'], ['die Vorhersage', 'la prévision']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Messgerät misst was? Verbinde.', stufe: 1, links: ['Thermometer', 'Regenmesser', 'Windfahne'], rechts: ['Temperatur', 'Niederschlag', 'Windrichtung'], ordnung: [1, 2, 0] },
        { art: 'tabelle', auftrag: 'Lies die drei Thermometer im Lesetext ab.', stufe: 2, kopf: ['Thermometer', 'Temperatur', 'Gefriert Wasser?'], breiten: [30, 35, 35], zeilen: [['links', '[12 °C]', '[nein]'], ['Mitte', '[−4 °C]', '[ja]'], ['rechts', '[28 °C]', '[nein]']] },
      ],
    },
    hoeren: {
      was: 'Eine Wettervorhersage', wo: 'Radio · Nachrichten um 7 Uhr', titel: 'Das Wetter für morgen',
      situation: 'Im Radio kommt die Wettervorhersage für Luxemburg.',
      bild: ['tom:verwirrt:handy', 'mia:froh:stehen'], sprecher: { Wetterfrau: 'w1' },
      text: [
        ['Wetterfrau', 'Und nun das Wetter für morgen, Dienstag. Am Morgen ist es im ganzen Land neblig und kühl, mit Temperaturen um fünf Grad.'],
        ['Wetterfrau', 'Im Laufe des Vormittags löst sich der Nebel auf. Im Süden scheint dann die Sonne, es bleibt trocken, und es wird bis zu vierzehn Grad warm.'],
        ['Wetterfrau', 'Im Ösling bleibt es bewölkt und etwas kühler, mit Höchstwerten um zehn Grad. Am Nachmittag kann es dort regnen, bis zu acht Millimeter.'],
        ['Wetterfrau', 'Der Wind kommt aus Westen und ist schwach bis mäßig. In der Nacht kühlt es auf zwei Grad ab, im Ösling ist sogar Bodenfrost möglich.'],
        ['Wetterfrau', 'Unser Tipp: Für den Weg zur Schule eine warme Jacke – und im Norden einen Regenschirm.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Bodenfrost? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Frost direkt am Boden, unter 0 °C', 'sehr starker Wind', 'Nebel am Morgen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze die Wetterkarte.', stufe: 1, kopf: ['', 'Süden', 'Ösling (Norden)'], breiten: [30, 35, 35], zeilen: [['Höchsttemperatur', '[bis 14 °C]', '[um 10 °C]'], ['Himmel', '[sonnig (nach Nebel)]', '[bewölkt]'], ['Regen', '[kein Regen]', '[am Nachmittag bis 8 mm]']] },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 2, fragen: [{ f: 'Woher kommt der Wind?', o: ['aus Westen', 'aus Osten', 'aus Norden'], r: 0 }, { f: 'Was soll man im Norden mitnehmen?', o: ['einen Regenschirm', 'eine Sonnenbrille', 'Badesachen'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ihr seid Wetterreporter: Sprecht eine Wettervorhersage für morgen für eure Gemeinde. Nutzt eine Wetter-App oder das Fenster.', stufe: 3, karten: [
        { titel: 'Wörter', text: ['sonnig, bewölkt, neblig', 'Regen, Schauer, Gewitter', 'Höchstwerte um … Grad', 'Der Wind kommt aus …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wetter oder Klima?', punkte: ['**Wetter**: heute, an einem Ort', '**Klima**: Durchschnitt über **viele Jahre**', 'Luxemburg: **gemäßigtes** Klima'] },
         { titel: 'Messen', punkte: ['**Thermometer** → Temperatur (°C)', '**Regenmesser** → Niederschlag (mm)', '**Windfahne** → Windrichtung', 'Ein **Westwind** kommt **aus** Westen.'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Baut einen Regenmesser und messt eine Woche lang den Regen.', stufe: 2,
        frage: 'Wie viel Regen fällt in einer Woche an unserer Schule?',
        material: ['eine leere Plastikflasche (1,5 l)', 'eine Schere', 'ein Lineal', 'wasserfester Stift', 'Steine'],
        schritte: ['Schneidet das obere Drittel der Flasche ab. Mit Hilfe eines Erwachsenen!', 'Legt Steine in den Boden, damit die Flasche nicht umfällt.', 'Steckt das Oberteil umgedreht als Trichter hinein.', 'Gießt Wasser ein, bis die Steine bedeckt sind. Klebt das Lineal außen an: Die 0 liegt genau an dieser Wasserlinie.', 'Stellt die Flasche frei auf. Lest jeden Tag zur gleichen Zeit ab und gießt danach bis zur 0-Linie zurück.'],
        loesung: { vermutung: 'z. B. Es regnet etwa 10 mm in einer Woche.', beobachtung: 'z. B. Mo 2 mm, Di 0 mm, Mi 5 mm, Do 0 mm, Fr 3 mm', ergebnis: 'z. B. In dieser Woche fielen 10 mm Regen, also 10 Liter pro Quadratmeter.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Wettervorhersage für das Wochenende für Luxemburg – zum Vorlesen im Radio.', stufe: 2,
        anfaenge: ['Und nun das Wetter für das Wochenende.', 'Am Samstag …', 'Am Sonntag …', 'Unser Tipp: …'], zeilen: 7,
        beispiel: 'Und nun das Wetter für das Wochenende. Am Samstag ist es sonnig und mild, bis 18 Grad im Süden und 15 Grad im Ösling. Am Sonntag ziehen Wolken auf, und am Nachmittag gibt es Schauer. Der Wind kommt aus Südwesten. Unser Tipp: Samstag ist der perfekte Tag für eine Radtour!' },
    ],
    check: ['Ich unterscheide Wetter und Klima.', 'Ich nenne Messgeräte für Temperatur, Regen und Wind.', 'Ich verstehe eine Wettervorhersage.'],
  },
  // ================================================================ 5
  {
    thema: 'Wasser · fest, flüssig, gasförmig · Kreislauf', titel: 'Wasser verwandelt sich', untertitel: 'Eis, Wasser, Dampf: Du beobachtest, wie Wasser seinen Zustand ändert, beschriftest den Wasserkreislauf und hörst, warum Pfützen verschwinden.',
    ziel: { de: 'Ich beschreibe die drei Zustände des Wassers und den Wasserkreislauf.', fr: 'Je décris les trois états de l’eau et le cycle de l’eau.' },
    bild: ['lea:ueberrascht:stehen', 'yusuf:froh:erklaeren'],
    start: {
      was: 'Wasser überall',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Fest, flüssig oder gasförmig? Kreuze an.', stufe: 1, kopf: ['', 'fest', 'flüssig', 'gasförmig'], breiten: [40, 20, 20, 20], zeilen: [['Eiswürfel', '[x]', '', ''], ['Regen', '', '[x]', ''], ['Wasserdampf über dem Kochtopf', '', '', '[x]'], ['Schnee', '[x]', '', ''], ['Wasser aus dem Hahn', '', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Ein Stoff – drei Zustände',
      absaetze: [
        'Wasser kann **fest** sein (Eis, Schnee), **flüssig** (Wasser) oder **gasförmig** (Wasserdampf). Das nennt man die drei **Aggregatzustände**. Ob Wasser fest, flüssig oder gasförmig ist, hängt von der **Temperatur** ab.',
        '### Schmelzen, gefrieren, verdampfen',
        'Bei **0 °C** schmilzt Eis zu Wasser – oder Wasser gefriert zu Eis. Bei **100 °C** kocht Wasser und verwandelt sich in Dampf. Aber auch ohne Kochen verschwindet Wasser langsam: Eine Pfütze trocknet in der Sonne. Das Wasser **verdunstet** und wird unsichtbarer Wasserdampf in der Luft. Kühlt der Dampf ab, wird er wieder zu Tröpfchen: Das sieht man an einem beschlagenen Spiegel oder an Wolken. Das heißt **kondensieren**.',
        '### Der Wasserkreislauf',
        'Die Sonne lässt Wasser aus Meeren, Seen und Pflanzen **verdunsten**. Oben in der kühlen Luft **kondensiert** es zu **Wolken**. Aus den Wolken fällt **Niederschlag**. Das Wasser **fließt** in Bächen und Flüssen zurück ins Meer oder **versickert** im Boden. Dann beginnt alles von vorn – seit Millionen Jahren.',
      ],
      bildHtml: wasserkreislauf({ breite: 110 }),
      woerter: [['fest / flüssig / gasförmig', 'solide / liquide / gazeux'], ['schmelzen', 'fondre'], ['gefrieren', 'geler'], ['verdunsten', 's’évaporer'], ['kondensieren', 'se condenser'], ['der Wasserdampf', 'la vapeur d’eau'], ['der Wasserkreislauf', 'le cycle de l’eau'], ['versickern', 's’infiltrer']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte den Wasserkreislauf im Lesetext.', stufe: 1, html: '', liste: [['1', 'Verdunstung'], ['2', 'Wolken (Kondensation)'], ['3', 'Niederschlag'], ['4', 'Abfluss im Fluss / Versickern']], spalten: 2 },
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 2, saetze: ['Bei [0] °C gefriert Wasser zu Eis.', 'Bei [100] °C kocht Wasser.', 'Eine Pfütze trocknet, weil das Wasser [verdunstet].', 'Am kalten Spiegel wird Dampf wieder zu Tröpfchen: Er [kondensiert].'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulhof · nach dem Regen', titel: 'Wo ist die Pfütze hin?',
      situation: 'Am Morgen war auf dem Schulhof eine große Pfütze. Am Nachmittag ist sie weg.',
      bild: ['lea:verwirrt:stehen', 'yusuf:froh:erklaeren'], sprecher: { Lea: 'w3', Yusuf: 'm3' },
      text: [
        ['Lea', 'Yusuf, heute Morgen war hier eine riesige Pfütze. Jetzt ist sie weg. Hat jemand sie aufgewischt?'],
        ['Yusuf', 'Nein! Die Sonne hat sie „aufgewischt“. Das Wasser ist verdunstet.'],
        ['Lea', 'Aber es hat doch gar nicht gekocht. Es waren nur zwölf Grad.'],
        ['Yusuf', 'Wasser muss nicht kochen, um zu verdunsten. Es geht nur langsamer. Bei Wind und Sonne geht es schneller. Darum trocknet Wäsche draußen.'],
        ['Lea', 'Und wo ist das Wasser jetzt?'],
        ['Yusuf', 'In der Luft, als unsichtbarer Wasserdampf. Später kann es eine Wolke werden – und irgendwo wieder als Regen herunterfallen.'],
        ['Lea', 'Vielleicht trinke ich nächste Woche mein Pfützenwasser!'],
        ['Yusuf', 'Gut möglich – aber vorher wird es zum Glück im Wasserwerk gereinigt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wann trocknet Wäsche am schnellsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['bei Sonne und Wind', 'bei Nebel', 'im kalten Keller'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Jemand hat die Pfütze aufgewischt.', false], ['Wasser verdunstet auch, ohne zu kochen.', true], ['Bei Wind verdunstet Wasser langsamer.', false], ['Der Wasserdampf ist unsichtbar.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erzählt die Reise eines Wassertropfens: vom Meer in die Wolke, in den Regen, in den Fluss … Jeder sagt einen Satz.', stufe: 2, karten: [
        { titel: 'Wörter', text: ['verdunsten', 'kondensieren', 'regnen', 'fließen', 'versickern'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zustände des Wassers', punkte: ['**fest**: Eis, Schnee (unter 0 °C)', '**flüssig**: Wasser', '**gasförmig**: Wasserdampf (Kochen bei 100 °C)'] },
         { titel: 'Übergänge', punkte: ['fest → flüssig: **schmelzen**', 'flüssig → fest: **gefrieren**', 'flüssig → gasförmig: **verdunsten / verdampfen**', 'gasförmig → flüssig: **kondensieren**'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Führt den Versuch durch.', stufe: 2,
        frage: 'Wo verdunstet Wasser am schnellsten?',
        material: ['3 gleiche Teller', 'Wasser', 'ein Messbecher', 'Platz: Fensterbank in der Sonne, schattiger Schrank, neben der Heizung'],
        schritte: ['Gieße auf jeden Teller genau 50 ml Wasser.', 'Stelle die Teller an drei verschiedene Orte.', 'Schau nach 2, 4 und 6 Stunden nach.', 'Notiere, auf welchem Teller das Wasser zuerst weg ist.'],
        loesung: { vermutung: 'z. B. In der Sonne verdunstet es am schnellsten.', beobachtung: 'z. B. Neben der Heizung und in der Sonne ist das Wasser zuerst weg, im Schrank am langsamsten.', ergebnis: 'Wärme (und Luftbewegung) lässt Wasser schneller verdunsten.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe die Geschichte eines Wassertropfens in der Ich-Form. Benutze die Fachwörter.', stufe: 2,
        anfaenge: ['Ich bin ein Wassertropfen im …', 'Eines Tages wärmt mich die Sonne, und ich …', 'Hoch oben …', 'Dann falle ich …'], zeilen: 9,
        beispiel: 'Ich bin ein Wassertropfen in der Mosel. Eines Tages wärmt mich die Sonne, und ich verdunste. Ich steige als unsichtbarer Dampf in den Himmel. Hoch oben ist es kalt, ich kondensiere und treffe andere Tröpfchen: Wir sind eine Wolke. Dann falle ich als Regen auf einen Wald im Ösling und versickere im Boden. Bald fließe ich in die Sauer – und die Reise beginnt von vorn.' },
    ],
    check: ['Ich nenne die drei Zustände des Wassers.', 'Ich erkläre schmelzen, gefrieren, verdunsten und kondensieren.', 'Ich beschreibe den Wasserkreislauf.'],
  },
  // ================================================================ 6
  {
    thema: 'Strom · Stromkreis · Leiter', titel: 'Es werde Licht!', untertitel: 'Batterie, Kabel, Lampe, Schalter: Du baust einen Stromkreis, testest Leiter und Nichtleiter und lernst, warum die Steckdose gefährlich ist.',
    ziel: { de: 'Ich baue einen einfachen Stromkreis und unterscheide Leiter und Nichtleiter.', fr: 'Je construis un circuit électrique simple et je distingue conducteurs et isolants.' },
    bild: ['tom:froh:stehen', 'nele:ueberrascht:sitzen'],
    start: {
      was: 'Strom im Alltag',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Wofür brauchst du jeden Tag Strom? Ergänze.', stufe: 1, mitte: 'Strom', aeste: ['Licht', 'Handy laden', { l: 'Kühlschrank' }, { l: 'Computer' }, { l: 'Heizung / Warmwasser' }, { l: 'Zug, E-Bus' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      titel: 'Der Stromkreis',
      absaetze: [
        'Damit eine Lampe leuchtet, muss **Strom** fließen. Strom fließt nur, wenn der Weg ein **geschlossener Kreis** ist: von der **Batterie** durch ein **Kabel** zur **Lampe** und durch ein zweites Kabel zurück zur Batterie. Das nennt man einen **Stromkreis**.',
        'Mit einem **Schalter** kann man den Kreis öffnen und schließen. Ist der Schalter offen, ist der Weg unterbrochen: Die Lampe bleibt dunkel. Ist er geschlossen, fließt der Strom und die Lampe leuchtet.',
        '### Leiter und Nichtleiter',
        'Strom fließt gut durch **Metalle** wie Kupfer, Eisen oder Alu. Das sind **Leiter**. Kunststoff, Holz, Glas oder Gummi lassen Strom nicht durch. Das sind **Nichtleiter** (Isolatoren). Darum ist ein Kabel innen aus Kupfer und außen aus Kunststoff.',
        '### Achtung, Lebensgefahr!',
        'Eine kleine Batterie hat 4,5 Volt – damit kann man gefahrlos experimentieren. Aus der **Steckdose** kommen aber **230 Volt**. Das kann tödlich sein. **Niemals** mit Steckdosen, kaputten Kabeln oder Oberleitungen von Zügen experimentieren!',
      ],
      bildHtml: stromkreis({ geschlossen: true, breite: 82 }),
      woerter: [['der Strom', 'le courant électrique'], ['der Stromkreis', 'le circuit électrique'], ['die Batterie', 'la pile'], ['das Kabel', 'le câble'], ['der Schalter', 'l’interrupteur'], ['der Leiter', 'le conducteur'], ['der Nichtleiter (Isolator)', 'l’isolant'], ['die Steckdose', 'la prise de courant']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte den Stromkreis im Lesetext.', stufe: 1, html: '', liste: [['1', 'die Batterie'], ['2', 'der Schalter'], ['3', 'die Lampe'], ['4', 'das Kabel']], spalten: 2 },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 2, fragen: [{ f: 'Warum leuchtet die Lampe nicht, wenn der Schalter offen ist?', o: ['Der Stromkreis ist unterbrochen.', 'Die Batterie ist leer.', 'Die Lampe ist zu klein.'], r: 0 }, { f: 'Wie viel Volt kommen aus der Steckdose?', o: ['4,5 Volt', '230 Volt', '12 Volt'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Technikraum · Projektwoche', titel: 'Warum leuchtet sie nicht?',
      situation: 'Tom und Nele bauen eine Taschenlampe. Aber die Lampe bleibt dunkel.',
      bild: ['tom:verwirrt:stehen', 'nele:froh:sitzen'], sprecher: { Tom: 'm3', Nele: 'w3', 'Herr Kuedes': 'm1' },
      text: [
        ['Tom', 'Ich habe alles verbunden, aber die Lampe bleibt dunkel. So ein Mist!'],
        ['Nele', 'Lass uns den Weg des Stroms verfolgen. Von der Batterie … zum Schalter … zur Lampe … und zurück zur Batterie?'],
        ['Tom', 'Oh. Das zweite Kabel hängt in der Luft. Es ist gar nicht an der Batterie.'],
        ['Nele', 'Dann ist der Kreis nicht geschlossen. Mach es fest.'],
        ['Tom', 'Okay … immer noch dunkel!'],
        ['Herr Kuedes', 'Habt ihr den Schalter geschlossen? Und ist die Lampe fest eingeschraubt?'],
        ['Nele', 'Der Schalter! Tom, drück mal.'],
        ['Tom', 'Sie leuchtet! Wir sind Genies.'],
        ['Herr Kuedes', 'Ihr habt systematisch gesucht – so machen das auch Elektrikerinnen und Elektriker.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum könnte eine Taschenlampe nicht leuchten? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Die Batterie ist leer.', 'Ein Kabel ist lose.', 'Der Schalter ist offen.', 'Die Lampe ist kaputt.'], r: [0, 1, 2, 3] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Was haben Tom und Nele der Reihe nach gemacht? Ordne.', stufe: 1, teile: ['Sie verfolgen den Weg des Stroms.', 'Tom merkt: Ein Kabel hängt in der Luft.', 'Tom macht das Kabel fest.', 'Sie schließen den Schalter.', 'Die Lampe leuchtet.'], ordnung: [2, 0, 4, 1, 3] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erstellt eine Checkliste „Fehlersuche im Stromkreis“.', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Ist der Kreis geschlossen?', 'Ist der Schalter zu?', 'Ist die Batterie voll?', 'Ist die Lampe fest?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Stromkreis', punkte: ['Strom fließt nur im **geschlossenen** Kreis.', 'Teile: **Batterie, Kabel, Lampe, Schalter**', 'Schalter offen → Lampe aus'] },
         { titel: 'Leiter und Nichtleiter', punkte: ['**Leiter**: Metalle (Kupfer, Eisen, Alu)', '**Nichtleiter**: Kunststoff, Holz, Glas, Gummi', 'Kabel: innen Leiter, außen Nichtleiter'] }],
        [{ art: 'achtung', titel: 'Lebensgefahr', text: '**230 Volt** aus der Steckdose können töten. Experimentiere **nur mit Batterien**. Fass keine kaputten Kabel an und halte Abstand von Oberleitungen.' }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Testet verschiedene Gegenstände: Leiter oder Nichtleiter?', stufe: 2,
        frage: 'Welche Stoffe leiten Strom?',
        material: ['Batterie (4,5 V)', '3 Kabel mit Klemmen', 'eine kleine Lampe', 'Testgegenstände: Büroklammer, Radiergummi, Alufolie, Holzstab, Münze, Plastiklineal, Bleistiftmine'],
        schritte: ['Baut einen Stromkreis mit einer Lücke zwischen zwei Klemmen.', 'Haltet einen Gegenstand in die Lücke.', 'Leuchtet die Lampe? Dann ist der Gegenstand ein Leiter.', 'Tragt alle Ergebnisse in eine Tabelle ein.'],
        beobZeilen: 4,
        loesung: { vermutung: 'z. B. Alles aus Metall leitet Strom.', beobachtung: 'Leiter: Büroklammer, Alufolie, Münze, Bleistiftmine (Graphit). Nichtleiter: Radiergummi, Holzstab, Plastiklineal.', ergebnis: 'Metalle leiten Strom – und überraschend auch Graphit. Kunststoff, Gummi und Holz leiten nicht.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe fünf Sicherheitsregeln für den Umgang mit Strom zu Hause.', stufe: 2,
        anfaenge: ['1. Ich …', '2. Ich fasse nie …', '3. …', '4. …', '5. …'], zeilen: 7,
        beispiel: '1. Ich stecke nie etwas in die Steckdose. 2. Ich fasse nie kaputte Kabel an. 3. Ich benutze keine Elektrogeräte mit nassen Händen oder in der Badewanne. 4. Ich ziehe den Stecker am Stecker, nicht am Kabel. 5. Ich klettere nie auf Strommasten oder Zugwaggons.' },
    ],
    check: ['Ich baue einen einfachen Stromkreis.', 'Ich unterscheide Leiter und Nichtleiter.', 'Ich kenne die Gefahren von Strom aus der Steckdose.'],
  },
  // ================================================================ 7
  {
    thema: 'Handy · Passwörter · Privatsphäre', titel: 'Mein Handy, meine Daten', untertitel: 'Sichere Passwörter, Privatsphäre-Einstellungen, persönliche Daten: Du lernst, dich und dein Handy zu schützen.',
    ziel: { de: 'Ich erstelle ein sicheres Passwort und schütze meine persönlichen Daten.', fr: 'Je crée un mot de passe sûr et je protège mes données personnelles.' },
    bild: ['chloe:besorgt:handy', 'lio:froh:handy'],
    start: {
      was: 'Was ist privat?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Darf man das öffentlich posten? Kreuze an.', stufe: 1, kopf: ['', 'eher ja', 'nein'], breiten: [60, 20, 20], zeilen: [['ein Foto von meinem Kunstprojekt', '[x]', ''], ['meine Adresse', '', '[x]'], ['mein Passwort', '', '[x]'], ['dass ich Basketball mag', '[x]', ''], ['wann ich allein zu Hause bin', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Ratgeber', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Ratgeber (vereinfacht; Hilfe in Luxemburg: BEE SECURE Helpline 8002 1234)', titel: 'Fünf Schutzschilde für dein Handy',
      absaetze: [
        '### 1. Ein starkes Passwort',
        'Ein gutes Passwort ist **lang** (mindestens 12 Zeichen) und schwer zu erraten. Nimm nicht deinen Namen, dein Geburtsdatum oder „123456“. Ein Trick: Bilde einen Satz und nimm die Anfangsbuchstaben – „Mein Hund Bello frisst jeden Abend gern 3 Würstchen mit Senf!“ wird zu **MHBfjAg3WmS!**. Noch besser: mehrere zufällige Wörter.',
        '### 2. Das Passwort bleibt geheim',
        'Gib dein Passwort **niemandem** – auch nicht der besten Freundin. Und nimm für jede App ein **anderes** Passwort.',
        '### 3. Privat einstellen',
        'In den **Einstellungen** sozialer Netzwerke kannst du wählen, wer deine Beiträge sieht. Am sichersten: nur Freunde, die du auch wirklich kennst.',
        '### 4. Weniger ist mehr',
        'Teile keine **Adresse**, keine Telefonnummer und keinen **Standort** öffentlich. Was einmal im Netz ist, kann man oft nicht mehr löschen.',
        '### 5. Hilfe holen',
        'Wenn dich jemand online bedroht, erpresst oder belästigt: Mach **Screenshots**, blockiere die Person und sprich mit einer Vertrauensperson. In Luxemburg hilft die **BEE SECURE Helpline** kostenlos: 8002 1234.',
      ],
      woerter: [['das Passwort', 'le mot de passe'], ['die Privatsphäre', 'la vie privée'], ['die Einstellungen', 'les paramètres'], ['der Standort', 'la localisation'], ['löschen', 'effacer, supprimer'], ['blockieren', 'bloquer'], ['bedrohen', 'menacer'], ['der Screenshot', 'la capture d’écran']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Sicher oder unsicher? Kreuze an und begründe kurz.', stufe: 2, kopf: ['Passwort', 'sicher', 'unsicher', 'warum?'], breiten: [28, 12, 12, 48], zeilen: [['123456', '', '[x]', '[zu kurz, sehr bekannt]'], ['lina2013', '', '[x]', '[Name und Geburtsjahr]'], ['Tisch-Regen-Kakao-Zebra', '[x]', '', '[lang, zufällige Wörter]'], ['MHBfjAg3WmS!', '[x]', '', '[lang, Satz-Trick mit Zahl und Zeichen]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · Klassenzimmer', titel: 'Hast du mein Passwort?',
      situation: 'Chloé ist verzweifelt: Jemand hat in ihrem Namen gemeine Nachrichten verschickt.',
      bild: ['chloe:besorgt:handy', 'lio:ruhig:handy'], sprecher: { 'Chloé': 'w3', Lio: 'm3' },
      text: [
        ['Chloé', 'Lio, jemand hat von meinem Konto aus gemeine Sachen an Mia geschickt. Das war ich nicht!'],
        ['Lio', 'Oh nein. Wer kennt dein Passwort?'],
        ['Chloé', 'Nur Jana. Wir haben letzten Monat die Passwörter getauscht, als Freundschaftsbeweis.'],
        ['Lio', 'Hm. Und dein Passwort ist …?'],
        ['Chloé', 'Mein Katzenname und mein Geburtsjahr. Das wissen eigentlich viele.'],
        ['Lio', 'Dann sofort ändern! Ein langes, neues Passwort. Und dann schreib Mia, dass es nicht von dir war.'],
        ['Chloé', 'Und wenn sie mir nicht glaubt?'],
        ['Lio', 'Mach Screenshots und sprich mit Frau Kremer. Und es gibt die BEE SECURE Helpline, die helfen auch.'],
        ['Chloé', 'Okay. Passwörter tauschen war echt keine gute Idee.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Konto“ bei einer App? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein persönlicher Zugang mit Benutzername und Passwort', 'ein Bankkonto mit Geld'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Chloé hat die gemeinen Nachrichten selbst geschrieben.', false], ['Chloé hat ihr Passwort mit Jana getauscht.', true], ['Ihr Passwort war lang und zufällig.', false], ['Lio rät, das Passwort sofort zu ändern.', true]] },
        { art: 'fragen', auftrag: 'Was soll Chloé tun? Nenne drei Dinge.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Passwort sofort ändern, Mia Bescheid sagen, Screenshots machen, mit Frau Kremer oder der BEE SECURE Helpline sprechen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Diskutiert: Ist es ein Freundschaftsbeweis, Passwörter zu tauschen? Was könnte stattdessen Vertrauen zeigen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, Passwörter …', 'Vertrauen zeigt man eher, indem …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Sicheres Passwort', punkte: ['**lang**: mindestens 12 Zeichen', 'keine Namen, kein Geburtsdatum', 'für jede App **ein anderes**', '**niemandem** verraten'] },
         { titel: 'Privat bleiben', punkte: ['Konten auf **privat** stellen', 'keine Adresse, Telefonnummer, kein Standort', 'Bei Problemen: **Screenshot – blockieren – reden**'] }],
        [{ art: 'tipp', titel: 'Hilfe in Luxemburg', text: '**BEE SECURE Helpline: 8002 1234** (kostenlos). Bei Sorgen auch: **116 111**. Im Notfall: **112**.' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Bilde mit dem Satz-Trick ein Passwort. (Benutze es nicht wirklich – denk dir für dich ein anderes aus!)', stufe: 2, kopf: ['Satz', 'Passwort'], breiten: [64, 36], zeilen: [['Im Sommer fahre ich mit Freunden 2 Wochen nach Portugal ans Meer!', '[ISfimF2WnPaM!]'], ['Meine Katze Mimi schläft jeden Tag 14 Stunden auf dem Sofa.', '[MKMsjT14SadS.]'], ['Am Freitag essen wir um 12 Uhr in der Kantine Pizza!', '[AFewu12UidKP!]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Chloé eine Nachricht mit Tipps, damit so etwas nicht wieder passiert.', stufe: 2,
        anfaenge: ['Hey Chloé,', 'das tut mir leid. Mein Tipp: …', 'Außerdem …', 'Wenn wieder etwas passiert, …'], zeilen: 7,
        beispiel: 'Hey Chloé, das tut mir leid. Mein Tipp: Nimm ein langes Passwort aus vier zufälligen Wörtern und sag es niemandem. Außerdem kannst du in den Einstellungen eine Zwei-Faktor-Anmeldung einschalten. Wenn wieder etwas passiert, mach Screenshots und ruf die BEE SECURE Helpline an.' },
    ],
    check: ['Ich erstelle ein sicheres Passwort.', 'Ich weiß, welche Daten privat bleiben sollen.', 'Ich weiß, was ich bei Problemen online tun kann.'],
  },
  // ================================================================ 8
  {
    thema: 'Bilder im Netz · Recht am eigenen Bild · Fakes', titel: 'Echt oder Fake?', untertitel: 'Darf man jedes Foto posten? Ist jedes Bild echt? Du lernst das Recht am eigenen Bild kennen und prüfst Bilder wie eine Detektivin.',
    ziel: { de: 'Ich frage, bevor ich Fotos von anderen poste, und prüfe Bilder auf Fälschungen.', fr: 'Je demande avant de publier des photos des autres et je vérifie si une image est truquée.' },
    bild: ['mia:ueberrascht:handy', 'noah:froh:laptop'],
    start: {
      was: 'Fotos',
      aufgaben: [
        { art: 'mc', auftrag: 'Du hast ein lustiges Foto von deinem Freund beim Essen gemacht. Was tust du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich poste es sofort in der Klassengruppe.', 'Ich frage ihn, ob ich es teilen darf.', 'Ich bearbeite es noch lustiger und poste es.'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, keine Rechtsberatung)', titel: 'Bilder haben Rechte – und manchmal lügen sie',
      absaetze: [
        '### Das Recht am eigenen Bild',
        'Jeder Mensch darf grundsätzlich selbst bestimmen, ob Fotos oder Videos von ihm veröffentlicht werden. Das nennt man das **Recht am eigenen Bild**. Wer ein Foto von einer anderen Person posten will, muss sie **vorher fragen**. Peinliche oder verletzende Bilder zu verschicken kann sehr wehtun – und kann sogar verboten sein.',
        '### Bilder können täuschen',
        'Mit Apps kann man heute Fotos leicht verändern: Gesichter glätten, Personen einfügen oder ganze Bilder mit **künstlicher Intelligenz** erfinden. Manche Fakes sind lustig, andere sollen Menschen **täuschen** oder Angst machen.',
        '### So prüfst du ein Bild',
        'Schau genau hin: Sind Hände, Schatten oder Schrift seltsam? Wer hat das Bild zuerst veröffentlicht – eine bekannte Zeitung oder ein unbekanntes Konto? Mit einer **Bilder-Rückwärtssuche** im Internet kannst du herausfinden, wo ein Bild schon vorher aufgetaucht ist. Und: Wenn ein Bild dich sehr wütend oder ängstlich macht, **warte**, bevor du es teilst.',
      ],
      woerter: [['das Recht am eigenen Bild', 'le droit à l’image'], ['veröffentlichen', 'publier'], ['verletzend', 'blessant'], ['die Fälschung (der Fake)', 'le faux, le trucage'], ['täuschen', 'tromper'], ['die künstliche Intelligenz (KI)', 'l’intelligence artificielle (IA)'], ['die Rückwärtssuche', 'la recherche inversée'], ['teilen', 'partager']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Man darf jedes Foto von anderen ohne Fragen posten.', false], ['Mit KI kann man ganze Bilder erfinden.', true], ['Seltsame Hände oder Schatten können ein Hinweis auf einen Fake sein.', true], ['Ein Bild, das mich sehr wütend macht, teile ich sofort.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Medienprojekt · Computerraum', titel: 'Der Hai auf der Autobahn',
      situation: 'Mia hat ein unglaubliches Bild bekommen. Noah prüft es mit ihr.',
      bild: ['mia:ueberrascht:handy', 'noah:froh:laptop'], sprecher: { Mia: 'w3', Noah: 'm3' },
      text: [
        ['Mia', 'Noah, schau! Ein Hai schwimmt auf einer überfluteten Autobahn! Das muss ich allen schicken!'],
        ['Noah', 'Warte mal. Woher hast du das?'],
        ['Mia', 'Aus einer Gruppe. Jemand hat geschrieben: „Heute bei uns!“'],
        ['Noah', 'Lass uns eine Rückwärtssuche machen. Ich lade das Bild hoch … Schau: Das Bild gibt es schon seit vielen Jahren, mit immer anderen Städtenamen.'],
        ['Mia', 'Also ist es ein Fake?'],
        ['Noah', 'Ja. Jemand hat den Hai in ein anderes Foto eingefügt. Siehst du? Die Wellen um den Hai passen nicht zum restlichen Wasser.'],
        ['Mia', 'Puh. Fast hätte ich es an dreißig Leute geschickt.'],
        ['Noah', 'Dann wärst du ein Teil der Kette geworden. Ein Fake lebt davon, dass Menschen ihn weiterschicken.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Bilder-Rückwärtssuche? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie zeigt, wo ein Bild schon im Internet aufgetaucht ist.', 'Sie macht ein Bild schöner.', 'Sie löscht ein Bild.'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Wie prüfen Mia und Noah das Bild? Ordne.', stufe: 1, teile: ['Mia bekommt ein unglaubliches Bild.', 'Noah fragt, woher das Bild kommt.', 'Sie machen eine Rückwärtssuche.', 'Sie sehen: Das Bild gibt es schon seit Jahren.', 'Mia schickt das Bild nicht weiter.'], ordnung: [3, 0, 4, 1, 2] },
        { art: 'fragen', auftrag: 'Woran erkennt Noah den Fake auf dem Bild?', stufe: 2, fragen: [{ f: '', l: 'Die Wellen um den Hai passen nicht zum restlichen Wasser.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Habt ihr schon einmal einen Fake gesehen oder fast weitergeschickt? Erzählt, wenn ihr wollt.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich habe einmal ein Bild gesehen, das …', 'Ich habe gemerkt, dass …', 'Heute würde ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fotos von anderen', punkte: ['**Vorher fragen**, dann posten.', 'Keine peinlichen oder verletzenden Bilder.', 'Wer „Nein“ sagt, meint Nein.'] },
         { titel: 'Bild-Check', nummern: true, punkte: ['**Genau hinschauen**: Hände, Schatten, Schrift', '**Quelle** prüfen: Wer hat es gepostet?', '**Rückwärtssuche** machen', '**Warten**, bevor du teilst'] }],
      ],
    },
    ueben: [
      { art: 'dilemma', auftrag: 'Was tust du?', stufe: 3,
        geschichte: 'In der Klassengruppe macht ein Foto die Runde: Ein Mitschüler ist beim Sport hingefallen, sein Gesicht sieht lustig aus. Alle schicken lachende Smileys. Du weißt, dass er das Foto nicht mag.',
        frage: 'Wie reagierst du?', optionen: ['Ich schicke auch einen Smiley, damit ich nicht auffalle.', 'Ich schreibe in die Gruppe, dass man das Foto löschen soll.', 'Ich schreibe dem Mitschüler privat und rede mit einer Lehrkraft.'],
        hinweis: 'Antwort 2 und 3 schützen den Mitschüler. Man kann auch beides tun. Wer mitlacht, macht das Leid größer. Hilfe: BEE SECURE Helpline 8002 1234, 116 111.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Anleitung „So erkennst du einen Fake“ für jüngere Kinder.', stufe: 2,
        anfaenge: ['Nicht alles, was du im Internet siehst, ist echt.', '1. …', '2. …', '3. …', 'Und denk daran: …'], zeilen: 8,
        beispiel: 'Nicht alles, was du im Internet siehst, ist echt. 1. Schau genau hin: Sind Hände oder Schatten komisch? 2. Frag dich: Wer hat das Bild gepostet? 3. Mach mit einem Erwachsenen eine Rückwärtssuche. Und denk daran: Wenn du unsicher bist, schick es nicht weiter!' },
    ],
    check: ['Ich frage, bevor ich Fotos von anderen poste.', 'Ich nenne Hinweise auf gefälschte Bilder.', 'Ich weiß, wie eine Rückwärtssuche hilft.'],
  },
]
