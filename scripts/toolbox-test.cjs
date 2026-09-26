// Browser-Test der Seiten „Arbeitsblätter“ und „Einheiten“ (gebaute Toolbox: dist/index.html).
//   npm run build   (oder: npx vite build)
//   node scripts/toolbox-test.cjs
// Prüft: PDF-Knopf auf der Karte, unbekannter Blatt-Link, Wechsel zu den Einheiten mit ELDiB-Ziel
// (auch nach Neuladen), Suche (kurze Wörter nur als Wort, Titel zuerst), Einzahl „1 Blatt“,
// Bereichs-Kacheln ohne Überlauf, voller Titel im Blatt-Dialog am Handy, Mappe (Sprache je Blatt,
// Dateinamen, Titel, Ladekreis am geklickten Knopf, Hinweis über der Mappe-Leiste).
const path = require('path')
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  ;({ chromium } = require('/opt/node22/lib/node_modules/playwright'))
}

const DATEI = 'file://' + path.join(__dirname, '..', 'dist', 'index.html')

let ok = 0
let fehlerZahl = 0
function pruefe(bed, text) {
  if (bed) ok++
  else {
    fehlerZahl++
    console.log('✗ ' + text)
  }
}

/** PDF-Titel steht als UTF-16BE-Text in der Datei. */
function pdfHatTitel(buf, titel) {
  return buf.includes(Buffer.from(titel, 'utf16le').swap16())
}

;(async () => {
  const browser = await chromium.launch()
  const meldungen = []
  async function neueSeite(viewport, handy) {
    const ctx = await browser.newContext({ viewport, acceptDownloads: true, isMobile: !!handy, hasTouch: !!handy })
    const page = await ctx.newPage()
    page.on('pageerror', (e) => meldungen.push('pageerror: ' + e.message))
    page.on('console', (m) => m.type() === 'error' && meldungen.push('console: ' + m.text()))
    return page
  }
  const sichtbarH1 = (page) => page.evaluate(() => [...document.querySelectorAll('h1')].filter((h) => h.offsetParent).map((h) => h.textContent).join(','))
  const karten = (page) => page.$$eval('main#blaetter article.bl-karte h3', (els) => els.map((e) => e.textContent))

  const page = await neueSeite({ width: 1280, height: 900 })
  await page.goto(DATEI)
  await page.waitForSelector('main#blaetter article.bl-karte')

  // PDF-Knopf auf der Karte lädt herunter (öffnet nicht den Dialog)
  const pdfKnopf = page.locator('main#blaetter article.bl-karte').first().locator('button[aria-label^="PDF herunterladen"]')
  const kasten = await pdfKnopf.boundingBox()
  const dl1 = page.waitForEvent('download', { timeout: 30000 }).catch(() => null)
  await page.mouse.click(kasten.x + kasten.width / 2, kasten.y + kasten.height / 2)
  pruefe((await dl1)?.suggestedFilename().endsWith('.pdf'), 'PDF-Knopf auf der Karte lädt das Blatt herunter')
  pruefe((await page.locator('dialog[open]').count()) === 0, 'PDF-Knopf auf der Karte öffnet keinen Dialog')
  await page.keyboard.press('Escape')

  // Unbekanntes Blatt im Link → Hinweis
  for (const [id, wie] of [['gibt-es-nicht', 'beim Öffnen'], ['auch-nicht', 'als späterer Link']]) {
    if (wie === 'beim Öffnen') await page.goto('about:blank')
    await page.goto(DATEI + '#blatt=' + id)
    const hinweis = await page.waitForSelector(`.toast:has-text("„${id}“ wurde nicht gefunden")`, { timeout: 5000 }).catch(() => null)
    pruefe(!!hinweis, `unbekanntes Blatt ${wie}: Hinweis „nicht gefunden“`)
    pruefe((await page.locator('dialog[open]').count()) === 0, `unbekanntes Blatt ${wie}: kein Dialog`)
  }

  // „Auch Einheiten dazu ansehen“ → Einheiten mit dem Ziel, auch nach Neuladen
  await page.goto(DATEI + '#eldib=V-21')
  await page.getByRole('button', { name: 'Auch Einheiten dazu ansehen' }).click()
  await page.waitForTimeout(400)
  const aufEinheiten = async (text) => {
    pruefe((await sichtbarH1(page)) === 'Einheiten', `${text}: Seite „Einheiten“`)
    pruefe((await page.locator('.achip.eldib:visible', { hasText: 'V-21' }).count()) === 1, `${text}: Filter V-21 gesetzt`)
  }
  await aufEinheiten('„Auch Einheiten dazu ansehen“')
  pruefe(page.url().includes('seite=einheiten'), 'Hash nennt die Seite „Einheiten“')
  await page.reload()
  await page.waitForTimeout(500)
  await aufEinheiten('nach Neuladen')
  await page.goto('about:blank')
  await page.goto(DATEI + '#eldib=V-21&seite=einheiten')
  await page.getByRole('button', { name: 'Arbeitsblätter ansehen' }).click()
  await page.waitForTimeout(300)
  pruefe((await sichtbarH1(page)) === 'Arbeitsblätter', '„Arbeitsblätter ansehen“ öffnet die Arbeitsblätter')
  await page.getByRole('button', { name: 'Auch Einheiten dazu ansehen' }).click()
  await page.waitForTimeout(400)
  await aufEinheiten('hin und zurück')

  // Suche: kurze Wörter nur als ganzes Wort bzw. Wortanfang, längere überall; Titel-Treffer zuerst
  await page.goto(DATEI)
  await page.waitForSelector('main#blaetter article.bl-karte')
  const suche = page.locator('input[placeholder^="Suchen:"]')
  const suchen = async (q) => {
    await suche.fill(q)
    await page.waitForTimeout(200)
    return karten(page)
  }
  const ki = await suchen('KI')
  pruefe(ki.length > 0 && ki.length <= 10, `„KI“ findet nur Blätter mit dem Wort KI (${ki.length})`)
  pruefe(/\bKI\b/.test(ki[0] ?? ''), '„KI“: Blatt mit KI im Titel steht vorn')
  pruefe(!ki.some((t) => /Skills-Pass|Kinder/.test(t)), '„KI“ trifft nicht „Skills“ oder „Kinder“')
  pruefe((await suchen('Wut')).includes('Mein Wutvulkan'), '„Wut“ findet „Mein Wutvulkan“ (Wortanfang)')
  pruefe((await suchen('Angst')).includes('Prüfungsangst in den Griff bekommen'), '„Angst“ findet „Prüfungsangst …“ (Wortteil)')
  const pause = await suchen('Pause')
  pruefe(/Pause/.test(pause[0] ?? ''), '„Pause“: Titel-Treffer steht vorn')
  pruefe((await suchen('Skills')).length >= 100, '„Skills“ findet weiter die Blätter des Skills-Kurses')

  // Einzahl: „1 Blatt“
  await suchen('Lebensnetz')
  const kopf = await page.evaluate(() => [...document.querySelectorAll('h1')].find((h) => h.offsetParent && h.textContent === 'Arbeitsblätter').nextElementSibling.textContent)
  pruefe(/^1 von \d+ Blättern ·/.test(kopf), `Kopfzeile „1 von … Blättern“ (${kopf.slice(0, 22)})`)
  pruefe((await page.textContent('.bl-bereich-kachel')).includes('1 Blatt'), 'Kachel „Alle“: „1 Blatt“')
  await page.setViewportSize({ width: 800, height: 900 })
  await page.locator('button', { hasText: /^Filter$/ }).first().click()
  pruefe((await page.textContent('dialog[open] .dlg-foot')).trim() === '1 Blatt anzeigen', 'Filter-Dialog: „1 Blatt anzeigen“')
  await page.keyboard.press('Escape')
  await suche.fill('')

  // Bereichs-Kacheln: kein Text ragt heraus
  for (const w of [1180, 1024, 800, 600]) {
    await page.setViewportSize({ width: w, height: 900 })
    await page.waitForTimeout(100)
    const raus = await page.evaluate(() =>
      [...document.querySelectorAll('.bl-bereich-kachel')].filter((k) => {
        const r = document.createRange()
        r.selectNodeContents(k.querySelector('b'))
        return Math.max(...[...r.getClientRects()].map((x) => x.right)) > k.getBoundingClientRect().right - parseFloat(getComputedStyle(k).paddingRight) + 0.5
      }).length,
    )
    pruefe(raus === 0, `Bereichs-Kacheln bei ${w} px ohne Überlauf`)
  }

  // Einheiten-Suche: „KI“ nur als Wort
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.locator('nav.haupt-reiter button', { hasText: 'Einheiten' }).click()
  await page.fill('input[placeholder^="Titel, Thema"]', 'KI')
  await page.waitForTimeout(300)
  const einheitenKi = Number(/\d+/.exec(await page.evaluate(() => document.querySelector('main#ergebnisse h1').nextElementSibling.textContent))[0])
  pruefe(einheitenKi <= 5, `Einheiten: „KI“ nur als Wort (${einheitenKi} Treffer)`)

  // Mappe: Blatt auf Französisch, Dateinamen, Titel, Ladekreis, Hinweis über der Leiste
  await page.goto('about:blank')
  await page.goto(DATEI + '#blatt=beduerfnis-glaeser')
  await page.waitForSelector('dialog[open]')
  await page.locator('dialog[open] .seg button', { hasText: 'FR' }).click()
  await page.locator('dialog[open] button', { hasText: 'In die Mappe legen' }).click()
  await page.keyboard.press('Escape')
  const mappe = async (knopf) => {
    const dl = page.waitForEvent('download', { timeout: 60000 }).catch(() => null)
    await page.locator('.bl-mappe button', { hasText: knopf }).click()
    const d = await dl
    await page.waitForTimeout(300)
    return d ? { name: d.suggestedFilename(), buf: require('fs').readFileSync(await d.path()) } : { name: 'kein Download', buf: Buffer.alloc(0) }
  }
  const fr = await mappe('Als ein PDF')
  pruefe(fr.name === 'Mappe_arbeitsblaetter_FR.pdf', `Mappe mit französischem Blatt: Dateiname _FR (${fr.name})`)
  pruefe(fr.buf.includes('/Lang (fr)'), 'Mappe mit französischem Blatt ist französisch')
  pruefe(pdfHatTitel(fr.buf, 'Arbeitsblätter'), 'Mappe hat den Titel „Arbeitsblätter“')
  const frei = await page.evaluate(() =>
    [...document.querySelectorAll('.bl-mappe button')].every((b) => {
      const r = b.getBoundingClientRect()
      return !document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)?.closest('.toast')
    }),
  )
  pruefe(frei, 'Hinweis nach dem Herunterladen verdeckt die Mappe-Leiste nicht')
  const dlL = page.waitForEvent('download', { timeout: 60000 }).catch(() => null)
  const kreis = await page.evaluate(async () => {
    const knopf = [...document.querySelectorAll('.bl-mappe button')].find((b) => b.textContent.includes('Mit Lehrerseiten'))
    knopf.click()
    await new Promise((r) => requestAnimationFrame(() => r()))
    return [...document.querySelectorAll('.bl-mappe button')].filter((b) => b.querySelector('.spin')).map((b) => b.textContent.trim())
  })
  pruefe(kreis.length === 1 && kreis[0] === 'Mit Lehrerseiten', `Ladekreis am geklickten Knopf („${kreis.join(', ')}“)`)
  const lehrer = (await dlL)?.suggestedFilename()
  pruefe(lehrer === 'Mappe_arbeitsblaetter_FR_mit-Lehrerseiten.pdf', `Mappe mit Lehrerseiten: eigener Dateiname (${lehrer})`)
  await page.waitForTimeout(300)
  await page.locator('main#blaetter article.bl-karte label.bl-wahl').first().click()
  const gemischt = await mappe('Als ein PDF')
  pruefe(gemischt.name === 'Mappe_arbeitsblaetter_DE-FR.pdf', `gemischte Mappe: Dateiname _DE-FR (${gemischt.name})`)

  // Handy: voller Titel im Blatt-Dialog, Hinweis über der Mappe-Leiste
  const handy = await neueSeite({ width: 390, height: 844 }, true)
  await handy.goto(DATEI + '#blatt=fokus')
  await handy.waitForSelector('#bl-detail-titel')
  const titel = await handy.evaluate(() => {
    const t = document.querySelector('#bl-detail-titel')
    return { ganz: t.scrollWidth <= t.clientWidth + 1 && getComputedStyle(t).whiteSpace !== 'nowrap', text: t.textContent }
  })
  pruefe(titel.ganz, `Handy: Blatt-Titel im Dialog ganz zu sehen („${titel.text}“)`)
  await handy.keyboard.press('Escape')
  await handy.locator('main#blaetter article.bl-karte label.bl-wahl').first().click()
  const dlH = handy.waitForEvent('download', { timeout: 60000 }).catch(() => null)
  await handy.locator('.bl-mappe button', { hasText: 'Als ein PDF' }).click()
  await dlH
  await handy.waitForSelector('.toast')
  const lage = await handy.evaluate(() => ({ hinweis: document.querySelector('.toast').getBoundingClientRect().bottom, leiste: document.querySelector('.bl-mappe').getBoundingClientRect().top }))
  pruefe(lage.hinweis <= lage.leiste, `Handy: Hinweis über der Mappe-Leiste (${Math.round(lage.hinweis)}/${Math.round(lage.leiste)} px)`)

  pruefe(meldungen.length === 0, 'keine Fehler in der Konsole: ' + meldungen.join(' | '))
  await browser.close()
  console.log(`${ok + fehlerZahl} Prüfungen, ${fehlerZahl} Fehler`)
  process.exit(fehlerZahl ? 1 : 0)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
