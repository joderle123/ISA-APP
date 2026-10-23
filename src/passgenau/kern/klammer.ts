// Passgenau – Klammer einer gemischten Folge (23.10.2026, Rückmeldung: „bei 6 geplanten Sitzungen merkt man, dass sie
// eigentlich nicht zusammengehören“). Passt kein Einzelkurs, bekommt eine gründliche Folge einen Rahmen je Alter: eine Reise
// (Inseln, Bergtour) oder einen Werkzeugkasten. Jede Sitzung ist eine Station darin, am Anfang sagt die Fachkraft einen Satz
// dazu, am Schluss trägt das Kind die Station auf einem Sammelblatt ein. Das Sammelblatt bekommt das Kind in Sitzung 1, es
// bleibt in der Mappe. Die Sätze entstehen beim Anzeigen aus den Kernen der Folge – nach „Tauschen“ stimmen sie weiter.
// Wirkt über Abrufübung und sichtbaren Fortschritt (Roediger & Karpicke 2006; Schunk & Zimmerman 2007: Fortschritt sehen
// stärkt Selbstwirksamkeit).
import type { Baustein, Blatt } from '../../blatt/typen'
import type { Plan, Profil, Sprache } from '../typen'
import { textVon, type Katalog } from './katalog'
import { hash8 } from './hilfen'

type DF = { de: string; fr: string }

export interface KlammerVorlage {
  id: string
  von: number
  bis: number
  name: DF
  /** Motiv aus src/blatt/motive.ts für das Sammelblatt */
  motiv: string
  /** für die Fachkraft: die Idee in einem Satz */
  idee: DF
  /** Kopfzeile je Sitzung: {nr} {n} */
  kopf: DF
  /** wörtlicher Satz am Anfang: {n} {kern} */
  start: DF
  weiter: DF
  ende: DF
  /** Anweisung am Schluss: {nr} */
  schluss: DF
  schlussEnde: DF
}

export const KLAMMERN: KlammerVorlage[] = [
  {
    id: 'inseln',
    von: 3,
    bis: 6,
    name: { de: 'Die Insel-Reise', fr: 'Le voyage des îles' },
    motiv: 'insel',
    idee: { de: 'Jede Stunde ist eine Insel. Am Schluss malt das Kind die Insel auf dem Reise-Blatt an.', fr: 'Chaque séance est une île. À la fin, l’enfant colorie l’île sur la carte du voyage.' },
    kopf: { de: 'Insel {nr} von {n}', fr: 'Île {nr} sur {n}' },
    start: { de: '„Heute beginnt unsere Insel-Reise. Hier ist die erste Insel: {kern}.“', fr: '« Aujourd’hui, notre voyage commence. Voici la première île : {kern}. »' },
    weiter: { de: '„Wir fahren zur nächsten Insel. Heute: {kern}.“', fr: '« On part vers l’île suivante. Aujourd’hui : {kern}. »' },
    ende: { de: '„Heute kommen wir auf der letzten Insel an. Wir schauen, wo wir überall waren.“', fr: '« Aujourd’hui, on arrive sur la dernière île. On regarde tous les endroits où on est allés. »' },
    schluss: { de: 'Zum Schluss malt das Kind Insel {nr} auf dem Reise-Blatt an (1 Min.).', fr: 'Pour finir, l’enfant colorie l’île {nr} sur la carte du voyage (1 min).' },
    schlussEnde: { de: 'Zum Schluss malt das Kind die letzte Insel an und zeigt auf die Insel, die ihm am besten gefallen hat.', fr: 'Pour finir, l’enfant colorie la dernière île et montre celle qu’il a préférée.' },
  },
  {
    id: 'bergtour',
    von: 7,
    bis: 11,
    name: { de: 'Die Bergtour', fr: 'L’expédition en montagne' },
    motiv: 'berg',
    idee: { de: 'Jede Stunde ist eine Etappe zum Gipfel. Nach jeder Etappe trägt das Kind ein, was es mitnimmt.', fr: 'Chaque séance est une étape vers le sommet. Après chaque étape, l’enfant note ce qu’il emporte.' },
    kopf: { de: 'Etappe {nr} von {n}', fr: 'Étape {nr} sur {n}' },
    start: { de: '„Wir gehen auf eine Bergtour mit {n} Etappen. Heute ist Etappe 1: {kern}. Am Ende jeder Etappe schreibst oder malst du auf, was du mitnimmst.“', fr: '« On part pour une expédition en montagne en {n} étapes. Aujourd’hui, c’est l’étape 1 : {kern}. À la fin de chaque étape, tu écris ou tu dessines ce que tu emportes. »' },
    weiter: { de: '„Etappe {nr} von {n}. Heute geht es weiter mit: {kern}.“', fr: '« Étape {nr} sur {n}. Aujourd’hui, on continue avec : {kern}. »' },
    ende: { de: '„Letzte Etappe: Heute erreichen wir den Gipfel. Von oben schauen wir auf den ganzen Weg zurück.“', fr: '« Dernière étape : aujourd’hui, on atteint le sommet. De là-haut, on regarde tout le chemin parcouru. »' },
    schluss: { de: 'Zum Schluss: Etappe {nr} auf dem Bergtour-Blatt eintragen – ein Wort oder ein kleines Bild: Was nehme ich mit? (1 Min.)', fr: 'Pour finir : remplir l’étape {nr} sur la fiche de l’expédition – un mot ou un petit dessin : qu’est-ce que j’emporte ? (1 min)' },
    schlussEnde: { de: 'Zum Schluss: Gipfel auf dem Bergtour-Blatt – das Kind kreist die Etappe ein, die ihm am meisten geholfen hat.', fr: 'Pour finir : le sommet sur la fiche de l’expédition – l’enfant entoure l’étape qui l’a le plus aidé.' },
  },
  {
    id: 'werkzeugkasten',
    von: 12,
    bis: 99,
    name: { de: 'Mein Werkzeugkasten', fr: 'Ma boîte à outils' },
    motiv: 'werkzeugkiste',
    idee: { de: 'Jede Sitzung bringt ein Werkzeug. Am Schluss trägt der oder die Jugendliche es in den eigenen Werkzeugkasten ein – mit dem Moment, in dem es helfen kann.', fr: 'Chaque séance apporte un outil. À la fin, le ou la jeune l’inscrit dans sa boîte à outils – avec le moment où il peut servir.' },
    kopf: { de: 'Werkzeug {nr} von {n}', fr: 'Outil {nr} sur {n}' },
    start: { de: '„In den nächsten {n} Sitzungen baust du dir einen Werkzeugkasten: Jedes Mal kommt ein Werkzeug dazu. Was drinbleibt, entscheidest du. Heute: {kern}.“', fr: '« Pendant les {n} prochaines séances, tu te construis une boîte à outils : chaque fois, un outil de plus. C’est toi qui décides ce que tu gardes. Aujourd’hui : {kern}. »' },
    weiter: { de: '„Werkzeug {nr} von {n}. Heute kommt dazu: {kern}.“', fr: '« Outil {nr} sur {n}. Aujourd’hui, on ajoute : {kern}. »' },
    ende: { de: '„Letzte Sitzung: Wir kippen den Werkzeugkasten aus und schauen, was du davon wirklich behältst.“', fr: '« Dernière séance : on vide la boîte à outils et on regarde ce que tu gardes vraiment. »' },
    schluss: { de: 'Zum Schluss: Werkzeug {nr} in den Werkzeugkasten eintragen – Name und „Wann setze ich es ein?“ (1–2 Min.).', fr: 'Pour finir : inscrire l’outil {nr} dans la boîte à outils – son nom et « Quand est-ce que je l’utilise ? » (1–2 min).' },
    schlussEnde: { de: 'Zum Schluss: im Werkzeugkasten das eine Werkzeug markieren, das bleibt.', fr: 'Pour finir : dans la boîte à outils, marquer l’outil que tu gardes.' },
  },
]

export function klammerVorlage(id: string | undefined): KlammerVorlage | undefined {
  return id ? KLAMMERN.find((x) => x.id === id) : undefined
}

/** Die Klammer für dieses Alter */
export function klammerFuer(alter: number): KlammerVorlage {
  return KLAMMERN.find((x) => alter >= x.von && alter <= x.bis) ?? KLAMMERN[KLAMMERN.length - 1]
}

/** Titel des Kerns einer Sitzung (Übertragen und Rückblick mit eigenem Titel) */
export function kernTitel(k: Katalog, plan: Plan, nr: number, sp: Sprache): string {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const kern = s?.schritte.find((x) => x.rolle === 'kern')
  if (!kern) return ''
  const eigen = kern.ueber ? (sp === 'fr' ? kern.ueber['fr.titel'] : undefined) ?? kern.ueber.titel : undefined
  const e = k.eintraege.get(kern.ref)
  return (eigen ?? (e ? textVon(e, sp).titel : kern.t ?? '')).trim().replace(/[.!]$/, '')
}

const setze = (t: string, w: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, x: string) => String(w[x] ?? ''))

/** Was die Klammer in Sitzung nr sagt: Kopfzeile, Satz am Anfang, Anweisung am Schluss */
export function klammerSitzung(k: Katalog, plan: Plan, nr: number, sp: Sprache): { name: string; kopf: string; start: string; schluss: string } | null {
  const v = klammerVorlage(plan.klammer)
  if (!v) return null
  const n = plan.sitzungen.length
  const w = { nr, n, kern: kernTitel(k, plan, nr, sp) }
  const letzte = nr === n
  return {
    name: v.name[sp],
    kopf: setze(v.kopf[sp], w),
    start: setze((nr === 1 ? v.start : letzte ? v.ende : v.weiter)[sp], w),
    schluss: setze((letzte ? v.schlussEnde : v.schluss)[sp], w),
  }
}

/** Sammelblatt fürs Kind (Sitzung 1, bleibt in der Mappe): je Sitzung eine Station mit dem Titel ihres Kerns */
export function klammerBlatt(k: Katalog, p: Profil, plan: Plan, sp: Sprache): Blatt | null {
  const v = klammerVorlage(plan.klammer)
  if (!v) return null
  const fr = sp === 'fr'
  const titel = plan.sitzungen.map((s) => kernTitel(k, plan, s.nr, sp))
  const bild = `motiv:${v.motiv}`
  const bausteine: Baustein[] = [{ art: 'bild', bild, groesse: 'm', ausrichtung: 'mitte' }]
  if (v.id === 'inseln') {
    bausteine.push(
      { art: 'aufgabe', text: fr ? 'Après chaque séance, colorie une île.' : 'Nach jeder Stunde malst du eine Insel an.' },
      { art: 'bilder', bilder: titel.map((t) => ({ bild, text: t })), spalten: titel.length > 4 ? 3 : 2, modus: 'anmalen' },
    )
  } else if (v.id === 'bergtour') {
    bausteine.push(
      { art: 'aufgabe', text: fr ? 'Après chaque étape : un mot ou un petit dessin – qu’est-ce que j’emporte ?' : 'Nach jeder Etappe: ein Wort oder ein kleines Bild – was nehme ich mit?' },
      { art: 'schritte', items: titel.map((t, i) => ({ titel: i === titel.length - 1 ? `${fr ? 'Sommet' : 'Gipfel'}: ${t}` : t, heute: false })), linien: 2 },
    )
  } else {
    bausteine.push(
      { art: 'aufgabe', text: fr ? 'Après chaque séance : le nom de l’outil et le moment où il peut t’aider.' : 'Nach jeder Sitzung: Name des Werkzeugs und der Moment, in dem es dir helfen kann.' },
      { art: 'tabelle', spalten: fr ? ['', 'Outil', 'Quand est-ce que je l’utilise ?'] : ['', 'Werkzeug', 'Wann setze ich es ein?'], zeilen: 0, werte: titel.map((t, i) => [String(i + 1), t, '']), breiten: [1, 4, 5], hoehe: 2 },
      { art: 'aufgabe', text: fr ? 'À la fin : entoure l’outil que tu gardes.' : 'Am Ende: Kreise das Werkzeug ein, das bleibt.' },
    )
  }
  const inhalt = { titel: v.name[sp], bausteine, lehrer: { ziel: '', ablauf: [], hintergrund: '' } }
  const jugend = p.alterJahre >= 12
  return {
    id: `pg-klammer-${hash8(plan.id + '|' + v.id)}`,
    bereich: jugend ? 'selbstreflexion' : 'gefuehle',
    thema: 'erkennen',
    stufen: [p.stufen[0] ?? 'C3'],
    layout: jugend ? 'jugend' : p.layout,
    sozialform: ['einzeln'],
    dauer: `${plan.dauer} Min.`,
    eldib: [],
    schlagworte: [],
    passgenau: {},
    de: inhalt,
    ...(fr ? { fr: inhalt } : {}),
  }
}
