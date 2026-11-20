// Atelier · Modul 5 (6P) „Metall und Maschinen“ – Enseignement pratique, Voie de préparation.
// Transversale Kompetenzen (Leitfaden VP): Fiche technique lesen, Werkzeuge und Maschinen sicher bedienen, Qualität prüfen.
// Multimodal: Metalle erkennen (Magnet-Test), anreißen/feilen (Mitmach-Hörtext), Bohren (Bohrer-Arten, Maschinen-Pass),
// Akkuschrauber beschriften, biegen und verbinden, Projekt Handyständer aus Alublech mit Zuschnitt-Zeichnung.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { akkuschrauber, bohrerArten, blechHalter } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 5, {
  titel: 'Metall und Maschinen',
  titelFr: 'Métal et machines',
  unter: 'Metalle erkennen, anreißen, feilen, bohren und biegen. Mit dem Akkuschrauber arbeiten und am Ende einen Handyständer aus Aluminium bauen.',
  unterFr: 'Reconnaître les métaux, tracer, limer, percer, plier. Visseuse sans fil et projet : support de téléphone en aluminium.',
  farbe: '#4f6d8a',
  deckbild: ['amira:froh:stehen-zeigen', 'yusuf:froh:stehen', 'chloe:froh:handy'],
  blasen: [{ t: 'Magnet hält!', x: 8, y: 104 }, { t: 'Welches Bit?', x: 120, y: 92 }, { t: 'Entgraten!', x: 174, y: 150 }],
  aussprache: { 'Ø ?(\\d+)': 'Durchmesser \\1 Millimeter', '(\\d+) × (\\d+) × (\\d+) mm': '\\1 mal \\2 mal \\3 Millimeter', '\\bPH\\b': 'P H', '\\bPZ\\b': 'P Z', '\\bTX\\b': 'T X', '\\bHSS\\b': 'H S S', '\\bAlu\\b': 'Alu' },
  themen: [
    { titel: { de: 'Metall bearbeiten', fr: 'Travailler le métal' }, icon: 'tool', lektionen: 3 },
    { titel: { de: 'Maschinen und Projekt', fr: 'Machines et projet' }, icon: 'settings', lektionen: 3 },
  ],
})

const METALL = '#4f6d8a', PASS = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Metalle erkennen', titel: 'Stahl, Alu, Kupfer, Messing', untertitel: 'Metalle sehen ähnlich aus, sind aber sehr verschieden. Du lernst vier wichtige Metalle kennen und findest mit einem einfachen Test heraus, welches Metall vor dir liegt.',
    ziel: { de: 'Ich erkenne wichtige Metalle und ihre Eigenschaften.', fr: 'Je reconnais des métaux importants et leurs propriétés.' },
    bild: ['amira:froh:stehen-zeigen', 'yusuf:verwirrt:stehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Woraus ist eine Getränkedose in Europa meistens? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Aluminium', 'Kupfer', 'Gold'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Werkstoffkunde (vereinfacht)', titel: 'Metalle im Alltag',
      absaetze: [
        '### Stahl',
        'Stahl ist **Eisen** mit ein wenig Kohlenstoff. Er ist **hart und stabil**. Man macht daraus Schrauben, Werkzeuge, Autos und Brücken. Normaler Stahl **rostet**, wenn er lange nass ist. Ein **Magnet** bleibt an ihm hängen.',
        '### Aluminium',
        'Aluminium – kurz **Alu** – ist **leicht**: etwa dreimal leichter als Stahl. Es rostet nicht. Man findet es in Getränkedosen, Fensterrahmen, Fahrrädern und Flugzeugen. Ein Magnet hält **nicht**.',
        '### Kupfer',
        'Kupfer ist **rötlich-braun**. Es **leitet Strom** und Wärme sehr gut. Darum sind in Kabeln Kupferdrähte. Draußen wird Kupfer mit der Zeit **grün** – das sieht man an alten Kirchendächern.',
        '### Messing',
        'Messing ist eine Mischung aus **Kupfer und Zink**. So eine Mischung heißt **Legierung**. Messing ist **goldgelb**. Man findet es an Türgriffen, Schlüsseln und Trompeten.',
        '### Der Magnet-Test',
        'Hält ein Magnet, ist es meistens **Stahl oder Eisen**. Aluminium, Kupfer und Messing sind **nicht magnetisch**. Metallreste gehören nie in den Restmüll: Man kann Metall sehr oft **einschmelzen** und neu verwenden.',
      ],
      woerter: [['das Metall', 'le métal'], ['der Stahl', 'l’acier'], ['das Eisen', 'le fer'], ['rosten', 'rouiller'], ['leicht', 'léger'], ['leiten', 'conduire'], ['der Magnet', 'l’aimant'], ['die Legierung', 'l’alliage']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle mit dem Text.', stufe: 1, kopf: ['Metall', 'magnetisch?', 'rostet?', 'Besonders …'], breiten: [22, 20, 20, 38], zeilen: [['Stahl', '[ja]', '[ja]', '[hart und stabil]'], ['Aluminium', '[nein]', '[nein]', '[leicht]'], ['Kupfer', '[nein]', '[nein, wird grün]', '[leitet Strom sehr gut]'], ['Messing', '[nein]', '[nein]', '[goldgelb, aus Kupfer und Zink]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · an der Restekiste', titel: 'Was ist das für ein Metall?',
      situation: 'In der Werkstatt steht eine Kiste mit Metallresten. Amira und Yusuf sollen sie sortieren. Herr Steffen gibt ihnen einen Magneten.',
      bild: ['amira:froh:stehen-zeigen', 'yusuf:verwirrt:stehen'], sprecher: { 'Herr Steffen': 'm1', Amira: 'w3', Yusuf: 'm3' },
      text: [
        ['Herr Steffen', 'Hier ist ein Magnet. Damit könnt ihr schon viel herausfinden. Fangt mit der Schraube an.'],
        ['Yusuf', 'Der Magnet hält! Also ist die Schraube aus Stahl.'],
        ['Amira', 'Jetzt die Dose. Der Magnet hält nicht. Und sie ist ganz leicht. Aluminium!'],
        ['Yusuf', 'Und dieses Kabelstück? Innen ist es rötlich.'],
        ['Herr Steffen', 'Genau hinschauen hilft. Rötlicher Draht im Kabel ist Kupfer.'],
        ['Amira', 'Hier ist ein alter Schlüssel. Er ist goldgelb, aber der Magnet hält nicht. Ist das Gold?'],
        ['Herr Steffen', 'Leider nein. Das ist Messing – eine Mischung aus Kupfer und Zink.'],
        ['Yusuf', 'Und was machen wir jetzt mit den Resten?'],
        ['Herr Steffen', 'Wir sammeln sie getrennt. Wenn die Kisten voll sind, bringen wir sie zum Recyclinghof. Dort wird das Metall eingeschmolzen und wieder verwendet.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Recyclinghof? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Ort, an dem man Abfall getrennt abgibt, damit er wieder verwendet wird', 'ein Bauernhof'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Metall ist es? Woran erkennen sie es?', stufe: 1, kopf: ['Gegenstand', 'Metall', 'Woran erkannt?'], breiten: [24, 24, 52], zeilen: [['Schraube', '[Stahl]', '[Der Magnet hält.]'], ['Dose', '[Aluminium]', '[Magnet hält nicht, sehr leicht]'], ['Kabelstück', '[Kupfer]', '[innen rötlich]'], ['alter Schlüssel', '[Messing]', '[goldgelb, Magnet hält nicht]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Dinge aus Metall benutzt du jeden Tag? Aus welchem Metall sind sie wohl?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich benutze jeden Tag …', 'Ich glaube, das ist aus …, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vier Metalle', punkte: ['**Stahl**: hart, stabil, rostet, magnetisch', '**Aluminium**: leicht, rostet nicht', '**Kupfer**: rötlich, leitet Strom', '**Messing**: goldgelb, Kupfer + Zink'] },
         { titel: 'Tipps', punkte: ['**Magnet-Test**: hält = meist Stahl oder Eisen', '**Gewicht** und **Farbe** beachten', 'Reste **getrennt sammeln**', 'Metall kann man sehr oft **recyceln**'] }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Aus welchem Metall ist das meistens? Verbinde.', stufe: 1, links: ['Fahrradkette', 'Alufolie', 'Draht im Stromkabel', 'Trompete'], rechts: ['Stahl', 'Aluminium', 'Kupfer', 'Messing'] },
      { art: 'fragen', auftrag: 'Überlege und antworte.', stufe: 2, fragen: [{ f: 'Warum baut man Flugzeuge vor allem aus Aluminium und nicht aus Stahl?', zeilen: 2, l: 'Weil Aluminium viel leichter ist; ein leichtes Flugzeug braucht weniger Treibstoff.' }, { f: 'Ein Gartentor aus Stahl wird rot-braun. Was ist passiert? Was kann man tun?', zeilen: 2, l: 'Es rostet. Man kann den Rost abschleifen und das Tor streichen (lackieren), damit kein Wasser mehr an den Stahl kommt.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du bist eine leere Getränkedose. Erzähle, was nach dem Trinken mit dir passiert.', stufe: 2,
        anfaenge: ['Ich bin eine Dose aus …', 'Nach dem Trinken …', 'Im Recycling …', 'Am Ende werde ich …'], zeilen: 6,
        beispiel: 'Ich bin eine Dose aus Aluminium. Nach dem Trinken wirft mich jemand in den Sack für Verpackungen. Ein Lastwagen bringt mich zu einer Sortieranlage. Dort werde ich gepresst und später eingeschmolzen. Am Ende werde ich vielleicht wieder eine Dose – oder ein Teil von einem Fahrrad.' },
    ],
    check: ['Ich kenne vier Metalle und ihre Eigenschaften.', 'Ich mache den Magnet-Test.', 'Ich weiß, wohin Metallreste gehören.'],
  },
  // ================================================================ 2
  {
    thema: 'Anreißen · Feilen · Entgraten', titel: 'Genau arbeiten mit der Feile', untertitel: 'Auf Metall zeichnet man nicht mit dem Bleistift, man reißt an. Dann spannt man das Werkstück ein und feilt bis zur Linie. Du hörst eine Mitmach-Anleitung zum Feilen.',
    ziel: { de: 'Ich reiße ein Metallstück an, feile es bis zur Linie und entgrate die Kanten.', fr: 'Je trace une pièce en métal, je la lime jusqu’au trait et j’ébavure les arêtes.' },
    bild: ['nele:froh:rollstuhl', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Überlege',
      aufgaben: [
        { art: 'fragen', auftrag: 'Kann man auf Metall gut mit dem Bleistift zeichnen? Was könnte man stattdessen nehmen?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Nicht gut – man sieht den Strich kaum und er wischt sich weg. Man nimmt eine Reißnadel (oder einen wasserfesten Stift).' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Werkstatt-Anleitung', titel: 'Ein Metallstück anreißen und feilen',
      material: ['Flachstahl oder Alublech', 'Stahlmaßstab, Anschlagwinkel, Reißnadel', 'Feile', 'Schraubstock mit Schutzbacken'],
      schritte: [
        { icon: 'ruler-2', text: '**Messen:** Miss mit dem Stahlmaßstab und markiere das Maß.' },
        { icon: 'pencil', text: '**Anreißen:** Lege den Anschlagwinkel an die gerade Kante. Ziehe mit der Reißnadel eine **feine Linie**. Diese Linie bleibt sichtbar, auch beim Feilen.' },
        { icon: 'lock', text: '**Einspannen:** Spanne das Werkstück im Schraubstock ein – mit **Schutzbacken**, damit es keine Kratzer bekommt. Die Linie ist knapp über den Backen.' },
        { icon: 'arrows-horizontal', text: '**Feilen:** Eine Hand hält das **Heft**, die andere liegt vorn auf der Feile. **Drücke nur beim Vorschieben**, beim Zurückziehen nicht.' },
        { icon: 'eye-check', text: '**Prüfen:** Schau immer wieder nach: Bin ich schon an der Linie? Ist die Kante gerade? Prüfe mit dem Winkel.' },
        { icon: 'hand-stop', text: '**Entgraten:** An den Kanten entstehen scharfe **Grate**. Feile sie schräg und leicht weg. Dann schneidet sich niemand.' },
      ],
      danach: ['Feilspäne **nie wegblasen** und nicht mit der Hand wegwischen – nimm einen **Handfeger** oder Pinsel. Benutze eine Feile **nie ohne Heft**.'],
      woerter: [['anreißen', 'tracer'], ['die Reißnadel', 'la pointe à tracer'], ['der Anschlagwinkel', 'l’équerre à chapeau'], ['der Schraubstock', 'l’étau'], ['die Feile', 'la lime'], ['der Span', 'le copeau'], ['der Grat', 'la bavure'], ['entgraten', 'ébavurer']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Auf Metall reißt man mit der Reißnadel an.', true], ['Man drückt die Feile beim Zurückziehen fest auf.', false], ['Schutzbacken schützen das Werkstück vor Kratzern.', true], ['Feilspäne bläst man einfach weg.', false], ['Entgraten heißt: scharfe Kanten wegfeilen.', true]] },
      ],
    },
    hoeren: {
      was: 'Eine Mitmach-Anleitung', wo: 'Werkstatt · an der Werkbank', titel: 'Feilen im Takt',
      situation: 'Herr Steffen erklärt die richtige Haltung beim Feilen. Nele probiert es aus. Du kannst mitmachen – auch ohne Feile.',
      bild: ['nele:froh:rollstuhl', 'lehrer:froh:erklaeren'], sprecher: { 'Herr Steffen': 'm1', Nele: 'w3' },
      text: [
        ['Herr Steffen', 'Stellt euch vor den Schraubstock. Die Füße stehen etwa schulterbreit. Der linke Fuß ist ein Stück vorn, der rechte hinten. Wer mit links arbeitet, macht es umgekehrt.'],
        ['Herr Steffen', 'Der Schraubstock ist ungefähr auf der Höhe von eurem Ellenbogen. Die rechte Hand hält das Heft, die linke Hand liegt vorn auf der Feile.'],
        ['Nele', 'Und ich im Rollstuhl?'],
        ['Herr Steffen', 'Für dich ist der Schraubstock an der niedrigen Werkbank. Dann ist er auch bei dir auf Ellenbogenhöhe. Die Arme machen genau dieselbe Bewegung.'],
        ['Herr Steffen', 'Und jetzt: Vor – mit Druck. Zurück – ohne Druck. Vor … und zurück. Vor … und zurück. Ruhig und gleichmäßig, mit der ganzen Länge der Feile.'],
        ['Nele', 'Das ist ja ganz langsam! Ich dachte, man muss schnell feilen.'],
        ['Herr Steffen', 'Schnell und hektisch macht die Kante schief. Langsam und mit der ganzen Feile geht es am Ende schneller.'],
        ['Nele', 'Und warum soll ich beim Zurückziehen nicht drücken?'],
        ['Herr Steffen', 'Die Zähne der Feile schneiden nur in eine Richtung – nach vorn. Wenn du beim Zurückziehen drückst, werden sie stumpf.'],
        ['Nele', 'Okay. Vor – mit Druck. Zurück – ohne. … Es wird schon gerader!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist das Heft einer Feile? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der Griff', 'ein Schulheft', 'die Spitze'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie stehen die Füße?', zeilen: 2, l: 'etwa schulterbreit, ein Fuß vorn, ein Fuß hinten' }, { f: 'Wie hoch ist der Schraubstock?', l: 'ungefähr auf Ellenbogenhöhe' }, { f: 'Warum drückt man beim Zurückziehen nicht?', zeilen: 2, l: 'Die Zähne schneiden nur nach vorn; sonst werden sie stumpf.' }, { f: 'Warum soll man nicht schnell feilen?', zeilen: 2, l: 'Hektisch feilen macht die Kante schief.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht die Feil-Bewegung zu zweit ohne Feile nach. Einer sagt den Takt, der andere bewegt sich. Dann wechseln.', stufe: 1, karten: [
        { titel: 'Takt', text: ['Vor – mit Druck.', 'Zurück – ohne Druck.', 'Ganze Länge!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Arbeitsschritte', nummern: true, punkte: ['**messen**', '**anreißen** (Reißnadel, Winkel)', '**einspannen** (Schutzbacken)', '**feilen** bis zur Linie', '**prüfen**', '**entgraten**'] },
         { titel: 'Feilen', punkte: ['Druck **nur beim Vorschieben**', '**ganze Länge** der Feile nutzen', 'ruhig und gleichmäßig', 'Späne mit **Handfeger**, nie pusten', 'Feile **nie ohne Heft**'] }],
      ],
    },
    ueben: [
      { art: 'ordnen', auftrag: 'Bringe die Arbeitsschritte in die richtige Reihenfolge.', stufe: 1, teile: ['messen', 'anreißen', 'einspannen', 'feilen', 'prüfen', 'entgraten'], ordnung: [3, 5, 0, 4, 1, 2] },
      { art: 'zuordnen', auftrag: 'Wofür brauchst du das? Verbinde.', stufe: 2, links: ['Reißnadel', 'Anschlagwinkel', 'Schutzbacken', 'Handfeger', 'Feile'], rechts: ['eine feine Linie ins Metall ritzen', 'einen rechten Winkel anreißen und prüfen', 'das Werkstück vor Kratzern schützen', 'Späne sicher entfernen', 'Metall bis zur Linie abtragen'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem jüngeren Schüler, wie man richtig feilt. Benutze die Wörter „Heft“, „Druck“ und „entgraten“.', stufe: 2,
        anfaenge: ['Zuerst …', 'Beim Feilen …', 'Wichtig ist, dass …', 'Zum Schluss …'], zeilen: 6,
        beispiel: 'Zuerst spannst du das Werkstück mit Schutzbacken in den Schraubstock. Beim Feilen hältst du die Feile mit einer Hand am Heft und mit der anderen vorn. Wichtig ist, dass du nur beim Vorschieben Druck machst. Zum Schluss musst du die Kanten entgraten, damit sich niemand schneidet.' },
    ],
    check: ['Ich reiße mit Reißnadel und Winkel an.', 'Ich feile mit der richtigen Haltung.', 'Ich entgrate Kanten und entferne Späne sicher.'],
  },
  // ================================================================ 3
  {
    thema: 'Bohren an der Säulenbohrmaschine', titel: 'Sicher bohren', untertitel: 'Die Säulenbohrmaschine ist stark und schnell – darum gelten hier besondere Regeln. Du lernst den richtigen Bohrer, die richtige Drehzahl und machst deinen Maschinen-Pass.',
    ziel: { de: 'Ich bohre sicher und wähle den richtigen Bohrer.', fr: 'Je perce en sécurité et je choisis le bon foret.' },
    bild: ['yusuf:froh:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Was denkst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Warum hält man ein Werkstück beim Bohren nie mit der Hand fest? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Der Bohrer kann das Werkstück packen und herumschleudern.', 'Weil die Hand dabei schmutzig wird.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Werkstatt-Regeln', titel: 'Sicher an der Bohrmaschine',
      absaetze: [
        '### Vor dem Bohren',
        'Zuerst **körnt** man die Stelle: Man setzt den **Körner** auf die Markierung und schlägt einmal mit dem Hammer darauf. In der kleinen Delle rutscht der Bohrer nicht weg. Dann spannt man das Werkstück **fest** in den Maschinenschraubstock. Schutzbrille auf, lange Haare zusammenbinden, keine weiten Ärmel, keinen Schmuck – und **keine Handschuhe**, denn sie können sich im Bohrer verfangen.',
        '### Der richtige Bohrer',
        'Für **Holz** gibt es Bohrer mit einer langen **Zentrierspitze**. Für **Metall** nimmt man Bohrer mit einer **kegeligen Spitze**. Für **Stein und Beton** braucht man einen Bohrer mit einer harten, breiten **Platte** an der Spitze.',
        '### Die richtige Drehzahl',
        'Die Drehzahl sagt, wie schnell sich der Bohrer dreht. Eine einfache Regel: **dünner Bohrer – schnell**, **dicker Bohrer – langsam**. In Metall bohrt man langsamer als in Holz.',
        '### Nach dem Bohren',
        'Maschine ausschalten und **warten, bis sie steht**. Der Bohrer und die Späne können **heiß** sein. Späne entfernt man mit dem Pinsel.',
      ],
      woerter: [['die Säulenbohrmaschine', 'la perceuse à colonne'], ['körnen', 'pointer'], ['der Körner', 'le pointeau'], ['einspannen', 'serrer'], ['der Bohrer', 'le foret'], ['die Drehzahl', 'la vitesse de rotation'], ['heiß', 'brûlant'], ['der Ärmel', 'la manche']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Bevor man bohrt, macht man mit dem [Körner] eine kleine Delle.', 'Das Werkstück spannt man fest in den [Maschinenschraubstock].', 'An der Bohrmaschine trägt man keine [Handschuhe].', 'Ein dünner Bohrer dreht sich [schnell], ein dicker Bohrer [langsam].', 'Nach dem Bohren wartet man, bis die Maschine [steht].'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · an der Säulenbohrmaschine', titel: 'Der Maschinen-Pass',
      situation: 'Yusuf möchte allein an der Säulenbohrmaschine arbeiten. Vorher stellt ihm Herr Steffen ein paar Fragen für den Maschinen-Pass.',
      bild: ['yusuf:nervoes:stehen', 'lehrer:froh:erklaeren'], sprecher: { 'Herr Steffen': 'm1', Yusuf: 'm3' },
      text: [
        ['Herr Steffen', 'Du willst ein Loch mit 8 Millimetern in dieses Stahlstück bohren. Was machst du zuerst?'],
        ['Yusuf', 'Ich nehme den 8-Millimeter-Bohrer und fange an.'],
        ['Herr Steffen', 'Halt. Was fehlt noch?'],
        ['Yusuf', 'Ah – körnen! Sonst rutscht der Bohrer weg. Und ich spanne das Stück in den Maschinenschraubstock.'],
        ['Herr Steffen', 'Gut. Welchen Bohrer nimmst du für Stahl?'],
        ['Yusuf', 'Einen Metallbohrer, mit der kegeligen Spitze.'],
        ['Herr Steffen', 'Und die Drehzahl? Schnell oder langsam?'],
        ['Yusuf', 'Eher langsam, weil es Metall ist und der Bohrer schon ziemlich dick ist.'],
        ['Herr Steffen', 'Richtig. Und was trägst du?'],
        ['Yusuf', 'Schutzbrille. Ärmel hochkrempeln. Keine Handschuhe.'],
        ['Herr Steffen', 'Sehr gut. Jetzt zeigst du es mir einmal unter Aufsicht. Wenn alles klappt, bekommst du die Unterschrift im Pass.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „unter Aufsicht“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Jemand schaut zu und hilft, wenn nötig.', 'Man arbeitet ganz allein.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Yusuf denkt zuerst sofort ans Körnen.', false], ['Für Stahl nimmt Yusuf einen Metallbohrer.', true], ['Yusuf will mit hoher Drehzahl bohren.', false], ['Yusuf trägt Handschuhe.', false], ['Bevor Yusuf allein bohren darf, zeigt er es einmal unter Aufsicht.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt die Szene nach: Einer stellt die Fragen für den Maschinen-Pass, der andere antwortet.', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Was machst du zuerst?', 'Welchen Bohrer nimmst du?', 'Welche Drehzahl?', 'Was trägst du?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vor dem Bohren', nummern: true, punkte: ['**körnen**', 'Werkstück **fest einspannen**', '**Schutzbrille**, Haare zusammen', '**keine Handschuhe**, kein Schmuck'] },
         { titel: 'Bohrer und Drehzahl', punkte: ['**Holz**: Zentrierspitze', '**Metall**: kegelige Spitze', '**Stein**: breite Hartmetallplatte', '**dünn – schnell**, **dick – langsam**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Welcher Bohrer ist für welches Material? Schau dir die Spitzen genau an.', stufe: 2, html: '<div class="voll">' + bohrerArten() + '</div>', liste: [['A', 'Holzbohrer (Zentrierspitze)'], ['B', 'Metallbohrer (kegelige Spitze)'], ['C', 'Steinbohrer (Hartmetallplatte)']], spalten: 1 },
      { art: 'tabelle', auftrag: 'Schnell oder langsam? Kreuze die richtige Drehzahl an.', stufe: 2, kopf: ['Aufgabe', 'eher schnell', 'eher langsam'], breiten: [60, 20, 20], zeilen: [['3-mm-Loch in Holz', '[x]', ''], ['10-mm-Loch in Stahl', '', '[x]'], ['4-mm-Loch in Aluminium', '[x]', ''], ['12-mm-Loch in Holz', '', '[x]']] },
      { art: 'schneidekarten', auftrag: 'Mein Maschinen-Pass: Schneide die Karten aus. Die Lehrperson unterschreibt, wenn du eine Stufe geschafft hast.', stufe: 1, neueSeite: true, titel: 'Maschinen-Pass', icon: 'id-badge-2', farbe: PASS, spalten: 2,
        karten: [
          { text: '**Säulenbohrmaschine**\n☐ Regeln erklärt  ☐ unter Aufsicht  ☐ darf allein', linien: 2 }, { text: '**Akkuschrauber**\n☐ Regeln erklärt  ☐ unter Aufsicht  ☐ darf allein', linien: 2 },
          { text: '**Schleifmaschine**\n☐ Regeln erklärt  ☐ unter Aufsicht  ☐ darf allein', linien: 2 }, { text: '**Stichsäge**\n☐ Regeln erklärt  ☐ unter Aufsicht  ☐ darf allein', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Schreibe die fünf wichtigsten Regeln an der Bohrmaschine auf und erkläre bei jeder Regel, warum sie wichtig ist.', stufe: 2,
        anfaenge: ['Erstens …, weil …', 'Zweitens …', 'Außerdem …', 'Am wichtigsten finde ich …'], zeilen: 7,
        beispiel: 'Erstens körne ich die Stelle, weil der Bohrer sonst wegrutscht. Zweitens spanne ich das Werkstück fest ein, weil der Bohrer es sonst herumschleudern kann. Außerdem trage ich eine Schutzbrille gegen Späne und keine Handschuhe, damit sich nichts verfängt. Am wichtigsten finde ich, dass ich warte, bis die Maschine ganz steht.' },
    ],
    check: ['Ich bereite das Bohren sicher vor.', 'Ich wähle den richtigen Bohrer.', 'Ich wähle eine passende Drehzahl.'],
  },
  // ================================================================ 4
  {
    thema: 'Der Akkuschrauber', titel: 'Bohren und schrauben ohne Kabel', untertitel: 'Der Akkuschrauber ist das Werkzeug, das man in fast jedem Beruf und zu Hause braucht. Du lernst seine Teile, das richtige Bit und die wichtigsten Einstellungen.',
    ziel: { de: 'Ich kenne die Teile des Akkuschraubers und stelle ihn richtig ein.', fr: 'Je connais les parties de la visseuse sans fil et je la règle correctement.' },
    bild: ['sami:froh:stehen', 'finn:verwirrt:stehen'],
    start: {
      was: 'Kennst du das?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist ein Akku? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Batterie, die man wieder aufladen kann', 'ein Kabel', 'ein Schalter'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Werkstatt-Anleitung', titel: 'So arbeitest du mit dem Akkuschrauber',
      material: ['Akkuschrauber mit geladenem Akku', 'Bit-Set', 'Schrauben', 'Restholz zum Üben'],
      schritte: [
        { icon: 'battery-charging', text: '**Akku prüfen:** Ist er geladen? Stecke ihn ein, bis er hörbar einrastet.' },
        { icon: 'tool', text: '**Das richtige Bit:** Schau dir den **Schraubenkopf** an: Schlitz, Kreuz (**PH** oder **PZ**), Stern (**TX**) oder Sechskant. Das Bit muss **genau passen**, sonst rutscht es ab.' },
        { icon: 'rotate', text: '**Bit einsetzen:** Stecke das Bit ins Bohrfutter und drehe das Futter fest.' },
        { icon: 'gauge', text: '**Drehmoment einstellen:** Am Ring stellst du die Kraft ein. **Kleine Zahl** für kleine Schrauben und weiches Holz. So dreht die Schraube nicht zu tief hinein.' },
        { icon: 'rotate-clockwise', text: '**Richtung wählen:** **Rechtslauf** dreht Schrauben hinein, **Linkslauf** dreht sie heraus. Gang **1** ist langsam und kräftig – gut zum Schrauben. Gang **2** ist schnell – gut zum Bohren.' },
        { icon: 'arrow-down', text: '**Schrauben:** Setze das Bit **gerade** auf, drücke leicht in Richtung Schraube und fange **langsam** an.' },
      ],
      danach: ['Nach der Arbeit nimmst du den Akku heraus und legst das Gerät sauber zurück. Lege Akkus **nicht in die Sonne** oder auf die Heizung. Ist ein Akku **beschädigt** oder aufgebläht, benutzt du ihn nicht mehr und gibst ihn der Lehrperson.'],
      woerter: [['der Akkuschrauber', 'la visseuse sans fil'], ['der Akku', 'la batterie rechargeable'], ['das Bit', 'l’embout'], ['das Bohrfutter', 'le mandrin'], ['das Drehmoment', 'le couple'], ['der Rechtslauf', 'la rotation à droite'], ['einrasten', 's’enclencher'], ['beschädigt', 'endommagé']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was passiert, wenn das Bit nicht genau passt?', l: 'Es rutscht ab (und der Schraubenkopf geht kaputt).' }, { f: 'Wozu stellt man das Drehmoment ein?', zeilen: 2, l: 'Damit die Schraube nicht zu tief hineindreht oder abreißt.' }, { f: 'Welchen Gang nimmst du zum Schrauben?', l: 'Gang 1 (langsam und kräftig)' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt', titel: 'Die Schraube dreht durch',
      situation: 'Finn will eine Leiste an ein Brett schrauben. Es klappt nicht. Sami hilft ihm.',
      bild: ['finn:wuetend:stehen', 'sami:froh:erklaeren'], sprecher: { Finn: 'm3', Sami: 'm2' },
      text: [
        ['Finn', 'So ein Mist! Das Bit rutscht immer wieder raus, und es rattert.'],
        ['Sami', 'Zeig mal. Du hast ein PH-Bit, aber das ist eine PZ-Schraube. Siehst du die kleinen Striche zwischen dem Kreuz?'],
        ['Finn', 'Ach so. Die sehen fast gleich aus.'],
        ['Sami', 'Fast. Aber das Bit muss genau passen. Und du musst ein bisschen drücken, gerade von oben.'],
        ['Finn', 'Okay … Jetzt geht es. Oh nein, jetzt ist die Schraube viel zu tief drin. Man sieht ein Loch im Holz.'],
        ['Sami', 'Dein Drehmoment steht auf der höchsten Stufe. Für so eine kleine Schraube in weichem Holz stellst du eine kleine Zahl ein.'],
        ['Finn', 'Und wie bekomme ich die Schraube jetzt wieder raus?'],
        ['Sami', 'Schalter auf Linkslauf, dann langsam herausdrehen. Danach drehst du sie an einer neuen Stelle wieder ein.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Die Schraube dreht durch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie dreht sich, hält aber nicht mehr fest.', 'Sie ist verrückt geworden.'], r: 0 }] }],
      beim: [
        { art: 'zuordnen', auftrag: 'Hör zu. Welches Problem – welche Lösung? Verbinde.', stufe: 2, links: ['Das Bit rutscht raus.', 'Die Schraube geht zu tief ins Holz.', 'Die Schraube soll wieder raus.'], rechts: ['das passende Bit nehmen (PZ) und gerade drücken', 'das Drehmoment auf eine kleine Zahl stellen', 'auf Linkslauf schalten und langsam herausdrehen'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo braucht man einen Akkuschrauber? Sammelt Berufe und Situationen zu Hause.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ein … braucht ihn, um …', 'Zu Hause kann man damit …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Einstellen', punkte: ['passendes **Bit**: PH, PZ, TX, Schlitz …', '**Drehmoment**: kleine Zahl = wenig Kraft', '**Rechtslauf** rein, **Linkslauf** raus', 'Gang **1** schrauben, Gang **2** bohren'] },
         { titel: 'Sicher', punkte: ['Bit **gerade** ansetzen, leicht drücken', '**langsam** anfangen', 'Akku **nicht in die Sonne**', 'beschädigter Akku: **nicht benutzen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wie heißen die Teile? Schreibe den Namen.', stufe: 1, html: '<div class="voll">' + akkuschrauber() + '</div>', liste: [['1', 'Bohrfutter'], ['2', 'Drehmoment-Ring'], ['3', 'Gang-Schalter (1 / 2)'], ['4', 'Rechts-/Linkslauf-Schalter'], ['5', 'Ein-/Aus-Schalter (Drücker)'], ['6', 'Akku']], spalten: 2 },
      { art: 'zuordnen', auftrag: 'Welches Bit passt? Verbinde Schraubenkopf und Bit.', stufe: 2, links: ['ein gerader Strich', 'ein Kreuz', 'ein Kreuz mit kleinen Strichen dazwischen', 'ein Stern mit sechs runden Spitzen', 'ein Sechseck-Loch'], rechts: ['Schlitz-Bit', 'PH-Bit', 'PZ-Bit', 'TX-Bit', 'Innensechskant-Bit'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein kurzes Plakat für die Werkstattwand: „Akkuschrauber – so geht’s“ in fünf Schritten.', stufe: 2,
        anfaenge: ['Akkuschrauber – so geht’s', '1. …', '2. …', '3. …', '4. …', '5. …'], zeilen: 7,
        beispiel: 'Akkuschrauber – so geht’s. 1. Akku prüfen und einstecken. 2. Passendes Bit wählen und festdrehen. 3. Drehmoment und Gang einstellen. 4. Bit gerade ansetzen, leicht drücken, langsam anfangen. 5. Nach der Arbeit Akku herausnehmen und alles aufräumen.' },
    ],
    check: ['Ich kenne die Teile des Akkuschraubers.', 'Ich wähle das passende Bit.', 'Ich stelle Drehmoment, Gang und Richtung richtig ein.'],
  },
  // ================================================================ 5
  {
    thema: 'Biegen und verbinden', titel: 'In Form bringen und zusammenfügen', untertitel: 'Dünnes Blech und Draht kann man biegen. Teile verbindet man mit Schrauben, Nieten oder Kleber. Du lernst, welche Verbindung man wieder lösen kann und welche nicht.',
    ziel: { de: 'Ich biege Blech richtig und unterscheide lösbare und unlösbare Verbindungen.', fr: 'Je plie la tôle correctement et je distingue assemblages démontables et non démontables.' },
    bild: ['chloe:froh:handy', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Sammle',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wie kann man zwei Teile miteinander verbinden? Nenne so viele Arten wie möglich.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. schrauben, nageln, kleben, nieten, nähen, stecken, schweißen, löten, binden' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext', titel: 'Biegen und verbinden',
      absaetze: [
        '### Biegen',
        'Dünnes **Blech** und **Draht** kann man kalt biegen. Blech spannt man im Schraubstock zwischen zwei **Biegebacken** ein, genau an der **Biegelinie**. Dann drückt man es mit der Hand oder mit einem Holzklotz und dem Gummihammer um die Kante. Draht biegt man mit der **Zange**.',
        'Wichtig: Biege **in einem Zug** und nicht immer wieder hin und her. Sonst wird das Metall an der Biegestelle müde und kann **reißen**.',
        '### Lösbar oder unlösbar?',
        'Eine **Schraube** kann man wieder herausdrehen. Das ist eine **lösbare** Verbindung. **Nieten**, **Kleben** und **Schweißen** sind **unlösbare** Verbindungen: Man bekommt die Teile nur wieder auseinander, wenn man etwas kaputt macht.',
        '### Nieten',
        'Mit einem **Blindniet** verbindet man zwei Bleche, auch wenn man nur von einer Seite herankommt. Man bohrt ein Loch durch beide Bleche, steckt den Niet hinein und zieht ihn mit der **Nietzange** fest.',
      ],
      woerter: [['biegen', 'plier'], ['das Blech', 'la tôle'], ['der Draht', 'le fil métallique'], ['die Biegelinie', 'la ligne de pliage'], ['die Zange', 'la pince'], ['reißen', 'se fissurer'], ['lösbar', 'démontable'], ['der Niet', 'le rivet']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lösbar oder unlösbar? Kreuze an.', stufe: 1, kopf: ['Verbindung', 'lösbar', 'unlösbar'], breiten: [60, 20, 20], zeilen: [['Schraube und Mutter', '[x]', ''], ['Blindniet', '', '[x]'], ['Kleben', '', '[x]'], ['Schweißen', '', '[x]'], ['Stecken (zum Beispiel ein Stecker)', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · am Schraubstock', titel: 'Ein Riss im Blech',
      situation: 'Chloe biegt ein Stück Alublech für ihren Handyständer. Plötzlich sieht sie einen feinen Riss.',
      bild: ['chloe:enttaeuscht:stehen', 'lehrer:froh:erklaeren'], sprecher: { Chloe: 'w3', 'Herr Steffen': 'm1' },
      text: [
        ['Chloe', 'Herr Steffen, schauen Sie mal. Da ist ein Riss an der Biegung.'],
        ['Herr Steffen', 'Wie hast du gebogen?'],
        ['Chloe', 'Erst zu weit, dann wieder zurück, dann noch einmal. Es war nicht gerade.'],
        ['Herr Steffen', 'Das ist das Problem. Wenn man Aluminium hin und her biegt, wird es an der Stelle müde. Dann reißt es.'],
        ['Chloe', 'Und wie mache ich es richtig?'],
        ['Herr Steffen', 'Reiß die Biegelinie mit dem Winkel an. Dann spannst du das Blech so ein, dass die Linie genau an der Kante der Biegebacken liegt. Und dann drückst du es mit dem Holzklotz in einem Zug um.'],
        ['Chloe', 'Nicht mit dem Hammer direkt?'],
        ['Herr Steffen', 'Nein, der Hammer macht Dellen. Holzklotz oder Gummihammer. Ich gebe dir ein neues Stück. Fehler gehören zum Lernen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Riss? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine feine Spalte, wo das Material auseinandergeht', 'ein Kratzer mit dem Bleistift'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum hat das Blech einen Riss?', zeilen: 2, l: 'Chloe hat es hin und her gebogen; dadurch wird es an der Stelle müde und reißt.' }, { f: 'Wo muss die Biegelinie beim Einspannen liegen?', zeilen: 2, l: 'genau an der Kante der Biegebacken' }, { f: 'Womit drückt man das Blech um? Womit nicht?', zeilen: 2, l: 'mit dem Holzklotz oder Gummihammer, nicht direkt mit dem Hammer (Dellen)' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Herr Steffen sagt: „Fehler gehören zum Lernen.“ Was meint ihr dazu? Erzählt von einem Fehler, aus dem ihr etwas gelernt habt (nur wenn ihr wollt).', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, …', 'Einmal habe ich …', 'Daraus habe ich gelernt, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Biegen', nummern: true, punkte: ['**Biegelinie** anreißen', 'Linie an die **Kante der Biegebacken**', 'mit **Holzklotz** oder Gummihammer', '**in einem Zug** biegen, nicht hin und her'] },
         { titel: 'Verbindungen', punkte: ['**lösbar**: Schraube, Stecken', '**unlösbar**: Niet, Kleben, Schweißen', '**Blindniet**: von einer Seite setzen'] }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Welches Werkzeug brauchst du für welche Verbindung? Verbinde.', stufe: 1, links: ['Blindniet', 'Schraube mit Kreuzschlitz', 'Mutter auf einer Schraube', 'Holzleim'], rechts: ['Nietzange', 'Akkuschrauber oder Schraubendreher', 'Schraubenschlüssel', 'Pinsel und Schraubzwinge'] },
      { art: 'fragen', auftrag: 'Was nimmst du? Begründe.', stufe: 3, fragen: [{ f: 'Du baust ein Vogelhaus. Das Dach soll man öffnen können, um es zu putzen. Welche Verbindung nimmst du für das Dach?', zeilen: 2, l: 'eine lösbare Verbindung (Schrauben oder Scharnier), damit man das Dach öffnen kann' }, { f: 'Zwei Bleche an einem Rohr sollen fest verbunden werden. Man kommt nur von außen heran. Was nimmst du?', zeilen: 2, l: 'Blindniete, weil man sie von einer Seite setzen kann' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Suche in deiner Umgebung (Klasse, Schulhof, zu Hause) drei Verbindungen. Beschreibe: Was ist verbunden? Wie? Lösbar oder unlösbar?', stufe: 2,
        anfaenge: ['Am Stuhl …', 'Die Tür …', 'Mein Rucksack …', 'Das ist lösbar / unlösbar, weil …'], zeilen: 6,
        beispiel: 'Am Stuhl sind die Beine mit Schrauben am Sitz befestigt. Das ist lösbar, weil man die Schrauben herausdrehen kann. Die Tür hängt an Scharnieren, die mit Schrauben festgemacht sind – auch lösbar. Am Fahrradständer sind die Rohre geschweißt. Das ist unlösbar.' },
    ],
    check: ['Ich biege Blech an der Biegelinie in einem Zug.', 'Ich unterscheide lösbare und unlösbare Verbindungen.', 'Ich wähle eine passende Verbindung.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Handyständer aus Alublech', titel: 'Mein Handyständer', untertitel: 'Jetzt baust du ein echtes Werkstück aus Metall. Du liest eine technische Zeichnung, planst die Schritte, arbeitest sauber und prüfst am Ende die Qualität.',
    ziel: { de: 'Ich baue ein Werkstück aus Metall nach Zeichnung und prüfe seine Qualität.', fr: 'Je réalise une pièce en métal d’après un dessin et je contrôle sa qualité.' },
    bild: ['amira:froh:handy', 'lehrer:froh:stehen'],
    start: {
      was: 'Was ist wichtig?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was muss ein guter Handyständer können? Kreuze alles Richtige an.', stufe: 1, fragen: [{ f: '', o: ['Das Handy steht schräg und sicher.', 'Er kippt nicht um.', 'Er hat keine scharfen Kanten.', 'Er ist möglichst schwer.'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Eine Fiche technique', art: 'anleitung', stimme: 'w2',
      quelle: 'Fiche technique', titel: 'Handyständer aus Alublech',
      material: ['Alublech 150 × 70 × 2 mm', 'Stahlmaßstab, Anschlagwinkel, Reißnadel', 'Feile, Schleifpapier 240', 'Schraubstock mit Biegebacken', 'Holzklotz oder Gummihammer'],
      schritte: [
        { icon: 'pencil', text: '**Anreißen:** Reiße die **Biegelinie 1** bei 20 mm und die **Biegelinie 2** bei 80 mm an – mit dem Anschlagwinkel, quer über das ganze Blech.' },
        { icon: 'tool', text: '**Ecken runden:** Feile die vier Ecken leicht rund. So sticht nichts.' },
        { icon: 'hand-stop', text: '**Entgraten und schleifen:** Entgrate alle Kanten. Schleife die Oberfläche mit Schleifpapier 240 in eine Richtung – das sieht schön aus.' },
        { icon: 'arrow-bear-right', text: '**Biegung 1:** Spanne das Blech an Linie 1 ein. Biege den kurzen Teil (20 mm) **in einem Zug** um 90° nach oben. Das ist die **Lippe**, an der das Handy steht.' },
        { icon: 'arrow-bear-right', text: '**Biegung 2:** Spanne das Blech an Linie 2 ein. Biege die Rückwand nach oben, bis der Winkel etwa **65°** ist.' },
        { icon: 'circle-check', text: '**Prüfen:** Stelle dein Handy hinein. Steht es sicher? Kippt der Ständer? Sind alle Kanten glatt?' },
      ],
      danach: ['Arbeite **sauber**: Ein Werkstück ist erst fertig, wenn alle Kanten entgratet sind und der Arbeitsplatz aufgeräumt ist.'],
      woerter: [['die Fiche technique', 'la fiche technique'], ['der Zuschnitt', 'la pièce découpée'], ['die Lippe', 'le rebord'], ['die Rückwand', 'le dossier'], ['der Winkel', 'l’angle'], ['kippen', 'basculer'], ['die Qualität', 'la qualité'], ['sauber', 'propre, soigné']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Lies die Zeichnung und antworte.', stufe: 2, html: '<div class="voll">' + blechHalter() + '</div>', liste: [['Wie groß ist das Blech?', '150 × 70 mm, 2 mm dick'], ['Wie lang ist die Lippe?', '20 mm'], ['Wie lang ist die Standfläche?', '80 − 20 = 60 mm'], ['Wie lang ist die Rückwand?', '150 − 80 = 70 mm']], spalten: 1 },
      ],
    },
    hoeren: {
      was: 'Eine Werkstück-Kontrolle', wo: 'Werkstatt · Abnahme', titel: 'Amiras Handyständer',
      situation: 'Amira ist fertig. Herr Steffen prüft ihr Werkstück mit der Qualitäts-Checkliste.',
      bild: ['amira:stolz:handy', 'lehrer:froh:stehen'], sprecher: { 'Herr Steffen': 'm1', Amira: 'w3' },
      text: [
        ['Amira', 'Fertig! Hier ist mein Handyständer.'],
        ['Herr Steffen', 'Schön. Dann prüfen wir zusammen. Erstens: Kanten. Ich fahre mit dem Finger darüber … Alle Kanten sind glatt. Sehr gut entgratet.'],
        ['Herr Steffen', 'Zweitens: Biegungen. Die Lippe ist gerade. Die zweite Biegung ist ein kleines bisschen schief – siehst du? Links ist sie etwas höher.'],
        ['Amira', 'Ja. Da habe ich das Blech nicht ganz gerade eingespannt.'],
        ['Herr Steffen', 'Drittens: Steht das Handy sicher?'],
        ['Amira', 'Ja, es steht. Auch wenn ich auf den Bildschirm tippe, kippt es nicht.'],
        ['Herr Steffen', 'Viertens: Oberfläche. Schön gleichmäßig geschliffen. Insgesamt: sehr gute Arbeit. Was machst du beim nächsten Mal anders?'],
        ['Amira', 'Ich prüfe mit dem Winkel, ob das Blech gerade im Schraubstock sitzt, bevor ich biege.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Abnahme in der Werkstatt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man prüft ein fertiges Werkstück, ob es gut ist.', 'Man nimmt jemandem etwas weg.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle die Checkliste für Amiras Werkstück aus.', stufe: 1, kopf: ['Prüfpunkt', 'Ergebnis'], breiten: [35, 65], zeilen: [['Kanten', '[alle glatt, gut entgratet]'], ['Biegungen', '[Lippe gerade, zweite Biegung etwas schief]'], ['Standfestigkeit', '[Handy steht sicher, kippt nicht]'], ['Oberfläche', '[gleichmäßig geschliffen]'], ['nächstes Mal', '[mit dem Winkel prüfen, ob das Blech gerade eingespannt ist]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Prüft eure Werkstücke gegenseitig mit der Checkliste. Sagt zuerst, was gut ist, dann einen Tipp.', stufe: 2, karten: [
        { titel: 'Rückmeldung', text: ['Gut gelungen ist …', 'Mein Tipp: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Projekt Metall', nummern: true, punkte: ['Zeichnung **lesen**', '**anreißen**', 'Ecken runden, **entgraten**, schleifen', '**biegen** in einem Zug', '**prüfen**'] },
         { titel: 'Qualität', punkte: ['**Kanten** glatt', '**Biegungen** gerade', '**Funktion**: steht sicher', '**Oberfläche** gleichmäßig', 'Arbeitsplatz **aufgeräumt**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Meine Qualitäts-Checkliste: Prüfe dein eigenes Werkstück.', stufe: 2, kopf: ['Prüfpunkt', 'sehr gut', 'gut', 'noch nicht'], breiten: [52, 16, 16, 16], zeilen: [['Alle Kanten sind entgratet und glatt.', '', '', ''], ['Die Biegungen sind gerade.', '', '', ''], ['Die Maße stimmen (± 1 mm).', '', '', ''], ['Das Handy steht sicher.', '', '', ''], ['Die Oberfläche ist gleichmäßig.', '', '', ''], ['Mein Arbeitsplatz ist aufgeräumt.', '', '', '']] },
      { art: 'rechnen', auftrag: 'Rechne für die ganze Klasse.', stufe: 3, spalten: 2, items: [{ a: 'Ein Blech ist 150 mm lang. Wie viele Bleche bekommt man aus einem Streifen von 1 m? (ohne Verschnitt)', l: '1000 ÷ 150 = 6 Stück (Rest 100 mm)' }, { a: 'Ein Streifen von 1 m kostet 4,20 €. Was kostet ein Handyständer?', l: '4,20 € ÷ 6 = 0,70 €' }, { a: 'Die Klasse hat 12 Schüler. Wie viele Streifen braucht man?', l: '12 ÷ 6 = 2 Streifen' }, { a: 'Was kostet das Material für die ganze Klasse?', l: '2 × 4,20 € = 8,40 €' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Wie ist dein Handyständer geworden? Was war schwierig? Was machst du beim nächsten Mal anders?', stufe: 2,
        anfaenge: ['Mein Handyständer …', 'Gut gelungen ist …', 'Schwierig war …', 'Beim nächsten Mal …'], zeilen: 7,
        beispiel: 'Mein Handyständer ist fertig und mein Handy steht sicher darin. Gut gelungen sind die Kanten, sie sind ganz glatt. Schwierig war die zweite Biegung, weil das Blech im Schraubstock etwas verrutscht ist. Beim nächsten Mal prüfe ich mit dem Winkel, bevor ich biege.' },
    ],
    check: ['Ich lese eine Fiche technique mit Zeichnung.', 'Ich baue ein Werkstück aus Metall sauber.', 'Ich prüfe die Qualität mit einer Checkliste.'],
  },
]
