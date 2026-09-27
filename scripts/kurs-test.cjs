// Browser-Test der Seite „Skills-Kurs“ (gebaute Toolbox: dist/index.html).
//   npm run build   (oder: npx vite build)
//   node scripts/kurs-test.cjs
// Prüft: nächste Einheit, Einheit öffnen, Material abhaken und Notiz (bleiben
// nach Neuladen), „Heute gehalten“, Gruppen (Name nie leer), Deep-Links, Reiterwechsel
// mit offener Einheit („Jahresweg“, Zurück), PDF der Schülerblätter, Grundlagen,
// Druckansicht, Spickzettel auf einer Seite, Blatt-Vorschau, Kurs-Blätter über ihre
// Aufgabentexte auffindbar, gemerkte Sprache FR ohne Folgen im Kurs, Handy-Breite.
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
const blattDir = path.join(__dirname, '..', 'src', 'data', 'blaetter')
const blaetter = new Map(
  fs
    .readdirSync(blattDir)
    .filter((d) => d.endsWith('.json'))
    .flatMap((d) => JSON.parse(fs.readFileSync(path.join(blattDir, d), 'utf8')))
    .map((b) => [b.id, b]),
)

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

  // Gruppenname leeren: nicht erlaubt – der bisherige Name bleibt im Feld und gespeichert, mit Hinweis
  await page.click('.ku-gruppenwahl .btn')
  await page.waitForSelector('dialog .ku-gruppen')
  const namensFeld = page.locator('dialog .ku-gruppen li input').first()
  const alterName = await namensFeld.inputValue()
  await namensFeld.fill('')
  await namensFeld.blur()
  pruefe((await namensFeld.inputValue()) === alterName, `leerer Gruppenname: im Feld steht wieder „${alterName}“`)
  pruefe(await page.waitForSelector('.toast:has-text("braucht einen Namen")', { timeout: 5000 }).then(() => true, () => false), 'leerer Gruppenname: Hinweis')
  await page.click('dialog .icon-btn[aria-label="Schließen"]')
  pruefe((await page.textContent('.ku-gruppenwahl select option')) === alterName, 'leerer Gruppenname: gespeichert bleibt der bisherige Name')

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

  // Spickzettel: eine A4-Seite, auch für lange Einheiten (Einheit 20 aus Kursjahr 3 war zweiseitig)
  for (const id of ['j3-e20', 'j2-e07', e1.id].filter((x) => einheiten.has(x))) {
    await page.goto(DATEI + '#kurs=' + id)
    await page.waitForSelector('.ku-einheit-aktionen')
    await page.evaluate(() => {
      window.__druck = null
      window.print = () => (window.__druck = document.documentElement.outerHTML.replace(/<script[\s\S]*?<\/script>/gi, ''))
    })
    await page.locator('.ku-einheit-aktionen button', { hasText: 'Spickzettel' }).click()
    const druck = await ctx.newPage()
    await druck.setContent(await page.evaluate(() => window.__druck))
    await druck.emulateMedia({ media: 'print' })
    const pdf = await druck.pdf({ format: 'A4', preferCSSPageSize: true })
    await druck.close()
    const seiten = (pdf.toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g) || []).length
    pruefe(seiten === 1, `Spickzettel ${id}: eine Seite (${seiten})`)
  }

  // Schülerblätter des Kurses: über Wörter aus ihren Aufgabentexten zu finden (Suche der Arbeitsblätter)
  const kursBlatt = blaetter.get((e1.blaetter ?? [])[0])
  const aufgabe = kursBlatt?.de.bausteine.find((x) => x.art === 'aufgabe')
  const wort = aufgabe && (aufgabe.text.match(/[A-Za-zÄÖÜäöüß]{7,}/g) ?? []).find((w) => !kursBlatt.de.titel.toLowerCase().includes(w.toLowerCase()))
  if (wort) {
    await page.goto(DATEI)
    await page.waitForSelector('main#blaetter article.bl-karte')
    await page.fill('input[placeholder^="Suchen:"]', wort)
    await page.waitForTimeout(300)
    const titel = await page.$$eval('main#blaetter article.bl-karte h3', (els) => els.map((x) => x.textContent))
    pruefe(titel.includes(kursBlatt.de.titel), `Kurs-Blatt „${kursBlatt.de.titel}“ über „${wort}“ aus seiner Aufgabe gefunden`)
  }

  // Gemerkte Sprache FR: die Kurs-Blätter haben kein Französisch – Dialog und PDF bleiben deutsch
  await page.evaluate(() => localStorage.setItem('cdse-blatt-sprache-v1', 'fr'))
  await page.goto('about:blank')
  await page.goto(DATEI + '#kurs=' + e1.id)
  await page.waitForSelector('.ku-einheit-aktionen')
  if ((await page.locator('.ku-blaetter button').count()) > 0) {
    await page.locator('.ku-blaetter button').first().click()
    await page.waitForSelector('dialog.bl-detail[open]')
    pruefe((await page.locator('dialog.bl-detail[open] .seg').count()) === 0, 'Kurs-Blatt ohne Französisch: keine Sprachwahl, auch wenn FR gemerkt ist')
    await page.click('dialog.bl-detail .icon-btn[aria-label="Schließen"]')
    const dl = page.waitForEvent('download', { timeout: 120000 })
    await page.locator('.ku-einheit-aktionen button', { hasText: 'Schülerblätter (PDF)' }).click()
    const name = (await dl).suggestedFilename()
    pruefe(!name.includes('_FR'), `Kurs: „Schülerblätter (PDF)“ bleibt deutsch (${name})`)
  }
  await page.evaluate(() => localStorage.removeItem('cdse-blatt-sprache-v1'))

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

  // Kursjahre 2 und 3: Gruppe umstellen → Jahresweg, Joker, erste Einheit
  for (const nr of [2, 3]) {
    const jk = kurs.find((k) => k.jahr && k.jahr.nr === nr)
    if (!jk) continue
    const reiheN = jk.module.flatMap((m) => m.einheiten).filter((id) => einheiten.has(id))
    const jokerN = [...einheiten.values()].filter((e) => e.joker && e.jahr === nr).length
    await page.goto(DATEI + '#kurs')
    await page.waitForSelector('.ku-held')
    await page.click('.ku-gruppenwahl .btn')
    await page.waitForSelector('dialog .ku-gruppen')
    await page.selectOption('dialog .ku-gruppen li.aktiv select[aria-label="Kursjahr"]', String(nr))
    await page.click('dialog .icon-btn[aria-label="Schließen"]')
    await page.waitForSelector('.ku-held')
    const erste = einheiten.get(reiheN[0])
    pruefe((await page.textContent('.ku-held h2')).includes(erste.titel), `Jahr ${nr}: Held zeigt die erste Einheit`)
    pruefe((await page.locator('.ku-modul').count()) === jk.module.length, `Jahr ${nr}: Jahresweg zeigt alle ${jk.module.length} Module`)
    pruefe((await page.locator('button.ku-e').count()) === reiheN.length, `Jahr ${nr}: ${reiheN.length} Einheiten im Jahresweg`)
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

  pruefe(meldungen.length === 0, 'keine Fehler in der Konsole: ' + meldungen.join(' | '))
  await browser.close()
  console.log(`${ok + fehlerZahl} Prüfungen, ${fehlerZahl} Fehler`)
  process.exit(fehlerZahl ? 1 : 0)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
