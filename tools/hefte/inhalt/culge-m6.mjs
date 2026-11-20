// Culture générale · Modul 6 (6P) – Schwerpunkt Geografie, Physik/Technik, Medien
// (MENJE-Leitfaden Voie de préparation: Module 3, 6, 9). Themen: Europa (Länder, Hauptstädte), Europäische Union,
// Magnetismus (Versuch), Schwimmen und Sinken (Versuch), Energie und Pumpspeicherwerk Vianden, Licht und Schatten (Versuch),
// Werbung erkennen, meine Daten im Netz. Zahlen gerundet, Rechtliches „Stand 2026“. Personen der Dialoge: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { europaKarte } from './karten.mjs'
import { magnet, schatten, pumpspeicher, knetboot } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 6, {
  titel: 'Europa entdecken – Natur und Technik verstehen',
  titelFr: 'Découvrir l’Europe – comprendre la nature et la technique',
  unter: 'Länder und Hauptstädte, die Europäische Union, Magnete, Schwimmen und Sinken, Energie, Licht und Schatten – und wie man Werbung und Datenfallen erkennt. In acht Lektionen.',
  unterFr: 'Pays et capitales, l’Union européenne, aimants, flotter et couler, énergie, lumière et ombre, publicité et données.',
  farbe: '#2f6db5',
  karten: true,
  deckbild: ['amira:froh:stehen-zeigen', 'finn:froh:stehen', 'lehrerin:froh:erklaeren'],
  blasen: [{ t: 'Bonjour, Europa!', x: 12, y: 108 }, { t: 'Es schwimmt!', x: 130, y: 96 }, { t: '#Werbung?', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'Europa', fr: 'L’Europe' }, icon: 'world', lektionen: 2 },
    { titel: { de: 'Natur und Technik', fr: 'Nature et technique' }, icon: 'flask', lektionen: 4 },
    { titel: { de: 'Medien', fr: 'Médias' }, icon: 'device-mobile', lektionen: 2 },
  ],
})

const EUROPA_NAMEN = ['Portugal', 'Spanien', 'Frankreich', 'Irland', 'Vereinigtes Königreich', 'Deutschland', 'Italien', 'Polen', 'Schweden', 'Norwegen', 'Finnland', 'Griechenland', 'Rumänien', 'Ukraine']

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Europa · Länder · Hauptstädte', titel: 'Ein Kontinent – viele Länder', untertitel: 'Gebirge, Flüsse, Meere und über 40 Staaten: Du liest die Europakarte, hörst Sprachnachrichten aus drei Partnerschulen und stellst Luxemburg vor.',
    ziel: { de: 'Ich finde wichtige Länder und Hauptstädte Europas auf der Karte.', fr: 'Je situe des pays et des capitales d’Europe sur la carte.' },
    bild: ['amira:froh:stehen-zeigen', 'tom:froh:stehen'],
    start: {
      was: 'Europa im Kopf',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche Länder in Europa kennst du? Schreibe in zwei Minuten so viele auf, wie dir einfallen.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Frankreich, Deutschland, Belgien, Portugal, Italien, Spanien …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Unser Kontinent',
      absaetze: [
        '**Europa** ist einer der sieben Kontinente. Er ist ziemlich klein, aber hier leben viele Menschen auf engem Raum. Europa hat **über 40 Staaten** – große wie Frankreich und kleine wie Luxemburg, Malta oder Liechtenstein. Im Osten reicht Europa bis zum **Uralgebirge** in Russland.',
        '### Meere, Gebirge, Flüsse',
        'Europa ist auf drei Seiten von Wasser umgeben: im Westen der **Atlantische Ozean**, im Norden die **Nordsee** und die **Ostsee**, im Süden das **Mittelmeer**. Das bekannteste Gebirge sind die **Alpen**. Ihr höchster Berg ist der **Mont Blanc** mit etwa 4800 Metern. Lange Flüsse sind der **Rhein**, der in die Nordsee fließt, und die **Donau**: Sie fließt durch zehn Länder bis ins Schwarze Meer.',
        '### Viele Sprachen',
        'In Europa spricht man sehr viele Sprachen. Darum sind Menschen, die mehrere Sprachen können, in Europa sehr gefragt – so wie viele in Luxemburg!',
      ],
      bildHtml: europaKarte({ namen: EUROPA_NAMEN, hauptstaedte: ['Luxemburg'], breite: 128, legende: 'Europa (Ausschnitt). Der rote Punkt: die Stadt Luxemburg.' }),
      woerter: [['der Kontinent', 'le continent'], ['der Staat', 'l’État'], ['die Hauptstadt', 'la capitale'], ['das Gebirge', 'la montagne, la chaîne de montagnes'], ['der Fluss', 'le fleuve, la rivière'], ['das Mittelmeer', 'la (mer) Méditerranée'], ['die Ostsee', 'la (mer) Baltique'], ['die Sprache', 'la langue']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Europa hat über [40] Staaten.', 'Im Süden liegt das [Mittelmeer].', 'Der höchste Berg der Alpen ist der [Mont Blanc].', 'Die [Donau] fließt durch zehn Länder.'] },
        { art: 'mc', auftrag: 'Schau auf die Karte. Welches Land liegt zwischen Frankreich und Portugal?', stufe: 2, fragen: [{ f: '', o: ['Spanien', 'Italien', 'Polen'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Sprachnachrichten', wo: 'Schulprojekt · drei Partnerschulen', titel: 'Hallo aus Europa!',
      situation: 'Die Klasse hat Partnerschulen in drei Ländern. Die Jugendlichen dort lernen Deutsch und schicken Sprachnachrichten.',
      bild: ['chloe:froh:handy', 'noah:froh:handy'], sprecher: { Inês: 'w2', Kuba: 'm3', Elsa: 'w3' },
      text: [
        ['Inês', 'Olá! Ich heiße Inês und wohne in Lissabon, der Hauptstadt von Portugal. Lissabon liegt am Atlantik. Hier ist es fast immer warm. Am Wochenende gehe ich gern surfen. Unser Lieblingsessen ist Fisch mit Kartoffeln.'],
        ['Kuba', 'Cześć! Ich bin Kuba aus Krakau in Polen. Krakau ist nicht die Hauptstadt – das ist Warschau. Bei uns ist es im Winter oft minus zehn Grad! Ich spiele Handball. Mein Onkel arbeitet übrigens in Luxemburg.'],
        ['Elsa', 'Hej! Ich bin Elsa aus Schweden. Ich wohne in der Nähe von Stockholm, der Hauptstadt. Im Sommer ist es hier fast die ganze Nacht hell, im Winter ist es schon um drei Uhr nachmittags dunkel. Ich fahre gern Ski und schwimme in den Seen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „Hallo“ auf Portugiesisch? Rate!', stufe: 1, fragen: [{ f: '', o: ['Olá', 'Hej', 'Cześć'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Land', 'Hauptstadt', 'Hobby'], breiten: [16, 24, 26, 34], zeilen: [['Inês', '[Portugal]', '[Lissabon]', '[surfen]'], ['Kuba', '[Polen]', '[Warschau]', '[Handball]'], ['Elsa', '[Schweden]', '[Stockholm]', '[Ski fahren, schwimmen]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Kuba wohnt in der Hauptstadt von Polen.', false], ['In Schweden ist es im Sommer fast die ganze Nacht hell.', true], ['Lissabon liegt am Mittelmeer.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Partnerschule würdet ihr gern besuchen? Warum? Erzählt euch gegenseitig.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde gern nach … fahren, weil …', 'Dort kann man …', 'Ich möchte … probieren.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Europa', punkte: ['über **40 Staaten**', 'Meere: **Atlantik, Nordsee, Ostsee, Mittelmeer**', 'Gebirge: **Alpen** (Mont Blanc, etwa 4800 m)', 'Flüsse: **Rhein, Donau**'] },
         { titel: 'Hauptstädte', punkte: ['Frankreich – **Paris**', 'Deutschland – **Berlin**', 'Belgien – **Brüssel**', 'Portugal – **Lissabon**', 'Italien – **Rom** · Spanien – **Madrid**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wie heißen die Länder? Schreibe die Namen zu den Nummern.', stufe: 2,
        html: europaKarte({ nummern: ['Frankreich', 'Deutschland', 'Belgien', 'Niederlande', 'Spanien', 'Portugal', 'Italien', 'Polen', 'Schweden', 'Griechenland'], hauptstaedte: ['Luxemburg'], breite: 140 }),
        liste: [['1', 'Frankreich'], ['2', 'Deutschland'], ['3', 'Belgien'], ['4', 'Niederlande'], ['5', 'Spanien'], ['6', 'Portugal'], ['7', 'Italien'], ['8', 'Polen'], ['9', 'Schweden'], ['10', 'Griechenland']], spalten: 2,
        hilfe: 'Länder: Belgien · Deutschland · Frankreich · Griechenland · Italien · Niederlande · Polen · Portugal · Schweden · Spanien' },
      { art: 'zuordnen', auftrag: 'Land und Hauptstadt: Verbinde.', stufe: 2, links: ['Niederlande', 'Spanien', 'Griechenland', 'Österreich', 'Irland'], rechts: ['Amsterdam', 'Madrid', 'Athen', 'Wien', 'Dublin'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Sprachnachricht an eine Partnerschule: Stell Luxemburg vor (Lage, Nachbarländer, Sprachen, etwas Typisches).', stufe: 2,
        anfaenge: ['Moien! Ich wohne in Luxemburg.', 'Luxemburg liegt …', 'Bei uns spricht man …', 'Typisch für Luxemburg ist …'], zeilen: 8,
        beispiel: 'Moien! Ich wohne in Luxemburg. Luxemburg liegt mitten in Europa, zwischen Belgien, Deutschland und Frankreich. Bei uns spricht man Luxemburgisch, Französisch und Deutsch, und viele sprechen auch Portugiesisch oder Englisch. Typisch für Luxemburg sind die Burgen, die Kasematten und die Schobermesse. Bus und Zug sind bei uns gratis!' },
    ],
    check: ['Ich nenne Meere, Gebirge und Flüsse Europas.', 'Ich finde Länder auf der Europakarte.', 'Ich nenne Hauptstädte.'],
  },
  // ================================================================ 2
  {
    thema: 'Europäische Union · Luxemburg in Europa', titel: 'Die Europäische Union', untertitel: 'Vom Frieden nach dem Krieg bis zum Euro: Du liest die Geschichte der EU, besuchst das Europaviertel auf dem Kirchberg und baust eine Zeitleiste.',
    ziel: { de: 'Ich erkläre, was die EU ist, und welche Rolle Luxemburg in ihr spielt.', fr: 'J’explique ce qu’est l’UE et le rôle du Luxembourg.' },
    bild: ['finn:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Das kennst du schon',
      aufgaben: [
        { art: 'mc', auftrag: 'Was hat mit der Europäischen Union zu tun? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['der Euro', 'die blaue Fahne mit zwölf gelben Sternen', 'ohne Passkontrolle nach Frankreich fahren', 'die Fußball-Weltmeisterschaft'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Vom Krieg zur Zusammenarbeit',
      absaetze: [
        'Nach dem Zweiten Weltkrieg war Europa zerstört. Viele Menschen wollten: **Nie wieder Krieg!** Am **9. Mai 1950** schlug der französische Außenminister **Robert Schuman** vor, dass Länder ihre Kohle und ihren Stahl gemeinsam verwalten. Schuman war übrigens 1886 in Luxemburg geboren. Der 9. Mai ist heute der **Europatag**.',
        '### Sechs Länder fangen an',
        '1951 gründeten sechs Länder die Gemeinschaft für Kohle und Stahl. Ihre wichtigste Behörde hatte ihren Sitz in **Luxemburg**. 1957 unterschrieben dieselben sechs Länder in Rom die **Römischen Verträge**: **Belgien, Deutschland, Frankreich, Italien, Luxemburg** und die **Niederlande**. Daraus wurde später die **Europäische Union (EU)**.',
        '### Die EU heute',
        'Heute hat die EU **27 Mitgliedsländer** mit rund 450 Millionen Menschen (Stand 2026). Die Menschen dürfen in allen EU-Ländern reisen, wohnen, arbeiten und studieren. In über 20 Ländern bezahlt man mit dem **Euro**. In **Luxemburg** arbeiten wichtige EU-Einrichtungen, zum Beispiel der **Gerichtshof der EU** auf dem Kirchberg.',
      ],
      bildHtml: europaKarte({ eu: true, hauptstaedte: ['Luxemburg', 'Belgien', 'Frankreich'], breite: 118, legende: 'Blau: die 27 Länder der EU (Stand 2026). Brüssel, Luxemburg und Straßburg (Frankreich) sind wichtige EU-Städte.' }),
      woerter: [['die Europäische Union (EU)', 'l’Union européenne (UE)'], ['das Mitgliedsland', 'l’État membre'], ['der Vertrag', 'le traité'], ['gründen', 'fonder'], ['der Frieden', 'la paix'], ['die Zusammenarbeit', 'la coopération'], ['der Gerichtshof', 'la Cour de justice'], ['die Grenzkontrolle', 'le contrôle aux frontières']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Warum wollten die Länder nach dem Krieg zusammenarbeiten?', l: 'Sie wollten nie wieder Krieg.' }, { f: 'Welche sechs Länder unterschrieben 1957 die Römischen Verträge?', zeilen: 2, l: 'Belgien, Deutschland, Frankreich, Italien, Luxemburg, die Niederlande' }, { f: 'Wie viele Länder hat die EU heute?', l: '27 (Stand 2026)' }] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Kirchberg · Europaviertel', titel: 'Europa vor der Haustür',
      situation: 'Die Klasse macht einen Ausflug auf den Kirchberg. Eine Stadtführerin erklärt.',
      bild: ['lehrerin:froh:zeigen', 'finn:ueberrascht:stehen'], sprecher: { Führerin: 'w1', Finn: 'm3', Amira: 'w2' },
      text: [
        ['Führerin', 'Willkommen auf dem Kirchberg! Hier vor euch steht der Gerichtshof der Europäischen Union. Er sorgt dafür, dass alle Länder die Regeln der EU gleich anwenden.'],
        ['Finn', 'Und die goldenen Türme?'],
        ['Führerin', 'Darin arbeiten Übersetzerinnen und Übersetzer. Jedes Urteil wird in die Amtssprachen der EU übersetzt – das sind vierundzwanzig Sprachen!'],
        ['Amira', 'Arbeiten hier nur Richter?'],
        ['Führerin', 'Nein. Auf dem Kirchberg arbeiten auch die Europäische Investitionsbank, der Europäische Rechnungshof, der prüft, ob das Geld der EU richtig ausgegeben wird, und viele Menschen für das Europäische Parlament. Und dreimal im Jahr treffen sich hier die Ministerinnen und Minister aller EU-Länder.'],
        ['Finn', 'Dann ist Luxemburg ja eine richtige Europa-Hauptstadt!'],
        ['Führerin', 'Genau. Neben Brüssel und Straßburg ist Luxemburg eine der drei wichtigsten Städte der EU.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht ein Gericht? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es entscheidet bei Streit, was nach den Regeln richtig ist.', 'Es macht Gesetze.', 'Es kocht für die Schule.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Auf dem Kirchberg steht der Gerichtshof der EU.', true], ['In den goldenen Türmen wohnen Richter.', false], ['Die EU hat vierundzwanzig Amtssprachen.', true], ['Der Rechnungshof prüft, ob das Geld der EU richtig ausgegeben wird.', true]] },
        { art: 'fragen', auftrag: 'Welche drei Städte sind die wichtigsten Städte der EU?', stufe: 2, fragen: [{ f: '', l: 'Brüssel, Straßburg, Luxemburg' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was bringt die EU euch im Alltag? Sammelt zu zweit.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Reisen ohne Passkontrolle', 'überall mit dem Euro bezahlen', 'Roaming: im EU-Ausland telefonieren wie zu Hause', 'im Ausland lernen (Erasmus+)'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die EU', punkte: ['Ziel: **Frieden** und Zusammenarbeit', '**1957** Römische Verträge, 6 Gründerländer – mit **Luxemburg**', 'heute **27 Länder** (Stand 2026)', '**9. Mai**: Europatag'] },
         { titel: 'Luxemburg in der EU', punkte: ['**Gerichtshof** der EU', '**Rechnungshof**, Investitionsbank', 'Teile des Parlaments', 'Treffen der Ministerinnen und Minister'] }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Trage die Ereignisse ein. Die Jahre stehen schon da.', stufe: 2, von: 1940, bis: 2030, schritt: 10, hoehe: 100,
        ereignisse: [{ jahr: 1950, text: 'Schuman-Erklärung (9. Mai)', leer: true }, { jahr: 1957, text: 'Römische Verträge: 6 Länder', leer: true }, { jahr: 1985, text: 'Schengen-Abkommen: weniger Grenzkontrollen', leer: true }, { jahr: 2002, text: 'Euro-Münzen und -Scheine', leer: true }, { jahr: 2020, text: 'Großbritannien tritt aus.', leer: true }],
        hilfe: 'Ereignisse: Euro-Münzen und -Scheine · Großbritannien tritt aus · Römische Verträge · Schengen-Abkommen · Schuman-Erklärung' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was ist für dich das Beste an der EU? Begründe in einem kurzen Text.', stufe: 2,
        anfaenge: ['Für mich ist das Beste an der EU, …', 'Zum Beispiel …', 'Ohne die EU …'], zeilen: 7,
        beispiel: 'Für mich ist das Beste an der EU, dass man ohne Passkontrolle reisen kann. Zum Beispiel fahren wir oft nach Trier oder Metz zum Einkaufen. Ohne die EU müssten wir an der Grenze warten, und vielleicht bräuchten wir anderes Geld.' },
    ],
    check: ['Ich erkläre, warum die EU gegründet wurde.', 'Ich nenne die Gründerländer.', 'Ich nenne EU-Einrichtungen in Luxemburg.'],
  },
  // ================================================================ 3
  {
    thema: 'Magnetismus · Kompass (Versuch)', titel: 'Unsichtbare Kräfte', untertitel: 'Was zieht ein Magnet an – und was nicht? Du forschst mit Magneten, lernst Nord- und Südpol kennen und baust einen Kompass.',
    ziel: { de: 'Ich untersuche, welche Stoffe magnetisch sind, und erkläre, wie ein Kompass funktioniert.', fr: 'J’examine quelles matières sont magnétiques et j’explique le fonctionnement d’une boussole.' },
    bild: ['lio:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Vermute!',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was zieht ein Magnet an? Kreuze deine Vermutung an. (Die Lösung findest du im Versuch.)', stufe: 1, kopf: ['Gegenstand', 'ja', 'nein'], breiten: [60, 20, 20], zeilen: [['Büroklammer', '[x]', ''], ['Aluminiumdose', '', '[x]'], ['Radiergummi', '', '[x]'], ['1-Cent-Münze', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      titel: 'Wie Magnete wirken',
      absaetze: [
        'Ein **Magnet** zieht bestimmte Dinge an – sogar durch Papier, Holz oder Wasser hindurch. Die Kraft ist unsichtbar. Man nennt sie **Magnetismus**. Magnete ziehen vor allem Dinge aus **Eisen** an (auch Stahl), außerdem **Nickel** und **Kobalt**. Andere Metalle wie **Aluminium**, **Kupfer**, Gold oder Silber werden **nicht** angezogen.',
        '### Nordpol und Südpol',
        'Jeder Magnet hat zwei **Pole**: einen **Nordpol** und einen **Südpol**. Dort ist die Kraft am stärksten. Bringt man zwei Magnete zusammen, gilt: **Gleiche Pole stoßen sich ab**, **ungleiche Pole ziehen sich an**.',
        '### Die Erde ist ein Magnet',
        'Auch die Erde verhält sich wie ein riesiger Magnet. Darum richtet sich eine frei drehbare Magnetnadel immer in **Nord-Süd-Richtung** aus. So funktioniert ein **Kompass**. Seeleute nutzen ihn seit vielen Hundert Jahren.',
      ],
      bildHtml: magnet({ breite: 100 }),
      woerter: [['der Magnet', 'l’aimant'], ['anziehen', 'attirer'], ['abstoßen', 'repousser'], ['der Pol', 'le pôle'], ['das Eisen', 'le fer'], ['das Kupfer', 'le cuivre'], ['der Kompass', 'la boussole'], ['die Kraft', 'la force']],
      aufgaben: [
        { art: 'mc', auftrag: 'Zwei Magnete: Ziehen sie sich an oder stoßen sie sich ab?', stufe: 1, fragen: [{ f: 'Nordpol und Südpol', o: ['ziehen sich an', 'stoßen sich ab'], r: 0 }, { f: 'Nordpol und Nordpol', o: ['ziehen sich an', 'stoßen sich ab'], r: 1 }, { f: 'Südpol und Südpol', o: ['ziehen sich an', 'stoßen sich ab'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Eine Bastelanleitung', wo: 'Naturwissenschaften · Labor', titel: 'Ein Kompass aus einer Nadel',
      situation: 'Mme Rantini zeigt Lio, wie man einen Kompass selbst baut.',
      bild: ['lehrerin:froh:erklaeren', 'lio:ueberrascht:stehen'], sprecher: { 'Mme Rantini': 'w1', Lio: 'm3' },
      text: [
        ['Mme Rantini', 'Du brauchst eine Nähnadel, einen Magneten, eine flache Korkscheibe und eine Schale mit Wasser.'],
        ['Lio', 'Und jetzt?'],
        ['Mme Rantini', 'Streich mit einem Pol des Magneten etwa dreißigmal über die Nadel. Immer in dieselbe Richtung, vom Öhr zur Spitze. Dann wird die Nadel selbst ein kleiner Magnet.'],
        ['Lio', 'Fertig. Sie zieht sogar eine Büroklammer an!'],
        ['Mme Rantini', 'Prima. Leg die Nadel jetzt vorsichtig auf den Korken und lass ihn auf dem Wasser schwimmen.'],
        ['Lio', 'Er dreht sich … und jetzt bleibt er stehen!'],
        ['Mme Rantini', 'Die Nadel zeigt jetzt in Nord-Süd-Richtung. Vergleich mit dem Kompass auf dem Handy. Aber Achtung: Halte keinen Magneten und kein Handy zu nah daran, sonst wird die Nadel abgelenkt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum lässt man den Korken auf Wasser schwimmen? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['Damit sich die Nadel frei drehen kann.', 'Damit die Nadel nass wird.'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu und ordne die Schritte.', stufe: 1, teile: ['Material bereitlegen: Nadel, Magnet, Korken, Wasser', 'etwa 30-mal mit dem Magneten über die Nadel streichen', 'die Nadel auf den Korken legen', 'den Korken auf dem Wasser schwimmen lassen', 'mit einem Kompass vergleichen'], ordnung: [2, 0, 4, 1, 3] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo braucht man heute noch einen Kompass? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Wandern', 'Segeln', 'Pfadfinder', 'Handy-Karte'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Magnete ziehen an …', punkte: ['**Eisen** (auch Stahl)', '**Nickel**, **Kobalt**', '**nicht**: Aluminium, Kupfer, Holz, Plastik, Glas'] },
         { titel: 'Die Pole', punkte: ['**Nordpol** und **Südpol**', 'gleiche Pole → **abstoßen**', 'ungleiche Pole → **anziehen**', 'Kompass: Nadel zeigt nach **Norden**'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Forscht zu zweit.', stufe: 2,
        frage: 'Welche Gegenstände zieht ein Magnet an?',
        material: ['ein Magnet', 'Büroklammer, Aluminiumdose, Konservendose, Radiergummi, Holzstift, Schlüssel', '1-Cent-Münze und 10-Cent-Münze'],
        schritte: ['Kreuze bei jedem Gegenstand deine Vermutung an.', 'Halte den Magneten an jeden Gegenstand.', 'Notiere: angezogen oder nicht?', 'Vergleiche mit deiner Vermutung.'],
        loesung: { vermutung: 'z. B. Alle Metalle werden angezogen.', beobachtung: 'angezogen: Büroklammer, Konservendose, Schlüssel (meist), 1-Cent-Münze · nicht angezogen: Aluminiumdose, Radiergummi, Holzstift, 10-Cent-Münze', ergebnis: 'Nicht alle Metalle sind magnetisch. Nur Dinge mit Eisen (Stahl), Nickel oder Kobalt werden angezogen. Die 1-Cent-Münze ist aus Stahl mit Kupferschicht.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem jüngeren Kind, wie man mit einer Nadel einen Kompass baut.', stufe: 2,
        anfaenge: ['Du brauchst …', 'Zuerst …', 'Dann …', 'Am Ende …'], zeilen: 7,
        beispiel: 'Du brauchst eine Nadel, einen Magneten, einen Korken und eine Schale mit Wasser. Zuerst streichst du etwa 30-mal mit dem Magneten über die Nadel, immer in dieselbe Richtung. Dann legst du die Nadel auf den Korken. Am Ende lässt du den Korken auf dem Wasser schwimmen. Die Nadel zeigt nach Norden und Süden.' },
    ],
    check: ['Ich nenne Stoffe, die ein Magnet anzieht.', 'Ich erkläre Nord- und Südpol.', 'Ich erkläre, wie ein Kompass funktioniert.'],
  },
  // ================================================================ 4
  {
    thema: 'Schwimmen und Sinken (Versuch)', titel: 'Schwimmt das?', untertitel: 'Warum schwimmt ein Schiff aus Stahl, aber ein Stein geht unter? Du forschst mit Knete und Salzwasser und hörst eine Kapitänin.',
    ziel: { de: 'Ich erkläre, warum manche Dinge schwimmen und andere sinken.', fr: 'J’explique pourquoi certains objets flottent et d’autres coulent.' },
    bild: ['mia:froh:stehen', 'noah:verwirrt:stehen'],
    start: {
      was: 'Schwer = sinkt?',
      aufgaben: [
        { art: 'mc', auftrag: 'Ein riesiger Baumstamm und ein kleiner Nagel kommen ins Wasser. Was passiert? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Der Baumstamm schwimmt, der Nagel sinkt.', 'Beide sinken.', 'Der Baumstamm sinkt, der Nagel schwimmt.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Nicht nur das Gewicht zählt',
      absaetze: [
        'Ob etwas schwimmt, hängt nicht nur davon ab, wie schwer es ist. Ein großer Holzstamm schwimmt, ein kleiner Nagel geht unter. Wichtig ist: Ist ein Gegenstand **leichter** oder **schwerer** als **die gleiche Menge Wasser**? Ein Stück Holz ist leichter als gleich viel Wasser – es **schwimmt**. Ein Stück Eisen ist viel schwerer – es **sinkt**. Forscher sagen dazu: Es kommt auf die **Dichte** an.',
        '### Warum Schiffe schwimmen',
        'Ein Schiff aus Stahl ist innen hohl und voller **Luft**. Es **verdrängt** viel Wasser, also schiebt es viel Wasser zur Seite. Das Wasser drückt von unten gegen das Schiff. Diese Kraft heißt **Auftrieb**. Mit einer Kugel aus Knete kannst du es ausprobieren: Die Kugel sinkt. Formst du aus derselben Knete ein Boot, schwimmt es.',
        '### Salzwasser trägt besser',
        'Im Meer schwimmt man leichter als im Schwimmbad, denn **Salzwasser** ist schwerer als Süßwasser und hat mehr Auftrieb. Im sehr salzigen **Toten Meer** kann man sogar auf dem Wasser liegen und lesen.',
      ],
      bildHtml: knetboot({ breite: 110 }),
      woerter: [['schwimmen', 'flotter'], ['sinken', 'couler'], ['schwer / leicht', 'lourd / léger'], ['die Dichte', 'la masse volumique'], ['verdrängen', 'déplacer'], ['der Auftrieb', 'la poussée (d’Archimède)'], ['hohl', 'creux'], ['das Salzwasser', 'l’eau salée']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Schwere Dinge sinken immer.', false], ['Holz ist leichter als die gleiche Menge Wasser.', true], ['Ein Schiff aus Stahl schwimmt, weil es innen voller Luft ist.', true], ['Im Salzwasser hat man weniger Auftrieb.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Auf der Mosel · Schiffsausflug', titel: 'Die Kapitänin erklärt',
      situation: 'Die Klasse macht einen Ausflug mit einem Ausflugsschiff auf der Mosel. Die Kapitänin beantwortet Fragen.',
      bild: ['mia:froh:stehen', 'noah:ueberrascht:stehen'], sprecher: { Kapitänin: 'w1', Mia: 'w3', Noah: 'm3' },
      text: [
        ['Mia', 'Wie schwer ist dieses Schiff?'],
        ['Kapitänin', 'Ungefähr dreihundert Tonnen. So schwer wie zweihundert Autos.'],
        ['Noah', 'Und warum geht es dann nicht unter?'],
        ['Kapitänin', 'Weil es so breit ist und innen viel Luft hat. Es drückt sehr viel Wasser zur Seite. Und das Wasser drückt mit derselben Kraft von unten zurück. Das ist der Auftrieb.'],
        ['Mia', 'Was ist, wenn ein Loch im Rumpf ist?'],
        ['Kapitänin', 'Dann läuft Wasser hinein, und die Luft wird verdrängt. Darum hat das Schiff mehrere dichte Räume. Wenn einer voll Wasser läuft, schwimmt es trotzdem weiter.'],
        ['Noah', 'Warum tragen wir Schwimmwesten?'],
        ['Kapitänin', 'Die Weste ist mit Schaumstoff oder Luft gefüllt. Sie ist viel leichter als Wasser und hält deinen Kopf über Wasser. Sicherheit geht vor!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist der Rumpf eines Schiffs? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der „Körper“ des Schiffs, der im Wasser liegt', 'das Lenkrad', 'die Fahne'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie schwer ist das Schiff ungefähr?', l: 'etwa 300 Tonnen (so schwer wie 200 Autos)' }, { f: 'Warum geht es nicht unter?', zeilen: 2, l: 'Es ist breit und hat innen viel Luft; es verdrängt viel Wasser; das Wasser drückt von unten zurück (Auftrieb).' }, { f: 'Warum hat das Schiff mehrere dichte Räume?', zeilen: 2, l: 'Wenn einer voll Wasser läuft, schwimmt das Schiff trotzdem weiter.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was schwimmt, was sinkt? Ratet gemeinsam und begründet.', stufe: 2, karten: [
        { titel: 'Gegenstände', text: ['ein Apfel', 'ein Schlüssel', 'eine leere Plastikflasche mit Deckel', 'ein Eiswürfel', 'eine Murmel'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Schwimmen oder sinken?', punkte: ['**leichter** als gleich viel Wasser → **schwimmt**', '**schwerer** als gleich viel Wasser → **sinkt**', 'Es kommt auf die **Dichte** an, nicht nur aufs Gewicht.'] },
         { titel: 'Auftrieb', punkte: ['Wasser drückt von **unten** nach oben.', '**Form** und **Luft** helfen: Boot statt Kugel.', '**Salzwasser** trägt besser.'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Forscht in der Gruppe.', stufe: 2,
        frage: 'Kann man ein Ei zum Schwimmen bringen?',
        material: ['ein rohes Ei', 'ein hohes Glas mit Leitungswasser', 'Salz (etwa 6 Esslöffel)', 'ein Löffel zum Umrühren'],
        schritte: ['Leg das Ei vorsichtig ins Glas mit Leitungswasser.', 'Beobachte.', 'Nimm das Ei heraus. Rühre Löffel für Löffel Salz ins Wasser.', 'Leg das Ei nach jedem Löffel wieder hinein.'],
        loesung: { vermutung: 'z. B. Das Ei sinkt immer.', beobachtung: 'Im Leitungswasser sinkt das Ei. Nach mehreren Löffeln Salz steigt es und schwimmt.', ergebnis: 'Salzwasser ist schwerer als Leitungswasser und hat mehr Auftrieb. Das Ei ist jetzt leichter als die gleiche Menge Salzwasser – es schwimmt.' } },
      { art: 'tabelle', auftrag: 'Schwimmt es oder sinkt es in Leitungswasser? Kreuze an.', stufe: 2, kopf: ['Gegenstand', 'schwimmt', 'sinkt'], breiten: [60, 20, 20], zeilen: [['ein Korken', '[x]', ''], ['ein Stein', '', '[x]'], ['ein Eiswürfel', '[x]', ''], ['eine Münze', '', '[x]'], ['eine leere Flasche mit Deckel', '[x]', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre mit eigenen Worten: Warum sinkt die Knetkugel, aber das Knetboot schwimmt?', stufe: 3,
        anfaenge: ['Die Kugel und das Boot sind gleich schwer, aber …', 'Das Boot …', 'Darum …'], zeilen: 6,
        beispiel: 'Die Kugel und das Boot sind gleich schwer, aber sie haben eine andere Form. Das Boot ist breit und hohl und hat Luft in sich. Es verdrängt mehr Wasser, und das Wasser drückt es nach oben. Darum schwimmt das Boot und die Kugel sinkt.' },
    ],
    check: ['Ich sage vorher, ob etwas schwimmt oder sinkt.', 'Ich erkläre den Auftrieb einfach.', 'Ich erkläre, warum Salzwasser besser trägt.'],
  },
  // ================================================================ 5
  {
    thema: 'Energie · erneuerbar · Pumpspeicherwerk Vianden', titel: 'Energie – immer in Verwandlung', untertitel: 'Bewegung, Wärme, Licht, Strom: Du lernst Energieformen kennen, besuchst das Pumpspeicherwerk in Vianden und unterscheidest erneuerbare und fossile Energie.',
    ziel: { de: 'Ich nenne Energieformen und unterscheide erneuerbare und nicht erneuerbare Energie.', fr: 'Je cite des formes d’énergie et je distingue énergies renouvelables et non renouvelables.' },
    bild: ['lea:froh:stehen', 'tom:froh:stehen'],
    start: {
      was: 'Energie überall',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Woher kommt die Energie? Verbinde.', stufe: 1, links: ['Du rennst.', 'Die Lampe leuchtet.', 'Das Auto fährt.'], rechts: ['aus dem Essen', 'aus dem Strom', 'aus Benzin, Diesel oder dem Akku'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'm2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Energie geht nicht verloren',
      absaetze: [
        'Ohne **Energie** passiert nichts: Nichts bewegt sich, nichts wird warm oder hell. Energie gibt es in verschiedenen **Formen**: **Bewegungsenergie**, **Wärme**, **Licht**, **elektrische Energie** (Strom) und **chemische Energie**, die zum Beispiel in Essen, Holz, Benzin oder Batterien steckt.',
        'Energie geht nie verloren, sie wird nur **umgewandelt**. Beim Fahrrad-Dynamo wird Bewegungsenergie zu Strom und dann zu Licht. Im Körper wird die chemische Energie aus dem Essen zu Bewegung und Wärme.',
        '### Erneuerbar oder nicht?',
        '**Kohle, Erdöl und Erdgas** sind vor Millionen Jahren entstanden. Wenn sie verbraucht sind, sind sie weg, und beim Verbrennen entsteht viel CO₂. **Erneuerbare Energien** gehen nicht aus: **Sonne**, **Wind**, **Wasser** und Holz oder Pflanzenreste (**Biomasse**).',
        '### Ein Riesen-Akku in Vianden',
        'Luxemburg kauft den größten Teil seines Stroms im Ausland. Im Norden, bei **Vianden**, steht ein **Pumpspeicherwerk** – eines der größten in Europa. Wenn viel Strom übrig ist, wird Wasser aus der Our in ein hohes Becken auf dem Berg gepumpt. Wenn viel Strom gebraucht wird, fließt das Wasser durch Rohre hinunter und treibt **Turbinen** an. Diese erzeugen Strom.',
      ],
      bildHtml: pumpspeicher({ breite: 120 }),
      woerter: [['die Energie', 'l’énergie'], ['umwandeln', 'transformer'], ['der Strom', 'l’électricité, le courant'], ['erneuerbar', 'renouvelable'], ['das Erdöl', 'le pétrole'], ['das Becken', 'le bassin'], ['die Turbine', 'la turbine'], ['speichern', 'stocker']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte das Pumpspeicherwerk im Lesetext.', stufe: 1, html: '', liste: [['1', 'das Oberbecken (auf dem Berg)'], ['2', 'die Rohrleitung'], ['3', 'das Kraftwerk mit Turbine und Pumpe'], ['4', 'das Unterbecken (Stausee der Our)']], spalten: 2 },
        { art: 'tabelle', auftrag: 'Erneuerbar oder nicht erneuerbar? Kreuze an.', stufe: 2, kopf: ['Energiequelle', 'erneuerbar', 'nicht erneuerbar'], breiten: [40, 30, 30], zeilen: [['Sonne', '[x]', ''], ['Erdgas', '', '[x]'], ['Wind', '[x]', ''], ['Kohle', '', '[x]'], ['Wasser', '[x]', ''], ['Erdöl', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Vianden · Pumpspeicherwerk', titel: 'Im Berg',
      situation: 'Die Klasse besucht das Pumpspeicherwerk. Ein Techniker führt sie durch die große Halle im Berg.',
      bild: ['lea:ueberrascht:stehen', 'tom:froh:stehen'], sprecher: { Techniker: 'm1', Lea: 'w3', Tom: 'm3' },
      text: [
        ['Techniker', 'Wir stehen jetzt in einer riesigen Halle mitten im Berg. Hier drehen sich die Maschinen.'],
        ['Lea', 'Ist das hier ein normales Kraftwerk?'],
        ['Techniker', 'Nein, es ist wie ein großer Akku. Nachts oder wenn der Wind stark weht, gibt es oft mehr Strom, als gebraucht wird. Dann pumpen wir Wasser aus dem Stausee unten hinauf ins Oberbecken.'],
        ['Tom', 'Und wann kommt der Strom wieder raus?'],
        ['Techniker', 'Wenn alle gleichzeitig kochen, waschen oder die Fabriken laufen. Dann lassen wir das Wasser hinunterfließen. Es dreht die Turbinen, und die Generatoren machen Strom. Das geht in wenigen Minuten.'],
        ['Lea', 'Ist das gut für die Umwelt?'],
        ['Techniker', 'Es hilft, Strom aus Wind und Sonne zu speichern. Die scheinen und wehen ja nicht immer dann, wenn wir Strom brauchen. Aber das Pumpen kostet auch Energie: Wir bekommen nur etwa drei Viertel davon zurück.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht ein Akku? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er speichert Energie für später.', 'Er macht Strom aus dem Nichts.'], r: 0 }] }],
      beim: [
        { art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Das Pumpspeicherwerk ist wie ein großer [Akku].', 'Wenn Strom übrig ist, wird Wasser nach [oben] gepumpt.', 'Wenn viel Strom gebraucht wird, fließt das Wasser hinunter und dreht die [Turbinen].', 'Man bekommt nur etwa [drei Viertel] der Energie zurück.'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum braucht man Speicher, wenn man mehr Strom aus Wind und Sonne will? Erklärt es euch gegenseitig.', stufe: 3, karten: [
        { titel: 'Wörter', text: ['nachts', 'kein Wind', 'speichern', 'später nutzen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Energieformen', punkte: ['**Bewegung**, **Wärme**, **Licht**', '**elektrische** Energie (Strom)', '**chemische** Energie (Essen, Benzin, Batterie)', 'Energie wird **umgewandelt**, nie vernichtet.'] },
         { titel: 'Energiequellen', punkte: ['**erneuerbar**: Sonne, Wind, Wasser, Biomasse', '**nicht erneuerbar**: Kohle, Erdöl, Erdgas', '**Speicher**: Akku, Pumpspeicherwerk'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Welche Energie wird in welche umgewandelt? Ergänze.', stufe: 2, kopf: ['Gerät', 'vorher', 'nachher'], breiten: [30, 35, 35], zeilen: [['Fahrrad-Dynamo', '[Bewegung]', '[Strom, dann Licht]'], ['Toaster', '[Strom]', '[Wärme]'], ['Solarzelle', '[Licht]', '[Strom]'], ['Windrad', '[Bewegung (Wind)]', '[Strom]'], ['Lagerfeuer', '[chemische Energie (Holz)]', '[Wärme und Licht]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre in einfachen Worten, wie das Pumpspeicherwerk in Vianden funktioniert. Benutze die Wörter oben, unten, pumpen, Turbine, Strom.', stufe: 2,
        anfaenge: ['Wenn viel Strom übrig ist, …', 'Wenn viel Strom gebraucht wird, …', 'So kann man …'], zeilen: 7,
        beispiel: 'Wenn viel Strom übrig ist, pumpt man Wasser von unten aus der Our nach oben in ein Becken auf dem Berg. Wenn viel Strom gebraucht wird, lässt man das Wasser durch Rohre nach unten fließen. Es dreht die Turbinen, und so entsteht Strom. So kann man Energie für später speichern.' },
    ],
    check: ['Ich nenne Energieformen.', 'Ich unterscheide erneuerbare und nicht erneuerbare Energie.', 'Ich erkläre das Pumpspeicherwerk.'],
  },
  // ================================================================ 6
  {
    thema: 'Licht und Schatten (Versuch)', titel: 'Licht und Schatten', untertitel: 'Licht reist geradeaus und unglaublich schnell: Du lernst, wie Schatten entstehen, probst Schattentheater und forschst mit der Taschenlampe.',
    ziel: { de: 'Ich erkläre, wie ein Schatten entsteht und wovon seine Größe abhängt.', fr: 'J’explique comment se forme une ombre et de quoi dépend sa taille.' },
    bild: ['chloe:froh:stehen', 'sami:froh:stehen'],
    start: {
      was: 'Dein Schatten',
      aufgaben: [
        { art: 'mc', auftrag: 'Wann ist dein Schatten draußen am kürzesten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['am Mittag', 'am Morgen', 'am Abend'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      titel: 'Wo kein Licht hinkommt',
      absaetze: [
        '**Licht** kommt von **Lichtquellen** wie der Sonne, einer Lampe oder einer Kerze. Es breitet sich in **geraden Linien** aus, den **Lichtstrahlen**. Licht ist unglaublich schnell: etwa **300 000 Kilometer in einer Sekunde**. Von der Sonne bis zu uns braucht es nur etwa 8 Minuten.',
        '### So entsteht ein Schatten',
        'Trifft das Licht auf einen Gegenstand, der kein Licht durchlässt, kommt es hinter ihm nicht weiter. Dort entsteht ein dunkler Bereich: der **Schatten**. Der Schatten hat die Form des Gegenstands.',
        '### Durchsichtig, durchscheinend, undurchsichtig',
        'Glas ist **durchsichtig**: Fast alles Licht geht hindurch. Butterbrotpapier ist **durchscheinend**: Etwas Licht kommt hindurch, aber man sieht nicht klar. Holz und Karton sind **undurchsichtig**: Sie werfen einen dunklen Schatten.',
        '### Groß oder klein?',
        'Je **näher** ein Gegenstand an der Lampe ist, desto **größer** wird sein Schatten. Je weiter er weg ist, desto kleiner. Draußen ist der Schatten mittags am kürzesten, weil die Sonne dann am höchsten steht.',
      ],
      bildHtml: schatten({ breite: 118 }),
      woerter: [['das Licht', 'la lumière'], ['die Lichtquelle', 'la source de lumière'], ['der Lichtstrahl', 'le rayon lumineux'], ['der Schatten', 'l’ombre'], ['durchsichtig', 'transparent'], ['durchscheinend', 'translucide'], ['undurchsichtig', 'opaque'], ['die Taschenlampe', 'la lampe de poche']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte das Schaubild im Lesetext.', stufe: 1, html: '', liste: [['1', 'die Lichtquelle'], ['2', 'die Lichtstrahlen'], ['3', 'der Gegenstand'], ['4', 'der Schatten']], spalten: 2 },
        { art: 'tabelle', auftrag: 'Ordne zu: durchsichtig, durchscheinend oder undurchsichtig?', stufe: 2, kopf: ['Stoff', 'durchsichtig', 'durch­scheinend', 'undurch­sichtig'], breiten: [34, 22, 22, 22], zeilen: [['Fensterglas', '[x]', '', ''], ['Butterbrotpapier', '', '[x]', ''], ['Holzbrett', '', '', '[x]'], ['Milchglas', '', '[x]', ''], ['Pappe', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Probe', wo: 'Schattentheater-AG · Aula', titel: 'Der Drache wird größer',
      situation: 'Chloé und Sami proben ein Schattentheater. Ihre Lehrerin gibt Tipps.',
      bild: ['chloe:aufgeregt:stehen', 'sami:froh:stehen'], sprecher: { Lehrerin: 'w1', Chloé: 'w3', Sami: 'm3' },
      text: [
        ['Lehrerin', 'Okay, Licht aus! Die Lampe steht hinter dem weißen Tuch. Chloé, du hast den Drachen aus Karton.'],
        ['Chloé', 'Der Drache soll am Ende riesig werden. Wie mache ich das?'],
        ['Lehrerin', 'Geh mit dem Drachen langsam näher zur Lampe. Je näher er am Licht ist, desto größer wird der Schatten auf dem Tuch.'],
        ['Sami', 'Wow, jetzt ist er so groß wie das ganze Tuch!'],
        ['Lehrerin', 'Genau. Und wenn er klein und weit weg sein soll, gehst du mit ihm nah ans Tuch.'],
        ['Sami', 'Kann ich das Feuer farbig machen?'],
        ['Lehrerin', 'Ja! Schneide eine Flamme in den Karton und klebe rotes Transparentpapier dahinter. Das ist durchscheinend: Ein bisschen rotes Licht kommt durch.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wo steht beim Schattentheater die Lampe? Rate!', stufe: 1, fragen: [{ f: '', o: ['hinter dem Tuch, bei den Spielern', 'vor dem Tuch, beim Publikum'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Der Drache ist aus Karton.', true], ['Um den Schatten größer zu machen, geht Chloé näher zur Lampe.', true], ['Ein kleiner Schatten entsteht nah an der Lampe.', false], ['Transparentpapier ist durchscheinend.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant zu zweit eine kurze Schattentheater-Szene: Wer spielt mit? Was wird größer, was kleiner?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['ein Monster kommt näher', 'ein Vogel fliegt weg', 'ein Ball springt'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Licht', punkte: ['breitet sich **geradlinig** aus', 'sehr schnell: etwa **300 000 km pro Sekunde**', 'Lichtquellen: Sonne, Lampe, Kerze'] },
         { titel: 'Schatten', punkte: ['entsteht **hinter** undurchsichtigen Gegenständen', '**näher an der Lampe** → **größer**', 'mittags draußen am **kürzesten**'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Forscht zu zweit im abgedunkelten Raum.', stufe: 2,
        frage: 'Wie ändert sich der Schatten, wenn der Gegenstand näher an die Lampe kommt?',
        material: ['eine Taschenlampe', 'eine Spielfigur oder eine Figur aus Karton', 'eine helle Wand oder ein weißes Blatt', 'ein Lineal'],
        schritte: ['Stell die Lampe 60 cm vor die Wand.', 'Stell die Figur 10 cm vor die Wand. Miss die Höhe des Schattens.', 'Stell die Figur 30 cm vor die Wand und miss wieder.', 'Stell sie 50 cm vor die Wand (nah an der Lampe) und miss.'],
        loesung: { vermutung: 'z. B. Der Schatten wird größer, wenn die Figur näher an der Lampe ist.', beobachtung: 'z. B. 10 cm vor der Wand: 6 cm · 30 cm: 10 cm · 50 cm: 30 cm', ergebnis: 'Je näher der Gegenstand an der Lampe ist, desto größer ist sein Schatten.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Anleitung für ein Schattentheater in der Klasse.', stufe: 2,
        anfaenge: ['Material: …', 'Zuerst …', 'Dann …', 'Tipp: …'], zeilen: 7,
        beispiel: 'Material: ein weißes Bettlaken, eine helle Lampe, Figuren aus Karton an Holzstäben. Zuerst hängt man das Laken auf und stellt die Lampe dahinter. Dann macht man das Licht im Raum aus. Die Spieler halten ihre Figuren zwischen Lampe und Laken. Tipp: Wenn eine Figur groß werden soll, geht man näher zur Lampe.' },
    ],
    check: ['Ich erkläre, wie ein Schatten entsteht.', 'Ich unterscheide durchsichtig, durchscheinend und undurchsichtig.', 'Ich erkläre, wovon die Größe des Schattens abhängt.'],
  },
  // ================================================================ 7
  {
    thema: 'Werbung erkennen · Influencer', titel: 'Kauf mich!', untertitel: 'Stars, Gefühle, „nur heute“: Du lernst die Tricks der Werbung kennen, prüfst ein Influencer-Video und schreibst eine ehrliche Werbung.',
    ziel: { de: 'Ich erkenne Werbung und ihre Tricks und denke kritisch darüber nach.', fr: 'Je reconnais la publicité et ses astuces et j’y réfléchis de façon critique.' },
    bild: ['jana:froh:handy', 'yusuf:verwirrt:handy'],
    start: {
      was: 'Werbung im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo begegnet dir Werbung? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['in Videos und Apps', 'an Bushaltestellen', 'auf T-Shirts mit Logos', 'im Radio', 'in Filmen und Serien'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die Tricks der Werbung',
      absaetze: [
        '**Werbung** will, dass wir etwas **kaufen** oder gut finden. Firmen geben dafür sehr viel Geld aus. Jugendliche sind eine wichtige Zielgruppe, weil sie viel Zeit am Handy verbringen und gern zeigen, was gerade „in“ ist.',
        '### Typische Tricks',
        '**Berühmte Personen**: Ein Star oder Influencer zeigt das Produkt. Wir denken: Wenn ich das kaufe, bin ich ein bisschen wie sie. **Gefühle**: Schöne Musik, glückliche Freunde, Sonne. Das Produkt soll mit guter Laune verbunden werden. **Zeitdruck**: „Nur heute!“, „Nur noch 3 Stück!“ So denkt man weniger nach. **Alle haben das**: Wer es nicht hat, soll sich ausgeschlossen fühlen. **Schöne Bilder**: Essen in der Werbung ist oft gestylt, Fotos sind bearbeitet.',
        '### Versteckte Werbung',
        'Manchmal sieht Werbung nicht wie Werbung aus: ein Getränk im Video, ein Schuh in der Serie. In der EU müssen Influencer bezahlte Werbung **kennzeichnen**, zum Beispiel mit „**Werbung**“, „**Anzeige**“ oder „**#ad**“. Wenn sie Geld oder Produkte bekommen, müssen sie das sagen.',
        'Gute Fragen vor dem Kaufen: **Brauche ich das wirklich? Was kostet es? Was steht im Kleingedruckten? Würde ich es auch ohne die Werbung wollen?**',
      ],
      woerter: [['die Werbung', 'la publicité'], ['das Produkt', 'le produit'], ['die Zielgruppe', 'le public cible'], ['der Trick', 'l’astuce'], ['kennzeichnen', 'signaler, indiquer'], ['versteckt', 'caché'], ['bearbeitet', 'retouché'], ['das Kleingedruckte', 'les petits caractères']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Trick ist das? Verbinde.', stufe: 2, links: ['„Nur heute 50 % billiger!“', 'Ein Fußballstar trinkt das Getränk.', 'Freunde lachen am Strand mit der Limo.', '„Schon 2 Millionen Jugendliche haben es!“'], rechts: ['Zeitdruck', 'berühmte Person', 'Gefühle', 'Alle haben das'] },
      ],
    },
    hoeren: {
      was: 'Ein Video', wo: 'Video eines Influencers', titel: '„Jojo testet“',
      situation: 'Jana und Yusuf schauen ein Video des Influencers „Jojo“. Danach reden sie darüber.',
      bild: ['jana:verwirrt:handy', 'yusuf:froh:handy'], sprecher: { Jojo: 'm2', Jana: 'w2', Yusuf: 'm3' },
      text: [
        ['Jojo', 'Hey Leute, willkommen zurück! Heute zeige ich euch meine neuen Lieblingsschuhe: die „Cloud Runner X“! Schaut mal, wie die leuchten! Ehrlich, die sind der Wahnsinn. Ich trag nichts anderes mehr!'],
        ['Jojo', 'Und das Beste: Mit meinem Code JOJO15 bekommt ihr fünfzehn Prozent Rabatt – aber nur bis Sonntag! Also schnell sein! Link ist unten!'],
        ['Yusuf', 'Die sind echt cool. Ich will die!'],
        ['Jana', 'Moment. Hast du gesehen? Oben links stand ganz klein: „Werbung“.'],
        ['Yusuf', 'Ja und?'],
        ['Jana', 'Dann bekommt er Geld dafür. Und mit dem Code verdient er bestimmt noch mal an jedem Paar mit. Natürlich sagt er, dass sie toll sind.'],
        ['Yusuf', 'Hm. Und „nur bis Sonntag“ ist auch so ein Trick, oder?'],
        ['Jana', 'Genau. Wir können ja mal echte Tests lesen. Und schauen, ob deine alten Schuhe nicht noch gut sind.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Rabatt-Code“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Code, mit dem man etwas billiger bekommt', 'ein Passwort für das Handy'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Tricks benutzt Jojo? Schreibe ein Beispiel.', stufe: 2, kopf: ['Trick', 'Beispiel aus dem Video'], breiten: [32, 68], zeilen: [['Gefühle / Begeisterung', '[„die sind der Wahnsinn“, „die leuchten“]'], ['Zeitdruck', '[Rabatt nur bis Sonntag, „schnell sein“]'], ['berühmte Person', '[Jojo selbst als Influencer]'], ['Rabatt', '[Code JOJO15: 15 Prozent]']] },
        { art: 'fragen', auftrag: 'Woran hat Jana erkannt, dass es Werbung ist?', stufe: 1, fragen: [{ f: '', l: 'Oben links stand klein „Werbung“.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Habt ihr schon einmal etwas wegen Werbung gekauft – und es später bereut? (Nur wenn ihr erzählen möchtet.)', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich habe einmal … gesehen.', 'Ich dachte, …', 'Später …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Werbetricks', punkte: ['**berühmte Personen**', '**Gefühle** und Musik', '**Zeitdruck**: „nur heute“', '**Alle haben das**', '**schöne**, bearbeitete Bilder'] },
         { titel: 'Werbung erkennen', punkte: ['Kennzeichnung: **Werbung, Anzeige, #ad**', '**Rabatt-Codes** und Links', 'Fragen: **Brauche ich das wirklich?**'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Influencer sind gute Vorbilder.', 'Werbung für Kinder unter 12 sollte verboten sein.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine ehrliche Werbung für einen Gegenstand, den du gern hast (zum Beispiel deine Trinkflasche). Ohne Tricks – nur echte Vorteile.', stufe: 2,
        anfaenge: ['Das ist …', 'Vorteile: …', 'Nachteile (ehrlich!): …', 'Für wen ist es gut?'], zeilen: 8,
        beispiel: 'Das ist meine Trinkflasche aus Metall. Vorteile: Sie hält das Wasser lange kühl und ist nicht kaputtgegangen, obwohl sie oft runtergefallen ist. Man spart viele Plastikflaschen. Nachteile (ehrlich!): Sie ist ein bisschen schwer und hat Dellen. Für wen ist es gut? Für alle, die viel unterwegs sind und Müll sparen wollen.' },
    ],
    check: ['Ich nenne Werbetricks.', 'Ich erkenne gekennzeichnete und versteckte Werbung.', 'Ich frage mich vor dem Kauf: Brauche ich das?'],
  },
  // ================================================================ 8
  {
    thema: 'Daten · Apps · Privatsphäre', titel: 'Meine Daten gehören mir', untertitel: 'Name, Fotos, Standort: Du erfährst, welche Daten Apps sammeln, prüfst Berechtigungen und machst eine Daten-Ampel.',
    ziel: { de: 'Ich erkenne persönliche Daten und schütze meine Privatsphäre im Netz.', fr: 'Je reconnais mes données personnelles et je protège ma vie privée sur Internet.' },
    bild: ['ben:verwirrt:handy', 'lea:froh:erklaeren'],
    start: {
      was: 'Was verrät das Handy?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was kann ein Handy über dich wissen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['wo du gerade bist', 'wen du kennst (Kontakte)', 'welche Videos du magst', 'wie lange du schläfst'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Gratis – oder doch nicht?',
      absaetze: [
        '**Persönliche Daten** sind Angaben über dich: dein Name, deine Adresse, dein Geburtstag, deine Telefonnummer, Fotos, dein **Standort**, aber auch, was du anklickst und magst.',
        '### Bezahlen mit Daten',
        'Viele Apps sind **gratis**. Trotzdem verdienen die Firmen Geld – oft mit **Werbung**, die genau zu dir passt. Dafür sammeln sie Daten: Was schaust du an? Wo bist du? Wie lange? Darum sagt man: Wenn eine App nichts kostet, bezahlst du oft mit deinen Daten.',
        '### Berechtigungen',
        'Beim Installieren fragen Apps nach **Berechtigungen**: Zugriff auf Kamera, Mikrofon, Kontakte oder Standort. Frag dich: **Braucht die App das wirklich?** Eine Taschenlampen-App braucht keinen Zugriff auf deine Kontakte.',
        '### Deine Rechte',
        'In der EU schützt die **Datenschutz-Grundverordnung** deine Daten. Viele Apps sind laut ihren eigenen Regeln erst ab 13 Jahren erlaubt. In Luxemburg dürfen Jugendliche ab 16 Jahren selbst zustimmen, dass Apps ihre Daten nutzen; Jüngere brauchen dafür die Erlaubnis der Eltern. Und: Fotos von anderen darfst du nur mit ihrer **Erlaubnis** posten. Hilfe gibt es bei der **BEE SECURE Helpline: 8002 1234**.',
      ],
      woerter: [['die Daten', 'les données'], ['persönlich', 'personnel'], ['der Standort', 'la localisation'], ['die Berechtigung', 'l’autorisation'], ['die Privatsphäre', 'la vie privée'], ['der Datenschutz', 'la protection des données'], ['zustimmen', 'consentir'], ['posten', 'publier']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Gratis-Apps verdienen oft mit Werbung und Daten Geld.', true], ['Eine Taschenlampen-App braucht Zugriff auf die Kontakte.', false], ['Fotos von Freunden darf man immer posten.', false], ['Die BEE SECURE Helpline hat die Nummer 8002 1234.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · auf der Bank', titel: 'Warum will die Lampe meine Kontakte?',
      situation: 'Ben will eine neue App installieren. Lea schaut mit aufs Handy.',
      bild: ['ben:verwirrt:handy', 'lea:froh:erklaeren'], sprecher: { Ben: 'm3', Lea: 'w3' },
      text: [
        ['Ben', 'Ich lade mir eine Taschenlampen-App runter. Die ist gratis und hat ganz viele Farben.'],
        ['Lea', 'Zeig mal. … Warte, die App will Zugriff auf deine Kontakte, deinen Standort und dein Mikrofon.'],
        ['Ben', 'Ich klick einfach auf „Erlauben“, dann geht’s schneller.'],
        ['Lea', 'Lieber nicht. Wozu braucht eine Lampe dein Mikrofon? Vielleicht verkaufen die deine Daten weiter.'],
        ['Ben', 'Hm. Aber mein Handy hat doch schon eine Lampe eingebaut, oder?'],
        ['Lea', 'Genau, oben im Menü. Du brauchst die App gar nicht. Und schau mal in die Einstellungen: Da kannst du sehen, welche Apps deinen Standort benutzen.'],
        ['Ben', 'Oh, die Wetter-App, die Karte … und ein Spiel! Warum braucht ein Spiel meinen Standort?'],
        ['Lea', 'Gute Frage. Das kannst du ausschalten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Zugriff erlauben“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Die App darf diese Daten benutzen.', 'Die App wird gelöscht.'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Worauf will die Taschenlampen-App zugreifen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Kontakte', 'Standort', 'Mikrofon', 'Fotos'], r: [0, 1, 2] }] },
        { art: 'fragen', auftrag: 'Welche zwei Tipps gibt Lea?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die eingebaute Lampe benutzen (keine App nötig); in den Einstellungen prüfen, welche Apps den Standort benutzen, und ihn ausschalten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Prüft zu zweit (freiwillig, mit eurem eigenen Handy oder einem Schul-Tablet): Welche Apps dürfen den Standort benutzen? Ist das nötig?', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Braucht die App das?', 'Kann ich es ausschalten?', 'Gibt es eine App, die weniger will?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Persönliche Daten', punkte: ['Name, Adresse, Geburtstag, Telefon', '**Fotos**, Stimme', '**Standort**', 'was du anklickst und magst'] },
         { titel: 'Schütze dich', punkte: ['**Berechtigungen** prüfen: Braucht die App das?', '**Standort** nur, wenn nötig', 'Fotos von anderen nur mit **Erlaubnis**', 'Hilfe: **BEE SECURE 8002 1234**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Daten-Ampel: Was darf man im Netz teilen? Kreuze an. (Rot = nie öffentlich, Gelb = nur mit Freunden, die man kennt, Grün = kein Problem.)', stufe: 2, kopf: ['Information', 'Rot', 'Gelb', 'Grün'], breiten: [52, 16, 16, 16], zeilen: [['meine Adresse', '[x]', '', ''], ['mein Lieblingsessen', '', '', '[x]'], ['mein Passwort', '[x]', '', ''], ['ein Urlaubsfoto von mir', '', '[x]', ''], ['meine Handynummer', '', '[x]', ''], ['mein Standort jetzt gerade', '[x]', '', ''], ['meine Lieblingsband', '', '', '[x]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe fünf Daten-Tipps für jüngere Schülerinnen und Schüler als Plakat.', stufe: 2,
        anfaenge: ['1.', '2.', '3.', '4.', '5.'], zeilen: 7,
        beispiel: '1. Gib nie dein Passwort weiter. 2. Prüfe, was eine App alles will, bevor du „Erlauben“ drückst. 3. Teile deinen Standort nur mit Familie oder guten Freunden. 4. Poste Fotos von anderen nur, wenn sie Ja sagen. 5. Wenn etwas komisch ist: Sprich mit einer Vertrauensperson oder ruf BEE SECURE an (8002 1234).' },
    ],
    check: ['Ich nenne persönliche Daten.', 'Ich prüfe App-Berechtigungen.', 'Ich weiß, wo ich Hilfe bekomme.'],
  },
]
