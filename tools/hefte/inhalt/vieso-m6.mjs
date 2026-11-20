// Vie et société · Modul 6 (6P) „Eine Welt“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 8. Klasse:
// Lernfeld „Lebensformen, Welt und Gesellschaft“ (Eine Welt: Armut, Wohlfahrt, Reichtum; Globalisierung; Nachhaltigkeit und
// Fairer Handel; globale Umweltpolitik und lokales Leben), „Ich und die Anderen“ (Zeichen und Symbole: Ausdrucksformen in
// religiösen Gruppen; Kleidung und Mode) und „Große Fragen“ (Glauben – Wissen – Meinen; Religion und Naturwissenschaft;
// Was kann ich wissen? Was darf ich hoffen?).
// Ergänzt Culture générale (T-Shirt, Handy, Klimafolgen) um die ethische Sicht: Gerechtigkeit, Verantwortung, Hoffnung.
// Keine Fragen nach dem eigenen Geld oder der eigenen Familie; Zahlen gerundet und mit Stand.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { weltKarte } from './karten.mjs'
import { weltDorf, religionsZeichen, schokoTafel } from './sach-bilder.mjs'

export const MODUL = sachModul('vieso', 6, {
  titel: 'Eine Welt',
  titelFr: 'Un seul monde',
  unter: 'Arm und reich, eine vernetzte Welt, fairer Handel, Klimaschutz von der Welt bis zur Gemeinde, Zeichen und Kleidung – und die großen Fragen: Was kann ich wissen? Was darf ich hoffen?',
  unterFr: 'Pauvreté et richesse, mondialisation, commerce équitable, climat, symboles et vêtements, croire et savoir.',
  farbe: '#5a8f29',
  deckbild: ['yusuf:froh:stehen', 'lea:froh:stehen-zeigen', 'ben:froh:laessig'],
  blasen: [{ t: 'Woher kommt mein Kakao?', x: 6, y: 104 }, { t: 'Was darf ich hoffen?', x: 120, y: 92 }, { t: 'Fair!', x: 172, y: 150 }],
  aussprache: { '\\bREVIS\\b': 'Rewiss', '\\bSikh\\b': 'Siek', 'Tasbih': 'Tasbieh', 'Lemaître': 'Lömätre', '\\bOm\\b': 'Ohm' },
  themen: [
    { titel: { de: 'Gerechte Welt', fr: 'Un monde juste' }, icon: 'world', lektionen: 4 },
    { titel: { de: 'Zeichen', fr: 'Signes' }, icon: 'shirt', lektionen: 2 },
    { titel: { de: 'Glauben und Wissen', fr: 'Croire et savoir' }, icon: 'bulb', lektionen: 2 },
  ],
})

const FRAGE = '#5a8f29', DILEMMA = '#6d4bc4', WELT = '#1f6aa0', IDEE = '#2f8a6b', GLAUBE = '#b5651d'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Armut · Wohlstand · Reichtum', titel: 'Arm und reich', untertitel: 'Was braucht ein Mensch zum Leben? Du lernst zwei Arten von Armut kennen, schaust auf die Welt als Dorf mit zehn Menschen und hörst eine Frau, die in einem Laden für Menschen mit wenig Geld arbeitet.',
    ziel: { de: 'Ich erkläre, was Armut bedeutet, und beschreibe Unterschiede auf der Welt und in Luxemburg.', fr: 'J’explique ce qu’est la pauvreté et je décris des différences dans le monde et au Luxembourg.' },
    bild: ['yusuf:besorgt:stehen', 'lina:ruhig:stehen'],
    start: {
      was: 'Brauchen oder wollen?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was braucht jeder Mensch zum Leben – und was ist schön, aber nicht nötig? Kreuze an.', stufe: 1, kopf: ['', 'braucht man zum Leben', 'schön, aber nicht nötig'], breiten: [50, 25, 25], zeilen: [['sauberes Wasser', '[x]', ''], ['ein neues Handy', '', '[x]'], ['eine Wohnung', '[x]', ''], ['teure Turnschuhe', '', '[x]'], ['eine Ärztin, wenn man krank ist', '[x]', ''], ['Urlaub am Meer', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, Stand 2026', titel: 'Was ist Armut?',
      absaetze: [
        'Arm ist, wer nicht genug hat, um gut zu leben. Man unterscheidet zwei Arten von Armut.',
        '### Extreme Armut',
        'Menschen in **extremer Armut** haben nicht genug für das Nötigste: Essen, sauberes Wasser, ein Dach über dem Kopf, eine Ärztin. Die Weltbank zählt dazu alle, die weniger als **3 US-Dollar** pro Tag (umgerechnet auf die Preise im eigenen Land) haben – etwa **jeder zehnte Mensch** auf der Welt, die meisten in Afrika südlich der Sahara.',
        '### Relative Armut',
        'In reichen Ländern wie Luxemburg muss kaum jemand hungern. Trotzdem gibt es Armut: Wer viel weniger hat als die meisten anderen, kann oft nicht mithalten – bei Kleidung, Ausflügen und Hobbys. Das ist **relative Armut**. In Luxemburg gilt **fast jeder fünfte Mensch** als armutsgefährdet, vor allem weil Wohnen so teuer ist.',
        '### Armut ist keine Schande',
        'Armut hat viele **Ursachen**: Krankheit, Arbeitslosigkeit, Trennung, Krieg, schlechte Bildungschancen, hohe Mieten. Niemand ist „selbst schuld“, nur weil er arm ist. Darum lacht man niemanden aus, der sich etwas nicht leisten kann.',
        '### Was hilft?',
        'In Luxemburg hilft der Staat zum Beispiel mit einem **Mindesteinkommen** (REVIS), Kindergeld und Wohnhilfen. Vereine betreiben **Épiceries sociales**: Läden mit günstigen Lebensmitteln.',
      ],
      woerter: [['die Armut', 'la pauvreté'], ['der Reichtum', 'la richesse'], ['das Bedürfnis', 'le besoin'], ['armutsgefährdet', 'menacé de pauvreté'], ['die Ursache', 'la cause'], ['die Miete', 'le loyer'], ['sich schämen', 'avoir honte'], ['das Mindesteinkommen', 'le revenu minimum']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gehört zusammen? Verbinde.', stufe: 1, links: ['extreme Armut', 'relative Armut', 'Épicerie sociale', 'REVIS'], rechts: ['nicht genug für Essen, Wasser, Wohnung', 'viel weniger als die meisten anderen im Land', 'Laden mit günstigen Lebensmitteln', 'Mindesteinkommen in Luxemburg'] },
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Nenne drei Ursachen von Armut.', l: 'Krankheit, Arbeitslosigkeit, Trennung, Krieg, schlechte Bildungschancen, hohe Mieten' }, { f: 'Warum gibt es auch in einem reichen Land wie Luxemburg Armut?', zeilen: 2, l: 'Weil manche viel weniger haben als die meisten anderen und nicht mithalten können, vor allem weil Wohnen sehr teuer ist.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Épicerie sociale · Schülerzeitung', titel: 'Das kann jedem passieren',
      situation: 'Yusuf schreibt für die Schülerzeitung. Er besucht Frau Morel, die in einer Épicerie sociale arbeitet.',
      bild: ['yusuf:froh:handy', 'verkaeuferin:froh:stehen'], sprecher: { Yusuf: 'm3', 'Frau Morel': 'w1' },
      text: [
        ['Yusuf', 'Frau Morel, wer kauft bei Ihnen ein?'],
        ['Frau Morel', 'Ganz verschiedene Menschen. Eine Mutter, die allein drei Kinder großzieht. Ein Mann, der krank wurde und seine Arbeit verloren hat. Eine Studentin. Rentner, deren Rente nicht reicht.'],
        ['Yusuf', 'Was ist anders als im Supermarkt?'],
        ['Frau Morel', 'Die Lebensmittel kosten viel weniger, oft nur etwa ein Drittel. Man braucht dafür eine Karte vom Sozialamt der Gemeinde. Und bei uns gibt es eine Kaffee-Ecke. Viele kommen auch, um einfach zu reden.'],
        ['Yusuf', 'Schämen sich die Leute?'],
        ['Frau Morel', 'Am Anfang oft. Ein Mann hat mir gesagt: „Ich habe dreißig Jahre gearbeitet, und jetzt stehe ich hier.“ Ich habe geantwortet: „Das kann jedem passieren. Gut, dass Sie gekommen sind.“'],
        ['Yusuf', 'Was wünschen Sie sich von uns Jugendlichen?'],
        ['Frau Morel', 'Dass ihr niemanden auslacht, der keine teuren Sachen hat. Man sieht nie, was jemand gerade erlebt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist das Sozialamt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Stelle der Gemeinde, die Menschen in Not hilft', 'ein Supermarkt'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Wer kauft in der Épicerie sociale ein? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['eine Mutter mit drei Kindern', 'ein Mann, der krank wurde', 'eine Studentin', 'Rentner', 'nur Touristen'], r: [0, 1, 2, 3] }] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Lebensmittel kosten oft nur etwa ein Drittel.', true], ['Jeder darf ohne Karte einkaufen.', false], ['Es gibt eine Kaffee-Ecke zum Reden.', true], ['Frau Morel sagt dem Mann, dass er selbst schuld ist.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was meint Frau Morel mit „Man sieht nie, was jemand gerade erlebt“?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, sie meint …', 'Zum Beispiel könnte jemand …', 'Darum sollte man …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zwei Arten von Armut', punkte: ['**extreme Armut**: weniger als 3 US-Dollar pro Tag, etwa **1 von 10** Menschen weltweit', '**relative Armut**: viel weniger als die meisten im eigenen Land', 'in Luxemburg ist **fast jeder Fünfte** armutsgefährdet', 'Armut hat **viele Ursachen** – sie ist **keine Schande**'] },
         { titel: 'Was hilft', punkte: ['**Mindesteinkommen** (REVIS), Kindergeld, Wohnhilfe', '**Épiceries sociales**', 'niemanden **auslachen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wenn die Welt ein Dorf mit nur 10 Menschen wäre: Wie viele von ihnen …? Schätze und male so viele Figuren an. Vergleicht dann mit der Lösung.', stufe: 2,
        html: '<div class="voll">' + weltDorf([{ text: 'leben in extremer Armut?', an: 1 }, { text: 'haben zu Hause jederzeit sauberes Trinkwasser?', an: 7 }, { text: 'nutzen das Internet?', an: 7 }, { text: 'können als Erwachsene lesen und schreiben?', an: 9 }]) + '<p class="quelle-klein">Zahlen gerundet, nach Weltbank, WHO/UNICEF, ITU und UNESCO, Stand 2025.</p></div>' },
      { art: 'schneidekarten', auftrag: 'Koffer-Spiel: Ihr dürft für ein gutes Leben nur sechs Karten in euren Koffer packen. Welche nehmt ihr? Legt sie in eine Reihenfolge und begründet. Vergleicht mit einer anderen Gruppe.', stufe: 3, neueSeite: true, titel: 'Was brauche ich?', icon: 'briefcase', farbe: FRAGE, spalten: 4,
        karten: [
          { text: '**sauberes Wasser**' }, { text: '**genug Essen**' }, { text: '**eine Wohnung**' }, { text: '**eine Schule**' },
          { text: '**Ärztinnen und Ärzte**' }, { text: '**Freunde**' }, { text: '**Menschen, die mich lieben**' }, { text: '**ein Handy**' },
          { text: '**Internet**' }, { text: '**Zeit zum Spielen**' }, { text: '**Frieden und Sicherheit**' }, { text: '**teure Kleidung**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du bist Bürgermeisterin oder Bürgermeister. Was tust du gegen Armut in deiner Gemeinde? Schreibe drei Ideen mit Begründung.', stufe: 3,
        anfaenge: ['Als Bürgermeister/in würde ich …', 'Erstens …, weil …', 'Zweitens …', 'Drittens …'], zeilen: 8,
        beispiel: 'Als Bürgermeisterin würde ich drei Dinge tun. Erstens würde ich günstige Wohnungen bauen lassen, weil die Mieten in Luxemburg so hoch sind. Zweitens würde ich die Épicerie sociale vergrößern, damit mehr Familien dort einkaufen können. Drittens würde ich alle Schulausflüge gratis machen, damit kein Kind zu Hause bleiben muss.' },
    ],
    check: ['Ich erkläre extreme und relative Armut.', 'Ich nenne Ursachen von Armut.', 'Ich weiß, wer in Luxemburg hilft.'],
  },
  // ================================================================ 2
  {
    thema: 'Globalisierung · Gewinner und Verlierer', titel: 'Die Welt auf meinem Frühstückstisch', untertitel: 'Kakao, Kaffee, Bananen, Tee: Unser Frühstück kommt aus der ganzen Welt. Du lernst, was Globalisierung ist, findest die Länder auf der Karte und wägst ab, wer gewinnt und wer verliert.',
    ziel: { de: 'Ich erkläre, was Globalisierung ist, und nenne Vor- und Nachteile.', fr: 'J’explique ce qu’est la mondialisation et je cite des avantages et des inconvénients.' },
    bild: ['ben:froh:tasse', 'lea:froh:stehen'],
    start: {
      was: 'Frühstück',
      aufgaben: [
        { art: 'mc', auftrag: 'Was davon wächst in Luxemburg? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Äpfel', 'Kakao', 'Bananen', 'Kartoffeln', 'Kaffee', 'Weizen für Brot'], r: [0, 3, 5] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Eine Welt – eng verbunden',
      absaetze: [
        'Ein Kakao am Morgen, eine Banane in der Pause: Vieles, was wir jeden Tag essen, kommt von weit her. Länder auf der ganzen Welt **handeln** miteinander, Firmen produzieren dort, wo es am günstigsten ist, und Schiffe bringen die Waren über die Meere. Das nennt man **Globalisierung**.',
        '### Gewinner',
        'Durch die Globalisierung gibt es mehr **Auswahl** und viele Dinge sind **billiger**. In manchen Ländern sind neue **Arbeitsplätze** entstanden, und viele Menschen sind dort weniger arm als früher. Ideen, Musik und Wissen verbreiten sich schnell um die Welt.',
        '### Verlierer',
        'Aber nicht alle gewinnen. Viele Menschen, die unsere Lebensmittel anbauen, verdienen **sehr wenig**. Manchmal arbeiten sogar **Kinder** mit. Lange Transportwege schaden dem **Klima**. Und wenn eine Fabrik in ein billigeres Land umzieht, verlieren Menschen ihre Arbeit.',
        '### Was heißt das für uns?',
        'Wir sind mit Menschen auf der ganzen Welt verbunden – auch mit denen, die wir nie treffen. Darum fragen sich viele: Unter welchen Bedingungen wurde das hergestellt? Ist der Preis **gerecht**?',
      ],
      woerter: [['die Globalisierung', 'la mondialisation'], ['handeln', 'faire du commerce'], ['die Ware', 'la marchandise'], ['die Auswahl', 'le choix'], ['der Arbeitsplatz', 'l’emploi'], ['der Gewinner', 'le gagnant'], ['der Verlierer', 'le perdant'], ['die Bedingung', 'la condition']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vorteil oder Nachteil der Globalisierung? Kreuze an.', stufe: 2, kopf: ['', 'Vorteil', 'Nachteil'], breiten: [64, 18, 18], zeilen: [['mehr Auswahl im Supermarkt', '[x]', ''], ['Bauern verdienen sehr wenig', '', '[x]'], ['neue Arbeitsplätze in ärmeren Ländern', '[x]', ''], ['lange Transportwege schaden dem Klima', '', '[x]'], ['Ideen und Wissen verbreiten sich schnell', '[x]', ''], ['Fabriken ziehen weg, Menschen verlieren ihre Arbeit', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · Schulhof', titel: 'Gut oder schlecht?',
      situation: 'Ben und Lea haben im Unterricht über Globalisierung gesprochen. In der Pause diskutieren sie weiter.',
      bild: ['ben:verwirrt:stehen', 'lea:froh:erklaeren'], sprecher: { Ben: 'm3', Lea: 'w3' },
      text: [
        ['Ben', 'Ich verstehe das Problem nicht. Wenn alles billiger ist, ist das doch gut.'],
        ['Lea', 'Für uns schon. Aber wenn die Schokolade so billig ist, wer bezahlt dann den Preis? Die Kakaobauern bekommen fast nichts.'],
        ['Ben', 'Aber ohne den Handel hätten sie gar keine Arbeit.'],
        ['Lea', 'Stimmt. Das hat unser Lehrer ja auch gesagt: In manchen Ländern hat die Globalisierung Millionen Menschen aus der Armut geholfen.'],
        ['Ben', 'Also ist sie gut?'],
        ['Lea', 'Ich glaube, sie ist nicht einfach gut oder schlecht. Es kommt darauf an, ob die Regeln gerecht sind.'],
        ['Ben', 'Und was können wir da machen? Wir sind doch nur zwei Schüler.'],
        ['Lea', 'Wir können fragen, woher Sachen kommen. Fair gehandelte Produkte kaufen, wenn es geht. Und weniger wegwerfen. Viele kleine Schritte sind auch Schritte.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Es kommt darauf an“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es hängt von etwas ab.', 'Es ist immer gleich.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer sagt das? Kreuze an.', stufe: 1, kopf: ['', 'Ben', 'Lea'], breiten: [70, 15, 15], zeilen: [['„Wenn alles billiger ist, ist das doch gut.“', '[x]', ''], ['„Die Kakaobauern bekommen fast nichts.“', '', '[x]'], ['„Ohne den Handel hätten sie gar keine Arbeit.“', '[x]', ''], ['„Es kommt darauf an, ob die Regeln gerecht sind.“', '', '[x]']] },
        { art: 'fragen', auftrag: 'Was können Ben und Lea tun? Nenne zwei Dinge.', stufe: 2, fragen: [{ f: '', l: 'fragen, woher Sachen kommen; fair gehandelte Produkte kaufen; weniger wegwerfen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wem stimmt ihr eher zu: Ben oder Lea? Oder beiden ein bisschen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde, Ben hat recht, weil …', 'Lea hat einen Punkt: …', 'Beide …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Globalisierung', punkte: ['Länder **handeln** weltweit miteinander', 'Firmen produzieren, wo es **günstig** ist', 'Waren reisen um die **ganze Welt**'] },
         { titel: 'Gewinner und Verlierer', punkte: ['**+** mehr Auswahl, billiger, neue Arbeitsplätze', '**–** niedrige Löhne, Kinderarbeit, Klima', 'Frage: Sind die **Regeln gerecht**?'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Woher kommt das Frühstück? Die Karte zeigt, wo diese Lebensmittel oft herkommen. Schreibe das Land. Hilfe: Brasilien · Ecuador · Elfenbeinküste · Kenia · Luxemburg · Spanien', stufe: 1,
        html: weltKarte({ kontinente: 'grau', kontinentNamen: false, punktGroesse: 11, punktText: 30, breite: 160, punkte: [{ lon: -5.5, lat: 7.5, text: '1', farbe: '#7a4b2a' }, { lon: -47.9, lat: -15.8, text: '2', farbe: '#b4432e' }, { lon: -78.5, lat: -1.5, text: '3', farbe: '#d0a21e', links: true }, { lon: 37.9, lat: 0.2, text: '4', farbe: '#2f8a6b' }, { lon: -3.7, lat: 40.0, text: '5', farbe: '#e07b1a', links: true }, { lon: 6.1, lat: 49.6, text: '6', farbe: '#1f6aa0' }] }),
        liste: [['1 · Kakao', 'Elfenbeinküste'], ['2 · Kaffee', 'Brasilien'], ['3 · Bananen', 'Ecuador'], ['4 · Tee', 'Kenia'], ['5 · Orangen', 'Spanien'], ['6 · Milch und Butter', 'Luxemburg']], spalten: 2 },
      { art: 'schneidekarten', auftrag: 'Argumente-Karten: Schneidet die Karten aus. Sortiert sie in zwei Stapel: „spricht für die Globalisierung“ und „spricht dagegen“. Welches Argument findet ihr am stärksten?', stufe: 3, neueSeite: true, titel: 'Pro oder Contra?', icon: 'scale', farbe: WELT, spalten: 2,
        karten: [
          { text: 'In manchen Ländern haben Millionen Menschen durch Fabrikarbeit mehr Geld als früher.' },
          { text: 'Ein Kakaobauer verdient oft so wenig, dass seine Kinder mitarbeiten müssen.' },
          { text: 'Wir können im Winter frisches Obst kaufen.' },
          { text: 'Schiffe und Flugzeuge stoßen viel CO₂ aus.' },
          { text: 'Medikamente und Impfstoffe können schnell in viele Länder geliefert werden.' },
          { text: 'Kleine Läden im Dorf müssen schließen, weil große Firmen billiger sind.' },
          { text: 'Jugendliche auf der ganzen Welt hören dieselbe Musik und lernen voneinander.' },
          { text: 'Wenn ein Land Probleme hat, kann das schnell die ganze Welt treffen.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Ist die Globalisierung gut oder schlecht? Schreibe deine Meinung mit mindestens einem Argument dafür und einem dagegen.', stufe: 3,
        anfaenge: ['Die Globalisierung hat Vorteile: …', 'Aber sie hat auch Nachteile: …', 'Ich finde, …', 'Wichtig wäre, dass …'], zeilen: 8,
        beispiel: 'Die Globalisierung hat Vorteile: Wir haben mehr Auswahl, und in manchen Ländern haben Menschen neue Arbeit gefunden. Aber sie hat auch Nachteile: Viele Bauern verdienen sehr wenig, und die langen Transporte schaden dem Klima. Ich finde, sie ist nicht einfach gut oder schlecht. Wichtig wäre, dass die Regeln für alle gerecht sind.' },
    ],
    check: ['Ich erkläre, was Globalisierung ist.', 'Ich nenne Vor- und Nachteile.', 'Ich finde Herkunftsländer auf der Karte.'],
  },
  // ================================================================ 3
  {
    thema: 'Fairer Handel · Kakao · Kinderarbeit', titel: 'Wer verdient an der Schokolade?', untertitel: 'Eine Tafel Schokolade, viele Hände: Du zählst nach, wer wie viel vom Preis bekommt, lernst, was fairer Handel ist, und hörst einen Kakaobauern aus Ghana.',
    ziel: { de: 'Ich erkläre, was fairer Handel ist und warum er wichtig ist.', fr: 'J’explique ce qu’est le commerce équitable et pourquoi il est important.' },
    bild: ['lea:froh:stehen', 'mia:ueberrascht:stehen'],
    start: {
      was: 'Schätzfrage',
      aufgaben: [
        { art: 'mc', auftrag: 'Eine Tafel Schokolade kostet 1 Euro. Was glaubst du: Wie viel davon bekommen die Kakaobauern? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 50 Cent', 'etwa 25 Cent', 'weniger als 10 Cent'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen sind Schätzungen, gerundet', titel: 'Bitter für die einen, süß für die anderen',
      absaetze: [
        'Der meiste Kakao der Welt wächst in Westafrika, vor allem in der **Elfenbeinküste** und in **Ghana**. Millionen kleiner Bauernfamilien ernten dort die Kakaofrüchte von Hand.',
        '### Ein kleines Stück vom Kuchen',
        'Vom Preis einer Tafel Schokolade bekommen die Kakaobauern nach Schätzungen **weniger als ein Zehntel**. Viele verdienen so wenig, dass es kaum zum Leben reicht. Darum müssen oft auch die **Kinder** mitarbeiten. Schätzungen zufolge arbeiten in Ghana und der Elfenbeinküste über **eine Million Kinder** auf Kakaofeldern, oft mit gefährlichen Werkzeugen. Viele können deshalb nicht regelmäßig zur Schule gehen.',
        '### Fairer Handel',
        'Beim **fairen Handel** bekommen die Bauern einen festen **Mindestpreis**, auch wenn der Weltmarktpreis sinkt. Dazu gibt es eine **Prämie** für die Gemeinschaft, zum Beispiel für einen Brunnen oder eine Schule. **Ausbeuterische Kinderarbeit** ist verboten, und die Umwelt wird geschützt.',
        '### Woran erkenne ich das?',
        'Fair gehandelte Produkte tragen ein **Siegel** für fairen Handel. Sie kosten oft etwas mehr – dafür kommt mehr bei den Menschen an, die sie angebaut haben.',
      ],
      woerter: [['der Kakao', 'le cacao'], ['die Bohne', 'la fève'], ['ernten', 'récolter'], ['die Kinderarbeit', 'le travail des enfants'], ['ausbeuterisch', 'qui exploite'], ['der Mindestpreis', 'le prix minimum'], ['die Prämie', 'la prime'], ['das Siegel', 'le label']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Wo wächst der meiste Kakao der Welt?', l: 'in Westafrika, vor allem in der Elfenbeinküste und in Ghana' }, { f: 'Warum müssen viele Kinder auf den Kakaofeldern mitarbeiten?', zeilen: 2, l: 'Weil ihre Eltern so wenig verdienen, dass es kaum zum Leben reicht.' }, { f: 'Nenne drei Regeln des fairen Handels.', zeilen: 2, l: 'Mindestpreis, Prämie für die Gemeinschaft, keine ausbeuterische Kinderarbeit, Umweltschutz' }] },
      ],
    },
    hoeren: {
      was: 'Ein Videoanruf', wo: 'Klasse 6P3 · Videoanruf nach Ghana', titel: 'Ein Brunnen aus Schokolade',
      situation: 'Die Klasse hat über eine Partnerschule Kontakt zu Herrn Mensah. Er baut in Ghana Kakao an und ist Mitglied einer Genossenschaft, die fair handelt.',
      bild: ['lea:froh:laptop', 'mia:froh:stehen'], sprecher: { Lea: 'w3', 'Herr Mensah': 'm1', Mia: 'w2' },
      text: [
        ['Lea', 'Guten Tag, Herr Mensah! Wie sieht Ihr Arbeitstag aus?'],
        ['Herr Mensah', 'Ich stehe früh auf, bevor es zu heiß wird. Ich schneide die Kakaofrüchte vom Baum, öffne sie und hole die Bohnen heraus. Dann lassen wir die Bohnen etwa eine Woche unter Bananenblättern gären. Danach trocknen sie in der Sonne.'],
        ['Mia', 'Haben Sie schon einmal Schokolade gegessen?'],
        ['Herr Mensah', 'Ja, aber erst als Erwachsener. Viele Bauern hier haben noch nie Schokolade probiert. Sie ist für uns teuer.'],
        ['Lea', 'Was hat sich durch den fairen Handel verändert?'],
        ['Herr Mensah', 'Wir bekommen einen sicheren Mindestpreis. Und mit der Prämie hat unsere Genossenschaft einen Brunnen gebaut. Früher mussten die Mädchen jeden Morgen weit laufen, um Wasser zu holen. Jetzt gehen sie in die Schule.'],
        ['Mia', 'Und Ihre Kinder?'],
        ['Herr Mensah', 'Meine Tochter will Ärztin werden. Wenn ihr fair gehandelte Schokolade kauft, helft ihr ein kleines bisschen mit.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Genossenschaft? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Viele Bauern schließen sich zusammen und arbeiten und verkaufen gemeinsam.', 'ein Supermarkt in Europa'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Wie entsteht der Kakao? Ordne.', stufe: 1, teile: ['Die Kakaofrüchte vom Baum schneiden', 'Die Früchte öffnen', 'Die Bohnen herausholen', 'Die Bohnen gären und trocknen lassen'], ordnung: [3, 1, 0, 2] },
        { art: 'fragen', auftrag: 'Was hat die Genossenschaft mit der Prämie gebaut? Was hat sich dadurch verändert?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'einen Brunnen; die Mädchen müssen kein Wasser mehr holen und gehen in die Schule' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat euch im Gespräch überrascht?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mich hat überrascht, dass …', 'Ich wusste nicht, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Kakao', punkte: ['wächst vor allem in **Westafrika**', 'Bauern bekommen **weniger als ein Zehntel** vom Preis', 'oft **Kinderarbeit**, weil das Geld nicht reicht'] },
         { titel: 'Fairer Handel', punkte: ['**Mindestpreis**', '**Prämie** für die Gemeinschaft', 'keine **ausbeuterische Kinderarbeit**', '**Umweltschutz**', 'erkennbar am **Siegel**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Die Schokoladentafel hat 100 Stückchen. Jedes Stückchen steht für 1 Prozent vom Preis. Zähle: Wie viele Stückchen bekommt jede Gruppe?', stufe: 2,
        html: '<div class="voll">' + schokoTafel([{ name: 'Kakaobauern', anteil: 7, farbe: '#2f8a6b' }, { name: 'Händler und Kakaomühlen', anteil: 8, farbe: '#d08a1e' }, { name: 'Schokoladenfabrik', anteil: 35, farbe: '#8a5a3b' }, { name: 'Steuern und Transport', anteil: 6, farbe: '#7d8597' }, { name: 'Supermarkt', anteil: 44, farbe: '#b4432e' }]) + '<p class="quelle-klein">Schätzung einer Studie zum Kakaohandel, gerundet.</p></div>' },
      { art: 'fragen', auftrag: 'Schau auf die Tafel.', stufe: 2, fragen: [{ f: 'Wer bekommt am meisten?', l: 'der Supermarkt (44 Prozent)' }, { f: 'Wer hat die meiste Arbeit und bekommt fast am wenigsten?', l: 'die Kakaobauern (7 Prozent)' }, { f: 'Findest du die Verteilung gerecht? Begründe.', zeilen: 2, l: 'Individuelle Antwort, z. B.: Nein, weil die Bauern die schwerste Arbeit machen und am wenigsten bekommen.' }] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Die Klasse verkauft beim Schulfest Schokolade für die Klassenkasse. Fair gehandelte Schokolade kostet im Einkauf mehr. Dann bleibt weniger Gewinn für die Klassenfahrt.'],
        frage: 'Welche Schokolade soll die Klasse kaufen?',
        optionen: ['Die billigste – dann haben wir mehr für die Klassenfahrt.', 'Fair gehandelte – auch wenn weniger übrig bleibt.', 'Fair gehandelte – und wir erklären auf einem Plakat, warum sie etwas mehr kostet.'],
        hinweis: 'Es gibt keine einfache Lösung. Gute Antworten denken an die Klasse und an die Kakaobauern.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Plakat für das Schulfest: „Warum fair gehandelte Schokolade?“ Schreibe die Texte für das Plakat.', stufe: 2,
        anfaenge: ['Überschrift: …', 'Wusstest du, dass …?', 'Fairer Handel bedeutet …', 'Darum …'], zeilen: 7,
        beispiel: 'Überschrift: Süß für alle! Wusstest du, dass Kakaobauern weniger als 10 Cent von einer Tafel Schokolade für 1 Euro bekommen? Fairer Handel bedeutet: Die Bauern bekommen einen Mindestpreis, ihre Dörfer bekommen eine Prämie für Brunnen und Schulen, und ausbeuterische Kinderarbeit ist verboten. Darum kostet unsere Schokolade ein bisschen mehr – und schmeckt doppelt gut.' },
    ],
    check: ['Ich erkläre, wer an der Schokolade verdient.', 'Ich nenne Regeln des fairen Handels.', 'Ich erkenne fair gehandelte Produkte.'],
  },
  // ================================================================ 4
  {
    thema: 'Globale Umweltpolitik · lokales Handeln', titel: 'Global denken, lokal handeln', untertitel: 'Das Klima geht alle an – aber wer muss was tun? Du lernst das Pariser Abkommen kennen, denkst über Klimagerechtigkeit nach und sortierst Aufgaben von der Welt bis zu dir selbst.',
    ziel: { de: 'Ich erkläre, wer beim Klimaschutz Verantwortung trägt, und nenne, was ich selbst tun kann.', fr: 'J’explique qui est responsable de la protection du climat et ce que je peux faire moi-même.' },
    bild: ['finn:verwirrt:stehen', 'lea:froh:zeigen'],
    start: {
      was: 'Wer ist verantwortlich?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wer muss deiner Meinung nach am meisten für den Klimaschutz tun? Begründe kurz.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort, z. B.: die reichen Länder, weil sie am meisten CO₂ ausstoßen.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, Stand etwa 2023', titel: 'Ein Klima für alle',
      absaetze: [
        'Treibhausgase wie **CO₂** kennen keine Grenzen. Ganz egal, wo sie ausgestoßen werden: Sie erwärmen die ganze Erde. Darum kann kein Land das Klima allein schützen.',
        '### Das Pariser Abkommen',
        'Im Jahr **2015** haben sich fast alle Länder der Welt in Paris auf ein Ziel geeinigt: Die Erwärmung soll **deutlich unter 2 Grad** bleiben, möglichst bei **1,5 Grad**. Jedes Land muss sagen, wie viel CO₂ es einsparen will. Auch die **Europäische Union** und **Luxemburg** haben sich Ziele gesetzt.',
        '### Ist das gerecht?',
        'Die Menschen in einem reichen Land wie Luxemburg stoßen pro Kopf **etwa 10 Tonnen** CO₂ im Jahr aus – auch, weil viele hier tanken, die gar nicht hier wohnen. In **Bangladesch** ist es **weniger als eine Tonne**. Doch gerade arme Länder wie Bangladesch leiden besonders unter Überschwemmungen und Stürmen. Darum sprechen viele von **Klimagerechtigkeit**: Wer mehr verursacht und mehr Geld hat, soll mehr tun und anderen helfen.',
        '### Viele Ebenen',
        'Die **Welt** schließt Abkommen. Der **Staat** macht Gesetze, zum Beispiel eine Steuer auf CO₂. Die **Gemeinde** baut Radwege und Solaranlagen. Die **Schule** kann Energie sparen. Und **jeder Einzelne** entscheidet, wie er sich bewegt, was er isst und kauft.',
      ],
      woerter: [['das Treibhausgas', 'le gaz à effet de serre'], ['ausstoßen', 'émettre'], ['das Abkommen', 'l’accord'], ['sich einigen', 'se mettre d’accord'], ['einsparen', 'économiser'], ['pro Kopf', 'par habitant'], ['verursachen', 'causer'], ['die Gerechtigkeit', 'la justice']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Im Jahr [2015] einigten sich fast alle Länder in Paris auf ein Klimaziel.', 'Die Erwärmung soll möglichst bei [1,5] Grad bleiben.', 'In Luxemburg sind es pro Kopf etwa [10] Tonnen CO₂ im Jahr.', 'In Bangladesch ist es weniger als [eine] Tonne.'] },
        { art: 'fragen', auftrag: 'Was bedeutet Klimagerechtigkeit?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wer mehr CO₂ verursacht und mehr Geld hat, soll mehr für den Klimaschutz tun und anderen helfen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 6P1 · Diskussion', titel: 'Bringt das überhaupt etwas?',
      situation: 'Die Klasse spricht über Klimaschutz. Finn ist skeptisch.',
      bild: ['finn:gelangweilt:verschraenkt', 'lea:froh:erklaeren'], sprecher: { Finn: 'm3', Lea: 'w3', Lehrer: 'm2' },
      text: [
        ['Finn', 'Ehrlich, was bringt das, wenn ich das Licht ausmache? Luxemburg ist winzig. Die großen Länder müssen etwas tun.'],
        ['Lea', 'Aber wir stoßen pro Kopf viel mehr aus als die meisten Menschen auf der Welt.'],
        ['Finn', 'Trotzdem. Ein Mensch allein kann das Klima nicht retten.'],
        ['Lehrer', 'Da hast du recht, Finn. Allein nicht. Aber stell dir eine Wahl vor: Eine einzelne Stimme entscheidet auch nichts. Wenn aber alle denken „Meine Stimme bringt nichts“, dann geht niemand wählen.'],
        ['Lea', 'Und wenn viele etwas ändern, merken das auch die Politiker und die Firmen.'],
        ['Lehrer', 'Genau. Es braucht beides: große Regeln und viele kleine Schritte. Was könnten wir hier an der Schule tun?'],
        ['Finn', 'Okay … vielleicht dafür sorgen, dass die Heizung nicht läuft, wenn die Fenster offen sind. Das nervt mich sowieso.'],
        ['Lea', 'Und ein Fahrradständer mit Dach! Dann kommen mehr mit dem Rad.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „skeptisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man zweifelt, ob etwas stimmt oder etwas bringt.', 'Man ist sehr begeistert.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum glaubt Finn, dass sein Handeln nichts bringt?', l: 'Luxemburg ist winzig; ein Mensch allein kann das Klima nicht retten.' }, { f: 'Welchen Vergleich macht der Lehrer?', zeilen: 2, l: 'mit einer Wahl: Eine Stimme allein entscheidet nichts, aber wenn alle so denken, wählt niemand.' }, { f: 'Welche zwei Ideen haben Finn und Lea für die Schule?', zeilen: 2, l: 'Heizung aus, wenn die Fenster offen sind; ein Fahrradständer mit Dach' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wer hat euch überzeugt? Sprecht darüber.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich verstehe Finn, weil …', 'Mich überzeugt der Vergleich mit …', 'Ich denke, es braucht …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Klimapolitik', punkte: ['**Pariser Abkommen** (2015): deutlich unter 2 Grad, möglichst **1,5 Grad**', '**Klimagerechtigkeit**: Wer mehr verursacht, soll mehr tun', 'es braucht **große Regeln** und **viele kleine Schritte**'] },
         { titel: 'Viele Ebenen', punkte: ['**Welt**: Abkommen', '**EU** und **Staat**: Gesetze, CO₂-Steuer', '**Gemeinde**: Radwege, Solaranlagen', '**Schule** und **ich**: Energie sparen, Rad, weniger kaufen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Wer kann was tun? Schneidet die Karten aus und legt sie zu den Ebenen: Welt · EU und Staat · Gemeinde · Schule · ich. Manche passen zu mehreren Ebenen – begründet.', stufe: 2, neueSeite: true, titel: 'Klima-Ebenen', icon: 'world', farbe: IDEE, spalten: 3,
        karten: [
          { text: 'ein weltweites Klimaabkommen schließen' }, { text: 'Bus und Zug gratis machen' }, { text: 'sichere Radwege bauen' },
          { text: 'Solaranlagen auf das Schuldach setzen' }, { text: 'in der Klasse Müll trennen' }, { text: 'das Licht ausmachen' },
          { text: 'mit dem Rad statt mit dem Elterntaxi kommen' }, { text: 'eine Steuer auf CO₂ einführen' }, { text: 'Regeln für sparsamere Autos festlegen' },
          { text: 'Bäume pflanzen' }, { text: 'gebrauchte Kleidung kaufen' }, { text: 'eine Klima-AG gründen' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Antrag an das Schülerkomitee oder die Schulleitung: eine Idee für mehr Klimaschutz an deiner Schule.', stufe: 2,
        anfaenge: ['Liebe Mitglieder des Schülerkomitees,', 'wir schlagen vor, dass …', 'Das ist gut für das Klima, weil …', 'Es kostet …', 'Wir helfen mit, indem …'], zeilen: 8,
        beispiel: 'Liebe Mitglieder des Schülerkomitees, wir schlagen vor, dass in jeder Klasse eine Energie-Detektivin oder ein Energie-Detektiv gewählt wird. Diese Person achtet darauf, dass das Licht in der Pause aus ist und die Heizung nicht läuft, wenn die Fenster offen sind. Das ist gut für das Klima, weil die Schule so weniger Energie verbraucht. Es kostet nichts. Wir helfen mit, indem wir für alle Klassen kleine Erinnerungsschilder basteln.' },
    ],
    check: ['Ich erkläre das Pariser Abkommen.', 'Ich erkläre Klimagerechtigkeit.', 'Ich nenne, wer was tun kann – auch ich.'],
  },
  // ================================================================ 5
  {
    thema: 'Zeichen und Symbole · Religionen', titel: 'Zeichen, die etwas sagen', untertitel: 'Ein Kreuz, ein Stern, ein Herz, ein Regenbogen: Zeichen sagen ohne Worte, was Menschen wichtig ist. Du lernst Zeichen der Religionen kennen und hörst, welche Zeichen Jugendlichen etwas bedeuten.',
    ziel: { de: 'Ich erkenne Zeichen verschiedener Religionen und erkläre, was Symbole für Menschen bedeuten.', fr: 'Je reconnais des signes de différentes religions et j’explique ce que les symboles signifient pour les gens.' },
    bild: ['mia:froh:stehen-zeigen', 'sami:froh:stehen'],
    start: {
      was: 'Zeichen im Alltag',
      aufgaben: [
        { art: 'symbole', auftrag: 'Was bedeuten diese Zeichen? Schreib das Wort.', stufe: 1, woerter: ['Liebe', 'Frieden', 'Recycling', 'barrierefrei', 'Gerechtigkeit', 'Natur'],
          symbole: [['heart', 'Liebe'], ['peace', 'Frieden'], ['recycle', 'Recycling'], ['wheelchair', 'barrierefrei'], ['scale', 'Gerechtigkeit'], ['leaf', 'Natur']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Mehr als ein Bild',
      absaetze: [
        'Ein **Symbol** ist ein Zeichen, das für etwas Größeres steht. Ein Herz ist nicht nur eine Form – es steht für Liebe. Eine Taube mit einem Zweig steht für Frieden. Symbole sprechen ohne Worte und werden oft auf der ganzen Welt verstanden.',
        '### Zeichen der Religionen',
        'Auch Religionen haben Zeichen. Das **Kreuz** erinnert Christen an Jesus. Der **Davidstern** ist ein Zeichen des Judentums. **Halbmond und Stern** werden oft für den Islam verwendet, auch wenn der Islam kein offizielles Zeichen hat. Das **Om** ist ein heiliger Klang im Hinduismus. Das **Rad der Lehre** mit acht Speichen steht im Buddhismus für den Weg, den Buddha gelehrt hat. **Yin und Yang** aus dem Daoismus zeigen, dass Gegensätze zusammengehören.',
        '### Zeichen zeigen Zugehörigkeit',
        'Menschen tragen Zeichen als Kette, als Anstecker oder auf der Kleidung. Sie zeigen damit: Das ist mir wichtig, da gehöre ich dazu. Das gilt auch für Vereinswappen, Flaggen oder Bänder.',
        '### Mit Respekt',
        'Für viele Menschen sind religiöse Zeichen **heilig**. Darum macht man sich nicht über sie lustig und beschädigt sie nicht – auch wenn man selbst nicht daran glaubt.',
      ],
      woerter: [['das Symbol', 'le symbole'], ['das Zeichen', 'le signe'], ['die Taube', 'la colombe'], ['heilig', 'sacré'], ['die Speiche', 'le rayon (de roue)'], ['der Gegensatz', 'le contraire'], ['der Anstecker', 'le badge'], ['die Zugehörigkeit', 'l’appartenance']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Zeichen gehört zu welcher Religion? Verbinde.', stufe: 1, links: ['Kreuz', 'Davidstern', 'Halbmond und Stern', 'Om', 'Rad der Lehre', 'Yin und Yang'], rechts: ['Christentum', 'Judentum', 'Islam', 'Hinduismus', 'Buddhismus', 'Daoismus'] },
      ],
    },
    hoeren: {
      was: 'Eine Vorstellungsrunde', wo: 'Klasse 6P2 · Projekt „Mein Zeichen“', titel: 'Mein Zeichen',
      situation: 'Jede und jeder hat ein Zeichen mitgebracht, das ihr oder ihm wichtig ist, und erklärt es der Klasse.',
      bild: ['mia:froh:zeigen', 'sami:froh:stehen'], sprecher: { Mia: 'w3', Sami: 'm3', Jana: 'w2', Ben: 'm2' },
      text: [
        ['Mia', 'Das ist meine Kette mit einem kleinen Kreuz. Die habe ich zur Kommunion bekommen. Ich bin nicht jeden Sonntag in der Kirche, aber das Kreuz erinnert mich daran, dass ich nicht allein bin.'],
        ['Sami', 'Das ist eine Gebetskette, eine Tasbih. Sie hat dreiunddreißig Perlen. Mein Opa hat sie mir geschenkt. Muslime sprechen damit Lobpreisungen Gottes. Ich nehme sie oft in die Hand, wenn ich nervös bin. Dann werde ich ruhiger.'],
        ['Jana', 'Mein Zeichen ist ein Regenbogen-Anstecker. Für mich heißt er: Alle Menschen sind willkommen, egal wen sie lieben oder wie sie sind.'],
        ['Ben', 'Ich habe das Friedenszeichen auf meinem Rucksack. Es wurde 1958 in England erfunden, für Demonstrationen gegen Atomwaffen. Ich finde es gut, weil es zeigt: Ich bin gegen Krieg.'],
        ['Mia', 'Lustig. Wir haben ganz verschiedene Zeichen, aber alle sagen irgendwie: Das gibt mir Halt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „Das gibt mir Halt“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Das macht mich stark und sicher.', 'Das ist schwer zu tragen.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Zeichen hat wer mitgebracht? Was bedeutet es für sie oder ihn?', stufe: 1, kopf: ['Person', 'Zeichen', 'Was bedeutet es?'], breiten: [16, 30, 54], zeilen: [['Mia', '[Kette mit Kreuz]', '[Sie ist nicht allein.]'], ['Sami', '[Gebetskette (Tasbih)]', '[Lobpreisungen Gottes; macht ihn ruhiger]'], ['Jana', '[Regenbogen-Anstecker]', '[Alle Menschen sind willkommen.]'], ['Ben', '[Friedenszeichen]', '[gegen Krieg]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Gibt es ein Zeichen, das dir etwas bedeutet? Du kannst auch eins erfinden.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mein Zeichen ist …', 'Es bedeutet für mich …', 'Ich trage es / habe es …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Symbole', punkte: ['stehen für **etwas Größeres**', 'sprechen **ohne Worte**', 'zeigen **Zugehörigkeit**'] },
         { titel: 'Zeichen der Religionen', punkte: ['**Kreuz**: Christentum', '**Davidstern**: Judentum', '**Halbmond und Stern**: Islam (nicht offiziell)', '**Om**: Hinduismus · **Rad der Lehre**: Buddhismus', 'religiöse Zeichen mit **Respekt** behandeln'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Zeichen der Religionen: Schreibe zu jedem Zeichen die Religion.', stufe: 1, html: religionsZeichen({ leer: true }) },
      { art: 'schneidekarten', auftrag: 'Erfinde dein eigenes Zeichen: Zeichne es auf die Karte und schreibe, wofür es steht. Hängt alle Karten in der Klasse auf.', stufe: 2, titel: 'Mein Zeichen', icon: 'star', farbe: GLAUBE, spalten: 2,
        karten: [{ text: '**Mein Zeichen:**\n\n\n\n', linien: 2, frage: 'Es steht für …' }, { text: '**Ein Zeichen für unsere Klasse:**\n\n\n\n', linien: 2, frage: 'Es steht für …' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe ein Zeichen, das du kennst (aus einer Religion, einem Verein, einer Bewegung). Was bedeutet es? Wer trägt es?', stufe: 2,
        anfaenge: ['Das Zeichen … kennen viele.', 'Es sieht aus wie …', 'Es bedeutet …', 'Man sieht es oft …'], zeilen: 7,
        beispiel: 'Das Friedenszeichen kennen viele. Es sieht aus wie ein Kreis mit einem Strich in der Mitte und zwei schrägen Strichen nach unten. Es bedeutet Frieden und wurde 1958 gegen Atomwaffen erfunden. Man sieht es oft auf Demonstrationen, auf Taschen oder als Graffiti.' },
    ],
    check: ['Ich erkläre, was ein Symbol ist.', 'Ich erkenne Zeichen der Religionen.', 'Ich behandle religiöse Zeichen mit Respekt.'],
  },
  // ================================================================ 6
  {
    thema: 'Kleidung und Mode · Zugehörigkeit · Religion', titel: 'Kleider sagen etwas', untertitel: 'Kleidung schützt, wärmt – und spricht: Sie zeigt, wozu wir gehören, was wir glauben, wer wir sein wollen. Du denkst über Mode und Gruppendruck nach und hörst, warum Amira ein Kopftuch trägt.',
    ziel: { de: 'Ich erkläre, was Kleidung über Menschen aussagen kann, und begegne Unterschieden mit Respekt.', fr: 'J’explique ce que les vêtements peuvent dire des gens et je respecte les différences.' },
    bild: ['amira:froh:stehen', 'chloe:froh:laessig'],
    start: {
      was: 'Warum tragen wir Kleidung?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Warum tragen Menschen Kleidung? Sammle möglichst viele Gründe.', stufe: 1, mitte: 'Kleidung', aeste: ['Schutz vor Kälte', { l: 'Schutz vor Sonne' }, { l: 'gefallen' }, { l: 'dazugehören' }, { l: 'Religion' }, { l: 'Beruf' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Kleider machen Leute?',
      absaetze: [
        'Ein altes Sprichwort sagt: „**Kleider machen Leute.**“ Gemeint ist: Andere beurteilen uns oft nach unserer Kleidung. Kleidung schützt uns vor Kälte und Sonne. Aber sie sagt auch etwas.',
        '### Zugehörigkeit',
        'Fußballfans tragen das Trikot ihres Vereins. Feuerwehrleute, Köche und Pflegekräfte tragen **Berufskleidung**. Jugendliche einer Gruppe ziehen sich oft ähnlich an. Kleidung zeigt: **Ich gehöre dazu.**',
        '### Religion',
        'Manche Menschen zeigen mit ihrer Kleidung ihren Glauben. Viele **jüdische** Männer tragen beim Beten oder im Alltag eine **Kippa**, eine kleine Kappe. Manche **muslimische** Frauen tragen ein **Kopftuch**. **Sikh**-Männer tragen oft einen **Turban**. Ordensschwestern und Mönche tragen eine Ordenstracht. Wichtig ist: Jeder Mensch soll **selbst entscheiden** dürfen, was er trägt.',
        '### Mode und Druck',
        'Mode macht Spaß, und man kann mit ihr zeigen, wer man ist. Aber manchmal entsteht **Druck**: Wer nicht die „richtigen“ Marken trägt, wird ausgelacht. Dabei sagt der Preis eines Pullis nichts darüber, ob jemand ein guter Mensch oder ein guter Freund ist.',
      ],
      woerter: [['das Sprichwort', 'le proverbe'], ['beurteilen', 'juger'], ['das Trikot', 'le maillot'], ['die Berufskleidung', 'la tenue de travail'], ['die Kippa', 'la kippa'], ['das Kopftuch', 'le foulard'], ['der Turban', 'le turban'], ['die Marke', 'la marque']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was zeigt die Kleidung? Verbinde.', stufe: 1, links: ['Trikot eines Fußballvereins', 'weiße Jacke in der Küche', 'Kippa', 'Turban eines Sikh'], rechts: ['Ich bin Fan.', 'Ich bin Koch oder Köchin.', 'Ich bin jüdisch.', 'Ich gehöre zur Religion der Sikhs.'] },
        { art: 'fragen', auftrag: 'Was meint das Sprichwort „Kleider machen Leute“? Stimmt es?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Andere beurteilen uns nach unserer Kleidung. Es stimmt teilweise, aber Kleidung sagt nichts darüber, ob jemand ein guter Mensch ist.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach dem Sportunterricht', titel: 'Meine Entscheidung',
      situation: 'Chloé fragt Amira, warum sie seit den Ferien ein Kopftuch trägt.',
      bild: ['amira:froh:stehen', 'chloe:verwirrt:stehen'], sprecher: { Chloé: 'w3', Amira: 'w2' },
      text: [
        ['Chloé', 'Darf ich dich was fragen? Warum trägst du seit den Ferien ein Kopftuch? Haben deine Eltern das gesagt?'],
        ['Amira', 'Nein. Meine Mutter trägt gar keins. Ich habe es selbst entschieden. Ich habe viel darüber gelesen und mit meiner Tante geredet.'],
        ['Chloé', 'Und warum?'],
        ['Amira', 'Für mich ist es ein Zeichen für meinen Glauben. Es fühlt sich an, als würde ich zeigen, wer ich bin.'],
        ['Chloé', 'Nervt es nicht, wenn Leute komisch schauen?'],
        ['Amira', 'Manchmal schon. Im Bus hat mal jemand gesagt, ich soll „zurück in mein Land“. Ich bin in Esch geboren!'],
        ['Chloé', 'Das ist gemein. Tut mir leid.'],
        ['Amira', 'Danke. Am meisten freue ich mich, wenn Leute einfach fragen, so wie du. Fragen ist viel besser als vermuten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „vermuten“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas annehmen, ohne es genau zu wissen', 'etwas sicher wissen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Amiras Eltern haben ihr das Kopftuch vorgeschrieben.', false], ['Amiras Mutter trägt kein Kopftuch.', true], ['Für Amira ist das Kopftuch ein Zeichen für ihren Glauben.', true], ['Amira ist in Esch geboren.', true], ['Amira mag es nicht, wenn man sie fragt.', false]] },
        { art: 'fragen', auftrag: 'Was hat Amira im Bus erlebt? Wie findest du das?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Jemand sagte, sie solle „zurück in ihr Land“, obwohl sie in Esch geboren ist. Das ist ein Vorurteil und verletzend.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum ist „fragen besser als vermuten“? Sprecht darüber.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Wenn man vermutet, …', 'Wenn man fragt, …', 'Man könnte fragen: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Kleidung sagt etwas', punkte: ['**Schutz** vor Kälte und Sonne', '**Zugehörigkeit**: Verein, Beruf, Gruppe', '**Religion**: Kippa, Kopftuch, Turban, Ordenstracht', '**Ausdruck**: Das bin ich.'] },
         { titel: 'Mit Respekt', punkte: ['jeder darf **selbst entscheiden**', '**fragen** statt vermuten', 'der **Preis** sagt nichts über den Menschen'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['An unserer Schule sollten alle eine Schuluniform tragen.', 'Markenkleidung ist wichtig, um dazuzugehören.'] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Tom kommt seit Wochen mit denselben ausgewaschenen Turnschuhen. Ein paar Jungen machen Fotos von seinen Schuhen und schicken sie mit Lach-Emojis in den Klassenchat. Tom tut so, als wäre es ihm egal.'],
        frage: 'Was tust du?',
        optionen: ['Ich lache mit, ist doch nur Spaß.', 'Ich schreibe in den Chat: „Hört auf damit.“', 'Ich rede mit Tom und sage einem Erwachsenen Bescheid.'],
        hinweis: 'Fotos von anderen zu verbreiten, um sie auszulachen, ist Mobbing. B und C helfen – am besten zusammen. Hilfe: BEE SECURE Helpline 8002 1234.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Kleider machen Leute – stimmt das? Schreibe deine Meinung mit Beispielen.', stufe: 3,
        anfaenge: ['Ich finde, das Sprichwort stimmt / stimmt nicht, weil …', 'Ein Beispiel: …', 'Andererseits …', 'Für mich zählt …'], zeilen: 8,
        beispiel: 'Ich finde, das Sprichwort stimmt nur teilweise. Es stimmt, dass viele Menschen andere zuerst nach der Kleidung beurteilen. Ein Beispiel: Wer zum Vorstellungsgespräch ordentlich angezogen kommt, macht einen besseren ersten Eindruck. Andererseits sagt Kleidung nichts darüber, ob jemand ehrlich, hilfsbereit oder lustig ist. Für mich zählt, wie jemand mit anderen umgeht.' },
    ],
    check: ['Ich erkläre, was Kleidung über Menschen sagen kann.', 'Ich nenne religiöse Kleidungsstücke.', 'Ich frage, statt zu vermuten.'],
  },
  // ================================================================ 7
  {
    thema: 'Glauben · Wissen · Meinen', titel: 'Glauben, wissen, meinen', untertitel: '„Ich weiß“, „ich glaube“, „ich finde“ – das ist nicht dasselbe. Du lernst die drei zu unterscheiden, sortierst Aussagen und hörst ein respektvolles Gespräch über Gott.',
    ziel: { de: 'Ich unterscheide Wissen, Glauben und Meinen und spreche respektvoll über Glaubensfragen.', fr: 'Je distingue savoir, croire et opinion et je parle avec respect des questions de foi.' },
    bild: ['ben:verwirrt:stehen', 'amira:ruhig:stehen'],
    start: {
      was: 'Drei kleine Wörter',
      aufgaben: [
        { art: 'mc', auftrag: 'Welcher Satz drückt Wissen aus? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['„Ich weiß, dass Wasser bei 0 °C gefriert.“', '„Ich finde, Winter ist die schönste Jahreszeit.“', '„Ich glaube, morgen schneit es.“'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Text zum Nachdenken', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Text zum Nachdenken (vereinfacht)', titel: 'Drei Arten, etwas für wahr zu halten',
      absaetze: [
        '### Wissen',
        'Wissen kann man **überprüfen**: durch Beobachten, Messen, Experimente oder sichere Quellen. „Die Erde dreht sich um die Sonne“ ist Wissen. Jeder kann es nachprüfen – und alle kommen zum gleichen Ergebnis. Wissen kann sich aber auch ändern, wenn man Neues entdeckt.',
        '### Meinen',
        'Eine **Meinung** ist eine persönliche Sicht: „Mathe ist langweilig.“ „Die Band ist die beste.“ Meinungen können verschieden sein, ohne dass jemand „falsch“ liegt. Gute Meinungen haben **Gründe**.',
        '### Glauben',
        'Das Wort „glauben“ hat zwei Bedeutungen. Im Alltag heißt es oft **vermuten**: „Ich glaube, der Bus kommt gleich.“ In der Religion bedeutet glauben **vertrauen**: „Ich glaube an Gott.“ Solche Glaubenssätze kann man nicht mit einem Experiment **beweisen** – aber auch nicht **widerlegen**. Für Gläubige sind sie trotzdem sehr wichtig. Sie geben **Halt** und **Orientierung**.',
        '### Warum ist der Unterschied wichtig?',
        'Wer Wissen und Meinung verwechselt, streitet oft unnötig. Und wer versteht, was Glaube ist, kann mit Menschen anderer Religionen und mit Menschen ohne Religion **respektvoll** sprechen.',
      ],
      woerter: [['überprüfen', 'vérifier'], ['die Quelle', 'la source'], ['die Meinung', 'l’opinion'], ['vermuten', 'supposer'], ['vertrauen', 'faire confiance'], ['beweisen', 'prouver'], ['widerlegen', 'réfuter'], ['der Halt', 'le soutien, l’appui']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Verbinde.', stufe: 1, links: ['Wissen', 'Meinung', 'Glauben (Religion)', 'Glauben (Alltag)'], rechts: ['kann man überprüfen', 'persönliche Sicht mit Gründen', 'vertrauen, nicht beweisbar', 'vermuten'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Vie et société · Klassengespräch', titel: 'Kann man Gott beweisen?',
      situation: 'Im Unterricht kommt die Frage auf, ob man beweisen kann, dass es Gott gibt.',
      bild: ['ben:verwirrt:stehen', 'amira:ruhig:stehen'], sprecher: { Ben: 'm3', Amira: 'w2', Lehrer: 'm2' },
      text: [
        ['Ben', 'Ich glaube nur, was man beweisen kann. Und Gott kann man nicht beweisen.'],
        ['Amira', 'Man kann aber auch nicht beweisen, dass es ihn nicht gibt.'],
        ['Lehrer', 'Ihr habt beide recht. Mit einem Experiment kann man weder das eine noch das andere zeigen. Darum spricht man hier von Glauben und nicht von Wissen.'],
        ['Ben', 'Aber warum glaubt man dann daran?'],
        ['Amira', 'Für mich ist es wie Vertrauen. Ich kann nicht beweisen, dass meine beste Freundin mich mag. Aber ich vertraue ihr. Mein Glaube gibt mir Halt, wenn es schwierig ist.'],
        ['Ben', 'Hm. Ich verlasse mich lieber auf das, was man messen kann. Aber ich finde es okay, dass du glaubst.'],
        ['Lehrer', 'Und genau so kann man gut miteinander reden: zuhören, nachfragen, die eigene Sicht begründen – und die andere Sicht stehen lassen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „eine Sicht stehen lassen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man akzeptiert, dass jemand anders denkt.', 'Man streitet, bis der andere nachgibt.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was sagt Ben über Gott?', l: 'Man kann ihn nicht beweisen; er glaubt nur, was man beweisen kann.' }, { f: 'Womit vergleicht Amira ihren Glauben?', l: 'mit dem Vertrauen in ihre beste Freundin' }, { f: 'Wie kann man nach dem Lehrer gut miteinander reden?', zeilen: 2, l: 'zuhören, nachfragen, die eigene Sicht begründen und die andere Sicht stehen lassen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Probiert es aus: Sprecht zu zweit über eine Frage, bei der ihr verschiedener Meinung seid. Hört zu, fragt nach, begründet.', stufe: 3, karten: [
        { titel: 'Hilfen', text: ['Habe ich dich richtig verstanden: …?', 'Warum ist dir das wichtig?', 'Ich sehe das anders, weil …', 'Ich kann verstehen, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wissen · Meinen · Glauben', punkte: ['**Wissen**: kann man **überprüfen**', '**Meinung**: persönliche Sicht mit **Gründen**', '**Glauben** im Alltag: **vermuten**', '**Glauben** in der Religion: **vertrauen**, nicht beweisbar, nicht widerlegbar'] },
         { titel: 'Gut miteinander reden', punkte: ['**zuhören**', '**nachfragen**', 'eigene Sicht **begründen**', 'andere Sicht **stehen lassen**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Wissen, Meinung oder Glaube? Kreuze an. Bei manchen kann man streiten – begründet dann.', stufe: 2, kopf: ['Aussage', 'Wissen', 'Meinung', 'Glaube'], breiten: [58, 14, 14, 14], zeilen: [
        ['Die Erde dreht sich um die Sonne.', '[x]', '', ''], ['Gott hat die Welt erschaffen.', '', '', '[x]'], ['Mathe ist langweilig.', '', '[x]', ''], ['Rauchen schadet der Gesundheit.', '[x]', '', ''],
        ['Nach dem Tod gibt es ein Weiterleben.', '', '', '[x]'], ['Der Sommer ist die schönste Jahreszeit.', '', '[x]', ''], ['Luxemburg hat drei Amtssprachen.', '[x]', '', ''], ['Jeder Mensch hat eine Seele.', '', '', '[x]']] },
      { art: 'schneidekarten', auftrag: 'Streitfragen-Karten: Zieht eine Karte. Ist das eine Frage für Wissen, Meinung oder Glauben? Sprecht darüber mit den Hilfen aus dem Hörtext.', stufe: 3, neueSeite: true, titel: 'Was meinst du?', icon: 'messages', farbe: DILEMMA, spalten: 3,
        karten: [
          { text: 'Gibt es Leben auf anderen Planeten?' }, { text: 'Sind Hunde bessere Haustiere als Katzen?' }, { text: 'Gibt es Wunder?' },
          { text: 'Ist es schlimm zu lügen, um jemanden zu schützen?' }, { text: 'Wie alt ist das Weltall?' }, { text: 'Hat alles einen Sinn?' },
          { text: 'Ist Glück wichtiger als Geld?' }, { text: 'Können Tiere traurig sein?' }, { text: 'Gibt es ein Schicksal?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wähle eine Streitfrage von den Karten. Schreibe deine Sicht mit Begründung und eine andere Sicht, die du respektieren kannst.', stufe: 3,
        anfaenge: ['Meine Frage: …', 'Ich denke, …, weil …', 'Andere denken vielleicht …', 'Das kann ich verstehen, weil …'], zeilen: 8,
        beispiel: 'Meine Frage: Gibt es Leben auf anderen Planeten? Ich denke, ja, weil das Weltall so riesig ist, dass es irgendwo noch Leben geben muss. Andere denken vielleicht, dass die Erde einzigartig ist. Das kann ich verstehen, weil man bis heute noch kein Leben woanders gefunden hat. Wissen kann man es also noch nicht – vielleicht irgendwann.' },
    ],
    check: ['Ich unterscheide Wissen, Meinung und Glauben.', 'Ich erkläre die zwei Bedeutungen von „glauben“.', 'Ich rede respektvoll über Glaubensfragen.'],
  },
  // ================================================================ 8
  {
    thema: 'Religion und Naturwissenschaft · große Fragen', titel: 'Was kann ich wissen? Was darf ich hoffen?', untertitel: 'Die Naturwissenschaft fragt: Wie funktioniert die Welt? Religion und Philosophie fragen: Warum? Wozu? Du lernst zwei Forscher kennen, hörst ein Gespräch über Hoffnung und philosophierst mit Fragekarten.',
    ziel: { de: 'Ich unterscheide Fragen der Naturwissenschaft und große Lebensfragen und denke über Hoffnung nach.', fr: 'Je distingue les questions des sciences et les grandes questions de la vie et je réfléchis à l’espoir.' },
    bild: ['lina:ruhig:sitzen', 'tom:froh:stehen'],
    start: {
      was: 'Wie oder warum?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Kann die Naturwissenschaft diese Frage beantworten? Kreuze an.', stufe: 1, kopf: ['Frage', 'ja', 'eher nicht'], breiten: [64, 18, 18], zeilen: [['Wie entsteht ein Regenbogen?', '[x]', ''], ['Warum gibt es überhaupt etwas und nicht nichts?', '', '[x]'], ['Wie alt ist die Erde?', '[x]', ''], ['Wozu lebe ich?', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Streit oder Freundschaft?',
      absaetze: [
        '### Galileo Galilei',
        'Früher dachten die meisten Menschen, die Sonne dreht sich um die Erde. Im 17. Jahrhundert machte der italienische Forscher **Galileo Galilei** mit seinem Fernrohr Beobachtungen, die dafür sprachen, dass die Erde sich um die Sonne dreht. **1633** wurde er von einem Kirchengericht verurteilt: Er musste widerrufen und lebte bis zu seinem Tod unter Hausarrest. Erst **1992** gab ein Papst zu, dass die Kirche damals einen Fehler gemacht hatte.',
        '### Georges Lemaître',
        'Es gibt aber auch andere Geschichten. Der belgische Priester und Physiker **Georges Lemaître** zeigte 1927, dass sich das Weltall ausdehnt. 1931 schlug er vor, dass es einen Anfang hatte. Daraus wurde später die Theorie vom **Urknall**. Für ihn waren Glaube und Wissenschaft kein Widerspruch.',
        '### Zwei Arten von Fragen',
        'Die **Naturwissenschaft** fragt: **Wie** funktioniert die Welt? Sie misst, beobachtet und prüft. Religionen und Philosophie fragen oft: **Warum** gibt es die Welt? **Wozu** lebe ich? Viele Menschen sehen darin keinen Widerspruch. Andere finden, dass die Wissenschaft allein reicht. Beide Sichtweisen kann man respektieren.',
        '### Vier große Fragen',
        'Der Philosoph **Immanuel Kant** hat vor über 200 Jahren vier große Fragen gestellt: **Was kann ich wissen? Was soll ich tun? Was darf ich hoffen? Was ist der Mensch?** Bis heute denken Menschen darüber nach – in der Wissenschaft, in den Religionen und in der Philosophie.',
      ],
      woerter: [['das Fernrohr', 'la lunette astronomique'], ['die Beobachtung', 'l’observation'], ['lehren', 'enseigner'], ['sich ausdehnen', 's’étendre'], ['der Urknall', 'le big bang'], ['der Widerspruch', 'la contradiction'], ['die Philosophie', 'la philosophie'], ['hoffen', 'espérer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Galilei oder Lemaître? Kreuze an.', stufe: 1, kopf: ['', 'Galilei', 'Lemaître'], breiten: [64, 18, 18], zeilen: [['Er war Priester und Physiker.', '', '[x]'], ['Die Kirche verurteilte ihn 1633, weil er lehrte, dass die Erde sich um die Sonne dreht.', '[x]', ''], ['Er hatte die Idee, dass das Weltall einen Anfang hatte.', '', '[x]'], ['Er beobachtete den Himmel mit dem Fernrohr.', '[x]', '']] },
        { art: 'fragen', auftrag: 'Schreibe Kants vier große Fragen auf.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Was kann ich wissen? Was soll ich tun? Was darf ich hoffen? Was ist der Mensch?' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Jugendhaus · Philosophie-Abend', titel: 'Was darf ich hoffen?',
      situation: 'Im Jugendhaus gibt es einen Philosophie-Abend. Die Leiterin stellt eine von Kants Fragen.',
      bild: ['lina:ruhig:sitzen', 'tom:froh:sitzen'], sprecher: { Leiterin: 'w1', Lina: 'w3', Tom: 'm3' },
      text: [
        ['Leiterin', 'Heute fragen wir: Was darf ich hoffen? Lina, worauf hoffst du?'],
        ['Lina', 'Dass es irgendwann keinen Krieg mehr gibt. Ich weiß, das klingt naiv.'],
        ['Leiterin', 'Ist das ein Wunsch oder eine Hoffnung?'],
        ['Lina', 'Hm. Ein Wunsch ist, wenn ich etwas will. Hoffnung ist … wenn ich glaube, dass es gut werden kann, auch wenn ich es nicht sicher weiß.'],
        ['Tom', 'Ich hoffe, dass ich die Lehrstelle als Mechatroniker bekomme. Und dafür tue ich auch etwas. Ich übe für das Vorstellungsgespräch.'],
        ['Leiterin', 'Das ist ein wichtiger Gedanke: Hoffnung heißt nicht nur warten. Man kann selbst etwas dafür tun.'],
        ['Lina', 'Und wenn es nicht klappt?'],
        ['Leiterin', 'Dann ist Hoffnung die Kraft, es wieder zu versuchen. Viele Menschen finden diese Kraft im Glauben, andere bei Freunden, in der Natur oder in der Musik.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „naiv“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['zu einfach gedacht, ein bisschen unerfahren', 'sehr klug'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Worauf hoffen Lina und Tom?', stufe: 1, kopf: ['', 'Lina', 'Tom'], breiten: [24, 38, 38], zeilen: [['hofft auf …', '[dass es keinen Krieg mehr gibt]', '[die Lehrstelle als Mechatroniker]'], ['tut dafür …', '[nicht genannt]', '[übt für das Vorstellungsgespräch]']] },
        { art: 'fragen', auftrag: 'Was ist nach Lina der Unterschied zwischen Wunsch und Hoffnung?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wunsch: etwas wollen. Hoffnung: glauben, dass es gut werden kann, auch wenn man es nicht sicher weiß.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Woher bekommen Menschen Hoffnung? Sammelt.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Freunde', 'Glaube', 'Natur', 'Musik', 'gute Erfahrungen', 'Vorbilder'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zwei Arten von Fragen', punkte: ['**Naturwissenschaft**: **Wie** funktioniert die Welt?', '**Religion** und **Philosophie**: **Warum**? **Wozu**?', '**Galilei**: Streit mit der Kirche (1633)', '**Lemaître**: Priester und Forscher (Urknall)'] },
         { titel: 'Kants vier Fragen', nummern: true, punkte: ['Was kann ich **wissen**?', 'Was soll ich **tun**?', 'Was darf ich **hoffen**?', 'Was ist der **Mensch**?'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Philosophie-Runde: Setzt euch in einen Kreis. Zieht eine Karte und denkt laut nach. Es gibt keine falschen Antworten – aber gute Gründe. Schreibt eure wichtigste Idee auf die Karte.', stufe: 3, neueSeite: true, titel: 'Große Fragen', icon: 'bulb', farbe: GLAUBE, spalten: 3,
        karten: [
          { text: 'Was kann ich ganz sicher wissen?', linien: 2 }, { text: 'Kann die Wissenschaft alles erklären?', linien: 2 }, { text: 'Hat das Weltall einen Anfang?', linien: 2 },
          { text: 'Darf man alles erforschen, was möglich ist?', linien: 2 }, { text: 'Was macht dir Hoffnung?', linien: 2 }, { text: 'Was ist der Mensch?', linien: 2 },
          { text: 'Ist Hoffnung dasselbe wie Glauben?', linien: 2 }, { text: 'Gibt es Fragen, auf die es keine Antwort gibt?', linien: 2 }, { text: 'Was soll ich tun, damit die Welt besser wird?', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text: „Was darf ich hoffen?“ Worauf hoffst du (für dich, für andere oder für die Welt)? Was kannst du selbst dafür tun?', stufe: 3,
        anfaenge: ['Ich hoffe, dass …', 'Das ist mir wichtig, weil …', 'Ich kann selbst etwas dafür tun: …', 'Hoffnung gibt mir …'], zeilen: 8,
        beispiel: 'Ich hoffe, dass die Menschen besser auf die Natur aufpassen. Das ist mir wichtig, weil ich später auch noch im Wald spazieren gehen und im See schwimmen will. Ich kann selbst etwas dafür tun: mit dem Rad fahren, weniger wegwerfen und bei der Müllsammelaktion der Gemeinde mitmachen. Hoffnung gibt mir die Kraft, nicht aufzugeben, auch wenn die Nachrichten manchmal schlecht sind.' },
    ],
    check: ['Ich unterscheide Wie-Fragen und Warum-Fragen.', 'Ich erzähle von Galilei und Lemaître.', 'Ich nenne Kants vier Fragen und denke über Hoffnung nach.'],
  },
]
