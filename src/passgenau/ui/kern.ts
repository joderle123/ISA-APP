// Einziger Zugang der Oberfläche zum Kern (src/passgenau/kern) und zum PDF.
export * from '../kern'
/** lesbarer Name eines Materials wie im PDF (der Kern liefert Schlüssel wie „handpuppe“, „wuerfel“) */
export { materialName } from '../kern/druck'
