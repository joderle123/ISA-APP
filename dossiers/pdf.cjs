// HTML → PDF, prüft jede Seite auf Überlauf und (mit BILDER=ordner) legt Seitenbilder ab.
//   node dossiers/pdf.cjs m5 [m3 …]      BILDER=/pfad SEITEN=4,5 node dossiers/pdf.cjs m5
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

;(async () => {
  const hier = __dirname
  const aus = path.join(hier, 'aus')
  const pdfDir = path.join(hier, 'pdf')
  fs.mkdirSync(pdfDir, { recursive: true })
  const browser = await chromium.launch()
  let schlecht = 0
  for (const id of process.argv.slice(2)) {
    const datei = id + '.html'
    if (!fs.existsSync(path.join(aus, datei))) { console.error('keine HTML-Datei für', id); schlecht++; continue }
    const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 })
    await page.goto('file://' + path.join(aus, datei))
    await page.waitForFunction(() => document.body.dataset.fertig === '1')
    const bericht = await page.evaluate(() => {
      const r = []
      document.querySelectorAll('.seite').forEach((s) => {
        const nr = s.dataset.nr
        const inh = s.querySelector('.inhalt')
        let frei = 0
        if (inh) {
          const cs = getComputedStyle(inh)
          const kinder = [...inh.children]
          const summe = kinder.reduce((h, k) => h + k.getBoundingClientRect().height, 0)
          const platz = inh.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - summe - (kinder.length - 1) * parseFloat(cs.rowGap || '0')
          frei = Math.round((platz / 96) * 25.4)
        } else {
          frei = 0
        }
        let breit = ''
        s.querySelectorAll('.inhalt *').forEach((el) => {
          if (el.closest('svg')) return
          if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') breit = el.className
          const b = el.getBoundingClientRect(); const sb = s.getBoundingClientRect()
          if (!b.width || !b.height) return
          if (b.right > sb.right - 20 || b.left < sb.left + 20) breit = 'Rand: ' + el.className
        })
        r.push({ nr, frei, breit })
      })
      return r
    })
    for (const b of bericht) {
      const zeichen = b.frei < 0 ? '✗ ÜBERLAUF' : b.frei > 28 ? '· viel Platz' : ''
      if (b.frei < 0 || b.breit) schlecht++
      if (zeichen || b.breit) console.log(`  S.${b.nr}: frei ${b.frei} mm ${zeichen} ${b.breit}`)
    }
    console.log(id, bericht.map((b) => b.frei).join(' '))
    const name = await page.evaluate(() => document.querySelector('meta[name=datei]').content)
    const ziel = path.join(pdfDir, name + '.pdf')
    await page.pdf({ path: ziel, preferCSSPageSize: true, printBackground: true })
    console.log(id, '→', path.relative(hier, ziel), Math.round(fs.statSync(ziel).size / 1024), 'KB,', bericht.length, 'Seiten')
    if (process.env.BILDER) {
      fs.mkdirSync(process.env.BILDER, { recursive: true })
      const nur = process.env.SEITEN ? process.env.SEITEN.split(',') : null
      const els = await page.$$('.seite')
      for (let i = 0; i < els.length; i++) {
        if (nur && !nur.includes(String(i + 1))) continue
        await els[i].screenshot({ path: path.join(process.env.BILDER, `${id}-${String(i + 1).padStart(2, '0')}.png`) })
      }
    }
    await page.close()
  }
  await browser.close()
  if (schlecht) { console.error(schlecht, 'Problem(e)'); process.exit(1) }
})()
