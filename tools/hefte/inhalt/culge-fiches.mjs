// Culture générale · Programm CULGE, Voie de préparation (CNES, 30/06/2026) – Zusätze für alle Module (Prüfung 26.11.2026):
// vorne die Kompetenzen der Domäne und des Niveaus (zum Ankreuzen am Anfang = Eingangsdiagnose, und am Ende),
// hinten ein Modul-Bilan mit drei Bewertungsformen des Programms (Test, Präsentation/Plakat, Recherche/Dossier) auf 60 Punkte.
// heft.tsx lädt diese Datei für jedes Modul culge-mN.

const DOMAENE = ['Mein Leben, mein Körper und mein Wohlbefinden', 'Erde, Natur und Umwelt', 'Leben in der Gesellschaft früher und heute']
// [Domäne][Niveau] – nach den Progressionen des Programms, in Schülersprache
const ZIELE = [
  [
    ['Ich nenne Teile und Organe des Körpers und ihre Aufgaben.', 'Ich beschreibe, wie sich der Körper in der Pubertät verändert.', 'Ich erkenne Zeichen von Krankheit und weiß, was ich tue.', 'Ich kenne meine Grenzen und weiß, wo ich Hilfe bekomme.', 'Ich beobachte, wie soziale Netzwerke auf mich wirken.', 'Ich unterscheide wahre und falsche Informationen und nenne Vor- und Nachteile von Medien.'],
    ['Ich erkläre, wie Organe als System zusammenarbeiten.', 'Ich erkläre, wie ein Mensch entsteht.', 'Ich weiß, wie ich meine Gesundheit schütze.', 'Ich kenne Stellen, die Jugendliche beraten.', 'Ich hinterfrage, was ich in sozialen Netzwerken sehe.', 'Ich erkenne Desinformation und schütze meine Daten.'],
    ['Ich erkläre, wie der Körper als Ganzes funktioniert.', 'Ich erkläre Einverständnis, Verhütung und Schutz vor Infektionen.', 'Ich beschreibe Krankheit, Heilung und ihre Folgen.', 'Ich steuere meine Nutzung von sozialen Netzwerken.', 'Ich bewerte, ob eine Quelle verlässlich ist.', 'Ich wäge Vor- und Nachteile ab.'],
  ],
  [
    ['Ich beschreibe Lebensräume und Lebewesen (Pflanzen- und Fleischfresser).', 'Ich erkläre, warum Wasser und Luft wichtig sind.', 'Ich beobachte, wie sich Stoffe verwandeln.', 'Ich lese einen Plan und benutze links, rechts und die Himmelsrichtungen.', 'Ich finde mich in Luxemburg zurecht.', 'Ich nenne Arten der Verschmutzung und wie man Müll vermeidet.'],
    ['Ich erkläre, was Lebewesen in ihrem Lebensraum brauchen.', 'Ich untersuche Wärme, Licht und Energie im Versuch.', 'Ich erkläre, wie Pflanzen mit Licht Nahrung herstellen.', 'Ich benutze Maßstab und Legende einer Karte.', 'Ich finde mich in Europa zurecht.', 'Ich beschreibe den Einfluss des Menschen auf die Umwelt.'],
    ['Ich erkläre ein Ökosystem und wie alles zusammenhängt.', 'Ich beschreibe, wie Wasser, Luft, Erde und Wärme wirken.', 'Ich erkläre, wie Stoffe zersetzt werden.', 'Ich beschreibe einen Weg und benutze verschiedene Karten.', 'Ich finde mich auf der Weltkarte zurecht.', 'Ich nenne Maßnahmen zum Schutz der Erde.'],
  ],
  [
    ['Ich ordne gestern, heute und morgen und große Epochen auf einer Zeitleiste.', 'Ich vergleiche das Leben früher und heute.', 'Ich erkläre, woher wir etwas über früher wissen.', 'Ich nenne meine Interessen und Stärken.', 'Ich kenne Berufe und was man dafür braucht.', 'Ich kenne Rechte und Pflichten in der Klasse und in der Schule.'],
    ['Ich arbeite mit Jahrhunderten und Daten.', 'Ich vergleiche Alltag und Politik früher und heute.', 'Ich erkläre Erfindungen und wie sie das Leben verändert haben.', 'Ich erkunde Berufe und Wege in den Beruf.', 'Ich bereite eine Anfrage für ein Praktikum vor.', 'Ich kenne Rechte, Pflichten und Wege der Mitbestimmung.'],
    ['Ich ordne Ereignisse genau in der Zeit.', 'Ich erkläre, wie wichtige Ereignisse bis heute wirken.', 'Ich erkläre Ursachen und Folgen großer Veränderungen.', 'Ich plane meinen Weg in Ausbildung und Beruf.', 'Ich schreibe einen einfachen Lebenslauf.', 'Ich setze mich für andere ein und handle solidarisch.'],
  ],
]

export function anwenden(MODUL, LEKTIONEN) {
  const nr = MODUL.nr, d = (nr - 1) % 3, n = Math.floor((nr - 1) / 3)
  const apercu = {
    titel: 'Das lerne ich in diesem Modul',
    intro: `Domäne ${d + 1} „${DOMAENE[d]}“ · Niveau ${d + 1}.${n + 1}. Kreuze am Anfang an, was du schon kannst – und am Ende noch einmal. Lies die Ziele mit deinen Eltern.`,
    bereiche: [{ kurz: `${d + 1}.${n + 1}`, name: DOMAENE[d], punkte: ZIELE[d][n] }],
    bewertung: [
      'Die Note steht auf **60 Punkten**: Sie ist der Mittelwert aus mehreren Bewertungen.',
      'Pro Trimester gibt es **mindestens drei Bewertungen** (Devoirs): Test, Präsentation, Plakat, Dossier, Projekt oder Recherche. Die Lehrperson kündigt sie vorher an.',
      'Du darfst auf **Deutsch, Französisch oder Luxemburgisch** antworten.',
    ],
    unterschrift: true,
  }
  const bilan = {
    titel: 'Modul-Bilan',
    intro: 'Am Ende des Moduls zeigst du auf drei Arten, was du kannst. Die Lehrperson sagt dir vorher, wann.',
    situationen: [
      { kurz: 'T', name: 'Kurzer Test', aufgabe: 'Fragen zu den Lektionen dieses Moduls: Wörter, Karten, Zeitleisten oder Schaubilder erklären.', punkte: 20 },
      { kurz: 'P', name: 'Präsentation oder Plakat', aufgabe: 'Ein Thema aus dem Modul vorstellen (2–3 Minuten) oder als Plakat gestalten – mit Bild und Fachwörtern.', punkte: 20 },
      { kurz: 'R', name: 'Recherche oder Dossier', aufgabe: 'Zu einer Frage Informationen aus zwei Quellen sammeln, ordnen und die Quellen angeben – auch mit Umfrage, Interview oder Besuch.', punkte: 20 },
    ],
    regel: 'Gesamt 60 Punkte. Programm CULGE, Voie de préparation (CNES, 30/06/2026).',
  }
  return { MODUL: { ...MODUL, apercu, bilan }, LEKTIONEN }
}
