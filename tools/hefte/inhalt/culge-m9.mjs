// Culture générale · Modul 9 (5P) – Schwerpunkt Geografie, Physik/Chemie/Technik, Medien
// (MENJE-Leitfaden Voie de préparation: Module 3, 6, 9). Themen: Kontinente und Ozeane, Klimazonen, Rohstoffe im Handy
// (Globalisierung, Reparieren), Strom im Haushalt (Versuch Standby), Gefahrensymbole, Säuren und Laugen (Versuch Rotkohl),
// künstliche Intelligenz, Fake News erkennen. Zahlen gerundet, Rechtliches „Stand 2026“. Personen der Dialoge: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { weltKarte } from './karten.mjs'
import { gefahrensymbole, phSkala, balken } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 9, {
  titel: 'Die Welt verstehen – sicher und kritisch leben',
  titelFr: 'Comprendre le monde – vivre de façon sûre et critique',
  unter: 'Kontinente, Ozeane und Klimazonen, was in einem Handy steckt, Strom und Chemie im Haushalt – und wie man künstliche Intelligenz und Fake News kritisch prüft. In acht Lektionen.',
  unterFr: 'Continents, océans et zones climatiques, électricité et chimie à la maison, intelligence artificielle et fausses informations.',
  farbe: '#3b5bad',
  karten: true,
  deckbild: ['lio:froh:handy', 'amira:froh:stehen-zeigen', 'ben:froh:stehen'],
  blasen: [{ t: 'Rotkohl wird pink!', x: 10, y: 108 }, { t: 'Stimmt das?', x: 130, y: 96 }, { t: 'Standby = Strom!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Unsere Erde', fr: 'Notre Terre' }, icon: 'world', lektionen: 3 },
    { titel: { de: 'Sicher zu Hause', fr: 'En sécurité à la maison' }, icon: 'home-bolt', lektionen: 3 },
    { titel: { de: 'Kritisch im Netz', fr: 'Esprit critique en ligne' }, icon: 'device-laptop', lektionen: 2 },
  ],
})

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Kontinente · Ozeane · Rekorde', titel: 'Sieben Kontinente, fünf Ozeane', untertitel: 'Wo liegt was auf der Erde? Du liest die Weltkarte, hörst einen Podcast über Rekorde der Erde und beschriftest Kontinente und Ozeane.',
    ziel: { de: 'Ich benenne und finde die Kontinente und Ozeane auf der Weltkarte.', fr: 'Je nomme et je situe les continents et les océans sur la carte du monde.' },
    bild: ['amira:froh:stehen-zeigen', 'tom:froh:stehen'],
    start: {
      was: 'Schätze!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viel der Erdoberfläche ist mit Wasser bedeckt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa ein Viertel', 'etwa die Hälfte', 'etwa zwei Drittel bis drei Viertel'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Weltkarte', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet', titel: 'Der blaue Planet',
      absaetze: [
        'Vom Weltall aus sieht die Erde blau aus: Etwa **71 Prozent** der Oberfläche sind Wasser. Das Wasser bildet fünf große **Ozeane**: den **Pazifischen Ozean** (der größte), den **Atlantischen Ozean**, den **Indischen Ozean**, den **Arktischen Ozean** am Nordpol und den **Südlichen Ozean** rund um die Antarktis.',
        '### Die Kontinente',
        'Das Land teilt man in sieben **Kontinente**: **Asien**, **Afrika**, **Nordamerika**, **Südamerika**, **Antarktis**, **Europa** und **Australien mit Ozeanien**. Asien ist der größte Kontinent, und dort leben auch die meisten Menschen – mehr als die Hälfte der rund 8 Milliarden Menschen auf der Erde. In der Antarktis wohnt niemand dauerhaft, nur Forscherinnen und Forscher.',
        '### Rekorde',
        'Der höchste Berg ist der **Mount Everest** in Asien mit etwa 8850 Metern. Die längsten Flüsse sind der **Nil** in Afrika und der **Amazonas** in Südamerika – Fachleute streiten, welcher länger ist. Die größte heiße Wüste ist die **Sahara** in Afrika.',
      ],
      bildHtml: weltKarte({ kontinente: 'farben', kontinentNamen: true, ozeane: true, breite: 128 }),
      woerter: [['der Kontinent', 'le continent'], ['der Ozean', 'l’océan'], ['die Oberfläche', 'la surface'], ['die Bevölkerung', 'la population'], ['die Milliarde', 'le milliard'], ['der Rekord', 'le record'], ['die Wüste', 'le désert'], ['der Forscher / die Forscherin', 'le chercheur / la chercheuse']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Der Atlantische Ozean ist der größte Ozean.', false], ['Asien ist der größte Kontinent.', true], ['In der Antarktis leben viele Menschen dauerhaft.', false], ['Der Mount Everest liegt in Asien.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast', wo: 'Schulpodcast „Weltwissen“', titel: 'Rekorde der Erde',
      situation: 'Amira und Tom machen einen Podcast über Rekorde der Erde.',
      bild: ['amira:froh:handy', 'tom:aufgeregt:stehen'], sprecher: { Amira: 'w2', Tom: 'm3' },
      text: [
        ['Amira', 'Willkommen bei „Weltwissen“! Heute: Rekorde der Erde. Tom, wo ist es am kältesten?'],
        ['Tom', 'In der Antarktis. Dort wurden schon fast minus neunzig Grad gemessen. Und am heißesten ist es in Wüsten: Im Death Valley in Nordamerika waren es über fünfzig Grad.'],
        ['Amira', 'Krass. Und wo ist das Meer am tiefsten?'],
        ['Tom', 'Im Pazifik, im Marianengraben: fast elf Kilometer tief! Der Mount Everest würde da komplett hineinpassen.'],
        ['Amira', 'Mein Lieblingsrekord: Der Amazonas-Regenwald in Südamerika ist der größte Regenwald der Welt. Dort leben unglaublich viele Tier- und Pflanzenarten.'],
        ['Tom', 'Und der kleinste Kontinent ist Australien mit Ozeanien. Dafür ist Australien eine riesige Insel – und ein ganzer Kontinent!'],
        ['Amira', 'Das war’s für heute. Nächstes Mal: die Klimazonen der Erde!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Regenwald? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein dichter Wald, in dem es sehr viel regnet und warm ist', 'ein Wald, in dem es nur im Herbst regnet'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze die Rekorde.', stufe: 1, kopf: ['Rekord', 'Wo?'], breiten: [50, 50], zeilen: [['am kältesten', '[Antarktis]'], ['sehr heiß (über 50 Grad)', '[Death Valley, Nordamerika]'], ['tiefste Stelle im Meer', '[Marianengraben im Pazifik]'], ['größter Regenwald', '[Amazonas, Südamerika]'], ['kleinster Kontinent', '[Australien mit Ozeanien]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant zu zweit eine eigene Podcast-Folge über einen Kontinent: Was ist dort besonders?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Tiere', 'Landschaften', 'Städte', 'Sprachen', 'Rekorde'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: '7 Kontinente', punkte: ['**Asien** (größter, die meisten Menschen)', '**Afrika**', '**Nordamerika**, **Südamerika**', '**Antarktis**', '**Europa**', '**Australien und Ozeanien** (kleinster)'] },
         { titel: '5 Ozeane', punkte: ['**Pazifischer Ozean** (größter)', '**Atlantischer Ozean**', '**Indischer Ozean**', '**Arktischer Ozean**', '**Südlicher Ozean**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Schreibe die Namen der Kontinente (1–7) und Ozeane (A–E) auf.', stufe: 2,
        html: weltKarte({ kontinente: 'farben', kontinentNamen: 'nummern', ozeane: 'nummern', breite: 165 }),
        liste: [['1', 'Afrika'], ['2', 'Europa'], ['3', 'Asien'], ['4', 'Nordamerika'], ['5', 'Südamerika'], ['6', 'Australien und Ozeanien'], ['7', 'Antarktis'], ['A', 'Atlantischer Ozean'], ['B', 'Pazifischer Ozean'], ['C', 'Indischer Ozean'], ['D', 'Arktischer Ozean'], ['E', 'Südlicher Ozean']], spalten: 2 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Du darfst einen Kontinent besuchen. Welchen wählst du? Was möchtest du dort sehen? Begründe.', stufe: 2,
        anfaenge: ['Ich würde gern nach … reisen.', 'Dort möchte ich …', 'Besonders spannend finde ich …'], zeilen: 6,
        beispiel: 'Ich würde gern nach Südamerika reisen. Dort möchte ich den Amazonas-Regenwald sehen und Tiere wie Faultiere und Papageien beobachten. Besonders spannend finde ich, dass dort so viele Pflanzen wachsen, die es nirgendwo sonst gibt.' },
    ],
    check: ['Ich nenne die sieben Kontinente.', 'Ich nenne die fünf Ozeane.', 'Ich finde sie auf der Weltkarte.'],
  },
  // ================================================================ 2
  {
    thema: 'Klimazonen · Wetter und Klima', titel: 'Heiß, gemäßigt, eiskalt', untertitel: 'Warum ist es am Äquator heiß und an den Polen kalt? Du lernst die Klimazonen kennen und löst ein Hör-Rätsel: Wo bin ich?',
    ziel: { de: 'Ich beschreibe die Klimazonen der Erde und ordne Orte zu.', fr: 'Je décris les zones climatiques de la Terre et j’y situe des lieux.' },
    bild: ['lio:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Wetter oder Klima?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wetter oder Klima? Verbinde.', stufe: 1, links: ['„Heute regnet es in Esch.“', '„In Luxemburg sind die Sommer meist mild und die Winter kühl.“'], rechts: ['Wetter: wie es heute oder morgen ist', 'Klima: wie das Wetter über viele Jahre meistens ist'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die Klimazonen',
      absaetze: [
        'Die Erde ist eine Kugel. Am **Äquator** fallen die Sonnenstrahlen fast senkrecht auf die Erde und wärmen stark. An den **Polen** kommen sie sehr schräg an und wärmen wenig. Darum gibt es verschiedene **Klimazonen**.',
        '### Die vier Zonen',
        '**Tropen:** rund um den Äquator, zwischen den Wendekreisen. Es ist das ganze Jahr heiß; in vielen Gegenden regnet es viel, dort wachsen Regenwälder. **Subtropen:** heiße, trockene Sommer. Hier liegen große Wüsten wie die Sahara, aber auch die Länder am Mittelmeer. **Gemäßigte Zone:** vier Jahreszeiten, nicht zu heiß und nicht zu kalt. Hier liegt **Luxemburg**. **Polare Zone:** sehr kalt, lange Winter, oft Eis und Schnee.',
        '### Pflanzen und Tiere passen sich an',
        'Kamele speichern Fett in ihren Höckern und kommen lange ohne Wasser aus. Eisbären haben eine dicke Fettschicht und dichtes Fell. Kakteen speichern Wasser in ihren dicken Stämmen.',
      ],
      woerter: [['das Klima', 'le climat'], ['der Äquator', 'l’équateur'], ['der Pol', 'le pôle'], ['der Wendekreis', 'le tropique'], ['die Tropen', 'les tropiques, la zone tropicale'], ['gemäßigt', 'tempéré'], ['die Jahreszeit', 'la saison'], ['sich anpassen', 's’adapter']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Klimazone', 'Wie ist es dort?', 'Beispiel'], breiten: [24, 46, 30], zeilen: [['Tropen', '[immer heiß, oft viel Regen]', '[Regenwald am Amazonas]'], ['Subtropen', '[heiße, trockene Sommer]', '[Sahara, Mittelmeer]'], ['gemäßigte Zone', '[vier Jahreszeiten, mild]', '[Luxemburg]'], ['polare Zone', '[sehr kalt, Eis und Schnee]', '[Antarktis, Nordpol]']] },
      ],
    },
    hoeren: {
      was: 'Ein Hör-Rätsel', wo: 'Schulpodcast „Weltwissen“', titel: 'Wo bin ich?',
      situation: 'Drei Reisende schicken Sprachnachrichten. Errate, in welcher Klimazone sie sind.',
      bild: ['chloe:froh:handy', 'lio:verwirrt:stehen'], sprecher: { 'Reisende 1': 'w2', 'Reisender 2': 'm1', 'Reisende 3': 'w3' },
      text: [
        ['Reisende 1', 'Hier ist es jeden Tag ungefähr gleich warm, etwa dreißig Grad. Am Nachmittag kommt fast immer ein heftiger Regenschauer. Um mich herum sind riesige Bäume, und überall hört man Vögel und Affen. Wo bin ich?'],
        ['Reisender 2', 'Es ist minus fünfundzwanzig Grad. Im Winter geht die Sonne hier wochenlang gar nicht auf. Ich trage drei Jacken übereinander und habe gerade einen Eisbären aus der Ferne gesehen. Wo bin ich?'],
        ['Reisende 3', 'Am Tag ist es über vierzig Grad heiß, nachts wird es ziemlich kalt. Es hat seit Monaten nicht geregnet. Um mich herum ist nur Sand. Gerade ist eine Karawane mit Kamelen vorbeigezogen. Wo bin ich?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Karawane? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Gruppe von Reisenden mit Tieren, zum Beispiel Kamelen', 'ein Wohnwagen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. In welcher Klimazone ist die Person? Woran erkennst du das?', stufe: 2, kopf: ['', 'Klimazone', 'Hinweise'], breiten: [16, 26, 58], zeilen: [['1', '[Tropen (Regenwald)]', '[immer etwa 30 Grad, täglich Regen, riesige Bäume, Affen]'], ['2', '[polare Zone]', '[minus 25 Grad, Sonne geht im Winter nicht auf, Eisbär]'], ['3', '[Subtropen (Wüste)]', '[über 40 Grad, kein Regen, Sand, Kamele]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Denkt euch selbst ein Rätsel „Wo bin ich?“ für die gemäßigte Zone aus und stellt es der Klasse.', stufe: 2, karten: [
        { titel: 'Hinweise', text: ['Temperatur', 'Regen', 'Pflanzen', 'Tiere', 'Jahreszeit'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Klimazonen', nummern: true, punkte: ['**Tropen**: immer heiß, oft feucht', '**Subtropen**: heiße, trockene Sommer, Wüsten', '**gemäßigte Zone**: vier Jahreszeiten (Luxemburg)', '**polare Zone**: sehr kalt'] },
         { titel: 'Warum?', punkte: ['Am **Äquator**: Sonne fast senkrecht → **heiß**', 'An den **Polen**: Sonne schräg → **kalt**', '**Wetter** = heute · **Klima** = über viele Jahre'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Die Karte zeigt die Klimazonen (vereinfacht). Welche Zone hat welche Nummer?', stufe: 2,
        html: weltKarte({ kontinente: 'grau', kontinentNamen: false, zonen: true, linienDick: 3, linien: ['aequator', 'wendekreise', 'polarkreise'], punktGroesse: 16, punkte: [{ lon: -125, lat: 8, text: '1', nummer: true }, { lon: -125, lat: 32, text: '2', nummer: true }, { lon: -125, lat: 53, text: '3', nummer: true }, { lon: -125, lat: -77, text: '4', nummer: true }], breite: 165 }),
        liste: [['1', 'Tropen'], ['2', 'Subtropen'], ['3', 'gemäßigte Zone'], ['4', 'polare Zone']], spalten: 2 },
      { art: 'zuordnen', auftrag: 'Welches Tier passt in welche Klimazone? Verbinde.', stufe: 2, links: ['Eisbär', 'Kamel', 'Faultier', 'Reh'], rechts: ['polare Zone', 'Subtropen (Wüste)', 'Tropen (Regenwald)', 'gemäßigte Zone'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe ein Jahr in Luxemburg: Wie ist das Wetter in den vier Jahreszeiten? Was machen die Menschen?', stufe: 2,
        anfaenge: ['Im Frühling …', 'Im Sommer …', 'Im Herbst …', 'Im Winter …'], zeilen: 7,
        beispiel: 'Im Frühling wird es wärmer, die Bäume bekommen Blätter und es regnet oft. Im Sommer ist es warm, manchmal heiß, und viele gehen schwimmen. Im Herbst werden die Blätter bunt, es ist windig und neblig. Im Winter ist es kalt, manchmal schneit es, und es wird früh dunkel.' },
    ],
    check: ['Ich unterscheide Wetter und Klima.', 'Ich nenne die vier Klimazonen.', 'Ich erkläre, warum es am Äquator heiß ist.'],
  },
  // ================================================================ 3
  {
    thema: 'Globalisierung · Rohstoffe · Reparieren', titel: 'Was steckt in meinem Handy?', untertitel: 'Kobalt, Lithium, Gold: Du liest, woher die Rohstoffe für Handys kommen, besuchst ein Repair-Café und überlegst, wie man Handys länger nutzt.',
    ziel: { de: 'Ich erkläre, woher Rohstoffe für Handys kommen, und nenne Wege, Geräte länger zu nutzen.', fr: 'J’explique d’où viennent les matières premières des téléphones et je cite des moyens de les utiliser plus longtemps.' },
    bild: ['lio:froh:handy', 'opa:froh:erklaeren'],
    start: {
      was: 'Schätze!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie lange benutzen viele Menschen ein Handy, bevor sie ein neues kaufen?', stufe: 1, fragen: [{ f: '', o: ['etwa 2 bis 3 Jahre', 'etwa 10 Jahre', 'etwa 2 Monate'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Ein Handy reist um die Welt',
      absaetze: [
        'Ein Smartphone ist klein, aber in ihm stecken **Dutzende verschiedene Stoffe**: Metalle wie Kupfer, Gold und Silber, dazu seltene Stoffe wie **Kobalt** und **Lithium** für den Akku.',
        '### Woher kommen die Rohstoffe?',
        'Mehr als die Hälfte des Kobalts weltweit wird in der **Demokratischen Republik Kongo** in Afrika abgebaut. In kleinen Minen arbeiten dort unter gefährlichen Bedingungen auch **Kinder**. **Lithium** kommt zum Beispiel aus **Chile** und **Australien**. In Chile wird es aus Salzseen in der Wüste gewonnen – dafür braucht man viel Wasser, das dort knapp ist.',
        '### Zusammenbauen und verkaufen',
        'Die Teile werden in vielen Ländern hergestellt und oft in **Asien** zusammengebaut. Dann wird das Handy in die ganze Welt verschickt. So hängen Länder auf der ganzen Welt voneinander ab: Das nennt man **Globalisierung**.',
        '### Länger nutzen',
        'Je länger man ein Handy benutzt, desto weniger Rohstoffe braucht man. Hilfreich sind: Hülle und Schutzglas, Akku tauschen lassen, reparieren statt wegwerfen, gebrauchte Handys kaufen. Alte Handys gehören nicht in den Müll, sondern zum **Recyclinghof** oder in eine Sammelbox – dort werden wertvolle Stoffe zurückgewonnen.',
      ],
      woerter: [['der Rohstoff', 'la matière première'], ['abbauen', 'extraire'], ['die Mine', 'la mine'], ['der Akku', 'la batterie'], ['zusammenbauen', 'assembler'], ['die Globalisierung', 'la mondialisation'], ['reparieren', 'réparer'], ['der Recyclinghof', 'le centre de recyclage']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Woher kommt mehr als die Hälfte des Kobalts?', l: 'aus der Demokratischen Republik Kongo' }, { f: 'Warum ist der Lithium-Abbau in Chile ein Problem?', l: 'Man braucht viel Wasser, das in der Wüste knapp ist.' }, { f: 'Was bedeutet Globalisierung?', zeilen: 2, l: 'Länder auf der ganzen Welt hängen voneinander ab, weil Waren in vielen Ländern hergestellt und überall verkauft werden.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Repair-Café im Gemeindesaal', titel: 'Reparieren statt wegwerfen',
      situation: 'Lio bringt sein Handy mit schwachem Akku ins Repair-Café. Ein ehrenamtlicher Helfer schaut es sich an.',
      bild: ['opa:froh:erklaeren', 'lio:froh:handy'], sprecher: { Helfer: 'm1', Lio: 'm3' },
      text: [
        ['Lio', 'Mein Handy ist drei Jahre alt. Der Akku ist nach ein paar Stunden leer. Ich dachte, ich brauche ein neues.'],
        ['Helfer', 'Zeig mal. Der Rest ist noch gut, nur der Akku ist müde. Akkus verlieren mit der Zeit Kraft. Ein neuer Akku ist viel billiger als ein neues Handy.'],
        ['Lio', 'Kann man das selbst machen?'],
        ['Helfer', 'Bei manchen Handys ja, bei anderen ist es schwierig, weil alles verklebt ist. Ab 2027 sollen in der EU Akkus in Handys leichter austauschbar werden, mit einigen Ausnahmen. Heute machen wir es zusammen.'],
        ['Lio', 'Und was kann ich tun, damit der neue Akku länger hält?'],
        ['Helfer', 'Nicht ständig auf hundert Prozent laden und nicht ganz leer werden lassen. Zwischen zwanzig und achtzig Prozent ist ideal. Und das Handy nicht in der heißen Sonne liegen lassen.'],
        ['Lio', 'Cool. Dann habe ich jetzt ein „neues“ Handy für viel weniger Geld.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Repair-Café? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Treffen, bei dem Freiwillige helfen, kaputte Dinge zu reparieren', 'ein Café, in dem man Handys kauft'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lios ganzes Handy ist kaputt.', false], ['Ein neuer Akku ist viel billiger als ein neues Handy.', true], ['Man soll den Akku immer auf 100 Prozent laden.', false], ['Hitze ist schlecht für den Akku.', true]] },
        { art: 'fragen', auftrag: 'Zwischen wie viel Prozent sollte man den Akku halten?', stufe: 1, fragen: [{ f: '', l: 'zwischen 20 und 80 Prozent' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was macht ihr mit alten Handys? Was könnte man besser machen?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['weiterverkaufen', 'verschenken', 'Sammelbox', 'Recyclinghof', 'reparieren lassen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rohstoffe im Handy', punkte: ['**Kobalt**: viel aus dem **Kongo**, auch Kinderarbeit', '**Lithium**: z. B. Chile, Australien', 'Gold, Kupfer, Silber …', '**Globalisierung**: Länder hängen voneinander ab'] },
         { titel: 'Länger nutzen', punkte: ['**Hülle**, Schutzglas', 'Akku **20–80 %**, keine Hitze', '**reparieren**, gebraucht kaufen', 'alte Handys → **Recyclinghof**'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Man braucht jedes Jahr ein neues Handy.', 'Firmen sollten beweisen müssen, dass in ihren Handys keine Kinderarbeit steckt.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Anleitung „So hält dein Handy länger“ mit fünf Tipps.', stufe: 2,
        anfaenge: ['1.', '2.', '3.', '4.', '5.'], zeilen: 6,
        beispiel: '1. Benutze eine Hülle und ein Schutzglas. 2. Lade den Akku am besten zwischen 20 und 80 Prozent. 3. Lass das Handy nicht in der Sonne liegen. 4. Lass einen schwachen Akku tauschen, statt ein neues Handy zu kaufen. 5. Bring alte Handys zum Recyclinghof.' },
    ],
    check: ['Ich nenne Rohstoffe im Handy und woher sie kommen.', 'Ich erkläre Globalisierung am Beispiel Handy.', 'Ich nenne Wege, ein Handy länger zu nutzen.'],
  },
  // ================================================================ 4
  {
    thema: 'Strom im Haushalt · Kosten · Sicherheit (Versuch)', titel: 'Stromfresser gesucht', untertitel: 'Watt, Kilowattstunde, Standby: Du lernst, wie man Stromverbrauch berechnet, spürst Stromfresser auf und kennst die wichtigsten Sicherheitsregeln.',
    ziel: { de: 'Ich berechne den Stromverbrauch von Geräten und kenne Regeln für den sicheren Umgang mit Strom.', fr: 'Je calcule la consommation électrique d’appareils et je connais les règles de sécurité.' },
    bild: ['ben:froh:stehen', 'lea:froh:stehen'],
    start: {
      was: 'Was braucht am meisten?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welches Gerät braucht in einer Stunde am meisten Strom? Rate!', stufe: 1, fragen: [{ f: '', o: ['Handy-Ladegerät', 'Wasserkocher', 'LED-Lampe'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, gerundete Werte)', titel: 'Watt und Kilowattstunden',
      absaetze: [
        'Auf jedem Elektrogerät steht eine Zahl mit **W** – zum Beispiel 2000 W beim Wasserkocher. Das ist die **Leistung** in **Watt**: Sie zeigt, wie viel Strom das Gerät braucht, während es läuft.',
        '### So rechnet man',
        'Leistung mal Zeit ergibt den **Verbrauch**. Ein Gerät mit 1000 Watt, das eine Stunde läuft, verbraucht **1 Kilowattstunde (kWh)**. Eine LED-Lampe mit 10 Watt müsste dafür 100 Stunden leuchten. Für eine Kilowattstunde bezahlt man in Luxemburg ungefähr **25 Cent** (gerundet).',
        '### Heimliche Stromfresser',
        'Fernseher, Spielkonsolen und Ladegeräte brauchen oft auch Strom, wenn sie gar nicht benutzt werden: im **Standby**. Eine Steckdosenleiste mit Schalter hilft, alles auf einmal ganz auszuschalten.',
        '### Sicherheit',
        'Strom kann **lebensgefährlich** sein. Darum: Elektrogeräte nie mit nassen Händen oder in der Badewanne benutzen. Keine kaputten Kabel benutzen. Nichts in Steckdosen stecken. Nicht zu viele Mehrfachstecker hintereinander. Im Sicherungskasten schützt der **FI-Schutzschalter**: Er schaltet den Strom blitzschnell ab, wenn etwas schiefgeht.',
      ],
      bildHtml: balken('Leistung von Geräten (Beispiele, gerundet)', [['Wasserkocher', 2000], ['Föhn', 1800], ['Staubsauger', 800], ['Spielkonsole (beim Spielen)', 150], ['Laptop', 50], ['LED-Lampe', 10]], { einheit: 'W', max: 2000 }),
      woerter: [['die Leistung', 'la puissance'], ['das Watt', 'le watt'], ['die Kilowattstunde', 'le kilowattheure'], ['der Verbrauch', 'la consommation'], ['der Standby-Modus', 'la veille'], ['die Steckdose', 'la prise'], ['das Kabel', 'le câble'], ['der Sicherungskasten', 'le tableau électrique']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['1000 Watt eine Stunde lang ergeben 1 kWh.', true], ['Im Standby braucht ein Gerät keinen Strom.', false], ['Man darf den Föhn in der Badewanne benutzen, wenn man aufpasst.', false], ['Der FI-Schutzschalter schaltet bei Gefahr den Strom ab.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Jugendhaus · Projekt „Energie-Detektive“', titel: 'Wir messen nach',
      situation: 'Ben und Lea messen im Jugendhaus mit einem Strommessgerät, wie viel Strom die Geräte brauchen.',
      bild: ['ben:froh:stehen', 'lea:ueberrascht:stehen'], sprecher: { Ben: 'm3', Lea: 'w3' },
      text: [
        ['Ben', 'Okay, das Messgerät steckt zwischen Steckdose und Fernseher. Fernseher an: neunzig Watt.'],
        ['Lea', 'Und jetzt mit der Fernbedienung aus … zeigt immer noch acht Watt an!'],
        ['Ben', 'Acht Watt klingt wenig. Aber der Fernseher ist ja zwanzig Stunden am Tag aus.'],
        ['Lea', 'Rechnen wir: Acht Watt mal zwanzig Stunden sind hundertsechzig Wattstunden am Tag. Mal dreihundertfünfundsechzig Tage … fast sechzig Kilowattstunden im Jahr!'],
        ['Ben', 'Und die Spielkonsole im Standby-Modus braucht sogar zwölf Watt.'],
        ['Lea', 'Wir schlagen vor, eine Steckdosenleiste mit Schalter zu kaufen. Abends schaltet der Letzte alles aus.'],
        ['Ben', 'Und wir machen ein Schild: „Ausschalten statt Standby!“'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was zeigt ein Strommessgerät? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wie viel Strom ein Gerät gerade braucht', 'wie warm das Gerät ist'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und notiere die Messwerte.', stufe: 1, kopf: ['Gerät', 'an', 'Standby'], breiten: [40, 30, 30], zeilen: [['Fernseher', '[90 W]', '[8 W]'], ['Spielkonsole', '', '[12 W]']] },
        { art: 'fragen', auftrag: 'Was schlagen Ben und Lea vor?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'eine Steckdosenleiste mit Schalter; abends schaltet der Letzte alles aus; ein Schild „Ausschalten statt Standby!“' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo gibt es in der Schule Stromfresser? Macht einen Rundgang (in Gedanken oder wirklich) und sammelt.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Beamer', 'Licht in leeren Räumen', 'Computer', 'Kaffeemaschine'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Strom berechnen', punkte: ['Leistung in **Watt (W)**', '**Watt × Stunden = Wattstunden**', '**1000 Wh = 1 kWh**', 'etwa **25 Cent** pro kWh (gerundet)'] },
         { titel: 'Sicher mit Strom', punkte: ['nie mit **nassen Händen**', 'keine **kaputten Kabel**', 'nichts in **Steckdosen** stecken', '**FI-Schutzschalter** schützt'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Rechne den Verbrauch und die Kosten (1 kWh ≈ 0,25 €, gerundet, Stand 2026).', stufe: 2, spalten: 2, items: [
        { a: 'Ein Föhn (1800 W) läuft 10 Minuten am Tag. Wie viele Wattstunden sind das?', l: '1800 · 1/6 = 300 Wh', raum: 2 },
        { a: 'Wie viele kWh braucht der Föhn so in 30 Tagen? Was kostet das?', l: '30 · 300 Wh = 9 kWh; 9 · 0,25 € = 2,25 €', raum: 2 },
        { a: 'Eine Konsole braucht im Standby 12 W, 20 Stunden am Tag. Wie viele Wh pro Tag?', l: '12 · 20 = 240 Wh', raum: 2 },
        { a: 'Wie viel kostet dieser Standby im Jahr? (365 Tage)', l: '240 · 365 = 87 600 Wh ≈ 88 kWh; 88 · 0,25 € = 22 €', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Plakat „Strom sparen und sicher bleiben“ für das Jugendhaus: drei Spartipps und drei Sicherheitsregeln.', stufe: 2,
        anfaenge: ['Strom sparen:', '1. …', 'Sicher bleiben:', '1. …'], zeilen: 7,
        beispiel: 'Strom sparen: 1. Ausschalten statt Standby. 2. Licht aus, wenn niemand im Raum ist. 3. Wasserkocher nur mit so viel Wasser füllen, wie man braucht. Sicher bleiben: 1. Keine Geräte mit nassen Händen anfassen. 2. Kaputte Kabel sofort melden. 3. Nicht zu viele Mehrfachstecker hintereinander.' },
    ],
    check: ['Ich berechne Wattstunden und Kilowattstunden.', 'Ich erkenne Stromfresser.', 'Ich kenne Sicherheitsregeln für Strom.'],
  },
  // ================================================================ 5
  {
    thema: 'Gefahrensymbole · Haushaltschemie', titel: 'Achtung, Gefahr!', untertitel: 'Rote Rauten auf Putzmitteln: Du lernst die Gefahrensymbole kennen, hörst, warum man Reiniger nie mischen darf, und prüfst Verpackungen.',
    ziel: { de: 'Ich kenne die wichtigsten Gefahrensymbole und gehe sicher mit Haushaltschemikalien um.', fr: 'Je connais les principaux pictogrammes de danger et j’utilise les produits ménagers en sécurité.' },
    bild: ['sami:verwirrt:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Schon gesehen?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo hast du schon rote Rauten mit schwarzen Zeichen gesehen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['auf Putzmitteln', 'auf Grillanzündern', 'auf Farben und Klebern', 'auf Joghurtbechern'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Symbolen', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Symbole nach dem weltweiten GHS-System, vereinfacht gezeichnet', titel: 'Rote Rauten verstehen',
      absaetze: [
        'Viele Produkte im Haushalt können gefährlich sein: Abflussreiniger, WC-Reiniger, Grillanzünder, Sprays, Farben. Auf ihnen stehen **Gefahrensymbole**: schwarze Zeichen in einer **weißen Raute mit rotem Rand**. Sie gelten weltweit gleich, damit jeder sie versteht – egal, welche Sprache er spricht.',
        '### Wichtige Regeln',
        'Gefährliche Produkte immer in der **Originalverpackung** lassen, nie in Trinkflaschen umfüllen. **Kindersicher** und weit weg von Lebensmitteln aufbewahren. **Gebrauchsanweisung** lesen, Handschuhe tragen, lüften. Und: **Reiniger nie mischen!** Manche Mischungen bilden giftige Gase.',
        '### Im Notfall',
        'Wer etwas Gefährliches verschluckt oder in die Augen bekommen hat: Ruhe bewahren und die **Verpackung** bereithalten. Bei Lebensgefahr **112** anrufen. Rat gibt das Antigiftzentrum, auch für Luxemburg, rund um die Uhr kostenlos: **8002 5500** (Stand 2026). Augen mit viel Wasser ausspülen. Nicht zum Erbrechen bringen.',
      ],
      bildHtml: gefahrensymbole({ spalten: 3, kurz: true }),
      woerter: [['das Gefahrensymbol', 'le pictogramme de danger'], ['die Raute', 'le losange'], ['entzündbar', 'inflammable'], ['giftig', 'toxique'], ['ätzend', 'corrosif'], ['umweltgefährlich', 'dangereux pour l’environnement'], ['die Originalverpackung', 'l’emballage d’origine'], ['verschlucken', 'avaler']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das Symbol? Verbinde.', stufe: 1, links: ['Flamme', 'Totenkopf', 'Ausrufezeichen', 'toter Fisch'], rechts: ['entzündbar', 'giftig', 'Achtung: reizt Haut und Augen', 'umweltgefährlich'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Putzraum der Schule', titel: 'Nie mischen!',
      situation: 'Sami hilft beim Aufräumen nach dem Schulfest. Der Hausmeister erklärt den Putzraum.',
      bild: ['lehrer:froh:erklaeren', 'sami:ueberrascht:stehen'], sprecher: { Hausmeister: 'm1', Sami: 'm3' },
      text: [
        ['Sami', 'Die Toiletten sind echt dreckig. Kann ich nicht einfach zwei Reiniger zusammenkippen? Dann wird es doppelt sauber.'],
        ['Hausmeister', 'Auf keinen Fall! Schau mal: Dieser Reiniger enthält Chlor, der andere Säure. Wenn man die mischt, entsteht ein giftiges Gas. Das kann die Lunge schwer verletzen.'],
        ['Sami', 'Oh. Das wusste ich nicht.'],
        ['Hausmeister', 'Darum gilt: Immer nur ein Mittel benutzen und die Anleitung lesen. Siehst du die rote Raute mit dem Ausrufezeichen und die mit der Hand? Die zweite heißt: ätzend. Darum Handschuhe!'],
        ['Sami', 'Und warum steht hier eine Flasche mit einem Fisch drauf?'],
        ['Hausmeister', 'Das ist schädlich für die Umwelt, besonders für Tiere im Wasser. Reste davon nie in den Ausguss kippen, sondern zum Recyclinghof bringen.'],
        ['Sami', 'Gut, dass ich gefragt habe.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „ätzend“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es zerstört Haut oder Material.', 'Es riecht gut.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Zwei Reiniger zu mischen macht doppelt sauber.', false], ['Chlor und Säure bilden zusammen ein giftiges Gas.', true], ['Bei ätzenden Mitteln trägt man Handschuhe.', true], ['Umweltgefährliche Reste kippt man in den Ausguss.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie kann man Putzmittel sicher aufbewahren, wenn kleine Kinder im Haus sind? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['hoch oben', 'abschließbarer Schrank', 'Originalflasche', 'nicht neben Lebensmitteln'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gefahrensymbole', punkte: ['**Flamme**: entzündbar', '**Totenkopf**: giftig', '**Ausrufezeichen**: reizend, gesundheitsschädlich', '**Hand und Tropfen**: ätzend', '**toter Fisch**: umweltgefährlich'] },
         { titel: 'Sicherheitsregeln', punkte: ['**Originalverpackung**', '**nie mischen**', 'Handschuhe, lüften', 'Notfall: **112** · Antigiftzentrum **8002 5500**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Was bedeuten die Gefahrensymbole? Schreibe die Bedeutung darunter.', stufe: 2, html: gefahrensymbole({ leer: true, spalten: 3 }) },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe fünf Regeln für den Putzraum der Schule.', stufe: 2,
        anfaenge: ['1.', '2.', '3.', '4.', '5.'], zeilen: 6,
        beispiel: '1. Nie zwei Reiniger mischen. 2. Immer Handschuhe tragen. 3. Alle Mittel in der Originalflasche lassen. 4. Beim Putzen Fenster öffnen. 5. Reste von umweltgefährlichen Mitteln zum Recyclinghof bringen.' },
    ],
    check: ['Ich erkenne die wichtigsten Gefahrensymbole.', 'Ich weiß, warum man Reiniger nicht mischen darf.', 'Ich weiß, was im Notfall zu tun ist.'],
  },
  // ================================================================ 6
  {
    thema: 'Säuren und Laugen · pH-Wert (Versuch)', titel: 'Sauer oder basisch?', untertitel: 'Zitrone, Seife, Abflussreiniger: Du lernst die pH-Skala kennen, stellst aus Rotkohl einen Farbanzeiger her und testest Stoffe aus der Küche.',
    ziel: { de: 'Ich unterscheide Säuren, Laugen und neutrale Stoffe und teste sie mit einem Indikator.', fr: 'Je distingue acides, bases et substances neutres et je les teste avec un indicateur.' },
    bild: ['nele:froh:rollstuhl', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was schmeckt sauer?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was schmeckt sauer? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Zitronensaft', 'Essig', 'saure Gurken', 'Milch'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Skala', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die pH-Skala',
      absaetze: [
        '**Säuren** schmecken sauer, zum Beispiel Zitronensaft und Essig. Auch im Magen gibt es eine starke Säure, die beim Verdauen hilft. **Laugen** (man sagt auch: **basische** Stoffe) fühlen sich oft seifig an, zum Beispiel Seifenlauge oder Natron. Reines Wasser ist **neutral**: weder sauer noch basisch.',
        '### Messen mit Zahlen',
        'Wie sauer oder basisch etwas ist, zeigt der **pH-Wert**. Die Skala geht von **0 bis 14**. Unter 7 ist **sauer**, 7 ist **neutral**, über 7 ist **basisch**. Je weiter weg von der 7, desto stärker. Sehr starke Säuren und Laugen sind **ätzend** – zum Beispiel Abflussreiniger. Nie probieren!',
        '### Ein Farbanzeiger aus Rotkohl',
        'Den pH-Wert kann man mit einem **Indikator** zeigen: einem Stoff, der seine Farbe ändert. Rotkohlsaft ist so ein Indikator. In Säure wird er **rot oder pink**, in neutralem Wasser bleibt er **violett**, in Laugen wird er **blau, grün** oder sogar **gelb**.',
      ],
      bildHtml: phSkala(),
      woerter: [['die Säure', 'l’acide'], ['die Lauge', 'la base, la solution basique'], ['neutral', 'neutre'], ['der pH-Wert', 'le pH'], ['der Indikator', 'l’indicateur'], ['der Rotkohl', 'le chou rouge'], ['die Skala', 'l’échelle'], ['der Essig', 'le vinaigre']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Sauer, neutral oder basisch? Kreuze an.', stufe: 1, kopf: ['Stoff', 'sauer', 'neutral', 'basisch'], breiten: [40, 20, 20, 20], zeilen: [['Zitronensaft (pH 2)', '[x]', '', ''], ['Wasser (pH 7)', '', '[x]', ''], ['Seifenlauge (pH 10)', '', '', '[x]'], ['Essig (pH 3)', '[x]', '', ''], ['Natron in Wasser (pH 9)', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Anleitung', wo: 'Naturwissenschaften · Labor', titel: 'Sicher im Labor',
      situation: 'Mme Rantini bereitet die Klasse auf den Rotkohl-Versuch vor.',
      bild: ['lehrerin:froh:erklaeren', 'nele:froh:rollstuhl'], sprecher: { 'Mme Rantini': 'w1', Nele: 'w3' },
      text: [
        ['Mme Rantini', 'Bevor wir anfangen: Schutzbrille auf, lange Haare zusammenbinden. Im Labor wird nichts gegessen und nichts getrunken – auch nicht, wenn es aus der Küche kommt.'],
        ['Nele', 'Auch nicht den Zitronensaft?'],
        ['Mme Rantini', 'Nein. Laborgeräte sind keine Küchengeräte. Jetzt der Versuch: Ich habe Rotkohl klein geschnitten und mit heißem Wasser übergossen. Der Saft ist schön violett.'],
        ['Nele', 'Und jetzt kippen wir überall etwas hinein?'],
        ['Mme Rantini', 'Genau, in jedes Glas ein bisschen Rotkohlsaft. Dann gebt ihr je einen Teelöffel dazu: Zitronensaft, Essig, Leitungswasser, Seifenwasser und Natron. Beobachtet die Farbe und schreibt sie sofort auf.'],
        ['Nele', 'Was ist, wenn etwas ins Auge kommt?'],
        ['Mme Rantini', 'Dann sofort zur Augendusche und lange mit Wasser spülen – und mir Bescheid sagen. Darum tragen wir ja die Brille. Los geht’s!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum trägt man im Labor eine Schutzbrille? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['damit nichts in die Augen spritzt', 'damit man besser sieht'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Welche Regeln nennt Mme Rantini? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Schutzbrille tragen', 'lange Haare zusammenbinden', 'im Labor nichts essen und trinken', 'alles probieren'], r: [0, 1, 2] }] },
        { art: 'fragen', auftrag: 'Was tut man, wenn etwas ins Auge kommt?', stufe: 1, fragen: [{ f: '', l: 'sofort zur Augendusche, lange mit Wasser spülen, Bescheid sagen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Farbe erwartet ihr bei Zitronensaft, Wasser und Seifenwasser? Stellt Vermutungen auf.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich vermute, dass … wird, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'pH-Skala', punkte: ['**unter 7**: sauer (Zitrone, Essig)', '**7**: neutral (Wasser)', '**über 7**: basisch (Seife, Natron)', 'stark sauer oder basisch = **ätzend**'] },
         { titel: 'Rotkohl-Indikator', punkte: ['sauer → **rot / pink**', 'neutral → **violett**', 'basisch → **blau, grün, gelb**'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Forscht in der Gruppe (mit Schutzbrille).', stufe: 2,
        frage: 'Welche Stoffe aus der Küche sind sauer, welche basisch?',
        material: ['Rotkohlsaft (violett)', '5 Gläser', 'Zitronensaft, Essig, Leitungswasser, Seifenwasser, Natron', 'Teelöffel, Schutzbrille'],
        schritte: ['Füll in jedes Glas etwas Rotkohlsaft.', 'Gib in jedes Glas einen Teelöffel von einem Stoff.', 'Beobachte die Farbe.', 'Ordne die Stoffe: sauer, neutral, basisch.'],
        loesung: { vermutung: 'z. B. Zitronensaft wird rot, Seifenwasser wird blau.', beobachtung: 'Zitronensaft: rot/pink · Essig: rot/pink · Wasser: violett · Seifenwasser: blau bis grün · Natron: blau/grün', ergebnis: 'Zitronensaft und Essig sind sauer, Wasser ist neutral, Seifenwasser und Natron sind basisch.' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Versuchsbericht zum Rotkohl-Versuch.', stufe: 2,
        anfaenge: ['Frage: …', 'Material: …', 'Durchführung: …', 'Beobachtung: …', 'Ergebnis: …'], zeilen: 8,
        beispiel: 'Frage: Welche Stoffe sind sauer, welche basisch? Material: Rotkohlsaft, fünf Gläser, Zitronensaft, Essig, Wasser, Seifenwasser, Natron. Durchführung: Wir haben in jedes Glas Rotkohlsaft gegeben und je einen Stoff dazugegeben. Beobachtung: Zitronensaft und Essig wurden pink, Wasser blieb violett, Seifenwasser und Natron wurden blaugrün. Ergebnis: Zitronensaft und Essig sind sauer, Seifenwasser und Natron sind basisch.' },
    ],
    check: ['Ich erkläre die pH-Skala.', 'Ich unterscheide sauer, neutral und basisch.', 'Ich arbeite sicher im Labor.'],
  },
  // ================================================================ 7
  {
    thema: 'Künstliche Intelligenz · Chancen und Grenzen', titel: 'Wie schlau ist KI?', untertitel: 'Chatbots, Übersetzer, Bildgeneratoren: Du erfährst, wie künstliche Intelligenz lernt, hörst, wie ein Chatbot sich irrt, und findest Regeln für den Umgang mit KI.',
    ziel: { de: 'Ich erkläre einfach, wie KI funktioniert, und nutze sie kritisch und verantwortungsvoll.', fr: 'J’explique simplement comment fonctionne l’IA et je l’utilise de façon critique et responsable.' },
    bild: ['ben:froh:laptop', 'yusuf:verwirrt:laptop'],
    start: {
      was: 'KI im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo steckt künstliche Intelligenz drin? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Übersetzungs-Apps', 'Video-Empfehlungen', 'Sprachassistenten', 'Gesichtserkennung beim Handy', 'ein Lineal'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Lernen aus Millionen Beispielen',
      absaetze: [
        'Mit **künstlicher Intelligenz (KI)** meint man Computerprogramme, die Aufgaben lösen, für die Menschen nachdenken müssen: Sprache verstehen, Bilder erkennen, Texte schreiben. KI lernt aus **riesigen Datenmengen**. Ein Programm, das Katzen erkennen soll, sieht Millionen Katzenbilder und findet **Muster**.',
        '### Was KI gut kann',
        'KI kann sehr schnell Texte zusammenfassen, übersetzen, Ideen sammeln, Bilder erzeugen und Fehler in Programmen finden. Ärztinnen und Ärzte nutzen KI zum Beispiel, um Röntgenbilder schneller zu prüfen.',
        '### Wo KI Fehler macht',
        'KI **versteht** nicht wirklich, was sie schreibt. Sie berechnet, welche Wörter wahrscheinlich passen. Darum kann sie Dinge **erfinden**, die falsch sind – und klingt dabei sehr überzeugt. Wenn in den Daten **Vorurteile** stecken, übernimmt die KI sie. Und mit KI kann man täuschend echte falsche Bilder, Stimmen und Videos machen: **Deepfakes**.',
        '### Regeln',
        'In der EU gibt es ein **KI-Gesetz**: Deepfakes müssen zum Beispiel als künstlich erzeugt gekennzeichnet werden. Für dich gilt: Keine persönlichen Daten in KI-Programme eingeben, Antworten immer **prüfen**, angeben, wenn man KI benutzt hat, und niemanden mit KI-Bildern bloßstellen.',
      ],
      woerter: [['künstliche Intelligenz (KI)', 'l’intelligence artificielle (IA)'], ['die Daten', 'les données'], ['das Muster', 'le modèle, le motif'], ['erfinden', 'inventer'], ['das Vorurteil', 'le préjugé'], ['täuschend echt', 'd’un réalisme trompeur'], ['kennzeichnen', 'signaler, étiqueter'], ['bloßstellen', 'humilier publiquement']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was kann KI gut, wo muss man aufpassen? Kreuze an.', stufe: 2, kopf: ['', 'kann KI gut', 'aufpassen!'], breiten: [60, 20, 20], zeilen: [['einen langen Text zusammenfassen', '[x]', ''], ['Fakten über eine Person nennen', '', '[x]'], ['einen Text übersetzen', '[x]', ''], ['ein Foto von einer echten Person verändern', '', '[x]'], ['Ideen für ein Referat sammeln', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Informatikraum', titel: 'Der Chatbot weiß alles – oder?',
      situation: 'Ben und Yusuf benutzen in der Schule einen Chatbot für ein Referat über ihre Gemeinde.',
      bild: ['ben:froh:laptop', 'yusuf:verwirrt:laptop'], sprecher: { Ben: 'm3', Chatbot: 'm1', Yusuf: 'm2' },
      text: [
        ['Ben', 'Ich frage den Chatbot: „Wann wurde das Schwimmbad in unserer Gemeinde gebaut?“'],
        ['Chatbot', 'Das Schwimmbad wurde im Jahr 1974 eröffnet. Es hat ein Fünfzig-Meter-Becken und eine Rutsche von achtzig Metern Länge.'],
        ['Yusuf', 'Moment. Unser Schwimmbad hat doch nur ein Fünfundzwanzig-Meter-Becken. Und eine Rutsche gibt es gar nicht!'],
        ['Ben', 'Aber er klingt so sicher.'],
        ['Yusuf', 'Genau das ist das Problem. Er hat es einfach erfunden. Komm, wir schauen auf der Internetseite der Gemeinde nach.'],
        ['Ben', 'Hier steht: eröffnet 1981, fünfundzwanzig Meter, keine Rutsche.'],
        ['Yusuf', 'Siehst du. Den Chatbot können wir für Ideen und die Gliederung nutzen. Aber Fakten prüfen wir immer selbst. Und im Referat schreiben wir dazu, wofür wir KI benutzt haben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Chatbot? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Programm, das im Chat auf Fragen antwortet', 'ein Roboter, der putzt'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sagt der Chatbot, was stimmt wirklich?', stufe: 1, kopf: ['', 'Chatbot', 'Gemeinde-Website'], breiten: [28, 36, 36], zeilen: [['eröffnet', '[1974]', '[1981]'], ['Becken', '[50 Meter]', '[25 Meter]'], ['Rutsche', '[80 Meter lang]', '[keine Rutsche]']] },
        { art: 'fragen', auftrag: 'Wofür wollen Ben und Yusuf den Chatbot weiter benutzen?', stufe: 2, fragen: [{ f: '', l: 'für Ideen und die Gliederung – Fakten prüfen sie selbst' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wann ist es fair, KI für Hausaufgaben zu benutzen, wann nicht? Diskutiert.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde es fair, wenn …', 'Es ist nicht fair, wenn …', 'Wichtig ist, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'So funktioniert KI', punkte: ['lernt aus **riesigen Datenmengen**', 'findet **Muster**', 'berechnet **wahrscheinliche** Antworten', 'versteht nicht wirklich'] },
         { titel: 'Meine KI-Regeln', punkte: ['**keine persönlichen Daten** eingeben', 'Antworten **prüfen**', '**angeben**, wenn KI geholfen hat', 'niemanden **bloßstellen** (Deepfakes)'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['KI macht die Schule einfacher.', 'KI-Bilder von echten Menschen sollten verboten sein.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Anleitung „KI fair und sicher nutzen“ für jüngere Schülerinnen und Schüler.', stufe: 2,
        anfaenge: ['KI kann dir helfen, …', 'Aber Achtung: …', 'Darum: …'], zeilen: 7,
        beispiel: 'KI kann dir helfen, Ideen zu sammeln, Texte zu verstehen oder etwas zu übersetzen. Aber Achtung: KI macht Fehler und erfindet manchmal Dinge, auch wenn sie sehr sicher klingt. Darum: Prüfe Fakten in anderen Quellen, gib nie deine Adresse oder Fotos ein und sag deiner Lehrerin, wenn du KI benutzt hast.' },
    ],
    check: ['Ich erkläre, wie KI lernt.', 'Ich nenne Stärken und Schwächen von KI.', 'Ich kenne Regeln für den Umgang mit KI.'],
  },
  // ================================================================ 8
  {
    thema: 'Fake News · Faktencheck', titel: 'Wahr oder falsch?', untertitel: 'Ein Gerücht im Klassenchat: Du lernst, warum Falschmeldungen sich so schnell verbreiten, und prüfst Nachrichten mit einem Faktencheck in fünf Schritten.',
    ziel: { de: 'Ich prüfe Nachrichten mit einem Faktencheck und verbreite keine Falschmeldungen.', fr: 'Je vérifie des informations et je ne diffuse pas de fausses nouvelles.' },
    bild: ['mia:verwirrt:handy', 'finn:froh:handy'],
    start: {
      was: 'Schon erlebt?',
      aufgaben: [
        { art: 'mc', auftrag: 'Warum teilen Menschen Falschmeldungen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['weil die Nachricht aufregend ist', 'weil sie nicht nachprüfen', 'weil sie anderen helfen wollen', 'weil das Handy es automatisch teilt'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Schneller als die Wahrheit',
      absaetze: [
        '**Fake News** sind falsche oder verdrehte Meldungen, die wie echte Nachrichten aussehen. Manche werden absichtlich gemacht: um Geld mit Klicks zu verdienen, um Angst zu machen oder um Menschen gegeneinander aufzuhetzen. Andere entstehen aus Versehen, wenn jemand etwas falsch versteht und weiterleitet.',
        '### Warum verbreiten sie sich so schnell?',
        'Falschmeldungen sind oft **überraschend**, **empörend** oder **beängstigend**. Solche Gefühle bringen uns dazu, schnell auf „Teilen“ zu drücken – ohne nachzudenken. Soziale Netzwerke zeigen außerdem besonders oft Beiträge, auf die viele reagieren.',
        '### Der Faktencheck in fünf Schritten',
        '**1. Innehalten:** Erst denken, dann teilen. **2. Quelle prüfen:** Wer hat das geschrieben? Gibt es ein Impressum? **3. Datum prüfen:** Ist die Meldung aktuell oder alt? **4. Andere Quellen suchen:** Berichten auch seriöse Nachrichtenseiten darüber? **5. Bilder prüfen:** Mit einer Bildersuche sieht man, ob ein Foto alt ist oder aus einem anderen Zusammenhang stammt.',
        '### Satire ist keine Lüge',
        '**Satire** übertreibt mit Absicht, um etwas lustig oder kritisch zu zeigen. Das ist erlaubt – man muss sie aber als Satire erkennen.',
      ],
      woerter: [['die Falschmeldung', 'la fausse nouvelle'], ['das Gerücht', 'la rumeur'], ['verbreiten', 'diffuser'], ['empörend', 'révoltant'], ['die Quelle', 'la source'], ['seriös', 'sérieux, fiable'], ['innehalten', 'faire une pause, s’arrêter'], ['die Satire', 'la satire']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Schritte des Faktenchecks.', stufe: 1, teile: ['innehalten', 'Quelle prüfen', 'Datum prüfen', 'andere Quellen suchen', 'Bilder prüfen'], ordnung: [3, 0, 4, 2, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klassenchat und Pause', titel: 'Das Gerücht',
      situation: 'Im Klassenchat taucht eine aufregende Nachricht auf. Mia und Finn prüfen sie.',
      bild: ['mia:verwirrt:handy', 'finn:froh:handy'], sprecher: { Mia: 'w3', Finn: 'm3' },
      text: [
        ['Mia', 'Hast du das im Klassenchat gesehen? „Achtung! Ab Montag sind Handys in allen Schulen in Luxemburg komplett verboten, sogar in der Tasche! Strafe: hundert Euro! Teilt das!!!“'],
        ['Finn', 'Was? Wer hat das geschrieben?'],
        ['Mia', 'Es ist weitergeleitet. Da steht ein Link zu einer Seite namens „Schul-News-24“.'],
        ['Finn', 'Nie gehört. Mach den Faktencheck. Gibt es ein Impressum?'],
        ['Mia', 'Nein, gar nichts. Und das Bild vom Minister ist von 2019 – das hat die Bildersuche gezeigt.'],
        ['Finn', 'Es gibt zwar echte Handyregeln an den Schulen. Aber von einem Verbot ab Montag mit hundert Euro Strafe steht nichts beim Bildungsministerium und nichts in den Nachrichten. Also ein Fake.'],
        ['Mia', 'Ich schreibe in den Chat: „Stimmt nicht, bitte nicht weiterleiten.“ Und ich lösche die Nachricht nicht, damit der Klassenlehrer sie sehen kann.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Impressum“? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['eine Angabe, wer für eine Internetseite verantwortlich ist', 'eine Werbung'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Hinweise zeigen, dass die Meldung falsch ist?', stufe: 1, kopf: ['Prüfschritt', 'Ergebnis'], breiten: [32, 68], zeilen: [['Quelle', '[unbekannte Seite „Schul-News-24“, kein Impressum]'], ['Bild', '[Foto des Ministers von 2019]'], ['andere Quellen', '[nichts beim Bildungsministerium und bei den Nachrichten]'], ['Sprache', '[Aufforderung „Teilt das!“, Panik („Achtung!“), hohe Strafe]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie reagiert man im Klassenchat gut auf eine Falschmeldung, ohne jemanden bloßzustellen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich habe das geprüft: …', 'Bitte nicht weiterleiten, weil …', 'Hier ist die echte Info: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Faktencheck', nummern: true, punkte: ['**innehalten**', '**Quelle** prüfen (Impressum?)', '**Datum** prüfen', '**andere Quellen** suchen', '**Bilder** prüfen'] },
         { titel: 'Warnzeichen', punkte: ['viele **Ausrufezeichen**, GROSSBUCHSTABEN', '„**Teilt das!**“', 'starke **Gefühle**: Angst, Wut', '**unbekannte** Quelle'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Prüfe die ausgedachten Schlagzeilen. Eher echt oder eher Fake? Begründe kurz.', stufe: 2, kopf: ['Schlagzeile', 'eher echt', 'eher Fake', 'warum?'], breiten: [42, 12, 12, 34], zeilen: [['„Gemeinde eröffnet neuen Radweg zur Schule“ (Website der Gemeinde, heutiges Datum)', '[x]', '', '[offizielle Quelle, aktuell]'], ['„WISSENSCHAFTLER SCHOCKIERT: Schokolade macht in 3 Tagen 10 kg dünner!!!“', '', '[x]', '[übertrieben, Großbuchstaben, keine Quelle]'], ['„Hitze: Freibäder haben länger geöffnet“ (mehrere Nachrichtenseiten)', '[x]', '', '[mehrere seriöse Quellen]'], ['„Teilt das! Neue App klaut alle Fotos!!!“ (Kettenbrief ohne Quelle)', '', '[x]', '[Kettenbrief, Panik, keine Quelle]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe für die Klasse einen kurzen Faktencheck-Bericht über das Gerücht aus dem Hörtext.', stufe: 2,
        anfaenge: ['Die Meldung: …', 'So haben wir geprüft: …', 'Ergebnis: …', 'Unser Tipp: …'], zeilen: 7,
        beispiel: 'Die Meldung: Ab Montag sollen Handys in allen Schulen komplett verboten sein, sonst gibt es 100 Euro Strafe. So haben wir geprüft: Die Seite hat kein Impressum, das Foto ist von 2019, und beim Ministerium und in den Nachrichten steht nichts. Ergebnis: Die Meldung ist falsch. Unser Tipp: Erst prüfen, dann teilen!' },
    ],
    check: ['Ich erkläre, warum sich Fake News schnell verbreiten.', 'Ich kenne die fünf Schritte des Faktenchecks.', 'Ich reagiere richtig auf Falschmeldungen.'],
  },
]
