// „Warum diese Folge?“ (17.10.2026, Übergang Dossier → Hilfe): in Alltagssprache, woraus der Plan entstanden ist – welcher Kurs,
// welche Ziele (und woher), welche Variante, was die Vorsicht geändert hat, welche Interessen vorkommen. So sieht die Fachkraft,
// dass die App das Kind „verstanden“ hat – oder wo sie korrigieren sollte.
import type { Plan, Profil } from '../typen'
import type { Katalog } from '../kern/katalog'
import { eintrag } from '../kern/katalog'
import { QUELLE_ZIEL, zielKurz } from './texte'

export interface PlanGruende {
  kurs: string | null
  punkte: string[]
  /** Hinweis, wenn der Plan wenig über das Kind weiß */
  luecke?: string
}

export function planGruende(k: Katalog, p: Profil, plan: Plan): PlanGruende {
  const kerne = plan.sitzungen.map((s) => s.schritte.find((x) => x.rolle === 'kern'))
  const linien = kerne.map((x) => (x ? eintrag(k, x.blattVon ?? x.ref) : undefined)).map((e) => (e?.typ === 'schritt' && e.linie?.id.startsWith('kurs-') ? e.linie.id : null))
  const kurs = linien.find((x) => !!x) ?? null
  const imKurs = linien.filter((x) => x === kurs).length
  const punkte: string[] = []
  const ziele = plan.ziele.map((c) => {
    const z = p.ziele.find((x) => x.code === c)
    return `${c} ${zielKurz(c)}${z ? ` (${z.quelle === 'steckbrief' ? 'Vorschlag aus dem Steckbrief, von dir übernommen' : (QUELLE_ZIEL[z.quelle] ?? z.quelle)})` : ''}`
  })
  if (kurs) punkte.push(`Der Kurs passt zu ${ziele.length === 1 ? 'dem Ziel' : 'den Zielen'} ${ziele.join(' und ')}${imKurs < plan.sitzungen.length ? ` – ${imKurs} von ${plan.sitzungen.length} Sitzungen aus dem Kurs, die übrigen passend dazu` : ''}.`)
  else if (ziele.length) punkte.push(`Kein Kurs passt genau – die Sitzungen sind aus einzelnen Übungen zu ${ziele.join(' und ')} gebaut.`)
  const b = kerne.filter((x) => x && (x.ref.endsWith('-b') || (x.blattVon ?? '').endsWith('-b'))).length
  if (b) punkte.push(`Variante mit weniger Text und mehr Bildern (${b === kerne.length ? 'in allen Sitzungen' : `${b}×`}) – weil Lesen ${p.zugang.lesen <= 1 ? 'wenig' : 'mittel'} und Schreiben ${p.zugang.schreiben <= 1 ? 'kaum' : 'wenig'} eingestellt ist.`)
  const schonend = kerne.filter((x) => x?.warum?.some((w) => w.startsWith('Eine schonendere Übung'))).length
  if (schonend) punkte.push(`${schonend} ${schonend === 1 ? 'Sitzung bekommt' : 'Sitzungen bekommen'} eine schonendere Übung, weil im Profil Vorsicht steht – Blatt und Ziel bleiben.`)
  if (p.zugang.tempo === 'ruhig') punkte.push('Ruhiges Tempo: kürzere Schritte, mit Beispiel.')
  const vor = p.vorsicht.filter((v) => v !== 'heikel')
  if (vor.length) punkte.push(`Vorsicht beachtet: ${vor.map((v) => ({ reiz: 'leise, ohne Wettkampf und Berührung', familie: 'Familie nur „wenn du magst“', trauer: 'keine Geschichten über Verlust', koerper: 'Körper und Essen behutsam', trauma: 'keine Gewaltbilder, keine Überraschungen' })[v] ?? v).join(' · ')}.`)
  const inter = new Set(plan.sitzungen.flatMap((s) => s.schritte.flatMap((x) => (x.warum ?? []).map((w) => /mit ([^-]+)-Beispiel \(Interesse\)/.exec(w)?.[1]).filter((w): w is string => !!w))))
  if (inter.size) punkte.push(`Interessen als Beispiele: ${[...inter].join(', ')}.`)
  if (p.sprache.woerter.length) punkte.push(`Wörterstreifen auch auf ${p.sprache.woerter.map((w) => (w === 'pt' ? 'Portugiesisch' : 'Luxemburgisch')).join(' und ')}.`)
  const luecke = !p.ziele.length ? 'Noch kein Förderziel bekannt – darum eine Folge zum Kennenlernen. Mit Zielen (ELDiB, PEI oder Vorschläge aus dem Steckbrief in „Das weiß ich schon“) wird der Plan genauer.' : undefined
  return { kurs, punkte, luecke }
}
