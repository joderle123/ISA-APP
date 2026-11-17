// Baut die Sprach-Module (Deutsch, Französisch) aus tools/sprachen/*-m*.mjs:
//   src/data/blaetter/deutsch.json, francais.json   – Toolbox-Blätter (de + fr, Lehrerseite in beiden Sprachen)
//   src/blatt/module-sprachen.json                  – Hefte (Deckblatt, Themen, Lernziele, Wortschatz) für module.ts
//   insel/src/lycee/lektionen.js                    – Spielteil für Annexe Junglinster (Rollenspiel, Übungen, Lernkarte)
// Aufruf (aus isa-app): node tools/sprachen/baue.mjs
import { writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HIER = dirname(fileURLToPath(import.meta.url)), ROOT = join(HIER, '..', '..')
const dateien = readdirSync(HIER).filter((d) => /^(deutsch|francais)-m\d+\.mjs$/.test(d)).sort((a, b) => a.localeCompare(b, 'de', { numeric: true }))
const blaetter = { deutsch: [], francais: [] }, module = [], spiel = { deutsch: [], francais: [] }
for (const d of dateien) {
  const { MODUL, LEKTIONEN } = await import(pathToFileURL(join(HIER, d)).href)
  const lernziele = {}
  for (const l of LEKTIONEN) {
    lernziele[l.id] = l.ziel
    const inhalt = (sp) => ({ titel: l.titel, untertitel: l.untertitel, bausteine: l.bausteine, lehrer: l.lehrer[sp] })
    blaetter[MODUL.bereich].push({ id: l.id, bereich: MODUL.bereich, thema: l.thema, stufen: ['ES'], sozialform: ['einzeln', 'klasse'], dauer: '45–60 Min.', eldib: [],
      schlagworte: [...l.schlagworte, 'Modul ' + MODUL.nr], bild: l.bild, de: inhalt('de'), fr: inhalt('fr') })
  }
  module.push({ ...MODUL, lernziele })
  const merke = (l) => { const finde = (bs) => { for (const b of bs) { if (b.art === 'info' && b.symbol === 'merke') return b; if (b.art === 'spalten') { const x = finde(b.links) || finde(b.rechts); if (x) return x } } return null }; const m = finde(l.bausteine); return m ? { titel: m.titel, punkte: m.punkte } : null }
  spiel[MODUL.bereich].push({ nr: MODUL.nr, titel: MODUL.titel.de, ziele: LEKTIONEN.map((l) => l.titel), lektionen: LEKTIONEN.map((l) => ({ id: l.id, titel: l.titel, ziel: l.ziel.de, merke: merke(l), ...l.spiel })) })
}
for (const [b, l] of Object.entries(blaetter)) if (l.length) writeFileSync(join(ROOT, 'src/data/blaetter', b + '.json'), JSON.stringify(l, null, 1) + '\n')
writeFileSync(join(ROOT, 'src/blatt/module-sprachen.json'), JSON.stringify(module, null, 1) + '\n')
writeFileSync(join(ROOT, 'insel/src/lycee/lektionen.js'), '// ERZEUGT von tools/sprachen/baue.mjs – nicht von Hand ändern.\nexport const LEKTIONEN = ' + JSON.stringify(spiel, null, 1) + ';\n')
console.log('✓ Module: ' + module.map((m) => m.bereich + ' ' + m.nr).join(', ') + ' · Blätter: ' + Object.entries(blaetter).map(([b, l]) => b + ' ' + l.length).join(', '))
