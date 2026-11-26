// Sport · Programm EDUPH, Voie de préparation (CNES, Stand 03/03/2026), Kap. VI – Zusätze für alle Module (Auftrag 26.11.2026:
// „überprüfe und adaptiere das, was nicht korrekt umgesetzt wurde“). Neun Module nach drei Bewertungsbereichen:
// Agir (M1/M4/M7) · Interagir et coopérer (M2/M5/M8) · Attitude (M3/M6/M9); Anforderungen steigen von 7P über 6P zu 5P.
// Jedes Heft bekommt vorne „Das wird bewertet“ (alle drei Bereiche, Schwerpunkt markiert, zum Ankreuzen am Anfang und Ende)
// und hinten ein Modul-Bilan (Skala A–F wie im Complément au bulletin). heft.tsx lädt diese Datei für jedes Modul eduph-mN.
import { EDUPH_SCHWERPUNKT } from './sachfach-gemeinsam.mjs'

// Anforderungen je Bereich und Jahr (0 = 7P, 1 = 6P, 2 = 5P) – nach den Progressionen in Kap. VI, in Schülersprache
const AGIR = [
  ['Ich laufe ausdauernd in meinem eigenen Tempo.', 'Ich reagiere schnell und sprinte, so gut ich kann.', 'Ich mache einfache Bewegungsabläufe sauber (Koordination).'],
  ['Ich laufe oder fahre länger ohne Pause.', 'Ich bin schnell in verschiedenen Situationen (Start, Richtungswechsel).', 'Ich verbinde zwei Bewegungen, zum Beispiel laufen und werfen.', 'Ich mache Kraftübungen sauber und halte sie durch.'],
  ['Ich halte eine Ausdauerleistung lange durch.', 'Ich schätze vorher realistisch ein, was ich schaffe – und vergleiche danach.', 'Ich setze Schnelligkeit und Kraft gezielt ein.', 'Ich passe Bewegungen an wechselnde Situationen an.'],
]
const IC = [
  ['Ich halte einfache Spielregeln ein.', 'Ich akzeptiere Entscheidungen der Lehrperson und der Schiedsrichter.', 'Ich übernehme die Rolle, die man mir gibt.', 'Ich arbeite gut mit einer Partnerin oder einem Partner zusammen.', 'Ich kenne einfache Regeln für Angriff und Abwehr.'],
  ['Ich halte offizielle und vereinbarte Regeln fair ein.', 'Ich übernehme in der Kleingruppe selbst eine Rolle.', 'Ich spiele in der Kleingruppe zusammen, damit das Spiel läuft.', 'Wir verabreden eine gemeinsame Taktik für Angriff und Abwehr.'],
  ['Wir starten ein Spiel selbst und halten es am Laufen.', 'Ich übernehme selbstständig Rollen, zum Beispiel Schiedsrichter oder Zeitnehmer.', 'Ich arbeite auch in der ganzen Klasse zusammen.', 'Wir stimmen Angriff und Abwehr gemeinsam ab.'],
]
const AT = [
  ['Ich halte die Regeln im Sportunterricht ein: pünktlich, Sportsachen dabei, Pfiff heißt zuhören.', 'Ich gehe respektvoll mit anderen, mit der Lehrperson und mit dem Material um.', 'Ich höre zu, strenge mich an und probiere Neues aus.', 'Ich helfe beim Auf- und Abbau, wenn man mir eine Aufgabe gibt.'],
  ['Ich halte die Regeln ein. Wenn ich nicht mitmachen kann, entschuldige und begründe ich das in aller Form – vor der Stunde.', 'Ich bleibe respektvoll und vermeide Konflikte.', 'Ich strenge mich an und lasse mich auf Neues ein.', 'Ich baue in der Kleingruppe auf und ab.'],
  ['Ich halte die Regeln ein und entschuldige mich in aller Form, wenn ich nicht mitmachen kann.', 'Wenn es Streit gibt, lösen wir den Konflikt gemeinsam.', 'Ich strenge mich an, höre zu und probiere Neues aus.', 'Ich baue selbstständig auf und ab.'],
]
const NAME = { Agir: 'Agir – Leisten und Können', 'Interagir et coopérer': 'Interagir et coopérer – Zusammen spielen', Attitude: 'Attitude – Haltung und Einsatz' }

// Bilan: je Modul drei kurze Bewertungssituationen (eine je Bereich), passend zum Heft
const BILAN = {
  1: ['Dauerlauf im eigenen Tempo (Zeit oder Runden) und ein Reaktions-Sprint.', 'Ein Spiel mit einfachen Regeln: Regeln einhalten, Entscheidungen annehmen.', 'Beobachtung in drei Stunden: pünktlich, Sportsachen, zuhören, mithelfen.'],
  2: ['Passen und Fangen im Ballspiel sauber ausführen.', 'Spiel 3 gegen 3: Rolle übernehmen, Freilaufen und Abwehren, Regeln einhalten.', 'Beobachtung: fair bleiben, Material respektieren, beim Abbau helfen.'],
  3: ['Eine kleine Turn- oder Balance-Übung sauber vorzeigen.', 'Helfen und Sichern beim Partner nach Anleitung.', 'Beobachtung: Regeln, Sicherheit, Matten tragen, Neues probieren.'],
  4: ['Kraft-Zirkel sauber durchhalten; Dauerlauf länger ohne Pause; Sprint mit Richtungswechsel.', 'Partnerübung oder Kleingruppen-Station gemeinsam schaffen.', 'Beobachtung: Einsatz, Respekt, Auf- und Abbau in der Kleingruppe.'],
  5: ['Schläge im Rückschlagspiel (Aufschlag, Grundschlag) sauber ausführen.', 'Doppel oder Kleingruppen-Turnier: Taktik absprechen, Rollen übernehmen, Regeln fair einhalten.', 'Beobachtung: Konflikte vermeiden, Material respektieren.'],
  6: ['Eine kurze Tanz- oder Rhythmusfolge vorzeigen.', 'In der Gruppe eine Folge gemeinsam einüben.', 'Beobachtung: sich auf Neues einlassen, Feedback respektvoll geben, Entschuldigung in aller Form, Auf- und Abbau.'],
  7: ['Leichtathletik: Ausdauerlauf mit eigener Schätzung vorher; Sprint, Sprung oder Wurf mit Technik.', 'Staffel: Übergabe im Team abstimmen.', 'Beobachtung: Einsatz, Fairness, selbstständig auf- und abbauen.'],
  8: ['Technik im Mannschaftsspiel (Pass, Schuss, Pritschen oder Baggern).', 'Spiel ohne Lehrperson starten und leiten: Teams, Regeln, Schiedsrichter, Angriff und Abwehr abstimmen.', 'Beobachtung: Regeln, Respekt, selbstständig auf- und abbauen.'],
  9: ['Ein eigenes Bewegungsprogramm vorstellen und durchführen.', 'Eine Gruppenaktivität (draußen oder in der Halle) gemeinsam planen und durchführen.', 'Beobachtung: Konflikte gemeinsam lösen, Verhalten draußen, selbstständig auf- und abbauen.'],
}

export function anwenden(MODUL, LEKTIONEN) {
  const nr = MODUL.nr, jahr = Math.floor((nr - 1) / 3), schwer = EDUPH_SCHWERPUNKT[(nr - 1) % 3]
  const bereiche = [['A', 'Agir', AGIR], ['IC', 'Interagir et coopérer', IC], ['AT', 'Attitude', AT]].map(([kurz, b, liste]) => ({
    kurz: b === schwer ? kurz + ' ★' : kurz, name: NAME[b] + (b === schwer ? ' (Schwerpunkt)' : ''), punkte: liste[jahr],
  }))
  // Schwerpunkt zuerst
  bereiche.sort((x, y) => (y.kurz.endsWith('★') ? 1 : 0) - (x.kurz.endsWith('★') ? 1 : 0))
  const apercu = {
    titel: 'Das wird bewertet',
    intro: `Im Sport werden drei Bereiche bewertet. In diesem Modul liegt der **Schwerpunkt auf „${schwer}“** – er zählt am meisten. Lies die Sätze mit deinen Eltern und kreuze am Anfang und am Ende an.`,
    bereiche,
    bewertung: [
      'Die Note steht auf dem „Complément au bulletin“: je Bereich eine Stufe von **A** (vollkommen erreicht) bis **F** (verweigert).',
      'Du wirst vor allem **mit dir selbst** verglichen: Was kannst du jetzt besser als am Anfang?',
      'Bewertet wird nur, was im Unterricht geübt wurde. Die Lehrperson sagt vorher, wann und was bewertet wird.',
      'Jedes Modul wird für sich bestanden.',
      'Kannst du länger nicht mitmachen (ärztliches Attest), bekommst du Aufgaben aus diesem Heft.',
    ],
    unterschrift: true,
  }
  const b = BILAN[nr] || []
  const bilan = {
    titel: 'Modul-Bilan',
    intro: 'So zeigst du am Ende des Moduls, was du kannst. Die Lehrperson trägt je Bereich eine Stufe ein (A bis F).',
    situationen: [['A', 'Agir'], ['IC', 'Interagir et coopérer'], ['AT', 'Attitude']].map(([kurz, name], i) => ({ kurz, name: NAME[name] + (name === schwer ? ' – Schwerpunkt' : ''), aufgabe: b[i] || '', skala: ['A', 'B', 'C', 'D', 'E', 'F'] })),
    regel: 'A vollkommen erreicht · B gut erreicht · C erreicht · D teilweise erreicht · E nicht erreicht · F verweigert. Programm EDUPH VP (CNES), Kap. VI.',
  }
  return { MODUL: { ...MODUL, apercu, bilan }, LEKTIONEN }
}
