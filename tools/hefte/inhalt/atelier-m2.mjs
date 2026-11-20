// Atelier · Modul 2 (7P) „Küche und Hygiene“ – Enseignement pratique (Atelier Cuisine), Voie de préparation.
// Leitfaden VP: „Sait lire une fiche technique“ → „sait lire une recette de crêpes“; „Entretient et range le matériel“ →
// „fait la vaisselle convenablement et range les aliments correctement emballés aux endroits adéquats“.
// Multimodal: Rezept zum Mithören (Hände im Teig), Kühlschrank zum Beschriften, Mengen umrechnen, Küchen-Ämter.
// Allergien und Essgewohnheiten werden respektiert; keine Fragen nach dem eigenen Geld oder der eigenen Familie.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { kuehlschrank } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 2, {
  titel: 'Küche und Hygiene',
  titelFr: 'Cuisine et hygiène',
  unter: 'Sauber arbeiten, richtig abmessen, ein Rezept lesen, sicher schneiden, gemeinsam kochen – und am Ende spülen, Lebensmittel richtig lagern und aufräumen.',
  unterFr: 'Hygiène, mesurer, lire une recette, couper en sécurité, cuisiner ensemble, ranger.',
  farbe: '#c0503a',
  deckbild: ['sami:froh:stehen', 'amira:froh:stehen-zeigen', 'ben:froh:tasse'],
  blasen: [{ t: 'Hände waschen!', x: 8, y: 104 }, { t: 'Wie viel Mehl?', x: 120, y: 92 }, { t: 'Krallengriff!', x: 168, y: 150 }],
  aussprache: { 'Crêpes': 'Kräpps', 'Crêpe': 'Kräpp', ' \\((EL|TL)\\)': '', '\\bEL\\b': 'Esslöffel', '\\bTL\\b': 'Teelöffel', '(\\d) g\\b': '\\1 Gramm', '(\\d) ml\\b': '\\1 Milliliter', '(\\d) l\\b': '\\1 Liter', '(\\d) kg\\b': '\\1 Kilogramm' },
  themen: [
    { titel: { de: 'Sauber und genau', fr: 'Propre et précis' }, icon: 'droplet', lektionen: 2 },
    { titel: { de: 'Kochen', fr: 'Cuisiner' }, icon: 'chef-hat', lektionen: 3 },
    { titel: { de: 'Aufräumen', fr: 'Ranger' }, icon: 'bucket', lektionen: 1 },
  ],
})

const KUECHE = '#c0503a', IDEE = '#2f8a6b', DILEMMA = '#6d4bc4'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Hygiene in der Küche', titel: 'Sauber ist sicher', untertitel: 'Unsichtbare Keime können krank machen. Du lernst, wie man in der Küche hygienisch arbeitet, hörst eine Köchin aus der Kantine und findest Fehler auf Hygiene-Karten.',
    ziel: { de: 'Ich arbeite in der Küche hygienisch und erkläre, warum das wichtig ist.', fr: 'Je travaille de façon hygiénique en cuisine et j’explique pourquoi c’est important.' },
    bild: ['sami:froh:stehen', 'verkaeuferin:froh:stehen'],
    start: {
      was: 'Hygiene-Check',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Hygienisch oder nicht? Kreuze an.', stufe: 1, kopf: ['', 'hygienisch', 'nicht hygienisch'], breiten: [60, 20, 20], zeilen: [['vor dem Kochen Hände waschen', '[x]', ''], ['mit langen offenen Haaren kochen', '', '[x]'], ['rohes Fleisch und Salat auf demselben Brett schneiden', '', '[x]'], ['eine Wunde mit einem Pflaster und Handschuh abdecken', '[x]', ''], ['den Löffel ablecken und wieder in den Topf tun', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Regeln', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Küchenhygiene (vereinfacht)', titel: 'Die Hygieneregeln der Küche',
      absaetze: [
        'Auf Händen, Brettern und Lebensmitteln leben winzige **Keime**: Bakterien und Viren. Die meisten sind harmlos, manche machen krank – zum Beispiel mit Bauchschmerzen und Durchfall. Darum gelten in jeder Küche strenge Regeln.',
        '### Ich selbst',
        '**Hände waschen** mit Seife, mindestens 20 Sekunden: vor dem Kochen, nach dem Toilettengang, nach rohem Fleisch, Eiern oder dem Müll. Lange Haare zusammenbinden, Schmuck ab, saubere Schürze. Kleine Wunden mit Pflaster und Handschuh abdecken. Wer krank ist, kocht nicht für andere.',
        '### Die Lebensmittel',
        '**Rohes Fleisch, Fisch und Eier** nie mit Lebensmitteln zusammenbringen, die roh gegessen werden, wie Salat oder Obst: eigenes Brett, eigenes Messer. Gekühlte Lebensmittel bleiben im **Kühlschrank**, bis man sie braucht.',
        '### Beim Kochen',
        'Zum Probieren einen **sauberen Löffel** nehmen – einmal benutzen, dann in die Spüle. Arbeitsflächen zwischendurch abwischen. Lappen und Geschirrtücher regelmäßig wechseln.',
      ],
      woerter: [['die Hygiene', 'l’hygiène'], ['der Keim', 'le germe'], ['die Bakterie', 'la bactérie'], ['harmlos', 'inoffensif'], ['der Durchfall', 'la diarrhée'], ['roh', 'cru'], ['die Arbeitsfläche', 'le plan de travail'], ['das Geschirrtuch', 'le torchon']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wann muss man Hände waschen? Und warum? Verbinde.', stufe: 2, links: ['nach dem Toilettengang', 'nach rohem Hähnchen', 'nach dem Müll', 'vor dem Kochen'], rechts: ['Keime aus dem Darm', 'Keime aus rohem Fleisch', 'Schmutz und Keime vom Abfall', 'damit keine Keime ins Essen kommen'] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulkantine', titel: 'Die Köchin erklärt',
      situation: 'Sami interviewt Frau Becker, die Chefköchin der Schulkantine. Sie kocht jeden Tag für 400 Schülerinnen und Schüler.',
      bild: ['sami:froh:handy', 'verkaeuferin:froh:stehen'], sprecher: { Sami: 'm3', 'Frau Becker': 'w1' },
      text: [
        ['Sami', 'Frau Becker, Sie kochen für 400 Leute. Was ist das Wichtigste?'],
        ['Frau Becker', 'Hygiene. Wenn ich einen Fehler mache, werden nicht eine, sondern vielleicht hundert Personen krank.'],
        ['Sami', 'Was machen Sie konkret?'],
        ['Frau Becker', 'Wir haben farbige Schneidebretter: rot für rohes Fleisch, grün für Gemüse, blau für Fisch. So kann man sie nicht verwechseln. Und jeden Morgen messen wir die Temperatur im Kühlraum und schreiben sie auf.'],
        ['Sami', 'Und wenn jemand krank ist?'],
        ['Frau Becker', 'Dann bleibt er zu Hause. Bei Bauchgrippe darf man nicht in der Küche arbeiten. Das ist sogar Pflicht.'],
        ['Sami', 'Was nervt Sie am meisten?'],
        ['Frau Becker', 'Wenn jemand mit dem Handy in der Hand kocht. Das Handy ist schmutziger als eine Türklinke! Handy in den Spind, Hände waschen, dann kochen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Kühlraum? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein großer, kalter Raum für Lebensmittel', 'ein Raum zum Ausruhen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Farbe hat welches Brett?', stufe: 1, kopf: ['Farbe', 'für …'], breiten: [30, 70], zeilen: [['rot', '[rohes Fleisch]'], ['grün', '[Gemüse]'], ['blau', '[Fisch]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Temperatur im Kühlraum wird jeden Morgen gemessen.', true], ['Mit Bauchgrippe darf man in der Küche arbeiten, wenn man vorsichtig ist.', false], ['Frau Becker findet, das Handy ist sauberer als eine Türklinke.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum ist Hygiene in einer großen Küche noch wichtiger als zu Hause?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Weil viel mehr …', 'Wenn ein Fehler passiert, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ich selbst', punkte: ['**Hände waschen**: Seife, mindestens 20 Sekunden', 'Haare **zusammen**, Schmuck **ab**, saubere **Schürze**', 'Wunden **abdecken**', 'krank? **nicht** für andere kochen'] },
         { titel: 'Lebensmittel und Arbeit', punkte: ['**roh** (Fleisch, Fisch, Eier) und **fertig zum Essen** (Salat, Brot, Obst) trennen', 'eigenes **Brett**, eigenes **Messer**', 'Probierlöffel nur **einmal**', 'Flächen **abwischen**, Handy **weg**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Hygiene-Detektiv: Zieht eine Karte. Was ist falsch? Wie geht es richtig?', stufe: 2, neueSeite: true, titel: 'Hygiene-Fehler?', icon: 'droplet', farbe: KUECHE, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Ben schneidet das rohe Hähnchen und danach mit demselben Messer die Tomaten für den Salat.' },
          { text: 'Lina niest in die Hand und knetet dann weiter den Teig.' },
          { text: 'Noah lässt die Butter und die Milch während der ganzen Stunde auf dem Tisch stehen.' },
          { text: 'Amira hat sich in den Finger geschnitten und kocht ohne Pflaster weiter.' },
          { text: 'Sami probiert die Soße und steckt denselben Löffel wieder in den Topf.' },
          { text: 'Lea scrollt beim Kochen auf ihrem Handy nach dem Rezept und rührt dann im Teig.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Hygiene-Plakat für die Schulküche mit den fünf wichtigsten Regeln.', stufe: 2,
        anfaenge: ['Überschrift: …', '1. …', '2. …', '3. …', '4. …', '5. …'], zeilen: 7,
        beispiel: 'Überschrift: Sauber kochen – gesund essen! 1. Hände 20 Sekunden mit Seife waschen. 2. Haare zusammen, Schmuck ab. 3. Rohes Fleisch nur auf dem roten Brett. 4. Probierlöffel nur einmal benutzen. 5. Handy in den Spind.' },
    ],
    check: ['Ich wasche meine Hände richtig und zur richtigen Zeit.', 'Ich trenne rohe Lebensmittel von Lebensmitteln, die man so isst.', 'Ich erkläre, warum Hygiene wichtig ist.'],
  },
  // ================================================================ 2
  {
    thema: 'Abmessen · Mengen umrechnen', titel: 'Wie viel ist eine Prise?', untertitel: 'Gramm, Milliliter, Esslöffel: In der Küche muss man genau abmessen. Du lernst Messgeräte kennen, rechnest Mengen für mehr oder weniger Personen um und hörst, wie ein Kuchen schiefging.',
    ziel: { de: 'Ich messe Zutaten genau ab und rechne Rezepte für mehr oder weniger Personen um.', fr: 'Je mesure les ingrédients avec précision et j’adapte une recette au nombre de personnes.' },
    bild: ['lina:froh:stehen', 'ben:verwirrt:stehen'],
    start: {
      was: 'Schätzfrage',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viel wiegt ungefähr ein Liter Wasser? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['100 g', '1 kg', '10 kg'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Küchenwissen (vereinfacht)', titel: 'Messen in der Küche',
      absaetze: [
        '### Wiegen',
        'Feste Zutaten wie Mehl, Zucker oder Butter **wiegt** man mit der **Küchenwaage**: in **Gramm** und **Kilogramm**. 1 kg sind 1000 g. Tipp: Zuerst die leere Schüssel auf die Waage stellen und auf **null** stellen (Taste „Tara“). Dann die Zutat hinein.',
        '### Flüssigkeiten',
        'Milch, Wasser oder Öl misst man mit dem **Messbecher**: in **Millilitern** und **Litern**. 1 l sind 1000 ml. Den Becher auf den Tisch stellen und **auf Augenhöhe** ablesen.',
        '### Löffel und Prise',
        '**1 Esslöffel (EL)** sind etwa 15 ml, **1 Teelöffel (TL)** etwa 5 ml. Gemeint ist meist ein **gestrichener** Löffel: oben glatt. Eine **Prise** Salz ist so viel, wie man zwischen Daumen und Zeigefinger nehmen kann.',
        '### Umrechnen',
        'Ein Rezept ist für 4 Personen, ihr seid aber 8? Dann **verdoppelt** ihr alle Mengen. Für 2 Personen **halbiert** ihr sie.',
      ],
      woerter: [['wiegen', 'peser'], ['die Waage', 'la balance'], ['das Gramm', 'le gramme'], ['der Messbecher', 'le verre doseur'], ['der Esslöffel', 'la cuillère à soupe'], ['der Teelöffel', 'la cuillère à café'], ['gestrichen', 'rase'], ['die Prise', 'la pincée']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Womit misst man das? Verbinde.', stufe: 1, links: ['250 g Mehl', '500 ml Milch', '1 TL Backpulver', 'eine Prise Salz'], rechts: ['Küchenwaage', 'Messbecher', 'Teelöffel', 'Daumen und Zeigefinger'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Lehrküche', titel: 'Der Kuchen, der nicht aufging',
      situation: 'Ben hat einen Kuchen gebacken. Er ist flach und hart. Lina hilft ihm herauszufinden, was schiefging.',
      bild: ['ben:enttaeuscht:stehen', 'lina:froh:erklaeren'], sprecher: { Ben: 'm3', Lina: 'w3' },
      text: [
        ['Ben', 'Schau mal, mein Kuchen. Flach wie eine Pizza und hart wie ein Stein.'],
        ['Lina', 'Zeig mir das Rezept. Hier steht: 1 Päckchen Backpulver. Hast du das reingetan?'],
        ['Ben', 'Ja, einen Teelöffel. Ich dachte, das reicht.'],
        ['Lina', 'Ein Päckchen sind ungefähr drei Teelöffel. Ohne genug Backpulver geht der Teig nicht auf.'],
        ['Ben', 'Und das Mehl? Ich habe 500 Gramm gewogen.'],
        ['Lina', 'Hast du die Schüssel vorher auf null gestellt?'],
        ['Ben', 'Äh … nein. Die Schüssel wiegt bestimmt 300 Gramm.'],
        ['Lina', 'Dann hattest du nur 200 Gramm Mehl. Kein Wunder. Beim Backen muss man genau sein. Beim Kochen kann man mehr ausprobieren, beim Backen nicht.'],
        ['Ben', 'Okay. Nächstes Mal: Tara drücken und das Rezept genau lesen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht Backpulver? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es lässt den Teig aufgehen.', 'Es macht den Teig süß.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie viel Backpulver hat Ben genommen? Wie viel wäre richtig?', zeilen: 2, l: 'einen Teelöffel; richtig wäre ein Päckchen (etwa drei Teelöffel)' }, { f: 'Wie viel Mehl war wirklich im Teig? Warum?', zeilen: 2, l: 'nur 200 g, weil er die Schüssel (300 g) nicht auf null gestellt hat' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Lina sagt: „Beim Kochen kann man mehr ausprobieren, beim Backen nicht.“ Was meint sie damit?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, beim Backen …', 'Beim Kochen kann man …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Messen', punkte: ['**Waage**: g und kg (1 kg = 1000 g) – vorher **Tara**', '**Messbecher**: ml und l (1 l = 1000 ml) – auf **Augenhöhe**', '**1 EL** ≈ 15 ml · **1 TL** ≈ 5 ml (gestrichen)', '**Prise**: zwischen Daumen und Zeigefinger'] },
         { titel: 'Umrechnen', punkte: ['doppelt so viele Personen: **mal 2**', 'halb so viele: **geteilt durch 2**', 'beim **Backen** besonders genau sein'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Ein Rezept für Crêpes ist für 4 Personen. Rechne für 2 und für 8 Personen um.', stufe: 2, kopf: ['Zutat', 'für 4', 'für 2', 'für 8'], breiten: [34, 22, 22, 22], zeilen: [['Mehl', '250 g', '[125 g]', '[500 g]'], ['Milch', '500 ml', '[250 ml]', '[1 l]'], ['Eier', '4', '[2]', '[8]'], ['Öl', '2 EL', '[1 EL]', '[4 EL]'], ['Salz', '1 Prise', '[1 Prise]', '[2 Prisen]']] },
      { art: 'rechnen', auftrag: 'Rechne um.', stufe: 1, spalten: 3, items: [{ a: '1,5 kg = … g', l: '1500 g' }, { a: '750 ml = … l', l: '0,75 l' }, { a: '3 EL = … ml', l: '45 ml' }, { a: '2 TL = … ml', l: '10 ml' }, { a: '0,25 l = … ml', l: '250 ml' }, { a: '2000 g = … kg', l: '2 kg' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Ein Freund will zum ersten Mal backen. Schreibe ihm drei Tipps zum Abmessen.', stufe: 2,
        anfaenge: ['Tipp 1: …', 'Tipp 2: …', 'Tipp 3: …', 'Und vergiss nicht: …'], zeilen: 6,
        beispiel: 'Tipp 1: Stell die leere Schüssel auf die Waage und drück auf Tara, bevor du das Mehl hineinschüttest. Tipp 2: Lies den Messbecher auf Augenhöhe ab. Tipp 3: Ein Löffel im Rezept ist gestrichen, nicht gehäuft. Und vergiss nicht: Beim Backen immer genau nach Rezept arbeiten.' },
    ],
    check: ['Ich wiege mit Tara und messe auf Augenhöhe.', 'Ich kenne EL, TL und Prise.', 'Ich rechne Mengen um.'],
  },
  // ================================================================ 3
  {
    thema: 'Ein Rezept lesen · Crêpes', titel: 'Das Rezept als Anleitung', untertitel: 'Ein Rezept ist eine Fiche technique für die Küche. Du liest und hörst Schritt für Schritt das Rezept für Crêpes, planst die Arbeit in der Gruppe und backst sie.',
    ziel: { de: 'Ich lese ein Rezept und arbeite Schritt für Schritt danach.', fr: 'Je lis une recette et je travaille étape par étape.' },
    bild: ['amira:froh:stehen-zeigen', 'noah:froh:tasse'],
    start: {
      was: 'Lieblingsessen',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was isst du gern auf einer Crêpe? Sammle drei Ideen – süß oder salzig.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Zucker und Zitrone, Apfelmus, Schokocreme, Käse und Schinken, Spinat' }] },
      ],
    },
    lesen: {
      was: 'Ein Rezept', art: 'anleitung', stimme: 'w1',
      quelle: 'Rezept für 4 Personen (etwa 10 Crêpes)', titel: 'Crêpes',
      material: ['250 g Mehl', '500 ml Milch', '4 Eier', '1 Prise Salz', '2 EL Öl', 'Schüssel, Schneebesen, Kelle, Pfanne, Pfannenwender'],
      schritte: [
        { icon: 'droplet', text: '**Vorbereiten:** Hände waschen, Haare zusammenbinden, alle Zutaten und Geräte bereitstellen.' },
        { icon: 'egg', text: '**Teig rühren:** Mehl und Salz in die Schüssel. Eier und die Hälfte der Milch dazu, glatt rühren. Dann Rest der Milch und Öl unterrühren.' },
        { icon: 'clock', text: '**Ruhen lassen:** Den Teig etwa **30 Minuten** stehen lassen. In der Zeit den Tisch decken.' },
        { icon: 'flame', text: '**Backen:** Pfanne bei mittlerer Hitze erhitzen, wenig Öl hinein. Eine halbe Kelle Teig hineingeben und die Pfanne schwenken.' },
        { icon: 'rotate', text: '**Wenden:** Ist der Rand goldbraun (nach etwa 1 Minute), die Crêpe umdrehen und noch 30 Sekunden backen.' },
        { icon: 'tools-kitchen-2', text: '**Füllen und servieren:** Füllen, falten und warm essen. Nach dem Backen den Herd ausschalten!' },
      ],
      danach: ['Achtung Allergien: In Crêpes sind **Ei**, **Milch** und **Weizen (Gluten)**. Fragt vorher, ob jemand etwas davon nicht essen darf.'],
      woerter: [['das Rezept', 'la recette'], ['der Teig', 'la pâte'], ['der Schneebesen', 'le fouet'], ['die Schöpfkelle', 'la louche'], ['die Pfanne', 'la poêle'], ['der Pfannenwender', 'la spatule'], ['wenden', 'retourner'], ['die Allergie', 'l’allergie']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Lies das Rezept und antworte.', stufe: 1, fragen: [{ f: 'Wie lange muss der Teig ruhen?', l: 'etwa 30 Minuten' }, { f: 'Wann wendet man die Crêpe?', l: 'wenn der Rand goldbraun ist, nach etwa 1 Minute' }, { f: 'Welche Allergene sind in Crêpes?', l: 'Ei, Milch, Weizen (Gluten)' }] },
        { art: 'ordnen', auftrag: 'Ordne die Schritte.', stufe: 1, teile: ['Hände waschen, alles bereitstellen', 'Teig rühren', 'Teig ruhen lassen', 'Teig in die heiße Pfanne geben', 'wenden', 'füllen und servieren'], ordnung: [3, 5, 0, 2, 4, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Lehrküche · Gruppe 2', titel: 'Wer macht was?',
      situation: 'Amira, Noah und Lina sollen in 90 Minuten Crêpes für die Gruppe backen. Sie verteilen die Aufgaben.',
      bild: ['amira:froh:erklaeren', 'noah:froh:stehen'], sprecher: { Amira: 'w2', Noah: 'm3', Lina: 'w3' },
      text: [
        ['Amira', 'Okay, wir haben 90 Minuten. Der Teig muss 30 Minuten ruhen. Also zuerst der Teig!'],
        ['Noah', 'Ich rühre den Teig. Ich lese aber vorher das ganze Rezept einmal.'],
        ['Lina', 'Dann schneide ich in der Ruhezeit Äpfel für die Füllung und mache Apfelmus. Und ich decke den Tisch.'],
        ['Amira', 'Ich backe. Aber Achtung: Tom hat eine Eier-Allergie. Für ihn machen wir einen eigenen Teig ohne Ei, mit sauberer Schüssel und eigenem Schneebesen. Seine Crêpes backen wir zuerst, in der sauberen Pfanne.'],
        ['Noah', 'Gut, dass du dran denkst. Wer spült?'],
        ['Lina', 'Alle zusammen am Ende. Und wer gerade nichts zu tun hat, spült schon zwischendurch.'],
        ['Amira', 'Super. Dann haben wir am Ende keinen Berg Geschirr. Los geht’s!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „zwischendurch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['in einer kleinen Pause, während man noch arbeitet', 'erst ganz am Ende'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer macht was?', stufe: 1, kopf: ['Person', 'Aufgabe'], breiten: [25, 75], zeilen: [['Noah', '[Teig rühren (vorher das ganze Rezept lesen)]'], ['Lina', '[Äpfel schneiden, Apfelmus machen, Tisch decken]'], ['Amira', '[backen; eigener Teig ohne Ei für Tom, seine Crêpes zuerst]'], ['alle', '[spülen – zwischendurch und am Ende]']] },
        { art: 'fragen', auftrag: 'Warum macht die Gruppe zuerst den Teig?', stufe: 2, fragen: [{ f: '', l: 'Weil er 30 Minuten ruhen muss; in der Zeit können sie anderes vorbereiten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant in eurer Gruppe: Wer macht was? In welcher Reihenfolge?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Zuerst müssen wir …', 'Ich übernehme …', 'Wer hat eine Allergie?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ein Rezept hat …', punkte: ['**Zutaten** mit Mengen', '**Geräte**', '**Schritte** in der richtigen Reihenfolge', 'oft **Zeiten** und **Hinweise** (z. B. Allergene)'] },
         { titel: 'Gut planen', punkte: ['Rezept **ganz** lesen', 'Was **dauert** lange? → zuerst', '**Aufgaben** verteilen', '**Allergien** beachten', '**zwischendurch** spülen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Zeitplan-Karten: Schneidet die Karten aus. Legt sie auf einen Zeitstrahl von 0 bis 90 Minuten. Was kann gleichzeitig passieren?', stufe: 3, neueSeite: true, titel: 'Unser Zeitplan', icon: 'clock', farbe: IDEE, spalten: 3,
        karten: [
          { text: 'Hände waschen, bereitstellen (5 min)' }, { text: 'Teig rühren (10 min)' }, { text: 'Teig ruhen lassen (30 min)' },
          { text: 'Äpfel schneiden, Apfelmus kochen (20 min)' }, { text: 'Tisch decken (10 min)' }, { text: 'Crêpes backen (20 min)' },
          { text: 'gemeinsam essen (15 min)' }, { text: 'spülen und aufräumen (10 min)' }, { text: '**Unsere Idee:**', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe das Rezept für ein einfaches Gericht, das du kennst (zum Beispiel Obstsalat, Rührei, Nudeln mit Tomatensoße). Achte auf Zutaten, Mengen und Schritte.', stufe: 3,
        anfaenge: ['Rezept: …', 'Für … Personen', 'Zutaten: …', 'Schritt 1: …', 'Schritt 2: …', 'Hinweis: …'], zeilen: 8,
        beispiel: 'Rezept: Obstsalat. Für 4 Personen. Zutaten: 2 Äpfel, 2 Bananen, 1 Orange, 200 g Trauben, 1 EL Zitronensaft. Schritt 1: Obst waschen. Schritt 2: Äpfel und Bananen in kleine Stücke schneiden, Orange schälen und teilen, Trauben halbieren. Schritt 3: Alles in eine Schüssel geben und mit Zitronensaft mischen. Hinweis: Der Zitronensaft verhindert, dass die Äpfel braun werden.' },
    ],
    check: ['Ich lese ein Rezept ganz, bevor ich anfange.', 'Ich plane die Arbeit in der Gruppe.', 'Ich achte auf Allergien.'],
  },
  // ================================================================ 4
  {
    thema: 'Sicher schneiden · Messer', titel: 'Krallengriff und Brücke', untertitel: 'Messer sind in der Küche die häufigste Ursache für Verletzungen. Du lernst, wie man sicher schneidet, hörst eine Anleitung, während du übst, und prüfst dich mit Messer-Regel-Karten.',
    ziel: { de: 'Ich schneide sicher mit Krallengriff und Brückengriff.', fr: 'Je coupe en sécurité avec la prise en griffe et en pont.' },
    bild: ['lehrerin:froh:zeigen', 'ben:froh:stehen'],
    start: {
      was: 'Vorsicht, scharf!',
      aufgaben: [
        { art: 'mc', auftrag: 'Welches Messer ist gefährlicher? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein scharfes Messer', 'ein stumpfes Messer'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Anleitung – üben unter Aufsicht', titel: 'So schneidest du sicher',
      material: ['Schneidebrett', 'feuchtes Tuch', 'scharfes Gemüsemesser', 'Gemüse'],
      schritte: [
        { icon: 'square', text: '**Brett festlegen:** Lege ein feuchtes Tuch unter das Schneidebrett. So rutscht es nicht weg.' },
        { icon: 'carrot', text: '**Flache Seite nach unten:** Rundes Gemüse zuerst halbieren und mit der flachen Seite auf das Brett legen. So rollt es nicht weg.' },
        { icon: 'hand-stop', text: '**Brückengriff:** Zum Halbieren halte das Gemüse mit Daumen und Fingern wie eine **Brücke**. Das Messer geht unter der Brücke durch.' },
        { icon: 'hand-finger', text: '**Krallengriff:** Für Scheiben die Fingerspitzen nach innen biegen wie eine **Kralle**. Die Fingerknöchel führen das Messer, der Daumen bleibt dahinter.' },
        { icon: 'arrows-down-up', text: '**Ruhig schneiden:** Messer vor und zurück bewegen, nicht hacken. Beim Schneiden hinschauen, nicht reden.' },
        { icon: 'tools-kitchen-2', text: '**Ablegen und weitergeben:** Das Messer flach oben auf das Brett legen, Schneide vom Körper weg. Nie in die Spüle unter Wasser legen. Weitergeben mit dem **Griff zuerst**.' },
      ],
      danach: ['Ein scharfes Messer ist **sicherer** als ein stumpfes: Es rutscht seltener ab. Fällt ein Messer herunter: **zurücktreten**, nicht auffangen! Bei einer Schnittwunde: ausspülen, Pflaster, Bescheid sagen.'],
      woerter: [['das Messer', 'le couteau'], ['das Schneidebrett', 'la planche à découper'], ['die Kralle', 'la griffe'], ['die Brücke', 'le pont'], ['der Fingerknöchel', 'la jointure (des doigts)'], ['die Schneide', 'le tranchant'], ['stumpf', 'émoussé'], ['abrutschen', 'glisser']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Griff wofür? Verbinde.', stufe: 1, links: ['Brückengriff', 'Krallengriff'], rechts: ['ein Gemüse halbieren', 'Gemüse in Scheiben schneiden'] },
        { art: 'fragen', auftrag: 'Warum ist ein scharfes Messer sicherer als ein stumpfes?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Man braucht weniger Kraft und rutscht seltener ab.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Anleitung zum Mitmachen', wo: 'Lehrküche · Messer-Training', titel: 'Hör zu und schneide mit',
      situation: 'Frau Hoss leitet ein Messer-Training. Lege dein Brett, die Gurke und das Messer bereit – und mach mit.',
      bild: ['lehrerin:froh:zeigen', 'ben:froh:stehen'], sprecher: { 'Frau Hoss': 'w1' },
      text: [
        ['Frau Hoss', 'Leg das feuchte Tuch unter das Brett. Drück auf das Brett: Rutscht es? Nein? Gut.'],
        ['Frau Hoss', 'Nimm die Gurke. Wir halbieren sie der Länge nach. Brückengriff: Daumen auf der einen Seite, Finger auf der anderen. Das Messer geht unter der Brücke durch. Langsam.'],
        ['Frau Hoss', 'Leg beide Hälften mit der flachen Seite nach unten. Jetzt der Krallengriff: Fingerspitzen einrollen. Die Knöchel berühren die Seite der Klinge.'],
        ['Frau Hoss', 'Schneide fünf Scheiben. Vor und zurück. Nach jeder Scheibe rutscht die Kralle ein kleines Stück nach hinten.'],
        ['Frau Hoss', 'Stopp. Schau auf deinen Daumen. Ist er hinter den Fingern? Gut.'],
        ['Frau Hoss', 'Noch fünf Scheiben – diesmal etwas schneller, aber nur so schnell, wie es sicher geht.'],
        ['Frau Hoss', 'Leg das Messer flach oben auf das Brett, Schneide weg von dir. Super. Das war dein erstes Messer-Training.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Klinge? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der scharfe Teil des Messers aus Metall', 'der Griff'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Was macht man in welcher Reihenfolge?', stufe: 1, teile: ['feuchtes Tuch unter das Brett', 'Gurke im Brückengriff halbieren', 'Hälften mit der flachen Seite nach unten legen', 'im Krallengriff Scheiben schneiden', 'Messer flach oben auf das Brett legen'], ordnung: [2, 4, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was war für euch beim Messer-Training schwer? Was hat geholfen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Schwer war …', 'Geholfen hat mir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Sicher schneiden', punkte: ['Brett mit **feuchtem Tuch** festlegen', '**flache Seite** nach unten', '**Brückengriff** zum Halbieren', '**Krallengriff** für Scheiben', 'erst **hinschauen**, dann schneiden'] },
         { titel: 'Messer-Regeln', punkte: ['**scharf** ist sicherer als stumpf', '**flach** auf das Brett, Schneide weg', '**nie** unter Wasser in die Spüle', 'weitergeben mit dem **Griff zuerst**', 'fällt ein Messer: **zurücktreten**, nicht auffangen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Messer-Quiz: Zieht eine Karte und lest sie vor. Richtig oder falsch? Begründet. (Lösung: Lehrperson)', stufe: 2, neueSeite: true, titel: 'Richtig oder falsch?', icon: 'tools-kitchen-2', farbe: KUECHE, spalten: 2,
        karten: [
          { text: 'Ein Messer gibt man mit der Spitze zuerst weiter.', frage: 'R / F – weil …' },
          { text: 'Beim Krallengriff ist der Daumen hinter den Fingern.', frage: 'R / F – weil …' },
          { text: 'Ein Messer kann man zum Spülen ins Wasser legen.', frage: 'R / F – weil …' },
          { text: 'Eine Zwiebel schneidet man zuerst in der Mitte durch.', frage: 'R / F – weil …' },
          { text: 'Fällt ein Messer herunter, fängt man es schnell auf.', frage: 'R / F – weil …' },
          { text: 'Ein feuchtes Tuch unter dem Brett verhindert Rutschen.', frage: 'R / F – weil …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem jüngeren Kind den Krallengriff – so einfach wie möglich. Du darfst auch eine Skizze machen.', stufe: 2,
        anfaenge: ['Stell dir vor, deine Hand ist …', 'Die Fingerspitzen …', 'Der Daumen …', 'So kann …'], zeilen: 6,
        beispiel: 'Stell dir vor, deine Hand ist eine Katzenpfote. Die Fingerspitzen rollst du ein, wie Krallen, die sich verstecken. Der Daumen versteckt sich hinter den Fingern. Das Messer gleitet an deinen Fingerknöcheln entlang. So kann das Messer deine Finger nicht treffen.' },
    ],
    check: ['Ich lege das Brett rutschfest hin.', 'Ich schneide mit Brücken- und Krallengriff.', 'Ich kenne die Messer-Regeln.'],
  },
  // ================================================================ 5
  {
    thema: 'Gemeinsam kochen · Tischkultur', titel: 'Gemeinsam am Tisch', untertitel: 'Kochen ist Teamarbeit, Essen ist Gemeinschaft. Du deckst einen Tisch richtig, lernst etwas über Essgewohnheiten anderer Kulturen und bewertest euer gemeinsames Essen.',
    ziel: { de: 'Ich decke einen Tisch und esse respektvoll gemeinsam mit anderen.', fr: 'Je mets la table et je mange avec les autres de façon respectueuse.' },
    bild: ['yusuf:froh:stehen', 'mia:froh:tasse'],
    start: {
      was: 'Tisch decken',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo liegt beim Tischdecken in Luxemburg die Gabel? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['links vom Teller', 'rechts vom Teller', 'auf dem Teller'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Essen verbindet',
      absaetze: [
        '### Den Tisch decken',
        'Der **Teller** steht in der Mitte vor dem Stuhl. Die **Gabel** liegt **links**, das **Messer rechts** mit der Schneide zum Teller. Der **Löffel** für die Suppe liegt rechts neben dem Messer, der **Dessertlöffel** oben über dem Teller. Das **Glas** steht oben rechts. Die **Serviette** liegt links neben der Gabel oder auf dem Teller.',
        '### Andere Länder, andere Sitten',
        'In vielen Ländern isst man mit Messer und Gabel. In China, Japan oder Korea benutzt man oft **Stäbchen**. In Indien, Äthiopien und vielen arabischen Ländern isst man bei manchen Gerichten mit der **rechten Hand** oder mit Brot. Keine Art ist „besser“ – jede ist eine Tradition.',
        '### Rücksicht am Tisch',
        'Manche Menschen essen **kein Schweinefleisch**, zum Beispiel aus religiösen Gründen. Manche essen **vegetarisch** oder **vegan**. Andere haben **Allergien**. Darum fragt man vor dem Kochen, was alle essen können. Am Tisch wartet man, bis alle etwas haben, redet freundlich und legt das Handy weg.',
      ],
      woerter: [['den Tisch decken', 'mettre la table'], ['der Teller', 'l’assiette'], ['die Gabel', 'la fourchette'], ['der Löffel', 'la cuillère'], ['die Serviette', 'la serviette'], ['die Stäbchen', 'les baguettes'], ['vegetarisch', 'végétarien'], ['die Rücksicht', 'le respect, la considération']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wo liegt was? Kreuze an.', stufe: 1, kopf: ['', 'links', 'rechts', 'oben'], breiten: [52, 16, 16, 16], zeilen: [['Gabel', '[x]', '', ''], ['Messer', '', '[x]', ''], ['Suppenlöffel', '', '[x]', ''], ['Dessertlöffel', '', '', '[x]'], ['Glas', '', '', '[x]']] },
        { art: 'fragen', auftrag: 'Warum fragt man vor dem Kochen, was alle essen können?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil manche aus religiösen Gründen kein Schweinefleisch essen, manche vegetarisch oder vegan leben oder Allergien haben.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Lehrküche · Essen', titel: 'Bei uns isst man so',
      situation: 'Die Gruppe hat ein Buffet mit Gerichten aus verschiedenen Ländern gekocht. Yusuf und Mia erzählen.',
      bild: ['yusuf:froh:stehen', 'mia:froh:tasse'], sprecher: { Mia: 'w3', Yusuf: 'm3' },
      text: [
        ['Mia', 'Yusuf, was ist das? Das sieht lecker aus.'],
        ['Yusuf', 'Das ist Linsensuppe, so wie meine Tante sie macht. Mit Kreuzkümmel und Zitrone. Probier mal!'],
        ['Mia', 'Mmh, die ist gut. Und du isst die Bällchen mit den Fingern?'],
        ['Yusuf', 'Ja, das sind Falafel. Die isst man oft mit Brot und den Fingern. Aber mit Gabel geht auch.'],
        ['Mia', 'Bei meiner Oma gibt es sonntags Bouneschlupp. Die hab ich heute auch gemacht – ohne Speck, damit alle sie essen können.'],
        ['Yusuf', 'Danke, das ist nett. Ich esse kein Schweinefleisch.'],
        ['Mia', 'Ich weiß. Lina isst vegetarisch, für sie ist es auch gut.'],
        ['Yusuf', 'Weißt du was? Das ist das Beste am Kochen: Jeder bringt etwas mit, und am Ende sitzen alle am gleichen Tisch.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Buffet? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['viele Speisen auf einem Tisch, jeder nimmt sich selbst', 'ein Restaurant'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hat Yusuf gekocht?', l: 'Linsensuppe (und Falafel)' }, { f: 'Wie hat Mia die Bouneschlupp verändert? Warum?', zeilen: 2, l: 'ohne Speck, damit alle sie essen können (Yusuf isst kein Schweinefleisch, Lina vegetarisch)' }, { f: 'Was ist für Yusuf das Beste am Kochen?', zeilen: 2, l: 'Jeder bringt etwas mit, und am Ende sitzen alle am gleichen Tisch.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welches Gericht würdet ihr für ein Klassen-Buffet mitbringen? Kann es jeder essen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde … mitbringen.', 'Darin ist …', 'Für … könnte ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Tisch decken', punkte: ['**Gabel links**', '**Messer rechts** (Schneide zum Teller)', '**Löffel** rechts außen, **Dessertlöffel** oben', '**Glas** oben rechts'] },
         { titel: 'Gemeinsam essen', punkte: ['vorher **fragen**, was alle essen können', 'jede Esskultur ist eine **Tradition**', '**warten**, bis alle etwas haben', 'Handy **weg**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Bewertet euer gemeinsames Essen.', stufe: 2, kopf: ['Wir haben …', 'gut', 'geht so', 'nicht gut'], breiten: [52, 16, 16, 16], zeilen: [['pünktlich fertig gekocht', '', '', ''], ['an Allergien und Essgewohnheiten gedacht', '', '', ''], ['den Tisch richtig gedeckt', '', '', ''], ['freundlich miteinander gegessen', '', '', ''], ['gemeinsam aufgeräumt', '', '', '']] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Beim Klassen-Buffet probiert Noah ein Gericht und verzieht das Gesicht. „Iiih, was ist das denn?“, sagt er laut. Die Mitschülerin, die es gekocht hat, wird rot.'],
        frage: 'Was sagst du?',
        optionen: ['Nichts – Noah hat ja nur seine Meinung gesagt.', '„Noah, das war unhöflich. Du musst es nicht essen, aber sag es freundlich.“', 'Ich probiere das Gericht und sage der Mitschülerin, was mir daran gefällt.'],
        hinweis: 'Niemand muss alles mögen. Aber man kann es freundlich sagen: „Das ist nicht so mein Geschmack.“ B und C zeigen Respekt.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe ein Gericht, das dir viel bedeutet (aus deiner Kultur, von einem Fest oder einfach dein Lieblingsessen). Du kannst auch ein ausgedachtes Gericht beschreiben.', stufe: 2,
        anfaenge: ['Mein Gericht heißt …', 'Darin sind …', 'Man isst es …', 'Es bedeutet mir viel, weil …'], zeilen: 7,
        beispiel: 'Mein Gericht heißt Gromperekichelcher. Darin sind geriebene Kartoffeln, Zwiebeln, Ei und ein bisschen Mehl. Man isst sie heiß, oft mit Apfelmus, zum Beispiel auf der Kirmes. Es bedeutet mir viel, weil es nach Herbst und nach Jahrmarkt schmeckt.' },
    ],
    check: ['Ich decke einen Tisch richtig.', 'Ich achte auf Essgewohnheiten und Allergien.', 'Ich esse respektvoll mit anderen.'],
  },
  // ================================================================ 6
  {
    thema: 'Spülen · Lebensmittel lagern · Mülltrennung', titel: 'Glänzend sauber, richtig verstaut', untertitel: 'Nach dem Kochen ist vor dem Kochen. Du lernst, in welcher Reihenfolge man spült, wo Lebensmittel im Kühlschrank hingehören und wie man Küchenmüll trennt.',
    ziel: { de: 'Ich spüle richtig, lagere Lebensmittel am richtigen Ort und trenne den Müll.', fr: 'Je fais la vaisselle correctement, je range les aliments au bon endroit et je trie les déchets.' },
    bild: ['noah:froh:stehen', 'lina:froh:stehen'],
    start: {
      was: 'Kühlschrank-Rätsel',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo ist es im Kühlschrank am kältesten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['oben', 'unten über dem Gemüsefach', 'in der Tür'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'm1',
      quelle: 'Küchenordnung', titel: 'Spülen wie die Profis',
      material: ['heißes Wasser mit wenig Spülmittel', 'Spülbürste oder Schwamm', 'sauberes Geschirrtuch', 'Abtropfgestell'],
      schritte: [
        { icon: 'trash', text: '**Abräumen:** Essensreste in den Biomüll kratzen. Geschirr nach Art stapeln: Gläser, Besteck, Teller, Töpfe.' },
        { icon: 'droplet', text: '**Reihenfolge:** Vom Saubersten zum Schmutzigsten: zuerst **Gläser**, dann **Besteck**, dann **Teller**, zum Schluss **Töpfe und Pfannen**.' },
        { icon: 'tools-kitchen-2', text: '**Messer** einzeln spülen und sofort abtrocknen – nie unsichtbar ins Spülwasser legen.' },
        { icon: 'refresh', text: '**Wasser wechseln,** wenn es fettig oder trüb ist.' },
        { icon: 'layout-grid', text: '**Abtrocknen und einräumen:** Alles an seinen Platz im Schrank. Spüle und Arbeitsfläche abwischen, Tuch zum Trocknen aufhängen.' },
      ],
      danach: ['**Lebensmittel lagern:** Reste abgedeckt oder in einer Dose in den Kühlschrank. **Rohes Fleisch und Fisch** gehören ganz **nach unten**, damit nichts auf andere Lebensmittel tropft. Mehl, Zucker und Nudeln gut verschlossen in den Vorratsschrank.'],
      woerter: [['spülen', 'faire la vaisselle'], ['das Spülmittel', 'le liquide vaisselle'], ['das Besteck', 'les couverts'], ['der Topf', 'la casserole'], ['abtrocknen', 'essuyer'], ['trüb', 'trouble'], ['der Vorrat', 'la réserve'], ['abdecken', 'couvrir']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge spült man? Ordne.', stufe: 1, teile: ['Gläser', 'Besteck', 'Teller', 'Töpfe und Pfannen'], ordnung: [2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Warum gehört rohes Fleisch ganz nach unten in den Kühlschrank?', stufe: 2, fragen: [{ f: '', l: 'Damit nichts auf andere Lebensmittel tropft (und weil es dort am kältesten ist).' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Lehrküche · nach dem Kochen', titel: 'Wohin damit?',
      situation: 'Noah und Lina räumen nach dem Kochen auf. Sie überlegen, wohin die Reste und der Müll gehören.',
      bild: ['noah:verwirrt:stehen', 'lina:froh:zeigen'], sprecher: { Noah: 'm3', Lina: 'w3' },
      text: [
        ['Noah', 'Wohin mit den Eierschalen?'],
        ['Lina', 'Biomüll. Genauso die Apfelschalen und die Teigreste.'],
        ['Noah', 'Und der Milchkarton?'],
        ['Lina', 'In den blauen Sack, also Valorlux. Aber vorher ausleeren.'],
        ['Noah', 'Okay. Die übrigen Crêpes werfe ich weg.'],
        ['Lina', 'Nein, warte! Die kann man in eine Dose tun und morgen essen. In den Kühlschrank, oben ins Fach.'],
        ['Noah', 'Und die halbe Packung Hackfleisch, die wir nicht gebraucht haben?'],
        ['Lina', 'Gut eingepackt ganz nach unten in den Kühlschrank. Aber Hackfleisch hält nicht lange: Wir verbrauchen es heute noch oder frieren es ein.'],
        ['Noah', 'Du weißt ja alles!'],
        ['Lina', 'Bei uns zu Hause hängt ein Plan am Kühlschrank. Den hab ich irgendwann auswendig gelernt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „verbrauchen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['aufessen oder benutzen', 'wegwerfen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wohin gehört das?', stufe: 1, kopf: ['Was?', 'Wohin?'], breiten: [40, 60], zeilen: [['Eierschalen, Apfelschalen, Teigreste', '[Biomüll]'], ['Milchkarton (leer)', '[blauer Sack (Valorlux)]'], ['übrige Crêpes', '[in einer Dose oben in den Kühlschrank]'], ['Hackfleisch', '[gut eingepackt ganz unten in den Kühlschrank, heute verbrauchen oder einfrieren]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie kann man in der Schulküche weniger wegwerfen? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['genau planen', 'Reste aufheben', 'Reste neu verkochen', 'kleinere Portionen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Spülen', nummern: true, punkte: ['**Reste** in den Biomüll', '**Gläser**', '**Besteck** (Messer einzeln!)', '**Teller**', '**Töpfe und Pfannen**', 'Wasser **wechseln**, wenn es trüb ist'] },
         { titel: 'Lagern und trennen', punkte: ['Reste **abgedeckt** in den Kühlschrank', 'rohes Fleisch und Fisch **ganz unten**', '**Biomüll**: Schalen, Reste', '**Valorlux** (blauer Sack): Plastikverpackungen, Dosen, Getränkekartons'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wohin gehört was im Kühlschrank? Schreibe die Nummer des Fachs.', stufe: 2, html: '<div class="neben">' + kuehlschrank() + '<div><p style="font-size:11pt;margin:0 0 2mm">1 oben · 2 Mitte · 3 unten (am kältesten) · 4 Gemüsefach · 5 Tür</p></div></div>',
        liste: [['rohes Hähnchen', '3'], ['Joghurt und Käse', '2'], ['Karotten und Salat', '4'], ['Reste in einer Dose', '1'], ['Milchflasche und Butter', '5'], ['Fisch', '3']], spalten: 2 },
      { art: 'schneidekarten', auftrag: 'Küchen-Ämter: Schneidet die Karten aus und verteilt die Ämter. Jede Woche wird gewechselt.', stufe: 1, neueSeite: true, titel: 'Küchen-Amt', icon: 'chef-hat', farbe: IDEE, spalten: 3,
        karten: [
          { text: '**Spülen**', frage: 'Diese Woche: …' }, { text: '**Abtrocknen und einräumen**', frage: 'Diese Woche: …' }, { text: '**Flächen und Herd abwischen**', frage: 'Diese Woche: …' },
          { text: '**Müll trennen und rausbringen**', frage: 'Diese Woche: …' }, { text: '**Kühlschrank-Kontrolle**', frage: 'Diese Woche: …' }, { text: '**Tücher wechseln**', frage: 'Diese Woche: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Küchen-Bericht: Was hast du in diesem Modul gekocht und gelernt? Was kannst du jetzt auch zu Hause machen?', stufe: 2,
        anfaenge: ['In diesem Modul habe ich …', 'Gelernt habe ich, dass …', 'Am schwierigsten war …', 'Zu Hause kann ich jetzt …'], zeilen: 7,
        beispiel: 'In diesem Modul habe ich Crêpes gebacken und für ein Buffet gekocht. Gelernt habe ich, dass man rohes Fleisch und Salat nie auf demselben Brett schneidet. Am schwierigsten war für mich der Krallengriff, aber jetzt klappt er. Zu Hause kann ich jetzt allein einen Obstsalat machen und richtig spülen.' },
    ],
    check: ['Ich spüle in der richtigen Reihenfolge.', 'Ich lagere Lebensmittel am richtigen Ort.', 'Ich trenne Küchenmüll richtig.'],
  },
]
