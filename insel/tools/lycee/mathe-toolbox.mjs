// Mathe-Pilot aus dem Spiel „Annexe Junglinster“ als Toolbox-Blätter (PDF): src/data/blaetter/mathe-3.json.
// Jedes Spielblatt (insel/src/lycee/mathe.js) wird ein Arbeitsblatt: Merkkasten „So geht's“ mit Beispiel,
// zwei Aufgabenreihen mit festen Zahlen (Stufe 1 und 2), Kästchen für Nebenrechnungen, Lehrerseite mit Lösungen.
// Feste Startwerte → das Blatt bleibt beim nächsten Bauen gleich. Im Spiel gibt es dieselben Blätter mit immer neuen Zahlen.
// Aufruf (aus isa-app): node insel/tools/lycee/mathe-toolbox.mjs
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MATHE, matheBlatt } from '../../src/lycee/mathe.js'
import { MODUL_FR, BLATT_FR, aufgabeFr } from './mathe-fr.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const ZIEL = join(ROOT, 'src/data/blaetter/mathe-3.json')

const THEMA = { 1: 'rechnen', 2: 'rechnen', 3: 'rechnen', 4: 'dezimalzahlen', 5: 'groessen' }
const thema = (m, id) => THEMA[m] || (id === 'm6-brueche' ? 'brueche' : id === 'm6-flaeche' ? 'geometrie' : 'rechnen')
const BILD = { 1: 'icon:abacus', 2: 'icon:math-symbols', 3: 'icon:math', 4: 'icon:coin-euro', 5: 'icon:ruler', 6: 'icon:pizza' }

// Text für das Päckchen: Lücke ___ bleibt, ◻ wird Kästchen [], Brüche a/b mit Bruchstrich.
const zeile = (a) => a.t.replace('◻', '[]').replace(/\b(\d+)\/(\d+)\b/g, '#$1/$2#')
const loesung = (a) => (Array.isArray(a.a) ? a.a.join(' | ') : a.a)
const anweisung = (aufg, fr) => (aufg.some((a) => a.wahl) ? (fr ? 'Écris <, = ou >.' : 'Setze <, = oder > ein.') : aufg.some((a) => a.t.length > 40) ? (fr ? 'Lis bien et calcule. Écris la réponse sur la ligne.' : 'Lies genau und rechne. Schreib die Antwort auf die Linie.') : (fr ? 'Calcule. Écris le résultat sur la ligne.' : 'Rechne. Schreib die Lösung auf die Linie.'))
const spalten = (aufg) => { const l = Math.max(...aufg.map((a) => aufgabeFr(zeile(a)).length, ...aufg.map((a) => zeile(a).length))); return l > 40 ? 1 : l > 22 ? 2 : 3 }
const abc = (i) => String.fromCharCode(97 + i)

const out = []
for (const m of MATHE) {
  m.blaetter.forEach((b, k) => {
    const s1 = matheBlatt(m.nr, b.id, 1000 + m.nr * 100 + k).aufgaben
    const alle2 = matheBlatt(m.nr, b.id, 5000 + m.nr * 100 + k).aufgaben, n2 = Math.min(8, alle2.length)
    const s2 = Array.from({ length: n2 }, (_, i) => alle2[Math.round(i * (alle2.length - 1) / Math.max(1, n2 - 1))])   // über die ganze Reihe verteilt (auch die schwereren)
    const fr = BLATT_FR[b.id], mfr = MODUL_FR[m.nr]
    const inhalt = (f) => ({
      titel: f ? fr.titel : b.titel,
      untertitel: f ? 'Entraînement maths module ' + m.nr + ' « ' + mfr.titel + ' » – aussi dans le jeu Annexe Junglinster' : 'Mathe-Training Modul ' + m.nr + ' „' + m.titel + '“ – auch im Spiel Annexe Junglinster',
      bausteine: [
        { art: 'spalten', verhaeltnis: '2:1', links: [{ art: 'info', symbol: 'merke', titel: f ? 'Comment faire' : 'So geht’s', text: f ? fr.idee : b.erkl.idee, punkte: f ? fr.schritte : b.erkl.schritte }],
          rechts: [{ art: 'info', symbol: 'tipp', titel: f ? 'Exemple' : 'Beispiel', text: f ? fr.beispiel : b.erkl.beispiel }] },
        { art: 'aufgabe', stufe: 1, text: anweisung(s1, f) },
        { art: 'paeckchen', items: s1.map((a) => (f ? aufgabeFr(zeile(a)) : zeile(a))), spalten: spalten(s1), buchstaben: true },
        { art: 'aufgabe', stufe: 2, text: f ? 'Encore une fois – avec de nouveaux nombres. Tu y arrives sans aide ?' : 'Noch einmal – mit neuen Zahlen. Schaffst du es ohne Hilfe?' },
        { art: 'paeckchen', items: s2.map((a) => (f ? aufgabeFr(zeile(a)) : zeile(a))), spalten: spalten(s2), buchstaben: true },
        { art: 'kaestchen', zeilen: 5, label: f ? 'Place pour les calculs' : 'Platz für Nebenrechnungen' },
      ],
      lehrer: f ? {
        ziel: 'Les jeunes s’entraînent : ' + mfr.ziele.join(', ') + '. Cette fiche : « ' + fr.titel + ' ».',
        ablauf: [
          'Lire ensemble l’encadré « Comment faire » et calculer l’exemple au tableau.',
          'Série 1 seul ou à deux. En cas de blocage, regarder l’encadré.',
          'Série 2 sans aide. Ensuite, comparer soi-même avec la solution.',
          'Pour s’entraîner davantage : dans le jeu « Annexe Junglinster », la même fiche à sa place, avec toujours de nouveaux nombres.',
        ],
        hintergrund: 'Répartition provisoire de l’entraînement en six modules ; elle sera adaptée aux descriptifs officiels des modules dès qu’ils seront disponibles. Une courte explication, un exemple, beaucoup d’exercices du même type : répéter à petits pas donne de l’assurance. Dans le jeu, une astuce apparaît après une mauvaise réponse ; sur papier, c’est l’enseignant qui prend ce rôle.',
        differenzierung: { leichter: 'Seulement la série 1 ; recopier l’exemple à côté.', schwerer: 'Inventer ses propres exercices du même type et les échanger.' },
        loesungen: ['1) ' + s1.map((a, i) => abc(i) + ') ' + loesung(a)).join(' · '), '2) ' + s2.map((a, i) => abc(i) + ') ' + loesung(a)).join(' · ')],
      } : {
        ziel: 'Die Jugendlichen üben: ' + m.ziele.join(', ') + '. Dieses Blatt: „' + b.titel + '“.',
        ablauf: [
          'Merkkasten „So geht’s“ gemeinsam lesen und das Beispiel an der Tafel vorrechnen.',
          'Reihe 1 allein oder zu zweit. Wer nicht weiterkommt, schaut in den Merkkasten.',
          'Reihe 2 ohne Hilfe. Danach selbst mit der Lösung vergleichen.',
          'Mehr Übung: Im Spiel „Annexe Junglinster“ am eigenen Platz dasselbe Blatt mit immer neuen Zahlen.',
        ],
        hintergrund: 'Vorläufige Einteilung des Mathe-Trainings in sechs Module; sie wird an die offiziellen Modulbeschreibungen angepasst, sobald diese vorliegen. Kurze Erklärung, ein Beispiel, viele gleichartige Aufgaben: Wiederholung mit kleinen Schritten gibt Sicherheit. Im Spiel erscheint bei einer falschen Antwort ein Tipp; auf Papier übernimmt das die Lehrperson.',
        differenzierung: { leichter: 'Nur Reihe 1; das Beispiel daneben abschreiben lassen.', schwerer: 'Eigene Aufgaben in derselben Art erfinden und tauschen.' },
        loesungen: ['1) ' + s1.map((a, i) => abc(i) + ') ' + loesung(a)).join(' · '), '2) ' + s2.map((a, i) => abc(i) + ') ' + loesung(a)).join(' · ')],
      },
    })
    out.push({
      id: 'annexe-mathe-' + b.id,
      bereich: 'mathe',
      thema: thema(m.nr, b.id),
      stufen: ['ES'],
      sozialform: ['einzeln'],
      dauer: '20–30 Min.',
      eldib: [],
      schlagworte: ['Annexe Junglinster', 'Mathe-Training', 'Modul ' + m.nr, m.titel, b.titel],
      bild: BILD[m.nr],
      de: inhalt(false),
      fr: inhalt(true),
    })
  })
}
writeFileSync(ZIEL, JSON.stringify(out, null, 2) + '\n')
console.log('✓ ' + ZIEL.replace(ROOT + '/', '') + ': ' + out.length + ' Blätter')
