# Open Peeps

Die gezeichneten Figuren in `src/blatt/bilder/peeps.json` stammen aus „Open Peeps“ von Pablo Stanley
(openpeeps.com), Lizenz **CC0 1.0** (gemeinfrei): frei nutzbar, auch gedruckt, ohne Namensnennung.
Vom Nutzer am 12.11.2026 als `open-peeps.sketch` bereitgestellt.

- Umwandlung: `python3 -I tools/peeps/peeps.py <open-peeps.sketch> src/blatt/bilder/peeps.json [<ordner mit shapely>]`
- Verwendung in Arbeitsblättern: `peep:<wer>[:<gefuehl>[:<haltung>]]`, siehe `src/blatt/peeps.ts`
- Übersicht zum Anschauen: `npx tsx --tsconfig tsconfig.scripts.json scripts/peeps-bogen.tsx peeps.html`

Nicht übernommen: Masken, Monster- und Zyklopen-Gesicht, Augenklappe, Bären-Kopf, Körper „Killer“.
