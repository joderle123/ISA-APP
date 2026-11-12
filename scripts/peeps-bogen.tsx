// Übersicht aller Peeps als HTML (zum Anschauen und Auswählen):
//   npx tsx --tsconfig tsconfig.scripts.json scripts/peeps-bogen.tsx <ausgabe.html>
import { writeFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { ZeichnungSvg } from '../src/blatt/ZeichnungSvg'
import { palette } from '../src/blatt/zeichnung'
import { BEREICHE } from '../src/blatt/katalog'
import { GEFUEHLE } from '../src/blatt/gesichter'
import { PEEPS, PEEP_NAMEN, PEEP_GESICHTER, PEEP_HALTUNGEN, PEEP_GESICHT, peepZeichnung } from '../src/blatt/peeps'

const p = palette(Object.values(BEREICHE)[0].farben)
const bild = (id: string[], klasse: string, text: string) =>
  `<figure class="${klasse}">${renderToStaticMarkup(<ZeichnungSvg z={peepZeichnung(id[0], id[1], id[2])} p={p} />)}<figcaption>${text}</figcaption></figure>`
let h = '<h2>Personen (peep:&lt;wer&gt;)</h2><div class="r">'
for (const n of PEEP_NAMEN) h += bild([n, 'froh'], 'b', n)
h += '</div><h2>Gefühle (peep:&lt;wer&gt;:&lt;gefühl&gt;)</h2><div class="r">'
for (const g of GEFUEHLE) h += bild(['jana', g], 'b', `${g}<br><small>${PEEP_GESICHT[g]}</small>`)
h += '</div><h2>Alle Gesichter</h2><div class="r">'
for (const g of PEEP_GESICHTER) h += bild(['finn', g], 'b', g)
h += '</div><h2>Haltungen (peep:&lt;wer&gt;:&lt;gefühl&gt;:&lt;haltung&gt;)</h2><div class="r">'
Object.keys(PEEP_HALTUNGEN).forEach((k, i) => (h += bild([PEEP_NAMEN[i % 14], 'froh', k], PEEP_HALTUNGEN[k].art === 'brust' ? 'b' : 's', k)))
h += '</div><h2>Ganze Figuren</h2><div class="r">'
for (const n of PEEP_NAMEN) h += bild([n, 'ruhig', 'stehen'], 's', n)
for (const n of PEEP_NAMEN.slice(0, 8)) h += bild([n, 'froh', 'sitzen'], 's', n)
h += '</div>'
writeFileSync(
  process.argv[2] ?? 'peeps.html',
  `<!doctype html><meta charset="utf-8"><title>Peeps</title><style>body{font:14px system-ui;margin:24px;background:#fff;color:#1B2233}h2{font-size:18px;margin:22px 0 8px}.r{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}figure{margin:0;text-align:center}figure svg{display:block}.b svg{width:128px;height:150px}.s svg{width:128px;height:260px}figcaption{font-size:12px}small{color:#8A93A3}</style>${h}`,
)
console.log(Object.keys(PEEPS).length, 'Personen')
