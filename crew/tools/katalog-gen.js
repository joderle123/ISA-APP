/* Erzeugt src/content/katalog.js aus docs/spielekatalog.json.
   Wird von build.js aufgerufen; kann auch direkt laufen:  node crew/tools/katalog-gen.js
   Die Datei im src-Ordner NICHT von Hand bearbeiten – Quelle ist die JSON im docs-Ordner. */
'use strict';
const fs = require('fs');
const path = require('path');

/* Feste Kurznamen (Slugs) der acht Themen – so heißen auch die Ordner unter src/games/<slug>/ */
const THEME_SLUGS = {
  'Ankommen & Crew': 'ankommen',
  'Ich: Bedürfnisse & Stärken': 'ich',
  'Gefühle verstehen': 'gefuehle',
  'Anspannung & Skills': 'skills',
  'Gedanken & Glaubenssätze': 'gedanken',
  'Kommunikation & Grenzen': 'kommunikation',
  'Konflikt, Druck & Mobbing': 'konflikt',
  'Digital, Gesundheit & Abschluss': 'digital',
};
/* Die sieben Formate aus dem Katalog → Vorlage (T1–T6, Solo = T0) */
const FORMATS = [
  { id: 'solo', name: 'Solo', template: 'T0', icon: 'phone', kurz: 'allein am eigenen iPad' },
  { id: 'solo-austausch', name: 'Solo + Austausch', template: 'T1', icon: 'shuffle', kurz: 'erst allein tippen, dann Vergleichskarte zu zweit' },
  { id: 'zu-zweit', name: 'Zu zweit an einem iPad', template: 'T3', icon: 'users', kurz: 'ein iPad zwischen zwei Personen' },
  { id: 'weitergeben', name: 'Gerät weitergeben', template: 'T5', icon: 'undo', kurz: 'ein iPad wandert im Kreis' },
  { id: 'rollen', name: 'Rollen-Puzzle', template: 'T2', icon: 'sparkle', kurz: 'jedes iPad zeigt andere Infos' },
  { id: 'bewegung', name: 'Bewegung im Raum', template: 'T4', icon: 'bolt', kurz: 'Ecken und Wände, die Position ist die Antwort' },
  { id: 'beamer', name: 'Beamer-Gruppe', template: 'T6', icon: 'users', kurz: 'ganze Crew vor dem Beamer, nur Weiter' },
];
const formatId = (name) => { const f = FORMATS.find((x) => x.name === name); return f ? f.id : 'beamer'; };
const eldibCodes = (text) => Array.from(new Set((String(text || '').match(/\b(?:SOZ|KOG|K|V|E|UM)-\d+/g) || [])));
const slug = (s) => String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function build(json) {
  const themen = json.themen.map((t) => ({ id: THEME_SLUGS[t.name] || slug(t.name), name: t.name, spiele: t.spiele.map((s) => s.id) }));
  const spiele = {};
  json.themen.forEach((t) => {
    const tid = THEME_SLUGS[t.name] || slug(t.name);
    t.spiele.forEach((s) => {
      spiele[s.id] = {
        id: s.id, name: s.name, thema: tid, format: formatId(s.format), formatName: s.format, dauer: s.dauer,
        text: s.text, foerdert: s.foerdert, eldib: eldibCodes(s.foerdert), einheiten: s.einheiten || [],
        abschluss: !!s.abschluss, top: !!s.top, aufwand: s.aufwand || 'S',
      };
    });
  });
  const einheiten = json.einheiten.map((e) => ({ id: e.id, titel: e.titel, spiel: e.spiel, variante: e.variante }));
  const bestand = json.bestand.map((b) => ({ id: b.id, name: b.name, text: b.text, status: b.status }));
  return { stand: json.stand, themen, formate: FORMATS, spiele, einheiten, bestand };
}

function generate(root) {
  const src = path.join(root, 'docs', 'spielekatalog.json');
  const out = path.join(root, 'src', 'content', 'katalog.js');
  if (!fs.existsSync(src)) return false;
  const data = build(JSON.parse(fs.readFileSync(src, 'utf8')));
  const body = `/* CREW – Spielekatalog (GENERIERT aus docs/spielekatalog.json durch tools/katalog-gen.js – nicht von Hand ändern).
   Stand: ${data.stand}. Themen, Formate, alle Spiele mit ELDiB-Codes, Einheiten j1-e01…j1-e30 mit Varianten-Text. */
(function () {
  'use strict';
  const CREW = (window.CREW = window.CREW || {});
  CREW.katalog = ${JSON.stringify(data, null, 1).replace(/<\/script/gi, '<\\/script')};
  CREW.katalog.themeOf = (id) => CREW.katalog.themen.find((t) => t.spiele.includes(id)) || null;
  CREW.katalog.unitsOf = (id) => CREW.katalog.einheiten.filter((e) => e.spiel === id || ((CREW.katalog.spiele[id] || {}).einheiten || []).includes(e.id));
})();
`;
  const old = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (old !== body) fs.writeFileSync(out, body);
  return true;
}

module.exports = { generate, build, THEME_SLUGS, FORMATS, eldibCodes };
if (require.main === module) {
  generate(path.resolve(__dirname, '..'));
  console.log('katalog.js erzeugt.');
}
