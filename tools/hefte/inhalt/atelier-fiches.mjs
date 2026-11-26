// Atelier · Programm GROPA (Groupe options et ateliers), Voie de préparation (CNES, 13/06/2022) – Zusätze für alle Module
// (Prüfung 26.11.2026). Das Programm ordnet die neun Module nicht nach Werkstoff, sondern nach einem gleichen Raster
// (Attitudes · Savoirs · Habiletés) mit steigenden Anforderungen. Jedes Heft bekommt vorne die Ziele des Moduls aus
// diesem Raster (mit den vier Haltungen, die in allen Modulen gelten) und hinten ein Modul-Bilan.
// heft.tsx lädt diese Datei für jedes Modul atelier-mN.

const HALTUNG = ['Ich bin pünktlich.', 'Ich halte die Pausen ein.', 'Ich bin höflich: bitte, danke, guten Tag, auf Wiedersehen.', 'Ich habe mein Material dabei.']
const nachModul = (tabelle, nr) => { for (const [bis, text] of tabelle) if (nr <= bis) return text; return null }
// Stränge des Rasters: [bis Modul, Aussage]
const SICHERHEIT = [[1, 'Ich lerne die Hygiene- und Sicherheitsregeln der Werkstatt kennen.'], [2, 'Ich wende die Hygiene- und Sicherheitsregeln an.'], [4, 'Ich halte die Hygiene- und Sicherheitsregeln ein.'], [9, 'Ich wende die Hygiene- und Sicherheitsregeln selbstständig an.']]
const MATERIAL = [[1, 'Ich erkenne Werkzeuge und Materialien der Werkstatt.'], [2, 'Ich kenne Werkzeuge und Materialien mit ihrem Namen.'], [5, 'Ich benutze das Grundwerkzeug richtig.'], [8, 'Ich lerne neue Werkzeuge und Maschinen kennen und benutze sie richtig.'], [9, 'Ich wähle das passende Werkzeug und Material für die Aufgabe.']]
const FICHE = [[3, null], [8, 'Ich lese einen Arbeitsplan (Fiche technique) und arbeite danach.'], [9, 'Ich verstehe und deute einen Arbeitsplan (Fiche technique) selbstständig.']]
const RECHNEN = [[2, null], [3, 'Ich rechne einfache Mengen und Preise aus.'], [5, 'Ich rechne und messe – auch mit Formen und Flächen.'], [9, 'Ich messe genau und rechne in der Praxis mit Maßen.']]
const PRODUKTION = [[2, 'Ich entdecke, wie ein Werkstück entsteht.'], [5, 'Ich stelle Teile eines Werkstücks nach Anweisung her.'], [7, 'Ich stelle ein Werkstück vom Anfang bis zum Ende her.'], [8, 'Ich plane und fertige ein Werkstück selbstständig.'], [9, 'Ich stelle ein anspruchsvolles Werkstück selbstständig und kreativ her.']]
const TEAM = [[3, null], [4, 'Ich entdecke, wie Teamarbeit geht.'], [5, 'Ich kenne die Regeln für Teamarbeit und halte sie ein.'], [9, 'Ich arbeite im Team zuverlässig mit und übernehme Aufgaben.']]
const PROBLEM = [[2, null], [3, 'Ich erkenne ein Problem und sage es.'], [4, 'Ich beschreibe ein Problem und gehe mit Unerwartetem um.'], [7, 'Ich schlage Lösungen für ein Problem vor.'], [8, 'Ich stelle Vermutungen auf, teste sie und überwinde Hindernisse.'], [9, 'Ich finde eine wirksame Lösung und setze neu an, wenn etwas nicht klappt.']]
const REFLEXION = [[2, null], [3, 'Ich sage, was gelungen ist, und respektiere die Arbeit der anderen.'], [5, 'Ich gebe eine klare Meinung zu meiner Arbeit.'], [7, 'Ich beschreibe meine Arbeit mündlich und halte sie fest.'], [8, 'Ich berichte mündlich und schriftlich über meine Arbeit.'], [9, 'Ich schaue kritisch auf meine Arbeit und erkläre sie anderen.']]
const AUFRAEUMEN = [[2, 'Ich lerne, meinen Arbeitsplatz aufzuräumen.'], [8, 'Ich pflege mein Werkzeug und räume meinen Arbeitsplatz auf.'], [9, 'Ich gebe Werkzeug und Arbeitsplatz in gutem Zustand zurück.']]
const EXTRA = { 6: 'Ich traue mir etwas zu und verbinde die Arbeit mit meinem eigenen Leben.', 7: 'Ich benutze die Fachwörter und teile meine Zeit gut ein.', 9: 'Ich zeige Initiative und eigene Ideen.' }

export function anwenden(MODUL, LEKTIONEN) {
  const nr = MODUL.nr, w = (t) => nachModul(t, nr)
  const bereiche = [
    { kurz: 'AT', name: 'Attitudes – Haltung', punkte: [...HALTUNG, w(AUFRAEUMEN), EXTRA[nr]].filter(Boolean) },
    { kurz: 'SA', name: 'Savoirs – Wissen', punkte: [w(SICHERHEIT), w(MATERIAL), w(FICHE), w(RECHNEN)].filter(Boolean) },
    { kurz: 'HA', name: 'Habiletés – Können', punkte: [w(PRODUKTION), w(PROBLEM), w(TEAM), w(REFLEXION)].filter(Boolean) },
  ]
  const apercu = {
    titel: 'Das lerne ich in diesem Modul',
    intro: 'Das sind die Ziele dieses Moduls aus dem Programm „Groupe options et ateliers“. Die vier Haltungen oben gelten in jedem Modul. Lies die Ziele mit deinen Eltern und kreuze am Anfang und am Ende an.',
    bereiche,
    bewertung: [
      'Bewertet werden **Haltung, Wissen und Können** – im Unterricht beobachtet, an deinem Werkstück und an deinem Werkstatt-Bericht.',
      'Die Lehrperson sagt vorher, was bewertet wird.',
      'Ein Modul ist nicht an ein Schuljahr gebunden: Du arbeitest daran, bis du die Ziele erreicht hast.',
    ],
    unterschrift: true,
  }
  const skala = ['erreicht', 'teilweise', 'noch nicht']
  const bilan = {
    titel: 'Modul-Bilan',
    intro: 'Am Ende des Moduls schauen du und die Lehrperson gemeinsam auf deine Arbeit. Kreuzt je Bereich an.',
    situationen: [
      { kurz: 'AT', name: 'Haltung', aufgabe: 'Beobachtung über mehrere Stunden: pünktlich, Pausen, höflich, Material dabei, Arbeitsplatz aufgeräumt.', skala },
      { kurz: 'SA', name: 'Wissen', aufgabe: 'Sicherheitsregeln, Werkzeuge und Materialien' + (nr >= 4 ? ', Arbeitsplan lesen' : '') + (nr >= 3 ? ', rechnen und messen' : '') + ' – an einer kleinen Aufgabe zeigen.', skala },
      { kurz: 'HA', name: 'Können', aufgabe: (nr >= 8 ? 'Ein Werkstück selbstständig planen und herstellen' : nr >= 6 ? 'Ein Werkstück vom Anfang bis zum Ende herstellen' : 'Ein Werkstück oder Teile davon nach Anweisung herstellen') + (nr >= 3 ? '; ein Problem erkennen und lösen' : '') + '.', skala },
      { kurz: '✎', name: 'Werkstatt-Bericht', aufgabe: nr >= 8 ? 'Mündlich und schriftlich erklären: Wie bin ich vorgegangen, was würde ich nächstes Mal anders machen?' : nr >= 6 ? 'Die eigene Arbeit mündlich beschreiben und festhalten.' : 'Sagen, was gelungen ist und was schwer war.', skala },
    ],
    regel: 'Programm GROPA (Groupe options et ateliers), Voie de préparation (CNES).',
  }
  return { MODUL: { ...MODUL, apercu, bilan }, LEKTIONEN }
}
