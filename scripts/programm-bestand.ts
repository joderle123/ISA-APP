// Bestand für die Programm-Bibliothek: je Kompetenz × Altersstufe, wie viele Kern-Übungen es schon gibt (eigene mit Blatt,
// eigene ohne Blatt, Toolbox-Teile) und wie sie sich auf den Bogen verteilen. Schreibt docs/PROGRAMM-BESTAND.md.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/programm-bestand.ts
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ladeKatalogNode, ROOT } from './passgenau-quellen'
import { KOMPETENZ_NAME } from '../src/passgenau/kern/vokabular'

const STUFEN = [{ name: '3–6', von: 3, bis: 6 }, { name: '7–9', von: 7, bis: 9 }, { name: '10–12', von: 10, bis: 12 }, { name: '13–18', von: 13, bis: 18 }]
const BOGEN = ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen'] as const
// je Programm: 6 Sitzungen × (1 Haupt-Übung + 2 Auswechselspieler)
const SOLL = 18

const k = await ladeKatalogNode()
type Zelle = { eigen: number; eigenBlatt: number; toolbox: number; bogen: Record<string, number> }
const zellen = new Map<string, Zelle>()
const zelle = (kp: string, st: string) => {
  const s = `${kp}|${st}`
  if (!zellen.has(s)) zellen.set(s, { eigen: 0, eigenBlatt: 0, toolbox: 0, bogen: Object.fromEntries(BOGEN.map((b) => [b, 0])) })
  return zellen.get(s)!
}
for (const e of k.eintraege.values()) {
  if (e.typ !== 'schritt' || !e.rolle.includes('kern') || e.id.startsWith('pg:') || e.nurZumThema || e.einzeltauglich === 'nein') continue
  const eigen = e.id.startsWith('ki:') || e.id.startsWith('j:')
  for (const kp of e.kompetenz) for (const st of STUFEN) {
    if (e.alter.von > st.bis || e.alter.bis < st.von) continue
    const z = zelle(kp, st.name)
    if (eigen) {
      z.eigen++
      if ((e as { uebungsblatt?: unknown }).uebungsblatt) z.eigenBlatt++
      const b = (e as { bogen?: string }).bogen
      if (b && b in z.bogen) z.bogen[b]++
    } else z.toolbox++
  }
}

const zeilen: string[] = []
let fehlt = 0
zeilen.push('| Kompetenz | ' + STUFEN.map((s) => s.name).join(' | ') + ' |', '|---|' + STUFEN.map(() => '---').join('|') + '|')
for (const kp of Object.keys(KOMPETENZ_NAME)) {
  const z = STUFEN.map((st) => {
    const c = zelle(kp, st.name)
    fehlt += Math.max(0, SOLL - c.eigenBlatt)
    const b = BOGEN.map((x) => c.bogen[x]).join('/')
    return `**${c.eigenBlatt}**/${SOLL} · ${c.eigen} eigen · ${c.toolbox} Tb · ${b}`
  })
  zeilen.push(`| ${KOMPETENZ_NAME[kp as keyof typeof KOMPETENZ_NAME].de} | ${z.join(' | ')} |`)
}
const md = `# Programm-Bibliothek – Bestand (${new Date().toISOString().slice(0, 10)})

Je Zelle: **eigene Kern-Übungen mit Blatt** / Soll (${SOLL} = 6 Sitzungen × Haupt-Übung + 2 Auswechselspieler) ·
eigene Übungen insgesamt (ki:, j:) · Toolbox-Teile als Rohmaterial (Tb) · Bogen der eigenen Übungen
wahrnehmen/verstehen/üben/übertragen. Eine Übung zählt in jeder Altersstufe, die ihr Alter berührt.

${zeilen.join('\n')}

Noch zu schreiben (Übungen mit Blatt, über alle 48 Programme): **${fehlt}** – vor Wiederverwendung von Toolbox-Teilen.
Erzeugt mit \`scripts/programm-bestand.ts\`.
`
writeFileSync(join(ROOT, 'docs/PROGRAMM-BESTAND.md'), md)
console.log(md)
