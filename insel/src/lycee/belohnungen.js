// Annexe Junglinster – Jetons und was man bei Figuren dafür bekommt.
// Jetons gibt es fürs Lernen (Arbeitsblatt, Lektion, Übungsrunde). Auch „nicht alles richtig“ bringt etwas.
// Einlösen nur bei Figuren, nie in einem Laden-Menü. Was man hat, bleibt für immer (nichts läuft ab, nichts geht verloren).
// Keine Zufalls-Kisten, keine Angebote auf Zeit.

export const JETON = { blattAlles: 3, blatt: 1, lektionNeu: 3, lektion: 1, runde: 2 };

// je Figur: Begrüßung beim Einlösen, Angebote { id, name, preis, art, wert, satz }
export const ANGEBOTE = {
  kenan: {
    hallo: 'Jetons? Ich lackier dir ein Deck. Ehrensache. Fast.',
    dinge: [
      { id: 'deck_rot', name: 'Deck „Feuerwehr“', preis: 4, art: 'deck', wert: '#d6452f', satz: 'Rot. Schnell. Sieht zumindest schnell aus.' },
      { id: 'deck_mint', name: 'Deck „Minze“', preis: 4, art: 'deck', wert: '#5fd0b0', satz: 'Mint. Sehr ruhig. Fährt sich trotzdem.' },
      { id: 'deck_nacht', name: 'Deck „Mitternacht“', preis: 6, art: 'deck', wert: '#2b2f4a', satz: 'Dunkel. Mit Sternen. Hab ich mit Bleistift gemacht.' },
      { id: 'deck_streifen', name: 'Deck „Zebra“', preis: 8, art: 'deck', wert: '#f2f2f2', satz: 'Streifen. Schief. Absicht. Glaub ich.' },
    ],
  },
  lina: {
    hallo: '(zeigt ihr Heft) Ich hab Sticker gemacht. Willst du?',
    dinge: [
      { id: 'st_taube', name: 'Sticker „Taube mit Mütze“', preis: 2, art: 'sticker', wert: '🕊️', satz: 'Die Taube vom Hof. Sie heißt jetzt Gerd.' },
      { id: 'st_kaktus', name: 'Sticker „Kevin, der Kaktus“', preis: 2, art: 'sticker', wert: '🌵', satz: 'Kevin. Mit Sonnenbrille. Er weiß es nicht.' },
      { id: 'st_curry', name: 'Sticker „Curry-Alarm“', preis: 3, art: 'sticker', wert: '🍛', satz: 'Für Donnerstage. Oder alle Tage.' },
      { id: 'st_bus', name: 'Sticker „Der Bus“', preis: 3, art: 'sticker', wert: '🚌', satz: 'Er fährt weg. Natürlich.' },
      { id: 'st_wuerfel', name: 'Sticker „Würfel, gelöst“', preis: 4, art: 'sticker', wert: '🧊', satz: '41 Sekunden. Mila hat es geprüft.' },
    ],
  },
  ayla: {
    hallo: 'Ich hab Songs aufgenommen. Handy-Qualität. Aber mit Herz.',
    dinge: [
      { id: 'song_bass', name: 'Song „Bass im Treppenhaus“', preis: 3, art: 'song', wert: 'melodie', satz: 'Im Treppenhaus aufgenommen. Wegen dem Hall.' },
      { id: 'song_regen', name: 'Song „Montag, Regen“', preis: 4, art: 'song', wert: 'melodie2', satz: 'Langsam. Für Busfahrten.' },
      { id: 'song_krach', name: 'Song „Krach mit Absicht“', preis: 5, art: 'song', wert: 'trommel', satz: 'Laut. Mach es lauter.' },
    ],
  },
  chiara: {
    hallo: 'Voilà: Spind-Lampen. Selbst gebastelt. Mit Anleitung.',
    dinge: [
      { id: 'lampe_gelb', name: 'Spind-Lampe „Sonne“', preis: 3, art: 'lampe', wert: '#ffd166', satz: 'Warmweiß. Wie ein Sonntag.' },
      { id: 'lampe_pink', name: 'Spind-Lampe „Flamingo“', preis: 4, art: 'lampe', wert: '#ff7aa8', satz: 'Pink. Sehr pink. Nicht verhandelbar.' },
      { id: 'lampe_blau', name: 'Spind-Lampe „Aquarium“', preis: 5, art: 'lampe', wert: '#5fb4ff', satz: 'Blau. Fehlen nur die Fische.' },
    ],
  },
};

export const alleDinge = () => Object.entries(ANGEBOTE).flatMap(([wer, a]) => a.dinge.map((d) => ({ ...d, wer })));
