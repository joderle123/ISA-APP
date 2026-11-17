// Annexe Junglinster – Stimmen der Figuren (Daten, keine Technik). Figurenbibel: insel/annexe/FIGUREN.md.
//   EINWURF: welche Einwürfe aus der Liste eine Figur benutzt (höchstens einer pro Gespräch, Herkunft wird nie erklärt).
//   STIMME:  Grundton der Stimm-Blips (Hz) und Tempo – für Etappe 2 (Ton).
//   PLAUDERN: kurze Sätze, wenn man jemanden außerhalb der Geschichte anspricht (der Reihe nach).
// Geprüft von tools/annexe/regeln.mjs.

export const EINWURF = {
  noah: ['Moien', 'Bis muer'], mila: ['Merci'], lina: ['Salut'], jo: ['Allez'], ben: ['Ça va?'], chiara: ['Voilà'],
  yusuf: ['Äddi'], ayla: ['Tudo bem?'], luca: ['Fixe'], kenan: ['Wéi geet et?'], dario: ['Obrigado'],
  hoffmann: ['Ça va?'], weber: ['Moien'], kremer: ['Gudden Appetit'], becker: ['Moien'], sommer: ['Allez'],
  laurent: ['Voilà'], kaya: ['Wéi geet et?'], fahrer: ['Äddi'], baeckerin: ['Merci'],
};

export const STIMME = {
  noah: { hz: 260, tempo: 1.0 }, mila: { hz: 330, tempo: 1.15 }, lina: { hz: 360, tempo: 0.8 }, jo: { hz: 190, tempo: 1.3 },
  ben: { hz: 230, tempo: 1.25 }, chiara: { hz: 300, tempo: 1.2 }, yusuf: { hz: 150, tempo: 0.7 }, ayla: { hz: 280, tempo: 0.95 },
  luca: { hz: 170, tempo: 0.9 }, kenan: { hz: 140, tempo: 0.85 }, dario: { hz: 210, tempo: 1.1 },
  hoffmann: { hz: 200, tempo: 1.2 }, weber: { hz: 240, tempo: 1.0 }, kremer: { hz: 220, tempo: 1.35 }, becker: { hz: 120, tempo: 0.8 },
  sommer: { hz: 250, tempo: 1.1 }, laurent: { hz: 270, tempo: 0.95 }, kaya: { hz: 160, tempo: 0.9 }, fahrer: { hz: 130, tempo: 0.9 },
};

export const PLAUDERN = {
  noah: ['Kurze Frage. Wo ist hier der dritte Stock?', 'Moien. Sag nichts, ich bin noch nicht wach.', 'Ich steh hier nur. Strategisch.', 'Wenn jemand fragt: Ich wohne in der Bibliothek.'],
  mila: ['41 Sekunden. Heute 39,8. Notier das.', 'Der Gong ist vier Sekunden zu früh.', '(dreht weiter)', 'Du stehst in meinem Licht. Danke.'],
  lina: ['(flüstert) Jo hat Senf am Kinn. Seit der Pause.', '(zeichnet weiter, ohne aufzusehen)', 'Psst. Ich zeichne gerade den Automaten.', '…Salut.'],
  jo: ['Was?', 'Ich hab nix gemacht. Diesmal echt.', 'Der Automat schuldet mir einen Euro. Und Respekt.', 'Allez, beweg dich, ich will durch.'],
  ben: ['Hast du zwei Euro? Kriegst du morgen.', 'Korbball in der Pause? Ich bin gut. Heute.', 'Ich hab ein Geschäftsmodell. Erzähl ich später.', 'Ça va? Gut. Ich auch. Fast.'],
  chiara: ['Plan für die Pause: essen, Mathe, Lampe.', 'Ich vergleiche nur meine Hausaufgaben. Nicht abschreiben.', 'Voilà. Mein Spind ist jetzt sortiert. Nach Farbe.', 'Hast du einen Kleber? Egal welchen.'],
  yusuf: ['Hm.', 'Hm?', 'Judo ist dienstags. Und freitags. Und manchmal sonntags.', '(nickt dir zu)'],
  ayla: ['Neuer Bandname: „Pausenklingel“. Oder? Nein. Oder doch?', '(nimmt einen Kopfhörer raus) Ja?', 'Probe Samstag. Kommst du? Musst nicht.', 'Tudo bem? Kurz bitte, Lied läuft.'],
  luca: ['Na, Kantinen-Polizei?', 'Zu wenig Salz. Sag ich nur.', 'Ich hab meinen Schlüssel gesucht. In der Küche. Zufall.', 'Weg da, ich hab Hunger.'],
  kenan: ['Zweimal messen. Einmal sägen. Sagt Becker.', 'Brief Nummer drei ist raus. Frag nicht.', 'Was guckst du?', 'Ich nehm den späten Bus. Einfach so.'],
  dario: ['Alles gut?', 'Hast du das Video gesehen? Das mit der Seife?', 'Was macht ein Pirat am Computer? … Egal.', 'Kenan hat gelacht. Einmal. Ich hab’s gesehen.'],
  weber: ['16 Uhr. Nicht 16:05.', '(telefoniert) … Moment … Was brauchst du?', 'Ausreden kenn ich alle. Wirklich alle.'],
  hoffmann: ['Äh … du bist … Moment … richtig. Hallo!', 'Morgen: neue Methode. Bringt bunte Stifte mit.', 'Die Enten-Krawatte bleibt. Diskussion beendet.'],
  kaya: ['Kekse sind im Glas. Kein Termin nötig.', 'Ich hab zehn Minuten. Dann kommt die Nächste.', 'Was ich weitersagen muss, sag ich dir vorher.'],
  sommer: ['(pfeift) Nicht rennen im Gang!', 'Schuhe dabei? Gut. Wunder geschehen.', 'Einmal waren alle umgezogen. Einmal.'],
  becker: ['Morgen.', 'Zweimal messen.', '(zeigt wortlos auf die Schutzbrille)'],
  kremer: ['Zack, zack.', 'Curry ist heute gut. Ehrlich.', 'Wer keine Erbsen mag, sagt es vorher.'],
  laurent: ['„Vielleicht“ mit zwei l. Nur so.', 'Donnerstag ist Club. Mit Keksen.', 'Leise, bitte. Die Bücher schlafen.'],
  fahrer: ['Abfahrt 7:35. Nicht 7:36.', 'Wer im Bus isst, putzt den Bus.'],
};
