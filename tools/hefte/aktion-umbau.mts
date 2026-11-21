// SOLO AKTION im Modul-Design (Auftrag 21.11., nach den Themenheften): liest dossiers/aktion/aNN.ts und schreibt
// tools/hefte/inhalt/aktion-NN.mjs. Inhalt bleibt, wie er ist; nur die Form ändert sich.
// Aufbau wie bisher, weil er sich bewährt hat: Deckblatt mit Auswahl-Karte, eine Aktion je Seite, „Für die Woche“,
// zwei Seiten für die Bezugsperson. Keine Hördateien, kein Quiz, keine Lösungen – hier wird gemacht, nicht gelesen.
// Aufruf (aus isa-app/): npx tsx --tsconfig tsconfig.scripts.json tools/hefte/aktion-umbau.mts [05 06 …]
import { writeFileSync } from 'node:fs'
import { lesbar, mische, esc, md, peep, fragenBlock } from './solo-umbau.mts'

const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const KOERPER = `<svg viewBox="0 0 100 200" fill="#fff" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><circle cx="50" cy="21" r="15"/><path d="M50 39C31 40 23 51 21 68L14 110C13 119 24 121 26 113L33 80L33 121L28 186C27 197 42 198 43 187L50 132L57 187C58 198 73 197 72 186L67 121L67 80L74 113C76 121 87 119 86 110L79 68C77 51 69 40 50 39Z"/></svg>`
const kasten = (t: string) => `<span class="ak-box"><i></i>${md(t)}</span>`

// Eine Zone des alten Hefts → Aufgaben im Modul-Design (ohne Nummer; die Schritte oben sind die Anleitung)
function zone(z: any): any[] {
  switch (z.art) {
    case 'fragen':
      return fragenBlock({ fragen: z.fragen }).map((a) => ({ ...a, auftrag: a.auftrag?.replace(/^\*\*(.*)\*\*$/, '$1') }))
    case 'tabelle': {
      const n = z.kopf.length - 1, erste = Math.max(26, 100 - n * 14)
      return [{ art: 'tabelle', auftrag: '', hoch: z.zeilen.length <= 4, kopf: z.kopf, breiten: [erste, ...z.kopf.slice(1).map(() => (100 - erste) / n)], zeilen: z.zeilen.map((r: string) => [r, ...z.kopf.slice(1).map(() => '')]) }]
    }
    case 'werte':
      return [{ art: 'tabelle', auftrag: `Zahl von **0** (${z.von ?? 'gar nicht'}) bis **10** (${z.bis ?? 'extrem'})`, kopf: ['', z.kopf[0], z.kopf[1]], breiten: [70, 15, 15], zeilen: z.zeilen.map((r: string) => [r, '', '']) }]
    case 'koerper':
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-koerper"><div class="fig">${KOERPER}</div><div class="w">${z.woerter.map(kasten).join('')}</div></div>` }]
    case 'ringe':
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-ringe"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="97" fill="#fff" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 4"/><circle cx="100" cy="100" r="66" fill="var(--f-zart)" stroke="currentColor" stroke-width="1.4"/><circle cx="100" cy="100" r="34" fill="var(--f-mittel)" stroke="currentColor" stroke-width="1.4"/><circle cx="100" cy="100" r="5" fill="currentColor"/></svg><div class="w">${z.ringe.map((r: string, i: number) => `<div><b>${['innen', 'Mitte', 'außen'][i]}</b><span>${md(r)}</span></div>`).join('')}</div></div>` }]
    case 'felder': {
      const h = z.titel.length <= 2 ? 78 : z.titel.length <= 4 ? 52 : 38
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-felder">${z.titel.map((x: string, i: number) => `<div><b>${i + 1}</b><span>${md(x)}</span><div class="feldbox" style="height:${h}mm"></div></div>`).join('')}</div>` }]
    }
    case 'hinweis':
      return [{ art: 'frei', auftrag: '', html: `<div class="unbequem"><span class="u-l">${esc(z.label)}</span><p>${md(z.titel)}</p><div class="u-x">${md(z.x)}</div></div>` }]
    case 'comic':
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-comic" style="grid-template-columns:repeat(${z.bilder.length},1fr)">${z.bilder.map(([ic, t]: [string, string], i: number) => `<div><div class="o"><b>${i + 1}</b>{i:${ic}}</div><p>${md(t)}</p></div>`).join('')}</div>` }]
    case 'wahl':
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-wahl">${z.punkte.map(([ic, t]: [string, string]) => `<div>{i:${ic}}<span>${md(t)}</span><i></i></div>`).join('')}</div>` }]
    case 'clip':
      return [{ art: 'clip', titel: z.clip.titel, kanal: z.clip.kanal, dauer: z.clip.dauer, url: z.clip.url, frage: z.clip.frage, zeilen: 1 }]
    case 'daumen':
      return [{ art: 'frei', auftrag: '', html: `<div class="ak-daumen"><div class="k"><span></span><b>du</b><b>Gegenüber</b></div>${z.saetze.map((s: string) => `<div><span>${md(s)}</span><em>{i:thumb-up}{i:thumb-down}</em><em>{i:thumb-up}{i:thumb-down}</em></div>`).join('')}</div>` }]
    case 'woche':
      return [{ art: 'tabelle', auftrag: '', hoch: z.zeilen.length <= 5, kopf: ['', ...TAGE], breiten: [37, ...TAGE.map(() => 9)], zeilen: z.zeilen.map((r: string) => [r, ...TAGE.map(() => '')]) }]
    case 'karten':
      return [{ art: 'schneidekarten', auftrag: 'Für die Tasche: Schneide die Karten aus.', spalten: 2, karten: z.karten.map((k: any) =>
        ({ titel: k.titel, icon: k.icon, text: k.zeilen.map((x: string) => (x.startsWith('_') ? `**${x.slice(1)}:** ________________` : x)).join('\n') })) }]
    default:
      throw new Error('unbekannte Zone ' + z.art)
  }
}

function aktion(a: any) {
  return { titel: a.titel, icon: a.icon, zeit: a.zeit, wer: a.wer, material: a.material || '', bild: a.bild ? peep(a.bild).split(':').slice(0, 2).join(':') : '',
    schritte: a.schritte, zonen: a.zonen.flatMap(zone), aha: a.aha, ziel: a.ziel, tipp: a.tipp }
}

function umbau(d: any): string {
  const tief = lesbar(d.farbe)
  const karte = `<h3>Such dir aus, womit du anfängst</h3><div class="ak-karte">${d.aktionen.map((a: any, i: number) => `<div><b>${i + 1}</b>{i:${a.icon}}<span>${esc(a.titel)}</span><small>${esc(a.zeit)}</small><i></i></div>`).join('')}</div><p class="ak-regel"><b>Regeln:</b> „Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</p>`
  const MODUL = {
    id: 'aktion-' + d.nr, kuerzel: 'ak' + Number(d.nr), nr: Number(d.nr), nrText: '#' + d.nr, sprache: 'de',
    kompakt: true, ohneLoesungen: true, ablage: 'offline/solo', deckH1: 'SOLO AKTION #' + d.nr, fuss: `SOLO AKTION #${d.nr} · ${d.thema}`, stand: d.stand,
    klasse: 'Zum Machen', niveau: '12–17 Jahre · 10–15 Minuten je Aktion', dateiname: d.datei,
    fach: { de: 'Bezugszeit', fr: 'Temps de référence' }, titel: { de: d.thema, fr: '' }, untertitel: { de: d.start.map((x: string) => x.replace(/\*\*/g, '')).join(' '), fr: '' },
    farben: { tief, mittel: d.farbe, zart: mische(d.farbe, 255, 0.88), dunkel: mische(tief, 0, 0.35) },
    deckbild: [peep(d.bild).split(':').slice(0, 2).join(':') + ':stehen'], blasen: d.sticker ? [{ t: d.sticker, x: 138, y: 104 }] : [],
    deckUnten: karte, namensfelder: ['Dieses Heft gehört', 'Mein Gegenüber'],
    aktionen: d.aktionen.map(aktion), woche: aktion(d.woche),
    begleitungAktion: { material: d.begleitung.material, achtung: d.begleitung.achtung, mehr: d.begleitung.mehr },
  }
  return `// SOLO AKTION #${d.nr} · ${d.thema} – erzeugt von tools/hefte/aktion-umbau.mts aus dossiers/aktion/a${d.nr}.ts.\n// Inhalt dort ändern und den Umwandler neu laufen lassen.\n\nexport const MODUL = ${JSON.stringify(MODUL, null, 1)}\n\nexport const LEKTIONEN = []\n`
}

const wahl = process.argv.slice(2)
const ids = wahl.length ? wahl : Array.from({ length: 16 }, (_, i) => String(i + 2).padStart(2, '0'))
for (const nr of ids) {
  const d = (await import(`../../dossiers/aktion/a${nr}.ts`)).default
  writeFileSync(new URL(`./inhalt/aktion-${nr}.mjs`, import.meta.url), umbau(d))
  console.log('✓ aktion-' + nr)
}
