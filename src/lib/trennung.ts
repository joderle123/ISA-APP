/**
 * Silbentrennung für alle PDFs: Wörter brechen nur an Leerzeichen um – oder
 * dort, wo im Text ein weiches Trennzeichen (U+00AD) steht. Kinder, die lesen
 * lernen, sollen keine automatisch getrennten Wörter sehen, und Codes wie
 * „[SOZ-5]“ dürfen nie zerfallen.
 */
const WEICH = String.fromCharCode(0xad)

export function trennung(wort: string): string[] {
  return wort.includes(WEICH) ? wort.split(WEICH) : [wort]
}
