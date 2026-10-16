// Einziger Zugang der Oberfläche zum Kern (src/passgenau/kern) und zum PDF.
export * from '../kern'
/** lesbarer Name eines Materials wie im PDF (der Kern liefert Schlüssel wie „handpuppe“, „wuerfel“) */
export { materialName, imSpielStelle } from '../kern/druck'
/** Ich-Satz eines Ziels („Ich behalte die Kontrolle …“) für die Hilfetexte der Zielwahl */
export { zielSatz } from '../kern/katalog'
