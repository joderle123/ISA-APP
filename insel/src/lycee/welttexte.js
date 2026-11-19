// Annexe Junglinster – Welttexte: Zettel an der Pinnwand, Kritzeleien, Durchsagen, Fundkiste.
// Regeln wie überall: kurz, Alltagsdeutsch, keine Moral, keine echten Namen. Kein Text erklärt etwas „Pädagogisches“.

// Pinnwand: bei jedem Lesen der nächste Stapel (drei Zettel)
// Die Pinnwand lebt mit dem Schuljahr: pro Kapitel ein neuer Zettel – und Zettel, die auf DICH reagieren
export const PINNWAND_KAPITEL = {
  1: 'Willkommen, neue 7P2! Fragen? Bürotür von Herrn Kuedes. Klopfen reicht.',
  2: 'Talenttag Freitag: 10 Sekunden Ruhm. Zuschauen zählt auch.',
  3: 'Sportfest-Staffel: 7P2 auf Platz 6 von 6. Applaus trotzdem. – Frau Sommer',
  4: 'Neu im CDI: die Ruhe-Ecke. Kissen. Keine Fragen.',
  5: 'Bitte keine Screenshots von Gerüchten weiterleiten. Danke. – Die Direktion',
  6: 'Plakat der 7P2: „Fotos nur mit Ja. Immer.“ Darunter 19 Unterschriften.',
  7: 'Konflikt-Lotsen gesucht. Ausbildung bei Herrn Kuedes. Kekse inklusive.',
  8: 'Medienwoche: Erst bremsen, dann teilen. 🛑',
  9: 'Foto-Club ab September? Regeln macht Mila. Infos bei ihr.',
  10: 'Sommerfest Freitag! Kuchen erwünscht. Auch schiefe.',
};
export const pinnwandFuerDich = (m = {}, S = {}) => [
  m.handyAbgegeben ? 'Danke an die Person, die ein Handy im Sekretariat abgegeben hat! – Mme Weber' : '',
  (m.geholfen || 0) >= 2 ? 'Jemand hat im Gang Bücher mit aufgesammelt. Danke, wer auch immer du bist.' : '',
  (m.ttSiege || 0) >= 1 ? 'Tischtennis-Rangliste: ' + (S.name || 'Jemand') + ' aus der 7P2 ist neu dabei. 🏓' : '',
  (m.skateMedaille || 0) >= 2 ? 'Skate-Ecke: Wer hat den Kickflip über die Bank gestanden? Respekt. – Kenan' : '',
  m.dazugesetzt ? 'Ein Zettel ohne Namen: „Danke, dass du dich neben mich gesetzt hast.“' : '',
  Object.values(S.handschlag || {}).some((h) => h.eigen) ? 'Gerücht: In der 7P2 gibt es einen Handschlag mit FÜNF Teilen. Unbestätigt.' : '',
].filter(Boolean);

export const PINNWAND = [
  ['Theater-AG sucht Leute. Auch für Licht. Und Nebel.', 'Fundsache: blaue Jacke. Mit Pommes in der Tasche.', '„Wer hat mein Ladekabel?“ – darunter: „Keks.“'],
  ['Verkaufe Fahrradschloss. Code vergessen. 2 €.', 'Robotik-AG: Der Arm kann jetzt winken. Und fast greifen.', 'Bitte keine Kaugummis unter die Tische. – Die Tische'],
  ['Band sucht Schlagzeug. Muss nicht gut sein. Nur laut.', 'Wer hat Kevin (Kaktus) gegossen? Er braucht das NICHT.', 'Sportfest im Juni. Anmeldung bei Frau Sommer. Pfeife inklusive.'],
  ['Tausche Mathe-Hausaufgabe gegen Dessert. – Anonym (Chiara)', 'Neu ab Montag: Lernen im Stehen. – Mme Tidderich', 'Gefunden: ein Lineal. 30 cm. Leicht angekaut.'],
  ['Kantine: Donnerstag Nudeltag. Wiederholung: NUDELTAG.', 'Gefunden: ein Schlüssel mit Dino-Anhänger.', 'Die Uhr im Sekretariat geht richtig. Die im Gang nicht. – Mme Weber'],
];

// Kritzeleien (Tisch, Klowand, Bushaltestelle): eine pro Besuch
export const KRITZELEIEN = {
  wc: ['„Hier war Ben. Ben hatte Hunger.“', 'Ein Pfeil nach oben: „Gerd wohnt hier.“', '„Wer das liest, ist cool.“ Darunter, andere Schrift: „Danke.“', 'Eine gezeichnete Ente mit Krawatte. Sehr detailliert.', '„7P2 > 7P1“. Darunter: „Beweis?“ Darunter: „Sportfest.“', 'Ein Sudoku. Halb fertig. Mit Kuli.'],
  tisch: ['„Hier saß niemand Wichtiges.“', 'Ein Pferd. Oder ein Hund. Mit Hut.', '„7P1 war hier.“ Darunter: „Und?“', 'Eine Rechnung: 3 + 4 = 8. Durchgestrichen. 7.', '„Langweilig“ – sehr ordentlich, mit Lineal.'],
  bus: ['„Bus kommt nie.“ Darunter: „Doch. Ohne dich.“', 'Ein Herz mit zwei Buchstaben. Einer ist weggekratzt.', '„Bus kommt 7:31.“ Darunter: „Theoretisch.“', '„Fahrer ist ein Held“ – vermutlich vom Fahrer.'],
};

// Durchsagen aus dem Lautsprecher (Mme Weber), zufällig beim Herumlaufen
export const DURCHSAGEN = [
  'Wem gehört die blaue Jacke? Sie wohnt jetzt bei mir.',
  'Wer hat den Schlüssel vom Musikraum? Ich warte.',
  'Der Kaffee im Lehrerzimmer ist leer. Das ist keine Übung.',
  'Ein Fahrrad blockiert den Lieferwagen. Ein pinkes. Danke.',
  'Erinnerung: Das Sekretariat schließt um 16 Uhr. Nicht 16:05.',
  'Die Kantine sagt: Heute Curry. Die Kantine sagt auch: Sorry.',
  'Theater-AG heute im Saal. Bitte keinen Nebel im Gang.',
  'Wer füttert die Tauben mit Pommes? Gerd braucht Gemüse.',
  'Der Automat ist nicht kaputt. Bitte nicht treten. Hilft nicht.',
  'Bitte nicht im Gang rennen. Sehr schnelles Gehen auch nicht.',
  'Kevin hat genug Wasser. Für dieses Jahr.',
  'Die Kantinenuhr geht vor. Mittag ist um 12:00. Nicht 11:55.',
  'Fundbüro: drei Jacken, ein Schuh, null Hausaufgaben.',
  'Der Brunnen ist kein Schwimmbad. Auch nicht für Enten.',
];

// Fundkiste an der Turnhalle: eine Sache pro Blick
export const FUNDKISTE = [
  'Ein linker Turnschuh. Pink. Größe 43.', 'Eine Trinkflasche mit Aufkleber: „Nicht meine“.', 'Drei Socken. Kein Paar.',
  'Ein Mathebuch. Seite 34 fehlt.', 'Eine Mütze. Mit Namen drin. Durchgestrichen.', 'Ein Kopfhörer. Nur der rechte.',
];
