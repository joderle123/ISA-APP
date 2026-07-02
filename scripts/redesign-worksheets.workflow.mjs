export const meta = {
  name: 'redesign-worksheets',
  description: 'Redesign every worksheet: material-specific, visually varied, non-generic layouts',
  phases: [{ title: 'Arbeitsblätter neu layouten', detail: '6 Blätter pro Agent' }],
}

const A = typeof args === 'string' ? JSON.parse(args) : args || {}
const { batchDir, outDir, count } = A
if (!batchDir || !outDir || !count) {
  log('FEHLER: batchDir/outDir/count fehlen')
  return { error: 'missing args' }
}

phase('Arbeitsblätter neu layouten')

function prompt(idx) {
  const nn = String(idx).padStart(3, '0')
  const inPath = `${batchDir}/batch-${nn}.json`
  const outPath = `${outDir}/wsr-${nn}.json`
  return `Du bist Förderpädagog:in UND Grafik-Designer:in für Schüler-Arbeitsblätter (ISA-Bibliothek, Luxemburg, sozial-emotionales Lernen). Die bisherigen Arbeitsblätter sind zu GENERISCH: fast nur Frage→Schreiblinien-Ketten, austauschbare Prompts, kaum visuelle Elemente. Deine Aufgabe: jedes Blatt im Batch NEU GESTALTEN — material-spezifisch, visuell abwechslungsreich, druckreif.

SCHRITT 0 – Versuche zuerst, die Ausgabedatei zu lesen (Read): ${outPath}
Existiert sie als gültiges JSON mit "results", antworte nur "batch ${nn}: bereits fertig" und stoppe.

SCHRITT 1 – Lies die Eingabedatei (Read): ${inPath}
Bis zu 6 Materialien mit: id, title, language, ageLevels, themes, tags, shortDescription, ablauf (gekürzt), worksheet (aktueller Stand).

BAUSTEIN-KATALOG (kind + Felder) — nutze die VOLLE Palette:
· heading{text} — Abschnittstitel (konkret & motivierend, NICHT "Teil 1")
· instruction{text} — kurze Anleitung im farbigen Hinweis-Feld
· question{text,lines:2-4} — offene Frage mit Schreiblinien
· lines{lines,text?} — freie Schreiblinien
· box{text,lines:4-8} — gestrichelte Mal-/Skizzen-Box
· checklist{items[]} — Ankreuz-Liste (konkrete, materialspezifische Optionen)
· scale{text,items[]} — Auswahl-Kacheln; Farbwörter (grün/gelb/orange/rot), Wetter (Sonne/Wolke/Regen/Gewitter) und Intensität (gar nicht→sehr) werden automatisch als Punkte/Icons/Smileys gezeichnet
· table{text,items[]=Spaltenköpfe,lines=Zeilen} — Tabelle mit farbigem Kopf
· columns{text,items[]=2-3 Spaltentitel,lines=Zeilen} — Nebeneinander-Vergleich (Vorher/Nachher, Ich/Du, Pro/Contra, Stopp/Weiter)
· wordbank{text,items[]=6-12 Wörter} — Wörter-Kiste zum Einkreisen/Verwenden
· sentences{text?,items[]=3-5 Satzanfänge,lines:1} — kursive Satzanfänge mit Weiterschreib-Linie ("Ich fühle mich stark, wenn …")
· bubble{text,items[]=Sprecher-Labels,lines:2} — Sprechblasen links/rechts zum Ausfüllen (Dialog üben, Sag-es-so-Formulierungen)
· steps{text,items[]=Schritt-Texte ("" = leerer Schritt zum Ausfüllen),lines} — nummerierte Schritt-Kette mit Verbindungslinie (Pläne, Routinen, Erste-Hilfe-bei-Wut)
· thermometer{text,items[]=Zonen ruhig→heiß} — vertikales Zonen-Thermometer mit Schreiblinie pro Zone (Stress, Wut, Energie, Lautstärke)
· bodymap{text,items[]=Legende-Gefühle,lines≈Höhe} — Körper-Umriss zum Anmalen (wo spüre ich …)
· target{text,items[]=Ringe außen→Mitte} — Zielscheibe (Prioritäten, Nähe/Distanz, Wichtigkeit)
· mindmap{text=Zentrum,items[]=Äste ("" = leer zum Ausfüllen)} — Netz-Karte (mein Netzwerk, meine Stärken, Ideen sammeln)

DESIGN-BRIEF (zwingend):
1. MATERIAL-SPEZIFISCH: Jeder Prompt greift die konkrete Aktivität auf — ihre Metaphern, Szenen, Phasen-Namen, Beispiele aus dem ablauf. VERBOTEN sind generische Prompts wie "Was hast du gelernt?", "Wie fandest du die Übung?" ohne Bezug. Wenn das Material eine Bild-Idee hat (Kapitän, Kompass, Detektiv, Schmiede …), zieht sie sich durchs Blatt.
2. VISUELL ZUERST: mind. 3 verschiedene visuelle Bausteine pro Blatt (scale/checklist/table/columns/wordbank/sentences/bubble/steps/thermometer/bodymap/target/mindmap/box). NIE mehr als 2 question/lines hintereinander.
3. PASSGENAU wählen, nicht erzwingen: thermometer nur bei Intensität/Eskalation; bodymap nur bei Körper/Gefühls-Spüren; bubble bei Dialog/Formulierungen; steps bei Plänen/Routinen; target bei Prioritäten/Nähe; mindmap bei Sammeln/Netzwerk; columns bei Gegenüberstellungen.
4. ALTERSGERECHT: C1/C2 = 3-5 große Aufgaben, viel malen (box/bodymap), wordbank mit einfachen Wörtern, bildhafte scale, SEHR wenig Schreiben. C3/C4 = 4-7 Aufgaben, Mix aus Schreiben + Visuellem. ES/Jugendliche = 5-8 Aufgaben, reifere Sprache (kein Kinderton!), strukturierende Elemente (columns/table/steps/thermometer), Transfer-Aufgabe am Ende.
5. STRUKTUR: title (prägnant, materialbezogen) + intro (1-2 motivierende Sätze, direkt ans Kind/den Jugendlichen) + 2-4 headings als Abschnitte. Insgesamt 8-16 Blöcke. Sinnvoller Bogen: Ankommen/Erinnern → Erarbeiten/Anwenden → Ich-Bezug → Vorsatz/Transfer.
6. SPRACHE: dieselbe wie das Material (de bleibt de; lëtzebuergesche Titel dürfen bleiben). Du-Anrede fürs Kind.
7. Gute Inhalte des alten Blatts BEHALTEN und neu verpacken — Substanz nicht verlieren, nur besser inszenieren.

SCHRITT 2 – Gestalte für JEDES Material das Arbeitsblatt neu.

SCHRITT 3 – Schreibe mit dem Write-Tool als JSON nach:
${outPath}
Format:
{"results":[
  {"id":"<material-id>","worksheet":{"title":"…","intro":"…","blocks":[ … ]}}
]}
Jedes Material aus der Eingabe MUSS vorkommen. Gültiges JSON, nichts außer der Datei.

SCHRITT 4 – Finale Antwort: NUR "batch ${nn}: fertig".`
}

const items = Array.from({ length: count }, (_, i) => i)
const summaries = await parallel(
  items.map((i) => () =>
    agent(prompt(i), { label: `wsr-${String(i).padStart(3, '0')}`, phase: 'Arbeitsblätter neu layouten' }),
  ),
)
const ok = summaries.filter(Boolean).length
log(`Fertig: ${ok}/${count} Batches. Ausgabe in ${outDir}/wsr-*.json`)
return { batches: count, completed: ok }
