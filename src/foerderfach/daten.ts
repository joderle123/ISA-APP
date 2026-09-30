// Daten des Förderfachs (src/data/foerderfach) an einer Stelle – für die
// PDF-Skripte und später für die Toolbox.
import plan7e from '../data/foerderfach/plan-7e.json'
import plan6e from '../data/foerderfach/plan-6e.json'
import plan5e from '../data/foerderfach/plan-5e.json'
import einheiten7e from '../data/foerderfach/einheiten-7e.json'
import handbuch from '../data/foerderfach/handbuch.json'
import blaetterListe from '../data/foerderfach/blaetter.json'
import type { Blatt } from '../blatt/typen'
import type { Einheit, EinheitenDatei, HandbuchDatei, Jahresplan, Klasse } from './typen'

export const PLAENE: Jahresplan[] = [plan7e as Jahresplan, plan6e as Jahresplan, plan5e as Jahresplan]
export const planVon = (k: Klasse): Jahresplan => PLAENE.find((p) => p.klasse === k)!

/** Ausgearbeitete Einheiten aller Klassenstufen */
export const EINHEITEN: Einheit[] = [...(einheiten7e as EinheitenDatei).einheiten]

export const HANDBUCH = handbuch as HandbuchDatei

export const BLAETTER: Blatt[] = blaetterListe as Blatt[]
export const blattById = new Map(BLAETTER.map((b) => [b.id, b]))

/** Kopiervorlagen, die in jedes Booklet gehören: Einstieg, die Blätter für jede Stunde und die Klassenvereinbarung
 *  (die Einheit 1 jeder Klassenstufe stellt sie auf oder erneuert sie). */
export const VORLAGEN = ['ff-das-fach', 'ff-gefuehlsrad', 'ff-skills-pass', 'ff-klassenvereinbarung']
