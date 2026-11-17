// Lycée-Simulator – Kapitel 7 „Praktikum“ (sechste Woche). Entwurf der zweiten Jugend-Kritik (Panel K./S./D.):
// „Praktikum ist das, was über die Lehre entscheidet. Und da hörst du zum ersten Mal ‚Nein‘ von einem Betrieb.“
// Zwei Wege über `wenn`: Werkstatt bei Meister Becker (wer im Schnuppertag „Holz“ gesagt hat) oder Kantine bei Frau Kremer.
// Viele frühere Entscheidungen kommen zurück (Portemonnaie, Unterschrift, Kenan am Tor, Gerücht mit Mila, Screenshot).
// Kurze Sätze, keine Moral-Stimme, Erwachsene mit Grenzen. Niemand muss Persönliches erzählen.

export const SCHRITTE7 = [
  { id: 'k7_liste', kap: 7, tag: 'Montag', uhr: 8.1, titel: 'Die Liste', ziel: 'An der Pinnwand hängt die Praktikumsliste.', marker: 'pinnwand',
    start: { teleport: 'halle', gespraech: 'k7_intro' },
    leute: { jo: [-5.4, -8.2, -1.8, 'redet'], noah: [-5.8, -10.2, -1.4], ayla: [-4.6, -9.4, -2.2, 'redet'] },
    fertig: { ort: 'pinnwand', r: 1.8, gespraech: 'k7_liste' } },
  { id: 'k7_vertrag', kap: 7, tag: 'Montag', uhr: 10.0, titel: 'Drei Unterschriften', ziel: 'Herr Kaya hat die Verträge. Geh zum SePAS.', marker: 'kaya',
    leute: { kaya: [-12, -6.6, Math.PI], noah: [-9.6, -9.8, 2.2] },
    fertig: { reden: 'kaya', gespraech: 'k7_vertrag' } },
  { id: 'k7_anruf', kap: 7, tag: 'Montag', uhr: 13.4, wenn: (m) => !m.berufHolz, titel: 'Ein Anruf', ziel: 'Ruf beim Bäcker an. Das Telefon ist im Sekretariat.', marker: 'weber',
    leute: { weber: [-21, -9.4, 0] },
    fertig: { reden: 'weber', gespraech: 'k7_anruf' } },
  { id: 'k7_kueche', kap: 7, tag: 'Dienstag', uhr: 7.6, wenn: (m) => !m.berufHolz, titel: 'Erster Tag: Küche', ziel: 'Melde dich bei Frau Kremer an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer', gespraech: 'k7_di' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], luca: [27.4, -7.4, -2.4] },
    fertig: { reden: 'kremer', gespraech: 'k7_kueche' } },
  { id: 'k7_werk', kap: 7, tag: 'Dienstag', uhr: 7.6, wenn: (m) => !!m.berufHolz, titel: 'Erster Tag: Werkstatt', ziel: 'Geh zur Werkbank. Kenan wartet.', marker: 'werkbank',
    start: { teleport: 'werkstatt', gespraech: 'k7_di' },
    leute: { becker: [-45.6, -18.0, -2.4], kenan: [-42.2, -19.8, Math.PI] },
    fertig: { ort: 'werkbank', r: 1.4, gespraech: 'k7_werk' } },
  { id: 'k7_pause', kap: 7, tag: 'Dienstag', uhr: 10.0, titel: 'Pause', ziel: 'Pause. Mila und Noah sitzen auf der Bank.', marker: 'mila',
    start: { teleport: 'eingangHof' },
    leute: { mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-18.6, 12.6, -2.4] },
    fertig: { reden: 'mila', gespraech: 'k7_pause' } },
  { id: 'k7_fehler', kap: 7, tag: 'Dienstag', uhr: 11.6, wenn: (m) => !!m.berufHolz, titel: 'Das falsche Loch', ziel: 'Meister Becker ruft dich.', marker: 'becker',
    start: { teleport: 'werkstatt' },
    leute: { becker: [-48, -13, 0], kenan: [-46.4, -14.0, -0.8] },
    fertig: { reden: 'becker', gespraech: 'k7_fehler' } },
  { id: 'k7_kasse', kap: 7, tag: 'Dienstag', uhr: 12.2, wenn: (m) => !m.berufHolz, titel: 'An der Kasse', ziel: 'Mittag. Frau Kremer stellt dich an die Kasse.', marker: 'kantineAusgabe',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9.8, -Math.PI / 2], luca: [23.0, -8.4, -Math.PI / 2], ben: [21.8, -8.4, -Math.PI / 2], yusuf: [20.6, -8.4, -Math.PI / 2] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'k7_kasse' } },
  { id: 'k7_heim', kap: 7, tag: 'Freitag', uhr: 15.5, titel: 'Der Bogen', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-25.6, 42.0, -0.3], jo: [-17.6, 42.6, -1.2], kenan: [-27, 41.6, 0.4], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'k7_ende' } },
];

export const GESPRAECHE7 = {
  k7_intro: [
    ['erzaehler', 'Sechste Woche. Montag, 8 Uhr.'],
    ['erzaehler', 'An der Pinnwand: ein neuer Zettel. „Praktikum 7P2“.'],
  ],
  k7_liste: [
    { tu: 'k7Platz' },
    { tu: 'k7Jo' },
    ['ayla', 'Ich bin im CDI. Bei Laurent. Mit Mila.'],
  ],
  k7_vertrag: [
    ['kaya', '(kaut) Moment. … So. Praktikum.'],
    ['kaya', 'Drei Unterschriften. Betrieb, Schule, zuhause. Bis Freitag.'],
    { tu: 'k7Unterschrift' },
    { tu: 'k7Garage' },
  ],
  k7_anruf: [
    ['weber', 'Fünf Minuten. Das ist kein Privattelefon.'],
    { tu: 'weberKennt' },
    ['erzaehler', 'Es klingelt. „Boulangerie, ja?“ Hinten klappert es.'],
    { wahl: [
      { t: '„Guten Tag. {name}, Annexe Junglinster. Praktikum?“', staerke: 'telefon', dann: [['erzaehler', '„Praktikum? Haben schon zwei. Nein. Tschüss.“']] },
      { t: '„Hallo … ich wollt fragen … also …“', dann: [['erzaehler', '„Ich hab Kundschaft. Was denn?“'], ['erzaehler', '„… Nein. Tschüss.“']] },
      { t: '(Auflegen, bevor jemand was sagt.)', staerke: 'abstand', merke: 'aufgelegt', dann: [['weber', 'Besetzt?'], ['du', '… Ja.'], ['weber', '(hebt eine Augenbraue)']] },
    ] },
    ['weber', 'Mein erstes Praktikum? Elf Absagen. Dann eine Druckerei.'],
    ['weber', 'Frau Kremer nimmt Leute. Morgen, 7:30. Ich sag’s ihr.'],
  ],
  k7_di: [
    ['erzaehler', 'Dienstag, 7:30 Uhr. Erster Praktikumstag.'],
    ['erzaehler', 'Keine Schule heute. Arbeit. Bis 16 Uhr.'],
  ],
  k7_kueche: [
    ['kremer', 'Moien. Haube auf. Hände waschen. Zack, zack.'],
    { tu: 'lucaHaube' },
    ['kremer', 'Zwiebeln. Zwei Kisten. Bis neun.'],
    { wahl: [
      { t: '(Schneiden. Augen tränen. Weiter.)', staerke: 'dranbleiben', herz: { kremer: 1 }, dann: [
        ['erzaehler', 'Um neun: eine Kiste. Die Augen brennen.'], ['kremer', 'Eine? Na gut. Fürs erste Mal.']] },
      { t: '„Luca, du schneidest, ich schäle?“', staerke: 'fair', dann: [{ tu: 'lucaTeilt' }] },
      { t: '(Handy auf die Kiste. Musik an.)', herz: { kremer: -1 }, dann: [
        ['erzaehler', 'Die Zeit geht schneller. Das Handy riecht nach Zwiebel.'], ['kremer', 'Handy. Fettfinger. In den Spind.']] },
      { t: '„Gibt’s dafür keine Maschine?“', staerke: 'humor', dann: [['kremer', 'Doch. Dich.'], ['luca', '(lacht. Zum ersten Mal mit dir.)']] },
    ] },
  ],
  k7_werk: [
    ['becker', 'Morgen. Brille. Haare. Handy in die Kiste.'],
    ['becker', 'Kenan zeigt dir alles. Ich bin hinten.'],
    { tu: 'kenanBetreuer' },
    ['kenan', 'Zwanzig Regalbretter. Vorbohren. Fünf Millimeter. Los.'],
  ],
  k7_pause: [
    { tu: 'k7Mila' },
    { tu: 'k7Noah' },
  ],
  k7_fehler: [
    ['becker', 'Wer hat hier gebohrt? Zwölf Millimeter. Nicht fünf.'],
    ['erzaehler', 'Das war Kenans Bohrer. Kenan schaut auf die Bank.'],
    ['kenan', '(ganz leise) Er schreibt meine Bewertung. Für die Lehre.'],
    { wahl: [
      { t: '„Ich.“', staerke: 'loyal', herz: { kenan: 2, becker: -1 }, merke: 'kenanGerettet', dann: [
        ['becker', 'Dann alle zwanzig neu. Allein.'], ['erzaehler', 'Bis nach der Mittagspause. Du isst kalt.']] },
      { t: '„Kenan.“', staerke: 'ehrlich', herz: { kenan: -2 }, merke: 'kenanVerraten2', dann: [
        ['becker', 'Kenan. Zu mir. Jetzt.'], ['kenan', '(im Vorbeigehen) Danke. Für die Lehre.']] },
      { t: '„Wir beide. Zu schnell.“', staerke: 'fair', herz: { kenan: 1 }, dann: [
        ['becker', 'Beide. Neu. Kommt auf beide Bögen: „Tempo“.']] },
      { t: '„Keine Ahnung. War vorher schon so.“', dann: [
        ['becker', 'Vorher schon. Klar.'], ['becker', 'Dann kommt’s auf beide Bögen.']] },
    ] },
    { tu: 'quitt' },
  ],
  k7_kasse: [
    ['kremer', 'Du kassierst. Karte drauf, piep, nächster. Kann jeder.'],
    { tu: 'benKasse' },
    { tu: 'lucaKarte' },
  ],
  k7_ende: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Im Rucksack: der Bewertungsbogen.'],
    { tu: 'k7Bogen' },
    { tu: 'k7Folgen' },
    ['erzaehler', 'Der Bus kommt.'],
    { tu: 'kapitelEnde' },
  ],
};
