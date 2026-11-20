// Culture générale · Modul 4 (6P) – Schwerpunkt Geschichte, Bürgerkunde, Berufsorientierung
// (MENJE-Leitfaden Voie de préparation: Module 1, 4, 7). Themen: Leben im Mittelalter (Stände, Stadt, Abtei
// Echternach), Festung Luxemburg, Weg zur Unabhängigkeit (1815, 1839, 1867, 1890), Kinderrechte, die Gemeinde,
// Mitbestimmen in der Schule, Berufsfelder und Ausbildung, das Schnupperpraktikum.
// Geschichtliche Angaben: gut belegte Eckdaten, vereinfacht; Rechtliches mit Stand-Hinweis. Personen: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { luxKarte } from './karten.mjs'

export const MODUL = sachModul('culge', 4, {
  titel: 'Vom Mittelalter zur Mitbestimmung',
  titelFr: 'Du Moyen Âge à la participation',
  unter: 'Burgherren und Bauern, die Festung Luxemburg, der Weg zur Unabhängigkeit, Kinderrechte, die Gemeinde, mitbestimmen in der Schule – und der erste Blick in die Arbeitswelt. In acht Lektionen.',
  unterFr: 'Seigneurs et paysans, la forteresse, l’indépendance, les droits de l’enfant, la commune, la participation à l’école et le monde du travail.',
  farbe: '#7a3f8f',
  deckbild: ['chloe:froh:stehen-zeigen', 'yusuf:froh:stehen', 'lehrer:froh:erklaeren'],
  blasen: [{ t: 'Wer bestimmt?', x: 16, y: 112 }, { t: '1839!', x: 120, y: 98 }, { t: 'Ich habe Rechte!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Luxemburgs Geschichte', fr: 'L’histoire du Luxembourg' }, icon: 'building-castle', lektionen: 3 },
    { titel: { de: 'Rechte und Mitbestimmung', fr: 'Droits et participation' }, icon: 'users-group', lektionen: 3 },
    { titel: { de: 'Arbeitswelt', fr: 'Le monde du travail' }, icon: 'briefcase', lektionen: 2 },
  ],
  karten: true,
})

// Ständepyramide (Mittelalter)
const staende = () => `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" style="width:110mm;max-width:100%;display:block;margin:0 auto">
  <path d="M180,10 L230,70 L130,70 Z" fill="#c9a7e8" stroke="#fff" stroke-width="3"/>
  <path d="M130,70 L230,70 L280,130 L80,130 Z" fill="#a7c4e8" stroke="#fff" stroke-width="3"/>
  <path d="M80,130 L280,130 L340,220 L20,220 Z" fill="#c9dfa7" stroke="#fff" stroke-width="3"/>
  <text x="180" y="55" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="800" fill="#2a2f3a">König</text>
  <text x="180" y="98" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="800" fill="#2a2f3a">Adel und Geistliche</text>
  <text x="180" y="115" text-anchor="middle" font-family="Lexend" font-size="11" fill="#2a2f3a">„beten und kämpfen“</text>
  <text x="180" y="170" text-anchor="middle" font-family="Lexend" font-size="13" font-weight="800" fill="#2a2f3a">Bauern (die meisten Menschen)</text>
  <text x="180" y="188" text-anchor="middle" font-family="Lexend" font-size="11" fill="#2a2f3a">„arbeiten“ – und geben Abgaben</text></svg>`

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Mittelalter · Stände · Stadt', titel: 'Wer betet, wer kämpft, wer arbeitet?', untertitel: 'Adel, Geistliche, Bauern, Bürger: Du lernst die Ordnung im Mittelalter kennen, hörst ein Gespräch auf dem Markt in Echternach und vergleichst Stadt und Land.',
    ziel: { de: 'Ich beschreibe die Stände im Mittelalter und das Leben in einer mittelalterlichen Stadt.', fr: 'Je décris les ordres de la société au Moyen Âge et la vie dans une ville médiévale.' },
    bild: ['opa:froh:stehen', 'chloe:ueberrascht:stehen'],
    start: {
      was: 'Damals und heute',
      aufgaben: [
        { art: 'mc', auftrag: 'Im Mittelalter konnten die meisten Menschen … Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['nicht lesen und schreiben', 'ihren Beruf nicht frei wählen', 'mit dem Auto reisen', 'im Winter frieren und hungern'], r: [0, 1, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Eine Ordnung für alle – aber nicht gerecht',
      absaetze: [
        'Das **Mittelalter** dauerte etwa von **500 bis 1500**. Die Menschen glaubten: Gott hat jedem Menschen seinen Platz gegeben. Die Gesellschaft war in **Stände** geteilt, und man blieb meist sein ganzes Leben im Stand, in den man geboren wurde.',
        '### Die drei Stände',
        'Die **Geistlichen** – Priester, Mönche und Nonnen – beteten und kümmerten sich um Kirche, Schulen und Kranke. Der **Adel** – Grafen, Herzöge, Ritter – besaß das Land und sollte es mit Waffen schützen. Die allermeisten Menschen aber waren **Bauern**. Sie arbeiteten auf den Feldern und mussten den Herren einen Teil der Ernte abgeben und für sie arbeiten.',
        '### Die Stadt',
        'Ab dem 12. Jahrhundert wuchsen die **Städte**. Dort lebten Handwerker und Händler, die **Bürger**. Sie schlossen sich in **Zünften** zusammen: Bäcker, Schmiede, Weber. Ein Sprichwort sagt: „Stadtluft macht frei“ – wer in die Stadt zog, konnte manchmal den Herren auf dem Land entkommen.',
        '### Echternach',
        'Eine der wichtigsten Städte in unserer Gegend war **Echternach**. Dort gründete der Mönch **Willibrord** um das Jahr 700 ein Kloster, die **Abtei**. Bis heute findet in Echternach jedes Jahr an Pfingstdienstag die **Springprozession** statt. Sie gehört zum Kulturerbe der UNESCO.',
      ],
      bildHtml: staende(),
      woerter: [['das Mittelalter', 'le Moyen Âge'], ['der Stand', 'l’ordre (social)'], ['der Adel', 'la noblesse'], ['die Geistlichen', 'le clergé'], ['die Abgabe', 'l’impôt, la redevance'], ['die Zunft', 'la corporation'], ['das Kloster (die Abtei)', 'le monastère (l’abbaye)'], ['die Prozession', 'la procession']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle zu den Ständen.', stufe: 1, kopf: ['Stand', 'Wer?', 'Aufgabe'], breiten: [24, 38, 38], zeilen: [['Geistliche', '[Priester, Mönche, Nonnen]', '[beten, Kirche, Schulen, Kranke]'], ['Adel', '[Grafen, Herzöge, Ritter]', '[Land besitzen und schützen]'], ['Bauern', '[die meisten Menschen]', '[Felder bearbeiten, Abgaben leisten]']] },
        { art: 'fragen', auftrag: 'Was bedeutet „Stadtluft macht frei“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wer in die Stadt zog und dort lebte, konnte oft nicht mehr vom Herrn auf dem Land zurückgeholt werden; in der Stadt war man freier.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Hörspiel', wo: 'Markt in Echternach · um 1350', titel: 'Auf dem Markt',
      situation: 'Ein Hörspiel: Die Bauerntochter Mett verkauft Eier auf dem Markt. Der Schmiedelehrling Pier spricht mit ihr.',
      bild: ['chloe:froh:stehen', 'finn:froh:stehen'], sprecher: { Erzähler: 'm1', Mett: 'w2', Pier: 'm3' },
      text: [
        ['Erzähler', 'Echternach, an einem Markttag um 1350. Zwischen den Ständen riecht es nach Brot, Fisch und Rauch.'],
        ['Pier', 'Frische Eier? Wie viel kosten zwölf?'],
        ['Mett', 'Zwei Pfennige. Mein Vater sagt, ich soll nicht weniger nehmen. Wir müssen dem Grafen bald unsere Abgabe zahlen.'],
        ['Pier', 'Ihr Bauern habt es schwer. Ich lerne bei Meister Klaus das Schmieden. In fünf Jahren bin ich Geselle.'],
        ['Mett', 'Du Glücklicher. Ich würde auch gern ein Handwerk lernen. Aber Mädchen dürfen das selten.'],
        ['Pier', 'In der Zunft der Weber gibt es Frauen. Meine Tante arbeitet dort.'],
        ['Mett', 'Wirklich? Vielleicht frage ich einmal …'],
        ['Erzähler', 'Ob Mett Weberin wurde, wissen wir nicht. Aber solche Fragen stellten sich viele junge Menschen im Mittelalter.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Lehrling? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein junger Mensch, der einen Beruf lernt', 'ein Lehrer', 'ein Ritter'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Mett verkauft Eier.', true], ['Mett muss keine Abgaben zahlen.', false], ['Pier lernt Schmied.', true], ['Mädchen konnten jeden Beruf frei lernen.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch vor, ihr lebt um 1350. Würdet ihr lieber in der Stadt oder auf dem Land leben? Begründet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['In der Stadt …', 'Auf dem Land …', 'Ich würde lieber …, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Mittelalter', punkte: ['etwa **500 bis 1500**', 'Gesellschaft in **Ständen**: Geistliche, Adel, Bauern', 'ab dem 12. Jh.: **Städte** mit Bürgern und Zünften'] },
         { titel: 'Echternach', punkte: ['Abtei, gegründet von **Willibrord** um 700', '**Springprozession** an Pfingstdienstag', 'UNESCO-Kulturerbe'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe mit dem, was du über das Mittelalter weißt.', stufe: 3, aussagen: ['Im Mittelalter war das Leben in der Stadt besser als auf dem Land.', 'Es ist gerecht, dass man im Stand seiner Eltern bleibt.'], hinweis: 'Satz 2: Heute sagen wir, dass alle Menschen die gleichen Rechte haben – egal, wo sie geboren werden. Die Ordnung der Stände war nicht gerecht.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief: Mett erzählt einer Freundin von ihrem Markttag und von ihrem Wunsch.', stufe: 2,
        anfaenge: ['Liebe …,', 'heute war ich auf dem Markt in Echternach.', 'Ich habe einen Jungen getroffen, …', 'Mein großer Wunsch ist …'], zeilen: 8,
        beispiel: 'Liebe Anna, heute war ich auf dem Markt in Echternach. Ich habe zwölf Eier für zwei Pfennige verkauft. Ich habe einen Jungen getroffen, der Schmied lernt. Er hat erzählt, dass es in der Zunft der Weber auch Frauen gibt. Mein großer Wunsch ist, Weberin zu werden und in der Stadt zu wohnen.' },
    ],
    check: ['Ich nenne die drei Stände im Mittelalter.', 'Ich beschreibe das Leben in einer mittelalterlichen Stadt.', 'Ich weiß, was die Abtei Echternach und die Springprozession sind.'],
  },
  // ================================================================ 2
  {
    thema: 'Festung · Kasematten · UNESCO', titel: 'Das Gibraltar des Nordens', untertitel: 'Mauern, Bastionen und Tunnel im Felsen: Du liest über die Festung Luxemburg, hörst eine Führung in den Kasematten und erklärst, warum die Festung abgerissen wurde.',
    ziel: { de: 'Ich erkläre, warum Luxemburg eine Festung war und was heute davon übrig ist.', fr: 'J’explique pourquoi Luxembourg était une forteresse et ce qu’il en reste aujourd’hui.' },
    bild: ['noah:ueberrascht:stehen', 'lehrerin:froh:zeigen'],
    start: {
      was: 'Schutz',
      aufgaben: [
        { art: 'mc', auftrag: 'Womit schützte man früher eine Stadt? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Mauern', 'Gräben', 'Türme', 'Tunnel', 'Videokameras'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Eine der stärksten Festungen Europas',
      absaetze: [
        'Luxemburg lag immer an einer wichtigen Stelle: zwischen Frankreich, Deutschland und den Niederlanden. Wer Luxemburg hatte, kontrollierte die Wege. Darum wollten viele Herrscher die Stadt besitzen: Burgunder, Spanier, Franzosen, Österreicher, Preußen.',
        '### Immer mehr Mauern',
        'Jeder neue Herrscher baute die Befestigung weiter aus. Es entstanden dicke Mauern, Bastionen, Gräben und Forts. Im 17. Jahrhundert begann man, Gänge in die Felsen zu schlagen: die **Kasematten**. Dort konnten sich Tausende Soldaten mit Pferden, Waffen und Vorräten verstecken. Die Festung galt als fast uneinnehmbar. Man nannte sie das **„Gibraltar des Nordens“**.',
        '### Das Ende der Festung',
        'Im Jahr **1867** beschlossen die europäischen Großmächte im **Londoner Vertrag**: Luxemburg soll **neutral** sein, also keinem Lager angehören. Darum musste die Festung **abgerissen** werden. Das dauerte viele Jahre. Einige Teile blieben aber stehen.',
        '### Heute',
        'Ein Teil der Kasematten kann man besichtigen. Die Altstadt und die Reste der Festung gehören seit **1994** zum **Welterbe der UNESCO**.',
      ],
      woerter: [['die Festung', 'la forteresse'], ['die Bastion', 'le bastion'], ['die Kasematten', 'les casemates'], ['der Herrscher', 'le souverain'], ['uneinnehmbar', 'imprenable'], ['neutral', 'neutre'], ['abreißen', 'démolir'], ['das Welterbe', 'le patrimoine mondial']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Die Gänge im Felsen heißen [Kasematten].', 'Man nannte die Festung das „[Gibraltar] des Nordens“.', 'Im Jahr [1867] wurde beschlossen, dass Luxemburg [neutral] sein soll.', 'Darum musste die Festung [abgerissen] werden.', 'Seit [1994] gehört die Altstadt zum UNESCO-Welterbe.'] },
        { art: 'fragen', auftrag: 'Warum wollten so viele Herrscher Luxemburg besitzen?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Luxemburg lag an einer wichtigen Stelle zwischen großen Ländern; wer es hatte, kontrollierte die Wege.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Kasematten am Bock', titel: 'Tief im Felsen',
      situation: 'Frau Kremer führt die Klasse durch die Kasematten.',
      bild: ['lehrerin:froh:zeigen', 'noah:ueberrascht:stehen'], sprecher: { 'Frau Kremer': 'w1', Noah: 'm3', Amira: 'w2' },
      text: [
        ['Frau Kremer', 'Willkommen in den Kasematten! Achtung, die Stufen sind feucht. Hier unten ist es das ganze Jahr ungefähr gleich kühl.'],
        ['Noah', 'Wie lang sind die Gänge?'],
        ['Frau Kremer', 'Früher waren es viele Kilometer. Heute sind noch etwa siebzehn Kilometer erhalten. Nur ein kleiner Teil ist für Besucher offen.'],
        ['Amira', 'Was haben die Soldaten hier gemacht?'],
        ['Frau Kremer', 'Hier waren Kanonen, Werkstätten, Bäckereien und Schlafplätze. Bei einer Belagerung konnten sie wochenlang im Felsen bleiben.'],
        ['Noah', 'Und im Zweiten Weltkrieg?'],
        ['Frau Kremer', 'Da haben Menschen hier Schutz vor Bombenangriffen gesucht. Die Kasematten waren also nicht nur für den Krieg, sondern auch für den Schutz da.'],
        ['Amira', 'Gruselig und spannend zugleich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Belagerung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Feinde umzingeln eine Stadt lange Zeit', 'ein Fest in der Stadt', 'ein Markt vor der Stadtmauer'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie viele Kilometer Gänge sind heute noch erhalten?', o: ['etwa 1 km', 'etwa 17 km', 'etwa 170 km'], r: 1 }, { f: 'Was gab es in den Kasematten? (mehrere)', o: ['Kanonen', 'Bäckereien', 'Schlafplätze', 'ein Kino'], r: [0, 1, 2] }] },
        { art: 'fragen', auftrag: 'Wozu dienten die Kasematten im Zweiten Weltkrieg?', stufe: 2, fragen: [{ f: '', l: 'Als Schutz vor Bombenangriffen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant zu zweit einen Ausflug zu den Kasematten oder zu einem anderen Ort der Festung: Was wollt ihr dort herausfinden?', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Wann wurde das gebaut?', 'Wer hat hier gelebt?', 'Was ist heute noch zu sehen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Festung Luxemburg', punkte: ['wichtige Lage zwischen großen Ländern', 'Mauern, Bastionen, **Kasematten**', '„**Gibraltar des Nordens**“'] },
         { titel: 'Wichtige Jahre', punkte: ['**1867**: Londoner Vertrag – Luxemburg wird **neutral**, Festung wird abgerissen', '**1994**: Altstadt und Festungsreste werden **UNESCO-Welterbe**'] }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Trage ein: 963, 1867, 1994. Schreibe dazu, was passiert ist.', stufe: 2, von: 900, bis: 2100, schritt: 100, hoehe: 80,
        ereignisse: [{ jahr: 963, text: 'Siegfried tauscht den Felsen: Gründung der Stadt', leer: true, jahrLeer: true }, { jahr: 1867, text: 'Neutralität; die Festung wird abgerissen', leer: true, jahrLeer: true }, { jahr: 1994, text: 'Altstadt und Festung werden UNESCO-Welterbe', leer: true, jahrLeer: true }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Text für ein Informationsschild am Eingang der Kasematten (für Jugendliche).', stufe: 2,
        anfaenge: ['Willkommen in den Kasematten!', 'Hier …', 'Früher …', 'Wusstest du, dass …?'], zeilen: 8,
        beispiel: 'Willkommen in den Kasematten! Hier, tief im Felsen, versteckten sich früher Tausende Soldaten mit Pferden und Kanonen. Die Gänge waren viele Kilometer lang. Früher galt Luxemburg als eine der stärksten Festungen Europas. Wusstest du, dass hier im Zweiten Weltkrieg Menschen Schutz vor Bomben suchten?' },
    ],
    check: ['Ich erkläre, warum Luxemburg eine Festung war.', 'Ich weiß, was 1867 beschlossen wurde.', 'Ich nenne, was heute von der Festung übrig ist.'],
  },
  // ================================================================ 3
  {
    thema: 'Unabhängigkeit · 1815 · 1839 · 1867 · 1890', titel: 'Luxemburg wird ein eigenes Land', untertitel: 'Großherzogtum, Teilung, Neutralität, eigene Großherzöge: Du verfolgst den Weg zur Unabhängigkeit auf einer Zeitleiste und einer Karte.',
    ziel: { de: 'Ich ordne die wichtigsten Schritte zur Unabhängigkeit Luxemburgs auf einer Zeitleiste.', fr: 'Je place les grandes étapes de l’indépendance du Luxembourg sur une frise.' },
    bild: ['opa:froh:stehen', 'lina:froh:stehen'],
    start: {
      was: 'Nationalfeiertag',
      aufgaben: [
        { art: 'mc', auftrag: 'An welchem Tag feiert Luxemburg den Nationalfeiertag? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['am 23. Juni', 'am 14. Juli', 'am 1. Mai'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (stark vereinfacht)', titel: 'In vier Schritten zum eigenen Staat',
      absaetze: [
        '### 1815: Ein Großherzogtum',
        'Nach den Kriegen Napoleons ordneten die Großmächte Europa neu, beim **Wiener Kongress**. Luxemburg wurde ein **Großherzogtum**. Großherzog war aber der König der Niederlande. Luxemburg war also mit den Niederlanden verbunden.',
        '### 1839: Die Teilung',
        'Im **Londoner Vertrag von 1839** wurde Luxemburg geteilt: Der größere, westliche, überwiegend französischsprachige Teil kam zu **Belgien** (heute die belgische Provinz Luxemburg). Der kleinere Teil im Osten blieb das **Großherzogtum** – so wie wir es heute kennen. Viele sehen 1839 als Beginn der Unabhängigkeit.',
        '### 1867: Neutral',
        'Im **Londoner Vertrag von 1867** wurde Luxemburg für **neutral** erklärt. Die Festung musste verschwinden.',
        '### 1890: Eigene Großherzöge',
        'Als der niederländische König 1890 starb, konnte seine Tochter nach den Regeln der Familie nicht Großherzogin von Luxemburg werden. Ein Verwandter, **Adolphe von Nassau-Weilburg**, wurde Großherzog. Seitdem hat Luxemburg eine eigene großherzogliche Familie.',
      ],
      bildHtml: luxKarte({ kantone: 'keine', orte: ['Luxemburg'], breite: 60, massstab: false }),
      woerter: [['unabhängig', 'indépendant'], ['das Großherzogtum', 'le Grand-Duché'], ['die Großmacht', 'la grande puissance'], ['die Teilung', 'la division, le partage'], ['der Vertrag', 'le traité'], ['der Kongress', 'le congrès'], ['die Provinz', 'la province'], ['der Nationalfeiertag', 'la fête nationale']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passierte wann? Verbinde.', stufe: 1, links: ['1815', '1839', '1867', '1890'], rechts: ['Luxemburg wird Großherzogtum (Wiener Kongress).', 'Teilung: Der Westen kommt zu Belgien.', 'Luxemburg wird neutral.', 'Luxemburg bekommt eine eigene großherzogliche Familie.'] },
        { art: 'mc', auftrag: 'Kreuze an.', stufe: 2, fragen: [{ f: 'Welcher Teil kam 1839 zu Belgien?', o: ['der größere, westliche Teil', 'der Norden mit dem Ösling', 'die Hauptstadt'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Am Nationalfeiertag · Feuerwerk', titel: 'Warum feiern wir heute?',
      situation: 'Am Abend vor dem Nationalfeiertag stehen Lina und ihr Opa an der Pétrusse und warten auf das Feuerwerk.',
      bild: ['opa:froh:stehen', 'lina:froh:stehen'], sprecher: { Lina: 'w3', Opa: 'm1' },
      text: [
        ['Lina', 'Opa, warum feiern wir eigentlich am dreiundzwanzigsten Juni? Ist da etwas Besonderes passiert?'],
        ['Opa', 'Gute Frage! Wir feiern den offiziellen Geburtstag des Großherzogs. Aber eigentlich feiern wir unser Land.'],
        ['Lina', 'Ist der Großherzog im Juni geboren?'],
        ['Opa', 'Nein, das ist ja das Lustige. Großherzogin Charlotte hatte im Januar Geburtstag. Im Januar ist es kalt – darum hat man das Fest in den Sommer gelegt.'],
        ['Lina', 'Schlau! Und seit wann ist Luxemburg ein eigenes Land?'],
        ['Opa', 'Das war ein langer Weg. 1839 wurde das Land geteilt, 1867 wurde es neutral, und seit 1890 haben wir eigene Großherzöge.'],
        ['Lina', 'Und heute ist Luxemburg eine Demokratie, oder?'],
        ['Opa', 'Ja. Der Großherzog ist das Staatsoberhaupt, aber die Gesetze machen die gewählten Abgeordneten. Schau – das Feuerwerk beginnt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Staatsoberhaupt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die oberste Person, die ein Land vertritt', 'der Bürgermeister einer Gemeinde'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Am 23. Juni feiert man den offiziellen Geburtstag des Großherzogs.', true], ['Großherzogin Charlotte hatte im Juni Geburtstag.', false], ['Das Fest wurde wegen des Wetters in den Sommer gelegt.', true], ['Der Großherzog macht allein die Gesetze.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was bedeutet euch der Nationalfeiertag? Wie feiert ihr (wenn ihr wollt)? Welche Feste feiern Menschen aus anderen Ländern?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am Nationalfeiertag …', 'In … feiert man …', 'Mir gefällt …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Weg zur Unabhängigkeit', punkte: ['**1815**: Großherzogtum (König der Niederlande)', '**1839**: Teilung, Westen zu Belgien', '**1867**: Neutralität', '**1890**: eigene Großherzöge (Nassau-Weilburg)'] },
         { titel: 'Heute', punkte: ['**konstitutionelle Monarchie** und **Demokratie**', 'Staatsoberhaupt: der Großherzog', 'Gesetze: die gewählte **Abgeordnetenkammer**', 'Nationalfeiertag: **23. Juni**'] }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Baue die Zeitleiste der Unabhängigkeit. Schreibe die Ereignisse in die Kästen.', stufe: 2, von: 1800, bis: 1900, schritt: 10, hoehe: 84,
        ereignisse: [{ jahr: 1815, text: 'Großherzogtum (Wiener Kongress)', leer: true }, { jahr: 1839, text: 'Teilung: Westen zu Belgien', leer: true }, { jahr: 1867, text: 'Neutralität, Festung wird abgerissen', leer: true }, { jahr: 1890, text: 'eigene Großherzöge', leer: true }] },
      { art: 'rechnen', auftrag: 'Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'Wie viele Jahre liegen zwischen 1839 und 1890?', l: '51 Jahre', raum: 1 }, { a: 'Wie viele Jahre ist 1839 im Jahr 2039 her?', l: '200 Jahre', raum: 1 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem neuen Mitschüler, der gerade nach Luxemburg gezogen ist, in einfachen Worten, wie Luxemburg ein eigenes Land wurde.', stufe: 2,
        anfaenge: ['Luxemburg ist ein kleines Land, aber …', 'Zuerst …', 'Dann …', 'Seit 1890 …'], zeilen: 8,
        beispiel: 'Luxemburg ist ein kleines Land, aber es hat eine lange Geschichte. Zuerst gehörte es zum König der Niederlande. 1839 wurde es geteilt, und der westliche Teil kam zu Belgien. 1867 wurde Luxemburg neutral, und die große Festung wurde abgerissen. Seit 1890 hat Luxemburg eigene Großherzöge. Am 23. Juni feiern wir unser Land.' },
    ],
    check: ['Ich ordne 1815, 1839, 1867 und 1890 richtig ein.', 'Ich erkläre, warum am 23. Juni gefeiert wird.', 'Ich weiß, wer in Luxemburg die Gesetze macht.'],
  },
  // ================================================================ 4
  {
    thema: 'Kinderrechte · UN-Konvention', titel: 'Kinder haben Rechte', untertitel: 'Schutz, Förderung, Beteiligung: Du lernst die UN-Kinderrechtskonvention kennen, hörst ein Interview und prüfst Situationen.',
    ziel: { de: 'Ich nenne wichtige Kinderrechte und erkenne, wenn ein Recht verletzt wird.', fr: 'Je cite des droits de l’enfant importants et je reconnais quand un droit n’est pas respecté.' },
    bild: ['amira:froh:stehen', 'sami:froh:stehen'],
    start: {
      was: 'Was brauchen Kinder?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was braucht jedes Kind, um gut aufzuwachsen? Ergänze.', stufe: 1, mitte: 'Jedes Kind braucht …', aeste: ['Essen und Wasser', 'Schule', { l: 'Schutz vor Gewalt' }, { l: 'Gesundheit' }, { l: 'Spielen und Freizeit' }, { l: 'eine eigene Meinung' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Ein Versprechen an alle Kinder',
      absaetze: [
        'Am **20. November 1989** haben die **Vereinten Nationen** (UNO) die **Kinderrechtskonvention** beschlossen. Fast alle Länder der Welt haben sie unterschrieben, auch Luxemburg. Sie gilt für alle Kinder und Jugendlichen **unter 18 Jahren** – egal, woher sie kommen, welche Sprache sie sprechen oder welche Religion sie haben. Der 20. November ist deshalb der **Internationale Tag der Kinderrechte**.',
        '### Drei Gruppen von Rechten',
        '**Schutzrechte**: Kinder müssen vor Gewalt, Ausbeutung und Vernachlässigung geschützt werden. **Förderrechte**: Kinder haben ein Recht auf Bildung, Gesundheit, Spiel und Freizeit. **Beteiligungsrechte**: Kinder dürfen ihre Meinung sagen, und diese Meinung muss bei Entscheidungen, die sie betreffen, beachtet werden.',
        '### Das Wohl des Kindes',
        'Ein wichtiger Grundsatz lautet: Bei allen Entscheidungen soll das **Wohl des Kindes** zuerst kommen. In Luxemburg gibt es eine unabhängige **Ombudsstelle für Kinder und Jugendliche** (OKAJU). Dort kann man sich melden, wenn man denkt, dass Rechte nicht beachtet werden.',
        'Rechte bedeuten nicht, dass Kinder alles dürfen. Und: Viele Kinder auf der Welt bekommen ihre Rechte noch nicht.',
      ],
      woerter: [['das Kinderrecht', 'le droit de l’enfant'], ['die Konvention', 'la convention'], ['die Vereinten Nationen', 'les Nations unies'], ['der Schutz', 'la protection'], ['die Ausbeutung', 'l’exploitation'], ['die Beteiligung', 'la participation'], ['das Wohl', 'le bien-être, l’intérêt'], ['die Ombudsstelle', 'le médiateur (l’ombudsman)']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Gruppe von Rechten ist das? Kreuze an.', stufe: 2, kopf: ['', 'Schutz', 'Förderung', 'Beteiligung'], breiten: [46, 18, 18, 18], zeilen: [['Recht auf Schule', '', '[x]', ''], ['Recht, die eigene Meinung zu sagen', '', '', '[x]'], ['Recht auf Schutz vor Gewalt', '[x]', '', ''], ['Recht auf Spiel und Freizeit', '', '[x]', ''], ['Kinder dürfen nicht hart arbeiten müssen', '[x]', '', ''], ['Recht, im Klassenrat mitzuentscheiden', '', '', '[x]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Kinderrechtskonvention gilt für alle unter 18 Jahren.', true], ['Sie gilt nur für Kinder in Europa.', false], ['Kinderrechte heißen: Kinder dürfen alles.', false], ['Der 20. November ist der Tag der Kinderrechte.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio · Tag der Kinderrechte', titel: 'Rechte – auch bei uns?',
      situation: 'Amira und Sami interviewen eine Mitarbeiterin einer Kinderrechtsorganisation.',
      bild: ['amira:froh:handy', 'aerztin:froh:erklaeren'], sprecher: { Amira: 'w2', Sami: 'm3', Mitarbeiterin: 'w1' },
      text: [
        ['Amira', 'Heute ist der Tag der Kinderrechte. Brauchen Kinder in Luxemburg überhaupt Hilfe? Hier geht es doch allen gut.'],
        ['Mitarbeiterin', 'Vielen geht es gut, aber nicht allen. Manche Kinder werden zu Hause geschlagen oder gemobbt. Manche Familien haben zu wenig Geld für Freizeit oder warme Kleidung.'],
        ['Sami', 'Was kann ein Kind tun, wenn seine Rechte verletzt werden?'],
        ['Mitarbeiterin', 'Mit einer Vertrauensperson sprechen: einer Lehrerin, der Schulpsychologin, einem Trainer. Oder anonym und kostenlos 116 111 anrufen. Im Notfall die 112.'],
        ['Amira', 'Und was ist mit dem Recht auf eine eigene Meinung? Das klingt so groß.'],
        ['Mitarbeiterin', 'Das fängt im Kleinen an. Wenn eure Gemeinde einen Spielplatz baut, sollte sie die Kinder fragen. Wenn ihr in der Schule etwas ändern wollt, habt ihr das Schülerkomitee.'],
        ['Sami', 'Also: Rechte sind nicht nur für ferne Länder.'],
        ['Mitarbeiterin', 'Genau. Sie gelten hier, jeden Tag.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „anonym“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ohne den eigenen Namen zu sagen', 'sehr laut', 'mit Ausweis'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Welche Nummer ist kostenlos und anonym für Kinder und Jugendliche?', o: ['116 111', '112', '113'], r: 0 }, { f: 'Wer sollte Kinder fragen, wenn ein Spielplatz gebaut wird?', o: ['die Gemeinde', 'die Polizei', 'niemand'], r: 0 }] },
        { art: 'fragen', auftrag: 'Was kann ein Kind tun, wenn seine Rechte verletzt werden? Nenne zwei Möglichkeiten.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'mit einer Vertrauensperson sprechen (Lehrerin, Schulpsychologin, Trainer); 116 111 anrufen; im Notfall 112' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welches Kinderrecht ist euch am wichtigsten? Einigt euch in der Gruppe auf drei und begründet.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Am wichtigsten finde ich …, weil …', 'Ohne dieses Recht …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'UN-Kinderrechtskonvention', punkte: ['beschlossen am **20. November 1989**', 'gilt für alle **unter 18**', 'Grundsatz: das **Wohl des Kindes** zuerst'] },
         { titel: 'Drei Gruppen', punkte: ['**Schutz**: vor Gewalt und Ausbeutung', '**Förderung**: Bildung, Gesundheit, Spiel', '**Beteiligung**: Meinung sagen, mitentscheiden'] }],
        [{ art: 'tipp', titel: 'Hilfe', text: '**116 111** (kostenlos, anonym) · Notruf **112** · Vertrauenspersonen in der Schule · Ombudsstelle für Kinder und Jugendliche.' }],
      ],
    },
    ueben: [
      { art: 'dilemma', auftrag: 'Prüfe die Situation mit den Kinderrechten.', stufe: 3,
        geschichte: 'Die Gemeinde will auf dem Bolzplatz neben der Schule Parkplätze bauen. Niemand hat die Kinder und Jugendlichen gefragt. Viele spielen dort jeden Tag Fußball.',
        frage: 'Was können die Jugendlichen tun?', optionen: ['Nichts – die Gemeinde entscheidet.', 'Einen Brief an den Bürgermeister schreiben und Unterschriften sammeln.'],
        hinweis: 'Nach der Kinderrechtskonvention (Beteiligung) sollen Kinder und Jugendliche gehört werden. Ein höflicher Brief, Unterschriften, ein Gespräch im Gemeinderat oder mit dem Schülerkomitee sind gute, faire Wege.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Plakat zu einem Kinderrecht. Erkläre es und gib ein Beispiel aus dem Alltag.', stufe: 2,
        anfaenge: ['Das Recht auf …', 'Das bedeutet: …', 'Zum Beispiel …', 'Wenn dieses Recht verletzt wird, …'], zeilen: 8,
        beispiel: 'Das Recht auf Freizeit und Spiel. Das bedeutet: Kinder brauchen Zeit zum Spielen, Ausruhen und für Hobbys. Zum Beispiel darf ein Kind nicht den ganzen Tag arbeiten oder nur lernen müssen. Wenn dieses Recht verletzt wird, kann man mit einer Vertrauensperson reden oder 116 111 anrufen.' },
    ],
    check: ['Ich nenne Kinderrechte aus den drei Gruppen.', 'Ich weiß, wann die Konvention beschlossen wurde.', 'Ich weiß, wo Kinder Hilfe bekommen.'],
  },
  // ================================================================ 5
  {
    thema: 'Gemeinde · Gemeinderat · Wahlen', titel: 'Meine Gemeinde', untertitel: 'Wer kümmert sich um Schule, Wasser und Spielplatz? Du lernst die Gemeinde kennen, hörst eine Gemeinderatssitzung und schreibst einen Vorschlag.',
    ziel: { de: 'Ich nenne Aufgaben der Gemeinde und erkläre, wer in der Gemeinde entscheidet.', fr: 'Je cite les missions de la commune et j’explique qui décide dans la commune.' },
    bild: ['vater:froh:erklaeren', 'tom:froh:stehen'],
    start: {
      was: 'Wer kümmert sich darum?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wofür ist meistens die Gemeinde zuständig? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Grundschule', 'Trinkwasser', 'Müllabfuhr', 'Gemeindestraßen', 'die Armee'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Infotext (vereinfacht, Stand 2026)', titel: 'Die Gemeinde – Politik vor der Haustür',
      absaetze: [
        'Luxemburg hat rund **100 Gemeinden**. Manche sind große Städte, andere kleine Dörfer. Die Gemeinde kümmert sich um vieles, was wir jeden Tag brauchen: **Grundschulen** und Betreuung (Maison relais), **Trinkwasser** und Abwasser, **Müllabfuhr**, Gemeindestraßen, Spielplätze, Sporthallen und Feste.',
        '### Wer entscheidet?',
        'Alle sechs Jahre wählen die Einwohnerinnen und Einwohner den **Gemeinderat**. Wählen dürfen Luxemburger ab 18 Jahren – und auch viele Menschen aus anderen Ländern, wenn sie sich vorher in die Wählerliste eintragen. Der Gemeinderat entscheidet über die wichtigen Dinge, zum Beispiel über das Geld der Gemeinde (das **Budget**).',
        'Der **Bürgermeister** oder die **Bürgermeisterin** und die **Schöffen** bilden den **Schöffenrat**. Sie führen die Gemeinde im Alltag. Die Sitzungen des Gemeinderats sind meist **öffentlich**: Jeder darf zuhören.',
      ],
      woerter: [['die Gemeinde', 'la commune'], ['der Gemeinderat', 'le conseil communal'], ['der Bürgermeister / die Bürgermeisterin', 'le / la bourgmestre'], ['der Schöffe', 'l’échevin'], ['der Schöffenrat', 'le collège échevinal'], ['wählen', 'voter, élire'], ['das Budget', 'le budget'], ['öffentlich', 'public']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Luxemburg hat rund [100] Gemeinden.', 'Der Gemeinderat wird alle [sechs] Jahre gewählt.', 'Bürgermeister und Schöffen bilden den [Schöffenrat].', 'Die Sitzungen des Gemeinderats sind meist [öffentlich].'] },
        { art: 'zuordnen', auftrag: 'Wer ist wer? Verbinde.', stufe: 2, links: ['die Einwohner', 'der Gemeinderat', 'der Schöffenrat'], rechts: ['wählen den Gemeinderat', 'entscheidet über das Budget und wichtige Fragen', 'führt die Gemeinde im Alltag'], ordnung: [2, 0, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Sitzung', wo: 'Gemeinderatssitzung · öffentlich', titel: 'Ein Skatepark für unser Dorf?',
      situation: 'Tom und sein Vater hören bei einer Gemeinderatssitzung zu. Es geht um einen Skatepark.',
      bild: ['vater:froh:stehen', 'tom:aufgeregt:stehen'], sprecher: { Bürgermeisterin: 'w1', Rat: 'm2', Rätin: 'w2', Tom: 'm3' },
      text: [
        ['Bürgermeisterin', 'Punkt fünf der Tagesordnung: Die Jugendlichen haben 240 Unterschriften für einen Skatepark gesammelt. Er würde etwa 180 000 Euro kosten.'],
        ['Rat', 'Das ist viel Geld. Wir müssen auch die Straße am Friedhof reparieren.'],
        ['Rätin', 'Aber unsere Jugendlichen haben nichts im Dorf. Sie fahren abends mit dem Bus in die Stadt. Ein Skatepark wäre ein Treffpunkt.'],
        ['Rat', 'Und der Lärm für die Nachbarn?'],
        ['Rätin', 'Wir könnten ihn hinter der Sporthalle bauen, weit weg von den Häusern.'],
        ['Bürgermeisterin', 'Ich schlage vor: Wir bauen den Skatepark hinter der Sporthalle, und die Straße reparieren wir im nächsten Jahr. Wer ist dafür? … Sieben. Dagegen? … Zwei. Der Vorschlag ist angenommen.'],
        ['Tom', 'Papa! Sie haben ja gesagt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Tagesordnung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Liste der Themen einer Sitzung', 'der Stundenplan', 'die Uhrzeit'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Antwort'], breiten: [50, 50], zeilen: [['Wie viele Unterschriften?', '[240]'], ['Kosten des Skateparks', '[etwa 180 000 Euro]'], ['Argument dagegen', '[viel Geld, Straße reparieren, Lärm]'], ['Argument dafür', '[Treffpunkt für Jugendliche]'], ['Ergebnis der Abstimmung', '[7 dafür, 2 dagegen – angenommen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was fehlt in eurer Gemeinde für Jugendliche? Sammelt Ideen und stimmt ab, welche ihr der Gemeinde vorschlagen würdet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['In unserer Gemeinde fehlt …', 'Das wäre gut, weil …', 'Das könnte schwierig sein, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aufgaben der Gemeinde', punkte: ['Grundschule und Betreuung', 'Trinkwasser, Abwasser, Müll', 'Straßen, Spielplätze, Sporthallen', 'Feste und Kultur'] },
         { titel: 'Wer entscheidet?', punkte: ['**Einwohner** wählen alle **6 Jahre** den **Gemeinderat**.', '**Gemeinderat**: wichtige Entscheidungen, Budget', '**Schöffenrat** (Bürgermeister + Schöffen): Alltag'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'An wen wendest du dich? Kreuze an.', stufe: 2, kopf: ['Problem', 'Gemeinde', 'Schule', 'Polizei (Notfall 113 / 112)'], breiten: [46, 18, 18, 18], zeilen: [['Die Schaukel auf dem Spielplatz ist kaputt.', '[x]', '', ''], ['Im Unterricht gibt es Streit.', '', '[x]', ''], ['Jemand bricht in ein Auto ein.', '', '', '[x]'], ['Der Mülleimer an der Bushaltestelle ist voll.', '[x]', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen höflichen Brief an deine Gemeinde mit einem Vorschlag für Jugendliche. Begründe ihn.', stufe: 2,
        anfaenge: ['Sehr geehrte Frau Bürgermeisterin, sehr geehrter Herr Bürgermeister,', 'wir sind Jugendliche aus …', 'Wir schlagen vor, …', 'Das wäre gut, weil …', 'Mit freundlichen Grüßen'], zeilen: 9,
        beispiel: 'Sehr geehrte Frau Bürgermeisterin, wir sind Jugendliche aus der Klasse 6P2. Wir schlagen vor, im Park eine überdachte Sitzecke mit Steckdosen und einem Basketballkorb zu bauen. Das wäre gut, weil wir einen Treffpunkt hätten, auch wenn es regnet. Wir helfen gern bei der Planung. Mit freundlichen Grüßen' },
    ],
    check: ['Ich nenne Aufgaben der Gemeinde.', 'Ich erkläre Gemeinderat und Schöffenrat.', 'Ich schreibe einen Vorschlag an die Gemeinde.'],
  },
  // ================================================================ 6
  {
    thema: 'Mitbestimmung · Klassensprecher · Schülerkomitee', titel: 'Mitreden in der Schule', untertitel: 'Klassensprecherin, Schülerkomitee, Jugendparlament: Du lernst, wie Jugendliche mitbestimmen, hörst eine Wahlrede und schreibst deine eigene.',
    ziel: { de: 'Ich erkläre, wie Schülerinnen und Schüler in der Schule mitbestimmen, und halte eine kurze Wahlrede.', fr: 'J’explique comment les élèves participent à l’école et je fais un petit discours de candidature.' },
    bild: ['nele:froh:sitzen', 'lio:froh:laessig'],
    start: {
      was: 'Eine gute Klassensprecherin, ein guter Klassensprecher …',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was ist wichtig? Kreuze an.', stufe: 1, kopf: ['', 'wichtig', 'unwichtig'], breiten: [60, 20, 20], zeilen: [['hört allen zu', '[x]', ''], ['ist beliebt und cool', '', '[x]'], ['traut sich, mit Lehrkräften zu reden', '[x]', ''], ['ist fair, auch zu Leuten, die er nicht mag', '[x]', ''], ['hat die besten Noten', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Infoblatt', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infoblatt für Schülerinnen und Schüler (vereinfacht)', titel: 'Deine Stimme zählt',
      absaetze: [
        '### Klassensprecherin und Klassensprecher',
        'Jede Klasse wählt zu Beginn des Schuljahres meist zwei **Klassensprecher** (auf Französisch: délégués de classe). Sie sprechen für die Klasse mit Lehrkräften und der Direktion, wenn es Probleme oder Wünsche gibt. Sie sind keine Aufpasser und keine Petzen, sondern **Vermittler**.',
        '### Das Schülerkomitee',
        'In jedem Lycée gibt es ein **Schülerkomitee** (comité des élèves). Seine Mitglieder werden von den Schülerinnen und Schülern gewählt. Das Komitee organisiert zum Beispiel Partys, Projekte oder Kampagnen und gibt der Schulleitung die Meinung der Jugendlichen weiter.',
        '### Das Jugendparlament',
        'Auf Landesebene gibt es das **Jugendparlament**. Dort diskutieren junge Menschen über Themen, die sie betreffen, und schreiben Vorschläge an die Politik.',
        'Mitbestimmen heißt nicht, dass man immer bekommt, was man will. Aber: Wer mitredet, wird gehört – und kann Dinge verändern.',
      ],
      woerter: [['der Klassensprecher', 'le délégué de classe'], ['das Schülerkomitee', 'le comité des élèves'], ['das Jugendparlament', 'le parlement des jeunes'], ['der Vermittler', 'le médiateur'], ['die Direktion', 'la direction'], ['die Kampagne', 'la campagne'], ['mitbestimmen', 'participer aux décisions'], ['kandidieren', 'se présenter (comme candidat)']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer macht was? Verbinde.', stufe: 1, links: ['Klassensprecher', 'Schülerkomitee', 'Jugendparlament'], rechts: ['spricht für eine Klasse mit Lehrkräften', 'vertritt alle Schüler eines Lycée, organisiert Projekte', 'diskutiert auf Landesebene und macht Vorschläge an die Politik'] },
      ],
    },
    hoeren: {
      was: 'Eine Wahlrede', wo: 'Klasse 6P2 · Wahl der Klassensprecher', titel: 'Wählt mich!',
      situation: 'Nele und Lio kandidieren als Klassensprecher. Sie halten eine kurze Rede.',
      bild: ['nele:froh:rollstuhl', 'lio:froh:rollstuhl'], sprecher: { Nele: 'w3', Lio: 'm3' },
      text: [
        ['Nele', 'Hallo zusammen. Ich möchte eure Klassensprecherin werden. Warum? Weil ich gut organisieren kann und weil ich zuhöre.'],
        ['Nele', 'Mein erstes Ziel: Wir brauchen einen Plan für die Klassenarbeiten, damit wir nicht drei Tests am selben Tag haben. Mein zweites Ziel: ein Ausflug, bei dem alle mitmachen können.'],
        ['Nele', 'Ich verspreche nichts, was ich nicht halten kann. Aber ich verspreche, dass ich eure Meinung weitergebe – auch wenn sie nicht meine ist. Danke!'],
        ['Lio', 'Hi, ich bin Lio. Ich mache es kurz: Ich will, dass es in unserer Klasse fair zugeht. Wenn jemand Ärger mit einer Lehrkraft hat, gehe ich mit, wenn er will.'],
        ['Lio', 'Und ich will, dass die Basketballkörbe auf dem Schulhof endlich repariert werden. Dafür gehe ich zum Schülerkomitee. Wählt mich – oder Nele, sie ist auch super!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört in eine gute Wahlrede? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['wer ich bin', 'meine Ziele', 'Versprechen, die ich halten kann', 'Beleidigungen gegen die anderen'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sind die Ziele?', stufe: 1, kopf: ['', 'Nele', 'Lio'], breiten: [24, 38, 38], zeilen: [['Stärke', '[organisieren, zuhören]', '[fair, begleitet Mitschüler]'], ['Ziel 1', '[Plan für Klassenarbeiten]', '[Fairness in der Klasse]'], ['Ziel 2', '[Ausflug für alle]', '[Basketballkörbe reparieren]']] },
        { art: 'fragen', auftrag: 'Was ist fair an Lios letzter Bemerkung?', stufe: 2, fragen: [{ f: '', l: 'Er macht seine Konkurrentin nicht schlecht, sondern lobt sie sogar.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wen würdet ihr wählen? Begründet mit den Zielen und Stärken – nicht mit Freundschaft.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde … wählen, weil …', 'Mich überzeugt das Ziel …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Mitbestimmung', punkte: ['**Klasse**: Klassensprecher, Klassenrat', '**Schule**: Schülerkomitee', '**Land**: Jugendparlament'] },
         { titel: 'Eine gute Wahlrede', nummern: true, punkte: ['Wer bin ich?', 'Was kann ich gut?', 'Meine **zwei Ziele**', 'Ein ehrliches **Versprechen**', 'Danke sagen'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Schüler sollten bei der Wahl neuer Schulregeln mitentscheiden dürfen.', 'Klassensprecher sollten die beliebtesten Schüler sein.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Wahlrede (oder für eine ausgedachte Person). Höchstens eine Minute zum Vorlesen.', stufe: 2,
        anfaenge: ['Hallo, ich bin …', 'Ich möchte Klassensprecher/in werden, weil …', 'Meine Ziele: …', 'Ich verspreche …', 'Danke!'], zeilen: 9,
        beispiel: 'Hallo, ich bin Jana. Ich möchte Klassensprecherin werden, weil ich mich traue, auch schwierige Dinge anzusprechen. Meine Ziele: eine Pausenkiste mit Bällen und Spielen und ein Kummerkasten für die Klasse. Ich verspreche, dass ich jede Meinung weitergebe, auch wenn ich anders denke. Danke!' },
    ],
    check: ['Ich erkläre die Aufgaben von Klassensprechern.', 'Ich nenne Wege der Mitbestimmung in Schule und Land.', 'Ich schreibe eine kurze Wahlrede.'],
  },
  // ================================================================ 7
  {
    thema: 'Berufsfelder · Ausbildung · Interessen', titel: 'Viele Wege in den Beruf', untertitel: 'Handwerk, Pflege, Büro, Natur, Technik: Du lernst, wie eine Ausbildung funktioniert, hörst zwei Auszubildende und vergleichst Berufe.',
    ziel: { de: 'Ich beschreibe eine Ausbildung und vergleiche Berufe nach meinen Interessen.', fr: 'Je décris une formation professionnelle et je compare des métiers selon mes intérêts.' },
    bild: ['tom:froh:stehen', 'amira:froh:stehen'],
    start: {
      was: 'Berufe raten',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Beruf ist das? Verbinde.', stufe: 1, links: ['Sie schneidet Haare und berät Kunden.', 'Er repariert Autos.', 'Sie pflegt kranke Menschen.', 'Er baut Möbel aus Holz.', 'Sie verkauft Kleidung und berät Kunden.'], rechts: ['Friseurin', 'Mechatroniker', 'Pflegehelferin', 'Schreiner', 'Verkäuferin'] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Infotext (vereinfacht, Stand 2026 – Fragen an die Berufsberatung)', titel: 'Lernen in der Schule und im Betrieb',
      absaetze: [
        'Viele Berufe lernt man in einer **Ausbildung**. In Luxemburg gibt es verschiedene Abschlüsse, zum Beispiel das **CCP** (certificat de capacité professionnelle), das **DAP** (diplôme d’aptitude professionnelle) und das **DT** (diplôme de technicien).',
        '### So funktioniert eine Ausbildung',
        'Bei vielen Ausbildungen lernt man an **zwei Orten**: im **Betrieb** und in der **Schule**. Im Betrieb arbeitet man mit, lernt von erfahrenen Kolleginnen und Kollegen und bekommt eine kleine **Ausbildungsvergütung**. In der Schule lernt man die Theorie: Fachwissen, Rechnen, Sprachen. Man nennt die Auszubildenden auch **Lehrlinge**.',
        '### Den passenden Beruf finden',
        'Wichtig ist nicht nur, was man **gut kann**, sondern auch, was man **gern macht** und was einem **wichtig ist**: mit Menschen oder mit Dingen arbeiten? Drinnen oder draußen? Allein oder im Team? Die **Berufsberatung** (zum Beispiel in der Maison de l’orientation) und **Praktika** helfen, es herauszufinden.',
      ],
      woerter: [['die Ausbildung', 'la formation (professionnelle)'], ['der Lehrling / der Azubi', 'l’apprenti(e)'], ['der Betrieb', 'l’entreprise'], ['der Abschluss', 'le diplôme'], ['die Vergütung', 'l’indemnité'], ['die Berufsberatung', 'l’orientation professionnelle'], ['das Praktikum', 'le stage'], ['erfahren', 'expérimenté']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Bei vielen Ausbildungen lernt man im Betrieb und in der Schule.', true], ['Lehrlinge bekommen kein Geld.', false], ['CCP, DAP und DT sind Abschlüsse in Luxemburg.', true], ['Wichtig ist nur, was man gut kann.', false]] },
      ],
    },
    hoeren: {
      was: 'Interviews', wo: 'Berufsmesse · Stand „Ausbildung“', titel: 'Zwei Lehrlinge erzählen',
      situation: 'Tom und Amira besuchen eine Berufsmesse. Sie sprechen mit zwei Lehrlingen.',
      bild: ['tom:froh:stehen', 'verkaeuferin:froh:erklaeren'], sprecher: { Tom: 'm3', Amira: 'w2', Kim: 'w1', Paulo: 'm1' },
      text: [
        ['Amira', 'Hallo! Was lernst du?'],
        ['Kim', 'Ich mache eine Ausbildung als Pflegehelferin in einem Altenheim. Drei Tage bin ich im Heim, zwei Tage in der Schule.'],
        ['Amira', 'Was gefällt dir?'],
        ['Kim', 'Die Menschen. Eine alte Dame wartet jeden Morgen auf mich, um mit mir die Zeitung zu lesen. Schwer ist: Man arbeitet auch am Wochenende, und manchmal stirbt jemand. Das ist traurig.'],
        ['Tom', 'Und du? Du hast ja schmutzige Hände!'],
        ['Paulo', 'Ich lerne Elektroniker. Gerade habe ich hier am Stand eine Steckdose verkabelt. Ich liebe es, wenn am Ende alles funktioniert.'],
        ['Tom', 'Muss man gut in Mathe sein?'],
        ['Paulo', 'Ein bisschen schon, zum Rechnen und Messen. Aber das lernt man. Wichtiger ist: genau arbeiten und an die Sicherheit denken.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Pflegehelferin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie hilft Menschen, die Pflege brauchen.', 'Sie repariert Pflegebetten.', 'Sie verkauft Medikamente.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Kim', 'Paulo'], breiten: [26, 37, 37], zeilen: [['Ausbildung', '[Pflegehelferin]', '[Elektroniker]'], ['Was gefällt?', '[die Menschen]', '[wenn am Ende alles funktioniert]'], ['Was ist schwer / wichtig?', '[Wochenendarbeit, wenn jemand stirbt]', '[genau arbeiten, Sicherheit]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher der beiden Berufe würde besser zu euch passen? Warum?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir würde … besser passen, weil …', 'Ich arbeite lieber mit Menschen / mit Technik, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ausbildung', punkte: ['lernen im **Betrieb** und in der **Schule**', 'Abschlüsse: **CCP, DAP, DT**', 'Lehrlinge bekommen eine **Vergütung**'] },
         { titel: 'Den passenden Beruf finden', punkte: ['Was kann ich **gut**?', 'Was mache ich **gern**?', 'Was ist mir **wichtig**?', 'ausprobieren: **Praktikum**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Vergleiche zwei Berufe, die dich interessieren. Recherchiere (Internet, Berufsberatung, Eltern von Freunden).', stufe: 3, kopf: ['', 'Beruf 1: …', 'Beruf 2: …'], breiten: [28, 36, 36], zeilen: [['Was macht man?', '', ''], ['Wo arbeitet man?', '', ''], ['Was muss man können?', '', ''], ['Welcher Abschluss?', '', ''], ['Passt zu mir, weil …', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Steckbrief über einen Ausbildungsberuf, den du interessant findest.', stufe: 2,
        anfaenge: ['Beruf: …', 'Was man macht: …', 'Wo man arbeitet: …', 'Wichtige Eigenschaften: …', 'Mich interessiert der Beruf, weil …'], zeilen: 8,
        beispiel: 'Beruf: Gärtnerin. Was man macht: Pflanzen anbauen, Gärten und Parks pflegen. Wo man arbeitet: draußen, in Gärtnereien oder bei der Gemeinde. Wichtige Eigenschaften: geduldig, kräftig, gern an der frischen Luft. Mich interessiert der Beruf, weil ich gern draußen bin und Pflanzen mag.' },
    ],
    check: ['Ich erkläre, wie eine Ausbildung funktioniert.', 'Ich nenne Abschlüsse in Luxemburg.', 'Ich vergleiche Berufe mit meinen Interessen.'],
  },
  // ================================================================ 8
  {
    thema: 'Praktikum · Verhalten im Betrieb · Bericht', titel: 'Mein erster Tag im Betrieb', untertitel: 'Pünktlich, freundlich, neugierig: Du bereitest einen Schnuppertag vor, hörst ein Gespräch mit einer Chefin und schreibst einen Praktikumsbericht.',
    ziel: { de: 'Ich bereite ein Schnupperpraktikum vor und schreibe einen kurzen Bericht.', fr: 'Je prépare un stage d’observation et j’écris un petit rapport.' },
    bild: ['finn:nervoes:stehen', 'chef:froh:stehen'],
    start: {
      was: 'Der erste Eindruck',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Am ersten Tag im Betrieb – gut oder nicht gut? Kreuze an.', stufe: 1, kopf: ['', 'gut', 'nicht gut'], breiten: [60, 20, 20], zeilen: [['10 Minuten zu früh kommen', '[x]', ''], ['mit Kopfhörern im Ohr begrüßen', '', '[x]'], ['Fragen stellen, wenn man etwas nicht versteht', '[x]', ''], ['heimlich auf dem Handy spielen', '', '[x]'], ['Danke sagen am Ende des Tages', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Eine Checkliste', art: 'anleitung', stimme: 'w1',
      quelle: 'Checkliste der Berufsberatung (vereinfacht)', titel: 'So klappt dein Schnuppertag',
      material: ['Adresse und Telefonnummer des Betriebs', 'Name der Ansprechperson', 'bequeme, passende Kleidung (frag vorher!)', 'Pausenbrot und Trinkflasche', 'Notizblock und Stift'],
      schritte: [
        { icon: 'map-pin', text: '**Vorher:** Plane den Weg und probiere ihn aus. Wie lange brauchst du? Plane 10 Minuten Reserve ein.' },
        { icon: 'clock', text: '**Pünktlich sein:** Komm einige Minuten zu früh. Wenn du dich verspätest, ruf sofort an.' },
        { icon: 'hand-click', text: '**Freundlich grüßen:** Stell dich mit Vor- und Nachnamen vor. Schau die Person an.' },
        { icon: 'shield-check', text: '**Sicherheitsregeln befolgen:** Trag die Schutzkleidung, die man dir gibt. Fass nichts an, was du nicht darfst.' },
        { icon: 'help-circle', text: '**Fragen stellen:** Wer fragt, zeigt Interesse. Schreib dir wichtige Antworten auf.' },
        { icon: 'device-mobile-off', text: '**Handy weg:** Nur in der Pause, und nur, wenn es erlaubt ist.' },
        { icon: 'heart-handshake', text: '**Danke sagen:** Am Ende bedankst du dich für den Tag.' },
      ],
      woerter: [['das Schnupperpraktikum', 'le stage d’observation'], ['die Ansprechperson', 'la personne de contact'], ['die Reserve', 'la marge (de temps)'], ['sich verspäten', 'être en retard'], ['die Schutzkleidung', 'les vêtements de protection'], ['sich bedanken', 'remercier'], ['der Bericht', 'le rapport'], ['der Eindruck', 'l’impression']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was machst du zuerst? Ordne.', stufe: 1, teile: ['Den Weg zum Betrieb ausprobieren.', 'Pünktlich ankommen.', 'Freundlich grüßen und sich vorstellen.', 'Mitarbeiten und Fragen stellen.', 'Sich am Ende bedanken.'], ordnung: [4, 1, 3, 0, 2] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Bäckerei · 7 Uhr morgens', titel: 'Guten Morgen, ich bin Finn!',
      situation: 'Finn macht einen Schnuppertag in einer Bäckerei. Er spricht mit der Chefin, Frau Becker.',
      bild: ['finn:nervoes:stehen', 'chef:froh:stehen'], sprecher: { Finn: 'm3', 'Frau Becker': 'w1' },
      text: [
        ['Finn', 'Guten Morgen! Ich bin Finn Weber, ich mache heute den Schnuppertag.'],
        ['Frau Becker', 'Guten Morgen, Finn! Pünktlich – sehr gut. Bei uns beginnt der Tag früh. Die ersten Brote backen wir schon um vier Uhr.'],
        ['Finn', 'Um vier? Wow. Was darf ich heute machen?'],
        ['Frau Becker', 'Zuerst ziehst du die Schürze und die Mütze an. Hygiene ist bei uns das Wichtigste. Hände waschen, Haare unter die Mütze, keinen Schmuck.'],
        ['Finn', 'Okay. Darf ich auch Teig machen?'],
        ['Frau Becker', 'Du darfst Brötchen formen. Der Ofen ist sehr heiß, den bedienen nur die Bäcker. Und wenn du etwas nicht weißt: fragen!'],
        ['Finn', 'Was muss man für diesen Beruf können?'],
        ['Frau Becker', 'Früh aufstehen, sauber und genau arbeiten, im Team helfen. Und Lust haben, etwas mit den Händen zu machen, das andere Menschen glücklich macht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet Hygiene in einer Bäckerei? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Hände waschen', 'Haare bedecken', 'keinen Schmuck tragen', 'das Handy auf den Teig legen'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Finn kommt zu spät.', false], ['Die ersten Brote werden um vier Uhr gebacken.', true], ['Finn darf den Ofen bedienen.', false], ['Finn darf Brötchen formen.', true]] },
        { art: 'fragen', auftrag: 'Was muss man für den Beruf Bäcker können? Nenne drei Dinge.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'früh aufstehen, sauber und genau arbeiten, im Team helfen, gern mit den Händen arbeiten' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt zu zweit die Begrüßung am ersten Tag und drei gute Fragen an die Chefin oder den Chef.', stufe: 2, karten: [
        { titel: 'Gute Fragen', text: ['Wie sieht ein normaler Arbeitstag aus?', 'Was gefällt Ihnen an Ihrem Beruf?', 'Welche Ausbildung braucht man?', 'Was ist besonders schwer?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Im Betrieb', punkte: ['**pünktlich** und **freundlich**', '**Sicherheit** und **Hygiene** beachten', '**Fragen** stellen', 'Handy weg, **Danke** sagen'] },
         { titel: 'Praktikumsbericht', nummern: true, punkte: ['Betrieb und Beruf', 'Was habe ich gemacht?', 'Was hat mir gefallen, was nicht?', 'Passt der Beruf zu mir?'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mach eine Tagesübersicht für Finns Schnuppertag (aus dem Hörtext und mit eigenen Ideen).', stufe: 2, kopf: ['Uhrzeit', 'Tätigkeit'], breiten: [24, 76], zeilen: [['7:00', '[Begrüßung, Schürze und Mütze anziehen, Hände waschen]'], ['7:30', '[Brötchen formen]'], ['9:00', '[z. B. im Verkauf zuschauen]'], ['10:00', '[z. B. Pause]'], ['11:00', '[z. B. Bleche putzen, aufräumen, Danke sagen]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Finns Praktikumsbericht (oder deinen eigenen, wenn du schon geschnuppert hast).', stufe: 2,
        anfaenge: ['Mein Schnuppertag war in …', 'Ich habe …', 'Gefallen hat mir …', 'Schwierig war …', 'Der Beruf passt (nicht) zu mir, weil …'], zeilen: 10,
        beispiel: 'Mein Schnuppertag war in einer Bäckerei. Ich habe Schürze und Mütze getragen, Brötchen geformt und beim Verkauf zugeschaut. Gefallen hat mir, dass man am Ende sieht, was man gemacht hat, und dass das Team nett war. Schwierig war das frühe Aufstehen. Der Beruf passt vielleicht zu mir, weil ich gern mit den Händen arbeite – aber ich muss noch üben, früh aufzustehen.' },
    ],
    check: ['Ich bereite einen Schnuppertag vor.', 'Ich kenne Regeln für das Verhalten im Betrieb.', 'Ich schreibe einen Praktikumsbericht.'],
  },
]
