// Deutsch · Modul 8 „Konsum, Umwelt und Klima“ (Voie de préparation, B1) – multimodales Heft.
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 8: Konsumverhalten, Umweltschutz im Alltag, Klimaveränderungen, Energieressourcen;
// Internetforum, Reklamation (Reparatur statt Neukauf), Mülltrennung, Ankündigung, spontanes Interview, Vor- und
// Nachteile (ein Grad weniger, Wäschetrockner), Kurzreferat zum Energieverbrauch, Kurvendiagramm, Radio-Info-Beitrag,
// Einweihung eines Windparks, Gruppenentscheidung (Schule und Umwelt), Trends, Marktforschung, auf Anzeigen reagieren;
// Präpositionalattribute, Futur mit werden, Konjunktiv II mit würde, wenn–dann (Realis/Irrealis), Passiv und Präteritum
// (Wiederholung), Merkmale von Fachsprache. Zahlen bewusst gerundet; Personen, Marken, Orte der Reportage ausgedacht.

export const MODUL = {
  id: 'deutsch-m8', kuerzel: 'de8', nr: 8, sprache: 'de', niveau: 'B1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-8',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Konsum, Umwelt und Klima', fr: 'Consommation, environnement et climat' },
  untertitel: { de: 'Kaufen oder reparieren, Müll trennen, Energie sparen, das Klima verstehen, Strom aus Wind und Sonne, eine grüne Schule und Trends: lesen, hören, diskutieren und schreiben.', fr: 'Acheter ou réparer, trier les déchets, économiser l’énergie, comprendre le climat, l’électricité du vent et du soleil, une école verte et les tendances : lire, écouter, débattre et écrire.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['chloe:froh:stehen-zeigen', 'opa:froh:stehen', 'finn:froh:laessig'],
  blasen: [{ t: 'Reparieren!', x: 12, y: 112 }, { t: 'Ein Grad weniger?', x: 122, y: 100 }, { t: 'Bio?', x: 162, y: 150 }],
  themen: [
    { titel: { de: 'Kaufen und reparieren', fr: 'Acheter et réparer' }, icon: 'shopping-cart', lektionen: 2 },
    { titel: { de: 'Umwelt, Energie und Klima', fr: 'Environnement, énergie et climat' }, icon: 'leaf', lektionen: 4 },
    { titel: { de: 'Gemeinsam handeln', fr: 'Agir ensemble' }, icon: 'users-group', lektionen: 2 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'In Modul 8 geht es um Fragen, die alle betreffen. Es gibt oft mehr als eine gute Meinung – wichtig ist, dass du sie begründest.',
  ],
  // nur für die Vorlese-Stimme (Python-Regex)
  aussprache: {
    '(\\w+)/in\\b': '\\1 oder \\1in', 'CO₂': 'Ze O zwei', '\\bCO2\\b': 'Ze O zwei', '\\bRepair Café': 'Ripär Kafe', '(?i)\\brecycling': 'Risaikling',
    '\\bSecond-Hand': 'Sekend-Händ', '(?i)\\bvintage': 'wintitsch', '\\bStandby\\b': 'Ständbai', '\\bonline\\b': 'onlein', '\\bInfluencer': 'Influenser',
    '\\bApp\\b': 'Äpp', '\\bTrendsetter': 'Trendsetter', '(\\d+) ?%': '\\1 Prozent', '\\s?°C': ' Grad',
  },
}

// Kurvendiagramm (SVG): Erwärmung seit 1850–1900, gerundet
const kurve = () => {
  const P = [[1900, 0], [1925, 0.1], [1950, 0.25], [1975, 0.35], [2000, 0.7], [2010, 0.95], [2020, 1.2]]
  const x = (j) => 34 + ((j - 1900) / 120) * 380, y = (t) => 168 - (t / 1.5) * 140
  const gitter = [0, 0.5, 1, 1.5].map((t) => `<line x1="34" y1="${y(t)}" x2="414" y2="${y(t)}" stroke="#d6dbe3" stroke-width="1"/><text x="28" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6475">${String(t).replace('.', ',')} °C</text>`).join('')
  const jahre = [1900, 1925, 1950, 1975, 2000, 2020].map((j) => `<text x="${x(j)}" y="186" text-anchor="middle" font-size="11" fill="#5b6475">${j}</text>`).join('')
  const linie = P.map(([j, t], i) => `${i ? 'L' : 'M'}${x(j).toFixed(1)} ${y(t).toFixed(1)}`).join(' ')
  const punkte = P.map(([j, t]) => `<circle cx="${x(j)}" cy="${y(t)}" r="3.6" fill="#fff" stroke="var(--f)" stroke-width="2.2"/>`).join('')
  return `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:2mm">Wie viel wärmer ist es auf der Erde? (weltweit, im Vergleich zu 1850–1900, gerundet)</div><svg viewBox="0 0 430 196" style="width:100%;font-family:Atkinson">${gitter}${jahre}<path d="${linie}" fill="none" stroke="var(--f)" stroke-width="3" stroke-linejoin="round"/>${punkte}</svg><div style="font-size:9.5pt;color:var(--leise)">vereinfachte Darstellung nach Daten von Klimadiensten</div>`
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Konsum · Konjunktiv II mit würde', titel: 'Brauche ich das wirklich?', untertitel: 'Ein Forum über das neueste Handy und ein Radiobeitrag über Jugendliche und Konsum: Du sagst, was du tun würdest – und warum.',
    ziel: { de: 'Ich verstehe Meinungen über Konsum und sage mit „würde“, was ich tun würde.', fr: 'Je comprends des avis sur la consommation et je dis avec « würde » ce que je ferais.' },
    bild: ['tom:aufgeregt:handy', 'lina:froh:verschraenkt'],
    start: {
      was: 'Rund ums Kaufen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['der Trend', 'die Marke', 'das Sonderangebot', 'der Gutschein', 'die Ratenzahlung'], rechts: ['etwas, das gerade viele gut finden', 'der Name einer Firma auf einem Produkt', 'etwas ist für kurze Zeit billiger', 'ein Papier, mit dem man einkaufen kann', 'man bezahlt jeden Monat einen Teil'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Eine Diskussion im Forum', art: 'chat', stimmen: { Tomek: 'm3', Sara_L: 'w2', Nico_14: 'm1' }, ich: 'Sara_L',
      quelle: 'Internetforum für Jugendliche (ausgedachte Marke)', titel: 'Das neue Handy – muss das sein?',
      nachrichten: [
        ['Tomek', 'Nächste Woche kommt das neue Phonix 12 raus. Mein Handy ist zwei Jahre alt. Ich würde mir sofort das neue kaufen, wenn ich könnte!'],
        ['Sara_L', 'Ehrlich? Dein Handy funktioniert doch noch. Ich würde lieber warten. Die Kamera ist ein bisschen besser, sonst ist fast alles gleich.'],
        ['Nico_14', 'Ich verstehe Tomek. In meiner Klasse haben viele das neueste Modell. Wenn man ein altes hat, wird man manchmal komisch angeschaut.'],
        ['Sara_L', 'Das ist aber kein guter Grund. Wenn alle von einer Brücke springen würden, würdest du dann auch springen? 😄'],
        ['Tomek', 'Haha, nein. Aber ein Handy ist ja nicht gefährlich. Nur teuer …'],
        ['Nico_14', 'Mein Tipp: Ein neuer Akku kostet nur einen Bruchteil. Damit hält das alte Handy noch lange. Und es ist besser für die Umwelt.'],
      ],
      woerter: [['rauskommen', 'sortir (produit)'], ['funktionieren', 'fonctionner'], ['das Modell', 'le modèle'], ['anschauen', 'regarder'], ['der Grund', 'la raison'], ['der Akku', 'la batterie'], ['der Bruchteil', 'une petite partie'], ['die Umwelt', 'l’environnement']],
      aufgaben: [
        { art: 'wer', auftrag: 'Wer schreibt das? Kreuze an.', stufe: 1, personen: ['Tomek', 'Sara_L', 'Nico_14'], saetze: [['Ich möchte sofort das neue Handy.', 'Tomek'], ['Ich würde lieber warten.', 'Sara_L'], ['Viele in meiner Klasse haben das neueste Modell.', 'Nico_14'], ['Das ist kein guter Grund.', 'Sara_L'], ['Ein neuer Akku ist eine gute Idee.', 'Nico_14']] },
        { art: 'fragen', auftrag: 'Welche Meinung findest du am besten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ich finde Nicos Tipp am besten, weil man Geld spart und die Umwelt schützt.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Radiobeitrag über Konsum', wo: 'Radio · Info-Magazin', titel: 'Kaufen, kaufen, kaufen?',
      situation: 'Ein Radiobeitrag über Jugendliche und Konsum. Die Reporterin spricht mit Malik und Jana auf der Straße.',
      bild: ['lehrerin:froh:erklaeren', 'jana:froh:handy'], sprecher: { Reporterin: 'w1', Malik: 'm3', Jana: 'w2' },
      text: [
        ['Reporterin', 'Jugendliche sind wichtige Kunden. Viele Firmen machen Werbung extra für sie. Aber wie kaufen junge Leute wirklich ein? Ich habe nachgefragt.'],
        ['Malik', 'Ich kaufe vor allem Kleidung und Spiele. Oft online, weil es schneller geht. Manchmal ärgere ich mich dann, weil ich die Sachen gar nicht brauche.'],
        ['Reporterin', 'Was würdest du heute anders machen?'],
        ['Malik', 'Ich würde zwei Tage warten, bevor ich etwas bestelle. Wenn ich es dann noch will, kaufe ich es.'],
        ['Jana', 'Ich kaufe viel gebraucht, zum Beispiel auf dem Flohmarkt oder im Internet. Das ist billiger und besser für die Umwelt.'],
        ['Reporterin', 'Und wenn du einen Gutschein über hundert Euro gewinnen würdest?'],
        ['Jana', 'Dann würde ich mir gute Wanderschuhe kaufen. Und den Rest würde ich sparen.'],
        ['Reporterin', 'Zwei Jugendliche, zwei Strategien. Unser Tipp: Vor dem Kauf kurz fragen: Brauche ich das wirklich?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „gebraucht kaufen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man kauft etwas, das schon jemand benutzt hat.', 'Man kauft etwas, das man dringend braucht.', 'Man kauft etwas ganz Neues.'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Warum kauft Malik oft online?', o: ['weil es billiger ist', 'weil es schneller geht'], r: 1 }, { f: 'Was würde Malik heute anders machen?', o: ['zwei Tage warten', 'nur im Geschäft kaufen'], r: 0 }, { f: 'Wo kauft Jana gebraucht?', o: ['auf dem Flohmarkt und im Internet', 'im Supermarkt'], r: 0 }, { f: 'Was würde Jana mit dem Gutschein machen?', o: ['Wanderschuhe kaufen und den Rest sparen', 'alles für Spiele ausgeben'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stell dir vor, du gewinnst bei einem Schulwettbewerb einen Gutschein über 100 Euro. Was würdest du damit machen? Sprecht in Gruppen.', stufe: 3, karten: [
        { titel: 'Sagen', text: ['Ich würde …', 'Wenn ich den Gutschein hätte, würde ich …', 'Ich würde lieber …, weil …'] },
        { titel: 'Reagieren', text: ['Und was würdest du machen?', 'Das würde ich auch machen.', 'Ich würde das anders machen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Konjunktiv II mit würde', punkte: ['Wirklichkeit: Ich **kaufe** das Handy.', 'Vorstellung: Ich **würde** das Handy **kaufen**.', '**würde** an Position 2, **Infinitiv am Ende**.', 'Oft auch: ich **hätte** (haben), ich **wäre** (sein), ich **könnte** (können).'] },
         { titel: 'würde – alle Formen', tabelle: { kopf: ['Person', 'würde'], zeilen: [['ich', 'würde'], ['du', 'würdest'], ['er / sie / es', 'würde'], ['wir', 'würden'], ['ihr', 'würdet'], ['sie / Sie', 'würden']] } }],
        [{ art: 'tipp', titel: 'Wenn …, würde …', text: '**Wenn** ich einen Gutschein **hätte**, **würde** ich Schuhe **kaufen**. Das ist nicht echt, sondern nur vorgestellt (irreal).' },
         { art: 'achtung', titel: 'Ratenzahlung', text: 'Ratenzahlung klingt billig, aber am Ende zahlt man oft **mehr**. Vor einem Vertrag mit einer erwachsenen Vertrauensperson sprechen.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die richtige Form von würde.', stufe: 1, saetze: ['Ich [würde] lieber warten.', 'Was [würdest] du mit dem Gutschein machen?', 'Wir [würden] den alten Akku tauschen.', 'Tomek [würde] sofort das neue Handy kaufen.', '[Würdet] ihr auf dem Flohmarkt einkaufen?'] },
      { art: 'abschreiben', auftrag: 'Schreib mit würde.', stufe: 2, kopf: ['Wirklichkeit', 'Vorstellung'], saetze: [['Ich kaufe ein neues Handy.', 'Ich würde ein neues Handy kaufen.'], ['Wir sparen das Geld.', 'Wir würden das Geld sparen.'], ['Sie wartet zwei Tage.', 'Sie würde zwei Tage warten.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Beitrag für das Forum: Muss man immer das neueste Handy haben? Was würdest du machen?', stufe: 2,
        anfaenge: ['Ich finde, dass …', 'Wenn mein Handy kaputt wäre, würde ich …', 'Ich würde nie …, weil …', 'Mein Tipp: …'], zeilen: 10,
        beispiel: 'Ich finde, dass man nicht immer das neueste Handy braucht. Wenn mein Handy kaputt wäre, würde ich es zuerst reparieren lassen. Ich würde nie ein Handy nur wegen der Marke kaufen, weil das zu teuer ist. Mein Tipp: Eine gute Hülle schützt das Handy, dann hält es länger.' },
    ],
    check: ['Ich verstehe Meinungen in einem Forum.', 'Ich verstehe einen Radiobeitrag über Konsum.', 'Ich sage mit würde, was ich tun würde.', 'Ich bilde Sätze mit wenn … würde.', 'Ich schreibe meine Meinung zu einem Konsum-Thema.'],
  },
  // ================================================================ 2
  {
    thema: 'Reklamation · Präpositionalattribute', titel: 'Das ist kaputt!', untertitel: 'Ein Repair Café, eine Reklamation im Geschäft und eine Beschwerde-E-Mail: Du beschwerst dich höflich – und überlegst: reparieren statt neu kaufen?',
    ziel: { de: 'Ich beschwere mich höflich über ein kaputtes Produkt und beschreibe Dinge genau.', fr: 'Je me plains poliment d’un produit défectueux et je décris des objets avec précision.' },
    bild: ['sami:enttaeuscht:stehen', 'verkaeuferin:froh:stehen'],
    start: {
      was: 'Was ist kaputt?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt zusammen? Verbinde.', stufe: 1, links: ['Der Bildschirm', 'Der Reißverschluss', 'Der Akku', 'Die Naht', 'Der Kopfhörer'], rechts: ['hat einen Sprung.', 'geht nicht mehr zu.', 'lädt nicht mehr.', 'ist aufgegangen.', 'funktioniert nur noch auf einer Seite.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Bericht über ein Repair Café', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Gemeindezeitung · Bericht', titel: 'Reparieren statt wegwerfen',
      absaetze: [
        'Jeden ersten Samstag im Monat ist im Kulturzentrum **Repair Café**. Wer etwas Kaputtes hat, kann es mitbringen und zusammen mit Freiwilligen reparieren. Die Hilfe ist kostenlos.',
        'Am letzten Samstag kamen über 40 Besucherinnen und Besucher. Sie brachten zum Beispiel eine Lampe **mit einem kaputten Kabel**, einen Toaster **aus den Siebzigerjahren** und viele Jeans **mit Löchern**.',
        'Fast zwei Drittel der Sachen **wurden** repariert. „Viele Dinge sind nur ein bisschen kaputt“, sagt Marc, ein Elektriker **im Ruhestand**. „Oft fehlt nur eine Schraube.“',
        'Auch Jugendliche kommen gern. Die 15-jährige Elif hat ihre Kopfhörer repariert: „Ich habe gelernt, wie man lötet. Das war richtig cool!“',
        'Das Ziel: weniger Müll und weniger Geld für neue Sachen. Außerdem lernt man viel – und trifft nette Leute.',
      ],
      woerter: [['der / die Freiwillige', 'le / la bénévole'], ['kostenlos', 'gratuit'], ['das Kabel', 'le câble'], ['das Loch', 'le trou'], ['zwei Drittel', 'deux tiers'], ['im Ruhestand', 'à la retraite'], ['die Schraube', 'la vis'], ['löten', 'souder']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Im Repair Café muss man für die Hilfe bezahlen.', false], ['Am letzten Samstag kamen über 40 Leute.', true], ['Die meisten Sachen konnten nicht repariert werden.', false], ['Elif hat gelernt, wie man lötet.', true]] },
        { art: 'tabelle', auftrag: 'Wie werden die Dinge im Text beschrieben? Ergänze.', stufe: 2, kopf: ['Ding', 'Beschreibung'], zeilen: [['eine Lampe', '[mit einem kaputten Kabel]'], ['ein Toaster', '[aus den Siebzigerjahren]'], ['viele Jeans', '[mit Löchern]'], ['Marc, ein Elektriker', '[im Ruhestand]']] },
      ],
    },
    hoeren: {
      was: 'Eine Reklamation im Geschäft', wo: 'Elektrogeschäft · Kundenservice', titel: 'Ich möchte etwas reklamieren',
      situation: 'Sami hat vor drei Monaten Kopfhörer gekauft. Jetzt funktioniert eine Seite nicht mehr. Er geht ins Geschäft.',
      bild: ['sami:enttaeuscht:stehen', 'verkaeuferin:froh:stehen'], sprecher: { Verkäuferin: 'w1', Sami: 'm3' },
      text: [
        ['Verkäuferin', 'Guten Tag! Was kann ich für dich tun?'],
        ['Sami', 'Guten Tag. Ich möchte diese Kopfhörer reklamieren. Ich habe sie vor drei Monaten hier gekauft. Seit gestern höre ich nur noch auf der linken Seite.'],
        ['Verkäuferin', 'Das tut mir leid. Hast du den Kassenbon dabei?'],
        ['Sami', 'Ja, hier ist er.'],
        ['Verkäuferin', 'Danke. Die Kopfhörer haben zwei Jahre Garantie. Wir können sie zur Reparatur schicken. Das dauert ungefähr zwei Wochen.'],
        ['Sami', 'Zwei Wochen? Könnten Sie mir vielleicht neue geben? Ich brauche sie für die Schule.'],
        ['Verkäuferin', 'Ich verstehe. Ich schaue mal … Ja, wir haben das gleiche Modell noch da. Ich tausche sie dir um.'],
        ['Sami', 'Super, vielen Dank! Das ist sehr nett.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was braucht man für eine Reklamation? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['den Kassenbon', 'das kaputte Produkt', 'den Schulausweis'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Mach Notizen.', stufe: 1, kopf: ['', 'Info'], breiten: [32, 68], zeilen: [['Produkt', '[Kopfhörer]'], ['gekauft vor', '[drei Monaten]'], ['Problem', '[nur noch die linke Seite funktioniert]'], ['Garantie', '[zwei Jahre]'], ['Lösung', '[Umtausch gegen das gleiche Modell]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt Reklamationen im Geschäft: ein Pullover mit einem Loch, ein Ladekabel, das nicht lädt, ein Spiel, das nicht startet.', stufe: 3, karten: [
        { titel: 'Kunde / Kundin', text: ['Ich möchte … reklamieren.', 'Ich habe … vor … gekauft.', 'Seit … funktioniert … nicht mehr.', 'Könnten Sie …?'] },
        { titel: 'Geschäft', text: ['Hast du / Haben Sie den Kassenbon?', 'Wir können es reparieren oder umtauschen.', 'Das dauert …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Dinge genau beschreiben', punkte: ['eine Lampe **mit einem kaputten Kabel**', 'ein Toaster **aus den Siebzigerjahren**', 'die Kopfhörer **für die Schule**', 'Die Präposition mit Nomen steht **hinter** dem Nomen. Man nennt das **Präpositionalattribut**.'] },
         { titel: 'Sich höflich beschweren', punkte: ['Ich möchte … **reklamieren**.', 'Leider funktioniert … nicht mehr.', '**Könnten Sie** das reparieren oder umtauschen?', 'Ich **hätte gern** mein Geld zurück.', 'Bleib **ruhig** und **freundlich** – das hilft fast immer.'] }],
        [{ art: 'tipp', titel: 'Kassenbon aufheben!', text: 'Bei Problemen brauchst du den **Kassenbon**. In der EU gilt für neue Produkte eine **Gewährleistung von mindestens zwei Jahren**.' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Lektion 1)', text: 'Konjunktiv II macht Bitten höflicher: **Könnten** Sie …? · Ich **hätte** gern … · **Würden** Sie …?' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Präposition: mit, aus, für, ohne.', stufe: 1, woerter: ['aus', 'mit', 'ohne', 'für'], saetze: ['ein T-Shirt [aus] Baumwolle', 'eine Jacke [mit] Kapuze', 'ein Handy [ohne] Kratzer', 'Schuhe [für] den Sport'] },
      { art: 'abschreiben', auftrag: 'Sag es höflicher.', stufe: 2, kopf: ['unhöflich', 'höflich'], saetze: [['Das ist Schrott! Ich will mein Geld!', 'Leider ist das kaputt. Ich hätte gern mein Geld zurück.'], ['Tauschen Sie das sofort um!', 'Könnten Sie das bitte umtauschen?'], ['Das dauert viel zu lange!', 'Gibt es vielleicht eine schnellere Lösung?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Beschwerde-E-Mail an einen Online-Shop: Dein bestelltes Produkt ist kaputt angekommen. Das Produkt darfst du erfinden.', stufe: 2,
        anfaenge: ['Betreff: Reklamation – Bestellung Nr. …', 'Sehr geehrte Damen und Herren,', 'am … habe ich … bestellt.', 'Leider …', 'Könnten Sie …?', 'Mit freundlichen Grüßen'], zeilen: 11,
        beispiel: 'Betreff: Reklamation – Bestellung Nr. 4521. Sehr geehrte Damen und Herren, am 3. März habe ich bei Ihnen eine Lampe mit einem blauen Schirm bestellt. Leider ist das Glas kaputt angekommen. Ich habe ein Foto angehängt. Könnten Sie mir bitte eine neue Lampe schicken? Mit freundlichen Grüßen, Lina' },
    ],
    check: ['Ich verstehe einen Bericht über ein Repair Café.', 'Ich verstehe eine Reklamation im Geschäft.', 'Ich beschwere mich höflich.', 'Ich beschreibe Dinge genau (mit, aus, für).', 'Ich schreibe eine Beschwerde-E-Mail.'],
  },
  // ================================================================ 3
  {
    thema: 'Mülltrennung · Passiv', titel: 'Wohin mit dem Müll?', untertitel: 'Ein Infoblatt der Gemeinde, eine Durchsage in der Schule und ein Interview nach einer Aufräumaktion: Du trennst Müll richtig, kündigst etwas an und berichtest.',
    ziel: { de: 'Ich verstehe Infos zur Mülltrennung, kündige etwas an und berichte über eine Aktion.', fr: 'Je comprends le tri des déchets, j’annonce un événement et je raconte une action.' },
    bild: ['noah:froh:stehen-zeigen', 'chloe:angeekelt'],
    start: {
      was: 'Wohin gehört das?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wohin gehört das? Verbinde.', stufe: 1, links: ['eine Glasflasche', 'eine alte Zeitung', 'Bananenschalen', 'eine leere Getränkedose', 'eine alte Batterie'], rechts: ['in den Glascontainer', 'ins Altpapier', 'in die Biotonne', 'in den Sack für Verpackungen', 'zur Sammelstelle oder ins Recyclingzentrum'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Infoblatt zur Mülltrennung', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Infoblatt einer Gemeinde (vereinfacht; die Regeln können je nach Gemeinde etwas anders sein)', titel: 'Richtig trennen – so geht’s!',
      absaetze: [
        '**Glas:** Flaschen und Gläser **werden** im Glascontainer **gesammelt**. Deckel vorher abnehmen! Bitte nur tagsüber einwerfen – das ist laut.',
        '**Papier:** Zeitungen, Hefte und Kartons kommen in die Papiertonne. Kartons bitte flach falten. Fettiges Papier, zum Beispiel ein Pizzakarton mit Käseresten, gehört **nicht** dazu.',
        '**Verpackungen:** Plastikflaschen, Dosen und Getränkekartons kommen in den Sack für Verpackungen. Was genau hineindarf, steht auf dem Sack.',
        '**Bioabfall:** Obst- und Gemüsereste, Kaffeesatz und Blumen kommen in die Biotonne. Daraus **wird** Kompost oder Biogas **gemacht**.',
        '**Problemstoffe:** Batterien, alte Handys und Farben **dürfen nie** in den Hausmüll. Sie **werden** an Sammelstellen und im Recyclingzentrum **angenommen**.',
        '**Restmüll:** Nur was man nicht trennen kann, kommt in den Restmüll, zum Beispiel Staubsaugerbeutel oder Windeln.',
      ],
      woerter: [['trennen', 'trier'], ['der Deckel', 'le couvercle'], ['falten', 'plier'], ['fettig', 'gras'], ['der Kaffeesatz', 'le marc de café'], ['der Kompost', 'le compost'], ['der Problemstoff', 'le déchet dangereux'], ['die Windel', 'la couche']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wohin damit? Schreib die Tonne oder den Ort.', stufe: 1, kopf: ['Müll', 'Wohin?'], zeilen: [['ein leeres Marmeladenglas', '[Glascontainer]'], ['ein Pizzakarton mit Käseresten', '[Restmüll]'], ['ein Schuhkarton', '[Papiertonne]'], ['Apfelreste', '[Biotonne]'], ['ein altes Handy', '[Sammelstelle / Recyclingzentrum]'], ['eine Plastikflasche', '[Sack für Verpackungen]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Man soll Glas nur tagsüber einwerfen.', true], ['Aus Bioabfall wird Kompost gemacht.', true], ['Batterien darf man in den Hausmüll werfen.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Durchsage und ein Interview', wo: 'Schule · Durchsage und Interview', titel: 'Aufräumaktion auf dem Schulhof',
      situation: 'Zuerst hörst du eine Durchsage der Schülervertretung. Eine Woche später interviewt Mia nach der Aktion ihre Mitschülerin Chloe für die Schülerzeitung.',
      bild: ['noah:froh:erklaeren', 'chloe:froh'], sprecher: { Noah: 'm1', Mia: 'w2', Chloe: 'w3' },
      text: [
        ['Noah', 'Achtung, eine Durchsage der Schülervertretung! Am Freitag nach der dritten Stunde räumen wir gemeinsam den Schulhof und den Sportplatz auf. Handschuhe und Säcke bekommt ihr am Haupteingang. Treffpunkt: vor der Turnhalle. Danach gibt es für alle Getränke. Macht mit!'],
        ['Mia', 'Chloe, du warst bei der Aufräumaktion dabei. Wie war es?'],
        ['Chloe', 'Am Anfang hatte ich keine Lust. Aber dann war es echt gut. Wir waren fast hundert Leute!'],
        ['Mia', 'Was habt ihr gefunden?'],
        ['Chloe', 'Unglaublich viele Zigarettenstummel und Plastikflaschen. Hinter der Turnhalle lag sogar ein alter Fahrradreifen.'],
        ['Mia', 'Wie hast du dich danach gefühlt?'],
        ['Chloe', 'Stolz! Der Schulhof sah viel schöner aus. Aber ich war auch ein bisschen wütend. Es wäre besser, wenn niemand den Müll einfach liegen lassen würde.'],
        ['Mia', 'Was schlägst du vor?'],
        ['Chloe', 'Mehr Mülleimer. Und jede Klasse ist eine Woche lang für den Hof verantwortlich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört in eine gute Durchsage? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Was passiert?', 'Wann und wo?', 'Was muss man mitbringen oder wissen?', 'eine lange Geschichte'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör die Durchsage. Ergänze.', stufe: 1, kopf: ['', 'Info'], breiten: [32, 68], zeilen: [['Was?', '[Aufräumaktion: Schulhof und Sportplatz]'], ['Wann?', '[Freitag nach der dritten Stunde]'], ['Treffpunkt', '[vor der Turnhalle]'], ['Handschuhe und Säcke', '[am Haupteingang]']] },
        { art: 'mc', auftrag: 'Hör das Interview. Kreuze an.', stufe: 2, fragen: [{ f: 'Wie viele Leute haben mitgemacht?', o: ['fast zehn', 'fast hundert', 'über tausend'], r: 1 }, { f: 'Was lag hinter der Turnhalle?', o: ['ein Fahrradreifen', 'ein Handy', 'ein Schuh'], r: 0 }, { f: 'Wie hat sich Chloe danach gefühlt?', o: ['nur müde', 'stolz, aber auch ein bisschen wütend'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht eine Durchsage für eine Aktion an eurer Schule (Flohmarkt, Sammelaktion, Aufräumen). Kurz und mit allen wichtigen Infos! Interviewt danach eine Person, die mitgemacht hat.', stufe: 3, karten: [
        { titel: 'Ankündigen', text: ['Achtung, eine Durchsage!', 'Am … um … findet … statt.', 'Treffpunkt: …', 'Bringt bitte … mit.', 'Macht mit!'] },
        { titel: 'Interviewen', text: ['Wie war …?', 'Was habt ihr …?', 'Wie hast du dich gefühlt?', 'Was schlägst du vor?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Passiv (Wiederholung)', punkte: ['Präsens: Glas **wird** im Container **gesammelt**.', 'Präteritum: Der Hof **wurde** am Freitag **aufgeräumt**.', 'Mit Modalverb: Batterien **dürfen** nicht weggeworfen **werden**.', 'Wer es tut, ist nicht wichtig – die **Sache** ist wichtig.'] },
         { titel: 'Eine Ankündigung machen', punkte: ['**Aufmerksamkeit:** Achtung! · Liebe Schülerinnen und Schüler!', '**Was? Wann? Wo?**', '**Was muss man mitbringen?**', '**Aufforderung:** Macht mit! · Kommt vorbei!', 'Kurz, laut und deutlich sprechen.'] }],
        [{ art: 'tipp', titel: 'Weniger Müll', text: '**Vermeiden** ist besser als **trennen**: Trinkflasche statt Plastikflasche, Brotdose statt Alufolie, Dinge reparieren und weitergeben.' },
         { art: 'achtung', titel: 'Gefährlicher Müll', text: 'Batterien und Akkus können **brennen**, wenn sie im Müllwagen kaputtgehen. Bring sie immer zur Sammelstelle.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Passiv: wird, werden, wurde, wurden.', stufe: 1, saetze: ['Heute [wird] das Altpapier abgeholt.', 'Aus Bioabfall [wird] Kompost gemacht.', 'Letzte Woche [wurde] der Schulhof aufgeräumt.', 'Dabei [wurden] 20 Säcke Müll gesammelt.', 'Batterien [werden] im Recyclingzentrum angenommen.'] },
      { art: 'abschreiben', auftrag: 'Schreib im Passiv Präteritum.', stufe: 2, kopf: ['Aktiv', 'Passiv'], saetze: [['Die Schüler räumten den Hof auf.', 'Der Hof wurde aufgeräumt.'], ['Wir sammelten viele Flaschen.', 'Viele Flaschen wurden gesammelt.'], ['Die Gemeinde stellte neue Mülleimer auf.', 'Neue Mülleimer wurden aufgestellt.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Bericht für die Schülerzeitung über eine Umweltaktion (echt oder erfunden): Was? Wann? Wer? Was wurde gemacht? Wie war es?', stufe: 2,
        anfaenge: ['Am … fand … statt.', 'Mitgemacht haben …', 'Es wurden …', 'Besonders überraschend war …', 'Unser Vorschlag: …'], zeilen: 11,
        beispiel: 'Am Freitag fand an unserer Schule eine Aufräumaktion statt. Mitgemacht haben fast hundert Schülerinnen und Schüler. Es wurden 20 Säcke Müll gesammelt, vor allem Plastikflaschen und Zigarettenstummel. Besonders überraschend war ein alter Fahrradreifen hinter der Turnhalle. Unser Vorschlag: mehr Mülleimer auf dem Schulhof.' },
    ],
    check: ['Ich verstehe Infos zur Mülltrennung.', 'Ich verstehe eine Durchsage und ein Interview.', 'Ich mache eine kurze Ankündigung.', 'Ich benutze das Passiv im Präsens und Präteritum.', 'Ich schreibe einen Bericht über eine Aktion.'],
  },
  // ================================================================ 4
  {
    thema: 'Energie sparen · Vor- und Nachteile', titel: 'Ein Grad weniger?', untertitel: 'Tipps zum Energiesparen, ein Kurzreferat und eine Diskussion: Du nennst Vor- und Nachteile und gibst Ratschläge mit „sollte“ und „würde“.',
    ziel: { de: 'Ich nenne Vor- und Nachteile und gebe Ratschläge zum Energiesparen.', fr: 'Je cite des avantages et des inconvénients et je donne des conseils pour économiser l’énergie.' },
    bild: ['finn:froh:erklaeren', 'opa:verwirrt'],
    start: {
      was: 'Sparen oder verschwenden?',
      aufgaben: [
        { art: 'rf', auftrag: 'Spart das Energie oder verbraucht es viel? Kreuze an.', stufe: 1, spalten: ['spart', 'verbraucht viel'], saetze: [['einen Deckel auf den Kochtopf legen', true], ['den Fernseher im Standby lassen', false], ['Wäsche an der Luft trocknen', true], ['das Fenster im Winter den ganzen Tag gekippt lassen', false], ['kurz duschen statt baden', true]] },
      ],
    },
    lesen: {
      was: 'Ein Ratgebertext', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Ratgeber · Energie im Haushalt', titel: 'Sparen, ohne zu frieren',
      absaetze: [
        'Im Winter heizen viele Menschen ihre Wohnung auf 22 Grad oder mehr. Fachleute sagen: **Jedes Grad weniger spart etwa 6 Prozent Heizenergie.** Im Wohnzimmer reichen oft 20 Grad, im Schlafzimmer 17 bis 18 Grad.',
        '**Stoßlüften** statt Kipplüften: lieber mehrmals am Tag ein paar Minuten das Fenster ganz öffnen. Ein gekipptes Fenster lässt stundenlang Wärme hinaus.',
        '**Geräte im Standby** verbrauchen auch Strom. Mit einer Steckdosenleiste mit Schalter kann man mehrere Geräte auf einmal ganz ausschalten.',
        '**Wäschetrockner** sind praktisch, aber sie brauchen viel Strom. Im Sommer trocknet Wäsche an der Luft kostenlos. Eine moderne, volle **Spülmaschine** braucht dagegen oft weniger Wasser als Spülen von Hand.',
        'Kleine Schritte helfen: Licht aus, wenn man den Raum verlässt, und kürzer duschen. Das spart Energie – und Geld.',
      ],
      woerter: [['heizen', 'chauffer'], ['die Fachleute', 'les spécialistes'], ['frieren', 'avoir froid'], ['lüften', 'aérer'], ['gekippt', 'entrouvert (fenêtre)'], ['die Steckdosenleiste', 'la multiprise'], ['der Wäschetrockner', 'le sèche-linge'], ['die Spülmaschine', 'le lave-vaisselle']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 1, fragen: [{ f: 'Wie viel Heizenergie spart ein Grad weniger?', l: 'etwa 6 Prozent' }, { f: 'Was ist Stoßlüften?', l: 'mehrmals am Tag kurz das Fenster ganz öffnen' }, { f: 'Wie kann man mehrere Geräte auf einmal ganz ausschalten?', l: 'mit einer Steckdosenleiste mit Schalter' }] },
        { art: 'tabelle', auftrag: 'Vor- und Nachteile aus dem Text.', stufe: 2, kopf: ['', 'Vorteil', 'Nachteil'], zeilen: [['Wäschetrockner', '[praktisch]', '[braucht viel Strom]'], ['Wäsche an der Luft', '[kostenlos]', '[dauert länger, nur gut im Sommer]']] },
      ],
    },
    hoeren: {
      was: 'Ein Kurzreferat', wo: 'Klassenzimmer · Kurzreferat', titel: 'Strom-Detektive',
      situation: 'Finn hält ein Kurzreferat über Energieverbrauch. Seine Gruppe hat eine Woche lang im Jugendhaus gemessen, wie viel Strom die Geräte brauchen.',
      bild: ['finn:froh:erklaeren', 'lehrerin:froh'], sprecher: { Finn: 'm3', Jana: 'w2', 'Frau Sommer': 'w1' },
      text: [
        ['Finn', 'Unser Thema heute: Wo versteckt sich Strom? Wir haben eine Woche lang im Jugendhaus gemessen, welche Geräte wie viel Strom verbrauchen.'],
        ['Finn', 'Das Ergebnis hat uns überrascht. Der alte Kühlschrank im Keller war fast leer – aber er hat am meisten Strom verbraucht.'],
        ['Finn', 'Auf Platz zwei kam die Spielkonsole. Sie war auch nachts im Standby.'],
        ['Finn', 'Unsere Vorschläge: Erstens würden wir den alten Kühlschrank abschalten. Zweitens sollte man die Konsole mit einer Steckdosenleiste ganz ausschalten.'],
        ['Finn', 'Wenn das alle machen würden, könnte das Jugendhaus viel Geld sparen. Habt ihr Fragen?'],
        ['Jana', 'Wie habt ihr den Strom gemessen?'],
        ['Finn', 'Mit einem Strommessgerät. Das steckt man zwischen Steckdose und Gerät. So ein Gerät kann man oft auch ausleihen.'],
        ['Frau Sommer', 'Ein sehr gutes Referat, Finn – klar aufgebaut und mit eigenen Messungen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört zu einem guten Kurzreferat? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein klares Thema', 'Ergebnisse und Vorschläge', 'sehr schnell sprechen'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was hat am meisten Strom verbraucht?', o: ['die Spielkonsole', 'der alte Kühlschrank', 'das Licht'], r: 1 }, { f: 'Warum hat die Konsole viel verbraucht?', o: ['Sie war auch nachts im Standby.', 'Sie war kaputt.'], r: 0 }, { f: 'Womit haben sie gemessen?', o: ['mit einem Strommessgerät', 'mit dem Handy'], r: 0 }] },
        { art: 'fragen', auftrag: 'Welche zwei Vorschläge macht Finn?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Den alten Kühlschrank abschalten und die Konsole mit einer Steckdosenleiste ganz ausschalten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Diskutiert Vor- und Nachteile: Soll man im Winter die Heizung um ein Grad niedriger stellen? Braucht man einen Wäschetrockner?', stufe: 3, karten: [
        { titel: 'Vorteile', text: ['Ein Vorteil ist, dass …', 'Dafür spricht …'] },
        { titel: 'Nachteile', text: ['Ein Nachteil ist, dass …', 'Dagegen spricht …'] },
        { titel: 'Urteil', text: ['Insgesamt finde ich …, weil …', 'Ich würde …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ratschläge geben', punkte: ['Du **solltest** das Licht ausmachen.', 'Man **sollte** kürzer duschen.', 'Ich **würde** die Konsole ganz ausschalten.', 'An deiner Stelle **würde** ich …', '**sollte** und **würde** klingen höflich, nicht streng.'] },
         { titel: 'Vor- und Nachteile nennen', punkte: ['Ein **Vorteil** ist, dass …', 'Ein **Nachteil** ist, dass …', 'Dafür / Dagegen spricht …', '**Einerseits** … **andererseits** …', '**Insgesamt** finde ich …'] }],
        [{ art: 'tipp', titel: 'Fachsprache erkennen', text: 'Sachtexte haben viele **lange Nomen**: der Energie|verbrauch, die Heiz|energie, die Steck|dosen|leiste. Zerlege sie in Teile.' },
         { art: 'achtung', titel: 'Prozent', text: '6 % = **sechs Prozent** = 6 von 100. Die Hälfte = 50 %. Ein Viertel = 25 %.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze sollte oder würde in der richtigen Form.', stufe: 1, saetze: ['Du [solltest] im Winter das Fenster nicht kippen.', 'An deiner Stelle [würde] ich kürzer duschen.', 'Man [sollte] Geräte ganz ausschalten.', 'Wir [würden] den alten Kühlschrank abschalten.', 'Ihr [solltet] das Licht ausmachen.'] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Befehl einen höflichen Ratschlag.', stufe: 2, kopf: ['Befehl', 'Ratschlag'], saetze: [['Mach das Licht aus!', 'Du solltest das Licht ausmachen.'], ['Dusch kürzer!', 'An deiner Stelle würde ich kürzer duschen.'], ['Kipp das Fenster nicht!', 'Du solltest lieber kurz stoßlüften.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was spricht für und was gegen „ein Grad weniger“ im Winter? Was würdest du machen?', stufe: 2,
        anfaenge: ['Viele Menschen heizen …', 'Ein Vorteil ist, dass …', 'Ein Nachteil ist, dass …', 'Ich würde …, weil …'], zeilen: 10,
        beispiel: 'Viele Menschen heizen im Winter auf 22 Grad. Ein Vorteil von einem Grad weniger ist, dass man Energie und Geld spart. Ein Nachteil ist, dass manche Menschen schnell frieren, zum Beispiel ältere Leute. Ich würde die Heizung trotzdem ein Grad niedriger stellen und einen warmen Pullover anziehen.' },
    ],
    check: ['Ich verstehe einen Ratgebertext über Energie.', 'Ich verstehe ein Kurzreferat.', 'Ich nenne Vor- und Nachteile.', 'Ich gebe Ratschläge mit sollte und würde.', 'Ich erkenne lange Wörter aus der Fachsprache.'],
  },
  // ================================================================ 5
  {
    thema: 'Klimawandel · Futur mit werden', titel: 'Es wird wärmer', untertitel: 'Ein Kurvendiagramm, ein Sachtext über das Klima und ein Radiobeitrag mit Tipps gegen Hitze: Du beschreibst Entwicklungen und sprichst über die Zukunft.',
    ziel: { de: 'Ich lese ein Kurvendiagramm, verstehe Texte über das Klima und spreche mit „werden“ über die Zukunft.', fr: 'Je lis une courbe, je comprends des textes sur le climat et je parle de l’avenir avec « werden ».' },
    bild: ['amira:besorgt:blatt', 'yusuf:froh:erklaeren'],
    start: {
      was: 'Wetter und Klima',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['das Klima', 'das Wetter', 'die Hitzewelle', 'der Starkregen', 'die Dürre'], rechts: ['das Wetter über viele Jahre', 'wie es heute draußen ist', 'viele sehr heiße Tage hintereinander', 'sehr viel Regen in kurzer Zeit', 'sehr lange kein Regen'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext über das Klima', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Schülermagazin · Wissen', titel: 'Wie sich das Klima verändert',
      absaetze: [
        'Das Klima auf der Erde **wird** wärmer. Seit etwa 1900 ist die Temperatur weltweit im Durchschnitt um **mehr als 1 Grad** gestiegen. Das klingt wenig, hat aber große Folgen.',
        'Der wichtigste Grund ist **CO₂**. Dieses Gas entsteht, wenn Kohle, Erdöl oder Erdgas verbrannt werden – zum Beispiel in Autos, Fabriken und Heizungen. Es hält die Wärme in der Luft fest.',
        'Auch in Luxemburg spürt man den Klimawandel: Es gibt mehr **heiße Sommertage** und weniger Tage mit Schnee. Im Juli 2021 gab es nach **Starkregen** Hochwasser, auch im Müllerthal.',
        'Forscherinnen und Forscher sagen: Wenn wir so weitermachen, **wird** es noch wärmer **werden**. Hitzewellen **werden** häufiger **kommen**.',
        'Es gibt aber auch gute Nachrichten: Immer mehr Strom **wird** aus Wind und Sonne **gemacht**. Und alle können etwas tun – zum Beispiel öfter Bus oder Rad fahren und Energie sparen.',
      ],
      woerter: [['der Durchschnitt', 'la moyenne'], ['steigen (gestiegen)', 'augmenter'], ['die Folge', 'la conséquence'], ['verbrennen', 'brûler'], ['festhalten', 'retenir'], ['spüren', 'ressentir'], ['das Hochwasser', 'l’inondation'], ['der Forscher, die Forscherin', 'le chercheur, la chercheuse']],
      aufgaben: [
        { art: 'frei', auftrag: 'Lies das Kurvendiagramm genau.', stufe: 1, html: kurve() },
        { art: 'fragen', auftrag: 'Beantworte die Fragen zum Diagramm.', stufe: 2, fragen: [{ f: 'Um wie viel Grad war es 1950 wärmer als um 1900?', l: 'um etwa 0,25 Grad' }, { f: 'Wann steigt die Kurve am schnellsten?', l: 'seit etwa 1975 / besonders seit 2000' }, { f: 'Wie hoch ist der Wert 2020?', l: 'etwa 1,2 Grad' }] },
        { art: 'rf', auftrag: 'Richtig oder falsch? Lies den Text.', stufe: 1, saetze: [['Seit 1900 ist es weltweit um mehr als 1 Grad wärmer geworden.', true], ['CO₂ entsteht, wenn man Kohle, Öl oder Gas verbrennt.', true], ['In Luxemburg gibt es heute mehr Tage mit Schnee.', false], ['Immer mehr Strom wird aus Wind und Sonne gemacht.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Radiobeitrag mit Tipps', wo: 'Radio · Info-Magazin', titel: 'Cool bleiben bei Hitze',
      situation: 'Im Radio gibt es einen kurzen Beitrag mit Tipps für heiße Tage. Dann ruft Yusuf an und stellt eine Frage.',
      bild: ['aerztin:froh:erklaeren', 'yusuf:verwirrt:handy'], sprecher: { Moderator: 'm1', Ärztin: 'w1', Yusuf: 'm3' },
      text: [
        ['Moderator', 'Die nächsten Tage werden heiß: Bis zu fünfunddreißig Grad sind angesagt. Bei uns im Studio ist eine Ärztin. Was sollten wir jetzt beachten?'],
        ['Ärztin', 'Am wichtigsten: viel trinken, am besten Wasser oder Tee. Mindestens anderthalb Liter am Tag, beim Sport mehr.'],
        ['Ärztin', 'Sport sollte man lieber am Morgen oder am Abend machen. Mittags ist die Sonne am stärksten. Und denkt an Sonnencreme und eine Kappe.'],
        ['Moderator', 'Wir haben einen Anrufer. Hallo, wer ist dran?'],
        ['Yusuf', 'Hallo, hier ist Yusuf. Wir haben am Freitag ein Fußballturnier. Was würden Sie uns raten?'],
        ['Ärztin', 'Ich würde das Turnier auf den Morgen legen und viele Trinkpausen machen. Wenn jemandem schwindelig wird: sofort in den Schatten und Bescheid sagen.'],
        ['Moderator', 'Danke! Fazit: Die Hitze wird bleiben – aber mit ein paar Tricks kommt man gut durch den Sommer.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist bei Hitze wichtig? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['viel trinken', 'mittags Sport machen', 'Schatten suchen'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie heiß wird es?', o: ['bis zu 25 Grad', 'bis zu 35 Grad', 'bis zu 45 Grad'], r: 1 }, { f: 'Wie viel soll man mindestens trinken?', o: ['einen halben Liter', 'anderthalb Liter', 'fünf Liter'], r: 1 }, { f: 'Wann sollte man Sport machen?', o: ['mittags', 'morgens oder abends'], r: 1 }, { f: 'Was rät die Ärztin Yusuf?', o: ['das Turnier absagen', 'das Turnier auf den Morgen legen und Trinkpausen machen'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kurzreferat in Gruppen: Wie wird das Leben in eurem Ort in 30 Jahren sein? Benutzt werden + Infinitiv.', stufe: 3, karten: [
        { titel: 'Zukunft', text: ['In 30 Jahren wird es …', 'Wir werden vielleicht …', 'Es wird mehr / weniger … geben.'] },
        { titel: 'Meinung', text: ['Ich hoffe, dass …', 'Ich befürchte, dass …', 'Wir sollten …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Futur I: werden + Infinitiv', punkte: ['Es **wird** wärmer **werden**.', 'Hitzewellen **werden** häufiger **kommen**.', 'Wir **werden** mehr Strom aus der Sonne **nutzen**.', '**werden** an Position 2, **Infinitiv am Ende**.', 'Mit Zeitangabe geht auch Präsens: Morgen **regnet** es.'] },
         { titel: 'Diagramme beschreiben', punkte: ['Die Kurve **steigt** / **fällt** / **bleibt gleich**.', 'Sie steigt **stark** / **leicht**.', 'Von 1900 **bis** 1950 stieg die Temperatur **um** 0,25 Grad.', '**Seit** 2000 steigt sie schneller.', 'Der **höchste** Wert liegt bei …'] }],
        [{ art: 'tipp', titel: 'Kurvendiagramm lesen', text: '1. **Titel**: Worum geht es? 2. **Achsen**: Was steht unten (Zeit), was links (Wert)? 3. **Verlauf**: Wo steigt, wo fällt die Kurve?' },
         { art: 'achtung', titel: 'werden hat drei Aufgaben', text: 'Ich **werde** Elektrikerin. (Beruf) · Es **wird** wärmer **werden**. (Zukunft) · Strom **wird** aus Wind **gemacht**. (Passiv)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze werden in der richtigen Form.', stufe: 1, saetze: ['In Zukunft [wird] es mehr heiße Tage geben.', 'Wir [werden] mehr mit dem Rad fahren.', '[Wirst] du später ein Elektroauto kaufen?', 'Die Sommer [werden] trockener werden.', 'Ich [werde] weniger Fleisch essen.'] },
      { art: 'abschreiben', auftrag: 'Schreib im Futur I.', stufe: 2, kopf: ['Präsens', 'Futur I'], saetze: [['Es gibt mehr Hitzewellen.', 'Es wird mehr Hitzewellen geben.'], ['Wir sparen Energie.', 'Wir werden Energie sparen.'], ['Im Winter fällt weniger Schnee.', 'Im Winter wird weniger Schnee fallen.']] },
      { art: 'fragen', auftrag: 'Beschreib das Diagramm in drei Sätzen.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Die Kurve zeigt, wie viel wärmer es seit 1900 geworden ist. Bis 1975 steigt sie nur leicht. Seit etwa 2000 steigt sie stark; 2020 liegt der Wert bei etwa 1,2 Grad.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wie wird das Leben in 30 Jahren sein? Was wird sich durch das Klima ändern? Was wirst du tun?', stufe: 2,
        anfaenge: ['In 30 Jahren wird …', 'Es wird mehr / weniger …', 'Vielleicht werden wir …', 'Ich werde …, weil …'], zeilen: 10,
        beispiel: 'In 30 Jahren wird es in Luxemburg mehr heiße Sommertage geben. Im Winter wird es weniger Schnee geben. Vielleicht werden wir öfter mit dem Bus oder mit Elektroautos fahren. Ich werde oft das Fahrrad benutzen, weil es gesund und gut für das Klima ist.' },
    ],
    check: ['Ich lese ein Kurvendiagramm.', 'Ich verstehe einen Sachtext über das Klima.', 'Ich verstehe einen Radiobeitrag mit Tipps.', 'Ich benutze das Futur mit werden.', 'Ich beschreibe, wie sich etwas entwickelt.'],
  },
  // ================================================================ 6
  {
    thema: 'Energiequellen · Fachsprache', titel: 'Strom aus Wind und Sonne', untertitel: 'Ein Sachtext über Energiequellen und eine Reportage von der Einweihung eines Windparks: Du verstehst Fachwörter und befragst Leute spontan.',
    ziel: { de: 'Ich verstehe Texte über Energiequellen und befrage Personen zu einem Ereignis.', fr: 'Je comprends des textes sur les sources d’énergie et j’interroge des personnes sur un événement.' },
    bild: ['lina:froh:handy', 'chef:stolz:stehen'],
    start: {
      was: 'Erneuerbar oder endlich?',
      aufgaben: [
        { art: 'rf', auftrag: 'Erneuerbar (kommt immer wieder) oder endlich (ist irgendwann verbraucht)? Kreuze an.', stufe: 1, spalten: ['erneuerbar', 'endlich'], saetze: [['Wind', true], ['Erdöl', false], ['Sonne', true], ['Erdgas', false], ['Wasserkraft', true], ['Kohle', false]] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext über Energiequellen', art: 'text', stimme: 'm1', nummern: true,
      quelle: 'Sachtext (vereinfacht)', titel: 'Woher kommt unser Strom?',
      absaetze: [
        'Lange Zeit wurde Strom vor allem aus **Kohle**, **Erdöl** und **Erdgas** gemacht. Diese **fossilen Energieträger** sind vor Millionen von Jahren aus Pflanzen und Tieren entstanden. Ihre Vorräte sind **endlich**: Irgendwann sind sie verbraucht.',
        'Beim Verbrennen entsteht **CO₂**, das das Klima erwärmt. Deshalb setzen viele Länder auf **erneuerbare Energien**: Wind, Sonne, Wasser und Biomasse. Sie gehen nicht aus.',
        'Ein **Windrad** funktioniert so: Der Wind dreht die Rotorblätter. Im Inneren treibt die Drehung einen **Generator** an, der Strom erzeugt. Eine **Solaranlage** wandelt Sonnenlicht direkt in Strom um.',
        'Erneuerbare Energien haben aber auch **Nachteile**: Wenn kein Wind weht und die Sonne nicht scheint, gibt es weniger Strom. Darum braucht man **Speicher**, zum Beispiel große Batterien.',
        'Luxemburg kauft einen großen Teil seines Stroms im Ausland. Gleichzeitig entstehen im Land immer mehr Windräder und Solaranlagen.',
      ],
      woerter: [['der Energieträger', 'la source d’énergie'], ['fossil', 'fossile'], ['der Vorrat', 'la réserve'], ['endlich', 'épuisable'], ['erneuerbar', 'renouvelable'], ['das Rotorblatt', 'la pale'], ['erzeugen', 'produire'], ['der Speicher', 'le stockage']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Erkläre die Fachwörter mit eigenen Worten.', stufe: 2, kopf: ['Fachwort', 'Erklärung'], breiten: [34, 66], zeilen: [['fossile Energieträger', '[Kohle, Erdöl, Erdgas – aus alten Pflanzen und Tieren entstanden]'], ['erneuerbare Energien', '[Energie aus Wind, Sonne, Wasser – geht nicht aus]'], ['Generator', '[Maschine, die aus einer Drehung Strom macht]'], ['Speicher', '[hebt Strom für später auf, z. B. eine große Batterie]']] },
        { art: 'ordnen', auftrag: 'Wie entsteht Strom im Windrad? Nummeriere.', stufe: 1, teile: ['Der Wind weht.', 'Die Rotorblätter drehen sich.', 'Die Drehung treibt den Generator an.', 'Der Generator erzeugt Strom.', 'Der Strom fließt ins Netz.'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    hoeren: {
      was: 'Eine Reportage mit spontanen Interviews', wo: 'Reportage · Einweihung eines Windparks', titel: 'Fünf neue Windräder',
      situation: 'Lina macht für das Schulradio eine Reportage von der Einweihung eines Windparks im Norden (ausgedachter Windpark). Sie befragt spontan zwei Personen.',
      bild: ['lina:froh:handy', 'chef:stolz:stehen'], sprecher: { Lina: 'w2', 'Herr Weiler': 'm2', Anwohnerin: 'w1' },
      text: [
        ['Lina', 'Hallo aus dem Norden! Hier werden heute fünf neue Windräder eingeweiht. Neben mir steht Herr Weiler, der Projektleiter. Herr Weiler, wie groß sind die Windräder?'],
        ['Herr Weiler', 'Jedes Windrad ist ungefähr zweihundert Meter hoch – mit den Rotorblättern. Zusammen erzeugen sie Strom für etwa zehntausend Haushalte.'],
        ['Lina', 'Wie lange hat der Bau gedauert?'],
        ['Herr Weiler', 'Gut ein Jahr. Aber die Planung hat fast sechs Jahre gedauert, weil wir viele Gutachten brauchten, zum Beispiel zum Schutz von Vögeln.'],
        ['Lina', 'Danke! Hier steht auch eine Frau aus dem Dorf. Entschuldigung, darf ich Sie kurz fragen: Wie finden Sie den Windpark?'],
        ['Anwohnerin', 'Am Anfang war ich dagegen. Ich hatte Angst vor dem Lärm. Jetzt höre ich fast nichts. Und ich finde gut, dass der Strom von hier kommt.'],
        ['Lina', 'Gibt es auch etwas, was Sie stört?'],
        ['Anwohnerin', 'Ehrlich gesagt: der Blick. Die Landschaft sieht jetzt anders aus. Aber für das Klima akzeptiere ich das.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „einweihen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas Neues offiziell eröffnen', 'etwas kaputt machen', 'etwas verkaufen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Zahlen.', stufe: 1, kopf: ['', 'Info'], breiten: [40, 60], zeilen: [['Zahl der Windräder', '[fünf]'], ['Höhe', '[etwa 200 Meter]'], ['Strom für', '[etwa 10 000 Haushalte]'], ['Bauzeit', '[gut ein Jahr]'], ['Planung', '[fast sechs Jahre]']] },
        { art: 'rf', auftrag: 'Was sagt die Anwohnerin? Richtig oder falsch?', stufe: 2, saetze: [['Sie war am Anfang für den Windpark.', false], ['Sie hört jetzt fast keinen Lärm.', true], ['Sie findet gut, dass der Strom von hier kommt.', true], ['Der Blick auf die Landschaft stört sie.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine Reportage: Eine Person befragt spontan Leute bei einem Ereignis (Schulfest, Sportturnier, Eröffnung).', stufe: 3, karten: [
        { titel: 'Reporter/in', text: ['Entschuldigung, darf ich Sie kurz fragen …?', 'Wie finden Sie …?', 'Gibt es auch etwas, was Sie stört?', 'Vielen Dank!'] },
        { titel: 'Befragte', text: ['Am Anfang …, jetzt …', 'Ich finde gut, dass …', 'Ehrlich gesagt …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Merkmale von Fachsprache', punkte: ['**Fachwörter:** Generator, Rotorblatt, Energieträger', '**Lange Nomen:** die Strom|erzeugung, der Energie|verbrauch', '**Passiv:** Strom **wird** erzeugt.', '**Genaue Zahlen:** 200 Meter, 10 000 Haushalte'] },
         { titel: 'Präpositionalattribute (Wiederholung)', punkte: ['Strom **aus Wind und Sonne**', 'ein Windrad **mit drei Rotorblättern**', 'die Angst **vor dem Lärm**', 'Gutachten **zum Schutz von Vögeln**'] }],
        [{ art: 'tipp', titel: 'Fachwörter verstehen', text: 'Zerlege das Wort: **Wind|rad**, **Solar|anlage**. Suche **bekannte Teile**. Frag: **Was bedeutet …?** Oder schlag im Wörterbuch nach.' },
         { art: 'achtung', titel: 'Große Zahlen sprechen', text: '10 000 = **zehntausend** · 200 = **zweihundert** · 1,5 = **eins Komma fünf** · 2021 = **zweitausendeinundzwanzig**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Fachwörter.', stufe: 1, woerter: ['erneuerbar', 'fossil', 'endlich', 'Generator', 'Speicher'], saetze: ['Wind und Sonne sind [erneuerbar].', 'Kohle und Erdöl sind [fossil]. Ihre Vorräte sind [endlich].', 'Der [Generator] erzeugt im Windrad den Strom.', 'Ein [Speicher] hebt Strom für später auf.'] },
      { art: 'zuordnen', auftrag: 'Bilde zusammengesetzte Nomen. Verbinde.', stufe: 2, links: ['Wind', 'Solar', 'Strom', 'Wärme', 'Rotor'], rechts: ['rad', 'anlage', 'zähler', 'pumpe', 'blatt'], ordnung: [2, 0, 4, 1, 3] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Bericht für das Schulradio über ein Ereignis in deinem Ort (Eröffnung, Fest, Aktion – echt oder erfunden). Benutze Zahlen und ein Zitat.', stufe: 2,
        anfaenge: ['Am … wurde in … eröffnet.', 'Es gibt …', 'Herr / Frau … sagte: „…“', 'Viele Besucher fanden …', 'Mein Eindruck: …'], zeilen: 11,
        beispiel: 'Am Samstag wurde in unserem Dorf ein neuer Spielplatz eröffnet. Es gibt eine Seilbahn, zwei Schaukeln und einen Kletterturm. Die Bürgermeisterin sagte: „Hier können sich jetzt alle Generationen treffen.“ Viele Besucher fanden die Seilbahn am besten. Mein Eindruck: Es war ein schönes Fest, nur der Parkplatz war zu klein.' },
    ],
    check: ['Ich verstehe einen Sachtext über Energiequellen.', 'Ich verstehe eine Reportage.', 'Ich befrage spontan Personen zu einem Ereignis.', 'Ich erkenne Merkmale von Fachsprache.', 'Ich schreibe einen kurzen Bericht.'],
  },
  // ================================================================ 7
  {
    thema: 'Gemeinsam entscheiden · Vorschläge', titel: 'Unsere Schule wird grün', untertitel: 'Ein Protokoll der Schülervertretung, eine Gruppendiskussion und ein Antrag an die Direktion: Ihr trefft gemeinsam Entscheidungen.',
    ziel: { de: 'Ich mache Vorschläge, diskutiere in der Gruppe und treffe gemeinsam Entscheidungen.', fr: 'Je fais des propositions, je discute en groupe et nous prenons des décisions ensemble.' },
    bild: ['chloe:froh:erklaeren', 'ben:froh'],
    start: {
      was: 'Ideen für die Schule',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bewirkt die Idee? Verbinde.', stufe: 1, links: ['einen Trinkbrunnen aufstellen', 'Licht mit Bewegungsmelder', 'Fahrradständer bauen', 'einen Schulgarten anlegen', 'eine Tauschbörse machen'], rechts: ['weniger Plastikflaschen', 'weniger Strom', 'mehr Leute kommen mit dem Rad', 'Platz für Bienen und Gemüse', 'Bücher und Kleidung werden weiterbenutzt'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Protokoll', art: 'dokumente',
      quelle: 'Schülervertretung (ausgedachte Schule)', titel: 'Wie wird unsere Schule umweltfreundlicher?',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: '**Protokoll der Schülervertretung** – Sitzung vom 12. März', text: ['**Anwesend:** 9 Klassensprecherinnen und Klassensprecher, Frau Sommer (Begleitung)', '**Thema:** Wie kann unsere Schule umweltfreundlicher werden?', '**Ideen:** 1. Trinkbrunnen in der Pausenhalle · 2. Mülltrennung in allen Klassen · 3. Schulgarten hinter der Turnhalle · 4. „Licht aus“-Team in jeder Klasse · 5. Fahrradständer mit Dach', '**Abstimmung** (jede Person hat zwei Stimmen): Trinkbrunnen 7 · Fahrradständer 5 · Schulgarten 4 · Mülltrennung 2 · „Licht aus“-Team 0', '**Beschluss:** Wir schreiben einen Antrag an die Direktion für einen Trinkbrunnen. Verantwortlich: Chloe und Ben. Frist: 26. März.'] },
      ],
      woerter: [['das Protokoll', 'le compte rendu'], ['anwesend', 'présent'], ['die Abstimmung', 'le vote'], ['die Stimme', 'la voix (vote)'], ['der Beschluss', 'la décision'], ['der Antrag', 'la demande officielle'], ['verantwortlich', 'responsable'], ['die Frist', 'le délai']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 1, fragen: [{ f: 'Welche Idee hat die meisten Stimmen bekommen?', l: 'der Trinkbrunnen (7 Stimmen)' }, { f: 'Wer schreibt den Antrag?', l: 'Chloe und Ben' }, { f: 'Bis wann muss der Antrag fertig sein?', l: 'bis zum 26. März' }] },
        { art: 'tabelle', auftrag: 'Schreib die Abstimmung als Rangliste.', stufe: 2, kopf: ['Platz', 'Idee', 'Stimmen'], breiten: [16, 62, 22], zeilen: [['1', '[Trinkbrunnen]', '[7]'], ['2', '[Fahrradständer mit Dach]', '[5]'], ['3', '[Schulgarten]', '[4]'], ['4', '[Mülltrennung in allen Klassen]', '[2]']] },
      ],
    },
    hoeren: {
      was: 'Eine Gruppendiskussion', wo: 'Gruppenarbeit · Klassenzimmer', titel: 'Wie überzeugen wir die Direktion?',
      situation: 'Chloe und Ben planen den Antrag für den Trinkbrunnen. Amira hilft. Sie müssen sich einigen, wer was macht.',
      bild: ['chloe:froh:erklaeren', 'ben:verwirrt'], sprecher: { Chloe: 'w2', Ben: 'm3', Amira: 'w3' },
      text: [
        ['Chloe', 'Also, wir brauchen gute Argumente für die Direktion. Was meint ihr?'],
        ['Ben', 'Ich würde mit dem Müll anfangen. Jeden Tag werden hier bestimmt hundert Plastikflaschen weggeworfen.'],
        ['Amira', 'Das stimmt, aber wir sollten das genau zählen. Mit echten Zahlen wären wir überzeugender.'],
        ['Chloe', 'Gute Idee! Wir könnten eine Woche lang die Flaschen in den Mülleimern zählen.'],
        ['Ben', 'Und was ist mit den Kosten? Die Direktion fragt bestimmt, wie viel so ein Brunnen kostet.'],
        ['Amira', 'Ich schlage vor, dass wir bei zwei Firmen nach Preisen fragen. Dann können wir vergleichen.'],
        ['Chloe', 'Einverstanden. Dann machen wir es so: Ben zählt die Flaschen, Amira fragt die Firmen, und ich schreibe den Antrag. Sind alle dafür?'],
        ['Ben', 'Ja, abgemacht!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie macht man in einer Gruppe einen Vorschlag? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich schlage vor, dass …', 'Wir könnten …', 'Das machen wir so, Punkt!'], r: [0, 1] }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer sagt oder macht das?', stufe: 1, personen: ['Chloe', 'Ben', 'Amira'], saetze: [['… will mit dem Müll anfangen.', 'Ben'], ['… möchte echte Zahlen.', 'Amira'], ['… fragt nach den Kosten.', 'Ben'], ['… fragt bei zwei Firmen nach Preisen.', 'Amira'], ['… schreibt den Antrag.', 'Chloe']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Entscheidet in der Gruppe: Welches Umweltprojekt wollt ihr an eurer Schule starten? Verteilt am Ende die Aufgaben.', stufe: 3, karten: [
        { titel: 'Vorschlagen', text: ['Ich schlage vor, dass …', 'Wir könnten …', 'Es wäre gut, wenn …'] },
        { titel: 'Diskutieren', text: ['Das stimmt, aber …', 'Was meint ihr?'] },
        { titel: 'Entscheiden', text: ['Sind alle dafür?', 'Dann machen wir es so: …', 'Wer übernimmt …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vorschläge mit Konjunktiv II', punkte: ['Wir **könnten** die Flaschen zählen.', 'Es **wäre** gut, wenn wir einen Brunnen **hätten**.', 'Mit echten Zahlen **wären** wir überzeugender.', 'Ich **würde** mit dem Müll anfangen.'] },
         { titel: 'Ein Antrag', punkte: ['**Betreff:** Antrag auf …', '**Wer** stellt den Antrag?', '**Was** wünschen wir uns? **Warum**? (Argumente, Zahlen)', '**Was** kostet es? **Wer** hilft?', '**Bitte** um Antwort bis …'] }],
        [{ art: 'tipp', titel: 'Gute Gruppenarbeit', text: 'Eine Person **leitet**, eine **schreibt mit**. Jede Meinung wird gehört. Am Ende: **Wer** macht **was** bis **wann**?' },
         { art: 'achtung', titel: 'möglich oder nur vorgestellt?', text: 'Möglich: **Wenn** wir einen Brunnen **haben**, **trinken** wir mehr Wasser. Nur vorgestellt: **Wenn** wir einen Brunnen **hätten**, **würden** wir mehr Wasser **trinken**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: könnten, wäre, hätten, würde.', stufe: 1, woerter: ['könnten', 'wäre', 'hätten', 'würde'], saetze: ['Wir [könnten] einen Schulgarten anlegen.', 'Es [wäre] schön, wenn wir mehr Bäume [hätten].', 'Ich [würde] einen Fahrradständer bauen.'] },
      { art: 'abschreiben', auftrag: 'Mach aus „möglich“ ein „nur vorgestellt“.', stufe: 2, kopf: ['möglich', 'nur vorgestellt'], saetze: [['Wenn wir Geld haben, kaufen wir einen Brunnen.', 'Wenn wir Geld hätten, würden wir einen Brunnen kaufen.'], ['Wenn die Schule einen Garten hat, pflanzen wir Gemüse.', 'Wenn die Schule einen Garten hätte, würden wir Gemüse pflanzen.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Antrag an die Direktion für ein Umweltprojekt an deiner Schule (echt oder erfunden).', stufe: 2,
        anfaenge: ['Betreff: Antrag auf …', 'Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,', 'die Schülervertretung möchte …', 'Dafür spricht, dass …', 'Es wäre schön, wenn …', 'Mit freundlichen Grüßen'], zeilen: 12,
        beispiel: 'Betreff: Antrag auf einen Trinkbrunnen. Sehr geehrte Frau Direktorin, die Schülervertretung möchte einen Trinkbrunnen in der Pausenhalle. Dafür spricht, dass jeden Tag über 80 Plastikflaschen weggeworfen werden. Ein Brunnen kostet etwa 3000 Euro. Es wäre schön, wenn wir bis zum Sommer eine Antwort bekommen könnten. Mit freundlichen Grüßen, Chloe und Ben' },
    ],
    check: ['Ich verstehe ein Protokoll.', 'Ich verstehe eine Gruppendiskussion.', 'Ich mache Vorschläge mit könnte, wäre, würde.', 'Ich treffe mit der Gruppe Entscheidungen.', 'Ich schreibe einen Antrag.'],
  },
  // ================================================================ 8
  {
    thema: 'Trends · Anfragen', titel: 'Wie entsteht ein Trend?', untertitel: 'Ein Artikel über Trends, eine Befragung zu einem neuen Produkt und eine Anfrage zu einem Angebot: Du verstehst, warum viele kaufen, was alle kaufen.',
    ziel: { de: 'Ich verstehe, wie Trends entstehen, mache bei einer Befragung mit und frage schriftlich nach Informationen.', fr: 'Je comprends comment naissent les tendances, je participe à un sondage et je demande des informations par écrit.' },
    bild: ['mia:froh:handy', 'sami:froh:laessig'],
    start: {
      was: 'Trend-Wörter',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['der Trend', 'der Hype', 'die Werbeikone', 'die Marktforschung', 'Second-Hand'], rechts: ['eine Mode, bei der viele mitmachen', 'sehr großer Wirbel um etwas Neues', 'eine Figur oder Person, die für eine Marke steht', 'Firmen fragen Kunden, was sie wollen', 'schon einmal benutzt, aus zweiter Hand'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Artikel über Trends', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Jugendmagazin · Hintergrund', titel: 'Vom Schulhof bis ins Kaufhaus',
      absaetze: [
        'Plötzlich tragen alle die gleichen Schuhe, hören dasselbe Lied oder benutzen dieselbe App. Wie passiert das? Ein **Trend** hat oft mehrere Phasen.',
        '**Phase 1:** Wenige Menschen probieren etwas Neues aus – zum Beispiel Skater, Musikerinnen oder Leute in einer Großstadt. Man nennt sie **Trendsetter**.',
        '**Phase 2:** Andere sehen es, oft in sozialen Netzwerken. Influencer zeigen es, und Firmen erkennen: Damit kann man Geld verdienen. Sie machen **Werbung**, manchmal mit einer bekannten Figur, einer **Werbeikone**.',
        '**Phase 3:** Jetzt machen sehr viele mit. Das Produkt gibt es in jedem Geschäft. Für die Trendsetter ist es aber nicht mehr spannend – sie suchen schon etwas Neues.',
        '**Phase 4:** Der Trend wird langweilig und verschwindet. Manche Trends kommen nach Jahren zurück: Was vor dreißig Jahren modern war, ist heute wieder **„vintage“**. Ein aktueller Trend ist übrigens **Second-Hand**: gut für den Geldbeutel und für die Umwelt.',
      ],
      woerter: [['ausprobieren', 'essayer'], ['der Trendsetter', 'celui qui lance une mode'], ['die sozialen Netzwerke', 'les réseaux sociaux'], ['erkennen', 'reconnaître'], ['verdienen', 'gagner (de l’argent)'], ['verschwinden', 'disparaître'], ['vintage', 'rétro'], ['der Geldbeutel', 'le porte-monnaie']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Bring die Phasen eines Trends in die richtige Reihenfolge.', stufe: 1, teile: ['Wenige probieren etwas Neues aus.', 'Andere sehen es in sozialen Netzwerken.', 'Firmen machen Werbung.', 'Sehr viele machen mit.', 'Der Trend wird langweilig und verschwindet.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Wer sind die Trendsetter?', zeilen: 2, l: 'Menschen, die als Erste etwas Neues ausprobieren, zum Beispiel Skater oder Musikerinnen.' }, { f: 'Warum ist Second-Hand ein guter Trend?', l: 'Er ist gut für den Geldbeutel und für die Umwelt.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Befragung zu einem neuen Produkt', wo: 'Einkaufszentrum · Befragung', titel: 'Haben Sie kurz Zeit?',
      situation: 'Mia wird in einem Einkaufszentrum zu einem neuen Produkt befragt: einer Trinkflasche, die anzeigt, wann man trinken sollte.',
      bild: ['chef:froh:blatt', 'mia:verwirrt'], sprecher: { Interviewer: 'm1', Mia: 'w2' },
      text: [
        ['Interviewer', 'Entschuldigung, haben Sie kurz Zeit für eine Befragung? Es dauert nur fünf Minuten.'],
        ['Mia', 'Ja, okay. Worum geht es?'],
        ['Interviewer', 'Um eine neue Trinkflasche. Sie zeigt mit einem Licht an, wann man wieder trinken sollte. Würden Sie so eine Flasche kaufen?'],
        ['Mia', 'Hm, vielleicht. Wie viel würde sie denn kosten?'],
        ['Interviewer', 'Ungefähr fünfunddreißig Euro. Wäre Ihnen das zu teuer?'],
        ['Mia', 'Ehrlich gesagt, ja. Für fünfunddreißig Euro würde ich sie nicht kaufen. Für fünfzehn vielleicht.'],
        ['Interviewer', 'Und was ist Ihnen bei einer Trinkflasche wichtig?'],
        ['Mia', 'Dass sie dicht ist, nicht kaputtgeht und dass man sie gut spülen kann. Das Licht brauche ich eigentlich nicht.'],
        ['Interviewer', 'Vielen Dank für Ihre Antworten! Als Dankeschön bekommen Sie einen Gutschein für das Café.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Marktforschung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Eine Firma fragt Menschen nach ihrer Meinung zu einem Produkt.', 'Man kauft auf dem Markt ein.'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was kann die neue Trinkflasche?', o: ['Sie kühlt das Wasser.', 'Sie zeigt mit einem Licht an, wann man trinken sollte.'], r: 1 }, { f: 'Wie viel soll sie kosten?', o: ['15 Euro', '35 Euro', '50 Euro'], r: 1 }, { f: 'Was ist Mia wichtig?', o: ['das Licht', 'dicht, stabil und gut zu spülen'], r: 1 }, { f: 'Was bekommt Mia als Dankeschön?', o: ['eine Flasche', 'einen Gutschein für das Café'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst eine Befragung zu einem erfundenen Produkt. Stellt Fragen mit würde und notiert die Antworten.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Würdest du … kaufen?', 'Wie viel würdest du dafür bezahlen?', 'Was ist dir wichtig?'] },
        { titel: 'Antworten', text: ['Ich würde …, wenn …', 'Für … Euro würde ich …', 'Mir ist wichtig, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Höflich fragen und antworten', punkte: ['**Würden** Sie so eine Flasche kaufen?', '**Wäre** Ihnen das zu teuer?', '**Könnten** Sie mir mehr Informationen schicken?', 'Ich **hätte** gern einen Prospekt.'] },
         { titel: 'Auf eine Anzeige reagieren', punkte: ['**Bezug:** Ich habe Ihre Anzeige … gelesen.', '**Fragen:** Ich möchte gern wissen, **ob** … / **wie lange** … / **was** …', '**Bitte:** Könnten Sie mir … schicken?', '**Dank und Gruß**'] }],
        [{ art: 'tipp', titel: 'Vor einem Vertrag fragen', text: 'Bei Angeboten immer fragen: **Wie lange** läuft der Vertrag? **Was kostet** es danach? **Wie** kann man kündigen?' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 7)', text: 'Indirekte Fragen: Ich möchte wissen, **ob** der Preis auch nach drei Monaten **gilt**.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Mach eine höfliche Frage mit „Ich möchte gern wissen, …“.', stufe: 2, kopf: ['direkte Frage', 'höfliche Frage'], saetze: [['Wie lange läuft der Vertrag?', 'Ich möchte gern wissen, wie lange der Vertrag läuft.'], ['Gilt das Angebot auch online?', 'Ich möchte gern wissen, ob das Angebot auch online gilt.'], ['Was kostet der Tarif nach drei Monaten?', 'Ich möchte gern wissen, was der Tarif nach drei Monaten kostet.']] },
      { art: 'luecken', auftrag: 'Ergänze: Würden, Wäre, Könnten, hätte.', stufe: 1, woerter: ['Würden', 'Wäre', 'Könnten', 'hätte'], saetze: ['[Würden] Sie das Produkt kaufen?', '[Wäre] Ihnen das zu teuer?', '[Könnten] Sie mir einen Prospekt schicken?', 'Ich [hätte] gern mehr Informationen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Du hast eine Anzeige gesehen (Sportkurs, Sprachreise, Handytarif …). Schreib eine E-Mail und bitte um genauere Informationen.', stufe: 2,
        anfaenge: ['Betreff: Anfrage zu Ihrem Angebot …', 'Sehr geehrte Damen und Herren,', 'ich habe Ihre Anzeige … gelesen.', 'Ich möchte gern wissen, ob …', 'Könnten Sie mir bitte …?', 'Mit freundlichen Grüßen'], zeilen: 11,
        beispiel: 'Betreff: Anfrage zu Ihrem Kletterkurs. Sehr geehrte Damen und Herren, ich habe Ihre Anzeige für den Kletterkurs im Sommer gelesen. Ich möchte gern wissen, ob man auch ohne Erfahrung mitmachen kann. Außerdem möchte ich wissen, was der Kurs kostet und ob man Schuhe leihen kann. Könnten Sie mir bitte einen Prospekt schicken? Mit freundlichen Grüßen, Sami' },
    ],
    check: ['Ich verstehe einen Artikel darüber, wie Trends entstehen.', 'Ich verstehe eine Befragung zu einem Produkt.', 'Ich frage höflich mit würde, wäre, könnte.', 'Ich reagiere auf eine Anzeige.', 'Ich bitte schriftlich um genauere Informationen.'],
  },
]
