// Bausteine für die Sprach-Module (Deutsch, Französisch) – kurze Helfer, damit die Lektionen lesbar bleiben.
// Eine Lektion wird einmal geschrieben und daraus entstehen: das Toolbox-Blatt (de + fr, Lehrerseite in beiden Sprachen)
// und der Spielteil für Annexe Junglinster (Rollenspiel, Übungen, Lernkarte).
export const T = (text, klein) => ({ art: 'text', text, ...(klein ? { klein: true } : {}) })
export const merke = (titel, punkte) => ({ art: 'info', symbol: 'merke', titel, punkte })
export const tipp = (titel, text, punkte) => ({ art: 'info', symbol: 'tipp', titel, ...(text ? { text } : {}), ...(punkte ? { punkte } : {}) })
export const achtung = (titel, text) => ({ art: 'info', symbol: 'achtung', titel, text })
export const A = (stufe, text, hinweis) => ({ art: 'aufgabe', stufe, text, ...(hinweis ? { hinweis } : {}) })
export const P = (items, spalten = 2) => ({ art: 'paeckchen', items, spalten, buchstaben: true })
export const bilder = (l) => ({ art: 'bilder', klein: true, spalten: l.length, bilder: l.map(([bild, text]) => ({ bild: 'icon:' + bild, text })) })
export const tab = (spalten, werte, extra = {}) => ({ art: 'tabelle', spalten, zeilen: 0, werte, ...extra })
export const leer = (spalten, zeilen, extra = {}) => ({ art: 'tabelle', spalten, zeilen, ...extra })
export const dialog = (zeilen) => ({ art: 'dialog', zeilen: zeilen.map(([wer, text]) => ({ wer, ...(text ? { text } : {}) })) })
export const zuordnen = (links, rechts) => ({ art: 'zuordnen', links, rechts })
export const linien = (anzahl, label) => ({ art: 'linien', anzahl, ...(label ? { label } : {}) })
export const anfaenge = (items, linien = 1) => ({ art: 'satzanfaenge', items, linien })
export const spalten = (links, rechts, verhaeltnis = '2:1') => ({ art: 'spalten', verhaeltnis, links, rechts })
export const wortspeicher = (titel, items) => ({ art: 'wortspeicher', titel, items })
export const kurzCheck = (items, sprache = 'de') => [
  T(sprache === 'fr' ? 'Mini-bilan : tu te sens comment ?' : 'Kurz-Check: Wie sicher bist du?', true),
  { art: 'einschaetzung', items, optionen: sprache === 'fr' ? ['sûr·e', 'ça va', 'pas encore'] : ['sicher', 'geht so', 'noch nicht'] },
]
