// Temporary visual test: renders a fake material exercising every worksheet
// block kind. Usage: tsx --tsconfig tsconfig.scripts.json scripts/renderKindsTest.tsx <out.pdf>
import { renderToFile } from '@react-pdf/renderer'
import { MaterialDocument } from '../src/pdf/MaterialPdf'
import type { Material } from '../src/types/material'

const demo: Material = {
  id: 'kinds-test',
  title: 'Baustein-Test',
  author: 'QA',
  ageLevels: ['C3', 'C4'],
  type: ['Aktivitéit'],
  participants: [{ mode: 'Individuel' }],
  themes: ['stressbewaeltigung'],
  tags: ['test'],
  shortDescription: 'Testet alle Arbeitsblatt-Bausteine.',
  ablauf: [{ title: 'Test', text: 'Nur Render-Test.' }],
  etepStufen: [3],
  eldibGoals: ['V-21'],
  language: 'de',
  source: 'generated',
  worksheet: {
    title: 'Alle Bausteine auf einen Blick',
    intro: 'QA-Blatt: jeder Block-Typ einmal.',
    blocks: [
      { kind: 'heading', text: '1. Neue visuelle Bausteine' },
      { kind: 'columns', text: 'Vorher / Nachher im Vergleich:', items: ['Vorher', 'Nachher'], lines: 3 },
      { kind: 'wordbank', text: 'Wörter-Kiste — kreise ein, was passt:', items: ['mutig', 'ruhig', 'wütend', 'stolz', 'nervös', 'froh', 'müde', 'stark'] },
      { kind: 'sentences', text: 'Vollende die Sätze:', items: ['Ich fühle mich stark, wenn', 'Am meisten hilft mir', 'Beim nächsten Mal werde ich'], lines: 1 },
      { kind: 'bubble', text: 'Was sagst du? Schreibe in die Sprechblasen:', items: ['Ich', 'Mein Freund'], lines: 2 },
      { kind: 'steps', text: 'Mein 4-Schritte-Plan:', items: ['Stopp sagen und durchatmen', '', 'Hilfe holen, wenn nötig', ''], lines: 1 },
      { kind: 'heading', text: '2. Skalen & Karten' },
      { kind: 'thermometer', text: 'Mein Stress-Thermometer — was merke ich in jeder Zone?', items: ['grün', 'gelb', 'orange', 'rot'] },
      { kind: 'bodymap', text: 'Wo spürst du das Gefühl? Male es an:', items: ['Wut', 'Angst', 'Freude'], lines: 8 },
      { kind: 'target', text: 'Zielscheibe: Was ist dir am wichtigsten (Mitte = am wichtigsten)?', items: ['irgendwann', 'bald', 'jetzt'] },
      { kind: 'mindmap', text: 'Mein Netz', items: ['Familie', 'Freunde', '', 'Verein', '', 'Schule'] },
      { kind: 'heading', text: '3. Bewährte Bausteine' },
      { kind: 'scale', text: 'Wie gut hat es geklappt?', items: ['gar nicht', 'teils', 'gut', 'super'] },
      { kind: 'question', text: 'Was nimmst du mit?', lines: 2 },
    ],
  },
}

const out = process.argv[2] || 'kinds-test.pdf'
await renderToFile(<MaterialDocument material={demo} />, out)
console.log('rendered', out)
