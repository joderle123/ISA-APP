// Deutsch (ALLUX) · Zusätze für alle Module nach dem Programm ALLUX 7P/6P/5P (Prüfung 26.11.2026): Überblick der Kompetenzen
// am Anfang, Modul-Bilan am Ende, Seite „Lëtzebuergesch“ (siehe sprachen-programm.mjs). heft.tsx lädt diese Datei für deutsch-mN.
import { deutschProgramm, mitSprechen } from './sprachen-programm.mjs'

export function anwenden(MODUL, LEKTIONEN) {
  const r = mitSprechen(MODUL, LEKTIONEN)
  return { MODUL: deutschProgramm(r.MODUL), LEKTIONEN: r.LEKTIONEN }
}
