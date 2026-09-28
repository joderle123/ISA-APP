// Browser-Test der Seiten „Arbeitsblätter“ und „Einheiten“ (gebaute Toolbox: dist/index.html).
//   npm run build   (oder: npx vite build)
//   node scripts/toolbox-test.cjs
// Prüft: PDF-Knopf auf der Karte, unbekannter und wiederholter Blatt-Link, Wechsel zu den Einheiten
// mit ELDiB-Ziel (auch nach Neuladen), Suche (kurze Wörter nur als Wort, Titel zuerst; Umlaute in
// beide Richtungen, Akzente, ß, ELDiB-Codes und Stufen in jeder Schreibweise, Aufgabentexte),
// Einzahl „1 Blatt“, Bereichs-Kacheln ohne Überlauf, Material-Finder (Zahl wie in der Liste, auch
// mit ELDiB-Code), Tipp für das Team („Gespeichert.“), Seitenumbruch W-03, Sprache DE/FR gemerkt
// (Dialog, Karte, Mappe), voller Titel im Blatt-Dialog am Handy, Mappe (Sprache je Blatt,
// Dateinamen, Titel, Ladekreis am geklickten Knopf, Hinweis über der Leiste, Leiste am Handy),
// Urheber-Vermerk (Blatt-Dialog DE/FR, jede PDF-Seite von Blatt, Lehrerseite und Mappe in der
// Sprache des Blatts, KI-Material in Ansicht und PDF – nicht bei einem digitalisierten Original).
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

/** Text je Seite und Autor einer PDF-Datei (braucht python3 mit PyMuPDF wie scripts/mappe-pruefen.tsx; sonst null). */
function pdfLesen(datei) {
  try {
    const py = 'import json, sys, pymupdf; d = pymupdf.open(sys.argv[1]); print(json.dumps({"seiten": [p.get_text() for p in d], "autor": d.metadata.get("author")}))'
    return JSON.parse(require('child_process').execFileSync('python3', ['-c', py, datei]).toString())
  } catch {
    return null
  }
}
const seitenTexte = (datei) => pdfLesen(datei)?.seiten ?? null

/** Urheber-Vermerk wie in src/lib/urheber.ts (dort steht er an einer Stelle). */
const URHEBER = (() => {
  const q = require('fs').readFileSync(path.join(__dirname, '..', 'src', 'lib', 'urheber.ts'), 'utf8')
  return { de: /\bde: '([^']+)'/.exec(q)[1], fr: /\bfr: '([^']+)'/.exec(q)[1], name: /URHEBER_NAME = '([^']+)'/.exec(q)[1] }
})()

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

  // Derselbe Link ein zweites Mal (z. B. vom Hub): Dialog bzw. Hinweis erscheinen wieder
  await page.goto('about:blank')
  await page.goto(DATEI)
  await page.waitForSelector('main#blaetter article.bl-karte')
  for (let i = 1; i <= 2; i++) {
    await page.evaluate(() => (location.hash = '#blatt=wutvulkan'))
    pruefe(await page.waitForSelector('dialog[open]', { timeout: 5000 }).then(() => true, () => false), `derselbe Blatt-Link zum ${i}. Mal öffnet den Dialog`)
    await page.keyboard.press('Escape')
    await page.waitForSelector('dialog[open]', { state: 'detached', timeout: 5000 }).catch(() => {})
  }
  for (let i = 1; i <= 2; i++) {
    await page.evaluate(() => document.querySelectorAll('.toast button').forEach((b) => b.click()))
    await page.evaluate(() => (location.hash = '#blatt=gibt-es-nicht'))
    const hinweis = await page.waitForSelector('.toast:has-text("„gibt-es-nicht“")', { timeout: 5000 }).then(() => true, () => false)
    pruefe(hinweis, `unbekannter Blatt-Link zum ${i}. Mal: Hinweis „nicht gefunden“`)
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

  // Suche tolerant: Umlaute in beide Richtungen, Akzente, Groß/klein, ELDiB-Codes, Stufen, Aufgabentexte
  const gleich = async (zaehlen, varianten, text) => {
    const n = []
    for (const v of varianten) n.push(await zaehlen(v))
    pruefe(n[0] > 0 && n.every((x) => x === n[0]), `${text}: ${varianten.map((v, i) => `„${v}“ ${n[i]}`).join(', ')}`)
    return n[0]
  }
  const blaetterZahl = async (q) => (await suchen(q)).length
  await gleich(blaetterZahl, ['Prüfung', 'Pruefung', 'PRÜFUNG'], 'Blätter: ü = ue')
  await gleich(blaetterZahl, ['Übung', 'Uebung'], 'Blätter: Ü = Ue')
  await gleich(blaetterZahl, ['colère', 'colere', 'COLÈRE'], 'Blätter: Akzente egal')
  await gleich(blaetterZahl, ['V-21', 'v21', 'V 21'], 'Blätter: ELDiB-Code in jeder Schreibweise')
  await gleich(blaetterZahl, ['C3', 'Cycle 3', 'cycle3', 'Zyklus 3'], 'Blätter: Stufe als Code oder Name')
  await suche.fill('')
  await page.waitForTimeout(300)
  const chipZahl = (text) => page.evaluate((t) => Number([...document.querySelectorAll('aside .fchip')].find((c) => c.textContent.startsWith(t))?.querySelector('.n')?.textContent), text)
  const c1 = await chipZahl('C1 · Spielschule')
  const es = await chipZahl('ES · Sekundar')
  pruefe((await gleich(blaetterZahl, ['Spielschule', 'Précoce', 'precoce'], 'Blätter: Stufen-Namen C1')) === c1, `„Spielschule“ findet die ${c1} Blätter der Stufe C1`)
  pruefe((await gleich(blaetterZahl, ['Sekundar', 'ES', 'es'], 'Blätter: Stufen-Namen ES')) === es, `„Sekundar“ und „ES“ finden die ${es} Blätter der Stufe ES`)
  pruefe((await blaetterZahl('Schule')) < es / 2, '„Schule“ trifft nicht jedes Blatt der „Spielschule“ oder „Sekundarschule“')
  pruefe((await suchen('mitbestimmen')).includes('Körperbild: Filter, Vergleiche und ich'), 'Suche findet Wörter aus den Aufgabentexten')
  const pause2 = await suchen('Pause')
  const titelTreffer = pause2.filter((t) => /pause/i.test(t))
  const nurAufgabe = ['Meine Energie-Batterie', 'Drei gute Dinge'].map((t) => pause2.indexOf(t))
  pruefe(titelTreffer.length >= 3 && nurAufgabe.every((i) => i >= titelTreffer.length), `„Pause“: ${titelTreffer.length} Titel-Treffer vor Treffern nur im Aufgabentext (Plätze ${nurAufgabe.map((i) => i + 1).join(', ')})`)

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
  const einheitenZahl = async (q) => {
    await page.fill('input[placeholder^="Titel, Thema"]', q)
    await page.waitForTimeout(300)
    if (await page.locator('main#ergebnisse', { hasText: 'Keine passenden Materialien' }).count()) return 0
    return Number(/\d+/.exec(await page.evaluate(() => document.querySelector('main#ergebnisse h1').nextElementSibling.textContent))[0])
  }
  await gleich(einheitenZahl, ['Gefühle', 'Gefuehle', 'GEFÜHLE'], 'Einheiten: ü = ue')
  await gleich(einheitenZahl, ['Straße', 'Strasse'], 'Einheiten: ß = ss')
  await gleich(einheitenZahl, ['KOG-28', 'kog28', 'KOG 28'], 'Einheiten: ELDiB-Code in jeder Schreibweise')
  await gleich(einheitenZahl, ['C3', 'Cycle 3'], 'Einheiten: Stufe als Code oder Name')
  await page.fill('input[placeholder^="Titel, Thema"]', '')
  await page.fill('input[placeholder="Ziel oder Code, z. B. V-13"]', 'kog 28')
  await page.waitForTimeout(200)
  const ziele = await page.$$eval('aside label.check-row .code', (els) => els.map((e) => e.textContent.trim()))
  pruefe(ziele.length === 1 && ziele[0] === 'KOG-28', `Filter „ELDiB-Ziele“: „kog 28“ findet genau KOG-28 (${ziele.join(', ')})`)
  await page.fill('input[placeholder="Ziel oder Code, z. B. V-13"]', '')

  // Material-Finder: genannte Zahl = Zahl in der Bibliothek danach; nur Stichwörter → kein Knopf „Alle Treffer …“
  const finder = async (text) => {
    await page.locator('button[title^="Situation beschreiben"]').click()
    await page.fill('dialog[open] textarea', text)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)
    return page.evaluate(() => [...document.querySelectorAll('dialog[open] .dlg-body .rounded-bl-md')].pop().textContent)
  }
  const genannt = Number((/Ich habe (\d+)/.exec(await finder('Schüler, 10 Jahre, 4. Klasse, oft wütend, soll in der Kleingruppe üben – mit Arbeitsblatt')) || [])[1])
  await page.locator('dialog[open] button', { hasText: 'Alle Treffer in der Bibliothek anzeigen' }).click()
  await page.waitForTimeout(400)
  const inListe = Number(/\d+/.exec(await page.evaluate(() => document.querySelector('main#ergebnisse h1').nextElementSibling.textContent))[0])
  pruefe(genannt > 0 && genannt === inListe, `Material-Finder nennt dieselbe Zahl wie die Liste danach (${genannt}/${inListe})`)
  await finder('Interessiert sich für Dinosaurier')
  pruefe((await page.locator('dialog[open] button', { hasText: 'Alle Treffer in der Bibliothek anzeigen' }).count()) === 0, 'Material-Finder: nur Stichwörter → kein Knopf, der die ganze Bibliothek zeigt')
  await page.keyboard.press('Escape')
  // Material-Finder versteht ELDiB-Codes; Zahl und Liste bleiben gleich
  const kogGenannt = Number((/Ich habe (\d+)/.exec(await finder('Etwas zu kog 28')) || [])[1])
  pruefe((await page.locator('dialog[open] .badge', { hasText: 'ELDiB: KOG-28' }).count()) > 0, 'Material-Finder: „kog 28“ als ELDiB-Ziel KOG-28 verstanden')
  const alleTreffer = page.locator('dialog[open] button', { hasText: 'Alle Treffer in der Bibliothek anzeigen' })
  let kogListe = -1
  if (await alleTreffer.count()) {
    await alleTreffer.click()
    await page.waitForTimeout(400)
    kogListe = Number(/\d+/.exec(await page.evaluate(() => document.querySelector('main#ergebnisse h1').nextElementSibling.textContent))[0])
  } else await page.keyboard.press('Escape')
  pruefe(kogGenannt > 0 && kogGenannt === kogListe, `Material-Finder mit ELDiB-Code: dieselbe Zahl wie die Liste (${kogGenannt}/${kogListe})`)

  // Tipp für das Team: kurzer Hinweis „Gespeichert.“
  await page.goto('about:blank')
  await page.goto(DATEI + '#blatt=belohnungs-menue')
  await page.waitForSelector('dialog[open]')
  await page.fill('dialog[open] input[placeholder="Deine Erfahrung in einem Satz"]', 'Klappt gut mit einem Wochenplan.')
  await page.locator('dialog[open] button', { hasText: 'Speichern' }).click()
  pruefe(await page.waitForSelector('.toast:has-text("Gespeichert.")', { timeout: 5000 }).then(() => true, () => false), 'Tipp für das Team: Hinweis „Gespeichert.“')

  // W-03 „Belohnungs-Menü“: Seitenumbruch vor Aufgabe 2 – zwei ausgewogene Schülerseiten
  const dlW = page.waitForEvent('download', { timeout: 60000 }).catch(() => null)
  await page.locator('dialog[open] button', { hasText: 'Arbeitsblatt (PDF)' }).click()
  const w03 = await dlW
  pruefe(!!w03, 'W-03: Arbeitsblatt als PDF')
  const w03Seiten = w03 ? seitenTexte(await w03.path()) : null
  if (w03Seiten) pruefe(w03Seiten.length === 2 && !w03Seiten[0].includes('Stell dein Menü') && w03Seiten[1].includes('Stell dein Menü') && w03Seiten[1].includes('Unsere Abmachung'), 'W-03: Aufgaben 2 und 3 gemeinsam auf Seite 2')
  else if (w03) console.log('· W-03: Seiten nicht geprüft (python3 mit PyMuPDF fehlt)')
  await page.evaluate(() => document.querySelectorAll('.toast button').forEach((b) => b.click()))
  await page.keyboard.press('Escape')

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

  // Sprache DE/FR: einmal gewählt gilt sie für Dialog, Karte und Mappe und bleibt nach dem Neuladen
  const sp = await neueSeite({ width: 1280, height: 900 })
  const gedrueckt = () => sp.evaluate(() => document.querySelector('dialog[open] .seg button[aria-pressed="true"]')?.textContent.trim())
  const gespeichert = () => sp.evaluate(() => localStorage.getItem('cdse-blatt-sprache-v1'))
  await sp.goto(DATEI + '#blatt=beduerfnis-glaeser')
  await sp.waitForSelector('dialog[open] .seg')
  pruefe((await gedrueckt()) === 'DE', 'Sprache: anfangs Deutsch')
  await sp.locator('dialog[open] .seg button', { hasText: 'FR' }).click()
  await sp.reload()
  await sp.waitForSelector('dialog[open] .seg')
  pruefe((await gedrueckt()) === 'FR' && (await gespeichert()) === 'fr', 'Sprache: Französisch bleibt nach dem Neuladen (eigener Schlüssel)')
  await sp.evaluate(() => (location.hash = '#blatt=lebensnetz'))
  await sp.waitForFunction(() => document.querySelector('#bl-detail-titel')?.textContent !== 'Mein Lebensnetz' && document.querySelector('dialog[open] .seg button[aria-pressed="true"]')?.textContent.trim() === 'FR', null, { timeout: 5000 }).catch(() => {})
  pruefe((await gedrueckt()) === 'FR', 'Sprache: auch das nächste Blatt öffnet auf Französisch')
  await sp.keyboard.press('Escape')
  const karteVon = (titel) => sp.locator('main#blaetter article.bl-karte', { has: sp.locator('h3', { hasText: titel }) })
  const pdfKnopf2 = karteVon('Mein Lebensnetz').locator('button[aria-label^="PDF herunterladen"]')
  pruefe((await pdfKnopf2.textContent()).includes('FR'), 'Karte zeigt „PDF · FR“')
  pruefe(!(await karteVon('Mein Wutvulkan').locator('button[aria-label^="PDF herunterladen"]').textContent()).includes('FR'), 'Karte eines Blatts ohne Französisch bleibt „PDF“')
  const dlK = sp.waitForEvent('download', { timeout: 60000 }).catch(() => null)
  await pdfKnopf2.click()
  pruefe(((await dlK)?.suggestedFilename() ?? '').endsWith('_FR.pdf'), 'PDF auf der Karte in der gewählten Sprache')
  await karteVon('Mein Lebensnetz').locator('label.bl-wahl').click()
  const dlM = sp.waitForEvent('download', { timeout: 60000 }).catch(() => null)
  await sp.locator('.bl-mappe button', { hasText: 'Als ein PDF' }).click()
  pruefe((await dlM)?.suggestedFilename() === 'Mappe_arbeitsblaetter_FR.pdf', 'Mappe (über die Karte) in der gewählten Sprache')
  await sp.evaluate(() => (location.hash = '#blatt=lebensnetz'))
  await sp.waitForSelector('dialog[open] .seg')
  await sp.locator('dialog[open] .seg button', { hasText: 'DE' }).click()
  await sp.keyboard.press('Escape')
  pruefe((await gespeichert()) === 'de' && !(await pdfKnopf2.textContent()).includes('FR'), 'Sprache zurück auf Deutsch: gespeichert, Karte wieder „PDF“')

  // Urheber-Vermerk: Blatt-Dialog in der gezeigten Sprache; jede PDF-Seite (Schülerseiten, Lehrerseite,
  // Mappe) in der Sprache des Blatts; KI-Material in Ansicht, Arbeitsblatt und PDF; Original ohne
  const uh = await neueSeite({ width: 1280, height: 900 })
  const vermerke = (sel) => uh.$$eval(sel, (els) => els.map((e) => ({ text: e.textContent.trim(), lang: e.getAttribute('lang') })))
  const laden = async (knopf) => {
    const dl = uh.waitForEvent('download', { timeout: 60000 }).catch(() => null)
    await knopf.click()
    const d = await dl
    await uh.evaluate(() => document.querySelectorAll('.toast button').forEach((b) => b.click()))
    return d ? { name: d.suggestedFilename(), pdf: pdfLesen(await d.path()) } : null
  }
  /** jede Seite trägt genau den Vermerk der erwarteten Sprache ('de', 'fr' oder beide bei gemischter Mappe) */
  const pdfVermerk = (pdf, sprachen) =>
    pdf.seiten.length > 0 && pdf.seiten.every((t) => sprachen.some((s) => t.includes(URHEBER[s]))) && sprachen.every((s) => pdf.seiten.some((t) => t.includes(URHEBER[s])))
  await uh.goto(DATEI + '#blatt=beduerfnis-glaeser')
  await uh.waitForSelector('dialog[open] .seg')
  let v = await vermerke('dialog[open] .urheber')
  pruefe(v.length === 1 && v[0].text === URHEBER.de && v[0].lang === 'de', `Blatt-Dialog DE: Vermerk „${v[0]?.text}“`)
  const blattDe = await laden(uh.locator('dialog[open] button', { hasText: 'Mit Lehrerseite' }))
  if (blattDe?.pdf) {
    pruefe(pdfVermerk(blattDe.pdf, ['de']) && blattDe.pdf.seiten.some((t) => t.includes('FÜR DIE LEHRPERSON')), `Blatt-PDF DE mit Lehrerseite: Vermerk auf allen ${blattDe.pdf.seiten.length} Seiten`)
    pruefe(blattDe.pdf.autor === URHEBER.name, `Blatt-PDF: Autor „${blattDe.pdf.autor}“`)
  } else console.log('· Blatt-PDF: Vermerk nicht geprüft (kein Download oder python3 mit PyMuPDF fehlt)')
  await uh.locator('dialog[open] .seg button', { hasText: 'FR' }).click()
  v = await vermerke('dialog[open] .urheber')
  pruefe(v.length === 1 && v[0].text === URHEBER.fr && v[0].lang === 'fr', `Blatt-Dialog FR: Vermerk „${v[0]?.text}“`)
  const blattFr = await laden(uh.locator('dialog[open] button', { hasText: 'Mit Lehrerseite' }))
  if (blattFr?.pdf) pruefe(pdfVermerk(blattFr.pdf, ['fr']) && blattFr.pdf.seiten.some((t) => t.includes('POUR L’ENSEIGNANT·E')), `Blatt-PDF FR mit Lehrerseite: französischer Vermerk auf allen ${blattFr.pdf.seiten.length} Seiten`)
  await uh.locator('dialog[open] button', { hasText: 'In die Mappe legen' }).click()
  await uh.locator('dialog[open] .seg button', { hasText: 'DE' }).click()
  await uh.keyboard.press('Escape')
  await uh.locator('main#blaetter article.bl-karte', { has: uh.locator('h3', { hasText: 'Mein Wutvulkan' }) }).locator('label.bl-wahl').click()
  const mappeGemischt = await laden(uh.locator('.bl-mappe button', { hasText: 'Mit Lehrerseiten' }))
  if (mappeGemischt?.pdf) {
    pruefe(pdfVermerk(mappeGemischt.pdf, ['de', 'fr']), `Mappe DE-FR mit Lehrerseiten (${mappeGemischt.name}): jede Seite mit dem Vermerk ihres Blatts`)
    pruefe(mappeGemischt.pdf.autor === URHEBER.name, `Mappe: Autor „${mappeGemischt.pdf.autor}“`)
  }
  // KI-Material mit Arbeitsblatt: Vermerk am Ende der Ansicht und unter dem Arbeitsblatt, in beiden PDFs
  await uh.goto('about:blank')
  await uh.goto(DATEI + '#material=zivilcourage-net-wegkucken')
  await uh.waitForSelector('dialog[open]')
  v = await vermerke('dialog[open] .urheber')
  pruefe(v.length === 2 && v.every((x) => x.text === URHEBER.de), `KI-Material: Vermerk in der Ansicht und unter dem Arbeitsblatt (${v.length})`)
  const matKi = await laden(uh.locator('dialog[open] .dlg-foot button', { hasText: 'PDF' }))
  if (matKi?.pdf) {
    pruefe(pdfVermerk(matKi.pdf, ['de']), `KI-Material-PDF: Vermerk auf allen ${matKi.pdf.seiten.length} Seiten`)
    pruefe(matKi.pdf.autor === URHEBER.name, `KI-Material-PDF: Autor „${matKi.pdf.autor}“`)
  }
  const abKi = await laden(uh.locator('dialog[open] .dlg-foot button', { hasText: 'Arbeitsblatt' }))
  if (abKi?.pdf) pruefe(pdfVermerk(abKi.pdf, ['de']) && abKi.pdf.autor === URHEBER.name, `KI-Material, nur Arbeitsblatt: Vermerk auf allen ${abKi.pdf.seiten.length} Seiten, Autor`)
  // Digitalisiertes Original (aus den Daten, mit Autorin oder Autor): kein Vermerk, Angaben wie bisher
  const original = (() => {
    const q = require('fs').readFileSync(path.join(__dirname, '..', 'src', 'data', 'materials', 'digitized.ts'), 'utf8')
    return JSON.parse(q.slice(q.indexOf('= [') + 2)).find((m) => m.source === 'original' && m.author)
  })()
  await uh.goto('about:blank')
  await uh.goto(DATEI + '#material=' + original.id)
  await uh.waitForSelector('dialog[open]')
  pruefe((await uh.locator('dialog[open] .urheber').count()) === 0, 'Original: kein Urheber-Vermerk in der Ansicht')
  pruefe((await uh.locator('dialog[open] .dlg-head', { hasText: original.author }).count()) === 1, 'Original: Autorin/Autor steht wie bisher im Kopf')
  const matOrig = await laden(uh.locator('dialog[open] .dlg-foot button', { hasText: 'PDF' }))
  if (matOrig?.pdf) {
    pruefe(matOrig.pdf.seiten.every((t) => !t.includes('©') && !t.includes(URHEBER.name)), 'Original-PDF: auf keiner Seite ein Urheber-Vermerk')
    pruefe(matOrig.pdf.autor === original.author, 'Original-PDF: Autorin/Autor wie bisher in den PDF-Angaben')
  }

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
  const leisteGanz = await handy.evaluate(() =>
    [...document.querySelectorAll('.bl-mappe button')].every((k) => {
      const q = k.getBoundingClientRect()
      const h = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2)
      return q.left >= 0 && q.right <= innerWidth && !!h && k.contains(h)
    }),
  )
  pruefe(leisteGanz, 'Handy: alle Knöpfe der Mappe-Leiste (auch „Mappe leeren“) auf dem Bildschirm')
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
