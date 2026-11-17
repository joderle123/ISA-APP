// Lycée-Simulator – Kapitel 3 „Der Schnuppertag“ (zweite Woche, Montag). Brücke zu Phase 3 (Ausbildung DAP/CCP).
// Situationen: Bus verpasst – im Sekretariat anrufen (Telefonat: Gruß, Name, Klasse, Grund, Ankunft) · zu spät in die
// Klasse kommen · Sicherheitsregeln in der Werkstatt · Messen und Sägen (Spiel) · ein Fehler passiert – zugeben ·
// mit einem Älteren zusammenarbeiten (Kenan aus Kapitel 1 erinnert sich) · Rückmeldung vom Meister annehmen ·
// sagen, was einen interessiert. Kurze Sätze, keine Moral-Stimme, erfundene Namen.

export const STAERKEN3 = {
  telefon: { name: 'Telefonieren', text: 'Du hast angerufen und klar gesagt, was los ist.' },
  sicher: { name: 'Auf Sicherheit achten', text: 'Du hast an die Regeln in der Werkstatt gedacht.' },
  rueckmeldung: { name: 'Rückmeldung annehmen', text: 'Du hast Kritik gehört, ohne gleich zu widersprechen.' },
};

export const LEUTE3 = {
  becker: { name: 'Meister Becker', modell: 'menschen', stil: 'Worker', haut: '#d8a982', haar: '#7a7a7a', oben: '#4f6170', unten: '#2d3748', schuhe: '#3a2a1c', farbe: '#4f6170', erwachsen: true },
};

export const ORTE3 = {
  werkstattTor: { x: -48, z: -4.5, yaw: Math.PI },
  werkbank: { x: -48.2, z: -19.6 },
};

export const SCHRITTE3 = [
  { id: 'k3_bus', kap: 3, tag: 'Montag', uhr: 7.62, titel: 'Der Bus ist weg', ziel: 'Ruf im Sekretariat an. Sprich mit Noah, er hat die Nummer.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'k3_intro' },
    leute: { noah: [-19.6, 42.4, -1.6] },
    fertig: { reden: 'noah', gespraech: 'telefon' } },
  { id: 'k3_spaet', kap: 3, tag: 'Montag', uhr: 8.45, titel: 'Zu spät', ziel: 'Geh in Saal 1.04 zu M. Hoffmann.', marker: 'hoffmann',
    start: { teleport: 'eingang' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ayla: [-24.25, -27.82, -Math.PI / 2, 'sitzt'], ben: [-22.15, -19.78, -Math.PI / 2, 'sitzt'], chiara: [-20.05, -24.42, -Math.PI / 2, 'sitzt'], yusuf: [-22.15, -26.58, -Math.PI / 2, 'sitzt'], jo: [-17.95, -21.02, -Math.PI / 2, 'sitzt'], lina: [-17.95, -26.58, -Math.PI / 2, 'sitzt'], mila: [-20.05, -23.18, -Math.PI / 2, 'sitzt'], noah: [-20.6, -17.2, Math.PI] },
    fertig: { reden: 'hoffmann', gespraech: 'spaet' } },
  { id: 'k3_atelier', kap: 3, tag: 'Montag', uhr: 9.6, titel: 'Die Werkstatt', ziel: 'Geh zur Werkstatt. Meister Becker wartet.', marker: 'becker',
    start: { teleport: 'eingangHof' },
    leute: { becker: [-48, -13, 0], kenan: [-46.2, -14.2, -0.6], mila: [-50.2, -14.6, 0.4], jo: [-45, -15.6, -0.2] },
    fertig: { reden: 'becker', gespraech: 'regeln' } },
  { id: 'k3_saege', kap: 3, tag: 'Montag', uhr: 10.1, titel: 'Messen und sägen', ziel: 'Geh zur Werkbank. Miss 30 cm ab und säge.', marker: 'werkbank',
    leute: { becker: [-45.6, -18.0, -2.4], kenan: [-42.2, -19.8, Math.PI], mila: [-54.2, -19.6, Math.PI], jo: [-40.4, -19.8, Math.PI] },
    fertig: { ort: 'werkbank', r: 1.4, gespraech: 'saegen' } },
  { id: 'k3_kenan', kap: 3, tag: 'Montag', uhr: 10.6, titel: 'Zu zweit', ziel: 'Ein Regal baut man zu zweit. Geh zu Kenan.', marker: 'kenan',
    leute: { becker: [-45.6, -18.0, -2.4], kenan: [-42.2, -19.8, Math.PI], mila: [-54.2, -19.6, Math.PI], jo: [-40.4, -19.8, Math.PI] },
    fertig: { reden: 'kenan', gespraech: 'kenanTeam' } },
  { id: 'k3_feedback', kap: 3, tag: 'Montag', uhr: 11.8, titel: 'Wie war’s?', ziel: 'Meister Becker sagt dir, wie es lief.', marker: 'becker',
    leute: { becker: [-48, -13, 0], kenan: [-45.4, -12.6, -1.2, 'redet'], mila: [-50.6, -11.8, 1.6, 'redet'] },
    fertig: { reden: 'becker', gespraech: 'feedback' } },
  { id: 'k3_tor', kap: 3, tag: 'Montag', uhr: 12.65, titel: 'Am Tor', ziel: 'Mittagspause. Kenan winkt dir vom Tor.', marker: 'kenan',
    start: { teleport: 'eingangHof' },
    leute: { kenan: [1.2, 38.6, Math.PI, 'winkt'], dario: [-0.6, 39.2, 2.8, 'redet'], hoffmann: [4.2, 25.6, -2.4] },
    fertig: { reden: 'kenan', gespraech: 'tor' } },
  { id: 'k3_heim', kap: 3, tag: 'Montag', uhr: 15.5, titel: 'Heimweg', ziel: 'Geh zur Bushaltestelle. Diesmal bist du pünktlich.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], kenan: [-27, 41.6, 0.4], dario: [-28.4, 41.4, 0.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'k3_ende' } },
];

export const GESPRAECHE3 = {
  k3_intro: [
    ['erzaehler', 'Montag, zweite Woche. 7:37 Uhr.'],
    ['erzaehler', 'Du rennst zur Haltestelle. Der Bus fährt gerade los.'],
    ['erzaehler', 'Ohne dich. Der nächste kommt in 40 Minuten.'],
    ['noah', 'Mist! Ich hab ihn auch verpasst.'],
    { tu: 'samstag' },
  ],
  telefon: [
    ['noah', 'Wir müssen im Sekretariat anrufen. Ich hab die Nummer.'],
    ['noah', 'Machst du? Am Telefon krieg ich kein Wort raus.'],
    { wahl: [
      { t: '„Okay. Gib her.“', staerke: 'telefon', merke: 'angerufen', dann: [{ tu: 'anruf' }] },
      { t: '„Du hast die Nummer. Du rufst.“', herz: { noah: -1 }, merke: 'noahRuft', dann: [
        ['noah', '(wählt) Äh … Noah. Bus. Weg. … Ja. Tschüss.'],
        ['noah', 'Aufgelegt. Hab ich deinen Namen gesagt? Weiß nicht.'] ] },
      { t: '„Wir kommen halt später. Merkt keiner.“', herz: { noah: 1 }, merke: 'nichtAngerufen', dann: [
        ['noah', 'Sicher? … Okay. Dann nicht.'],
        ['erzaehler', 'Noah teilt seine Chips mit dir. Ganz entspannt.'] ] },
    ] },
    { tu: 'warten' },
  ],
  spaet: [
    ['erzaehler', 'Du klopfst. Alle schauen. Noah steht hinter dir.'],
    { tu: 'spaetFolge' },
    ['hoffmann', 'Heute ist Schnuppertag. Gleich in der Werkstatt, bei Meister Becker.'],
  ],
  regeln: [
    ['becker', 'Morgen. Becker. Hier wird gearbeitet.'],
    ['erzaehler', 'Er verteilt Schutzbrillen. Zerkratzt. Sie riechen nach Gummi.'],
    ['erzaehler', 'Er hebt die linke Hand. Ein Finger ist kürzer.'],
    ['becker', 'Brille auf. Haare zusammen. Handy in die Kiste.'],
    ['erzaehler', 'Jo schiebt seine Brille auf die Stirn. Ein paar grinsen.'],
    { wahl: [
      { t: '(Brille richtig auf.)', staerke: 'sicher', herz: { becker: 1 }, dann: [['jo', 'Steht dir. Wie ein Taucher.']] },
      { t: '(Brille auf die Stirn. Wie Jo.)', herz: { jo: 1 }, merke: 'brilleStirn', dann: [
        ['jo', '(nickt dir zu)'],
        ['erzaehler', 'Becker sieht es. Er sagt nichts. Noch nicht.'] ] },
      { t: '„Gibt’s eine, die nicht zerkratzt ist?“', staerke: 'klar', herz: { becker: 1 }, dann: [
        ['becker', 'Schrank. Oben. Bring gleich für alle mit.'],
        ['jo', 'Extrawurst.'] ] },
      { t: '(Handy nicht in die Kiste. In die Tasche.)', merke: 'handyBehalten', dann: [
        ['erzaehler', 'Keiner merkt es. Es vibriert zweimal.'] ] },
    ] },
    ['kenan', '(grinst) Er ist streng. Und er sieht alles.'],
    { tu: 'kenanErinnert' },
  ],
  saegen: [
    ['becker', 'Ein Brett, genau 30 Zentimeter. Erst messen, dann sägen.'],
    { tu: 'saege' },
  ],
  kenanTeam: [
    ['becker', 'Jetzt ein kleines Regal. Immer zu zweit. {name}, du mit Kenan.'],
    ['kenan', 'Okay. Kannst du schrauben?'],
    { wahl: [
      { t: 'Nicht so gut. Zeigst du es mir?', staerke: 'hilfe', herz: { kenan: 2 }, dann: [['kenan', 'Klar. Erst vorbohren, dann schrauben. Schau.'], ['erzaehler', 'Kenan zeigt es dir. Beim dritten Mal kannst du es.']] },
      { t: 'Klar, kein Problem.', dann: [['erzaehler', 'Die erste Schraube geht schief.'], ['kenan', 'Halt. Erst vorbohren. Ich zeig’s dir.']] },
      { t: 'Mach du. Ich halte.', dann: [['kenan', 'Okay. Dann lernst du halt nix. Mir egal.'], ['erzaehler', 'Kenan schraubt. Du hältst. Es geht schnell.']] },
    ] },
    ['erzaehler', 'Nach einer halben Stunde steht das Regal.'],
    { tu: 'regalWackelt' },
    ['kenan', 'Nicht schlecht für den ersten Tag.'],
  ],
  feedback: [
    ['becker', 'So. Kurz. Ich hab nicht viel Zeit.'],
    { tu: 'beckerLob' },
    ['becker', 'Und: langsamer. Erst messen, dann sägen.'],
    { wahl: [
      { t: '„Okay.“', staerke: 'rueckmeldung', dann: [['becker', 'Gut.']] },
      { t: '„Sie sagten: Hier wird gearbeitet.“', staerke: 'humor', herz: { becker: 1 }, dann: [['becker', '(fast ein Lachen) Gearbeitet. Nicht gerannt.']] },
      { t: '„Kenan war auch schnell.“', herz: { becker: -1, kenan: -1 }, dann: [['becker', 'Stimmt. Kenan kriegt das gleich auch.'], ['kenan', '(von hinten) Was krieg ich?']] },
    ] },
    ['becker', 'Samstag ist offene Werkstatt. Zwei Plätze sind noch frei.'],
    { wahl: [
      { t: '„Ich komm.“', staerke: 'entscheiden', herz: { becker: 1 }, merke: 'berufHolz', dann: [
        ['becker', 'Neun Uhr. Nicht fünf nach.'], ['kenan', 'Samstag? Freiwillig? Du bist komisch.']] },
      { t: '„Samstag ist schwierig.“', merke: 'berufOffen', dann: [['becker', 'Musst nicht sagen, warum. Der Zettel hängt an der Tür.']] },
      { t: '„Holz ist nicht meins. Eher Menschen.“', staerke: 'entscheiden', merke: 'berufMenschen', dann: [['becker', 'Gut zu wissen. Frag beim SePAS nach Praktika.']] },
      { t: '„Gibt’s da was zu essen?“', staerke: 'humor', dann: [['becker', 'Brötchen. Um zehn.'], ['erzaehler', 'Er schreibt deinen Namen auf. Mit Fragezeichen.']] },
    ] },
  ],
  tor: [
    ['erzaehler', 'Am Tor. Kenan und Dario rauchen. Einen Schritt draußen.'],
    ['kenan', 'Hey. Regal-Team. Willst du?'],
    ['erzaehler', 'Er hält dir die Schachtel hin. Dario schaut zu.'],
    { wahl: [
      { t: '„Nee. Schmeckt wie Aschenbecher.“', staerke: 'neinsagen', dann: [
        ['dario', 'Schon mal Aschenbecher gegessen, oder was?'],
        ['kenan', '(lacht) Lass. Mehr für uns.'] ] },
      { t: 'Eine nehmen. Nur halten.', herz: { kenan: 1, dario: 1 }, merke: 'zigiGehalten', dann: [
        ['dario', 'Hältst du die nur zum Angeben?'],
        ['kenan', 'Lass. Jeder, wie er will.'] ] },
      { t: 'Eine nehmen. Anzünden.', herz: { kenan: 1, dario: 1 }, merke: 'geraucht', dann: [
        ['erzaehler', 'Der Rauch brennt im Hals. Du verziehst keine Miene.'],
        ['dario', 'Ach. Machst du das schon länger?'] ] },
      { t: '„Ich steh nur. Raucht ihr mal.“', staerke: 'lesen', herz: { kenan: 1 }, dann: [
        ['kenan', 'Okay. Auch gut.'] ] },
    ] },
    ['erzaehler', 'M. Hoffmann kommt über den Hof. Gelbe Weste. Aufsicht.'],
    ['dario', 'Mist.'],
    ['erzaehler', 'Kenan wirft seine Kippe. Sie landet vor deinen Füßen.'],
    ['hoffmann', 'So. Wem gehört die?'],
    { wahl: [
      { t: '„Mir nicht.“ (Schulterzucken)', herz: { kenan: 1 }, merke: 'kenanGedeckt', dann: [
        ['hoffmann', 'Aha. Vom Himmel gefallen.'],
        ['hoffmann', 'Alle drei: Namen. Ich red mit den Klassenlehrern.'],
        ['hoffmann', 'Bei dir … also mit mir. Toll.'] ] },
      { t: '„Die ist von Kenan.“', staerke: 'ehrlich', herz: { kenan: -3, hoffmann: 1 }, merke: 'kenanVerpfiffen', dann: [
        ['kenan', '(starrt dich an) Wow.'],
        ['hoffmann', 'Kenan, mitkommen. {name}, rein mit dir.'] ] },
      { t: '„Meine.“ (Aufheben. Austreten.)', staerke: 'loyal', herz: { kenan: 2, hoffmann: -1 }, merke: 'schuldGenommen', dann: [
        ['hoffmann', 'Deine. Klar.'],
        ['hoffmann', 'Eintrag. Und ein Brief nach Hause.'],
        ['kenan', '(leise) Was machst du denn?'] ] },
      { t: '(Weggehen. Schnell. Nicht rennen.)', staerke: 'abstand', merke: 'torWeg', dann: [
        ['hoffmann', '{name}! Hiergeblieben!'],
        ['erzaehler', 'Zu spät. Du bist schon drinnen.'] ] },
    ] },
  ],
  k3_ende: [
    ['erzaehler', '15:30 Uhr. Diesmal bist du pünktlich.'],
    { tu: 'kenanBus' },
    ['noah', 'Und, wie war die Werkstatt?'],
    { wahl: [
      { t: 'Anstrengend. Aber gut.', herz: { noah: 1 }, dann: [['noah', 'Ich hab mir fast in den Finger gesägt, haha.']] },
      { t: 'Ich hab mich beim Sägen verhauen.', herz: { noah: 1 }, dann: [['noah', 'Ich auch. Zweimal. Becker hat nur geseufzt.']] },
    ] },
    ['fahrer', 'Pünktlich. Wie immer. Applaus ist erlaubt.'],
    { tu: 'kapitelEnde' },
  ],
};

// Messen und sägen: Ergebnis in Zentimetern Abweichung → Folgen
export function saegeFolgen(abw, m = {}) {
  const z = [];
  if (m.brilleStirn) z.push(['erzaehler', 'Späne fliegen. Einer ins Auge. Es brennt.'], ['becker', 'Darum. Waschbecken. Auge spülen. Fünf Minuten.']);
  if (m.handyBehalten) z.push(['erzaehler', 'Beim Sägen vibriert die Tasche. Du zuckst.'], ['becker', '(streckt die Hand aus) Handy. Bis 16 Uhr.']);
  if (abw <= 1) return { gut: true, zeilen: z.concat([['becker', 'Genau 30. Sauber.'], ['kenan', '(von drüben) Anfängerglück.']]) };
  return { gut: false, zeilen: z.concat([
    ['becker', abw <= 3 ? 'Das sind ' + (30 + abw) + ' Zentimeter. Fast.' : 'Das Brett ist viel zu kurz.'],
    { wahl: [
      { t: '„Zu schnell. Mein Fehler.“', staerke: 'ehrlich', herz: { becker: 1 }, dann: [
        ['becker', 'Neues Brett. Zweimal messen.'], ['erzaehler', 'Die anderen fangen schon das Regal an.']] },
      { t: '„Das Maßband ist kaputt.“', herz: { becker: -1 }, dann: [
        ['becker', '(prüft) Der Haken wackelt. Einen Millimeter.'], ['becker', 'Nicht ' + abw + ' Zentimeter. Neues Brett.']] },
      { t: '(Brett umdrehen. Unauffällig zurück zum Stapel.)', merke: 'brettVersteckt', dann: [
        ['erzaehler', 'Becker schaut gerade woanders hin.'], ['kenan', '(leise) Das merkt er beim Regal.']] },
    ] },
    ['erzaehler', 'Das nächste Brett passt.'],
  ]) };
}
