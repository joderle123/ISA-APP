// Browser-Test der Seite „Skills-Kurs“ (gebaute Toolbox: dist/index.html).
//   npm run build   (oder: npx vite build)
//   node scripts/kurs-test.cjs
// Prüft: nächste Einheit, Kursjahr-Reiter, Einheit öffnen, Fahrplan, Material
// abhaken und Notiz (bleiben nach Neuladen), „Heute gehalten“, Gruppen, Deep-Links,
// Reiterwechsel mit offener Einheit („Jahresweg“, Zurück), PDF der Schülerblätter,
// Grundlagen, Druckansicht, Blatt-Vorschau, Handy-Breite.
const path = require('path')
const fs = require('fs')
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  ;({ chromium } = require('/opt/node22/lib/node_modules/playwright'))
}

const DATEI = 'file://' + path.join(__dirname, '..', 'dist', 'index.html')
const kursDir = path.join(__dirname, '..', 'src', 'data', 'kurs')
const kurs = fs
  .readdirSync(kursDir)
  .filter((d) => d.endsWith('.json'))
  .map((d) => JSON.parse(fs.readFileSync(path.join(kursDir, d), 'utf8')))
const einheiten = new Map(kurs.flatMap((k) => k.einheiten ?? []).map((e) => [e.id, e]))
const jahr1 = kurs.find((k) => k.jahr && k.jahr.nr === 1)
const reihe = jahr1.module.flatMap((m) => m.einheiten).filter((id) => einheiten.has(id))
const jahrZahl = kurs.filter((k) => k.jahr).length

let ok = 0
let fehlerZahl = 0
function pruefe(bed, text) {
  if (bed) ok++
  else {
    fehlerZahl++
    console.log('✗ ' + text)
  }
}

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  const meldungen = []
  page.on('pageerror', (e) => meldungen.push('pageerror: ' + e.message))
  page.on('console', (m) => m.type() === 'error' && meldungen.push('console: ' + m.text()))

  await page.goto(DATEI + '#kurs')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.waitForSelector('.ku-held')

  const e1 = einheiten.get(reihe[0])
  pruefe((await page.textContent('.ku-held h2')).includes(e1.titel), 'Held zeigt die erste Einheit')
  pruefe((await page.inputValue('.ku-gruppenwahl select')) !== '', 'eine Gruppe ist angelegt')
  pruefe((await page.locator('.ku-stufe').count()) === jahr1.module.length, 'Jahresweg zeigt alle Module')
  pruefe((await page.locator('button.ku-kachel').count()) === reihe.length, 'Jahresweg zeigt alle fertigen Einheiten als Kachel')
  pruefe((await page.locator('.ku-stufe.aktuell').count()) === 1, 'genau ein Modul ist „jetzt dran“')
  pruefe((await page.locator('button.ku-kachel.naechste').count()) === 1, 'genau eine Kachel ist „als Nächstes“')
  if (jahrZahl > 1) {
    pruefe((await page.locator('.ku-jahr').count()) === jahrZahl, `${jahrZahl} Reiter für die Kursjahre`)
    pruefe((await page.textContent('.ku-jahr.an')).includes('Kursjahr 1'), 'Reiter zeigt das Kursjahr der Gruppe')
    pruefe((await page.textContent('.ku-jahr.an')).includes('eure Gruppe'), '„eure Gruppe“ steht am Kursjahr der Gruppe')
  }

  // Einheit öffnen
  await page.click('.ku-held-aktionen .btn-primary')
  await page.waitForSelector('.ku-einheit-kopf')
  pruefe(page.url().endsWith('#kurs=' + e1.id), 'Deep-Link der Einheit im Hash')
  pruefe((await page.locator('.ku-einheit-kopf .ku-leiste span').count()) === e1.ablauf.length, 'Ablauf-Leiste vollständig')
  pruefe((await page.locator('.ku-einheit-kopf .ku-legende li').count()) === new Set(e1.ablauf.map((z) => z.phase)).size, 'Legende nennt jede Phase einmal')
  pruefe((await page.locator('.ku-schritt').count()) === e1.schritte.length, 'alle Schritte sichtbar')
  const fp = page.locator('.ku-fahrplan button')
  pruefe((await fp.count()) === e1.schritte.length, 'Fahrplan listet alle Schritte')
  pruefe((await page.locator('.ku-fahrplan button.an').count()) === 1, 'im Fahrplan ist genau ein Schritt markiert')
  pruefe((await page.textContent('.ku-schritt-zeit')).includes('0–' + e1.schritte[0].dauer), 'erster Schritt zeigt seine Minuten')
  pruefe((await page.locator('.ku-material input').count()) === e1.material.length, 'Material als Checkliste')

  // Material abhaken + Notiz → bleibt nach Neuladen
  await page.locator('.ku-material input').first().check()
  await page.fill('.ku-notiz textarea', 'Stühle vorher stellen.')
  await page.locator('.ku-notiz textarea').blur()
  await page.waitForTimeout(300)
  await page.reload()
  await page.waitForSelector('.ku-einheit-kopf')
  pruefe(await page.locator('.ku-material input').first().isChecked(), 'Material-Haken bleibt nach Neuladen')
  pruefe((await page.inputValue('.ku-notiz textarea')) === 'Stühle vorher stellen.', 'Notiz bleibt nach Neuladen')

  // Druckansicht
  pruefe((await page.locator('body > .ku-druck').count()) === 1, 'Druckfassung vorhanden')
  await page.emulateMedia({ media: 'print' })
  pruefe(await page.locator('body > .ku-druck').isVisible(), 'Druckfassung im Druck sichtbar')
  pruefe(!(await page.locator('header.sticky').isVisible()), 'Kopfzeile im Druck ausgeblendet')
  await page.emulateMedia({ media: 'screen' })
  pruefe(!(await page.locator('body > .ku-druck').isVisible()), 'Druckfassung am Bildschirm unsichtbar')

  // Blatt-Vorschau öffnen und schließen
  if ((await page.locator('.ku-blaetter button').count()) > 0) {
    await page.locator('.ku-blaetter button').first().click()
    await page.waitForSelector('dialog.bl-detail[open]')
    pruefe(true, 'Blatt-Dialog öffnet')
    await page.click('dialog.bl-detail .icon-btn[aria-label="Schließen"]')
    pruefe((await page.locator('dialog.bl-detail[open]').count()) === 0, 'Blatt-Dialog schließt')
  }

  // Heute gehalten → Übersicht zeigt die nächste Einheit
  await page.click('.ku-einheit-aktionen .btn-primary')
  pruefe(await page.locator('.ku-gehalten').isVisible(), '„Gehalten am“ erscheint')
  await page.click('.ku-einheit-nav .link-btn')
  await page.waitForSelector('.ku-held')
  pruefe((await page.textContent('.ku-fortschritt')).includes('1 von'), 'Fortschritt zählt 1')
  if (reihe[1]) pruefe((await page.textContent('.ku-held h2')).includes(einheiten.get(reihe[1]).titel), 'Held zeigt die zweite Einheit')
  pruefe((await page.locator('button.ku-kachel.erledigt').count()) === 1, 'erste Einheit im Jahresweg abgehakt')

  // Anderes Kursjahr ansehen, ohne die Gruppe umzustellen
  const jahr2 = kurs.find((k) => k.jahr && k.jahr.nr === 2)
  if (jahr2) {
    await page.locator('.ku-jahr', { hasText: 'Kursjahr 2' }).click()
    pruefe(await page.locator('.ku-sichtinfo').isVisible(), 'anderes Kursjahr: Hinweis statt „Als Nächstes“')
    pruefe((await page.locator('.ku-held').count()) === 0, 'anderes Kursjahr: kein „Als Nächstes“')
    pruefe((await page.locator('.ku-stufe').count()) === jahr2.module.length, 'anderes Kursjahr: dessen Module im Jahresweg')
    pruefe((await page.locator('.ku-stufe.aktuell, button.ku-kachel.naechste').count()) === 0, 'anderes Kursjahr: nichts ist „jetzt dran“')
    await page.locator('.ku-jahr', { hasText: 'Kursjahr 1' }).click()
    pruefe(await page.locator('.ku-held').isVisible(), 'zurück beim Kursjahr der Gruppe')
    pruefe((await page.textContent('.ku-fortschritt')).includes('1 von'), 'Ansehen ändert den Stand der Gruppe nicht')
  }

  // Zweite Gruppe: eigener Stand, erste bleibt erhalten
  await page.click('.ku-gruppenwahl .btn')
  await page.waitForSelector('dialog .ku-gruppen')
  await page.fill('.ku-gruppe-neu input', 'Dienstag 14 Uhr')
  await page.click('.ku-gruppe-neu button[type=submit]')
  await page.click('dialog .icon-btn[aria-label="Schließen"]')
  pruefe((await page.locator('.ku-gruppenwahl option').count()) === 2, 'zwei Gruppen')
  pruefe((await page.textContent('.ku-held h2')).includes(e1.titel), 'neue Gruppe beginnt bei Einheit 1')
  await page.selectOption('.ku-gruppenwahl select', { index: 0 })
  pruefe((await page.textContent('.ku-fortschritt')).includes('1 von'), 'erste Gruppe behält ihren Stand')

  // Zurücknehmen
  await page.goto(DATEI + '#kurs=' + e1.id)
  await page.waitForSelector('.ku-gehalten')
  await page.click('.ku-gehalten .link-btn')
  pruefe((await page.locator('.ku-gehalten').count()) === 0, '„Zurücknehmen“ entfernt den Eintrag')

  // Blättern zur nächsten Einheit
  if (reihe[1]) {
    await page.locator('.ku-einheit-nav .btn', { hasText: 'Einheit 2' }).click()
    await page.waitForSelector('.ku-einheit-kopf')
    pruefe((await page.textContent('#ku-einheit-titel')).includes(einheiten.get(reihe[1]).titel), 'Blättern zu Einheit 2')
  }

  // Fahrplan: Klick springt zum Schritt, beim Scrollen wandert die Markierung mit
  await page.goto(DATEI + '#kurs=' + e1.id)
  await page.waitForSelector('.ku-fahrplan')
  if (e1.schritte.length > 3) {
    const kopf = await page.evaluate(() => document.querySelector('header.sticky').offsetHeight)
    await fp.nth(3).click()
    await page.waitForTimeout(1300)
    const oben = await page.evaluate(() => document.getElementById('ku-s-3').getBoundingClientRect().top)
    pruefe(oben >= kopf && oben < kopf + 80, `Klick im Fahrplan springt zu Schritt 4 (oben: ${Math.round(oben)} px)`)
    pruefe(await fp.nth(3).evaluate((b) => b.classList.contains('an')), 'angeklickter Schritt ist markiert')
    const fpOben = await page.evaluate(() => document.querySelector('.ku-fahrplan').getBoundingClientRect().top)
    pruefe(fpOben >= kopf && fpOben < kopf + 40, `Fahrplan bleibt beim Scrollen oben stehen (oben: ${Math.round(fpOben)} px)`)
    await page.evaluate(() => window.scrollTo(0, document.getElementById('ku-s-1').getBoundingClientRect().top + window.scrollY - 100))
    await page.waitForTimeout(1100)
    pruefe(await fp.nth(1).evaluate((b) => b.classList.contains('an')), 'beim Scrollen wandert die Markierung mit')
  }

  // Grundlagen
  await page.goto(DATEI + '#kurs=grundlagen')
  await page.waitForSelector('#ku-gl-titel')
  pruefe(true, 'Grundlagen-Seite öffnet')
  if (jahrZahl === 3) {
    const anzahl = (nr) => kurs.find((k) => k.jahr && k.jahr.nr === nr).module.flatMap((m) => m.einheiten).length
    const gl = await page.textContent('.ku-gl-inhalt')
    pruefe(gl.includes(`${anzahl(1)} Einheiten in Kursjahr 1`) && (anzahl(2) !== anzahl(3) || gl.includes(`je ${anzahl(2)} in Kursjahr 2 und 3`)), 'Grundlagen nennen die Einheiten aller Kursjahre')
  }

  // Reiterwechsel und zurück
  await page.goto(DATEI + '#kurs')
  await page.waitForSelector('.ku-held')
  await page.click('.haupt-reiter button:has-text("Arbeitsblätter")')
  pruefe(!(await page.locator('.ku-held').isVisible()), 'Kurs verschwindet beim Reiterwechsel')
  await page.click('.haupt-reiter button:has-text("Skills-Kurs")')
  pruefe(await page.locator('.ku-held').isVisible(), 'Kurs erscheint wieder')
  pruefe(page.url().endsWith('#kurs'), 'Hash #kurs nach Reiterwechsel')

  // Offene Einheit, Reiterwechsel hin und zurück: Einheit bleibt, „Jahresweg“ und Zurück gehen weiter
  const zeigt = (sel) => page.waitForSelector(sel, { timeout: 5000 }).then(() => true, () => false)
  await page.goto(DATEI + '#kurs=' + e1.id)
  await page.waitForSelector('.ku-einheit-kopf')
  await page.click('.haupt-reiter button:has-text("Arbeitsblätter")')
  await page.click('.haupt-reiter button:has-text("Skills-Kurs")')
  pruefe(await page.locator('.ku-einheit-kopf').isVisible(), 'Reiterwechsel: die offene Einheit bleibt')
  pruefe(page.url().endsWith('#kurs=' + e1.id), 'Reiterwechsel: Hash nennt die offene Einheit')
  await page.click('.ku-einheit-nav .link-btn')
  pruefe((await zeigt('.ku-held')) && page.url().endsWith('#kurs'), '„Jahresweg“ nach Reiterwechsel führt zur Übersicht')
  await page.goBack()
  pruefe((await zeigt('.ku-einheit-kopf')) && page.url().endsWith('#kurs=' + e1.id), 'Zurück führt wieder zur Einheit')
  await page.click('.haupt-reiter button:has-text("Skills-Kurs")')
  pruefe((await zeigt('.ku-held')) && page.url().endsWith('#kurs'), 'Klick auf den offenen Reiter „Skills-Kurs“ führt zur Übersicht')
  await page.goBack()
  pruefe((await zeigt('.ku-einheit-kopf')) && page.url().endsWith('#kurs=' + e1.id), 'danach führt Zurück wieder zur Einheit')

  // PDF der Schülerblätter: „Als Nächstes“ wie auf der Seite der Einheit, Dateinamen je Fassung
  await page.goto(DATEI + '#kurs')
  await page.waitForSelector('.ku-held')
  pruefe((await page.locator('.ku-held-aktionen button', { hasText: 'Alle Blätter' }).count()) === 0, '„Als Nächstes“: kein „Alle Blätter (PDF)“ mit Lehrerseiten mehr')
  const heldPdf = page.locator('.ku-held-aktionen button', { hasText: 'Schülerblätter (PDF)' })
  if (await heldPdf.count()) {
    const dl = page.waitForEvent('download', { timeout: 120000 })
    await heldPdf.click()
    const name = (await dl).suggestedFilename()
    pruefe(!name.includes('Lehrerseite'), `„Als Nächstes“: Schülerblätter ohne Lehrerseiten (${name})`)
  }
  if (e1.blaetter?.length) {
    await page.goto(DATEI + '#kurs=' + e1.id)
    await page.waitForSelector('.ku-einheit-aktionen')
    const dl = page.waitForEvent('download', { timeout: 120000 })
    await page.locator('.ku-einheit-aktionen button', { hasText: 'Mit Lehrerseiten' }).click()
    const name = (await dl).suggestedFilename()
    pruefe(name.endsWith('_mit-Lehrerseiten.pdf'), `Einheit: „Mit Lehrerseiten“ mit eigenem Dateinamen (${name})`)
  }

  // Kursjahre 2 und 3: Gruppe umstellen → Jahresweg, Joker, erste Einheit.
  // Jahr 2 über Reiter und „umstellen“, Jahr 3 über den Gruppen-Dialog.
  for (const nr of [2, 3]) {
    const jk = kurs.find((k) => k.jahr && k.jahr.nr === nr)
    if (!jk) continue
    const reiheN = jk.module.flatMap((m) => m.einheiten).filter((id) => einheiten.has(id))
    const jokerN = [...einheiten.values()].filter((e) => e.joker && e.jahr === nr).length
    await page.goto(DATEI + '#kurs')
    await page.waitForSelector('.ku-held')
    if (nr === 2) {
      await page.locator('.ku-jahr', { hasText: 'Kursjahr ' + nr }).click()
      await page.click('.ku-sichtinfo .btn')
    } else {
      await page.click('.ku-gruppenwahl .btn')
      await page.waitForSelector('dialog .ku-gruppen')
      await page.selectOption('dialog .ku-gruppen li.aktiv select[aria-label="Kursjahr"]', String(nr))
      await page.click('dialog .icon-btn[aria-label="Schließen"]')
    }
    await page.waitForSelector('.ku-held')
    const erste = einheiten.get(reiheN[0])
    pruefe((await page.textContent('.ku-held h2')).includes(erste.titel), `Jahr ${nr}: Held zeigt die erste Einheit`)
    pruefe((await page.textContent('.ku-jahr.an')).includes('Kursjahr ' + nr) && (await page.textContent('.ku-jahr.an')).includes('eure Gruppe'), `Jahr ${nr}: Reiter zeigt „eure Gruppe“`)
    pruefe((await page.locator('.ku-sichtinfo').count()) === 0, `Jahr ${nr}: kein Hinweis „anderes Kursjahr“`)
    pruefe((await page.locator('.ku-stufe').count()) === jk.module.length, `Jahr ${nr}: Jahresweg zeigt alle ${jk.module.length} Module`)
    pruefe((await page.locator('button.ku-kachel').count()) === reiheN.length, `Jahr ${nr}: ${reiheN.length} Einheiten im Jahresweg`)
    pruefe((await page.locator('.ku-joker-karte').count()) === jokerN, `Jahr ${nr}: ${jokerN} Joker`)
    await page.click('.ku-held-aktionen .btn-primary')
    await page.waitForSelector('.ku-einheit-kopf')
    pruefe((await page.locator('.ku-schritt').count()) === erste.schritte.length, `Jahr ${nr}: erste Einheit mit allen Schritten`)
    pruefe((await page.textContent('.ku-einheit-kopf')).includes('von ' + reiheN.length), `Jahr ${nr}: „Einheit 1 von ${reiheN.length}“`)
  }
  await page.goto(DATEI + '#kurs')
  await page.waitForSelector('.ku-held')

  // Schmale Ansicht ohne waagrechtes Scrollen im Inhalt
  await page.setViewportSize({ width: 390, height: 800 })
  const breit = await page.evaluate(() => document.querySelector('.ku-held').scrollWidth <= document.querySelector('.ku-held').clientWidth + 1)
  pruefe(breit, 'Held passt auf 390 px')
  const passt = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
  pruefe(await passt(), 'Übersicht ohne waagrechtes Scrollen auf 390 px')
  await page.click('.ku-held-aktionen .btn-primary')
  await page.waitForSelector('.ku-fahrplan')
  pruefe(await passt(), 'Einheit ohne waagrechtes Scrollen auf 390 px')
  const kopfHandy = await page.evaluate(() => document.querySelector('header.sticky').offsetHeight)
  await page.evaluate(() => window.scrollTo(0, document.getElementById('ku-s-2').getBoundingClientRect().top + window.scrollY - 150))
  await page.waitForTimeout(1100)
  const leiste = await page.evaluate(() => {
    const nav = document.querySelector('.ku-fahrplan').getBoundingClientRect()
    const an = document.querySelector('.ku-fahrplan button.an').getBoundingClientRect()
    return { oben: nav.top, sichtbar: an.left >= nav.left - 1 && an.right <= nav.right + 1 }
  })
  pruefe(Math.abs(leiste.oben - kopfHandy) <= 2, `Handy: Fahrplan klebt unter der Kopfleiste (${Math.round(leiste.oben)}/${kopfHandy} px)`)
  pruefe(leiste.sichtbar, 'Handy: markierter Schritt ist in der Leiste zu sehen')

  pruefe(meldungen.length === 0, 'keine Fehler in der Konsole: ' + meldungen.join(' | '))
  await browser.close()
  console.log(`${ok + fehlerZahl} Prüfungen, ${fehlerZahl} Fehler`)
  process.exit(fehlerZahl ? 1 : 0)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
