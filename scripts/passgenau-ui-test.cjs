// Browser-Test der Oberfläche „Passgenau“ (Toolbox, Reiter #passgenau) mit dem echten Kern und einem simulierten Hub
// (Elternseite, die das Protokoll src/passgenau/PROTOKOLL.md beantwortet, Pläne merkt und jede Frage mitschreibt).
// Die laufende Folge von Mia plant vorab der echte Kern (scripts/passgenau-ui-folge.ts), wie sie der Hub mitschickt.
//   node scripts/passgenau-ui-test.cjs            (startet `npx vite` auf Port 5181)
//   PG_PORT=5182 PG_BILDER=/pfad node scripts/passgenau-ui-test.cjs
// Prüft: ohne Hub („Ohne Kind planen“, auch nach 1,5 s ohne Antwort), Start mit Kind, „Das weiß ich schon“ mit
// Korrektur und Bestätigung, Weg 1/2/3, Ergebnis, Ersetzen (Liste, Ablauf, Vorschau), Daumen mit Grund, Baukasten
// (Suche, Einfügen, Text, Platzhalter, Sortieren, Löschen + Rückgängig), PDF (= gespeichert), Nach der Stunde
// (nichts vorbelegt, Krisentag), Gelernt, Aus der Praxis (Filter, Übernehmen mit Originaltexten, Melden, Prüfen),
// Teilen (Vorschau, Prüfung im Hub, Häkchen), Rahmen-Modus (window.parent) und Handy-Breite ohne waagrechten Überlauf.
// Bildschirmfotos (1366 und 390) nach PG_BILDER.
const path = require('path')
const fs = require('fs')
const http = require('http')
const { spawn, execFileSync } = require('child_process')
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers'
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  ;({ chromium } = require('/opt/node22/lib/node_modules/playwright'))
}

const PORT = +(process.env.PG_PORT || 5181)
const BASIS = `http://127.0.0.1:${PORT}`
const BILDER = process.env.PG_BILDER || path.join(__dirname, '..', 'tmp', 'passgenau-ui-bilder')
fs.mkdirSync(BILDER, { recursive: true })

let ok = 0
let fehler = 0
function pruefe(bed, text) {
  if (bed) ok++
  else {
    fehler++
    console.log('  FEHLER: ' + text)
  }
}

// --- Erfundene Kinder (Profile, wie der Hub sie ableitet – Konzept 3.4) ----------------------------------------
const PROFILE = {
  'pg-mia7f3k9q2m': {
    v: 1, ref: 'pg-mia7f3k9q2m', erstellt: '2026-10-09T09:12:00', anrede: null, vorname: 'Mia', alterJahre: 9, stufen: ['C3'], layout: 'mittel',
    sprache: { blatt: 'de', woerter: ['pt'] },
    zugang: { lesen: 1, schreiben: 1, bild: 2, tempo: 'ruhig', struktur: 'normal', quelle: ['test:2026-03'] },
    ziele: [
      { code: 'V-21', ich: 'Ich behalte die Kontrolle über mein Verhalten während Gruppenaktivitäten.', quelle: 'pei', seit: '2026-09-15', prio: 1 },
      { code: 'K-26', ich: 'Ich drücke meine Gefühle mit passenden Worten aus.', quelle: 'pei', seit: '2026-09-15', prio: 2 },
      { code: 'SOZ-14', ich: 'Ich warte, bis ich an der Reihe bin.', quelle: 'vorgemerkt', seit: '2026-09-30', prio: 3 },
    ],
    erreicht: ['V-10', 'V-13', 'K-12', 'SOZ-20'],
    themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-02' }, { key: 'wut', art: 'notiz', datum: '2026-10-06' }, { key: 'freundschaft', art: 'reunion', datum: '2026-09-29' }],
    vorsicht: ['familie'], interessen: ['fussball', 'tiere', 'zeichnen'], wochenziel: 'Ich warte, bis ich drankomme.',
    gemacht: [{ id: 'blatt:wutvulkan', am: '2026-09-24' }, { id: 'blatt:ruhig-werden-drei-uebungen', am: '2026-10-01' }],
    folge: { id: 'pl-4k2', titel: 'Wut erkennen und stoppen', n: 6, gehalten: 2 },
    vorlieben: { v: 1, prior: { 'format:bewegung': [2, 1] }, z: { 'format:bewegung': { a: 6, b: 1, t: '2026-10-02' }, 'format:comic': { a: 3, b: 0.5, t: '2026-09-25' }, 'format:schreiben': { a: 1, b: 3, t: '2026-10-02' }, 'laenge:lang': { a: 0.6, b: 2.4, t: '2026-10-02' }, 'format:rollenspiel': { a: 2, b: 1, t: '2026-09-25' }, 'format:atmen': { a: 0.4, b: 1.6, t: '2026-09-18' } }, zurueckgesetzt: null },
    rituale: { ankommen: 'r:wetterbericht', abschluss: 'r:staerken-stein' },
    wissen: [{ gruppe: 'alter', text: 'Klasse C3.2', quelle: 'Fiche de renseignement' }, { gruppe: 'sprache', text: 'Erstsprache Portugiesisch', quelle: 'Fiche 26-27' }, { gruppe: 'zugang', text: 'aus dem Testergebnis der Diagnostique – die Werte bleiben im Hub', quelle: 'Test', datum: '2026-03-12' }],
    rechte: { speichern: true, rueckmelden: true }, lernen: true, zugangBestaetigt: false, seed: 'kp-mia', dichte: 'reich',
    kind: { korrekturen: {}, interessen: ['fussball', 'tiere', 'zeichnen'], vorname: false, lernen: true },
    verlauf: { plaene: [] },
    team: { personen: 5, z: { 'baustein:k:j1-e11:4': { n: 12, hoch: 7, runter: 1, geklappt: 10, teils: 1, nicht: 1 }, 'baustein:fb:ampel-lauf': { n: 9, hoch: 5, runter: 0, geklappt: 8, teils: 0, nicht: 1 }, 'baustein:b:erst-stopp:2': { n: 15, hoch: 9, runter: 2, geklappt: 12, teils: 0, nicht: 3 } } },
  },
  'pg-noe2b8x1': {
    v: 1, ref: 'pg-noe2b8x1', erstellt: '2026-10-09T09:12:00', anrede: null, vorname: 'Noé', alterJahre: 5, stufen: ['C1'], layout: 'bild',
    sprache: { blatt: 'de', woerter: ['lb'] }, zugang: { lesen: 0, schreiben: 0, bild: 3, tempo: 'normal', struktur: 'hoch', quelle: ['alter'] },
    ziele: [{ code: 'SOZ-14', ich: 'Ich warte, bis ich an der Reihe bin.', quelle: 'pei', seit: '2026-09-22', prio: 1 }, { code: 'V-10', ich: 'Ich melde mich und warte, bis ich drankomme.', quelle: 'pei', seit: '2026-09-22', prio: 2 }],
    erreicht: ['V-1', 'V-2', 'K-3'], themen: [{ key: 'wut', art: 'vorfall', datum: '2026-10-03' }], vorsicht: [], interessen: ['autos', 'bauen', 'tiere'], wochenziel: 'Ich warte in der Reihe.', gemacht: [], folge: null,
    vorlieben: { v: 1, z: { 'format:bewegung': { a: 3, b: 0.5, t: '2026-10-03' } }, zurueckgesetzt: null }, rituale: {}, rechte: { speichern: true, rueckmelden: true }, hilft: ['stundenleiste'],
  },
  'pg-ily5q0w3': {
    v: 1, ref: 'pg-ily5q0w3', erstellt: '2026-10-09T09:12:00', anrede: null, vorname: 'Ilyas', alterJahre: 14, stufen: ['ES'], layout: 'jugend',
    sprache: { blatt: 'de', woerter: [] }, zugang: { lesen: 2, schreiben: 1, bild: 1, tempo: 'normal', struktur: 'normal', quelle: ['alter'] },
    ziele: [{ code: 'K-26', ich: 'Ich drücke meine Gefühle mit passenden Worten aus.', quelle: 'pei', seit: '2026-09-19', prio: 1 }, { code: 'V-22', ich: 'Ich erkenne, wenn ich mich verbessert habe.', quelle: 'pei', seit: '2026-09-19', prio: 2 }],
    erreicht: ['V-13', 'V-15', 'K-17'], themen: [{ key: 'angst', art: 'reunion', datum: '2026-10-03' }], vorsicht: [], interessen: ['basketball', 'musik', 'gaming'], wochenziel: 'Vor der Probe mache ich meinen Skill.', gemacht: [], folge: null,
    vorlieben: null, rituale: { ankommen: 'k:j1-e01:1', abschluss: 'k:j1-e01:7' }, rechte: { speichern: true, rueckmelden: false }, achtung: ['krise'],
  },
  'pg-anouk01': {
    v: 1, ref: 'pg-anouk01', erstellt: '2026-10-09T09:12:00', anrede: null, vorname: 'Anouk', alterJahre: 7, stufen: ['C2'], layout: 'gross',
    sprache: { blatt: 'de', woerter: [] }, zugang: { lesen: 1, schreiben: 1, bild: 2, tempo: 'normal', struktur: 'normal', quelle: ['alter'] },
    ziele: [], erreicht: [], themen: [], vorsicht: [], interessen: [], wochenziel: null, gemacht: [], folge: null, vorlieben: null, rechte: { speichern: true, rueckmelden: true }, dichte: 'duenn',
  },
}

const sitzung = (phase, schritte, blatt) => ({ phase, schritte, blatt })
const PRAXIS = [
  {
    id: 'pv-8h2', version: 2, status: 'freigegeben', titel: 'Wut stoppen mit Ampel und Bewegung', fuerWen: 'für Kinder, die in der Pause schnell explodieren', von: 'Jo · Annexe', altersband: '9–11', ziele: ['V-21', 'K-26'], themen: ['wut'], formate: ['bewegung', 'denkmodell', 'comic'], dauer: 30, n: 2, sprachen: ['de'], erstellt: '',
    zaehler: { n: 14, hoch: 9, runter: 1, geklappt: 7, teils: 2, nicht: 0 },
    inhalt: { weg: 'gruendlich', n: 2, dauer: 30, sitzungen: [
      sitzung('verstehen', [{ ref: 'r:wetterbericht', h: '6bf63f9f', rolle: 'ankommen', min: 4 }, { ref: 'm:alles-eine-frage-der-perspektive:0', h: '1458d604', rolle: 'einstieg', min: 5 }, { ref: 'm:die-schatztruhe-der-ruhe:1', h: '817f066c', rolle: 'kern', min: 9 }, { ref: 'pg:blatt', h: 'pgblatt1', rolle: 'uebung', min: 8 }, { ref: 'r:staerken-stein', h: '2323a34d', rolle: 'abschluss', min: 4 }],
        { titel: 'Mein Stopp-Plan', bausteine: [{ ref: 'b:wutvulkan:1', h: '1af6f69d', ueber: { '1.items.1': 'Stopp. Ich zähle bis drei.' }, ueberHerkunft: { '1.items.1': 'eigen' } }, { ref: 'b:wutvulkan:2', h: 'e6a9d578' }, { ref: 'b:ruhig-werden-drei-uebungen:0', h: '3aa22f38' }] }),
      sitzung('ueben', [{ ref: 'r:wetterbericht', h: '6bf63f9f', rolle: 'ankommen', min: 4 }, { ref: 'pg:wand-schieben', h: 'pgwand01', rolle: 'bewegung', min: 5 }, { ref: 'm:die-schatztruhe-der-ruhe:2', h: 'eafeefb1', rolle: 'kern', min: 12 }, { ref: 'pg:blatt', h: 'pgblatt1', rolle: 'uebung', min: 5 }, { ref: 'r:staerken-stein', h: '2323a34d', rolle: 'abschluss', min: 4 }],
        { titel: 'Mein Stopp-Plan', bausteine: [{ ref: 'b:wutvulkan:3', h: 'ad830e23' }, { ref: 'b:ruhig-werden-drei-uebungen:1', h: '75ee5290' }] }),
    ] },
  },
  { id: 'pv-a01', version: 1, status: 'freigegeben', titel: 'Ankommen nach einem schweren Morgen', fuerWen: 'wenn heute nichts geht', von: 'Kim · Annexe', altersband: '6–8', ziele: [], themen: [], formate: ['spiel', 'malen', 'bewegung'], dauer: 20, n: 1, sprachen: ['de'], erstellt: '2026-09', zaehler: { n: 21, hoch: 12, runter: 0, geklappt: 10, teils: 1, nicht: 1 }, inhalt: { weg: 'leicht', n: 1, dauer: 20, sitzungen: [] } },
  { id: 'pv-c33', version: 1, status: 'freigegeben', titel: 'Gefühle benennen mit Comics', fuerWen: 'für Kinder, die lieber zeigen als reden', von: 'Lou · ISA', altersband: '9–11', ziele: ['K-26'], themen: ['wut'], formate: ['comic', 'malen'], dauer: 30, n: 1, sprachen: ['de'], erstellt: '2026-08', zaehler: { n: 11, hoch: 8, runter: 1, geklappt: 8, teils: 1, nicht: 1 }, inhalt: { weg: 'schnell', n: 1, dauer: 30, sitzungen: [] } },
  { id: 'pv-2kd', version: 1, status: 'freigegeben', titel: 'Warten lernen mit dem Warte-Turm', fuerWen: 'für die Spielschule, Einzel oder zu zweit', von: null, altersband: '3–5', ziele: ['SOZ-14'], themen: [], formate: ['spiel', 'bewegung'], dauer: 20, n: 1, sprachen: ['de'], erstellt: '2026-09', zaehler: { n: 9, hoch: 5, runter: 0, geklappt: 6, teils: 1, nicht: 0 }, inhalt: { weg: 'schnell', n: 1, dauer: 20, sitzungen: [] } },
  { id: 'pv-q71', version: 1, status: 'eingereicht', titel: 'Prüfungsangst: Anspannung sehen und senken', fuerWen: 'für Jugendliche vor Proben', von: 'Sam · Diagnostique', altersband: '12–14', ziele: ['K-26', 'V-22'], themen: ['angst'], formate: ['denkmodell', 'atmen', 'plan'], dauer: 45, n: 3, sprachen: ['de'], erstellt: '2026-10', zaehler: { n: 6, hoch: 3, runter: 1, geklappt: 4, teils: 1, nicht: 1 }, inhalt: { weg: 'gruendlich', n: 3, dauer: 45, sitzungen: [] } },
  { id: 'pv-f55', version: 1, status: 'freigegeben', titel: 'Streit in der Pause klären', fuerWen: 'Konflikt-Brücke in kleinen Schritten', von: null, altersband: '9–11', ziele: ['V-18', 'SOZ-32'], themen: ['freundschaft'], formate: ['spiel', 'gespraech', 'rollenspiel'], dauer: 45, n: 6, sprachen: ['de'], erstellt: '2026-07', zaehler: { n: 4, hoch: 2, runter: 0, geklappt: 3, teils: 1, nicht: 0 }, inhalt: { weg: 'gruendlich', n: 6, dauer: 45, sitzungen: [] } },
]

// Der simulierte Hub: öffnet die Toolbox (Rahmen oder eigener Tab) und beantwortet ihre Fragen.
function hubSeite() {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Hub (simuliert)</title>
<style>html,body{margin:0;height:100%;font:14px system-ui}iframe{border:0;width:100%;height:100%;display:block}</style></head><body>
<script>
const PROFILE = ${JSON.stringify(PROFILE)};
const PRAXIS = ${JSON.stringify(PRAXIS)};
const q = new URLSearchParams(location.search);
window.__ops = [];
window.__plaene = {};
let ziel = null;
let rev = 0;
function antwort(quelle, n, ok, erg, grund, text) {
  quelle.postMessage({ cdsePassgenau: 1, antwort: true, n, ok, erg, grund, text }, location.origin);
}
window.addEventListener('message', (ev) => {
  const d = ev.data;
  if (!d || d.cdsePassgenau !== 1 || d.antwort || ev.origin !== location.origin) return;
  if (q.get('stumm')) return;
  window.__ops.push({ op: d.op, arg: d.arg });
  const a = d.arg || {};
  switch (d.op) {
    case 'hallo': return antwort(ev.source, d.n, true, { version: '2026-10-09', schema: 1, hub: { build: '2026-10-09', proto: 1, planV: 1, profilV: 1 }, rechte: { planen: true, speichern: true, rueckmelden: true, kuratieren: true }, praxis: true,
      schalter: { an: true, lernen: true, teilen: true, freigabe: true, loeschenNachMonaten: 24 }, ich: { name: 'Nele', team: 'Annexe', funktion: 'Psychologin' },
      chips: [['mitgemacht', 'Hat mitgemacht'], ['pause', 'Brauchte eine Pause'], ['unruhig', 'War unruhig'], ['erzaehlt', 'Hat von sich erzählt'], ['neues', 'Hat etwas Neues ausprobiert'], ['hilfe', 'Hat Hilfe angenommen'], ['freude', 'Hatte sichtlich Freude'], ['konzentriert', 'War konzentriert dabei'], ['muede', 'War müde'], ['abgebrochen', 'Hat eine Aufgabe abgebrochen'], ['rueckzug', 'Hat sich zurückgezogen'], ['streit', 'Hatte Streit mit anderen']].map(([key, text]) => ({ key, text })),
      interessen: [], hilft: ['stundenleiste', 'bewegungspausen', 'reizarm', 'bildplan'] });
    case 'profil': return PROFILE[a.ref] ? antwort(ev.source, d.n, true, PROFILE[a.ref]) : antwort(ev.source, d.n, false, null, 'ref', 'Die Verknüpfung zum Kind ist abgelaufen.');
    case 'speichern': window.__plaene[a.plan.id] = a.plan; return antwort(ev.source, d.n, true, { planId: a.plan && a.plan.id, rev: ++rev, ort: 'dossier' });
    case 'rueckmeldung': if (a.plan) window.__plaene[a.plan.id] = a.plan; return antwort(ev.source, d.n, true, { notizId: 'n' + window.__ops.length, planId: a.planId, rev: ++rev });
    case 'vorlieben': return antwort(ev.source, d.n, true, { ok: true });
    case 'praxis-liste': return antwort(ev.source, d.n, true, { vorlagen: PRAXIS, zurueckgezogen: [] });
    case 'praxis-pruefen': {
      const treffer = [];
      (a.entwurf.inhalt.sitzungen || []).forEach((s, si) => {
        (s.schritte || []).forEach((x, xi) => Object.entries(x.ueber || {}).forEach(([pf, t]) => { const i = t.indexOf('Weber'); if (i >= 0) treffer.push({ pfad: 'inhalt.sitzungen.' + si + '.schritte.' + xi + '.ueber.' + pf, von: i, bis: i + 5, art: 'person' }); }));
        (s.blatt ? s.blatt.bausteine : []).forEach((b, bi) => Object.entries(b.ueber || {}).forEach(([pf, t]) => { const i = t.indexOf('Weber'); if (i >= 0) treffer.push({ pfad: 'inhalt.sitzungen.' + si + '.blatt.bausteine.' + bi + '.ueber.' + pf, von: i, bis: i + 5, art: 'person' }); }));
      });
      return antwort(ev.source, d.n, true, { treffer });
    }
    case 'praxis-teilen': return antwort(ev.source, d.n, true, { id: 'pv-neu1', version: 1, status: 'eingereicht' });
    case 'praxis-signal': return antwort(ev.source, d.n, true, { ok: true });
    case 'praxis-kuratieren': return antwort(ev.source, d.n, true, { status: a.aktion === 'freigeben' || a.aktion === 'einblenden' ? 'freigegeben' : a.aktion === 'ablehnen' ? 'abgelehnt' : 'ausgeblendet' });
    default: return antwort(ev.source, d.n, false, null, 'unbekannt');
  }
});
const hash = '#passgenau=' + q.get('ref') + (q.get('weg') ? '&weg=' + q.get('weg') : '');
if (q.get('modus') === 'rahmen') {
  const f = document.createElement('iframe'); f.src = '/' + hash; f.title = 'Toolbox'; document.body.appendChild(f);
} else {
  window.__oeffnen = () => { ziel = window.open('/' + hash, 'toolbox'); return true; };
}
</script></body></html>`
}

async function warteAufServer() {
  for (let i = 0; i < 120; i++) {
    const ok = await new Promise((r) => http.get(BASIS + '/', (res) => r(res.statusCode < 500)).on('error', () => r(false)))
    if (ok) return
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('Vite startet nicht')
}

async function main() {
  // Mias laufende Folge (6 Sitzungen, 2 gehalten) – geplant vom echten Kern, wie der Hub sie in profil.verlauf schickt
  const mia = PROFILE['pg-mia7f3k9q2m']
  const folge = JSON.parse(execFileSync('npx', ['tsx', '--tsconfig', 'tsconfig.scripts.json', 'scripts/passgenau-ui-folge.ts', JSON.stringify({ profil: mia, n: 6, gehalten: 2, id: 'pl-4k2', datum: '2026-10-02' })], { cwd: path.join(__dirname, '..'), encoding: 'utf8', maxBuffer: 1 << 26 }))
  mia.verlauf = { plaene: [folge] }
  mia.folge = { id: folge.id, titel: folge.titel, n: folge.n, gehalten: 2 }
  const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], { cwd: path.join(__dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'], detached: true })
  let log = ''
  server.stdout.on('data', (d) => (log += d))
  server.stderr.on('data', (d) => (log += d))
  const stopp = () => {
    try {
      process.kill(-server.pid, 'SIGTERM')
    } catch {
      /* schon weg */
    }
  }
  process.on('exit', stopp)
  await warteAufServer()
  const browser = await chromium.launch()
  const fotos = []
  let ctx = null
  try {
    for (const breite of [1366, 390]) {
      console.log(`\n== Breite ${breite}`)
      ctx = await browser.newContext({ viewport: { width: breite, height: breite > 500 ? 860 : 844 }, deviceScaleFactor: 1, acceptDownloads: true, hasTouch: breite < 500, isMobile: breite < 500 })
      await ctx.route('**/__hub.html*', (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: hubSeite() }))
      const hub = await ctx.newPage()
      ctx.on('page', (pg) => pg.on('pageerror', (e) => console.log('  Seitenfehler: ' + String(e.message || e).slice(0, 300))))
      const s = breite > 500 ? '1366' : '390'
      const foto = async (seite, name, opt = {}) => {
        // ganze Seite: erst nach oben (sonst steht die klebende Kopfzeile der Toolbox mitten im Bild)
        if (opt.voll !== false) await seite.evaluate(() => window.scrollTo(0, 0))
        await seite.waitForTimeout(opt.warten ?? 350)
        const datei = path.join(BILDER, `${name}-${s}.png`)
        await seite.screenshot({ path: datei, fullPage: opt.voll !== false })
        fotos.push(datei)
      }
      const ueberlauf = async (seite, wo) => {
        const w = await seite.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
        pruefe(w[0] <= w[1] + 1, `${wo}: waagrechter Überlauf (${w[0]} > ${w[1]})`)
      }
      const oeffne = async (ref, weg) => {
        await hub.goto(`${BASIS}/__hub.html?ref=${ref}${weg ? '&weg=' + weg : ''}`)
        const [tb] = await Promise.all([ctx.waitForEvent('page'), hub.evaluate(() => window.__oeffnen())])
        await tb.waitForLoadState('domcontentloaded')
        return tb
      }
      const ops = async () => hub.evaluate(() => window.__ops.map((o) => o.op))
      const dlg = (p) => p.locator('dialog.pg-dlg[open]')

      // 1. Ohne Hub: direkt geöffnet
      if (breite > 500) {
        const p0 = await ctx.newPage()
        await p0.goto(`${BASIS}/#passgenau`)
        await p0.getByRole('heading', { name: 'Ohne Kind planen' }).waitFor({ timeout: 90000 })
        pruefe(true, 'ohne Hub')
        await foto(p0, '00-ohne-kind')
        await p0.locator('.pg-chip', { hasText: /^10 J\.$/ }).click()
        await p0.locator('.pg-chip', { hasText: 'V-21' }).click()
        await p0.getByRole('button', { name: 'Weiter' }).click()
        await p0.getByRole('heading', { name: /Was machst du heute mit das Kind/ }).waitFor()
        await p0.locator('.pg-weg', { hasText: 'Schnell für heute' }).click()
        await p0.getByRole('button', { name: 'Stunde bauen' }).click()
        await p0.locator('.pg-schritt').first().waitFor()
        pruefe(await p0.getByRole('button', { name: 'Als Datei speichern' }).isVisible(), 'ohne Hub: „Als Datei speichern“')
        await p0.close()
        // 1b. Hub antwortet nicht → nach 1,5 s ohne Kind
        await hub.goto(`${BASIS}/__hub.html?ref=pg-mia7f3k9q2m&modus=rahmen&stumm=1`)
        const fr = hub.frameLocator('iframe')
        const t0 = Date.now()
        await fr.getByRole('heading', { name: 'Ohne Kind planen' }).waitFor({ timeout: 90000 })
        pruefe(Date.now() - t0 >= 1400, 'stummer Hub: erst nach ~1,5 s ohne Kind')
      }

      // 2. Mia, aus dem Hub im eigenen Tab (window.opener)
      let tb = await oeffne('pg-mia7f3k9q2m')
      await tb.getByRole('heading', { name: /Was machst du heute mit Mia/ }).waitFor({ timeout: 90000 })
      pruefe((await ops()).slice(0, 2).join() === 'hallo,profil', 'hallo, dann profil')
      const halloArg = await hub.evaluate(() => window.__ops[0].arg)
      pruefe(halloArg && halloArg.toolbox && halloArg.toolbox.proto === 1, 'hallo mit Version der Toolbox')
      pruefe(await tb.getByText('Laufende Folge').isVisible(), 'Folgeband „Laufende Folge“')
      pruefe(await tb.getByText(/kommen aus einem Test/).isVisible(), 'Hinweis: Test-Ableitung bestätigen')
      await ueberlauf(tb, 'Start')
      await foto(tb, '01-start')

      // 3. Das weiß ich schon
      await tb.locator('.pg-kopf').getByRole('button', { name: 'Das weiß ich schon' }).click()
      await tb.getByRole('heading', { name: 'Das weiß ich schon' }).waitFor()
      await foto(tb, '02-das-weiss-ich-schon')
      await tb.getByRole('button', { name: 'Stimmt so' }).click()
      const zielZeile = tb.locator('.pg-pzeile', { hasText: 'SOZ-14' })
      await zielZeile.getByRole('button', { name: 'an' }).click()
      pruefe(await zielZeile.getByRole('button', { name: 'aus' }).isVisible(), 'Ziel per Klick aus')
      await zielZeile.getByRole('button', { name: 'aus' }).click()
      await tb.locator('.pg-pzeile', { hasText: 'Stundenleiste' }).getByRole('button').click()
      await tb.locator('.pg-pzeile', { hasText: 'Vorsicht: Reize' }).getByRole('button').click()
      await tb.locator('.pg-chips .pg-chip', { hasText: 'Pferde' }).click()
      await tb.locator('.pg-chip', { hasText: 'Selbstverletzung/Suizid' }).click()
      await dlg(tb).getByRole('button', { name: 'Abbrechen' }).click()
      await ueberlauf(tb, 'Das weiß ich schon')
      await tb.waitForTimeout(900)
      const vorlOps = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'vorlieben').map((o) => o.arg.aenderungen))
      const korr = Object.assign({}, ...vorlOps.map((x) => x.korrekturen || {}))
      pruefe(korr.zugangBestaetigt === true && Array.isArray(korr.hilft) && korr.hilft.includes('stundenleiste') && korr.vorsicht && korr.vorsicht.an.includes('reiz') && (!korr.ziele || korr.ziele.aus.length === 0), 'Korrekturen gehen gebündelt an den Hub (gespeicherte Form, nur Geändertes)')
      pruefe(vorlOps.some((x) => Array.isArray(x.interessen) && x.interessen.includes('pferde')), 'Interessen gehen an den Hub')
      pruefe(!(await tb.content()).includes('test:2026'), 'keine Rohquelle im Text')

      // 4. Weg 1: gründlich
      await tb.getByRole('button', { name: /Weiter: Schnell für heute/ }).click()
      await tb.getByRole('heading', { name: 'Mia heute' }).waitFor()
      pruefe(await tb.locator('.pg-wissenzeile').isVisible(), 'Weg 2 zeigt „Das weiß ich schon“ zugeklappt')
      await tb.locator('.pg-regler input').first().fill('2')
      await tb.locator('.pg-regler input').nth(2).fill('2')
      pruefe(await tb.getByText('Heute geht nicht viel?').isVisible(), 'Hinweis bei zwei Reglern ≤ 2')
      await foto(tb, '04-schnell')
      await tb.locator('.pg-unterreiter button', { hasText: 'Planen' }).click()
      await tb.locator('.pg-weg', { hasText: 'Gründlich planen' }).click()
      await tb.getByRole('heading', { name: 'Eine Folge für Mia' }).waitFor()
      for (const d of ['10 Min.', '15 Min.']) pruefe(await tb.locator('.pg-chip', { hasText: d }).first().isVisible(), `Dauer-Chip ${d}`)
      // Mia schreibt ungern (Zähler format:schreiben) → „ohne Blatt“ vorgewählt, mit Begründung; hier bewusst „mit“
      pruefe(await tb.locator('.pg-chip.an', { hasText: 'ohne Blatt' }).isVisible() && (await tb.getByText(/Schreiben kam bei Mia/).isVisible()), 'ohne Blatt vorgewählt, mit Grund')
      await tb.locator('.pg-chip', { hasText: 'mit Blatt' }).click()
      await ueberlauf(tb, 'Gründlich')
      await foto(tb, '03-gruendlich')
      const t1 = Date.now()
      await tb.getByRole('button', { name: 'Folge bauen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      pruefe(Date.now() - t1 < 3000, 'Folge in unter 3 s')
      pruefe((await tb.locator('.pg-fs').count()) === 6, '6 Sitzungen in der Folge-Leiste')
      pruefe((await tb.locator('.pg-pill', { hasText: 'Ritual' }).count()) >= 2, 'Rituale markiert')
      pruefe(!(await tb.locator('.pg-main').innerText()).match(/k:j\d|j1-e\d/), 'keine Kurs-Ids in der Oberfläche')
      await ueberlauf(tb, 'Ergebnis')
      await foto(tb, '06-ergebnis')
      // Sitzung mit „Vorher klären“: Beachten, Vorbereitung, Druckmaterial je Schritt
      await tb.locator('.pg-fs', { hasText: 'Vorher klären' }).first().click()
      pruefe(await tb.getByText(/Vorbereitung:/).first().isVisible(), 'Hinweis „Vorbereitung“')
      // Druckmaterial je Schritt (T-M12) gibt es nur, wenn ein Schritt der Folge Bildkarten o. Ä. mitbringt
      const druckt = await tb.getByText(/druckt mit:/).count()
      console.log(`  (Sitzung mit „Vorher klären“: ${druckt ? 'mit' : 'ohne'} Druckmaterial)`)
      await tb.locator('.pg-fs').first().click()

      // 5. Ersetzen im Ablauf
      const kern = tb.locator('.pg-schritt', { has: tb.locator('.r-kern') }).first()
      const kernTitel = await kern.locator('h3').innerText()
      await kern.locator('.pg-schritt-haupt').click()
      await dlg(tb).waitFor()
      const nAlt = await dlg(tb).locator('.pg-alt:not(.jetzt)').count()
      pruefe(nAlt >= 1 && nAlt <= 5, `Alternativen 1–5 (${nAlt})`)
      if (await dlg(tb).getByRole('button', { name: /Weitere zeigen/ }).count()) await dlg(tb).getByRole('button', { name: /Weitere zeigen/ }).click()
      await foto(tb, '07-ersetzen-schritt', { voll: false })
      await dlg(tb).locator('.pg-alt:not(.jetzt) button', { hasText: 'Ersetzen' }).first().click()
      await tb.waitForTimeout(200)
      const kernNeu = await tb.locator('.pg-schritt', { has: tb.locator('.r-kern') }).first().locator('h3').innerText()
      pruefe(kernNeu !== kernTitel, 'Kern ersetzt')
      pruefe(await tb.getByRole('button', { name: 'Rückgängig' }).first().isVisible(), 'Rückgängig nach Ersetzen')

      // 6. Daumen runter mit Grund
      await tb.locator('.pg-schritt').nth(1).locator('button[aria-label^="Daumen runter"]').click()
      await tb.locator('.pg-popover').waitFor()
      await foto(tb, '08-daumen-grund', { voll: false })
      pruefe(await tb.locator('.pg-popover .pg-chip', { hasText: 'zu leicht' }).isVisible(), 'Grund „zu leicht“')
      await tb.locator('.pg-popover .pg-chip', { hasText: 'zu lang' }).click()
      pruefe(await tb.locator('.pg-schritt').nth(1).locator('button[aria-label^="Daumen runter"][aria-pressed="true"]').isVisible(), 'Daumen runter gedrückt')
      await tb.locator('.pg-schritt').nth(2).locator('button[aria-label^="Daumen hoch"]').click()

      // 7. Blatt-Teil ersetzen (Liste)
      const bl0 = tb.locator('.pg-bliste li').filter({ hasNotText: /Stundenleiste|Hilfe-Zeile/ }).first()
      const bl0t = await bl0.locator('.bt').innerText()
      await bl0.locator('.haupt').click()
      await dlg(tb).waitFor()
      pruefe(await dlg(tb).getByRole('heading', { name: 'Baustein ersetzen' }).isVisible(), 'Dialog „Baustein ersetzen“')
      const blAlt = dlg(tb).locator('.pg-alt:not(.jetzt) button', { hasText: 'Ersetzen' })
      if (await blAlt.count()) {
        await blAlt.first().click()
        await tb.waitForTimeout(200)
        pruefe(!(await tb.locator('.pg-bliste li .bt').allInnerTexts()).includes(bl0t), 'Blatt-Teil ersetzt (Liste)')
      } else {
        await dlg(tb).getByRole('button', { name: 'Behalten' }).click()
        pruefe(false, 'keine Alternative für Blatt-Teil')
      }

      // 8. Vorschau: Plan und Blatt, Antippen ersetzt
      await tb.locator('.pg-ekopf').getByRole('button', { name: 'Vorschau' }).click()
      await tb.getByRole('heading', { name: 'Plan und Blatt' }).waitFor()
      await tb.waitForTimeout(600)
      pruefe(await tb.locator('.pg-sbar').first().isVisible(), 'Seitenkontrolle als Balken')
      await foto(tb, '10-vorschau-plan-und-blatt')
      // das echte PDF (pdf.js), darüber die Tippflächen aus den Layoutdaten des Kerns
      await tb.locator('.pg-pdfseite img').first().waitFor({ timeout: 60000 })
      const nSeiten = await tb.locator('.pg-pdfseite').count()
      const nPlan = await tb.locator('.pg-tippflaeche[aria-label^="Plan:"]').count()
      const nBlatt = await tb.locator('.pg-tippflaeche[aria-label^="Blatt:"]').count()
      pruefe(nSeiten >= 2 && nPlan >= 3 && nBlatt >= 1, `PDF-Seiten mit Tippflächen (${nSeiten} Seiten, ${nPlan} Plan, ${nBlatt} Blatt)`)
      await foto(tb, '10-vorschau-plan-und-blatt')
      const vorherT = await tb.locator('.pg-tippflaeche[aria-label^="Blatt:"]').first().getAttribute('aria-label')
      await tb.locator('.pg-tippflaeche[aria-label^="Blatt:"]').first().click()
      await dlg(tb).waitFor()
      pruefe(await dlg(tb).getByRole('heading', { name: 'Baustein ersetzen' }).isVisible(), 'Antippen im PDF öffnet „Baustein ersetzen“')
      await foto(tb, '11-ersetzen-in-vorschau', { voll: false })
      const e2 = dlg(tb).locator('.pg-alt:not(.jetzt) button', { hasText: 'Ersetzen' })
      if (await e2.count()) {
        await e2.first().click()
        await tb.locator('.pg-pdfseite img').first().waitFor()
        await tb.waitForFunction((v) => { const b = document.querySelector('.pg-tippflaeche[aria-label^="Blatt:"]'); return b && b.getAttribute('aria-label') !== v }, vorherT, { timeout: 60000 }).catch(() => {})
        pruefe((await tb.locator('.pg-tippflaeche[aria-label^="Blatt:"]').first().getAttribute('aria-label')) !== vorherT, 'ersetzt – das PDF zeigt den neuen Teil')
      } else await dlg(tb).getByRole('button', { name: 'Behalten' }).click()
      await tb.locator('.pg-tippflaeche[aria-label^="Plan:"]').first().click()
      await dlg(tb).waitFor()
      pruefe(await dlg(tb).isVisible(), 'Antippen einer Plan-Zeile im PDF')
      await dlg(tb).getByRole('button', { name: 'Behalten' }).click()
      await ueberlauf(tb, 'Vorschau')
      await tb.getByRole('button', { name: 'Zurück' }).click()

      // 9. Baukasten
      await tb.locator('.pg-ekopf').getByRole('button', { name: 'Baukasten' }).click()
      await tb.getByRole('heading', { name: 'Bausteine kombinieren' }).waitFor()
      if (breite < 500) await tb.locator('.pg-mtabs button', { hasText: 'Blatt' }).click()
      const vorher = await tb.locator('.pg-ed-liste .pg-er').count()
      if (breite < 500) await tb.locator('.pg-mtabs button', { hasText: 'Bausteine' }).click()
      await tb.locator('.pg-ed-spalte .pg-chip', { hasText: 'alle Arten' }).click()
      await tb.locator('.pg-ed-spalte .pg-chip', { hasText: 'passt aufs Blatt' }).click()
      const plus = tb.locator('.pg-sk button[aria-label^="Einfügen"]').first()
      pruefe(await plus.count() > 0, 'Suche liefert Bausteine')
      await plus.click()
      if (breite < 500) await tb.locator('.pg-mtabs button', { hasText: 'Blatt' }).click()
      pruefe((await tb.locator('.pg-ed-liste .pg-er').count()) === vorher + 1, 'Baustein eingefügt')
      // Text ändern im Comic-Baustein (oder im ersten mit Feldern)
      const teileListe = tb.locator('.pg-ed-liste .pg-er').filter({ hasNotText: /Stundenleiste|Hilfe-Zeile/ })
      const comic = teileListe.filter({ hasText: 'Comic' }).first()
      const mitText = (await comic.count()) ? comic : teileListe.first()
      await mitText.locator('button[aria-label^="Text ändern"]').last().click()
      const feld = mitText.locator('.felder input, .felder textarea').last()
      await feld.fill('Zu Frau Weber.')
      pruefe((await feld.getAttribute('maxlength')) !== null, 'Textfeld mit Längengrenze')
      await mitText.locator('.felder input, .felder textarea').first().click()
      await mitText.locator('button.pg-ph', { hasText: '{INTERESSE}' }).click()
      pruefe((await mitText.locator('.felder input, .felder textarea').first().inputValue()).includes('{INTERESSE}'), 'Platzhalter eingefügt')
      await foto(tb, '09-baukasten', { voll: breite > 500 })
      await tb.locator('.pg-er button[aria-label^="nach unten"]').first().click()
      const nVorLoeschen = await tb.locator('.pg-ed-liste .pg-er').count()
      await tb.locator('.pg-er button[aria-label^="löschen"]').last().click()
      pruefe((await tb.locator('.pg-ed-liste .pg-er').count()) === nVorLoeschen - 1, 'gelöscht')
      await tb.locator('.pg-toast button', { hasText: 'Rückgängig' }).click()
      pruefe((await tb.locator('.pg-ed-liste .pg-er').count()) === nVorLoeschen, 'Löschen rückgängig')
      await tb.locator('.pg-tabs button', { hasText: 'Ablauf' }).first().click()
      if (breite < 500) await tb.locator('.pg-mtabs button', { hasText: 'Ablauf' }).click()
      await tb.locator('.pg-er button[aria-label^="eine Minute mehr"]').first().click()
      await ueberlauf(tb, 'Baukasten')
      await tb.getByRole('button', { name: 'Fertig' }).click()

      // 10. PDF = gespeichert (P7)
      const anzahlSpeichern = (await ops()).filter((o) => o === 'speichern').length
      const [download] = await Promise.all([tb.waitForEvent('download', { timeout: 60000 }), tb.locator('.pg-ekopf').getByRole('button', { name: 'PDF' }).click()])
      pruefe(/^Passgenau-Sitzung-\d+\.pdf$/.test(download.suggestedFilename()), 'neutraler Dateiname: ' + download.suggestedFilename())
      await tb.waitForTimeout(500)
      pruefe((await ops()).filter((o) => o === 'speichern').length === anzahlSpeichern + 1, 'PDF speichert den Plan')
      const gespeichert = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'speichern').pop().arg)
      pruefe(gespeichert.plan.sitzungen.some((x) => x.gedruckt), 'Sitzung trägt „gedruckt“')
      pruefe(Array.isArray(gespeichert.ereignisse) && gespeichert.ereignisse.length >= 2, 'Ereignisse gebündelt mitgeschickt')
      pruefe(gespeichert.ereignisse.every((e) => e.kind === null && e.fachkraft === null), 'Ereignisse ohne Kind-Pseudonym')

      // 11. Nach der Stunde: nichts vorbelegt
      await tb.getByRole('button', { name: 'Stunde gehalten' }).click()
      await dlg(tb).waitFor()
      pruefe(await dlg(tb).getByRole('button', { name: 'Notiz speichern' }).isDisabled(), 'ohne Ergebnis kein Speichern')
      pruefe((await dlg(tb).locator('[aria-pressed="true"]').count()) === 0, 'nichts vorbelegt')
      await dlg(tb).getByRole('button', { name: 'Hat geklappt' }).click()
      const notiz1 = await dlg(tb).locator('.pg-notizvorschau').innerText()
      pruefe(!/gelingt|mitgemacht/.test(notiz1), 'Notiz enthält nur Geklicktes')
      await dlg(tb).locator('.pg-zielreihe', { hasText: 'V-21' }).getByRole('button', { name: 'mit Hilfe' }).click()
      await dlg(tb).locator('.pg-chip', { hasText: 'Brauchte eine Pause' }).click()
      await dlg(tb).locator('.pg-zielreihe', { hasText: 'Daumen von Mia' }).getByRole('button', { name: 'hoch' }).click()
      pruefe((await dlg(tb).locator('.pg-notizvorschau').innerText()).includes('gelingt mit Unterstützung'), 'Ziel-Richtung in der Notiz')
      await foto(tb, '12-stunde-gehalten', { voll: false })
      await dlg(tb).getByRole('button', { name: 'Notiz speichern' }).click()
      await tb.waitForTimeout(400)
      const rm = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'rueckmeldung').pop())
      pruefe(rm && rm.arg.ergebnis === 'geklappt' && rm.arg.plan && rm.arg.kind && rm.arg.kind.daumen === 'hoch', 'Rückmeldung mit Plan und Stimme des Kindes')
      pruefe(rm && !('notiz' in rm.arg) && rm.arg.chips.join() === 'pause' && rm.arg.ziele.length === 1 && rm.arg.ziele[0].richtung === 'mit-hilfe', 'Rückmeldung nur mit Geklicktem (Chip-Schlüssel), die Notiz baut der Hub')

      // 12. Weg 2: weiter mit Sitzung 3 der Folge, eigener Text, gehalten → Teilen
      await tb.locator('.pg-unterreiter button', { hasText: 'Planen' }).click()
      await tb.getByRole('button', { name: /Weiter mit Sitzung 3/ }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      pruefe(await tb.getByRole('heading', { name: /Sitzung 3 von 6/ }).isVisible(), 'Weiter mit Sitzung 3 von 6')
      await tb.locator('.pg-ekopf').getByRole('button', { name: 'Baukasten' }).click()
      if (breite < 500) await tb.locator('.pg-mtabs button', { hasText: 'Blatt' }).click()
      const er = tb.locator('.pg-ed-liste .pg-er').filter({ hasNotText: /Stundenleiste|Hilfe-Zeile/ }).first()
      await er.locator('button[aria-label^="Text ändern"]').last().click()
      await er.locator('.felder input, .felder textarea').last().fill('Zu Frau Weber.')
      await tb.getByRole('button', { name: 'Fertig' }).click()
      await tb.getByRole('button', { name: 'Stunde gehalten' }).click()
      await dlg(tb).getByRole('button', { name: 'Hat geklappt' }).click()
      await dlg(tb).getByRole('button', { name: 'Notiz speichern' }).click()
      const teilenKnopf = tb.locator('.pg-toast button', { hasText: 'Fürs Team teilen' })
      await teilenKnopf.waitFor({ timeout: 5000 }).catch(() => {})
      pruefe(await teilenKnopf.isVisible(), 'Angebot „Fürs Team teilen“ nach „hat geklappt“ (3 gehalten)')
      if (await teilenKnopf.isVisible()) await teilenKnopf.click()
      else await tb.getByRole('button', { name: 'Fürs Team teilen' }).click()
      await dlg(tb).getByRole('heading', { name: 'Fürs Team teilen' }).waitFor()
      pruefe(await dlg(tb).getByRole('checkbox', { name: /Nur Original-Bausteine/ }).isChecked(), '„Nur Original“ vorgewählt')
      await dlg(tb).getByRole('checkbox', { name: /Nur Original-Bausteine/ }).uncheck()
      await dlg(tb).locator('mark.pg-gelbmark').first().waitFor({ timeout: 5000 }).catch(() => {})
      pruefe(await dlg(tb).locator('mark.pg-gelbmark').count() > 0, 'Treffer der Hub-Prüfung gelb markiert')
      pruefe((await ops()).includes('praxis-pruefen'), 'praxis-pruefen gefragt')
      const diff = dlg(tb).locator('.pg-diff', { hasText: 'Weber' }).first()
      await diff.getByRole('button', { name: 'meinen Text teilen' }).click()
      pruefe(await dlg(tb).getByRole('button', { name: 'Teilen', exact: true }).isDisabled(), 'ohne Häkchen kein Teilen')
      await diff.getByRole('checkbox', { name: /Kein Kind erkennbar/ }).check()
      await foto(tb, '15-teilen', { voll: false })
      await diff.getByRole('button', { name: 'Originaltext nehmen' }).click()
      await dlg(tb).getByRole('button', { name: 'Teilen', exact: true }).click()
      await tb.waitForTimeout(400)
      const geteilt = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'praxis-teilen').pop())
      const json = JSON.stringify(geteilt ? geteilt.arg.entwurf : {})
      pruefe(geteilt && !json.includes('Weber') && !json.includes('Mia') && !json.includes('pg-mia') && !json.includes('"kinder"') && !json.includes('"warum"'), 'Entwurf ohne Kinddaten und ohne Namen: ' + json.slice(0, 300))
      pruefe(geteilt && geteilt.arg.ref === 'pg-mia7f3k9q2m' && geteilt.arg.planId === 'pl-4k2', 'Teilen mit ref und planId (Sperrliste des Dossiers und Angebot prüft der Hub)')
      pruefe(geteilt && /^(\d{1,2}–\d{1,2}|\d{1,2}\+)$/.test(geteilt.arg.entwurf.altersband), 'Altersband aus festen Bändern: ' + (geteilt && geteilt.arg.entwurf.altersband))
      pruefe(geteilt && Array.isArray(geteilt.arg.entwurf.bestaetigt) && geteilt.arg.entwurf.anonym === true && typeof geteilt.arg.entwurf.belastung === 'number' , 'Entwurf mit Häkchen-Pfaden, anonym und Belastung')

      // 13. Weg 3: heute geht nicht viel
      await tb.locator('.pg-unterreiter button', { hasText: 'Planen' }).click()
      await tb.locator('.pg-weg', { hasText: 'Heute geht nicht viel' }).click()
      await tb.locator('.pg-tf', { hasText: 'wütend' }).click()
      await tb.locator('.pg-tf', { hasText: 'aufgewühlt' }).click()
      await tb.locator('.pg-tf', { hasText: 'müde' }).click()
      pruefe((await tb.locator('.pg-tf.an').count()) === 2, 'höchstens zwei Tagesform-Chips')
      await foto(tb, '05-heute-geht-nicht-viel')
      await tb.getByRole('button', { name: 'Leichte Stunde zeigen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      const leichtText = await tb.locator('.pg-ablauf').innerText()
      pruefe(!/Tischkicker|Basketball/.test(leichtText), 'kein Wettkampf bei aufgewühlt/wütend')
      pruefe(!/Wetterbericht/.test(leichtText), 'kein Ritual mit Anspruch 2 bei aufgewühlt')
      await ueberlauf(tb, 'Weg 3 Ergebnis')
      await foto(tb, '17-leicht-ergebnis')
      await tb.getByRole('button', { name: 'Stunde gehalten' }).click()
      pruefe(await dlg(tb).getByRole('button', { name: 'Hat sich beruhigt' }).isVisible(), 'Krisentag: eigene Ergebnis-Chips')
      pruefe(await dlg(tb).getByRole('button', { name: 'Hat nicht geklappt' }).count() === 0, 'Krisentag: kein „hat nicht geklappt“')
      await dlg(tb).getByRole('button', { name: 'Später' }).click()

      // 14. Gelernt
      await tb.locator('.pg-unterreiter button', { hasText: 'Vorlieben' }).click()
      await tb.getByRole('heading', { name: 'Was Passgenau gelernt hat' }).waitFor()
      pruefe((await tb.locator('.pg-vbalken').count()) >= 3, 'Vorlieben des Kindes sichtbar')
      await tb.locator('.pg-seg button', { hasText: '10 %' }).click()
      await ueberlauf(tb, 'Gelernt')
      await foto(tb, '13-gelernt')
      const vorl = await tb.evaluate(() => JSON.parse(localStorage.getItem('passgenau-vorlieben-v1')))
      pruefe(vorl && vorl.erkundung === 0.1 && Object.keys(vorl.z).length > 0, 'Fachkraft-Vorlieben in localStorage')
      await tb.locator('.pg-vbalken button[aria-label^="zurücksetzen"]').first().click()
      await tb.getByRole('tab', { name: 'Meine Vorlieben' }).click()
      await tb.getByRole('tab', { name: 'Im Team beliebt' }).click()
      pruefe((await tb.locator('.pg-vbalken').count()) >= 1, 'Team-Ebene ab 3 Personen')

      // 15. Aus der Praxis
      await tb.locator('.pg-unterreiter button', { hasText: 'Aus der Praxis' }).click()
      await tb.getByRole('heading', { name: /Sitzungen, die im Team geklappt haben/ }).waitFor()
      await tb.locator('.pg-pr').first().waitFor()
      const karten = await tb.locator('.pg-pr').count()
      pruefe(karten >= 4, `Vorlagen-Karten (${karten})`)
      pruefe(!(await tb.locator('.pg-pr', { hasText: 'Prüfungsangst' }).count()), 'Ungeprüfte nicht unter „geprüft“')
      pruefe(await tb.locator('.pg-pr', { hasText: 'Wut stoppen' }).getByText('7 von 9 als gelungen angegeben').isVisible(), 'unter 10 Rückmeldungen keine Prozente')
      pruefe(await tb.locator('.pg-pr', { hasText: 'Ankommen nach einem' }).getByText(/83 %/).isVisible(), 'ab 10 Rückmeldungen Prozent')
      await ueberlauf(tb, 'Praxis')
      await foto(tb, '14-aus-der-praxis')
      await tb.locator('.pg-pr', { hasText: 'Wut stoppen' }).getByRole('button', { name: 'Übernehmen' }).click()
      await dlg(tb).waitFor()
      // Mia hat „Vorsicht“ gesetzt: die Texte der Autorin kommen nicht mit (E-M7) – das steht im Dialog
      pruefe(await dlg(tb).getByText(/Texte der Autorin (nicht übernommen|\(1\))/).first().isVisible(), 'Übernehmen: Texte der Autorin gezeigt bzw. bei Vorsicht gesperrt')
      await foto(tb, '16-uebernehmen', { voll: false })
      await dlg(tb).getByRole('button', { name: 'Im Baukasten öffnen' }).click()
      await tb.getByRole('heading', { name: 'Bausteine kombinieren' }).waitFor()
      pruefe(true, 'Vorlage im Baukasten')
      await tb.locator('.pg-unterreiter button', { hasText: 'Aus der Praxis' }).click()
      await tb.locator('.pg-pr').first().locator('button[aria-label^="Melden"]').click()
      await dlg(tb).locator('.pg-chip', { hasText: 'fachlich falsch' }).click()
      await dlg(tb).getByRole('button', { name: 'Melden' }).click()
      const melden = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'praxis-signal').pop())
      pruefe(melden && melden.arg.art === 'melden' && melden.arg.grund === 'fachlich', 'Melden als Signal an den Hub (art melden, grund)')
      await tb.locator('.pg-filter .pg-chip', { hasText: 'noch nicht geprüft' }).click()
      await tb.locator('.pg-pr', { hasText: 'Prüfungsangst' }).getByRole('button', { name: 'Prüfen' }).click()
      pruefe(await dlg(tb).getByRole('button', { name: /Geprüft – freigeben/ }).isDisabled(), 'Freigabe erst nach vier Häkchen')
      for (const c of await dlg(tb).getByRole('checkbox').all()) await c.check()
      await dlg(tb).getByRole('button', { name: /Geprüft – freigeben/ }).click()
      // die Antwort an den Hub ist asynchron – erst warten, dann nachsehen (vorher wackelig)
      await hub.waitForFunction(() => window.__ops.some((o) => o.op === 'praxis-kuratieren'), null, { timeout: 5000 }).catch(() => {})
      const kur = await hub.evaluate(() => window.__ops.filter((o) => o.op === 'praxis-kuratieren').pop())
      pruefe(kur && kur.arg.aktion === 'freigeben' && Object.values(kur.arg.checkliste || {}).filter(Boolean).length === 4, 'Kuratieren an den Hub (vier Häkchen)')
      await tb.close()

      // 16. Ilyas (14 J., heikles Thema, ohne Recht zur Rückmeldung) und Noé (5 J.)
      tb = await oeffne('pg-ily5q0w3', 'gruendlich')
      await tb.getByRole('heading', { name: 'Eine Folge für Ilyas' }).waitFor({ timeout: 90000 })
      await tb.getByRole('button', { name: 'Folge bauen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      pruefe(await tb.getByText(/heikles Thema offen/).isVisible(), 'Banner bei heiklem Thema')
      await foto(tb, '18-ilyas-ergebnis')
      await tb.locator('.pg-fs', { hasText: 'Vorher klären' }).first().click()
      pruefe(await tb.getByText(/Beachten:/).first().isVisible(), 'Hinweis „Beachten“ aus der Quelle (Sitzung mit „Vorher klären“)')
      // Elternbriefe hängen meist an heiklen Themen – die plant Passgenau nur nach ausdrücklicher Freischaltung
      console.log(`  (Ilyas: ${(await tb.getByText(/Eltern informiert/).count()) ? 'mit' : 'ohne'} Hinweis „Elternbrief“ in der Folge)`)
      await tb.close()
      tb = await oeffne('pg-noe2b8x1', 'schnell')
      await tb.getByRole('heading', { name: 'Noé heute' }).waitFor({ timeout: 90000 })
      pruefe(await tb.locator('.pg-chip.an', { hasText: '15 Min.' }).isVisible(), 'Dauer 15 Min. vorbelegt (5 J.)')
      pruefe(await tb.locator('.pg-chip.an', { hasText: 'ohne Blatt' }).isVisible(), 'ohne Blatt vorbelegt (5 J.)')
      await tb.locator('.pg-chip', { hasText: '30 Min.' }).click()
      await tb.locator('.pg-chip', { hasText: 'mit Blatt' }).click()
      await tb.getByRole('button', { name: 'Stunde bauen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      await foto(tb, '19-noe-ergebnis')
      await tb.close()
      // dünne Daten: „Worum soll es heute gehen?“
      tb = await oeffne('pg-anouk01', 'schnell')
      await tb.getByRole('heading', { name: 'Worum soll es heute gehen?' }).waitFor({ timeout: 90000 })
      pruefe(await tb.getByRole('button', { name: 'Stunde bauen' }).isDisabled(), 'dünne Daten: erst Schwerpunkt wählen')
      await tb.locator('.pg-chip', { hasText: 'Gefühle ausdrücken' }).click()
      await tb.getByRole('button', { name: 'Stunde bauen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      pruefe(true, 'dünne Daten: Stunde mit Schwerpunkt')
      await tb.close()

      // 16b. Gruppe (Aufgabe 151): zwei refs, ein Plan, gespeichert bei beiden, Blatt je Kind
      tb = await oeffne('pg-mia7f3k9q2m,pg-anouk01', 'schnell')
      await tb.getByRole('heading', { name: /Mia und Anouk heute/ }).waitFor({ timeout: 90000 })
      pruefe((await ops()).filter((o) => o === 'profil').length >= 2, 'Gruppe: Profil je Kind geholt')
      if (await tb.getByRole('button', { name: 'Stunde bauen' }).isDisabled()) await tb.locator('.pg-chip', { hasText: 'Gefühle ausdrücken' }).click()
      await tb.getByRole('button', { name: 'Stunde bauen' }).click()
      await tb.locator('.pg-schritt').first().waitFor()
      await foto(tb, '20-gruppe-ergebnis')
      const vorG = (await hub.evaluate(() => window.__ops.length))
      const [dlG] = await Promise.all([tb.waitForEvent('download', { timeout: 60000 }), tb.locator('.pg-ekopf').getByRole('button', { name: 'PDF' }).click()])
      await tb.waitForTimeout(800)
      const spG = await hub.evaluate((n) => window.__ops.slice(n).filter((o) => o.op === 'speichern').map((o) => ({ ref: o.arg.ref, rev: o.arg.plan.rev, sf: o.arg.plan.auftrag && o.arg.plan.auftrag.sozialform })), vorG)
      pruefe(spG.length === 2 && new Set(spG.map((x) => x.ref)).size === 2, 'Gruppe: PDF speichert bei beiden Kindern ' + JSON.stringify(spG))
      pruefe(spG.every((x) => x.rev === undefined && x.sf === 'zu-zweit'), 'Gruppe: ohne Änderungszähler, Sozialform zu zweit')
      pruefe(!(await hub.evaluate((n) => window.__ops.slice(n).some((o) => o.op === 'vorlieben'), vorG)), 'Gruppe: keine Korrekturen/Vorlieben ans Kind')
      console.log('  (Gruppe: ' + dlG.suggestedFilename() + ')')
      await tb.close()

      // 17. Rahmen-Modus (window.parent)
      if (breite > 500) {
        await hub.goto(`${BASIS}/__hub.html?ref=pg-mia7f3k9q2m&modus=rahmen`)
        await hub.frameLocator('iframe').getByRole('heading', { name: /Was machst du heute mit Mia/ }).waitFor({ timeout: 90000 })
        pruefe(true, 'im Rahmen mit dem Hub verbunden')
      }
      await ctx.close()
    }
  } catch (e) {
    // Bei Abbruch: alle offenen Seiten fotografieren (fehler-*.png), dann weiterwerfen
    if (ctx) {
      let i = 0
      for (const seite of ctx.pages()) await seite.screenshot({ path: path.join(BILDER, `fehler-${i++}.png`), fullPage: true }).catch(() => {})
    }
    throw e
  } finally {
    await browser.close()
    stopp()
  }
  console.log(`\n${ok} Prüfungen bestanden, ${fehler} Fehler. Bilder: ${BILDER} (${fotos.length})`)
  if (fehler) process.exitCode = 1
  if (process.env.PG_LOG) console.log(log)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
