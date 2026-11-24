// Lycée-Simulator – Kapitel 5 „Gerüchte“ (vierte Woche). Nach der Jugend-Kritik (November 2026, Panel K./S./D.):
// echte Zwickmühlen, jede Wahl kostet etwas, Folgen kommen von Menschen und hängen von früheren Entscheidungen ab.
// Situationen: aus der Klassengruppe geworfen und ein Bild von dir geht rum · ein Gerücht (du und Mila) · ein schlechter
// Morgen nach Stress zuhause · ein Lehrer beschuldigt dich zu Unrecht · Freitag: was von allem übrig bleibt.
// Kurze Sätze, keine Moral-Stimme, Erwachsene dürfen müde und ungerecht sein. Niemand muss Persönliches erzählen.

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE_SITZT = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 0, 1) };

// Neue Stärken: nicht nur die „brave“ Antwort zählt (Vorschlag der Kritiker)
export const STAERKEN5 = {
  humor: { name: 'Die Lage entschärfen', text: 'Ein Spruch, und die Luft war raus.' },
  loyal: { name: 'Zu jemandem halten', text: 'Du hast jemanden nicht hängen lassen.' },
  abstand: { name: 'Abstand nehmen', text: 'Du bist gegangen, bevor es knallt.' },
  lesen: { name: 'Die Lage lesen', text: 'Du hast gemerkt, was gerade wirklich los ist.' },
};

export const SCHRITTE5 = [
  { id: 'k5_gruppe', kap: 5, tag: 'Montag', uhr: 12.75, titel: 'Die Gruppe', ziel: 'Mittagspause. Geh unters Vordach.', marker: 'preau',
    start: { teleport: 'eingangHof', gespraech: 'k5_intro' },
    leute: { noah: [16.6, 2.6, 0.8, 'redet'], ayla: [17.9, 3.8, -2.2, 'redet'], jo: [24.6, 6.4, -1.2, 'redet'], ben: [23.4, 7.4, 2.4, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { ort: 'preau', r: 3.2, gespraech: 'rausgeworfen' } },
  { id: 'k5_geruecht', kap: 5, tag: 'Dienstag', uhr: 12.35, titel: 'Was man so hört', ziel: 'Hol dir ein Essen. Ayla steht in der Schlange.', marker: 'ayla',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], ayla: [23.4, -9.6, -Math.PI / 2], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], luca: [16.65, -11.1, -Math.PI / 2, 'sitzt'], ben: [16.65, -10.1, -Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'ayla', gespraech: 'geruecht' } },
  { id: 'k5_morgen', kap: 5, tag: 'Mittwoch', uhr: 8.0, titel: 'Ein schlechter Morgen', ziel: 'Setz dich auf deinen Platz.', marker: 'meinPlatz',
    start: { teleport: 'saal104Tuer', gespraech: 'k5_mi' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { ort: 'meinPlatz', r: 1.1, gespraech: 'zuhause' } },
  { id: 'k5_unfair', kap: 5, tag: 'Donnerstag', uhr: 8.35, titel: 'Raus!', ziel: 'Französisch bei Mme Tidderich. Setz dich.', marker: 'meinPlatz',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { ort: 'meinPlatz', r: 1.1, gespraech: 'unfair' } },
  { id: 'k5_heim', kap: 5, tag: 'Freitag', uhr: 15.5, titel: 'Freitag', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-25.6, 42.0, -0.3], lina: [-16.2, 42.8, -1.2], jo: [-17.6, 42.6, -1.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'k5_ende' } },
];

export const GESPRAECHE5 = {
  k5_intro: [
    ['erzaehler', 'Vierte Woche. Montag, Mittagspause.'],
  ],
  rausgeworfen: [
    { tu: 'entfernt' },
    ['erzaehler', 'Gruppe: „7P2 ohne Lehrer“. 19 Leute. Jetzt 18.'],
    ['erzaehler', 'Drüben lachen Jo und Ben über ein Handy.'],
    ['erzaehler', 'Noah schaut zu dir. Dann schnell weg.'],
    { wahl: [
      { t: 'Zu Jo: „Problem?“', staerke: 'klar', merke: 'joGefragt', dann: [
        ['jo', 'Ich? Nö. War voll. Zu viele Leute.'],
        ['ben', '(prustet)'],
        ['jo', 'Mach doch ’ne eigene Gruppe.'] ] },
      { t: 'Noah: „Was schreiben die?“', merke: 'noahGefragt', dann: [
        ['noah', 'Nix. Echt.'],
        ['noah', '… Okay. Ein Bild von dir. Mit Sticker.'],
        { wahl: [
          { t: '„Zeig her.“', dann: [{ tu: 'screenshotDu' }] },
          { t: '„Will ich nicht sehen.“', staerke: 'abstand', dann: [['noah', 'Besser so.']] },
          { t: '„Und du bist noch drin?“', herz: { noah: -1 }, dann: [['noah', '… Wenn ich rausgeh, bin ich der Nächste.']] },
        ] } ] },
      { t: 'So tun, als wär’s egal. Musik an.', staerke: 'ruhig', merke: 'egalGetan', dann: [
        ['erzaehler', 'Kopfhörer rein. Die Musik ist zu laut. Hilft halb.'] ] },
      { t: 'Eigene Gruppe machen. Ohne Jo.', merke: 'eigeneGruppe', dann: [
        ['erzaehler', 'Du lädst ein: Noah, Mila, Yusuf, Lina.'],
        ['erzaehler', 'Yusuf tritt bei. Mila auch. Noah … liest nur.'] ] },
    ] },
  ],
  geruecht: [
    ['ayla', '(leise) Stimmt das mit dir und Mila?'],
    ['du', 'Was?'],
    ['ayla', 'Luca sagt, ihr seid zusammen. Weil ihr ständig redet.'],
    ['erzaehler', 'Zwei Tische weiter: Mila. Sie hat es gehört.'],
    ['stolz', 'Sag schnell nein. Laut. Sonst glaubt’s jeder.'],
    ['bauch', 'Mila guckt. Mila guckt genau jetzt.'],
    ['kopf', 'Egal was du sagst: Luca macht was draus.'],
    { wahl: [
      { t: '„Mila? Niemals. Ernsthaft.“', herz: { ayla: 1, mila: -2 }, merke: 'milaVerleugnet', dann: [
        ['ayla', 'Dacht ich mir. (lacht zu laut)'],
        ['erzaehler', 'Mila steht auf. Ihr Tablett ist noch halb voll.'] ] },
      { t: '„Und wenn? Was geht’s Luca an?“', staerke: 'mut', herz: { mila: 1 }, merke: 'geruechtStehen', dann: [
        ['ayla', 'Oh. Also doch?'],
        ['erzaehler', 'Bis zum Nachmittag weiß es die halbe Klasse.'] ] },
      { t: '„Wir sind Freunde. Mehr nicht.“', staerke: 'klar', herz: { mila: 1 }, dann: [
        ['ayla', 'Sagen alle.'] ] },
      { t: '„Luca ist nur eifersüchtig.“', staerke: 'humor', herz: { ayla: 1 }, merke: 'lucaEifersucht', dann: [
        ['ayla', '(lacht) Das sag ich ihm.'],
        ['erzaehler', 'Das war nicht der Plan.'] ] },
    ] },
    ['ayla', 'Und? Auf wen stehst du dann?'],
    { wahl: [
      { t: '„Sag ich dir nicht.“', staerke: 'klar', dann: [['ayla', 'Also gibt’s wen. Ich find’s raus.']] },
      { t: '„Auf niemanden.“', dann: [['ayla', 'Langweilig.']] },
      { t: '„Auf Kremers Curry.“', staerke: 'humor', herz: { ayla: 1, kremer: 1 }, dann: [['kremer', 'Hab ich gehört. Extra Portion.']] },
      { t: '(Tablett nehmen. Gehen.)', staerke: 'abstand', dann: [['ayla', 'Hey! Ich hab nur gefragt!']] },
    ] },
  ],
  k5_mi: [
    ['erzaehler', 'Mittwoch. Du hast vier Stunden geschlafen.'],
    ['erzaehler', 'Zuhause war es laut gestern. Bis spät.'],
    ['erzaehler', 'Die Hausaufgaben sind in der Tasche. Leer.'],
  ],
  zuhause: [
    { tu: 'setzen' },
    ['hoffmann', 'Ça va? Hausaufgaben auf den Tisch. Ich komm rum.'],
    ['hoffmann', '{name}?'],
    { wahl: [
      { t: '„Vergessen.“', merke: 'haVergessen', dann: [
        ['hoffmann', 'Schon wieder. Zettel nach Hause. Unterschrieben zurück.'] ] },
      { t: '„Zuhause war Stress.“', staerke: 'ehrlich', merke: 'haStress', dann: [
        ['erzaehler', 'Hinter dir wird es still. Ben dreht sich um.'],
        ['hoffmann', '(leiser) Okay. Nach der Stunde kurz?'],
        { wahl: [
          { t: '„Nee. Passt schon.“', dann: [['hoffmann', 'Okay. Dann bis Freitag nachreichen.']] },
          { t: '(Nicken.)', merke: 'hoffmannReden', dann: [] },
        ] } ] },
      { t: '„Liegt zuhause. Auf dem Tisch.“', merke: 'haLuege', dann: [
        ['hoffmann', 'Dann morgen. Ohne Ausrede.'],
        ['erzaehler', 'Heute Abend also: alte Aufgaben plus neue.'] ] },
      { t: '(Kopf auf den Tisch. Nichts sagen.)', merke: 'kopfTisch', dann: [
        ['hoffmann', '{name}. Hallo. Ich red mit dir.'],
        ['jo', 'Schläft. (Gelächter)'],
        { wahl: [
          { t: '„Lass mich einfach.“', herz: { hoffmann: -1 }, merke: 'angeblafft', dann: [
            ['hoffmann', 'Ton. Nach der Stunde bleibst du da.'] ] },
          { t: '„Sorry. Bin echt müde.“', staerke: 'ehrlich', dann: [
            ['hoffmann', 'Seh ich. Geh Wasser holen. Dann zurück.'] ] },
          { t: '„Halt die Klappe, Jo.“', herz: { jo: -1, hoffmann: -1 }, dann: [
            ['jo', 'Oh, wach.'], ['hoffmann', 'Beide. Ruhe. Jetzt.'] ] },
        ] } ] },
    ] },
    { tu: 'zuhauseFolge' },
  ],
  unfair: [
    { tu: 'setzen' },
    { tu: 'hoffmannGemerkt' },
    ['hoffmann', '(schreibt an die Tafel) Passé composé. Zum dritten Mal.'],
    ['erzaehler', 'Ein Papierball fliegt. Von Jo. Trifft die Tafel.'],
    ['erzaehler', 'Ayla prustet. Du auch. Kurz.'],
    ['hoffmann', '(dreht sich um) {name}. Das reicht. Raus.'],
    ['erzaehler', 'Jo schaut in sein Heft. Ganz brav.'],
    ['stolz', 'Das war JO. Sag das. Jetzt.'],
    ['bauch', 'Heiß im Gesicht. Alle gucken.'],
    ['kopf', 'Mme Tidderich hat sich schon entschieden. Später ist besser.'],
    { wahl: [
      { t: '„Ich war’s nicht! Echt jetzt!“', herz: { hoffmann: -1 }, merke: 'laut', dann: [
        ['hoffmann', 'Diskutieren kannst du draußen. Raus.'],
        ['erzaehler', 'Die Tür knallt. Lauter als gewollt.'] ] },
      { t: '„Das war Jo.“', staerke: 'ehrlich', herz: { jo: -2 }, merke: 'joVerpetzt', dann: [
        ['jo', 'Spinnst du? Beweis das.'],
        ['hoffmann', 'Ich hab gesehen, wer lacht. Raus.'] ] },
      { t: '(Aufstehen. Rausgehen. Nichts sagen.)', staerke: 'ruhig', herz: { jo: 1 }, merke: 'schuldGeschluckt', dann: [
        ['erzaehler', 'Zehn Minuten im Gang. An der Wand. Spinde zählen.'] ] },
      { t: '„Klar. Ich lach ja auch so laut.“', herz: { hoffmann: -1, ayla: 1 }, merke: 'sarkasmus', dann: [
        ['erzaehler', 'Ein paar lachen. Mme Tidderich nicht.'],
        ['hoffmann', 'Jetzt erst recht. Raus.'] ] },
      { t: '„Kann ich nach der Stunde was sagen?“', staerke: 'klar', merke: 'nachDerStunde', dann: [
        ['hoffmann', '… Okay. Aber jetzt raus.'] ] },
    ] },
    { tu: 'unfairDanach' },
  ],
  k5_ende: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Vierte Woche.'],
    { tu: 'k5Folgen' },
    ['fahrer', 'Dein Platz ist frei. Noah hat ihn mit einer Banane reserviert.'],
    { tu: 'kapitelEnde' },
  ],
};
