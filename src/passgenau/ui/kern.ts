// Einziger Zugang der Oberfläche zum Kern. Bis der echte Kern (src/passgenau/kern, src/passgenau/pdf) da ist,
// zeigt diese Datei auf die Attrappe – beim Zusammenführen hier umstellen:
//   export * from '../kern'
//   export { pdfSitzung, pdfFolge } from '../pdf'
export * from './attrappe'
