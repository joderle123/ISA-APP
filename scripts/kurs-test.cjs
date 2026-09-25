// Browser-Test der Seite „Skills-Kurs“ (gebaute Toolbox: dist/index.html).
//   npm run build   (oder: npx vite build)
//   node scripts/kurs-test.cjs
// Prüft: nächste Einheit, Einheit öffnen, Material abhaken und Notiz (bleiben
// nach Neuladen), „Heute gehalten“, Gruppen, Deep-Links, Druckansicht, Blatt-Vorschau.
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
  pruefe((await page.locator('.ku-modul').count()) === jahr1.module.length, 'Jahresweg zeigt alle Module')
  pruefe((await page.locator('button.ku-e').count()) === reihe.length, 'Jahresweg zeigt alle fertigen Einheiten als Knopf')

  // Einheit öffnen
  await page.click('.ku-held-aktionen .btn-primary')
  await page.waitForSelector('.ku-einheit-kopf')
  pruefe(page.url().endsWith('#kurs=' + e1.id), 'Deep-Link der Einheit im Hash')
  pruefe((await page.locator('.ku-ablauf-liste li').count()) === e1.ablauf.length, 'Ablauf vollständig')
  pruefe((await page.locator('.ku-schritt').count()) === e1.schritte.length, 'alle Schritte sichtbar')
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
  pruefe((await page.locator('button.ku-e.erledigt').count()) === 1, 'erste Einheit im Jahresweg abgehakt')

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

  // Grundlagen
  await page.goto(DATEI + '#kurs=grundlagen')
  await page.waitForSelector('#ku-gl-titel')
  pruefe(true, 'Grundlagen-Seite öffnet')

  // Reiterwechsel und zurück
  await page.goto(DATEI + '#kurs')
  await page.waitForSelector('.ku-held')
  await page.click('.haupt-reiter button:has-text("Arbeitsblätter")')
  pruefe(!(await page.locator('.ku-held').isVisible()), 'Kurs verschwindet beim Reiterwechsel')
  await page.click('.haupt-reiter button:has-text("Skills-Kurs")')
  pruefe(await page.locator('.ku-held').isVisible(), 'Kurs erscheint wieder')
  pruefe(page.url().endsWith('#kurs'), 'Hash #kurs nach Reiterwechsel')

  // Schmale Ansicht ohne waagrechtes Scrollen im Inhalt
  await page.setViewportSize({ width: 390, height: 800 })
  const breit = await page.evaluate(() => document.querySelector('.ku-held').scrollWidth <= document.querySelector('.ku-held').clientWidth + 1)
  pruefe(breit, 'Held passt auf 390 px')

  pruefe(meldungen.length === 0, 'keine Fehler in der Konsole: ' + meldungen.join(' | '))
  await browser.close()
  console.log(`${ok + fehlerZahl} Prüfungen, ${fehlerZahl} Fehler`)
  process.exit(fehlerZahl ? 1 : 0)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
