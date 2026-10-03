// Daten des Förderfachs (src/data/foerderfach) an einer Stelle – für die
// PDF-Skripte und später für die Toolbox.
import plan7e from '../data/foerderfach/plan-7e.json'
import plan6e from '../data/foerderfach/plan-6e.json'
import plan5e from '../data/foerderfach/plan-5e.json'
import einheiten7e from '../data/foerderfach/einheiten-7e.json'
import einheiten6e from '../data/foerderfach/einheiten-6e.json'
import einheiten5e from '../data/foerderfach/einheiten-5e.json'
import handbuch from '../data/foerderfach/handbuch.json'
import skillkarten from '../data/foerderfach/skillkarten.json'
import werkzeugBlaetter from '../data/foerderfach/blaetter.json'
import blaetter7e from '../data/foerderfach/blaetter-7e.json'
import blaetter6e from '../data/foerderfach/blaetter-6e.json'
import blaetter5e from '../data/foerderfach/blaetter-5e.json'
import type { Blatt } from '../blatt/typen'
import type { Einheit, EinheitenDatei, HandbuchDatei, Jahresplan, Klasse, SkillKartenDatei } from './typen'

export const PLAENE: Jahresplan[] = [plan7e as Jahresplan, plan6e as Jahresplan, plan5e as Jahresplan]
export const planVon = (k: Klasse): Jahresplan => PLAENE.find((p) => p.klasse === k)!

/** Ausgearbeitete Einheiten aller Klassenstufen */
export const EINHEITEN: Einheit[] = [einheiten7e, einheiten6e, einheiten5e].flatMap((d) => (d as EinheitenDatei).einheiten)

export const HANDBUCH = handbuch as HandbuchDatei

/** Skill-Karten zum Ausschneiden, je Klassenstufe (am Ende des Schülerhefts) */
export const SKILLKARTEN = skillkarten as SkillKartenDatei

/** Werkzeug-Blätter (für jede Stunde) und die Blätter der Einheiten je Klassenstufe */
export const BLAETTER: Blatt[] = [werkzeugBlaetter, blaetter7e, blaetter6e, blaetter5e].flatMap((d) => d as Blatt[])
export const blattById = new Map(BLAETTER.map((b) => [b.id, b]))

/** Werkzeug-Blätter je Klassenstufe – Teil D des Lehrerhandbuchs („Kopiervorlagen für jede Stunde“). Für die Ausgabe annexe: WERKZEUGE_ANNEXE in scripts/foerderfach-ausgabe.ts. */
export const WERKZEUGE: Record<Klasse, string[]> = {
  '7e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-skills-pass', 'ff-klassenvereinbarung', 'ff-anspannungsskala'],
  '6e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-anspannungsskala', 'ff-skills-pass', 'ff-klassenvereinbarung', 'ff-skills-kompass'],
  '5e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-anspannungsskala', 'ff-skills-pass', 'ff-klassenvereinbarung', 'ff-skills-buch'],
}

/** Blätter vorn im Schülerheft (vor den Blättern der Einheiten): Einstieg und was jede Stunde gebraucht wird. Für die Ausgabe annexe: HEFT_VORN_ANNEXE. */
export const HEFT_VORN: Record<Klasse, string[]> = {
  '7e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-skills-pass'],
  '6e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-anspannungsskala', 'ff-skills-pass', 'ff-skills-kompass'],
  '5e': ['ff-das-fach', 'ff-gefuehlsrad', 'ff-anspannungsskala', 'ff-skills-pass', 'ff-skills-buch'],
}

/** Alle Werkzeug-Blätter (für die Prüfung) */
export const VORLAGEN = [...new Set(Object.values(WERKZEUGE).flat())]
