// Deutsch (ALLUX) und Französisch (FRANC), Voie de préparation – was die Programme (CNES, 20/03/2019) für jedes Modul
// verlangen und die Hefte bisher nicht hatten (Prüfung 26.11.2026):
// - „Aperçu des compétences“: zu Beginn jedes Moduls bekommen Schülerin/Schüler und Eltern die Kompetenzen des Moduls
//   (daten/sprachen-apercu.json: aus den Kann-Beschreibungen/Descripteurs, in Schülersprache) – zum Ankreuzen, mit Unterschrift;
// - Bewertung in allen vier Bereichen, 50 % Verstehen (Hören + Lesen) und 50 % Produktion (Sprechen + Schreiben),
//   mindestens drei Devoirs pro Trimester, angekündigt und vorher festgelegt → Modul-Bilan mit vier Situationen à 25 Punkte;
// - ein Modul gilt als bestanden, wenn die meisten Kompetenzen des Aperçu erreicht sind; sonst Zwischennote, man arbeitet
//   im selben Modul weiter (kein Sitzenbleiben im Modul);
// - ALLUX: Luxemburgisch ist nicht modular – mindestens zwei Texte pro Trimester lesen, erklären und besprechen;
//   Hören, Sprechen und Lesen zählen, Schreiben wird nicht benotet; mündliche Note.
import { readFileSync } from 'node:fs'
const APERCU = JSON.parse(readFileSync(new URL('../daten/sprachen-apercu.json', import.meta.url), 'utf8'))

export function deutschProgramm(MODUL) {
  const a = APERCU.deutsch[String(MODUL.nr)] || {}
  const apercu = {
    titel: 'Das lerne ich in diesem Modul',
    intro: 'Das sind die wichtigsten Ziele dieses Moduls aus dem Programm. Lies sie mit deinen Eltern. Kreuze am Anfang und am Ende an, was du kannst.',
    bereiche: [['H', 'Hören', a.hoeren], ['L', 'Lesen', a.lesen], ['S', 'Sprechen', a.sprechen], ['Sch', 'Schreiben', a.schreiben]].filter(([, , p]) => p && p.length).map(([kurz, name, punkte]) => ({ kurz, name, punkte })),
    bewertung: [
      'Bewertet werden alle vier Bereiche: **Hören und Lesen zählen die Hälfte, Sprechen und Schreiben die andere Hälfte.**',
      'Pro Trimester gibt es mindestens drei Bewertungen (Devoirs). Die Lehrperson sagt vorher, wann und was bewertet wird.',
      'Das Modul ist geschafft, wenn du die meisten Ziele oben erreicht hast. Sonst arbeitest du im Modul weiter.',
      '**Luxemburgisch:** In jedem Trimester lest und besprecht ihr mindestens zwei Texte auf Luxemburgisch. Hören, Sprechen und Lesen zählen – Schreiben wird nicht benotet.',
    ],
    unterschrift: true,
  }
  const t = MODUL.titel.de
  const bilan = {
    titel: 'Modul-Bilan',
    intro: `Am Ende des Moduls „${t}“ zeigst du in vier Situationen, was du kannst. Die Lehrperson sagt dir vorher, wann. Jede Situation kann ein Devoir sein.`,
    situationen: [
      { kurz: 'H', name: 'Hören', aufgabe: 'Du hörst einen neuen Text zum Thema des Moduls (Durchsage, Gespräch, Interview) und beantwortest Fragen dazu.', punkte: 25 },
      { kurz: 'L', name: 'Lesen', aufgabe: 'Du liest einen neuen Text zum Thema des Moduls und findest die wichtigen Informationen.', punkte: 25 },
      { kurz: 'S', name: 'Sprechen', aufgabe: 'Du führst ein kurzes Gespräch (Rollenspiel) und stellst etwas vor, das du vorbereitet hast (1–2 Minuten, mit Stichwörtern).', punkte: 25 },
      { kurz: 'Sch', name: 'Schreiben', aufgabe: 'Du schreibst einen Text wie in den Schreib-Aufgaben dieses Heftes – mit deiner Checkliste.', punkte: 25 },
    ],
    regel: 'Hören + Lesen = 50 Punkte (Verstehen) · Sprechen + Schreiben = 50 Punkte (Produktion). Programm ALLUX, Voie de préparation (CNES).',
  }
  return { ...MODUL, fach: { de: 'Deutsch (ALLUX)', fr: 'Allemand (ALLUX)' }, apercu, bilan, lb: true }
}

export function franzoesischProgramm(MODUL) {
  const a = APERCU.franzoesisch[String(MODUL.nr)] || {}
  const apercu = {
    titel: 'Aperçu des compétences',
    intro: 'Voici les compétences les plus importantes de ce module (programme officiel). Lis-les avec tes parents. Coche au début et à la fin du module.',
    bereiche: [['CO', 'Compréhension de l’oral', a.CO], ['CE', 'Compréhension de l’écrit', a.CE], ['PO', 'Interaction et production orales', a.PO], ['PE', 'Production écrite', a.PE]].filter(([, , p]) => p && p.length).map(([kurz, name, punkte]) => ({ kurz, name, punkte })),
    bewertung: [
      'Les quatre compétences sont évaluées : **comprendre (CO + CE) compte pour moitié, parler et écrire (PO + PE) pour l’autre moitié.**',
      'Il y a au moins trois devoirs par trimestre. Ton enseignant(e) annonce avant ce qui sera évalué et quand.',
      'Le module est acquis si tu as atteint la plupart des compétences de cet aperçu. Sinon, tu continues le module (note intermédiaire).',
    ],
    unterschrift: true,
  }
  const t = MODUL.titel.fr
  const bilan = {
    titel: 'Bilan du module',
    intro: `À la fin du module « ${t} », tu montres ce que tu sais faire dans quatre situations. Ton enseignant(e) te dit quand. Chaque situation peut être un devoir.`,
    situationen: [
      { kurz: 'CO', name: 'Compréhension de l’oral', aufgabe: 'Tu écoutes un nouveau document sur le thème du module (annonce, dialogue, interview) et tu réponds aux questions.', punkte: 25 },
      { kurz: 'CE', name: 'Compréhension de l’écrit', aufgabe: 'Tu lis un nouveau texte sur le thème du module et tu trouves les informations importantes.', punkte: 25 },
      { kurz: 'PO', name: 'Interaction et production orales', aufgabe: 'Tu joues un court dialogue et tu présentes quelque chose que tu as préparé (1 à 2 minutes, avec des mots-clés, sans lire).', punkte: 25 },
      { kurz: 'PE', name: 'Production écrite', aufgabe: 'Tu écris un texte comme dans les tâches « Écrire » de ce cahier – avec ta checklist.', punkte: 25 },
    ],
    regel: 'CO + CE = 50 points (comprendre) · PO + PE = 50 points (produire). Programme FRANC, voie de préparation (CNES).',
  }
  return { ...MODUL, apercu, bilan }
}

// Sprechen als eigener Teil jeder Lektion (ALLUX: „Sprechen“ ist ein Kompetenzbereich wie Lesen, Hören, Schreiben;
// FRANC: Production orale zählt ein Viertel). Bisher stand der Sprechauftrag versteckt unter „Hören – nach dem Hören“
// und meist auf Stufe ●●●. Jetzt: eigener Teil „Sprechen/Parler“, für alle (höchstens ●●○), mit Satzanfängen als Hilfe.
export function mitSprechen(MODUL, LEKTIONEN) {
  const sp = MODUL.sprache
  const L = LEKTIONEN.map((l) => {
    if (!l.hoeren || !Array.isArray(l.hoeren.nach)) return l
    const sprechen = l.hoeren.nach.filter((a) => a.art === 'sprechen').map((a) => ({ ...a, stufe: Math.min(a.stufe || 2, 2) }))
    if (!sprechen.length) return l
    return { ...l, hoeren: { ...l.hoeren, nach: l.hoeren.nach.filter((a) => a.art !== 'sprechen') }, sprechen: [...(l.sprechen || []), ...sprechen] }
  })
  const anleitung = (MODUL.anleitung || []).map((z) => z
    .replace('Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**.', 'Jede Lektion hat sechs Teile: **Lesen**, **Hören**, **Regel**, **Üben**, **Sprechen** und **Schreiben**.')
    .replace('Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**.', 'Chaque leçon a six parties : **Lire**, **Écouter**, **La règle**, **S’entraîner**, **Parler** et **Écrire**.'))
  const medien = sp === 'de'
    ? [['book', 'var(--lesen)', 'Lesen', 'Texte aus dem Alltag'], ['headphones', 'var(--hoeren)', 'Hören', 'QR-Code scannen'], ['messages', 'var(--regel)', 'Sprechen', 'zu zweit und in der Klasse'], ['writing', 'var(--schreiben)', 'Schreiben', 'mit viel Platz']]
    : [['book', 'var(--lesen)', 'Lire', 'des textes du quotidien'], ['headphones', 'var(--hoeren)', 'Écouter', 'scanner le code QR'], ['messages', 'var(--regel)', 'Parler', 'à deux et en classe'], ['writing', 'var(--schreiben)', 'Écrire', 'avec beaucoup de place']]
  return { MODUL: { ...MODUL, anleitung, medien: MODUL.medien || medien }, LEKTIONEN: L }
}
